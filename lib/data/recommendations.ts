import type { Recommendation } from "../types/content"

// This file contains all your recommendations data
// Update this file whenever your recommendations change

const recommendations: Recommendation[] = [
  {
    id: "backblaze",
    name: "Backblaze",
    shortDescription: "Unlimited cloud backup",
    description:
      "Backblaze offers unlimited cloud backup for just $7/month. It's my go-to recommendation for simple, reliable computer backups.",
    pros: ["Truly unlimited backup", "Simple pricing", "Easy to use interface", "Restore by mail option"],
    url: "https://www.backblaze.com/",
    affiliateUrl: "https://www.backblaze.com/cloud-backup.html?af=example",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["backup", "cloud", "storage"],
    category: "Backup Services",
    updatedAt: "2024-03-14",
    status: "current",
    featured: true,
    price: {
      value: 7,
      currency: "USD",
      period: "monthly",
    },
    relatedRecommendations: ["arq", "crashplan"],
  },
  {
    id: "arq",
    name: "Arq Backup",
    shortDescription: "Flexible backup software",
    description:
      "Arq is a powerful backup application that lets you back up to your own cloud storage accounts or local drives.",
    pros: ["One-time purchase", "Use your own storage", "Highly configurable", "Strong encryption"],
    url: "https://www.arqbackup.com/",
    affiliateUrl: "https://www.arqbackup.com/?ref=example",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["backup", "software"],
    category: "Backup Services",
    updatedAt: "2024-03-14",
    status: "heard",
    price: {
      value: 49.99,
      currency: "USD",
      period: "one-time",
    },
  },
  {
    id: "crashplan",
    name: "CrashPlan",
    shortDescription: "Business-focused backup solution",
    description: "CrashPlan offers unlimited backup for small businesses with advanced features and controls.",
    pros: ["Unlimited backup", "Advanced retention policies", "Continuous backup", "External drive backup"],
    cons: ["More expensive than consumer options", "No longer offers personal plans", "Interface can be complex"],
    url: "https://www.crashplan.com/",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["backup", "cloud", "business"],
    category: "Backup Services",
    updatedAt: "2024-03-14",
    status: "previous",
    price: {
      value: 10,
      currency: "USD",
      period: "monthly",
    },
  },
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
    category: "Hosting Services",
    updatedAt: "2024-03-14",
    status: "current",
    featured: true,
    price: {
      value: 0,
      currency: "USD",
      period: "monthly",
    },
    relatedRecommendations: ["netlify", "cloudflare-pages"],
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
    category: "Hosting Services",
    updatedAt: "2024-03-14",
    status: "heard",
    price: {
      value: 0,
      currency: "USD",
      period: "monthly",
    },
  },
  {
    id: "notion",
    name: "Notion",
    shortDescription: "All-in-one workspace",
    description: "Notion is an all-in-one workspace for notes, tasks, wikis, and databases.",
    pros: ["Highly flexible", "Great templates", "Powerful database features", "Good free tier"],
    url: "https://www.notion.so/",
    affiliateUrl: "https://www.notion.so/?r=example",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["productivity", "notes", "organization"],
    category: "Productivity Tools",
    updatedAt: "2024-03-14",
    status: "current",
    price: {
      value: 0,
      currency: "USD",
      period: "monthly",
    },
    relatedRecommendations: ["obsidian", "evernote"],
  },
  {
    id: "obsidian",
    name: "Obsidian",
    shortDescription: "Knowledge base that works on local Markdown files",
    description:
      "Obsidian is a powerful knowledge base that works on top of a local folder of plain text Markdown files.",
    pros: ["Works with local files", "Strong privacy", "Powerful linking and graph view", "Extensive plugin ecosystem"],
    url: "https://obsidian.md/",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["productivity", "notes", "markdown"],
    category: "Productivity Tools",
    updatedAt: "2024-03-14",
    status: "heard",
    price: {
      value: 0,
      currency: "USD",
      period: "monthly",
    },
  },
]

// Get all recommendations
export function getAllRecommendations(): Recommendation[] {
  return recommendations
}

// Get recommendations by category
export function getRecommendationsByCategory(category: string): Recommendation[] {
  return recommendations.filter((rec) => rec.category === category)
}

// Get a specific recommendation by ID
export function getRecommendationById(id: string): Recommendation | undefined {
  return recommendations.find((rec) => rec.id === id)
}

// Get recommendations by status
export function getRecommendationsByStatus(status: string): Recommendation[] {
  return recommendations.filter((rec) => rec.status === status)
}

// Get current recommendations (what I'm using now)
export function getCurrentRecommendations(): Recommendation[] {
  return recommendations.filter((rec) => rec.status === "current")
}

// Get featured recommendations
export function getFeaturedRecommendations(): Recommendation[] {
  return recommendations.filter((rec) => rec.featured)
}

// Get related recommendations
export function getRelatedRecommendations(id: string): Recommendation[] {
  const recommendation = getRecommendationById(id)
  if (!recommendation || !recommendation.relatedRecommendations) {
    return []
  }

  return recommendation.relatedRecommendations
    .map((relatedId) => getRecommendationById(relatedId))
    .filter(Boolean) as Recommendation[]
}

// Get all categories
export function getAllCategories(): string[] {
  return [...new Set(recommendations.map((rec) => rec.category))]
}

// Search recommendations
export function searchRecommendations(query: string): Recommendation[] {
  const searchTerm = query.toLowerCase()
  return recommendations.filter(
    (rec) =>
      rec.name.toLowerCase().includes(searchTerm) ||
      rec.description.toLowerCase().includes(searchTerm) ||
      rec.shortDescription.toLowerCase().includes(searchTerm) ||
      rec.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      rec.category.toLowerCase().includes(searchTerm),
  )
}

