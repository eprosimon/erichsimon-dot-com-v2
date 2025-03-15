"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAnimationContext } from "@/components/animation-provider"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { globalAnimationsEnabled, pageTransitionComplete, setPageTransitionComplete } = useAnimationContext()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    // After first render, mark it as no longer first render
    setIsFirstRender(false)

    // Mark page transition as complete after animation finishes
    const timer = setTimeout(() => {
      setPageTransitionComplete(true)
    }, 300) // Match this with your animation duration

    // Safety mechanism: force content to show after a short delay
    // This ensures content is visible even if animations fail
    const safetyTimer = setTimeout(() => {
      setForceShow(true)
    }, 500) // Reduced from 1000ms to 500ms for faster safety fallback

    return () => {
      clearTimeout(timer)
      clearTimeout(safetyTimer)
    }
  }, [pathname, setPageTransitionComplete])

  // Improve refresh detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if this is a refresh or back/forward navigation
      const navEntries = performance.getEntriesByType("navigation")
      const isRefresh =
        navEntries.length > 0 && (navEntries[0].type === "reload" || navEntries[0].type === "back_forward")

      if (isRefresh) {
        // If it's a refresh, force show content immediately
        setForceShow(true)
        setPageTransitionComplete(true)
      }
    }
  }, [])

  // Skip animation on first render to prevent initial flash
  if (isFirstRender || forceShow) {
    return <>{children}</>
  }

  // If animations are disabled globally, don't animate
  if (!globalAnimationsEnabled) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

