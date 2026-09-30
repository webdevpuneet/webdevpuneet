const fabSpeedDialMenu = {
  id: 'fab-speed-dial-menu',
  title: 'FAB Speed Dial Menu',
  category: 'buttons',
  html: `<div class="speed-dial" id="speedDial">
  <div class="dial-actions" id="dialActions">
    <button class="dial-item" style="--i: 0" onclick="handleAction('share')" aria-label="Share">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-3.8M8.6 13.4l6.8 3.8"/></svg>
      <span class="dial-tooltip">Share</span>
    </button>
    <button class="dial-item" style="--i: 1" onclick="handleAction('edit')" aria-label="Edit">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      <span class="dial-tooltip">Edit</span>
    </button>
    <button class="dial-item danger" style="--i: 2" onclick="handleAction('delete')" aria-label="Delete">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
      <span class="dial-tooltip">Delete</span>
    </button>
  </div>

  <button class="dial-main" id="dialMain" onclick="toggleDial()" aria-label="Open actions menu" aria-expanded="false">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  </button>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; min-height: 100vh; }

.speed-dial {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dial-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dial-item {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #fff;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  /* Hidden and collapsed by default; each item transitions independently
     with a delay based on its --i custom property, producing a stagger. */
  opacity: 0;
  transform: scale(0.4) translateY(10px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transition-delay: 0s;
}
.dial-item.danger:hover { color: #ef4444; }
.dial-item:hover { background: #f1f5f9; }

.speed-dial.open .dial-item {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: auto;
  transition-delay: calc(var(--i) * 0.05s);
}

.dial-tooltip {
  position: absolute;
  right: 52px;
  top: 50%;
  transform: translateY(-50%);
  background: #1e293b;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}
.dial-item:hover .dial-tooltip { opacity: 1; }

.dial-main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #6366f1;
  box-shadow: 0 8px 20px rgba(99,102,241,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, transform 0.3s ease;
}
.dial-main:hover { background: #4f46e5; }
.dial-main svg { transition: transform 0.3s ease; }

/* The + icon rotates 45deg to visually become an X when the dial is open. */
.speed-dial.open .dial-main svg { transform: rotate(45deg); }`,
  js: `const speedDial = document.getElementById('speedDial');
const dialMain = document.getElementById('dialMain');

function toggleDial() {
  const isOpen = speedDial.classList.toggle('open');
  dialMain.setAttribute('aria-expanded', String(isOpen));
}

function handleAction(action) {
  // Replace with real behavior per action, e.g. opening a share sheet,
  // navigating to an edit form, or confirming a delete.
  console.log('Speed dial action:', action);
  toggleDial();
}

// Close the dial when clicking anywhere outside it.
document.addEventListener('click', (e) => {
  if (!speedDial.contains(e.target) && speedDial.classList.contains('open')) {
    toggleDial();
  }
});`,

  seo: {
    title: 'FAB Speed Dial Menu — Free HTML CSS JS Floating Action Button Snippet',
    description: 'A floating action button that expands into a staggered stack of mini action buttons, rotating its own icon into an X. Plain HTML, CSS, and JS.',
    about: {
      title: 'FAB Speed Dial Menu — HTML, CSS & JavaScript Floating Action Button',
      description: `A speed dial is a floating action button (FAB) that, instead of triggering a single action directly, expands into a small vertical stack of related actions — share, edit, delete — when tapped. It's a compact way to expose several secondary actions from one persistent, low-footprint control, popularized by Material Design and now common across mobile and web apps.

This snippet builds the full interaction in **plain HTML, CSS, and vanilla JavaScript**.

**How the stagger animation works**

Each mini action button (\`.dial-item\`) carries an inline custom property, \`style="--i: 0"\`, \`--i: 1\`, \`--i: 2\`, numbering its position in the stack. Every item starts hidden — \`opacity: 0\`, \`transform: scale(0.4) translateY(10px)\`, and \`pointer-events: none\` so it can't be clicked while invisible. When \`.speed-dial\` gets the \`.open\` class, all three items animate to full opacity and scale, but each one's \`transition-delay\` is set to \`calc(var(--i) * 0.05s)\` — so item 0 starts immediately, item 1 waits 50ms, item 2 waits 100ms. The result is a cascading stagger where the buttons pop in one after another rather than all snapping into view simultaneously.

**How the icon-to-X rotation works**

The main FAB shows a plus-sign SVG (two crossed lines) by default. A single CSS rule, \`.speed-dial.open .dial-main svg { transform: rotate(45deg) }\`, rotates that whole icon 45 degrees when the dial is open — a horizontal and vertical line rotated 45° together visually form an X, so no separate icon swap or extra markup is needed; it's the exact same SVG, just rotated.

**How closing works**

Three things close the dial: clicking the main FAB again (which just toggles the \`.open\` class off), clicking any action item (each calls \`handleAction()\`, which also calls \`toggleDial()\` after handling the action), and clicking anywhere outside the entire \`.speed-dial\` container — handled by a single document-level click listener that checks \`speedDial.contains(e.target)\`.

**Tooltips on each mini button**

Each \`.dial-item\` contains a \`.dial-tooltip\` span positioned absolutely to its left, shown only on \`:hover\`, so small icon-only buttons still communicate their exact purpose without adding permanent visible labels that would clutter the compact FAB stack.

**Accessibility**

The main button's \`aria-expanded\` attribute is kept in sync with the dial's open state on every toggle, and each mini action button has a descriptive \`aria-label\` since its content is icon-only.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "FAB Speed Dial Menu" in the sidebar Library tab. The preview shows a single indigo circular button in the bottom-right corner.' },
        { title: 'Click the FAB', text: 'Click it to see three mini action buttons cascade upward with a staggered pop-in animation, and the plus icon rotate into an X.' },
        { title: 'Click an action or outside', text: 'Click one of the mini buttons to trigger its action and auto-close the dial, or click anywhere else on the page to close it without acting.' },
        { title: 'Add or remove actions', text: 'In the HTML panel, add or remove .dial-item buttons, giving each a unique --i value in its inline style to control its stagger order.' },
        { title: 'Wire up real actions', text: 'In the JS panel, replace the console.log inside handleAction with real logic per action name, such as opening a share sheet or a confirmation dialog.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Staggered cascade animation driven by a per-item CSS custom property and transition-delay',
      'Main FAB icon rotates 45 degrees to visually become an X — no icon swap or extra markup',
      'Hidden items use opacity, scale, and pointer-events together so they are unclickable while closed',
      'Per-item hover tooltips keep icon-only buttons understandable without permanent labels',
      'Closes on: clicking the main button again, clicking an action, or clicking outside the whole component',
      'aria-expanded kept in sync with open state; every icon-only button has a descriptive aria-label',
      'Any number of action items can be added just by giving each a unique --i stagger index',
      'Pure CSS transitions — no animation library or JavaScript animation loop',
      'Compact fixed footprint when closed — only the single 56px main button occupies space',
      'No framework, no FAB component library, no build step required',
    ],
    useCases: [
      { icon: 'FAB', title: 'Compact multi-action toolbars', desc: 'Expose several secondary actions like share, edit, and delete from a single persistent floating button without cluttering the main UI.' },
      { icon: 'LEARN', title: 'Learn CSS custom-property-driven stagger animations', desc: 'Study how a single --i variable per item, combined with calc() in transition-delay, produces a cascading animation with no per-item JavaScript timing code.' },
      { icon: 'FLOW', title: 'Prototype mobile-style action menus', desc: 'Drop this into a dashboard or content-management prototype where a Material Design-style speed dial fits the product\'s interaction language.' },
      { icon: 'DESIGN', title: 'Match your brand\'s FAB styling', desc: 'Adjust the main button color, mini-button size, and stagger timing to fit your product\'s existing floating-action-button conventions.' },
      { icon: 'ACCESS', title: 'Build accessible expandable icon menus', desc: 'The aria-expanded and aria-label wiring here is a reusable reference for any icon-only expandable control elsewhere in your UI.' },
      { icon: 'CODE', title: 'Wire actions into a real feature set', desc: 'Replace the placeholder handleAction console.log with real navigation, API calls, or confirmation modals tied to your app\'s actual share/edit/delete features.' },
      { icon: 'CODE', title: 'Related: Local Font Access Picker', desc: 'See the [Local Font Access Picker](/ui-snippets/local-font-picker/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the staggered pop-in animation work without JavaScript timers?', a: 'Each mini button has an inline CSS custom property like --i: 0, --i: 1, --i: 2. When the dial opens, every item transitions to visible, but its transition-delay is computed as calc(var(--i) * 0.05s) — so higher-indexed items start their animation slightly later, creating a cascade purely through CSS, with no setTimeout or animation-timing JavaScript involved.' },
      { q: 'How does the plus icon become an X?', a: 'It is the same SVG the whole time — two crossed lines forming a plus sign. A single CSS rule rotates that icon 45 degrees when the dial is open, and a plus rotated 45 degrees visually reads as an X. There is no icon swap or second SVG.' },
      { q: 'How do I add a fourth action button?', a: 'Copy an existing .dial-item button in the HTML panel, give it a new aria-label, icon, and tooltip text, and set its inline style to --i: 3 (continuing the sequence) so it staggers in after the third item.' },
      { q: 'Why do hidden dial items use pointer-events: none?', a: 'Even though opacity: 0 makes an element invisible, it remains clickable and focusable by default. pointer-events: none additionally removes it from mouse interaction while hidden, preventing accidental clicks on an invisible button stacked behind the main FAB.' },
      { q: 'What closes the speed dial?', a: 'Three things: clicking the main FAB again toggles it closed directly; clicking any mini action button calls handleAction, which also closes the dial after running; and a document-level click listener closes it whenever a click lands outside the entire .speed-dial container.' },
      { q: 'Can I open the dial upward, downward, or sideways instead of upward from the bottom-right?', a: 'Yes. Change flex-direction on .dial-actions and adjust the fixed positioning and translateY direction in .dial-item\'s initial transform to match — for example flex-direction: row and translateX instead of translateY for a horizontal dial.' },
      { q: 'Is the speed dial accessible to keyboard users?', a: 'The main button and each mini action are real <button> elements, reachable via Tab and activatable with Enter or Space, and aria-expanded on the main button reflects open/closed state. For full keyboard support, also consider closing the dial on Escape and moving focus into it when opened via keyboard.' },
      { q: 'Can I reuse this pattern for something other than share/edit/delete?', a: 'Yes — the component makes no assumptions about the specific actions. Swap the icons, labels, and handleAction logic for any set of two to five short, related actions you want to expose from one compact floating control.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain exactly how the --i custom property combined with calc() in transition-delay produces the staggered cascade effect, and why pairing opacity, scale, and pointer-events together (rather than any one alone) is necessary for the hidden items to be both invisible and unclickable at the same time. It's also a good snippet to extend with the assistant's help — ask it to add Escape-key handling to close the dial and return focus to the main button, to make the stagger direction and distance configurable via more CSS custom properties, or to help wire the three placeholder actions (share, edit, delete) into your app's real share sheet, edit route, and delete confirmation flow.`,
      prompt: `Build a floating action button (FAB) speed dial menu in plain HTML, CSS, and JavaScript — no FAB component library, no animation library.

Requirements:
- A main circular FAB fixed to the bottom-right of the viewport, showing a plus-sign icon (built from two crossed lines in one SVG) that rotates 45 degrees via CSS transform to visually become an X when the menu is open — do not swap to a second icon.
- Two or more mini circular action buttons stacked above the main FAB, each hidden by default using a combination of opacity, a scaled-down transform, and pointer-events: none so they are neither visible nor clickable while closed.
- Give each mini action button its own CSS custom property (like --i: 0, --i: 1, --i: 2) indicating its position in the stack, and use calc(var(--i) * <some base delay>) as that item's transition-delay so that when the menu opens, the items animate into view in a staggered cascade rather than all appearing simultaneously.
- Each mini button must show a small tooltip label on hover, since the buttons themselves are icon-only.
- The menu must close when: the main FAB is clicked again, any mini action button is clicked (after running its action), or a click occurs anywhere outside the whole speed-dial component.
- Keep aria-expanded on the main button in sync with the open/closed state, and give every icon-only button a descriptive aria-label.`,
    },
  },
};

export default fabSpeedDialMenu;
