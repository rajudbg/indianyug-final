import type { WPPost } from '@/types/wordpress'

const CMS_UPLOADS_BASE = 'https://cms.indianyug.com/wp-content/uploads/'

export function normalizeCmsMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  return url.replace(/https?:\/\/(?:www\.)?indianyug\.com\/wp-content\/uploads\//gi, CMS_UPLOADS_BASE)
}

export function normalizeWordPressHtmlMediaUrls(html: string): string {
  let normalized = html.replace(/https?:\/\/(?:www\.)?indianyug\.com\/wp-content\/uploads\//gi, CMS_UPLOADS_BASE)
  
  // Rewrite internal article links (both cms. and main domain) back to relative paths
  normalized = normalized.replace(/href=["']https?:\/\/(?:cms\.|www\.)?indianyug\.com\/(?!wp-content\/)([^"']*)["']/gi, 'href="/$1"')
  
  // Remove anchor tags that point directly to CMS media uploads (e.g. clicking an image)
  normalized = normalized.replace(/<a[^>]*href=["']https?:\/\/(?:cms\.|www\.)?indianyug\.com\/wp-content\/uploads\/[^"']*["'][^>]*>(.*?)<\/a>/gi, '$1')
  
  return normalized
}

export function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#038;/g, '&')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&nbsp;/g, ' ')
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

export function readingTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getFeaturedImage(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const image = (
    media?.media_details?.sizes?.large?.source_url ??
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.media_details?.sizes?.medium?.source_url ??
    media?.source_url ??
    null
  )
  return normalizeCmsMediaUrl(image)
}

export function getPostCategories(post: WPPost) {
  return (
    post._embedded?.['wp:term']?.[0]?.filter(t => t.taxonomy === 'category') ?? []
  )
}

export function getAuthor(post: WPPost) {
  return post._embedded?.author?.[0] ?? null
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getExcerpt(post: WPPost, maxLength = 150): string {
  const text = stripHtml(decodeHtml(post.excerpt.rendered))
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '…' : text
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
