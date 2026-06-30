// The MOBILE route-based navigation model (003 rev.4): the bottom tab bar + footer
// destinations. `to` is the path within a language (consumed by LangNavLink); `key`
// indexes the per-locale nav labels in lib/i18n. `primary` marks the mobile
// bottom-tab-bar slots; non-primary destinations live behind the mobile "More"
// entry (FRONTEND.md mobile rules: ~4 primary + More, ≤5 slots). The shell has five
// destinations — Pricing folds into Courses (redirect), so it is no longer a tab.
// The DESKTOP single-scroll workbook uses its own section model (desktop/sheets.js),
// which the two surfaces deliberately diverge on (decisions 10 / 11).

export const DESTINATIONS = [
  { key: 'home', to: '', primary: true },
  { key: 'courses', to: 'courses', primary: true },
  { key: 'consulting', to: 'consulting', primary: true },
  { key: 'contact', to: 'contact', primary: true },
  { key: 'about', to: 'about', primary: false },
]

// Mobile primary tabs (Home, Courses, Consulting, Contact) — exactly the bottom
// bar's fixed slots alongside the "More" overflow.
export const PRIMARY = DESTINATIONS.filter((d) => d.primary)

// Behind "More" on mobile (About). Shown inline on desktop footer.
export const OVERFLOW = DESTINATIONS.filter((d) => !d.primary)
