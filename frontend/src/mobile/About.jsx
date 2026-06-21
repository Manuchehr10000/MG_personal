import { CLIENT_LOGOS } from '../lib/clients'
import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import Stat from '../ui/Stat'

// Mobile about / credentials (005) — the CLEAN proof surface (the workbook is
// desktop-only; mobile never renders any of it — DESIGN.md addendum). Same content
// model as the desktop workbook, a different presentation (decision 10): headshot
// + bio, proof stats, client-logo strip, closing CTA. Composed from the existing
// 003/004 primitives (Reveal, LangLink, Stat) and shared tokens; flat, no chrome.
// Content from data: stats array + CLIENT_LOGOS (reused from the home strip).
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed'

export default function About({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const a = ct.about

  return (
    <div className="flex flex-col">
      {/* Intro — bio + headshot */}
      <Reveal as="section" className="px-5 pb-12 pt-8">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
          {a.eyebrow}
        </p>
        {fellBack && (
          <p data-testid="fallback-notice" className="mt-2 text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <img
          src="/images/headshot.webp"
          alt={a.name}
          data-testid="headshot"
          loading="lazy"
          className="mt-5 aspect-[4/5] w-full rounded-sm border border-default object-cover"
        />
        <h1 className="mt-6 font-display text-heading font-black tracking-tight text-ink-primary">
          {a.name}
        </h1>
        <p className="mt-2 text-lead font-semibold text-ink-secondary">{a.role}</p>
        <p className="mt-4 text-body text-ink-secondary">{a.lead}</p>
        {a.bio.map((para, i) => (
          <p key={i} className="mt-4 text-body text-ink-secondary">
            {para}
          </p>
        ))}
      </Reveal>

      {/* Proof stats */}
      <Reveal as="section" className="border-t border-default bg-surface-2 px-5 py-12">
        <div className="grid grid-cols-2 gap-6">
          {a.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} data-stat="true" />
          ))}
        </div>
      </Reveal>

      {/* Client-logo strip */}
      <Reveal as="section" className="border-t border-default px-5 py-12">
        <h2 className="font-display text-subhead font-semibold text-ink-primary">
          {a.clientsTitle}
        </h2>
        <ul className="mt-6 grid grid-cols-3 items-center gap-6">
          {CLIENT_LOGOS.map((c) => (
            <li key={c.name} className="flex items-center justify-center">
              <img
                src={c.src}
                alt={c.name}
                data-logo="true"
                loading="lazy"
                className="h-8 w-full object-contain opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Closing CTA -> contact */}
      <Reveal as="section" className="border-t border-default bg-surface-inverse px-5 py-14">
        <h2 className="font-display text-subhead font-semibold text-ink-on-dark">
          {a.closing.title}
        </h2>
        <p className="mt-3 text-body text-ink-on-dark/80">{a.closing.body}</p>
        <LangLink to="contact" className={`mt-6 ${primaryCta}`}>
          {a.closing.cta}
        </LangLink>
      </Reveal>
    </div>
  )
}
