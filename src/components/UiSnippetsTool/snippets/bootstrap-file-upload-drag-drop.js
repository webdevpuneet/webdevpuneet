const bootstrapFileUploadDragDrop = {
  id: 'bootstrap-file-upload-drag-drop',
  title: 'Bootstrap File Upload Drag and Drop',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdz-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-1 text-center">Upload files</h5>
      <p class="text-muted small mb-3 text-center">Max 2&nbsp;MB per file.</p>

      <div class="bsdz-drop text-center p-4 mb-3" id="bsdzDrop">
        <div class="fs-3 mb-2">&#8593;</div>
        <p class="mb-1 fw-semibold">Drag &amp; drop files here</p>
        <p class="small text-muted mb-0">or click to browse</p>
        <input type="file" id="bsdzInput" class="d-none" multiple>
      </div>

      <div class="small text-danger mb-2 d-none" id="bsdzError"></div>

      <ul class="list-group" id="bsdzList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsdz-card { width: 420px; border: 1px solid #eceef1; border-radius: 14px; }
.bsdz-drop { border: 2px dashed #c9cdd3; border-radius: 10px; cursor: pointer; transition: background-color .15s ease, border-color .15s ease; }
.bsdz-drop.bsdz-dragover { background-color: #f0f6ff; border-color: #0d6efd; }
#bsdzList:not(:empty) { margin-top: .5rem; }
.bsdz-remove { cursor: pointer; color: #adb5bd; }
.bsdz-remove:hover { color: #dc3545; }`,
  js: `const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const drop = document.getElementById('bsdzDrop');
const input = document.getElementById('bsdzInput');
const list = document.getElementById('bsdzList');
const errorBox = document.getElementById('bsdzError');

let files = [];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('d-none');
}

function clearError() {
  errorBox.classList.add('d-none');
  errorBox.textContent = '';
}

function render() {
  list.innerHTML = '';
  files.forEach((file, index) => {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML =
      '<span class="text-truncate me-2">' + file.name + '</span>' +
      '<span class="d-flex align-items-center gap-2">' +
        '<span class="badge text-bg-light">' + formatSize(file.size) + '</span>' +
        '<span class="bsdz-remove" data-index="' + index + '">&times;</span>' +
      '</span>';
    list.appendChild(item);
  });
}

// Adds valid files to the running list and rejects oversized ones with a
// visible error, without discarding files already accepted in the batch.
function addFiles(fileList) {
  clearError();
  const rejected = [];
  Array.from(fileList).forEach(file => {
    if (file.size > MAX_SIZE) {
      rejected.push(file.name);
      return;
    }
    files.push(file);
  });
  if (rejected.length) {
    showError(rejected.join(', ') + (rejected.length > 1 ? ' exceed' : ' exceeds') + ' the 2 MB limit and were not added.');
  }
  render();
}

drop.addEventListener('click', () => input.click());

input.addEventListener('change', () => {
  addFiles(input.files);
  input.value = '';
});

['dragenter', 'dragover'].forEach(evt => {
  drop.addEventListener(evt, e => {
    e.preventDefault();
    drop.classList.add('bsdz-dragover');
  });
});

['dragleave', 'drop'].forEach(evt => {
  drop.addEventListener(evt, e => {
    e.preventDefault();
    if (evt === 'dragleave' && e.target !== drop) return;
    drop.classList.remove('bsdz-dragover');
  });
});

drop.addEventListener('drop', e => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.files.length) {
    addFiles(e.dataTransfer.files);
  }
});

list.addEventListener('click', e => {
  const target = e.target.closest('.bsdz-remove');
  if (!target) return;
  const index = Number(target.dataset.index);
  files.splice(index, 1);
  render();
});`,

  seo: {
    title: 'Bootstrap File Upload Drag and Drop — Free HTML CSS Snippet',
    description: 'A real Bootstrap 5.3 dashed dropzone with drag highlighting, click-to-browse, per-file size validation, and a removable file list. Exports to React & Vue.',
    about: {
      title: 'Bootstrap File Upload Drag and Drop — HTML, CSS & JavaScript',
      description: `The dropzone itself is a plain \`<div>\` styled with \`.bsdz-drop\` — a dashed border, rounded corners, and a pointer cursor — sitting on top of a real Bootstrap \`.card\`. Clicking anywhere on it calls \`input.click()\` on a hidden \`<input type="file" class="d-none" multiple>\`, which is the standard trick for making a fully custom-styled element trigger the native file picker without ever showing the browser's default file input UI.\n\nDrag-and-drop is wired through five separate listeners rather than one, because the browser's default behavior for \`dragover\` and \`drop\` is to navigate away and open the dropped file — every one of them calls \`e.preventDefault()\` to suppress that. \`dragenter\` and \`dragover\` both add the \`bsdz-dragover\` class, which swaps the dropzone's background to a light blue and its border to Bootstrap's blue, giving immediate visual feedback that a drop will be accepted. The \`dragleave\` handler is intentionally guarded with \`if (evt === 'dragleave' && e.target !== drop) return\` — without that check, \`dragleave\` events bubbling from child elements (the arrow icon, the two \`<p>\` tags) inside the dropzone would fire constantly as the cursor moves over them during a drag, flickering the highlight on and off instead of only clearing it when the cursor actually leaves the dropzone's outer boundary.\n\nFile handling itself goes through one shared function, \`addFiles()\`, called identically whether files arrive via the native \`change\` event on the hidden input or via \`e.dataTransfer.files\` on \`drop\` — this is what keeps click-to-browse and drag-and-drop behaviorally identical rather than maintaining two divergent code paths. Inside \`addFiles()\`, each file's \`size\` is checked against a \`MAX_SIZE\` constant of 2MB; oversized files are collected into a \`rejected\` array and reported together in one inline error message (correctly pluralizing "exceeds"/"exceed"), while files under the limit are pushed into the module-level \`files\` array and kept — a batch drop of five files where only one is oversized still accepts the other four instead of rejecting the whole batch.\n\n\`render()\` rebuilds the Bootstrap \`list-group\` from the \`files\` array on every change, showing each file's name, a size formatted by \`formatSize()\` (bytes, KB, or MB depending on magnitude) in a Bootstrap badge, and a \`×\` remove control carrying a \`data-index\` attribute. Removal is handled by one delegated click listener on the \`<ul>\` using \`e.target.closest('.bsdz-remove')\`, reading the index back off the dataset and splicing it out of the \`files\` array — delegation here means newly rendered remove buttons never need their own listener re-attached after each \`render()\` call. A pitfall this avoids: resetting \`input.value = ''\` after every \`change\` event, so selecting the exact same file twice in a row still fires a fresh \`change\` event instead of the browser silently ignoring an unchanged file input.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A dashed-border dropzone appears with an upload icon and "Drag & drop files here" text.' },
        { title: 'Drag a file over the dropzone', text: 'The zone highlights with a light blue background and blue border the moment the file enters it.' },
        { title: 'Drop the file', text: 'The highlight clears and the file appears in a list below with its name and size in a badge.' },
        { title: 'Click the dropzone instead', text: 'Your system\'s native file picker opens; selecting one or more files adds them the same way as a drop.' },
        { title: 'Try uploading a file larger than 2 MB', text: 'An inline red error names the oversized file and explains it was not added, while any valid files in the same batch still appear.' },
        { title: 'Click the × next to a listed file', text: 'That file is removed from the list immediately, leaving the others untouched.' },
      ],
    },
    features: [
      'Real dashed-border dropzone that triggers a hidden native file input via input.click()',
      'Drag highlighting on dragenter/dragover, correctly cleared only on a true dragleave from the zone boundary',
      'preventDefault() on all drag events to stop the browser from navigating to the dropped file',
      'Shared addFiles() logic for both drag-drop and click-to-browse, keeping behavior identical either way',
      'Per-file 2 MB size enforcement with a combined, correctly pluralized inline error for oversized files',
      'Valid files in a mixed batch are still accepted even if others in the same drop are rejected',
      'Bootstrap list-group rendering of selected files with name, formatted size badge, and remove control',
      'Delegated click handling for file removal, and input.value reset so re-selecting the same file works',
    ],
    useCases: [
      { icon: 'FORM', title: 'Document and attachment upload forms', desc: 'Pairs well with [bootstrap-contact-form-char-counter](/ui-snippets/bootstrap-contact-form-char-counter/) for a support or contact form accepting file attachments.' },
      { icon: 'APP', title: 'Admin panels for bulk content or media upload', desc: 'A natural fit for content management screens inside something like [bootstrap-admin-dashboard-sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/).' },
      { icon: 'FORM', title: 'Resume, ID, or document submission flows', desc: 'Enforce realistic size limits for PDF or scanned document uploads in onboarding or application forms.' },
      { icon: 'LEARN', title: 'Learning the HTML5 drag-and-drop API', desc: 'A complete, minimal example of dragenter/dragover/dragleave/drop handling with the common event-bubbling pitfall solved.' },
      { icon: 'STAR', title: 'Companion to image-specific uploads', desc: 'Use this for arbitrary file types, or [bootstrap-image-upload-preview](/ui-snippets/bootstrap-image-upload-preview/) when you specifically need thumbnail previews for images.' },
    ],
    faqs: [
      { q: 'Does dropping a file actually upload it anywhere?', a: 'No — this is a front-end demo that only manages the file list in memory via the File objects the browser provides. In production, addFiles() is where you would kick off an XMLHttpRequest or fetch with FormData for each accepted file.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, move the files array into useState and call setFiles inside addFiles instead of mutating an array directly, attaching the drag listeners via a ref in useEffect; in Vue, use a reactive files array with the same event names in onMounted; in Angular, bind the drag events with (dragover)/(drop) host bindings and store files in a component property.' },
      { q: 'Why does the dropzone flicker without the dragleave guard?', a: 'dragenter and dragleave events fire on every child element as the cursor moves across them during a drag, since they bubble like other DOM events. Without checking e.target !== drop, the highlight would rapidly toggle on and off as the cursor crosses the icon or text inside the zone rather than staying steady until the cursor truly exits.' },
      { q: 'What happens to valid files if one file in a drop is too large?', a: 'Only the oversized file is rejected and named in the inline error message; every other file in the same drag-drop or file-picker batch that is under the 2 MB limit is still added to the list, since addFiles() evaluates each file independently.' },
      { q: 'How would I restyle the dropzone with Tailwind?', a: 'Replace .bsdz-drop with Tailwind utilities like border-2 border-dashed border-gray-300 rounded-lg cursor-pointer, and .bsdz-dragover with bg-blue-50 border-blue-500 toggled the same way via classList, keeping all the JS drag-event logic unchanged.' },
      { q: 'Can I restrict which file types are accepted?', a: 'Yes — add an accept attribute to the hidden file input (e.g. accept=".pdf,.doc,.docx") for the click-to-browse picker, and add a similar MIME-type or extension check inside addFiles() alongside the existing size check so dropped files are filtered the same way as browsed ones.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add file-type filtering with accept attributes and a matching drop-time check, or to add a progress bar per file that fills as a real upload request completes. It's also worth asking for a total-size limit across all selected files, not just per file.`,
      prompt: `Build a Bootstrap 5.3 drag-and-drop file upload component, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card and list styling, not custom CSS made to resemble Bootstrap.

Requirements:
- A dashed-border dropzone that highlights (background and border color change) on dragenter/dragover and clears the highlight only when the drag truly leaves the zone's boundary, not when it crosses a child element inside it.
- Clicking the dropzone opens the native file picker via a hidden <input type="file" multiple>, and selecting files there must add them using the exact same logic as a drag-and-drop.
- All drag events must call preventDefault() to stop the browser's default file-open navigation.
- Enforce a maximum file size (e.g. 2 MB) per file; oversized files must be rejected with a visible inline error naming them, while valid files in the same batch are still accepted.
- List every accepted file in a Bootstrap list-group showing its name and a human-readable formatted size (B/KB/MB), each with a remove (x) button that removes only that file from the list.
- Selecting the exact same file twice in a row via the file picker must still register as a new selection.`,
    },
  },
};

export default bootstrapFileUploadDragDrop;
