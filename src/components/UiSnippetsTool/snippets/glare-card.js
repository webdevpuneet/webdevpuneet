const glareCard = {
  id: 'glare-card',
  title: 'Glare Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="gl-stage">
  <article class="gl-card" id="glCard">
    <div class="gl-foil" aria-hidden="true"></div>
    <div class="gl-glare" aria-hidden="true"></div>
    <div class="gl-body">
      <span class="gl-chip">Holographic</span>
      <h3>Founders Edition</h3>
      <p>Tilt me. A foil sheen and a moving glare track your pointer in real time.</p>
      <div class="gl-foot"><span>#0042</span><span>★ Rare</span></div>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.gl-stage{perspective:900px}
.gl-card{position:relative;width:280px;height:380px;border-radius:20px;background:linear-gradient(160deg,#1b1b30,#0d0d1a);border:1px solid #2a2a45;overflow:hidden;transform-style:preserve-3d;transition:transform .12s ease-out;cursor:pointer;box-shadow:0 30px 60px -28px rgba(0,0,0,.8)}

.gl-foil{position:absolute;inset:0;opacity:.0;background:conic-gradient(from 0deg,#ff0080,#7928ca,#2afadf,#ffea00,#ff0080);background-size:200% 200%;mix-blend-mode:color-dodge;transition:opacity .3s;pointer-events:none}
.gl-card:hover .gl-foil{opacity:.35}

.gl-glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.55),transparent 45%);opacity:0;transition:opacity .25s;mix-blend-mode:soft-light}
.gl-card:hover .gl-glare{opacity:1}

.gl-body{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;padding:24px;transform:translateZ(40px)}
.gl-chip{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:rgba(122,40,202,.25);border:1px solid rgba(122,40,202,.5);color:#d8b4fe;padding:5px 11px;border-radius:999px}
.gl-body h3{margin-top:auto;font-size:24px;font-weight:900;letter-spacing:-.02em}
.gl-body p{font-size:13px;color:#a9a9c5;line-height:1.55;margin-top:8px}
.gl-foot{display:flex;justify-content:space-between;margin-top:18px;font-size:12px;font-weight:700;color:#c7c7dd}`,

  js: `var card = document.getElementById('glCard');
var foil = card.querySelector('.gl-foil');

card.addEventListener('pointermove', function (e) {
  var r = card.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width;    // 0..1
  var py = (e.clientY - r.top) / r.height;

  // 3D tilt toward the cursor (max ~14deg each axis).
  var rx = (0.5 - py) * 28;
  var ry = (px - 0.5) * 28;
  card.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';

  // Glare hotspot follows the pointer.
  card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
  card.style.setProperty('--my', (py * 100).toFixed(1) + '%');

  // Shift the foil gradient so the holographic colors flow as you move.
  foil.style.backgroundPosition = (px * 100).toFixed(1) + '% ' + (py * 100).toFixed(1) + '%';
});

card.addEventListener('pointerleave', function () {
  card.style.transform = 'rotateX(0) rotateY(0)';
});`,

  seo: {
    title: 'Glare Card — Free HTML CSS JS Holographic Tilt Snippet',
    description: `A holographic foil card that tilts in 3D and shifts a glare hotspot and rainbow sheen as your pointer moves, using blend modes. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Glare Card — Holographic Foil and Pointer-Tracking Glare',
      description: `The glare card mimics a holographic trading card or foil credit card: it tilts in 3D toward your cursor while a bright glare hotspot and a rainbow foil sheen shift across its surface, exactly like catching the light on a real holo. This snippet builds it with plain HTML, CSS blend modes, and a single vanilla JavaScript pointer handler.

**3D tilt from pointer position**

The card lives in a \`perspective: 900px\` stage and uses \`transform-style: preserve-3d\`. A \`pointermove\` handler converts the cursor's position within the card into 0–1 fractions, then maps them to \`rotateX\` and \`rotateY\` values up to about 14° each — inverted on the vertical axis so the card tips toward the pointer rather than away. The short \`.12s\` transition smooths the motion without lagging behind the cursor. On \`pointerleave\` it resets to flat.

**The glare hotspot**

A \`.gl-glare\` layer is a radial gradient whose center is driven by two CSS custom properties, \`--mx\` and \`--my\`, updated from the same pointer handler. Because the gradient is centered at \`var(--mx) var(--my)\`, the bright spot tracks exactly under the cursor. The layer uses \`mix-blend-mode: soft-light\` so the white glare brightens the card's colors realistically instead of painting an opaque white blob — it reads as light reflecting off a glossy surface.

**The holographic foil**

The signature rainbow comes from a \`.gl-foil\` layer filled with a \`conic-gradient\` cycling hot pink, purple, teal, and yellow, sized at \`200%\` so it can pan. On pointer move, its \`background-position\` shifts with the cursor, making the colors flow and swirl. The key is \`mix-blend-mode: color-dodge\`, which makes the foil interact with the dark card beneath to produce the iridescent, metallic shimmer characteristic of holographic foil — a plain overlay would just look like a flat gradient. The foil fades in on hover so the card is calm at rest.

**Depth on the content**

The card body is pushed forward with \`translateZ(40px)\` inside the preserve-3d context, so as the card tilts, the text appears to float above the foil and glare layers with real parallax. This separation sells the 3D — the content and the surface effects move at visibly different depths.

**Why blend modes matter here**

Both surface effects rely on blend modes rather than opacity. \`soft-light\` and \`color-dodge\` compute their result from the colors underneath, so the same glare looks different over the dark navy card than it would over white — which is physically how reflections and foils behave. This is what separates a convincing holo effect from a generic gradient overlay.

**Customizing it**

Tune the \`28\` multiplier for a stronger or subtler tilt, change the glare radius and opacity, swap the foil's conic colors to theme the holo, or adjust the \`translateZ\` to push the content nearer or further. Replace the card content with a real product, ticket, or collectible. Pair it with a [wobble card](/ui-snippets/wobble-card/) or a [pin card](/ui-snippets/pin-card/) for a set of tactile 3D cards, or use it as a premium [pricing card](/ui-snippets/pricing-card/) tier.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark collectible card renders, calm at rest.` },
      { title: 'Move the pointer over it', text: `The card tilts in 3D toward your cursor.` },
      { title: 'Watch the glare', text: `A bright hotspot follows the pointer like light on gloss.` },
      { title: 'See the foil', text: `A rainbow holographic sheen flows as you move.` },
      { title: 'Leave the card', text: `It eases back to flat.` },
      { title: 'Theme the holo', text: `Swap the conic foil colors and tilt strength.` },
    ] },
    features: [
      { title: 'Pointer-driven 3D tilt', text: `rotateX/rotateY follow the cursor with perspective.` },
      { title: 'Tracking glare hotspot', text: `A radial light centered on --mx/--my.` },
      { title: 'Holographic foil', text: `A panning conic gradient with color-dodge.` },
      { title: 'Realistic blend modes', text: `soft-light and color-dodge react to the card.` },
      { title: 'Parallax content', text: `translateZ floats the body above the surface.` },
      { title: 'Calm at rest', text: `Effects fade in only on hover.` },
      { title: 'Single pointer handler', text: `One listener drives tilt, glare, and foil.` },
      { title: 'Fully themeable', text: `Colors, tilt, and depth are all tunable.` },
    ],
    useCases: [
      { title: 'NFT and collectible cards', text: 'Show a holographic card beside a [pin card](/ui-snippets/pin-card/), with a bright hotspot tracking the pointer and a rainbow foil sheen shifting across the surface.' },
      { title: 'Premium pricing tiers', text: 'Offer a flashy variant of a [pricing card](/ui-snippets/pricing-card/), using `color-dodge` and `soft-light` blend modes that react to what lies beneath.' },
      { title: 'Membership cards', text: 'Pair with a [wallet card](/ui-snippets/wallet-card/) flip for loyalty programmes, so a membership card both tilts and turns over.' },
      { title: 'Event tickets', text: 'Make a [boarding pass](/ui-snippets/boarding-pass/) or concert ticket feel special, with a panning conic gradient creating the foil effect.' },
      { title: 'Product hero shots', text: 'Combine with a [wobble card](/ui-snippets/wobble-card/) grid, and use it as a reference for holographic blend-mode treatments.' },
      { icon: 'CODE', title: 'Related: 360° Product Spin Viewer', desc: 'See the [360° Product Spin Viewer](/ui-snippets/product-360-image-spin/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the card tilt toward my cursor?', a: `It sits in a perspective stage, and a pointermove handler converts the cursor's position inside the card to 0–1 fractions, then maps them to rotateX and rotateY up to about 14 degrees each. The vertical axis is inverted so the card tips toward the pointer. A short transition smooths it, and pointerleave resets to flat.` },
      { q: 'What makes the holographic foil look metallic?', a: `The foil is a panning conic-gradient layer set to mix-blend-mode: color-dodge. color-dodge computes its result from the dark card beneath, producing an iridescent metallic shimmer rather than a flat overlay. Its background-position shifts with the pointer so the rainbow flows as you move.` },
      { q: 'Why use blend modes instead of opacity?', a: `soft-light for the glare and color-dodge for the foil derive their colors from the layers underneath, so the same effect looks different over the dark card than it would over white — which is physically how reflections and foils behave. Plain opacity overlays look like flat gradients and break the holographic illusion.` },
      { q: 'How does the content float above the effects?', a: `The card uses transform-style: preserve-3d and the body is pushed forward with translateZ(40px). As the card tilts, the content moves at a different depth than the glare and foil layers, creating real parallax that separates the text from the surface and reinforces the 3D.` },
      { q: 'How do I use this glare card in React, Vue, or Angular?', a: `Render the structure as a component and keep the perspective and preserve-3d CSS. Handle pointermove and pointerleave with framework events, writing the transform and the --mx/--my/background-position via a ref so moves don't trigger re-renders. The blend-mode layers are pure CSS. In Tailwind, use perspective and transform utilities with mix-blend-color-dodge and mix-blend-soft-light.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the tilt math by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the rotateY sign flips relative to rotateX in the pointermove handler, and why the foil layer needs mix-blend-mode: color-dodge instead of a plain opacity overlay to read as metallic. It can also help you optimize the effect, for instance checking whether writing rotateX/rotateY and the --mx/--my custom properties on every pointermove event is worth throttling with requestAnimationFrame on lower-end devices. For extending it, ask for a version that adds multiple glare hotspots for multi-touch, swaps the conic-gradient palette based on a data attribute per card, or drives the tilt from a device orientation sensor on mobile instead of the pointer. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a holographic "glare card" in plain HTML, CSS, and JavaScript using CSS 3D transforms and blend modes only — no canvas, no images, no libraries.

Requirements:
- A card sitting inside a container with CSS perspective set, using transform-style: preserve-3d so its content can be pushed forward in 3D space.
- A single pointermove listener on the card that converts the cursor's position within the card's bounding rect into 0-1 fractions on both axes, then maps them to rotateX and rotateY values (roughly plus or minus 14 degrees), inverting the vertical axis so the card visually tips toward the cursor rather than away from it. Reset the transform to flat on pointerleave.
- A radial-gradient glare layer, absolutely positioned over the whole card, whose center position is driven by two CSS custom properties updated from the same pointermove handler (in percentage units), using mix-blend-mode: soft-light so it brightens the surface like a reflection instead of painting an opaque white shape.
- A holographic foil layer using a large conic-gradient (looping through at least four saturated hues) sized above 100% so it can pan, with mix-blend-mode: color-dodge so it reacts with the dark card background to look metallic and iridescent, and its background-position shifting with the same pointer fractions so the colors visibly flow as the cursor moves.
- Both the glare and foil layers should be invisible (opacity 0) at rest and fade in only on hover.
- The card's actual content (heading, text, footer) must sit in its own layer pushed forward with translateZ so it visibly floats above the glare and foil layers as the card tilts, creating real parallax separation.`,
    },
  },
};

export default glareCard;
