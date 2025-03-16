import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { getAllPosts } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Blog | Erich Simon",
  description: "All blog posts",
}

export default function BlogPage() {
  const posts = getAllPosts() || []

  // Function to process content outside of JSX to avoid arrow function syntax issues
  const processContent = (content: string) => {
    return content
      .replace(/^#.*$/gm, "")
      .replace(/!\[.*\]$$.*$$/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, "$1")
      .split("\n")
      .filter((line) => line.trim() !== "")
      .slice(0, 3)
      .join(" ")
      .substring(0, 300)
  }

  return (
    <div className="container py-6 md:py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        <span className="inline-block relative">
          Blog
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
        </span>
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Thoughts, tutorials, and insights on web development and technology
      </p>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="aspect-video md:h-full">
                    <Image
                      src="/placeholder.svg"
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl md:text-2xl group">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <time dateTime={post.date} className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3">
                      <p className="font-medium text-muted-foreground">{post.excerpt}</p>
                      <div className="prose prose-sm dark:prose-invert line-clamp-3 text-muted-foreground/80">
                        {processContent(post.content)}
                        {post.content.length > 300 ? "..." : ""}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
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
                    <div className="ml-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
          <Button className="mt-4" variant="outline">
            Check back soon
          </Button>
        </div>
      )}
    </div>
  )
}

