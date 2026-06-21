import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'

// Desktop placeholder for shell destinations whose real content lands in later
// pieces. Shares the page-level degradation logic (usePageContent) with mobile;
// presentation is the clean desktop column. No workbook chrome (later piece).
export default function DesktopPlaceholder({ titleKey, langs = LANGS }) {
  const { t, ct, fellBack } = usePageContent(langs)
  return (
    <Container className="py-20">
      <Reveal>
        <h1 className="font-display text-heading font-black tracking-tight text-ink-primary">
          {ct.nav[titleKey]}
        </h1>
        {fellBack && (
          <p data-testid="fallback-notice" className="mt-3 text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <p className="mt-4 text-body text-ink-secondary">{ct.placeholder}</p>
      </Reveal>
    </Container>
  )
}
