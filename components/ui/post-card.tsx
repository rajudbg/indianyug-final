'use client'

import React from 'react'
import Link from 'next/link'
import { OptimizedImage } from './optimized-image'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { PostCardProps } from '@/types/wordpress'
import { wordpressApi } from '@/lib/wordpress'
import { decodeHtmlEntities } from '@/lib/content-processor'


export function PostCard({ post, variant = 'default', className = '' }: PostCardProps) {
  const featuredImage = wordpressApi.getFeaturedImageUrl(post, 'medium_large')
  const author = wordpressApi.getAuthor(post)
  const categories = wordpressApi.getPostCategories(post)
  const excerpt = wordpressApi.cleanExcerpt(post.excerpt.rendered)

  const cardVariants = {
    default: 'glass-card',
    featured: 'glass-card lg:col-span-2',
    minimal: 'glass-card p-4',
  }

  const imageVariants = {
    default: 'h-64 sm:h-56',
    featured: 'h-80 lg:h-96',
    minimal: 'h-48 sm:h-40',
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true }}
      className={`${cardVariants[variant]} ${className}`}
    >
      <Link href={wordpressApi.getPostUrl(post)} className="block group">
        {/* Featured Image */}
        {featuredImage && (
          <div className={`relative overflow-hidden rounded-xl mb-4 ${imageVariants[variant]}`}>
            <OptimizedImage
              src={featuredImage}
              alt={decodeHtmlEntities(post.title.rendered)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes={variant === 'featured' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
              unoptimized={false} // Let Next.js handle optimization
            />
            
            {/* Category Badge */}
            {categories.length > 0 && (
              <div className="absolute top-3 left-3">
                <span className="glass px-3 py-1 text-xs font-medium rounded-full bg-neutral-100/80 dark:bg-neutral-900/20 text-neutral-800 dark:text-neutral-200 backdrop-blur-[10px]">
                  {categories[0].name}
                </span>
              </div>
            )}

            {/* Reading Time */}
            <div className="absolute top-3 right-3">
              <div className="glass px-2 py-1 text-xs rounded-full flex items-center space-x-1 text-neutral-700 dark:text-neutral-200">
                <Clock className="w-3 h-3" />
                <span>{Math.ceil(post.content.rendered.length / 1000)} min read</span>
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMM d, yyyy')}
              </time>
            </div>
            {author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{author.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className={`font-bold text-neutral-800 dark:text-neutral-100 ${
            variant === 'featured' ? 'text-xl lg:text-2xl' : 'text-lg'
          } line-clamp-2`}>
            {decodeHtmlEntities(post.title.rendered)}
          </h2>

          {/* Excerpt - REMOVED as requested */}


        </div>
      </Link>
    </motion.article>
  )
}
