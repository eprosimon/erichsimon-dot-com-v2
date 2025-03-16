"use client"

import type React from "react"
import { useEffect, useState, Children, cloneElement, isValidElement } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface StaggeredGroupProps {
  children: React.ReactNode
  className?: string
  baseDelay?: number
  staggerDelay?: number
  animation?: string
  threshold?: number
  as?: React.ElementType
}

// Further reduce the stagger delay to make animations faster
export function StaggeredGroup({
  children,
  className,
  baseDelay = 0,
  staggerDelay = 0, // Set to 0 to eliminate staggering completely
  animation = "animate-fade-in-up",
  threshold = 0.1,
  as: Component = "div",
}: StaggeredGroupProps) {
  const { ref, isInView } = useInView({ threshold, once: true })
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true)
    }
  }, [isInView, hasTriggered])

  // Check if this is a page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation")
      const isRefresh =
        navEntries.length > 0 && (navEntries[0].type === "reload" || navEntries[0].type === "back_forward")

      if (isRefresh) {
        // If it's a refresh, show content immediately
        setHasTriggered(true)
      }
    }
  }, [])

  // Force show content after a timeout as a safety measure
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTriggered(true)
    }, 500) // Reduced from 1000ms to 500ms
    return () => clearTimeout(timer)
  }, [])

  const childrenArray = Children.toArray(children)

  return (
    <Component ref={ref} className={className}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return child

        const delay = baseDelay + index * staggerDelay * 1000 // Convert to ms
        const style = hasTriggered
          ? {
              animationDelay: `${delay}ms`,
              opacity: 1,
            }
          : { opacity: 0 }

        return cloneElement(child, {
          className: cn(hasTriggered ? animation : "", child.props.className),
          style: { ...child.props.style, ...style },
          key: index,
        })
      })}
    </Component>
  )
}

