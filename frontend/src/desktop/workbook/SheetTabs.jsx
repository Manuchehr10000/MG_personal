// SheetTabs — the spreadsheet sheet-tab strip (DESIGN.md desktop-only addendum).
// Two modes, one component (the 003-rev.4 spec: "a SheetTabs — extend the existing
// one"):
//   • PRESENTATIONAL (foot-of-sheet): pass string `tabs` + `active`, no `onSelect` —
//     flat tabs, the active one carrying the terracotta inset rule-accent.
//   • SCROLL-SPY NAV (the workbook frame): pass `{ key, label }` items + `active` +
//     `onSelect` — interactive <button> tabs; the active section's tab carries the
//     terracotta TOP-border. Clicking selects (the frame smooth-scrolls + syncs the
//     route); scrolling updates `active`.
export default function SheetTabs({ tabs = [], active, onSelect, className = '' }) {
  const interactive = typeof onSelect === 'function'
  const items = tabs.map((tab) => (typeof tab === 'string' ? { key: tab, label: tab } : tab))

  if (interactive) {
    return (
      <div
        data-workbook="sheet-tabs"
        className={[
          'flex items-stretch gap-1 border-b border-strong bg-surface-2 px-2 font-mono text-wb-sm',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {items.map(({ key, label }) => {
          const isActive = key === active
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'border border-b-0 border-strong border-t-2 px-3 py-1',
                isActive
                  ? 'border-t-accent-primary bg-surface-0 font-semibold text-accent-primary'
                  : 'border-t-transparent bg-surface-2 text-ink-muted hover:text-ink-secondary',
              ].join(' ')}
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      data-workbook="sheet-tabs"
      className={[
        'flex items-stretch gap-1 border-t border-strong bg-surface-2 px-2 pt-1 text-wb-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map(({ key, label }) => {
        const isActive = key === active
        return (
          <span
            key={key}
            className={[
              'border border-b-0 border-strong px-3 py-1',
              isActive
                ? 'bg-surface-0 font-semibold text-accent-primary shadow-rule'
                : 'bg-surface-2 text-ink-muted',
            ].join(' ')}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}
