import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getRecommendationById } from "@/lib/data/recommendations"

interface RecommendationCalloutProps {
  id: string
  title?: string
}

export function RecommendationCallout({ id, title }: RecommendationCalloutProps) {
  const recommendation = getRecommendationById(id)

  if (!recommendation) {
    return null
  }

  const linkUrl = recommendation.affiliateUrl || recommendation.url
  const isAffiliate = !!recommendation.affiliateUrl

  // Status badge configuration
  const statusConfig = {
    current: {
      label: "Currently Using",
      color: "text-green-600 dark:text-green-400",
    },
    previous: {
      label: "Previously Used",
      color: "text-blue-600 dark:text-blue-400",
    },
    heard: {
      label: "Heard Good Things",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    // Fallback for any other status values
    default: {
      label: "Recommended",
      color: "text-gray-600 dark:text-gray-400",
    },
  }

  // Safely access the status config with a fallback
  const status = statusConfig[recommendation.status] || statusConfig.default

  return (
    <Alert className="my-6 border-primary/20 bg-primary/5">
      <AlertTitle className="text-primary flex items-center gap-2">
        {title || `Recommended: ${recommendation.name}`}
        <span className={`text-sm font-normal ${status.color}`}>{status.label}</span>
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
              {isAffiliate && <span className="ml-1 text-xs text-muted-foreground">(affiliate link)</span>}
            </Link>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

