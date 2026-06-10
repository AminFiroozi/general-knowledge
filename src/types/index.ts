export interface Question {
  id: string
  q: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  explanation: string
}

export interface TopicFile {
  topic: string
  category: string
  questions: Question[]
}

export interface CategoryMeta {
  displayName: string
  description: string
}

export interface TopicMeta {
  slug: string
  categorySlug: string
  fullSlug: string
  questionCount: number
}

export interface CategoryIndex {
  slug: string
  displayName: string
  description: string
  topics: TopicMeta[]
}

export type AnswerState = "unanswered" | "correct" | "wrong"

export interface SessionAnswer {
  questionId: string
  chosen: number
  correct: boolean
}
