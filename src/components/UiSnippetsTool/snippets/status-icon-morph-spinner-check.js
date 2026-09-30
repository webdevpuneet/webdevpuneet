const statusIconMorphSpinnerCheck = {
  id: 'status-icon-morph-spinner-check',
  title: 'Status Icon Morph — Spinner to Check/Cross',
  category: 'animations',
  html: `<div class="wrap">
  <h2>Deploy Pipeline</h2>
  <p class="hint">Click a button — a single SVG path morphs through matched point data from a spinner arc into a checkmark or an X, rather than crossfading two separate icons.</p>

  <div class="row">
    <button class="run-btn" id="successBtn">
      <svg viewBox="0 0 64 64" width="20" height="20">
        <path id="pathSuccess" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d=""></path>
      </svg>
      Deploy (succeeds)
    </button>

    <button class="run-btn" id="failBtn">
      <svg viewBox="0 0 64 64" width="20" height="20">
        <path id="pathFail" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d=""></path>
      </svg>
      Deploy (fails)
    </button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 40px 20px; }

.wrap { width: 100%; max-width: 380px; }
h2 { font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 8px; }
.hint { font-size: 13px; color: #64748b; line-height: 1.6; margin: 0 0 22px; }

.row { display: flex; flex-direction: column; gap: 10px; }

.run-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 10px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #334155; font-size: 13.5px; font-weight: 700;
  font-family: inherit; cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.run-btn:hover { border-color: #cbd5e1; }
.run-btn:disabled { cursor: default; }
.run-btn.spinning svg { animation: spin 0.9s linear infinite; }
.run-btn.ok { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
.run-btn.err { border-color: #dc2626; color: #dc2626; background: #fef2f2; }

@keyframes spin { to { transform: rotate(360deg); } }`,
  js: `/* Three 10-point closed paths, all in a 0-64 viewBox, all with the same
   vertex count so any of the three can interpolate cleanly into either of
   the other two. This is the key difference from a typical loading-button
   pattern: instead of crossfading a <circle> spinner element with a
   separate <path> checkmark element, one single <path> continuously
   reshapes its own coordinate data. */
const spinnerPts = [
  [32, 6], [46, 12], [54, 26], [54, 32],
  [54, 38], [46, 52], [32, 58], [24, 55],
  [20, 50], [22, 44],
];
const checkPts = [
  [14, 34], [22, 42], [22, 42], [22, 42],
  [24, 44], [50, 18], [50, 18], [50, 18],
  [50, 18], [46, 16],
];
const crossPts = [
  [16, 16], [32, 32], [32, 32], [32, 32],
  [48, 48], [48, 16], [48, 16], [48, 16],
  [16, 48], [24, 40],
];

function pointsToPath(pts) {
  return pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ');
}
function lerpPath(a, b, t) {
  const pts = a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t]);
  return pointsToPath(pts);
}

function runFlow(pathEl, btn, endPts, endClass, endLabel) {
  if (btn.disabled) return;
  btn.disabled = true;
  btn.classList.add('spinning');
  pathEl.setAttribute('d', pointsToPath(spinnerPts));

  setTimeout(() => {
    btn.classList.remove('spinning');

    const start = performance.now();
    const duration = 380;
    function morphFrame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      pathEl.setAttribute('d', lerpPath(spinnerPts, endPts, eased));
      if (t < 1) requestAnimationFrame(morphFrame);
      else {
        btn.classList.add(endClass);
        const label = btn.lastChild;
        if (label && label.nodeType === Node.TEXT_NODE) label.textContent = ' ' + endLabel;
      }
    }
    requestAnimationFrame(morphFrame);
  }, 1100);
}

const successBtn = document.getElementById('successBtn');
const failBtn = document.getElementById('failBtn');
const pathSuccess = document.getElementById('pathSuccess');
const pathFail = document.getElementById('pathFail');
pathSuccess.setAttribute('d', pointsToPath(spinnerPts));
pathFail.setAttribute('d', pointsToPath(spinnerPts));

successBtn.addEventListener('click', () => runFlow(pathSuccess, successBtn, checkPts, 'ok', 'Deployed'));
failBtn.addEventListener('click', () => runFlow(pathFail, failBtn, crossPts, 'err', 'Deploy failed'));`,
  seo: {
    title: 'Loading Spinner to Checkmark — SVG Path Morph JS',
    description: 'Async status icon morphs a single SVG path from a spinner arc into a checkmark or X via real point interpolation, not a crossfade of two icons. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Spinner-to-Checkmark SVG Morph — One Path Reshaping Through an Async Status',
      description: `Most "loading then success" button patterns swap two separate SVG elements — a spinning circle fades out while a checkmark path fades in. This snippet does something different and more literal: a single \`<path>\` element continuously reshapes its own coordinate data, morphing directly from a spinner arc shape into a checkmark or an X, depending on whether the simulated async action succeeds or fails.

**Three point-matched shapes, one path element**

\`spinnerPts\`, \`checkPts\`, and \`crossPts\` are each a 10-point array in a shared 0–64 SVG viewBox. Keeping every shape at exactly 10 points means any of the three can interpolate cleanly into either of the other two — the spinner can become a check, or become a cross, using the exact same \`lerpPath(a, b, t)\` function. Notice that \`checkPts\` and \`crossPts\` repeat several coordinates three times in a row (\`[22, 42], [22, 42], [22, 42]\`, for instance) — this is a deliberate padding technique: a checkmark's natural shape only needs a few real vertices, but padding it with duplicate points at the corners keeps the array at the same length as the 10-point spinner, without changing how the checkmark actually looks, since duplicate consecutive points don't add extra geometry.

**The spin phase is separate from the morph phase**

While the async action is "in flight", the icon does not use path interpolation at all — it uses an ordinary CSS \`animation: spin 0.9s linear infinite\` rotating the whole \`<svg>\`, which is far cheaper than continuously recomputing path data for a shape that isn't actually changing. Only once the result is known does \`runFlow()\` stop the CSS spin and hand off to the JavaScript-driven \`lerpPath\` morph — using the right tool for each phase of the animation instead of forcing one technique to do both jobs.

**Driving the morph itself**

\`runFlow(pathEl, btn, endPts, endClass, endLabel)\` is a small state machine: it disables the button, starts the CSS spin, waits (via \`setTimeout\`, standing in for a real network request), then runs a \`requestAnimationFrame\` loop that interpolates the path's \`d\` attribute from \`spinnerPts\` to whichever \`endPts\` array was passed in — \`checkPts\` for the success button, \`crossPts\` for the failure button — over 380ms with a cubic ease-out curve. The same function drives both outcomes; only the target point array, the CSS class applied on completion, and the label text differ.

**Why this reads as more "real" feedback than a crossfade**

When two separate icons crossfade, there is a brief moment where both are partially visible, overlapping — a soft but slightly muddled transition. A single path genuinely changing shape has no such overlap: every frame is one continuous, unambiguous glyph, which tends to read as more deliberate and "designed" than an opacity blend, especially at small icon sizes where two overlapping icons can look visually noisy.

**Extending to more outcomes**

Because every shape lives in the same point-matched format, adding a fourth or fifth end state — a warning triangle, a paused/dash icon — is just a matter of designing one more 10-point array and calling \`runFlow\` with it; no changes to the morphing logic itself are needed.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Deploy (succeeds)"', text: 'The icon spins via CSS, then the same path morphs from the spinner shape directly into a checkmark.' },
        { title: 'Click "Deploy (fails)"', text: 'Same spin phase, but the path morphs into an X instead, and the button turns red.' },
        { title: 'Change the spin duration', text: 'Edit the 1100 (ms) delay in the setTimeout inside runFlow() to simulate a longer or shorter request.' },
        { title: 'Change the morph duration', text: 'Edit the 380 (ms) duration constant used by the requestAnimationFrame morph loop.' },
        { title: 'Add a third outcome', text: 'Design a new 10-point array (matching the existing point count) and call runFlow() with it from a new button.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Single SVG path reshapes its own coordinate data — no crossfade between separate spinner/check elements',
      'Three point-matched 10-vertex shapes (spinner, check, cross) can interpolate into one another cleanly',
      'Duplicate-point padding technique keeps simple shapes at the same vertex count as the spinner arc',
      'CSS animation drives the cheap spin phase; JS path interpolation only runs during the actual morph',
      'One runFlow() state machine drives both the success and failure outcome, parameterized by target shape',
      'requestAnimationFrame + cubic ease-out for a natural-feeling shape transition',
      'Button border, background, and label update in sync with the icon morph completing',
      'Zero dependencies — no GSAP MorphSVG plugin, no KUTE.js',
      'Disabled-state guard prevents re-triggering mid-flow',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'FORM', title: 'Async submit/save buttons', desc: 'Give any form submission, save action, or API call a single, literal icon that morphs from "in progress" straight into "succeeded" or "failed", instead of separate icon swaps.' },
      { icon: 'APP', title: 'CI/CD and deploy status UIs', desc: 'The exact scenario shown here — a deploy or pipeline run button whose icon reflects the real async outcome the moment it resolves.' },
      { icon: 'CODE', title: 'Learn multi-shape SVG interpolation', desc: 'A compact reference for point-matching more than two shapes so any pair among them can interpolate, extending the two-shape morph technique to three or more states.' },
      { icon: 'DESIGN', title: 'Toast and notification icons', desc: 'Apply the same spinner-to-check/cross morph inside a toast icon for async operations that report their result inline rather than via redirect.' },
      { icon: 'ACCESS', title: 'Screen-reader status announcements', desc: 'Pair the visual morph with an aria-live region announcing "Deployed" or "Deploy failed" so the outcome is not conveyed by shape alone.' },
      { icon: 'CODE', title: 'File upload progress buttons', desc: 'Use the same pattern for an upload button that spins while transferring and morphs its icon into a checkmark once the upload completes.' },
    ],
    faqs: [
      { q: 'How is this different from crossfading a spinner icon and a checkmark icon?', a: 'A crossfade uses two separate elements with opacity transitions overlapping briefly. This snippet uses one single <path> element whose "d" coordinate data is continuously interpolated frame by frame, so there is only ever one unambiguous shape visible, genuinely reshaping rather than blending two shapes together.' },
      { q: 'Why do checkPts and crossPts have repeated coordinates?', a: 'Both shapes only need a handful of real vertices to look correct, but they must have the same point count (10) as the spinner arc for lerpPath to interpolate cleanly. Repeating a coordinate a few times in a row pads the array to the right length without adding any visible extra geometry, since duplicate consecutive points do not change how the path renders.' },
      { q: 'Why does the spin phase use CSS instead of the same JS path interpolation?', a: 'The spinner shape itself is not changing during that phase — only its rotation is. A CSS animation: spin rotating the whole SVG is much cheaper than recomputing path coordinates every frame for a shape that stays the same. JS-driven interpolation only takes over once the shape genuinely needs to change.' },
      { q: 'Can I reuse runFlow() for more than two outcomes?', a: 'Yes — runFlow(pathEl, btn, endPts, endClass, endLabel) already takes the target shape, CSS class, and label as parameters. Design a new point-matched array for a third outcome (like a warning triangle) and call runFlow with it from any trigger.' },
      { q: 'Does this rely on any SVG morphing library?', a: 'No. All three shapes and the interpolation logic are plain JavaScript arrays and functions — no GSAP MorphSVG plugin, no KUTE.js, no external dependency.' },
      { q: 'How do I make the shapes match my own icon set exactly?', a: 'Redesign spinnerPts, checkPts, and crossPts using coordinates traced from your own icon outlines, keeping the same point count and vertex order across all three arrays so every pairwise interpolation stays clean.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain the duplicate-coordinate padding trick in checkPts and crossPts — understanding why repeating a point three times in a row does not distort the shape is the key to designing your own simple end-state icons that still match a more complex source shape's point count. It is also a good base to extend: ask the assistant to help you add a third or fourth outcome shape, or to wire an aria-live region so the status change is announced to screen reader users, not just shown visually.`,
      prompt: `Build an async status button in plain HTML, CSS, and JavaScript whose icon is a single SVG path that morphs directly from a spinner arc shape into either a checkmark or an X, depending on the simulated outcome — no crossfading two separate icon elements, no animation library.

Requirements:
- Represent a spinner arc, a checkmark, and an X (cross) as three arrays of [x, y] coordinate pairs, all with the exact same length, in a shared SVG viewBox. Pad the checkmark and cross arrays with repeated coordinates where needed so their point count matches the spinner's, without visibly changing their shape.
- Write a function that converts a point array into an SVG path "d" string, and a lerp function that linearly interpolates every coordinate between two same-length arrays at a progress value t.
- On button click: set the path to the spinner shape, spin the icon using a CSS keyframe rotation (not JS) for a simulated loading period, then after a delay, run a requestAnimationFrame loop that interpolates the path from the spinner shape to the target end shape (checkmark for success, cross for failure) over roughly 400ms with an ease-out curve.
- The same underlying function should handle both the success and failure button, parameterized by which end shape, CSS class, and label text to apply once the morph completes.
- Disable the button while a flow is in progress so it cannot be re-triggered mid-animation.`,
    },
  },
};

export default statusIconMorphSpinnerCheck;
