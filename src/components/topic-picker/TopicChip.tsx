"use client"

import type { TopicMeta } from "@/types"

interface Props {
  topic: TopicMeta
  selected: boolean
  onToggle: () => void
}

export function TopicChip({ topic, selected, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`
        text-xs px-3 py-1 rounded-full border transition-colors font-sans
        ${selected
          ? "border-gold text-gold bg-bg-elevated"
          : "border-border text-text-faint hover:border-border-focus hover:text-text-muted"}
      `}
    >
      {topic.slug.replace(/-/g, " ")}
      <span className="ml-1.5 opacity-50">({topic.questionCount})</span>
    </button>
  )
}
