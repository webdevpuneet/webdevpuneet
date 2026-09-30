const deleteConfirmationModal = {
  id: 'delete-confirmation-modal',
  title: 'Delete Confirmation Modal',
  category: 'modals',
  html: `<button class="trigger-btn" onclick="openModal()">Delete Item</button>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal-box" role="alertdialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
    <div class="modal-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
    </div>
    <h3 id="modalTitle">Delete this item?</h3>
    <p id="modalDesc">This action can't be undone. The item and all of its associated data will be permanently removed.</p>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      <button class="btn-delete" id="confirmDeleteBtn" onclick="confirmDelete()">Delete</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 60px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.trigger-btn {
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  cursor: pointer;
}
.trigger-btn:hover { background: #fee2e2; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 100;
}
.modal-overlay.open { opacity: 1; pointer-events: auto; }

.modal-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  width: 340px;
  text-align: center;
  transform: scale(0.92) translateY(8px);
  transition: transform 0.2s;
  box-shadow: 0 20px 50px rgba(15,23,42,0.25);
}
.modal-overlay.open .modal-box { transform: scale(1) translateY(0); }

.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fef2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.modal-box h3 { font-size: 16px; color: #1e293b; margin-bottom: 8px; }
.modal-box p { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 22px; }

.modal-actions { display: flex; gap: 10px; }
.btn-cancel, .btn-delete {
  flex: 1;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}
.btn-cancel { background: #f1f5f9; color: #475569; }
.btn-cancel:hover { background: #e2e8f0; }
.btn-delete { background: #ef4444; color: #fff; }
.btn-delete:hover { background: #dc2626; }
.btn-delete:focus-visible, .btn-cancel:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }`,
  js: `const overlay = document.getElementById('modalOverlay');
let lastFocused = null;

function openModal() {
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  document.getElementById('confirmDeleteBtn').focus();
  document.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  overlay.classList.remove('open');
  document.removeEventListener('keydown', handleKeydown);
  if (lastFocused) lastFocused.focus();
}

function confirmDelete() {
  // Wire this up to your real delete API call.
  console.log('Item deleted');
  closeModal();
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});`,

  seo: {
    title: 'Delete Confirmation Modal — Free HTML CSS JS Destructive Action Dialog Snippet',
    description: 'A destructive-action confirmation modal with a cancel button and a red confirm-delete button, focus management, Escape-to-close, and click-outside dismissal. Vanilla JS.',
    about: {
      title: 'Delete Confirmation Modal — HTML, CSS & JavaScript Confirmation Dialog',
      description: `Any destructive, irreversible action — deleting an account, a file, or an order — deserves a confirmation step that clearly explains the consequence and makes the destructive choice visually distinct from the safe one. This snippet builds that pattern: a centered dialog with a warning icon, a clear "can't be undone" message, and two buttons where Cancel is styled neutrally and Delete is styled in a warning red, so a rushed click is far more likely to land on the safe option.

**How the open/close animation works**

The overlay covers the full viewport with \`position: fixed; inset: 0\` and starts at \`opacity: 0; pointer-events: none\`. Opening the modal adds an \`.open\` class, which fades the overlay in and simultaneously animates the dialog box itself from a slightly scaled-down, offset position (\`scale(0.92) translateY(8px)\`) up to its resting \`scale(1) translateY(0)\`. Keeping the overlay in the DOM at all times (rather than conditionally rendering it) and toggling opacity/pointer-events is what makes this fade/scale entrance and exit possible — an element removed via \`display: none\` cannot transition.

**How focus is managed for accessibility**

\`openModal()\` stores \`document.activeElement\` (whatever had focus before the modal opened, typically the trigger button) in \`lastFocused\`, then immediately moves focus onto the confirm-delete button. This does two important things: it lets keyboard and screen reader users immediately know what action is available without tabbing, and — because the destructive button most people should still deliberately click rather than hit Enter reflexively — it puts real thought in the user's path since Enter on a freshly-focused destructive button is a common source of complaints if not handled carefully; many teams instead choose to focus Cancel by default for exactly this reason, which is a one-line change here. On \`closeModal()\`, focus is returned to \`lastFocused\`, so keyboard users land back exactly where they started instead of losing their place in the page.

**How Escape and click-outside dismissal work**

A \`keydown\` listener is attached to \`document\` only while the modal is open (added in \`openModal\`, removed in \`closeModal\`) and closes the modal on \`Escape\`. A separate click listener on the overlay checks \`e.target === overlay\` — this is what distinguishes a click on the dark backdrop itself from a click that merely bubbled up from inside the dialog box, since clicking inside the box would also technically "hit" the overlay via event bubbling if this check weren't in place.

**Why the delete button is a placeholder**

\`confirmDelete()\` is deliberately left as a simple stub with a comment marking where real API logic belongs — the pattern here (modal chrome, focus handling, keyboard/click dismissal) is meant to be reused regardless of what the actual destructive action does underneath.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Delete Confirmation Modal" in the sidebar Library tab to load the trigger button and hidden modal.' },
        { title: 'Open and inspect', text: 'Click "Delete Item" in the preview and note the fade/scale entrance and that focus lands on the Delete button.' },
        { title: 'Test dismissal methods', text: 'Try clicking Cancel, clicking the dark backdrop, and pressing Escape — all three should close the modal.' },
        { title: 'Wire the real delete action', text: 'Replace the console.log inside confirmDelete() with your actual API call or state update, then call closeModal() after it succeeds.' },
        { title: 'Customize the copy', text: 'Update the heading and description text in the HTML panel to describe your specific item type and consequence.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this modal pattern across your app\'s destructive actions.' },
      ],
    },
    features: [
      'Fade-and-scale entrance/exit animation via opacity and transform, not display toggling',
      'Focus automatically moves to the dialog on open and returns to the trigger button on close',
      'Escape key closes the modal via a listener attached only while the modal is actually open',
      'Click-outside (backdrop) dismissal correctly distinguishes backdrop clicks from bubbled inner clicks',
      'role="alertdialog", aria-modal, aria-labelledby, and aria-describedby for full screen reader support',
      'Visually distinct destructive (red) vs. safe (neutral) button styling to reduce accidental confirmation',
      'Warning icon and clear, specific "can\'t be undone" copy communicate consequence up front',
      'confirmDelete() left as an obvious, clearly-commented integration point for real delete logic',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Account and data deletion flows', desc: 'Confirm irreversible actions like account deletion, project removal, or permanent record deletion.' },
      { icon: 'FORM', title: 'File and document management', desc: 'Protect users from accidentally deleting files, folders, or attachments with a clear confirmation step.' },
      { icon: 'SHOP', title: 'Cart and order management', desc: 'Confirm removing an entire order or canceling a subscription, where the action has real financial consequence.' },
      { icon: 'DASH', title: 'Admin and CMS content tools', desc: 'Require explicit confirmation before deleting published content, users, or configuration in an admin panel.' },
      { icon: 'ACCESS', title: 'Accessible modal dialog patterns', desc: 'Study a complete example of focus trapping basics, ARIA dialog roles, and keyboard dismissal done correctly.' },
      { icon: 'LEARN', title: 'Learn overlay animation techniques', desc: 'See how keeping a modal in the DOM and toggling opacity/transform enables smooth CSS-only entrance and exit animation.' },
      { icon: 'CODE', title: 'Related: Simple Hover Tooltip — CSS Only, Truly Zero JavaScript', desc: 'See the [Simple Hover Tooltip — CSS Only, Truly Zero JavaScript](/ui-snippets/css-only-simple-hover-tooltip/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the modal stay in the DOM instead of being conditionally rendered?', a: 'Keeping the overlay element present at all times and toggling an .open class lets the fade and scale transitions actually play. An element removed via display:none or conditional rendering has no state to animate from, so it would just appear and disappear instantly.' },
      { q: 'Where should focus go when the modal opens?', a: 'This snippet focuses the Delete button so keyboard users can act immediately, but many teams intentionally focus Cancel instead as a safety default, so an accidental Enter keypress does not trigger the destructive action. Both are valid choices — pick based on how catastrophic the specific delete action is.' },
      { q: 'How does clicking the dark backdrop close the modal without closing when clicking inside the dialog?', a: 'The click listener is attached to the overlay element and checks that e.target is literally the overlay itself, not a descendant. A click inside the dialog box bubbles up through the overlay but its target is the inner element, so the check correctly ignores it.' },
      { q: 'How is keyboard Escape-to-close implemented without leaking a listener?', a: 'The keydown listener is added to the document only inside openModal and explicitly removed inside closeModal, so it does not keep listening (or accumulate duplicate listeners) once the modal is no longer open.' },
      { q: 'How do I wire this to a real delete action?', a: 'Replace the console.log placeholder inside confirmDelete() with your actual API call or state update logic, and call closeModal() once that action completes successfully (or show an error state if it fails).' },
      { q: 'Is this modal accessible to screen reader users?', a: 'Yes — the dialog uses role="alertdialog" with aria-modal="true", and aria-labelledby/aria-describedby point to the heading and description text so screen readers announce the full context immediately when the dialog opens.' },
      { q: 'Does this implement a full focus trap (Tab cycling only within the modal)?', a: 'This snippet handles initial focus placement and focus restoration on close, but does not implement full Tab-key cycling containment. For a production app handling many different dialogs, consider a dedicated focus-trap utility to also intercept Tab and Shift+Tab within the dialog.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain the tradeoffs of focusing the Delete button by default versus focusing Cancel — this is a genuinely debated UX decision, and the assistant can walk through the reasoning for each and help you pick the safer default for your specific destructive action. It's also worth asking the assistant to add a full keyboard focus trap (intercepting Tab and Shift+Tab so focus cycles only within the dialog while it's open), which this snippet intentionally keeps simple by only handling initial focus and restoration.`,
      prompt: `Build a "delete confirmation modal" in plain HTML, CSS, and vanilla JavaScript for confirming a destructive, irreversible action — no library, no framework.

Requirements:
- A trigger button that opens a centered modal dialog over a dimmed full-screen overlay, with a fade-in and slight scale-up entrance animation implemented via CSS transitions on opacity and transform (the overlay must remain in the DOM at all times, not be conditionally rendered).
- The dialog must use role="alertdialog", aria-modal="true", and aria-labelledby/aria-describedby pointing at its heading and description text.
- Two action buttons: a neutrally-styled Cancel button and a clearly red/destructive Delete button, visually distinct enough that a rushed click is unlikely to land on the wrong one.
- On open, move keyboard focus into the dialog. On close (by any method), return focus to whatever element had focus immediately before the dialog opened.
- The dialog must close on: clicking Cancel, clicking the dark backdrop specifically (not a click that merely bubbled up from inside the dialog box), and pressing the Escape key — with the Escape listener added only while the dialog is open and properly removed when it closes.
- Leave the actual delete action as an obviously-commented placeholder function so it is clear where real delete/API logic should be added.`,
    },
  },
};

export default deleteConfirmationModal;
