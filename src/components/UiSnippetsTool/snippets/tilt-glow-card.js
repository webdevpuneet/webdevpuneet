const tiltGlowCard = {
  id: 'tilt-glow-card',
  title: 'Tilt Glow Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<article class="tg-card" id="tgCard">
  <div class="tg-glow" id="tgGlow"></div>
  <div class="tg-inner">
    <span class="tg-badge">Pro plan</span>
    <h3 class="tg-title">Realtime Analytics</h3>
    <p class="tg-text">Track every event as it happens with sub-second dashboards and unlimited retention.</p>
    <div class="tg-foot">
      <span class="tg-price">$29<small>/mo</small></span>
      <button type="button" class="tg-btn">Upgrade</button>
    </div>
  </div>
</article>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.tg-card{position:relative;width:320px;border-radius:20px;background:#13131f;border:1px solid #242438;padding:1px;transform-style:preserve-3d;transition:transform .12s ease-out;will-change:transform}
.tg-glow{position:absolute;inset:0;border-radius:20px;opacity:0;transition:opacity .2s;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(124,92,255,.35),transparent 70%);pointer-events:none}
.tg-card:hover .tg-glow{opacity:1}
.tg-inner{position:relative;border-radius:19px;background:linear-gradient(180deg,#15151f,#101018);padding:24px;transform:translateZ(40px)}
.tg-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#c4b5fd;background:rgba(124,92,255,.14);border:1px solid rgba(124,92,255,.3);padding:4px 10px;border-radius:999px}
.tg-title{color:#fff;font-size:22px;margin:14px 0 8px;letter-spacing:-.01em}
.tg-text{color:#9494ad;font-size:14px;line-height:1.55}
.tg-foot{display:flex;align-items:center;justify-content:space-between;margin-top:22px}
.tg-price{color:#fff;font-size:26px;font-weight:800}
.tg-price small{font-size:13px;font-weight:500;color:#7a7a93}
.tg-btn{background:linear-gradient(120deg,#7c5cff,#5b8cff);color:#fff;border:0;font-family:inherit;font-weight:700;font-size:14px;padding:10px 18px;border-radius:10px;cursor:pointer}`,

  js: `var card = document.getElementById('tgCard');
var glow = document.getElementById('tgGlow');
var MAX = 10; // max tilt in degrees

function onMove(e) {
  var r = card.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width;   // 0..1 across the card
  var py = (e.clientY - r.top) / r.height;
  // Rotate opposite to the cursor on each axis so the corner under the pointer lifts.
  var rx = (0.5 - py) * MAX * 2;
  var ry = (px - 0.5) * MAX * 2;
  card.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
  // Move the radial glow to follow the cursor.
  glow.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
  glow.style.setProperty('--my', (py * 100).toFixed(1) + '%');
}

function reset() {
  card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
}

card.addEventListener('mousemove', onMove);
card.addEventListener('mouseleave', reset);`,

  seo: {
    title: 'Tilt Glow Card — Free HTML CSS JS 3D Hover Card Snippet',
    description: `A card that tilts in 3D toward the cursor with a radial glow that tracks the pointer, built with CSS transforms. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Tilt Glow Card — A 3D Card That Leans Into the Cursor',
      description: `The tilt glow card is the interactive product card that rotates in 3D space toward your pointer while a soft radial glow follows underneath — the effect popularised by modern SaaS and developer-tool landing pages. This snippet builds it with plain HTML, CSS 3D transforms, and a small vanilla JavaScript mousemove handler, with no library or canvas.

**The 3D tilt math**

On every \`mousemove\` the handler reads the card's \`getBoundingClientRect()\` and converts the cursor position into two normalised ratios from 0 to 1 across the width and height. Those ratios are mapped to \`rotateX\` and \`rotateY\` angles, deliberately inverted on each axis so the corner under the pointer lifts toward you rather than away — that inversion is the difference between a tilt that feels physical and one that feels wrong. The transform is applied with a \`perspective(800px)\` prefix so the rotation reads as depth instead of a flat skew.

**The pointer-tracking glow**

A separate absolutely-positioned \`.tg-glow\` layer holds a \`radial-gradient\` whose centre is driven by two CSS custom properties, \`--mx\` and \`--my\`. The same handler writes the cursor percentage into those variables, so the highlight slides under the cursor in real time. The glow only fades in on \`:hover\` via an opacity transition, which keeps the resting card clean and makes the light feel like it switches on as you approach.

**Layered depth with translateZ**

The inner content sits on its own layer pushed forward with \`transform: translateZ(40px)\` inside a \`transform-style: preserve-3d\` parent. Because the content lives closer to the viewer than the card surface, it parallaxes slightly as the card rotates, giving the title and button a genuine sense of floating above the panel rather than being painted onto it.

**Smooth, cheap, and jank-free**

The tilt transition is intentionally short (about 120ms) so the card chases the cursor responsively without lagging, and \`will-change: transform\` hints the compositor to promote the card to its own layer. Because only \`transform\` and a couple of custom properties change per frame, the browser never reflows or repaints layout — the whole effect runs on the GPU. On \`mouseleave\` the transform resets to zero so the card settles flat.

**Customizing it**

Tune the \`MAX\` constant to make the tilt subtler or more dramatic, change the glow colour and radius in the gradient, or adjust \`translateZ\` to push the content further forward. Drop in any content — pricing, a feature, an avatar — and the effect still works. Pair it with a [spotlight card](/ui-snippets/spotlight-card/) grid or a [pricing card](/ui-snippets/pricing-card/) section for an interactive landing page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pricing-style card renders, flat at rest.` },
      { title: 'Hover the card', text: `It tilts toward the cursor and a glow fades in.` },
      { title: 'Move the pointer around', text: `The tilt and glow follow the cursor in real time.` },
      { title: 'Move the cursor away', text: `The card settles smoothly back to flat.` },
      { title: 'Adjust the tilt', text: `Change the MAX constant for more or less rotation.` },
      { title: 'Swap the content', text: `Drop in any card body — the effect still works.` },
    ] },
    features: [
      { title: 'Cursor-aware 3D tilt', text: `rotateX and rotateY map to pointer position.` },
      { title: 'Pointer-tracking glow', text: `A radial gradient driven by CSS variables.` },
      { title: 'Parallax content layer', text: `translateZ floats the body above the card.` },
      { title: 'GPU-only animation', text: `Only transform changes — no reflow.` },
      { title: 'Perspective depth', text: `perspective() makes the tilt read as 3D.` },
      { title: 'Smooth reset', text: `mouseleave settles the card back flat.` },
      { title: 'Single config constant', text: `One MAX value controls tilt intensity.` },
      { title: 'Content-agnostic', text: `Wrap any markup in the card.` },
    ],
    useCases: [
      { title: 'Interactive pricing tiers', text: 'Make a [pricing card](/ui-snippets/pricing-card/) feel alive, tilting in 3D toward the cursor with a radial glow tracking the pointer.' },
      { title: 'Feature highlights', text: 'Tilt a [spotlight card](/ui-snippets/spotlight-card/) on hover so a key feature leans toward the visitor, with content floating above through `translateZ`.' },
      { title: 'Product showcase lift', text: 'Lift a [product card](/ui-snippets/product-card/) toward the user, using only transform changes so no layout reflow occurs.' },
      { title: 'Portfolio grids', text: 'Add depth to [focus cards](/ui-snippets/focus-cards/) or project tiles, with rotateX and rotateY mapped to pointer position.' },
      { title: 'Hero callouts and dashboards', text: 'Float a panel above a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/), or make a [glass stat card](/ui-snippets/glass-stat-card/) feel tactile.' },
    ],
    faqs: [
      { q: 'How does the card know which way to tilt?', a: `On each mousemove the handler reads getBoundingClientRect() and turns the cursor position into ratios from 0 to 1 across the card. Those ratios map to rotateX and rotateY angles, inverted per axis so the corner under the pointer lifts toward you. A perspective(800px) prefix turns the rotation into real depth instead of a flat skew.` },
      { q: 'How does the glow follow the cursor?', a: `A separate glow layer holds a radial-gradient centred on two CSS custom properties, --mx and --my. The same mousemove handler writes the cursor percentage into those variables, so the highlight slides under the pointer. It fades in only on hover via an opacity transition, so the resting card stays clean.` },
      { q: 'Why does the content seem to float above the card?', a: `The inner content is pushed forward with translateZ(40px) inside a transform-style: preserve-3d parent. Because it sits closer to the viewer than the card surface, it parallaxes as the card rotates, giving the title and button a genuine floating feel rather than looking painted on.` },
      { q: 'Is this effect expensive to run?', a: `No. Only the transform and two custom properties change per frame, so the browser never reflows or repaints layout — the work runs on the GPU compositor. will-change: transform promotes the card to its own layer, and a short transition keeps it chasing the cursor responsively without lag.` },
      { q: 'How do I use this tilt glow card in React, Vue, or Angular?', a: `Attach onMouseMove and onMouseLeave handlers to the card element via a ref. Compute the rotation from the event and the ref's bounding rect, then write the transform and CSS variables imperatively on the ref rather than through state, so you do not re-render on every pointer move. The 3D and gradient CSS port unchanged; in Tailwind use perspective and transform utilities with arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `Have an AI coding assistant like Claude explain why rx and ry are computed as (0.5 - py) and (px - 0.5) rather than the more obvious (py - 0.5) and (0.5 - px) — the inversion is subtle but it's the exact reason the corner under the cursor lifts toward you instead of tilting the wrong way. It's also a good check for efficiency: confirm that only transform and two CSS custom properties change per mousemove, and ask whether will-change: transform is actually helping here or just consuming extra compositor memory for no benefit. For extending it, ask for a version where the glow color shifts based on tilt angle, a card that tracks the pointer even when the mouse enters at speed (using pointer events instead of mouse events for better touch support), or a whole grid of these cards where only the hovered one tilts. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D tilt card that leans toward the cursor with a pointer-tracking glow, in plain HTML, CSS, and JavaScript using only CSS transforms — no canvas, no library.

Requirements:
- On mousemove over the card, read the card's bounding rect and convert the cursor's position into two ratios from 0 to 1 across the card's width and height.
- Map those ratios to rotateX and rotateY angles, inverting each axis relative to the naive mapping so the corner nearest the cursor visually lifts toward the viewer rather than tilting away, and apply the rotation with a perspective() prefix on the same transform so it reads as real depth rather than a flat skew.
- Add a separate absolutely-positioned glow layer with a radial-gradient background whose center position is controlled by two CSS custom properties; update those two properties from the same mousemove handler so the glow visibly follows the cursor in real time, and only reveal the glow via an opacity transition on hover.
- Put the card's inner content (title, text, button) in its own layer pushed forward with translateZ inside a parent using transform-style: preserve-3d, so the content appears to float above the card surface with a slight parallax as it rotates.
- Keep the tilt transition short (around 120ms) so the card visibly chases the cursor without lag, and reset the transform to flat (zero rotation) on mouseleave.
- Ensure the only properties that change per animation frame are the transform and the two custom properties — no layout-triggering properties — so the whole effect can run on the compositor.`,
    },
  },
};

export default tiltGlowCard;
