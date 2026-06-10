interface Props {
  explanation: string
  correct: boolean
}

export function ExplanationBlock({ explanation, correct }: Props) {
  return (
    <div className={`
      rounded-r border-l-4 px-4 py-3 text-sm font-sans leading-relaxed
      ${correct ? "border-correct-border bg-correct-bg text-correct-text" : "border-wrong-border bg-bg-elevated text-text-muted"}
    `}>
      <span className="font-bold text-gold mr-2">Why:</span>
      {explanation}
    </div>
  )
}
