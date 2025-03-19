"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, LinkIcon, Image as ImageIcon, Code, Heading1, Heading2, Heading3 } from "lucide-react"

interface MarkdownEditorProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ id, value, onChange }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write")

  // Replace the insertMarkdown function with this version that avoids state updates during render

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newValue = beforeText + prefix + selectedText + suffix + afterText

    // Only update if the value has changed
    if (newValue !== value) {
      onChange(newValue)
    }

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length + selectedText.length + suffix.length
      textarea.selectionEnd = start + prefix.length + selectedText.length + suffix.length
    }, 0)
  }

  const handleBold = () => insertMarkdown("**", "**")
  const handleItalic = () => insertMarkdown("*", "*")
  const handleUnorderedList = () => insertMarkdown("\n- ")
  const handleOrderedList = () => insertMarkdown("\n1. ")
  const handleLink = () => insertMarkdown("[", "](url)")
  const handleImage = () => insertMarkdown("![alt text](", ")")
  const handleCode = () => insertMarkdown("```\n", "\n```")
  const handleH1 = () => insertMarkdown("# ")
  const handleH2 = () => insertMarkdown("## ")
  const handleH3 = () => insertMarkdown("### ")

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" value={mode} onValueChange={(value) => setMode(value as "write" | "preview")}>
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleH1} title="Heading 1">
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleH2} title="Heading 2">
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleH3} title="Heading 3">
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleBold} title="Bold">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleItalic} title="Italic">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleUnorderedList} title="Bullet List">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleOrderedList} title="Numbered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLink} title="Link">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleImage} title="Image">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCode} title="Code Block">
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content in Markdown..."
            className="min-h-[300px] border-0 rounded-none focus-visible:ring-0 resize-y"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 prose dark:prose-invert max-w-none">
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
          ) : (
            <p className="text-muted-foreground">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
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

