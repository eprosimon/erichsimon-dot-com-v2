import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ExternalLink, Star } from "lucide-react"
import { getAllReviews, getReviewBySlug } from "@/lib/data/reviews"
import { getRecommendationById } from "@/lib/data/recommendations"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomMDX } from "@/components/mdx-components"
import { GiscusComments } from "@/components/giscus-comments"
import { generateReviewStructuredData } from "@/lib/structured-data"

interface ReviewPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = getReviewBySlug(params.slug)

  if (!review) {
    return {
      title: "Review Not Found",
      description: "The requested review could not be found.",
    }
  }

  return {
    title: `${review.title} | Erich Simon`,
    description: review.excerpt,
    openGraph: {
      title: review.title,
      description: review.excerpt,
      type: "article",
      url: `https://erichsimon.com/reviews/${review.slug}`,
      images: [
        {
          url: review.coverImage,
          width: 1200,
          height: 630,
          alt: review.title,
        },
      ],
    },
  }
}

export function generateStaticParams() {
  const reviews = getAllReviews()

  return reviews.map((review) => ({
    slug: review.slug,
  }))
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const review = getReviewBySlug(params.slug)

  if (!review) {
    notFound()
  }

  const linkUrl = review.affiliateUrl || review.productUrl
  const url = `https://erichsimon.com/reviews/${review.slug}`
  const structuredData = generateReviewStructuredData(review, url)

  return (
    <div className="container max-w-4xl py-6 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Link
        href="/reviews"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all reviews
      </Link>

      <article>
        <div className="aspect-video relative w-full overflow-hidden rounded-lg mb-8">
          <Image
            src={review.coverImage || "/placeholder.svg"}
            alt={review.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(review.rating)
                    ? "fill-primary text-primary"
                    : i < review.rating
                      ? "fill-primary/50 text-primary"
                      : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-medium">{review.rating.toFixed(1)}/5.0</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">{review.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <time dateTime={review.publishedAt}>
            Published:{" "}
            {new Date(review.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {review.updatedAt !== review.publishedAt && (
            <time dateTime={review.updatedAt}>
              Updated:{" "}
              {new Date(review.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Link href={`/reviews?tag=${tag}`}>{tag}</Link>
            </Badge>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold mb-2">Pros</h2>
              <ul className="space-y-2">
                {review.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Cons</h2>
              <ul className="space-y-2">
                {review.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-lg font-semibold mb-2">Verdict</h2>
            <p className="italic">{review.verdict}</p>
          </div>

          {linkUrl && (
            <div className="mt-6">
              <Button asChild>
                <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
                  Check Price <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <CustomMDX content={review.content} />
        </div>

        {review.relatedRecommendations && review.relatedRecommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Recommendations</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {review.relatedRecommendations.map((recId) => {
                const recommendation = getRecommendationById(recId)
                if (!recommendation) return null

                return (
                  <Card key={recId} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{recommendation.name}</CardTitle>
                      <CardDescription>{recommendation.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="line-clamp-3">{recommendation.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Link
                        href={`/recommendations#${recommendation.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View recommendation
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </article>

      <Separator className="my-12" />

      <GiscusComments />
    </div>
  )
}

