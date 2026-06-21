// Proof stat primitive (004) — a display figure + caption label, styled from
// DESIGN.md tokens (Satoshi display figure, terracotta accent, flat). Shared by
// the mobile and desktop credentials strips and available to later pages. Forwards
// extra props (e.g. data-* hooks) onto the root.
export default function Stat({ value, label, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      <div className="font-display text-heading font-black leading-none tracking-tight text-accent-primary">
        {value}
      </div>
      <div className="mt-2 text-caption text-ink-muted">{label}</div>
    </div>
  )
}
