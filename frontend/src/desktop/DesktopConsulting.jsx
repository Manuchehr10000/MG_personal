import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from '../ui/Container'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import { Cell, DataGrid, FormulaBar, Row, Sheet, SheetTabs } from './workbook'

// Desktop consulting (006) — ADOPTS the reusable 005 workbook layer (decision 12:
// the workbook is the expertise signal for consulting prospects). The SAME four
// service blocks as mobile, presented through the workbook (decision 10: a
// different presentation, not the mobile components): a floating Sheet with a
// formula-bar headline, the services as data-grid rows (SERVICE / WHAT YOU GET),
// and sheet tabs framing it. CONSUMES Sheet/FormulaBar/DataGrid/SheetTabs — does
// not rebuild them. Closing line + quote CTA to /contact in a clean band below
// (no prices — decision 14).
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed'

export default function DesktopConsulting({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const c = ct.consulting
  const wb = c.workbook

  return (
    <div data-testid="desktop-consulting">
      <Container className="py-16">
        {fellBack && (
          <p data-testid="fallback-notice" className="mb-4 font-sans text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <Reveal>
          <Sheet name={wb.sheetName}>
            {/* Formula bar — the active cell's value = the page headline. */}
            <FormulaBar cell={wb.formulaCell}>{c.title}</FormulaBar>

            {/* Services as data-grid rows. */}
            <div className="p-4">
              <DataGrid columns={[wb.columns.service, wb.columns.detail]}>
                {c.services.map((s) => (
                  <Row key={s.title}>
                    <Cell header data-service="true" className="whitespace-nowrap">
                      {s.title}
                    </Cell>
                    <Cell>{s.body}</Cell>
                  </Row>
                ))}
              </DataGrid>
            </div>

            <SheetTabs tabs={wb.tabs} active={wb.tabs[0]} />
          </Sheet>
        </Reveal>
      </Container>

      {/* Closing line + quote CTA band -> contact (clean, not workbook). */}
      <section className="border-t border-default bg-surface-inverse">
        <Container className="py-16 text-center">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-on-dark">
              {c.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lead text-ink-on-dark/80">{c.closing}</p>
            <div className="mt-8">
              <LangLink to="contact" className={primaryCta}>
                {c.cta}
              </LangLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
