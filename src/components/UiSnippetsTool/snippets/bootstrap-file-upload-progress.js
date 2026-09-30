const bootstrapFileUploadProgress = {
  id: 'bootstrap-file-upload-progress',
  title: 'Bootstrap File Upload With Progress',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsprog-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Upload a document</label>
      <input type="file" class="form-control mb-3" id="bsprogInput">

      <div class="d-none" id="bsprogRow">
        <div class="d-flex justify-content-between small mb-1">
          <span id="bsprogName">&nbsp;</span>
          <span id="bsprogPercent">0%</span>
        </div>
        <div class="progress mb-2" style="height:8px;">
          <div class="progress-bar" id="bsprogBar" role="progressbar" style="width:0%"></div>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" id="bsprogCancel">Cancel</button>
          <button type="button" class="btn btn-sm btn-outline-danger d-none" id="bsprogRetry">Retry</button>
        </div>
      </div>
      <p class="small mt-3 mb-0" id="bsprogStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bsprog-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsprogBar.bg-danger { background-color: #dc3545 !important; }
#bsprogStatus.text-success { color: #198754 !important; }
#bsprogStatus.text-danger { color: #dc3545 !important; }`,
  js: `const input = document.getElementById('bsprogInput');
const row = document.getElementById('bsprogRow');
const name = document.getElementById('bsprogName');
const percent = document.getElementById('bsprogPercent');
const bar = document.getElementById('bsprogBar');
const cancelBtn = document.getElementById('bsprogCancel');
const retryBtn = document.getElementById('bsprogRetry');
const status = document.getElementById('bsprogStatus');

let timer = null;
let currentFile = null;
let cancelled = false;

function reset() {
  clearInterval(timer);
  timer = null;
}

function startUpload(file) {
  currentFile = file;
  cancelled = false;
  reset();
  row.classList.remove('d-none');
  retryBtn.classList.add('d-none');
  cancelBtn.classList.remove('d-none');
  bar.classList.remove('bg-danger');
  name.textContent = file.name;
  status.textContent = '';
  status.className = 'small mt-3 mb-0';

  let progress = 0;
  timer = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      bar.style.width = '100%';
      percent.textContent = '100%';
      reset();
      cancelBtn.classList.add('d-none');
      status.textContent = file.name + ' uploaded successfully.';
      status.className = 'small mt-3 mb-0 text-success fw-semibold';
      return;
    }
    bar.style.width = progress + '%';
    percent.textContent = Math.round(progress) + '%';
  }, 250);
}

input.addEventListener('change', () => {
  if (input.files && input.files[0]) startUpload(input.files[0]);
});

cancelBtn.addEventListener('click', () => {
  cancelled = true;
  reset();
  bar.classList.add('bg-danger');
  cancelBtn.classList.add('d-none');
  retryBtn.classList.remove('d-none');
  status.textContent = 'Upload cancelled.';
  status.className = 'small mt-3 mb-0 text-danger fw-semibold';
});

retryBtn.addEventListener('click', () => {
  if (currentFile) startUpload(currentFile);
});`,

  seo: {
    title: 'Bootstrap File Upload With Progress — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 file upload with a live animated progress bar, a working Cancel action mid-upload, and Retry that restarts the exact same file from zero.',
    about: {
      title: 'Bootstrap File Upload With Progress — HTML, CSS & JavaScript',
      description: `The progress bar advances in randomized, uneven increments (\`Math.random() * 18\` per 250ms tick) rather than a perfectly smooth linear ramp, specifically because a real network upload never progresses at a perfectly constant rate — this reads closer to genuine upload behavior than a suspiciously mechanical straight line would.\n\nCancel and Retry both revolve around one \`currentFile\` reference and one \`timer\` interval, cleared through a single \`reset()\` function every time either action fires — that's what prevents the classic bug where cancelling mid-upload and then selecting a new file leaves an old interval still silently ticking in the background, fighting the new upload's own progress updates for control of the same bar.\n\nRetry deliberately calls \`startUpload(currentFile)\` — the exact same function a fresh file selection calls — rather than a separate "resume" path, since this demo (like most real uploads without server-side resumable-upload support) restarts from zero rather than continuing from wherever it left off; the button is explicit about that by only appearing after a cancellation, never mid-upload.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Choose a file', text: 'A progress row appears immediately with the file name and a 0% bar.' },
        { title: 'Watch it upload', text: 'The bar fills in uneven real-feeling increments, with the percentage updating alongside it.' },
        { title: 'Click "Cancel" partway through', text: 'The bar turns red, the interval stops immediately, and a Retry button appears in place of Cancel.' },
        { title: 'Click "Retry"', text: 'The same file restarts uploading from 0%, exactly like a fresh selection.' },
        { title: 'Let an upload finish naturally', text: 'The bar reaches 100%, Cancel disappears, and a green success message confirms the file name.' },
      ],
    },
    features: [
      'A realistically uneven progress animation instead of a mechanically perfect linear fill',
      'Cancel and Retry both route through one reset() function, preventing a stray interval from surviving',
      'Retry re-uploads the exact same File object rather than requiring the user to reselect it',
      'A visually distinct red bar and status message clearly distinguish cancellation from success',
      'Selecting a new file while one is already uploading correctly restarts state instead of layering on top of it',
    ],
    useCases: [
      { icon: 'FORM', title: 'Document, resume, or contract upload forms', desc: 'Pairs with [bootstrap-multi-file-upload-queue](/ui-snippets/bootstrap-multi-file-upload-queue/) when a form needs to accept more than one file at once with independent progress.' },
      { icon: 'APP', title: 'Any form uploading a single large file', desc: 'Large uploads specifically benefit from a real cancel option, since a multi-second or multi-minute upload a user didn\'t mean to start is a genuinely bad experience without one.' },
      { icon: 'LEARN', title: 'Learning to build a real progress bar without XHR', desc: 'A useful reference for the exact same UI needs when swapping the simulated timer for a real XMLHttpRequest\'s progress event or a fetch upload stream.' },
    ],
    faqs: [
      { q: 'Does clicking Cancel actually stop a real upload?', a: 'This demo cancels the simulated interval; wiring it to a real upload additionally means calling .abort() on the underlying XMLHttpRequest or aborting the fetch via an AbortController, alongside the same UI state changes shown here.' },
      { q: 'Why doesn\'t Retry resume from where it left off?', a: 'True resumable uploads need server-side support for partial uploads (like the tus protocol or S3 multipart uploads) — without that, restarting from zero is the only correct option, which is why Retry is explicit about starting over rather than implying a resume it can\'t actually do.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the interval (or a real upload\'s progress handler) in a ref, track progress and status in component state, and drive the same startUpload/cancel/retry functions from your framework\'s event handlers.' },
      { q: 'How would I connect this to a real upload endpoint?', a: 'Replace the setInterval simulation inside startUpload() with an XMLHttpRequest using its upload.onprogress event (or a fetch with a ReadableStream) to drive the same bar-width and percentage updates from real bytes transferred.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to wire this up to a real XMLHttpRequest with a genuine .upload.onprogress handler and a working .abort() call on Cancel, or to add an estimated-time-remaining label that updates based on the observed upload rate.`,
      prompt: `Build a Bootstrap 5.3 single-file upload with a progress bar, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A file input that, once a file is selected, immediately shows the file name, a Bootstrap progress bar, and a Cancel button.
- Simulate upload progress with randomized, uneven increments on an interval (not a perfectly smooth linear fill) until it reaches 100%.
- Clicking Cancel mid-upload must stop the interval immediately, visually mark the bar as failed/cancelled (e.g. turning it red), and reveal a Retry button in place of Cancel.
- Clicking Retry must restart the upload of the exact same file from 0%, reusing the same upload function a fresh file selection uses — not a separate resume path.
- Selecting a new file while a previous upload is still in progress must correctly reset all prior state (clearing any existing interval) rather than layering the new upload's progress on top of the old one.`,
    },
  },
};

export default bootstrapFileUploadProgress;
