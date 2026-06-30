import { Navigate, Route, Routes } from 'react-router-dom'

import { pageLanguages } from '../lib/i18n'
import ComingSoon from '../ui/ComingSoon'
import Footer from '../ui/Footer'
import Header from './Header'
import Placeholder from './Placeholder'
import TabBar from './TabBar'

// Mobile presentation tree (003 rev.4) — the primary, touch-first experience; stays
// ROUTE-BASED (one native screen per route + bottom tab bar), NOT the desktop's
// single-scroll workbook (decision 11). This piece renders each route as a labeled
// PLACEHOLDER screen — the old page bodies (home/about/consulting/contact) are
// superseded; their content returns per later sheet piece. /:lang/pricing folds into
// /:lang/courses (redirect). Each placeholder declares the languages its route exists
// in (pageLanguages) so the 002 toggle greys / falls back per content.
export default function MobileApp({ lang }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<Placeholder titleKey="home" langs={pageLanguages['']} />} />
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
            path="contact"
            element={<Placeholder titleKey="contact" langs={pageLanguages.contact} />}
          />
          {/* Pricing folds into courses (003 rev.4). */}
          <Route path="pricing" element={<Navigate to={`/${lang}/courses`} replace />} />
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
