import { useTranslation } from '../lib/i18n'
import { DESTINATIONS } from '../lib/nav'
import Container from '../ui/Container'
import { LangLink, LangNavLink } from '../ui/LangLink'
import LanguageToggle from '../ui/LanguageToggle'

// Desktop sticky scroll-nav (003): wordmark + the six shell destinations + the
// 002 language toggle. Clean editorial layout, flat (solid surface, border-bottom,
// no blur, no shadow) — NOT the workbook metaphor (later piece). Language-aware
// links keep the active language across navigation.
export default function DesktopNav() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-30 border-b border-default bg-surface-0">
      <Container className="flex h-16 items-center justify-between">
        <LangLink
          to=""
          className="font-display text-lead font-semibold tracking-tight text-ink-primary"
        >
          {t.brand}
        </LangLink>
        <nav className="flex items-center gap-1">
          {DESTINATIONS.map((d) => (
            <LangNavLink
              key={d.key}
              to={d.to}
              end={d.to === ''}
              className={({ isActive }) =>
                [
                  'px-3 py-2 text-body font-semibold',
                  isActive ? 'text-accent-primary' : 'text-ink-secondary hover:text-accent-primary',
                ].join(' ')
              }
            >
              {t.nav[d.key]}
            </LangNavLink>
          ))}
          <LanguageToggle />
        </nav>
      </Container>
    </header>
  )
}
