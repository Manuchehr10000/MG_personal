import { NavLink } from 'react-router-dom'

import { getDict } from '../lib/i18n'

// Native bottom tab bar: 5 fixed items, >=48px touch targets, plain-language
// labels, flat (decision 11 / DESIGN.md). No metaphor on mobile.
export default function TabBar({ lang }) {
  const t = getDict(lang)
  const items = [
    { to: `/${lang}`, label: t.nav.home, end: true },
    { to: `/${lang}/consulting`, label: t.nav.consulting },
    { to: `/${lang}/about`, label: t.nav.about },
    { to: `/${lang}/courses`, label: t.nav.courses },
    { to: `/${lang}/contact`, label: t.nav.contact },
  ]

  return (
    <nav className="sticky bottom-0 z-10 grid grid-cols-5 border-t border-default bg-surface-0">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              'flex h-14 min-h-12 items-center justify-center text-caption font-semibold',
              isActive ? 'text-accent-primary' : 'text-ink-muted',
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
