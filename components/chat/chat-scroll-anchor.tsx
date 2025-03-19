"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility = false }: ChatScrollAnchorProps) {
  const { ref, inView, entry } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -150px 0px",
  })

  useEffect(() => {
    if (!inView && entry && entry.target) {
      entry.target.scrollIntoView({ behavior: "smooth" })
    }
  }, [inView, entry])

  return <div ref={ref} className="h-1 w-full" />
}

