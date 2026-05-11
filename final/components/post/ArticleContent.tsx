'use client'
import { useEffect, useRef } from 'react'

interface ArticleContentProps {
  content: string
  adSlot?: string
  adsenseClient?: string
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.src = src
  s.async = true
  s.charset = 'utf-8'
  document.body.appendChild(s)
}

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: HTMLElement) => void } }
    FB?: { XFBML?: { parse: (el?: HTMLElement) => void } }
    instgrm?: { Embeds?: { process: () => void } }
  }
}

function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById('reading-progress')
    if (!bar) return
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      bar.style.width = `${Math.min(pct, 100)}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div id="reading-progress" aria-hidden="true" />
}

export function ArticleContent({ content, adSlot, adsenseClient }: ArticleContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  // ── Embed scripts (Twitter / FB / Instagram) ───────────────────────────
  useEffect(() => {
    const hasTwitter  = content.includes('twitter-tweet') || content.includes('twitter.com')
    const hasFacebook = content.includes('fb-post') || content.includes('facebook.com/plugins')
    const hasInstagram = content.includes('instagram.com/p/') || content.includes('instagram-media')

    if (hasTwitter)   window.twttr?.widgets ? window.twttr.widgets.load() : loadScript('https://platform.twitter.com/widgets.js', 'twitter-wjs')
    if (hasFacebook)  window.FB?.XFBML ? window.FB.XFBML.parse() : loadScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0', 'facebook-jssdk')
    if (hasInstagram) window.instgrm?.Embeds ? window.instgrm.Embeds.process() : loadScript('https://www.instagram.com/embed.js', 'instagram-wjs')
  }, [content])

  // ── In-article ad injection every 4 paragraphs (max 3 ads) ───────────
  useEffect(() => {
    const articleEl = ref.current
    if (!articleEl) return
    const client = adsenseClient
    const isDev = process.env.NODE_ENV === 'development'

    // In production require real credentials; in dev always show placement
    if (!isDev && (!adSlot || !client)) return

    // Remove any ads injected by a previous effect run (Strict Mode safety)
    articleEl.querySelectorAll('.iy-ad-unit').forEach(el => el.remove())

    // Collect all meaningful paragraphs across the whole article
    const paragraphs = Array.from(articleEl.querySelectorAll('p')).filter(p =>
      p.textContent!.trim().length > 30 &&
      !p.closest('blockquote') &&
      !p.closest('figcaption') &&
      !p.closest('figure')
    )

    const maxAds = 5
    const interval = 4
    let adsInserted = 0

    const makeWrapper = () => {
      const wrapper = document.createElement('div')
      wrapper.className = 'iy-ad-unit'
      const label = document.createElement('span')
      label.className = 'iy-ad-label'
      label.textContent = 'Advertisement'
      wrapper.appendChild(label)

      let ins: HTMLElement | null = null

      if (client && adSlot) {
        const adIns = document.createElement('ins')
        adIns.className = 'adsbygoogle'
        adIns.style.cssText = 'display:block;text-align:center;'
        adIns.setAttribute('data-ad-layout', 'in-article')
        adIns.setAttribute('data-ad-format', 'fluid')
        adIns.setAttribute('data-ad-client', client)
        adIns.setAttribute('data-ad-slot', adSlot)
        wrapper.appendChild(adIns)
        ins = adIns
      }
      return { wrapper, ins }
    }

    paragraphs.forEach((p, i) => {
      if (adsInserted >= maxAds) return
      if ((i + 1) % interval !== 0) return

      // Always insert at the top-level of the article, not inside a nested block
      let anchor: Element = p
      while (anchor.parentElement && anchor.parentElement !== articleEl) {
        anchor = anchor.parentElement
      }

      const { wrapper, ins } = makeWrapper()
      anchor.insertAdjacentElement('afterend', wrapper)

      if (ins) {
        const mo = new MutationObserver(() => {
          const status = ins.getAttribute('data-ad-status')
          if (status === 'unfilled') {
            wrapper.style.display = 'none'
            mo.disconnect()
          }
          if (status === 'filled') {
            mo.disconnect()
          }
        })
        mo.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] })

        window.setTimeout(() => {
          if (!ins.getAttribute('data-ad-status')) {
            wrapper.style.display = 'none'
            mo.disconnect()
          }
        }, 8000)

        try { ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({}) } catch {
          wrapper.style.display = 'none'
          mo.disconnect()
        }
      }

      adsInserted++
    })
  }, [content, adSlot, adsenseClient])

  // ── Slide-up reveal animation for images / figures / blockquotes ───────
  useEffect(() => {
    if (!ref.current) return
    const targets = Array.from(
      ref.current.querySelectorAll(
        'figure, blockquote, h2, h3, pre, ' +
        'div[class*="wp-block-image"], div[class*="wp-block-gallery"], ' +
        'img:not(figure img):not(div[class*="wp-block"] img)'
      )
    ) as HTMLElement[]

    targets.forEach(el => el.classList.add('article-reveal'))

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('article-reveal--in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    )

    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [content])

  // ── YouTube iframes: wrap in responsive container ─────────────────────
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"], iframe[src*="vimeo.com"]').forEach(iframe => {
      if (iframe.parentElement?.classList.contains('article-video-wrap')) return
      const wrap = document.createElement('div')
      wrap.className = 'article-video-wrap relative w-full aspect-video rounded-xl overflow-hidden my-6'
      iframe.parentNode!.insertBefore(wrap, iframe)
      wrap.appendChild(iframe)
      ;(iframe as HTMLIFrameElement).style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
    })
  }, [content])

  return (
    <>
      <ReadingProgress />
      <div
        ref={ref}
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}
