import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllRecommendations, getAllCategories } from "@/lib/data/recommendations"
import { RecommendationsGrid } from "@/components/recommendations/grid"
import { RecommendationsFilters } from "@/components/recommendations/filters"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Recommendations | Erich Simon",
  description: "Curated recommendations for tools, services, and products I personally use and trust",
  openGraph: {
    title: "Recommendations | Erich Simon",
    description: "Curated recommendations for tools, services, and products I personally use and trust",
    type: "website",
    url: "https://erichsimon.com/recommendations",
  },
}

export default function RecommendationsPage({
  searchParams,
}: {
  searchParams?: { query?: string; category?: string; status?: string }
}) {
  const query = searchParams?.query || ""
  const categoryFilter = searchParams?.category || ""
  const statusFilter = searchParams?.status || ""

  const recommendations = getAllRecommendations()
  const categories = getAllCategories()

  // Available statuses for filtering
  const statuses = [
    { value: "current", label: "Currently Used" },
    { value: "previous", label: "Previously Used" },
    { value: "heard", label: "Heard Good Things" },
  ]

  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="inline-block relative">
            Recommendations
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">Tools, services, and products I personally use and recommend</p>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/4 animate-fade-in-up animation-delay-2">
          <div className="sticky top-24">
            <RecommendationsFilters
              categories={categories}
              selectedCategory={categoryFilter}
              statuses={statuses}
              selectedStatus={statusFilter}
            />
          </div>
        </div>

        <div className="md:w-3/4">
          <Suspense
            fallback={
              <div className="text-center py-12 animate-pulse-subtle">
                <div className="inline-block rounded-full bg-primary/10 p-4">
                  <svg
                    className="h-8 w-8 animate-spin text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <p className="mt-4 text-muted-foreground">Loading recommendations...</p>
              </div>
            }
          >
            <div className="animate-fade-in-up animation-delay-6">
              <RecommendationsGrid
                recommendations={recommendations}
                query={query}
                category={categoryFilter}
                status={statusFilter}
              />
            </div>
          </Suspense>

          <div className="mt-12 rounded-lg border bg-card p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 animate-fade-in-up animation-delay-10">
            <h2 className="text-xl font-semibold">Disclosure</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Some links on this page are affiliate links. If you click on them and make a purchase, I may receive a
              small commission at no additional cost to you. I only recommend products and services I personally use and
              believe in.
            </p>
            <p className="mt-4 text-sm">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

