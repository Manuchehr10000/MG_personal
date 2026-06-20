"""Database engine + session. Queries take a `session` param so the sync->async
move later changes types, not SQL (BACKEND-Patterns: sync v1 -> async later)."""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

# check_same_thread only matters for SQLite dev; no-op for Postgres.
connect_args = (
    {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
)

engine = create_engine(settings.database_url, connect_args=connect_args, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

# Shared declarative base; domain models register their metadata here so Alembic
# autogenerate can see them. No business tables at 001.
Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a session, always closed (principle 6)."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
