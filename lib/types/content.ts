// Common types for content organization

export type Tag = {
  name: string
  slug: string
}

export type RecommendationStatus =
  | "current" // Currently Used
  | "previous" // Previously Used
  | "heard" // Heard Good Things, Never Used

export type Recommendation = {
  id: string
  name: string
  shortDescription: string
  description: string
  pros?: string[]
  cons?: string[]
  url?: string
  affiliateUrl?: string // For affiliate links
  logo?: string
  tags: string[]
  category: string
  updatedAt: string // ISO date string
  status: RecommendationStatus
  featured?: boolean
  price?: {
    value: number
    currency: string
    period?: "one-time" | "monthly" | "yearly"
  }
  relatedRecommendations?: string[] // IDs of related recommendations
}

export type Review = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  rating: number // 1-5 scale
  productName: string
  productUrl?: string
  affiliateUrl?: string
  pros: string[]
  cons: string[]
  verdict: string
  tags: string[]
  category: string
  publishedAt: string
  updatedAt: string
  relatedRecommendations?: string[] // IDs of related recommendations
  isRecommended?: boolean // Whether I recommend this product
  isCurrentlyUsed?: boolean // Whether I'm currently using this product
  status?: RecommendationStatus // Current, Previous, or Heard
}

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  excerpt: string
  coverImage: string
  posts: string[] // Array of post slugs in order
  tags: string[]
  category: string
  publishedAt: string
  updatedAt: string
  status: "ongoing" | "completed" // Whether the project is still being updated
  lastPostDate: string // Date of the most recent post
}

export type Bookmark = {
  id: string
  slug?: string
  title: string
  url: string
  excerpt: string
  category: string
  tags: string[]
  bookmarkType: "tool" | "article" | "video" | "library" | "resource" | "other"
  screenshot?: string
  publishedAt: string
  updatedAt: string
  featured?: boolean
  content?: string
  isDraft?: boolean
}

