import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Post } from "@/lib/types"

interface FeaturedPostCardProps {
  post: Post
  className?: string
}

export function FeaturedPostCard({ post, className = "" }: FeaturedPostCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${className}`}
    >
      <div className="aspect-video w-full bg-muted relative">
        <Image
          src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 p-6 text-white">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <time dateTime={post.date} className="text-sm text-white/70">
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 text-2xl font-bold line-clamp-2 group-hover:text-primary-foreground transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-white/90">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-primary-foreground group-hover:underline"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

