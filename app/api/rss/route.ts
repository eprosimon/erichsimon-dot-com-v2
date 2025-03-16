import { getAllPosts } from "@/lib/mdx"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erichsimon.com"

  // Create RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Erich Simon's Blog</title>
    <link>${baseUrl}</link>
    <description>Building in public, sharing what I learn, and connecting the dots.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    </item>
    `,
      )
      .join("")}
  </channel>
</rss>`

  // Return the RSS feed as XML
  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

