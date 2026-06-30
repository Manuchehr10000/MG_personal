import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useLang, useTranslation } from '../lib/i18n'
import { useReducedMotion } from '../lib/useReducedMotion'
import Footer from '../ui/Footer'
import RecalculatingFlash from './RecalculatingFlash'
import { SHEETS } from './sheets'
import WorkbookSection from './WorkbookSection'
import CommandBar from './workbook/CommandBar'
import FormulaBar from './workbook/FormulaBar'
import NameBox from './workbook/NameBox'
import SheetTabs from './workbook/SheetTabs'
import StatusBar from './workbook/StatusBar'
import TitleBar from './workbook/TitleBar'
import { useWorkbookFont } from './workbook/useWorkbookFont'

// WorkbookFrame — the DESKTOP single-scroll workbook (003 rev.4). The desktop site IS
// one continuous scrolling workbook: every sheet is a stacked section, the sheet-tab
// bar is scroll-spy navigation, and the existing /:lang/<page> routes are PRESERVED —
// a route deep-links by scrolling to its sheet on load, and the sheet in view keeps
// the route in sync. Full workbook chrome (window title, command bar, formula bar +
// name box, status/zoom footer). House React/Vite only; presentational this piece
// (sections are labeled placeholders, command/formula bars have no engine).

// The path within /:lang, e.g. "consulting"; "" for the lang home.
function segmentOf(pathname) {
  return pathname.replace(/^\/[^/]+/, '').replace(/^\//, '')
}
// Map a URL segment to its sheet key; unknown → the overview sheet.
function keyForSegment(seg) {
  return SHEETS.find((s) => s.to === seg)?.key ?? 'overview'
}

export default function WorkbookFrame() {
  // Mounting the workbook is what pulls JetBrains Mono (desktop-only); the frame is
  // lazy with the desktop tree, so the mobile bundle never loads it (decision 11).
  useWorkbookFont()

  const lang = useLang()
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const chrome = t.workbookChrome

  const seg = segmentOf(location.pathname)
  const [activeKey, setActiveKey] = useState(() => keyForSegment(seg))
  // Mirror active in a ref so the scroll-spy / route effects compare without stale
  // closures (and without re-subscribing on every active change).
  const activeRef = useRef(activeKey)
  activeRef.current = activeKey
  const sectionRefs = useRef({})

  const labelFor = (key) => chrome.sheets[key]

  const scrollToKey = useCallback(
    (key) => {
      const el = sectionRefs.current[key]
      if (el && typeof el.scrollIntoView === 'function') {
        try {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
        } catch {
          /* jsdom / unsupported environment — no-op */
        }
      }
    },
    [reduced],
  )

  const syncRoute = useCallback(
    (key) => {
      const sheet = SHEETS.find((s) => s.key === key)
      if (!sheet || sheet.to == null) return // routeless stub (pipeline) — highlight only
      const path = sheet.to ? `/${lang}/${sheet.to}` : `/${lang}`
      if (path !== location.pathname) navigate(path, { replace: true })
    },
    [lang, navigate, location.pathname],
  )

  // Deep-link: scroll to the route's sheet on first mount (route → scroll-to-sheet).
  useEffect(() => {
    scrollToKey(keyForSegment(segmentOf(location.pathname)))
    // first mount only — later route changes are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // External route changes (footer link, browser back/forward, a fresh deep link)
  // move + scroll to the sheet. A change the scroll-spy itself made already updated
  // activeKey, so the key === activeRef guard skips it (no scroll fight, no loop).
  useEffect(() => {
    const key = keyForSegment(seg)
    if (key !== activeRef.current) {
      setActiveKey(key)
      scrollToKey(key)
    }
  }, [seg, scrollToKey])

  // Scroll-spy: the topmost section in view drives the active tab and keeps the route
  // in sync. Guarded for environments without IntersectionObserver (jsdom, SSR).
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const key = visible[0].target.dataset.sheetKey
        if (key && key !== activeRef.current) {
          setActiveKey(key)
          syncRoute(key)
        }
      },
      // Offset the sticky chrome at the top; treat the upper band as "in view".
      { rootMargin: '-180px 0px -55% 0px', threshold: 0 },
    )
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [syncRoute])

  // Tab click → select + smooth-scroll + sync the route.
  const selectKey = (key) => {
    setActiveKey(key)
    scrollToKey(key)
    syncRoute(key)
  }

  const tabs = SHEETS.map((s) => ({ key: s.key, label: labelFor(s.key) }))

  return (
    <div className="flex min-h-dvh flex-col bg-surface-1">
      {/* Sticky workbook chrome: window title → command strip → formula bar + name
          box → scroll-spy sheet-tabs. */}
      <div className="sticky top-0 z-30">
        <TitleBar filename={chrome.filename} />
        <CommandBar />
        <div className="flex items-stretch border-b border-strong bg-surface-0 text-wb">
          <NameBox address={chrome.cell} />
          <FormulaBar showCell={false} className="flex-1 border-b-0">
            {labelFor(activeKey)}
          </FormulaBar>
        </div>
        <SheetTabs tabs={tabs} active={activeKey} onSelect={selectKey} />
      </div>

      {/* The single continuous scroll: every sheet stacked as a labeled placeholder. */}
      <main className="flex-1">
        {SHEETS.map((s) => (
          <WorkbookSection
            key={s.key}
            ref={(el) => {
              if (el) sectionRefs.current[s.key] = el
            }}
            sheetKey={s.key}
            label={labelFor(s.key)}
            body={t.placeholder}
          />
        ))}
        <Footer />
      </main>

      {/* Sticky status / zoom footer (workbook chrome). */}
      <div className="sticky bottom-0 z-30">
        <StatusBar
          ready={chrome.ready}
          sheetCount={SHEETS.length}
          sheetsLabel={chrome.sheetsLabel}
          lang={lang}
          zoom={chrome.zoom}
        />
      </div>

      <RecalculatingFlash />
    </div>
  )
}
