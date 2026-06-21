import { Children, cloneElement, isValidElement } from 'react'

// DataGrid + cell primitives (DESIGN.md desktop-only addendum: "data-grid cells").
// A bordered, dense (10-13px) mono grid: an optional column-letter header row and
// an auto-numbered left gutter, framing the consumer's <Row><Cell/>…</Row>
// children. Reusable across desktop pages — the consumer supplies the column
// labels and the rows; DataGrid injects each row's number.

export function DataGrid({ columns = [], children, className = '' }) {
  const rows = Children.toArray(children).filter(isValidElement)
  return (
    <table
      data-workbook="data-grid"
      className={['w-full border-collapse text-wb', className].filter(Boolean).join(' ')}
    >
      {columns.length > 0 && (
        <thead>
          <tr>
            {/* Corner cell above the row-number gutter. */}
            <th className="w-8 border border-strong bg-surface-2 px-2 py-1 text-wb-xs font-semibold text-ink-faint" />
            {columns.map((c, i) => (
              <th
                key={i}
                className="border border-strong bg-surface-2 px-3 py-1 text-left text-wb-xs font-semibold uppercase tracking-wide text-ink-muted"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>{rows.map((row, i) => cloneElement(row, { n: i + 1 }))}</tbody>
    </table>
  )
}

// Row — a grid row with the auto-injected spreadsheet row number in the gutter.
export function Row({ n, children, className = '' }) {
  return (
    <tr className={className}>
      <th className="border border-strong bg-surface-2 px-2 py-1 text-center text-wb-xs font-semibold text-ink-faint">
        {n}
      </th>
      {children}
    </tr>
  )
}

// Cell — a single data-grid cell. `header` styles it as a field/label cell;
// `accent` carries the terracotta for proof figures; `align` / `colSpan` are the
// usual table affordances.
export function Cell({
  children,
  align = 'left',
  accent = false,
  header = false,
  colSpan,
  className = '',
  ...rest
}) {
  const Tag = header ? 'th' : 'td'
  const alignClass =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
  return (
    <Tag
      colSpan={colSpan}
      className={[
        'border border-strong px-3 py-1 align-top',
        alignClass,
        header ? 'bg-surface-1 font-semibold text-ink-secondary' : 'text-ink-primary',
        accent ? 'font-semibold text-accent-primary' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
