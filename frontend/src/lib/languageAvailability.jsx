// Toggle availability context (002). The base language toggle lives in the header
// — above the page content — so it needs a way to learn whether the *current*
// page/content has an other-language version, to grey/disable itself (no dead
// route). A page declares its languages via useDeclareLanguages; the toggle reads
// them via useLanguageAvailability. Default is all languages, so an ordinary
// bilingual page needs no wiring and the toggle just works.

import { createContext, useContext, useEffect, useState } from 'react'

import { LANGS } from './i18n'

const LanguageAvailabilityContext = createContext(null)

export function LanguageAvailabilityProvider({ children }) {
  const [available, setAvailable] = useState(LANGS)
  return (
    <LanguageAvailabilityContext.Provider value={{ available, setAvailable }}>
      {children}
    </LanguageAvailabilityContext.Provider>
  )
}

// Languages the current page/content exists in (defaults to all when unset, i.e.
// outside a provider or before any page declares).
export function useLanguageAvailability() {
  const ctx = useContext(LanguageAvailabilityContext)
  return ctx ? ctx.available : LANGS
}

// A page/route declares which languages its content exists in. Resets to all
// languages on unmount so the next page starts bilingual unless it says otherwise.
export function useDeclareLanguages(langs) {
  const ctx = useContext(LanguageAvailabilityContext)
  const key = langs.join(',')
  useEffect(() => {
    if (!ctx) return
    ctx.setAvailable(langs)
    return () => ctx.setAvailable(LANGS)
    // key tracks the contents of `langs`; ctx is stable from the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, key])
}
