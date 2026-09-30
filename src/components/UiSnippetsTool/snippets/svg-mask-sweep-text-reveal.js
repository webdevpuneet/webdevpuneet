const svgMaskSweepTextReveal = {
    id: 'svg-mask-sweep-text-reveal',
    title: 'SVG Mask Sweep Text Reveal',
    category: 'animations',
    html: `<div class="scene">
  <h1 class="sweep-heading" onclick="playSweep()">Reveal on demand</h1>
  <p class="hint">Click the headline to sweep the reveal shape across it again</p>
  <svg width="0" height="0" style="position:absolute">
    <defs>
      <mask id="sweepMask" maskUnits="objectBoundingBox">
        <rect x="0" y="0" width="1" height="1" fill="black" />
        <ellipse id="sweepShape" cx="-0.25" cy="0.5" rx="0.22" ry="0.9" fill="white" />
      </mask>
    </defs>
  </svg>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #101014; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.scene { text-align: center; max-width: 720px; }
.hint { font-size: 12px; color: #52525b; margin-top: 16px; }

.sweep-heading {
  font-size: clamp(28px, 6.5vw, 54px);
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: #f4f4f5;
  cursor: pointer;
  -webkit-mask: url(#sweepMask);
  mask: url(#sweepMask);
}`,
    js: `const heading = document.querySelector('.sweep-heading');
const shape = document.getElementById('sweepShape');

function playSweep() {
  // Re-apply the mask at the start of every sweep -- once a previous sweep
  // finished, the mask was removed below so the text stayed fully visible.
  heading.style.webkitMask = 'url(#sweepMask)';
  heading.style.mask = 'url(#sweepMask)';

  shape.style.transition = 'none';
  shape.setAttribute('cx', '-0.25');
  void shape.getBoundingClientRect();
  shape.style.transition = 'cx 1.1s cubic-bezier(0.65, 0, 0.35, 1)';
  requestAnimationFrame(() => {
    shape.setAttribute('cx', '1.25');
  });
}

// The mask's white ellipse is what makes the text visible; once it finishes
// sweeping past the right edge, nothing inside the mask is white anymore and
// the black backing rect hides the heading again. Dropping the mask once the
// sweep completes leaves the revealed text visible instead of hiding it.
shape.addEventListener('transitionend', () => {
  heading.style.webkitMask = 'none';
  heading.style.mask = 'none';
});

playSweep();`,

  seo: {
    title: 'SVG Mask Sweep Text Reveal — Clip-Path Wipe Animation',
    description: 'Headline revealed by a moving SVG mask shape sweeping across it, using an animated ellipse cx attribute inside a mask element. Exports to React, Vue & Tailwind.',
    about: {
      title: 'SVG Mask Sweep Text Reveal — Animated <mask> Shape, Not clip-path',
      description: `An SVG mask sweep reveals a headline by moving a shape — here a tall, narrow ellipse — through an SVG \`<mask>\` referenced by the heading's own \`mask\` CSS property, so the text appears wherever the shape currently overlaps it, like a spotlight passing across a dark room. This is a different mechanism from a CSS \`clip-path\` scroll-driven reveal: a \`<mask>\` supports soft, blurred, and gradient-edged shapes (not just hard polygon boundaries), and moving an SVG shape's own geometric attribute produces a smoother, more organic sweep than animating \`clip-path\` polygon coordinates directly. Trigger it on click, hover, or page load — this demo replays on click so you can see the sweep repeatedly.

**The SVG mask structure**

Inside \`<defs>\`, a \`<mask id="sweepMask" maskUnits="objectBoundingBox">\` contains two shapes: a full-size black \`<rect>\` covering the entire bounding box (mask value \`0\` = fully hidden) and a white \`<ellipse id="sweepShape">\` (mask value \`1\` = fully visible) positioned at \`cx="-0.25"\` — just outside the left edge of the box. \`maskUnits="objectBoundingBox"\` means every coordinate in the mask is expressed as a fraction of the masked element's own size (0 to 1), so the mask works correctly regardless of the heading's actual pixel dimensions or how the text reflows at different widths.

**Applying the mask to HTML text**

\`mask: url(#sweepMask)\` (with the \`-webkit-\` prefix for Safari) applies the SVG mask directly to the \`<h1>\` element as a CSS property — this works on ordinary HTML elements, not just SVG shapes, because CSS Masking is a separate spec from SVG that happens to be able to reference SVG \`<mask>\` definitions by ID. Wherever the mask is white, the heading is visible; wherever it is black, the heading is invisible; the soft edge of the ellipse (versus a hard polygon edge) naturally anti-aliases into a slightly feathered reveal boundary.

**Animating the shape's own attribute, not a CSS property**

\`playSweep()\` directly sets the ellipse's \`cx\` attribute — first snapping it back to \`-0.25\` with \`transition: none\` (so the reset is instant and invisible), forcing a layout read via \`shape.getBoundingClientRect()\` to flush that instant snap, then re-enabling a \`cx\` transition and setting \`cx\` to \`1.25\` (past the right edge) on the next animation frame. Because \`cx\` is animated as a plain SVG presentation attribute rather than a CSS \`transform\`, this technique works even in contexts where transforming a mask's internal shape via CSS transforms is unreliable across browsers — animating the geometry attribute directly is the more portable choice for SVG mask content.

**Why 1.25 and -0.25, not 0 and 1**

Starting the ellipse's center at \`-0.25\` (rather than \`0\`) and ending at \`1.25\` (rather than \`1\`) ensures the shape's full width — including its \`rx="0.22"\` radius — is completely outside the bounding box at both the start and end of the animation, so the sweep begins and ends on a fully hidden and fully revealed headline respectively, with no shape edge visibly clipped by the box boundary mid-transition.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the headline', text: 'Click the heading text to replay the mask sweep — a tall ellipse shape moves left to right, revealing the text as it passes.' },
        { title: 'Change the headline text', text: 'Edit the text inside .sweep-heading in the HTML panel.' },
        { title: 'Change the sweep shape', text: 'In the HTML panel, adjust rx and ry on #sweepShape — a smaller rx makes a narrower, more spotlight-like sweep; a larger one reveals more of the text at once.' },
        { title: 'Change the sweep speed', text: 'In the JS panel, update 1.1s inside the transition string set on shape.style.transition.' },
        { title: 'Trigger on scroll instead of click', text: 'Wrap the playSweep() call in an IntersectionObserver (see the pattern in char-flip-reveal-3d) instead of an onclick handler.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Uses a real SVG <mask> element, not CSS clip-path — supports soft, feathered edges',
      'maskUnits="objectBoundingBox" makes the mask scale correctly to any text size automatically',
      'CSS mask property applies the SVG mask directly to an ordinary HTML heading element',
      'Sweep is driven by animating the ellipse\'s own cx attribute, not a CSS transform',
      'Instant reset via transition: none plus a forced layout read prevents a visible snap-back',
      'Shape starts and ends fully outside the bounding box for a clean, uninterrupted sweep',
      'Click-to-replay demo trigger — easily swapped for hover, load, or scroll triggers',
      'Works with any text length or wrapping since the mask geometry is bounding-box relative',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Hero headline reveal on page load', desc: 'Trigger playSweep() once on load instead of on click for a headline that reveals itself as the page finishes rendering, similar in spirit to a curtain-opening reveal.' },
      { icon: 'DESIGN', title: 'Portfolio and case-study section transitions', desc: 'Use the sweep to reveal a section heading as it enters the viewport, giving a case study or portfolio page a considered, editorial pacing.' },
      { icon: 'LEARN', title: 'Learn SVG mask vs clip-path for text reveals', desc: 'Compare this snippet with a clip-path-based reveal to see how mask supports soft edges and reusable objectBoundingBox coordinates that clip-path polygons cannot easily replicate.' },
      { icon: 'FLOW', title: 'Click-to-reveal interactive headlines', desc: 'Keep the click-to-replay trigger as-is for an interactive element where hovering or clicking a headline rewards the visitor with a satisfying sweep animation.' },
      { icon: 'CODE', title: 'Pair with a scroll-triggered observer', desc: 'Combine with the IntersectionObserver pattern from [3D character flip reveal](/ui-snippets/char-flip-reveal-3d/) to fire the sweep automatically as the heading scrolls into view instead of requiring a click.' },
      { icon: 'STAR', title: 'Product feature spotlight callouts', desc: 'Use a tighter, narrower ellipse as a genuine "spotlight" that sweeps across a feature name, drawing deliberate attention to one phrase within a longer sentence.' },
    ],
    faqs: [
      { q: 'How is this different from a CSS clip-path reveal?', a: 'clip-path only supports hard-edged geometric shapes (polygons, circles, insets) with no blur or feathering, and moving one requires animating its shape function\'s coordinates directly in CSS. An SVG mask can use any SVG content — including shapes with blur filters, gradients, or soft edges — and this snippet animates the mask shape\'s own geometric attribute (cx) rather than a CSS clip-path string, which is more flexible for organic-feeling sweeps.' },
      { q: 'What does maskUnits="objectBoundingBox" do?', a: 'It makes every coordinate inside the mask (0 to 1) relative to the masked element\'s own bounding box rather than absolute pixel values. This means the same mask definition works correctly no matter how wide the heading text actually renders — the sweep shape\'s position and size scale automatically with the element it is masking.' },
      { q: 'Why is transition set to "none" before resetting cx?', a: 'Without disabling the transition first, resetting cx back to its starting position would itself animate backward across the text, visibly undoing the reveal before the real sweep begins. Setting transition: none makes the reset instant and invisible, and the forced getBoundingClientRect() read flushes that change before the transition is re-enabled for the actual sweep.' },
      { q: 'Why do the start and end cx values go slightly past the box (−0.25 and 1.25) instead of exactly 0 and 1?', a: 'The ellipse has its own radius (rx="0.22"), so if its center only moved from 0 to 1, part of the shape would still be visible inside the box even at the very start and end of the sweep. Starting and ending 0.25 outside the 0-1 range guarantees the shape is fully clear of the box at both endpoints.' },
      { q: 'Can I make the sweep move vertically instead of horizontally?', a: 'Yes — animate the ellipse\'s cy attribute instead of cx, and adjust rx/ry so the shape is wide and short instead of tall and narrow, so it sweeps top to bottom across the text.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Render the SVG mask definition once, reference it via the mask CSS property on the heading (mask: "url(#sweepMask)"), and drive the ellipse\'s cx with a ref and the same transition-reset-then-set technique inside a triggered function.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why maskUnits="objectBoundingBox" is what lets the same mask definition work correctly for headlines of very different lengths, and walk through why the reset step needs transition: none plus a forced layout read rather than just setting cx back to its start value directly. It's also worth an accessibility conversation: ask whether a mask-driven reveal like this should be paused or skipped for users with prefers-reduced-motion enabled, since it involves continuous shape movement. For extending it, ask for a version where the sweep shape has a soft blurred edge using an SVG feGaussianBlur filter inside the mask for an even more organic reveal, one where multiple sweep shapes move in sequence for a more elaborate reveal, or one triggered automatically by IntersectionObserver instead of a click handler. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a headline reveal effect where a shape sweeps across the text and reveals it as it passes, using a real SVG mask element (not CSS clip-path) applied to an ordinary HTML heading — plain HTML, CSS, and vanilla JavaScript only.

Requirements:
- Define an SVG <mask> containing a full-size black rectangle (representing fully hidden) and a white ellipse shape (representing fully visible), using maskUnits="objectBoundingBox" so all coordinates are expressed as fractions of the masked element's own size rather than fixed pixels, meaning the same mask works correctly regardless of how wide the actual heading text renders.
- Apply that SVG mask to the heading element directly via the CSS mask property (with the -webkit-mask prefix included for Safari), rather than duplicating the text inside the SVG itself — the heading must remain ordinary, selectable HTML text.
- Position the ellipse's horizontal center attribute far enough outside the left edge of the bounding box (accounting for its own radius) that it is fully clear of the box at rest, and animate that same attribute directly (not via a CSS transform) to a position far enough past the right edge to be fully clear at the other end, so the shape's sweep fully reveals the underlying text as it crosses.
- Before each replay of the sweep, reset the shape's position instantly with no transition, force a synchronous layout read so the browser registers the reset, then re-enable a smooth eased transition and trigger the actual sweep — so rapid replays never show a visible snap-back animation.
- Trigger the sweep on a click of the heading itself, and make it replayable indefinitely.`,
    },
  },
};

export default svgMaskSweepTextReveal;
