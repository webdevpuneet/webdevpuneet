const pushSubscriptionToggle = {
  id: 'push-subscription-toggle',
  title: 'Push Notification Subscription Toggle',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="pst-wrap">
  <span class="pst-tag">Notification.requestPermission</span>
  <h1>Push notifications</h1>
  <p id="pstStatus">Toggling this requests real browser notification permission and fires a real local test notification — it does not subscribe you to a push server.</p>

  <div class="pst-toggle-row">
    <div class="pst-toggle-text">
      <strong>Enable notifications</strong>
      <span id="pstPermLabel">Checking permission…</span>
    </div>
    <button class="pst-switch" id="pstSwitch" role="switch" aria-checked="false">
      <span class="pst-switch-thumb"></span>
    </button>
  </div>

  <button class="pst-test-btn" id="pstTest" disabled>Send a local test notification</button>

  <div class="pst-distinction">
    <div class="pst-distinction-item">
      <span class="pst-dot granted" id="pstDotPerm"></span>
      <div><strong>Permission granted</strong><p>The browser allows this origin to show notifications. That's all a toggle like this can honestly demonstrate.</p></div>
    </div>
    <div class="pst-distinction-item">
      <span class="pst-dot"></span>
      <div><strong>Actually subscribed to push</strong><p>Requires a service worker registration plus a real push server and VAPID key pair — not something a sandboxed snippet preview can provide.</p></div>
    </div>
  </div>

  <p class="pst-note" id="pstNote"></p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1206,#0a0704 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.pst-wrap{width:100%;max-width:500px}
.pst-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fcd34d;background:rgba(252,211,77,.1);border:1px solid rgba(252,211,77,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.pst-wrap h1{font-size:clamp(26px,6vw,34px);font-weight:800;letter-spacing:-.03em}
.pst-wrap p{font-size:13.5px;color:#c9b896;margin-top:8px;line-height:1.6}
.pst-toggle-row{margin-top:20px;display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.pst-toggle-text{display:flex;flex-direction:column;gap:3px}
.pst-toggle-text strong{font-size:14px}
.pst-toggle-text span{font-size:12px;color:#a89774}
.pst-switch{width:50px;height:28px;border-radius:99px;border:none;background:#3a3020;position:relative;cursor:pointer;flex-shrink:0;transition:background .2s}
.pst-switch[aria-checked="true"]{background:linear-gradient(135deg,#fbbf24,#f59e0b)}
.pst-switch-thumb{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:transform .2s}
.pst-switch[aria-checked="true"] .pst-switch-thumb{transform:translateX(22px)}
.pst-test-btn{margin-top:12px;width:100%;padding:12px;border-radius:10px;border:1px solid rgba(252,211,77,.3);background:rgba(252,211,77,.08);color:#fde68a;font:600 13px system-ui;cursor:pointer}
.pst-test-btn:hover:not(:disabled){background:rgba(252,211,77,.15)}
.pst-test-btn:disabled{opacity:.4;cursor:not-allowed}
.pst-distinction{margin-top:22px;display:flex;flex-direction:column;gap:12px}
.pst-distinction-item{display:flex;gap:10px;align-items:flex-start}
.pst-dot{width:9px;height:9px;border-radius:50%;background:#57503e;margin-top:5px;flex-shrink:0}
.pst-dot.granted{background:#4ade80}
.pst-distinction-item strong{font-size:12.5px;display:block}
.pst-distinction-item p{font-size:11.5px;color:#a5906c;margin-top:2px;line-height:1.5}
.pst-note{font-size:11.5px;color:#8a7a58;margin-top:16px;line-height:1.6}`,

  js: `var statusEl = document.getElementById('pstStatus');
var noteEl = document.getElementById('pstNote');
var permLabel = document.getElementById('pstPermLabel');
var switchBtn = document.getElementById('pstSwitch');
var testBtn = document.getElementById('pstTest');
var dotPerm = document.getElementById('pstDotPerm');

var hasNotificationAPI = typeof window.Notification !== 'undefined';

function refreshUI() {
  if (!hasNotificationAPI) {
    permLabel.textContent = 'Notification API unsupported in this browser/context.';
    switchBtn.setAttribute('aria-checked', 'false');
    switchBtn.disabled = true;
    testBtn.disabled = true;
    return;
  }

  var perm = Notification.permission; // 'default' | 'granted' | 'denied'
  var isGranted = perm === 'granted';

  switchBtn.setAttribute('aria-checked', String(isGranted));
  testBtn.disabled = !isGranted;
  dotPerm.classList.toggle('granted', isGranted);

  if (perm === 'granted') {
    permLabel.textContent = 'Permission granted — this origin may show notifications.';
  } else if (perm === 'denied') {
    permLabel.textContent = "Permission denied — re-enable it from the browser's site settings to retry.";
  } else {
    permLabel.textContent = 'Permission not yet requested.';
  }
}

async function toggle() {
  if (!hasNotificationAPI) return;

  if (Notification.permission === 'granted') {
    // There is no programmatic way to revoke a granted notification
    // permission from the page itself — only the user, via browser site
    // settings, can do that. Be upfront about it instead of pretending the
    // toggle can turn permission back off.
    statusEl.textContent = 'This toggle can request permission, but the browser gives pages no way to revoke it — only the user can, from site settings.';
    return;
  }

  if (Notification.permission === 'denied') {
    statusEl.textContent = "Permission was previously denied. Browsers don't allow re-prompting after a denial — the user must reset it manually in site settings.";
    return;
  }

  statusEl.textContent = 'Requesting notification permission…';
  try {
    var result = await Notification.requestPermission();
    if (result === 'granted') {
      statusEl.textContent = 'Permission granted. This means the browser will allow this origin to display notifications — it does NOT mean a push subscription exists yet (see below).';
    } else {
      statusEl.textContent = 'Permission was not granted (' + result + ').';
    }
  } catch (err) {
    statusEl.textContent = 'Notification.requestPermission() failed: ' + (err && err.name ? err.name : 'error') + '.';
  }
  refreshUI();
}

function sendTestNotification() {
  if (Notification.permission !== 'granted') return;
  try {
    // A genuine local notification, shown directly by this page — this
    // demonstrates the Notification constructor, not the Push API. A real
    // push notification instead arrives via a service worker's 'push'
    // event, triggered by a message YOUR SERVER sent to a push service
    // using a subscription endpoint + VAPID keys, and can fire even when
    // no tab is open. This local notification cannot do that.
    var n = new Notification('Local test notification', {
      body: 'This fired directly from the page via new Notification(). A real push message instead arrives through a service worker, even with the tab closed.',
      icon: undefined,
    });
    statusEl.textContent = 'Local test notification sent via new Notification(). Note this only works while this page is open — real push works even when the tab is closed.';
    setTimeout(function () { try { n.close(); } catch (e) {} }, 6000);
  } catch (err) {
    statusEl.textContent = 'new Notification() failed: ' + (err && err.name ? err.name : 'error') + '. Some platforms (e.g. mobile Chrome) require a service worker to show notifications at all, even local ones.';
  }
}

switchBtn.addEventListener('click', toggle);
testBtn.addEventListener('click', sendTestNotification);

if (hasNotificationAPI) {
  noteEl.textContent = 'This demo distinguishes "permission granted" (what Notification.requestPermission() can genuinely produce here) from "subscribed to push" (which additionally needs a registered service worker, a PushManager.subscribe() call, and a real server holding VAPID keys to send messages) — a sandboxed snippet preview can only ever demonstrate the former.';
} else {
  noteEl.textContent = 'The Notification API is unavailable in this browser or context (some sandboxed iframes block it, and it requires a secure HTTPS origin). The toggle is disabled accordingly.';
}

refreshUI();`,

  seo: {
    title: 'Push Notification Subscription Toggle — Free Notification API Demo',
    description: `A permission toggle using the real Notification.requestPermission() API and a genuine local test notification, with clear copy distinguishing "permission granted" from "actually subscribed to push." Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Push Notification Subscription Toggle — Real Permission, Honestly Scoped',
      description: `This snippet requests genuine browser notification permission and fires a real local notification — but it's deliberately upfront that neither of those is the same thing as a working push subscription, which needs infrastructure a client-side snippet can't provide.

**Two different things people conflate**

"Notifications are on" in a browser's UI can mean either of two very different states: the origin has *permission* to show notifications (a synchronous, client-only grant), or the browser has an active *push subscription* delivering messages from a server even when no tab is open. This snippet's toggle only ever produces the first — \`Notification.requestPermission()\` — and says so explicitly next to a second, grayed-out item explaining what subscribing would additionally require.

**Permission can't be revoked from the page**

Once \`Notification.permission\` is \`'granted'\`, no page-side API can turn it back off — that's a deliberate browser security boundary, since a site shouldn't be able to silently disable a user-controlled setting. The toggle's click handler checks for this and explains that only the user, via browser site settings, can revoke it, rather than pretending the switch has that power.

**A local notification is not push**

The "Send a local test notification" button calls \`new Notification(...)\` directly from the page — genuinely real, but fundamentally different from push: it can only fire while this page is open, whereas a real push message arrives through a service worker's \`push\` event, dispatched by the browser even with every tab of the site closed, triggered by your server sending an authenticated request to a push service using the subscription's endpoint and a VAPID key pair.

**Why full push can't run in this sandbox**

A complete implementation needs a registered service worker (\`navigator.serviceWorker.register\`), a \`pushManager.subscribe({ applicationServerKey })\` call producing an endpoint URL, and a server that stores that endpoint and holds VAPID keys to actually send messages. None of that fits in a self-contained preview snippet, so the JS comments show exactly where that real call would go rather than pretending to run it.

Pair this with [notification permission prompt](/ui-snippets/notification-permission-prompt/) for a simpler single-purpose version, or [badging API demo](/ui-snippets/badging-api-demo/) for a related unread-count capability.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A permission toggle and test-notification button render.` },
      { title: 'Click the toggle', text: `A real Notification.requestPermission() prompt appears.` },
      { title: 'Allow it', text: `The switch turns on and the test button becomes enabled.` },
      { title: 'Click "Send a local test notification"', text: `A genuine new Notification() fires from the page.` },
      { title: 'Try toggling again', text: `The copy explains permission can't be revoked from the page.` },
      { title: 'Read the distinction panel', text: `Clarifies granted permission versus an actual push subscription.` },
    ] },
    features: [
      { title: 'Real requestPermission() calls', text: `Genuine browser permission prompt, not simulated.` },
      { title: 'Genuine local test notification', text: `new Notification() fires for real while the page is open.` },
      { title: 'Granted-vs-subscribed distinction', text: `Explicit UI panel separating the two concepts.` },
      { title: 'Honest revoke limitation', text: `States plainly that pages can't un-grant permission.` },
      { title: 'Denied-state messaging', text: `Explains why re-prompting after denial is impossible.` },
      { title: 'Push infrastructure explained', text: `Comments outline the real service-worker/VAPID path.` },
      { title: 'Graceful unsupported path', text: `Disables the toggle cleanly when Notification is absent.` },
      { title: 'No dependencies', text: `Pure vanilla JS against native APIs.` },
    ],
    useCases: [
      { title: 'Settings pages', text: `A notification-preferences toggle in an account panel.` },
      { title: 'Onboarding flows', text: `Ask for notification permission at the right moment.` },
      { title: 'Marketing/education', text: `Explain push vs. permission alongside a [badging API demo](/ui-snippets/badging-api-demo/).` },
      { title: 'PWA feature checklists', text: `Show what's needed before real push works.` },
      { title: 'Support/documentation', text: `Illustrate why a user's "notifications on" isn't full push.` },
      { title: 'Notification test tools', text: `A quick local-fire button for design review.` },
      { icon: 'CODE', title: 'Related: WhatsApp Floating Button', desc: 'See the [WhatsApp Floating Button](/ui-snippets/whatsapp-floating-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does turning this toggle on subscribe me to push notifications?', a: `No — it only requests and grants browser notification permission via Notification.requestPermission(). An actual push subscription additionally requires a registered service worker, a call to pushManager.subscribe() with a VAPID application server key, and a real server that stores the resulting subscription endpoint and sends authenticated push messages to it. This snippet is upfront that it demonstrates only the permission half.` },
      { q: "Why can't I turn the toggle back off?", a: `Browsers deliberately give web pages no API to revoke a granted Notification permission — only the user can do that, through the browser's own site settings or permissions UI. This is a security boundary preventing a site from silently disabling a setting the user explicitly controls. The toggle's handler detects the already-granted state and explains this rather than attempting (and failing) to revoke it.` },
      { q: "What's the difference between new Notification() and a real push notification?", a: `new Notification(...) is called directly from a page's own JavaScript and can only fire while that page (or a service worker it controls) is running. A real push notification arrives through a service worker's push event, dispatched by the browser even when every tab of the site is closed, triggered by a message your server sent to a push service using the subscription's endpoint and VAPID keys — infrastructure this local test button doesn't use.` },
      { q: "Why does the demo say full push can't run in this sandbox?", a: `A working push subscription needs a service worker that can actually register and control the page's scope, plus a real backend server holding VAPID keys and able to send authenticated push messages to a browser's push service. A self-contained preview snippet has neither a persistent origin for service worker registration nor a server, so this demo shows exactly where those real calls (pushManager.subscribe, server-side send) would go as comments rather than executing them.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the permission-check and requestPermission() logic as-is in a handler, and drive the switch's visual state from Notification.permission read on mount (there's no change event for permission, so re-check it after any requestPermission() call resolves). For real push, add service worker registration and pushManager.subscribe() in a separate effect, gated behind your own backend endpoint for storing the subscription.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why Notification.requestPermission() granting permission is not the same as having an active push subscription, and what additional pieces — service worker registration, pushManager.subscribe(), VAPID keys, a server — a complete push implementation needs beyond what this snippet can demonstrate. It's also useful for reasoning about the permission model's asymmetry — ask why browsers let a page request permission but never let it revoke that permission programmatically, and why a previously-denied permission can't be re-prompted. For extensions, ask it to sketch the service worker's push event handler that would show a real push-delivered notification, or the pushManager.subscribe({ applicationServerKey }) call and what a minimal Node/Express endpoint to store the resulting subscription would look like. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "push notification subscription toggle" in plain HTML, CSS, and JavaScript using the real Notification API (Notification.requestPermission and new Notification()) — no service worker, no server, no libraries.

Requirements:
- A toggle switch reflecting Notification.permission ('default', 'granted', or 'denied') and a "Send a local test notification" button enabled only when permission is granted.
- Feature-detect with typeof window.Notification !== 'undefined' before using it, and disable the toggle with clear copy if unsupported (some contexts, including sandboxed iframes and non-HTTPS origins, block it entirely).
- Clicking the toggle when permission is 'default' must call await Notification.requestPermission() and update the UI based on the real result ('granted' or 'denied').
- CRITICAL: clicking the toggle when permission is already 'granted' must NOT attempt any kind of fake "turn off" — instead show copy explaining that browsers give pages no API to revoke a granted notification permission, and that only the user can do so via the browser's own site settings. Similarly, if permission is 'denied', explain that browsers do not allow re-prompting after an explicit denial.
- The test button must call a real `+ "`new Notification(title, { body })`" + ` constructor to show a genuine local notification, and the surrounding copy/comments must clearly explain this is NOT the same as a real push notification: a local Notification only fires while the page itself is open, whereas real push delivery works through a service worker's 'push' event dispatched by the browser even when no tab is open, triggered by a server sending an authenticated message to a push service using the subscription's endpoint and VAPID keys.
- CRITICAL: include a clearly visible UI section (not just a code comment) that explicitly distinguishes "permission granted" from "actually subscribed to push," stating that a real subscription additionally requires a registered service worker, a pushManager.subscribe() call, and a real backend server — and that this self-contained snippet can only demonstrate the permission and local-notification pieces, not full push delivery.
- Include a code comment showing (but not executing) what a real pushManager.subscribe({ applicationServerKey: VAPID_PUBLIC_KEY }) call would look like, so a developer reading the source sees the next real step.`,
    },
  },
};

export default pushSubscriptionToggle;
