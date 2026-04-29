import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/wordpress'
import { PostCard } from '@/components/ui/PostCard'

export const revalidate = 300
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  try {
    const cats = await getCategories()
    return cats.map(c => ({ slug: c.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = await getCategoryBySlug(slug)
  if (!cat) return { title: 'Not Found' }
  return {
    title: cat.name,
    description: cat.description || `Explore ${cat.name} articles on IndianYug`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const cat = await getCategoryBySlug(slug)
  if (!cat) return notFound()

  const page = parseInt(pageParam || '1')
  const perPage = 12
  const { posts, total, totalPages } = await getPostsByCategory(cat.id, page, perPage)

  return (
    <div className="w-full bg-white dark:bg-[#000000]">
      {/* ── Category Header ────────────────────────── */}
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

      {/* ── Posts Grid ─────────────────────────────── */}
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <>
            {/* First post: wide featured */}
            {posts[0] && <PostCard post={posts[0]} variant="hero-wide" />}
            {/* Rest: 3-col grid */}
            {posts.slice(1).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {posts.slice(1).map(p => (
                  <PostCard key={p.id} post={p} variant="newsroom-card" />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-[#86868b]">No articles yet in this category.</div>
        )}

        {/* ── Pagination ──────────────────────────── */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-14">
            {page > 1 && (
              <Link
                href={`/category/${slug}?page=${page - 1}`}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white dark:bg-[#1d1d1f] border border-[#d2d2d7] dark:border-[#424245] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-[#333336] transition-all"
              >
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-[14px] text-[#86868b]">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/category/${slug}?page=${page + 1}`}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white dark:bg-[#1d1d1f] border border-[#d2d2d7] dark:border-[#424245] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-[#333336] transition-all"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}
