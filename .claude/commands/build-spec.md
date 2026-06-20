---
description: Build a ghafforzoda.net piece from its Notion Build Tracker row.
argument-hint: <Build Tracker row URL>
---

Build a ghafforzoda.net piece from its Notion Build Tracker row.

Row: $ARGUMENTS

1. Fetch the Build Tracker row above via the Notion MCP.
2. Verify before building — STOP and report if any check fails:
   - Status is 📋 SPECCED
   - every piece listed in "Depends on" is ✅ LIVE in the tracker
   - the MD files named in the row's Sync-first note exist locally
3. Execute the agent command embedded in the row body exactly as written. Build facts come from local MD files only — do not fetch any other Notion page.
4. Regenerate BACKEND-Reference.md from the actual codebase (schema, endpoints, models — what exists, not what was planned).
5. Run git diff on BACKEND-Reference.md and compare against the schema/endpoint changes declared in the tracker row. Output a Schema Delta Report: EXPECTED (declared and present), UNDECLARED (changed but not in the spec — flag each), BREAKING (modified/removed pre-existing schema — flag loudly). BLOCKER if anything touches tables gated by open product decisions.
6. Run tests. Report Schema Delta Report + test results. STOP. Do not commit, push, or touch Notion.
7. Only after I reply confirming: commit and push directly to `main` — do not create a new branch (`git checkout main` if not already on it, commit, then `git push origin main`). Then update the row's Status property to "✅ LIVE" via the Notion MCP. Push before flip — a piece is never LIVE unpushed.
