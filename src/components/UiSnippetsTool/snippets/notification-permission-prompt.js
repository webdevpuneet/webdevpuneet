const notificationPermissionPrompt = {
  id: 'notification-permission-prompt',
  title: 'Notification Permission Prompt',
  lastmod: '2026-06-20',
  category: 'modals',
  html: `<div class="npp-page">
  <button type="button" class="npp-trigger" id="nppTrigger">Open app preview</button>
</div>

<div class="npp-backdrop" id="nppBackdrop"></div>
<div class="npp-card" id="nppCard" role="dialog" aria-label="Enable notifications">
  <div class="npp-icon">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  </div>
  <h3>Stay in the loop</h3>
  <p>Get notified when someone replies, mentions you, or your tasks are due — turn it off anytime in Settings.</p>
  <div class="npp-actions">
    <button type="button" class="npp-allow" id="nppAllow">Allow notifications</button>
    <button type="button" class="npp-dismiss" id="nppDismiss">Not now</button>
  </div>
  <div class="npp-result" id="nppResult" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}

.npp-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.npp-trigger{background:#1e293b;color:#fff;border:none;border-radius:10px;padding:12px 22px;font-size:14px;font-weight:700;cursor:pointer}

.npp-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.35);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.npp-backdrop.show{opacity:1;pointer-events:all}

.npp-card{position:fixed;left:50%;bottom:26px;transform:translate(-50%,16px) scale(.96);opacity:0;pointer-events:none;
  width:min(360px,90vw);background:#fff;border-radius:16px;padding:22px;box-shadow:0 24px 60px rgba(15,23,42,.25);
  text-align:center;z-index:91;transition:opacity .22s,transform .22s}
.npp-card.show{opacity:1;transform:translate(-50%,0) scale(1);pointer-events:all}

.npp-icon{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;animation:nppRing 2.2s ease-in-out infinite}
@keyframes nppRing{0%,100%{transform:rotate(0)}4%{transform:rotate(-12deg)}8%{transform:rotate(10deg)}12%{transform:rotate(-8deg)}16%{transform:rotate(4deg)}20%{transform:rotate(0)}}

.npp-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:8px}
.npp-card p{font-size:13px;color:#64748b;line-height:1.55;margin-bottom:18px}

.npp-actions{display:flex;flex-direction:column;gap:9px}
.npp-allow{background:#6366f1;color:#fff;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.npp-allow:hover{background:#4f46e5}
.npp-dismiss{background:transparent;color:#94a3b8;border:none;padding:6px;font-size:13px;font-weight:600;cursor:pointer}
.npp-dismiss:hover{color:#64748b}

.npp-result{margin-top:14px;padding:9px 12px;border-radius:8px;font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:7px;justify-content:center}
.npp-result.granted{background:#ecfdf5;color:#047857}
.npp-result.denied{background:#fef2f2;color:#b91c1c}
.npp-result.dismissed{background:#f1f5f9;color:#64748b}`,

  js: `var backdrop = document.getElementById('nppBackdrop');
var card = document.getElementById('nppCard');
var result = document.getElementById('nppResult');

function openPrompt() {
  result.hidden = true;
  result.className = 'npp-result';
  backdrop.classList.add('show');
  card.classList.add('show');
}

function closePrompt() {
  backdrop.classList.remove('show');
  card.classList.remove('show');
}

document.getElementById('nppTrigger').addEventListener('click', openPrompt);
backdrop.addEventListener('click', closePrompt);

document.getElementById('nppAllow').addEventListener('click', function () {
  // A real implementation calls the browser API directly; this soft-ask happens
  // first so the OS-level prompt only appears once the user has opted in here.
  if (window.Notification && Notification.requestPermission) {
    Notification.requestPermission().then(showOutcome).catch(function () { showOutcome('denied'); });
  } else {
    showOutcome('granted');
  }
});

document.getElementById('nppDismiss').addEventListener('click', function () {
  showOutcome('dismissed');
});

function showOutcome(state) {
  var messages = {
    granted: '✓ Notifications enabled — you\\'re all set.',
    denied: '✕ Notifications blocked. You can enable them later in your browser settings.',
    dismissed: 'No problem — you can turn this on later in Settings.',
  };
  result.textContent = messages[state] || messages.dismissed;
  result.className = 'npp-result ' + state;
  result.hidden = false;
  setTimeout(closePrompt, 1600);
}`,

  seo: {
    title: 'Notification Permission Prompt — Custom Soft-Ask UI',
    description: `A custom "Allow notifications?" soft-ask card that asks before the native browser permission dialog. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Notification Permission Prompt — Custom Soft-Ask Before the Native Browser Dialog',
      description: `Calling \`Notification.requestPermission()\` cold — the moment a page loads, with no context — is one of the most reliably rejected UX patterns on the web: browsers show a single native dialog with no second chance, so a denied click can never be re-asked without the user manually changing browser settings. The fix growth and product teams use is a "soft-ask": a custom, on-brand modal that explains *why* notifications are useful and only triggers the real, one-shot browser permission prompt once the user has already said yes once. This snippet builds that soft-ask pattern end to end.

**Why the soft-ask exists**

Once a user clicks "Block" on the native browser dialog, that origin can never show the prompt again programmatically — the only way back is the user manually re-enabling it in browser settings, which almost never happens. A soft-ask modal lets you absorb that first, context-free "no" yourself: dismissing *this* modal costs nothing and can be shown again later, while only an explicit "Allow" click spends the one real, irreversible browser prompt.

**Three distinct outcomes**

Clicking Allow calls the real \`Notification.requestPermission()\` API (falling back to a simulated "granted" state in environments where the Notification API isn't available, like this sandboxed preview) and reports back one of three states: \`granted\`, \`denied\`, or \`dismissed\` (for the "Not now" button, which never touches the browser API at all). Each state gets its own message and color — green for granted, red for denied, neutral gray for dismissed — so the user always knows exactly what just happened.

**Entrance and dismissal**

The card sits fixed near the bottom of the viewport, the position most native browser permission prompts use, so the soft-ask visually rehearses where the real dialog will appear next. It animates in with \`opacity\` and \`transform\` only (translateY plus a slight scale), and a backdrop click dismisses it the same as clicking "Not now" — both routed through the same \`closePrompt()\` so there's only one dismissal code path to maintain.

**The shaking bell icon**

The bell icon plays a short multi-keyframe rotation loop on repeat — a few quick alternating tilts followed by a pause — mimicking the universal "new notification" bell-shake animation, reinforcing the modal's purpose purely visually before the user reads a word of copy.

**Checking permission state before re-asking**

A production build should never show this modal blindly — \`Notification.permission\` (read without calling \`requestPermission\`) reports \`'default'\`, \`'granted'\`, or \`'denied'\` for the current origin. Only show the soft-ask when it's \`'default'\`; if it's already \`'denied'\`, the browser will silently ignore any future \`requestPermission()\` call, so the right move is a different message pointing the user toward their browser's site settings instead of repeating a prompt that can no longer do anything.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A page with a single "Open app preview" button renders; click it to trigger the soft-ask, simulating when you'd show it in a real app.` },
      { title: 'Read the soft-ask card', text: `A bottom-anchored modal with a shaking bell icon explains why notifications are useful, with Allow and Not Now buttons.` },
      { title: 'Click Allow', text: `The real browser Notification.requestPermission() call fires (or a simulated granted state in sandboxed previews), and the result message shows the outcome.` },
      { title: 'Click Not now', text: `The modal shows a neutral dismissal message and closes — no browser API is called, so it can be shown again later.` },
      { title: 'Click the backdrop', text: `Clicking outside the card dismisses it the same way as Not Now.` },
      { title: 'Trigger it at the right moment', text: `Replace the trigger button with a call to openPrompt() at a meaningful point in your app — e.g. after a user completes a key action, not on page load.` },
    ] },
    features: [
      { title: 'Custom soft-ask before the native dialog', text: `Absorbs a context-free "no" yourself, preserving the one real browser permission prompt for a more informed moment.` },
      { title: 'Three distinct outcome states', text: `Granted, denied, and dismissed each get their own color-coded message so the result is always clear.` },
      { title: 'Real Notification API integration', text: `Calls the actual Notification.requestPermission() browser API on Allow, with a graceful fallback where it's unavailable.` },
      { title: 'Bottom-anchored positioning', text: `The card appears where most native permission prompts do, visually rehearsing the real dialog's location.` },
      { title: 'Shaking bell icon animation', text: `A multi-keyframe rotation loop on the icon reinforces the "notification" theme without relying on copy alone.` },
      { title: 'Backdrop and button dismissal share one code path', text: `Both the backdrop click and the Not Now button call the same closePrompt(), keeping dismissal logic in one place.` },
      { title: 'Animation-safe entrance', text: `Opacity and transform-only transitions keep the card's appearance smooth across every framework export.` },
      { title: 'Auto-closing result message', text: `The outcome message displays briefly, then the modal closes itself after 1.6 seconds — no extra click required.` },
    ],
    useCases: [
      { title: 'SaaS and productivity apps', text: `Ask for notification permission after a user creates their first task, message, or reminder — a moment that motivates the "yes."` },
      { title: 'Messaging and social platforms', text: `Soft-ask for permission after a user's first conversation or follow, when the value of getting notified is obvious.` },
      { title: 'E-commerce and marketing', text: `Ask after a cart action or wishlist add, framed around order and restock updates rather than generic "stay updated" copy.` },
      { title: 'PWA and mobile-web app onboarding', text: `Pair with a [cookie banner](/ui-snippets/cookie-banner/) or [GDPR consent manager](/ui-snippets/gdpr-consent-manager/) as part of a broader first-run permissions flow.` },
      { title: 'Growth and conversion experiments', text: `A/B test different soft-ask copy and timing without ever burning the user's one real browser-level prompt on a bad variant.` },
      { title: 'Learning permission UX patterns', text: `A practical reference for the soft-ask pattern, reusable for camera, microphone, or location permission requests with the same structure.` },
      { icon: 'CODE', title: 'Related: Multi-Step Wizard Modal with Per-Step Validation Gating', desc: 'See the [Multi-Step Wizard Modal with Per-Step Validation Gating](/ui-snippets/step-validation-gated-wizard-modal/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not just call Notification.requestPermission() directly on page load?', a: `Because the browser shows its native permission dialog only once per origin per outcome — a context-free "no" on page load can permanently block your app from ever re-asking programmatically. A custom soft-ask absorbs that early "no" safely, since dismissing it costs nothing and can be shown again, while only an informed "Allow" click spends the real one-shot browser prompt.` },
      { q: 'How do I check if permission was already granted or denied on a previous visit?', a: `Check Notification.permission (without calling requestPermission) on page load — it's 'granted', 'denied', or 'default'. Only show this soft-ask when it's 'default'; if it's already 'denied', show a different message pointing the user to browser settings instead, since requestPermission() won't show a dialog again.` },
      { q: 'How do I actually send a notification once permission is granted?', a: `After requestPermission() resolves to 'granted', call new Notification('Title', { body: 'message', icon: '/icon.png' }) for local notifications, or register a service worker and use the Push API for notifications sent from your server while the app is closed.` },
      { q: 'When is the best time to show this soft-ask?', a: `After a user takes an action whose value is obviously tied to notifications — sending a message, creating a reminder, adding an item to a watchlist — rather than immediately on page load, when the request has no context and is far more likely to be dismissed.` },
      { q: 'How do I use this permission prompt in React, Vue, or Angular?', a: `In React, control the open/closed state with useState and call Notification.requestPermission() inside the Allow handler exactly as shown; in Vue, use ref()/reactive(); in Angular, use a component method. The browser Notification API itself is framework-agnostic, so only the show/hide state management changes.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing at the permission-flow subtleties, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why calling Notification.requestPermission() cold on page load is considered one of the worst web UX patterns, and how this soft-ask's three distinct outcome states (granted, denied, dismissed) map to what actually happens to the browser's own permission state versus what's just local UI. The same assistant can help optimize it, for instance asking whether the openPrompt() function should first check Notification.permission and skip showing the modal entirely if it's already 'denied' (since re-asking would be pointless), or whether the auto-close timeout after showing the outcome should vary by outcome type. It's also useful for extending the pattern: ask it to persist a "user dismissed N times" counter so the soft-ask backs off after repeated dismissals, adapt the same soft-ask shell for camera or microphone permission requests, or add a lightweight A/B testable copy variant system. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "notification permission soft-ask" modal in plain HTML, CSS, and JavaScript that wraps the real browser Notification API — no framework, no toast library.

Requirements:
- A custom modal (not the native browser permission dialog) anchored near the bottom of the viewport, the same general location most browsers show their own permission prompt, with a backdrop, an icon, a headline, explanatory copy, an "Allow notifications" button, and a "Not now" dismiss button.
- The modal must animate in and out using only opacity and transform (translate plus a slight scale), and clicking the backdrop must dismiss it through the exact same code path as clicking "Not now" — there should be only one close function, not two separate ones that duplicate logic.
- Clicking "Allow" must call the real browser Notification.requestPermission() API (with a safe fallback behavior if the Notification API doesn't exist in the current environment) and, based on its resolved value, show one of three distinct result messages with distinct styling: granted (success-colored), denied (error-colored), with the dismiss button producing a third, neutral "maybe later" result that never touches the browser API at all.
- After showing any outcome message, the modal must auto-close itself after a short delay with no further user action required.
- Add a code comment explaining that a production version must first read Notification.permission (without calling requestPermission) before ever showing this modal, and must skip showing it (or show different copy) if permission is already 'denied', since the browser will silently ignore a repeated requestPermission() call in that state.
- The bell icon must play a short, repeating multi-step rotation animation (a quick shake) to visually reinforce the notification theme independent of the copy.`,
    },
  },
};

export default notificationPermissionPrompt;
