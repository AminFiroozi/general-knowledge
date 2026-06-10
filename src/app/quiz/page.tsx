"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/store/quiz-store"
import { useStatsStore } from "@/store/stats-store"
import { CATEGORIES } from "@/generated/index"
import { QuizCard } from "@/components/quiz-card/QuizCard"
import { StatsDrawer } from "@/components/stats-drawer/StatsDrawer"

export default function QuizPage() {
  const router = useRouter()
  const [statsOpen, setStatsOpen] = useState(false)
  const {
    questions,
    currentIndex,
    sessionCorrect,
    sessionWrong,
    status,
    answerQuestion,
    nextQuestion,
    endSession,
  } = useQuizStore()
  const { recordAnswer } = useStatsStore()

  useEffect(() => {
    if (status === "idle") {
      router.replace("/")
    }
  }, [status, router])

  if (status === "idle" || questions.length === 0) return null

  const question = questions[currentIndex]
  const parts = question?.id.split("-") ?? []
  const numSuffix = parts[parts.length - 1]
  const withoutNum = parts.slice(0, parts.length - 1)
  const categorySlug = withoutNum[0] ?? ""
  const topicSlug = withoutNum.slice(1).join("-")
  const categoryDisplay = CATEGORIES[categorySlug]?.displayName ?? categorySlug

  function handleAnswer(questionId: string, chosenIndex: number) {
    const q = questions[currentIndex]
    if (!q) return
    answerQuestion(questionId, chosenIndex)
    const correct = chosenIndex === q.answer
    const qParts = q.id.split("-")
    const catSlug = qParts[0]
    const topicFullSlug = catSlug + "/" + qParts.slice(1, qParts.length - 1).join("-")
    recordAnswer(catSlug, topicFullSlug, correct)
  }

  function handleEnd() {
    endSession()
    router.push("/")
  }

  if (status === "exhausted") {
    return (
      <main className="min-h-screen px-4 py-10 max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <h2 className="font-serif text-2xl text-text-primary">You covered all selected questions.</h2>
        <p className="font-sans text-text-muted text-sm">
          Session score: {sessionCorrect} correct, {sessionWrong} wrong
          {sessionCorrect + sessionWrong > 0 && ` (${Math.round((sessionCorrect / (sessionCorrect + sessionWrong)) * 100)}%)`}
        </p>
        <button
          onClick={handleEnd}
          className="bg-gold text-bg font-sans font-bold text-sm px-8 py-3 rounded hover:opacity-90 transition-opacity"
        >
          Pick Topics
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <header className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="font-sans text-correct-text text-sm">{sessionCorrect} correct</span>
          <span className="font-sans text-wrong-text text-sm">{sessionWrong} wrong</span>
          <span className="font-sans text-text-faint text-xs">#{currentIndex + 1}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStatsOpen(true)}
            className="font-sans text-xs border border-border text-gold px-3 py-1 rounded hover:border-border-focus transition-colors"
          >
            Stats
          </button>
          <button
            onClick={handleEnd}
            className="font-sans text-xs text-text-faint hover:text-text-muted transition-colors"
          >
            End
          </button>
        </div>
      </header>

      {question && (
        <QuizCard
          key={question.id}
          question={question}
          category={categoryDisplay}
          topic={topicSlug}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
        />
      )}

      <StatsDrawer open={statsOpen} onClose={() => setStatsOpen(false)} />
    </main>
  )
}
