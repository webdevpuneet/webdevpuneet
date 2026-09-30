---
name: project-content-audit
description: Multi-session initiative to give every tool page and UI snippet the comprehensive-content SEO treatment; tracked in content-audit.md
metadata: 
  node_type: memory
  type: project
  originSessionId: c998e8a2-9eff-448c-8d9a-1240899ea587
  modified: 2026-07-18T17:56:32.051Z
---

Started 2026-07-02: user wants the same comprehensive SEO content treatment mesh-gradient-generator got (deep-dive About, expanded Features, How-to-Use, comparison tables/callouts where they fit, Use Cases, FAQs) applied to all 182 tool pages, then all 442+ UI snippet pages, one at a time.

**Why:** even though every tool page already sits at 1,000–5,600 words with the standard About/Features/HowTo/UseCases/FAQ shape (confirmed via audit — none are broken/thin), the user wants every page pushed further: more comparison tables, callouts, and deep-dive prose, both for organic SEO and for AdSense text-to-code ratio (see [feedback_seo_adsense_text_ratio](feedback_seo_adsense_text_ratio.md)).

**Decisions locked in:**
- Order: tool pages first, then UI snippets.
- Sequence: strict newest-first by `lastmod` in `src/lib/tools-registry.js` (confirmed explicitly — do NOT reorder by thinness even though newest tools already have good content).
- Tracking: `content-audit.md` at repo root is the source of truth checklist — mark `[x]` per page as it's completed, bump that tool's `lastmod`, log in DEVLOG.md.
- Structure: do NOT copy the exact same section template onto every page — see [feedback_seo_per_tool_structure](feedback_seo_per_tool_structure.md). Pick whichever SeoSection section types fit each specific tool.

**How to apply:** at the start of any future session touching this work, read `content-audit.md` first to see what's done and what's next in the newest-first order, rather than re-deriving the tool list from scratch.

**2026-07-17 addition:** every UI snippet's `seo` object also needs an `aiPrompt` field (paragraph + copy-paste recreate-it prompt, tailored per-snippet) rendering a "Build, Understand, Optimize, and Extend It With AI" section — see the "UI Snippets only" subsection in `content-audit.md` for the exact shape. Implemented in `SeoSection`/`normalizeSections` (supports `<pre>` blocks inside `text` sections now).

**2026-07-17 status:** user asked to roll this out to all 684 snippet files at once (not gradually with Phase 2). Did 3 by hand, then launched 14 parallel background subagents (batches of ~49 files each) to do the rest. Hit an account-wide session limit twice mid-run (first reset 12:40pm IST, resuming all 14 at once pushed a second reset to 7pm IST) — 429/684 done when the user chose to stop for the session rather than keep waiting. One agent edit briefly broke the build (`mega-menu-panel.js`, extra `}`) caught via the user's pasted Next.js build error, not self-caught by the agent's own `node --check` claim — worth an independent full `node --check *.js` sweep after any future batch run rather than trusting individual agents' self-reports. Remaining ~255 filenames + resume guidance are in `content-audit.md`'s "UI Snippets only" section.

**2026-07-18 update:** redesigned the rendering into a real `aiPrompt` section type (`AiPromptSection` + `PromptCodeBox` in `SeoSection/index.js`) — a boxed card with a macOS-dot code window and a working Copy button, placed right after About — since the original `<pre>`-inside-text-section hack rendered as plain undecorated text. Resumed content rollout with 7 smaller background batches (~37 files each, learned from the "14 at once burns the quota" lesson above) — finished all 684/684 (2 of the last batches hit the account's *monthly spend cap*, a harder stop than the earlier session limit — raise it at claude.ai/settings/usage if this recurs — but their work had already landed by then). Separately, promoted 161 of 238 noindex dev snippets to live first (audit-passing only), then — per explicit user instruction to make **all** dev snippets live regardless — promoted the final 77 too. `SNIPPET_COUNT` is now 684 (0 remaining noindex). 54 of those final 77 are known to be short only on About-text length (330-399 words vs. 400 floor); full id list is in `content-audit.md` for a future content pass. New script: `scripts/check-specific-snippets.mjs <file-of-ids>` re-checks specific snippets against the same bar without needing `noindex` still present.
