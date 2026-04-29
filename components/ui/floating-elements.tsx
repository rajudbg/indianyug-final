'use client'

import React, { useEffect } from 'react'

export function FloatingElements() {
  useEffect(() => {
    // Add parallax effect to floating elements
    const handleMouseMove = (e: MouseEvent) => {
      const circles = document.querySelectorAll('.floating-circle')
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      
      circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5
        const element = circle as HTMLElement
        element.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="floating-elements">
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
    </div>
  )
}
