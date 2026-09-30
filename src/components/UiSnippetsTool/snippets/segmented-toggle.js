const segmentedToggle = {
  id: 'segmented-toggle',
  title: 'Segmented Toggle',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="sgt-demo">
  <div class="sgt" id="sgt1" role="tablist" aria-label="View mode">
    <span class="sgt-glider" id="sgt1Glider"></span>
    <button class="sgt-seg active" role="tab" aria-selected="true" data-i="0" type="button">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      Grid
    </button>
    <button class="sgt-seg" role="tab" aria-selected="false" data-i="1" type="button">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      List
    </button>
    <button class="sgt-seg" role="tab" aria-selected="false" data-i="2" type="button">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      Compact
    </button>
  </div>

  <div class="sgt sgt-two" id="sgt2" role="tablist" aria-label="Billing period">
    <span class="sgt-glider" id="sgt2Glider"></span>
    <button class="sgt-seg active" role="tab" aria-selected="true" data-i="0" type="button">Monthly</button>
    <button class="sgt-seg" role="tab" aria-selected="false" data-i="1" type="button">Annual <span class="sgt-pill">-20%</span></button>
  </div>

  <p class="sgt-out" id="sgtOut">View: Grid · Billing: Monthly</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 32px; }

.sgt-demo { display: flex; flex-direction: column; align-items: center; gap: 22px; }

.sgt {
  position: relative;
  display: inline-flex;
  padding: 4px;
  background: #e9eef4;
  border-radius: 12px;
}

.sgt-glider {
  position: absolute; top: 4px; left: 4px; bottom: 4px;
  background: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  transition: transform 0.32s cubic-bezier(0.4, 0.2, 0.2, 1), width 0.32s cubic-bezier(0.4, 0.2, 0.2, 1);
  z-index: 0;
}

.sgt-seg {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 9px 18px;
  background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 13.5px; font-weight: 600; color: #64748b; white-space: nowrap;
  transition: color 0.2s;
}
.sgt-seg svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.sgt-seg:hover { color: #334155; }
.sgt-seg.active { color: #6366f1; }

.sgt-pill { padding: 1px 6px; background: #dcfce7; color: #16a34a; font-size: 10.5px; font-weight: 800; border-radius: 999px; }

.sgt-out { font-size: 14px; font-weight: 600; color: #475569; }
.sgt-out span { color: #6366f1; }`,
  js: `const state = { 0: 'Grid', 1: 'Monthly' };
const LABELS = { 0: ['Grid', 'List', 'Compact'], 1: ['Monthly', 'Annual'] };
const out = document.getElementById('sgtOut');

function setupGroup(groupId, gliderId, key) {
  const group = document.getElementById(groupId);
  const glider = document.getElementById(gliderId);
  const segs = [...group.querySelectorAll('.sgt-seg')];

  function moveGlider(i) {
    const seg = segs[i];
    glider.style.width = seg.offsetWidth + 'px';
    glider.style.transform = 'translateX(' + (seg.offsetLeft - 4) + 'px)';
  }

  function select(i) {
    segs.forEach((s, si) => {
      s.classList.toggle('active', si === i);
      s.setAttribute('aria-selected', si === i);
    });
    moveGlider(i);
    state[key] = LABELS[key][i];
    out.innerHTML = 'View: <span>' + state[0] + '</span> · Billing: <span>' + state[1] + '</span>';
  }

  segs.forEach((s, i) => s.addEventListener('click', () => select(i)));

  group.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const current = segs.findIndex(s => s.classList.contains('active'));
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (current + dir + segs.length) % segs.length;
    select(next);
    segs[next].focus();
  });

  // Initial glider position
  moveGlider(0);
  return moveGlider;
}

const move1 = setupGroup('sgt1', 'sgt1Glider', 0);
const move2 = setupGroup('sgt2', 'sgt2Glider', 1);

// Re-align gliders to the active segment on resize
window.addEventListener('resize', () => {
  move1([...document.querySelectorAll('#sgt1 .sgt-seg')].findIndex(s => s.classList.contains('active')));
  move2([...document.querySelectorAll('#sgt2 .sgt-seg')].findIndex(s => s.classList.contains('active')));
});`,
  seo: {
    title: 'Segmented Toggle — Free HTML CSS JS Control Snippet',
    description: 'An iOS-style segmented control with a sliding glider that resizes per segment, icons, keyboard nav and a live readout. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Segmented Toggle — iOS-Style Segmented Control with a Sliding Resizing Glider',
      description: `The segmented control — a row of options in a single pill where one is always selected — is the cleaner alternative to a dropdown when you have two to four mutually exclusive choices: view modes, billing periods, time ranges, filters. The hallmark of a good one is the "glider": a highlight that slides smoothly from segment to segment rather than blinking on and off. This component builds a proper segmented toggle with a glider that both slides and resizes to fit segments of different widths, icon support, keyboard navigation, and a live readout — in HTML, CSS, and vanilla JavaScript.

**The sliding, resizing glider**

A single white \`.sgt-glider\` element sits behind the segments with \`z-index: 0\` while the segment buttons sit above at \`z-index: 1\`. When a segment is selected, \`moveGlider()\` reads that segment's \`offsetWidth\` and \`offsetLeft\` and sets the glider's \`width\` and \`transform: translateX()\` to match (offset by the 4px container padding). Both are CSS-transitioned, so the glider glides across and grows or shrinks to exactly fit the new segment — important because "Grid", "List", and "Compact", or "Monthly" and "Annual -20%", are all different widths. Measuring from the live DOM means it is always pixel-correct without hard-coded sizes.

**Why transform, not left**

The glider animates with \`transform: translateX()\` rather than animating the \`left\` property. Transforms are GPU-composited and do not trigger layout, so the slide stays at 60fps; animating \`left\` would force a layout recalculation on every frame. Combined with the \`width\` transition (which does relayout the glider only, a tiny element), the motion is smooth and cheap.

**A reusable group setup**

\`setupGroup()\` wires any segmented control — it is called twice here, once for the three-way view toggle and once for the two-way billing toggle, proving the pattern scales to any number of segments. Each group manages its own glider, its own active state via the \`.active\` class and \`aria-selected\`, and writes its choice into a shared \`state\` object that drives the live readout. Adding a third control is one more \`setupGroup()\` call.

**Keyboard navigation and ARIA**

Each control is a \`role="tablist"\` of \`role="tab"\` buttons with \`aria-selected\` tracking the choice. Arrow Left and Arrow Right move the selection within a group (wrapping around with modulo) and move focus to the newly selected segment — the expected keyboard behaviour for a segmented control. Because the segments are real \`<button>\`s, they are focusable and clickable out of the box; the active segment's text also recolours to the accent so the selection is clear even to users who do not perceive the glider's position.

**Resize handling**

If the layout reflows — a font loads, the container resizes, the page goes responsive — the glider must re-align to the (possibly moved) active segment. A \`resize\` listener re-runs each group's \`moveGlider()\` for its current active index, so the glider never drifts out from under the selected segment. This is the detail that separates a robust control from one that looks broken after a window resize.

**Customisation**

Add or remove segments in the markup (and the matching \`LABELS\` entry); the glider adapts to the new widths automatically. Drop the SVG icons or add your own, use the \`.sgt-pill\` badge for callouts like discounts, swap the \`#6366f1\` active colour and the \`#e9eef4\` track for your palette, and read the selected values from the \`state\` object (or wire \`select()\` to your app — change a layout, toggle pricing, filter a list).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `Two segmented controls render — a three-way view toggle with icons and a two-way billing toggle — plus a live readout of both choices.` },
      { title: 'Click a segment', text: `The white glider slides to that segment and resizes to fit it, the segment text turns accent-coloured, and the readout updates.` },
      { title: 'Use arrow keys', text: `Focus a control and press Left/Right to move the selection within it with wrap-around; focus follows the active segment.` },
      { title: 'Resize the window', text: `The gliders re-align to their active segments so they never drift after a layout change.` },
      { title: 'Add or change segments', text: `Edit the segment buttons and the matching LABELS array; the glider adapts to the new widths automatically.` },
      { title: 'Wire it up', text: `Read choices from the state object or connect select() to change a view, toggle pricing, or filter; swap the accent colour.` },
    ]},
    features: [
      { title: 'Sliding + resizing glider', text: `One highlight element transitions translateX and width to fit each segment, measured live so different-width labels work.` },
      { title: 'Transform-based motion', text: `Animates transform (not left) so the slide is GPU-composited and stays at 60fps with no per-frame layout.` },
      { title: 'Reusable group setup', text: `setupGroup() wires any control; used twice here for a 3-way and a 2-way toggle, scaling to any segment count.` },
      { title: 'Icon and badge support', text: `Segments can carry SVG icons and a pill badge (e.g. a -20% discount) without breaking the glider.` },
      { title: 'Keyboard tablist', text: `role=tab/tablist with aria-selected and Arrow Left/Right navigation with wrap-around.` },
      { title: 'Accent active text', text: `The selected segment recolours so the choice is clear even apart from the glider's position.` },
      { title: 'Resize re-alignment', text: `A resize listener re-runs the glider math for the active segment so it never drifts after a reflow.` },
      { title: 'Shared state readout', text: `Choices write to a state object that drives a live readout, ready to connect to your app logic.` },
    ],
    useCases: [
      { title: 'View-mode switchers', text: `Toggle grid/list/compact layouts on a gallery or table — pair with a [data table column toggle](/ui-snippets/data-table-column-toggle/) for more view control.` },
      { title: 'Pricing period toggles', text: `Switch monthly/annual on a pricing page with a discount badge; complements a [pricing toggle](/ui-snippets/pricing-toggle/) and a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Time-range and filter controls', text: `Pick day/week/month on a dashboard or a status filter on a list, the clean alternative to a dropdown.` },
      { title: 'Settings and preference panels', text: `Offer two-to-four mutually exclusive options inline; compare with a [segmented control](/ui-snippets/segmented-control/) variant.` },
      { title: 'Tab-like section switchers', text: `Use as a compact tab bar when panels are simple and few.` },
      { title: 'Learning the glider technique', text: `A reference for the sliding-resizing highlight, transform vs left, and accessible segmented-control keyboard nav.` },
    ],
    faqs: [
      { q: 'How does the glider resize to fit segments of different widths?', a: `moveGlider() reads the selected segment's offsetWidth and offsetLeft from the rendered DOM and sets the glider's width and translateX to match (minus the 4px container padding). Because it measures the actual element, the glider fits "Grid" or "Compact" or "Annual -20%" exactly — no hard-coded widths. Both width and transform are CSS-transitioned, so it animates the size change as it slides.` },
      { q: 'Why animate transform instead of the left property?', a: `Animating left forces the browser to recalculate layout on every frame, which causes jank. transform: translateX() is handled by the compositor on the GPU and skips layout entirely, so the slide stays smooth at 60fps. The width transition does relayout, but only the tiny glider element, which is cheap. This transform-first approach is the standard for performant UI animation.` },
      { q: 'The glider is misaligned after the page resizes — how do I fix it?', a: `It needs to re-measure when the layout changes. This snippet adds a window resize listener that re-runs moveGlider() for each group's currently active segment, so the glider snaps back under the selected segment after any reflow (resize, font load, responsive breakpoint). If your control lives in a resizable container, you can also use a ResizeObserver on the container for the same effect.` },
      { q: 'How do I add a fourth segment or a third control?', a: `For a new segment, add another button to the group and a matching label to that group's LABELS array — the glider adapts to its width automatically. For a whole new control, add the markup with its own glider id and call setupGroup('newId', 'newGliderId', key) with a new state key. The setup function is fully reusable, which is why two independent controls work from the same code.` },
      { q: 'How do I use this segmented toggle in React, Vue, or Angular?', a: `Hold the active index in state per control. For the glider, keep refs to the segment elements and an effect that, when the index changes (and on resize), reads the active segment's offsetLeft/offsetWidth and sets the glider style. Bind .active/aria-selected to index comparisons and the keyboard handler to onKeyDown. The CSS — track, glider, transitions — ports unchanged; only the measure-and-position effect moves into the framework's lifecycle.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out how setupGroup wires two independent controls from one function by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how moveGlider derives both a width and a translateX offset from offsetWidth and offsetLeft, or why the glider animates transform instead of the left property. The same assistant can help optimize it, for instance checking whether the resize listener recalculating both gliders on every resize event should be throttled, or whether a ResizeObserver on each container would be more efficient than a single window-level listener. It's also useful for extending the behavior: ask it to add a third segmented group driven by the same setupGroup call, animate the glider with a subtle overshoot easing, or persist each control's selection to localStorage so the choice survives a page reload. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an iOS-style segmented toggle with a sliding, resizing glider in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Write one reusable setup function that takes a container id, a glider element id, and a state key, and can be called multiple times to wire up multiple independent segmented controls on the same page without them interfering with each other.
- Each control needs a single glider element positioned behind its segment buttons with a lower z-index, and the buttons must sit above it so they remain clickable.
- On selecting a segment, read that segment's offsetWidth and offsetLeft from the live DOM and set the glider's width and a translateX transform to match exactly (adjusting for the container's own padding) — do not hard-code segment sizes.
- The glider must animate using transform (translateX) for position, not the left property, so the slide is GPU-composited and does not trigger layout on every frame; width may transition normally since only the small glider element relays out.
- Give each control role="tablist" on the container and role="tab" with aria-selected on each button, and support Arrow Left / Arrow Right keys to move the selection within that control with wrap-around at both ends, moving keyboard focus to the newly active segment.
- At least one control must support segments with visibly different content widths (e.g. one plain-text segment and one segment containing both text and a small badge) to prove the glider resizes correctly rather than assuming uniform segment widths.
- Add a window resize listener that re-runs the glider positioning for every control's currently active segment, so the glider never drifts out of alignment after a layout reflow.`,
    },
  },
};

export default segmentedToggle;
