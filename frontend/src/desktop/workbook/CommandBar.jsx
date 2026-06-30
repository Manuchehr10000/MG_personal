import { useTranslation } from '../../lib/i18n'
import LanguageToggle from '../../ui/LanguageToggle'

// CommandBar — the workbook command strip (003 rev.4): refresh / data / export, plus
// the 002 language toggle on the right. PRESENTATIONAL this piece — the command
// buttons are no-ops (no engine); real actions land per later sheet. Flat surface
// step + border (DESIGN.md), mono chrome. New component.
export default function CommandBar() {
  const { t } = useTranslation()
  const c = t.workbookChrome.commands
  const btn = 'px-2 py-1 font-semibold text-ink-secondary hover:text-accent-primary'
  return (
    <div
      data-workbook="command-bar"
      className="flex items-center justify-between border-b border-strong bg-surface-2 px-3 py-1"
    >
      <div className="flex items-center gap-1 font-mono text-wb-sm">
        <button type="button" className={btn} aria-label={c.refresh}>
          ↻ {c.refresh}
        </button>
        <span className="text-ink-faint" aria-hidden="true">
          ·
        </span>
        <button type="button" className={btn}>
          {c.data}
        </button>
        <span className="text-ink-faint" aria-hidden="true">
          ·
        </span>
        <button type="button" className={btn}>
          {c.export}
        </button>
      </div>
      <LanguageToggle />
    </div>
  )
}
