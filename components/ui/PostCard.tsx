import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedImage, getPostCategories, formatDate, decodeHtml } from '@/lib/utils'
import type { WPPost } from '@/types/wordpress'
import { AnimatedHeroImage, AnimatedHeroText } from '@/components/newsroom/Animations'

interface PostCardProps {
  post: WPPost
  variant?: 'hero' | 'hero-wide' | 'featured' | 'default' | 'compact' | 'alternate' | 'minimal' | 'masonry' | 'newsroom' | 'newsroom-card' | 'related'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const image = getFeaturedImage(post)
  const categories = getPostCategories(post)
  const primaryCat = categories[0]
  const title = decodeHtml(post.title.rendered)

  // Apple Newsroom hero - same width as other cards
  if (variant === 'hero') {
    return (
      <Link href={`/${post.slug}`} className="group block w-full">
        <article className="flex flex-col items-center w-full">
          <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Card: rounded on all screens */}
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#000000]">
              {/* Image area */}
              <AnimatedHeroImage>
                <div className="relative w-full aspect-[16/9] bg-[#e8e8ed] dark:bg-[#121212] overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#d2d2d7] dark:bg-[#333336] shimmer" />
                  )}
                </div>
              </AnimatedHeroImage>
              {/* Title area */}
              <AnimatedHeroText>
                <div className="w-full px-4 sm:px-8 py-8 md:py-10 bg-white dark:bg-[#000000]">
                  {primaryCat && (
                    <span className="text-[11px] md:text-[12px] font-semibold text-[#86868b] uppercase tracking-wider mb-3 block">
                      {primaryCat.name}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] tracking-tight group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
                    {title}
                  </h2>
                  <time className="mt-3 text-[13px] text-[#86868b] font-medium block">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </AnimatedHeroText>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Apple Newsroom "Latest News" large horizontal card - image left, text right
  if (variant === 'hero-wide') {
    return (
      <Link href={`/${post.slug}`} className="group block w-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-[0_2px_12px_rgba(0,0,0,0.10)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300">
        <article className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:w-[55%] aspect-[16/9] md:aspect-auto md:min-h-[320px] bg-[#f5f5f7] dark:bg-[#1d1d1f] overflow-hidden shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-[#333336] shimmer" />
            )}
          </div>
          <div className="flex flex-col justify-center w-full md:w-[45%] p-8 md:p-10 lg:p-12">
            {primaryCat && (
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-3 block">
                {primaryCat.name}
              </span>
            )}
            <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.15] tracking-tight group-hover:text-[#6e6e73] transition-colors">
              {title}
            </h3>
            <time className="mt-4 text-[13px] text-[#86868b] font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          </div>
        </article>
      </Link>
    )
  }

  // Standard Apple-style tile card with rounded corners
  if (variant === 'featured') {
    return (
      <Link href={`/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
        <article className="flex flex-col h-full">
          <div className="relative aspect-[16/9] md:aspect-[3/2] bg-gray-100 dark:bg-[#1d1d1f] overflow-hidden shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer" />
            )}
          </div>
          <div className="flex flex-col flex-1 p-6 md:p-8">
            {primaryCat && (
              <span className="text-[11px] md:text-[12px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 block">
                {primaryCat.name}
              </span>
            )}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-2xl md:text-3xl leading-[1.15] tracking-tight flex-1 group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  // Apple-style alternate side-by-side tile with rounded corners
  if (variant === 'alternate') {
    return (
      <Link href={`/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
        <article className="flex flex-col md:flex-row items-stretch h-full">
          <div className="relative w-full md:w-1/2 aspect-[16/9] md:aspect-auto bg-gray-100 dark:bg-[#1d1d1f] overflow-hidden shrink-0 h-full min-h-[300px]">
            {image ? (
              <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer" />
            )}
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-12 lg:p-16">
            {primaryCat && (
              <span className="text-[11px] md:text-[12px] font-semibold text-[#86868b] uppercase tracking-wide mb-3 block">
                {primaryCat.name}
              </span>
            )}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-3xl md:text-4xl leading-[1.15] tracking-tight group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  // Minimal standard tile with rounded corners
  if (variant === 'minimal') {
    return (
      <Link href={`/${post.slug}`} className="group block h-full">
        <article className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative aspect-[3/2] w-full bg-gray-100 dark:bg-[#1d1d1f] shrink-0">
             {image && <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />}
          </div>
          <div className="flex flex-col flex-1 p-5">
            {primaryCat && <span className="text-[10px] md:text-[11px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 block">{primaryCat.name}</span>}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-lg md:text-xl leading-[1.25] tracking-tight group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  // Masonry tile with rounded corners
  if (variant === 'masonry') {
    return (
      <Link href={`/${post.slug}`} className="group block h-full mb-6">
        <article className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
          {image && (
            <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-[#1d1d1f] shrink-0">
              <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
          )}
          <div className="flex flex-col flex-1 p-6 md:p-8">
            {primaryCat && <span className="text-[10px] md:text-[11px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 block">{primaryCat.name}</span>}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-xl md:text-2xl leading-[1.2] tracking-tight flex-1 group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  // Compact card with rounded corners
  if (variant === 'compact') {
    return (
      <Link href={`/${post.slug}`} className="group flex gap-4 md:gap-6 items-center p-4 rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
        {image && (
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-[#1d1d1f]">
            <Image src={image} alt={title} fill className="object-cover" sizes="128px" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {primaryCat && <span className="text-[10px] md:text-[11px] font-semibold text-[#86868b] uppercase tracking-wide mb-1.5 block">{primaryCat.name}</span>}
          <h4 className="text-[16px] md:text-[18px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] line-clamp-3 leading-[1.2] group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] tracking-tight transition-colors">
            {title}
          </h4>
        </div>
      </Link>
    )
  }

  // Apple Newsroom style card with rounded corners
  if (variant === 'newsroom') {
    return (
      <Link
        href={`/${post.slug}`}
        className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-[#000000] transition-all duration-300 apple-card-hover"
      >
        <article className="flex flex-col h-full">
          <div className="relative aspect-[1.6/1] bg-[#f5f5f7] dark:bg-[#1d1d1f] overflow-hidden shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer" />
            )}
          </div>
          <div className="flex flex-col flex-1 px-4 py-5">
            {primaryCat && (
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-3 block">
                {primaryCat.name}
              </span>
            )}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-[19px] md:text-[21px] leading-[1.2] tracking-tight line-clamp-3 group-hover:text-[#6e6e73] transition-colors">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  // Apple Newsroom "More from" related list row — image left, text right, no card bg
  if (variant === 'related') {
    return (
      <Link href={`/${post.slug}`} className="group flex items-start gap-5 py-6 border-b border-[#d2d2d7] dark:border-[#424245] last:border-0">
        {/* Thumbnail */}
        <div className="relative shrink-0 w-[130px] h-[86px] rounded-lg overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="130px"
            />
          ) : (
            <div className="absolute inset-0 bg-[#d2d2d7] dark:bg-[#333336]" />
          )}
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          {primaryCat && (
            <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-widest mb-1.5 block">
              {primaryCat.name}
            </span>
          )}
          <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-[17px] leading-[1.25] tracking-tight line-clamp-2 group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
            {title}
          </h3>
          <time className="mt-1.5 text-[13px] text-[#86868b] block">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
      </Link>
    )
  }

  // Apple Newsroom category card with rounded corners
  if (variant === 'newsroom-card') {
    return (
      <Link
        href={`/${post.slug}`}
        className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-[#000000] transition-all duration-300 apple-card-hover"
      >
        <article className="flex flex-col h-full">
          <div className="relative aspect-[1.6/1] bg-[#f5f5f7] dark:bg-[#1d1d1f] overflow-hidden shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer" />
            )}
          </div>
          <div className="flex flex-col flex-1 px-4 py-6">
            {primaryCat && (
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-3 block">
                {primaryCat.name}
              </span>
            )}
            <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-[19px] md:text-[21px] leading-[1.2] tracking-tight line-clamp-3 group-hover:text-[#6e6e73] transition-colors">
              {title}
            </h3>
            <time className="mt-4 text-[13px] text-[#86868b] font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </article>
      </Link>
    )
  }

  // Default Apple Tile with rounded corners
  return (
    <Link href={`/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-sm hover:shadow-md transition-shadow duration-300">
      <article className="flex flex-col h-full">
        <div className="relative aspect-[3/2] bg-gray-100 dark:bg-[#1d1d1f] overflow-hidden shrink-0">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-4xl opacity-10 text-gray-500">◈</span>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {primaryCat && <span className="text-[10px] md:text-[11px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 block">{primaryCat.name}</span>}
          <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-lg md:text-xl leading-[1.2] tracking-tight flex-1 line-clamp-3 group-hover:text-[#6e6e73] dark:group-hover:text-[#a1a1a6] transition-colors">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
