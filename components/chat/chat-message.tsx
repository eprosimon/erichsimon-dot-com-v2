import type { Message } from "ai"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn("flex items-start gap-4 rounded-lg p-4", message.role === "user" ? "bg-muted/50" : "bg-primary/5")}
    >
      <div
        className={cn(
          "rounded-full p-2 flex items-center justify-center",
          message.role === "user" ? "bg-primary/10" : "bg-primary/20",
        )}
      >
        {message.role === "user" ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-primary" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">{message.role === "user" ? "You" : "AI Assistant"}</div>
        <div className="prose prose-sm dark:prose-invert">{message.content}</div>
      </div>
    </div>
  )
}

