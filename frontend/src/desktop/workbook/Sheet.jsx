import { useWorkbookFont } from './useWorkbookFont'

// Sheet — the workbook panel root and the debut of the desktop-only workbook
// design layer (DESIGN.md desktop-only addendum). A floating "spreadsheet"
// surface: JetBrains Mono, cream surface + flat borders, an optional window/title
// bar, and the ONE named expressive drop shadow (shadow-workbook) permitted on
// this surface only. Reusable — any desktop page (about now, consulting/pricing
// later) composes a Sheet from FormulaBar / DataGrid / SheetTabs. Mounting a Sheet
// is what pulls in JetBrains Mono (desktop-only); mobile never renders one.
export default function Sheet({ name, children, className = '' }) {
  useWorkbookFont()
  return (
    <div
      data-workbook="sheet"
      className={[
        'overflow-hidden rounded-sm border border-strong bg-surface-0 font-mono text-ink-primary shadow-workbook',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {name && (
        <div className="flex items-center gap-2 border-b border-strong bg-surface-2 px-3 py-2 text-wb-sm text-ink-muted">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full border border-strong bg-surface-3" />
            <span className="h-2 w-2 rounded-full border border-strong bg-surface-3" />
            <span className="h-2 w-2 rounded-full border border-strong bg-surface-3" />
          </span>
          <span className="ml-2">{name}</span>
        </div>
      )}
      {children}
    </div>
  )
}
