import { Navigate, Route, Routes } from 'react-router-dom'

import { pageLanguages } from '../lib/i18n'
import ComingSoon from '../ui/ComingSoon'
import Footer from '../ui/Footer'
import About from './About'
import Consulting from './Consulting'
import Contact from './Contact'
import Header from './Header'
import Home from './Home'
import Placeholder from './Placeholder'
import Pricing from './Pricing'
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
          <Route path="consulting" element={<Consulting langs={pageLanguages.consulting} />} />
          <Route path="about" element={<About langs={pageLanguages.about} />} />
          <Route
            path="courses"
            element={<Placeholder titleKey="courses" langs={pageLanguages.courses} />}
          />
          <Route path="pricing" element={<Pricing langs={pageLanguages.pricing} />} />
          <Route path="contact" element={<Contact langs={pageLanguages.contact} />} />
          {/* Standalone diagnostic coming-soon (009) — footer-reachable, not a tab. */}
          <Route
            path="diagnostic"
            element={<ComingSoon contentKey="diagnostic" langs={pageLanguages.diagnostic} />}
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
