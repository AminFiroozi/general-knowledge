"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { CATEGORIES, TOPIC_MAP } from "@/generated/index"
import { useQuizStore } from "@/store/quiz-store"
import { CategoryCard } from "@/components/topic-picker/CategoryCard"
import { shuffle } from "@/lib/shuffle"
import type { CategoryIndex } from "@/types"

export default function TopicPickerPage() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())
  const router = useRouter()
  const startQuiz = useQuizStore((s) => s.startQuiz)

  const categories: CategoryIndex[] = useMemo(
    () => Object.values(CATEGORIES).filter((c) => c.topics.length > 0),
    []
  )

  function toggleTopic(fullSlug: string) {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(fullSlug)) next.delete(fullSlug)
      else next.add(fullSlug)
      return next
    })
  }

  function toggleCategory(categorySlug: string, topicSlugs: string[]) {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      const allSelected = topicSlugs.every((s) => next.has(s))
      if (allSelected) {
        topicSlugs.forEach((s) => next.delete(s))
      } else {
        topicSlugs.forEach((s) => next.add(s))
      }
      return next
    })
  }

  function handleStart() {
    const allQuestions = [...selectedTopics].flatMap(
      (slug) => TOPIC_MAP[slug] ?? []
    )
    if (allQuestions.length === 0) return
    startQuiz(shuffle(allQuestions))
    router.push("/quiz")
  }

  const totalQuestions = [...selectedTopics].reduce(
    (sum, slug) => sum + (TOPIC_MAP[slug]?.length ?? 0),
    0
  )

  return (
    <main className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-text-primary mb-2">GeneralKnowledge</h1>
        <p className="font-sans text-text-muted text-sm">
          Choose categories or individual topics, then test yourself.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            selectedTopics={selectedTopics}
            onToggleTopic={toggleTopic}
            onToggleCategory={toggleCategory}
          />
        ))}
      </div>

      <div className="sticky bottom-6 flex items-center gap-4">
        <button
          onClick={handleStart}
          disabled={selectedTopics.size === 0}
          className="bg-gold text-bg font-sans font-bold text-sm px-8 py-3 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Start Quiz
          {totalQuestions > 0 && (
            <span className="ml-2 opacity-70 font-normal">({totalQuestions} questions)</span>
          )}
        </button>
        {selectedTopics.size > 0 && (
          <button
            onClick={() => setSelectedTopics(new Set())}
            className="text-text-faint hover:text-text-muted font-sans text-xs transition-colors"
          >
            Clear selection
          </button>
        )}
      </div>
    </main>
  )
}
