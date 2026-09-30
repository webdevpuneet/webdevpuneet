const newsletterPopupModal = {
  id: 'newsletter-popup-modal',
  title: 'Newsletter Signup Popup Modal',
  category: 'modals',
  html: `<div class="demo-page">
  <h1>Blog demo page</h1>
  <p>The newsletter popup auto-appears after a short delay on this page. Dismissing it (or subscribing) hides it for the rest of this browser session.</p>
  <button class="demo-trigger" onclick="openNewsletterModal()">Open newsletter popup now</button>
</div>

<div class="modal-overlay" id="newsletterOverlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="newsletterTitle">
    <button class="modal-close" onclick="closeNewsletterModal()" aria-label="Close">&times;</button>
    <div class="modal-icon">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
    </div>
    <h2 id="newsletterTitle">Join 12,000+ subscribers</h2>
    <p>Get one useful email a week — no spam, unsubscribe anytime.</p>
    <form id="newsletterForm">
      <input type="email" id="newsletterEmail" placeholder="you@example.com" required>
      <button type="submit" class="btn primary">Subscribe</button>
    </form>
    <div class="success-msg" id="newsletterSuccess">Thanks — check your inbox to confirm!</div>
    <button class="modal-dismiss" onclick="dismissNewsletterModal()">No thanks</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.demo-page { width: 100%; padding: 60px 24px; max-width: 480px; margin: 0 auto; text-align: center; }
.demo-page h1 { font-size: 22px; color: #1e293b; margin: 0 0 10px; }
.demo-page p { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0 0 20px; }
.demo-trigger {
  background: #1e293b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.demo-trigger:hover { background: #334155; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease;
  z-index: 100;
  padding: 20px;
}
.modal-overlay.visible { opacity: 1; visibility: visible; }

.modal {
  position: relative;
  background: #fff;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 380px;
  width: 100%;
  text-align: center;
  transform: scale(0.92) translateY(10px);
  transition: transform 0.25s ease;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}
.modal-overlay.visible .modal { transform: scale(1) translateY(0); }

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  font-size: 22px;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}
.modal-close:hover { color: #1e293b; }

.modal-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.modal h2 { font-size: 19px; color: #1e293b; margin: 0 0 8px; }
.modal p { font-size: 13.5px; color: #64748b; line-height: 1.5; margin: 0 0 18px; }

#newsletterForm { display: flex; flex-direction: column; gap: 10px; }
#newsletterEmail {
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}
#newsletterEmail:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

.btn.primary {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn.primary:hover { background: #4f46e5; }

.success-msg {
  display: none;
  background: #dcfce7;
  color: #166534;
  border-radius: 8px;
  padding: 12px;
  font-size: 13.5px;
  font-weight: 600;
  margin-top: 6px;
}
.success-msg.visible { display: block; }

.modal-dismiss {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 12.5px;
  margin-top: 14px;
  cursor: pointer;
}
.modal-dismiss:hover { color: #64748b; text-decoration: underline; }`,
  js: `const STORAGE_KEY = 'newsletterPopupDismissed';
const AUTO_SHOW_DELAY = 3000;
const overlay = document.getElementById('newsletterOverlay');

function wasDismissedThisSession() {
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}

function openNewsletterModal() {
  overlay.classList.add('visible');
}

function closeNewsletterModal() {
  overlay.classList.remove('visible');
}

function dismissNewsletterModal() {
  sessionStorage.setItem(STORAGE_KEY, '1');
  closeNewsletterModal();
}

// Close by clicking the dark overlay outside the modal card.
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) dismissNewsletterModal();
});

document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletterForm').style.display = 'none';
  document.getElementById('newsletterSuccess').classList.add('visible');
  sessionStorage.setItem(STORAGE_KEY, '1');
  // In a real app: fetch('/api/subscribe', { method: 'POST', body: ... })
  setTimeout(closeNewsletterModal, 1800);
});

// Auto-open once per session after a short delay, unless already dismissed.
if (!wasDismissedThisSession()) {
  setTimeout(openNewsletterModal, AUTO_SHOW_DELAY);
}`,

  seo: {
    title: 'Newsletter Signup Popup Modal — Free HTML CSS JS Snippet',
    description: 'An auto-appearing newsletter signup modal that remembers dismissal for the session via sessionStorage, so it never nags a visitor twice in one visit.',
    about: {
      title: 'Newsletter Popup Modal — HTML, CSS & JavaScript Signup Snippet',
      description: `A newsletter popup is one of the highest-converting, most-hated UI patterns on the web — high-converting when it appears at a reasonable time and disappears politely, hated when it reappears every single page load. The difference between the two usually comes down to two implementation details: *when* it triggers, and whether it *remembers* being dismissed.

This snippet implements both correctly using **plain HTML, CSS, and vanilla JavaScript**.

**How the delayed auto-show works**

A single \`setTimeout(openNewsletterModal, AUTO_SHOW_DELAY)\` call fires 3 seconds after the page loads (configurable via the \`AUTO_SHOW_DELAY\` constant), rather than showing the modal instantly. This gives a visitor a moment to actually see the page content before being interrupted — a widely recommended practice for popup timing.

**How session-based dismissal memory works**

Before that timeout even fires, the script checks \`sessionStorage.getItem('newsletterPopupDismissed')\`. \`sessionStorage\` (unlike \`localStorage\`) is automatically cleared when the browser tab is closed, so "remembers for the session" specifically means: don't show it again on this visit, but a fresh visit next week starts clean. Three actions all set that flag: closing the modal explicitly, submitting the form successfully, and clicking outside the modal on the dark overlay — all of them count as "the user has made a decision, stop showing this."

**How the open/close animation works**

The overlay is a fixed, full-screen \`rgba\` scrim that transitions \`opacity\` and \`visibility\` together, and the modal card itself scales up from \`0.92\` and slides up slightly (\`translateY(10px)\` to \`0\`) as the \`.visible\` class is applied — a subtle pop-in rather than an instant snap.

**Manually triggering the modal**

The demo page includes an "Open newsletter popup now" button calling \`openNewsletterModal()\` directly, showing that the same modal can be triggered on demand — from an exit-intent listener, a scroll-depth trigger, or a manual "Subscribe" link in your footer — independent of the automatic delayed trigger.

**Closing behavior**

Three separate interactions close the modal: the explicit × button, clicking the dark overlay outside the card, and a successful form submission (which shows a success message for 1.8 seconds before auto-closing). All three funnel through the same \`closeNewsletterModal\`/\`dismissNewsletterModal\` functions so there's a single source of truth for the modal's visibility state.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Newsletter Signup Popup Modal" in the sidebar Library tab. Wait about 3 seconds and the modal auto-appears in the preview.' },
        { title: 'Dismiss it and reload', text: 'Close the modal, then reload the preview — it will not reappear, because sessionStorage remembers the dismissal for this browser tab.' },
        { title: 'Trigger it manually', text: 'Click "Open newsletter popup now" on the demo page to show the modal on demand, independent of the automatic timer.' },
        { title: 'Submit the form', text: 'Enter an email and submit — the form swaps to a success message before the modal auto-closes.' },
        { title: 'Adjust the delay', text: 'In the JS panel, change the AUTO_SHOW_DELAY constant (in milliseconds) to control how long visitors see the page before the popup appears.' },
        { title: 'Wire it to your backend', text: 'Replace the commented-out fetch() placeholder in the submit handler with a real call to your email service provider\'s subscribe endpoint.' },
      ],
    },
    features: [
      'Auto-appears after a configurable delay via setTimeout, not instantly on page load',
      'sessionStorage remembers dismissal so the popup never nags a visitor twice in one visit',
      'Three separate ways to dismiss — close button, outside click, and successful submission — all funnel through one dismissal function',
      'Scale-and-fade pop-in animation driven by a single toggled visible class',
      'Can also be triggered manually and on-demand, independent of the automatic timer',
      'Inline success message replaces the form after subscribing, without navigating away',
      'Accessible dialog markup with role="dialog", aria-modal, and aria-labelledby',
      'Focus-friendly input with a clear focus ring for keyboard users',
      'Backend call left as a clearly marked placeholder, ready for any email provider\'s API',
      'No framework, no popup/modal library, no build step required',
    ],
    useCases: [
      { icon: 'MODAL', title: 'Blog and content site email capture', desc: 'Grow an email list from blog readers without showing the popup on every single page load during one visit.' },
      { icon: 'LEARN', title: 'Learn sessionStorage-based dismissal memory', desc: 'Study the difference between sessionStorage and localStorage and why session-scoped memory is the right choice for a once-per-visit popup.' },
      { icon: 'FLOW', title: 'Prototype a full email-capture strategy', desc: 'Combine this with an exit-intent or scroll-depth trigger by calling openNewsletterModal() from your own custom event listener instead of only the timer.' },
      { icon: 'DESIGN', title: 'Match your brand and offer', desc: 'Restyle the modal card, icon, and copy to reflect your actual newsletter\'s value proposition and subscriber count.' },
      { icon: 'ACCESS', title: 'Build accessible dialog patterns', desc: 'The role="dialog", aria-modal, and aria-labelledby wiring here is a solid reference for any custom modal you build elsewhere on your site.' },
      { icon: 'CODE', title: 'Connect to a real email service provider', desc: 'Wire the submit handler\'s placeholder fetch call to Mailchimp, ConvertKit, or your own backend\'s subscribe endpoint.' },
      { icon: 'CODE', title: 'Related: Multi-Step Wizard Modal with Per-Step Validation Gating', desc: 'See the [Multi-Step Wizard Modal with Per-Step Validation Gating](/ui-snippets/step-validation-gated-wizard-modal/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use sessionStorage instead of localStorage for remembering dismissal?', a: 'sessionStorage is automatically cleared when the browser tab or window closes, so "dismissed for this session" means the popup stays hidden for the rest of the current visit but reappears on a brand new visit later — which is friendlier than localStorage, which would suppress it permanently across every future visit until manually cleared.' },
      { q: 'How do I change how long the page waits before showing the popup?', a: 'Edit the AUTO_SHOW_DELAY constant near the top of the JS panel — it is the number of milliseconds after page load before the popup automatically appears. 3000 means 3 seconds.' },
      { q: 'Can I trigger the popup on scroll depth or exit intent instead of a fixed delay?', a: 'Yes. Remove or keep the setTimeout call and add your own listener — for example a scroll listener checking window.scrollY against a percentage of document height, or a mouseleave listener on the document that fires when the cursor moves toward the top of the viewport — and call openNewsletterModal() from within it.' },
      { q: 'Does clicking outside the modal count as a dismissal?', a: 'Yes. The overlay has a click listener that checks if the click target is the overlay itself (not the modal card), and if so calls dismissNewsletterModal(), which also sets the sessionStorage flag just like the close button does.' },
      { q: 'What happens when the form is submitted?', a: 'The form is hidden and a success message appears in its place, the sessionStorage dismissal flag is set immediately, and the modal automatically closes after about 1.8 seconds. You should replace the commented placeholder with a real fetch call to your email provider\'s API.' },
      { q: 'Is this modal accessible to screen reader and keyboard users?', a: 'The modal has role="dialog", aria-modal="true", and aria-labelledby pointing at its heading, and all interactive elements are real buttons and inputs reachable via Tab. For full production accessibility, also add a focus trap that keeps Tab cycling within the modal while it is open, and return focus to the trigrigger element when it closes.' },
      { q: 'Can I show a discount code instead of just an email capture?', a: 'Yes. Add the code to the modal\'s markup (e.g. inside the success message, revealed after subscribing) or generate one dynamically from your backend\'s response to the subscribe request and inject it into the DOM.' },
      { q: 'How do I stop the popup from ever showing again, even on a new session?', a: 'Switch the storage calls from sessionStorage to localStorage — that persists the dismissal flag indefinitely across browser sessions until the user clears their site data.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain the tradeoffs between sessionStorage and localStorage for popup dismissal memory, and to help you decide which is more appropriate for your specific product's growth goals. It's also a great snippet to extend with the assistant's help — ask it to add an exit-intent trigger using a mouseleave listener on the document that fires only when the cursor moves toward the top of the viewport, to add a focus trap so Tab cycles only within the open modal for full accessibility compliance, or to wire the placeholder subscribe call to a specific email service provider's API (Mailchimp, ConvertKit, or a custom backend) and handle its success/error responses in the existing success-message UI.`,
      prompt: `Build an auto-appearing newsletter signup popup modal in plain HTML, CSS, and JavaScript — no framework, no modal/popup library.

Requirements:
- A modal overlay and card, hidden by default, that automatically opens once via a configurable setTimeout delay after page load — do not show it immediately on load.
- Before showing it, check sessionStorage for a dismissal flag; if the user already dismissed or subscribed earlier in this browser session, do not auto-show the popup again for the rest of the session.
- Three distinct interactions must all count as a dismissal and set that sessionStorage flag: clicking an explicit close button, clicking the dark overlay outside the modal card, and successfully submitting the signup form.
- The modal must also be triggerable manually and on demand via a separate exposed function, independent of the automatic delayed trigger, so it can be wired to other triggers like a footer link or a scroll-based event later.
- On successful form submission, hide the form and show an inline success message in its place (no page navigation), then automatically close the modal after roughly two seconds.
- Include proper dialog accessibility markup — role="dialog", aria-modal="true", and aria-labelledby pointing at the modal's heading — and a smooth scale-and-fade transition driven by a single toggled CSS class, not by adding/removing the modal from the DOM.`,
    },
  },
};

export default newsletterPopupModal;
