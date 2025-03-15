import { getAllPosts } from "@/lib/mdx"
import { getAllProjects } from "@/lib/data/projects"
import { getAllReviews } from "@/lib/data/reviews"

export default async function sitemap() {
  const baseUrl = "https://erichsimon.com"

  // Core pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recommendations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Blog posts
  const posts = getAllPosts()
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // Projects
  const projects = getAllProjects()
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Reviews
  const reviews = getAllReviews()
  const reviewUrls = reviews.map((review) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: new Date(review.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...postUrls, ...projectUrls, ...reviewUrls]
}

