import type { Metadata } from "next"
import { CustomChatInterface } from "@/components/chat/custom-chat-interface"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from "lucide-react"

export const metadata: Metadata = {
  title: "Chat Dev | Erich Simon",
  description: "Development version of the chat interface",
  robots: "noindex, nofollow", // Hide from search engines
}

export default function ChatDevPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-16">
      <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/50">
        <Construction className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Development Version</AlertTitle>
        <AlertDescription>
          This is a development version of the chat interface. It's not linked from the main site and is for testing
          purposes only.
        </AlertDescription>
      </Alert>

      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Chat Development</h1>

      <div className="border rounded-lg shadow-sm p-4 md:p-6">
        <CustomChatInterface />
      </div>
    </div>
  )
}

