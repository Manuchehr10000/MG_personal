*Stable contract (Scout Build Playbook §4) — the terracotta/cream editorial system. Born in chat, mastered here, hand-copied into the repo by the owner. Token system per Playbook §3.5; values extracted from the v4 design assets and reconciled to the discipline rules. Reconciled 2026-06-20.*

---

## Design philosophy

- Editorial, warm, flat — print-like restraint, not SaaS-dashboard chrome.
- One accent (terracotta) carries every interactive element. Semantic colour is status only, never styling.
- Mobile is the primary, native, touch-first, Android-friendly experience — NOT an iOS imitation (no SF-only fonts, no liquid-glass blur, no fake device chrome).
- The workbook/spreadsheet metaphor is a deliberate desktop-only differentiator and expertise signal (see Desktop-only addendum).
- Flat elevation everywhere — borders and surface steps, not shadows — save the desktop workbook's one named expressive exception.

---

## Colour tokens

All colours are Tailwind theme extensions with semantic names — config-driven; overrides via config, never separate stylesheets.

### Accent — single-accent system

- `accent-primary` `#C2613A` — terracotta; every interactive element
- `accent-soft` `#E89B72` — hover / light tint
- `accent-pressed` `#A8522F` — active / deep
- `accent-secondary`, `accent-tertiary` — UNSET. The system is monochromatic-accent; do not invent.

### Surface — cream ramp (lightest → deepest)

- `surface-0` `#FBFAF4`
- `surface-1` `#F4F1E8` — base / page
- `surface-2` `#ECE8DC` — raised / alt
- `surface-3` `#E7E3D8`
- `surface-4` `#E2DCCD`
- `surface-inverse` `#2B2925` — dark ground
- `surface-inverse-deep` `#211F1B`

### Text — ink ramp

- `text-primary` `#14130F` — ink
- `text-secondary` `#5C584E`
- `text-muted` `#8A857A`
- `text-faint` `#A8A296`
- `text-on-dark` `#F4F1E8`

### Border

- `border-default` `#DCD7C7`
- `border-strong` `#C9C3B0`

### Semantic — status only, never styling

- `semantic-success` `#7FA86B`
- `semantic-danger` `#A8322B`
- `semantic-warning` — DEFERRED; define at the first status surface that needs it
- `semantic-info` — DEFERRED; same

### Chart series

- `chart-1` … `chart-6` — DEFERRED. No charting consumer until the LMS/diagnostic phases. Do not populate before a piece needs them. Single charting library: Recharts (§3.5).

---

## Typography

### Families

- **Satoshi** — display: hero, headings, section heads, stat figures, logo wordmark.
- **DM Sans** — body, UI, running text.
- **JetBrains Mono** — desktop-only, tied to the workbook metaphor (see addendum). Never loaded on mobile.
- Hanken Grotesk — REMOVED (legacy; do not reintroduce).

### Weights — three only

- `400` — body / running text
- `600` — UI emphasis, labels, logo, subheads
- `900` — Satoshi display

### Type scale — six steps (shared surface)

- `caption` 12px / line-height 1.4 — labels, captions
- `body` 15px / 1.5 — running text, UI
- `lead` 18px / 1.45 — lead paragraph
- `subhead` 24px / 1.15 — section subheads
- `heading` 38px / 1.05 — section headings
- `display` 46px / 1.0 — hero

Display and headings use tight tracking (~−0.03em). The desktop workbook's dense 10–13px mono grid text is NOT part of this scale (addendum).

---

## Spacing & layout

- 8px spacing base; 4px half-step permitted. All margin / padding / gap steps on this base.
- Flat elevation: separate with borders (`border-default` / `border-strong`) and surface steps, not shadows.
- Terracotta rule-accents use an inset-border technique (e.g. `inset 3–4px 0 0 #C2613A`) — a flat border, not elevation.

---

## Desktop-only addendum — the workbook metaphor

Mounts only at the desktop breakpoint; mobile never renders any of it.

- JetBrains Mono for grid / cell / formula text.
- Dense type sizes (10–13px) for grid rows — outside the shared six-step scale.
- Expressive shadows permitted here ONLY — the named flat-elevation exception: deep soft drops (e.g. `0 30–50px 80–110px rgba(0,0,0,0.4–0.7)`) on floating panels.
- Spreadsheet chrome: formula bar, sheet tabs, data-grid cells.

The shared colour, type, and spacing tokens above still apply; only the mono family, the dense scale, and expressive shadows are addendum-specific.

---

*Source of truth for tokens is this master. The v4 HTML is discarded as code (locked decision 9); only its token values survive, harvested here.*