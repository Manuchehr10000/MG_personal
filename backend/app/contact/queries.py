"""Contact data access — simple ORM CRUD (principle 3), session passed in
(sync v1; the eventual async move changes types, not SQL)."""
from app.contact.models import Submission
from app.contact.schemas import ContactSubmissionIn


def create_submission(session, data: ContactSubmissionIn) -> Submission:
    """Insert one append-only submission and return it (store-first)."""
    submission = Submission(
        name=data.name,
        email=str(data.email),
        message=data.message,
        type=data.type,
        locale=data.locale,
        company=data.company,
        phone=data.phone,
    )
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return submission
