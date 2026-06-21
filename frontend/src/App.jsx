import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'

import { DEFAULT_LANG, getDict, isLang } from './lib/i18n'
import { LanguageAvailabilityProvider } from './lib/languageAvailability'
import { useBreakpoint } from './lib/useBreakpoint'
import MobileApp from './mobile/MobileApp'

// Desktop workbook is lazy-loaded so the mobile bundle never ships workbook code
// (decision 11). F1 only builds the mobile path; this is a thin placeholder.
const DesktopApp = lazy(() => import('./desktop/DesktopApp'))

function LangApp() {
  const { lang } = useParams()
  const breakpoint = useBreakpoint()

  // Keep <html lang> in sync with the URL segment.
  useEffect(() => {
    if (isLang(lang)) document.documentElement.lang = getDict(lang).htmlLang
  }, [lang])

  // Unknown language segment -> default-language redirect.
  if (!isLang(lang)) return <Navigate to={`/${DEFAULT_LANG}`} replace />

  // The per-content language framework (002) is shared below the breakpoint fork:
  // the availability provider feeds the toggle in either presentation tree.
  return (
    <LanguageAvailabilityProvider>
      {breakpoint === 'desktop' ? (
        <Suspense fallback={null}>
          <DesktopApp />
        </Suspense>
      ) : (
        <MobileApp lang={lang} />
      )}
    </LanguageAvailabilityProvider>
  )
}

// Route tree without a router, so tests can mount it in a MemoryRouter.
export function AppRoutes() {
  return (
    <Routes>
      {/* Default-language redirect at the root. */}
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
      <Route path="/:lang/*" element={<LangApp />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
