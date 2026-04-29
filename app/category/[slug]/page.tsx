import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/ui/post-card'
import { wordpressApi } from '@/lib/wordpress'
import { Hash, Calendar } from 'lucide-react'
import Link from 'next/link'



interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await wordpressApi.getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found | IndianYug',
      description: 'The requested category could not be found.',
    }
  }

  const description = category.description 
    ? category.description.replace(/<[^>]*>/g, '').trim()
    : `Explore articles in the ${category.name} category on IndianYug.`

  return {
    title: `${category.name} | IndianYug`,
    description,
    keywords: [category.name, 'IndianYug', 'blog', 'articles'],
    openGraph: {
      title: `${category.name} | IndianYug`,
      description,
      type: 'website',
      url: `/category/${category.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | IndianYug`,
      description,
    },
  }
}


export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const perPage = 24 // Increased from 12 to 24 for better coverage

  const [category, postsResult] = await Promise.allSettled([
    wordpressApi.getCategoryBySlug(params.slug),
    wordpressApi.getCategoryBySlug(params.slug).then(async (cat) => {
      if (!cat) return null
      return wordpressApi.getPostsByCategory(cat.id, {
        page,
        per_page: perPage,
        _embed: true,
      })
    })
  ])

  if (category.status === 'rejected' || !category.value) {
    notFound()
  }

  const categoryData = category.value
  const posts = postsResult.status === 'fulfilled' && postsResult.value ? postsResult.value : null

  return (
    <div className="min-h-screen pt-20">
      {/* Category Header */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="glass-card text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 mb-6">
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">Category</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryData.name}
            </h1>

            {categoryData.description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                {categoryData.description.replace(/<[^>]*>/g, '').trim()}
              </p>
            )}

            <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{categoryData.count} {categoryData.count === 1 ? 'post' : 'posts'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts.data.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {posts.totalPages > 1 && (
                <div className="flex justify-center space-x-4">
                  {page > 1 && (
                    <Link
                      href={`/category/${params.slug}?page=${page - 1}`}
                      className="glass-button px-6 py-3 text-primary-600 dark:text-primary-400"
                    >
                      Previous
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: Math.min(5, posts.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(posts.totalPages - 4, page - 2)) + i
                      return (
                        <Link
                          key={pageNum}
                          href={`/category/${params.slug}?page=${pageNum}`}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            pageNum === page
                              ? 'bg-primary-600 text-white'
                              : 'glass-button text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                  </div>

                  {page < posts.totalPages && (
                    <Link
                      href={`/category/${params.slug}?page=${page + 1}`}
                      className="glass-button px-6 py-3 text-primary-600 dark:text-primary-400"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="glass-card max-w-md mx-auto">
                <Hash className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No Posts Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This category doesn't have any posts yet. Check back later for new content.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
