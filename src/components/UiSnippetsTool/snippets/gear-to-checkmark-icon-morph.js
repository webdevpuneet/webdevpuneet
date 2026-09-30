const gearToCheckmarkIconMorph = {
  id: 'gear-to-checkmark-icon-morph',
  title: 'Gear-to-Checkmark Icon Morph',
  category: 'animations',
  html: `<div class="wrap">
  <h2>Settings Panel</h2>
  <p class="hint">Click the button — the gear icon morphs into a checkmark to confirm the save, then morphs back.</p>

  <button class="save-btn" id="saveBtn">
    <svg class="morph-icon" id="morphIcon" viewBox="0 0 64 64" width="22" height="22">
      <path id="morphPath" d="" fill="currentColor"></path>
    </svg>
    <span id="btnLabel">Save Settings</span>
  </button>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 40px 20px; }

.wrap { width: 100%; max-width: 360px; text-align: center; }
h2 { font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 8px; }
.hint { font-size: 13px; color: #64748b; line-height: 1.6; margin: 0 0 24px; }

.save-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 22px; border-radius: 10px; border: none;
  background: #6366f1; color: #fff; font-size: 14.5px; font-weight: 700;
  font-family: inherit; cursor: pointer;
  transition: background 0.25s ease, transform 0.1s ease;
}
.save-btn:hover { background: #4f46e5; }
.save-btn:active { transform: scale(0.97); }
.save-btn.done { background: #16a34a; }

.morph-icon { flex-shrink: 0; }`,
  js: `/* Two 8-point closed polygons in a 0-64 viewBox, same vertex count so a
   plain per-index linear interpolation ("lerp") of the coordinates produces
   a genuine shape morph — no library, no CSS d: path() reliance. */
const gearPts = [
  [58, 32], [44.02, 44.02], [32, 58], [19.98, 44.02],
  [6, 32], [19.98, 19.98], [32, 6], [44.02, 19.98],
];
const checkPts = [
  [24, 43], [13, 32], [9, 36], [24, 51],
  [39.5, 35.5], [55, 20], [51, 16], [37.5, 29.5],
];

function pointsToPath(pts) {
  return pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ') + ' Z';
}

function lerpPath(a, b, t) {
  const pts = a.map((p, i) => [
    p[0] + (b[i][0] - p[0]) * t,
    p[1] + (b[i][1] - p[1]) * t,
  ]);
  return pointsToPath(pts);
}

const pathEl = document.getElementById('morphPath');
const btn = document.getElementById('saveBtn');
const label = document.getElementById('btnLabel');
pathEl.setAttribute('d', pointsToPath(gearPts));

let rafId = null;
function animateMorph(from, to, duration, onDone) {
  if (rafId) cancelAnimationFrame(rafId);
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    pathEl.setAttribute('d', lerpPath(from, to, eased));
    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else if (onDone) {
      onDone();
    }
  }
  rafId = requestAnimationFrame(frame);
}

let busy = false;
btn.addEventListener('click', () => {
  if (busy) return;
  busy = true;
  btn.classList.add('done');
  label.textContent = 'Saved!';
  animateMorph(gearPts, checkPts, 420, () => {
    setTimeout(() => {
      animateMorph(checkPts, gearPts, 420, () => { busy = false; });
      btn.classList.remove('done');
      label.textContent = 'Save Settings';
    }, 1100);
  });
});`,
  seo: {
    title: 'SVG Icon Morph Animation — Gear to Checkmark JS',
    description: 'Settings gear icon morphs into a checkmark on save using real SVG path point interpolation, no library, then reverts automatically. Exports to React, Vue & Tailwind.',
    about: {
      title: 'SVG Icon Morph Animation — Interpolating a Gear Path into a Checkmark Path',
      description: `SVG icon morphing has become one of the defining micro-interactions of modern interfaces: instead of swapping one static icon for another, the shape itself flows from one form into the next. This snippet demonstrates the technique with a concrete, common use case — a settings gear icon that morphs into a checkmark the instant a user saves a form, then morphs back after a short pause.

**Why point interpolation instead of CSS \`d\` animation**

Chromium browsers can animate the SVG \`d\` attribute directly with CSS if both paths have an identical command structure, but that support is inconsistent across browsers and brittle to author by hand. This snippet instead does the interpolation itself in JavaScript, which works in every browser that supports SVG at all. Both the gear and the checkmark are stored as plain arrays of \`[x, y]\` coordinate pairs — \`gearPts\` and \`checkPts\` — each containing exactly 8 points. Matching the point count is the entire trick: with the same number of vertices in the same order, point 0 of the gear can smoothly travel to point 0 of the checkmark, point 1 to point 1, and so on, without any point needing to appear or disappear mid-animation.

**Building the path string**

\`pointsToPath(pts)\` walks the array and builds a standard SVG path data string — \`M x0,y0 L x1,y1 L x2,y2 ... Z\` — starting with a moveto for the first point and lineto commands for the rest, closed with \`Z\`. \`lerpPath(a, b, t)\` produces an in-between path by linearly interpolating every coordinate: \`x = ax + (bx - ax) * t\`. At \`t = 0\` you get the gear exactly; at \`t = 1\` you get the checkmark exactly; anywhere between, you get a genuinely blended shape, not a crossfade of two overlaid icons.

**Driving the morph with requestAnimationFrame**

\`animateMorph(from, to, duration, onDone)\` runs its own animation loop with \`requestAnimationFrame\`, computing elapsed time against \`performance.now()\`, normalizing it to a 0–1 progress value, applying a cubic ease-out curve, and writing a freshly interpolated \`d\` attribute to \`#morphPath\` on every frame. This gives frame-accurate control that a CSS transition on \`d\` cannot reliably offer, and it means the same function can drive a morph in either direction just by swapping the \`from\`/\`to\` arrays — which is exactly how the checkmark reverts back into the gear a little over a second after saving.

**Designing your own shape pairs**

The hardest part of building a custom icon morph isn't the animation code — it's designing two shapes with matching, correspondingly-ordered vertex counts. Start from the simpler shape's silhouette (here, a 4-tooth cog star), count its points, then design the target shape (the checkmark) with the same number of points by subdividing long straight edges with extra collinear midpoints where needed. Collinear midpoints don't distort the static shape, but they give the interpolator enough vertices to keep pace with the more complex silhouette, which keeps the in-between frames looking organic instead of twisted.

**Where this pattern fits**

Beyond settings-save confirmations, the same \`lerpPath\`/\`animateMorph\` pair works for any binary or cyclic icon-state change: a bookmark outline morphing to filled, a play triangle morphing to a pause glyph, or a hamburger morphing to a close icon — as long as you design point-matched path pairs for each state. It's a small, dependency-free utility worth keeping in a shared icon-morph module if your app uses the pattern more than once.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Save Settings', text: 'The gear icon interpolates from its 8-point cog path into an 8-point checkmark path over 420ms, holds, then morphs back.' },
        { title: 'Design your own shape pair', text: 'Replace gearPts and checkPts with your own [x, y] arrays — keep the same length in both and use a 0–64 viewBox for consistency.' },
        { title: 'Adjust timing', text: 'Change the 420 (duration ms) argument in the animateMorph calls, or the 1100ms setTimeout delay before reverting.' },
        { title: 'Change the easing curve', text: 'Swap the cubic ease-out formula (1 - Math.pow(1 - t, 3)) for linear (t) or a different power for a snappier or gentler feel.' },
        { title: 'Trigger it programmatically', text: 'Call animateMorph(gearPts, checkPts, duration, callback) from any async success handler instead of a click listener.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Genuine SVG path interpolation between two 8-point polygons, not a crossfade of two separate icons',
      'pointsToPath() builds a valid M/L/Z path string from a plain coordinate array',
      'lerpPath() linearly blends every vertex between the source and target shape at any progress t',
      'requestAnimationFrame-driven loop with performance.now() timing for frame-accurate control',
      'Cubic ease-out easing applied to the interpolation progress for a natural deceleration',
      'Same animateMorph() function drives the morph forward and in reverse',
      'Button background and label swap alongside the icon morph for a cohesive save confirmation',
      'Zero dependencies — no GSAP MorphSVG plugin, no KUTE.js',
      'Busy-state guard prevents overlapping animations from rapid repeated clicks',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'FORM', title: 'Save/confirm button feedback', desc: 'The core use case shown here — morph a settings or edit icon into a checkmark the instant an async save resolves, giving users unambiguous confirmation without a separate toast.' },
      { icon: 'APP', title: 'Settings and preferences panels', desc: 'Pair with a [settings panel](/ui-snippets/settings-panel/) so every save action in the panel gets the same lightweight, dependency-free confirmation animation.' },
      { icon: 'CODE', title: 'Learn path-matched shape morphing', desc: 'A minimal, readable reference for how vertex-matched SVG interpolation works before reaching for a heavier morphing library.' },
      { icon: 'DESIGN', title: 'Icon state libraries', desc: 'Extend the lerpPath/animateMorph pair to build a small internal utility that morphs between any pair of point-matched icons across your product.' },
      { icon: 'ACCESS', title: 'Reduced-motion friendly', desc: 'Because the morph is driven by one JS function, it is easy to gate behind a prefers-reduced-motion check and swap to an instant icon change instead.' },
      { icon: 'CODE', title: 'Form submit buttons', desc: 'Use the same pattern on a form submit button icon to visually confirm success without navigating away from the page.' },
    ],
    faqs: [
      { q: 'Why do both shapes need the same number of points?', a: 'The interpolator matches points by index — point 0 of the gear travels to point 0 of the checkmark, and so on. If the arrays had different lengths, some points would have no partner to interpolate toward, producing a broken or jumping path instead of a smooth morph.' },
      { q: 'Does this rely on the CSS d: path() animation feature?', a: 'No. The d attribute is rewritten in JavaScript every animation frame via requestAnimationFrame, so it works in any browser with SVG support — there is no dependency on CSS d interpolation, which has inconsistent cross-browser support.' },
      { q: 'How do I design my own point-matched icon pair?', a: 'Start from your simpler shape and count its vertices. Design the second shape to have exactly the same count, adding collinear midpoints along straight edges of the simpler shape if needed to reach the target count without changing its static appearance.' },
      { q: 'Can I use this for more than two states, like a three-way cycle?', a: 'Yes — store a third point-matched array and call animateMorph with whichever two arrays represent the current and next state. All three arrays need the same point count for every possible pairing to interpolate cleanly.' },
      { q: 'Is this the same technique as GSAP MorphSVG or KUTE.js?', a: 'Conceptually similar (both ultimately interpolate path data), but this snippet does the interpolation with a small hand-written function instead of a library, which keeps the bundle dependency-free at the cost of the automatic point-matching those libraries provide for mismatched paths.' },
      { q: 'Why does the shape look slightly different from a "real" gear or checkmark icon set?', a: 'The vertices were hand-designed to keep both shapes at exactly 8 points for a clean interpolation. For pixel-perfect icon fidelity, redesign both paths from your icon set\'s actual outlines while preserving matching point counts and order.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how lerpPath() blends two point arrays into an in-between SVG path — understanding that mechanic is the key to designing your own icon-morph pairs. It's also a great starting point for extension: ask the assistant to help you convert a pair of real icon-set SVGs (say, a Feather or Lucide icon) into matched-point-count path arrays, or to add a prefers-reduced-motion guard that swaps to an instant icon change for users who prefer less animation.`,
      prompt: `Build a settings "Save" button in plain HTML, CSS, and JavaScript whose icon morphs from a gear shape into a checkmark shape when clicked, then reverts a moment later — no animation library, no CSS d: path() reliance.

Requirements:
- Represent both the gear icon and the checkmark icon as arrays of [x, y] coordinate pairs with the exact same number of points, in a shared 0-64 SVG viewBox.
- Write a function that converts a point array into an SVG path "d" string using M for the first point, L for the rest, and Z to close it.
- Write a lerp function that linearly interpolates every coordinate between two same-length point arrays at a given progress value t (0 to 1).
- Drive the morph with requestAnimationFrame and performance.now(), applying a cubic ease-out curve to the progress value, and rewriting the path's d attribute on every frame.
- On click, morph gear to checkmark over roughly 400ms, change the button's background color and label text to confirm the save, wait about a second, then morph back to the gear and restore the original label.
- Guard against overlapping animations if the button is clicked again while a morph is already in progress.`,
    },
  },
};

export default gearToCheckmarkIconMorph;
