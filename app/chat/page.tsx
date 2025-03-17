import type { Metadata } from "next"
import Link from "next/link"
import { Bot, MessageSquare, Construction, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Chat | Erich Simon",
  description: "Chat with my content using AI - Coming Soon",
  openGraph: {
    title: "Chat | Erich Simon",
    description: "Chat with my content using AI - Coming Soon",
    type: "website",
    url: "https://erichsimon.com/chat",
  },
}

export default function ChatPage() {
  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Chat with My Content</h1>
          <Construction className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-lg text-muted-foreground">
          Coming Soon: Ask questions about my blog posts, projects, and recommendations
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              What is this?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This upcoming feature will allow you to chat with an AI assistant that has been trained on all the content
              from my blog, projects, reviews, and recommendations. You'll be able to ask questions and get accurate
              answers based on what I've written.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              How will it work?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Using Retrieval-Augmented Generation (RAG), the AI will search through my content to find relevant
              information and provide accurate, up-to-date answers based on what I've written. It's like having a
              conversation with my blog!
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 shadow-2xs">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Chat Interface Coming Soon</h2>

        <p className="text-center text-muted-foreground mb-8">
          I'm currently building this feature. When it's ready, you'll be able to ask questions about any topic I've
          written about and get helpful, accurate responses.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground italic">"What backup solution do you recommend for Mac users?"</p>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-muted-foreground italic">
              "Based on Erich's recommendations, he currently uses Backblaze for Mac backups because of its unlimited
              storage, simple pricing, and reliable performance..."
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">In the meantime, you can browse my content directly:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-1">
              Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects" className="flex items-center gap-1">
              Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/recommendations" className="flex items-center gap-1">
              Recommendations <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

