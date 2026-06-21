import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useTranslation } from '../lib/i18n'
import { OVERFLOW, PRIMARY } from '../lib/nav'
import { LangNavLink } from '../ui/LangLink'

// Native bottom tab bar (003): 4 primary tabs (Home, Courses, Consulting,
// Contact) + a "More" entry for the overflow destinations (About, Pricing).
// ≤5 slots, ≥48px targets, flat (decision 11 / DESIGN.md). NOT a hamburger/drawer
// — More opens a small flat sheet directly above the bar. Language-aware links
// keep the active language across navigation (002). The language toggle lives in
// the header, not here.
const tabClass = (active) =>
  [
    'flex h-14 min-h-12 items-center justify-center text-caption font-semibold',
    active ? 'text-accent-primary' : 'text-ink-muted',
  ].join(' ')

export default function TabBar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Path within the language, e.g. "about" — used to highlight More when an
  // overflow destination is the active route.
  const within = location.pathname.replace(/^\/[^/]+/, '').replace(/^\//, '')
  const overflowActive = OVERFLOW.some((d) => d.to === within)

  return (
    <>
      {open && (
        <>
          {/* Tap-catcher: tapping outside the sheet closes it. */}
          <button
            type="button"
            aria-label={t.nav.more}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div
            role="menu"
            className="fixed inset-x-0 bottom-14 z-20 border-t border-default bg-surface-0"
          >
            {OVERFLOW.map((d) => (
              <LangNavLink
                key={d.key}
                to={d.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'flex h-12 min-h-12 items-center px-5 text-body font-semibold',
                    isActive ? 'text-accent-primary' : 'text-ink-secondary',
                  ].join(' ')
                }
              >
                {t.nav[d.key]}
              </LangNavLink>
            ))}
          </div>
        </>
      )}

      <nav className="sticky bottom-0 z-30 grid grid-cols-5 border-t border-default bg-surface-0">
        {PRIMARY.map((d) => (
          <LangNavLink
            key={d.key}
            to={d.to}
            end={d.to === ''}
            onClick={() => setOpen(false)}
            className={({ isActive }) => tabClass(isActive)}
          >
            {t.nav[d.key]}
          </LangNavLink>
        ))}
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={tabClass(open || overflowActive)}
        >
          {t.nav.more}
        </button>
      </nav>
    </>
  )
}
