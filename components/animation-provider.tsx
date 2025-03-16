"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface AnimationContextType {
  globalAnimationsEnabled: boolean
  pageTransitionComplete: boolean
  setPageTransitionComplete: (complete: boolean) => void
}

const AnimationContext = createContext<AnimationContextType>({
  globalAnimationsEnabled: false,
  pageTransitionComplete: false,
  setPageTransitionComplete: () => { },
})

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [pageTransitionComplete, setPageTransitionComplete] = useState(true)
  const pathname = usePathname()

  // Determine if animations should be enabled based on the current path
  const isAnimationEnabledPath =
    pathname?.includes('/projects') ||
    pathname?.includes('/reviews') ||
    pathname?.includes('/recommendations');

  const globalAnimationsEnabled = isAnimationEnabledPath;

  // Reset page transition state on route change
  useEffect(() => {
    // Always mark page transition as complete immediately
    setPageTransitionComplete(true)
  }, [pathname])

  return (
    <AnimationContext.Provider
      value={{
        globalAnimationsEnabled,
        pageTransitionComplete,
        setPageTransitionComplete,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export const useAnimationContext = () => useContext(AnimationContext)

