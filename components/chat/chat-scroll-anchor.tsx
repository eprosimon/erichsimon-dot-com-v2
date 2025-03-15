"use client"

import { useEffect, useRef } from "react"
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

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView && entry && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [inView, entry])

  return <div ref={ref} className="h-1 w-full" />
}

