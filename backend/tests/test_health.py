"""GET /health -> 200 (acceptance criterion)."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_200():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_api_miss_returns_envelope_not_html():
    """The SPA catch-all must not shadow /api — a miss returns the error envelope."""
    resp = client.get("/api/does-not-exist")
    assert resp.status_code == 404
    body = resp.json()
    assert "error" in body and body["error"]["code"] == "not_found"
