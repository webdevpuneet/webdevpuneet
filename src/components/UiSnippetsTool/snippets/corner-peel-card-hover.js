const cornerPeelCardHover = {
  id: 'corner-peel-card-hover',
  title: 'Corner Peel Hover Reveal Card',
  lastmod: '2026-08-27',
  category: 'animations',
  html: `<div class="demo">
  <div class="peel-card">
    <div class="peel-under">
      <span class="under-label">🎉 15% OFF</span>
      <p>Use code PEEL15 at checkout</p>
    </div>
    <div class="peel-front">
      <div class="peel-corner"></div>
      <h3>Summer Sale</h3>
      <p>Hover the corner to peel</p>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.peel-card { position: relative; width: 260px; height: 170px; }

.peel-under { position: absolute; inset: 0; border-radius: 16px; background: linear-gradient(135deg,#f59e0b,#ef4444); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #fff; text-align: center; padding: 20px; }
.under-label { font-size: 17px; font-weight: 800; }
.peel-under p { font-size: 12px; opacity: 0.9; font-weight: 600; }

.peel-front { position: absolute; inset: 0; border-radius: 16px; background: #fff; border: 1px solid #e2e8f0; box-shadow: 0 8px 22px rgba(15,23,42,0.08); padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 30px, 30px 30px, 30px 0);
  transition: clip-path 0.35s cubic-bezier(.4,0,.2,1);
}
.peel-card:hover .peel-front {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 108px, 108px 108px, 108px 0);
}

.peel-front h3 { font-size: 15px; font-weight: 800; color: #111827; }
.peel-front p { font-size: 11.5px; color: #94a3b8; font-weight: 600; }

.peel-corner { position: absolute; top: 0; left: 0; width: 30px; height: 30px; background: linear-gradient(135deg, transparent 48%, #fde68a 50%, #f59e0b 100%); border-radius: 16px 0 0 0; box-shadow: -2px 2px 6px rgba(0,0,0,0.08); transition: width 0.35s cubic-bezier(.4,0,.2,1), height 0.35s cubic-bezier(.4,0,.2,1); pointer-events: none; }
.peel-card:hover .peel-corner { width: 108px; height: 108px; }`,
  seo: {
    title: 'Corner Peel Hover Reveal Card — CSS clip-path Page-Curl Effect',
    description: 'A card whose top-left corner peels back on hover using an animated CSS clip-path polygon, revealing a hidden panel underneath — pure CSS, no JavaScript.',
    about: {
      title: 'Corner Peel Hover Card — Animating a Notched clip-path Polygon',
      description: `This effect simulates a folded paper corner lifting away from a card to reveal something hidden beneath it — a classic print and skeuomorphic-UI motif — using nothing but a layered \`clip-path\` and a small gradient triangle, animated on hover with no JavaScript at all.

**Two stacked layers, one clipped with a notch**

\`.peel-under\` is a plain full-size panel sitting behind everything, showing the "reveal" content (a discount code, in this demo). \`.peel-front\` sits on top of it at the same size, but its \`clip-path\` is a seven-point polygon that traces the card's full rectangle *except* for a small square notch cut out of the top-left corner — \`0 0, 100% 0, 100% 100%, 0 100%, 0 30px, 30px 30px, 30px 0\`. That notch is what lets a small triangle of the layer underneath show through even at rest.

**Why the notch size, not a transform, is what animates**

On \`:hover\`, the polygon's notch coordinates change from \`30px\`/\`30px\` to \`108px\`/\`108px\`, and because \`clip-path\` is transitioned with a \`cubic-bezier\` easing, the browser smoothly interpolates every point of the polygon between those two states — the missing corner visibly grows from a small triangle into a large one, exposing more of \`.peel-under\` as it does. This is a fundamentally different technique from a folding \`rotate3d\` transform (which would need a separately shaped, separately positioned corner piece with 3D perspective); here, the "peeling front layer" is really just one shape whose cut corner is getting bigger.

**The corner fold decoration is a separate, matching element**

\`.peel-corner\` is a small absolutely-positioned square in the exact top-left corner, styled with a diagonal two-color linear gradient (\`transparent 48%, #fde68a 50%, #f59e0b 100%\`) to fake the look of a folded paper triangle with a shaded underside, plus a subtle drop shadow. Its own \`width\`/\`height\` are animated on the same hover trigger and with the same transition timing as the front layer's clip-path notch, so the folded-corner graphic visually grows in lockstep with the clipped notch it's supposed to be sitting inside — two separately-styled elements kept in sync purely by sharing the same CSS trigger and duration.

**Where this earns its place over a plain reveal-on-hover panel**

A simple opacity or translate reveal communicates "something appears," but a corner-peel specifically communicates "there's something *underneath* this card," which reads well for surfacing secondary information a designer wants to feel discoverable rather than immediately obvious — a hidden discount code, a secondary stat, or an easter-egg detail on a promotional card.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Edit the hidden content in .peel-under', text: 'Replace the discount code copy with whatever content should be revealed by the peel.' },
        { title: 'Edit the visible front content in .peel-front', text: 'Update the heading and hint text shown on the card before it\'s peeled.' },
        { title: 'Adjust the peel size', text: 'Change the 108px values in both the hover clip-path and .peel-corner\'s hover width/height together — they must match for the fold graphic to align with the actual clipped notch.' },
        { title: 'Change the corner gradient colors', text: 'Update the linear-gradient stops on .peel-corner to make the fold graphic match your card\'s reveal-layer background.' },
        { title: 'Trigger on click instead of hover for touch devices', text: 'Swap the .peel-card:hover selectors for a .peel-card.peeled class toggled by a click/tap listener if you need touch support.' },
      ],
    },
    features: [
      'Pure CSS clip-path animation — no JavaScript, no image assets for the fold graphic',
      'Seven-point polygon with an animated notch simulates a growing peeled corner',
      'Separate gradient-shaded corner element kept visually in sync with the clip-path notch size',
      'Smooth cubic-bezier easing on both the clip-path and the corner element\'s dimensions',
      'Hidden reveal layer sits behind the front card at rest, fully exposed once peeled',
      'Self-contained — works as a hover-triggered CSS effect with no dependencies',
      'Card content on both layers reflows naturally since only clip-path (not size) changes',
      'Drop shadow on the corner fold adds a subtle physical, paper-like depth cue',
    ],
    useCases: [
      { icon: 'PROMO', title: 'Promotional / Discount Cards', desc: 'Reveal a hidden coupon code or limited-time offer only when a shopper hovers the card.' },
      { icon: 'CARD', title: 'Product Card Secondary Info', desc: 'Surface a secondary stat, rating breakdown, or note beneath a product card\'s primary view.' },
      { icon: 'PORTFOLIO', title: 'Portfolio / Case Study Teasers', desc: 'Hint that a case study card has more detail underneath before a user clicks through.' },
      { icon: 'GAME', title: 'Gamified Reveal Elements', desc: 'Add a playful discovery moment to a rewards or loyalty card interface.' },
      { icon: 'CODE', title: 'Related: Cursor Particle Brush Trail', desc: 'See the [Cursor Particle Brush Trail](/ui-snippets/cursor-trail-particle-brush/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this require any images for the folded-corner graphic?', a: 'No — the fold is a small square element with a CSS linear-gradient set diagonally to fake a folded triangle with a shaded underside, plus a drop-shadow for depth. No image assets are used.' },
      { q: 'Why use clip-path instead of a 3D transform to simulate the fold?', a: 'A true 3D page-fold with perspective and rotate3d is far more complex to implement correctly (needing a separately shaped back-face element with matching lighting), while a clip-path notch achieves a convincing, lightweight "something is peeling back" effect with a single transitioning property.' },
      { q: 'How do I make the peel trigger on tap for mobile instead of hover?', a: 'Add a small script that toggles a class like .peeled on the .peel-card element on click/tap, and change the CSS selectors from :hover to that class instead — the rest of the animation logic stays identical.' },
      { q: 'Can the peeled corner be a different corner of the card, like top-right?', a: 'Yes — mirror the polygon coordinates in clip-path (swap which corner has the notch) and reposition .peel-corner to the corresponding corner with a matching border-radius and gradient angle adjustment.' },
      { q: 'Why do the clip-path notch size and .peel-corner size need to match?', a: 'The clip-path notch is what actually exposes the hidden layer underneath, while .peel-corner is a purely decorative graphic meant to visually sit inside that exposed notch as a "folded paper" cue — if their sizes diverge, the fold graphic will either overflow the notch or leave part of it undecorated.' },
      { q: 'Does this affect the layout or reflow other page content?', a: 'No — both layers are absolutely positioned within a fixed-size .peel-card container, and only clip-path and the corner element\'s own width/height animate, so no surrounding layout shifts occur during the hover.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why a seven-point clip-path polygon with an animatable notch produces a smoother, simpler effect here than attempting a literal 3D-rotated page-fold, and to walk through how the polygon coordinates would need to change to peel a different corner of the card. It's also worth asking for a tap-triggered mobile variant, or a version where the reveal panel's content fades and slides in as the notch grows, rather than being fully visible underneath from the start.`,
      prompt: `Build a "corner peel" hover-reveal card effect in HTML and CSS only — no JavaScript, no image assets.

Requirements:
- Two stacked full-size layers inside one card container: a front layer showing the card's default content, and a rear layer showing hidden content that should be revealed by the peel.
- The front layer must use a CSS clip-path polygon with a small square notch cut out of one corner at rest, so a sliver of the rear layer is visible underneath even before interaction.
- On hover of the card, animate the clip-path notch to grow significantly larger with a smooth easing transition, progressively exposing more of the rear layer's content — do not use a 3D transform or rotate3d for this.
- Add a separate small decorative element positioned in the same corner as the notch, styled with a diagonal CSS gradient and a subtle drop shadow to simulate a folded paper triangle, and animate its size in sync with the clip-path notch so it visually matches the exposed area at all times.
- Ensure the whole effect works purely on :hover with pure CSS, and that neither layer's content reflows or shifts position during the animation — only the clip-path shape and the corner decoration's size should change.`,
    },
  },
};

export default cornerPeelCardHover;
