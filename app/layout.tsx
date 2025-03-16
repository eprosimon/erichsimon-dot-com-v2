import './globals.css'
import type React from "react"
import ClientLayout from "./client"

export const metadata = {
  title: "Erich Simon",
  description: "Personal blog and thoughts",
  generator: 'v0.dev',
  metadataBase: new URL('https://erichsimon.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}