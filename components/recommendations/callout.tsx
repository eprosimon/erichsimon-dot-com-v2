import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getRecommendationById, type Recommendation } from "@/lib/recommendations"
import { cn } from "@/lib/utils"

interface RecommendationCalloutProps {
  id: string
  title?: string
}

export function RecommendationCallout({ id, title }: RecommendationCalloutProps) {
  const recommendation = getRecommendationById(id)

  if (!recommendation) {
    return null
  }

  // We need to check if the URL exists
  const linkUrl = recommendation.url

  // Simplified status display since the recommendations.ts doesn't have status
  const statusLabel = "Recommended"
  const statusColor = "text-green-600 dark:text-green-400"

  return (
    <Alert className="my-6 border-primary/20 bg-primary/5">
      <AlertTitle className="text-primary flex items-center gap-2">
        {title || `Recommended: ${recommendation.name}`}
        <span className={cn("text-sm font-normal", statusColor)}>{statusLabel}</span>
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p>{recommendation.shortDescription}</p>
        <div className="mt-2 flex items-center gap-4">
          <Link
            href={`/recommendations/${id}`}
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            See full recommendation <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
          {linkUrl && (
            <Link
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline flex items-center"
            >
              Visit website <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

