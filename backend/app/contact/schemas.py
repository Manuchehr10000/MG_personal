"""Contact API contracts (Pydantic) — request/response shapes only.

Schemas are NOT models (principle 2): this is the HTTP contract, separate from
the SQLAlchemy `Submission` table. Server-side validation lives here — required
fields, EmailStr, length caps, and the closed `type`/`locale` sets.
"""
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field

SubmissionType = Literal["quote", "corporate", "general"]
Locale = Literal["en", "ru"]


class ContactSubmissionIn(BaseModel):
    """Inbound contact/quote form. Bots are filtered by the `website` honeypot
    (a real submitter leaves it empty); the route silently drops a filled one."""

    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    type: SubmissionType = "general"
    locale: Locale
    company: Optional[str] = Field(default=None, max_length=200)
    phone: Optional[str] = Field(default=None, max_length=50)
    # Honeypot — hidden in the UI; humans never fill it, naive bots do.
    website: str = ""


class ContactAck(BaseModel):
    """Minimal success acknowledgement — no submission echoed back."""

    ok: bool = True
