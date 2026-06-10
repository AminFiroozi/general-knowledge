"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="font-serif text-[10rem] font-black leading-none text-gold opacity-10">
          404
        </div>
        <h1 className="font-serif text-3xl text-text-primary font-bold mb-2">Page not found</h1>
        <p className="text-text-muted font-sans text-sm mb-8">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-bg font-sans font-medium hover:opacity-90 transition-opacity"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
