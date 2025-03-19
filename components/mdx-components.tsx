"use client"

import Link from "next/link"
import Image from "next/image"
import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import TaskListItem from "./TaskListItem"
import CopyButton from "./CopyButton"
import { RecommendationCard } from "./recommendation-card"

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  [key: string]: unknown;
}

function CustomLink({ href, children, ...props }: CustomLinkProps) {
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

interface ResponsiveImageProps {
  src: string;
  alt?: string;
}

function ResponsiveImage({ src, alt = "" }: ResponsiveImageProps) {
  return <Image src={src || "/placeholder.svg"} alt={alt} width={700} height={475} className="rounded-lg my-4" />
}

interface CustomListProps {
  children: ReactNode;
  ordered?: boolean;
  [key: string]: unknown;
}

function CustomList({ children, ordered, ...props }: CustomListProps) {
  // Safely check for task-list items with proper type checking
  const hasTaskListItem = React.Children.toArray(children).some(
    (child) => {
      if (!React.isValidElement(child)) return false;

      // Using type assertion after validation
      const childProps = child.props as { className?: string };
      return typeof childProps.className === 'string' && childProps.className.includes("task-list-item");
    }
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

interface CustomMDXProps {
  content: string;
}

export function CustomMDX({ content }: CustomMDXProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
      components={{
        a: CustomLink as React.ComponentType<React.ComponentProps<'a'>>,
        img: ResponsiveImage as React.ComponentType<React.ComponentProps<'img'>>,
        ul: CustomList as React.ComponentType<React.ComponentProps<'ul'>>,
        ol: CustomList as React.ComponentType<React.ComponentProps<'ol'>>,
        li: (props: React.ComponentProps<'li'> & { checked?: boolean }) => {
          const { className, checked, children } = props
          if (className?.includes("task-list-item")) {
            return <TaskListItem isChecked={checked}>{children}</TaskListItem>
          }
          return <li {...props}>{children}</li>
        },
        code: (props: React.ComponentProps<'code'> & { inline?: boolean }) => {
          const { className, inline, children } = props
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
              <SyntaxHighlighter
                style={dracula}
                language={match ? match[1] : "text"}
                PreTag="div"
                className={props.className}
              >
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

