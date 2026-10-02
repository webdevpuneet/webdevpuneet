const quicktoCursor = {
  id: 'quickto-cursor',
  title: 'GSAP quickTo Cursor',
  lastmod: '2026-07-15',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
  ],
  html: `<div class="qtc-stage" id="qtcStage">
  <div class="qtc-cards">
    <div class="qtc-card" data-label="View project">🎨</div>
    <div class="qtc-card" data-label="Play reel">🎬</div>
    <div class="qtc-card" data-label="Read study">📖</div>
  </div>
  <p class="qtc-hint">Move the pointer — dot leads, ring trails, labels appear over cards.</p>
  <div class="qtc-dot" id="qtcDot"></div>
  <div class="qtc-ring" id="qtcRing"><span id="qtcLabel"></span></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff}
.qtc-stage{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;overflow:hidden;cursor:none;background:radial-gradient(100% 100% at 50% 0%,#131a30,#0b0d16)}
.qtc-cards{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}
.qtc-card{width:150px;aspect-ratio:4/5;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:42px;background:linear-gradient(160deg,#1a2140,#10152a);border:1px solid rgba(255,255,255,.12);transition:border-color .3s,transform .3s}
.qtc-card:hover{border-color:rgba(129,140,248,.55);transform:translateY(-4px)}
.qtc-hint{color:#5f6782;font-size:12.5px;letter-spacing:.05em}
.qtc-dot{position:fixed;top:0;left:0;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#22d3ee;pointer-events:none;z-index:50}
.qtc-ring{position:fixed;top:0;left:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:1.5px solid rgba(165,180,252,.8);display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:49;will-change:transform}
.qtc-ring span{font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#c9d2f8;opacity:0;white-space:nowrap;transition:opacity .25s}
.qtc-ring.is-label{width:88px;height:88px;margin:-44px 0 0 -44px;background:rgba(20,26,46,.85);backdrop-filter:blur(4px);border-color:rgba(165,180,252,.4)}
.qtc-ring.is-label span{opacity:1}
.qtc-ring{transition:width .3s,height .3s,margin .3s,background .3s,border-color .3s}`,

  js: `// gsap.quickTo creates ONE reusable tween per property and just
// retargets it on every call — built for pointer-follow, where creating
// a new tween per mousemove would thrash the engine.
var dotX = gsap.quickTo('#qtcDot', 'x', { duration: 0.18, ease: 'power3' });
var dotY = gsap.quickTo('#qtcDot', 'y', { duration: 0.18, ease: 'power3' });
var ringX = gsap.quickTo('#qtcRing', 'x', { duration: 0.55, ease: 'power3' });
var ringY = gsap.quickTo('#qtcRing', 'y', { duration: 0.55, ease: 'power3' });

window.addEventListener('mousemove', function (e) {
  dotX(e.clientX); dotY(e.clientY);
  ringX(e.clientX); ringY(e.clientY);
});

// Hovering a card grows the ring into a labeled lens.
var ring = document.getElementById('qtcRing');
var label = document.getElementById('qtcLabel');

document.querySelectorAll('.qtc-card').forEach(function (card) {
  card.addEventListener('mouseenter', function () {
    label.textContent = card.getAttribute('data-label');
    ring.classList.add('is-label');
  });
  card.addEventListener('mouseleave', function () {
    ring.classList.remove('is-label');
  });
});`,

  seo: {
    title: 'GSAP quickTo Cursor — Free Mouse Follower Snippet',
    description: `A two-part custom cursor — instant dot, trailing labeled ring — built on gsap.quickTo's reusable retargeting tweens. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP quickTo Cursor — The Right Way to Animate Toward the Pointer',
      description: `Custom cursors live or die on their follow physics — and on what happens under the hood at 120 mousemove events per second. The naive approach creates a fresh \`gsap.to()\` on every move, churning tween objects and fighting overwrites. \`gsap.quickTo()\` is the engine's purpose-built answer: create *one* tween per property up front, then feed it new destinations forever. This snippet uses it for the classic two-part cursor — an eager dot and a lazy ring that becomes a labeled lens over interactive cards.

**quickTo: one tween, infinitely retargeted**

\`gsap.quickTo('#dot', 'x', { duration: 0.18, ease: 'power3' })\` returns a *function*. Calling \`dotX(482)\` doesn't create anything — it retargets the single pre-built tween toward the new value, re-easing smoothly from the current position and velocity. Per mousemove, the cost is a function call and a number, not object allocation plus overwrite resolution. This is the API GSAP recommends whenever input events drive animation: cursors, magnetic buttons, tilt cards, drag ghosts.

**The lag hierarchy is the whole aesthetic**

Both parts chase the same coordinates with the same ease — only their durations differ. The dot's 0.18s makes it feel *attached*; the ring's 0.55s stretches the pair apart during motion and lets the ring glide in after every stop. That eased separation-and-reunion, driven purely by two duration numbers, is the entire "premium cursor" feel — and it's genuinely smoother than lerp-in-rAF implementations because each retarget preserves velocity through GSAP's easing rather than exponentially decaying toward stale targets.

**x/y transforms, fixed positioning, margin centering**

The followers are \`position: fixed\` at the viewport origin with negative margins equal to half their size, so \`x/y\` transforms (compositor-only) place their *centers* on the pointer. \`pointer-events: none\` keeps them from stealing hovers from the page beneath, and the stage's \`cursor: none\` hides the native arrow so the pair fully replaces it.

**The label lens is CSS state, motion is GSAP**

Hovering a card sets the ring's \`is-label\` class: it grows from 44px to an 88px frosted lens (CSS transitions on size/background), and the card's \`data-label\` fades in at its center. The division of labor is deliberate — *continuous* motion (following) belongs to quickTo; *discrete* state changes (lens mode) belong to class toggles. The two never conflict because they animate different properties.

**Why not lerp in requestAnimationFrame?**

The classic \`pos += (target − pos) × 0.1\` loop runs forever (even when idle), has velocity implied by a magic constant rather than a chosen ease, and hitches when frames drop. quickTo runs only while animating, exposes real duration/ease vocabulary, and inherits GSAP's frame-drop compensation. Same effect, strictly better mechanics.

**Touch needs a fallback**

Custom cursors are pointer-hover constructs; on touch devices, gate the whole feature behind \`matchMedia('(hover: hover)')\` and let the native cursor (none) simply not matter.

**Customizing it**

Retune the two durations (the gap *is* the personality), scale the dot on click for press feedback, or add a third, even lazier glow layer. Related: the vanilla-lerp [custom cursor](/ui-snippets/custom-cursor/), attraction physics in [magnetic button](/ui-snippets/magnetic-button/), pointer-reactive cards in [3d card tilt](/ui-snippets/3d-card-tilt/), and image-trailing in [hover image trail](/ui-snippets/hover-image-trail/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDN', text: `Core gsap only — quickTo is built in.` },
      { title: 'Paste HTML, CSS, and JS', text: `The native cursor hides; dot and ring take over.` },
      { title: 'Move the pointer', text: `The dot snaps close; the ring trails behind.` },
      { title: 'Stop abruptly', text: `Watch the ring glide in and reunite with the dot.` },
      { title: 'Hover a card', text: `The ring grows into a frosted, labeled lens.` },
      { title: 'Tune the two durations', text: `The dot/ring gap defines the personality.` },
    ] },
    features: [
      { title: 'Retargeting tweens', text: `One tween per property, fed new values.` },
      { title: 'Zero allocation moves', text: `Mousemove costs a function call.` },
      { title: 'Lag hierarchy', text: `0.18s dot, 0.55s ring — the premium feel.` },
      { title: 'Velocity-true easing', text: `Retargets re-ease from current motion.` },
      { title: 'Compositor-only', text: `Fixed elements moved by x/y transforms.` },
      { title: 'Labeled lens mode', text: `Cards grow the ring via one class.` },
      { title: 'Clean separation', text: `quickTo follows; CSS handles states.` },
      { title: 'Hover-gated', text: `Designed to disable on touch devices.` },
    ],
    useCases: [
      { title: 'Portfolio labelled cursors', text: 'Show a labelled ring over project cards, with a dot that follows instantly and a ring that trails slightly behind for a premium feel.' },
      { title: 'Magnetic CTAs', text: 'Power a [magnetic button](/ui-snippets/magnetic-button/) with the same retargeting pattern, where every mousemove costs only a function call.' },
      { title: 'Gallery hover rings', text: 'Show a View ring over images in a [hover expand gallery](/ui-snippets/hover-expand-gallery/), using `gsap.quickTo` to avoid creating tweens on every move.' },
      { title: 'Tilt interactions', text: 'Feed pointer coordinates into a [3D card tilt](/ui-snippets/3d-card-tilt/), with retargets re-easing from the current motion for natural velocity.' },
      { title: 'Drag ghosts and trails', text: 'Make smooth-follow previews for a [drag sort list](/ui-snippets/drag-sort-list/), or chain lazier followers into a [hover image trail](/ui-snippets/hover-image-trail/).' },
    ],
    faqs: [
      { q: 'What problem does quickTo solve over calling gsap.to on mousemove?', a: `Allocation and overwrite churn: mousemove can fire 120+ times per second, and a fresh gsap.to each time creates a tween object, resolves overwrites against the previous one, and discards it milliseconds later. quickTo builds one tween per property once and returns a setter function that merely retargets it — per event, the cost is a number assignment.` },
      { q: 'Why does the ring feel springy without any spring physics?', a: `Retargeting preserves momentum: each new destination re-eases from the element's current position and velocity under power3, so direction changes curve naturally and stops glide in. Combined with the duration gap (0.18s dot vs 0.55s ring), the pair stretches apart in motion and reunites at rest — spring-like behavior from pure easing.` },
      { q: 'How is this better than the classic lerp-in-rAF follower?', a: `Lerp loops run every frame forever (idle included), encode responsiveness in an opaque 0.1 constant instead of duration/ease vocabulary, decay exponentially so they never quite arrive, and hitch under frame drops. quickTo ticks only while animating, uses real eases, arrives exactly, and inherits GSAP's lag smoothing — identical look, better mechanics.` },
      { q: 'Why are the followers fixed-positioned with negative margins?', a: `Fixed puts their coordinate origin at the viewport corner so e.clientX/Y map directly to x/y transforms with no scroll math; negative margins of half their size center them on the pointer without per-frame subtraction. pointer-events: none keeps them from blocking hovers, and the stage's cursor: none removes the native arrow they replace.` },
      { q: 'How should this behave on touch screens?', a: `It shouldn't exist there — no persistent pointer means a follower just haunts the last tap. Gate initialization behind matchMedia('(hover: hover) and (pointer: fine)') so touch devices keep native behavior, and leave cursor: none off for them. The cards' own hover styles degrade gracefully to tap states.` },
      { q: 'How do I use quickTo cursors in React, Vue, or Angular?', a: `Create the quickTo setters and the mousemove listener in a mount effect — useEffect, onMounted, or ngAfterViewInit — against refs, and remove the listener in the cleanup (the setters need no explicit kill, but a gsap.context revert is tidy). Never route coordinates through state — that's a re-render per mousemove. The lens mode can be state-driven since it changes rarely; its styles are plain Tailwind with a transition.` },
      { q: 'Can I add more followers with different lag, like a three-part trail?', a: `Yes — quickTo scales linearly with follower count since each is just two more setter calls per mousemove. Add a third element, give it its own duration (say 0.35s, between the dot and ring) and its own pair of x/y setters, then call all six setters in the same mousemove handler. Stagger the durations further apart and the trail reads as a comet rather than a single ring; stack them too close and they blur into one shape.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reason through GSAP's internals alone to see why this cursor holds up under 120 mousemove events a second. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely what gsap.quickTo returns and why calling that returned function on every mousemove avoids the tween allocation and overwrite-resolution cost of calling gsap.to fresh each time. The same assistant can help you optimize it — ask whether four quickTo setters (dotX, dotY, ringX, ringY) firing every mousemove could be trimmed further, or whether the label lens's CSS transitions on width and background risk jank on low-end GPUs when toggled rapidly. It is also useful for extending the effect: ask it to add a third, even lazier trailing layer, scale the dot down on click for press feedback, or gate the whole thing behind a hover-capability media query for touch devices. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a two-part custom cursor (a fast inner dot and a slower trailing ring) in plain HTML, CSS, and JavaScript using GSAP's gsap.quickTo API — no requestAnimationFrame lerp loop, no library besides core GSAP.

Requirements:
- Two fixed-position, pointer-events:none elements (a small dot and a larger ring), each centered on the pointer via negative margins equal to half their own size rather than per-frame coordinate math, with the page's native cursor hidden via cursor: none.
- Create exactly one gsap.quickTo call per element per axis (four total: dot x, dot y, ring x, ring y) at page load — do not call gsap.to inside the mousemove handler.
- On every mousemove event, call the four quickTo setter functions with the event's clientX/clientY — nothing else should happen in that handler.
- Give the dot a short tween duration (under 0.2s) and the ring a noticeably longer one (over 0.5s), both with the same easing curve, so the two visibly separate during fast movement and reunite when the pointer stops — this duration gap is the entire visual effect, do not add separate spring or lerp math.
- When the pointer hovers a card element, grow the ring into a larger frosted "lens" showing a text label pulled from a data attribute on that card, purely via a CSS class toggle and CSS transitions — keep this discrete state change entirely separate from the continuous quickTo-driven position tweening.
- Note in a comment why this approach is preferred over a hand-rolled position += (target - position) * factor loop inside requestAnimationFrame.`,
    },
  },
};

export default quicktoCursor;
