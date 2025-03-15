"use client"

import { useState, useEffect } from "react"
import { PlusCircle, MinusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { TagInput } from "@/components/admin/tag-input"
import { MarkdownEditor } from "@/components/admin/markdown-editor"

interface ContentFormProps {
  type: string
  data: any
  onChange: (data: any) => void
}

export function ContentForm({ type, data, onChange }: ContentFormProps) {
  const [title, setTitle] = useState(data.title || "")
  const [slug, setSlug] = useState(data.slug || "")
  const [date, setDate] = useState(data.date || new Date().toISOString().split("T")[0])
  const [excerpt, setExcerpt] = useState(data.excerpt || "")
  const [tags, setTags] = useState<string[]>(data.tags || [])
  const [content, setContent] = useState(data.content || "")
  const [project, setProject] = useState(data.project || "")
  const [rating, setRating] = useState(data.rating || 0)
  const [pros, setPros] = useState<string[]>(data.pros || [""])
  const [cons, setCons] = useState<string[]>(data.cons || [""])
  const [verdict, setVerdict] = useState(data.verdict || "")
  const [productName, setProductName] = useState(data.productName || "")
  const [productUrl, setProductUrl] = useState(data.productUrl || "")
  const [affiliateUrl, setAffiliateUrl] = useState(data.affiliateUrl || "")
  const [status, setStatus] = useState(data.status || "current")
  const [price, setPrice] = useState(data.price || { value: 0, currency: "USD", period: "monthly" })
  const [category, setCategory] = useState(data.category || "")
  const [featured, setFeatured] = useState(data.featured || false)

  // Sample projects for the dropdown
  const projects = [
    { id: "get-backed-up", name: "Get Backed Up" },
    { id: "homelab-setup", name: "Homelab Setup" },
    { id: "personal-finance", name: "Personal Finance" },
  ]

  // Sample categories for the dropdown
  const categories = [
    "Technology",
    "Software",
    "Hardware",
    "Productivity",
    "Finance",
    "Backup Services",
    "Hosting Services",
    "Homelab",
  ]

  // Generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      )
    }
  }, [title, slug])

  // Update parent component when form data changes
  useEffect(() => {
    const newData = {
      title,
      slug,
      date,
      excerpt,
      tags,
      content,
      project,
      rating,
      pros,
      cons,
      verdict,
      productName,
      productUrl,
      affiliateUrl,
      status,
      price,
      category,
      featured,
    }

    // Use JSON stringify comparison to prevent unnecessary updates
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      onChange(newData)
    }
  }, [
    title,
    slug,
    date,
    excerpt,
    tags,
    content,
    project,
    rating,
    pros,
    cons,
    verdict,
    productName,
    productUrl,
    affiliateUrl,
    status,
    price,
    category,
    featured,
    onChange,
    data,
  ])

  const handleProsChange = (index: number, value: string) => {
    const newPros = [...pros]
    newPros[index] = value
    setPros(newPros)
  }

  const handleConsChange = (index: number, value: string) => {
    const newCons = [...cons]
    newCons[index] = value
    setCons(newCons)
  }

  const addPro = () => {
    setPros([...pros, ""])
  }

  const removePro = (index: number) => {
    const newPros = [...pros]
    newPros.splice(index, 1)
    setPros(newPros)
  }

  const addCon = () => {
    setCons([...cons, ""])
  }

  const removeCon = (index: number) => {
    const newCons = [...cons]
    newCons.splice(index, 1)
    setCons(newCons)
  }

  return (
    <div className="space-y-6">
      {/* Common fields for all content types */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="enter-slug" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the content"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <TagInput id="tags" tags={tags} setTags={setTags} placeholder="Add tags..." />
      </div>

      {/* Blog post specific fields */}
      {type === "post" && (
        <div className="space-y-2">
          <Label htmlFor="project">Project (Optional)</Label>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a project (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Review specific fields */}
      {type === "review" && (
        <>
          <Separator />
          <h3 className="text-lg font-medium">Review Details</h3>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Name of the product being reviewed"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Affiliate URL (Optional)</Label>
              <Input
                id="affiliateUrl"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                placeholder="https://example.com/affiliate"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(Number.parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>Pros</Label>
            {pros.map((pro, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={pro}
                  onChange={(e) => handleProsChange(index, e.target.value)}
                  placeholder={`Pro ${index + 1}`}
                />
                <Button variant="ghost" size="icon" onClick={() => removePro(index)} disabled={pros.length === 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addPro} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Pro
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Cons</Label>
            {cons.map((con, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={con}
                  onChange={(e) => handleConsChange(index, e.target.value)}
                  placeholder={`Con ${index + 1}`}
                />
                <Button variant="ghost" size="icon" onClick={() => removeCon(index)} disabled={cons.length === 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addCon} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Con
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verdict">Verdict</Label>
            <Textarea
              id="verdict"
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              placeholder="Overall verdict of the review"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Recommendation specific fields */}
      {type === "recommendation" && (
        <>
          <Separator />
          <h3 className="text-lg font-medium">Recommendation Details</h3>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Name of the recommended product"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Affiliate URL (Optional)</Label>
              <Input
                id="affiliateUrl"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                placeholder="https://example.com/affiliate"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Currently Used</SelectItem>
                <SelectItem value="previous">Previously Used</SelectItem>
                <SelectItem value="heard">Heard Good Things, Never Used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Pros</Label>
            {pros.map((pro, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={pro}
                  onChange={(e) => handleProsChange(index, e.target.value)}
                  placeholder={`Pro ${index + 1}`}
                />
                <Button variant="ghost" size="icon" onClick={() => removePro(index)} disabled={pros.length === 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addPro} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Pro
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Cons</Label>
            {cons.map((con, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={con}
                  onChange={(e) => handleConsChange(index, e.target.value)}
                  placeholder={`Con ${index + 1}`}
                />
                <Button variant="ghost" size="icon" onClick={() => removeCon(index)} disabled={cons.length === 1}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addCon} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Con
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="priceValue">Price</Label>
              <Input
                id="priceValue"
                type="number"
                min="0"
                step="0.01"
                value={price.value}
                onChange={(e) => setPrice({ ...price, value: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceCurrency">Currency</Label>
              <Select value={price.currency} onValueChange={(value) => setPrice({ ...price, currency: value })}>
                <SelectTrigger id="priceCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePeriod">Period</Label>
              <Select value={price.period} onValueChange={(value: any) => setPrice({ ...price, period: value })}>
                <SelectTrigger id="pricePeriod">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
            <Label htmlFor="featured">Featured recommendation</Label>
          </div>
        </>
      )}

      {/* Project specific fields */}
      {type === "project" && (
        <>
          <Separator />
          <h3 className="text-lg font-medium">Project Details</h3>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status === "current" ? "current" : "previous"} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Ongoing</SelectItem>
                <SelectItem value="previous">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Content field for all types */}
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <MarkdownEditor id="content" value={content} onChange={setContent} />
      </div>
    </div>
  )
}

