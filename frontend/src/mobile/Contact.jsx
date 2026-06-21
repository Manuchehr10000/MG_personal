import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import ContactForm from '../ui/ContactForm'
import Reveal from '../ui/Reveal'

// Mobile contact (008) — the CLEAN conversion form (decision 11). Heading + lead +
// the shared ContactForm (workbook-free), posting to /api/contact. Same content
// model as desktop, a different presentation (decision 10): no Sheet frame here.
export default function Contact({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const c = ct.contact

  return (
    <Reveal as="section" className="px-5 pb-14 pt-8">
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
      <p className="mt-4 text-body text-ink-secondary">{c.lead}</p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </Reveal>
  )
}
