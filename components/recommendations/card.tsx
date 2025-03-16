import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Check, Clock, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Recommendation } from "@/lib/types/content"

interface RecommendationCardProps {
  recommendation: Recommendation
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const linkUrl = recommendation.affiliateUrl || recommendation.url

  // Status badge configuration
  const statusConfig = {
    current: {
      label: "Currently Used",
      icon: <Check className="h-3 w-3 mr-1" />,
      color: "bg-green-500 text-white hover:bg-green-600",
    },
    previous: {
      label: "Previously Used",
      icon: <Clock className="h-3 w-3 mr-1" />,
      color: "bg-blue-500 text-white hover:bg-blue-600",
    },
    heard: {
      label: "Heard Good Things",
      icon: <Star className="h-3 w-3 mr-1" />,
      color: "bg-yellow-500 text-white hover:bg-yellow-600",
    },
    // Fallback for any other status values
    default: {
      label: "Recommended",
      icon: null,
      color: "bg-gray-500 text-white hover:bg-gray-600",
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
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {recommendation.name}
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className={status.color}>
                      <span className="flex items-center">
                        {status.icon}
                        {recommendation.status === "current" ? "Current" : null}
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{status.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>{recommendation.shortDescription}</CardDescription>
          </div>
          {recommendation.logo && (
            <div className="h-10 w-10 relative flex-shrink-0">
              <Image
                src={recommendation.logo || "/placeholder.svg"}
                alt={`${recommendation.name} logo`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm flex-grow">
        <p>{recommendation.description}</p>

        {recommendation.price && (
          <div className="mt-2 flex items-center">
            <span className="text-sm font-medium">Price: {formatPrice()}</span>
          </div>
        )}

        {recommendation.pros && recommendation.pros.length > 0 && (
          <div className="mt-2">
            <strong className="text-xs uppercase text-muted-foreground">Pros:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {recommendation.pros.map((pro, index) => (
                <li key={index} className="transition-transform duration-300 hover:translate-x-1">
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendation.cons && recommendation.cons.length > 0 && (
          <div className="mt-2">
            <strong className="text-xs uppercase text-muted-foreground">Cons:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {recommendation.cons.map((con, index) => (
                <li key={index} className="transition-transform duration-300 hover:translate-x-1">
                  {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3 pb-1">
        <div className="flex flex-wrap gap-2">
          {recommendation.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {linkUrl && (
          <Link
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary flex items-center hover:underline group"
          >
            {recommendation.affiliateUrl ? (
              <>
                Visit <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                <span className="ml-1 text-xs text-muted-foreground">(affiliate)</span>
              </>
            ) : (
              <>
                Visit <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

