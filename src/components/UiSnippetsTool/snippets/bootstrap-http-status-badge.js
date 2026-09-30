const bootstrapHttpStatusBadge = {
  id: 'bootstrap-http-status-badge',
  title: 'Bootstrap HTTP Status Badge',
  lastmod: '2026-09-11',
  category: 'buttons',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bshttp-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Enter a status code</label>
      <input type="text" class="form-control mb-3" id="bshttpInput" placeholder="e.g. 404" maxlength="3">

      <div class="d-flex align-items-center gap-2 mb-4" id="bshttpResult">
        <span class="text-muted small">Type a 3-digit code above.</span>
      </div>

      <p class="small fw-semibold text-muted mb-2">Common codes</p>
      <div class="d-flex flex-wrap gap-2" id="bshttpCommon"></div>
    </div>
  </div>
</div>`,
  css: `.bshttp-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bshttp-common-chip { cursor: pointer; border: none; }`,
  js: `const FAMILIES = [
  { test: c => c >= 200 && c < 300, tone: 'success', label: 'Success' },
  { test: c => c >= 300 && c < 400, tone: 'info', label: 'Redirect' },
  { test: c => c >= 400 && c < 500, tone: 'warning', label: 'Client Error' },
  { test: c => c >= 500 && c < 600, tone: 'danger', label: 'Server Error' },
];

const COMMON = [
  [200, 'OK'], [201, 'Created'], [301, 'Moved'], [304, 'Not Modified'],
  [400, 'Bad Request'], [401, 'Unauthorized'], [403, 'Forbidden'],
  [404, 'Not Found'], [429, 'Too Many Requests'], [500, 'Server Error'], [503, 'Unavailable'],
];

const input = document.getElementById('bshttpInput');
const result = document.getElementById('bshttpResult');
const common = document.getElementById('bshttpCommon');

function familyFor(code) {
  return FAMILIES.find(f => f.test(code));
}

function render(code) {
  if (!code || code < 100 || code > 599) {
    result.innerHTML = '<span class="text-muted small">Type a 3-digit code above.</span>';
    return;
  }
  const family = familyFor(code);
  result.innerHTML = '<span class="badge text-bg-' + family.tone + ' fs-6">' + code + '</span>' +
    '<span class="small text-muted">' + family.label + '</span>';
}

input.addEventListener('input', () => {
  const digits = input.value.replace(/[^0-9]/g, '');
  input.value = digits;
  render(digits ? Number(digits) : null);
});

common.innerHTML = COMMON.map(([code, label]) => {
  const tone = familyFor(code).tone;
  return '<button type="button" class="btn btn-sm btn-outline-secondary bshttp-common-chip" data-code="' + code + '">' +
    '<span class="badge text-bg-' + tone + ' me-1">' + code + '</span>' + label + '</button>';
}).join('');

common.addEventListener('click', e => {
  const btn = e.target.closest('.bshttp-common-chip');
  if (!btn) return;
  input.value = btn.dataset.code;
  render(Number(btn.dataset.code));
});`,

  seo: {
    title: 'Bootstrap HTTP Status Badge — Free HTML CSS JS Snippet',
    description: 'A real, interactive Bootstrap 5.3 HTTP status code reference — type any 3-digit code and it colors and labels itself live by family (2xx/3xx/4xx/5xx), plus a clickable list of common real-world codes.',
    about: {
      title: 'Bootstrap HTTP Status Badge — HTML, CSS & JavaScript',
      description: `Every status code's color and label are derived from one small \`FAMILIES\` array of range tests, not a giant lookup table mapping each of the hundreds of possible 3-digit codes individually — \`familyFor(code)\` just finds the first family whose \`test(code)\` returns true, which is what correctly colors a code like 418 (a real, if joking, HTTP status) as a client error even though it never appears in the \`COMMON\` list at all.\n\nThe input itself is scrubbed on every keystroke with \`input.value.replace(/[^0-9]/g, '')\`, so pasting or typing a non-digit character never produces a broken or misleading badge — the field can only ever contain digits, and \`render()\` explicitly handles the "nothing typed yet" and "out of the valid 100-599 range" cases with a neutral placeholder rather than guessing at a family for invalid input.\n\nClicking a common-code chip and typing the same number by hand both funnel through the exact same \`render()\` function, so the live badge above always reflects one consistent piece of state regardless of which interaction produced it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The input is empty and a neutral placeholder message shows above the common-codes list.' },
        { title: 'Type "404"', text: 'A yellow "404" badge appears immediately labeled "Client Error".' },
        { title: 'Change it to "500"', text: 'The badge turns red and relabels itself "Server Error" live as you finish typing.' },
        { title: 'Try typing a letter', text: 'It\'s silently stripped out — the field only ever accepts digits.' },
        { title: 'Click any common-code chip below, like "429"', text: 'The input updates to match and the badge reflects that code, exactly as if you\'d typed it.' },
      ],
    },
    features: [
      'Status families are derived from numeric range tests, not a hardcoded table of every possible code',
      'Correctly classifies any valid 3-digit code, including ones outside the common-codes reference list',
      'Non-digit input is stripped live, so the field can never hold an invalid character',
      'An explicit neutral state for empty or out-of-range input instead of a misleading guessed badge',
      'Clicking a reference chip and typing a code by hand both drive the exact same render function',
    ],
    useCases: [
      { icon: 'DEV', title: 'API documentation and internal developer references', desc: 'Pairs with [bootstrap-api-response-viewer](/ui-snippets/bootstrap-api-response-viewer/) for a fuller request/response inspection panel.' },
      { icon: 'APP', title: 'Admin dashboards showing request or webhook logs', desc: 'Reuse the same familyFor() mapping to color-code a live table of recent API call outcomes.' },
      { icon: 'LEARN', title: 'Learning and teaching HTTP status code families', desc: 'A hands-on reference for anyone still building the instinct for which status range means what.' },
    ],
    faqs: [
      { q: 'Does it correctly handle codes not in the common list, like 418?', a: 'Yes — familyFor() tests the numeric value against a range, not a name lookup, so any valid code from 100-599 gets classified correctly by family even if it never appears among the labeled reference chips.' },
      { q: 'What happens if I type a 2-digit or invalid number?', a: 'render() explicitly checks for a missing value or one outside 100-599 and shows a neutral "type a code" placeholder rather than forcing an incorrect family guess onto invalid input.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep FAMILIES and COMMON as plain data, track the current code in component state, and derive the badge\'s color/label with the same familyFor() logic inside the render function.' },
      { q: 'How would I extend this with the actual status text (e.g. "I\'m a Teapot" for 418)?', a: 'Add a small lookup object mapping specific codes to their official reason phrases, and fall back to just the family label (as this snippet does) for any code not explicitly listed.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add the official reason phrase for every common code (not just the family label), or to add a short one-line explanation of what each family generally means (e.g. "4xx: the request was likely wrong") shown beneath the live badge.`,
      prompt: `Build an interactive Bootstrap 5.3 HTTP status code badge reference, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A text input restricted to digits only (strip any non-digit character as the user types) that accepts a 3-digit HTTP status code.
- Classify any entered code into one of four families using numeric range checks (not a hardcoded per-code table): 2xx success, 3xx redirect, 4xx client error, 5xx server error, each with a distinct Bootstrap badge color.
- Live-render a colored badge and family label above the input as the user types, with an explicit neutral placeholder state when the input is empty or outside the valid 100-599 range.
- Below the input, show a row of at least 10 clickable chips for common real-world status codes (200, 404, 500, etc.), each pre-colored by its own family. Clicking a chip fills the input with that code and updates the live badge through the same rendering logic used for manual typing.`,
    },
  },
};

export default bootstrapHttpStatusBadge;
