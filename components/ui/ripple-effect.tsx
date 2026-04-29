'use client'

import React, { useEffect } from 'react'

export function RippleEffect() {
  useEffect(() => {
    // Add click ripple effect to glass elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.glass, .glass-card, .glass-button')) return

      const element = target.closest('.glass, .glass-card, .glass-button') as HTMLElement
      const ripple = document.createElement('div')
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(250, 192, 1, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `
      
      element.style.position = 'relative'
      element.style.overflow = 'hidden'
      element.appendChild(ripple)
      
      // Safely remove the ripple element
      setTimeout(() => {
        try {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple)
          }
        } catch (error) {
          // Element might already be removed, ignore error
          console.warn('Could not remove ripple element:', error)
        }
      }, 600)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
