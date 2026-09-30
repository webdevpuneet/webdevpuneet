const canaryRolloutProgressTile = {
  id: 'canary-rollout-progress-tile',
  title: 'Canary Rollout Progress Tile',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="tile">
    <div class="tile-head">
      <div class="rel-name">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>checkout-service <b>v2.14.0</b></span>
      </div>
      <span class="badge rolling" id="statusBadge">Rolling out</span>
    </div>

    <div class="stages" id="stages"></div>

    <div class="metrics">
      <div class="metric">
        <span class="m-label">Error rate</span>
        <span class="m-val ok" id="errRate">0.04%</span>
      </div>
      <div class="metric">
        <span class="m-label">p95 latency</span>
        <span class="m-val ok" id="latency">118ms</span>
      </div>
      <div class="metric">
        <span class="m-label">Traffic on canary</span>
        <span class="m-val" id="trafficPct">5%</span>
      </div>
    </div>

    <div class="tile-actions">
      <button class="btn rollback" id="rollbackBtn">Roll back</button>
      <button class="btn promote" id="promoteBtn">Promote now</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.tile { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 16px; }

.tile-head { display: flex; align-items: center; justify-content: space-between; }
.rel-name { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #475569; font-family: ui-monospace, 'SF Mono', monospace; }
.rel-name svg { color: #6366f1; flex-shrink: 0; }
.rel-name b { color: #0f172a; }
.badge { font-size: 10.5px; font-weight: 800; letter-spacing: 0.03em; padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
.badge.rolling { background: #eef2ff; color: #4f46e5; }
.badge.promoted { background: #dcfce7; color: #15803d; }
.badge.rolledback { background: #fee2e2; color: #dc2626; }

.stages { display: flex; align-items: center; gap: 4px; }
.stage { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; }
.stage-dot { width: 22px; height: 22px; border-radius: 50%; background: #f1f5f9; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #94a3b8; transition: all 0.25s; z-index: 1; }
.stage.done .stage-dot { background: #6366f1; border-color: #6366f1; color: #fff; }
.stage.active .stage-dot { background: #fff; border-color: #6366f1; color: #6366f1; animation: pulse-ring 1.4s ease-in-out infinite; }
@keyframes pulse-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); } 50% { box-shadow: 0 0 0 5px rgba(99,102,241,0); } }
.stage-line { position: absolute; top: 11px; left: 50%; width: 100%; height: 2px; background: #e2e8f0; z-index: 0; }
.stage:last-child .stage-line { display: none; }
.stage.done .stage-line { background: #6366f1; }
.stage-pct { font-size: 10px; font-weight: 700; color: #94a3b8; }
.stage.done .stage-pct, .stage.active .stage-pct { color: #4f46e5; }

.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 14px 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
.metric { display: flex; flex-direction: column; gap: 3px; align-items: center; }
.m-label { font-size: 10.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
.m-val { font-size: 14px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.m-val.ok { color: #16a34a; }
.m-val.warn { color: #d97706; }
.m-val.bad { color: #dc2626; }

.tile-actions { display: flex; gap: 10px; }
.btn { flex: 1; padding: 9px; border-radius: 10px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: opacity 0.12s, background 0.12s; }
.btn.rollback { background: #fff; border: 1px solid #fecaca; color: #dc2626; }
.btn.rollback:hover { background: #fef2f2; }
.btn.promote { background: #0f172a; border: none; color: #fff; }
.btn.promote:hover { opacity: 0.85; }
.btn:disabled { opacity: 0.45; cursor: default; }`,
  js: `var STAGES = [5, 25, 50, 100];
var stageIndex = 0;
var status = 'rolling'; // rolling | promoted | rolledback

var stagesEl = document.getElementById('stages');
var badgeEl = document.getElementById('statusBadge');
var trafficEl = document.getElementById('trafficPct');
var errEl = document.getElementById('errRate');
var latEl = document.getElementById('latency');
var rollbackBtn = document.getElementById('rollbackBtn');
var promoteBtn = document.getElementById('promoteBtn');

function renderStages() {
  stagesEl.innerHTML = STAGES.map(function (pct, i) {
    var cls = i < stageIndex ? 'done' : i === stageIndex && status === 'rolling' ? 'active' : '';
    return '<div class="stage ' + cls + '">' +
      '<div class="stage-dot">' + (i < stageIndex ? '\\u2713' : (i + 1)) + '<div class="stage-line"></div></div>' +
      '<span class="stage-pct">' + pct + '%</span>' +
    '</div>';
  }).join('');
}

function randomBetween(min, max) { return Math.round((Math.random() * (max - min) + min) * 100) / 100; }

function refreshMetrics() {
  var err = randomBetween(0.02, 0.09);
  var lat = Math.round(randomBetween(105, 135));
  errEl.textContent = err + '%';
  errEl.className = 'm-val ' + (err > 0.08 ? 'bad' : err > 0.05 ? 'warn' : 'ok');
  latEl.textContent = lat + 'ms';
  latEl.className = 'm-val ' + (lat > 130 ? 'bad' : lat > 120 ? 'warn' : 'ok');
  trafficEl.textContent = STAGES[Math.min(stageIndex, STAGES.length - 1)] + '%';
}

function setStatus(next) {
  status = next;
  badgeEl.className = 'badge ' + (next === 'promoted' ? 'promoted' : next === 'rolledback' ? 'rolledback' : 'rolling');
  badgeEl.textContent = next === 'promoted' ? 'Promoted' : next === 'rolledback' ? 'Rolled back' : 'Rolling out';
  rollbackBtn.disabled = next !== 'rolling';
  promoteBtn.disabled = next !== 'rolling';
  if (next !== 'rolling') { promoteBtn.textContent = next === 'promoted' ? 'Promoted to 100%' : 'Rollback complete'; }
}

function advance() {
  if (status !== 'rolling') return;
  if (stageIndex < STAGES.length - 1) {
    stageIndex++;
    renderStages();
    refreshMetrics();
  } else {
    setStatus('promoted');
  }
}

rollbackBtn.addEventListener('click', function () { setStatus('rolledback'); });
promoteBtn.addEventListener('click', function () { stageIndex = STAGES.length - 1; renderStages(); setStatus('promoted'); });

renderStages();
refreshMetrics();
var autoAdvance = setInterval(function () {
  if (status !== 'rolling') { clearInterval(autoAdvance); return; }
  advance();
}, 4000);`,
  seo: {
    title: 'Canary Rollout Progress Tile — Free HTML CSS JS Snippet',
    description: 'A deploy dashboard tile tracking a canary release through staged traffic percentages with live error-rate and latency guardrail metrics, plus promote/rollback controls.',
    about: {
      title: 'Canary Rollout Progress Tile — Staged Traffic, Guardrail Metrics & Promote/Rollback',
      description: `A canary rollout ships a new version to a small slice of traffic first, watches health metrics, then gradually increases that slice — the opposite of an all-at-once deploy. This tile visualizes exactly that: a staged progress track (5% → 25% → 50% → 100% of traffic), live guardrail metrics (error rate and p95 latency) that would justify continuing or aborting, and explicit promote/rollback controls, all wired to one small state machine.

**The stage track models discrete steps, not a continuous bar**

Unlike a generic progress bar, \`STAGES\` is an explicit array of traffic percentages, and \`stageIndex\` is an integer pointing at the current one. \`renderStages()\` marks every stage before \`stageIndex\` as \`.done\` (filled, checkmark), the current one as \`.active\` (pulsing ring animation via a \`box-shadow\` keyframe), and later ones as neutral. This matters because a real canary rollout doesn't move continuously — it holds at each traffic percentage for an observation window before deciding to advance, so a discrete stepped track communicates the actual deployment model more honestly than a smooth 0–100% bar would.

**Guardrail metrics colored independently of rollout status**

\`errEl\` and \`latEl\` get their own \`ok\`/\`warn\`/\`bad\` class based on fixed thresholds (\`refreshMetrics()\`), completely independent of whether the rollout badge currently says "Rolling out" or "Promoted." This separation is intentional — in a real system, these are exactly the numbers an automated canary analysis tool (or an on-call engineer) would watch to decide *whether* to let the rollout advance, so they need to be legible as their own signal rather than folded into a single combined status.

**Promote and rollback as explicit terminal actions**

Clicking "Promote now" jumps \`stageIndex\` straight to the final stage and calls \`setStatus('promoted')\`; clicking "Roll back" calls \`setStatus('rolledback')\` without touching \`stageIndex\` at all — deliberately, since a rollback's whole point is to stop admitting more traffic to the new version, not to pretend the rollout continued. Both actions disable further stage auto-advancement and both buttons, because a canary rollout has exactly one live decision point at a time; once promoted or rolled back, the only next action is starting an entirely new rollout.

**The auto-advance timer as a stand-in for a bake-time scheduler**

\`setInterval(advance, 4000)\` simulates the automatic stage-advancement a real canary pipeline (Argo Rollouts, Flagger, or a custom deployment controller) would run on a bake-time schedule, typically minutes to hours per stage rather than seconds. Swap the interval callback for a webhook or polling call to your actual deployment orchestrator's status API, and the same \`renderStages()\`/\`refreshMetrics()\` functions apply the real state.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it auto-advance', text: 'The tile auto-advances through traffic stages every 4 seconds in the demo — refreshing error rate and latency metrics at each stage.' },
        { title: 'Click Roll back', text: 'Immediately halts the rollout at its current stage and switches the badge to a rolled-back state, disabling further actions.' },
        { title: 'Click Promote now', text: 'Jumps straight to the final 100% stage and marks the release as fully promoted.' },
        { title: 'Edit the STAGES array', text: 'Change the traffic percentages and number of stages to match your own canary pipeline\'s configuration.' },
        { title: 'Adjust guardrail thresholds', text: 'Edit the error-rate and latency cutoffs inside refreshMetrics() to match your service\'s actual SLOs.' },
        { title: 'Connect a real deployment API', text: 'Replace the setInterval simulation with polling or a webhook from your deployment orchestrator (Argo Rollouts, Flagger, or similar) that updates stageIndex and the metric values.' },
      ],
    },
    features: [
      'Discrete staged progress track (not a continuous bar) with checkmarked done stages and a pulsing active stage',
      'Guardrail metrics (error rate, p95 latency) colored ok/warn/bad independent of overall rollout status',
      'Explicit Promote and Rollback actions that both disable further automatic advancement',
      'Rollback preserves the stage the rollout was at when halted, rather than resetting progress',
      'Promote jumps directly to the final stage rather than requiring every intermediate stage to be clicked',
      'Traffic-on-canary percentage always reflects the currently active stage\'s configured value',
      'Auto-advance timer structured as a drop-in replacement point for a real deployment orchestrator poll',
      'Compact single-tile layout suited to a grid of other release/ops dashboard widgets',
    ],
    useCases: [
      { icon: 'OPS', title: 'Internal deploy/release dashboards', desc: 'Give an on-call or release engineer a live view of an in-flight canary rollout without leaving the ops dashboard for the deployment tool\'s own UI.' },
      { icon: 'FLOW', title: 'CI/CD pipeline status pages', desc: 'Surface canary rollout stage and guardrail health as one tile among several pipeline-stage widgets on a build/deploy status page.' },
      { icon: 'ALERT', title: 'On-call incident response tooling', desc: 'Let an on-call engineer roll back a suspicious release directly from the same dashboard used to notice a metric regression.' },
      { icon: 'CHART', title: 'Progressive delivery platform UIs', desc: 'Adapt as the core widget for a progressive-delivery tool (in the spirit of Argo Rollouts or Flagger) showing live canary analysis status.' },
      { icon: 'CODE', title: 'Related: Deployment Pipeline Stage Tracker', desc: 'See the [Deployment Pipeline Stage Tracker](/ui-snippets/deployment-pipeline-stage-tracker/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a generic progress bar?', a: 'The stage track is a fixed set of discrete traffic-percentage steps (STAGES), not a continuously animating fill. Each stage renders as its own dot marked done, active, or pending, because a real canary rollout holds at each percentage for an observation window rather than moving smoothly — a stepped track communicates that model more accurately.' },
      { q: 'Why do the guardrail metrics use their own color thresholds separate from the badge?', a: 'errEl and latEl are colored ok/warn/bad from fixed numeric thresholds inside refreshMetrics(), entirely independent of the rolling/promoted/rolledback badge state. This mirrors how a real canary analysis works: the metrics are the signal used to decide whether to let the rollout continue, so they need to be readable on their own rather than folded into the overall status.' },
      { q: 'What happens to stageIndex when I click Roll back?', a: 'Nothing — rollback intentionally leaves stageIndex untouched, since the point of a rollback is to stop the rollout at whatever traffic percentage it had reached, not to pretend progress continued. Only the status and badge change, and both buttons become disabled.' },
      { q: 'Does Promote now go through every intermediate stage?', a: 'No — it sets stageIndex directly to the last entry in STAGES and calls setStatus("promoted") immediately, modeling a manual "just ship it to 100%" override rather than requiring the auto-advance timer to step through every stage first.' },
      { q: 'How do I connect this to a real deployment tool?', a: 'Replace the setInterval(advance, 4000) simulation with a polling call (or webhook handler) against your deployment orchestrator\'s status API, updating stageIndex and calling refreshMetrics() with real error-rate and latency values whenever the orchestrator reports a stage change.' },
      { q: 'Can I add more or fewer rollout stages?', a: 'Yes — STAGES is a plain array of traffic percentages; add, remove, or change entries and the stage track, traffic-on-canary readout, and stage count all adjust automatically since everything derives from STAGES.length and STAGES[stageIndex].' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why rollback leaves stageIndex unchanged while promote jumps it straight to the last stage, and what that distinction is meant to communicate about how a real canary rollout's state should be represented. The same assistant can help optimize it — for instance asking whether the guardrail metric thresholds should be configurable per-service rather than hardcoded constants, or whether an automated rollback should trigger itself once error rate crosses the bad threshold rather than requiring a manual click. It's also useful for extending the tile: ask it to add an automatic-rollback-on-breach behavior, a bake-time countdown per stage, or a small sparkline of the error-rate trend across the whole rollout. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canary rollout progress" dashboard tile in HTML, CSS, and vanilla JavaScript — no charting library.

Requirements:
- Model the rollout as a fixed array of discrete traffic-percentage stages (for example 5%, 25%, 50%, 100%) and a single current-stage index — render each stage as a dot in a horizontal track, visually distinguishing stages already passed (filled, with a checkmark), the currently active stage (a distinct pulsing highlight), and stages not yet reached.
- Show at least two live guardrail metrics (for example error rate and p95 latency) that update on every stage advance, each independently colored across at least three states (healthy, warning, critical) based on numeric thresholds — this coloring must be completely independent of the rollout's own promoted/rolled-back/rolling status.
- Provide a "Promote now" button that jumps the current-stage index directly to the final stage and marks the rollout as fully promoted, and a separate "Roll back" button that halts the rollout immediately at whatever stage it is currently on (without resetting or changing the stage index) and marks it as rolled back.
- Once either promote or rollback has been triggered, disable both action buttons and stop any further automatic stage advancement.
- Simulate automatic progression through the stages with a repeating timer (representing a bake-time wait between stages in a real system) that only advances while the rollout is still in its default "rolling out" state, refreshing the guardrail metrics with newly randomized-but-plausible values at each stage change.`,
    },
  },
};

export default canaryRolloutProgressTile;
