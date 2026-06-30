// The reusable desktop workbook layer. Spreadsheet-metaphor primitives + chrome per
// the DESIGN.md desktop-only addendum — desktop-only, lazy with the desktop tree,
// never on mobile. The 003-rev.4 frame composes the chrome (TitleBar / CommandBar /
// NameBox / FormulaBar / SheetTabs / StatusBar); later sheet pieces compose the data
// primitives (Sheet / DataGrid / Cell) rather than re-deriving them.
export { default as Sheet } from './Sheet'
export { default as FormulaBar } from './FormulaBar'
export { default as SheetTabs } from './SheetTabs'
export { default as TitleBar } from './TitleBar'
export { default as CommandBar } from './CommandBar'
export { default as NameBox } from './NameBox'
export { default as StatusBar } from './StatusBar'
export { DataGrid, Row, Cell } from './DataGrid'
