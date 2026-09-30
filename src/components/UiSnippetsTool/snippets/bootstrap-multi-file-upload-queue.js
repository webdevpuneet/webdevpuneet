const bootstrapMultiFileUploadQueue = {
  id: 'bootstrap-multi-file-upload-queue',
  title: 'Bootstrap Multi-File Upload Queue',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsqueue-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <label class="form-label small fw-semibold mb-0">Upload files</label>
        <span class="small text-muted" id="bsqueueSummary"></span>
      </div>
      <input type="file" class="form-control mb-3" id="bsqueueInput" multiple>
      <ul class="list-unstyled mb-0" id="bsqueueList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsqueue-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsqueue-row { padding: 8px 0; border-bottom: 1px solid #f1f2f5; }
.bsqueue-row:last-child { border-bottom: none; }
.bsqueue-row .progress { height: 6px; }
#bsqueueList .bg-danger { background-color: #dc3545 !important; }`,
  js: `const input = document.getElementById('bsqueueInput');
const list = document.getElementById('bsqueueList');
const summary = document.getElementById('bsqueueSummary');

let files = [];
let seq = 0;

function updateSummary() {
  const done = files.filter(f => f.status === 'done').length;
  summary.textContent = files.length ? done + ' of ' + files.length + ' uploaded' : '';
}

function renderRow(f) {
  const row = document.getElementById('bsqueue-row-' + f.id);
  if (!row) return;
  row.querySelector('.bsqueue-pct').textContent =
    f.status === 'done' ? 'Done' : f.status === 'failed' ? 'Failed' : Math.round(f.progress) + '%';
  const bar = row.querySelector('.progress-bar');
  bar.style.width = f.progress + '%';
  bar.classList.toggle('bg-danger', f.status === 'failed');
  row.querySelector('.bsqueue-action').textContent = f.status === 'uploading' ? 'Cancel' : 'Remove';
  updateSummary();
}

function runUpload(f) {
  f.status = 'uploading';
  f.progress = 0;
  f.timer = setInterval(() => {
    f.progress += Math.random() * 20;
    if (f.progress >= 100) {
      f.progress = 100;
      f.status = 'done';
      clearInterval(f.timer);
    }
    renderRow(f);
  }, 220);
}

function addFiles(fileList) {
  Array.from(fileList).forEach(file => {
    const f = { id: seq++, file, progress: 0, status: 'queued', timer: null };
    files.push(f);
    const li = document.createElement('li');
    li.className = 'bsqueue-row';
    li.id = 'bsqueue-row-' + f.id;
    li.innerHTML =
      '<div class="d-flex justify-content-between small mb-1">' +
      '<span class="text-truncate" style="max-width:220px">' + file.name + '</span>' +
      '<span class="bsqueue-pct text-muted">0%</span></div>' +
      '<div class="progress mb-1"><div class="progress-bar" style="width:0%"></div></div>' +
      '<button type="button" class="btn btn-link btn-sm p-0 bsqueue-action" data-id="' + f.id + '">Cancel</button>';
    list.appendChild(li);
    runUpload(f);
  });
  updateSummary();
}

input.addEventListener('change', () => {
  if (input.files.length) addFiles(input.files);
  input.value = '';
});

list.addEventListener('click', e => {
  const btn = e.target.closest('.bsqueue-action');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const f = files.find(x => x.id === id);
  if (!f) return;

  if (f.status === 'uploading') {
    clearInterval(f.timer);
    f.status = 'failed';
    renderRow(f);
  } else {
    clearInterval(f.timer);
    files = files.filter(x => x.id !== id);
    document.getElementById('bsqueue-row-' + id).remove();
    updateSummary();
  }
});`,

  seo: {
    title: 'Bootstrap Multi-File Upload Queue — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 multi-file upload queue — each file gets its own independent progress bar and timer, with per-row Cancel/Remove and a live "X of Y uploaded" summary.',
    about: {
      title: 'Bootstrap Multi-File Upload Queue — HTML, CSS & JavaScript',
      description: `Every selected file becomes its own independent object in a \`files\` array — \`{ id, file, progress, status, timer }\` — with its own \`setInterval\` started by \`runUpload(f)\`. That per-file timer is the key design decision: uploading five files at once means five completely independent intervals ticking at their own randomized pace, so one file finishing early or being cancelled has zero effect on any other file's progress, unlike a single shared progress value trying to represent multiple uploads at once.\n\nEach row's action button does double duty by design — it reads "Cancel" while \`status === 'uploading'\` and "Remove" once a file is done or failed, and the click handler branches on that same status to decide whether to mark the file failed (stopping its timer) or delete it from the list entirely. That single button covers the two related-but-different real actions a queue row needs without needing two separate buttons competing for space in a compact row.\n\n\`updateSummary()\` counts \`files.filter(f => f.status === 'done').length\` fresh every time a row changes, rather than incrementing a separate counter — so the running "X of Y uploaded" total can never drift from what the individual rows are actually showing, the same source-of-truth pattern used throughout this collection's other multi-item components.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Select several files at once', text: 'Each one gets its own row with an independent progress bar, all uploading in parallel.' },
        { title: 'Watch the summary line', text: 'It updates live as each file individually finishes, e.g. "2 of 4 uploaded".' },
        { title: 'Click "Cancel" on one file mid-upload', text: 'Only that row stops and turns red — every other file keeps uploading completely unaffected.' },
        { title: 'Click "Remove" on the cancelled row', text: 'It disappears from the list and from the summary count entirely.' },
        { title: 'Select more files while others are still uploading', text: 'The new files queue up as additional independent rows without disturbing the ones already in progress.' },
      ],
    },
    features: [
      'Every file uploads through its own independent progress state and timer, not a shared value',
      'Cancelling or removing one file has zero effect on any other file\'s upload in progress',
      'One action button per row correctly switches between Cancel and Remove based on that file\'s own status',
      'A live summary count is recomputed from the files array on every change, never tracked separately',
      'New files can be added to the queue at any time, even while others are actively uploading',
    ],
    useCases: [
      { icon: 'FORM', title: 'Bulk document or photo upload forms', desc: 'The natural next step from [bootstrap-file-upload-progress](/ui-snippets/bootstrap-file-upload-progress/) once a form needs to accept more than one file per submission.' },
      { icon: 'APP', title: 'Media libraries and asset management tools', desc: 'Uploading a batch of assets at once with independent, cancellable progress per file.' },
      { icon: 'LEARN', title: 'Learning independent per-item async state', desc: 'A clean example of managing several unrelated async operations at once without them interfering with each other.' },
    ],
    faqs: [
      { q: 'Can files really upload in parallel, not one after another?', a: 'Yes — each file gets its own setInterval the instant it\'s added, with no queueing or waiting for a previous file to finish, which mirrors how a real implementation using several concurrent fetch or XHR requests would behave.' },
      { q: 'What happens if I cancel a file and then remove it?', a: 'Cancelling stops its timer and marks it failed (turning the bar red); removing afterward clears its timer again defensively and deletes it from both the files array and the rendered list.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Store files as an array in component state, keep each file\'s interval reference in a ref-backed map keyed by id (to avoid re-creating intervals on re-render), and derive the summary count from the same array on every render.' },
      { q: 'How would I connect this to a real upload endpoint?', a: 'Replace the setInterval simulation inside runUpload() with a real per-file XMLHttpRequest or fetch upload, updating that file\'s progress from its own upload.onprogress event — the surrounding row rendering and cancel/remove logic needs no changes.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a global "Cancel all" action that stops every currently uploading file at once, or to limit how many files upload concurrently (e.g. 3 at a time) with the rest waiting in a visibly queued state until a slot frees up.`,
      prompt: `Build a Bootstrap 5.3 multi-file upload queue, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A file input with the multiple attribute. Selecting several files at once adds one row per file to a list, each with its own progress bar.
- Each file must upload independently with its own simulated progress interval — cancelling or completing one file must have zero effect on any other file's progress.
- Each row's single action button must show "Cancel" while that file is uploading, and switch to "Remove" once it's done or failed; clicking it should behave accordingly (stop and mark failed, or delete the row entirely).
- Show a live summary above the list, e.g. "2 of 4 uploaded", recomputed from the current state of all files rather than tracked as a separate counter.
- New files can be added to the queue at any time, including while other files are still actively uploading.`,
    },
  },
};

export default bootstrapMultiFileUploadQueue;
