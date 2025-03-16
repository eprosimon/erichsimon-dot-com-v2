"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FolderKanban, Star, ListChecks, User, MessageCircle, Rss } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function MobileNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      icon: BookOpen,
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/projects",
      label: "Projects",
      icon: FolderKanban,
      active: pathname === "/projects" || pathname.startsWith("/projects/"),
    },
    {
      href: "/reviews",
      label: "Reviews",
      icon: Star,
      active: pathname === "/reviews" || pathname.startsWith("/reviews/"),
    },
    {
      href: "/recommendations",
      label: "Recs",
      icon: ListChecks,
      active: pathname === "/recommendations",
    },
    {
      href: "/about",
      label: "About",
      icon: User,
      active: pathname === "/about",
    },
    {
      href: "/chat",
      label: "Chat",
      icon: MessageCircle,
      active: pathname === "/chat",
    },
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40 px-1 pb-safe">
        <div className="flex items-center justify-between">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex flex-col items-center py-2 px-1 min-w-[3.5rem]",
                  route.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate w-full text-center">{route.label}</span>
                {route.active && (
                  <motion.div
                    className="absolute bottom-0 h-0.5 w-8 bg-primary rounded-t-full"
                    layoutId="bottomNavIndicator"
                  />
                )}
              </Link>
            )
          })}

          {/* RSS Link */}
          <Link
            href="/api/rss"
            className={cn(
              "flex flex-col items-center py-2 px-1 min-w-[3.5rem]",
              pathname === "/api/rss"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Rss className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">RSS</span>
          </Link>
        </div>
      </div>
    </>
  )
}

