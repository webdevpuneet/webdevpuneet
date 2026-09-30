const scrolloutProgressNavDots = {
  id: 'scrollout-progress-nav-dots',
  title: 'ScrollOut Progress Nav Dots',
  lastmod: '2026-09-17',
  category: 'navigation',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scroll-out@2.2.12/dist/scroll-out.min.js'],
  html: `<nav class="spd-rail" id="spdRail">
  <button class="spd-dot" data-target="s1" aria-label="Intro"><span class="spd-label">Intro</span></button>
  <button class="spd-dot" data-target="s2" aria-label="Approach"><span class="spd-label">Approach</span></button>
  <button class="spd-dot" data-target="s3" aria-label="Details"><span class="spd-label">Details</span></button>
  <button class="spd-dot" data-target="s4" aria-label="Results"><span class="spd-label">Results</span></button>
  <button class="spd-dot" data-target="s5" aria-label="Contact"><span class="spd-label">Contact</span></button>
</nav>
<main class="spd-main">
  <section class="spd-section" id="s1" data-scroll>
    <span class="spd-tag">01 · Intro</span>
    <h2>Scroll-tracked navigation</h2>
    <p>ScrollOut's onShown callback tells this page which section is currently visible, and the matching dot lights up.</p>
  </section>
  <section class="spd-section" id="s2" data-scroll>
    <span class="spd-tag">02 · Approach</span>
    <h2>One callback, five dots</h2>
    <p>No IntersectionObserver boilerplate here — ScrollOut wraps it and exposes onShown/onHidden directly.</p>
  </section>
  <section class="spd-section" id="s3" data-scroll>
    <span class="spd-tag">03 · Details</span>
    <h2>Click a dot to jump</h2>
    <p>Each dot smooth-scrolls to its section, and ScrollOut picks up the new active section once the scroll settles.</p>
  </section>
  <section class="spd-section" id="s4" data-scroll>
    <span class="spd-tag">04 · Results</span>
    <h2>Works both directions</h2>
    <p>Scrolling up deactivates a section's dot the same way scrolling down activates the next one.</p>
  </section>
  <section class="spd-section" id="s5" data-scroll>
    <span class="spd-tag">05 · Contact</span>
    <h2>End of the page</h2>
    <p>Five sections, five dots, one small ScrollOut config.</p>
  </section>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d18;color:#fff}
.spd-rail{position:fixed;right:22px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:14px;z-index:10}
.spd-dot{position:relative;width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);cursor:pointer;padding:0;transition:background .2s,transform .2s,border-color .2s}
.spd-dot:hover{transform:scale(1.3)}
.spd-dot.is-active{background:#38bdf8;border-color:#38bdf8;transform:scale(1.35);box-shadow:0 0 0 5px rgba(56,189,248,.18)}
.spd-label{position:absolute;right:22px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:11.5px;font-weight:700;color:#0b0d18;background:#38bdf8;padding:4px 10px;border-radius:6px;opacity:0;pointer-events:none;transition:opacity .16s}
.spd-dot:hover .spd-label{opacity:1}
.spd-dot:not(.is-active) .spd-label{background:rgba(255,255,255,.9)}

.spd-main{padding:0 90px 0 32px}
@media(max-width:640px){.spd-main{padding:0 60px 0 20px}.spd-rail{right:12px}}
.spd-section{min-height:100vh;display:flex;flex-direction:column;justify-content:center;max-width:560px;margin:0 auto;border-bottom:1px solid rgba(255,255,255,.06)}
.spd-tag{display:inline-block;width:fit-content;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.3);padding:5px 12px;border-radius:99px;margin-bottom:16px}
.spd-section h2{font-size:clamp(26px,5vw,40px);font-weight:800;letter-spacing:-.02em;margin-bottom:12px}
.spd-section p{font-size:15px;color:#9199bb;line-height:1.6;max-width:440px}`,

  js: `// ScrollOut tracks every element matching its targets selector (default "[data-scroll]")
// and fires onShown/onHidden as each one crosses the visibility threshold. We don't touch
// IntersectionObserver directly at all -- ScrollOut owns that plumbing and just tells us
// which section is currently in view.
var dots = document.querySelectorAll('.spd-dot');

function setActive(id) {
  dots.forEach(function (dot) {
    dot.classList.toggle('is-active', dot.dataset.target === id);
  });
}

ScrollOut({
  targets: '.spd-section',
  threshold: 0.5,
  onShown: function (el) {
    setActive(el.id);
  }
});

dots.forEach(function (dot) {
  dot.addEventListener('click', function () {
    var target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// Activate the first dot immediately so the rail isn't empty before any scroll event fires.
setActive('s1');`,

  seo: {
    title: 'ScrollOut Progress Nav Dots — Scroll-Synced Navigation Snippet',
    description: 'A fixed dot rail that tracks the currently-visible page section with ScrollOut and smooth-scrolls to a section on click. Exports to React, Vue & Tailwind.',
    about: {
      title: 'ScrollOut Progress Nav Dots — Section Tracking Without Hand-Rolled Observers',
      description: `A "which section is the user looking at" nav is one of the most common places developers reach for \`IntersectionObserver\` directly — set up an observer, give it a threshold, track a Set of currently-intersecting entries, and diff it every callback. **ScrollOut** exists specifically to remove that boilerplate: it wraps the observer internally and gives you two callbacks, \`onShown\` and \`onHidden\`, that already tell you exactly which element crossed the line.

## The configuration that does the tracking

\`\`\`js
ScrollOut({
  targets: '.spd-section',
  threshold: 0.5,
  onShown: function (el) { setActive(el.id); }
});
\`\`\`

\`targets\` overrides ScrollOut's default selector (\`[data-scroll]\`) with an explicit \`.spd-section\` class, so every section in the page is tracked without needing a \`data-scroll\` attribute on each one (this snippet still adds \`data-scroll\` to the sections for clarity and to match ScrollOut's documented default pattern, but \`targets\` is what actually drives the selection here). \`threshold: 0.5\` tells ScrollOut a section only counts as "shown" once at least half of it is inside the viewport — a deliberate choice for a nav-dot use case, because a lower threshold like 0.1 would flip the active dot the instant a section's top edge barely peeks into view, well before it's realistically the section the user is reading.

## Why onShown alone is enough here

ScrollOut also exposes \`onHidden\` for elements leaving view, but this snippet doesn't use it. Because \`setActive()\` clears every other dot's \`.is-active\` class before applying it to the new one, there's no need to explicitly "turn off" the previous section's dot when it hides — the next section's \`onShown\` firing already handles that as a side effect of how \`setActive\` is written. This is a common simplification once you notice \`onShown\`/\`onHidden\` don't have to be handled symmetrically; use only the one your state model actually needs.

## Click-to-scroll and the loop-back problem

Clicking a dot calls \`scrollIntoView({ behavior: 'smooth', block: 'center' })\` on the target section. Because that scroll itself moves sections through the viewport, ScrollOut's own visibility tracking naturally fires \`onShown\` again once the destination section crosses the 0.5 threshold mid-scroll — so the active dot updates itself for free as the smooth scroll lands, with no manual "which dot did I click" bookkeeping required in the click handler.

## Initial state

\`setActive('s1')\` runs once at load, outside of any ScrollOut callback. Without it, the rail would show zero active dots until the user's first scroll crosses a 0.5 threshold, which looks broken on a page that loads scrolled to the top with the first section already fully visible.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ScrollOut CDN script', text: 'One script tag, no CSS required — ScrollOut has no stylesheet of its own.' },
      { title: 'Mark each section as a target', text: 'Give sections a shared class or data-scroll attribute so ScrollOut\'s targets option can find them.' },
      { title: 'Call ScrollOut with onShown', text: 'Pass threshold: 0.5 and an onShown callback that reads el.id and updates the active dot.' },
      { title: 'Match dots to sections by data-target', text: 'Each dot button carries a data-target matching a section id.' },
      { title: 'Wire click-to-scroll', text: 'scrollIntoView({ behavior: "smooth" }) on the matching section for each dot.' },
      { title: 'Set the initial active dot manually', text: 'Call setActive() once on load since ScrollOut only fires on scroll/visibility change.' },
    ] },
    features: [
      { title: 'No manual IntersectionObserver', text: 'ScrollOut wraps the observer internally and exposes onShown/onHidden directly.' },
      { title: 'Threshold-based activation', text: 'threshold: 0.5 avoids flipping the active dot on a barely-visible section edge.' },
      { title: 'Selector-based targets', text: 'The targets option points ScrollOut at any CSS selector, not just [data-scroll].' },
      { title: 'Self-correcting active state', text: 'onShown alone is enough because setActive clears every other dot first.' },
      { title: 'Click-to-scroll dots', text: 'Each dot smooth-scrolls to its section and the active state follows automatically.' },
      { title: 'Hover labels', text: 'A small label slides into view on dot hover to name the section without cluttering the rail.' },
      { title: 'Sensible initial state', text: 'The first dot is activated on load rather than waiting for the first scroll event.' },
      { title: 'Fixed positioning', text: 'The rail stays pinned to the viewport edge independent of page scroll position.' },
    ],
    useCases: [
      { icon: 'FLOW', title: 'Long-form landing pages', text: 'Give visitors a persistent sense of progress through a scrollytelling page.' },
      { icon: 'CODE', title: 'Documentation sidebars', text: 'Track which doc section is in view the same way a table-of-contents highlight does.' },
      { icon: 'DESIGN', title: 'Portfolio case studies', text: 'A minimal dot rail that doubles as both navigation and a progress indicator.' },
      { icon: 'LEARN', title: 'Teaching ScrollOut basics', text: 'A compact example of targets, threshold, and onShown before more advanced cssProps usage.' },
    ],
    faqs: [
      { q: 'How does ScrollOut know which section is "active"?', a: 'ScrollOut tracks every element matched by the targets option using an internal IntersectionObserver-based visibility check, and calls onShown(el) whenever one crosses the configured threshold going into view. This snippet reads el.id inside onShown and toggles the matching dot\'s active class.' },
      { q: 'What does threshold: 0.5 control?', a: 'It sets how much of a target element must be visible before ScrollOut considers it "shown" — 0.5 means at least half the section must be in the viewport. A lower value would activate a dot as soon as a sliver of the next section appears, which reads as premature.' },
      { q: 'Why is onHidden not used in this snippet?', a: 'Because setActive() removes the active class from every dot before adding it to the new one, there\'s no separate bookkeeping needed when a section leaves view — the next onShown call already clears the previous state as a side effect.' },
      { q: 'Does clicking a dot fight with ScrollOut\'s own tracking?', a: 'No — scrollIntoView triggers a real scroll, and ScrollOut\'s visibility tracking picks up the destination section crossing the threshold mid-scroll just like any user-driven scroll, so the active dot updates itself without special-casing the click.' },
      { q: 'Why call setActive("s1") manually at the end of the script?', a: 'ScrollOut only fires callbacks in response to scroll or visibility changes. On initial page load, before any scroll event happens, no dot would be marked active without this manual call — even though the first section is already fully visible.' },
      { q: 'Can targets point at something other than a CSS class?', a: 'Yes — ScrollOut\'s targets option accepts any valid CSS selector string, or a NodeList/element array. It defaults to [data-scroll] if omitted, which is why this snippet\'s sections still carry that attribute for documentation clarity even though targets overrides it.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good one to have an AI walk through the division of labor between ScrollOut's tracking and your own state logic. Paste it into an assistant like Claude and ask exactly what onShown receives as its el argument and how threshold changes when it fires relative to a section's scroll position. Then ask why this code gets away with using only onShown and never onHidden — the answer should point at how setActive() clears every dot before activating one, making onHidden redundant for this particular state model. To extend it: ask for a version that also updates browser history (history.replaceState) with the active section's hash as it changes, a version that shows scroll progress within the active section (not just which section is active) using ScrollOut's cssProps and --visible-y variable, or one that handles a page where sections have very different heights without the short ones feeling like they flash past.`,
      prompt: `Build a fixed side-rail navigation of dot indicators using ScrollOut (v2, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A page with 5 full-height sections, each with a heading and short paragraph, and a fixed vertical rail of 5 small circular dot buttons pinned to the right edge of the viewport, one per section.
- Each dot has a data-target attribute matching a section's id. Initialize tracking with ScrollOut({ targets: '.section-class', threshold: 0.5, onShown: function(el) { ... } }) and inside onShown, read el.id and mark the dot whose data-target matches it as active (an is-active class), clearing that class from every other dot first.
- Do not use onHidden — rely on onShown alone clearing prior state, and explain in a comment why that's sufficient here.
- Clicking a dot calls scrollIntoView({ behavior: 'smooth', block: 'center' }) on its matching section, and the active dot should update itself automatically via ScrollOut's own tracking as the smooth scroll lands — no manual state-setting inside the click handler beyond triggering the scroll.
- Manually activate the first dot once on script load (outside any ScrollOut callback), since ScrollOut only fires in response to scroll/visibility changes and the page loads already showing the first section.
- Give each dot a small hover label showing the section name, and style the whole thing as a minimal dark-themed rail with a glowing active state.`,
    },
  },
};

export default scrolloutProgressNavDots;
