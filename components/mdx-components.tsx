"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import TaskListItem from "./TaskListItem"
import CopyButton from "./CopyButton"
import { RecommendationCard } from "./recommendation-card"

function CustomLink({ href, children, ...props }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

function ResponsiveImage({ src, alt }) {
  return <Image src={src || "/placeholder.svg"} alt={alt || ""} width={700} height={475} className="rounded-lg my-4" />
}

function CustomList({ children, ordered, ...props }) {
  const hasTaskListItem = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.props.className?.includes("task-list-item"),
  )

  if (hasTaskListItem) {
    return (
      <ul className="task-list" {...props}>
        {children}
      </ul>
    )
  }

  return ordered ? <ol {...props}>{children}</ol> : <ul {...props}>{children}</ul>
}

// Custom components for MDX
const components = {
  RecommendationCard: RecommendationCard,
}

export function CustomMDX({ content }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
      components={{
        a: CustomLink,
        img: ResponsiveImage,
        ul: CustomList,
        ol: CustomList,
        li: ({ className, checked, children, ...props }) => {
          if (className?.includes("task-list-item")) {
            return <TaskListItem isChecked={checked}>{children}</TaskListItem>
          }
          return <li {...props}>{children}</li>
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <div className="relative">
              <SyntaxHighlighter style={dracula} language={match ? match[1] : "text"} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
              <CopyButton content={String(children)} />
            </div>
          )
        },
        // Add custom components
        ...components,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

