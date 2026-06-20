"""Root /api router. Domain routers mount here as pieces ship.

Baseline at 001: no business endpoints yet. The first domain (contact/quote
store-and-forward) arrives at 008. Routes live under /api/{domain}/{resource}
and return the §3.5 envelope: {"data": ...} / {"error": {"code", "message"}}.
"""
from fastapi import APIRouter

api_router = APIRouter()
