const loaderPercentageMorphText = {
  id: 'loader-percentage-morph-text',
  title: 'Full-Screen Percentage Counter Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="pm-overlay" id="pmOverlay">
  <div class="pm-num" id="pmNum">0<span class="pm-sign">%</span></div>
  <div class="pm-label" id="pmLabel">Loading experience…</div>
</div>
<div class="pm-page">
  <h1>Welcome back</h1>
  <p>The real page content sits underneath the takeover.</p>
  <button type="button" class="pm-replay" id="pmReplay">↻ Replay loader</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}

.pm-page{text-align:center;padding:24px}
.pm-page h1{font-size:28px;letter-spacing:-.02em;margin-bottom:8px}
.pm-page p{color:#8a93ad;font-size:14px;margin-bottom:18px}
.pm-replay{padding:10px 18px;background:#1c2338;border:1px solid #2b3350;color:#c3cadf;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.pm-replay:hover{background:#242c47}

.pm-overlay{position:fixed;inset:0;z-index:50;background:#05070d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transition:opacity .6s ease;opacity:1}
.pm-overlay.pm-hide{opacity:0;pointer-events:none}

.pm-num{font-size:clamp(64px,18vw,180px);font-weight:800;letter-spacing:-.04em;font-variant-numeric:tabular-nums;line-height:1;color:#fff;transition:transform .12s ease}
.pm-num.pm-pulse{transform:scale(1.06)}
.pm-sign{font-size:.4em;font-weight:700;color:#6b7bff;margin-left:4px}

.pm-label{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#6b7591;transition:opacity .25s}`,

  js: `var overlay = document.getElementById('pmOverlay');
var numEl = document.getElementById('pmNum');
var labelEl = document.getElementById('pmLabel');
var replayBtn = document.getElementById('pmReplay');
var rafId = null;

// Cubic ease-out: fast start, gentle settle — never a linear tick-tick-tick count.
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

var LABELS = [
  [0, 'Loading experience…'],
  [35, 'Fetching assets…'],
  [70, 'Almost ready…'],
  [100, 'Ready'],
];

function labelFor(pct) {
  var current = LABELS[0][1];
  for (var i = 0; i < LABELS.length; i++) {
    if (pct >= LABELS[i][0]) current = LABELS[i][1];
  }
  return current;
}

function runCounter() {
  overlay.classList.remove('pm-hide');
  var duration = 2600;
  var start = null;
  var lastShown = -1;

  function frame(ts) {
    if (start === null) start = ts;
    var t = Math.min(1, (ts - start) / duration);
    var eased = easeOutCubic(t);
    var pct = Math.round(eased * 100);

    if (pct !== lastShown) {
      lastShown = pct;
      numEl.firstChild.textContent = pct;
      // A quick scale pulse on every digit change makes the count feel alive
      // rather than a flat text update.
      numEl.classList.remove('pm-pulse');
      void numEl.offsetWidth;
      numEl.classList.add('pm-pulse');
      var newLabel = labelFor(pct);
      if (newLabel !== labelEl.textContent) labelEl.textContent = newLabel;
    }

    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      setTimeout(function () {
        overlay.classList.add('pm-hide');
      }, 500);
    }
  }
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(frame);
}

replayBtn.addEventListener('click', runCounter);
runCounter();`,

  seo: {
    title: 'Full-Screen Percentage Counter Loader — Eased 0-100% Takeover',
    description: `A full-viewport loading screen with one huge percentage counting 0-100% on real cubic easing, pulsing on every digit change, then fading to reveal the page. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Full-Screen Percentage Counter Loader — Eased Digits, Pulse-on-Update, Fade-to-Reveal',
      description: `A handful of premium sites — portfolios, product launches, agency homepages — greet visitors with a full-screen percentage counting up before the real page fades in. Done badly it's a linear digit-flip that feels mechanical; done well the count decelerates like it's genuinely arriving somewhere, and each digit change has a tiny physical pulse. This snippet builds the effect properly: a \`requestAnimationFrame\` loop driven by a real cubic ease-out, a scale pulse on every number change, staged status text, and a fade-out that reveals the underlying page — all in plain HTML, CSS, and vanilla JavaScript.

**Why requestAnimationFrame with real easing, not setInterval**

The counter is driven entirely by \`runCounter()\`'s \`frame()\` function inside a \`requestAnimationFrame\` loop, not a \`setInterval\` incrementing by one. Each frame computes elapsed time as a fraction of a fixed 2.6s \`duration\`, runs it through \`easeOutCubic(t) = 1 - (1 - t)³\`, and multiplies by 100 to get the displayed percentage. Because the easing curve's derivative is steep near \`t = 0\` and flattens toward \`t = 1\`, the count visibly races through the early numbers and decelerates into a gentle settle at 100 — the same "arriving, not ticking" feel a countdown clock lacks. A linear count (no easing function at all) would tick at a constant rate and read as mechanical rather than deliberate.

**A pulse tied to actual digit changes, not a fixed timer**

Every time the displayed integer percentage changes — checked with \`pct !== lastShown\` so a frame that rounds to the same number never re-triggers anything — the number element's \`pm-pulse\` class is removed, the layout is force-reflowed with \`void numEl.offsetWidth\`, and the class is re-added, restarting a quick \`scale(1.06)\` CSS transition. This ties the visual "beat" of the animation to genuine data changes rather than a separate decorative timer running alongside the count, so the pulse and the number are always perfectly synchronized, even though the frame rate driving them isn't fixed.

**Staged status text underneath the number**

A small \`LABELS\` lookup swaps a status line ("Loading experience…", "Fetching assets…", "Almost ready…", "Ready") at percentage thresholds, computed by \`labelFor()\` from the same eased percentage driving the digits — so the label text and the number are always in lockstep, derived from one shared value rather than a second independent timer that could drift out of sync.

**Full-viewport takeover and reveal**

The counter sits in a \`position: fixed; inset: 0\` overlay above the real page content, which renders normally underneath. Once the animation reaches \`t = 1\`, a short pause holds the finished "100% / Ready" state, then \`pm-hide\` fades the whole overlay's opacity to 0 with \`pointer-events: none\`, revealing the page beneath — the counter itself never has to know what page it's covering.

**Tuning and reuse**

Change \`duration\` for a snappier or slower count, swap \`easeOutCubic\` for a different easing function (a bounce or an elastic ease reads very differently), or drive the percentage from real asset-loading progress (a \`window.onload\`, a resource count, or a preloader library's callback) instead of a fixed-duration animation — the eased-display and pulse logic works identically either way. Pair it with a [loading overlay](/ui-snippets/loading-overlay/) for shorter in-page waits or a [top loading bar](/ui-snippets/top-loading-bar/) for route transitions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full-screen dark overlay appears with a huge "0%" and begins counting immediately.` },
      { title: 'Watch it accelerate then settle', text: `The count races through the early numbers and eases into 100% rather than ticking at a constant rate.` },
      { title: 'Notice the pulse', text: `Every digit change gives the number a quick scale pulse, tied to the actual value changing.` },
      { title: 'Watch the status text', text: `The label beneath the number advances through stages as the percentage crosses thresholds.` },
      { title: 'See it fade and reveal', text: `At 100%, it holds briefly on "Ready" then fades out to reveal the real page.` },
      { title: 'Replay it', text: `Click "Replay loader" to re-run the entire counting sequence from zero.` },
    ] },
    features: [
      { title: 'rAF-driven counting', text: `A requestAnimationFrame loop, not setInterval, drives the whole animation.` },
      { title: 'Real cubic ease-out', text: `easeOutCubic shapes the count to race early and decelerate into 100%.` },
      { title: 'Change-tied digit pulse', text: `The scale pulse fires only when the displayed integer actually changes.` },
      { title: 'Force-reflow restart', text: `void offsetWidth guarantees the pulse animation replays on every change.` },
      { title: 'Threshold-based status text', text: `Labels derive from the same eased percentage, never drifting from the number.` },
      { title: 'Full-viewport takeover', text: `A fixed-position overlay sits above the real page content underneath.` },
      { title: 'Hold-then-fade completion', text: `A brief pause on Ready before the overlay fades and unblocks pointer events.` },
      { title: 'Tunable and data-drivable', text: `Swap the fixed duration for real asset-load progress with no structural change.` },
    ],
    useCases: [
      { title: 'Agency and portfolio homepages', text: 'Greet visitors with one huge percentage counting to 100, then fade to reveal the page for a premium first impression.' },
      { title: 'Product launch teasers', text: 'Build anticipation before a reveal, with `easeOutCubic` racing early and decelerating into 100 so the count feels earned, not mechanical.' },
      { title: 'Heavy 3D scene preloaders', text: 'Tie the number to real asset-loading progress for a WebGL experience, and pair with a [loading overlay](/ui-snippets/loading-overlay/) for the fade out.' },
      { title: 'Branded app splash takeovers', text: 'Cover first-load data fetching with a bold number that pulses only when the displayed integer actually changes.' },
      { title: 'Route transition alternatives', text: 'Offer a full-screen option next to a [top loading bar](/ui-snippets/top-loading-bar/), with `void offsetWidth` forcing a reflow so every pulse replays.' },
      { icon: 'CODE', title: 'Related: Multi-Stage Loading Checklist', desc: 'See the [Multi-Stage Loading Checklist](/ui-snippets/loader-multi-stage-checklist/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use requestAnimationFrame instead of setInterval to count up?', a: `requestAnimationFrame runs in sync with the browser's paint cycle, giving smooth, frame-accurate timing, and it naturally supports computing progress as elapsed-time-over-duration each frame — which is what makes real easing possible. A setInterval incrementing by a fixed step every tick can only count linearly and drifts from real elapsed time if the tab is throttled.` },
      { q: 'How does the easing actually work?', a: `easeOutCubic(t) = 1 - (1 - t)³ takes a linear progress fraction from 0 to 1 and reshapes it so the output changes quickly near t = 0 and slows sharply near t = 1. Multiplying that eased value by 100 produces a percentage that visibly races through the early numbers and settles gently into 100 — a real mathematical curve, not a scripted slowdown.` },
      { q: 'Why does the number only pulse sometimes, not every frame?', a: `The pulse is gated on pct !== lastShown, so it only fires when the displayed integer percentage genuinely changes — since requestAnimationFrame can run many times between one integer and the next, most frames update nothing visually. This keeps the pulse tied to real data changes rather than firing dozens of times a second regardless of whether the number moved.` },
      { q: 'How do I drive this from real loading progress instead of a fixed duration?', a: `Replace the elapsed-time calculation in frame() with your actual progress source — for example a running count of resources loaded divided by total resources, or values from a preloading library's progress callback — and skip the eased time-based ramp entirely, applying easeOutCubic (or no easing) directly to that real fraction instead. The pulse, label, and fade-out logic all stay identical.` },
      { q: 'How do I use this percentage loader in React, Vue, or Angular?', a: `Hold the displayed percentage in state and run the same requestAnimationFrame loop inside a mount effect, updating state only when the rounded integer changes so re-renders match the pulse-trigger condition exactly. Clean up by cancelling the animation frame on unmount. The CSS transitions and full-viewport overlay markup port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how easeOutCubic reshapes a linear 0-to-1 time fraction into a percentage that races early and decelerates into 100, and why gating the pulse animation on pct !== lastShown (rather than firing it every animation frame) is what keeps the pulse tied to real digit changes instead of the raw frame rate. It's worth a robustness check too: ask what happens to the animation's timing if the browser tab is backgrounded and requestAnimationFrame pauses, and whether the current code handles resuming correctly. For extending it, ask for a version driven by real asset-loading progress (counting actual fetched resources) instead of a fixed 2.6 second duration, a different easing curve like an elastic overshoot for a bouncier finish, or a way to keep the overlay in the DOM but visually hidden so a slow connection can re-trigger it without a full page reload. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a full-viewport "percentage counter" loading takeover in plain HTML, CSS, and JavaScript — a single huge number counting from 0 to 100 with real easing, not a linear tick.

Requirements:
- A fixed-position overlay covering the entire viewport with a very large percentage number as its focal point, sitting above normal page content that continues to exist underneath it in the DOM.
- Drive the count using requestAnimationFrame (not setInterval), computing elapsed time as a fraction of a fixed total duration each frame, and pass that fraction through a real cubic ease-out easing function (not a linear multiply) before converting it to a displayed 0-100 integer percentage, so the count visibly races through early numbers and decelerates into 100.
- Only update the DOM and trigger any visual effect when the displayed integer percentage actually changes between frames, not on every single animation frame, to avoid redundant updates while requestAnimationFrame runs at a much higher rate than the number visibly changes.
- Every time the displayed number changes, apply a brief CSS scale-based pulse to the number element, restarting the transition each time via a forced reflow technique (such as reading offsetWidth) so the pulse reliably replays on every single change rather than only the first.
- Beneath the number, show a status label that updates through at least three different text values at different percentage thresholds (e.g. an early-stage message, a mid-stage message, and a completion message), derived from the same percentage value driving the digits so the label and number can never fall out of sync.
- Once the count reaches 100, hold briefly on a completed state, then fade the entire overlay's opacity to 0 and disable its pointer events, revealing the real page content beneath without unmounting or reloading it.`,
    },
  },
};

export default loaderPercentageMorphText;
