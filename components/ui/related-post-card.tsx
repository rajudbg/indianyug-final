'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { WordPressPost } from '@/types/wordpress'
import { wordpressApi } from '@/lib/wordpress'
import { BookOpen } from 'lucide-react'

interface RelatedPostCardProps {
  post: WordPressPost
}

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  const featuredImage = wordpressApi.getFeaturedImageUrl(post, 'medium')
  const postUrl = wordpressApi.getPostUrl(post)
  const formattedDate = format(new Date(post.date), 'MMM d, yyyy')

  return (
    <div className="my-8">
      <style jsx>{`
        .related-post-card .related-title {
          text-decoration: none;
        }
      `}</style>
      <div className="related-post-card p-4 rounded-2xl glass dark:bg-neutral-800/30 border border-white/20 dark:border-neutral-700/50 transition-all duration-300">
        <div className="flex items-center mb-3">
          <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">You might also like</span>
        </div>
        <Link href={postUrl} className="flex items-start gap-4 text-left">
          {featuredImage && (
            <div className="flex-shrink-0">
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                width={140}
                height={140}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-grow">
            <h4 className="related-title text-md font-bold text-neutral-800 dark:text-neutral-200 leading-tight mb-1">
              {post.title.rendered}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
