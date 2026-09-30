const bootstrapImageUploadPreview = {
  id: 'bootstrap-image-upload-preview',
  title: 'Bootstrap Image Upload with Preview',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsimg-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Upload images</h5>
        <span class="badge text-bg-dark" id="bsimgCount">0 selected</span>
      </div>

      <label class="btn btn-outline-dark w-100 fw-semibold mb-3" for="bsimgInput">
        Choose images
        <input type="file" id="bsimgInput" class="d-none" accept="image/*" multiple>
      </label>

      <div class="row g-2" id="bsimgGrid"></div>
      <p class="small text-muted text-center mt-3 mb-0 d-none" id="bsimgEmpty">No images selected yet.</p>
    </div>
  </div>
</div>`,
  css: `.bsimg-card { width: 440px; border: 1px solid #eceef1; border-radius: 14px; }
.bsimg-thumb { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 1 / 1; background: #f1f3f5; }
.bsimg-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bsimg-remove { position: absolute; top: 4px; right: 4px; width: 22px; height: 22px; border-radius: 50%; background: rgba(0,0,0,.6); color: #fff; border: 0; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.bsimg-remove:hover { background: #dc3545; }`,
  js: `const input = document.getElementById('bsimgInput');
const grid = document.getElementById('bsimgGrid');
const countBadge = document.getElementById('bsimgCount');
const emptyMsg = document.getElementById('bsimgEmpty');

// Each entry pairs the original File with the object URL created for it, so
// that URL can be revoked individually when that specific image is removed.
let entries = [];
let nextId = 1;

function updateCount() {
  countBadge.textContent = entries.length + ' selected';
  emptyMsg.classList.toggle('d-none', entries.length > 0);
}

function render() {
  grid.innerHTML = '';
  entries.forEach(entry => {
    const col = document.createElement('div');
    col.className = 'col-4';
    col.innerHTML =
      '<div class="bsimg-thumb">' +
        '<img src="' + entry.url + '" alt="' + entry.file.name + '">' +
        '<button type="button" class="bsimg-remove" data-id="' + entry.id + '" aria-label="Remove image">&times;</button>' +
      '</div>';
    grid.appendChild(col);
  });
  updateCount();
}

input.addEventListener('change', () => {
  Array.from(input.files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    entries.push({ id: nextId++, file, url });
  });
  input.value = '';
  render();
});

grid.addEventListener('click', e => {
  const btn = e.target.closest('.bsimg-remove');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const entry = entries.find(en => en.id === id);
  if (entry) {
    // Releasing the object URL frees the browser-held reference to the
    // in-memory blob as soon as its thumbnail is no longer shown.
    URL.revokeObjectURL(entry.url);
  }
  entries = entries.filter(en => en.id !== id);
  render();
});

updateCount();`,

  seo: {
    title: 'Bootstrap Image Upload with Preview — Free HTML CSS Snippet',
    description: 'A real Bootstrap 5.3 multi-image upload with live object URL thumbnails, a running count badge, and per-image removal with URL cleanup. Exports to React & Vue.',
    about: {
      title: 'Bootstrap Image Upload with Preview — HTML, CSS & JavaScript',
      description: `The upload control here is a Bootstrap \`btn btn-outline-dark\` styled as a \`<label>\` wrapping a hidden \`<input type="file" accept="image/*" multiple>\` — clicking the visible button opens the native picker for free because a \`<label>\` associated with a file input triggers it automatically, no JavaScript click-forwarding required. On the \`change\` event, each selected \`File\` is filtered through \`file.type.startsWith('image/')\` to silently skip any non-image file a user might select despite the \`accept\` filter (which is only a browser-level hint, not a hard guarantee), and for every accepted image, \`URL.createObjectURL(file)\` generates a local blob URL that can be dropped straight into an \`<img src>\` without ever reading the file's bytes into JavaScript.\n\nEach accepted image is stored as an \`{ id, file, url }\` object in the module-level \`entries\` array, with \`id\` coming from an incrementing \`nextId\` counter rather than the array index — that distinction matters because array indexes shift every time an earlier image is removed, which would make a stale index-based remove button silently delete the wrong image after a prior removal. \`render()\` rebuilds a Bootstrap \`row g-2\` grid of \`col-4\` thumbnails from \`entries\` on every change, and a single delegated click listener on \`#bsimgGrid\` finds the clicked \`.bsimg-remove\` button via \`closest()\`, reads its stable \`data-id\`, and looks up the matching entry.\n\nThe non-obvious correctness detail this snippet is built around is cleanup: every object URL created with \`URL.createObjectURL\` stays alive in the browser's memory, pinning the underlying blob, until it is explicitly released with \`URL.revokeObjectURL\` or the document unloads. Removing a thumbnail from the grid without revoking its URL would be a real memory leak in a page that stays open a long time — a user adding and removing dozens of large images in one session would otherwise accumulate blob references indefinitely. This snippet revokes the specific URL for the entry being removed at the exact moment it's filtered out of \`entries\`, not in a batch cleanup elsewhere, so memory is freed image-by-image as the user actually removes them.\n\nEach \`.bsimg-thumb\` is a fixed \`aspect-ratio: 1 / 1\` box with \`object-fit: cover\` on the \`<img>\`, so portrait, landscape, and square source images all crop to a consistent square tile without distortion — a detail that matters because real photo uploads rarely arrive pre-cropped to a uniform ratio. The running count badge and the "No images selected yet" empty-state message are both driven by one \`updateCount()\` function called after every add or remove, so the two states can never disagree about whether the grid is empty.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A card appears with a "Choose images" button, a "0 selected" badge, and a "No images selected yet" message.' },
        { title: 'Click Choose images and pick several photos', text: 'The native file picker opens; after confirming, square thumbnails appear immediately in a grid.' },
        { title: 'Check the badge in the top-right corner', text: 'It updates to show the exact running count, e.g. "4 selected".' },
        { title: 'Hover a thumbnail and click its × button', text: 'That specific image disappears from the grid instantly, and the count badge decreases by one.' },
        { title: 'Add more images after removing some', text: 'New thumbnails append correctly without disturbing the remaining ones or reusing a stale identifier.' },
        { title: 'Remove every image', text: 'The grid empties and the "No images selected yet" message reappears alongside a "0 selected" badge.' },
      ],
    },
    features: [
      'Native file picker triggered via a <label for> association, no manual click-forwarding JS needed',
      'accept="image/*" plus a JS-side file.type check so non-image files are silently ignored',
      'Live thumbnails rendered instantly from URL.createObjectURL, with no upload round-trip required',
      'Stable incrementing IDs per image instead of array indexes, so removal always targets the right image',
      'URL.revokeObjectURL called individually per image at the moment it is removed, preventing memory leaks',
      'Fixed 1:1 aspect-ratio thumbnails with object-fit: cover for consistent square crops of any source image',
      'Running "N selected" count badge and empty-state message kept in sync by one shared updateCount()',
      'Delegated click handling on the grid so newly rendered remove buttons need no re-binding',
    ],
    useCases: [
      { icon: 'FORM', title: 'Product listing and marketplace photo uploads', desc: 'Let sellers preview multiple product photos before submitting, similar in spirit to [bootstrap-offcanvas-cart](/ui-snippets/bootstrap-offcanvas-cart/) for the surrounding shopping UI.' },
      { icon: 'FORM', title: 'Profile picture and gallery upload forms', desc: 'A clean multi-image preview for user profile galleries or portfolio submission forms.' },
      { icon: 'APP', title: 'Admin content management screens', desc: 'Fits naturally into media libraries inside an [bootstrap-admin-dashboard-sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/)-style panel.' },
      { icon: 'LEARN', title: 'Learning object URL lifecycle management', desc: 'A focused, realistic example of createObjectURL paired correctly with revokeObjectURL to avoid a common memory leak.' },
      { icon: 'STAR', title: 'General-purpose file uploads without previews', desc: 'For arbitrary (non-image) files, pair this pattern conceptually with [bootstrap-file-upload-drag-drop](/ui-snippets/bootstrap-file-upload-drag-drop/) instead.' },
    ],
    faqs: [
      { q: 'Are the images actually uploaded to a server?', a: 'No — this is a front-end preview only. The thumbnails are rendered locally from URL.createObjectURL, which points at the file still sitting in the browser\'s memory; a real implementation would send each File object to your server via fetch and FormData separately from the preview logic.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, store entries in useState and call URL.revokeObjectURL inside a useEffect cleanup function when an entry is removed or the component unmounts; in Vue, do the same revocation inside onBeforeUnmount or a watcher; in Angular, revoke object URLs in ngOnDestroy so no blob references survive the component\'s lifecycle.' },
      { q: 'Why not just use the array index to identify each image for removal?', a: 'Because removing entry 2 out of 5 shifts every later index down by one — a remove button rendered with a hardcoded index would then target the wrong image on a second click. This snippet assigns a stable, never-reused id via an incrementing counter so a remove button always maps to the correct entry regardless of prior removals.' },
      { q: 'What happens if I select a non-image file?', a: 'The accept="image/*" attribute hints the OS file picker to show mostly images, but a user can still override that filter; the change handler additionally checks file.type.startsWith(\'image/\') in JavaScript and silently skips anything that fails that check, so no broken thumbnail is ever created.' },
      { q: 'Does removing a thumbnail actually free memory?', a: 'Yes — URL.revokeObjectURL(entry.url) is called for that specific entry at the moment it is filtered out of the entries array, releasing the browser\'s reference to that blob immediately rather than waiting for a page unload or leaking it for the rest of the session.' },
      { q: 'How would I restyle the thumbnail grid with Tailwind?', a: 'Replace the Bootstrap row g-2/col-4 grid with a Tailwind grid grid-cols-3 gap-2 container, and rebuild .bsimg-thumb as a Tailwind aspect-square rounded-lg overflow-hidden bg-gray-100 div with an object-cover image inside — the JS logic for creating and revoking object URLs stays identical.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add drag-to-reorder for the thumbnail grid, or a max-image-count limit that disables the Choose images button once reached. It's also worth asking for a lightbox that opens a full-size preview when a thumbnail is clicked.`,
      prompt: `Build a Bootstrap 5.3 multiple image upload component with live thumbnail previews, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the card, button, badge, and grid layout, not custom CSS made to resemble Bootstrap.

Requirements:
- A Bootstrap-styled button (a <label> wrapping a hidden <input type="file" accept="image/*" multiple>) that opens the native file picker.
- Selecting images must render live square thumbnails immediately using URL.createObjectURL, laid out in a Bootstrap grid (row/col classes), each cropped consistently via CSS object-fit: cover regardless of the source image's original aspect ratio.
- Each thumbnail must have a small remove (x) button that deletes only that specific image from the grid, using a stable identifier rather than a shifting array index, so removals are always correct after previous removals.
- Removing a thumbnail must call URL.revokeObjectURL on that image's specific object URL to avoid leaking memory.
- A badge must show a live running count of selected images (e.g. "4 selected"), and an empty-state message must appear when no images are selected, both always in sync with the actual grid contents.
- Non-image files selected despite the accept filter must be silently ignored via a file.type check in JavaScript.`,
    },
  },
};

export default bootstrapImageUploadPreview;
