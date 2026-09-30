const loader3dCubeSpinner = {
  id: 'loader-3d-cube-spinner',
  title: '3D Rotating Cube Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="cb-stage">
  <div class="cb-scene">
    <div class="cb-cube" id="cbCube">
      <div class="cb-face cb-front">1</div>
      <div class="cb-face cb-back">2</div>
      <div class="cb-face cb-right">3</div>
      <div class="cb-face cb-left">4</div>
      <div class="cb-face cb-top">5</div>
      <div class="cb-face cb-bottom">6</div>
    </div>
  </div>
  <p class="cb-label">Loading</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center}

.cb-stage{display:flex;flex-direction:column;align-items:center;gap:22px}

/* --size is the cube's edge length; --half is exactly half of it. Every face
   transform below is expressed in terms of --half, so the six faces always
   form a mathematically correct closed cube of side --size, whatever value
   --size is set to. */
.cb-scene{--size:84px;--half:calc(var(--size) / 2);width:var(--size);height:var(--size);perspective:600px}

.cb-cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:cbSpin 6s linear infinite}
@keyframes cbSpin{
  from{transform:rotateX(0deg) rotateY(0deg)}
  to{transform:rotateX(360deg) rotateY(360deg)}
}

.cb-face{
  position:absolute;
  inset:0;
  width:var(--size);
  height:var(--size);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  font-weight:800;
  color:#fff;
  border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(160deg,#4338ca,#6366f1);
  backface-visibility:hidden;
}

/* Each pair (front/back, left/right, top/bottom) sits on an opposite face of
   the cube, translated out along Z by exactly half the cube's own size —
   the standard, geometrically correct way to build a CSS cube: rotate around
   the shared center first, THEN push outward along the newly-rotated local
   Z axis so the face lands flush against the correct side. */
.cb-front { transform: translateZ(var(--half)); background:linear-gradient(160deg,#4338ca,#6366f1); }
.cb-back  { transform: rotateY(180deg) translateZ(var(--half)); background:linear-gradient(160deg,#0f766e,#14b8a6); }
.cb-right { transform: rotateY(90deg) translateZ(var(--half)); background:linear-gradient(160deg,#b45309,#f59e0b); }
.cb-left  { transform: rotateY(-90deg) translateZ(var(--half)); background:linear-gradient(160deg,#9d174d,#ec4899); }
.cb-top   { transform: rotateX(90deg) translateZ(var(--half)); background:linear-gradient(160deg,#166534,#22c55e); }
.cb-bottom{ transform: rotateX(-90deg) translateZ(var(--half)); background:linear-gradient(160deg,#1e3a8a,#3b82f6); }

.cb-label{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#6b7591}
@media (prefers-reduced-motion:reduce){.cb-cube{animation:none;transform:rotateX(-20deg) rotateY(35deg)}}`,

  js: '',

  seo: {
    title: '3D Rotating Cube Loader — Real CSS 3D Cube with Six True Faces',
    description: `A genuine CSS 3D cube — six faces positioned with translateZ, rotateY, and rotateX to form an actual cube, not a flat square — spinning continuously on two axes as a loader. Exports to React, Vue & Tailwind.`,
    about: {
      title: '3D Rotating Cube Loader — Six Faces, Correctly Positioned in 3D Space',
      description: `A lot of "3D cube" loaders on the web are actually a single flat square with a fake shadow or a skewed pseudo-element — a 2D illusion, not a real cube. This snippet builds an actual six-sided CSS cube: six real elements, each individually rotated and pushed outward along the Z axis by exactly half the cube's edge length, so they form a genuinely closed 3D box that a \`perspective\`-enabled camera can rotate around and view from any angle, in plain HTML and CSS with no JavaScript at all.

**Perspective, then a 3D-preserving parent**

The outer \`.cb-scene\` sets \`perspective: 600px\`, which establishes the "camera distance" for everything inside it — without it, all the 3D transforms below would flatten back to 2D. The \`.cb-cube\` element inside is given \`transform-style: preserve-3d\`, which is what allows its six children to keep their individual 3D positions relative to each other and to the parent's own rotation, instead of each face's transform being flattened independently.

**The correct six-face transform math**

Every face is a full-size \`div\` absolutely positioned to overlap all the others at the cube's center, and each gets exactly two transforms in this order: a rotation, then a translation along Z. The rotation happens first (around the shared center), which reorients that face's own local Z axis; the \`translateZ(half)\` that follows then pushes the face outward along that newly-rotated axis, landing it flush against the correct side of the cube rather than at some skewed offset. Concretely: \`.cb-front\` needs no rotation, so \`translateZ(--half)\` alone pushes it straight toward the viewer. \`.cb-back\` is rotated 180° first so its own local Z axis now points away from the viewer, and the same \`translateZ(--half)\` push lands it on the opposite side. \`.cb-right\` and \`.cb-left\` rotate ±90° around Y before translating, and \`.cb-top\`/\`.cb-bottom\` rotate ±90° around X — six faces, six correctly-oriented pushes, one shared \`--half\` distance, forming a real closed cube with no gaps or overlaps.

**One CSS variable drives the whole geometry**

\`--size\` is defined once on \`.cb-scene\`, and \`--half\` is computed from it with \`calc(var(--size) / 2)\`. Because every face's translation distance references \`--half\` rather than a hardcoded pixel value, changing \`--size\` alone rescales the entire cube correctly — every face stays flush with no gaps, since the geometry is expressed as a relationship rather than six independently-tuned numbers.

**Spinning on two axes at once**

The cube's own \`@keyframes\` animates \`transform: rotateX() rotateY()\` together from \`0deg\` to \`360deg\` on both axes simultaneously over one loop. Because both rotations run at the same rate, the cube traces a genuinely three-dimensional tumble rather than spinning flatly around a single vertical axis — every face becomes visible from a constantly-changing angle as the loop repeats.

**backface-visibility keeps it clean**

Each face has \`backface-visibility: hidden\`, so a face currently rotated away from the viewer doesn't render its (identical, mirrored) backside poking through — important once the whole cube is tumbling and faces are constantly swinging into and out of view.

**Reduced motion**

Under \`prefers-reduced-motion\`, the animation is disabled and the cube is frozen at a fixed, still genuinely three-dimensional angle (a static \`rotateX(-20deg) rotateY(35deg)\`) so users who opt out of motion still see the real 3D shape rather than a flattened front face. Pair it with an [orbit loader](/ui-snippets/orbit-loader/) or a [wave loader](/ui-snippets/wave-loader/) for a non-3D alternative where \`perspective\` support or motion preference makes a real cube less appropriate.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A six-sided cube renders and spins continuously on two axes.` },
      { title: 'Watch every face pass by', text: `As it tumbles, each of the six numbered, differently-coloured faces comes into view.` },
      { title: 'Inspect the face transforms', text: `Note each face is a rotation followed by translateZ(--half) — never a flat 2D trick.` },
      { title: 'Resize the cube', text: `Change --size on .cb-scene; --half recalculates and every face stays flush.` },
      { title: 'Change the spin speed or axes', text: `Edit the cbSpin keyframe's duration or which axes it rotates.` },
      { title: 'Recolor the faces', text: `Each .cb-face has its own gradient — restyle any or all of them.` },
    ] },
    features: [
      { title: 'Six real 3D faces', text: `Actual positioned elements forming a closed cube, not a flat square.` },
      { title: 'Correct rotate-then-translate math', text: `Each face rotates first, then pushes out along its new local Z axis.` },
      { title: 'One CSS variable geometry', text: `--half derives from --size, so rescaling the cube keeps every face flush.` },
      { title: 'Preserve-3d parent', text: `transform-style: preserve-3d keeps all six faces in real 3D space.` },
      { title: 'Perspective camera', text: `A perspective value on the scene gives the rotation real depth.` },
      { title: 'Dual-axis tumble', text: `rotateX and rotateY animate together for a genuine 3D roll.` },
      { title: 'Backface-hidden faces', text: `Rotated-away faces don't show their mirrored backside through the cube.` },
      { title: 'Reduced-motion safe', text: `Freezes at a static 3D angle instead of a flat front view when motion is off.` },
    ],
    useCases: [
      { title: 'App and dashboard preloaders', text: `A distinctive, genuinely dimensional alternative to a flat spinner.` },
      { title: '3D and gaming product sites', text: `Matches the visual language of WebGL-heavy or gaming-adjacent products.` },
      { title: 'Portfolio and agency loaders', text: `A memorable loading moment for creative and 3D-focused portfolios.` },
      { title: 'Data processing indicators', text: `Represent "working" for compute or rendering-heavy background tasks.` },
      { title: 'Learning CSS 3D transforms', text: `A complete, correct reference for perspective, preserve-3d, and face math.` },
      { title: 'Design system loader variants', text: `Pair alongside a [circular progress](/ui-snippets/circular-progress/) or [dots loader](/ui-snippets/dots-loader/) as a distinctive option.` },
      { icon: 'CODE', title: 'Related: Skeleton-to-Content Crossfade', desc: 'See the [Skeleton-to-Content Crossfade](/ui-snippets/loader-content-fade-swap/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What makes this a real 3D cube instead of a flat 2D trick?', a: `Each of the six faces is its own element rotated around the cube's shared center and then translated outward along Z by exactly half the cube's edge length, positioned inside a parent with transform-style: preserve-3d and a perspective camera on its ancestor. This produces genuine spatial geometry a viewer can rotate around and see from any angle — a flat 2D trick would typically fake depth with a single skewed pseudo-element and a static shadow, which can't correctly reveal different faces as it turns.` },
      { q: 'Why does each face need both a rotation and a translateZ, in that order?', a: `The rotation runs first and reorients that face's own local Z axis to point toward the correct side of the cube; the translateZ that follows then pushes the face outward along that newly-rotated axis, landing it flush against the right side. If the order were reversed, or if translateZ were used without the matching rotation, the faces would translate along the original, un-rotated Z axis and stack incorrectly instead of forming a closed box.` },
      { q: 'How does changing --size keep all six faces flush with no gaps?', a: `--half is computed from --size with calc(var(--size) / 2), and every single face's translateZ distance references --half rather than a hardcoded value. Since the geometric relationship (each face sits exactly half the cube's own edge length from center) is expressed as a formula, not six independent numbers, changing --size once automatically keeps every face correctly flush against its neighbors at any size.` },
      { q: 'What does backface-visibility: hidden do here?', a: `As the cube tumbles, a face that has rotated to point away from the viewer would otherwise still render — showing its own (identical, mirrored) reverse side bleeding through the cube from the wrong direction. backface-visibility: hidden prevents a face from rendering at all once it's turned away, keeping the cube looking solid and correctly opaque from every viewing angle during the spin.` },
      { q: 'How do I use this 3D cube loader in React, Vue, or Angular?', a: `Render the scene/cube/six-face markup as-is — the entire effect is CSS custom properties and keyframes with no JavaScript dependency, so no lifecycle hooks are required. If you want per-instance sizing, pass --size as an inline style or CSS variable prop on the .cb-scene element; the calc()-derived --half and all six face transforms will recalculate automatically.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to walk through, face by face, exactly why each one needs a rotation applied before its translateZ(var(--half)) rather than after, and why that specific order is what makes six separately-transformed elements form a real closed cube instead of six flat squares stacked in the wrong places. It's worth asking it to verify the geometry explicitly: confirm that .cb-back's rotateY(180deg) plus translateZ(var(--half)) really does land it directly opposite .cb-front, and that .cb-top's rotateX(90deg) plus the same translateZ lands it perpendicular to both, forming a genuinely orthogonal box. For extending it, ask for a version where each face shows real content (an icon or a progress percentage) instead of a static number, a variant where the rotation speed responds to real loading progress, or a way to swap the continuous spin for a one-shot roll-to-a-face reveal once loading completes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a genuine 3D rotating cube loading indicator in plain HTML and CSS only — six real, individually positioned faces forming an actual cube, not a flat square with a fake shadow or skew trick.

Requirements:
- A scene container with a CSS perspective value set, containing a cube element with transform-style: preserve-3d, which itself contains exactly six identically-sized face elements absolutely positioned to overlap at the cube's center by default.
- Define the cube's edge length as a single CSS custom property, and derive a second custom property equal to exactly half that value using calc(); every face's transform must reference the half-value property, never a separately hardcoded pixel number, so that changing only the edge-length property rescales the entire cube with all six faces still landing flush against each other with no visible gaps.
- Each face must receive exactly two chained transforms in the correct order — a rotation appropriate to that face (none for front, 180 degrees on Y for back, plus or minus 90 degrees on Y for the two side faces, plus or minus 90 degrees on X for top and bottom), followed by a translateZ using the half-edge-length variable — so that after rotating around the shared center, each face is pushed outward along its own newly-rotated local Z axis to the correct side of a real closed cube.
- Apply backface-visibility: hidden to every face so that faces currently rotated away from the viewer do not render their mirrored reverse side showing through the cube.
- Animate the cube element's own transform with a CSS keyframe that rotates it continuously on two axes simultaneously (both X and Y), so the cube visibly tumbles in three dimensions and every face becomes visible at some point during the loop, rather than spinning flatly around a single axis.
- Add a prefers-reduced-motion media query that stops the spin animation and freezes the cube at a fixed, non-zero 3D angle on both axes (not a flattened front-on view), so the six-sided geometry is still visible to users who have that preference set.`,
    },
  },
};

export default loader3dCubeSpinner;
