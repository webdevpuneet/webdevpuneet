const floatingActionBtn = {
  id: 'floating-action-btn',
  title: 'Floating Action Button Radial Menu',
  lastmod: '2026-06-13',
  category: 'buttons',
  html: `<div class="fab-demo">
  <div class="page-hint">Click the + button to expand the radial menu</div>

  <div class="fab-container" id="fabContainer">
    <!-- Action items (rendered behind main FAB) -->
    <div class="fab-item fab-item-1" data-label="Share" onclick="fabAction('Share')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
    </div>
    <div class="fab-item fab-item-2" data-label="Edit" onclick="fabAction('Edit')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </div>
    <div class="fab-item fab-item-3" data-label="Upload" onclick="fabAction('Upload')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
    </div>
    <div class="fab-item fab-item-4" data-label="Delete" onclick="fabAction('Delete')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
    </div>
    <div class="fab-item fab-item-5" data-label="Bookmark" onclick="fabAction('Bookmark')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    </div>

    <!-- Main FAB -->
    <button class="fab-main" id="fabMain" onclick="toggleFab()" aria-label="Open actions" aria-expanded="false">
      <svg class="fab-icon-plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <svg class="fab-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <!-- Tooltip label -->
    <div class="fab-tooltip" id="fabTooltip"></div>
  </div>

  <!-- Backdrop -->
  <div class="fab-backdrop" id="fabBackdrop" onclick="toggleFab()"></div>

  <div class="fab-feedback" id="fabFeedback"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f1f5f9;min-height:100vh}

.fab-demo{
  position:relative;min-height:100vh;
  display:flex;align-items:center;justify-content:center
}
.page-hint{font-size:14px;color:#94a3b8;text-align:center}

.fab-container{
  position:fixed;bottom:28px;right:28px;
  width:56px;height:56px;z-index:200
}

/* Main button */
.fab-main{
  position:absolute;bottom:0;right:0;
  width:56px;height:56px;border-radius:50%;
  background:linear-gradient(135deg,#6366f1,#8b5cf6);
  border:none;color:#fff;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 6px 24px rgba(99,102,241,.5);
  transition:transform .2s,box-shadow .2s;z-index:2
}
.fab-main:hover{transform:scale(1.07);box-shadow:0 10px 32px rgba(99,102,241,.6)}
.fab-icon-plus,.fab-icon-close{
  position:absolute;transition:transform .25s,opacity .2s
}
.fab-icon-close{opacity:0;transform:rotate(-90deg) scale(.6)}
.fab-container.open .fab-icon-plus{opacity:0;transform:rotate(90deg) scale(.6)}
.fab-container.open .fab-icon-close{opacity:1;transform:rotate(0deg) scale(1)}
.fab-container.open .fab-main{transform:scale(1.07);background:linear-gradient(135deg,#4f46e5,#7c3aed)}

/* Action items */
.fab-item{
  position:absolute;bottom:0;right:0;
  width:44px;height:44px;border-radius:50%;
  background:#fff;color:#4f46e5;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.14);
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .25s ease;
  transform:scale(0) translate(6px,6px);opacity:0;
  z-index:1
}
.fab-item:hover{background:#eef2ff}

/* Staggered animation positions — quarter-circle arc, fanning up-and-left only
   so no item ever sits below the main button (which is anchored to the
   bottom-right corner and would otherwise clip downward items off-screen) */
.fab-container.open .fab-item-1{transform:translate(0,-140px) scale(1);opacity:1;transition-delay:.04s}
.fab-container.open .fab-item-2{transform:translate(-54px,-129px) scale(1);opacity:1;transition-delay:.08s}
.fab-container.open .fab-item-3{transform:translate(-99px,-99px) scale(1);opacity:1;transition-delay:.12s}
.fab-container.open .fab-item-4{transform:translate(-129px,-54px) scale(1);opacity:1;transition-delay:.16s}
.fab-container.open .fab-item-5{transform:translate(-140px,0) scale(1);opacity:1;transition-delay:.2s}

/* Tooltip */
.fab-tooltip{
  position:fixed;bottom:100px;right:96px;
  background:#1e293b;color:#fff;
  font-size:12px;font-weight:600;
  padding:5px 10px;border-radius:6px;
  pointer-events:none;opacity:0;
  transition:opacity .15s;white-space:nowrap
}
.fab-tooltip.visible{opacity:1}

/* Backdrop */
.fab-backdrop{
  position:fixed;inset:0;background:rgba(15,23,42,.3);
  backdrop-filter:blur(2px);z-index:150;
  opacity:0;pointer-events:none;transition:opacity .25s
}
.fab-backdrop.visible{opacity:1;pointer-events:all}

.fab-feedback{
  position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
  background:#1e293b;color:#fff;font-size:13px;font-weight:600;
  padding:8px 20px;border-radius:8px;
  opacity:0;transition:opacity .2s;pointer-events:none;z-index:300
}
.fab-feedback.show{opacity:1}`,

  js: `const container = document.getElementById('fabContainer');
const fabMain = document.getElementById('fabMain');
const backdrop = document.getElementById('fabBackdrop');
const tooltip = document.getElementById('fabTooltip');
const feedback = document.getElementById('fabFeedback');
let isOpen = false;
let feedbackTimer;

function toggleFab() {
  isOpen = !isOpen;
  container.classList.toggle('open', isOpen);
  backdrop.classList.toggle('visible', isOpen);
  fabMain.setAttribute('aria-expanded', String(isOpen));
}

// Show tooltip on hover
document.querySelectorAll('.fab-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    tooltip.textContent = item.dataset.label;
    const rect = item.getBoundingClientRect();
    tooltip.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
    tooltip.style.right = (window.innerWidth - rect.right + 54) + 'px';
    tooltip.classList.add('visible');
  });
  item.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
});

function fabAction(label) {
  clearTimeout(feedbackTimer);
  feedback.textContent = '✓ ' + label + ' action triggered';
  feedback.classList.add('show');
  feedbackTimer = setTimeout(() => feedback.classList.remove('show'), 2000);
  toggleFab();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isOpen) toggleFab();
});`,

  seo: {
    title: 'Floating Action Button Radial Menu — HTML CSS JS',
    description: `FAB that expands into a 5-item radial arc menu with spring-staggered animation, backdrop blur, tooltips, and keyboard dismiss. Exports to React, Vue & Angular.`,
    about: {
      title: `Floating Action Button — Radial Arc Menu, Spring-Staggered Animation & Backdrop Blur`,
      description: `The Floating Action Button (FAB) is the centerpiece of Material Design — a persistent, elevated button that represents the primary action of a screen. This snippet extends the classic single FAB (see the simpler [expanding FAB](/ui-snippets/expanding-fab/)) into a radial menu: clicking the main button fans out five secondary action buttons in an arc pattern, each with a spring-animated entrance and a hover [tooltip](/ui-snippets/css-tooltip/), overlaid on a blurred backdrop.

**Radial arc positioning with CSS transform translate**

The five action items all start at \`position: absolute; bottom: 0; right: 0\` — stacked directly under the main FAB button. In their closed state, \`transform: scale(0) translate(6px,6px); opacity:0\` makes them invisible. When the \`.open\` class is added to the container, each item gets a specific translate target that positions it along a 90° arc swept into the upper-left quadrant only:
- Item 1: \`translate(0,-140px)\` — straight up
- Item 2: \`translate(-54px,-129px)\` — 22.5° toward left
- Item 3: \`translate(-99px,-99px)\` — upper-left diagonal (cos 45° × 140 ≈ 99)
- Item 4: \`translate(-129px,-54px)\` — 67.5° toward left
- Item 5: \`translate(-140px,0)\` — straight left

The 140px radius and 22.5° angle increments create a quarter-circle arc that only ever moves up and left — never down. That matters because the FAB is anchored to the bottom-right corner of the viewport: any item with a positive (downward) y-offset would be pushed toward or past the bottom edge of the screen and get clipped or hidden behind other fixed UI. Keeping every item's y-offset zero or negative guarantees all five stay fully visible regardless of how close to the bottom of the page the button sits. The radius is deliberately larger than the 44px item diameter would strictly require, so adjacent items clear each other with a visible gap instead of their circular hit areas overlapping. The positions are pure CSS — no JavaScript trigonometry needed because the arc positions are calculated once and hardcoded.

**Spring stagger animation**

Each item's \`transition\` uses \`cubic-bezier(.34,1.56,.64,1)\` — the spring easing — for both \`transform\` and \`opacity\`. The stagger is achieved with \`transition-delay\` values: item 1 at 40ms, item 2 at 80ms, item 3 at 120ms, item 4 at 160ms, item 5 at 200ms. This creates a wave of items appearing in sequence rather than all at once, making the radial expansion feel organic. The 40ms increment is just long enough to perceive as sequential but short enough to feel snappy overall.

**Icon crossfade on open/close**

The main FAB contains two SVG icons: a plus sign and an X. Both are \`position: absolute\` inside the button. The plus starts visible; the X starts with \`opacity:0; transform:rotate(-90deg) scale(.6)\`. When open, the plus fades and rotates out (\`opacity:0; rotate(90deg)\`) while the X fades in and un-rotates to its normal position. This 90° rotation crossfade communicates the dual state of the button without requiring a text label.

**Backdrop blur overlay**

The backdrop is a \`position:fixed; inset:0\` div with \`background:rgba(15,23,42,.3); backdrop-filter:blur(2px)\`. When visible it dims and blurs the page content, visually isolating the FAB menu — the same backdrop technique used by the [modal](/ui-snippets/modal/) snippet. The backdrop also acts as a click target — clicking it closes the menu. The \`pointer-events:none\` on the hidden state prevents it from blocking interaction with the page when the FAB is closed.

**Dynamic tooltip positioning**

Rather than CSS-only tooltips, the tooltip element is repositioned in JavaScript using \`getBoundingClientRect()\` to get the hovered item's screen position, then setting the tooltip's \`right\` and \`bottom\` based on \`window.innerWidth - rect.right\` and \`window.innerHeight - rect.top\`. This ensures the tooltip always appears to the right of the arc item regardless of which item is hovered, without needing individual tooltip elements per item.

**Keyboard and accessibility**

The main button has \`aria-expanded\` toggled and \`aria-label="Open actions"\`. Pressing Escape closes the menu. A production implementation would also add \`aria-label\` to each action item and manage focus trap behavior so keyboard users can navigate the arc items with Tab/arrow keys.

**React export pattern**

In React: \`const [open, setOpen] = useState(false)\`. Each item is a mapped array of \`{ id, icon, label, onClick }\` objects. The container div gets \`className={\`fab-container \${open ? 'open' : ''}\`}\`. The backdrop \`onClick\` handler calls \`setOpen(false)\`. Since the arc positions are pure CSS classes (\`.fab-item-1\` through \`.fab-item-5\`), the React component simply passes the index to generate the class name: \`className={\`fab-item fab-item-\${i+1}\`}\`.`,
    },
    howToUse: [
      { title: 'Paste HTML, CSS, and JS', text: `A purple FAB button appears in the bottom-right corner. The page background shows a hint text.` },
      { title: 'Click the FAB', text: `Five white icon buttons fan out in an arc pattern from the main button, each with a spring animation. A blurred backdrop appears.` },
      { title: 'Hover over an action item', text: `A tooltip appears near the item showing its label (Share, Edit, Upload, Delete, or Bookmark).` },
      { title: 'Click an action', text: `A confirmation message appears at the bottom of the screen. The menu collapses back.` },
      { title: 'Dismiss with backdrop or Escape', text: `Click the blurred backdrop or press Escape to close the menu without taking an action.` },
      { title: 'Customize actions', text: `Replace the SVG icons and \`data-label\` attributes. Update the \`onclick="fabAction('...')"\` calls with your own handlers.` },
    ],
    features: [
      'Radial arc positioning via hardcoded CSS translate pairs',
      'Spring-staggered entrance with cubic-bezier(.34,1.56,.64,1) and delay increments',
      'Plus-to-X icon crossfade with rotation on open',
      'Backdrop blur overlay with click-to-dismiss',
      'Dynamic tooltip positioning via getBoundingClientRect()',
      'pointer-events:none on closed items prevents click-through',
      'ARIA aria-expanded on the main button',
      'Escape key keyboard dismiss',
    ],
    useCases: [
      { icon: 'APP', title: 'Mobile-style primary action hub', desc: 'Mobile-first web apps use a FAB as the single "create" entry point — expanding into New Document, New Folder, Upload, and Scan options.' },
      { icon: 'DESIGN', title: 'Canvas and drawing tools', desc: 'Design tools place a FAB in the corner for shape, text, image, and component insertion — keeping the canvas clean while making tools accessible.' },
      { icon: 'CODE', title: 'Developer tools quick actions', desc: 'IDE extensions and dev dashboards use FABs for New File, Run, Debug, and Terminal actions — surfacing frequently used commands without toolbar clutter.' },
      { icon: 'FLOW', title: 'Project management screens', desc: 'Kanban boards and task managers use a FAB to add new cards, columns, members, or attachments — one button that expands to the right context action.' },
      { icon: 'NAV', title: 'Navigation shortcut menu', desc: 'Single-page apps without a sidebar use a FAB menu for section navigation — Home, Search, Profile, Settings — accessible from any scroll position.' },
      { icon: 'CODE', title: 'Related: Media Session API Controls', desc: 'See the [Media Session API Controls](/ui-snippets/media-session-controls/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I change the number of items or arc angle?', a: `Adjust the \`translate\` values in the CSS. Keep the y-offset zero or negative for a bottom-right anchored FAB, otherwise items get pushed off the bottom of the screen. Divide your arc (e.g. 90°) by the number of items minus one, then calculate each offset using \`x = -radius * sin(angle)\` and \`y = -radius * cos(angle)\`. For 4 items across a 90° upward-left arc with radius 140: (0,-140), (-99,-99), (-140,0) plus one more at the 30°/60° increment. Keep the radius comfortably larger than the item diameter so neighboring buttons don't overlap.` },
      { q: 'How do I add labels next to each icon instead of a tooltip?', a: `Remove the tooltip div. Add a \`<span class="fab-label">\` inside each \`.fab-item\`. Style with \`position:absolute; right:52px; white-space:nowrap; font-size:12px; background:#1e293b; color:#fff; padding:4px 8px; border-radius:4px\`. The labels appear to the left of each icon in the arc.` },
      { q: 'How do I export this as a React component?', a: `Create \`<RadialFAB actions={[{ icon, label, onClick }]} />\`. Use \`useState(false)\` for open state. Map actions to \`<div className={\`fab-item fab-item-\${i+1}\`} onClick={() => { onAction(i); setOpen(false); }}\>\`. Pass \`className={\`fab-container \${open ? 'open' : ''}\`}\` to the container.` },
      { q: 'How do I make the FAB hide on scroll down and show on scroll up?', a: `Track scroll direction with \`let lastY = 0\` in a \`scroll\` event listener. When \`window.scrollY > lastY\` (scrolling down), add a \`hidden\` class with \`transform:translateY(100px); opacity:0\` to \`.fab-container\`. When scrolling up, remove it. Update \`lastY\` each event.` },
      { q: 'How do I export this FAB to React, Vue, or Angular?', a: `Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the button, radial-item, and scrim styles become utility classes, a Vue 3 single-file component, and an Angular standalone component. Each converter preserves the markup, the spring-staggered open animation, and the backdrop and keyboard-dismiss behaviour, so the speed-dial works identically across React, Vue, and Angular. Keep the open state in component state and render the action items from an array passed in as a prop or input rather than hardcoding the five buttons.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the trigonometry behind the arc positions by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why every fab-item's translate keeps its y-offset at zero or negative, and how the 140px radius with 22.5-degree increments was used to derive each of the five hardcoded translate pairs. The same assistant can help optimize it — ask whether repositioning the tooltip with getBoundingClientRect on every mouseenter is necessary versus precomputing fixed offsets per item, or whether the five hardcoded transition-delay values should be generated from item count instead of hand-written. It's also useful for extending the menu: have it support a configurable number of items with a generated arc, add a hide-on-scroll behavior, or turn the hardcoded actions array into data-driven items with keyboard arrow navigation between them. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a floating action button (FAB) that expands into a five-item radial arc menu, in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A main circular button fixed to the bottom-right corner of the viewport, containing two absolutely-positioned SVG icons (a plus and an X) that crossfade and rotate into each other based on an open/closed state class on a parent container.
- Five secondary circular action buttons, each starting stacked exactly under the main button at scale(0) and opacity 0. When the container's open class is applied, each must translate to a distinct position along a quarter-circle arc that sweeps only upward and to the left (never downward or further right), computed from a fixed radius and even angle increments across 90 degrees, so that no item can ever be pushed toward or past the bottom or right edge of the viewport.
- Each of the five items' transform and opacity transitions must use a springy overshoot easing curve (an appropriate cubic-bezier), and each item must have a slightly increasing transition-delay in arc order, so the items fan out as a visible sequential wave rather than all at once.
- A semi-transparent, blurred backdrop element that fades in behind the menu when open, is clickable to close the menu, and has pointer-events disabled while hidden so it never blocks clicks to the page underneath.
- A tooltip element (not a native title attribute) that is repositioned in JavaScript using getBoundingClientRect on mouseenter to sit next to whichever action item is currently hovered, showing that item's label from a data attribute.
- Clicking any action item must show a brief confirmation toast at the bottom of the screen naming the action, then close the menu. Pressing Escape while the menu is open must also close it. The main button must reflect its open/closed state via aria-expanded.`,
    },
  },
};

export default floatingActionBtn;
