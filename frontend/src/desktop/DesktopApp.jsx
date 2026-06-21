import { useEffect } from 'react'

import { useTranslation } from '../lib/i18n'
import { LangLink } from '../ui/LangLink'
import LanguageToggle from '../ui/LanguageToggle'

// Desktop workbook tree — lazy-loaded so this code never ships in the mobile
// bundle. F1 sets up the fork and a thin shell only; the spreadsheet/workbook
// metaphor and its components are later pieces. JetBrains Mono is loaded here
// (desktop-only) so mobile never fetches it (DESIGN.md). The language framework
// (toggle, language-aware links) is shared below the fork.
export default function DesktopApp() {
  const { t } = useTranslation()

  useEffect(() => {
    const id = 'jetbrains-mono-font'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <div className="min-h-dvh bg-surface-1">
      <header className="flex h-14 items-center justify-between border-b border-default bg-surface-0 px-8">
        <LangLink to="" className="font-display text-lead font-semibold text-ink-primary">
          {t.brand}
        </LangLink>
        <LanguageToggle />
      </header>
      <main className="mx-auto max-w-5xl px-8 py-16">
        <h1 className="font-display text-display font-black tracking-tight text-ink-primary">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-secondary">{t.hero.tagline}</p>
        <p className="mt-10 font-mono text-caption text-ink-faint">{t.placeholder}</p>
      </main>
    </div>
  )
}
