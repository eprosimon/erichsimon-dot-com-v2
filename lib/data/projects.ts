import type { Project } from "../types/content"

const projects: Project[] = [
  {
    id: "get-backed-up",
    slug: "get-backed-up",
    title: "Get Backed Up: Complete Backup Strategy",
    description:
      "A comprehensive guide to setting up a robust backup system for your data, following the 3-2-1 backup strategy.",
    excerpt:
      "Learn how to protect your important data with a complete backup strategy that ensures you'll never lose your files again.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    posts: [
      "backup-strategy-basics",
      "choosing-backup-software",
      "cloud-backup-solutions",
      "local-backup-setup",
      "backup-automation",
    ],
    tags: ["backup", "data-protection", "cloud", "storage"],
    category: "Data Protection",
    publishedAt: "2024-01-01",
    updatedAt: "2024-03-14",
    status: "ongoing",
    lastPostDate: "2024-03-14",
  },
  {
    id: "homelab-setup",
    slug: "homelab-setup",
    title: "Building My Homelab",
    description:
      "Follow along as I build and evolve my homelab setup for self-hosting services, learning, and experimentation.",
    excerpt:
      "A detailed chronicle of my homelab journey, from initial hardware selection to running various self-hosted services.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    posts: [
      "homelab-hardware-guide",
      "networking-basics",
      "proxmox-setup",
      "docker-essentials",
      "self-hosted-services",
      "homelab-monitoring",
    ],
    tags: ["homelab", "server", "networking", "self-hosted"],
    category: "Homelab",
    publishedAt: "2024-02-15",
    updatedAt: "2024-03-20",
    status: "ongoing",
    lastPostDate: "2024-03-20",
  },
  {
    id: "personal-finance-basics",
    slug: "personal-finance-basics",
    title: "Personal Finance Basics",
    description: "A comprehensive guide to personal finance fundamentals, from budgeting to investing.",
    excerpt:
      "Learn the essentials of personal finance with this step-by-step guide covering budgeting, saving, debt management, and investing basics.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    posts: [
      "budgeting-101",
      "emergency-fund-guide",
      "debt-payoff-strategies",
      "investing-for-beginners",
      "retirement-planning-basics",
    ],
    tags: ["finance", "money", "investing", "budgeting"],
    category: "Personal Finance",
    publishedAt: "2024-01-01",
    updatedAt: "2024-02-28",
    status: "completed",
    lastPostDate: "2024-02-28",
  },
]

// Get all projects
export function getAllProjects(): Project[] {
  return projects
}

// Get all projects sorted by last update date (most recent first)
export function getAllProjectsSortedByUpdate(): Project[] {
  return [...projects].sort((a, b) => new Date(b.lastPostDate).getTime() - new Date(a.lastPostDate).getTime())
}

// Get a project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  return projects
    .filter((project) => project.category === category)
    .sort((a, b) => new Date(b.lastPostDate).getTime() - new Date(a.lastPostDate).getTime())
}

// Get ongoing projects
export function getOngoingProjects(): Project[] {
  return projects
    .filter((project) => project.status === "ongoing")
    .sort((a, b) => new Date(b.lastPostDate).getTime() - new Date(a.lastPostDate).getTime())
}

// Get completed projects
export function getCompletedProjects(): Project[] {
  return projects
    .filter((project) => project.status === "completed")
    .sort((a, b) => new Date(b.lastPostDate).getTime() - new Date(a.lastPostDate).getTime())
}

// Get all project categories
export function getAllProjectCategories(): string[] {
  return [...new Set(projects.map((project) => project.category))]
}

