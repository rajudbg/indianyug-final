import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `# *
User-agent: *
Allow: /

# Host
Host: https://indianyug.com

# Sitemaps
Sitemap: https://indianyug.com/sitemap.xml
Sitemap: https://indianyug.com/news.xml
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}