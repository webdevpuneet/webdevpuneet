---
name: project-seo-test-snippets
description: "COMPLETED 2026-06-26 — all dev-mode (noindex) UI snippets audited and made live; see scripts/audit-dev-snippets.mjs"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8d4305db-14dd-40fa-8ff0-b15ff5e349bb
---

All 10 snippets with `noindex: true` are missing `seo:` blocks and fall back to generic tool-about copy. Task: write a full `seo:` block for each one.

**Why:** Generic fallback describes the editor (export formats, save, panels) not the component itself. Google sees no component-specific content. Must match gdpr-consent-manager depth (1200+ words about, 6 howToUse steps, 8+ features, 6 useCases, 5 FAQs).

**How to apply:** For each snippet, add `seo: { title, description, about: { title, description }, howToUse: { type: 'steps', items: [{title, text}] }, features: [...strings], useCases: [{icon, title, desc}], faqs: [{q, a}] }` inside the snippet object. Also remove `noindex: true` when done. The existing `about:` block (if any) at the top level is NOT used by page.js — must be inside `seo:`.

**All snippets completed 2026-06-11:**
- [x] gauge-chart.js
- [x] activity-heatmap.js
- [x] ai-chat-interface.js
- [x] bar-chart.js
- [x] date-range-picker.js
- [x] glassmorphism-login.js
- [x] infinite-scroll.js (fixed unescaped triple backtick code fence)
- [x] onboarding-tour.js
- [x] spin-wheel.js (fixed unescaped backtick in winning-segment formula)
- [x] swipe-cards.js

**SEO format reference:** See gdpr-consent-manager.js for the exact structure. 1200+ words in about.description, technical walkthrough (not feature list), 140–160 char meta description, ≤60 char title, 5 FAQs, SVG icon keys for useCases (not text abbreviations).

**Round 2 completed 2026-06-26:** A later batch of 50 snippets had accumulated `noindex: true` (new components added since round 1). Audited with a new one-off script `scripts/audit-dev-snippets.mjs` (checks title/description length, about-text word count, howToUse/features/useCases/faqs minimums, tailwind/react/angular-or-vue mentions, interlink count, and total seo-block word count ≥1200). 23 already passed and went live immediately; 27 were 1100–1199 words (just under the 1200 floor) or had a too-short about text — each got one grounded, code-specific paragraph added (not boilerplate) to clear 1200+ words, then noindex was removed from all 27. `src/lib/snippet-count.js` SNIPPET_COUNT was bumped 392 → 415 → 442 as batches went live — this constant must track the live (non-noindex) count, not total file count.
