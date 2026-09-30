const flipPricingCard = {
  id: 'flip-pricing-card',
  title: 'Flip Pricing Card',
  lastmod: '2026-07-18',
  category: 'pricing',
  html: `<div class="fpc-card" id="fpcCard">
  <div class="fpc-inner" id="fpcInner">
    <!-- Front face -->
    <div class="fpc-face fpc-front">
      <span class="fpc-badge">Most popular</span>
      <h3 class="fpc-plan">Pro</h3>
      <p class="fpc-tagline">For growing teams that need more room.</p>
      <div class="fpc-price"><span class="fpc-currency">$</span><span class="fpc-amount">24</span><span class="fpc-period">/mo</span></div>
      <p class="fpc-billing">Billed monthly · cancel anytime</p>
      <button class="fpc-cta" type="button">Start free trial</button>
      <button class="fpc-flip" type="button" id="fpcToFeatures">
        See all features
        <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>

    <!-- Back face -->
    <div class="fpc-face fpc-back">
      <h3 class="fpc-plan">Pro includes</h3>
      <ul class="fpc-features">
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>Unlimited projects</li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>25 team members</li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>100 GB storage</li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>Advanced analytics</li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>Priority support</li>
        <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>Custom integrations</li>
      </ul>
      <button class="fpc-cta" type="button">Start free trial</button>
      <button class="fpc-flip" type="button" id="fpcToFront">
        <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        Back to pricing
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.fpc-card {
  width: 320px;
  height: 440px;
  perspective: 1400px;
}

.fpc-inner {
  position: relative;
  width: 100%; height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}
.fpc-card.flipped .fpc-inner { transform: rotateY(180deg); }

.fpc-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 28px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.fpc-front { border-top: 4px solid #6366f1; }
.fpc-back { transform: rotateY(180deg); border-top: 4px solid #6366f1; }

.fpc-badge {
  align-self: flex-start;
  padding: 4px 12px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  border-radius: 999px;
  margin-bottom: 16px;
}
.fpc-plan { font-size: 21px; font-weight: 800; color: #0f172a; }
.fpc-tagline { font-size: 13.5px; color: #64748b; line-height: 1.5; margin-top: 6px; }

.fpc-price { display: flex; align-items: baseline; margin-top: 22px; }
.fpc-currency { font-size: 22px; font-weight: 700; color: #0f172a; align-self: flex-start; margin-top: 6px; }
.fpc-amount { font-size: 52px; font-weight: 800; color: #0f172a; line-height: 1; letter-spacing: -0.02em; }
.fpc-period { font-size: 15px; font-weight: 600; color: #94a3b8; margin-left: 4px; }
.fpc-billing { font-size: 12px; color: #94a3b8; margin-top: 8px; }

.fpc-cta {
  margin-top: auto;
  padding: 13px;
  background: #6366f1;
  color: #fff;
  border: none; border-radius: 11px;
  font-size: 14.5px; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: background 0.18s, transform 0.1s;
}
.fpc-cta:hover { background: #4f46e5; }
.fpc-cta:active { transform: scale(0.98); }

.fpc-flip {
  margin-top: 12px;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px;
  background: none; border: none;
  color: #6366f1; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit;
}
.fpc-flip svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.fpc-flip:hover { text-decoration: underline; }

.fpc-features { list-style: none; margin: 18px 0 0; display: flex; flex-direction: column; gap: 13px; }
.fpc-features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #334155; font-weight: 500; }
.fpc-features svg { width: 18px; height: 18px; flex-shrink: 0; padding: 3px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; background: #22c55e; border-radius: 50%; }`,
  js: `const card = document.getElementById('fpcCard');

document.getElementById('fpcToFeatures').addEventListener('click', () => {
  card.classList.add('flipped');
});

document.getElementById('fpcToFront').addEventListener('click', () => {
  card.classList.remove('flipped');
});`,
  seo: {
    title: 'Flip Pricing Card — Free HTML CSS JS 3D Snippet',
    description: 'A pricing card that flips in 3D to reveal the full feature list on the back face, built with CSS preserve-3d. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Flip Pricing Card — 3D Flip to Reveal Features with CSS preserve-3d',
      description: `Pricing cards face a constant tension: marketers want a clean, scannable front with just the plan name, price, and a call to action, but buyers comparing plans want the full feature list. The flip pricing card resolves that tension by putting the headline pricing on the front and the complete feature breakdown on the back, joined by a smooth 3D flip animation. The buyer sees an uncluttered card first, then flips it over when they want detail — all without a modal, a tooltip, or leaving the page. This component is built with pure CSS 3D transforms and a few lines of JavaScript that only toggle a class.

**The 3D flip mechanism**

The flip relies on three coordinated CSS properties. The outer \`.fpc-card\` sets \`perspective: 1400px\`, which defines how much depth the 3D scene has — a smaller value exaggerates the perspective, a larger one flattens it. The \`.fpc-inner\` wrapper sets \`transform-style: preserve-3d\` so its children exist in the same 3D space rather than being flattened, and it carries the \`transition\` that animates the rotation. Adding the \`.flipped\` class rotates the inner wrapper with \`transform: rotateY(180deg)\`, swinging it around its vertical axis like a turning page.

**Hiding the back of each face**

Both faces are stacked on top of each other with \`position: absolute; inset: 0\`. The key to a clean flip is \`backface-visibility: hidden\` on each face, which makes a face invisible when it is rotated away from the viewer. The front face sits at 0 degrees and the back face is pre-rotated with \`transform: rotateY(180deg)\` so that, when the wrapper flips, the back face rotates into the 0-degree viewing position and becomes visible while the front rotates away and disappears. Without \`backface-visibility: hidden\` you would see a mirrored, reversed copy of the front through the back.

**Why the animation is GPU-accelerated and smooth**

Because the flip animates only the \`transform\` property — never \`width\`, \`height\`, \`top\`, or \`left\` — the browser can hand the entire animation to the GPU compositor. No layout or paint work happens during the 0.7-second transition, so it stays at 60fps even on modest hardware. The timing function \`cubic-bezier(0.4, 0.2, 0.2, 1)\` gives the flip a slight ease-in and a soft settle at the end, which reads as more physical than a linear rotation.

**The JavaScript: just a class toggle**

All the JavaScript does is add or remove the \`.flipped\` class on the card in response to the two flip buttons — "See all features" on the front and "Back to pricing" on the back. The animation, the face-hiding, and the perspective all live in CSS, so the script is three lines. This separation means you can trigger the flip from anything: a hover (\`@media (hover: hover)\`), a parent toggle, or a framework state change, without touching the visual logic.

**Both faces are fully styled cards**

Each face is a complete pricing card in its own right — the front has a "Most popular" badge, the plan name, a tagline, a large price with a superscript currency symbol and a \`/mo\` period, billing fine print, and a primary CTA pinned to the bottom with \`margin-top: auto\`. The back has the plan name, a six-item feature list with green circular checkmark icons, the same CTA, and a button to flip back. Because the CTA appears on both faces, a buyer can convert whether they are looking at the price or the features. The shared \`#6366f1\` accent and the 4px top border tie the two faces together visually.

**Customisation**

To adapt the card, edit the plan name, price, tagline, and the feature \`<li>\` items. Swap the \`#6366f1\` accent (used by the badge, the top border, the CTA, and the flip links) for your brand colour. Change the flip duration by editing the \`transition\` on \`.fpc-inner\`, and adjust \`perspective\` on \`.fpc-card\` to make the flip feel deeper or flatter. To build a full pricing table, render three of these cards in a CSS grid and flip them independently — each manages its own \`.flipped\` state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A pricing card renders showing the Pro plan, price, and a "See all features" button.` },
      { title: 'Click "See all features"', text: `The card rotates 180 degrees in 3D over 0.7 seconds to reveal the full feature list on the back face.` },
      { title: 'Click "Back to pricing"', text: `The card flips back to the front, returning to the headline price and CTA.` },
      { title: 'Edit the plan and price', text: `Change the plan name, currency symbol, amount, period, and tagline on the front face, and the <li> feature items on the back.` },
      { title: 'Recolour the accent', text: `Replace #6366f1 (badge, top border, CTA, flip links) with your brand colour; the green checkmark colour is set separately on .fpc-features svg.` },
      { title: 'Build a pricing row', text: `Duplicate the card three times inside a CSS grid for a multi-tier table — each card flips independently via its own .flipped class.` },
    ]},
    features: [
      { title: 'True 3D flip', text: `Uses perspective, transform-style: preserve-3d, and rotateY(180deg) for a real card-turning animation, not a fade or slide.` },
      { title: 'backface-visibility hiding', text: `Each face hides its reverse so only the forward-facing side shows during and after the flip — no mirrored ghosting.` },
      { title: 'GPU-accelerated', text: `Animates transform only, so the flip runs on the compositor at 60fps with no layout or paint cost.` },
      { title: 'Two complete card faces', text: `Front shows price, badge, tagline, and CTA; back shows the full feature list and CTA — both convertible.` },
      { title: 'CTA on both sides', text: `The primary call to action appears on the front and the back, so a buyer can sign up from either view.` },
      { title: 'Minimal JavaScript', text: `Three lines toggle a single .flipped class; all animation and 3D logic lives in CSS and can be triggered by anything.` },
      { title: 'Tuned easing', text: `A custom cubic-bezier gives the rotation a soft settle that feels physical rather than mechanical.` },
      { title: 'Single-accent theming', text: `One colour variable drives the badge, top border, CTA, and flip links for instant rebranding.` },
    ],
    useCases: [
      { title: 'SaaS pricing pages', text: `Keep the pricing grid clean while letting buyers flip for the full feature breakdown — combine with a [pricing toggle](/ui-snippets/pricing-toggle/) for monthly/annual switching.` },
      { title: 'Plan comparison rows', text: `Render three flip cards side by side so each tier can reveal its own features without a tall, cluttered table; for a dense matrix use a [comparison table](/ui-snippets/comparison-table/) instead.` },
      { title: 'Product feature reveals', text: `Use the flip pattern beyond pricing — a product card whose back shows specs — alongside a standard [pricing card](/ui-snippets/pricing-card/) for the static version.` },
      { title: 'Membership and subscription tiers', text: `Present gym, course, or membership levels where the perks list is long and would otherwise dominate the card front.` },
      { title: 'Landing-page CTAs', text: `Drop a single flip card into a landing page as the focal offer, keeping the front minimal and the detail one click away.` },
      { title: 'Learning CSS 3D transforms', text: `A clean reference for perspective, preserve-3d, and backface-visibility — the same techniques behind a [3D flip card](/ui-snippets/3d-flip-card/).` },
      { icon: 'CODE', title: 'Related: Feature Comparison Matrix Table', desc: 'See the [Feature Comparison Matrix Table](/ui-snippets/feature-comparison-matrix-table/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Plan Comparison Slider — Drag to Reveal Basic vs Pro Features', desc: 'See the [Plan Comparison Slider — Drag to Reveal Basic vs Pro Features](/ui-snippets/plan-feature-drag-compare-slider/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Tiered Usage Pricing Breakdown', desc: 'See the [Tiered Usage Pricing Breakdown](/ui-snippets/pricing-usage-tier-breakdown/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Single-Plan Spotlight Pricing Card', desc: 'See the [Single-Plan Spotlight Pricing Card](/ui-snippets/pricing-single-plan-spotlight/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing Table with Live Feature Search', desc: 'See the [Pricing Table with Live Feature Search](/ui-snippets/pricing-feature-search-filter/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing Cards with Live Plan Popularity Counter', desc: 'See the [Pricing Cards with Live Plan Popularity Counter](/ui-snippets/pricing-plan-popularity-live-counter/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does my card show a mirrored or reversed back face?', a: `That happens when backface-visibility: hidden is missing or when the back face is not pre-rotated. Each .fpc-face needs backface-visibility: hidden (with the -webkit- prefix for Safari), and the back face must have transform: rotateY(180deg) so it faces forward only after the wrapper flips. Without both, you see a mirror image of the front bleeding through.` },
      { q: 'How do I flip on hover instead of on click?', a: `Add a CSS rule .fpc-card:hover .fpc-inner { transform: rotateY(180deg) } and remove or keep the buttons as you like. Wrap it in @media (hover: hover) so touch devices, which cannot hover, still use the button to flip. Hover flips work well on desktop but always keep a click/tap path for touch and keyboard users.` },
      { q: 'The flip looks flat with no depth — how do I fix it?', a: `Depth comes from the perspective property on the parent .fpc-card and transform-style: preserve-3d on .fpc-inner. If perspective is missing the rotation looks like a flat 2D mirror; if preserve-3d is missing the faces flatten into the same plane. Lower the perspective value (e.g. 900px) to exaggerate the depth, or raise it (e.g. 2000px) to flatten it.` },
      { q: 'Can the card be taller than 440px if my feature list is long?', a: `Yes — increase the height on .fpc-card. Because the faces use inset: 0 (absolute positioning filling the card), both faces resize together and stay aligned. For very long lists, set overflow-y: auto on .fpc-features so it scrolls within the fixed card height instead of overflowing the back face.` },
      { q: 'How do I use this flip card in React, Vue, or Angular?', a: `Store a boolean like flipped in state and bind it to the .flipped class — useState in React (className with a conditional), a ref in Vue (:class binding), or a property in Angular ([class.flipped]). The flip buttons call setFlipped(true/false) or toggle the property. All the CSS (perspective, preserve-3d, backface-visibility, the rotateY transform) ports unchanged; only the class toggle moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to puzzle out the 3D stacking order on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the back face needs its own rotateY(180deg) baked in at rest, on top of the wrapper's flip, and what specifically backface-visibility hidden is hiding when the flipped class is applied. The same assistant can help optimize it — ask whether the perspective value of 1400px is doing anything meaningful at this card's size, or whether the transition's cubic-bezier could be swapped for a spring-based easing without breaking the GPU-only transform animation. It's also a good way to extend the card: have it add a hover-triggered flip behind a prefers-reduced-motion check, wire the flip to a parent-controlled state so three pricing tiers flip in sync, or animate the price number counting up when the front face becomes visible again. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a pricing card that flips in real 3D to reveal a full feature list on its back face, in plain HTML, CSS, and JavaScript — no libraries, and the JavaScript may only toggle a single class.

Requirements:
- An outer fixed-size card element with CSS perspective set on it (not on its children), establishing the 3D viewing depth for everything inside.
- An inner wrapper inside the card with transform-style: preserve-3d and a transition on transform only, so its rotation can be GPU-accelerated with no layout or paint cost.
- Two full face elements (front and back) stacked with absolute positioning filling the wrapper. Both faces must have backface-visibility hidden. The front face sits at its natural 0-degree rotation; the back face must be pre-rotated to rotateY(180deg) at rest so it only becomes upright and visible once the wrapper itself is rotated 180 degrees.
- A single class on the outer card (e.g. "flipped") that, when present, rotates the inner wrapper to rotateY(180deg) — this one class toggle must be the only thing JavaScript does; all animation, depth, and face-hiding logic must live entirely in CSS.
- The front face must show a plan name, a "most popular" style badge, a large price with a smaller currency symbol and billing period, a short tagline, and a call-to-action button, plus a button that adds the flip class. The back face must show a scrollable or fixed list of at least five features each with a checkmark icon, the same call-to-action button, and a button that removes the flip class.
- Use an easing curve on the transform transition that gives the rotation a slight ease-in and a soft settle rather than linear motion, and keep the total flip duration in the 0.6-0.8 second range.`,
    },
  },
};

export default flipPricingCard;
