"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", "eprosimon/erichsimon-dot-com-v2") // Your actual GitHub repo
    script.setAttribute("data-repo-id", "R_kgDOLtXxxx") // Your actual repo ID from Giscus
    script.setAttribute("data-category-id", "DIC_kwDOLtXxxx") // Your actual category ID from Giscus
    script.setAttribute("data-category", "Comments")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "en")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    const commentsDiv = document.getElementById("giscus-comments")
    if (commentsDiv) {
      // Clear previous comments
      commentsDiv.innerHTML = ""
      commentsDiv.appendChild(script)
    }

    return () => {
      if (commentsDiv) {
        commentsDiv.innerHTML = ""
      }
    }
  }, [mounted, resolvedTheme])

  return <div id="giscus-comments" className="mt-6" />
}

