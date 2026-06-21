import { useTranslation } from '../lib/i18n'
import { DESTINATIONS } from '../lib/nav'
import Container from './Container'
import { LangLink } from './LangLink'

// Shared footer (003) — rendered in both presentation trees. Flat: a top border
// and a surface step, no shadow (DESIGN.md). Language-aware destination links so
// the active language is preserved on navigation (002).
export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-auto border-t border-default bg-surface-2">
      <Container className="flex flex-col gap-4 py-8">
        <span className="font-display text-lead font-semibold tracking-tight text-ink-primary">
          {t.brand}
        </span>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {DESTINATIONS.map((d) => (
            <LangLink
              key={d.key}
              to={d.to}
              className="text-caption font-semibold text-ink-muted hover:text-accent-primary"
            >
              {t.nav[d.key]}
            </LangLink>
          ))}
        </nav>
        <span className="text-caption text-ink-faint">
          {t.brand} — {t.footer.rights}
        </span>
      </Container>
    </footer>
  )
}
