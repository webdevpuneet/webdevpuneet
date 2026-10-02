const wobbleCard = {
  id: 'wobble-card',
  title: 'Wobble Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="wo-stage">
  <article class="wo-card" id="woCard">
    <div class="wo-inner" id="woInner">
      <span class="wo-tag">Realtime</span>
      <h3>Push, don't poll</h3>
      <p>Drag your pointer across the card — it squishes and follows like soft jelly, then springs back.</p>
      <div class="wo-orb" aria-hidden="true"></div>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a16;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.wo-stage{perspective:1200px}
.wo-card{position:relative;width:340px;height:260px;border-radius:22px;background:linear-gradient(135deg,#4f46e5,#9333ea);overflow:hidden;cursor:grab;transform-style:preserve-3d;transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.wo-card:active{cursor:grabbing}

.wo-inner{position:relative;z-index:1;height:100%;padding:26px;display:flex;flex-direction:column;transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.wo-tag{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:rgba(255,255,255,.16);padding:5px 11px;border-radius:999px}
.wo-inner h3{margin-top:auto;font-size:26px;font-weight:900;letter-spacing:-.02em}
.wo-inner p{font-size:13.5px;color:rgba(255,255,255,.85);line-height:1.55;margin-top:8px;max-width:80%}

.wo-orb{position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.5),transparent 60%);filter:blur(6px)}
.wo-card::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:18px 18px;opacity:.5;pointer-events:none}`,

  js: `var card = document.getElementById('woCard');
var inner = document.getElementById('woInner');
var hovering = false;

card.addEventListener('pointerenter', function () { hovering = true; });

card.addEventListener('pointermove', function (e) {
  if (!hovering) return;
  var r = card.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
  var py = (e.clientY - r.top) / r.height - 0.5;

  // The shell tilts + translates toward the pointer (the "wobble"); the inner
  // content lags in the opposite direction for a soft parallax squish.
  card.style.transform =
    'translate3d(' + (px * 18) + 'px,' + (py * 18) + 'px,0) ' +
    'rotateX(' + (-py * 12) + 'deg) rotateY(' + (px * 12) + 'deg)';
  inner.style.transform = 'translate3d(' + (-px * 22) + 'px,' + (-py * 22) + 'px,0)';
});

function reset() {
  hovering = false;
  card.style.transform = 'translate3d(0,0,0) rotateX(0) rotateY(0)';
  inner.style.transform = 'translate3d(0,0,0)';
}
card.addEventListener('pointerleave', reset);`,

  seo: {
    title: 'Wobble Card — Free HTML CSS JS Jelly Hover Snippet',
    description: `A card that squishes and follows your pointer like soft jelly with counter-parallax content, then springs back on a spring easing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Wobble Card — Jelly Pointer-Follow with Counter-Parallax',
      description: `The wobble card is the playful hover effect where a card squishes and leans toward your pointer like a block of soft jelly, while its contents drift the opposite way for a gooey parallax — then everything springs back when you leave. This snippet builds it with plain HTML, CSS, and one vanilla JavaScript pointer handler, relying on a spring-like easing curve for the bouncy feel.

**Two layers moving in opposition**

The effect's secret is that the shell and the content move in opposite directions. A \`pointermove\` handler converts the cursor position to -0.5…0.5 fractions, then translates and tilts the outer \`.wo-card\` toward the pointer (\`translate3d\` plus \`rotateX\`/\`rotateY\`), while translating the inner \`.wo-inner\` by a larger amount in the negative direction. Because the content slides against the card's lean, the surface appears to stretch and the text appears to resist — the visual signature of squishy, deformable material rather than a rigid tilt.

**The spring easing**

Both layers transition with \`cubic-bezier(.2, .8, .2, 1)\`, an ease-out curve that overshoots slightly and settles — the closest you get to a spring without a physics library. During movement the short \`.2s\` transition keeps the card chasing the pointer with a soft lag, and on release the same curve makes it bounce back to rest rather than snapping linearly. This single easing choice is what makes it feel like jelly instead of glass.

**Perspective and preserve-3d**

The stage sets \`perspective: 1200px\` and the card uses \`transform-style: preserve-3d\`, so the \`rotateX\`/\`rotateY\` produce genuine depth and the content's counter-translation reads as parallax within the card rather than a flat slide. Without the perspective parent, the rotation would look like a 2D skew.

**A hovering guard**

The handler only wobbles while a \`hovering\` flag is true, set on \`pointerenter\` and cleared in \`reset()\` on \`pointerleave\`. This prevents stray moves (for example, during the spring-back transition) from re-triggering the wobble, so the return-to-rest animation always completes cleanly.

**Decorative depth cues**

A blurred white \`.wo-orb\` in the corner and a faint dotted texture (\`::after\` radial-gradient tiled at 18px) give the surface something to deform, so the parallax is visible. These sit at different effective depths from the text, reinforcing the soft-3D illusion as the card moves. The \`cursor: grab\`/\`grabbing\` states hint that the card is something you can push around.

**Customizing it**

Tune the \`18\`/\`12\`/\`22\` multipliers to control how far the shell leans, how much it tilts, and how strongly the content counter-moves — increasing the gap between the shell and inner factors makes the squish more pronounced. Adjust the cubic-bezier for a stiffer or bouncier spring, and recolor the gradient. Pair it with a [glare card](/ui-snippets/glare-card/) or a [pin card](/ui-snippets/pin-card/) for a set of tactile cards, or use it as an interactive [feature cards](/ui-snippets/feature-cards/) tile.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A gradient card renders at rest.` },
      { title: 'Drag your pointer across it', text: `The card squishes and leans toward the cursor.` },
      { title: 'Watch the content', text: `The text drifts the opposite way like soft parallax.` },
      { title: 'Leave the card', text: `Everything springs back on a bouncy easing.` },
      { title: 'Adjust the squish', text: `Change the shell and inner translate multipliers.` },
      { title: 'Tune the spring', text: `Edit the cubic-bezier for stiffer or bouncier motion.` },
    ] },
    features: [
      { title: 'Opposing-layer squish', text: `Shell and content move opposite for jelly feel.` },
      { title: 'Spring easing', text: `An overshooting cubic-bezier bounces back.` },
      { title: 'Real 3D parallax', text: `perspective + preserve-3d give true depth.` },
      { title: 'Pointer-follow lag', text: `A short transition softly chases the cursor.` },
      { title: 'Hover guard', text: `A flag keeps the spring-back clean.` },
      { title: 'Depth texture', text: `A dotted pattern and orb reveal the deform.` },
      { title: 'Grab cursor cues', text: `grab/grabbing hint at pushability.` },
      { title: 'Single handler', text: `One pointermove drives both layers.` },
    ],
    useCases: [
      { title: 'Playful feature tiles', text: 'Liven up a [feature cards](/ui-snippets/feature-cards/) grid with tiles that squish toward the pointer like jelly while contents drift the opposite way.' },
      { title: 'Product highlights', text: 'Pair with a [glare card](/ui-snippets/glare-card/) showcase, using perspective and `preserve-3d` for genuine depth in the wobble.' },
      { title: 'Bento grid cells', text: 'Add a tactile cell inside a [bento grid](/ui-snippets/bento-grid/), springing back with an overshooting cubic-bezier when the pointer leaves.' },
      { title: 'Landing call to action wrappers', text: 'Wrap a [shimmer button](/ui-snippets/shimmer-button/) in a landing page card that responds softly to the pointer as visitors approach.' },
      { title: 'Portfolio and hover-physics demos', text: 'Make project tiles feel interactive, with a short transition making the card softly chase the cursor.' },
    ],
    faqs: [
      { q: 'What makes the card feel like jelly instead of glass?', a: `Two things: the shell and the inner content translate in opposite directions on pointer move, so the surface appears to stretch and the text resists, and both layers use a spring-like cubic-bezier(.2,.8,.2,1) that overshoots and settles. The opposing motion plus the bouncy easing read as soft, deformable material rather than a rigid tilt.` },
      { q: 'How is the counter-parallax achieved?', a: `The pointermove handler leans the outer card toward the cursor while translating the inner content by a larger amount in the negative direction. Inside the perspective and preserve-3d context, the content's opposite slide reads as parallax depth within the card, which is what sells the squish.` },
      { q: 'Why is there a hovering flag?', a: `It ensures only deliberate hovers wobble the card. The flag is set on pointerenter and cleared on pointerleave inside reset(), so stray pointer moves — for instance during the spring-back transition — don't re-trigger the effect and interrupt the return-to-rest animation.` },
      { q: 'Do I need a physics library for the spring?', a: `No. The bounce comes entirely from the CSS cubic-bezier(.2,.8,.2,1) transition, an ease-out curve that slightly overshoots before settling. It approximates a spring closely enough for hover feedback without the cost or complexity of a real physics engine.` },
      { q: 'How do I use this wobble card in React, Vue, or Angular?', a: `Render the card and inner content as a component, keep the perspective and preserve-3d CSS, and attach pointerenter, pointermove, and pointerleave handlers that write transforms via refs so they don't trigger re-renders. Keep the hovering flag in a ref. In Tailwind, use perspective and transform utilities with a custom spring easing defined via arbitrary transition-timing-function values.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain why the shell and the inner content translate in opposite directions on pointermove — walk through the px/py fractions and the opposite-sign multipliers together to see exactly why that counter-motion is what reads as squishy jelly rather than a rigid tilt. It's worth asking about the hovering guard flag too: trace what would go wrong during the spring-back transition if pointermove events weren't gated behind it. For extending the card, ask for a version that also scales slightly larger on hover for added depth, multiple wobble cards in a grid where only the hovered one responds, or a touch-compatible fallback using device orientation instead of pointer position on mobile. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "jelly" hover card in plain HTML, CSS, and JavaScript that squishes and leans toward the cursor with counter-parallax content — using CSS 3D transforms and a single pointermove handler, no physics library.

Requirements:
- A stage element with CSS perspective set, containing a card with transform-style: preserve-3d, so 3D rotations applied to the card produce genuine depth rather than a flat 2D skew.
- On pointermove over the card, convert the cursor's position into fractions from -0.5 to 0.5 across the card's width and height using its bounding rect.
- Apply a combined translate3d and rotateX/rotateY transform to the outer card that leans and shifts toward the cursor based on those fractions, while applying an independent transform to an inner content wrapper that moves by a larger amount in the opposite direction — the outer shell and inner content must visibly move counter to each other, not together.
- Give both the outer and inner transforms a short CSS transition using an ease-out cubic-bezier curve that slightly overshoots before settling, so the motion reads as a soft spring rather than a linear tween, both while tracking the cursor and when resetting on pointer leave.
- Track a boolean hovering flag set on pointerenter and cleared in a reset function on pointerleave, and gate the pointermove handler's transform updates behind that flag so stray movement during the spring-back transition can never re-trigger or interrupt the reset.
- Add at least one decorative depth cue inside the card (such as a blurred glowing orb or a subtle dot-grid texture) so the parallax squish between the shell and the content is visually apparent as the pointer moves, not just theoretical.`,
    },
  },
};

export default wobbleCard;
