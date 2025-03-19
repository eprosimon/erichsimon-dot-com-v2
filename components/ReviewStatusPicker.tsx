"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReviewStatusPickerProps {
    availableStatuses: string[]
    selectedStatus?: string
    onStatusSelect: (status: string | undefined) => void
}

export function ReviewStatusPicker({
    availableStatuses,
    selectedStatus,
    onStatusSelect,
}: ReviewStatusPickerProps) {
    // Map status values to readable labels
    const statusLabels: Record<string, string> = {
        current: "Using",
        previous: "Used",
        heard: "Heard of",
        recommended: "Recommended"
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {availableStatuses.map((status) => {
                const isSelected = selectedStatus === status
                return (
                    <Button
                        key={status}
                        onClick={() => onStatusSelect(isSelected ? undefined : status)}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={cn(
                            "h-8 px-3 text-xs font-medium transition-all",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"
                        )}
                    >
                        {statusLabels[status] || status}
                    </Button>
                )
            })}
        </div>
    )
} 