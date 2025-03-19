import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { getAllReviews } from "@/lib/content"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ReviewsFilterControls } from "@/components/ReviewsFilterControls"

export const metadata: Metadata = {
  title: "Reviews & Recommendations | Erich Simon",
  description: "In-depth reviews and recommendations of products and services I've personally tested",
  openGraph: {
    title: "Reviews & Recommendations | Erich Simon",
    description: "In-depth reviews and recommendations of products and services I've personally tested",
    type: "website",
    url: "https://erichsimon.com/reviews",
  },
}

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
    status?: string;
    tag?: string;
  }>
}) {
  // Properly await searchParams before accessing properties
  const params = await Promise.resolve(searchParams || {}) as {
    query?: string;
    category?: string;
    status?: string;
    tag?: string;
  };
  const categoryFilter = params.category || "";
  const statusFilter = params.status || "";
  const tagFilter = params.tag || "";
  // Parse comma-separated tags
  const selectedTags = tagFilter ? tagFilter.split(',') : [];

  const reviews = getAllReviews()

  // Get all unique tags from reviews
  const allTags: string[] = []
  reviews.forEach(review => {
    if (review.tags && Array.isArray(review.tags)) {
      allTags.push(...review.tags)
    }
  })
  const uniqueTags = [...new Set(allTags)].sort()

  // Filter reviews based on params
  const filteredReviews = reviews.filter(review => {
    // Apply category filter
    if (categoryFilter && review.category !== categoryFilter) {
      return false;
    }

    // Apply review status filter
    if (statusFilter) {
      if (statusFilter === "current" && !(review.status === "current" || review.isCurrentlyUsed)) {
        return false;
      }
      if (statusFilter === "previous" && review.status !== "previous") {
        return false;
      }
      if (statusFilter === "heard" && review.status !== "heard") {
        return false;
      }
      if (statusFilter === "recommended" && !review.isRecommended) {
        return false;
      }
    }

    // Apply content tag filter - match any of the selected tags
    if (selectedTags.length > 0 && (!review.tags || !selectedTags.some(tag => review.tags.includes(tag)))) {
      return false;
    }

    return true;
  });

  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="inline-block relative">
            Reviews & Recommendations
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          In-depth reviews and recommendations of products and services I've personally tested
        </p>
      </div>

      <div className="mt-8">
        <ReviewsFilterControls
          availableTags={uniqueTags}
        />
      </div>

      <Separator className="my-8" />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((review, index) => (
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

              {/* Status badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {review.isRecommended && (
                  <Badge className="bg-green-500/90 hover:bg-green-500 text-white py-1">
                    Recommended
                  </Badge>
                )}
                {(review.isCurrentlyUsed || review.status === "current") && (
                  <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white py-1">
                    Currently Using
                  </Badge>
                )}
              </div>
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
                {review.tags && review.tags.slice(0, 2).map((tag) => (
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

      {filteredReviews.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-xl font-medium mb-2">No reviews found</div>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          <Button asChild className="mt-6">
            <Link href="/reviews">Reset filters</Link>
          </Button>
        </div>
      )}

      <Separator className="my-12" />

      <div className="rounded-lg border bg-card p-6 bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 animate-fade-in-up animation-delay-12">
        <h2 className="text-xl font-semibold">Review & Recommendation Policy</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          I only review products and services that I've personally used. All opinions are my own and based on real-world
          experience. Some links may be affiliate links, which help support this site at no additional cost to you.
        </p>
      </div>
    </div>
  )
}

