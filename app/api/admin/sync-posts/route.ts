import { NextRequest, NextResponse } from 'next/server'
import { wordpressApi } from '@/lib/wordpress'

export async function POST(request: NextRequest) {
  try {
    // Add basic authentication check (you should implement proper auth)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { category, limit } = await request.json().catch(() => ({}))
    
    let allPosts = []
    
    if (category) {
      // Get all posts from a specific category
      const categoryData = await wordpressApi.getCategoryBySlug(category)
      if (!categoryData) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
      allPosts = await wordpressApi.getAllPostsByCategory(categoryData.id)
    } else {
      // Get all posts from all categories
      allPosts = await wordpressApi.getAllPosts()
    }

    // Apply limit if specified
    if (limit && typeof limit === 'number' && limit > 0) {
      allPosts = allPosts.slice(0, limit)
    }

    return NextResponse.json({
      success: true,
      total: allPosts.length,
      posts: allPosts.map(post => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        status: post.status,
        categories: post.categories,
      }))
    })
  } catch (error) {
    console.error('Error syncing posts:', error)
    return NextResponse.json({
      error: 'Failed to sync posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Add basic authentication check
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '0')

    // Get basic stats about posts
    const stats = await Promise.allSettled([
      wordpressApi.getPosts({ per_page: 1 }), // Just to get total count
      wordpressApi.getCategories()
    ])

    const postsInfo = stats[0].status === 'fulfilled' ? stats[0].value : null
    const categories = stats[1].status === 'fulfilled' ? stats[1].value : []

    return NextResponse.json({
      success: true,
      stats: {
        totalPosts: postsInfo?.total || 0,
        totalPages: postsInfo?.totalPages || 0,
        categories: categories.length,
        categoriesList: categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          count: cat.count
        }))
      }
    })
  } catch (error) {
    console.error('Error getting post stats:', error)
    return NextResponse.json({
      error: 'Failed to get post stats',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
