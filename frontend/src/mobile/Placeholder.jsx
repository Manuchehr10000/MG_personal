import { resolveLang } from '../lib/content'
import { getDict, LANGS, useTranslation } from '../lib/i18n'
import { useDeclareLanguages } from '../lib/languageAvailability'

// Shell placeholder for nav destinations whose real content lands in later
// pieces (consulting 006, about 005, courses, contact 008). Keeps the tab bar
// fully navigable in F1 without inventing out-of-scope content.
//
// Demonstrates page-level degradation (002): a route declares the languages it
// exists in (`langs`). When the active language isn't one of them, the body falls
// back to the available language (rendered via the shared resolveLang mechanism)
// and a notice is shown; the base toggle greys for the missing direction.
export default function Placeholder({ titleKey, langs = LANGS }) {
  const { lang, t } = useTranslation()

  // Tell the toggle which languages this route exists in (grey/disable the rest).
  useDeclareLanguages(langs)

  // Page-level fallback: render the available language when the active one is absent.
  const contentLang = resolveLang(langs, lang, { fallback: true }) ?? lang
  const fellBack = contentLang !== lang
  const ct = getDict(contentLang)

  return (
    <section className="px-5 py-10">
      <h1 className="font-display text-subhead font-semibold text-ink-primary">
        {ct.nav[titleKey]}
      </h1>
      {fellBack && (
        <p data-testid="fallback-notice" className="mt-3 text-caption text-ink-muted">
          {t.degraded.fallbackNotice}
        </p>
      )}
      <p className="mt-4 text-body text-ink-muted">{ct.placeholder}</p>
    </section>
  )
}
