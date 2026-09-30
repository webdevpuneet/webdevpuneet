const bootstrapFeatureFlagTogglePanel = {
  id: 'bootstrap-feature-flag-toggle-panel',
  title: 'Bootstrap Feature Flag Toggle Panel',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsflag-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Feature flags</h6>
      <ul class="list-unstyled mb-0" id="bsflagList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsflag-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsflag-row { padding: 10px 0; border-bottom: 1px solid #f1f2f5; }
.bsflag-row:last-child { border-bottom: none; }
.bsflag-top { display: flex; justify-content: space-between; align-items: center; }
.bsflag-name { font-size: 13.5px; font-weight: 600; }
.bsflag-desc { font-size: 11.5px; color: #9ca3af; }
.bsflag-rollout { margin-top: 6px; }
.bsflag-rollout.d-none { display: none; }`,
  js: `const FLAGS = [
  { id: 'new-nav', name: 'New navigation', desc: 'Redesigned top nav with mega menu', on: true, rollout: 100 },
  { id: 'ai-summary', name: 'AI summaries', desc: 'Auto-generated summaries on reports', on: true, rollout: 25 },
  { id: 'dark-mode', name: 'Dark mode', desc: 'System-aware dark theme', on: false, rollout: 0 },
  { id: 'bulk-export', name: 'Bulk export', desc: 'Export more than 500 rows at once', on: false, rollout: 0 },
];

const list = document.getElementById('bsflagList');
let flags = FLAGS.map(f => ({ ...f }));

function render() {
  list.innerHTML = flags.map(f =>
    '<li class="bsflag-row" data-id="' + f.id + '">' +
      '<div class="bsflag-top">' +
        '<div><div class="bsflag-name">' + f.name + '</div><div class="bsflag-desc">' + f.desc + '</div></div>' +
        '<div class="form-check form-switch mb-0">' +
          '<input class="form-check-input bsflag-toggle" type="checkbox" role="switch" data-id="' + f.id + '"' + (f.on ? ' checked' : '') + '>' +
        '</div>' +
      '</div>' +
      '<div class="bsflag-rollout' + (f.on ? '' : ' d-none') + '">' +
        '<div class="d-flex justify-content-between small text-muted mb-1">' +
          '<span>Rollout</span><span>' + f.rollout + '%</span>' +
        '</div>' +
        '<input type="range" class="form-range bsflag-slider" min="0" max="100" value="' + f.rollout + '" data-id="' + f.id + '">' +
      '</div>' +
    '</li>'
  ).join('');
}

list.addEventListener('change', e => {
  if (!e.target.classList.contains('bsflag-toggle')) return;
  const flag = flags.find(f => f.id === e.target.dataset.id);
  flag.on = e.target.checked;
  // Turning a flag off resets its rollout to 0 rather than leaving a stale
  // percentage that would be misleading the next time it's switched back on.
  if (!flag.on) flag.rollout = 0;
  else if (flag.rollout === 0) flag.rollout = 100;
  render();
});

list.addEventListener('input', e => {
  if (!e.target.classList.contains('bsflag-slider')) return;
  const flag = flags.find(f => f.id === e.target.dataset.id);
  flag.rollout = Number(e.target.value);
  const label = e.target.closest('.bsflag-rollout').querySelector('span:last-child');
  label.textContent = flag.rollout + '%';
});

render();`,

  seo: {
    title: 'Bootstrap Feature Flag Toggle Panel — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 feature-flag admin panel — each flag has its own on/off switch plus a percentage rollout slider that appears only while enabled, and resets cleanly on disable.',
    about: {
      title: 'Bootstrap Feature Flag Toggle Panel — HTML, CSS & JavaScript',
      description: `Each flag is a small object carrying both an \`on\` boolean and a \`rollout\` percentage, and the two are kept honest with respect to each other rather than tracked independently — switching a flag off sets \`rollout = 0\`, since a disabled flag showing a stale "25%" the next time someone glances at it would misrepresent what's actually happening in production. Switching a flag back on from a zeroed rollout jumps it to 100%, on the assumption that re-enabling a flag most often means "turn it back on for everyone," not "quietly resume some old partial rollout."\n\nThe rollout slider only renders at all while its flag is on — \`d-none\` toggles alongside the switch's own checked state — so there's no way to see (or accidentally drag) a rollout percentage for a flag that's currently off, which would be a meaningless value to display or edit in the first place.\n\nThe switch and the slider are handled by two separate, narrowly-scoped listeners on the same list — one listening for \`change\` events matching \`.bsflag-toggle\`, the other for \`input\` events matching \`.bsflag-slider\` — using event delegation on the parent \`<ul>\` rather than attaching a listener to every individual row, so newly rendered rows are automatically covered without re-binding anything after every \`render()\` call.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Four flags show, two enabled with visible rollout sliders and two disabled with no slider showing.' },
        { title: 'Drag the "AI summaries" rollout slider', text: 'The percentage label updates live as you drag, without needing to release first.' },
        { title: 'Turn off "New navigation"', text: 'Its rollout slider disappears entirely, and its rollout resets to 0% internally.' },
        { title: 'Turn "New navigation" back on', text: 'It jumps straight to 100% rollout rather than an ambiguous or stale prior value.' },
        { title: 'Turn on "Dark mode"', text: 'Its rollout slider appears fresh, ready to be adjusted from 100%.' },
      ],
    },
    features: [
      'Each flag pairs an on/off state with a rollout percentage, kept consistent with each other automatically',
      'The rollout slider only exists in the DOM while its flag is actually enabled',
      'Disabling a flag resets its rollout instead of leaving a stale, misleading percentage behind',
      'Re-enabling a flag defaults to a full 100% rollout rather than an ambiguous leftover value',
      'Two narrowly-scoped delegated listeners (change and input) handle every row without per-row re-binding',
    ],
    useCases: [
      { icon: 'DEV', title: 'Internal admin tools for engineering and product teams', desc: 'A realistic feature-flag management panel, the kind of tool sitting behind most gradual-rollout systems.' },
      { icon: 'DASH', title: 'Internal dashboards controlling gradual feature rollouts', desc: 'Pairs with [bootstrap-deployment-status-panel](/ui-snippets/bootstrap-deployment-status-panel/) for a fuller release-management view.' },
      { icon: 'APP', title: 'A/B testing and experiment control panels', desc: 'The same toggle-plus-percentage pattern applies directly to controlling experiment traffic allocation.' },
    ],
    faqs: [
      { q: 'Why does disabling a flag reset its rollout percentage?', a: 'A disabled flag with a leftover "25%" showing (even if hidden from view) would misrepresent the flag\'s actual state the next time someone re-enables it and expects a fresh decision, not a silently resumed old value.' },
      { q: 'Why does re-enabling default to 100% instead of restoring the last value?', a: 'This demo treats re-enabling as a deliberate "turn it back on" decision defaulting to full rollout; a real system might instead ask explicitly, or genuinely remember the last rollout value if that behavior is preferred — both are reasonable, differing product decisions.' },
      { q: 'Does the slider update live while dragging, or only after release?', a: 'Live — it listens for the "input" event, which fires continuously while dragging, rather than "change", which only fires once the drag ends.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the flags array in component state, update the relevant flag\'s on/rollout fields immutably on toggle or slider change, and conditionally render the rollout slider based on that flag\'s on value.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a per-flag "target audience" selector (e.g. internal users only, beta users, everyone) alongside the rollout percentage, or to add an audit trail showing who last changed each flag and when.`,
      prompt: `Build a Bootstrap 5.3 feature flag toggle panel, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 4 feature flags, each with a name, description, an on/off switch (Bootstrap's real form-switch), and a rollout percentage slider.
- The rollout slider for a given flag must only be visible while that flag is enabled — it should disappear entirely the instant the flag is turned off, not just disable itself.
- Turning a flag off must reset its stored rollout percentage to 0. Turning a flag back on from a zero rollout must default it to 100%, not leave a misleading stale value.
- The rollout percentage label must update live while dragging the slider, not only after release.
- Use event delegation on the list container to handle both the switches and the sliders, rather than attaching individual listeners to each row.`,
    },
  },
};

export default bootstrapFeatureFlagTogglePanel;
