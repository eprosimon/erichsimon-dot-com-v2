"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()

  // Check if this is an old recommendations URL
  const isOldRecommendation = pathname?.startsWith("/recommendations/")

  return (
    <div className="container py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">
        {isOldRecommendation ? "Recommendations Have Moved" : "Page Not Found"}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {isOldRecommendation
          ? "Recommendations are now integrated into our reviews system for a more cohesive experience."
          : "Sorry, the page you're looking for doesn't exist or has been moved."}
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href={isOldRecommendation ? "/reviews?recommended=true" : "/"}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {isOldRecommendation ? "View Recommendations" : "Go Home"}
        </Link>
        {!isOldRecommendation && (
          <Link
            href="/blog"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Browse Articles
          </Link>
        )}
      </div>
    </div>
  )
}

