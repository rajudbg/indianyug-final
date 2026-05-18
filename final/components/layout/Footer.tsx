import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'
import type { WPCategory } from '@/types/wordpress'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

interface FooterProps {
  categories: WPCategory[]
}

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/IndianYug/',
    label: 'Facebook',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/RealIndianYug',
    label: 'X (Twitter)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/realindianyug/',
    label: 'Instagram',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/67477593/',
    label: 'LinkedIn',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/channel/UCBl4Bn29Jn84ZheAzj2phJg',
    label: 'YouTube',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

const BRANDS = [
  { href: 'https://bolderbrain.com', label: 'Bolderbrain' },
  { href: 'https://shapeambition.com', label: 'Shapeambition' },
  { href: 'https://www.conceptial-india.com', label: 'Conceptial' },
]

export function Footer({ categories }: FooterProps) {
  const topCats = [...categories]
    .filter(c => c.slug !== 'featured')
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200/60 dark:border-gray-800/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <Image src="/logo.png" alt="IndianYug" width={180} height={50} className="h-10 w-auto block dark:hidden" />
            <Image src="/logo-dark.png" alt="IndianYug" width={180} height={50} className="h-10 w-auto hidden dark:block" />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              Bridging Worlds, Sharing Stories. Explore a world of diverse perspectives
              and global insights at IndianYug.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
              <a href="mailto:contact@indianyug.com" className="flex items-center gap-2 hover:text-saffron-600 transition-colors">
                <Mail size={14} /> contact@indianyug.com
              </a>
              <a href="tel:+917503275549" className="flex items-center gap-2 hover:text-saffron-600 transition-colors">
                <Phone size={14} /> +91 75032 75549
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Delhi, India
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
            <ul className="space-y-2">
              {topCats.map(c => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {COMPANY_LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Our Brands</h3>
            <ul className="space-y-2">
              {BRANDS.map(b => (
                <li key={b.href}>
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                  >
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the latest posts delivered right to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
            © {year} IndianYug. All rights reserved. Made with{' '}
            <Heart size={13} className="text-red-500 fill-red-500" /> in India.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full flex items-center justify-center
                           bg-gray-100 dark:bg-gray-800
                           text-gray-600 dark:text-gray-400
                           hover:bg-saffron-100 dark:hover:bg-saffron-900/30
                           hover:text-saffron-600 dark:hover:text-saffron-400
                           transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
