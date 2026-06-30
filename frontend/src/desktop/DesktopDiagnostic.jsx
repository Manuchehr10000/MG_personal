import { pageLanguages, useTranslation } from '../lib/i18n'
import ComingSoon from '../ui/ComingSoon'
import Container from '../ui/Container'
import Footer from '../ui/Footer'
import { LangLink } from '../ui/LangLink'
import LanguageToggle from '../ui/LanguageToggle'

// DesktopDiagnostic — the standalone diagnostic coming-soon on desktop (009). The
// diagnostic is NOT a workbook sheet: it is reached by a direct/footer link (journey
// 3), so it renders OUTSIDE the single-scroll workbook in a minimal flat desktop
// frame (brand + 002 toggle + the shared coming-soon + footer). Keeps the 002 toggle
// and footer reachability working without the workbook chrome.
export default function DesktopDiagnostic() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      <header className="sticky top-0 z-30 border-b border-default bg-surface-0">
        <Container className="flex h-16 items-center justify-between">
          <LangLink
            to=""
            className="font-display text-lead font-semibold tracking-tight text-ink-primary"
          >
            {t.brand}
          </LangLink>
          <LanguageToggle />
        </Container>
      </header>
      <main className="flex-1">
        <ComingSoon contentKey="diagnostic" langs={pageLanguages.diagnostic} />
      </main>
      <Footer />
    </div>
  )
}
