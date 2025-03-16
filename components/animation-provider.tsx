"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface AnimationContextType {
  globalAnimationsEnabled: boolean
  toggleAnimations: () => void
  pageTransitionComplete: boolean
  setPageTransitionComplete: (complete: boolean) => void
}

const AnimationContext = createContext<AnimationContextType>({
  globalAnimationsEnabled: false,
  toggleAnimations: () => { },
  pageTransitionComplete: false,
  setPageTransitionComplete: () => { },
})

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [globalAnimationsEnabled, setGlobalAnimationsEnabled] = useState(false)
  const [pageTransitionComplete, setPageTransitionComplete] = useState(true)
  const pathname = usePathname()

  // Reset page transition state on route change
  useEffect(() => {
    // Always mark page transition as complete immediately
    setPageTransitionComplete(true)
  }, [pathname])

  // Load animation preference from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    // Force animations to be disabled
    localStorage.setItem("animations-enabled", "false")
  }, [])

  const toggleAnimations = () => {
    // Keep animations disabled
    setGlobalAnimationsEnabled(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("animations-enabled", "false")
    }
  }

  return (
    <AnimationContext.Provider
      value={{
        globalAnimationsEnabled,
        toggleAnimations,
        pageTransitionComplete,
        setPageTransitionComplete,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export const useAnimationContext = () => useContext(AnimationContext)

