import { useEffect } from 'react'

// JetBrains Mono — the workbook's grid / cell / formula typeface (DESIGN.md
// desktop-only addendum). Injected at runtime by the workbook layer, which is
// itself lazy with the desktop tree, so the font is NEVER referenced from
// index.html and never loads on mobile (decision 11 / FRONTEND.md: "the mobile
// bundle never ships workbook code"). Matches the CDN-font approach already used
// for DM Sans / Satoshi in index.html.
//
// Ref-counted so the <link> is present exactly while at least one workbook Sheet
// is mounted and removed when the last one unmounts — keeping the desktop-only
// guarantee testable and tidy across navigation.
const FONT_ID = 'workbook-mono-font'
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap'

let mounted = 0

export function useWorkbookFont() {
  useEffect(() => {
    mounted += 1
    if (mounted === 1 && typeof document !== 'undefined' && !document.getElementById(FONT_ID)) {
      const link = document.createElement('link')
      link.id = FONT_ID
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      link.dataset.workbookFont = 'true'
      document.head.appendChild(link)
    }
    return () => {
      mounted -= 1
      if (mounted === 0) document.getElementById(FONT_ID)?.remove()
    }
  }, [])
}
