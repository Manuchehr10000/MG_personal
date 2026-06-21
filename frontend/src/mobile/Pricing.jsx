import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'

// Mobile pricing (007) — the CLEAN, plain-language course cards (decision 11).
// Courses are FIXED-price (decision 14, unlike consulting's quote path): each card
// shows the course, what's included, and its fixed price. Closing line + CTA to
// /contact (enquiry — no checkout in phase 1, decision 15). Same content model as
// the desktop price grid, a different presentation (decision 10); flat, no workbook
// chrome. Mirrors mobile/Consulting.
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed'

export default function Pricing({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const p = ct.pricing

  return (
    <div className="flex flex-col">
      {/* Intro */}
      <Reveal as="section" className="px-5 pb-10 pt-8">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
          {p.eyebrow}
        </p>
        {fellBack && (
          <p data-testid="fallback-notice" className="mt-2 text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <h1 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
          {p.title}
        </h1>
        <p className="mt-4 text-body text-ink-secondary">{p.lead}</p>
      </Reveal>

      {/* Fixed-price course cards */}
      <Reveal as="section" className="border-t border-default bg-surface-2 px-5 py-12">
        <ul className="flex flex-col gap-4">
          {p.courses.map((course) => (
            <li
              key={course.name}
              data-course="true"
              className="rounded-sm border border-default bg-surface-0 p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lead font-semibold text-ink-primary">
                  {course.name}
                </h2>
                <span
                  data-price="true"
                  className="shrink-0 font-display text-subhead font-black tracking-tight text-accent-primary"
                >
                  {course.fixedPrice}
                </span>
              </div>
              <p className="mt-2 text-body text-ink-secondary">{course.includes}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Closing line + enquiry CTA -> contact */}
      <Reveal as="section" className="border-t border-default bg-surface-inverse px-5 py-14">
        <p className="text-body text-ink-on-dark/80">{p.closing}</p>
        <LangLink to="contact" className={`mt-6 ${primaryCta}`}>
          {p.cta}
        </LangLink>
      </Reveal>
    </div>
  )
}
