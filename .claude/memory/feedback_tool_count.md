---
name: Tool count auto-derives — no manual count edits
description: Home-page tool/snippet counts interpolate LIVE_TOOLS.length and SNIPPET_COUNT; do not hand-edit numbers
type: feedback
originSessionId: 92e683b1-fc16-4ab6-8ceb-0ee6fada5fbf
---
The home page (`src/app/page.js`) no longer hardcodes the tool count. It derives everything:

- `const LIVE_TOOL_COUNT = LIVE_TOOLS.length;` (line ~11) — used via `${LIVE_TOOL_COUNT}` in metadata.description, openGraph, twitter, websiteSchema, both FAQ answers, seoData title/description, and feature/category cards.
- `import { SNIPPET_COUNT } from '@/lib/snippet-count';` — drives all snippet-count strings the same way.

**Why:** This was previously 8 hardcoded strings; it has since been refactored to interpolate from the registry. Registering a tool in `src/lib/tools-registry.js` with `status: 'live'` automatically updates the count everywhere.

**How to apply:** When adding/removing a tool, just add/remove its `tools-registry.js` entry. Do NOT grep-and-replace count numbers in page.js — there are none to change. See [[project_new_tool_checklist]] (note: that checklist's manual Sidebar/sitemap steps are also outdated — the registry is the single source of truth for sidebar, sitemap, and llms.txt).
