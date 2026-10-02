const dragSpinDial = {
  id: 'drag-spin-dial',
  title: 'Draggable Rotation Dial',
  lastmod: '2026-07-15',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/InertiaPlugin.min.js',
  ],
  html: `<div class="dsd-wrap">
  <div class="dsd-readout"><b id="dsdValue">50</b><span>%</span></div>
  <div class="dsd-shell" id="dsdShell">
    <div class="dsd-dial" id="dsdDial">
      <div class="dsd-marker"></div>
    </div>
  </div>
  <p class="dsd-hint">Drag to rotate · flick for inertia · snaps to 5% steps</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.dsd-wrap{display:flex;flex-direction:column;align-items:center;gap:22px}
.dsd-readout{display:flex;align-items:baseline;gap:4px;font-variant-numeric:tabular-nums}
.dsd-readout b{font-size:52px;font-weight:800;letter-spacing:-.03em;background:linear-gradient(120deg,#a5b4fc,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.dsd-readout span{font-size:20px;color:#8a90a8}
.dsd-shell{position:relative;width:210px;height:210px;border-radius:50%;background:conic-gradient(from 225deg,#818cf8 var(--fill,50%),rgba(255,255,255,.08) var(--fill,50%));display:flex;align-items:center;justify-content:center}
.dsd-shell::before{content:'';position:absolute;inset:10px;border-radius:50%;background:#0b0d16}
.dsd-dial{position:relative;width:158px;height:158px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#232c4e,#131a30);border:1px solid rgba(255,255,255,.14);box-shadow:0 18px 44px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.1);cursor:grab;touch-action:none;will-change:transform}
.dsd-dial:active{cursor:grabbing}
.dsd-marker{position:absolute;top:12px;left:50%;width:6px;height:26px;margin-left:-3px;border-radius:99px;background:#22d3ee;box-shadow:0 0 12px rgba(34,211,238,.8)}
.dsd-hint{color:#5f6782;font-size:12px;letter-spacing:.05em}`,

  js: `gsap.registerPlugin(Draggable, InertiaPlugin);

var MIN = -135, MAX = 135; // 270° of travel
var shell = document.getElementById('dsdShell');
var valueEl = document.getElementById('dsdValue');

function render(rotation) {
  var pct = Math.round((rotation - MIN) / (MAX - MIN) * 100);
  valueEl.textContent = pct;
  shell.style.setProperty('--fill', pct + '%');
}

// type:'rotation' converts pointer movement around the element's center
// into rotation degrees; bounds clamp the sweep like a real volume knob.
Draggable.create('#dsdDial', {
  type: 'rotation',
  bounds: { minRotation: MIN, maxRotation: MAX },
  inertia: true,
  edgeResistance: 0.9,
  // Snap the *thrown* end value to 5% detents (13.5° each).
  snap: function (value) {
    return Math.round(value / 13.5) * 13.5;
  },
  onDrag: function () { render(this.rotation); },
  onThrowUpdate: function () { render(this.rotation); }
});

// Start at 50%.
gsap.set('#dsdDial', { rotation: 0 });
render(0);`,

  seo: {
    title: 'Draggable Rotation Dial — Free GSAP Inertia Knob Snippet',
    description: `A volume-knob dial with GSAP Draggable's rotation mode — 270° bounds, inertia flicks, and 5% snap detents. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Draggable Rotation Dial — A Real Knob From type: "rotation"',
      description: `Rotary knobs are the hardest common control to build by hand: you're converting pointer positions into angles around a center, handling the ±180° wraparound, clamping a sweep range, and — if you want it to feel physical — adding flick momentum with snap detents. GSAP's Draggable has a dedicated mode for all of it: \`type: 'rotation'\`. This snippet builds a 270° volume-style dial with inertia, 5% detents, a glowing marker, and a conic-gradient fill ring that doubles as the value display.

**type: 'rotation' replaces the atan2 layer**

In rotation mode, Draggable computes the angle between the pointer and the element's center each frame and applies the *delta* as rotation — including the wraparound bookkeeping where naive \`atan2\` implementations jump 360° when crossing the negative x-axis. Your code never sees coordinates; it reads \`this.rotation\`, a clean accumulated angle, in \`onDrag\`.

**bounds become a mechanical sweep**

\`bounds: { minRotation: -135, maxRotation: 135 }\` gives the knob a 270° travel — the classic hi-fi volume sweep with a dead zone at the bottom. With \`edgeResistance: 0.9\`, over-rotating past an end barely moves the dial (10% follow-through), reproducing the feel of a knob hitting its end stops, and releases settle back inside the range.

**inertia + snap = detents**

\`inertia: true\` carries flick velocity into a glide, and the \`snap\` function quantizes the *solved end value*: InertiaPlugin computes where the throw would naturally stop, passes it to \`snap\`, and retargets the glide to \`Math.round(value / 13.5) × 13.5\` — 5% steps across the 270° sweep. Because snapping happens at the destination-solving stage (not as a post-hoc correction), the dial decelerates *into* a detent in one continuous motion, exactly like a weighted encoder wheel.

**One render() serves drag and throw**

Both \`onDrag\` and \`onThrowUpdate\` call the same \`render(this.rotation)\`, which maps the angle to 0–100 and writes two things: the tabular-numeral readout and a \`--fill\` custom property. Handling both callbacks matters — a flick keeps changing the value *after* release, and forgetting \`onThrowUpdate\` is the classic bug where the readout freezes while the knob keeps spinning.

**The fill ring is a conic gradient driven by one variable**

The shell's background is \`conic-gradient(from 225deg, indigo var(--fill), faint var(--fill))\` — starting at the sweep's origin (225° = bottom-left) and hard-stopping at the current percentage. Updating one CSS custom property per frame repaints the arc; no SVG, no dash math, and an inset pseudo-element hollows the ring.

**touch-action: none, again**

As with every pointer-driven control, \`touch-action: none\` on the dial keeps mobile browsers from interpreting rotation gestures as scrolling — miss it and the knob works on desktop while silently failing on touch.

**Customizing it**

Change the detent size (one divisor), widen the sweep, or emit the value to a real input for form submission. Related controls: the vanilla-math [rotary knob](/ui-snippets/rotary-knob/), linear cousins in [range slider](/ui-snippets/range-slider/) and [brightness slider](/ui-snippets/brightness-slider/), x/y momentum in [drag throw notes](/ui-snippets/drag-throw-notes/), and audio context in [volume control](/ui-snippets/volume-control/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `gsap, Draggable, and InertiaPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The dial renders at 50% with its fill ring.` },
      { title: 'Drag around the knob', text: `Pointer orbit becomes rotation; the readout tracks.` },
      { title: 'Flick and release', text: `Inertia glides the dial into a 5% detent.` },
      { title: 'Push past an end', text: `Firm resistance at ±135°, like real end stops.` },
      { title: 'Wire the value', text: `render() is where you emit to inputs or state.` },
    ] },
    features: [
      { title: 'Rotation mode', text: `Pointer orbits become clean angle deltas.` },
      { title: '270° sweep', text: `minRotation/maxRotation end stops.` },
      { title: 'Detented throws', text: `snap quantizes solved inertia endpoints.` },
      { title: 'End-stop feel', text: `0.9 edgeResistance at the extremes.` },
      { title: 'Throw-aware readout', text: `onThrowUpdate keeps values live post-release.` },
      { title: 'Conic fill ring', text: `One CSS variable paints the arc.` },
      { title: 'Touch-correct', text: `touch-action: none beats scroll hijack.` },
      { title: 'Wraparound-free', text: `No atan2 seams at ±180°.` },
    ],
    useCases: [
      { title: 'Media volume knobs', text: 'Build the knob for a [music player](/ui-snippets/music-player/) or a [volume control](/ui-snippets/volume-control/), with a 270-degree sweep and soft end stops.' },
      { title: 'Smart-home thermostats', text: 'Offer a tactile temperature or dimmer dial beside a [brightness slider](/ui-snippets/brightness-slider/), with inertia flicks and 5% detents.' },
      { title: 'Audio tool interfaces', text: 'Provide synth and mixer knobs, comparing with the vanilla-maths [rotary knob](/ui-snippets/rotary-knob/) when no library is wanted.' },
      { title: 'Settings and game options', text: 'Offer a tactile alternative to a [range slider](/ui-snippets/range-slider/) for sensitivity or field-of-view, with snap detents giving distinct feedback.' },
      { title: 'Alert thresholds', text: 'Set alert levels that feed a [gauge chart](/ui-snippets/gauge-chart/) in monitoring tools, with `edgeResistance` of 0.9 at the extreme ends.' },
      { icon: 'CODE', title: 'Related: Form Change Diff Preview — Show Exactly What Will Change Before Saving', desc: 'See the [Form Change Diff Preview — Show Exactly What Will Change Before Saving](/ui-snippets/form-change-diff-preview/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does type: "rotation" handle that manual math doesn’t?', a: `The full angle pipeline: computing pointer angle around the element's live center, applying deltas (so grabbing any point on the knob rotates from there, without jumping the marker to the pointer), and the ±180° wraparound where raw atan2 implementations suddenly leap 360°. Handlers just read this.rotation as a clean accumulated angle.` },
      { q: 'How do the 5% detents work with flicks?', a: `InertiaPlugin solves the throw's natural end rotation first, then passes it through the snap function, which rounds to the nearest 13.5° (5% of the 270° sweep). The glide is retargeted to that detent, so the dial decelerates into its resting notch in one continuous motion — snapping at the destination-solve stage, not as a jarring post-correction.` },
      { q: 'Why does the readout need onThrowUpdate as well as onDrag?', a: `Because with inertia the value keeps changing after the finger lifts: onDrag stops firing at release, but the dial glides on for several hundred milliseconds. onThrowUpdate fires during that glide. Skipping it is the classic knob bug — the number freezes at the release value while the marker visibly keeps rotating.` },
      { q: 'How does the fill arc track the knob without SVG?', a: `The shell's background is a conic-gradient starting from 225° (the sweep's bottom-left origin) with a hard color stop at var(--fill); render() writes that custom property as a percentage each frame, and the browser repaints the arc. An inset pseudo-element covers the middle, leaving a 10px ring. One variable, no dash-offset math.` },
      { q: 'Can the dial spin freely instead of having end stops?', a: `Yes — remove bounds and it rotates continuously, accumulating beyond 360° (this.rotation keeps counting, which suits jog wheels and infinite scrubbing). For value mapping, take rotation modulo 360 or map the raw accumulation to your range. Keep snap if you still want detents on an endless encoder.` },
      { q: 'How do I use this rotation dial in React, Vue, or Angular?', a: `Create the Draggable in a mount effect — useEffect, onMounted, or ngAfterViewInit — from a dial ref, and kill it in the cleanup so pointer listeners release on unmount. Emit values from render() via a callback prop or event rather than binding rotation to state (that would re-render per frame); commit to state only on onDragEnd/onThrowComplete. The ring and readout style directly with Tailwind arbitrary values.` },
      { q: 'How do I set the dial to a specific starting value instead of the default?', a: `Draggable instances expose rotation as a settable property, not just a read value. Compute the starting angle from your saved value — invert the render() mapping, e.g. rotation = (value / 100) * 270 - 135 for this 270° sweep — and set it on the Draggable instance before the first render() call, then call render(startRotation) once to sync the readout and fill ring. GSAP's set() on the target element also accepts a rotation value directly if you'd rather skip the Draggable instance property.` },
    ],
    aiPrompt: {
      paragraph: `Instead of reverse-engineering GSAP's rotation pipeline yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the snap function's Math.round(value / 13.5) * 13.5 formula turns InertiaPlugin's solved end rotation into 5% detents, and why edgeResistance of 0.9 produces a firm end-stop feel rather than a soft one. The same assistant can help optimize it, for instance checking whether writing the --fill custom property every single onDrag and onThrowUpdate call could be throttled without hurting the visual smoothness of the conic-gradient fill ring. It's also useful for extending the dial: ask it to add double-click-to-reset-to-default, support two-finger rotation gestures on touch, or expose the current value to a hidden form input for submission. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a draggable rotary dial control in plain HTML, CSS, and JavaScript using GSAP's Draggable plugin with its rotation type and InertiaPlugin (load both from a CDN alongside core GSAP) — no manual pointer-angle math.

Requirements:
- A circular knob element configured with Draggable's rotation type so dragging anywhere on the knob rotates it based on the pointer's angle around its own center, not the pointer's raw x/y position.
- Constrain the rotation to a 270-degree sweep using minRotation and maxRotation bounds (e.g. -135 to 135 degrees), with edgeResistance set high enough (around 0.9) that dragging past either end barely moves the knob further, mimicking a physical end stop.
- Enable inertia so that releasing the knob mid-flick continues rotating it and glides to a natural stop rather than halting instantly, and provide a snap function that rounds the inertia-solved end rotation to the nearest 5 percent step of the total sweep range, so flicks always settle on a clean detent value.
- Register both an onDrag and an onThrowUpdate callback that call the same rendering function, since the value keeps changing during the momentum glide after the pointer is released, not only while actively dragging.
- That rendering function must map the current rotation to a 0-100 percentage, update a live numeric readout, and set a single CSS custom property that drives a conic-gradient background arc representing the fill amount, without using SVG or manual stroke-dasharray math.
- Set touch-action: none on the draggable knob element so mobile browsers hand rotation gestures to the drag library instead of interpreting them as page scrolling.`,
    },
  },
};

export default dragSpinDial;
