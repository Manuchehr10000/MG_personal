import { useTranslation } from '../lib/i18n'
import { LangLink } from '../ui/LangLink'
import LanguageToggle from '../ui/LanguageToggle'

// Flat top bar: wordmark + language toggle. Borders, not shadows (DESIGN.md).
// The wordmark is a language-aware link home; the toggle is shared below the fork.
export default function Header() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-default bg-surface-0 px-4">
      <LangLink
        to=""
        className="font-display text-lead font-semibold tracking-tight text-ink-primary"
      >
        {t.brand}
      </LangLink>
      <LanguageToggle />
    </header>
  )
}
