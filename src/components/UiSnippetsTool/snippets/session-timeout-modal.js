const sessionTimeoutModal = {
  id: 'session-timeout-modal',
  title: 'Session Timeout Warning Modal',
  lastmod: '2026-08-08',
  category: 'modals',
  html: `<div class="demo-page">
  <div class="demo-card">
    <h2>Your Dashboard</h2>
    <p class="demo-desc">This demo uses a sped-up 15-second idle timer instead of a real 15-minute one, so you can see the whole flow quickly. Move your mouse, click, or type to reset it — just like a real session.</p>
    <div class="timer-row">
      <span class="timer-label">Idle for</span>
      <span class="timer-value" id="idle-readout">0s</span>
      <span class="timer-label">/ 15s demo limit</span>
    </div>
    <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
    <textarea class="scratch-input" placeholder="Type here — typing counts as activity and resets the idle timer" rows="3"></textarea>
  </div>
</div>

<div class="overlay" id="overlay"></div>
<div class="timeout-modal" id="timeout-modal" role="alertdialog" aria-modal="true" aria-labelledby="timeout-title" aria-describedby="timeout-desc">
  <div class="modal-icon">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  </div>
  <h3 id="timeout-title">You've been idle a while</h3>
  <p id="timeout-desc">For your security, we'll sign you out soon. Stay signed in to keep working.</p>
  <div class="countdown-ring-wrap">
    <svg class="countdown-ring" width="88" height="88" viewBox="0 0 88 88">
      <circle class="ring-bg" cx="44" cy="44" r="38"/>
      <circle class="ring-fg" id="ring-fg" cx="44" cy="44" r="38"/>
    </svg>
    <span class="countdown-number" id="countdown-number">10</span>
  </div>
  <div class="modal-actions">
    <button class="btn btn-outline" id="btn-logout">Log out now</button>
    <button class="btn btn-primary" id="btn-stay">Stay signed in</button>
  </div>
</div>

<div class="toast" id="signed-out-toast">You were signed out due to inactivity.</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-page { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo-card {
  background: #fff; border-radius: 18px; padding: 28px;
  width: 100%; max-width: 400px;
  box-shadow: 0 8px 30px rgba(15,23,42,0.07);
}
.demo-card h2 { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 10px; }
.demo-desc { font-size: 12.5px; color: #64748b; line-height: 1.6; margin-bottom: 18px; }

.timer-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
.timer-label { font-size: 12px; color: #94a3b8; }
.timer-value { font-size: 14px; font-weight: 700; color: #1e293b; font-variant-numeric: tabular-nums; }

.progress-track { height: 6px; background: #eef2f7; border-radius: 20px; overflow: hidden; margin-bottom: 18px; }
.progress-fill { height: 100%; width: 0%; background: #6366f1; border-radius: 20px; transition: width 0.2s linear, background 0.3s; }
.progress-fill.danger { background: #f59e0b; }

.scratch-input {
  width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 10px 12px; font-family: inherit; font-size: 13px; color: #334155;
  resize: none; outline: none;
}
.scratch-input:focus { border-color: #6366f1; }

/* — Overlay & modal — */
.overlay {
  position: fixed; inset: 0;
  background: rgba(15,23,42,0.4); backdrop-filter: blur(3px);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
  z-index: 900;
}
.overlay.show { opacity: 1; pointer-events: all; }

.timeout-modal {
  position: fixed; top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  background: #fff; border-radius: 20px;
  width: 360px; max-width: calc(100vw - 32px);
  padding: 30px 28px 26px;
  text-align: center;
  box-shadow: 0 24px 64px rgba(0,0,0,0.22);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 950;
}
.timeout-modal.show { opacity: 1; transform: translate(-50%, -50%) scale(1); pointer-events: all; }

.modal-icon {
  width: 46px; height: 46px; margin: 0 auto 14px;
  border-radius: 50%; background: #eef2ff; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
}
.timeout-modal h3 { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
.timeout-modal p { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 20px; }

.countdown-ring-wrap { position: relative; width: 88px; height: 88px; margin: 0 auto 22px; }
.countdown-ring { transform: rotate(-90deg); }
.ring-bg { fill: none; stroke: #eef2f7; stroke-width: 6; }
.ring-fg {
  fill: none; stroke: #6366f1; stroke-width: 6; stroke-linecap: round;
  stroke-dasharray: 238.76;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear, stroke 0.3s;
}
.ring-fg.danger { stroke: #f59e0b; }
.countdown-number {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 800; color: #1e293b; font-variant-numeric: tabular-nums;
}

.modal-actions { display: flex; gap: 10px; }
.btn { flex: 1; padding: 11px 16px; font-size: 13.5px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
.btn-primary { background: #6366f1; color: #fff; border: none; }
.btn-primary:hover { background: #4f46e5; }
.btn-outline { background: transparent; color: #64748b; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #cbd5e1; color: #334155; }

.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
  background: #1e293b; color: #f1f5f9;
  font-size: 13px; font-weight: 600;
  padding: 12px 20px; border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  z-index: 1000;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }`,

  js: `// Demo timing — sped up massively from a real-world 15 minute idle window
// down to 15 seconds so the full flow is visible without a long wait.
const IDLE_LIMIT_SECONDS = 15;
const WARNING_COUNTDOWN_SECONDS = 10;
const RING_CIRCUMFERENCE = 238.76;

const idleReadout = document.getElementById('idle-readout');
const progressFill = document.getElementById('progress-fill');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('timeout-modal');
const countdownNumber = document.getElementById('countdown-number');
const ringFg = document.getElementById('ring-fg');
const btnStay = document.getElementById('btn-stay');
const btnLogout = document.getElementById('btn-logout');
const toast = document.getElementById('signed-out-toast');

let idleSeconds = 0;
let idleTick = null;
let warningSeconds = WARNING_COUNTDOWN_SECONDS;
let warningTick = null;
let modalOpen = false;

function startIdleTimer() {
  clearInterval(idleTick);
  idleSeconds = 0;
  idleReadout.textContent = '0s';
  progressFill.style.width = '0%';
  progressFill.classList.remove('danger');

  idleTick = setInterval(() => {
    idleSeconds += 1;
    idleReadout.textContent = idleSeconds + 's';
    const pct = Math.min(100, (idleSeconds / IDLE_LIMIT_SECONDS) * 100);
    progressFill.style.width = pct + '%';
    if (idleSeconds >= IDLE_LIMIT_SECONDS * 0.6) progressFill.classList.add('danger');

    if (idleSeconds >= IDLE_LIMIT_SECONDS) {
      clearInterval(idleTick);
      openWarningModal();
    }
  }, 1000);
}

function openWarningModal() {
  modalOpen = true;
  warningSeconds = WARNING_COUNTDOWN_SECONDS;
  overlay.classList.add('show');
  modal.classList.add('show');
  updateRing();
  btnStay.focus();

  warningTick = setInterval(() => {
    warningSeconds -= 1;
    updateRing();
    if (warningSeconds <= 0) {
      clearInterval(warningTick);
      forceSignOut();
    }
  }, 1000);
}

function updateRing() {
  countdownNumber.textContent = warningSeconds;
  const fraction = warningSeconds / WARNING_COUNTDOWN_SECONDS;
  ringFg.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - fraction);
  const danger = warningSeconds <= 3;
  ringFg.classList.toggle('danger', danger);
}

function closeWarningModal() {
  modalOpen = false;
  clearInterval(warningTick);
  overlay.classList.remove('show');
  modal.classList.remove('show');
}

function staySignedIn() {
  closeWarningModal();
  startIdleTimer();
}

function forceSignOut() {
  closeWarningModal();
  clearInterval(idleTick);
  showToast();
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

btnStay.addEventListener('click', staySignedIn);
btnLogout.addEventListener('click', forceSignOut);

// Real-world pattern: the idle timer must reset on genuine user activity —
// mouse movement, key presses, clicks, scrolling — not only via the modal's
// own button. Otherwise a user actively reading or filling a long form
// could still get logged out mid-task. We throttle these listeners so a
// continuous mousemove stream doesn't restart the interval hundreds of
// times per second.
let throttled = false;
function registerActivity() {
  if (modalOpen) return; // once the warning is showing, only the modal buttons should count
  if (throttled) return;
  throttled = true;
  setTimeout(() => { throttled = false; }, 400);
  startIdleTimer();
}

['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach((evt) => {
  document.addEventListener(evt, registerActivity, { passive: true });
});

startIdleTimer();`,

  seo: {
    title: 'Session Timeout Warning Modal — Free HTML CSS JS Snippet',
    description: 'Calm idle-session modal with a ring countdown, Stay Signed In and Log Out actions, and real activity-based resets. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Session Timeout Warning Modal — Idle Detection, Ring Countdown & Calm Auto-Logout UX',
      description: `Session timeout warnings exist to protect users on shared or unattended devices — banking portals, healthcare records, and admin dashboards routinely sign users out after a period of inactivity to reduce the window during which a walked-away, unlocked screen could expose sensitive data. This snippet implements the complete pattern: real idle detection tied to genuine user activity, a calm (not jarring) warning modal with a visible countdown, and two clearly differentiated actions — stay signed in, or log out immediately.

**Real activity detection, not just a fixed timer**

The core of a trustworthy session-timeout system is that the idle clock resets on **genuine user activity**, not only when the user happens to click a specific button. This snippet attaches listeners for \`mousemove\`, \`keydown\`, \`click\`, \`scroll\`, and \`touchstart\` directly on \`document\`, and every one of them calls \`registerActivity()\`, which restarts \`startIdleTimer()\` from zero. Without this, a user actively reading a long document or filling out a multi-minute form — who is genuinely present and engaged, just not clicking anything for a while — would get logged out mid-task, which is exactly the kind of jarring, trust-eroding surprise that calm interface design tries to avoid. The listeners are registered with \`{ passive: true }\` since none of them need to call \`preventDefault()\`, which keeps scrolling and touch interactions smooth.

**Throttling to avoid interval churn**

A raw \`mousemove\` listener can fire dozens of times per second during normal cursor movement. Calling \`startIdleTimer()\` — which clears and restarts a \`setInterval\` — on every single one of those events would be wasteful and could cause visible jank. The \`registerActivity()\` function guards against this with a simple \`throttled\` boolean flag: once activity resets the timer, further activity events are ignored for 400ms before the guard resets, so the interval is restarted at most a couple of times per second during continuous activity rather than hundreds.

**Why the warning modal is calm, not a jump-scare**

A poorly designed session-timeout UX slams a full-screen red modal onto the page the instant a countdown hits zero, with no warning beforehand — a jarring interruption regardless of what the user was doing. This snippet instead surfaces a **visible countdown before the modal even needs to appear**: the demo page shows a live "idle for Ns / 15s" readout and a progress bar that gradually shifts from the accent color to amber as the limit approaches, so a genuinely attentive user has ambient awareness the whole time, not just a sudden alert. When the modal does appear, it uses a soft blurred backdrop, a centered card with generous padding, a neutral icon (a clock, not a warning triangle), and calm, first-person copy ("You've been idle a while... we'll sign you out soon") rather than alarmist language. The countdown itself is rendered as a smooth SVG ring (\`stroke-dashoffset\` animated via \`transition: stroke-dashoffset 1s linear\`) alongside a large numeral, giving the user a precise, low-anxiety sense of exactly how much time remains and genuine control to act.

**Two clearly weighted actions**

The modal offers "Stay signed in" as the visually primary, filled button and "Log out now" as a secondary outlined button — both fully functional, both a single click away, with neither hidden or de-emphasized to the point of being hard to find. This respects user agency: someone who genuinely wants to end their session on a shared computer should be able to do so immediately, not be funneled only toward staying logged in.

**Why this matters for 2026 calm interfaces**

Session timeout handling is one of the clearest real-world tests of "calm interface" design — it is a security-critical interruption that must not feel like a jump-scare. Getting it right (ambient countdown before the modal, activity-based resets, equally weighted actions, smooth ring animation) is what separates a security feature that builds trust from one that trains users to reflexively dismiss security prompts.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Watch the sped-up idle timer',
          text: 'The demo card shows a live "idle for Ns / 15s demo limit" readout and a progress bar driven by startIdleTimer()\'s setInterval. In production, swap IDLE_LIMIT_SECONDS for a real value like 15 * 60 (15 minutes).',
        },
        {
          title: 'Let it idle to see the modal, or reset it with activity',
          text: 'Stop interacting for 15 seconds and openWarningModal() fires automatically. Alternatively, move the mouse, type in the scratch textarea, click, or scroll at any time and registerActivity() calls startIdleTimer() to reset the clock back to zero.',
        },
        {
          title: 'Watch the ring countdown inside the modal',
          text: 'Once open, updateRing() runs every second, updating both the numeral in #countdown-number and the SVG ring\'s stroke-dashoffset proportionally to warningSeconds / WARNING_COUNTDOWN_SECONDS, turning amber in the final 3 seconds.',
        },
        {
          title: 'Click Stay Signed In to resume',
          text: 'btnStay triggers staySignedIn(), which calls closeWarningModal() and immediately restarts startIdleTimer() from zero — functionally identical to a real "extend session" API call that refreshes an auth token\'s expiry.',
        },
        {
          title: 'Let it expire or click Log Out Now to see forced sign-out',
          text: 'Either letting warningSeconds reach 0 or clicking btnLogout calls forceSignOut(), which closes the modal and shows a confirmation toast. In production, forceSignOut() would call your real logout endpoint and redirect to the login page.',
        },
        {
          title: 'Tune timings and wire real auth calls',
          text: 'Change IDLE_LIMIT_SECONDS and WARNING_COUNTDOWN_SECONDS to real-world values (e.g. 900 and 60). Replace the setTimeout/setInterval demo logic in staySignedIn() and forceSignOut() with real calls to your session-refresh and logout API endpoints.',
        },
      ],
    },
    features: [
      'Idle detection bound to mousemove, keydown, click, scroll, and touchstart — not just a fixed timer',
      'registerActivity() throttled to a 400ms window to prevent interval churn during continuous mouse movement',
      'Ambient progress bar on the page itself gives early awareness before the modal ever appears',
      'SVG ring countdown animated via stroke-dashoffset transitions, turning amber in the final seconds',
      'role="alertdialog" with aria-labelledby/aria-describedby for assistive technology announcement',
      'Equally weighted Stay Signed In (primary) and Log Out Now (secondary) actions, both one click away',
      'Activity listeners disabled while the modal is open so only its own buttons can dismiss it',
      'Confirmation toast on forced sign-out gives closure instead of silently redirecting without explanation',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Banking, healthcare, and admin portals with security-mandated timeouts',
        desc: 'Regulated industries commonly require automatic sign-out after a defined idle period (e.g. PCI-DSS guidance suggests 15 minutes for payment interfaces). This snippet gives compliance teams a ready-made, calm implementation of that requirement, with real activity detection so genuinely active users are never logged out mid-task.',
      },
      {
        icon: 'APP',
        title: 'SaaS dashboards protecting shared or kiosk-mode devices',
        desc: 'Internal tools used on shared workstations or public kiosks benefit from automatic timeout to prevent one employee\'s session from being left open and accessible to the next person at that terminal. The forced-logout path here can be wired directly to a real session-invalidation API call.',
      },
      {
        icon: 'FLOW',
        title: 'Token-refresh coordination for JWT-based authentication',
        desc: 'The "Stay Signed In" action maps naturally onto a real token-refresh call — calling your /auth/refresh endpoint to extend a JWT or session cookie\'s expiry before it lapses, keeping the client-side idle timer and the server-side token expiry in sync.',
      },
      {
        icon: 'DESIGN',
        title: 'Calm interface design for security-critical interruptions',
        desc: 'Security prompts are exactly the kind of interruption that most benefit from calm design principles — ambient warning before a hard interrupt, smooth animation instead of a sudden pop-in, and neutral rather than alarmist copy and iconography, all reduce the anxiety spike a jarring timeout modal would otherwise cause.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching throttled event listeners and SVG ring countdown animation',
        desc: 'This snippet is a compact reference for two broadly reusable techniques: throttling high-frequency DOM events like mousemove with a simple boolean flag, and animating a circular progress indicator using stroke-dasharray/stroke-dashoffset on an SVG circle rather than a canvas or library-based chart.',
      },
      {
        icon: 'CODE',
        title: 'Multi-tab session synchronization groundwork',
        desc: 'This single-tab implementation is the foundation for a multi-tab-aware version: broadcasting activity events via the BroadcastChannel API or a shared localStorage key lets every open tab reset its idle timer together, so a session doesn\'t expire in a background tab while the user is actively working in another.',
      },
    ],
    faqs: [
      {
        q: 'Why does the idle timer reset on mousemove and scroll, not just button clicks?',
        a: "If the timer only reset when a user clicked a specific button, anyone reading a long article, reviewing a document, or watching an embedded video without clicking anything would still get logged out mid-task despite being fully present and engaged. Binding the reset to mousemove, keydown, click, scroll, and touchstart captures the much broader range of signals that indicate a real, attentive user, which is standard practice in production session-timeout implementations.",
      },
      {
        q: 'Why throttle the activity listeners instead of resetting the timer on every event?',
        a: "A mousemove listener alone can fire 60+ times per second during normal cursor movement. Calling clearInterval/setInterval that frequently is wasteful and can cause visible jank, especially on lower-powered devices. The registerActivity() function uses a simple throttled boolean guarded by a 400ms setTimeout so the timer restarts at most a couple of times per second during continuous activity, which is more than sufficient responsiveness for a session-timeout feature.",
      },
      {
        q: 'Why are the demo timings 15 and 10 seconds instead of real minute-scale values?',
        a: "Real session timeouts are typically 10 to 30 minutes of idle time with a 30-to-90-second warning window before forced logout — far too long to demonstrate interactively. The IDLE_LIMIT_SECONDS and WARNING_COUNTDOWN_SECONDS constants at the top of the JS panel are the only two values you need to change to restore realistic timing, e.g. IDLE_LIMIT_SECONDS = 15 * 60 for a 15-minute idle window.",
      },
      {
        q: 'How do I connect Stay Signed In and Log Out Now to a real backend?',
        a: "Inside staySignedIn(), after closeWarningModal(), add an API call such as await fetch('/api/session/refresh', { method: 'POST' }) to extend the server-side session or refresh an auth token before restarting the client-side idle timer. Inside forceSignOut(), replace or supplement the toast with await fetch('/api/logout', { method: 'POST' }) followed by window.location.href = '/login' to actually terminate the server-side session and redirect.",
      },
      {
        q: 'What happens if the user has multiple tabs of the app open?',
        a: "As written, each tab tracks its own independent idle timer, so a user active in one tab could still see a timeout modal pop up in a background tab. Production implementations typically synchronize activity across tabs using the BroadcastChannel API or a shared localStorage timestamp key that every tab's activity listener updates and reads, so the idle clock is effectively shared across the whole browser session rather than per-tab.",
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly why activity listeners are throttled with a 400ms guard rather than resetting the interval on every raw event, and how the SVG ring's stroke-dashoffset math converts warningSeconds into the animated arc. It's also a good candidate to extend with AI help: ask it to add cross-tab synchronization using the BroadcastChannel API so the idle timer is shared across every open tab of the app, wire staySignedIn() and forceSignOut() to real fetch calls against session-refresh and logout endpoints, or add a reduced-motion-aware fallback that swaps the animated ring for a simple numeric countdown when the user has prefers-reduced-motion enabled.`,
      prompt: `Build a session idle-timeout warning system in plain HTML, CSS, and JavaScript, with a sped-up demo timer (a handful of seconds) clearly labeled as compressed from a real-world minutes-long timeout, for demonstration purposes.

Requirements:
- Track genuine user activity — mouse movement, key presses, clicks, and scrolling — with throttled document-level event listeners, and reset an idle countdown any time real activity is detected, not only through a dedicated button.
- Show ambient awareness of the idle state on the page itself before any modal appears, such as a live "idle for Ns" readout or a progress bar, so an attentive user is never surprised.
- When the idle limit is reached, show a calm (not jarring) modal dialog — soft backdrop, neutral security-style icon (not an alarming red warning triangle), and reassuring first-person copy — containing a second, shorter countdown before automatic logout.
- Animate the in-modal countdown as a circular progress ring (using SVG stroke-dasharray/stroke-dashoffset, not a library) alongside a large numeral, and visually shift its color as time runs low.
- Provide two clearly visible, roughly equally weighted actions in the modal: a primary "stay signed in" action that resets the idle timer and closes the modal, and a secondary "log out now" action that ends the session immediately — neither should be hidden, tiny, or hard to find compared to the other.
- If the in-modal countdown reaches zero without the user acting, automatically trigger the same logout behavior as the "log out now" button, and show some form of after-the-fact confirmation (e.g. a toast) explaining that the session ended due to inactivity.
- While the modal is open, activity elsewhere on the page must not silently reset the timer without the user explicitly interacting with the modal's own buttons — the modal should be the sole decision point once it appears.
- Use proper dialog accessibility semantics: an alertdialog role, aria-modal, and labels tied to the modal's heading and description text.`,
    },
  },
};

export default sessionTimeoutModal;
