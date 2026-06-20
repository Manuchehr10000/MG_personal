# ghafforzoda.net

Consulting/training web presence for Manuchehr Ghafforzoda (MGAC Consulting) —
the conversion endpoint for the consulting/training funnel. Bilingual EN/RU,
mobile-primary. **Mobile sells, desktop teaches.**

Single full-stack repo:

```
backend/    FastAPI · SQLAlchemy · Alembic — JSON API under /api, serves the SPA build
frontend/   React · Vite · Tailwind — mobile (primary) + desktop (workbook) trees
```

The house-stack conventions live in the repo-root MD files: `PRODUCT.md`
(scope), `BACKEND-Patterns.md`, `FRONTEND.md`, `DESIGN.md` (tokens), and the
code-derived `BACKEND-Reference.md`.

## Architecture (Phase 1 — Shell)

- **Backend** — FastAPI, `routes → queries → engine` pattern, gateways for
  external calls (none yet). SQLAlchemy + Alembic for all schema; **no business
  tables at 001**. `GET /health → 200`. The JSON API lives under `/api`; the
  Vite build is served as static assets with a catch-all to `index.html` so
  client-side React Router resolves `/en` and `/ru`.
- **Frontend** — React + Tailwind SPA built by Vite (Node at build time only, no
  Node runtime in prod). React Router with `/:lang` path prefixes (`en`, `ru`)
  and a default-language redirect. UI strings come from per-locale dictionaries;
  content degrades gracefully when a locale is missing. A single breakpoint fork
  mounts the **mobile** tree (primary) or the lazy-loaded **desktop** workbook
  tree — the mobile bundle never ships workbook code.
- **Design** — terracotta/cream tokens live only in `frontend/tailwind.config.js`
  (theme extension), sourced from `DESIGN.md`. Palette unchanged.

## Prerequisites

- Python 3.11+
- Node 20+ (build time only)

## Run locally

### 1. Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # SQLite by default
alembic upgrade head            # applies the empty baseline
uvicorn app.main:app --reload   # http://localhost:8000  (/health, /api)
```

Or use the entrypoint, which migrates then serves:

```bash
./scripts/start.sh
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173, proxies /api + /health to :8000
```

### Production-style serve (FastAPI serves the built SPA)

```bash
cd frontend && npm run build     # -> frontend/dist
cd ../backend && ./scripts/start.sh
# http://localhost:8000/en and /ru are served by FastAPI
```

## Tests

```bash
cd backend && pytest
```

- `alembic upgrade head` applies cleanly on SQLite.
- `GET /health` returns 200.
- FastAPI serves the Vite-built home at `/en` and `/ru` (these tests require a
  prior `npm run build`; they skip if no build is present).

## Deployment — static → single-VM migration (replaces Vercel)

The site was a pure-static, Vercel-deployed bundle. Phase 1 moves it to a
**single cloud VM running the Python host**, where one FastAPI process serves
both the API and the built SPA. Vercel is retired.

**Migration path:**

1. **Build the SPA** — `cd frontend && npm run build` produces `frontend/dist`
   (static assets; no Node at runtime).
2. **Provision the VM** — any small Linux VM (provider is the programmers'
   call). Install Python 3.11+ and a process manager (systemd or a container
   runtime).
3. **Database** — `DATABASE_URL` in `.env` points at SQLite in dev and at
   **Postgres** in prod. Schema is portable; only the URL changes.
4. **Boot** — `backend/scripts/start.sh` runs `alembic upgrade head` then
   `uvicorn`. Front it with a reverse proxy (nginx/Caddy) for TLS on
   `ghafforzoda.net`.
5. **Cutover** — point DNS at the VM, drop the Vercel project.

No CDN/static-host split is required: FastAPI serves `frontend/dist` directly.
A reverse proxy or CDN cache in front is an optional later optimization.
