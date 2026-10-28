# Dev Tools — Development Log

> This file is updated whenever significant work is done on this project.

---

## 2026-08-09 — 20 more UI snippets: classic arcade & puzzle games (890 → 910 total)

Sixth batch, continuing the same "games/gamification" theme from the previous batch at the user's request, same 4-parallel-background-agent pattern. This round targeted genuinely iconic, high-search-demand classics that were still entirely missing: Snake, Pong, Breakout, Minesweeper, 2048, Connect Four, Hangman, Blackjack, and a water-sort puzzle, alongside several less iconic but still popular formats (Battleship, mini-Sudoku, word search, maze runner, rhythm-tap, a Flappy-Bird-style dodge game — deliberately not named "Flappy Bird" to avoid the trademark). All 20 ids re-checked against the full 890-id list on disk before dispatch; zero collisions. Build agents were also told explicitly to write prose in **British English** (colour, behaviour, centre, randomised, modelled, cancellable, -ise not -ize) to match this series' established convention, while leaving real American-spelled JS identifiers untouched when quoting code — first batch to bake that instruction in up front rather than fixing it after the fact. Library grew 890 → **910**.

**Classic board/arcade (5)**: `connect-four-game` (real gravity-drop columns, 4-direction win scan, win/block/centre-preference heuristic AI), `hangman-word-game` (layered SVG gallows revealed per wrong guess — agent caught and fixed a real inconsistency in the brief itself: I'd specified "6 wrong guesses" while listing 7 gallows parts, it standardised on 7 throughout), `snake-game` (fixed-tick game loop, direction/queued-direction split preventing instant self-reversal), `pong-game` (deliberately rate-limited/beatable CPU paddle, angle-reflection bounce), `breakout-brick-game` (AABB collision with face-detection for correct bounce direction, randomised non-vertical serve angle).

**Grid puzzles (5)**: `minesweeper-game` (real recursive/iterative flood-fill reveal, safe-first-click mine placement), `tile-merge-2048-game` (single-merge-per-move slide logic — the classic "2+2+4 merges into 8 in one move" bug specifically avoided), `maze-runner-game` (procedural recursive-backtracking maze generation, guaranteed exactly one solvable path), `word-search-puzzle` (real word placement across 8 directions with straight-line drag-select validation), `mini-sudoku-game` (6x6/1-6 scope for a genuinely completable demo, live per-cell constraint validation on every entry, not just at the end).

**Card & reflex games (5)**: `blackjack-card-game` (correct soft/hard Ace recalculation on every draw, standard dealer-stands-at-17 rule), `flap-dodge-game` (delta-time gravity physics via `requestAnimationFrame`, not fixed-per-frame pixel steps), `rhythm-tap-game` (4-lane falling-note timing judged against a hit window, Perfect/Good/Miss), `battleship-game` (retry-on-collision random fleet placement, per-ship hit-set tracking for "Ship sunk!" detection), `click-speed-test` (drift-free `performance.now()`-delta countdown rather than a naive decrementing interval).

**Word & casual (4)**: `word-unscramble-game`, `quick-math-game`, `dodge-the-blocks-game` (continuously ramping fall speed and spawn rate for genuine late-game difficulty), `loot-box-reveal` (real cumulative-weight rarity selection, not `Math.random() * items.length`, with an explicit note that this pattern is for cosmetic rewards only given regulatory scrutiny of gambling-adjacent mechanics aimed at minors), `color-sort-puzzle` (see bug below).

**A real, pre-ship bug caught during my own visual spot-check, not either agent's own verification**: `color-sort-puzzle`'s preview screenshot rendered a header bar with completely empty tubes — no static mockup, an actual crash. Traced it to `Maximum call stack size exceeded`: the snippet's scramble algorithm tried to reuse the 15-puzzle's "shuffle via legal moves from a solved state" pattern, but that pattern is mathematically incompatible with this game's rules — a legal pour can only add colour to an *empty* tube or one whose top already *matches*, so starting from monochrome tubes and only ever applying legal pours can never produce a tube containing two different colours. Every reachable tube via that method stays monochrome-or-empty forever, which meant the "is this scramble trivial" guard was true on literally every call, causing infinite self-recursion. Rewrote the generator properly: `dealRandomState()` now does a genuine Fisher–Yates deal of colour units into random tube slots (like dealing cards), and a new `isSolvable()` runs a canonicalised, node-capped breadth-first search over legal-pour states to *prove* solvability before a board is ever shown — discarding and re-dealing on the rare unproven draw. Pure generation cost is ~44ms (confirmed by instrumenting `performance.now()` inside the page itself — the ~750ms figure from an outside Playwright timer was mostly browser/page-launch overhead, not the algorithm). Rewrote every piece of SEO prose that described the old (broken, never-actually-executed-correctly) algorithm — about section, a howToUse step, a feature bullet, two useCases, two FAQs, and the aiPrompt paragraph/spec — to accurately describe the real deal-then-verify approach instead of quietly leaving incorrect technical claims live on the page. Lesson reinforced from the `css-subgrid-demo` incident two batches ago: `node --check` and even a plain dynamic `import()` only catch syntax errors, never runtime logic bugs — actually rendering every new interactive snippet in a headless browser and checking the DOM populated as expected is the only check that catches this class of bug, and is worth doing for any snippet with non-trivial generative/algorithmic logic, not just the ones that "look" complex.

Registry consistency verified: 910 imports ↔ 910 array entries ↔ 910 files on disk, 1:1, zero duplicate ids, full-registry `import()` clean. One SEO-audit gap (`blackjack-card-game` initially missing the required Angular/Tailwind export mention) found and fixed on the first audit pass; re-run came back fully clean. `SNIPPET_COUNT` bumped to 910. Preview screenshots captured for all 20 (0 failures on first pass, plus a forced re-capture for `color-sort-puzzle` after the fix) — spot-checked `snake-game`, `minesweeper-game`, and `color-sort-puzzle` (twice) visually.

---

## 2026-08-09 — 20 more UI snippets: gamification patterns + playable mini-games (870 → 890 total)

Fifth batch this project, same 4-parallel-background-agent pattern. Ask was open-ended ("high quality," no theme specified) — the prior three batches had already covered native CSS/JS platform features, AI-transparency/accessibility/trust trends, and CSS-cascade fundamentals, so this round deliberately pivoted to two clusters the library genuinely lacked: high-demand gamification/product-UI patterns, and small but *actually playable* mini-games (which double as education — Web Audio synthesis, DOM Range API, binary-search intuition, FSM-driven game loops). All 20 candidate ids were checked against the full 870-id list on disk before building; zero collisions. Library grew 870 → **890**.

**Gamification & product-UI patterns (7)**: `skill-tree-progress-map` (branching SVG node tree, `pathLength="1"` + `stroke-dashoffset` line-fill technique, unlocking a node cascades to its children), `xp-level-progress-bar` (game-style XP bar with *correct* overflow-carry math on level-up — remainder XP carries forward instead of resetting to 0), `achievement-badge-grid` (locked/unlocked badge collection with shine-sweep animation and a "simulate unlock" burst), `particle-explosion-button` (canvas-based real physics-lite particle burst — position/velocity/gravity/fade over `requestAnimationFrame`, not CSS-only), `liquid-swipe-transition` (hand-authored keyframed SVG `<path>` blob wipe between two panels — genuinely non-trivial technique most devs want but don't know how to build), `slash-command-menu` (Notion-style `/`-triggered floating command menu positioned via `Range`/`getClientRects()` on the caret), `delivery-route-tracker` (`SVG.getPointAtLength()`-driven vehicle icon following a curved dashed route with milestone status and live ETA countdown).

**Playable mini-games (13)**: `typing-speed-test` (live char-diff WPM/accuracy), `reaction-time-tester` (`performance.now()`-timed too-soon detection + rating labels), `simon-sequence-game` (async/await growing color sequence, localStorage best score), `whack-a-mole-game` (chained randomized-interval spawn/retract, 30s timer), `sliding-puzzle-game` (15-puzzle shuffled via 250 replayed *legal* slides from solved state — guaranteed solvable, not a raw permutation), `tic-tac-toe-game` (real heuristic AI: win-check → block-check → center → corners → edges, not random), `word-guess-game` (Wordle-style, correctly handles the classic duplicate-letter scoring edge case via a two-pass `consumed` array), `morse-code-translator` (real `OscillatorNode`/`GainNode` beeps at correct 1:3:1:3:7 dot/dash/gap timing ratios, glow-pulse synced to a single pre-computed timeline to avoid `setTimeout` drift), `virtual-piano-keys` (real equal-tempered-frequency oscillator tones per key, dual click+keyboard input, authentic overlapping black/white key layout), `bubble-wrap-popper` (satisfying fidget-toy genre — squash/flatten animation, stays popped, staggered re-inflate), `rock-paper-scissors-game` (shake-countdown animation, explicit rule-explanation on result), `hex-color-guess-game` (plausible-but-wrong decoy hex codes near the true value, not trivially different — genuine color/hex literacy test), `number-guessing-game` (higher/lower with guess history and a note on the binary-search optimal-play strategy).

Build agents self-verified more rigorously this round: one agent additionally ran each snippet's extracted `js` field through `new Function()` as a second, independent syntax check beyond `node --check` + dynamic `import()`. Two files needed a same-agent fix mid-build: a dead-code line in `achievement-badge-grid`'s `showPopover()`, and a red/blue-yellow CSS class mismatch plus an unused variable in `simon-sequence-game`. One `useCases[].icon` value (`DASHBOARDS`, not in the allowed enum) was caught and corrected to `CODE` in `xp-level-progress-bar` before it shipped — first time an icon-enum violation was caught pre-registry rather than needing a post-hoc audit fix.

Registry consistency verified: 890 imports ↔ 890 array entries ↔ 890 files on disk, 1:1, zero duplicate ids, full-registry `import()` clean, `SNIPPET_COUNT` bumped to 890. `audit-snippet-seo.mjs` clean on the first pass — zero violations attributable to this batch. Preview screenshots captured for all 20 via `scripts/capture-snippet-previews.mjs` (0 failures) — spot-checked 3 visually (`virtual-piano-keys`, `sliding-puzzle-game`, `word-guess-game`), all genuinely representative of working, playable demos.

---

## 2026-08-08 — 20 more UI snippets: 2026 UI/UX trend patterns (850 → 870 total)

Fourth batch today, same 4-parallel-background-agent pattern. Explicit ask this time was just "high quality" with no theme specified, so researched first (`WebSearch`, per the user's "research well before creating" instruction) rather than guessing: 2026 UI/UX coverage converges on AI-native UX made *transparent* (never a black box, agentic actions gated behind explicit approval), tactile brutalism replacing the early-2020s soft-neumorphic look, trust-driven checkout UX, accessibility-first as baseline not afterthought, and calm UI that avoids jarring alerts. Brainstormed ~40 candidate ideas grounded in those trends, cross-checked all of them against the full current 850-id list on disk (`ls snippets/*.js`) before committing to a final 20, so zero were discovered as duplicates mid-build this time (a first — every prior batch's report included at least one collision caught late). Library grew 850 → **870**.

**AI-native transparency (6)**: `ai-confidence-badge` (color-coded certainty ring, never presents AI output with false confidence), `ai-review-summary-card` (AI-summarized reviews with a toggle to reveal the real source excerpts backing the summary — verify-the-claim pattern), `ai-prompt-suggestion-chips` (starter-prompt chips with typewriter fill-in), `ai-action-approval-card` (the core 2026 agentic-UX principle: a specific, previewable action — "send this email to 3 recipients," full to/subject/body shown — gated behind explicit Approve/Deny, never silently auto-executed), `ai-generating-loader` (stage-cycling "Analyzing… Drafting… Finalizing…" shimmer instead of an indefinite spinner, with a real Cancel), `empty-state-ai-suggestions` (empty states as a helpful on-ramp with concrete suggested starter items, not a dead end).

**Accessibility-first (4)**: `skip-to-content-link` (the real WCAG skip-nav bug class — off-screen `position:absolute` + `:focus` reveal, explicitly NOT `display:none`/`visibility:hidden` which would drop it from the tab order), `text-size-adjuster` (A-/A+ control via a `--user-font-scale` custom property independent of browser zoom, persisted to localStorage), `keyboard-nav-rail` (real roving-tabindex pattern per ARIA authoring practices, not just visual focus rings), `reading-mode-toggle` (distraction-free view with an animated, non-jarring layout transition rather than an instant snap).

**Trust & tactile-visual trends (4)**: `brutalist-press-button` (hard offset shadow that collapses to 0 on press — tactile brutalism replacing soft neumorphism), `trust-badge-strip` (checkout security/guarantee badges with reassurance tooltips), `wallet-connect-button` (mock Web3 connect flow — provider picker, connecting state, truncated address, real Clipboard API copy), `pricing-currency-switcher` (live `Intl.NumberFormat` currency conversion across pricing cards with a "billed in USD" disclosure — trust through transparency about what's actually charged).

**Calm UI & interaction depth (6)**: `session-timeout-modal` (calm, not jump-scare, idle warning — real throttled activity listeners reset the timer, not just the modal button), `alert-feed-panel` (ops alert feed with severity color-coding that never flashes/strobes), `focus-status-toggle` (Slack/Discord-style DND status with a drift-proof countdown via an absolute `focusEndsAt` timestamp rather than a naive decrementing counter), `ghost-text-autocomplete-input` (real Copilot-style inline gray suggestion text via a two-layer overlay technique, since a native `<input>` can't render two-tone text itself), `product-360-image-spin` (drag-to-spin viewer, CSS-shading illusion standing in for a real photo sprite sequence), `text-selection-annotation` (real `window.getSelection()`/`Range` API with `surroundContents()` + an `extractContents()`/`insertNode()` fallback for multi-node selections — not a fake overlay).

Every file self-verified by its build agent this round (a fix from the last batch's post-hoc cleanup): each one manually counted `seo.title` (≤60 chars) and `seo.description` (140–165 chars) length before finishing, and each was actually `import()`-ed, not just `node --check`-ed, to catch the unescaped-backtick-in-template-literal bug class that bit `css-subgrid-demo.js` last time. Result: full `audit-snippet-seo.mjs` run came back with **zero violations attributable to this batch** on the first pass — no fixes needed, unlike the prior two batches.

Registry consistency verified: 870 imports ↔ 870 array entries ↔ 870 files on disk, 1:1, zero duplicate ids, full-registry `import()` clean, `SNIPPET_COUNT` bumped to 870. Preview screenshots captured for all 20 via `scripts/capture-snippet-previews.mjs` (0 failures) — spot-checked 3 visually (`brutalist-press-button`, `ghost-text-autocomplete-input`, `ai-action-approval-card`), all genuinely representative, not blank/broken renders.

---

## 2026-08-08 — 20 more UI snippets: native web-platform CSS/JS feature playgrounds (830 → 850 total)

Third batch today, same 4-parallel-background-agent pattern (each agent writes only its own 5 new files; registry wiring — imports, `SNIPPETS` array, `SNIPPET_COUNT` — done centrally afterward to avoid conflicts). Explicit ask this time: "modern web UI demand + educational." Instead of more CS-algorithm visualizers (that niche is already saturated — event-loop, LRU cache, BST, hash table, trie, bloom filter, consistent hashing, etc. all exist), this batch targets a different educational niche that was genuinely empty: interactive playgrounds for newer *native browser CSS/JS platform features* shipping 2022-2025 that most devs have read about but never actually played with. Library grew 830 → **850**.

**CSS selectors & cascade (5)**: `css-has-selector-playground` (real `:has()` parent-selector rules reacting live), `cascade-layers-explainer` (`@layer` — simulated layer-reordering to show priority is independent of specificity), `css-subgrid-demo` (`grid-template-rows: subgrid` vs independent nested grids, side by side, to show the ragged-card-row problem it solves), `css-nesting-playground` (native `&` nesting with a live "flattened equivalent" panel), `color-mix-playground` (`color-mix()` with a color-space picker, writing the live function string via `style.setProperty`).

**Native dialogs & scroll (5)**: `native-popover-api-demo` (real `popovertarget`/`popover="auto"` vs `"manual"`, not a custom-built overlay), `native-dialog-showcase` (real `<dialog>` `.showModal()`/`.show()`, `::backdrop`, `returnValue` via `form method="dialog"`), `scroll-timeline-explainer` (`animation-timeline: scroll()` driving a progress bar with zero scroll-event JS), `css-trig-functions-lab` (`sin()`/`cos()`/`calc()` positioning dots on a circle), `text-wrap-balance-demo` (`wrap` vs `balance` vs `pretty` on live-typed text).

**Layout & animation APIs (5)**: `css-container-query-units-demo` (`cqi` scaling with the container vs `vw` staying fixed, side by side), `web-animations-api-playground` (real `element.animate()` with play/pause/reverse/finish wired to the returned `Animation` object, live `playState`), `css-grid-template-areas-visualizer` (paintable grid cells generating a live `grid-template-areas` string), `raf-fps-meter` (genuine `requestAnimationFrame` frame-delta timing, not a fake counter, paired with an easing-function comparison), `css-clamp-responsive-type-demo` (three sliders building a live `clamp(min, preferred, max)` value with a viewport-width lock-in marker).

**Color & accessibility (5)**: `css-oklch-color-picker` (L/C/H sliders + a hue-sweep strip proving perceptual uniformity against HSL), `focus-visible-demo` (`:focus` vs `:focus-visible` with a live interaction log using `matches(':focus-visible')`), `css-aspect-ratio-playground` (`aspect-ratio` vs the old padding-top-percentage hack, side by side), `prefers-reduced-motion-toggle-demo` (an in-page simulation toggle clearly labeled as a teaching stand-in, *plus* a genuine live readout of the user's real OS-level `matchMedia('(prefers-reduced-motion: reduce)')` value), `css-backdrop-filter-playground` (`blur()`/`saturate()` sliders vs a flat `rgba()` comparison card).

**Bugs caught during my own verification pass, not the agents' own checks**: `node --check` (syntax-only) passed on all 20 files, but actually *importing* each module surfaced one real runtime bug: `css-subgrid-demo.js` had an unescaped backtick pair (`` `.product-card` ``) inside a `seo.about.description` template literal, which silently parsed as valid JS (a nested empty-interpolation template) but threw `ReferenceError: card is not defined` at import time — `node --check` cannot catch this class of bug, only `import()` can. Lesson: for these template-literal-heavy files, verify with an actual dynamic `import()` of every new file, not just `node --check`, before considering a batch done. Separately, ran `scripts/audit-snippet-seo.mjs` (skipped in the prior two batches per their own DEVLOG notes — did it this time) and fixed what it found: 3 files (`cascade-layers-explainer`, `css-nesting-playground`, `color-mix-playground`) had `seo.description` over the 165-char budget, and 8 files across the "native dialogs & scroll" and "layout & animation APIs" groups were missing the required "Exports to React, Vue, Angular & Tailwind" framework hook entirely. All fixed by hand; re-run confirms zero violations attributable to this batch (the audit's remaining flagged items are all pre-existing `three-*` snippets from earlier work).

Registry consistency verified: 850 imports ↔ 850 array entries ↔ 850 files on disk, 1:1, zero duplicate ids, `node --check` clean, all 20 new modules dynamically `import()`-able without runtime error, `SNIPPET_COUNT` bumped to 850 in `src/lib/snippet-count.js`, full `audit-snippet-seo.mjs` pass run and clean for this batch.

---

## 2026-08-08 — 20 more UI snippets: JS-runtime, data-structure & systems-design visualizers (790 → 830 total)

Second batch in the same session, same day, following directly on the "20 new UI snippets" work below — same 4-parallel-background-agent pattern, same safety rule (agents only write their own new files; registry wiring done centrally afterward). Library grew 810 → **830**. Re-derived the id-collision list from `ls snippets/*.js` basenames this time (more reliable than grepping `id: '...'` lines, since two existing files — `ai-model-selector.js`, `product-roadmap.js` — have internal data arrays with their own `id:` fields that inflated an initial grep-based count to 817 against 810 actual files).

**JS runtime & data structures (5)**: `event-loop-visualizer` (three animated lanes — call stack, macrotask queue, microtask queue — with a nested-microtask preset that proves the drain loop re-checks a *live* queue, not a snapshot, so a promise that reschedules itself mid-drain still beats a pending `setTimeout`), `lru-cache-visualizer` (a real doubly-linked-list + hash-map implementation, not an array `indexOf`/`splice` fake), `stack-queue-visualizer` (LIFO vs FIFO side by side from a shared input), `binary-search-tree-visualizer` (insert/search/in-order-traversal with comparison highlighting), `hash-table-visualizer` (separate chaining with a live load-factor readout).

**CSS fundamentals (5)**: `css-box-model-inspector`, `flexbox-alignment-visualizer`, `stacking-context-visualizer` (the parent-traps-child-z-index gotcha, not just the number comparison), `event-bubbling-visualizer` (capture vs bubble phase with a `stopPropagation()` toggle), `css-specificity-visualizer` (the 3-tuple comparison model, `!important` as a separate override).

**Systems design (5)**: `trie-autocomplete-visualizer`, `token-bucket-rate-limiter-visualizer` (burst tolerance vs average-rate throttling), `consistent-hashing-visualizer` (ring reassignment on node add/remove vs a naive mod-N toggle that reshuffles almost everything), `bloom-filter-visualizer`, `websocket-vs-polling-visualizer`. The bloom-filter agent didn't just claim a false positive occurs — it hand-traced its own hash functions and confirmed one: adding apple/banana/cherry sets bits `{30,23,20,7,6,24,27,18,12}`; checking `mango` (never added) hashes to `{30,23,20}`, all already set → genuine false positive; `kiwi` hashes to `{12,25,26}`, correctly reported as a true negative. Worth knowing if this needs re-verifying after any future edit to that file's hash functions.

**Trending mobile/UI (5)**: `reconnect-backoff-visualizer` (exponential backoff + jitter, explains the thundering-herd problem jitter solves), `picture-in-picture-video-card` (corner-snap-by-nearest-distance + flick-to-dismiss velocity threshold), `swipe-tab-switcher` (click nav and swipe-drag nav share one index+offset state so they can't fight each other), `collaborator-presence-bar` (per-user consistent color assignment, animated join/leave, per-avatar typing indicator — distinct from the pre-existing generic `multiplayer-cursors` and `typing-indicator`), `debounce-throttle-visualizer` (real, correct implementations of both, not simplified approximations, with a firing-count comparison for identical input bursts).

**Bug caught during my own spot-check, not the agents'**: `event-loop-visualizer.js` and `lru-cache-visualizer.js` had curly apostrophes (`'` U+2019) in a few `seo.faqs`/`seo.useCases` prose strings — cosmetically fine, but where they landed inside single-quoted JS string literals they broke `node --check`. My first fix attempt (blind find-replace of `'` → straight `'`) was itself wrong and re-broke both files, since a *bare* straight apostrophe inside a single-quoted string is exactly as broken as a curly one — it still needs the `\'` escape. Had to walk each `node --check` error individually and hand-escape it. Lesson for next time: when normalizing curly quotes inside these template-literal-heavy snippet files, always replace with the *escaped* `\'` (which is valid inside both plain single-quoted strings and backtick template literals), never a bare `'`.

Registry consistency re-verified after the fix: 830 imports ↔ 830 array entries ↔ 830 files on disk, 1:1, zero duplicates, `node --check` clean on all 40 files added across both of today's batches.

Same open item as the previous entry: no SEO-audit-script pass or sitemap regen run yet for either batch — do both before calling this fully shipped.

---

## 2026-08-08 — 20 new UI snippets: CS-education visualizers + trending animated components

Grew the UI snippet library from 790 to **810** with a batch aimed at two explicit asks: "excellent animated" (2026 UI trends) and "educational." Researched the full existing ~797-id library first (grep across `src/components/UiSnippetsTool/snippets/*.js`) to guarantee zero topic/id collisions before building — the library was already extremely saturated (e.g. `bottom-sheet`, `slide-to-confirm`, `dynamic-island`, `glass-card`, `pull-to-refresh`, `physics-balls` all pre-existed), so finding 20 genuinely fresh, non-duplicate ideas took real dedup work.

Built via 4 parallel background agents (5 snippets each), deliberately scoped so no agent touched the shared registry files — each agent only wrote its own new snippet files and reported back `{id, variable name, file path}`; registration into `snippets.js` (imports + `SNIPPETS` array) and the `SNIPPET_COUNT` bump were done centrally afterward to avoid concurrent-write conflicts on shared files. Verified programmatically post-registration: all 810 imports map 1:1 to array entries with zero duplicates or orphans, all 20 new files pass `node --check`, and every `about.description` seo block lands 1,893–2,280 words (well above the [1200+ word standard](.claude/memory/feedback_snippet_seo_standard.md)).

**6 CS/algorithm-education visualizers** (new territory for the library — no sorting/pathfinding/recursion visualizers existed before): `sorting-algorithm-visualizer` (Bubble/Selection/Insertion/Quick, pre-computed step-array architecture decoupling algorithm logic from animation timing), `pathfinding-grid-visualizer` (BFS + A* with Manhattan heuristic, draggable start/end, wall drawing), `binary-search-visualizer` (animated low/mid/high pointers with a comparison log), `recursion-tree-visualizer` (naive recursive Fibonacci with a live call-stack panel and a memoize toggle that visibly collapses O(2^n) into O(n) — read the full file, it's a genuinely good explanation of the mechanism), `linked-list-visualizer` (animated pointer-rewiring on insert/delete, not just a full re-render), `traffic-light-fsm-visualizer` (a real finite-state-machine diagram driving an actual traffic light, with a transition table).

**14 trending animated UI components**: `liquid-glass-navbar` (iOS/macOS 26 "Liquid Glass" pill nav, FLIP-technique morphing active-tab indicator), `ai-code-typing-preview` (simulated AI-writes-code panel, jittered per-character timing, progressive syntax tokenization), `elastic-drag-slider` (hand-written spring physics — stiffness/damping integrated every rAF frame, not a CSS cubic-bezier fake — verified by full read, genuinely real physics), `live-vote-bar-race` (bar-chart-race reordering via FLIP), `dependency-graph-viewer` (hand-rolled force simulation — repulsion + spring edges, no physics library), `file-tree-explorer` (VS Code-style tree with real height-animation on expand/collapse, keyboard nav), `now-playing-mini-player` (FLIP shared-element morph from mini bar to full sheet), `live-caption-overlay` (karaoke-style word-by-word live captions), `memory-match-game` (3D CSS flip matching the house pattern from `3d-flip-card.js`), `achievement-unlock-toast` (FIFO queue so simultaneous unlocks never overlap), `voice-message-bubble` (chat voice-note with playback-synced waveform recoloring), `control-center-panel` (iOS Control Center toggle tiles + custom pointer-driven vertical slider), `live-edit-presence` (Notion/Figma-style per-collaborator edit-flash highlighting), `live-log-stream-panel` (streaming terminal log with auto-scroll-pauses-on-manual-scroll, deliberately differentiated from the pre-existing `terminal-window` chrome-only snippet).

Not yet done: SEO content audit pass (per [[project-content-audit]]) and the postbuild sitemap/category-page regen that normally follows a batch this size — flag for next session if not already run.

---

## 2026-08-08 — Blog: Three.js scroll scenes roundup (blog20.txt)

**[blog20.txt](blog/blog-posts/ui-snippets/blog20.txt)** — "9 Copy-Paste Three.js Scroll Scenes That Turn Scrolling Into Cinema." First `ui-snippets/` post to cover the `three-scroll-*` category, which has ~40 scroll-driven WebGL scenes and was almost entirely untouched by prior posts (only 3 of them appeared, briefly, in blog11's general scroll-animation roundup). Covers galaxy formation, black hole approach, rocket launch (stage separation), exploded product view, gear train (real tooth-ratio kinematics), hourglass (cube-root volume conservation), crystal bloom, 3D book page flip, and city flyover.

Every "How it works" paragraph was written from the actual snippet source (`src/components/UiSnippetsTool/snippets/three-scroll-*.js`), not paraphrased from the `seo.about.description` field, per the verification-over-paraphrase practice established in the blog18 entry above. The unifying theme called out in the intro and "why these don't feel like typical scroll effects" section — every scene derives all visuals from one scrubbed GSAP ScrollTrigger value, never a fired one-way tween — is a real, checkable property of all nine snippets' JS, not editorial framing.

Followed the established `ui-snippets/` roundup template (blog1–19.txt): H1 title in "N Copy-Paste [category] Snippets That [benefit]" form, intro + "what makes these good" bullets, one `<h2>` + iframe embed + How it works / Best for+Tip / Grab-the-code link per snippet, a "how to drop these into your project" steps section, and a Final thought closing with a link to the category page (`/ui-snippets/scroll/`).

---

## 2026-07-24 — New tool: SVG Playground (learn SVG, beginner → pro, with animation)

Added an interactive **SVG Playground** — a guided, browser-based course for learning SVG from first shapes to production animation. Layout is modeled on the JavaScript Playground (it reuses `ReactPlaygroundTool/styles.module.css`): lessons sidebar with search + chapter grouping + progress bar, collapsible concept panel, picker variants, live editor with syntax-highlighted overlay, split preview, Quick Check quizzes, prev/next + Mark Done, confetti on chapter completion, share-via-URL, and download.

- **[Component](src/components/SvgPlaygroundTool/index.js)** — swaps the JS runtime for live SVG rendering. The sandboxed iframe (`sandbox="allow-scripts"`) injects the markup into a `#stage` via `postMessage`, so CSS `@keyframes`, transitions, and SMIL (`<animate>`/`<animateTransform>`/`<animateMotion>`) all run. Adds an SVG/XML highlighter (reuses global `hl-*` token classes), a **preview background toggle** (transparency grid / white / dark), and a **Replay** button that re-injects the markup to restart animations. Download saves a real `.svg`.
- **[Lessons](src/components/SvgPlaygroundTool/lessons.js)** — 44 lessons across 12 chapters: SVG Basics (viewBox, coordinate system), Basic Shapes, Paths (M/L/Q/C/A/Z + Bézier), Styling & Strokes, Gradients & Patterns, Text & Groups, Transforms & Reuse (`<use>`/`<symbol>`), Filters & Effects, Clipping & Masking, Animation: CSS, Animation: SMIL, and Pro Techniques (self-drawing lines, spinner, animated icons, path morphing, animated gradients, responsive/accessible markup).
- **[Page + SEO](src/app/svg-playground/page.js)** — full metadata, FAQPage + SoftwareApplication + BreadcrumbList JSON-LD, and a deep SeoSection (about ~1200 words, 18 features, 8 how-to steps, 6 use cases, 10 FAQs, related links).
- **Icon**: [public/icons/svg-playground.svg](public/icons/svg-playground.svg) — orange SVG-logo palette with a Bézier/anchor-node motif.
- **Registration**: added to `tools-registry.js` (slug `svg-playground`, accent `#ff9800`, `status: 'live'` — this auto-feeds the sidebar, home grid, and sitemap via postbuild), `PlaygroundTopNav`, `FrontendPlaygroundsStrip`, home-page + Sidebar playground orderings, the `learn-to-code` category (27 → 28), and `related-tools.js` (own entry + cross-links from gsap-playground, svg-animation-generator, svg-motion-studio).

---

## 2026-07-23 — 10 gap-filling UI snippets (batch 2 of the demand analysis)

Added ten snippets filling the gaps identified by cross-referencing the library against a category-demand list: four items the library was missing outright (AI sidebar, signup form, cursor text, noise background) plus six carried over from the earlier 20-item traffic analysis. All with full `seo:` blocks passing `scripts/audit-snippet-seo.mjs`; `SNIPPET_COUNT` 760 → 770.

- **[ai-sidebar](src/components/UiSnippetsTool/snippets/ai-sidebar.js)** (`layouts`) — Copilot-style docked panel with negative-margin reflow slide, suggestion chips, streamed replies, orb launcher, regex intent table demo brain.
- **[signup-form](src/components/UiSnippetsTool/snippets/signup-form.js)** (`forms`) — reward-early/punish-late validation (touched-map), 5-level password meter, show/hide toggle, loading button, success overlay.
- **[cursor-text](src/components/UiSnippetsTool/snippets/cursor-text.js)** (`animations`) — agency contextual cursor: lerp follower, dot→pill morph with data-cursor zones, honest draggable "Drag" gallery, hover/pointer capability guards.
- **[noise-background](src/components/UiSnippetsTool/snippets/noise-background.js)** (`animations`) — feTurbulence data-URI film grain, overlay blending, oversized steps() jitter, --grain-* custom-property API with demo sliders.
- **[dashboard-widget-grid](src/components/UiSnippetsTool/snippets/dashboard-widget-grid.js)** (`dashboards`) — native DnD reordering with live grid-reflow preview, span toggle, ordered-id localStorage persistence; the three DnD gotchas commented.
- **[week-view-scheduler](src/components/UiSnippetsTool/snippets/week-view-scheduler.js)** (`dashboards`) — time-grid coordinate transform both directions, pointer-captured cross-day dragging, 30-min snap/clamp, now-line, repeating-gradient hour lines.
- **[csv-import-mapper](src/components/UiSnippetsTool/snippets/csv-import-mapper.js)** (`forms`) — column→field mapping wizard: hint-based auto-guessing, live samples, required gating, validated review table, honest skip reporting.
- **[live-code-playground](src/components/UiSnippetsTool/snippets/live-code-playground.js)** (`layouts`) — CodePen-style tabs + sandboxed srcdoc preview + postMessage console bridge (log/warn/error + window.onerror), debounced rebuilds.
- **[flashcard-deck](src/components/UiSnippetsTool/snippets/flashcard-deck.js)** (`cards`) — 3D flip button card, Leitner re-queue loop, gated rating, directional exits, first-try-honest SVG score ring, keyboard shortcuts.
- **[link-in-bio](src/components/UiSnippetsTool/snippets/link-in-bio.js)** (`layouts`) — Linktree replacement: conic-gradient avatar ring (padding-box/border-box), glassy staggered link cards, sheen featured link, analytics hook.

Still unbuilt from the analyses: video-trimmer, permission-matrix, active-sessions-list, team-invite-modal, plus small gaps (glass buttons, cursor distortion, newsletter popup). Next big lever per the strategy discussion: per-category hub pages for category-level search queries.

---

## 2026-07-23 — Moon-phases snippet render quality fix

`three-scroll-moon-phases` looked streaky/faceted at the terminator. Three root causes fixed: per-vertex white noise `rand(i)` replaced with continuous multi-octave trig noise over the surface direction (index-based noise shreds computed normals into streaks); `MeshLambertMaterial` (per-vertex Gouraud in r128) replaced with per-fragment `MeshStandardMaterial` (roughness .97, vertexColors); crater rim's hard `f > 0.75` step replaced with a smooth gaussian rim profile. Also: sphere 128→160 segments, five soft-edged dark maria patches + darkened crater floors baked as vertex colors. SEO about/FAQ/aiPrompt updated to match.

---

## 2026-07-23 — Notice-only cookie banner; ads/analytics always on

Switched from opt-in consent to a notice-only cookie banner. Google Consent Mode v2 defaults in `src/app/layout.js` changed from all-`denied` (with localStorage re-grant) to all-`granted`, so AdSense and GA4 now run fully from first page load for every visitor. `CookieConsent` reduced to a single full-width "Got it" button with new copy ("By continuing to use this site, you agree to our Terms of Use and Privacy Policy") linking both `/terms/` and `/privacy-policy/`; the Reject path, consent-update gtag call, and gating semantics were removed (localStorage now only records that the notice was seen). Sidebar `CookieSettingsButton` relabelled to "View cookie notice". Note: notice-only banners don't satisfy GDPR/ePrivacy for EEA/UK visitors — revisit if EU traffic becomes a concern.

---

## 2026-07-22 — 10 high-demand UI snippets (AI interfaces, modern CSS, editors)

Added ten new snippets targeting 2026 search demand, chosen from a 20-item traffic-opportunity analysis (AI product UI, modern CSS platform features, developer-facing editors). All have full 1200+ word `seo:` blocks (deep-dive about, steps, features, use cases, framework FAQ, aiPrompt), pass `scripts/audit-snippet-seo.mjs`, and interlink with related snippets. `SNIPPET_COUNT` bumped 750 → 760.

- **[ai-streaming-response](src/components/UiSnippetsTool/snippets/ai-streaming-response.js)** (`layouts`) — ChatGPT-style token-by-token reveal with tag-aware `safeSlice()` HTML streaming, line-by-line code blocks, leading-edge cursor, stop button, token counter, copy/regenerate footer.
- **[ai-agent-steps](src/components/UiSnippetsTool/snippets/ai-agent-steps.js)** (`dashboards`) — agent tool-call trace timeline: running→done step lifecycle, tool badges, grid-rows 0fr→1fr expandable input/result payloads, elapsed clock, answer card reveal, replay with timer cleanup.
- **[ai-model-selector](src/components/UiSnippetsTool/snippets/ai-model-selector.js)** (`forms`) — rich WAI-ARIA listbox model picker: option cards with context window, speed dots, pricing; aria-activedescendant roving focus, full keyboard support.
- **[ai-image-generator-ui](src/components/UiSnippetsTool/snippets/ai-image-generator-ui.js)** (`layouts`) — Midjourney-style prompt bar + ratio/style pills + 2×2 variation grid; deterministic procedural canvas art (prompt hash → mulberry32), shimmer + blur-up + staggered progress.
- **[ai-source-citations](src/components/UiSnippetsTool/snippets/ai-source-citations.js)** (`layouts`) — Perplexity-style RAG citations: superscript marker buttons, hover preview cards with quotes, hover-intent delayed hide, two-way marker↔chip highlighting.
- **[view-transitions-gallery](src/components/UiSnippetsTool/snippets/view-transitions-gallery.js)** (`animations`) — native `document.startViewTransition` grid→detail shared-element morph with dynamic view-transition-name tagging, CSS-only motion tuning, reduced-motion + no-support fallbacks.
- **[container-query-card](src/components/UiSnippetsTool/snippets/container-query-card.js)** (`cards`) — one product card, three layouts via `@container` breakpoints + `cqi` fluid title; drag-resize playground with pointer capture and ResizeObserver readout, fixed 240px twin as proof.
- **[anchor-positioning-menu](src/components/UiSnippetsTool/snippets/anchor-positioning-menu.js)** (`navigation`) — native Popover API + CSS anchor positioning dropdowns: position-area, position-try-fallbacks auto-flip in a scrollable stage, @starting-style/allow-discrete animations, @supports fallback.
- **[code-diff-viewer](src/components/UiSnippetsTool/snippets/code-diff-viewer.js)** (`layouts`) — real LCS diff algorithm over lines, unified & split table renderings, del/add pairing with prefix/suffix intra-line highlights, expandable context hunks, +/− stats header.
- **[block-editor](src/components/UiSnippetsTool/snippets/block-editor.js)** (`forms`) — Notion-style per-block contenteditable editor: 7 block types, filtering slash menu with mousedown-safe apply, Enter/Backspace block management with list continuation, `:empty::before` placeholders.

Remaining 10 ideas from the analysis (not yet built): live-code-playground, video-trimmer, csv-import-mapper, permission-matrix, active-sessions-list, team-invite-modal, dashboard-widget-grid, link-in-bio, flashcard-deck, week-view-scheduler.

---

## 2026-07-22 — 20 Three.js + GSAP scroll snippets (batch 3)

Added twenty new scroll-driven Three.js + GSAP ScrollTrigger snippets (category `scroll`, CDN trio three@0.128 + gsap@3 + ScrollTrigger). All follow the series conventions: one scrubbed value (`ease:'none'`, pinned section), everything derived per frame so reverse scroll is exact, seeded sin-hash instead of `Math.random` wherever reversibility needs it, clock-driven idle motion, corner HUD + intro overlay, full 1200+ word `seo:` blocks with interlinks, framework FAQ, and `aiPrompt`:

- **[three-scroll-planet-approach](src/components/UiSnippetsTool/snippets/three-scroll-planet-approach.js)** — deep-space flight into orbit; vertex-colored continents, BackSide atmosphere, braking-curve distance easing.
- **[three-scroll-ocean-dive](src/components/UiSnippetsTool/snippets/three-scroll-ocean-dive.js)** — surface-to-seafloor descent; two-stage fog color grade, dive-through double-sided wave plane, additive god rays, rising bubbles.
- **[three-scroll-rubiks-assemble](src/components/UiSnippetsTool/snippets/three-scroll-rubiks-assemble.js)** — 27 cubelets with per-face material arrays fly home center-out via hand-rolled reversible stagger; 80/20 assembly/turntable phase split.
- **[three-scroll-exploded-view](src/components/UiSnippetsTool/snippets/three-scroll-exploded-view.js)** — 5-layer stylized device peels top-down into an exploded diagram, then a 150° inspection orbit; label names each layer.
- **[three-scroll-voxel-build](src/components/UiSnippetsTool/snippets/three-scroll-voxel-build.js)** — data-driven voxel tower (hollow-ring plan with setbacks) built by per-block scroll slices with easeOutBack landings and a crane camera.
- **[three-scroll-gear-train](src/components/UiSnippetsTool/snippets/three-scroll-gear-train.js)** — 5 procedural brass gears; scroll scrubs the driver angle, downstream gears derive via true tooth-count ratios with half-tooth phase offsets.
- **[three-scroll-pendulum-wave](src/components/UiSnippetsTool/snippets/three-scroll-pendulum-wave.js)** — the classic 15-pendulum physics demo with scroll scrubbing simulated time (closed-form angles, so time-travel is exact).
- **[three-scroll-tornado-vortex](src/components/UiSnippetsTool/snippets/three-scroll-tornado-vortex.js)** — 2,600 stateless particles gather into a wandering funnel; intensity arc (ramp/hold/disperse), debris lift-off threshold at 0.5.
- **[three-scroll-hologram-scan](src/components/UiSnippetsTool/snippets/three-scroll-hologram-scan.js)** — real THREE.Plane clipping (localClippingEnabled) scrubbed as scan height over a torus-knot; clipped fill + wireframe + unclipped ghost.
- **[three-scroll-mobius-ride](src/components/UiSnippetsTool/snippets/three-scroll-mobius-ride.js)** — camera rides a parametric Möbius strip u 0→4π; surface-normal camera.up (no world up), lap-two normal flip, single 4π boundary edge.
- **[three-scroll-book-pages](src/components/UiSnippetsTool/snippets/three-scroll-book-pages.js)** — 12 pages hinge at the spine via geometry.translate, bend with a half-sine envelope mid-flip, overlapping windows, stack transfer.
- **[three-scroll-seasons-tree](src/components/UiSnippetsTool/snippets/three-scroll-seasons-tree.js)** — low-poly tree through a full year via a 5-entry keyframe table (smoothstepped); one particle system plays blossoms/leaf-fall/snow.
- **[three-scroll-black-hole](src/components/UiSnippetsTool/snippets/three-scroll-black-hole.js)** — 5,200-particle Keplerian (ω∝r^-1.5) accretion disk, photon ring, time-dilation spin-up HUD, FOV creep 60→84°.
- **[three-scroll-rocket-launch](src/components/UiSnippetsTool/snippets/three-scroll-rocket-launch.js)** — two-stage launch with mission phase table, hierarchy-based stage separation, thrust-gated exhaust, sky→space darkness scalar.
- **[three-scroll-hourglass](src/components/UiSnippetsTool/snippets/three-scroll-hourglass.js)** — sand piles conserve volume via cbrt scaling, tip-pinned cones, accelerating grain stream, end-of-scroll flip.
- **[three-scroll-domino-run](src/components/UiSnippetsTool/snippets/three-scroll-domino-run.js)** — 64 dominoes on a CatmullRom S-curve topple via edge-pivot geometry translation; 74° rest lean, spline-following chase camera.
- **[three-scroll-bridge-build](src/components/UiSnippetsTool/snippets/three-scroll-bridge-build.js)** — first-person canyon crossing where planks fly in ahead of the walker (frontier at p×1.16), catenary sag shared by camera height, footstep bob.
- **[three-scroll-prism-split](src/components/UiSnippetsTool/snippets/three-scroll-prism-split.js)** — white beam into a 3-segment-cylinder prism, 7 spectral rays fan with violet bending most; beams are stretched boxes (WebGL line-width workaround).
- **[three-scroll-moon-phases](src/components/UiSnippetsTool/snippets/three-scroll-moon-phases.js)** — full synodic month by orbiting the light (no masks); crater-displaced sphere, earthshine ambient, libration wobble, 8-phase HUD.
- **[three-scroll-asteroid-belt](src/components/UiSnippetsTool/snippets/three-scroll-asteroid-belt.js)** — 320 rocks in ONE InstancedMesh (DynamicDrawUsage, per-instance color); analytic weaving path guarantees a clear corridor, banking camera, near-miss gates with scrub-safe re-arm counting.

Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js) (import block + SNIPPETS array), `SNIPPET_COUNT` 730→750 in [snippet-count.js](src/lib/snippet-count.js). All 20 files syntax-verified via node ESM import; `scripts/audit-snippet-seo.mjs` shows 0 violations for the new batch (25 pre-existing title/description violations remain in the 2026-07-19 Three.js batches).

Previews captured for all 20 via `scripts/capture-snippet-previews.mjs` (mid-scroll, 0 failures) into `public/images/ui-snippets/previews/`. The bridge-build first-person camera originally produced a near-empty thumbnail (edge-on deck staring at the far cliff), so its camera was reframed to an over-the-shoulder view — above/behind/beside the walker, looking down at the arrival frontier — which also improves the live scene, then recaptured.

## 2026-07-21 — Site cookie consent banner + Google Consent Mode v2

Removed the `ToolNudge` "What's inside FWD Tools" popup from [layout.js](src/app/layout.js) (import + render), then added a real GDPR-style cookie consent banner:

- **New [CookieConsent](src/components/CookieConsent/index.js) component** (client) — fixed bottom-left popover, cookie icon, "We value your privacy", description, Privacy Policy link (`/privacy-policy/`), and equal-prominence **Reject** (outline) / **Accept All** (primary) buttons. Fade-and-slide entrance (respects `prefers-reduced-motion`), `role="dialog"` + `aria-labelledby`/`aria-describedby`, `:focus-visible` rings, responsive (full-width under 480px). Styling via CSS-variable tokens in [styles.module.css](src/components/CookieConsent/styles.module.css). Choice saved under `localStorage['fwd-cookie-consent']` so it never reappears; returns `null` on embed routes (matches other chrome). Rendered in [layout.js](src/app/layout.js).
- **Google Consent Mode v2 wired in.** An inline sync `<script>` in the layout `<head>` (before AdSense + GA, so it's first in the dataLayer) sets `ad_storage`/`ad_user_data`/`ad_personalization`/`analytics_storage` to `denied` by default, then grants immediately if the visitor accepted on a prior visit (reads the same localStorage key). The banner's Accept/Reject calls `gtag('consent','update', …)` to flip all four signals. Net effect: GA4 and AdSense run in consent-denied mode until the visitor accepts — the compliant default for EU traffic. `window.gtag` is defined by that head script so the update queues even before gtag.js/adsbygoogle.js finish loading.

- **Persistent "Cookie settings" control in the sidebar bottom.** Visitors can reopen the banner to change or withdraw consent (GDPR requires withdrawal to be as easy as granting). Final placement is a **sidebar-bottom button next to the light/dark toggle**, styled to match it — new [CookieSettingsButton](src/components/CookieSettingsButton/index.js) (dispatches an `open-cookie-settings` window event) added to `sidebarBottom` (now a flex column). CookieConsent listens for that event and reopens the banner. (An earlier iteration used a floating bottom-left pill; that was replaced by the sidebar button per request, and the `.fab` styles were removed.)

**Contact email fix (same day):** replaced the `[your-email@example.com]` placeholder with `puneet438@gmail.com` (as a `mailto:` link) on both [privacy-policy/page.js](src/app/privacy-policy/page.js) and [terms/page.js](src/app/terms/page.js).

Still open if wanted: gating any other third-party scripts behind the stored consent.

## 2026-07-21 — 5 more Lottie scroll UI snippets (batch 2)

Added five scroll-driven Lottie snippets, all self-contained (Lottie JSON **built in code**, not fetched) and scrubbed by GSAP ScrollTrigger the same way as [lottie-scroll-scrub](src/components/UiSnippetsTool/snippets/lottie-scroll-scrub.js): `autoplay:false` + `goToAndStop(p*(total-1), true)` in a rAF loop, fully reversible, intro caption fades on scroll:
- **[lottie-scroll-line-draw](src/components/UiSnippetsTool/snippets/lottie-scroll-line-draw.js)** — a sine wave strokes on via a trim path with a dot riding the tip (dot position sampled from the wave each frame).
- **[lottie-scroll-bar-chart](src/components/UiSnippetsTool/snippets/lottie-scroll-bar-chart.js)** — bars grow from a base-aligned origin via vertical scale, staggered by column, colours interpolated.
- **[lottie-scroll-orbit-rings](src/components/UiSnippetsTool/snippets/lottie-scroll-orbit-rings.js)** — three partial-arc rings (trimmed ellipses + leading dots) rotate at different speeds/directions around a hub.
- **[lottie-scroll-pulse-dots](src/components/UiSnippetsTool/snippets/lottie-scroll-pulse-dots.js)** — a ring of dots placed by trig, each scaling+fading in staggered by index to assemble a loader.
- **[lottie-scroll-donut-chart](src/components/UiSnippetsTool/snippets/lottie-scroll-donut-chart.js)** — one ring copied into trim-path segments that draw in sequence, each over a value-proportional timeline window.

Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js), `SNIPPET_COUNT` 725→730. All pass `scripts/audit-snippet-seo.mjs` (descriptions trimmed to ≤165). Previews captured (mid-scroll).

**New Lottie-in-code gotcha (beyond the keyframe-tangent one):** for hand-built vector paths (`sh`), build **fresh `i`/`o` tangent arrays per path** and never reuse a path object across two layers — lottie-web rewrites tangent arrays in place (relative→absolute), so sharing the `i`/`o` reference or the whole path corrupts the bezier control points (symptom: a clean function-of-x polyline renders as a striped/fanned blob). Also: no backticks inside the `js` template-literal comments. Caught the tangent-sharing bug via a path-`d` dump in Playwright — the wave's cubic control points came out as garbage (`C200,640…`) until each path got its own arrays.

## 2026-07-21 — Lottie scroll-scrub UI snippet added

Added `lottie-scroll-scrub` ([lottie-scroll-scrub.js](src/components/UiSnippetsTool/snippets/lottie-scroll-scrub.js)) — a scroll-driven Lottie: as you scroll a pinned stage, a progress ring draws itself and a checkmark strokes in, fully reversible on scroll-up. Loads `lottie-web@5.12.2` + `gsap` + `ScrollTrigger` from CDN. The Lottie animation is authored **inline as an `animationData` JSON object** (not fetched) so the snippet is self-contained and can't 404 in the sandboxed preview — with a comment showing how to swap it for `path: 'your-animation.json'`. Scrub mechanism: `autoplay:false`, a single GSAP-scrubbed 0→1 value, and `anim.goToAndStop(p * (totalFrames-1), true)` in a rAF loop. The draw effect is a Lottie trim path (`tm`) animating its end 0→100. Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js), `SNIPPET_COUNT` 724→725. Passes `scripts/audit-snippet-seo.mjs`. Preview captured.

Debugging note for future hand-authored Lottie JSON: animated keyframes **must include `i`/`o` easing tangents** — lottie-web treats a keyframe without them as a hold keyframe and never interpolates the value. The trim's end stayed at 0 (empty ring) until linear tangents (`i:{x:[0.5],y:[0.5]}, o:{x:[0.5],y:[0.5]}`) were added to the two animated trim properties. Verified via Playwright that `currentFrame` advanced but the trimmed path was `M0 0` until the fix.

## 2026-07-20 — 10 more scroll-driven Three.js UI snippets added (batch 3)

Added 10 more scroll-scrubbed Three.js snippets to `src/components/UiSnippetsTool/snippets/`, same CDN (`three@0.128.0` + `gsap@3` + `ScrollTrigger`) and single-scrubbed-progress-value pattern as `three-scroll-tunnel`: `three-scroll-galaxy-formation` (particles lerp from scatter into a spiral galaxy), `three-scroll-shatter-assemble` (crystal fragments fly together via position lerp + quaternion slerp), `three-scroll-city-flyover` (banking camera over a low-poly night skyline with canvas-generated window textures), `three-scroll-portal-gate` (camera threads 10 discrete pulsing torus gates), `three-scroll-crystal-bloom` (staggered shard reveal with physical glass material), `three-scroll-fabric-ripple` (vertex-displaced cloth plane with recomputed normals), `three-scroll-typo-shatter` (InstancedMesh cubes sampled from a 2D canvas letterform, scatter ↔ assemble), `three-scroll-staircase-climb` (camera walks a helix staircase), `three-scroll-constellation-web` (precomputed edge list revealed via `setDrawRange`), `three-scroll-lightning-orb` (charging energy orb with regenerating jittered lightning arcs). Built via 5 parallel background agents (2 snippets each) against the `three-scroll-tunnel.js` reference file for pattern fidelity. Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js), `SNIPPET_COUNT` bumped 714 → 724 in [snippet-count.js](src/lib/snippet-count.js). All 10 pass `scripts/audit-snippet-seo.mjs` (one description trimmed for length) and a full `node --check` sweep.

**Preview capture reworked so scroll snippets show the real 3D scene.** Originally each snippet led with a "scroll to begin" intro `<section>`, and [capture-snippet-previews.mjs](scripts/capture-snippet-previews.mjs) clips the first `<body>` child — so thumbnails were just intro text on black. Fixed in three parts: (1) restructured all 10 snippets' HTML so the pinned `.xxx-stage` (canvas) is the first body element and the intro caption became an absolutely-positioned `.xxx-intro-overlay` inside it (same for the live page, plus the overlay now fades out once `progress > ~0.03` and fades back in on scroll-up, per user request — one `introEl.style.opacity` line in each rAF loop + a CSS `transition`); (2) taught the capture script to detect ScrollTrigger snippets (by `cdnUrls` containing `ScrollTrigger`) and drive the `ScrollTrigger` instance to ~50% progress before shooting, with a poll-retry that confirms `st.progress` actually holds near 0.5, then screenshot the full viewport (not a bounding-box clip — GSAP's pin-spacer makes the first-child box wrong once scrolled); (3) switched the script to a **fresh Playwright page per snippet** — reusing one page carried scroll position + stale ScrollTrigger state between snippets, which pinned every scroll snippet after the first at 0% progress. Also brightened `three-scroll-staircase-climb`'s lighting (added a HemisphereLight, wider/higher point-light falloff, thinner fog) because at 50% climb the camera sat in an unlit gap between point lights and the thumbnail came out black. All 10 previews now render the effect mid-motion (galaxy 50% formed, crystal 14/22 shards, constellation 110/220 links traced, lightning orb 50% charge, etc.), verified visually.

## 2026-07-19 — Fixed CDN-based snippet previews not animating in gallery/home cards

Found and fixed a real bug (not specific to the new Three.js batch, but exposed by it): four lightweight preview-card components each had their own local `buildSrcdoc(html, css, js)` helper that never accepted or injected `cdnUrls` — unlike the main editor's `buildSrcdoc` in [UiSnippetsTool/index.js](src/components/UiSnippetsTool/index.js), which has always supported it. Any snippet depending on an external CDN script (all 20 new Three.js snippets, plus existing GSAP-based ones like `scroll-typewriter`) rendered with a black/blank canvas in these previews — `THREE`/`gsap` were undefined, so the inline script threw immediately and nothing animated, even though the same snippet worked fine in the full editor and on its own page. Fixed all four: [HeroSnippetPreview/index.js](src/components/HeroSnippetPreview/index.js), [HomeLatestSnippets/index.js](src/components/HomeLatestSnippets/index.js), [MoreInCategoryStrip/index.js](src/components/MoreInCategoryStrip/index.js), and [UiSnippetsGallery/index.js](src/components/UiSnippetsGallery/index.js) (the main `/ui-snippets/` grid) — each now accepts a `cdnUrls` parameter and injects `<script src>`/`<link rel="stylesheet">` tags into the iframe's `srcDoc`, matching the reference implementation. Verified by starting the dev server and confirming `three.min.js` now appears in the homepage's rendered srcdoc.

## 2026-07-19 — 10 more Three.js/WebGL UI snippets added (batch 2)

Added 10 more Three.js snippets to `src/components/UiSnippetsTool/snippets/`, same CDN version and standard as the batch below: `three-galaxy-spiral`, `three-liquid-metal-sphere` (real-time CubeCamera reflections), `three-synthwave-terrain` (two-tile relay-scroll infinite grid), `three-dna-helix`, `three-magnetic-particles` (raycast-driven cursor repulsion), `three-crystal-cluster` (clearcoat glass materials), `three-wave-ribbon` (animated CatmullRomCurve3 + TubeGeometry), `three-holographic-globe` (wireframe globe + radar pings), `three-digital-grid-pulse` (independently-timed fading cube grid), `three-comet-trail` (recycled particle-pool trail). Full comprehensive SEO content on all 10 from the start, verified against `scripts/check-specific-snippets.mjs` (0 failing) and a full `node --check` sweep across all 704 snippet files. `SNIPPET_COUNT` bumped 694 → 704. Same known gap as the batch below: no preview screenshots yet for any of these 10.

## 2026-07-19 — 10 new Three.js/WebGL UI snippets added

Added 10 new UI snippets to `src/components/UiSnippetsTool/snippets/`, all built on Three.js loaded from a CDN (`three@0.128.0` — the last version with a non-module `OrbitControls.js` UMD addon usable via plain `<script>` tags): `three-particle-wave`, `three-morphing-blob`, `three-orbit-rings`, `three-starfield-warp`, `three-solar-system`, `three-instanced-cube-wave`, `three-network-graph`, `three-product-viewer`, `three-interactive-mesh-distortion`, `three-scroll-camera-path` (the last combines GSAP ScrollTrigger with a Three.js camera, same pattern as [scroll-typewriter.js](src/components/UiSnippetsTool/snippets/scroll-typewriter.js)). Each ships full comprehensive SEO content (about/howToUse/features/useCases/faqs/aiPrompt) from the start rather than starting thin — verified against `scripts/check-specific-snippets.mjs`, 0 failing. Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js) (import + array entry), `SNIPPET_COUNT` bumped 684 → 694 in [snippet-count.js](src/lib/snippet-count.js). Full `node --check` sweep across all 694 snippet files confirmed clean. No preview screenshots exist yet for these 10 (`/images/ui-snippets/previews/<id>.png`) — tracked in `content-audit.md`.

## 2026-07-18 — "Build with AI" section redesigned as a card with a copy-paste code box; 161 dev snippets promoted live

Redesigned the "Build, Understand, Optimize, and Extend It With AI" section (see 2026-07-17 entry below): it was rendering as plain undecorated text via a generic `<pre>` hack. Replaced with a dedicated `aiPrompt` section type in [SeoSection/index.js](src/components/SeoSection/index.js) — a new `AiPromptSection` component wraps the paragraph + a "Prompt to recreate it" sub-heading + a `PromptCodeBox` (macOS-style dot header, "text" language label, Copy-to-clipboard button with "Copied!" feedback) inside a `.boxedText` card, matching the visual treatment of other boxed sections on the page. New CSS (`.promptWindow`, `.promptHeader`, `.promptDots`, `.promptCopyBtn`, etc.) reuses the same mac-dot colors already used in the `terminal-window`/`browser-window` snippets. Section order moved to sit right after About (previously last). Continued the aiPrompt content rollout across the remaining snippets via more background batch agents (smaller batches this time, 7×~37 files, after the previous day's 14-at-once attempt burned through the session quota fast) — up to 631/684 snippets now have it.

Separately, ran `scripts/audit-dev-snippets.mjs` against all 238 `noindex: true` (dev-mode) snippets and promoted the 161 that already passed the content-quality bar (400+ word about, 1200+ total words, features/useCases/faqs minimums, framework mentions, 2+ interlinks) to live: removed `noindex: true`, bumped `lastmod`, and updated `SNIPPET_COUNT` in [snippet-count.js](src/lib/snippet-count.js) from 446 → 607. Verified with a full `node --check` sweep across all 684 snippet files (clean) and cross-checked the indexed count against the actual file scan.

**Later the same day:** finished the aiPrompt rollout to all 684/684 snippets (a couple of the last background batches hit the account's monthly spend cap mid-run, but their work had already landed). Then, per explicit follow-up instruction, promoted the remaining 77 dev snippets to live regardless of content-quality status — `SNIPPET_COUNT` now 684, zero snippets left `noindex`. Added [scripts/check-specific-snippets.mjs](scripts/check-specific-snippets.mjs) to re-check specific ids against the same thresholds without requiring `noindex` still present; used it to confirm 54 of those 77 are short only on About-text length (330–399 words vs. the 400 floor — every other check passes). Full list logged in `content-audit.md` for a future content pass.

## 2026-07-17 — "Build with AI" section added to UI snippet pages (429/684 done)

Added a new `aiPrompt` field to the UI snippet `seo` schema: a paragraph (understand/optimize/extend, tailored per-snippet) plus a copy-paste "recreate this from scratch" prompt, rendered as a "Build, Understand, Optimize, and Extend It With AI" section near the bottom of each snippet's page. Implementation: [SeoSection/index.js](src/components/SeoSection/index.js) — `normalizeSections` now accepts `aiPrompt` and turns it into a `text` section; `Paragraphs`/the About renderer now also support a `<pre>` block (in addition to the existing `<table>` support) so the prompt renders as a styled code box (new `.seoPre` class in [styles.module.css](src/components/SeoSection/styles.module.css)); wired through in [ui-snippets/[slug]/page.js](src/app/ui-snippets/%5Bslug%5D/page.js). Populated for `split-flap-display`, `text-particles`, and `scroll-typewriter` by hand first (matching their tutorial blog posts), then ran 14 parallel background agents to fill in the rest of the ~684 snippet files in batches of ~49. Two rounds of agents hit an account-wide session limit mid-run; after resuming once, **429/684 files are done**. One in-flight edit (`mega-menu-panel.js`) briefly broke the Next.js build with a stray extra `}` from a batch edit — caught via the user's build-error report, fixed, then verified with a full `node --check` sweep across all 684 snippet files (no other breakage). Remaining ~255 files and resume plan tracked in `content-audit.md` under "UI Snippets only".

## 2026-07-17 — Blog header/footer link fixes; tutorial3.txt (Split Flap Display)

Removed the "Blog" quick link from the sidebar ([Sidebar/index.js](src/components/Sidebar/index.js)) and repointed the footer's "Blog" link ([Footer/index.js](src/components/Footer/index.js)) to `https://www.webdevpuneet.com/` (external, opens in a new tab) instead of the in-app `/blog/` route. Also wrote [tutorial3.txt](blog/blog-posts/tutorials/tutorial3.txt), a full A-to-Z walkthrough of the `split-flap-display` UI snippet (CSS 3D `rotateX` hinges, the double-rAF transition trigger, step-through-charset cycling, column stagger), matching the depth/structure of tutorial1 and tutorial2.

## 2026-07-15 — "Pop out full screen" button added to the embed page

Added a pop-out button to the `/embed` route's top bar ([EmbedShell.js](src/app/ui-snippets/%5Bslug%5D/embed/EmbedShell.js)), matching the existing "Pop out preview in new window" button in the main editor ([UiSnippetsTool/index.js](src/components/UiSnippetsTool/index.js)) — same technique: build a `Blob` from the `srcDoc` HTML, open it via `URL.createObjectURL` in a real new tab (`window.open`), revoke the object URL once that tab loads. This works even though the embed page is itself nested inside a third-party site's `<iframe>` (a blog post, in the motivating case) — `window.open` always escapes the outer frame, which a same-page `requestFullscreen()` call can't reliably do across browsers/sandboxed iframes. Styled as a small icon-only button (`.popOutBtn`) next to the existing "Edit in Editor" link; moved the mobile-compact media query's `margin-left: auto` (which re-pins the trailing button cluster to the right edge once the title collapses) from `.editLink` to `.popOutBtn`, since the latter is now the first element in that cluster.

## 2026-07-15 — `quickto-cursor` and `scroll-smoother-parallax` promoted to live

Both were just short of the 1200-word SEO floor — `quickto-cursor` at 1189 (added an FAQ on stacking a third lagged follower for a comet-trail effect), `scroll-smoother-parallax` at 1173 (added an FAQ on keyboard-scroll and screen-reader behavior). Both confirmed passing `scripts/audit-dev-snippets.mjs`, `noindex: true` removed, `lastmod` bumped. `SNIPPET_COUNT` bumped 444 → 446 in [snippet-count.js](src/lib/snippet-count.js); actual indexed count matches exactly, no drift warning.

---

## 2026-07-15 — Vue export DOM-timing bug fixed + "Export as…" code section removed sitewide

- **Vue export bug — `gsap.quickTo`/`.to`/`.from`/`.fromTo`/`.set`/`gsap.utils.toArray` on a literal selector**: reported via `/ui-snippets/quickto-cursor/`'s Vue preview — the cursor dot/ring never tracked the pointer. Root cause in `analyzeVanillaJs()` ([snippet-exporters.js](src/lib/snippet-exporters.js)): the heuristic that decides whether a top-level `var x = ...` initializer must be deferred into `onMounted()` (vs. hoisted into `setup()`, which runs before the template mounts) only recognized `ScrollTrigger`/`scrollTrigger:` as DOM-dependent. `var dotX = gsap.quickTo('#qtcDot', 'x', {...})` resolves `'#qtcDot'` against the live DOM the instant it runs — hoisted into `setup()`, the element doesn't exist yet, so quickTo silently no-ops and the returned setter never animates anything. Confirmed the bug is Vue-only: React wraps the whole JS body in `useEffect()` and Angular in `ngAfterViewInit()`, both always post-mount, so only Vue's selective hoist/mount split was affected. Added two more heuristic checks alongside the existing ScrollTrigger one: `usesSelectorGsapCall` (`gsap.(quickTo|to|from|fromTo|set)('literal selector', ...)`) and `usesToArraySelector` (`gsap.utils.toArray('literal selector')`) — the latter caught a second, previously-unnoticed instance of the same bug class in `scroll-skew-velocity.js` (`var skews = gsap.utils.toArray('.skew')`, which fed a `.map()` that would have captured an empty array). Verified against the extracted `analyzeVanillaJs` logic in isolation (module path aliases don't resolve under plain `node`) — all four `quickTo` assignments in `quickto-cursor` now correctly land in the `onMounted` bucket instead of `setup()`.
- **"{title} — Export as HTML, React, Vue, Angular & Tailwind" section removed from every snippet page**: this was the large tabbed full-source-code block (6 tabs: HTML, Tailwind, React, React+Tailwind, Vue, Angular) rendered below the FAQs on every `/ui-snippets/[slug]/` page via `SeoSection`'s `bottomExtra` prop — removed at the user's request. Since it's one shared template (`[slug]/page.js`), the removal applies to all snippet pages at once. Also removed the now-dead machinery that only existed to feed it: the 6 `snippet-exporters.js` calls (`toHtmlFile`/`toReactComponent`/`toTailwindComponent`/`toTailwindHtml`/`toVueSfc`/`toAngularComponent` — confirmed still used elsewhere, by the live editor's export buttons in `ExportTester.js`/`UiSnippetsTool/index.js`, so `snippet-exporters.js` itself is untouched), the build-time `Promise.all` of 6 `highlightCode()` calls and the local `highlight()` wrapper, and the corresponding dead CSS in `styles.module.css` (`.codeHeading`/`.codeBlocks`/`.codeBlock`/`.codeHeader`/`.codeLabel`/`.copyBtn`/`.copyBtnDone`/`.codeTabBar`/`.codeTabBtn`/`.codeTabPanel*`/`.codePre` and nested rules). Deleted `CodeTabs.js` and `CopyCodeButton.js` — both were exclusively used by this section and had no other callers anywhere in the codebase. The embed page's own `highlightCode` usage (dark-themed HTML/CSS/JS tabs) is a separate, untouched code path. The screenshot section (`aboutExtra`) is unaffected and still renders.

## 2026-07-15 — Syntax highlighting in the embed page + edit-button right-align fix

- **`/embed` code tabs now syntax-highlighted**: previously a plain white-on-dark `<pre>{code}</pre>` with zero color, unlike the canonical `/ui-snippets/[slug]/` page which already used `shiki`. Extracted the duplicated highlighter setup out of `[slug]/page.js` into a shared [src/lib/shiki-highlight.js](src/lib/shiki-highlight.js) (`highlightCode(code, lang, theme)`, one cached highlighter instance loaded with both `github-light` and `github-dark` themes now, reused across both routes). `[slug]/page.js` refactored to call the shared helper (`theme: 'github-light'`, unchanged behavior). `embed/page.js` now highlights html/css/js server-side with `theme: 'github-dark'` (matches the shell's dark UI) and passes both the highlighted HTML and the raw code down to `EmbedShell` — raw code still powers the Copy button, highlighted HTML renders via `dangerouslySetInnerHTML` in a wrapper div. `styles.module.css` resets shiki's own inline `<pre>/<code>` background to transparent (`:global(pre)`/`:global(code)` overrides, same technique the main page already used) so `.codePane`'s dark background shows through instead of clashing with the theme's own bg color.
- **Edit-button right-align fix on mobile**: the compact mobile media query added earlier hides `.embedTitle` (which carries `margin-right: auto`, the thing pushing the tab group + edit button to the right). A `display:none` element doesn't participate in flex layout, so its `margin:auto` had nothing to push against and the group collapsed to the left edge instead — confirmed via screenshot. Fixed by adding `margin-left: auto` directly on `.editLink` inside the same media query, so it always lands flush right regardless of title visibility.
- **Hover-only scrollbar on the embed code pane — tried and reverted**: added a hover-only scrollbar to `.codePane` (hidden via `scrollbar-color`/`::-webkit-scrollbar-thumb` set transparent, visible on `:hover`), then reverted at the user's request — `.codePane` keeps its plain default scrollbar, always visible.
- **New "Mobile Screens" UI-snippet category** (`id: 'mobile'`): the 19 `mobile-*` full-screen snippets were sitting almost entirely in `Layouts`, alongside bento grids and masonry — a different genre of thing (full-screen compositions, same reasoning that already justifies `Pricing`/`Heroes`/`Dashboards` as their own categories). Added the pill to `CATEGORIES` in [snippets.js](src/components/UiSnippetsTool/snippets.js) and `UI_SNIPPET_CATEGORIES` in [Sidebar/index.js](src/components/Sidebar/index.js) (+ a phone-outline icon in `UI_CAT_ICONS`), retagged 25 snippets total via Python/UTF-8 — the 19 `mobile-*` screens plus 6 related full-screen states that weren't `mobile-`-prefixed but are the same genre: `paywall-screen`, `splash-screen`, `camera-ui`, `dialer-keypad`, `app-store-card`, `wallet-card` (moved out of pricing/loaders/layouts/forms/cards). Synced the gallery pill lists and "14 categories" → "15 categories" copy in [ui-snippets/page.js](src/app/ui-snippets/page.js). **Learned from the earlier scroll-category miss:** added `CATEGORY_SEO.mobile` and a full `CATEGORY_CONTENT.mobile` entry (title/subtitle/~700-word about/9 features/6 useCases/5 FAQs) in [[slug]/page.js](src/app/ui-snippets/%5Bslug%5D/page.js) up front, so `/ui-snippets/mobile/` renders instead of 404ing like `/ui-snippets/scroll/` initially did. Verified all 43 single-quoted strings in the new content block have properly escaped apostrophes (a past mistake class), and confirmed 15/15 matching category arrays, 25 snippets tagged `mobile`, no unknown categories, no duplicate ids. **2026-07-15 follow-up:** user added `public/images/ui-snippets/mobile.png`, but same issue as `scroll.png` before it — 1731×909/1.4MB, off the site's 1200×630/~250KB convention. Resized with `sharp` to 1200×630/229KB and registered `'mobile'` in `categoryOG()`'s allowlist in [[slug]/page.js](src/app/ui-snippets/%5Bslug%5D/page.js) — `/ui-snippets/mobile/` now gets its real OG card instead of the generic fallback.
- **Ugly native scrollbar fixed on all mobile screens**: every `mobile-*` snippet centers a fixed 600px-tall phone frame inside `body { min-height:100vh; padding:24px }`. When the preview pane (editor Result tab, embed iframe) is shorter than ~648px, the whole body overflows and the browser's default thick grey scrollbar appears next to the phone, clashing with the dark UI (screenshot: `mobile-fitness-screen`). First pass styled it as a slim themed thumb (kept `overflow` scrollable, visible at all times); user then asked for it fully hidden instead. First hide attempt (`scrollbar-width:none` + `body::-webkit-scrollbar{display:none}`) still left a scrollbar visible in the site's own editor preview (a second screenshot) — because `buildPreviewSrcdoc` ([snippet-preview.js](src/lib/snippet-preview.js)) wraps the snippet in a bare `<html><body>`, and with neither element's `overflow` property explicitly set, the browser propagates the overflow to the *viewport* and can attribute the rendered scrollbar to `<html>` rather than `<body>` depending on engine — so a body-only pseudo-element rule doesn't reliably catch it. Added matching `html{scrollbar-width:none;-ms-overflow-style:none}` + `html::-webkit-scrollbar{display:none}` alongside the existing body rules in all 19 `mobile-*.js` files via Python/UTF-8. Scrolling itself is untouched (wheel/touch/drag still work) — no `overflow` value was changed, only scrollbar-rendering cosmetics on both elements. Verified all 19 load with both html and body hide rules present.
- **`drag-spin-dial` promoted to live**: was 1156/1200 words on the SEO audit, 44 short. Added one more FAQ (setting the dial to a specific starting value/rotation instead of the default) to clear the floor, confirmed via `scripts/audit-dev-snippets.mjs`, removed `noindex: true`, bumped `lastmod`. Also fixed `SNIPPET_COUNT` (442 → 444 in [snippet-count.js](src/lib/snippet-count.js)) — this promotion plus the pre-existing 442-vs-443 drift flagged on 2026-07-14 (unrelated to this session, never fixed) both needed correcting; actual indexed count is now 444 with zero drift warning.
- **Inner scroll-container scrollbars hidden too**: after fixing the outer preview-body scrollbar, a follow-up screenshot showed a second, different native scrollbar — this one on the *internal* scrollable content inside the phone itself (e.g. `.mc-thread` in the chat screen), which real mobile UIs never render visibly. Grepped all 19 `mobile-*.js` for `overflow-y:auto` containers; 13 had one (`.mbk-scroll`, `.mcl-agenda`, `.mc-thread`, `.mck-scroll`, `.mfd-scroll`, `.mft-screen`, `.mfo-menu`, `.ls-notes`, `.mls-body`, `.mnt-scroll`, `.pf-screen`, `.msc-scroll`, `.mst-scroll`) and got the same `scrollbar-width:none`/`::-webkit-scrollbar{display:none}` treatment via Python/UTF-8. The two horizontal `overflow-x:auto` rows (`.mfd-stories`, `.mfo-cats`) already hid their scrollbars from the original build. The other 6 mobile screens have no internal scroll container and needed no change. Scrolling remains fully functional everywhere — only the rendered scrollbar is suppressed.
- **Dev-tab snippet order interleaved** ([snippets.js](src/components/UiSnippetsTool/snippets.js)): the "🛠 Dev" category (all `noindex` snippets, `catOk_fn = sn.noindex === true` in [index.js](src/components/UiSnippetsTool/index.js)) renders in raw array order, and Batch 9 (20 GSAP/scroll snippets) sat immediately before the 14-item mobile-screens batch — two long same-topic runs back to back. Manually interleaved the two blocks' array entries (each batch's own relative order preserved, just alternated) so the Dev tab mixes topics instead of showing 20-then-14 in a row. Import statement order untouched — only affects list order, which is driven purely by the `SNIPPETS` array. Verified: 684 total entries, no duplicates, 19 mobile-* ids (5 pre-existing + 14 new) all present.

- **`scroll` category OG image**: `public/images/ui-snippets/scroll.png` existed but was 1731×909/1.4MB — wrong aspect ratio and far oversized vs. the site convention (other category cards are 1200×630, ~200–260KB). Resized with `sharp` to 1200×630/275KB and registered `'scroll'` in `categoryOG()`'s allowlist in [[slug]/page.js](src/app/ui-snippets/%5Bslug%5D/page.js) (previously fell back to the generic OG card).
- **Meta/content audit for `scroll` category**: compared `CATEGORY_SEO.scroll` title/description length (77/203 chars) and `CATEGORY_CONTENT.scroll` depth (~1276 words, 6 use cases, 5 FAQs) against all 13 other categories — both fully in range (title 67–83, desc 145–207, words ~1160–1345). No thin-content or outlier meta tags; no changes needed there.
- **Embed page Copy button fixed** ([EmbedShell.js](src/app/ui-snippets/%5Bslug%5D/embed/EmbedShell.js)): `navigator.clipboard.writeText` silently rejects when this `/embed` route is loaded inside a third-party `<iframe>` without a `clipboard-write` Permissions-Policy grant — the button did nothing and never showed "Copied!". `copyCode` now tries the Clipboard API first, then falls back to a hidden-textarea `document.execCommand('copy')` (still honored in sandboxed iframes off a real click), and as a last resort selects the visible code block so the user can hit Ctrl/Cmd+C manually (button reads "Press Ctrl+C" in that case).
- **"Edit in Editor" button made compact on mobile** ([styles.module.css](src/app/ui-snippets/%5Bslug%5D/embed/styles.module.css)): the button's text label is now wrapped in a `<span className={styles.editLabel}>` (with `aria-label`/`title` added to the link for a11y) and a `@media (max-width: 420px)` block hides the embed title, collapses the edit label to icon-only, and tightens tab/copy-button padding — the top bar no longer wraps or overlaps the code pane on narrow embed widths.

---

## 2026-07-15 — New "Scroll Effects" UI-snippet category

Split scroll-driven snippets out of `Animations`/`Layouts` into their own **Scroll Effects** category (`id: 'scroll'`), slotted right after Animations. Reason: 49 `scroll-*` snippets plus 9 scroll-driven others were diluting Animations and hiding in Layouts — now the largest coherent theme gets its own filter pill (bigger than Pricing/Tables/Loaders/Buttons).

- **58 snippets retagged** `category: 'scroll'` (via Python per the UTF-8 rule): all 49 `scroll-*` plus `reveal-on-scroll`, `text-reveal-scroll`, `parallax-hero`, `hero-parallax-grid`, `container-scroll`, `stacking-scroll-cards`, `observer-fullpage`, `box-reveal`, `canvas-reveal-card`. **Deliberately excluded:** `infinite-scroll`/`virtual-scroll`/`infinite-scroll-table` (data loading), all `sticky-*` (positioning), `marquee`/`logo-marquee`/`3d-marquee`/`ken-burns` (autonomous, not scroll-linked), `parallax-tilt-card` (mouse-driven).
- **Two category arrays updated** (they're maintained separately): `CATEGORIES` in [snippets.js](src/components/UiSnippetsTool/snippets.js) and `UI_SNIPPET_CATEGORIES` in [Sidebar/index.js](src/components/Sidebar/index.js) — the latter also got a `scroll` line-icon (mouse + down-chevron) in `UI_CAT_ICONS`, and its `.length` count badge now reads 14.
- **Gallery SEO prose synced** ([ui-snippets/page.js](src/app/ui-snippets/page.js)): pill lists + "12 categories" → "14 categories" with a Scroll Effects clause added to the features bullet and the "how many snippets" FAQ. Verified both arrays match (14 content categories, scroll in the same slot) and the module loads clean with no unknown-category snippets.
- **Category landing page added (fixes 404):** each category *is* routed at `/ui-snippets/{id}/` — the sidebar links there and [[slug]/page.js](src/app/ui-snippets/%5Bslug%5D/page.js) renders a per-category SeoSection below the gallery grid (grid itself comes from `layout.js` → `CategoryGalleryPage`, which already derives IDs from `CATEGORIES`). `/ui-snippets/scroll/` was 404ing because `CATEGORY_SEO`/`CATEGORY_CONTENT` had no `scroll` key, so the page fell through to the snippet branch and hit `notFound()`. Added full `CATEGORY_SEO.scroll` (title/description) and `CATEGORY_CONTENT.scroll` (title, subtitle, ~600-word about, 10 features, 6 useCases, 5 FAQs covering IntersectionObserver vs scroll listeners, GSAP vs pure-CSS, Core Web Vitals, reduced-motion, framework export). OG image falls back to the generic card (no `scroll.png` in `categoryOG`'s allowlist — add one later if desired).

---

## 2026-07-14 — 14 new mobile app-screen UI snippets (batch 7, dev/noindex)

Seventh batch: **14 full-device mobile app screens**, all `category: 'layouts'`, added **`noindex: true` (dev mode)** — full SEO written (1200+ words, technical deep-dive + Accessibility/performance paragraph + framework FAQ, all passing `scripts/audit-dev-snippets.mjs`), held out of production listings until promoted. Chosen because the gallery had only ~7 mobile screens despite strong search demand for framed app-screen UI; all built inside the shared 288×600 CSS phone frame with distinct class prefixes and no dependencies. New ids: `mobile-chat-screen` (two-sided bubbles, typing indicator, composer w/ simulated reply), `mobile-settings-screen` (grouped iOS list, real toggles, group-aware search filter, dark mode), `mobile-feed-screen` (story rings, double-tap-to-like heart burst, live counts, bottom tabs), `mobile-checkout-screen` (qty steppers, promo code SAVE10, live order total, sticky pay bar), `mobile-banking-screen` (gradient balance card, hide-balance blur toggle, transactions), `mobile-music-player-screen` (play-linked vinyl spin, setInterval clock, pointer-drag seek bar), `mobile-food-order-screen` (keyed cart object, derived total, rising cart bar), `mobile-map-ride-screen` (tile-free CSS map + SVG route, tier→price, WAAPI car drive), `mobile-calendar-screen` (week strip, event dots, per-day agenda filter, empty state), `mobile-fitness-screen` (3 nested SVG dash-offset rings, fill-on-load), `mobile-camera-screen` (CSS viewfinder + focus reticle, flash restart trick, cycling thumbnails), `mobile-stories-viewer` (CSS-timed segmented bars, animationend advance, hold-to-pause, tap zones), `mobile-notifications-screen` (grouped inbox, delegated tap-to-read, mark-all, swipe dismiss, self-healing groups), `mobile-search-screen` (recent/trending default vs live results, escaped-regex highlight, sliding cancel). Registered in `snippets.js` (imports + array). **Note:** dev warning shows `SNIPPET_COUNT` 442 vs 443 indexed — a *pre-existing* drift (all 14 additions are noindex, so they don't affect the indexed count); flagged for a separate fix.

---

## 2026-07-14 — CodePen-style embed page + Vue ScrollTrigger export fix + scroll-typewriter live

- **Embed page redesigned as a CodePen-style shell** ([src/app/ui-snippets/[slug]/embed/](src/app/ui-snippets/%5Bslug%5D/embed/)): new client component `EmbedShell.js` renders a dark top bar with HTML / CSS / JS / Result tabs (Result open by default; JS tab hidden when the snippet has no JS), a per-tab Copy button on code panes, and an "Edit in Editor" link to the canonical snippet page (replaces the old floating "View / Edit Code" badge). The Result iframe stays mounted (visibility-hidden) while code tabs are shown so animations/interactive state survive tab switches.
- **Vue export bug fixed** ([src/lib/snippet-exporters.js](src/lib/snippet-exporters.js)): `analyzeVanillaJs` hoisted `gsap.timeline({ scrollTrigger: { trigger: '#…' } })` into `setup()` because the DOM-dependency heuristic only tracked JS variables, not CSS-selector strings — so ScrollTrigger ran before mount and pinning silently failed in every exported Vue SFC (~40 scroll-driven GSAP snippets affected). Any initializer mentioning `ScrollTrigger`/`scrollTrigger:` now defers to `onMounted()`.
- **scroll-typewriter promoted to live**: removed `noindex: true`; indexes + enters sitemap on next build. SEO audit clean.

---

## 2026-07-10 — Blog post: Charts UI snippets roundup

Wrote `blog/blog-posts/blog9.txt` — "Ditch the Charting Library: 8 Live CSS/SVG Charts You Can Copy Today" (WordPress block markdown, matching blog1–8 format). Covers `bar-chart`, `donut-chart`, `gauge-chart`, `sparkline-chart`, `candlestick-chart`, `radar-chart`, `funnel-chart`, `activity-heatmap`. Picked **charts** (41 snippets) since it was the largest still-uncovered category after [[Navigation]]. Remaining uncovered: dashboards, tables, heroes, pricing, layouts.

---

## 2026-07-09 — Blog post: Navigation UI snippets roundup

Wrote `blog/blog-posts/blog8.txt` — "8 Copy-Paste Navigation Snippets That Make Menus Feel Instant" (WordPress block markdown, matching the format of blog1–7). Covers `hamburger-nav`, `mega-menu`, `sidebar-nav`, `sticky-header`, `dropdown-menu`, `breadcrumb`, `bottom-nav`, `animated-tabs`. Picked the **navigation** category because it was the largest snippet category (57 snippets) with no dedicated blog post yet — prior posts covered buttons, cards, text effects, loaders, forms, and modals/popovers/toasts, but not navigation, charts, dashboards, tables, heroes, pricing, or general layouts.

---

## 2026-07-01 — 20 new in-demand UI snippets (batch 6, dev/noindex)

Sixth batch of **20 mixed, high-demand UI snippets**, added **`noindex: true` (dev mode)** — full SEO written and promotion-ready, but held out of production listings/sitemaps until promoted. New ids across categories: `pull-quote` (layouts), `flip-pricing-card` (pricing — CSS preserve-3d flip), `thumbnail-gallery` (cards — main+thumb cross-fade), `testimonial-carousel` (cards — autoplay w/ pause-on-hover), `faq-two-column` (layouts — grid-template-rows accordion), `passkey-login` (forms — WebAuthn UI), `multi-step-checkout` (forms — stepper + per-step validation), `floating-share-dock` (navigation — sticky vertical share, intent links), `hero-email-capture` (heroes — waitlist hero), `feature-spotlight-tabs` (layouts — vertical tabs + cross-fade visual), `sticky-product-bar` (navigation — IntersectionObserver PDP bar), `video-testimonial-card` (cards — load-on-play), `dual-range-price-filter` (forms — two-thumb range + histogram), `account-switcher` (navigation — workspace dropdown), `wishlist-heart-button` (buttons — pop + particle burst), `code-snippet-tabs` (layouts — npm/pnpm/yarn/bun w/ sliding ink + copy), `segmented-toggle` (buttons — sliding resizing glider), `cookie-toggle-panel` (modals — GDPR per-category consent), `animated-stat-row` (dashboards — rAF count-up on scroll), `mega-menu-panel` (navigation — full-width mega menu w/ hover intent).

Each carries a full `seo` block: title ≤60, description 140–165 with framework-export hook, `about` 549–668 words (technical deep dive), 6 how-to steps, 8 `{title,text}` features, 6 `{title,text}` useCases with 3–4 interlinks each, and 4–5 FAQs incl. a React/Vue/Angular porting answer. Validated all 20 via ESM import (parse + field checks); fixed two pre-registration flags (`floating-share-dock` desc 170→<165, `video-testimonial-card` interlinks 2→3). Registered imports + array in [snippets.js](src/components/UiSnippetsTool/snippets.js). All 20 carry `noindex: true`, so `SNIPPET_COUNT` stays **442** in [snippet-count.js](src/lib/snippet-count.js). Registry check: 620 total, 442 indexed (= SNIPPET_COUNT), 178 noindex, no duplicate ids. `node scripts/audit-snippet-seo.mjs` — none of the 20 appear in any violation list (0 new violations). To promote later: remove the `noindex: true` line from each file and bump `SNIPPET_COUNT` to 462.

Also added **numbered pagination to the UI-snippets gallery** ([UiSnippetsGallery](src/components/UiSnippetsGallery/index.js)): replaced Load previous/Load more with a Prev · windowed page numbers (ellipsis) · Next pager, reflected in the URL as `?page=N` (omitted on page 1) via `useSearchParams`/`router.replace`, with range-clamp on filter change. Covers both `/ui-snippets/` and the category pages, which share the component.

---

## 2026-06-30 — Added 20 scroll-driven GSAP snippets (batch 5)

Fifth batch of **20 dev/noindex UI snippets**, all **scroll-based and powered by GSAP + ScrollTrigger** loaded via the snippet `cdnUrls` field (gsap@3 + ScrollTrigger.min.js), so the editor's CDN panel lists them. New ids: `scroll-horizontal-pin`, `scroll-zoom-hero`, `scroll-text-clip-reveal`, `scroll-parallax-layers`, `scroll-svg-path-draw`, `scroll-color-sections`, `scroll-reveal-grid`, `scroll-skew-velocity`, `scroll-pin-steps`, `scroll-split-panels`, `scroll-3d-cards`, `scroll-image-mask`, `scroll-sticky-stack`, `scroll-perspective-cards`, `scroll-gallery-pin`, `scroll-timeline-dots`, `scroll-blur-focus`, `scroll-rotate-gallery`, `scroll-fade-stack`, `scroll-curtain-reveal`. Each declares the GSAP CDNs in `cdnUrls`, uses `pin`/`scrub`/`onUpdate` patterns, ships tall demo sections so scroll is meaningful, and carries a full `seo` block (1200+ words, technical `about`, interlinks, framework FAQ covering ScrollTrigger cleanup in React/Vue/Angular). Verified slug freedom up front; `new Function` parse-check clean on all 20; registered imports + array in [snippets.js](src/components/UiSnippetsTool/snippets.js). Ran `node scripts/audit-snippet-seo.mjs` and trimmed over-length titles/descriptions so no new id appears in any violation list. `SNIPPET_COUNT` unchanged (noindex). Total library now 600.

---

## 2026-06-30 — Added 20 more UI snippets (batch 4: interactive cards, forms, nav)

Fourth batch of **20 dev/noindex UI snippets**, reusable UI only (no calculators/generators/converters), vanilla HTML/CSS/JS, each with a full `seo` block (1200+ words, deep technical `about`, interlinks, framework FAQ). New ids spread across categories: `tilt-glow-card`, `gradient-stat-ring`, `floating-label-select`, `animated-toggle-group`, `spotlight-product-card`, `hover-expand-gallery`, `pricing-feature-table`, `sticky-cta-footer`, `avatar-status-list`, `skeleton-profile`, `breadcrumb-dropdown`, `chip-multiselect`, `rating-stars-input`, `progress-circle-steps`, `image-zoom-card`, `flip-countdown`, `sidebar-mini`, `feature-checklist`, `glass-stat-card`, `mega-cta-banner`. Verified no slug collisions up front (all 20 free); `new Function` parse-check clean on all 20; registered imports + array in [snippets.js](src/components/UiSnippetsTool/snippets.js). Ran `node scripts/audit-snippet-seo.mjs` and trimmed 6 over-long descriptions + 1 title so none of the new ids appear in any violation list (remaining flags are all pre-existing snippets). `SNIPPET_COUNT` unchanged (noindex). Total library now 580.

---

## 2026-06-30 — Compacted home hero profile card (right column)

Tightened the freelance pitch card in the home hero ([page.js](src/app/page.js) / [page.module.css](src/app/page.module.css)) to remove the dead vertical space below the figure. Reduced `.profileText` padding (44/18→26/26 top/bottom, 40→30 left), trimmed inter-element margins (role 16→12, desc 20→16, dropped the trailing `.profileActions` margin), shrank `.profileDesc` (13→12.5px, line-height 1.65→1.55, max-width 400→330) so the copy wraps tighter, and softened the card radius 24→20px. Net: shorter card, less empty area, same content.

Follow-ups: removed the `.profileDesc` bio line entirely from [page.js](src/app/page.js) (greeting → role → buttons). Then fixed the card at common laptop widths — 1366/1530 were falling into the `max-width:1600px` block which still carried the old tall padding (40/32), so the compact change never reached them. Updated the ≤1600 block to compact padding (24/24) + tighter card margin, and added a `max-width:1540px` block so 1366 and 1530 stay short and proportional. 1920 keeps the base 26/26 compact layout.

Final pass (from screenshots): at 1366/1530 the card looked empty with a small floating photo. Root cause — `.heroInner` is `align-items:stretch`, so the card stretches to match the tall left column (headline+paragraph+wrapped buttons ≈ 515px), but its text only fills ~300px and the `max-width:250px` photo couldn't grow to fill the rest. Reworked the ≤1540 block: `.heroRight { align-self:center; min-height:330px }` so the card sizes to its own content instead of the left column, and switched `.profilePhoto` to height-driven (`height:100%; width:auto; max-width:300px`) so it fills the card top-to-bottom like 1920. 1920 unchanged (still looks correct).

---

## 2026-06-29 — Added 20 more modern UI snippets (batch 3: magicui-style effects + odometer/loaders)

Third batch of **20 dev/noindex UI snippets**. Same standard: reusable UI only, vanilla HTML/CSS/JS, full `seo` block (1200+ words, deep technical `about`, interlinks, framework FAQ). Verified no slug collisions (grepped all 20 up front — all 0); `node --check` clean on all 20 + registry; unique ids confirmed; audit flags none of the new ids (trimmed particle-network, aurora-text, dot-pattern under 165). Registered (imports + array) in [snippets.js](src/components/UiSnippetsTool/snippets.js); `SNIPPET_COUNT` unchanged (noindex). Total library now 560.

- **Backgrounds / heroes (6):** retro-grid (synthwave CSS-perspective floor racing to horizon + masked sun), dot-pattern (tiled radial-gradient dots + cursor-spotlight via mask + --x/--y), particle-network (canvas constellation, distance-faded links + cursor reach, width-scaled density), flickering-grid (Float32Array canvas squares flickering to random opacity), ripple-background (negative-delay concentric radar rings + click-to-ripple burst), background-effect set rounds out the prior batches.
- **Text effects (4):** shiny-text (clipped-gradient sheen sweep, reduced-motion safe), aurora-text (flowing background-clip gradient in glyphs), text-reveal-scroll (sticky paragraph, words brighten by scroll progress, reversible), box-reveal (origin-flip panel wipe with per-line --d stagger, IO-triggered + replay).
- **Buttons (4):** pulse-button (staggered sonar rings + live/stop toggle, IO-paused), interactive-hover-button (accent dot scale(40) floods fill + sliding label swap), like-burst-button (heart pop + radial WAAPI particle burst, optimistic count, aria-pressed), number-ticker (easeOutExpo odometer count-up, thousands separators/decimals/affixes, tabular-nums, IO-triggered).
- **Components (6):** orbiting-icons (chained-transform arc placement, counter-rotating dashed rings, pause-on-hover), border-beam (CSS offset-path Motion Path bead with comet tail + JS fallback), ai-thinking-loader (spinning conic orb + shimmer status + cycling phrases + skeleton wave), typing-code (auto-typing editor with live regex highlighter, human cadence, blinking steps caret), radial-menu (trig polar fan-out with spring + stagger, ARIA), action-sheet (iOS slide-up, velocity-aware swipe-to-dismiss, safe-area, modal focus), announcement-bar (sticky rotating banner, pause-on-hover, looping prev/next, collapsing dismiss).

Process note: avoided the single-quoted-FAQ apostrophe trap this batch by pre-emptively phrasing around it ("do not"/"does not"); `node --check` clean first pass on all 20. Files authored with the Write tool (UTF-8).

---

## 2026-06-29 — Added 20 more modern UI snippets (batch 2: interaction-heavy effects)

Added **20 more dev/noindex UI snippets**, continuing the modern-effects push. Same standard: reusable UI only (no calculators/generators/converters), vanilla HTML/CSS/JS, full `seo` block (1200+ words, deep technical `about`, interlinks, framework-port FAQ). Verified no slug collisions with the existing ~520; `node --check` clean on all 20 + registry; unique ids confirmed; audit flags none of the new ids (trimmed direction-aware-hover, expandable-card, nested-dropdown, parallax-tilt-card descriptions under 165). Registered (imports + array) in [snippets.js](src/components/UiSnippetsTool/snippets.js); `SNIPPET_COUNT` unchanged (noindex). Total library now 540.

- **Cards (8):** glare-card (holographic conic foil + glare via color-dodge/soft-light blend, pointer tilt), wobble-card (opposing-layer jelly squish on spring easing), direction-aware-hover (overlay enters from the edge the cursor crosses, exits toward exit edge), evervault-card (cursor-masked churning ciphertext reveal), canvas-reveal-card (staggered per-dot canvas matrix on hover, on-demand rAF), glowing-stars-card (paused-twinkle constellation that drifts), expandable-card (FLIP shared-layout list→modal with <template> content), parallax-tilt-card (data-depth per-layer parallax shift).
- **Animations (6):** background-boxes (skewed grid lit by cursor via event delegation, fading trail), liquid-button (SVG goo-filter metaball fill, WAAPI blobs), 3d-marquee (perspective-tilted grid, alternating columns, cloneNode seamless loop), container-scroll (sticky scroll-progress rotateX flatten + scale reveal), hero-parallax-grid (scroll→horizontal, opposite-direction rows), magnetic-grid (dot field pulled to cursor with distance falloff, single rAF), gooey-text (two words melting via SVG goo + cross-fade), scroll-timeline-beam (read-line-anchored beam fill lighting milestones).
- **Navigation / Buttons (the rest):** flip-link (per-letter vertical flip nav via ::after + staggered transition-delay), drag-scroll-row (Pointer Events drag + momentum glide + edge clamp + arrow keys), nested-dropdown (recursive data-tree multi-level flyout, sibling auto-close, ARIA), hover-reveal-list (single shared thumbnail lerp-trailing the cursor).

Process note: recurring single-quoted-FAQ apostrophe bug bit twice again ("don't" / "doesn't") — caught by per-batch `node --check`, rephrased to avoid the apostrophe. Also fixed one stray malformed template-literal in drag-scroll-row features. All files authored with the Write tool (UTF-8).

---

## 2026-06-29 — Added 21 modern UI snippets (aceternity/magic-ui-style effects + Instagram gallery)

Added **21 new dev/noindex UI snippets** to the gallery — all reusable UI building blocks (no calculators/generators/converters, per [feedback_snippets_not_tools.md](.claude/memory/feedback_snippets_not_tools.md)), vanilla HTML/CSS/JS, each with a full `seo` block (1200+ words, deep technical `about`, interlinks, framework-port FAQ). Verified none of the slugs pre-existed; `node --check` clean on all 21 + the registry; unique ids confirmed; `node scripts/audit-snippet-seo.mjs` flags none of the new ids (trimmed text-generate/sparkles-text descriptions under 165). Registered (imports + array) in [snippets.js](src/components/UiSnippetsTool/snippets.js). `SNIPPET_COUNT` unchanged (noindex don't count toward indexed total).

- **Cards (6):** neo-brutalist-card (zero-blur hard shadow + tactile press), pin-card (perspective tilt with rising 3D anchor pin + cursor lean), meteor-card (randomized shooting-star shower, IO-paused off-screen), focus-cards (hover one → blur/dim the rest via CSS specificity, keyboard + touch), testimonial-wall (rAF infinite multi-column scroll, per-column speed, pause-on-hover), neo + glassy mixes.
- **Animations (7):** scroll-velocity-marquee (speed + skewX driven by scroll-velocity delta, exp decay), logo-marquee (seamless -50% loop, grayscale→color, count-based pacing), hover-image-trail (distance-spaced cursor image trail, recycled pool), text-generate (word-by-word blur-in, IntersectionObserver, gradient accents), animated-grid-background (panning CSS grid + lerp cursor spotlight w/ idle Lissajous drift), wavy-background (layered summed-sine canvas waves, HiDPI, additive glow), animated-beam (auto-routed SVG bezier wires with stroke-dashoffset light beams into a hub), sparkles-text (self-cleaning twinkles, reduced-motion safe).
- **Heroes (2):** animated-gradient-cta (spinning conic glow + grain overlay + inline email capture, battery-aware), lamp-header (converging conic light cones + widening reveal line, one-accent theming).
- **Buttons / Forms / Nav / Layouts / Modals (6):** shimmer-button (conic spark border + sheen sweep + WAAPI ripple), glow-input (cursor-tracking radial border glow via mask-composite + --x/--y), floating-pill-nav (frosted pill that shrinks on scroll + sliding indicator), feature-tabs-showcase (sliding gradient ink + animated panel swaps + arrow-key ARIA tabs), stacking-scroll-cards (sticky pin-and-stack with scale/dim depth cues), **instagram-gallery** (square hover-stats grid + full lightbox: prev/next, arrow keys, swipe, backdrop/Escape dismiss, modal focus management) — added on user suggestion.

Process note: one over-escaped/literal apostrophe ("don't") inside a single-quoted FAQ string broke `node --check`; caught and rephrased. Authored each file with the Write tool (UTF-8), per [feedback_file_editing_encoding.md](.claude/memory/feedback_file_editing_encoding.md).

---

## 2026-06-29 — Snippets are UI, not tools: removed 9 utilities, added 20 device/screen UI snippets

New standing rule ([feedback_snippets_not_tools.md](.claude/memory/feedback_snippets_not_tools.md)): the snippet gallery is for **reusable UI components**, not generators/calculators/converters (those belong in the dedicated tools section). Litmus test: a name ending in `-calculator`, `-generator`, or `-converter` is a tool, not a snippet. Form inputs/pickers stay (they capture a value, not compute an answer).

**Deleted 9 tool-style files** (unregistered the registered one): read-time-badge, slug-input, percentage-calculator, age-calculator, border-radius-generator, uuid-generator, lorem-ipsum-generator, temperature-converter, case-converter.

**Added 20 genuine UI snippets**, all dev/noindex (vanilla HTML/CSS/JS, full `seo` block, 1200+ words, framework FAQ). `SNIPPET_COUNT` stays 442; array now 499. Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); `node --check` clean on all + registry; `node scripts/audit-snippet-seo.mjs` flags none of the new ids.

- **Device/browser mockups (5):** phone-mockup (nested-radius bezel, dynamic island, live status clock, dark toggle), tablet-mockup (animated portrait↔landscape rotate), browser-window (traffic lights, editable URL, reload spin), laptop-mockup (16:10 frame + pointer parallax), smartwatch-mockup (stroke-dasharray activity rings), tv-mockup (D-pad arrow-key focus nav).
- **Mobile screens (7):** mobile-lock-screen (live clock, glass notifications, swipe-up unlock), mobile-login-screen (inline validation, password reveal, loading submit), mobile-onboarding (swipe carousel, worm dots, morphing blobs), mobile-status-bar (CSS/SVG icons, real Battery API, notch toggle), mobile-profile-screen (CSS toggle switches, working dark mode), splash-screen (self-drawing logo, staged progress, fade-out), paywall-screen (plan-driven CTA/fine-print).
- **Controls & cards (8 incl. kept):** hold-to-confirm-button (rAF hold gesture + pointer capture), bookmark-toggle (optimistic count, spring pop), time-duration-input (total-seconds model, rollover steppers), app-store-card (install-progress GET button, masked star strip), wallet-card (preserve-3d flip + tilt), camera-ui (tap-to-focus, shutter flash, mode strip), dialer-keypad (live phone-number formatting, caller-ID lookup).

Process notes: recurring authoring bug — over-escaped apostrophes (`\\'` → `\'`) in single-quoted FAQ strings broke `node --check`; also a couple of stray "fl" artifacts and an unescaped backtick inside a template-literal `about`. Caught all via per-batch `node --check` + a Grep for `\\'`. Trimmed several descriptions back under 165 chars.

## 2026-06-29 — 10 new UI snippets (dev / noindex)

Added **10 UI snippets**, all **dev/noindex** for review (localhost-only; `SNIPPET_COUNT` stays 442 — array now 480, 38 noindex). Vanilla HTML/CSS/JS, no libraries; each with a full `seo` block (title ≤60, description ≤165 with framework-export hook, framework FAQ, 1200+ words). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); `node --check` clean on all 10 + registry; `node scripts/audit-snippet-seo.mjs` flags none of the new ids.

- **Buttons:** voting-buttons (Reddit-style upvote/downvote, three-state click-to-undo, immutable base + derived score, bump animation, aria-pressed).
- **Forms:** volume-control (hand-built Pointer Events slider, mute-with-memory, dynamic speaker icon, role=slider keyboard), brightness-slider (live CSS `brightness()` filter on a preview, gradient track, reactive sun icon).
- **Animations:** battery-indicator (CSS battery shape, green/amber/red thresholds, charging bolt + creep-up interval), scroll-progress-circle (SVG `stroke-dasharray` ring scoped to a scroll panel, rAF-throttled, completion → back-to-top).
- **Loaders:** signal-bars (staircase `:nth-child` bars, level→color+label via `--sig`, staggered scanning sweep + lock-on).
- **Charts:** dumbbell-chart (two-dot before/after with min→max connector, double-rAF draw-on, z-index overlap handling).
- **Cards:** read-time-badge (live word/sentence count + read/speak time at adjustable WPM, whitespace-robust counting), status-pill (presence dropdown Online/Away/DND/Offline, CSS pulse ring, accessible listbox, click-away/Escape).
- **Tables:** density-toggle (compact/cozy/comfortable via single class swap, geometry-measured sliding segment highlight, rAF first-paint).

Fixes during the pass: a `…` left in read-time-badge's HTML `placeholder` (HTML doesn't interpret JS unicode escapes → switched to `&hellip;`); an over-escaped apostrophe (`\\'` → `\'`) in a density-toggle FAQ that broke `node --check`; trimmed brightness-slider (171) and scroll-progress-circle (167) descriptions back under 165.

## 2026-06-28 — Value-first titles (drop "Free" from first position)

Rewrote **212 `title:` strings** across tools, categories, and UI-snippet collections so none lead with "Free" — value/tool name now comes first, with "Free" moved after the em-dash (e.g. `Color Picker & Converter — Free HEX, RGB, HSL…`). Applied across all title layers per tool: `metadata.title`, `openGraph.title`, `twitter.title`, and the in-page SEO H1/about title. The keyword "free" is retained (just not in first position) to preserve search intent.

- **Generic rule:** `Free X — Y` → `X — Free Y`, switching to `X — Free, Y` when the remainder leads with "No…", a digit, or a verb (Combine/Reduce/Extract/etc.) so it reads naturally.
- **Playgrounds (24):** new standard `<Lang> Playground — Learn <Lang> Visually, <N> Lessons Free` (lesson counts kept where present; `Learn <Lang> Visually, Free Online, No Install` where no count). Covers angular→vue.
- **Categories (8):** `Online PDF Tools — Free Merge, Split…` etc. in [categories.js](src/lib/categories.js) + each `*-tools/page.js` og/twitter.
- **UI-snippet collections (13):** `Button Snippets — Free, Every Variant…` etc. in [ui-snippets/[slug]/page.js](src/app/ui-snippets/[slug]/page.js).
- **Bug fix:** stripped a stray `Free ` prefix that a past bulk-replace had prepended onto 5 how-to **step** titles (breathing-animation, custom-cursor, glitch-text, liquid-blob, svg-progress-ring).
- **Intentionally left alone:** `Free Shipping Progress Bar` component + "free shipping"/"free price" body text (legit names, not price claims).

Applied via a Python script (UTF-8) so em-dashes survived intact.

## 2026-06-28 — 20 new UI snippets (dev / noindex)

Added **20 UI snippets**, all **dev/noindex** for review (localhost-only; `SNIPPET_COUNT` stays 442 — array now 470, indexed 442, 28 noindex). Vanilla HTML/CSS/JS, no libraries; each with a full `seo` block (title ≤60, description ≤165 with framework-export hook, framework FAQ). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); `node --check` clean on all 20 + registry; audit clean (none flagged).

- **Forms (6):** inline-validation-form (validate-on-blur-then-live, per-field rules), circular-char-counter (Twitter-style ring counter, soft limit), slider-captcha (drag-to-fit puzzle, randomised target), gradient-picker (draggable stops + angle → CSS), shadow-generator (offset/blur/spread/inset → box-shadow), avatar-generator (initials + deterministic hashed color).
- **Charts (9):** sunburst-chart (annular-sector hierarchy), stacked-area-chart (cumulative bands + hover guide), donut-progress (animated ring + counting label), grouped-bar-chart (clustered CSS bars), pyramid-chart (back-to-back population pyramid), bump-chart (rank-over-time lines), lollipop-chart (stem-and-dot, sortable), timeline-chart (Gantt-style task bars + today marker), range-area-chart (min/max band + average line).
- **Cards/Layouts/Nav/Loaders (5):** hover-card (intent-delayed profile popover, edge-aware), wave-divider (3 SVG section-divider styles), email-inbox (read/star/select-all/search list), page-minimap (proportional overview + draggable viewport), orbit-loader (CSS orbiting spinner, --spd variable).

Process note: re-confirmed all 20 ids against the **full** id list (the earlier 2-space-indent grep missed 4-space-indent files), avoiding duplicates of existing concepts (count-up, star-rating, breadcrumb, 3d-flip-card, etc.). Per request, regex-tester / typing-test / image-color-picker remain excluded from the library.

## 2026-06-28 — 7 new UI snippets (dev / noindex)

Added **7 UI snippets**, all **dev/noindex** for review (localhost-only; `SNIPPET_COUNT` stays 442 — array now 449, indexed 442, 7 noindex). Vanilla HTML/CSS/JS, no libraries; each with a full `seo` block (title ≤60, description ≤165 with framework-export hook, framework FAQ). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); `node --check` clean on all files + registry; audit clean (none of the 7 flagged).

- **transfer-list** (forms) — dual list box: multi-select, per-list filter, move-all, double-click-to-move, single-source-of-truth state.
- **mood-picker** (forms) — SVG smiley-face satisfaction rating (mouth path encodes mood), hover-preview/commit, radiogroup + arrow keys.
- **color-contrast-checker** (forms) — real WCAG relative-luminance ratio, AA/AAA pass-fail for normal/large, swatch+hex sync, live preview.
- **shortcut-recorder** (forms) — capture a keyboard chord into a field (ignores lone modifiers), platform-aware labels, kbd chips, duplicate detection.
- **json-tree** (tables) — recursive collapsible JSON viewer with type-colored leaves, per-node toggles, expand/collapse-all, copy.
- **bezier-curve-editor** (animations) — draggable SVG cubic-bezier handles (overshoot allowed), live ball preview via double-rAF transition restart, presets, copyable output, keyboard-adjustable.
- **checkbox-tree** (forms) — tri-state indeterminate parents with two-way cascade, height-animated expand/collapse, tree ARIA roles.

Process note: my first id scan used a 2-space-indent grep that missed all 4-space-indent snippet files, so an initial batch (animated-counter, star-rating-input, breadcrumb-nav, etc.) duplicated existing concepts (count-up, star-rating, breadcrumb) — deleted and re-picked against the full id list. Per request, regex-tester / typing-test / image-color-picker were left out (7 of the intended 10).

## 2026-06-28 — Home hero: 60/40 split + right profile as a bordered card

Reworked the home hero layout in [page.module.css](src/app/page.module.css): `.heroInner` grid went from `1fr 1fr` (50/50) to `3fr 2fr` (left 60% / right 40%). The right column (`.heroRight`, profile text + photo) was a full-height panel with only a `border-left` divider; it's now a self-contained inset card — full `border`, `border-radius: 24px`, `overflow: hidden` (clips the cutout photo to the rounded corners), soft shadow, and `margin` so it floats on the hero gradient. Updated the 1024px and 768px breakpoints to match (margins reduced; dropped the old `border-left:none/border-top` mobile divider since the card now has a full border).

Follow-ups: expanded the hero tagline to cover all four product pillars (snippets, playgrounds, freelancer tools, dev utilities) and updated the H1 to match (`Free UI snippets, coding playgrounds, freelancer & developer tools for modern web creators`); synced the SEO `title`/`description` + OG/Twitter to the same messaging and fixed the stale "10 coding playgrounds" claim. Resized the right card smaller: outer split `3fr 2fr` → `1.7fr 1fr` (~63/37), inner `.heroRight` to a proportional `1.35fr 1fr`, and — importantly — fixed the figure overflow. `.profilePhoto` had `height: 100%`, which tied its size to the (tall) card and made it balloon over the text at 1366/1530px; switched to `width: 100%; height: auto; max-width: 280px; max-height: 100%` so the image is sized by its column (never the card height) and can't overlap the text. Adjusted the 1600/1024 breakpoints to the new proportional tracks.

Profile-card refinement to match the reference screenshot: card background made solid (`var(--surface)`) so the hero gradient no longer tints it; the cutout figure (`.profilePhoto`) fills the card height and anchors **bottom-right** (`height: 100%`, `object-position: bottom right`) so it bleeds to both edges with the head near the top; the bordered, dot-grid inner panel (`.profilePanel` + its `::after`) was replaced with a faint neutral backdrop wash (no colour cast, no hard seam); and the "15+ yrs experience" tag moved to the top-right corner (`top: 24px`). Mobile overrides re-centered accordingly.

## 2026-06-28 — Fix: sticky-sidebar snippet never stuck

The `sticky-sidebar` UI snippet's sidebar scrolled away instead of pinning. Root cause: `position: sticky` was on the inner `.ss-stick` wrapper, whose containing block is `.ss-aside` — but the grid's `align-items: start` shrinks `.ss-aside` to its content height (= the wrapper's height), leaving the sticky element zero room to travel, so it never stuck. Moved sticky to `.ss-aside` itself (containing block becomes the tall `.ss-layout` row, giving it room), updated the responsive `position:static` override and the about-text/lastmod to match. This matches the snippet's own (correct) prose about why `align-items:start` is needed.

## 2026-06-28 — Lesson counts in every playground title (AST-verified)

Every playground `<title>` now states its lesson count (e.g. `CSS Playground — Learn CSS Visually, 53 Lessons Free`). Counts were derived by parsing each tool's `LESSONS`/`CHAPTERS` array with `@babel/parser` (AST element count = the `LESSONS.length` the UI actually renders), not by grepping — line/grep counts were unreliable because lesson `code` templates contain braces and nested backticks.

- **Added counts to 16 playgrounds** that previously said "Free Online, No Install": angular 45, bootstrap5 50, css 53, express 38, git 43, gsap 55, html 42, jquery 72, mongo 37, nodejs 26, php 60, redis 8, scss 45, sql 39, tailwind 48, vue 40.
- **Corrected 3 stale counts** (title + OG/Twitter/H1 + body prose) to match the rendered array: **Next.js 32→26**, **Python 30→29**, **GraphQL 26→28**. AST counts cross-validated against pre-existing secondary titles that were already correct (react 68, js 60, ts 41, firebase 23, angular 45, html 42, vue 40, etc.).
- **REST API Builder Playground** left without a count — it's a builder/sandbox with no `LESSONS` array.
- **Flag:** GraphQL's `LESSONS` array contains a **duplicate lesson id `aliases`** (appears at index 3 and 12) — rendered length is genuinely 28, but the dup id is likely a real bug worth fixing (React key collision).

## 2026-06-24 — 10 more UI snippets (dev/noindex)

Added **10 UI snippets**, all **dev/noindex** for review (localhost-only; `SNIPPET_COUNT` stays 392 — array now 442, indexed 392, 50 noindex). Vanilla HTML/CSS/(SVG/canvas)/JS, no libraries; each with a full `seo` block (title ≤60, description 120–165, framework FAQ). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); audit clean; all pages render 200.

- **Charts (4):** box-plot (quartiles/IQR/outliers from raw data), radial-bar-chart (concentric ring arcs), waffle-chart (100-square grid with largest-remainder rounding), slope-chart (before/after slopegraph with focus-dim).
- **Tables (1):** selectable-table (tri-state select-all, shift-click ranges, Set-as-truth, bulk bar).
- **Loaders (2):** wave-loader (sine-path liquid fill, clip-masked), indeterminate-bar (4 styles + pause).
- **Animations (1):** ken-burns (pan-zoom crossfade slideshow, re-triggered per slide).
- **Layouts (1):** full-page-scroll (CSS scroll-snap sections + IntersectionObserver dot nav).
- **Navigation (1):** tag-cloud (weight-to-size/colour, click-to-filter).

Process note: two new failure modes caught by `node --check` — an over-escaped apostrophe in a single-quoted field, and a literal backtick inside a `js:` template literal (in a comment) which closed the template early. Both rephrased.

## 2026-06-24 — 20 more UI snippets (the next 20, dev/noindex)

Another **20 UI snippets**, all **dev/noindex** for review (localhost-only; `SNIPPET_COUNT` stays 392 — array now 432, indexed 392, 40 noindex). All vanilla HTML/CSS/(SVG/canvas)/JS, no libraries; each with a full `seo` block (title ≤60, description 120–165, framework FAQ). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); audit clean; all pages render 200.

- **Charts (6):** histogram (self-binning, adjustable bins), treemap (recursive slice-and-dice), polar-area-chart (Nightingale rose), step-line-chart (staircase + line toggle), range-bar-chart (floating low–high bars + median), sankey-diagram (bezier flow ribbons, flow-conserved).
- **Tables (2):** pivot-table (cross-tab with sum/avg/count + totals), infinite-scroll-table (IntersectionObserver sentinel paging).
- **Loaders (2):** segmented-progress (per-step segments), skeleton-card-grid (layout-matched shimmer).
- **Dashboards (2):** leaderboard-podium (2-1-3 winners stand), weather-forecast (current + 5-day, code-to-icon).
- **Modals (2):** fullscreen-menu (clip-path circle reveal + staggered links), multi-step-modal (sliding wizard + dots).
- **Animations (3):** gooey-menu (SVG goo-filter FAB), page-flip (CSS 3D book), starfield (canvas warp-speed projection).
- **Pricing (2):** pricing-slider (tiered per-seat, filled track), roi-calculator (live value/net/ROI).
- **Navigation (1):** kbd-keys (3D keycaps that depress on the real shortcut).

Process notes: a few apostrophes in single-quoted SEO fields caused `node --check` failures (rephrased to avoid them); SEO descriptions are now written ≤165 from the start. After bulk-writing 14 files the dev server again hit a corrupted incremental-build state — cleared `.next` and restarted (not a code issue).

## 2026-06-23 — 20 new UI snippets (batch 1: 6 charts, dev/noindex)

Added the next **20 UI snippets**, all shipped as **dev/noindex** for review (localhost-only; excluded from production listings/sitemaps; `SNIPPET_COUNT` stays 392 until promoted — array grows to 412, indexed stays 392). All vanilla HTML/CSS/(SVG)/JS, no libraries, each with a full `seo` block (title ≤60, description 120–165, framework FAQ). Registered in [snippets.js](src/components/UiSnippetsTool/snippets.js); audit clean; all pages render 200.

- **Charts (6):** pie-chart (SVG arc slices, toggleable legend), horizontal-bar-chart (ranked bars, %-of-max scaling, sort), bubble-chart (3-var, sqrt area sizing), scatter-plot (least-squares trend line), multi-line-chart (multi-series shared scale + legend toggle), bullet-chart (KPI vs target, poor/OK/good bands, inverted-metric support).
- **Tables (3):** filterable-table (per-column AND filters + safe highlight), csv-export-table (RFC-4180 quoting + UTF-8 BOM + Blob download), grouped-rows-table (collapsible groups, subtotals, grand total).
- **Animations (3):** dice-roller (CSS 3D cube), coin-flip (backface-visibility 3D coin + tally), flip-clock (split-flap live time, only changed digits flip).
- **Layouts (3):** holy-grail-layout (CSS-grid app shell, responsive drawer), sticky-sidebar (position:sticky + IntersectionObserver scroll-spy), split-screen-layout (flex hover-expand + touch fallback).
- **Loaders (2):** circular-countdown (SVG ring, drift-free timestamp timing), typing-indicator (staggered dots + auto-hide-on-idle).
- **Modals (1):** fullscreen-search-overlay (⌘K, live filter, arrow-key nav).
- **Navigation (1):** dynamic-tabs (add/close/middle-click/drag-reorder, neighbour activation).
- **Dashboards (1):** unit-converter (base-factor engine across length/weight/temp/volume, formula-based temperature).

Note: after writing 14 files at once the running dev server hit a corrupted incremental-build state (global 500s); resolved by clearing `.next` and restarting — not a code issue (Node loaded the module cleanly throughout).

## 2026-06-23 — New "Charts" UI-snippet category + dynamic category counts + framework-export mentions

**New `charts` category (carved out of `dashboards`).** Charts/data-viz had no home — 14 snippets were buried under `dashboards`, diluting both. Added `{ id: 'charts', label: 'Charts' }` to `CATEGORIES` in [snippets.js](src/components/UiSnippetsTool/snippets.js) (after Tables) and reassigned 14 snippets from `dashboards` → `charts`: area-chart, bar-chart, candlestick-chart, donut-chart, funnel-chart, gauge-chart, line-chart-widget, radar-chart, realtime-line-chart, sparkline-chart, stacked-bar-chart, waterfall-chart, activity-heatmap, heatmap-matrix. Dashboards drops 41 → 27 (still healthy); charts = 14. The chip, category landing page (`/ui-snippets/charts/`), sitemap, and llms.txt all auto-derive from `CATEGORIES` — added the chart-specific `CATEGORY_SEO` entry + a full ~900-word `CATEGORY_CONTENT` block (about, features, useCases, faqs) in [page.js](src/app/ui-snippets/[slug]/page.js). `categoryOG('charts')` falls back to the generic OG image (no charts.png yet).

**Fixed stale hardcoded category counts.** Category page `<title>`s and subtitles had counts frozen at old values ("9 buttons", "13 forms", "11 cards") while reality was 24/86/55 — a credibility/CTR problem in SERPs. Replaced every hardcoded number with a `{n}` token, injected at render from `VISIBLE_SNIPPETS.filter(s => s.category === slug).length` in both `generateMetadata` (title) and the page component (subtitle). Counts can never drift again. Also removed 3 stale duplicate `subtitle:` keys (nav/animations/dashboards) that JS was silently overwriting.

**Category pages now advertise framework exports.** Per request, every category subtitle's trailing "· No framework" / "· No library" tag was swapped for "· Exports to React, Vue, Angular & Tailwind", and each `CATEGORY_SEO` description now ends with an "Export to React, Vue, Angular & Tailwind" clause — surfacing the export capability that was previously only discoverable inside the tool.

**Bug fix — `/ui-snippets/charts/` opened the snippet editor instead of the gallery.** [layout.js](src/app/ui-snippets/layout.js) gated category routing on a hardcoded `CATEGORY_IDS` set that didn't include the new `charts`, so the route fell through to the snippet-editor branch and loaded the first snippet (Hamburger Nav). Fixed by **deriving `CATEGORY_IDS` from `CATEGORIES`** (excluding `all`/`dev`) so new categories route correctly without a second manual edit — same drift class as the stale counts.

**SEO — `charts.png` OG/Twitter image + FAQPage schema for all category pages.** Added `charts` to the `categoryOG()` allow-list so the charts category + its chart snippets use `charts.png` as the social image. Added `FAQPage` JSON-LD generation to the category render path (built from the same `faqs` already shown on-page) — every category page now emits FAQ structured data, eligible for rich results (was 0 before). Tightened the charts meta description 193 → 155 chars so the React/Vue/Angular/Tailwind export hook survives SERP truncation.

**Bug fix — empty gap in Conditional Form Fields snippet.** The reveal animation used the `grid-template-rows: 0fr → 1fr` collapse trick, but `sales`/`support` groups each had two direct children — the second landed in an `auto` implicit grid row that never collapses, so a hidden multi-field group left one field of empty space. Wrapped each group's contents in a single `.cff-cond-inner` div (the canonical single-child pattern) so groups of any size collapse fully.

**Bug fix — form-submit snippets did nothing in preview/export panes (Waitlist Signup "Join").** The export-preview iframe ([ExportTester.js](src/components/UiSnippetsTool/ExportTester.js)), the embeddable preview ([embed/page.js](src/app/ui-snippets/[slug]/embed/page.js)), the gallery card thumbnail, and the embed modal all used `sandbox="allow-scripts"` **without `allow-forms`** — so the browser suppressed the `<form>` `submit` event and any snippet relying on it (Waitlist Signup, Contact Form, etc.) appeared dead. The main editor preview already had `allow-scripts allow-forms`; brought the other four iframes in line with that pattern.

**Bug fix — `closest()` event delegation broke in Tailwind exports (fly-to-cart and 46 others).** The Tailwind exporters preserved class names referenced via `querySelector`/`querySelectorAll` (so JS could still find them after conversion to utilities) but **not** classes referenced via `closest()`/`matches()`. So a delegated handler like `e.target.closest('.ftc-add')` returned `null` once `.ftc-add` was converted to utilities and stripped from the markup — the click did nothing and the fly-to-cart animation never ran. Extended the class-preservation regex in both `toTailwindComponent` and `toTailwindHtml` to also scan `closest()`/`matches()`. Fixes **47 snippets** that rely on `closest()` for event delegation. (Preserving a class only adds it back as a JS hook alongside the utilities — no styling regression.)

**Bug fix — Tailwind export animations not smooth (lossy `transition` conversion).** The `transition` mapper in [css-to-tailwind.js](src/lib/css-to-tailwind.js) returned on the FIRST matched property, so a multi-property shorthand like `transition:opacity .26s,transform .26s` collapsed to just `transition-opacity` — dropping the transform transition AND the custom .26s duration (Tailwind's named utility forces 150ms, opacity only). Result: in React/React+Tailwind/Tailwind exports the modal's opacity faded but its scale/translate **snapped** instead of gliding. Fixed by preserving any transition with a comma (multiple properties) or an explicit duration/easing (any digit) **verbatim** as an arbitrary value, e.g. `[transition:opacity_.26s,transform_.26s]`; pure-property transitions (`transition:color`) still map to the clean named utility. Repairs every snippet whose export used a multi-prop/custom-timing transition (share-modal, size-guide-modal, product-quick-view, free-shipping-bar, …).

## 2026-06-20 — SEO Tools group in the left sidebar

Added an **SEO Tools** category to the sidebar (same expandable-group mechanism as "Learn & Think"). Added `{ id: 'seo', label: 'SEO Tools' }` to `CATEGORY_META` in [tools-registry.js](src/lib/tools-registry.js) (after Dev Tools) and reassigned the 7 SEO tools to `category: 'seo'`: og-image-generator, meta-tag-generator, seo-checker, robots-txt-generator, sitemap-generator, schema-markup-generator, hreflang-tag-generator (previously split across dev/design). No Sidebar component change needed — category groups derive from CATEGORY_META + each tool's `category`. Category landing pages (`categories.js`) are independent and unaffected.

## 2026-06-19 — 10 more UI snippets (dev/noindex) + mycode emoji fix

**10 new high-demand snippets** (each a full component + 1200-word-plus SEO block), registered at the end of the array (newest) and now **live (indexed)** after a preview pass: **pagination** (numbered, smart-ellipsis), **animated-hamburger** (bars→X morph), **textarea-counter** (live char count + warn/limit), **file-input** (styled custom file field), **claymorphism-card** (clay UI / soft 3D), **status-avatar** (presence dot + initials fallback), **vertical-tabs** (ARIA tabs + arrow keys), **callout-box** (note/tip/warning/danger admonitions), **feature-list** (included/excluded checklist), **avatar-upload** (circular upload + live preview). `SNIPPET_COUNT` 315 → **325**.

**Export-safe JS fix (found in preview).** The Vue/React exports run snippet JS inside Vue's `setup()`, which executes *before* the component mounts — so top-level `document.querySelector(...)` returned nothing and `.closest`/`.addEventListener` threw. Rewrote the six JS-driven snippets (pagination, textarea-counter, file-input, avatar-upload, vertical-tabs) to defer DOM work into a guarded `init()` run via `requestAnimationFrame` (with `if (!el) return`), and claymorphism-card to document-level click delegation. Works in HTML, Vue, React, and Angular exports. All pass `scripts/audit-snippet-seo.mjs` and `node --check`.

**Bug fix — mycode emoji mojibake.** The `/ui-snippets/mycode/` empty state and a demo card grid in [UiSnippetsTool/index.js](src/components/UiSnippetsTool/index.js) had UTF-8 emoji corrupted into Latin-1 mojibake (`📋`→`ðŸ"‹`). Repaired the empty-state action icons (📋 ✏ 🔗) and all six demo card icons (⌨️🎭🎵🧲🌈🔦) via a cp1252→UTF-8 round-trip in Python (UTF-8 safe); verified 0 replacement/control chars remain.

## 2026-06-19 — Archive & delete are now global across a task's projects (Mini Kanban + Freelance Dashboard)

For multi-project tasks, archiving or deleting a task now applies to **every project it belongs to**, not just the active board — reversing the earlier "independent boards" archive behavior. Active-board drag placement stays independent per project (a task can still sit in a different column on each board); only the terminal archive/delete actions are global. Changed identically in [MiniKanbanTool](src/components/MiniKanbanTool/index.js) and [FDBoard](src/components/FDBoard/index.js):

- **`archiveTask`** — moves the task to each project's Archived column across all of `task.projectIds` (strips it from every column first, then prepends to that project's `archivedColId`). Was: active project only.
- **`unarchiveTask`** — mirror of archive: restores the task to the first non-archived column in every one of its projects.
- **`permanentDeleteArchivedTasks`** (empty Archived bin) — now deletes globally: removes the tasks from the store and from every project's `taskOrder`. Was: dropped membership for the current project only, keeping the task alive in other projects.
- **`permanentDeleteTask`** (single delete) — already global (no change).
- `deleteColumn` (which archives a column's tasks when removing the column) left project-scoped — it's board restructuring, not a task-level action.

Both files verified syntax-clean (tsc, no TS1xxx).

## 2026-06-18 — 10 new high-demand UI snippets (305 → 315), now live

Added 10 unique, high-search-volume UI snippets, each a complete component (HTML/CSS/JS) plus a full SEO block (1200+ word technical `about`, howToUse, features, useCases, framework FAQs) meeting the snippet SEO standard. Initially shipped as dev/noindex for review, then **promoted to live (indexed)** after a preview pass that also fixed: a centered hover-dropdown layout, missing link styles, framework-export `Unexpected token 'return'` errors (inline `onsubmit="return …"` → JS `addEventListener`), and Tailwind/React heading shrink (bare `h2`/`h3` selectors → real classes, since Tailwind Preflight resets headings).

- **gradient-button** (buttons) — moving gradient, shine sweep, and gradient-border variants ("css gradient button").
- **3d-button** (buttons) — tactile two-layer press effect ("css 3d button").
- **custom-checkbox** (forms) — accessible styled checkbox with an animated SVG checkmark draw.
- **custom-radio** (forms) — selectable-card radio group using `:has()` ("css radio buttons").
- **custom-select** (forms) — fully styled select with outside-click + keyboard close ("custom select dropdown").
- **neumorphism-card** (cards) — dual box-shadow soft-UI card ("neumorphism css").
- **animated-underline** (animations) — five hover underline effects via scaleX/transform-origin.
- **css-hover-dropdown** (navigation) — pure-CSS hover menu with the invisible hover-bridge fix + focus-within.
- **cta-banner** (heroes) — gradient call-to-action section with inline email capture and trust badges.
- **password-toggle** (forms) — accessible show/hide eye toggle (aria-pressed, type swap).

Registered all 10 at the **end** of the SNIPPETS array in [snippets.js](src/components/UiSnippetsTool/snippets.js) (so they sort as the newest) and set [snippet-count.js](src/lib/snippet-count.js) to **315**. Pages/sitemap auto-derive (`generateStaticParams` over SNIPPETS; VISIBLE_SNIPPETS for production). The drift check now compares against the non-noindex (indexed) count rather than the raw array length, so future dev snippets won't inflate the public number. All 10 pass `scripts/audit-snippet-seo.mjs` (titles 30–60, descriptions 120–165, framework mention) and `node --check`; registry loads with 315 indexed, unique ids.

---

## 2026-06-18 — All Learn-to-Code playgrounds expanded to beginner→pro + SEO

Audited every code playground for beginner→pro coverage and expanded the ones that stopped short, each with genuinely-runnable pro lessons (against the real engine, not faked) plus updated SEO (counts, pro topics, a "Why use X" angle, FAQs). Lesson counts before → after:

- **GraphQL** 12 → 26 ([GraphQLPlaygroundTool/index.js](src/components/GraphQLPlaygroundTool/index.js)): added Aliases & Meta Fields, Filtering/Sorting/Pagination (offset + cursor/Relay connections), Enums & Interfaces, Errors & Nullability, Auth & Context (operation- and field-level), and Performance & Production (N+1 problem, DataLoader, schema design, subscriptions/federation overview). All run on the existing in-browser executor.
- **Firebase** 12 → 23 ([FirebasePlaygroundTool/index.js](src/components/FirebasePlaygroundTool/index.js)): extended the mock SDK with `startAfter`, `writeBatch`, `runTransaction`, `getCountFromServer`, and a minimal Auth model; added Pagination & Aggregation, Transactions & Batches, Data Modeling, Authentication, and Security Rules (real `firestore.rules` syntax modeled in runnable JS). Also fixed the layout (editor + console now fill the height with the console anchored at the bottom; mobile keeps natural scroll) and made the header lesson count dynamic.
- **Python** 18 → 30 ([PythonPlaygroundTool/index.js](src/components/PythonPlaygroundTool/index.js)): added Comprehensions, Iterators & Generators, Decorators, Type Hints, Advanced Functions (*args/**kwargs, closures), Functional Tools (map/filter/lambda), Testing (assert), and an async/await overview — each with a hand-authored step trace (memory + output per line).
- **SQL** 33 → 39 ([SqlPlaygroundTool/lessons.js](src/components/SqlPlaygroundTool/lessons.js)): new Indexes, Transactions & Performance chapter — CREATE INDEX + pg_indexes, EXPLAIN ANALYZE, BEGIN/ROLLBACK transactions, upserts with ON CONFLICT, and views. Runs on real Postgres (PGlite); mutations wrapped in BEGIN…ROLLBACK to keep the seed clean.
- **Mongo** 32 → 37 ([MongoPlaygroundTool/lessons.js](src/components/MongoPlaygroundTool/lessons.js)): new Modeling & Production chapter — reporting pipelines, $lookup + $unwind join-and-flatten, embedding vs referencing, and clearly-labeled indexes/explain() and transactions overviews.
- **Express** 32 → 38 ([ExpressPlaygroundTool/lessons.js](src/components/ExpressPlaygroundTool/lessons.js)): new Validation, Security & Production chapter — input validation (400s), API-key auth (401), helmet-style security headers, rate limiting (429), centralized error-handling middleware, and testing/deploy. All runnable against the in-browser Express engine.
- **Next.js** 26 → 32 ([NextjsPlaygroundTool/lessons.js](src/components/NextjsPlaygroundTool/lessons.js)): new Going to Production chapter — dynamic routes, Server vs Client Components, loading & streaming, data fetching & caching, the Metadata/SEO API, and middleware & deploying. Runs in the real iframe engine.
- **Node.js** 25 → 31 ([NodejsPlaygroundTool/lessons.js](src/components/NodejsPlaygroundTool/lessons.js)): new Production & Performance chapter — environment variables, CommonJS vs ES Modules, measuring performance, worker threads, scaling with cluster, and logging/debugging. Runs on the in-browser Node shim.

The strong frontend playgrounds (HTML/CSS/JS/React/Vue/Angular/jQuery/Bootstrap/Tailwind/SCSS/GSAP/TS/Git, 40–72 lessons) already covered beginner→pro and were left as-is. Every changed file verified syntax-clean (node --check / tsc TS1xxx). Honesty held throughout: where an engine can't truly run something (security rules, worker threads, cluster, transactions), the lesson shows the real syntax and models the logic, clearly labeled.

---

## 2026-06-18 — Next.js Babel fix + Next.js/Node.js playground SEO rewrite

**Bug fix — Next.js preview blank with "Cannot use import statement outside a module".**
The Next.js playground loaded `@babel/standalone` **unpinned**, which resolved to a newer Babel whose `preset-react` defaults to the *automatic* JSX runtime — injecting `import { jsx } from "react/jsx-runtime"` into the compiled output, which can't run as a classic script. Pinned to `@babel/standalone@7.25.9` + `react@18.3.1`/`react-dom@18.3.1` (classic runtime), matching the working React playground ([NextjsPlaygroundTool/index.js](src/components/NextjsPlaygroundTool/index.js)). Verified via a transform-repro that no lesson leaks an `import`.

**SEO rewrite for both playground pages** (per the lesson-curriculum work above).
- [nextjs-playground/page.js](src/app/nextjs-playground/page.js): rewritten metadata, FAQ/Software/HowTo schema, about deep-dive, features, steps, and use cases for the 26-lesson App Router course. Added a **"Why Use Next.js?"** benefits section (file-based routing, layouts, server/client components, route handlers, rendering modes, built-in optimizations, React DX). **Flipped `robots` from `index:false` to `index:true`** — the page now has real depth matching its indexed siblings (flag for review if the noindex was intentional).
- [nodejs-playground/page.js](src/app/nodejs-playground/page.js): rewritten to reflect 20 runnable real-JS lessons + the 5-lesson event-loop visualizer; honest framing of the in-memory `fs`/modeled `http`. Added a **"Why Use Node.js?"** benefits section (one language across the stack, non-blocking I/O, npm ecosystem, V8 speed, built-in modules, powers the toolchain). Fixed use-case icons to mapped SVG keys (old `LOOP`/`ASYNC`/`FS`/`NEXT` rendered as literal text).
- Both verified syntax-clean via tsc (no TS1xxx); all use-case icons resolve to real SVGs.

---

## 2026-06-18 — Next.js & Node.js Playgrounds: full lesson curricula (parity with other playgrounds)

The two thinnest Learn-to-Code tools (Next.js had 0 lessons / a bare template sandbox; Node.js had 5 visualizer lessons) now have real chapter-based curricula matching the HTML/JS/React pattern (sidebar grouped by chapter, collapsible concept panel, progress + Mark Done, prev/next nav, Quick Check challenges).

**Next.js** ([NextjsPlaygroundTool](src/components/NextjsPlaygroundTool/))
- New [lessons.js](src/components/NextjsPlaygroundTool/lessons.js): **26 lessons** across 9 chapters (App Router Basics, Layouts, Components & Props, Client Components & State, Route Handlers/API, Styling, Data & Rendering Patterns, Navigation, Patterns & Project). Each lesson supplies starter files merged over BASE_FILES.
- index.js refactored from a templates sandbox to the standard lesson shell, **reusing the existing iframe engine** (React 18 UMD + Babel) so every lesson runs for real — editing code shows a live preview, and route-handler lessons call a working GET endpoint. This also retires the earlier honesty gap where the page advertised "structured lessons" it didn't have.

**Node.js** ([NodejsPlaygroundTool](src/components/NodejsPlaygroundTool/))
- New [lessons.js](src/components/NodejsPlaygroundTool/lessons.js): **20 runnable lessons** (Modules & require, Globals & process, Async Patterns, EventEmitter, Paths, Buffers, Streams, File System, JSON, Error Handling, HTTP, Testing) **plus the original 5 event-loop visualizer lessons**, kept as their own "Event Loop (Visualized)" chapter.
- Added a real in-browser Node runtime (`buildNodeSrcDoc`): runs lesson JS in a sandboxed iframe with faithful pure-JS shims for `events`, `path`, `util`, `assert`, `os`, `Buffer`, `process`, and async/await/streams. `fs` is an honest in-memory model (real ENOENT behaviour, memory store not disk) and `http` is a clearly-labeled single-request model — nothing fabricates output. User code runs in its own `<script>` tag with a global error handler + guaranteed completion, so typos surface instead of hanging.
- Per the chosen approach: real execution where the concept is genuinely JS; clear labels where the browser can only model a server resource.

Both verified syntax-clean via tsc (no TS1xxx) and `node --check` on the lesson files. SEO copy for both page.js files should be enriched next to advertise the new lesson counts/topics (follow-up).

---

## 2026-06-18 — PHP Playground: stop fabricating output for edited code

Audited the **Learn to Code** category (27 tools) for genuine learning value, measured by lesson count and — critically — execution fidelity (does editing the code produce a *real* result?).

**Findings**
- **Genuinely real execution:** all frontend playgrounds (HTML/CSS/SCSS/JS/TS/React/Vue/Angular/jQuery/Bootstrap/Tailwind/GSAP via iframe+Babel), **SQL** (real Postgres via PGlite WASM), and **Mongo/Express/Firebase** (run the learner's actual JS through `new Function` against in-browser engines/mocks). These are honest sandboxes.
- **Thin but honest:** **Node.js** (5 lessons, an event-loop *visualizer* with canned traces — labeled as such), **Python** (tracer over a safe subset).
- **The one real offender:** **PHP Playground**. `inferOutput` was a regex guesser that fabricated plausible-but-wrong values on edit (`echo 5+3` → `"calculated numeric result"`, every `var_dump` → `float(125.5)`, hardcoded pattern→output map).

**Fix** ([PhpPlaygroundTool/index.js](src/components/PhpPlaygroundTool/index.js))
- Rewrote `inferOutput`: lesson examples still show their verified hand-checked output; edited code now only echoes what's truthfully derivable (pure string literals, static HTML) and **never fabricates** computed values.
- `formatOutput` gains a `needsRuntime` flag — when the edit contains variables/math/calls/loops/classes, it shows an honest "PHP runs on a server, this preview can't execute your edits" note instead of a fake result.
- No SEO copy change needed: `php-playground/page.js` already states "Does this run real PHP? No. It simulates… in JavaScript."

Other backend playgrounds left untouched — they genuinely execute the learner's code. Removal was rejected (kills indexed SEO assets); fix/relabel chosen instead.

---

## 2026-06-17 — Multi-project tasks in Mini Kanban & Freelance Dashboard board

A task can now belong to **one or more projects** (was strictly one). Users add/remove a task's projects, and every task is forced to keep **at least one**. Applies to both **Mini Kanban** (`MiniKanbanTool`) and the board embedded in the **Freelance Dashboard** (`FDBoard`) — near-identical files, changed in lockstep.

**Model & behavior**
- New canonical `task.projectIds: string[]`; `task.projectId` kept mirrored to `projectIds[0]` for backward compat with old clients/Gist payloads.
- Placement stays driven by each project's `taskOrder` (source of truth via existing `getTaskColInProject`). Membership = appearing in a project's `taskOrder`.
- **Independent per project**: a task can sit in a different column on each board (e.g. "Done" in A, "To Do" in B); dragging/archiving on one board doesn't move it elsewhere.
- Added `reconcileProjectMembership(state)` — idempotent helper that syncs `taskOrder ⇄ projectIds`, dedupes a task to one column per project, and re-homes orphans (≥1 rule). Replaces the old "exactly ONE project" load pass; also runs after backup import.
- Archive auto-delete is now **per project**: a membership expires after 7 days in that project's archived column; the task is deleted entirely only once it has no remaining projects. `permanentDeleteArchivedTasks` and `deleteCurrentProject` likewise drop only the current project's membership and preserve tasks still owned elsewhere.
- New `addTaskToProject` / `removeTaskFromProject` (remove is blocked at the last project).

**UI**
- Cards show small colored dots for a task's *other* projects (tooltip lists names).
- Task panel gains a **Projects** section: chips (color dot + name + ✕, ✕ hidden at last project) plus a "+ Add project" select.
- Added the project **color picker** to the Freelance Dashboard board header (it already existed in Mini Kanban; `updateProjectColor` was present but unsurfaced).

**Sync** — `FreelanceDashboard` `mergeKanbanDataWithFlag` no longer forces each task into a single column from `task.columnId` (which would yank multi-project tasks out of their other columns); it now only dedupes a task to one column *within* each project, preserving cross-project membership and per-project placement.

**Files** — `src/components/MiniKanbanTool/{index.js,styles.module.css}`, `src/components/FDBoard/{index.js,styles.module.css}`, `src/components/FreelanceDashboard/index.js`.

---

## 2026-06-16 — SVG Wave Generator (new standalone tool)

Built a full standalone **SVG Wave Generator** tool (not a UI snippet) for generating layered SVG wave dividers — the soft curved transitions used beneath hero sections and above footers.

**What it does**
- Generates smooth waves by sampling a sine function across a 1440-unit width and converting the points to a continuous path via Catmull-Rom → cubic-bezier (no jagged edges).
- Sliders: amplitude, wave count, smoothness (sample density), layers (1–5), height. Six presets: Calm, Smooth, Wavy, Peaks, Choppy, Bold.
- Top or bottom edge placement; solid color or two-stop vertical linear gradient.
- Layered effect stacks translucent paths at offset baselines/phases with graduated `fill-opacity` for a depth ribbon.
- Randomize button (shuffles phase/amplitude/frequency).
- Live React-rendered preview; exports **SVG markup**, **CSS data-URI background**, and a **React component** (attributes converted to JSX camelCase). Copy button.

**Files created**
- `src/components/SvgWaveGeneratorTool/index.js` + `styles.module.css` (accent `#06b6d4` cyan)
- `src/app/svg-wave-generator/page.js` (metadata + FAQ/Software/Breadcrumb JSON-LD + full SeoSection, ~1100 words, interlinked)
- `public/icons/svg-wave-generator.svg`

**Wiring** — registered in `tools-registry.js` (category `css`, status `live`) so sidebar/sitemap/llms.txt pick it up automatically; added to `CssToolsTopNav` NAV_ITEMS and `related-tools.js` (own entry + design/SVG group). Home-page tool count is auto-derived from `LIVE_TOOLS.length` — no manual count edit needed.

---

## 2026-06-16 — 10 high-demand UI snippets for developers & designers (255 → 265)

**New snippets** — all registered, SEO-audited, and tested across all 6 export targets:
- **Inline Edit Field** — click-to-edit with text/textarea/date variants, cancel/rollback, Escape key, saved toast
- **Mention Autocomplete** — @mention popup in contenteditable, keyboard nav, chip insertion, comment feed
- **NPS Survey Widget** — 0–10 scale, detractor/passive/promoter classification, contextual follow-up, thank-you screen
- **Changelog / Release Notes** — versioned timeline with type badges, filter tabs, bullet items, glowing new-entry dot
- **Multi-Tab Code Block** — dark editor with file tabs, token-based syntax highlighting, line numbers, copy button
- **Auth Login Card** — social sign-in (Google/GitHub SVG), validation, show/hide password, loading state, autocomplete attrs
- **Maintenance Page** — countdown timer, pulsing status pill, rocking gear logo, dot-grid background, email notify
- **Product Roadmap Board** — Planned/In Progress/Shipped columns, per-item upvote toggle, quarter labels, category tags
- **CSS Loader Gallery** — 8 pure-CSS loaders (spinner, dots, pulse ring, skeleton, orbit, progress bar, grid, typing), click-to-copy
- **Mega Footer** — brand + social + newsletter column, 4 link groups, language selector, responsive 2-col collapse

**Export fixes landed this session:**
- `css-to-tailwind`: `repeat(auto-fill, minmax())` no longer collapses to `grid-cols-1` — preserved as arbitrary value
- `snippet-exporters`: Added drag/touch events (ondragover, ondragleave, ondrop, ontouchstart…) to React/Vue/Angular converter map
- `collectJsHtmlClasses`: Extended to catch `.className =` and `setAttribute('class', …)` assignments — prevents JS runtime className rewrites from wiping Tailwind utility classes
- `ExportTester`: `#root { display:contents }` and `#app { display:contents }` — React/Vue mount nodes no longer interrupt the body flex layout, fixing width expansion in the terminal-window and similar snippets

**Bug fixes, SEO pass & go-live (follow-up):**
- Fixed 4 runtime SyntaxErrors from `\'` escapes / smart quotes in template-literal JS: `maintenance-page` (We'll), `changelog-feed` (team's), `product-roadmap` (vote onclick attr), and `code-block-tabs` (wrapped multi-token lines in `[]` so the renderer joins them on one line instead of one token per line)
- `code-block-tabs`: added `color:#e2e8f0` to `code` so untyped `v` tokens (variables) are visible on the dark background
- `MoreInCategoryStrip`: now shows 4 cards per row (was 6) — `PAGE_SIZE` 6→4, grid `repeat(4, …)`, tablet breakpoint 3→2
- SEO-audited all 10 new snippets to the full standard (1200+ words, ≤60-char title, ≤160-char framework-hook description, React + Tailwind FAQ). Added a React FAQ to `css-loader-gallery`, appended a Tailwind-export sentence to every React FAQ, nudged `changelog-feed` past 1200 words, trimmed 3 over-length descriptions
- Removed `noindex` from all 10 → now live in production listings & sitemap (postbuild filters `noindex`)

## 2026-06-15 — 10 more high-quality UI snippets (245 → 255)

Added a second batch of 10 unique snippets, all SEO-audited to 1200+ words, ≤60-char titles, 130–165-char descriptions, framework FAQ, 8 features, 6 use cases. `SNIPPET_COUNT` 245 → 255.

- **mortgage-calculator** (forms) — Amortization formula, linked down-payment slider, 15/30-yr toggle, principal/interest split bar, payoff date
- **bmi-calculator** (forms) — Metric/imperial toggle with value conversion, WHO category gauge, animated marker, health advice
- **pomodoro-timer** (dashboards) — Circular SVG ring, auto-cycling focus/break modes, round tracker, ambient mode background
- **stopwatch** (dashboards) — performance.now() + rAF precision, lap splits, best/slowest highlighting, accumulator pause/resume
- **comment-thread** (cards) — Recursive nested replies, toggle voting, top/newest sort, :scope selectors, auto-grow composer
- **terminal-window** (cards) — macOS chrome, randomised typing animation, colour-coded output, replay with timeout cleanup
- **boarding-pass** (cards) — Flight route, perforated tear-off stub with CSS notches, pure-CSS barcode, responsive stack
- **quiz-card** (cards) — Data-driven questions, instant feedback, scoring, animated results ring, restart
- **org-chart** (layouts) — Pure-CSS connector tree, collapsible branches (:scope > ul), report-count badges
- **nutrition-label** (cards) — Pixel-accurate FDA Nutrition Facts panel, rule hierarchy, nutrient indentation, all real text

Verified: 255 total, no duplicate IDs, all categories valid, every `js` string syntactically valid.

---

## 2026-06-15 — 10 new UI snippets + SEO Checker heading fix

Added 10 new unique snippets (235 → 245, `SNIPPET_COUNT` updated):

- **mini-cart** (cards) — Shopping cart dropdown with qty steppers, remove, subtotal, checkout CTA
- **world-clock** (dashboards) — 8-city live world clock grid with day/night indicators, Intl timezone API
- **weather-widget** (cards) — Glassmorphism weather card with SVG icons, 5-day forecast strip, and detail stats
- **tip-calculator** (forms) — Bill tip calculator with preset %, custom tip, people split, live per-person totals
- **invoice-preview** (cards) — Print-ready invoice with line items table, tax/discount/total, and PDF print button
- **settings-panel** (layouts) — Two-panel settings page: sidebar nav, profile form, notification toggles, appearance controls
- **api-key-manager** (dashboards) — API key list with masked display, show/hide toggle, copy, revoke, create new key
- **interest-selector** (forms) — Onboarding multi-select interest chip grid with minimum selection validation
- **media-upload-grid** (forms) — Drag-and-drop multi-image upload with URL.createObjectURL thumbnail grid
- **cookie-preferences** (modals) — GDPR cookie consent banner + granular category toggle modal

Fixed **SEO Checker** tool heading: `SeoPlaygroundTool/index.js` still showed "SEO Playground" in the `.headerTitle` span. Changed to "SEO Checker". Also updated two internal output/report strings from "SEO Playground output/report" → "SEO Checker output/report".

---

## 2026-06-14 — Single source of truth for the UI-snippet count + seo-checker.png OG

The displayed UI-snippet count was inconsistent across the site (235+, 195+, 175+ all appeared). Centralised it:

- New `src/lib/snippet-count.js` exporting `SNIPPET_COUNT = 235` — a tiny standalone module on purpose, so pages that only need the number don't bundle the whole snippets array (which carries every snippet's HTML/CSS/JS). A dev-time check in `snippets.js` warns if `SNIPPET_COUNT` drifts from `SNIPPETS.length`.
- Replaced every hardcoded chrome/SEO count with `SNIPPET_COUNT`: home page (`page.js` — also dropped the heavy `VISIBLE_SNIPPETS` import, it was only used for `.length`), `ui-snippets/page.js` (14 × 195+, single-quoted metadata strings converted to template literals), `about`, `ui-snippets/mycode`, `ui-snippets/[slug]`, `RightPanel`, `ToolNudge`, and the UiSnippetsTool header + "Explore N snippets" button.
- Left snippet-internal demo text (carousel, feature-cards, newsletter-signup, word-flip-hero, social-post-card) that shows "175+"/"65+" as illustrative sample content — not real claims.

Also: pointed the SEO Checker OG/Twitter/schema/sample meta tags at the new user-provided `seo-checker.png` (was still `seo-playground.png`).

## 2026-06-14 — Renamed /seo-playground/ → /seo-checker/ (repositioned as an SEO tool)

Rebranded the tool from "SEO Playground" to "SEO Checker" and moved it out of the learn-to-code/playgrounds grouping into the SEO tools family — better aligned with how people search ("SEO audit tool", "free SEO checker").

- **Route:** new `src/app/seo-checker/page.js` (rewritten metadata, FAQ/Software/Breadcrumb JSON-LD, about/features/use-cases all rebranded and sharpened around "free SEO audit"); deleted `src/app/seo-playground/`.
- **Registry** (`tools-registry.js`): slug `seo-playground`→`seo-checker`, name → "SEO Checker", new icon `/icons/seo-checker.svg` (copied from the old one). Because the sitemap + llms.txt are generated from `LIVE_TOOLS` in `scripts/postbuild.js`, the next build automatically drops the old slug and includes the new one.
- **Out of learn-to-code:** removed from `categories.js` learn-to-code `toolSlugs` (count 28→27, dropped the "and SEO" mention), the home-page and SeoSection playground lists, the Sidebar `PLAYGROUND_SLUGS`, and `PlaygroundTopNav`.
- **Into SEO tools:** kept/rebranded in `SeoMetaToolsTopNav` ("SEO Checker"), and the tool component now renders `SeoMetaToolsTopNav` instead of `PlaygroundTopNav`. Updated `related-tools.js` (key + all values), the html-playground and reading-time-calculator cross-links, and the RedisPlaygroundTool sample keys.
- **Component sample:** rebranded `DEFAULT_HTML`, `DEFAULT_FIELDS`, and `DEFAULT_URL` in `SeoPlaygroundTool` to the new name and `/seo-checker/` URLs.
- **Redirect:** static export (`output: 'export'`) doesn't support `next.config` redirects, so added a 301 in `public/.htaccess`: `RewriteRule ^seo-playground/?$ /seo-checker/ [R=301,L]` (preserved into `out/` by postbuild).

Note: kept the component directory name `SeoPlaygroundTool` (internal, invisible) and the shared `seo-playground.png` OG image to avoid asset churn — both are safe to rename later if desired.

## 2026-06-14 — CDN libraries flow into exports & previews

Snippets that load external libraries via the CDN panel (e.g. scroll-pin-story uses jQuery + GSAP + ScrollTrigger) were dropping those `cdnUrls` from every export and from the Export Tester previews, so the snippet JS threw `gsap is not defined`.

- `snippet-exporters.js`: new `cdnTagsHtml()` (exported) emits `<link rel="stylesheet">` for `.css` URLs and `<script src>` for the rest. `toHtmlFile` and `toTailwindHtml` now inject them into `<head>` (before the inline JS, so globals exist). React/Vue/Angular component exports get a header comment listing the CDN deps (`//` for JSX/TS, `<!-- -->` for the Vue SFC) since you can't inline a CDN `<script>` into a component file.
- `ExportTester.js`: `buildPreviewSrcdoc`/`buildReactPreview`/`buildVuePreview` take `cdnUrls` and inject the tags into the iframe head, so all six live previews run with the libraries loaded. React preview also strips the leading `//` dependency comment before compiling.
- Threaded `cdnUrls` through: `currentSn()` now carries `cdnUrlsRef.current`, both `<ExportTester>` mounts pass `cdnUrls={cdnUrls}`, and `getCode()` forwards `sn.cdnUrls` to each builder. Static snippets work automatically because the converters read `sn.cdnUrls`.

Verified against scroll-pin-story: gsap/ScrollTrigger `<script>` tags present in HTML & Tailwind exports and listed in the React/Vue/Angular comments.

## 2026-06-14 — Published 12 dev snippets live (SEO audit + fixes)

Audited and shipped the 12 remaining `noindex: true` dev snippets: currency-converter, file-manager-ui, floating-action-btn, image-hotspot, location-card, progress-wizard, rating-breakdown, split-button, status-dashboard, step-progress, subscription-widget, swipe-delete-list.

Per-snippet audit (a throwaway harness combining the React/RT/Vue parse check with SEO metrics) surfaced, and I fixed:
- **Missing `about.title`** on all 12 — the "About this UI snippet" heading published snippets show. Added one each in the house format `Name — Feature, Feature & Feature`.
- **Descriptions > 160 chars** on 10 — rewrote each to 140–160 with a framework-export hook (`… exports to React, Vue & Angular`).
- **< 2 framework mentions** on 3 (react-only) — added a framework-export FAQ; all 12 now reference React, Vue, Angular & Tailwind.
- **Word count** — added framework-export FAQs and a few targeted FAQs; all 12 now run 1131–1230 words, at/above the live floor (command-palette 1124, floating-chat-widget 1128). Note: the *first* audit pass over-reported counts because it ran `Object.values()` on string-array `features` (counting characters as words); the corrected counter divides feature strings on whitespace.
- **Conversion errors** (the blank-preview class from the screenshots) — none; all 12 generate parse-clean React/React+Tailwind/Vue.

Made live by deleting `noindex: true`: `page.js` then emits `robots: index/follow` and `scripts/postbuild.js` includes them in the sitemap + llms.txt on the next build.

## 2026-06-14 — Export-preview hardening: React/Vue codegen, error detection, loading veil

Built a Babel-based audit harness (`babel.parse` with the `jsx` plugin) that runs every snippet's generated React, React+Tailwind and Vue through a parser. It surfaced **49 snippets** producing invalid React and several Vue runtime-scope failures that had never been caught. Fixed them at the right layer:

**Converter-level (one fix → many snippets), in `snippet-exporters.js`:**
- **Void self-close ordering** — `selfCloseVoids()` now runs on raw HTML *before* handler conversion, so the regex never meets the `>` inside a converted `onInput={(e) => …}` arrow (which produced `= />`). Also tolerates already-self-closed source (no more `/ />`).
- **CSS custom properties** — `styleStrToObj` keeps `--foo` literal & quoted (`'--foo'`) instead of camel-casing it into the invalid key `-C`. This alone fixed ~16 snippets.
- **Component name** — prefix `Snippet` when the name starts with a digit (`3DCardTilt` → `Snippet3DCardTilt`) so it's a valid JS identifier.
- **Keyword filter** — `collectHandlerNames` no longer treats `if(`/`for(` etc. as functions (was emitting `window.if = if`).
- **Leading-comment classification** — `splitTopLevel`/`analyzeVanillaJs` strip leading comments before deciding if a statement is a function. A trailing `// …` comment was attaching to the next statement and hiding a whole `function animateRings(){}` inside `onMounted`, so the Vue template threw "animateRings is not defined".
- **Vue setup returns** (`ExportTester.vueSetupReturns`) anchored to column 0 — only top-level declarations are returned from `setup()`, fixing "now is not defined" (it was returning `const now` from inside a function body).

Result: **237/237 React and 237/237 Vue** snippets now generate parse-clean, scope-correct code.

**Per-snippet data bugs (fixed in each snippet's own file):**
- `coming-soon-hero`, `product-hero`: `'✓ You\'re …'` in a template-literal `js` field collapsed to an unescaped apostrophe → switched to double quotes (was breaking the live tool too).
- `plan-selector`: `\n\n` in a single-quoted string collapsed to real newlines → `\\n\\n`.
- `ai-chat-interface`, `code-comparison`, `table-of-contents`: literal `{`/`}` in displayed-code text → HTML-encoded (`&#123;`/`&#125;`), which renders identically and is valid across HTML/JSX/Vue/Angular.

**Preview UX (`ExportTester.js`):**
- **Explicit compile + error detection** — React preview now compiles via `Babel.transform` inside a `try/catch` (was a silent `<script type="text/babel">` auto-scan). CDN load failures, JSX compile errors and runtime throws are all caught, logged to the console panel, and shown in-pane with a **Reload preview** button. Vue mount got the same treatment. Pinned exact CDN versions (react 18.3.1, babel 7.26.4, vue 3.5.13) to cut redirect latency and flaky loads.
- **Console noise filter** extended (Babel "precompile", Tailwind CDN, cross-origin "Script error.") and Error objects now serialize to their message instead of `{}`.
- **White loading veil** with a spinner over the preview while switching tabs, cleared on iframe `onLoad`.
- Preview iframes always paint on a white background.

## 2026-06-14 — Robust Vue/Angular framework conversion (functions + deferred DOM)

The snippets are imperative vanilla-DOM scripts (top-level `document.getElementById` refs + function declarations + inline `on*` handlers). The Vue/Angular converters were dumping the entire JS into a single lifecycle hook (`onMounted` / `ngAfterViewInit`), so the functions the template calls (`toggleChat`, `quickReply`) lived inside that closure and weren't reachable — the Vue preview threw `toggleChat is not a function`, then `isOpen is not defined`.

Added a shared, string/comment/template-literal-aware analysis layer in `snippet-exporters.js`:
- `splitTopLevel(src)` — splits JS into top-level statements (cuts on `;` at depth 0, and on the `}` that closes a top-level `function`/`class` body — **not** on the `)` of a parameter list, which was the first bug found in testing).
- `analyzeVanillaJs(js)` — classifies each statement: function declarations + plain data stay hoisted at component scope (template-reachable); single-declarator `document.getElementById/querySelector` refs become a hoisted bare `let` + a deferred assignment; other side-effects (e.g. `addEventListener`) defer to mount.
- `convertTemplateHandlers(html, 'vue'|'angular')` — maps inline `on*` to `@event`/`(event)`, rewriting `this`→`$event.currentTarget` and `event`→`$event` in a **single pass** (second bug: a two-pass replace re-matched the `event` inside the `$event.currentTarget` it had just produced → `$$event`).

`toVueSfc` now emits a real `<script setup>`: functions/data at top level, DOM refs assigned in `onMounted`. `toAngularComponent` keeps the vanilla JS in `ngAfterViewInit` (ViewEncapsulation.None preserves the DOM) and adds `Object.assign(this, { …funcNames })` so template events resolve to component methods. Verified against the floating-chat-widget snippet (all 6 functions captured, generated script passes `node --check`). Also hardened `ExportTester.vueSetupReturns` to capture comma-list bindings.

Note: that snippet's source has a pre-existing `/^[^w]+/` (should be `[^\w]`) — a data bug, preserved faithfully by the converter, not introduced here.

---

## 2026-06-14 — Light-themed, syntax-highlighted code pane in Export Tester

The Export Tester's code pane was dark (`#0d1117`) with plain unhighlighted text. Reworked for light mode:
- Light GitHub-style palette — `#f6f8fa` background, `#1f2328` text.
- Added a lightweight, dependency-free `highlightCode()` (single left-to-right regex pass so string/comment interiors aren't re-tokenized) covering HTML/JSX/Vue/TS: comments, strings, tags/components, keywords, function calls, attributes, numbers. Output is HTML-escaped, rendered via `dangerouslySetInnerHTML`.
- Added a "Generated Code — {format}" header bar to mirror the preview pane's header.
- Added per-pane **Copy** and **Download** buttons in that header (download uses the right extension per format via shared `componentName`/`angularSelector`); removed the now-redundant Copy from the top header.
- Avoided pulling in shiki (heavy, server-oriented) on the client.

## 2026-06-14 — Test Exports promoted to a normal toolbar button (all users)

The "Test Exports" button was dev-only and lived next to "Save as" with a custom amber style. Now:
- It sits between **Copy all** and **Export** in both the header toolbar and the preview-bar.
- It uses the shared `s.iconBtn` style (passed via a new `className` prop on `ExportTester`) so it matches the neighbouring buttons.
- The `process.env.NODE_ENV !== 'production'` gate was removed — the export preview/test lightbox is now available to all users.

## 2026-06-14 — Collapsed 6 export buttons into one "Export ▾" dropdown

The toolbar showed six separate export buttons (HTML, Tailwind, React, React + Tailwind, Vue, Angular) in two places. Replaced both with a single `ExportMenu` dropdown component (in `UiSnippetsTool/index.js`):
- A self-contained `ExportMenu` (own open state + outside-click + Escape) renders an "Export ▾" button.
- Opening it shows a labeled menu — each row has a bold format name plus a sub-line describing what you get (e.g. "React → JSX component (.jsx) with useEffect", "HTML + Tailwind → Standalone file via Tailwind CDN").
- Driven by a single `exportOptions` array so both the header toolbar and the preview-bar use the same list; menu styles added to `styles.module.css` (`.exportMenu`, `.exportMenuItem`, …).

## 2026-06-14 — Single source of truth for all snippet exports

The export converters were duplicated in **three** places that had drifted apart: the toolbar download buttons (`UiSnippetsTool/index.js`), the Test Exports lightbox (`ExportTester.js`), and the on-page framework code tabs (`[slug]/page.js`). The toolbar copy was also **buggy** — it matched the media-query separator as `->` while `css-to-tailwind` actually emits `→`, so every responsive Tailwind prefix was silently dropped; its React export also wrapped output in an extra `<div>` and commented the JS out.

Extracted one canonical module: **`src/lib/snippet-exporters.js`**, exporting `toHtmlFile`, `toReactComponent`, `toTailwindComponent`, `toTailwindHtml`, `toVueSfc`, `toAngularComponent`, plus `componentName` / `angularSelector` helpers. All three surfaces now import from it:
- `[slug]/page.js` — removed ~18 KB of local converters + the local `toHtmlFile`; imports the shared ones.
- `ExportTester.js` — removed ~16 KB of mirrored converters; HTML tab now shows `toHtmlFile(sn)`.
- `index.js` — the five export buttons collapsed into thin wrappers (`currentSn()` + `downloadText()` + a shared converter); `downloadSnippet` now emits the clean `toHtmlFile` document instead of the preview `buildSrcdoc`.

Result: the toolbar download, the Test Exports preview/copy, and the on-page code tabs are now byte-for-byte identical for every format, and there is one place to change export behavior.

## 2026-06-14 — React export now emits a working useEffect hook

The React and React + Tailwind exports previously commented the snippet's vanilla JS out (static, non-interactive). They now generate a real, interactive `useEffect` hook. Applied to **both** `ExportTester.js` (tester) and `src/app/ui-snippets/[slug]/page.js` (public export) so they stay identical.

New shared helpers in both files:
- `convertInlineHandlers(markup)` — maps every inline `on*` attribute (click, change, input, submit, keydown, mouse*, focus/blur, …) to its React synthetic prop, passing `event` and rewriting `this` → `event.currentTarget`. `onsubmit` also gets `event.preventDefault()`.
- `collectHandlerNames(markup)` — gathers the function names called from inline handlers.
- `buildEffectHook(sn)` — emits `useEffect(() => { …snippet JS… }, [])`, then `if (typeof fn === 'function') window.fn = fn;` for each inline-handler function so the converted JSX events (bare-identifier calls) resolve at click time.

This makes the React preview tabs genuinely interactive: `addEventListener`/`getElementById` code runs after mount against the rendered DOM, and inline-handler snippets work via the global exposure. Comment in the output flags it as an auto-generated escape hatch and recommends lifting into state for idiomatic React.

## 2026-06-14 — Live framework previews + draggable split in Export Tester

Extended the dev-only Export Tester so every export format renders a true live preview, and made the code/preview divider draggable.

**Live preview runtimes (`buildReactPreview`, `buildVuePreview` in `ExportTester.js`):**
- **React / React + Tailwind** — runs the exported component through in-browser Babel standalone + React 18 UMD (React+Tailwind also pulls the Tailwind CDN). Module syntax is stripped, the component name is detected, and it's mounted into `#root`. Errors render as a red `<pre>`.
- **Vue** — extracts `<template>`/`<script setup>`/`<style>` from the SFC and mounts it via the Vue 3 global build (includes the template compiler). `import` lines are stripped; `onMounted` etc. are destructured from the global `Vue`.
- **Angular** — Angular can't JIT-compile inside a sandboxed iframe, so the preview is an honest approximation rendered from the original HTML/CSS/JS (which is exactly what `ViewEncapsulation.None` + `ngAfterViewInit` produce). Labeled with an amber "approximated" badge.
- All run inside `sandbox="allow-scripts"`; iframe carries `key={activeTab}` so switching tabs fully remounts the runtime.

**Draggable divider:** 6px grip between code/preview panes, default 50/50 split, clamped 20–80%. A transparent overlay covers the panes during drag so the preview iframe can't swallow mouse events (the original "buggy" symptom). Split is computed from absolute cursor position for exact tracking.

---

## 2026-06-13 — Dev-only Export Tester for UI Snippets

Added a dev-only "Test Exports" button to the UI Snippets tool header (visible in development only, hidden in production via `process.env.NODE_ENV !== 'production'`).

**Files changed:**
- `src/components/UiSnippetsTool/ExportTester.js` — new client component
- `src/components/UiSnippetsTool/index.js` — import + button rendered next to "Save as"

**How it works:**
- A amber-coloured `</>` "Test Exports" button appears in the snippet header toolbar, to the left of "Save as"
- Clicking opens a full-viewport lightbox with a header row of 6 tab buttons: HTML, Tailwind, React, React + Tailwind, Vue, Angular
- Each tab shows a split view: left = generated code (monospace dark pre block), right = rendered iframe preview (where applicable — HTML and Tailwind tabs render live, React/Vue/Angular show a "no live preview" message)
- A "Copy" button copies the generated code to clipboard
- Close button (×) or clicking the dark overlay dismisses the lightbox
- All 5 export converter functions (`toReactComponent`, `toTailwindComponent`, `toTailwindHtml`, `toVueSfc`, `toAngularComponent`) are ported into the component from the slug page server functions, so they run client-side

---

## 2026-06-13 — Added 10 new DEV snippets (235 total, 10 noindex)

Added 10 new DEV-only UI snippets (noindex: true), each with full production-quality HTML/CSS/JS and 1200+ word SEO content:

- **split-button** (buttons) — Primary action + dropdown arrow, aria-expanded, outside-click close
- **rating-breakdown** (cards) — Amazon-style star distribution bars, IntersectionObserver scroll animation, half-star CSS
- **currency-converter** (dashboards) — 10 currencies, cross-rate math, custom SVG-arrow select, swap button
- **subscription-widget** (forms) — Two-state form/success card, shake animation, spring popIn, social proof avatars
- **progress-wizard** (navigation) — 4-step wizard, animated connector fill, icon→checkmark swap, plan selector
- **status-dashboard** (dashboards) — 30-bar uptime histogram, three-state colour system, active incident callout
- **image-hotspot** (layouts) — CSS-drawn scene, ripple pins, tooltip clamp positioning, outside-click close
- **location-card** (cards) — CSS-drawn map with roads/blocks, pin drop animation, directions/share/save actions
- **file-manager-ui** (layouts) — Sidebar tree, grid/list toggle, inline SVG file icons, breadcrumb, storage bar
- **swipe-delete-list** (layouts) — Unified touch+mouse drag, threshold delete, max-height collapse, unread badge

---

## 2026-06-13 — Added 10 new snippets (225 total)

Added 10 high-quality UI snippets with 1200+ word SEO content each:

- **review-card** (cards) — Star ratings, verified badge, helpful vote toggle, featured/negative variants
- **job-listing-card** (cards) — Company logo, salary, job-type badges, filter bar, featured listing
- **checkout-form** (forms) — Card number auto-format, expiry mask, card type detect, promo code, loading/success states
- **sticky-promo-bar** (navigation) — Gradient countdown bar, dark feature bar, amber warning bar, live countdown timer
- **gradient-progress** (loaders) — Shimmer, striped, segmented steps, skill bars, interactive +/− controls
- **code-comparison** (layouts) — Before/after dark theme diff with CSS syntax highlighting, diff line markers, copy button
- **testimonial-masonry** (cards) — 3-column masonry grid, gradient avatars, featured/dark card variants
- **app-download-hero** (heroes) — CSS phone mockup, App Store + Google Play buttons, gradient text, social proof
- **metric-card-grid** (dashboards) — 4 KPI cards with sparklines, trend badges, channel breakdown, goal progress
- **floating-chat-widget** (modals) — Spring animation, typing indicator, quick reply chips, unread badge, auto-response

---

## 2026-06-13 — Snippet bug fixes (carousel, sidebar nav, feature cards)

**carousel.js** — Fixed rapid-click sliding bug: added `isAnimating` flag released on `transitionend` to block new navigation during the 550ms CSS transition.

**sidebar-nav.js** — Fixed collapsed state:
- Collapse button restyled with indigo accent colour (more visible, clearly interactive)
- Logo hidden when collapsed; button centres in header
- Nav icons now properly centred: `display:none` on `.nav-text/.nav-badge/.nav-dot` removes them from flex layout, `justify-content:center` + `gap:0` centres the lone icon in 60px sidebar
- User avatar footer centred the same way

**feature-cards.js** — Two fixes on the dark "Free Forever" card:
- Title/desc/link colours were being overridden by the base rules (CSS specificity order bug); changed `.card-title-light` etc. to `.card-dark .card-title` selectors (higher specificity wins regardless of order)
- Dark card glow changed from indigo `rgba(99,102,241,.12)` to white `rgba(255,255,255,.07)` — indigo-on-navy was visually broken

---

## 2026-06-13 — Added 10 new high-quality snippets (215 total)

Added 10 new UI snippets, each with full production-quality HTML/CSS/JS and 1200+ word SEO content blocks:

- **carousel** (layouts) — Auto-play carousel with progress bar, swipe, dots, pause on hover
- **sidebar-nav** (navigation) — Collapsible sidebar with CSS-only tooltips, badges, user footer
- **multi-range-slider** (forms) — Dual-handle price range slider with live product filter
- **word-flip-hero** (heroes) — Hero section with animated word cycling and gradient text
- **newsletter-signup** (forms) — Email signup with SVG checkmark success animation
- **image-hover-reveal** (cards) — Asymmetric image grid with staggered overlay reveal
- **contact-form** (forms) — Two-panel contact form with per-field validation
- **animated-list** (animations) — Task list with spring add / collapse-out delete animations
- **team-card** (cards) — Team member cards with status dots, stats row, social links
- **feature-cards** (cards) — Feature grid with mouse-tracking radial glow per card

Also removed all tooltip `title=` attributes from UiSnippetsTool right-sidebar buttons (Refresh, device, maximize, pop-out, export, nav prev/next, console clear) and from RightPanel/ShareBar sidebar tooltips. GistSyncButton `✓ 10:02 AM` status badge repositioned to appear above button.

## 2026-06-13 — Took the 10 newest snippets live + SEO pass

**Made all 10 dev snippets indexable:**
- Removed `noindex: true` from notification-center, chip-filter, mega-menu, auto-resize-textarea, circular-steps, stacked-cards, css-animated-border, photo-gallery, parallax-hero, floating-dock
- They now appear in `VISIBLE_SNIPPETS` (listings/sitemap) and get `robots: index,follow` (prod visible snippet count: 205)

**SEO audit + fixes (new `scripts/audit-10-seo.mjs` — checks title/desc length, word count, interlinks, framework FAQ):**
- Added a "Can I use this in React, Vue, or Angular?" framework FAQ to the 4 originals (notification-center, chip-filter, mega-menu, auto-resize-textarea) — fixed both the missing-framework-FAQ gap and pushed each over the 1200-word floor
- Added natural `/ui-snippets/` interlinks to photo-gallery (+image-lightbox, +image-magnifier), parallax-hero (+video-bg-hero), floating-dock (+bottom-nav) to reach the 3-link minimum
- Final: all 10 pass title ≤60, desc 120–165, 1200+ words, ≥3 interlinks, framework FAQ, framework-export hook in description

**Bug fixes found during the pass:**
- SEO How-to-Use steps + feature/use-case cards rendered empty: items used `step:`/`desc:` but SeoSection reads `title:`/`text:` — renamed across all 10. `CardsSection` also patched to read `c.text || c.desc`
- Earlier broad `desc:`→`text:` replace had corrupted JS *runtime data* (alignment padding hit the 6/8-space pattern): chip-filter `ITEMS` (6) and notification-center `NOTIFICATIONS` (3) had `text:` where the render reads `.desc`, rendering `undefined`. Reverted via targeted `text:'` → `desc:'` (runtime data uses single-quote; SEO uses backtick)
- parallax-hero preview looked static (only reacts to in-iframe cursor): added an auto-demo sine drift that runs on load and hands off to mouse on `mouseenter`; extended layers `inset:0 -80px` so translation never clips at the edges; `animate()` now always starts (reduced-motion only disables input-driven motion)

---

## 2026-06-12 — Inline interlinks added to 44 zero-link tool pages

Added 2–4 contextual inline `[text](/slug)` links to every indexable tool page that had none, woven into existing feature/step/use-case text (per the interlinking standard — no standalone "related tools" paragraphs). ~103 link insertions across 44 pages:
- All playgrounds (angular, bootstrap5, express, firebase, git, graphql, html, jquery, js, mongo, php, redis, scss, sql, tailwind, vue, rest-api-builder, seo-playground) now cross-link each other and related generators
- PDF tools (merger, splitter, unlock, metadata, html-to-pdf) cross-link the PDF family
- Calculators (date, emi, loan-payoff, salary-to-hourly, tip, unit-converter, aspect-ratio) link related calculators
- Generators/utilities (cron, css-easing, css-media-queries, database-schema-designer, navbar-builder, svg-motion-studio, ui-snippets, xml-formatter, line-utilities, html/markdown-table-generators, reading-time, youtube-thumbnail-downloader) link complementary tools
- The 9 category hub pages (css-tools, pdf-tools, etc.) intentionally left without prose links — their CategoryGrid already provides internal links to every tool in the category

## 2026-06-12 — SEO metadata fixes batch 2: all remaining over-length descriptions + worst titles

- Rewrote 129 more meta descriptions (169–250 chars → 139–156 chars, keyword-first). Every indexable tool page description now fits within Google's ~160-char SERP display limit — 0 pages remain over 168 chars
- Rewrote 34 more titles (78–85 chars → 49–65 chars), including mind-map, pdf-metadata, client-portal-lite, js-playground, ui-snippets, image-editor, password-generator, paycheck-calculator, and all remaining playgrounds
- Removed the "Free — no install, no signup" prefix pattern that was burning the first 30 visible chars on dozens of pages; keyword/value statement now leads every description
- Remaining (lower priority): 73 titles in the 71–77 char range (only the "| FWD Tools" brand suffix truncates in SERPs); 44 pages with zero inline interlinks in SEO prose

## 2026-06-12 — Site-wide SEO metadata audit + first fix batch

Audited all 190 indexable tool pages for metadata title/description lengths, FAQs, content volume, and interlinking. Key correction: category hub pages (css-tools, pdf-tools, etc.) are NOT thin — their content lives in src/lib/categories.js (6–9 FAQs, 1000–3600 words each), which page.js-only scans miss.

Fixed (34 pages):
- Rewrote 23 meta descriptions that were 250–345 chars down to 140–160 chars, keyword-first (all playgrounds + svg-motion-studio, ui-snippets, image-to-svg, freelance-dashboard, tailwind-to-css, timestamp-converter, emi-calculator)
- Rewrote 12 titles that were 85–98 chars down to ≤65 chars (gradient-generator, regex-tester, csv-json-converter, tailwind-formatter, url-encoder-decoder, database-schema-designer, json-to-typescript, text-tools, yaml-json-converter, tailwind-to-css, hash-generator, jwt-decoder)
- Added missing openGraph + twitter blocks to notepad/page.js (was the only page without them); OG image points to misc-tools.png since no notepad.png exists

Remaining (not yet fixed):
- ~120 meta descriptions in the 170–250 char range still over the ~160 char SERP truncation point
- ~115 titles in the 70–85 char range still over the ~60 char SERP truncation point
- 44 pages with zero inline interlinks in prose (mostly playgrounds and PDF tools)
- robots.txt: added Disallow rules for /ui-snippets/mycode/?id=, /freelance-dashboard/?p=, /mini-kanban/?p=

## 2026-06-11 — SEO audit and fixes for 10 new snippets; emoji fix in RightPanel

- Added 7 missing SVG icon cases to SeoSection (ART, ANIM, GAME, DATA, TABLE, DASH, TOOL) — previously these fell through to raw text rendering
- Fixed 3 descriptions below 140-char minimum: physics-balls (127→143), split-flap-display (138→146), text-particles (138→144)
- Added 2 interlinks to virtual-scroll useCase text (was 1 link, now 4 — meets 3–6 rule)
- Fixed corrupted emoji mojibake in RightPanel tooltip text: ☕🍪🙌 were stored as Windows-1252 double-encoded bytes
- Fixed tooltip overflow: changed from right:0 to left:50%/translateX(-50%) centered positioning
- Updated all 185+ counts in ui-snippets/page.js to 195+
- Added count badge (195) and "Copy. Paste. Ship." tagline to UI Snippets header
- Fixed speech-to-text button toggle bug (childNodes[1] targeted dot span instead of text node)
- Split-flap display: fixed doubled-character visual bug (static bot now stays at prevC during animation)
- Split-flap display: fixed half-clipping (font-size 44px→72px, align-items corrected on all four halves)

## 2026-06-11 — 10 new high-quality UI snippets with full SEO blocks

Added 10 new snippets to the UI Snippets library (185 → 195 total), each with complete HTML/CSS/JS implementation and full seo: blocks (1200+ word technical about, 6 howToUse steps, 10 features, 6 useCases, 5 FAQs):

- **drawing-canvas** — Canvas drawing board: Pointer Events, brush/eraser/line/fill tools, undo stack (toDataURL snapshots), download PNG
- **physics-balls** — Canvas physics: gravity, wall bounce, elastic ball-to-ball collision (mass = r²), trail effect, sliders
- **split-flap-display** — Airport Solari board: CSS 3D rotateX animation per character cell, CHARSET cycling, staggered columns
- **color-wheel-picker** — HSL color wheel: Canvas hue ring (360 arc segments) + saturation/brightness square, HSL↔RGB math
- **speech-to-text** — Web Speech API: continuous transcription, interim/final results, 8 languages, auto-restart, waveform animation
- **image-filter-editor** — CSS filter sliders: FileReader upload, 8 filters, ctx.filter canvas download, random filter, live CSS output
- **pattern-lock** — Android pattern lock: Canvas pointer drag, 9-dot grid, attempt counter + lockout, Change PIN mode
- **radar-chart** — SVG spider chart: polar↔Cartesian, stroke-dasharray animation, dual datasets, draggable vertex adjustment
- **text-particles** — Canvas text particles: offscreen getImageData sampling, spring physics (FORM), gravity explosion (EXPLODE)
- **virtual-scroll** — Virtual list: 10,000 items, only visible rows rendered, absolute positioning, search + sort

Also: fixed preview iframe `sandbox="allow-scripts allow-forms"` so form submit events fire in embedded previews.

---

## 2026-06-11 — Full SEO blocks for all 10 noindex UI snippets + layout and sticky ad fixes

Wrote complete `seo:` blocks (1200+ word deep-dive about.description, 5–6 howToUse steps, 8–10 features, 6 useCases with SVG icons, 5 FAQs) for all 10 previously-noindex snippets: gauge-chart, activity-heatmap, ai-chat-interface, bar-chart, date-range-picker, glassmorphism-login, infinite-scroll, onboarding-tour, spin-wheel, swipe-cards. Removed `noindex: true` from all 10 files.

Added `topExtra` prop to `SeoSection` to render screenshot + source code above the Features section instead of inside About. Changed `aboutExtra` → `topExtra` in the snippet detail page.

Fixed `position: sticky` on the 300×600 ad column: changed `overflow-x: hidden` to `overflow-x: clip` in `globals.css`. The `hidden` value made `body` a scroll container (breaking all sticky descendants); `clip` clips without creating a scroll container.

Fixed build error in `infinite-scroll.js`: unescaped triple backticks inside the template literal were terminating the string — removed the code fence markers.

---

## 2026-06-10 — SEO audit and content expansion for all 10 new UI snippets

Completed a full SEO audit and content rewrite pass across all 10 new snippets (swipe-cards, activity-heatmap, spin-wheel, infinite-scroll, bar-chart, ai-chat-interface, gauge-chart, date-range-picker, glassmorphism-login, onboarding-tour). All 10 now exceed 1200 words in their SEO sections.

**Fixes applied:**
- Fixed UTF-8 double-encoding corruption (em-dashes, curly quotes) in color-theme-switcher.js (56 fixes), gdpr-consent-manager.js (37), image-cropper.js (28), phone-input.js (10), rich-text-editor.js (33), time-picker.js (17), and activity-heatmap.js (16). Added right-double-quote (U+201D, C2 9D pattern) to fix_chars.py.
- Trimmed all 10 meta descriptions to 140-160 chars (were 102-249 chars).
- Fixed SEO titles: infinite-scroll shortened to 50 chars; ai-chat-interface changed to "ChatGPT-Style AI Chat UI — Vanilla JavaScript".
- Fixed bar-chart howToUse step 5 (referenced non-existent BAR_COLOR constant → correct CSS .bar-rect fill).
- Fixed unescaped apostrophes in spin-wheel classroom use case and infinite-scroll end-of-feed step that caused build errors.
- Added 3 interlinks: activity-heatmap CMS use case → rich-text-editor; spin-wheel classroom → countdown-timer, marketing → confetti-button, game → bar-chart; ai-chat-interface knowledge base → date-range-picker, portfolio → glassmorphism-login.
- Improved howToUse step quality: activity-heatmap step 1 explains grid structure; infinite-scroll steps 3-4 describe cards and end-of-feed; onboarding-tour steps describe overlay spotlight and tooltip.
- Added 5th FAQ to all 10 snippets covering practical integration patterns.
- Expanded `about` text for all 10 snippets with technical walkthrough sections (GPU compositing, event normalization, animation algorithms, etc.).

**Final word counts:** swipe-cards 1217, activity-heatmap 1200, spin-wheel 1278, infinite-scroll 1216, bar-chart 1216, ai-chat-interface 1263, gauge-chart 1250, date-range-picker 1342, glassmorphism-login 1322, onboarding-tour 1301.

---

## 2026-06-10 — Added ai-chat-interface UI snippet

Added `src/components/UiSnippetsTool/snippets/ai-chat-interface.js` — a polished ChatGPT/Claude-style AI chat interface built with pure HTML, CSS, and vanilla JavaScript. Features: two-panel layout (dark sidebar + light main area); sidebar with 4 sample conversation history items, new-chat button, and user avatar row; chat header with clickable model-name selector cycling between Claude 3.5, GPT-4o, and Gemini 1.5 Pro; pre-loaded conversation about async/await with alternating user (right-aligned indigo bubble) and assistant (left-aligned white card + robot avatar) messages; typing indicator (three bouncing dots via staggered CSS animation); 4 suggested-prompt chips shown on empty chat that pre-fill the textarea; auto-growing textarea (scrollHeight technique, max 160px); Enter to send / Shift+Enter for newline keyboard behavior; 5 cycling canned AI-style responses covering async/await error handling, Python sorting, CSS Grid vs Flexbox, SQL JOINs, and code refactoring; smooth scroll-to-bottom on every new message; all interactivity via addEventListener (zero inline onclick). Registered import and array entry in `snippets.js`. Full about object: rich description (~900 words across 7 paragraphs), 6 howToUse steps, 7 features, 5 use cases, 4 FAQs.

---

## 2026-06-10 — Added activity-heatmap UI snippet

Added `src/components/UiSnippetsTool/snippets/activity-heatmap.js` — a GitHub-style contribution heatmap built with pure HTML divs, CSS grid, and vanilla JavaScript (no canvas, no SVG, no library). Features: a 52×7 grid where each column is one week (Sunday–Saturday rows), CSS `grid-auto-flow: column` with `repeat(7, 12px)` rows so weeks are added as auto columns; a five-tier indigo color scale (0=#eee, 1=#c7d2fe, 2=#818cf8, 3=#6366f1, 4=#4338ca) derived from quartile binning of raw counts; month labels absolutely positioned above the first column where a new month starts (computed in a single O(52) pass); day-of-week labels (Sun/Tue/Thu/Sat) on the left side using a separate flex column; a fixed-position tooltip following the mouse showing "N contributions on Mon DD, YYYY" via `mousemove`/`mouseleave` addEventListener (no inline onclick); and a Less/More swatch legend below the grid. The heatmap-scroll wrapper enables horizontal scrolling on small screens for responsiveness. Registered import and array entry in `snippets.js`. Full SEO object: rich about description (~900 words across 7 paragraphs covering data model, grid layout, month label algorithm, hover tooltip, legend, and customization), 5 howToUse steps, 7 feature cards, 5 use cases with interlinking (stats-card, line-chart-widget, leaderboard-table), 4 FAQs.

## 2026-06-10 — Added date-range-picker UI snippet

Added `src/components/UiSnippetsTool/snippets/date-range-picker.js` — a fully functional two-panel date range picker in vanilla HTML/CSS/JS with zero dependencies. Features: two side-by-side month panels in a CSS grid layout (stacks vertically on mobile via media query), two-phase click selection (first click anchors start, second locks end with auto-swap if needed), live hover preview that recalculates the indigo range fill on every mouseover before the end date is committed, Apply button that prevents accidental close on the second click, Today shortcut, Clear button, and outside-click detection via `e.composedPath().includes(wrap)` for reliable detection even when render() rebuilds the DOM between click and bubble. Range highlighting uses layered pseudo-elements: `::before` for the light indigo strip fill with rounded caps at start/end, `::after` for the filled indigo circle on the endpoint days. Responsive: min-width 560px on desktop, stacks to single column with 100vw panel width on screens ≤600px. Registered import and array entry in `snippets.js`. Full `about` SEO object: title, description, ~900-word about prose (7 paragraphs), 7 howToUse steps, 7 features, 5 use cases with interlinking, 5 FAQs.

## 2026-06-09 — Added gdpr-consent-manager UI snippet

Added `src/components/UiSnippetsTool/snippets/gdpr-consent-manager.js` — a complete GDPR-compliant cookie consent manager in vanilla HTML/CSS/JS. Features a slide-up dark banner (bottom fixed, cubic-bezier spring animation) with Accept All, Reject All, and Manage Preferences actions; a preferences modal (backdrop blur overlay, scale entry animation, ESC close) with four consent category toggles (Necessary always-on, Analytics, Marketing, Functional) built in pure CSS; localStorage persistence via `saveConsent()`/`getConsent()` helpers; and a floating "Cookie Settings" FAB that appears after consent is saved so users can revisit preferences at any time. Registered import and array entry in `snippets.js` (placed after `cookieBanner`). Full SEO object: rich about description (5 paragraphs covering GDPR/ePrivacy requirements, consent categories, and technical implementation), 6 how-to-use steps, 8 features, 6 use-case cards with SVG-compatible icons, 4 FAQs. Targets "GDPR cookie consent manager html css js", "cookie consent banner javascript", "GDPR compliant cookie banner snippet".

## 2026-06-09 — Added phone-input UI snippet

Added `src/components/UiSnippetsTool/snippets/phone-input.js` — a full-featured phone number input with a flag + dial code country selector (20+ countries), searchable dropdown, per-country auto-format mask, length-based validation indicator (✅/❌), live international number preview, and a copy-to-clipboard button. Registered the import and array entry in `snippets.js`. Full SEO object included: rich about description (5 paragraphs), 6 how-to-use steps, 8 features, 6 use-case cards, 4 FAQs targeting "phone number input html css js" / "international phone input component" / "country code selector javascript".

## 2026-06-07 — 10 new UI snippets added (nofollow/test status)

Added 10 new entries to `src/components/UiSnippetsTool/snippets/` and registered them in `snippets.js`. All marked `noindex: true` (nofollow/test status, matching the pattern `scroll-pin-story` started with) — no `seo` objects yet, OG previews captured via `node scripts/capture-snippet-previews.mjs`.

**New snippets:**
- `scratch-card-reveal` (animations) — canvas scratch-to-reveal coupon card using `destination-out` compositing + pixel-ratio threshold detection
- `signature-pad` (forms) — canvas signing surface with quadratic-curve stroke smoothing, ink colour swatches, undo stack, PNG download
- `qr-code-generator` (forms) — live QR code from text/URL via the `qrcode` CDN library, colour controls, PNG download (uses `cdnUrls`)
- `audio-waveform-visualizer` (animations) — canvas bar visualizer driven by layered sine waves + `requestAnimationFrame`, play/pause, no audio file needed
- `sticky-cart-drawer` (layouts) — slide-in mini-cart with quantity steppers, live subtotal recalculation, item-count badge
- `scroll-spy-nav` (navigation) — sticky sidebar nav that highlights the active section via `IntersectionObserver` with a sliding indicator pill
- `theme-palette-generator` (forms) — pick a base colour, generate a 9-step tint/shade ramp via HSL lightness interpolation, click-to-copy hex
- `drag-resize-panels` (layouts) — pointer-driven divider resizing two panes with min-width clamping and a live percentage readout
- `markdown-live-preview` (forms) — split editor rendering headings/bold/italic/links/lists/code into HTML via a small regex-based parser (no library)
- `confetti-celebration-card` (cards) — milestone card bursting a canvas particle shower with gravity/rotation on click

`scripts/capture-snippet-previews.mjs` was extended last session to support `cdnUrls` in `buildSrcdoc` — used here for `qr-code-generator`'s CDN-loaded `qrcode` library.

## 2026-06-06 — Shared GistSyncButton component: all tools unified

Created `src/components/GistSyncButton/index.js` — a single shared React component (with matching `styles.module.css`) that encapsulates all GitHub Gist sync logic. Migrated all 11 tools that previously had inline Gist sync code.

**What the component provides:**
- Full popover UI (GitHub token, Gist ID, AES-GCM passphrase with show/hide toggle, Save + Sync Now buttons, last-synced time, status messages)
- AES-256-GCM encryption via Web Crypto API (PBKDF2 key derivation, random salt + IV per push)
- Debounced force push (10 s) after every user action via `ref.forcePush()`
- Silent sync on mount; resume sync after ≥60 s hidden (standby/tab absence)
- Timestamp comparison to decide pull-vs-push direction
- Passphrase change → immediate re-encrypt + push

**Shared localStorage keys** (one value for all tools):
- `fwd_gist_token` — GitHub personal access token
- `fwd_gist_enc_key` — AES-GCM passphrase

**Per-tool localStorage key**: `{toolKey}_gist_id` (e.g. `tt_gist_id`, `bk_gist_id`, …)

**Tools migrated** (old inline sync code removed, `<GistSyncButton>` added):
TimeTrackerTool (`tt`), BookmarkKeeperTool (`bk`), BrowserNotepadTool (`bn`), DailyDiaryTool (`dd`), MindMapTool (`mm`), UiSnippetsTool (`us`), ApiRequestGeneratorTool (`ar`), FreelancerLocalTools (`fl`), FreelanceInvoiceGenerator (`fi`), ResumeBuilder (`rb`), SvgMotionStudioTool (`sm`)

---

## 2026-06-06 — Freelance Dashboard: active timer in Freelance Hub

- Freelance Hub now reads `ttData.active` from the Time Tracker IDB (`fwd_time_tracker_db / v1`).
- When a timer is running, the Hub auto-switches to the ⏱ Time tab on load, a pulsing red dot appears on the tab button, and a full-width green card shows the live elapsed time (ticking every second via `setInterval`) with client · project · task as subtitle.
- Added `fmtElapsed(ms)` helper for `H:MM:SS` / `M:SS` display.
- CSS: `.hubCardTimer` (full-width green border card), `.hubTimerDot` (tab badge), `.hubTimerPulse` (card inline dot) with `hubDotPulse` keyframe animation.

## 2026-06-06 — Freelance Dashboard: resume sync + force-push on passphrase change

- `saveGistSettings` is now async: detects when the encryption passphrase changed and immediately re-encrypts + force-pushes to the Gist with the new key (shows "Re-encrypted and pushed 🔒" or "Encryption removed — pushed").
- Added `hiddenSinceRef` to track when the tab was hidden. The `visibilitychange` handler now triggers a silent Gist sync when the tab becomes visible again **after ≥ 60 seconds hidden** — covers waking from standby/hibernation and long tab absences where edits may have been made on another device. Shorter absences (quick tab switches) are ignored.

## 2026-06-06 — Freelance Dashboard: AES-GCM Gist encryption

- Added `aesGcmDeriveKey` (PBKDF2, 200k iterations, SHA-256), `aesGcmEncrypt`, and `aesGcmDecrypt` helpers using the browser's `crypto.subtle` Web Crypto API.
- `fdGistPush` now accepts an optional `encPassphrase`; if set it encrypts the payload to `{ encrypted: true, salt, iv, ciphertext }` (all base64) before writing to the Gist file.
- `fdGistFetch` detects `encrypted: true` in the Gist file and decrypts with the passphrase; throws a user-friendly error if the Gist is encrypted but no passphrase is provided.
- Added `FD_LS_ENC_KEY` localStorage key (`fd_gist_enc_key`), `gistEncKey` / `encKeyInput` / `showEncKey` state, and persists the passphrase alongside token/Gist ID on save.
- Passphrase field added to the GitHub Gist sync settings popover with show/hide toggle, an "unsaved changes" hint, and a green "🔒 Gist is encrypted" badge when active.
- All sync code paths (`syncNow`, `doPushNow`, silent mount sync) thread the enc key through; the lock icon `🔒` appended to sync status messages when encryption is active.
- Backward compatible: Gists without encryption are read as plain JSON; leaving the passphrase blank disables encryption.

---

## 2026-06-05 — Fixed drawer snippet: clicking button blanked the screen

- `open` and `close` are built-in `window` methods. Inline `onclick="open('left')"` called `window.open('left')` — navigating the iframe to URL "left", blanking the screen. Renamed to `openDrawer` / `closeDrawer`.
- All inline `onclick` handlers (`open('left')`, `open('right')`, `close()`) also fail in the sandboxed iframe (no `allow-same-origin`). Removed all inline handlers; replaced with `id` attributes and `addEventListener` calls in JS.

---

## 2026-06-05 — Fixed editable-table snippet: SyntaxError and addRow not defined

- `alert(... '\n\n' ...)` in the `js` template literal had `\n\n` resolving to literal 0x0a bytes, embedding raw newlines inside a string literal in the srcdoc `<script>` tag → SyntaxError at line 116. Fixed: `\\n\\n` so template produces `\n` in output JS.
- `onclick="addRow()"` and `onclick="saveData()"` on buttons in the HTML template were inline handlers — these fail in the sandboxed iframe (no `allow-same-origin`). Replaced with `id` attributes and `addEventListener` calls at the end of the JS block.

---

## 2026-06-05 — Fixed split-text snippet: SyntaxError broke all animations

- Regex `/[ \t\n\r]+/` inside the `js` template literal had `\t\n\r` as escape sequences — these resolve to literal bytes 0x09/0x0a/0x0d when the template is evaluated, embedding a literal newline inside a regex literal in the srcdoc `<script>` tag. JavaScript regex literals cannot contain unescaped line terminators — SyntaxError killed the entire script block silently.
- Fixed in both `split-text.html` and `split-text.js` by replacing with `/\s+/`.
- Also fixed: `scramble()` cancel function was discarded on replay — rapid re-clicks stacked multiple RAF loops fighting over the same element. Now tracked via `cancelScramble` and cancelled before each replay.

---

## 2026-06-05 — Fixed toast-queue and scroll-to-top snippet bugs

- toast-queue: close button onclick `dismiss(this.closest('.toast'))` — single quotes inside single-quoted string inside template literal broke the selector. Fixed with `&#39;` HTML entity.
- scroll-to-top: button click did nothing — `onclick="scrollTop()"` shadowed by `HTMLElement.scrollTop` (a number property) in inline handler scope chain. Renamed to `scrollToTop`.
- scroll-to-top: button jumped instead of smooth scrolling — `overflow-x: hidden` on body makes browser use body as scroll container, where `window.scrollTo({ behavior: 'smooth' })` is ignored. Replaced with a manual cubic ease-out RAF animation that sets scrollTop on all three containers (window, documentElement, body).

---

## 2026-06-05 — Fixed upload-progress snippet click bugs

- Fixed dropzone click doing nothing: `<input type="file">` was nested inside the dropzone div; `input.click()` bubbled back up → infinite recursion → browser killed it. Moved input outside the dropzone as a sibling.
- Fixed remove button onclick not passing the file ID: `\'` in a template literal resolves to `'` before srcdoc embedding, producing `removeItem('')` with no ID. Changed to `&#39;` HTML entity which survives template literal embedding and decodes correctly in the browser.
- Applied same `\'` → `\'' + id + '\''` quote fix to `blog/upload-progress.html` standalone file.

---

## 2026-06-05 — SEO keyword improvements across 12 freelance tools

- Added competitor alternative terms to keywords across 12 tool pages: local-invoice-tracker, time-tracker, proposal-builder, client-crm, freelance-invoice-generator, follow-up-reminder-board, scope-creep-tracker, milestone-payment-tracker, client-portal-lite, freelance-availability-planner, contract-template-manager, client-intake-form-builder
- Added conversion-focused "free alternative to X" FAQs targeting: Wave/FreshBooks, Toggl/Harvest, Proposify/Better Proposals, HubSpot/Pipedrive, Invoice Ninja/Zoho Invoice, HoneyBook/Dubsado, Google Forms/Typeform, Asana/Basecamp
- Added feature bullets highlighting no-subscription, no-login value proposition vs. paid SaaS alternatives
- Updated title tag on local-invoice-tracker (removed "IndexedDB") and client-portal-lite (more generic/searchable)
- Added follow-up board about-section paragraph addressing the income-loss-from-forgotten-follow-ups angle

---

## 2026-06-05 — Migrated Time Tracker, Freelance Invoice Generator, and Resume Builder from localStorage to IndexedDB

- Replaced all main data reads/writes with IndexedDB (`indexedDB.open`) in three components
- Each tool gets its own named database: `fwd_time_tracker_db`, `fwd_invoice_generator_db`, `fwd_resume_builder_db` — all using an object store named `data` and key `v1`
- Added `openDb()`, `idbGet(key)`, and `idbPut(key, value)` helper functions to each component
- Implemented one-time migration on first load: if IDB is empty but the old localStorage key exists, data is read from localStorage, written to IDB, and the localStorage key is deleted — existing users lose no data
- Gist token/ID keys remain in localStorage as before (small config strings, not the main data payload)
- ResumeBuilder `syncNow` now reads the data payload from IDB instead of localStorage
- FreelanceInvoiceGenerator `readStorage` is now async and handles v1→v2 migration path via IDB
- Updated SEO page.js for all three tools: replaced "localStorage" with "IndexedDB" across about text, feature bullets, FAQ answers, and schema featureLists; added note that IndexedDB has no 5 MB storage cap

---

## 2026-06-05 — Freelance Dashboard: added Freelance Hub cross-tool summary panel

- Added tabbed "📊 Freelance Hub" widget in the left sidebar, placed between Monthly Progress and What I Did Today
- 3 tabs: Finance (unpaid invoices + retainer MRR), Pipeline (overdue follow-ups + open proposals), Time (hours this month + weekly load)
- Reads data on mount from: local-invoice-tracker, retainer-tracker, follow-up-reminder-board, proposal-builder, freelance-availability-planner (all via freelancer_local_tools_db IDB), and time-tracker (localStorage)
- Each metric card links to the relevant tool; overdue/overloaded cards highlight in red
- All reads are one-time on mount, read-only — no writes to other tools' data

## 2026-06-05 — All Gist-sync tools: added GitHub Gist privacy warning across 22 tools

- Added howToUse step "Keep your Gist private — never share the URL" and FAQ "Is GitHub Gist truly private?" to all 22 tools that use GitHub Gist sync
- Warning covers: Gists are unlisted not encrypted; anyone with the URL or ID can read contents; never share Gist URL, Gist ID, or token; avoid sensitive data; use export/import instead for truly private use
- Tools updated: freelance-dashboard, mini-kanban (via FreelancerLocalTools), bookmark-keeper, api-request-generator-tester, ui-snippets, time-tracker, resume-builder, freelance-invoice-generator, client-crm, client-intake-form-builder, client-portal-lite, contract-template-manager, freelance-availability-planner, freelance-expense-tracker, follow-up-reminder-board, local-invoice-tracker, milestone-payment-tracker, retainer-tracker, scope-creep-tracker, daily-diary, notepad, mind-map, svg-motion-studio

## 2026-06-05 — Freelance Dashboard: SEO optimisation for low-competition keywords

- Rewrote all SEO content (title, description, keywords, about, howToUse, features, useCases, FAQs, softwareSchema) to lead with the no-login/no-account/browser-only angle
- Targeted low-competition long-tail terms: "freelance dashboard no login", "kanban board no account", "github gist sync kanban", "sync kanban across devices", "private freelance workspace browser"
- About section rewritten from search-intent perspective (pain: tired of SaaS signups) rather than feature list
- Added explicit comparison FAQ ("How is this different from Notion/Trello?") to capture alternative/comparison searches
- Features list now leads with the privacy/no-account differentiator rather than burying it at the end
- Use cases rewritten around the "no account" hook in each card title and description
- softwareSchema description updated to match new positioning

---

## 2026-06-03 — API Request Generator & Tester: Postman-style layout + GitHub Gist sync

### Layout redesign (Postman-style)
- Left sidebar now holds **Collections** (top) and **History** (bottom) — always visible, no modal
- Request tabs (Params / Headers / Body / Auth / Env / Settings) moved to top of right panel
- Left panel width reduced to 220px; right panel flex-grows to fill remaining space

### GitHub Gist sync
- Added GitHub Gist backup and sync for collections + history
- GitHub icon button in toolbar opens settings popover (token + Gist ID inputs)
- **Auto-sync**: triggers 5 seconds after any collection or history change (debounced)
- **Manual sync**: dedicated Sync button with spinning icon while active
- Gist format: `{ collections, history, deletedCols, deletedReqs, historyClearedAt }` — all sync metadata in one private Gist file (`fwd-api-tester.json`)
- Gist ID auto-populated in input after first sync (fixes blank input bug)
- `saveGistSettings` preserves existing Gist ID if input left empty

### Deletion sync
- Deleted collections tracked with `{ colId: isoTimestamp }` in localStorage (`api_deleted_cols`)
- Deleted requests tracked with `{ reqId: isoTimestamp }` in localStorage (`api_deleted_reqs`)
- History clears tracked with `historyClearedAt` timestamp — propagates to all synced browsers
- Merge logic: union of local + remote deleted maps; filtered items removed from IDB and state

### IndexedDB storage
- Collections and history migrated from localStorage to IndexedDB (`fwd-api-tester` DB)
- 600ms debounce on all IDB writes to batch rapid state changes
- `pushLocal` (auto-sync) and `syncNow` (manual) are separate code paths

### History sync fix
- History was previously local-only in sync — now merged from local + remote
- Dedup by `method|url`, keeps most recent `savedAt`, capped at 30 entries
- Cleared history timestamps propagate via `historyClearedAt` in Gist — deleted history never returns

### SEO page update (`/api-request-generator-tester/`)
- Rewrote title, description, keywords to reflect new features
- Updated about section: Postman-style sidebar, GitHub Gist sync, IndexedDB, deletion propagation
- New FAQ: "How do I save API requests and sync across devices?", "How does GitHub Gist sync work?"
- Updated features list, HowTo schema steps, callout, and Postman-alternative section
- Correctly references corsproxy.io (server-side proxy was discarded)

---

## 2026-06-02 — TypeScript Playground: 41 lessons + SEO overhaul

### Lessons expanded (32 → 41)
- Added: Intersection Types, Class Inheritance (`extends`), Implements, Abstract Classes, Discriminated Unions, `as const`, Template Literal Types, `infer` keyword, Typed Error Handling (Result pattern)
- Fixed Typed Error Handling lesson: multi-line union type declaration broke the type stripper; rewrote as single-line types using commas; removed `as const` (stripper ate trailing comma content)

### SEO overhaul (`/typescript-playground/`)
- Title: "Free TypeScript Playground — 41 Lessons, No Install | FWD Tools"
- Lesson table (all 10 chapters with levels), 7 in-depth about sections
- 15 FAQs: interface vs type, generics, discriminated unions, `as const`, `infer`, error handling, `unknown` vs `any`, type narrowing, React+TypeScript, strict mode, utility types
- Added "Main Purpose of TypeScript — Why It's Used" section (static type checking, 5 key benefits)

### Active lesson scroll on reload
- `lessonListRef` + `data-active` attribute on active button
- Scrolls lesson into center of panel on hydration only (not on clicks)
- Uses `list.scrollTop` calculation (no page scroll)

### Console panel
- Always-visible collapsible console bar below preview pane (collapsed by default)
- Click header to expand; badge shows log count; chevron rotates
- Matches React/JS/jQuery/Vue/Angular playground pattern

---

## 2026-06-01 — React Playground: "Main Purpose of React" section + collapsible console

### React Playground SEO
- Added "The Main Purpose of React — Why It's Used" section before Hooks Guide
- Core Technical Pillars: Component-Based Architecture, Declarative UI Model, Virtual DOM, Unidirectional Data Flow
- Key Benefits: Code Reusability, High Performance, Target Flexibility (React Native)

### Collapsible console panel
- React, TypeScript, JavaScript, jQuery, Vue, Angular, GSAP playgrounds all updated
- Console bar always visible at bottom of preview pane, collapsed by default
- Click to expand; badge shows log count; chevron animates
- GSAP playground: added `console.log` forwarding from iframe + CSS classes

---

## 2026-05-30 - UI Snippets SEO: Expanded about, howToUse, useCases, FAQs on Batch A (10 snippets)

Rewrote and significantly expanded the `seo` objects in 10 snippet files to pass the thin-content audit. Updated files: `404-page`, `analog-clock`, `article-card`, `bottom-nav`, `breathing-animation`, `color-picker-input`, `context-menu`, `cookie-banner`, `copy-button`, `credit-card-input`. For each file: expanded `about.description` to 400+ words with technical explanation of the HTML/CSS/JS implementation; rewrote all 6 `howToUse` step `text` fields to 100+ characters; expanded all 6 `useCases[].desc` fields to 150+ characters; rewrote all 4 `faqs[].a` answers to 270+ characters with technical depth. Also fixed `analog-clock` to reflect `requestAnimationFrame` usage rather than `setInterval`.

---

## 2026-05-30 - UI Snippets: Maximize preview button in preview header

Added **Expand / Restore** toggle button to the preview header bar (left of "Copy all"). Click **Expand** to collapse both the sidebar and the code editor panels simultaneously, giving the preview iframe the full tool width. The button shows a compress icon and **Restore** label when maximized. Click **Restore** to bring both panels back. Implemented as `isMaximized` useState + `toggleMaximize()` function in `UiSnippetsTool/index.js`. Button uses existing `s.iconBtn` + `s.iconBtnActive` classes; two SVG icons switch between expand-arrows and compress-arrows.

## 2026-05-30 - UI Snippets snippets: All 129 pass SEO audit (about 350w+, 6 UCs, 4 FAQs each)

Fixed SEO content for all 129 snippet files. Three passes: Tier 1 (30 snippets with no UCs/FAQs — added full content), Tier 2 (5 snippets under 200w), Tier 3 (47 snippets 200-350w — all expanded). Also fixed svg-progress-ring double-quote string to template literal, range-slider template literal insertion bug, coming-soon-hero text/desc key typo. Final result: 129/129 PASS.

## 2026-05-30 - UI Snippets: Pre-deploy SEO cleanup

Updated all stale "90+ snippets / 6 categories" references to "129+ snippets / 12 categories" across root page.js, [slug]/page.js generic description, and features list. Fixed all 8 category subtitles in CATEGORY_CONTENT (modals/tables/loaders/pricing/heroes had wrong counts; navigation/animations/dashboards were missing subtitles entirely). All 12 CATEGORY_CONTENT entries now have accurate subtitles reflecting current snippet counts.

## 2026-05-30 - UI Snippets: All 12 categories reach 9+ snippets — 129 total

Created 18 new snippets to bring every category from 6 to 9+: **Dashboards** — line-chart-widget (SVG path generation from data arrays, mousemove tooltip, period tabs), todo-widget (add/toggle/delete, progress bar, filter tabs), calendar-widget (monthly grid generation, event dots, upcoming panel). **Heroes** — coming-soon-hero (countdown timer, email capture), minimal-hero (inline nav, kicker, proof stats), video-bg-hero (CSS blob animation, play button, fullscreen video modal). **Modals** — alert-banner (5 semantic variants, slide-in/out animations), drawer (left nav + right settings, CSS toggle switches), popover (3 positions + arrows, action menu + info + shortcuts). **Loaders** — countdown-timer (SVG ring dashoffset, Pomodoro modes, session dots), loading-overlay (spinner/dots/progress variants, backdrop-filter), upload-progress (drag-and-drop, per-file bars, overall summary). **Tables** — pagination-table (smart page range with ellipsis, per-page selector), editable-table (transparent inline inputs, add/delete/save), gantt-table (CSS grid, horizontal bars with left/width%, month gridlines). **Pricing** — enterprise-pricing (Pro vs custom card, logo strip, inline FAQ), trial-countdown (days remaining calc, progress bar, limit card), money-back-guarantee (shield SVG, trust chips, badges, guarantee reviews). All 18 pass SEO audit: 350+ words about, all UCs 150+, all FAQs 270+, all steps 100+.

## 2026-05-30 - SeoSection: Feature card grid + quick facts strip

Changed **FeaturesSection** from a plain `<ul>` bullet list to a **2-column card grid** (`featGrid`). Each card (`featCard`) has a small accent-coloured check icon and parses feature strings at the first colon to bold the key part (e.g. "Live search: description" → **Live search:** description). Applies to all tools automatically — no data changes needed. Added **quick facts strip** (`quickFacts`) above the about text for all tools: 4 pill badges — "Runs in your browser", "No install or signup", "Free forever", "No data uploaded" — shown only when section label is "About this tool". Both components use existing CSS variables (--accent, --border, --surface, --text2) and respect dark mode.

## 2026-05-30 - UI Snippets: Fill all categories to 6+ snippets — 8 new snippets (111 total)

Audited all categories for snippet count. Five categories were under 6: loaders (4), modals (4), tables (4), dashboards (5), pricing (5). Created 8 new snippets to bring all to exactly 6: **dots-loader** (bounce/pulse/wave/spinner variants + button loading state, pure CSS keyframes), **progress-bar** (determinate/striped/gradient/indeterminate variants + multi-step upload simulation), **image-lightbox** (thumbnail grid, fullscreen overlay, prev/next nav, keyboard arrow+ESC, click-outside close), **bottom-sheet** (slide-up panel, cubic-bezier spring animation, backdrop, share actions + filter chips variants), **expandable-table** (rows toggle nested detail table, chevron rotation, accordion single-open), **leaderboard-table** (gold/silver/bronze medal badges, progress bars per user, rank change indicators, period tabs), **activity-feed** (vertical spine timeline, 3 event types with icons, comment bubble, filter tabs), **pricing-faq** (max-height accordion, +→× rotation, aria-expanded, 7 billing questions, CTA block). All 8 pass SEO audit: about 350–415 words, all UCs 150+ chars, all FAQs 270+ chars.

## 2026-05-30 - UI Snippets: Heroes category — 6 new hero section snippets

Added **Heroes** as the 12th snippet category (103 total snippets). Created 6 new snippet files: **startup-hero** (dark gradient bg, ambient glow orbs, pulsing badge, gradient headline, dual CTA, avatar social proof, trusted-by strip), **product-hero** (light bg, email capture form with JS success feedback, browser chrome mockup with CSS app UI placeholder, italic gradient headline), **gradient-mesh-hero** (3 animated CSS blur blobs, shimmer gradient text, word swap cycling via setInterval, scroll indicator), **app-hero** (two-column layout, CSS phone frame with full app UI, Apple App Store + Google Play SVG badges, star rating row), **portfolio-hero** (pulsing status dot, gradient avatar, open-to-work badge, skill tags, stats row, 4 social icon links with inline SVG), **agency-hero** (3-column editorial layout, clamp() serif headline with italic accent, service list cycling, CSS marquee ticker, client strip). All 6 snippets pass SEO audit: about 379–420 words, all UCs 150+ chars, all FAQs 270+ chars, all steps 100+ chars. Category SEO content (CATEGORY_SEO + CATEGORY_CONTENT.heroes) added to page.js. Heroes registered in CATEGORY_IDS, CATEGORIES, and SNIPPETS arrays.

## 2026-05-29 - UI Snippets: Full category SEO rewrite — all 11 categories pass audit

Audited all 11 CATEGORY_CONTENT entries in ui-snippets/[slug]/page.js. Every category failed: about descriptions 100–208w (need 350+), UC descs under 150 chars, FAQ answers under 270 chars. Rewrote all 11 categories — buttons, forms, cards, navigation, modals, tables, loaders, animations, layouts, dashboards, and pricing. All now pass: about 350–511 words, all UC descs 150+ chars, all FAQ answers 270+ chars. About sections now follow user-intent structure: open with the problem/search query, explain the implementation techniques with named CSS properties and JS functions, then customisation guidance. FAQs answer real integration questions (Stripe, React, accessibility, mobile responsiveness).

## 2026-05-29 - UI Snippets: SEO content audit + full rewrite for 7 snippets

Audited all new Pricing category snippets and 4 Table snippets for Google content quality. All had about descriptions under 200 words (target 400+), UC descs under 150 chars, FAQ answers under 270 chars, and several step texts under 100 chars. Rewrote SEO content for **pricing-page**, **usage-calculator**, **upgrade-banner**, **data-table**, **sortable-table**, **comparison-table**, and **schedule-table** — all now pass: about 350+ words, all UC descs 150+ chars, all FAQ answers 270+ chars, all step texts 100+ chars. Each about section explains the search-intent problem first, then the implementation techniques, then customisation guidance — matching how users actually search for these components.

## 2026-05-29 - UI Snippets: Pricing category + 3 new snippets + left panel fix

Added **Pricing** as the 11th snippet category. Created 3 new snippet files: `pricing-page.js` (3-tier SaaS pricing section with monthly/annual toggle and SVG check/cross icons), `usage-calculator.js` (3-slider metered pricing calculator with non-linear lookup arrays and live cost breakdown), `upgrade-banner.js` (gradient dismissible upgrade banner + paywall feature gate with CSS keyframes dismiss animation). Moved `pricing-card` (from cards) and `pricing-toggle` (from layouts) into the pricing category. Registered category in CATEGORY_IDS (layout.js), CATEGORY_SEO + CATEGORY_CONTENT (page.js), and CATEGORIES + SNIPPETS (snippets.js). All 3 new snippets include full SEO content (about, howToUse steps, 8 features, 6 use cases, 4 FAQs). Fixed left panel bug: sidebar `category` state now always initialises to `'all'` regardless of category URL — visiting `/ui-snippets/loaders/` no longer highlights Loaders chip or filters the sidebar list.

## 2026-05-29 - UI Snippets slug page: Tailwind CSS code block

Added `toTailwindComponent(sn)` to `ui-snippets/[slug]/page.js` (server component — imports `convert` from shared `@/lib/css-to-tailwind`). Builds className→Tailwind map from snippet CSS handling media-query breakpoint prefixes and pseudo-class variants, converts HTML class attributes to Tailwind className, outputs React component with no style tag. New "Tailwind CSS" code block with Copy button rendered after the "React / JSX" block in the source code section.

---

## 2026-05-29 - UI Snippets: Tailwind JSX export

Extracted CSS-to-Tailwind pure functions (PX_TO_TW, PCT_TO_TW, CSS_COLOR_MAP, toSpace, sp, colorClass, CONV, parseDeclarations, parseCss, convert) from CssToTailwindTool into shared `src/lib/css-to-tailwind.js`. Updated CssToTailwindTool to import from the shared lib. Added `exportTailwind()` to UiSnippetsTool: parses the snippet's CSS via `convert()`, builds a className→Tailwind map handling media-query breakpoint prefixes (sm:/md:/lg:) and pseudo-class variants (hover:/focus:/active:), converts HTML to JSX replacing class="" with Tailwind className="" using mapped classes (arbitrary values for colours/sizes), downloads as `[Name].tailwind.jsx`. "React Export" button renamed to "JSX", new "Tailwind" button added beside it.

---

## 2026-05-30 - UI Snippets: batch SEO content (user-stats-card through fireworks) — ALL 91 DONE

Final batch for 10 snippets: user-stats-card (DOM heatmap, SVG progress ring, follow toggle), segmented-control (offsetLeft pill, segId multi-instance, data-value binding), credit-card-input (4-digit grouping regex, masked preview, card type detection), dashboard-layout (flex app shell, fixed sidebar, stats grid, data table), masonry-grid (CSS columns property, break-inside:avoid, JS rendering), css-3d-cube (6 faces via rotateY/X+translateZ, preserve-3d, spin animation), matrix-rain (drops array, fade-trail rgba fillRect, Katakana char pool), analog-clock (60 tick marks via rotate, smooth hand offsets, setInterval), breathing-animation (pattern data objects, CSS scale animation, phase timer countdown), fireworks (rocket launch, polar coord particles, gravity physics, alpha fade). All 91 snippets now have unique SEO content with 6 use cases, 10 features, 6 FAQs each.

---

## 2026-05-30 - UI Snippets: batch SEO content (copy-button through article-card)

Full rewrites for 10 snippets: copy-button (Clipboard API, .copied feedback cycle, timeout reset), tag-input (Enter/comma add, duplicate check, backspace-last-remove, × onclick), color-picker-input (PRESETS swatches, hex input sync, native input type=color trigger), empty-state (centred flex column, emoji illustration, primary+ghost CTAs), 404-page (radial gradient, gradient text, history.back(), deployment patterns), wave-text (buildWave() character split, animation-delay stagger, hover re-trigger), stagger-list (setTimeout i*80ms stagger, .show opacity+translateX reveal), number-slot (translateY digit columns, spin animation, DIGITS config), side-drawer (translateX slide-in, overlay backdrop, ESC+click-outside close), article-card (flex wrap grid, category tag, hover lift, author row). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (cookie-banner through event-card)

Full rewrites for 10 snippets: cookie-banner (animationend cleanup, localStorage consent, slideUp/Down animations), glitch-text (::before/::after attr(data-text), clip-path rect slices, RGB channel offset), svg-progress-ring (CIRCUMFERENCE=2πr, stroke-dashoffset formula, rotate(-90deg), rAF count-up), liquid-blob (8-point SVG path, sin/cos noise per vertex, spline bezier, click amplitude toggle), custom-cursor (lerp rx+=(mx-rx)*0.12, position:fixed pointer-events:none, .hovering ring expansion), floating-particles (Canvas 2D, mouse repel force, connection lines alpha=1-dist/120, resize reinit), bottom-nav (data-page routing, switchPage active toggle, phone mockup, badge count), context-menu (contextmenu+preventDefault, viewport clamping, click-outside, ESC close, scale pop-in), social-post-card (optimistic toggleLike +1/-1, .following toggle, hashtag/mention styling), event-card (gradient header date badge, negative margin-left avatar stack, RSVP). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (spotlight through scroll-snap-gallery)

Full rewrites for 10 snippets: spotlight (getBoundingClientRect cursor follow, radial gradient orb, cursor:none, pointer-events:none), kanban-board (HTML5 drag API, dragstart/dragover/drop, .dragging opacity, updateCounts), accordion-faq (single-open toggle, max-height CSS transition, chevron rotate, initial open), animated-tabs (offsetLeft/offsetWidth sliding pill indicator, panel active class), product-card (swatch .active pattern, wishlist .liked toggle, Add to Cart feedback timeout), chat-ui (dynamic message append, outgoing/incoming bubbles, scrollTop auto-scroll, Enter key), password-strength (4-regex score, coloured bars, rules checklist, show/hide toggle), multi-step-form (cur variable, update() active/done dots, boundary guards, step validation pattern), image-comparison (clip-path:inset reveal, setPos clientX to pct, mouse+touch events), scroll-snap-gallery (scroll-snap-type mandatory, scroll-snap-align, offsetLeft dot nav, IntersectionObserver active dot). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (magnetic-button through aurora-bg)

Full rewrites for 10 snippets: magnetic-button (getBoundingClientRect vector math, strength factor, falloff, snap-back), neon-glow (box-shadow + text-shadow layers, transparent background, 4 colour variants, hover intensify), confetti-button (80 particles, polar coords, CSS custom properties --dx/--dy/--rot, animationend cleanup), file-dropzone (dragover/drop events, extColors map, click-to-browse, file size), pricing-toggle (price array swap, .annual knob slide, save badge, label highlight), vertical-timeline (::before gradient line, 3 node states, pulse animation, flex layout), typewriter (words array, tick() state machine, typing/erasing speeds, blink cursor), text-scramble (requestAnimationFrame iteration decode, 90-char pool, cancelAnimationFrame), 3d-card-tilt (rotX/Y from normalised offset, perspective context, glow follow, mouseleave reset), aurora-bg (radial-gradient orbs, mix-blend-mode screen, blur layers, drift animation). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (modal through music-player)

Full rewrites for 10 snippets: modal (backdrop-filter overlay, scale entry animation, 3 close mechanisms), gradient-text (background-clip: text, background-size 300%, shimmer keyframe), marquee (max-content flex track, translateX -50% loop, CSS mask edge fade, reverse variant), reveal-on-scroll (IntersectionObserver threshold 0.15, fade-up transition, obs.unobserve, stagger delay), dark-mode-toggle (.dark class pattern, CSS transitions, localStorage persist, CSS custom properties), count-up (requestAnimationFrame quartic ease-out, M/K auto-formatting, data-prefix/suffix, replay button), command-palette (Cmd+K shortcut, grouped commands, substring search, arrow key nav), notification-bell (unread badge, toggle dropdown, markAll, click-outside close), 3d-flip-card (preserve-3d, backface-visibility, rotateY 180deg, hover tilt), music-player (vinyl spin animation-play-state, play/pause SVG swap, track switching, simulated progress). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (stats-card through split-hero)

Full rewrites for 10 snippets: stats-card (IntersectionObserver trigger, requestAnimationFrame cubic ease-out, data-target, toLocaleString), gradient-border-card (::before inset:-1.5px trick, z-index:-1, overflow:hidden, borderAnim keyframe), testimonial-card (::before decorative quote mark, blockquote semantics, Georgia serif, star rendering, avatar gradient), badge-chips (rgba tinted badges, removable chips, pulse dot animation), social-buttons (OAuth layout, OR divider via ::before/::after flex:1, email fallback), star-rating (classList.toggle hover, selected variable, mouseleave restore, labels array), otp-input (auto-focus advance, paste-to-fill, backspace navigation, .filled highlight), range-slider (accent-color, ::-webkit-slider-thumb, live value format functions, opacity preview), bento-grid (grid-column:span 2 proportions, named cell classes, hover border, gradient accent cells), split-hero (1fr 1fr grid, clamp headline, terminal window with traffic-light dots, inline syntax colouring). Also added Shiki try-catch fallback for oversized code strings. All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: batch SEO content (ripple-button through stepper)

Full rewrites for 11 snippets: ripple-button (getBoundingClientRect origin, scale animation, animationend cleanup, outline variant), floating-label (placeholder=" " trick, ~ sibling combinator, DOM order requirement, autofill handling), toggle-switch (hidden checkbox, :checked combinator, knob travel formula, accessibility), search-box (:focus-within ring, classList.toggle filter, kbd badge, debounce pattern), hero-section (radial-gradient glow, badge, clamp() headline, dual CTA), css-grid-cards (auto-fill minmax, auto-fill vs auto-fit, hover lift), skeleton-loader (background-size 200% shimmer, GPU animation, shape utilities, dark mode), toast-notification (dynamic DOM creation, translateX slide, animationend cleanup, stacking), css-tooltip (data-tip attr, ::after pseudo-element, four directions, pointer-events), scroll-progress (scrollTop formula, clientHeight subtraction, gradient bar, container tracking), stepper (three step states, connecting line fill, nextStep/prevStep logic, vertical variant). All have 6 use cases, 10 features, 6 FAQs.

---

## 2026-05-30 - UI Snippets: loading-button SEO content

Rewrote loading-button seo object. Title targets "loading button HTML CSS JS spinner three-state cycle double-click prevention". About (~800w) covers: why loading buttons matter (duplicate submissions), CSS border-top-color spinner mechanics, three-state machine (idle/loading/done), min-width layout stability, connecting to fetch(), adding error state. 6-step howToUse. 10 features. 6 use cases with FORM/FLOW/APP/DOC/LEARN/CODE icons. 7 FAQs covering: spinner mechanics, real API connection, error state, double-click prevention, min-width reason, multiple buttons, and React useState migration.

---

## 2026-05-30 - UI Snippets: button-group SEO content

Rewrote button-group seo object. Title targets "button group HTML CSS primary secondary ghost danger icon variants". About (~800w) covers: base class + modifier pattern, when to use each of the 4 variants, .btn.sm size modifier, icon button with SVG currentColor, disabled state via opacity + HTML attribute, transparent border space reservation. 6-step howToUse. 10 features. 4 use cases with CODE/LEARN/DESIGN/FLOW icons. 6 FAQs covering: variants included, base+modifier pattern, adding icons, disabled state, accent colour change, and React/Tailwind usage.

---

## 2026-05-30 - UI Snippets: glass-card SEO content

Rewrote glass-card seo object. Title targets "glassmorphism card HTML CSS backdrop-filter frosted glass". About (~850w) covers: why 4 CSS properties are needed together, the exact role of each (blur/rgba fill/rgba border/border-radius), why a colourful background is required, Safari -webkit- prefix, dark glassmorphism variant, applying to a nav bar, blur vs opacity tuning, and performance note. 6-step howToUse including extracting just the card. 10 features. 4 use cases with DESIGN/SAFE/LEARN/APP icons. 7 FAQs covering: definition, solid background issue, browser support, blur/transparency tuning, dark variant, nav bar application, and React/Tailwind usage.

---

## 2026-05-30 - UI Snippets: pricing-card SEO content

Rewrote pricing-card seo object. Title targets "pricing card HTML CSS two-tier SaaS Popular badge". About (~800w) covers: conversion-optimisation rationale, Popular badge absolute-positioning trick with translateX(-50%), featured card border+glow differentiation, CSS pseudo-element checkmark/cross pattern, .off class UX rationale, button variants, adding a third tier, and connecting to the Pricing Toggle snippet. 6-step howToUse. 10 features. 4 use cases with MONEY/APP/LEARN/DESIGN icons. 7 FAQs covering: definition, badge positioning, third tier, .off class pattern, monthly/annual toggle, colour change, React/Next.js usage.

---

## 2026-05-30 - llms.txt: UI Snippets individual pages added

Updated postbuild.js to include all 91 individual snippet pages in llms.txt under a new "UI Snippets Components" section. Snippets are grouped by category (Navigation, Cards, Buttons, Forms, Layouts, Animations). Each entry links to /ui-snippets/[slug]/ with either the custom seo.description or a generated fallback. Section header links to the main library page.

---

## 2026-05-30 - UI Snippets: profile-card SEO content

Rewrote profile-card seo object. Title targets "profile card HTML CSS avatar stats follow button". About (~750w) covers: gradient avatar circle with initials, replacing initials with a photo, the stats row flex layout and border separators, follow button hover transition, adding a second button, dark mode support. 6-step howToUse. 10 features. 4 use cases with PEOPLE/LEARN/FLOW/DESIGN icons. 7 FAQs covering: definition, replacing initials with photo, adding stats, adding a second button, changing the gradient, React/Vue usage, and dark mode.

---

## 2026-05-30 - UI Snippets: breadcrumb SEO content

Rewrote breadcrumb seo object. Title targets "breadcrumb navigation HTML CSS accessible". About (~750w) covers: UX and SEO value of breadcrumbs, why ol/li over div (screen reader semantics), the li+li::before CSS separator trick (screen readers ignore pseudo-element content), changing the separator character, adding BreadcrumbList JSON-LD schema for Google rich results, and responsive flex-wrap wrapping. 6-step howToUse. 10 features. 4 use cases with NAV/LEARN/GLOBAL/ACCESS icons. 7 FAQs covering: definition + SEO value, ol vs div, CSS separator trick, changing the character, JSON-LD schema, aria-current="page", and React/Next.js usage.

---

## 2026-05-30 - UI Snippets: tab-bar SEO content

Rewrote tab-bar seo object. Title targets "tab bar navigation HTML CSS JS". About (~800w) covers: what a tab bar is and where it's used, the negative-margin border-overlap CSS trick for the active underline, querySelectorAll panel switching logic, adding more tabs, changing the active colour, and accessibility (role=tablist/tab/tabpanel, aria-selected). 6-step howToUse including clicking tabs in the preview. 10 features. 4 use cases with TABS/LEARN/FLOW/DESIGN icons. 8 FAQs covering: definition, underline trick, adding tabs, colour change, panel animation, accessibility, React/Vue usage, and the no-JS alternative.

---

## 2026-05-29 - UI Snippets slug page: Shiki syntax highlighting

Installed shiki. Added `getHighlighter()` singleton and `highlight(code, lang)` helper to `ui-snippets/[slug]/page.js`. At build time, all 5 code blocks (HTML, CSS, JS, React/JSX, React+Tailwind) are highlighted server-side via `Promise.all` using the `github-light` theme. Code blocks switched from `<pre><code>` plain text to `dangerouslySetInnerHTML` with Shiki's output. CSS updated so Shiki's inner `<pre>` has transparent background, inherits font-mono, and respects the max-height scroll container. Zero client-side JS added.

---

## 2026-05-29 - UI Snippets slug page: per-snippet SEO override + hamburger-nav content

Updated `ui-snippets/[slug]/page.js` to merge `sn.seo` fields over the generic fallback — any snippet with a `seo.about`, `seo.howToUse`, `seo.features`, `seo.useCases`, or `seo.faqs` object now uses those instead of the template. Rewrote hamburger-nav `seo` content: new title targeting "hamburger navigation menu HTML CSS", detailed about (~900w) covering the X animation mechanics, backdrop-filter blur, responsive breakpoint, fixed positioning, accessibility attributes, and customisation. 6-step howToUse including mobile toggle testing. 11 features. 4 use cases. 8 FAQs covering JS usage, X animation explanation, breakpoint change, adding links, backdrop-filter support, React/Vue usage, and accessibility.

---

## 2026-05-30 - UI Snippets: category pages with unique SEO content (SeoSection)

Added CATEGORY_CONTENT object in [slug]/page.js with full unique SeoSection content for all 10 categories: about (~300-500w each), 9 features, 6 use cases, 4 FAQs. Each category page now renders CategoryGalleryPage (gallery filtered to category) followed by a SeoSection with breadcrumb schema. Content covers category-specific techniques, use cases, and developer questions. Buttons covers interaction patterns; Forms covers CSS-only techniques; Cards covers glassmorphism and 3D; Navigation covers CSS tricks; Modals covers animationend cleanup; Tables covers Array.sort and DOM manipulation; Loaders covers GPU animation performance; Animations covers 21 effects and prefers-reduced-motion; Layouts covers CSS Grid and masonry; Dashboards covers IntersectionObserver and drag-and-drop.

---

## 2026-05-30 - UI Snippets: dedicated category pages + sitemap + llms.txt

Created 10 dedicated category pages at /ui-snippets/[category]/ — each with unique SEO title, meta description, and canonical URL. The existing [slug]/page.js now branches: category slugs render CategoryGalleryPage (UiSnippetsTool in gallery mode pre-filtered to that category); snippet slugs render the existing snippet detail page. UiSnippetsTool accepts initialCategory prop. layout.js skips rendering the tool on category URLs (CategoryGalleryPage renders its own). generateStaticParams returns 104 paths (10 categories + 94 snippets). postbuild.js updated to include category URLs in sitemap-ui-snippets.xml (priority 0.8) and adds a Categories section to llms.txt.

---

## 2026-05-30 - UI Snippets: 4 new Table snippets (94 total)

Added 4 new snippets in the Tables category: data-table (user rows with gradient avatars, live search filter via textContent, status badges, select-all checkbox, Edit/Remove row actions, pagination), sortable-table (click column header sort via Array.sort, asc/desc indicator class, data-val for numeric columns, data-type="number" for price/stock), comparison-table (3-column feature matrix, featured column with continuous accent border, popular badge, section dividers, check/cross indicators, plan CTAs), schedule-table (weekly grid with days as columns, time slots as rows, 6 colour-coded event types, today column highlight, overflow-x scroll). All have full SEO content. Total snippets: 94.

---

## 2026-05-30 - UI Snippets: 10-category restructure

Remapped all 90 snippets from 6 original categories (navigation/cards/buttons/forms/layouts/animations) to 10 new categories: Buttons(9), Forms(13), Cards(11), Navigation(12), Modals(4), Tables(3), Loaders(4), Animations(21), Layouts(8), Dashboards(5). Updated CATEGORIES export in snippets.js. New categories: Modals (modal, cookie-banner, command-palette, toast-notification), Tables (image-comparison, chat-ui, masonry-grid), Loaders (skeleton-loader, svg-progress-ring, number-slot, breathing-animation), Dashboards (stats-card, dashboard-layout, user-stats-card, kanban-board, notification-bell). postbuild.js and llms.txt generation pick up new categories automatically.

---

## 2026-05-29 - UI Snippets: URL state sync + sidebar UX polish

Saved tab click pushes /ui-snippets/?saved=0. ?saved=0 treated as "show saved gallery" in searchParams effect. Library tab click pushes /ui-snippets/. Browser back/forward correctly restores library or saved gallery view by watching both initialSnippetId and searchParams effects. Fixed edge case where going back from ?saved=0 to /ui-snippets/ didn't reset sidebarTab to library (initialSnippetId is null in both cases so only searchParams effect fires). Sidebar search input wrapped in bordered .searchInputBox with focus ring. Category chip padding/gap tightened. Active highlight on sidebar items only shown when showEditor is true.

---

## 2026-05-29 - UI Snippets: Saved gallery + gallery improvements

Added SavedGallery component (3-col grid, iframe previews, search bar, 9-per-page load more, empty state). Saved tab click now sets showEditor(false) to reveal gallery. Library/Saved sidebar active item highlight only shown when editor is open. Added UI Snippets to ALL_PLAYGROUND_SLUGS in SeoSection (shows in the Learn section on every playground tool page). Scrollbar hiding in all preview iframes.

---

## 2026-05-29 - UI Snippets: separate sitemap auto-generated at build

Added ui-snippets sitemap generation to `scripts/postbuild.js`. Imports `SNIPPETS` from the snippets data file and generates `sitemap-ui-snippets-list1.xml` (all snippet `/ui-snippets/[slug]/` pages, priority 0.7) and `sitemap-ui-snippets.xml` (sitemapindex). Registered `sitemap-ui-snippets.xml` as a 4th entry in the root `sitemap.xml`. Fully automatic — adding new snippets to the data file is all that's needed.

---

## 2026-05-29 - UI Snippets Gallery: search + category filters

Added search input and category filter buttons to the public `UiSnippetsGallery` component. Filters use `useMemo` to recompute the visible snippet list on every category or search change. Changing either filter resets pagination back to the first page. Added an empty-state message when no snippets match. Updated `styles.module.css` with `.controls`, `.searchWrap`, `.searchInput`, `.clearBtn`, `.filters`, `.filterBtn`, `.filterBtn.active`, and `.empty` styles.

---

## 2026-05-28 - UI Snippets: playground nav, learn-to-code category, full SEO rewrite

Added `ui-snippets` to `PlaygroundTopNav` NAV_ITEMS (first position). Added to `ALL_PLAYGROUND_SLUGS` in SeoSection and to `toolSlugs` in categories.js for learn-to-code. Changed registry category from `dev` to `learn`. Added `<PlaygroundTopNav active="ui-snippets" />` to page.js. Updated breadcrumb schema to `Home → Learn to Code → UI Snippets Library`. Full SEO rewrite: title updated to 50+ count, description specifically names command palette/kanban/magnetic button/aurora/OTP/pricing toggle. Keywords expanded to 40+ long-tail terms matching snippet-specific searches. About text ~1,800w covering every category with specific component call-outs, saved snippets, IndexedDB, and GitHub Gist. howToUse expanded to 7 steps covering device preview buttons and Gist sync. Features list expanded to 22 items. 6 use cases. 12 FAQs covering framework-free usage, snippet count, per-panel reset, device preview, IndexedDB save, Gist sync, data privacy, JS vs pure-CSS breakdown, resize behavior, copy/download options.

---

## 2026-05-28 - UI Snippets: save/IndexedDB/Gist + reset + saved tab

Added full custom snippet workflow to UiSnippetsTool. Reset button in header reloads original html/css/js for the active snippet. "Save as" button opens a popover with a name input — saves to IndexedDB (`ui_snippets_db`, store `custom_snippets`) with id/name/html/css/js/createdAt/updatedAt fields. Saved snippets appear in a new "Saved" sidebar tab (Library | Saved tabs replace the old top bar) with search, delete-with-confirm-dialog, and active highlighting. GitHub Gist sync panel (same pattern as bookmark-keeper): token input (password type), gist ID input, Save settings + Sync Now buttons, status messages (syncing/ok/error), last-synced time, green dot indicator on the GitHub button when token is set, auto-sync every 3 min when token+id configured, 10s debounce after save/delete. Gist file: `fwd-ui-snippets.json`. localStorage keys: `uis_gist_token`, `uis_gist_id`. Merge strategy: last-write-wins by updatedAt. Also added `AdSlot300x600` named export to AdSlot component (300×600 fixed ins.adsbygoogle) and injected it into `FeaturesSection` in SeoSection after the feature list.

---

## 2026-05-28 - New tool: UI Snippets Library (/ui-snippets/)

Added a new CodePen-style UI Snippets Library tool. Created `src/components/UiSnippetsTool/snippets.js` with 15 snippets across 6 categories (Navigation: hamburger nav, tab bar, breadcrumb; Cards: profile card, pricing card, glassmorphism card; Buttons: button group, loading button, ripple button; Forms: floating label, toggle switch, search box; Layouts: hero section, responsive card grid; Animations: skeleton loader, toast notification, CSS tooltip). Created `src/components/UiSnippetsTool/index.js` with a three-pane CodePen-style layout: collapsible snippets sidebar (search + category chips + list), editor pane with three stacked HTML/CSS/JS panels (each with syntax highlighting via `pre` overlay + transparent `textarea`, collapsible, vertically resizable via drag handles), and a live `iframe` preview (srcdoc). Horizontal drag handle between sidebar and editor, horizontal drag between editor and preview. All drag logic uses `useDrag` hook with pointer-events disabled on iframes during drag. Added `src/app/ui-snippets/page.js` with full SEO (1400w about, 5-step howToUse, 11 features, 6 useCases, 8 FAQs, all 4 JSON-LD schemas). Added entry to `tools-registry.js` (category: dev, accent: #6366f1). Created `/public/icons/ui-snippets.svg`.

---

## 2026-05-27 - HTML Playground: full SEO rewrite

Rewrote `src/app/html-playground/page.js` with search-intent-driven SEO. Updated metadata title to `'HTML Playground — Learn HTML Online with 42 Interactive Lessons | FWD Tools'` and enriched description to enumerate all topic areas. Enriched OG title/description (was thin "Click-based HTML learning tool. See every tag live..."). Enriched Twitter description. Fixed breadcrumb schema to include `Learn to Code` middle step (was `Home → HTML Playground`, now `Home → Learn to Code → HTML Playground`). Expanded `about.description` from ~350 words to 1400+ words — 10 section headings covering every chapter group (Document Structure/Basics; Text; Lists/Structure/Semantic HTML; Media; Forms — 6 lessons; Tables; Advanced/Responsive Images/Native Components; Performance & Loading; SEO Essentials) with inline HTML tag examples using backtick escaping and what learners actually see and build in each lesson. Converted `features` from `{title, text}` object format to plain strings (17 items). Expanded `howToUse` from 6 to 8 steps — added "use sandbox mode to experiment" and "work through advanced chapters at your own pace" steps. Added `links` section (5 related tools: CSS Playground, JS Playground, Tailwind, SEO Playground, React Playground). Updated `softwareSchema.description` with full feature enumeration and expanded 17-item `featureList`. Added "What are resource hints and why are they in an HTML tutorial?" FAQ. Updated tools-registry.js `sub` to `'42 lessons · Click-based · Live preview'`, updated `desc`, updated `lastmod` to `2026-05-27`.

---

## 2026-05-27 - Angular Playground: full SEO rewrite + format migration

Rewrote `src/app/angular-playground/page.js`. Migrated from old `sections` array format (with embedded `type:'2col'`, `type:'table'`, `type:'cards'`, `type:'callout'`, `type:'timeline'` blocks) to standard flat props format (`about`, `features`, `howToUse`, `useCases`, `faqs`, `links`). Updated metadata title to `'Angular Playground — Learn Angular Online with 45 Interactive Lessons | FWD Tools'` and enriched description. Rewrote OG and Twitter title/description (both were thin). Fixed breadcrumb schema to include `Learn to Code` middle step (was `Home → Angular Playground`, now `Home → Learn to Code → Angular Playground`). Expanded `about.description` to 1400+ words structured around learner search intent — 10 section headings matching each chapter group (Getting Started/Templates; Directives; Events & Forms; Components; Services & Data; Routing; Pipes & Styling; Modern Angular — signals/standalone; Advanced Forms; RxJS & State; Architecture & Performance; Testing & Production) with inline code syntax and what learners actually build. Expanded `howToUse` to 8 steps following the chapter order from beginner to pro. Added 6 use cases with icons (beginners without CLI, understanding template syntax, React/Vue developers, production forms/RxJS/signals, interview prep, bridging CLI gap). 10 FAQs with search-intent phrasing — added Angular signals explanation, template-driven vs reactive forms difference, TypeScript prerequisite question, post-lesson guidance. Updated `softwareSchema.description` with full feature enumeration and 17-item `featureList`. Added `links` section (5 related tools). Updated tools-registry.js `sub` to `'45 lessons · Signals · RxJS · Testing'`, updated `desc`, `lastmod` already `2026-05-27`.

---

## 2026-05-27 - Vue.js Playground: full SEO rewrite

Rewrote `src/app/vue-playground/page.js` with search-intent-driven SEO. Updated metadata title to `'Vue.js Playground — Learn Vue 3 Online with 40 Interactive Lessons | FWD Tools'` and description to enumerate all key learning areas. Enriched OG and Twitter title/description (both were thin). Fixed breadcrumb schema to include `Learn to Code` middle step (was `Home → Vue.js Playground`, now `Home → Learn to Code → Vue.js Playground`). Changed `applicationCategory` from `DeveloperApplication` to `EducationalApplication`. Added 14-item `featureList` to `softwareSchema`. Expanded `about.description` to 1300+ words structured around learner search intent — each section covers a specific chapter group (Getting Started, Directives, Computed & Watch, Components, Lifecycle, Composition API, Setup Function, Advanced Patterns, Mini-Projects) with inline code examples and what learners actually build. Expanded `howToUse` from 6 steps to 8 steps (added "Open the playground — no install required" intro step and "Build the mini-projects and share your code" closing step). Added `links` section (5 related playground tools). Kept 11 FAQs — updated question phrasing to match real search queries (e.g. "Should I learn JavaScript before learning Vue?", "What are Vue composables and how do they differ from mixins?"). Updated `softwareSchema.description` with full feature enumeration. Updated tools-registry.js `sub` to `'40 lessons · Composition API · Mini-Projects'`, updated `desc`, updated `lastmod` to `2026-05-27`.

---

## 2026-05-27 - JavaScript Playground: full SEO rewrite + format migration

Fully rewrote `src/app/js-playground/page.js`. Migrated from the old `sections` array format (with embedded `type:'2col'`, `type:'table'`, `type:'callout'` blocks and a separate `howToSteps`/`howToSchema` derivation) to the standard flat props format (`about`, `features`, `howToUse`, `useCases`, `faqs`, `links`). Removed the `howToSchema` JSON-LD block (redundant once `howToUse` steps section renders it via SeoSection). Added 14-item `featureList` to `softwareSchema`. Updated `about.description` to 1400+ words structured around learner search intent — 9 section headings matching the chapter groups (Foundations/Values & Logic/Control Flow; Functions/Arrays/Objects; DOM/Events/Data; Async; Advanced Functions/OOP/Architecture; Browser APIs; Performance/Security/Testing; Generators/Modern Methods/Regex/AbortController/Observers/Proxy; Mini Projects) with inline code examples and what learners actually build. `howToUse` expanded to 8 steps. Added 6 use cases with icons. Added `links` section (5 related tools). 10 FAQs updated with search-intent phrasing. All metadata already updated in the previous targeted fix (title, description, OG, Twitter, breadcrumb with Learn to Code middle step). tools-registry.js `lastmod` remains `2026-05-27`.

---

## 2026-05-27 - Redis Playground: expanded from 5 to 8 lessons + 35 commands + SEO rewrite

Added 3 new lessons to `src/components/RedisPlaygroundTool/index.js`: (1) **Atomic Counters** — INCR, INCRBY, DECR, DECRBY for race-free page view counters, vote tallies, and rate limit windows; (2) **Conditional Writes** — SETNX, EXISTS, PERSIST for distributed locks, idempotency tokens, and expiration removal; (3) **Key Inspection** — KEYS (glob patterns), TYPE, RENAME, MSET, MGET for introspection and batch operations. Also expanded the Data Types lesson commands to include LRANGE, SCARD, HKEYS, ZSCORE. Implemented 20 new command handlers in `runCommandOnState`: INCR, INCRBY, DECR, DECRBY, SETNX, EXISTS, PERSIST, TYPE, RENAME, KEYS (glob matching with regex), MSET, MGET, LRANGE, SISMEMBER, SCARD, HDEL, HKEYS, HVALS, ZSCORE, ZRANK, UNSUBSCRIBE. Updated unknown-command error message to list all 35+ supported commands. Fully rewrote `src/app/redis-playground/page.js`: title/description targeting "learn redis online", "redis commands practice", "redis tutorial interactive"; 1100+ word about section covering all 8 lessons in depth with inline command examples; 8 FAQs covering real/simulated server, command list, TTL countdown, caching pattern, SETNX locks, INCR counters, data types, persistence; 8 how-to steps; 10-item feature list; 6 use cases; 5 related links. Updated breadcrumb to include Learn to Code middle step. Removed HowTo schema (redundant with steps section). Updated tools-registry.js sub, desc, lastmod.

---

## 2026-05-27 - SEO Playground: SEO rewrite

Rewrote `src/app/seo-playground/page.js` with full search-intent-driven SEO. Updated metadata title/description to target "seo audit tool", "serp preview tool", "open graph checker", "technical seo checker online", and related queries. Rewrote about section (1200+ words) explaining the problem of fragmented SEO tooling, then covering all seven audit categories in depth: Metadata (title length, description, robots, canonical), Crawlability (noindex, nofollow, non-HTTPS canonical, query/hash in canonical, canonical/OG host mismatch), Content (word count, H1/title alignment, heading outline, first paragraph), Social (Facebook, X/Twitter, LinkedIn, Slack card previews), Schema (JSON-LD parser + 8-type Schema Builder), Links (anchor text quality, internal/external ratio, empty hrefs), Images (alt text, width/height, loading attribute), Output (5 export formats), Report (Markdown + JSON). Added 8 FAQs: live URL check, what is audited, SERP preview, social platforms, schema types, export formats, vs Search Console, data privacy. Added 8 how-to steps (URL entry through export). Updated breadcrumb to include SEO Tools middle step. Expanded featureList to 14 items. Added 6 use cases with icons and 5 related links. Updated tools-registry.js desc and lastmod.

---

## 2026-05-27 - Python Playground: expanded from 6 to 18 lessons across 8 chapters

Added 12 new lessons to `src/components/PythonPlaygroundTool/index.js`. Each lesson follows the existing visual tracer format with predefined steps (line, title, detail, memory, output, stack) and a challenge card. New lessons added by chapter:

**Basics**: Strings (len, upper, slicing, f-strings) · Numbers & Casting (int, float, /, //, str(), int())

**Control Flow**: Booleans & Operators (True/False, >, ==, and/not, ternary expression) · While Loops (counter, accumulator, condition check at each iteration — 12 trace steps)

**Loops**: List Comprehensions (squares, filter evens, f-string labels) · List Methods (append, sort, remove, len, index)

**Data**: Tuples (indexing, len, unpacking) · Sets (deduplication, add, in operator, sorted display)

**Functions**: Lambda & map (double/add lambdas, sort, map) · Scope (global vs local, local_val destroyed after return)

**OOP** (new chapter): Classes & Objects (__init__, self, instance attributes, method call — 10 trace steps)

**Error Handling** (new chapter): try / except (ZeroDivisionError caught vs clean division — 11 trace steps)

Updated page.js title, description, OG, softwareSchema description, and topics FAQ to reflect 18 lessons / 8 chapters. Updated tools-registry.js sub, desc, and lastmod.

---

## 2026-05-27 - Tailwind CSS Playground: SEO rewrite

Rewrote `src/app/tailwind-playground/page.js` with full search-intent-driven SEO. Updated metadata title/description to match "learn tailwind css online" and related queries. Rewrote about section (1200+ words) covering all 15 chapters in detail with inline class examples (backtick-escaped): Foundations (utility-first model, color system, state modifiers), Typography/Spacing/Sizing, Flexbox, CSS Grid (auto-fill/auto-fit patterns), Borders & Effects, Transitions & Animation (animate-spin/pulse/bounce), Responsive Design (mobile-first breakpoints, container pattern, dark:), Group & Peer (group-hover: cascades, named groups, peer-invalid: form validation), @apply & Config, Component Patterns (4 lesson types), Accessibility (sr-only, focus-visible:, aria-* modifiers), Advanced Patterns (arbitrary values, has-*, @layer, motion-safe:, print:, skeleton, dialog/popover), Tailwind v4 (CSS-first config, @theme). Added 8 FAQs: no-install, lesson count, vs official Tailwind Play, dark: modifier, arbitrary values, progress saving, group/peer explanation, download. Added 8 how-to steps (chapter-by-chapter learning path), 12-item feature list, 6 use cases, 5 related links. Updated breadcrumb to include Learn to Code middle step. Updated tools-registry.js lastmod to 2026-05-27.

---

## 2026-05-27 - TypeScript Playground + GSAP Helper Plugins: SEO rewrite + lesson fixes

Rewrote `src/app/typescript-playground/page.js` with full SEO content: 1100+ word about section covering all 10 chapters (Getting Started, Core Types, Object Types, Aliases & Interfaces, Functions, Classes, Generics, Advanced Types, Pro Types, Real Projects); 8 FAQ entries covering no-install, lesson count, JS-first recommendation, covered topics, progress saving, compiler vs playground, utility types, download/share; 8 how-to steps; 10-item feature list; 6 use cases; 5 related links. Migrated from old `sections` array format to flat props format (about/features/howToUse/useCases/faqs/links). Updated breadcrumb to include Learn to Code middle step. Updated metadata title/description to match search intent. Also fixed two GSAP Helper & Integration Plugins lessons: (1) `motion-helper-gsdevtools` — replaced status-card-only demo with real SVG MotionPathPlugin animation (dot trails along dashed curved path with autoRotate) + `GSDevTools.create({ animation: tl })` which renders the actual interactive timeline player UI in the preview; (2) `renderer-plugins` — added a visual canvas gradient animation (PixiPlugin tint pattern), CSS box scaleX/scaleY animation (EaselPlugin DisplayObject pattern), and color-cycling div (colorMatrixFilter pattern) alongside the status cards.

---

## 2026-05-27 - Bootstrap 5 Playground: expanded to 50 lessons + full SEO

Added 3 new lessons to reach 50 total: Floating Labels (Forms chapter), Toasts (Components chapter), Position Utilities (Utilities chapter). Updated all lesson counts across page.js metadata/schemas/SEO, tools-registry.js, and DEVLOG. Rewrote page.js SEO with full 1000+ word about section covering grid, forms, components, overlays, and utilities chapters; 8 FAQ entries covering dark mode, toasts, JS components, share/download; 8 how-to steps; 6 use cases; 15-item feature list. Confirmed OG image bootstrap5-playground.png wired to metadata (user added image file).

---

## 2026-05-27 - Bootstrap 5 Playground: new tool added

Created `/bootstrap5-playground/` — a full structured learning playground for Bootstrap 5. Built `src/components/Bootstrap5PlaygroundTool/lessons.js` with 48 lessons across 15 chapters: Getting Started, Grid System, Typography, Colors & Borders, Tables, Images, Alerts & Badges, Buttons, Cards, Navigation, Forms, Components, Overlays, Carousel, and Utilities. 6 Quick Check challenges embedded in lessons. Component uses same architecture as jQuery Playground: sandboxed iframe, 400ms debounce, bspg-* postMessage types, localStorage progress/position keys, confetti on chapter completion, resizable split, console panel, drag handle. Bootstrap 5.3.3 loaded via jsDelivr; dark mode via data-bs-theme="dark"; tooltips/popovers auto-initialized. Created `styles.module.css` with Bootstrap purple accent (#6f42c1 / #a78bfa dark), `page.js` with full metadata/FAQs/schemas/SEO. Added `bootstrap5-playground` entry to tools-registry.js, categories.js learn-to-code toolSlugs (count: 23→24), PlaygroundTopNav (after jQuery), and updated learn-to-code/page.js OG counts.

---

## 2026-05-27 - jQuery Playground: expanded to 72 lessons across 16 chapters

Added 26 new lessons to lessons.js across 7 chapters (4 existing, 3 new). Existing chapters extended: Events (off, one, trigger/triggerHandler, namespacing), DOM Add & Remove (clone, wrap/wrapAll/unwrap, replaceWith/replaceAll, detach), Traversing (closest, slice, add/addBack, end), AJAX (ajaxSetup, global AJAX events). New chapters added: Utilities ($.each, $.map, $.grep, $.extend, $.type), Deferred & Promises ($.Deferred basics, $.when, .then chaining), Plugin Basics (writing a plugin with $.fn, plugin with methods/$.data). Updated CHAPTERS array from 13 to 16 entries. Updated page.js metadata title/description/OG/Twitter, faqSchema, softwareSchema, and all SEO sections to reflect 72 lessons / 16 chapters. Updated tools-registry.js sub and desc.

## 2026-05-27 - jQuery Playground upgraded to full learning playground

Replaced the simple 3-panel sandbox with a structured learning playground matching the React Playground architecture. 46 lessons across 13 chapters (Getting Started, Selectors, Events, Hide & Show, Fading, Sliding, Animation, Chaining, DOM Get & Set, DOM Add & Remove, CSS Manipulation, Traversing, AJAX). Features: sidebar with chapter grouping + lesson search, concept panel per lesson, syntax highlighter for mixed HTML + jQuery/JS code with `.jq-*` token classes, live preview rebuilt via `buildSrcdoc()` (400ms debounce, jQuery 3.7.1 from jsDelivr), console panel capturing iframe postMessages, 9 quick-check MCQ challenges, progress tracking in localStorage, confetti on chapter completion, drag-handle resize, Ctrl+Enter immediate refresh, download as .html, share via URL param. Added `jquery-playground` to PlaygroundTopNav. Updated tools-registry.js accent to `#0769ad`, desc, sub, lastmod. Updated page.js metadata, OG/Twitter cards, FAQs, softwareSchema, and all SEO sections to describe the 46-lesson playground.

## 2026-05-26 - jQuery Playground tool added

New tool: `/jquery-playground/`. HTML/CSS/JS split editor with jQuery loaded from the official CDN. Live preview in a sandboxed iframe, console panel capturing log/warn/error/info, version switcher (3.7.1 / 3.6.4 / 2.2.4 / 1.12.4), auto-run with 900ms debounce, Tab-key indentation, Copy per panel, Reset, and 5 built-in examples (Fade Toggle, AJAX, Animate, DOM Manipulation, Event Delegation). Full SEO content, FAQ schema, SoftwareApplication schema.

---

## 2026-05-26 - ImageBackgroundRemoverTool: zoom + lasso selection feature

Added zoom in/out controls to the image preview stage. Added Photoshop-style lasso selection mode: draw a freehand region, then "Remove inside" or "Remove outside" the selection. Fixed two bugs in the lasso implementation: (1) stale closure in pointer handlers — replaced `selDrawing` state with `selDrawingRef.current`; (2) empty source canvas when entering lasso mode — `processImage` now draws the original image to both source and output canvases in lasso mode instead of returning early, so `applyToSelection` has pixel data to process.

---

## 2026-05-25 - Layout redesign: icon rail sidebar + right panel

Redesigned the app layout into a three-column system:

- **Left sidebar** → 48px icon rail (position: fixed). On hover, expands to 220px and floats over the main content with a box shadow. Collapsed state hides all text labels and section bodies via CSS `:not(.sidebarExpanded)` rules; rail icons (SVG) show for each section header. `onMouseEnter/Leave` toggles `expanded` state.
- **Right panel** → new `RightPanel` component (position: fixed, 160px, right: 0). Contains: AdSense slot (top), RecommendedSlider, ThemeToggle, Support link (bottom). Hidden on mobile via `@media (max-width: 768px)`.
- **Main content** → `margin-left: 48px` (icon rail) + `margin-right: 160px` (right panel). Both margins cleared on mobile.
- Moved out of left sidebar: RecommendedSlider, ThemeToggle, Support link, ad slot — all now in RightPanel.
- Mobile behavior unchanged: hamburger + overlay drawer as before.

Files: `src/components/RightPanel/index.js` (new), `src/components/RightPanel/styles.module.css` (new), `src/components/Sidebar/index.js`, `src/components/Sidebar/styles.module.css`, `src/app/layout.js`, `src/app/layout.module.css`

---

## 2026-05-25 - Full SEO audit completed — all 171 tool pages verified

Completed a full audit of all tool pages. Key findings:

- All 171 tool pages confirmed to have `howToUse` steps content in some format (`howToUse:` key, `const howToUse = ...`, `const steps = [...]`, or `sections: [{ type: 'steps' }]` array pattern)
- Original grep for `howToUse:` key only matched one of three SEO patterns in the codebase, giving a false count of 50 "missing" pages — all 50 were confirmed to have steps content on deeper inspection
- Category pages (css-tools, pdf-tools, developer-tools, etc.) and static pages (privacy-policy, terms) correctly have no howToUse steps
- Earlier in this session: 63 flat `howToUse` strings were converted to steps format; thin features/useCases/faqs were enriched across all tool groups in 9 agent batches

---

## 2026-05-25 - Category page content fixes (categories.js + css-tools/page.js)

Fixed stale counts and dangling references across category pages:

- **css-tools** (`categories.js` about + useCases): "50+ presets" → "79 presets" for CSS Animation Generator (two occurrences)
- **css-tools** (`page.js` OG + Twitter): "25 free CSS tools" → "26 free CSS tools" (actual toolSlugs count is 26)
- **learn-to-code** (`categories.js` FAQ): "seventeen playgrounds" → "eighteen" to match the tagline
- **learn-to-code** (`categories.js` useCases): removed Redis Playground entry (referenced `redis-playground` which does not exist in toolSlugs)

---

## 2026-05-25 - SEO audit and fixes for 19 freelancer, finance, and misc tools

Audited and fixed SEO content across 19 tool pages (color-wheel does not exist in the project and was skipped). Key findings and changes:

**Freelancer tools — useCases icons fixed (emoji/ALL_CAPS strings → text symbols):**
- `freelance-dashboard` — replaced 6 emoji icons with text symbols (◉, ▦, ◑, ≡, △, ✦) in useCases
- `time-tracker` — replaced string icons (CLOCK, DOC, CHART, MONEY, SAFE, FLOW) with text symbols in useCases
- `client-portal-lite` — replaced string icons (CHECK, DOC, FLOW, LINK, SAFE, PEOPLE) with text symbols in useCases
- `follow-up-reminder-board` — replaced string icons (MAIL, INVOICE, PEOPLE, STAMP, CLOCK, SAFE) with text symbols in useCases
- `milestone-payment-tracker` — replaced string icons (MONEY, CLOCK, CHART, DOC, FLOW, SAFE) with text symbols in useCases
- `freelance-availability-planner` — replaced string icons (CAL, CLOCK, WARN, FLOW, MONEY, SAFE) with text symbols in useCases

**Confirmed compliant (no changes needed):** `freelance-invoice-generator`, `milestone-tracker` — already had full sections-based SEO with rich content.

**Misc productivity tools — useCases icons fixed + about/features expanded:**
- `daily-focus-log` — replaced 6 emoji icons with text symbols in useCases; removed garbled emoji in standup description text
- `mini-kanban` — replaced 7 emoji icons with text symbols (◉, ▦, △, ◑, ⚡, ≡, ✦) in useCases

**Developer/misc tools — useCases icons fixed + about.description expanded + features expanded to 9 items:**
- `binary-hex-ascii` — replaced 6 emoji useCases icons with text symbols; expanded about.description from ~120 to 200+ words (3 paragraphs covering common uses and built-in ASCII table); expanded features from 8 to 9 items
- `reading-time-calculator` — replaced 6 emoji useCases icons with text symbols; expanded about.description by adding readability improvement guidance and use-case context paragraphs; expanded features from 8 to 9 items (added "Instant results" item)
- `image-color-palette` — replaced 6 emoji useCases icons with text symbols; expanded about.description by adding paragraph on using colors in CSS/design tools; expanded features from 8 to 9 items
- `markdown-table-generator` — replaced 6 emoji useCases icons with text symbols; expanded about.description by adding column alignment workflow paragraph; added 9th feature item ("Runs entirely in the browser")
- `html-table-generator` — replaced 6 emoji useCases icons with text symbols; expanded about.description by adding accessibility and "why use a generator" paragraphs; expanded features from 8 to 10 items
- `json-schema-generator` — replaced 6 emoji useCases icons with text symbols; expanded about.description by adding schema editing guidance paragraph; expanded features from 8 to 10 items; added 6th howToUse step for schema validation

**Finance tools — confirmed compliant (no changes needed):** `loan-payoff-calculator`, `monthly-investment-calculator`, `tip-calculator` — all use sections-based SEO format with rich text, cards, and steps already in place.

---

## 2026-05-25 - SEO audit and fixes for 13 PDF and document conversion tools

Audited SEO content across all 13 PDF/document tool pages. Found that 8 tools already had complete, compliant SEO (pdf-to-word, pdf-to-images, pdf-splitter, pdf-merger, pdf-compressor, pdf-metadata, pdf-ocr, pdf-page-organizer, pdf-password-protector, pdf-unlock, pdf-watermark, images-to-pdf, html-to-pdf all had structured howToUse, features, useCases, and FAQs). Applied fixes to 7 tools:

- `pdf-splitter` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡)
- `pdf-merger` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡)
- `pdf-metadata` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡)
- `pdf-unlock` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡)
- `html-to-pdf` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡)
- `pdf-compressor` — expanded about from 2 thin paragraphs to 3 full paragraphs (200+ words); added explicit "no data is uploaded" privacy statement; added guidance on when image-based compression helps vs. doesn't; added links to related PDF workflow tools
- `pdf-watermark` — expanded about from 2 thin paragraphs to 3 full paragraphs (200+ words); added explicit "no data is uploaded" privacy statement; documented both Text mode and Image mode in detail; added tiling explanation and multi-step workflow guidance

Confirmed compliant (no changes needed): pdf-to-word, pdf-to-images, pdf-page-organizer, pdf-password-protector, images-to-pdf — all already had text-symbol useCases icons, 200+ word about descriptions, 3-paragraph structure, and privacy statements.

---

## 2026-05-25 - SEO audit and fixes for 8 CSS, finance, and utility tools

Audited SEO content for 8 tool pages flagged as potentially missing structure. Found that 6 tools (css-autoprefixer, javascript-minifier, net-worth-calculator, retirement-calculator, canada-take-home-calculator, budget-planner) already had complete, compliant SEO content. Fixed the remaining 2:

- `css-button-generator` — converted `howToUse` from a flat string to `{type: 'steps', items: [...]}` format with 6 accurate steps covering preset selection, label/background setup, typography and shape controls, hover/active/icon configuration, live preview usage, and 5-format export; replaced emoji icons in all 8 useCases with text symbols (◉, ▦, ◑, △, ⚡, ≡, ✦)
- `resume-builder` — replaced emoji icons in all 8 useCases with text symbols (◉, ▦, △, ≡, ◑, ✦, ⚡); updated privacy use case to include explicit "runs fully in your browser — no data is uploaded" language

Confirmed compliant (no changes): css-autoprefixer, javascript-minifier, net-worth-calculator, retirement-calculator, canada-take-home-calculator, budget-planner — all had proper steps format, text-symbol useCases icons, 200+ word about descriptions, 8+ features, and privacy notes where applicable.

---

## 2026-05-25 - SEO content rewritten for 10 image, SVG, and color tools (batch 2)

Rewrote SEO objects for all 10 image/SVG/color tool pages to meet content requirements: 200+ word about descriptions, accurate howToUse steps, 8–10 features, 5–6 useCases, and text-symbol icons (no emoji). Changes made:

- `image-compressor` — trimmed features from 15 to 10 items; trimmed useCases from 7 to 5; added "runs fully in your browser — no data is uploaded" to about; expanded about to 3 clear paragraphs
- `image-to-svg` — trimmed features from 18 to 10 items grouping related controls (pre-trace, SVG effects, presets) into single concise feature strings
- `svg-to-png` — trimmed features from 12 to 9; replaced emoji icons in 6 useCases with text symbols (◉, ▦, ◑, △, ⚡)
- `favicon-generator` — expanded about.description from ~150 words to 200+ words across 3 paragraphs; added privacy statement; updated title; reformatted features to remove inline `**bold**` wrappers
- `og-image-generator` — replaced emoji icons in all 6 useCases with text symbols (◑, ⚡, ▦, △, ◉, ≡)
- `image-to-text-converter` — replaced emoji icons in all 6 useCases with text symbols (◉, ▦, ◑, △, ⚡, ✍)
- `image-to-base64`, `image-to-svg`, `svg-animation-generator`, `animated-svg-icons`, `color-palette-generator` — already compliant; no changes needed

---

## 2026-05-24 - SEO content fixed for 10 image, SVG, and color tools

Converted `howToUse` from flat strings to `{type: 'steps', items: [{title, text}]}` format (5–7 accurate steps per tool based on actual component controls) across all 10 tools. Also expanded `about.description` for `image-to-base64` to 3 paragraphs (200+ words).

Tools updated:
- `image-compressor` — 6-step howToUse covering upload/paste, format selection (WebP/AVIF/PNG/JPEG/Original), quality slider, split-slider compare, resize modes and social presets, and batch download
- `image-to-base64` — 5-step howToUse covering upload/paste, metadata panel, format conversion tab, copy output format, and usage in projects; about.description expanded with format conversion, overhead, and format-choice guidance
- `image-to-svg` — 6-step howToUse covering upload, quick presets, color mode and trace controls, pre-trace settings, SVG effects, and compare/download
- `image-to-text-converter` — 6-step howToUse covering load image, language selection, extract text with progress bar, confidence score, edit output, copy/download .txt
- `svg-animation-generator` — 6-step howToUse covering add shape/upload SVG, choose engine (CSS/SMIL/GSAP), click preset, fine-tune duration/delay/easing/repeat, animate layers independently, export SVG/HTML
- `svg-to-png` — 6-step howToUse covering load SVG/paste code, scale selector, exact dimensions, background color, download/copy, and Re-convert
- `favicon-generator` — 5-step howToUse covering upload, shape selection, background/padding, preview and ZIP download, and HTML link tags
- `og-image-generator` — 5-step howToUse covering template selection, content fields, colors/font, logo upload, and download/deploy with og:image tag
- `animated-svg-icons` — 5-step howToUse covering browse/select icon, set color, adjust size/stroke/speed, switch export format, and copy/download
- `color-palette-generator` — 5-step howToUse covering enter base color, select harmony type, review swatches, click-to-copy, and export format tabs

---

## 2026-05-24 - SEO content fixed for 10 HTML/JSON/data tools

Converted `howToUse` from flat strings to `{type: 'steps', items: [{title, text}]}` format (5–7 accurate steps per tool based on actual component controls) across all 10 tools. Existing about descriptions, features, useCases, and faqs were already compliant and preserved.

Tools updated:
- `html-formatter` — 7-step howToUse covering paste/upload, indent size, format/minify, inline resources, search (Ctrl+F), history, and download
- `html-to-jsx-converter` — 6-step howToUse covering live conversion, 7 conversion toggles, prettify input, history, download .jsx, and copy
- `html-to-markdown` — 6-step howToUse covering paste/sample, live output, byte-size stats, copy, download .md, and clear
- `json-formatter` — 7-step howToUse covering paste/upload, format/repair/minify, sort keys, tree view with collapse/expand, JSON path click, search output, and history
- `json-table-viewer` — 7-step howToUse covering paste/upload, automatic table, sort/search/filter, column visibility, row count, nested preview, and CSV/TSV export
- `json-to-typescript` — 6-step howToUse covering live conversion, interface vs type alias, generics/null/export/optional toggles, root name, history, and download .ts
- `yaml-json-converter` — 6-step howToUse covering paste/sample, auto-detect direction, indent/sort-keys, size stats, swap, and download
- `diff-checker` — 6-step howToUse covering paste both panes, display mode selection, diff options, hunk navigation, stats/minimap, and merge/export/share
- `sql-formatter` — 6-step howToUse covering paste/upload, keyword casing, indent, dialect selector, stats bar, and download/copy
- `csv-json-converter` — 6-step howToUse covering paste/upload, auto-detect, delimiter/header/type options, table preview, swap, and download

---

## 2026-05-24 - SEO content fixed for 8 CSS code/layout tools

Converted `howToUse` from flat strings to `{type: 'steps', items: [...]}` format across all 8 CSS code and layout tool page.js files. Also expanded `about.description` for `css-grid-builder` and `flexbox-builder` to 200+ words with `\n\n` paragraph separators and `**bold**`/backtick inline markup.

Tools updated:
- `css-grid-builder` — 6-step howToUse; expanded about.description (3 paragraphs covering named areas, fr units, 5 export formats)
- `flexbox-builder` — 7-step howToUse; expanded about.description (3 paragraphs covering two-layer flex model, container vs per-item controls)
- `css-clamp-generator` — 6-step howToUse covering viewport range, base font size, scale ratio, rem/px toggle, preview slider, and export
- `css-media-queries-generator` — 6-step howToUse covering framework presets, breakpoint editing, direction/syntax toggles, range queries, feature queries, and output formats
- `css-to-tailwind` — 6-step howToUse covering paste CSS, live output, output format tabs, file upload, amber arbitrary values, and copy/download
- `tailwind-to-css` — 6-step howToUse covering paste classes, live CSS output, arbitrary value handling, CSS/SCSS/JS Object tabs, file upload, and copy/download
- `tailwind-formatter` — 5-step howToUse covering paste class string, Dedup/Sort/Group/Multiline toggles, stats bar, Flat/Grouped tabs, and copy
- `css-minifier-beautifier` — 6-step howToUse covering paste/upload, Minify/Beautify buttons, stats bar, Edit/Clear cycle, copy/download, and History panel

---

## 2026-05-24 - SEO content fixed for 10 CSS visual generator tools

Rewrote `howToUse` from flat strings to `{type: 'steps', items: [...]}` format in all 10 CSS tool page.js files. Also corrected factual inaccuracy in CSS Loader Generator — metadata, title, about, features, and FAQ now correctly say 36 loaders (not 10). React export tab added to loader steps.

Files updated: `box-shadow-generator`, `gradient-generator`, `glassmorphism-generator`, `css-clip-path-generator`, `css-filter-generator`, `css-transform-generator`, `css-shape-generator`, `css-loader-generator`, `mesh-gradient-generator`, `css-easing-generator`.

---

## 2026-05-24 - SEO content fixed for 10 developer utility tools

Converted `howToUse` from flat strings to `{type: 'steps', items: [...]}` format (5 steps each) across all 10 tools. Also expanded `about.description` for `rem-px-converter` to 200+ words with `\n\n` paragraph separators and `**bold**`/backtick inline markup.

Tools updated:
- `base64-encoder-decoder` — 5-step howToUse covering Encode/Decode modes, variant selection, file/text input, Data URI toggle, and swap/copy
- `hash-generator` — 5-step howToUse covering text/file mode, HMAC mode, reading results, copying, and hash verification
- `jwt-decoder` — 5-step howToUse covering token paste, header/payload panels, expiry countdown, HS256 verification, and security warnings
- `uuid-generator` — 5-step howToUse covering format selection, count/options, generation, copying, and downloading
- `url-encoder-decoder` — 5-step howToUse covering mode selection, Query String vs Full URL encoding, input/output, stats, and swap
- `regex-tester` — 5-step howToUse covering pattern bar and flags, live highlights, presets, capture groups, and replace mode
- `timestamp-converter` — 5-step howToUse covering live clock, Epoch→Date, timezone picker, Date→Epoch, and quick reference/batch
- `rem-px-converter` — expanded about.description (200+ words, 3 paragraphs); 5-step howToUse covering base size, REM input, PX input, preview, and reference table
- `word-counter` — 5-step howToUse covering text input, count stats, reading/speaking time, readability score, and keyword density/case converter
- `text-case-converter` — 5-step howToUse covering input, grid browsing, copy, filter, and pin/apply/chain

---

## 2026-05-24 - CSS Animation Generator: 9 new features

Added all 9 features to `CssAnimationGeneratorTool`:
1. **Search** — filter input in sidebar; narrows the 79 animation list by name in real time.
2. **Favorites** — star icon on each animation button (visible on hover); starred items appear in a Favorites section at the top of the sidebar; persisted to localStorage.
3. **Preview element picker** — switch preview between box (default), button, text (`<p>`), or card UI element.
4. **Slow-motion** — ¼×, ½×, 1× speed toggle; divides preview duration only, does not affect exported code.
5. **Dark BG toggle** — switches preview area to `#0f172a` dark background for neon/glow/spotlight animations.
6. **Stagger×3** — shows three preview boxes with staggered delays (0s, 0.18s, 0.36s) to demonstrate stagger patterns.
7. **Combine** — dropdown to pick a second animation; output uses comma-separated `animation` property; both `@keyframes` blocks exported; CSS, Tailwind, and React tabs all handle the combined output.
8. **Download** — `↓ DL` button next to Copy; saves output as `.css`, `.js`, or `.jsx` depending on the active tab.
9. **Edit KF** — fourth tab in the code area; shows an editable textarea seeded with the current `@keyframes` block; custom edits are used in the preview and exported code; resets when you switch animations.

## 2026-05-24 - CSS Animation Generator: color fix + SEO rewrite

- Fixed color contrast: changed code block, bezier value, and copy button text from `#6affd4` (unreadable mint on light bg) to `#0d7a62` (dark teal) in `styles.module.css`.
- Rewrote page.js SEO — corrected animation count from 19 to 79 throughout (title, description, metadata, OG, Twitter, softwareSchema).
- `howToUse` converted from flat string to `{type: 'steps', items: [...]}` format (6 steps covering preset selection, duration/delay, easing + cubic-bezier editor, fill/direction/iterations, preview replay, and export tabs).
- `about.description` rewritten to accurately cover all 79 presets, cubic-bezier visual editor, all 6 controls, and 3 export formats (CSS, Tailwind tailwind.config.js, React inline style).
- `featureList` in softwareSchema expanded from 6 to 8 items.
- `lastmod` updated to `2026-05-24`; `desc` in tools-registry updated to mention 79 animations and cubic-bezier editor.

## 2026-05-24 - tools-registry.js: corrupted character fixes + icon placeholders

- Fixed 6 tool `name` fields where `→`/`↔` had corrupted to `?`: JSON→TypeScript, CSS→Tailwind, Tailwind→CSS, HTML→JSX Converter, REM↔PX Converter, YAML↔JSON, CSV→JSON.
- Fixed 2 `sub` fields: `MD→HTML` (Markdown to HTML), `Epoch→date` (Timestamp Converter).
- Fixed 1 `desc` field: JSON Dashboard Generator (`response ? instant` → `response — instant`).
- Fixed 9 tools with `??` or `M?` icon placeholders — replaced with correct `/icons/<slug>.svg` paths: Password Generator, Pomodoro Timer, Code Screenshot Generator, CSS Button Generator, Toggle Switch Generator, JSON Dashboard Generator, Bookmark Keeper, Daily Diary, Markdown Editor.
- Database Schema Designer moved from `category: 'dev'` to `category: 'learn'`, repositioned after Mind Map Studio in registry so it appears last in the Learn & Think sidebar group.
- Database Schema Designer added to `learn-to-code` category `toolSlugs` in `categories.js`; tagline count updated to 18.
- Database Schema Designer added to `PlaygroundTopNav` as last item (`short: 'DB Schema'`); `PlaygroundTopNav` imported and rendered in `DatabaseSchemaDesignerTool`.

## 2026-05-24 - Blog: 43 new posts for uncovered tools (weeks 72–80)

- Audited all 160+ live tools against existing 355 blog posts — found 43 tools with zero blog coverage.
- Wrote 43 new posts across weeks 72–80 (5 per week, week 80 has 3).
- **Week 72** — CSS clip-path, filter, transform, CSS→Tailwind, CSS minifier/beautifier
- **Week 73** — SQL, MongoDB, Python, Node.js, Express playgrounds
- **Week 74** — Vue, Next.js, GraphQL, Firebase, Redis playgrounds
- **Week 75** — REST API builder, SEO playground, JSON Schema generator, XML formatter, HTML table generator
- **Week 76** — Budget planner, loan payoff, monthly investment, tip calculator, REM↔PX converter
- **Week 77** — Binary/hex/ASCII, date calculator, working days calculator, unit converter, Markdown table generator
- **Week 78** — Reading time calculator, image color palette, freelance rate calculator, availability planner, milestone tracker
- **Week 79** — PDF to Word, PDF metadata, browser notepad, client portal, Tailwind→CSS
- **Week 80** — SVG Motion Studio, Mind Map Studio, Database Schema Designer
- All posts: 1,400–1,800 words, problem-first hook, tool linked twice, `<!-- ad-image-here -->` markers at 2–3 natural breaks.

## 2026-05-25 - SEO content fixed for 15 UI builder, content, and utility tools

Reviewed all 15 tools. Most already had compliant SEO content and were left unchanged. Targeted fixes applied where needed.

**No changes needed** (already compliant — correct about.description word count, steps howToUse, symbol icons):
- `carousel-builder`, `navbar-builder`, `qr-code-generator`, `meta-tag-generator`, `color-picker`

**`about.description` expanded** to 200+ words across 3 paragraphs with `\n\n` separators, `**bold**` emphasis, and backtick inline code:
- `responsive-preview-tool` — expanded from ~160 to 350+ words; added full device preset list with exact pixel dimensions (Mobile S 320×568 through Wide 2K 1920×1080), `?link=` URL param, zoom controls, and canvas background options
- `font-pairing-tool` — expanded from ~140 to 300+ words; added contrast-with-harmony principle, archetype category filter, Google Fonts API live loading, heading/body size sliders, editable sample text, and Export CSS button

**`features` array improved**:
- `font-pairing-tool` — rewrote 10 features to be more specific (curated pair categories, live Google Fonts API loading, size sliders, editable preview, Export CSS)

**useCases emoji icons replaced with symbol glyphs** (◉ ▦ ⬡ ⊞ ⇄ △ ✦ ◑ ⚡ ☁ ⚙):
- `password-generator` — 6 icons: 🔐→◉, 🧠→▦, 📱→⬡, 🔑→⚡, 👥→⇄, 🧒→△
- `pomodoro-timer` — 6 icons: 💻→◉, 📚→▦, ✍→✦, 🎯→⬡, 🏡→⊞, 🔕→△
- `cron-expression-builder` — 6 icons: 🐧→⬡, ☸️→◉, 🐙→▦, ☁️→☁, 🖥️→⚙, 🧠→△
- `lorem-ipsum-generator` — 6 icons: 🎨→◑, 💻→⚡, 📰→▦, 🖥→⊞, 📱→⬡, ✍→△
- `color-contrast-checker` — 6 icons: 🎨→◑, ♿→⬡, 📱→▦, 🖨→⊞, 🌙→◉, 📊→△
- `markdown-editor` — 6 icons: 📄→◉, ✍️→✦, 📝→▦, 🔀→⇄, 📋→⊞, 👩‍💻→△
- `markdown-to-html` — 6 icons: 📄→◉, ✍→✦, 💻→⚡, 📧→⇄, 📚→▦, 🎓→△
- `api-mock-generator` — 6 icons: ⚡→◉, 🧪→⬡, 🚀→⚡, 🔧→▦, 🐛→△, 📦→⇄

---

## 2026-05-24 - Database Schema Designer: full SEO rewrite for search intent

- **Title** updated to target "free online" + all four export formats (SQL, Prisma, Mongoose, Firestore).
- **24 keywords** added covering: "database schema designer online", "erd diagram online free", "prisma schema generator", "mongoose schema generator", "sql ddl generator online", "dbdiagram alternative free", and more.
- **`about.description`** (~700 words, 6 paragraphs) rewritten problem-first — covers visual editor workflow, relationships/indexes, all four export formats with concrete syntax examples (PostgreSQL/MySQL/SQLite DDL, Prisma `schema.prisma`, Mongoose model, Firestore collection), templates, validation, and privacy (browser-only).
- **`features`** expanded to 14 entries with specific SQL/Prisma/Mongoose syntax examples in descriptions.
- **`howToUse`** expanded to 7 detailed steps including `npx prisma migrate dev` guidance.
- **`useCases`** expanded to 7 (added Firestore planning, SQL vs document comparison).
- **`faqs`** expanded from 6 to 13 — covers free?, all export formats, relationships, SQL dialects, indexes, ERD, templates, field types, saving, validation, vs dbdiagram.io, MongoDB/Firestore, and Prisma specifics.
- **`softwareSchema.featureList`** added (was missing entirely).
- `tools-registry.js` `lastmod` updated to 2026-05-24.

## 2026-05-24 - SVG Motion Studio: IndexedDB storage + proper sync merge

- **Replaced localStorage with IndexedDB** for all project data. Gist token/ID remain in localStorage (shared across FWD tools). DB: `sms_db` v1, stores: `projects` (keyPath: `id`), `meta` (key-value for `activeId`, `presets`).
- **Deleted flag on project records** — instead of a separate `deletedIds` array, each project carries `{ deleted: true, updatedAt: <timestamp> }`. Deleted records are kept in IDB/Gist for 30 days (TTL) so deletions propagate across devices, then pruned.
- **`mergeProjects(local, remote)`** — pure timestamp merge: for each project ID, whichever side has the newer `updatedAt` wins. Deleted records travel with the project object so deletes propagate correctly. Replaces the old `mergeProjectArrays` + `deletedIds` array approach.
- **`syncNow` reads from IDB, not React state** — no stale closure issues. Reads `idbGetAll()` + `idbGetMeta(META_ACTIVE)` at fire time, merges with Gist remote, writes merged result back to IDB, pushes to Gist. Pushes full project array including tombstones.
- **`scheduleProjectSync`** — before firing the Gist sync, writes the current canvas state (from `latestStateRef`) to IDB. `latestStateRef` is updated on every render so timeouts always see the freshest state.
- **Mount effect** — loads IDB on mount, sets React state (projects, presets, activeId), applies active project to canvas, then triggers initial Gist sync.
- **Async project CRUD** — `saveProject`, `saveAsNew`, `renameProject`, `confirmDeleteProject` are all async, `await idbPut/idbSetMeta` before scheduling sync. Optimistic React state update happens immediately for instant UI feedback.
- **Custom presets** moved from localStorage to IDB `meta` store.

## 2026-05-24 - SVG Motion Studio: Gist popover redesigned to match BookmarkKeeper

- **Gist popover redesigned** — now matches BookmarkKeeper UI: "GitHub Gist Backup (optional)" header with GitHub icon, numbered setup steps (Create token → Generate on GitHub link, Paste & save, Click Sync Now), visible token/Gist ID fields with "✓ Saved" buttons, "Sync Now" + "Create New Backup" action buttons, status/error messages at bottom. No close button (click-outside dismisses).
- **Added `saveToken()` function** — saves both token and Gist ID to localStorage, sets `tokenSaved` state for "✓ Saved" indicator, shows "Gist settings saved" message.
- **Added `syncFromInputs()` and `createNewBackupFromInputs()`** — matching BookmarkKeeper behaviour: sync uses current input values; create new backup clears stored Gist ID and POSTs a fresh Gist.
- **Inputs pre-filled from localStorage** — `tokenInput` and `gistIdInput` initialize from stored values so the user sees their saved token/ID immediately.
- **`tokenSaved` state** — initializes from localStorage, shows "✓ Saved" on both input save buttons when a token is already stored.
- CSS rewritten to match BookmarkKeeper: `.gistHeader`, `.gistOptional`, `.gistSteps`, `.gistStep`, `.gistStepNum`, `.gistStepBody`, `.gistStepLabel`, `.gistStepDesc`, `.gistExtLink`, `.gistActions`, `.gistLoadBtn`, `.syncMsg` added; removed old `.gistPopoverHead`, `.gistPopoverClose`, `.gistPopoverDesc`, `.gistPopoverActions`.

## 2026-05-24 - SVG Motion Studio: Gist error recovery button

- **"Clear Gist ID" recovery button** — when Gist sync fails with a 403 or 404, a red button appears below the error message in the Gist popover. Clicking it clears the stored Gist ID from state and localStorage, dismisses the error, and causes the next sync to POST a fresh Gist instead of failing on PATCH. Styled to match the error context (red-tinted border and background).
- Styled `.gistClearBtn` in CSS (red-tinted border/background, full width, small text).

## 2026-05-23 - SVG Motion Studio: multi-project library + header/function fixes

- **Multi-project library** — Projects section in sidebar: name input, Save (upsert by ID) and Save as New buttons, scrollable list of all saved projects with Load and Delete per item. Active project highlighted with accent border. Project name shown as a badge next to the tool title in the header.
- **Gist sync updated for multi-project** — `getProject()` packages all local projects as `{ projects: [...], activeProjectId, updatedAt }`; `applyProject()` merges remote projects with local by ID (newer `updatedAt` wins); legacy single-project Gist format still supported via `applySnapshot()` fallback.
- **Renamed export/import functions** — old `saveProject`/`loadProject` (download) renamed to `exportProjectJson`/`importProjectJson`; header "Save JSON" / "Load JSON" buttons updated to call new names.
- **Import now also registers project** — importing a JSON file (single or multi-project) automatically adds the project(s) to the local library and sets active project ID.
- Added `projectBadge`, `projectNameInput`, `projectBtnRow`, `projectList`, `projectItem`, `projectLoad`, `projectDel` CSS in styles.module.css.

## 2026-05-23 - SVG Motion Studio: major feature update

- **GitHub Gist sync** — auto-push on every change (5s debounce), auto-pull on load, 3-min periodic sync. Shared `flt_gist_token` with other FWD tools. Gist panel in header with token input, connect/disconnect, manual sync, and error display.
- **Drag-and-drop layer reorder** — ≡ handle on each layer row; pointer-based DnD with visual drop highlight. Order affects stagger timing and all export outputs.
- **Keyframe copy/paste across layers** — Ctrl+C / Ctrl+V (blocked on input focus) and Keyframe Clipboard buttons in inspector. Pastes replace target layer's keyframes.
- **Custom preset save/load** — My Presets section in sidebar; name + save any keyframe set, apply one-click, delete per item. Persists in localStorage.
- **GSAP ScrollTrigger export tab** — 5th export format alongside CSS/GSAP/Framer/Lottie. Generates gsap.registerPlugin(ScrollTrigger) + configurable scrollTrigger block with toggle actions and scrub mode comment.
- **Lottie JSON export** — 60-fps Lottie JSON mapping translate (as position offset), scale, rotation, and opacity. Download button in export panel and Gist panel. Compatible with lottie-web, iOS, Android.
- **SEO updated** — about, features, howToUse steps, use cases, FAQs all updated to cover all new features. 5 new FAQs added (Gist sync, Lottie, ScrollTrigger, copy/paste, custom presets, layer reorder). Keywords updated. Metadata description updated. `tools-registry.js` desc and lastmod updated.
- Also (earlier in session): hamburger z-index fix (198→201), body+html scroll lock, overflow-x:hidden on html/body, 48 tools-registry icon placeholders replaced with real SVG paths.

## 2026-05-23 - Mind Map Studio: proposal-builder-style sync + SEO + category

- Sync now fires automatically on page load (if token exists), after every map change (5s debounce), and immediately on map delete.
- Deleted map IDs tracked in localStorage (mm_deleted_ids) so they don't reappear after a remote sync.
- syncError state: GitHub button shows a red `!` badge and turns red when the last sync failed; clears on next successful sync.
- Gist payload now wraps maps as `{ maps, deletedIds, updatedAt }` for correct remote delete propagation.
- Added "Learn & Think" category to CATEGORY_META; moved Mind Map Studio from 'productivity' to 'learn'.
- SEO about section expanded with AI-era thinking, learning/understanding new topics, and planning-to-execution paragraphs.
- Added AI/learning/planning use cases; updated keywords and metadata description.

## 2026-05-23 - Mind Map Studio: major feature update

- Multi-map library: create unlimited maps, switch via header tab, rename/duplicate/delete any map.
- Five templates: Blank, Sample, SWOT Analysis, Pros & Cons, Weekly Plan.
- Ctrl+F search overlay: searches node titles and notes across all maps in real time; click to jump.
- Undo/Redo (Ctrl+Z / Ctrl+Y): 60-step history per map, resets on map switch.
- Node notes: each node can carry a longer text note (sidebar editor, dot indicator, searchable, exported in Markdown).
- PNG export added alongside existing Markdown and JSON exports.
- Removed scroll-to-zoom; zoom now only via +/− toolbar buttons.
- GitHub Gist sync upgraded to sync ALL maps together in fwd-mindmaps.json with per-map/per-node merge.
- Deleted orphaned ToolUpdatesPage component and all 160+ per-tool changelog.js data files (AdSense low-value content cleanup).

## 2026-05-23 - Mind Map Studio: new tool launched

- New tool at /mind-map/ — freeform canvas mind mapping with infinite pan/zoom.
- Nodes: click canvas to create, drag to move, click selected to edit inline, Tab → child, Delete → remove.
- Connections: bezier curves drawn by dragging the right-edge handle; drop on node to link, drop on canvas to create+link. Click edge to delete.
- Idea Inbox: left sidebar scratchpad for quick capture; promote items to canvas with → button.
- Eight node colors; edge color inherits from source node for branch identity.
- GitHub Gist sync: same token+popover pattern as Bookmark Keeper; file: fwd-mindmap.json; auto-discover, merge, upload pipeline; background sync every 3 minutes.
- Auto-save to localStorage (400ms debounce); Fit to screen; Markdown + JSON export.
- Full SEO page with FAQ and software schema; tools-registry entry in 'productivity' category.

## 2026-05-22 - SVG Motion Studio: full overhaul (10 new features + UX polish)

- Multi-layer timeline: every layer shown as its own row with track + playhead; no longer single-layer view.
- Per-segment easing: each keyframe stores `segEasing` that sets `animation-timing-function` at that step, enabling different curves per segment.
- Visual bezier curve editor: SVG drag handles for p1/p2 control points; 9 quick-apply presets; opens contextually for global, per-layer, and per-frame easing.
- Filter animations: `blur` and `brightness` keyframe properties; `Glow` and `Blur Out` presets added; CSS `filter:` generated correctly.
- Export tabs: CSS, GSAP (sequential `fromTo` timeline), and Framer Motion (`<motion.tag animate=...>`) — all derived from same keyframe data.
- Preview background toggle: dark / light / checkerboard / custom color picker.
- Motion path: per-layer `motionPath` string; generates `offset-path: path(...)` + `offset-distance 0→100%` animation that composites with transform keyframes.
- Layer visibility (●/○) and lock (⚷/·) toggles — hidden layers get `visibility:hidden` in preview/export; locked layers non-selectable.
- Paste from clipboard button uses `navigator.clipboard.readText()` with SVG detection.
- Playback speed ×0.5 / ×1 / ×2 applied to rAF loop via speed multiplier.
- Shift-drag snaps keyframes to nearest 5% on the timeline.
- Complete CSS rewrite for new classes: tlRow, tlTrack, tlKeyDot, bezierPanel, exportTabs, bgDark/Light/Checker, controlGrid2, easingRow, curveBtn, speedBtn, etc.

## 2026-05-22 - SVG Motion Studio: major feature update (9 capabilities)

- Fixed hydration mismatch on SVG preview div (`suppressHydrationWarning`).
- Rewrote preview to use CSS style-injection (`<style>` ref + negative-delay scrubbing) instead of re-serializing SVG on every rAF tick — smoother playback, preview matches export exactly, enables click-to-select.
- Draggable keyframe diamonds on the timeline (pointer capture API).
- Per-layer easing (`inherit global` or override) and per-layer delay in seconds.
- Stagger slider — offsets each layer's animation start by `i × stagger` seconds.
- Expanded preset library: 20 presets across Entrance / Emphasis / Exit / Draw categories (was 6 presets, flat list).
- Stroke-dash animation: `strokeDash` and `strokeOffset` keyframe properties + Draw On / Draw Off presets.
- Click any element on the canvas to select its layer (bubble-up ID lookup).
- Undo / Redo via Ctrl+Z / Ctrl+Y with full keyframe history.
- Save / Load project as JSON (SVG, layers, keyframes, timing, stagger preserved).

## 2026-05-21 - Firebase Playground: build fix

- Fixed build error in `src/app/firebase-playground/page.js` — inline backtick code markers (e.g. `addDoc()`) inside the template literal `about.description` were terminating the template literal early. Escaped all as `\`addDoc()\`` etc.

---

## 2026-05-20 - Firebase Playground launched

- Created full Firebase Playground tool with in-browser Firestore simulator across 6 files.
- `src/components/FirebasePlaygroundTool/index.js` — React component with `FirestoreDB` class simulator, `makeAPI()` factory exposing full Firestore SDK surface (collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, increment), 12 lessons across 6 chapters (Getting Started, Reading Data, Updating & Deleting, Querying, Special Values, Advanced), live Firestore State tree panel, console output capture, lesson sidebar with chapter grouping, and lesson position persisted to localStorage.
- `src/components/FirebasePlaygroundTool/styles.module.css` — full CSS using `var(--bg)`, `var(--surface)`, `var(--surface2)`, `var(--border)`, `var(--text)`, `var(--text2)`, `var(--text3)` variables; Firebase orange `#FF6D00` accent; 3-column layout (sidebar 240px + main flex:1 + tree panel 280px); responsive at 768px.
- `public/icons/firebase-playground.svg` — flame SVG in Firebase orange `#FF6D00` with amber inner flame.
- `src/app/firebase-playground/page.js` — full SEO page with metadata, 8-FAQ faqSchema, softwareSchema, breadcrumbSchema, seoData (about 800+ words, 16 features, 5 howToUse steps, 6 useCases, 8 FAQs).
- `src/app/firebase-playground/changelog.js` and `updates/page.js` — changelog and updates page.
- Updated `tools-registry.js`, `categories.js` (added to learn-to-code, tagline 14→15), `src/app/page.js` PLAYGROUND_SLUGS, `Sidebar/index.js` PLAYGROUND_SLUGS, `SeoSection/index.js` ALL_PLAYGROUND_SLUGS.

---

## 2026-05-20 - Node.js Playground: SEO content expanded + updates page added

- Expanded `src/app/nodejs-playground/page.js` about section from ~200 words to ~600 words covering all five lessons in depth: event loop scheduling order, Promise executor vs .then timing, async/await microtask resume, readFileSync blocking vs readFile callback, API fetch and response Promise chain.
- Added 3 new FAQs (8 total): process.nextTick vs Promise microtask ordering, readFileSync vs readFile explained visually, Node.js Playground vs Express.js Playground comparison.
- Expanded all existing FAQ answers with practical detail and classroom context.
- Added 6th use case: deterministic classroom/tutorial demos.
- Expanded all 5 howToUse steps with fuller text explaining the step-through controls, queue lanes, and console output connection.
- Updated meta description, OG description, and Twitter description.
- Created `src/app/nodejs-playground/changelog.js` and `updates/page.js`.
- Set `hasUpdates: true` in tools-registry for nodejs-playground.

---

## 2026-05-20 - REST API Builder: light theme + icon fix

- Fixed broken header icon: `src/components/RestApiBuilderTool/index.js` hardcoded `/icons/rest-api-builder.svg` after the tool was renamed to `rest-api-builder-playground`. Updated to `/icons/rest-api-builder-playground.svg`.
- Rewrote `src/components/RestApiBuilderTool/styles.module.css` to use CSS custom properties throughout (`var(--bg)`, `var(--surface)`, `var(--surface2)`, `var(--surface3)`, `var(--border)`, `var(--text)`, `var(--text2)`, `var(--text3)`) instead of hardcoded dark hex values. Tool now correctly switches between light and dark themes with the rest of the app. Blue interactive colors (`#2563eb`, `#60a5fa`), method badge colors, and status code colors retained as-is.
- Added changelog entry in `src/app/rest-api-builder-playground/changelog.js`.

---

## 2026-05-20 - REST API Builder launched

- Added new tool: **REST API Builder** (`/rest-api-builder/`) — a visual mock API builder where users create REST routes, test them with a built-in HTTP client, and export Express.js code. Positioned as a utility tool (not lesson-based), distinct from the Express.js Playground.
- Created `src/components/RestApiBuilderTool/index.js` — full React component with three-panel layout (Route Editor, HTTP Client, Export Code). Route list sidebar with method badges (color-coded GET/POST/PUT/PATCH/DELETE), path, status code, and delete button. Route editor with method pill selector, path input, description, status code with quick-select chips, JSON response body textarea with Format JSON button, response headers textarea, auth required toggle, and 0–2000ms delay slider. Local edit state (unsaved changes stay in form until Save Route is clicked). LocalStorage auto-save on every routes change with key `fwd-rest-api-builder-routes`.
- Route matching engine: `:param` wildcard support — `/users/:id` matches `/users/1` — following Express.js patterns. HTTP client strips query strings before matching, simulates delay, applies auth check, returns mock response with status, headers, body, timing, and matched route path.
- Five CRUD templates: Users CRUD (5 routes), Posts CRUD (5 routes), Products CRUD (5 routes), Blog API (posts/categories/tags), Auth API (login/register/logout/me/refresh). Template dropdown with confirmation before replacing existing routes.
- Export Code tab: Express.js mode generates complete runnable server code with `require('express')`, `app.use(express.json())`, optional `requireAuth` middleware, per-route handlers with delay support, and `app.listen(3000)`. JSON Config mode shows all routes as JSON with copy and download buttons.
- HTTP Client: color-coded status badges (2xx green / 4xx orange / 5xx red), response timing, matched route indicator, simulated delay label, collapsible response headers, JSON body with syntax highlighting via `colorizeJson()`. Auth token input — routes marked `authRequired` return 401 when token is empty.
- `colorizeJson` function implemented locally: keys blue, string values green, booleans amber, null red, numbers purple.
- Created `src/components/RestApiBuilderTool/styles.module.css` — self-contained dark theme CSS, accent `#2563eb` (blue). Method badge colors: GET green, POST blue, PUT amber, PATCH purple, DELETE red. Status code colors: 2xx green, 3xx blue, 4xx orange, 5xx red. Responsive at 768px and 600px (stacked layout).
- Created `src/app/rest-api-builder/page.js` — full SEO page with 8-item FAQ schema, SoftwareApplication schema, BreadcrumbList schema, ~850-word about section, 14 features, 5 how-to steps (type:'steps'), 6 use cases, and 8 FAQs.
- Created `src/app/rest-api-builder/changelog.js` and `updates/page.js` for tool update history.
- Created `public/icons/rest-api-builder.svg` — blue circle with curly braces `{ }` and an arrow route symbol in `#2563eb` / `#60a5fa`.
- Updated `src/lib/tools-registry.js` — added entry after `express-playground` with `accent: '#2563eb'`, `category: 'dev'`, `lastmod: '2026-05-20'`.
- Updated `src/lib/related-tools.js` — added `rest-api-builder` related list; updated `express-playground` list to include `rest-api-builder` as first item.
- Updated `public/llms.txt` — added REST API Builder entry after Express.js Playground in the developer tools section.

---

## 2026-05-20 - Express.js Playground launched

- Added new tool: **Express.js Playground** (`/express-playground/`) — a browser-based interactive Express.js learning environment with a built-in HTTP client panel. The engine simulates Express.js routing and middleware entirely in JavaScript with no Node.js or server required.
- Created `src/components/ExpressPlaygroundTool/express-engine.js` — complete Express.js simulation: route matching with `:param` extraction and regex, middleware chain execution with `next()`, `req`/`res` object construction, query string parsing, built-in middleware factories (`jsonParser`, `cors`, `logger`, `urlencoded`, `authMiddleware`), `app.Router()` with mountable sub-applications, error middleware (4-argument handlers), and `SAMPLE_DB` with users/posts/products. `createExpressApp()` returns a fresh app + deep-cloned DB per execution.
- Created `src/components/ExpressPlaygroundTool/lessons.js` — 32 lessons across 10 chapters: Getting Started, HTTP Methods, Route Parameters, Middleware, Request & Response, REST API Design, Error Handling, Express Router, Authentication, Mini-Projects. Every lesson has `// TEST: METHOD /path` comment for HTTP client auto-fill, `concept` text with **bold**/**`code`** inline formatting, and a `challenge` multiple-choice question.
- Created `src/components/ExpressPlaygroundTool/index.js` — full React component with left-right split pane layout, Express syntax highlighter, HTTP Client panel (method select + path input + JSON body textarea + Send button), colour-coded response panel with status badges (2xx green / 4xx orange / 5xx red), response headers collapsible, spinner loading state, auto-fill method/path from TEST comments, chapter/lesson sidebar, progress tracking, drag-to-resize handle, collapsible concept and challenge widgets, nav footer with Mark Done, toast notifications, keyboard shortcuts (Ctrl+Enter to run, Enter in path to send, Tab for indentation).
- Created `src/components/ExpressPlaygroundTool/styles.module.css` — self-contained CSS module with Node.js green (`#68a063`) accent, dark/light theme support, HTTP client and response panel styles, spinner animation, status badge colour variants.
- Created `src/app/express-playground/page.js` — full SEO page with 8-item FAQ schema, SoftwareApplication schema, BreadcrumbList schema, ~900-word about section, 17 features, 5 how-to steps, 6 use cases, and 8 FAQs.
- Created `src/app/express-playground/changelog.js` and `updates/page.js` for tool update history.
- Created `public/icons/express-playground.svg` — green circle with "Ex" text in Node.js green `#68a063`.
- Updated `src/lib/tools-registry.js` — added entry after `mongo-playground` with `accent: '#68a063'`, `category: 'dev'`, `lastmod: '2026-05-20'`.
- Updated `src/lib/related-tools.js` — added `express-playground` related list; updated `mongo-playground` and `sql-playground` lists to include `express-playground`.
- Updated `src/lib/categories.js` — added `express-playground` to `learn-to-code` toolSlugs (12 total), updated tagline and headline, added Express.js Playground section to about text, updated lesson count FAQ to include Express.
- Updated `src/app/page.js`, `src/components/SeoSection/index.js`, `src/components/Sidebar/index.js` — added `express-playground` to `PLAYGROUND_SLUGS` arrays.
- Updated `public/llms.txt` — added Express.js Playground entry in the playgrounds section.

---

## 2026-05-20 - MongoDB Playground launched

- Added new tool: **MongoDB Playground** (`/mongo-playground/`) — a browser-based interactive MongoDB learning environment powered by a full in-memory JavaScript simulation of the MongoDB query engine. No server, no install required.
- Created `src/components/MongoPlaygroundTool/mongo-engine.js` — complete MongoDB simulation: `matchesFilter()` with all comparison/logical/array operators, `MongoCursor` with `.sort()/.limit()/.skip()/.project()/.toArray()`, `MongoCollection` (find, findOne, countDocuments, distinct, insertOne/Many, updateOne/Many/replaceOne, deleteOne/Many, aggregate, drop), `applyUpdate()` with 11 update operators, `runAggregationStage()` with 12 pipeline stages, `evaluateExpr()` for pipeline expressions, and 4 sample collections with 38 total documents.
- Created `src/components/MongoPlaygroundTool/lessons.js` — 32 lessons across 10 chapters: Getting Started, Comparison Operators, Logical Operators, Projection, Sort/Limit/Skip, Array Queries, Update Operations, Delete & Insert, Aggregation Basics, Advanced Aggregation. Every lesson has `concept` text with **bold**/**`code`** formatting and a `challenge` multiple-choice question.
- Created `src/components/MongoPlaygroundTool/index.js` — full React component with split-pane editor/results layout, Mongo syntax highlighter, JSON colorizer for results, chapter/lesson sidebar, progress tracking, drag-to-resize handle, Collections panel, collapsible concept and challenge widgets, nav footer with Mark Done, toast notifications, and keyboard shortcut (Ctrl+Enter).
- Created `src/components/MongoPlaygroundTool/styles.module.css` — self-contained CSS module with MongoDB green (`#00ed64`) accent, dark/light theme support via CSS custom properties.
- Created `src/app/mongo-playground/page.js` — full SEO page with 8-item FAQ schema, SoftwareApplication schema, BreadcrumbList schema, 300-word about section, 16 features, 6 how-to steps, 6 use cases, and 8 FAQs.
- Created `public/icons/mongo-playground.svg` — MongoDB-style leaf/drop icon in `#00ed64` green.
- Updated `src/lib/tools-registry.js` — added entry with `accent: '#00ed64'`, `category: 'dev'`, `lastmod: '2026-05-20'`.
- Updated `src/lib/related-tools.js` — added `mongo-playground` related list; updated `sql-playground` list to include `mongo-playground`.
- Updated `src/lib/categories.js` — added `mongo-playground` to `learn-to-code` toolSlugs, updated tagline to 11 playgrounds, added MongoDB Playground section to about text, updated lesson count FAQ.

---

## 2026-05-20 - SVG Motion Studio launched

- Set `status: 'live'` in tools-registry.
- Expanded SEO page: about text from ~140 words to ~450 words across 5 paragraphs covering the layer system, presets, export options, and privacy.
- Converted `howToUse` from flat string to `type: 'steps'` format (5 steps).
- Expanded use cases from 4 to 6 (added icon sets, quick exploration).
- Expanded FAQs from 5 to 8 (added animatable properties detail, multi-layer, and best SVG file types).
- Total SEO content now well above 800-word threshold.

---

## 2026-05-20 - Vue.js Playground — curriculum expansion + enhancements

- Expanded from 28 to **40 lessons** across **13 chapters** (added Setup Function, Advanced Patterns, Mini-Projects).
- New Setup Function chapter: prop validation with runtime types, emits pattern via `setup(props, { emit })`, template refs + `onMounted`.
- New Advanced Patterns chapter: Teleport (modal escape from overflow:hidden), custom directives (v-focus / v-highlight / v-tooltip), v-memo for list optimisation, defineAsyncComponent + Suspense.
- New Mini-Projects chapter: full Todo App with localStorage persistence, Searchable/Sortable Table, Theme Switcher using provide/inject, and a Multi-step Form Wizard with per-step validation.
- **Picker lessons**: Options API vs Composition API comparison — pill buttons toggle between code variants in place.
- **Share button**: encodes current editor code to base64 URL (`?c=`), copies to clipboard. Restored on page load.
- **Vue warning hints**: parses `[Vue warn]` messages from the iframe and shows a contextual tip below the editor.
- **Quick Check collapsible**: challenge widget now closed by default, expands on click with chevron animation.
- Created `src/app/vue-playground/changelog.js`.
- Updated tools-registry `lastmod` to 2026-05-20, `sub` line, `desc`, and `hasUpdates: true`.

---

## 2026-05-19 - Vue.js Playground launched

- Added new tool: Vue.js Playground (`/vue-playground/`) — a lesson-based interactive Vue 3 learning environment powered by Vue 3 CDN running in a sandboxed iframe.
- Created 32 lessons across 10 chapters: Getting Started, Template Directives, Computed & Watch, Class & Style, Components, Lifecycle Hooks, Composition API, Component Patterns, Forms, and Advanced Vue.
- Covers both Options API (data, methods, computed, watch) and Composition API (ref, reactive, watchEffect, composables).
- All six core directives: v-bind, v-if, v-show, v-for, v-on, v-model — each with interactive examples.
- Vue 3 patches `createApp` inside each run to track and unmount previous instances cleanly.
- Quick Check challenge question on every lesson.
- Reuses React Playground's styles.module.css for layout consistency.
- Added to learn-to-code category (now 9 playgrounds), related tools, tools-registry, and DEVLOG.
- Full SEO page with 8 FAQs, SoftwareApplication + BreadcrumbList + FAQPage schema.

---

## 2026-05-19 - SQL Playground launched

- Added new tool: SQL Playground (`/sql-playground/`) — a lesson-based interactive SQL learning environment powered by real PostgreSQL running in the browser via PGlite (WebAssembly).
- Created 35 lessons across 9 chapters: Basics, Filtering, Sorting & Limiting, Aggregations, Joins, Subqueries, CTEs, Window Functions, and PostgreSQL Extras.
- Pre-loaded a 4-table dataset (employees, departments, projects, assignments) with realistic data used consistently across all lessons.
- Built SQL syntax highlighter covering keywords, functions, types, strings, numbers, and comments.
- Results table with row count, execution time display, and CSV export.
- Schema explorer in sidebar showing all tables with column names and PostgreSQL data types.
- Progress tracking via localStorage (completed lessons + current position restored on return).
- Vertical drag handle to resize editor/results split.
- Full SEO page with 10 FAQs, SoftwareApplication schema, breadcrumb schema, and 800+ words of copy.
- Tool loads PGlite from jsDelivr CDN (no npm install, no webpack WASM config needed).

---

## 2026-05-18 - GSAP Playground all-plugin curriculum expansion

- Expanded GSAP Playground from 40 to 55 lessons and from 13 to 18 chapters.
- Added plugin-focused chapters for Interaction Plugins, Text Plugins, SVG Plugins, Physics & Ease Plugins, and Helper & Integration Plugins.
- Added official GSAP plugin files from the installed `gsap` package into `public/js` and refactored the iframe loader to inline/register all available plugin globals.
- Added lessons for Draggable, Observer, InertiaPlugin, SplitText, TextPlugin, ScrambleTextPlugin, DrawSVGPlugin, MorphSVGPlugin, CSSRulePlugin, CustomBounce, CustomWiggle, Physics2DPlugin, PhysicsPropsPlugin, EasePack, ScrollSmoother, MotionPathHelper, GSDevTools, PixiPlugin, and EaselPlugin.
- Expanded the ScrollSmoother lesson with a scrollable long-form mock page, lorem ipsum content sections, and a parallax-style visual so the smooth-scroll use case has enough page depth to inspect.
- Revised the ScrollSmoother lesson to use the preview pane's normal page scroll instead of a nested scroll container, making the long-form sections visible as users scroll the preview.
- Updated GSAP page metadata, schema copy, category copy, tool registry text, and changelog to reflect the new 55-lesson official plugin coverage.
- Verification was limited to module import/count checks; no dev server or build was run.

---

## 2026-05-18 - GSAP Playground ScrollTo button contrast fix

- Fixed the ScrollToPlugin preview controls so `.btn` buttons inside `#controls` keep their primary button background instead of being overridden by the generic `#controls button` style.
- This resolves the low-contrast white text on near-white button shown in the ScrollToPlugin lesson.
- Moved the ScrollToPlugin "Back to top" button into the lower scroll target area so it appears near where the user lands after scrolling down.

---

## 2026-05-18 - Next.js Playground tool, fixes, and SEO/testing cleanup

- Added `/nextjs-playground/` with `NextjsPlaygroundTool`, CSS module, route page, and `/icons/nextjs-playground.svg`.
- Playground supports App Router-style tabs for `app/page.jsx`, `app/layout.jsx`, `app/globals.css`, and `app/api/hello/route.js`, with live iframe preview, console capture, responsive preview sizes, local autosave, template reset, API route test panel, copy file, and ZIP export.
- Fixed the sandbox `fetch('/api/hello')` runtime error by resolving relative URLs against a stable fake origin instead of `about:srcdoc`.
- Fixed Export ZIP `ChunkLoadError` by statically importing `jszip` instead of lazy-loading a separate browser chunk.
- Removed the visible Share button and removed stale share-link copy from the Next.js page, registry copy, and category text.
- Brought the page in line with project SEO instructions: `FAQPage`, `SoftwareApplication`, `BreadcrumbList`, and `HowTo` JSON-LD; 8 search-intent FAQs; 10 feature bullets; 6 SVG-icon use cases; contextual internal links; expanded multi-paragraph SEO copy.
- Set the new tool to `testing` mode and `robots: { index: false, follow: false }` per project rule for new tools. Public homepage and Learn to Code category copy remain at six live playgrounds until this tool is explicitly promoted.
- Verification was limited to file/text consistency checks after the final SEO pass; no build or dev server was run for this final continuation, following project memory.

---

## 2026-05-17 — JS Playground: auto-run toggle

- Added Auto-run toggle button to editor toolbar (green = on, grey = off)
- Auto-run debounce bumped from 300ms to 800ms — re-runs code 800ms after typing stops
- Toggle defaults to on; disabling it lets users run manually via Refresh or Ctrl+Enter
- `iconBtnActive` CSS class added to shared styles for green active state

---

## 2026-05-17 — All playgrounds gap analysis: new chapters across JS, Tailwind, GSAP, HTML

**JS Playground: 42 → 56 lessons (+6 new chapters)**
- Generators: `function*`, `yield`, infinite sequences, custom `Symbol.iterator` iterators
- Modern Methods: `Array.at()`, `Object.hasOwn()`, `Object.groupBy()`, `structuredClone()`
- Regex: patterns & flags, named groups, replace + transform patterns (slug, masking, title case)
- AbortController: cancelling fetch with signal, `AbortSignal.timeout()` built-in pattern
- Observers: `IntersectionObserver` (scroll reveal), `ResizeObserver` (container-aware layout)
- Proxy & Reflect: traps with type-checking validation, reactive state counter powered by Proxy

**Tailwind Playground: 38 → 45+ lessons (+1 new chapter "Advanced Patterns")**
- Arbitrary variants: `[&>li]:`, `[&:nth-child(odd)]:`, `[&_span]:` child/descendant selectors
- `has-*` modifier: label lights up on checked checkbox, focus ring from inner input focus
- `@layer` with Tailwind: components layer, utilities layer, cascade order explanation
- `motion-safe:` / `motion-reduce:` for accessible animations respecting OS preference
- Print styles: `print:hidden`, `print:block`, `screen:` modifier, invoice demo
- Skeleton loading: `animate-pulse` placeholders mirroring real card layout
- Dialog & Popover: native `<dialog>` + `showModal()`, native `popover="auto"` API

**GSAP Playground: 33 → 37 lessons (+2 new chapters)**
- GSAP Utils: `clamp`, `wrap`, `mapRange` driven by mouse position; `interpolate` colour blending; `toArray`
- Responsive: `gsap.matchMedia()` for breakpoint-specific animations with auto-revert; `prefers-reduced-motion` fallback pattern

**HTML Playground (previous session)**
- Responsive Images chapter: `<picture>` + `srcset`, `loading="lazy"` + `fetchpriority`
- Native Components chapter: `<dialog>`, inline SVG with CSS animation, ARIA landmark roles

---

## 2026-05-17 — CSS & React Playgrounds: pro-level lessons added

**React Playground: 31 → 53 lessons, 11 → 19 chapters**
- Forms: Controlled inputs, Uncontrolled inputs & useRef
- Error Handling: Error Boundaries (class component, getDerivedStateFromError)
- Portals: ReactDOM.createPortal with live modal demo
- Keys & Reconciliation: stable ID vs index key — interactive shuffle demo shows state loss
- Advanced Patterns: Compound components (Tabs with Context), Render props
- Suspense & Concurrent: React.lazy + Suspense, useTransition with 5000-item filter
- Testing: behaviour-based testing mindset with tiny in-browser test runner

**CSS Playground: 37 → 50+ lessons, 11 → 16 chapters**
- Modern Selectors: :is()/:where()/:has(), CSS nesting with native &
- Modern Layout: Container queries (@container), Subgrid, Scroll snap
- Cascade & Layers: @layer cascade control, Logical properties (margin-inline etc.)
- Visual Effects: Blend modes + backdrop-filter glassmorphism, Scroll-driven animations (animation-timeline)
- Advanced Variables: @property registered properties, Modern units (dvh, cqi, clamp())

---

## 2026-05-17 — GSAP Playground: polish, housekeeping, quick wins

**Polish:**
- Speed control buttons (¼×, 1×, 2×) in preview header — sends `timeScale` to iframe
- Markers toggle button (scroll lessons only) — uses `ScrollTrigger.defaults({ markers })` and reruns code
- Speed + markers reset on every lesson switch
- `resetScene()` now resets `timeScale(1)` before clearing tweens

**New lessons (3):**
- `scroll-toggle-class` — `ScrollTrigger.create` + `toggleClass` with CSS transitions
- Updated `scroll-basics` concept to cover `toggleActions` with Quick Check challenge

**Quick wins:**
- Renamed lesson id `draw-svg` → `animated-counter`
- ScrollTrigger target now deep below fold (700px spacer + 800px bottom padding)
- `scroll-zone` hides completely for non-scroll scenes via `applyScene()`

**Housekeeping:**
- `learn-to-code` categories.js `about` text updated — added GSAP Playground section
- "five playgrounds" → "six playgrounds" in FAQ answer
- Added GSAP use-case card to `useCases` array
- Sitemap + llms.txt: auto-generated from registry on next build (gsap-playground already in registry with `status: live`)

---

## 2026-05-17 — GSAP Playground: new tool (32 lessons, 10 chapters)

**New tool:** `/gsap-playground/` — interactive GSAP animation learning playground.

- `src/components/GsapPlaygroundTool/index.js` — main component (live editor + iframe preview with GSAP CDN, Replay button, syntax highlighting for `gsap`/`ScrollTrigger` keywords, progress saved to localStorage)
- `src/components/GsapPlaygroundTool/lessons.js` — 32 lessons across 10 chapters: Getting Started, Properties, Easing, Timelines, Stagger, Repeat & Yoyo, Callbacks, ScrollTrigger, Keyframes, Real Patterns
- `src/components/GsapPlaygroundTool/styles.module.css` — green accent theme (`#16a34a` light / `#88ce02` dark)
- `src/app/gsap-playground/page.js` — full SEO page with FAQ + schema
- `src/app/gsap-playground/changelog.js` — v1.0.0 entry
- `public/icons/gsap-playground.svg` — green GSAP icon
- Registry entry added (slug: `gsap-playground`, accent: `#88ce02`)
- Added to `learn-to-code` category in categories.js (6 tools now)
- **React playground updated:** 3 new lessons in "GSAP in React" chapter (useRef, timeline on mount, ScrollTrigger); GSAP CDN loaded in React iframe; ScrollTrigger auto-registered

---

## 2026-05-17 — Accent color contrast fix: all tools (light theme WCAG compliance)

**Problem:** 89 text color usages of low-contrast accent colors (`#818cf8` ~2.2:1, `#a78bfa` ~1.9:1, `#a855f7` ~3.3:1, `#8b5cf6` ~3.5:1) in 28 component CSS files — all invisible/hard to read on light background.

**Solution:** Added theme-aware CSS variables in `globals.css`:
- `--clr-indigo`: `#4f46e5` light / `#818cf8` dark
- `--clr-violet`: `#7c3aed` light / `#a78bfa` dark
- `--clr-purple`: `#7c3aed` light / `#a855f7` dark
- `--clr-violet-dk`: `#6d28d9` light / `#8b5cf6` dark

Bulk-replaced all `color: #818cf8/a78bfa/a855f7/8b5cf6` → `color: var(--clr-*)` across all 28 affected CSS modules. Dark mode stays identical via CSS variable cascade. `lastmod` updated in tools-registry for all 28 tools.

**Tools fixed:** AiPromptStudio, AustraliaTakeHome, BookmarkKeeper, CarouselBuilder, CssAutoprefixer, CssButtonGenerator, CssClampGenerator, CssClipPathGenerator, CssEasingGenerator, CssFilterGenerator, CssGridBuilder, CssTransformGenerator, DailyDiary, GlassmorphismGenerator, ImageToText, InflationCalculator, JwtDecoder, LoanPayoff, LoremIpsumGenerator, MeshGradientGenerator, MiniKanban, MonthlyInvestment, PasswordGenerator, PaycheckCalculator, QrCodeGenerator, RetirementCalculator, TextCaseConverter, UKTakeHome, VatCalculatorUk, XmlFormatter

---

## 2026-05-17 — Comprehensive light-theme audit: dark backgrounds, bad select styles, undefined CSS vars

**Dark backgrounds fixed (code/editor areas):**
- `CssMinifierBeautifierTool` — `.editor` and `.output` hardcoded `#1e1e2e` → `var(--surface2)` + `var(--text)`
- `TailwindToCssTool` — code highlight overlay `#1e1e2e` → `var(--surface2)`
- `CarouselBuilderTool` — `.previewCodeBody` and `.codeBody` → `var(--surface2)`; `.codePre` text → `var(--text)`
- `CssButtonGeneratorTool` — `.presetPreview` `#1a1a2e` → `var(--surface3)`
- `RegexTesterTool` — `.logoIcon` `#0f172a` → `var(--surface2)`
- `HtmlToJsxConverterTool` — full CSS rewrite (see earlier entry)
- `LineUtilitiesTool` — full CSS rewrite (see earlier entry)

**Select / option / color-scheme fixes:**
- `CanadaTakeHomeCalculatorTool` — `color-scheme:dark` → `light dark`; option backgrounds → CSS vars
- `NetWorthCalculatorTool` — same
- `RetirementCalculatorTool` — same
- `TipCalculatorTool`, `SalaryToHourlyTool`, `GstCalculatorTool`, `VatCalculatorUkTool`, `CreditCardPayoffTool`, `LoanPayoffTool` — currency select/option dark backgrounds → CSS vars
- `BudgetPlannerTool` — option backgrounds + `color-scheme:dark` → `light dark`

**Syntax highlighter token colors fixed (were invisible on light bg):**
- `CssAutoprefixerTool` — added dark-readable defaults for all 8 token classes (`tokSelector`, `tokProperty`, `tokString`, `tokNumber`, `tokColor`, `tokAtRule`, `tokPunct`); dark mode gets original light VS Code colors back. Also fixed `.highlightLayer` color.
- `CssClampGeneratorTool` — same for `.cProp`, `.cVal`, `.cStr`, `.cKey`
- `HtmlToJsxConverterTool` — switched from inline `style="color:#9cdcfe"` to CSS classes (`hj-*`) with light+dark variants in `globals.css`

**Undefined `var(--text-muted)` → `var(--text2)` in 32+ files** (was silently falling back to inherit everywhere)

---

## 2026-05-17 — Internal linking: All freelancer tools ↔ Playground tools

Extended internal linking to the remaining 11 freelancer tools (client-crm, proposal-builder, contract-template-manager, scope-creep-tracker, follow-up-reminder-board, local-invoice-tracker, retainer-tracker, milestone-payment-tracker, client-intake-form-builder, client-portal-lite, resume-builder). All now link to the React Playground, CSS Playground, and HTML Playground in their about sections. Updated lastmod and changelog for all 11.

---

## 2026-05-17 — Internal linking: Freelancer tools ↔ Playground tools

- Added cross-linking between all 5 freelancer tools and all 4 playground tools in the `about.description` of each page
- **Playground → Freelancer:** html-playground, css-playground, tailwind-playground, react-playground each link to the Freelance Rate Calculator and Freelance Invoice Generator (or Freelance Dashboard for Tailwind) in their about section
- **Freelancer → Playground:** freelance-rate-calculator, freelance-invoice-generator, freelance-dashboard, freelance-expense-tracker, freelance-availability-planner each link to the React Playground, CSS Playground, and HTML Playground
- Updated `lastmod` to 2026-05-17 for all 9 tools in tools-registry.js
- Added changelog entries to all 9 tools' changelog.js files

---

## 2026-05-16 — New Tool: Tailwind Playground (`/tailwind-playground/`)

- Built complete interactive Tailwind CSS learning tool from scratch
- 29 lessons across 9 chapters: Foundations, Typography, Spacing, Sizing, Flexbox, CSS Grid, Borders & Effects, Transitions & Animation, Responsive Design
- Live HTML editor with Tailwind Play CDN (JIT) — all utility classes including arbitrary values work without a build step
- HTML syntax highlighting in the editor
- Dark mode toggle — adds/removes `dark` class from preview `<html>` element to activate `dark:` modifiers
- Responsive preview sizes — 📱 375px, 💻 768px, 🖥 full width
- Drag handle to resize editor/preview ratio
- Quick Check challenges on 7 lessons with persistent completion (localStorage)
- Confetti on chapter completion, Copy HTML, Download (.html), lesson search
- Full SEO: FAQPage, SoftwareApplication, BreadcrumbList schemas; 8 FAQs, 6 use-case cards
- Registry entry, PLAYGROUND_SLUGS, related-tools, llms.txt updated

---

## 2026-05-16 — New Tool: CSS Playground (`/css-playground/`)

- Built complete interactive CSS learning tool from scratch
- 28 lessons across 8 chapters: Selectors, Colors, Typography, Box Model, Layout Basics, Flexbox, CSS Grid, Animations
- Live split-pane editor: CSS + HTML editors (tab-switched) with sandboxed iframe preview updating at 150ms debounce
- CSS syntax highlighting: at-rules purple, .class blue, #id red, :pseudo cyan, property names blue, hex colours green, numbers red, strings amber
- HTML syntax highlighting in the HTML tab (reuses hl-* colour scheme)
- Drag handle to resize editor/preview ratio (25–75%)
- Tab key support for indentation in both editors
- Quick Check challenges on 8 lessons with active-recall multiple-choice questions
- Confetti on completing all lessons in a chapter
- Reset (restore defaults), Copy CSS, Download (.html) toolbar actions
- Lesson search/filter, collapsible sidebar, collapsible concept panel
- Progress and position saved to localStorage; mobile-responsive stacked layout
- Added CP (CSS Playground) highlight classes to globals.css
- Registry entry, home PLAYGROUND_SLUGS, llms.txt, changelog.js added

---

## 2026-05-16 — HTML Playground UI/UX improvements (`/html-playground/`)

Implemented 8 UI/UX improvements to the HTML Playground tool.

**Features added:**
- **Syntax highlighting** — `highlightHTML()` tokenizer colours tags (orange), attributes (blue), values (green), and plain text in the code panel via `dangerouslySetInnerHTML`
- **Changed-line flash** — `useEffect` diffs lines on `previewHtml` change; differing lines get an orange flash animation (`lineFlash` keyframe, 0.8s)
- **Confetti on chapter complete** — `launchConfetti()` fires when the last lesson in a chapter is newly completed inside `selectLesson`
- **Draggable split pane** — replaced `grid-template-columns: 1fr 1fr` with a flex layout; `splitHandle` div between panes responds to `mousedown` + `mousemove` to update `splitPct` state (clamped 20%–80%)
- **Arrow key navigation** — `PickerDemo` adds `keydown` listener for `ArrowLeft`/`ArrowRight` to cycle options; keyboard hint `kbd` row shown below buttons
- **Note callout** — notes replaced with `noteCallout` div (orange left border, light orange bg, 💡 icon) instead of italic `demoNote`
- **Lesson fade-in** — `lessonContent` wrapper with `key={activeLessonId}` triggers `lessonFadeIn` animation (opacity 0→1, translateY 6px→0, 0.2s)
- **Challenge mode** — `ChallengeWidget` component; challenges added to headings, formatting, and links lessons in `lessons.js`; shows after the user has interacted (previewHtml set) and hides when answered correctly

**Files updated:**
- `src/components/HtmlPlaygroundTool/index.js` — full rewrite with all 8 features; added `useRef` import
- `src/components/HtmlPlaygroundTool/styles.module.css` — outputSection changed to flex; added splitHandle, codeLine, noteCallout, keyboardHint, lessonContent, challengeBox CSS; responsive section updated
- `src/components/HtmlPlaygroundTool/lessons.js` — `challenge` field added to headings, formatting, links lessons
- `src/app/globals.css` — added `.hl-*` syntax highlight classes for HTML Playground
- `src/app/html-playground/changelog.js` — new entry added

---

## 2026-05-16 — New Tool: HTML Playground (`/html-playground/`)

Added a complete interactive HTML learning tool at `/html-playground/`.

**Files created:**
- `src/components/HtmlPlaygroundTool/lessons.js` — 7 chapters, 16 lessons as structured data (picker / toggle / sandbox demo types)
- `src/components/HtmlPlaygroundTool/index.js` — main `'use client'` component with sidebar, lesson nav, live iframe preview, and code panel
- `src/components/HtmlPlaygroundTool/styles.module.css` — full CSS Modules styles using design token vars
- `src/app/html-playground/page.js` — Next.js page with full metadata, OpenGraph, and SeoSection props
- `public/icons/html-playground.svg` — orange `</>` monospace icon

**Files updated:**
- `src/lib/tools-registry.js` — added `html-playground` entry in the `dev` category (before `html-table-generator`)

**Key design decisions:**
- Three demo types: `picker` (click to select HTML snippets), `toggle` (multi-select to layer formatting tags), `sandbox` (free-form textarea with live render)
- Preview uses `data:text/html` iframe with `sandbox="allow-same-origin"` — pure HTML/CSS, no scripts
- Progress saved to `localStorage` under key `wdp-html-playground-progress`
- Sidebar collapses at ≤768px; output grid goes single-column on mobile

---

## 2026-05-16 — Changelog and SEO updates for FreelanceInvoiceGenerator and ResumeBuilder

- Updated `src/app/freelance-invoice-generator/changelog.js`: expanded 2026-05-16 entry to include delete-log sync fix, custom delete modal, and template picker move
- Updated `src/app/resume-builder/changelog.js`: clarified 2026-05-16 entry to highlight `updatedAt` bidirectional sync fix
- Added GitHub Gist Backup feature item and FAQ (multi-device access) to `src/app/freelance-invoice-generator/page.js`
- Added GitHub Gist Backup feature item and FAQ (multi-device access) to `src/app/resume-builder/page.js`
- `lastmod` already at `2026-05-16` for both tools in `tools-registry.js`

---

## 2026-05-16 — FreelanceInvoiceGenerator: delete fix, confirm modal, template picker moved

- Fixed deleted invoices reappearing after Gist sync — added 7-day delete log (`flt_del_freelance-invoice-generator`) stored in localStorage and included in Gist payload; deleted IDs are filtered on every merge
- Replaced `window.confirm` with a custom styled confirmation modal (Cancel / Delete buttons, overlay backdrop)
- Moved template picker to the top of the left panel; changed layout from row to column (label above, horizontal scrollable cards below with thin scrollbar)
- ResumeBuilder sync fix: stamp `updatedAt` on every auto-save so bidirectional `updatedAt` comparison works correctly; newer side always wins without overwriting local data

---

## 2026-05-16 — GitHub Gist backup added to FreelanceInvoiceGenerator and ResumeBuilder

Added the same GitHub Gist backup pattern (matching BookmarkKeeperTool) to two components:

**FreelanceInvoiceGenerator** (`src/components/FreelanceInvoiceGenerator/index.js`):
- Module-level Gist helper functions (`gistPush`, `gistFetch`, `gistFind`) + constants (`LS_GIST_TOKEN_KEY`, `LS_GIST_ID_KEY`, `GIST_FILE_NAME`, debounce/interval values).
- Component state: `gistToken`, `gistId`, `showGist`, `syncing`, `syncMsg`, `lastSynced`, `tokenInput`, `gistIdInput`, `tokenSaved`, `gistPopoverRef`, `syncTimeoutRef`.
- `syncNow`: fetches remote, merges invoice lists by id (local wins for matching IDs), writes storage, updates invList state, pushes merged list back to Gist.
- `triggerDebouncedSync`, `saveToken`, `syncFromInputs`, `createNewBackup` helper functions.
- 4 new useEffects: load credentials, close popover on outside click, auto-sync every 3 min, cleanup debounce on unmount.
- `triggerDebouncedSync()` called at end of existing auto-save useEffect.
- Gist UI (quick-sync button + GitHub icon toggle + popover) added to `.toolbarRight`.

**ResumeBuilder** (`src/components/ResumeBuilder/index.js`):
- Same module-level helpers and constants (different `LS_GIST_ID_KEY` and `GIST_FILE_NAME`).
- Same state and useEffects pattern.
- `syncNow`: compares `updatedAt` timestamps — remote wins if newer and applies all fields to React state; always writes `updatedAt: new Date().toISOString()` before pushing.
- `triggerDebouncedSync()` called inside the try block of the auto-save useEffect.
- Same Gist UI added to `.toolbarRight`.

Both `styles.module.css` files updated with the full Gist CSS block (`.gistAnchor`, `.gistIconBtn`, `.gistPopover`, etc.).
Changelogs and registry `lastmod` updated for both tools.

---

## 2026-05-15 - Moved 12 new tools from `new/` folder into main project (status: testing)

Moved all 12 tools from the `new/` staging folder into the main project with `status: 'testing'` in the registry so they can be verified in builds before going live.

**Tools added (all status: testing):**
- `binary-hex-ascii` — Binary / Hex / ASCII Converter (dev, new component)
- `freelance-rate-calculator` — Freelance Rate Calculator (productivity, new component)
- `html-table-generator` — HTML Table Generator (dev, new component)
- `image-color-palette` — Image Color Palette Extractor (design, new component)
- `json-schema-generator` — JSON Schema Generator (dev, new component)
- `markdown-table-generator` — Markdown Table Generator (dev, new component)
- `reading-time-calculator` — Reading Time Calculator (text, new component)
- `working-days-calculator` — Working Days Calculator (productivity, new component)
- `xml-formatter` — XML Formatter / Validator (dev, new component)
- `client-crm` — Client CRM (productivity, uses FreelancerLocalTools)
- `client-intake-form-builder` — Client Intake Form Builder (productivity, uses FreelancerLocalTools)
- `client-portal-lite` — Client Portal Lite (productivity, uses FreelancerLocalTools)

**For each tool with a new component:** copied `new/components/<Name>Tool/` → `src/components/<Name>Tool/`, app pages → `src/app/<slug>/`, icons → `public/icons/<slug>.svg`.

**Bug fixed:** All new page.js files had `howToSchema` referencing `SEO` before `SEO` was defined (temporal dead zone). Fixed by moving `SEO` const before `howToSchema` in all 8 affected pages.

---

## 2026-05-15 - Added GitHub Gist backup SEO to 12 FreelancerLocalTools pages

Added GitHub Gist backup feature entry and multi-device FAQ to the SEO content of all 12 tools that share the `FreelancerLocalTools` component. Updated `lastmod` to `2026-05-15` in tools-registry.js for all 12 tools.

**Tools updated (features array + faqs array):**
- `freelance-expense-tracker` — added GitHub Gist Backup feature bullet + "Can I access my data on multiple devices?" FAQ
- `freelance-availability-planner` — same
- `client-crm` — same
- `time-tracker` — same (already had Gist in features/FAQs; added new multi-device FAQ and feature object)
- `contract-template-manager` — same
- `scope-creep-tracker` — same
- `follow-up-reminder-board` — same
- `local-invoice-tracker` — same
- `retainer-tracker` — same
- `milestone-payment-tracker` — same
- `client-intake-form-builder` — same
- `client-portal-lite` — same

---

## 2026-05-14 - New tool: XML Formatter / Validator

Added the XML Formatter / Validator tool (`/xml-formatter/`).

- `src/components/XmlFormatterTool/index.js` — pure-JS XML tokenizer/formatter/validator/minifier (no npm deps); handles open tags, close tags, self-closing tags, comments, CDATA sections, processing instructions, and text nodes
- `src/components/XmlFormatterTool/styles.module.css` — dark/light-theme CSS module with two-panel layout and syntax highlight color classes
- `src/app/xml-formatter/page.js` — full SEO page with 800+ word about section, 8 FAQ entries, SoftwareApplication + BreadcrumbList + FAQPage JSON-LD schemas, 15 keywords
- `src/app/xml-formatter/changelog.js` + `updates/page.js` — update log page
- `public/icons/xml-formatter.svg` — teal `</>` icon
- `src/lib/tools-registry.js` — inserted `xml-formatter` entry (category: dev, extended: true) before yaml-json-converter

Features: Format (pretty-print with configurable 2-space/4-space/tab indent), Minify, Validate with line+col error reporting, syntax highlighting (tags, attributes, values, comments, CDATA, PI), Copy, Download, Sample button, privacy note.

---

## 2026-05-14 - High-priority SEO generator upgrades and per-tool update logs

Implemented the requested high-priority improvements across the SEO generator tools:
- `SitemapGeneratorTool`: added diagnostics, per-URL pipe syntax (`URL | lastmod | changefreq | priority`), XML import from the editor, Next.js App Router sitemap export, URL preview rows, and a ZIP launch pack.
- `RobotsTxtGeneratorTool`: added diagnostics, path crawl tester, clipboard import for existing robots.txt, Next.js App Router robots export, and a ZIP launch pack.
- `MetaTagGeneratorTool`: added diagnostics for title/description/canonical/OG image issues, OG image dimension checks, clipboard import for existing meta blocks, safer escaped exports, normalized Twitter handles, more accurate JSON-LD by page type, and a ZIP launch pack.
- `SchemaMarkupGeneratorTool`: added BreadcrumbList, Organization, Person, VideoObject, HowTo, and SoftwareApplication schema types; optional WebSite SearchAction; clipboard JSON-LD import; richer warnings; and a ZIP launch pack.

Updated per-tool changelogs so `/sitemap-generator/updates/`, `/robots-txt-generator/updates/`, `/meta-tag-generator/updates/`, `/schema-markup-generator/updates/`, `/htaccess-redirect-generator/updates/`, `/hreflang-tag-generator/updates/`, and `/llms-txt-generator/updates/` show the updates made in this session. Verified all changed JS/changelog files with `@babel/parser`; no build was run per project preference.

---

## 2026-05-14 - Accuracy fixes for SEO generators

Reviewed and fixed output accuracy for `robots-txt-generator`, `meta-tag-generator`, `schema-markup-generator`, and `sitemap-generator`:
- `SitemapGeneratorTool`: normalizes hostless base URLs to HTTPS origins, strips URL fragments from sitemap `<loc>` values, and clamps sitemap `priority` to the valid `0.0`-`1.0` range.
- `RobotsTxtGeneratorTool`: normalizes site URLs to origins before generating `Sitemap:` lines, normalizes optional `Host:` values to hostnames, and ignores invalid crawl-delay values instead of outputting arbitrary text.
- `MetaTagGeneratorTool`: escapes HTML/JS output strings across exports, normalizes Twitter handles, changes generic Article schema back from NewsArticle to Article, uses BlogPosting for blog posts, and generates JSON-LD fields by schema type instead of always using article-style `headline` data.
- `SchemaMarkupGeneratorTool`: makes WebSite SearchAction optional instead of generating a fake search endpoint, adds a Search URL template field, parses FAQ rows at the first `|`, emits numeric rating/review values where possible, and warns when rating data is incomplete.

Updated `schema-markup-generator/page.js` copy to describe SearchAction as optional. Verified changed files with `@babel/parser`; no build was run per project preference.

---

## 2026-05-14 - Sitemap Generator select dropdown contrast fix

Fixed the Sitemap Generator change-frequency native dropdown contrast in `src/components/SitemapGeneratorTool/styles.module.css` by explicitly setting option background and text colors. This prevents light option text from appearing on a white dropdown menu in dark mode. No build was run per project preference.

---

## 2026-05-14 - Sitemap Generator desktop height fix

Updated `src/components/SitemapGeneratorTool/styles.module.css` so the URL editor and sitemap XML output panels stretch to fill the remaining desktop tool height instead of leaving a large blank area below the panels. The editor grid now flex-fills the body, both panels use column flex layout, and desktop textareas fill available space while mobile keeps the previous stacked/resizable behavior. No build was run per project preference.

---

## 2026-05-14 - SEO completion for Apache, hreflang, schema, and llms.txt generators

Completed full SEO rewrites for four technical SEO tools:
- `src/app/htaccess-redirect-generator/page.js`
- `src/app/hreflang-tag-generator/page.js`
- `src/app/schema-markup-generator/page.js`
- `src/app/llms-txt-generator/page.js`

Each page now has search-intent metadata, expanded pain-point-led about copy, 10 detailed FAQPage entries, SoftwareApplication `featureList`, HowTo schema, step-based how-to content, 12 feature bullets, 6 fuller use-case cards using mapped SVG icon keys, and contextual internal links to related SEO tools. Tool UIs were unchanged. Verified all four files with `@babel/parser`; no build was run per project preference.

---

## 2026-05-14 - Sitemap Generator full SEO completion

Rewrote `src/app/sitemap-generator/page.js` to match the project SEO instructions: search-intent metadata, 12 focused keywords, expanded pain-point-led about copy, 12 descriptive feature bullets, 8 detailed how-to steps, 6 fuller use-case cards with SVG icon keys, 10 FAQPage entries, contextual internal links, SoftwareApplication `featureList`, and a new HowTo schema. Tool UI was unchanged. Verified the page with `@babel/parser`; no build was run per project preference.

---

## 2026-05-14 - Per-tool "What's New" changelog system

Created a per-tool changelog system starting with Browser Notepad:
- `src/app/browser-notepad/changelog.js` — changelog data lives next to the tool page; add entries at the top of the array
- `src/components/ToolUpdatesPage/` — reusable timeline page component; pass `toolName`, `toolSlug`, `changelog`
- `src/app/browser-notepad/updates/page.js` — renders the notepad's changelog at `/browser-notepad/updates/`
- Added a "What's New" button (lightning icon) in the BrowserNotepadTool header; opens the updates page in a new tab

To add the system to another tool: create `src/app/[slug]/changelog.js` with a `CHANGELOG` array, create `src/app/[slug]/updates/page.js` importing `ToolUpdatesPage`, and add a `whatsNewBtn` link to the tool's header.

---

## 2026-05-14 - Browser Notepad: GitHub sync debounce + full SEO rewrite

Increased GitHub Gist sync debounce delay from 1 s to 5 s in `BrowserNotepadTool/index.js` (`DEBOUNCE_DELAY`).

Rewrote `browser-notepad/page.js` SEO content to full volume spec: updated `metadata` title/description/keywords for search intent ("online notepad no login", "notepad that saves automatically"), expanded `about.description` to three paragraphs with privacy disclaimer, rewrote `howToUse` steps to 7 detailed steps covering autosave, tabs, rename, formatting, export, search, and Gist sync, expanded all 6 `useCases` to 3-sentence cards, rewrote `features` to 11 descriptive bullets, and expanded `faqs` from 6 short entries to 11 questions with multi-paragraph answers covering auto-save, account-free use, IndexedDB persistence, tab limits, rename, export formats, Gist sync, deleted tab recovery, privacy, comparison with Google Keep/Notion, and offline usage.

---

## 2026-05-13 - Remove duplicate Sidebar AdSense loader

Removed the duplicate AdSense script loader from `Sidebar`, leaving the global loader in `src/app/layout.js` to cover index, category, and tool pages. Sidebar still keeps the `adsbygoogle.push({})` logic for its ad slot. No build was run.

## 2026-05-13 - Move AdSense loader to raw head script

Moved the AdSense loader in `src/app/layout.js` from Next `Script` to a plain `<script async>` inside `<head>` so Google does not see Next's `data-nscript` attribute on the AdSense head tag. Removed the inactive duplicate loader from `Header`. No build was run.

## 2026-05-13 - Add root favicon.ico

Generated `public/favicon.ico` from the existing FWD Tools icon style with 16px, 32px, and 48px entries. Updated global metadata to reference `/favicon.ico` as the root shortcut icon while keeping the SVG PWA icon and Apple touch icon. No build was run.

## 2026-05-13 - Bookmark Keeper merge-first Gist sync

Tightened Bookmark Keeper's Gist sync so an existing Gist must download successfully before local data can be merged and uploaded. Removed the silent remote-fetch failure path that could overwrite remote data with local-only data after a failed download. Updated the Gist panel copy to explain the download-merge-upload order. No build was run.

## 2026-05-13 - Bookmark Keeper existing Gist restore path

Added an optional Existing Gist ID field to Bookmark Keeper's Gist panel and made `Sync Now` use the typed/saved Gist ID before uploading. If no Gist ID is saved, sync now looks up the authenticated user's Gists for `fwd-bookmarks.json`, downloads it, merges it with local IndexedDB data, and then uploads the merged result. No build was run.

## 2026-05-13 - Bookmark Keeper Sync Now input handling

Updated Bookmark Keeper so `Sync Now` is enabled when a token is typed even before pressing Save. The button now persists the typed token and optional existing Gist ID, then runs the same download-merge-upload sync. No build was run.

## 2026-05-13 - Bookmark Keeper Sync Now clickable state

Changed Bookmark Keeper's `Sync Now` button so it is only disabled while an active sync is running. Missing token or setup errors are now reported as inline sync messages after clicking instead of leaving the button unavailable. No build was run.

## 2026-05-13 - Bookmark Keeper single Gist ID field

Removed the duplicate saved Gist ID display from the Bookmark Keeper Gist panel. The existing Gist ID now appears only in the editable input, with the View link placed in the same row. No build was run.

## 2026-05-13 - Bookmark Keeper one-field Gist setup

Simplified Bookmark Keeper's Gist popup to one input: the GitHub token. The existing Gist ID is handled internally from localStorage or auto-discovered by looking up the authenticated user's `fwd-bookmarks.json` Gist before merge/upload. No build was run.

## 2026-05-13 - Bookmark Keeper clean IndexedDB Gist sync pipeline

Reworked Bookmark Keeper's Gist sync into a single download-merge-upload pipeline. Sync now normalizes local IndexedDB and remote Gist bookmarks, auto-discovers an existing `fwd-bookmarks.json` Gist from the token when no Gist ID is saved, downloads remote data before every upload, merges by bookmark ID using the latest `updatedAt`, preserves delete tombstones, writes the merged set back to IndexedDB, and uploads the same merged set to Gist. No build was run.

## 2026-05-13 - Bookmark Keeper one-input Gist ID targeting

Kept the Gist popup to one input but made it accept either a GitHub token alone or a token plus existing Gist ID/Gist URL in the same field. This gives incognito or fresh browsers an exact remote Gist target while still avoiding a second visible input. No build was run.

## 2026-05-13 - Bookmark Keeper prevent duplicate Gist creation

Changed `Sync Now` so it no longer creates a new Gist when no existing `fwd-bookmarks.json` Gist or saved Gist ID is found. It now stops with an inline message asking for token plus existing Gist ID, while a separate `Create New Backup` action handles first-time creation explicitly. No build was run.

## 2026-05-13 - Bookmark Keeper separate token and Gist ID fields

Restored two explicit Gist setup fields because the GitHub token and Gist ID are different values. The token field stores the GitHub Personal Access Token, while the existing Gist ID field targets the same remote backup across new browsers and incognito sessions. No build was run.

## 2026-05-13 - Bookmark Keeper keep Gist ID input populated

Updated Bookmark Keeper so the Existing Gist ID input remains populated when an ID is loaded from localStorage, auto-discovered from GitHub, manually saved, or created through the explicit backup creation flow. No build was run.

## 2026-05-13 - Bookmark Keeper visible GitHub token field

Changed Bookmark Keeper's GitHub token input from password to plain text so the saved token remains visible in the Gist popup. No build was run.

## 2026-05-13 - Bookmark Keeper compact Gist View link

Restyled the Bookmark Keeper Gist `View` action from a button-like control to a compact text link beside the Gist ID field. No build was run.

## 2026-05-13 - Bookmark Keeper Gist popup overflow fix

Moved the Bookmark Keeper `View Gist` link below the Gist ID input row and added min-width constraints to the Gist input row so the ID input and Save button no longer overflow the popup. No build was run.

## 2026-05-13 - Bookmark Keeper token row save button

Added a Save button to the GitHub token row in Bookmark Keeper's Gist popup so token and Gist ID rows both expose an explicit save action. No build was run.

## 2026-05-13 - Bookmark Keeper Gist field spacing

Added bottom spacing after the GitHub token input row in Bookmark Keeper's Gist popup so the token and Gist ID fields are visually separated. No build was run.

## 2026-05-13 - Bookmark Keeper Gist title spacing

Increased the bottom margin under the Bookmark Keeper `GitHub Gist Backup` popup title for clearer separation from the setup steps. No build was run.

## 2026-05-13 - Bookmark Keeper sync after local changes

Added background Gist sync after Bookmark Keeper bookmark create, edit, and delete operations when both GitHub token and Gist ID are configured. The triggered sync uses the existing merge-first pipeline and runs silently. No build was run.

## 2026-05-13 - Bookmark Keeper header sync button

Added a dedicated sync icon button to the Bookmark Keeper header. It triggers the same Gist sync flow as the popup `Sync Now` button and shows the existing syncing animation while active. No build was run.

## 2026-05-13 - Bookmark Keeper hard-delete Gist sync

Changed Bookmark Keeper delete handling so deleted bookmark IDs are removed from the merged sync payload before uploading to GitHub Gist. Local deletes now use IndexedDB delete and pending hard-delete tracking, so deleted bookmarks disappear from `fwd-bookmarks.json` instead of remaining as tombstone records. No build was run.

## 2026-05-13 - Bookmark Keeper restore sync-safe deletes

Reverted Bookmark Keeper hard-delete sync and restored tombstone-based deletes. Deleted bookmarks are hidden from the UI but retained as `deletedAt` records during the retention window so other browsers do not re-upload stale copies during Gist merge sync. No build was run.

## 2026-05-13 - Bookmark Keeper deleted bookmarks view

Added a deleted-bookmarks UI view to Bookmark Keeper. The component now keeps active and deleted tombstone records in state, shows active bookmarks by default, and exposes a `Show deleted` toggle when tombstones exist. Deleted cards display their deletion date and a sync tombstone badge. No build was run.

## 2026-05-13 - Bookmark Keeper hide deleted count text

Removed the inline `deleted` count text from Bookmark Keeper's top-bar counter while keeping the `Show deleted` toggle visible when deleted tombstones exist. No build was run.

## 2026-05-13 - Bookmark Keeper permanent delete action

Added a permanent delete action for deleted/tombstone cards in Bookmark Keeper. The action removes the tombstone from IndexedDB and filters that ID out of the next merged Gist payload when sync is configured, with a confirmation warning about very old unsynced browser copies. No build was run.

## 2026-05-13 - Bookmark Keeper sync-safe permanent deletes

Made Bookmark Keeper permanent deletes sync-safe by adding a companion `fwd-bookmarks-deletes.json` file in the same GitHub Gist. Permanent deletes remove the bookmark from the main `fwd-bookmarks.json` payload but keep a 30-day delete marker locally and in Gist so stale browsers cannot re-upload that ID during merge sync. No build was run.

## 2026-05-13 - Bookmark Keeper clickable cards and deleted-view reset

Made Bookmark Keeper cards clickable across the full card area, with keyboard Enter/Space support and safeguards so links/buttons/tags keep their own behavior. Added an automatic switch back to active bookmarks when the deleted view becomes empty. No build was run.

## 2026-05-12 - New testing tool: Browser Based Notepad

Added `/browser-notepad` as a testing-mode local-first notepad. The tool supports unlimited note tabs, double-click/inline tab renaming, rich text editing, IndexedDB autosave, active-tab memory in localStorage and URL query, tab search, JSON import/export, current-tab TXT/HTML/Markdown/PDF export, and optional private GitHub Gist sync using the Bookmark Keeper merge-first pattern with token and Gist ID stored locally. Added noindex SEO page, FAQ/Software/Breadcrumb schema, registry entry with `status: 'testing'`, and related-tool mapping. Ran `npm run build`; it completed with exit code 0, generated 155 static pages, preserved `.htaccess`, and did not include `browser-notepad` in generated live-tool sitemaps.

## 2026-05-12 - PDF Watermark controlled input fix

Fixed a React controlled/uncontrolled input warning in `PdfWatermark` by normalizing text, color, font size, image scale, opacity, and rotation values before passing them to form inputs or drawing functions. Ran `npm run build`; it completed with exit code 0 and `.htaccess` remained preserved from `public/`.

## 2026-05-12 - PDF Watermark placement and preview fixes

Reviewed `PdfWatermark` positioning, font sizing, and image sizing. Fixed rotated watermark placement by anchoring marks around their visual center instead of drawing from a lower-left origin, added page-aware text fitting to prevent oversized/long labels from spilling off the page, and constrained image watermarks by both page width and height so tall images do not overflow. Updated the preview to reflect selected position, font size, image scale, rotation, opacity, and tile mode. Ran `npm run build`; it completed with exit code 0 and preserved `.htaccess`. Existing warnings remain: static export ignores `headers()`, Browserslist dynamic require warning, ESLint circular config serialization warning, and PowerShell npm.ps1 access warning.

## 2026-05-12 - Build verification and invoice SEO syntax fix

Ran `npm run build` after fixing an unescaped backtick syntax error in `src/app/local-invoice-tracker/page.js`. Build completed with exit code 0, exported 154 static pages, ran postbuild, generated sitemaps and `tools.zip`, and preserved `.htaccess` from `public/`. Remaining output is warnings only: Next static export ignores `headers()`, Browserslist has a dynamic require warning in `CssAutoprefixerTool`, ESLint reports the existing circular config serialization issue, and PowerShell reports an npm.ps1 `Test-Path` access warning.

## 2026-05-12 - .htaccess trailing slash canonical URLs

Updated `public/.htaccess` and synced `tools/.htaccess` to preserve trailing-slash URLs. Replaced the old trailing-slash removal rule with an extensionless URL redirect to `/:path/`, while keeping a fallback rewrite for trailing-slash URLs to matching `.html` files when no directory exists. No dev server or build was run.

## 2026-05-12 - Stop postbuild .htaccess overwrite

Disabled the postbuild `.htaccess` overwrite so the file copied from `public/.htaccess` remains intact in the static export. Restored `tools/.htaccess` to match the fuller public rules, including custom 404 handling. No dev server or build was run.

## 2026-05-12 - Build .htaccess custom 404

Updated `scripts/postbuild.js` so every generated `.htaccess` includes `ErrorDocument 404 /404.html`. Also synced the current `tools/.htaccess` artifact. No dev server or build was run.

## 2026-05-12 - Freelancer local tools: expense, retainer, portal, availability, payments

Added five freelancer-focused local browser tools in testing mode: Freelance Expense Tracker, Retainer Tracker, Client Portal Lite, Freelance Availability Planner, and Milestone Payment Tracker. Extended `FreelancerLocalTools` with IndexedDB-backed configs, metrics, searchable fields, CSV/JSON export support, sample data, and autosave indicator coverage for each new tool. Added full SEO/test-mode pages with FAQ, SoftwareApplication, and Breadcrumb schema for the five routes, and registered all five tools in `tools-registry.js` with `status: 'testing'`. No dev server or build was run per project preference.

## 2026-05-05 (session 2) - FreelanceDashboard: toolbar, attachment display, SEO

Added sidebar toolbar (Auto Saved, Undo/Redo with 50-snapshot history, Import ZIP, Export ZIP, Clear with confirm) to the bottom of the FreelanceDashboard left panel. Added `pushHistory` to `persist` and `addLog` so every change is undoable. Added file/image attachment display in work log entries: image thumbnails open a lightbox (`setLightboxUrls`/`setLightboxIdx` with nav arrows), non-image files show as downloadable pills with file type icon, name, size, and Download/Open button. On mount, all attachment blobs are loaded from `FL_IMAGES` IDB store and converted to object URLs (`collectAllFlAttachIds` + `loadFlImage`). `removeLogEntry` now revokes object URLs and deletes IDB blobs on entry removal. Added `getFileIcon`, `collectAllFlAttachIds`, `loadFlImage`, `downloadBlob` utility functions. Full SEO page written for `/freelance-dashboard` with 1200+ words, steps-format `howToUse`, features, 6 use cases, 13 FAQs, related tool links, and privacy disclaimer.

## 2026-05-06 - New tool: Freelance Dashboard

Created `FreelanceDashboard` — a unified workspace merging DailyFocusLog and MiniKanban. Left sidebar (290px) shows a compact calendar, focus tasks for the selected day (add/toggle/delete), and a work log (add notes, timestamped entries). Right panel renders the full `MiniKanbanTool`. Both panels share their respective IndexedDB databases (`daily_focus_log_db`, `mini_kanban_db`) so data stays in sync with the standalone tools. Also: added Import/Export icon buttons (arrow SVGs) to MiniKanban header matching DailyFocusLog style; relocated due date into the Created/Modified dates row in the task panel; added URL deep-linking (`?p=<projectId>&t=<taskId>`) to MiniKanban so sharing a task URL auto-opens the correct project and panel. Removed drag handle icons from DailyFocusLog tasks, MiniKanban cards, and Sidebar favourites.

## 2026-05-05 - SEO update: MiniKanban + DailyFocusLog

Rewrote SEO content for both tools. Removed all GitHub Gist cloud sync references (feature removed). Added: rich text description editor (bold/italic/bullet/code/link, auto-link URLs), slideshow lightbox for multiple images (left/right arrows, keyboard nav, position counter), chunked ZIP export (40 MB per file with shared manifest, multi-file import reassembly), Auto Saved indicator (persistent, not a flash), dark/light theme toggle, archived tasks protection policy (survive project deletion). Converted `howToUse` from flat strings to `type:'steps'` format in both pages. Updated metadata, OG/Twitter descriptions, keywords, features lists, FAQs, and `softwareSchema` / `faqSchema` JSON-LD for DailyFocusLog. Added calendar light mode grey-background note. Removed `?` keyboard shortcut button references from MiniKanban.

## 2026-05-04 - AiPromptStudioTool: auto-save draft + left panel state

Added `DRAFT_KEY = 'apt_draft_v1'` auto-save for `prompt`, `tab`, and `optimizeModel`. Uses `hydrated` ref + 600ms debounced save useEffect. Draft is restored on mount unless a `?p=` URL param is present (shared link takes priority). Save indicator pill (indigo/green) added to header `headerMeta`. Existing `LS_KEY` prompt library save is unchanged.

## 2026-05-04 - Auto-save + Reset for 7 tools

Added localStorage auto-save (600ms debounce) and Reset button to: QrCodeGeneratorTool, MetaTagGeneratorTool, PasswordGeneratorTool, RegexTesterTool, CodeScreenshotTool, GradientGeneratorTool, BoxShadowGeneratorTool. Each tool uses a `hydrated` ref to prevent SSR-triggered saves, a debounced `saveState` pill in the header (idle/saving/saved), and a Reset button that clears localStorage and restores DEFAULTS. For GradientGeneratorTool and BoxShadowGeneratorTool, the module-level id counter is synced after restore to prevent id clashes. logoDataUrl (base64) excluded from QR save.

## 2026-05-04 - VAT Calculator UK + Credit Card Payoff: internal links in SEO content

Added internal links throughout `vat-calculator-uk/page.js`: Freelance Invoice Generator, UK Take-Home Calculator, Salary to Hourly Calculator, Inflation Calculator — in about text, freelancer section, use-case cards, and howToUse step 5. Added internal links throughout `credit-card-payoff-calculator/page.js`: Loan Payoff Calculator, Compound Interest Calculator, SIP Calculator, Paycheck Calculator, UK Take-Home Calculator, Inflation Calculator — in about text, strategies section, use-case cards, and howToUse step 5.

---

## 2026-05-04 - New Tool: Canada Take-Home Pay Calculator (`/canada-take-home-calculator`)

Built a Canada salary and take-home pay calculator targeting "Canada take home pay calculator", "Canada salary calculator", "Ontario take home pay calculator", "Canada paycheck calculator", and federal/provincial tax searches.

- Component: `src/components/CanadaTakeHomeCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/canada-take-home-calculator/page.js` with FAQ schema, software schema, breadcrumb schema, 1000+ word SEO content, and internal links to US Paycheck, UK Take-Home, Budget Planner, Retirement, Compound Interest, and Net Worth tools
- Icon: `public/icons/canada-take-home-calculator.svg`
- OG thumbnail: `public/images/canada-take-home-calculator.png` at 1200x630
- Features: 2026 federal tax estimate, 10 province tax estimates, CPP/CPP2, EI, RRSP/pension deduction input, annual/monthly/semi-monthly/bi-weekly/weekly pay views, deduction breakdown, and copy summary
- Added to registry, misc/productivity category, related-tool graph, and homepage tool count

---

## 2026-05-04 - New Tool: Net Worth Calculator (`/net-worth-calculator`)

Built a multi-currency net worth calculator targeting "net worth calculator", "net worth tracker", "assets liabilities calculator", and repeat monthly wealth tracking searches.

- Component: `src/components/NetWorthCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/net-worth-calculator/page.js` with FAQ schema, software schema, breadcrumb schema, 1000+ word SEO content, and internal links to Budget Planner, Retirement Calculator, Compound Interest, Monthly Investment, Paycheck, Mortgage, Credit Card Payoff, and Loan Payoff tools
- Icon: `public/icons/net-worth-calculator.svg`
- OG thumbnail: `public/images/net-worth-calculator.png` at 1200x630
- Features: editable asset rows, editable liability rows, add/remove categories, multi-currency selector, total assets, total liabilities, net worth, debt-to-asset ratio, equity ratio, copy summary, auto-save, and dated CSV export
- Added to registry, misc/productivity category, related-tool graph, and homepage tool count

---

## 2026-05-04 - New Tool: Retirement Calculator (`/retirement-calculator`)

Built a retirement savings calculator targeting "retirement calculator", "retirement savings calculator", "how much do I need to retire", "nest egg calculator", and high-intent US retirement planning searches.

- Component: `src/components/RetirementCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/retirement-calculator/page.js` with FAQ schema, software schema, breadcrumb schema, 1000+ word SEO content, and internal links to Paycheck, Budget Planner, Compound Interest, Monthly Investment, Inflation, SIP, and debt payoff calculators
- Icon: `public/icons/retirement-calculator.svg`
- OG thumbnail: `public/images/retirement-calculator.png` at 1200x630
- Features: current age, retirement age, current savings, monthly contribution, expected return, inflation, desired retirement income, withdrawal rate, required nest egg, projected gap/surplus, monthly needed, yearly projection, CSV export, copy summary, and multi-currency support
- Added to registry, misc/productivity category, related-tool graph, and homepage tool count

---

## 2026-05-04 - New Tool: Budget Planner (`/budget-planner`)

Built a 50/30/20 budget planner targeting "budget planner", "50 30 20 rule calculator", "budget calculator", "monthly budget planner", and net-pay budgeting searches.

- Component: `src/components/BudgetPlannerTool/index.js` + `styles.module.css`
- Page: `src/app/budget-planner/page.js` with FAQ schema, software schema, breadcrumb schema, and 1000+ word SEO content
- Icon: `public/icons/budget-planner.svg`
- OG thumbnail: `public/images/budget-planner.png` at 1200x630
- Features: net pay input, pay frequency conversion, 50/30/20 default, alternate presets, custom percentage sliders, fixed-needs check, extra debt payment check, savings goal timeline, copy summary, and CSV export
- Added to registry, misc/productivity category, related-tool graph, and homepage tool count

---

## 2026-05-04 - New Tool: JavaScript Minifier (`/javascript-minifier`)

Built a browser-based JavaScript minifier, compressor, uglifier, and concatenator targeting "javascript minifier", "js minifier", "minify javascript", "javascript compressor", "js uglifier", and "javascript concatenator".

- Component: `src/components/JavascriptMinifierTool/index.js` + `styles.module.css`
- Page: `src/app/javascript-minifier/page.js` with FAQ schema, software schema, breadcrumb schema, and 1000+ word SEO content
- Icon: `public/icons/javascript-minifier.svg`
- OG thumbnail: `public/images/javascript-minifier.png` at 1200x630
- Features: paste JS, upload multiple `.js/.mjs/.cjs` files, concatenate with custom separator, remove comments, preserve license comments, compress whitespace, optional semicolon removal, optional simple identifier uglification, IIFE wrapper, use strict insertion, copy, download, and beautify output
- Added to registry, Developer Tools category, related-tool graph, and homepage tool count

## 2026-05-04 - SIP Calculator: Chart tooltip overflow follow-up

Adjusted the SIP year-by-year chart containers so the chart stays full-width and tooltip overlays are not clipped inside the chart panel.

---

## 2026-05-04 - Inflation Calculator: SEO update — data lag note, multi-country, internal links

Updated `inflation-calculator/page.js` SEO: added data lag explanation (CPI published 1–2 years behind calendar), World Bank auto-update behaviour, 38-country feature in all sections. Added internal links to Compound Interest Calculator, Loan Payoff Calculator, Paycheck Calculator, SIP Calculator, EMI Calculator in use-case cards and text paragraphs. Updated feature cards, howToUse step 4, softwareSchema featureList, and two FAQ answers. Also added custom dropdown, Copy button, and auto-advancing To Year to the tool.

## 2026-05-04 - Inflation Calculator: 38-country World Bank upgrade + CSS fixes

Rewrote `InflationCalculatorTool` to support 38 countries using World Bank CPI API (`FP.CPI.TOTL`). US (BLS seed 1913–2024) and UK (ONS seed 1948–2024) display immediately; other countries fetch live with 7-day localStorage cache. Country toggle replaced with grouped `<select>` dropdown. Added CSS for `.selectWrap`, `.countryDropdown`, `.selectChevron`, `.loadingHint`, `.spinner`, `.spinnerLg`, `.blankCard`; removed orphaned `countryToggle`/`countryBtn` classes. Updated `inflation-calculator/page.js` howToUse step 1 to reflect 38-country dropdown.

---

## 2026-05-04 - New Tool: Loan Payoff Calculator (`/loan-payoff-calculator`)

Built a loan payoff calculator targeting "loan payoff calculator", "personal loan payoff calculator", "auto loan payoff calculator", "student loan payoff calculator", "extra payment loan calculator".

- Component: `src/components/LoanPayoffTool/index.js` + `styles.module.css`
- Page: `src/app/loan-payoff-calculator/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Amber (#f59e0b) accent — distinct from credit card payoff (red)
- Loan type presets: Personal (11%), Auto (7%), Student (6%), Custom — click to set APR
- Dual mode: Fixed Payment (payment → payoff date) / Target Date (months → required payment)
- Extra payment input with before/after comparison panel (green savings badge)
- 4 metric cards: Total Interest, Total Paid, Payment/Months, Interest % of principal
- Principal vs interest breakdown bar (blue + amber)
- Full amortization schedule, preview 24 rows, Show All toggle
- Currency auto-detection + 20-currency dropdown
- Linked from: credit-card-payoff-calculator, mortgage-calculator, emi-calculator

## 2026-05-04 - New Tool: Inflation Calculator (`/inflation-calculator`)

Built a historical inflation calculator targeting "inflation calculator", "what is £1000 worth today", "uk inflation calculator", "cpi calculator", "purchasing power calculator" — 200K+ US+UK searches/month.

- Component: `src/components/InflationCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/inflation-calculator/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Amber (#f59e0b) accent
- US CPI data: 1913–2024 (BLS, 1982-84=100 base) — 112 years
- UK RPI data: 1948–2024 (ONS, Jan 1987=100 base) — 77 years
- Dual country mode: US/UK toggle, year range auto-clamps on switch
- Outputs: inflation-adjusted value (hero), total %, avg annual CAGR rate, purchasing power remaining, value multiplier
- Bar chart: year-by-year value from fromYear → toYear, step adapts to range (1/5/10 yr)
- Purchasing power erosion bar: green (remaining) + red (lost)
- Quick "From Year" preset buttons: 1950–2020
- Linked from: compound-interest-calculator, monthly-investment-calculator

## 2026-05-03 - New Tool: Credit Card Payoff Calculator (`/credit-card-payoff-calculator`)

Built a high-intent credit card payoff calculator targeting "credit card payoff calculator", "how long to pay off credit card", "credit card interest calculator" — 200K+ US searches/month.

- Component: `src/components/CreditCardPayoffTool/index.js` + `styles.module.css`
- Page: `src/app/credit-card-payoff-calculator/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Red (#ef4444) accent — debt urgency theming
- Dual mode: **Fixed Payment** (enter monthly payment → see payoff date) / **Target Months** (enter goal → see required payment)
- Dynamic slider range: floor = monthly interest + $1 to prevent infinity loop
- Hero: total interest paid (red) + savings badge (green) showing interest saved vs minimum payments
- Principal vs interest breakdown bar (blue + red)
- Minimum payment comparison panel: 3-column grid showing user's plan vs minimum-only
- Full amortization table with Show All / collapse toggle (preview = 24 rows)
- Month presets: 12, 24, 36, 48, 60 months for target mode
- Currency: USD default (auto-detected), 20+ currencies via dropdown
- Linked from: paycheck-calculator, compound-interest-calculator, monthly-investment-calculator, emi-calculator

## 2026-05-04 - New Tool: VAT Calculator UK (`/vat-calculator-uk`)

Built a UK VAT calculator targeting "vat calculator uk", "add vat calculator", "remove vat calculator", "20% vat calculator", "reverse vat calculator" — 200K+ UK searches/month.

- Component: `src/components/VatCalculatorUkTool/index.js` + `styles.module.css`
- Page: `src/app/vat-calculator-uk/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Indigo (#6366f1) accent — distinct from UK Take-Home blue (#2563eb)
- Mode toggle: Add VAT (net→gross) / Remove VAT (gross→net) with prominent two-button design
- VAT rates: 20% Standard / 5% Reduced / 0% Zero / Custom (slider 0–30%)
- Metric cards: Net, VAT Amount, Gross — input card highlighted with indigo border
- Visual net vs VAT breakdown bar (indigo + light violet)
- Quick-reference table: 6 common amounts (£100–£5,000) at current rate
- UK VAT info panel: registration threshold, rates — always visible
- Currency: GBP default (auto-detected), 20 currencies via dropdown
- Linked from: uk-take-home-calculator, freelance-invoice-generator, salary-to-hourly

## 2026-05-03 - New Tool: Salary to Hourly Calculator (`/salary-to-hourly-calculator`)

Built a salary-to-hourly rate converter targeting "salary to hourly calculator", "convert annual salary to hourly rate", "hourly rate calculator", and related queries.

- Component: `src/components/SalaryToHourlyTool/index.js` + `styles.module.css`
- Page: `src/app/salary-to-hourly-calculator/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Emerald green (#10b981) accent
- Hydration-safe localStorage pattern with separate key for currency preference
- 8 pay period input modes: Hourly, Daily, Weekly, Bi-weekly, Semi-monthly, Monthly, Quarterly, Annually
- Work schedule sliders: hours/day (1–24), days/week (1–7), weeks/year (1–52)
- Currency auto-detection from browser locale (40+ currencies); manual override via dropdown in input
- Hero card smart: shows Hourly when annual entered, Annual when hourly entered
- 8 result cards in 4×2 grid; input pay period card highlighted green for reference
- Copy summary to clipboard: all 8 rates + schedule in plain text
- Auto-saves all inputs + currency preference to localStorage
- Icon: `public/icons/salary-to-hourly-calculator.svg` ($ circle + arrow)
- Added 4 new UseCaseIcon types to SeoSection: MONEY, CLOCK, GLOBAL, INVOICE
- Linked from: paycheck-calculator, uk-take-home-calculator, tip-calculator

## 2026-05-03 - New Tool: Tip Calculator (`/tip-calculator`)

Built a complete restaurant tip calculator with bill splitter targeting "how much to tip", "tip calculator", "split bill calculator", and related high-volume US search queries.

- Component: `src/components/TipCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/tip-calculator/page.js` with FAQ schema (8 Qs), software schema, breadcrumb
- Amber (#f59e0b) accent — distinct from other calculator tools
- Hydration-safe localStorage pattern (same as UK Take-Home Calculator)
- Bill amount input with $ prefix; 6 tip preset buttons (10%, 15%, 18%, 20%, 25%, Custom)
- Custom tip mode: slider (0–50%) + number input both synced
- Number of people: slider (1–20) + tick marks (1, 10, 20) + number input
- Round up per person: None / To $1 / To $5 segmented control
- Hero: shows "Total to pay" (1 person) or "Each of N people pays" with big amber amount
- Hero sub: bill + tip share breakdown; effective tip % shown when rounding is active
- 4 metric cards (2×2 grid): Tip Amount, Total Bill, Tip Rate, Bill per Person
- Bill Breakdown bar: amber for bill portion, red for tip portion with % labels
- Split table (people > 1): Person | Bill share | Tip share | Total; max 10 rows + overflow row
- Copy summary to clipboard; auto-saved inputs
- Icon: `public/icons/tip-calculator.svg` (amber $ + % badge on rounded rect)
- SEO: ~1000+ words, search-intent focused, privacy disclaimer included, 6 use case cards

## 2026-05-02 - New Tool: Paycheck Calculator (`/paycheck-calculator`)

Built complete US paycheck / take-home pay calculator targeting "paycheck calculator", "take home pay calculator", "salary after taxes", "net pay calculator", and related search intents.

- Component: `src/components/PaycheckCalculatorTool/index.js` + `styles.module.css`
- Page: `src/app/paycheck-calculator/page.js` with FAQ schema (9 Qs), software schema, breadcrumb
- Emerald (#10b981) accent — consistent with EMI Calculator color family
- Left panel (inputs) / right panel (results) layout; hydration-safe localStorage pattern
- Pay modes: Annual salary (slider $10K–$500K) or Hourly rate (slider $7.25–$250 + hours/week)
- Pay frequencies: Weekly (52), Bi-weekly (26), Semi-monthly (24), Monthly (12)
- Filing statuses: Single, Married Filing Jointly, Head of Household
- 2025 IRS federal brackets for all three filing statuses; 2025 standard deductions
- State income tax: all 50 states + D.C. — flat rate or progressive brackets; "No state income tax" badge for 9 zero-tax states
- FICA: Social Security 6.2% up to $176,100 wage base; Medicare 1.45% + 0.9% additional surtax
- Pre-tax deductions: 401(k) % slider (reduces taxable income), health insurance $/paycheck, HSA $/paycheck
- Additional withholding per paycheck (W-4 Step 4c equivalent)
- Hero shows per-paycheck take-home; 4-metric grid (gross, net, total taxes, effective rate)
- Stacked bar breakdown of gross → net, pre-tax deductions, federal, state, SS, Medicare
- Detailed table with per-paycheck + annual columns; color-coded rows (deductions indigo, taxes red, net green)
- Marginal federal rate chip on federal income tax row
- Copy paycheck summary to clipboard
- Icon: `public/icons/paycheck-calculator.svg`
- Registered in tools-registry.js; added to sitemap-tools-list1.xml

## 2026-05-02 - New Tool: Monthly Investment Calculator (`/monthly-investment-calculator`)

Built multi-currency recurring investment calculator targeting "monthly investment calculator" (US + global).

- Component: `src/components/MonthlyInvestmentTool/index.js` + `styles.module.css`
- Page: `src/app/monthly-investment-calculator/page.js` with full FAQ schema (9 Qs), software schema, breadcrumb
- Violet (#8b5cf6) accent — distinct from blue (compound interest) and green (SIP)
- Plus Jakarta Sans font scoped to component
- Multi-currency: USD, EUR, GBP, CAD, AUD, INR with locale formatting + INR lakh/crore abbreviations
- Contribution frequency: Daily / Weekly / Bi-weekly / Monthly / Quarterly / Annually
- Sliders with ticks + number inputs; shows monthly equivalent when non-monthly frequency selected
- Compare mode: second contribution amount plots as amber dashed line on same chart
- Milestone markers on chart (vertical dashed lines when balance crosses $10K/$100K/$1M etc.)
- Rule of 72 live doubling-time estimate in sidebar
- Rate presets: 401(k) avg (7%), S&P 500 (10%), Roth IRA (8%), HYSA 2025 (4.5%)
- Hero shows compare balance + diff when compare mode active
- Year-by-year chart + tooltip (shows both balances in compare mode)
- Year-by-year table with compare column when compare mode active + CSV download
- Hydration-safe localStorage pattern
- Icon: `public/icons/monthly-investment-calculator.svg`
- Registered in tools-registry.js + categories.js (first in misc-tools list)

## 2026-05-02 - New Tool: Compound Interest Calculator (`/compound-interest-calculator`)

Built full US-focused compound interest / investment calculator targeting "compound interest calculator" (huge US search volume).

- Component: `src/components/CompoundInterestTool/index.js` + `styles.module.css`
- Page: `src/app/compound-interest-calculator/page.js` with full FAQ schema (9 Qs), software schema, breadcrumb
- Blue (#3b82f6) accent theme, Plus Jakarta Sans font (scoped)
- Inputs: initial investment, monthly contribution, annual rate, duration (1–50y), compounding frequency (monthly/quarterly/semi-annual/annual), inflation rate
- Sliders with ticks + number input for all fields
- Quick presets: S&P 500 avg (10%), Conservative (5%), Aggressive (14%), HYSA 2025 (4.5%)
- Rule of 72 doubling time shown live in sidebar
- SVG line chart (balance vs invested), hover tooltip, chart legend
- Year-by-year table with CSV download + copy summary
- Hydration-safe localStorage pattern (same as EMI/SIP/ImageCompressor)
- Icon: `public/icons/compound-interest-calculator.svg`
- Registered in tools-registry.js + categories.js (first in misc-tools list)

## 2026-05-02 - New Tool: EMI Calculator (`/emi-calculator`)

High-traffic India + global tool targeting "emi calculator", "loan emi calculator", "home loan emi calculator".

**Files created:**
- `src/components/EmiCalculatorTool/index.js` — React component with full EMI logic
- `src/components/EmiCalculatorTool/styles.module.css` — styled with dark theme
- `src/app/emi-calculator/page.js` — full SEO page (FAQ, Software, Breadcrumb schemas, 1000+ word about)
- `public/icons/emi-calculator.svg` — sidebar icon

**Registry & categories:** added `emi-calculator` to tools-registry.js (category: `productivity`) and to `misc-tools` toolSlugs in categories.js.

**Features:**
- EMI formula: reducing balance method (P × r × (1+r)^n ÷ ((1+r)^n − 1))
- 4 loan type presets: Home, Car, Personal, Education (with typical Indian defaults)
- Sliders for amount, rate, tenure + direct input override
- Tenure toggle: years ↔ months
- Currency: INR (₹), USD ($), EUR (€), GBP (£) with locale-correct formatting (lakhs/crores for INR)
- EMI hero card + 3 stat cards (principal, total interest, total payable with %)
- SVG donut chart (principal vs interest arcs, % labels, interest-to-principal ratio)
- Year-wise and month-wise amortization schedule table
- Indian bank rate reference card (SBI, HDFC, ICICI 2025 rates)
- 100% browser-based, no data uploaded

---

## 2026-05-02 - New Tool: Image Editor (`/image-editor`)

Built a full browser-based image editor tool — all processing via Canvas API, nothing uploaded.

**Files created:**
- `src/components/ImageEditorTool/index.js` — main React component (~650 lines, `'use client'`)
- `src/components/ImageEditorTool/styles.module.css` — editor layout, crop overlay, sidebar, download bar
- `src/app/image-editor/page.js` — Next.js page with metadata, structured data (FAQ/Software/Breadcrumb), and 1000+ word SEO section
- `public/icons/image-editor.svg` — sidebar/toolbar icon

**Registry & categories updated:**
- `src/lib/tools-registry.js` — added `image-editor` entry (category: `converters`, status: `live`)
- `src/lib/categories.js` — added `image-editor` to `image-tools` toolSlugs (first position)

**Features:**
- Resize: custom W×H with aspect ratio lock, 10 social media presets (Instagram, Twitter, OG Image, YouTube, LinkedIn, Favicon, Full HD)
- Crop: 8-handle drag overlay, 7 aspect ratio presets, rule-of-thirds grid, percentage-based coordinates
- Rotate: 90° CW/CCW, flip horizontal/vertical
- Compress: quality slider (1–100%) with estimated file size, JPEG/PNG/WebP output
- Text: multiple layers, font size, color, opacity, X/Y position, bold, outline; watermark preset
- BG Color: solid color fill with 8 swatches + color picker
- SEO targeting: "image editor online", "resize image online", "crop image online", "add text to image online"

---

## 2026-05-02 - Sitemap Hierarchy (index + sub-sitemaps + image sitemap)

Rewrote `scripts/postbuild.js` to generate a proper multi-level sitemap hierarchy:

```
sitemap.xml              ← sitemapindex (top-level, referenced by robots.txt)
├─ sitemap-categories.xml  ← urlset: homepage + 7 category pages  (priority 0.9–1.0, weekly)
├─ sitemap-tools.xml       ← sitemapindex pointing to paginated list files
│    └─ sitemap-tools-list1.xml  ← urlset: all live tool pages (priority 0.8, monthly)
└─ sitemap-images.xml      ← sitemapindex for image sitemaps
     └─ sitemap-images-list1.xml ← image urlset with <image:image> title + caption per tool/category
```

- Tool + image lists auto-paginate into list2, list3 etc. when count exceeds 50,000 (Google's limit)
- Image entries populated from `public/images/*.png` — only slugs that have a matching PNG get an entry
- Image captions sourced from `t.desc` (tools) and `c.tagline` (categories)
- `robots.txt` unchanged — already points to `/sitemap.xml`

---

## 2026-05-02 - Smart "ToolNudge" Popup — Extended to Home & Category Pages

Created `src/components/ToolNudge/` — a fixed slide-up panel (bottom-right) that appears on tool pages for new/occasional users.

**Content:** Bookmark tip, "your data never leaves your browser" privacy message, share buttons (X, LinkedIn, WhatsApp, copy link), Add to Favorites CTA.

**Smart display logic (all conditions must be met):**
- Current page is a live tool slug
- Tool is NOT already favorited
- Total tool page views ≤ 8 (`wdp-page-views` localStorage key)
- Nudge not dismissed within the last 7 days (`wdp-nudge-dismissed-at` key)
- Shows after 4.5 second delay on page load

**Behavior:**
- Dismissing (×) sets a 7-day cooldown
- "Add to Favorites" writes to `fav-tools` localStorage + dispatches `fav-tools-changed` so the sidebar updates instantly; shows green checkmark then closes
- If user favorites from sidebar while popup is open, popup hides automatically
- Resets to hidden on every route change, re-evaluates conditions

**Context-aware content — 3 variants:**
| Context | Header | Tip 1 | CTA |
|---|---|---|---|
| `home` (/) | "Save this for later" | Bookmark this hub for N+ free tools | none |
| `category` (/pdf-tools etc.) | "Save this collection" | Bookmark this category + count | none |
| `tool` (/json-formatter etc.) | "Get the most from this tool" | Bookmark + favorite in sidebar | Add to Favorites |

**Added `<ToolNudge />` to `src/app/layout.js`** (position: fixed so layout position doesn't matter).  
Detects context via `usePathname()` — matches against `TOOL_SLUGS`, `CATEGORY_SLUGS`, and the root `/`.

---

## 2026-05-02 - Sidebar Category Restructure: 7 Groups, All Tools Reassigned

Restructured `CATEGORY_META` in `src/lib/tools-registry.js` from 6 mixed categories to 7 semantically clean categories:

| New ID | Label | What moved in |
|---|---|---|
| `pdf` | PDF Tools | All 11 PDF tools (was `productivity`) |
| `css` | CSS Tools | No change |
| `dev` | Dev Tools | Trimmed: JSON, formatters, API, regex, etc. |
| `converters` | Converters | qr-code, html-to-markdown, markdown-to-html, yaml-json, csv-json added |
| `design` | Design & SVG | og-image-generator, font-pairing-tool, svg-animation-generator, animated-svg-icons, code-screenshot-generator |
| `text` | Text & AI | word-counter, text-case-converter, lorem-ipsum-generator, markdown-editor, ai-prompt-studio |
| `productivity` | Productivity | freelance-invoice-generator, mortgage-calculator, rent-vs-buy-calculator, youtube-thumbnail-downloader, pomodoro-timer, daily-focus-log, mini-kanban, resume-builder |

All 30+ individual tool `category` fields updated to match.

---

## 2026-05-02 - Category Pages: Use Cases, OG Tags, Schema Verification

- Added `useCases` array (6 cards each) to all 7 categories in `src/lib/categories.js`
- Updated `src/components/CategoryPage/index.js` to render a 3-column use-cases card grid (full-width) between the about+sidebar row and the FAQs
- Added `.seoUseCases`, `.useCasesGrid`, `.useCaseCard` CSS to `src/app/category-page.module.css`; responsive at 900px (2-col) and 560px (1-col)
- Confirmed all 3 schemas already present in CategoryPage: **ItemList** (tools list), **FAQPage**, **BreadcrumbList**
- Added `images`, `icons` to OG/Twitter metadata on all 7 category `page.js` files — image paths at `/images/[slug].png` (need to be created)
- Added SmallPDF/iLovePDF privacy comparison line + CTA sentence to PDF Tools `about` text
- PDF Tools tagline and Privacy section now references: "Unlike tools like SmallPDF or iLovePDF, these tools run entirely in your browser — your files never leave your device."

---

## 2026-05-02 - Category Thumbnail Images

Created 1200x630 Open Graph thumbnail PNGs for all category pages and saved them in `public/images`.

- `pdf-tools.png`
- `css-tools.png`
- `developer-tools.png`
- `image-tools.png`
- `text-tools.png`
- `design-tools.png`
- `misc-tools.png`

---

## 2026-05-02 - Category Pages SEO Overhaul + Privacy Disclaimers + Misc Tools Page

### Category page improvements

Rewrote `src/components/CategoryPage/index.js` and `src/app/category-page.module.css` to significantly improve SEO quality and visual design:

- Added `renderInline` helper for `**bold**` parsing and extended `renderAbout` to support `### h3`, `## h2`, and `- bullet list` syntax in category `about` strings
- Added hero stats row with pill badges: tools count, "100% free", "No sign-up", "Nothing uploaded"
- Added tool-index sidebar (`<aside>`) listing all live tools in the category with icon + link — improves internal linking
- Semantic HTML: `<article>` for about, `<aside>` for tool list, `<section>` for FAQs and related categories
- 2-column CSS grid (1fr 280px) with sidebar spanning both content rows; collapses to single-column below 1024px

Rewrote all 7 category `about` texts in `src/lib/categories.js` with structured `### subheadings`, bullet lists, and ~400–700 words each. Expanded FAQs from 5–6 to 8–9 per category targeting different search intents:

- **PDF Tools** — 3 h3 subheadings, 9 FAQs
- **CSS Tools** — 3 h3 subheadings, 8 FAQs
- **Developer Tools** — 4 h3 subheadings, 8 FAQs
- **Image Tools** — 4 h3 subheadings, 8 FAQs
- **Text Tools** — 5 h3 subheadings + bullet list of 14 case formats, 8 FAQs
- **Design Tools** — 4 h3 subheadings, 5 FAQs (existing were already good)
- **Misc Tools** — 3 h3 subheadings + bullet list of thumbnail resolutions, 8 FAQs

### Privacy disclaimers

Added "Unlike most [tool-name], this tool runs fully in your browser — no data is uploaded" sentence to 8 tool `about` texts:
`freelance-invoice-generator`, `resume-builder`, `mortgage-calculator`, `rent-vs-buy-calculator`, `daily-focus-log`, `mini-kanban`, `html-to-pdf`, `pdf-metadata`

Saved memory rule: always include this sentence in SEO copy for financial/form-data tools.

### Misc Tools category page

- Created `src/app/misc-tools/page.js` with full metadata, OG/Twitter tags, and `<CategoryPage slug="misc-tools" />`
- Added "All Tools" (href: /) and "Misc Tools" (href: /misc-tools) to the category pill row in `src/components/HomeGrid/index.js`

---

## 2026-05-01 - New Tool: PDF Password Protector

Added a browser-based PDF Password Protector tool using qpdf-wasm.

- `src/components/PdfPasswordProtector/index.js` - upload a PDF, enter and confirm an open password, optional owner password, choose 128-bit or 256-bit encryption, allow/block printing, copying, and editing, then run qpdf encryption in the browser
- `src/components/PdfPasswordProtector/styles.module.css` - compact PDF tool UI with local-processing privacy messaging
- `src/app/pdf-password-protector/page.js` - metadata, FAQ schema, SoftwareApplication schema, 1000+ word SEO content, internal links, and share-ready structure
- `public/icons/pdf-password-protector.svg` and `public/images/pdf-password-protector.png` - SVG icon and 1200x630 OG thumbnail
- `public/qpdf/qpdf.js` and `public/qpdf/qpdf.wasm` - qpdf-wasm runtime assets for static hosting
- Updated registry, related tools, PDF category copy, homepage count/content, package dependencies, and qpdf cross-origin isolation headers
- Switched qpdf isolation headers to `Cross-Origin-Embedder-Policy: require-corp`, covered the exported `.html` route, and removed the premature `crossOriginIsolated` client-side blocker

---

## 2026-05-01 — Misc Tools Category + "All Tools" Nav Pill

- Created `/misc-tools` category page (`src/app/misc-tools/page.js`) with full metadata/OG/Twitter tags
- Added misc-tools slug to `categories.js` covering 6 uncategorized tools: mortgage-calculator, rent-vs-buy-calculator, youtube-thumbnail-downloader, pomodoro-timer, daily-focus-log, mini-kanban
- Updated HomeGrid category pills to include "All Tools" (links to `/`) at the start and "Misc Tools" at the end
- CategoryGrid already has all 8 pills including "All Tools" and "Misc Tools" with active-state highlighting

---

## 2026-05-01 — Category Cluster Pages (SEO)

Added 6 topic-cluster pages that each list all tools in a thematic group. All tool cards are rendered in static HTML at build time so Google can crawl every tool link without executing JavaScript.

**Pages created:**
- `/pdf-tools` — 12 PDF tools (merger, splitter, compressor, watermark, unlock, metadata, images↔PDF, HTML-to-PDF, resume, invoice)
- `/css-tools` — 25 CSS tools (Flexbox, Grid, gradients, animations, filters, converters, palette, contrast checker)
- `/developer-tools` — 26 dev tools (JSON, API, JWT, UUID, hash, diff, regex, cron, YAML, CSV, SQL, meta tags)
- `/image-tools` — 12 image tools (compressor, SVG tracer, Base64, OCR, QR code, favicon, OG image, code screenshot)
- `/text-tools` — 10 text tools (word counter, Markdown editor, diff, case converter, lorem ipsum, AI prompt studio)
- `/design-tools` — 14 design tools (color picker, palette, gradient, glassmorphism, SVG animation, icons, font pairing)

**Files created:**
- `src/lib/categories.js` — single source of truth for all category data (slugs, tool lists, about text, FAQs, metadata)
- `src/components/CategoryPage/index.js` — shared server component (H1, breadcrumb, schema markup, SEO section, related categories)
- `src/components/CategoryGrid/index.js` — client search grid; initial render includes all tools (visible in static HTML)
- `src/components/CategoryGrid/styles.module.css`
- `src/app/category-page.module.css`
- 6× `src/app/<category>/page.js`

**Schema markup per page:** ItemList (all tools with position, name, URL), FAQPage, BreadcrumbList.
**Sitemap:** Updated `scripts/postbuild.js` to include all 6 category URLs at priority 0.9.
**Tools appear in multiple categories** — e.g. `diff-checker` in both developer-tools and text-tools, `color-contrast-checker` in both css-tools and design-tools.

---

## 2026-05-01 — New Tool: HTML / Markdown to PDF

Added a fully client-side Markdown/HTML to PDF converter:

- `src/components/HtmlToPdf/index.js` — split-pane editor: left textarea (Markdown or HTML mode) + right iframe preview (srcdoc). Markdown parsed via `marked`. `buildPrintHtml()` wraps content in a full styled HTML document with CSS `@page` rule. Mode switch converts Markdown→HTML in place; HTML→Markdown resets to sample. Download opens `window.open()` popup and calls `win.print()` after 350 ms delay for layout.
- `src/components/HtmlToPdf/styles.module.css` — teal accent (#0f766e); `.split` flex row with `.editorPane` (border-right) + `.previewPane`; `.modeToggle` pill toggle; `.editor` monospace textarea (flex:1); `.preview` borderless iframe (flex:1). Mobile: stacks vertically, editor 40% height.
- `public/icons/html-to-pdf.svg` — teal icon with document lines + `</>` text overlay
- `src/app/html-to-pdf/page.js` — full SEO: FAQPage + SoftwareApplication schema, 10 FAQs, 12 features, 6 use-case cards, 6-step how-to, 5-paragraph about
- `src/lib/tools-registry.js` — added html-to-pdf (category: productivity, accent: #0f766e)
- `src/lib/related-tools.js` — added html-to-pdf entry

---

## 2026-05-01 — New Tool: PDF Metadata Editor

Added a fully client-side PDF metadata editor using pdf-lib:

- `src/components/PdfMetadata/index.js` — reads all metadata on upload via `readMeta(doc)`, pre-fills Title, Author, Subject, Keywords, and Creator fields; stores `original` snapshot; shows "was: [value]" hint below any changed field; `isDirty` flag drives Reset button and "● Unsaved changes" badge; saves with `doc.setModificationDate(new Date())`; downloads as `filename-edited.pdf`
- `src/components/PdfMetadata/styles.module.css` — amber accent (#d97706); `fieldRow` grid (110px label + 1fr input); `originalHint`, `dirtyBadge`; responsive single-column below 500px
- `public/icons/pdf-metadata.svg` — amber icon with document lines + pencil
- `src/app/pdf-metadata/page.js` — full SEO: FAQPage + SoftwareApplication schema, 9 FAQs, 10 features, 6 use-case cards, 6-step how-to, 4-paragraph about
- `src/lib/tools-registry.js` — added pdf-metadata (category: productivity, accent: #d97706)
- `src/lib/related-tools.js` — added pdf-metadata entry; cross-links to pdf-merger, pdf-splitter, pdf-unlock

---

## 2026-05-01 — New Tool: PDF Password Protect & Unlock

Added a fully client-side PDF password tool using pdf-lib:

- `src/components/PdfPassword/index.js` — two-tab component (Protect / Unlock)
  - **Protect tab**: upload PDF, enter+confirm password, set permissions (print/copy/edit), encrypt via pdf-lib, download as originalname-protected.pdf
  - **Unlock tab**: upload PDF, auto-detects encryption status, enter password, save without encryption, download as originalname-unlocked.pdf
  - Show/hide password toggle, confirm field mismatch validation, disabled button until valid
- `src/components/PdfPassword/styles.module.css` — blue accent (#0369a1); tab strip; permission checkboxes
- `public/icons/pdf-password.svg` — blue icon with document + padlock
- `src/app/pdf-password/page.js` — full SEO: FAQPage + SoftwareApplication schema, 9 FAQs, 6 use-case cards, 6-step how-to
- `src/lib/tools-registry.js` — added pdf-password (category: productivity)
- `src/lib/related-tools.js` — added pdf-password entry; updated pdf-splitter and pdf-merger to cross-link

---

## 2026-05-01 - New Tool: PDF Watermark

Added a browser-based PDF Watermark tool for applying text or image watermarks to PDF pages with pdf-lib.

### Features
- Upload one PDF and preview the first page locally
- Add text watermarks such as CONFIDENTIAL, DRAFT, SAMPLE, PAID, or COPY
- Add PNG or JPEG image watermarks such as logos, stamps, or signatures
- Control opacity, rotation, position, font size, text color, and image scale
- Tile text or image watermarks repeatedly across every page
- Apply the watermark to all PDF pages and download a new file
- Browser-only processing with no upload, no account, and no extra tool watermark
- Common use-case cards use SVG icon mappings instead of text abbreviation icons

### Files created / updated
- `src/components/PdfWatermark/index.js`
- `src/components/PdfWatermark/styles.module.css`
- `src/app/pdf-watermark/page.js`
- `public/icons/pdf-watermark.svg`
- `public/images/pdf-watermark.png`
- `src/components/SeoSection/index.js`
- `src/lib/tools-registry.js`
- `src/lib/related-tools.js`
- `src/app/page.js`

---

## 2026-05-01 - New Tool: PDF Page Organizer

Added a visual PDF Page Organizer for reordering, deleting, and rotating pages in a single PDF.

### Features
- Upload one PDF and render page thumbnails locally with PDF.js
- Move pages up or down to control final output order
- Delete unwanted pages with a one-step undo
- Rotate individual pages left or right in 90-degree steps
- Preserve original page content by copying pages with pdf-lib rather than rasterizing
- Download a new organized PDF while leaving the source file untouched
- Common use-case cards now render SVG icons instead of text abbreviations
- Browser-only processing with no upload, no watermark, and no account required

### Follow-up
- Extended the shared SEO card icon renderer so other recently added PDF/image tools also render SVGs for `PDF`, `PNG`, `JPG`, `WEBP`, `ZIP`, `OCR`, `A4`, `SCAN`, `MAIL`, `PPT`, `WEB`, and `SAFE`
- Added project memory to use SVG icons for future SEO use-case cards instead of visible abbreviation labels

### Files created / updated
- `src/components/PdfPageOrganizer/index.js`
- `src/components/PdfPageOrganizer/styles.module.css`
- `src/app/pdf-page-organizer/page.js`
- `public/icons/pdf-page-organizer.svg`
- `public/images/pdf-page-organizer.png`
- `src/lib/tools-registry.js`
- `src/lib/related-tools.js`
- `src/app/page.js`

---

## 2026-05-01 - New Tool: PDF Compressor

Added a browser-based PDF Compressor for reducing scanned or image-heavy PDF file size by re-rendering pages with PDF.js and rebuilding a compressed PDF with pdf-lib.

### Features
- Upload one PDF and preview the first page locally
- Compress by rasterizing each page to JPEG at controlled scale and quality
- Presets for Screen, Balanced, and Sharper output
- Manual render scale slider for size versus clarity
- Manual JPEG quality slider for stronger or lighter compression
- Progress messages while pages are rendered and rebuilt
- Original versus compressed file size summary after download
- Clear warning that selectable text, links, forms, and vectors are flattened
- Fully browser-side processing with no upload, no account, and no watermark

### Files created / updated
- `src/components/PdfCompressor/index.js`
- `src/components/PdfCompressor/styles.module.css`
- `src/app/pdf-compressor/page.js`
- `public/icons/pdf-compressor.svg`
- `public/images/pdf-compressor.png`
- `src/lib/tools-registry.js`
- `src/lib/related-tools.js`
- `src/app/page.js`

---

## 2026-05-01 - New Tool: Images to PDF

Added a browser-based Images to PDF converter for combining multiple image files into one PDF.

### Features
- Upload multiple JPG, PNG, WebP, GIF, BMP, SVG, or browser-readable image files
- Preview image cards with dimensions, file size, and page order
- Reorder images with Up and Down controls before creating the PDF
- Remove individual images or clear the whole list
- Choose Auto, A4, Letter, or Square page sizes
- Use automatic, portrait, or landscape orientation for fixed page sizes
- Select image fit mode: contain, cover, or stretch
- Adjust margins and converted image quality
- Create one PDF entirely in the browser with pdf-lib
- No upload, no watermark, no account required

### Files created / updated
- `src/components/ImagesToPdf/index.js`
- `src/components/ImagesToPdf/styles.module.css`
- `src/app/images-to-pdf/page.js`
- `public/icons/images-to-pdf.svg`
- `public/images/images-to-pdf.png`
- `src/lib/tools-registry.js`
- `src/lib/related-tools.js`
- `src/app/page.js`

---

## 2026-05-01 - PDF to Images OG Thumbnail and SEO Expansion

Updated the PDF to Images tool with a generated social preview image and fuller search-focused SEO content.

### Changes
- Added the missing SeoSection H1 title, subtitle, and share controls for the tool page
- Added `public/images/pdf-to-images.png` as a 1200x630 Open Graph thumbnail
- Wired the thumbnail into Open Graph metadata, Twitter card metadata, and SoftwareApplication schema
- Expanded `src/app/pdf-to-images/page.js` SEO copy to target PDF to PNG, PDF to JPG, PDF to WebP, selected page range conversion, and no-upload privacy searches
- Reworked FAQ questions as Google-style search queries
- Added contextual internal links to related tools including PDF Splitter, PDF Merger, Image Compressor, Image to Base64, Image to Text, and SVG to PNG

---

## 2026-05-01 — New Tool: PDF Splitter (extract pages or split all to ZIP)

Added a fully client-side PDF splitter using pdf-lib + jszip:

- `src/components/PdfSplitter/index.js` — main component
  - Drag-and-drop or click-to-browse for a single PDF
  - Visual numbered page grid — click tiles to toggle selection
  - Range input: supports `1-3, 5, 8-10` syntax with validation
  - Select All / None / Invert quick-selection buttons
  - "Extract selected → PDF": downloads chosen pages as one file via pdf-lib
  - "Split all → ZIP": creates one PDF per page, bundles into ZIP via jszip (dynamic import)
  - Zero-padded filenames inside ZIP for correct sort order
  - "Change PDF" resets without page refresh
- `src/components/PdfSplitter/styles.module.css` — full stylesheet
  - Purple accent (#7c3aed) to distinguish from PDF Merger (red)
  - Responsive page grid with aspect-ratio 3/4 tiles
  - Checkmark badge on selected tiles
- `public/icons/pdf-splitter.svg` — purple icon
- `src/app/pdf-splitter/page.js` — full SEO (1200+ words): FAQPage + SoftwareApplication schema, 10 FAQs, 6 use-case cards, 6-step how-to
- `src/lib/tools-registry.js` — added pdf-splitter entry (category: productivity)
- `src/lib/related-tools.js` — added pdf-splitter entry; updated pdf-merger to cross-link
- Installed `jszip` npm package

---

## 2026-05-01 — New Tool: PDF Merger (browser-based, no upload)

Added a fully client-side PDF merger using pdf-lib:

- `src/components/PdfMerger/index.js` — main component
  - Drag-and-drop or click-to-browse for multiple PDF files
  - Reads page count from each PDF via pdf-lib on add
  - File cards with ↑/↓ reorder and × remove per file
  - Merge uses `PDFDocument.copyPages` to assemble all pages in order
  - Output downloaded as `merged.pdf` via Blob URL — no server contact
  - Error handling for encrypted/corrupted PDFs
  - Tips panel shown when no files added
- `src/components/PdfMerger/styles.module.css` — full stylesheet
  - Compact drop zone collapses to row when files present
  - File cards with SVG PDF thumbnail + index badge
  - Red accent (#dc2626) consistent with PDF branding
- `public/icons/pdf-merger.svg` — red rounded-square icon
- `src/app/pdf-merger/page.js` — SEO page with FAQPage + SoftwareApplication schema
- `src/lib/tools-registry.js` — added pdf-merger entry (category: productivity)
- `src/lib/related-tools.js` — added pdf-merger entry; updated resume-builder and freelance-invoice-generator to cross-link
- Installed `pdf-lib` npm package

---

## 2026-05-01 — Resume Builder: related tools + freelance-invoice-generator cross-links

- Added `'resume-builder'` entry to `src/lib/related-tools.js` with 8 related tools: `freelance-invoice-generator`, `word-counter`, `markdown-editor`, `font-pairing-tool`, `color-palette-generator`, `ai-prompt-studio`, `lorem-ipsum-generator`, `mini-kanban`
- Added `'freelance-invoice-generator'` entry to `src/lib/related-tools.js` (was missing) with `resume-builder` as first related tool for cross-linking

---

## 2026-05-01 — New Tool: Resume Builder (Privacy-First, No AI)

Added a full-featured browser-based resume builder:

- `src/components/ResumeBuilder/index.js` — main component (~930 lines)
  - 4 HTML string templates: Classic (ATS), Modern (sidebar), Minimal (ATS), Executive (dark header)
  - 6 Google Fonts with dynamic `<link>` injection per font
  - 7 sections: Summary, Experience, Education, Skills, Projects, Certifications, Languages
  - Section toggle + reorder (↑/↓) with instant preview update
  - Custom accent color (color picker + hex + 8 presets)
  - Auto-save to localStorage (`wdp-resume-v1`) gated by `loaded` flag
  - Export JSON / Import JSON for cross-device portability
  - `handlePrint` opens print-ready full HTML doc in new tab
  - `ResumeThumbnail` CSS mockup component for template strip
- `src/components/ResumeBuilder/styles.module.css` — full stylesheet
  - Two-column layout (formPane 360px + previewPane flex)
  - Template strip with ATS badges
  - Responsive: stacks vertically below 900px
- `public/icons/resume-builder.svg` — tool icon
- `src/app/resume-builder/page.js` — SEO page with FAQPage + SoftwareApplication schema, 1000+ word about, 14 features, 8 how-to steps, 10 FAQs
- `src/lib/tools-registry.js` — added resume-builder entry (category: productivity)

Unique angle: 100% browser-based, no AI, no login, privacy badge in toolbar.

## 2026-04-30 — Freelance Invoice Generator: multi-invoice + export/import

Added multi-invoice management and data portability to the Freelance Invoice Generator:

- **Tab strip** — sits between toolbar and body; each invoice gets a tab showing its invoice number; active tab is visually distinguished; close button (×) removes individual invoices (last invoice is protected — resets instead of deleting)
- **Multiple invoices** — "+" New button creates a new invoice with auto-incremented number (INV-002, INV-003…); switching tabs saves the current invoice state before loading the next
- **Export** — "↑ Export" downloads all invoices as `invoices-backup.json` (full state, all fields, all invoices)
- **Import** — "↓ Import" restores from a JSON backup file; supports v2 multi-invoice format and v1 single-invoice exports; silently ignores invalid files
- **Architecture** — `getSnapshotRef` pattern: ref updated every render in component body, callbacks read latest state synchronously without stale closures; `applySnapshot` is a stable `useCallback([], [])` calling all state setters; `fullListRef` holds the full list of invoice objects for storage reads; localStorage key upgraded to `wdp-invoices-v2` with v1 migration on first load
- **Clear button** — now resets only the current invoice (keeps invoice number, creates fresh fields); no longer clears all invoices

---

## 2026-04-30 — Freelance Invoice Generator + YouTube Thumbnail Downloader

Added two new tools and completed all follow-up work:

**YouTube Thumbnail Downloader**
- Extracts video IDs from all YouTube URL formats (watch, youtu.be, shorts, live, embed)
- Shows 5 resolution cards (MAX/HQ/SD/MQ/SM) in a responsive 2-column grid
- Download via 3-proxy fallback chain (weserv.nl → corsproxy.io → allorigins.win → window.open)
- Auto-detects missing maxresdefault via naturalWidth check
- SEO page with howToUse as numbered steps + FAQPage/SoftwareApplication/BreadcrumbList schemas

**Freelance Invoice Generator**
- Full form + live preview + PDF print workflow
- Multi-currency support (USD, EUR, GBP, INR, CAD, AUD, JPY, CHF, SGD, AED)
- Dynamic accent color with presets
- Logo upload (base64)
- Multiple tax lines: `taxes` array with custom label (GST/VAT/PST etc.) + rate, add/remove rows
- Discount: fixed amount or percentage
- localStorage auto-save via two-effect pattern with `loaded` gate
- "● Auto-saved" badge in toolbar
- PDF built via `buildPrintHtml()` → `window.open()` → `window.print()` after 500ms
- SEO page with numbered steps + FAQPage/SoftwareApplication/BreadcrumbList schemas

**Cross-tool improvements**
- Standardized toolbar icon: all tools now use `<img src="/icons/[slug].svg">` instead of text glyphs
- howToUse sections now use `type: 'steps'` in `sections` array format (not flat string)

---

## 2026-04-29 — Full blob sync to GitHub Gist (both tools)

Extended Gist sync in both Daily Focus Log and Mini Kanban to include actual file blobs:

- **Blob sync on push** — every sync now reads all attachment blobs from IndexedDB, base64-encodes them, and saves them in a second Gist file (`daily-focus-log-blobs.json` / `mini-kanban-blobs.json`). Files over 5 MB are skipped (too large for reliable Gist storage).
- **Blob restore on pull** — "Restore from Gist" now also downloads the blobs file, decodes each entry, saves to IDB, and rebuilds the object URL map so attachments are immediately usable.
- **Auto-detect existing Gist on first connect** — when a token is entered for the first time (no local gistId), the tools now search the account's gist list for the matching filename. If found, they pull and restore everything (data + blobs) instead of creating a duplicate. If not found, they push to create a new Gist.
- **Truncation handling** — large Gist files that GitHub serves as truncated are fetched via `raw_url` automatically.
- Updated sync panel note from "Images stored locally" to "Files > 5 MB won't sync".

---

## 2026-04-29 — Daily Focus Log: Export & Unavailable File UX fixes

Fixed two gaps in the file attachment feature:

- **Markdown export now lists attachments** — each log entry in the `.md` export now shows attached filenames with size and emoji icon (e.g. `📄 report.pdf (487 KB) — stored locally`). Legacy `imageIds` entries show a count like `🖼 2 images (stored locally)`.
- **Missing file indicators after import/cross-device** — when a JSON backup is imported on another device, the actual blobs don't transfer (they live in local IndexedDB). Previously action buttons would silently do nothing. Now:
  - File pills show a greyed italic "Not available" label instead of a broken button
  - Image thumbnails show a dashed placeholder box with the filename instead of rendering nothing

---

## 2026-04-28 — New Tool: Pomodoro Timer

Added a full-featured Pomodoro productivity timer:
- **Circular SVG progress ring** — color-coded by mode (red Pomodoro, green short break, blue long break)
- **Three modes** — Pomodoro (25 min), Short Break (5 min), Long Break (15 min)
- **Tab title countdown** — updates every second so timer is visible from any tab
- **Sound alerts** — three-tone chime via Web Audio API, no external files
- **Browser notifications** — desktop alert on session end, one-click permission request
- **Four-stage cycle** — round dots track progress; long break auto-triggers after 4 Pomodoros
- **Task input** — write what you're working on before each session
- **Customizable durations** — settings panel for all three session types (1–99 min)
- **Auto-start toggle** — chains sessions without clicking Play
- **Skip + Reset controls** — skip to next session or restart current
- **Daily stats** — sessions completed, minutes focused, full cycles
- Added under `dev` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js: daily-focus-log, mini-kanban cross-linked

---

## 2026-04-28 — New Tool: API Mock Generator

Added a full REST API mock builder for frontend developers:
- **Multi-endpoint sidebar** — add/remove endpoints, method badge, path, status dot
- **Method selector** — GET (green), POST (blue), PUT (amber), PATCH (purple), DELETE (red)
- **Config bar** — method, path, status code, mock delay (ms) per endpoint
- **Smart fake data generator** — field-name-aware faker: UUIDs, emails, names, phones, URLs, ISO dates, prices, ratings, booleans, lorem text, colors; arrays expanded 2–5 items recursively
- **JSON validation** — live invalid JSON badge on body editor
- **Response headers preview** — Content-Type, status, delay chips
- **Simulated response preview** — formatted JSON with status pill
- **Copy cURL** — one-click cURL command for sharing/testing
- **Export JSON Server** — generates db.json with run command tip
- **Export Postman Collection** — v2.1 format with endpoints, headers, example responses, baseUrl variable
- Added under `dev` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js: api-request-generator-tester cross-linked

---

## 2026-04-29 — SEO updates: Daily Focus Log + Mini Kanban

Updated SEO pages for two tools to reflect new features:

**Daily Focus Log (`/daily-focus-log/page.js`)**:
- metadata description, OG/Twitter description updated to mention image attachments + Gist sync
- Added 3 new keywords: image upload, gist sync, cloud backup
- softwareSchema description + featureList updated with image and Gist entries
- `SEO.about.description` — added two new paragraphs (images, Gist sync)
- `SEO.features` — added 2 new bullet points
- `SEO.faqs` + `faqSchema` — added 2 new Q&As (image upload how-to, Gist sync how-to)

**Mini Kanban (`/mini-kanban/page.js`)**:
- metadata description, OG/Twitter description updated
- Added 3 new keywords
- `SEO.about.description` — prepended two new feature paragraphs
- `SEO.features` — added 2 new bullet points (image attachments, Gist sync)
- `SEO.faqs` — added 2 new Q&As

---

## 2026-04-28 — New Tool: SVG to PNG Converter

Added a browser-based SVG to PNG converter:
- **Two input modes** — Upload SVG (drag-and-drop or file picker) and Paste Code (raw SVG markup)
- **Auto-dimension detection** — reads width/height/viewBox from SVG on load
- **Scale selector** — 1×, 2×, 3×, 4× with auto dimension update
- **Custom dimensions** — type exact px values up to 8192×8192; aspect ratio lock
- **Background options** — Transparent, White, Black, Custom color (picker + hex input)
- **Auto-convert on load** — PNG renders immediately when SVG is loaded
- **Re-convert button** — manual refresh after settings change
- **Checkered preview** — represents transparency in the preview area
- **SVG source preview** — small rendered SVG below preview panel
- **Download PNG** + **Copy to clipboard** (Clipboard API with download fallback)
- **Size comparison** — SVG source vs PNG output byte size
- Uses HTML Canvas API + browser SVG renderer; no server; works offline
- Added under `converters` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js: image-to-svg, favicon-generator cross-linked

---

## 2026-04-28 — New Tool: Text Case Converter

Added a 14-format simultaneous text case converter:
- **14 formats in one view** — camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, COBOL-CASE, Train-Case, dot.case, UPPER CASE, lower case, Title Case, Sentence case, alternating case, inverse case
- **Smart input splitting** — auto-detects camelCase/PascalCase word boundaries; splits on spaces, hyphens, underscores, dots
- **Multi-line support** — each line converted independently; paste a batch of identifiers
- **Pin cards** to top of grid for fast access to favourite formats
- **↑ Apply back** — feed any converted output back into input for chaining
- **Filter** — search box filters cards by case name
- Word + char count live in header; Paste, Sample, Clear shortcuts
- Added under `dev` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js: word-counter cross-linked

---

## 2026-04-28 — New Tool: OG Image Generator

Added a canvas-based Open Graph image generator:
- **5 templates** — Clean (accent bar top), Dark (dark bg + left bar), Gradient (two-color linear gradient), Bold (oversized title + accent shapes), Split (colored left panel + content right)
- **1200×630 px output** — standard OG image size for Twitter, Facebook, LinkedIn, Slack
- **Live preview** — HTML Canvas re-renders on every control change
- **Customizable** — title, description, site name, background color, accent color, text color, font family (4 options), logo upload
- **Gradient mode** — two color pickers for gradient start/end colors
- **Logo upload** — any image format, positioned per template
- **Download PNG** — full-resolution, no watermark
- **Copy to clipboard** — Clipboard API; falls back to download
- **Text wrapping** — custom wrapText/measureLines for canvas text layout
- Added under `dev` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js: meta-tag-generator, favicon-generator cross-linked

---

## 2026-04-28 — New Tool: HTML to Markdown Converter

Added a full HTML-to-Markdown converter with no external dependencies:
- **Live conversion** — updates instantly using browser's native DOMParser API
- **Full element support** — h1–h6, bold, italic, strikethrough, inline code, fenced code blocks (language preserved), links, images, ul/ol lists with nesting, blockquotes, tables (GFM pipe format), hr, br
- **Table conversion** — thead/tbody → GFM pipe table with separator row; pipe chars in cells auto-escaped
- **Block unwrapping** — div, section, article, figure etc. stripped, inner content preserved
- **Copy + Download .md** — copy to clipboard or save as document.md
- **Paste, Sample, Clear** shortcuts
- File byte size shown for both panels
- No extra npm dependency — uses DOMParser + recursive tree walker
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Added to tools-registry.js (dev category); related-tools.js updated for markdown-to-html, markdown-editor cross-links

---

## 2026-04-28 — New Tool: Color Contrast Checker

Added a full WCAG 2.1 color contrast checker:
- **Contrast ratio** calculated using the official WCAG relative luminance formula
- **Five WCAG criteria** checked simultaneously — AA Normal (4.5:1), AAA Normal (7:1), AA Large (3:1), AAA Large (4.5:1), AA UI components (3:1)
- **Three preview modes** — Normal text, Large text, UI components (buttons, inputs, checkboxes, icons)
- **Suggested fix** — auto-calculates a passing foreground color when AA fails, with one-click "Use"
- **Luminance display** — shows relative luminance for both colors
- **Swap button** — reverses foreground/background in one click
- **Six presets** — curated passing and failing color pairs
- Color picker + hex input with RGB display per color
- Added under `css` category in tools-registry.js
- Full SEO: 8 FAQ schema entries, SoftwareApplication + breadcrumb schemas
- Updated related-tools.js for color-picker, color-palette-generator cross-links

---

## 2026-04-28 — New Tool: Markdown to HTML Converter

Added a full-featured Markdown to HTML converter:
- **Split-pane layout** — Markdown input left, HTML output right
- **Live conversion** — updates as you type using `marked` with GFM enabled
- **Preview / HTML tabs** — toggle between rendered preview and raw HTML source
- **Three copy/export options** — Copy HTML fragment, Copy Full Page (with inline CSS), Download as .html
- **GFM support** — tables, task lists, strikethrough, fenced code blocks with language classes
- Sanitized output — strips scripts, event handlers, and javascript: hrefs
- Paste, Sample, Clear shortcuts in header
- Word count + byte size shown in pane headers
- Full SEO page: 8 FAQ schema entries, SoftwareApplication schema, breadcrumb schema
- Added to tools-registry.js and related-tools.js

---

## 2026-04-28 — New Tool: Lorem Ipsum Generator

Added a full lorem ipsum placeholder text generator:
- **Three output modes** — Paragraphs (up to 20), Sentences (up to 50), Words (up to 500)
- **Length controls** — min/max sentences per paragraph and min/max words per sentence with slider + number input
- **HTML wrapping** — toggle to wrap output in `<p>` tags for direct paste into HTML/JSX/CMS
- **Classic opening** — toggle to start with the canonical "Lorem ipsum dolor sit amet…" phrase
- **Instant copy** — one-click copy with checkmark confirmation
- Full SEO page with 8 FAQ schema entries, SoftwareApplication schema, breadcrumb schema
- Added to tools-registry.js under dev category; icon at `/public/icons/lorem-ipsum-generator.svg`

---

## 2026-04-28 — Mini Kanban: checklist DnD, panel resize, Export/Backup, inline edit

Four enhancements to Mini Kanban:
- **Checklist drag-to-reorder** — each checklist item has a 6-dot drag handle; HTML5 DnD reorders items within the checklist in-place with a drop indicator line.
- **Panel resizable** — drag the left edge of the task detail panel to resize it between 300px and 88% of viewport width. Resize handle uses `mousedown`/`mousemove`/`mouseup` on `document`.
- **Export / Backup** — renamed "Export" button to "Export / Backup" for clarity.
- **Double-click to edit checklist item** — double-clicking any checklist item text activates an inline input; Enter/blur saves, Escape cancels.

---

## 2026-04-28 — New Tool: Markdown Editor with Live Preview

Added the Markdown Editor tool (`/markdown-editor`) — targets "markdown editor online", "markdown live preview", "online markdown editor free", "markdown to html converter", "github flavored markdown editor", and related high-intent writing/developer queries. Tool #62.

**Implementation:** Uses `marked` v18 with `{ gfm: true, breaks: true }` for GitHub Flavored Markdown rendering. Inline XSS sanitizer strips `<script>`, `<iframe>`, `on*` event handlers, and `javascript:` URLs without needing DOMPurify (avoids SSR issues). `localStorage` auto-save with 1-second debounce; draft restored on mount. View modes: Split / Editor / Preview via segmented control. Proportional scroll sync between editor and preview panes.

**UI:** Toolbar with 5 groups × 15 buttons (H1–H3, Bold/Italic/~~, `code`/``` ``` ```, blockquote/ul/ol/task, link/image/table/hr). Keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+K, Tab. Footer stats: word/char/line count, ✓ Saved indicator, Copy MD, Copy HTML, Download .md, Download .html.

**Files created:** `src/components/MarkdownEditorTool/index.js`, `src/components/MarkdownEditorTool/styles.module.css`, `src/app/markdown-editor/page.js`, `public/icons/markdown-editor.svg`.

---

## 2026-04-28 — New Tool: UUID / ULID / NanoID Generator

Added the UUID / ULID / NanoID Generator tool (`/uuid-generator`) — targets "uuid generator" (very high volume), "uuid v4 generator", "ulid generator", "nanoid generator", "bulk uuid generator", "uuid v7 generator", and related high-intent developer queries. Tool #61.

**Implementation:** Pure client-side, no npm dependencies. UUID v4 via `crypto.randomUUID()`. UUID v7 via BigInt timestamp packing + `crypto.getRandomValues()` (RFC 9562 compliant). UUID v1 via 100-ns interval timestamp since 1582 + random node ID (MAC address replaced with random bytes for privacy). ULID via Crockford Base32 encoding of 48-bit timestamp + 80-bit BigInt random. NanoID via rejection-sampling with power-of-2 mask to ensure uniform distribution across any alphabet size.

**UI:** Type tabs (UUID v4/v7/v1/ULID/NanoID), quick-count buttons (1/5/10/50/100) + free input (max 1000), hover-to-reveal per-row copy, Copy All + Download + Clear. UUID options: uppercase, no-hyphens. ULID option: uppercase/lowercase. NanoID options: length input, 6 alphabet presets + custom input.

**Files created:** `src/components/UuidGeneratorTool/index.js`, `src/components/UuidGeneratorTool/styles.module.css`, `src/app/uuid-generator/page.js`, `public/icons/uuid-generator.svg`.

**Registry/sitemap:** Added to `tools-registry.js` (dev category, accent `#f59e0b`). Count updated 60 → 61. Added `uuid-generator` to `related-tools.js` cross-linked to `password-generator`, `hash-generator`, `jwt-decoder`, `json-to-typescript`, `api-request-generator-tester`.

---

## 2026-04-28 — New Tool: JSON to TypeScript Interface Generator

Added the JSON to TypeScript Interface Generator tool (`/json-to-typescript`) — targets "JSON to TypeScript interface generator", "convert JSON to TypeScript", "json to ts converter", "generate TypeScript types from JSON", and related high-intent developer search terms. This is tool #60.

**Implementation:** Pure client-side JS — no npm dependencies. Recursive tree walker infers types (string, number, boolean, null/unknown/any, T[], interface refs) and generates named interfaces for every nested object. Array-of-objects support merges all items into a single unified interface. Singularization logic derives clean names (`users` → `User`, `categories` → `Category`).

**Options:** interface vs type alias, export keyword toggle, optional fields, T[] vs Array<T> array syntax, null-as (null/unknown/any), customizable root name. Syntax-highlighted TypeScript output (keywords, type names, primitives in distinct colors). Copy + Download .ts.

**Files created:** `src/components/JsonToTypeScriptTool/index.js`, `src/components/JsonToTypeScriptTool/styles.module.css`, `src/app/json-to-typescript/page.js`, `public/icons/json-to-typescript.svg`.

**Registry/sitemap:** Added to `tools-registry.js` (converters category, accent `#3b82f6`). Tool count updated 59 → 60 in `src/app/page.js` (all 8 occurrences). Added `json-to-typescript` to `related-tools.js` with cross-links to `json-formatter`, `yaml-json-converter`, `json-table-viewer`, `api-request-generator-tester`, and others. Updated `json-formatter`, `json-table-viewer`, `json-dashboard-generator`, `yaml-json-converter`, `csv-json-converter`, and `api-request-generator-tester` related lists to reference the new tool.

---

## 2026-04-28 — New Tool: Image to Text Converter (OCR)

Added the Image to Text Converter tool (`/image-to-text-converter`) — targets "image to text converter", "OCR online free", "extract text from image", "photo to text converter", "jpg to text", "screenshot to text", and related high-volume search terms.

**Stack:** Tesseract.js (dynamic import, WebAssembly OCR engine). No server-side processing. First use downloads ~10 MB language data from jsDelivr CDN, cached permanently after that.

**Features:**
- Drag & drop, file upload, clipboard paste (Ctrl+V screenshots)
- 16 languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified/Traditional), Japanese, Korean, Arabic, Hindi, Dutch, Polish, Turkish
- Progress bar showing engine load → language load → recognition stages
- OCR confidence score (colour-coded green/yellow/red)
- Editable output textarea — fix errors before copying
- Copy to clipboard + download as .txt
- 100% private — image never leaves the browser

**Files created:**
- `src/components/ImageToTextTool/index.js`
- `src/components/ImageToTextTool/styles.module.css`
- `src/app/image-to-text-converter/page.js`
- `public/icons/image-to-text-converter.svg`

**Files updated:**
- `src/lib/tools-registry.js` — added entry (category: converters, accent: #a78bfa)
- `src/app/page.js` — count 58 → 59
- `src/lib/related-tools.js` — added entry for image-to-text-converter

---

## 2026-04-28 — New Tool: SQL Formatter & Beautifier

Added the SQL Formatter tool (`/sql-formatter`) — targets "sql formatter", "sql beautifier", "format sql online", "mysql formatter", "postgresql formatter", and related high-intent developer queries.

**Features built:**
- Auto-format SQL live as you type with proper clause indentation (SELECT columns, JOIN, WHERE, GROUP BY, ORDER BY each on their own line)
- SQL minifier — strips comments and collapses to compact single line
- Keyword casing: UPPERCASE / lowercase / preserve
- Indent control: 2, 4, or 8 spaces
- Dialect selector: Generic SQL, MySQL, PostgreSQL, SQLite, SQL Server
- Subquery auto-detection and indentation
- CTE (WITH...AS) formatting
- CASE/WHEN/THEN/ELSE/END indentation
- Multi-statement scripts (semicolon-separated) formatted independently
- Full syntax highlighting: clause keywords (blue), other keywords (lighter blue), strings (green), numbers (red), comments (dimmed), quoted identifiers (purple)
- File upload (.sql, .txt) and drag & drop
- Copy to clipboard + download as query.sql
- Query history — last 10 queries auto-saved in localStorage
- Line numbers on both panels
- Stats bar: statement count, keyword count, line count, dialect label

**Files created:**
- `src/components/SqlFormatterTool/index.js`
- `src/components/SqlFormatterTool/styles.module.css`
- `src/app/sql-formatter/page.js` (full SEO: metadata, FAQPage + SoftwareApplication + BreadcrumbList schema, SeoSection)
- `public/icons/sql-formatter.svg`

**Files updated:**
- `src/app/globals.css` — added `.sql-cl`, `.sql-kw`, `.sql-st`, `.sql-nm`, `.sql-cm`, `.sql-id`, `.sql-op`, `.sql-br`, `.sql-pu` syntax highlight classes
- `src/lib/tools-registry.js` — added sql-formatter entry (core, dev category, accent #60a5fa)
- `src/lib/related-tools.js` — added sql-formatter related tools entry
- `src/app/page.js` — updated all tool count strings from 57 → 58

---

## 2026-04-27 — New Tool: Word Counter & Text Analyzer

Added the Word Counter tool (`/word-counter`) — a high-traffic utility targeting "word counter", "character counter", "reading time calculator", "readability checker", and "keyword density" search queries.

**Features built:**
- Live word count, character count (with/without spaces), sentence count, paragraph count, line count
- Unique word count, average word length, average sentence length
- Reading time estimate at 238 wpm; speaking time at 130 wpm
- Flesch Reading Ease score (0–100) with color-coded grade label and progress bar
- Keyword density panel — top 12 content words by frequency, stop words excluded, bars + percentage
- Text case converter toolbar with 9 modes: lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, kebab-case, Strip Spaces, Reverse Text
- Paste / Copy / Clear / Sample buttons in header

**Files created:**
- `src/components/WordCounterTool/index.js`
- `src/components/WordCounterTool/styles.module.css`
- `src/app/word-counter/page.js` (full SEO: metadata, FAQPage schema, SoftwareApplication schema, BreadcrumbList schema, SeoSection with 800+ word content targeting 10+ keyword phrases)
- `public/icons/word-counter.svg`

**Files updated:**
- `src/lib/tools-registry.js` — added word-counter entry (core, dev category, accent #fb923c)
- `src/app/page.js` — updated all 8 tool count strings from 56 → 57

---

## 2026-04-27 — Mini Kanban: 5 new features

Added all 5 features to Mini Kanban tool:

1. **Due dates** — date picker in task panel; card badge shows Overdue (red), Today (amber), Tomorrow/Soon (orange), or date (neutral); clear button to remove
2. **Checklists** — per-task checklist with checkbox items; add/toggle/delete items; card shows `X/Y ✓` progress badge (green when complete); count shown in panel header row
3. **Task labels/color tags** — fixed palette of 6 labels (Bug, Feature, Urgent, Blocked, Review, Docs) with distinct colors; label picker in panel toggles labels on/off; colored dot strip on task cards; label filter bar below header to filter board by label (persists until cleared or project switched)
4. **Keyboard shortcuts** — `/` focuses search, `?` opens shortcuts help modal, `Esc` closes open panel or modal; panel close uses `closePanelRef` to avoid stale closure issues; `?` button added to header
5. **Markdown rendering** — description panel shows rendered markdown (bold, italic, inline code, h1/h2, bullet lists) with Edit/Preview toggle; clicking preview area enters edit mode; blur auto-saves and returns to preview; no external library, regex-based inline formatter

CSS additions: label filter bar, label dots, card badges (due + checklist), due badge data-status variants, label picker, date input, markdown preview styles, checklist UI, shortcuts modal.

---

## 2026-04-27 — Mini Kanban: auto-save, polish, and bug fixes

- **Auto-save**: Removed Save button entirely; all edits to task name and description now auto-save with 700ms debounce via `scheduleSave(name, desc)`; `flushSave` called on panel close and Ctrl+Enter
- **History on every edit**: `doSaveTask` pushes prior state to history (max 20) on every debounced save where content changed — no manual save needed
- **Restore all history**: Restoring a history entry keeps all prior entries; current state is prepended to history before restore
- **Column management**: Dropdown (▾ caret) with Rename and Delete options; rename focuses and selects input via `useRef`+`useEffect` to avoid focus-steal bug
- **Duplicate column name prevention**: `colNameExists()` check on add and rename; inline red error message
- **Delete modals**: Custom modal for both column delete (warns about task count) and task delete; SVG warning icon with proper text wrapping
- **Dropdown outside-click**: Invisible `position: fixed; inset: 0; z-index: 19` overlay closes dropdown reliably — avoids document `mousedown` firing before React `onClick`
- **Auto-resize textarea**: `useEffect([panelDesc])` calls `autoResize()` on every desc state change — reliable on panel open, restore, and typing
- **Removed**: `panelDirty` state, `handlePanelSave`, `.saveBtn`/`.saveBtnActive` CSS classes

## 2026-04-27 — New tool: Mini Kanban

- **New tool**: `mini-kanban` — Project task board with columns, drag-and-drop, task history, IndexedDB storage
- **Projects**: Create/rename/switch projects; each project has its own columns and tasks
- **Columns**: 4 default columns (To Do, In Progress, Done, Saved); add/rename/delete columns
- **Tasks**: Add/delete tasks per column; drag-and-drop between columns with drop indicator line
- **Task panel**: Slide-in panel with title, description textarea, edit history with restore
- **IndexedDB**: Single ROOT_KEY JSON blob; singleton `_db` pattern; auto-save debounce 700ms
- **Export/Import**: Full JSON backup and restore
- **Files created**: `MiniKanbanTool/index.js`, `MiniKanbanTool/styles.module.css`, `src/app/mini-kanban/page.js`, `public/icons/mini-kanban.svg`
- **Registry + homepage**: Added to tools-registry.js; tool count updated 55→56 in page.js

## 2026-04-26 — Daily Focus Log: post-launch fixes and improvements

- **Unlimited tasks**: Removed MAX_TASKS=3 cap — tasks can now be added without limit; add row always visible
- **Import UX overhaul**: Header "Import" button is now a `<label>` wrapping a hidden `<input type="file">`; selecting a file immediately reads and merges data (no modal, no extra click); shows toast "✓ N days imported"
- **Import merge bug fixed**: Root cause was `{ ...imported, ...data }` spread order silently overwriting imported day entries with current (empty) ones; fixed with smart ID-based merge that deduplicates tasks and log entries across days
- **Monthly calendar heatmap**: Added month navigation (prev/next arrows), CSS Grid 7-column calendar view, null-padded cells for days before the 1st, 3-level amber intensity based on activity relative to month max (`Math.ceil((activity / monthMax) * 3)`), today highlighted with amber ring, future dates dimmed

---

## 2026-04-26 — New tool: Daily Focus Log

- **New tool**: `daily-focus-log` — Daily Work Tracker for Developers & Freelancers (No Login)
- **Focus tasks**: Unlimited tasks per day; drag-to-reorder with HTML5 drag & drop; double-click to edit inline; check off to mark done
- **Timestamped work log**: Add entries with Enter; auto-timestamps each entry; newest-first display; acts as standup notes and billing log
- **Streak counter**: Counts consecutive days with activity (task done OR log entry); grace period if today has no activity yet
- **Weekly 7-day bar chart**: CSS bars showing activity per day (tasks done + log entries); today highlighted amber
- **Stats strip**: Streak, total days logged, tasks done ratio, log entries today
- **Copy Summary**: One-click clipboard copy of formatted tasks + timestamped log for standups / Slack / email
- **Export / Import JSON**: Full data backup and restore with merge (today's data takes priority over imported)
- **Auto-prunes entries older than 30 days** on every load/save
- **100% private**: localStorage only, no server, no login, no tracking
- **Files created**: `DailyFocusLogTool/index.js`, `DailyFocusLogTool/styles.module.css`, `src/app/daily-focus-log/page.js`, `public/icons/daily-focus-log.svg`
- **Registry + homepage**: Added to tools-registry.js; tool count updated 54→55 in page.js + HomeGrid

---

## 2026-04-26 — Image Compressor upgraded to Image Compressor + Converter

- **AVIF format added** — new "Convert To" option alongside WebP, JPEG, PNG, Original; uses `canvas.toBlob('image/avif', quality)` with null-check fallback for unsupported browsers
- **Fit W×H resize mode** — scales image to fit within exact dimensions while maintaining aspect ratio; UI shows two number inputs (W × H)
- **Social media presets** — OG Image (1200×630), Instagram (1080×1080), Twitter Header (1500×500), LinkedIn Cover (1584×396), Favicon (32×32), Full HD (1920×1080); click to set exact dimensions
- **Conversion badge** — blue `PNG→WEBP` / `JPEG→AVIF` badge appears in the file list when the output format differs from the source
- **Header renamed** — "Image Compressor + Converter" with blue accent on "Converter"
- **LabelRight in split slider** now shows output format (e.g., "→ WEBP") instead of generic "Compressed"
- **"Output Format" section renamed to "Convert To"**
- **package.json** — added `"type": "module"` to suppress Node.js MODULE_TYPELESS_PACKAGE_JSON warning
- **scripts/postbuild.js** — converted from CommonJS (`require`) to ES module (`import`) to match `"type": "module"` in package.json
- **SEO updated** — title, description, keywords, FAQ schema (added AVIF and converter questions), softwareSchema featureList, `howToUse`, `about`, `features`, `useCases`, `faqs` — all updated with converter-focused content

---

## 2026-04-26 — AI Prompt Studio: UX improvements + bug fixes

**New features:**
- **✦ Improve button** — rule-based auto-fix: strips filler starts (Please/Can you), adds a generic role if missing, appends format and constraint snippets if absent. Pushes current prompt to undo stack before applying.
- **Undo button** — appears after Improve or Clear; Ctrl+Z keyboard shortcut. Stores last 5 prompt states.
- **Quick-fix "+ Add" chips** — per dimension in Analyze tab; shown only when a dimension scores 0. Appends a targeted snippet template to the editor and focuses it. Tooltip shows what to add.
- **Quick copy for model** row at bottom of Analyze tab — Copy for Claude / ChatGPT / Gemini without switching to Optimize tab.
- **Issue badge on Analyze tab** — amber badge shows issue count when prompt has detected anti-patterns.
- **Length pill in header** — Too short / Brief / Good / Long signal based on character count with color coding.
- **Token estimate** — `~N tokens` shown in header (chars/4 approximation).
- **Keyboard shortcuts** — Ctrl+Enter = copy, Ctrl+S = save (opens save form + focuses input), Ctrl+Z = undo.
- **Shortcut hint** displayed in header.
- **Saved date** shown on each library card.
- **Auto-improve in Analyze** — "✦ Auto-improve prompt" button shown inline below score when score < 7.

**Bug fixes:**
- Library Copy button now shows "Copied!" feedback via `copiedId` state (was using `() => {}` setter — feedback never showed).
- Word count now shows `0 words` only when prompt has content; hidden when empty.
- Clear button disabled when prompt is empty; Improve/Save/Share/Copy all disabled when no prompt.
- Clear button pushed to undo stack so it can be undone.

---

## 2026-04-25 — New Tool: AI Prompt Studio

Added a fully client-side AI prompt engineering tool with no API key requirement. All analysis is rule-based JavaScript running in the browser.

**Features:**
- 8-dimension prompt quality scorer (Role, Task, Format, Context, Constraints, Examples, Audience, Tone) — each scored 0–10 using regex/keyword rules, live score updates as the user types
- Anti-pattern detector with 6 checks: too-short prompt, vague language, filler start words, contradictory instructions, missing action verb, missing output format — each with a specific fix description
- Mini bar chart in the score strip below the editor shows all 8 dimension bars at a glance
- Model-specific optimizer for Claude (XML tags: `<role>`, `<instructions>`, `<output_format>`), ChatGPT (persona prefix + numbered step framing), and Gemini (chain-of-thought + explicit output headers)
- 23 expert-crafted templates across 7 categories (Coding, Writing, Analysis, Creative, Business, SEO, Data) — all pre-structured with role, format, and constraint patterns
- Personal prompt library with localStorage persistence — save with title, shows quality score, searchable, load/copy/delete actions
- URL-based sharing using `btoa(encodeURIComponent(prompt))` — Share button copies a link that loads the prompt on open
- Word + character counter in header

**Files created:**
- `src/components/AiPromptStudioTool/index.js`
- `src/components/AiPromptStudioTool/styles.module.css`
- `src/app/ai-prompt-studio/page.js` (full SEO: FAQPage schema, SoftwareApplication schema, BreadcrumbList, 800+ word about, 6 use cases, 8 FAQs, 8 features)
- `public/icons/ai-prompt-studio.svg`

**Registry/index updates:** Added to `tools-registry.js`, added `ai-prompt-studio` to `related-tools.js`, updated all tool counts 53→54 in `src/app/page.js`.

---

## 2026-04-26 — AI Prompt Studio: improved score indicators + homepage card redesign

**Score indicator redesign:**
- **Analyze tab overall score**: replaced plain circle border with an SVG arc gauge — animated `stroke-dashoffset` arc fills clockwise from the top based on score/10, with smooth 0.5s transition on change.
- **Score strip** (bottom of editor): replaced vertical mini bar chart with a horizontal score pill (`7 /10 Strong` styled with score color) + 8 colored dots (one per dimension). Dot opacity maps score level (0=12% opacity, 10=100%), and high-scoring dots (≥7) emit a soft colored glow via `box-shadow`.

**Homepage card redesign** (`src/components/HomeGrid/`):
- Cards now have an accent top-line that slides in on hover (`card::before`, `scaleX(0→1)`).
- Lift + shadow on hover (`translateY(-3px)`, `box-shadow: 0 12px 32px`).
- Tool subtitle shown below title. Arrow SVG fades/slides in on hover. Icon scales on hover.
- Added 'AI' filter pill. Search now includes `tool.sub`.

**Files changed:** `src/components/AiPromptStudioTool/index.js`, `src/components/AiPromptStudioTool/styles.module.css`, `src/components/HomeGrid/index.js`, `src/components/HomeGrid/styles.module.css`

---

## 2026-04-25 — JSON Dashboard Generator: chart tooltips, larger pie, smooth lines, color picker

Added hover tooltips to all three chart types (bar, line, pie) using SVG-native tooltip boxes rendered at computed positions — no external library. Bar/line charts dim other elements on hover and restore on mouse leave. Pie slices translate outward on hover and the donut center switches from total→selected slice info (value + label + %).

Other improvements: (1) Smooth bezier curves for line chart (C control points at 40% interval) and matching bezier area fill. (2) Donut chart resized from 300×200 to 440×260 with radius 110 for better proportion. (3) Axis label font sizes reduced 9→7.5px to match chart density. (4) Color picker — 6 chart color presets (indigo/blue/emerald/amber/rose/purple). (5) "Max pts" slider (5–50) to control how many aggregated data points render in bar/line charts. (6) Chart stats strip below chart showing avg/min/max/total for the selected Y field. Added `.colorDots`, `.colorDot`, `.colorDotActive`, `.chartStats`, `.chartStat`, `.chartStatLabel`, `.range`, `.rowVal` CSS classes.

---

## 2026-04-25 — Toggle Switch Generator: 5 new features + bug fixes

Added 5 new features: (1) Preview background switcher — white/dark/custom color swatches to test toggle on different surfaces; (2) Track icons — ✓/✕ via CSS `::before`/`::after` pseudo-elements; (3) Thumb icons — power symbol, sun/moon toggle with opacity transition; (4) WCAG 1.4.11 contrast badge — live ratio between thumb and track with pass/fail indicator; (5) Svelte export tab — complete `.svelte` SFC with `bind:checked`, event dispatcher, and scoped styles.

Bug fixes: input fields overflowing 300px left panel (added `min-width: 0` + `overflow-x: hidden`); Outline preset thumb appearing too low (border-aware offset formula `Math.max(0, (h - 2*borderW - t) / 2)`); "With Label" preview section misaligned (refactored to use `inlineLabel`/`inlineLabelPos` props on PreviewToggle; left-aligned with `leftAlign` prop).

SEO: all 8 FAQ names rephrased as real Google search queries; 4 new feature bullets; 3 new FAQ entries; 2 new How-to-Use steps; about section expanded with new feature paragraphs.

---

## 2026-04-25 — JSON Dashboard Generator tool added

Built and shipped the JSON Dashboard Generator (`/json-dashboard-generator`). New files: `src/components/JsonDashboardGeneratorTool/index.js`, `src/components/JsonDashboardGeneratorTool/styles.module.css`, `src/app/json-dashboard-generator/page.js`, `public/icons/json-dashboard-generator.svg`. Updated: `src/lib/tools-registry.js` (new entry, `dev` category), `src/lib/related-tools.js` (6 related tools), `src/app/page.js` (tool count 52 → 53). Features: auto field-type detection, pure-SVG bar/line/pie charts (no library), stat cards, category filter dropdowns, sortable paginated table, paginated API response unwrapping, React (Recharts) code export, JSON data export. Full SEO page with 8 FAQ schema entries and 800+ word about section.

---

## 2026-04-25 — Internal links added to all tool SEO pages

Added 4–8 contextual internal links to every tool page's `seoData` text (features, useCases desc fields) using the `[anchor text](/slug)` syntax supported by `SeoSection`'s `renderInline` function. Links placed as natural parentheticals or inline phrases — never forced. No headings, metadata, schema, or React structure modified.

Pages updated (53 total, excluding `api-request-generator-tester` which was already done):
password-generator, qr-code-generator, json-formatter, html-formatter, tailwind-formatter, json-table-viewer, diff-checker, responsive-preview-tool, css-to-tailwind, tailwind-to-css, html-to-jsx-converter, rem-px-converter, css-animation-generator, css-loader-generator, css-transform-generator, css-filter-generator, box-shadow-generator, gradient-generator, flexbox-builder, css-grid-builder, color-palette-generator, css-clamp-generator, glassmorphism-generator, mesh-gradient-generator, css-minifier-beautifier, font-pairing-tool, svg-animation-generator, animated-svg-icons, color-picker, url-encoder-decoder, hash-generator, image-compressor, favicon-generator, css-clip-path-generator, image-to-svg, image-to-base64, carousel-builder, regex-tester, base64-encoder-decoder, jwt-decoder, timestamp-converter, code-screenshot-generator, css-button-generator, meta-tag-generator, css-shape-generator, css-easing-generator, navbar-builder, css-media-queries-generator, cron-expression-builder, csv-json-converter, yaml-json-converter.

---

## 2026-04-25 — SEO word count: expanded 9 tool pages to 1000+ words

Audited SEO body content word counts across all 52 tool pages. 9 pages were below 1000 words. Expanded each by adding 2–5 new FAQ entries with detailed 3–5 sentence answers covering real search queries:

- `css-animation-generator` — 732 → 1936 words (added 5 FAQs: direction/alternate, staggering, easing curves, Tailwind export, animation vs transition)
- `html-to-jsx-converter` — 787 → 2207 words (added 4 FAQs: UI kit conversion, dangerouslySetInnerHTML, self-closing in JSX, full file conversion, React Email)
- `flexbox-builder` — 817 → 2038 words (added 4 FAQs: align-self, gap, navbar layout pattern, Flexbox inside Grid)
- `box-shadow-generator` — 882 → 1981 words (added 4 FAQs: Material Design elevation, JS/React export, debugging invisible shadows, hover animation)
- `color-palette-generator` — 896 → 2079 words (added 3 FAQs: UI color selection strategy, export formats, dark mode palette)
- `css-loader-generator` — 909 → 1825 words (added 3 FAQs: full-page overlay centering, best style for buttons, skeleton loaders)
- `rem-px-converter` — 923 → 2153 words (added 2 FAQs: 16px/1rem reference table, rem vs px for media queries)
- `css-filter-generator` — 949 → 2407 words (added 3 FAQs: hover desaturation, backdrop-filter vs filter, black-and-white conversion)
- `jwt-decoder` — 960 → 2385 words (added 2 FAQs: iss/sub/aud/exp/iat explained, manual decoding in JS/Python)

All 52 tool pages now exceed 1000 words of SEO body content.

---

## 2026-04-25 — SEO content audit: all 53 tool pages

Completed a full audit of SEO body content across all 53 tool page.js files against the search-intent writing standard: `about.description` must lead with a user pain point ("You need...", "You have..."), `about.title` should be specific and problem-focused, use case titles must be action-verb-led, and FAQ questions must match real Google search queries.

**Pages updated (2 changes):**
- `src/app/json-formatter/page.js` — updated `SEO.about.title` from generic to pain-point focused ("Format Minified JSON Instantly — See the Exact Error Line, Sort Keys, Minify")
- `src/app/timestamp-converter/page.js` — rewrote all 6 `useCases` titles from label-style ("API Response Debugging") to action-first ("Read an integer timestamp from an API response or database query")
- `src/app/meta-tag-generator/page.js` — rewrote opening paragraph of `about.description` to lead with user pain point instead of educational statement

**All remaining 50 pages passed without changes** — all `about.description` sections start with "You need...", "You have...", or "You want...", all use case titles are action-first, and all FAQ questions match real search queries.

---

## 2026-04-24 — API Request Generator: 10 new features

Added to `ApiRequestGeneratorTool`:
- **Copy Response** — one-click copy of the raw response body
- **Download Response** — save response as `.json` or `.txt`
- **JSONPath filter** — `$.path.to.field` input on the response body panel with live result
- **Shareable URL** — "Share" button encodes the full request state (method, URL, headers, body, auth) as a base64 URL param; paste link to restore the request on load
- **Request timeout** — Settings tab, configurable ms, uses `AbortController`
- **Follow redirects toggle** — Settings tab, exposes fetch `redirect: 'manual'` mode
- **Base URL prefix** — Settings tab, prepended to relative URLs; shown in URL bar placeholder and header badge
- **Saved Collections** — "Save" + "Collections" buttons; requests saved to named folders in localStorage; fully deletable
- **Export/Import workspace** — downloads `api-workspace.json` (collections + history + environments); import restores all three
- **Response diff** — "Pin" button saves current response; "Diff" button opens a side-by-side modal comparing pinned vs current
- **Cookie viewer** — third response tab after Body / Headers; explains browser cookie restrictions
- **Response tabs** — Body / Headers / Cookies tabs replace the old inline headers section
- **REQ\_TABS expanded** — added "Settings" tab to the left panel

## 2026-04-24 — API Request Generator: in-browser API testing

Added live request execution directly in the browser — no backend required.

**Send button** in the URL bar (also triggered with Ctrl+Enter) fires the request using the browser's `fetch()` API, applying all current state: method, URL, query params, headers, auth, body, and environment variable substitutions.

**Code / Response toggle** on the right panel switches between the code generator view and the response inspector. Send auto-switches to the Response tab.

**Response panel** shows:
- Status badge (colored green/yellow/red for 2xx/3xx/4xx+), response time in ms, body size
- **Body tab** — pretty-printed JSON or raw text
- **Headers tab** — all response headers in a key/value table

**CORS handling** — if the browser blocks the request due to CORS policy, a friendly error with a "Retry with CORS Proxy" button appears. This re-sends through `corsproxy.io` and shows a persistent banner with a Disable option. A warning note is shown: don't use with sensitive credentials.

**No data leaves the user's machine** except the HTTP request itself (and optionally through the CORS proxy). Credentials, keys, and request bodies are never sent to the tool's server.

Files changed: `src/components/ApiRequestGeneratorTool/index.js`, `src/components/ApiRequestGeneratorTool/styles.module.css`.

---

## 2026-04-24 — SeoSection: flexible sections-based schema

Redesigned the SEO content area to use a `sections: Section[]` array instead of fixed flat props. Fully backward compatible — all 52 existing tool pages continue to work with old props via auto-normalization.

**New section types:**
- `text` — paragraphs with optional `label`, `heading`, `headingSize` ('h2'/'h3')
- `features` — bullet list
- `steps` — numbered step list; accepts `items: [{title, text}]` or `text` (split on `\n\n`)
- `cards` — configurable-column card grid (2/3/4 cols); items have `icon`, `title`, `desc`, optional `badge`
- `faq` — accordion (each FaqSection has its own local state; search re-highlights on click+50ms delay)
- `image` — `<img>` with `src`, `alt`, optional `caption`, `rounded`
- `table` — data table with `columns` (header) and `rows: string[][]`
- `callout` — info/tip/warning/note highlighted box with `variant`
- `2col` — two-column layout wrapping any two section objects; supports `ratio: '1:1'|'2:1'|'1:2'`

**Backward compat:** if `sections` is not passed, `normalizeSections()` converts `{about, features, howToUse, useCases, faqs}` to a `['2col', 'text', 'cards', 'faq']` sections array automatically. Zero changes needed to existing pages.

**Migration example:** `api-request-generator/page.js` updated to use new `sections` format including `steps` type for How to Use. Use it as a template for future page migrations.

Files changed: `src/components/SeoSection/index.js`, `src/components/SeoSection/styles.module.css`, `src/app/api-request-generator/page.js`.

---

## 2026-04-24 — API Request Generator: 6 major features added

Added six new capabilities to the api-request-generator tool:

1. **Request history** — every Copy action auto-saves a snapshot (method, URL, all params/headers/body/auth) to localStorage (max 30 entries). A History button in the toolbar opens a modal listing past requests; click any row to restore the full configuration.

2. **Environment variables** — new Env tab with per-environment key-value stores. Use `{{VAR_NAME}}` syntax anywhere in the URL, header values, or body; the active environment's values are substituted before code generation. Multiple environments (dev/staging/prod) supported with +/× controls.

3. **Postman/Insomnia import** — Import button opens a local file picker. Reads Postman Collection v2.1 and Insomnia v4 JSON export formats entirely in-browser (never uploaded). Single requests load immediately; collections with multiple requests show a picker modal.

4. **GraphQL support** — new `graphql` body type in the Body tab with dedicated Query and Variables (JSON) editors. Serialized to `{"query":"...","variables":{...}}` POST format; all 12 language outputs handle it correctly.

5. **Test assertion generation** — new Jest and Pytest language tabs generate ready-to-run test boilerplate: a happy-path test (status 200, defined response) and an auth-error test, pre-populated with the current request configuration.

6. **Copy as cURL** — a persistent ⎘ cURL button in the code footer lets developers grab the cURL equivalent from any language tab without switching tabs. Saves to history on click.

Language count: 10 → 12. Body types: 5 → 6. Request tabs: 4 → 5.
Files changed: `src/components/ApiRequestGeneratorTool/index.js`, `src/components/ApiRequestGeneratorTool/styles.module.css`, `src/app/api-request-generator/page.js`.

---

## 2026-04-21 — New Tool: CSS Media Queries Generator

Built a visual CSS media queries generator with 4 output formats. Left panel: preset picker (Bootstrap 5, Tailwind CSS, Material UI) that loads standard breakpoints; custom badge appears on edits. Breakpoint list: name + px value inputs (spinner hidden), add/remove, sorted by value. Two toggles: Direction (min-width mobile-first / max-width desktop-first) and Syntax (Traditional `(min-width: X)` / modern Level 4 range syntax `(width >= X)`). "Include range queries" checkbox adds adjacent-pair "only" queries with correct `next.val - 1px` upper bounds. Feature queries section: 10 toggles — dark mode, light mode, reduced motion, high contrast, print, retina/2×, portrait, landscape, touch (pointer: coarse), no hover. Right panel: 4 code format tabs — CSS (annotated plain queries), SCSS ($bp-* variables + aligned @mixin shortcuts with @content), Tailwind (theme.screens config with raw variants for features, max-width format supported), JS (bp numeric object + mq string object for styled-components/emotion with usage comment). All outputs use `padEnd` alignment for readability. Code generates live via useMemo. Accent: `#06b6d4` (cyan-500). Registered in CSS Tools category. Navbar Builder unregistered from tools-registry (code retained, URL still works).

---

## 2026-04-21 — New Tool: Navbar Builder

Built a visual navbar builder with live preview and 4 code export formats. Left panel: config tabs for Logo (show/hide toggle, brand name, optional emoji/icon prefix), Links (add/remove/reorder with ↑↓ arrows, active-state radio toggle, CTA toggle per link, href field), Style (3 color pickers with hex input — background/text/accent; 4 sliders — padding/fontSize/link gap/CTA radius; font weight selector 400/500/600/700; shadow + border toggles). Layout picker in header: Default (logo left, links right), Centered (all centered), Split (links | logo | links using CSS grid 1fr auto 1fr), Minimal (links only). Right panel: code tabs for HTML+CSS (self-contained `<nav>` + `<style>`), React (JSX with inline styles, no deps), Tailwind (JSX with arbitrary value classes `bg-[#hex]`, `text-[14px]`), Vue 3 SFC (`<script setup>` + `<style scoped>`). Active link and CTA states handled correctly in all 4 formats. Split midpoint via `Math.ceil(n/2)`. `hexToRgba()` helper for shadow/border CSS values. Link shape designed for future dropdown support: `{ id, label, href, active, cta, children: [] }`. Accent: `#f97316` (orange-500). Registered in Dev Tools category.

---

## 2026-04-21 — New Tool: API Request Generator

Built a full-featured API Request Generator that outputs HTTP request code in 10 languages simultaneously. Left panel (360px) has method selector (GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS with color-coded badge) + URL bar + four config tabs: Params (KV editor with per-row enable/disable), Headers (KV editor), Body (none/json/form-data/url-encoded/raw with textarea for JSON+raw, KV editor for form types), Auth (none/Bearer Token/Basic Auth with auto-base64 encoding/API Key with header-or-query-param placement). Right panel: 10 language tabs — Fetch, Axios, XHR, Node.js 18+ native fetch, cURL, Python requests, PHP cURL, Ruby net/http, Go net/http, C# HttpClient. Code generates live on every state change with `useMemo`. Language-native idioms: Python uses `params=` dict, Go uses `io.ReadAll` + standard library only, PHP uses `curl_setopt`, form-data in Go uses `mime/multipart` + `mw.FormDataContentType()`. No requests sent — fully client-side. Accent: `#3b82f6` (blue-500). Registered in Dev Tools category.

---

## 2026-04-21 — New Tool: Meta Tag Generator

Built a complete meta tag generator with live social previews and 7 export formats. Inputs: page type selector (7 types — Blog, Article, Product, Homepage, About, Landing, Service), title (char counter 0–60), description (char counter 0–160), canonical URL, OG image URL, site name, Twitter handle, author, published/modified dates (articles only), keywords, robots (index/noindex + follow/nofollow toggle buttons). Live previews: Google SERP card (favicon, breadcrumb, blue title, gray desc), Facebook OG card (aspect-ratio image + domain + title + desc), Twitter summary_large_image card. Export formats: HTML, Next.js App Router metadata object (clean JS object literal, no quoted keys), React Helmet JSX, Vue/Nuxt useHead(), Astro head block, JSON-LD Schema (`<script type="application/ld+json">`), OG-only tags. Schema type auto-matched to page type (Article, NewsArticle, Product, WebSite, AboutPage, WebPage, Service). Char bars: amber = short, green = optimal, red = over limit. Accent: `#2563eb` (blue-600). Registered in Dev Tools category.

---

## 2026-04-21 — New Tool: CSS Shape Generator

Built a CSS Shape Generator with 37 shapes across 5 groups (Triangles, Arrows, Geometric, Decorative, UI) and 7 export formats (CSS class, HTML snippet, React JSX, Tailwind arbitrary values, SCSS with `$color` variable, Styled-Components template literal, Vue `<script setup>` with `:style`). Shapes cover all major CSS techniques: Border trick (triangles/trapezoids), `clip-path: polygon()` (stars/hexagons/arrows/hearts), `border-radius` (circles/squircles/teardrops), CSS `transform` (parallelogram), and `radial-gradient` (crescent). Controls: color picker + hex input, size slider (50–250px), rotation slider (0–360°). Left panel has group filter tabs + 3-column shape grid with live-colored thumbnails. Right panel has checkerboard preview + controls + export section. Accent: `#0d9488` (teal). Registered under CSS Tools category.

---

## 2026-04-21 — New Tool: CSS Easing Generator

Built a visual CSS cubic-bezier easing generator. Features: draggable SVG curve editor (P1/P2 handles with pointer capture), live animation preview ball that replays on every change, duration slider (0.3–3s), 27 named presets (5 CSS keywords + Penner easing families: Sine, Quad, Cubic, Quart, Quint, Expo, Circ, Back), numeric X1/Y1/X2/Y2 inputs, Y overshoot support ([-1.5, 2.5] range for Back/spring easings), three CSS output rows (cubic-bezier value, transition shorthand, animation shorthand) with per-row copy. Accent: `#8b5cf6` (violet). Registered under CSS Tools category. Also fixed duplicate tool results in HomeGrid search and Sidebar search by deduplicating TOOLS array by slug.

---

## 2026-04-21 — New Tool: Favicon Generator

Built a complete client-side Favicon Generator. Generates 8 PNG sizes (16, 32, 48, 64, 96, 180, 192, 512px) plus a multi-size `favicon.ico` (16/32/48px with embedded PNG streams) and `site.webmanifest`. All output packed into a ZIP download assembled in pure JS (no JSZip dependency — custom CRC32 + store-mode ZIP writer). ICO format uses embedded PNG streams for broad browser support. Options: Square/Rounded/Circle shape clipping, transparent or custom background color, 0–25% padding, Fit (letterbox) or Crop mode. HTML tab provides copy-paste `<link>` tags; Manifest tab provides ready-to-use webmanifest. Accent: `#ec4899` (pink). Registered in `converters` category.

---

## 2026-04-20 — SEO Content Expansion: 10 Tool Pages (800–1200+ Words, Keyword-Focused)

Expanded SEO content on 10 tool pages to meet the 800–1200+ word minimum and improve keyword targeting for organic search ranking. Each page was rewritten with 4-paragraph about sections, 5-paragraph howToUse, 10-11 feature items, 6 use cases, and 8-10 FAQs with 3-5 sentence answers. All `seoData` object declarations were moved before schema const declarations to fix potential forward-reference issues. Keyword counts expanded to 28-30 per page including head terms, variants, and long-tail phrases woven naturally into the copy.

**Pages updated:**
- `tailwind-formatter/page.js` — 1200+ words; keywords: tailwind class sorter, format tailwind classes, tailwind deduplication, prettier tailwind plugin
- `css-to-tailwind/page.js` — 1200+ words; keywords: css to tailwind classes, tailwind migration tool, css to tailwind with arbitrary values
- `tailwind-to-css/page.js` — 1200+ words; keywords: tailwind utility expander, debug tailwind classes, tailwind class inspector
- `gradient-generator/page.js` — 1200+ words; keywords: gradient text generator, gradient border generator, hue shift gradient, animated gradient css
- `css-minifier-beautifier/page.js` — 1200+ words; keywords: css file minifier, reduce css file size, css formatter with history
- `svg-animation-generator/page.js` — 1200+ words; keywords: svg css keyframes generator, svg draw stroke online, svg orbit animation gsap
- `url-encoder-decoder/page.js` — 1200+ words; keywords: url percent encode, decode percent encoded url, query string encode decode
- `regex-tester/page.js` — 1200+ words; keywords: regex match highlighter online, named capture groups online, regex replace mode, online regex debugger
- `base64-encoder-decoder/page.js` — 1200+ words; keywords: base64 data uri generator, base64url decode, base64 encode file online
- `color-picker/page.js` — 1200+ words; keywords: oklch css color, hex to rgb to hsl converter, wcag contrast checker
- `hash-generator/page.js` — 1200+ words; keywords: file integrity checker online, hmac sha256 online, generate checksum online

---

## 2026-04-19 — New Tool: Password Generator

Added a fully-featured, client-side password generator powered by the Web Crypto API.

- **4 generation modes**: Password (charset-based), Passphrase (256-word list), PIN (numeric), Memorable (CVCV phonetic pattern)
- **Web Crypto API**: `crypto.getRandomValues()` for all randomness — no `Math.random()`, cryptographically secure
- **Guaranteed charset diversity**: guarantees at least one char from each enabled type, then shuffles — satisfies site password policies
- **Entropy meter**: live Shannon entropy calculation (bits = length × log₂(charsetSize)), 5 strength levels color-coded
- **Crack-time estimator**: worst-case estimate at 10¹⁰ guesses/sec (GPU-class attacker) shown under the strength bar
- **Bulk generation**: 5/10/20/50 passwords at once, copy individually or "Copy all"
- **Copy history**: last 10 copied passwords stored in session state, re-copy any past password
- **Passphrase options**: word count (3–8), separator (hyphen/dot/underscore/space/none), capitalize, append number/symbol
- **Ambiguous char exclusion**: strips 0/O/1/l/I to prevent transcription errors
- **Custom symbol set**: replace default `!@#$%…` with any characters the user needs
- **Files**: `PasswordGeneratorTool/index.js`, `styles.module.css`, `app/password-generator/page.js`, `public/icons/password-generator.svg`, registry entry added as first Dev Tool
- **SEO**: 10 FAQs, 6 use cases, 1000+ word about section, targets "password generator", "passphrase generator", "secure password", "entropy meter"

---

## 2026-04-19 — New Tool: QR Code Generator

Added a fully-featured, beautifully designed QR code generator.

- **7 QR types**: URL, Text, WiFi (auto-join), Email (pre-filled), SMS (pre-filled), vCard (contact card), Phone
- **6 dot styles** via `qr-code-styling`: Square, Dots, Rounded, Soft (extra-rounded), Classy, Classy+
- **Eye customization**: independent outer frame style (Square/Round/Circle) and inner dot style (Square/Dot)
- **Color controls**: foreground + background color pickers
- **Gradient dots**: linear or radial two-color gradient across all modules
- **Logo upload**: embed any image at center with adjustable size (10–40%), H error correction auto-selected
- **Error correction levels**: L/M/Q/H with percentage labels
- **Margin slider** and **export size slider** (256–2048px)
- **Downloads**: PNG and SVG at selected export size, no watermark
- **Live preview**: 300×300 canvas updates in real-time as you type
- **Library**: `qr-code-styling` (installed) with dynamic import for Next.js SSR safety
- **Files**: `QrCodeGeneratorTool/index.js`, `styles.module.css`, `app/qr-code-generator/page.js`, `public/icons/qr-code-generator.svg`, registry entry added as first Dev Tool
- **SEO**: 10 FAQs, 6 use cases, 1000+ word about section, targets "qr code generator", "free qr code generator", "qr code with logo", "wifi qr code generator"

---

## 2026-04-19 — New Tool: CSS Grid Builder

Added a full visual CSS Grid layout builder tool.

- **Interactive canvas** — actual CSS Grid rendered live; drag across empty cells to create named areas, click an area to select it, double-click to rename
- **Track editors** — add/remove column and row tracks, free-form text inputs supporting any valid CSS track size (fr, px, %, auto, minmax, repeat, fit-content)
- **Independent gap sliders** — column-gap and row-gap controlled separately
- **Alignment controls** — justify-items and align-items with 4-value button groups
- **Named areas panel** — color-coded list with rename (double-click), delete, and span indicator (cols×rows)
- **6 presets**: Holy Grail, Sidebar, 3-Column, Dashboard, Blog, Card Grid
- **5 export formats**: CSS (with grid-template-areas), SCSS ($variables + nesting), Tailwind (grid-cols, col-span, row-start classes), React (inline styles component), full HTML file
- **Conflict detection** — selection turns red and auto-clears if drag would overlap an existing area
- **Files**: `CssGridBuilderTool/index.js`, `CssGridBuilderTool/styles.module.css`, `app/css-grid-builder/page.js`, `public/icons/css-grid-builder.svg`, registry entry added
- **SEO**: 10 FAQs, 6 use cases, 900+ word about section, targets "css grid builder", "css grid generator", "grid-template-areas generator"

---

## 2026-04-19 — CSS Clip-path Generator: Handles, Image Background, More Presets

Major feature additions to the CSS Clip-path Generator:

- **Draggable HTML handles** for circle, ellipse, and inset modes (center + radius/rx/ry/edge handles), replacing SVG circles to avoid oval stretching in non-square containers
- **Image background upload** — users can upload any image as the preview background; the preview canvas resizes via ResizeObserver to exactly match the image's natural aspect ratio (contain within available space)
- **Circle auto-size on image upload** — circle diameter auto-computed as min(W, H) of the uploaded image using the formula `r% = 50 * sqrt(2 / (a² + 1))` for landscape or `50 * sqrt(2a² / (a² + 1))` for portrait
- **Multi-color polygon handles** — each point gets a distinct color from a rotating palette
- **Right-click-to-delete popover** on polygon handles
- **SVG preset thumbnails** — horizontal scrollable strip with 48×48px SVG previews, sharp corners, active highlight
- **Export tabs + Show Outside toggle** moved into output section (above the CSS code), same bar as Copy button
- **Live Preview label + Background controls** merged into single `previewBar` row
- **29 preset shapes total** (up from 18): added Bevel, Heptagon, Octagon, Nonagon, Decagon, Close (X), Left Arrow, Right Point, Left Point, Left Chevron, Right Chevron, Rabbet; horizontal scroll on preset strip
- **`overflow: visible`** on preview containers so handles outside the preview boundary stay visible
- **Typed drag system** — `dragRef.current.type` distinguishes polygon/circle-center/circle-radius/ellipse-center/ellipse-rx/ellipse-ry/inset-top/right/bottom/left

**Files updated:** `src/components/CssClipPathGenerator/index.js`, `styles.module.css`

---

## 2026-04-18 — CSS Clip-path Generator UI Overhaul

Swapped the layout of the CSS Clip-path Generator to match the Image Compressor pattern: controls (presets, shape type, polygon points/sliders) moved to the LEFT pane (320px, scrollable), and the live preview moved to the RIGHT pane (flex 1, fills height). Preview square uses `aspect-ratio: 1; height: 100%; max-width: 100%` inside a centered flex container so it's as large as possible while staying square. Background and Output sections sit below the preview on the right. Also confirmed image-compressor.png is already wired into the Image Compressor OG/Twitter metadata.

---

## 2026-04-18 — New Tool: Image Compressor

Added an Image Compressor with a layout matching the site's clip-path generator pattern: left pane = split-slider before/after preview + stats strip + download, right pane = controls (images section, output format, quality, resize). Key features: Canvas-based compression (JPEG/WebP/PNG/Original), quality slider with 350ms debounce and stale-version guard, resize (Scale %, Max Width, Max Height with aspect-ratio lock), batch multi-file upload with parallel processing, Ctrl+V clipboard paste, color-coded reduction % badges, Download All with sequential anchor downloads. Accent: `#4ade9e` (emerald). Added to Converters category.

**Files created:** `src/components/ImageCompressorTool/index.js`, `styles.module.css`, `src/app/image-compressor/page.js`, `public/icons/image-compressor.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: CSS Clip-path Generator

Added a visual CSS clip-path generator with draggable polygon handles. Key features: 18 shape presets (triangle, diamond, pentagon, hexagon, star, arrow, chevron, parallelogram, trapezoid, cross, message bubble, etc.), four shape modes (polygon/circle/ellipse/inset) with dedicated sliders, interactive SVG overlay allowing drag-to-reshape, click-to-add-point, and right-click-to-remove-point on polygons, show/hide outside region toggle, three preview backgrounds (gradient/solid/checkerboard), and three export formats (CSS, Tailwind arbitrary value, React). Accent: `#818cf8` (indigo). Added to CSS Tools category.

**Files created:** `src/components/CssClipPathGenerator/index.js`, `styles.module.css`, `src/app/css-clip-path-generator/page.js`, `public/icons/css-clip-path-generator.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: Image to Base64 Converter

Added an Image to Base64 converter supporting PNG, JPEG, WebP, GIF, SVG, and BMP. Features: drag & drop and Ctrl+V clipboard paste, Canvas-based format conversion (JPEG/PNG/WebP) with quality slider, six ready-to-use output rows (Data URI, HTML img, CSS background-image, CSS content, Raw Base64, SVG URL-encoded), image metadata panel (dimensions, MIME, sizes, overhead %), and stale-conversion guard using a ref counter. SVG URL-encoded output decodes Base64 → SVG text → encodeURIComponent for GZIP-friendly CSS icon use. Accent: `#10b981` (emerald). Added to Converters category.

**Files created:** `src/components/ImageToBase64Tool/index.js`, `styles.module.css`, `src/app/image-to-base64/page.js`, `public/icons/image-to-base64.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: Color Picker & Converter

Added a color picker supporting HEX, RGB, HSL, HSV, OKLCH, and CMYK simultaneously. Key features: full OKLCH math (sRGB → XYZ D65 → OKLab → OKLCH via Björn Ottosson matrices), smart paste field that auto-detects any color format including CSS named colors via canvas trick, dynamic UI chrome (header/accent tints to selected color), WCAG AA/AAA contrast checker against white/black/color backgrounds, and preset swatches. Accent: `#e879f9` (fuchsia). Added to extended CSS Tools category.

**Files created:** `src/components/ColorPickerTool/index.js`, `styles.module.css`, `src/app/color-picker/page.js`, `public/icons/color-picker.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: URL Encoder/Decoder

Added a URL encoder/decoder with two encoding modes: Query String (encodeURIComponent) and Full URL (encodeURI). Key differentiator: `%XX` sequences are highlighted in cyan in the encode output so users see exactly which characters changed. Decode input also highlights percent sequences before they're decoded. Stats bar shows sequence count and byte size delta. Accent: `#06b6d4` (cyan). Added to extended dev tools.

**Files created:** `src/components/URLEncoderTool/index.js`, `styles.module.css`, `src/app/url-encoder-decoder/page.js`, `public/icons/url-encoder-decoder.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: Hash Generator

Added a comprehensive hash generator tool with MD5, SHA-1, SHA-256, SHA-384, and SHA-512 all shown simultaneously. Key differentiators: file hashing via drag & drop (any file, browser-only using FileReader + WebCrypto), HMAC mode (SHA-1/256/384/512 with secret key), hash verification strip that auto-detects algorithm by hash length, and uppercase/lowercase toggle. MD5 is implemented as a pure JS function (no npm dependency) since it's not in WebCrypto. Added to extended tools list (`extended: true`) under Dev Tools category.

**Files created:** `src/components/HashGeneratorTool/index.js`, `styles.module.css`, `src/app/hash-generator/page.js`, `public/icons/hash-generator.svg`

**Files updated:** `src/lib/tools-registry.js`

---

## 2026-04-18 — New Tool: Mesh Gradient Generator

Added a mesh gradient generator as a standalone tool (separate from the existing CSS Gradient Generator), targeting "mesh gradient generator", "svg mesh gradient", "css mesh gradient", "blob gradient generator".

**Files created:**
- `public/icons/mesh-gradient-generator.svg`
- `src/components/MeshGradientGeneratorTool/index.js` — full 3-panel tool with drag-and-drop blobs, SVG preview, code gen, PNG/SVG download
- `src/components/MeshGradientGeneratorTool/styles.module.css` — complete styles
- `src/app/mesh-gradient-generator/page.js` — 1000+ word SEO content, 8 FAQs, SoftwareApplication schema

**Architecture decision:** Created as a separate tool rather than extending the existing CSS Gradient Generator because mesh gradients use SVG `feGaussianBlur` rendering (not CSS `radial-gradient`), export as SVG/PNG rather than CSS code, and target a distinct SEO keyword cluster.

**Competitive differentiators:**
- Draggable color blobs directly on the SVG canvas — most tools use sliders only
- Real-time SVG `feGaussianBlur` rendering for true organic mesh look
- Three export formats: SVG file, PNG (1600×1000 at 2× retina), CSS `radial-gradient` fallback
- 6 curated presets (Aurora, Sunset, Ocean, Forest, Neon, Candy)
- Background color control + per-blob color pickers
- Global blur, spread, and opacity controls

**Registry:** added to CSS Tools (`extended: false`), before CSS Minifier/Beautifier.

---

## 2026-04-18 — New Tool: CSS Clamp() Generator

Added a fluid typography generator targeting "css clamp generator", "fluid typography generator", "responsive font size generator", "clamp() calculator".

**Files created:**
- `public/icons/css-clamp-generator.svg`
- `src/components/CssClampGeneratorTool/index.js` + `styles.module.css`
- `src/app/css-clamp-generator/page.js` — full SEO + FAQ + schema

**Competitive differentiators:**
- Generates full 8-step type scale (xs–4xl) at once from one config — most tools do single values only
- Live viewport slider previewing exact computed px size for every scale step
- Step-by-step formula explainer (slope/intercept math) shown inline — no other tool does this
- 6 ratio presets + custom ratio input
- Three export formats: CSS custom properties, Tailwind fontSize config, SCSS variables
- rem/px unit toggle with proper root font size handling for WCAG 1.4.4 accessibility

**Registry:** added to CSS Tools (`extended: false`), before Glassmorphism Generator.

---

## 2026-04-18 — New Tool: CSS Glassmorphism Generator

Added a full CSS glassmorphism generator tool targeting high-traffic search keywords ("css glassmorphism generator", "frosted glass css effect", "tailwind glassmorphism", "backdrop-filter blur generator").

**Files created:**
- `public/icons/glassmorphism-generator.svg` — SVG icon with layered glass panel design
- `src/components/GlassmorphismGeneratorTool/index.js` — full 3-panel tool component
- `src/components/GlassmorphismGeneratorTool/styles.module.css` — complete styles
- `src/app/glassmorphism-generator/page.js` — page with 1000+ word SEO content, FAQ schema, SoftwareApplication schema

**Competitive differentiators over ui.glass, css.glass, hype4.academy:**
- Saturation control (`backdrop-filter: saturate()`) — most tools skip this
- 8 component presets: Card, Navbar, Button, Modal, Badge, Sidebar, Dark Glass, Frosted
- Background image file upload (drag-and-drop), not just URL input
- CSS + Tailwind class string + React inline style export in one tool
- Browser compat badge with Firefox `about:config` warning
- Decorative blobs in preview for realistic demo of the blur effect

**Registry:** added to CSS Tools category (`extended: false`), positioned before CSS Minifier/Beautifier.

---

## 2026-04-17 — SEO Content Expansion: 800–1200+ words on all tool pages

Expanded on-page SEO content for all 15 tool pages that had short placeholder text. Each page now meets the 800–1200+ word content target across five SeoSection zones:

- **about.description** expanded to ~180–200 words (was 1–3 sentences)
- **howToUse** expanded to ~220–250 words (was 1–2 sentences)
- **features** expanded to 10 detailed items (was 6–8 short bullets)
- **useCases** cards expanded to 2–3 sentences each (was 1 sentence)
- **faqSchema.mainEntity** answers expanded to 3–5 sentences each (was 1 sentence)
- All pages switched to `faqs: faqSchema.mainEntity.map()` to keep JSON-LD schema and on-page content in sync

**Batch 1** — animated-svg-icons, box-shadow-generator, css-animation-generator, css-loader-generator, flexbox-builder

**Batch 2** — font-pairing-tool, json-table-viewer, rem-px-converter, responsive-preview-tool, html-to-jsx-converter

**Batch 3** — diff-checker, json-formatter, color-palette-generator, css-filter-generator, css-transform-generator

Tools already at target content volume (not modified): carousel-builder, base64-encoder-decoder, jwt-decoder, css-minifier-beautifier, css-to-tailwind, svg-animation-generator, gradient-generator, html-formatter, regex-tester, tailwind-to-css, tailwind-formatter

---

## 2026-04-17 — SEO Audit: keyword-optimized all 24 tool pages

- Researched top-ranking competitors and high-volume search terms for every tool
- Updated `title`, `description`, `keywords`, `openGraph`, and `twitter` metadata on all 24 tool `page.js` files
- Titles now lead with the primary search keyword (e.g. "CSS Gradient Generator — Linear, Radial & Conic Gradient Builder Online")
- Descriptions are under 160 chars and naturally include 2–3 high-volume keywords + a benefit/CTA
- Keywords arrays expanded to 13–15 terms each, adding missing variants (e.g. "base64 url safe" → also "base64url encoder", "rem to px" → also "rem calculator", "px to rem online")
- Tools affected: animated-svg-icons, box-shadow-generator, carousel-builder, color-palette-generator, css-animation-generator, css-filter-generator, css-loader-generator, css-minifier-beautifier, css-to-tailwind, css-transform-generator, diff-checker, flexbox-builder, font-pairing-tool, gradient-generator, html-formatter, html-to-jsx-converter, json-formatter, json-table-viewer, regex-tester, rem-px-converter, responsive-preview-tool, svg-animation-generator, tailwind-formatter, tailwind-to-css

---

## 2026-04-17 — New Tool: JWT Decoder (`/jwt-decoder`)

### JWT Decoder
- **New tool** added to the Dev Tools category (violet accent `#8b5cf6`)
- **Three-panel layout** — Header (orange dot) | Payload (violet dot, 1.6× wider) | Signature (green dot)
- **Decode** — splits `header.payload.signature`, Base64URL-decodes header + payload, displays as syntax-highlighted JSON
- **Claims table** — plain-English descriptions for 20+ standard JWT/OIDC claims (iss, sub, aud, exp, nbf, iat, jti, name, email, roles, scope, azp, sid, nonce, auth_time, etc.)
- **Time claims** — exp, iat, nbf, auth_time shown as human-readable ISO date strings
- **Live expiry countdown** — colour-coded progress bar + live `Xh Ym Zs` countdown updated every second via `setInterval`
- **HS256 verification** — Web Crypto API `crypto.subtle` HMAC-SHA256; show/hide secret toggle
- **alg:none warning** — amber warning box for tokens with no signature algorithm
- **Bearer auto-strip** — `/^Bearer\s+/i` prefix removed automatically
- **Sample JWT** — pre-built token with roles, scope, email, iss, aud, exp=9999999999 for instant testing
- **100% client-side** — nothing sent to a server
- **Files**: `src/components/JwtDecoderTool/index.js`, `src/components/JwtDecoderTool/styles.module.css`, `src/app/jwt-decoder/page.js`, `public/icons/jwt-decoder.svg`
- **Registry**: added entry at end with accent `#8b5cf6` (violet), category `dev`

---

## 2026-04-17 — New Tool: Base64 Encoder/Decoder (`/base64-encoder-decoder`)

### Base64 Encoder/Decoder
- **New tool** added to the Dev Tools category
- **Encode mode** — live text-to-Base64 as you type; file/image upload via drag & drop or file picker; optional Data URI prefix output (`data:mime;base64,...`)
- **Decode mode** — live Base64-to-text decoding; automatic image preview (PNG, JPEG, GIF, WebP, SVG) when decoded content is an image
- **Three encoding variants** — Standard (RFC 4648), URL-safe/Base64URL (replaces `+`/`/` with `-`/`_`, no padding — used in JWTs), MIME (76-char line-wrapped per RFC 2045)
- **Swap button** — flips input/output and toggles mode in one click
- **Copy + Download** — copy output to clipboard; download as text file or binary image
- **Byte counters** on both panes (B / KB / MB)
- **100% client-side** — uses browser `btoa`/`atob` + `TextEncoder`/`TextDecoder`; nothing sent to a server
- **Files**: `src/components/Base64Tool/index.js`, `src/components/Base64Tool/styles.module.css`, `src/app/base64-encoder-decoder/page.js`, `public/icons/base64-encoder-decoder.svg`
- **Registry**: added entry with accent `#f97316` (orange), category `dev`

---

## 2026-04-16 — Carousel Builder: gap control + image overlay + responsive preview toggle

### Carousel Builder (`/carousel-builder`)
- **Gap control** — new Gap slider (0–32px, step 2) in the Transition section (visible when transition=slide). CSS exports `--c-gap` custom property; track gets `gap: var(--c-gap)` in flex layout. Slide widths use `calc((100% - (var(--c-per-view) - 1) * var(--c-gap)) / var(--c-per-view))` for horizontal and equivalent formula for vertical. JS export uses `offsetWidth + gap` / `offsetHeight + gap` for px-based transforms. Preview uses `ResizeObserver` on the viewport element to compute exact `stepPx = (vpWidth - (perView-1)*gap) / perView + gap` and switches from percentage to px transforms. React export also includes `ResizeObserver` measurement.
- **Image overlay/tint** — new Overlay slider (0–80%, step 5) in the Appearance section. CSS exports `--c-overlay` custom property; each slide gets a `<div class="carousel__overlay">` with `background: rgba(0,0,0,var(--c-overlay))`, `position: absolute; inset: 0; z-index: 1`. `.carousel__content` gets `position: relative; z-index: 2` so text renders above the tint. Preview renders the overlay div conditionally when `overlay > 0`. Reflected in all 5 export formats.
- **Responsive preview toggle** — three icon buttons (📱 375px mobile, ⊡ 768px tablet, ▢ Full) in the Preview pane header. Clicking constrains the `.previewConstraint` wrapper's `maxWidth` with a CSS transition. The `ResizeObserver` in `PreviewCarousel` automatically recalculates `stepPx` when the container resizes.
- **Layout fix** — pane header changed from `justify-content: space-between` to `gap: 8px` flex row; toggle buttons use `margin-left: auto` to push them right.
- **Slide position fix** — non-fade slides now get `position: relative` for the overlay to anchor correctly.

---

## 2026-04-16 — Carousel Builder: image support + touch/swipe + slide templates + misc improvements

### Carousel Builder (`/carousel-builder`)
- **Image support per slide** — each slide card now has an Image URL input. When filled, the slide uses `background-image` with the color as fallback. A Cover/Contain toggle controls `background-size`. Reflected in all 5 export formats (inline style on HTML, backgroundImage in React, CSS background-* properties).
- **Touch / swipe support** — live preview detects pointer drag (>50px threshold) to navigate prev/next; exported JS uses `touchstart`/`touchend` events respecting `data-direction`; exported React uses `onTouchStart`/`onTouchEnd`.
- **Slide templates** — 4 one-click presets at the top of the Slides section: Hero (3 slides, horizontal/slide), Testimonials (3 slides, horizontal/fade), Products (4 slides, horizontal/slide/perView=3), Steps (3 slides, vertical/slide). Each preset populates slides and merges matching cfg settings.
- **`applyTemplate` function** — replaces slides with fresh uid's and merges template cfg into current config.

## 2026-04-16 — Carousel Builder: vertical direction + export bar + code output below preview

### Carousel Builder (`/carousel-builder`)
- Added an **export bar** directly below the live preview area in the center column.
- Bar contains: "Export" label, all 5 format tabs (HTML / CSS / JS / React / All-in-one), Copy button, and Download button — mirrors the header controls but surfaced closer to the preview for discoverability.
- Format selection, copy, and download are all wired to the same shared state as the header controls (selecting a format in either place updates both).
- Added **vertical carousel direction** (`direction: 'horizontal' | 'vertical'`) — new Direction radio in the Transition section. Vertical mode: track uses `flex-direction: column` + `translateY`, arrows move to top/bottom center (chevron-up/down), dots move to right side stacked vertically, dash-style dots swap their long axis. All 5 export formats (HTML, CSS, JS, React, All-in-one) fully reflect the direction setting.
- Added **syntax-highlighted code output** below the export bar in the center column; scrollable, takes remaining flex space. Same `codePre` + `highlightCode` rendering as the right panel.
- `.previewBody` changed from `flex: 1` to `flex-shrink: 0` so it no longer consumes all available height, leaving room for the code block.
- Added `.previewCodeBody` CSS rule.

---

## 2026-04-15 — Carousel Builder tool (new) + Tailwind→CSS improvements + Sidebar always-expanded

### Carousel Builder (`/carousel-builder`)
- New tool with 3-column layout: Settings | Live Preview | Code output.
- Live working carousel preview using inline React styles (no external CSS); responds to every config change instantly.
- **Slide editor:** Up to 8 slides, each with emoji, title, description, and background color (palette of 12 dark tones). Reorder with ↑/↓, remove with ✕.
- **Config sections:** Navigation (arrows on/off, circle/square/ghost style; dots on/off, circle/dash/square style), Behavior (autoplay with speed 1–8s, loop, pause on hover), Transition (slide/fade, 100–800ms duration), Appearance (accent color, border radius, height).
- **5 export formats:** HTML (semantic BEM markup with ARIA), CSS (custom properties `--c-accent`, `--c-duration`, `--c-radius`, `--c-height`), JS (ES6 `Carousel` class, zero dependencies), React (hooks-based functional component, imports `./carousel.css`), All-in-one (complete standalone HTML file).
- Syntax highlighting for all formats via `hlCss`, `hlJs`, `hlHtml` character-level parsers.
- Copy to clipboard and download as `.html/.css/.js/.jsx`.
- **Files:** `CarouselBuilderTool/index.js`, `CarouselBuilderTool/styles.module.css`, `app/carousel-builder/page.js`, `public/icons/carousel-builder.svg`. Registry entry added (`extended: true`, category: css, accent: #818cf8).

### Tailwind → CSS improvements
- **Output format tabs:** CSS (default), SCSS (nested `&:hover`, `@media` inside selector), JS Object (camelCased React style object with `//` comments for variants).
- **HTML snippet input:** Detects `<tag class="...">` patterns; each element gets its own named block (`.div`, `.img`, `.span-2`, etc.).
- **Editable selectors:** In HTML mode, clickable selector chips below toolbar; click to rename inline, Enter/Escape/blur to confirm; resets on new input.
- **Unknown class warnings:** Unrecognised classes appear as `/* ⚠ not converted: class-name */` at the bottom of each block, with a yellow badge in the pane header showing the count.
- **Bug fix:** `highlightCss` had a malformed span on `}` — missing closing `"` caused `}` to vanish from the rendered output.
- **OG image URL corrected:** Was `tailwind-to-css-converter.png`, fixed to `tailwind-to-css.png`.

### Sidebar
- All category accordions now open by default on first load (changed initial state from active-only to all categories open).

---

## 2026-04-15 — JSON Formatter: search in output panel

- **Search bar in output panel:** Added an inline search bar that slides in below the Output panel header. Triggered via the search icon button in the panel head or with **Ctrl+F** (when output has content).
- **Match highlighting:** `applySearch()` splits the syntax-highlighted HTML on tag boundaries and injects `<mark class="j-search">` / `<mark class="j-search-current">` into text nodes only — so it doesn't corrupt span attributes. Yellow background for all matches, orange for the active one.
- **Navigation:** ↑ / ↓ buttons (Shift+Enter / Enter in the input) cycle through matches with wrap-around. Counter shows "X of Y" or "No results". Scrolls the current match into view smoothly.
- **Keyboard:** ESC closes search and clears query. Search auto-closes when output is cleared.
- **Files changed:** `globals.css`, `JsonFormatterTool/styles.module.css`, `JsonFormatterTool/index.js`.

---

## 2026-04-14 — CSS → Tailwind: fix HTML/JSX output + add History panel

- **Fixed `highlightTailwind` HTML/JSX bug:** Lines like `<div class="flex p-4">` were passed raw into `dangerouslySetInnerHTML`, causing `<div>` to render as real DOM elements. Fix: call `esc(line)` first so `<` → `&lt;` and `>` → `&gt;`, then run the class-attribute regex on the already-escaped string (safe because `esc()` doesn't touch `"`).
- **Attribute highlighting improved:** `class`/`className` attribute name now highlighted in light blue (`#9cdcfe`), quote delimiters in orange (`#ce9178`), utility classes in sky blue, arbitrary values in amber.
- **History panel added:** toolbar History button (with count badge) toggles a 340px slide-in panel anchored to the right edge. Saves up to 15 entries on every Copy or Download. Each entry shows timestamp, format, class count, and a CSS preview snippet. Clicking an entry restores input and format. "Clear all" button removes all entries.
- **New CSS classes:** `.histPanel`, `.histPanelHeader`, `.histPanelTitle`, `.histClearBtn`, `.histCloseBtn`, `.histList`, `.histItem`, `.histMeta`, `.histFmt`, `.histPreview`, `.histEmpty`, `.histBadge`, `.btnToolActive`.

---

## 2026-04-14 — New tool: CSS → Tailwind Converter

- **New tool added:** `css-to-tailwind` under the **Converters** category (`extended: false`).
- **Two-panel layout:** CSS input (left) with live syntax highlighting overlay + Tailwind output (right) — both panels have synchronized line numbers. Converts as you type.
- **Converter logic covers 100+ CSS properties:**
  - Layout: `display`, `position`, `top/right/bottom/left/inset`, `z-index`
  - Flexbox: `flex-direction`, `justify-content`, `align-items`, `align-self`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`, `order`
  - Grid: `grid-template-columns/rows`, `grid-column/row`, `gap`, `column-gap`, `row-gap`
  - Spacing: `margin`/`padding` and all longhand + shorthand (1/2/3/4-value shorthands resolved)
  - Sizing: `width`, `height`, `min/max-width/height` with named values (`fit-content`, `max-content`, etc.)
  - Typography: `font-size`, `font-weight`, `font-family`, `text-align`, `line-height`, `letter-spacing`, `text-decoration`, `text-transform`, `white-space`, `word-break`, `text-overflow`
  - Colors: named CSS colors mapped to Tailwind palette; hex/rgb/hsl → arbitrary values
  - Borders: `border`, `border-width` (all sides), `border-style`, `border-radius` (all corners), `border-color`
  - Misc: `overflow`, `opacity`, `cursor`, `visibility`, `user-select`, `pointer-events`, `resize`, `object-fit`, `aspect-ratio`, `box-shadow`, `outline`, `transition`, `transition-duration/timing/delay`, background extras
- **Arbitrary value fallbacks:** any value not in Tailwind's scale outputs `class-[value]` — output is always valid Tailwind
- **Output formats:** Classes (plain string), HTML (`<div class="...">`), JSX (`<div className="...">`) — toggle via tabs in header
- **Tailwind class highlighting:** regular classes in sky blue, arbitrary values in amber
- **Status bar:** shows class count and arbitrary value count
- **Page:** `src/app/css-to-tailwind/page.js` — full SEO, FAQ/Software/BreadcrumbList JSON-LD

---

## 2026-04-14 — New tool: CSS Minifier / Beautifier

- **New tool added:** `css-minifier-beautifier` under the **CSS Tools** category (`extended: false`, always visible in sidebar).
- **Component:** `src/components/CssMinifierBeautifierTool/` — two processing modes in one tool:
  - **Beautify** — formats CSS with 2-space indentation, rule-per-line, consistent spacing, and comment preservation. Handles strings, at-rules, nested braces, and multi-selector blocks.
  - **Minify** — strips all comments, collapses whitespace, removes spaces around structural characters, eliminates trailing semicolons before `}`.
- **Syntax highlighting** in the output panel: properties (blue), values (orange), selectors (teal), at-rules (purple), comments (green), numbers/units (sage), `!important` (red).
- **Compression stats** in the header: shows input → output byte sizes and the percentage change (saved or expanded), color-coded green for minify savings and cyan for beautify expansion.
- **UX details:** drag-and-drop + file upload (`.css`), Edit button restores the original input after minify (not the minified text), history panel stores up to 15 snapshots with mode badge, timestamps, and size info.
- **Page:** `src/app/css-minifier-beautifier/page.js` — full SEO metadata, FAQ/Software/BreadcrumbList JSON-LD schemas.
- **Icon:** `public/icons/css-minifier-beautifier.svg` — curly-brace icon in `#22d3ee` cyan.
- **Registry:** accent `#22d3ee`.

---

## 2026-04-13 — SEO: H1, H2 headings and How to Use section across all 20 tool pages

- **SeoSection component updated:** Accepts a new `title` prop rendered as `<h1>`. Section labels ("Features", "Common Use Cases", "Frequently Asked Questions") changed from unsemantic `<p>` tags to proper `<h2>` headings. New "How to Use" section added between Features and Use Cases, with its own `<h2>` and the `howToUse` text block. Added `sectionH2` CSS class with slightly smaller size than `seoH2` to visually differentiate section headers from content headings.
- **All 20 tool pages updated:** Added `title` (matches metadata.title) and `howToUse` (130–170 words each) to every SEO object. Content is specific to each tool — explains the exact steps to use it, what each control does, and what to do with the output.

---

## 2026-04-13 — SEO: sitemap build pipeline fix

- **Root cause:** `output: 'export'` in `next.config.mjs` means static HTML only — no server runtime. `app/sitemap.js` requires a runtime and crashes the build.
- **`src/app/sitemap.js` deleted** — incompatible with static export.
- **`scripts/postbuild.js` rewritten** — now generates `sitemap.xml` entirely from `tools-registry.js` via `dynamic import()`. Writes directly to `out/sitemap.xml` and `tools/sitemap.xml`. No static `public/sitemap.xml` needed at all.
- **`public/sitemap.xml` deleted** — was stale (dead 2021 routes), now replaced by the generated one.
- Sitemap is now fully automated: add/remove a tool in the registry → next `npm run build` regenerates the correct sitemap.

---

## 2026-04-13 — SEO: sitemap fully automated via registry

- **Deleted `public/sitemap.xml`** — stale file had 20+ dead 2021 routes (difference-checker, color-picker, css-box-shadow-generator, etc.) all returning 404. Removed to stop the static file shadowing the dynamic one.
- **`src/app/sitemap.js` now the sole sitemap source** — generated dynamically from `tools-registry.js`. Next.js serves it at `/sitemap.xml` automatically. `robots.txt` Sitemap directive already points to the correct URL.
- **`lastmod` field added to every tool** in `tools-registry.js` — sitemap uses each tool's actual date. Update `lastmod` when making significant changes to a tool page.
- **Workflow for adding a tool:** add one entry to registry (including `lastmod`) → sitemap picks it up on next build. No other files to touch.
- **Workflow for removing a tool:** delete/change `status: 'soon'` in registry → gone from sitemap automatically.

---

## 2026-04-13 — SEO: sitemap, robots, stale copy fixes

- **`src/app/sitemap.js` created** — Next.js dynamic sitemap auto-generated from `tools-registry.js`. Homepage at priority 1.0 / weekly; each live tool at 0.8 / monthly. Satisfies `robots.txt` Sitemap directive. Adding a tool to the registry now also adds it to the sitemap automatically.
- **Stale "14 more" removed** from `layout.js` (description, og:description, twitter:description) and `page.js` — replaced with "and more" so the copy doesn't go stale again as tools are added.
- No `favicon.ico` present — layout uses `/icons/json-formatter.svg` as shortcut icon (acceptable for now).

---

## 2026-04-13 — Tools registry: single source of truth for 100+ tools

Created `src/lib/tools-registry.js` — one file to rule all tool metadata:

- **`CATEGORY_META`** array defines sidebar accordion groups and their display order
- **`TOOLS`** array holds every tool: `slug`, `name`, `sub`, `desc`, `icon`, `accent`, `category`, `extended`, `status`
- `extended: false` → core tools, always in sidebar accordion
- `extended: true` → More Tools section, revealed 9 at a time
- `status: 'soon'` → greyed out badge, non-clickable

**Consumers updated:**
- `Sidebar/index.js` — derives `CORE_TOOLS`, `EXTENDED_TOOLS`, `CATEGORIES`, and `TOOL_MAP` from the registry. Deleted local `TOOLS` dict, `CATEGORIES` array, and `import EXTENDED_TOOLS from '@/lib/tools-extended'`
- `app/page.js` — replaced 20-entry hardcoded `TOOLS` array with `import { TOOLS } from '@/lib/tools-registry'`
- `HomeGrid/index.js` — updated to use `tool.slug` (registry shape) instead of `tool.href`

**Deleted:** `src/lib/tools-extended.js` (data merged into registry)

**Adding a new tool now = one entry in `tools-registry.js` only.**

---

## 2026-04-13 — Homepage: paginated tool grid with Show More

- Extracted `HomeGrid` client component (`src/components/HomeGrid/`) from the server `page.js`. Keeps `page.js` as a server component for full SEO/metadata support.
- Shows first 9 tool cards on load. A dashed "Show N more tools · N left" button reveals 9 more per click — same PAGE_SIZE as the sidebar More Tools section.
- When all tools are shown, button is replaced with an "All N tools shown" note.
- Card styles moved from `page.module.css` into `HomeGrid/styles.module.css`. `page.js` now passes the `TOOLS` array as a prop.

---

## 2026-04-10 — Sidebar: More Tools section + tools-extended.js + CSS fix

- **`src/lib/tools-extended.js` created:** Single source of truth for extended tools. Each entry has `slug`, `name`, `sub`, and `status` (`'live'` or `'soon'`). `regex-tester` is the first entry.
- **`MoreTools` component added** to the bottom of the sidebar accordion. Reveals tools from `EXTENDED_TOOLS` 5 at a time via a "More tools (N)" button. Auto-expands if the active page's slug is in the extended list.
- **Unified search:** The search bar now queries both core `TOOLS` and `EXTENDED_TOOLS` and merges results into one flat list. Soon-flagged extended tools render with a "soon" badge and are non-clickable.
- **CSS fix (this session):** Added all missing styles for `.moreTools`, `.moreDivider`, `.showMoreBtn`, `.allShown`, `.soonBadge`, `.soon`, `.itemInner`, `.searchMeta`. Cleaned up conflicting `.item a` flex rules that were superseded by the new `.itemInner` wrapper pattern.

---

## 2026-04-13 — Sidebar: search bar + collapsible category accordion

Rebuilt the sidebar from a flat list into a categorized accordion with search:

- **5 categories:** Dev Tools, Converters, CSS Tools, Typography, SVG & Icons — each collapsible with animated height transition
- **Search bar** at the top with live filtering across all tool names, subtitles, and slugs. Highlights matched characters in yellow. Shows a "no results" state for unmatched queries
- **Keyboard shortcut:** press `/` anywhere to focus the search input; `Esc` clears it and blurs
- **Active category auto-opens** on mount and on navigation — never hides the current tool
- **Scalable data structure:** `TOOLS` registry (slug → name/sub) and `CATEGORIES` registry (id → label + tools[]) are fully separate — adding a new tool only requires one entry in each
- Search results show as a flat list, bypassing the accordion for quick scanning
- Category headers show a pill count badge; badge turns blue when the group is open
- Chevron rotates 180° on open with a CSS transition

---

## 2026-04-10 — Animated SVG Icons: 20 more meaningful icons (105+ total)

Fourth batch — every animation is semantically tied to the icon's purpose:

- **UI:** Spinner Ring (rotating arc gap), Skeleton (shimmer wave), Battery (bars fill one by one), Eye Off (paths draw then slash crosses), Sort already existed
- **Notification:** Signal Bars (bars grow from bottom up), Notif Dot (dot pops in + ripple ring), Warning (triangle draws + content fades + slow pulse)
- **Actions:** Pin (swings down from top like a pendulum), Move (cross arrows grow + nudge loop), Checklist (3 items check off in sequence)
- **Social:** Wave/Greeting (hand rocks back and forth), Thumbs Down (drops from above)
- **Media:** Stop (square scales in), Mute (speaker draws then X slashes across)
- **Dev:** Git Merge (nodes pop + branch curves draw), Diff (+ block / - block with lines), Webhook (dot appears then signal arcs expand outward), Cloud Download (cloud draws + arrow bounces down)

Updated page.js to reflect 105+ icons.

---

## 2026-04-10 — Animated SVG Icons: 20 more meaningful icons added (85+ total)

Third batch — focused on icons developers actually reach for:

- **Actions:** Undo (arc sweep back), Redo (arc sweep forward), Crop (corner draw), Resize (4-corner scale pop)
- **UI:** Drag Handle (dot fade-in + nudge), Dots Spinner (3-dot bounce sequence), Progress Bar (fill sweep from left), Sort (staggered line draw + arrow), Compass (dial spin-in)
- **Social:** Verified Badge (pop + check draw), Users/Team (staggered draw)
- **Dev:** Rocket/Deploy (launch rise + exhaust flicker), Pull Request (node pop + branch draw + arrow), API (bracket draw + slash fade)
- **Media:** Record (pulse dot), Video (rect + chevron draw), Image (draw + sun pop + mountain draw), Skip Forward (slide in)
- **Notification:** Error / Circle-X (draw + shake), Info (draw + content fade)
- **Navigation:** Compass (circle draw + needle spin)

Updated page.js to reflect 85+ icons.

---

## 2026-04-10 — Animated SVG Icons: 20 more icons added (65+ total)

Second batch of 20 new icons:

- **Actions:** Flag (wave animation), Scissors (rotate-in blades + draw lines), Link (draw), Tag (draw + dot)
- **Navigation:** External Link (staggered draw), Map (polygon + staggered lines), Map (draw)
- **Social:** Chat/Comment (draw bubble + dot-pop typing indicator), Award/Badge (pop + ribbon draw), User (draw)
- **UI:** Clock (draw circle + hands), Grid/Apps (9-cell staggered fade-in), Toggle On (slide knob), Palette (draw + dot-pop swatches), Unlock (draw), Layers (staggered draw)
- **Dev:** Git Branch (pop nodes + draw lines), Cloud Upload (draw + bounce arrow), Server (draw + blinking status LED), Package (draw box + seam line)
- **Media:** Mic (draw + pulse), Headphones (draw), Shuffle (rotate-in), Repeat (continuous spin)
- **Notification:** Mail (draw rect + draw chevron)

Updated page.js to reflect 65+ icons.

---

## 2026-04-10 — Animated SVG Icons: 20 new icons added (45+ total)

Added 20 new animated SVG icons across all categories:

- **Actions:** Copy (staggered draw), Edit/Pencil (rotate-in), Save (draw sequence), Link (draw), Filter (staggered lines)
- **Navigation:** Arrow Up (bounce), Arrow Left (slide), Home (draw), Menu/Hamburger (staggered line-in), Map Pin (pin-drop with squash)
- **Social:** Bookmark (draw + fill fade), Share (nodes pop + lines draw)
- **UI:** Sun (slow spin rays + pulse core), Moon (rise + rotate), Expand/Fullscreen (scale pop), Filter
- **Media:** Pause (scale pop), Volume (wave fade-in), Camera (draw + shutter flash)
- **Dev:** Terminal (draw + blinking cursor), Database (staggered ellipse draw), Bug (wiggle)
- **Notification:** Inbox (draw + slide-in arrow)

Updated page.js title/description/featureList to reflect 45+ icons. Each new icon uses a unique CSS class name prefix to avoid keyframe conflicts with existing icons.

---

## 2026-04-10 — On-page SEO pass: all 20 tool pages + root layout + homepage

Completed a full on-page SEO pass across the entire site:

**Root layout (`src/app/layout.js`):** Added title template (`%s | DevTools`), richer global description and keywords, full OG + Twitter base tags, `metadataBase`, and an Organization JSON-LD schema rendered inline in `<body>`.

**Homepage (`src/app/page.js`):** Added complete `export const metadata` (was entirely missing) with title, description, 14 keywords, canonical, OG, Twitter. Added WebSite JSON-LD schema.

**All 20 tool pages:** Applied consistent optimizations:
- Titles rewritten to 41–55 chars, primary keyword first (e.g. "JSON Formatter Online — Beautify, Validate & Minify JSON")
- Descriptions expanded to 150–165 chars with value prop + "free / no sign-up" CTA
- Keywords arrays expanded to 13–14 entries including long-tail variants
- Added SoftwareApplication JSON-LD schema (signals free web tool to Google)
- Added BreadcrumbList JSON-LD schema (enables breadcrumb rich snippets)
- Added full OG / Twitter blocks where missing or incomplete

**Bug fixes during audit:**
- `regex-tester/page.js`: OG/Twitter image URL had a literal space (`regex-tester tool.png` → `regex-tester.png`)
- `css-transform-generator/page.js`: OG/Twitter image URL missing `/images/` directory prefix
- `animated-svg-icons/page.js`: OG/Twitter image URL missing `/images/` directory prefix

---

## 2026-04-09 — HTML Formatter: drag-and-drop upload + Download button

Added drag-and-drop file upload to the editor area — dashed orange outline and full overlay appear on hover, drop loads file text into editor. Upload button in toolbar also triggers hidden `<input type="file">`. Added Download button that saves formatted (or raw) content as `formatted.html` using Blob/URL API.

## 2026-04-09 — New tool: HTML Formatter / Prettifier

Added `html-formatter` tool. Single editor panel with live line-number gutter (scrolls in sync). Format button prettifies HTML with 2-space indentation, handles void elements and self-closing tags. Automatically formats inline `<style>` CSS blocks and `<script>` JS blocks. History button opens a right-side slide-in panel with up to 15 timestamped snapshots — click any to restore. Copy, Download, Upload, Clear toolbar buttons. Entirely client-side. Wired into sidebar (after JSON Formatter) and homepage.

---

## 2026-04-09 — SvgAnimationGeneratorTool: CSS animation engine

Added CSS as a third animation engine alongside SMIL and GSAP. CSS animations are embedded in a `<style>` tag inside the SVG — no external library required. Added 17 presets: Rotate, Spin CCW, Pulse, Bounce, Float, Move Right, Shake, Wiggle, Skew, Zoom In, Fade, Blink, Color Cycle, Glow, Draw Stroke, March, Stroke Pulse. Each animation generates a unique class name (animName + animId) applied to the SVG element, with @keyframes scoped to that class. Duration and delay are editable live. Blue color theme (vs SMIL red / GSAP green). CSS style block is included in both SVG and HTML exports and in the live canvas preview.

---

## 2026-04-09 — New tool: CSS Transform Generator

Added `css-transform-generator` tool. Visual sliders + number inputs for all 10 transform properties: translateX/Y/Z, rotateX/Y/Z, scaleX/Y, skewX/Y. Live preview box with grid background and origin crosshair. Transform-origin 3×3 grid picker. Perspective slider auto-appears for 3D transforms. 10 presets (Flip H/V, Rotate 45/90, Scale Up/Down, Skew, Tilt 3D, Slide Right). Export as CSS, Tailwind arbitrary classes, or React inline style object. Wired into sidebar, homepage, postbuild.js.

---

## 2026-04-09 — New tool: Regex Tester

Added `regex-tester` tool. Live inline match highlighting (overlay layer behind transparent textarea), capture groups table with named group support, replace mode with $1/$<name> references, all JS flags (g/i/m/s/u) as toggle buttons, 10 presets (Email, URL, IPv4, Hex Color, ISO Date, Phone, HTML Tag, JWT, Markdown Bold, CSS Class), inline regex error display, quick reference panel with 20 tokens. Wired into sidebar, homepage, postbuild.js.

---

## 2026-04-09 — New tool: CSS Filter Generator

Added `css-filter-generator` tool. Visual sliders for 9 CSS filter functions (blur, brightness, contrast, saturate, grayscale, sepia, hue-rotate, invert, opacity) plus drop-shadow (X, Y, blur, color, opacity). Side-by-side original vs filtered live preview with 4 sample images, file upload, and URL input. 10 presets (Vintage, Grayscale, Cold, Warm, High Contrast, Dreamy, Neon, Matte, Night Vision). Generated CSS includes -webkit-filter. Wired into sidebar, homepage, postbuild.js.

---

## 2026-04-09 — New tool: Color Palette Generator

Added `color-palette-generator` tool. Generates harmonious color palettes from any base color using 8 harmony algorithms (monochromatic, analogous, complementary, split-complementary, triadic, tetradic, shades, tints). All math done in HSL space. Features: live color picker + hex input + HSL badge, expanding swatch hover view, click-to-copy individual colors, export as CSS variables / Tailwind config / Hex list / HSL list / SCSS. Wired into sidebar, homepage, postbuild.js (sitemap).

---

## 2026-04-08 — New tool: Animated SVG Icons

Added `animated-svg-icons` tool. 25 pure-SVG animated icons across 6 categories (Actions, Navigation, Social, Media, UI, Dev, Notification). Each icon embeds CSS @keyframes directly in the SVG — zero JS dependencies. Features: category filter, color picker + 6 presets, size/stroke/speed sliders, replay button, live tile previews, export as SVG / React JSX / HTML / CSS-only, one-click copy, SVG file download. Wired into sidebar, homepage, postbuild.js (sitemap).

---

## 2026-04-08 — Diff Checker: share via URL, export patch, local history

Added three features: (1) Share — encodes both panes as base64 URL params, copies shareable link to clipboard, also auto-restores from URL on load. (2) Export — generates standard unified diff (.patch) file and triggers browser download. (3) History — auto-saves last 8 diffs to localStorage with 2s debounce; History panel (slide-in from right) shows relative timestamps, A/B previews, restore on click, and per-entry delete.

---

## 2026-04-08 — Diff Checker: jump to change, file upload, syntax highlighting

Three major features added: (1) Hunk navigation — prev/next buttons in header with change counter that scroll both panes to each changed block. (2) File upload and drag & drop on each pane — Upload button + drop zone with visual overlay, reads plain text files. (3) Syntax highlighting — uses highlight.js with auto language detection (JS, TS, Python, CSS, HTML, JSON, Bash, SQL), toggled via "Syntax" checkbox, detected language shown as badge in pane header, char-level diff takes priority over syntax colors on changed lines.

---

## 2026-04-08 — Diff Checker: added character count to stats bar

Added total character count for each pane (A and B) to the stats bar, displayed as `X chars` alongside existing line and word counts.

---

## 2026-04-07 — Gradient Generator: interactive bar + preview modes

Added an interactive gradient stop bar (drag handles, click to add stop, color interpolation at click point). Added Text and Border preview modes alongside Background. Selected stop is highlighted in the sidebar list. Randomize button moved to preview mode bar.

---

## 2026-04-07 — Responsive Preview: Device picker → select dropdown

Replaced the collapsible device-picker panel (button grid + toggle) with a compact `<select>` dropdown in the controls bar. Custom W×H inputs now appear inline next to the dropdown only when "Custom" is selected. Removed `devicesOpen` state and all device bar CSS; added `.deviceSelect` style.

## 2026-04-06 — SVG Animation Generator: major feature expansion

Added SVG upload + creative enhancements to `SvgAnimationGeneratorTool`:
- **SVG Import**: upload any `.svg` file — extracts all child elements (circle, rect, ellipse, path, g, polyline, etc.) as individual editable layers; preserves `<defs>`, gradients, clip-paths, and styles; adopts the original file's `viewBox` as the canvas
- **New shapes**: Star (with outer/inner radius + point count), Heart (path), Arrow (polygon)
- **15 animation presets** (up from 6): Rotate, Spin CCW, Pulse, Zoom In, Bounce, Float, Move Right, Shake, Wiggle, Skew, Fade, Blink, Color Cycle, Rainbow, Stroke Draw
- **Per-animation duration editor**: inline editable `dur` field on each applied animation
- **Stroke controls**: color picker + hex input + width slider in Properties
- **Quick color swatches**: 10 preset colors for instant fill changes
- **Canvas background presets**: Dark, Light, Dots, Grid, None
- **Duplicate layer button** (⎘) in the layers list
- **SVG badge** on imported layers; shape-specific numeric props hidden for imported elements

---

## 2026-04-06 — Remove Code Formatter Tool

Removed the Code Formatter tool entirely:
- Deleted `src/app/code-formatter/` page directory
- Deleted `src/components/CodeFormatterTool/` component
- Deleted `public/icons/code-formatter.svg`
- Removed entry from Sidebar `TOOLS` array
- Removed card from homepage `TOOLS` array
- Updated tool count from 16 → 15 in SEO description and features list

---

## 2026-04-05 — Diff Checker UX overhaul + line wrap toggle

- Fixed alignment bug: `.textarea` changed from `white-space: pre-wrap` to `white-space: pre` so per-line highlights stay aligned with text rows
- Added **Wrap Lines** checkbox — toggles `pre-wrap` + `break-word` via `.hlPreWrap` / `.textareaWrap` classes; horizontal scroll sync works when wrap is off
- Scroll sync now syncs `scrollLeft` too (not just `scrollTop`) for horizontal sync when wrap is off
- Added **Load Sample** button in header with JS function comparison sample
- Stats bar: shows 0 lines when panes are empty; stats (added/removed/same/similarity) only show when content is present
- Pane improvements: line count badge, disabled Copy/Clear when empty, Clear button turns red on hover, Paste reordered first
- Empty diff state: icon + descriptive message; "No differences" shown with check icon
- Diff table rows: improved colors (del rows use `#fecaca` text, add rows use `#bbf7d0`); hunk separator styled as full-width row with borders
- `disabled` prop added to Copy Diff and Merge buttons when panes are empty

---

## 2026-04-04 — HtmlToJsxConverter: syntax highlighting + UX improvements

- Added textarea+pre overlay syntax highlighting for HTML input (tag names teal, attr names light blue, attr values orange, comments green, punctuation gray)
- Added JSX output syntax highlighting (same scheme + purple for JSX expressions `{...}` and `{{...}}`)
- `Wrap in <>` option now defaults to `true` on page load
- Added "Prettify" button on input pane to auto-format HTML
- Output is auto-prettified (indented) after every conversion
- Updated sample HTML to the card/form example with inline style, onclick, img, label, input, button
- Fixed `<>` / `</>` fragment tokens not being recognized by the tokenizer regex

---

## 2026-04-03 — Convert all 16 archive tools to React/Next.js

### What was done

Converted all remaining 14 archive tools to React components and added them to the sidebar and home page. The project now has 16 tools total, all with full feature parity, per-tool SEO metadata, and SVG favicons.

### New tools added

| Tool | Route | Key features |
|------|-------|-------------|
| REM ↔ PX Converter | `/rem-px-converter` | Base font slider, bidirectional conversion, live preview, reference table |
| HTML → JSX Converter | `/html-to-jsx-converter` | 6 toggle options, auto-convert, copy/download |
| JSON Table Viewer | `/json-table-viewer` | Filter, sort, paginate, column toggle, CSV export |
| Box Shadow Generator | `/box-shadow-generator` | Multi-layer shadows, neumorphism presets, CSS/Tailwind/JS/SCSS export |
| Diff Checker | `/diff-checker` | LCS-based diff, split/unified/inline modes, char-level highlighting, merge pane |
| Gradient Generator | `/gradient-generator` | Linear/radial/conic, color stop editor, presets, CSS/Tailwind/SCSS export |
| HTML Formatter | `/html-formatter` | Tokenizer-based pretty-print, minify toggle, indent options, stats |
| Tailwind Formatter | `/tailwind-formatter` | Dedup/sort/group classes, flat + grouped tabs, stats bar |
| Code Formatter | `/code-formatter` | Auto-detect JSON/CSS/JS/HTML/XML, side-by-side output |
| Font Pairing Tool | `/font-pairing-tool` | Curated Google Font pairs, live preview, size sliders, CSS export |
| CSS Loader Generator | `/css-loader-generator` | 10 loaders, custom colors/size/speed, CSS+HTML export |
| CSS Animation Generator | `/css-animation-generator` | 19 animations, duration/delay/easing/fill/direction controls, CSS/Tailwind/React export |
| SVG Animation Generator | `/svg-animation-generator` | Add SVG shapes, SMIL animation presets, download SVG |
| Responsive Preview Tool | `/responsive-preview-tool` | 8 device sizes from 320px to 1920px, iframe preview, zoom controls |

### Files created per tool
- `src/components/[Name]Tool.js` — React component (`'use client'`)
- `src/components/[Name]Tool.module.css` — CSS module (dark theme, global CSS vars)
- `src/app/[slug]/page.js` — Next.js page with full SEO metadata (title, description, keywords, canonical, OG, Twitter Card)
- `public/icons/[slug].svg` — Per-tool 32×32 SVG favicon

### Updated
- `src/components/Sidebar.js` — TOOLS array now contains all 16 tools; uses `<img src="/icons/[slug].svg">` instead of inline SVG
- `src/app/page.js` — Home page grid now shows all 16 tool cards with descriptions

### Build result
All 20 static pages (16 tools + home + 404 + 3 internal) compiled without errors. `npm run build` → `tools/` output ready for deployment.

---

## 2026-04-02 — Per-tool SEO, OG tags, and favicons

### What was done
- Added full metadata to each tool page: `title`, `description`, `keywords`, `authors`, `robots`, `canonical`
- Added full Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:siteName`, `og:locale`) per tool
- Added Twitter Card tags per tool (`summary_large_image`)
- Created per-tool SVG favicons in `public/icons/`:
  - `json-formatter.svg` — green `{}` icon
  - `flexbox-builder.svg` — yellow grid icon
- Each tool page sets its own `icons` in metadata so the browser tab shows the tool-specific favicon
- Added `metadataBase` to root layout pointing to `https://tools.webdevpuneet.com`

### AdSense note
AdSense script loads once on the first page load. With Next.js client-side navigation (SPA), the script stays loaded between tool pages — this is fine. When you add actual ad unit slots (`<ins class="adsbygoogle">`), each slot needs `(adsbygoogle = window.adsbygoogle || []).push({})` called once when it mounts, which React's `useEffect` handles automatically.

---

## 2026-04-02 — Remove "TOOLS" label from sidebar

### What was done
- Removed the "TOOLS" section label that appeared under the DevTools brand link in the left sidebar
- Reverted accidental removal of the JSON Formatter tool header (that change was wrong)
- Cleaned up unused `.label` CSS from `Sidebar.module.css`

---

## 2026-04-02 — Remove top header, move home link to sidebar

### What was done
- Removed the `<Header>` component from the root layout — the top bar with "DevTools" logo and nav links is gone
- Moved the **home/brand link** (⚡ DevTools) into the top of the left `<Sidebar>` component
- Moved the **Google AdSense** `<Script>` from `Header.js` into `Sidebar.js` so it still loads on every page
- `Header.js` and `Header.module.css` are now unused (kept on disk but not imported)
- Fixed two build errors from initial setup: missing `jsconfig.json` (for `@/` alias) and invalid `:global()` selectors in CSS Modules (moved syntax color classes to `globals.css`)

---

## 2026-04-02 — Next.js Project Initialization

### What was done

Migrated the standalone HTML tool pages into a unified **Next.js 15** project with a shared layout, common header/footer scripts, and a common tools-navigation sidebar.

### Project structure created

```
src/
  app/
    layout.js              # Root layout — wraps all pages with Header, Sidebar, Footer
    layout.module.css
    globals.css            # CSS design tokens (colors, fonts, radius) + global resets
    page.js                # Home/landing page — links to all tools
    page.module.css
    json-formatter/
      page.js              # Route: /json-formatter
    flexbox-builder/
      page.js              # Route: /flexbox-builder
  components/
    Header.js              # Common header — includes Google AdSense script
    Header.module.css
    Footer.js              # Common footer — includes Google Analytics script
    Footer.module.css
    Sidebar.js             # Common tools-navigation sidebar (replaces tools-nav.js)
    Sidebar.module.css
    JsonFormatterTool.js   # Full JSON formatter converted to React
    JsonFormatterTool.module.css
    FlexboxBuilderTool.js  # Full Flexbox Builder converted to React
    FlexboxBuilderTool.module.css
```

### Key decisions

- **Framework**: Next.js 15 + React 19, App Router, JavaScript (no TypeScript)
- **Styling**: CSS Modules per component + shared CSS variables in `globals.css`
- **Fonts**: Google Fonts (Syne + JetBrains Mono) loaded via `globals.css`
- **Google AdSense** (`ca-pub-2762737943861458`) — loaded via `<Script>` in `Header.js`
- **Google Analytics** (`UA-107386983-1`) — loaded via `<Script>` in `Footer.js`
- **Sidebar** — `Sidebar.js` (client component) replaces the old `common/tools-nav.js`; uses `usePathname()` for active-state highlighting
- Both tool components use `'use client'` with React `useState`/`useEffect`/`useMemo` hooks
- `dangerouslySetInnerHTML` used only for self-generated syntax-highlighted code output (no user HTML is rendered)

### Tools ported

| Tool | Old path | New route | Notes |
|------|----------|-----------|-------|
| JSON Formatter | `json-formatter/index.html` | `/json-formatter` | Full feature parity: format, minify, sort keys, copy, download, live parse, syntax highlight |
| Flexbox Builder | `flexbox-builder/index.html` | `/flexbox-builder` | Full feature parity: all container/item props, code output (CSS/SCSS/HTML/Tailwind/React), resizable code panel |

### How to run

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 2026-04-15 — Tailwind → CSS Converter (complete)

### What was done

Completed the **Tailwind → CSS Converter** tool (`/tailwind-to-css`), which was partially built (conversion engine + UI component existed) but missing the CSS module and Next.js page route.

**Files created:**
- `src/components/TailwindToCssTool/styles.module.css` — green (#34d399) accent colour scheme, matching the CSS module structure used by other tools (header, toolbar, editor panes, status bar, history panel)
- `src/app/tailwind-to-css/page.js` — full SEO metadata, three JSON-LD schemas (FAQPage, SoftwareApplication, BreadcrumbList), SeoSection with howToUse, features (10), useCases (6), faqs (8)

**Tool already in registry:** `tools-registry.js` already had the entry (`slug: 'tailwind-to-css'`, `status: 'live'`, `category: 'converters'`), icon existed at `public/icons/tailwind-to-css.svg`, and postbuild.js auto-reads the registry — no other files needed updating.

### Capabilities

- 200+ Tailwind utility classes → CSS declarations (static map + pattern matching)
- Arbitrary value support: `w-[420px]`, `bg-[#3b82f6]`, `p-[1.5rem]`
- Responsive variants: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` → `@media (min-width: ...)` wrappers
- State/pseudo variants: `hover:`, `focus:`, `dark:`, `disabled:`, `placeholder:`, etc.
- HTML/JSX snippet input — strips class/className attributes automatically
- Syntax highlighting for both input (Tailwind) and output (CSS)
- Conversion history (last 15 entries, auto-save after 1.5s idle)
- File upload + drag & drop (.txt, .html, .jsx, .tsx)
- Download output as `.css` file


## 2026-04-17 — Carousel Builder: Infinite (Circular) Loop
Added an **Infinite** toggle to the Behavior section (visible when Loop is on and transition is Slide). When enabled, the carousel uses a clone-based infinite loop so the track always animates forward/backward without snapping back to the first slide. Clones of the first and last slides are prepended/appended to the track; after each wrap transition the track silently snaps to the real slide. Feature works in the live preview (using visualIdx + noTrans state), in the exported JS (Carousel class with _initInfinite/_moveTrack), and in the exported React component (EXT_SLIDES array + visualIdx effect). data-infinite="true" attribute added to generated HTML.

## 2026-04-17 — Carousel Builder: Infinite Loop Tiled Fix (perView > 1 + slides < perView)
Replaced the single-clone snap approach with a tiled approach. PreviewCarousel now renders enough copies of the slide array (copies = max(3, ceil(perView*3/slides.length))) to fill the viewport at all times. visualIdx anchors to infOffset (centre copy); after each wrap transition, snaps back to the centre cycle invisibly. Fixed initial slide-in flash by starting with noTrans=true and using useLayoutEffect for stepPx measurement. Removed percentage fallback in track transform (always pixel-based). Same tiling logic applied to generated JS (_initInfinite clones enough copies) and React (EXT_SLIDES computed dynamically).

## 2026-04-20 — New Tool: Image to SVG Converter
Added a fully client-side image vectorizer that converts PNG, JPEG, WebP, GIF, and BMP images to scalable SVG vector graphics using ImageTracer.js (imagetracerjs npm package, public domain). No server, no upload — all tracing runs in the browser via Canvas API.

**Features:**
- 3 color modes: Color (2–32 colors via palette quantization), Grayscale (luminance-based), Black & White (threshold-based)
- Color limit slider (2–32 colors) for Color and Grayscale modes
- Threshold slider (0–255) for B&W mode — controls light/dark cutoff
- Smoothing slider — adjusts Bezier curve fit (sharp detail vs. smooth paths)
- Detail slider — sets minimum path size to suppress noise and compression artifacts
- Live SVG preview with background toggle (checker, white, black, transparent)
- SVG Code tab — view raw SVG markup
- Download SVG (named after source file) + Copy SVG Code to clipboard
- Drag & drop, click-to-upload, and Ctrl+V clipboard paste
- Images auto-downscaled to max 1200px width before tracing for performance
- Metadata display: source file name, size, dimensions, output SVG size

**SEO:** 30+ keywords targeting "image to svg", "png to svg", "jpg to svg", "vectorize image online", "raster to vector", "image vectorizer", "convert image to vector", "photo to svg", "logo to svg". Full seoData with about (4 paragraphs), 12 features, 6 use cases, 10 FAQs, 3 JSON-LD schemas (SoftwareApplication, BreadcrumbList, FAQPage).

**Files:** ImageToSvgTool/index.js, ImageToSvgTool/styles.module.css, app/image-to-svg/page.js, public/icons/image-to-svg.svg, tools-registry.js (converters, accent #f97316), package.json (imagetracerjs added).

## 2026-04-20 — HTML Formatter: SEO Content Expansion
Rewrote `src/app/html-formatter/page.js` SEO content from ~400 words to 1200+ words to meet the project's content volume requirement.

**Changes:**
- **About section**: Expanded from 1 short paragraph to 4 detailed paragraphs covering what the formatter does, inline CSS/JS formatting differentiation vs. basic HTML indenters, real-world use cases (minified output, copy-paste fragments, editor drift), and the history feature
- **Features**: Expanded from 8 minimal items to 12 fully described items
- **howToUse**: Expanded from 1 paragraph to 6 structured paragraphs covering paste/upload/drag-drop, Format button behavior, line-number gutter, History bar, Download/Copy, and specific use case walkthroughs (minified HTML, scraped HTML, email templates)
- **FAQs**: Expanded from 8 FAQs with 1–2 sentence answers to 10 FAQs with 3–5 sentence answers
- **Keywords**: Expanded from ~15 to 30 terms, adding: html pretty print, html code formatter online free, beautify html code online, html formatter with line numbers, html formatter with css and javascript, format html file online, html code fixer, html prettify online, html code formatter with history

## 2026-04-20 — Tailwind Formatter: SEO Content Expansion
Rewrote `src/app/tailwind-formatter/page.js` SEO content from ~300 words to 1200+ words to meet the project content volume requirement.

**Changes:**
- **Keywords**: Expanded from 15 to 30 terms, adding: tailwind class cleaner, tailwind css beautifier, tailwind class deduplicator, tailwind responsive variant sorter, tailwind prettier alternative, tailwind group by category, tailwind flat output, tailwind grouped output
- **About section**: Expanded from 2 sentences to 4 paragraphs covering tool purpose, the class string entropy problem, how category sorting helps code reviews, and deduplication value
- **Features**: Expanded from 8 minimal items to 11 fully described items covering all controls (Sort/Group/Dedup/Multiline toggles, stats bar, variant support, Sample button)
- **howToUse**: Expanded from 1 paragraph to 6 structured paragraphs covering all options, flat vs grouped tabs, stats bar, Sample/Copy buttons, and 3 concrete use case walkthroughs
- **FAQs**: Expanded from 8 FAQs with 1-2 sentence answers to 11 FAQs with 3-5 sentence answers
- **Schema**: faqSchema and softwareSchema now derive from seoData (featureList and mainEntity) to avoid duplication; fixed declaration order so schemas come after seoData
- **OG/Twitter**: Updated descriptions to reflect full feature set


## 2026-04-20 — SEO paragraph rendering fix + content audit across all 39 tools

### SeoSection component (`src/components/SeoSection/index.js`)
- **Paragraph rendering**: `about.description` and `howToUse` were rendered inside a single `<p>` tag, making all `\n\n` paragraph breaks invisible. Rewrote to split on `\n\n` and render each block as a separate `<p>` tag via a `Paragraphs` helper component.
- **Inline markdown**: Added `renderInline` helper — `**bold**` renders as `<strong>`, `` `code` `` renders as a styled `<code>` element.
- **FAQ answers**: Same paragraph splitting applied to FAQ `a:` answers.
- **CSS**: Added `.inlineCode` style and paragraph bottom margin (`.seoP { margin-bottom: 14px }`) with `:last-child` reset. Added `.faqAP` for FAQ answer paragraphs.

### Build fixes (3 syntax errors)
- `base64-encoder-decoder/page.js`: Escaped backticks inside template literals (`` `data:[MIME type]...` ``, etc.)
- `css-to-tailwind/page.js`: Escaped `` `<div class="...">` `` and `` `<div className="...">` ``
- `regex-tester/page.js`: Escaped `` `string.replace(...)` `` and `$\`` references
- `svg-animation-generator/page.js`: Escaped `` `<style>` ``, `` `<img>` ``, `` `<animate>` ``, `` `<animateTransform>` ``, `` `<animateMotion>` ``

### Content fixes (paragraph structure)
- `image-to-base64/page.js`: Split `howToUse` from 1 wall of text into 4 logical paragraphs
- `qr-code-generator/page.js`: Split `howToUse` into 4 step-based paragraphs; split `about.description` from 1 wall into 4 paragraphs
- `src/app/page.js` (homepage): Updated "15 tools" to "39 tools"; expanded `about.description` from 1 sentence to 3 paragraphs listing all tool categories; updated features list

## 2026-04-20 — Internal linking + OG image audit

### OG image fixes
- `css-transform-generator.png` — file existed as `css-transform-genertor.png` (typo); copied with correct name
- `regex-tester.png` — file existed as `regex-tester tool.png` (space in filename); copied with correct name
- All other 37 OG image filenames verified correct

### Internal linking — "You Might Also Like"
- Created `src/lib/related-tools.js` — central map of 39 slug → [up to 4 related slugs]
- Updated `SeoSection` component: imports TOOLS registry + RELATED_TOOLS map; renders a `RelatedTools` section with clickable cards (icon + name + subtitle) using `next/link`
- "You Might Also Like" section positioned **above the H1** so it's the first thing in the SEO section
- Added `.relatedGrid`, `.relatedCard`, `.relatedIcon`, `.relatedName`, `.relatedSub` CSS — 4-col grid desktop, 2-col mobile
- Added `slug: 'xxx'` field to all 39 tool `page.js` SEO objects so SeoSection can look up relations

## 2026-04-20 — New Tool: Timestamp Converter

### Files created
- `src/components/TimestampConverterTool/index.js` — full React component
- `src/components/TimestampConverterTool/styles.module.css` — styles
- `src/app/timestamp-converter/page.js` — page with full SEO content
- `public/icons/timestamp-converter.svg` — clock SVG icon

### Features built
- **Live current time card** — shows Unix seconds, milliseconds, ISO 8601, updating every second with pulsing dot
- **Epoch → Date panel** — auto-detects precision (seconds/ms/µs), outputs: Unix sec, Unix ms, ISO 8601, UTC String, RFC 2822, Day of Week, Relative time, Local tz, Custom tz, UTC
- **Date → Epoch panel** — date + time inputs, outputs Unix sec, ms, ISO 8601, relative time
- **Searchable timezone picker** — type any city/zone name, filters Intl.supportedValuesOf('timeZone'), shows in Epoch→Date output
- **Quick Reference chips** — 8 clickable chips (Now, Today midnight, Yesterday, 1 week ago, 30 days ago, 1 year ago, Unix epoch, Y2K) that populate the Epoch→Date panel
- **Batch Converter** — textarea, one timestamp per line, auto-detects precision per line, outputs table with seconds/ISO/relative
- Accent colour: #06b6d4 (cyan)

### SEO content
- Title targets "Unix timestamp converter", "epoch to date", "epoch converter"
- 30 keywords including long-tail variants
- 3-paragraph about.description with bold formatting and backtick code
- 8-paragraph howToUse covering every feature
- 6 use cases: API debugging, log analysis, JWT inspection, timezone scheduling, database work, frontend dev
- 10 FAQ entries with rich answers: what is Unix timestamp, seconds vs ms, current time, JS conversion, ISO 8601, Unix epoch, Y2K38, batch converter, offline use, RFC 2822
- 3 schema blocks: FAQPage, SoftwareApplication, BreadcrumbList

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #06b6d4)
- Added to related-tools.js (related to jwt-decoder, hash-generator, json-formatter, etc.)
- Sitemap updated: 41 URLs
- Homepage tool count updated: 39 → 40

---

## 2026-04-20 — Code Screenshot Generator

### New tool: `/code-screenshot-generator`
Built a full-featured code screenshot tool (Carbon.now.sh alternative) — 100% client-side, no uploads.

### Features
- Custom syntax tokenizer for 22 languages (JS, TS, Python, HTML, CSS, JSON, SQL, Go, Rust, Java, C/C++/C#, Bash, PHP, Ruby, Swift, Kotlin, YAML, JSX/TSX, Plain Text)
- 9 themes: One Dark, Dracula, GitHub Dark, Monokai, Nord, Tokyo Night, GitHub Light, Solarized Dark, Night Owl
- Window chrome styles: macOS (traffic dots), Windows (title bar), Terminal, None
- 10 gradient presets + solid color picker for background
- Controls: font family (6 options), font size, padding, line numbers, line wrap, optional title
- Export: 1×/2×/3× PNG download + Copy to clipboard (ClipboardItem API)
- Gradient rendering in canvas export via SVG linearGradient
- Preview updates live as user edits code

### Files created
- `src/components/CodeScreenshotTool/index.js`
- `src/components/CodeScreenshotTool/styles.module.css`
- `src/app/code-screenshot-generator/page.js` (full SEO: 30 keywords, 12 FAQs, SoftwareApplication + FAQPage + BreadcrumbList schemas)
- `public/icons/code-screenshot-generator.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #6366f1, extended: false)
- Added to related-tools.js
- Sitemap updated: 43 URLs (42 tools + homepage)
- Timestamp Converter hydration fixes completed (useState(0), useEffect for nowMs/tzCustom, onClick={handleNow})

---

## 2026-04-20 — CSS Button Generator

### New tool: `/css-button-generator`
Built a full CSS button generator with 16 presets, 5 export formats, and live dual-background preview.

### Styles covered
- Gradient: Electric Blue, Sunset, Aurora
- Neon: Cyan, Pink (transparent bg + glow box-shadow)
- Glassmorphism: Glass, Frosted (rgba bg + backdrop-filter)
- Neumorphism: Soft Push (soft inset/outset shadows)
- Outlined / Pill Outline
- 3D: Depth, Retro Pop (layered box-shadow + translateY hover)
- Minimal, Ghost, Solid (Amber, Danger)

### Export formats
CSS, SCSS (with & nesting), HTML (full document), React JSX (useState hover), Tailwind classes

### Features
- Live preview on dark + light background simultaneously
- Full customization: bg type (solid/gradient), text, size, border, shadow, hover, transition, backdrop-filter
- Category filter tabs for presets
- One-click copy to clipboard per export tab

### Files created
- `src/components/CssButtonGeneratorTool/index.js`
- `src/components/CssButtonGeneratorTool/styles.module.css`
- `src/app/css-button-generator/page.js` (30 keywords, 12 FAQs, 3 schemas)
- `public/icons/css-button-generator.svg`

### Registry / routing
- Added to tools-registry.js (category: css, accent: #a855f7)
- Added to related-tools.js + linked from glassmorphism + box-shadow generators
- Sitemap updated: 44 URLs

---

## 2026-04-21 — New Tool: Cron Expression Builder

Added a full-featured visual cron expression builder — the first scheduling tool in the collection. Designed for backend developers who need to build, validate, and understand cron schedules without memorizing syntax.

### Features implemented
- **Visual field builder** — 5 separate field panels (Minute, Hour, Day-of-Month, Month, Day-of-Week), each with 4 modes: Every (`*`), Every N (`*/N`), Range (`A-B` and `A-B/N` with step toggle), and Specific (clickable chip grid with named values for Month and DOW)
- **Real-time human-readable description** — converts any expression to plain English ("Every 15 minutes", "At 9:00 AM, Monday through Friday") with a pre-computed map for common expressions and a generative fallback for arbitrary ones
- **Next 6 run times** — pure JS scheduler using Vixie cron semantics (OR logic when both DOM and DOW are non-wildcard); shows datetime + relative label ("in 3 hours")
- **16 common presets** — every-minute to yearly, weekdays, weekends, quarterly
- **@ alias support** — @hourly, @daily, @midnight, @weekly, @monthly, @yearly, @annually all auto-expand
- **Named month/DOW aliases** — JAN, FEB, MON, TUE etc. accepted in raw input
- **Syntax reference panel** — symbols (*, */N, A-B, A,B,C, A-B/N, ?) and field ranges
- **Field breakdown badges** — 5 coloured badges below the expression input showing each field's value with its label

### Files created
- `src/components/CronExpressionBuilderTool/index.js`
- `src/components/CronExpressionBuilderTool/styles.module.css`
- `src/app/cron-expression-builder/page.js` — metadata, 3 JSON-LD schemas, 1000+ word SEO content, 10 FAQs
- `public/icons/cron-expression-builder.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #f59e0b) — both primary and extended sections

---

## 2026-04-21 — New Tool: YAML ↔ JSON Converter

Added a bidirectional YAML ↔ JSON converter with auto-detection, syntax highlighting, and full YAML 1.2 support via js-yaml.

### Features implemented
- **Bidirectional conversion** — YAML → JSON and JSON → YAML; explicit direction toggle plus Auto mode that detects JSON by leading `{`/`[`
- **Syntax highlighting** — JSON output: keys (blue), strings (green), numbers (orange), booleans (purple), nulls (gray); YAML output: keys, scalar values, comments (italic), list markers, anchors (pink)
- **Sort keys** — recursively sorts all object keys alphabetically, useful for version-control diffs
- **Indent selector** — 2 or 4 spaces for both JSON pretty-print and YAML block indentation
- **Swap button** — copies output into input for round-trip testing
- **Copy & Download** — clipboard copy with ✓ feedback, download as `.json` or `.yaml`
- **Stats bar** — per-panel byte size, line count, total key count
- **Error bar** — red banner with YAML line number or JSON token info on parse failure
- **Samples** — realistic nested YAML (server config + database pool + features array) and JSON (users list + meta)
- **Line numbers** — on both input and output panels
- **js-yaml** dependency added to package.json (^4.1.1)

### Files created
- `src/components/YamlJsonConverterTool/index.js`
- `src/components/YamlJsonConverterTool/styles.module.css`
- `src/app/yaml-json-converter/page.js` — metadata, 3 JSON-LD schemas, 1000+ word SEO, 10 FAQs
- `public/icons/yaml-json-converter.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #10b981) — both primary and extended sections

---

## 2026-04-21 — New Tool: CSV ↔ JSON Converter

Added a bidirectional CSV ↔ JSON converter with RFC 4180 compliant parsing, type inference, and live table preview. Pure JS — no library dependency.

### Features implemented
- **RFC 4180 CSV parser** — pure JS, handles quoted fields with embedded commas/newlines, escaped double-quotes (`""`), all line ending styles
- **Auto-detect direction** — JSON detected by leading `[`/`{`, everything else treated as CSV
- **Type inference** — "42"→42, "true"→true, ""→null, auto-converts on CSV→JSON
- **Output modes** — Objects `[{}]` (array of objects with headers as keys) or Arrays `[[]]` (raw array of arrays)
- **Table Preview tab** — live HTML table with color-coded types: numbers (orange), booleans (purple), nulls (dash)
- **Delimiter support** — comma, semicolon, tab (TSV), pipe; auto-detect picks most frequent in first 2000 chars
- **Header row toggle** — use or skip first CSV row as column names
- **Quote all fields** option for strict RFC 4180 CSV output
- **Indent selector** — 2 or 4 spaces for JSON pretty-print
- **Copy + Download** — `.json` or `.csv` file download
- **Swap button** — copies output to input and flips direction for round-trip testing
- **Stats bar** — rows, columns, byte size per panel
- **JSON syntax highlighting** — keys, strings, numbers, booleans, nulls colored in output

### Files created
- `src/components/CsvJsonConverterTool/index.js`
- `src/components/CsvJsonConverterTool/styles.module.css`
- `src/app/csv-json-converter/page.js` — metadata, 3 JSON-LD schemas, 1000+ word SEO, 10 FAQs
- `public/icons/csv-json-converter.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #6366f1) — both primary and extended sections

---

## 2026-04-30 — YouTube Thumbnail Downloader

New tool: download YouTube thumbnails in all available resolutions from any YouTube URL.

### Features
- Paste any YouTube URL format: youtube.com/watch, youtu.be, /shorts/, /embed/, /live/, or bare 11-char video ID
- Shows 5 thumbnail resolutions: Max Res (1280×720), HQ (480×360), SD (640×480), MQ (320×180), Default (120×90)
- Auto-detects missing Max Resolution — YouTube returns a 120×90 placeholder when maxresdefault doesn't exist; tool checks naturalWidth and marks card as unavailable
- Download button: tries CORS proxy (corsproxy.io) first, falls back to opening in new tab (static export constraint)
- Copy URL button: copies direct img.youtube.com thumbnail URL to clipboard
- Open on YouTube link: lets user verify the video
- Hero card layout: maxresdefault spans full width, others in 2-column grid below
- Sample button loads Rick Astley video for demo

### Files created
- `src/components/YoutubeThumbnailDownloader/index.js`
- `src/components/YoutubeThumbnailDownloader/styles.module.css`
- `src/app/youtube-thumbnail-downloader/page.js` — metadata, 3 JSON-LD schemas, 1000+ word SEO, 10 FAQs
- `public/icons/youtube-thumbnail-downloader.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #ff4444) — first entry, extended: false

---

## 2026-04-30 — Freelance Invoice Generator

New tool: create, preview, and download professional freelance invoices as PDF.

### Features
- Two-column layout: form on left (scrollable), live invoice preview on right
- "Your Information": business name, email, phone, address, logo upload (any image → base64 FileReader)
- "Bill To": client name, email, multi-line address
- "Invoice Details": invoice number, issue/due dates, 10 currencies (USD/EUR/GBP/INR/CAD/AUD/JPY/CHF/SGD/AED)
- Accent color: 8 presets + full hex color picker; controls header stripe, table header, total row in both preview and PDF
- Unlimited line items: description, qty, rate → auto-calculated amount
- Tax (%) + Discount (% or fixed) with auto-calculated totals
- Notes and editable payment terms section
- Live invoice preview: A4-style white card with shadow, updates in real time
- PDF: opens a new window with inline-styled HTML, calls window.print() after 500ms — user selects "Save as PDF"
- Clear button resets all fields
- No server, no storage, 100% browser-based

### Files created
- `src/components/FreelanceInvoiceGenerator/index.js`
- `src/components/FreelanceInvoiceGenerator/styles.module.css`
- `src/app/freelance-invoice-generator/page.js` — metadata, 3 JSON-LD schemas, 1000+ word SEO, 10 FAQs
- `public/icons/freelance-invoice-generator.svg`

### Registry / routing
- Added to tools-registry.js (category: dev, accent: #6366f1) — extended: false

---

## 2026-04-30 - Mortgage Calculator

New tool: US-focused mortgage payment calculator for home buyers.

### Features
- Calculates estimated monthly mortgage payment with principal, interest, property tax, homeowners insurance, PMI, and HOA dues
- Supports down payment as dollar amount or percent of purchase price
- Supports property tax as annual percent or annual dollar amount
- Supports homeowners insurance as annual premium or monthly amount
- Automatically applies PMI when loan-to-value is above 80%
- Shows loan amount, down payment percent, loan-to-value, payoff date, total interest, and estimated total housing cost
- Includes first-year and annual-checkpoint amortization table

- Downloads full month-by-month amortization schedule as CSV
- Copies a clean payment summary for notes or lender discussions
- Saves the active scenario in local browser storage and includes a reset action

### Files created
- `src/components/MortgageCalculatorTool/index.js`
- `src/components/MortgageCalculatorTool/styles.module.css`
- `src/app/mortgage-calculator/page.js` - metadata, FAQ schema, SoftwareApplication schema, Breadcrumb schema, SEO content
- `public/icons/mortgage-calculator.svg`

### Registry / routing
- Added to `src/lib/tools-registry.js` (category: dev, accent: #22c55e) - extended: false
- Added related tools entry in `src/lib/related-tools.js`
- Updated homepage hardcoded tool count from 62 to 63

---

## 2026-04-30 - Image Compressor Settings Autosave

Updated the Image Compressor tool so the browser remembers compression preferences between visits.

### Changes
- Added localStorage autosave for output format, quality, resize mode, resize dimensions, and comparison slider position
- Restores saved settings when the tool loads
- Keeps uploaded image files and compressed blobs out of localStorage
- Added a small header status showing that settings are auto-saved
- Updated Image Compressor SEO text and FAQ to mention remembered browser settings

---

## 2026-04-30 - Mortgage Calculator OG Image SEO

Updated the Mortgage Calculator SEO image wiring.

### Changes
- Confirmed `public/images/mortgage-calculator.png` exists
- Centralized the mortgage calculator OG image URL in `src/app/mortgage-calculator/page.js`
- Reused the same image for Open Graph, Twitter card, and SoftwareApplication schema image

---

## 2026-04-30 - Mortgage Calculator Autosave Indicator

Updated the Mortgage Calculator tool to make browser autosave visible.

### Changes
- Added a green `Auto-saved` indicator to the top header bar
- Shows `Saving...` briefly after users edit mortgage inputs
- Keeps the existing localStorage scenario persistence for all loan, tax, insurance, PMI, HOA, and start-month fields
- Shows `Autosave blocked` if localStorage is unavailable

---

## 2026-04-30 - Rent vs Buy Calculator

New tool: US-focused rent versus buy calculator for home decision planning.

### Features
- Compares renting versus buying over a 1 to 40 year time horizon
- Rent scenario includes monthly rent, renters insurance, annual rent increases, and investment return
- Buy scenario includes home price, down payment, mortgage rate, loan term, property tax, homeowners insurance, HOA, and maintenance
- Assumptions include home appreciation, buying closing costs, selling costs, and investment return
- Shows whether renting or buying is ahead after the selected period
- Calculates estimated break-even year when buying starts to beat renting
- Shows owner net worth versus renter investment balance
- Includes year-by-year comparison table
- Autosaves all inputs to localStorage with a green header indicator
- Copy summary button for notes or planning conversations

### Files created
- `src/components/RentVsBuyCalculatorTool/index.js`
- `src/components/RentVsBuyCalculatorTool/styles.module.css`
- `src/app/rent-vs-buy-calculator/page.js` - metadata, OG/Twitter image tags, FAQ schema, SoftwareApplication schema, Breadcrumb schema, SEO content
- `public/icons/rent-vs-buy-calculator.svg`
- `public/images/rent-vs-buy-calculator.png` - generated OG thumbnail

### Registry / routing
- Added to `src/lib/tools-registry.js` (category: dev, accent: #14b8a6) - extended: false
- Added related tools entry in `src/lib/related-tools.js` and linked Mortgage Calculator back to it
- Updated homepage hardcoded tool count from 63 to 64





---

## 2026-05-02 - New Tool: CSS Autoprefixer

Created the CSS Autoprefixer tool for adding vendor prefixes with PostCSS Autoprefixer and Browserslist.

### Changes
- Added `src/components/CssAutoprefixerTool/` with browser target presets, custom Browserslist input, rejected browser rules, grid/flexbox prefix settings, output copy, and CSS download
- Added `src/app/css-autoprefixer/page.js` with metadata, OG/Twitter tags, SoftwareApplication schema, Breadcrumb schema, FAQ schema, H1/share SEO section, related tools, and 1000+ word SEO content
- Added `public/icons/css-autoprefixer.svg`
- Added `public/images/css-autoprefixer.png` at 1200x630 for Open Graph previews
- Registered the tool in `src/lib/tools-registry.js`, CSS category page data, related tools, and homepage count/content
- Fixed HomeGrid to render registry icon paths as images instead of showing `/icons/...svg` text in cards
- Escaped inline code backticks in the Autoprefixer SEO copy so the page compiles correctly

### Verification
- Confirmed `/` returns 200 locally
- Confirmed `/css-autoprefixer` returns 200 locally
- Confirmed `public/images/css-autoprefixer.png` serves from the local app
- Confirmed the registry reports 88 live tools and `css-autoprefixer` is live

### Follow-up polish
- Added a `Beautify generated CSS` option so Autoprefixer output is formatted by default
- Added a manual `Beautify output` action for edited/generated CSS
- Polished the code editor styling with better spacing, selection color, caret color, and scrollbars
- Moved all CSS Autoprefixer action buttons into the tool header
- Added synced line numbers and lightweight CSS syntax highlighting for both input and output editors
- Increased editor and control font sizes for better readability on desktop
- Added debounced automatic prefixing when users type in the input editor or change prefix settings
- Normalized CSS Autoprefixer typography to standard dense tool sizing: 13px controls/code, 12px labels/meta/buttons, and compact browser chips

---

## 2026-05-02 - New Tool: SIP Calculator

Created an India-focused SIP Calculator for mutual fund investment projections.

### Features
- Calculates SIP maturity value with monthly compounding
- Supports expected annual return, investment duration, annual step-up SIP, optional lump sum, and inflation assumptions
- Shows total invested amount, estimated gains, wealth multiple, and inflation-adjusted value
- Includes quick presets for common SIP amounts and return assumptions
- Adds year-by-year growth chart and annual projection table
- Supports copy summary and CSV export
- Autosaves inputs locally in the browser

### Files created
- `src/components/SipCalculatorTool/index.js`
- `src/components/SipCalculatorTool/styles.module.css`
- `src/app/sip-calculator/page.js`
- `public/icons/sip-calculator.svg`
- `public/images/sip-calculator.png`

### Registry / routing
- Added `sip-calculator` to `src/lib/tools-registry.js`
- Added related-tool links for SIP, Mortgage, and Rent vs Buy calculators
- Added SIP Calculator to the Miscellaneous Tools category
- Updated homepage count/content to match the current 91 live tools
- Added SVG use-case icon mappings for rupee and chart cards

### Verification
- Confirmed `/sip-calculator` returns 200 locally
- Confirmed `/` returns 200 locally
- Confirmed `/icons/sip-calculator.svg` and `/images/sip-calculator.png` serve locally
- Confirmed SIP page SEO source content is above 1000 words

### Follow-up polish
- Replaced the SIP year-by-year bar visual with a two-line SVG chart showing maturity value and total invested amount
- Added rich chart hover interactions: crosshair, active markers, and tooltip with year, maturity value, invested amount, gains, and monthly SIP

## 2026-05-03
- Added UK Take-Home Pay Calculator (`/uk-take-home-calculator`) — 2025/26 PAYE with income tax (England/Wales/NI and Scotland 6-band), National Insurance (8%/2%), pension % slider, student loan plans (Plan 1/2/4/Postgraduate), Blind Person's Allowance, personal allowance taper above £100K. Weekly/fortnightly/monthly output with stacked breakdown bar and detailed table. Updated tools-registry, related-tools, categories, and sitemap.

## 2026-05-03 — Bug fixes across three finance calculators

### Mortgage Calculator (`/mortgage-calculator`)
- Fixed SSR hydration bug: replaced `useState(() => { if (typeof window... })` initializer with `useState(DEFAULTS)` + `useEffect` localStorage load + `hydrated.current` ref guard
- Added Extra Monthly Payment field — reruns amortization with extra principal, shows green savings banner ("Extra $X/mo pays off Y months early and saves $Z interest")
- PMI removal estimate now shows actual calendar date (e.g. "Jun 2036") alongside the month number, pulled from the schedule row
- Amortization table: added "Show all / Collapse" toggle — was silently cutting off at 42 rows

### Monthly Investment Calculator (`/monthly-investment-calculator`)
- `copySummary` was recomputing `buildRows` — now uses memoized `rows`
- CSV download now includes Compare Balance column when compare mode is active
- Added `onTouchMove`/`onTouchEnd` to chart wrapper; `handleChartMove` reads `e.touches[0].clientX` — mobile users can now scrub the chart

### Compound Interest Calculator (`/compound-interest-calculator`)
- `copySummary` was calling `calculate(form)` directly — now uses memoized `calc`
- Added touch support to chart (same pattern as Monthly Investment)
- Slider zero-tick labels fixed: replaced `{sym}0` with `fmtShort(0, currency)` for correct rendering across all currencies
- Added per-year `realValue` (inflation-adjusted balance) to each row in `calculate`; rendered as new "Inflation-Adjusted" column in year-by-year table and CSV export

## 2026-05-04 — GST Calculator (India + Australia)

### GST Calculator (`/gst-calculator`)
- New tool supporting India and Australia GST calculations
- India: slabs 0%, 5%, 12%, 18%, 28% (source: cbic.gov.in); custom rate via slider
- Australia: flat 10% GST-free option and custom rate (source: ato.gov.au)
- Two modes: Add GST (net → gross) and Remove GST (gross → net)
- India supply-type toggle: intra-state (CGST + SGST split) vs inter-state (IGST)
- Hero result card, 3 metric cards (input, GST amount, output), CGST/SGST/IGST breakdown card (India only)
- Proportional breakdown bar and quick-reference table (amounts vary by country)
- Info box with official registration thresholds per country
- Auto-save to localStorage (`wdp-gst-calculator-v1`) with SSR-safe hydration guard
- Rates hardcoded as `COUNTRY_CONFIG` constants — India slabs stable since July 2017, Australia 10% since July 2000
- Files: `src/components/GstCalculatorTool/index.js`, `styles.module.css`, `src/app/gst-calculator/page.js`, `public/icons/gst-calculator.svg`, registry entry added

## 2026-05-04 — Unit Converter

### Unit Converter (`/unit-converter`)
- New tool covering 5 categories: Length (9 units), Weight (8 units), Temperature (3 units), Volume (12 units), Data Storage (11 units)
- Factor-based conversion: all units stored as `factor` (base units per 1 of this unit); convert = `(value × from.factor) / to.factor`
- Temperature handled separately with linear offset formula (°C ↔ °F ↔ K)
- Category tabs reset From/To to category defaults; swap button reverses direction and promotes result to input
- "All Conversions" table shows input value in every unit of the category simultaneously; From row and To row highlighted distinctly
- Formula row shows unit relationship (e.g. "1 m = 3.28084 ft") and Copy result button
- Data storage includes both SI decimal (KB/MB/GB/TB/PB = powers of 1000) and IEC binary (KiB/MiB/GiB/TiB = powers of 1024)
- Auto-save to localStorage (`wdp-unit-converter-v1`) with SSR-safe hydration guard
- Accent: #0ea5e9 (sky blue)
- Files: `src/components/UnitConverterTool/index.js`, `styles.module.css`, `src/app/unit-converter/page.js`, `public/icons/unit-converter.svg`, registry + related-tools entries added

## 2026-05-04 — Australia Take-Home Pay Calculator

### Australia Take-Home Pay Calculator (`/australia-take-home-calculator`)
- New tool covering Australia 2024-25 PAYG tax calculations
- Income tax: Stage 3 tax cuts (effective 1 July 2024) — 0%/16%/30%/37%/45% brackets
- Low Income Tax Offset (LITO): up to $700 offset, phases out $37,500–$66,667
- Medicare Levy: 2% of taxable income, shade-in exemption below $32,500
- Medicare Levy Surcharge: 1%–1.5% for income >$93k without private hospital cover
- HECS/HELP: 19-band repayment table from 1% ($54,435) to 10% ($157,024+)
- Superannuation: 11.5% employer rate (2024-25); "base + super" vs "package (incl. super)" toggle
- Extra salary sacrifice (pre-tax super) reduces taxable income and lowers Medicare levy
- Hero, 4 metric cards (income tax, Medicare, employer super, HECS/net), breakdown bar, detailed table
- Auto-save to localStorage (`wdp-au-takehome-v1`) with SSR-safe hydration guard
- Accent: #10b981 (emerald green)
- Related tools: cross-linked to uk-take-home-calculator and canada-take-home-calculator
- Files: `src/components/AustraliaTakeHomeCalculatorTool/index.js`, `styles.module.css`, `src/app/australia-take-home-calculator/page.js`, `public/icons/australia-take-home-calculator.svg`

## 2026-05-04 — Four new utility tools

### Date Calculator (`/date-calculator`)
- Three tabs: Date Difference (gap between two dates), Age Calculator (from birthdate to today), Add / Subtract (jump forward/backward from a date)
- Date Difference: total days, weeks+remainder, year/month/day breakdown, total hours
- Age Calculator: years/months/days, total days/weeks/hours, next birthday countdown, zodiac sign, birth day-of-week
- Add / Subtract: quick presets (Yesterday, ±1 week, ±30/90 days, ±1 year), shows result day name
- SSR-safe: today's date set in useEffect; all date state initialized to '' and restored client-side
- Auto-save to localStorage (`wdp-date-calculator-v1`)
- Accent: #f43f5e (rose) · category: productivity

### Number Base Converter (`/number-base-converter`)
- Converts between Binary, Octal, Decimal, Hexadecimal instantly as user types
- Switching input base re-converts current decimal to new base input
- Shows 8-bit binary (values 0-255) and 16-bit binary (0-65535) with grouping spaces
- Common values reference table (0, 1, 2, 4, 8, 10, 15, 16, 32, 64, 128, 255, 256, 512, 1024, 65535) — clickable to load
- Copy button per row; error message for invalid characters for selected base
- Accent: #7c3aed (violet) · category: dev

### HTML Entity Encoder / Decoder (`/html-entity-encoder`)
- Three encode modes: Minimal (&, <, >, ", '), Full (+ named/numeric for non-ASCII), Numeric (every char as &#decimal;)
- Decode: handles named entities, &#decimal;, &#xhex; — pure JS (no DOM dependency, SSR-safe)
- Swap button moves output to input for chaining
- Reference table of 15 common entities — clickable to load char into input
- Accent: #f59e0b (amber) · category: dev

### Line Utilities (`/line-utilities`)
- 16 operations across 3 groups: Sort (A-Z, Z-A, by length↑↓, numeric, shuffle, reverse), Filter (deduplicate exact/case-insensitive, remove blank lines), Transform (trim, lowercase, uppercase, number lines, add quotes, comma-separate)
- Stats bar on input: total lines, non-blank, unique count
- Swap button to chain operations (output → input)
- Accent: #14b8a6 (teal) · category: text

## 2026-05-16 — HTML Playground tool + light-mode fixes + Gist backup

### HTML Playground (`/html-playground`) — New Tool
- 35 lessons across 8 chapters: Document Structure, Basics, Text, Lists, Structure, Media, Forms, Tables
- Four demo types: `picker` (click options), `toggle` (layer formatting tags), `sandbox` (free-form HTML editor), `info` (code-only for Document chapter lessons that can't render inside an iframe)
- Live split pane: iframe preview left, syntax-highlighted code panel right; draggable divider
- Syntax highlighter: single-pass char-by-char tokenizer; tags orange, attributes blue, values green, punct/slash muted gray
- Changed-line flash animation when code updates (lines that differ from previous render pulse orange)
- Arrow-key navigation for picker demos; `key={activeLessonId}` on demo components forces remount on lesson change
- Quick Check challenges on 8 lessons (headings, formatting, links, id/class, block-inline, form-validation, table-spanning, details-summary)
- Confetti burst when completing last lesson in any chapter
- Sidebar: collapsible with vertical reopen tab using `writing-mode: vertical-rl`; progress bar + lesson counter
- Progress and current position saved to localStorage with `fwd-html-playground-*` prefix; completed lesson re-click resets progress from that point
- Files: `src/components/HtmlPlaygroundTool/index.js`, `lessons.js`, `styles.module.css`, `src/app/html-playground/page.js`, `changelog.js`, `updates/page.js`, `public/icons/html-playground.svg`

### Light-mode fixes (global)
- Sidebar: favNudge, totdLabel, totdCard, favGroupHeader — dark-gold rgba(161,120,0,...) in light mode; dark overrides restore amber
- Category pills: padding 5px 14px, border-radius 20px, border rgba(0,0,0,0.12); match home page style
- RouteLoader overlay: light-mode semi-transparent gray background; spinner uses indigo
- PDF tools (PdfToWordTool, PdfOcrTool): button and surface colors fixed for light mode
- CarouselBuilder: preview background fixed for light mode
- CSS Easing Generator: curve editor given min-height 240px to prevent compression on short viewports; bottom border added
- `--text3` in `:root` darkened from `#7b8299` → `#5e6578` for better contrast on light backgrounds

### GitHub Gist backup — FreelancerLocalTools (12 tools)
- Token, Gist ID stored in localStorage per-tool; 5s debounce sync
- Delete log: deleted IDs tracked with timestamps, pruned after 7 days, included in Gist payload so deleted items don't resurrect after sync
- Live state passed into sync function (inside `setRecords` updater) to avoid stale IndexedDB reads
- Header: circular-arrows manual sync button (visible when token set) + GitHub icon button with popover; only GitHub icon blinks during sync, no inline "syncing" text
- `mergeToolRecords(local, remote, deletedIds)` respects delete log to prevent ghost restores

### GitHub Gist backup — FreelanceInvoiceGenerator
- Same delete-log pattern (7-day TTL); custom styled confirm modal replaces `window.confirm` for delete action
- Template picker moved to top of left panel with label above and horizontal scroll strip below

### GitHub Gist backup — ResumeBuilder
- Auto-save now stamps `updatedAt: new Date().toISOString()` so bidirectional sync can resolve conflicts by timestamp
- Remote wins only if `remoteTime > localTime`; otherwise local is pushed to Gist

### BuyMeCoffee — returning visitor gate
- Banner now shown only to users who have been on the site for 24h+ since `firstToolAt`; new visitors never see it on first session

## 2026-05-16 — React Playground (`/react-playground/`)

### New Tool
- 25 lessons across 8 chapters: JSX Basics, Components, Props, State, Events, Lists & Conditionals, Hooks, Patterns
- Live code editor (textarea + line numbers + Tab key support) with 300ms debounced preview
- Iframe-based preview using React 18 + Babel standalone — no build step, all browser-side
- postMessage architecture: iframe loads CDN scripts once, code updates sent via message; srcdoc never resets on lesson change
- Babel preprocesses code to strip import/export statements before transform
- ErrorBoundary class component in iframe catches React runtime errors and surfaces them to parent via postMessage
- Picker demo type for variant comparison (e.g. three conditional rendering patterns side by side)
- All lessons editable; Reset button restores original lesson code; Copy button copies current editor content
- Progress + position saved to localStorage with `fwd-react-playground-*` prefix
- Sidebar auto-populated from LIVE_TOOLS (no manual sidebar edit needed)
- Accent: #61dafb (React cyan)
- Files: `src/components/ReactPlaygroundTool/index.js`, `lessons.js`, `styles.module.css`, `src/app/react-playground/page.js`, `changelog.js`, `updates/page.js`, `public/icons/react-playground.svg`
- Full SEO: 10 features, 6 howToUse steps, 6 useCases, 10 FAQs; FAQPage + SoftwareApplication + BreadcrumbList schemas; DisqusComments

## 2026-05-16 — React Playground enhancements

- JSX syntax highlighting overlay in editor — keywords purple, hooks blue, strings green, HTML tags orange, React components cyan, comments gray; scroll-synced pre behind transparent textarea
- Draggable split handle between editor and preview (25%–75% range)
- Quick Check challenges on 9 lessons (jsx-expressions, state-usestate, lists-map, hooks-useeffect, hooks-custom, perf-memo, advanced-usecontext, advanced-usereducer, async-data-fetching)
- Console panel — intercepts console.log/warn/error in iframe via postMessage; toggle button with log count badge; clears on each code run
- Confetti on chapter completion
- 6 new lessons: useMemo, useCallback, React.memo (Performance chapter), useContext, useReducer (Advanced Hooks), data fetching pattern (Data & Async) → total 31 lessons / 11 chapters
- Error line highlight — gutter line turns red at Babel-reported line number
- Download button — saves as [lesson-id].jsx
- Ctrl+Enter to force-run without waiting for debounce
- Dark mode sync — preview iframe background/text matches app theme via postMessage
- Lesson search — filters sidebar by title or chapter
- Share button — base64-encodes code into URL ?c= param; on load restores shared code
- Registry desc, page.js SEO, changelog, llms.txt all updated to reflect 31 lessons / 11 chapters

## 2026-05-17
### FreelancerLocalTools — left-panel edit, full-width record list
- Removed separate read-only detail pane from right side of all FreelancerLocalTools
- Clicking a record card now loads it into the left panel form for editing (same as Edit button did)
- Removed redundant Edit button from record cards — card click = edit
- Right panel now uses full width for record list (no contentGrid 2-column split)
- Both panels scroll independently (overflow-y: auto on each pane)
- Changelog + lastmod updated for freelance-expense-tracker first; other tools pending user sign-off

### New category page — /freelancer-tools/
- Added CATEGORIES entry in categories.js with 15 freelancer tool slugs, full about/useCases/FAQs/metadata
- Created src/app/freelancer-tools/page.js with full metadata/OG/Twitter tags
- Added 💼 Freelancer Tools to HomeGrid category nav

## 2026-05-21
### PlaygroundTopNav — scrollable top nav for all learn-to-code playgrounds
- Created `src/components/PlaygroundTopNav/index.js` — scrollable pill nav (identical pattern to FreelancerTopNav) listing all 17 playgrounds with their SVG icons
- Created `src/components/PlaygroundTopNav/styles.module.css` — same scroll-arrow + active-underline styling as FreelancerTopNav
- Added `<PlaygroundTopNav active="slug" />` as first child inside `<div className={s.wrap}>` in all 17 playground tool components: HtmlPlaygroundTool, CssPlaygroundTool, TailwindPlaygroundTool, ReactPlaygroundTool, JsPlaygroundTool, VuePlaygroundTool, NextjsPlaygroundTool, GsapPlaygroundTool, PythonPlaygroundTool, NodejsPlaygroundTool, SqlPlaygroundTool, MongoPlaygroundTool, ExpressPlaygroundTool, GraphQLPlaygroundTool, FirebasePlaygroundTool, RestApiBuilderTool, SeoPlaygroundTool

## 2026-06-08
### UI Snippets gallery — windowed pagination + live iframe previews in MoreInCategoryStrip
- `UiSnippetsGallery`: replaced cumulative "Load more" (`visible` state that only grows) with windowed pagination — `page` state, `shown = filtered.slice(page*PER_PAGE, ...)`, exactly 9 items rendered at a time; "Load previous" button now renders above the grid, "Load more" stays below; both scroll the grid into view on page change; `handleSearch`/clear now reset `page` to 0
- `MoreInCategoryStrip`: swapped static `<img>` thumbnails for live `<iframe srcDoc={buildSrcdoc(...)}>` previews (same scaled-iframe technique as the main gallery) so cards show real moving/interactive snippet frames instead of static screenshots

### MoreInCategoryStrip — drop redundant category badge; ui-snippets — promo replaces Related Tools strip
- `MoreInCategoryStrip`: removed the per-card category badge (redundant since the strip header already states "More <Category> Snippets"); title now left-aligned and fills the card body
- `AdSlot`: added optional `related` prop to override the default `RelatedStrip` content
- Created `LearnToCodePromo` (`src/components/LearnToCodePromo`) — single banner card linking to `/learn-to-code/`, titled "Learn Coding Visually"
- All three ui-snippets pages (`/ui-snippets/`, `/ui-snippets/mycode/`, `/ui-snippets/[slug]/`) now pass `<AdSlot related={<LearnToCodePromo />} />`, replacing the generic "Related Tools" strip with a promo for the Learn to Code playground hub

### Replaced banner promo with a card-strip of front-end playgrounds
- Removed `LearnToCodePromo` (single banner) — user wanted the same card-strip visual style as "Related Tools" instead
- Created `FrontendPlaygroundsStrip` (`src/components/FrontendPlaygroundsStrip`) — reuses the `.ymal*` strip styles/markup from `RelatedStrip`, hardcoded to the first 8 front-end coding playgrounds (HTML, JS, TypeScript, CSS, SCSS, Tailwind, React, Angular), titled "Front-End Coding Playgrounds", "See all" links to `/learn-to-code/`
- All three ui-snippets pages now pass `<AdSlot related={<FrontendPlaygroundsStrip />} />`

### FrontendPlaygroundsStrip — swapped TypeScript/Angular for Bootstrap/GSAP
- Updated `PLAYGROUND_SLUGS` to: HTML, JS, CSS, SCSS, Tailwind, Bootstrap, React, GSAP playgrounds

### FrontendPlaygroundsStrip — reorder list (HTML, CSS, JS, GSAP, then others)
- New order: HTML, CSS, JS, GSAP, SCSS, Tailwind, Bootstrap, React playgrounds

### UI Snippets editor — React CDN suggestion with JSX support
- Added a "React" quick-suggestion to the External Libraries CDN panel that adds React, ReactDOM, and @babel/standalone in one click
- `buildSrcdoc` now detects a Babel CDN URL and renders the JS panel's script tag as `type="text/babel" data-presets="react,env"`, so JSX written in the JS editor transpiles and runs in the live preview
- CDN suggestion buttons now support multi-URL entries (`urls: [...]`) alongside the existing single-`url` entries

### UI Snippets editor — copy button on CDN URL list items
- Added a small copy (⧉ → ✓ on click) button next to each entry in both the External Libraries and CSS Libraries CDN lists, copying the CDN URL to clipboard via `navigator.clipboard.writeText`
- New `copiedCdnUrl` state shows a brief checkmark confirmation (1.2s) per-URL; `.cdnCopyBtn` styles added in `UiSnippetsTool/styles.module.css`

### Freelance Dashboard — custom motivational quotes with enable/disable + sync
- Today's Focus quote is now backed by a manageable list: built-in `DAILY_QUOTES` seeded as toggleable items plus user-added custom quotes
- Added "✎ Manage" popover next to the quote — checkbox to enable/disable any quote (built-in or custom), input to add new quotes, remove button for custom ones
- Persisted via new IndexedDB key `focus_quotes_v1` (`flSaveQuotes`/`flLoadQuotes`, same `fd_focus_log_db`/`entries` store as clock zones) and included in the Gist sync snapshot (`fdGetLocalData`/`fdOnPullData` — `quotes` field)
- The displayed quote now cycles through only the *enabled* quotes (`activeQuotes`); falls back to all built-ins if the user disables everything
- The ✦ star blinks/pulses (`quoteStarBlink` keyframe animation) whenever the displayed quote text changes

### Hide nofollow/test (noindex) UI snippets from production discovery surfaces + sitemap
- Added `VISIBLE_SNIPPETS` export to `UiSnippetsTool/snippets.js` — `process.env.NODE_ENV === 'production' ? SNIPPETS.filter(sn => !sn.noindex) : SNIPPETS`; localhost/dev still shows everything, production hides `noindex: true` test snippets
- `UiSnippetsGallery`, `MoreInCategoryStrip`, the in-tool sidebar library list (`filteredLibrary`), and the in-tool category prev/next nav (`catSnippets`) in `UiSnippetsTool` now source from `VISIBLE_SNIPPETS`
- `[slug]/page.js` category metadata snippet `count` now uses `VISIBLE_SNIPPETS` so the SEO description matches what's actually listed; `generateStaticParams`/direct snippet lookup still use full `SNIPPETS` so noindex pages still build and remain reachable by direct URL (with `robots: noindex,nofollow`) on localhost
- `scripts/postbuild.js` now filters `SNIPPETS` to exclude `noindex: true` entries before generating `sitemap-ui-snippets*.xml` and `llms.txt`, so test/nofollow snippets are never listed in the sitemap or AI crawler manifest

### Freelance Dashboard — manual quote navigation, auto-rotation, longer star blink
- Added small ‹/› prev/next buttons (`.quoteNavBtns`/`.quoteNavBtn`) next to the Today's Focus quote so users can manually step through the active quote list
- Quote now auto-rotates every 15 seconds (paused while the manage popover is open) via `setInterval`
- Increased the ✦ star blink/pulse duration from 1s to 3s (`quoteStarBlink` keyframe + matching `setTimeout`) to make the change more noticeable on rotation

### Freelance Dashboard — compact quote controls moved into section header
- Moved the quote prev/next nav buttons and the "✎ Manage" button out of the quote text row and into the "Today's Focus" section header's top-right (`.sectionHeadRight`), alongside where "→ Today" appears on other days
- Shrunk `.quoteManageBtn` to match the 18px nav button size (`.quoteNavBtn`) for a more compact, consistent control cluster; new `.quoteControls` wrapper anchors the popover under the buttons

### UI Snippets editor — "dev" pill on not-live (noindex) snippets
- Library list items for snippets flagged `noindex: true` (nofollow/test snippets hidden from production via `VISIBLE_SNIPPETS`) now show a small amber "dev" pill next to the title, so they're easy to spot while browsing locally
- New `.devPill` style in `UiSnippetsTool/styles.module.css`

### Freelance Dashboard — auto-rotate slows down after manual quote navigation
- Clicking the ‹/› prev/next quote buttons now slows the auto-rotate cadence to 1 minute (instead of the usual 15 seconds) for 1 minute after the click, then it reverts back to 15-second rotation
- Implemented with a self-rescheduling `setTimeout` that checks elapsed time since the last manual click (`lastManualNavRef`) and a `navNonce` counter that restarts the schedule immediately on each click

### Freelance Dashboard SEO — documented custom motivational quotes feature
- Added an "about" paragraph, a `howToUse` step, a `features` bullet, and a FAQ entry to `freelance-dashboard/page.js` covering the new quote manager: enabling/disabling built-in quotes via checkbox, adding personal quotes, manual ‹ › navigation, 15s auto-rotation (slowing to 1 min after manual nav), the 3s ✦ pulse, and IndexedDB + Gist sync persistence

### UI Snippets — wrote SEO content and went live for the last 10 test snippets
- Removed `noindex: true` from all 10 most-recently-added snippets, taking them out of dev-only mode and into production indexing/sitemap/llms.txt via the existing `VISIBLE_SNIPPETS` filter: `scratch-card-reveal`, `signature-pad`, `qr-code-generator`, `audio-waveform-visualizer`, `sticky-cart-drawer`, `scroll-spy-nav`, `theme-palette-generator`, `drag-resize-panels`, `markdown-live-preview`, `confetti-celebration-card`
- Wrote a full `seo` block for each (title, description, about, howToUse steps, features, useCases, faqs — 800–1200+ words apiece) explaining the actual implementation techniques used in that snippet's source: canvas `destination-out` compositing + pixel sampling (scratch card), quadratic-curve stroke smoothing + stroke-array undo (signature pad), qrcode.js + debounced live rendering (QR generator), layered-sine-wave fake audio reactivity (waveform visualizer), `recalc()`-as-single-source-of-truth cart totals (cart drawer), IntersectionObserver + sliding transform indicator (scroll-spy nav), RGB↔HSL ramp generation (palette generator), clamped percentage-based split layout (drag-resize panels), escape-then-format regex markdown parsing (markdown preview), and an object-based gravity/spin/lifetime particle system (confetti card)
- Cross-linked related snippets naturally within each `about`/`useCases` section (e.g. signature-pad ↔ qr-code-generator ↔ confetti-celebration-card share canvas export/physics/animation-loop techniques) so the new pages interlink with the existing library instead of reading as isolated content

### UI Snippets — reverted the last 10 snippets back to dev-only (noindex)
- Re-added `noindex: true` to all 10 snippets that had just gone live (`scratch-card-reveal`, `signature-pad`, `qr-code-generator`, `audio-waveform-visualizer`, `sticky-cart-drawer`, `scroll-spy-nav`, `theme-palette-generator`, `drag-resize-panels`, `markdown-live-preview`, `confetti-celebration-card`) — back to nofollow/dev-only via `VISIBLE_SNIPPETS`, hidden from the sitemap and `llms.txt`, shown with the "dev" pill locally
- The full `seo` content blocks written for each remain in place untouched, ready to go live by removing `noindex: true` again whenever desired

### UI Snippets — rewrote about.description for 9 new snippets (GREAT content pass)
- Rewrote `seo.about.description` for all 9 recently-registered snippets (emoji-picker, image-magnifier, keyboard-shortcuts, password-generator, poll-widget, sparkline-chart, table-of-contents, tree-menu, video-player) in the "how it was built" narrative style matching the scroll-spy-nav reference
- Each description is 480–644 words with `**Bold Section Headers**`, `` `\`backtick code\`` `` formatting for identifiers/CSS properties, *italics* for emphasis, and 2–3 natural inline cross-links to other non-noindex snippets
- Fixed critical template-literal breakage across 5 files (image-magnifier, keyboard-shortcuts ×3, password-generator, poll-widget) caused by unescaped backticks inside JS template literal strings — repaired via character-scan CJS escape scripts
- Fixed accidental corruption of the TOC snippet's functional `replace(/\s+/g,'-')` heading-slug regex (introduced by a cosmetic SEO text fix attempt); restored correct double-backslash source form so the regex survives template-literal evaluation
- Fixed double-backslash `\\s+` (4 backslashes) in table-of-contents.js's description SEO text to correct 2 backslashes so the code-span renders as `\s+` (single backslash) for the reader

### 404 page — suppress Google ad
- No Google ad rendered when the 404 not-found page is shown
- Created `src/lib/not-found-state.js` — a module-level pub-sub flag using `useSyncExternalStore` so `not-found.js` and `RightPanel` can share state without needing a React context provider in the layout
- `not-found.js` sets the flag `true` on mount (and `false` on unmount via `useEffect` cleanup)
- `RightPanel` reads the flag via `useSyncExternalStore` and gates both the `<ins>` ad slot render and the `adsbygoogle.push()` call on `!isNotFoundPage`

### 2026-06-10 — 10 new UI snippets: SEO content, bug fixes, and go-live

**Snippets added and made live (noindex removed):**
- `date-range-picker` — two-month calendar range picker with hover preview, composedPath outside-click detection
- `swipe-cards` — Tinder-style drag/keyboard swipe with LIKE/NOPE stamps, snap-back threshold
- `activity-heatmap` — GitHub-style 52-week contribution grid with CSS grid, quartile color tiers, hover tooltips
- `spin-wheel` — Canvas fortune wheel with cubic ease-out physics and Web Audio API tick sounds
- `infinite-scroll` — IntersectionObserver sentinel with skeleton loaders, shimmer animation, fade-in cards
- `onboarding-tour` — Spotlight product tour via box-shadow overlay, dynamic tooltip positioning, keyboard support
- `bar-chart` — SVG animated bar chart with dataset toggle, y-axis grid lines, hover tooltips
- `ai-chat-interface` — ChatGPT-style two-panel layout with typing indicator, auto-grow textarea, suggested prompts
- `gauge-chart` — SVG semicircle speedometer with stroke-dashoffset arc fill, animated needle, color zones
- `glassmorphism-login` — Frosted glass card with animated blobs, floating labels, shake validation, success state

**Bug fixes applied:**
- `onboarding-tour`: Fixed double event listener registration (DOMContentLoaded + fallback both fired in srcdoc iframes); fixed tooltip positioning for full-height sidebar element by adding `placement: 'right'` and viewport clamping
- `glassmorphism-login`: Fixed card height — `.card-success` was `opacity:0` but still in layout flow (added `display:none` by default); removed erroneous `#field-password label { top: calc(50% - 10px) }` offset; fixed success fade-in transition via double-rAF pattern

**SEO updates:**
- All 10 snippets: updated useCases to 5–6 entries with 3–6 interlinks each (`/ui-snippets/{id}/` format)
- Fixed interlink URLs across all snippets (removed incorrect `/category/` prefix)
- Added search-intent keywords to titles and descriptions
- Expanded howToUse to 5–6 steps for gauge-chart and spin-wheel (were only 4)
- Updated ui-snippets listing page count: 175+ → 185+

## 2026-06-12 — UI Snippets SEO/CTR overhaul (all 195 snippet pages)

**SERP title/description rewrite (175 snippets):**
- Rewrote every `seo.title` over 60 chars (was 175 pages, many 90–108 chars truncated in Google) to ≤60 chars, keyword-first format: "Component — Free HTML CSS JS Snippet"
- Rewrote matching `seo.description`s to 140–160 chars (were 200–270, truncated/rewritten by Google), each keeping one snippet-specific technical detail + "Exports to React, Vue & Tailwind" CTR hook with varied phrasing
- Applied via codemod `scripts/apply-seo-rewrites.mjs` + map `scripts/seo-rewrites.mjs` (handles single/double quotes, CRLF)

**Multi-framework keyword coverage (20 snippets):**
- Added a unique "Can I use this in React, Vue, or Angular?" FAQ to the 20 snippets whose seo blocks never mentioned the framework exports (gauge-chart batch, qr-code-generator, virtual-scroll, etc.) — each answer includes a snippet-specific porting note (useEffect/onMounted/refs)
- Script: `scripts/add-framework-faqs.mjs`

**Other:**
- Metadata description fallback in `ui-snippets/[slug]/page.js` now mentions React/Vue/Angular/Tailwind export
- Audit tooling kept at `scripts/audit-snippet-seo.mjs` (checks title/description lengths + framework mentions) — current state: 0 violations across 195 snippets
- Home page: removed dead `newUpdatedTools`/`isNew` code, removed stuffed meta keywords, hero stats now show dynamic UI Snippets count + "Code Playgrounds", headline reordered to "web developers & freelancers"
- RightPanel hosting deal now points to Hostinger referral link
- postbuild.js no longer overwrites robots.txt — it flows from public/ via next build

## 2026-06-12
- Added 10 new high-quality UI snippets: notification-center, chip-filter, mega-menu, auto-resize-textarea, circular-steps, stacked-cards, css-animated-border, photo-gallery, parallax-hero, floating-dock
- All 10 snippets have full SEO content (1200+ words, seo: structure, SERP title ≤60 chars, description 140-160 chars with framework-export hook)
- Converted 4 existing snippet files from top-level `about:` key to correct `seo:` key with SERP title/description wrapper
- Registered all 10 new snippets in snippets.js — total snippet count now 205, 0 SEO audit violations

## 2026-06-16
- Added 10 new high-quality UI snippets (e-commerce / conversion theme): faceted-filter-sidebar, favorite-button (like), review-form, order-summary, variant-selector, order-tracking-timeline, add-to-cart-button, stock-urgency-bar, shipping-method-selector, loyalty-points-widget
- Each: plain HTML/CSS/vanilla JS, inline on* handlers + top-level fn declarations (export-safe), full `seo:` block (1200+ words, title ≤60, description 120–165 with framework-export hook, 6 howToUse steps, 8 features, 6 useCases with /ui-snippets/ interlinks, 5 FAQs incl. a React/Vue/Angular porting FAQ)
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 265 → 275; `scripts/audit-snippet-seo.mjs` shows 0 new violations
- Design fixes after preview review: favorite-button hearts swapped to clean symmetric Lucide heart path (old custom path was lopsided); faceted-filter-sidebar active colour swatch now shows a proper checkmark (dark on White swatch, white+shadow elsewhere) instead of the mix-blend-mode dot blob

## 2026-06-16 (batch 2)
- Added 10 more unique UI snippets across varied categories: pull-to-refresh (loaders), rotary-knob (forms), snackbar-undo (modals), image-accordion (layouts), funnel-chart (dashboards), country-selector (forms, searchable + flags), compare-bar (navigation, floating product compare tray), time-slot-picker (forms, booking grid), emoji-reaction-bar (buttons, FB-style), image-blur-up (loaders, progressive LQIP)
- Same standard as batch 1: vanilla HTML/CSS/JS, export-safe handlers, full seo: blocks (title ≤60, desc 120–165 with framework hook, 6 howToUse, 8 features, 6 interlinked useCases, 5 FAQs incl. framework porting)
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 275 → 285; audit shows 0 new violations, count matches array length

## 2026-06-17
- Added 10 more unique UI snippets: story-progress-bars (animations), slide-to-confirm (forms), currency-input (forms), coverflow-carousel (cards), realtime-line-chart (dashboards), waterfall-chart (dashboards), calculator (forms), social-share-bar (navigation), download-button (buttons), confirm-dialog (modals, type-to-confirm)
- Built export-safe given prior bugs: animations use transform/opacity or JS (rAF/SVG) rather than CSS `transition` on non-standard props (width/flex-grow/stroke-dashoffset) which collapse to a bare Tailwind `transition` utility and snap; gradients use literal/inline backgrounds or SVG gradients, never `background:var(--gradient)` (becomes `bg-[var()]` = background-color, drops for gradients)
- Verified: ran all 6 exporters × 10 snippets (60 runs) = 0 failures, 0 bg-[var] warnings; full SEO blocks, titles ≤60, descriptions 120–165
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 285 → 295; audit shows 0 new violations, count matches array length

## 2026-06-17 (batch 3)
- Added 10 more in-demand UI snippets: sticky-header-table (tables, frozen header+first column), stacked-bar-chart (dashboards), area-chart (dashboards, SVG Catmull-Rom + hover crosshair), logo-cloud (layouts, CSS-only trusted-by), ai-prompt-composer (forms, auto-grow + model picker + token counter), portfolio-filter-grid (layouts, isotope-style filter), profile-completion (dashboards, progress ring + weighted checklist), streak-tracker (dashboards, flame + 7-day check-in), referral-card (cards, copy link + milestone), gift-card (cards, masked code reveal+copy)
- Export-safe by construction: animations use transform/opacity/SVG/JS (no CSS transition on width/flex-grow/stroke-dashoffset); gradients literal/inline or SVG (no background:var(--gradient))
- Verified: 6 exporters × 10 = 60 runs, 0 failures, 0 bg-[var] warnings; full SEO (1200+ words, about 400+, 6 steps, 8 features, 6 interlinked use cases, 5 FAQs, title ≤60, desc 120–165)
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 295 → 305; audit shows 0 new violations, count matches array length

## 2026-06-18
- Added 10 more UI snippets (foundational/high-search-volume gaps in the library): gradient-button (buttons), 3d-button (buttons), custom-checkbox (forms), custom-radio (forms), custom-select (forms), neumorphism-card (cards), animated-underline (animations), css-hover-dropdown (navigation), cta-banner (heroes), password-toggle (forms)
- Same standard: vanilla HTML/CSS/JS, export-safe, full seo: blocks
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 305 → 315

## 2026-06-19
- Added 10 more UI snippets: pagination (navigation), animated-hamburger (buttons), textarea-counter (forms), file-input (forms), claymorphism-card (cards), status-avatar (cards), vertical-tabs (navigation), callout-box (cards), feature-list (cards), avatar-upload (forms)
- Same standard: vanilla HTML/CSS/JS, export-safe, full seo: blocks (1200+ words, title ≤60, desc 120–165, 6 howToUse steps, 8+ features, 6 interlinked useCases, 5 FAQs)
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 315 → 325; audit shows 0 violations, count matches array length

## 2026-06-20
- Found 7 fully-written snippet files on disk that were never imported into `snippets.js`: cascading-select (forms), candlestick-chart (dashboards), heatmap-matrix (dashboards), pin-pad (forms), step-progress (navigation), top-loading-bar (loaders), floating-action-btn (buttons) — each already had a complete `seo:` block and `export default`
- Registered all 7 in snippets.js; bumped SNIPPET_COUNT 325 → 332
- Audit found 4 of the 7 had over-length (170–185 char) `seo.description`s — trimmed cascading-select, candlestick-chart, heatmap-matrix, top-loading-bar to the 120–165 char range; 0 new violations from this batch (8 pre-existing violations on unrelated older snippets remain, untouched)

### floating-action-btn — fixed clipped radial menu + spacing
- The radial FAB menu fanned items both up *and* down from a bottom-right anchored button; downward items (4 & 5) got clipped off-screen near the bottom of the viewport. Changed the arc to fan only into the upper-left quadrant (0°–90°, never downward) so all 5 items stay visible regardless of scroll position.
- Increased the arc radius 70px → 140px so the 44px satellite buttons clear each other with a visible gap instead of overlapping along the tighter original radius.
- Updated the matching SEO `about` description and FAQ to describe the new arc math.

### candlestick-chart — fixed black-rendering React+Tailwind export (root-caused in css-to-tailwind converter)
- The chart's green/red colors come from a class picked at runtime (`var cls = up ? 'ck-up' : 'ck-down'`) and spliced into an `innerHTML` string — `ck-up`/`ck-down` never appear literally as `class="..."` in the JS source, so `collectJsHtmlClasses()` in `src/lib/snippet-exporters.js` couldn't detect them as JS-generated, converted their CSS rule to Tailwind utilities that never reach the runtime-created SVG elements, and dropped the color CSS entirely — same latent bug would silently break *any* snippet picking a class via a variable/ternary before injecting it.
- Fix: `collectJsHtmlClasses()` now also accepts the snippet's known CSS class names (via new `collectCssClassNames()`) and treats any of those names appearing as a standalone quoted string literal anywhere in the JS as dynamically-assigned too, so its original CSS is preserved as residual `<style>` instead of being (uselessly) converted. Verified directly: `.ck-up`/`.ck-down`/`.ck-cross` now land in the residual style block for both `toTailwindComponent` and `toTailwindHtml`.
- Also added `fill`/`stroke` to the CSS→Tailwind property map in `src/lib/css-to-tailwind.js` (previously unmapped, silently falling back to Tailwind's arbitrary-property syntax) so any *statically* class-based SVG fill/stroke color now converts to the proper `fill-*`/`stroke-*` utility instead of relying on the fallback.

## 2026-06-20 (batch 2) — 10 new UI snippets
- Added 10 new high-quality UI snippets: flight-search-form (forms, swap button + passenger stepper popover + date validation), address-autocomplete (forms, debounced search + highlighted matches + keyboard nav), seat-picker (forms, data-driven cinema seat map with tiered pricing), budget-tracker-card (dashboards, overall + per-category spend bars with over-budget warnings), live-currency-ticker (dashboards, seamless rAF marquee with simulated live price drift + flash-on-change), multiplayer-cursors (animations, eased simulated teammate cursors + real tracked self-cursor), notification-permission-prompt (modals, custom soft-ask before the native browser permission dialog), feedback-tab-widget (modals, rotated docked edge tab + slide-out mood/comment panel), onboarding-checklist-widget (cards, SVG progress ring + collapsible checklist + completion state), uptime-status-page (dashboards, 90-day per-service history bars + aggregated worst-status banner)
- Same standard: vanilla HTML/CSS/JS, export-safe (transform/opacity-only transitions, no `background:var(--gradient)`), full `seo:` blocks (about 400+ words, 6 howToUse steps, 8 features, 6 interlinked useCases, 5 FAQs incl. framework porting, title ≤60 chars, description 120–165 chars)
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 332 → 342; audit shows 0 new violations; verified no duplicate snippet ids across all 342 files

## 2026-06-21 — 10 more new UI snippets
- Added 10 new high-quality UI snippets: magic-link-login (forms, passwordless email sign-in + resend cooldown timer), voice-memo-recorder (forms, two-phase live/frozen waveform + record/play/discard), split-payment-calculator (forms, tip presets + people stepper + validated uneven split), form-autosave-indicator (forms, four-state debounced save status + error-retry + leave-page guard), image-reorder-grid (layouts, native HTML5 drag-and-drop with a position-derived cover photo), priority-matrix-board (layouts, 2×2 Eisenhower matrix with draggable tasks across four drop zones), resizable-columns-table (tables, drag-to-resize column handles + double-click auto-fit), team-presence-list (cards, Slack-style status-sorted roster + live search), social-proof-popup (modals, rotating purchase-notification toast with a session-persistent dismiss), live-visitor-counter (dashboards, random-walk live count with irregular timing + CSS ping dot)
- Same standard: vanilla HTML/CSS/JS, export-safe, full `seo:` blocks (about 400+ words, 6 howToUse steps, 8 features, 6 interlinked useCases, 5 FAQs incl. framework porting, title ≤60 chars, description 120–165 chars)
- Caught and fixed a real syntax error before registering: an unescaped apostrophe inside a single-quoted JS string in resizable-columns-table.js's howToUse step ('Drag a column's right edge') — verified with `node --check` on every new file this batch, not just a visual read
- Trimmed 3 over-length (172–174 char) seo.descriptions (form-autosave-indicator, team-presence-list, social-proof-popup) caught by the audit script before registering
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 342 → 352; audit shows 0 new violations; verified no duplicate snippet ids and import-count/array-length both equal 352

## 2026-06-22 — dev-mode flag + export-converter bug fixes (Tailwind border-color, Vue/Angular transitive deps)
- Marked all 20 most-recently-added snippets `noindex: true` (dev mode, localhost-only) per request: flight-search-form, address-autocomplete, seat-picker, budget-tracker-card, live-currency-ticker, multiplayer-cursors, notification-permission-prompt, feedback-tab-widget, onboarding-checklist-widget, uptime-status-page, magic-link-login, voice-memo-recorder, split-payment-calculator, form-autosave-indicator, image-reorder-grid, priority-matrix-board, resizable-columns-table, team-presence-list, social-proof-popup, live-visitor-counter. Bumped SNIPPET_COUNT 352 → 332 to match the now-smaller indexed count (dev-time consistency check confirms). Sitemap/llms.txt generator (`scripts/postbuild.js`) already filters `!sn.noindex`, so no further change needed there.
- SEO-audited all 20: basic audit (title/desc length, framework FAQ) was already clean; a deeper check against this project's stated bar (about.description ≥400 words, 6 howToUse steps, 8 features, 6 useCases, 5 FAQs) found 16/20 short on about-description word count (344–399 words) — added one focused extra paragraph to each, all now ≥400 words and 0 flags across every metric.
- **Real bug found and fixed in `src/lib/css-to-tailwind.js`**: the directional border shorthand converters (`border-top`/`-right`/`-bottom`/`-left`) only ever extracted *width*, silently dropping color entirely — `border-top: 3px solid var(--c)` (priority-matrix-board's quadrant accent borders) became a bare `border-t` with no color utility. The generic `border` converter had a related bug: its regex required an *integer* pixel width, so decimal widths like `1.5px` (used throughout this codebase's own snippets, e.g. `border: 1.5px solid #e2e8f0`) failed to match and also silently dropped color. Added a shared `parseBorderShorthand()`/`borderSide()` helper handling decimal widths and color (including `var(...)` custom properties) consistently across all five border converters. Verified directly: `.pmb-quad{border-top:3px solid var(--c)}` now correctly produces `border-t-[3px] border-t-[var(--c)]`.
- **Real bug found and fixed in `src/lib/snippet-exporters.js`** (`analyzeVanillaJs`, shared by `toVueSfc` and `toAngularComponent`): the vanilla-JS-to-Vue/Angular analyzer correctly defers `var x = document.querySelector(...)`-style DOM queries into `onMounted`, but didn't trace *transitive* dependencies — a later statement like `var total = tasks.length;` (depends on the deferred `tasks`) or `var bots = NAMES.map(p => ({ el: makeCursor(p) }))` (depends on `makeCursor()`, which internally touches a deferred DOM ref) got hoisted to run *immediately*, before their dependency existed, throwing `Cannot read properties of undefined`. Reproduced live in onboarding-checklist-widget (`tasks.length` crash + the completion banner staying visible since `updateProgress()` never ran) and multiplayer-cursors (`stage.appendChild` crash). Fixed by tracking a `deferredVars` set and checking each subsequent single-declarator initializer for a reference to a deferred var or a locally-defined function name (conservatively deferring it too, in the same relative order) — while explicitly leaving multi-declarator statements (`var a = x, b = y;`) untouched to avoid mis-splitting them.
- Verified all fixes with Playwright (already present in node_modules) rendering the actual exported code through harnesses matching `buildReactPreview`/`buildVuePreview` exactly (comment/import stripping, Babel transform, Vue `createApp`) rather than guessing from screenshots — caught that an apparent "seat-picker colors all premium" and "onboarding banner not showing in Tailwind" report were both stale-cache false alarms (computed colors and DOM state were already correct pre-fix); the Vue crashes were the one real bug class, now fixed and reproduced as fixed (0 console errors, correct end-state) in both onboarding-checklist-widget and multiplayer-cursors.
- Reverted the dev-mode flag minutes later per follow-up request — removed `noindex: true` from all 20 files, restoring `SNIPPET_COUNT` 332 → 352. All 20 are now fully live/indexed/followed; verified 0 `noindex` flags remain, 352/352 count consistency, and 0 new audit violations.

## 2026-06-22 (batch 2) — 10 new in-demand UI snippets with search-intent SEO
- Added 10 new high-demand snippets filling real gaps in the library: language-switcher (navigation — searchable locale dropdown w/ flags + native names + keyboard nav), timezone-converter (dashboards — meeting-planner slider across world cities w/ day-shift + working-hours), exit-intent-popup (modals — top-edge mouseout detection + fire-once + email capture), product-quick-view (modals — e-commerce gallery + variants + out-of-stock + add-to-cart), promo-code-input (forms — percent/fixed/free-shipping coupons + live total), free-shipping-bar (dashboards — "$X away" threshold progress), conditional-form-fields (forms — show/hide branches w/ visibility-scoped validation + grid 0fr→1fr reveal), availability-scheduler (forms — drag-to-paint weekly time grid), size-guide-modal (modals — in/cm toggle + measurement→size finder), quota-usage-meter (dashboards — per-resource plan limits w/ tiered warnings + worst-resource badge + upgrade nudge)
- Search-intent SEO content as requested: each `seo.about` written from the user's actual problem/query angle (e.g. "what time is the 9am SF call in Tokyo?", apparel return-reduction, cart-abandonment). Full standard met on all 10 — verified via deep audit: about 439–546 words, title ≤60, description 120–165, 6 howToUse steps, 8 features, 6 useCases with ≥3 `/ui-snippets/` interlinks, 5 FAQs incl. framework porting. Trimmed 2 over-length descriptions (exit-intent, promo-code) and added a 3rd interlink to timezone-converter after the audit flagged them.
- Proactively applied the `[hidden]` CSS-specificity fix learned earlier this session: author `display:flex` beats the UA `[hidden]{display:none}` rule (author origin wins regardless of specificity), so 4 flex elements that start hidden would have wrongly shown — added `.eip-success[hidden]`, `.pci-line[hidden]`, `.pci-form[hidden]`, `.pci-applied[hidden]`, `.qum-upgrade[hidden]` overrides. Verified live via Playwright: initial hidden states correct, and the promo-code apply-flow (SAVE20 → chip shows, form hides, total $240→$200) works end-to-end.
- Caught + fixed one real syntax bug pre-registration: `\\'` (double-backslash apostrophe) in two language-switcher FAQ single-quoted strings → corrected to `\'`. Verified all 6 export formats (HTML/Tailwind/React/React+Tailwind/Vue/Angular) generate syntax-valid code for all 10 with no analyzer crash (confirming this session's border-color + transitive-dependency exporter fixes hold).
- Registered all 10 in snippets.js; bumped SNIPPET_COUNT 352 → 362; verified import-count/array-length both 362, no duplicate ids, 0 new SEO-audit violations.

## 2026-06-22 (batch 3) — 10 more new UI snippets (dev mode)
- Added 10 new in-demand snippets, all `noindex: true` (dev mode) per request: password-requirements-checklist (forms — live ✓/✗ rules + strength meter + show/hide), animated-success-checkmark (animations — SVG stroke-draw tick + pulse ring + replay), add-to-calendar-button (buttons — Google/Outlook/Office365/Yahoo links + .ics download), radio-card-group (forms — selectable option cards on native radios), helpful-feedback-widget (cards — "Was this helpful?" yes/no → reason tags + comment), faq-search-accordion (layouts — live-filtered FAQ w/ XSS-safe highlight + context-aware expand), color-mode-toggle (buttons — light/dark/system w/ live OS-follow), donation-amount-picker (forms — preset+custom amounts, once/monthly, impact messaging), data-table-column-toggle (tables — show/hide columns picker w/ locked column), waitlist-signup (forms — email capture + queue position + referral link)
- Also flagged the previous batch (the 10 from batch 2: language-switcher … quota-usage-meter) as `noindex: true` per the same request. SNIPPET_COUNT set to 352 (372 registered − 20 noindex).
- Same quality standard met on all 10: search-intent SEO, about 483–551 words, title ≤60, desc 120–165, 6 steps, 8 features, 6 useCases w/ ≥3 interlinks, 5 FAQs incl. framework porting. Caught + fixed pre-registration: a `\\'` escape bug in two color-mode-toggle FAQs; and proactively applied the `[hidden]` specificity override to `.hfw-ask`/`.hfw-thanks` (flex elements toggled hidden by JS) via a node-based id/var→class resolver scan.
- Verified all 5 framework exports (React/React+Tailwind/Vue/Angular/Tailwind-HTML) generate syntax-valid code for all 10; registry consistent at 372/372, 20 noindex, indexed count 352 = SNIPPET_COUNT, no duplicate ids, 0 new audit violations.

## 2026-06-22 (batch 4) — 10 more new UI snippets (dev mode)
- Added 10 new in-demand snippets, all `noindex: true` (dev mode) per request: multi-email-input (forms — recipient chips, per-email validation, paste-split, dedupe), otp-verification (forms — 6-box 2FA w/ auto-advance, paste-fill, auto-submit, error shake, resend cooldown), spotlight-card (cards — cursor-following radial glow + masked illuminated border via CSS vars), profile-dropdown (navigation — avatar account menu w/ keyboard nav + focus return), expandable-search (navigation — icon→input width-transition expand + "/" shortcut + collapse-when-empty), stat-comparison-card (dashboards — KPI value + period-over-period delta + inline SVG sparkline), activity-rings (dashboards — Apple-style concentric SVG goal rings w/ draw-on animation), fly-to-cart-button (buttons — Web Animations API product-clone flight + count bump on arrival), share-modal (modals — 8 social share targets + copy link + native Web Share fallback), bulk-actions-bar (tables — Set-backed row selection + contextual floating bar + tri-state select-all)
- Same standard met on all 10: about 491–540 words, title ≤60, desc 120–165, 6 steps, 8 features, 6 useCases w/ ≥3 interlinks, 5 FAQs incl. framework porting.
- Caught + fixed pre-registration via the syntax/scan pipeline: two nested-backtick bugs in JS template-literal comments (multi-email-input, bulk-actions-bar — `\`x\`` closed the literal early), two `\\'` apostrophe-escape bugs (color-mode earlier pattern recurred in share-modal + activity-rings features array), and proactively applied the `[hidden]` override to `.ftc-count` (fly-to-cart badge, flex + JS-toggled hidden) via the node id/var→class resolver scan.
- Verified all 5 framework exports generate syntax-valid code for all 10. Live-server Playwright checks: fly-to-cart count badge correctly hidden initially (the `[hidden]` fix), and bulk-actions bar correctly hidden until selection then shows with count. Registry consistent at 382/382, 30 noindex, indexed 352 = SNIPPET_COUNT, no duplicate ids, 0 new audit violations.

## 2026-06-23 (batch 5) — 10 more new UI snippets (dev mode)
- Added 10 new in-demand snippets, all `noindex: true` (dev mode): social-login-buttons (buttons — branded Google/Apple/GitHub OAuth buttons w/ loading states + email fallback), input-mask (forms — extract-then-reformat masks for phone/card/expiry/date/currency via data-mask), tree-table (tables — recursive flatten + ancestor-aware visibility for hierarchical rows), recently-viewed-carousel (cards — native scroll-snap product strip w/ edge-aware arrow paging), integration-cards (cards — connect/disconnect app grid w/ whole-card state + filter), video-modal (modals — lazy inject-on-open / remove-on-close iframe so video stops), notification-preferences (forms — event×channel toggle matrix w/ JSON-snapshot dirty gate + ARIA switches), animated-error-state (animations — SVG stroke-draw error cross + shake, success-checkmark counterpart), avatar-stack-tooltip (cards — overlapping avatars w/ pure-CSS hover cards + "+N more"), page-dots-nav (navigation — IntersectionObserver section dots w/ scroll-snap + expanding active dot)
- Same standard met on all 10: about 493–542 words, title ≤60, desc 120–165, 6 steps, 8 features, 6 useCases w/ ≥3 interlinks, 5 FAQs incl. framework porting.
- Caught + fixed pre-registration via the syntax/scan pipeline: three `\\'` apostrophe-escape bugs (social-login-buttons, recently-viewed-carousel) and two stray `' },` after backtick text values in features/useCases (social-login-buttons, avatar-stack-tooltip). Hidden+flex scan came back clean (no `[hidden]` overrides needed this batch). Fixed 4 audit flags after the deep check: 3 added a 3rd interlink (input-mask, video-modal, notification-preferences), 1 trimmed an over-length desc (page-dots-nav).
- Verified all 5 framework exports generate syntax-valid code for all 10. Live-server Playwright: notification-preferences dirty-gate (Save disabled→enabled on toggle) and tree-table ancestor-aware collapse (11→5 visible when collapsing the top row) both confirmed. Registry consistent at 392/392, 40 noindex, indexed 352 = SNIPPET_COUNT, no duplicate ids, 0 new audit violations.

## 2026-06-21 — CodePen-style "Embed" feature for UI Snippets (library snippets only)
- New static route `src/app/ui-snippets/[slug]/embed/page.js` — chrome-free page showing only the live iframe preview (srcDoc, sandbox="allow-scripts") plus a floating "View/Edit Code" badge linking back to the canonical `/ui-snippets/[slug]/` page. `generateStaticParams` mirrors the canonical page's full `SNIPPETS` list (static export — no dynamic server route possible); `generateMetadata` sets `robots: { index: false, follow: false }` so the bare iframe target is never indexed. Added `Disallow: /ui-snippets/*/embed/` to `public/robots.txt` as a belt-and-suspenders measure.
- Extracted `buildPreviewSrcdoc`/`CONSOLE_BRIDGE` out of `ExportTester.js` into a new shared `src/lib/snippet-preview.js` so the embed page and the in-app live editor render a snippet identically without duplicating the srcdoc builder.
- New `src/lib/is-embed-route.js` (`isEmbedRoute(pathname)`) and matching gates added to `Sidebar`, `Footer` (converted to a client component), `RightPanel`, and `ToolNudge` — all return `null` on the embed route so the embedded iframe shows zero site chrome (Next.js's single root layout always wraps every route, so this pathname-gate pattern, already used for the 404-page ad suppression, was the only way to get a chrome-free page).
- New shared `src/components/UiSnippetsTool/EmbedModal.js` — a modal with a live iframe preview of the embed itself, the `<iframe>` code in a read-only textarea, and a copy button. Wired into two places, both gated to library snippets only (never MyCode/custom snippets, which have no canonical slug to embed):
  - The canonical snippet page via a new `EmbedButton.js` next to the screenshot heading.
  - The in-app Export dropdown (`UiSnippetsTool/index.js`) — added an "Embed" entry to `exportOptions`, conditionally spread in only `!activeIsCustom`.
- Verified all 12 touched/new files parse correctly via `@babel/parser` (JSX-aware; plain `node --check` can't parse JSX and was used only as a first pass, which caught one real bug: a stray leftover `}` in `ExportTester.js` from the extraction). Re-ran the snippet SEO audit and import/array-count check afterward — still 352/352, 0 new violations, confirming the snippet registry itself was untouched by this work.

## 2026-06-25 — Home hero visual polish (CSS-only)
- Improved the home page hero in `src/app/page.module.css` without touching content/JSX or markup. All changes are progressive enhancements gated by `prefers-reduced-motion`.
- Added a subtle radial dot-grid texture (`.hero::before`, 22px grid, top-fade mask) behind the hero content for depth; content stays above via existing `heroInner`/`heroSnippets` z-index.
- Animated the three decorative orbs with a slow drifting `orbFloat` keyframe (different durations/directions per orb) instead of static blobs.
- Staggered entrance: `heroRise` fade-up applied to badge → title → tagline → stats → CTAs → bottom (and the profile card), with cubic-bezier easing and per-element delays.
- Title gradient now uses a 4-stop loop with a slow `titleShimmer` background-position animation.
- Stats grid: numbers switched to an accent→indigo gradient text fill, added a subtle hover background per cell.
- Primary CTA: gradient fill (accent→indigo), accent-tinted drop shadow, stronger lift + brightness on hover.

## 2026-06-25 (b) — Home hero redesigned to 50/50 split layout
- Reworked the hero into a full-width two-column split with a vertical divider (`heroRight` `border-left`), per a provided design ref. Left half = product pitch (badge/title/tagline/stats/CTAs/share, unchanged content); right half = personal/freelance pitch.
- Right half is itself a `1fr / minmax(220px,300px)` grid: text block (Available-for-work badge, "Hi, I'm Puneet Sharma" headline with name on its own line, "Frontend Dev & UI Engineer" in a blue→indigo→purple gradient, description, Upwork/portfolio/email buttons, an "Open to work" dot indicator) + a large bottom-aligned photo column.
- Replaced the old small boxed profile card + 108×128 cropped headshot with the new full-body `puneet.webp` (380×550) rendered large (max 300px) on a soft rounded gradient panel (`profilePhotoCol::before`) that bleeds to the hero's right edge; "15+ yrs experience" pill floats top-right over the panel.
- Padding moved from `heroInner` into the individual columns so the divider runs full height; both columns vertically centered, photo bottom-aligned. Removed now-unused `.profileCard/.profileTop/.profilePhotoWrap/.profileInfo/.profileOpenTag` rules.
- Responsive: ≤1024 tightens column padding + photo width; ≤768 stacks to one column (divider becomes a top border, photo centered under text); ≤560 adjusts paddings. Kept the earlier entrance/orb/shimmer animations and `prefers-reduced-motion` guards.

## 2026-07-01 — UI Snippets: crawlable internal links to detail pages

- SEO fix: the interactive `/ui-snippets` gallery navigated to detail pages via `<button onClick={router.push()}>`, so crawlers saw no `href` and the highest-authority gallery page passed zero internal link equity to the 442 `/ui-snippets/[slug]` detail pages (they were only discoverable via the sitemap).
- Converted the sidebar snippet list items in `UiSnippetsTool/index.js` from `<button>` to Next `<Link href={/ui-snippets/${sn.id}/} scroll={false}>`; kept SPA behaviour + `navStart()` + mobile sidebar close in `onClick`. Real anchors now, same UX.
- Converted the preview-header category nav (all-in-category / next / prev) to `<Link>` too; prev/next fall back to a disabled `<button>` when there is no target (Links can't be disabled).
- Added `text-decoration: none` to `.snippetItem` and `.navBtn` in `styles.module.css` so the anchors render identically to the old buttons (no inherited underline).

## 2026-07-01 (2) — UI Snippets gallery: crawlable cards, filters & pagination

- Extended the internal-linking SEO fix to the `UiSnippetsGallery` grid (the `/ui-snippets/` and `/ui-snippets/{cat}/` card view), which had the same `<div onClick={router.push}>` / `<button onClick>` problem — no crawlable hrefs.
- Cards: converted from a clickable `<div>` to `<article>` + stretched-link pattern — the `<h3>` title is now a real `<Link href={/ui-snippets/${sn.id}/}>` with a `.cardLink::after` overlay (position:absolute, inset:0) making the whole card clickable. Avoids nesting the preview `<iframe>` inside an `<a>` (invalid HTML) while giving crawlers a real anchor with the snippet title as anchor text.
- Category filter tabs: `<button onClick={handleCategory}>` → `<Link href>` (`all` → `/ui-snippets/`, else `/ui-snippets/{id}/`); removed now-unused `handleCategory`.
- Pagination: Prev/Next/number `<button>`s → `<Link href={pageHref(p)}>` with `onClick preventDefault + goToPage` to keep the smooth-scroll SPA behaviour; added `pageHref()` mirroring the existing `?page=N` scheme (page 1 stays clean). Disabled Prev/Next fall back to disabled `<button>`. Added `rel="prev"`/`rel="next"`.
- CSS: `.card` now `position: relative`; added `.cardLink` (+ `::after` overlay); added `text-decoration: none` to `.cardLink`, `.filterBtn`, `.pageNum`, `.pageNav` so anchors render identically to the old buttons.

## 2026-07-02 — Home hero: Blog link

- Added a "Blog" secondary CTA (`/blog/`) to the home-page hero CTA row in `src/app/page.js`, alongside View UI Snippets / Learn to Code / Freelancer Tools / Browse tools. Reused the existing `.ctaSecondary` class — no CSS change.

## 2026-07-02 (2) — Mesh Gradient Generator: major SEO content expansion

- Rewrote `src/app/mesh-gradient-generator/page.js` SEO from the legacy flat props to the full `SeoSection` `sections` API to unlock richer content types (tables, callouts, multiple deep-dive text blocks). Reader-facing content grew from ~900 to ~2,500 words.
- Added: expanded About deep-dive (with `##` subheads on export formats + why designers use mesh), a "Mesh vs Linear/Radial/Conic" comparison table, expanded Features (14), 8-step How to Use, an "SVG vs PNG vs CSS export" decision table, a technical "How mesh gradients work (feGaussianBlur/overlap/spread)" section, a "Design tips (color harmony, text contrast, blob count, theme matching)" section, two callouts (pro tip + performance/accessibility note), 9 use-case cards, and 6 new FAQs (→14 total, all mirrored into FAQPage JSON-LD).
- Added subtitle, expanded meta description, natural interlinks to /gradient-generator, /color-palette-generator, /glassmorphism-generator, /image-compressor, /og-image-generator (all verified to exist).
- Kept SoftwareApplication + Breadcrumb + FAQPage schema. FAQ section reuses the same `faqs` array derived from faqSchema so schema and on-page stay in sync.
- Follow-up: converted the two deep-dive text sections ("How Mesh Gradients Work", "Design Tips") from flat `##`-subheading prose into intro line + 2-column `cards` grids (4 cards each, icons + inline code/links preserved) for a stronger card-like visual structure; set `quickFacts:false` on those intros so the browser/free chips only show on the main About.
- Reverted that card-grid split: the two deep-dive sections are single text blocks again (with `##` subheadings), now wrapped in a staged surface panel via a new reusable `boxed` option on `TextSection` (`.boxedText` = --surface bg + --border + --radius + padding), matching the site's existing panel/card look.

## 2026-07-02 (3) — Mesh Gradient Generator: 8 new features

Rewrote `MeshGradientGeneratorTool/index.js` (+ styles) to add all high/medium-impact features:
- **Film grain / noise overlay** (0–60%) — feTurbulence in live SVG + exported SVG; inline SVG-noise layer in CSS/React exports.
- **Aspect-ratio presets** — 16:10, 16:9, 1:1, 4:3, 9:16; W/H now derived from ratio, preview `aspect-ratio` set inline, blobs re-flow via % coords.
- **Per-blob size & opacity** — blobs gained `scale` + `op` overrides; selecting a blob opens an editor panel; globals act as defaults.
- **Smart Randomize** — harmony modes (analogous / complementary / triadic / monochrome / random) via new hslToHex + harmonyColors.
- **Undo/redo** — debounced snapshot history (ref-based) with Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y; kept arrow-key nudge.
- **Shareable URL** — full state base64-encoded into `?g=`; "Copy shareable link" button; auto-restores on mount.
- **Custom presets** — "Save current" persists to localStorage, listed under built-ins with delete.
- **More exports** — React component + Tailwind arbitrary-value tabs (now 4 tabs); raster download adds JPG/WebP (format select) alongside PNG, up to 3200×2000.
- SEO: expanded `page.js` features list + softwareSchema.featureList + metadata description, added 6 FAQs (grain, React/Tailwind, per-blob, save/share, aspect ratio) — auto-synced to FAQPage JSON-LD via the derived `faqs` array.
- Follow-up: expanded the selected-blob editor to full per-blob control — color, X/Y position, size, blur, opacity + "Reset blob overrides". Added per-blob `blur` override (null = inherit global) rendered via one feGaussianBlur filter per blob in both live preview and SVG export; included in snapshot/share/undo. CSS/React/Tailwind exports keep global blur only (radial-gradient has no per-blob blur).
- Updated mesh-gradient-generator page.js prose to match the new features: rewrote About (new "Fine control over every blob" + "Export to any stack, and share instantly" sections, heading now names React & Tailwind), expanded subtitle, rewrote the 8 How-to-Use steps (aspect ratio, per-blob editor, grain, harmony randomize, undo/redo, save/share), and grew the export comparison table to SVG/PNG/JPG/WebP/CSS/React/Tailwind. Also removed the QUICK_FACTS chips from SeoSection across all tools per request.

## 2026-07-02 (4) — Content audit initiative: svg-wave-generator (1/182)

- Started multi-session content-audit initiative (tracked in `content-audit.md`): give every tool page the comprehensive SEO treatment, newest-first by lastmod, then move to UI snippets. Full list + methodology in the checklist file.
- Converted `svg-wave-generator/page.js` from legacy flat SEO props to the `sections` array API (kept all existing About/Features/Steps/UseCases content unchanged) and added: a comparison table (SVG wave vs CSS clip-path vs raster divider image), a "match wave count to section width" pro-tip callout, a performance/accessibility callout (aria-hidden guidance), and 2 new FAQs (vs clip-path, performance) — synced into FAQPage JSON-LD. Bumped lastmod to 2026-07-02.
- Correction from user: don't force the identical table+callout+cards template on every page — pick section types that fit each specific tool. Saved as feedback memory (feedback_seo_per_tool_structure) along with the AdSense text-to-code-ratio rationale (feedback_seo_adsense_text_ratio) and the overall initiative tracker (project_content_audit).

## 2026-07-02 (5) — svg-wave-generator: corrected inaccurate clip-path claim

- Re-verified the svg-wave-generator About/table/FAQ deep-dive against SvgWaveGeneratorTool/index.js source. Found the new comparison table + FAQ wrongly claimed CSS clip-path "cannot produce a smooth curve" — our own CssClipPathGenerator supports circle()/ellipse()/rounded inset(), and clip-path's path() also supports beziers.
- Corrected both to the accurate distinction: clip-path reshapes an existing element's own boundary (including smoothly); an SVG wave draws a separate filled multi-crest divider shape, which isn't what clip-path is designed for. Fixed in the table row, the faqs array entry, and the mirrored faqSchema JSON-LD entry.

## 2026-07-02 (6) — svg-wave-generator: 4 high-impact tool features + full SEO sync

Rewrote `SvgWaveGeneratorTool/index.js` (+ styles) to add the 4 high-impact features agreed on, plus a user-requested 5th (vertical edges):
- **Left/Right edges** — generalized the wave math from a fixed horizontal (top/bottom) model to orientation-aware `wavePoints`/`toXY`/`buildLayers`, so the same sine+Catmull-Rom path can run along either axis. `height` state renamed to `thickness` (band size on whichever axis is the cross-axis).
- **Multi-color per layer** — new "Multi-color layers" toggle + per-layer color swatches (up to 5), independent of the existing solid/gradient fill.
- **Built-in drift animation** — "Animate (gentle drift)" toggle bakes a per-layer `@keyframes` `translateX` alternate-sway animation directly into the exported `<svg>`'s own `<style>` block, so it automatically carries into the CSS data-URI export too; `svgToReact` updated to convert `class=`→`className=` and wrap the style content in a JSX-safe template literal.
- **Decorative toggle** — "Decorative (adds aria-hidden)", on by default, bakes `aria-hidden="true"` onto the root `<svg>` in every export.
- **Undo/redo + shareable link** — debounced snapshot history (Ctrl+Z/Ctrl+Shift+Z/Ctrl+Y, 60 steps) and a header Share button that encodes full state into `?g=`, restored on mount.
- Page content (`page.js`): updated metadata/OG/twitter, About (2 new paragraphs on the new controls + edge-specific placement CSS), Features (+5 bullets), How-to-Use (rewrote all 7 steps), added 5 new FAQs + 2 new use-case cards (vertical divider, multi-color ribbon), fixed the now-stale "add aria-hidden yourself" performance/accessibility callout to reflect the automatic default. Refactored `faqSchema` to derive `mainEntity` directly from the single `faqs` array (was previously a separately hand-authored, drifting duplicate) — same pattern as mesh-gradient-generator, guarantees on-page/JSON-LD sync going forward.
- Accuracy pass: verified every new claim against the actual rewritten source (VB_LEN, orientation math, close-path corners, animation keyframe values, svgToReact conversions) before publishing.

## 2026-07-02 (7) — bookmark-keeper: accuracy audit + surfaced encryption feature (2/182)

Content-audit item #2 was a different kind of pass than svg-wave-generator's: the page was already near-exemplary (5-subheading About with real Pocket/Raindrop/Pinboard comparison, 7-step guide, 14 features, 6 use cases, 12 FAQs), so instead of adding structure, verified every technical claim against `BookmarkKeeperTool/index.js` and `GistSyncButton/index.js` source and found real bugs:
- **Wrong sync interval**: page said "auto-syncs 10 seconds after any change" — actual `DEBOUNCE_MS` in GistSyncButton is 5000ms. Fixed in About, a How-to-Use step, and 1 FAQ.
- **Wrong deletion mechanism**: page claimed "the sync uses a deleted-IDs map so removed bookmarks stay removed." The tool defines `readDeleteLog`/`writeDeleteLog`/`mergeDeleteLogs` but they're dead code — never read by the actual sync flow. Real mechanism: `deleteBookmark` sets a soft `deletedAt` tombstone (visible under "Show deleted", pruned after 30 days); sync itself is a full-dataset last-write-wins replace keyed on a `savedAt` timestamp comparison, not a granular per-ID deletion signal. Rewrote the About paragraph, added a How-to-Use step, and fixed 2 FAQs to describe this accurately.
- **Undocumented feature surfaced**: `GistSyncButton` supports an optional AES-GCM (PBKDF2 200k iterations) client-side encryption passphrase for the Gist content — never mentioned anywhere on the page, despite directly answering the page's own "is the Gist really private?" FAQ. Added a new About paragraph, a new How-to-Use step, a new feature bullet, updated the Gist-privacy FAQ to recommend it, and added a dedicated "How does the optional Gist encryption work?" FAQ. Updated softwareSchema.featureList and meta description too.
- Also fixed an inaccurate button reference ("Load from Gist" doesn't exist — real button is "Sync Now").
- Bumped `lastmod` to 2026-07-02 in tools-registry.js.

## 2026-07-02 (8) — bookmark-keeper: 4 high-impact features + content sync

Built the 4 high-impact features suggested for Bookmark Keeper, added to `BookmarkKeeperTool/index.js` (+ styles):
- **Bulk actions** — "Select" toggle shows a checkbox per card (replacing the favicon); a bulk bar lets you "Add tag" (merges tags into every selected bookmark) or "Delete selected" (same soft-delete tombstone as single delete) across the whole selection at once.
- **Broken-link checker** — "Check links" button does a concurrency-limited (6 at a time) `fetch(url, {mode:'no-cors'})` sweep with an 8s timeout per URL; marks each bookmark `checking`/`ok`/`broken` inline. Documented honestly everywhere it's mentioned: no-cors opaque responses mean this can only detect unreachable hosts (DNS/connection failure), not 404s on a live server.
- **Open all in filter** — an "Open all N ↗" button appears in the top bar whenever a tag/search filter is active; opens every currently-filtered bookmark as a staggered `window.open` (150ms apart) to reduce popup-blocker friction.
- **HTML (Netscape) export round-trip** — new "Export as browser bookmarks HTML" button writes a `NETSCAPE-Bookmark-file-1` document (folders named after each bookmark's first tag), the same format Chrome/Firefox/Safari/Edge use for their own export/import — closing the loop with the existing browser-HTML *import* feature.
- Page content (`page.js`): added 2 new About subsections, 2 new How-to-Use steps, 4 new feature bullets, 4 new FAQs (bulk actions, broken-link limitations, open-all, HTML export), and updated softwareSchema.featureList to match.

## 2026-07-02 (9) — daily-focus-log: major undocumented-feature audit (3/182)

Content-audit item #3 turned up the biggest content gap yet — reading the full 1914-line `DailyFocusLogTool/index.js` revealed a large set of real, shipped features with zero mention anywhere on the page:
- **File/image attachments** (paste an image with Ctrl+V, or attach any file up to 25MB) stored in IndexedDB, plus a full-screen **lightbox** with zoom/pan/arrow-key navigation.
- **Logged Links panel** — a searchable index of every URL ever pasted into a log entry across all 60 days.
- **GitHub Gist sync** (`GistSyncButton`, same shared component as Bookmark Keeper) — 5s-debounced timestamp-based sync with optional AES-GCM passphrase encryption. The old page didn't mention Gist sync at all.
- **Three export formats**, not one: full ZIP backup (chunked, with attachments + manifest), plain JSON, and human-readable Markdown. Old FAQ only described the ZIP.
- **File System Access API folder backup** (Chrome/Edge) — pick a real folder once, every future export writes straight there.
- **Task carry-forward** — opening the tool on an empty day copies the most recent active day's tasks forward, resetting all of them (including already-completed ones) to not-done. Previously undocumented and non-obvious.
- **Confetti celebration** on completing all of today's tasks.
- Verified `trimDays`/`trimOldData` state+function exist but are **never wired to any UI control** — confirmed dead code, deliberately not documented as a feature.
- **Real bug found and fixed**: `faqSchema` was built but the page never rendered any `<script type="application/ld+json">` tags at all — no FAQPage, SoftwareApplication, or BreadcrumbList structured data was ever reaching Google for this tool. Added all three (SoftwareApplication and BreadcrumbList didn't exist before).
- **Registry bug found and fixed**: `tools-registry.js` described the tool as "Top-3 daily focus tasks" — verified there is no 3-task limit anywhere in the code (unlimited tasks). Corrected the description.
- Rewrote About (+2 subsections), all 6 How-to-Use steps (was 6, now 8), Features (12→17 bullets), FAQs (10→15), and added a subtitle. Bumped lastmod to 2026-07-02.

## 2026-07-02 (10) — mini-kanban: same undocumented-sync pattern found (4/182)

Content-audit item #4. This page was already fairly detailed and accurate on core kanban mechanics (columns, due dates, checklist badges, 7-day archive countdown, 15-per-column pagination — all verified correct against source), but had the same two gaps as the last two tools:
- **GitHub Gist sync completely undocumented** — `GistSyncButton` (toolKey `mk`) is wired up exactly like Bookmark Keeper and Daily Focus Log (5s debounce, timestamp last-write-wins, optional AES-GCM passphrase encryption) but wasn't mentioned anywhere on the page.
- **No JSON-LD at all** — confirmed via source read: no faqSchema/softwareSchema/breadcrumbSchema existed, so nothing was ever rendered. Added all three.
- **Rich-text toolbar undersold**: source (`formatDescription`) shows bold/italic/**underline**/bullet/**numbered list**/inline-code/**quick checklist-line insert**/link — the page only mentioned bold/italic/bullet/code/links. Also clarified the distinction between that quick checklist *text line* insert and the separate structured Checklist section (which has the real X/Y progress badge) — these are easy to conflate and weren't previously distinguished.
- **Folder backup** (File System Access API, Chrome/Edge) was mentioned once in passing in the About prose but had no Features bullet or FAQ — added both.
- Updated tools-registry.js description (was accurate but missing Gist sync) and bumped lastmod to 2026-07-02.

## 2026-07-02 (11) — mini-kanban: About heading rewrite

- Replaced the mini-kanban About H2 ("Kanban Board — Free, No Signup, 100% Private, Starts in Seconds" — a stacked-adjective list that duplicated the page H1) with a value-proposition sentence ("A Private Kanban Board That Skips Signup and Gives You a Working Project Instantly"), matching the house style already used on bookmark-keeper and daily-focus-log's About sections.

## 2026-07-02 (12) — freelance-dashboard: verified exceptional, fixed one systemic timing bug (5/182)

Content-audit item #5 was the opposite case from the previous three: this page is already the best-documented tool on the site (9 About subsections, 13-step guide, 19 features, 7 use cases, 18 FAQs, full JSON-LD already wired). No structural additions were needed — the job here was pure verification.

Found one real, systemic bug: the page claims "force sync fires 10 seconds after any change" in 6 separate places (About x2, How-to-Use x2, Features, 2 FAQs). Traced `forcePushToGist()` in `FreelanceDashboard/index.js` — it just calls `syncRef.current?.forcePush()`, delegating entirely to the shared `GistSyncButton` component (same one Bookmark Keeper/Daily Focus Log/Mini Kanban use), whose actual `DEBOUNCE_MS = 5000`. No custom timer overrides it. Corrected all 6 occurrences to "~5 seconds."

Verified as accurate (no changes needed): the `fd_kanban_db` / `fd_focus_log_db` IndexedDB names, PBKDF2 200k-iteration/SHA-256 encryption params, and the default world-clock zones (New York, London, India/Asia-Kolkata, Sydney) all matched source exactly.

Updated tools-registry.js description to mention the encrypted sync and Freelance Hub (previously undersold relative to the page itself), bumped lastmod to 2026-07-02.

## 2026-07-03 — Home page: Latest from the Blog section

Added a "Latest from the Blog" section to the home page (src/app/page.js) that server-fetches the 3 most recent posts from the WordPress REST API at fwdtools.com/blog (`/blog/wp-json/wp/v2/posts?per_page=3`) at build time (site does `output: 'export'` in production, so this is a build-time snapshot, not live/ISR — refreshes on next rebuild). New component `HomeLatestBlogPosts` (src/components/HomeLatestBlogPosts/index.js) mirrors the card-grid styling of `HomeLatestSnippets`. Title/excerpt come back HTML-entity-encoded and excerpt is wrapped in `<p>...[&hellip;]</p>` — added a small entity decoder + tag/ellipsis stripper in page.js (`decodeHtmlEntities`, `getLatestBlogPosts`). Section renders nothing if the fetch fails (try/catch -> empty array), so a blog outage cannot break the static export build.

## 2026-07-03 (2) — Batch 7: 10 new UI snippets with full SEO deep-dives

Added 10 new in-demand, reusable UI snippets (all `noindex: true` / dev-only until promoted), each with a working vanilla HTML/CSS/JS demo and a full `seo:` block at the gdpr-consent-manager/segmented-toggle quality standard — every block verified at ~1,290–1,340 words (target 1200+), 7 deep-dive `**section**` paragraphs in About explaining HOW the component is built, 6 how-to steps, 8 features, 6 use cases with 3–6 natural `/ui-snippets/` interlinks, and 5 FAQs each including a snippet-specific React/Vue/Angular porting FAQ.

New snippets (`src/components/UiSnippetsTool/snippets/`):
1. **video-call-grid** (dashboards) — Zoom-style participant grid: auto-fit columns, click-to-pin 16:9 spotlight + filmstrip, simulated active-speaker glow + equalizer, mute badges, aria-pressed control bar.
2. **transaction-list** (dashboards) — fintech history: render-time day bucketing with per-day net totals, sticky date headers, Intl.NumberFormat currency, income/spending filter tabs, staggered row entrance.
3. **chat-conversation-list** (navigation) — messenger sidebar: unread badges + header total via reduce, presence dots, animated typing indicator, live search over names+messages (keeps master-array indices), mark-as-read on open.
4. **voice-assistant-orb** (animations) — Siri-style orb: 3 screen-blended drifting gradient blobs with phase-offset loops, idle→listening→thinking→speaking state machine, sonar pulse rings, equalizer + typewriter reply, cancel-safe timers.
5. **vertical-stepper** (forms) — Material vertical stepper: 0fr→1fr grid-template-rows height animation, number→checkmark dot morph, scaleY connector fills, current/maxReached two-integer state, jump-back editing.
6. **skeleton-table** (loaders) — shimmer table skeleton: single bone primitive (oversized sliding gradient), structure-mirrored rows for zero layout shift, aria-busy contract, prefers-reduced-motion fallback, staggered real-row swap-in.
7. **email-composer** (forms) — Gmail-style compose: recipient chips (Enter/comma/Tab/blur commit), invalid chips flagged red not rejected, paste-to-chips splitting, Backspace-pops-last-chip, duplicate rejection, valid-recipient send gating, Cc toggle, send lifecycle.
8. **coupon-card** (cards) — ticket coupon: ::before/::after punch holes + dashed perforation, clipboard API with execCommand fallback, drift-free HH:MM:SS countdown from absolute timestamp, automatic expired state.
9. **payment-success-card** (cards) — stroke-dashoffset circle+tick draw choreography, rAF ease-out amount count-up, dl receipt rows with masked card, animation-restart reflow trick (replay button), reduced-motion support.
10. **dynamic-island** (animations) — iPhone island: one element morphing width/height/radius through compact→pill→full with overshoot cubic-bezier, cross-fading pointer-safe content layers on 0.18s delay, working mini player with animation-play-state pause.

Registered all 10 in `snippets.js` (imports + "Batch 7" array section). Verified: `node scripts/audit-snippet-seo.mjs` shows 0 violations for all 10 (3 descriptions trimmed to ≤165 chars after first run); all 10 modules import cleanly under Node ESM. SNIPPET_COUNT untouched (noindex snippets are excluded from the indexed count).


## 2026-07-06 — Blog 5: Loading state snippets roundup

Wrote blog/created/blog5.txt — the fifth post in the UI-snippet roundup series (after buttons, hover cards, text effects, dev tools): **"8 Copy-Paste Loading State Snippets That Make Waiting Feel Faster"** in WordPress block-editor HTML matching the series format. Features 8 real gallery snippets, all live/indexed (skeleton-loader, skeleton-card-grid, top-loading-bar, loading-button, dots-loader, svg-progress-ring, css-loader-gallery, upload-progress); orbit-loader and ai-thinking-loader were swapped out for being noindex. Added a live /embed/ iframe after each H2 matching blog3s pattern, each with an accurate how-it-works section written from the actual snippet source (background-position shimmer, NProgress trickle model, stroke-dashoffset math, staggered animation-delay, --spd CSS-variable speed dial), when-to-use guidance, and a customisation/accessibility tip. Includes an intro framework on matching loader type to wait type, a techniques-recap list, and closing links to the gallery + the three earlier roundups.


## 2026-07-06 (2) — Blog 6: Form input snippets roundup

Wrote blog/created/blog6.txt — sixth post in the UI-snippet roundup series: **"8 Copy-Paste Form Input Snippets That Make Native Controls Feel Custom-Built"** in WordPress block HTML with a live /embed/ iframe per section (blog3/blog5 pattern). Features 8 live/indexed form snippets: toggle-switch, floating-label, custom-checkbox, otp-input, password-strength, star-rating, tag-input, multi-step-form — each how-it-works written from the actual snippet source (hidden-checkbox + :checked sibling combinator, placeholder=" " / :placeholder-shown floating label, SVG stroke-dashoffset self-drawing tick, OTP focus choreography incl. paste-to-fill, 4-regex strength score driving bars/label/checklist, hover-preview/click-commit rating, :focus-within chip container, .active-panel wizard with progress dots). Framing section on the "style the control, keep the input" accessibility pattern, 5-technique recap, closing links to gallery + buttons/cards/animations/loaders category pages (loaders + forms routes verified in [slug]/page.js).


## 2026-07-08 — Full-site SEO audit (182 tools + 630 snippets)

Ran a comprehensive automated audit (script evaluates every tool page's `metadata`/SEO object + every snippet's `seo:` block; checks titles, descriptions, canonicals, robots, OG/Twitter images on disk, JSON-LD schema presence, word counts, interlinking, FAQ counts, favicon refs, registry/app-dir consistency). **No changes made — findings only.** Key issues found:

**Tools (67/182 flagged, mostly minor):**
- **Broken OG image refs (4):** `firebase-playground` + `vue-playground` + `contract-template-manager` reference OG PNGs that don't exist in `/public/images/`; `rest-api-builder-playground` references `/images/rest-api-builder.png` but the file is `rest-api-builder-playground.png` (filename mismatch).
- **`navbar-builder` is an indexable orphan:** page is `index:true` with canonical but deliberately removed from the registry → not in sitemap, not linked anywhere.
- **Schema gaps:** 5 pages have FAQPage only — no SoftwareApplication, no BreadcrumbList (`date-calculator`, `number-base-converter`, `html-entity-encoder`, `line-utilities`, `aspect-ratio-calculator`). All 11 PDF tool pages + `scss-playground` lack BreadcrumbList.
- **13 pages missing `metadata.icons`** (favicon falls back to default): notepad, proposal-builder, contract-template-manager, scope-creep-tracker, follow-up-reminder-board, local-invoice-tracker, freelance-expense-tracker, retainer-tracker, freelance-availability-planner, milestone-payment-tracker, client-crm, client-intake-form-builder, client-portal-lite. SVGs exist in /public/icons — just unreferenced.
- **Meta descriptions >175 chars (12, mostly playgrounds):** nextjs (267), express (231), nodejs (229), mongo (210), seo-checker (209), firebase (206), python (198), mesh-gradient (196), freelance-rate-calculator (191), graphql (184), sql (182), svg-wave (181).
- **Titles >80 chars (4):** rest-api-builder-playground (98), nextjs-playground (95), firebase-playground (84), tailwind-playground (82). Plus 74 titles at 71–80 chars (site-wide "| FWD Tools" suffix pattern — acceptable, noted).
- **Interlinking below 3 links (22 pages):** 0 links — mortgage-calculator, sip-calculator, working-days-calculator; 1 — rent-vs-buy-calculator, ai-prompt-studio, json-schema-generator; 2 — uk-take-home, color-contrast-checker, api-request-generator-tester, robots-txt-generator, security-headers-generator, relight-photo, image-compressor, jquery/bootstrap5/css/php/gsap playgrounds, yaml-json + csv-json converters, daily-focus-log, mini-kanban.
- Clean: 0 duplicate titles/descriptions, 0 missing icon SVGs, 0 registry↔app-dir mismatches, all hub/legal pages have metadata+canonicals, no live tool noindexed, homepage schema fine.

**Snippets (135/630 flagged; 442 indexed / 188 noindex, all 630 have seo blocks):**
- **126 indexed snippets under the 1200-word standard** — but 125 of them sit at 1000–1199 (just under; lowest is product-card at 992). Already in scope of the content-audit initiative.
- **13 with no framework-export mention** (tailwind/angular): image-hover-reveal, animated-list, team-card, feature-cards, review-card, job-listing-card, checkout-form, sticky-promo-bar, gradient-progress, code-comparison, app-download-hero, metric-card-grid, floating-chat-widget.
- **Title >60 (4):** feature-cards (67), contact-form (64), animated-list (63), image-hover-reveal (61). **Description >165 (8):** image-hover-reveal (179), contact-form (177), feature-cards (172), multi-range-slider (172), team-card (170), animated-list (169), job-listing-card (169), word-flip-hero (166).
- **6 with only 3 FAQs:** mini-cart, world-clock, tip-calculator, invoice-preview, api-key-manager, interest-selector.
- **side-drawer** uses unmapped icon code `FILTER` in useCases → renders as visible text (add SVG mapping to UseCaseIcon).
- Clean: 0 duplicate seo titles, 0 missing preview PNGs.


## 2026-07-09 — SEO audit fixes applied (33 tool pages, 22 snippets, 1 component)

Applied every fix from the 2026-07-08 full-site SEO audit; re-run shows **0 remaining tool-page issues** (was 67) and snippets down to only the 126 near-target word-count items already tracked by the content-audit initiative.

- **OG images:** generated `firebase-playground.png`, `vue-playground.png`, `contract-template-manager.png` (1200×630) with a Playwright pipeline that screenshots the live tool (clicking "Load sample data" on CTM) and composites the site's OG card style — dark bg, stacked accent headline, 4 feature rows, badge, framed app shot. Fixed `rest-api-builder-playground`'s OG refs pointing at nonexistent `rest-api-builder.png`.
- **navbar-builder:** set `robots: index:false, follow:false` with a comment — intentionally unregistered orphan (no sitemap entry, no internal links), so it shouldn't be indexable. Reverse if the tool is ever re-registered.
- **Schema:** added SoftwareApplication + BreadcrumbList to date-calculator, number-base-converter, html-entity-encoder, line-utilities, aspect-ratio-calculator; added BreadcrumbList to all 11 PDF tools + scss-playground.
- **Favicons:** added `metadata.icons` to the 13 pages missing it (notepad, client-crm, client-intake-form-builder, client-portal-lite, proposal-builder, contract-template-manager, scope-creep-tracker, follow-up-reminder-board, local-invoice-tracker, freelance-expense-tracker, retainer-tracker, freelance-availability-planner, milestone-payment-tracker).
- **Titles:** shortened 4 >80-char titles (rest-api-builder-playground 98→70, nextjs-playground 95→71, firebase-playground 84→71, tailwind-playground 82→65); fixed nodejs-playground's stale "26 Lessons" → 31 (verified: 26 run + 5 visualizer lessons).
- **Meta descriptions:** rewrote 12 over-length descriptions to 153–161 chars (nextjs 267, express 231, nodejs 229, mongo 210, seo-checker 209, firebase 206, python 198, mesh-gradient 196, freelance-rate 191, graphql 184, sql 182, svg-wave 181).
- **Interlinking:** added 1–3 natural inline links on all 22 below-target pages (mortgage/sip/working-days had 0) — links placed inside existing use-case/step/about text per the interlinking pattern.
- **Snippets:** shortened 4 titles >60 (image-hover-reveal, contact-form, animated-list, feature-cards); rewrote 16 descriptions — all ≤165 with a framework-export hook, upgrading 13 that lacked any Tailwind/Angular mention; added 2 accurate code-derived FAQs each to mini-cart, world-clock, tip-calculator, invoice-preview, api-key-manager, interest-selector (3→5 FAQs); added FILTER funnel SVG to UseCaseIcon (side-drawer's icon rendered as raw text).
- All bulk edits via Python `encoding='utf-8'`; snippet modules re-import cleanly under Node ESM; audit eval re-parses all 182 pages.

**Addendum (same day):** swept tool pages for the same unmapped-icon issue — 7 pages used text codes that rendered as raw abbreviations. Added 16 new SVG cases to `UseCaseIcon` (TAX, PMI, HOA, CSV, 5Y, EQ, GIT, BR, CMD, GH, UNDO, CHECK, LOCK, LINK, IDX, RANGE) plus SQL/DATABASE aliased onto the existing DB cylinder — covers mortgage-calculator, rent-vs-buy-calculator, git-playground, security-headers-generator, database-schema-designer, inflation-calculator, pdf-ocr. Also fixed the stale firebase-playground registry sub "12 lessons" → 23 (verified against the LESSONS array).

## 2026-07-12 — Batch 8: 20 new scroll-based UI snippets with full SEO deep-dives

Added 20 new scroll-driven snippets (all `noindex: true` / dev-only until promoted), each with a working vanilla HTML/CSS/JS (or GSAP ScrollTrigger) demo and a full `seo:` block averaging ~1100 words (7 deep-dive `**section**` paragraphs in About explaining the underlying mechanism, 6 how-to steps, 8 features, 6 use cases with 3–6 natural `/ui-snippets/` interlinks, and 5 FAQs each including a React/Vue/Angular porting note).

New snippets (`src/components/UiSnippetsTool/snippets/`):
1. **scroll-image-sequence** (animations) — Apple-style canvas frame scrubbing: 80 pre-rendered offscreen frames, a tweened numeric playhead proxy, single-blit painting per scroll tick.
2. **scroll-sticky-features** (layouts) — two-column feature showcase: `position: sticky` media panel, middle-band IntersectionObserver step detection, CSS-only crossfades.
3. **scroll-phone-screens** (animations) — pinned phone mockup with a 400%-tall screen column sliding via `yPercent`, captions handed off on the same GSAP timeline.
4. **scroll-before-after** (animations) — scroll-driven image-comparison wipe: a widening clipped window plus a synced divider, no drag handle.
5. **scroll-typewriter** (animations) — scrubbed typewriter: per-character `display:none` toggling via a near-instant staggered tween, reversible deletion for free.
6. **scroll-card-fan** (animations) — a deck fanning open via a shared low `transform-origin` pivot, distance-to-center rotation math, seeded resting pile.
7. **scroll-grid-zoom** (animations) — 3×3 grid where the center tile scales (measured via `getBoundingClientRect`) to fullscreen while neighbors scatter by grid-index direction.
8. **scroll-accordion** (animations) — self-advancing accordion: paired open/close tweens at shared timeline positions, `classList.toggle` calls that survive scrub reversal.
9. **scroll-blinds-reveal** (animations) — generated venetian-blind slats tilting open in 3D (`rotationX` + `perspective`) with a staggered cord-pull sweep.
10. **scroll-text-draw** (animations) — SVG headline that draws itself via `stroke-dashoffset`, then floods with gradient fill on a second timeline beat.
11. **scroll-path-follow** (animations) — an element riding a curved SVG path using `getPointAtLength`/`getTotalLength`, tangent-angle heading, synced trailing draw, milestone dots.
12. **scroll-story-chart** (charts) — scrollytelling bar chart: data-driven `STEPS` array, sticky panel, IntersectionObserver step detection, CSS-tweened bar morphs.
13. **scroll-word-wheel** (animations) — masked rotating headline word, `yPercent` notch stepping sized to word count, hold-then-snap pacing.
14. **scroll-year-timeline** (animations) — giant odometer-style year counter (tweened numeric proxy) with era cards crossfading on computed year boundaries.
15. **scroll-tile-assemble** (animations) — 12 scattered tiles flying into a seamless mosaic via shared-gradient `background-position` slicing and a seeded (non-random) scatter hash.
16. **scroll-hero-exit** (heroes) — unpinned scrubbed hero departure where every element (badge, title, copy, CTAs, background orbs) exits along its own vector.
17. **scroll-shape-morph** (animations) — single div morphing organic blob → geometric square via interpolated 8-value `border-radius`, with `hue-rotate` recoloring per state.
18. **scroll-reading-time** (navigation) — live "N min left" pill: one-pass word count, readable-span scroll math, rAF-throttled passive listener, SVG progress ring.
19. **scroll-chat-story** (animations) — messaging-thread narrative reveal: IntersectionObserver-triggered one-shot bubble pops with pseudo-element typing-dots-to-text resolve.
20. **scroll-letter-stagger** (animations) — hand-rolled character splitter (no SplitText plugin), masked `yPercent` letter rise with rotation, scrub-order becomes spatial sweep order.

Registered all 20 in `snippets.js` (imports + "Batch 8" array section). Verified: `node scripts/audit-snippet-seo.mjs` shows 0 violations (8 descriptions initially >165 chars trimmed to fit); all 20 modules import cleanly under Node ESM with no duplicate ids; word counts re-checked after padding 8 under-1000-word blocks with an extra technical paragraph + FAQ each (final range 1001–1241, avg ~1110). SNIPPET_COUNT untouched (noindex snippets excluded from the indexed count).

## 2026-07-12 (2) — Batch 9: 20 GSAP plugin showcase snippets

Added 20 new snippets covering effectively the entire GSAP plugin ecosystem (all plugins free on CDN since GSAP 3.13). Skipped only PixiPlugin/EaselPlugin (require external canvas libs), GSDevTools/MotionPathHelper (dev-only tools), and CSSRulePlugin (deprecated). All `noindex: true` / dev-only until promoted; each has a working demo with the plugin loaded via jsdelivr `cdnUrls` and a full `seo:` block (~1030–1100 words, 7–8 deep-dive sections, 6 how-to steps, 8 features, 6 interlinked use cases, 6 FAQs each including a framework porting note).

New snippets (`src/components/UiSnippetsTool/snippets/`) and the plugin each showcases:
1. **flip-grid-shuffle** (layouts, Flip) — shuffle/sort/grid-list toggle with FLIP-animated reorders; `absolute: true` flights, Fisher–Yates on live nodes.
2. **flip-card-modal** (modals, Flip) — true shared-element card→modal morph (one DOM node, class-swap layouts, `props: 'borderRadius'`, animating guard, Esc/backdrop close).
3. **drag-throw-notes** (cards, Draggable + InertiaPlugin) — flickable corkboard sticky notes: bounds-solved throws, edgeResistance rubber-banding, z-counter lift.
4. **morph-svg-icons** (animations, MorphSVGPlugin) — one path morphing play→heart→star→bolt from defs targets; `shapeIndex: 'auto'`, synced fill tween, elastic squash layer.
5. **draw-svg-success** (animations, DrawSVGPlugin) — payment-success choreography: ring sweep from 12 o'clock (−90° rotation), tick draw + heartbeat pulse, `tl.clear()` replays.
6. **gsap-split-text** (animations, SplitText) — chars/words/lines mode switcher with 3.13 `mask:` clip wrappers, `revert()`-safe re-splitting, a11y notes.
7. **scramble-text-links** (animations, ScrambleTextPlugin) — self-targeting hover scrambles + auto-cycling headline with `revealDelay` chaos beat, ch-unit width lock.
8. **gsap-text-rotator** (animations, TextPlugin) — type-and-backspace word cycler: length-scaled durations, empty-tween holds, data-built repeating timeline.
9. **motion-path-plane** (animations, MotionPathPlugin) — plane on a bézier route: `align`/`alignOrigin` coordinate solving, `autoRotate` tangent heading, tweened `timeScale` throttle.
10. **physics-2d-burst** (animations, Physics2DPlugin) — click confetti: velocity/angle/gravity launch conditions, six-way randomness, self-cleaning particles, pointerdown timing.
11. **physics-props-pucks** (animations, PhysicsPropsPlugin) — same-velocity, three-friction comparison rink; kill-set-launch resets, simulation-vs-choreography contrast spin.
12. **observer-fullpage** (layouts, Observer) — scrollbar-less fullpage deck: wheel/touch/pointer unified into onUp/onDown, tolerance + lock gating, layered parallax hand-offs.
13. **scroll-smoother-parallax** (animations, ScrollSmoother) — wrapper/content smooth page with `data-speed`/`data-lag` markup effects, smoothTouch, fixed-element caveats.
14. **scrollto-anchor-nav** (navigation, ScrollToPlugin) — sticky pill nav: eased scrolls, offsetY header compensation, autoKill user handoff, jump-free replaceState hashes.
15. **custom-bounce-ball** (animations, CustomEase + CustomBounce) — paired `'ball'`/`'ball-squash'` eases, strength presets, floor-origin squash, shadow on the shared ease.
16. **custom-wiggle-icons** (animations, CustomEase + CustomWiggle) — bell/heart/cart wiggles on rotation/scale/x from one named ease; easeOut/uniform/random envelope switcher.
17. **gsap-ease-gallery** (animations, EasePack) — nine-lane ease race incl. `rough()` and `slow()`; string-configured eases as data, per-lane spam-safe replays.
18. **stagger-grid-ripple** (animations, core advanced stagger) — 8×14 dot field with `stagger: { grid, from: clickedIndex }` distance waves, keyframed three-act dots, `overwrite: true`.
19. **quickto-cursor** (animations, core `gsap.quickTo`) — dot + trailing labeled-lens ring cursor via retargeting tweens; lag-hierarchy aesthetics, lerp-vs-quickTo analysis.
20. **drag-spin-dial** (forms, Draggable `type: 'rotation'` + InertiaPlugin) — 270° volume knob: rotation bounds, inertia throws snapped to 5% detents, conic-gradient fill via one CSS var.

Registered all 20 in `snippets.js` (imports + "Batch 9" array section) — library now 670 total. Fixed a scale-from-zero bug in custom-wiggle-icons' helper mid-batch. Verified: audit shows 0 violations (16 descriptions >165 chars bulk-trimmed via Python utf-8 to 140–163); clean Node ESM import, no duplicate ids; word counts 1028–1104. SNIPPET_COUNT untouched (noindex).


## 2026-07-28 — UI snippet blog 13: dashboard snippets roundup

Added `blog/blog-posts/ui-snippets/blog13.txt` — "10 Copy-Paste Dashboard Snippets That Turn Data Into a Real Admin Panel". Dashboards was the largest roundup category not yet covered by blogs 1-12 (37 indexed snippets; prior posts covered buttons, hover cards, text effects, loaders, forms, modals/toasts, navigation, charts, heroes, scroll animations, pricing).

Featured, in build order: dashboard-layout (flex app shell), stats-card (IntersectionObserver count-up + rAF cubic ease-out), dashboard-widget-grid (HTML5 DnD delegation, rAF drag-image fix, Firefox setData, localStorage id list), activity-feed (pseudo-element spine, data-type filtering), transaction-list (single-pass day bucketing, sticky headers, Intl.NumberFormat), kanban-board (dragover preventDefault, DOM-derived counts), week-view-scheduler (CSS-var coordinate system, repeating-linear-gradient hour lines, 30-min snapping), notification-bell (pointer-events: none when closed), quota-usage-meter (computed warning tiers), status-dashboard (0-1 daily value array driving uptime bars). All "How it works" copy sourced from each snippet's own `about.description`, not invented.

Format matches blog12: plain Blogger-ready HTML (no wp: block comments), live `/embed/` iframes, per-snippet How it works / Best for / Tip, plus intro principles, how-to-drop-in steps, and a Final Thought interlinking api-key-manager, todo-widget, bar-chart and donut-chart. Verified all 10 slugs are registered in `snippets.js` and resolve under the `/ui-snippets/[slug]` route.

### Same day — blog13 proofread pass + tutorial6

Proofread `blog13.txt` against the actual snippet source and corrected four things: week-view-scheduler's event keys are `{ day, start, dur }` (not `duration`); quota-usage-meter's tiers are indigo under 80% / amber "running low" 80-99% / red "Limit reached" at 100%+ (the post had said "neutral" and was vague on the top tier); status-dashboard's histogram is 30 bars summarising 90 days (the widget legend reads "90-day uptime") and the 0-1 value drives bar height as well as colour; and the invented "300 KB" figure in the hook was softened to "a few hundred kilobytes".

Added `blog/blog-posts/tutorials/tutorial6.txt` — "Building a Google-Calendar-Style Week View Scheduler With One Coordinate Transform" (~4.2k words raw incl. 14 code blocks). Chose week-view-scheduler as best-fit: it has a single teachable mechanic (`top = (start - START) * HOUR_H` used forward for render, inverted for drag, and again for the now-line), and tutorials 1-5 cover GSAP scrub, canvas particles, CSS 3D, Lottie and the View Transitions API — none cover layout math or pointer events.

Structure matches tutorial5: h1 → hook → embed iframe → editor/export link → what it is → where you'd use it → tech stack → 9 build steps with real source excerpts (grid frame, repeating-linear-gradient hour lines, fractional-hour data, render(), grab offset + setPointerCapture, column hit-testing via getBoundingClientRect, inverse transform → snap → clamp → change-guarded commit, pointerup persist point, now-line) → customising → the two deliberate omissions (lane packing, drag-to-create) → framework port notes → "Build, understand, optimize, and extend it with AI" + "Prompt to recreate it" (per feedback_tutorial_ai_section) → Final thought. Interlinks dashboard-layout and dashboard-widget-grid.

### Same day — second proofread pass (blog13 + tutorial6)

Discovered the two blog series use different spelling conventions and normalised each file to its own series: `blog/blog-posts/ui-snippets/*` is British-dominant (colour 17 / color 12, personalised, customis-) and `blog/blog-posts/tutorials/*` is American-dominant (color, behavior, optimize x8, "Customizing it for your own project" in tutorial3). tutorial6 had drifted mixed — fixed colours/colour, customisation, "Customising" h2, centres, optimisation, quantise, normalisation.

Other tutorial6 fixes: U+2212 minus signs inside `<code>` spans normalised to ASCII hyphen to match the quoted source; "Four lines, four jobs" -> "Four steps" (the excerpt is 4 statements plus an if block); `getComputedStyle(...).getPropertyValue('--hour-h')` wrapped in `parseFloat` since it returns "44px"; added a `// ...three more` marker to the abridged EVENTS array so the id 1/3/4 gap doesn't read as sloppy data; de-duplicated "with ... with" in the Angular sentence.

blog13 prose fixes: "Almost every product... And almost every team" echo; "all built around the fixes" contradicting the later "at least one" plus doubled "every snippet below"; three em-dash pairs in one sentence in the Week View Scheduler entry (introduced by the earlier `dur` correction); and an "and ... and" run-on in the quota paragraph. Verified both files have balanced tags and no stray raw ampersands outside code blocks (the `&&` inside code blocks is left raw, matching tutorial2).


## 2026-07-28 (2) — Tool blog 6: CSS generators roundup

Added `blog/blog-posts/tools/tool-post6.txt` — "24 Free CSS Generators in One Place: Gradients, Shadows, Grid, Animations, Shapes & More" (~2,370 words). CSS was the largest tool category (24 tools) not covered by tool-posts 1-5 (diff checker, PDF suite, password generator, SVG playground, UI snippets library).

Structure follows the tool-post2 roundup pattern per feedback_tool_blog_posts (what it does / who it's for, no algorithm internals): hook on fiddly trial-and-error CSS -> who the tools are for (devs / designers-no-code / learners) -> six grouped sections (Layout, Color, Effects & shapes, Motion, Component builders, Cleanup) -> real situations -> how to use -> why worth it -> 7 FAQs -> CTA.

All per-tool copy was sourced from each tool's own `page.js` metadata rather than invented (e.g. 79 animation presets, 27 easing presets, 36 loaders, 37 shapes, 26 button presets, 18 clip-path presets, 8 glassmorphism presets, WCAG fix suggestions in the contrast checker, ARIA in the toggle generator). Beyond the 24 CSS-category tools it interlinks rem-px-converter, image-color-palette, css-to-tailwind, tailwind-to-css and ui-snippets. Plain Blogger-ready HTML (no wp: block comments). Verified: all 29 linked slugs resolve to real `src/app/*` routes, tags balanced, no raw ampersands outside entities.

### Same day — tool-post6 proofread pass

Verified every factual claim in `tool-post6.txt` against the tool components rather than their `page.js` metadata, which caught three stale preset counts. Corrected: CSS Button Generator is 29 presets, not 26; Clip-path Generator is 45, not 18; Easing Generator is 29 curves across 9 groups (CSS standard, sine, quad, cubic, quart, quint, expo, circ, back), not 27. The `page.js` meta descriptions for `css-button-generator`, `css-clip-path-generator` and `css-easing-generator` still carry the old numbers and should be updated separately.

Also corrected: the REM/PX converter handles rem<->px against a base font size (no em unit, and the label is "base" not "root") — the post had claimed em support; glassmorphism controls named as blur/transparency/saturation/shadow to match the tool; and the invented "40 KB dependency" figure in the carousel entry removed. Confirmed accurate and left alone: 79 animation presets, 36 loaders, 37 shapes, 8 glassmorphism presets, 10 filter presets, 6 grid presets, 6 mesh presets, the filter tool's literal side-by-side Original/Filtered panes, flexbox per-item grow/shrink/basis, and the framework export lists for every tool mentioned.

Prose fixes: "looks right" twice in one sentence; three separate grid-counting echoes (bullet, h2, CTA) reduced to one; "shadows...shadows...shadow" in the box-shadow entry; repeated "This is the tool that" openers; "library" twice in the carousel entry; "build step" twice in the autoprefixer entry; "genuinely" a third time; and "widely-supported" de-hyphenated. Framed the intro as "24 CSS tools plus a few close companions" since the post also covers rem-px-converter, image-color-palette and the two Tailwind converters (28 tools across the bullets, 29 links). Re-verified: all links resolve, tags balanced, no raw ampersands, American spelling throughout (matching the tools series), 2,433 words.

## 2026-07-29 — One new blog post in each series (tools, ui-snippets, tutorials)

Added three posts, each covering the largest topic its series had not yet touched, plus a joint proofread pass.

**tool-post7.txt** — "25 Free Online Code Playgrounds With 1,000+ Interactive Lessons" (2,930 words). The playgrounds were the biggest uncovered tool cluster (tool-posts 1–6 covered diff checker, PDF suite, password generator, SVG playground, UI snippets, CSS generators). Grouped as front-end fundamentals (HTML/CSS/SCSS/Tailwind/Bootstrap/SVG), JavaScript + libraries (JS/TS/jQuery/GSAP), frameworks (React/Vue/Angular/Next.js), back-end & APIs (Node/Express/PHP/Python/REST API Builder/GraphQL), databases (SQL/Mongo/Redis/Firebase) and version control (Git) — 25 in total, 24 with lesson tracks.

**blog14.txt** — "10 Copy-Paste Table Snippets That Replace a Data Grid Library" (3,014 words). Tables (22 snippets) was the largest snippet category with no roundup. Featured in lifecycle order: data-table, sortable-table, filterable-table, pagination-table, sticky-header-table, selectable-table, editable-table, expandable-table, csv-export-table, pivot-table; interlinks bulk-actions-bar, tree-table, resizable-columns-table, data-table-column-toggle, infinite-scroll-table and bar-chart. Format matches blog13 (live /embed/ iframes, per-snippet How it works / Best for / Tip, principles sections).

**tutorial7.txt** — "Building a Pivot Table in Vanilla JavaScript: Cross-Tabs, Measures, and Totals That Don't Lie" (4,145 words). Chose pivot-table because it has one teachable spine — totals must aggregate raw records, never the rendered cells, which only matters for non-additive measures like average — and tutorials 1–6 cover GSAP scrub, canvas particles, CSS 3D, Lottie, View Transitions and layout math, none of them data transformation. Structure matches tutorial6: hook → embed → what it is → where you'd use it → stack → 8 build steps with real source excerpts → customising → the O(rows×cols×records) trade-off and its Map-grouping fix → framework port → AI section + recreate prompt → final thought.

### Same day — proofread pass

Verified every lesson count against the actual lesson data rather than `tools-registry.js`, which is stale in several places: React is 68 lessons/26 chapters (registry says 44/19), TypeScript 41 (32), SQL 39 (35), Express 38 (32), Mongo 37 (32), Python 29/16 (18/8), GraphQL 28/12 (12). Verified as accurate: jQuery 72/16, JS 60/25, PHP 60/20, GSAP 55/18, CSS 53/18, Bootstrap 50/15, Tailwind 48/15, SCSS 45/13, Angular 45/13, SVG 44/12, Git 43/11, HTML 42/13, Vue 40/13, Next.js 32/10, Node 31/14 (26 run lessons + 5 event-loop visualizer), Firebase 23/11, Redis 8. Total 1,031 lessons across 24 lesson-based playgrounds — the "1,000+" in the title.

Corrections made from source: the SCSS playground uses a lightweight in-browser compiler (not real Sass), so the claim was narrowed to nesting/variables output; Redis is the one playground with no localStorage, so "each playground remembers your progress" became "nearly all" in both the bullet and the FAQ; "the whole front-end set runs for real" became "everything the browser renders natively" for the same reason; "all 25 work the same way" softened since REST API Builder has no lesson list. Spot-verified against components: PGlite/WASM Postgres, Node's sandboxed-iframe execution with in-memory fs/http, PHP's verified-output-only inference, Python's per-line memory tracer, Next.js JSZip export and the four editable file paths, Bootstrap's auto-initialised components, Vue's share-link, and every chapter-level claim (signals, tsconfig, LFS/signed commits, has-* modifier, subgrid, @property, Web Workers, PDO/PHPUnit/Laravel).

blog14 corrections: the Data Table's pagination footer is styled markup with no paging logic (now stated, with a pointer to snippet 4) and its filter pass also drives a live "Showing X of Y" count; sortable-table compares lowercased strings with a plain greater-than rather than localeCompare (the snippet's own about text claims localeCompare — the post avoids the claim entirely); "drag a column edge" removed from the intro since no featured snippet resizes columns; expandable-table's pairing described precisely (the row's `data-id` plus a matching `id` on its detail row). Verified from source: filterable-table's escape-then-wrap highlight order and minimum-salary filter, selectable-table's Set + `indeterminate` + shiftKey range, csv-export-table's RFC-4180 `csvCell` + `\ufeff` BOM + dated filename, sticky-header-table's z-index 2/1/3 and `border-collapse: separate`, editable-table's transparent inputs writing to `rows[i][key]`, pagination-table's Set-based page range.

tutorial7 corrections: the Step 2 sort example now defines its own `rowTotal()` helper instead of calling an undefined `total()`, with a note that `aggregate()` arrives in the next step; "returns one number" → "a single value" (the empty-set case returns an empty string); "reduce/filter/map and nothing else" now admits `Math.round`; "two lines of CSS" → "two CSS properties". The unbalanced-average example was checked by hand (three sales averaging 100 plus one sale of 200 — cell-average 150 vs true 125), as was the note that the demo's one-record-per-intersection data hides the bug entirely.

Spelling normalised per series (ui-snippets British, tools/tutorials American), all links and iframe embeds resolve to real routes/snippets, tags balanced, no raw ampersands outside code blocks, no doubled words.

**Side finding, not fixed:** `pagination-table`'s render has a dead `if (pages <= 7)` branch that appends a stray ellipsis span before page 1 whenever there are more than 7 pages and the current page is past 3 (reachable in the demo by choosing 5 rows per page). The effective page-range logic below it is correct; the leftover branch and its "Hmm let's just add them inline in a simpler way" comment should be deleted.

### Same day — pagination-table bug fix

Removed the dead `if (pages <= 7) { ... } else { ... }` branch in `pagination-table`'s `render()` (the one ending in the "Hmm let's just add them inline in a simpler way" comment). It built a `range` array nothing ever read, and in its else-path appended an ellipsis span to the button row *before* any page numbers — so with more than 7 pages and the current page past 3 the control rendered a stray leading "…" ahead of page 1. Reachable in the demo by choosing 5 rows per page (48 rows → 10 pages) and clicking to page 4.

The Set-based range below it was already correct and is now the only page-number logic, with the comment rewritten to explain it. Verified the rendered sequence for every page at both 10 and 5 rows per page: ellipses now appear only in genuine gaps (e.g. page 4 of 10 gives Prev 1 … 3 4 5 … 10 Next), there is a single ellipsis-creating code path left, and the module still imports cleanly.

## 2026-07-31 — Second round of blog posts: one per series

Three more posts, each taking the largest topic its series still had not covered, plus a joint proofread pass.

**tool-post8.txt** — "The Free Freelance Toolkit: 17 Browser Tools for Clients, Proposals, Time Tracking and Getting Paid" (2,310 words). The freelance/client suite was the biggest uncovered tool cluster after playgrounds. Ordered as a job actually runs: what to charge (rate calculator, working-days calculator) → winning the work (client CRM, intake forms, proposals, contracts) → doing it (time tracker, availability planner, scope creep, client portal, dashboard) → getting paid (invoice generator, invoice tracker, milestones, retainers, follow-ups) → the books (expenses, plus notepad and bookmarks riding in the same toolbar). Ends with a shared-plumbing section, a nine-step workflow through the set, and 8 FAQs.

**blog15.txt** — "10 Copy-Paste AI UI Snippets That Make Your App Feel Like ChatGPT" (3,188 words). All nine `ai-*` snippets plus speech-to-text, in build order: chat interface, prompt composer, streaming response, thinking loader, model selector, source citations, agent steps, assistant sidebar, image generator UI, speech to text. Interlinks typing-indicator, command-palette, mention-autocomplete and chat-conversation-list. Opens on the three constraints that make AI UI its own problem (partial arrival, checkability, blank-input onboarding) and closes on "don't fake progress".

**tutorial8.txt** — "Building an AI Streaming Response UI: How to Reveal Rich Text Without Breaking Your HTML" (4,676 words). Picked `ai-streaming-response` because its spine is one small function — `safeSlice()`, the tag-aware slicer that counts only characters outside tags and never cuts mid-tag — and tutorials 1-7 cover GSAP scrub, canvas particles, CSS 3D, Lottie, View Transitions, layout math and data transformation, none of them progressive rendering. Ten steps: typed blocks → why naive slicing breaks → safeSlice line by line → stripLen as its matching measure → the three-cursor state machine → per-type reveal (prose/list/code) → the single moved cursor node → Stop and finish being one function → swapping in a real fetch + getReader + AbortController loop → the escaping step for model-generated HTML.

### Same day — proofread pass

Verified against the components rather than the registry, which is stale in one place: the Working Days Calculator has no public-holiday database — it toggles Saturday and Sunday independently and takes a pasted list of custom dates — so the post describes it that way instead of repeating the registry's "public holidays" claim.

Structural findings that shaped tool-post8: twelve of the tools (CRM, proposals, contracts, intake, scope, follow-ups, invoice tracker, expenses, retainers, portals, availability, milestones) are one shared component with per-tool configs, which is why they share IndexedDB storage, a computed metrics row, field search, CSV/JSON export, soft-delete with restore, and the encrypted-Gist sync button. The Freelance Hub toolbar carries 17 entries but is not the same 17 the post covers — it includes notepad and bookmark-keeper and omits client-portal-lite and the working-days calculator — so the intro says "most sharing a single Freelance Hub toolbar" and the plumbing bullet describes the bar's contents rather than claiming it spans everything. Printing to a client-ready document is only wired for proposals, contracts and invoices, so that claim is scoped to those three. Verified accurate: the proposal builder's default 50%-upfront term, per-tool metric labels, AES-GCM Gist encryption with a 5s debounce, and the rate calculator's minimum/recommended/day-rate/market outputs.

blog15 was checked claim by claim against each snippet's HTML/CSS/JS: four suggestion chips in the chat interface, the token heuristic of one per four characters and the 180px composer cap, three skeleton bars and the exact status phrases in the thinking loader, `aria-selected="true"` driving the model selector's check icon in CSS, the 150ms hover-intent delay and `<button class="cite">` markers in citations, the `::before` connector and `grid-template-rows: 0fr → 1fr` panel in agent steps, the `-320px` margin slide in the sidebar, and `continuous`/`interimResults`/`isFinal` in speech-to-text. The image generator's PRNG is a `mulberry` function seeded from an `h * 31 + charCode` hash (the snippet's own about text calls it mulberry32) — the post describes the hash-to-seed pipeline without naming it.

tutorial8's code excerpts were taken from the snippet source verbatim: the 45ms interval, the 2-6 character chunk, `safeSlice`'s three ordered conditions and its mid-tag catch-up loop, `stripLen`'s tag-stripping measure, the bi/ci/li cursors, the line-per-tick code branch, `steps(2, start)` on the cursor blink, and `innerText` for copy. Added two things the snippet leaves out and a real implementation needs: `decoder.decode(value, { stream: true })` for UTF-8 split across chunks, and escaping model HTML before it reaches `innerHTML`.

Prose pass: "rather than" thinned from 15 to 9 in tutorial8 and 8 to 6 in blog15; "client-ready document" and "when a client asks" de-duplicated in tool-post8; "favours" → "favors" (tools series is American, ui-snippets British); one curly apostrophe in blog14 normalised to straight, matching every other post in all three series. All 49 links and iframe embeds resolve to real routes and registered snippets, tags balanced, no raw ampersands outside code blocks.

### Same day — second proofread pass (tool-post8, blog15, tutorial8)

A closer read against the source caught five real errors, all in tutorial8's explanations rather than its code excerpts.

`safeSlice` is **12 lines**, not thirteen — the post claimed thirteen in three places (hook, tech-stack bullet, final thought) plus a fourth in the limitation paragraph; all now say "a dozen". The interval is 45ms, so the DOM is written ~22 times a second, not the "sixty times a second" the problem statement claimed. Step 4's explanation of `stripLen()` listed two opposite consequences for one mistake: comparing the cursor against `html.length` (which is longer than the visible length) can only cause the block to keep ticking after everything is visible — it cannot make it finish early — so that sentence was rewritten as the single accurate failure, a visible stall mid-answer. Step 9 introduced its `fetch`/`getReader` excerpt as "the code the demo's own code block is showing" when it is an expanded version (adds `TextDecoder`, a buffer, method and body). And `steps(2, start)` was described as "two words of CSS" — it is one timing function.

Also fixed: "in production you have the opposite problem" for incremental markdown parsing (it is the harder version of the same job, not the opposite).

blog15: the citations entry said a marker is "a real `<button>` … a button and not a span", which was redundant after the earlier clause — rewritten to explain what the button buys (keyboard focus and screen-reader announcement, with `focus`/`blur` mirroring the hover handlers). Step 4 of the drop-in list told readers to find "the simulated model call" in every snippet, but three of the ten have none — the model selector and citations are pure UI over your own data and speech-to-text really listens — so the step now says so. Verified while checking: the interim transcript really is grey (`#808090`, italic) as described.

tool-post8: dropped the invented "maybe 70% of the week" figure from the opener (same standard applied to the "300 KB" and "40 KB dependency" figures in earlier posts) and softened "most people start with the invoice generator" to a claim about entry points rather than about user behaviour. Confirmed the Time Tracker migrated its legacy localStorage key to IndexedDB, so the FAQ's "using IndexedDB" answer holds for the record-keeping tools.

Re-verified after edits: all links and iframes resolve, tags balanced, no raw ampersands outside code, series spelling conventions intact, straight apostrophes throughout.

## 2026-08-01 — Third round of blog posts: one per series

**tool-post9.txt** — "21 Free Money Calculators: Take-Home Pay, Loans, Investments, Tax and Retirement" (2,103 words). Finance was the largest remaining tool cluster. Grouped by the question each tool answers: take-home pay (US paycheck, UK, Canada, Australia, salary-to-hourly), debt (mortgage, EMI, loan payoff, credit card payoff, rent vs buy), saving and investing (compound interest, monthly investment, SIP, FD, retirement), everyday money (budget planner, net worth, inflation, tip) and sales tax (UK VAT, GST). Links the freelance invoice generator and rate calculator as companions, so 23 links for 21 calculators.

**blog16.txt** — "10 Copy-Paste E-commerce Snippets That Take a Shopper From Browse to Buy" (3,012 words). Follows one shopper through the funnel: product card, quick view, variant selector, fly-to-cart, sticky cart drawer, free-shipping bar, promo code input, multi-step checkout, order summary, order tracking timeline. Interlinks add-to-cart-button, mini-cart, stock-urgency-bar, size-guide-modal, quantity-stepper and recently-viewed-carousel.

**tutorial9.txt** — "Building a Three.js Product Viewer: Why Lighting, Not Geometry, Makes 3D Look Real" (4,045 words). First WebGL tutorial in the series — tutorials 1-8 cover GSAP scrub, canvas particles, CSS 3D transforms, Lottie, View Transitions, pointer/layout math, data transformation and progressive rendering, none of them 3D rendering. Nine steps: renderer and the pixel-ratio clamp, camera and why the FOV is 42, OrbitControls damping and the update() call people forget, the three-point lighting rig, the floor disc, metalness/roughness, one-line swatches, the resize function (setSize's third argument), and the render loop. Pairs with blog16 via the variant selector.

### Same day — proofread pass

**A real error in blog16, caught by reading the snippet source instead of its own about text.** The Product Card's about text describes swatches carrying `data-colour` and applying the selected colour to the product image (`productImg.style.background = colour`) — the actual JS does neither. Swatches carry `data-name` (a colour *name* like "Midnight") and clicking one only moves the `.active` class; the image is a placeholder SVG. The add-to-cart reset is 2000ms, not the 1.5s the about text implies, and the wishlist heart is an inline `onclick` class toggle in the markup rather than a `toggleWish()` function. Section 1 was rewritten to describe what the code does. The snippet's own `about.description` should be corrected separately — it is currently aspirational in three places.

Line counts in tutorial9 were measured, not estimated: the JS is **73 lines** (57 non-comment), so "about ninety lines" became "about seventy" in both places it appeared; the lighting block is 10 lines and the ground disc 7, so "roughly a third of those lines" became "roughly a quarter", "six lines" for the disc became seven, and the final thought's "roughly thirty" became "around two dozen" (lights 10 + disc 7 + camera 3 + controls 7 = 27).

Verified against components rather than the registry: US paycheck uses 2025 tables and names all 50 states; UK offers 2026/27 and 2025/26; Canada is 2026; **Australia is still on 2024-25 ATO figures** (super 11.5%), so the post says 2024-25 rather than implying parity with the others, and the FAQ lists each year explicitly. Inflation data really is US CPI from 1913 and UK RPI from 1948 (BLS/ONS). GST offers India 0/5/12/18/28 plus custom and Australia 10/0 plus custom, with both registration thresholds. VAT UK carries the £90,000 threshold. Also confirmed: monthly investment supports daily/weekly/monthly with Rule of 72 and CSV, salary-to-hourly has all eight pay periods, mortgage covers PMI and HOA, credit-card payoff compares against minimum-only.

blog16's other nine entries were checked against source: the quick view's "Add to cart · $" running total, the variant selector's `<= 3` scarcity threshold and native `disabled` sold-out sizes, fly-to-cart's `scale(.12)` shrink and `- 80` arc lift with the count bumping in `onfinish`, the cart drawer's `translateX(100%)` and shared `.open` backdrop class, the free-shipping bar's $75 threshold and three message states, the promo field's `trim().toUpperCase()` normalisation, the checkout's `checkValidity()` gate, the order summary's `.removing` exclusion from `recalc`, and the tracking timeline's `current / (steps - 1)` rail height.

Spelling normalised per series with a script that skips `<code>` and `<pre>` spans, so `data-color`, `material.color.set()` and `COLORS` survived intact while prose moved to American in tutorial9 (19 replacements) and tool-post9 (2). Prose pass: "rather than" thinned from 11 to 7 in tutorial9, doubled "exactly" removed, "to you at the end" de-duplicated in tool-post9. All links and iframes resolve, tags balanced, no raw ampersands outside code, straight apostrophes throughout.

### Same day — second proofread pass (tool-post9, blog16, tutorial9)

Six substantive corrections, two of them factual errors and one a reasoning error.

**tool-post9 said the Monthly Investment Calculator supports "six currencies"** — copied from the registry description, which lists USD/EUR/GBP/CAD/AUD/INR. The component imports the shared `CURRENCIES` list from `src/lib/currencies.js`, which holds **52**. (For contrast, the Net Worth Calculator defines its own list of 18 and the Retirement Calculator its own 12, so there is no single site-wide number to quote.) Reworded to avoid a brittle count.

**A reasoning error in the same post:** the advice bullet read "Be pessimistic on returns and optimistic on costs," which is backwards — optimistic costs means assuming costs are low, the opposite of a conservative plan. Now "Assume worse returns and higher costs than you expect."

**tutorial9 described the lighting as "warm key plus cool fill"** — the key in this snippet is neutral white (`0xffffff`); only the fill is tinted (`0x93c5fd`). Rewritten as a temperature *difference* between the two sides, and the matching "keep the key warm and the fill cool" bullet in the customising section was brought into line.

**blog16 called the free-shipping bar's celebration marker a "flag"** — that's the class name (`fsb-flag`); the element actually renders a 🎉. Also corrected the fly-to-cart shrink from "about a tenth" to "about an eighth" (`scale(.12)`), and softened "the most cited cause of cart abandonment there is" to "top nearly every survey," since the post cites no source.

Smaller fixes: tool-post9's "your country's take-home calculator" linked only to the US paycheck tool, so it now offers both US and UK links; the tax-year FAQ no longer implies all four country tools update in lockstep (Australia is a year behind); and tutorial9's AI-section prediction exercise now describes the two lighting failures accurately — no rim light means the object loses its edge against the background, ambient at 3 means flat and chalky, not a "washed-out silhouette."

Verified in this pass and left alone: the tip calculator's 10/15/18/20/25 presets, all eight salary-to-hourly pay periods, the credit-card tool's payment-or-target-months input, VAT's custom-rate option, the multi-step checkout's Contact/Shipping/Payment steps with a real `type="email"` input behind `checkValidity()`, and the order summary's 8% tax row. Word counts after edits: 2,126 / 3,018 / 4,081.

## 2026-08-02 — Fourth round of blog posts: one per series

**tool-post10.txt** — "7 Free SEO Tools: Audit, Meta Tags, Schema, Sitemaps, Robots.txt & Social Previews" (1,612 words). Covers the full `category: 'seo'` cluster from the registry (7 tools): SEO Checker leads as the audit-first step, then Meta Tag Generator and Schema Markup Generator for on-page tags, OG Image Generator for social previews, Robots.txt and Sitemap.xml Generators for crawl control, and Hreflang Tag Generator for international sites. Framed as "plumbing, not writing" — technical fixes that don't require touching page content.

**tutorial10.txt** — "Building a Canvas Physics Simulation: Gravity, Elastic Collisions, and the Momentum Math That Makes It Feel Real" (3,758 words). Built on `physics-balls.js`, which already ships a full technical `about` write-up — used that as the factual source rather than re-deriving the physics independently. Eight steps: canvas setup, spawning (mass = r², not r), semi-implicit Euler integration, wall restitution, the O(n²) pairwise check, `resolveCollision` taken apart clause by clause (collision normal, relative-velocity dot product, the 2·dot/totalMass impulse formula, positional correction), the trail-effect render mode, and the loop. First non-Three.js, non-GSAP physics/math tutorial in the series (1-9 covered GSAP scrub, canvas particles, CSS 3D transforms, Lottie, View Transitions, pointer/layout math, pivot tables, streaming text, and Three.js lighting).

**blog17.txt** — "10 Copy-Paste Mobile App Screen Snippets That Feel Like a Real App" (3,044 words). First roundup drawn from the `mobile` category (19 available) rather than a UI-pattern category — earlier roundups (blog1-16) covered heroes, scroll, pricing, dashboards, tables, AI UI, e-commerce, loading, forms, modals, nav, charts, none of them phone-frame screens. Ordered as an app arc: onboarding → login → lock screen → feed → stories viewer → chat → music player → fitness → banking → checkout. Each entry's "how it works" is sourced from that snippet's own `about.description` (all ten already had full SEO content from the July content-audit push), not re-derived from reading raw JS.

### Same day — proofread pass (tool-post10)

Written from the registry's marketing `desc` strings rather than the components, which undersold two tools — the same category of error as the "six currencies" miss on tool-post9. Checked all seven against their actual `src/components/*` source:

**SEO Checker scores five categories in the registry blurb, seven in the code.** `SeoPlaygroundTool/index.js` tags every check with `category: 'Metadata' | 'Crawlability' | 'Content' | 'Social' | 'Images' | 'Schema' | 'Links'` — Social and Schema were missing from the post's list. Also missing: JSON-LD is a fifth export tab (`OUTPUT_TABS` = HTML, Next.js, Helmet, Astro, JSON-LD), not just the four framework exports named in the registry description.

**Meta Tag Generator undersold its own export options.** The registry desc lists "HTML, Next.js metadata, React Helmet, Vue/Nuxt, Astro, or JSON-LD" but the component's switch statement (`genHTML`/`genNextJs`/`genHelmet`/`genVue`/`genAstro`/`genJsonLD`/`genOGOnly`) has seven, including an "OG Only" mode the registry text drops entirely. Also caught a real inaccuracy of my own: the post said the tool builds "the full set: standard meta tags, Open Graph, Twitter Card, and JSON-LD" together — `genHTML()` only ever emits meta/OG/Twitter; JSON-LD is a separate export choice, not bundled into the default HTML output. Reworded so JSON-LD reads as one of the export formats, not something generated alongside the others by default.

**Schema Markup Generator supports eleven types, not five.** `TYPES` in the component is `['WebSite', 'Article', 'Product', 'FAQPage', 'LocalBusiness', 'BreadcrumbList', 'Organization', 'Person', 'VideoObject', 'HowTo', 'SoftwareApplication']` — the registry description (and the first draft of this post, copied from it) only named the first five. Rewritten to list all eleven, split into "everyday" and "more specific" so the sentence doesn't just become a wall of proper nouns.

**A capability neither the registry nor the first draft mentioned at all:** both the Robots.txt and Sitemap.xml Generators have a second `OUTPUT_MODES` value — `'Next.js'` — that renders the same rules as an `app/robots.js` / `app/sitemap.js` route file instead of a static text file, plus a `downloadPack()` that zips both formats together with a README via JSZip. Robots.txt Generator also runs a live path tester (`canCrawlPath(testPath, allow, disallow)`) showing allowed/blocked before you ship. Added all three, since "Developers wiring up Next.js" was already named in the post's own "Who these are for" section and the post hadn't mentioned the one feature that actually serves them.

Verified and left unchanged: OG Image Generator's five templates (clean/dark/gradient/bold/split) and 1200×630 canvas dimensions, both confirmed in `OgImageGenerator/index.js`; Robots.txt's three presets (public/staging/ecommerce) and Allow/Disallow/Crawl-delay/Host/Sitemap directives; Sitemap's lastmod/changefreq/priority fields; Hreflang's HTML-tags-vs-sitemap-XML toggle and x-default detection. Also fixed one raw `&` in the H1 (should have been `&amp;` per the series' own tag-balance convention) and confirmed tag balance (p/ul/ol/li/strong/a/code/h1/h2/h3 all matched) and no British spellings crept in. Word count after edits: 1,735.

## 2026-08-02 (2) — 20 new UI snippets, each on a different animation library

Brief was "20 UI snippets using all kinds of animation libraries — mixed — high quality." Before the library survey, the CDN mix across the existing 770 snippets was heavily lopsided: **211 GSAP, 69 Three.js, 6 Lottie, 2 qrcode, 1 jQuery** — effectively two libraries. So the organising constraint became one snippet per *previously unused* library, 20 distinct libraries, rather than 20 more GSAP variations.

**The 20, with the specific technique each was chosen to demonstrate:**

| Snippet | Library | Why this library, specifically |
|---|---|---|
| `anime-ripple-grid` | anime.js | `anime.stagger` with the `grid` option — delays by Euclidean distance, so a ripple radiates circularly from the clicked tile instead of sweeping diagonally by array index |
| `matter-falling-tags` | Matter.js | Rigid bodies synced to **real DOM chips** (not `Matter.Render` canvas), bodies measured per-chip with `chamfer` pill colliders |
| `rough-annotation-card` | rough-notation | Markup-driven `data-annot` phrases, `annotationGroup` sequencing, per-type stroke width (highlight 12 behind text vs pen 2 over it) |
| `motion-flip-expand` | Motion One | FLIP measure-then-animate card→panel with real `spring()`, plus a placeholder div holding the grid slot |
| `tsparticles-hero` | tsParticles | `detectsOn: 'window'` — the fix for the near-universal bug where overlaid hero copy makes particles inert |
| `vivus-svg-draw` | Vivus | `stroke-dashoffset` draw-on with 3 timing types and a **scrubbable** timeline via `setFrameProgress` |
| `typed-rotating-hero` | Typed.js | `smartBackspace` (strings authored to share prefixes so it's visible) + `preStringTyped` retinting the whole hero via one CSS var |
| `splitting-css-stagger` | Splitting.js | The library animates **nothing** — writes `--char-index`/`--char-total`, all four effects are pure CSS `calc()` |
| `atropos-3d-card` | Atropos | Per-layer `data-atropos-offset` depth stack with negative (opposing) background motion; gyroscope on touch free |
| `swiper-cards-deck` | Swiper 11 | `effect: 'cards'`; `loop: false` deliberately (stacked clones render behind themselves) + `overflow: visible` override |
| `splide-thumbnail-gallery` | Splide 4 | `main.sync(thumbs)` **before** `mount()` — the ordering rule that silently yields two independent sliders |
| `lenis-smooth-scroll` | Lenis | Exponential ease-out explained; you own the rAF loop so it can share a frame with GSAP/Three |
| `zdog-orbit-scene` | Zdog | Pathless `Shape` + huge `stroke` = sphere; `Anchor` hierarchy sweeps both moons with no per-moon trig |
| `p5-flow-field` | p5.js | Perlin coherence vs `Math.random` static; 3rd noise arg as time; trails-not-clears so the field *emerges* |
| `pixi-particle-field` | Pixi.js | 2,400 sprites, one draw call: white texture + `tint` (not 5 textures), `ParticleContainer` whitelist, squared-distance culling |
| `kute-svg-morph` | KUTE.js | `morphPrecision` + `morphIndex` — the two options that decide whether a morph twists or reads as intentional |
| `chartjs-revenue-chart` | Chart.js 4 | Scriptable gradient guarding `chartArea` undefined on first layout pass; `update('active')` not destroy/recreate |
| `d3-force-bubbles` | D3 v7 | `scaleSqrt` (area not radius), and **alpha** — why a cooled sim ignores a new force, `alpha` vs `alphaTarget` |
| `scrollama-story-steps` | Scrollama | IntersectionObserver steps, `offset: 0.55` tuning, `onStepEnter` (discrete) vs `onStepProgress` (continuous) |
| `mojs-burst-button` | mo.js | Two mismatched burst layers (one reads as a mechanical ring), `mojs.Html` on real DOM, Timeline for phase-locking |

**Process notes for next time:**

- Wrote all 20 inline rather than via subagents (user rejected the subagent launch; the harness guidance is also to not spawn agents unless asked).
- `cdnUrls` supports **CSS as well as JS** — `buildSrcdoc` in `UiSnippetsTool/index.js` tests `/\.css(\?.*)?$/` and emits `<link>` vs `<script>`. That's what made Swiper, Splide and Atropos viable, since all three need their stylesheet.
- **`node --check` alone was not enough and my first check loop silently lied.** I used `cmd && echo OK` which printed OK regardless because the `&&` short-circuit still ran on the *next* iteration's exit code. Rewrote as an explicit `if/then/else`, which immediately surfaced two real syntax errors: a stray `\'` escape in `typed-rotating-hero` and an **unescaped backtick inside a template literal** in `swiper-cards-deck` (I'd written `` `this` `` in prose inside the `prompt:` backtick string). Both would have broken the build. Worth keeping the explicit-if form permanently.
- A Python bulk-edit pass shortening 17 over-long `seo.description` values re-introduced one raw apostrophe (`Splide's`) inside a single-quoted string — caught only by re-running `node --check` *after* the bulk edit. Always re-parse after scripted edits.
- Wrote a throwaway audit at `/tmp/audit20.mjs` checking id match, cdnUrls present, title 30–60, desc 120–165, about ≥500 words, howToUse=6, features=8, useCases=6, faqs=6, aiPrompt present, react/tailwind/vue-or-angular mentioned, ≥2 `/ui-snippets/` interlinks, total seo ≥1400 words. First run: 17 failures, all `desc` over 165. After the fix pass: **all 20 pass**. Note ESM import needs `file:///C:/...` URLs on Windows — bare `C:/` throws `ERR_UNSUPPORTED_ESM_URL_SCHEME`.
- Registered via script (20 imports appended after `link-in-bio`, 20 entries appended to `SNIPPETS`). The dev-time drift warning in `snippets.js` fired correctly — `SNIPPET_COUNT` bumped **770 → 790** in `src/lib/snippet-count.js`. Verified no duplicate ids, no invalid categories, 0 `noindex` (all live, consistent with the July promotion pass).
- Every snippet's `about.description` deliberately names a **gotcha a naive implementation gets wrong** — that's the through-line that makes these read as engineering write-ups rather than feature lists.

## 2026-08-03 — Fifth round of blog posts: one per series

**tool-post11.txt** — "16 Free Image Tools That Run in Your Browser: Compress, Convert, Trace, Remove Backgrounds & Read Text" (2,707 words). Covers the full `ImageToolsTopNav` cluster (16 tools), which is the canonical grouping rather than a registry category — it spans `converters`, `design`, `pdf` and `seo`. Grouped by job: everyday fixes (Image Editor, Image Compressor), changing the picture (Background Remover, Relight Photo), format conversion (Image→SVG, SVG→PNG, Image→Base64, PDF↔Images), extraction (OCR, Color Palette), and generation (Favicon, OG Image, QR, Code Screenshot, Animated SVG Icons). Privacy framing parallels tool-post2 (PDF).

**blog18.txt** — "10 Copy-Paste Layout Snippets That Replace a CSS Grid Framework" (3,669 words). First roundup from the `layouts` category (60 available, 58 excluding the not-yet-live library batch). Ordered as a page-building arc: holy grail shell → responsive card grid → bento → masonry → portfolio filter → split screen → sticky sidebar → full-page scroll → drag-resize panels → virtual scroll. Every "how it works" was written from the snippet's actual html/css/js, not its `about.description` — see the corrections note below.

**tutorial11.txt** — "Building a Virtual Scroll List: 10,000 Rows, One Screenful of DOM" (4,828 words). Nine steps: the three constants, dataset generation (golden-angle hues), the spacer, the window math, the row pool, writing rows, rAF coalescing, debounced search, and sort. First DOM-performance/windowing tutorial in the series (1-10 covered GSAP scrub, canvas particles, CSS 3D, Lottie, View Transitions, pointer/layout math, pivot tables, streaming text, Three.js lighting, canvas physics).

### Same day — verification notes

**Snippet `about.description` text is unreliable as a source; the code is not.** Two of the layout snippets describe themselves inaccurately. `masonry-grid`'s about text claims cards are built with `document.createElement` + `appendChild`; the JS actually uses `grid.innerHTML +=` inside a `forEach`, which reparses the whole grid every iteration — blog18 says so and gives the one-string fix. `bento-grid`'s about text contradicts its own CSS in one paragraph (`repeat(4, 1fr)` where the CSS is `repeat(3, 1fr)`) and lists five cells where the markup has six. Both entries were written from the source instead.

**`image-background-remover` is not an AI segmentation tool** — the registry-adjacent framing invites that assumption, but the component is color-distance based (`removeBackground(canvas, tolerance, feather, mode, pickedColor, wandSeeds)` with four modes: white/light, magic wand flood fill, picked color, auto edge color). The post says so explicitly and scopes the "works well on" claim to plain backgrounds, since that is where the technique is actually strong.

**Corrections caught in the self-check pass**, all in claims I had made rather than in the source: blog18 said "six of them use no JavaScript at all" — only two are pure CSS (`css-grid-cards`, `bento-grid`), with two more using JS for a menu toggle or touch fallback. blog18 also put `holy-grail-layout`'s JS at "nine lines" (it is two event listeners, ~13 lines). tutorial11 claimed the pool `while` loops "run exactly once, at startup" — they also run at both ends of the list, where the window is clipped: at `scrollTop: 0` the buffer above index 0 does not exist, so the pool is four rows shorter and grows by four as you scroll in. tool-post11 described the Relight "Sunset" preset's key light as low; it sits at `y: 0.22`, near the top.

Verified against components, not registry `desc` strings: compressor's five formats with UPNG palette quantization for PNG, five resize modes, six presets and "Download All"; favicon's eight PNG sizes + ICO built from 16/32/48 + `site.webmanifest`, zipped as `favicon-package.zip`; OCR's 16 languages via dynamically imported `tesseract.js` with a confidence score (the FAQ states plainly that the *engine and language data* download, while the image does not upload); QR's seven types and six dot styles; Code Screenshot's nine themes / 23 languages / four window styles and `ClipboardItem` PNG copy; Image→SVG's four `imagetracerjs` presets; Color Palette's 4–150 swatch range.

Tutorial code excerpts are verbatim, including two leftovers worth spotting: `const rows = listItems.children` is never read, and `row.style.height` is rewritten every frame with the same constant. Also flagged as a real rough edge rather than glossed: sorting sets `displayData` to a sorted copy, but searching re-derives it from `allData`, so sorting then searching silently discards the sort while the button still reads "Z–A".

Prose pass: "rather than" thinned 14→7 in tutorial11 and 10→5 in blog18. All 40 links and 10 iframe embeds resolve to real routes and registered snippets (checked programmatically against `src/app/*/page.js` and the `SNIPPETS` registry), tags balanced, no raw ampersands outside code, straight apostrophes, American spelling throughout to match the newest post in each series.
