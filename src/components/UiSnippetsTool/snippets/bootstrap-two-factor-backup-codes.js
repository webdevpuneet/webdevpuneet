const bootstrapTwoFactorBackupCodes = {
  id: 'bootstrap-two-factor-backup-codes',
  title: 'Bootstrap Two-Factor Backup Codes Display',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bs2fb-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-1">Your backup codes</h5>
      <p class="small text-muted mb-3">Each code can only be used once. Click a code to mark it used, the way redeeming one during sign-in would.</p>

      <div class="row row-cols-2 g-2 mb-3" id="bs2fbGrid"></div>

      <p class="small fw-semibold mb-3"><span id="bs2fbRemaining">10</span> of 10 codes remaining</p>

      <div class="d-flex flex-wrap gap-2 mb-3">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bs2fbCopy">Copy all</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bs2fbDownload">Download .txt</button>
        <button type="button" class="btn btn-sm btn-outline-danger" id="bs2fbRegenBtn">Regenerate codes</button>
      </div>
      <p class="small mb-0" id="bs2fbFeedback">&nbsp;</p>
    </div>
  </div>
</div>

<div class="modal fade" id="bs2fbModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Regenerate backup codes?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="mb-0">Your 10 current codes will stop working immediately, including any you haven't used yet.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger fw-bold" id="bs2fbRegenConfirm">Regenerate</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bs2fb-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bs2fb-code {
  display: block; width: 100%; text-align: center;
  padding: 8px 6px; border-radius: 8px; border: 1px solid #e5e7eb;
  background: #f8f9fb; font: 700 13px ui-monospace, Menlo, Consolas, monospace;
  letter-spacing: .02em; cursor: pointer; transition: background .12s, color .12s;
}
.bs2fb-code:hover { background: #eef0ff; }
.bs2fb-code-used { text-decoration: line-through; color: #9ca3af; background: #f3f4f6; cursor: default; }
#bs2fbFeedback.text-success { color: #198754 !important; }`,
  js: `const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const grid = document.getElementById('bs2fbGrid');
const remainingEl = document.getElementById('bs2fbRemaining');
const feedback = document.getElementById('bs2fbFeedback');
const modal = new bootstrap.Modal(document.getElementById('bs2fbModal'));

let codes = [];

function randomCode() {
  let s = '';
  for (let i = 0; i < 8; i++) s += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  return s.slice(0, 4) + '-' + s.slice(4);
}

function generateCodes() {
  codes = Array.from({ length: 10 }, () => ({ value: randomCode(), used: false }));
}

function renderGrid() {
  grid.innerHTML = codes.map((c, i) =>
    '<div class="col"><button type="button" class="bs2fb-code' + (c.used ? ' bs2fb-code-used' : '') +
    '" data-index="' + i + '">' + c.value + '</button></div>'
  ).join('');
  remainingEl.textContent = codes.filter(c => !c.used).length;
}

grid.addEventListener('click', e => {
  const btn = e.target.closest('.bs2fb-code');
  if (!btn || btn.classList.contains('bs2fb-code-used')) return;
  codes[Number(btn.dataset.index)].used = true;
  renderGrid();
  feedback.textContent = 'Code ' + btn.textContent + ' marked used.';
  feedback.className = 'small text-muted';
});

document.getElementById('bs2fbCopy').addEventListener('click', () => {
  const text = codes.map(c => c.value).join('\\n');
  navigator.clipboard.writeText(text).then(() => {
    feedback.textContent = 'All 10 codes copied to clipboard.';
    feedback.className = 'small text-success';
  });
});

document.getElementById('bs2fbDownload').addEventListener('click', () => {
  const text = codes.map(c => c.value).join('\\n') + '\\n';
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'backup-codes.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  feedback.textContent = 'Download started.';
  feedback.className = 'small text-muted';
});

document.getElementById('bs2fbRegenBtn').addEventListener('click', () => modal.show());

document.getElementById('bs2fbRegenConfirm').addEventListener('click', () => {
  generateCodes();
  renderGrid();
  feedback.textContent = 'New codes generated — the old set no longer works.';
  feedback.className = 'small text-success';
  modal.hide();
});

generateCodes();
renderGrid();`,

  seo: {
    title: 'Bootstrap Two-Factor Backup Codes Display — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 backup-codes screen — click a code to mark it redeemed, copy or download the full set, and regenerate through a confirmation modal that invalidates the old codes.',
    about: {
      title: 'Bootstrap Two-Factor Backup Codes Display — HTML, CSS & JavaScript',
      description: `Backup codes are single-use by definition, so the display has to make a redeemed code permanently distinguishable from an unredeemed one — this snippet models each code as an object with its own \`used\` boolean rather than just a flat array of strings, specifically so \`renderGrid()\` has somewhere to read that state from every time it repaints. Clicking a code that's already \`used\` is a no-op guarded directly in the click handler, matching how a real backup code can't be spent twice.\n\n\`generateCodes()\` builds each code from a deliberately reduced character set — no \`0\`, \`O\`, \`1\`, or \`I\` — because backup codes are the kind of thing a person often reads off a screen and types into a different device by hand, and ambiguous characters turn that into a guessing game. The same function is reused for the initial 10 codes and for a full regeneration, so there's exactly one place that defines what a valid code looks like.\n\nRegenerating is destructive — it invalidates every code, used or not — so it's gated behind a real Bootstrap modal rather than firing on a single click, the same pattern this collection uses for [bootstrap-type-confirm-delete-modal](/ui-snippets/bootstrap-type-confirm-delete-modal/). The download button builds a real \`Blob\`/\`URL.createObjectURL\` text file rather than faking the interaction, though like any snippet that triggers a file download, a sandboxed preview iframe without \`allow-downloads\` may block the click silently — it works normally on a real, non-sandboxed page.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Ten freshly generated codes appear in a grid, all unused.' },
        { title: 'Click any code', text: 'It gets struck through and grayed out, and the remaining count drops by one.' },
        { title: 'Click that same code again', text: 'Nothing happens — a used code can\'t be clicked back to unused, matching real single-use behavior.' },
        { title: 'Click "Copy all"', text: 'Every code (used or not) is copied to the clipboard as plain text, one per line.' },
        { title: 'Click "Regenerate codes"', text: 'A confirmation modal warns that the current codes will stop working before anything changes.' },
        { title: 'Confirm regeneration', text: 'A brand-new set of 10 unused codes replaces the old one, and the remaining count resets to 10.' },
      ],
    },
    features: [
      'Each code tracks its own used state instead of relying on a separate removed-codes list',
      'An ambiguity-free character set (no 0/O or 1/I) for codes people transcribe by hand',
      'Clicking an already-used code is a real no-op, not just a visual style with no logic behind it',
      'A destructive regenerate action gated behind a genuine confirmation modal',
      'Copy-all and download actions read from the same codes array the grid renders from',
      'One generateCodes() function defines the code format for both first load and regeneration',
    ],
    useCases: [
      { icon: 'FORM', title: 'Two-factor authentication setup flows', desc: 'Show immediately after a user enables 2FA, pairing with [bootstrap-otp-login-form](/ui-snippets/bootstrap-otp-login-form/) or [bootstrap-2fa-verification-form](/ui-snippets/bootstrap-2fa-verification-form/) for the sign-in side.' },
      { icon: 'APP', title: 'Account security settings pages', desc: 'A "View backup codes" action inside a settings panel, alongside session and device management.' },
      { icon: 'LEARN', title: 'Learning single-use-token UI patterns', desc: 'The used/unused-per-item pattern here generalizes to invite codes, one-time discount codes, and redeemable vouchers.' },
    ],
    faqs: [
      { q: 'Why does clicking a code mark it used instead of copying just that one code?', a: 'This demo models what happens server-side when a backup code is redeemed during a real sign-in — the point is showing the code becoming permanently unusable, not building a per-code clipboard action (Copy all already covers the copy use case).' },
      { q: 'Will the download button work in every context?', a: 'It builds a real Blob and triggers a real download link, which works normally in an actual page. A sandboxed iframe without the allow-downloads permission (some embedded previews) can silently block a script-triggered download click, which is a browser sandbox restriction, not a bug in the code.' },
      { q: 'Why exclude 0, O, 1, and I from the codes?', a: 'Backup codes are frequently read off one screen and typed into another by hand — those characters are easy to visually confuse in many fonts, so leaving them out removes an entire category of transcription errors.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Move the codes array into component state (useState, ref, or a signal) and replace the direct grid.innerHTML rebuild with a mapped list render; the generateCodes and used-toggle logic itself needs no changes.' },
      { q: 'Should regenerating really invalidate unused codes too?', a: 'Yes — that matches how real backup-code systems work, since keeping some old codes valid after a regeneration would defeat the purpose of a "these are compromised, replace them" action, which is why the confirmation modal calls that out explicitly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "Print" action using window.print() with a print-specific stylesheet that hides the buttons, or to add a masked default view where codes stay hidden behind a "Reveal codes" button until clicked, for an extra step before sensitive codes are shown on screen.`,
      prompt: `Build a Bootstrap 5.3 two-factor authentication backup codes display, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- Generate 10 codes in an easily-transcribed format (e.g. XXXX-XXXX), using a character set that excludes visually ambiguous characters like 0/O and 1/I.
- Display them in a grid where each code is individually clickable.
- Clicking an unused code marks it permanently used (struck through, no longer clickable) — track each code's used state individually rather than in a separate list.
- Show a live count of how many codes remain unused.
- Add a "Copy all" button that copies every code as plain text, and a "Download .txt" button that downloads them as a real text file using a Blob and an object URL.
- Add a "Regenerate codes" button that opens a Bootstrap confirmation modal warning that the current codes (including unused ones) will stop working, and only replaces the full set with a new batch after the user confirms.`,
    },
  },
};

export default bootstrapTwoFactorBackupCodes;
