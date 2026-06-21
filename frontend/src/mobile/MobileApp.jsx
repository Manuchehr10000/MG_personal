import { Navigate, Route, Routes } from 'react-router-dom'

import { pageLanguages } from '../lib/i18n'
import Footer from '../ui/Footer'
import Header from './Header'
import Home from './Home'
import Placeholder from './Placeholder'
import TabBar from './TabBar'

// Mobile presentation tree — the primary, touch-first experience. Layout chrome
// (003): header (wordmark + 002 toggle), the six shell destinations, a shared
// footer, and the native bottom tab bar. Routes are relative to /:lang. Each
// placeholder declares the languages its route exists in (pageLanguages) so the
// framework greys the toggle / falls back per content (002).
export default function MobileApp({ lang }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="consulting"
            element={<Placeholder titleKey="consulting" langs={pageLanguages.consulting} />}
          />
          <Route
            path="about"
            element={<Placeholder titleKey="about" langs={pageLanguages.about} />}
          />
          <Route
            path="courses"
            element={<Placeholder titleKey="courses" langs={pageLanguages.courses} />}
          />
          <Route
            path="pricing"
            element={<Placeholder titleKey="pricing" langs={pageLanguages.pricing} />}
          />
          <Route
            path="contact"
            element={<Placeholder titleKey="contact" langs={pageLanguages.contact} />}
          />
          {/* Unknown path under a valid lang -> back to that lang's home. */}
          <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
        </Routes>
      </main>
      <Footer />
      <TabBar />
    </div>
  )
}
