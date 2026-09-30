const cursorSpotlightReveal = {
  id: 'cursor-spotlight-reveal',
  title: 'Cursor Spotlight Reveal',
  lastmod: '2026-08-23',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="csr-panel" id="csrPanel">
  <div class="csr-dim">
    <h2>The full story is here</h2>
    <p>Move your cursor across this panel — everything beneath the spotlight becomes clear while the rest stays hidden in the dark. Try tracing the edges slowly.</p>
    <p class="csr-secret">Hidden line: the launch date is March 4th.</p>
  </div>
  <div class="csr-lit" id="csrLit">
    <h2>The full story is here</h2>
    <p>Move your cursor across this panel — everything beneath the spotlight becomes clear while the rest stays hidden in the dark. Try tracing the edges slowly.</p>
    <p class="csr-secret">Hidden line: the launch date is March 4th.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050608;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:22px}

.csr-panel{position:relative;width:100%;max-width:620px;min-height:280px;border-radius:18px;overflow:hidden;background:#0a0c12;border:1px solid #1a1e29;cursor:none}
.csr-dim,.csr-lit{position:absolute;inset:0;padding:34px;display:flex;flex-direction:column;justify-content:center;gap:14px}
.csr-dim{color:#262b38}
.csr-dim h2{font-size:24px;letter-spacing:-.01em}
.csr-dim p{font-size:14.5px;line-height:1.6}
.csr-secret{font-weight:700;color:#333}

.csr-lit{color:#f5f3ff}
.csr-lit h2{font-size:24px;letter-spacing:-.01em;background:linear-gradient(120deg,#c4b5fd,#f0abfc);-webkit-background-clip:text;background-clip:text;color:transparent}
.csr-lit p{font-size:14.5px;line-height:1.6;color:#d8d3ee}
.csr-secret{font-weight:700}
.csr-lit .csr-secret{color:#f0abfc}

/* The spotlight mask: a radial-gradient sized to a fixed spotlight radius,
   positioned via CSS custom properties updated on every mousemove — only
   the area within the gradient's opaque stop is visible. */
.csr-lit{
  -webkit-mask-image: radial-gradient(circle 120px at var(--csr-x, -200px) var(--csr-y, -200px), #000 55%, transparent 100%);
  mask-image: radial-gradient(circle 120px at var(--csr-x, -200px) var(--csr-y, -200px), #000 55%, transparent 100%);
  transition: -webkit-mask-image .02s linear;
}`,

  js: `var panel = document.getElementById('csrPanel');
var lit = document.getElementById('csrLit');

// Real mousemove tracking drives the mask's center position via CSS custom
// properties — the spotlight literally follows wherever the cursor is, it
// is not a canned hover-state animation.
function moveSpotlight(clientX, clientY) {
  var rect = panel.getBoundingClientRect();
  var x = clientX - rect.left;
  var y = clientY - rect.top;
  panel.style.setProperty('--csr-x', x + 'px');
  panel.style.setProperty('--csr-y', y + 'px');
}

panel.addEventListener('mousemove', function (e) {
  moveSpotlight(e.clientX, e.clientY);
});

panel.addEventListener('mouseleave', function () {
  panel.style.setProperty('--csr-x', '-200px');
  panel.style.setProperty('--csr-y', '-200px');
});

// Touch support: the spotlight follows a finger dragging across the panel.
panel.addEventListener('touchmove', function (e) {
  var t = e.touches[0];
  moveSpotlight(t.clientX, t.clientY);
}, { passive: true });
panel.addEventListener('touchend', function () {
  panel.style.setProperty('--csr-x', '-200px');
  panel.style.setProperty('--csr-y', '-200px');
});`,

  seo: {
    title: 'Cursor Spotlight Reveal — Free CSS Mask Follow-the-Cursor Snippet',
    description: `A dark panel whose bright content is only visible inside a circular spotlight mask that tracks the real cursor position via CSS mask-image and mousemove. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Cursor Spotlight Reveal — A CSS Mask That Follows the Cursor',
      description: `Two identical copies of the same content are stacked — one dim and always visible, one bright and hidden behind a circular CSS mask — so that only the area directly under the cursor reveals the vivid version underneath, like a flashlight sweeping a dark room. This snippet uses \`mask-image: radial-gradient(...)\` positioned by real \`mousemove\` coordinates, not a static hover effect.

**Two stacked layers, one masked**

The panel contains a \`.csr-dim\` layer (muted colors, always fully visible) and an identical \`.csr-lit\` layer (vivid colors, gradient text) positioned exactly on top of it with \`position: absolute; inset: 0\`. Because the content is duplicated rather than toggled, there is no flash or reflow when the mask moves — the bright version is always rendered, just clipped to a small circle by the mask.

**The mask is a positioned radial-gradient**

\`mask-image: radial-gradient(circle 120px at var(--csr-x) var(--csr-y), #000 55%, transparent 100%)\` draws a circle whose center comes from two CSS custom properties. A \`radial-gradient\` used as a mask makes its opaque stops (black, by mask convention) show the masked element and its transparent stops hide it — so the \`#000 55%, transparent 100%\` stop pair creates a solid spotlight core that feathers to nothing at its edge, rather than a hard-edged circle.

**Real mousemove drives the mask, not a hover state**

Every \`mousemove\` over the panel computes the cursor's position relative to the panel with \`getBoundingClientRect()\` and writes it straight into \`--csr-x\`/\`--csr-y\` via \`style.setProperty\`. Because the mask's \`at\` position references those same custom properties, the browser recomputes the gradient's center on every event — the spotlight is following the literal cursor coordinate every frame, not playing a fixed animation triggered by a hover class.

**Leaving and touch**

\`mouseleave\` resets the custom properties to an off-panel coordinate, so the spotlight disappears cleanly rather than freezing at its last position. A parallel \`touchmove\`/\`touchend\` pair gives the same behavior for a finger dragging across the panel on touch devices, since there is no persistent hover state to fall back on there.

**Customizing it**

Change the spotlight radius (both the \`circle 120px\` in CSS and nothing else needs to change, since JS only ever sets the center), swap the feather stop percentages for a harder or softer edge, or reveal an image instead of text. Pair it with a [custom cursor](/ui-snippets/custom-cursor/) for a themed pointer, or [cursor text](/ui-snippets/cursor-text/) for a cursor-following label alongside the spotlight.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `A dark panel renders with dim, barely-legible text.` },
      { title: `Move the cursor over the panel`, text: `A circular spotlight reveals vivid text wherever it goes.` },
      { title: `Move the cursor away`, text: `The spotlight fades off-panel and the text dims again.` },
      { title: `Drag a finger on touch`, text: `The same spotlight follows a finger instead of a mouse.` },
      { title: `Resize the spotlight`, text: `Change the circle radius in the mask-image gradient.` },
      { title: `Swap the content`, text: `Replace the duplicated text with any bright/dim pair.` },
    ] },
    features: [
      { title: `Real cursor tracking`, text: `mousemove coordinates drive the mask center directly.` },
      { title: `CSS custom property mask`, text: `--csr-x/--csr-y feed a positioned radial-gradient.` },
      { title: `Feathered spotlight edge`, text: `Gradient stops soften the circle's boundary.` },
      { title: `No flash on move`, text: `Both layers always render; only the mask clips.` },
      { title: `Clean mouseleave reset`, text: `The spotlight retreats off-panel, not frozen in place.` },
      { title: `Touch-drag support`, text: `touchmove drives the same mask on mobile.` },
      { title: `Pure CSS mask`, text: `No canvas, no image cutouts.` },
      { title: `Easily resizable`, text: `One circle radius value controls spotlight size.` },
    ],
    useCases: [
      { title: `Landing page reveals`, text: `Hide a headline or offer behind a playful spotlight.` },
      { title: `Interactive storytelling`, text: `Reveal hidden details as visitors explore a panel.` },
      { title: `Product teaser sections`, text: `Tease a feature list that only appears on hover.` },
      { title: `Portfolio hero sections`, text: `Pair with a [custom cursor](/ui-snippets/custom-cursor/) theme.` },
      { title: `Dark-mode dashboards`, text: `Highlight the exact area a user is pointing at.` },
      { title: `Learning CSS masking`, text: `A reference for mousemove-driven mask-image.` },
      { icon: 'CODE', title: 'Related: Flip Countdown', desc: 'See the [Flip Countdown](/ui-snippets/flip-countdown/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does the spotlight actually follow the cursor?`, a: `A mousemove listener on the panel computes the cursor's position relative to the panel using getBoundingClientRect(), then writes that x and y straight into two CSS custom properties via style.setProperty. The mask-image's radial-gradient references those same custom properties as its center point, so the browser recomputes the gradient's position on every mousemove event — the mask genuinely tracks the live cursor coordinate rather than playing a fixed hover animation.` },
      { q: `Why are there two copies of the same content?`, a: `A dim, always-visible layer sits behind an identical bright layer that has the CSS mask applied. Because both layers render continuously and only the top layer is clipped by the mask, moving the spotlight never causes a flash, reflow, or content swap — it simply reveals more or less of the already-rendered bright layer beneath the mask's opaque area.` },
      { q: `What do the radial-gradient's stop percentages control?`, a: `mask-image: radial-gradient(circle 120px at X Y, #000 55%, transparent 100%) draws a circle 120px in radius; opaque (black) up to 55% of that radius, then fading to fully transparent by 100%. Since mask opacity follows the gradient's own alpha/lightness, that stop pair produces a solid spotlight core with a soft feathered edge rather than a hard-edged circle. Moving the 55% stop closer to 100% sharpens the edge; moving it toward 0% softens it further.` },
      { q: `Does this work on touch devices without a persistent cursor?`, a: `Yes — a parallel touchmove listener reads the first active touch point and writes the same custom properties the mouse handler does, so dragging a finger across the panel moves the spotlight identically. A touchend handler resets the mask off-panel, mirroring the mouseleave behavior, since touch has no hover state to fall back on.` },
      { q: `How do I use this cursor spotlight reveal in React, Vue, or Angular?`, a: `Attach the mousemove/mouseleave (and touchmove/touchend) listeners to the panel's ref in a mount effect, and set the CSS custom properties directly via ref.current.style.setProperty rather than through component state, since updating on every mousemove through state would cause excessive re-renders. Clean up the listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the mask-image gradient syntax from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how a radial-gradient used as a mask-image treats its opaque stops as "show this content" and its transparent stops as "hide this content," and why writing the cursor position into CSS custom properties on every mousemove — rather than updating inline style.background directly — is a clean way to keep the gradient definition in CSS while still driving its position from JavaScript. The same assistant can help optimize it, for instance asking whether setting custom properties on every single mousemove event could be throttled with requestAnimationFrame for very high-frequency pointer input without making the spotlight feel laggy. It's also useful for extending the effect: ask it to add a soft trailing glow that lags slightly behind the spotlight's exact position, make the spotlight radius pulse subtly, or reveal an image gallery instead of text underneath the mask. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "cursor spotlight reveal" panel in plain HTML, CSS, and JavaScript using a CSS mask-image that tracks the real cursor position — no canvas, no image-based cutouts.

Requirements:
- Two absolutely-positioned, fully-overlapping layers with identical content inside a relatively-positioned panel: a "dim" layer using muted/low-contrast colors that is always fully visible, and a "lit" layer using vivid colors that has a CSS mask-image applied to it.
- The lit layer's mask-image must be a radial-gradient shaped like circle <radius>px at var(--x) var(--y), with an opaque stop (e.g. #000) covering most of the circle's radius and fading to transparent at the outer edge, so the revealed area has a soft feathered edge rather than a hard circular cutoff. Reference two CSS custom properties for the gradient's center position rather than hardcoded coordinates.
- On mousemove over the panel, compute the cursor's position relative to the panel using the panel's getBoundingClientRect() (not raw viewport coordinates, since the panel may not be at the top-left of the page), and write that x/y directly into the two CSS custom properties via element.style.setProperty so the mask-image's center genuinely updates in real time as the cursor moves — this must be driven by the actual mousemove coordinate stream, not a fixed hover-triggered CSS transition or animation.
- On mouseleave, reset the custom properties to a position far outside the panel's bounds so the spotlight visibly retreats off the visible area rather than freezing at its last position.
- Add equivalent touchmove and touchend handlers using the first entry in event.touches so the same spotlight effect works by dragging a finger across the panel on a touch device, since touch has no persistent hover state.
- Ensure moving the mask never causes any visible flash, layout shift, or content re-render — only the mask's gradient position should change from frame to frame.`,
    },
  },
};

export default cursorSpotlightReveal;
