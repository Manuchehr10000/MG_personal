import { getDict } from '../lib/i18n'

// Placeholder home — the F1 conversion path's landing surface. Marketing copy
// and the real offer model arrive in later pieces (004+). Plain-language CTA,
// flat, terracotta accent.
export default function Home({ lang }) {
  const t = getDict(lang)
  return (
    <section className="px-5 py-10">
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

      <a
        href={`/${lang}/contact`}
        className="mt-8 inline-flex h-12 items-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark active:bg-accent-pressed"
      >
        {t.hero.cta}
      </a>

      <p className="mt-10 text-caption text-ink-faint">{t.placeholder}</p>
    </section>
  )
}
