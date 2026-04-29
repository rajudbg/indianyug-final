'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Play } from 'lucide-react'
import { format } from 'date-fns'
import useEmblaCarousel from 'embla-carousel-react'
import { WordPressPost } from '@/types/wordpress'
import { wordpressApi } from '@/lib/wordpress'
import { decodeHtmlEntities } from '@/lib/content-processor'

interface HeroSliderProps {
  posts: WordPressPost[]
}

export function HeroSlider({ posts }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: false,
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    // Auto-play
    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => {
      clearInterval(autoplay)
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  if (!posts || posts.length === 0) {
    return (
      <div className="relative h-[70vh] hero-glass rounded-3xl flex items-center justify-center overflow-hidden">
        <div className="text-center max-w-lg px-6">
          <Image
            src="/logo.png"
            alt="IndianYug Logo"
            width={280}
            height={280}
            className="mx-auto mb-6 h-64 w-auto"
          />
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Welcome to IndianYug
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Bridging Worlds, Sharing Stories. Explore a world of diverse perspectives and global insights at Indianyug.com.
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="relative h-[72vh] overflow-hidden rounded-3xl hero-glass shadow-2xl shadow-primary-500/20">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {posts.map((post, index) => {
            const featuredImage = wordpressApi.getFeaturedImageUrl(post, 'full')
            const categories = wordpressApi.getPostCategories(post)

            return (
              <div key={post.id} className="embla__slide flex-[0_0_100%] relative">
                {/* Background Image */}
                {featuredImage && (
                  <div className="absolute inset-0">
                    <Image
                      src={featuredImage}
                      alt={decodeHtmlEntities(post.title.rendered)}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="relative h-full flex items-end pb-20">
                  <div className="max-w-3xl px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Category Badge */}
                      {categories.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {/* Refined category badge styling */}
                          <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full glass-button-subtle bg-neutral-800 dark:bg-neutral-700 text-white">
                            {categories[0].name}
                          </span>
                        </motion.div>
                      )}

                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        style={{
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {decodeHtmlEntities(post.title.rendered)}
                      </motion.h1>

                      {/* Meta Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-6 h-6" />
                          <time dateTime={post.date} className="text-lg">
                            {format(new Date(post.date), 'MMM d, yyyy')}
                          </time>
                        </div>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Link
                          href={wordpressApi.getPostUrl(post)}
                          className="inline-flex items-center space-x-2 gradient-button text-lg text-black"
                        >
                          <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                          <span>Read Article</span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="glass-button p-3 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="glass-button p-3 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {posts.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-white dark:bg-white'
                : 'bg-gray-500 dark:bg-white/50 hover:bg-gray-400 dark:hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 to-gray-700"
          initial={{ width: '0%' }}
          animate={{ width: `${((selectedIndex + 1) / posts.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  )
}
