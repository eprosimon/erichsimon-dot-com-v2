"use client"

import { useAnimationContext } from "@/components/animation-provider"
import { Button } from "@/components/ui/button"
import { Sparkles, SparkleIcon as SparklesOff } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AnimationToggle() {
  const { globalAnimationsEnabled } = useAnimationContext()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full pointer-events-none">
            {globalAnimationsEnabled ? (
              <Sparkles className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <SparklesOff className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">{globalAnimationsEnabled ? "Animations enabled" : "Animations disabled"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{globalAnimationsEnabled ? "Animations enabled" : "Animations disabled"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

