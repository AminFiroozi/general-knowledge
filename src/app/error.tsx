"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="font-serif text-2xl text-text-primary font-bold mb-2">Something went wrong</h1>
        <p className="text-text-muted font-sans text-sm mb-6">An unexpected error occurred.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-gold text-bg font-sans font-medium hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-border text-text-muted font-sans font-medium hover:border-border-focus transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
