"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ContentTagDropdown } from "./ContentTagDropdown"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilterX, SlidersHorizontal, Tag as TagIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ReviewsFilterControlsProps {
    availableTags: string[]
}

export function ReviewsFilterControls({ availableTags }: ReviewsFilterControlsProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentStatus = searchParams.get("status") || ""
    const currentTagParam = searchParams.get("tag") || ""

    const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // Update state when URL params change
    useEffect(() => {
        setSelectedStatus(currentStatus)
        const parsedTags = currentTagParam ? currentTagParam.split(',') : []
        setSelectedTags(parsedTags)
    }, [currentStatus, currentTagParam])

    // Function to clear all filters
    const clearAllFilters = () => {
        setSelectedStatus("")
        setSelectedTags([])
        router.push("/reviews")
    }

    // Check if any filters are active
    const hasActiveFilters = selectedStatus || selectedTags.length > 0

    // Update URL query params when filters change
    useEffect(() => {
        const query: Record<string, string> = {}
        if (selectedStatus) {
            query.status = selectedStatus
        }
        if (selectedTags.length > 0) {
            // Join multiple tags with commas
            query.tag = selectedTags.join(',')
        }

        const queryString = new URLSearchParams(query).toString()
        router.push(`/reviews${queryString ? `?${queryString}` : ""}`)
    }, [selectedStatus, selectedTags, router])

    // Map status values to readable labels and colors
    const statusOptions = [
        { id: "current", label: "Using", dotColor: "bg-blue-500" },
        { id: "previous", label: "Used", dotColor: "bg-slate-500" },
        { id: "heard", label: "Heard of", dotColor: "bg-violet-500" },
        { id: "recommended", label: "Recommended", dotColor: "bg-green-500" }
    ]

    return (
        <Card className="border-none shadow-sm bg-background/70 backdrop-blur-sm">
            <CardContent className="p-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Filters:</span>
                        </div>

                        {statusOptions.map(option => {
                            const isSelected = selectedStatus === option.id;
                            return (
                                <Button
                                    key={option.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedStatus(isSelected ? "" : option.id)}
                                    className={cn(
                                        "h-8 px-3 text-xs border transition-all",
                                        isSelected
                                            ? "bg-primary/5 text-foreground font-medium border-primary/20"
                                            : "border-transparent hover:bg-accent"
                                    )}
                                >
                                    <div className="flex items-center gap-1.5">
                                        {isSelected && (
                                            <div className={cn("w-1.5 h-1.5 rounded-full", option.dotColor)} />
                                        )}
                                        {option.label}
                                    </div>
                                </Button>
                            );
                        })}

                        <ContentTagDropdown
                            availableTags={availableTags}
                            selectedTags={selectedTags}
                            onTagsChange={setSelectedTags}
                            placeholder="Add tags..."
                            className="h-8 border-dashed w-auto"
                        />
                    </div>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="h-8 text-muted-foreground hover:text-foreground"
                        >
                            <FilterX className="h-3.5 w-3.5 mr-1" />
                            <span>Reset</span>
                        </Button>
                    )}
                </div>

                {/* Active filters display */}
                {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        <div className="flex items-center">
                            <TagIcon className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                        </div>
                        {selectedTags.map(tag => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="font-normal text-xs py-0 h-5 pl-2 pr-1.5 gap-1 items-center"
                            >
                                {tag}
                                <FilterX
                                    className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                                    onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                                />
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 