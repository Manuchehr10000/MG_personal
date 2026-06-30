// FormulaBar — the spreadsheet formula-bar motif (DESIGN.md desktop-only
// addendum: "spreadsheet chrome: formula bar"). A cell-reference box + the `fx`
// marker + the active cell's value/formula. Reusable Sheet chrome; the consumer
// passes the cell ref and the value to display. Pass `showCell={false}` to omit the
// built-in cell box when an external NameBox already renders the address (003 rev.4
// workbook frame composes NameBox + FormulaBar).
export default function FormulaBar({ cell = 'A1', showCell = true, children, className = '' }) {
  return (
    <div
      data-workbook="formula-bar"
      className={[
        'flex items-stretch border-b border-strong bg-surface-0 font-mono text-wb',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showCell && (
        <span className="flex min-w-16 items-center justify-center border-r border-strong bg-surface-2 px-3 py-2 font-semibold text-ink-secondary">
          {cell}
        </span>
      )}
      <span className="flex items-center border-r border-strong px-3 py-2 italic text-ink-muted">
        fx
      </span>
      <span className="flex flex-1 items-center px-3 py-2 text-ink-primary">{children}</span>
    </div>
  )
}
