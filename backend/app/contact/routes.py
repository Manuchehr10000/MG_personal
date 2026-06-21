"""Contact routes — HTTP only (principle 1). Mounted at /api/contact.

Store-and-forward (decision 10): INSERT first (the table is the source of truth),
THEN fire the owner-notification email best-effort. A failed send is caught and
logged — it never fails the request or the user's success state.
"""
import logging

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.contact import queries
from app.contact.schemas import ContactAck, ContactSubmissionIn
from app.core.db import get_db
from app.gateways.email import send_contact_notification

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("")
def create_contact(payload: ContactSubmissionIn, db: Session = Depends(get_db)):
    # Honeypot: a filled `website` means a bot — accept silently, store nothing.
    if payload.website:
        return {"data": ContactAck().model_dump()}

    # Store first — the submission persists regardless of email outcome.
    submission = queries.create_submission(db, payload)

    # Best-effort owner notification; any failure is non-fatal (store-and-forward).
    try:
        send_contact_notification(submission)
    except Exception:  # noqa: BLE001 — a failed send must not fail the request
        logger.exception("contact notification email failed for submission %s", submission.id)

    return {"data": ContactAck().model_dump()}
