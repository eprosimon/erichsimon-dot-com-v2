import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { getRecommendationById, getRelatedRecommendations } from "@/lib/data/recommendations"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RecommendationCard } from "@/components/recommendations/card"

interface RecommendationPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RecommendationPageProps): Promise<Metadata> {
  const recommendation = getRecommendationById(params.id)

  if (!recommendation) {
    return {
      title: "Recommendation Not Found",
      description: "The requested recommendation could not be found.",
    }
  }

  return {
    title: `${recommendation.name} | Recommended by Erich Simon`,
    description: recommendation.description,
    openGraph: {
      title: `${recommendation.name} | Recommended by Erich Simon`,
      description: recommendation.description,
      type: "article",
      url: `https://erichsimon.com/recommendations/${recommendation.id}`,
    },
  }
}

export default function RecommendationPage({ params }: RecommendationPageProps) {
  const recommendation = getRecommendationById(params.id)

  if (!recommendation) {
    notFound()
  }

  const relatedRecommendations = getRelatedRecommendations(params.id)
  const linkUrl = recommendation.affiliateUrl || recommendation.url

  // Status badge configuration
  const statusConfig = {
    current: {
      label: "Currently Used",
      color: "bg-green-500 text-white",
    },
    previous: {
      label: "Previously Used",
      color: "bg-blue-500 text-white",
    },
    heard: {
      label: "Heard Good Things, Never Used",
      color: "bg-yellow-500 text-white",
    },
    // Fallback for any other status values
    default: {
      label: "Recommended",
      color: "bg-gray-500 text-white",
    },
  }

  // Safely access the status config with a fallback
  const status = statusConfig[recommendation.status] || statusConfig.default

  // Format price display
  const formatPrice = () => {
    if (!recommendation.price) return null

    const { value, currency, period } = recommendation.price

    if (value === 0) return "Free"

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    })

    const formattedPrice = formatter.format(value)

    if (period === "one-time") return `${formattedPrice} one-time`
    if (period === "monthly") return `${formattedPrice}/month`
    if (period === "yearly") return `${formattedPrice}/year`

    return formattedPrice
  }

  return (
    <div className="container max-w-4xl py-6 md:py-16">
      <Link
        href="/recommendations"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all recommendations
      </Link>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {recommendation.logo && (
              <div className="w-24 h-24 relative mx-auto md:mx-0">
                <Image 
                  src={recommendation.logo || "/placeholder.svg"} 
                  alt={`${recommendation.name} logo`} 
                  fill 
                  className="object-contain" 
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{recommendation.name}</h1>
                <Badge className={status.color}>
                  {status.label}
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-4">{recommendation.shortDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendation.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {recommendation.price && (
                <div className="mb-4">
                  <span className="text-lg font-medium">Price: {formatPrice()}</span>
                </div>
              )}
              
              {linkUrl && (
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {recommendation.affiliateUrl && (
                    <p className="text-xs text-muted-foreground self-end">
                      (affiliate link)
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">About {recommendation.name}</h2>
          <p className="mb-6">{recommendation.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recommendation.pros && recommendation.pros.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Pros</h3>
                <ul className="space-y-2">
                  {recommendation.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendation.cons && recommendation.cons.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Cons</h3>
                <ul className="space-y-2">
                  {recommendation.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {relatedRecommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Recommendations</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedRecommendations.map(related => (
              <RecommendationCard key={related.id} recommendation={related} />
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-12 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Disclosure</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Some links on this page are affiliate links. If you click on them and make a purchase, I may receive a small commission at no additional cost to you. I only recommend products and services I personally use and believe in.
        </p>
        <p className="mt-4 text-sm">
          <strong>Last updated:</strong> {new Date(recommendation.updatedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    
            month: 'long',
            day: 'numeric'
          })}
        </p>
  </div>
    </div>
  )
}

