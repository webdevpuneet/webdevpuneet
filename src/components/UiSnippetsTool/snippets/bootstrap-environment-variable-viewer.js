const bootstrapEnvironmentVariableViewer = {
  id: 'bootstrap-environment-variable-viewer',
  title: 'Bootstrap Environment Variable Viewer',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsenv-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0">Environment variables</h6>
        <span class="badge text-bg-secondary">production</span>
      </div>
      <ul class="list-unstyled mb-0" id="bsenvList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsenv-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsenv-row { padding: 7px 0; border-bottom: 1px solid #f1f2f5; }
.bsenv-row:last-child { border-bottom: none; }
.bsenv-key { font: 700 12px ui-monospace, Menlo, Consolas, monospace; color: #374151; }
.bsenv-line { display: flex; align-items: center; gap: 8px; }
.bsenv-value { font: 12px ui-monospace, Menlo, Consolas, monospace; color: #6b7280; flex-grow: 1; word-break: break-all; }
.bsenv-toggle, .bsenv-copy { border: none; background: none; color: #9ca3af; cursor: pointer; font-size: 11px; flex-shrink: 0; }
.bsenv-toggle:hover, .bsenv-copy:hover { color: #6366f1; }`,
  js: `const VARS = [
  { key: 'NODE_ENV', value: 'production', secret: false },
  { key: 'DATABASE_URL', value: 'postgres://admin:S9xk2Lm4@db.internal:5432/app', secret: true },
  { key: 'STRIPE_SECRET_KEY', value: 'sk_live_51H8x2FaK3n0tR3alKey987ab', secret: true },
  { key: 'PUBLIC_API_URL', value: 'https://api.example.com/v1', secret: false },
  { key: 'JWT_SIGNING_SECRET', value: 'p9Q7wZrT1mXaB4vC6nH2sJ8k', secret: true },
];

function mask(value) {
  return '\\u2022'.repeat(Math.min(value.length, 24));
}

const list = document.getElementById('bsenvList');
let revealed = new Set();

function render() {
  list.innerHTML = VARS.map((v, i) => {
    const isRevealed = !v.secret || revealed.has(i);
    return '<li class="bsenv-row">' +
      '<div class="bsenv-key">' + v.key + '</div>' +
      '<div class="bsenv-line">' +
        '<span class="bsenv-value">' + (isRevealed ? v.value : mask(v.value)) + '</span>' +
        (v.secret ? '<button type="button" class="bsenv-toggle" data-action="toggle" data-index="' + i + '">' + (isRevealed ? 'Hide' : 'Reveal') + '</button>' : '') +
        '<button type="button" class="bsenv-copy" data-action="copy" data-index="' + i + '">Copy</button>' +
      '</div>' +
    '</li>';
  }).join('');
}

list.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const index = Number(btn.dataset.index);

  if (btn.dataset.action === 'toggle') {
    if (revealed.has(index)) revealed.delete(index); else revealed.add(index);
    render();
  } else if (btn.dataset.action === 'copy') {
    navigator.clipboard.writeText(VARS[index].value).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  }
});

render();`,

  seo: {
    title: 'Bootstrap Environment Variable Viewer — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 environment variable list — secret values stay masked by default with a per-row Reveal toggle, non-secret values show plainly, and every value has a working Copy action regardless.',
    about: {
      title: 'Bootstrap Environment Variable Viewer — HTML, CSS & JavaScript',
      description: `Each variable carries its own \`secret\` boolean, and that's what decides two things independently: whether a Reveal/Hide toggle exists for it at all, and whether its value starts masked. A non-secret variable like \`NODE_ENV\` never gets a Reveal button in the first place — there's nothing sensitive to hide, so offering a toggle that does nothing meaningful would just be clutter.\n\nWhich secrets are currently revealed lives in one \`revealed\` Set holding row indices, checked per row with \`revealed.has(i)\` — toggling one variable's visibility only ever adds or removes its own index, leaving every other secret's masked/revealed state completely untouched, unlike a single shared "show secrets" boolean that would reveal or hide everything at once.\n\n\`mask()\` renders a bullet character repeated up to the real value's length (capped at 24) rather than a fixed-width placeholder — a short value and a long one look visibly different even while both are hidden, giving a rough sense of scale without leaking the actual content. Copy always copies the real, unmasked value regardless of whether it's currently visible on screen, since the whole point of a Copy button next to a secret is to get the real value into a paste target without necessarily displaying it on screen first.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'NODE_ENV and PUBLIC_API_URL show their real values plainly; every other variable shows masked bullets with a Reveal button.' },
        { title: 'Click "Reveal" next to DATABASE_URL', text: 'Its real connection string appears, and the button relabels itself "Hide".' },
        { title: 'Click "Reveal" on a second secret, like STRIPE_SECRET_KEY', text: 'It reveals independently — DATABASE_URL stays revealed and unaffected.' },
        { title: 'Click "Hide" on DATABASE_URL', text: 'Only that one value re-masks; STRIPE_SECRET_KEY stays revealed.' },
        { title: 'Click "Copy" on a still-masked secret', text: 'The real value is copied to your clipboard even though it\'s never been revealed on screen.' },
      ],
    },
    features: [
      'Only variables actually marked secret get a Reveal/Hide toggle at all — plain values show directly',
      'Each secret\'s revealed state is tracked independently in a Set, never a single shared show-all flag',
      'The masked placeholder scales with the real value\'s length, hinting at scale without leaking content',
      'Copy always copies the true underlying value, regardless of whether it\'s currently masked on screen',
      'A brief "Copied" confirmation on the Copy button itself, reverting automatically',
    ],
    useCases: [
      { icon: 'DEV', title: 'Internal admin tools and deployment dashboards', desc: 'Pairs with [bootstrap-deployment-status-panel](/ui-snippets/bootstrap-deployment-status-panel/) for a fuller internal ops/config review panel.' },
      { icon: 'API', title: 'API key and credential management screens', desc: 'The reveal-on-demand pattern is the standard way sensitive config values are shown in most cloud provider dashboards.' },
      { icon: 'APP', title: 'CI/CD pipeline configuration review', desc: 'Let an operator double-check which secrets are set for an environment without exposing them all by default.' },
    ],
    faqs: [
      { q: 'Why do some variables have no Reveal button?', a: 'Only variables marked secret: true render one — a plainly public value like NODE_ENV or an API base URL has nothing to hide, so there\'s no reveal/hide state relevant to it at all.' },
      { q: 'Does revealing one secret reveal the others too?', a: 'No — each secret\'s visibility is tracked independently by its own index in a Set, so revealing one has zero effect on any other secret\'s masked or revealed state.' },
      { q: 'Can I copy a secret without revealing it first?', a: 'Yes — the Copy button always reads the real value directly from the underlying VARS array, regardless of whether that row is currently showing the masked placeholder or the real text.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the revealed row indices in a Set (or an equivalent structure) in component state, and derive each row\'s displayed value and button label from whether its index is present in that state.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "Reveal all" / "Hide all" toggle above the list that affects every secret at once while still supporting individual per-row toggling afterward, or to add a short auto-re-mask timer that hides a revealed secret again after a set number of seconds of inactivity.`,
      prompt: `Build a Bootstrap 5.3 environment variable viewer, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 5 sample environment variables, each with a key and a value, where some are marked as secret and some are not.
- Non-secret variables display their real value plainly with no reveal control. Secret variables display a masked placeholder by default (visually scaled to roughly match the real value's length) with a per-row "Reveal"/"Hide" toggle button.
- Track which secrets are currently revealed independently per row (e.g. in a Set of indices), so revealing one secret has no effect on any other secret's visibility state.
- Every variable, secret or not, has a "Copy" button that copies its real underlying value to the clipboard regardless of whether it's currently masked or revealed on screen, with a brief "Copied" confirmation that reverts automatically.`,
    },
  },
};

export default bootstrapEnvironmentVariableViewer;
