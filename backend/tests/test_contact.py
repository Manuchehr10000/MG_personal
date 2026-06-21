"""Contact store-and-forward endpoint (008).

Covers: a valid submission stores + returns ok; a failed email STILL stores
(store-and-forward); the honeypot drops silently; invalid bodies surface the
§3.5 error envelope; and the Alembic migration creates `submissions` on SQLite.
"""
import os
import subprocess
import sqlite3
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.contact.models import Submission
from app.core.db import Base, get_db
from app.main import app

BACKEND_DIR = Path(__file__).resolve().parents[1]

# One shared in-memory DB (StaticPool keeps a single connection) so the route's
# session and the test's inspection session see the same tables/rows.
engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
    future=True,
)
TestSession = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


@pytest.fixture(autouse=True)
def _schema():
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)


@pytest.fixture
def client():
    def override_get_db():
        db = TestSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


VALID = {
    "name": "Aziz R.",
    "email": "aziz@example.com",
    "message": "We need a forecasting model.",
    "type": "quote",
    "locale": "en",
    "company": "Acme LLC",
}


def test_valid_submission_stores_and_returns_ok(client, monkeypatch):
    sent = {}
    monkeypatch.setattr(
        "app.contact.routes.send_contact_notification",
        lambda submission: sent.update(id=submission.id),
    )
    resp = client.post("/api/contact", json=VALID)

    assert resp.status_code == 200
    assert resp.json() == {"data": {"ok": True}}
    with TestSession() as s:
        rows = s.query(Submission).all()
        assert len(rows) == 1
        assert rows[0].email == "aziz@example.com"
        assert rows[0].type == "quote"
        assert rows[0].locale == "en"
        assert rows[0].company == "Acme LLC"
        assert rows[0].phone is None
    assert sent.get("id") == rows[0].id  # email gateway was invoked


def test_email_failure_still_stores_and_succeeds(client, monkeypatch):
    """Store-and-forward: a failed send must not fail the request or the insert."""

    def boom(submission):
        raise RuntimeError("email provider down")

    monkeypatch.setattr("app.contact.routes.send_contact_notification", boom)
    resp = client.post("/api/contact", json={**VALID, "locale": "ru"})

    assert resp.status_code == 200
    assert resp.json() == {"data": {"ok": True}}
    with TestSession() as s:
        assert s.query(Submission).count() == 1


def test_honeypot_drops_silently(client, monkeypatch):
    called = {}
    monkeypatch.setattr(
        "app.contact.routes.send_contact_notification",
        lambda submission: called.update(x=True),
    )
    resp = client.post("/api/contact", json={**VALID, "website": "http://spam.example"})

    assert resp.status_code == 200
    assert resp.json() == {"data": {"ok": True}}
    with TestSession() as s:
        assert s.query(Submission).count() == 0  # nothing stored
    assert "x" not in called  # and no email sent


def test_invalid_email_returns_error_envelope(client):
    resp = client.post("/api/contact", json={**VALID, "email": "not-an-email"})
    assert resp.status_code == 422
    body = resp.json()
    assert "error" in body
    assert body["error"]["code"] == "validation_error"
    assert "email" in body["error"]["message"]


def test_missing_required_fields_returns_error_envelope(client):
    resp = client.post("/api/contact", json={"email": "a@b.com", "locale": "en"})
    assert resp.status_code == 422
    assert resp.json()["error"]["code"] == "validation_error"


def test_health_still_ok(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_alembic_upgrade_head_creates_submissions(tmp_path):
    """`alembic upgrade head` applies the first business migration cleanly on SQLite."""
    db_path = tmp_path / "alembic.db"
    env = {**os.environ, "DATABASE_URL": f"sqlite:///{db_path}"}
    result = subprocess.run(
        [sys.executable, "-m", "alembic", "upgrade", "head"],
        cwd=BACKEND_DIR,
        env=env,
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0, result.stderr

    con = sqlite3.connect(db_path)
    try:
        tables = {row[0] for row in con.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        cols = {row[1] for row in con.execute("PRAGMA table_info(submissions)")}
    finally:
        con.close()
    assert "submissions" in tables
    assert {"id", "created_at", "name", "email", "message", "type", "locale", "company", "phone"} == cols
