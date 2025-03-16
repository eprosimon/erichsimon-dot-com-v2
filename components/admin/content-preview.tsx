"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useMemo } from "react"

interface ContentPreviewProps {
  type: string
  data: any
  markdown: string
}

export function ContentPreview({ type, data, markdown }: ContentPreviewProps) {
  // Split the markdown into frontmatter and content
  const parts = useMemo(() => markdown.split("---\n\n"), [markdown])
  const frontmatter = useMemo(() => parts[0].replace("---\n", ""), [parts])
  const content = useMemo(() => parts[1] || "", [parts])

  // Memoize the rendered HTML to prevent unnecessary re-renders
  const renderedContent = useMemo(() => renderMarkdown(content), [content])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Frontmatter</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">{frontmatter}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Content Preview</h3>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Raw Markdown</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">{markdown}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

// Simple markdown renderer for preview
// In a real app, you'd use a proper markdown library like marked or remark
function renderMarkdown(markdown: string): string {
  // This is a very basic implementation
  const html = markdown
    // Headers
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold and italic
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    // Links and images
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\s*\n\*/gim, "<ul>\n*")
    .replace(/^(\*.+)\s*\n([^*])/gim, "$1\n</ul>\n\n$2")
    .replace(/^\*(.+)/gim, "<li>$1</li>")
    .replace(/^\s*\n\d\./gim, "<ol>\n1.")
    .replace(/^(\d\..+)\s*\n([^\d.])/gim, "$1\n</ol>\n\n$2")
    .replace(/^\d\.(.+)/gim, "<li>$1</li>")
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
    // Paragraphs
    .replace(/^\s*(\n)?(.+)/gim, (m) => (/<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : "<p>" + m + "</p>"))
    // Line breaks
    .replace(/\n/gim, "<br />")

  return html
}

