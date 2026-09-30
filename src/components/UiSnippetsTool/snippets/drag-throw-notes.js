const dragThrowNotes = {
  id: 'drag-throw-notes',
  title: 'Draggable Throw Notes',
  lastmod: '2026-07-18',
  category: 'cards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/InertiaPlugin.min.js',
  ],
  html: `<div class="dtn-board" id="dtnBoard">
  <p class="dtn-hint">Drag a note and let go with speed — it keeps moving and settles inside the board.</p>
  <div class="dtn-note" style="--nc:#fde68a;--nr:-3deg;left:8%;top:18%">
    <b>Ship it 🚀</b>
    <span>Flick me across the board.</span>
  </div>
  <div class="dtn-note" style="--nc:#a7f3d0;--nr:2.5deg;left:42%;top:48%">
    <b>Physics ✨</b>
    <span>Momentum comes from InertiaPlugin.</span>
  </div>
  <div class="dtn-note" style="--nc:#bfdbfe;--nr:-1.5deg;left:66%;top:22%">
    <b>Bounds 🧲</b>
    <span>I can't escape the corkboard.</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#1f2937;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.dtn-board{position:relative;width:min(640px,94vw);height:min(420px,72vh);border-radius:18px;background:radial-gradient(120% 120% at 30% 20%,#1a2036,#0e1222);border:1px solid rgba(255,255,255,.12);overflow:hidden}
.dtn-hint{position:absolute;inset:auto 0 14px 0;text-align:center;color:#5f6782;font-size:12px;letter-spacing:.05em;pointer-events:none}
.dtn-note{position:absolute;width:168px;padding:14px 14px 16px;border-radius:4px;background:var(--nc);transform:rotate(var(--nr));box-shadow:0 12px 28px rgba(0,0,0,.45);cursor:grab;user-select:none;touch-action:none;will-change:transform}
.dtn-note:active{cursor:grabbing}
.dtn-note::before{content:'';position:absolute;top:-7px;left:50%;transform:translateX(-50%);width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f87171,#991b1b);box-shadow:0 2px 4px rgba(0,0,0,.4)}
.dtn-note b{display:block;font-size:14px;margin-bottom:5px}
.dtn-note span{font-size:12.5px;line-height:1.45;color:rgba(0,0,0,.65)}`,

  js: `gsap.registerPlugin(Draggable, InertiaPlugin);

var z = 10;

Draggable.create('.dtn-note', {
  bounds: '#dtnBoard',
  // inertia hands the release velocity to InertiaPlugin, which glides
  // the note to a natural stop *within bounds* — no manual physics.
  inertia: true,
  edgeResistance: 0.72,
  onPress: function () {
    // Bring the grabbed note above its siblings and lift it slightly.
    this.target.style.zIndex = ++z;
    gsap.to(this.target, { scale: 1.06, rotation: 0, duration: 0.18 });
  },
  onRelease: function () {
    gsap.to(this.target, {
      scale: 1,
      rotation: 'random(-4, 4)',
      duration: 0.4,
      ease: 'power2.out'
    });
  }
});`,

  seo: {
    title: 'Draggable Throw Notes — Free GSAP Inertia Snippet',
    description: `Sticky notes you can grab and flick across a corkboard — GSAP Draggable with InertiaPlugin momentum, bounds, and edge resistance. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Draggable Throw Notes — Momentum Dragging With GSAP’s InertiaPlugin',
      description: `Plain HTML5 drag feels dead: the element stops the instant your pointer does. These sticky notes feel alive — grab one, flick it, and it keeps traveling with realistic momentum before gliding to a stop, always inside the corkboard. That's GSAP's Draggable paired with InertiaPlugin (both free on the CDN since GSAP 3.13), which together replace an entire physics-and-input layer with one \`Draggable.create()\` call.

**inertia: true is where the physics lives**

Draggable continuously tracks pointer velocity while you drag. On release, \`inertia: true\` hands that velocity to InertiaPlugin, which computes a natural deceleration curve — how far the note *would* slide given friction — and tweens it there. Crucially, the plugin solves the end position *first*: it knows the note's destination the moment you let go, which is why it can guarantee the landing spot respects \`bounds\` instead of clamping mid-flight with an ugly wall-stop.

**bounds turns the board into a container, not a cage wall**

\`bounds: '#dtnBoard'\` constrains both dragging and thrown travel to the board's box. During an over-drag past the edge, \`edgeResistance: 0.72\` makes the note move only ~28% of your pointer's distance — the rubbery tension every native app uses to say "you've hit the edge" — and on release it settles back inside. A thrown note aimed at the edge decelerates to land exactly at the boundary, because InertiaPlugin factored the bounds into its end-point solve.

**Grab feedback is choreography, not physics**

\`onPress\` bumps the note's z-index above its siblings (an incrementing counter, so the most recently touched note always wins) and animates a 1.06 scale with rotation zeroed — the note "lifts off the board" and squares up in your hand. \`onRelease\` settles it back down with a fresh \`random(-4, 4)\` rotation, so every throw leaves the board looking naturally messy rather than snapping notes back to fixed angles. GSAP's string-based \`random()\` makes that one line.

**touch-action: none is the mobile linchpin**

Each note sets \`touch-action: none\` so mobile browsers hand the touch to Draggable instead of scrolling the page — without it, vertical flicks would scroll instead of throw. Draggable normalizes mouse, touch, and pointer events internally, so the one config works everywhere, including the \`user-select: none\` needed to stop text selection during fast drags.

**Transforms only, so throws stay smooth**

Draggable moves elements via x/y transforms (not left/top), so dragging and inertia glides are compositor work. The CSS positions notes initially with \`left/top\` percentages purely for layout convenience; Draggable layers transforms on top from then on.

**Where you'd take it further**

Real boards persist positions (write \`this.x / this.y\` to storage in \`onThrowComplete\`), add \`snap\` to align notes to a grid, or set \`throwResistance\` to tune how far flicks travel. For rotation-based dragging, see the [drag spin dial](/ui-snippets/drag-spin-dial/); for pointer-ordered lists, [drag sort list](/ui-snippets/drag-sort-list/); for scroll-driven momentum instead, [drag scroll row](/ui-snippets/drag-scroll-row/); and for resizable workspaces, [drag resize panels](/ui-snippets/drag-resize-panels/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap, Draggable, and InertiaPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Three sticky notes render pinned to a corkboard.` },
      { title: 'Grab a note', text: `It lifts, squares up, and jumps above its siblings.` },
      { title: 'Flick and release', text: `Momentum carries it to a natural stop inside bounds.` },
      { title: 'Push past an edge', text: `Rubbery resistance, then it settles back in.` },
      { title: 'Tune the feel', text: `edgeResistance and throwResistance set the physics.` },
    ] },
    features: [
      { title: 'Real momentum', text: `Release velocity becomes a natural glide.` },
      { title: 'Bounds-aware throws', text: `End positions are solved inside the board.` },
      { title: 'Rubber-band edges', text: `edgeResistance damps over-drag by 72%.` },
      { title: 'Grab choreography', text: `Lift, square-up, and z-index on press.` },
      { title: 'Messy-by-design', text: `random(-4,4) rotation on every release.` },
      { title: 'Input-normalized', text: `Mouse, touch, and pointer in one config.` },
      { title: 'Mobile-correct', text: `touch-action: none beats page scrolling.` },
      { title: 'Transform-driven', text: `Drags and glides are compositor-only.` },
    ],
    useCases: [
      { title: 'Brainstorm boards', text: `Movable idea notes; make them orderable with [drag sort list](/ui-snippets/drag-sort-list/).` },
      { title: 'Moodboards', text: `Tossable image cards for creative tools, near a [masonry grid](/ui-snippets/masonry-grid/).` },
      { title: 'Playful 404s and heroes', text: `Interactive props visitors can flick, like [physics balls](/ui-snippets/physics-balls/).` },
      { title: 'Kanban prototypes', text: `Momentum-dragged cards before wiring a [kanban board](/ui-snippets/kanban-board/).` },
      { title: 'Rotation controls', text: `Same inertia applied to knobs in [drag spin dial](/ui-snippets/drag-spin-dial/).` },
      { title: 'Swipe interactions', text: `Velocity-based dismissal, cousin to [swipe cards](/ui-snippets/swipe-cards/).` },
      { icon: 'CODE', title: 'Related: Motion One Spring Cards', desc: 'See the [Motion One Spring Cards](/ui-snippets/motion-one-spring-cards/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the note keep moving after I release it?', a: `Draggable tracks your pointer's velocity throughout the drag; with inertia: true, that velocity is handed to InertiaPlugin on release, which computes a natural deceleration tween. It solves the final resting position up front — factoring in bounds — then animates there, which is why throws glide to elegant stops instead of hitting invisible walls.` },
      { q: 'What exactly does edgeResistance do?', a: `It damps over-drag: at 0.72, once your pointer crosses the board's boundary the note follows only 28% of the pointer's movement, producing the rubber-band tension native apps use to signal an edge. On release the note animates back inside bounds. Set it to 1 for a hard wall or 0 to allow free dragging outside.` },
      { q: 'Why do the notes use touch-action: none?', a: `Because on touch devices the browser defaults to interpreting vertical drags as page scrolling. touch-action: none tells the browser this element handles its own gestures, so flicks reach Draggable instead of scrolling. Combined with user-select: none (preventing text selection mid-drag), it's the difference between a demo that works on desktop and one that works everywhere.` },
      { q: 'How does the most recently grabbed note stay on top?', a: `An incrementing z counter: onPress assigns ++z to the grabbed note's z-index, so each grab claims a value higher than every previous one. It's simpler and cheaper than re-sorting siblings, and it matches physical intuition — whatever you touched last is the note sitting highest on the pile.` },
      { q: 'Can I snap thrown notes to a grid or fixed slots?', a: `Yes — pass snap: { x: value => Math.round(value / 40) * 40, y: same } and InertiaPlugin will target the nearest snap point when solving the throw's end position, so notes glide into alignment rather than stopping arbitrarily. An array of pixel values works too for fixed slots, and liveSnap: true snaps during the drag itself.` },
      { q: 'How do I use Draggable with inertia in React, Vue, or Angular?', a: `Create the Draggable instances in a mount effect — useEffect, onMounted, or ngAfterViewInit — from a container ref, and call .kill() on each instance (or revert a gsap.context) in the cleanup so listeners detach on unmount. Register both plugins once at module scope. To persist positions, read this.x/this.y in onThrowComplete into state or storage; note styling maps directly to Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing at how the physics is wired, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how InertiaPlugin solves a note's resting position before the throw animation even starts, and why that ordering is what lets bounds be respected without a mid-flight clamp. The same assistant can help you optimize it, for instance checking whether the incrementing z counter in onPress could overflow or misbehave after thousands of grabs in a long-running session. It's also useful for extending the board: ask it to persist each note's final x/y to localStorage in onThrowComplete so the layout survives a reload, add a snap-to-grid option for tidier arrangements, or let a double-click spawn a brand new note at the cursor. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a corkboard of draggable, flickable sticky notes in plain HTML, CSS, and JavaScript using GSAP's Draggable plugin with InertiaPlugin (load both from a CDN alongside core GSAP) — no manual velocity tracking or physics code.

Requirements:
- Several note elements, each absolutely positioned at a different starting spot on a bounded board container, styled as rotated sticky notes with a distinct background color per note.
- Make every note draggable with inertia enabled, so releasing a note mid-flick continues its motion and glides to a natural stop, constrained so the note can never leave the board's bounds even during the momentum glide (the bounds must be respected by the solved end position, not enforced by clamping mid-animation).
- Set edge resistance so that dragging a note past the board's boundary only moves it a fraction of the pointer's actual movement, producing a rubbery resistance effect, with the note settling back inside the bounds on release.
- On press, lift the grabbed note above all its siblings using an ever-incrementing z-index counter (so whichever note was most recently touched always renders on top) and animate it to a slightly larger scale with its rotation temporarily leveled to zero.
- On release, animate the note back to its normal scale and assign it a new small random rotation angle (a few degrees in either direction) so the board looks naturally messy after every throw rather than resetting to a fixed tilt.
- Set touch-action: none and disable text selection on the notes so touch dragging is not hijacked by page scrolling or accidental text selection.`,
    },
  },
};

export default dragThrowNotes;
