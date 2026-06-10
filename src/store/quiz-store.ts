import { create } from "zustand"
import type { Question } from "../types"

interface QuizStore {
  questions: Question[]
  currentIndex: number
  answers: Record<string, number>
  sessionCorrect: number
  sessionWrong: number
  status: "idle" | "active" | "exhausted"

  startQuiz: (questions: Question[]) => void
  answerQuestion: (questionId: string, chosenIndex: number) => void
  nextQuestion: () => void
  endSession: () => void
}

export const useQuizStore = create<QuizStore>()((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: {},
  sessionCorrect: 0,
  sessionWrong: 0,
  status: "idle",

  startQuiz(questions) {
    set({
      questions,
      currentIndex: 0,
      answers: {},
      sessionCorrect: 0,
      sessionWrong: 0,
      status: "active",
    })
  },

  answerQuestion(questionId, chosenIndex) {
    const { questions, currentIndex } = get()
    const question = questions[currentIndex]
    if (!question || question.id !== questionId) return
    const correct = chosenIndex === question.answer
    set((state) => ({
      answers: { ...state.answers, [questionId]: chosenIndex },
      sessionCorrect: state.sessionCorrect + (correct ? 1 : 0),
      sessionWrong: state.sessionWrong + (correct ? 0 : 1),
    }))
  },

  nextQuestion() {
    const { currentIndex, questions } = get()
    const next = currentIndex + 1
    if (next >= questions.length) {
      set({ status: "exhausted" })
    } else {
      set({ currentIndex: next })
    }
  },

  endSession() {
    set({
      questions: [],
      currentIndex: 0,
      answers: {},
      sessionCorrect: 0,
      sessionWrong: 0,
      status: "idle",
    })
  },
}))
