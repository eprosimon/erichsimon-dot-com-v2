import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Calendar, Tag, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { CustomMDX } from "@/components/mdx-components"
import { GiscusComments } from "@/components/giscus-comments"
import { generatePostStructuredData } from "@/lib/structured-data"
import { Button } from "@/components/ui/button"

interface PostPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    }
  }

  return {
    title: `${post.title} | Erich Simon`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Erich Simon"],
      tags: post.tags,
    },
  }
}

export function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const url = `https://erichsimon.com/blog/${post.slug}`
  const structuredData = generatePostStructuredData(post, url)

  // Get related posts based on tags
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="container max-w-3xl py-6 md:py-16 px-4 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="animate-fade-in-up">
        <Link
          href="/blog"
          className="mb-4 md:mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to blog
        </Link>
      </div>

      <article className="animate-fade-in-up animation-delay-2">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          {post.tags?.length > 0 && (
            <div className="flex items-center">
              <Tag className="mr-1 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`/tags/${tag}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative mb-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="italic text-muted-foreground">{post.excerpt}</p>
        </div>

        <Separator className="my-6 md:my-8" />

        <div className="prose max-w-none dark:prose-invert">
          <CustomMDX content={post.content} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-12 animate-fade-in-up animation-delay-8">
          <h2 className="text-2xl font-bold mb-6">
            <span className="inline-block relative">
              Related Posts
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.slug} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <h3 className="font-medium mb-1">
                  <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                    {relatedPost.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{relatedPost.excerpt}</p>
                <div className="flex justify-between items-center">
                  <time dateTime={relatedPost.date} className="text-xs text-muted-foreground">
                    {formatDate(relatedPost.date)}
                  </time>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="text-xs font-medium text-primary hover:underline flex items-center gap-1 group"
                  >
                    Read more
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator className="my-12" />

      <div className="animate-fade-in-up animation-delay-10">
        <GiscusComments />
      </div>

      <div className="mt-12 text-center animate-fade-in-up animation-delay-12">
        <h3 className="text-lg font-medium mb-2">Enjoyed this post?</h3>
        <p className="text-muted-foreground mb-4">Check out more articles or share this one with others.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            variant="outline"
            className="transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
          >
            <Link href="/blog">More Articles</Link>
          </Button>
          <Button asChild className="transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share This Post
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

