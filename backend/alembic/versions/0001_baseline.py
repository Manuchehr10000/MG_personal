"""baseline — empty schema

The foundation migration. 001 stands up DB plumbing with no business tables
(BACKEND-Patterns: "Baseline (empty) migration at 001"). The first business
table (contact/quote submissions) arrives in a later migration at piece 008.

Revision ID: 0001_baseline
Revises:
Create Date: 2026-06-21
"""
from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "0001_baseline"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Intentionally empty — establishes the Alembic version baseline only.
    pass


def downgrade() -> None:
    pass
