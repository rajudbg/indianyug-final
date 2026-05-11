import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPost, getCategoryBySlug, getPostsByCategory, getRelatedPosts, getPosts } from '@/lib/wordpress'
import { getFeaturedImage, getPostCategories, getAuthor, formatDate, decodeHtml, readingTime, normalizeWordPressHtmlMediaUrls } from '@/lib/utils'
import { ArticleContent } from '@/components/post/ArticleContent'
import { ShareButtons } from '@/components/post/ShareButtons'
import { PostCard } from '@/components/ui/PostCard'

export const revalidate = 300
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  try {
    const [posts, categories] = await Promise.all([
      getPosts({ perPage: 30, embed: false }),
      import('@/lib/wordpress').then(m => m.getCategories()),
    ])
    return [
      ...posts.posts.map(p => ({ slug: p.slug })),
      ...categories.map(c => ({ slug: c.slug })),
    ]
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'

  const post = await getPost(slug)
  if (post) {
    const title = decodeHtml(post.title.rendered)
    const image = getFeaturedImage(post)
    return {
      title,
      description: decodeHtml(post.excerpt.rendered).replace(/<[^>]*>/g, '').slice(0, 160),
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: {
        title,
        type: 'article',
        url: `${siteUrl}/${slug}`,
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
      },
      twitter: { card: 'summary_large_image', title },
    }
  }

  const cat = await getCategoryBySlug(slug)
  if (cat) {
    return {
      title: cat.name,
      description: `Explore ${cat.name} articles on IndianYug`,
    }
  }

  return { title: 'Not Found' }
}

// ── Post page ──────────────────────────────────────────────────────────────
async function PostPage({ slug }: { slug: string }) {
  const post = await getPost(slug)
  if (!post) return notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'
  const image = getFeaturedImage(post)
  const categories = getPostCategories(post)
  const author = getAuthor(post)
  const title = decodeHtml(post.title.rendered)
  const normalizedContent = normalizeWordPressHtmlMediaUrls(post.content.rendered)
  const mins = readingTime(normalizedContent)
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  const relatedPosts = await getRelatedPosts(post, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image ? [image] : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    author: author ? [{ '@type': 'Person', name: author.name }] : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'IndianYug',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${slug}` },
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 200),
  }

  return (
    <div className="w-full bg-white dark:bg-[#000000]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">

        {/* ── Article header ──────────────────────────── */}
        <header className="mb-8">
          {/* Back + category row */}
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[13px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
            >
              <ArrowLeft size={14} /> Newsroom
            </Link>
            {categories[0] && (
              <>
                <span className="text-[#d2d2d7] dark:text-[#424245]">/</span>
                <Link
                  href={`/category/${categories[0].slug}`}
                  className="text-[12px] font-semibold text-[#86868b] uppercase tracking-widest hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
                >
                  {categories[0].name}
                </Link>
              </>
            )}
          </div>

          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] tracking-tight mb-5">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#86868b] pb-6 border-b border-[#d2d2d7] dark:border-[#424245]">
            {author && (
              <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{author.name}</span>
            )}
            <span>{formatDate(post.date)}</span>
            <span>{mins} min read</span>
            <div className="ml-auto">
              <ShareButtons url={`${siteUrl}/${slug}`} title={title} />
            </div>
          </div>
        </header>

        {/* ── Featured image ──────────────────────────── */}
        {image && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-[#f5f5f7] dark:bg-[#1d1d1f] article-image-fade">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 780px) 100vw, 780px"
            />
          </div>
        )}

        {/* ── Article body ────────────────────────────── */}
        <ArticleContent content={normalizedContent} adSlot={adSlot} adsenseClient={adsenseClient} />

        {/* ── Tags + share ────────────────────────────── */}
        <footer className="mt-12 pt-8 border-t border-[#d2d2d7] dark:border-[#424245]">
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {categories.map(c => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-[#f5f5f7] dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] border border-[#d2d2d7] dark:border-[#424245] hover:bg-[#e8e8ed] dark:hover:bg-[#333336] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          <ShareButtons url={`${siteUrl}/${slug}`} title={title} />
        </footer>
      </article>

      {/* ── Related posts — Apple 'More from Newsroom' style ─── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white dark:bg-[#000000]">
          <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
            <h2 className="text-[21px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight mb-2">
              More from IndianYug
            </h2>
            <div className="border-t border-[#d2d2d7] dark:border-[#424245]">
              {relatedPosts.map(p => (
                <PostCard key={p.id} post={p} variant="related" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// ── Category page (inline when /[slug] matches a category) ─────────────────
async function CategoryPage({ slug, page }: { slug: string; page: number }) {
  const cat = await getCategoryBySlug(slug)
  if (!cat) return notFound()

  const perPage = 12
  const { posts, total, totalPages } = await getPostsByCategory(cat.id, page, perPage)

  return (
    <div className="w-full bg-white dark:bg-[#000000]">
      <section className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-[#d2d2d7] dark:border-[#424245]">
        <p className="text-[12px] font-semibold text-[#86868b] uppercase tracking-widest mb-3">Category</p>
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] tracking-tight">
          {cat.name}
        </h1>
        {cat.description && (
          <p className="mt-3 text-[17px] text-[#6e6e73] dark:text-[#86868b] max-w-2xl">{cat.description}</p>
        )}
        <p className="mt-2 text-[13px] text-[#86868b]">{total} articles</p>
      </section>

      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts[0] && <PostCard post={posts[0]} variant="hero-wide" />}
        {posts.slice(1).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {posts.slice(1).map(p => <PostCard key={p.id} post={p} variant="newsroom-card" />)}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-14">
            {page > 1 && (
              <Link href={`/${slug}?page=${page - 1}`} className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white dark:bg-[#1d1d1f] border border-[#d2d2d7] dark:border-[#424245] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-[#333336] transition-all">
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-[14px] text-[#86868b]">Page {page} of {totalPages}</span>
            {page < totalPages && (
              <Link href={`/${slug}?page=${page + 1}`} className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white dark:bg-[#1d1d1f] border border-[#d2d2d7] dark:border-[#424245] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-[#333336] transition-all">
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}

// ── Route handler ──────────────────────────────────────────────────────────
export default async function SlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = parseInt(pageParam || '1')

  // Try post first
  const post = await getPost(slug)
  if (post) return <PostPage slug={slug} />

  // Fallback to category
  const cat = await getCategoryBySlug(slug)
  if (cat) return <CategoryPage slug={slug} page={page} />

  return notFound()
}
