const topLoadingBar = {
  id: 'top-loading-bar',
  title: 'Top Loading Bar',
  lastmod: '2026-06-17',
  category: 'loaders',
  html: `<div class="tlb-fill" id="tlbFill"></div>

<div class="tlb-demo">
  <div class="tlb-window">
    <div class="tlb-bar-chrome"><span class="tlb-dot r"></span><span class="tlb-dot y"></span><span class="tlb-dot g"></span><span class="tlb-addr">app.example.com</span></div>
    <div class="tlb-body">
      <div class="tlb-skel l1"></div><div class="tlb-skel l2"></div><div class="tlb-skel l3"></div>
    </div>
  </div>
  <div class="tlb-controls">
    <button class="tlb-btn primary" onclick="simulate()">↻ Navigate (auto)</button>
    <button class="tlb-btn" onclick="startBar()">Start</button>
    <button class="tlb-btn" onclick="finishBar()">Finish</button>
  </div>
  <p class="tlb-hint">A YouTube/GitHub-style top progress bar — trickles up, then completes and fades.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tlb-fill{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#6366f1,#22d3ee);z-index:9999;opacity:0;transition:opacity .3s ease;border-radius:0 3px 3px 0}
.tlb-fill::after{content:'';position:absolute;right:0;top:0;height:100%;width:90px;box-shadow:0 0 11px 3px rgba(99,102,241,.7),0 0 6px 2px rgba(34,211,238,.5);transform:rotate(2deg) translateY(-1px)}

.tlb-demo{width:100%;max-width:360px;text-align:center}
.tlb-window{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.4);text-align:left}
.tlb-bar-chrome{display:flex;align-items:center;gap:6px;padding:11px 14px;background:#f8fafc;border-bottom:1px solid #f1f5f9}
.tlb-dot{width:10px;height:10px;border-radius:50%}
.tlb-dot.r{background:#f87171}.tlb-dot.y{background:#fbbf24}.tlb-dot.g{background:#34d399}
.tlb-addr{margin-left:8px;font-size:11px;color:#94a3b8;background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:3px 10px;flex:1}
.tlb-body{padding:18px}
.tlb-skel{height:12px;border-radius:6px;background:#eef2f7;margin-bottom:12px}
.tlb-skel.l1{width:70%}.tlb-skel.l2{width:100%}.tlb-skel.l3{width:45%;margin-bottom:0}

.tlb-controls{display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.tlb-btn{padding:9px 14px;background:#1e293b;border:1px solid #334155;color:#cbd5e1;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.tlb-btn:hover{background:#334155;color:#fff}
.tlb-btn.primary{background:#6366f1;border-color:#6366f1;color:#fff}
.tlb-btn.primary:hover{background:#4f46e5}
.tlb-hint{font-size:12px;color:#64748b;margin-top:14px}`,

  js: `var fill = document.getElementById('tlbFill');
var shown = 0, target = 0, running = false, finishing = false, raf = null, trickle = null;

function setWidth() { fill.style.width = (shown * 100).toFixed(2) + '%'; }

function loop() {
  shown += (target - shown) * 0.14;
  setWidth();
  if (finishing && shown > 0.995) {
    finishing = false; running = false;
    fill.style.opacity = '0';
    setTimeout(function () { shown = 0; target = 0; setWidth(); }, 320);
    return;
  }
  if (running) raf = requestAnimationFrame(loop);
}

function startBar() {
  if (running && !finishing) return;
  running = true; finishing = false;
  shown = 0; target = 0.08;
  fill.style.opacity = '1';
  setWidth();
  clearInterval(trickle);
  trickle = setInterval(function () {
    if (target < 0.9) target = Math.min(0.9, target + (0.9 - target) * 0.2 + 0.01);
  }, 400);
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(loop);
}

function finishBar() {
  if (!running) return;
  clearInterval(trickle);
  finishing = true;
  target = 1;
}

function simulate() {
  startBar();
  setTimeout(finishBar, 2200);
}`,

  seo: {
    title: 'Top Loading Bar — Route Progress HTML CSS JS Snippet',
    description: `YouTube/GitHub-style top loading bar that trickles toward 90%, completes to 100%, and fades — JS-driven width with a glowing peg. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Top Loading Bar — Trickle-to-90%, Complete-and-Fade & Glowing Peg`,
      description: `The thin progress bar that slides across the top of the page during navigation — popularised by YouTube, GitHub, and the NProgress library — has become the standard signal that "something is loading". It works precisely because the duration of a page load or fetch is unknown: instead of a fake percentage, it trickles quickly toward 90%, holds, and then snaps to 100% and fades once the real work finishes. This snippet implements that behaviour in plain HTML, CSS, and vanilla JavaScript.

**The trickle model**

A real loader can't know how long a request will take, so this bar fakes confident progress. \`startBar\` sets the target to 8% and starts a \`setInterval\` "trickle" that nudges the target upward by a shrinking amount every 400ms but never past 90% (\`target + (0.9 − target) × 0.2\`). This easing means it races early and slows as it approaches 90%, conveying activity without ever pretending to be done. When the actual work completes, \`finishBar\` clears the trickle and sets the target to 100%.

**Smooth JS-driven width**

A \`requestAnimationFrame\` loop eases the *displayed* width toward the target each frame (\`shown += (target − shown) × 0.14\`), so the bar glides rather than jumping between trickle steps. The width is set directly in JS rather than via a CSS \`width\` transition — deliberately, because utility frameworks like Tailwind don't animate raw \`width\`, so a JS tween guarantees identical smoothness across the React and Tailwind exports. Only the final fade uses an \`opacity\` transition (which frameworks do animate).

**Complete and fade**

When finishing and the bar has eased past 99.5%, the loop fades it out via \`opacity\`, then resets width to zero after the fade so the next navigation starts clean. The bar is \`position: fixed\` at the very top with a high \`z-index\`, and a glowing "peg" (\`::after\` with layered box-shadows) trails the leading edge — the signature NProgress detail that makes the bar feel like light moving across the screen.

**Demo controls**

A mock browser window with "Navigate (auto)", "Start", and "Finish" buttons lets you trigger the full cycle or drive the phases manually. \`simulate\` runs a realistic start-then-finish after 2.2 seconds.

In a real app you call \`startBar()\` when a route change or fetch begins and \`finishBar()\` when it resolves (router events, fetch interceptors, or a global request counter). Pair this with a [skeleton loader](/ui-snippets/skeleton-loader/) for content placeholders, a [progress bar](/ui-snippets/progress-bar/) for determinate tasks, or a [download button](/ui-snippets/download-button/) for in-button progress.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mock browser window with controls appears, and a thin gradient bar sits ready at the very top of the page.` },
      { title: 'Click "Navigate (auto)"', text: `The top bar slides in, trickles quickly toward 90% and holds, then after ~2.2s jumps to 100% and fades — a full load cycle.` },
      { title: 'Watch the trickle', text: `Notice it races early and slows near 90%, never completing until the real work finishes — confident progress for an unknown duration.` },
      { title: 'Drive it manually', text: `Click "Start" to begin trickling and "Finish" to complete and fade, mimicking a route change resolving.` },
      { title: 'See the glowing peg', text: `A soft glow trails the bar's leading edge as it moves — the signature NProgress light effect.` },
      { title: 'Wire it to your app', text: `Call \`startBar()\` on route-change/fetch start and \`finishBar()\` on resolve; the bar handles the rest.` },
    ] },
    features: [
      { title: 'Trickle-to-90% model', text: `\`startBar\` eases the target up by a shrinking step every 400ms, capped at 90%, faking confident progress for an unknown duration.` },
      { title: 'Complete and fade', text: `\`finishBar\` sets the target to 100%; once eased past 99.5% the bar fades via opacity and resets for the next run.` },
      { title: 'rAF width tween', text: `A \`requestAnimationFrame\` loop eases displayed width toward the target each frame, so the bar glides between trickle steps.` },
      { title: 'Export-safe animation', text: `Width is set in JS (not a CSS width transition), so the motion is identical in the React + Tailwind export; only the fade uses opacity.` },
      { title: 'Glowing peg', text: `A \`::after\` with layered box-shadows trails the leading edge, the signature NProgress light effect.` },
      { title: 'Fixed, top-layer bar', text: `\`position: fixed; top: 0\` with a high \`z-index\` keeps the bar above all content during loads.` },
      { title: 'Manual + auto controls', text: `\`simulate\` runs a full start-to-finish cycle; \`startBar\`/\`finishBar\` let you drive the phases independently.` },
      { title: 'Re-entrant safe', text: `Guards prevent overlapping starts and the loop resets state on completion, so rapid navigations behave predictably.` },
    ],
    useCases: [
      { title: 'SPA route transitions', text: `Show progress on client-side navigation in React/Vue/Angular routers. Pair with a [skeleton loader](/ui-snippets/skeleton-loader/) for the incoming page.` },
      { title: 'Page and form submissions', text: `Trigger on form submit or full-page navigation so users know the request is in flight.` },
      { title: 'AJAX / fetch activity', text: `Start on the first in-flight request and finish when the global request count hits zero — an app-wide loading indicator.` },
      { title: 'Dashboard data refreshes', text: `Signal background data reloads at the top of the page without blocking the UI; complements a [realtime line chart](/ui-snippets/realtime-line-chart/).` },
      { title: 'File and asset loading', text: `Indicate heavy asset or report generation; for in-control progress use a [download button](/ui-snippets/download-button/).` },
      { title: 'Multi-step flows and wizards', text: `Show a top-level "working" cue while a step processes, alongside a [progress bar](/ui-snippets/progress-bar/) for the determinate part.` },
    ],
    faqs: [
      { q: 'How do I hook it into my router or fetch layer?', a: `Call \`startBar()\` when navigation/fetch begins and \`finishBar()\` when it resolves. For routers, use their start/complete events (e.g. Next.js \`routeChangeStart\`/\`routeChangeComplete\`, Vue Router \`beforeEach\`/\`afterEach\`). For fetch, wrap your client to increment a counter on request and decrement on response, calling \`startBar\` when the counter goes 0→1 and \`finishBar\` when it returns to 0.` },
      { q: 'Why trickle to 90% instead of showing real progress?', a: `Most navigations and fetches don't expose a reliable progress value, so a real percentage isn't available. Trickling toward 90% communicates "actively working" without lying about completion, then snapping to 100% on the real finish gives a satisfying, honest end. For downloads that DO report bytes, use a determinate bar like the [download button](/ui-snippets/download-button/) instead.` },
      { q: 'Why animate width in JS rather than a CSS transition?', a: `The width changes in unpredictable steps (each trickle tick), so a fixed-duration CSS transition would stutter. A \`requestAnimationFrame\` ease toward the moving target stays smooth. It's also export-safe: Tailwind's \`transition\` utility doesn't animate raw \`width\`, so a CSS-transition bar would snap in the React + Tailwind build — the JS tween behaves identically everywhere.` },
      { q: 'How do I handle errors or cancelled navigations?', a: `Treat them as a finish: call \`finishBar()\` in your router's error/abort handler and your fetch's \`catch\`/\`finally\` so the bar always completes and fades rather than hanging at 90%. If you maintain a request counter, ensure failed requests still decrement it so the count can reach zero.` },
      { q: 'How do I use this top loading bar in React, Vue, or Angular?', a: `Keep the bar as a single fixed element and drive it from a small module exposing \`start\`/\`finish\` (the functions here). In React, call them from a router effect; in Vue from router guards in \`onMounted\`; in Angular from \`Router\` events in a root component. The trickle and rAF logic are framework-agnostic and port unchanged — or wrap them in a tiny store/service.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to trace through the trickle formula in startBar() — target + (0.9 - target) * 0.2 + 0.01 — with a few sample target values to see exactly why it races early and slows to a crawl approaching 90%, and why that specific shape is what makes an unknown-duration load feel confident rather than fake. It's worth asking about the architecture choice too: why width is tweened in JS via requestAnimationFrame instead of a CSS width transition, and what would actually break in the Tailwind export if it weren't. For extending it, ask for a version that reports real byte progress when it's available (falling back to the trickle only when it isn't), a color that shifts as the bar approaches completion, or multiple independent bars for concurrent requests that merge into one visible bar. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a YouTube/GitHub-style top-of-page loading bar in plain HTML, CSS, and JavaScript that fakes confident progress for a request of unknown duration — no library, no CSS width transition.

Requirements:
- A thin, fixed-position bar pinned to the very top of the viewport with a high z-index, whose width is set directly via JavaScript on every frame, not via a CSS transition on the width property.
- A start function that immediately jumps the bar's target to a small initial value (such as 8%), then begins a repeating interval that nudges the target upward by a shrinking amount each tick — using a formula based on the remaining distance to 90% — so the target approaches but never reaches 90% on its own.
- A requestAnimationFrame loop that, every frame, eases the actually-displayed width a fraction of the way toward the current target (not snapping straight to it), so the bar visually glides between each trickle step rather than jumping.
- A finish function that stops the trickle interval and sets the target to 100%, letting the same easing loop carry the displayed width the rest of the way.
- Once the eased width crosses very close to 100% (such as above 99.5%), the loop must switch the bar to a CSS opacity fade-out, and only after that fade completes reset the width back to zero so the next run starts clean.
- Add a glowing highlight at the bar's leading edge using layered box-shadows on a pseudo-element, and provide simple manual "Start" and "Finish" trigger buttons plus a combined "simulate a full navigation" button for testing the whole cycle.`,
    },
  },
};

export default topLoadingBar;
