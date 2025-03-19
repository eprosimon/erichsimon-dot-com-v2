"use client"

import React, { useEffect, useState } from "react"
import { useAnimationControl } from "@/hooks/use-animation-control"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: React.ReactNode
  id: string
  animation: string
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
  options?: Parameters<typeof useAnimationControl>[1]
}

export function AnimatedElement({
  children,
  id,
  animation,
  delay = 0, // Default to no delay
  duration = 200, // Reduced from 300 to 200 for even faster animations
  className,
  threshold = 0.1,
  once = true,
  options,
}: AnimatedElementProps) {
  const { shouldAnimate, markAnimationPlayed, isInitialized } = useAnimationControl(id, options)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !isInitialized) return

    // Check if this is a refresh
    let isRefresh = false
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation")
      isRefresh = navEntries.length > 0 &&
        ((navEntries[0] as PerformanceNavigationTiming).type === "reload" ||
          (navEntries[0] as PerformanceNavigationTiming).type === "back_forward")
    }

    // If it's a refresh, show content immediately
    if (isRefresh) {
      setIsVisible(true)
      if (once) {
        setHasAnimated(true)
        markAnimationPlayed()
      }
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set visible if we should animate and haven't already animated (if once=true)
        if (entry.isIntersecting && shouldAnimate && !(once && hasAnimated)) {
          setIsVisible(true)

          if (once) {
            setHasAnimated(true)
            markAnimationPlayed()
          }
        } else if (!entry.isIntersecting && !once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(ref.current)

    // Safety mechanism: force content to show after a short time
    const safetyTimer = setTimeout(() => {
      setIsVisible(true)
    }, 500) // Reduced from 1000ms to 500ms

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [shouldAnimate, once, hasAnimated, markAnimationPlayed, threshold, isInitialized])

  const animationStyle = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      className={cn(isVisible ? animation : "opacity-0", className)}
      style={isVisible ? animationStyle : undefined}
    >
      {children}
    </div>
  )
}

