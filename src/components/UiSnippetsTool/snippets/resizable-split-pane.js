const resizableSplitPane = {
  id: 'resizable-split-pane',
  title: 'Resizable Split Pane',
  category: 'layouts',
  html: `<div class="split-container" id="splitContainer">
  <div class="pane pane-left" id="leftPane">
    <h4>File Explorer</h4>
    <p>Drag the divider to resize this panel.</p>
  </div>
  <div class="divider" id="divider" role="separator" aria-orientation="vertical" aria-label="Resize panels" tabindex="0"></div>
  <div class="pane pane-right" id="rightPane">
    <h4>Editor</h4>
    <p>The right panel grows and shrinks as you drag.</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.split-container {
  display: flex;
  height: 320px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  user-select: none;
}

.pane {
  padding: 20px;
  overflow: auto;
}
.pane-left { width: 260px; flex-shrink: 0; background: #f8fafc; }
.pane-right { flex: 1; }

.pane h4 { font-size: 14px; color: #1e293b; margin-bottom: 6px; }
.pane p { font-size: 13px; color: #64748b; line-height: 1.5; }

.divider {
  width: 6px;
  flex-shrink: 0;
  background: #e2e8f0;
  cursor: col-resize;
  position: relative;
  transition: background 0.15s;
}
.divider:hover, .divider.dragging { background: #6366f1; }
.divider:focus-visible { outline: 2px solid #6366f1; outline-offset: -2px; }
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 24px;
  background: #cbd5e1;
  transform: translate(-50%, -50%);
  border-radius: 2px;
}
.divider:hover::after, .divider.dragging::after { background: #fff; }`,
  js: `const divider = document.getElementById('divider');
const leftPane = document.getElementById('leftPane');
const container = document.getElementById('splitContainer');

let dragging = false;

divider.addEventListener('mousedown', (e) => {
  dragging = true;
  divider.classList.add('dragging');
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const rect = container.getBoundingClientRect();
  let newWidth = e.clientX - rect.left;
  newWidth = Math.max(120, Math.min(newWidth, rect.width - 160));
  leftPane.style.width = newWidth + 'px';
});

document.addEventListener('mouseup', () => {
  if (!dragging) return;
  dragging = false;
  divider.classList.remove('dragging');
});

// Keyboard support: arrow keys resize by 20px increments
divider.addEventListener('keydown', (e) => {
  const step = 20;
  const currentWidth = leftPane.getBoundingClientRect().width;
  if (e.key === 'ArrowLeft') {
    leftPane.style.width = Math.max(120, currentWidth - step) + 'px';
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    const rect = container.getBoundingClientRect();
    leftPane.style.width = Math.min(rect.width - 160, currentWidth + step) + 'px';
    e.preventDefault();
  }
});`,

  seo: {
    title: 'Resizable Split Pane — Free HTML CSS JS Draggable Divider Snippet',
    description: 'Two side-by-side panels separated by a draggable divider, resized live with mousedown/mousemove/mouseup, plus arrow-key keyboard support. Vanilla JS, no libraries.',
    about: {
      title: 'Resizable Split Pane — HTML, CSS & JavaScript Draggable Layout Divider',
      description: `Code editors, file managers, and email clients all use the same layout primitive: two panels side by side, separated by a thin divider you can drag to give one panel more room. This snippet implements that pattern in about twenty lines of JavaScript using nothing but the three classic drag events — \`mousedown\`, \`mousemove\`, and \`mouseup\`.

**How the drag resize works**

The left pane has a fixed pixel \`width\` set via inline style, while the right pane uses \`flex: 1\` to consume whatever space remains. On \`mousedown\` over the \`.divider\`, a \`dragging\` flag is set to \`true\`. While that flag is on, a \`mousemove\` listener attached to the whole \`document\` (not just the divider) calculates \`e.clientX - rect.left\` — the mouse's horizontal position relative to the container's left edge — and sets that as the left pane's new width directly. Attaching the listener to \`document\` rather than the divider itself is what lets dragging continue smoothly even if the mouse briefly moves faster than the divider's own bounding box, which is a common bug in naive implementations.

**Why the width is clamped**

\`Math.max(120, Math.min(newWidth, rect.width - 160))\` prevents the left pane from shrinking below 120px or growing so large that the right pane has less than 160px left. Without this clamp, an aggressive drag could collapse one panel to zero width or push the divider off-screen entirely.

**How the drag session ends cleanly**

\`mouseup\` (also attached to \`document\`, so it fires even if the cursor has left the divider) resets \`dragging\` to \`false\` and removes the \`.dragging\` class, which restores the divider's resting color. Because both \`mousemove\` and \`mouseup\` are on \`document\`, releasing the mouse anywhere on the page — not just precisely on the divider — correctly ends the drag.

**Keyboard accessibility**

The divider has \`role="separator"\`, \`aria-orientation="vertical"\`, and \`tabindex="0"\` so it's reachable and identifiable via keyboard and assistive tech. Left/Right arrow keys resize the pane by a fixed 20px step, using the same clamp logic as the mouse drag, so keyboard-only users have full access to the same functionality mouse users get.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Resizable Split Pane" in the sidebar Library tab to load the two-panel layout.' },
        { title: 'Drag the divider', text: 'Click and drag the thin bar between the panels in the preview to resize them live.' },
        { title: 'Try keyboard resizing', text: 'Tab to the divider and press the Left/Right arrow keys to resize in fixed increments.' },
        { title: 'Adjust the minimum widths', text: 'Change the 120 and 160 values in the JS clamp logic to set different minimum widths for each pane.' },
        { title: 'Convert to a vertical split', text: 'Swap flex-direction to column, change width calculations to height, and use clientY instead of clientX in the JS.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind, or click "Save as" to keep this layout for future projects.' },
      ],
    },
    features: [
      'Draggable divider resizes both panels live using mousedown/mousemove/mouseup',
      'Document-level move/up listeners so dragging never breaks if the cursor outruns the divider',
      'Width clamping prevents either panel from collapsing or being pushed off-screen',
      'Full keyboard support: arrow keys resize in fixed steps when the divider is focused',
      'role="separator" and aria-orientation for assistive technology support',
      'Visual dragging state changes the divider color and grip-dot color for clear feedback',
      'Right panel uses flex:1 so it always fills remaining space with zero extra math',
      'user-select:none on the container prevents accidental text selection while dragging',
    ],
    useCases: [
      { icon: 'CODE', title: 'Code editors and IDEs', desc: 'Build a file-tree-plus-editor layout where developers can resize the sidebar to fit long file names or wide code.' },
      { icon: 'EMAIL', title: 'Email and messaging clients', desc: 'Let users resize a message list panel against a reading pane to their preferred proportions.' },
      { icon: 'DASH', title: 'Admin dashboards with detail panels', desc: 'Pair a resizable list/detail layout so power users can give more room to whichever side they use most.' },
      { icon: 'FLOW', title: 'Comparison or diff tools', desc: 'Use two resizable panes to compare two documents, versions, or datasets side by side.' },
      { icon: 'LEARN', title: 'Learn drag-resize mechanics', desc: 'Study why document-level (not element-level) mousemove/mouseup listeners are the correct approach for smooth dragging.' },
      { icon: 'ACCESS', title: 'Accessible resizable UI', desc: 'See a full non-mouse resize path built with role="separator" and arrow key handling for keyboard-only users.' },
    ],
    faqs: [
      { q: 'Why attach mousemove and mouseup to document instead of the divider?', a: 'If the mouse moves quickly, it can briefly leave the thin divider element even while the button is still held down. Listening on document ensures the drag continues to track correctly and reliably ends on mouseup no matter where the cursor is on the page.' },
      { q: 'How is the minimum panel width enforced?', a: 'The calculated new width is passed through Math.max(120, Math.min(newWidth, rect.width - 160)), which clamps it between a 120px floor for the left pane and a value that guarantees at least 160px remains for the right pane.' },
      { q: 'Can I make this resize vertically instead of horizontally?', a: 'Yes. Change the container\'s flex-direction to column, resize the top pane\'s height instead of the left pane\'s width, and use e.clientY relative to the container\'s top instead of e.clientX relative to its left.' },
      { q: 'Does this work on touch devices?', a: 'The base version uses mouse events only. For touch support, add matching touchstart/touchmove/touchend listeners that read e.touches[0].clientX instead of e.clientX, using the same clamp logic.' },
      { q: 'How do keyboard users resize the panes?', a: 'The divider has tabindex="0" and role="separator". Once focused (by clicking or tabbing to it), the Left and Right arrow keys resize the left pane by a 20px step using the same clamping rules as mouse dragging.' },
      { q: 'Can I add a third resizable panel?', a: 'Yes — add a second divider and a third pane, and track two separate drag sessions (which divider is currently being dragged) instead of one, applying the same mousedown/mousemove/mouseup pattern to each.' },
      { q: 'Why is user-select: none applied to the container?', a: 'Without it, dragging quickly across the panels would also select the text content inside them, which looks broken and interrupts the resize gesture. Disabling text selection during the drag keeps the interaction clean.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why the mousemove and mouseup listeners are attached to document rather than to the divider element itself — it's a subtle but important detail that trips up many first attempts at drag-resize UI. You can also ask it to add localStorage persistence so the chosen pane width survives a page refresh, to convert the layout to a vertical top/bottom split, or to add a double-click-to-reset gesture on the divider that snaps the panels back to a 50/50 split.`,
      prompt: `Build a "resizable split pane" layout in plain HTML, CSS, and vanilla JavaScript using only mousedown, mousemove, and mouseup — no drag-and-drop API, no library.

Requirements:
- Two side-by-side panels inside a flex container: a left panel with an explicit pixel width set via JavaScript, and a right panel using flex:1 to fill remaining space automatically.
- A thin vertical divider between them that changes cursor to col-resize and visually highlights while being dragged.
- On mousedown over the divider, begin tracking a dragging state. While dragging, a mousemove listener attached to the document (not the divider) must compute the new left-panel width from the cursor's horizontal position relative to the container, and clamp it so neither panel can shrink below a reasonable minimum width or force the other panel below its own minimum.
- A mouseup listener attached to the document must end the drag reliably even if the cursor is no longer directly over the divider.
- Full keyboard accessibility: the divider must have role="separator", aria-orientation="vertical", and be focusable, with Left/Right arrow keys resizing the left panel by a fixed step using the same clamping logic as the mouse drag.
- Prevent text selection in the container while dragging is active.`,
    },
  },
};

export default resizableSplitPane;
