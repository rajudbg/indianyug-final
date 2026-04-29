import { WordPressPost, WordPressCategory, WordPressPage, WordPressMedia, WordPressAuthor, WordPressQueryParams, WordPressApiResponse } from '@/types/wordpress'

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.indianyug.com/wp-json/wp/v2'

class WordPressAPI {
  private baseUrl: string

  constructor(baseUrl: string = WORDPRESS_API_URL) {
    this.baseUrl = baseUrl
  }

  private async fetchAPI(endpoint: string, params: Record<string, any> = {}): Promise<Response> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          url.searchParams.append(key, value.join(','))
        } else {
          url.searchParams.append(key, String(value))
        }
      }
    })

    const headers: HeadersInit = {
      'User-Agent': 'IndianYug-Frontend/1.0',
    }

    // Add authentication if available
    if (process.env.WORDPRESS_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.WORDPRESS_API_KEY}`
    }

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    return response
  }

  private extractPaginationInfo(response: Response): {
    total: number
    totalPages: number
    page: number
    perPage: number
  } {
    return {
      total: parseInt(response.headers.get('X-WP-Total') || '0'),
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0'),
      page: 1,
      perPage: 10,
    }
  }

  async getPosts(params: WordPressQueryParams = {}): Promise<WordPressApiResponse<WordPressPost>> {
    const defaultParams = {
      per_page: 50, // Increased from 10 to 50 for better coverage
      _embed: true,
      ...params,
    }

    try {
      const response = await this.fetchAPI('/posts', defaultParams)
      const data = await response.json()
      const pagination = this.extractPaginationInfo(response)

      return {
        data,
        ...pagination,
        page: params.page || 1,
        perPage: params.per_page || 50,
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Return empty response to prevent build failure
      return {
        data: [],
        total: 0,
        totalPages: 0,
        page: params.page || 1,
        perPage: params.per_page || 50,
      }
    }
  }

  async getAllPosts(params: Omit<WordPressQueryParams, 'page' | 'per_page'> = {}): Promise<WordPressPost[]> {
    const allPosts: WordPressPost[] = []
    let currentPage = 1
    let totalPages = 1
    const perPage = 100 // Use larger page size for efficiency

    do {
      try {
        const response = await this.getPosts({
          ...params,
          page: currentPage,
          per_page: perPage,
        })

        allPosts.push(...response.data)
        totalPages = response.totalPages
        currentPage++
        
        // Add a small delay to avoid overwhelming the API
        if (currentPage <= totalPages) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      } catch (error) {
        console.error(`Error fetching page ${currentPage}:`, error)
        break
      }
    } while (currentPage <= totalPages)

    return allPosts
  }

  async getPost(slug: string): Promise<WordPressPost | null> {
    try {
      const response = await this.fetchAPI('/posts', {
        slug,
        _embed: true,
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }



  async getPostById(id: number): Promise<WordPressPost | null> {
    try {
      const response = await this.fetchAPI(`/posts/${id}`, {
        _embed: true,
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching post by ID:', error)
      return null
    }
  }

  async getFeaturedPosts(limit: number = 5): Promise<WordPressPost[]> {
    try {
      // Get all categories to find the 'Featured' category ID
      const categories = await this.getCategories()
      const featuredCategory = categories.find(cat => cat.name.toLowerCase() === 'featured')
      
      if (featuredCategory) {
        // Get posts from the 'Featured' category
        const response = await this.getPostsByCategory(featuredCategory.id, {
          per_page: limit,
          _embed: true,
          orderby: 'date',
          order: 'desc'
        })
        
        if (response.data && response.data.length > 0) {
          return response.data
        }
      }
      
      // If no Featured category exists or no posts in it, try sticky posts as fallback
      const stickyResponse = await this.getPosts({
        sticky: true,
        per_page: limit,
        _embed: true,
      })
      
      return stickyResponse.data || []
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      // Return empty array to show placeholder instead of crashing
      return []
    }
  }

  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await this.fetchAPI('/categories', {
        per_page: 100,
        hide_empty: true,
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  async getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
    try {
      const response = await this.fetchAPI('/categories', {
        slug,
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching category:', error)
      return null
    }
  }

  async getPostsByCategory(categoryId: number, params: WordPressQueryParams = {}): Promise<WordPressApiResponse<WordPressPost>> {
    return this.getPosts({
      categories: [categoryId],
      ...params,
    })
  }

  async getAllPostsByCategory(categoryId: number, params: Omit<WordPressQueryParams, 'page' | 'per_page' | 'categories'> = {}): Promise<WordPressPost[]> {
    return this.getAllPosts({
      categories: [categoryId],
      ...params,
    })
  }

  async getPages(): Promise<WordPressPage[]> {
    try {
      const response = await this.fetchAPI('/pages', {
        per_page: 100,
        _embed: true,
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching pages:', error)
      return []
    }
  }

  async getPage(slug: string): Promise<WordPressPage | null> {
    try {
      const response = await this.fetchAPI('/pages', {
        slug,
        _embed: true,
      })
      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error('Error fetching page:', error)
      return null
    }
  }

  async getMedia(id: number): Promise<WordPressMedia | null> {
    try {
      const response = await this.fetchAPI(`/media/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching media:', error)
      return null
    }
  }

  async searchPosts(query: string, params: WordPressQueryParams = {}): Promise<WordPressApiResponse<WordPressPost>> {
    return this.getPosts({
      search: query,
      ...params,
    })
  }

  async searchAllPosts(query: string, params: Omit<WordPressQueryParams, 'page' | 'per_page' | 'search'> = {}): Promise<WordPressPost[]> {
    const allPosts: WordPressPost[] = []
    let currentPage = 1
    let totalPages = 1
    const perPage = 100 // Use larger page size for efficiency

    do {
      try {
        const response = await this.getPosts({
          ...params,
          search: query,
          page: currentPage,
          per_page: perPage,
        })

        allPosts.push(...response.data)
        totalPages = response.totalPages
        currentPage++
        
        // Add a small delay to avoid overwhelming the API
        if (currentPage <= totalPages) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      } catch (error) {
        console.error(`Error fetching search page ${currentPage} for query "${query}":`, error)
        break
      }
    } while (currentPage <= totalPages)

    return allPosts
  }

  async getRelatedPosts(postId: number, categoryIds: number[] = [], limit: number = 4): Promise<WordPressPost[]> {
    try {
      // If we have categories, try to get posts from the same categories first
      if (categoryIds.length > 0) {
        const response = await this.getPosts({
          categories: categoryIds,
          exclude: [postId],
          per_page: limit,
          _embed: true,
        })
        
        // If we got enough posts from the same categories, return them
        if (response.data.length >= limit) {
          return response.data.slice(0, limit)
        }
        
        // If not enough posts from same categories, get more recent posts to fill the gap
        const additionalNeeded = limit - response.data.length
        const additionalPosts = await this.getPosts({
          exclude: [postId, ...response.data.map(p => p.id)],
          per_page: additionalNeeded,
          _embed: true,
        })
        
        return [...response.data, ...additionalPosts.data.slice(0, additionalNeeded)]
      }
      
      // Fallback: get recent posts if no categories
      const response = await this.getPosts({
        exclude: [postId],
        per_page: limit,
        _embed: true,
      })
      return response.data
    } catch (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
  }

  // Helper method to get featured image URL
  getFeaturedImageUrl(post: WordPressPost, size: string = 'large'): string | null {
    const media = post._embedded?.['wp:featuredmedia']?.[0]
    if (!media) return null

    // Try to get the specified size, fallback to source_url
    if (media.media_details?.sizes?.[size]) {
      return media.media_details.sizes[size].source_url
    }

    return media.source_url || null
  }

  // Helper method to get author info
  getAuthor(post: WordPressPost) {
    if (!post._embedded?.author?.[0]) {
      return null
    }
    return post._embedded.author[0] || null
  }

  // Fetch author by ID
  async getAuthorById(authorId: number): Promise<WordPressAuthor | null> {
    try {
      const response = await this.fetchAPI(`/users/${authorId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching author:', error)
      return null
    }
  }

  // Helper method to get post categories
  getPostCategories(post: WordPressPost): WordPressCategory[] {
    if (!post._embedded?.['wp:term']?.[0]) {
      return []
    }
    return post._embedded['wp:term'][0] || []
  }

  // Helper method to clean excerpt
  cleanExcerpt(excerpt: string): string {
    return excerpt.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim()
  }

  // Helper method to extract RankMath data only
  getSEOData(post: WordPressPost) {
    if (post.rank_math) {
      return {
        title: post.rank_math.title || post.title.rendered,
        description: post.rank_math.description || this.cleanExcerpt(post.excerpt.rendered),
        ogTitle: post.rank_math.og_title || post.title.rendered,
        ogDescription: post.rank_math.og_description || this.cleanExcerpt(post.excerpt.rendered),
        ogImage: post.rank_math.og_image?.url || this.getFeaturedImageUrl(post, 'large'),
        twitterTitle: post.rank_math.twitter_title || post.title.rendered,
        twitterDescription: post.rank_math.twitter_description || this.cleanExcerpt(post.excerpt.rendered),
        twitterImage: post.rank_math.twitter_image?.url || this.getFeaturedImageUrl(post, 'large'),
        canonical: post.rank_math.canonical,
      }
    }
    // Fallback to post data
    const featuredImage = this.getFeaturedImageUrl(post, 'large')
    return {
      title: post.title.rendered,
      description: this.cleanExcerpt(post.excerpt.rendered),
      ogTitle: post.title.rendered,
      ogDescription: this.cleanExcerpt(post.excerpt.rendered),
      ogImage: featuredImage,
      twitterTitle: post.title.rendered,
      twitterDescription: this.cleanExcerpt(post.excerpt.rendered),
      twitterImage: featuredImage,
      canonical: null,
    }
  }

  // Helper method to generate post URL
  getPostUrl(post: WordPressPost): string {
    return `/${post.slug}`
  }

  // Helper method to generate category URL
  getCategoryUrl(category: WordPressCategory): string {
    return `/${category.slug}`
  }
}

export const wordpressApi = new WordPressAPI()
export default wordpressApi
