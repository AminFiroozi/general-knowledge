"use client"

const LABELS = ["A", "B", "C", "D"] as const

interface Props {
  index: number
  text: string
  state: "default" | "correct" | "wrong" | "missed"
  disabled: boolean
  onClick: () => void
}

export function OptionButton({ index, text, state, disabled, onClick }: Props) {
  const styles = {
    default: "border-border bg-bg-surface text-text-primary hover:border-border-focus",
    correct: "border-correct-border bg-correct-bg text-correct-text",
    wrong: "border-wrong-border bg-wrong-bg text-wrong-text",
    missed: "border-correct-border bg-bg-surface text-correct-text opacity-70",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left flex items-start gap-3 px-4 py-3 rounded border
        font-sans text-sm transition-colors
        disabled:cursor-default
        ${styles[state]}
      `}
    >
      <span className="font-bold shrink-0 w-4">{LABELS[index]}</span>
      <span>{text}</span>
    </button>
  )
}
