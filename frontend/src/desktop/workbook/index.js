// The reusable desktop workbook layer (debut at 005). Spreadsheet-metaphor
// primitives per the DESIGN.md desktop-only addendum — desktop-only, lazy with the
// desktop tree, never on mobile. Later desktop pages (consulting, pricing) compose
// these same primitives rather than re-deriving the chrome.
export { default as Sheet } from './Sheet'
export { default as FormulaBar } from './FormulaBar'
export { default as SheetTabs } from './SheetTabs'
export { DataGrid, Row, Cell } from './DataGrid'
