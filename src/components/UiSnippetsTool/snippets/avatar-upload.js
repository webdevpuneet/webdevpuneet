const avatarUpload = {
  id: 'avatar-upload',
  title: 'Avatar Upload',
  category: 'forms',
  lastmod: '2026-10-29',
  html: `<div class="au" id="auCard">
  <div class="au-banner"></div>
  <div class="au-body">
    <label class="au-ring" title="Upload a profile photo">
      <input type="file" class="au-input" accept="image/*" aria-label="Upload a profile photo">
      <img class="au-img" alt="Your profile photo" hidden>
      <span class="au-placeholder">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </span>
      <span class="au-drop">Drop here</span>
      <span class="au-edit">
        <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </span>
    </label>

    <h2 class="au-name">Profile photo</h2>
    <p class="au-hint" id="auHint">Drag &amp; drop or browse. JPG, PNG or WebP, up to 5 MB.</p>
    <p class="au-error" id="auError" role="alert" hidden></p>

    <div class="au-actions">
      <button type="button" class="au-btn" id="auPick">Upload photo</button>
      <button type="button" class="au-remove" hidden>Remove</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: radial-gradient(circle at 20% 10%, #e0e7ff, transparent 45%), #f1f5f9;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.au {
  width: 100%; max-width: 340px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(30, 41, 59, 0.14), 0 2px 6px rgba(30, 41, 59, 0.06);
  text-align: center;
}
.au-banner {
  height: 96px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6 55%, #ec4899);
}
.au-body { padding: 0 28px 28px; }

/* Avatar ring sits half over the banner */
.au-ring {
  position: relative;
  width: 124px; height: 124px;
  margin: -62px auto 16px;
  border-radius: 50%;
  background: #eef2ff;
  border: 5px solid #fff;
  box-shadow: 0 0 0 2px #c7d2fe, 0 10px 24px rgba(79, 70, 229, 0.25);
  display: grid; place-items: center;
  cursor: pointer; overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}
.au-ring:hover { transform: scale(1.03); box-shadow: 0 0 0 2px #818cf8, 0 12px 28px rgba(79, 70, 229, 0.32); }
.au-ring:focus-within { box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.45), 0 10px 24px rgba(79, 70, 229, 0.25); }

.au-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.au-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

.au-placeholder svg { width: 46px; height: 46px; fill: none; stroke: #818cf8; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }

/* Hover overlay with the camera icon */
.au-edit {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  background: rgba(30, 27, 75, 0.5);
  opacity: 0; transition: opacity 0.2s;
}
.au-edit svg { width: 28px; height: 28px; fill: none; stroke: #fff; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.au-ring:hover .au-edit { opacity: 1; }

/* Shown only while a file is dragged over the card */
.au-drop {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  background: rgba(99, 102, 241, 0.88);
  color: #fff; font-size: 13px; font-weight: 700;
  opacity: 0; pointer-events: none; transition: opacity 0.15s;
}
.au.dragging .au-drop { opacity: 1; }
.au.dragging .au-ring { transform: scale(1.06); }

.au-ring.has-img .au-placeholder { display: none; }

.au-name { font-size: 19px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
.au-hint { font-size: 13px; line-height: 1.5; color: #64748b; margin: 6px 0 0; }
.au-error { font-size: 13px; font-weight: 600; color: #dc2626; background: #fef2f2; border-radius: 10px; padding: 8px 12px; margin-top: 12px; }

.au-actions { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 20px; }
.au-btn {
  font: inherit; font-size: 14px; font-weight: 700; color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 12px; padding: 10px 20px; cursor: pointer;
  box-shadow: 0 8px 18px rgba(99, 102, 241, 0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.au-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 22px rgba(99, 102, 241, 0.42); }
.au-btn:focus-visible { outline: 3px solid rgba(99, 102, 241, 0.4); outline-offset: 2px; }
.au-remove {
  font: inherit; font-size: 14px; font-weight: 600; color: #475569;
  background: #f1f5f9; border: none; border-radius: 12px; padding: 10px 16px; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.au-remove:hover { background: #fee2e2; color: #dc2626; }`,
  js: `function initAvatarUpload() {
  const card = document.querySelector('.au');
  if (!card) return;                       // not mounted yet
  const ring = card.querySelector('.au-ring');
  const input = card.querySelector('.au-input');
  const img = card.querySelector('.au-img');
  const pickBtn = card.querySelector('.au-btn');
  const removeBtn = card.querySelector('.au-remove');
  const hint = card.querySelector('.au-hint');
  const error = card.querySelector('.au-error');
  const MAX_BYTES = 5 * 1024 * 1024;       // 5 MB
  const DEFAULT_HINT = hint.textContent;
  let currentUrl = null;

  function formatSize(bytes) {
    return bytes < 1048576 ? Math.round(bytes / 1024) + ' KB' : (bytes / 1048576).toFixed(1) + ' MB';
  }

  function showError(msg) { error.textContent = msg; error.hidden = false; }

  function setFile(file) {
    error.hidden = true;
    if (!file.type.startsWith('image/')) return showError('Please choose an image file.');
    if (file.size > MAX_BYTES) return showError('That image is ' + formatSize(file.size) + '. Max size is 5 MB.');
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(file);     // instant local preview, no upload
    img.src = currentUrl;
    img.hidden = false;
    ring.classList.add('has-img');
    hint.textContent = file.name + ' · ' + formatSize(file.size);
    pickBtn.textContent = 'Change photo';
    removeBtn.hidden = false;
  }

  input.addEventListener('change', () => { if (input.files[0]) setFile(input.files[0]); });
  pickBtn.addEventListener('click', () => input.click());

  removeBtn.addEventListener('click', () => {
    if (currentUrl) { URL.revokeObjectURL(currentUrl); currentUrl = null; }
    input.value = '';
    img.hidden = true; img.removeAttribute('src');
    ring.classList.remove('has-img');
    hint.textContent = DEFAULT_HINT;
    pickBtn.textContent = 'Upload photo';
    error.hidden = true;
    removeBtn.hidden = true;
  });

  // Drag and drop anywhere on the card
  ['dragenter', 'dragover'].forEach((t) => card.addEventListener(t, (e) => {
    e.preventDefault(); card.classList.add('dragging');
  }));
  ['dragleave', 'drop'].forEach((t) => card.addEventListener(t, (e) => {
    e.preventDefault();
    if (t === 'dragleave' && card.contains(e.relatedTarget)) return;
    card.classList.remove('dragging');
  }));
  card.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (!file) return;
    try { input.files = e.dataTransfer.files; } catch (err) {}   // keeps the file in the form
    setFile(file);
  });
}

// Run after the DOM mounts (framework exports run snippet JS before render)
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAvatarUpload);
else requestAnimationFrame(initAvatarUpload);`,

  seo: {
    title: 'Avatar Upload — Profile Picture Preview Snippet',
    description: 'Profile picture upload card with drag-and-drop, instant preview, a 5 MB size check and a remove button, built on a real file input. Copy the HTML, CSS & JS.',
    about: {
      title: 'Avatar Upload — Circular Dropzone, Instant Preview & Camera Edit Badge',
      description: `An avatar upload — a circular control for choosing a profile picture with an instant preview — is one of the most-searched form snippets because nearly every app with user accounts (and every [profile card](/ui-snippets/profile-card/)) needs one, and doing it well (preview, remove, no broken images, no memory leaks) takes more than a bare file input. This snippet is a complete, accessible avatar uploader: a **circular dropzone** with a placeholder icon, an **instant local preview** of the chosen image, a **camera edit badge**, and a **remove button** — all built on a real \`<input type="file">\` so it submits and is keyboard-operable.

**Instant preview with createObjectURL**

The moment a user picks an image, it appears in the circle — no upload, no server round-trip. The \`change\` handler calls \`URL.createObjectURL(file)\`, which creates a temporary local URL pointing at the chosen file in memory, and sets it as the \`<img>\` source. This is the standard, efficient way to preview a selected file: it is instant and does not read the whole file into a base64 string the way \`FileReader\` does. The image is shown with \`object-fit: cover\` so any aspect ratio fills the circle without distortion — a portrait or landscape photo is cropped to a clean square avatar automatically (for manual framing, add the [image cropper](/ui-snippets/image-cropper/)).

**Avoiding the memory leak (revokeObjectURL)**

Object URLs hold the file in memory until you release them, so a naive implementation that calls \`createObjectURL\` on every change slowly leaks memory. This snippet tracks the current URL in a \`currentUrl\` variable and calls \`URL.revokeObjectURL(currentUrl)\` before creating a new one (when the user picks a different photo) and when removing the photo. This cleanup is the detail most avatar-upload tutorials miss, and it is what makes the component safe to use repeatedly. It is the object-URL equivalent of clearing up after yourself.

**A profile-card presentation**

The uploader is styled as a small profile card: a gradient banner with the avatar ring overlapping its lower edge (a negative top margin), so even the empty state looks like a finished profile header. The ring has a white border and a soft indigo glow, with an "Upload photo" button beneath it for visitors who don't realise the circle is clickable.

**Empty, hover, drag and filled states**

The control has four visual states. **Empty**: a person-silhouette placeholder inside the ring. **Hover**: the ring lifts slightly and a dark overlay with a camera icon fades in. **Dragging**: a file dragged over the card turns the ring indigo with a "Drop here" label. **Filled**: a \`.has-img\` class hides the placeholder, the file name and size replace the hint text, and the button changes to "Change photo".

**Drag and drop, with validation**

The card listens for \`dragenter\`, \`dragover\`, \`dragleave\` and \`drop\`. On drop, the file is assigned back to the real input (\`input.files = e.dataTransfer.files\`) so it still submits with the form, then it goes through the same \`setFile()\` function as a normal pick. That function rejects non-image files and anything over 5 MB (change \`MAX_BYTES\`) with an inline \`role="alert"\` message, before any preview is created.

**The remove control**

Letting users undo a choice is essential. A "Remove photo" button (hidden until a photo is set) clears everything: it revokes the object URL, resets the file input (\`input.value = ''\`), hides and unsets the \`<img>\`, drops the \`.has-img\` class back to the empty placeholder state, and hides itself. Resetting \`input.value\` is the correct way to clear a file input (you cannot set its value for security reasons, but you can clear it), which also means picking the *same* file again afterward still fires a \`change\` event.

**Built on a real, accessible file input**

The whole control is a \`<label>\` wrapping a hidden-but-present \`<input type="file" accept="image/*">\`. The input is hidden with \`opacity: 0\` and 1px size (not \`display: none\`, which would remove it from the tab order), so it stays focusable and keyboard-operable, and \`.au-ring:focus-within\` shows a focus ring when it is focused. Because it is a genuine file input, the avatar is included in a normal form submit under its \`name\`, the OS file picker works, and screen readers announce it as a file upload. The \`accept="image/*"\` attribute filters the picker to images, and the handler double-checks \`file.type.startsWith('image/')\` before previewing.

**Customizing the uploader**

Re-theme by changing the banner gradient, the ring glow, the hover overlay, the button color, and the focus ring. Resize by changing the ring's width/height (keep it a circle) and scaling the badge. To enforce a max file size, check \`file.size\` in the handler and show an error if it is too large. To crop to a square before upload, pair this with a cropping step, or rely on \`object-fit: cover\` plus a server-side crop. To actually upload, send the \`file\` (from \`input.files[0]\`) via \`fetch\` with \`FormData\` when the form submits — the preview and the upload are independent, so the UI stays responsive. The structure — label, hidden input, img, placeholder, badge, remove — stays the same.

**Accessibility and behaviour notes**

Keep the native input so the control is keyboard-focusable and submits with the form; \`:focus-within\` makes keyboard focus visible. Give the \`<label>\` a \`title\` or visually-hidden text like "Upload a profile photo" so its purpose is announced (the placeholder icon alone is not descriptive). When a photo is loaded, set a meaningful \`alt\` on the \`<img>\` (e.g. "Your profile photo") rather than leaving it empty, so screen-reader users know an image is present. Because the preview is purely local until submit, nothing is uploaded or stored without the user completing the form — a privacy-friendly default.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy the control', text: 'Copy the .au card with its .au-ring label, hidden <input type="file">, <img> preview, placeholder, hover overlay, and the Upload and Remove buttons, plus the script.' },
        { title: 'Keep the object-URL cleanup', text: 'The handler revokes the previous URL.createObjectURL before making a new one (and on remove). Keep this — it prevents a memory leak from repeated previews.' },
        { title: 'Wire up the actual upload', text: 'On form submit, send input.files[0] via fetch with FormData. The local preview is independent, so the UI stays instant.' },
        { title: 'Set the size limit', text: 'setFile() already rejects non-images and files over MAX_BYTES (5 MB), showing an inline error. Change the constant to suit your server.' },
        { title: 'Try drag and drop', text: 'Drag an image onto the card. It highlights, then previews the file and shows its name and size.' },
        { title: 'Re-theme and resize', text: 'Change the banner gradient, ring glow, hover overlay, button, and focus ring; resize by changing the ring width/height (keep it circular).' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Profile-card layout: gradient banner, overlapping avatar ring, and an Upload / Change photo button',
      'Drag and drop onto the card, with a "Drop here" highlight while dragging',
      'Built-in validation: image type check and a 5 MB size limit with an inline error message',
      'Shows the chosen file name and size once a photo is set',
      'Circular dropzone with a placeholder icon, hover, and filled states',
      'Instant local image preview via URL.createObjectURL (no upload needed)',
      'object-fit: cover crops any photo to a clean square avatar',
      'Revokes the previous object URL on change and remove — no memory leak',
      'Camera overlay on hover that signals you can change the photo',
      'Remove button resets the input, preview, and state correctly',
      'Built on a real <input type="file" accept="image/*"> — submits and is keyboard-operable',
      'focus-within ring for keyboard users; hidden input kept in the tab order',
      'Ready to wire to a real upload via fetch + FormData on submit',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'PEOPLE', title: 'Profile photo upload',              desc: 'The standard avatar picker in account settings and onboarding — choose a photo, preview it instantly, change or remove it.' },
      { icon: 'APP',    title: 'Team member / org setup',           desc: 'Upload member avatars or an organization logo with an immediate preview before saving the form.' },
      { icon: 'IMG',    title: 'Any single-image picker',           desc: 'Reuse the circle-or-square preview pattern for cover photos, thumbnails, or any single-image upload field.' },
      { icon: 'LEARN',  title: 'Learn createObjectURL previews',    desc: 'See the efficient way to preview a chosen file instantly and, crucially, how to revoke object URLs to avoid leaking memory.' },
      { icon: 'CODE',   title: 'Reusable upload component',         desc: 'Drop the label/input/preview/remove structure into your design system as the standard avatar field across the app.' },
      { icon: 'ACCESS', title: 'Accessible image upload',          desc: 'Keeps the native file input so the OS picker, keyboard focus, screen-reader announcement, and form submission all work.' },
      { icon: 'CODE', title: 'Related: Buy Now Pay Later Selector', desc: 'See the [Buy Now Pay Later Selector](/ui-snippets/bnpl-payment-selector/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I preview an image before uploading it?', a: 'In the file input\'s change handler, call URL.createObjectURL(file) to get a temporary local URL and set it as an <img> src. The preview is instant and does not upload anything or read the file into a base64 string like FileReader does. Use object-fit: cover so any photo fills the avatar circle cleanly.' },
      { q: 'Why call URL.revokeObjectURL?', a: 'Object URLs keep the file in memory until released. If you call createObjectURL on every change without revoking the old one, you leak memory. This snippet tracks the current URL and revokes it before creating a new one and when the photo is removed — the cleanup most tutorials skip.' },
      { q: 'How do I clear or remove the selected photo?', a: 'Revoke the object URL, set input.value = "" to reset the file input, hide and unset the <img>, and remove the filled-state class. Resetting input.value is the correct way to clear a file input and also lets the same file be re-selected afterward.' },
      { q: 'How do I actually upload the photo to a server?', a: 'On form submit, take input.files[0], put it in a FormData, and POST it with fetch. The local preview is independent of the upload, so the UI stays instant; the file is only sent when the user completes the form.' },
      { q: 'Is the avatar uploader accessible?', a: 'Yes. It keeps a real <input type="file"> (hidden via opacity, not display:none) so it is keyboard-focusable and submits with the form, with a focus-within ring. Add a title or visually-hidden label to the control and a meaningful alt on the loaded image so screen-reader users understand its purpose.' },
      { q: 'Can I use this avatar upload in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, hold the preview URL in useState, create it in onChange and revoke it in a useEffect cleanup, and render the <img> or placeholder based on whether a URL exists.' },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the file input is just decoration, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the input is hidden with opacity and a 1px size instead of display: none, and why revokeObjectURL is called both before creating a new preview and on removal. The same assistant can help you optimize it — ask whether checking file.type.startsWith("image/") is sufficient validation for production, or whether a file.size check and a maximum-dimension check should happen before createObjectURL is ever called. It's also a great partner for extending the uploader: ask it to add drag-and-drop support onto the same dropzone, wire in a square-crop step before the preview is finalized, or add an upload progress ring around the avatar once the real fetch/FormData submission is wired up. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a circular "avatar upload" control in plain HTML, CSS, and JavaScript using a real file input — no third-party cropper or upload library.

Requirements:
- A label element wrapping a genuinely present (not display:none) file input restricted to accept="image/*", hidden visually via near-zero opacity and a 1px size so it stays in the tab order and keyboard-focusable, with a visible focus ring on the wrapping circle when the input has focus (using :focus-within).
- On file selection, validate that the chosen file's type starts with "image/", then generate an instant local preview using URL.createObjectURL (not FileReader/base64), setting it as the source of an img element that uses object-fit: cover to crop any aspect ratio into a clean circle.
- Track the currently active object URL in a variable and call URL.revokeObjectURL on it both immediately before creating a new preview URL and when the photo is removed, so repeated selections never leak memory.
- The control must visually shift between three states driven by a single CSS class: an empty state with a placeholder icon, a hover state that reveals a camera overlay, and a filled state where the placeholder hides and the button text changes to "Change photo".
- A "remove photo" button, hidden until a photo is set, must revoke the object URL, reset the file input's value (not attempt to set it), clear and hide the img element, and revert the control back to its empty state.
- Ensure picking the exact same file a second time in a row still triggers a fresh change event and a fresh preview, which requires the input's value to actually be cleared on removal.`,
    },
  },
};

export default avatarUpload;
