const nativeDialogShowcase = {
  id: 'native-dialog-showcase',
  title: 'Native <dialog> Element Showcase',
  lastmod: '2026-08-08',
  category: 'modals',
  html: `<div class="stage">
  <div class="row">
    <div class="demo-block">
      <p class="demo-label">.showModal()</p>
      <button id="open-modal" class="btn btn-primary">Open modal dialog</button>
      <p class="hint">Traps focus, dims background via <code>::backdrop</code>, blocks interaction outside.</p>
    </div>

    <div class="demo-block">
      <p class="demo-label">.show()</p>
      <button id="open-nonmodal" class="btn btn-outline">Open non-modal dialog</button>
      <p class="hint">No backdrop, no focus trap &mdash; page stays fully interactive underneath.</p>
    </div>
  </div>

  <div class="result-panel">
    <p class="result-label">Last <code>returnValue</code></p>
    <p class="result-value" id="return-value">&mdash;</p>
  </div>

  <!-- Modal dialog: form method="dialog", showModal(), backdrop click to close -->
  <dialog id="confirm-dialog" class="dialog modal-dialog">
    <form method="dialog" class="dialog-form">
      <h3 class="dialog-title">Delete this project?</h3>
      <p class="dialog-text">This action can't be undone. The project and all its files will be permanently removed.</p>
      <div class="dialog-actions">
        <button type="submit" value="cancel" class="btn btn-outline">Cancel</button>
        <button type="submit" value="confirm" class="btn btn-danger">Delete</button>
      </div>
    </form>
  </dialog>

  <!-- Non-modal dialog: .show(), no backdrop, page stays interactive -->
  <dialog id="notice-dialog" class="dialog nonmodal-dialog">
    <div class="dialog-form">
      <h3 class="dialog-title">New comment from Alex</h3>
      <p class="dialog-text">"Looks great! Can we bump the spacing on mobile slightly?"</p>
      <div class="dialog-actions">
        <button id="close-nonmodal" class="btn btn-outline">Dismiss</button>
      </div>
    </div>
  </dialog>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.stage { max-width: 720px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 24px; }

.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }

.demo-block {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 22px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start;
  box-shadow: 0 6px 20px rgba(15,23,42,0.05);
}
.demo-label { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.03em; }
.hint { font-size: 11.5px; color: #94a3b8; line-height: 1.6; }
.hint code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 11px; }

.btn { padding: 10px 16px; font-size: 13.5px; font-weight: 600; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }
.btn-outline { background: #fff; color: #334155; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }
.btn-danger { background: #dc2626; color: #fff; }
.btn-danger:hover { background: #b91c1c; }

.result-panel {
  background: #0f172a; border-radius: 12px; padding: 16px 18px;
  display: flex; flex-direction: column; gap: 4px;
}
.result-label { font-size: 11px; font-weight: 700; color: #818cf8; text-transform: uppercase; letter-spacing: 0.03em; }
.result-label code { color: #a5b4fc; }
.result-value { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 14px; color: #f1f5f9; }

/* — Native <dialog> styling — */
.dialog {
  border: none; border-radius: 16px; padding: 0;
  box-shadow: 0 24px 64px rgba(15,23,42,0.22);
  width: 380px; max-width: calc(100vw - 40px);
}

.modal-dialog::backdrop {
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  animation: backdrop-in 0.2s ease-out;
}
@keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }

.modal-dialog {
  animation: dialog-in 0.2s ease-out;
}
@keyframes dialog-in {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Non-modal: no backdrop, positioned in a corner, no entrance blocking */
.nonmodal-dialog {
  margin: 0; position: fixed; top: 24px; right: 24px;
  border: 1px solid #e2e8f0;
}
.nonmodal-dialog[open] { animation: slide-in 0.22s ease-out; }
@keyframes slide-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

.dialog-form { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.dialog-title { font-size: 16px; font-weight: 700; color: #0f172a; }
.dialog-text { font-size: 13.5px; color: #64748b; line-height: 1.6; }
.dialog-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 6px; }`,

  js: `const confirmDialog = document.getElementById('confirm-dialog');
const noticeDialog = document.getElementById('notice-dialog');
const returnValueEl = document.getElementById('return-value');

// --- Modal dialog: showModal(), form method="dialog", backdrop click to close ---
document.getElementById('open-modal').addEventListener('click', () => {
  confirmDialog.showModal();
});

// form method="dialog" automatically sets dialog.returnValue to the clicked
// submit button's value and closes the dialog -- we just react to the close event.
confirmDialog.addEventListener('close', () => {
  returnValueEl.textContent = confirmDialog.returnValue || '(empty — dismissed without a value)';
});

// Click-outside-to-close: only fires when the click target IS the dialog
// itself (the backdrop area), not a descendant inside the dialog content.
confirmDialog.addEventListener('click', event => {
  if (event.target === confirmDialog) {
    confirmDialog.close('backdrop-click');
  }
});

// --- Non-modal dialog: show(), no backdrop, page stays interactive ---
document.getElementById('open-nonmodal').addEventListener('click', () => {
  if (noticeDialog.open) return;
  noticeDialog.show();
});

document.getElementById('close-nonmodal').addEventListener('click', () => {
  noticeDialog.close('dismissed');
});

noticeDialog.addEventListener('close', () => {
  returnValueEl.textContent = noticeDialog.returnValue || '(empty — dismissed without a value)';
});`,

  seo: {
    title: 'Native HTML <dialog> Element Showcase — Free Snippet',
    description: 'Real showModal() and show() dialogs with ::backdrop, form method="dialog" and returnValue — no modal library. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Native HTML <dialog> Element — showModal(), show(), ::backdrop, and returnValue Explained',
      description: `Modal dialogs are one of the most re-implemented components on the web, and for years nearly every one of those implementations was custom: a fixed-position overlay div, a manually managed focus trap, a keydown listener for Escape, and careful \`aria-modal\`/\`role="dialog"\` wiring to make it accessible. The \`<dialog>\` element, standardized and well-supported since 2022 in every evergreen browser, replaces almost all of that boilerplate with a native HTML element that has real browser-implemented modal semantics.

**\`.showModal()\` vs \`.show()\`: the core distinction**

A \`<dialog>\` element can be opened two different ways, and this snippet demonstrates both. Calling \`.showModal()\` opens it as a true modal: the browser automatically traps keyboard focus inside the dialog, disables interaction with the rest of the page (clicking or tabbing to background content is blocked), renders it in the top layer above everything else, and — critically — gives you a free \`::backdrop\` pseudo-element to style the dimming layer behind it. Calling \`.show()\` instead opens it as a **non-modal** dialog: it still floats above normal document flow, but the rest of the page remains fully interactive, there's no focus trap, and there's no \`::backdrop\`. This snippet's "notice" dialog uses \`.show()\` to demonstrate a toast-like, non-blocking notification that the user can ignore while continuing to interact with the page.

**\`form method="dialog"\` and \`returnValue\`**

The confirm dialog wraps its content in \`<form method="dialog">\`. This is a purpose-built HTML feature: when any submit button inside that form is activated, the browser closes the enclosing dialog automatically and sets \`dialog.returnValue\` to the activated button's \`value\` attribute — no JavaScript \`preventDefault()\` or manual \`.close()\` call required for the basic case. In this demo, the Cancel button submits \`value="cancel"\` and Delete submits \`value="confirm"\`; both trigger the same native close mechanism, and a single \`close\` event listener reads \`dialog.returnValue\` afterward to determine which one the user picked, exactly the pattern you'd use to branch your actual delete logic.

**The \`close\` event and backdrop-click dismissal**

Every \`<dialog>\` fires a \`close\` event when it transitions from open to closed, regardless of whether the close happened via \`form method="dialog"\`, a manual \`.close()\` call, or the Escape key (which the browser handles automatically for modal dialogs). This snippet's click handler on the modal dialog checks \`event.target === confirmDialog\` — because the \`<dialog>\` element's padding box technically covers the entire viewport when open as a modal, a click that lands exactly on the \`<dialog>\` itself (rather than bubbling up from a child inside \`.dialog-form\`) means the user clicked the backdrop area, which this demo treats as a cancel.

**\`::backdrop\` styling and why it only exists for \`showModal()\`**

The \`::backdrop\` pseudo-element is generated automatically by the browser only for dialogs opened with \`.showModal()\` — it does not exist for \`.show()\` or for dialogs opened by simply adding the \`open\` attribute in HTML. This is why the non-modal notice dialog in this demo has no dimming behind it: there is no backdrop to style. \`::backdrop\` accepts most standard CSS properties, so animating its \`opacity\` on open (as this demo does with \`animation: backdrop-in\`) is a common way to make the dim-in feel less abrupt than the instant default.

**Why this matters for 2025/2026 UI work**

Focus trapping, top-layer rendering, and Escape-to-close used to be exactly the kind of accessibility-critical logic that justified pulling in a modal library. Native \`<dialog>\` now provides all three for free, correctly implemented by the browser vendor rather than by an application developer, which meaningfully reduces both bundle size and the surface area for subtle focus-management bugs in your own modal code.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the modal dialog', text: 'Click "Open modal dialog" to call confirmDialog.showModal(). Notice that background content becomes unreachable by click or Tab key — the browser automatically traps focus inside the dialog and dims the page behind it using the ::backdrop pseudo-element, all without any custom JavaScript focus-trap code.' },
        { title: 'Submit the form to see returnValue set automatically', text: 'Click Cancel or Delete inside the modal. Both buttons are type="submit" inside a <form method="dialog">, so activating either one closes the dialog automatically and sets dialog.returnValue to that button\'s value attribute ("cancel" or "confirm") with zero manual .close() calls in the click handlers.' },
        { title: 'Click the dimmed backdrop area to cancel', text: 'Reopen the modal and click on the dark dimmed area outside the white panel. The click listener checks event.target === confirmDialog (true only when the click lands on the dialog element itself, not a child inside .dialog-form) and calls confirmDialog.close("backdrop-click") to dismiss it as a cancel.' },
        { title: 'Open the non-modal dialog', text: 'Click "Open non-modal dialog" to call noticeDialog.show() instead of showModal(). Notice there is no dimmed backdrop and the page underneath remains fully interactive — you can still click the modal-dialog button while the notice is open, which is impossible with a showModal() dialog.' },
        { title: 'Check the returnValue readout', text: 'After closing either dialog, the dark panel above updates to show the exact string stored in dialog.returnValue, read inside a shared close event listener pattern that works identically for both the form-submitted modal and the manually-closed non-modal dialog.' },
        { title: 'Reuse the pattern for confirmations and notifications', text: 'For blocking confirmations (delete, discard changes, sign-out), use showModal() with a form method="dialog" and distinct button values. For non-blocking notices (new message, background task complete), use show() and a plain close button calling dialog.close() with your own value string.' },
      ],
    },
    features: [
      'dialog.showModal() opens a true modal with automatic focus trapping and top-layer rendering, no custom JS needed',
      'dialog.show() opens a non-modal dialog that leaves the rest of the page fully interactive, with no ::backdrop',
      '::backdrop pseudo-element styles the dimming layer and only exists for showModal()-opened dialogs',
      'form method="dialog" automatically closes the dialog and sets dialog.returnValue from the submitted button\'s value',
      'Shared close event listener reads dialog.returnValue identically for both the form-submitted and manually-closed dialogs',
      'Backdrop-click-to-close implemented via an event.target === dialog check to distinguish backdrop clicks from content clicks',
      'Native Escape-key dismissal for the modal dialog, handled automatically by the browser with no keydown listener',
      'CSS animations on both the dialog and ::backdrop opacity/transform for a polished, non-jarring open transition',
    ],
    useCases: [
      { icon: 'FORM', title: 'Destructive action confirmations', desc: 'Delete, discard, and sign-out confirmations are the canonical showModal() use case: the user must explicitly choose an option before continuing, which the automatic focus trap and blocked background interaction enforce for free. Reading dialog.returnValue after the close event tells you exactly which button was pressed, replacing a manual boolean flag pattern.' },
      { icon: 'APP', title: 'Non-blocking notification and comment popups', desc: 'New-message toasts, collaborative-editing comment bubbles, and background-task-complete notices fit the .show() non-modal pattern well — they inform the user without interrupting whatever they\'re doing, unlike a showModal() dialog which would forcibly block interaction until dismissed.' },
      { icon: 'FLOW', title: 'Multi-step wizards and settings panels', desc: 'A settings or onboarding wizard can live entirely inside a single showModal()\'d dialog, swapping its inner form content between steps while relying on the same native focus trap and Escape-to-close behavior throughout, rather than re-implementing that logic per step.' },
      { icon: 'CODE', title: 'Replacing modal libraries like react-modal or Headless UI Dialog', desc: 'For dialogs that don\'t need advanced features like nested/stacked modal management, native <dialog> covers focus trapping, top-layer rendering, and backdrop styling with substantially less code, and pairs naturally with the [Native Popover API Demo](/ui-snippets/native-popover-api-demo) which covers the equivalent top-layer mechanism for non-modal menus and tooltips.' },
      { icon: 'LEARN', title: 'Teaching form method="dialog" and native focus management', desc: 'This showcase is a clear way to teach that HTML forms have a purpose-built dialog submission mode most developers have never used, and that browsers implement real, correct focus-trapping for modal dialogs — two facts that surprise many developers who assume all of this always requires a JavaScript library.' },
      { icon: 'DESIGN', title: 'Design systems needing consistent modal and toast primitives', desc: 'Standardizing on <dialog> for both blocking confirmations and non-blocking notices across a design system means every dialog variant shares the same underlying browser-implemented accessibility guarantees, reducing the chance that a hand-rolled modal variant somewhere in the codebase has a subtly broken focus trap or missing Escape handler.' },
      { icon: 'CODE', title: 'Related: Stacked Modal Manager — Multiple Modals on Top of Each Other, Correctly', desc: 'See the [Stacked Modal Manager — Multiple Modals on Top of Each Other, Correctly](/ui-snippets/stacked-modal-manager/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the actual difference between .showModal() and .show()?', a: '.showModal() opens the dialog as a true modal: focus is trapped inside it, the rest of the page becomes inert to clicks and Tab navigation, it renders in the top layer, and a ::backdrop pseudo-element is generated for styling a dimmed background. .show() opens it as a non-modal floating element with none of that — no focus trap, no backdrop, and the rest of the page stays fully interactive, which suits toast-style notifications rather than confirmations.' },
      { q: 'How does form method="dialog" set the returnValue automatically?', a: 'When a <form method="dialog"> is submitted (by clicking any type="submit" button inside it, or pressing Enter in a text field), the browser intercepts the submission, closes the nearest ancestor <dialog>, and sets that dialog\'s returnValue property to the value attribute of whichever submit button triggered it. No JavaScript submit handler or preventDefault() call is needed — you only need a close event listener afterward to read the resulting returnValue.' },
      { q: 'Why check event.target === dialog to detect a backdrop click?', a: 'A <dialog> element\'s box, when open as a modal, effectively covers the full viewport (the visible white panel is its padding/content area, but the element itself extends further). A click that bubbles up with event.target equal to the dialog element itself (rather than a descendant like a button or paragraph inside it) means the click landed outside the visible content — i.e. on the backdrop — so calling dialog.close() at that point implements click-outside-to-dismiss correctly.' },
      { q: 'Does <dialog> handle the Escape key automatically?', a: 'Yes, but only for dialogs opened with .showModal() — pressing Escape fires a cancel event and then closes the dialog automatically with no keydown listener required in your code. Dialogs opened with .show() (non-modal) or via the open attribute do not get this automatic Escape handling, since they aren\'t modal in the first place.' },
      { q: 'Can I style the ::backdrop with a gradient or blur effect?', a: 'Yes — ::backdrop accepts most standard CSS properties including background (solid colors or gradients), backdrop-filter (e.g. blur(2px) as used in this demo), and even its own opacity animation via @keyframes, since it is a real, generated pseudo-element rather than a static browser default. Remember it only exists while the dialog is open via showModal(), and only for that specific dialog instance — you cannot select all backdrops globally with a single ::backdrop rule outside a dialog selector.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain step by step what happens internally between clicking the Delete button and the dark result panel updating — specifically how form method="dialog" avoids needing a submit event handler, and how that connects to the shared close listener reading returnValue. It's also worth asking the assistant why the non-modal notice dialog has no ::backdrop and cannot be dismissed by clicking outside it, since that's a common point of confusion between showModal() and show(). You could ask it to extend the demo with a third dialog demonstrating nested/stacked dialogs (opening a second showModal() dialog from within the first) to see how the browser's top-layer stacking order handles that case.`,
      prompt: `Build a showcase of the native HTML <dialog> element in plain HTML, CSS, and JavaScript demonstrating both modal and non-modal usage.

Requirements:
- A modal dialog opened via dialog.showModal(), containing a <form method="dialog"> with two type="submit" buttons that each set a distinct value attribute (e.g. "cancel" and "confirm"), relying entirely on the browser's native form-dialog submission to close the dialog and set its returnValue — no manual .close() call inside the button click handlers themselves.
- Custom ::backdrop styling on the modal dialog (a semi-transparent dark background, optionally with backdrop-filter blur) plus a subtle CSS entrance animation on both the dialog and its backdrop.
- Backdrop-click-to-dismiss on the modal dialog implemented with a click listener that checks event.target === dialogElement to distinguish a genuine backdrop click from a click bubbling up from content inside the dialog, calling .close() with a distinguishing value when it matches.
- A second, non-modal dialog opened via dialog.show() instead of showModal(), positioned in a corner of the viewport, with no backdrop, that leaves the rest of the page fully interactive and includes its own explicit close button calling dialog.close() with a value string.
- A shared UI element (like a status panel) that listens for the close event on both dialogs and displays the current dialog.returnValue after each close, working identically whether the dialog closed via form submission or a manual .close() call.
- Comments explaining which behaviors (focus trapping, Escape-to-close, top-layer rendering, ::backdrop existence) are automatic browser behavior exclusive to showModal(), versus what still requires explicit code for both modal and non-modal dialogs.`,
    },
  },
};

export default nativeDialogShowcase;
