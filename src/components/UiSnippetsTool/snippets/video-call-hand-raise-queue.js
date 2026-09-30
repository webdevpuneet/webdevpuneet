const videoCallHandRaiseQueue = {
  id: 'video-call-hand-raise-queue',
  title: 'Video Call Hand-Raise Queue',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="hrq-card">
  <div class="hrq-header">
    <h3><span class="hrq-hand">✋</span> Hand-raise queue</h3>
    <span class="hrq-count" id="hrqCount">0 waiting</span>
  </div>

  <ul class="hrq-list" id="hrqList"></ul>
  <p class="hrq-empty" id="hrqEmpty">No one has their hand raised.</p>

  <button type="button" class="hrq-simulate" id="hrqSimulate">+ Simulate a hand raise</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#101828;color:#eef2f7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 20px}

.hrq-card{background:#182234;border:1px solid #263449;border-radius:16px;padding:20px;width:100%;max-width:400px}
.hrq-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.hrq-header h3{font-size:15.5px;font-weight:800;display:flex;align-items:center;gap:8px}
.hrq-hand{font-size:16px}
.hrq-count{font-size:11.5px;font-weight:700;color:#facc15;background:rgba(250,204,21,.12);border-radius:999px;padding:4px 10px}

.hrq-list{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:6px}
.hrq-row{display:flex;align-items:center;gap:11px;padding:10px 11px;border-radius:12px;background:#1f2a3d;border:1px solid #2a3850;animation:hrqIn .25s ease-out}
@keyframes hrqIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

.hrq-order{width:22px;height:22px;border-radius:50%;background:#324162;color:#a8b6cc;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hrq-row:first-child .hrq-order{background:#facc15;color:#1c1400}

.hrq-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:800;color:#fff;flex-shrink:0}

.hrq-info{flex:1;min-width:0;display:flex;flex-direction:column}
.hrq-name{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrq-time{font-size:11px;color:#7c8aa3}

.hrq-actions{display:flex;gap:6px;flex-shrink:0}
.hrq-btn{border:none;border-radius:8px;padding:7px 10px;font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap;transition:opacity .15s}
.hrq-btn:hover{opacity:.85}
.hrq-btn-speak{background:#22c55e;color:#04220f}
.hrq-btn-lower{background:#324162;color:#c3cee2}

.hrq-empty{font-size:12.5px;color:#7c8aa3;text-align:center;padding:20px 0}
.hrq-empty.hrq-hidden{display:none}

.hrq-simulate{width:100%;margin-top:12px;background:transparent;border:1px dashed #324162;border-radius:10px;padding:10px;color:#8ea3c7;font-size:12.5px;font-weight:600;cursor:pointer;transition:border-color .15s,color .15s}
.hrq-simulate:hover{border-color:#3b82f6;color:#93c5fd}`,

  js: `var NAMES = ['Nadia Osei', 'Ben Kowalski', 'Yuki Tanaka', 'Farah Haddad', 'Colm Byrne', 'Rosa Delgado', 'Iris Vance', 'Sam Okafor'];
var AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6', '#ef4444'];

var queue = [
  { id: 1, name: 'Nadia Osei', raisedAt: Date.now() - 92000 },
  { id: 2, name: 'Ben Kowalski', raisedAt: Date.now() - 41000 },
  { id: 3, name: 'Yuki Tanaka', raisedAt: Date.now() - 12000 },
];
var nextId = 4;

var listEl = document.getElementById('hrqList');
var emptyEl = document.getElementById('hrqEmpty');
var countEl = document.getElementById('hrqCount');

function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase(); }

function timeAgo(ts) {
  var secs = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (secs < 60) return secs + 's ago';
  return Math.floor(secs / 60) + 'm ' + (secs % 60) + 's ago';
}

function render() {
  countEl.textContent = queue.length + ' waiting';
  emptyEl.classList.toggle('hrq-hidden', queue.length > 0);

  listEl.innerHTML = queue.map(function (person, i) {
    var color = AVATAR_COLORS[person.id % AVATAR_COLORS.length];
    return '' +
      '<li class="hrq-row" data-id="' + person.id + '">' +
        '<span class="hrq-order">' + (i + 1) + '</span>' +
        '<span class="hrq-avatar" style="background:' + color + '">' + initials(person.name) + '</span>' +
        '<span class="hrq-info">' +
          '<span class="hrq-name">' + person.name + '</span>' +
          '<span class="hrq-time" data-raised="' + person.raisedAt + '">' + timeAgo(person.raisedAt) + '</span>' +
        '</span>' +
        '<span class="hrq-actions">' +
          '<button type="button" class="hrq-btn hrq-btn-speak" data-action="speak">Let them speak</button>' +
          '<button type="button" class="hrq-btn hrq-btn-lower" data-action="lower">Lower hand</button>' +
        '</span>' +
      '</li>';
  }).join('');
}

listEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.hrq-btn');
  if (!btn) return;
  var row = btn.closest('.hrq-row');
  var id = +row.dataset.id;
  // Both "let them speak" and "lower hand" remove the person from the queue —
  // in a real app, "speak" would also unmute/spotlight them before removing.
  queue = queue.filter(function (p) { return p.id !== id; });
  render();
});

document.getElementById('hrqSimulate').addEventListener('click', function () {
  var name = NAMES[Math.floor(Math.random() * NAMES.length)];
  queue.push({ id: nextId++, name: name, raisedAt: Date.now() });
  render();
});

// Keep "time since raised" labels fresh without re-rendering the whole list.
setInterval(function () {
  document.querySelectorAll('.hrq-time').forEach(function (el) {
    el.textContent = timeAgo(+el.dataset.raised);
  });
}, 1000);

render();`,

  seo: {
    title: 'Video Call Hand-Raise Queue — Free Moderator Queue Panel HTML CSS JS',
    description: `A moderator-facing hand-raise queue for video calls, ordered by raise time, with per-row "let them speak" and "lower hand" actions. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Video Call Hand-Raise Queue — An Ordered Moderator Panel',
      description: `Once a video call passes a handful of participants, "unmute yourself when you want to talk" breaks down — people talk over each other, or the loudest voice wins by default. A hand-raise queue fixes that by giving the moderator an ordered, first-raised-first-served list with clear per-person actions. This snippet builds that panel in plain HTML, CSS, and vanilla JavaScript.

**Ordered by raise time, not name or role**

The queue is a plain array of \`{ id, name, raisedAt }\` objects, and its array order *is* the display order — the person who raised their hand first sits at position one and gets a highlighted gold badge, distinguishing them as next up. There's no separate sort step because entries are pushed onto the array in the order hands go up, which is exactly the ordering a moderator needs.

**Live "time since raised" without re-rendering everything**

Each row's timestamp is stored as raw \`raisedAt\` data on the element (\`data-raised\`) and a lightweight \`setInterval\` updates just the text content of every \`.hrq-time\` element once a second — deliberately *not* calling the full \`render()\` function, which would rebuild every row's HTML including the buttons, just to update a clock. This separation keeps the always-running ticker cheap regardless of queue size.

**Two actions, one outcome, different intent**

Both "Let them speak" and "Lower hand" remove the person from the queue — the difference is what a real integration does *before* removing them: "Let them speak" would unmute and spotlight the participant, while "Lower hand" simply dismisses the request. Keeping both wired to the same \`filter()\`-based removal in the demo keeps the queue logic simple while leaving the natural extension point clearly commented.

**New entries animate in**

Each \`<li>\` carries a short \`hrqIn\` keyframe animation (a slight rise-and-fade) so a newly raised hand doesn't just pop into the list — useful feedback for a moderator glancing at the panel between other tasks, signaling "something changed here" without a loud notification.

**Overflow-safe names, initials avatars**

As with other roster-style widgets in this library, names truncate cleanly with an ellipsis and each row gets a colored initials avatar — no image dependency, so it works immediately with any real participant list.

**Customizing it**

Wire "Let them speak" to your video SDK's unmute/spotlight call, "Lower hand" to a dismissal-only event, and replace the simulate button with your platform's real hand-raise event. Pair it with [video call grid](/ui-snippets/video-call-grid/) for the main call layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A queue of three raised hands renders, ordered by raise time.` },
      { title: 'Click "+ Simulate a hand raise"', text: `A new participant is added to the end of the queue with a rise-in animation.` },
      { title: 'Watch the timestamps', text: `Each row's "time ago" label updates every second without re-rendering the list.` },
      { title: 'Click "Let them speak" or "Lower hand"', text: `The person is removed from the queue and the remaining order updates.` },
      { title: 'Empty the queue', text: `An empty-state message appears once no one is waiting.` },
      { title: 'Connect real events', text: `Replace the simulate button and demo actions with your video SDK's hand-raise API.` },
    ] },
    features: [
      { title: 'Raise-order queue', text: `Array push order is the display order — first raised, first shown.` },
      { title: 'Efficient live timestamps', text: `A separate interval updates just the time labels, not the full list.` },
      { title: 'Per-row moderator actions', text: `"Let them speak" and "Lower hand" both remove the row, with distinct real-world intent.` },
      { title: 'Animated entry', text: `New hand-raises animate in with a short rise-and-fade.` },
      { title: 'Next-up highlight', text: `The first row's order badge is visually distinguished from the rest.` },
      { title: 'Initials avatars', text: `Colored circles generated from names, no image assets required.` },
      { title: 'Empty state', text: `A clear message replaces the list when no one is waiting.` },
      { title: 'Live waiting count', text: `A badge in the header always reflects the current queue length.` },
    ],
    useCases: [
      { title: 'Video conferencing platforms', text: `The core moderator panel alongside [video call grid](/ui-snippets/video-call-grid/).` },
      { title: 'Webinars and town halls', text: `Manage Q&A order fairly for large audiences.` },
      { title: 'Virtual classrooms', text: `Let a teacher call on students in the order hands went up.` },
      { title: 'Live-streamed panels and AMAs', text: `Queue audience questions for a host to work through.` },
      { title: 'Community and town-hall meetings', text: `Fair speaking order for public comment sessions.` },
      { title: 'Learning ordered-queue patterns', text: `A reference for array-order-as-display-order — compare with [activity feed](/ui-snippets/activity-feed/).` },
    ],
    faqs: [
      { q: 'How does the queue decide who is "next"?', a: `The queue array\\'s own order is the display order — a new hand raise is pushed onto the end of the array, so the person who raised first naturally sits at index 0. The first row also gets a distinct gold order badge to make "who\\'s next" visually unambiguous at a glance, without any separate sorting logic.` },
      { q: 'Why do the timestamps update without re-rendering the whole list?', a: `A dedicated setInterval running once a second selects every .hrq-time element directly and updates only its text content from the raw raisedAt value stored in a data attribute, deliberately avoiding a call to the full render() function that would rebuild every row\\'s markup (including buttons and avatars) just to refresh a clock. This keeps the always-running ticker cheap no matter how long the queue gets.` },
      { q: 'What is the difference between "Let them speak" and "Lower hand"?', a: `In this demo both simply remove the person from the queue via the same filter() call, since the demo has no real audio/video backend — but they represent different real actions: "Let them speak" is where you\\'d call your video SDK\\'s unmute-and-spotlight API before removing the entry, while "Lower hand" is a moderator dismissing the request with no spotlight change. The comment in the click handler marks exactly where that distinction belongs.` },
      { q: 'How do I connect this to a real video call platform?', a: `Replace the simulate button\\'s click handler with your SDK\\'s hand-raise event listener (pushing a new { id, name, raisedAt } entry when it fires), and inside the "Let them speak" branch of the actions handler, call your SDK\\'s unmute/spotlight method before filtering the person out of the queue array.` },
      { q: 'How do I use this hand-raise queue in React, Vue, or Angular?', a: `Hold the queue array in component state; pushing a new raise and filtering on an action both become standard state updates (setQueue in React, a mutated ref in Vue, or a component field in Angular). For the live timestamps, keep a separate "now" tick in state updated once a second and compute each row\\'s time-ago string from it during render — the framework\\'s own diffing avoids the manual DOM-only update this vanilla version does by hand.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the queue-ordering and timer logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why array push order is used as the display order instead of sorting by raisedAt on every render, and how the separate setInterval for timestamps avoids rebuilding the whole list just to update a clock. The same assistant can help optimize it — for example asking whether the timestamp interval should pause when the browser tab is backgrounded, or how to handle two hands raised in the same millisecond. It's also useful for extending the panel: ask it to add a "raise your own hand" button for the current user's own row, a maximum queue size with an overflow message, or sound/visual notification when a new hand is raised while the moderator is looking elsewhere. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "video call hand-raise queue" moderator panel in plain HTML, CSS, and JavaScript with no library.

Requirements:
- An array of participant objects each with an id, a name, and a raisedAt timestamp, where the array's own order is treated as the queue's display order (new raises are pushed to the end) rather than being separately sorted on every render.
- Each queue row rendered with an order-position badge (the first row visually distinguished as "next up"), a colored initials avatar generated from the name (no image assets), the name, a "time since raised" label, and two action buttons: "Let them speak" and "Lower hand".
- Both action buttons must remove that participant from the queue array and re-render the list, but the code should clearly distinguish their real-world intent (for example via a comment) since a production integration would unmute/spotlight the participant for one action but not the other.
- A separate, lightweight timer (not tied to the main render function) that updates every row's "time since raised" text once per second by reading a raw timestamp stored in a data attribute, without re-rendering the entire list's markup on every tick.
- New entries added to the queue must visually animate in (for example a brief rise-and-fade) rather than appearing instantly.
- An empty-state message shown only when the queue has zero entries, and a live count badge showing how many people are currently waiting.`,
    },
  },
};

export default videoCallHandRaiseQueue;
