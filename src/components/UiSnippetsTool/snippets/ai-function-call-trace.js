const aiFunctionCallTrace = {
  id: 'ai-function-call-trace',
  title: 'AI Function Call Trace',
  lastmod: '2026-08-22',
  category: 'dashboards',
  html: `<div class="fct-card">
  <div class="fct-head">
    <h3>Agent trace</h3>
    <span class="fct-total" id="fctTotal">4 steps &middot; 2.4s</span>
  </div>
  <div class="fct-list" id="fctList"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d15;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fct-card{background:#0f1420;border:1px solid #1e2536;border-radius:16px;padding:20px;width:100%;max-width:460px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.fct-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px}
.fct-head h3{font-size:15px;font-weight:800;color:#f1f5f9}
.fct-total{font-size:11px;color:#5b6884;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

.fct-list{position:relative}
.fct-step{position:relative;padding-left:30px;padding-bottom:14px}
.fct-step:last-child{padding-bottom:0}
.fct-step:not(:last-child)::before{content:'';position:absolute;left:9px;top:22px;bottom:0;width:1.5px;background:#1e2536}

.fct-dot{position:absolute;left:0;top:1px;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;background:#161d2e;border:1.5px solid #2a3350;color:#5b6884}
.fct-step.success .fct-dot{border-color:#34d399;color:#34d399;background:rgba(52,211,153,.1)}
.fct-step.error .fct-dot{border-color:#f87171;color:#f87171;background:rgba(248,113,113,.1)}
.fct-step.pending .fct-dot{border-color:#fbbf24;color:#fbbf24;background:rgba(251,191,36,.1)}
.fct-step.pending .fct-dot{animation:fctSpin 1s linear infinite}
@keyframes fctSpin{to{transform:rotate(360deg)}}

.fct-row{display:flex;align-items:center;justify-content:space-between;cursor:pointer;gap:10px}
.fct-name{font-size:13px;font-weight:700;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.fct-meta{display:flex;align-items:center;gap:8px;flex-shrink:0}
.fct-duration{font-size:10.5px;color:#5b6884;font-variant-numeric:tabular-nums}
.fct-chevron{width:13px;height:13px;color:#4b5675;transition:transform .18s}
.fct-step.open .fct-chevron{transform:rotate(90deg)}

.fct-detail{max-height:0;overflow:hidden;transition:max-height .25s ease}
.fct-step.open .fct-detail{max-height:200px}
.fct-detail-inner{margin-top:9px;background:#080b12;border:1px solid #1a2130;border-radius:9px;padding:10px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1.6;color:#8a94ab;white-space:pre-wrap}
.fct-detail-inner b{color:#c3cae0}`,

  js: `var STEPS = [
  { name: 'search_web', status: 'success', duration: '410ms', args: '{ "query": "latest LLM pricing 2026" }', result: '{ "results": 8, "top": "anthropic.com/pricing" }' },
  { name: 'parse_results', status: 'success', duration: '90ms', args: '{ "source": "search_web.results" }', result: '{ "extracted": 3, "fields": ["model","price","context"] }' },
  { name: 'summarize', status: 'pending', duration: '&#8230;', args: '{ "input_tokens": 1204 }', result: 'Waiting for completion&#8230;' },
  { name: 'send_reply', status: 'error', duration: '120ms', args: '{ "channel": "chat" }', result: 'Error: message exceeds 4096 characters' },
];

var listEl = document.getElementById('fctList');
var totalEl = document.getElementById('fctTotal');

var ICONS = { success: '&#10003;', error: '&#10005;', pending: '' };

function render() {
  listEl.innerHTML = STEPS.map(function (s, i) {
    return '<div class="fct-step ' + s.status + '" data-i="' + i + '">' +
      '<span class="fct-dot">' + ICONS[s.status] + '</span>' +
      '<div class="fct-row">' +
        '<span class="fct-name">' + s.name + '()</span>' +
        '<span class="fct-meta">' +
          '<span class="fct-duration">' + s.duration + '</span>' +
          '<svg class="fct-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>' +
        '</span>' +
      '</div>' +
      '<div class="fct-detail"><div class="fct-detail-inner"><b>args</b> ' + s.args + '\\n<b>result</b> ' + s.result + '</div></div>' +
    '</div>';
  }).join('');

  var success = STEPS.filter(function (s) { return s.status !== 'pending'; }).length;
  totalEl.textContent = STEPS.length + ' steps';
}

listEl.addEventListener('click', function (e) {
  var row = e.target.closest('.fct-row');
  if (!row) return;
  row.closest('.fct-step').classList.toggle('open');
});

render();`,

  seo: {
    title: 'AI Function Call Trace — Free Agent Tool-Call Timeline Snippet',
    description: `A collapsible timeline showing an AI agent's tool-call sequence with status icons, durations, and expandable JSON args/results. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AI Function Call Trace — Collapsible Timeline with Status Icons and Expandable JSON',
      description: `Agentic AI products chain together tool calls — search, parse, summarize, reply — and when something goes wrong, developers and power users need to see exactly what the agent did, in what order, and what each step returned. This snippet builds a collapsible function-call trace in plain HTML, CSS, and vanilla JavaScript: a vertical timeline with status dots, durations, and expandable JSON detail per step.

**A connected timeline, not a flat list**

Each step in \`STEPS\` renders as a \`.fct-step\` with a status dot positioned on a vertical connector line that runs down to the next step, using a pseudo-element border rather than a separate SVG or divider element. This makes the sequence read as one continuous execution path — the same visual grammar used in CI/CD pipeline views and this library's [AI agent steps](/ui-snippets/ai-agent-steps/) — rather than an ambiguous stack of cards.

**Status-driven dot styling**

The dot's border color, fill, icon, and even an animation are all keyed off one \`status\` field per step: green with a checkmark for \`success\`, red with an X for \`error\`, and amber with a spin animation for \`pending\`. Because everything derives from one field, a step can never show a green dot with error text or any other inconsistent combination.

**Click to expand, not a separate modal**

Each row is collapsible in place using a \`max-height\` transition on the detail panel rather than \`display\` toggling, so the expand/collapse animates smoothly instead of snapping open. The detail panel shows the step's raw \`args\` and \`result\` in a monospace, JSON-styled block — exactly what a developer debugging an agent needs without leaving the trace view.

**Where this fits in an AI product**

Use it in an agent-debugging dashboard next to an [AI safety refusal card](/ui-snippets/ai-safety-refusal-card/) for the cases where a step legitimately fails or is declined, or pair it with a [webhook event tester](/ui-snippets/webhook-event-tester/) when the trace involves external API calls. It's also a natural companion to an [AI context window indicator](/ui-snippets/ai-context-window-indicator/), since every tool call in a trace consumes context.

**Customizing it**

Feed \`STEPS\` from a real agent run's execution log, add a retry button on \`error\` steps, or add nested sub-steps for tool calls that themselves invoke other tools.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A four-step agent trace renders with success, pending, and error states visible.` },
      { title: 'Click any step row', text: `The row expands in place to reveal its raw args and result as monospace JSON.` },
      { title: 'Read the status dots', text: `Green checkmarks are successes, red X's are errors, and an amber spinner marks a pending step.` },
      { title: 'Follow the connector line', text: `A vertical line links each dot to the next, showing execution order at a glance.` },
      { title: 'Edit the STEPS array', text: `Add, remove, or reorder tool calls — the timeline regenerates from data.` },
      { title: 'Wire up a real trace', text: `Feed STEPS from your agent framework's execution log or callback events.` },
    ] },
    features: [
      { title: 'Connected vertical timeline', text: `A CSS border-based connector links each step's status dot in execution order.` },
      { title: 'Status-driven dot styling', text: `Color, icon, and animation all derive from one status field per step.` },
      { title: 'Expandable JSON detail', text: `Click any row to reveal raw args and result in a monospace panel.` },
      { title: 'Smooth height transition', text: `max-height animates the expand/collapse instead of an abrupt display toggle.` },
      { title: 'Pending-state animation', text: `A spinning dot signals a step still in flight.` },
      { title: 'Per-step duration display', text: `Each row shows how long that call took, right-aligned for easy scanning.` },
      { title: 'Data-driven rendering', text: `Every step comes from one STEPS array — trivial to feed from a real agent log.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Agent debugging dashboards', text: `Show exactly what an agent did, paired with [AI agent steps](/ui-snippets/ai-agent-steps/).` },
      { title: 'Developer-facing AI consoles', text: `Expose tool-call traces next to a [log viewer stream](/ui-snippets/log-viewer-stream/).` },
      { title: 'Multi-tool agent products', text: `Show search, retrieval, and generation steps for transparency.` },
      { title: 'Support and QA tooling', text: `Let support staff inspect why an agent gave a certain answer.` },
      { title: 'API integration testing', text: `Pair with a [webhook event tester](/ui-snippets/webhook-event-tester/) for external tool calls.` },
      { title: 'Audit and compliance views', text: `Provide a readable record of an agent's actions for review.` },
      { icon: 'CODE', title: 'Related: API Response Inspector', desc: 'See the [API Response Inspector](/ui-snippets/api-response-inspector/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SSL Certificate Expiry Monitor', desc: 'See the [SSL Certificate Expiry Monitor](/ui-snippets/ssl-certificate-expiry-monitor/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Support Ticket Backlog Widget', desc: 'See the [Support Ticket Backlog Widget](/ui-snippets/support-ticket-backlog-widget/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the connector line drawn between steps?', a: `Each step except the last gets a ::before pseudo-element positioned absolutely as a thin vertical bar running from just below its dot to the top of the next step. Because it is anchored to each step rather than being one long separate line, the timeline still works correctly if steps are added, removed, or have varying expanded heights.` },
      { q: 'How do the status dot colors stay consistent with the rest of the row?', a: `Everything about a step's status presentation — the dot's border and fill color, its icon, and whether it spins — is driven by one status string per step object and a single CSS class applied to the whole .fct-step element. There is no separate place where a color could be set independently and drift out of sync.` },
      { q: 'How do I add a retry action for failed steps?', a: `Add a button inside the detail panel, conditionally rendered only for steps where status === "error", and wire its click handler to re-invoke that specific tool call in your agent framework, then update that step's status and re-render.` },
      { q: 'Can a step contain nested sub-steps for a tool that calls other tools?', a: `Yes — add a children array to a step object, and recursively render a nested .fct-list (indented) inside that step's detail panel when children is present. The same status/dot/connector logic applies at each nesting level.` },
      { q: 'How do I use this trace view in React, Vue, or Angular?', a: `Pass the steps array as a prop, track which step indices are expanded in local state (a Set of open indices works well), and render each step's detail panel conditionally or with a CSS max-height bound to that state. The status-to-style mapping becomes a small lookup object or computed class.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the connector-line and expand-transition mechanics by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the per-step pseudo-element border creates a continuous-looking timeline without one long absolutely-positioned line spanning the whole list, and why max-height rather than display is used to animate the detail panel open and closed. The same assistant can help optimize it — ask whether a very long trace (dozens of tool calls) should virtualize the list or collapse older steps by default. It's also useful for extending the component: ask it to add nested sub-steps for tools that call other tools, stream new steps in live via a websocket as an agent runs, or add a retry action scoped to failed steps only. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI function call trace" as a collapsible vertical timeline in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Render a sequence of AI agent tool-call steps (e.g. search_web, parse_results, summarize, send_reply) from a single JavaScript data array of objects, each with a function name, a status (success, error, or pending), a duration string, and JSON-like args and result strings — no hand-written per-step markup.
- Each step shows a small status dot connected to the next step's dot by a continuous-looking vertical line, using CSS pseudo-elements or borders rather than a separate absolutely-positioned line spanning the entire list, so the connector still works correctly if steps are added or removed.
- The status dot's border color, fill color, and icon (checkmark, X, or a spinning indicator) must all be derived from that single status field, never set independently, so a step can never visually contradict its own status.
- Each step's row must be clickable to expand/collapse an inline detail panel showing its args and result in a monospace font, animated with a max-height transition (not an abrupt show/hide), and a chevron icon that rotates to indicate open/closed state.
- Show each step's duration text next to its name, and a pending step should not have a fixed duration (e.g. show an ellipsis or "in progress" instead).
- Use a dark theme with system-ui font for labels, monospace font for function names and JSON detail, and distinct colors for success (green), error (red), and pending (amber) states.`,
    },
  },
};

export default aiFunctionCallTrace;
