"use client"

import { useState, useEffect } from "react"

export function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return isBrowser
}

