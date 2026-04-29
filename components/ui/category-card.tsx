'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    TrendingUp,
    BookOpen,
    Briefcase,
    Calendar,
    GraduationCap,
    Film,
    CheckCircle,
    Hash,
    Lightbulb,
    Globe,
    Heart,
    Camera,
    Code,
    Music,
    Users,
    Star,
    Newspaper,
    BarChart3,
    Zap,
    Flame,
    Microscope
} from 'lucide-react'
import { CategoryCardProps } from '@/types/wordpress'
import { wordpressApi } from '@/lib/wordpress'

// Function to get appropriate icon for category
function getCategoryIcon(categoryName: string) {
    const name = categoryName.toLowerCase()

    // Specific categories
    if (name === 'news') {
        return Newspaper
    }
    if (name === 'analysis') {
        return BarChart3
    }
    if (name === 'featured') {
        return Star
    }
    if (name === 'viral') {
        return Flame
    }
    if (name === 'science') {
        return Microscope
    }
    if (name === 'history') {
        return BookOpen
    }

    // General categories (existing logic)
    if (name.includes('business') || name.includes('finance') || name.includes('economic')) {
        return Briefcase
    }
    if (name.includes('education') || name.includes('learning') || name.includes('academic')) {
        return GraduationCap
    }
    if (name.includes('entertainment') || name.includes('movie') || name.includes('film')) {
        return Film
    }
    if (name.includes('current') || name.includes('news') || name.includes('event')) {
        return Calendar
    }
    if (name.includes('fact') || name.includes('check') || name.includes('verify')) {
        return CheckCircle
    }
    if (name.includes('analysis') || name.includes('insight') || name.includes('data')) {
        return TrendingUp
    }
    if (name.includes('technology') || name.includes('tech') || name.includes('digital')) {
        return Code
    }
    if (name.includes('lifestyle') || name.includes('health') || name.includes('wellness')) {
        return Heart
    }
    if (name.includes('culture') || name.includes('art') || name.includes('creative')) {
        return Star
    }
    if (name.includes('photography') || name.includes('photo') || name.includes('image')) {
        return Camera
    }
    if (name.includes('music') || name.includes('audio') || name.includes('sound')) {
        return Music
    }
    if (name.includes('travel') || name.includes('world') || name.includes('global')) {
        return Globe
    }
    if (name.includes('community') || name.includes('social') || name.includes('people')) {
        return Users
    }
    if (name.includes('tips') || name.includes('advice') || name.includes('guide')) {
        return Lightbulb
    }
    if (name.includes('blog') || name.includes('article') || name.includes('read')) {
        return BookOpen
    }

    // Default icon
    return Hash
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
    const IconComponent = getCategoryIcon(category.name)
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`glass-card group cursor-pointer ${className}`}
        >
            <Link href={wordpressApi.getCategoryUrl(category)} className="block">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="glass p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20">
                            <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-xl text-gray-900 dark:text-white group-hover:text-primary-800 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {category.name}
                            </h3>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ x: 4 }}
                        className="text-primary-800 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </div>

                {/* Description */}
                {category.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {category.description.replace(/<[^>]*>/g, '').trim()}
                    </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                        Category
                    </span>
                    <div className="flex items-center text-primary-800 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
        </motion.article>
    )
}
