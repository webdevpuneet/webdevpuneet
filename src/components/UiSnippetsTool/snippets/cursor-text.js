const cursorText = {
  id: 'cursor-text',
  title: 'Cursor Text Label',
  lastmod: '2026-07-23',
  category: 'animations',
  html: `<div class="stage">
  <p class="stage-hint">Move your mouse — the cursor becomes a label over each zone</p>

  <div class="zones">
    <div class="zone project" data-cursor="View">
      <div class="zone-art a1"></div>
      <p class="zone-name">Aurora — Brand identity</p>
    </div>

    <div class="zone project" data-cursor="View">
      <div class="zone-art a2"></div>
      <p class="zone-name">Tidal — E-commerce</p>
    </div>

    <div class="zone wide gallery" data-cursor="Drag" data-cursor-style="drag">
      <div class="g-track" id="g-track">
        <div class="g-card c1"></div>
        <div class="g-card c2"></div>
        <div class="g-card c3"></div>
        <div class="g-card c4"></div>
        <div class="g-card c5"></div>
      </div>
    </div>

    <div class="zone video" data-cursor="Play" data-cursor-style="play">
      <div class="zone-art a3">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <p class="zone-name">Showreel 2026</p>
    </div>

    <a class="zone linkish" href="#" onclick="return false" data-cursor="Visit ↗">
      <p class="zone-name big">webdevpuneet.com</p>
    </a>
  </div>
</div>

<!-- The custom cursor: a dot that grows into a text pill -->
<div class="cursor" id="cursor" aria-hidden="true">
  <span class="cursor-label" id="cursor-label"></span>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif; background: #0f172a;
  min-height: 100vh; padding: 32px 20px;
}
/* Hide the native cursor only where the custom one is active */
@media (hover: hover) and (pointer: fine) {
  body, .zone, .zone * { cursor: none; }
}

.stage { max-width: 560px; margin: 0 auto; }
.stage-hint { text-align: center; font-size: 12.5px; color: #64748b; margin-bottom: 20px; }

.zones { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.zone {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 16px; padding: 12px; text-decoration: none;
}
.zone.wide { grid-column: 1 / -1; overflow: hidden; }

.zone-art {
  border-radius: 10px; height: 110px;
  display: flex; align-items: center; justify-content: center;
}
.a1 { background: linear-gradient(135deg, #f472b6, #a855f7, #312e81); }
.a2 { background: linear-gradient(135deg, #34d399, #0ea5e9, #1e3a8a); }
.a3 { background: linear-gradient(135deg, #f59e0b, #ef4444, #7c2d92); height: 120px; }
.zone-name { font-size: 12px; font-weight: 600; color: #94a3b8; margin-top: 10px; }
.zone-name.big { font-size: 20px; font-weight: 800; color: #f1f5f9; margin: 26px 0; text-align: center; }

/* draggable gallery */
.g-track { display: flex; gap: 10px; will-change: transform; }
.g-card {
  flex: 0 0 130px; height: 90px; border-radius: 10px;
}
.c1 { background: linear-gradient(135deg, #6366f1, #a855f7); }
.c2 { background: linear-gradient(135deg, #0ea5e9, #6366f1); }
.c3 { background: linear-gradient(135deg, #f472b6, #f59e0b); }
.c4 { background: linear-gradient(135deg, #34d399, #0ea5e9); }
.c5 { background: linear-gradient(135deg, #f59e0b, #ef4444); }

/* ————— The cursor ————— */
.cursor {
  position: fixed; left: 0; top: 0; z-index: 999;
  width: 12px; height: 12px;
  background: #f1f5f9;
  border-radius: 20px;
  pointer-events: none;             /* never intercept the page */
  display: flex; align-items: center; justify-content: center;
  transform: translate(-50%, -50%);
  transition: width 0.28s cubic-bezier(0.34, 1.3, 0.64, 1),
              height 0.28s cubic-bezier(0.34, 1.3, 0.64, 1),
              background 0.2s;
  opacity: 0;                        /* shown on first mousemove */
}
.cursor.on { opacity: 1; }
.cursor.down { transform: translate(-50%, -50%) scale(0.9); }

.cursor-label {
  font-size: 12px; font-weight: 700; color: #0f172a;
  white-space: nowrap; opacity: 0; transform: scale(0.6);
  transition: opacity 0.18s 0.06s, transform 0.22s 0.06s;
  padding: 0 4px;
}

/* expanded text state */
.cursor.has-text { width: auto; height: 34px; min-width: 58px; padding: 0 12px; }
.cursor.has-text .cursor-label { opacity: 1; transform: scale(1); }

/* per-zone styles */
.cursor.style-drag { background: #6366f1; }
.cursor.style-drag .cursor-label { color: #fff; }
.cursor.style-play { background: #f59e0b; }

/* On touch devices the whole thing disappears and native cursor rules apply */
@media (hover: none), (pointer: coarse) {
  .cursor { display: none; }
}`,

  js: `const cursor = document.getElementById('cursor');
const label  = document.getElementById('cursor-label');

/* — Follow the pointer with a spring lag (lerp), rendered on rAF — */
let tx = -100, ty = -100;   // target (real pointer)
let x = -100, y = -100;     // rendered position
const EASE = 0.18;

document.addEventListener('mousemove', e => {
  tx = e.clientX; ty = e.clientY;
  cursor.classList.add('on');
});
document.addEventListener('mouseleave', () => cursor.classList.remove('on'));
document.addEventListener('mousedown', () => cursor.classList.add('down'));
document.addEventListener('mouseup',   () => cursor.classList.remove('down'));

(function loop() {
  x += (tx - x) * EASE;
  y += (ty - y) * EASE;
  cursor.style.left = x + 'px';
  cursor.style.top  = y + 'px';
  requestAnimationFrame(loop);
})();

/* — Text state via event delegation on [data-cursor] zones — */
let activeZone = null;

document.addEventListener('mouseover', e => {
  const zone = e.target.closest('[data-cursor]');
  if (zone === activeZone) return;
  activeZone = zone;

  // reset per-zone styles
  cursor.className = cursor.className.replace(/\\bstyle-\\w+/g, '').trim();
  if (!cursor.classList.contains('on')) cursor.classList.add('on');

  if (zone) {
    label.textContent = zone.dataset.cursor;
    cursor.classList.add('has-text');
    if (zone.dataset.cursorStyle) cursor.classList.add('style-' + zone.dataset.cursorStyle);
  } else {
    cursor.classList.remove('has-text');
    // keep the old text during the shrink so it doesn't pop empty
    setTimeout(() => { if (!activeZone) label.textContent = ''; }, 200);
  }
});

/* — Bonus: the Drag zone actually drags — */
const track = document.getElementById('g-track');
const wrap = track.parentElement;
let dragging = false, startX = 0, scrollX = 0, curX = 0;

wrap.addEventListener('pointerdown', e => {
  dragging = true; startX = e.clientX; scrollX = curX;
  wrap.setPointerCapture(e.pointerId);
});
wrap.addEventListener('pointermove', e => {
  if (!dragging) return;
  const max = Math.max(0, track.scrollWidth - wrap.clientWidth + 24);
  curX = Math.min(0, Math.max(-max, scrollX + e.clientX - startX));
  track.style.transform = 'translateX(' + curX + 'px)';
});
wrap.addEventListener('pointerup', () => { dragging = false; });`,

  seo: {
    title: 'Cursor Text Label Effect — HTML CSS JS Snippet',
    description: 'Agency-style custom cursor that morphs into contextual labels — View, Drag, Play — with lerp follow, spring pill expansion and touch fallback. React & Tailwind.',
    about: {
      title: 'Cursor Text Label — Lerp Follower, Dot-to-Pill Morph, data-Attribute Zones & Hover-Capability Guards',
      description: `The contextual cursor — a dot that follows the pointer and blooms into "View" over a project card, "Drag" over a gallery, "Play" over a showreel — is the signature interaction of premium agency and portfolio sites (Locomotive, Studio Freight lineage, every Awwwards winner of the last five years). It works because it moves affordance *to the point of attention*: instead of scanning for buttons, the user's own cursor tells them what a click will do right here. This snippet implements the complete pattern in vanilla JavaScript — smooth lagged following, the dot-to-pill morph, per-zone styling, a genuinely draggable gallery to prove the "Drag" label honest, and the capability guards that make custom cursors safe to ship.

**The follower: lerp on requestAnimationFrame**

The cursor never snaps to the pointer. \`mousemove\` only updates a *target* (\`tx, ty\`); a permanent \`requestAnimationFrame\` loop moves the rendered position a fixed fraction toward the target each frame — \`x += (tx - x) * 0.18\` — the classic exponential lerp. The result is the trademark elastic lag: fast flicks leave the dot trailing behind, then it catches up with an implied spring. One number tunes the whole personality (0.1 is dreamy, 0.3 is snappy). Because position updates run in the rAF loop and only write \`left/top\` on a \`position: fixed\` element with \`transform: translate(-50%,-50%)\` centering, the effect stays off the layout hot path; \`pointer-events: none\` guarantees the cursor element never steals hovers or clicks from the page beneath it.

**The morph: transitioning between dot and pill**

The resting state is a 12px dot. Entering a labelled zone adds \`.has-text\`, which switches \`width: auto\` with a \`min-width\`, 34px height, and horizontal padding — and the border-radius (already 20px) rounds the resulting pill automatically. The size transition uses a back-eased cubic-bezier (\`0.34, 1.3, 0.64, 1\`) so the pill *pops* slightly past its final size, while the label fades and scales in on a 60ms delay — the stagger that makes the morph read as growth rather than a swap. On exit, the text is deliberately kept in the DOM during the shrink (cleared on a timeout only if no new zone was entered) so the pill never collapses around vanished text mid-transition.

**Zones by data attribute, resolved by delegation**

Zones declare themselves with \`data-cursor="View"\` — content authors add the attribute, nothing else. A single delegated \`mouseover\` listener on the document resolves \`e.target.closest('[data-cursor]')\`, and an \`activeZone\` guard makes the handler idempotent across the many mouseover events child elements fire. Optional \`data-cursor-style="drag"\` adds a \`style-drag\` class for per-zone colour (indigo for drag, amber for play) — the label and the look both travel with the markup. The drag zone is real: pointer-captured dragging translates the gallery track with clamped bounds, because a cursor that says "Drag" over something undraggable is worse than no cursor at all.

**The guards that make it shippable**

Custom cursors have two classic failure modes, both handled here. Touch devices: \`@media (hover: none), (pointer: coarse)\` hides the cursor element entirely, and the \`cursor: none\` that suppresses the native cursor is itself wrapped in the *opposite* query — \`(hover: hover) and (pointer: fine)\` — so touch and stylus users keep completely standard behaviour. Initial paint: the cursor starts at \`opacity: 0\` off-screen and only appears on the first \`mousemove\`, avoiding the dead dot in the corner before the user moves. Click feedback scales the dot to 0.9 on mousedown, and \`mouseleave\` on the document hides it when the pointer exits the window. What this snippet deliberately does not do is remove focus outlines — keyboard users never see a custom cursor, so all native focus behaviour remains intact.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Explore the zones',
          text: 'Move the mouse (desktop only — on touch the effect disables itself). The white dot trails your pointer with an elastic lag. Over the two project cards it blooms into a "View" pill; over the gallery it becomes an indigo "Drag" — and the gallery really drags, with clamped bounds; over the showreel it turns amber "Play"; over the link it reads "Visit ↗". Click anywhere to see the press-scale feedback.',
        },
        {
          title: 'Label your own elements',
          text: 'Add data-cursor="Read more" to any element — card, section, link — and the delegated listener picks it up with zero extra JS. Add data-cursor-style="accent" plus a .cursor.style-accent { background: … } rule for per-zone colouring. Remove the attribute and the element reverts to the plain dot. This attribute-driven contract is what makes the pattern maintainable across a CMS-driven site.',
        },
        {
          title: 'Tune the feel',
          text: 'EASE (0.18) is the personality dial: 0.1 for a dreamy luxury lag, 0.25–0.3 for a tight productive feel. The morph timing lives in the .cursor transition (0.28s back-eased) and the label\'s 60ms delay — lengthen both for a softer bloom. Dot size (12px), pill height (34px), and the click scale (0.9) are single values in the CSS.',
        },
        {
          title: 'Blend mode variant',
          text: 'For the inverted-circle look many agencies use, set the resting cursor to background: #fff; mix-blend-mode: difference and remove per-zone backgrounds — the dot then inverts whatever it crosses. Keep mix-blend-mode off the has-text state (text on difference-blended pills becomes unreadable on mid-tone backgrounds); switch to a solid pill when a label shows, which is exactly why the two states are separate classes.',
        },
        {
          title: 'Add magnetic attraction',
          text: 'Combine with the [Magnetic Button](/ui-snippets/magnetic-button) technique: on mousemove inside a zone, offset the target (tx, ty) toward the zone\'s centre by ~20% of the distance, so the cursor "sticks" to interactive elements. Because the follower already works on targets rather than raw pointer position, magnetism is a two-line interception in the mousemove handler.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — run the rAF loop in a useEffect with cleanup, keep positions in refs (never state — 60 renders/sec), and drive zone state from the delegated listener. Pairs with the [Custom Cursor](/ui-snippets/custom-cursor) base pattern, [Hover Image Trail](/ui-snippets/hover-image-trail) for gallery flourishes, [Quickto Cursor](/ui-snippets/quickto-cursor) for the GSAP-powered equivalent, and the [Drag Scroll Row](/ui-snippets/drag-scroll-row) for the full draggable-gallery treatment.',
        },
      ],
    },
    features: [
      'Exponential lerp follower on requestAnimationFrame — one EASE constant tunes the entire personality',
      'Dot-to-pill morph with back-eased overshoot and a 60ms-staggered label fade/scale',
      'Zones declared by data-cursor attributes, resolved by one delegated mouseover with closest()',
      'Per-zone styling via data-cursor-style → style-* classes (indigo Drag, amber Play)',
      'Exit-state text retention: label persists through the shrink so the pill never collapses empty',
      'The Drag zone actually drags — pointer capture, clamped translateX, honest affordance',
      'Touch-safe by construction: cursor hidden and native cursor restored via hover/pointer media queries',
      'pointer-events: none, first-move reveal, window-leave hide, and mousedown press-scale — all the shipping details',
    ],
    useCases: [
      {
        icon: 'DESIGN',
        title: 'Agency portfolios and case-study grids',
        desc: 'The native habitat: project thumbnails labelled data-cursor="View", the showreel "Play", external links "Visit ↗". The pattern signals craft to exactly the audience agency sites court, and the attribute contract keeps it maintainable as case studies are added through a CMS. Pair the project zones with the [3D Card Tilt](/ui-snippets/3d-card-tilt) hover and the gallery with [Hover Expand Gallery](/ui-snippets/hover-expand-gallery) for the full Awwwards stack.',
      },
      {
        icon: 'WEB',
        title: 'Horizontal galleries and carousels that need "Drag" affordance',
        desc: 'Draggable galleries chronically fail discoverability — nothing about a row of cards says "pull me". The cursor label solves it at the moment of relevance: the pointer itself reads "Drag" the instant it enters the gallery. This snippet ships the honest version (the track really drags with pointer capture and clamped bounds); wire the same label to any scroller, including the [Drag Scroll Row](/ui-snippets/drag-scroll-row) and [Coverflow Carousel](/ui-snippets/coverflow-carousel).',
      },
      {
        icon: 'IMG',
        title: 'Video and media surfaces with Play/Pause cursors',
        desc: 'Media sites (and the video sections of product pages) replace chrome with the cursor: "Play" over the poster, switching to "Pause" while playing — just update the element\'s data-cursor attribute on state change and re-trigger by re-assigning label.textContent. The amber style-play treatment here marks media zones distinctly; combine with the [Video Modal](/ui-snippets/video-modal) or [Video Player](/ui-snippets/video-player) for the click-through.',
      },
      {
        icon: 'LEARN',
        title: 'Learning lerp followers and delegation-driven state',
        desc: 'Two transferable mechanics live here in minimal form. The target/rendered-position split with per-frame lerp is the foundation of every smooth follower — cursors, parallax layers, camera easing in games — and seeing it in eight lines demystifies libraries that wrap it. The delegated mouseover with closest() plus an activeZone idempotency guard is the correct architecture for any hover-driven global state, avoiding per-element listeners that break with dynamic content.',
      },
      {
        icon: 'FLOW',
        title: 'Interactive data views with contextual hints',
        desc: 'Beyond aesthetics, cursor labels carry function in dense interfaces: "Expand" over collapsed rows, "Compare" over chart series, "Rearrange" over dashboard widgets. Because zones are attributes, hint text can be data-bound per element state. Use sparingly and keep labels to one word — the pattern degrades into noise if every element speaks. The touch guard matters doubly here since these interfaces see tablet use.',
      },
      {
        icon: 'CODE',
        title: 'A safe template for custom cursors in general',
        desc: 'Most custom-cursor tutorials ship broken on touch devices, steal clicks, or flash at load. This snippet is structured as the safe base: capability-gated cursor: none, pointer-events: none on the follower, first-move reveal, window-leave hide, and untouched keyboard focus behaviour. Strip the text feature and you have a production-correct minimal custom cursor to build any variant on — compare the [Custom Cursor](/ui-snippets/custom-cursor) snippet for a differently-styled sibling built on the same guards.',
      },
      { icon: 'CODE', title: 'Related: Flip Countdown', desc: 'See the [Flip Countdown](/ui-snippets/flip-countdown/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why lerp toward a target instead of setting the cursor position directly on mousemove?',
        a: 'Direct assignment produces a cursor glued to the pointer — technically fine, but visually identical to the native cursor and prone to jitter, since mousemove events fire at input-device rate (often 125–1000Hz) out of sync with display refresh. The target/rendered split fixes both: mousemove merely records intent (tx, ty), and a requestAnimationFrame loop — locked to the display — moves the rendered position a fixed fraction of the remaining distance each frame. That exponential approach curve is what reads as elasticity: the gap grows during fast movement (the trail) and closes smoothly at rest, with the EASE fraction controlling the time constant. It also creates the architecture bonus the how-to exploits: because everything downstream works on targets, effects like magnetic attraction or freeze-on-zone are two-line interceptions of the target rather than rewrites of the render path.',
      },
      {
        q: 'How does this behave on touch devices, and why two separate media queries?',
        a: 'On touch there is no persistent pointer, so a custom cursor is meaningless — worse, cursor: none left active would suppress nothing (no cursor exists) while the follower element could still flash at its last position. Two complementary queries handle the two halves: @media (hover: none), (pointer: coarse) hides the follower element entirely, and — the half most implementations forget — the cursor: none suppression is itself wrapped in the positive @media (hover: hover) and (pointer: fine), so touch, stylus, and hybrid users keep fully native cursor behaviour rather than inheriting cursor: none from a stylesheet written for mice. Hybrid devices (Surface, iPad with trackpad) resolve per the active input: the queries re-evaluate when a trackpad attaches. The interaction remains functional throughout because the follower is decorative — zones are still real links and draggable regions with native semantics underneath.',
      },
      {
        q: 'Does a custom cursor hurt accessibility, and what must I keep intact?',
        a: 'The follower itself is aria-hidden decoration with pointer-events: none — screen readers and keyboards never encounter it. The accessibility risks are in what implementations remove around it, and this snippet deliberately removes nothing: keyboard focus outlines stay (keyboard users never see the cursor, so suppressing :focus-visible styling to "match the aesthetic" is pure harm); zones remain semantic elements (the Visit zone is a real <a>, the gallery a real scrollable region), so the cursor label supplements rather than replaces affordance; and the native cursor is only hidden where the replacement is guaranteed present. Two additions worth making in production: honour prefers-reduced-motion by snapping EASE to 1 (position still follows, elasticity removed), and ensure any information the label conveys ("Play", "Drag") is also available non-cursor ways — visible on focus, or implicit in the element\'s role — since the label is invisible to keyboard and touch users by design.',
      },
      {
        q: 'How do I implement this in React or Angular, and can Tailwind style it?',
        a: 'React: create the follower once in a component mounted at the app root; run the rAF loop inside useEffect (returning cancelAnimationFrame cleanup), and keep tx/ty/x/y in refs — routing them through useState would schedule 60 renders per second for an element React doesn\'t need to reconcile. Zone state can stay delegated exactly as in the vanilla version (one document listener in the same effect), which conveniently keeps it working across route changes without per-component wiring; alternatively expose a useCursorLabel(label) hook that sets data-cursor via a ref for component-scoped ergonomics. Angular: a CursorDirective with @HostListener is tempting but per-element; better is a singleton service starting the rAF loop outside the zone (NgZone.runOutsideAngular — critical, or change detection runs per frame) with the delegated listener, plus an optional [cursorLabel] attribute directive that just writes the data attribute. Tailwind: the follower is fixed left-0 top-0 z-[999] size-3 bg-slate-100 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] with the pill state as data-[text]:w-auto data-[text]:h-8 data-[text]:px-3, per-zone colours as data-[style=drag]:bg-indigo-500 — only the back-eased timing function needs an arbitrary value or config entry.',
      },
    ],
    aiPrompt: {
      paragraph: `This effect is one of those where the last 20% — the guards — is worth more than the headline trick, and an AI assistant can audit that for you: paste the snippet into Claude and ask it to list every failure mode a naive custom cursor has (touch devices, stolen clicks, corner flash, focus-outline vandalism, reduced-motion) and point to the exact line here that handles each — then ask which one is still missing (reduced-motion) and have it add the prefers-reduced-motion EASE snap. For creative direction, ask it to build variants on the same chassis: the mix-blend-mode difference inversion cursor with the solid-pill-on-text exception explained in the how-to, magnetic attraction by intercepting the target coordinates near zone centres, or a cursor that previews a thumbnail image instead of text over gallery items. And if you're integrating into React or Angular, ask specifically for the refs-not-state / runOutsideAngular version with cleanup — the rAF-loop-in-a-framework part is where copy-pasted cursors typically leak or lag, and the assistant can explain why while writing it.`,
      prompt: `Build an agency-style contextual cursor in plain HTML, CSS, and JavaScript — a dot that follows the pointer with elastic lag and morphs into text labels over designated zones. No libraries.

Requirements:
- A fixed-position follower element (12px dot, translate(-50%,-50%) centred, pointer-events: none, high z-index) that trails the pointer using the target/rendered-position split: mousemove only updates target coordinates, and a requestAnimationFrame loop lerps the rendered position toward them by a fixed fraction (~0.18) per frame — the single constant that tunes the elastic feel.
- The follower starts invisible and appears on first mousemove, hides when the pointer leaves the window, and scales to 0.9 while the mouse button is down.
- Zones opt in via data-cursor="Label" attributes, resolved by ONE delegated mouseover listener using closest() with an active-zone guard for idempotency; entering a zone morphs the dot into a pill — width auto with min-width, taller height, horizontal padding, back-eased overshoot transition — while the label fades and scales in on a ~60ms delay; on exit, keep the old text during the shrink (clear it on a timeout only if no new zone was entered) so the pill never collapses around vanished text.
- Support per-zone styling via an optional data-cursor-style attribute mapped to style-* classes (e.g. an indigo Drag variant and an amber Play variant).
- Demo zones in a card grid: two project cards labelled "View", a wide gallery labelled "Drag" that ACTUALLY drags (pointer capture, translateX clamped to the track's bounds — the label must be honest), a video card labelled "Play" with a play glyph, and a link zone labelled "Visit ↗".
- Ship the capability guards: hide the follower entirely under @media (hover: none), (pointer: coarse), and apply cursor: none to the page ONLY inside @media (hover: hover) and (pointer: fine) so touch and stylus users keep fully native behaviour; leave all keyboard focus outlines untouched and mark the follower aria-hidden.
- Comment the code on why targets-plus-lerp beats direct assignment and why the two media queries must be separate.`,
    },
  },
};

export default cursorText;
