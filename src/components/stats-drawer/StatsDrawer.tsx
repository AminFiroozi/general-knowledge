"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import { useStatsStore } from "@/store/stats-store"
import { useQuizStore } from "@/store/quiz-store"
import { CategoryBar } from "./CategoryBar"

interface Props {
  open: boolean
  onClose: () => void
}

export function StatsDrawer({ open, onClose }: Props) {
  const { byCategory } = useStatsStore()
  const { sessionCorrect, sessionWrong } = useQuizStore()

  const sessionTotal = sessionCorrect + sessionWrong
  const sessionPct = sessionTotal === 0 ? 0 : Math.round((sessionCorrect / sessionTotal) * 100)

  const categoryEntries = Object.entries(byCategory).sort((a, b) => b[1].total - a[1].total)

  return (
    <Drawer open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DrawerContent className="bg-bg-surface border-t border-border max-h-[80vh]">
        <DrawerHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-serif text-text-primary">Your Progress</DrawerTitle>
            <DrawerClose asChild>
              <button className="text-text-faint hover:text-text-muted text-xs font-sans">
                Back to quiz
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto p-4 flex flex-col gap-6">
          <div>
            <div className="text-text-faint text-xs font-sans tracking-widest uppercase mb-3">
              This Session
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-correct-text font-serif text-2xl font-bold">{sessionCorrect}</div>
                <div className="text-text-faint text-xs font-sans">correct</div>
              </div>
              <div className="text-center">
                <div className="text-wrong-text font-serif text-2xl font-bold">{sessionWrong}</div>
                <div className="text-text-faint text-xs font-sans">wrong</div>
              </div>
              <div className="text-center">
                <div className="text-gold font-serif text-2xl font-bold">{sessionPct}%</div>
                <div className="text-text-faint text-xs font-sans">accuracy</div>
              </div>
            </div>
          </div>

          {categoryEntries.length > 0 && (
            <div>
              <div className="text-text-faint text-xs font-sans tracking-widest uppercase mb-3">
                All-Time by Category
              </div>
              <div className="flex flex-col gap-3">
                {categoryEntries.map(([slug, stats]) => (
                  <CategoryBar
                    key={slug}
                    label={slug}
                    correct={stats.correct}
                    total={stats.total}
                  />
                ))}
              </div>
            </div>
          )}

          {categoryEntries.length === 0 && (
            <p className="text-text-faint text-xs font-sans text-center py-4">
              No all-time stats yet. Answer some questions to build your history.
            </p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
