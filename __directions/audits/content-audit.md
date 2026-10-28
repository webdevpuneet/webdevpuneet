# Tool & Snippet Content Audit

Tracks the comprehensive SEO content pass (About deep-dive, expanded Features, How-to-Use,
comparison tables, callouts, use cases, and FAQs) modeled on `mesh-gradient-generator`.

- Order: most recently updated tools first (per `lastmod` in `src/lib/tools-registry.js`), then UI snippets. **Confirmed: strict newest-first, no reordering by thinness.**
- Mark `[x]` when a page has been given the full comprehensive-content pass (tables + callouts + expanded prose, matching mesh-gradient-generator's treatment) and its `lastmod` bumped.
- **2026-07-02 finding:** all 182 tool pages already have the standard About/Features/HowTo/UseCases/FAQ structure and sit at 1,000–5,600 words (see word-count column below) — none are broken or empty. "Comprehensive pass" here means *adding* comparison tables, pro-tip/accessibility callouts, and additional deep-dive prose on top of the existing content (the same treatment mesh-gradient-generator got), confirmed as the goal for every page — not just fixing gaps.
- Word-count column = rough prose proxy (all string literals ≥60 chars in the page file); useful only as a sanity check, not a pass/fail gate.

## Legend
- `[ ]` not started
- `[~]` in progress / partially expanded
- `[x]` done (comprehensive pass complete)

## Phase 1 — Tool pages (182 total, newest first)

- [x] svg-wave-generator — 2026-07-02 (content pass: comparison table, callouts, 5 new FAQs; PLUS 5 new tool features: left/right vertical edges, multi-color per layer, built-in drift animation, auto aria-hidden, undo/redo + shareable link — page content fully synced to match)
- [x] bookmark-keeper — 2026-07-02 (accuracy audit, not template rewrite: page was already comprehensive. Fixed inaccurate "10 seconds" sync interval → 5s, corrected the "deleted-IDs map" claim to the real timestamp-based last-write-wins sync, surfaced the undocumented AES-GCM Gist encryption feature across About/steps/features/FAQs + 1 new FAQ)
- [x] daily-focus-log — 2026-07-02 (major undocumented-feature audit: file/image attachments+lightbox, Logged Links panel, GitHub Gist sync w/ encryption, 3 export formats + File System Access folder backup, task carry-forward, confetti — none were on the page before. Also fixed: FAQPage/SoftwareApplication/Breadcrumb JSON-LD were built but never rendered; registry desc falsely said "Top-3 tasks" (no such limit in code))
- [x] mini-kanban — 2026-07-02 (same audit pattern as daily-focus-log: GitHub Gist sync + File System Access folder backup were undocumented; rich-text toolbar undersold — missing underline, numbered lists, quick-checklist-line; JSON-LD was completely missing, added FAQPage/SoftwareApplication/Breadcrumb)
- [x] freelance-dashboard — 2026-07-02 (already exceptional content — no additions needed; verified accuracy against source and fixed one systemic bug: "force sync 10 seconds after any change" repeated 6x across About/steps/features/FAQs, but the shared GistSyncButton it delegates to actually debounces at 5s. Verified DB names (fd_kanban_db) and default world-clock zones as accurate. Also enriched registry desc to mention encrypted sync + Freelance Hub.)
- [ ] api-request-generator-tester — 2026-06-03
- [ ] jquery-playground — 2026-06-03
- [ ] vue-playground — 2026-06-03
- [ ] js-playground — 2026-06-03
- [ ] typescript-playground — 2026-06-03
- [ ] react-playground — 2026-06-03
- [ ] angular-playground — 2026-06-03
- [ ] gsap-playground — 2026-06-03
- [ ] ui-snippets — 2026-05-30 (gallery hub page, not an individual snippet)
- [ ] scss-playground — 2026-05-28
- [ ] redis-playground — 2026-05-27
- [ ] seo-checker — 2026-05-27
- [ ] bootstrap5-playground — 2026-05-27
- [ ] html-playground — 2026-05-27
- [ ] git-playground — 2026-05-27
- [ ] tailwind-playground — 2026-05-27
- [ ] php-playground — 2026-05-27
- [ ] python-playground — 2026-05-27
- [ ] aspect-ratio-calculator — 2026-05-26
- [ ] relight-photo — 2026-05-26
- [ ] image-background-remover — 2026-05-26
- [ ] css-animation-generator — 2026-05-24
- [ ] svg-motion-studio — 2026-05-24
- [ ] mind-map — 2026-05-24
- [ ] database-schema-designer — 2026-05-24
- [ ] graphql-playground — 2026-05-21
- [ ] firebase-playground — 2026-05-21
- [ ] mongo-playground — 2026-05-20
- [ ] express-playground — 2026-05-20
- [ ] rest-api-builder-playground — 2026-05-20
- [ ] nextjs-playground — 2026-05-20
- [ ] nodejs-playground — 2026-05-20
- [ ] sql-playground — 2026-05-19
- [ ] freelance-invoice-generator — 2026-05-17
- [ ] monthly-investment-calculator — 2026-05-17
- [ ] retirement-calculator — 2026-05-17
- [ ] budget-planner — 2026-05-17
- [ ] salary-to-hourly-calculator — 2026-05-17
- [ ] tip-calculator — 2026-05-17
- [ ] loan-payoff-calculator — 2026-05-17
- [ ] inflation-calculator — 2026-05-17
- [ ] credit-card-payoff-calculator — 2026-05-17
- [ ] vat-calculator-uk — 2026-05-17
- [ ] australia-take-home-calculator — 2026-05-17
- [ ] line-utilities — 2026-05-17
- [ ] gst-calculator — 2026-05-17
- [ ] uk-take-home-calculator — 2026-05-17
- [ ] paycheck-calculator — 2026-05-17
- [ ] password-generator — 2026-05-17
- [ ] qr-code-generator — 2026-05-17
- [ ] javascript-minifier — 2026-05-17
- [ ] lorem-ipsum-generator — 2026-05-17
- [ ] text-case-converter — 2026-05-17
- [ ] html-to-jsx-converter — 2026-05-17
- [ ] css-easing-generator — 2026-05-17
- [ ] css-transform-generator — 2026-05-17
- [ ] css-filter-generator — 2026-05-17
- [ ] css-grid-builder — 2026-05-17
- [ ] css-clamp-generator — 2026-05-17
- [ ] glassmorphism-generator — 2026-05-17
- [x] mesh-gradient-generator — 2026-05-17 (done 2026-07-02: About/Features/HowTo/tables/callouts/FAQs expanded, tool got 8 new features)
- [ ] css-autoprefixer — 2026-05-17
- [ ] css-clip-path-generator — 2026-05-17
- [ ] image-to-text-converter — 2026-05-17
- [ ] carousel-builder — 2026-05-17
- [ ] jwt-decoder — 2026-05-17
- [ ] css-button-generator — 2026-05-17
- [ ] ai-prompt-studio — 2026-05-17
- [ ] daily-diary — 2026-05-17
- [ ] proposal-builder — 2026-05-17
- [ ] contract-template-manager — 2026-05-17
- [ ] scope-creep-tracker — 2026-05-17
- [ ] follow-up-reminder-board — 2026-05-17
- [ ] local-invoice-tracker — 2026-05-17
- [ ] freelance-expense-tracker — 2026-05-17
- [ ] retainer-tracker — 2026-05-17
- [ ] freelance-availability-planner — 2026-05-17
- [ ] milestone-payment-tracker — 2026-05-17
- [ ] resume-builder — 2026-05-17
- [ ] freelance-rate-calculator — 2026-05-17
- [ ] client-crm — 2026-05-17
- [ ] client-intake-form-builder — 2026-05-17
- [ ] client-portal-lite — 2026-05-17
- [ ] css-playground — 2026-05-17
- [ ] xml-formatter — 2026-05-17
- [ ] binary-hex-ascii — 2026-05-15
- [ ] time-tracker — 2026-05-15
- [ ] working-days-calculator — 2026-05-15
- [ ] html-table-generator — 2026-05-15
- [ ] json-schema-generator — 2026-05-15
- [ ] markdown-table-generator — 2026-05-15
- [ ] image-color-palette — 2026-05-15
- [ ] reading-time-calculator — 2026-05-15
- [ ] emi-calculator — 2026-05-14
- [ ] mortgage-calculator — 2026-05-14
- [ ] compound-interest-calculator — 2026-05-14
- [ ] sip-calculator — 2026-05-14
- [ ] net-worth-calculator — 2026-05-14
- [ ] date-calculator — 2026-05-14
- [ ] number-base-converter — 2026-05-14
- [ ] html-entity-encoder — 2026-05-14
- [ ] unit-converter — 2026-05-14
- [ ] canada-take-home-calculator — 2026-05-14
- [ ] rent-vs-buy-calculator — 2026-05-14
- [ ] youtube-thumbnail-downloader — 2026-05-14
- [ ] uuid-generator — 2026-05-14
- [ ] json-formatter — 2026-05-14
- [ ] html-formatter — 2026-05-14
- [ ] tailwind-formatter — 2026-05-14
- [ ] json-table-viewer — 2026-05-14
- [ ] diff-checker — 2026-05-14
- [ ] responsive-preview-tool — 2026-05-14
- [ ] sql-formatter — 2026-05-14
- [ ] word-counter — 2026-05-14
- [ ] api-mock-generator — 2026-05-14
- [ ] svg-to-png — 2026-05-14
- [ ] og-image-generator — 2026-05-14
- [ ] html-to-markdown — 2026-05-14
- [ ] markdown-to-html — 2026-05-14
- [ ] pomodoro-timer — 2026-05-14
- [ ] color-contrast-checker — 2026-05-14
- [ ] json-to-typescript — 2026-05-14
- [ ] css-to-tailwind — 2026-05-14
- [ ] tailwind-to-css — 2026-05-14
- [ ] rem-px-converter — 2026-05-14
- [ ] meta-tag-generator — 2026-05-14
- [ ] css-media-queries-generator — 2026-05-14
- [ ] css-shape-generator — 2026-05-14
- [ ] css-loader-generator — 2026-05-14
- [ ] box-shadow-generator — 2026-05-14
- [ ] gradient-generator — 2026-05-14
- [ ] flexbox-builder — 2026-05-14
- [ ] color-palette-generator — 2026-05-14
- [ ] css-minifier-beautifier — 2026-05-14
- [ ] font-pairing-tool — 2026-05-14
- [ ] svg-animation-generator — 2026-05-14
- [ ] animated-svg-icons — 2026-05-14
- [ ] color-picker — 2026-05-14
- [ ] url-encoder-decoder — 2026-05-14
- [ ] hash-generator — 2026-05-14
- [ ] image-editor — 2026-05-14
- [ ] image-compressor — 2026-05-14
- [ ] image-to-svg — 2026-05-14
- [ ] image-to-base64 — 2026-05-14
- [ ] regex-tester — 2026-05-14
- [ ] base64-encoder-decoder — 2026-05-14
- [ ] timestamp-converter — 2026-05-14
- [ ] cron-expression-builder — 2026-05-14
- [ ] yaml-json-converter — 2026-05-14
- [ ] csv-json-converter — 2026-05-14
- [ ] code-screenshot-generator — 2026-05-14
- [ ] favicon-generator — 2026-05-14
- [ ] toggle-switch-generator — 2026-05-14
- [ ] json-dashboard-generator — 2026-05-14
- [ ] notepad — 2026-05-14
- [ ] markdown-editor — 2026-05-14
- [ ] pdf-watermark — 2026-05-14
- [ ] pdf-password-protector — 2026-05-14
- [ ] pdf-page-organizer — 2026-05-14
- [ ] pdf-compressor — 2026-05-14
- [ ] images-to-pdf — 2026-05-14
- [ ] pdf-to-images — 2026-05-14
- [ ] html-to-pdf — 2026-05-14
- [ ] pdf-metadata — 2026-05-14
- [ ] pdf-unlock — 2026-05-14
- [ ] pdf-splitter — 2026-05-14
- [ ] pdf-merger — 2026-05-14
- [ ] robots-txt-generator — 2026-05-10
- [ ] sitemap-generator — 2026-05-10
- [ ] htaccess-redirect-generator — 2026-05-10
- [ ] schema-markup-generator — 2026-05-10
- [ ] hreflang-tag-generator — 2026-05-10
- [ ] security-headers-generator — 2026-05-10
- [ ] llms-txt-generator — 2026-05-10
- [ ] fd-calculator — 2026-05-07
- [ ] pdf-to-word — 2026-05-06
- [ ] pdf-ocr — 2026-05-06

## Phase 2 — UI Snippets (442+, by category)

Not yet broken out individually — will generate the ordered list (by category, newest first)
once Phase 1 is underway. Categories: buttons, forms, cards, navigation, modals, tables,
charts, loaders, animations, layouts, dashboards, pricing, heroes.

### New snippet builds (dev/noindex, full SEO, pending promotion)

- 2026-07-14 — **Mobile app-screens batch (14, layouts):** `mobile-chat-screen`, `mobile-settings-screen`, `mobile-feed-screen`, `mobile-checkout-screen`, `mobile-banking-screen`, `mobile-music-player-screen`, `mobile-food-order-screen`, `mobile-map-ride-screen`, `mobile-calendar-screen`, `mobile-fitness-screen`, `mobile-camera-screen`, `mobile-stories-viewer`, `mobile-notifications-screen`, `mobile-search-screen`. Most of this batch was promoted live on 2026-07-18 (see below) — check individual files for any still `noindex: true`.

**2026-07-18 — Mass promotion of audit-passing dev snippets, then all remaining dev snippets:** ran `scripts/audit-dev-snippets.mjs` against all 238 `noindex: true` snippets. 161 passed at the time (400+ word about, 1200+ total words, features/useCases/faqs minimums, tailwind/react/vue mentions, 2+ interlinks) — promoted all 161 to live first, bumping `SNIPPET_COUNT` 446 → 607. The `aiPrompt` rollout (see "UI Snippets only" section) pushed word counts up further, and a re-run of the audit showed 23 more of the remaining 77 now passing. The user then explicitly asked to make **all** remaining dev snippets live regardless — promoted the final 77 (removed `noindex: true`, bumped `lastmod` to 2026-07-18), bringing `SNIPPET_COUNT` to 684 (all snippets now indexed, 0 remaining `noindex: true`). Full `node --check` sweep across all 684 snippet files confirmed clean. **Content-quality note:** at the time of this last promotion, 54 of those final 77 failed only the About-text-length check (330–399 words, just shy of the 400 floor — every other check passed: howToUse, features, useCases, faqs, total word count). They were promoted anyway per explicit instruction. Re-check any file with `node scripts/check-specific-snippets.mjs <file-with-ids>` (added 2026-07-18, checks specific ids against the same thresholds as `audit-dev-snippets.mjs` without requiring `noindex` still present). **The 54 needing an About expansion (~2-5 more sentences each):** app-store-card, avatar-generator, battery-indicator, bookmark-toggle, brightness-slider, browser-window, bump-chart, camera-ui, checkbox-tree, circular-char-counter, color-contrast-checker, density-toggle, dialer-keypad, donut-progress, email-inbox, glass-stat-card, gradient-picker, grouped-bar-chart, hold-to-confirm-button, hover-card, inline-validation-form, json-tree, laptop-mockup, lollipop-chart, mobile-lock-screen, mobile-login-screen, mobile-onboarding, mobile-profile-screen, mobile-status-bar, orbit-loader, page-minimap, paywall-screen, pyramid-chart, range-area-chart, scroll-progress-circle, scroll-reveal-grid, shadow-generator, shortcut-recorder, signal-bars, slider-captcha, smartwatch-mockup, splash-screen, stacked-area-chart, status-pill, sunburst-chart, tablet-mockup, time-duration-input, timeline-chart, transfer-list, tv-mockup, volume-control, voting-buttons, wallet-card, wave-divider.

**2026-07-19 — New Three.js/WebGL snippet batch (10, live from creation, not dev/noindex):** built to the full comprehensive-pass standard from the start (matching `split-flap-display` depth) rather than starting thin and promoting later. All CDN-loaded from `cdn.jsdelivr.net/npm/three@0.128.0` (the last version with a non-module `examples/js/controls/OrbitControls.js` UMD build usable via plain `<script>` tags, no import maps or bundler). Category `animations` for 9 of them, `scroll` for the GSAP-combo one. All pass `scripts/check-specific-snippets.mjs`; `SNIPPET_COUNT` bumped 684 → 694. IDs: `three-particle-wave` (BufferGeometry point-cloud wave), `three-morphing-blob` (icosahedron + hand-rolled noise displacement), `three-orbit-rings` (OrbitControls + tilted-group orbit pattern), `three-starfield-warp` (perspective-divide hyperspace effect, hold-to-warp button), `three-solar-system` (Object3D pivot orbits, nested moon pivot, ringed planet), `three-instanced-cube-wave` (InstancedMesh, 2,500 cubes in one draw call), `three-network-graph` (uniform spherical sampling + nearest-neighbor edges), `three-product-viewer` (three-point studio lighting + live color swatches), `three-interactive-mesh-distortion` (Raycaster cursor-follow vertex displacement), `three-scroll-camera-path` (GSAP ScrollTrigger scrubbing a Three.js camera flythrough). **Known gap:** none of the 10 have a `/images/ui-snippets/previews/<id>.png` screenshot yet (same gap likely exists on other recently-added batches) — the About section's screenshot frame will show a broken image until one is captured and added.

**2026-07-19 — Three.js/WebGL batch 2 (10 more, live from creation):** same standard as batch 1 above, same CDN version (`three@0.128.0` + its `OrbitControls.js` addon where used). `SNIPPET_COUNT` bumped 694 → 704. IDs: `three-galaxy-spiral` (radius-driven spiral formula, differential rotation), `three-liquid-metal-sphere` (real-time CubeCamera reflections, hide-capture-reveal pattern), `three-synthwave-terrain` (two-tile relay-scroll endless grid, canvas-drawn sun sprite), `three-dna-helix` (180°-offset double-helix formula, group-level rotation), `three-magnetic-particles` (raycast-against-invisible-plane cursor repulsion + spring-back), `three-crystal-cluster` (clearcoat glass approximation, randomized organic placement), `three-wave-ribbon` (animated CatmullRomCurve3 + rebuilt TubeGeometry), `three-holographic-globe` (wireframe sphere + BackSide rim-glow fake + spawn-grow-fade radar rings), `three-digital-grid-pulse` (per-block material instances + independent timers + triangular fade envelope), `three-comet-trail` (fixed-size recycled particle pool, age-to-color fade, Lissajous path). All pass `scripts/check-specific-snippets.mjs`; full `node --check` sweep across all 704 snippet files confirmed clean. Same known gap as batch 1: no preview screenshots yet for these 10 either.

## What "comprehensive pass" means (per page)

1. Expand **About** into a real deep-dive (how it works technically, why it matters) — 400+ words.
2. Expand **Features** list to be specific and complete, with 2-4 natural interlinks to related tools.
3. Rewrite **How to Use** as detailed numbered steps covering every control.
4. Add 1-2 **comparison or reference tables** where relevant (e.g. format comparisons, unit tables).
5. Add a **Pro tip** and/or **performance/accessibility** callout.
6. Expand **Use Cases** to 6-9 cards with concrete scenarios.
7. Grow **FAQs** to 10-14, covering edge cases, comparisons, and "how do I..." questions.
8. Sync FAQs into the page's `FAQPage` JSON-LD and keep `softwareSchema.featureList` current.
9. Bump the tool's `lastmod` in `src/lib/tools-registry.js`.
10. Log the change in `DEVLOG.md` and check this file's box.

## UI Snippets only — "Build with AI" section (added 2026-07-17)

Every UI snippet's `seo` object (in `src/components/UiSnippetsTool/snippets/*.js`) should also carry an `aiPrompt` field:

```
aiPrompt: {
  paragraph: `...`, // one paragraph: understand (a specific non-obvious mechanic), optimize (a concrete perf/scaling question), extend (2-3 concrete feature ideas) — all named to THIS snippet's real functions/CSS properties, not generic
  prompt: `...`,    // a copy-paste "build this from scratch" prompt naming the snippet's real technique constraints and requirements
}
```

This renders as a "Build, Understand, Optimize, and Extend It With AI" section near the end of the snippet's page (via `SeoSection`'s `aiPrompt` prop → `normalizeSections` → a `text` section whose body ends in a `<pre>` block). No backticks in the prompt/paragraph strings themselves (they're already inside JS template literals — a literal backtick would need escaping as `` \` ``, so just avoid them and use plain words instead of `code` spans).

**Progress (2026-07-17):** 429 of 684 snippet files now have `aiPrompt` (started with 3 examples — split-flap-display, text-particles, scroll-typewriter — then ran 14 parallel background agents, each assigned ~49 files from a batch list, to fill in the rest). Work was interrupted by an account-wide session limit before finishing; ~255 files still need it. The remaining filenames are listed in `grep -L "aiPrompt" src/components/UiSnippetsTool/snippets/*.js` (or regenerate the list the same way). **To resume:** re-run the same batch approach, but resume/launch fewer agents at once (the last attempt resuming all 14 simultaneously seemed to burn through the quota faster and push the reset time later) — see [feedback_tutorial_ai_section](feedback_tutorial_ai_section.md) and the agent prompt template used (reference files: split-flap-display.js / text-particles.js / scroll-typewriter.js for tone/shape). One in-flight edit (`mega-menu-panel.js`) briefly broke the build with a stray extra `}` — fixed; worth a full `node --check *.js` sweep over the snippets folder after any future batch run, before assuming success from an agent's self-report.
