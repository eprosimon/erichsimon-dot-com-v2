// This file will contain utilities for Retrieval Augmented Generation
// It's a placeholder for now, but will be expanded as the RAG feature is developed

// Types for RAG
export interface Document {
  id: string
  content: string
  metadata: {
    title?: string
    url?: string
    date?: string
    tags?: string[]
    type?: "blog" | "project" | "review" | "recommendation"
    [key: string]: any
  }
}

export interface EmbeddingVector {
  id: string
  values: number[]
  metadata: Document["metadata"]
}

// Placeholder function for future implementation
export async function generateEmbeddings(text: string): Promise<number[]> {
  // This will be implemented when we add the embedding functionality
  console.log("Generating embeddings for:", text.substring(0, 50) + "...")
  return []
}

// Placeholder function for future implementation
export async function similaritySearch(query: string, documents: Document[]): Promise<Document[]> {
  // This will be implemented when we add the vector search functionality
  console.log("Searching for:", query)
  return documents
}

// Helper function to create a system prompt for RAG
export function createRagSystemPrompt(relevantDocuments: Document[]): string {
  if (relevantDocuments.length === 0) {
    return `You are a helpful AI assistant for Erich Simon's website. Answer the user's questions based on your knowledge.`
  }

  const contextText = relevantDocuments
    .map((doc) => {
      const metadata = doc.metadata
      const title = metadata.title ? `Title: ${metadata.title}` : ""
      const type = metadata.type ? `Type: ${metadata.type}` : ""
      const date = metadata.date ? `Date: ${metadata.date}` : ""

      return `${title}\n${type}\n${date}\n\n${doc.content}\n\n---\n\n`
    })
    .join("")

  return `You are a helpful AI assistant for Erich Simon's website. Answer the user's questions based on the following information from the website:

---

${contextText}

---

If the information provided doesn't answer the user's question, you can use your general knowledge but make it clear that the information is not from Erich's website.`
}

// Function to chunk text for embedding
export function chunkText(text: string, maxChunkSize = 1000): string[] {
  const chunks: string[] = []
  let currentChunk = ""

  // Split by paragraphs first
  const paragraphs = text.split(/\n\s*\n/)

  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed max size, save current chunk and start a new one
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = ""
    }

    // If paragraph itself is too long, split it into sentences
    if (paragraph.length > maxChunkSize) {
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph]

      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
          chunks.push(currentChunk.trim())
          currentChunk = ""
        }

        currentChunk += sentence + " "
      }
    } else {
      currentChunk += paragraph + "\n\n"
    }
  }

  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

// Placeholder for future vector search function
export async function searchSimilarContent(query: string, topK = 3) {
  // This will be implemented later when we have vector embeddings
  console.log("Searching for content similar to:", query)
  return []
}

// Placeholder for RAG prompt construction
export function constructRAGPrompt(query: string, relevantContent: string[]) {
  return `
I want you to answer the user's question based on the following content from my blog:

${relevantContent.join("\n\n")}

User question: ${query}

Please provide a helpful and accurate response based on the content above. If the content doesn't contain information to answer the question, please say so and provide general information if possible.
`
}

