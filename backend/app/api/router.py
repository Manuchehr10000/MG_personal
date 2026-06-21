"""Root /api router. Domain routers mount here as pieces ship.

The first domain (contact/quote store-and-forward) arrives at 008 → /api/contact.
Routes live under /api/{domain}/{resource} and return the §3.5 envelope:
{"data": ...} / {"error": {"code", "message"}}.
"""
from fastapi import APIRouter

from app.contact.routes import router as contact_router

api_router = APIRouter()
api_router.include_router(contact_router)
