import { CLIENT_LOGOS } from '../lib/clients'
import { useTranslation } from '../lib/i18n'
import Container from '../ui/Container'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import Stat from '../ui/Stat'

// Desktop home / landing (004) — the SAME content model as mobile, presented as a
// clean editorial layout (a different presentation, not the mobile components —
// decision 10). Two-column hero and teasers, full-width proof strip, closing band.
// Flat per DESIGN.md. NO workbook chrome (no JetBrains Mono / grid / formula bars)
// — the workbook metaphor is a dedicated later piece.
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed'
const secondaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm border border-strong px-6 font-semibold text-ink-primary hover:bg-surface-2'
const linkCta = 'inline-flex items-center font-semibold text-accent-primary hover:text-accent-pressed'
const eyebrow = 'text-caption font-semibold uppercase tracking-wide text-accent-primary'

export default function DesktopHome() {
  const { t } = useTranslation()
  const h = t.home

  return (
    <div className="flex flex-col">
      {/* Hero — two column */}
      <section className="border-b border-default">
        <Container className="grid grid-cols-2 items-center gap-12 py-20">
          <Reveal>
            <h1 className="font-display text-display font-black tracking-tight text-ink-primary">
              {h.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-secondary">{h.hero.subtitle}</p>
            <div className="mt-8 flex gap-3">
              <LangLink to="contact" className={primaryCta}>
                {h.hero.primaryCta}
              </LangLink>
              <LangLink to="courses" className={secondaryCta}>
                {h.hero.secondaryCta}
              </LangLink>
            </div>
          </Reveal>
          <Reveal>
            <img
              src="/images/hero.webp"
              alt=""
              className="aspect-[4/3] w-full rounded-sm border border-default object-cover"
            />
          </Reveal>
        </Container>
      </section>

      {/* What I do — two columns */}
      <section className="border-b border-default bg-surface-2">
        <Container className="py-20">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-primary">
              {h.whatIDo.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[h.whatIDo.consulting, h.whatIDo.courses].map((c) => (
              <Reveal key={c.title} className="rounded-sm border border-default bg-surface-0 p-8">
                <h3 className="font-display text-subhead font-semibold text-ink-primary">{c.title}</h3>
                <p className="mt-3 text-body text-ink-secondary">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Consulting teaser -> consulting */}
      <section className="border-b border-default">
        <Container className="grid grid-cols-2 items-center gap-12 py-20">
          <Reveal>
            <p className={eyebrow}>{h.consulting.eyebrow}</p>
            <h2 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
              {h.consulting.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lead text-ink-secondary">{h.consulting.body}</p>
            <LangLink to="consulting" className={`mt-5 ${linkCta}`}>
              {h.consulting.cta} →
            </LangLink>
          </Reveal>
        </Container>
      </section>

      {/* Courses teaser -> courses */}
      <section className="border-b border-default bg-surface-2">
        <Container className="grid grid-cols-2 items-center gap-12 py-20">
          <Reveal>
            <p className={eyebrow}>{h.courses.eyebrow}</p>
            <h2 className="mt-3 font-display text-heading font-black tracking-tight text-ink-primary">
              {h.courses.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lead text-ink-secondary">{h.courses.body}</p>
            <LangLink to="courses" className={`mt-5 ${linkCta}`}>
              {h.courses.cta} →
            </LangLink>
          </Reveal>
        </Container>
      </section>

      {/* Credentials / proof strip -> about */}
      <section className="border-b border-default">
        <Container className="py-20">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-primary">
              {h.credentials.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lead text-ink-secondary">{h.credentials.body}</p>
          </Reveal>
          <Reveal className="mt-10 grid grid-cols-3 gap-8">
            {h.credentials.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </Reveal>
          <Reveal as="ul" className="mt-12 grid grid-cols-8 items-center gap-8">
            {CLIENT_LOGOS.map((c) => (
              <li key={c.name} className="flex items-center justify-center">
                <img
                  src={c.src}
                  alt={c.name}
                  className="h-8 w-full object-contain opacity-70 grayscale"
                />
              </li>
            ))}
          </Reveal>
          <Reveal>
            <LangLink to="about" className={`mt-10 ${linkCta}`}>
              {h.credentials.cta} →
            </LangLink>
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA band -> contact */}
      <section className="bg-surface-inverse">
        <Container className="py-20 text-center">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-on-dark">
              {h.closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-on-dark/80">{h.closing.body}</p>
            <div className="mt-8">
              <LangLink to="contact" className={primaryCta}>
                {h.closing.cta}
              </LangLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
