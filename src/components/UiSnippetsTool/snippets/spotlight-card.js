const spotlightCard = {
  id: 'spotlight-card',
  title: 'Spotlight Hover Card',
  lastmod: '2026-06-22',
  category: 'cards',
  html: `<div class="spc-grid" id="spcGrid">
  <article class="spc-card">
    <div class="spc-glow"></div>
    <div class="spc-body">
      <span class="spc-ico">⚡</span>
      <h3>Lightning fast</h3>
      <p>Edge-deployed and globally cached, so every request resolves in milliseconds.</p>
    </div>
  </article>
  <article class="spc-card">
    <div class="spc-glow"></div>
    <div class="spc-body">
      <span class="spc-ico">🔒</span>
      <h3>Secure by default</h3>
      <p>End-to-end encryption and automatic security patches keep your data protected.</p>
    </div>
  </article>
  <article class="spc-card">
    <div class="spc-glow"></div>
    <div class="spc-body">
      <span class="spc-ico">📈</span>
      <h3>Scales with you</h3>
      <p>From first user to ten million — no re-architecting, no surprise downtime.</p>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 24px}

.spc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:760px;width:100%}

.spc-card{position:relative;border-radius:16px;padding:1px;background:#1e293b;overflow:hidden;isolation:isolate}
/* The glow is a radial gradient positioned at the cursor via CSS variables. */
.spc-glow{position:absolute;inset:0;border-radius:16px;opacity:0;transition:opacity .3s;
  background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(129,140,248,.5),transparent 65%);z-index:-1}
.spc-card:hover .spc-glow{opacity:1}
/* A second, sharper glow forms the illuminated border. */
.spc-card::before{content:'';position:absolute;inset:0;border-radius:16px;padding:1px;opacity:0;transition:opacity .3s;
  background:radial-gradient(180px circle at var(--mx,50%) var(--my,50%),rgba(165,180,252,.8),transparent 60%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;z-index:1;pointer-events:none}
.spc-card:hover::before{opacity:1}

.spc-body{position:relative;background:#0f172a;border-radius:15px;padding:22px;height:100%;z-index:0}
.spc-ico{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:11px;background:#1e293b;font-size:20px;margin-bottom:14px}
.spc-card h3{font-size:15.5px;font-weight:800;color:#f1f5f9;margin-bottom:7px}
.spc-card p{font-size:13px;color:#94a3b8;line-height:1.55}`,

  js: `var grid = document.getElementById('spcGrid');
var cards = Array.prototype.slice.call(grid.querySelectorAll('.spc-card'));

// Update each card's --mx/--my custom properties to the cursor position so the
// radial-gradient glow follows the pointer. Coordinates are relative to the card.
grid.addEventListener('pointermove', function (e) {
  cards.forEach(function (card) {
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});`,

  seo: {
    title: 'Spotlight Hover Card — Cursor Glow HTML CSS JS',
    description: `Cards with a radial spotlight glow that follows the cursor on hover, plus an illuminated border, using CSS variables. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Spotlight Hover Card — Cursor-Following Radial Glow with Illuminated Border',
      description: `The spotlight card — a dark card that lights up with a soft radial glow tracking your cursor, its border illuminating where the light falls — is one of the most-requested modern UI effects, popularized by sites like Aceternity and Vercel. It looks expensive but is built from a radial gradient and two CSS custom properties. This snippet recreates it in plain HTML, CSS, and vanilla JavaScript, across a responsive grid of cards.

**The glow is a gradient positioned by CSS variables**

The core trick is simple: each card has a \`background: radial-gradient(... at var(--mx) var(--my) ...)\`, and a tiny \`pointermove\` listener updates those \`--mx\` / \`--my\` variables to the cursor's position relative to the card. Because the gradient's center is bound to the variables, the glow follows the pointer with no per-frame canvas drawing or heavy JavaScript — the browser repaints the gradient natively. This is the whole effect in one idea: move the gradient's origin to wherever the mouse is.

**An illuminated border, not just a fill**

The polished version of this effect lights up the card's *edge* where the cursor is near, like light catching a rim. That's done with a second radial gradient on a \`::before\` pseudo-element, clipped to just a 1px border using the CSS mask trick: two stacked masks (\`content-box\` and full) composited with \`xor\` / \`exclude\` punch out the interior, leaving only the border painted by the gradient. The result is a glowing border segment that brightens nearest the cursor — the detail that separates a flat hover tint from the premium spotlight look.

**One listener drives every card**

A single \`pointermove\` listener on the grid updates all cards at once, each computing its own cursor-relative coordinates from its \`getBoundingClientRect()\`. This means as the cursor sweeps across the grid, every card's glow tracks correctly, and the card directly under the pointer lights up most while neighbors catch a softer edge — exactly the multi-card spotlight behavior. Using \`pointermove\` (rather than \`mousemove\`) also covers pen and touch input on devices that support hover.

**Hover-gated for performance and correctness**

The glow and border are at \`opacity: 0\` by default and fade in only on \`:hover\`, so cards sit calm until you interact, and the gradient repaint cost is only paid for hovered cards. On touch-only devices with no hover, the cards simply render as clean static cards — graceful degradation with no broken state, since the effect is a pure enhancement.

**Layering done right**

Getting the stack order correct is the fiddly part: the glow sits behind the content (\`z-index: -1\`), the inner body has its own solid background so the glow only shows at the padded edge (creating the gradient-border illusion), and the illuminated \`::before\` border sits above with \`pointer-events: none\` so it never intercepts clicks. This snippet wires that layering so you can drop in your own card content without fighting the effect.

**Why CSS variables over canvas**

You could draw this with canvas or WebGL, but binding a gradient to CSS custom properties is dramatically simpler, fully responsive, accessible (the content is real DOM, not pixels), and costs almost nothing — the browser's compositor handles the gradient. It also re-themes trivially: change the glow colors and radius and it fits any palette.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grid of three dark feature cards renders. Move your cursor over them to see the spotlight effect.` },
      { title: 'Hover a card', text: `A soft radial glow appears under your cursor and the card's border illuminates where the light falls.` },
      { title: 'Sweep across the grid', text: `Move between cards — each one's glow tracks the cursor, with the hovered card lighting up most.` },
      { title: 'Add your own cards', text: `Duplicate a .spc-card block with your icon, title, and text — the effect applies automatically.` },
      { title: 'Recolor the glow', text: `Change the rgba colors and the circle radius in the radial-gradient rules to match your brand.` },
      { title: 'Use on a real section', text: `Drop the grid into a features or pricing section on a dark background for a premium hover feel.` },
    ] },
    features: [
      { title: 'Cursor-following radial glow', text: `A radial gradient bound to --mx/--my CSS variables tracks the pointer with no canvas or per-frame drawing.` },
      { title: 'Illuminated border effect', text: `A masked ::before gradient lights up just the 1px edge nearest the cursor for the premium spotlight look.` },
      { title: 'Single listener for all cards', text: `One pointermove handler updates every card's coordinates, so the whole grid responds at once.` },
      { title: 'Hover-gated rendering', text: `Glow and border fade in only on hover, so cards stay calm and the repaint cost is paid only when needed.` },
      { title: 'Graceful touch degradation', text: `On hover-less devices the cards render as clean static cards — the effect is a pure enhancement.` },
      { title: 'Correct layering', text: `Glow behind content, solid inner body for the gradient-border illusion, and a click-through border overlay.` },
      { title: 'Responsive auto-fit grid', text: `The cards reflow with auto-fit/minmax so the layout adapts from one to several columns.` },
      { title: 'Easily re-themeable', text: `Change two gradient colors and a radius to fit any palette — no canvas or shader code to edit.` },
    ],
    useCases: [
      { title: 'Feature and benefit sections', text: `Make a dark feature grid feel premium and interactive — pair with a [stat comparison card](/ui-snippets/stat-comparison-card/) for metrics.` },
      { title: 'Pricing cards on dark themes', text: `Add a spotlight to plan cards alongside a [radio card group](/ui-snippets/radio-card-group/) for selection.` },
      { title: 'Portfolio and project tiles', text: `Highlight work samples with a cursor-tracking glow on hover.` },
      { title: 'SaaS and landing-page hero grids', text: `Give a modern, high-end feel to a marketing page's capability cards.` },
      { title: 'Dashboard widget cards', text: `Subtle spotlight on interactive widgets signals they respond to the cursor.` },
      { title: 'Learning CSS-variable interactions', text: `A reference for cursor-bound gradients and the mask-border trick — compare with a [3D card tilt](/ui-snippets/3d-card-tilt/) for a perspective hover effect.` },
    ],
    faqs: [
      { q: 'How does the glow follow the cursor without heavy JavaScript?', a: `The card's background is a radial-gradient whose center is set to var(--mx) var(--my). A single pointermove listener updates those CSS custom properties to the cursor's position relative to each card (from getBoundingClientRect). Because the gradient origin is bound to the variables, the browser repaints the glow natively as they change — no canvas, no requestAnimationFrame loop, just two variable writes per move.` },
      { q: 'How is the illuminated border created?', a: `A ::before pseudo-element holds a second radial gradient, and a CSS mask clips it to only the 1px border: stacking a content-box mask and a full mask and compositing them with xor (mask-composite: exclude) punches out the interior, leaving just the border painted. The gradient then brightens the border segment nearest the cursor, creating the rim-light effect.` },
      { q: 'Does it work on touch devices?', a: `Touch devices generally have no hover, so the glow doesn't activate — the cards render as clean static cards, which is correct since the spotlight is a hover enhancement, not core content. pointermove also covers pen/stylus and any device that does report hover. No broken state results on touch-only screens.` },
      { q: 'How do I change the glow color and size?', a: `Edit the rgba() colors and the circle radius in the two radial-gradient declarations (the .spc-glow fill and the ::before border). A larger radius spreads the light further; brighter/more-opaque colors intensify it. Keep the inner .spc-body background solid so the fill glow only shows at the padded edge as a gradient border.` },
      { q: 'How do I use this spotlight card in React, Vue, or Angular?', a: `In React, attach an onPointerMove handler that sets the --mx/--my style on each card (via refs or by setting them on a container and reading per-card offsets); in Vue, use @pointermove with style bindings; in Angular, use (pointermove) with Renderer2.setStyle. The CSS does all the visual work — only the variable-updating listener moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the mask-composite border trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the two stacked masks on the ::before pseudo-element combine with exclude to leave only a 1px illuminated border, or why binding the radial gradient's center to CSS custom properties avoids any canvas drawing or per-frame JavaScript work. The same assistant can help optimize it, for example checking whether updating every card's --mx and --my on a single grid-level pointermove listener (rather than one listener per card) actually reduces overhead at scale. It's also useful for extending the feature: ask it to make the glow color vary per card based on a data attribute, add a subtle scale-up on hover alongside the glow, or make the effect respond to touch by tracking the last tap position instead of doing nothing on touch-only devices. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of dark cards with a cursor-following spotlight glow and an illuminated border in plain HTML, CSS, and JavaScript, no canvas, no libraries.

Requirements:
- A responsive grid of at least three cards, each with an icon, heading, and description, laid out with CSS grid auto-fit and minmax so the column count adapts to available width.
- Each card's glow must be a radial-gradient background whose center coordinates are CSS custom properties (for example --mx and --my), not hardcoded percentages, and the glow must be hidden (opacity 0) until the card is hovered, fading in with a CSS transition.
- Add a second, tighter radial gradient on a pseudo-element that is clipped to only the card's 1px border using the CSS mask technique: layer a content-box mask and a full-area mask and composite them with exclude (or xor) so only the border ring remains visible, and bind this gradient's center to the same custom properties as the surface glow so both track the cursor together.
- Attach a single pointermove listener on the grid container (not one per card) that, for every card, computes the cursor's position relative to that specific card via getBoundingClientRect and writes it into that card's --mx and --my custom properties.
- Ensure the glow pseudo-element sits behind the card's actual content (icon, heading, text) using z-index and that the border pseudo-element does not intercept clicks (pointer-events: none), so the card's content remains fully interactive.
- On devices with no hover capability, the cards must render as plain static cards with no broken or stuck glow state — do not attempt to simulate the effect via touch events.`,
    },
  },
};

export default spotlightCard;
