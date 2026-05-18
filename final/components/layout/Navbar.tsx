'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { WPCategory } from '@/types/wordpress'

interface NavbarProps {
  categories: WPCategory[]
}

const MENU_CATS = ['Featured', 'News', 'History', 'Viral', 'Science', 'Analysis']

export function Navbar({ categories }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const menuCategories = MENU_CATS
    .map(name => categories.find(c => c.name.toLowerCase() === name.toLowerCase()))
    .filter((c): c is WPCategory => c !== undefined)

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
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="IndianYug"
            width={200}
            height={50}
            className="h-10 w-auto block dark:hidden"
            priority
          />
          <Image
            src="/logo-dark.png"
            alt="IndianYug"
            width={200}
            height={50}
            className="h-10 w-auto hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop nav — categories only */}
        <div className="hidden md:flex items-center gap-1">
          {menuCategories.map(c => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              {c.name}
            </Link>
          ))}
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

      {/* Mobile menu — categories only */}
      {open && (
        <div className="md:hidden glass-nav border-t border-gray-200/40 dark:border-gray-700/40 py-3 px-4 space-y-1">
          {menuCategories.map(c => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
