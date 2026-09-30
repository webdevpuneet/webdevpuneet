const loaderSkeletonListStaggered = {
  id: 'loader-skeleton-list-staggered',
  title: 'Staggered Skeleton List Reveal',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="sl-card">
  <div class="sl-header">Notifications</div>
  <ul class="sl-list" id="slList"></ul>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.sl-card{width:100%;max-width:400px;background:#151f34;border:1px solid #223055;border-radius:16px;overflow:hidden}
.sl-header{padding:16px 18px;font-size:13px;font-weight:800;letter-spacing:.02em;border-bottom:1px solid #223055;color:#94a3b8}

.sl-list{list-style:none}
.sl-row{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid #1b2540}
.sl-row:last-child{border-bottom:none}

.sl-avatar{width:36px;height:36px;border-radius:50%;flex-shrink:0;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:slShimmer 1.6s ease-in-out infinite}
.sl-lines{flex:1;display:flex;flex-direction:column;gap:7px}
.sl-line{height:9px;border-radius:5px;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:slShimmer 1.6s ease-in-out infinite}
.sl-line.sl-title{width:70%}
.sl-line.sl-sub{width:45%;height:7px}

@keyframes slShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`,

  js: `var list = document.getElementById('slList');
var ROWS = 7;
var STAGGER_MS = 90; // delay added per row down the list

// Build each row and set a real per-index animation-delay (negative, so the
// shimmer is already mid-cycle where earlier rows are, producing a wave that
// reads top-to-bottom instead of every row pulsing in perfect unison).
for (var i = 0; i < ROWS; i++) {
  var row = document.createElement('li');
  row.className = 'sl-row';
  row.innerHTML = '<div class="sl-avatar"></div>' +
    '<div class="sl-lines"><div class="sl-line sl-title"></div><div class="sl-line sl-sub"></div></div>';

  var delay = (i * STAGGER_MS) + 'ms';
  var shimmerEls = row.querySelectorAll('.sl-avatar, .sl-line');
  shimmerEls.forEach(function (el) {
    el.style.animationDelay = delay;
  });

  list.appendChild(row);
}`,

  seo: {
    title: 'Staggered Skeleton List Reveal — Wave-Animated Loading List',
    description: `A skeleton list where each row's shimmer starts with a real per-index delay, so the loading state itself reads as a top-to-bottom wave. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Staggered Skeleton List Reveal — A Loading Wave Computed Per Row',
      description: `A standard [skeleton loader](/ui-snippets/skeleton-loader/) list has every row shimmer in perfect unison — functional, but visually flat. This snippet builds a 7-row skeleton list where each row's shimmer animation-delay is set from its own index, so the pulse visibly rolls down the list top-to-bottom instead of every bar flashing together, giving the loading state itself a sense of motion and direction.

**A real per-row delay, computed not hand-written**

Rows are generated in a loop, and each row's shimmer elements get \`el.style.animationDelay = (i * STAGGER_MS) + 'ms'\`, where \`i\` is that row's actual index and \`STAGGER_MS\` is a single tunable constant (90ms by default). This is a computed value tied to position in the list, not seven separately hand-tuned CSS rules — add an eighth row and it automatically gets the next delay in the sequence with zero extra CSS.

**Why this reads as a wave**

Because every row shares the same 1.6s shimmer keyframe but starts at a different point along it, at any instant you're seeing seven different phases of the same animation simultaneously — row 1 might be near its brightest point while row 4 is still dark, and that phase difference scrolling down the list is what your eye reads as motion travelling downward, similar to how a stadium wave works from many people doing the identical motion at slightly offset times.

**Row anatomy**

Each row pairs a circular avatar placeholder with two text-line placeholders of different widths (a wider "title" line, a narrower "subtitle" line) — the standard notification/comment/message-row skeleton shape. All three elements per row share one \`animation-delay\`, so the avatar and its two lines pulse together as a unit while differing from the row above and below.

**Tunable and data-driven**

Change \`ROWS\` to render any list length, or \`STAGGER_MS\` to make the wave travel faster (a tighter, snappier ripple) or slower (a more languid roll). Because the delay is computed from the loop index rather than written as CSS \`nth-child\` rules, this pattern scales to lists of any length without touching the stylesheet. Pair it with a [skeleton card grid](/ui-snippets/skeleton-card-grid/) for a grid variant, or a [skeleton table](/ui-snippets/skeleton-table/) for tabular data.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `7 skeleton rows render inside a card, each pulsing in sequence.` },
      { title: 'Watch the wave', text: `The shimmer visibly rolls from the top row to the bottom, not all at once.` },
      { title: 'Change the row count', text: `Edit the ROWS constant — delays are computed automatically for any count.` },
      { title: 'Adjust the wave speed', text: `Change STAGGER_MS to make the ripple faster or slower.` },
      { title: 'Swap the row shape', text: `Edit the innerHTML template to match your real list item layout.` },
      { title: 'Replace with real content', text: `Once data loads, swap the skeleton rows for actual list items.` },
    ] },
    features: [
      { title: 'Real per-index delay', text: `animation-delay is computed from each row's actual loop index.` },
      { title: 'Top-to-bottom wave', text: `Phase-offset shimmer reads as motion travelling down the list.` },
      { title: 'Scales to any length', text: `Add rows and delays extend automatically — no nth-child rules to update.` },
      { title: 'Avatar + two-line rows', text: `The common notification/comment row shape out of the box.` },
      { title: 'Grouped delay per row', text: `Avatar and both text lines in a row share one delay, pulsing as a unit.` },
      { title: 'Tunable stagger speed', text: `One STAGGER_MS constant controls how fast the wave rolls.` },
      { title: 'Dark, card-based layout', text: `A ready-to-use notification list container.` },
      { title: 'Zero dependencies', text: `Pure CSS keyframes plus a small JS loop — no library.` },
    ],
    useCases: [
      { title: 'Notification lists', text: `The exact shape shown here — pair with a [comment thread](/ui-snippets/comment-thread/) for real content.` },
      { title: 'Activity feeds', text: `Show a loading wave before an [activity feed](/ui-snippets/activity-feed/) populates.` },
      { title: 'Chat conversation lists', text: `A loading state for a chat sidebar list of conversations.` },
      { title: 'Search results', text: `Indicate results loading with a directional wave instead of a flat flash.` },
      { title: 'Comment sections', text: `Show placeholders while a [comment thread](/ui-snippets/comment-thread/) fetches.` },
      { title: 'Learning stagger techniques', text: `A reference for computing per-item delay from index rather than hand-writing CSS.` },
      { icon: 'CODE', title: 'Related: Particle Swarm Loader', desc: 'See the [Particle Swarm Loader](/ui-snippets/loader-particle-swarm-orbit/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the per-row delay actually computed?', a: `In the JS loop that builds the rows, each row's shimmer elements get their animationDelay style property set to (i * STAGGER_MS) + 'ms', where i is that row's real index in the loop. This is a genuine computed value, not seven hand-written CSS nth-child rules, so it automatically scales to any ROWS count.` },
      { q: 'Why does staggering the delay create a visible wave?', a: `All rows share the identical shimmer keyframe and duration, but because each starts at a different point along that cycle, at any given instant the rows are all at different phases of the same animation — some brighter, some darker. That phase gradient moving down the list is what the eye perceives as a wave travelling top-to-bottom, the same principle behind a stadium wave.` },
      { q: 'How do I change how fast the wave rolls?', a: `Adjust the STAGGER_MS constant. A smaller value (e.g. 40ms) tightens the gap between rows so the wave feels quick and snappy; a larger value (e.g. 150ms) spreads it out into a slower, more visible roll. The shimmer's own 1.6s duration in the CSS keyframe can also be changed independently.` },
      { q: 'Does this still work if the list has a different number of rows?', a: `Yes — because the delay is computed from the loop index rather than written as fixed CSS selectors, rendering 3 rows or 20 rows both work correctly with zero CSS changes. Just change the ROWS constant or drive the loop from your real expected item count.` },
      { q: 'How do I use this staggered skeleton list in React, Vue, or Angular?', a: `Render an array of placeholder objects (Array.from({length: rowCount})) and map over it, applying animationDelay: index * staggerMs + 'ms' as an inline style on each row's shimmer elements — the same computed-delay technique, just expressed through the framework's templating instead of a DOM loop.` },
    ],
    aiPrompt: {
      paragraph: `Rather than eyeballing how the ripple effect is produced, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting each row's animation-delay from its real loop index — rather than writing separate nth-child CSS rules — is what lets the stagger pattern scale automatically to any list length, and why every row sharing one identical shimmer keyframe but starting at different phase offsets is what produces the top-to-bottom wave illusion. The same assistant can help optimize it, for example checking whether inline style-based delays versus CSS custom properties set per row perform differently at very large row counts. It's also useful for extending the pattern: ask it to reverse the wave direction, make the stagger accelerate rather than stay linear down the list, or add a companion fade-in when the real content replaces each skeleton row (staggered the same way). Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a skeleton loading list in plain HTML, CSS, and JavaScript where the shimmer animation visibly ripples down the list rather than every row flashing in perfect unison — no library.

Requirements:
- Generate a configurable number of list rows dynamically in JavaScript from a loop (not hand-written as static HTML), each row containing a circular avatar placeholder and two text-line placeholders of different widths.
- Every placeholder element must use a CSS keyframe shimmer animation (an oversized gradient background whose background-position animates on an infinite loop) — identical duration and easing for every row.
- In the JavaScript loop that builds each row, compute a real animation-delay value from that row's own index (for example index times a fixed millisecond constant) and apply it via the element's style property to every shimmer element within that row, so the avatar and both text lines in a row share one delay while each row differs from the row above and below it.
- Confirm that because the delay is computed from the loop index rather than hard-coded per row in CSS, changing the total row count automatically produces correctly staggered delays for every row with no additional CSS rules.
- Expose one easily editable constant controlling the stagger interval in milliseconds, so the wave's speed (how tightly rows follow each other) can be tuned without touching the per-row logic.
- Style it as a realistic notification or comment list card, with each row separated by a thin divider.`,
    },
  },
};

export default loaderSkeletonListStaggered;
