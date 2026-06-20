"""FastAPI app: JSON API under /api, /health liveness, and the Vite-built SPA.

Mount order matters (BACKEND-Patterns "Serving the frontend"):
/health and /api are registered first; the SPA catch-all is registered last so
it never shadows an API route. Client-side React Router resolves /en, /ru, and
deeper paths off the served index.html.
"""
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.core.config import settings

app = FastAPI(title="ghafforzoda.net")


@app.get("/health")
def health():
    """Liveness probe — no auth, no DB."""
    return {"status": "ok"}


# JSON API — mounted before the SPA catch-all.
app.include_router(api_router, prefix="/api")


FRONTEND_DIST = Path(settings.frontend_dist)
ASSETS_DIR = FRONTEND_DIST / "assets"
INDEX_HTML = FRONTEND_DIST / "index.html"

# Hashed Vite assets (JS/CSS/images). Only mounted once a build exists.
if ASSETS_DIR.is_dir():
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")


@app.get("/{full_path:path}")
def spa_catch_all(full_path: str):
    """Serve the SPA index for any non-API path so React Router can route it."""
    # Guard: never let the catch-all answer API/health misses with HTML.
    if full_path == "health" or full_path == "api" or full_path.startswith("api/"):
        return JSONResponse(
            status_code=404,
            content={"error": {"code": "not_found", "message": "Resource not found"}},
        )
    if INDEX_HTML.is_file():
        return FileResponse(INDEX_HTML)
    # Frontend not built yet — make the cause obvious in dev.
    return JSONResponse(
        status_code=503,
        content={
            "error": {
                "code": "frontend_not_built",
                "message": "Run the Vite build (cd frontend && npm run build).",
            }
        },
    )
