const stackedModalManager = {
  id: 'stacked-modal-manager',
  title: 'Stacked Modal Manager — Multiple Modals on Top of Each Other, Correctly',
  lastmod: '2026-08-28',
  category: 'modals',
  html: `<div class="demo">
  <p class="hint">Open the first modal, then open a second from inside it. Escape closes only the topmost modal. Each backdrop dims a little more than the one behind it.</p>
  <button class="open-btn" id="openFirst">Open modal 1</button>

  <div class="modal-stack" id="modalStack"></div>

  <template id="modalTemplate">
    <div class="stack-overlay">
      <div class="stack-modal" role="dialog" aria-modal="true">
        <h3 class="stack-title"></h3>
        <p class="stack-body"></p>
        <div class="stack-actions">
          <button class="btn ghost" data-action="close">Close</button>
          <button class="btn primary" data-action="open-next">Open next modal</button>
        </div>
      </div>
    </div>
  </template>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 340px; max-width: 100%; }
.hint { font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.6; }
.open-btn { padding: 10px 20px; border: none; border-radius: 10px; background: #4f46e5; color: #fff; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.open-btn:hover { background: #4338ca; }

.modal-stack { position: fixed; inset: 0; pointer-events: none; z-index: 50; }

.stack-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(15,23,42,0.32); pointer-events: auto; animation: fadeIn 0.15s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.stack-modal { width: 300px; background: #fff; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 24px 60px rgba(15,23,42,0.3); animation: popIn 0.18s cubic-bezier(0.34,1.56,0.64,1); }
@keyframes popIn { from { opacity: 0; transform: scale(0.94) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.stack-title { font-size: 14.5px; font-weight: 800; color: #111827; }
.stack-body { font-size: 12.5px; color: #64748b; line-height: 1.6; }
.stack-actions { display: flex; gap: 8px; margin-top: 4px; }
.btn { flex: 1; border: none; padding: 9px; border-radius: 9px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.btn.ghost { background: #f1f5f9; color: #334155; }
.btn.ghost:hover { background: #e2e8f0; }
.btn.primary { background: #4f46e5; color: #fff; }
.btn.primary:hover { background: #4338ca; }`,
  js: `const stackRoot = document.getElementById('modalStack');
const template = document.getElementById('modalTemplate');
const openFirstBtn = document.getElementById('openFirst');

// The stack is a real array of DOM elements, in open order — the last entry
// is always the topmost, currently-interactive modal. Every operation
// (opening, closing, Escape handling) is defined in terms of "the top of
// the stack," never a single global "is a modal open" boolean, which is
// what makes nesting behave correctly instead of just the most recent
// modal's state clobbering everything opened before it.
const stack = [];

function topModal() {
  return stack[stack.length - 1] || null;
}

function openModal(depth) {
  const node = template.content.cloneNode(true);
  const overlay = node.querySelector('.stack-overlay');
  const modal = node.querySelector('.stack-modal');

  modal.querySelector('.stack-title').textContent = \`Modal \${depth}\`;
  modal.querySelector('.stack-body').textContent =
    \`This is modal #\${depth} in the stack. Closing it reveals modal #\${depth - 1} beneath it, still exactly where you left it.\`;

  // Each layer's own backdrop stacks visually on top of the ones below it,
  // so more open modals means a progressively darker combined overlay —
  // a natural depth cue with zero manual opacity bookkeeping required.
  overlay.style.zIndex = String(50 + depth);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTopModal();
  });

  modal.querySelector('[data-action="close"]').addEventListener('click', closeTopModal);
  modal.querySelector('[data-action="open-next"]').addEventListener('click', () => openModal(depth + 1));

  stackRoot.appendChild(overlay);
  stack.push(overlay);

  // Focus moves into the newly topmost modal so keyboard/screen-reader users
  // land somewhere sensible, matching the single-modal focus-trap convention
  // but re-applied fresh at every new stack depth.
  modal.querySelector('[data-action="close"]').focus();
}

function closeTopModal() {
  const overlay = stack.pop();
  if (!overlay) return;
  overlay.remove();
  // Return focus to whatever is now the topmost remaining modal (or nothing,
  // if the stack is empty), never to a stale reference from a deeper layer
  // that no longer exists.
  const newTop = topModal();
  if (newTop) newTop.querySelector('[data-action="close"]').focus();
}

document.addEventListener('keydown', (e) => {
  // Escape only ever closes the SINGLE topmost modal, one layer per press —
  // never the whole stack at once, which would be jarring and could skip
  // past confirmation state a user still needed to see in an intermediate layer.
  if (e.key === 'Escape' && topModal()) closeTopModal();
});

openFirstBtn.addEventListener('click', () => openModal(1));`,
  seo: {
    title: 'Stacked Modal Manager — Multiple Modals Layered Correctly, One Escape Press Per Layer',
    description: 'A modal system supporting genuine nesting — open a modal from inside another modal, with each layer\'s backdrop stacking correctly, Escape closing exactly one layer at a time, and focus always returning to the correct remaining layer.',
    about: {
      title: 'Stacked Modal Manager — Getting Nested Modals Actually Right',
      description: `Most modal implementations assume exactly one modal is ever open at a time — a single boolean, a single overlay, a single Escape handler. The moment a real product needs to open a confirmation dialog *from inside* another modal (a common pattern: edit form → "are you sure you want to discard?"), that single-modal assumption breaks down. This snippet models modals as a genuine **stack**, where every operation is defined relative to "the top of the stack" rather than a single global open/closed flag.

**Why a stack (array), not a counter or a boolean**

\`stack\` holds the actual DOM overlay elements, in the order they were opened — not just a count of "how many modals are open." This distinction matters because closing needs to know *which specific modal* to remove (always the last one pushed, i.e. \`stack.pop()\`), and Escape handling needs to know *which one* to focus afterward. A simple counter could tell you "2 modals are open" but not which two, or in what order, or which one is currently on top and interactive — the array is what makes every subsequent operation correct.

**Escape closes exactly one layer, never the whole stack**

The \`keydown\` listener calls \`closeTopModal()\` — singular, one layer — every time Escape is pressed, rather than clearing the whole stack at once. This is a deliberate UX decision: if a user opened an edit form, then a nested "discard changes?" confirmation on top of it, hitting Escape once should dismiss just the confirmation (returning them to the edit form, still open) — not blow past it and close everything, which would risk discarding unsaved state the confirmation dialog existed specifically to protect.

**Z-index stacking mirrors the array order automatically**

Each overlay's \`z-index\` is set to \`50 + depth\`, where \`depth\` increases by one for every nested modal — so the array order and the visual stacking order are always kept in lockstep by construction, not by a separate manually-maintained z-index counter that could drift out of sync with the actual \`stack\` array. Because each overlay also renders its own semi-transparent backdrop, layering three modals produces a naturally progressively-darker combined background with zero manual opacity math — each layer's own dimming simply compounds visually with the ones beneath it.

**Focus always returns to the correct remaining layer, not a stale one**

\`closeTopModal()\` doesn't just remove the top overlay — after popping it off the array, it calls \`topModal()\` again to find whatever is now the new top (which could be another modal, or nothing if the stack is now empty) and moves focus there. This guarantees that closing a triple-nested modal always leaves keyboard focus somewhere sensible and *current* — never on a reference to a modal that was itself already closed earlier, and never simply dropped onto the page body when a modal is technically still open beneath it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the first modal', text: 'A single dialog appears over a dimmed backdrop, with focus moved to its Close button.' },
        { title: 'Click "Open next modal" from inside it', text: 'A second modal opens on top, with its own backdrop compounding visually with the first for a progressively darker overall dim.' },
        { title: 'Press Escape once', text: 'Only the topmost (most recently opened) modal closes — the one beneath it remains open exactly as it was.' },
        { title: 'Keep nesting further', text: 'Repeat opening nested modals to see the stack, z-index layering, and focus management all continue to work correctly at any depth.' },
        { title: 'Click outside a modal\'s content', text: 'Clicking directly on a modal\'s own backdrop (not a modal further underneath) closes just that topmost layer, same as pressing Escape.' },
      ],
    },
    features: [
      'True stack-based modal management — an array of open modals, not a single global open/closed boolean',
      'Escape key closes exactly one topmost layer per press, never the entire stack at once',
      'z-index for each layer is derived directly from its position in the stack, always staying in sync by construction',
      'Each layer\'s own backdrop compounds visually with layers beneath it, producing a natural progressive-dim depth cue',
      'Focus moves to the newly topmost modal both when opening a new layer and when closing one back down to a previous layer',
      'Clicking a modal\'s own backdrop closes just that layer, correctly scoped to the click\'s originating overlay',
      'Built with a <template> element, cloning fresh markup per modal instance rather than manipulating one shared DOM node',
    ],
    useCases: [
      { icon: 'CONFIRM', title: 'Nested confirmation dialogs', desc: 'A destructive action inside one modal (like discarding changes) opening a confirmation dialog on top, without losing the first modal\'s state.' },
      { icon: 'WIZARD', title: 'Multi-step flows with detours', desc: 'A form modal that needs to open a secondary "add new item" modal mid-flow, then return to exactly where the user left off.' },
      { icon: 'ADMIN', title: 'Admin tools with drill-down detail modals', desc: 'Clicking a row in one modal\'s list to open a detail modal on top, common in admin and support tooling.' },
      { icon: 'HELP', title: 'Contextual help overlays', desc: 'Opening a help or definition popup from within an already-open settings or configuration modal.' },
    ],
    faqs: [
      { q: 'Why track modals in an array instead of just a counter of how many are open?', a: 'Closing and focus management both need to know exactly WHICH modal is on top, not just how many are open in total. The array (stack) holds the actual DOM elements in open order, so operations like "close the top one" or "focus whatever is now on top" have a concrete, unambiguous element to act on.' },
      { q: 'Does pressing Escape close every open modal at once?', a: 'No — it closes exactly one layer, the topmost one, per press. This is deliberate: a nested confirmation dialog exists specifically to be seen and responded to before returning to the modal beneath it, so Escape skipping past all of them at once would undermine that purpose.' },
      { q: 'How is z-index layering kept correct as modals open and close?', a: 'Each overlay\'s z-index is computed directly from its depth in the stack at the moment it\'s created (50 + depth), so the visual stacking order is always derived from — and therefore always consistent with — the actual array order, rather than a separately maintained counter that could drift out of sync.' },
      { q: 'What happens to keyboard focus when a nested modal closes?', a: 'closeTopModal() re-checks the stack after removing the top overlay and moves focus to whatever is now the new top (another modal, if one remains, or nowhere if the stack is empty) — never to a stale reference to a modal that no longer exists.' },
      { q: 'Can I close a middle modal without closing the ones on top of it first?', a: 'Not with the current implementation — closing always operates on the top of the stack, matching how nested dialogs conventionally behave (you resolve the innermost prompt before returning to what\'s beneath it). Closing out of order would require a different data structure and UX pattern.' },
      { q: 'Why use a <template> element instead of one shared modal DOM node reused for every layer?', a: 'Each nested modal is a fully independent instance with its own event listeners and content — cloning a <template> for every openModal() call keeps each layer\'s DOM and listeners cleanly isolated from every other layer, rather than trying to repurpose one shared node for multiple simultaneous, independently-closeable modals.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why Escape closing only the topmost modal (rather than the whole stack) is the correct UX choice for nested confirmation flows, and to trace through what focus ends up on after closing a modal at each possible stack depth. It's also worth asking for a version that also implements a proper focus trap within each individual layer (so Tab cycles only within the topmost modal's own focusable elements), or one that limits maximum stack depth and shows a warning instead of allowing unbounded nesting.`,
      prompt: `Build a stacked/nested modal manager in HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- A way to open a modal, and from inside that modal, a button to open another modal on top of it, supporting at least three levels of nesting.
- Track open modals as an ordered stack (array) of DOM elements, not a single boolean or counter — every operation (opening, closing, Escape handling, focus management) must be defined in terms of the top of that stack.
- Pressing the Escape key must close exactly one modal — the current topmost layer — per press, never the entire stack of open modals at once.
- Clicking directly on a modal's own backdrop (not a modal underneath it) must close just that topmost layer, using the same single-layer-close logic as Escape.
- Each modal layer must render its own semi-transparent backdrop, so that with multiple modals open, the combined visual dimming naturally compounds and gets progressively darker with each additional open layer — no manual/shared opacity value calculation needed.
- Each layer's stacking (z-index) must be derived directly from its position in the stack at the moment it opens, so visual layering always stays correctly in sync with the actual open order.
- When a modal opens, move keyboard focus into it. When a modal closes, move focus to whatever is now the new topmost remaining modal (or leave it on the page if the stack becomes empty) — never to a reference to an already-closed modal.`,
    },
  },
};

export default stackedModalManager;
