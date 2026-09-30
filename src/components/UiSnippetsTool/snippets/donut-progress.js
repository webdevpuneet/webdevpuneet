const donutProgress = {
  id: 'donut-progress',
  title: 'Donut Progress',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="dp-card">
  <div class="dp-ring" id="dpRing">
    <svg viewBox="0 0 120 120">
      <circle class="dp-track" cx="60" cy="60" r="52"/>
      <circle class="dp-bar" id="dpBar" cx="60" cy="60" r="52"/>
    </svg>
    <div class="dp-center"><strong id="dpVal">0%</strong><span id="dpCap">Complete</span></div>
  </div>
  <div class="dp-controls">
    <button type="button" class="dp-chip" data-v="25">25%</button>
    <button type="button" class="dp-chip" data-v="68">68%</button>
    <button type="button" class="dp-chip" data-v="92">92%</button>
    <input type="range" id="dpRange" min="0" max="100" value="68" aria-label="Progress">
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:40px 18px}

.dp-card{background:#1e293b;border:1px solid #334155;border-radius:18px;padding:24px;width:100%;max-width:300px;text-align:center}
.dp-ring{position:relative;width:180px;height:180px;margin:0 auto 18px}
.dp-ring svg{width:180px;height:180px;transform:rotate(-90deg)}
.dp-track{fill:none;stroke:#334155;stroke-width:11}
.dp-bar{fill:none;stroke:#22c55e;stroke-width:11;stroke-linecap:round;stroke-dasharray:326.7 326.7;stroke-dashoffset:326.7;transition:stroke-dashoffset .7s cubic-bezier(.22,1,.36,1),stroke .4s}
.dp-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.dp-center strong{font-size:34px;font-weight:800;font-variant-numeric:tabular-nums;color:#f1f5f9}
.dp-center span{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em}

.dp-controls{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}
.dp-chip{background:#0f172a;border:1px solid #334155;color:#cbd5e1;border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.dp-chip:hover{border-color:#6366f1;color:#a5b4fc}
.dp-controls input[type=range]{width:100%;accent-color:#6366f1;margin-top:6px}`,

  js: `var bar = document.getElementById('dpBar');
var valEl = document.getElementById('dpVal');
var capEl = document.getElementById('dpCap');
var range = document.getElementById('dpRange');
var R = 52, CIRC = 2 * Math.PI * R; // ~326.7
var countTimer = null;

function color(p) { return p < 34 ? '#ef4444' : p < 67 ? '#f59e0b' : '#22c55e'; }

function setRing(p) {
  bar.style.strokeDashoffset = String(CIRC - (p / 100) * CIRC);
  bar.style.stroke = color(p);
  capEl.textContent = p >= 100 ? 'Done' : 'Complete';
}

// Animate the center number from its current value to the target.
function countTo(target) {
  cancelAnimationFrame(countTimer);
  var start = parseInt(valEl.textContent, 10) || 0;
  var t0 = null, dur = 700;
  function frame(now) {
    if (!t0) t0 = now;
    var k = Math.min((now - t0) / dur, 1);
    var eased = 1 - Math.pow(1 - k, 3);
    valEl.textContent = Math.round(start + (target - start) * eased) + '%';
    if (k < 1) countTimer = requestAnimationFrame(frame);
  }
  countTimer = requestAnimationFrame(frame);
}

function set(p) { p = Math.max(0, Math.min(100, p)); range.value = p; setRing(p); countTo(p); }

document.querySelectorAll('.dp-chip').forEach(function (c) { c.addEventListener('click', function () { set(parseInt(c.getAttribute('data-v'), 10)); }); });
range.addEventListener('input', function () { var p = parseInt(range.value, 10); setRing(p); valEl.textContent = p + '%'; capEl.textContent = p >= 100 ? 'Done' : 'Complete'; });

set(68);`,

  seo: {
    title: 'Donut Progress — Animated Percentage Ring with Label',
    description: `A donut progress ring that sweeps to a percentage with a counting center label and color thresholds. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Donut Progress — Animated Percentage Donut with Counting Label and Thresholds',
      description: `A donut progress indicator shows a single percentage as a thick ring that sweeps from empty to its value, with the number counting up in the centre and the colour shifting as it climbs — the widget for completion, storage used, goals, and scores. This snippet builds it with an SVG ring and a synced count-up, in plain HTML, CSS, and vanilla JavaScript.

**The ring sweep**

The progress arc is an SVG circle whose \`stroke-dasharray\` equals its circumference (\`2πr\`) and whose \`stroke-dashoffset\` is moved from the full length (empty) to a fraction of it (the percentage). The SVG is rotated −90° so the sweep starts at the top, \`stroke-linecap: round\` softens the leading edge, and a \`cubic-bezier\` transition gives the fill a satisfying fast-then-settle motion. Computing the circumference in JS (rather than hard-coding) means changing the radius just works.

**A counting centre label**

The percentage in the middle doesn't snap — it counts from its previous value to the new one over the same duration as the ring, driven by \`requestAnimationFrame\` with an ease-out curve. \`font-variant-numeric: tabular-nums\` keeps the digits from shifting sideways as they change. The ring and the number animate together, so the widget feels like one coordinated motion rather than two separate effects.

**Colour thresholds**

The arc colour reflects the value: red below ~34%, amber in the middle band, and green near completion. This encodes status at a glance — a near-empty quota or a low score reads as a warning without the user parsing the number. The thresholds are a single \`color(p)\` function you can retune to your semantics (for storage you might invert them).

**Interactive demo, easy integration**

Preset chips and a range slider drive the value so you can see the sweep and count respond live; in real use you'd call \`set(percentage)\` with your data. The slider path updates the number instantly for scrubbing, while the chips trigger the full animated transition — showing both an immediate and an animated update mode.

**Accessible and dependency-free**

The centre text always shows the real value, so the meaning survives even if the animation doesn't, and the whole widget is a couple of small functions with no chart library. It's a clean reference for the donut-progress pattern you'll reach for on dashboards, onboarding, and profile-completion cards.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A donut progress ring renders at 68% with controls.` },
      { title: 'Set a value', text: `Call set(percentage) — the ring sweeps and the number counts.` },
      { title: 'Try presets', text: `Chips jump to preset values with the full animation.` },
      { title: 'Scrub the slider', text: `Drag to update the value instantly for fine control.` },
      { title: 'Tune thresholds', text: `Edit color(p) to match your status semantics.` },
      { title: 'Resize the ring', text: `Change the radius; the circumference recomputes automatically.` },
    ] },
    features: [
      { title: 'SVG ring sweep', text: `stroke-dashoffset animates the arc to the percentage.` },
      { title: 'Counting center label', text: `The number eases from old to new value via rAF.` },
      { title: 'Color thresholds', text: `Red/amber/green by value to encode status.` },
      { title: 'Computed circumference', text: `2πr in JS so changing the radius just works.` },
      { title: 'Smooth easing', text: `cubic-bezier sweep paired with an ease-out count.` },
      { title: 'Tabular numerals', text: `Digits stay aligned as the number changes.` },
      { title: 'Instant + animated modes', text: `Slider updates live; chips trigger the full transition.` },
      { title: 'No library', text: `Pure HTML/CSS/JS/SVG — no chart dependency.` },
    ],
    useCases: [
      { title: 'Profile completion', text: `Show setup progress like a [profile completion](/ui-snippets/profile-completion/) widget.` },
      { title: 'Storage and quota', text: `Visualize usage next to a [quota usage meter](/ui-snippets/quota-usage-meter/).` },
      { title: 'Goals and targets', text: `Track a goal in a [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'Scores and ratings', text: `Display a score with status color.` },
      { title: 'Onboarding checklists', text: `Mirror progress from an [onboarding checklist](/ui-snippets/onboarding-checklist-widget/).` },
      { title: 'Learning SVG rings', text: `A reference for ring sweep and synced counting.` },
      { icon: 'CODE', title: 'Related: Marimekko (Mekko) Chart — Proportional Stacked Segments', desc: 'See the [Marimekko (Mekko) Chart — Proportional Stacked Segments](/ui-snippets/marimekko-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the ring drawn?', a: `The arc is an SVG circle with stroke-dasharray set to its circumference (2 × π × r, computed in JavaScript) and stroke-dashoffset moved from the full circumference (empty) to circumference minus the percentage fraction (filled). The SVG is rotated −90° so it starts at the top, and a CSS transition on stroke-dashoffset animates the sweep.` },
      { q: 'How does the center number count up?', a: `On each change the label animates from its current value to the target over the same duration as the ring, using requestAnimationFrame with an ease-out curve, then snaps to the exact target. Tabular numerals keep the digits from jittering. Driving both the ring and the count over one duration makes them feel like a single coordinated animation.` },
      { q: 'How do I change the threshold colors?', a: `Edit the color(p) function, which returns a stroke color based on the percentage — by default red below 34, amber to 67, and green above. You can change the breakpoints or invert them; for example, for storage or error rates a high value is bad, so you would flip to green-low, red-high.` },
      { q: 'Can I change the ring size or thickness?', a: `Yes. Change the circle radius in the SVG and the stroke-width for thickness; the circumference is derived from the radius in JavaScript, so the fill math stays correct automatically. Adjust the viewBox and container size to match. stroke-linecap: round gives the rounded leading edge.` },
      { q: 'How do I use this donut progress in React, Vue, or Angular?', a: `Hold the value in state and compute the stroke-dashoffset and threshold color as derived values bound to the circle. Animate the center number in an effect with requestAnimationFrame when the value changes, or use a count-up hook. Keep the real value as the text content for accessibility. Tailwind users swap the classes for utilities; the ring math is unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the animation timing yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how countTo() uses cancelAnimationFrame to interrupt an in-flight count and restart from the current displayed value rather than from zero, and why the cubic ease-out formula 1 minus (1 minus k) cubed is applied to the interpolation. The same assistant can help optimize it, for example checking whether the ring's CSS transition and the JS-driven count are actually kept in sync if set() is called rapidly in succession, or whether a debounce is warranted. It is also useful for extending the widget: ask it to add a second concentric ring for a comparison metric, support indeterminate/loading state before a real value is known, or emit a callback when the ring reaches 100 percent. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated donut progress ring in plain HTML, CSS, and JavaScript using SVG, with no chart library.

Requirements:
- An SVG with a background track circle and a foreground progress circle sharing the same center and radius, the SVG rotated -90 degrees so the sweep starts at the top, and the progress circle using stroke-linecap round for a soft leading edge.
- Compute the circumference in JavaScript from the radius (2 times PI times r) rather than hardcoding it, and set the progress circle's stroke-dasharray to that circumference. Represent progress by animating stroke-dashoffset from the full circumference (0 percent, fully offset/hidden) down toward zero as the percentage rises, using a CSS transition with an eased cubic-bezier curve.
- A center label showing the percentage as text, using a numeric font feature (tabular numbers) so digits don't shift width as they change, that must count from its current displayed value to a new target value using requestAnimationFrame with an ease-out easing curve over roughly 700ms, not simply snap to the new number.
- Any in-flight count animation must be cancelled with cancelAnimationFrame before starting a new one if the target changes again mid-animation, so rapid updates don't stack multiple competing animation loops.
- A pure function that maps the percentage to a stroke color across at least three bands (e.g. red under one-third, amber in the middle, green above two-thirds), applied to the ring's stroke color and easy to re-tune or invert.
- Provide both an instant-update path (e.g. a live range slider that updates the ring and label immediately without the count-up animation) and an animated path (e.g. preset buttons that always trigger the full eased sweep and count), demonstrating both modes from the same underlying set() function.`,
    },
  },
};

export default donutProgress;
