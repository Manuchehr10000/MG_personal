*Scope authority for ghafforzoda.net (MGAC Consulting). Class: Notion-sourced volatile (§4) — scope, in/out, cut list. Derived from the Authority Doc + Roadmap Snapshot; on any conflict, those locked surfaces win. Hand-synced from this Notion master into the repo before build sessions. Holds no status and no current-focus — those live in the Build Tracker.*

---

## What this is

ghafforzoda.net is the rebuild of Manuchehr Ghafforzoda's consulting/training web presence (MGAC Consulting). Its strategic job is a **conversion endpoint for the consulting/training funnel** — kept out of the course-discovery path and measured on conversion, not traffic. Discovery is Instagram-led; consulting is sold face-to-face. The site consumes the content engine's output; it is not itself a discovery channel.

## Audience & surfaces

- Bilingual EN/RU; Tajikistan / CIS; Android-majority.
- Mobile is primary — discover, browse, buy, enquire. Desktop is the post-purchase course player. **Mobile sells, desktop teaches.**

---

## Customer journeys

1. **B2C course** — Instagram (mobile) → mobile site → buy a course → log in on desktop → complete hands-on Excel/Python/SQL.
2. **B2B corporate lead** — HR sees an Instagram post → mobile site → reviews credentials + catalog → fills the contact form.
3. **Consulting** — owner sells face-to-face → sends the link → client takes the free self-check (AI-readiness / data-maturity) → the site stands as proof of expertise.

---

## Offer model — positioning in the data model, not the chrome

- **Consulting:** `price IS NULL` → request-a-quote path. No published prices.
- **Courses:** fixed-price → buy.
- Mobile renders this in plain language; desktop as the workbook.

---

## Phases & scope (dependency-ordered: shell → LMS → diagnostic)

**Phase 1 — Shell.** Home/landing, about/credentials, consulting services (quote path, no prices), courses with prices, EN/RU toggle, placeholder routes for LMS + diagnostic. Includes the contact/quote endpoint — store-and-forward: one FastAPI route + an email-notification gateway + one append-only submissions table. This is the first schema-bearing piece. **Cut from F1:** no lead-management UI — submissions land in the table and trigger an email; the table is read directly until a later piece justifies more.

**Phase 2 — LMS.** Thin, self-built course player + tests. Desktop-only, post-purchase learning. RU-only. Core tables: users, courses, lessons, enrollments, quiz_questions, quiz_attempts, lesson_progress. Single instructor uploads; students log in to their own accounts.

**Phase 3 — Diagnostic.** Corporate self-diagnostic (AI-readiness / data-maturity) — the consulting lead instrument. Scoring logic + KPI definitions are generic, reusable platform IP (Predictory), NOT customized per client.

---

## Language policy

Shell is bilingual EN/RU (a real toggle, replacing the current inline-doubling); language is a property of content, not global site state. Course/LMS content is RU-only for the foreseeable future. The shell handles single-language content from day one (toggle greys/degrades when no EN version exists), so phase 2 needs no retrofit.

---

## Out of scope / cut list (guards)

- **No in-browser code execution** in the LMS — hands-on Excel/Python/SQL happen in the student's own tools. Pyodide / DuckDB-WASM interactive (Brilliant-style) lessons are a flagged phase-2 *expansion*, not locked scope.
- **No Moodle** — evaluated and rejected (PHP/MySQL monolith, incompatible with the house stack, doesn't itself solve video-download protection). The LMS is a thin set of tables + routes in the house stack.
- **No lead-management UI in F1** (see Phase 1).
- **Storefront / catalog / checkout stay in the mobile shell** — not in the desktop player.

---

## Provisional / blocked

- **Video provider — Bunny Stream, provisional,** pending a Tajikistan playback test (BLOCKS phase-2 video pieces). Cloudflare Stream is the fallback. Integrated as a FastAPI gateway.
- **Content model** (services / courses / quote / lesson / progress fields) — kept deliberately provisional; derived from code at spec time via BACKEND-Reference.md, never finalized from mockups.
- LMS enrollment/access + payment handling — specced at phase-2 entry. Diagnostic question set / scoring / output / lead-capture — specced at phase-3 entry.

---

## Canonical authority

The Authority Doc and Roadmap Snapshot (Notion) are canonical for the mandate and locked decisions; this file is the repo-resident scope distillation. On conflict, the locked surfaces win — flag the drift, fix this file.