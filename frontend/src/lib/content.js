// Per-content localization mechanism (002) — the single reusable primitive both
// degradation modes are built on (FRONTEND.md "two degradation modes"):
//   - item-level HIDE  : a content item present in one language only renders
//                        nothing in the other (no layout break). Use localize()
//                        with no fallback and skip render when value is null.
//   - page-level FALLBACK: a route absent in a language renders the available
//                        language instead. Use resolveLang(..., { fallback: true }).
// A "content item" is a plain object keyed by language, e.g. { en, ru } or { ru }.
// The keys present ARE the languages the item declares it exists in.

import { DEFAULT_LANG, LANGS } from './i18n'

// Languages an item exists in, in canonical LANGS order.
export function languagesOf(item) {
  if (!item) return []
  return LANGS.filter((l) => item[l] != null)
}

// Resolve which language to actually render given what's available.
//   - exact match wins;
//   - with fallback: prefer the default language, then the first available;
//   - without fallback: null (caller hides the item).
export function resolveLang(available, lang, { fallback = false } = {}) {
  if (available.includes(lang)) return lang
  if (!fallback) return null
  if (available.includes(DEFAULT_LANG)) return DEFAULT_LANG
  return available[0] ?? null
}

// Localize a content item. Returns the resolved value plus metadata so callers
// can drive either mode and surface a fallback notice.
export function localize(item, lang, opts) {
  const available = languagesOf(item)
  const resolved = resolveLang(available, lang, opts)
  return {
    value: resolved ? item[resolved] : null,
    lang: resolved,
    available,
    fellBack: Boolean(resolved) && resolved !== lang,
    missing: !available.includes(lang),
  }
}
