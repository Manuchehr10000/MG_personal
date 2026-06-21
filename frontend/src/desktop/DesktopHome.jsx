import { useTranslation } from '../lib/i18n'
import Container from '../ui/Container'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'

// Desktop home presentation — a clean editorial hero (a different presentation
// from mobile, per decision 10; not the same components). Real content arrives at
// 004; 003 demonstrates the chrome + tokens on the placeholder home.
export default function DesktopHome() {
  const { t } = useTranslation()
  return (
    <Container className="py-20">
      <Reveal>
        <h1 className="font-display text-display font-black tracking-tight text-ink-primary">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-secondary">{t.hero.tagline}</p>
        <LangLink
          to="contact"
          className="mt-8 inline-flex h-12 items-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed"
        >
          {t.hero.cta}
        </LangLink>
      </Reveal>
      <Reveal>
        <p className="mt-16 text-caption text-ink-faint">{t.placeholder}</p>
      </Reveal>
    </Container>
  )
}
