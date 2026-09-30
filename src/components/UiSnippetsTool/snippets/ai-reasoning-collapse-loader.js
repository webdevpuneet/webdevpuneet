const aiReasoningCollapseLoader = {
  id: 'ai-reasoning-collapse-loader',
  title: 'AI Reasoning Collapse Loader',
  category: 'loaders',
  html: `<div class="rc-wrap">
  <div class="rc-card">
    <button class="rc-toggle" id="rcToggle" aria-expanded="false">
      <svg class="rc-chevron" id="rcChevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 6 15 12 9 18"/></svg>
      <span class="rc-spinner" id="rcSpinner"></span>
      <span class="rc-label" id="rcLabel">Thinking…</span>
    </button>
    <div class="rc-panel" id="rcPanel">
      <div class="rc-steps" id="rcSteps"></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.rc-wrap{width:100%;max-width:420px}
.rc-card{background:#12151f;border:1px solid #23273a;border-radius:14px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,.4)}

.rc-toggle{width:100%;display:flex;align-items:center;gap:9px;padding:13px 16px;background:none;border:none;cursor:pointer;font-family:inherit;text-align:left}
.rc-chevron{color:#6b7280;transition:transform .22s cubic-bezier(.4,0,.2,1);flex-shrink:0}
.rc-card.open .rc-chevron{transform:rotate(90deg)}

.rc-spinner{width:13px;height:13px;border-radius:50%;border:2px solid #2b3044;border-top-color:#818cf8;flex-shrink:0;animation:rcSpin .7s linear infinite}
.rc-card.done .rc-spinner{border:none;background:#2b3044;position:relative}
.rc-card.done .rc-spinner::after{content:'';position:absolute;left:3px;top:0px;width:4px;height:7px;border:solid #4ade80;border-width:0 2px 2px 0;transform:rotate(45deg)}
@keyframes rcSpin{to{transform:rotate(360deg)}}

.rc-label{font-size:13.5px;font-weight:600;color:#c8cbdb}

.rc-panel{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1)}
.rc-card.open .rc-panel{max-height:280px}

.rc-steps{padding:0 16px 16px 39px;display:flex;flex-direction:column;gap:9px;border-top:1px solid #1c2033}
.rc-steps{padding-top:12px}

.rc-step{font-size:12.5px;line-height:1.6;color:#7d8296;opacity:0;transform:translateY(4px);animation:rcStepIn .35s ease forwards}
@keyframes rcStepIn{to{opacity:1;transform:translateY(0)}}`,

  js: `// A collapsible "reasoning trace" loader in the style of modern AI chat UIs:
// the header shows a live elapsed timer while the model "thinks," and clicking
// it expands a panel that reveals reasoning lines one at a time. The elapsed
// time is driven by a REAL Date.now() delta on every tick, not a fake counter.
var card = document.querySelector('.rc-card');
var toggleBtn = document.getElementById('rcToggle');
var label = document.getElementById('rcLabel');
var stepsEl = document.getElementById('rcSteps');
var panel = document.getElementById('rcPanel');

var REASONING = [
  'Parsing the user\\u2019s request and identifying the core question.',
  'Checking for relevant context earlier in the conversation.',
  'Weighing two possible approaches and comparing trade-offs.',
  'Drafting a structured answer that covers the edge cases.',
  'Reviewing the draft for accuracy before responding.'
];

var startedAt = Date.now();
var finished = false;
var expanded = false;
var stepIndex = 0;

function formatElapsed(ms) {
  return (ms / 1000).toFixed(1) + 's';
}

var tickTimer = setInterval(function () {
  if (finished) return;
  label.textContent = 'Thinking for ' + formatElapsed(Date.now() - startedAt);
}, 100);

function addStep() {
  if (stepIndex >= REASONING.length) {
    finished = true;
    clearInterval(tickTimer);
    card.classList.add('done');
    label.textContent = 'Thought for ' + formatElapsed(Date.now() - startedAt);
    return;
  }
  var row = document.createElement('div');
  row.className = 'rc-step';
  row.textContent = REASONING[stepIndex];
  stepsEl.appendChild(row);
  stepIndex++;
  setTimeout(addStep, 900 + Math.random() * 500);
}
setTimeout(addStep, 700);

toggleBtn.addEventListener('click', function () {
  expanded = !expanded;
  card.classList.toggle('open', expanded);
  toggleBtn.setAttribute('aria-expanded', String(expanded));
  if (expanded) {
    panel.style.maxHeight = stepsEl.scrollHeight + 40 + 'px';
  }
});

// Keep the max-height in sync as new reasoning lines are appended while open.
var observer = new MutationObserver(function () {
  if (expanded) panel.style.maxHeight = stepsEl.scrollHeight + 40 + 'px';
});
observer.observe(stepsEl, { childList: true });`,

  seo: {
    title: 'AI Reasoning Collapse Loader — CSS JS "Thinking" Trace Snippet',
    description: 'A collapsible AI reasoning loader with a live elapsed timer and step-by-step thinking trace reveal, styled after modern chat model UIs. Exports to React, Vue & Tailwind.',
    about: {
      title: 'AI Reasoning Collapse Loader — Collapsible "Thought For Ns" Trace with a Live Timer',
      description: `Modern AI chat interfaces increasingly show a collapsed "Thought for 4s" row while a model reasons, which a user can expand to read the actual chain-of-thought trace underneath. This snippet reproduces that exact pattern in plain HTML, CSS, and JavaScript: a header with a live elapsed-time label and a spinner-to-checkmark icon, and a collapsible panel below it that reveals reasoning lines one at a time as they "arrive."

**A real elapsed timer, not a fixed label**

The header label is driven by \`setInterval\` reading \`Date.now() - startedAt\` on every tick and formatting it as seconds with one decimal — \`Thinking for 2.3s\`, ticking up in real time exactly like the reasoning UIs it is modeled on. Once the last reasoning line has been appended, the timer stops and the label freezes as \`Thought for Ns\`, matching the past-tense phrasing real products use once a reasoning pass completes.

**Spinner-to-checkmark state**

While reasoning is in progress, \`.rc-spinner\` is a small bordered circle with a rotating conic border, giving a genuine spin animation. When the trace finishes, JavaScript adds a \`.done\` class to the card, which swaps the spinner for a checkmark built from a rotated two-sided border pseudo-element — no icon font or SVG library needed for either state.

**Collapsible panel with a synced max-height**

Clicking the header toggles an \`.open\` class that expands \`.rc-panel\` from \`max-height: 0\` to a value computed from \`stepsEl.scrollHeight\`. Because reasoning lines can still be arriving while the panel is open, a \`MutationObserver\` watches \`.rc-steps\` for new children and recalculates the target \`max-height\` whenever one is appended — so the panel never clips a line that arrived after it was opened, and never needs a hardcoded content height.

**Staggered line-by-line reveal**

Each reasoning string in the \`REASONING\` array is appended to the DOM individually via \`addStep()\`, scheduled with a randomized \`setTimeout\` delay between roughly 900ms and 1400ms so lines arrive at an irregular, natural cadence rather than a mechanical fixed interval. Each new \`.rc-step\` fades and slides in with a short CSS keyframe, so even a line that appears while the user is mid-read doesn't pop in abruptly.

**Why this differs from a generic "thinking" bubble**

Unlike a simple shimmering "Thinking…" bubble or a shimmer skeleton, this component's headline feature is that it is collapsible and shows its actual work: the elapsed time is a real clock, not a decorative shimmer, and the content underneath is genuine reasoning text a user can choose to inspect or ignore. It is the loading pattern specifically associated with visible chain-of-thought and "extended thinking" style responses in current AI assistants.

**Customizing it**

Replace the \`REASONING\` array with real reasoning tokens streamed from your backend, appending each one via \`addStep\`-style logic as they arrive over a WebSocket or SSE connection instead of the built-in \`setTimeout\` simulation. Adjust the spinner and checkmark colors to match your brand, or change the default state to start expanded for debugging views. Pair it with an [ai thinking loader](/ui-snippets/ai-thinking-loader/) for the surrounding chat bubble, or a [typing indicator](/ui-snippets/typing-indicator/) once the final answer begins streaming.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A collapsed "Thinking…" row appears with a spinning icon and a live elapsed timer.' },
        { title: 'Watch the timer tick', text: 'The label updates from a real Date.now() delta roughly ten times per second.' },
        { title: 'Click the header to expand', text: 'The panel opens and reasoning lines fade in one at a time on a randomized delay.' },
        { title: 'Reach completion', text: 'The spinner becomes a checkmark and the label freezes as "Thought for Ns."' },
        { title: 'Edit the REASONING array', text: 'Swap in the reasoning strings your model or backend actually produces.' },
        { title: 'Stream real steps', text: 'Call the same append-and-resize logic from your SSE/WebSocket handler instead of the setTimeout demo loop.' },
      ],
    },
    features: [
      'Live elapsed-time label driven by real Date.now() deltas, not a fixed animation',
      'Collapsible panel with max-height synced via MutationObserver as content streams in',
      'Spinner-to-checkmark icon transition on completion, both built with pure CSS',
      'Staggered, randomized-delay line reveal for a natural reasoning cadence',
      'Past-tense "Thought for Ns" label once finished, matching real chat model UIs',
      'Fade-and-slide-in animation per reasoning line',
      'Keyboard-accessible toggle button with aria-expanded state',
      'Zero dependencies — vanilla DOM APIs only',
      'Drop-in replacement for a plain spinner in any chat message',
      'Fully themeable colors, timing, and copy',
    ],
    useCases: [
      { icon: 'APP', title: 'AI chat assistants with visible reasoning', desc: 'The primary use case — pair with an [ai thinking loader](/ui-snippets/ai-thinking-loader/) bubble for the surrounding message shell.' },
      { icon: 'CODE', title: 'Agent debugging and trace panels', desc: 'Show a developer-facing "thought process" panel while an autonomous agent works through a task.' },
      { icon: 'FORM', title: 'Long-running AI form assistants', desc: 'Reassure users during multi-second AI form-fill or document analysis with a genuine progress trace.' },
      { icon: 'LEARN', title: 'Teaching MutationObserver-based layout sync', desc: 'A concrete example of resizing a collapsible panel as its content streams in, without a fixed max-height guess.' },
      { icon: 'DESIGN', title: 'Support and copilot widgets', desc: 'Use inside a [floating chat widget](/ui-snippets/floating-chat-widget/) to explain what an AI helper is doing before it answers.' },
      { icon: 'ACCESS', title: 'Accessible expand/collapse pattern', desc: 'The toggle button ships with aria-expanded, ready to extend with aria-controls for full ARIA disclosure semantics.' },
      { icon: 'CODE', title: 'Related: Gradient Mesh Loading Screen', desc: 'See the [Gradient Mesh Loading Screen](/ui-snippets/gradient-mesh-loading-screen/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the elapsed timer really tracking time, or is it a canned animation?', a: 'It is real. A setInterval reads Date.now() - startedAt on every tick and formats the actual millisecond delta as seconds. Stopping the interval on completion freezes the label at the true elapsed time, not a scripted value.' },
      { q: 'How does the panel know how tall to grow when content keeps arriving?', a: 'A MutationObserver watches the .rc-steps container for new child nodes. Each time a reasoning line is appended while the panel is open, the observer recalculates max-height from the container\\u2019s live scrollHeight, so the panel never clips newly streamed content.' },
      { q: 'How do I connect this to a real streaming backend?', a: 'Replace the setTimeout-driven addStep loop with your SSE or WebSocket message handler: on each incoming reasoning chunk, create a .rc-step element with that text and append it to #rcSteps exactly as addStep does. The MutationObserver and CSS animation handle the rest automatically.' },
      { q: 'Why does the icon change from a spinner to a checkmark?', a: 'The done class is added to the card once every scripted reasoning line has been appended (or, in a real integration, once your stream signals completion). CSS then hides the rotating border spinner and shows a small checkmark built from a rotated pseudo-element border, with no icon library required.' },
      { q: 'How do I start the panel expanded by default?', a: 'Add the open class to .rc-card in the initial HTML and call panel.style.maxHeight = stepsEl.scrollHeight + 40 + "px" once the DOM is ready, or simply dispatch a click on #rcToggle after the page loads, the same way other toggle-based snippets in this library trigger an initial open state.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep expanded, finished, and the array of revealed steps in component state, appending a step on an interval or on a real stream event inside a mount effect with cleanup. Bind the panel height to a ref\\u2019s scrollHeight instead of manual DOM queries, and everything else (the spinner, checkmark, and timer formatting) ports over as plain markup and CSS.' },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the timing by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the elapsed-time label stays accurate using Date.now() deltas instead of a naive incrementing counter, and how the MutationObserver keeps the collapsible panel's max-height correct even as new reasoning lines are appended after it's already open. The same assistant is useful for optimizing it — for instance asking whether the observer should be disconnected once reasoning is finished to avoid unnecessary callbacks. It's just as good for extending it: ask it to wire addStep up to a real Server-Sent Events endpoint, add a "copy trace" button, or persist the expanded/collapsed preference per user. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a collapsible "AI reasoning" loader in plain HTML, CSS, and JavaScript — no libraries — styled after the "Thought for Ns" collapsed reasoning trace pattern used in modern AI chat products.

Requirements:
- A header row that is a single clickable toggle button containing: a chevron icon that rotates 90 degrees when expanded, a small status icon that is a spinning circular border while reasoning is in progress and morphs into a checkmark once finished, and a text label.
- The text label must show a REAL elapsed time computed from an actual timestamp difference (e.g. Date.now() minus a stored start time) updated on a fast interval while in progress, formatted as seconds with one decimal place (e.g. "Thinking for 2.3s"), and must freeze on a past-tense label (e.g. "Thought for 4.1s") once complete — not a fake or pre-scripted counter.
- Below the header, a collapsible panel starting at max-height: 0 that expands via a CSS transition when the header is clicked, revealing a list of short reasoning-line strings.
- The reasoning lines must be appended to the DOM one at a time on a randomized delay (so the cadence feels natural rather than mechanical), each fading and sliding in with its own small CSS animation.
- Because lines can still be arriving after the user opens the panel, use a MutationObserver on the lines container to recalculate the panel's max-height whenever a new line is appended while it is open, so content is never clipped.
- Mark the component finished (swap the spinner for the checkmark, freeze the timer) only once the last reasoning line has actually been appended, not on an arbitrary fixed delay.`,
    },
  },
};

export default aiReasoningCollapseLoader;
