const featureFlagTogglePanel = {
  id: 'feature-flag-toggle-panel',
  title: 'Feature Flag Toggle Panel',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="fft-panel">
  <div class="fft-head">
    <h3>Feature flags</h3>
    <span class="fft-count">4 flags</span>
  </div>

  <div class="fft-col-labels" aria-hidden="true">
    <span></span>
    <span>Dev</span>
    <span>Staging</span>
    <span>Prod</span>
  </div>

  <ul class="fft-list">
    <li class="fft-row">
      <div class="fft-info">
        <span class="fft-name">new-checkout-flow</span>
        <span class="fft-desc">Redesigned single-page checkout with saved payment methods.</span>
      </div>
      <label class="fft-switch"><input type="checkbox" checked data-env="dev" data-flag="checkout"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" checked data-env="staging" data-flag="checkout"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" data-env="prod" data-flag="checkout"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
    </li>

    <li class="fft-row">
      <div class="fft-info">
        <span class="fft-name">ai-search-suggestions</span>
        <span class="fft-desc">Inline AI-generated query suggestions in the search bar.</span>
      </div>
      <label class="fft-switch"><input type="checkbox" checked data-env="dev" data-flag="search"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" data-env="staging" data-flag="search"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" data-env="prod" data-flag="search"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
    </li>

    <li class="fft-row">
      <div class="fft-info">
        <span class="fft-name">dark-mode-default</span>
        <span class="fft-desc">Use dark theme as the default for new sign-ups.</span>
      </div>
      <label class="fft-switch"><input type="checkbox" checked data-env="dev" data-flag="dark"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" checked data-env="staging" data-flag="dark"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" checked data-env="prod" data-flag="dark"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
    </li>

    <li class="fft-row rollout-row">
      <div class="fft-info">
        <span class="fft-name">gradual-pricing-page-v2</span>
        <span class="fft-desc">New pricing page layout, rolling out gradually in production.</span>
      </div>
      <label class="fft-switch"><input type="checkbox" checked data-env="dev" data-flag="pricing"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" checked data-env="staging" data-flag="pricing"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
      <label class="fft-switch"><input type="checkbox" checked data-env="prod" data-flag="pricing"><span class="fft-switch-track"><span class="fft-switch-thumb"></span></span></label>
    </li>
  </ul>

  <div class="fft-rollout">
    <div class="fft-rollout-head">
      <span>Production rollout &middot; <b>gradual-pricing-page-v2</b></span>
      <span class="fft-rollout-pct" id="fftRolloutPct">35%</span>
    </div>
    <input type="range" id="fftRolloutSlider" min="0" max="100" step="5" value="35" aria-label="Production rollout percentage">
    <div class="fft-rollout-bar" aria-hidden="true"><div class="fft-rollout-fill" id="fftRolloutFill" style="width:35%"></div></div>
    <p class="fft-rollout-note" id="fftRolloutNote">Roughly 35 of every 100 production users see this flag enabled.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.fft-panel{width:100%;max-width:600px;background:#151b23;border:1px solid #262e3a;border-radius:16px;padding:22px;box-shadow:0 24px 60px rgba(0,0,0,.4)}

.fft-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.fft-head h3{font-size:16px;font-weight:800;color:#e7ebf3}
.fft-count{font-size:12px;color:#7c869c;background:#1c2430;padding:4px 10px;border-radius:999px;font-weight:600}

.fft-col-labels{display:grid;grid-template-columns:1fr 56px 64px 56px;gap:10px;padding:0 4px 8px;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#5b6577;text-align:center}
.fft-col-labels span:first-child{text-align:left}

.fft-list{list-style:none;display:flex;flex-direction:column;gap:2px;margin-bottom:18px}
.fft-row{display:grid;grid-template-columns:1fr 56px 64px 56px;gap:10px;align-items:center;padding:11px 4px;border-radius:10px;border-bottom:1px solid #1c2430}
.fft-row:hover{background:#191f29}
.fft-row:last-child{border-bottom:none}
.fft-row.just-changed{background:rgba(125,211,252,.09);transition:background .5s ease}

.fft-info{display:flex;flex-direction:column;gap:2px;min-width:0}
.fft-name{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:12.5px;font-weight:700;color:#e7ebf3}
.fft-desc{font-size:11.5px;color:#7c869c;line-height:1.35}

.fft-switch{position:relative;display:flex;justify-content:center;cursor:pointer}
.fft-switch input{position:absolute;opacity:0;width:0;height:0}
.fft-switch-track{width:34px;height:20px;border-radius:999px;background:#2a3140;position:relative;transition:background .18s;flex-shrink:0}
.fft-switch-thumb{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#8b95ab;transition:transform .18s,background .18s}
.fft-switch input:checked + .fft-switch-track{background:rgba(74,222,128,.25)}
.fft-switch input:checked + .fft-switch-track .fft-switch-thumb{transform:translateX(14px);background:#4ade80}
.fft-switch input:focus-visible + .fft-switch-track{box-shadow:0 0 0 3px rgba(124,155,255,.35)}

.fft-rollout{background:#0f141c;border:1px solid #232b38;border-radius:12px;padding:14px 16px}
.fft-rollout-head{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#9aa4bb;margin-bottom:10px}
.fft-rollout-head b{color:#e7ebf3;font-family:'SFMono-Regular',Consolas,Menlo,monospace}
.fft-rollout-pct{font-size:14px;font-weight:800;color:#7dd3fc;font-variant-numeric:tabular-nums}
.fft-rollout-slider,#fftRolloutSlider{width:100%;accent-color:#7dd3fc;margin-bottom:10px}
.fft-rollout-bar{width:100%;height:6px;border-radius:999px;background:#1c2430;overflow:hidden;margin-bottom:10px}
.fft-rollout-fill{height:100%;background:linear-gradient(90deg,#38bdf8,#7dd3fc);border-radius:999px;transition:width .12s}
.fft-rollout-note{font-size:11.5px;color:#7c869c}`,

  js: `var rolloutSlider = document.getElementById('fftRolloutSlider');
var rolloutPct = document.getElementById('fftRolloutPct');
var rolloutFill = document.getElementById('fftRolloutFill');
var rolloutNote = document.getElementById('fftRolloutNote');

function syncRollout() {
  var val = rolloutSlider.value;
  rolloutPct.textContent = val + '%';
  rolloutFill.style.width = val + '%';
  rolloutNote.textContent = 'Roughly ' + val + ' of every 100 production users see this flag enabled.';
}

rolloutSlider.addEventListener('input', syncRollout);

var switches = Array.prototype.slice.call(document.querySelectorAll('.fft-switch input'));
switches.forEach(function (input) {
  input.addEventListener('change', function () {
    // In a real app this would PATCH the flag's per-environment state to your
    // flag service, e.g. fetch('/api/flags/' + input.dataset.flag, { method: 'PATCH',
    //   body: JSON.stringify({ env: input.dataset.env, enabled: input.checked }) })
    var row = input.closest('.fft-row');
    row.classList.add('just-changed');
    setTimeout(function () { row.classList.remove('just-changed'); }, 500);
  });
});

syncRollout();`,

  seo: {
    title: 'Feature Flag Toggle Panel — Free Admin Flags UI with Rollout Slider',
    description: `An admin feature-flag panel with per-environment toggle switches and a gradual production rollout slider. Pure HTML, CSS & JS — no dependency.`,
    about: {
      title: 'Feature Flag Toggle Panel — Per-Environment Switches Plus a Rollout Slider',
      description: `Feature flag admin panels share one recurring shape: a list of flags, each with independent on/off state per environment, and occasionally a percentage-based gradual rollout for production. This snippet builds that panel — dev/staging/prod toggle columns per flag row, plus a rollout slider with a live percentage readout — with no dependency, a natural companion to a [permission matrix](/ui-snippets/permission-matrix/) or [settings panel](/ui-snippets/settings-panel/) in an internal admin tool.

**A grid, not a table, for alignment**

Each flag row and the header labels above them share the exact same CSS Grid column template (\`1fr 56px 64px 56px\`), so the Dev/Staging/Prod switches always line up vertically under their labels regardless of how long a flag's name or description runs. This is a simpler and more robust alternative to an actual \`<table>\` when the content in each "column" is a fixed-width control rather than variable-width text.

**Real checkboxes under every switch**

Each toggle is a native \`<input type="checkbox">\` visually hidden and paired with a styled sibling track and thumb — the same accessible-switch technique as this library's [radio card group](/ui-snippets/radio-card-group/), applied to checkboxes instead of radios. \`:checked\`-driven CSS handles all the visual state, and \`:focus-visible\` adds a keyboard focus ring, so every switch is fully operable and announced correctly without any custom ARIA role juggling.

**Independent per-environment state**

Each \`<input>\` carries \`data-flag\` and \`data-env\` attributes identifying which flag and which environment it controls — so flipping the Dev switch for one flag never touches its Staging or Prod state. This mirrors how real flag services (LaunchDarkly, Split, a homegrown flag table) key state by the \`(flag, environment)\` pair rather than one boolean per flag.

**The rollout slider models a real gradual release**

One flag ("gradual-pricing-page-v2") is already fully enabled in every environment, but production also carries a percentage rollout — the slider, its live percentage label, its progress bar fill, and its explanatory note all update from a single \`input\` event handler, so they can never show conflicting numbers. This models the common pattern where "enabled in prod" and "what percent of prod traffic sees it" are two separate, composable dimensions of a flag's state.

**Connecting to a real flag service**

Each switch's \`change\` handler is where you'd \`PATCH\` your flag service with \`{ flag, env, enabled }\` — the comment in the JS shows the shape. For the rollout slider, debounce the \`input\` handler before firing the network request (dragging fires many events per second), and only persist on release (a \`change\` event) if you want to avoid spamming your API during the drag itself.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Four flag rows render with independent Dev/Staging/Prod toggle switches.` },
      { title: 'Flip a switch', text: `Each toggle only affects its own flag and environment — others are unaffected.` },
      { title: 'Drag the rollout slider', text: `The percentage label, bar fill, and explanatory note update together for the featured flag.` },
      { title: 'Add more flags', text: `Copy a .fft-row block and give its inputs unique data-flag values.` },
      { title: 'Wire real persistence', text: `Replace the change handler's comment with an actual PATCH request to your flag service.` },
      { title: 'Debounce the rollout writes', text: `Fire the slider's persistence call on change (release) rather than every input event.` },
    ] },
    features: [
      { title: 'Grid-aligned columns', text: `Flag rows and header labels share one CSS Grid template for perfect alignment.` },
      { title: 'Accessible switch pattern', text: `Real checkboxes styled as switches, with :checked and :focus-visible handling all state.` },
      { title: 'Per-(flag, env) state', text: `Each input is independently addressed by data-flag and data-env attributes.` },
      { title: 'Live rollout readout', text: `Percentage label, bar fill, and note all derive from one slider value.` },
      { title: 'Row change feedback', text: `A brief highlight confirms a toggle registered, without a full re-render.` },
      { title: 'Monospaced flag keys', text: `Flag names render in a code font, matching how they'd appear in actual code.` },
      { title: 'Zero dependencies', text: `No table library, no toggle library — every control is plain HTML and CSS.` },
      { title: 'Comment-documented API hook', text: `The exact PATCH shape for real persistence is noted inline in the JS.` },
    ],
    useCases: [
      { title: 'Internal admin dashboards', text: `Manage flags across environments alongside a [permission matrix](/ui-snippets/permission-matrix/).` },
      { title: 'Gradual feature rollouts', text: `Ramp a risky change from 0% to 100% of production traffic with live feedback.` },
      { title: 'Engineering settings panels', text: `Pair with a [settings panel](/ui-snippets/settings-panel/) for a full ops configuration screen.` },
      { title: 'QA and staging control', text: `Let QA enable in-progress features in staging without touching production.` },
      { title: 'Incident response tooling', text: `Quickly disable a flag in production during an incident.` },
      { title: 'Developer self-service portals', text: `Let engineers toggle their own team's flags in dev without filing a ticket.` },
      { icon: 'CODE', title: 'Related: Idle Detection Badge', desc: 'See the [Idle Detection Badge](/ui-snippets/idle-detection-badge/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the Dev, Staging, and Prod columns stay aligned across rows?', a: `The header label row and every flag row use the identical CSS Grid template (grid-template-columns: 1fr 56px 64px 56px). Because every row's grid tracks are the same fixed widths, the switches always land in the same horizontal position regardless of how long each flag's name or description text runs.` },
      { q: 'Why use checkboxes instead of custom div-based toggles?', a: `Each switch is built on a real, visually-hidden input type="checkbox" with a styled sibling track and thumb driven by the :checked CSS pseudo-class. This gives native keyboard operability (Space to toggle, Tab to move between switches), correct screen-reader announcement as a checkbox, and a :focus-visible ring for keyboard users — all without writing custom key handlers or ARIA state management.` },
      { q: 'How does toggling one environment avoid affecting the others for the same flag?', a: `Every checkbox input carries its own data-flag and data-env attributes, and each switch's change handler only reads and acts on that single input's dataset. State is keyed by the (flag, environment) pair rather than one shared boolean per flag, matching how real flag services store per-environment overrides.` },
      { q: 'How do I persist a toggle change or a rollout percentage to a real backend?', a: `In each switch's change handler, send a PATCH request shaped like { flag: input.dataset.flag, env: input.dataset.env, enabled: input.checked } to your flag service's API. For the rollout slider, avoid firing a request on every input event during the drag — either debounce the input handler or persist only on the slider's change event, which fires once when the user releases it.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Model flag state as an object keyed by flag id, each holding per-environment booleans and (where relevant) a rollout percentage. Render each switch's checked state and the rollout slider's value from that object, and update it via setState/reactive assignment inside the change handlers before (or alongside) an async call to persist the change to your backend.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the accessible-switch pattern or the per-environment state modeling on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the visually-hidden checkbox plus styled sibling technique gives each toggle full keyboard and screen-reader support without any custom ARIA, and why keying state by both data-flag and data-env (rather than one boolean per flag) matches how real flag services model per-environment overrides. The same assistant can help optimize it — asking whether the rollout slider's input handler should be debounced before it fires a real network request, or whether the row-highlight-on-change feedback would benefit from being tied to the actual PATCH response instead of firing optimistically. It's also useful for extending the panel: ask it to add a flag-level "kill switch" that force-disables all environments at once, add an audit-log column showing who last changed each toggle, or add search/filter across a much longer flag list. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "feature flag toggle panel" in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A list of feature flags, each row showing the flag's name (in a monospace font), a short description, and three independent toggle switches for Dev, Staging, and Prod environments — the header and every row must share one identical CSS Grid column template so the three environment columns stay vertically aligned regardless of description text length.
- Every toggle switch must be built on a real, visually-hidden native checkbox input (not a div with a click handler) paired with a styled sibling track-and-thumb element whose appearance is driven entirely by the :checked CSS pseudo-class, plus a distinct :focus-visible style for keyboard focus — so switches remain fully keyboard-operable and correctly announced by screen readers.
- Each checkbox input must carry data attributes identifying both which flag and which environment it controls, and toggling one environment's switch for a flag must never affect that same flag's state in a different environment — state must be addressed by the (flag, environment) pair, not a single shared boolean per flag.
- One flag must additionally show a "gradual rollout" control for its production environment: a range slider from 0 to 100 whose live percentage value simultaneously updates a percentage label, a progress-bar-style fill, and an explanatory sentence (e.g. "Roughly N of every 100 production users see this flag enabled") — all three must derive from the exact same slider value in one input event handler so they can never disagree with each other.
- Add a brief visual confirmation (e.g. a momentary background highlight) on a row when one of its switches changes, and leave an inline comment showing the shape of a real PATCH request (flag id, environment, enabled boolean) that a production implementation would send to persist the change.`,
    },
  },
};

export default featureFlagTogglePanel;
