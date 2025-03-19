"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useMemo } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  // Determine transition direction based on route
  const direction = useMemo(() => {
    if (!pathname) return "backward"

    const isHome = pathname === "/"
    const isBlog = pathname === "/blog" || pathname.startsWith("/blog/")
    const isProjects = pathname === "/projects" || pathname.startsWith("/projects/")
    const isReviews = pathname === "/reviews" || pathname.startsWith("/reviews/")
    const isAbout = pathname === "/about"
    const isChat = pathname === "/chat" || pathname === "/chat-dev"

    // Consider if user is moving "forward" through site's typical information architecture
    const isForward =
      isHome ||
      (isBlog && !isHome) ||
      (isProjects && !isHome && !isBlog) ||
      (isReviews && !isHome && !isBlog && !isProjects) ||
      (isAbout && !isHome && !isBlog && !isProjects && !isReviews) ||
      (isChat && !isHome && !isBlog && !isProjects && !isReviews && !isAbout)

    return isForward ? "forward" : "backward"
  }, [pathname])

  const animationVariants = {
    forward: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
    backward: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
  }

  const currentVariant = animationVariants[direction]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={currentVariant}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

