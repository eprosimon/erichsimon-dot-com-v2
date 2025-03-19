import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Review, Project, Recommendation, Bookmark } from "./types/content"

// Define content directories
const CONTENT_DIR = path.join(process.cwd(), "content")
const REVIEWS_DIR = path.join(CONTENT_DIR, "reviews")
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects")
const RECOMMENDATIONS_DIR = path.join(CONTENT_DIR, "recommendations")
const BOOKMARKS_DIR = path.join(CONTENT_DIR, "bookmarks")

// Ensure content directories exist
const ensureDirectoriesExist = () => {
    const dirs = [CONTENT_DIR, REVIEWS_DIR, PROJECTS_DIR, RECOMMENDATIONS_DIR, BOOKMARKS_DIR]

    for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
            if (process.env.NODE_ENV !== 'production') {
                console.log(`Created directory: ${path.relative(process.cwd(), dir)}`)
            }
        }
    }
}

// Helper to determine if we should include draft content
const shouldIncludeDrafts = () => {
    return process.env.NEXT_PUBLIC_INCLUDE_DRAFTS === 'true' || process.env.INCLUDE_DRAFTS === 'true'
}

// Generic function to get markdown files from a directory
function getMarkdownFiles(directory: string, includeDrafts: boolean = false): string[] {
    if (!fs.existsSync(directory)) {
        return []
    }

    const files = fs.readdirSync(directory)
    const mdxFiles = files.filter(file => {
        // Include only .md or .mdx files
        // If drafts are requested, include .draft.md and .draft.mdx files
        // Otherwise, exclude draft files
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
            if (!includeDrafts && (file.endsWith('.draft.md') || file.endsWith('.draft.mdx'))) {
                return false
            }
            return true
        }
        return false
    })

    return mdxFiles
}

// Parse file with frontmatter
function parseFile<T>(filePath: string, fileName: string): T | null {
    try {
        if (!fs.existsSync(filePath)) {
            return null
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { content, data } = matter(fileContent)

        // Extract the slug from the filename
        const slug = fileName
            .replace(/\.draft\.(md|mdx)$/, '') // Remove draft marker and extension for draft files
            .replace(/\.(md|mdx)$/, '')        // Remove extension for regular files

        // Check if this is a draft file
        const isDraft = fileName.includes('.draft.')

        return {
            slug,
            content,
            isDraft,
            ...data
        } as unknown as T
    } catch (error) {
        console.error(`Error parsing file ${filePath}:`, error)
        return null
    }
}

// Functions to get all content items
export function getAllReviews(): Review[] {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const files = getMarkdownFiles(REVIEWS_DIR, includeDrafts)

    return files
        .map(file => {
            const filePath = path.join(REVIEWS_DIR, file)
            return parseFile<Review>(filePath, file)
        })
        .filter((item): item is Review => item !== null)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getAllProjects(): Project[] {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const files = getMarkdownFiles(PROJECTS_DIR, includeDrafts)

    return files
        .map(file => {
            const filePath = path.join(PROJECTS_DIR, file)
            return parseFile<Project>(filePath, file)
        })
        .filter((item): item is Project => item !== null)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

// Deprecated - use getAllReviews and filter for recommended items instead
export function getAllRecommendations(): Recommendation[] {
    console.warn("getAllRecommendations is deprecated. Use getAllReviews and filter for recommended items instead.")
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const files = getMarkdownFiles(RECOMMENDATIONS_DIR, includeDrafts)

    return files
        .map(file => {
            const filePath = path.join(RECOMMENDATIONS_DIR, file)
            return parseFile<Recommendation>(filePath, file)
        })
        .filter((item): item is Recommendation => item !== null)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export function getAllBookmarks(): Bookmark[] {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const files = getMarkdownFiles(BOOKMARKS_DIR, includeDrafts)

    return files
        .map(file => {
            const filePath = path.join(BOOKMARKS_DIR, file)
            return parseFile<Bookmark>(filePath, file)
        })
        .filter((item): item is Bookmark => item !== null)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Functions to get individual content items
export function getReviewBySlug(slug: string): Review | undefined {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const allFiles = getMarkdownFiles(REVIEWS_DIR, includeDrafts)

    // First, try to find an exact match
    const matchingFile = allFiles.find(file => {
        const fileSlug = file
            .replace(/\.draft\.(md|mdx)$/, '')
            .replace(/\.(md|mdx)$/, '')
        return fileSlug === slug
    })

    if (matchingFile) {
        const filePath = path.join(REVIEWS_DIR, matchingFile)
        const review = parseFile<Review>(filePath, matchingFile)
        return review || undefined
    }

    return undefined
}

export function getProjectBySlug(slug: string): Project | undefined {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const allFiles = getMarkdownFiles(PROJECTS_DIR, includeDrafts)

    const matchingFile = allFiles.find(file => {
        const fileSlug = file
            .replace(/\.draft\.(md|mdx)$/, '')
            .replace(/\.(md|mdx)$/, '')
        return fileSlug === slug
    })

    if (matchingFile) {
        const filePath = path.join(PROJECTS_DIR, matchingFile)
        const project = parseFile<Project>(filePath, matchingFile)
        return project || undefined
    }

    return undefined
}

// Deprecated - use getReviewBySlug instead 
export function getRecommendationById(id: string): Recommendation | undefined {
    console.warn("getRecommendationById is deprecated. Use getReviewBySlug instead.")
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const allFiles = getMarkdownFiles(RECOMMENDATIONS_DIR, includeDrafts)

    const matchingFile = allFiles.find(file => {
        const fileSlug = file
            .replace(/\.draft\.(md|mdx)$/, '')
            .replace(/\.(md|mdx)$/, '')
        return fileSlug === id
    })

    if (matchingFile) {
        const filePath = path.join(RECOMMENDATIONS_DIR, matchingFile)
        const recommendation = parseFile<Recommendation>(filePath, matchingFile)
        return recommendation || undefined
    }

    return undefined
}

export function getBookmarkById(id: string): Bookmark | undefined {
    ensureDirectoriesExist()
    const includeDrafts = shouldIncludeDrafts()

    const allFiles = getMarkdownFiles(BOOKMARKS_DIR, includeDrafts)

    const matchingFile = allFiles.find(file => {
        const fileSlug = file
            .replace(/\.draft\.(md|mdx)$/, '')
            .replace(/\.(md|mdx)$/, '')
        return fileSlug === id
    })

    if (matchingFile) {
        const filePath = path.join(BOOKMARKS_DIR, matchingFile)
        const bookmark = parseFile<Bookmark>(filePath, matchingFile)
        return bookmark || undefined
    }

    return undefined
}

// Helper functions
export function getAllReviewCategories(): string[] {
    const reviews = getAllReviews()
    return [...new Set(reviews.map(review => review.category))]
}

export function getAllProjectCategories(): string[] {
    const projects = getAllProjects()
    return [...new Set(projects.map(project => project.category))]
}

// Deprecated - use getAllReviewCategories instead
export function getAllRecommendationCategories(): string[] {
    console.warn("getAllRecommendationCategories is deprecated. Use getAllReviewCategories instead.")
    const recommendations = getAllRecommendations()
    return [...new Set(recommendations.map(recommendation => recommendation.category))]
}

export function getAllBookmarkCategories(): string[] {
    const bookmarks = getAllBookmarks()
    return [...new Set(bookmarks.map(bookmark => bookmark.category))]
}

// Functions for filtering reviews
export function getReviewsByCategory(category: string): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.category === category)
}

export function getProjectsByCategory(category: string): Project[] {
    const projects = getAllProjects()
    return projects.filter(project => project.category === category)
}

// Deprecated - use getReviewsByCategory and filter for recommended items instead
export function getRecommendationsByCategory(category: string): Recommendation[] {
    console.warn("getRecommendationsByCategory is deprecated. Use getReviewsByCategory and filter for recommended items instead.")
    const recommendations = getAllRecommendations()
    return recommendations.filter(recommendation => recommendation.category === category)
}

export function getBookmarksByCategory(category: string): Bookmark[] {
    const bookmarks = getAllBookmarks()
    return bookmarks.filter(bookmark => bookmark.category === category)
}

export function getBookmarksByType(type: string): Bookmark[] {
    const bookmarks = getAllBookmarks()
    return bookmarks.filter(bookmark => bookmark.bookmarkType === type)
}

export function getFeaturedBookmarks(): Bookmark[] {
    const bookmarks = getAllBookmarks()
    return bookmarks.filter(bookmark => bookmark.featured)
}

export function getRelatedRecommendations(id: string): Recommendation[] {
    const recommendation = getRecommendationById(id)
    if (!recommendation || !recommendation.relatedRecommendations) {
        return []
    }

    return recommendation.relatedRecommendations
        .map((relatedId) => getRecommendationById(relatedId))
        .filter((rec): rec is Recommendation => rec !== undefined)
}

// Function to get recommended reviews
export function getRecommendedReviews(): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.isRecommended === true)
}

// Function to get currently used products
export function getCurrentlyUsedReviews(): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.isCurrentlyUsed === true || review.status === 'current')
}

// Function to get previously used products
export function getPreviouslyUsedReviews(): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.status === 'previous')
}

// Function to get heard about products
export function getHeardAboutReviews(): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.status === 'heard')
}

// Function to get featured reviews
export function getFeaturedReviews(): Review[] {
    const reviews = getAllReviews()
    return reviews.filter(review => review.isRecommended === true)
        .sort((a, b) => {
            // Prioritize currently used
            if (a.isCurrentlyUsed && !b.isCurrentlyUsed) return -1
            if (!a.isCurrentlyUsed && b.isCurrentlyUsed) return 1

            // Then sort by publish date
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        })
        .slice(0, 6) // Get top 6 featured reviews
}

// Deprecated - use functions above instead
export function getRecommendationsByStatus(status: string): Recommendation[] {
    console.warn("getRecommendationsByStatus is deprecated. Use getCurrentlyUsedReviews, getPreviouslyUsedReviews, or getHeardAboutReviews instead.")
    const recommendations = getAllRecommendations()
    return recommendations.filter(recommendation => recommendation.status === status)
}

// Deprecated - use getCurrentlyUsedReviews instead
export function getCurrentRecommendations(): Recommendation[] {
    console.warn("getCurrentRecommendations is deprecated. Use getCurrentlyUsedReviews instead.")
    return getRecommendationsByStatus("current")
}

// Deprecated - use getFeaturedReviews instead
export function getFeaturedRecommendations(): Recommendation[] {
    console.warn("getFeaturedRecommendations is deprecated. Use getFeaturedReviews instead.")
    const recommendations = getAllRecommendations()
    return recommendations
        .filter(recommendation => recommendation.featured)
        .sort((a, b) => {
            // Sort featured recommendations by status first (current > previous > heard)
            if (a.status === "current" && b.status !== "current") return -1
            if (a.status !== "current" && b.status === "current") return 1
            if (a.status === "previous" && b.status === "heard") return -1
            if (a.status === "heard" && b.status === "previous") return 1
            return 0
        })
        .slice(0, 6) // Get top 6 featured recommendations
} 