import { NextResponse } from "next/server"
import { callCloudflareAI, checkCloudflareEnv } from "@/lib/cloudflare-ai"

export async function POST(_req: Request) {
  console.log("Testing Cloudflare AI connection")

  try {
    // Check environment variables
    const envCheck = checkCloudflareEnv()

    if (!envCheck.isConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudflare environment variables are not properly configured",
          environmentCheck: {
            isConfigured: envCheck.isConfigured,
            accountId: envCheck.hasAccountId ? "✓ Set" : "✗ Missing",
            apiToken: envCheck.hasApiToken ? "✓ Set" : "✗ Missing",
          },
        },
        { status: 500 },
      )
    }

    // Test message
    const testMessages = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "Hello, this is a test message.",
      },
    ]

    // Call Cloudflare AI directly
    try {
      console.log("Making test call to Cloudflare AI")
      const result = await callCloudflareAI(testMessages, false)

      console.log("Test call successful:", {
        result: result ? "✓ Received" : "✗ Empty",
      })

      return NextResponse.json({
        success: true,
        result,
      })
    } catch (apiError) {
      console.error("API call failed:", apiError)

      return NextResponse.json(
        {
          success: false,
          error: apiError instanceof Error ? apiError.message : "Unknown API error",
          stack: apiError instanceof Error ? apiError.stack : undefined,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Test endpoint error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

