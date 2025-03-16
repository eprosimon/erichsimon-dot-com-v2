import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, CheckCircle } from "lucide-react"
import { getAllProjectCategories, getProjectsByCategory } from "@/lib/data/projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category)

  return {
    title: `${decodedCategory} Projects | Erich Simon`,
    description: `Browse all projects in the ${decodedCategory} category`,
    openGraph: {
      title: `${decodedCategory} Projects | Erich Simon`,
      description: `Browse all projects in the ${decodedCategory} category`,
      type: "website",
      url: `https://erichsimon.com/projects/category/${params.category}`,
    },
  }
}

export function generateStaticParams() {
  const categories = getAllProjectCategories()

  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export default function ProjectCategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category)
  try {
    const projects = getProjectsByCategory(decodedCategory)

    if (projects.length === 0) {
      notFound()
    }
  } catch (error) {
    console.error(`Error fetching projects for category ${decodedCategory}:`, error)
    notFound()
  }

  return (
    <div className="container py-6 md:py-16">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all projects
      </Link>

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{decodedCategory} Projects</h1>
        <p className="text-lg text-muted-foreground">Browse all projects in the {decodedCategory} category</p>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col h-full">
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
              <Image src={project.coverImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
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
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

