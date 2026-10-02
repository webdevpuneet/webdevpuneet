const scrollStickyFeatures = {
  id: 'scroll-sticky-features',
  title: 'Sticky Scroll Features',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<section class="ssf-intro"><p>Scroll ↓</p></section>
<section class="ssf-wrap">
  <div class="ssf-steps">
    <div class="ssf-step" data-panel="0">
      <span class="ssf-num">01</span>
      <h3>Connect your data</h3>
      <p>Point the importer at any source — a CSV, a database, or a live API — and watch it map fields automatically.</p>
    </div>
    <div class="ssf-step" data-panel="1">
      <span class="ssf-num">02</span>
      <h3>Build the pipeline</h3>
      <p>Drag transforms onto the canvas. Every step previews its output instantly on a sample of real rows.</p>
    </div>
    <div class="ssf-step" data-panel="2">
      <span class="ssf-num">03</span>
      <h3>Ship the dashboard</h3>
      <p>Publish to a live URL with access controls. Charts refresh on a schedule you set — no servers to babysit.</p>
    </div>
    <div class="ssf-step" data-panel="3">
      <span class="ssf-num">04</span>
      <h3>Alert on anomalies</h3>
      <p>Set thresholds once. When a metric drifts, the right person gets pinged in Slack within a minute.</p>
    </div>
  </div>
  <div class="ssf-media">
    <div class="ssf-frame">
      <div class="ssf-panel is-active" style="--pc1:#6366f1;--pc2:#22d3ee"><span>📥</span><em>Importer</em></div>
      <div class="ssf-panel" style="--pc1:#a855f7;--pc2:#ec4899"><span>🧩</span><em>Pipeline canvas</em></div>
      <div class="ssf-panel" style="--pc1:#10b981;--pc2:#84cc16"><span>📊</span><em>Live dashboard</em></div>
      <div class="ssf-panel" style="--pc1:#f59e0b;--pc2:#ef4444"><span>🔔</span><em>Alerting</em></div>
      <div class="ssf-dots" id="ssfDots"></div>
    </div>
  </div>
</section>
<section class="ssf-outro"><p>Four steps scrolled past one sticky panel.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.ssf-intro,.ssf-outro{min-height:60vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.ssf-wrap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,72px);max-width:1080px;margin:0 auto;padding:0 24px}
.ssf-step{min-height:88vh;display:flex;flex-direction:column;justify-content:center;gap:12px;opacity:.28;transition:opacity .4s}
.ssf-step.is-active{opacity:1}
.ssf-num{font-size:13px;font-weight:700;letter-spacing:.2em;color:#9fb4ff}
.ssf-step h3{font-size:clamp(24px,3.6vw,36px);font-weight:800;letter-spacing:-.02em}
.ssf-step p{color:#aeb4ca;font-size:16px;line-height:1.65;max-width:400px}
.ssf-media{position:relative}
.ssf-frame{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center}
.ssf-panel{position:absolute;width:min(380px,86%);aspect-ratio:4/3;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:linear-gradient(135deg,var(--pc1),var(--pc2));box-shadow:0 30px 70px rgba(0,0,0,.5);opacity:0;transform:scale(.9) translateY(26px);transition:opacity .5s,transform .5s cubic-bezier(.22,1,.36,1)}
.ssf-panel.is-active{opacity:1;transform:scale(1) translateY(0)}
.ssf-panel span{font-size:52px}
.ssf-panel em{font-style:normal;font-weight:700;font-size:17px;letter-spacing:.02em}
.ssf-dots{position:absolute;bottom:14vh;display:flex;gap:8px}
.ssf-dots i{width:8px;height:8px;border-radius:99px;background:rgba(255,255,255,.22);transition:background .3s,width .3s}
.ssf-dots i.is-active{background:#fff;width:22px}
@media (max-width:760px){.ssf-wrap{grid-template-columns:1fr}.ssf-media{display:none}.ssf-step{opacity:1;min-height:60vh}}`,

  js: `var steps = Array.prototype.slice.call(document.querySelectorAll('.ssf-step'));
var panels = document.querySelectorAll('.ssf-panel');
var dotsWrap = document.getElementById('ssfDots');

// One dot per panel
panels.forEach(function () { dotsWrap.appendChild(document.createElement('i')); });
var dots = dotsWrap.children;

function activate(index) {
  for (var i = 0; i < panels.length; i++) {
    panels[i].classList.toggle('is-active', i === index);
    dots[i].classList.toggle('is-active', i === index);
    steps[i].classList.toggle('is-active', i === index);
  }
}
activate(0);

// A step becomes active when it crosses the middle band of the viewport.
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      activate(Number(entry.target.getAttribute('data-panel')));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

steps.forEach(function (step) { observer.observe(step); });`,

  seo: {
    title: 'Sticky Scroll Features — Free HTML CSS JS Snippet',
    description: `Two-column sticky scroll showcase: feature text scrolls past a pinned media panel that swaps per step via IntersectionObserver. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Sticky Scroll Features — Text Scrolls, the Media Panel Stays and Swaps',
      description: `The sticky scroll feature section is the two-column layout on nearly every modern SaaS landing page: feature copy scrolls up the left column while a media panel on the right stays pinned in place, swapping its content each time a new step reaches the middle of the viewport. This snippet builds it with plain HTML, CSS \`position: sticky\`, and an IntersectionObserver — no animation library required.

**position: sticky does the pinning, not JavaScript**

The right column's \`.ssf-frame\` is \`position: sticky; top: 0; height: 100vh\`. Because its parent \`.ssf-media\` grid track is as tall as all four steps combined, the frame rides along fixed on screen for the entire section and releases naturally at both ends. That's the whole pinning mechanism — no scroll listeners, no transform math, and no layout jump when the section starts or ends, which is the classic bug in JS-pinned versions.

**A middle-band IntersectionObserver picks the active step**

Each text step is observed with \`rootMargin: '-45% 0px -45% 0px'\`, which shrinks the observer's viewport to a thin 10%-tall band across the middle of the screen. A step only "intersects" while it occupies that band, so exactly one step is active at a time and the swap happens when a step's content is centered — where the reader is actually looking — rather than when its edge touches the viewport top.

**Panels crossfade by class, animated purely in CSS**

All four media panels are absolutely stacked inside the sticky frame. \`activate(i)\` toggles a single \`is-active\` class; CSS transitions handle the rest — inactive panels sit at \`opacity: 0; transform: scale(.9) translateY(26px)\`, and the active one eases up to full size with a \`cubic-bezier(.22,1,.36,1)\` overshoot curve. Keeping the animation in CSS means the observer callback does no style math and the crossfade runs compositor-only.

**Steps dim instead of disappearing**

Inactive text steps stay visible at \`opacity: .28\`, so the reader always sees the sequence context — what came before, what's next — while the active step reads at full contrast. The dots under the media panel mirror the same index, stretching the active dot into a pill for a subtle progress affordance.

**Each step is 88vh tall on purpose**

Step height controls pacing: at ~88vh, each feature owns almost a full screen of scrolling, long enough to read the copy before the next swap fires. Shorten \`min-height\` for a snappier section or lengthen it for slower storytelling — the observer logic is height-agnostic.

**Mobile collapses to a single column**

Below 760px the media column is hidden and steps stack at full opacity, because a sticky side panel has no room on narrow screens. If you want media on mobile, an inline image per step beats a sticky frame there.

**How the middle band actually computes**

Negative \`rootMargin\` percentages shrink the observation rectangle relative to the viewport itself: \`-45%\` from the top and \`-45%\` from the bottom leaves a band spanning from 45% to 55% of the screen height. With \`threshold: 0\`, a step intersects the moment any pixel of it enters that band — so tall steps activate as soon as their leading edge reaches the center, and because two 88vh steps can't both occupy a 10%-tall band, the "exactly one active" guarantee falls out of the geometry rather than any bookkeeping code. That's also why no debouncing is needed on fast scrolls: the browser coalesces crossings into ordered callbacks.

**Customizing it**

Swap the gradient placeholder panels for screenshots, videos, or live components; add steps by duplicating a text block and a panel (the dots generate automatically). Pair it with a [scroll pin steps](/ui-snippets/scroll-pin-steps/) section for a GSAP-pinned variant, a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) below, or a [scroll spy nav](/ui-snippets/scroll-spy-nav/) for page-level navigation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `No CDN needed — sticky positioning and an observer do everything.` },
      { title: 'Scroll into the section', text: `The media panel pins while text steps scroll past.` },
      { title: 'Watch the swap point', text: `Panels change when a step reaches mid-viewport.` },
      { title: 'Check the dots', text: `The active dot stretches into a pill per step.` },
      { title: 'Resize under 760px', text: `The layout collapses to a clean single column.` },
      { title: 'Swap in real media', text: `Replace gradient panels with screenshots or video.` },
    ] },
    features: [
      { title: 'CSS-only pinning', text: `position: sticky pins the media frame.` },
      { title: 'Middle-band trigger', text: `rootMargin -45% activates centered steps.` },
      { title: 'Class-driven swap', text: `One is-active toggle crossfades panels.` },
      { title: 'Overshoot easing', text: `Panels settle with a springy cubic-bezier.` },
      { title: 'Dimmed context', text: `Inactive steps stay readable at 28% opacity.` },
      { title: 'Auto-built dots', text: `Progress dots generate from the panel count.` },
      { title: 'No scroll listener', text: `Zero per-frame JavaScript work.` },
      { title: 'Responsive collapse', text: `Single column below 760px.` },
    ],
    useCases: [
      { title: 'SaaS feature tours', text: 'Build the classic walkthrough with copy scrolling on the left while a media panel stays pinned on the right, following a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) opener.' },
      { title: 'Onboarding explainers', text: 'Show each setup stage beside its screenshot, with `position: sticky` pinning the frame and `rootMargin` of minus 45% activating centred steps.' },
      { title: 'Case study phases', text: 'Walk through process phases alongside [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) in a case study, with an `is-active` class crossfading each panel.' },
      { title: 'App showcases', text: 'Pair with [scroll phone screens](/ui-snippets/scroll-phone-screens/) for a device walkthrough, using a springy cubic-bezier overshoot on panel changes.' },
      { title: 'Documentation and pricing narratives', text: 'Anchor sections with a [scroll spy nav](/ui-snippets/scroll-spy-nav/), or lead into a [pricing card](/ui-snippets/pricing-card/) section once the tour has made its case.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Asteroid Belt Run', desc: 'See the [Three.js Scroll Asteroid Belt Run](/ui-snippets/three-scroll-asteroid-belt/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the media panel stay fixed while the text scrolls?', a: `The frame is position: sticky with top: 0 and height: 100vh inside a grid column as tall as all four steps combined. Sticky elements ride along with the viewport within their parent's bounds, so the browser pins and releases the panel natively — no scroll listeners, no transforms, and no jump at the section boundaries.` },
      { q: 'How does the snippet know which step is active?', a: `An IntersectionObserver watches every step with rootMargin: '-45% 0px -45% 0px', which shrinks the detection area to a thin band across the middle of the viewport. A step only intersects while it occupies that band, so exactly one is active at a time and swaps fire when content is centered under the reader's eyes.` },
      { q: 'Why are the panels animated with CSS classes instead of JavaScript?', a: `The observer callback only toggles is-active; CSS transitions on opacity and transform do the visual work with a cubic-bezier(.22,1,.36,1) overshoot. That keeps the crossfade compositor-only and means you can retune timing, easing, or the entrance direction entirely in the stylesheet without touching the logic.` },
      { q: 'How do I add or remove steps?', a: `Duplicate one .ssf-step block (bump its data-panel index) and one .ssf-panel with new --pc1/--pc2 gradient stops — the dots are generated from the panel count so they update automatically. Step min-height controls pacing: shorten it for a snappier section, lengthen it to give each feature more reading time.` },
      { q: 'Can the media panels be videos or live components instead of gradients?', a: `Yes — the panels are just absolutely stacked divs, so anything renders inside them. For videos, use the activate() hook to also play the incoming panel's video and pause the outgoing one, keeping only one decoding at a time; muted + playsinline lets them autoplay. Live components (charts, mini-demos) work the same way, though heavy ones should defer initialization until their first activation to keep initial load light.` },
      { q: 'How do I build this sticky scroll feature section in React, Vue, or Angular?', a: `Keep the sticky CSS as-is (Tailwind: sticky top-0 h-screen) and move the observer into a mount effect — useEffect, onMounted, or ngAfterViewInit — storing the active index in state instead of toggling classes manually. Render panels and dots from a features array, and disconnect the observer in the cleanup so it doesn't fire after unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the middle-band geometry alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why rootMargin of "-45% 0px -45% 0px" guarantees exactly one step is ever active at a time, or why position: sticky on the media frame needs its parent grid column to be as tall as all four steps combined in order to pin and release correctly. The same assistant can help optimize it — asking whether the panel crossfade's cubic-bezier overshoot curve should be tuned differently for a longer feature list, or whether real video panels would need extra logic in activate() to pause the outgoing clip and play the incoming one. It's also useful for extending the effect: ask it to add a progress bar alongside the dots, support a fifth step without manually retuning anything, or swap the gradient placeholder panels for lazy-loaded screenshots that only decode once their step activates. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "sticky scroll features" two-column showcase in plain HTML, CSS, and JavaScript using only CSS position: sticky and the native IntersectionObserver API — no animation library, no scroll event listener.

Requirements:
- A two-column CSS grid: a left column of several feature step blocks stacked vertically, each roughly 85-90% of the viewport tall and carrying a data-panel index attribute; a right column containing a media frame using position: sticky with top: 0 and height: 100vh, itself containing several absolutely-stacked panel elements (one per step) plus a row of progress dots, all starting hidden except the first.
- The sticky frame's parent grid column must be exactly as tall as all the step blocks combined (which falls out naturally from the grid layout) so the sticky element pins for the whole section and releases cleanly at both the top and bottom boundaries with no manual height calculation.
- Write an activate(index) function that toggles an is-active class on the matching panel, the matching dot, and the matching step block, and removes it from all others — all animation must happen via CSS transitions on opacity and transform (scale plus translateY) triggered purely by that class toggle, not through JavaScript-driven style animation.
- Create a single IntersectionObserver watching every step block, using a rootMargin with large negative top and bottom percentages (e.g. -45% on each side) so its effective observation area is a thin band across the vertical middle of the viewport, and threshold 0.
- In the observer's callback, call activate with the intersecting step's data-panel value converted to a number.
- Generate the progress dots dynamically in JavaScript by looping over the panel elements (not hardcoded in markup), and make inactive step blocks stay partially visible (dimmed via reduced opacity) rather than fully hidden, so the reader retains context of the whole sequence.
- Add a CSS media query that collapses to a single column and hides the sticky media entirely below a reasonable breakpoint (e.g. 760px), restoring full opacity to all steps in that mode.`,
    },
  },
};

export default scrollStickyFeatures;
