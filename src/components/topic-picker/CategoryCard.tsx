"use client"

import { useState } from "react"
import type { CategoryIndex } from "@/types"
import { TopicChip } from "./TopicChip"

interface Props {
  category: CategoryIndex
  selectedTopics: Set<string>
  onToggleTopic: (fullSlug: string) => void
  onToggleCategory: (categorySlug: string, topicSlugs: string[]) => void
}

export function CategoryCard({ category, selectedTopics, onToggleTopic, onToggleCategory }: Props) {
  const [expanded, setExpanded] = useState(false)
  const allFullSlugs = category.topics.map((t) => t.fullSlug)
  const allSelected = allFullSlugs.length > 0 && allFullSlugs.every((s) => selectedTopics.has(s))
  const someSelected = allFullSlugs.some((s) => selectedTopics.has(s))

  return (
    <div
      className={`
        rounded-lg border transition-colors
        ${allSelected ? "border-gold bg-bg-surface" : someSelected ? "border-border-focus bg-bg-surface" : "border-border bg-bg-surface hover:border-border-focus"}
      `}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <button
            onClick={() => onToggleCategory(category.slug, allFullSlugs)}
            className="flex-1 text-left"
          >
            <div className={`font-sans text-xs font-bold tracking-widest uppercase mb-1 ${allSelected ? "text-gold" : "text-text-muted"}`}>
              {category.displayName}
            </div>
            <div className="text-text-faint text-xs">{category.description}</div>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-text-faint text-xs">{category.topics.length} topics</span>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="text-text-faint hover:text-gold text-xs border border-border rounded px-2 py-0.5 transition-colors"
            >
              {expanded ? "less" : "expand"}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 flex flex-wrap gap-2 border-t border-border pt-3">
          {category.topics.map((topic) => (
            <TopicChip
              key={topic.fullSlug}
              topic={topic}
              selected={selectedTopics.has(topic.fullSlug)}
              onToggle={() => onToggleTopic(topic.fullSlug)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
