import { useTranslation } from '../lib/i18n'
import { LangNavLink } from '../ui/LangLink'

// Native bottom tab bar: 5 fixed items, >=48px touch targets, plain-language
// labels, flat (decision 11 / DESIGN.md). No metaphor on mobile. Language-aware
// links keep the active language across navigation.
export default function TabBar() {
  const { t } = useTranslation()
  const items = [
    { to: '', label: t.nav.home, end: true },
    { to: 'consulting', label: t.nav.consulting },
    { to: 'about', label: t.nav.about },
    { to: 'courses', label: t.nav.courses },
    { to: 'contact', label: t.nav.contact },
  ]

  return (
    <nav className="sticky bottom-0 z-10 grid grid-cols-5 border-t border-default bg-surface-0">
      {items.map((item) => (
        <LangNavLink
          key={item.to || 'home'}
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
        </LangNavLink>
      ))}
    </nav>
  )
}
