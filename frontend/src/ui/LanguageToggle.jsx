import { Link, useLocation } from 'react-router-dom'

import { DEFAULT_LANG, getDict, LANGS } from '../lib/i18n'

// Shared below the fork (decision: tokens/i18n/hooks are shared). Swaps the
// /:lang segment in place, preserving the rest of the path — a real route swap,
// not inline doubling.
export default function LanguageToggle({ lang }) {
  const location = useLocation()
  const other = LANGS.find((l) => l !== lang) ?? DEFAULT_LANG
  const t = getDict(lang)
  const rest = location.pathname.replace(/^\/[^/]+/, '') || ''

  return (
    <Link
      to={`/${other}${rest}`}
      aria-label={t.toggle.label}
      className="inline-flex h-12 min-w-12 items-center justify-center px-3 text-body font-semibold text-ink-secondary hover:text-accent-primary"
    >
      {t.toggle.other}
    </Link>
  )
}
