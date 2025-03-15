"use client"

import { useState } from "react"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAnimationContext } from "@/components/animation-provider"

export function AnimationSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { globalAnimationsEnabled, toggleAnimations } = useAnimationContext()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-md bg-background"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Animation settings"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-64 p-4 rounded-lg border bg-card shadow-lg">
          <h3 className="font-medium mb-4">Animation Settings</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations-toggle" className="cursor-pointer">
              Enable animations
            </Label>
            <Switch id="animations-toggle" checked={globalAnimationsEnabled} onCheckedChange={toggleAnimations} />
          </div>

          <p className="text-xs text-muted-foreground mt-4">Animation preferences are saved for your next visit.</p>
        </div>
      )}
    </div>
  )
}

