import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TopicStats {
  correct: number
  total: number
}

interface StatsStore {
  byCategory: Record<string, TopicStats>
  byTopic: Record<string, TopicStats>
  recordAnswer: (category: string, topicFullSlug: string, correct: boolean) => void
  reset: () => void
}

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      byCategory: {},
      byTopic: {},

      recordAnswer(category, topicFullSlug, correct) {
        set((state) => {
          const cat = state.byCategory[category] ?? { correct: 0, total: 0 }
          const topic = state.byTopic[topicFullSlug] ?? { correct: 0, total: 0 }
          return {
            byCategory: {
              ...state.byCategory,
              [category]: { correct: cat.correct + (correct ? 1 : 0), total: cat.total + 1 },
            },
            byTopic: {
              ...state.byTopic,
              [topicFullSlug]: { correct: topic.correct + (correct ? 1 : 0), total: topic.total + 1 },
            },
          }
        })
      },

      reset() {
        set({ byCategory: {}, byTopic: {} })
      },
    }),
    { name: "gk-stats" }
  )
)
