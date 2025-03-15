"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/components/animation-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimationSettings } from "@/components/animation-settings"
import { cn } from "@/lib/utils"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <AnimationProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <AnimationSettings />
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

