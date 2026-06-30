// NameBox — the spreadsheet "name box" (003 rev.4): the cell-address box that sits to
// the LEFT of the formula bar and reflects the active section's address.
// PRESENTATIONAL — the address is a workbook flourish, not a live selection. New
// component; pairs with the reused FormulaBar (rendered with showCell={false}).
export default function NameBox({ address = 'A1' }) {
  return (
    <span
      data-workbook="name-box"
      className="flex min-w-20 items-center justify-center border-r border-strong bg-surface-2 px-3 py-2 font-mono text-wb font-semibold text-ink-secondary"
    >
      {address}
    </span>
  )
}
