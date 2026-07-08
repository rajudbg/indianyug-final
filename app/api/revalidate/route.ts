import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// WordPress calls this endpoint via webhook when a post is published/updated.
// Configure in WordPress with the WP Webhooks plugin or custom functions.php:
//
//   POST https://indianyug.com/api/revalidate?secret=YOUR_SECRET
//   Body: { "slug": "post-slug-here", "type": "post" }
//
// Set REVALIDATION_SECRET in your Cloudflare Pages environment variables.

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const slug: string | undefined = body?.slug
    const type: string = body?.type ?? 'post'

    if (type === 'post' && slug) {
      revalidatePath(`/${slug}`)
    }

    if (type === 'category' && slug) {
      revalidatePath(`/category/${slug}`)
    }

    // Always refresh homepage and sitemap
    revalidatePath('/', 'page')
    revalidatePath('/sitemap.xml')

    return NextResponse.json({
      revalidated: true,
      slug: slug ?? null,
      type,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}

// GET — health check to confirm the endpoint is live
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
}
