const linkUnderlineCursorDraw = {
  id: 'link-underline-cursor-draw',
  title: 'Cursor-Follow Underline Draw',
  category: 'animations',
  html: `<div class="lu-stage">
  <p class="lu-hint">Move your cursor across a link — the underline draws in from wherever you entered</p>
  <nav class="lu-nav">
    <a href="#" class="lu-link">Home</a>
    <a href="#" class="lu-link">Products</a>
    <a href="#" class="lu-link">Documentation</a>
    <a href="#" class="lu-link">Pricing</a>
    <a href="#" class="lu-link">Contact</a>
  </nav>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0b1120; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.lu-stage { display: flex; flex-direction: column; align-items: center; gap: 40px; padding: 24px; }
.lu-hint { font-size: 13px; color: #64748b; text-align: center; max-width: 340px; }
.lu-nav { display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; }

.lu-link {
  position: relative;
  color: #e2e8f0;
  text-decoration: none;
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 4px;
  display: inline-block;
}

/* Two pseudo-elements act as a left-growing and right-growing underline half,
   each anchored at the cursor's entry x-position via a CSS custom property. */
.lu-link::before,
.lu-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #38bdf8;
  width: 0;
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lu-link::before { right: calc(100% - var(--lu-x, 50%)); }
.lu-link::after { left: var(--lu-x, 50%); }

.lu-link:hover::before,
.lu-link:hover::after { width: 50%; }
/* width 50% of the link box on each side of --lu-x draws the line outward
   from the entry point to both edges simultaneously. */
.lu-link::before { width: 0; }
.lu-link::after { width: 0; }
.lu-link:hover::before { width: var(--lu-left-w, 0); }
.lu-link:hover::after { width: var(--lu-right-w, 0); }`,
  js: `// The underline is split into a left half and a right half, both anchored at
// the x-position where the cursor entered the link. On mouseenter we compute
// that position as a percentage and set the exact pixel widths each half needs
// to travel to reach its own edge, so the line visibly "draws itself" outward
// from under the cursor rather than sliding in from a fixed side.
document.querySelectorAll('.lu-link').forEach(function (link) {
  link.addEventListener('mouseenter', function (e) {
    var rect = link.getBoundingClientRect();
    var entryX = e.clientX - rect.left;
    var pct = Math.max(0, Math.min(100, (entryX / rect.width) * 100));

    link.style.setProperty('--lu-x', pct + '%');
    link.style.setProperty('--lu-left-w', entryX + 'px');
    link.style.setProperty('--lu-right-w', (rect.width - entryX) + 'px');
  });

  link.addEventListener('mouseleave', function () {
    link.style.setProperty('--lu-left-w', '0px');
    link.style.setProperty('--lu-right-w', '0px');
  });
});`,

  seo: {
    title: 'Cursor-Follow Underline Draw — Link Hover Snippet',
    description: 'Link underline that draws outward in both directions from the exact x-position the cursor entered, using split pseudo-elements and mouseenter coordinates. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Cursor-Follow Underline Draw — Split Pseudo-Element Underline Anchored to mouseenter X',
      description: `Most animated link underlines grow from a fixed edge — always left-to-right, regardless of where the cursor entered. This effect instead draws the underline outward from the exact horizontal point where the pointer crossed into the link, so a link entered from the right visibly grows rightward-to-leftward and one entered dead-center draws in both directions symmetrically. It reads as far more "aware" of the cursor than a standard [animated underline](/ui-snippets/animated-underline/).

**Splitting the underline into two independent halves**

Instead of one pseudo-element, the link gets two: \`::before\` anchored to grow toward the left edge, and \`::after\` anchored to grow toward the right edge. Both halves share a single anchor point — a CSS custom property \`--lu-x\` — using \`right: calc(100% - var(--lu-x))\` on \`::before\` and \`left: var(--lu-x)\` on \`::after\`. Whatever \`--lu-x\` is set to, both halves start from that exact pixel and grow away from it in opposite directions.

**Reading the entry point from \`mouseenter\`**

The \`mouseenter\` listener receives the native \`MouseEvent\`, from which \`e.clientX - rect.left\` gives the cursor's x-offset within the link's own \`getBoundingClientRect()\` box — not the viewport, the link itself. That offset becomes \`entryX\`, converted to a percentage (\`--lu-x\`) for positioning the anchor, and also used directly in pixels to compute exactly how far each half must travel: \`--lu-left-w\` is the distance to the left edge, \`--lu-right-w\` is the distance to the right edge.

**Why explicit widths instead of a flat \`50%\` on each half**

An early, simpler version of this effect just set both halves to \`width: 50%\` on hover, which only looks correct when the entry point happens to be the exact center of the link — asymmetric entry points would produce two unequal-looking bars. Setting \`--lu-left-w\` and \`--lu-right-w\` to the actual pixel distances measured from the real entry point makes both halves finish growing at exactly the same instant, at exactly the link's true edges, no matter where the cursor came in.

**The easing**

Both halves transition their \`width\` with \`cubic-bezier(0.22, 1, 0.36, 1)\` — a snappy ease-out that front-loads the motion, so the line appears to shoot outward from the cursor rather than crawl. \`mouseleave\` resets both custom properties to \`0px\`, and the same transition eases the retreat back to nothing (from whichever edges they'd reached).

**Applying it to your own nav**

Any \`<a>\` with \`position: relative\` and \`padding-bottom\` for the underline's vertical offset can use this — the JS attaches to any element matching \`.lu-link\` and requires no other markup. This pairs well as a drop-in replacement anywhere a static \`text-decoration: underline\` currently sits, for a nav bar, a footer link list, or inline links inside body copy.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover a link from different sides', text: 'Move your cursor into each nav link from the left, right, or middle — notice the underline always draws outward from your actual entry point.' },
        { title: 'Move the cursor out', text: 'Leave the link and the underline retracts back to nothing using the same easing curve.' },
        { title: 'Change the underline color or thickness', text: 'Edit the background and height on the .lu-link::before / ::after rules in the CSS panel.' },
        { title: 'Adjust the draw speed', text: 'Change the 0.3s duration or the cubic-bezier easing on the transition: width rule.' },
        { title: 'Apply to your own nav links', text: 'Add class lu-link to any anchor with position: relative — the JS listener attaches automatically via querySelectorAll.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Underline split into two pseudo-elements, each anchored to a shared CSS custom property',
      'mouseenter reads e.clientX against getBoundingClientRect for the true entry x-position',
      'Both halves grow to the link exact edges at the same instant, from any entry point',
      'Symmetric entry (link center) draws outward in both directions simultaneously',
      'cubic-bezier(0.22,1,0.36,1) ease-out gives the draw a fast, decisive feel',
      'mouseleave retracts both halves back to zero width with the same easing',
      'No JS animation loop — CSS transition handles all interpolation',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP', title: 'Primary site navigation links', desc: 'Replace a static underline or color-change hover with this cursor-aware draw for a nav bar that feels more responsive to how users actually move their mouse.' },
      { icon: 'ARTICLE', title: 'Inline links inside long-form body copy', desc: 'Apply to inline text links in articles or docs so the underline draws precisely from where a reader hovers, rather than a generic left-to-right sweep.' },
      { icon: 'LEARN', title: 'Learn mouseenter coordinate math', desc: 'A clean example of converting a raw MouseEvent into an element-relative offset with getBoundingClientRect — a technique used across dozens of cursor-driven effects.' },
      { icon: 'DESIGN', title: 'Footer link lists and sitemaps', desc: 'A subtle but noticeably more polished hover state for dense footer link columns compared to a flat color change.' },
      { icon: 'CODE', title: 'Portfolio and agency site link styling', desc: 'Pairs well with a signature site-wide interaction language alongside effects like the [magnetic button](/ui-snippets/magnetic-button/).' },
      { icon: 'STAR', title: 'Design system link component', desc: 'Standardize this as the default link hover treatment across a design system for a consistently premium feel on every text link.' },
    ],
    faqs: [
      { q: 'How does the underline know where the cursor entered?', a: 'The mouseenter event carries e.clientX, the cursor position in viewport coordinates. Subtracting rect.left (from the link\'s getBoundingClientRect) converts that to a position relative to the link itself, which becomes the anchor point for both underline halves.' },
      { q: 'Why use two pseudo-elements instead of one?', a: 'A single underline can only grow from one fixed edge. Splitting it into a left-growing ::before and a right-growing ::after, both anchored at the same entry point, lets the line expand in both directions at once from wherever the cursor actually entered.' },
      { q: 'Why set explicit pixel widths instead of just 50%?', a: 'A flat 50% only looks symmetric when the entry point happens to be dead-center. Computing the real distance from the entry point to each edge (--lu-left-w and --lu-right-w) makes both halves finish exactly at the link\'s true edges regardless of where the cursor came in.' },
      { q: 'Does this work with multi-line wrapped links?', a: 'It is designed for single-line inline-block links. For links that wrap across multiple lines, getBoundingClientRect returns the bounding box of the whole wrapped element, which can make the underline position look off on the second line — keep wrapped links to a plain hover state instead.' },
      { q: 'How do I change the underline thickness or color?', a: 'Edit the height and background properties on the .lu-link::before and ::after rules in the CSS panel — both halves should stay in sync since they share the same visual style.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Attach an onMouseEnter handler that reads e.clientX against the target\'s getBoundingClientRect and calls element.style.setProperty for the three custom properties, plus onMouseLeave to reset them.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the geometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the underline is split into two pseudo-elements sharing one CSS custom property instead of using a single element with a transform-based approach, and why the explicit --lu-left-w / --lu-right-w pixel widths are necessary rather than a flat 50%. The same assistant can help optimize it — for instance asking whether reading getBoundingClientRect on every mouseenter is fine performance-wise for a long list of links, or whether it should be cached and only recomputed on resize. It's also useful for extending the effect: ask it to make the underline retract toward the cursor's exit position instead of just collapsing to zero, add a second color that appears once the underline is fully drawn, or apply the same anchor-point technique to a background-fill hover instead of an underline. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "cursor-follow underline draw" hover effect for text links in plain HTML, CSS, and JavaScript, with no animation libraries.

Requirements:
- A row of anchor links, each of which shows an animated underline on hover that starts drawing from the exact horizontal position where the cursor entered the link — not always from the left edge and not always from the right edge.
- Implement the underline as two separate elements (or pseudo-elements) anchored at a shared position: one that grows from the entry point toward the link's left edge, and one that grows from the entry point toward the link's right edge, so both grow outward simultaneously in opposite directions.
- On the link's mouseenter event, compute the cursor's x-offset relative to the link's own bounding box (not the page) using getBoundingClientRect, then use that offset to set: the anchor position as a percentage, and the exact pixel distance from that anchor to each edge of the link.
- Both underline halves must finish growing at exactly the link's true left and right edges at the same time, regardless of where within the link the cursor entered — a naive fixed 50%/50% split is not acceptable since it only looks correct for a centered entry point.
- Use a CSS transition with a fast ease-out curve (like cubic-bezier(0.22, 1, 0.36, 1)) to animate the width changes, not a JavaScript animation loop.
- On mouseleave, both underline halves must retract back to zero width using the same transition.
- Keep the implementation reusable: any link with a shared class name should get this behavior automatically via a single querySelectorAll + event listener setup, no per-link inline code.`,
    },
  },
};

export default linkUnderlineCursorDraw;
