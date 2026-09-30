const bootstrapDeploymentStatusPanel = {
  id: 'bootstrap-deployment-status-panel',
  title: 'Bootstrap Deployment Status Panel',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdeploy-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0">Deploy #482</h6>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsdeployRestart">Restart demo</button>
      </div>
      <div class="bsdeploy-stages" id="bsdeployStages"></div>
      <p class="small mt-3 mb-0" id="bsdeployStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bsdeploy-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsdeploy-stages { display: flex; flex-direction: column; gap: 4px; }
.bsdeploy-stage { display: flex; align-items: center; gap: 10px; padding: 8px 6px; border-radius: 8px; }
.bsdeploy-dot {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font: 700 11px sans-serif;
  background: #eceef3; color: #9ca3af;
}
.bsdeploy-stage-done .bsdeploy-dot { background: #198754; color: #fff; }
.bsdeploy-stage-active .bsdeploy-dot { background: #f5a623; color: #fff; animation: bsdeploy-pulse 1s ease-in-out infinite; }
.bsdeploy-stage-failed .bsdeploy-dot { background: #dc3545; color: #fff; }
@keyframes bsdeploy-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
.bsdeploy-name { font-size: 13px; font-weight: 600; }
.bsdeploy-stage-pending .bsdeploy-name { color: #9ca3af; font-weight: 500; }`,
  js: `const STAGES = ['Build', 'Test', 'Staging', 'Production'];
// This attempt is scripted to fail at Staging so the failure/retry path is
// always reachable in this preview; a real pipeline's outcome per stage
// would come from actual CI/CD job results instead.
const FAIL_AT = 2;

const container = document.getElementById('bsdeployStages');
const status = document.getElementById('bsdeployStatus');
let stageStatus = STAGES.map(() => 'pending');
let timer = null;

function render() {
  container.innerHTML = STAGES.map((name, i) => {
    const st = stageStatus[i];
    const icon = st === 'done' ? '\\u2713' : st === 'failed' ? '\\u2715' : String(i + 1);
    return '<div class="bsdeploy-stage bsdeploy-stage-' + st + '">' +
      '<div class="bsdeploy-dot">' + icon + '</div>' +
      '<div class="bsdeploy-name">' + name + '</div>' +
    '</div>';
  }).join('');
}

function run(attempt) {
  clearInterval(timer);
  stageStatus = STAGES.map(() => 'pending');
  render();
  status.textContent = 'Deploying...';
  status.className = 'small mt-3 mb-0 text-muted';

  let i = 0;
  stageStatus[0] = 'active';
  render();

  timer = setInterval(() => {
    const failing = i === FAIL_AT && attempt === 1;
    stageStatus[i] = failing ? 'failed' : 'done';

    if (failing) {
      clearInterval(timer);
      render();
      status.innerHTML = STAGES[i] + ' failed. <button type="button" class="btn btn-sm btn-link p-0" id="bsdeployRetry">Retry deploy</button>';
      status.className = 'small mt-3 mb-0 text-danger fw-semibold';
      document.getElementById('bsdeployRetry').addEventListener('click', () => run(attempt + 1));
      return;
    }

    i++;
    if (i >= STAGES.length) {
      clearInterval(timer);
      render();
      status.textContent = 'Deployed to Production.';
      status.className = 'small mt-3 mb-0 text-success fw-semibold';
      return;
    }

    stageStatus[i] = 'active';
    render();
  }, 900);
}

document.getElementById('bsdeployRestart').addEventListener('click', () => run(1));
run(1);`,

  seo: {
    title: 'Bootstrap Deployment Status Panel — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 CI/CD pipeline status panel — Build, Test, Staging, Production stages animate through in order, with a genuine failure and Retry path, not just a happy-path progress bar.',
    about: {
      title: 'Bootstrap Deployment Status Panel — HTML, CSS & JavaScript',
      description: `Every stage's status lives in one \`stageStatus\` array, one entry per pipeline stage, each holding \`'pending'\`, \`'active'\`, \`'done'\`, or \`'failed'\` — \`render()\` is the single function mapping that array to markup, so the dots, colors, and checkmarks/x-marks are always a direct reflection of the array's current contents rather than separately toggled classes that could drift.\n\nThis demo scripts the first attempt to fail specifically at the Staging stage (\`FAIL_AT\`, checked against \`attempt === 1\`) so the failure state and its Retry action are actually reachable without needing a lucky outcome, matching the same guaranteed-first-failure technique used in [bootstrap-data-table-error-state](/ui-snippets/bootstrap-data-table-error-state/). Retry calls \`run(attempt + 1)\`, the exact same function the initial deploy uses, which is what resets every stage back to pending and replays the whole pipeline from Build — a real CI/CD retry rarely resumes from the exact point of failure, it restarts the pipeline.\n\nOnly one stage is ever \`'active'\` at a time, and stages complete strictly in order — the interval driving the pipeline only advances to the next stage's index after marking the current one \`'done'\`, so there's no way for, say, Staging to show as active while Test still shows pending.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The pipeline starts automatically — Build shows an animated, pulsing amber dot as the active stage.' },
        { title: 'Watch it progress', text: 'Build and Test complete in order, each turning to a solid green checkmark before the next stage activates.' },
        { title: 'Watch it fail at Staging', text: 'The Staging dot turns red with an X, and the status line offers a "Retry deploy" action.' },
        { title: 'Click "Retry deploy"', text: 'Every stage resets to pending and the whole pipeline replays from Build — this time completing successfully all the way through Production.' },
        { title: 'Click "Restart demo"', text: 'The pipeline runs again from the very first attempt, failing at Staging exactly as before.' },
      ],
    },
    features: [
      'One stageStatus array is the single source of truth for every stage\'s dot, color, and icon',
      'The first attempt is guaranteed to fail at a specific stage, so the failure and retry path is always visible',
      'Retry restarts the entire pipeline from the first stage, matching real CI/CD retry behavior',
      'Only one stage is ever shown as actively running, and stages always progress strictly in order',
      'A pulsing animation clearly distinguishes the currently active stage from completed or pending ones',
    ],
    useCases: [
      { icon: 'DEV', title: 'Internal deployment dashboards and CI/CD tooling', desc: 'Pairs with [bootstrap-feature-flag-toggle-panel](/ui-snippets/bootstrap-feature-flag-toggle-panel/) for a fuller release-management admin view.' },
      { icon: 'APP', title: 'Status pages showing a release rolling out', desc: 'Give visibility into exactly which stage a deploy is currently in, not just a single spinner.' },
      { icon: 'DASH', title: 'Team dashboards embedded in Slack or an internal wiki', desc: 'A compact visual summary of pipeline health worth glancing at without opening the full CI system.' },
    ],
    faqs: [
      { q: 'Why does the first attempt always fail?', a: 'So the failure state and Retry button are guaranteed to be visible in this preview, rather than depending on chance; a real implementation should reflect each stage\'s actual CI/CD job outcome instead of a scripted failure.' },
      { q: 'Does Retry resume from the failed stage, or restart everything?', a: 'It restarts the entire pipeline from Build — this mirrors how most real CI/CD systems handle a retry, since a failed stage often means the environment or artifacts from earlier stages may also need to be regenerated.' },
      { q: 'Can more than one stage be active at once?', a: 'No — the interval driving the pipeline only ever marks the next stage active after the current one finishes, so exactly one stage (or zero, once the pipeline finishes or fails) is ever in the active state at a time.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep stageStatus as an array in component state, update it via your framework\'s state-setting pattern on each interval tick, and derive each stage\'s dot color/icon from its current value in the render function.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a per-stage elapsed-time display that keeps counting up while a stage is active, or to add a "View logs" link per stage that opens a modal showing simulated build/test output for that specific stage.`,
      prompt: `Build a Bootstrap 5.3 CI/CD deployment status panel, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A vertical list of at least 4 pipeline stages (e.g. Build, Test, Staging, Production), each with a status dot that can show pending, actively running (with a pulsing animation), done (checkmark), or failed (X mark) — all four states driven from one status array, not separately toggled classes.
- Stages must progress strictly in order on a timer, only one ever shown as actively running at a time, each completing before the next one activates.
- The first deployment attempt must be scripted to fail at a specific stage (not the last one), revealing a "Retry deploy" action in a status message below the pipeline.
- Clicking Retry must restart the entire pipeline from the very first stage (not resume from the point of failure), and this time complete successfully through every remaining stage.
- Include a "Restart demo" button that resets the whole scenario back to its initial failing-first-attempt state.`,
    },
  },
};

export default bootstrapDeploymentStatusPanel;
