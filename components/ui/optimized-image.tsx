'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  // New prop to bypass optimization for already optimized images
  unoptimized?: boolean;
  // Allow onError handler
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
  unoptimized = false,
  onError,
}: OptimizedImageProps) {
  // If unoptimized is true, use a regular img tag instead of next/image
  if (unoptimized) {
    if (fill) {
      return (
        <div className={`relative ${className}`}>
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
            loading={priority ? 'eager' : 'lazy'}
            onError={onError}
          />
        </div>
      );
    }
    
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        onError={onError}
      />
    );
  }

  // Use Next.js Image component for optimization
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={onError}
    />
  );
}
