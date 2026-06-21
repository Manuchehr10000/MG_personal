import { localize } from '../lib/content'
import { useTranslation } from '../lib/i18n'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'

// Placeholder home — the F1 conversion path's landing surface. Marketing copy and
// the real offer model arrive in later pieces (004+). Plain-language CTA, flat,
// terracotta accent. 003 wraps content in the shared reveal-on-scroll primitive.
export default function Home() {
  const { lang, t } = useTranslation()

  // Framework demo (scaffold, not page content): a content item that declares it
  // exists only in RU. Item-level degradation hides it cleanly in EN — no layout
  // break, nothing greyed. This is the item-level mode of the reusable mechanism.
  const ruOnlyDemo = {
    ru: 'Демонстрация фреймворка i18n: этот блок существует только на русском и в EN скрывается без сдвига вёрстки.',
  }
  const note = localize(ruOnlyDemo, lang) // no fallback -> null in EN

  return (
    <Reveal as="section" className="px-5 py-10">
      <img
        src="/images/hero.webp"
        alt=""
        loading="lazy"
        className="mb-8 aspect-[4/3] w-full rounded-sm border border-default object-cover"
      />
      <h1 className="font-display text-heading font-black tracking-tight text-ink-primary">
        {t.brand}
      </h1>
      <p className="mt-2 text-lead font-semibold text-accent-primary">{t.hero.title}</p>
      <p className="mt-4 text-body text-ink-secondary">{t.hero.tagline}</p>

      <LangLink
        to="contact"
        className="mt-8 inline-flex h-12 items-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed"
      >
        {t.hero.cta}
      </LangLink>

      <p className="mt-10 text-caption text-ink-faint">{t.placeholder}</p>

      {note.value && (
        <p data-testid="ru-only-item" className="mt-4 shadow-rule pl-3 text-caption text-ink-muted">
          {note.value}
        </p>
      )}
    </Reveal>
  )
}
