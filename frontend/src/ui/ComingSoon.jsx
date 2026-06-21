import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from './Container'
import Reveal from './Reveal'

// Coming-soon mount-point (009) for a STANDALONE route that is deliberately NOT in
// DESTINATIONS — reached by a footer link / direct post-meeting link (journey 3),
// never the tab bar or scroll-nav. Shared below the breakpoint fork: both trees
// render this one minimal, flat view (a coming-soon has no per-tree divergence;
// phase 3 replaces it with the real surface). Reads its own dict block via
// `contentKey` (no nav-label dependency) and the 002 language framework, so the
// toggle + page-level degradation work without any per-page wiring.
export default function ComingSoon({ contentKey, langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const c = ct[contentKey]
  return (
    <Container className="py-20">
      <Reveal>
        <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
          {c.eyebrow}
        </p>
        {fellBack && (
          <p data-testid="fallback-notice" className="mt-2 text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <h1 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
          {c.title}
        </h1>
        <p className="mt-4 max-w-2xl text-body text-ink-secondary">{c.blurb}</p>
      </Reveal>
    </Container>
  )
}
