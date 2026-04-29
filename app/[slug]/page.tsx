import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { wordpressApi } from '@/lib/wordpress'
import { processWordPressContent, decodeHtmlEntities } from '@/lib/content-processor'
import { PostCard } from '@/components/ui/post-card'
import { ShareButtons } from '@/components/ui/share-buttons'
import WordPressContentRenderer from '@/components/ui/wordpress-content-renderer'
import { AdBanner } from '@/components/ui/ad-banner'
import { AuthorAvatar } from '@/components/ui/author-avatar'
import { RelatedPostsInjector } from '@/components/ui/related-posts-injector'
import { WordPressPost, WordPressCategory } from '@/types/wordpress'
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  BookOpen,
  Hash
} from 'lucide-react'

interface PageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}


// Generate static params for all posts at build time
export async function generateStaticParams() {
  try {
    const allPosts = await wordpressApi.getAllPosts();
    const allCategories = await wordpressApi.getCategories();
    
    return [
      ...allPosts.map((post) => ({ slug: post.slug })),
      ...allCategories.map((category) => ({ slug: category.slug }))
    ];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Dynamic Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const [post, category] = await Promise.all([
    wordpressApi.getPost(slug),
    wordpressApi.getCategoryBySlug(slug)
  ])

  if (post) {
    const seoData = wordpressApi.getSEOData(post)
    const decodedTitle = decodeHtmlEntities(seoData.title)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'
    const postUrl = `${siteUrl}/${post.slug}`

    // Ensure images have full URLs
    const makeFullUrl = (url: string | null) => {
      if (!url) return null
      return url.startsWith('http') ? url : `${siteUrl}${url}`
    }

    return {
      title: `${decodedTitle} | IndianYug`,
      description: seoData.description,
      keywords: wordpressApi.getPostCategories(post).map(cat => cat.name),
      authors: [{ name: wordpressApi.getAuthor(post)?.name || 'IndianYug Team' }],
      alternates: {
        canonical: postUrl, // Always use /{slug} as canonical
      },
      openGraph: {
        title: decodeHtmlEntities(seoData.ogTitle),
        description: seoData.ogDescription,
        type: 'article',
        url: seoData.canonical || postUrl,
        siteName: 'IndianYug',
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [wordpressApi.getAuthor(post)?.name || 'IndianYug Team'],
        section: wordpressApi.getPostCategories(post)[0]?.name,
        tags: wordpressApi.getPostCategories(post).map(cat => cat.name),
        images: seoData.ogImage ? [{ 
          url: makeFullUrl(seoData.ogImage)!,
          width: 1200,
          height: 630,
          alt: decodedTitle,
        }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        site: '@indianyug',
        creator: '@indianyug',
        title: decodeHtmlEntities(seoData.twitterTitle),
        description: seoData.twitterDescription,
        images: seoData.twitterImage ? [makeFullUrl(seoData.twitterImage)!] : undefined,
      },
    }
  }

  if (category) {
    const description = category.description 
      ? category.description.replace(/<[^>]*>/g, '').trim()
      : `Explore articles in the ${category.name} category on IndianYug.`
    return {
      title: `${category.name} | IndianYug`,
      description,
      openGraph: {
        title: `${category.name} | IndianYug`,
        description,
        type: 'website',
        url: `/${category.slug}`,
      },
    }
  }

  return {
    title: 'Not Found | IndianYug',
    description: 'The requested page could not be found.',
  }
}

// Main Page Component
export default async function SlugPage({ params, searchParams }: PageProps) {
  const { slug } = params
  const page = parseInt(searchParams.page || '1', 10)

  const [post, category] = await Promise.all([
    wordpressApi.getPost(slug),
    wordpressApi.getCategoryBySlug(slug)
  ])

  if (post) {
    const categories = wordpressApi.getPostCategories(post)
    const relatedPosts = await wordpressApi.getRelatedPosts(
      post.id,
      categories.map(cat => cat.id),
      6
    )
    
    const excludeIds = [post.id, ...relatedPosts.map(p => p.id)];
    const popularPostsData = await wordpressApi.getPosts({ per_page: 6, exclude: excludeIds });
    const popularPosts = popularPostsData.data;

    return <PostPage post={post} relatedPosts={relatedPosts} popularPosts={popularPosts} />
  }

  if (category) {
    const postsResult = await wordpressApi.getPostsByCategory(category.id, {
      page,
      per_page: 24,
      _embed: true,
    })
    return <CategoryPage category={category} postsResult={postsResult} />
  }

  notFound()
}


// --- Sub-component for Post Rendering ---
async function PostPage({ post, relatedPosts, popularPosts }: { post: WordPressPost, relatedPosts: WordPressPost[], popularPosts: WordPressPost[] }) {
  let author = wordpressApi.getAuthor(post)
  
  // If author is not embedded, try to fetch it separately
  if (!author && post.author) {
    author = await wordpressApi.getAuthorById(post.author)
  }
  

  const categories = wordpressApi.getPostCategories(post)
  const featuredImage = wordpressApi.getFeaturedImageUrl(post, 'full')
  const processedContent = processWordPressContent(post.content.rendered)
  const readingTime = Math.ceil(post.content.rendered.length / 1000)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'}/${post.slug}`

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Liquid Glass Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white/20 to-purple-50/30 dark:from-gray-900/30 dark:via-gray-800/20 dark:to-slate-900/30" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-200/20 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/15 to-primary-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-2xl" />
      </div>

      <article className="py-12 relative z-10">
        <header className="mb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={wordpressApi.getCategoryUrl(category)}
                    className="glass px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
              {decodeHtmlEntities(post.title.rendered)}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-4">
              {author && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{author.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            <ShareButtons url={shareUrl} title={decodeHtmlEntities(post.title.rendered)} className="mb-12" />
          </div>
          {featuredImage && (
            <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] mb-12">
              <Image src={featuredImage} alt={decodeHtmlEntities(post.title.rendered)} fill className="object-cover" priority />
            </div>
          )}
        </header>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="content-glass prose-glass">
            <div className="prose prose-lg max-w-none">
              <WordPressContentRenderer 
                content={processedContent} 
                adType="mixed"
                interval={5}
                maxAds={6}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 pt-8">
            <div className="content-glass">
              {author ? (
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <AuthorAvatar author={author} size={80} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                        About {author.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                        Author
                      </p>
                      {author.description && (
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {author.description}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Author information not available for this post.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad - Before related content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner position="bottom" label="Advertisement" />
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard
                  key={relatedPost.id}
                  post={relatedPost}
                  variant="minimal"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* You May Also Love Section */}
      {popularPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              You May Also Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPosts.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  variant="minimal"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// --- Sub-component for Category Rendering ---
function CategoryPage({ category, postsResult }: { category: WordPressCategory, postsResult: any }) {
  const page = postsResult.page
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {category.description.replace(/<[^>]*>/g, '').trim()}
            </p>
          )}
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {postsResult && postsResult.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {postsResult.data.map((post: WordPressPost) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {postsResult.totalPages > 1 && (
                <div className="flex justify-center space-x-4">
                  {page > 1 && (
                    <Link href={`/${category.slug}?page=${page - 1}`} className="glass-button px-6 py-3">
                      Previous
                    </Link>
                  )}
                  {page < postsResult.totalPages && (
                    <Link href={`/${category.slug}?page=${page + 1}`} className="glass-button px-6 py-3">
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
