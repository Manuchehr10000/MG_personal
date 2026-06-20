---
description: Sync the hand-authored MD masters from Notion into the repo (all except BACKEND-Reference.md).
---

Sync the project's hand-authored Markdown masters from their Notion pages into this repo. For each page below, fetch it via the Notion MCP and write its body to the mapped repo path. Then show me what changed. Do NOT git add, commit, or push — I review and commit myself.

Page ID → repo path:
- 384c62b4be608102806fe0edf8ccb5f1  → CLAUDE.md
- 384c62b4be608166ae1cc68e1b10dfc2  → PRODUCT.md
- 384c62b4be6081e19c69fed1a67494c0  → DESIGN.md
- 384c62b4be60819c82dece414c49e536  → FRONTEND.md
- 384c62b4be6081d1bc5bc1c90b99bffc  → BACKEND-Patterns.md

Rules:
- NEVER fetch or write BACKEND-Reference.md. It is code-derived (regenerated from the codebase at ship) and must never be overwritten from Notion.
- Use the page ID → repo path mapping exactly. Do NOT infer filenames from Notion page titles — the titles differ (e.g. "BACKEND.md — Patterns" maps to BACKEND-Patterns.md).
- Write each page's body verbatim to its file (not the page title). If the Notion markdown auto-linked a filename like [DESIGN.md](http://DESIGN.md), strip it back to plain DESIGN.md.
- Per file: if it already matches, report "unchanged"; if different or missing, overwrite/create it and report "updated"/"created".
- After writing, run git status and git diff on the changed files and summarize per file. Stop there — no commit.
