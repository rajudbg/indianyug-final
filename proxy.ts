import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Redirect /posts/[slug] to /[slug] with 301
  if (url.pathname.startsWith('/posts/') && !url.pathname.includes('/api/')) {
    const slug = url.pathname.replace('/posts/', '')
    url.pathname = `/${slug}`
    return NextResponse.redirect(url, { status: 301 })
  }
  
  const response = NextResponse.next()
  
  // Add headers to help with Twitter card caching
  if (request.headers.get('user-agent')?.includes('Twitterbot')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  return response
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
