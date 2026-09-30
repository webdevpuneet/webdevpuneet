const onCallScheduleRotation = {
  id: 'on-call-schedule-rotation',
  title: 'On-Call Schedule Rotation',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="ocr-wrap">
  <span class="ocr-tag">incident management · weekly rotation</span>
  <h1>On-call rotation</h1>
  <p class="ocr-sub">Primary responder for platform-alerts, rotating weekly.</p>

  <div class="ocr-current">
    <div class="ocr-avatar" id="ocrCurrentAvatar">M</div>
    <div class="ocr-current-info">
      <span class="ocr-current-label">Currently on call</span>
      <strong id="ocrCurrentName">Maya Rodriguez</strong>
      <span class="ocr-current-until" id="ocrCurrentUntil">until Fri 9:00 AM</span>
    </div>
    <button class="ocr-handoff-btn" id="ocrHandoffBtn">Hand off now</button>
  </div>

  <div class="ocr-strip" id="ocrStrip"></div>

  <div class="ocr-legend">
    <span><span class="ocr-legend-dot current"></span>On call now</span>
    <span><span class="ocr-legend-dot next"></span>Up next</span>
    <span><span class="ocr-legend-dot"></span>Scheduled</span>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0d1420,#04060b 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.ocr-wrap{width:100%;max-width:680px;text-align:center}
.ocr-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a5b4fc;background:rgba(165,180,252,.1);border:1px solid rgba(165,180,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.ocr-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.ocr-sub{font-size:13.5px;color:#8f9bc2;margin-top:6px}
.ocr-current{margin-top:22px;display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:16px;background:linear-gradient(135deg,rgba(99,102,241,.16),rgba(168,85,247,.1));border:1px solid rgba(165,180,252,.3);text-align:left}
.ocr-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#818cf8,#c084fc);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;flex-shrink:0;box-shadow:0 0 0 3px rgba(129,140,248,.25)}
.ocr-current-info{flex:1;display:flex;flex-direction:column;gap:2px}
.ocr-current-label{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#a5b4fc}
.ocr-current-info strong{font-size:17px}
.ocr-current-until{font-size:12px;color:#9099c4}
.ocr-handoff-btn{padding:11px 16px;border-radius:10px;border:none;background:linear-gradient(135deg,#818cf8,#a855f7);color:#0e0a1f;font:700 12.5px system-ui;cursor:pointer;white-space:nowrap;transition:transform .1s}
.ocr-handoff-btn:hover{transform:translateY(-1px)}
.ocr-handoff-btn:active{transform:scale(.97)}
.ocr-strip{margin-top:18px;display:flex;gap:10px;overflow-x:auto;padding-bottom:6px}
.ocr-slot{flex:0 0 128px;padding:14px 12px;border-radius:12px;background:#0c1119;border:1px solid rgba(255,255,255,.08);text-align:left;transition:background .2s,border-color .2s}
.ocr-slot.current{background:rgba(129,140,248,.14);border-color:rgba(129,140,248,.4)}
.ocr-slot.next{background:rgba(196,181,253,.08);border-color:rgba(196,181,253,.25)}
.ocr-slot-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;margin-bottom:8px}
.ocr-slot-name{display:block;font-size:12.5px;font-weight:700}
.ocr-slot-range{display:block;font-size:10.5px;color:#7683a8;margin-top:3px;line-height:1.4}
.ocr-slot-badge{display:inline-block;margin-top:7px;font-size:9.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:6px;background:rgba(129,140,248,.2);color:#c7d2fe}
.ocr-legend{display:flex;gap:18px;justify-content:center;margin-top:16px;font-size:11.5px;color:#7683a8}
.ocr-legend span{display:inline-flex;align-items:center;gap:6px}
.ocr-legend-dot{width:8px;height:8px;border-radius:50%;background:#3a4258}
.ocr-legend-dot.current{background:#818cf8}
.ocr-legend-dot.next{background:#c4b5fd}`,

  js: `var stripEl = document.getElementById("ocrStrip");
var currentAvatar = document.getElementById("ocrCurrentAvatar");
var currentName = document.getElementById("ocrCurrentName");
var currentUntil = document.getElementById("ocrCurrentUntil");
var handoffBtn = document.getElementById("ocrHandoffBtn");

var ROSTER = [
  "Maya Rodriguez",
  "Jordan Lee",
  "Priya Shah",
  "Sam Okafor",
  "Elena Petrova",
  "Devon Clarke",
];

var WEEK_MS = 7 * 24 * 60 * 60 * 1000;
var rotationStart = Date.now() - 2 * 24 * 60 * 60 * 1000; // 2 days into the current shift
var currentIndex = 0;

function initials(name) {
  var parts = name.trim().split(/\\s+/);
  var first = parts[0] ? parts[0].charAt(0) : "";
  var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

function formatDay(ts) {
  var d = new Date(ts);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var hours = d.getHours();
  var ampm = hours >= 12 ? "PM" : "AM";
  var h12 = hours % 12 === 0 ? 12 : hours % 12;
  return days[d.getDay()] + " " + h12 + ":00 " + ampm;
}

function personAt(offset) {
  var idx = ((currentIndex + offset) % ROSTER.length + ROSTER.length) % ROSTER.length;
  return ROSTER[idx];
}

function slotStart(offset) {
  return rotationStart + offset * WEEK_MS;
}

function render() {
  var currentPerson = personAt(0);
  var shiftStart = slotStart(0);
  var shiftEnd = slotStart(1);

  currentAvatar.textContent = initials(currentPerson);
  currentName.textContent = currentPerson;
  currentUntil.textContent = "until " + formatDay(shiftEnd);

  stripEl.innerHTML = "";

  // Show 2 past-relative slots, current, and next 4 upcoming — a scrollable
  // strip covering the recent past through the near future of the rotation.
  var RANGE_BEFORE = 1;
  var RANGE_AFTER = 4;

  for (var offset = -RANGE_BEFORE; offset <= RANGE_AFTER; offset++) {
    var person = personAt(offset);
    var start = slotStart(offset);
    var end = slotStart(offset + 1);

    var slot = document.createElement("div");
    slot.className = "ocr-slot";
    if (offset === 0) slot.classList.add("current");
    if (offset === 1) slot.classList.add("next");

    var badge = "";
    if (offset === 0) badge = '<span class="ocr-slot-badge">On call</span>';
    else if (offset === 1) badge = '<span class="ocr-slot-badge">Up next</span>';

    slot.innerHTML =
      '<div class="ocr-slot-avatar">' + initials(person) + "</div>" +
      '<span class="ocr-slot-name">' + person + "</span>" +
      '<span class="ocr-slot-range">' + formatDay(start) + " \\u2192<br>" + formatDay(end) + "</span>" +
      badge;

    stripEl.appendChild(slot);
  }

  // Keep the "current" slot in view within the scrollable strip.
  var currentEl = stripEl.querySelector(".ocr-slot.current");
  if (currentEl) currentEl.scrollIntoView({ behavior: "instant", inline: "start", block: "nearest" });
}

function handOffNow() {
  currentIndex = (currentIndex + 1) % ROSTER.length;
  rotationStart = Date.now();
  render();
}

handoffBtn.addEventListener("click", handOffNow);

render();`,

  seo: {
    title: 'On-Call Schedule Rotation — Free Weekly Incident Rotation Widget',
    description: `A horizontal on-call rotation strip showing the current responder, upcoming handoffs with real dates and times, and a "hand off now" button that advances the rotation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'On-Call Schedule Rotation — Who\’s Up, Who\’s Next, and When It Changes',
      description: `Every incident-management and DevOps dashboard needs one thing above the fold: who's on call right now, and when does that change. This widget builds exactly that — a highlighted current-responder card plus a horizontal, scrollable strip of the surrounding rotation — driven entirely by a roster array and a single rotation-start timestamp, with a "hand off now" button that genuinely advances the schedule rather than just relabeling a card.

**One index and one timestamp drive the whole schedule**

The entire rotation is computed from two values: \`ROSTER\`, an ordered array of names, and \`rotationStart\`, the timestamp the current person's shift began. \`personAt(offset)\` wraps around the roster with modular arithmetic to find who's on call \`offset\` weeks from now (or in the past, for negative offsets), and \`slotStart(offset)\` adds \`offset * WEEK_MS\` to \`rotationStart\` to get that slot's start time. Every card in the strip, and the highlighted current-responder banner, are just this pair of functions called with different offsets — there's no separately maintained list of "who's on call this week, and this week, and this week."

**A strip that shows recent past through near future**

Rather than only ever showing "now" and "next," the strip renders one slot before the current one (\`RANGE_BEFORE = 1\`) through four slots after it (\`RANGE_AFTER = 4\`), so a viewer can see both the tail of the last handoff and enough of the runway ahead to plan around. Each card carries its own real formatted date range (\`formatDay()\` renders \`"Fri 9:00 AM"\` style labels) rather than a relative "in 2 weeks" — the kind of concrete detail an on-call engineer actually needs when checking who to page or when their own shift starts.

**A handoff that really advances the schedule**

\`handOffNow()\` does two things: increments \`currentIndex\` to the next roster member, and resets \`rotationStart\` to right now, so the newly-current person's shift genuinely starts at the moment of the handoff rather than continuing to count down an old shift's clock. Every downstream card recomputes from that new state on the next \`render()\` call — the same "recompute from source state" discipline used by this library's [SLA countdown badge](/ui-snippets/sla-countdown-badge/), where a single deadline timestamp drives every visual detail rather than juggling parallel state.

**Visual hierarchy that matches operational priority**

The current responder gets a large, prominent banner card with an avatar and countdown-to-handoff text; the strip below uses distinct highlight styles for "current" and "next" so a fast glance answers "who do I page" without reading every card. Pair this with an [SLA countdown badge](/ui-snippets/sla-countdown-badge/) for the response-time half of an incident dashboard, or a [status dashboard](/ui-snippets/status-dashboard/) for overall system health alongside it.

**Customizing it**

Swap the fixed weekly cadence for a custom-length rotation, pull the roster and start time from a real scheduling API, or add a "swap with" dropdown so any two upcoming slots can be manually reordered instead of only ever advancing sequentially.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The current responder's card and a rotation strip render.` },
      { title: 'Scroll the strip horizontally', text: `See past, current, and upcoming weekly shifts with real dates.` },
      { title: 'Read the current-until text', text: `Shows exactly when the current shift hands off.` },
      { title: 'Click "Hand off now"', text: `Advances the rotation to the next person, resetting the shift clock.` },
      { title: 'Watch the strip re-render', text: `Every card recomputes from the new rotation state.` },
      { title: 'Swap in your real roster', text: `Edit the ROSTER array with your team's actual names.` },
    ] },
    features: [
      { title: 'Single source of truth', text: `One roster array and one timestamp drive every card.` },
      { title: 'Modular roster wrapping', text: `personAt() cycles cleanly past the end of the roster array.` },
      { title: 'Real formatted date ranges', text: `Each slot shows concrete day/time labels, not relative text.` },
      { title: 'Past-through-future strip', text: `Shows the prior shift alongside several upcoming ones.` },
      { title: 'Functional hand-off button', text: `Genuinely advances the index and resets the shift clock.` },
      { title: 'Current-slot auto-scroll', text: `Keeps the active card in view within the scrollable strip.` },
      { title: 'Distinct current/next styling', text: `Visual hierarchy answers "who do I page" at a glance.` },
      { title: 'Initials-based avatars', text: `Generated from each name with no image assets needed.` },
    ],
    useCases: [
      { title: 'Incident management dashboards', text: `Pair with an [SLA countdown badge](/ui-snippets/sla-countdown-badge/).` },
      { title: 'DevOps and SRE tooling', text: `Show who owns paging duty this week at a glance.` },
      { title: 'Support team scheduling', text: `Combine with a [status dashboard](/ui-snippets/status-dashboard/) for coverage overview.` },
      { title: 'IT helpdesk rotations', text: `Track weekly primary/secondary responder handoffs.` },
      { title: 'Team presence overviews', text: `Pair with a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Internal status pages', text: `Show current on-call contact on an [uptime status page](/ui-snippets/uptime-status-page/).` },
      { icon: 'CODE', title: 'Related: Active Sessions / Device List', desc: 'See the [Active Sessions / Device List](/ui-snippets/session-device-list/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the widget know who's on call right now?", a: `Two values drive the entire schedule: a ROSTER array listing everyone in rotation order, and a rotationStart timestamp marking when the current person's shift began. personAt(0) reads the roster at the current index, and every other card in the strip is just personAt() called with a different weekly offset \— there's no separately maintained "current person" variable disconnected from the roster and index.` },
      { q: 'What happens when I click "Hand off now"?', a: `handOffNow() advances currentIndex to the next person in the roster (wrapping back to the start if it reaches the end) and resets rotationStart to the current timestamp, so the newly-current person's shift genuinely begins at that moment. The entire strip then re-renders from that updated state, recomputing every card's dates and highlighting rather than just relabeling the existing cards.` },
      { q: "Why does the strip show a slot before the current one?", a: `Showing one slot before the current shift (in addition to several after it) gives a viewer context on the recent handoff \— who just finished being on call \— alongside the near-future rotation, rather than only ever showing "now and next." The RANGE_BEFORE and RANGE_AFTER constants control how many slots render on each side and can be adjusted to show more or less history and lookahead.` },
      { q: "How would I connect this to a real scheduling backend?", a: `Replace the ROSTER array and rotationStart with data fetched from your actual on-call scheduling system (PagerDuty, Opsgenie, or an internal API), keeping the same shape: an ordered list of people and a timestamp for when the current shift started. The rendering logic, date formatting, and hand-off mechanics all work unchanged as long as those two values reflect real schedule data.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Keep ROSTER, rotationStart, and currentIndex as component state, and call the same personAt/slotStart calculations inside your render function or a computed property, mapping the resulting array of slots to your framework's list-rendering syntax. The handOffNow logic becomes a simple state-updating click handler; there's no DOM-specific logic beyond the optional scrollIntoView call for keeping the current slot visible.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the entire rotation \— every card's person, date range, and highlight state \— is derived from just two values (the roster array and a single rotationStart timestamp) via personAt() and slotStart(), rather than storing each week's assignment as separately maintained data. It's a good prompt for reasoning about the hand-off mechanics specifically: ask why handOffNow() resets rotationStart to the current time rather than simply advancing it by one week, and what would go wrong if it didn't. For extensions, ask it to add a secondary/backup on-call role shown alongside the primary for each slot, a manual override that lets any two upcoming slots be swapped instead of only advancing sequentially, or integration with the SLA countdown badge snippet so a ticket's badge shows the current on-call person's name directly. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "On-Call Schedule Rotation" widget in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A prominent "currently on call" card showing the current responder's name, an avatar (generated from their initials), and a formatted "until [day] [time]" label showing exactly when their shift hands off.
- A horizontal, scrollable strip of cards below it showing the rotation: at least one slot before the current one (to show recent history) and several slots after it (upcoming handoffs), each showing the assigned person, their avatar, and a real formatted date/time range for their shift — not a vague relative label like "in 3 weeks."
- Drive the entire schedule from exactly two pieces of state: an ordered array of names (the roster) and a single timestamp marking when the current shift began. Compute who is on call at any given weekly offset (past or future) via modular arithmetic over the roster array combined with that timestamp, so every card in the strip — and the current-responder banner — is derived from the same two values rather than independently tracked per-slot data.
- A "Hand off now" button that advances the rotation to the next person in the roster (wrapping around at the end) and resets the shift-start timestamp to the current moment, then fully re-renders the strip and the current-responder banner from that updated state.
- Visually distinguish the "current" and "next" slots from the rest of the strip (e.g. a highlighted background and a small badge label), and keep the current slot scrolled into view within the horizontally scrollable strip whenever the schedule updates.`,
    },
  },
};

export default onCallScheduleRotation;
