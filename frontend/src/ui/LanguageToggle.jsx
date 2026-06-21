import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from '../lib/i18n'
import { useLanguageAvailability } from '../lib/languageAvailability'

// The base language toggle (002). Shared below the breakpoint fork. A real route
// swap: it replaces the /:lang segment in place, preserving the rest of the path
// — not inline doubling. When the current page/content has no other-language
// version it greys/disables (no dead route), keeping the same footprint so layout
// never shifts. Styled from DESIGN.md tokens (terracotta accent on hover).
export default function LanguageToggle() {
  const location = useLocation()
  const { lang, t, otherLang } = useTranslation()
  const available = useLanguageAvailability()
  const rest = location.pathname.replace(/^\/[^/]+/, '') || ''
  const label = t.toggle.other

  if (!available.includes(otherLang)) {
    return (
      <span
        aria-disabled="true"
        title={t.toggle.unavailable}
        className="inline-flex h-12 min-w-12 cursor-not-allowed items-center justify-center px-3 text-body font-semibold text-ink-faint"
      >
        {label}
      </span>
    )
  }

  return (
    <Link
      to={`/${otherLang}${rest}`}
      aria-label={t.toggle.label}
      className="inline-flex h-12 min-w-12 items-center justify-center px-3 text-body font-semibold text-ink-secondary hover:text-accent-primary"
    >
      {label}
    </Link>
  )
}
