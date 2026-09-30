const aiAgentStepTimeline = {
  id: 'ai-agent-step-timeline',
  title: 'AI Agent Step Timeline',
  lastmod: '2026-09-05',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="ast-wrap">
  <div class="ast-head">
    <h2>Agent run</h2>
    <span class="ast-badge" id="astBadge">Running</span>
  </div>
  <div class="ast-timeline" id="astTimeline"></div>
  <div class="ast-summary" id="astSummary" hidden></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.ast-wrap { width: 100%; max-width: 420px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }

.ast-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.ast-head h2 { font-size: 16px; font-weight: 800; color: #1e293b; }
.ast-badge { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; padding: 4px 10px; border-radius: 999px; background: #eef2ff; color: #6366f1; }
.ast-badge.ast-badge-done { background: #dcfce7; color: #16a34a; }

.ast-timeline { position: relative; padding-left: 6px; }

.ast-step { position: relative; display: flex; gap: 12px; padding-bottom: 22px; }
.ast-step:last-child { padding-bottom: 0; }
.ast-step::before {
  content: ''; position: absolute; left: 11px; top: 26px; bottom: -2px; width: 2px; background: #e2e8f0;
}
.ast-step:last-child::before { display: none; }
.ast-step.ast-step-done::before { background: #c7d2fe; }

.ast-icon-col { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
.ast-icon-pending { background: #f1f5f9; border: 2px solid #e2e8f0; }
.ast-icon-running { background: #eef2ff; border: 2px solid #6366f1; }
.ast-icon-running::after {
  content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 2px solid #6366f1; opacity: 0.5;
  animation: astPulse 1.4s ease-out infinite;
}
.ast-icon-done { background: #6366f1; display: flex; align-items: center; justify-content: center; }
.ast-icon-done svg { display: block; }

@keyframes astPulse { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }

.ast-step-body { padding-top: 2px; }
.ast-step-title { font-size: 13px; font-weight: 700; color: #94a3b8; transition: color 0.2s; }
.ast-step.ast-step-running .ast-step-title, .ast-step.ast-step-done .ast-step-title { color: #1e293b; }
.ast-step-sub { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

.ast-summary {
  margin-top: 18px; padding-top: 14px; border-top: 1px solid #f1f5f9; font-size: 12.5px; font-weight: 700; color: #16a34a;
  display: flex; align-items: center; gap: 6px;
}`,
  js: `const STEPS = [
  { title: 'Searching knowledge base', sub: 'Query: "refund policy edge cases"' },
  { title: 'Reading 3 documents', sub: 'refund-policy.md, faq.md, terms.md' },
  { title: 'Calling calculator tool', sub: 'Computing prorated refund amount' },
  { title: 'Drafting response', sub: 'Composing final answer for the user' },
];

const timeline = document.getElementById('astTimeline');
const badge = document.getElementById('astBadge');
const summary = document.getElementById('astSummary');

const ICON_DONE = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

function render() {
  timeline.innerHTML = STEPS.map((step, i) => {
    const state = step.status || 'pending';
    let iconHtml = '';
    if (state === 'done') iconHtml = '<div class="ast-icon-col ast-icon-done">' + ICON_DONE + '</div>';
    else if (state === 'running') iconHtml = '<div class="ast-icon-col ast-icon-running"></div>';
    else iconHtml = '<div class="ast-icon-col ast-icon-pending"></div>';

    return \`
      <div class="ast-step ast-step-\${state}">
        \${iconHtml}
        <div class="ast-step-body">
          <div class="ast-step-title">\${step.title}</div>
          <div class="ast-step-sub">\${step.sub}</div>
        </div>
      </div>\`;
  }).join('');
}

STEPS.forEach((s) => { s.status = 'pending'; });
render();

const startTime = Date.now();
let stepIndex = 0;

function runNextStep() {
  if (stepIndex >= STEPS.length) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    badge.textContent = 'Completed';
    badge.classList.add('ast-badge-done');
    summary.hidden = false;
    summary.innerHTML = '<span>&#10003;</span> Completed in ' + elapsed + 's';
    return;
  }

  STEPS[stepIndex].status = 'running';
  render();

  const runDuration = 900 + Math.random() * 600;
  setTimeout(() => {
    STEPS[stepIndex].status = 'done';
    stepIndex += 1;
    render();
    setTimeout(runNextStep, 250);
  }, runDuration);
}

setTimeout(runNextStep, 400);`,
  seo: {
    title: 'AI Agent Step Timeline — Free HTML CSS JS Snippet',
    description: 'A vertical timeline that simulates an AI agent working through pending, running, and completed steps in sequence, ending with a run-time summary. Exports to React, Vue & Tailwind.',
    about: {
      title: 'AI Agent Step Timeline — Simulated Live Agent Run Progress Timeline',
      description: `Agentic AI products often show users a live trace of what the agent is currently doing — searching, reading documents, calling tools — rather than a single opaque loading spinner. This snippet fakes that experience client-side using a hardcoded step list and chained \`setTimeout\` calls, so it can be dropped into a demo or design mockup without any real agent backend.

**Steps carry their own status, driving one render function**

Each entry in the \`STEPS\` array gets a \`status\` field of \`'pending'\`, \`'running'\`, or \`'done'\`. A single \`render()\` function rebuilds the entire timeline's HTML from that array every time it's called — there's no separate DOM-patching logic per step, which keeps the rendering logic simple and impossible to get out of sync with the underlying data.

**Sequential progress via chained setTimeout, not setInterval**

\`runNextStep()\` marks the current step \`'running'\`, waits a randomized duration (900–1500ms) to simulate real work, marks it \`'done'\`, then calls itself again after a short pause for the next step — recursing until every step is complete. Chaining timeouts like this (rather than one fixed-interval loop) lets each step take a different, slightly randomized amount of time, which reads as more realistic than a perfectly uniform tick.

**Distinct visual states per step**

Pending steps show a plain gray-outlined circle; the running step shows an indigo-outlined circle with a CSS \`@keyframes\` ring that scales outward and fades, giving a pulsing "in progress" animation; done steps show a filled indigo circle with a checkmark icon. The connecting line between steps also changes color once a step is done, so completed portions of the timeline are visually distinct from what's still ahead.

**A real elapsed-time summary**

The run's actual start time is captured once via \`Date.now()\` when the timeline begins. When the last step finishes, the elapsed seconds are computed from that real timestamp rather than a hardcoded number, so the "Completed in Xs" summary reflects the actual simulated run duration.`,
    },
    features: [
      'Vertical timeline with pending, running (pulsing), and done (checkmark) states per step',
      'Sequential step progression simulated with chained setTimeout calls and randomized per-step duration',
      'Connecting line between steps changes color as earlier steps complete',
      'Animated pulsing ring indicator on the currently-running step via CSS keyframes',
      'Real elapsed-time tracking from a captured start timestamp, shown in a final summary line',
      'Status badge in the header that switches from "Running" to "Completed" automatically',
      'Single render() function rebuilds the whole timeline from step state, keeping UI and data in sync',
      'No external API calls — the entire agent run is a client-side simulation',
    ],
    useCases: [
      { icon: 'APP', title: 'AI agent and copilot product dashboards', desc: 'Show users a believable live trace of an agent working through a multi-step task.' },
      { icon: 'CODE', title: 'Reference for wiring a real agent event stream to a UI', desc: 'Swap the setTimeout simulation for real step-completion events from your agent backend.' },
      { icon: 'DESIGN', title: 'Product demos and marketing pages for agentic features', desc: 'Demonstrate an agent workflow visually without needing a live backend during a demo.' },
      { icon: 'LEARN', title: 'Teaching sequential async UI simulation', desc: 'A clear example of chaining setTimeout calls to simulate a multi-stage async process.' },
    ],
    faqs: [
      { q: 'Does this call a real AI agent?', a: 'No. All four steps and their timing are hardcoded and simulated with setTimeout — no network request or tool execution actually happens.' },
      { q: 'How is the "Completed in Xs" time calculated?', a: 'A startTime timestamp is captured with Date.now() right when the timeline begins. Once the final step finishes, the elapsed time is computed from that real timestamp, so it reflects the actual (simulated) run duration rather than a fixed number.' },
      { q: 'Why use chained setTimeout instead of setInterval?', a: 'Chaining setTimeout calls lets each step run for its own randomized duration and only schedules the next step once the current one truly finishes, which produces more natural-looking, non-uniform timing than a fixed-interval tick would.' },
      { q: 'How would I connect this to a real agent backend?', a: 'Replace the setTimeout logic inside runNextStep() with handlers for real step-started/step-completed events (e.g. from a WebSocket or server-sent events stream), calling render() whenever a step\'s status actually changes.' },
    ],
  },
};

export default aiAgentStepTimeline;
