// This file contains all your recommendations data
// Update this file whenever your recommendations change

export type Recommendation = {
  id: string
  name: string
  shortDescription: string
  description: string
  pros?: string[]
  cons?: string[]
  url?: string
  logo?: string
  tags?: string[]
  updatedAt: string // ISO date string
}

export type RecommendationCategory = {
  [category: string]: Recommendation[]
}

// This function returns all recommendations
export function getRecommendations(): RecommendationCategory {
  return {
    "Backup Services": [
      {
        id: "backblaze",
        name: "Backblaze",
        shortDescription: "Unlimited cloud backup",
        description:
          "Backblaze offers unlimited cloud backup for just $7/month. It's my go-to recommendation for simple, reliable computer backups.",
        pros: ["Truly unlimited backup", "Simple pricing", "Easy to use interface", "Restore by mail option"],
        url: "https://www.backblaze.com/",
        logo: "/placeholder.svg?height=40&width=40",
        tags: ["backup", "cloud", "storage"],
        updatedAt: "2024-03-14",
      },
      {
        id: "arq",
        name: "Arq Backup",
        shortDescription: "Flexible backup software",
        description:
          "Arq is a powerful backup application that lets you back up to your own cloud storage accounts or local drives.",
        pros: ["One-time purchase", "Use your own storage", "Highly configurable", "Strong encryption"],
        url: "https://www.arqbackup.com/",
        logo: "/placeholder.svg?height=40&width=40",
        tags: ["backup", "software"],
        updatedAt: "2024-03-14",
      },
    ],
    "Hosting Services": [
      {
        id: "vercel",
        name: "Vercel",
        shortDescription: "Frontend cloud platform",
        description:
          "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
        pros: ["Excellent developer experience", "Built for Next.js", "Great free tier", "Global edge network"],
        url: "https://vercel.com/",
        logo: "/placeholder.svg?height=40&width=40",
        tags: ["hosting", "jamstack", "frontend"],
        updatedAt: "2024-03-14",
      },
      {
        id: "netlify",
        name: "Netlify",
        shortDescription: "Unified platform for web projects",
        description:
          "Netlify unites an entire ecosystem of modern tools and services into a single, simple workflow for building high performance sites and apps.",
        pros: ["Easy deployment from Git", "Built-in CI/CD", "Serverless functions", "Forms handling"],
        url: "https://www.netlify.com/",
        logo: "/placeholder.svg?height=40&width=40",
        tags: ["hosting", "jamstack", "frontend"],
        updatedAt: "2024-03-14",
      },
    ],
    "Productivity Tools": [
      {
        id: "notion",
        name: "Notion",
        shortDescription: "All-in-one workspace",
        description: "Notion is an all-in-one workspace for notes, tasks, wikis, and databases.",
        pros: ["Highly flexible", "Great templates", "Powerful database features", "Good free tier"],
        url: "https://www.notion.so/",
        logo: "/placeholder.svg?height=40&width=40",
        tags: ["productivity", "notes", "organization"],
        updatedAt: "2024-03-14",
      },
    ],
  }
}

// Get a specific recommendation by ID
export function getRecommendationById(id: string): Recommendation | undefined {
  const allRecommendations = getRecommendations()

  for (const category in allRecommendations) {
    const found = allRecommendations[category].find((item) => item.id === id)
    if (found) return found
  }

  return undefined
}

// Get recommendations by category
export function getRecommendationsByCategory(category: string): Recommendation[] {
  const allRecommendations = getRecommendations()
  return allRecommendations[category] || []
}

// Get all categories
export function getAllCategories(): string[] {
  return Object.keys(getRecommendations())
}

