const bootstrapDuplicateFileDetectionUpload = {
  id: 'bootstrap-duplicate-file-detection-upload',
  title: 'Bootstrap Duplicate File Detection on Upload',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdupe-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Attach files</label>
      <input type="file" class="form-control mb-2" id="bsdupeInput" multiple>
      <p class="small mb-3 d-none" id="bsdupeWarning"></p>
      <ul class="list-unstyled mb-0" id="bsdupeList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsdupe-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsdupeWarning { color: #b45309; background: #fffbeb; padding: 8px 10px; border-radius: 8px; }
.bsdupe-item { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13.5px; border-bottom: 1px solid #f1f2f5; }
.bsdupe-item:last-child { border-bottom: none; }`,
  js: `const input = document.getElementById('bsdupeInput');
const warning = document.getElementById('bsdupeWarning');
const list = document.getElementById('bsdupeList');

let added = [];

// A cheap but effective duplicate signature: real content hashing would need
// to read every file's bytes, which is overkill here — name + size + last
// modified time together are extremely unlikely to collide for two genuinely
// different files someone is attaching to the same form.
function signature(file) {
  return file.name + '::' + file.size + '::' + file.lastModified;
}

function render() {
  list.innerHTML = added.map(f =>
    '<li class="bsdupe-item"><span>' + f.name + '</span><span class="text-muted">' + Math.round(f.size / 1024) + ' KB</span></li>'
  ).join('') || '<li class="bsdupe-item text-muted">No files attached yet.</li>';
}

input.addEventListener('change', () => {
  const incoming = Array.from(input.files);
  const existingSignatures = new Set(added.map(signature));
  const duplicates = [];

  incoming.forEach(file => {
    const sig = signature(file);
    if (existingSignatures.has(sig)) {
      duplicates.push(file.name);
    } else {
      existingSignatures.add(sig);
      added.push(file);
    }
  });

  if (duplicates.length) {
    warning.textContent = (duplicates.length === 1 ? 'Skipped duplicate: ' : 'Skipped duplicates: ') + duplicates.join(', ');
    warning.classList.remove('d-none');
  } else {
    warning.classList.add('d-none');
  }

  render();
  input.value = '';
});

render();`,

  seo: {
    title: 'Bootstrap Duplicate File Detection on Upload — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 file input that silently rejects a file already attached — matched by name, size, and last-modified time — with a clear warning listing exactly which files were skipped.',
    about: {
      title: 'Bootstrap Duplicate File Detection on Upload — HTML, CSS & JavaScript',
      description: `Detecting a true duplicate needs a signature that's cheap to compute but specific enough to trust — \`signature()\` combines a file's \`name\`, \`size\`, and \`lastModified\` timestamp into one string, since two genuinely different files sharing all three values at once is vanishingly unlikely, while hashing every byte of every file just to compare them would be needless work for a client-side check like this one.\n\nEvery incoming file is checked against a \`Set\` built from every file already added, and — this is the detail that's easy to get wrong — newly accepted files are added to that same \`existingSignatures\` Set as they're processed, not only checked against the pre-existing list. Without that, selecting the identical file twice within a single multi-select dialog (dragging the same file into the selection twice, which some file pickers allow) would let both copies through, since neither would exist in the list yet at comparison time.\n\nThe warning message is built from an actual list of the skipped file names, not a generic "duplicate detected" — \`duplicates.push(file.name)\` collects every skipped file across the current selection so a user attaching ten files at once, three of which were already added, sees exactly which three were rejected rather than being left to guess.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Select a file', text: 'It\'s added to the list below with its size shown.' },
        { title: 'Open the file picker again and select the exact same file', text: 'A warning appears reading "Skipped duplicate: [filename]" — it isn\'t added a second time.' },
        { title: 'Select a mix of new and already-added files at once', text: 'The new ones are added normally, and the warning lists only the ones that were actually duplicates.' },
        { title: 'Select only genuinely new files', text: 'No warning appears at all — the message only shows when a real duplicate was caught.' },
      ],
    },
    features: [
      'Duplicates are matched on name, size, and last-modified time together, not name alone',
      'A newly accepted file is immediately added to the comparison set, catching duplicates within the same selection',
      'The warning names the exact files that were skipped, not a generic duplicate message',
      'The warning only appears when a real duplicate was caught, hidden otherwise',
      'The file input resets after every selection so choosing the same file again is always possible to test',
    ],
    useCases: [
      { icon: 'FORM', title: 'Document and attachment upload forms', desc: 'Prevents an accidentally doubled attachment, especially when a form allows adding files across several separate selections.' },
      { icon: 'DEV', title: 'Bulk data import tools', desc: 'Pair with [bootstrap-csv-import-preview](/ui-snippets/bootstrap-csv-import-preview/) to catch a re-uploaded file before it ever gets to row-level validation.' },
      { icon: 'DEV', title: 'Screenshot-driven bug reports', desc: 'Combine with [bootstrap-paste-to-upload](/ui-snippets/bootstrap-paste-to-upload/) so a pasted screenshot goes through the same duplicate check as a browsed file.' },
      { icon: 'APP', title: 'Bulk import and data-loading tools', desc: 'Catches an operator re-selecting a file they already queued for import earlier in the same session.' },
      { icon: 'LEARN', title: 'Learning cheap-but-effective duplicate detection', desc: 'A realistic example of when a lightweight signature is the right tool instead of reaching for full content hashing.' },
    ],
    faqs: [
      { q: 'Does this compare actual file contents?', a: 'No — it compares name, size, and last-modified timestamp together, which correctly catches the overwhelmingly common real case (re-selecting the same file) without the cost of reading and hashing every byte of every file client-side.' },
      { q: 'Could two different files ever be wrongly flagged as duplicates?', a: 'It\'s theoretically possible for two unrelated files to share an identical name, byte size, and modification timestamp down to the millisecond, but in practice this is extremely unlikely for files someone is deliberately attaching to the same form.' },
      { q: 'What happens if I select the same file twice within one file-picker dialog?', a: 'It\'s still caught — each file in the current selection is added to the comparison Set as it\'s processed, so the second occurrence in the same batch is checked against the first one already added moments earlier.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the added files array in component state, and run the same signature-based Set comparison inside your change handler before merging new files into that state — no other logic needs to change.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a real content-hash check (using the SubtleCrypto API to hash each file's bytes) for cases where name/size/lastModified matching isn't strict enough, or to add a "Replace existing" option letting a user intentionally re-add a file that overwrites the previous one instead of being silently skipped.`,
      prompt: `Build a Bootstrap 5.3 file input with duplicate detection, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A multiple file input that maintains a running list of attached files, rendered below it with each file's name and size.
- Build a signature for each file from its name, size, and lastModified timestamp combined, and use it to detect whether an incoming file has already been added.
- A newly accepted file must be added to the set used for duplicate comparison immediately, so that selecting the same file twice within a single multi-file selection dialog is also caught, not just across separate selections.
- When one or more duplicates are caught in a selection, show a warning message naming exactly which file names were skipped, and hide the warning entirely when a selection contains no duplicates.
- Reset the file input's value after every change so the same file can be re-selected to test the duplicate detection again.`,
    },
  },
};

export default bootstrapDuplicateFileDetectionUpload;
