import { Link } from 'react-router-dom'

import { getDict } from '../lib/i18n'
import LanguageToggle from '../ui/LanguageToggle'

// Flat top bar: wordmark + language toggle. Borders, not shadows (DESIGN.md).
export default function Header({ lang }) {
  const t = getDict(lang)
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-default bg-surface-0 px-4">
      <Link to={`/${lang}`} className="font-display text-lead font-semibold tracking-tight text-ink-primary">
        {t.brand}
      </Link>
      <LanguageToggle lang={lang} />
    </header>
  )
}
