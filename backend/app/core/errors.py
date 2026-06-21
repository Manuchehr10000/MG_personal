"""Shared error handling — map framework errors onto the §3.5 envelope so the API
speaks one shape: {"error": {"code", "message"}}. Registered on the app in main.py.

The first consumer is the contact form (008): a bad email / missing field must
surface as the envelope, not FastAPI's default 422 body.
"""
from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


def register_error_handlers(app) -> None:
    @app.exception_handler(RequestValidationError)
    def _on_validation_error(request: Request, exc: RequestValidationError):
        errors = exc.errors()
        first = errors[0] if errors else None
        if first:
            # Drop the leading "body" segment for a readable field path.
            loc = ".".join(str(p) for p in first.get("loc", ()) if p != "body")
            msg = first.get("msg", "Invalid request")
            message = f"{loc}: {msg}" if loc else msg
        else:
            message = "Invalid request"
        return JSONResponse(
            status_code=422,
            content={"error": {"code": "validation_error", "message": message}},
        )
