"use client"

import { useState } from "react"
import type { Question } from "@/types"
import { OptionButton } from "./OptionButton"
import { ExplanationBlock } from "./ExplanationBlock"

interface Props {
  question: Question
  category: string
  topic: string
  onAnswer: (questionId: string, chosenIndex: number) => void
  onNext: () => void
}

export function QuizCard({ question, category, topic, onAnswer, onNext }: Props) {
  const [chosen, setChosen] = useState<number | null>(null)

  const answered = chosen !== null
  const correct = answered && chosen === question.answer

  function handleChoice(index: number) {
    if (answered) return
    setChosen(index)
    onAnswer(question.id, index)
  }

  function getOptionState(index: number): "default" | "correct" | "wrong" | "missed" {
    if (!answered) return "default"
    if (index === question.answer) return "correct"
    if (index === chosen) return "wrong"
    return "default"
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-gold-faint text-xs font-sans tracking-widest uppercase mb-2">
          {category} · {topic.replace(/-/g, " ")}
        </div>
        <p className="font-serif text-lg text-text-primary leading-snug">{question.q}</p>
      </div>

      <div className="flex flex-col gap-2">
        {question.options.map((option, i) => (
          <OptionButton
            key={i}
            index={i}
            text={option}
            state={getOptionState(i)}
            disabled={answered}
            onClick={() => handleChoice(i)}
          />
        ))}
      </div>

      {answered && (
        <>
          <ExplanationBlock explanation={question.explanation} correct={correct} />
          <button
            onClick={onNext}
            className="self-start bg-gold text-bg font-sans font-bold text-sm px-6 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Next Question
          </button>
        </>
      )}
    </div>
  )
}
