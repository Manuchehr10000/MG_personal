// Shared page-level i18n behaviour (002), lifted above the breakpoint fork (003)
// so the mobile and desktop presentations reuse one mechanism (FRONTEND.md:
// "shared below the fork: ... hooks"). A page passes the languages its route
// exists in; the hook declares them to the toggle and resolves the language to
// actually render (page-level fallback). Presentation stays per-tree; this is the
// logic both trees share.

import { resolveLang } from './content'
import { getDict, LANGS, useTranslation } from './i18n'
import { useDeclareLanguages } from './languageAvailability'

export function usePageContent(langs = LANGS) {
  const { lang, t } = useTranslation()

  // Tell the toggle which languages this route exists in (grey/disable the rest).
  useDeclareLanguages(langs)

  // Page-level fallback: render the available language when the active one is absent.
  const contentLang = resolveLang(langs, lang, { fallback: true }) ?? lang

  return {
    lang, // active (URL) language — for chrome/notices
    t, // dictionary in the active language
    contentLang, // language the body is actually rendered in
    ct: getDict(contentLang), // dictionary for the body
    fellBack: contentLang !== lang,
  }
}
