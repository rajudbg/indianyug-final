import type { WPPost, WPCategory, PaginatedPosts } from '@/types/wordpress'

const BASE = process.env.WORDPRESS_API_URL || 'https://cms.indianyug.com/wp-json/wp/v2'

async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  ttl = 300
): Promise<{ data: T; headers: Headers }> {
  const url = new URL(`${BASE}${endpoint}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': 'IndianYug/2.0' },
    next: { revalidate: ttl },
  })
  if (!res.ok) throw new Error(`WP API ${res.status}: ${endpoint}`)
  return { data: await res.json(), headers: res.headers }
}

export async function getPosts(opts: {
  page?: number
  perPage?: number
  categories?: number[]
  embed?: boolean
  exclude?: number[]
  sticky?: boolean
  search?: string
} = {}): Promise<PaginatedPosts> {
  try {
    const params: Record<string, string | number | boolean> = {
      page: opts.page ?? 1,
      per_page: opts.perPage ?? 12,
    }
    if (opts.embed) params._embed = true
    if (opts.categories?.length) params.categories = opts.categories.join(',')
    if (opts.exclude?.length) params.exclude = opts.exclude.join(',')
    if (opts.sticky !== undefined) params.sticky = opts.sticky
    if (opts.search) params.search = opts.search

    const { data, headers } = await wpFetch<WPPost[]>('/posts', params)
    return {
      posts: data,
      total: parseInt(headers.get('X-WP-Total') || '0'),
      totalPages: parseInt(headers.get('X-WP-TotalPages') || '0'),
    }
  } catch {
    return { posts: [], total: 0, totalPages: 0 }
  }
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const { data } = await wpFetch<WPPost[]>('/posts', { slug, _embed: true })
    return data[0] ?? null
  } catch {
    return null
  }
}

export async function getCategories(): Promise<WPCategory[]> {
  try {
    const { data } = await wpFetch<WPCategory[]>('/categories', {
      per_page: 100,
      hide_empty: true,
    })
    return data
  } catch {
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  try {
    const { data } = await wpFetch<WPCategory[]>('/categories', { slug })
    return data[0] ?? null
  } catch {
    return null
  }
}

export async function getPostsByCategory(
  categoryId: number,
  page = 1,
  perPage = 12
): Promise<PaginatedPosts> {
  return getPosts({ categories: [categoryId], page, perPage, embed: true })
}

export async function getRelatedPosts(post: WPPost, limit = 3): Promise<WPPost[]> {
  try {
    if (post.categories?.length) {
      const { posts } = await getPosts({
        categories: post.categories.slice(0, 2),
        perPage: limit + 1,
        embed: true,
        exclude: [post.id],
      })
      if (posts.length > 0) return posts.slice(0, limit)
    }
    const { posts } = await getPosts({ perPage: limit + 1, embed: true, exclude: [post.id] })
    return posts.slice(0, limit)
  } catch {
    return []
  }
}

export async function getFeaturedPosts(limit = 4): Promise<WPPost[]> {
  try {
    const cats = await getCategories()
    const featured = cats.find(c =>
      c.slug === 'featured' || c.name.toLowerCase() === 'featured'
    )
    if (featured) {
      const { posts } = await getPosts({ categories: [featured.id], perPage: limit, embed: true })
      if (posts.length >= limit) return posts
    }
    const { posts: sticky } = await getPosts({ sticky: true, perPage: limit, embed: true })
    if (sticky.length > 0) return sticky.slice(0, limit)
    const { posts } = await getPosts({ perPage: limit, embed: true })
    return posts
  } catch {
    const { posts } = await getPosts({ perPage: limit, embed: true })
    return posts
  }
}
