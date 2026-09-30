const supportTicketBacklogWidget = {
  id: 'support-ticket-backlog-widget',
  title: 'Support Ticket Backlog Widget',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="tile">
    <div class="tile-head">
      <h3>Ticket backlog</h3>
      <span class="total-badge" id="totalBadge">31 open</span>
    </div>

    <div class="stack-bar" id="stackBar"></div>

    <ul class="priority-list" id="priorityList"></ul>

    <div class="tile-foot">
      <div class="foot-stat">
        <span class="foot-label">Oldest ticket</span>
        <span class="foot-val" id="oldestVal">6d 4h</span>
      </div>
      <div class="foot-stat">
        <span class="foot-label">SLA breaches</span>
        <span class="foot-val breach" id="breachVal">3</span>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.tile { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }

.tile-head { display: flex; align-items: center; justify-content: space-between; }
.tile-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.total-badge { background: #f1f5f9; color: #475569; font-size: 12px; font-weight: 800; padding: 3px 10px; border-radius: 999px; }

.stack-bar { display: flex; height: 10px; border-radius: 999px; overflow: hidden; background: #f1f5f9; }
.stack-seg { height: 100%; transition: width 0.5s ease; }
.stack-seg.urgent { background: #dc2626; }
.stack-seg.high { background: #f59e0b; }
.stack-seg.normal { background: #6366f1; }
.stack-seg.low { background: #cbd5e1; }

.priority-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.priority-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 11px; background: #f8fafc; cursor: pointer; transition: background 0.15s; }
.priority-row:hover { background: #f1f5f9; }
.priority-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.priority-row[data-p="urgent"] .priority-dot { background: #dc2626; }
.priority-row[data-p="high"] .priority-dot { background: #f59e0b; }
.priority-row[data-p="normal"] .priority-dot { background: #6366f1; }
.priority-row[data-p="low"] .priority-dot { background: #cbd5e1; }

.priority-name { flex: 1; font-size: 12.5px; font-weight: 700; color: #0f172a; text-transform: capitalize; }
.priority-count { font-size: 13px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.priority-sla { font-size: 10.5px; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 2px 7px; border-radius: 6px; }

.tile-foot { display: flex; gap: 10px; padding-top: 12px; border-top: 1px solid #f1f5f9; }
.foot-stat { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.foot-label { font-size: 10.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
.foot-val { font-size: 14px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.foot-val.breach { color: #dc2626; }`,
  js: `var PRIORITIES = [
  { key: 'urgent', label: 'Urgent', count: 4, slaBreaches: 3, colorClass: 'urgent' },
  { key: 'high', label: 'High', count: 9, slaBreaches: 0, colorClass: 'high' },
  { key: 'normal', label: 'Normal', count: 13, slaBreaches: 0, colorClass: 'normal' },
  { key: 'low', label: 'Low', count: 5, slaBreaches: 0, colorClass: 'low' },
];

var stackBar = document.getElementById('stackBar');
var listEl = document.getElementById('priorityList');
var totalBadge = document.getElementById('totalBadge');
var breachVal = document.getElementById('breachVal');

function total() {
  return PRIORITIES.reduce(function (sum, p) { return sum + p.count; }, 0);
}

function render() {
  var t = total();
  totalBadge.textContent = t + ' open';

  stackBar.innerHTML = PRIORITIES.map(function (p) {
    var pct = t === 0 ? 0 : (p.count / t) * 100;
    return '<div class="stack-seg ' + p.colorClass + '" style="width:' + pct + '%" title="' + p.label + ': ' + p.count + '"></div>';
  }).join('');

  listEl.innerHTML = PRIORITIES.map(function (p) {
    var slaHtml = p.slaBreaches > 0 ? '<span class="priority-sla">' + p.slaBreaches + ' breached SLA</span>' : '';
    return '<li class="priority-row" data-p="' + p.key + '">' +
      '<span class="priority-dot"></span>' +
      '<span class="priority-name">' + p.label + '</span>' +
      slaHtml +
      '<span class="priority-count">' + p.count + '</span>' +
    '</li>';
  }).join('');

  var totalBreaches = PRIORITIES.reduce(function (sum, p) { return sum + p.slaBreaches; }, 0);
  breachVal.textContent = totalBreaches;
}

// Demo: clicking a priority row resolves one ticket from that bucket,
// showing the stacked bar and list respond to changing backlog composition.
listEl.addEventListener('click', function (e) {
  var row = e.target.closest('.priority-row');
  if (!row) return;
  var key = row.dataset.p;
  var p = PRIORITIES.find(function (item) { return item.key === key; });
  if (!p || p.count === 0) return;
  p.count -= 1;
  if (p.slaBreaches > p.count) p.slaBreaches = p.count > 0 ? Math.min(p.slaBreaches, p.count) : 0;
  render();
});

render();`,
  seo: {
    title: 'Support Ticket Backlog Widget — Free HTML CSS JS Snippet',
    description: 'A support dashboard widget showing ticket backlog as a stacked priority bar plus a breakdown list, with SLA breach counts and oldest-ticket age. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Support Ticket Backlog Widget — Stacked Priority Bar with SLA Breach Tracking',
      description: `A support team lead opening a dashboard first thing in the morning needs to answer two questions fast: how big is the backlog, and how much of it is already past the point where it should have been handled. This widget puts both answers in the same glance — a single stacked bar shows the backlog's priority composition at a proportional width, a breakdown list underneath gives exact counts per priority, and a footer surfaces the oldest open ticket's age alongside a dedicated SLA-breach count.

**A stacked bar computed from proportions, not hardcoded widths**

\`render()\` computes each priority's share with \`(p.count / t) * 100\` where \`t\` is the live total across all priorities, then sets that percentage directly as each \`.stack-seg\`'s inline \`width\`. Because the widths are derived from the data every render rather than fixed in CSS, the bar's proportions stay accurate automatically as ticket counts change — resolving an urgent ticket doesn't just shrink the urgent segment, it also proportionally grows every other segment's visual share of the bar, exactly matching how the underlying data changed.

**SLA breach count surfaced twice, at two different levels of detail**

The footer's \`#breachVal\` shows the *total* SLA-breach count summed across all priorities, while individual priority rows in the list additionally show a red \`.priority-sla\` pill only when that specific priority has any breaches (\`p.slaBreaches > 0\`) — a normal-priority row with zero breaches shows no pill at all rather than a redundant "0 breached." This two-level surfacing answers both "is anything breaching SLA at all" (the footer, glanceable without reading the list) and "which specific priority bucket is the problem" (the list, one click of attention away).

**Clicking a priority row resolves a ticket, demonstrating live recomputation**

The list uses a single delegated \`click\` listener on \`#priorityList\` rather than one per row, checking \`e.target.closest('.priority-row')\` to find which row was clicked regardless of which child element inside it received the event — the standard event-delegation pattern for a dynamically rendered list. Clicking a row decrements that priority's \`count\`, clamps its \`slaBreaches\` count so it can never exceed the remaining ticket count for that priority (a bucket cannot have more breached tickets than open tickets), and re-renders everything — the bar, the list, and the footer breach total all update together from the same source-of-truth array.

**Color as the primary priority signal, consistently applied**

Each priority's \`colorClass\` (urgent=red, high=amber, normal=indigo, low=slate) drives both its stacked-bar segment color and its list-row dot color, so a viewer scanning the bar first and the list second sees the same color vocabulary in both places rather than having to remap colors to labels twice. This consistency matters most for the bar, which by itself only shows color and proportion with no text — someone glancing at just the bar still needs the color-to-priority mapping to be intuitive or already learned from the list below it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a priority row', text: 'Resolves one ticket from that priority bucket — the stacked bar, the row\'s own count, and the footer SLA breach total all update to reflect the new backlog composition.' },
        { title: 'Watch the stacked bar proportions shift', text: 'Each segment\'s width is recomputed from live counts on every render, so the bar always accurately reflects the current priority mix.' },
        { title: 'Replace PRIORITIES with real ticket data', text: 'Populate the array from your helpdesk API (Zendesk, Intercom, Freshdesk, or an internal system) with the same { key, label, count, slaBreaches, colorClass } shape.' },
        { title: 'Adjust SLA breach detection', text: 'Compute slaBreaches server-side from each ticket\'s actual open duration versus your SLA policy per priority, rather than the demo\'s static starting values.' },
        { title: 'Wire the oldest-ticket value to real data', text: 'Replace the static "6d 4h" text with a computed value from your oldest currently-open ticket\'s creation timestamp.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Stacked priority bar with segment widths computed live from proportional ticket counts, not fixed values',
      'SLA breach count surfaced at both a total-footer level and a per-priority list level',
      'Per-priority breach pill only renders when that priority actually has breaches, avoiding redundant zero-states',
      'Single delegated click listener resolves tickets from any row without per-row event handlers',
      'SLA breach count is clamped so it can never exceed a priority\'s remaining open ticket count',
      'Consistent color vocabulary shared between the stacked bar segments and the list row indicator dots',
      'Total open-ticket badge recomputes automatically from the same priority array on every render',
      'Compact tile layout suited to sitting in a grid of other support or ops dashboard widgets',
    ],
    useCases: [
      { icon: 'OPS', title: 'Support and helpdesk team dashboards', desc: 'The core use case — give a support lead or team channel a live glanceable view of backlog size, composition, and SLA risk without opening the full ticketing system.' },
      { icon: 'ALERT', title: 'SLA compliance and escalation monitoring', desc: 'Pair with the [Incident Status Summary Widget](/ui-snippets/incident-status-summary-widget/) as the customer-support counterpart to an engineering on-call view.' },
      { icon: 'DASH', title: 'Customer success team standups', desc: 'Show backlog composition at the start of a daily standup to prioritize which tickets the team tackles first, ordered by the visible urgent and high segments.' },
      { icon: 'CHART', title: 'Support capacity and staffing dashboards', desc: 'Feed the total backlog and breach counts into a capacity-planning view to decide when a support queue needs additional staffing.' },
      { icon: 'CODE', title: 'Learn proportional stacked-bar rendering', desc: 'A clean example of computing bar segment widths as live percentages of a changing total, rather than hardcoding proportions that would go stale as data changes.' },
    ],
    faqs: [
      { q: 'How are the stacked bar segment widths calculated?', a: 'render() computes each priority\'s share as (p.count / t) * 100, where t is the current sum of all priority counts, and sets that percentage as each segment\'s inline width style directly. Because this recomputes on every render, the bar\'s proportions always match the live data rather than staying fixed after the first render.' },
      { q: 'Why does the SLA breach pill only appear on some priority rows?', a: 'The list only renders a .priority-sla pill for a given priority when p.slaBreaches > 0. A priority with zero breaches shows no pill at all rather than a redundant "0 breached" label, keeping the list visually focused on priorities that actually need attention.' },
      { q: 'How does clicking a row know which priority was clicked?', a: 'A single click listener is attached to the whole #priorityList container rather than to each individual row. Inside it, e.target.closest(\'.priority-row\') walks up from whatever element was actually clicked to find its containing row, then reads that row\'s data-p attribute to look up the matching priority object — the standard event-delegation pattern for dynamically rendered lists.' },
      { q: 'Can the SLA breach count exceed the number of open tickets in a priority?', a: 'No — after decrementing a priority\'s count, the click handler clamps slaBreaches so it never exceeds the remaining count for that priority, since a bucket logically cannot have more breached tickets than it has open tickets total.' },
      { q: 'How do I connect this to a real helpdesk system?', a: 'Replace the static PRIORITIES array with data fetched from your helpdesk API (Zendesk, Freshdesk, Intercom, or an internal ticketing system), keeping the same { key, label, count, slaBreaches, colorClass } object shape, and compute slaBreaches server-side by comparing each open ticket\'s age against your SLA policy for its priority level.' },
      { q: 'Why do the bar segments and the list rows use the same colors?', a: 'Each priority\'s colorClass value drives both its stacked-bar segment fill and its list-row dot color, so a viewer only needs to learn the color-to-priority mapping once. This matters especially for the bar on its own, since it communicates only color and proportion with no text labels inside the segments.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the stacked bar's segment widths are computed as a percentage of the live total on every render rather than being set once, and what would visually break if the widths were hardcoded instead. The same assistant can help optimize it — for instance asking whether the delegated click listener on the list would scale correctly if priorities were rendered from a much larger, dynamically paginated ticket dataset. It's also useful for extending the widget: ask it to add a per-priority "average resolution time" stat, animate the stack segments with a transition when counts change, or add a filter that highlights only priorities with active SLA breaches. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "support ticket backlog" dashboard widget in HTML, CSS, and vanilla JavaScript — no charting library.

Requirements:
- Maintain ticket backlog data as an array of priority-level objects, each with a priority key, a display label, an open-ticket count, an SLA-breach count, and a color identifier — render a single horizontal stacked bar where each priority gets one colored segment whose width is computed as a live percentage of the current total ticket count across all priorities (not a fixed or hardcoded width).
- Below the bar, render one row per priority showing a color-matched dot (using the same color as its bar segment), the priority label, its open ticket count, and — only when that priority's SLA-breach count is greater than zero — a distinct red pill showing how many of its tickets have breached SLA (priorities with zero breaches must show no breach pill at all).
- Add a footer area showing the oldest open ticket's age and the total SLA-breach count summed across every priority.
- Implement ticket resolution via a single delegated click listener attached to the list container (not one listener per row) that, using event delegation to determine which row was clicked, decrements that priority's open-ticket count by one, re-renders the stacked bar and list so all proportions and counts update together, and clamps that priority's SLA-breach count so it can never exceed its own remaining open-ticket count.
- A total open-ticket count badge in the widget header must also recompute automatically from the same underlying data whenever a ticket is resolved.`,
    },
  },
};

export default supportTicketBacklogWidget;
