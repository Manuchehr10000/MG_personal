#!/usr/bin/env bash
# Production/dev entrypoint: apply migrations, then boot the API.
# Alembic owns schema — migrations run before app start, never create_all().
set -euo pipefail

cd "$(dirname "$0")/.."

alembic upgrade head
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}"
