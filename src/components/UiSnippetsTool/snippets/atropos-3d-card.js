const atropos3dCard = {
  id: 'atropos-3d-card',
  title: 'Atropos 3D Parallax Card',
  lastmod: '2026-08-02',
  category: 'cards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.css',
    'https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.js',
  ],
  html: `<div class="a3d-stage">
  <div class="atropos a3d-card" id="a3dCard">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner">

          <div class="a3d-bg" data-atropos-offset="-6"></div>
          <div class="a3d-glow" data-atropos-offset="-3"></div>

          <span class="a3d-kicker" data-atropos-offset="2">Limited release</span>

          <div class="a3d-orb" data-atropos-offset="9">
            <span class="a3d-ring" data-atropos-offset="4"></span>
          </div>

          <div class="a3d-copy" data-atropos-offset="4">
            <h3>Nova Halo</h3>
            <p>Anodized titanium · 42mm</p>
          </div>

          <div class="a3d-foot" data-atropos-offset="7">
            <b>$1,280</b>
            <button class="a3d-btn">Reserve</button>
          </div>

          <span class="a3d-badge" data-atropos-offset="14">3D</span>

        </div>
      </div>
    </div>
  </div>

  <p class="a3d-hint">Move your pointer across the card — every layer shifts at its own depth.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#070912;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px}
.a3d-stage{display:flex;flex-direction:column;align-items:center;gap:22px}

.a3d-card{width:min(340px,86vw)}
.a3d-card .atropos-inner{position:relative;border-radius:24px;overflow:hidden;padding:26px 24px 24px;min-height:420px;display:flex;flex-direction:column;background:#0f1428;border:1px solid rgba(255,255,255,.09)}

.a3d-bg{position:absolute;inset:-14%;background:radial-gradient(60% 55% at 30% 18%,#3730a3,transparent 70%),radial-gradient(55% 50% at 78% 82%,#0e7490,transparent 72%),#0b0f22}
.a3d-glow{position:absolute;left:50%;top:38%;width:280px;height:280px;margin:-140px 0 0 -140px;border-radius:50%;background:radial-gradient(circle,rgba(129,140,248,.42),transparent 66%);filter:blur(6px)}

.a3d-kicker{position:relative;align-self:flex-start;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#a5b4fc;background:rgba(165,180,252,.12);border:1px solid rgba(165,180,252,.3);padding:5px 11px;border-radius:99px}

.a3d-orb{position:relative;width:168px;height:168px;margin:26px auto 8px;border-radius:50%;background:conic-gradient(from 220deg,#818cf8,#22d3ee,#c084fc,#818cf8);box-shadow:0 26px 50px -18px rgba(34,211,238,.6),inset 0 -14px 30px rgba(0,0,0,.5)}
.a3d-orb::after{content:'';position:absolute;left:22%;top:15%;width:38%;height:26%;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,.72),transparent);filter:blur(3px)}
.a3d-ring{position:absolute;inset:-22px;border-radius:50%;border:1.5px dashed rgba(255,255,255,.28)}

.a3d-copy{position:relative;text-align:center;margin-top:14px}
.a3d-copy h3{font-size:25px;font-weight:800;letter-spacing:-.02em}
.a3d-copy p{font-size:12.5px;color:#98a2c9;margin-top:5px}

.a3d-foot{position:relative;margin-top:auto;padding-top:20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.a3d-foot b{font-size:21px;font-weight:800}
.a3d-btn{padding:11px 20px;border:none;border-radius:11px;background:#fff;color:#0f1428;font:700 13px system-ui;cursor:pointer;transition:transform .15s}
.a3d-btn:hover{transform:translateY(-2px)}

.a3d-badge{position:absolute;top:20px;right:20px;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 12px system-ui;color:#0f1428;background:linear-gradient(135deg,#fde047,#fb923c);box-shadow:0 12px 26px -8px rgba(251,146,60,.8)}

.a3d-hint{font-size:13px;color:#7d86ab;text-align:center;max-width:320px;line-height:1.6}`,

  js: `var instance = Atropos({
  el: '#a3dCard',
  // How far the card scales up while active — subtle, or the parallax reads as a zoom.
  activeOffset: 42,
  shadowScale: 1.04,
  rotateXMax: 14,
  rotateYMax: 14,
  duration: 320,
  shadow: true,
  highlight: true
});

// prefers-reduced-motion users get the card, not the gyroscope.
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyMotionPref() {
  if (reduce.matches) instance.destroy();
}
applyMotionPref();
if (reduce.addEventListener) reduce.addEventListener('change', applyMotionPref);`,

  seo: {
    title: 'Atropos 3D Parallax Card — Layered Depth Hover Card',
    description: 'A product card where every layer moves at its own depth on pointer or gyroscope, built with Atropos 3D parallax. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Atropos 3D Parallax Card — Real Depth From Per-Layer Offsets',
      description: `A tilt card that only rotates is a flat picture on a hinge. The thing that makes a 3D card feel like an object with depth is **parallax between its layers** — the badge moving further than the title, the background moving the opposite way — because differential motion is the cue the visual system actually uses to infer depth.

**Atropos** is a 4kb library built for exactly this, and it is a meaningfully different tool from the many tilt scripts that only apply a rotation to one element.

## The required nesting, and why each level exists

Atropos will not work against arbitrary markup. It needs four nested elements, and each one owns a single transform so they do not fight:

\`.atropos > .atropos-scale > .atropos-rotate > .atropos-inner\`

- \`.atropos\` is the root Atropos binds to and where the perspective is established.
- \`.atropos-scale\` handles the lift — the card growing slightly as it becomes active.
- \`.atropos-rotate\` handles rotateX and rotateY from pointer position.
- \`.atropos-inner\` holds your content and is where the parallax children live.

Combining scale and rotation onto one element would make them multiply into skew as they animate. Splitting them across levels keeps each transform independent, which is why the nesting is mandatory rather than stylistic.

## data-atropos-offset is the whole design language

Every child that should move independently declares its depth as a plain number:

\`<span class="a3d-badge" data-atropos-offset="14">\`

The number is a translation multiplier applied along the card's Z-plane as it rotates. The signs and magnitudes here are chosen as a deliberate depth stack:

- **\`-6\`** — the background gradient. Negative offsets move *against* the pointer, so the backdrop slides opposite to the foreground. This is the single most effective trick in the file: opposing motion produces far more perceived depth than everything drifting the same way.
- **\`-3\`** — the glow, sitting just above the background.
- **\`2\` / \`4\`** — the kicker pill and the copy, barely floating.
- **\`9\`** — the product orb, clearly forward.
- **\`14\`** — the corner badge, closest to the viewer and moving most.

Read top to bottom, those numbers *are* the card's z-order. Adjusting depth is editing one attribute — no CSS, no JavaScript.

Two things are easy to get wrong. Offsets need a positioned ancestor and \`position: relative\` on the child to layer predictably, which is why nearly every element in the CSS carries it. And past roughly ±20 the illusion breaks: layers slide so far they visibly detach from the card edges.

## Configuration that matters

\`activeOffset: 42\` sets how far the card pushes toward the viewer while active. Turned up, the whole card reads as a zoom and the per-layer parallax gets lost inside it — the layer offsets should be doing the work, not the global scale.

\`rotateXMax\` and \`rotateYMax\` at 14 degrees are deliberately conservative. Tilt scripts commonly default to 25 or more, which looks impressive on a screenshot and makes text along the far edge genuinely hard to read at a glance. \`duration: 320\` governs the ease back to rest, so releasing the pointer settles rather than snapping.

\`highlight: true\` adds Atropos's glare layer — a soft radial sheen that tracks the pointer, which is what sells the surface as glass rather than paper. \`shadow\` with \`shadowScale: 1.04\` grows the drop shadow slightly as the card lifts, grounding it.

## Free on mobile

Atropos falls back to **device orientation** on touch devices with no extra code. The card tilts as the phone tilts. That is genuinely differentiating — most tilt implementations are pointer-only and are simply inert on the devices where most traffic arrives.

## Reduced motion

Continuous pointer-tracked 3D motion is exactly what \`prefers-reduced-motion\` exists for, and gyroscope tilt can be actively unpleasant for people with vestibular sensitivity. The snippet queries the media list and calls \`instance.destroy()\` when reduction is requested, which restores the markup to a normal static card — the content is untouched, only the motion goes. The \`change\` listener means toggling the OS setting takes effect without a reload.

## Reusing it

Keep the four-level nesting, then compose your own content inside \`.atropos-inner\` and assign offsets from a rough depth plan: backgrounds negative, body content low positive, the one element you want to pop highest. Compare it with a [3D card tilt](/ui-snippets/3d-card-tilt/) for the single-layer version, or a [glare card](/ui-snippets/glare-card/) when you want the sheen without the parallax.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both Atropos CDNs', text: 'The library needs its CSS as well as its JS — include both from the CDN panel.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A layered product card renders and responds to pointer movement.' },
      { title: 'Move your pointer', text: 'Each layer shifts by its own offset, and a glare tracks the cursor.' },
      { title: 'Try it on a phone', text: 'Atropos switches to device orientation automatically — tilt the device.' },
      { title: 'Set your own depths', text: 'Give any child a data-atropos-offset — negative moves against the pointer.' },
      { title: 'Tune the tilt', text: 'Adjust rotateXMax and rotateYMax, keeping them modest for readability.' },
    ] },
    features: [
      { title: 'Per-layer parallax', text: 'data-atropos-offset gives every child its own depth multiplier.' },
      { title: 'Opposing background motion', text: 'Negative offsets move against the pointer for real depth cues.' },
      { title: 'Split transform nesting', text: 'Scale and rotate on separate elements so they never skew.' },
      { title: 'Pointer-tracking glare', text: 'A highlight layer that sells the surface as glass.' },
      { title: 'Gyroscope on touch', text: 'Falls back to device orientation with no extra code.' },
      { title: 'Readable tilt limits', text: '14 degrees max keeps far-edge text legible.' },
      { title: 'Grounded shadow', text: 'shadowScale grows the drop shadow as the card lifts.' },
      { title: 'Reduced-motion aware', text: 'destroy() restores a static card when motion is reduced.' },
    ],
    useCases: [
      { title: 'Product showcases', text: 'Hero a single item with depth instead of a flat render.' },
      { title: 'Pricing and plan highlights', text: 'Make the recommended tier physically stand forward.' },
      { title: 'Collectible and NFT cards', text: 'Layered art that reads as a real object in the hand.' },
      { title: 'Portfolio project tiles', text: 'A richer alternative to a [3D card tilt](/ui-snippets/3d-card-tilt/).' },
      { title: 'App store listings', text: 'Depth on a [app store card](/ui-snippets/app-store-card/) above the fold.' },
      { title: 'Learning 3D transforms', text: 'A reference for perspective, transform splitting, and depth stacking.' },
      { icon: 'CODE', title: 'Related: Color Palette Extractor', desc: 'See the [Color Palette Extractor](/ui-snippets/color-palette-extractor/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does Atropos need four nested elements?', a: 'Each level owns one transform. The root establishes perspective, .atropos-scale handles the lift, .atropos-rotate handles rotateX and rotateY, and .atropos-inner holds your content. Combining scale and rotation on one element makes them multiply into visible skew during animation, so the nesting keeps each transform independent.' },
      { q: 'What does a negative data-atropos-offset do?', a: 'It moves that layer against the pointer instead of with it. Backgrounds set to negative values slide opposite to the foreground, and that opposing motion is what produces convincing depth — far more than having every layer drift the same direction at different speeds.' },
      { q: 'How high can offsets go?', a: 'Practically about plus or minus 20. Beyond that, layers translate so far during rotation that they visibly detach from the card edges and the illusion collapses. The stack here runs from -6 for the background up to 14 for the badge, which is a full depth range without artifacts.' },
      { q: 'Why keep rotateXMax and rotateYMax at only 14 degrees?', a: 'Tilt libraries often default to 25 or more, which looks striking in a screenshot but makes text on the far edge genuinely hard to read while the card is tilted. Fourteen degrees still reads clearly as 3D while keeping every word legible at a glance.' },
      { q: 'Does this work on touch devices?', a: 'Yes. Atropos falls back to device orientation on touch, so the card tilts as the phone tilts, with no additional code. That is a real advantage over pointer-only tilt scripts, which are simply inert on mobile.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Render the four-level nesting in your template and call Atropos({ el: ref.current }) in a mount effect, keeping the returned instance in a ref. Call instance.destroy() in cleanup so remounts do not stack listeners. Import the Atropos CSS once globally rather than per component, and put data-atropos-offset directly on your JSX or template elements.' },
    ],
    aiPrompt: {
      paragraph: `The depth in this card comes from a handful of numbers, which makes it unusually productive to reason about out loud. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why Atropos splits scale and rotation across .atropos-scale and .atropos-rotate rather than applying both to one element, and what visual artifact combining them would produce. Then ask it to map every data-atropos-offset in the markup into an ordered depth stack and explain specifically why the background uses a negative value — try flipping it to positive to see how much depth is lost when every layer moves the same direction. For optimization, ask whether a large blurred radial glow layer is expensive to repaint during continuous pointer tracking, and whether promoting layers with will-change would help or hurt here. To extend it: have it drive the offsets from a data attribute loop so depths can be authored per card, add an inView guard so the instance only binds while the card is on screen, wire the orb gradient to a color picker, or add a keyboard-accessible focus state since pointer tilt is inherently mouse-only. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a premium 3D parallax product card using the Atropos library (v2 from a CDN — you must include BOTH its JS and its CSS) in plain HTML, CSS, and JavaScript.

Requirements:
- Use Atropos's required four-level nesting exactly: .atropos > .atropos-scale > .atropos-rotate > .atropos-inner, and explain in comments that each level owns a single transform — perspective on the root, lift on scale, rotateX/rotateY on rotate — because combining scale and rotation on one element makes them multiply into visible skew.
- Compose a product card inside .atropos-inner with at least seven layers, each assigned a data-atropos-offset that forms a deliberate depth stack: a full-bleed gradient background at a NEGATIVE offset (around -6) so it moves against the pointer, a blurred glow just above it (around -3), a kicker pill and body copy at low positive offsets (2 to 4), a large product element such as a conic-gradient orb at a clearly forward offset (around 9), a price/CTA row (around 7), and a small corner badge at the highest offset (around 14) so it sits closest to the viewer.
- Explain why the background offset is negative: opposing motion between background and foreground produces far stronger perceived depth than every layer drifting the same direction, and note that offsets beyond roughly plus or minus 20 make layers visibly detach from the card edges.
- Give the parallax children position: relative so they layer predictably above the absolutely positioned background.
- Configure Atropos with a modest activeOffset (around 42) so the global lift does not overwhelm the per-layer parallax, rotateXMax and rotateYMax of about 14 degrees (deliberately conservative — 25+ makes far-edge text hard to read while tilted), a duration around 320ms for the settle back to rest, and both shadow (with a shadowScale near 1.04) and highlight enabled so a pointer-tracking glare sells the surface as glass.
- Add a prefers-reduced-motion guard: query the media list and call instance.destroy() when reduction is requested so the card becomes a normal static card with its content intact, and attach a change listener so toggling the OS setting takes effect without a reload.
- Style it as a dark premium card: rounded 24px corners, a conic-gradient orb with an inset shadow and a soft specular highlight, a dashed orbit ring, and a white pill CTA.`,
    },
  },
};

export default atropos3dCard;
