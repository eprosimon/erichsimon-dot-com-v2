import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, CheckCircle, Filter } from "lucide-react"
import { getAllProjects, getAllProjectCategories } from "@/lib/data/projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Projects | Erich Simon",
  description: "Collections of related posts on specific builds, processes, and topics",
  openGraph: {
    title: "Projects | Erich Simon",
    description: "Collections of related posts on specific builds, processes, and topics",
    type: "website",
    url: "https://erichsimon.com/projects",
  },
}

export default function ProjectsPage() {
  // Get all projects and sort by lastPostDate (most recent first)
  const projects = getAllProjects().sort(
    (a, b) => new Date(b.lastPostDate).getTime() - new Date(a.lastPostDate).getTime(),
  )

  const categories = getAllProjectCategories()

  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="inline-block relative">
            Projects
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Collections of related posts on specific builds, processes, and topics
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 animate-fade-in-up animation-delay-2">
        <Button variant="outline" className="bg-primary/5 border-primary/20">
          <Filter className="mr-2 h-4 w-4" />
          All Projects
        </Button>
        {categories.map((category) => (
          <Button key={category} variant="outline" className="hover:bg-primary/5">
            {category}
          </Button>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 animate-fade-in-up"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="aspect-video relative">
              <div className="absolute top-2 right-2 z-10">
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
                      Ongoing
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </>
                  )}
                </Badge>
              </div>
              <Image
                src={project.coverImage || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2 group">
                <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription>{project.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3 text-sm">{project.excerpt}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Last updated:</span>{" "}
                {new Date(project.lastPostDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="ml-auto flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center animate-fade-in-up animation-delay-10">
        <p className="text-muted-foreground mb-4">Browse projects by category</p>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="text-sm hover:bg-primary/5 transition-colors">
              <Link href={`/projects?category=${category}`}>{category}</Link>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

