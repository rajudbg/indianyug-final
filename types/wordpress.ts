export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  featured_media: number
  author: number
  categories: number[]
  tags: number[]
  sticky: boolean
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          medium_large?: { source_url: string }
          large?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
    }>>
    author?: Array<{
      id: number
      name: string
      slug: string
      avatar_urls?: Record<string, string>
      description?: string
    }>
  }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
  parent: number
}

export interface WPPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  date: string
}

export interface PaginatedPosts {
  posts: WPPost[]
  total: number
  totalPages: number
}
