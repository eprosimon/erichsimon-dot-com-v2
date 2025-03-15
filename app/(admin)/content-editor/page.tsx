"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Star, Package, ThumbsUp, Calendar, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentForm } from "@/components/admin/content-form"
import { ContentPreview } from "@/components/admin/content-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// This page is not indexed by search engines and is not linked from anywhere
export default function ContentEditorPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("post")
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    tags: [] as string[],
    content: "",
    project: "",
    rating: 0,
    pros: [""] as string[],
    cons: [""] as string[],
    verdict: "",
    productName: "",
    productUrl: "",
    affiliateUrl: "",
    status: "current" as "current" | "previous" | "alternative" | "budget" | "premium" | "beginner" | "advanced",
    price: {
      value: 0,
      currency: "USD",
      period: "monthly" as "monthly" | "yearly" | "one-time",
    },
    category: "",
    featured: false,
  })

  const contentTypes = [
    { id: "post", label: "Blog Post", icon: <FileText className="h-4 w-4" /> },
    { id: "review", label: "Review", icon: <Star className="h-4 w-4" /> },
    { id: "project", label: "Project", icon: <Package className="h-4 w-4" /> },
    { id: "recommendation", label: "Recommendation", icon: <ThumbsUp className="h-4 w-4" /> },
  ]

  const handleFormChange = (newData: any) => {
    // Only update state if the data has actually changed
    if (JSON.stringify(newData) !== JSON.stringify(formData)) {
      setFormData(newData)
    }
  }

  const generateMarkdown = () => {
    let frontmatter = ""
    const content = formData.content

    // Common frontmatter fields
    frontmatter += `---\n`
    frontmatter += `title: "${formData.title}"\n`
    frontmatter += `date: "${formData.date}"\n`
    frontmatter += `excerpt: "${formData.excerpt}"\n`

    if (formData.tags.length > 0) {
      frontmatter += `tags: [${formData.tags.map((tag) => `"${tag}"`).join(", ")}]\n`
    }

    // Content type specific frontmatter
    if (activeTab === "post") {
      if (formData.project) {
        frontmatter += `project: "${formData.project}"\n`
      }
    } else if (activeTab === "review") {
      frontmatter += `rating: ${formData.rating}\n`
      frontmatter += `productName: "${formData.productName}"\n`

      if (formData.productUrl) {
        frontmatter += `productUrl: "${formData.productUrl}"\n`
      }

      if (formData.affiliateUrl) {
        frontmatter += `affiliateUrl: "${formData.affiliateUrl}"\n`
      }

      if (formData.pros.length > 0 && formData.pros[0] !== "") {
        frontmatter += `pros: [${formData.pros.map((pro) => `"${pro}"`).join(", ")}]\n`
      }

      if (formData.cons.length > 0 && formData.cons[0] !== "") {
        frontmatter += `cons: [${formData.cons.map((con) => `"${con}"`).join(", ")}]\n`
      }

      if (formData.verdict) {
        frontmatter += `verdict: "${formData.verdict}"\n`
      }

      if (formData.category) {
        frontmatter += `category: "${formData.category}"\n`
      }
    } else if (activeTab === "recommendation") {
      frontmatter += `status: "${formData.status}"\n`
      frontmatter += `category: "${formData.category}"\n`
      frontmatter += `featured: ${formData.featured}\n`

      if (formData.productUrl) {
        frontmatter += `url: "${formData.productUrl}"\n`
      }

      if (formData.affiliateUrl) {
        frontmatter += `affiliateUrl: "${formData.affiliateUrl}"\n`
      }

      if (formData.pros.length > 0 && formData.pros[0] !== "") {
        frontmatter += `pros: [${formData.pros.map((pro) => `"${pro}"`).join(", ")}]\n`
      }

      if (formData.cons.length > 0 && formData.cons[0] !== "") {
        frontmatter += `cons: [${formData.cons.map((con) => `"${con}"`).join(", ")}]\n`
      }

      frontmatter += `price:\n`
      frontmatter += `  value: ${formData.price.value}\n`
      frontmatter += `  currency: "${formData.price.currency}"\n`
      frontmatter += `  period: "${formData.price.period}"\n`
    } else if (activeTab === "project") {
      frontmatter += `category: "${formData.category}"\n`
      frontmatter += `status: "${formData.status === "current" ? "ongoing" : "completed"}"\n`
      frontmatter += `lastPostDate: "${formData.date}"\n`
    }

    frontmatter += `---\n\n`

    return frontmatter + content
  }

  const copyToClipboard = () => {
    const markdown = generateMarkdown()
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        alert("Markdown copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const downloadMarkdown = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formData.slug || "content"}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container py-6 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Content Editor</h1>
        <p className="text-lg text-muted-foreground">Create and format content for your site</p>
      </div>

      <Alert className="mb-6">
        <AlertTitle>This page is not public</AlertTitle>
        <AlertDescription>
          This content editor is for administrative use only and is not indexed by search engines.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="post" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {contentTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-1">
              {type.icon}
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {contentTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {type.icon}
                  Create {type.label}
                </CardTitle>
                <CardDescription>Fill in the details below to create a new {type.label.toLowerCase()}.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="edit"
                  value={previewMode}
                  onValueChange={(value) => setPreviewMode(value as "edit" | "preview")}
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="edit">
                    <ContentForm type={type.id} data={formData} onChange={handleFormChange} />
                  </TabsContent>

                  <TabsContent value="preview">
                    <ContentPreview type={type.id} data={formData} markdown={generateMarkdown()} />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Markdown
                  </Button>
                  <Button onClick={downloadMarkdown}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

