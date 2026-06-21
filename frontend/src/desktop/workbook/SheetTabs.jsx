// SheetTabs — the sheet-tab framing at the foot of a Sheet (DESIGN.md desktop-only
// addendum: "spreadsheet chrome: sheet tabs"). Flat tabs; the active tab carries
// the terracotta rule-accent (the shared inset-border token, not elevation).
// Reusable Sheet chrome.
export default function SheetTabs({ tabs = [], active, className = '' }) {
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
      {tabs.map((tab) => {
        const isActive = tab === active
        return (
          <span
            key={tab}
            className={[
              'border border-b-0 border-strong px-3 py-1',
              isActive
                ? 'bg-surface-0 font-semibold text-accent-primary shadow-rule'
                : 'bg-surface-2 text-ink-muted',
            ].join(' ')}
          >
            {tab}
          </span>
        )
      })}
    </div>
  )
}
