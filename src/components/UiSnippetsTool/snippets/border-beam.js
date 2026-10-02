const borderBeam = {
  id: 'border-beam',
  title: 'Border Beam',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="bm-stage">
  <article class="bm-card">
    <span class="bm-beam" aria-hidden="true"></span>
    <span class="bm-beam bm-beam2" aria-hidden="true"></span>
    <div class="bm-body">
      <div class="bm-icon">◆</div>
      <h3>Pro plan</h3>
      <p>A bead of light travels the card border on an SVG-free, GPU-friendly path.</p>
      <button type="button" class="bm-btn">Upgrade</button>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.bm-card{position:relative;width:300px;border-radius:18px;background:#10101e;border:1px solid #232338;padding:26px;overflow:hidden;isolation:isolate}

/* A small bright bead is offset-anchored to the rounded-rect border path and
   travels it on a loop, leaving a fading comet tail. */
.bm-beam{position:absolute;top:0;left:0;width:90px;height:5px;border-radius:5px;
  background:linear-gradient(90deg,transparent,#6366f1,#a78bfa,transparent);
  offset-path:rect(0 100% 100% 0 round 18px);
  offset-distance:0%;offset-rotate:auto;
  filter:drop-shadow(0 0 6px rgba(129,140,248,.9));
  animation:bmRun 4s linear infinite}
.bm-beam2{background:linear-gradient(90deg,transparent,#22d3ee,#34d399,transparent);animation-delay:-2s}
@keyframes bmRun{to{offset-distance:100%}}

.bm-body{position:relative;z-index:1}
.bm-icon{width:46px;height:46px;border-radius:12px;background:rgba(99,102,241,.16);border:1px solid rgba(99,102,241,.4);display:flex;align-items:center;justify-content:center;font-size:20px;color:#c7d2fe;margin-bottom:16px}
.bm-card h3{font-size:20px;font-weight:800;margin-bottom:8px}
.bm-card p{font-size:13.5px;color:#a3a3c2;line-height:1.6;margin-bottom:18px}
.bm-btn{width:100%;background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;transition:background .2s}
.bm-btn:hover{background:#4f46e5}`,

  js: `// The beam is pure CSS (offset-path). This script provides a fallback for the
// rare browser without CSS Motion Path: it animates a beam manually on a loop.
var supportsPath = CSS && CSS.supports && CSS.supports('offset-path', 'rect(0 100% 100% 0)');

if (!supportsPath) {
  document.querySelectorAll('.bm-beam').forEach(function (beam, idx) {
    var card = beam.closest('.bm-card');
    var t = idx * 0.5;
    function frame() {
      var r = card.getBoundingClientRect();
      var w = r.width, h = r.height, per = 2 * (w + h);
      var d = (t % 1) * per;        // position along the perimeter
      var x, y;
      if (d < w) { x = d; y = 0; }
      else if (d < w + h) { x = w; y = d - w; }
      else if (d < 2 * w + h) { x = w - (d - w - h); y = h; }
      else { x = 0; y = h - (d - 2 * w - h); }
      beam.style.transform = 'translate(' + (x - 45) + 'px,' + (y - 2) + 'px)';
      t += 0.0025;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}`,

  seo: {
    title: 'Border Beam — Free HTML CSS JS Traveling Border Snippet',
    description: `A bright bead of light that travels a card border on a CSS Motion Path loop, with a comet tail and a JS fallback. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Border Beam — A Light Bead Tracing the Card Border',
      description: `The border beam is the popular accent where a small bright bead of light travels continuously around a card border, tracing the rounded rectangle like a comet on a track. This snippet builds it primarily with CSS Motion Path — the modern \`offset-path\` API — so the beam follows the exact border with almost no code, and it includes a JavaScript fallback for older browsers.

**CSS Motion Path does the work**

The beam is a small gradient pill, and its position is controlled by \`offset-path: rect(0 100% 100% 0 round 18px)\`, which defines a rounded-rectangle track matching the card border. Animating \`offset-distance\` from \`0%\` to \`100%\` slides the beam along that path, and \`offset-rotate: auto\` keeps the pill oriented along the direction of travel, so it banks around the corners naturally. This is the entire animation — no SVG path, no per-frame JavaScript, and the browser composites it on the GPU.

**A comet, not a dot**

The bead is a 90px-wide pill with a \`linear-gradient\` that fades from transparent to bright and back, plus a colored \`drop-shadow\`. Because it is elongated and oriented along the path, it reads as a streak of light with a glowing head rather than a plain dot — the comet look. A second beam with a different color and a \`-2s\` animation delay travels the same path on the opposite side, so two beams chase each other around the border.

**Confined to the card**

The card uses \`overflow: hidden\` and \`isolation: isolate\`, so the beams and their glow are clipped to the rounded shape and the stacking context stays self-contained. The card body sits above the beams via \`z-index\`, so the light passes behind the content along the edge without obscuring the icon, text, or button.

**The fallback**

CSS Motion Path is widely supported, but the script checks \`CSS.supports('offset-path', ...)\` and, only if unsupported, animates each beam manually. The fallback computes the card perimeter and walks a position parameter around it each frame, mapping the distance to x/y coordinates along the four edges and translating the beam there. This guarantees the effect still runs everywhere, while modern browsers get the cheaper pure-CSS path. Most users never execute the fallback at all.

**Why offset-path over alternatives**

Older border-light effects rotate a huge conic gradient behind a masked panel (like a spinning ring) or animate an SVG stroke. \`offset-path\` is more precise — the beam genuinely follows the border including the corner radius — and lighter, since it animates a single property on a tiny element. It also makes the speed and direction trivial to control through the animation, and supports multiple independent beams on one path.

**Customizing it**

Change the \`round\` radius in \`offset-path\` to match your card, recolor the beam gradients, lengthen the pill for a longer tail, retime the loop for a faster or slower orbit, or add more beams with staggered delays. Use it on buttons or inputs by giving them the same beam and a matching path. Pair it with a [shimmer button](/ui-snippets/shimmer-button/) or a [meteor card](/ui-snippets/meteor-card/) for a coordinated set of glowing components.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A card renders with a bead of light circling its border.` },
      { title: 'Watch the beam', text: `It traces the rounded rectangle and banks around corners.` },
      { title: 'Spot the second beam', text: `A different-colored beam chases it from the opposite side.` },
      { title: 'Match your radius', text: `Set the offset-path round value to your card radius.` },
      { title: 'Recolor the beams', text: `Edit the gradient colors and glow.` },
      { title: 'Add more beams', text: `Duplicate with staggered animation delays.` },
    ] },
    features: [
      { title: 'CSS Motion Path', text: `offset-path traces the exact border.` },
      { title: 'Auto-oriented bead', text: `offset-rotate banks it around corners.` },
      { title: 'Comet tail', text: `An elongated gradient pill with a glow.` },
      { title: 'Dual chasing beams', text: `A second beam on a delayed offset.` },
      { title: 'Clipped to the card', text: `overflow hidden frames the light.` },
      { title: 'Content stays clear', text: `Beams sit behind the body.` },
      { title: 'JS fallback', text: `Manual perimeter walk where unsupported.` },
      { title: 'GPU-cheap', text: `One property animates on a tiny element.` },
    ],
    useCases: [
      { title: 'Featured plan highlights', text: 'Highlight a tier beside a [pricing card](/ui-snippets/pricing-card/), with a bright bead tracing the border like a comet on a track.' },
      { title: 'Premium upsell cards', text: 'Pair with a [meteor card](/ui-snippets/meteor-card/) set, using `offset-path` so the beam follows the exact rounded border.' },
      { title: 'AI product cards', text: 'Match a [shimmer button](/ui-snippets/shimmer-button/) call to action, with a second beam on a delayed offset for a dual chasing effect.' },
      { title: 'Dashboard attention markers', text: 'Draw attention to a key tile inside a [metric card grid](/ui-snippets/metric-card-grid/), with `offset-rotate` banking the bead around corners.' },
      { title: 'Motion Path reference', text: 'Learn border animation with CSS Motion Path, including the JavaScript fallback for browsers that do not support it.' },
      { icon: 'CODE', title: 'Related: Direction-Aware Hover', desc: 'See the [Direction-Aware Hover](/ui-snippets/direction-aware-hover/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the beam follow the border exactly?', a: `The beam uses CSS Motion Path: offset-path defines a rounded-rectangle track matching the card border, and animating offset-distance from 0% to 100% slides the beam along it. offset-rotate: auto keeps the pill oriented along the direction of travel so it banks around the corners. That single animation is the whole effect — no SVG and no per-frame JavaScript.` },
      { q: 'Why does it look like a comet instead of a dot?', a: `The bead is a 90px-wide pill filled with a gradient that fades from transparent to bright and back, plus a colored drop-shadow. Because it is elongated and oriented along the path, it reads as a streak of light with a glowing head rather than a round dot, giving the comet appearance.` },
      { q: 'What happens in browsers without CSS Motion Path?', a: `The script checks CSS.supports for offset-path and, only when it is unsupported, animates each beam manually. The fallback computes the card perimeter and walks a position around the four edges each frame, translating the beam to the matching x/y. Modern browsers skip this entirely and use the cheaper pure-CSS path.` },
      { q: 'Why use offset-path instead of a spinning conic gradient?', a: `A conic-gradient ring spins a large element behind a mask, which approximates a border. offset-path is more precise — the beam genuinely follows the border including the corner radius — and lighter, animating one property on a tiny element. It also supports multiple independent beams on the same path with staggered delays.` },
      { q: 'How do I use this border beam in React, Vue, or Angular?', a: `The CSS, including offset-path, ports directly — wrap it in a component and set the path radius to match your card. Run the support check and fallback in a mount effect with cleanup that cancels the animation frame on unmount, using refs for the beams. In Tailwind, apply the offset-path and animation via arbitrary values and keep the fallback in the component logic.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the offset-path geometry or the perimeter-walking fallback by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how offset-path: rect(0 100% 100% 0 round 18px) combined with offset-rotate: auto makes the beam bank correctly around the card's rounded corners, and how the JS fallback's perimeter math (the four if/else branches mapping distance to x/y) reproduces that same path manually. The same assistant can help optimize it — asking whether the CSS.supports feature check should be cached at module load instead of re-run, or whether the fallback's requestAnimationFrame loop could pause when the card is off-screen. It's also useful for extending the effect: ask it to make the beam speed or color react to a hover state, support a non-rectangular card shape, or add a third beam on its own path offset. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "border beam" effect in plain HTML, CSS, and JavaScript where a glowing bead of light continuously travels around a card's rounded border, using the CSS Motion Path offset-path property as the primary mechanism, with a JavaScript fallback for browsers that lack support.

Requirements:
- A card with position: relative, overflow: hidden, and isolation: isolate so glow effects are clipped to its rounded shape and don't affect surrounding stacking context.
- A small elongated pill element (not a plain circle) whose position is driven by offset-path set to a rounded-rectangle path matching the card's exact border-radius, animated by transitioning offset-distance from 0% to 100% on an infinite loop, with offset-rotate set to auto so the pill's orientation follows the direction of travel around corners.
- Style the pill with a linear-gradient that fades from transparent through a bright color and back to transparent, plus a colored drop-shadow, so it reads as a comet with a glowing head rather than a flat dot.
- Add a second beam on the same path using a different gradient color and a negative animation-delay so it appears to chase the first beam from the opposite side.
- Detect offset-path support at runtime with CSS.supports, and only when it is unsupported, run a JavaScript fallback that computes the card's actual pixel perimeter (2 * (width + height)), walks a position value around it every animation frame, maps that position to x/y coordinates along the four straight edges, and moves the beam there with a CSS transform — without ever running this fallback loop in browsers that do support offset-path.
- Keep the card's text content in a stacking layer above the beams via z-index so the light passes behind the content, not over it.`,
    },
  },
};

export default borderBeam;
