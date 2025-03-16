import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/types"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 group">
      <CardHeader className="pb-4">
        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
        <time dateTime={post.date} className="text-sm text-muted-foreground">
          {formatDate(post.date)}
        </time>
        <div className="ml-auto flex flex-wrap gap-2">
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
      </CardFooter>
    </Card>
  )
}

