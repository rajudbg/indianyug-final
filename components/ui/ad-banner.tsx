'use client'

import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

interface AdBannerProps {
  className?: string
  position?: 'top' | 'bottom' | 'sidebar'
  label?: string
}

export function AdBanner({ 
  className = '', 
  position = 'top',
  label = 'Advertisement'
}: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      setAdLoaded(true)
    } catch (err) {
      console.error('AdSense Banner error:', err)
    }
  }, [])

  const positionStyles = {
    top: 'my-6',
    bottom: 'mt-8 mb-6',
    sidebar: 'mb-6'
  }

  const adSlots = {
    top: '5576831162',    // Your existing slot
    bottom: '5576831162', // You may want different slots for different positions
    sidebar: '5576831162'
  }

  return (
    <div className={`${positionStyles[position]} ${className}`}>
      {/* Professional ad label */}
      <div className="flex justify-center mb-3">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
          {label}
        </span>
      </div>
      
      {/* Banner ad container */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm">
        {!adLoaded && (
          <div className="flex items-center justify-center min-h-[100px]">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-purple-500 rounded-full animate-ping"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading advertisement...</span>
              </div>
            </div>
          </div>
        )}
        
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            minHeight: position === 'sidebar' ? '600px' : '100px'
          }}
          data-ad-client="ca-pub-9432969048505333"
          data-ad-slot={adSlots[position]}
          data-ad-format={position === 'sidebar' ? 'vertical' : 'horizontal'}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
