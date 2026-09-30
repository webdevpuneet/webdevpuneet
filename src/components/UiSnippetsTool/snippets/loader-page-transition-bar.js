const loaderPageTransitionBar = {
  id: 'loader-page-transition-bar',
  title: 'Page Transition Progress Bar',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="pt-bar" id="ptBar"></div>

<div class="pt-demo">
  <div class="pt-window">
    <div class="pt-current" id="ptCurrent">/dashboard</div>
    <nav class="pt-links">
      <button type="button" class="pt-link" data-to="/settings">/settings</button>
      <button type="button" class="pt-link" data-to="/reports">/reports</button>
      <button type="button" class="pt-link" data-to="/billing">/billing</button>
    </nav>
  </div>
  <p class="pt-hint">Click a route — the bar climbs, holds mid-flight, then completes.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#cbd5e1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pt-bar{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#f472b6,#fb923c);z-index:9999;opacity:0}
.pt-bar.pt-visible{opacity:1}
.pt-bar.pt-fading{transition:opacity .4s ease}

.pt-demo{width:100%;max-width:380px;text-align:center}
.pt-window{background:#131c30;border:1px solid #223055;border-radius:14px;padding:22px;text-align:left}
.pt-current{font-size:12px;font-weight:700;color:#64748b;margin-bottom:14px}
.pt-current b{color:#f472b6}
.pt-links{display:flex;flex-direction:column;gap:8px}
.pt-link{background:#1a2540;border:1px solid #2a3a63;color:#e2e8f0;border-radius:9px;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;text-align:left;transition:background .15s}
.pt-link:hover{background:#233458}
.pt-hint{font-size:12px;color:#64748b;margin-top:16px}`,

  js: `var bar = document.getElementById('ptBar');
var currentLabel = document.getElementById('ptCurrent');
var links = document.querySelectorAll('.pt-link');
var navTimer = null;

// Realistic hold-then-complete curve: race to ~90% fast, hold there
// (simulating an in-flight request), then jump to 100% and fade — distinct
// from a simple linear width fill.
function navigate(path) {
  clearTimeout(navTimer);
  bar.classList.remove('pt-fading');
  bar.classList.add('pt-visible');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  // Force reflow so the 0% width is committed before the transition starts.
  void bar.offsetWidth;

  bar.style.transition = 'width .45s cubic-bezier(.2,.7,.3,1)';
  bar.style.width = '82%';

  // Hold at 82% — this is the "in-flight request" phase; nothing moves
  // until the simulated navigation actually resolves.
  navTimer = setTimeout(function () {
    bar.style.transition = 'width .3s ease-out';
    bar.style.width = '100%';

    setTimeout(function () {
      bar.classList.add('pt-fading');
      bar.classList.remove('pt-visible');
      currentLabel.innerHTML = 'Now at <b>' + path + '</b>';
      setTimeout(function () {
        bar.style.transition = 'none';
        bar.style.width = '0%';
      }, 420);
    }, 320);
  }, 900);
}

links.forEach(function (link) {
  link.addEventListener('click', function () {
    navigate(link.getAttribute('data-to'));
  });
});`,

  seo: {
    title: 'Page Transition Progress Bar — Route-Change Loading Bar in HTML CSS JS',
    description: `A top-of-page bar triggered by a simulated navigation lifecycle: climbs fast, holds mid-flight, then completes and fades — a realistic curve, not linear. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Page Transition Progress Bar — Tied to a Simulated Navigation Lifecycle',
      description: `This is the thin bar that slides across the top of the page during a client-side route change — the same family as a [top loading bar](/ui-snippets/top-loading-bar/), but built around a different mechanic: instead of a continuous rAF-eased trickle toward 90%, this snippet drives the bar through three discrete, explicit phases of one simulated navigation — climb, hold, complete — using plain CSS \`width\` transitions with different easing per phase, triggered by clicking a route link in the demo.

**How this differs from a continuous trickle bar**

A trickle-style bar (see the [top loading bar](/ui-snippets/top-loading-bar/) snippet) uses a \`setInterval\` to keep nudging a target value upward and a \`requestAnimationFrame\` loop to ease the displayed width toward it continuously, so the width is recalculated every frame for as long as the load takes. This snippet takes a simpler, phase-based approach on purpose: a single \`navigate()\` call sets the width straight to 82% with one CSS transition, waits a fixed hold period (standing in for "request in flight"), then transitions straight to 100% with a second, different easing curve. There is no per-frame JavaScript loop at all — every motion is a CSS \`width\` transition, and the "curve" comes from choosing three different states and three different transition timings rather than continuously recomputing a target.

**Three explicit phases, not one continuous animation**

\`navigate(path)\` resets the bar to 0% (with the transition disabled and a forced reflow so the reset isn't animated), then transitions to 82% quickly with a snappy \`cubic-bezier\`, holds unchanged for 900ms while nothing animates (simulating the actual request being in flight), then transitions the remaining distance to 100% with a softer ease-out — visibly two different speeds for the "climb" and "complete" segments, which is what a realistic route change looks like: fast optimistic progress, a pause for the real work, then a quick finish.

**Route demo, not a generic trigger**

Clicking one of the three route buttons calls \`navigate()\` with that path and, once the bar completes and fades, updates a "Now at" label — tying the whole animation explicitly to a simulated navigation event rather than a standalone play button, closer to how you'd wire this to real router lifecycle events (\`beforeEach\`/\`afterEach\`, \`routeChangeStart\`/\`routeChangeComplete\`).

**Wiring it to a real router**

Call \`navigate(path)\` — or split it into a \`start()\`/\`finish()\` pair if your router's start and complete events fire far apart — from your router's navigation hooks. Pair it with a [skeleton loader](/ui-snippets/skeleton-loader/) for the incoming page's content placeholder, or an [indeterminate bar](/ui-snippets/indeterminate-bar/) for in-page async work that isn't a full navigation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mock app window with three route buttons renders below a hidden top bar.` },
      { title: 'Click a route button', text: `The bar appears and climbs quickly to 82% with a snappy ease.` },
      { title: 'Watch it hold', text: `The bar pauses at 82% for ~900ms — the simulated in-flight request.` },
      { title: 'Watch it complete', text: `It eases the rest of the way to 100%, then fades out and resets.` },
      { title: 'See the route update', text: `Once the bar fades, the "current route" label updates to the clicked path.` },
      { title: 'Wire to a real router', text: `Call navigate() from your router's navigation start hook with the target path.` },
    ] },
    features: [
      { title: 'Three-phase curve', text: `Climb to 82%, hold, then complete to 100% — not a single linear fill.` },
      { title: 'Different easing per phase', text: `A snappy climb and a softer completion ease, not one uniform transition.` },
      { title: 'No per-frame JS loop', text: `Pure CSS width transitions per phase — no requestAnimationFrame ticking.` },
      { title: 'Tied to a real navigation event', text: `Triggered by a route click, not a standalone demo button.` },
      { title: 'Explicit hold phase', text: `A fixed pause stands in for the request actually being in flight.` },
      { title: 'Clean reset', text: `A forced reflow ensures the width resets to 0% without animating backward.` },
      { title: 'Fade-and-reset finish', text: `Opacity fades out after completion, then width resets for the next run.` },
      { title: 'Framework-portable', text: `A single navigate(path) function is all you need to call from a router hook.` },
    ],
    useCases: [
      { title: 'SPA route transitions', text: `Fire on router navigation start/complete events in React/Vue/Angular routers.` },
      { title: 'Client-side page loads', text: `Complements a [skeleton loader](/ui-snippets/skeleton-loader/) for the incoming view.` },
      { title: 'Tab or view switches', text: `Signal a heavier in-app view change that involves a data fetch.` },
      { title: 'Deep-link / redirect flows', text: `Show progress while a redirect chain resolves before landing.` },
      { title: 'Multi-step app navigation', text: `Pair with a [segmented progress](/ui-snippets/segmented-progress/) bar for the step content itself.` },
      { title: 'Comparing loader curves', text: `A reference alongside a [top loading bar](/ui-snippets/top-loading-bar/) and an [indeterminate bar](/ui-snippets/indeterminate-bar/) for choosing a curve shape.` },
      { icon: 'CODE', title: 'Related: Progress Bar with Milestone Labels', desc: 'See the [Progress Bar with Milestone Labels](/ui-snippets/loader-milestone-progress-bar/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from the existing top loading bar snippet?', a: `The top loading bar uses a continuous requestAnimationFrame loop plus a setInterval "trickle" that keeps nudging a moving target toward 90% for as long as the load takes, recalculating width every frame. This snippet instead defines three fixed phases — climb to 82%, hold for a set duration, complete to 100% — each driven by a single CSS width transition with its own easing curve, and there is no per-frame JavaScript at all. It trades the trickle bar's open-ended "keep faking progress" behavior for a fixed, three-beat curve tied to one simulated navigation.` },
      { q: 'Why hold at 82% instead of continuing to climb?', a: `The hold represents the request actually being in flight — the point where the app has no more information to fake progress with and is genuinely waiting. Freezing the bar there for a realistic pause (900ms in the demo) rather than continuing to inch upward makes the eventual jump to 100% read as a real completion event rather than an animation simply running out.` },
      { q: 'How do I hook this into my router?', a: `Call navigate(path) when your router's navigation starts (e.g. Vue Router's beforeEach, Next.js's routeChangeStart, React Router's navigation start). If your router exposes separate start and complete events, split navigate() into two functions — one that climbs to 82% and holds indefinitely, and one that completes to 100% and fades — and call the second when the real navigation actually resolves instead of using a fixed timeout.` },
      { q: 'Why use CSS width transitions instead of a JS-driven loop like the trickle bar?', a: `Because this bar's motion is a fixed, known sequence of states (0% to 82% to 100%) rather than an open-ended approach toward an uncertain endpoint, a CSS transition per phase is simpler and needs no per-frame JavaScript. The trickle bar's rAF loop exists specifically because its target keeps moving unpredictably; this bar's targets are fixed values, so CSS transitions are sufficient and lighter-weight.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Wrap navigate(path) in a small hook or service and call it from your router's navigation guards — a useEffect tied to route changes in React, a beforeEach/afterEach pair in Vue Router, or a Router event subscription in Angular. Keep the bar as a single fixed element outside your route-specific components so it persists across navigations.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to walk through why this bar's navigate() function uses three separate CSS width transitions with different durations and easing curves instead of one continuous requestAnimationFrame-driven trickle like a typical NProgress-style bar, and why the forced reflow (void bar.offsetWidth) before starting the climb transition matters for getting a clean reset on repeated navigations. It's also worth asking how you'd adapt the fixed 900ms hold into a hold that lasts until a real navigation promise resolves, rather than a fixed timeout — which is the main thing standing between this demo and a production router integration. For extending it, ask for a version that shows a different color or duration profile for slow versus fast navigations, or that falls back to an indeterminate hold if the real request takes far longer than the demo's fixed timing assumes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a top-of-page navigation progress bar in plain HTML, CSS, and JavaScript that is explicitly tied to a simulated route-change lifecycle with three distinct phases — no requestAnimationFrame loop, no continuous trickle interval.

Requirements:
- A thin, fixed-position bar pinned to the very top of the viewport with a high z-index, hidden (zero opacity) until a navigation is triggered.
- A demo UI with at least two clickable "route" links/buttons that each trigger a navigate(path) function representing a simulated client-side route change.
- Phase 1 (climb): on navigate(), reset the bar's width to 0% without animating the reset (disable the transition, force a layout reflow, then re-enable the transition), then transition the width up to roughly 80-85% using a relatively fast, snappy easing curve.
- Phase 2 (hold): after reaching roughly 80-85%, the bar must hold at that width completely unchanged for a realistic pause (several hundred milliseconds to around a second), representing the point where a real request is in flight and no more optimistic progress can be faked.
- Phase 3 (complete and fade): after the hold, transition the width the remaining distance to 100% using a different, softer easing curve than the climb phase, then fade the bar out via opacity, and only after the fade finishes reset its width back to 0% (with the transition disabled again) so it's ready for the next navigation.
- After the bar completes and fades, update a piece of demo UI (such as a "current route" label) to reflect the path that was navigated to, so the whole sequence reads as a real navigation completing, not just a bar animating in isolation.
- Structure the code so it is clear where you would call the climb-and-hold portion from a router's "navigation started" event and the complete portion from its "navigation finished" event in a real app.`,
    },
  },
};

export default loaderPageTransitionBar;
