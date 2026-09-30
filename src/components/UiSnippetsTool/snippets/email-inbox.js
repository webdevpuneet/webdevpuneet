const emailInbox = {
  id: 'email-inbox',
  title: 'Email Inbox',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="ei">
  <div class="ei-bar">
    <label class="ei-all"><input type="checkbox" id="eiAll"><span>Select</span></label>
    <input type="search" class="ei-search" id="eiSearch" placeholder="Search mail…" aria-label="Search">
    <span class="ei-unread" id="eiUnread">0 unread</span>
  </div>
  <ul class="ei-list" id="eiList"></ul>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;display:flex;justify-content:center;padding:30px 16px}

.ei{width:100%;max-width:520px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 14px 36px -24px rgba(0,0,0,.3)}
.ei-bar{display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid #eef2f6}
.ei-all{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b;font-weight:600}
.ei-all input{width:15px;height:15px;accent-color:#6366f1}
.ei-search{flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:7px 11px;font-size:13px;font-family:inherit;outline:none}
.ei-search:focus{border-color:#6366f1}
.ei-unread{font-size:11.5px;font-weight:700;color:#4f46e5;white-space:nowrap}

.ei-list{list-style:none}
.ei-row{display:flex;align-items:center;gap:11px;padding:11px 14px;border-bottom:1px solid #f1f5f9;cursor:pointer;position:relative}
.ei-row:hover{background:#f8fafc}
.ei-row.is-unread{background:#fbfdff}
.ei-row.is-unread .ei-from,.ei-row.is-unread .ei-subj{font-weight:800;color:#0f172a}
.ei-dot{width:7px;height:7px;border-radius:50%;background:#3b82f6;flex-shrink:0;visibility:hidden}
.ei-row.is-unread .ei-dot{visibility:visible}
.ei-check{width:15px;height:15px;accent-color:#6366f1;flex-shrink:0}
.ei-star{background:none;border:none;cursor:pointer;font-size:15px;color:#cbd5e1;flex-shrink:0;line-height:1}
.ei-star.is-on{color:#f59e0b}
.ei-main{flex:1;min-width:0}
.ei-from{font-size:13px;color:#334155}
.ei-subj{font-size:13px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ei-subj b{color:#0f172a}
.ei-time{font-size:11px;color:#94a3b8;flex-shrink:0}
.ei-row.is-checked{background:#eef2ff}
.ei-empty{padding:30px;text-align:center;color:#94a3b8;font-size:13px}`,

  js: `var DATA = [
  { id:1, from:'GitHub', subj:'Your weekly digest — 12 new stars', time:'9:24', unread:true, star:false },
  { id:2, from:'Figma', subj:'Ada commented on “Dashboard v3”', time:'8:10', unread:true, star:true },
  { id:3, from:'Stripe', subj:'Your payout of $2,140 is on the way', time:'Yesterday', unread:false, star:false },
  { id:4, from:'Linear', subj:'3 issues assigned to you this sprint', time:'Yesterday', unread:true, star:false },
  { id:5, from:'Vercel', subj:'Deployment ready: fwd-tools (production)', time:'Mon', unread:false, star:true },
  { id:6, from:'Notion', subj:'Weekly team notes are ready to review', time:'Mon', unread:false, star:false }
];

var list = document.getElementById('eiList');
var unreadEl = document.getElementById('eiUnread');
var search = document.getElementById('eiSearch');
var allBox = document.getElementById('eiAll');
var checked = {};

function highlight(text, q) {
  if (!q) return text;
  var i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return text.slice(0, i) + '<b>' + text.slice(i, i + q.length) + '</b>' + text.slice(i + q.length);
}

function render() {
  var q = search.value.trim();
  list.innerHTML = '';
  var rows = DATA.filter(function (m) { return !q || (m.from + ' ' + m.subj).toLowerCase().indexOf(q.toLowerCase()) > -1; });
  if (!rows.length) { list.innerHTML = '<li class="ei-empty">No matching mail.</li>'; }
  rows.forEach(function (m) {
    var li = document.createElement('li');
    li.className = 'ei-row' + (m.unread ? ' is-unread' : '') + (checked[m.id] ? ' is-checked' : '');
    li.innerHTML = '<span class="ei-dot"></span>' +
      '<input type="checkbox" class="ei-check"' + (checked[m.id] ? ' checked' : '') + ' aria-label="Select">' +
      '<button class="ei-star' + (m.star ? ' is-on' : '') + '" aria-label="Star">' + (m.star ? '\\u2605' : '\\u2606') + '</button>' +
      '<div class="ei-main"><div class="ei-from">' + m.from + '</div><div class="ei-subj">' + highlight(m.subj, q) + '</div></div>' +
      '<span class="ei-time">' + m.time + '</span>';
    li.querySelector('.ei-check').addEventListener('click', function (e) { e.stopPropagation(); checked[m.id] = e.target.checked; li.classList.toggle('is-checked', e.target.checked); syncAll(); });
    li.querySelector('.ei-star').addEventListener('click', function (e) { e.stopPropagation(); m.star = !m.star; render(); });
    li.addEventListener('click', function () { if (m.unread) { m.unread = false; render(); } });
    list.appendChild(li);
  });
  unreadEl.textContent = DATA.filter(function (m) { return m.unread; }).length + ' unread';
}

function syncAll() {
  var visible = DATA.length, on = Object.keys(checked).filter(function (k) { return checked[k]; }).length;
  allBox.checked = on === visible && visible > 0;
  allBox.indeterminate = on > 0 && on < visible;
}

allBox.addEventListener('change', function () { DATA.forEach(function (m) { checked[m.id] = allBox.checked; }); allBox.indeterminate = false; render(); });
search.addEventListener('input', render);
render();`,

  seo: {
    title: 'Email Inbox — Mail List UI with Read, Star & Search',
    description: `An email inbox list with unread styling, click-to-read, star toggles, select-all tri-state and live search highlighting. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Email Inbox — Mail List with Unread, Star, Select-All and Search',
      description: `An email inbox list is the dense, interaction-rich list at the heart of any mail or messaging app: unread rows stand out, clicking marks read, stars toggle, a header checkbox selects all, and search filters live. This snippet builds that whole interaction model from a data array, in plain HTML, CSS, and vanilla JavaScript.

**Unread emphasis and click-to-read**

Unread messages get a bolder sender and subject, a subtle tinted background, and a blue dot; clicking a row marks it read and the emphasis drops away. This read/unread state lives on each message object and drives both the styling and the header's "N unread" counter, so they always agree. It's the core inbox behaviour, reproduced faithfully.

**Per-row controls without misfires**

Each row carries a checkbox and a star, and both \`stopPropagation\` so toggling them doesn't also trigger the row's click-to-read. This event-isolation detail is what stops the classic bug where starring an email accidentally opens it. Stars persist on the message object and re-render in place.

**Tri-state select-all**

The header checkbox is a proper tri-state control: checked when every message is selected, unchecked when none are, and **indeterminate** (a dash) when only some are — using the real DOM \`indeterminate\` property. Selecting individual rows updates it, and toggling it selects or clears everything, the exact behaviour of Gmail-style bulk selection.

**Live search with highlighting**

Typing in the search box filters the list by sender and subject as you go, and the matching substring in the subject is wrapped in \`<b>\` so you can see why a row matched. An empty-state message appears when nothing matches. Filtering is a view concern over the source array, so selection and read state survive a search.

**Data-driven and portable**

The entire list renders from a \`DATA\` array, so swapping in real messages — or a fetch — is a one-line change, and every interaction mutates that data and re-renders, keeping the UI consistent. It's a compact, dependency-free reference for the inbox list pattern you'd otherwise build piecemeal.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An inbox renders with unread rows, stars, and a search bar.` },
      { title: 'Click a message', text: `It marks read and the unread count updates.` },
      { title: 'Star and select', text: `Toggle a star or a checkbox without opening the row.` },
      { title: 'Select all', text: `The header checkbox shows a tri-state and bulk-selects.` },
      { title: 'Search', text: `Filter by sender or subject with live highlighting.` },
      { title: 'Use your data', text: `Replace the DATA array with real messages or a fetch.` },
    ] },
    features: [
      { title: 'Unread emphasis', text: `Bolder text, tint, and a dot for unread mail.` },
      { title: 'Click to read', text: `Opening a row clears its unread state and updates the count.` },
      { title: 'Star toggles', text: `Per-row stars that persist and re-render in place.` },
      { title: 'Event isolation', text: `Checkbox and star stop propagation so the row does not open.` },
      { title: 'Tri-state select-all', text: `Header checkbox checked/unchecked/indeterminate.` },
      { title: 'Live search + highlight', text: `Filters by sender/subject and marks the match.` },
      { title: 'Empty state', text: `A friendly message when nothing matches.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no mail UI dependency.` },
    ],
    useCases: [
      { title: 'Webmail and messaging apps', text: `The core list beside a [side drawer](/ui-snippets/side-drawer/) of folders.` },
      { title: 'Notification centers', text: `Read/unread rows like a [notification center](/ui-snippets/notification-center/).` },
      { title: 'Support ticket queues', text: `Triage conversations with select-all bulk actions.` },
      { title: 'Activity and digest lists', text: `Mark items read in a [changelog feed](/ui-snippets/changelog-feed/).` },
      { title: 'Admin record lists', text: `Searchable, selectable rows with status emphasis.` },
      { title: 'Learning list state', text: `A reference for read state, selection, and search.` },
      { icon: 'CODE', title: 'Related: Image Hotspot with Tooltips', desc: 'See the [Image Hotspot with Tooltips](/ui-snippets/image-hotspot/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is read/unread state managed?', a: `Each message object has an unread flag. Unread rows get bolder text, a tint, and a dot via a class, and clicking a row sets unread to false and re-renders. The header's "N unread" counter is computed from the same data on every render, so the styling and the count can never drift apart.` },
      { q: 'Why do the star and checkbox call stopPropagation?', a: `The row itself has a click handler that marks the message read (and would open it in a real app). Without stopPropagation, clicking the star or checkbox would bubble up and also trigger that handler — so starring an email would open it. Stopping propagation isolates the per-row controls from the row action, which is the correct, expected behaviour.` },
      { q: 'How does the tri-state select-all work?', a: `The header checkbox reflects the selection: checked when all messages are selected, unchecked when none are, and indeterminate (shown as a dash) when only some are — set via the DOM indeterminate property, which cannot be done in HTML. Toggling individual rows recomputes it, and clicking it selects or clears every row.` },
      { q: 'Does searching lose my selections or read state?', a: `No. Search only filters which rows are displayed; it does not modify the underlying DATA array or the selection map. So selected and read states persist through a search, and clearing the query restores the full list intact with those states preserved.` },
      { q: 'How do I use this inbox in React, Vue, or Angular?', a: `Hold the messages and a selection set in state and render rows from them; each interaction updates state and the framework re-renders. Compute the unread count and the select-all tri-state as derived values, setting the indeterminate property via a ref/directive. Filter for search in render. Tailwind users swap the classes for utilities; the data-driven structure is the same.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through the tri-state logic on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how syncAll() sets both the checked and indeterminate DOM properties on the header checkbox from the counts of selected versus total messages, and why indeterminate has to be set as a JavaScript property rather than an HTML attribute. The same assistant can help you optimize it, for instance checking whether rebuilding every row's innerHTML on every single keystroke in the search box is wasteful compared to only toggling a hidden class on non-matching rows. It's also useful for extending the inbox: ask it to add swipe-to-archive gestures for touch, support multi-select with Shift-click range selection, or add a bulk-action toolbar that appears only when at least one row is checked. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an email inbox list in plain HTML, CSS, and JavaScript with no library.

Requirements:
- Render every row from a single array of message objects (each with a sender, subject, timestamp, unread flag, and starred flag), where a single render function is the only place that builds the list, rebuilding it whenever the underlying data or the search query changes.
- Give unread messages a distinct bolder visual treatment and a small colored dot, and clicking anywhere on a row (other than its checkbox or star button) must mark that message as read and immediately update both the row's styling and a header count of how many messages remain unread.
- Add a checkbox and a star toggle button to every row, and make sure clicking either one calls stopPropagation so it never also triggers the row's mark-as-read click handler, since starring or selecting a message should not have the side effect of opening it.
- Implement a header "select all" checkbox that reflects three distinct states depending on the current selection: fully checked when every visible message is selected, fully unchecked when none are, and using the native indeterminate DOM property (not just a CSS class) when only some are selected, and make toggling that header checkbox itself select or deselect every message at once.
- Implement a live search input that filters the displayed messages by matching the query against sender and subject text as the user types, wraps the matching substring in the subject in a bold tag so the match is visually obvious, and shows a distinct empty-state message when no messages match, all without mutating the underlying data array or losing any row's selected/read/starred state when the query is cleared.`,
    },
  },
};

export default emailInbox;
