const bootstrapPasteToUpload = {
  id: 'bootstrap-paste-to-upload',
  title: 'Bootstrap Paste-to-Upload (Clipboard Image Paste)',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bspaste-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Attach a screenshot</label>
      <div class="bspaste-zone" id="bspasteZone" tabindex="0">
        <div id="bspasteEmpty">
          <p class="mb-1">&#128203;</p>
          <p class="small mb-0">Click here, then press <kbd>Ctrl</kbd>+<kbd>V</kbd> to paste an image</p>
        </div>
        <div class="d-none" id="bspastePreviewWrap">
          <img id="bspastePreview" alt="Pasted image preview">
          <button type="button" class="btn btn-sm btn-outline-danger mt-2" id="bspasteRemove">Remove</button>
        </div>
      </div>
      <p class="small text-muted mt-2 mb-0" id="bspasteStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bspaste-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bspaste-zone {
  border: 2px dashed #d1d5db; border-radius: 10px; padding: 24px;
  text-align: center; color: #6b7280; cursor: text; transition: border-color .15s, background .15s;
}
.bspaste-zone:focus { outline: none; border-color: #6366f1; background: #f8f9ff; }
#bspastePreview { max-width: 100%; max-height: 160px; border-radius: 8px; display: block; margin: 0 auto; }`,
  js: `const zone = document.getElementById('bspasteZone');
const empty = document.getElementById('bspasteEmpty');
const previewWrap = document.getElementById('bspastePreviewWrap');
const previewImg = document.getElementById('bspastePreview');
const status = document.getElementById('bspasteStatus');
let currentUrl = null;

function showImage(blob) {
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl = URL.createObjectURL(blob);
  previewImg.src = currentUrl;
  empty.classList.add('d-none');
  previewWrap.classList.remove('d-none');
  status.textContent = 'Image pasted (' + Math.round(blob.size / 1024) + ' KB).';
  status.className = 'small text-success mt-2 mb-0';
}

zone.addEventListener('paste', e => {
  const items = e.clipboardData ? e.clipboardData.items : [];
  const imageItem = Array.from(items).find(item => item.type.startsWith('image/'));
  if (!imageItem) {
    status.textContent = 'No image found on the clipboard — copy an image first, then paste.';
    status.className = 'small text-muted mt-2 mb-0';
    return;
  }
  const blob = imageItem.getAsFile();
  showImage(blob);
  e.preventDefault();
});

document.getElementById('bspasteRemove').addEventListener('click', () => {
  if (currentUrl) { URL.revokeObjectURL(currentUrl); currentUrl = null; }
  previewImg.src = '';
  previewWrap.classList.add('d-none');
  empty.classList.remove('d-none');
  status.textContent = '';
  zone.focus();
});`,

  seo: {
    title: 'Bootstrap Paste-to-Upload (Clipboard Image Paste) — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 upload zone that accepts a screenshot pasted directly from the clipboard with Ctrl+V — reading it from the genuine ClipboardEvent, previewing it, and cleaning up its own object URL.',
    about: {
      title: 'Bootstrap Paste-to-Upload (Clipboard Image Paste) — HTML, CSS & JavaScript',
      description: `Pasting only works because the drop zone is a real, focusable element — \`tabindex="0"\` gives it something a drag-and-drop-only zone lacks: the ability to actually receive keyboard focus, which is a prerequisite for a \`paste\` event to ever fire on it at all. Clicking the zone focuses it, and only then does \`Ctrl+V\`/\`Cmd+V\` dispatch a genuine \`ClipboardEvent\` the listener can read from.\n\nThe listener reads \`e.clipboardData.items\`, finds the first item whose \`type\` starts with \`image/\`, and calls \`.getAsFile()\` to get a real \`Blob\` — this correctly ignores a clipboard holding plain copied text (which has no matching item) with an explicit, honest message rather than silently doing nothing or throwing an error.\n\n\`showImage()\` revokes any previous object URL with \`URL.revokeObjectURL(currentUrl)\` before creating a new one, specifically so pasting a second image doesn't leak the first image's URL — the same object-URL cleanup discipline this collection's [bootstrap-image-upload-preview](/ui-snippets/bootstrap-image-upload-preview/) applies per-thumbnail, applied here to a single always-current preview instead of a list.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy any image', text: 'Take a screenshot, or copy an image from another app or webpage, onto your system clipboard.' },
        { title: 'Click the dashed paste zone on this page', text: 'It visually focuses with a highlighted border, ready to receive a paste.' },
        { title: 'Press Ctrl+V (or Cmd+V on Mac)', text: 'The pasted image appears as a preview immediately, along with its size in KB.' },
        { title: 'Try pasting plain copied text instead', text: 'A clear message explains no image was found, rather than doing nothing silently.' },
        { title: 'Click "Remove"', text: 'The preview clears, its object URL is released, and the zone returns to its empty, focused state ready for another paste.' },
      ],
    },
    features: [
      'Reads a real image directly from the browser\'s ClipboardEvent, no file picker required',
      'The drop zone is genuinely focusable (tabindex="0"), which is what makes it a valid paste target at all',
      'Explicitly detects and reports clipboard content with no image, instead of failing silently',
      'The previous object URL is revoked before a new one is created, so repeated pastes never leak memory',
      'Remove fully resets the preview and clipboard object URL, ready for another paste immediately',
    ],
    useCases: [
      { icon: 'DEV', title: 'Bug report and support ticket forms', desc: 'Pasting a screenshot directly is dramatically faster than saving it to disk first and browsing to it — pairs with [bootstrap-file-upload-drag-drop](/ui-snippets/bootstrap-file-upload-drag-drop/) as an alternate input method.' },
      { icon: 'APP', title: 'Design feedback and annotation tools', desc: 'A natural fit anywhere a user is likely to already have a screenshot on their clipboard mid-workflow.' },
      { icon: 'FORM', title: 'Chat and comment boxes accepting image attachments', desc: 'Lets a user paste an image straight into a message the same way many chat apps already support.' },
    ],
    faqs: [
      { q: 'Why does the zone need tabindex="0"?', a: 'Only a focused, focusable element receives a paste event through the standard clipboard shortcut — without tabindex, a plain div can never gain keyboard focus, so Ctrl+V would have nowhere to dispatch its ClipboardEvent to.' },
      { q: 'What happens if I paste plain text instead of an image?', a: 'The items array is searched for an entry whose type starts with "image/"; when none is found, the zone shows an explicit "no image found" message instead of silently ignoring the paste or throwing an error.' },
      { q: 'Does this work on mobile?', a: 'Clipboard paste support for images varies significantly across mobile browsers and is generally less reliable than on desktop — a real implementation should keep a traditional file input available as a fallback on touch devices.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Attach the paste listener to a ref\'d element in a mount hook, store the object URL in component state (revoking the previous one in the same setter, e.g. inside a state updater callback), and clean up on unmount to avoid a leaked URL if the component unmounts mid-preview.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to also accept a dragged-and-dropped image file on the same zone (combining paste and drag-and-drop into one input method), or to add a max-file-size check with a clear rejection message for an oversized pasted image.`,
      prompt: `Build a Bootstrap 5.3 paste-to-upload zone for clipboard images, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A dashed-border zone with tabindex="0" so it can receive keyboard focus, showing instructions to click it and press Ctrl+V/Cmd+V.
- Listen for a real "paste" event on the zone, reading e.clipboardData.items to find the first item whose type starts with "image/", and get it as a real Blob via .getAsFile().
- On a successful image paste, show it as a preview using URL.createObjectURL, along with its file size in KB, and reveal a Remove button.
- If the pasted clipboard content contains no image (e.g. plain copied text), show a clear message explaining that instead of doing nothing.
- Revoke the previous object URL before creating a new one on a second paste, and also revoke it when Remove is clicked, so no object URL is ever left un-revoked.`,
    },
  },
};

export default bootstrapPasteToUpload;
