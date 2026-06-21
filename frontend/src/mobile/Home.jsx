import { CLIENT_LOGOS } from '../lib/clients'
import { useTranslation } from '../lib/i18n'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import Stat from '../ui/Stat'

// Mobile home / landing (004) — the conversion surface for an Instagram / referral
// / post-meeting visitor. Section stack (hero -> what-I-do -> consulting teaser ->
// courses teaser -> credentials/proof -> closing CTA), composing the 002/003
// primitives (Reveal, LangLink, dict). Mobile-first, flat, plain-language CTAs to
// live routes. Copy lives in dict.home (placeholder, owner-replaceable).
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed'
const secondaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm border border-strong px-6 font-semibold text-ink-primary active:bg-surface-2'
const linkCta = 'inline-flex h-12 items-center font-semibold text-accent-primary active:text-accent-pressed'

export default function Home() {
  const { t } = useTranslation()
  const h = t.home

  return (
    <div className="flex flex-col">
      {/* Hero — value prop + primary CTA */}
      <Reveal as="section" className="px-5 pb-12 pt-8">
        <img
          src="/images/hero.webp"
          alt=""
          loading="lazy"
          className="mb-8 aspect-[4/3] w-full rounded-sm border border-default object-cover"
        />
        <h1 className="font-display text-heading font-black tracking-tight text-ink-primary">
          {h.hero.title}
        </h1>
        <p className="mt-4 text-body text-ink-secondary">{h.hero.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3">
          <LangLink to="contact" className={primaryCta}>
            {h.hero.primaryCta}
          </LangLink>
          <LangLink to="courses" className={secondaryCta}>
            {h.hero.secondaryCta}
          </LangLink>
        </div>
      </Reveal>

      {/* What I do — two-offer framing */}
      <Reveal as="section" className="border-t border-default bg-surface-2 px-5 py-12">
        <h2 className="font-display text-subhead font-semibold text-ink-primary">{h.whatIDo.title}</h2>
        <div className="mt-6 flex flex-col gap-4">
          {[h.whatIDo.consulting, h.whatIDo.courses].map((c) => (
            <div key={c.title} className="rounded-sm border border-default bg-surface-0 p-5">
              <h3 className="font-display text-lead font-semibold text-ink-primary">{c.title}</h3>
              <p className="mt-2 text-body text-ink-secondary">{c.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Consulting teaser -> consulting */}
      <Reveal as="section" className="border-t border-default px-5 py-12">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
          {h.consulting.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-subhead font-semibold text-ink-primary">
          {h.consulting.title}
        </h2>
        <p className="mt-3 text-body text-ink-secondary">{h.consulting.body}</p>
        <LangLink to="consulting" className={`mt-5 ${linkCta}`}>
          {h.consulting.cta} →
        </LangLink>
      </Reveal>

      {/* Courses teaser -> courses */}
      <Reveal as="section" className="border-t border-default bg-surface-2 px-5 py-12">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent-primary">
          {h.courses.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-subhead font-semibold text-ink-primary">
          {h.courses.title}
        </h2>
        <p className="mt-3 text-body text-ink-secondary">{h.courses.body}</p>
        <LangLink to="courses" className={`mt-5 ${linkCta}`}>
          {h.courses.cta} →
        </LangLink>
      </Reveal>

      {/* Credentials / proof strip -> about */}
      <Reveal as="section" className="border-t border-default px-5 py-12">
        <h2 className="font-display text-subhead font-semibold text-ink-primary">
          {h.credentials.title}
        </h2>
        <p className="mt-3 text-body text-ink-secondary">{h.credentials.body}</p>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {h.credentials.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
        <ul className="mt-8 grid grid-cols-3 items-center gap-6">
          {CLIENT_LOGOS.map((c) => (
            <li key={c.name} className="flex items-center justify-center">
              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="h-8 w-full object-contain opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
        <LangLink to="about" className={`mt-8 ${linkCta}`}>
          {h.credentials.cta} →
        </LangLink>
      </Reveal>

      {/* Closing CTA -> contact */}
      <Reveal as="section" className="border-t border-default bg-surface-inverse px-5 py-14">
        <h2 className="font-display text-subhead font-semibold text-ink-on-dark">{h.closing.title}</h2>
        <p className="mt-3 text-body text-ink-on-dark/80">{h.closing.body}</p>
        <LangLink to="contact" className={`mt-6 ${primaryCta}`}>
          {h.closing.cta}
        </LangLink>
      </Reveal>
    </div>
  )
}
