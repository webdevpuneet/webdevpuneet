const liveRegionAnnouncerDemo = {
  id: 'live-region-announcer-demo',
  title: 'Live Region Announcer Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <div class="product-card">
    <div class="product-thumb" aria-hidden="true">&#128092;</div>
    <div class="product-info">
      <h2>Canvas Weekender Bag</h2>
      <p class="product-price">$68.00</p>
      <button class="add-btn" id="addBtn">Add to cart</button>
    </div>
  </div>

  <!-- Visual toast: sighted users see this, but it is not reliably announced
       by screen readers on its own and disappears quickly. -->
  <div class="toast" id="toast" role="presentation"></div>

  <!-- The actual accessibility fix: a visually-hidden, always-present region
       marked aria-live="polite". A screen reader announces any text written
       into it, without moving focus and without anything appearing on screen. -->
  <div class="sr-only" id="liveRegion" aria-live="polite" aria-atomic="true"></div>

  <div class="explainer">
    <h3>What a screen reader hears</h3>
    <p id="lastAnnouncement" class="last-announcement">Nothing announced yet — click "Add to cart".</p>
    <p class="cart-count" id="cartCount">Cart: 0 items</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #0b0c14; color: #e7e9f5; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 480px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 20px; }

.product-card { display: flex; gap: 16px; align-items: center; background: linear-gradient(160deg,#181c2c,#11131e); border: 1px solid #262c42; border-radius: 16px; padding: 20px; position: relative; }
.product-thumb { font-size: 40px; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; background: #1f2438; border-radius: 12px; flex-shrink: 0; }
.product-info h2 { font-size: 17px; margin-bottom: 4px; }
.product-price { color: #9aa0b8; font-size: 14px; margin-bottom: 12px; }
.add-btn { font-family: inherit; font-size: 13.5px; font-weight: 700; background: #6366f1; color: #fff; border: none; padding: 10px 18px; border-radius: 9px; cursor: pointer; }
.add-btn:hover { background: #4f46e5; }
.add-btn:focus-visible { outline: 3px solid #a5b4fc; outline-offset: 2px; }

/* Visual toast — a nice touch for sighted users, but NOT an accessibility
   solution on its own: it can be missed, dismissed, or simply not detected
   as new content by assistive tech depending on how it is inserted. */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 12px);
  background: #16a34a;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
}
.toast.show { opacity: 1; transform: translate(-50%, 0); }

/* The correct "screen-reader only" pattern: the element stays in normal
   layout flow and remains fully in the accessibility tree, but is clipped
   to a 1px box and pulled out of the visual viewport. NEVER use
   display:none or visibility:hidden here — both remove the element from
   the accessibility tree, so a live region hidden that way would never be
   announced at all. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.explainer { background: #12131f; border: 1px solid #232a3d; border-radius: 14px; padding: 16px 18px; }
.explainer h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 8px; }
.last-announcement { font-size: 13.5px; color: #cbd5e1; line-height: 1.6; font-family: 'SFMono-Regular', Consolas, monospace; }
.cart-count { margin-top: 10px; font-size: 12.5px; color: #7dd3fc; font-weight: 600; }`,

  js: `const addBtn = document.getElementById('addBtn');
const toast = document.getElementById('toast');
const liveRegion = document.getElementById('liveRegion');
const lastAnnouncement = document.getElementById('lastAnnouncement');
const cartCount = document.getElementById('cartCount');

let count = 0;
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function announce(message) {
  // Clearing first, then setting the text on the next frame, forces screen
  // readers to treat this as a fresh announcement even if the message text
  // is identical to the previous one (e.g. clicking "Add to cart" twice in
  // a row). Without the clear step, an unchanged textContent value may not
  // fire a fresh accessibility event.
  liveRegion.textContent = '';
  requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
  lastAnnouncement.textContent = 'Live region says: \\u201c' + message + '\\u201d';
}

addBtn.addEventListener('click', () => {
  count += 1;
  const message = 'Canvas Weekender Bag added to cart. Cart now has ' + count + (count === 1 ? ' item.' : ' items.');

  showToast('Added to cart');
  announce(message);
  cartCount.textContent = 'Cart: ' + count + (count === 1 ? ' item' : ' items');
});`,

  seo: {
    title: 'Live Region Announcer Demo — Free ARIA aria-live Toast Pattern',
    description: `An "Add to cart" toast that also announces itself through a visually-hidden aria-live="polite" region, so screen reader users get the same confirmation sighted users see. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Region Announcer Demo — Toasts That Are Actually Announced',
      description: `A visual toast that pops up, sits for two seconds, and fades away is a completely normal UI pattern — and completely invisible to a screen reader user unless the underlying element is wired up correctly. This snippet shows the two-part pattern that makes a confirmation message actually accessible: a visible toast for sighted users, plus a separate, visually-hidden \`aria-live="polite"\` region that receives the exact same message and gets announced automatically by assistive technology, with no focus change and nothing appearing on screen.

**Why the toast alone isn't enough**

Screen readers only announce dynamic content automatically when it lives inside a region the browser has marked as "live." A plain \`<div>\` that gets new \`textContent\` — even if it's visually obvious, colorful, and animated — is invisible to assistive technology unless it (or an ancestor) carries \`aria-live\`, \`role="status"\`, or \`role="alert"\`. This is one of the most common accessibility gaps in production apps: the toast looks done, ships, and passes every visual QA pass, while screen reader users never learn their action succeeded.

**The sr-only pattern, done correctly**

The hidden region uses \`position: absolute\`, a 1px×1px box, \`overflow: hidden\`, and \`clip: rect(0,0,0,0)\` — never \`display: none\` or \`visibility: hidden\`. Those two properties remove an element from the accessibility tree entirely, which means a live region hidden that way would never be announced at all, defeating its entire purpose. The sr-only technique keeps the element rendered (just clipped to nothing visually), so it stays fully present for assistive technology while being completely invisible on screen — the same off-screen principle used by [the accessible skip-to-content link](/ui-snippets/skip-to-content-link/).

**Forcing re-announcement of identical messages**

A live region only announces when its content actually changes. Clicking "Add to cart" twice in a row would produce the exact same message string, and some screen readers won't re-announce unchanged text. The JS clears \`liveRegion.textContent\` first, then sets the new message on the next animation frame — a small but necessary trick that guarantees a fresh mutation the accessibility tree can detect, even when the words are identical to last time.

**polite vs assertive**

This demo intentionally uses \`aria-live="polite"\`, which waits for the screen reader to finish whatever it's currently saying before announcing the new message — appropriate for a routine confirmation like a cart update. Time-critical or error messages instead want \`aria-live="assertive"\`, which interrupts immediately; see [the ARIA live status badge](/ui-snippets/aria-live-status-badge/) for a side-by-side comparison of the two politeness levels.

**Where this pattern belongs**

Any UI that confirms an action visually — form submissions, cart updates, saved-settings toasts, filter-applied banners — needs this same two-part treatment if it wants to be usable with a screen reader. Pair it with [the toast notification component](/ui-snippets/toast-notification/) for the visual half, or [the notification center](/ui-snippets/notification-center/) for a persistent log of the same announcements.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Add to cart"', text: `A green toast slides up from the bottom for about two seconds.` },
      { title: 'Check the live region text', text: `The panel below shows exactly what was written into the hidden aria-live region — the same message a screen reader would speak.` },
      { title: 'Click it again', text: `The cart count increments and a fresh announcement fires even though the message text is nearly identical.` },
      { title: 'Turn on a screen reader', text: `With VoiceOver, NVDA, or JAWS running, click the button — you'll hear the confirmation spoken with no visual toast required.` },
      { title: 'Inspect the sr-only CSS', text: `Note it uses clip/position, never display:none, so the region stays in the accessibility tree.` },
      { title: 'Swap in your own action', text: `Replace the button and message with any confirmation your UI needs to announce.` },
    ] },
    features: [
      { title: 'Dual confirmation', text: `A visible toast plus a hidden aria-live region carry the same message.` },
      { title: 'Correct sr-only CSS', text: `Uses clip/absolute positioning, never display:none, so it stays announceable.` },
      { title: 'polite politeness', text: `Waits for any current speech to finish before announcing.` },
      { title: 'aria-atomic="true"', text: `Announces the whole message, not just the changed fragment.` },
      { title: 'Forced re-announcement', text: `Clears then re-sets text so repeat identical messages still fire.` },
      { title: 'No focus theft', text: `Announcing never moves keyboard focus away from the button.` },
      { title: 'Live cart counter', text: `A visible running total mirrors what's spoken.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS and JS — no ARIA library required.` },
    ],
    useCases: [
      { title: 'Cart and checkout flows', text: 'Announce add, remove and quantity changes to screen reader users, through a visually hidden `aria-live="polite"` region matching the visible toast.' },
      { title: 'Form submission confirmation', text: 'Confirm that a save succeeded even if the visual message has already faded, with `aria-atomic="true"` announcing the whole message.' },
      { title: 'Filter and search results', text: 'Announce an updated result count, using clip-based sr-only CSS rather than `display: none`, which would remove the region from assistive technology.' },
      { title: 'Settings toggles', text: 'Confirm a preference change like a [dark mode toggle](/ui-snippets/dark-mode-toggle/), with polite politeness waiting for current speech to finish.' },
      { title: 'Toast and notification retrofits', text: 'Retrofit an existing [toast notification](/ui-snippets/toast-notification/) or feed the same text into a [notification center](/ui-snippets/notification-center/), compared with the [ARIA live status badge](/ui-snippets/aria-live-status-badge/).' },
      { icon: 'CODE', title: 'Related: Resume Upload Dropzone', desc: 'See the [Resume Upload Dropzone](/ui-snippets/resume-upload-dropzone/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why isn\'t a plain, visible toast enough for accessibility?', a: `Screen readers only automatically announce dynamic content inside an element marked as "live" (aria-live, role="status", or role="alert"). A plain div that gets new text, no matter how visually obvious, is silent to assistive technology unless it or an ancestor carries one of those attributes — so the toast can look completely finished while never being announced.` },
      { q: 'Why use clip/position instead of display:none to hide the live region?', a: `display:none and visibility:hidden both remove an element from the accessibility tree entirely, which means a live region hidden that way could never be announced — the exact opposite of what you want. The sr-only pattern keeps the element in the layout and accessibility tree while clipping it to a 1px box, so it is invisible on screen but still fully readable by assistive technology.` },
      { q: 'Why clear the text before setting it again?', a: `A live region only announces when its content changes. If you click "Add to cart" twice and the message string is identical both times, some screen readers won\'t detect a change and stay silent. Clearing textContent first, then setting the new message on the next frame, guarantees a real mutation the accessibility tree can pick up, even for repeated identical messages.` },
      { q: 'Should this be aria-live="polite" or "assertive"?', a: `Routine, non-urgent confirmations like a cart update should use polite, which waits for any current speech to finish so it never interrupts the user mid-sentence. Reserve assertive for urgent or error conditions that truly need to interrupt immediately — see the ARIA live status badge snippet for a direct comparison of the two.` },
      { q: 'Can I use role="status" instead of aria-live="polite"?', a: `Yes — role="status" is implicitly aria-live="polite" and aria-atomic="true" in most browsers, so it is a reasonable shorthand for exactly this pattern. Explicitly setting aria-live="polite" alongside aria-atomic="true" as this snippet does is more verbose but leaves no ambiguity about the intended behavior across browser/AT combinations.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why a visible toast alone fails screen reader users, and how the sr-only CSS pattern differs from display:none in terms of what stays in the accessibility tree. It's also a good prompt for auditing your own toast or notification component — ask the assistant to check whether your existing implementation has a paired live region, and if not, to add one using this same clear-then-set trick for forcing re-announcement of repeated messages. You can also ask it to extend the pattern to a queue, so multiple rapid actions get announced in sequence rather than one message clobbering the next before it's spoken. Treat this less as a finished widget and more as the reference case for making any toast, banner, or inline confirmation genuinely accessible.`,
      prompt: `Build an "Add to cart" button in plain HTML, CSS, and JavaScript that is accessible to screen reader users, not just sighted users.

Requirements:
- A visible toast notification that appears briefly (around 2 seconds) when the button is clicked, confirming the action with a message and an incrementing cart count.
- A separate, always-present element marked aria-live="polite" and aria-atomic="true" that receives the exact same confirmation message as the toast, so screen readers announce it automatically with no extra JavaScript speech API required.
- The live region must be visually hidden using the correct "screen-reader only" CSS technique: position:absolute, a 1px by 1px box, overflow:hidden, and clip:rect(0,0,0,0) — explicitly do NOT use display:none or visibility:hidden, since both remove an element from the accessibility tree and would make the live region silently unannounceable.
- Handle the case where the button is clicked multiple times in a row with a nearly identical message: clear the live region's text content first, then set the new message on the next animation frame, so a screen reader treats it as a fresh change and re-announces it even when the text is the same or very similar to what was just announced.
- The announcement must not move keyboard focus away from the button.
- Add a small on-page panel that displays exactly what text was just written into the hidden live region, purely so a sighted developer can verify what a screen reader would hear without needing one running.`,
    },
  },
};

export default liveRegionAnnouncerDemo;
