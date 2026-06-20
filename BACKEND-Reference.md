# BACKEND-Reference

*Code-derived inventory of the live backend — schema, endpoints, models. Regenerated from the repo at each Ship; never hand-edited (CLAUDE.md §4 rule 1). On any drift between this file and the code, the code wins — regenerate.*

*Generated for piece 001 — Foundation: stack scaffold + repo/migration. State: 2026-06-21.*

---

## Stack (as built)

Python 3.11+ · FastAPI · Pydantic v2 / pydantic-settings · SQLAlchemy 2.x · Alembic · uvicorn. SQLite in dev, Postgres in prod (via `DATABASE_URL`). One FastAPI process serves the JSON API under `/api` and the Vite-built SPA.

## Application layout

```
backend/app/
  main.py            FastAPI app: /health, /api mount, SPA static + catch-all
  api/router.py      root /api router (no domain routes yet)
  core/config.py     settings (.env): DATABASE_URL, FRONTEND_DIST, ENVIRONMENT
  core/db.py         engine, SessionLocal, Base, get_db dependency
backend/alembic/     migrations (baseline only)
backend/scripts/start.sh   alembic upgrade head && uvicorn
```

## Endpoints

| Method | Path | Response | Notes |
| --- | --- | --- | --- |
| GET | `/health` | `200 {"status": "ok"}` | Liveness; no auth, no DB |
| — | `/api` | router mounted, **no routes** | First domain (contact/quote) arrives at 008 |
| GET | `/{full_path:path}` | `200` built `index.html` | SPA catch-all; React Router resolves `/en`, `/ru`. Returns `404 {"error": {...}}` for unmatched `/api/*` and `/health` so the API is never shadowed; `503 {"error": {...}}` if the frontend is not built |

API envelope (convention, no list endpoints yet): `{ "data": ... }` on success, `{ "error": { "code", "message" } }` on failure.

## Database

### Models

None. `Base` is declared in `core/db.py`; no domain models are registered. **No business tables** (per 001 scope).

### Migrations (Alembic)

| Revision | Down-revision | Summary |
| --- | --- | --- |
| `0001_baseline` | — | Empty baseline. Establishes the Alembic version row only; no tables. |

`alembic upgrade head` applies `0001_baseline` cleanly on SQLite. The DB URL is read from app settings (`core/config.py`) in `alembic/env.py`; `target_metadata = Base.metadata` (empty) for future autogenerate.

## External gateways

None. (Email-notification gateway arrives at 008; video gateway at Phase 2.)

---

*Near-empty by design: 001 stands up plumbing with no business schema. This inventory grows as schema-bearing pieces ship.*
