'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder to prevent layout shift, but no icon to prevent mismatch
    return (
      <div className="p-3 sm:p-2 rounded-lg min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px]" style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }} />
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-3 sm:p-2 rounded-lg relative overflow-hidden transition-all duration-300 min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px]"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-6 h-6 sm:w-5 sm:h-5 text-yellow-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-6 h-6 sm:w-5 sm:h-5 text-blue-300" />
      </motion.div>
      <div className="w-6 h-6 sm:w-5 sm:h-5 opacity-0">
        <Sun className="w-6 h-6 sm:w-5 sm:h-5" />
      </div>
    </motion.button>
  )
}
