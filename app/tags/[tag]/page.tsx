import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getAllPosts } from "@/lib/mdx"
import type { Post } from "@/lib/types"
import { PostCard } from "@/components/post-card"

interface TagPageProps {
  params: {
    tag: string
  }
}

export function generateMetadata({ params }: TagPageProps): Metadata {
  return {
    title: `${params.tag} | Erich Simon`,
    description: `Posts tagged with ${params.tag}`,
  }
}

export function generateStaticParams() {
  let posts = [];
  const tags = new Set<string>();

  try {
    posts = getAllPosts() || [];
  } catch (error) {
    console.error("Error fetching posts for static generation:", error);
    return [];
  }

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.add(tag)
    })
  })

  return Array.from(tags).map((tag) => ({
    tag,
  }))
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  let posts: Post[] = [];

  try {
    posts = getAllPosts() || [];
  } catch (error) {
    console.error(`Error fetching posts for tag "${tag}":`, error);
    // Could also add UI feedback about the error
  }
  const filteredPosts = posts.filter((post) => post.tags?.includes(tag));

  return (
    <div className="container py-10 md:py-16">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all posts
      </Link>
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Posts tagged with "{tag}"</h1>
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No posts found with this tag.</p>
      )}
    </div>
  )
}

