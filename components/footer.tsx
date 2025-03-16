import Link from "next/link"
import { Github, Rss } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
            Erich Simon
          </Link>
          <p className="mt-2 text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Erich Simon. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://bsky.app/username"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Bluesky"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2L2 19h20L12 2z" />
              </svg>
            </Link>
            <Link
              href="/api/rss"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="RSS Feed"
            >
              <Rss className="h-5 w-5" />
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

