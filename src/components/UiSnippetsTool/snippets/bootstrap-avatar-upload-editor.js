const bootstrapAvatarUploadEditor = {
  id: 'bootstrap-avatar-upload-editor',
  title: 'Bootstrap Avatar Upload Editor',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsavatar-card">
    <div class="card-body p-4 text-center">
      <div class="bsavatar-circle mb-3" id="bsavatarCircle">
        <span id="bsavatarInitials">PN</span>
        <img id="bsavatarImg" class="d-none" alt="Profile photo">
      </div>

      <input type="file" accept="image/*" class="d-none" id="bsavatarInput">
      <div class="d-flex justify-content-center gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsavatarChange">Change photo</button>
        <button type="button" class="btn btn-sm btn-outline-danger d-none" id="bsavatarRemove">Remove</button>
      </div>

      <button type="button" class="btn btn-dark btn-sm fw-bold mt-3 d-none" id="bsavatarSave">Save changes</button>
      <p class="small text-muted mt-3 mb-0" id="bsavatarStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bsavatar-card { width: 320px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsavatar-circle {
  width: 96px; height: 96px; border-radius: 50%; margin: 0 auto;
  background: linear-gradient(135deg, #818cf8, #6366f1); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font: 700 26px system-ui, sans-serif; overflow: hidden; position: relative;
}
.bsavatar-circle img { width: 100%; height: 100%; object-fit: cover; }`,
  js: `const input = document.getElementById('bsavatarInput');
const initials = document.getElementById('bsavatarInitials');
const imgEl = document.getElementById('bsavatarImg');
const changeBtn = document.getElementById('bsavatarChange');
const removeBtn = document.getElementById('bsavatarRemove');
const saveBtn = document.getElementById('bsavatarSave');
const status = document.getElementById('bsavatarStatus');

let objectUrl = null;
let dirty = false;

function markDirty() {
  dirty = true;
  saveBtn.classList.remove('d-none');
  status.textContent = '';
}

changeBtn.addEventListener('click', () => input.click());

input.addEventListener('change', () => {
  const file = input.files && input.files[0];
  if (!file) return;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);
  imgEl.src = objectUrl;
  imgEl.classList.remove('d-none');
  initials.classList.add('d-none');
  removeBtn.classList.remove('d-none');
  markDirty();
});

removeBtn.addEventListener('click', () => {
  if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
  imgEl.src = '';
  imgEl.classList.add('d-none');
  initials.classList.remove('d-none');
  removeBtn.classList.add('d-none');
  input.value = '';
  markDirty();
});

saveBtn.addEventListener('click', () => {
  dirty = false;
  saveBtn.classList.add('d-none');
  status.textContent = 'Profile photo saved.';
  status.className = 'small text-success mt-3 mb-0';
});`,

  seo: {
    title: 'Bootstrap Avatar Upload Editor — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 avatar editor — swap in a new photo, fall back cleanly to initials on removal, and a Save action that only appears once something has actually changed.',
    about: {
      title: 'Bootstrap Avatar Upload Editor — HTML, CSS & JavaScript',
      description: `The circular avatar has two mutually exclusive states — an initials fallback and an actual photo — and this snippet keeps exactly one visible at all times by toggling both together every time either changes: choosing a photo hides \`#bsavatarInitials\` and shows \`#bsavatarImg\`, and Remove reverses both in the same click handler rather than leaving a stale image element hidden underneath.\n\nA hidden native \`<input type="file">\` is triggered programmatically via \`input.click()\` from the visible "Change photo" button — this is the standard technique for styling a file input as a normal button, since a real \`<input type="file">\` can't be restyled directly across browsers with any real consistency.\n\nSave only appears once \`markDirty()\` has actually run, called from both selecting a new photo and removing the existing one — so accidentally opening the file picker and cancelling it (which never fires the \`change\` event) correctly leaves the Save button hidden, since nothing was actually changed. The object URL is revoked before every new one is created, in \`change\` and again in \`Remove\`, so switching photos or removing one repeatedly never accumulates unreleased memory.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A circular avatar shows initials ("PN") with no Save button visible.' },
        { title: 'Click "Change photo" and pick an image', text: 'The circle swaps to your photo, a Remove button appears, and Save reveals itself.' },
        { title: 'Click "Remove"', text: 'The circle reverts to initials, Remove disappears again, and Save is still shown since something changed.' },
        { title: 'Click "Save changes"', text: 'A green confirmation appears and the Save button hides itself until the next real change.' },
        { title: 'Open the file picker and cancel it without choosing a file', text: 'Nothing changes and Save stays hidden, since no actual photo change occurred.' },
      ],
    },
    features: [
      'Initials and photo states are always kept mutually exclusive, toggled together on every change',
      'The native file input is hidden and triggered via a normal styled button, a standard cross-browser technique',
      'Save only appears once a real change has happened, not just because the file picker was opened',
      'Every previous object URL is revoked before a new one is created, on both photo change and removal',
      'Removing a photo correctly resets the file input\'s own value, so the same file can be re-selected afterward',
    ],
    useCases: [
      { icon: 'FORM', title: 'Account and profile settings pages', desc: 'The standard "change your profile picture" pattern used across nearly every account settings screen.' },
      { icon: 'APP', title: 'Team member and user management admin panels', desc: 'Let an admin update a team member\'s avatar with the same clear save-when-dirty behavior.' },
      { icon: 'FORM', title: 'Onboarding flows collecting a profile photo', desc: 'Pairs with [bootstrap-image-crop-before-upload](/ui-snippets/bootstrap-image-crop-before-upload/) for a flow that also lets the user reposition and zoom before saving.' },
    ],
    faqs: [
      { q: 'Why hide the real file input instead of styling it directly?', a: 'Native file inputs render very differently across browsers and resist consistent styling; hiding it and triggering .click() from a normal, fully-stylable button is the standard, reliable way to get a custom-looking upload trigger.' },
      { q: 'Does cancelling the file picker show the Save button?', a: 'No — the change event only fires when a file is actually selected, so cancelling the picker leaves everything, including the hidden Save button, exactly as it was.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the object URL and a dirty boolean in component state, revoking the previous URL inside the same state-setting logic used for a new selection, and trigger the hidden input via a ref\'s .click() method from your styled button.' },
      { q: 'How would I connect Save to a real upload?', a: 'Inside the Save handler, upload the actual File object (kept from the change event, not just its object URL) to your backend, and only show the success message once that request resolves — a real network request should also handle and surface a failure state.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add drag-and-drop support directly onto the avatar circle as an alternative to clicking "Change photo", or to add a confirmation step before Remove when a photo (not just initials) is currently showing, since removing a real uploaded photo is more consequential than clearing an empty state.`,
      prompt: `Build a Bootstrap 5.3 avatar upload editor, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A circular avatar that shows a user's initials by default, and a hidden native file input triggered by a visible "Change photo" button.
- Selecting an image file swaps the circle to show that photo (using object-fit: cover) instead of the initials, and reveals a "Remove" button.
- Clicking "Remove" reverts the circle back to showing the initials, hides the Remove button again, and resets the file input so the same file could be re-selected.
- A "Save changes" button must stay hidden until either a new photo is selected or the photo is removed — opening and cancelling the file picker without selecting anything must not reveal it.
- Every previously created object URL must be revoked before a new one is created (on photo change) and when the photo is removed, so repeated changes never leak memory.`,
    },
  },
};

export default bootstrapAvatarUploadEditor;
