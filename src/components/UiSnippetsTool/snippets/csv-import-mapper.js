const csvImportMapper = {
  id: 'csv-import-mapper',
  title: 'CSV Import Mapper',
  lastmod: '2026-07-23',
  category: 'forms',
  html: `<div class="importer">
  <!-- Step rail -->
  <div class="steps-rail">
    <div class="step-dot done" data-step="1"><span>1</span>Upload</div>
    <div class="rail-line"></div>
    <div class="step-dot active" data-step="2"><span>2</span>Map columns</div>
    <div class="rail-line"></div>
    <div class="step-dot" data-step="3"><span>3</span>Review</div>
  </div>

  <!-- Step 2: mapping -->
  <div class="panel" id="panel-map">
    <h2 class="panel-title">Match your columns</h2>
    <p class="panel-sub">We found <b>4 columns</b> and <b>6 rows</b> in <span class="file-chip">contacts.csv</span>. Map each field — we've guessed where we could.</p>

    <div class="map-rows" id="map-rows"></div>

    <div class="panel-foot">
      <span class="map-status" id="map-status"></span>
      <button class="btn-primary" id="btn-continue">Continue to review</button>
    </div>
  </div>

  <!-- Step 3: review -->
  <div class="panel" id="panel-review" hidden>
    <h2 class="panel-title">Review &amp; import</h2>
    <p class="panel-sub" id="review-sub"></p>
    <div class="table-wrap">
      <table class="prev-table" id="prev-table"></table>
    </div>
    <div class="panel-foot">
      <button class="btn-ghost" id="btn-back">← Back to mapping</button>
      <button class="btn-primary" id="btn-import">Import 6 contacts</button>
    </div>
  </div>

  <!-- Done -->
  <div class="panel done-panel" id="panel-done" hidden>
    <div class="done-ring">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <h2 class="panel-title">Import complete</h2>
    <p class="panel-sub" id="done-sub"></p>
    <button class="btn-ghost" id="btn-again">Run again</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.importer { width: 100%; max-width: 560px; }

/* — Step rail — */
.steps-rail { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; justify-content: center; }
.step-dot {
  display: flex; align-items: center; gap: 7px;
  font-size: 11.5px; font-weight: 600; color: #64748b;
}
.step-dot span {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #1e293b; border: 1px solid #334155;
  font-size: 10.5px;
}
.step-dot.active { color: #e2e8f0; }
.step-dot.active span { background: #6366f1; border-color: #6366f1; color: #fff; }
.step-dot.done { color: #94a3b8; }
.step-dot.done span { background: rgba(52,211,153,0.15); border-color: #34d399; color: #34d399; }
.rail-line { width: 34px; height: 1px; background: #334155; }

/* — Panels — */
.panel {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 16px; padding: 22px;
}
.panel-title { font-size: 16.5px; font-weight: 800; color: #f8fafc; }
.panel-sub { font-size: 12.5px; color: #94a3b8; margin: 7px 0 18px; line-height: 1.6; }
.panel-sub b { color: #e2e8f0; }
.file-chip {
  background: #0f172a; border: 1px solid #334155;
  padding: 2px 8px; border-radius: 6px;
  font-family: 'SF Mono', Consolas, monospace; font-size: 11px; color: #a5b4fc;
}

/* — Mapping rows — */
.map-rows { display: flex; flex-direction: column; gap: 10px; }
.map-row {
  display: grid; grid-template-columns: 1fr 20px 1.2fr;
  align-items: center; gap: 10px;
  background: #0f172a; border: 1px solid #283548;
  border-radius: 11px; padding: 11px 14px;
}
.map-field { min-width: 0; }
.map-name { font-size: 12.5px; font-weight: 700; color: #e2e8f0; }
.map-name .req { color: #f87171; }
.map-sample { font-size: 10.5px; color: #4a5a76; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.map-arrow { color: #475569; text-align: center; }

.map-select {
  width: 100%; background: #1e293b; border: 1px solid #334155;
  color: #e2e8f0; border-radius: 8px; padding: 8px 10px;
  font-size: 12.5px; font-family: inherit; outline: none; cursor: pointer;
}
.map-select:focus { border-color: #6366f1; }
.map-select.guessed { border-color: rgba(52,211,153,0.5); }
.map-select.missing { border-color: #f87171; }

.map-status { font-size: 11.5px; color: #94a3b8; }
.map-status.err { color: #f87171; }
.map-status.ok { color: #34d399; }

.panel-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
.btn-primary {
  background: #6366f1; color: #fff; border: none;
  border-radius: 9px; padding: 10px 18px;
  font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.btn-primary:hover { background: #4f46e5; }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-ghost {
  background: none; border: 1px solid #334155; color: #94a3b8;
  border-radius: 9px; padding: 9px 16px;
  font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer;
}
.btn-ghost:hover { border-color: #6366f1; color: #e2e8f0; }

/* — Review table — */
.table-wrap { overflow-x: auto; border: 1px solid #283548; border-radius: 11px; }
.prev-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.prev-table th {
  text-align: left; padding: 9px 12px;
  background: #16213a; color: #94a3b8;
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em;
  border-bottom: 1px solid #283548; white-space: nowrap;
}
.prev-table td { padding: 8px 12px; color: #cbd5e1; border-bottom: 1px solid #1c2940; white-space: nowrap; }
.prev-table tr:last-child td { border-bottom: none; }
.cell-bad { color: #f87171 !important; }
.cell-bad::after { content: ' ⚠'; font-size: 10px; }
.row-bad td:first-child { box-shadow: inset 2px 0 0 #f87171; }

/* — Done — */
.done-panel { text-align: center; }
.done-ring {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(52,211,153,0.12); border: 2px solid #34d399; color: #34d399;
  display: flex; align-items: center; justify-content: center;
  margin: 6px auto 14px;
  animation: pop 0.4s cubic-bezier(0.34, 1.5, 0.64, 1);
}
@keyframes pop { from { transform: scale(0.5); opacity: 0; } }
.done-panel .btn-ghost { margin-top: 6px; }`,

  js: `/* The parsed upload — in production this comes from your CSV parser
   after the file-drop step (see the File Dropzone snippet). */
const CSV = {
  headers: ['full_name', 'email_address', 'company', 'signup_plan'],
  rows: [
    ['Ada Lovelace',  'ada@analytical.dev',   'Analytical', 'pro'],
    ['Grace Hopper',  'grace@navy.mil',       'US Navy',    'enterprise'],
    ['Alan Turing',   'alan@bletchley',       'GCHQ',       'pro'],
    ['Katherine J.',  'kj@nasa.gov',          'NASA',       'free'],
    ['Linus T.',      'linus@kernel.org',     '',           'pro'],
    ['Margaret H.',   'margaret@mit.edu',     'MIT',        'team'],
  ],
};

/* Target schema: what your app needs. */
const FIELDS = [
  { key: 'name',    label: 'Name',    required: true,  hints: ['name', 'full'] },
  { key: 'email',   label: 'Email',   required: true,  hints: ['email', 'mail'] },
  { key: 'company', label: 'Company', required: false, hints: ['company', 'org'] },
  { key: 'plan',    label: 'Plan',    required: false, hints: ['plan', 'tier'] },
];

const mapping = {}; // field.key -> header index (or -1)

/* — Auto-guess: match field hints against header names — */
FIELDS.forEach(f => {
  const idx = CSV.headers.findIndex(h =>
    f.hints.some(hint => h.toLowerCase().includes(hint)));
  mapping[f.key] = idx; // -1 when no guess
});

/* — Render mapping rows — */
const mapRows = document.getElementById('map-rows');
mapRows.innerHTML = FIELDS.map(f => {
  const options = ['<option value="-1">— Skip —</option>'].concat(
    CSV.headers.map((h, i) =>
      '<option value="' + i + '"' + (mapping[f.key] === i ? ' selected' : '') + '>' + h + '</option>')
  ).join('');
  return '<div class="map-row">' +
    '<div class="map-field">' +
      '<div class="map-name">' + f.label + (f.required ? ' <span class="req">*</span>' : '') + '</div>' +
      '<div class="map-sample" data-sample="' + f.key + '"></div>' +
    '</div>' +
    '<div class="map-arrow">→</div>' +
    '<select class="map-select' + (mapping[f.key] >= 0 ? ' guessed' : '') + '" data-field="' + f.key + '">' + options + '</select>' +
  '</div>';
}).join('');

function updateSamples() {
  FIELDS.forEach(f => {
    const el = mapRows.querySelector('[data-sample="' + f.key + '"]');
    const i = mapping[f.key];
    el.textContent = i >= 0
      ? 'e.g. ' + CSV.rows.slice(0, 2).map(r => r[i] || '—').join(', ')
      : 'Not mapped';
  });
}

function validateMapping() {
  const missing = FIELDS.filter(f => f.required && mapping[f.key] < 0);
  const status = document.getElementById('map-status');
  const btn = document.getElementById('btn-continue');
  mapRows.querySelectorAll('.map-select').forEach(sel => {
    const f = FIELDS.find(x => x.key === sel.dataset.field);
    sel.classList.toggle('missing', f.required && mapping[f.key] < 0);
  });
  if (missing.length) {
    status.textContent = 'Required: ' + missing.map(f => f.label).join(', ');
    status.className = 'map-status err';
    btn.disabled = true;
  } else {
    status.textContent = 'All required fields mapped ✓';
    status.className = 'map-status ok';
    btn.disabled = false;
  }
}

mapRows.addEventListener('change', e => {
  const sel = e.target.closest('.map-select');
  if (!sel) return;
  mapping[sel.dataset.field] = +sel.value;
  sel.classList.remove('guessed');
  updateSamples();
  validateMapping();
});
updateSamples();
validateMapping();

/* — Step 3: review with validation — */
const emailOk = v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v);

function buildReview() {
  let badCells = 0;
  const mapped = FIELDS.filter(f => mapping[f.key] >= 0);
  let html = '<tr>' + mapped.map(f => '<th>' + f.label + '</th>').join('') + '</tr>';
  CSV.rows.forEach(row => {
    let rowBad = false;
    const tds = mapped.map(f => {
      const v = row[mapping[f.key]] || '';
      const bad = f.key === 'email' && !emailOk(v);
      if (bad) { badCells++; rowBad = true; }
      return '<td class="' + (bad ? 'cell-bad' : '') + '">' + (v || '<i style="color:#475569">empty</i>') + '</td>';
    }).join('');
    html += '<tr class="' + (rowBad ? 'row-bad' : '') + '">' + tds + '</tr>';
  });
  document.getElementById('prev-table').innerHTML = html;
  document.getElementById('review-sub').innerHTML = badCells
    ? '<b>' + badCells + ' value' + (badCells > 1 ? 's' : '') + '</b> failed validation (marked below). Bad rows are skipped on import.'
    : 'All rows passed validation.';
  return badCells;
}

function setStep(n) {
  document.querySelectorAll('.step-dot').forEach(d => {
    const s = +d.dataset.step;
    d.classList.toggle('done', s < n);
    d.classList.toggle('active', s === n);
  });
}

document.getElementById('btn-continue').addEventListener('click', () => {
  buildReview();
  document.getElementById('panel-map').hidden = true;
  document.getElementById('panel-review').hidden = false;
  setStep(3);
});
document.getElementById('btn-back').addEventListener('click', () => {
  document.getElementById('panel-review').hidden = true;
  document.getElementById('panel-map').hidden = false;
  setStep(2);
});

document.getElementById('btn-import').addEventListener('click', function() {
  this.disabled = true;
  this.textContent = 'Importing…';
  setTimeout(() => {
    const bad = CSV.rows.filter(r => mapping.email >= 0 && !emailOk(r[mapping.email] || '')).length;
    document.getElementById('panel-review').hidden = true;
    document.getElementById('panel-done').hidden = false;
    document.getElementById('done-sub').innerHTML =
      '<b>' + (CSV.rows.length - bad) + ' contacts imported</b>' +
      (bad ? ' · ' + bad + ' row' + (bad > 1 ? 's' : '') + ' skipped (invalid email)' : '');
  }, 1100);
});

document.getElementById('btn-again').addEventListener('click', () => location.reload());`,

  seo: {
    title: 'CSV Import Column Mapper — HTML CSS JS Snippet',
    description: 'Import wizard step: map CSV columns to schema fields with auto-guessing, sample previews, validation and a review table. React, Vue & Tailwind exports.',
    about: {
      title: 'CSV Import Mapper — Column-to-Field Mapping UI with Hint-Based Auto-Guessing, Live Samples, Required-Field Gating & Validated Review',
      description: `Every B2B product eventually ships "Import from CSV", and the hard part is never parsing — it's the *mapping step*: users arrive with files whose columns are named \`full_name\`, \`email_address\`, or \`E-Mail (work)\`, and your schema wants \`name\` and \`email\`. Products like Flatfile and OneSchema built businesses on this single screen. This snippet implements it in vanilla HTML, CSS, and JavaScript: a three-step wizard (upload → map → review) whose centrepiece is the column mapper with hint-based auto-guessing, live sample values, required-field gating, and a validated preview table that marks bad cells and reports what the import will skip.

**Two schemas and one dictionary between them**

The component's inputs model the real problem exactly. \`CSV\` is the parsed upload — headers plus rows (in production, produced by your parser after the file-drop step; the [File Dropzone](/ui-snippets/file-dropzone) snippet is the natural predecessor). \`FIELDS\` is *your* schema: key, label, required flag, and — the piece that powers the magic — a \`hints\` array of substrings commonly seen in wild headers for that field. The entire mapping state is one object: \`{ fieldKey: headerIndex }\`, with −1 meaning skipped. Every downstream feature — samples, validation, preview, import — reads only this dictionary, which is also precisely the payload your import endpoint wants.

**Auto-guessing: cheap fuzzy matching that feels smart**

On load, each field scans the CSV headers for the first one containing any of its hints (case-insensitively): \`email_address\` matches the \`email\` hint, \`full_name\` matches \`full\`, \`signup_plan\` matches \`plan\`. Matched selects get a green \`guessed\` border communicating "we did this for you — check it"; the tint clears the moment the user touches the select, because at that point it's their choice, not a guess. Substring-hints is deliberately the 20-line version of what import SaaS does with string-distance and ML — and it resolves the overwhelming majority of real files, because header vocabularies are conventional. Each mapping row also shows *live sample values* from the first two data rows ("e.g. ada@analytical.dev, grace@navy.mil") — the single highest-value feature of the screen, since users confirm mappings by recognising their data, not by reasoning about header names.

**Gating and the review step**

\`validateMapping()\` runs on every change: required fields without a mapping outline red, the status line lists them, and Continue disables until they're resolved — the wizard cannot proceed into a broken import. Step 3 rebuilds a preview table from mapped columns only, running per-cell validation (the demo validates email format; the deliberately broken \`alan@bletchley\` row demonstrates it): bad cells tint red with a warning glyph, bad rows get a left edge-bar, empty optional values render as a muted *empty* — and the summary line states the consequence honestly: "1 value failed validation… bad rows are skipped on import." The import button then simulates the POST and reports the outcome split ("5 contacts imported · 1 row skipped"), because import UIs that swallow failures silently generate support tickets.

**Wizard mechanics**

The step rail (numbered dots, done/active states, connector lines) is driven by one \`setStep(n)\` class toggle; panels show/hide via the \`hidden\` attribute; Back returns to mapping with all state intact since the mapping dictionary never resets. The whole flow is deliberately session-stateless beyond that one object — making it trivial to lift into a modal, a settings page, or the multi-step-form patterns in the [Multi-Step Form](/ui-snippets/multi-step-form) snippet.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Walk the happy path and the failure',
          text: 'The mapper loads with three of four fields auto-guessed (green borders) from the fake contacts.csv. Note the sample values under each field name — that\'s how users verify guesses. Set a required field to "— Skip —" and watch the red outline, the status message, and the disabled Continue. Restore it, continue, and see the review table: alan@bletchley fails email validation, its cell marked and the summary declaring one row will be skipped. Import and read the honest outcome split.',
        },
        {
          title: 'Plug in your real parsed CSV',
          text: 'Replace the CSV constant with your parser\'s output — { headers: string[], rows: string[][] }. For parsing itself use Papa Parse (handles quoted commas, BOMs, encodings) fed by a file input or the [File Dropzone](/ui-snippets/file-dropzone) as step 1. Everything else — guessing, samples, gating, preview — adapts automatically since it only reads headers/rows.',
        },
        {
          title: 'Define your schema and hints',
          text: 'Edit FIELDS to your import target: key (your API field), label, required, and hints — lowercase substrings you expect in wild headers ("phone", "mobile", "tel" for a phone field). Hints are checked in order against headers with includes(), so put the most specific first. Add per-field validators by extending the review step\'s per-cell check beyond the email case — a validators map keyed by field key keeps it declarative.',
        },
        {
          title: 'Send the import',
          text: 'The mapping dictionary is the payload: POST { mapping, fileId } and let the server re-read the stored upload applying the same column indexes — never send re-mapped row data from the client for large files. For the demo-scale alternative, build rows client-side: CSV.rows.map(r => Object.fromEntries(FIELDS.filter(f => mapping[f.key] >= 0).map(f => [f.key, r[mapping[f.key]]]))). Report the imported/skipped split from the server response in the done panel.',
        },
        {
          title: 'Handle big files in the preview',
          text: 'The review table should never render 50,000 rows — cap it at the first 100 with a "Showing 100 of 48,712 rows" note, but run validation counts over everything (the counting loop is O(rows) and cheap; only DOM rendering is expensive). For duplicate detection ("3 rows match existing contacts"), add a server-side dry-run endpoint called on entering step 3 and merge its findings into the summary line.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — mapping as state, selects controlled, review memoised from (mapping, rows). Compose the full import flow from this library: [File Dropzone](/ui-snippets/file-dropzone) → this mapper → [Upload Progress](/ui-snippets/upload-progress) during the POST → [Toast Notification](/ui-snippets/toast-notification) on completion, with the [Step Progress](/ui-snippets/step-progress) rail if you want a fancier stepper.',
        },
      ],
    },
    features: [
      'Hint-based auto-guessing: per-field substring lists matched case-insensitively against wild headers',
      'Guessed selects tinted green until touched — "we did this, verify it" affordance that clears on user choice',
      'Live sample values from the first data rows under every field — users verify by recognising their data',
      'Required-field gating: red outlines, a listing status line, and a disabled Continue until resolved',
      'Single mapping dictionary { field: headerIndex } — the same object drives UI, validation, and the API payload',
      'Review table from mapped columns only, with per-cell validation, red bad cells, row edge-bars, and muted empties',
      'Honest outcome reporting: "5 imported · 1 skipped (invalid email)" — failures never swallowed',
      'Three-step wizard rail with done/active states, Back preserving all state, and a pop-in success panel',
    ],
    useCases: [
      {
        icon: 'FLOW',
        title: 'Customer data onboarding in B2B SaaS',
        desc: 'The first-run moment of CRMs, email tools, and billing products is "import your existing contacts/products/subscribers" — and mapping is where those imports die. This screen is the retention-critical middle of that funnel: auto-guessing removes the tedium for conventional files, sample values catch mis-maps before they corrupt data, and the skip-reporting keeps trust when files are messy. Wire it between the [File Dropzone](/ui-snippets/file-dropzone) and your POST, and the import feature is demo-able in a day.',
      },
      {
        icon: 'FORM',
        title: 'Any external-schema-to-internal-schema bridge',
        desc: 'The pattern generalises past CSV: mapping Airtable exports, spreadsheet paste-ins, API payloads from a legacy system, or webhook fields from a third party onto your schema is the same screen with a different parser. The FIELDS/hints/mapping-dictionary architecture is source-agnostic — headers in, indexes out. Product-catalogue migrations, HR system switches, and accounting-tool imports all reuse it unchanged.',
      },
      {
        icon: 'DOC',
        title: 'Self-serve migrations that used to require CSMs',
        desc: 'Enterprise onboarding teams hand-run customer migrations mainly because import UIs can\'t be trusted with messy files. The gating (can\'t proceed without required fields), per-cell validation preview, and dry-run summary hook (step 5 in the how-to) are exactly the safety rails that let customers self-serve: they see what will fail before it does, and the outcome report gives support a precise artifact when something still goes wrong. That turns migration from a services cost into a product flow.',
      },
      {
        icon: 'LEARN',
        title: 'Learning wizard state design',
        desc: 'The instructive choice here is how little state exists: one dictionary, mutated by one delegated change handler, read by every feature. No step state machine libraries, no duplicated row data, no sync between preview and mapping — the preview is re-derived from the dictionary each time step 3 opens. That "derive, don\'t copy" discipline is the difference between wizards that survive Back-button traffic and those that desync, and it transfers directly to the React port where the dictionary becomes the single useState.',
      },
      {
        icon: 'CHART',
        title: 'Admin tools: bulk updates and internal data loading',
        desc: 'Internal ops constantly load spreadsheets — price updates, user grants, inventory counts — through ad-hoc scripts that fail opaquely. Embedding this mapper in the admin panel gives ops the same rails customers get: guessing against your canonical columns, validation with visible bad cells, and skip accounting. Because required fields and validators are data (FIELDS + a validators map), each internal import type is a config, not a new screen.',
      },
      {
        icon: 'APP',
        title: 'The build-vs-buy baseline against import SaaS',
        desc: 'Flatfile-class products charge per-seat for polished versions of this exact flow. This snippet is the honest baseline for that decision: it covers guessing, samples, gating, validation preview, and outcome reporting — the demo-visible 80%. What the SaaS adds is the deep 20%: encoding repair, ML matching trained on millions of headers, in-grid cell editing, and scale-out validation. Teams that ship this first know precisely which of those they miss before paying for all of them.',
      },
      { icon: 'CODE', title: 'Related: Dynamic Field Array — Add/Remove Repeatable Form Rows', desc: 'See the [Dynamic Field Array — Add/Remove Repeatable Form Rows](/ui-snippets/dynamic-form-field-array-add-remove/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the auto-guessing work, and how do I make it smarter?',
        a: 'Each target field carries a hints array of lowercase substrings, and the guesser takes the first CSV header whose lowercased name includes any hint — email_address matches "email", full_name matches "full", signup_plan matches "plan". It is deliberately the simplest thing that works, and it works surprisingly often because real-world header vocabulary is conventional. Three upgrades in increasing order of effort: normalise headers before matching (strip spaces, underscores, punctuation — so "E-Mail (work)" becomes "emailwork" and matches); score all candidates instead of taking the first hit (exact match > startsWith > includes, pick the best, and refuse to guess below a threshold so wild files show honestly unmapped selects rather than wrong green ones); and content-based fallback — when no header matches, sample the first rows of unmatched columns and test them against field validators (a column whose values look like emails probably is the email column, whatever its header says). That last technique is most of what commercial import tools\' "AI matching" does for common fields.',
      },
      {
        q: 'Why show sample values under each field, and why only two?',
        a: 'Because users verify mappings by recognising their own data, not by reasoning about header semantics. A user squinting at "full_name → Name" is doing abstract schema translation; the same user seeing "e.g. Ada Lovelace, Grace Hopper" confirms instantly — and, critically, a WRONG mapping becomes self-evident ("e.g. pro, enterprise" under the Email field is unmissable) in a way the header comparison never is. This is the single feature usability studies of import flows flag most consistently. Two samples is the deliberate sweet spot: one value can be coincidentally plausible in the wrong column (a company named "Turing" looks like a surname), while three or more overflow the row on narrow screens; two values catch the coincidence case while staying scannable. Skip empty cells when picking samples in production (the demo\'s || \'—\' placeholder handles the display side), and always sample data rows, never the header row.',
      },
      {
        q: 'Should validation and the actual import run client-side or server-side?',
        a: 'Both, with different jobs. Client-side validation (this snippet\'s review step) exists for feedback latency: users see bad cells and skip counts instantly, iterate on their file, and arrive at the server with realistic expectations — it is UX, not enforcement. The server must re-validate everything regardless, because the client saw at most a preview and can be bypassed trivially. For the import itself, send the mapping dictionary plus a file reference — POST { fileId, mapping } — and let the server re-read its stored copy of the upload applying the column indexes: client-side re-mapping and re-uploading of row data caps out quickly (a 50MB CSV re-serialised in the browser is a tab crash) and invites truncation bugs. The dry-run pattern completes the architecture: on entering review, call the same server import in validate-only mode and merge its findings (duplicates against existing records, permission failures — things the client cannot know) into the summary line, so the preview\'s promises match the import\'s reality.',
      },
      {
        q: 'How does this port to React or Angular, and what does Tailwind styling look like?',
        a: 'React: the mapping dictionary becomes the single source of truth — const [mapping, setMapping] = useState(initialGuesses) — with selects controlled (value={mapping[f.key]}, onChange updating the dict), samples and gating derived inline or via useMemo, and the review rows computed with useMemo(() => buildRows(mapping, csv), [mapping, csv]); the guessed-tint state is a one-shot: keep a touched set and style green only for untouched auto-matched fields. Step state is one useState<1|2|3>. Angular mirrors it with a signals record, computed() for gating and review rows, and a select bound via [ngModel] or reactive forms per field. Tailwind: mapping rows are grid grid-cols-[1fr_20px_1.2fr] items-center gap-2.5 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3; selects are w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-sm with data-[guessed]:border-emerald-400/50 data-[missing]:border-red-400; the review table uses the standard th classes text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-900 with bad cells as text-red-400 after:content-[\'_⚠\'] and bad rows shadow-[inset_2px_0_0] shadow-red-400 on the first cell.',
      },
    ],
    aiPrompt: {
      paragraph: `The mapper is a screen you'll customise heavily, and an AI assistant shortens every customisation: paste this snippet into Claude with your actual import schema (field names, which are required, what formats they take) and ask it to rewrite FIELDS with well-chosen hints — then feed it five real header rows from customer files and ask it to test its own hints against them, which immediately reveals the gaps substring matching leaves. The upgrade requests that pay off, in order: the scored guesser with a refuse-to-guess threshold (wrong green borders are worse than none), a declarative per-field validators map driving the review step, header normalisation for punctuation-heavy exports, and the content-based fallback that recognises an email column by sampling its values. For the backend seam, describe your storage setup and ask for the POST { fileId, mapping } endpoint plus the validate-only dry-run variant, with the client merge of dry-run findings into the summary line. And if your files run large, ask for the capped-preview-full-count split — the review must render 100 rows while counting 100,000.`,
      prompt: `Build the column-mapping step of a CSV import wizard in plain HTML, CSS, and JavaScript — the screen that matches a user's CSV headers to an app's schema fields, with auto-guessing, gating, and a validated review. No libraries.

Requirements:
- Model the two sides as data: a parsed CSV constant (headers array + rows matrix, ~6 rows including one deliberately invalid email and one empty optional cell) and a FIELDS schema array where each target field has a key, label, required flag, and a hints array of lowercase substrings expected in wild header names; the entire mapping state must be ONE dictionary of field-key → header-index (−1 = skipped) that every feature reads.
- Auto-guess on load: map each field to the first header whose lowercased name includes any of its hints, and tint successfully guessed selects with a green border that clears permanently the first time the user changes that select (a guess the user touched is a choice, not a guess).
- Render one mapping row per field — label with a red asterisk when required, a live sample line showing the first two data values of the currently mapped column ("e.g. ada@…, grace@…") or "Not mapped", an arrow, and a select listing "— Skip —" plus every CSV header — with a single delegated change handler updating the dictionary and re-deriving samples and validation.
- Gate progression: required fields mapped to −1 outline red, a status line lists them by label, and the Continue button disables until all are resolved (flipping to a green "all mapped ✓" state).
- A three-dot step rail (Upload done, Map active, Review pending) driven by one setStep function; Continue switches to a review panel that rebuilds a preview table from mapped columns only, validating email format per cell — bad cells tinted red with a warning glyph, bad rows edge-barred, empty optionals rendered as muted "empty" — and a summary line stating how many values failed and that bad rows will be skipped.
- The import button simulates a POST (disabled + "Importing…" for ~1s) then shows a success panel with a spring-pop check ring and the honest outcome split ("5 contacts imported · 1 row skipped (invalid email)"); Back returns to mapping with all state intact, and comment that the mapping dictionary itself is the API payload — the server should re-read the stored file and apply the indexes, never receive re-mapped rows from the client.`,
    },
  },
};

export default csvImportMapper;
