import type { MetadataRoute } from 'next'
import { getPosts, getCategories } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), priority: 0.4 },
    { url: `${siteUrl}/terms-of-service`, lastModified: new Date(), priority: 0.4 },
    { url: `${siteUrl}/disclaimer`, lastModified: new Date(), priority: 0.4 },
  ]

  try {
    const categories = await getCategories()

    // Paginate through all posts (100 per page)
    const allPosts = []
    let page = 1
    while (true) {
      const { posts, totalPages } = await getPosts({ perPage: 100, page, embed: false })
      allPosts.push(...posts)
      if (page >= totalPages) break
      page++
    }

    const postUrls: MetadataRoute.Sitemap = allPosts.map(p => ({
      url: `${siteUrl}/${p.slug}`,
      lastModified: new Date(p.modified),
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    }))

    const catUrls: MetadataRoute.Sitemap = categories.map(c => ({
      url: `${siteUrl}/category/${c.slug}`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'daily' as const,
    }))

    return [...staticPages, ...postUrls, ...catUrls]
  } catch {
    return staticPages
  }
}
