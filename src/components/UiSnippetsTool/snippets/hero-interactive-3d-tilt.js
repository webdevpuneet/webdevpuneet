const heroInteractive3dTilt = {
  id: 'hero-interactive-3d-tilt',
  title: 'Hero with 3D Tilting Product Mockup',
  lastmod: '2026-08-23',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="tlt-hero">
  <div class="tlt-copy">
    <span class="tlt-eyebrow">New — Studio 4.0</span>
    <h1 class="tlt-h1">Design software<br>that moves with you</h1>
    <p class="tlt-sub">A canvas that responds to every gesture. Move your cursor over the mockup — it's really tracking you, not just playing an animation.</p>
    <a href="#" class="tlt-cta">Download for free</a>
  </div>

  <div class="tlt-stage" id="tltStage">
    <div class="tlt-card" id="tltCard">
      <div class="tlt-glare" id="tltGlare"></div>
      <div class="tlt-screen">
        <div class="tlt-topbar">
          <span></span><span></span><span></span>
        </div>
        <div class="tlt-bars">
          <div class="tlt-bar" style="width:78%"></div>
          <div class="tlt-bar" style="width:52%"></div>
          <div class="tlt-bar" style="width:64%"></div>
        </div>
        <div class="tlt-blocks">
          <div class="tlt-block"></div>
          <div class="tlt-block"></div>
          <div class="tlt-block"></div>
        </div>
      </div>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d17;color:#f1f5f9}
.tlt-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:52px;padding:80px 24px}
.tlt-copy{text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;max-width:600px}
.tlt-eyebrow{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c084fc}
.tlt-h1{font-size:clamp(30px,5.2vw,54px);font-weight:800;line-height:1.12;letter-spacing:-.02em}
.tlt-sub{font-size:15.5px;color:#94a3b8;line-height:1.7;max-width:480px}
.tlt-cta{margin-top:4px;background:#a855f7;color:#fff;font-weight:700;font-size:15px;padding:12px 28px;border-radius:9px;text-decoration:none;box-shadow:0 6px 24px rgba(168,85,247,.35);transition:transform .15s}
.tlt-cta:hover{transform:translateY(-2px)}

.tlt-stage{perspective:1200px;width:min(560px,90vw)}
.tlt-card{position:relative;border-radius:20px;background:linear-gradient(160deg,#1c1f33,#12141f);border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 70px rgba(0,0,0,.55);transform-style:preserve-3d;will-change:transform;transition:transform .1s ease-out}
.tlt-glare{position:absolute;inset:0;border-radius:20px;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.22),transparent 60%);opacity:0;pointer-events:none;transition:opacity .15s;z-index:2}
.tlt-screen{position:relative;padding:22px;transform:translateZ(30px)}
.tlt-topbar{display:flex;gap:6px;margin-bottom:18px}
.tlt-topbar span{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.15)}
.tlt-topbar span:nth-child(1){background:#f87171}
.tlt-topbar span:nth-child(2){background:#facc15}
.tlt-topbar span:nth-child(3){background:#34d399}
.tlt-bars{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.tlt-bar{height:9px;border-radius:5px;background:linear-gradient(90deg,#a855f7,#6366f1)}
.tlt-blocks{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.tlt-block{aspect-ratio:1;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}`,

  js: `// Genuine pointer-tracked 3D tilt: rotation is derived from live cursor position each frame.
const stage = document.getElementById('tltStage');
const card = document.getElementById('tltCard');
const glare = document.getElementById('tltGlare');

const MAX_TILT = 14; // degrees

function onMove(e) {
  const rect = stage.getBoundingClientRect();
  const x = e.clientX - rect.left; // 0..width
  const y = e.clientY - rect.top;  // 0..height

  const px = x / rect.width;  // 0..1
  const py = y / rect.height; // 0..1

  const rotateY = (px - 0.5) * MAX_TILT * 2; // left/right
  const rotateX = (0.5 - py) * MAX_TILT * 2; // up/down

  card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)\`;

  glare.style.opacity = '1';
  glare.style.background = \`radial-gradient(circle at \${px * 100}% \${py * 100}%, rgba(255,255,255,.28), transparent 60%)\`;
}

function onLeave() {
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  glare.style.opacity = '0';
}

stage.addEventListener('pointermove', onMove);
stage.addEventListener('pointerleave', onLeave);`,

  seo: {
    title: 'Hero with 3D Tilting Product Mockup — Free HTML CSS JS Snippet',
    description: `A hero with a product mockup that tilts in real 3D based on live cursor position, with a glare that moves with the tilt. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Hero with 3D Tilting Product Mockup — Cursor-Tracked Tilt and Glare',
      description: `A product mockup that "tilts toward" the cursor is a small detail that reads as expensive craftsmanship — but only if it's actually tracking the pointer. This snippet computes real \`rotateX\`/\`rotateY\` values from the cursor's live position over the hero every frame, rather than looping a fixed CSS keyframe animation that ignores where the mouse actually is.

**The math behind the tilt**

On every \`pointermove\` over the stage, the handler reads \`getBoundingClientRect()\` to get the stage's live position and size, then computes the cursor's position as a 0–1 fraction of the stage's width and height (\`px\`, \`py\`). Centering that fraction around 0.5 and multiplying by \`MAX_TILT\` produces a signed rotation: cursor at the left edge yields a negative \`rotateY\`, cursor at the right edge yields a positive one, and the card sits flat at dead center. This is a direct, continuous function of pointer position — move the cursor one pixel, the rotation updates by a proportional fraction of a degree.

**Why perspective and transform-style matter**

\`.tlt-stage\` sets \`perspective: 1200px\` — without it, \`rotateX\`/\`rotateY\` on the card would have no visible depth, just a 2D squash. \`.tlt-card\` sets \`transform-style: preserve-3d\` so its child elements (the screen content) can be pushed forward in 3D space rather than being flattened onto the card's own plane; \`.tlt-screen\` uses \`translateZ(30px)\` to sit visibly above the card's base surface, giving the tilt actual depth rather than looking like a rotated flat image.

**A glare that moves with the tilt, not against it**

The glare layer's \`radial-gradient\` center position is recalculated every \`pointermove\` from the same \`px\`/\`py\` fractions driving the rotation — so the highlight tracks the same point the cursor is "pushing" toward, the way light behaves on a real glossy surface being tilted, rather than sitting static or drifting independently of the tilt.

**A clean return to rest**

\`pointerleave\` resets both the transform and the glare opacity, with the CSS \`transition\` on \`.tlt-card\` easing the snap back to flat rather than the card cutting instantly to \`rotateX(0) rotateY(0)\`.

**Customizing it**

Adjust \`MAX_TILT\` for a subtler or more dramatic effect, add more \`translateZ\` layers inside \`.tlt-screen\` for a deeper parallax stack, or swap the abstract UI mockup for a real product screenshot. Pair it with [3D card tilt](/ui-snippets/3d-card-tilt/) or [tilt glow card](/ui-snippets/tilt-glow-card/) for the same technique on a smaller card component, or [gradient mesh hero](/ui-snippets/gradient-mesh-hero/) for a different hero backdrop.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The hero renders with the mockup flat at rest.` },
      { title: 'Move the cursor over the mockup area', text: `The card tilts toward your cursor in real 3D, tracking it continuously.` },
      { title: 'Move to the edges', text: `Rotation increases toward MAX_TILT as the cursor approaches the stage bounds.` },
      { title: 'Move the cursor away', text: `The card eases back to flat and the glare fades out.` },
      { title: 'Tune MAX_TILT', text: `Increase for a more dramatic tilt, decrease for subtlety.` },
      { title: 'Swap the mockup content', text: `Replace .tlt-screen's contents with a real screenshot or iframe.` },
    ] },
    features: [
      { title: 'Real pointer-tracked rotation', text: `rotateX/rotateY derived from live cursor position.` },
      { title: 'Proportional tilt', text: `Rotation scales continuously with distance from center.` },
      { title: '3D depth via translateZ', text: `Screen content sits visibly above the card base.` },
      { title: 'Cursor-synced glare', text: `Highlight position matches the same px/py as the tilt.` },
      { title: 'Smooth return to rest', text: `pointerleave eases back to flat, not an instant cut.` },
      { title: 'perspective + preserve-3d', text: `Correct CSS 3D context for real depth.` },
      { title: 'Abstract mockup UI', text: `Drop-in placeholder for a real screenshot.` },
      { title: 'No dependencies', text: `Pure vanilla JS pointer math.` },
    ],
    useCases: [
      { title: 'Design/creative tool landing pages', text: `Show off a canvas product with tactile feel.` },
      { title: 'Hardware and device launches', text: `Tilt a 3D-rendered device mockup toward the cursor.` },
      { title: 'App landing pages', text: `Pair with [app hero](/ui-snippets/app-hero/) for a phone mockup tilt.` },
      { title: 'Portfolio hero pieces', text: `Feature a flagship project with interactive depth.` },
      { title: 'Premium/luxury product pages', text: `Signal craftsmanship through responsive motion.` },
      { title: 'Interactive UI showcases', text: `Complement [3D card tilt](/ui-snippets/3d-card-tilt/) grids.` },
      { icon: 'CODE', title: 'Related: Hero with Feature Tabs Preview', desc: 'See the [Hero with Feature Tabs Preview](/ui-snippets/hero-feature-tabs-preview/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the tilt actually computed from the cursor?', a: `On pointermove, the handler reads the stage's live bounding rect, converts the cursor's clientX/clientY into a 0-1 fraction of the stage width and height, centers that fraction around 0.5, and multiplies by MAX_TILT to get signed rotateX/rotateY degrees. Because this runs on every pointermove event with the current cursor position, the rotation is a continuous function of where the cursor actually is — not a looping animation.` },
      { q: 'Why does the card need perspective and transform-style: preserve-3d?', a: `perspective on the parent stage establishes the 3D viewing distance — without it, rotateX/rotateY would just squash the card in 2D with no sense of depth. transform-style: preserve-3d on the card lets its child .tlt-screen element (pushed forward with translateZ) render in true 3D space relative to the card's rotation, instead of being flattened onto the card's own 2D plane.` },
      { q: 'How does the glare stay synced with the tilt direction?', a: `The glare's radial-gradient center position is set from the exact same px and py fractions (0-1 cursor position within the stage) used to compute the rotation, on the same pointermove event. Since both are derived from one shared position, the highlight always sits toward the side the card is tilting toward, mimicking how light reflects off a real glossy surface as it's turned.` },
      { q: 'What happens when the cursor leaves the mockup?', a: `A pointerleave listener resets the card's transform to rotateX(0deg) rotateY(0deg) scale(1) and the glare's opacity to 0. Because .tlt-card has a CSS transition on transform, the card eases smoothly back to flat rather than snapping instantly, which reads as a natural settle rather than a glitch.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Attach the pointermove and pointerleave listeners in a mount effect (useEffect in React, onMounted in Vue) scoped to the stage ref, and clean them up on unmount. Since the effect only ever writes to style.transform and the glare's background via refs, it works the same way regardless of framework — no state re-renders are needed per pointer move if you write directly to the DOM node.` },
    ],
    aiPrompt: {
      paragraph: `Rather than eyeballing the tilt feel, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the pointermove handler turns a raw clientX/clientY into a signed rotateX/rotateY pair, and why perspective on the parent and transform-style: preserve-3d plus translateZ on the inner content are both required for the tilt to read as real depth rather than a 2D squash. The same assistant can help you tune the feel — ask whether MAX_TILT of 14 degrees is too subtle or too aggressive for a hero-sized card, or whether the transition duration on pointerleave should be longer for a softer settle. It's also useful for extending the effect: ask it to add a second, more distant layer that tilts at a slower rate for extra parallax depth, make the effect touch-friendly with a gyroscope fallback on mobile, or throttle the pointermove handler with requestAnimationFrame for very high-refresh-rate displays. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript featuring a product mockup card that tilts in genuine 3D based on live cursor position (no library, no CDN).

Requirements:
- A hero with headline, subheading, and CTA above a mockup "stage" containing a card styled like an abstract app screenshot (a fake window topbar with three colored dots, a few horizontal bar elements of varying widths, and a small grid of block placeholders).
- The stage must have CSS perspective set, and the card must use transform-style: preserve-3d with its inner content pushed forward via translateZ so the tilt has real visible depth, not a flat 2D skew.
- On pointermove over the stage, compute the cursor's position as a fraction (0 to 1) of the stage's actual width and height using getBoundingClientRect (not fixed/hardcoded dimensions), center that fraction around the midpoint, and use it to set a proportional rotateX and rotateY on the card — cursor near an edge should produce a noticeably larger rotation than cursor near the center, and the relationship must be continuous and derived from the real pointer position, not a preset animation sequence.
- Add a radial-gradient glare layer overlaid on the card whose highlight position is recalculated from the same cursor-fraction values on every pointermove, so the glare visually tracks the same point the card is tilting toward — hidden (opacity 0) when the pointer is not present.
- On pointerleave, smoothly transition the card back to a flat rotateX(0) rotateY(0) state and fade the glare back out, using a CSS transition rather than an abrupt cut.`,
    },
  },
};

export default heroInteractive3dTilt;
