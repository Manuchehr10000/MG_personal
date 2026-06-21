import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from '../ui/Container'
import ContactForm from '../ui/ContactForm'
import Reveal from '../ui/Reveal'
import { Sheet } from './workbook'

// Desktop contact (008) — the SAME form as mobile, framed inside a 005 workbook
// Sheet for visual continuity (decision 10: a different presentation). Usability
// first: the form body is real inputs in the body font (font-sans), NOT grid cells
// — only the Sheet chrome (title bar, expressive shadow) carries the workbook look.
// Mounting the Sheet is what loads JetBrains Mono (desktop-only).
export default function DesktopContact({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const c = ct.contact

  return (
    <div data-testid="desktop-contact">
      <Container className="py-16">
        {fellBack && (
          <p data-testid="fallback-notice" className="mb-4 text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
            {c.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
            {c.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lead text-ink-secondary">{c.lead}</p>
          <div className="mt-8 max-w-2xl">
            <Sheet name={c.sheetName}>
              {/* Real, usable form in the body font — not grid cells. */}
              <div className="p-6 font-sans">
                <ContactForm />
              </div>
            </Sheet>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
