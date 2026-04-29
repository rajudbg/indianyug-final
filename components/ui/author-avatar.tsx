'use client';

import React, { useState } from 'react';
import { OptimizedImage } from './optimized-image';

interface AuthorAvatarProps {
  author: {
    name: string
    avatar_urls?: {
      '24'?: string
      '48'?: string
      '96'?: string
    }
  }
  size?: number
  className?: string
}

export function AuthorAvatar({ author, size = 80, className = '' }: AuthorAvatarProps) {
  const [imageError, setImageError] = useState(false)
  
  const avatarUrl = author.avatar_urls?.['96'] || author.avatar_urls?.['48'] || author.avatar_urls?.['24']
  
  if (!avatarUrl || imageError) {
    return (
      <div 
        className={`bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl ${className}`}
        style={{ width: size, height: size }}
      >
        {author.name?.charAt(0)?.toUpperCase() || 'A'}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={avatarUrl}
      alt={author.name}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      unoptimized={true} // Gravatar images are already optimized
      onError={() => setImageError(true)}
    />
  )
}
