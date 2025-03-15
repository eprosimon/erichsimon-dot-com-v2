import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Erich Simon",
  description: "About me and this blog",
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-16">
      <div className="animate-fade-in-up">
        <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          <span className="inline-block relative">
            About Me
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
          </span>
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12 animate-fade-in-up animation-delay-2">
        <div className="flex justify-center md:col-span-1">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl md:h-64 md:w-64 transition-transform duration-500 hover:scale-105">
            <Image src="/placeholder.svg" alt="Erich Simon" fill className="object-cover" priority />
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-lg text-muted-foreground mb-4">
            Hi, I'm Erich Simon, a hobby programmer currently working at Vercel and previously at Cloudflare. I share my
            thoughts on web development, software engineering, and technology trends.
          </p>
          <p className="mb-6">
            While I work in the tech industry professionally, this site represents my personal views and is not
            affiliated with my employment. That said, my recommendations and choices may naturally be influenced by my
            familiarity with certain technologies and platforms.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="gap-2 transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
            >
              <Link href="https://github.com/username">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
            >
              <Link href="https://bsky.app/username">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 2L2 19h20L12 2z" />
                </svg>
                Bluesky
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
            >
              <Link href="mailto:contact@example.com">
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8 animate-fade-in-up animation-delay-4" />

      <div className="prose dark:prose-invert animate-fade-in-up animation-delay-6">
        <h2 className="group">
          <span className="inline-block relative">
            My Background
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></span>
          </span>
        </h2>
        <p>
          I'm a hobby programmer with professional experience in the tech industry. Currently, I work at Vercel, and
          before that, I was at Cloudflare. My journey in technology started with a curiosity about how things work,
          which eventually led me to pursue a career in this field.
        </p>

        <h2 className="group">
          <span className="inline-block relative">
            What I Write About
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></span>
          </span>
        </h2>
        <p>On this blog, you'll find articles about:</p>
        <ul className="space-y-2">
          <li className="transition-transform hover:translate-x-1">Web Development</li>
          <li className="transition-transform hover:translate-x-1">Software Engineering</li>
          <li className="transition-transform hover:translate-x-1">Technology Trends</li>
          <li className="transition-transform hover:translate-x-1">Personal Projects</li>
          <li className="transition-transform hover:translate-x-1">Learning Resources</li>
        </ul>

        <p>
          <strong>Disclaimer:</strong> The opinions, recommendations, and content on this site are entirely my own and
          do not represent the views of my employers, past or present. While my professional experience informs my
          perspective, I strive to provide balanced insights.
        </p>

        <h2 className="group">
          <span className="inline-block relative">
            Connect With Me
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></span>
          </span>
        </h2>
        <p>
          I'm always interested in connecting with like-minded individuals. Feel free to reach out to me on social media
          or via email.
        </p>
      </div>

      <div className="mt-12 p-6 rounded-lg border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 animate-fade-in-up animation-delay-8">
        <h3 className="text-xl font-bold mb-2">Want to work together?</h3>
        <p className="text-muted-foreground mb-4">
          I'm always open to interesting collaborations and projects. If you have something in mind, don't hesitate to
          reach out!
        </p>
        <Button asChild className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          <Link href="mailto:contact@example.com">Get in touch</Link>
        </Button>
      </div>
    </div>
  )
}

