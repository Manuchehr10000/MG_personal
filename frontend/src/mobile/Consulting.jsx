import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'

// Mobile consulting (006) — the CLEAN, plain-language services page (decision 11).
// Four service blocks + a closing line + a "request a quote" CTA to /contact. NO
// published prices (decision 14: consulting price IS NULL → quote path). Same
// content model as the desktop workbook, a different presentation (decision 10);
// composed from the 002/003 primitives, flat, no workbook chrome.
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed'

export default function Consulting({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const c = ct.consulting

  return (
    <div className="flex flex-col">
      {/* Intro */}
      <Reveal as="section" className="px-5 pb-10 pt-8">
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
      </Reveal>

      {/* Four service blocks */}
      <Reveal as="section" className="border-t border-default bg-surface-2 px-5 py-12">
        <ul className="flex flex-col gap-4">
          {c.services.map((s) => (
            <li
              key={s.title}
              data-service="true"
              className="rounded-sm border border-default bg-surface-0 p-5"
            >
              <h2 className="font-display text-lead font-semibold text-ink-primary">{s.title}</h2>
              <p className="mt-2 text-body text-ink-secondary">{s.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Closing line + quote CTA -> contact */}
      <Reveal as="section" className="border-t border-default bg-surface-inverse px-5 py-14">
        <p className="text-body text-ink-on-dark/80">{c.closing}</p>
        <LangLink to="contact" className={`mt-6 ${primaryCta}`}>
          {c.cta}
        </LangLink>
      </Reveal>
    </div>
  )
}
