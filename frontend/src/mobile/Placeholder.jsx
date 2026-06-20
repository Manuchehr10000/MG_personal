import { getDict } from '../lib/i18n'

// Shell placeholder for nav destinations whose real content lands in later
// pieces (consulting 006, about 005, courses, contact 008). Keeps the tab bar
// fully navigable in F1 without inventing out-of-scope content.
export default function Placeholder({ lang, titleKey }) {
  const t = getDict(lang)
  return (
    <section className="px-5 py-10">
      <h1 className="font-display text-subhead font-semibold text-ink-primary">
        {t.nav[titleKey]}
      </h1>
      <p className="mt-4 text-body text-ink-muted">{t.placeholder}</p>
    </section>
  )
}
