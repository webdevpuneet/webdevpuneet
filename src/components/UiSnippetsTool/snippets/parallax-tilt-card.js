const parallaxTiltCard = {
  id: 'parallax-tilt-card',
  title: 'Parallax Tilt Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="pt-stage">
  <article class="pt-card" id="ptCard">
    <div class="pt-layer pt-bg" data-depth="6"></div>
    <div class="pt-layer pt-mid" data-depth="18"><span class="pt-badge">★ Featured</span></div>
    <div class="pt-layer pt-art" data-depth="34" aria-hidden="true">🪐</div>
    <div class="pt-layer pt-fg" data-depth="50">
      <h3>Deep Space</h3>
      <p>Layers drift at different depths as you tilt — real parallax, not a flat skew.</p>
    </div>
    <div class="pt-shine" id="ptShine" aria-hidden="true"></div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.pt-stage{perspective:1000px}
.pt-card{position:relative;width:300px;height:380px;border-radius:22px;background:linear-gradient(160deg,#1a1a35,#0c0c1a);border:1px solid #2a2a48;overflow:hidden;transform-style:preserve-3d;transition:transform .2s ease-out;box-shadow:0 30px 60px -26px rgba(0,0,0,.8)}

.pt-layer{position:absolute;inset:0;transition:transform .2s ease-out;will-change:transform}
.pt-bg{background:radial-gradient(circle at 50% 120%,rgba(99,102,241,.4),transparent 60%)}
.pt-mid{display:flex;justify-content:center;padding-top:22px}
.pt-badge{font-size:11px;font-weight:800;letter-spacing:.05em;background:rgba(129,140,248,.2);border:1px solid rgba(129,140,248,.5);color:#c7d2fe;padding:6px 13px;border-radius:999px;height:fit-content}
.pt-art{display:flex;align-items:center;justify-content:center;font-size:96px;filter:drop-shadow(0 16px 24px rgba(0,0,0,.5))}
.pt-fg{display:flex;flex-direction:column;justify-content:flex-end;padding:24px}
.pt-fg h3{font-size:24px;font-weight:900;letter-spacing:-.02em}
.pt-fg p{font-size:13px;color:#a9a9c5;line-height:1.55;margin-top:8px}

.pt-shine{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--sx,50%) var(--sy,50%),rgba(255,255,255,.25),transparent 45%);opacity:0;transition:opacity .25s;mix-blend-mode:soft-light}
.pt-card:hover .pt-shine{opacity:1}`,

  js: `var card = document.getElementById('ptCard');
var layers = Array.prototype.slice.call(card.querySelectorAll('.pt-layer'));

card.addEventListener('pointermove', function (e) {
  var r = card.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width - 0.5;    // -0.5..0.5
  var py = (e.clientY - r.top) / r.height - 0.5;

  // Tilt the whole card a little...
  card.style.transform = 'rotateY(' + (px * 16) + 'deg) rotateX(' + (-py * 16) + 'deg)';

  // ...and shift each layer by an amount proportional to its depth, so closer
  // layers move further than distant ones — the parallax illusion.
  layers.forEach(function (layer) {
    var d = parseFloat(layer.getAttribute('data-depth'));
    layer.style.transform = 'translate(' + (-px * d) + 'px,' + (-py * d) + 'px)';
  });

  card.style.setProperty('--sx', ((px + 0.5) * 100) + '%');
  card.style.setProperty('--sy', ((py + 0.5) * 100) + '%');
});

card.addEventListener('pointerleave', function () {
  card.style.transform = 'rotateY(0) rotateX(0)';
  layers.forEach(function (layer) { layer.style.transform = 'translate(0,0)'; });
});`,

  seo: {
    title: 'Parallax Tilt Card — Free HTML CSS JS Depth Hover Snippet',
    description: `A card whose stacked layers drift by different amounts as it tilts toward your cursor, for true depth parallax. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Parallax Tilt Card — Multi-Layer Depth That Reacts to the Cursor',
      description: `The parallax tilt card goes beyond a simple 3D tilt: as the card leans toward your cursor, its stacked content layers each shift by a different amount based on their assigned depth, so the badge, artwork, and text float at visibly different distances — real parallax rather than a flat plane being skewed. This snippet builds it with plain HTML, CSS, and one vanilla JavaScript pointer handler.

**Depth-tagged layers**

The card contains several absolutely-positioned layers — a background glow, a badge, a large emblem, and the foreground text — each carrying a \`data-depth\` value (6, 18, 34, 50). That number is how far the layer should move relative to the cursor: small for the deep background, large for the foreground. Storing depth as a data attribute keeps the parallax declarative — you tune the layering by editing numbers in the HTML, not the script.

**Tilt plus per-layer shift**

On \`pointermove\`, the handler converts the cursor position to -0.5…0.5 fractions. It applies a \`rotateY\`/\`rotateX\` tilt to the whole card (inside a \`perspective: 1000px\` stage with \`preserve-3d\`), then loops the layers and translates each by \`-px * depth\`, \`-py * depth\`. Because the translation is proportional to depth, foreground layers slide much further than background ones for the same cursor movement — which is exactly how parallax works in the real world, where near objects appear to move more than far ones. The opposite-direction shift (negative) makes the layers counter the tilt, deepening the 3D.

**The soft-light shine**

A \`.pt-shine\` layer is a radial highlight whose center follows the cursor via \`--sx\`/\`--sy\` custom properties, set from the same handler. It uses \`mix-blend-mode: soft-light\` so the highlight brightens the card's existing colors like a real reflection rather than overlaying opaque white, and it fades in on hover. This adds a glossy sheen that reads as light catching the tilted surface.

**Smooth, GPU-friendly motion**

Every animated element — the card and each layer — has a short \`transition\` and \`will-change: transform\`, so the motion eases rather than jitters with each raw pointer event, and the transforms are composited on the GPU. On \`pointerleave\` the card and all layers reset to neutral, springing back to flat.

**Why depth attributes beat hard-coding**

Driving the parallax from a per-layer \`data-depth\` means the same short loop handles any number of layers at any depths. Add a fourth content layer, give it a depth, and it joins the parallax automatically — no new code. It also makes the effect easy to tune: nudge the numbers to exaggerate or flatten the sense of space.

**Customizing it**

Adjust the tilt multiplier (16) for a stronger or gentler lean, change each layer's \`data-depth\` to restage the parallax, recolor the glow and shine, or swap the emoji emblem for an image or icon. Replace the content with a real product or collectible. Pair it with a [glare card](/ui-snippets/glare-card/) or a [pin card](/ui-snippets/pin-card/) for a set of dimensional cards.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A layered card renders flat at rest.` },
      { title: 'Move the pointer over it', text: `The card tilts toward your cursor.` },
      { title: 'Watch the layers', text: `Foreground elements drift more than background ones.` },
      { title: 'Note the shine', text: `A soft highlight follows the cursor like a reflection.` },
      { title: 'Restage the depth', text: `Edit each layer's data-depth value.` },
      { title: 'Swap the content', text: `Replace the emblem and text with your own.` },
    ] },
    features: [
      { title: 'Depth-tagged layers', text: `data-depth drives each layer's shift.` },
      { title: 'Proportional parallax', text: `Near layers move more than far ones.` },
      { title: 'Card tilt', text: `rotateY/rotateX lean toward the cursor.` },
      { title: 'Counter-shift depth', text: `Layers move against the tilt for 3D.` },
      { title: 'Soft-light shine', text: `A reflection-like highlight tracks the pointer.` },
      { title: 'Eased GPU motion', text: `Transitions and will-change keep it smooth.` },
      { title: 'Declarative layering', text: `Tune depth in HTML, not script.` },
      { title: 'Any number of layers', text: `One loop handles them all.` },
    ],
    useCases: [
      { title: 'Collectible card showcases', text: 'Pair with a [glare card](/ui-snippets/glare-card/) for collectibles, where a badge, artwork and text float at different depths as the card tilts.' },
      { title: 'Product hero shots', text: 'Float product layers over a backdrop, with near layers moving more than far ones according to each layer\'s `data-depth` value.' },
      { title: 'Featured content cards', text: 'Offer a dimensional alternative to a [pin card](/ui-snippets/pin-card/), with layers shifting against the tilt direction for true depth.' },
      { title: 'Game and pricing tier depth', text: 'Give a [pricing card](/ui-snippets/pricing-card/) tier a collectible feel, adding a shine layer that follows the pointer.' },
      { title: 'Parallax technique reference', text: 'Study how depth-tagged layers shift in proportion to the tilt, a compact model for any depth-driven pointer effect.' },
    ],
    faqs: [
      { q: 'How is this different from a normal 3D tilt card?', a: `A normal tilt rotates a single flat plane. Here the card also has several content layers, each tagged with a data-depth, and on pointer move every layer is translated by an amount proportional to its depth. So foreground elements slide further than background ones, producing genuine parallax between the layers rather than a single skewed surface.` },
      { q: 'Why store depth as a data attribute?', a: `It keeps the parallax declarative and generic. The script reads each layer's data-depth and shifts it by that factor, so one short loop handles any number of layers at any depths. To restage the effect you just edit the numbers in the HTML — add a layer with a depth and it joins the parallax with no code change.` },
      { q: 'Why do the layers move opposite to the tilt?', a: `The translation uses the negative of the cursor offset times depth, so layers shift against the direction the card leans. That counter-motion exaggerates the separation between depths and deepens the 3D illusion, making near layers feel like they're popping toward you while far ones recede.` },
      { q: 'What makes the shine look like a real reflection?', a: `The shine is a radial highlight centered on the cursor via CSS variables, set to mix-blend-mode: soft-light. soft-light brightens the card's existing colors based on what's underneath, like light catching a surface, instead of painting opaque white on top. It fades in on hover so the card is calm at rest.` },
      { q: 'How do I use this parallax tilt card in React, Vue, or Angular?', a: `Render the layers with their depth as a prop or data attribute, keep the perspective and preserve-3d CSS, and handle pointermove/pointerleave with framework events that write the card and layer transforms via refs so they don't trigger re-renders. In Tailwind, use perspective and transform utilities and apply the per-layer translate and the shine variables through inline styles updated in the handler.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to reverse-engineer the depth math by eye. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why each layer's translation is the negative of the cursor offset times its data-depth value, and how that combines with the card's own rotateY/rotateX to create the layered parallax rather than a single flat tilt. The same assistant can help optimize it, for example checking whether writing four separate style.transform strings per pointermove event causes layout thrashing on lower-powered devices, or whether the shine's CSS custom properties could be batched with the layer updates in one animation frame. It is also useful for extending the effect: ask it to add spring-based easing so the card settles instead of snapping, support touch devices with a gyroscope-driven tilt, or generalize the depth loop to any number of layers read from a data attribute. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D parallax tilt card in plain HTML, CSS, and vanilla JavaScript using only CSS 3D transforms (perspective, preserve-3d, rotateX/rotateY) and one pointermove handler — no libraries, no canvas.

Requirements:
- A card element sitting inside a container with CSS perspective, and the card itself using transform-style: preserve-3d.
- At least four absolutely-positioned content layers inside the card (for example: a background glow, a badge, a large emblem, and foreground text), each carrying its own numeric depth value stored as a data attribute.
- On pointermove over the card, compute the pointer position as a -0.5 to 0.5 fraction of the card's width and height, then apply a rotateY/rotateX tilt to the whole card proportional to that fraction.
- In the same handler, loop over every depth-tagged layer and translate each one by the negative of the pointer fraction times its own depth value, so layers with a larger depth number visibly shift further than layers with a smaller one — true per-layer parallax, not a single skewed plane.
- Add a radial "shine" layer whose highlight position is set via CSS custom properties updated from the same pointer fraction, using mix-blend-mode: soft-light so it brightens the card's existing colors rather than painting flat white over them.
- On pointerleave, reset the card's rotation and every layer's translation back to their neutral zero state, with a short CSS transition so the return is eased rather than instant.
- Keep the depth values purely declarative in the HTML (data-depth attributes) so adding a new layer requires no new JavaScript.`,
    },
  },
};

export default parallaxTiltCard;
