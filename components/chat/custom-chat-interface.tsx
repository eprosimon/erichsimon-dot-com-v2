"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, Zap } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor"

// Define message type
type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export function CustomChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [testStatus, setTestStatus] = useState<{
    loading: boolean
    error?: string
    details?: any
    rawResponse?: string
  }>({ loading: false })

  // Generate a unique ID for messages
  const generateId = () => Math.random().toString(36).substring(2, 10)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message to the chat
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Call the chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
      })

      console.log("Chat API response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} ${response.statusText}\n${errorText}`)
      }

      const data = await response.json()

      // Add assistant message to the chat
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.content || data.text || "No response content",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error sending message:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setTestStatus({ loading: true })
    try {
      console.log("Testing connection to chat API")
      const response = await fetch("/api/chat/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      console.log("Test response received:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        contentType: response.headers.get("Content-Type"),
      })

      // Get the raw response text
      const responseText = await response.text()
      console.log("Raw response text:", responseText)

      // Check if the response is JSON or plain text
      const contentType = response.headers.get("Content-Type") || ""
      const isJson = contentType.includes("application/json")

      if (isJson) {
        // Only try to parse as JSON if the content type is application/json
        try {
          const data = JSON.parse(responseText)

          if (!response.ok) {
            setTestStatus({
              loading: false,
              error: data?.error || `Server error (${response.status})`,
              details: data,
              rawResponse: responseText,
            })
          } else {
            setTestStatus({
              loading: false,
              details: data,
            })
          }
        } catch (jsonError) {
          // This shouldn't happen if the content type is application/json
          console.error("Failed to parse JSON response:", jsonError)
          setTestStatus({
            loading: false,
            error: `Invalid JSON response (${response.status})`,
            rawResponse: responseText,
          })
        }
      } else {
        // Handle plain text response
        if (!response.ok) {
          setTestStatus({
            loading: false,
            error: `Server error (${response.status}): ${responseText}`,
            rawResponse: responseText,
          })
        } else {
          setTestStatus({
            loading: false,
            details: { message: "Received plain text response", text: responseText },
            rawResponse: responseText,
          })
        }
      }
    } catch (error) {
      console.error("Connection test error:", error)
      setTestStatus({
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        rawResponse: error instanceof Error ? error.stack : String(error),
      })
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4 gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={testConnection}
          disabled={testStatus.loading}
          className="flex items-center gap-2"
        >
          {testStatus.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Test Connection
        </Button>
      </div>

      {(testStatus.error || testStatus.details) && (
        <Alert className={`mb-4 ${testStatus.error ? "bg-destructive/10 text-destructive" : "bg-primary/10"}`}>
          <AlertDescription>
            {testStatus.error ? (
              <>
                <strong>Error:</strong> {testStatus.error}
                {testStatus.rawResponse && (
                  <div className="mt-2">
                    <strong>Raw Response:</strong>
                    <pre className="text-xs overflow-auto max-h-40 mt-1 p-2 bg-muted rounded">
                      {testStatus.rawResponse}
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <>
                <strong>Connection successful!</strong>
                {testStatus.rawResponse ? (
                  <div className="mt-2">
                    <strong>Response:</strong>
                    <pre className="mt-1 text-xs overflow-auto max-h-40 p-2 bg-muted rounded">
                      {testStatus.rawResponse}
                    </pre>
                  </div>
                ) : (
                  <pre className="mt-2 text-xs overflow-auto max-h-40">
                    {JSON.stringify(testStatus.details, null, 2)}
                  </pre>
                )}
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-lg mb-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-md space-y-2">
              <p className="text-lg font-medium">Welcome to the Chat!</p>
              <p className="text-muted-foreground">
                This is a development version using Cloudflare AI. Ask me anything!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        )}

        {isLoading && (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Processing response...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
            <p className="text-sm font-medium">Error: {error.message}</p>
            <p className="text-xs mt-1">Try refreshing the page or checking your connection.</p>
          </div>
        )}

        <ChatScrollAnchor trackVisibility={isLoading} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              const form = e.currentTarget.form
              if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
          }}
          placeholder="Type your message..."
          className="min-h-[60px] resize-none"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || input.trim() === ""}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}

