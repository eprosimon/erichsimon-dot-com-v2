import type { Review } from "../types/content"

const reviews: Review[] = [
  {
    id: "backblaze-review",
    slug: "backblaze-cloud-backup-review",
    title: "Backblaze Cloud Backup Review: Simple, Unlimited Backup for Your PC",
    excerpt:
      "A comprehensive review of Backblaze's unlimited cloud backup service, examining its features, performance, and value.",
    content: "# Backblaze Cloud Backup Review\n\nBackblaze offers unlimited cloud backup...",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.5,
    productName: "Backblaze Cloud Backup",
    productUrl: "https://www.backblaze.com/",
    affiliateUrl: "https://www.backblaze.com/cloud-backup.html?af=example",
    pros: [
      "Truly unlimited backup with no file size limits",
      "Simple, straightforward pricing",
      "Easy to use with minimal configuration",
      "Restore by mail option for large recoveries",
    ],
    cons: ["Limited to one computer per license", "No direct NAS backup support", "30-day version history by default"],
    verdict:
      "Backblaze is the best cloud backup solution for most people due to its simplicity, unlimited storage, and reasonable pricing.",
    tags: ["backup", "cloud", "storage", "software"],
    category: "Software",
    publishedAt: "2024-01-15",
    updatedAt: "2024-03-14",
    relatedRecommendations: ["backblaze", "arq"],
  },
  {
    id: "notion-review",
    slug: "notion-productivity-app-review",
    title: "Notion Review: The All-in-One Workspace for Notes, Tasks, and More",
    excerpt:
      "A detailed review of Notion, exploring how this versatile tool can transform your productivity and organization.",
    content: "# Notion Review\n\nNotion has quickly become one of the most popular productivity tools...",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.7,
    productName: "Notion",
    productUrl: "https://www.notion.so/",
    affiliateUrl: "https://www.notion.so/?r=example",
    pros: [
      "Extremely flexible and customizable",
      "All-in-one solution for notes, tasks, wikis, and databases",
      "Excellent templates and community resources",
      "Good free tier with generous limits",
    ],
    cons: ["Can be overwhelming for beginners", "Mobile app is sometimes slow", "Offline mode has limitations"],
    verdict:
      "Notion is a powerful all-in-one workspace that can replace multiple apps in your productivity stack, though it comes with a learning curve.",
    tags: ["productivity", "notes", "organization", "software"],
    category: "Productivity",
    publishedAt: "2024-02-10",
    updatedAt: "2024-03-14",
    relatedRecommendations: ["notion"],
  },
]

// Get all reviews
export function getAllReviews(): Review[] {
  return reviews
}

// Get a review by slug
export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((review) => review.slug === slug)
}

// Get reviews by category
export function getReviewsByCategory(category: string): Review[] {
  return reviews.filter((review) => review.category === category)
}

// Get all review categories
export function getAllReviewCategories(): string[] {
  return [...new Set(reviews.map((review) => review.category))]
}

// Search reviews
export function searchReviews(query: string): Review[] {
  const searchTerm = query.toLowerCase()
  return reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchTerm) ||
      review.excerpt.toLowerCase().includes(searchTerm) ||
      review.content.toLowerCase().includes(searchTerm) ||
      review.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      review.category.toLowerCase().includes(searchTerm) ||
      review.productName.toLowerCase().includes(searchTerm),
  )
}

