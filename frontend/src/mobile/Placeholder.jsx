import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Reveal from '../ui/Reveal'

// Shell placeholder for nav destinations whose real content lands in later pieces
// (about 005, consulting 006, pricing 007, contact 008). Keeps the tab bar fully
// navigable in F1 without inventing out-of-scope content. Page-level degradation
// (002) is provided by the shared usePageContent hook; presentation is mobile.
export default function Placeholder({ titleKey, langs = LANGS }) {
  const { t, ct, fellBack } = usePageContent(langs)
  return (
    <Reveal as="section" className="px-5 py-10">
      <h1 className="font-display text-subhead font-semibold text-ink-primary">
        {ct.nav[titleKey]}
      </h1>
      {fellBack && (
        <p data-testid="fallback-notice" className="mt-3 text-caption text-ink-muted">
          {t.degraded.fallbackNotice}
        </p>
      )}
      <p className="mt-4 text-body text-ink-muted">{ct.placeholder}</p>
    </Reveal>
  )
}
