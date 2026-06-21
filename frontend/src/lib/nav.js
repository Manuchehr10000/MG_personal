// Single source of the shell's navigation destinations (003), shared below the
// breakpoint fork so the mobile bottom tab bar and the desktop scroll-nav stay in
// lockstep. `to` is the path within a language (consumed by LangNavLink); `key`
// indexes the per-locale nav labels in lib/i18n. `primary` marks the mobile
// bottom-tab-bar slots; non-primary destinations live behind the mobile "More"
// entry (FRONTEND.md mobile rules / the 003 spec: ~4 primary + More, ≤5 slots).

export const DESTINATIONS = [
  { key: 'home', to: '', primary: true },
  { key: 'courses', to: 'courses', primary: true },
  { key: 'consulting', to: 'consulting', primary: true },
  { key: 'contact', to: 'contact', primary: true },
  { key: 'about', to: 'about', primary: false },
  { key: 'pricing', to: 'pricing', primary: false },
]

// Mobile primary tabs (Home, Courses, Consulting, Contact) — exactly the bottom
// bar's fixed slots alongside the "More" overflow.
export const PRIMARY = DESTINATIONS.filter((d) => d.primary)

// Behind "More" on mobile (About, Pricing). Shown inline on desktop.
export const OVERFLOW = DESTINATIONS.filter((d) => !d.primary)
