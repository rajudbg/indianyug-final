'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SearchModal } from '@/components/ui/search-modal'
import { WordPressCategory } from '@/types/wordpress'

interface NavItem {
  name: string;
  href: string;
}

interface NavbarClientProps {
  navigation: NavItem[];
}

export function NavbarClient({ navigation }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-5 left-5 right-5 z-50 transition-all duration-300 rounded-2xl ${
          scrolled 
            ? 'glass-nav' 
            : 'glass-nav'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(250, 192, 1, 0.95) 0%, rgba(250, 192, 1, 0.85) 50%, rgba(250, 192, 1, 0.9) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '2px solid rgba(250, 192, 1, 0.3)',
          boxShadow: '0 8px 32px rgba(250, 192, 1, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(250, 192, 1, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="IndianYug Logo"
                  width={320}
                  height={80}
                  className="h-20 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <nav>
                <ul 
                  className="flex gap-2 list-none rounded-xl p-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {navigation.map((item, index) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`nav-item relative overflow-hidden block px-5 py-3 rounded-lg font-semibold transition-all duration-300`}
                        style={{
                          color: 'rgba(0, 0, 0, 0.8)',
                          position: 'relative',
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.4)'
                }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
              </motion.button>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.4)'
                }}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-4 relative">
                  <span 
                    className={`block w-full h-0.5 rounded-sm mb-1 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  ></span>
                  <span 
                    className={`block w-full h-0.5 rounded-sm mb-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  ></span>
                  <span 
                    className={`block w-full h-0.5 rounded-sm transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  ></span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 mt-3 mx-5 rounded-2xl"
              style={{
                background: 'rgba(250, 192, 1, 0.95)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 12px 32px rgba(250, 192, 1, 0.4)'
              }}
            >
              <div className="p-4 space-y-2">
                {/* Navigation Links */}
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="nav-item block px-4 py-3 text-base font-semibold rounded-lg w-full text-left"
                      style={{
                        color: 'rgba(0, 0, 0, 0.8)'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Divider */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: navigation.length * 0.1 }}
                  className="border-t border-white/20 my-4"
                />
                
                {/* Search Button */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: (navigation.length + 1) * 0.1 }}
                >
                  <button
                    onClick={() => {
                      setIsSearchOpen(true)
                      setIsOpen(false)
                    }}
                    className="nav-item flex items-center space-x-3 px-4 py-3 text-base font-semibold rounded-lg w-full text-left"
                    style={{
                      color: 'rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </motion.div>
                
                {/* Theme Toggle */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: (navigation.length + 2) * 0.1 }}
                  className="px-4 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
