import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PostCard } from '@/components/ui/PostCard'
import { getFeaturedPosts, getPosts, getCategories } from '@/lib/wordpress'
import type { WPCategory, WPPost } from '@/types/wordpress'
import { AnimatedHero, AnimatedGrid, AnimatedGridItem, AnimatedSection } from '@/components/newsroom/Animations'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'IndianYug – Bridging Tradition with Innovation',
  description: 'Explore Indian culture, technology, lifestyle, business and more at IndianYug.',
}

const SECTION_CATEGORIES = [
  'News',
  'Indian Culture',
  'Interesting Facts',
  'History',
  'Science',
  'Current Events',
]

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedPosts(4),
    getCategories(),
  ])

  const hero = featured[0]
  const subHero = featured.slice(1, 4)

  // Match section categories against live API data
  const sectionCats = SECTION_CATEGORIES
    .map(name => categories.find(c => c.name.toLowerCase() === name.toLowerCase()))
    .filter((c): c is WPCategory => c !== undefined)

  // Fetch posts for each section in parallel (6 posts for Apple Newsroom style)
  const sectionPosts = await Promise.all(
    sectionCats.map(c => getPosts({ categories: [c.id], perPage: 6, embed: true }))
  )

  const sections = sectionCats
    .map((cat, i) => ({ cat, posts: sectionPosts[i].posts }))
    .filter(s => s.posts.length > 0)

  // Category quick-links (sorted by count, no Featured)
  const topCats = [...categories]
    .filter(c => c.slug !== 'featured')
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

  return (
    <div className="w-full bg-[#f5f5f7] dark:bg-[#000000]">

      {/* ── Hero Section (Apple Newsroom Style) ──────────────────────────── */}
      {hero && (
        <AnimatedHero>
          <section className="w-full bg-[#f5f5f7] dark:bg-[#121212] pt-10 md:pt-14 pb-10 md:pb-14">
            <PostCard post={hero} variant="hero" />
          </section>
        </AnimatedHero>
      )}

      {/* ── Latest News Section ──────────────────────────── */}
      {subHero.length > 0 && (
        <section className="max-w-[1024px] mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-12">
          <AnimatedGrid containerClassName="">
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] tracking-tight mb-8">
              Latest News
            </h2>
            {/* First post: wide horizontal featured card */}
            {subHero[0] && (
              <AnimatedGridItem>
                <PostCard post={subHero[0]} variant="hero-wide" />
              </AnimatedGridItem>
            )}
            {/* Remaining posts: 2-col or 3-col grid */}
            {subHero.slice(1).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {subHero.slice(1).map((post) => (
                  <AnimatedGridItem key={post.id}>
                    <PostCard post={post} variant="newsroom" />
                  </AnimatedGridItem>
                ))}
              </div>
            )}
          </AnimatedGrid>
        </section>
      )}

      {/* ── Category Filter Tabs (Apple Style) ────────────────────── */}
      <section className="border-t border-b border-[#d2d2d7] dark:border-[#424245] bg-[#f5f5f7] dark:bg-[#000000]">
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3">
            {topCats.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold tracking-wide
                           bg-white dark:bg-[#1d1d1f] border border-[#d2d2d7] dark:border-[#424245]
                           text-[#1d1d1f] dark:text-[#f5f5f7]
                           hover:bg-[#e8e8ed] dark:hover:bg-[#333336]
                           transition-all duration-300"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Per-category post sections (Apple Newsroom Style) ─────────────────── */}
      <div className="max-w-[1024px] mx-auto px-5 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col space-y-20 pb-12">
          {sections.map(({ cat, posts }) => (
            <CategorySection key={cat.id} category={cat} posts={posts} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CategorySection({ category, posts }: { category: WPCategory; posts: WPPost[] }) {
  if (posts.length === 0) return null

  return (
    <AnimatedSection>
      {/* Category Header */}
      <div className="flex items-end justify-between mb-12 pb-4 border-b border-[#d2d2d7] dark:border-[#424245]">
        <h2 className="apple-heading-md text-[#1d1d1f] dark:text-[#f5f5f7]">
          {category.name}
        </h2>
        <Link
          href={`/category/${category.slug}`}
          className="flex items-center gap-1 text-[15px] text-[#0066cc] hover:underline font-medium"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {/* Apple Newsroom: first card is wide horizontal, rest in 2-col grid */}
      <AnimatedGrid containerClassName="">
        {posts[0] && (
          <AnimatedGridItem>
            <PostCard post={posts[0]} variant="hero-wide" />
          </AnimatedGridItem>
        )}
        {posts.slice(1, 5).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {posts.slice(1, 5).map((post) => (
              <AnimatedGridItem key={post.id}>
                <PostCard post={post} variant="newsroom-card" />
              </AnimatedGridItem>
            ))}
          </div>
        )}
      </AnimatedGrid>

      {/* View More Link for Mobile */}
      <div className="text-center mt-10 md:hidden">
        <Link 
          href={`/category/${category.slug}`} 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[15px] 
                     bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] 
                     border border-[#d2d2d7] dark:border-[#424245] 
                     hover:bg-[#e8e8ed] dark:hover:bg-[#333336]
                     transition-all duration-300"
        >
          View all {category.name} <ArrowRight size={14} />
        </Link>
      </div>
    </AnimatedSection>
  )
}
