"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { AnimationToggle } from "@/components/animation-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { motion } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/projects",
      label: "Projects",
      active: pathname === "/projects" || pathname.startsWith("/projects/"),
    },
    {
      href: "/reviews",
      label: "Reviews",
      active: pathname === "/reviews" || pathname.startsWith("/reviews/"),
    },
    {
      href: "/recommendations",
      label: "Recommendations",
      active: pathname === "/recommendations",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/chat",
      label: "Chat",
      active: pathname === "/chat",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:text-primary">
            <span className="font-bold text-xl">Erich Simon</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "relative flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground" : "text-foreground/60",
                )}
              >
                {route.label}
                {route.active && (
                  <motion.span
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <AnimationToggle />
          <ModeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:flex" title="RSS feed">
            <Link href="/api/rss">RSS</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

