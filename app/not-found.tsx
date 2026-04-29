'use client'
import React from 'react'
import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-8 md:p-12">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-gradient opacity-50 mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 glass-button text-primary-600 dark:text-primary-400 px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-8 border-t border-white/20 dark:border-white/10">
            <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 mb-4">
              <Search className="w-4 h-4" />
              <span className="text-sm">Try searching for what you need</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the search button in the navigation to find content across our site.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
