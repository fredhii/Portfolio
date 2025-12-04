import { getPosts } from '@/lib/posts'

export async function GET() {
  const posts = await getPosts()
  const siteUrl = 'https://fredhii.com'

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fredy Acuna</title>
    <link>${siteUrl}</link>
    <description>Personal portfolio and blog of Fredy Acuna - Software Engineer sharing insights on web development, technology, and projects.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        post => `
    <item>
      <title><![CDATA[${post.title || 'Untitled'}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.summary || ''}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
