"""Email gateway — the first external call (008), via httpx (principle 4: gateways
own external calls). Owner-notification only (decision 10): no submitter auto-reply.

Provider-agnostic: `EMAIL_API_BASE_URL` is the provider's send endpoint, with the
key/from/to all from `.env` (principle 10 — secrets never in code). The concrete
provider + Tajikistan/CIS deliverability is a DEPLOY decision (same risk class as
the Bunny playback test), so nothing is hard-coded here.

Raises on any failure (not configured, network, non-2xx); the caller (the route)
catches it so a failed send never fails the stored submission (store-and-forward).
"""
import httpx

from app.core.config import settings

_TIMEOUT = 10.0


def _render(submission) -> str:
    """Plain-text body for the owner notification."""
    lines = [
        f"New {submission.type} enquiry ({submission.locale})",
        "",
        f"Name:    {submission.name}",
        f"Email:   {submission.email}",
    ]
    if submission.company:
        lines.append(f"Company: {submission.company}")
    if submission.phone:
        lines.append(f"Phone:   {submission.phone}")
    lines += ["", "Message:", submission.message]
    return "\n".join(lines)


def send_contact_notification(submission) -> None:
    """POST the submission to the configured transactional-email API. Raises if the
    gateway is unconfigured or the call fails; the route catches and logs."""
    if not (settings.email_api_base_url and settings.email_api_key and settings.email_owner_to):
        raise RuntimeError("email gateway not configured")

    payload = {
        "from": settings.email_from,
        "to": settings.email_owner_to,
        "subject": f"New {submission.type} enquiry — {submission.name}",
        "text": _render(submission),
    }
    with httpx.Client(timeout=_TIMEOUT) as client:
        resp = client.post(
            settings.email_api_base_url,
            headers={"Authorization": f"Bearer {settings.email_api_key}"},
            json=payload,
        )
        resp.raise_for_status()
