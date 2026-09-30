# Session Memory

- When creating a new tool in this project, add it in test mode only. Do not add new tools directly to live mode unless the user explicitly asks for live mode.
- Do not start test/dev servers unless the user explicitly asks.
- Do not run builds unless the user explicitly asks.

## UI Snippets — Goal

The UI snippets library isn't just a gallery of copy-paste components. The goal is
a collection developers genuinely **enjoy learning, editing, and experimenting
with** — snippets that teach real UI development skills by being fun and
rewarding to open, tweak, and break on purpose. That means covering **both
latest and historical JS libraries and techniques** (Snap.svg, Rough.js, Muuri,
and Popmotion are as valid as this month's newest release), and "everything out
there in UI development," not just whatever's currently trending.

They also have to be genuinely **usable and reusable** — production-quality code
a developer can actually drop into a real project (via the React/Vue/Angular/
Tailwind export or copy-paste), not just a learning toy. Premium quality means
both: teaches something real *and* holds up as a component someone would
actually ship.

When asked to create new UI snippets (e.g. "create next 20 ui snippets"):
1. Check `ui-snippets-ideas/ideas1.txt` first for what's already queued — don't
   invent topics from scratch. If the queue is thin or stale, audit the library
   (category/library balance, what's overbuilt vs. underbuilt) before picking.
2. Build every snippet to **premium quality**: real working code (verify with
   `node --check` + a headless smoke test, not a full build), genuinely correct
   technical behavior (verify claims against the real library/API, not
   assumption), and full SEO content — title, description, `about`, `howToUse`,
   `features`, `useCases` (with real cross-links to related snippets), `faqs`,
   and `aiPrompt`.
3. Register in `snippets.js` (imports + entries — **entries go at the end of
   the `SNIPPETS` array**, never the top), `snippet-tag-map.js`, and bump
   `SNIPPET_COUNT` in `snippet-count.js`.
4. Generate preview PNGs after creating them: `node scripts/capture-snippet-previews.mjs <id-prefix>`.
5. Update `ui-snippets-ideas/ideas1.txt` to mark finished items `[x]` with
   `-> <snippet-id>`, so it stays an accurate picture of what's done and next.
