const badgingApiDemo = {
  id: 'badging-api-demo',
  title: 'App Badge API Demo',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="bad-wrap">
  <span class="bad-tag">navigator.setAppBadge · pwa icon badge</span>
  <h1>Unread count badge</h1>
  <p id="badStatus">The badge only shows on a real device icon once this page is installed as a PWA — the mock below shows what it would look like right now.</p>

  <div class="bad-mock-row">
    <div class="bad-icon-mock">
      <div class="bad-icon-glyph">◆</div>
      <span class="bad-icon-count" id="badIconCount" hidden>0</span>
    </div>
    <div class="bad-mock-caption">Mock home-screen / taskbar icon</div>
  </div>

  <div class="bad-card">
    <div class="bad-count-row">
      <button class="bad-step" id="badMinus">−</button>
      <span class="bad-count" id="badCount">0</span>
      <button class="bad-step" id="badPlus">+</button>
    </div>
    <div class="bad-actions">
      <button class="bad-btn primary" id="badSetBtn">Set badge</button>
      <button class="bad-btn" id="badClearBtn">Clear badge</button>
    </div>
  </div>

  <p class="bad-note">navigator.setAppBadge() is Chromium-only and, per spec, only visibly affects the OS icon when the page is running as an installed PWA — inside a normal tab or a sandboxed preview iframe the call may succeed silently with zero visible effect, which is why the on-page mock above exists.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a0f24,#08050d 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.bad-wrap{width:100%;max-width:420px;text-align:center}
.bad-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.1);border:1px solid rgba(240,171,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.bad-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.bad-wrap p{font-size:13.5px;color:#b79fc9;margin-top:8px;line-height:1.6}
.bad-mock-row{margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:8px}
.bad-icon-mock{position:relative;width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#c084fc,#7c3aed);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(124,58,237,.4)}
.bad-icon-glyph{font-size:28px;color:#fff}
.bad-icon-count{position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;border-radius:99px;background:#ef4444;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #08050d}
.bad-mock-caption{font-size:11px;color:#7c6a8f;text-transform:uppercase;letter-spacing:.05em}
.bad-card{margin-top:22px;border-radius:16px;border:1px solid rgba(240,171,252,.18);background:#120b1a;padding:20px}
.bad-count-row{display:flex;align-items:center;justify-content:center;gap:20px}
.bad-step{width:38px;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;font-size:19px;cursor:pointer;transition:background .15s}
.bad-step:hover{background:rgba(255,255,255,.1)}
.bad-count{font-size:32px;font-weight:800;min-width:52px}
.bad-actions{display:flex;gap:10px;margin-top:18px}
.bad-btn{flex:1;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e9def0;font:600 13px system-ui;cursor:pointer;transition:background .15s}
.bad-btn:hover{background:rgba(255,255,255,.09)}
.bad-btn.primary{background:linear-gradient(135deg,#c084fc,#f472b6);border-color:transparent;color:#1a0620;font-weight:700}
.bad-note{font-size:11.5px;color:#5c4d6b;max-width:400px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("badStatus");
var countEl = document.getElementById("badCount");
var iconCountEl = document.getElementById("badIconCount");
var minusBtn = document.getElementById("badMinus");
var plusBtn = document.getElementById("badPlus");
var setBtn = document.getElementById("badSetBtn");
var clearBtn = document.getElementById("badClearBtn");

var supported = "setAppBadge" in navigator;
var count = 3;
countEl.textContent = String(count);

function syncMock() {
  if (count > 0) {
    iconCountEl.hidden = false;
    iconCountEl.textContent = count > 99 ? "99+" : String(count);
  } else {
    iconCountEl.hidden = true;
  }
}

minusBtn.addEventListener("click", function () {
  count = Math.max(0, count - 1);
  countEl.textContent = String(count);
});

plusBtn.addEventListener("click", function () {
  count = Math.min(999, count + 1);
  countEl.textContent = String(count);
});

if (!supported) {
  statusEl.textContent = "The Badging API isn't supported in this browser — the on-page mock still shows exactly what the real icon badge would look like.";
}

async function setBadge() {
  syncMock(); // the mock always updates, regardless of API support

  if (!supported) {
    statusEl.textContent = "navigator.setAppBadge isn't available here, so only the on-page mock icon updates — the mock above is what the real badge would show.";
    return;
  }

  try {
    if (count > 0) {
      await navigator.setAppBadge(count);
    } else {
      await navigator.clearAppBadge();
    }
    // Per spec, this call can resolve successfully with ZERO visible effect
    // if the page isn't running as an installed PWA — a normal browser tab,
    // and especially a sandboxed preview iframe, simply has no home-screen
    // or taskbar icon for the OS to badge.
    statusEl.textContent = "setAppBadge(" + count + ") succeeded — but it only shows on a real icon if this page is installed as a PWA. Not installed here, so the mock above is your only visible confirmation.";
  } catch (err) {
    statusEl.textContent = "setAppBadge failed (" + (err && err.name ? err.name : "blocked") + ") — the on-page mock still reflects the count.";
  }
}

async function clearBadge() {
  count = 0;
  countEl.textContent = "0";
  syncMock();

  if (!supported) {
    statusEl.textContent = "navigator.clearAppBadge isn't available here — the mock icon is cleared instead.";
    return;
  }

  try {
    await navigator.clearAppBadge();
    statusEl.textContent = "Badge cleared (visible only on an installed PWA's icon).";
  } catch (err) {
    statusEl.textContent = "clearAppBadge failed (" + (err && err.name ? err.name : "blocked") + ") — the on-page mock is cleared regardless.";
  }
}

setBtn.addEventListener("click", setBadge);
clearBtn.addEventListener("click", clearBadge);

syncMock();`,

  seo: {
    title: 'App Badge API Demo — Free navigator.setAppBadge with On-Page Mock',
    description: `A PWA icon-badge demo using the real Badging API's setAppBadge()/clearAppBadge(), paired with an always-visible on-page mock icon since the real badge is invisible unless installed. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'App Badge API Demo — Real setAppBadge Plus a Mock You Can Actually See',
      description: `The Badging API's \`navigator.setAppBadge(count)\` puts a small number on a Progressive Web App's home-screen or taskbar icon — the same kind of unread-count indicator native mail and messaging apps have shown for years. This snippet calls the real API, but it's built around an unusual honesty problem: even when the call succeeds perfectly, it's often completely invisible to whoever is looking at the demo, because badging only affects a page's OS-level icon, and this demo is neither installed nor, in most cases, being viewed as a PWA at all.

**The real call, made honestly**

\`setBadge()\` calls \`navigator.setAppBadge(count)\` for a positive count or \`navigator.clearAppBadge()\` at zero, behind a \`'setAppBadge' in navigator\` capability check and a \`try/catch\`. Critically, a successful resolution here does **not** mean you'll see anything — the spec allows the call to succeed with zero visible effect if the page isn't running as an installed, standalone PWA. That's not a bug to work around; it's the API behaving exactly as designed, and the status text says so explicitly rather than declaring false success.

**A mock that makes the invisible visible**

Because the real effect is so often unobservable in a demo context, an on-page mock icon with its own badge overlay mirrors the count at all times, updated by \`syncMock()\` independent of whether the real API call succeeds, fails, or doesn't exist. This is the actual point of the snippet: it lets you understand and preview what \`setAppBadge(3)\` would put on a real taskbar icon, without needing to install anything.

**Support is narrow, so the mock isn't optional**

The Badging API is implemented only in Chromium-based browsers, and even there it requires the page to be an installed, standalone-display-mode PWA to have any visible effect — a plain browser tab, and especially a sandboxed preview iframe like the one likely rendering this demo, will never show a badge no matter how correctly the code calls the API. Building the mock as a first-class, always-functional part of the UI (rather than an apologetic fallback) is what keeps this demo meaningful. It follows the same principle as this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet: assume the real capability might be invisible or unavailable, and make sure there's still something genuinely useful on screen.

**Counting up and down**

The +/− stepper is entirely independent of the API call — you can freely adjust the count and only commit it to \`setAppBadge\`/the mock when you click "Set badge," which keeps the demo's two concerns (choosing a number, and badging with it) cleanly separated. Pair this with a [status pill](/ui-snippets/status-pill/) for a non-PWA unread indicator, or a [notification permission prompt](/ui-snippets/notification-permission-prompt/) for the companion notifications feature.

**Customizing it**

Wire the count to a real unread-messages or pending-tasks total, call \`setAppBadge\` without an argument for a flag-only badge (no number, just a dot), or debounce calls if the count changes frequently.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mock app icon and a count stepper render.` },
      { title: 'Adjust the count with +/−', text: `The stepper number updates independent of the badge.` },
      { title: 'Click "Set badge"', text: `Calls the real setAppBadge() and updates the mock icon.` },
      { title: 'Check the status line', text: `It explains whether the real badge would actually be visible.` },
      { title: 'Click "Clear badge"', text: `Resets the count and clears both the real and mock badge.` },
      { title: 'Install as a PWA to see it for real', text: `Only then does the OS icon actually show the badge.` },
    ] },
    features: [
      { title: 'Real setAppBadge call', text: `Genuinely calls the Badging API, not a simulation of it.` },
      { title: 'Honest success messaging', text: `Explains a successful call may still be invisible.` },
      { title: 'Always-visible mock icon', text: `Makes the effect observable regardless of install state.` },
      { title: 'Independent count stepper', text: `Adjust a number before committing it as a badge.` },
      { title: 'Capability check first', text: `Feature-detects setAppBadge before calling it.` },
      { title: 'Clear/set both wired', text: `clearAppBadge mirrors setAppBadge's real and mock paths.` },
      { title: '99+ overflow handling', text: `Large counts collapse to a readable "99+" badge.` },
      { title: 'Named failure states', text: `Surfaces the actual error name if the call throws.` },
    ],
    useCases: [
      { title: 'Messaging and email PWAs', text: `Show an unread count on the installed app icon.` },
      { title: 'Task and to-do apps', text: `Badge pending items count on the home screen.` },
      { title: 'Notification-heavy dashboards', text: `Pair with a [notification permission prompt](/ui-snippets/notification-permission-prompt/).` },
      { title: 'Support/ticketing PWAs', text: `Badge open tickets alongside a [status dashboard](/ui-snippets/status-dashboard/).` },
      { title: 'Non-PWA unread indicators', text: `Use the mock pattern alone with a [status pill](/ui-snippets/status-pill/).` },
      { title: 'PWA onboarding demos', text: `Teach what installing a PWA actually changes visually.` },
      { icon: 'CODE', title: 'Related: Clipboard Paste Button', desc: 'See the [Clipboard Paste Button](/ui-snippets/clipboard-paste-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "Why don't I see a badge on any icon when I click Set badge?", a: `navigator.setAppBadge() only has a visible effect when the page is running as an installed, standalone Progressive Web App — a badge set from a regular browser tab, or from inside a sandboxed preview iframe like the one likely rendering this demo, can succeed at the JavaScript level with zero visible result, because there's no home-screen or taskbar icon for the operating system to badge. That's exactly why the on-page mock icon exists: it shows you what the real badge would look like.` },
      { q: "Is setAppBadge widely supported?", a: `No — the Badging API is implemented only in Chromium-based browsers (Chrome, Edge, Opera) and has no support in Firefox or Safari as of this writing. This snippet checks 'setAppBadge' in navigator before calling it and clearly states in the status line when the API is unavailable, while the on-page mock keeps working identically either way.` },
      { q: "How would I actually see the real badge working?", a: `You'd need to install this page as a PWA (which requires a real web app manifest and, typically, a service worker — beyond what a single-file demo provides) and open it in its own installed window rather than a browser tab. Only then does the operating system have an actual icon to place the badge number on, whether that's a taskbar icon on desktop or a home-screen icon on Android.` },
      { q: "What's the difference between setAppBadge(count) and clearAppBadge()?", a: `setAppBadge(count) sets a specific number badge (or a flag-style dot if called with no argument at all) on the installed app's icon. clearAppBadge() removes it entirely, equivalent to calling setAppBadge(0) in most implementations. This snippet calls clearAppBadge() automatically whenever the stepper count reaches zero and "Set badge" is clicked, keeping the two functions' behavior consistent with the spec.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Bind the count to component state driven by your +/− buttons, and call the same setBadge/clearBadge logic — the capability check, try/catch, and mock-icon sync — from your framework's click handlers. Since the real effect is entirely OS-level and outside the DOM, there's nothing framework-specific to worry about beyond keeping the mock icon's rendered count in sync with your state.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain the specific honesty problem this demo solves: why a successful navigator.setAppBadge() call can have zero visible effect, and why that's spec-compliant behavior tied to whether the page is running as an installed standalone PWA rather than a bug. It's a useful prompt for reasoning about "invisible success" states in browser APIs generally — ask what other APIs behave this way (succeed technically, but only matter in a context the demo can't reproduce) and how you'd design a UI around each one. For extensions, ask it to add a toggle simulating "installed" vs "not installed" mode that changes which messaging is shown, wire the count to a real data source like unread messages in a chat demo, or add support for the flag-only badge (calling setAppBadge with no argument). Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "App Badge API Demo" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A mock app icon element (a rounded square with a glyph) with a small overlaid badge showing a count, positioned like a real home-screen/taskbar app badge, hidden entirely when the count is zero.
- A +/− stepper with a numeric display that lets the user adjust a count value independently before committing it.
- A "Set badge" button that, when clicked: (1) always updates the on-page mock icon's badge to match the current count regardless of anything else, and (2) checks 'setAppBadge' in navigator, and if present, calls navigator.setAppBadge(count) (or navigator.clearAppBadge() if count is zero) inside a try/catch.
- CRITICAL: the status message after calling the real API must be honest about a key spec behavior — setAppBadge() can resolve successfully with absolutely no visible effect if the page is not currently running as an installed, standalone-display-mode Progressive Web App (which is the case for essentially every viewer of this demo, especially if it's rendered inside a sandboxed preview iframe). The status text should explain that a successful call was made but likely isn't visible anywhere except the on-page mock, rather than implying the real OS icon badge was definitely shown.
- A "Clear badge" button that resets the count to zero, clears the mock icon's badge, and calls navigator.clearAppBadge() if supported.
- Handle the case where the Badging API doesn't exist at all (most non-Chromium browsers) by clearly stating that in the status line while still keeping the on-page mock icon fully functional as the primary way to see the effect of any count change.`,
    },
  },
};

export default badgingApiDemo;
