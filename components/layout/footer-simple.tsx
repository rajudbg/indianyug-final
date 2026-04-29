import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { SubscribeForm } from './subscribe-form'

const footerLinks = {
  categories: [
    { name: 'Technology', href: '/category/technology' },
    { name: 'Lifestyle', href: '/category/lifestyle' },
    { name: 'Business', href: '/category/business' },
    { name: 'Culture', href: '/category/culture' },
    { name: 'Health', href: '/category/health' },
    { name: 'Education', href: '/category/education' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
  ourBrands: [
    { name: 'Bolderbrain', href: 'https://bolderbrain.com' },
    { name: 'Shapeambition', href: 'https://shapeambition.com' },
    { name: 'Conceptial', href: 'https://conceptial-india.com' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/indianyug' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/indianyug' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/indianyug' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/indianyug' },
]

export function Footer() {
  return (
    <footer className="glass-card mt-20 border-t border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="IndianYug Logo"
                width={240}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
              Bridging Worlds, Sharing Stories. Explore a world of diverse perspectives and global insights at Indianyug.com.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@indianyug.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 75032 75549</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-800 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-800 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Brands & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Our Brands</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.ourBrands.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-800 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <SubscribeForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 dark:border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} IndianYug. All rights reserved. Made with ❤️ in India.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-800 dark:hover:text-primary-400 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
