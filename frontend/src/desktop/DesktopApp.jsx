import { Navigate, Route, Routes } from 'react-router-dom'

import { useLang } from '../lib/i18n'
import DesktopDiagnostic from './DesktopDiagnostic'
import WorkbookFrame from './WorkbookFrame'

// Desktop presentation tree (003 rev.4) — lazy-loaded so this code never ships in the
// mobile bundle (decision 11). The desktop site IS one continuous scrolling workbook:
// every shell route ('', consulting, about, courses, contact, and any unknown path)
// renders the SAME WorkbookFrame, which deep-links to the matching sheet and keeps the
// route ↔ sheet in sync. Two routes branch away from the workbook: /pricing folds into
// /courses (redirect), and /diagnostic is a standalone coming-soon (009, not a sheet).
// Because every workbook route matches the single `path="*"`, the frame stays mounted
// as the route syncs while scrolling (no remount-on-scroll).
export default function DesktopApp() {
  const lang = useLang()
  return (
    <Routes>
      <Route path="pricing" element={<Navigate to={`/${lang}/courses`} replace />} />
      <Route path="diagnostic" element={<DesktopDiagnostic />} />
      <Route path="*" element={<WorkbookFrame />} />
    </Routes>
  )
}
