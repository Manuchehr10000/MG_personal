import { forwardRef } from 'react'

// WorkbookSection — one stacked sheet section in the desktop single-scroll workbook
// (003 rev.4). This piece renders each as a LABELED EMPTY PLACEHOLDER (no sheet
// content — that lands per later sheet piece). Carries `data-sheet-key` so the
// frame's scroll-spy can map "section in view" → active tab → route. The heading is
// Satoshi (display, per the rev.4 brand guardrail — NOT mono); only the workbook
// chrome is mono. `scroll-mt` offsets the sticky chrome for deep-link scroll-to.
const WorkbookSection = forwardRef(function WorkbookSection({ sheetKey, label, body }, ref) {
  return (
    <section
      ref={ref}
      id={`sheet-${sheetKey}`}
      data-sheet-key={sheetKey}
      data-workbook="section"
      className="flex min-h-[60vh] scroll-mt-48 flex-col items-center justify-center border-b border-default px-8 py-24 text-center"
    >
      <p className="font-mono text-wb-sm uppercase tracking-widest text-ink-faint">{sheetKey}</p>
      <h2 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
        {label}
      </h2>
      <p className="mt-4 max-w-md text-body text-ink-muted">{body}</p>
    </section>
  )
})

export default WorkbookSection
