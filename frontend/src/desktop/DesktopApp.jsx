import { Navigate, Route, Routes } from 'react-router-dom'

import { pageLanguages, useLang } from '../lib/i18n'
import Footer from '../ui/Footer'
import DesktopAbout from './DesktopAbout'
import DesktopConsulting from './DesktopConsulting'
import DesktopHome from './DesktopHome'
import DesktopNav from './DesktopNav'
import DesktopPlaceholder from './DesktopPlaceholder'

// Desktop presentation tree — lazy-loaded so this code never ships in the mobile
// bundle (decision 11). 003 builds the clean desktop layout chrome: sticky
// scroll-nav, the six routed destinations, and the shared footer. The
// workbook/spreadsheet metaphor (JetBrains Mono, grid, expressive shadows) is a
// later piece and is deliberately NOT loaded here.
export default function DesktopApp() {
  const lang = useLang()
  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      <DesktopNav />
      <main className="flex-1">
        <Routes>
          <Route index element={<DesktopHome />} />
          <Route
            path="consulting"
            element={<DesktopConsulting langs={pageLanguages.consulting} />}
          />
          <Route path="about" element={<DesktopAbout langs={pageLanguages.about} />} />
          <Route
            path="courses"
            element={<DesktopPlaceholder titleKey="courses" langs={pageLanguages.courses} />}
          />
          <Route
            path="pricing"
            element={<DesktopPlaceholder titleKey="pricing" langs={pageLanguages.pricing} />}
          />
          <Route
            path="contact"
            element={<DesktopPlaceholder titleKey="contact" langs={pageLanguages.contact} />}
          />
          <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
