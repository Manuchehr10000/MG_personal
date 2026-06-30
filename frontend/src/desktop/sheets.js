// The desktop workbook's stacked sheet sections + scroll-spy tab order (003 rev.4 /
// FRONTEND.md sheet order). DESKTOP-ONLY: the single-scroll workbook IS the desktop
// site, and each entry is one stacked section plus one scroll-spy tab. `to` is the
// path within /:lang that deep-links to the sheet (route → scroll-to-sheet on load;
// sheet-in-view ↔ route synced). `to: null` is a routeless deferred stub (the
// Pipeline sheet — LMS/diagnostic teasers, a later piece): it gets a section + a tab
// but never drives the URL (highlight-only). Labels are localized in
// i18n.workbookChrome.sheets. This is a DISTINCT model from lib/nav DESTINATIONS (the
// mobile route-based tabs + footer); the surfaces diverge by design (decisions 10/11)
// — pricing folds into courses, and the Pipeline stub exists on desktop only.
export const SHEETS = [
  { key: 'overview', to: '' },
  { key: 'consulting', to: 'consulting' },
  { key: 'about', to: 'about' },
  { key: 'courses', to: 'courses' },
  { key: 'pipeline', to: null },
  { key: 'contact', to: 'contact' },
]
