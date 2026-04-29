'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Hero section animation - triggers when in view (consistent with other cards)
export function AnimatedHero({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Hero image — slides up first
export function AnimatedHeroImage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Hero text — fades in after image
export function AnimatedHeroText({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Grid with staggered children animation
export function AnimatedGrid({ 
  children, 
  containerClassName 
}: { 
  children: ReactNode
  containerClassName?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 }
        }
      }}
      className={containerClassName}
    >
      {children}
    </motion.div>
  )
}

// Grid item component - use this directly
export function AnimatedGridItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Section with scroll-triggered animation
export function AnimatedSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 }
        }
      }}
    >
      {children}
    </motion.section>
  )
}
