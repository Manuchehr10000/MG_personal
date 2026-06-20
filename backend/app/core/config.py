"""Application configuration — all settings via .env (principle 10)."""
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Repo root: backend/app/core/config.py -> parents[3] == repo root.
REPO_ROOT = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # SQLite in dev, Postgres in prod — switch via .env, schema stays portable.
    database_url: str = "sqlite:///./dev.db"

    # Where the Vite build lands; FastAPI serves this directory.
    frontend_dist: str = str(REPO_ROOT / "frontend" / "dist")

    environment: str = "dev"


settings = Settings()
