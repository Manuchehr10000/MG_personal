import { useEffect, useRef, useState } from 'react'

import { useLang, useTranslation } from '../lib/i18n'
import { useReducedMotion } from '../lib/useReducedMotion'

// RecalculatingFlash — the cosmetic "RECALCULATING…" overlay on language switch
// (003 rev.4 / DESIGN.md: "a brief cosmetic flash, presentation only"). PURELY
// COSMETIC: it watches the active :lang and shows a brief workbook-flavoured overlay
// when it changes — no logic, no data dependency. Skipped on first mount and under
// prefers-reduced-motion. Desktop-only (mounted inside the workbook frame).
export default function RecalculatingFlash() {
  const lang = useLang()
  const reduced = useReducedMotion()
  const { t } = useTranslation()
  const [flash, setFlash] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (reduced) return
    setFlash(true)
    const id = setTimeout(() => setFlash(false), 600)
    return () => clearTimeout(id)
  }, [lang, reduced])

  if (!flash) return null
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-surface-inverse/40"
    >
      <span className="rounded-sm border border-on-dark bg-surface-inverse px-5 py-2 font-mono text-wb font-semibold uppercase tracking-widest text-ink-on-dark shadow-workbook">
        {t.workbookChrome.recalculating}
      </span>
    </div>
  )
}
