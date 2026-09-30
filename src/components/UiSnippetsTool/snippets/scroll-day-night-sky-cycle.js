const scrollDayNightSkyCycle = {
  id: 'scroll-day-night-sky-cycle',
  title: 'Scroll Day/Night Sky Cycle',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="dns-intro"><h1>Scroll to watch a full day pass</h1><p>Sunrise to starlit night, and back again — the sun and moon genuinely orbit in a circle as you scroll.</p></section>
<section class="dns-pin" id="dnsPin">
  <div class="dns-sky" id="dnsSky">
    <div class="dns-stars" id="dnsStars"></div>
    <div class="dns-orbit-guide"></div>
    <div class="dns-sun" id="dnsSun"></div>
    <div class="dns-moon" id="dnsMoon">
      <span class="dns-crater dns-crater-a"></span>
      <span class="dns-crater dns-crater-b"></span>
      <span class="dns-crater dns-crater-c"></span>
    </div>
    <div class="dns-hills"></div>
    <span class="dns-label" id="dnsLabel">Dawn</span>
  </div>
</section>
<section class="dns-outro"><p>One full rotation — sun and moon chasing each other around the same circle.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;color:#fff}
.dns-intro,.dns-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px;background:#0a0b12}
.dns-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.dns-intro p,.dns-outro p{color:#9aa0b8;font-size:15px;max-width:460px}
.dns-pin{position:relative;height:100vh;overflow:hidden}
.dns-sky{position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(#4facfe,#a8e6ff);transition:background .05s linear}
.dns-stars{position:absolute;inset:0;opacity:0;transition:opacity .1s linear}
.dns-stars span{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff}
.dns-orbit-guide{position:absolute;left:50%;top:56%;width:78%;aspect-ratio:1;border:1px dashed rgba(255,255,255,.12);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none}
.dns-sun{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6d8,#ffcf5c 55%,#ff9d2e);box-shadow:0 0 60px 14px rgba(255,196,84,.55);z-index:3}
.dns-moon{position:absolute;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fdfdfd,#d7dbe6 60%,#aab0c4);box-shadow:0 0 34px 8px rgba(210,215,235,.35);z-index:3;overflow:hidden}
.dns-crater{position:absolute;border-radius:50%;background:rgba(150,155,175,.55)}
.dns-crater-a{width:10px;height:10px;top:10px;left:12px}
.dns-crater-b{width:6px;height:6px;top:24px;left:28px}
.dns-crater-c{width:8px;height:8px;top:30px;left:10px}
.dns-hills{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:4;background:linear-gradient(180deg,#0d1220,#04060c);clip-path:polygon(0 40%,12% 30%,26% 45%,40% 22%,55% 38%,70% 18%,85% 34%,100% 24%,100% 100%,0 100%)}
.dns-label{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);z-index:5;font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(10,12,20,.45);padding:6px 16px;border-radius:999px;backdrop-filter:blur(6px)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var sky   = document.getElementById('dnsSky');
var sun   = document.getElementById('dnsSun');
var moon  = document.getElementById('dnsMoon');
var stars = document.getElementById('dnsStars');
var label = document.getElementById('dnsLabel');

// Scatter a fixed field of stars once — their positions never change, only
// the container's opacity fades them in/out as night approaches.
for (var i = 0; i < 60; i++) {
  var s = document.createElement('span');
  s.style.left = (Math.random() * 100) + '%';
  s.style.top = (Math.random() * 70) + '%';
  s.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
  stars.appendChild(s);
}

// Sky colour keyframes across one full day/night cycle, keyed by orbit
// progress (0 = midday, 0.25 = sunset, 0.5 = midnight, 0.75 = sunrise, 1 = midday again).
var STOPS = [
  { p: 0.00, top: [79, 172, 254], bottom: [168, 230, 255] },  // midday — bright blue
  { p: 0.20, top: [82, 140, 200], bottom: [255, 190, 130] },  // late afternoon warming up
  { p: 0.30, top: [58, 40, 90],   bottom: [255, 110, 70]  },  // sunset — purple to orange
  { p: 0.42, top: [16, 20, 45],   bottom: [58, 35, 70]    },  // dusk
  { p: 0.50, top: [3, 5, 15],     bottom: [8, 10, 30]     },  // midnight — near black
  { p: 0.58, top: [16, 20, 45],   bottom: [58, 35, 70]    },  // pre-dawn
  { p: 0.70, top: [58, 40, 90],   bottom: [255, 130, 90]  },  // sunrise — purple to orange
  { p: 0.80, top: [82, 140, 200], bottom: [255, 200, 150] },  // early morning warming up
  { p: 1.00, top: [79, 172, 254], bottom: [168, 230, 255] },  // back to midday
];

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  return [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];
}
function rgb(c) { return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; }

function skyColorAt(p) {
  for (var i = 0; i < STOPS.length - 1; i++) {
    var a = STOPS[i], b = STOPS[i + 1];
    if (p >= a.p && p <= b.p) {
      var t = (p - a.p) / (b.p - a.p);
      return { top: lerpColor(a.top, b.top, t), bottom: lerpColor(a.bottom, b.bottom, t) };
    }
  }
  return { top: STOPS[0].top, bottom: STOPS[0].bottom };
}

function labelAt(p) {
  if (p < 0.06 || p > 0.94) return 'Midday';
  if (p < 0.24) return 'Afternoon';
  if (p < 0.36) return 'Sunset';
  if (p < 0.46) return 'Dusk';
  if (p < 0.54) return 'Midnight';
  if (p < 0.64) return 'Pre-dawn';
  if (p < 0.76) return 'Sunrise';
  return 'Morning';
}

// The core trick: sun and moon are two points on the SAME circle, exactly
// half a rotation (Math.PI radians) apart. As one rises on one side, the
// other is always setting on the opposite side — the real geometric
// relationship between the sun and moon, not two independently-tuned arcs.
var CX = 0.5, CY = 0.56, RX = 0.39, RY = 0.39;

function place(el, angle) {
  // angle = 0 is straight up (midday position, top of the circle).
  var x = CX + RX * Math.sin(angle);
  var y = CY - RY * Math.cos(angle);
  el.style.left = (x * 100) + '%';
  el.style.top = (y * 100) + '%';
  // Fade out once a body dips behind the hills near the bottom of the orbit,
  // so the circular motion still reads as a natural rise-and-set.
  var depthBelowHorizon = y - 0.86;
  el.style.opacity = depthBelowHorizon > 0 ? Math.max(0, 1 - depthBelowHorizon * 9) : 1;
}

function render(p) {
  var colors = skyColorAt(p);
  sky.style.background = 'linear-gradient(' + rgb(colors.top) + ',' + rgb(colors.bottom) + ')';

  var sunAngle = p * Math.PI * 2;
  var moonAngle = sunAngle + Math.PI;
  place(sun, sunAngle);
  place(moon, moonAngle);

  // Stars are brightest at midnight (p = 0.5) and invisible at midday (p = 0 or 1).
  var nightAmount = Math.max(0, Math.cos(p * Math.PI * 2) * -1);
  stars.style.opacity = nightAmount;

  label.textContent = labelAt(p);
}

render(0);

ScrollTrigger.create({
  trigger: '#dnsPin',
  start: 'top top',
  end: '+=3200',
  pin: true,
  scrub: 0.6,
  onUpdate: function (self) { render(self.progress); },
});`,

  seo: {
    title: 'Scroll Day/Night Sky Cycle — Free GSAP ScrollTrigger Sun & Moon Orbit',
    description: `A full day-to-night sky cycle where the sun and moon genuinely orbit the same circle, half a rotation apart, driven by GSAP ScrollTrigger scrub — sky colour, stars, and a horizon all react live to scroll position.`,
    about: {
      title: 'Scroll Day/Night Sky Cycle — Sun and Moon on One Real Orbit, Not Two Faked Arcs',
      description: `Most "day to night" scroll effects fake it: a sun that arcs up and down on one side, a separately-tuned moon animation bolted on afterward, colours that jump between fixed states instead of actually blending. This snippet builds the real thing — the sun and moon are two points on the exact same circular orbit, always exactly half a rotation (180°) apart, which is the actual geometric relationship between them in the sky. Scroll drives one continuous angle; everything else — position, sky colour, star visibility — is computed from that single number.

**One angle, two bodies**

\`place(el, angle)\` converts an angle into an (x, y) position on a circle using \`x = cx + r·sin(θ)\`, \`y = cy − r·cos(θ)\`, so \`θ = 0\` sits at the top of the circle (midday) and the body sweeps clockwise as the angle grows. The moon is placed at \`sunAngle + Math.PI\` — literally the same formula, just offset by half a circle — so when the sun is highest in the sky, the moon is at the bottom of the orbit (hidden), and as the sun sets on one side, the moon is simultaneously rising on the other. That relationship falls out of the geometry for free; it isn't two separate timelines someone had to keep in sync by hand.

**A circle that still reads as a horizon**

A literal circular orbit would have the sun and moon visibly swinging *below* the ground, which breaks the illusion. The fix is simple: once a body's computed \`y\` position drops past a threshold near the bottom of the orbit, its opacity fades out over a few percent of scroll — so it disappears behind the [hills silhouette](/ui-snippets/scroll-color-sections/) exactly where a horizon would hide it, while the underlying motion stays a real, unbroken circle the whole time.

**Colour as a lookup table, not a fixed set of states**

The sky gradient comes from \`STOPS\`, an array of colour keyframes at specific points around the full cycle (midday, sunset, midnight, sunrise, and back to midday), each defined as top/bottom RGB pairs. \`skyColorAt(p)\` finds which two stops the current progress falls between and linearly interpolates every RGB channel, so the sky is always a real blend between two named states — never a hard cut and never an approximation.

**Stars as a single opacity, not individually-animated dots**

Sixty star elements are scattered once, with random position and per-star opacity baked in at creation time. Only the *container's* opacity animates — driven by \`Math.cos(p·2π)·-1\` clamped to zero, which peaks at exactly \`p = 0.5\` (midnight) and hits zero at \`p = 0\` and \`p = 1\` (midday) — so the whole starfield fades in and out as one cheap, GPU-composited property instead of animating sixty elements individually.

**Customizing it**

Change \`RX\`/\`RY\` for a taller or flatner orbit, add more \`STOPS\` for finer colour control (a golden-hour stop, a blue-hour stop), or swap the fixed \`+=3200\` scroll distance for a value proportional to viewport height. Pair it with [scroll color sections](/ui-snippets/scroll-color-sections/) for more scroll-driven palette work, or [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for a GSAP ScrollTrigger stagger pattern.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, the pinned sky, and an outro render, starting at midday.` },
      { title: 'Scroll through the pinned section', text: `The sun arcs across, sets, and the moon rises as the sky darkens.` },
      { title: 'Keep scrolling to midnight', text: `Stars reach full brightness exactly as the sky hits its darkest stop.` },
      { title: 'Continue to sunrise and back to midday', text: `The sun and moon swap again — the same one-circle relationship holds.` },
      { title: 'Scroll back up', text: `The whole cycle reverses cleanly since everything is a pure function of progress.` },
    ] },
    features: [
      { title: 'One real orbit, two bodies', text: `Sun and moon share one circle formula, offset by exactly Math.PI.` },
      { title: 'Geometrically correct opposition', text: `The moon is always highest when the sun is lowest, and vice versa.` },
      { title: 'Horizon-aware fade', text: `Bodies fade out below a threshold so a circular path still reads as rise/set.` },
      { title: 'Interpolated sky colour', text: `A keyframe lookup blends real RGB values, never a hard-cut colour swap.` },
      { title: 'Cheap starfield', text: `60 pre-scattered stars fade as one container opacity, not 60 animations.` },
      { title: 'Pure function of scroll progress', text: `Every visual is derived from one 0-1 number — scroll up and it reverses exactly.` },
      { title: 'Live status label', text: `A text label (Dawn/Sunset/Midnight/...) tracks the same progress value.` },
      { title: 'GSAP ScrollTrigger scrub', text: `scrub: 0.6 smooths input while staying tightly tied to scroll position.` },
    ],
    useCases: [
      { title: 'Product storytelling sections', text: `A cinematic scroll moment for an outdoor, travel, or wellness brand.` },
      { title: 'Portfolio and agency sites', text: `Demonstrates real scroll-choreography skill beyond a simple fade-in.` },
      { title: 'Sleep, weather, or astronomy apps', text: `A literal, on-theme hero for a product about day/night cycles.` },
      { title: 'Landing page section breaks', text: `Use as a full-bleed scroll interlude between two content sections.` },
      { title: 'Teaching orbital/trigonometric motion', text: `A clean, real-world example of sin/cos-driven circular placement.` },
      { title: 'Alongside other scroll effects', text: `Pair with [scroll color sections](/ui-snippets/scroll-color-sections/) or [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) in a longer scroll narrative.` },
      { icon: 'CODE', title: 'Related: Scroll Data Story Counters', desc: 'See the [Scroll Data Story Counters](/ui-snippets/scroll-data-story-counters/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the sun and moon kept exactly opposite each other?', a: `The moon's angle is computed as sunAngle + Math.PI — literally the sun's current angle plus half a circle in radians. Since both use the identical place() function to convert an angle into an (x, y) position on the same circle, they are mathematically guaranteed to stay 180° apart at every scroll position, which mirrors the real relationship between the sun and moon in the sky.` },
      { q: `Why don't the sun and moon visibly dip below the ground?`, a: `They do travel through that part of the circle mathematically, but each body's opacity is computed from how far its calculated y position has passed a threshold near the bottom of the orbit, fading it to zero over the last few percent before it would visibly cross the hills. The motion itself stays a true, unbroken circle; only the opacity creates the illusion of setting behind a horizon.` },
      { q: 'How does the sky colour transition work?', a: `A STOPS array defines RGB colour pairs (top and bottom of the gradient) at specific progress points around the full cycle — midday, sunset, midnight, sunrise, and back to midday. skyColorAt(p) finds which two stops the current progress sits between and linearly interpolates each RGB channel, so the sky is a genuine blend at every scroll position, not a jump between fixed colours.` },
      { q: 'Why is the starfield one opacity value instead of animating each star?', a: `All 60 stars get their position and base opacity once, at creation. Only the parent container's opacity is animated on scroll, using Math.cos(p · 2π) · -1 clamped to zero — a formula that naturally peaks at midnight and hits zero at midday. Animating one property instead of sixty keeps the effect cheap even though the starfield looks detailed.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Register ScrollTrigger and create the ScrollTrigger.create() call inside a mount effect, scoping the trigger element and the sun/moon/stars/label refs to the component instance. The render(progress) function is a pure function of one number and touches only style properties, so it ports directly — just replace direct DOM references with refs and call render() from the same onUpdate callback. Kill the ScrollTrigger instance in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why offsetting the moon's angle by Math.PI from the sun's angle is enough to guarantee they're always on opposite sides of the same circle, and how the sin/cos formula in place() converts a single angle into a screen position. It's also useful for extending the effect — ask it to add a golden-hour glow that intensifies right as the sun crosses the horizon-fade threshold, make the orbit radius responsive to viewport aspect ratio so it doesn't distort on very wide or narrow screens, or add cloud layers that drift independently during the daytime portion of the cycle. Use the conversation to build real intuition for parametric circular motion before adapting the same technique to a different orbiting-element effect.`,
      prompt: `Build a "scroll day/night sky cycle" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A pinned full-viewport sky section (GSAP ScrollTrigger pin: true) that the user scrolls through, with an intro section before it and an outro section after.
- The sun and moon must be positioned using the SAME circular-orbit formula (x = centerX + radiusX * sin(angle), y = centerY - radiusY * cos(angle)) around one shared center point, with the moon's angle always computed as the sun's current angle plus Math.PI (exactly half a rotation) — do not give them two independently-tuned animations; the opposition relationship must fall out of the shared formula.
- Drive the shared angle directly from ScrollTrigger's scroll progress (progress * Math.PI * 2 for one full 0-to-360-degree rotation across the pinned scroll distance), using scrub so the motion ties tightly to scroll position and reverses cleanly when scrolling back up.
- Add a horizon/hills silhouette element near the bottom of the sky, and fade each orbiting body's opacity to zero as its computed y-position passes a threshold near the bottom of the circle, so the true circular motion still reads visually as a natural rise-and-set behind the horizon rather than the sun/moon visibly swinging below the ground.
- Implement the sky background as a linear-gradient whose two colors (top and bottom) are computed by linearly interpolating between RGB keyframe stops defined at specific scroll-progress points around the full cycle (at minimum: midday, sunset, midnight, and sunrise), so the color is always a real blend rather than switching between a fixed set of colors.
- Scatter a field of 40-60 small star elements once with randomized position and per-star opacity, then animate only the star container's overall opacity (not each star individually) using a formula that peaks at the midnight point of the cycle and reaches zero at the midday point.
- Display a small text label showing the current phase of the cycle (e.g. Dawn, Midday, Sunset, Dusk, Midnight, Sunrise), derived from the same scroll-progress value used for everything else.`,
    },
  },
};

export default scrollDayNightSkyCycle;
