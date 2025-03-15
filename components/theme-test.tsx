"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeTest() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="p-4 border rounded-md mb-4">
      <h2 className="text-lg font-bold mb-2">Theme Debugger</h2>
      <p className="mb-2">
        Current theme: <strong>{theme}</strong>
      </p>
      <p className="mb-2">
        Resolved theme: <strong>{resolvedTheme}</strong>
      </p>
      <div className="flex gap-2 mt-4">
        <Button onClick={() => setTheme("light")}>Set Light</Button>
        <Button onClick={() => setTheme("dark")}>Set Dark</Button>
        <Button onClick={() => setTheme("system")}>Set System</Button>
      </div>
    </div>
  )
}

