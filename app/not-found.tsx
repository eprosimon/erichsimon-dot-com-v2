import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-6 mt-2 text-xl">Page not found</p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

