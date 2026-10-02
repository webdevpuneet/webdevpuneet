const gsapDraggableInertia = {
  id: 'gsap-draggable-inertia',
  title: 'GSAP Draggable Inertia',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/InertiaPlugin.min.js',
  ],
  html: `<div class="di-wrap">
  <div class="di-stage" id="diStage">
    <div class="di-token" id="diToken">Drag me</div>
  </div>
  <p class="di-hint">Flick the token — it keeps moving with momentum, then eases to a stop inside the bounds.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c14;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.di-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(560px,94vw)}
.di-stage{position:relative;width:100%;aspect-ratio:16/10;border-radius:20px;background:radial-gradient(120% 100% at 30% 0%,#1a1440,#0a0c14 70%);border:1px solid rgba(255,255,255,.1);overflow:hidden}
.di-stage::before{content:'';position:absolute;inset:14px;border:1px dashed rgba(129,140,248,.25);border-radius:14px;pointer-events:none}
.di-token{position:absolute;top:20px;left:20px;width:96px;height:96px;border-radius:20px;background:linear-gradient(160deg,#818cf8,#4c1d95);display:flex;align-items:center;justify-content:center;font:700 13px system-ui;color:#fff;cursor:grab;box-shadow:0 12px 30px rgba(76,29,149,.5);user-select:none;touch-action:none}
.di-token:active{cursor:grabbing}
.di-hint{color:#7d84a0;font-size:13px;text-align:center;max-width:440px}`,

  js: `gsap.registerPlugin(Draggable, InertiaPlugin);

// The token is draggable within the stage bounds and keeps moving on release,
// decelerating naturally instead of stopping dead where the pointer let go.
Draggable.create('#diToken', {
  type: 'x,y',
  bounds: '#diStage',
  edgeResistance: 0.65,
  inertia: true,
  onDragStart: function () {
    gsap.to(this.target, { scale: 1.06, boxShadow: '0 18px 40px rgba(76,29,149,.65)', duration: 0.2 });
  },
  onDragEnd: function () {
    gsap.to(this.target, { scale: 1, boxShadow: '0 12px 30px rgba(76,29,149,.5)', duration: 0.3 });
  }
});`,

  seo: {
    title: 'GSAP Draggable Inertia — Free Momentum Drag & Snap Snippet',
    description: `A draggable token that flings with real momentum and eases to a stop inside its bounds, built with GSAP's Draggable and InertiaPlugin. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP Draggable Inertia — Flick-and-Coast Dragging With Bounded Momentum',
      description: `The GSAP Draggable Inertia snippet is the difference between a drag interaction that feels mechanical and one that feels physical — release the token mid-flick and it keeps traveling in the direction and speed you threw it, decelerating naturally instead of stopping dead the instant your pointer lifts. It's built with GSAP's Draggable utility plus the InertiaPlugin, loaded from a CDN, and a single bounded stage element.

**Draggable does the pointer work**

\`Draggable.create('#diToken', { type: 'x,y', bounds: '#diStage', ... })\` hands off all the pointer and touch tracking — mouse, touch, and pen input are normalized into one API, so the token drags smoothly across desktop and mobile without you writing a single \`pointermove\` listener. \`type: 'x,y'\` lets it move freely in both axes.

**Inertia is the momentum**

Setting \`inertia: true\` (with InertiaPlugin registered) is what turns a plain drag into a throw. When you release the token while it's still moving, GSAP calculates its velocity at release and continues the motion, decaying it smoothly to zero rather than an abrupt stop — the same feel as flicking a card across a table.

**Bounds keep it honest**

\`bounds: '#diStage'\` constrains both the drag and the inertial coast to the stage element, and \`edgeResistance: 0.65\` adds resistance as the token nears the edge during an active drag, so it feels like it's pushing against a soft wall rather than hitting a hard stop. The coast phase respects the same bounds, so a hard flick toward the edge settles just inside it instead of overshooting.

**Feedback on grab and release**

\`onDragStart\` and \`onDragEnd\` callbacks scale the token up slightly and deepen its shadow while held, then relax it back — a small tactile cue that reinforces the drag without interfering with Draggable's own transform handling.

**Customizing it**

Swap \`type: 'x,y'\` for \`'x'\` or \`'y'\` to constrain to one axis, tune \`edgeResistance\` for a softer or firmer edge feel, or add \`onThrowComplete\` to react once the coast finishes. Pair it with a [drag sort list](/ui-snippets/drag-sort-list/) or [drag throw notes](/ui-snippets/drag-throw-notes/) for a board of independently-flickable items.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap, Draggable, and InertiaPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A bounded stage with one draggable token renders.` },
      { title: 'Drag the token', text: `It follows the pointer and resists near the edges.` },
      { title: 'Flick and release', text: `It keeps coasting with momentum, then eases to a stop.` },
      { title: 'Try a slow drag and release', text: `With little velocity, it stops close to where you let go.` },
      { title: 'Adjust bounds or resistance', text: `Change #diStage or edgeResistance to retune the feel.` },
    ] },
    features: [
      { title: 'Real momentum', text: `InertiaPlugin continues motion from release velocity.` },
      { title: 'Bounded stage', text: `Drag and coast both stay inside #diStage.` },
      { title: 'Edge resistance', text: `Soft push-back near the boundary while dragging.` },
      { title: 'Unified pointer handling', text: `Mouse, touch, and pen all work identically.` },
      { title: 'Grab feedback', text: `Scale and shadow shift on drag start and end.` },
      { title: 'No manual physics', text: `No velocity tracking or animation loop to write.` },
      { title: 'touch-action: none', text: `Prevents scroll hijacking the drag on mobile.` },
      { title: 'Single Draggable.create call', text: `One declarative config drives the whole interaction.` },
    ],
    useCases: [
      { title: 'Sortable board momentum', text: 'Add physical feel to a [drag sort list](/ui-snippets/drag-sort-list/), where a flick continues in the release direction and decelerates smoothly.' },
      { title: 'Sticky note walls', text: 'Give notes a similar feel to [drag-throw notes](/ui-snippets/drag-throw-notes/), staying inside the stage with soft edge resistance.' },
      { title: 'Onboarding demos', text: 'Show a flingable token beside a [bento grid](/ui-snippets/bento-grid/), where mouse, touch and pen all behave identically.' },
      { title: 'Throwable kanban cards', text: 'Add throwable motion to a card on a [kanban board](/ui-snippets/kanban-board/), with bounds keeping it within the board once it stops.' },
      { title: 'Casual game pieces', text: 'Reuse the release-velocity physics for casual game pieces or a floating panel that users can fling to a screen corner.' },
      { icon: 'CODE', title: 'Related: Morphing Icon State Transitions (Play/Pause, Bookmark, Menu/Close)', desc: 'See the [Morphing Icon State Transitions (Play/Pause, Bookmark, Menu/Close)](/ui-snippets/morphing-icon-state-transition/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does InertiaPlugin actually add over plain Draggable?', a: `Plain Draggable stops the element exactly where the pointer releases it. InertiaPlugin calculates the element's velocity at the moment of release and continues its motion, decelerating it smoothly to zero — that's what produces the throw-and-coast feel instead of an abrupt stop.` },
      { q: 'Is InertiaPlugin free to use?', a: `InertiaPlugin is a Club GreenSock bonus plugin. Recent versions of the public gsap npm/CDN package have bundled it for no-signup use in many contexts, but licensing terms can change and commercial use may require a Club GreenSock membership depending on your use case — check GreenSock's current licensing page before shipping this in a commercial product.` },
      { q: 'Does the coast respect the bounds?', a: `Yes. bounds: '#diStage' constrains both the active drag and the inertial coast, so a hard flick toward an edge decelerates and settles just inside the boundary rather than flying out of the stage.` },
      { q: 'Does this work on touch devices?', a: `Yes. Draggable normalizes mouse, touch, and pen input into one API, and touch-action: none on the token stops the browser from interpreting the drag as a page scroll, so flicks register cleanly on mobile.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render the stage and token, then in a mount effect register Draggable and InertiaPlugin and call Draggable.create scoped to the container. Store the returned Draggable instance and call .kill() in the cleanup function to avoid duplicate instances on re-render or unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how InertiaPlugin derives release velocity from Draggable's pointer history to produce the coast-and-decelerate motion, and why bounds constrains both the active drag and the inertial phase rather than just the drag. The assistant can also help you extend it — ask for multiple independently-throwable tokens with collision avoidance, a snap-to-grid behavior once the coast finishes, or a version that swaps InertiaPlugin for a hand-rolled velocity tracker if licensing is a concern for your project. Treat the code as a starting point to interrogate, not a black box to copy blindly.`,
      prompt: `Build a "draggable inertia" interaction in plain HTML, CSS, and JavaScript using GSAP with its Draggable and InertiaPlugin plugins (load all three from a CDN).

Requirements:
- A bounded stage container and a single draggable token inside it, styled with a gradient background and rounded corners.
- Use Draggable.create with type: 'x,y', bounds set to the stage element (not the viewport), inertia: true, and a moderate edgeResistance so the token resists near the stage edges during an active drag.
- On release, the token must continue moving in the direction and at a speed derived from the drag's release velocity, decelerating smoothly to a stop rather than stopping instantly where the pointer lifted — this is the core inertia behavior, do not fake it with a manual CSS transition.
- The inertial coast must still respect the stage bounds, so a hard flick toward an edge settles just inside the boundary instead of exiting the stage.
- Add onDragStart and onDragEnd callbacks that give the token a subtle scale-up and shadow change while held, reverting on release, without interfering with Draggable's own transform updates.
- Set touch-action: none on the token so touch drags do not trigger page scrolling on mobile.`,
    },
  },
};

export default gsapDraggableInertia;
