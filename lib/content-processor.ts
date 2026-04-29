/**
 * Utility functions to process WordPress content and fix internal links
 */

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://indianyug.com';

/**
 * Decodes common HTML entities from a string. This is a simplified, server-safe
 * alternative to heavier libraries.
 * @param text The string to decode.
 * @returns The decoded string.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  // A map of common entities. This can be expanded.
  const entities: { [key: string]: string } = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    '&#39;': "'",
    '&#8211;': '–', // en dash
    '&#8212;': '—', // em dash
    '&#8216;': '‘',
    '&#8217;': '’',
    '&#8220;': '“',
    '&#8221;': '”',
    '&#038;': '&',
  };

  return text.replace(/(&#?\w+;)/g, (match) => {
    return entities[match] || match;
  });
}

/**
 * Process WordPress content to fix internal links
 * Replaces WordPress URLs with Next.js frontend URLs
 */
export function processWordPressContent(content: string): string {
  if (!content || typeof content !== 'string') return '';

  try {
    // Replace WordPress post URLs with Next.js post URLs
    // Pattern: https://indianyug.com/YYYY/MM/DD/post-slug/
    const postUrlPattern = new RegExp(`${WORDPRESS_BASE_URL.replace('https://', 'https?://')}/\\d{4}/\\d{2}/\\d{2}/([^/]+)/?`, 'g');
    content = content.replace(postUrlPattern, '/$1');

  // Replace WordPress category URLs with Next.js category URLs
  // Pattern: https://indianyug.com/category/category-slug/
  const categoryUrlPattern = new RegExp(`${WORDPRESS_BASE_URL.replace('https://', 'https?://')}/category/([^/]+)/?`, 'g');
  content = content.replace(categoryUrlPattern, '/$1');

  // Replace WordPress tag URLs with Next.js tag URLs (if you have tags)
  // Pattern: https://indianyug.com/tag/tag-slug/
  const tagUrlPattern = new RegExp(`${WORDPRESS_BASE_URL.replace('https://', 'https?://')}/tag/([^/]+)/?`, 'g');
  content = content.replace(tagUrlPattern, '/tag/$1');

  // Replace WordPress page URLs with Next.js page URLs
  // Pattern: https://indianyug.com/page-slug/
  // This is more generic and should be handled carefully to avoid breaking external links
  const pageUrlPattern = new RegExp(`${WORDPRESS_BASE_URL.replace('https://', 'https?://')}/([^/]+)/?$`, 'g');
  content = content.replace(pageUrlPattern, (match, slug) => {
    // Skip common WordPress paths and external domains
    const skipPatterns = [
      'wp-content', 'wp-admin', 'wp-json', 'wp-includes',
      'feed', 'comments', 'author', 'search', 'page',
      'xmlrpc.php', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.doc', '.docx'
    ];
    
    if (skipPatterns.some(pattern => slug.includes(pattern))) {
      return match;
    }
    
    return `/${slug}`;
  });

    // Fix wp-content image URLs FIRST (before general URL transformation)
    content = content.replace(/href="https?:\/\/(www\.)?indianyug\.com\/wp-content\/uploads\/([^"]*)"/g, 'href="/images/$2"');
    content = content.replace(/src="https?:\/\/(www\.)?indianyug\.com\/wp-content\/uploads\/([^"]*)"/g, 'src="/images/$2"');
    content = content.replace(/href="https?:\/\/cms\.indianyug\.com\/wp-content\/uploads\/([^"]*)"/g, 'href="/images/$1"');
    content = content.replace(/src="https?:\/\/cms\.indianyug\.com\/wp-content\/uploads\/([^"]*)"/g, 'src="/images/$1"');
    
    // Then ensure all other internal links use relative URLs
    content = content.replace(/href="https?:\/\/(www\.)?indianyug\.com([^"]*)"/g, 'href="$2"');

    return content;
  } catch (error) {
    console.error('Error processing WordPress content:', error);
    return content || '';
  }
}

/**
 * Process post excerpt to fix links
 */
export function processWordPressExcerpt(excerpt: string): string {
  return processWordPressContent(excerpt);
}

/**
 * Check if a URL is an internal WordPress URL
 */
export function isInternalWordPressUrl(url: string): boolean {
  const wordpressDomain = WORDPRESS_BASE_URL.replace('https://', '').replace('http://', '');
  return url.includes(wordpressDomain) || url.startsWith('/') || url.startsWith('#');
}

/**
 * Convert WordPress URL to Next.js URL
 */
export function convertWordPressUrl(wordpressUrl: string): string {
  if (!wordpressUrl) return wordpressUrl;

  // If it's already a relative URL, return as-is
  if (wordpressUrl.startsWith('/')) {
    return wordpressUrl;
  }

  // Process WordPress URLs
  const urlWithoutProtocol = wordpressUrl.replace(/^https?:\/\/[^/]+/, '');

  // Handle post URLs: /YYYY/MM/DD/post-slug/
  const postMatch = urlWithoutProtocol.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/);
  if (postMatch) {
    return `/${postMatch[1]}`;
  }

  // Handle category URLs: /category/category-slug/
  const categoryMatch = urlWithoutProtocol.match(/^\/category\/([^/]+)\/?$/);
  if (categoryMatch) {
    return `/${categoryMatch[1]}`;
  }

  // Handle tag URLs: /tag/tag-slug/
  const tagMatch = urlWithoutProtocol.match(/^\/tag\/([^/]+)\/?$/);
  if (tagMatch) {
    return `/tag/${tagMatch[1]}`;
  }

  // Handle page URLs: /page-slug/
  const pageMatch = urlWithoutProtocol.match(/^\/([^/]+)\/?$/);
  if (pageMatch) {
    const slug = pageMatch[1];
    // Skip common WordPress paths
    const skipPatterns = [
      'wp-content', 'wp-admin', 'wp-json', 'wp-includes',
      'feed', 'comments', 'author', 'search', 'page',
      'xmlrpc.php'
    ];
    
    if (!skipPatterns.some(pattern => slug.includes(pattern))) {
      return `/${slug}`;
    }
  }

  return urlWithoutProtocol || wordpressUrl;
}
