"use client"

import { useAnimationContext } from "@/components/animation-provider"
import { Button } from "@/components/ui/button"
import { Sparkles, SparkleIcon as SparklesOff } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AnimationToggle() {
  const { globalAnimationsEnabled, toggleAnimations } = useAnimationContext()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleAnimations} className="rounded-full">
            {globalAnimationsEnabled ? (
              <Sparkles className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <SparklesOff className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">{globalAnimationsEnabled ? "Disable animations" : "Enable animations"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{globalAnimationsEnabled ? "Disable animations" : "Enable animations"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

