import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from '../ui/Container'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import { Cell, DataGrid, FormulaBar, Row, Sheet, SheetTabs } from './workbook'

// Desktop pricing (007) — the most literal workbook fit in the shell: the courses
// as a price GRID through the reusable 005 workbook layer (decision 10: a
// different presentation, not the mobile cards). A floating Sheet with a formula-
// bar headline and a DataGrid of COURSE / INCLUDES / PRICE — the price in an
// accent, right-aligned cell — framed by sheet tabs. CONSUMES Sheet/FormulaBar/
// DataGrid/SheetTabs (mirrors DesktopConsulting); does not rebuild them. Closing
// line + enquiry CTA to /contact in a clean band below (checkout = phase 2).
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed'

export default function DesktopPricing({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const p = ct.pricing
  const wb = p.workbook

  return (
    <div data-testid="desktop-pricing">
      <Container className="py-16">
        {fellBack && (
          <p data-testid="fallback-notice" className="mb-4 font-sans text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <Reveal>
          <Sheet name={wb.sheetName}>
            {/* Formula bar — the active cell's value = the page headline. */}
            <FormulaBar cell={wb.formulaCell}>{p.title}</FormulaBar>

            {/* Courses as a price grid: COURSE / INCLUDES / PRICE. */}
            <div className="p-4">
              <DataGrid columns={[wb.columns.course, wb.columns.includes, wb.columns.price]}>
                {p.courses.map((course) => (
                  <Row key={course.name}>
                    <Cell header data-course="true" className="whitespace-nowrap">
                      {course.name}
                    </Cell>
                    <Cell>{course.includes}</Cell>
                    <Cell accent align="right" data-price="true" className="whitespace-nowrap">
                      {course.fixedPrice}
                    </Cell>
                  </Row>
                ))}
              </DataGrid>
            </div>

            <SheetTabs tabs={wb.tabs} active={wb.tabs[0]} />
          </Sheet>
        </Reveal>
      </Container>

      {/* Closing line + enquiry CTA band -> contact (clean, not workbook). */}
      <section className="border-t border-default bg-surface-inverse">
        <Container className="py-16 text-center">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-on-dark">
              {p.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lead text-ink-on-dark/80">{p.closing}</p>
            <div className="mt-8">
              <LangLink to="contact" className={primaryCta}>
                {p.cta}
              </LangLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
