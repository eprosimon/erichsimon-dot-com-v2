import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Star, Filter } from "lucide-react"
import { getAllReviews, getAllReviewCategories } from "@/lib/content"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Reviews | Erich Simon",
  description: "In-depth reviews of products and services I've personally tested",
  openGraph: {
    title: "Reviews | Erich Simon",
    description: "In-depth reviews of products and services I've personally tested",
    type: "website",
    url: "https://erichsimon.com/reviews",
  },
}

export default function ReviewsPage() {
  const reviews = getAllReviews()
  const categories = getAllReviewCategories()

  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="inline-block relative">
            Reviews
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          In-depth reviews of products and services I've personally tested
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 animate-fade-in-up animation-delay-2">
        <Button variant="outline" className="bg-primary/5 border-primary/20">
          <Filter className="mr-2 h-4 w-4" />
          All Reviews
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="hover:bg-primary/5"
            asChild
          >
            <Link href={`/reviews?category=${category}`}>
              {category}
            </Link>
          </Button>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 animate-fade-in-up"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="aspect-video relative">
              <Image
                src={review.coverImage || "/placeholder.svg"}
                alt={review.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(review.rating)
                      ? "fill-primary text-primary"
                      : i < review.rating
                        ? "fill-primary/50 text-primary"
                        : "fill-muted text-muted"
                      }`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium">{review.rating.toFixed(1)}</span>
              </div>
              <CardTitle className="line-clamp-2 group">
                <Link href={`/reviews/${review.slug}`} className="hover:text-primary transition-colors">
                  {review.title}
                </Link>
              </CardTitle>
              <CardDescription>{review.productName}</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <p className="line-clamp-3 text-sm">{review.excerpt}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
              <time dateTime={review.publishedAt} className="text-xs text-muted-foreground">
                {new Date(review.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="ml-auto flex flex-wrap gap-2">
                {review.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center animate-fade-in-up animation-delay-10">
        <p className="text-muted-foreground mb-4">Looking for a specific product or category?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="text-sm hover:bg-primary/5 transition-colors">
              <Link href={`/reviews?category=${category}`}>{category}</Link>
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      <div className="rounded-lg border bg-card p-6 bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 animate-fade-in-up animation-delay-12">
        <h2 className="text-xl font-semibold">Review Policy</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          I only review products and services that I've personally used. All opinions are my own and based on real-world
          experience. Some links may be affiliate links, which help support this site at no additional cost to you.
        </p>
      </div>
    </div>
  )
}

