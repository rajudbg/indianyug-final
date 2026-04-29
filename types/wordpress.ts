export interface WordPressPost {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: any[]
  categories: number[]
  tags: number[]
  acf?: any
  rank_math?: {
    title: string
    description: string
    canonical: string
    robots: string[]
    og_title: string
    og_description: string
    og_image: {
      url: string
    }
    twitter_title: string
    twitter_description: string
    twitter_image: {
      url: string
    }
    head: string
    rich_snippet?: any
  }
  yoast_head?: string
  yoast_head_json?: {
    title: string
    description: string
    robots: {
      index: string
      follow: string
      'max-snippet': string
      'max-image-preview': string
      'max-video-preview': string
    }
    canonical: string
    og_locale: string
    og_type: string
    og_title: string
    og_description: string
    og_url: string
    og_site_name: string
    article_published_time: string
    article_modified_time: string
    og_image: Array<{
      width: number
      height: number
      url: string
      type: string
    }>
    author: string
    twitter_card: string
    twitter_misc: {
      'Written by': string
      'Est. reading time': string
    }
    schema: any
  }
  _embedded?: {
    author: WordPressAuthor[]
    'wp:featuredmedia': WordPressMedia[]
    'wp:term': WordPressCategory[][]
  }
}

export interface WordPressCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
  meta: any[]
  acf?: any
}

export interface WordPressTag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  meta: any[]
  acf?: any
}

export interface WordPressAuthor {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls: {
    '24': string
    '48': string
    '96': string
  }
  meta: any[]
  acf?: any
}

export interface WordPressMedia {
  id: number
  date: string
  slug: string
  type: string
  link: string
  title: {
    rendered: string
  }
  author: number
  caption: {
    rendered: string
  }
  alt_text: string
  media_type: string
  mime_type: string
  media_details: {
    width: number
    height: number
    file: string
    sizes: {
      [key: string]: {
        file: string
        width: number
        height: number
        mime_type: string
        source_url: string
      }
    }
    image_meta: any
  }
  source_url: string
  _embedded?: any
}

export interface WordPressPage {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  parent: number
  menu_order: number
  comment_status: string
  ping_status: string
  template: string
  meta: any[]
  acf?: any
  yoast_head?: string
  yoast_head_json?: any
  _embedded?: {
    author: WordPressAuthor[]
    'wp:featuredmedia': WordPressMedia[]
  }
}

export interface WordPressApiResponse<T> {
  data: T[]
  total: number
  totalPages: number
  page: number
  perPage: number
}

export interface WordPressQueryParams {
  page?: number
  per_page?: number
  search?: string
  categories?: number[]
  tags?: number[]
  author?: number
  before?: string
  after?: string
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'modified'
  order?: 'asc' | 'desc'
  status?: string
  sticky?: boolean
  _embed?: boolean
  _fields?: string
  exclude?: number[]
}

export interface PostCardProps {
  post: WordPressPost
  variant?: 'default' | 'featured' | 'minimal'
  className?: string
}

export interface CategoryCardProps {
  category: WordPressCategory
  className?: string
}

export interface HeroSlideProps {
  post: WordPressPost
  isActive?: boolean
}
