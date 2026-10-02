const sharedDocPresenceBar = {
  id: 'shared-doc-presence-bar',
  title: 'Shared Document Presence Bar',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="sdp-page">
  <div class="sdp-bar">
    <div class="sdp-left">
      <svg class="sdp-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span class="sdp-title">Roadmap 2026.doc</span>
    </div>
    <div class="sdp-right">
      <div class="sdp-stack" id="sdpStack"></div>
      <button type="button" class="sdp-share">Share</button>
    </div>
  </div>
  <div class="sdp-body">
    <div class="sdp-line w1"></div>
    <div class="sdp-line w2"></div>
    <div class="sdp-line w3"></div>
    <div class="sdp-line w2"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1017;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.sdp-page{width:100%;max-width:560px;background:#12151e;border:1px solid #232838;border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.sdp-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #1e2330;background:#141824}
.sdp-left{display:flex;align-items:center;gap:9px;min-width:0}
.sdp-doc-icon{width:17px;height:17px;color:#6366f1;flex-shrink:0}
.sdp-title{font-size:13.5px;font-weight:700;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sdp-right{display:flex;align-items:center;gap:12px;flex-shrink:0}
.sdp-stack{display:flex;align-items:center;position:relative}
.sdp-bubble{width:28px;height:28px;border-radius:50%;border:2px solid #12151e;margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:800;color:#fff;position:relative;cursor:default;transition:transform .12s}
.sdp-bubble:first-child{margin-left:0}
.sdp-bubble:hover{transform:translateY(-3px)}
.sdp-bubble.editing::after{content:'';position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:50%;background:#34d399;border:2px solid #12151e}
.sdp-bubble.viewing::after{content:'';position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:50%;background:#94a3b8;border:2px solid #12151e}
.sdp-overflow{width:28px;height:28px;border-radius:50%;border:2px solid #12151e;margin-left:-8px;background:#232838;color:#94a3b8;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center}
.sdp-tooltip{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-4px);background:#1c2130;border:1px solid #2a3143;color:#e2e8f0;font-size:11px;font-weight:600;padding:5px 9px;border-radius:7px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .12s,transform .12s;z-index:5}
.sdp-tooltip::before{content:'';position:absolute;bottom:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-bottom-color:#1c2130}
.sdp-bubble:hover .sdp-tooltip{opacity:1;transform:translateX(-50%) translateY(0)}
.sdp-share{background:#6366f1;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12.5px;font-weight:700;cursor:pointer}
.sdp-share:hover{background:#4f46e5}

.sdp-body{padding:26px 22px}
.sdp-line{height:9px;border-radius:5px;background:#1c2230;margin-bottom:14px}
.sdp-line.w1{width:82%}
.sdp-line.w2{width:60%}
.sdp-line.w3{width:70%}`,

  js: `var PEOPLE = [
  { name: 'You', initials: 'YO', color: '#6366f1', status: 'editing' },
  { name: 'Priya Anand', initials: 'PA', color: '#ec4899', status: 'editing' },
  { name: 'Marcus Lee', initials: 'ML', color: '#10b981', status: 'viewing' },
  { name: 'Rosa Santos', initials: 'RS', color: '#22d3ee', status: 'viewing' },
  { name: 'Theo Novak', initials: 'TN', color: '#f97316', status: 'viewing' },
  { name: 'Grace Lin', initials: 'GL', color: '#a78bfa', status: 'viewing' },
];
var MAX_VISIBLE = 4;

var stack = document.getElementById('sdpStack');

function render() {
  var visible = PEOPLE.slice(0, MAX_VISIBLE);
  var overflow = PEOPLE.length - visible.length;

  stack.innerHTML = visible.map(function (p) {
    return '<div class="sdp-bubble ' + p.status + '" style="background:' + p.color + '">' +
      p.initials +
      '<span class="sdp-tooltip">' + p.name + ' \\u00b7 ' + (p.status === 'editing' ? 'editing' : 'viewing') + '</span>' +
    '</div>';
  }).join('');

  if (overflow > 0) {
    stack.insertAdjacentHTML('beforeend', '<div class="sdp-overflow">+' + overflow + '</div>');
  }
}

render();`,

  seo: {
    title: 'Shared Document Presence Bar — Free HTML CSS JS Snippet',
    description: `A collaborative document top bar with a stacked avatar list, viewing/editing status dots, hover tooltips, and an overflow "+N more" bubble. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Shared Document Presence Bar — Who\'s Viewing, Editing & the Overflow Count',
      description: `Every collaborative document tool needs a fast answer to "who else is here right now" without opening a separate panel. The presence bar puts that answer directly in the document's top bar: a compact stack of avatar bubbles, a colored status dot showing who's actively editing versus just viewing, and an overflow bubble once the room gets crowded. This snippet builds that bar in plain HTML, CSS, and vanilla JavaScript. Compare it with [collaborator presence bar](/ui-snippets/collaborator-presence-bar/) and [avatar stack tooltip](/ui-snippets/avatar-stack-tooltip/) for related patterns.

**Overlapping bubbles from one array**

\`PEOPLE\` holds everyone currently in the document, each with a name, initials, color, and a \`status\` of \`'editing'\` or \`'viewing'\`. \`render()\` slices the first \`MAX_VISIBLE\` entries and lays them out with a negative left margin so each bubble overlaps the previous one — the same compact-stack technique used in [avatar stack](/ui-snippets/avatar-stack/), giving a crowd of people a tidy, fixed-width footprint regardless of how many are actually present.

**Editing vs viewing at a glance**

Rather than a text label per person, each bubble gets a small corner dot: green for actively editing, gray for read-only viewing. This is the same visual grammar used by Google Docs and Notion — a quick color scan tells you whether anyone is actively changing the document right now versus just reading it, which matters far more than an exact headcount when you're deciding whether it's safe to make your own edit.

**Overflow that stays honest**

When more people are present than \`MAX_VISIBLE\` allows, a final "+N" bubble is appended showing exactly how many additional collaborators aren't shown — never silently dropping people from the count. This keeps the bar's width predictable (it never grows past five bubbles) while still being truthful about how many people are actually in the document.

**Tooltips confirm identity on demand**

Hovering any avatar bubble reveals a small tooltip with the person's full name and their current status in words ("editing" or "viewing"), so the compact initials-only bubbles never leave you guessing who's who — full identity is one hover away, not permanently taking up bar space.

**Extending it for real presence**

To wire this to real collaboration, replace \`PEOPLE\` with live presence data from your backend (a WebSocket channel, Supabase Realtime, Liveblocks, or similar), re-running \`render()\` whenever someone joins, leaves, or switches between editing and viewing. Add a click handler on the overflow bubble to open a full presence panel — a natural pairing with [team presence list](/ui-snippets/team-presence-list/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A document top bar renders with four overlapping avatar bubbles and a "+2" overflow bubble.` },
      { title: 'Hover a bubble', text: `A tooltip shows the person's name and whether they're editing or viewing.` },
      { title: 'Look at the corner dots', text: `Green dots mean actively editing; gray dots mean read-only viewing.` },
      { title: 'Check the overflow bubble', text: `It shows exactly how many additional people aren't shown in the stack.` },
      { title: 'Change MAX_VISIBLE', text: `Show more or fewer bubbles before the overflow count kicks in.` },
      { title: 'Connect real presence', text: `Replace PEOPLE with live data from your collaboration backend and re-render on change.` },
    ] },
    features: [
      { title: 'Overlapping bubble stack', text: `Negative margins create a compact, fixed-footprint avatar stack from any headcount.` },
      { title: 'Editing/viewing status dots', text: `A color-coded corner dot distinguishes active editors from read-only viewers.` },
      { title: 'Honest overflow count', text: `A "+N" bubble reports exactly how many collaborators aren't individually shown.` },
      { title: 'Hover tooltips', text: `Full name and status text appear on hover without permanently using bar space.` },
      { title: 'Data-driven rendering', text: `One PEOPLE array drives the whole bar — no manual bubble markup.` },
      { title: 'Predictable bar width', text: `The visible stack never grows past MAX_VISIBLE, keeping the header layout stable.` },
      { title: 'Truncated document title', text: `Long file names ellipsize instead of pushing the presence stack off-screen.` },
      { title: 'Framework-agnostic markup', text: `Plain HTML/CSS/JS ports cleanly into React, Vue, or Angular components.` },
    ],
    useCases: [
      { title: 'Collaborative document editors', text: 'Answer who else is here at a glance, with overlapping avatar bubbles and a coloured corner dot separating editors from viewers.' },
      { title: 'Design and whiteboard tools', text: 'Pair with [live cursor name tags](/ui-snippets/live-cursor-name-tags/) so the top bar shows who is present and the canvas shows where they are working.' },
      { title: 'Project management boards', text: 'Show active viewers on a [kanban board](/ui-snippets/kanban-board/), with an honest +N bubble reporting how many collaborators do not fit.' },
      { title: 'Code review and IDE tools', text: 'Indicate who else has a file open, using hover tooltips so full names and statuses do not permanently take up space.' },
      { title: 'Scheduling and team dashboards', text: 'Combine with an [availability scheduler](/ui-snippets/availability-scheduler/) or a [team presence list](/ui-snippets/team-presence-list/) for a fuller picture of who is around.' },
      { icon: 'CODE', title: 'Related: File Explorer Tree View', desc: 'See the [File Explorer Tree View](/ui-snippets/tree-view-file-explorer/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the overflow count stay accurate?', a: `render() slices the PEOPLE array to the first MAX_VISIBLE entries for bubbles, then computes the overflow as PEOPLE.length minus that visible count. Because the overflow number is always derived from the real array length rather than hard-coded, it stays accurate automatically as people join or leave — there's no separate counter to keep in sync.` },
      { q: 'What\'s the difference between the editing and viewing status?', a: `Each person in the data has a status of "editing" or "viewing", which maps to a green or gray corner dot on their bubble respectively (plus the matching word in the hover tooltip). This mirrors how Google Docs and Notion distinguish someone actively typing changes from someone who merely has the document open in read mode.` },
      { q: 'How do I make the overflow bubble open a full list?', a: `Add a click handler to .sdp-overflow that opens a dropdown, popover, or modal listing the remaining PEOPLE entries beyond MAX_VISIBLE — reusing the same bubble/tooltip markup at a larger scale, similar to how [team presence list](/ui-snippets/team-presence-list/) shows a fuller roster.` },
      { q: 'How do I wire this to real-time presence data?', a: `Replace the static PEOPLE array with data from your realtime backend (WebSocket, Supabase Realtime, Liveblocks, Firebase, etc.), and call render() again whenever a presence event arrives — someone joining, leaving, or switching between editing and viewing. Because render() is a pure function of the array, you never need to manually patch individual bubbles.` },
      { q: 'How do I use this presence bar in React, Vue, or Angular?', a: `Pass PEOPLE as a prop or reactive state, derive the visible slice and overflow count with a computed value (useMemo, a Vue computed, or an Angular pipe), and map the visible array to bubble components with their status class and tooltip. The overlapping-stack CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stacking and overflow math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the negative-margin bubble stack achieves a compact overlapping layout and why the overflow count is derived from the array length rather than tracked separately. The same assistant can help you optimize it — ask whether MAX_VISIBLE should adapt responsively to the available bar width on narrow screens instead of staying fixed. It's also useful for extending the bar: ask it to make the overflow bubble open a dropdown with the remaining names, add a subtle pulse animation when someone new joins, or wire status changes to real WebSocket presence events. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "shared document presence bar" in plain HTML, CSS, and JavaScript for a collaborative document's top toolbar — no frameworks or libraries.

Requirements:
- Render a compact, overlapping stack of circular avatar bubbles (using negative margins so each bubble overlaps the previous one) from a single array of people, each with a name, initials, a background color, and a status of either "editing" or "viewing".
- Each bubble must show a small corner status dot that is a distinct color for "editing" versus "viewing" (e.g. green for actively editing, gray for read-only viewing), so status is scannable without reading text.
- Cap the number of individually rendered bubbles at a configurable maximum; if more people are present than that maximum, append one final "+N" overflow bubble showing exactly how many additional people aren't individually shown, computed from the real data length (never hard-coded).
- On hovering any avatar bubble, show a small tooltip with that person's full name and their status in words ("editing" or "viewing"), positioned so it doesn't get clipped or overlap neighboring bubbles.
- Keep the presence stack's rendering as a single pure function of the people array/state, so it can be re-run cleanly whenever presence data changes (someone joins, leaves, or switches status) without manually patching individual DOM nodes.
- Include a document title area that truncates with an ellipsis instead of pushing the presence stack off-screen on a narrow bar.`,
    },
  },
};

export default sharedDocPresenceBar;
