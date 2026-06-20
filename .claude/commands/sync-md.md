---
description: Sync hand-authored MD masters from Notion into the repo, fetching only files whose Notion timestamp changed (all except BACKEND-Reference.md).
---

Sync the project's hand-authored Markdown masters from Notion into this repo, fetching full content only for files that actually changed. Do NOT git add, commit, or push — I review and commit myself.

Mapping (Notion page ID → repo path):
- 384c62b4be608102806fe0edf8ccb5f1  → CLAUDE.md
- 384c62b4be608166ae1cc68e1b10dfc2  → PRODUCT.md
- 384c62b4be6081e19c69fed1a67494c0  → DESIGN.md
- 384c62b4be60819c82dece414c49e536  → FRONTEND.md
- 384c62b4be6081d1bc5bc1c90b99bffc  → BACKEND-Patterns.md

Manifest: .claude/md-sync.json — a JSON object mapping each repo path to the Notion last-edited timestamp it was last synced from. If it's missing, create it as {} (so the first run syncs everything).

Steps:
1. Read current timestamps cheaply, WITHOUT bodies: call the Notion search tool scoped under the Agent Instructions page (parent page ID 384c62b4be6081d6b30ceb4bc44e7ed6) with highlights off (max_highlight_length = 0). From the results, read each page's id and last-edited timestamp.
2. For each of the five mapped IDs, get its current timestamp: use the value from step 1 if present; if the search didn't return that ID (recall miss), fall back to fetching that page directly just to read its timestamp.
3. A file needs syncing if ANY of: the repo file is missing; it has no manifest entry; or its current Notion timestamp differs from the manifest entry. Otherwise leave it untouched (do NOT fetch its body).
4. For ONLY the files that need syncing: fetch the full Notion page, write its body verbatim to the mapped repo path (strip Notion auto-links like [DESIGN.md](http://DESIGN.md) back to plain text), and record the new timestamp in the manifest.
5. NEVER fetch or write BACKEND-Reference.md — it is code-derived (regenerated from the codebase at ship) and must never be overwritten from Notion.
6. Use the page ID → repo path mapping exactly; do NOT infer filenames from Notion page titles (they differ, e.g. "BACKEND.md — Patterns" → BACKEND-Patterns.md).
7. Save the updated manifest. Run git status and git diff on the changed files. Stop there — no commit.

Report: which files were synced, which were unchanged (skipped without fetching a body), and any that needed the fallback fetch.
