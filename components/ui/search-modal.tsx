'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { wordpressApi } from '@/lib/wordpress'
import { WordPressPost } from '@/types/wordpress'
import { format } from 'date-fns'
import { decodeHtmlEntities } from '@/lib/content-processor'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WordPressPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      setShowResults(true)

      try {
        const results = await wordpressApi.searchAllPosts(query, {
          _embed: true,
        })
        // To avoid overwhelming the UI, let's cap the results displayed
        setResults(results.slice(0, 50))
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPosts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleResultClick = () => {
    onClose()
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 glass-nav backdrop-blur-xl" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl glass rounded-2xl shadow-2xl overflow-hidden"
        >
                           {/* Search Input */}
                 <div className="flex items-center p-4 border-b border-white/20 dark:border-white/10">
                   <Search className="w-5 h-5 text-black mr-3" />
                   <input
                     ref={inputRef}
                     type="text"
                     placeholder="Search posts..."
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-black placeholder:text-black/60"
                   />
                   {isLoading && (
                     <Loader2 className="w-5 h-5 text-black animate-spin mr-3" />
                   )}
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={onClose}
                     className="p-1 text-black hover:text-black/70 transition-colors"
                   >
                     <X className="w-5 h-5" />
                   </motion.button>
                 </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {showResults && (
              <div className="p-4">
                                       {results.length > 0 ? (
                         <div className="space-y-3">
                           <div className="text-sm font-medium text-black mb-4">
                             Found {results.length} result{results.length !== 1 ? 's' : ''}
                           </div>
                           {results.map((post) => (
                             <motion.div
                               key={post.id}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               whileHover={{ scale: 1.02 }}
                               className="glass-card p-4 hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
                             >
                               <Link
                                 href={wordpressApi.getPostUrl(post)}
                                 onClick={handleResultClick}
                                 className="flex items-start space-x-3"
                               >
                                 {/* Featured Image */}
                                 {wordpressApi.getFeaturedImageUrl(post, 'thumbnail') && (
                                   <div className="flex-shrink-0">
                                     <Image
                                       src={wordpressApi.getFeaturedImageUrl(post, 'thumbnail')!}
                                       alt={decodeHtmlEntities(post.title.rendered)}
                                       width={60}
                                       height={60}
                                       className="rounded-lg object-cover"
                                     />
                                   </div>
                                 )}

                                 <div className="flex-1 min-w-0">
                                   <h3 className="font-semibold text-black line-clamp-2 mb-1 text-base">
                                     {decodeHtmlEntities(post.title.rendered)}
                                   </h3>
                                   <p className="text-sm text-black/80 line-clamp-2 mb-2 leading-relaxed">
                                     {wordpressApi.cleanExcerpt(post.excerpt.rendered)}
                                   </p>
                                   <div className="flex items-center text-xs font-medium text-black/60">
                                     <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                                     {wordpressApi.getPostCategories(post).length > 0 && (
                                     <>
                                     <span className="mx-2">•</span>
                                     <span>{wordpressApi.getPostCategories(post)[0].name}</span>
                                       </>
                                     )}
                                   </div>
                                 </div>
                               </Link>
                             </motion.div>
                           ))}
                         </div>
                                       ) : (
                         <div className="text-center py-8">
                           <Search className="w-12 h-12 text-black/40 mx-auto mb-4" />
                           <h3 className="text-lg font-semibold text-black mb-2">
                             {query ? 'No results found' : 'Start typing to search'}
                           </h3>
                           <p className="text-black/70 leading-relaxed">
                             {query
                               ? `We couldn't find any posts matching "${query}"`
                               : 'Search through our collection of posts and articles'
                             }
                           </p>
                         </div>
                       )}
              </div>
            )}

                               {!showResults && !query && (
                     <div className="p-4">
                       <div className="text-center py-8">
                         <Search className="w-12 h-12 text-black/40 mx-auto mb-4" />
                         <h3 className="text-lg font-semibold text-black mb-2">
                           Search IndianYug
                         </h3>
                         <p className="text-black/70 leading-relaxed">
                           Find posts, articles, and content across our platform
                         </p>
                       </div>
                     </div>
                   )}
          </div>

                           {/* Footer */}
                 <div className="border-t border-white/20 dark:border-white/10 p-3">
                   <div className="flex justify-between items-center text-xs font-medium text-black">
                     <div className="flex items-center space-x-4">
                       <kbd className="px-2 py-1 bg-black/10 rounded text-xs font-mono text-black">↑↓</kbd>
                       <span>Navigate</span>
                     </div>
                     <div className="flex items-center space-x-4">
                       <kbd className="px-2 py-1 bg-black/10 rounded text-xs font-mono text-black">Enter</kbd>
                       <span>Select</span>
                       <kbd className="px-2 py-1 bg-black/10 rounded text-xs font-mono text-black">Esc</kbd>
                       <span>Close</span>
                     </div>
                   </div>
                 </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
