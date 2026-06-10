interface Props {
  label: string
  correct: number
  total: number
}

export function CategoryBar({ label, correct, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100)

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-primary font-sans text-xs w-32 truncate capitalize">
        {label.replace(/-/g, " ")}
      </span>
      <div className="flex-1 bg-bg-elevated rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-gold font-sans text-xs w-8 text-right">{pct}%</span>
      <span className="text-text-faint font-sans text-xs w-10 text-right">{total}q</span>
    </div>
  )
}
