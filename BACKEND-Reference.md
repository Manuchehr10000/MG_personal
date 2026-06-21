# BACKEND-Reference

*Code-derived inventory of the live backend — schema, endpoints, models. Regenerated from the repo at each Ship; never hand-edited (CLAUDE.md §4 rule 1). On any drift between this file and the code, the code wins — regenerate.*

*Generated for piece 008 — Contact page (F1, first schema-bearing piece). State: 2026-06-21.*

---

## Stack (as built)

Python 3.11+ · FastAPI · Pydantic v2 / pydantic-settings · email-validator (EmailStr) · SQLAlchemy 2.x · Alembic · httpx (gateways) · uvicorn. SQLite in dev, Postgres in prod (via `DATABASE_URL`). One FastAPI process serves the JSON API under `/api` and the Vite-built SPA. Sync handlers (sync v1).

## Application layout

```
backend/app/
  main.py            FastAPI app: /health, /api mount, error envelope, SPA static + catch-all
  api/router.py      root /api router; includes the contact domain router
  core/config.py     settings (.env): DATABASE_URL, FRONTEND_DIST, ENVIRONMENT, EMAIL_* 
  core/db.py         engine, SessionLocal, Base, get_db dependency
  core/errors.py     register_error_handlers → maps RequestValidationError to the {error} envelope
  contact/           first business domain (008)
    routes.py        POST /contact (HTTP only); honeypot drop, store-first, best-effort email
    queries.py       create_submission(session, data) — simple ORM insert
    schemas.py       ContactSubmissionIn (+ honeypot), ContactAck
    models.py        Submission (submissions table)
  gateways/
    email.py         send_contact_notification(submission) — httpx, .env-configured owner notification
backend/alembic/     migrations (baseline + submissions)
backend/scripts/start.sh   alembic upgrade head && uvicorn
```

## Endpoints

| Method | Path | Response | Notes |
| --- | --- | --- | --- |
| GET | `/health` | `200 {"status": "ok"}` | Liveness; no auth, no DB |
| POST | `/api/contact` | `200 {"data": {"ok": true}}` | Contact/quote store-and-forward. Validates `ContactSubmissionIn`, inserts a `submissions` row (store-first), then fires a best-effort owner-notification email; email failure is caught/logged and does NOT fail the request. A filled honeypot (`website`) is accepted with `{"data":{"ok":true}}` but stores nothing. |
| — | `/api` | router mounted; contact router included | Domain routes live under `/api/{domain}/{resource}` |
| GET | `/{full_path:path}` | `200` built `index.html` | SPA catch-all; React Router resolves `/en`, `/ru`. Returns `404 {"error": {...}}` for unmatched `/api/*` and `/health`; `503 {"error": {...}}` if the frontend is not built |

API envelope: `{ "data": ... }` on success, `{ "error": { "code", "message" } }` on failure. Request-validation failures (e.g. bad email, missing required field) are returned app-wide as `422 {"error": {"code": "validation_error", "message": ...}}` via `core/errors.register_error_handlers`.

## Database

### Models

**`Submission`** → table `submissions` (append-only; the contact route inserts, nothing updates/deletes — read directly, no lead-management UI).

| Column | Type | Constraints |
| --- | --- | --- |
| `id` | Integer | PK |
| `created_at` | DateTime(timezone=True) | NOT NULL, server default `now()` |
| `name` | String(200) | NOT NULL |
| `email` | String(320) | NOT NULL |
| `message` | Text | NOT NULL |
| `type` | String(20) | NOT NULL — `quote` \| `corporate` \| `general` (enforced by the schema) |
| `locale` | String(2) | NOT NULL — `en` \| `ru` (enforced by the schema) |
| `company` | String(200) | nullable |
| `phone` | String(50) | nullable |

Registered on `Base.metadata` (imported in `alembic/env.py` for autogenerate). Portable types only — applies on SQLite (dev) and Postgres (prod).

### Migrations (Alembic)

| Revision | Down-revision | Summary |
| --- | --- | --- |
| `0001_baseline` | — | Empty baseline. Alembic version row only; no tables. |
| `0002_submissions` | `0001_baseline` | Creates `submissions` (the first business table). Hand-written + reviewed (principle 8). |

`alembic upgrade head` applies `0001` → `0002` cleanly on SQLite. The DB URL is read from app settings (`core/config.py`) in `alembic/env.py`; `target_metadata = Base.metadata`.

## External gateways

**`gateways/email.py` — `send_contact_notification(submission)`.** Provider-agnostic transactional-email call via `httpx.Client` (the first gateway). Reads `EMAIL_API_BASE_URL` (the provider send endpoint), `EMAIL_API_KEY`, `EMAIL_FROM`, `EMAIL_OWNER_TO` from settings (`.env`; secrets never in code). Owner-notification only (no submitter auto-reply). Raises if unconfigured or on a non-2xx/network failure; the contact route catches it so a failed send never fails the stored submission (store-and-forward). The concrete provider + Tajikistan/CIS deliverability is a deploy decision — not hard-coded.

### Config (`.env`)

`DATABASE_URL`, `ENVIRONMENT`, `FRONTEND_DIST` (from 001) plus `EMAIL_API_BASE_URL`, `EMAIL_API_KEY`, `EMAIL_FROM`, `EMAIL_OWNER_TO` (008, all default empty → gateway is a no-op that raises "not configured", and submissions still store).

---

*Grows as schema-bearing pieces ship. 008 adds the first business domain (contact), the first business table (`submissions`), the first external gateway (email), and the app-wide validation-error envelope. Course/LMS tables + video gateway arrive at Phase 2.*
