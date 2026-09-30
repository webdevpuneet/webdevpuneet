const independenceDayFlagHoist = {
  id: 'independence-day-flag-hoist',
  title: 'Independence Day Flag Hoist',
  lastmod: '2026-08-15',
  category: 'scroll',
  html: `<div class="ind-intro">
  <span class="ind-date">15 August</span>
  <h1 class="ind-title">Independence Day</h1>
  <p class="ind-sub">Scroll to hoist the flag</p>
  <span class="ind-cue" aria-hidden="true"></span>
</div>

<section class="ind-section" id="indSection">
  <div class="ind-stage">
    <div class="ind-sun" id="indSun"></div>

    <div class="ind-scene">
      <div class="ind-rig" id="indRig">
        <div class="ind-pole">
          <span class="ind-finial"></span>
        </div>

        <div class="ind-flagwrap" id="indFlagWrap">
          <div class="ind-bundle" id="indBundle"></div>
          <div class="ind-flag" id="indFlag">
            <div class="ind-band ind-saffron"></div>
            <div class="ind-band ind-white">
              <div class="ind-chakra" id="indChakra"></div>
            </div>
            <div class="ind-band ind-green"></div>
            <div class="ind-shine"></div>
          </div>
        </div>

        <span class="ind-base"></span>
      </div>

      <div class="ind-petals" id="indPetals" aria-hidden="true"></div>
    </div>

    <div class="ind-readout">
      <span class="ind-pct" id="indPct">0%</span>
      <span class="ind-label">hoisted</span>
    </div>

    <div class="ind-salute" id="indSalute">
      <h2>Happy Independence Day</h2>
      <p>Jai Hind</p>
    </div>
  </div>
</section>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #0a0f1f;
  color: #f8fafc;
}

/* ---------- intro spacer ---------- */

.ind-intro {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; text-align: center; padding: 0 22px;
}

.ind-date {
  font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase;
  color: #ff9933; font-weight: 700;
}

.ind-title {
  font-size: clamp(30px, 7vw, 58px); font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(90deg, #ff9933, #ffffff 50%, #138808);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

.ind-sub { color: #94a3b8; font-size: 15px; }

.ind-cue {
  width: 22px; height: 34px; margin-top: 10px;
  border: 2px solid #475569; border-radius: 12px; position: relative;
}
.ind-cue::after {
  content: ''; position: absolute; left: 50%; top: 7px;
  width: 3px; height: 7px; margin-left: -1.5px; border-radius: 2px;
  background: #94a3b8; animation: indCue 1.6s ease-in-out infinite;
}
@keyframes indCue {
  0%, 100% { transform: translateY(0); opacity: 1; }
  60% { transform: translateY(11px); opacity: 0; }
}

/* ---------- the pinned stage ---------- */

.ind-section { min-height: 340vh; position: relative; }

.ind-stage {
  position: sticky; top: 0; height: 100vh; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background:
    radial-gradient(120% 80% at 50% 100%, #16233f 0%, #0a0f1f 60%),
    linear-gradient(180deg, #0a0f1f, #101a30);
}

.ind-sun {
  position: absolute; left: 50%; top: 50%;
  width: 620px; height: 620px; margin: -340px 0 0 -270px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,153,51,0.26), rgba(255,153,51,0) 60%);
  opacity: 0; transition: opacity 0.9s ease; pointer-events: none;
}
.ind-sun.lit { opacity: 1; }

.ind-scene {
  position: relative;
  height: min(66vh, 430px);
  display: flex; justify-content: center;
}

/* the rig is pole + flag, centred as one unit */
.ind-rig {
  --fw: clamp(168px, 40vw, 252px);
  --fh: calc(var(--fw) / 1.5);     /* the flag's official 3:2 ratio */
  position: relative; height: 100%;
  width: calc(var(--fw) + 10px);
}

.ind-pole {
  position: absolute; left: 0; top: 0; bottom: 0; width: 10px;
  background: linear-gradient(90deg, #64748b, #e2e8f0 42%, #475569);
  border-radius: 5px;
}

.ind-finial {
  position: absolute; left: 50%; top: -13px;
  width: 18px; height: 18px; margin-left: -9px; border-radius: 50%;
  background: radial-gradient(circle at 32% 30%, #ffe9a8, #d4a017 62%, #8a6508);
  box-shadow: 0 0 14px rgba(212,160,23,0.55);
}

.ind-base {
  position: absolute; left: -34px; bottom: -12px;
  width: 78px; height: 26px; border-radius: 50%;
  background: radial-gradient(ellipse at 50% 30%, #334155, #16213a 70%);
}

/* ---------- flag ---------- */

.ind-flagwrap {
  position: absolute; left: 10px; top: 0;
  width: var(--fw); height: var(--fh);
  transform: translateY(0);
  will-change: transform;
}

/* the rolled-up bundle that rides the pole before the unfurl */
.ind-bundle {
  position: absolute; left: 0; top: 0;
  width: 18px; height: var(--fh); border-radius: 0 9px 9px 0;
  background: linear-gradient(180deg, #ff9933 0 34%, #f1f5f9 34% 66%, #138808 66%);
  box-shadow: 2px 0 8px rgba(0,0,0,0.35);
  transform-origin: left center;
}

.ind-flag {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  border-radius: 0 3px 3px 0; overflow: hidden;
  box-shadow: 3px 6px 22px rgba(0,0,0,0.45);
  clip-path: inset(0 100% 0 0);        /* furled: fully clipped from the right */
  transform-origin: left center;
}

.ind-band { flex: 1; position: relative; }
.ind-saffron { background: #ff9933; }
.ind-white   { background: #ffffff; display: flex; align-items: center; justify-content: center; }
.ind-green   { background: #138808; }

/* a moving sheen sells the cloth without touching layout */
.ind-shine {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(100deg,
    rgba(255,255,255,0) 38%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0) 62%);
  background-size: 260% 100%;
  background-position: 120% 0;
  mix-blend-mode: overlay;
}

.ind-flag.waving { animation: indWave 3.4s ease-in-out infinite; }
.ind-flag.waving .ind-shine { animation: indSheen 3.4s ease-in-out infinite; }

@keyframes indWave {
  0%, 100% { transform: perspective(500px) rotateY(0deg) skewY(0deg); }
  30%      { transform: perspective(500px) rotateY(-7deg) skewY(-1.1deg); }
  65%      { transform: perspective(500px) rotateY(6deg) skewY(1deg); }
}
@keyframes indSheen {
  0%   { background-position: 120% 0; }
  100% { background-position: -60% 0; }
}

/* ---------- Ashoka Chakra: 24 spokes, 3/4 of the white band ---------- */

.ind-chakra {
  position: relative;
  /* each band is fh/3 tall; the chakra is 3/4 of that, per the flag code */
  width: calc(var(--fh) / 3 * 0.75);
  height: calc(var(--fh) / 3 * 0.75);
  border: 1.6px solid #000080; border-radius: 50%;
}
.ind-chakra::after {
  content: ''; position: absolute; left: 50%; top: 50%;
  width: 13%; height: 13%; margin: -6.5% 0 0 -6.5%;
  background: #000080; border-radius: 50%;
}
.ind-spoke {
  position: absolute; left: calc(50% - 0.7px); top: 50%;
  width: 1.4px; height: 50%;
  background: #000080;
  transform-origin: 50% 0;             /* pivot on the hub, so 24 × 15° radiates evenly */
}

/* ---------- petal shower ---------- */

.ind-petals { position: absolute; inset: -8% -20% 0; pointer-events: none; }
.ind-petal {
  position: absolute; top: -6%;
  width: 9px; height: 9px; border-radius: 50% 0 50% 50%;
  opacity: 0;
}
.ind-petals.falling .ind-petal { animation: indFall linear forwards; }

@keyframes indFall {
  0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
  10%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(78vh) rotate(420deg); }
}

/* ---------- overlays ---------- */

.ind-readout {
  position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%);
  display: flex; align-items: baseline; gap: 7px;
  font-size: 13px; color: #64748b;
}
.ind-pct {
  font-size: 19px; font-weight: 800; color: #ff9933;
  font-variant-numeric: tabular-nums;
}

.ind-salute {
  position: absolute; left: 0; right: 0; bottom: 12%;
  text-align: center; padding: 0 20px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  pointer-events: none;
}
.ind-salute.show { opacity: 1; transform: translateY(0); }
.ind-salute h2 {
  font-size: clamp(21px, 4.4vw, 33px); font-weight: 800; letter-spacing: -0.01em;
  background: linear-gradient(90deg, #ff9933, #ffffff 50%, #138808);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.ind-salute p {
  margin-top: 5px; font-size: 13px; letter-spacing: 0.24em;
  text-transform: uppercase; color: #94a3b8;
}

@media (prefers-reduced-motion: reduce) {
  .ind-cue::after, .ind-flag.waving, .ind-flag.waving .ind-shine { animation: none; }
  .ind-petals { display: none; }
}`,

  js: `var section = document.getElementById('indSection');
var rig = document.getElementById('indRig');
var wrap = document.getElementById('indFlagWrap');
var flag = document.getElementById('indFlag');
var bundle = document.getElementById('indBundle');
var chakra = document.getElementById('indChakra');
var petals = document.getElementById('indPetals');
var sun = document.getElementById('indSun');
var salute = document.getElementById('indSalute');
var pctEl = document.getElementById('indPct');

var PETAL_COLORS = ['#ff9933', '#ffffff', '#138808', '#ffd08a'];
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The Ashoka Chakra has exactly 24 spokes, one every 15 degrees. Each spoke
// pivots on the hub (transform-origin: 50% 0), so a single rotate lays it out.
function buildChakra() {
  for (var i = 0; i < 24; i++) {
    var spoke = document.createElement('span');
    spoke.className = 'ind-spoke';
    spoke.style.transform = 'rotate(' + (i * 15) + 'deg)';
    chakra.appendChild(spoke);
  }
}

function buildPetals() {
  if (reduced) return;
  for (var i = 0; i < 22; i++) {
    var p = document.createElement('span');
    p.className = 'ind-petal';
    p.style.left = (Math.random() * 100) + '%';
    p.style.background = PETAL_COLORS[i % PETAL_COLORS.length];
    p.style.animationDuration = (2.6 + Math.random() * 2.2) + 's';
    p.style.animationDelay = (Math.random() * 1.6) + 's';
    petals.appendChild(p);
  }
}

// Remap a 0..1 progress value onto a sub-range, so each stage of the
// sequence owns its own slice of the scroll and clamps outside it.
function phase(p, start, end) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

var showering = false;
var ticking = false;

function update() {
  ticking = false;

  var rect = section.getBoundingClientRect();
  var total = section.offsetHeight - window.innerHeight;
  var p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

  // 1. Hoist — the bundle climbs the pole.
  var hoist = easeOut(phase(p, 0.04, 0.56));
  var travel = rig.clientHeight - wrap.offsetHeight;
  wrap.style.transform = 'translateY(' + ((1 - hoist) * travel) + 'px)';

  // 2. Unfurl — clip-path reveals the cloth left to right. Clipping rather
  // than scaling keeps the chakra perfectly circular throughout.
  var unfurl = phase(p, 0.56, 0.78);
  flag.style.clipPath = 'inset(0 ' + ((1 - unfurl) * 100).toFixed(2) + '% 0 0)';
  bundle.style.opacity = String(1 - unfurl);
  bundle.style.transform = 'scaleX(' + (1 - unfurl * 0.4) + ')';

  // 3. Chakra turns with the hoist, then the flag takes the wind.
  chakra.style.transform = 'rotate(' + (hoist * 540).toFixed(1) + 'deg)';
  flag.classList.toggle('waving', !reduced && unfurl > 0.995);
  sun.classList.toggle('lit', unfurl > 0.35);
  salute.classList.toggle('show', p > 0.85);

  pctEl.textContent = Math.round(hoist * 100) + '%';

  // Petals fall once, at the moment the flag opens.
  if (!showering && unfurl > 0.99) {
    showering = true;
    petals.classList.add('falling');
  } else if (showering && unfurl < 0.5) {
    showering = false;
    petals.classList.remove('falling');   // rearm if the user scrolls back up
  }
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

buildChakra();
buildPetals();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', update);
update();`,

  seo: {
    title: 'Independence Day Flag Hoist — Free Scroll Animation Snippet',
    description: 'Scroll-triggered Indian flag hoisting animation in pure HTML, CSS & JS. The bundle climbs, the flag unfurls, a 24-spoke Ashoka Chakra turns. No libraries.',
    about: {
      title: 'Independence Day Flag Hoist — Scroll-Driven Hoisting, Clip-Path Unfurl & a Correct 24-Spoke Ashoka Chakra',
      description: `Most festive flag animations on the web autoplay on page load, finish before anyone has looked at them, and draw the flag with whatever proportions happened to fit the layout. This snippet takes the opposite approach on both counts. The entire sequence — the bundle climbing the pole, the cloth unfurling, the chakra turning, the petal shower, the greeting — is mapped to scroll position, so the viewer performs the hoisting themselves at their own pace, and every dimension follows the official specification of the Indian national flag.

**Scroll progress as the single source of truth**

A tall \`.ind-section\` holds a \`position: sticky\` stage that pins for the duration of the scroll. On every frame the handler reads \`section.getBoundingClientRect()\` and computes progress as \`-rect.top / (section.offsetHeight - window.innerHeight)\`, clamped to 0..1. That one number drives everything else, which means there is no timeline to keep in sync, no autoplay to miss, and scrubbing backwards runs the whole sequence in reverse for free. The scroll listener is registered \`{ passive: true }\` and throttled through \`requestAnimationFrame\` with a \`ticking\` flag, so the browser never queues more than one layout read per frame.

**Phases that own their own slice of the scroll**

A small \`phase(p, start, end)\` helper remaps the global 0..1 progress onto a sub-range and clamps outside it, so the hoist runs from 4% to 56% of the scroll, the unfurl from 56% to 78%, and the greeting appears past 85%. Adding or re-timing a stage means changing two numbers rather than restructuring the logic. The hoist itself is passed through an \`easeOut\` cubic so the flag decelerates as it reaches the finial, the way a real halyard is eased off at the top.

**Unfurling with clip-path instead of a scale transform**

The obvious way to open a flag is \`transform: scaleX()\` from the pole edge, and it is the wrong one: scaling the container stretches everything inside it, so the Ashoka Chakra becomes an ellipse that only rounds out at the final frame. This snippet animates \`clip-path: inset(0 N% 0 0)\` instead, revealing the cloth left to right while every child keeps its true geometry. The chakra is a perfect circle at 1% open and at 100% open. A separate rolled \`.ind-bundle\` element rides the pole during the climb and fades out as the unfurl begins, matching the way a flag is actually hoisted furled and then released.

**A chakra built to specification**

The flag's proportions are 3:2, expressed as \`--fh: calc(var(--fw) / 1.5)\` so the ratio holds at every viewport width. Each of the three bands takes an equal third, and the Ashoka Chakra is sized at three quarters of the white band's height — the ratio laid down in the flag code. The 24 spokes are generated in a loop, each one a thin absolutely-positioned bar with \`transform-origin: 50% 0\` pivoting on the hub, rotated by \`i * 15\` degrees. Because the spokes pivot on a shared centre point, the layout is exact rather than eyeballed, and the whole chakra is rotated as a unit by the scroll progress.

**Motion that respects the reader**

The waving animation is a CSS keyframe on the flag element only, applied via a \`.waving\` class once the unfurl completes, so it never fights the inline \`clip-path\` the scroll handler is writing. The petal shower is created once in JavaScript with randomised positions, colours and durations, then triggered by a single class toggle — and it rearms if the visitor scrolls back up, so the sequence is repeatable rather than one-shot. A \`prefers-reduced-motion\` check skips petal generation entirely and a matching media query disables the wave and sheen keyframes, leaving the scroll-driven hoist itself intact for readers who have asked for less motion.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll into the pinned stage', text: 'The intro panel fills the first screen and the stage pins beneath it. From the moment the section enters the viewport, scroll position — not a timer — controls every part of the sequence.' },
        { title: 'Watch the bundle climb the pole', text: 'Through the first half of the scroll the furled flag rides up the halyard, easing to a stop at the gold finial. The percentage readout at the bottom tracks the hoist so the mechanism stays legible.' },
        { title: 'Keep scrolling to unfurl the tricolour', text: 'Past the top of the pole the cloth opens left to right via an animated clip-path, the rolled bundle fades out, and the warm glow behind the scene lifts as the flag catches the light.' },
        { title: 'See the chakra and the petal shower', text: 'The 24-spoke Ashoka Chakra turns with the hoist and lands upright, and a shower of tricolour petals falls once the flag is fully open — the way flowers are traditionally tucked into the bundle before it is released.' },
        { title: 'Reach the greeting', text: 'Past 85% of the scroll the "Happy Independence Day / Jai Hind" line fades up beneath the flag, and the flag settles into a slow looping wave with a sheen sweeping across the cloth.' },
        { title: 'Scroll back up to replay it', text: 'Every stage is derived from scroll position rather than fired once, so scrubbing backwards reverses the whole sequence and the petal shower rearms itself for the next pass.' },
      ],
    },
    features: [
      'Entire sequence driven by scroll position — no autoplay, no timeline library, no dependencies',
      'Sticky stage with rAF-throttled, passive scroll listener that reads layout once per frame',
      'phase() helper maps global progress onto per-stage sub-ranges, so re-timing a stage is a two-number change',
      'Unfurl uses animated clip-path rather than scaleX, keeping the Ashoka Chakra perfectly circular throughout',
      'Official flag geometry: 3:2 ratio via CSS calc, equal thirds, chakra at three quarters of the white band',
      'All 24 chakra spokes generated in a loop, pivoting on a shared hub at exact 15-degree intervals',
      'Rolled bundle element rides the pole during the hoist and fades out as the cloth is released',
      'One-shot petal shower with randomised colours and durations that rearms when scrolled back up',
      'prefers-reduced-motion support: petals skipped in JS, wave and sheen keyframes disabled in CSS',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Independence Day or Republic Day campaign landing page', desc: 'A scroll-hoisted flag gives an Indian national-day microsite a centrepiece that visitors participate in rather than watch, which holds attention far longer than a looping GIF banner. Pair it with a [scroll progress bar](/ui-snippets/scroll-progress/) so readers can see how much of the story remains.' },
      { icon: 'APP', title: 'Festive homepage takeover for an Indian brand or product', desc: 'Because the whole effect is one section of vanilla HTML and CSS, it can be dropped above an existing homepage for the week around 15 August and removed afterwards without touching the rest of the build or shipping an animation library to every visitor for the rest of the year.' },
      { icon: 'FLOW', title: 'Reference implementation for scroll-linked multi-stage sequences', desc: 'The phase-mapping pattern here — one clamped progress value fanned out into overlapping sub-ranges — is the correct structure for any scroll-driven story with several beats, whether that is a product exploded view, an onboarding walkthrough, or a data reveal.' },
      { icon: 'LEARN', title: 'Teaching clip-path versus transform for reveal animations', desc: 'The snippet is a concrete demonstration of why a scale transform is the wrong tool when a revealed element has children with fixed geometry, and it makes the difference visible: the chakra stays round because the reveal clips rather than stretches.' },
      { icon: 'CODE', title: 'School, college or community event site', desc: 'Independence Day pages built for institutions usually need to work on old hardware and slow connections. This runs with zero network requests beyond the page itself, no images, and a single rAF-throttled listener, so it stays smooth on low-end Android devices.' },
      { icon: 'CARD', title: 'Scroll-triggered hero for any raise, reveal or unveiling metaphor', desc: 'Swap the tricolour for a product, a banner, or a curtain and the same rig works for any "lift and reveal" hero — the pole, hoist easing, clip-path unfurl and settle-into-motion finish are all independent of the artwork they carry.' },
      { icon: 'CODE', title: 'Related: Lenis Smooth Scroll Page', desc: 'See the [Lenis Smooth Scroll Page](/ui-snippets/lenis-smooth-scroll/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: 3D Card Rotate on Scroll (view-timeline)', desc: 'See the [3D Card Rotate on Scroll (view-timeline)](/ui-snippets/view-timeline-card-rotate-3d/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the animation need GSAP, ScrollTrigger, or any other library?', a: 'No. It is plain HTML, CSS, and vanilla JavaScript with zero dependencies and no CDN scripts. The pinning is CSS position: sticky, the progress value comes from getBoundingClientRect(), and the wave and petal motion are CSS keyframes toggled by a class.' },
      { q: 'Why is the unfurl done with clip-path instead of scaleX?', a: 'Scaling the flag container horizontally stretches every child with it, so the Ashoka Chakra would render as an ellipse until the very last frame. Animating clip-path: inset(0 N% 0 0) reveals the cloth left to right while leaving each child at its true size, so the chakra is a perfect circle at every stage of the reveal.' },
      { q: 'Are the flag proportions and the chakra accurate?', a: 'Yes. The flag is built at the official 3:2 ratio using --fh: calc(var(--fw) / 1.5), the three bands take an equal third each, and the chakra is sized at three quarters of the white band height as specified in the flag code. The chakra is drawn with exactly 24 spokes generated in a loop at 15-degree intervals, each pivoting on the hub.' },
      { q: 'How do I change how much scrolling the sequence takes?', a: 'Adjust min-height on .ind-section — the default 340vh means the stage stays pinned for a little over three screens of scrolling. The stage timings are independent of that: the hoist, unfurl and greeting are expressed as fractions of progress inside the phase() calls, so they stay proportional whatever height you choose.' },
      { q: 'What happens for visitors who prefer reduced motion?', a: 'The JavaScript checks prefers-reduced-motion before generating any petals, and a matching CSS media query disables the wave animation, the sheen sweep, and the scroll cue. The scroll-driven hoist and unfurl still work, since those are direct responses to the user own scrolling rather than autonomous motion.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep refs to the section, flag wrap, flag and chakra, build the chakra spokes and petals in an effect that runs once on mount, and register the scroll and resize listeners in that same effect — returning a cleanup function that removes both. In React use useEffect with an empty dependency array and useRef for the elements; in Vue use onMounted and onUnmounted with template refs; in Angular use ngAfterViewInit and ngOnDestroy with ViewChild.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a second scroll stage where the national anthem duration is tracked as a 52-second progress ring beside the flag, which turns the piece into a timed observance rather than a single reveal. Other natural extensions: swap the petal shower for a scroll-driven particle burst that follows the flag's wave phase, add a "half-mast" variant that stops the hoist at 50% for remembrance days, generate the chakra as inline SVG so the spokes can be stroked and animated individually, or drive the same rig from a Web Animations API timeline so the hoist can also be played back on a button press for users who arrive by deep link.`,
      prompt: `Build a scroll-triggered Indian Independence Day flag hoisting animation in plain HTML, CSS, and JavaScript — no frameworks, no libraries, no external images.

Requirements:
- A tall section containing a position: sticky stage that pins for the length of the scroll. Compute a single 0..1 progress value from getBoundingClientRect() as -rect.top / (section.offsetHeight - window.innerHeight), clamped.
- Throttle the scroll handler with requestAnimationFrame and a ticking flag, and register the listener as passive. Recompute on resize.
- Map that one progress value onto separate stages with a phase(p, start, end) helper that remaps and clamps to a sub-range: hoist roughly 4%-56%, unfurl 56%-78%, greeting past 85%.
- Stage 1: a rolled flag bundle climbs the pole via translateY, eased with an ease-out cubic so it decelerates at the top.
- Stage 2: the flag unfurls left to right using an animated clip-path: inset(0 N% 0 0) — NOT scaleX, because scaling would distort the chakra. Fade the bundle out as the cloth opens.
- Draw the flag to the official 3:2 ratio using a CSS custom property and calc, with three equal horizontal bands in #FF9933, #FFFFFF and #138808.
- Generate the Ashoka Chakra in JavaScript: exactly 24 navy (#000080) spokes at 15-degree intervals, each absolutely positioned with transform-origin at the hub, inside a circular ring sized to three quarters of the white band height. Rotate the whole chakra with the hoist progress.
- Stage 3: once unfurled, add a class that starts a looping CSS wave animation plus a sheen sweep on the cloth, trigger a one-time shower of falling tricolour petals created in JS with randomised positions and durations, and fade in a "Happy Independence Day / Jai Hind" greeting.
- Make the petal shower rearm if the user scrolls back up, so the sequence is fully reversible.
- Respect prefers-reduced-motion: skip generating petals in JS and disable the wave, sheen and cue keyframes in CSS, while leaving the scroll-driven hoist working.`,
    },
  },
};

export default independenceDayFlagHoist;
