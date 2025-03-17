import Link from "next/link"
import { Bot, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ChatPromo() {
  return (
    <Card className="bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Bot className="h-6 w-6 text-primary" />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/70">
            Chat with My Content
          </span>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Coming Soon</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground max-w-2xl">
          Soon you'll be able to ask questions about my blog posts, projects, and recommendations using an AI assistant
          trained on my content. Get personalized insights and find exactly what you're looking for.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 p-4 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <Sparkles className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Smart Search</h3>
            <p className="text-sm text-muted-foreground mt-1">Find exactly what you need with natural language</p>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <Bot className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">AI-Powered</h3>
            <p className="text-sm text-muted-foreground mt-1">Get insights from all my content in one place</p>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <ArrowRight className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Direct Answers</h3>
            <p className="text-sm text-muted-foreground mt-1">Skip the browsing and get straight to the point</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <Link href="/chat" className="flex items-center gap-2">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

