"use client"

import { RecommendationCard } from "@/components/recommendations/card"
import { motion } from "framer-motion"
import { getRecommendations } from "@/lib/recommendations"
import type { Recommendation as BaseRecommendation } from "@/lib/recommendations"
import type { Recommendation, RecommendationStatus } from "@/lib/types/content"

interface RecommendationsGridProps {
  recommendations: Recommendation[]
  query: string
  category: string
  status: string
}

// Helper function to search recommendations
function searchRecommendations(query: string): Recommendation[] {
  const searchTerm = query.toLowerCase()
  const allRecommendations = getRecommendations()
  const result: Recommendation[] = []

  for (const categoryName in allRecommendations) {
    const matches = allRecommendations[categoryName].filter(
      (rec) =>
        rec.name.toLowerCase().includes(searchTerm) ||
        rec.description.toLowerCase().includes(searchTerm) ||
        rec.shortDescription.toLowerCase().includes(searchTerm) ||
        (rec.tags && rec.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
    )

    // Convert BaseRecommendation to Recommendation by adding required properties
    matches.forEach(rec => {
      result.push({
        ...rec,
        category: categoryName,
        status: "current" as RecommendationStatus,
        tags: rec.tags || []
      });
    });
  }

  return result;
}

export function RecommendationsGrid({ recommendations, query, category, status }: RecommendationsGridProps) {
  // Filter recommendations based on search query, category, and status
  let filteredRecommendations = recommendations

  if (query) {
    filteredRecommendations = searchRecommendations(query)
  }

  if (category) {
    filteredRecommendations = filteredRecommendations.filter((rec) => rec.category === category)
  }

  if (status && status !== "all") {
    filteredRecommendations = filteredRecommendations.filter((rec) => rec.status === status)
  }

  // If no recommendations match the filters
  if (filteredRecommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No recommendations found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    )
  }

  // Group recommendations by category
  const recommendationsByCategory: Record<string, Recommendation[]> = {}

  filteredRecommendations.forEach((rec) => {
    if (!recommendationsByCategory[rec.category]) {
      recommendationsByCategory[rec.category] = []
    }
    recommendationsByCategory[rec.category].push(rec)
  })

  return (
    <div className="space-y-16">
      {Object.entries(recommendationsByCategory).map(([categoryName, items], categoryIndex) => (
        <motion.section
          key={categoryName}
          id={categoryName.toLowerCase().replace(/\s+/g, "-")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            <span className="inline-block relative">
              {categoryName}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
            </span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <RecommendationCard recommendation={recommendation} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

