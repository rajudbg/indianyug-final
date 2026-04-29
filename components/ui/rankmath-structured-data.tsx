import React from 'react';
import { WordPressPost } from '@/types/wordpress';

interface RankMathStructuredDataProps {
  post: WordPressPost;
}

export function RankMathStructuredData({ post }: RankMathStructuredDataProps) {
  // Try to use RankMath structured data first
  if (post.rank_math && post.rank_math.rich_snippet) {
    let jsonLd = post.rank_math.rich_snippet;
    if (typeof jsonLd === 'string') {
      try {
        jsonLd = JSON.parse(jsonLd);
      } catch {
        // If parsing fails, fall back to generated structured data
      }
    }
    if (jsonLd) {
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="rankmath-structured-data"
        />
      );
    }
  }

  // Get featured image URL from embedded data
  const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  
  // Get author name from embedded data
  const authorName = post._embedded?.author?.[0]?.name || "IndianYug";
  
  // Get categories from embedded data
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const categoryNames = categories.map(cat => cat.name);

  // Fallback: Generate structured data from post information
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title.rendered,
    "description": post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    "image": featuredImageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "IndianYug",
      "logo": {
        "@type": "ImageObject",
        "url": "https://indianyug.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://indianyug.com/${post.slug}`
    },
    "url": `https://indianyug.com/${post.slug}`,
    "articleSection": categoryNames[0] || "News",
    "keywords": categoryNames.join(", ") || "News"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      key="fallback-structured-data"
    />
  );
} 