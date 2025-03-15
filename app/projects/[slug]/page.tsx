import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react"
import { getAllProjects, getProjectBySlug } from "@/lib/data/projects"
import { getPostBySlug } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} | Erich Simon`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
      url: `https://erichsimon.com/projects/${project.slug}`,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // Get all posts in this project
  const projectPosts = project.posts.map((slug) => getPostBySlug(slug)).filter(Boolean)

  return (
    <div className="container max-w-4xl py-6 md:py-16">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all projects
      </Link>

      <div className="aspect-video relative w-full overflow-hidden rounded-lg mb-8">
        <div className="absolute top-4 right-4 z-10">
          <Badge
            className={
              project.status === "ongoing"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }
          >
            {project.status === "ongoing" ? (
              <>
                <Clock className="h-3 w-3 mr-1" />
                Ongoing Project
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed Project
              </>
            )}
          </Badge>
        </div>
        <Image
          src={project.coverImage || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">{project.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <time dateTime={project.publishedAt}>
          Started:{" "}
          {new Date(project.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <time dateTime={project.lastPostDate}>
          Last updated:{" "}
          {new Date(project.lastPostDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </Badge>
        ))}
      </div>

      <div className="prose dark:prose-invert mb-12">
        <p className="text-lg">{project.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Project Posts</h2>

      <div className="space-y-6">
        {projectPosts.map((post, index) => (
          <Card key={post.slug} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2">
                  Part {index + 1} of {projectPosts.length}
                </Badge>
                {index === projectPosts.length - 1 && <Badge className="bg-blue-500 text-white">Latest Update</Badge>}
              </div>
              <CardTitle className="line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline flex items-center"
              >
                Read post <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">About This Project</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This project is a curated collection of blog posts on a specific topic. Follow along from start to finish for
          the complete experience.
          {project.status === "ongoing" && " This project is still being updated with new content."}
        </p>
        <p className="mt-4 text-sm">
          <strong>Last updated:</strong>{" "}
          {new Date(project.lastPostDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}

