const avatarStatusList = {
  id: 'avatar-status-list',
  title: 'Avatar Status List',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="as-card">
  <div class="as-head">
    <h3>Team</h3>
    <span class="as-count" id="asCount">0 online</span>
  </div>
  <ul class="as-list" id="asList">
    <li class="as-row" data-status="online">
      <span class="as-av" style="--c:#6366f1">EM</span>
      <div class="as-meta"><span class="as-name">Elena Marsh</span><span class="as-role">Product design</span></div>
      <span class="as-dot"></span>
    </li>
    <li class="as-row" data-status="busy">
      <span class="as-av" style="--c:#ec4899">JK</span>
      <div class="as-meta"><span class="as-name">Jordan Kim</span><span class="as-role">Engineering</span></div>
      <span class="as-dot"></span>
    </li>
    <li class="as-row" data-status="away">
      <span class="as-av" style="--c:#f59e0b">RP</span>
      <div class="as-meta"><span class="as-name">Riya Patel</span><span class="as-role">Marketing</span></div>
      <span class="as-dot"></span>
    </li>
    <li class="as-row" data-status="online">
      <span class="as-av" style="--c:#10b981">TS</span>
      <div class="as-meta"><span class="as-name">Tomas Silva</span><span class="as-role">Support</span></div>
      <span class="as-dot"></span>
    </li>
    <li class="as-row" data-status="offline">
      <span class="as-av" style="--c:#64748b">AW</span>
      <div class="as-meta"><span class="as-name">Ava Wong</span><span class="as-role">Sales</span></div>
      <span class="as-dot"></span>
    </li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0e17;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.as-card{width:320px;background:#141826;border:1px solid #232838;border-radius:18px;padding:8px 8px 12px}
.as-head{display:flex;align-items:center;justify-content:space-between;padding:14px 12px 10px}
.as-head h3{color:#fff;font-size:16px}
.as-count{color:#8a92a8;font-size:12px;font-weight:600;background:#1d2233;padding:4px 10px;border-radius:999px}
.as-list{list-style:none}
.as-row{display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:12px;cursor:pointer;transition:background .15s}
.as-row:hover{background:#1b2030}
.as-av{position:relative;flex-shrink:0;width:40px;height:40px;border-radius:50%;background:color-mix(in srgb,var(--c) 88%,#000 0);display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;letter-spacing:.02em}
.as-meta{display:flex;flex-direction:column;flex:1;min-width:0}
.as-name{color:#e9ecf5;font-size:14px;font-weight:600}
.as-role{font-size:12px;color:#7b8398}
.as-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0;box-shadow:0 0 0 3px #141826}
[data-status="online"] .as-dot{background:#22c55e}
[data-status="busy"] .as-dot{background:#ef4444}
[data-status="away"] .as-dot{background:#f59e0b}
[data-status="offline"] .as-dot{background:#5b6477}
/* Pulse ring for online members. */
[data-status="online"] .as-dot{animation:asPulse 2s infinite}
@keyframes asPulse{0%{box-shadow:0 0 0 3px #141826,0 0 0 3px rgba(34,197,94,.5)}70%{box-shadow:0 0 0 3px #141826,0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 3px #141826,0 0 0 8px rgba(34,197,94,0)}}
[data-status="offline"]{opacity:.6}`,

  js: `var list = document.getElementById('asList');
var countEl = document.getElementById('asCount');
var ORDER = { online: 0, busy: 1, away: 2, offline: 3 };

function refresh() {
  var rows = Array.prototype.slice.call(list.children);
  // Sort by presence so active people rise to the top.
  rows.sort(function (a, b) { return ORDER[a.dataset.status] - ORDER[b.dataset.status]; });
  rows.forEach(function (r) { list.appendChild(r); });
  var online = rows.filter(function (r) { return r.dataset.status === 'online'; }).length;
  countEl.textContent = online + ' online';
}

// Demo: click a row to cycle its presence and re-sort.
var CYCLE = ['online', 'busy', 'away', 'offline'];
list.addEventListener('click', function (e) {
  var row = e.target.closest('.as-row');
  if (!row) return;
  var next = (CYCLE.indexOf(row.dataset.status) + 1) % CYCLE.length;
  row.dataset.status = CYCLE[next];
  refresh();
});

refresh();`,

  seo: {
    title: 'Avatar Status List — Free HTML CSS JS Online Presence List',
    description: `A team presence list with initials avatars, color-coded status dots, a pulsing online ring, and auto-sorting by presence. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Avatar Status List — Who Is Online, at a Glance',
      description: `The avatar status list is the team presence panel from chat and collaboration apps — a column of members with initials avatars and a coloured dot showing whether each person is online, busy, away, or offline. This snippet builds it with plain HTML, CSS, and a small vanilla JavaScript sorter, with no images and no avatar service.

**Initials avatars from a CSS variable**

Each avatar is a circle that shows the member's initials, coloured by a per-row \`--c\` custom property set inline in the markup. Using a CSS variable means one rule styles every avatar and the colour is data, not a separate class — so generating avatars from a list is trivial and you never ship avatar images. The circle uses flex centring to keep the initials perfectly aligned at any size.

**Status as a single data attribute**

A member's presence lives in one \`data-status\` attribute on the row (\`online\`, \`busy\`, \`away\`, or \`offline\`). CSS attribute selectors then colour the status dot — green, red, amber, or grey — and dim offline rows, all from that one value. Changing someone's status is a single attribute write, and the styling follows automatically.

**The pulsing online ring**

Online members get a gentle pulse: a \`@keyframes\` animation expands a translucent green ring out of the status dot using layered \`box-shadow\` (one solid shadow matches the card background to mask the dot edge, the other animates outward and fades). This is the same "live" heartbeat you see on presence indicators, drawing the eye to who's actually available right now without any extra elements.

**Auto-sorting by presence**

A \`refresh()\` function sorts the rows by a presence rank (online first, offline last) and re-appends them in order, so active people always rise to the top of the list — exactly how real presence lists behave. It also counts the online members and updates the header pill. Re-appending existing nodes reorders them without rebuilding the DOM, which is cheap and preserves each row's state.

**Interactive demo**

Clicking a row cycles its status through the four states and re-sorts, so you can see the list reorder live and the online count update. In a real app you'd drive \`data-status\` from a websocket or presence API and call \`refresh()\` whenever a member's state changes.

**Customizing it**

Swap initials for real avatar images, add more statuses (e.g. "in a meeting"), change the dot colours, or remove the auto-sort if you prefer a fixed order. The colour-mix and variable approach makes restyling avatars a one-line change. Pair it with a [team presence list](/ui-snippets/team-presence-list/), an [avatar group](/ui-snippets/avatar-group/), or a [comment thread](/ui-snippets/comment-thread/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A team list renders sorted by presence.` },
      { title: 'Note the dots', text: `Color-coded status with a pulse on online members.` },
      { title: 'Read the count', text: `The header pill shows how many are online.` },
      { title: 'Click a row', text: `Its status cycles and the list re-sorts live.` },
      { title: 'Change a status', text: `Edit the data-status attribute on a row.` },
      { title: 'Use real avatars', text: `Replace initials with an img in the avatar.` },
    ] },
    features: [
      { title: 'Initials avatars', text: `Colored by a per-row CSS variable.` },
      { title: 'Status data attribute', text: `One value drives dot color and dimming.` },
      { title: 'Pulsing online ring', text: `Layered box-shadow keyframes heartbeat.` },
      { title: 'Auto-sort by presence', text: `Online rises, offline sinks.` },
      { title: 'Live online count', text: `Header pill updates on change.` },
      { title: 'No images', text: `Avatars are pure CSS and text.` },
      { title: 'Cheap reordering', text: `Re-appends nodes, no DOM rebuild.` },
      { title: 'API-ready', text: `Drive status from a websocket feed.` },
    ],
    useCases: [
      { title: 'Chat presence panels', text: 'Show who is online beside a [comment thread](/ui-snippets/comment-thread/), with a pulsing ring on online members created by layered box-shadow keyframes.' },
      { title: 'Team presence alternatives', text: 'Offer a richer variant of the [team presence list](/ui-snippets/team-presence-list/), with the list sorting itself so online people rise and offline sink.' },
      { title: 'Collaboration tools', text: 'Pair with [multiplayer cursors](/ui-snippets/multiplayer-cursors/) so a live document shows both who is present and where they are working.' },
      { title: 'Compact summaries', text: 'Condense the list into an [avatar group](/ui-snippets/avatar-group/) where space is tight, keeping the same colour-coded status meanings.' },
      { title: 'Dashboard sidebars and support queues', text: 'Add to a [dashboard layout](/ui-snippets/dashboard-layout/) sidebar, or show available agents on a [status dashboard](/ui-snippets/status-dashboard/) for a support team.' },
      { icon: 'CODE', title: 'Related: CSS backdrop-filter Playground', desc: 'See the [CSS backdrop-filter Playground](/ui-snippets/css-backdrop-filter-playground/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the avatar colors set without extra classes?', a: `Each row sets a --c custom property inline, and one CSS rule colours every avatar from that variable. The colour is data rather than a class, so generating avatars from a list is trivial and no avatar images are shipped. The initials are centred with flexbox so they stay aligned at any size.` },
      { q: 'How does the online pulse work?', a: `Online members get a keyframes animation that expands a translucent green ring out of the status dot using layered box-shadow — one solid shadow matches the card background to mask the dot edge, and the other animates outward and fades. It is the live heartbeat seen on presence indicators, with no extra DOM.` },
      { q: 'How does the list keep active members on top?', a: `A refresh function sorts rows by a presence rank (online first, offline last) and re-appends them in that order. Re-appending existing nodes reorders them without rebuilding the DOM, which is cheap and preserves each row's state. It also counts online members and updates the header pill.` },
      { q: 'How would I connect this to real presence data?', a: `Drive each row's data-status from a websocket or presence API and call refresh whenever a member's state changes. CSS handles all the visual updates from the attribute, so your code only writes one value per member and the dots, dimming, pulse, sort order, and count follow automatically.` },
      { q: 'How do I use this avatar status list in React, Vue, or Angular?', a: `Render rows from a members array, outputting data-status and the --c style per member, and sort the array by presence rank before rendering. Compute the online count from the array. Update statuses from your realtime source in state. The avatar, dot, and pulse CSS port unchanged; in Tailwind use arbitrary keyframes for the pulse.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the sort-and-reappend logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why refresh() re-appends existing row elements instead of rebuilding the list's innerHTML, or how the layered box-shadow in the asPulse keyframe simultaneously masks the dot's edge and animates an expanding ring. The same assistant can help optimize it — ask whether re-sorting and re-appending all rows on every single status change is wasteful for a list with hundreds of members, and what a more incremental DOM update would look like. It's also a good partner for extending the list: ask it to animate rows sliding to their new position instead of jumping instantly, add a search/filter box above the list, or wire data-status updates to a real websocket presence feed with a debounced refresh. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "team presence list" in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- A list of rows, each showing an initials avatar colored by a per-row CSS custom property, a name and role, and a status indicator dot — with the member's presence state stored in a single data-status attribute on the row (accepting at least four values: online, busy, away, offline) rather than separate boolean flags or classes.
- Use CSS attribute selectors keyed off that single data-status value to control the dot's color and to reduce the opacity of offline rows — no per-status JavaScript styling logic.
- Give only the online status dot a continuously looping pulse animation built from layered box-shadow values in a CSS keyframe: one shadow layer must stay fixed to visually mask the dot's edge against the card background, while the other expands outward and fades to transparent, so it reads as a heartbeat ring rather than a resizing dot.
- Write a refresh function that reads all current row elements, sorts them by a presence-priority ranking (online first, offline last), and reorders the actual DOM nodes by re-appending them in the new sorted order — not by destroying and rebuilding the list's HTML — and have it also recompute and display a live count of members currently online.
- Wire a click handler on the list container (using event delegation, not one listener per row) that cycles a clicked row's data-status attribute through all four states in order and calls the refresh function afterward, so the reordering and online count are visibly demonstrated interactively.`,
    },
  },
};

export default avatarStatusList;
