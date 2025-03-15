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
  globalAnimationsEnabled: true,
  toggleAnimations: () => {},
  pageTransitionComplete: false,
  setPageTransitionComplete: () => {},
})

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [globalAnimationsEnabled, setGlobalAnimationsEnabled] = useState(true)
  const [pageTransitionComplete, setPageTransitionComplete] = useState(false)
  const pathname = usePathname()

  // Reset page transition state on route change
  useEffect(() => {
    // Improved refresh detection
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation")
      const isRefresh =
        navEntries.length > 0 && (navEntries[0].type === "reload" || navEntries[0].type === "back_forward")

      if (isRefresh) {
        // If it's a refresh, mark page transition as complete immediately
        setPageTransitionComplete(true)
        return
      }
    }

    // For normal navigation, reset and then quickly complete
    setPageTransitionComplete(false)

    // Mark page transition as complete after a very short delay
    const timer = setTimeout(() => {
      setPageTransitionComplete(true)
    }, 50) // Reduced from 100ms to 50ms for faster transitions

    return () => clearTimeout(timer)
  }, [pathname])

  // Load animation preference from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    const storedPreference = localStorage.getItem("animations-enabled")
    if (storedPreference !== null) {
      setGlobalAnimationsEnabled(storedPreference === "true")
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !globalAnimationsEnabled
    setGlobalAnimationsEnabled(newValue)

    if (typeof window !== "undefined") {
      localStorage.setItem("animations-enabled", String(newValue))
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

