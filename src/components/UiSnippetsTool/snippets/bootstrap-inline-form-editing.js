const bootstrapInlineFormEditing = {
  id: 'bootstrap-inline-form-editing',
  title: 'Bootstrap Inline Form Editing',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsinline-card">
    <div class="card-body p-4">
      <h6 class="fw-bold mb-3">Profile</h6>

      <div class="bsinline-row" data-field="name" data-value="Dana Reyes">
        <span class="bsinline-label small text-muted">Name</span>
        <div class="bsinline-display">
          <span class="bsinline-value">Dana Reyes</span>
          <button type="button" class="btn btn-sm btn-link p-0 bsinline-edit">Edit</button>
        </div>
        <div class="bsinline-editor d-none">
          <input type="text" class="form-control form-control-sm">
          <div class="d-flex gap-2 mt-1">
            <button type="button" class="btn btn-sm btn-dark bsinline-save">Save</button>
            <button type="button" class="btn btn-sm btn-outline-secondary bsinline-cancel">Cancel</button>
          </div>
        </div>
      </div>

      <div class="bsinline-row" data-field="title" data-value="Engineering Lead">
        <span class="bsinline-label small text-muted">Title</span>
        <div class="bsinline-display">
          <span class="bsinline-value">Engineering Lead</span>
          <button type="button" class="btn btn-sm btn-link p-0 bsinline-edit">Edit</button>
        </div>
        <div class="bsinline-editor d-none">
          <input type="text" class="form-control form-control-sm">
          <div class="d-flex gap-2 mt-1">
            <button type="button" class="btn btn-sm btn-dark bsinline-save">Save</button>
            <button type="button" class="btn btn-sm btn-outline-secondary bsinline-cancel">Cancel</button>
          </div>
        </div>
      </div>

      <div class="bsinline-row" data-field="email" data-value="dana@acme.co">
        <span class="bsinline-label small text-muted">Email</span>
        <div class="bsinline-display">
          <span class="bsinline-value">dana@acme.co</span>
          <button type="button" class="btn btn-sm btn-link p-0 bsinline-edit">Edit</button>
        </div>
        <div class="bsinline-editor d-none">
          <input type="text" class="form-control form-control-sm">
          <div class="d-flex gap-2 mt-1">
            <button type="button" class="btn btn-sm btn-dark bsinline-save">Save</button>
            <button type="button" class="btn btn-sm btn-outline-secondary bsinline-cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsinline-card { width: 360px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsinline-row { padding: 8px 0; border-bottom: 1px solid #f1f2f5; }
.bsinline-row:last-child { border-bottom: none; }
.bsinline-label { display: block; margin-bottom: 2px; }
.bsinline-display { display: flex; justify-content: space-between; align-items: center; }
.bsinline-value { font-size: 14px; }`,
  js: `const rows = Array.from(document.querySelectorAll('.bsinline-row'));

// Only one row edits at a time — opening a new editor closes any other row
// that was already open, discarding its unsaved edit rather than leaving
// two editors open and ambiguous about which Save applies to what.
function closeAllExcept(exceptRow) {
  rows.forEach(row => {
    if (row === exceptRow) return;
    row.querySelector('.bsinline-editor').classList.add('d-none');
    row.querySelector('.bsinline-display').classList.remove('d-none');
  });
}

rows.forEach(row => {
  const display = row.querySelector('.bsinline-display');
  const editor = row.querySelector('.bsinline-editor');
  const input = editor.querySelector('input');
  const valueEl = row.querySelector('.bsinline-value');

  function openEditor() {
    closeAllExcept(row);
    input.value = row.dataset.value;
    display.classList.add('d-none');
    editor.classList.remove('d-none');
    input.focus();
    input.select();
  }

  function closeEditor() {
    editor.classList.add('d-none');
    display.classList.remove('d-none');
  }

  row.querySelector('.bsinline-edit').addEventListener('click', openEditor);

  row.querySelector('.bsinline-save').addEventListener('click', () => {
    const next = input.value.trim();
    if (next) {
      row.dataset.value = next;
      valueEl.textContent = next;
    }
    closeEditor();
  });

  row.querySelector('.bsinline-cancel').addEventListener('click', closeEditor);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') row.querySelector('.bsinline-save').click();
    if (e.key === 'Escape') closeEditor();
  });
});`,

  seo: {
    title: 'Bootstrap Inline Form Editing — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 click-to-edit profile — each field toggles between a display and an editor in place, only one editor ever open at a time, with Enter to save and Escape to cancel.',
    about: {
      title: 'Bootstrap Inline Form Editing — HTML, CSS & JavaScript',
      description: `Each row stores its own current value in a \`data-value\` attribute on the row itself, which is what lets \`openEditor()\` always seed the input with the *last saved* value rather than whatever text happens to be lingering in the input from a previous, cancelled edit — opening the editor always starts from a known-good state.\n\nOnly one field editing at a time is enforced by \`closeAllExcept(row)\`, called at the start of every \`openEditor()\` — clicking "Edit" on the Title row while the Name row's editor is already open silently discards the Name row's in-progress (unsaved) edit and closes it, rather than leaving two open editors where it's unclear which Save button applies to what. That's a deliberate choice: an inline editor with no explicit "you have unsaved changes elsewhere" warning should default to safe, predictable behavior over silently accumulating multiple simultaneous edit states.\n\nSaving is guarded against an accidental empty value — \`if (next)\` only commits a trimmed, non-empty string back to \`data-value\` and the visible \`.bsinline-value\` text, so clearing a field entirely and clicking Save leaves the last real value in place rather than silently blanking a profile field. Enter and Escape inside the input are wired to click the row's own real Save and Cancel buttons rather than duplicating their logic, so there's only ever one implementation of what "save" and "cancel" actually do per row.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Three profile fields show as plain text with an "Edit" link next to each.' },
        { title: 'Click "Edit" next to Name', text: 'It switches to an input pre-filled with the current value, already focused and selected.' },
        { title: 'Click "Edit" next to Title without saving Name first', text: 'The Name editor closes automatically (discarding its unsaved edit) and the Title editor opens instead.' },
        { title: 'Type a new value and press Enter', text: 'It saves immediately, exactly like clicking the visible Save button.' },
        { title: 'Open an editor and press Escape', text: 'It closes without saving, reverting to the field\'s last saved value.' },
        { title: 'Open an editor, clear the input completely, and click Save', text: 'The field keeps its previous value rather than being saved as blank.' },
      ],
    },
    features: [
      'Each field remembers its own last-saved value, so reopening an editor never shows stale or cancelled text',
      'Only one field editor is ever open at once, automatically closing any other in-progress edit',
      'Enter and Escape inside the input trigger the exact same Save/Cancel logic as their visible buttons',
      'Saving an empty value is silently rejected, preserving the field\'s last real value instead',
      'The input is focused and its text pre-selected the instant an editor opens, ready for immediate typing',
    ],
    useCases: [
      { icon: 'FORM', title: 'Profile and account settings pages', desc: 'Edit a field without navigating to a separate edit form or reloading the page.' },
      { icon: 'APP', title: 'Admin record editors and CRM contact details', desc: 'Quickly correct one field of a record without opening a full edit modal for the whole thing.' },
      { icon: 'DASH', title: 'Dashboard configuration panels', desc: 'A lightweight way to let a user tweak individual settings values in place, one at a time.' },
    ],
    faqs: [
      { q: 'What happens to an in-progress edit if I open a different field\'s editor?', a: 'It\'s discarded — closeAllExcept() closes every other open editor without saving whenever a new one opens, so only ever one field is being edited, and switching away from an unsaved edit intentionally abandons it.' },
      { q: 'Can I save an empty value?', a: 'No — the save handler checks that the trimmed input is non-empty before committing it; an empty save silently closes the editor and keeps the field\'s previous value unchanged.' },
      { q: 'Does pressing Enter save the same way clicking Save does?', a: 'Yes — the keydown listener calls .click() on the row\'s own real Save button rather than duplicating its logic, so there is exactly one implementation of what saving actually does.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track which field id (if any) is currently being edited in component state, along with each field\'s saved value, and conditionally render the display or editor per row based on whether its id matches the currently-editing one.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add per-field validation (e.g. a basic email format check on the Email row) that blocks Save and shows an inline error until corrected, or to add a subtle "saved" flash animation on the value text right after a successful save.`,
      prompt: `Build a Bootstrap 5.3 inline click-to-edit profile form, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- At least 3 fields, each toggling between a plain-text display (with an Edit link) and an inline editor (a text input with Save and Cancel buttons), in place — not a separate modal or page.
- Each field must remember its own last-saved value on the row itself, so reopening its editor always starts from the correct current value, never stale text from a previous cancelled edit.
- Only one field's editor should ever be open at a time — opening a new one must automatically close and discard any other field's currently open, unsaved editor.
- Support pressing Enter inside the editor's input to save (calling the exact same logic the visible Save button uses) and Escape to cancel without saving.
- Saving an empty or whitespace-only value must be rejected, leaving the field's previous value in place instead.`,
    },
  },
};

export default bootstrapInlineFormEditing;
