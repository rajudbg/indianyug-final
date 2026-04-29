'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react'

// A simple Threads icon component as it's not in lucide-react
const ThreadsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3c-1.5 0-2.8.7-3.6 1.8S3 7.2 3 8.5c0 1.3.6 2.5 1.4 3.2.8.7 1.9 1.3 3.6 1.3 1.7 0 2.8-.5 3.6-1.3.8-.7 1.4-1.9 1.4-3.2 0-1.3-.6-2.7-1.4-3.7S9.5 3 8 3z"/>
    <path d="M3.5 8.5c0-1.9 1.3-3.5 3-3.5s3 1.6 3 3.5c0 .9-.3 1.7-.9 2.3"/>
  </svg>
);

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'X',
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'Threads',
      icon: <ThreadsIcon />,
      href: `https://www.threads.net/share?url=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share:</span>
      </div>
      <div className="flex items-center space-x-2">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button p-2"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </motion.a>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="glass-button p-2 relative"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  )
}
