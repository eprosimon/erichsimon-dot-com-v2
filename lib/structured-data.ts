import type { Post } from "./types"
import type { Review } from "./types/content"

// Generate structured data for blog posts
export function generatePostStructuredData(post: Post, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Erich Simon",
      url: "https://erichsimon.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Erich Simon",
      url: "https://erichsimon.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags?.join(", "),
  }
}

// Generate structured data for reviews
export function generateReviewStructuredData(review: Review, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: review.title,
    reviewBody: review.excerpt,
    datePublished: review.publishedAt,
    dateModified: review.updatedAt,
    author: {
      "@type": "Person",
      name: "Erich Simon",
      url: "https://erichsimon.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Erich Simon",
      url: "https://erichsimon.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
      worstRating: "1",
    },
    itemReviewed: {
      "@type": "Product",
      name: review.productName,
      url: review.productUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }
}

