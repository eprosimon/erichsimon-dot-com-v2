"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface RecommendationsFiltersProps {
  categories: string[]
  selectedCategory: string
  statuses: { value: string; label: string }[]
  selectedStatus: string
}

export function RecommendationsFilters({
  categories,
  selectedCategory,
  statuses,
  selectedStatus,
}: RecommendationsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Update the URL when a filter is selected
  const handleFilterChange = (type: "category" | "status", value: string) => {
    const params = new URLSearchParams(searchParams)

    if (type === "category") {
      if (value && value !== selectedCategory) {
        params.set("category", value)
      } else {
        params.delete("category")
      }
    } else if (type === "status") {
      if (value && value !== selectedStatus) {
        params.set("status", value)
      } else {
        params.delete("status")
      }
    }

    // Preserve the search query if it exists
    if (searchParams.has("query")) {
      params.set("query", searchParams.get("query")!)
    }

    startTransition(() => {
      router.push(`/recommendations?${params.toString()}`)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium mb-3">Categories</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("category", "")}
            disabled={isPending}
            className={!selectedCategory ? "bg-primary/90 hover:bg-primary" : "hover:bg-primary/5"}
          >
            All Categories
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("category", category)}
              disabled={isPending}
              className={category === selectedCategory ? "bg-primary/90 hover:bg-primary" : "hover:bg-primary/5"}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-primary/10" />

      <div>
        <h2 className="font-medium mb-3">Status</h2>
        <div className="flex flex-col gap-2">
          <Button
            variant={!selectedStatus ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("status", "")}
            disabled={isPending}
            className={!selectedStatus ? "bg-primary/90 hover:bg-primary" : "hover:bg-primary/5"}
          >
            All Recommendations
          </Button>

          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={status.value === selectedStatus ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("status", status.value)}
              disabled={isPending}
              className={status.value === selectedStatus ? "bg-primary/90 hover:bg-primary" : "hover:bg-primary/5"}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

