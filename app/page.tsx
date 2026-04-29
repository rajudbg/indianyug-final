import React from 'react'
import { Metadata } from 'next'
import { HeroSlider } from '@/components/ui/hero-slider'
import { PostCard } from '@/components/ui/post-card'
import { CategoryCard } from '@/components/ui/category-card'
import { wordpressApi } from '@/lib/wordpress'
import { WordPressPost, WordPressCategory } from '@/types/wordpress'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
    title: 'IndianYug - Your Digital Destination',
    description: 'Discover the latest trends, insights, and stories that matter. Your go-to source for digital content and Indian culture.',
    keywords: ['IndianYug', 'blog', 'Indian culture', 'technology', 'lifestyle', 'news'],
}

// ISR Configuration for Cloudflare Pages
export const revalidate = 300 // Revalidate every 5 minutes

// Static categories for the icon-based section
const staticCategories = [
    { id: 1, name: 'News', slug: 'news', description: 'Latest news and current affairs.' },
    { id: 2, name: 'Analysis', slug: 'analysis', description: 'In-depth analysis and insights.' },
    { id: 3, name: 'Featured', slug: 'featured', description: 'Hand-picked featured articles.' },
    { id: 4, name: 'Viral', slug: 'viral', description: 'Trending stories and viral content.' },
    { id: 5, name: 'Science', slug: 'science', description: 'Latest discoveries in science.' },
    { id: 6, name: 'History', slug: 'history', description: 'Explore fascinating historical events.' }
];

const CATEGORIES_TO_DISPLAY = ["News", "Viral", "History", "Science", "Indian Culture", "Interesting Facts"];

export default async function HomePage() {
    // Step 1: Fetch all necessary data in parallel
    const [featuredPosts, allCategories] = await Promise.all([
        wordpressApi.getFeaturedPosts(5),
        wordpressApi.getCategories()
    ]);

    // Step 2: Find the categories we want to display from the full list
    const categoriesToDisplay = CATEGORIES_TO_DISPLAY.map(name => 
        allCategories.find(cat => cat.name.toLowerCase() === name.toLowerCase())
    ).filter((cat): cat is WordPressCategory => cat !== undefined);

    // Step 3: Fetch posts for these categories in parallel
    const postsForCategories = await Promise.all(
        categoriesToDisplay.map(category => 
            wordpressApi.getPostsByCategory(category.id, { per_page: 6, _embed: true })
        )
    );

    // Step 4: Combine the category data with its posts
    const categorySectionsData = categoriesToDisplay.map((category, index) => ({
        category,
        posts: postsForCategories[index].data,
    })).filter(section => section.posts.length > 0);

    return (
        <div className="min-h-screen pt-28 pb-8">
            {/* Hero Section */}
            <section className="mb-2 md:mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HeroSlider posts={featuredPosts} />
                </div>
            </section>

            {/* Featured Categories (Icons) */}
            <section className="py-6 md:py-12 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Discover by <span className="text-gradient">Interest</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staticCategories.map((category) => (
                            <CategoryCard key={category.id} category={category as any} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Post Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-16">
                {categorySectionsData.map(({ category, posts }) => (
                    <CategorySection key={category.id} category={category} posts={posts} />
                ))}
            </div>
        </div>
    )
}

function CategorySection({ category, posts }: { category: WordPressCategory, posts: WordPressPost[] }) {
    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                </h2>
                <Link
                    href={`/${category.slug}`}
                    className="hidden md:inline-flex items-center space-x-2 glass-button"
                >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="text-center mt-8 md:hidden">
                <Link
                    href={`/${category.slug}`}
                    className="inline-flex items-center space-x-2 glass-button"
                >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    )
}
