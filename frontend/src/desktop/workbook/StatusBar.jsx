// StatusBar — the workbook status / zoom footer (003 rev.4): a READY indicator with a
// SINGLE-ACCENT terracotta dot (NOT semantic green — the chrome stays monochromatic
// per DESIGN.md / the rev.4 brand guardrail), the sheet count, the active language,
// and the zoom level. Dark ground with the dark-border tokens; desktop-only mono
// chrome. New component.
export default function StatusBar({ ready, sheetCount, sheetsLabel, lang, zoom }) {
  return (
    <div
      data-workbook="status-bar"
      className="flex items-center gap-4 border-t border-on-dark-strong bg-surface-inverse px-4 py-1.5 font-mono text-wb-xs text-ink-on-dark/70"
    >
      <span className="flex items-center gap-2">
        <span
          data-workbook="status-dot"
          className="h-2 w-2 rounded-full bg-accent-primary"
          aria-hidden="true"
        />
        {ready}
      </span>
      <span aria-hidden="true" className="text-ink-on-dark/30">
        |
      </span>
      <span>
        {sheetCount} {sheetsLabel}
      </span>
      <span aria-hidden="true" className="text-ink-on-dark/30">
        |
      </span>
      <span className="uppercase">{lang}</span>
      <span className="ml-auto">{zoom}</span>
    </div>
  )
}
