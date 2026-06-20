import { Navigate, Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Placeholder from './Placeholder'
import TabBar from './TabBar'

// Mobile presentation tree — the primary, touch-first experience and the only
// presentation F1 builds out. Routes are relative to /:lang (mounted at
// /:lang/* in App).
export default function MobileApp({ lang }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      <Header lang={lang} />
      <main className="flex-1">
        <Routes>
          <Route index element={<Home lang={lang} />} />
          <Route path="consulting" element={<Placeholder lang={lang} titleKey="consulting" />} />
          <Route path="about" element={<Placeholder lang={lang} titleKey="about" />} />
          <Route path="courses" element={<Placeholder lang={lang} titleKey="courses" />} />
          <Route path="contact" element={<Placeholder lang={lang} titleKey="contact" />} />
          {/* Unknown path under a valid lang -> back to that lang's home. */}
          <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
        </Routes>
      </main>
      <TabBar lang={lang} />
    </div>
  )
}
