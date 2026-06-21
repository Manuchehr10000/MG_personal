"""Contact SQLAlchemy model — the first business table (008).

`submissions` is APPEND-ONLY (decision 10 store-and-forward): the route inserts;
nothing updates or deletes. The table is the source of truth and is read directly
— no lead-management UI (decision 10 scope-creep line). Types stay portable
(SQLite dev / Postgres prod): no engine-specific columns.
"""
from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.core.db import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    name = Column(String(200), nullable=False)
    email = Column(String(320), nullable=False)
    message = Column(Text, nullable=False)
    # Closed sets mirrored from schemas (quote | corporate | general; en | ru).
    type = Column(String(20), nullable=False)
    locale = Column(String(2), nullable=False)
    company = Column(String(200), nullable=True)
    phone = Column(String(50), nullable=True)
