// lib/mdx.ts - Complete rewrite to remove any lingering references
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "./types"

// Define paths
const contentDir = path.join(process.cwd(), "content")
const postsDirectory = path.join(contentDir, "posts")

// Create directories if they don't exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true })
  if (process.env.NODE_ENV !== 'production') {
    console.log("Created content directory")
  }
}

if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
  if (process.env.NODE_ENV !== 'production') {
    console.log("Created posts directory")
  }
}

// Create a sample post if no posts exist
function createSamplePost() {
  const samplePostPath = path.join(postsDirectory, "hello-world.md")

  if (!fs.existsSync(samplePostPath)) {
    const sampleContent = `---
title: Hello World
date: '${new Date().toISOString().split("T")[0]}'
excerpt: Welcome to my new blog built with Next.js and Markdown.
tags: ['next.js', 'markdown', 'react']
---

# Hello World!

Welcome to my new blog built with Next.js and Markdown. This is a sample post to demonstrate how Markdown works in this blog.

## What is Markdown?

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. It's designed to be easy to write and easy to read.

## Code Example

\`\`\`jsx
function HelloWorld() {
  return <h1>Hello, world!</h1>
}
\`\`\`

## Lists

Here's a list of features in this blog:

- Next.js App Router
- Markdown for content
- Tailwind CSS for styling
- Dark mode support
- Responsive design

## Task List

- [ ] Write more blog posts
- [x] Set up the blog
- [ ] Add more features

## Images

You can also include images in your Markdown files:

![Next.js Logo](/placeholder.svg?height=200&width=400)

## Conclusion

This is just a sample post to get you started. You can create more posts by adding Markdown files to the \`content/posts\` directory.
`

    fs.writeFileSync(samplePostPath, sampleContent)
    if (process.env.NODE_ENV !== 'production') {
      console.log("Created sample post")
    }
  }
}

// Get all posts
export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const files = fs.readdirSync(postsDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))

    if (mdxFiles.length === 0) {
      createSamplePost()
      const updatedFiles = fs.readdirSync(postsDirectory)
      const newMdxFiles = updatedFiles.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      mdxFiles.push(...newMdxFiles)
    }

    // Create a map to track used slugs and ensure uniqueness
    const slugMap = new Map<string, number>()

    const posts = mdxFiles
      .map((file) => {
        const slug = file.replace(/\.(mdx|md)$/, "")
        const post = getPostBySlug(slug)

        // If this is a duplicate slug, we need to make it unique
        if (post && slugMap.has(slug)) {
          const count = slugMap.get(slug)! + 1
          slugMap.set(slug, count)
          post.slug = `${slug}-${count}`
        } else if (post) {
          slugMap.set(slug, 1)
        }

        return post
      })
      .filter((post): post is Post => post !== null)

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting all posts:", error)
    return []
  }
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const mdPath = path.join(postsDirectory, `${slug}.md`)

    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const { content, data } = matter(fileContent)

    return {
      slug,
      content,
      title: data.title || "",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: data.tags || [],
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

