import { CLIENT_LOGOS } from '../lib/clients'
import { LANGS } from '../lib/i18n'
import { usePageContent } from '../lib/usePageContent'
import Container from '../ui/Container'
import { LangLink } from '../ui/LangLink'
import Reveal from '../ui/Reveal'
import { Cell, DataGrid, FormulaBar, Row, Sheet, SheetTabs } from './workbook'

// Desktop about / credentials (005) — the DEBUT of the workbook metaphor. The SAME
// proof data as mobile (bio, stats, logos), presented through the reusable desktop
// workbook layer (decision 10: a different presentation, not the mobile
// components): a floating Sheet with a formula-bar headline, the bio + facts as
// data-grid rows, the proof stats as cells, the client logos as a grid, and sheet
// tabs framing it — all per the DESIGN.md desktop-only addendum. Mounting the Sheet
// is what loads JetBrains Mono (desktop-only). Clean closing CTA band below.
const primaryCta =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed'

// A mono section-label strip inside the Sheet (spreadsheet-flavoured divider).
function SectionLabel({ children }) {
  return (
    <div className="border-t border-strong bg-surface-1 px-3 py-1 font-mono text-wb-xs font-semibold uppercase tracking-wide text-ink-muted">
      {children}
    </div>
  )
}

export default function DesktopAbout({ langs = LANGS }) {
  const { ct, t, fellBack } = usePageContent(langs)
  const a = ct.about
  const wb = a.workbook

  return (
    <div data-testid="desktop-about">
      <Container className="py-16">
        {fellBack && (
          <p data-testid="fallback-notice" className="mb-4 font-sans text-caption text-ink-muted">
            {t.degraded.fallbackNotice}
          </p>
        )}
        <Reveal>
          <Sheet name={wb.sheetName}>
            {/* Formula bar — the active cell's value = the role headline. */}
            <FormulaBar cell={wb.formulaCell}>{a.role}</FormulaBar>

            {/* Body: headshot "named range" | credential facts as data-grid rows. */}
            <div className="grid grid-cols-[minmax(0,15rem)_1fr]">
              <div className="border-r border-strong p-4">
                <img
                  src="/images/headshot.webp"
                  alt={a.name}
                  data-testid="headshot"
                  className="aspect-[4/5] w-full rounded-sm border border-strong object-cover"
                />
                <div className="mt-3 text-wb font-semibold text-ink-primary">{a.name}</div>
                <div className="mt-1 text-wb-sm text-ink-muted">{a.eyebrow}</div>
              </div>
              <div className="p-4">
                <DataGrid columns={[wb.columns.field, wb.columns.value]}>
                  {a.facts.map((f) => (
                    <Row key={f.field}>
                      <Cell header>{f.field}</Cell>
                      <Cell>{f.value}</Cell>
                    </Row>
                  ))}
                </DataGrid>
              </div>
            </div>

            {/* NOTES — the bio, in dense mono. */}
            <SectionLabel>{wb.notesLabel}</SectionLabel>
            <div className="space-y-2 px-4 py-4">
              {a.bio.map((para, i) => (
                <p key={i} className="text-wb-lg leading-relaxed text-ink-secondary">
                  {para}
                </p>
              ))}
            </div>

            {/* PROOF — the stats as data-grid cells. */}
            <SectionLabel>{wb.statsLabel}</SectionLabel>
            <div className="p-4">
              <DataGrid>
                <Row>
                  {a.stats.map((s) => (
                    <Cell key={s.label} align="center" data-stat="true">
                      <div className="text-wb-lg font-semibold text-accent-primary">{s.value}</div>
                      <div className="mt-1 text-wb-xs text-ink-muted">{s.label}</div>
                    </Cell>
                  ))}
                </Row>
              </DataGrid>
            </div>

            {/* CLIENTS — the logo strip as a grid of cells. */}
            <SectionLabel>{a.clientsTitle}</SectionLabel>
            <div className="p-4">
              <DataGrid>
                <Row>
                  {CLIENT_LOGOS.map((c) => (
                    <Cell key={c.name} align="center">
                      <img
                        src={c.src}
                        alt={c.name}
                        data-logo="true"
                        className="mx-auto h-6 w-full object-contain opacity-70 grayscale"
                      />
                    </Cell>
                  ))}
                </Row>
              </DataGrid>
            </div>

            <SheetTabs tabs={wb.tabs} active={wb.tabs[0]} />
          </Sheet>
        </Reveal>
      </Container>

      {/* Closing CTA band -> contact (clean, not workbook). */}
      <section className="border-t border-default bg-surface-inverse">
        <Container className="py-16 text-center">
          <Reveal>
            <h2 className="font-display text-heading font-black tracking-tight text-ink-on-dark">
              {a.closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-on-dark/80">{a.closing.body}</p>
            <div className="mt-8">
              <LangLink to="contact" className={primaryCta}>
                {a.closing.cta}
              </LangLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
