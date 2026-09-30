const focusTrapModalPrimitive = {
  id: 'focus-trap-modal-primitive',
  title: 'Accessible Modal Primitive with Real Focus Trap',
  lastmod: '2026-08-27',
  category: 'modals',
  html: `<div class="demo">
  <p class="hint">Try tabbing through the page — focus never escapes the modal while it's open, and returns to this button when closed.</p>
  <button class="trigger" id="openBtn">Open modal</button>

  <div class="overlay" id="overlay">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" id="modal">
      <h2 id="modalTitle">Accessible modal</h2>
      <p>Every focusable element below is reachable by Tab, and focus wraps from the last one back to the first — it never lands on the page behind this dialog.</p>

      <div class="modal-fields">
        <input type="text" placeholder="First field" />
        <input type="text" placeholder="Second field" />
        <a href="#" id="modalLink">A focusable link</a>
      </div>

      <div class="modal-actions">
        <button class="btn ghost" id="cancelBtn">Cancel</button>
        <button class="btn primary" id="confirmBtn">Confirm</button>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; flex-direction: column; gap: 14px; }

.hint { font-size: 12px; color: #94a3b8; max-width: 320px; text-align: center; }
.trigger { background: #4f46e5; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.trigger:hover { background: #4338ca; }
.trigger:focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }

.overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); display: none; align-items: center; justify-content: center; z-index: 50; }
.overlay.open { display: flex; }

.modal { width: 360px; max-width: calc(100vw - 40px); background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 24px 60px rgba(15,23,42,0.3); display: flex; flex-direction: column; gap: 14px; }
.modal h2 { font-size: 15.5px; font-weight: 800; color: #111827; }
.modal p { font-size: 12.5px; color: #64748b; line-height: 1.6; }

.modal-fields { display: flex; flex-direction: column; gap: 8px; }
.modal-fields input { padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 13px; font-family: inherit; }
.modal-fields input:focus-visible { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.modal-fields a { font-size: 12.5px; color: #6366f1; font-weight: 600; }
.modal-fields a:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; border-radius: 3px; }

.modal-actions { display: flex; gap: 10px; margin-top: 4px; }
.btn { flex: 1; border: none; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.btn.ghost { background: #f1f5f9; color: #334155; }
.btn.ghost:hover { background: #e2e8f0; }
.btn.primary { background: #4f46e5; color: #fff; }
.btn.primary:hover { background: #4338ca; }
.btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }`,
  js: `const openBtn = document.getElementById('openBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

let lastFocusedBeforeOpen = null;

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements() {
  return Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
}

function openModal() {
  lastFocusedBeforeOpen = document.activeElement;
  overlay.classList.add('open');
  document.addEventListener('keydown', handleKeydown);

  // Move focus into the modal itself as soon as it opens, so a screen
  // reader user or keyboard user isn't left focused on a now-hidden trigger.
  const focusables = getFocusableElements();
  (focusables[0] || modal).focus();
}

function closeModal() {
  overlay.classList.remove('open');
  document.removeEventListener('keydown', handleKeydown);

  // Return focus to exactly whatever had it before the modal opened —
  // not just "the page body" — so keyboard context is fully preserved.
  if (lastFocusedBeforeOpen) lastFocusedBeforeOpen.focus();
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  if (e.key !== 'Tab') return;

  // The actual focus trap: intercept Tab/Shift+Tab at the boundaries of the
  // modal's own focusable elements and wrap around, instead of letting focus
  // escape to whatever is behind the modal in the page's natural tab order.
  const focusables = getFocusableElements();
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

openBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
confirmBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });`,
  seo: {
    title: 'Accessible Modal Primitive — Real Keyboard Focus Trap and Focus Restoration',
    description: 'A minimal, correct modal dialog primitive implementing a genuine focus trap (Tab wraps within the modal, never escapes to the page behind it) plus focus restoration to the exact trigger element on close.',
    about: {
      title: 'Modal Primitive with a Real Focus Trap — Correct, Not Just Visual',
      description: `Countless modal implementations get the *visual* overlay right but skip the accessibility mechanics entirely — a sighted mouse user never notices, but a keyboard user tabbing through the page can end up focused on an element visually hidden behind the modal, or lose their place entirely once the modal closes. This snippet implements the two specific behaviors that matter most: a genuine **focus trap** while open, and accurate **focus restoration** on close.

**Computing "what's focusable right now," not a static list**

\`getFocusableElements()\` queries the modal for a standard set of naturally-focusable tags and attributes, then filters with \`.offsetParent !== null\` — a reliable way to exclude elements that are present in the DOM but not actually visible (\`display: none\`, or otherwise not rendered). This list is recomputed fresh every time it's needed rather than cached once, so it stays correct even if the modal's content changes while it's open.

**The trap itself: intercepting Tab only at the boundaries**

\`handleKeydown\`'s Tab-handling logic doesn't try to intercept every Tab press — only the two boundary cases that actually matter: \`Shift+Tab\` while focus is on the *first* focusable element (which should wrap to the *last*), and plain \`Tab\` while focus is on the *last* element (which should wrap to the *first*). \`e.preventDefault()\` stops the browser's native tab order from taking over exactly at those two moments; every other Tab press inside the modal is left completely alone, moving focus normally between the modal's own elements — the trap only ever intervenes at the edges.

**Two-way focus restoration, not just "closing the modal"**

\`openModal()\` explicitly records \`document.activeElement\` into \`lastFocusedBeforeOpen\` *before* moving focus into the modal — capturing exactly what had focus at the moment the modal opened, not assuming it was necessarily the trigger button (it could have been reached via keyboard from anywhere). \`closeModal()\` then calls \`.focus()\` on that specific stored element, restoring the user's exact keyboard position rather than leaving focus on \`document.body\` or wherever the modal's own DOM removal happens to leave it — this is what lets a keyboard user continue exactly where they left off after dismissing the dialog.

**Moving focus into the modal immediately on open**

The instant the modal opens, focus is moved to its first focusable element (\`(focusables[0] || modal).focus()\`) rather than left on the now-visually-hidden trigger button behind the overlay — without this, a screen reader user would have no indication the modal even opened, since their reading position wouldn't have moved at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the modal and press Tab repeatedly', text: 'Focus cycles through every focusable element inside the modal and wraps from the last back to the first — it never reaches the trigger button or page behind it.' },
        { title: 'Press Shift+Tab from the first element', text: 'Focus wraps backward to the last focusable element in the modal, completing the trap in both directions.' },
        { title: 'Close the modal via Cancel, Confirm, Escape, or clicking outside', text: 'In every case, keyboard focus returns to exactly the element that had it before the modal opened.' },
        { title: 'Add or remove focusable content inside the modal', text: 'getFocusableElements() re-queries the modal fresh every time it\'s needed, so new inputs, links or buttons are automatically included in the trap with no additional wiring.' },
        { title: 'Reuse this primitive for any modal content', text: 'Swap the fields/buttons inside .modal for your own content — the trap, Escape handling, and focus restoration logic are entirely content-agnostic.' },
      ],
    },
    features: [
      'Genuine focus trap — Tab and Shift+Tab both wrap correctly at the modal\'s actual focusable boundaries',
      'Only intervenes at the trap boundaries, leaving all normal in-modal Tab navigation completely untouched',
      'Focus restoration returns keyboard focus to the exact element that had it before opening, not just "the page"',
      'Focus is moved into the modal immediately on open, so screen reader users are correctly informed a dialog appeared',
      'Focusable elements are recomputed live on every check, correctly handling dynamically added or removed content',
      'Filters out focusable-but-invisible elements via offsetParent, avoiding a trap that includes hidden elements',
      'Escape key and click-outside-to-close both correctly trigger the same accurate focus restoration path',
      'role="dialog" aria-modal="true" with aria-labelledby for correct assistive technology announcement',
    ],
    useCases: [
      { icon: 'A11Y', title: 'Accessible Modal Foundation', desc: 'A correct base to build any modal, dialog, or overlay on top of, rather than reimplementing focus handling each time.' },
      { icon: 'FORM', title: 'Form Dialogs and Confirmations', desc: 'Any modal containing form fields benefits from a real focus trap keeping keyboard input contained correctly.' },
      { icon: 'DESIGN', title: 'Design System Modal Primitive', desc: 'A reference implementation to base a design system\'s modal component on, ensuring accessibility is correct by default.' },
      { icon: 'COMPLIANCE', title: 'Accessibility-Compliant Products', desc: 'Meet WCAG focus-management requirements for modal dialogs without hand-rolling the logic per modal.' },
      { icon: 'CODE', title: 'Related: Long-Press Preview (iOS-Style Peek)', desc: 'See the [Long-Press Preview (iOS-Style Peek)](/ui-snippets/long-press-tooltip-preview/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What specifically counts as "escaping" the focus trap, and how is it prevented?', a: 'Escaping means Tab or Shift+Tab moving focus to an element outside the modal — typically something in the page behind the overlay. The handler intercepts exactly the two boundary presses (Shift+Tab on the first element, Tab on the last) with preventDefault() and manually moves focus back to the opposite end, so the browser\'s native tab order never gets the chance to move focus past the modal\'s own elements.' },
      { q: 'Why record document.activeElement instead of just remembering the trigger button?', a: 'The element that had focus right before the modal opened might not always be the button that triggered it — for example, focus could have been elsewhere and the modal opened programmatically. Capturing the real document.activeElement at that moment guarantees focus is restored to wherever the user actually was, not an assumption about which element triggered the modal.' },
      { q: 'What happens if I add a new input field to the modal while it\'s open?', a: 'getFocusableElements() re-queries the modal\'s DOM every single time it\'s called (on open, and on every Tab keydown), rather than caching a list once — so any dynamically added focusable element is automatically included in the trap boundaries immediately, with no extra code needed.' },
      { q: 'Why filter elements by offsetParent !== null?', a: 'An element can match the focusable-selector query (e.g. a button) while still being invisible due to display:none somewhere in its ancestor chain. offsetParent is null for elements that aren\'t actually rendered, so filtering on it excludes hidden-but-technically-focusable elements from the trap\'s boundary calculation.' },
      { q: 'Does focus move into the modal automatically when it opens?', a: 'Yes — openModal() calls .focus() on the modal\'s first focusable element (or the modal container itself if none exist) immediately after showing it, ensuring both keyboard and screen reader users are correctly directed into the dialog\'s content right away rather than being left on the now-obscured trigger.' },
      { q: 'Does this handle the Escape key and click-outside-to-close consistently?', a: 'Yes — both paths call the same closeModal() function, which always performs the identical focus-restoration behavior (returning focus to the element stored in lastFocusedBeforeOpen), so the accessible behavior doesn\'t vary depending on how the modal was dismissed.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain precisely why the focus trap only needs to intercept Tab at the two boundary elements (rather than intercepting every single Tab press and manually walking the whole focus order), and to discuss what WCAG success criteria this pattern helps satisfy. It's also worth asking for a version that also handles focus trapping correctly when the modal's focusable elements can be dynamically disabled/enabled while it's open, or one that adds an initial-focus override so a specific field (rather than always the first focusable element) receives focus when the modal opens.`,
      prompt: `Build a minimal, fully accessible modal dialog primitive in HTML, CSS and vanilla JavaScript with a correct keyboard focus trap and focus restoration — no external libraries.

Requirements:
- A modal dialog with role="dialog", aria-modal="true", and aria-labelledby pointing to its heading, opened by a trigger button and closable via a Cancel button, a Confirm button, the Escape key, and a click on the overlay outside the modal content.
- Implement a genuine focus trap: while the modal is open, pressing Tab on the last focusable element inside it must wrap focus to the first focusable element, and pressing Shift+Tab on the first focusable element must wrap focus to the last — focus must never be able to reach any element outside the modal via Tab navigation while it's open.
- The set of focusable elements considered for the trap must be computed dynamically each time it's needed (not hardcoded or cached once), so elements added to or removed from the modal while it's open are correctly accounted for, and elements that are present but not visibly rendered must be excluded.
- When the modal opens, record whatever element currently has keyboard focus, then move focus into the modal itself (to its first focusable element). When the modal closes via any of its four closing methods, restore keyboard focus to that exact previously-recorded element rather than leaving it on the page body or nowhere in particular.
- Include a couple of different focusable element types inside the modal (e.g. text inputs, a link, and buttons) to demonstrate the trap correctly spans multiple element types, not just buttons.`,
    },
  },
};

export default focusTrapModalPrimitive;
