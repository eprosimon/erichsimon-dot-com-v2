import { NextResponse } from "next/server"
import { callCloudflareAI, checkCloudflareEnv } from "@/lib/cloudflare-ai"

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  console.log("Chat API request received")

  try {
    // Parse the request body
    let messages
    try {
      const body = await req.json()
      messages = body.messages
      console.log("Request parsed successfully:", {
        messageCount: messages?.length || 0,
        lastMessage: messages?.length > 0 ? messages[messages.length - 1]?.content?.substring(0, 50) + "..." : "None",
      })
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error",
        },
        { status: 400 },
      )
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("Invalid messages format:", { messages })
      return NextResponse.json(
        {
          error: "Invalid messages format",
          details: "Messages must be a non-empty array",
        },
        { status: 400 },
      )
    }

    // Check if Cloudflare is configured
    const envCheck = checkCloudflareEnv()

    if (!envCheck.isConfigured) {
      console.error("Cloudflare not configured")
      return NextResponse.json(
        {
          error: "Cloudflare AI is not properly configured",
          details: "Please check your environment variables",
        },
        { status: 500 },
      )
    }

    // Call Cloudflare AI directly
    try {
      console.log("Calling Cloudflare AI for chat response")
      const result = await callCloudflareAI(messages, false)
      console.log("Cloudflare AI response received:", {
        success: result?.success,
        hasResponse: !!result?.result?.response,
        responseLength: result?.result?.response?.length || 0,
      })

      // Get the response content
      const responseContent = result.result?.response || "No response from Cloudflare AI"

      // Return a simple JSON response instead of streaming
      // This is more reliable and should work with useChat
      return NextResponse.json({
        role: "assistant",
        content: responseContent,
      })
    } catch (apiError) {
      console.error("API call failed:", apiError)

      return NextResponse.json(
        {
          error: "Failed to call Cloudflare AI",
          details: apiError instanceof Error ? apiError.message : "Unknown API error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    // Catch-all error handler
    console.error("Unhandled chat API error:", {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined,
    })

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
        type: error instanceof Error ? error.constructor.name : typeof error,
      },
      { status: 500 },
    )
  }
}

