"use client"

import * as React from "react"
import { Check, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandInput,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContentTagDropdownProps {
    availableTags: string[]
    selectedTags?: string[]
    onTagsChange: (tags: string[]) => void
    placeholder?: string
    className?: string
}

export function ContentTagDropdown({
    availableTags,
    selectedTags = [],
    onTagsChange,
    placeholder = "Select tags...",
    className
}: ContentTagDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredTags = React.useMemo(() => {
        if (!searchQuery) return availableTags

        return availableTags.filter(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [availableTags, searchQuery])

    const handleTagToggle = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }

    const clearTags = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        onTagsChange([])
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("h-8 font-normal", className)}
                >
                    <div className="flex items-center gap-1.5">
                        <Plus className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground text-xs">{placeholder}</span>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search tags..."
                        className="h-9"
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    {searchQuery && filteredTags.length === 0 && (
                        <CommandEmpty>
                            <div className="p-2 text-sm text-center text-muted-foreground">
                                No tags found
                            </div>
                        </CommandEmpty>
                    )}
                    <ScrollArea className="h-48">
                        <div className="p-2">
                            {selectedTags.length > 0 && (
                                <div className="mb-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-muted-foreground"
                                        onClick={() => clearTags()}
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            )}
                            <div className="space-y-1">
                                {filteredTags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        <div className="flex h-4 w-4 items-center justify-center rounded border border-primary">
                                            {selectedTags.includes(tag) && (
                                                <Check className="h-3 w-3" />
                                            )}
                                        </div>
                                        <span className="flex-grow text-sm">
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
} 