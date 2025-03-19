import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Filter, Bookmark as BookmarkIcon } from "lucide-react"
import { getAllBookmarks, getAllBookmarkCategories, getBookmarksByCategory } from "@/lib/content"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Bookmarks | Erich Simon",
    description: "Useful tools, articles, and resources I've bookmarked",
    openGraph: {
        title: "Bookmarks | Erich Simon",
        description: "Useful tools, articles, and resources I've bookmarked",
        type: "website",
        url: "https://erichsimon.com/bookmarks",
    },
}

export default async function BookmarksPage({
    searchParams,
}: {
    searchParams?: Promise<{
        category?: string;
    }>
}) {
    // Properly await searchParams before accessing properties
    const params = await Promise.resolve(searchParams || Promise.resolve({
        category: undefined
    }));
    const categoryFilter = params.category || "";

    // Get all bookmarks or filter by category
    const bookmarks = categoryFilter
        ? getBookmarksByCategory(categoryFilter)
        : getAllBookmarks();

    const categories = getAllBookmarkCategories()

    return (
        <div className="container py-6 md:py-16">
            <div className="flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    <span className="inline-block relative">
                        Bookmarks
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
                    </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                    Useful tools, articles, and resources I've bookmarked
                </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 animate-fade-in-up animation-delay-2">
                <Button
                    variant="outline"
                    className={!categoryFilter ? "bg-primary/5 border-primary/20" : "hover:bg-primary/5"}
                    asChild
                >
                    <Link href="/bookmarks">
                        <Filter className="mr-2 h-4 w-4" />
                        All Bookmarks
                    </Link>
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="outline"
                        className={categoryFilter === category ? "bg-primary/5 border-primary/20" : "hover:bg-primary/5"}
                        asChild
                    >
                        <Link href={`/bookmarks?category=${encodeURIComponent(category)}`}>
                            {category}
                        </Link>
                    </Button>
                ))}
            </div>

            {categoryFilter && (
                <div className="mt-6 animate-fade-in-up">
                    <h2 className="text-xl font-medium">
                        Category: <span className="text-primary">{categoryFilter}</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Showing {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} in this category
                    </p>
                </div>
            )}

            <Separator className="my-8" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bookmarks.map((bookmark, index) => (
                    <Card
                        key={bookmark.id}
                        className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 animate-fade-in-up"
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                        <div className="aspect-video relative">
                            <Image
                                src={bookmark.screenshot || "/placeholder.svg"}
                                alt={bookmark.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="absolute top-2 right-2 z-10">
                                <Badge className="bg-primary text-primary-foreground">
                                    {bookmark.bookmarkType}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="line-clamp-2 group flex items-start">
                                <BookmarkIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary" />
                                <Link
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    {bookmark.title}
                                    <ExternalLink className="inline-block ml-1 h-3 w-3" />
                                </Link>
                            </CardTitle>
                            <CardDescription>{bookmark.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="grow">
                            <p className="line-clamp-3 text-sm">{bookmark.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
                            <time dateTime={bookmark.publishedAt} className="text-xs text-muted-foreground">
                                {new Date(bookmark.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </time>
                            <div className="ml-auto flex flex-wrap gap-2">
                                {bookmark.tags.slice(0, 2).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {bookmarks.length === 0 && (
                <div className="text-center py-12">
                    <BookmarkIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h2 className="mt-4 text-lg font-medium">No bookmarks found</h2>
                    <p className="mt-2 text-muted-foreground">
                        {categoryFilter
                            ? `No bookmarks found in the "${categoryFilter}" category.`
                            : "Check back later for bookmarks or try a different category."}
                    </p>
                </div>
            )}

            <div className="mt-16 text-center animate-fade-in-up animation-delay-10">
                <p className="text-muted-foreground mb-4">Browse bookmarks by category</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={categoryFilter === category ? "default" : "outline"}
                            className="text-sm hover:bg-primary/5 transition-colors"
                        >
                            <Link href={`/bookmarks?category=${encodeURIComponent(category)}`}>{category}</Link>
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )
} 