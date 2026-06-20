import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'

import { DEFAULT_LANG, getDict, isLang } from './lib/i18n'
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

  if (breakpoint === 'desktop') {
    return (
      <Suspense fallback={null}>
        <DesktopApp lang={lang} />
      </Suspense>
    )
  }
  return <MobileApp lang={lang} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default-language redirect at the root. */}
        <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
        <Route path="/:lang/*" element={<LangApp />} />
      </Routes>
    </BrowserRouter>
  )
}
