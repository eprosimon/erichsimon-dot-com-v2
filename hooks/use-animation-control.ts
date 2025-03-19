"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

type AnimationControlOptions = {
  // How long to remember animation state (in milliseconds)
  // Default: 1 hour
  expiryTime?: number

  // Whether to reset animation state on page refresh
  // Default: false (animations won't play again on refresh)
  resetOnRefresh?: boolean

  // Whether to reset animation state when navigating to a new page
  // Default: true (animations play on each new page)
  resetOnNavigation?: boolean

  // Storage type: 'local' persists across sessions, 'session' only for current session
  // Default: 'local'
  storageType?: "local" | "session"
}

export function useAnimationControl(pageId: string, options: AnimationControlOptions = {}) {
  const {
    expiryTime = 60 * 60 * 1000, // 1 hour
    resetOnRefresh = false,
    resetOnNavigation = true,
    storageType = "local",
  } = options

  const pathname = usePathname()
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Storage key for this specific page
  const storageKey = `animation-played-${pageId}`

  // Get the appropriate storage object
  const storage = typeof window !== "undefined" ? (storageType === "local" ? localStorage : sessionStorage) : null

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkAnimationState = () => {
      // If this is a page refresh (not a navigation), we should show content immediately
      if (typeof window !== "undefined") {
        // More reliable refresh detection
        const navEntries = performance.getEntriesByType("navigation")
        const isRefresh =
          navEntries.length > 0 &&
          ((navEntries[0] as PerformanceNavigationTiming).type === "reload" ||
            (navEntries[0] as PerformanceNavigationTiming).type === "back_forward" ||
            document.visibilityState === "visible")

        if (isRefresh) {
          setShouldAnimate(false)
          return
        }
      }

      // Rest of the function remains the same...
      // Get stored animation state
      const storedValue = storage?.getItem(storageKey)

      if (!storedValue) {
        // No record found, should animate
        setShouldAnimate(true)
        return
      }

      try {
        const { timestamp, path } = JSON.parse(storedValue)
        const now = Date.now()

        // Check if the stored state has expired
        if (now - timestamp > expiryTime) {
          setShouldAnimate(true)
          return
        }

        // Check if we're on a different page and should reset
        if (resetOnNavigation && path !== pathname) {
          setShouldAnimate(true)
          return
        }

        // Otherwise, don't animate
        setShouldAnimate(false)
      } catch (error) {
        // If there's an error parsing the stored value, default to animating
        setShouldAnimate(true)
      }
    }

    // Check animation state on mount
    checkAnimationState()
    setIsInitialized(true)

    // Listen for page visibility changes to handle tab switching/reopening
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && resetOnRefresh) {
        checkAnimationState()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [pathname, storageKey, expiryTime, resetOnNavigation, resetOnRefresh, storage])

  // Mark animation as played
  const markAnimationPlayed = () => {
    if (!storage) return

    const animationState = {
      timestamp: Date.now(),
      path: pathname,
    }

    storage.setItem(storageKey, JSON.stringify(animationState))
    setShouldAnimate(false)
  }

  return {
    shouldAnimate,
    markAnimationPlayed,
    isInitialized,
  }
}

