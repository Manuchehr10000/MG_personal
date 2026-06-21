*Stable contract (Scout Build Playbook §4) — frontend conventions for ghafforzoda.net. Authored from §3.5 + the Authority Doc locked decisions (no frontend code survives the rebuild — locked decision 9). Born in chat, mastered here, hand-copied into the repo by the owner. Authored 2026-06-20.*

---

## Stack & rendering model

- React + Tailwind, in the single full-stack repo (locked decisions 1, 6, 9). The existing static HTML/CSS/JS site is discarded as code; only DESIGN.md tokens survive.
- SPA built by Vite, served as static assets by FastAPI. No SSR, no meta-framework — locked decision 5 makes the site a conversion endpoint, not a discovery channel, so there is no SEO/SSR motive.
- JSON API under `/api`, §3.5 envelope: `{ "data": ... }` on success (lists add `"meta": { total, page, per_page }`), `{ "error": { code, message } }` on failure. List endpoints take `page`, `per_page`, filter params, `sort_by`, `sort_dir` — applied in SQL.
- Charting library: Recharts (§3.5) — DEFERRED; no consumer in the shell. Matches the deferred chart tokens in DESIGN.md.

---

## Routing & i18n

- React Router. Language is a URL segment: `/:lang/...` with `lang ∈ { en, ru }` (e.g. `/en/consulting`, `/ru/consulting`). The toggle is a real route swap, replacing the current inline-doubling (locked decision 4).
- Language is a property of content, not global site state (decision 4). UI strings come from per-locale dictionaries (`en`, `ru`); dynamic content (services, courses) carries its own language from the API.
- Graceful degradation (decision 4): when no EN version of a piece of content exists, fall back to RU and grey/disable the EN toggle for that content. The shell handles single-language content from day one, so phase 2 (RU-only courses) needs no retrofit.
- Two degradation modes (formalized at 002): a content *item* present in one language only **hides cleanly** (no layout break); a *page/route* absent in a language **falls back** to the available language. One reusable mechanism plus a single translation accessor provide both, so every later shell page (003–008) gets it for free.

---

## Breakpoint fork

- Mobile and desktop are different presentations, not the same components (locked decision 10). Mobile is primary; the desktop workbook is an expressive enhancement layer over the same data.
- A single top-level breakpoint switch mounts EITHER the mobile tree OR the desktop tree over a shared data/logic layer. The mobile bundle never ships workbook code; mobile never renders the spreadsheet metaphor (decision 11).
- Shared below the fork: data model, API client, hooks, i18n, design tokens. Forked above it: the two presentation trees.

---

## Mobile presentation rules (locked decision 11)

- Clean, native-feeling, touch-first, Android-friendly. NOT an iOS imitation: no SF-only fonts, no liquid-glass blur, no fake device chrome.
- Native bottom tab bar: ≤5 fixed items, ≥48px touch targets. When destinations exceed the tab budget (the shell has six — Home, About, Consulting, Courses, Pricing, Contact), use ~4 primary tabs + a More overflow entry, never a hamburger/drawer (settled at 003).
- Plain-language CTAs ("Request a quote") — no metaphor.
- Flat per DESIGN.md (borders, not shadows).

---

## Desktop presentation (workbook)

- The workbook/spreadsheet metaphor is the deliberate desktop-only differentiator and expertise signal (decisions 11, 12). JetBrains Mono, dense grid, expressive shadows — all per the DESIGN.md desktop-only addendum.
- F1 builds the mobile conversion path only; desktop workbook components are later pieces. This file fixes the architecture; component specs come per piece.

---

## Positioning encoded in the model (locked decisions 12, 14)

- Presentation reads the data model; it does not hardcode the offer type.
- Consulting: `price IS NULL` → render the quote path ("Request a quote").
- Courses: fixed price → render price + buy.
- Mobile renders this in plain language/layout; desktop as the workbook.

---

## Project structure

```
src/
  lib/        ← API client (typed, envelope-aware), shared types, hooks, i18n dictionaries
  ui/         ← shared primitives, styled from DESIGN.md tokens via the Tailwind config
  mobile/     ← mobile presentation tree
  desktop/    ← desktop presentation tree (workbook)
tailwind.config ← single source for DESIGN.md tokens; no separate stylesheets
```

---

## Data layer (F1 scope)

- Typed fetch client honoring the §3.5 envelope; small React hooks per resource. Defer TanStack Query until a piece justifies caching.
- F1 calls: read services/courses (content), POST a quote submission (store-and-forward — locked decision 10).
- The content model (services / courses / quote fields) is deliberately provisional and code-derived at spec time (Authority open questions). This file fixes fetch/render conventions and the envelope, NOT the concrete field list — field truth comes from BACKEND-Reference.md once the schema-bearing piece ships.

---

*Authored as a forward commitment. Conventions here are extracted from decisions actually made; component-level specs arrive per tracker piece.*