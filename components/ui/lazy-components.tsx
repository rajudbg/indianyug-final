'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Loading component for better UX
const ComponentLoader = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full"></div>
  </div>
)

// Lazy load heavy components for better performance
export const LazyHeroSlider = dynamic(
  () => import('./hero-slider').then(mod => ({ default: mod.HeroSlider })),
  {
    ssr: true,
    loading: ComponentLoader
  }
)

export const LazyPostCard = dynamic(
  () => import('./post-card').then(mod => ({ default: mod.PostCard })),
  {
    ssr: true,
    loading: ComponentLoader
  }
)

export const LazyWordPressContentRenderer = dynamic(
  () => import('./wordpress-content-renderer'),
  {
    ssr: false, // Client-side only due to ad injection
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    )
  }
)

export const LazyAdInjector = dynamic(
  () => import('./ad-injector').then(mod => ({ default: mod.AdInjector })),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    )
  }
)

// Wrapper for suspense boundaries
export function LazyWrapper({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback || <ComponentLoader />}>
      {children}
    </Suspense>
  )
}
