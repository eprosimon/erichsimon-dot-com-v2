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
    relatedRecommendations: ["backblaze-recommendation", "arq-backup-review"],
    isRecommended: true,
    isCurrentlyUsed: true,
    status: "current",
  },
  {
    id: "backblaze-recommendation",
    slug: "backblaze-recommendation",
    title: "Backblaze: Unlimited Cloud Backup for Your PC",
    excerpt: "Backblaze offers unlimited cloud backup for just $7/month. It's my go-to recommendation for simple, reliable computer backups.",
    content: "# Backblaze\n\n## Why I recommend it\n\nBackblaze is my go-to recommendation for personal computer backup...",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.5,
    productName: "Backblaze Cloud Backup",
    productUrl: "https://www.backblaze.com/",
    affiliateUrl: "https://www.backblaze.com/cloud-backup.html?af=example",
    pros: [
      "Truly unlimited backup",
      "Simple pricing",
      "Easy to use interface",
      "Restore by mail option",
    ],
    cons: [
      "Limited to one computer per license",
      "No NAS support on personal plan",
      "30-day version history by default"
    ],
    verdict: "Backblaze is my go-to recommendation for simple, reliable computer backups.",
    tags: ["backup", "cloud", "storage"],
    category: "Backup Services",
    publishedAt: "2024-01-15",
    updatedAt: "2024-03-14",
    relatedRecommendations: ["arq-backup-review"],
    isRecommended: true,
    isCurrentlyUsed: true,
    status: "current",
  },
  {
    id: "arq-backup-review",
    slug: "arq-backup-review",
    title: "Arq Backup: Powerful, Customizable Backup for Mac and Windows",
    excerpt: "Arq Backup gives you complete control over your backup strategy with a one-time payment model and excellent encryption.",
    content: "# Arq Backup\n\n## Why I recommend it\n\nArq Backup is a powerful alternative to subscription-based backup services...",
    coverImage: "/placeholder.svg?height=600&width=1200",
    rating: 4.2,
    productName: "Arq Backup",
    productUrl: "https://www.arqbackup.com/",
    affiliateUrl: "https://www.arqbackup.com/?ref=example",
    pros: [
      "One-time purchase (no subscription)",
      "Highly customizable backup settings",
      "Strong encryption",
      "Support for many cloud storage providers",
    ],
    cons: [
      "More complex interface",
      "Higher upfront cost",
      "Requires separate storage purchase",
    ],
    verdict: "Arq is perfect for technical users who want complete control over how, when and where their backups are stored.",
    tags: ["backup", "software", "security"],
    category: "Software",
    publishedAt: "2024-01-20",
    updatedAt: "2024-03-15",
    relatedRecommendations: ["backblaze-cloud-backup-review", "backblaze-recommendation"],
    isRecommended: true,
    isCurrentlyUsed: false,
    status: "previous",
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

