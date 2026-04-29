'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { WPCategory } from '@/types/wordpress'

interface NavbarProps {
  categories: WPCategory[]
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar({ categories }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const topCats = [...categories]
    .filter(c => c.slug !== 'featured')
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gradient shrink-0"
          onClick={() => setOpen(false)}
        >
          IndianYug
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              {l.label}
            </Link>
          ))}

          {/* Categories dropdown */}
          <div className="relative" onMouseLeave={() => setCatOpen(false)}>
            <button
              onMouseEnter={() => setCatOpen(true)}
              onClick={() => setCatOpen(v => !v)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
                         text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              Categories <ChevronDown size={14} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 glass rounded-2xl py-2 shadow-xl">
                {topCats.map(c => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    onClick={() => setCatOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300
                               hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                  >
                    {c.name}
                    <span className="ml-1 text-xs text-gray-400">({c.count})</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center
                       text-gray-600 dark:text-gray-400
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-nav border-t border-gray-200/40 dark:border-gray-700/40 py-3 px-4 space-y-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-1 pb-1">
            <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Categories
            </p>
            {topCats.map(c => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400
                           hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
