import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRecommendationById } from "@/lib/recommendations"

interface RecommendationCardProps {
  id: string
}

export function RecommendationCard({ id }: RecommendationCardProps) {
  const recommendation = getRecommendationById(id)

  if (!recommendation) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Recommendation not found: {id}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{recommendation.name}</CardTitle>
            <CardDescription>{recommendation.shortDescription}</CardDescription>
          </div>
          {recommendation.logo && (
            <div className="h-10 w-10 relative flex-shrink-0">
              <Image
                src={recommendation.logo || "/placeholder.svg"}
                alt={`${recommendation.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p>{recommendation.description}</p>
        {recommendation.pros && recommendation.pros.length > 0 && (
          <div className="mt-2">
            <strong className="text-xs uppercase text-muted-foreground">Pros:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {recommendation.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3 pb-1">
        <div className="flex flex-wrap gap-2">
          {recommendation.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/recommendations#${recommendation.id}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
          >
            View recommendation
          </Link>
          {recommendation.url && (
            <Link
              href={recommendation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary flex items-center hover:underline"
            >
              Visit <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

