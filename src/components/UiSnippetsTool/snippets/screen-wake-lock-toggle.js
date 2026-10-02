const screenWakeLockToggle = {
  id: 'screen-wake-lock-toggle',
  title: 'Screen Wake Lock Toggle',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="swl-wrap">
  <span class="swl-tag">navigator.wakeLock · screen sentinel</span>
  <h1>Keep screen awake</h1>
  <p id="swlStatus">Turn this on while you're reading a recipe or following a workout, and your screen won't sleep.</p>

  <div class="swl-card">
    <div class="swl-row">
      <div>
        <strong>Screen wake lock</strong>
        <span id="swlSubtext">Off — your screen will sleep normally.</span>
      </div>
      <button class="swl-toggle" id="swlToggle" role="switch" aria-checked="false" aria-label="Toggle screen wake lock">
        <span class="swl-knob"></span>
      </button>
    </div>
    <div class="swl-dot-row">
      <span class="swl-dot" id="swlDot"></span>
      <span id="swlDotLabel">Inactive</span>
    </div>
  </div>

  <p class="swl-note">The Wake Lock API automatically releases whenever the tab is hidden (switching apps, locking the phone) — this demo listens for visibility changes and re-acquires the lock the moment the page becomes visible again, which is the real quirk anyone shipping this needs to handle.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#20180a,#0a0704 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.swl-wrap{width:100%;max-width:440px;text-align:center}
.swl-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fcd34d;background:rgba(252,211,77,.1);border:1px solid rgba(252,211,77,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.swl-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.swl-wrap p{font-size:13.5px;color:#c2ad83;margin-top:8px;line-height:1.6}
.swl-card{margin-top:22px;border-radius:16px;border:1px solid rgba(252,211,77,.18);background:#151006;padding:20px;text-align:left}
.swl-row{display:flex;align-items:center;justify-content:space-between;gap:16px}
.swl-row strong{display:block;font-size:14.5px}
.swl-row span{display:block;font-size:12px;color:#9a8560;margin-top:3px}
.swl-toggle{position:relative;width:52px;height:30px;border-radius:99px;border:none;background:rgba(255,255,255,.14);cursor:pointer;flex-shrink:0;transition:background .2s}
.swl-toggle.on{background:linear-gradient(135deg,#fcd34d,#f59e0b)}
.swl-toggle.disabled{opacity:.4;cursor:not-allowed}
.swl-knob{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.swl-toggle.on .swl-knob{transform:translateX(22px)}
.swl-dot-row{display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#b3a17e}
.swl-dot{width:8px;height:8px;border-radius:50%;background:#6b6248;transition:background .2s,box-shadow .2s}
.swl-dot.active{background:#fcd34d;box-shadow:0 0 8px rgba(252,211,77,.7)}
.swl-note{font-size:11.5px;color:#59502f;max-width:420px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("swlStatus");
var subtextEl = document.getElementById("swlSubtext");
var toggle = document.getElementById("swlToggle");
var dot = document.getElementById("swlDot");
var dotLabel = document.getElementById("swlDotLabel");

var supported = "wakeLock" in navigator;
var wakeLockSentinel = null;
var userWantsLock = false;

function setUiOn() {
  toggle.classList.add("on");
  toggle.setAttribute("aria-checked", "true");
  subtextEl.textContent = "On — the screen will stay awake while this tab is visible.";
  dot.classList.add("active");
  dotLabel.textContent = "Active";
}

function setUiOff(reasonText) {
  toggle.classList.remove("on");
  toggle.setAttribute("aria-checked", "false");
  subtextEl.textContent = reasonText || "Off — your screen will sleep normally.";
  dot.classList.remove("active");
  dotLabel.textContent = "Inactive";
}

if (!supported) {
  toggle.classList.add("disabled");
  toggle.disabled = true;
  statusEl.textContent = "The Wake Lock API isn't supported in this browser — the toggle is disabled rather than faking an effect it can't deliver.";
  setUiOff("Not supported in this browser.");
} else {
  statusEl.textContent = "Turn this on while you're reading a recipe or following a workout, and your screen won't sleep.";
}

async function acquireLock() {
  if (!supported) return;
  try {
    wakeLockSentinel = await navigator.wakeLock.request("screen");
    setUiOn();
    statusEl.textContent = "Wake lock active — this tab is now preventing screen sleep.";

    wakeLockSentinel.addEventListener("release", function () {
      // Fires whenever the lock is released, whether we asked for it or the
      // browser auto-released it (most commonly: the tab was hidden).
      wakeLockSentinel = null;
      if (userWantsLock && document.visibilityState === "visible") {
        // Released while we still wanted it and the page is visible — an
        // unexpected release, so reflect that honestly instead of pretending.
        setUiOff("Wake lock was released unexpectedly.");
        userWantsLock = false;
        toggle.classList.remove("on");
        toggle.setAttribute("aria-checked", "false");
      }
    });
  } catch (err) {
    // NotAllowedError (permission/policy denied) or a low-battery refusal
    // some browsers apply — fail into a clearly-labeled off state.
    userWantsLock = false;
    setUiOff("Couldn't acquire a wake lock (" + (err && err.name ? err.name : "blocked") + ").");
    statusEl.textContent = "The browser refused the wake lock request — this can happen on low battery or inside a restricted embed.";
  }
}

async function releaseLock() {
  if (wakeLockSentinel) {
    try { await wakeLockSentinel.release(); } catch (e) {}
    wakeLockSentinel = null;
  }
  setUiOff();
  statusEl.textContent = "Wake lock released — your screen can sleep normally again.";
}

toggle.addEventListener("click", function () {
  if (!supported) return;
  userWantsLock = !toggle.classList.contains("on");
  if (userWantsLock) {
    acquireLock();
  } else {
    releaseLock();
  }
});

// The Wake Lock API auto-releases whenever the document is hidden (switching
// tabs/apps, locking the phone). Re-acquire it the moment we're visible
// again, but only if the user still wants it on.
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible" && userWantsLock && !wakeLockSentinel && supported) {
    acquireLock();
  }
});`,

  seo: {
    title: 'Screen Wake Lock Toggle — Free navigator.wakeLock Demo',
    description: `A real screen-awake toggle using the Wake Lock API's navigator.wakeLock.request('screen'), including the auto-release-on-hide quirk and re-acquisition on visibility return. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Screen Wake Lock Toggle — Real Wake Lock With the Visibility Quirk Handled',
      description: `This toggle calls the genuine Screen Wake Lock API — \`navigator.wakeLock.request('screen')\` — to actually prevent a device's display from sleeping while the toggle is on, the kind of control a recipe app or workout timer needs so the screen doesn't dim mid-instruction. Unlike a purely decorative switch, this one either does the real thing or plainly says it can't, because a wake lock toggle that silently does nothing is worse than no toggle at all.

**Requesting and holding the lock**

\`acquireLock()\` calls \`navigator.wakeLock.request('screen')\`, which resolves with a \`WakeLockSentinel\` — a live handle representing the held lock — wrapped in a \`try/catch\` since the browser can refuse the request (commonly a \`NotAllowedError\`, and some browsers refuse outright on very low battery). Success flips the UI to its "on" state and updates the status text to confirm the lock is genuinely active, not just that a switch was clicked.

**The auto-release quirk, handled honestly**

The one behavior every real implementation of this feature has to account for: a wake lock automatically releases the instant its document becomes hidden — switching apps, locking the phone, or backgrounding the tab all silently drop it. This snippet listens for the sentinel's own \`release\` event to detect that, and separately listens for \`visibilitychange\` on the document to re-acquire the lock the moment the page becomes visible again, but only if the user still wants it on (tracked in \`userWantsLock\`). Skipping this step is the single most common bug in real wake-lock implementations — the toggle looks "on" but the screen sleeps anyway the next time the user glances away.

**No supported, no fake toggle**

If \`'wakeLock' in navigator\` is false, the toggle is disabled outright with an explanatory status line, rather than left interactive and doing nothing when clicked — matching the honesty standard set by this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet, which never leaves a capability-gated control pretending to work. A visually-active-looking toggle that silently fails to keep the screen awake would defeat the entire purpose of the control.

**A visible status dot**

Beyond the toggle itself, a small status dot and label track the sentinel's actual state, so at a glance — even without reading the longer status sentence — it's clear whether the lock is genuinely held right now. Pair this with an [uptime status page](/ui-snippets/uptime-status-page/) or [status pill](/ui-snippets/status-pill/) for the same "live indicator" pattern applied elsewhere in a dashboard.

**Customizing it**

Auto-request the lock on page load for a kiosk-style display, add a countdown showing how long the lock has been held, or combine it with a [dark mode toggle](/ui-snippets/dark-mode-toggle/) for a late-night reading mode.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An off-state toggle with a status dot renders.` },
      { title: 'Click the toggle to turn it on', text: `navigator.wakeLock.request('screen') is called live.` },
      { title: 'Switch tabs or lock your phone', text: `The lock auto-releases — a real browser behavior.` },
      { title: 'Return to the tab', text: `The visibilitychange listener re-acquires the lock automatically.` },
      { title: 'Click the toggle off', text: `The sentinel is released and the screen can sleep again.` },
      { title: 'Try it in an unsupported browser', text: `The toggle disables itself with a clear explanation.` },
    ] },
    features: [
      { title: 'Real wakeLock.request call', text: `Genuinely prevents display sleep, not a decorative switch.` },
      { title: 'WakeLockSentinel tracking', text: `Holds and releases the actual lock handle correctly.` },
      { title: 'Visibility auto-reacquire', text: `Handles the API's real auto-release-on-hide quirk.` },
      { title: 'Release event listener', text: `Detects unexpected releases, not just user-initiated ones.` },
      { title: 'Disabled, not fake, when unsupported', text: `No silent no-op toggle on unsupported browsers.` },
      { title: 'Named failure reasons', text: `Surfaces the actual DOMException name on refusal.` },
      { title: 'Live status dot', text: `A glanceable indicator separate from the longer status text.` },
      { title: 'Accessible switch semantics', text: `role="switch" and aria-checked stay in sync with real state.` },
    ],
    useCases: [
      { title: 'Recipe and cooking apps', text: 'Keep the screen on through a multi-step recipe, with a real `navigator.wakeLock.request(\'screen\')` call that genuinely prevents sleep.' },
      { title: 'Workout and timer apps', text: 'Prevent the display sleeping mid-set without the user touching the phone, re-acquiring the lock when the page becomes visible again.' },
      { title: 'Presentation and kiosk modes', text: 'Pair with a [status pill](/ui-snippets/status-pill/) showing whether the lock is active, detecting unexpected releases through the sentinel\'s release event.' },
      { title: 'Reading apps', text: 'Combine with a [dark mode toggle](/ui-snippets/dark-mode-toggle/) for night reading, handling the API\'s quirk of auto-releasing when a tab is hidden.' },
      { title: 'Always-on dashboards', text: 'Keep a [status dashboard](/ui-snippets/status-dashboard/) visible on a wall display, or hold a video call waiting room on screen before a meeting starts.' },
    ],
    faqs: [
      { q: "Why does my screen still sleep after I switched apps and came back?", a: `That shouldn't happen with this snippet — but it's the exact bug that occurs if a wake lock implementation doesn't handle the API's biggest quirk: the lock automatically releases the instant the document is hidden (switching tabs, locking the phone, backgrounding the app). This snippet listens for visibilitychange and re-acquires the lock automatically when the page becomes visible again, as long as the toggle is still meant to be on.` },
      { q: "Why is the toggle disabled and grayed out?", a: `The Wake Lock API (navigator.wakeLock) isn't supported in every browser. This snippet checks 'wakeLock' in navigator before doing anything, and if it's missing, disables the toggle outright with an explanatory message rather than leaving it clickable and silently doing nothing — a toggle that looks functional but has no effect is worse than one that's honestly unavailable.` },
      { q: "Can a website keep my screen awake without me knowing?", a: `No — requesting a wake lock requires a real user action to trigger it in this snippet (clicking the toggle), and the browser itself will show some visible indication that a page is holding a wake lock in many implementations. The lock is also always scoped to that specific document and releases automatically the moment the tab is closed, navigated away from, or hidden.` },
      { q: "Why would the browser refuse the wake lock request?", a: `Browsers can refuse a wake lock request for reasons like critically low battery, an explicit user or system power-saving policy, or (in an embedded context) a permissions policy blocking the wake-lock feature for that frame. This snippet catches that rejection and shows the actual error name in the status text, then leaves the toggle in a clearly labeled off state rather than pretending the lock is held.` },
      { q: "How do I use this wake lock toggle in React, Vue, or Angular?", a: `Store the WakeLockSentinel and a "user wants lock" boolean in refs (not state, since the sentinel is a live object rather than serializable data), and mirror the same acquireLock/releaseLock functions as event handlers. Add the visibilitychange listener in a mount effect and remove it in cleanup, and make sure to release any held lock on unmount so a component teardown doesn't leave a phantom lock active.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the Wake Lock API automatically releases the lock whenever the document becomes hidden, and why that makes the visibilitychange re-acquisition logic essential rather than optional — walk through what would happen if that listener were removed. It's a good prompt for reasoning about the WakeLockSentinel object specifically: ask why the code listens for the sentinel's own release event in addition to tracking a separate userWantsLock boolean, and what real-world scenario (other than switching tabs) could cause an unexpected release. For extensions, ask it to add a running timer showing how long the lock has been continuously held, a battery-level check that proactively warns the user the browser may refuse the request, or a way to distinguish "released because you turned it off" from "released unexpectedly" in the UI. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Screen Wake Lock Toggle" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A toggle switch with proper role="switch" and aria-checked semantics, plus a small status dot/label and a longer status sentence, all reflecting the real current wake lock state.
- On toggle-on, check 'wakeLock' in navigator before calling navigator.wakeLock.request('screen') inside a try/catch. On success, store the returned WakeLockSentinel and update the UI to an active state with a status message confirming the lock is genuinely held.
- CRITICAL: handle the Wake Lock API's real auto-release behavior. The lock automatically releases whenever the page's visibility state becomes hidden (switching tabs or apps, locking the device) — listen for the document's visibilitychange event and, if the user still wants the lock on and it isn't currently held, re-request it automatically when the page becomes visible again. Also listen for the sentinel's own "release" event to detect and reflect releases that weren't user-initiated.
- On toggle-off, call sentinel.release() if a sentinel is currently held, and update the UI back to an inactive state.
- On unsupported browsers (the API doesn't exist at all — a common case, since support is Chromium-focused) or a rejected request (e.g. a NotAllowedError from a low-battery refusal or a blocked permissions policy in a sandboxed iframe, a likely scenario for wherever this demo renders), do NOT leave the toggle interactive and silently non-functional — either disable it outright with a clear "not supported" message, or show a specific failure reason in the status text and reset the toggle to its off state.`,
    },
  },
};

export default screenWakeLockToggle;
