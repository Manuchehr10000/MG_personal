"""FastAPI serves the Vite-built placeholder home at /en and /ru (acceptance).

Requires a frontend build (frontend/dist/index.html). Run `npm run build` in
/frontend first; these tests are skipped if no build is present so the backend
suite still runs standalone.
"""
import pytest
from fastapi.testclient import TestClient

from app.core.config import settings
from app.main import app
from pathlib import Path

client = TestClient(app)

_HAS_BUILD = (Path(settings.frontend_dist) / "index.html").is_file()
needs_build = pytest.mark.skipif(not _HAS_BUILD, reason="frontend not built")


@needs_build
@pytest.mark.parametrize("path", ["/en", "/ru", "/en/", "/ru/"])
def test_spa_served_for_lang_paths(path):
    resp = client.get(path)
    assert resp.status_code == 200
    assert "text/html" in resp.headers["content-type"]
    # The Vite SPA mounts into <div id="root">.
    assert 'id="root"' in resp.text


@needs_build
def test_root_serves_spa_shell():
    resp = client.get("/")
    assert resp.status_code == 200
    assert "text/html" in resp.headers["content-type"]
