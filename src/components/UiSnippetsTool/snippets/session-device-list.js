const sessionDeviceList = {
  id: 'session-device-list',
  title: 'Active Sessions / Device List',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="sdl-card">
  <div class="sdl-head">
    <div>
      <h2>Active Sessions</h2>
      <p class="sdl-sub">Devices currently signed in to your account</p>
    </div>
    <button type="button" class="sdl-signout-all" id="sdlSignOutAll">Sign out all other sessions</button>
  </div>
  <div class="sdl-list" id="sdlList"></div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.sdl-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:24px;max-width:560px;margin:0 auto}
.sdl-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;margin-bottom:18px}
.sdl-head h2{font-size:18px;margin:0 0 4px}
.sdl-sub{font-size:12px;color:#8b90a8;margin:0}
.sdl-signout-all{font-size:12px;font-weight:700;color:#f87171;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.25);padding:8px 12px;border-radius:9px;cursor:pointer;white-space:nowrap}
.sdl-signout-all:hover{background:rgba(248,113,113,.18)}
.sdl-list{display:flex;flex-direction:column;gap:10px}
.sdl-row{display:flex;align-items:center;gap:14px;background:#161927;border:1px solid #262a3b;border-radius:14px;padding:14px;transition:opacity .25s ease,transform .25s ease}
.sdl-row.sdl-removing{opacity:0;transform:translateX(8px)}
.sdl-icon{width:40px;height:40px;border-radius:10px;background:#20243a;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px}
.sdl-info{flex:1;min-width:0}
.sdl-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sdl-device{font-size:14px;font-weight:700;color:#f2f3fa}
.sdl-badge{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#4ade80;background:rgba(74,222,128,.12);padding:2px 8px;border-radius:999px}
.sdl-meta{font-size:12px;color:#8b90a8;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sdl-signout{font-size:12px;font-weight:600;color:#a8adc4;background:#20243a;border:1px solid #2c3050;padding:7px 12px;border-radius:8px;cursor:pointer;flex-shrink:0}
.sdl-signout:hover{background:#262b45;color:#fff}
.sdl-signout:disabled{opacity:.4;cursor:not-allowed}`,

  js: `var sessions = [
  { id: 's1', device: 'MacBook Pro', browser: 'Chrome on macOS', icon: '\\u{1F4BB}', location: 'San Francisco, US', lastActive: 'now', current: true },
  { id: 's2', device: 'iPhone 15', browser: 'Safari on iOS', icon: '\\u{1F4F1}', location: 'San Francisco, US', lastActive: '12 minutes ago', current: false },
  { id: 's3', device: 'Windows PC', browser: 'Edge on Windows', icon: '\\u{1F5A5}\\uFE0F', location: 'Austin, US', lastActive: '3 hours ago', current: false },
  { id: 's4', device: 'iPad Air', browser: 'Safari on iPadOS', icon: '\\u{1F4F1}', location: 'Denver, US', lastActive: '2 days ago', current: false },
  { id: 's5', device: 'Linux Desktop', browser: 'Firefox on Linux', icon: '\\u{1F5A5}\\uFE0F', location: 'Berlin, DE', lastActive: '5 days ago', current: false },
];

var list = document.getElementById('sdlList');

function render() {
  list.innerHTML = '';
  sessions.forEach(function (s) {
    var row = document.createElement('div');
    row.className = 'sdl-row';
    row.dataset.id = s.id;

    var icon = document.createElement('div');
    icon.className = 'sdl-icon';
    icon.textContent = s.icon;

    var info = document.createElement('div');
    info.className = 'sdl-info';
    var top = document.createElement('div');
    top.className = 'sdl-top';
    var device = document.createElement('span');
    device.className = 'sdl-device';
    device.textContent = s.device;
    top.appendChild(device);
    if (s.current) {
      var badge = document.createElement('span');
      badge.className = 'sdl-badge';
      badge.textContent = 'This device';
      top.appendChild(badge);
    }
    var meta = document.createElement('div');
    meta.className = 'sdl-meta';
    meta.textContent = s.browser + ' \\u00b7 ' + s.location + ' \\u00b7 Active ' + s.lastActive;

    info.appendChild(top);
    info.appendChild(meta);

    row.appendChild(icon);
    row.appendChild(info);

    if (!s.current) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sdl-signout';
      btn.textContent = 'Sign out';
      btn.addEventListener('click', function () {
        signOut(s.id);
      });
      row.appendChild(btn);
    }

    list.appendChild(row);
  });
}

function signOut(id) {
  var row = list.querySelector('[data-id="' + id + '"]');
  if (row) {
    row.classList.add('sdl-removing');
    setTimeout(function () {
      sessions = sessions.filter(function (s) { return s.id !== id; });
      render();
    }, 220);
  }
}

document.getElementById('sdlSignOutAll').addEventListener('click', function () {
  var rows = list.querySelectorAll('.sdl-row');
  rows.forEach(function (row) {
    var id = row.dataset.id;
    var session = sessions.find(function (s) { return s.id === id; });
    if (session && !session.current) {
      row.classList.add('sdl-removing');
    }
  });
  setTimeout(function () {
    sessions = sessions.filter(function (s) { return s.current; });
    render();
  }, 220);
});

render();`,

  seo: {
    title: 'Active Sessions / Device List — Free Security Settings Panel',
    description: `A security-settings session list with device icons, location, last-active time, a "This device" badge, and per-row plus bulk sign-out. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Active Sessions / Device List — Manage Where You\'re Signed In',
      description: `The active sessions panel is the security-settings staple that lists every device currently signed in to an account, so users can spot anything unfamiliar and shut it down. This snippet builds one in plain HTML, CSS, and JavaScript, driven by a single sessions array.

**Reading each row**

Every session shows a device-type icon, the device and browser name, location, and a relative last-active time — the same information real account-security pages (Google, GitHub, Slack) surface so users can recognize their own devices and spot ones they don't. The current device gets a distinct green "This device" badge and no sign-out button, since you can't sign yourself out of the session you're viewing the list from.

**Per-row sign-out**

Every non-current row has its own "Sign out" button. Clicking it adds a \`sdl-removing\` class that fades and slides the row out, then removes that session from the underlying \`sessions\` array after the transition completes and re-renders — so the state (not just the DOM) is genuinely updated, which matters if you re-render the list for any other reason.

**Bulk "sign out all other sessions"**

The header's bulk action animates out every row except the current device's, then filters the \`sessions\` array down to just \`{ current: true }\` — the same pattern real security pages use to let a user immediately invalidate every session but their own after, say, a suspected compromise.

**Why this matters for security UX**

Session lists are a core part of account security hygiene, and the interaction details matter: never letting a user accidentally sign out their own active session, making the "this device" identity unambiguous, and giving a fast bulk path for the "I think something's wrong" moment.

**Customizing it**

Wire the sign-out actions to real API calls (revoke the session token server-side before removing it from state), add IP addresses or session-start timestamps, or add a confirmation dialog before the bulk sign-out. Pair it with a [settings panel](/ui-snippets/settings-panel/), [passkey login](/ui-snippets/passkey-login/), or [API key manager](/ui-snippets/api-key-manager/) for a complete account-security suite.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The session list renders with the current device badged.` },
      { title: 'Click "Sign out" on a row', text: `That row fades out and is removed from the list.` },
      { title: 'Click "Sign out all other sessions"', text: `Every row except the current device animates out.` },
      { title: 'Swap in real session data', text: `Replace the sessions array with your API response.` },
      { title: 'Wire sign-out to your backend', text: `Call your revoke-session endpoint before removing from state.` },
    ] },
    features: [
      { title: 'Current-device badge', text: `Clearly marks the session you're viewing from.` },
      { title: 'Per-row sign-out', text: `Revoke a single session with animated removal.` },
      { title: 'Bulk sign-out all others', text: `One action clears every session but the current one.` },
      { title: 'Device + browser labels', text: `Readable identification for each session.` },
      { title: 'Location and last-active time', text: `Context to help spot unfamiliar sessions.` },
      { title: 'No accidental self-lockout', text: `Current device never shows a sign-out button.` },
      { title: 'Smooth removal transition', text: `Fade-and-slide before state actually updates.` },
      { title: 'Zero dependencies', text: `Pure DOM rendering from a data array.` },
    ],
    useCases: [
      { title: 'Account security settings', text: `Let users audit and manage active logins.` },
      { title: 'SaaS admin panels', text: `Give team admins visibility into member sessions.` },
      { title: 'Post-breach response', text: `Fast bulk sign-out after a suspected compromise.` },
      { title: 'Banking/fintech apps', text: `Pair with [passkey login](/ui-snippets/passkey-login/) for account trust.` },
      { title: 'Developer platforms', text: `Show alongside an [API key manager](/ui-snippets/api-key-manager/).` },
      { title: 'Enterprise SSO tools', text: `Surface device compliance and session hygiene.` },
    ],
    faqs: [
      { q: 'Can a user accidentally sign themselves out from this list?', a: `No — the current session (marked current: true in the data) never renders a "Sign out" button, so there's no path to sign out of the session you're currently using from this panel alone.` },
      { q: 'Does clicking "Sign out" immediately remove the session from the data?', a: `It animates first: a sdl-removing class fades and slides the row out over about 220ms, then the session is filtered out of the underlying array and the list re-renders. This keeps the visual removal smooth while still genuinely updating state, not just hiding a DOM node.` },
      { q: 'What does "Sign out all other sessions" actually do?', a: `It animates out every row except the current device, then replaces the sessions array with only the entries where current is true. In a real implementation, you'd call your backend's bulk-revoke endpoint at the same time so the sessions are actually invalidated server-side, not just removed from the local UI.` },
      { q: 'How do I connect this to a real backend?', a: `Replace the static sessions array with data fetched from your sessions API, and inside signOut(id) and the bulk handler, call your revoke-session endpoint (e.g. DELETE /api/sessions/:id) before or alongside updating local state, handling failures by reverting the optimistic removal.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move sessions into component state, render rows with a list/map over that state, and trigger the fade-out via a CSS transition tied to a per-row "removing" flag before actually filtering the array — the same two-phase animate-then-remove pattern used here.` },
    ],
    aiPrompt: {
      paragraph: `Session-management UIs carry real security stakes, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to review the sign-out flow specifically: does the current device correctly stay protected from any code path, does the animate-then-remove timing risk a race if a user clicks sign-out twice quickly, and what changes would be needed to make the local state removal reflect a real optimistic-update-with-rollback pattern against a backend API. It's also useful for hardening the UX: ask the assistant to add a confirmation modal before the bulk "sign out all other sessions" action, to show a relative-time library-backed "last active" that updates live instead of a static string, or to add a visual warning badge on sessions from unfamiliar locations by comparing against the user's typical login geography.`,
      prompt: `Build an "active sessions / device list" security settings panel in plain HTML, CSS, and JavaScript — no dependencies, no CDN.

Requirements:
- Render a list of session rows from a data array, each with: a device-type icon/emoji, device name, browser name, location, and a relative "last active" time string.
- Mark exactly one session as the current device with a distinct badge (e.g. "This device"), and never render a sign-out button on that row — a user must not be able to sign themselves out of the session they're currently viewing from.
- Every other row gets its own "Sign out" button. Clicking it should animate the row out (fade + slight slide) and THEN remove that session from the underlying data array and re-render, not just hide it visually.
- Add a "Sign out all other sessions" bulk action in the header that animates out every non-current row and then filters the data array down to just the current session.
- Style it as a clean security-settings card: dark theme, one row per session, clear visual hierarchy between device name, badge, and metadata.`,
    },
  },
};

export default sessionDeviceList;
