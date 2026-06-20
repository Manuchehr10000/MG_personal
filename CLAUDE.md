*Conventions for building ghafforzoda.net. Class: stable contract (§4) — authored once, rarely touched. This is the operating contract for Claude Code (the builder) in this repo; the chat-side planning/validation stance lives in the project instructions, not here. Derived from the Scout Build Playbook / Build Workflow; on conflict, the Build Workflow (Notion) wins. Holds no status or current focus — those live in the Build Tracker.*

---

## How a piece gets built

Claude Code builds one tracker piece at a time via `/build-piece <row URL>`. Per piece:

1. Fetch the tracker row. Verify before building — STOP and flag if any check fails: Status is 📋 SPECCED; every "Depends on" piece is ✅ LIVE; the MD files named in the row's Sync-first note exist locally.
2. Execute the agent command embedded in the row body exactly as written. **Build facts come from local MD files only — do not fetch any other Notion page mid-build.**
3. If anything in the MD files conflicts with the command, STOP and flag — never reconcile silently.
4. Regenerate BACKEND-Reference.md from the actual codebase (what exists, not what was planned).
5. Produce the Schema Delta Report: EXPECTED / UNDECLARED (flag each) / BREAKING (flag loudly) / BLOCKER if anything touches tables gated by open decisions. Run tests. Report. **STOP** — do not commit, push, or touch Notion.
6. Only after the owner confirms: commit → push → flip the row to ✅ LIVE. **Push before flip — a piece is never LIVE unpushed.**

Two Notion touches per piece, ever: fetch the row at start, flip its Status after confirmation. Nothing else mid-build.

---

## Stack

Python 3.11+ · FastAPI · Pydantic v2 · SQLAlchemy (simple single-table CRUD) + raw SQL (JOINs / aggregations / window functions) · Alembic (all migrations) · httpx (external calls, gateways only) · SQLite in dev → PostgreSQL in prod. Frontend: React · Tailwind (config-driven tokens) · Recharts. Full-stack single repo; backend follows the house service pattern (routes → queries → engine, gateways for external calls).

## Where the conventions live — this file does not duplicate them

- **BACKEND-Patterns.md** — the ten backend principles, per-domain service shape, API envelope (`/api/{domain}/{resource}`, `{ \"data\": ... }` / `{ \"error\": { code, message } }`, list params), Alembic discipline, sync→async path.
- **FRONTEND.md** — React/Tailwind conventions, SPA served by FastAPI, the breakpoint fork, i18n path-prefix.
- **DESIGN.md** — the terracotta/cream token system + discipline rules.
- **BACKEND-Reference.md** — the live schema + endpoints, code-derived; never hand-edit.

---

## Scope & guardrails

- Build only what the row's command specifies. Out-of-scope items are named later pieces — do not pull them forward.
- Never spec or build schema from memory or Notion — BACKEND-Reference.md (from the repo) is the only truth about what exists. For a non-schema piece, ground on DESIGN.md + FRONTEND.md.
- Reference is regenerated, never hand-written; a regenerated doc can launder a deviation into "documented reality" — the Schema Delta Report exists to catch it first.
- Respect phase order: shell → LMS → diagnostic. No phase-2 video work until the Bunny Tajikistan playback test passes.
- Every agent command carries an IP note. The diagnostic's scoring / KPI logic is generic reusable IP, not per-client.
- No auto-creation of files or Notion pages. Status flips and any non-row Notion write happen only on explicit owner instruction.

---

## Canonical authority

The Build Workflow (Notion — the project's Scout Build Playbook instance) is canonical for the loop; the Build Tracker is the only status surface. This file is the repo-resident builder contract. On conflict, the Build Workflow wins.