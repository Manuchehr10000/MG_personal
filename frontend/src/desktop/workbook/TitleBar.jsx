// TitleBar — the workbook window chrome (003 rev.4): a dark "OS window" bar with the
// three traffic-light dots and the .xlsx filename. Dark ground (surface-inverse) with
// the DESIGN.md dark-border tokens (border-on-dark*). Desktop-only chrome; mono.
export default function TitleBar({ filename }) {
  return (
    <div
      data-workbook="title-bar"
      className="flex items-center gap-3 border-b border-on-dark-strong bg-surface-inverse px-4 py-2 font-mono text-wb-sm text-ink-on-dark/70"
    >
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-3 w-3 rounded-full border border-on-dark bg-surface-inverse-deep" />
        <span className="h-3 w-3 rounded-full border border-on-dark bg-surface-inverse-deep" />
        <span className="h-3 w-3 rounded-full border border-on-dark bg-surface-inverse-deep" />
      </span>
      <span className="mx-auto tracking-wide">{filename}</span>
      <span className="w-12" aria-hidden="true" />
    </div>
  )
}
