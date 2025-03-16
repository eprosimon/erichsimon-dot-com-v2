// Direct implementation of Cloudflare AI API
export async function callCloudflareAI(messages: any[], stream = false) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN
  const modelId = "@cf/meta/llama-2-7b-chat-int8" // or "@cf/meta/llama-3-8b-instruct"

  if (!accountId || !apiToken) {
    throw new Error("Cloudflare environment variables are not properly configured")
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log("Calling Cloudflare AI directly:", {
      modelId,
      messageCount: messages.length,
      streaming: stream,
    })
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${modelId}`

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        messages,
        stream,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })
  } catch (error) {
    console.error("Network error when calling Cloudflare AI:", error)
    throw new Error(`Network error when calling Cloudflare AI: ${error.message}`)
  }
  if (!response.ok) {
    const errorText = await response.text()
    console.error("Cloudflare AI API error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    })
    throw new Error(`Cloudflare AI API error: ${response.status} ${response.statusText}\n${errorText}`)
  }

  if (stream) {
    return response
  } else {
    const result = await response.json()
    return result
  }
}

// Function to check if Cloudflare environment variables are set
export function checkCloudflareEnv() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  const isConfigured = !!accountId && !!apiToken

  console.log("Cloudflare environment check: " + (isConfigured ? "✓ Configured" : "✗ Missing configuration"))

  return {
    isConfigured,
    hasAccountId: !!accountId,
    hasApiToken: !!apiToken,
  }
}

