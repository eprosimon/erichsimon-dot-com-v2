import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx"
import { PostCard } from "@/components/post-card"
import { Separator } from "@/components/ui/separator"
import { ChatPromo } from "@/components/chat-promo"
import { FeaturedPostCard } from "@/components/featured-post-card"
import { HeroAnimation } from "@/components/hero-animation"
import { ArrowRight } from "lucide-react"
import { AnimatedElement } from "@/components/animated-element"
import { PageTransition } from "@/components/page-transition"
import { StaggeredGroup } from "@/components/staggered-group"

export default function HomePage() {
  const posts = getAllPosts() || []
  const recentPosts = posts.length > 0 ? posts.slice(0, 3) : []
  const featuredPosts = posts.length > 0 ? posts.slice(0, 2) : []

  return (
    <PageTransition>
      <div className="container py-6 md:py-16">
        {/* Hero Section with Animation */}
        <section className="relative pb-8 md:pb-12">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <HeroAnimation />
          </div>
          <div className="flex flex-col items-center text-center relative z-10">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
              Welcome to My Little Spot on the Internet
            </h1>
            <p className="mt-6 max-w-[640px] text-lg text-muted-foreground sm:text-xl">
              Building in public, sharing what I learn, and connecting the dots.
            </p>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="pt-4 pb-12 md:pt-8 md:pb-20">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="inline-block relative">
                Featured Posts
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
              </span>
            </h2>
            <StaggeredGroup className="grid gap-8 md:grid-cols-2" baseDelay={0} staggerDelay={0.02}>
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.slug} post={post} />
              ))}
            </StaggeredGroup>
          </section>
        )}

        <Separator className="my-8 md:my-16 w-full max-w-4xl mx-auto opacity-30" />

        {/* Recent Posts Section */}
        <section className="py-12 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <span className="inline-block relative">
                Recent Posts
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
              </span>
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary flex items-center gap-1 transition-transform hover:translate-x-1"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <StaggeredGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" baseDelay={0} staggerDelay={0.02}>
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <p className="col-span-3 text-center text-muted-foreground">No posts found.</p>
            )}
          </StaggeredGroup>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              className="w-full sm:w-auto group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <Link href="/blog" className="flex items-center gap-2">
                Browse All Posts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Chat Promo Section */}
        <AnimatedElement id="chat-promo" animation="animate-fade-in" options={{ resetOnNavigation: false }}>
          <section className="py-12 md:py-20">
            <ChatPromo />
          </section>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}

