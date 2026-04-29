'use client'

import React, { useEffect, Suspense } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  useEffect(() => {
    const createdElements: HTMLLinkElement[] = []

    // Preload critical images
    const preloadImages = () => {
      const criticalImages = [
        // Add your critical images here
        '/og-image.jpg',
        // Add more critical images as needed
      ]

      criticalImages.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
        createdElements.push(link)
      })
    }

    // Preconnect to external domains optimized for Cloudflare Pages
    const preconnectToDomains = () => {
      const domains = [
        'https://cms.indianyug.com',
        'https://secure.gravatar.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://pagead2.googlesyndication.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ]

      domains.forEach((domain) => {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        document.head.appendChild(link)
        createdElements.push(link)
      })
    }

    // Initialize performance optimizations
    preloadImages()
    preconnectToDomains()

    // Cleanup function
    return () => {
      // Safely remove created elements
      createdElements.forEach((element) => {
        try {
          if (element.parentNode) {
            element.parentNode.removeChild(element)
          }
        } catch (error) {
          // Element might already be removed, ignore error
          console.warn('Could not remove performance optimization element:', error)
        }
      })
    }
  }, [])

  return <>{children}</>
}

// Lazy loading wrapper for components
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyComponent(props: T) {
    return (
      <Suspense fallback={fallback || <div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    )
  }
} 