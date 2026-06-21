// Proof stat primitive (004) — a display figure + caption label, styled from
// DESIGN.md tokens (Satoshi display figure, terracotta accent, flat). Shared by
// the mobile and desktop credentials strips and available to later pages.
export default function Stat({ value, label, className = '' }) {
  return (
    <div className={className}>
      <div className="font-display text-heading font-black leading-none tracking-tight text-accent-primary">
        {value}
      </div>
      <div className="mt-2 text-caption text-ink-muted">{label}</div>
    </div>
  )
}
