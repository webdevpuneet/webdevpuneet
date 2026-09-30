const focusStatusToggle = {
  id: 'focus-status-toggle',
  title: 'Focus Mode / Do Not Disturb Status Toggle',
  lastmod: '2026-08-08',
  category: 'forms',
  html: `<div class="demo-wrap">
  <div class="demo-topbar">
    <div class="mock-avatar">
      PS
      <span class="status-dot available" id="avatar-dot"></span>
    </div>
    <div class="mock-name">
      Puneet Sharma
      <span class="focus-badge hidden" id="focus-badge">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <span id="focus-countdown">30:00</span>
        <button id="end-focus-inline" aria-label="End focus mode">&times;</button>
      </span>
    </div>
  </div>

  <div class="status-card">
    <h3>Set your status</h3>
    <div class="status-options" id="status-options" role="radiogroup" aria-label="Presence status">
      <button class="status-opt" data-status="available" role="radio" aria-checked="true">
        <span class="status-dot available"></span>
        <div class="status-opt-text">
          <span class="opt-title">Available</span>
          <span class="opt-desc">Visible and reachable for messages</span>
        </div>
      </button>
      <button class="status-opt" data-status="focus" role="radio" aria-checked="false">
        <span class="status-dot focus"></span>
        <div class="status-opt-text">
          <span class="opt-title">Focus mode</span>
          <span class="opt-desc">Notifications paused, status shown to teammates</span>
        </div>
      </button>
      <button class="status-opt" data-status="away" role="radio" aria-checked="false">
        <span class="status-dot away"></span>
        <div class="status-opt-text">
          <span class="opt-title">Away</span>
          <span class="opt-desc">Stepped away, may be slow to respond</span>
        </div>
      </button>
    </div>

    <div class="duration-panel hidden" id="duration-panel">
      <p class="duration-label">Pause notifications for</p>
      <div class="duration-chips">
        <button class="chip" data-mins="30">30 min</button>
        <button class="chip" data-mins="60">1 hour</button>
        <button class="chip" data-mins="tomorrow">Until tomorrow</button>
      </div>
    </div>

    <div class="active-focus hidden" id="active-focus">
      <div class="active-focus-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <div>
          <p class="active-title">Focus mode active</p>
          <p class="active-sub">Notifications paused &middot; <span id="active-remaining">30:00</span> remaining</p>
        </div>
      </div>
      <button class="end-btn" id="end-focus">End focus mode</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; flex-direction: column; align-items: center; gap: 20px; min-height: 100vh; padding: 40px 24px; }

.demo-topbar {
  width: 380px; max-width: 100%;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 12px 16px; display: flex; align-items: center; gap: 12px;
}
.mock-avatar {
  position: relative; width: 38px; height: 38px; border-radius: 50%;
  background: #6366f1; color: #fff; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.status-dot {
  width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff;
  position: absolute; bottom: -1px; right: -1px;
}
.status-dot.available { background: #22c55e; }
.status-dot.focus { background: #8b5cf6; }
.status-dot.away { background: #f59e0b; }

.mock-name { font-size: 13px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.focus-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: #f5f3ff; color: #7c3aed; border: 1px solid #ddd6fe;
  font-size: 11px; font-weight: 700; padding: 3px 8px 3px 7px; border-radius: 20px;
  transition: opacity 0.2s;
}
.focus-badge.hidden { display: none; }
.focus-badge button {
  background: none; border: none; color: #7c3aed; font-size: 14px; line-height: 1;
  cursor: pointer; padding: 0 0 0 2px; font-weight: 700;
}

.status-card {
  width: 380px; max-width: 100%;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 20px; box-shadow: 0 8px 30px rgba(15,23,42,0.06);
}
.status-card h3 { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }

.status-options { display: flex; flex-direction: column; gap: 6px; }
.status-opt {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 10px; border: 1.5px solid transparent;
  background: transparent; cursor: pointer; text-align: left; font-family: inherit;
  transition: background 0.15s, border-color 0.15s;
}
.status-opt:hover { background: #f8fafc; }
.status-opt:focus-visible { outline: 2px solid #6366f1; outline-offset: 1px; }
.status-opt[aria-checked="true"] { background: #eef2ff; border-color: #c7d2fe; }

.status-opt .status-dot { position: static; border: none; width: 10px; height: 10px; flex-shrink: 0; }
.status-opt-text { display: flex; flex-direction: column; gap: 2px; }
.opt-title { font-size: 13px; font-weight: 700; color: #1e293b; }
.opt-desc { font-size: 11.5px; color: #94a3b8; }

.duration-panel { margin-top: 10px; padding: 12px; background: #f8fafc; border-radius: 10px; }
.duration-panel.hidden { display: none; }
.duration-label { font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 8px; }
.duration-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip {
  background: #fff; border: 1.5px solid #e2e8f0; color: #475569;
  font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;
  cursor: pointer; font-family: inherit; transition: all 0.15s;
}
.chip:hover { border-color: #8b5cf6; color: #8b5cf6; }
.chip.selected { background: #8b5cf6; border-color: #8b5cf6; color: #fff; }

.active-focus {
  margin-top: 14px; padding: 12px 14px; border-radius: 12px;
  background: #f5f3ff; border: 1px solid #ddd6fe;
  display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
}
.active-focus.hidden { display: none; }
.active-focus-info { display: flex; align-items: center; gap: 10px; color: #7c3aed; }
.active-title { font-size: 12.5px; font-weight: 700; color: #4c1d95; }
.active-sub { font-size: 11.5px; color: #7c3aed; }
.end-btn {
  background: #fff; color: #7c3aed; border: 1.5px solid #c4b5fd;
  font-size: 12px; font-weight: 700; padding: 7px 12px; border-radius: 8px;
  cursor: pointer; font-family: inherit; transition: background 0.15s;
}
.end-btn:hover { background: #ede9fe; }`,
  js: `const statusOptions = document.getElementById('status-options');
const durationPanel = document.getElementById('duration-panel');
const activeFocus = document.getElementById('active-focus');
const focusBadge = document.getElementById('focus-badge');
const avatarDot = document.getElementById('avatar-dot');
const focusCountdown = document.getElementById('focus-countdown');
const activeRemaining = document.getElementById('active-remaining');
const endFocusBtn = document.getElementById('end-focus');
const endFocusInline = document.getElementById('end-focus-inline');

let currentStatus = 'available';
let focusEndsAt = null;
let tickId = null;

function setStatus(status) {
  currentStatus = status;
  statusOptions.querySelectorAll('.status-opt').forEach((opt) => {
    const checked = opt.dataset.status === status;
    opt.setAttribute('aria-checked', String(checked));
  });

  avatarDot.className = 'status-dot ' + status;

  if (status === 'focus') {
    durationPanel.classList.remove('hidden');
  } else {
    durationPanel.classList.add('hidden');
    endFocus();
  }
}

function formatRemaining(ms) {
  if (ms <= 0) return '0:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  const ss = String(s).padStart(2, '0');
  return h > 0 ? h + ':' + mm + ':' + ss : mm + ':' + ss;
}

function startFocus(mins) {
  const durationMs = mins === 'tomorrow'
    ? msUntilTomorrow9am()
    : mins * 60 * 1000;
  focusEndsAt = Date.now() + durationMs;

  focusBadge.classList.remove('hidden');
  activeFocus.classList.remove('hidden');
  durationPanel.classList.add('hidden');

  clearInterval(tickId);
  tickId = setInterval(tickCountdown, 1000);
  tickCountdown();
}

function msUntilTomorrow9am() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

function tickCountdown() {
  if (!focusEndsAt) return;
  const remaining = focusEndsAt - Date.now();
  if (remaining <= 0) {
    endFocus();
    setStatus('available');
    return;
  }
  const label = formatRemaining(remaining);
  focusCountdown.textContent = label;
  activeRemaining.textContent = label;
}

function endFocus() {
  focusEndsAt = null;
  clearInterval(tickId);
  focusBadge.classList.add('hidden');
  activeFocus.classList.add('hidden');
  document.querySelectorAll('.chip.selected').forEach((c) => c.classList.remove('selected'));
}

statusOptions.addEventListener('click', (e) => {
  const opt = e.target.closest('.status-opt');
  if (!opt) return;
  setStatus(opt.dataset.status);
});

statusOptions.addEventListener('keydown', (e) => {
  const opts = Array.from(statusOptions.querySelectorAll('.status-opt'));
  const idx = opts.indexOf(document.activeElement);
  if (idx === -1) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    opts[(idx + 1) % opts.length].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    opts[(idx - 1 + opts.length) % opts.length].focus();
  }
});

durationPanel.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip.selected').forEach((c) => c.classList.remove('selected'));
  chip.classList.add('selected');
  const mins = chip.dataset.mins === 'tomorrow' ? 'tomorrow' : Number(chip.dataset.mins);
  startFocus(mins);
});

endFocusBtn.addEventListener('click', () => {
  endFocus();
  setStatus('available');
});
endFocusInline.addEventListener('click', () => {
  endFocus();
  setStatus('available');
});

statusOptions.querySelectorAll('.status-opt').forEach((opt, i) => {
  opt.setAttribute('tabindex', i === 0 ? '0' : '0');
});`,
  seo: {
    title: 'Focus Mode / Do Not Disturb Status Toggle — HTML CSS JS',
    description: 'Presence status picker with focus-mode duration picker, live countdown badge, and one-click end action. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Focus Mode Status Toggle — Presence Picker, Duration Selector & Live Countdown Badge',
      description: `Presence status — Available, Focus mode, Away — has quietly become one of the most-used controls in modern collaboration software. Slack, Discord, Microsoft Teams, and Linear all ship a status picker prominently in their top-level UI, and for good reason: visible status serves two audiences at once. It tells the *user themselves* that they've deliberately entered a protected work state, and it tells *teammates* not to expect an immediate response — without either party needing to send or read an explanatory message. This snippet implements that full pattern: a three-way status picker, a focus-mode duration selector, and a persistent, live-counting badge that reflects the active state anywhere else in the interface.

**Why explicit focus status beats silent notification muting**

Muting notifications silently (turning off sound with no visible signal) solves half the problem — the user is undisturbed, but teammates have no idea why messages are going unanswered and may escalate through another channel, assume the user is ignoring them, or simply lose trust in the async communication norms of the team. Visible focus status resolves this asymmetry: a small purple dot and "Focus mode active" label next to the user's avatar communicates *why* they're unreachable without the user having to type a single word. This is a specific instance of a broader 2026 "attention design" trend — interfaces increasingly treat a user's attention as a resource worth explicitly protecting and signaling, rather than treating every notification as equally deserving of interruption.

**Three status states, one shared component**

The \`.status-options\` group uses \`role="radiogroup"\` with each option as \`role="radio"\` and \`aria-checked\`, correctly modeling mutually-exclusive selection for assistive technology — only one of Available, Focus mode, or Away can be active at a time, exactly like a native radio button group, even though the markup uses styled \`<button>\` elements rather than \`<input type="radio">\` for full visual control. \`setStatus()\` is the single function responsible for updating the ARIA state, the color-coded \`.status-dot\` (green for available, purple for focus, amber for away), and conditionally revealing the duration picker — keeping presentation and state perfectly in sync from one code path.

**Duration selection and the countdown badge**

Selecting "Focus mode" doesn't immediately activate anything — it reveals an inline \`.duration-panel\` with three duration chips: 30 minutes, 1 hour, or "Until tomorrow" (calculated via \`msUntilTomorrow9am()\`, which targets the next day at 9am rather than a fixed offset, matching how most real focus-mode features define an "overnight" duration). Choosing a duration calls \`startFocus()\`, which records \`focusEndsAt\` as an absolute timestamp (not a countdown value) — a small but important detail, because deriving remaining time as \`focusEndsAt - Date.now()\` on every tick keeps the countdown accurate even if the tab is backgrounded and \`setInterval\` timing drifts, whereas decrementing a counter every second would drift under exactly those conditions. The countdown renders in two places simultaneously — the compact \`.focus-badge\` next to the mock avatar and the fuller \`.active-focus\` panel below the status picker — both fed by the same \`tickCountdown()\` function, demonstrating how a single piece of state (\`focusEndsAt\`) can drive multiple UI surfaces without duplicating logic.

**One-click exit, always available**

Because focus mode is meant to be a deliberate, temporary state rather than a trap, an "End focus mode" action is available from both the compact badge (a small × button) and the full status card, and selecting a different status (Available or Away) also implicitly ends focus mode via the same \`endFocus()\` cleanup path. This reflects a core usability rule for any interruption-blocking feature: exiting must always be at least as easy as entering, or users will distrust the feature and stop using it — the opposite of the intended calm-UI benefit.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a status', text: 'Click Available, Focus mode, or Away in the .status-options radiogroup — setStatus() updates aria-checked on each option and recolors the .status-dot next to the mock avatar to match.' },
        { title: 'Choose a focus duration', text: 'Selecting "Focus mode" reveals the .duration-panel with three chips: 30 min, 1 hour, or Until tomorrow. Clicking a chip calls startFocus(mins), which sets focusEndsAt as an absolute timestamp and starts the countdown interval.' },
        { title: 'Watch the live countdown badge', text: 'Once focus mode is active, the compact .focus-badge next to the avatar and the fuller .active-focus panel both show a live MM:SS countdown, updated every second by tickCountdown() reading Date.now() against the stored focusEndsAt.' },
        { title: 'End focus mode early', text: 'Click the × on the compact badge or the "End focus mode" button in the active-focus panel — both call endFocus(), which clears the interval, hides both countdown displays, and resets the selected duration chip.' },
        { title: 'Navigate the status picker by keyboard', text: 'With focus inside .status-options, press ArrowUp/ArrowDown to move between the three status buttons, matching standard radiogroup keyboard behavior.' },
        { title: 'Wire real presence data', text: 'Replace setStatus() and startFocus() with calls to your backend presence API (e.g. a WebSocket presence channel), keeping focusEndsAt as the source of truth so the countdown logic continues to work against a server-provided expiry timestamp.' },
      ],
    },
    features: [
      'role="radiogroup" / role="radio" / aria-checked status picker for correct assistive-technology semantics on styled buttons',
      'Duration picker (30 min / 1 hour / Until tomorrow) revealed inline only when Focus mode is selected',
      'msUntilTomorrow9am() calculates an absolute next-day-9am timestamp rather than a fixed hour offset for the overnight option',
      'Drift-proof countdown: focusEndsAt stored as an absolute timestamp, remaining time derived fresh each tick via Date.now() subtraction',
      'Countdown rendered in two synced locations (compact avatar badge + full status card) from one shared tickCountdown() function',
      'One-click exit from both the compact badge and full panel, plus automatic focus-mode exit when switching to another status',
      'Color-coded status dots (green/purple/amber) applied consistently on both the avatar and the status option list',
      'Keyboard-navigable radiogroup with ArrowUp/ArrowDown movement between status options',
    ],
    useCases: [
      { icon: 'FORM', title: 'Collaboration tool presence and notification controls', desc: 'Chat and project-management tools like Slack, Discord, and Linear all need a way for users to signal availability without typing an explanation. Wire this component to your app\'s WebSocket presence channel so other users see the same status and countdown in real time, replacing the mock local timer with a server-synced expiry.' },
      { icon: 'FLOW', title: 'Deep-work and productivity app status signaling', desc: 'Standalone focus/productivity apps (Pomodoro timers, deep-work trackers) can use this exact duration-picker-plus-countdown pattern as their core session control, extending startFocus() to also trigger a browser notification-blocking API call or pause connected calendar-based auto-status integrations.' },
      { icon: 'DESIGN', title: 'Attention-protecting design system component', desc: 'As "focus mode" and do-not-disturb indicators become standard across productivity software, having a reusable, accessible presence-picker component in your design system avoids every team reinventing radiogroup semantics and countdown-drift handling independently. See also the [Toast Notification](/ui-snippets/toast-notification/) snippet for a complementary notification-suppression pattern.' },
      { icon: 'LEARN', title: 'Teaching drift-proof countdown timers', desc: 'The absolute-timestamp countdown technique (storing focusEndsAt and deriving remaining time via subtraction on each tick, rather than decrementing a counter) is broadly reusable for any countdown UI — session expiry warnings, flash-sale timers, OTP resend cooldowns — making this a useful reference beyond just the status-toggle use case.' },
      { icon: 'APP', title: 'Customer support and on-call status indicators', desc: 'Support and on-call rotation tools can adapt the same three-state model (Available / Focus / Away) to represent agent availability, using the countdown badge to show teammates and dispatch systems exactly when an agent will next be reachable, reducing duplicate ticket assignment to unavailable agents.' },
      { icon: 'CODE', title: 'Prototyping presence UX before backend presence infrastructure exists', desc: 'Frontend and product teams can demo the full focus-mode interaction — selection, duration picker, live countdown, one-click exit — with this self-contained mock before the real-time presence backend (WebSocket channel, database TTL, push notifications) is built.' },
      { icon: 'CODE', title: 'Related: Morse Code Translator & Player', desc: 'See the [Morse Code Translator & Player](/ui-snippets/morse-code-translator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why store focusEndsAt as an absolute timestamp instead of counting down a number directly?', a: 'Deriving remaining time as `focusEndsAt - Date.now()` on every tick keeps the countdown accurate regardless of setInterval timing drift, browser tab throttling in background tabs, or the system clock momentarily lagging — all of which can cause a manually decremented counter to drift out of sync with real elapsed time. An absolute end timestamp is also trivially resumable: if the page reloads mid-focus-session, restoring focusEndsAt from storage and re-running tickCountdown() picks up exactly where it left off with no accumulated error.' },
      { q: 'How do I sync this status across multiple devices or to teammates in real time?', a: 'Replace the local setStatus()/startFocus() state mutations with calls to a backend presence API — typically a WebSocket or Server-Sent Events channel that broadcasts { status, focusEndsAt } to all of a user\'s connected sessions and to teammates viewing their profile. Keep the client-side countdown logic (deriving remaining time from the timestamp) unchanged; only the source of focusEndsAt changes, from a locally computed value to one pushed from the server.' },
      { q: 'Why does the "Until tomorrow" option calculate 9am specifically?', a: 'msUntilTomorrow9am() targets the next day at 9:00 AM local time rather than a flat 24-hour offset, mirroring how most real do-not-disturb "until tomorrow" features work — the intent is "pause until the start of my next work day," not "pause for exactly 24 hours," which would end at an inconvenient time like 11:47 PM. Adjust the target hour to match your product\'s typical work-day start time.' },
      { q: 'What happens if focus mode is active and the user selects Available or Away instead?', a: 'setStatus() calls endFocus() whenever the newly selected status is not "focus", clearing the countdown interval and hiding both badge displays immediately — so switching status is itself a valid way to end focus mode, in addition to the explicit "End focus mode" button and the inline × on the compact badge. This ensures there is no state where the picker shows a non-focus status while a focus countdown is still silently running.' },
      { q: 'How is the status picker accessible to screen reader and keyboard users?', a: 'The three options are marked up as `role="radiogroup"` containing `role="radio"` buttons with `aria-checked` reflecting the current selection, which screen readers announce as a standard mutually-exclusive radio group. ArrowUp and ArrowDown move focus between the three options, matching the expected keyboard behavior for a radiogroup per the WAI-ARIA Authoring Practices Guide, and each option remains a real `<button>` so Enter and Space activation work natively without extra key handling.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why focusEndsAt is stored as an absolute timestamp rather than a countdown integer, and how that choice avoids timer drift — it's a genuinely reusable technique worth understanding before you build any other countdown UI. Good extensions to ask the assistant for: syncing status across a WebSocket presence channel so teammates see the same live countdown, persisting the active focus session to localStorage or a backend so it survives a page reload, and adding a "custom duration" option with a numeric input alongside the three preset chips. You could also ask it to review the radiogroup keyboard handling against the WAI-ARIA Authoring Practices Guide to confirm Home/End key support would be a worthwhile addition.`,
      prompt: `Build a three-state presence/status toggle (Available, Focus mode, Away) in plain HTML, CSS, and JavaScript with a focus-mode duration picker and a live countdown.

Requirements:
- A radiogroup-style status picker with exactly three mutually exclusive options, using correct ARIA semantics (role="radiogroup", role="radio", aria-checked) even though the options are styled buttons rather than native radio inputs, with ArrowUp/ArrowDown keyboard navigation between them.
- Selecting "Focus mode" reveals an inline duration picker with three preset options (e.g. 30 minutes, 1 hour, and an "until tomorrow" option that targets the next day at a fixed morning hour rather than a flat 24-hour offset) before the mode actually activates.
- Once a duration is chosen, show a persistent live countdown in two places at once — a compact badge near a mock user avatar and a fuller status panel — both driven by one shared piece of state so they never disagree, and derive the remaining time each tick from an absolute end timestamp (not a manually decremented counter) so the countdown cannot drift.
- Provide a one-click "End focus mode" action reachable from both the compact badge and the full panel, and also automatically end focus mode if the user switches to a different status option while it's active.
- Color-code the presence dot consistently between the status picker options and the mock avatar indicator.
- Handle the countdown reaching zero by automatically ending focus mode and reverting the status to Available.`,
    },
  },
};
export default focusStatusToggle;
