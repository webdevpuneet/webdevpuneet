const actionSheet = {
  id: 'action-sheet',
  title: 'Action Sheet',
  lastmod: '2026-07-18',
  category: 'modals',
  html: `<div class="as-demo">
  <button type="button" class="as-open" id="asOpen">Show actions</button>

  <div class="as-root" id="asRoot" aria-hidden="true">
    <div class="as-backdrop" id="asBackdrop"></div>
    <div class="as-sheet" id="asSheet" role="dialog" aria-modal="true" aria-label="Actions">
      <div class="as-grab" aria-hidden="true"></div>
      <p class="as-title">Photo options</p>
      <div class="as-group">
        <button class="as-item">📷 Take photo</button>
        <button class="as-item">🖼 Choose from library</button>
        <button class="as-item">🔗 Copy link</button>
        <button class="as-item as-danger">🗑 Delete photo</button>
      </div>
      <button class="as-item as-cancel" id="asCancel">Cancel</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0c14;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh}

.as-open{background:#6366f1;color:#fff;border:none;border-radius:12px;padding:13px 22px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer}

.as-root{position:fixed;inset:0;z-index:50;visibility:hidden}
.as-root.open{visibility:visible}
.as-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);opacity:0;transition:opacity .3s}
.as-root.open .as-backdrop{opacity:1}

.as-sheet{position:absolute;left:0;right:0;bottom:0;padding:8px 12px max(14px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:8px;transform:translateY(100%);transition:transform .34s cubic-bezier(.32,.72,0,1);touch-action:none}
.as-root.open .as-sheet{transform:translateY(0)}
.as-grab{width:38px;height:5px;border-radius:3px;background:#3a3a52;margin:2px auto 6px}
.as-title{text-align:center;font-size:12.5px;color:#8b8ba3;padding:4px 0 8px}

.as-group{background:#1b1b2b;border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.as-item{background:none;border:none;border-bottom:1px solid #26263c;color:#e8e8f4;font-family:inherit;font-size:16px;font-weight:600;padding:16px;cursor:pointer;text-align:center;transition:background .15s}
.as-group .as-item:last-child{border-bottom:none}
.as-item:active{background:#26263c}
.as-danger{color:#fb7185}
.as-cancel{background:#1b1b2b;border-radius:16px;font-weight:800}`,

  js: `var root = document.getElementById('asRoot');
var sheet = document.getElementById('asSheet');
var lastFocus = null;

function open() {
  lastFocus = document.activeElement;
  root.classList.add('open'); root.setAttribute('aria-hidden', 'false');
}
function close() {
  root.classList.remove('open'); root.setAttribute('aria-hidden', 'true');
  sheet.style.transform = '';
  if (lastFocus) lastFocus.focus();
}

document.getElementById('asOpen').addEventListener('click', open);
document.getElementById('asCancel').addEventListener('click', close);
document.getElementById('asBackdrop').addEventListener('click', close);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) close(); });

// Swipe-down to dismiss: drag the sheet, and if pulled far/fast enough, close.
var startY = 0, dy = 0, dragging = false, t0 = 0;
sheet.addEventListener('pointerdown', function (e) {
  dragging = true; startY = e.clientY; dy = 0; t0 = Date.now();
  sheet.style.transition = 'none';
  sheet.setPointerCapture(e.pointerId);
});
sheet.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  dy = Math.max(0, e.clientY - startY);     // only allow downward drag
  sheet.style.transform = 'translateY(' + dy + 'px)';
});
sheet.addEventListener('pointerup', function () {
  if (!dragging) return;
  dragging = false;
  sheet.style.transition = '';
  var fast = dy / (Date.now() - t0) > 0.5;
  if (dy > 110 || fast) close();
  else sheet.style.transform = 'translateY(0)';
});`,

  seo: {
    title: 'Action Sheet — Free HTML CSS JS iOS Bottom Sheet Snippet',
    description: `An iOS-style action sheet that slides up with grouped options, a cancel button, swipe-to-dismiss, backdrop, and Escape. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Action Sheet — iOS-Style Slide-Up Options With Swipe Dismiss',
      description: `The action sheet is the iOS-style contextual menu that slides up from the bottom of the screen with a grouped list of options and a separate cancel button — the native way mobile apps present "what do you want to do with this?" choices. This snippet builds it with plain HTML, CSS, and vanilla JavaScript, including the swipe-down-to-dismiss gesture that makes it feel native.

**The slide-up transition**

The sheet is anchored to the bottom with \`position: absolute; bottom: 0\` and is hidden by translating it fully below the screen (\`translateY(100%)\`). Adding an \`.open\` class transitions it to \`translateY(0)\`, sliding it up into view, while the backdrop fades in. The transition uses \`cubic-bezier(.32, .72, 0, 1)\` — a decisive ease-out that mimics the iOS sheet feel, fast at first and gently settling. A \`visibility\` toggle on the root keeps the whole thing non-interactive when closed.

**Grouped options and a separate cancel**

The layout follows the platform convention: primary options sit together in one rounded group with hairline separators, and Cancel is a visually detached button below it. Destructive actions like Delete are tinted red. This grouping is purely structural CSS, but it is what makes the sheet read as a familiar action sheet rather than a generic menu — the separation signals that Cancel is distinct from the choices.

**Swipe-down to dismiss**

The native-feeling part is the drag gesture. On \`pointerdown\` the sheet captures the pointer and disables its transition; on \`pointermove\` it follows the finger but only downward (\`Math.max(0, deltaY)\`), so you can pull it toward dismissal. On release, it decides using both distance and velocity: if you have dragged past 110px or flicked quickly (computed from drag distance over time), it closes; otherwise it snaps back to fully open by restoring the transition. Honoring velocity as well as distance is why a quick flick dismisses even a short drag — exactly how iOS sheets behave. A grab handle at the top hints that the sheet is draggable.

**Full dismissal and focus**

Beyond the swipe, the sheet closes via the Cancel button, a tap on the dimmed backdrop, and the Escape key. It is marked up as \`role="dialog"\` with \`aria-modal="true"\`, and it stores the previously focused element on open and restores focus to it on close — the correct focus handling for a modal. The root toggles \`aria-hidden\` so assistive tech ignores it while closed.

**Safe-area aware**

The sheet pads its bottom with \`env(safe-area-inset-bottom)\` so its content clears the home indicator on notched phones, a detail that separates a real mobile sheet from a desktop-only one.

**Customizing it**

Change the options and their icons, restyle or recolor the groups, adjust the slide easing and the dismissal thresholds (distance and velocity), or add a title and message. Replace the demo options with real handlers. Pair it with a [bottom sheet](/ui-snippets/bottom-sheet/) for taller content or a [snackbar undo](/ui-snippets/snackbar-undo/) to confirm a destructive choice.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A button renders; clicking it slides up an action sheet.` },
      { title: 'Review the options', text: `Grouped choices appear with a separate Cancel below.` },
      { title: 'Swipe the sheet down', text: `Drag past a threshold or flick to dismiss it.` },
      { title: 'Or tap the backdrop', text: `Tapping outside or pressing Escape also closes it.` },
      { title: 'Edit the options', text: `Change the items, icons, and danger styling.` },
      { title: 'Tune the gesture', text: `Adjust the dismissal distance and velocity.` },
    ] },
    features: [
      { title: 'iOS slide-up', text: `Bottom-anchored sheet with an ease-out curve.` },
      { title: 'Grouped options', text: `Rounded group with a detached Cancel.` },
      { title: 'Destructive styling', text: `Danger actions tinted red.` },
      { title: 'Swipe-to-dismiss', text: `Drag down, decided by distance and velocity.` },
      { title: 'Snap-back', text: `A short drag returns the sheet to open.` },
      { title: 'Full dismissal', text: `Cancel, backdrop, and Escape.` },
      { title: 'Modal focus', text: `Focus stored and restored on close.` },
      { title: 'Safe-area padding', text: `Clears the home indicator on notched phones.` },
    ],
    useCases: [
      { title: 'Mobile option menus', text: 'Present choices like a native iOS action sheet that slides up with grouped options and a detached Cancel button.' },
      { title: 'Photo and file actions', text: 'Pair with a [media upload grid](/ui-snippets/media-upload-grid/) so tapping an item offers rename, share and delete in one sheet.' },
      { title: 'Share and export choices', text: 'Offer an alternative to a [share modal](/ui-snippets/share-modal/) on mobile for share and export choices, with destructive options tinted red as on iOS.' },
      { title: 'Destructive confirmations', text: 'Follow a dangerous choice with a [snackbar undo](/ui-snippets/snackbar-undo/), using Escape and a tap on the backdrop as extra ways to dismiss.' },
      { title: 'Taller content and swipe learning', text: 'Step up to a [bottom sheet](/ui-snippets/bottom-sheet/) when options need more room, and study swipe dismissal decided by both distance and velocity.' },
      { icon: 'CODE', title: 'Related: Achievement Unlock Toast', desc: 'See the [Achievement Unlock Toast](/ui-snippets/achievement-unlock-toast/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sign In / Sign Up Modal with Tabs', desc: 'See the [Sign In / Sign Up Modal with Tabs](/ui-snippets/modal-auth-signin-signup-tabs/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Onboarding Checklist Modal with Progress Ring', desc: 'See the [Onboarding Checklist Modal with Progress Ring](/ui-snippets/modal-onboarding-checklist-progress/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Booking Date Range Picker Modal', desc: 'See the [Booking Date Range Picker Modal](/ui-snippets/modal-date-range-picker/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the swipe-to-dismiss decide whether to close?', a: `On release it checks both distance and velocity: if you have dragged the sheet past 110px or flicked it quickly — computed as drag distance over elapsed time — it closes; otherwise it snaps back to fully open. Honoring velocity as well as distance is why a fast flick dismisses even a short drag, matching how native iOS sheets behave.` },
      { q: 'Why does the drag only move the sheet downward?', a: `On pointermove the offset is clamped with Math.max(0, deltaY), so dragging up does nothing and only downward movement translates the sheet. That mirrors the platform behavior where a sheet can be pulled toward dismissal but not lifted above its open position.` },
      { q: 'How is the iOS slide feel achieved?', a: `The sheet sits below the screen at translateY(100%) and transitions to translateY(0) when opened, using cubic-bezier(.32,.72,0,1) — a decisive ease-out that is fast at first and settles gently, like the native sheet. During a drag the transition is disabled so the sheet tracks the finger, then restored on release for the snap-back or close.` },
      { q: 'Is it accessible and safe-area aware?', a: `It is marked role="dialog" with aria-modal, stores and restores focus around open and close, toggles aria-hidden on the root, and closes on Escape and backdrop tap as well as the swipe. It also pads the bottom with env(safe-area-inset-bottom) so its content clears the home indicator on notched phones.` },
      { q: 'How do I use this action sheet in React, Vue, or Angular?', a: `Drive the open state from component state and render the sheet conditionally or toggle the class. Implement the drag with pointer handlers writing the transform via a ref so it does not re-render each move, and keep the distance/velocity logic in the pointerup handler. Add Escape and focus restoration in effects with cleanup. In Tailwind, use translate-y utilities and an arbitrary cubic-bezier transition.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the pointer-event math yourself — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the swipe-to-dismiss handler combines drag distance and velocity (drag distance divided by elapsed time) to decide between closing and snapping back, and why the transition is disabled during the drag but restored afterward. The same assistant is useful for optimizing it — asking whether setPointerCapture could be replaced or supplemented to better handle multi-touch edge cases, or whether the velocity threshold needs tuning for slower devices. It's just as good for extending the sheet: ask it to add a second, taller "expanded" snap position like a real bottom sheet, support keyboard arrow-key navigation between the listed actions, or generalize the options list to be data-driven instead of hardcoded markup. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an iOS-style "action sheet" in plain HTML, CSS, and JavaScript using the Pointer Events API for the drag gesture — no libraries, no touch-event-only fallback.

Requirements:
- A sheet anchored to the bottom of the viewport with position: fixed/absolute, starting fully off-screen via transform: translateY(100%), and a semi-transparent backdrop behind it that fades in independently.
- Adding an "open" class must transition the sheet to translateY(0) using an ease-out cubic-bezier curve that feels fast-then-settling (not linear), while the backdrop opacity animates in parallel.
- Structure the options as one visually grouped block of buttons with hairline dividers between them, plus a visually separate "Cancel" button below the group, and support a distinct "danger" style for destructive actions like Delete.
- Implement swipe-down-to-dismiss using pointerdown/pointermove/pointerup: on pointerdown, capture the pointer and disable the CSS transition; on pointermove, clamp the vertical delta so the sheet can only be dragged downward (never upward past its resting position) and update the transform directly; on pointerup, decide whether to close based on BOTH how far it was dragged (a distance threshold) AND how fast (drag distance divided by elapsed time, a velocity threshold) — closing if either threshold is exceeded, otherwise re-enabling the transition and snapping back to fully open.
- Close the sheet via the Cancel button, a click on the backdrop, and the Escape key, and mark the sheet with role="dialog" and aria-modal="true", storing the previously focused element on open and restoring focus to it on close.
- Pad the sheet's bottom safe area using env(safe-area-inset-bottom) so it clears the home indicator on notched phones.`,
    },
  },
};

export default actionSheet;
