const fileInput = {
  id: 'file-input',
  title: 'Custom File Input',
  category: 'forms',
  html: `<div class="field">
  <span class="field-label">Attach a file</span>

  <label class="file">
    <input type="file" class="file-native" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx">
    <span class="file-btn">
      <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      Choose file
    </span>
    <span class="file-name">No file selected</span>
    <button type="button" class="file-clear" aria-label="Remove file" hidden>
      <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </label>

  <p class="file-hint">PDF, Word, or image · up to 10MB</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 90px;
}

.field { width: 100%; max-width: 380px; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 7px; }

.file {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 6px 6px 6px;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.file:hover { border-color: #94a3b8; }
.file:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

/* Hide the native input but keep it accessible & focusable */
.file-native { position: absolute; width: 1px; height: 1px; opacity: 0; }

.file-btn {
  flex-shrink: 0;
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 14px;
  background: #6366f1; color: #fff;
  border-radius: 9px;
  font-size: 13px; font-weight: 600;
}
.file-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.file-name {
  flex: 1; min-width: 0;
  font-size: 13.5px; color: #94a3b8;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.file.has-file .file-name { color: #1e293b; font-weight: 500; }

.file-clear {
  flex-shrink: 0;
  width: 28px; height: 28px; margin-right: 4px;
  display: grid; place-items: center;
  background: #f1f5f9; border: none; border-radius: 7px;
  color: #64748b; cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.file-clear:hover { background: #fee2e2; color: #dc2626; }
.file-clear svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; }

.file-hint { font-size: 12px; color: #94a3b8; margin-top: 8px; }`,
  js: `function fmtSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function initFileInput() {
  const wrap = document.querySelector('.file');
  if (!wrap) return;                       // not mounted yet
  const input = wrap.querySelector('.file-native');
  const nameEl = wrap.querySelector('.file-name');
  const clearBtn = wrap.querySelector('.file-clear');

  function reset() {
    input.value = '';
    nameEl.textContent = 'No file selected';
    wrap.classList.remove('has-file');
    clearBtn.hidden = true;
  }

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      nameEl.textContent = file.name + '  ·  ' + fmtSize(file.size);
      wrap.classList.add('has-file');
      clearBtn.hidden = false;
    } else {
      reset();
    }
  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();   // don't re-open the picker
    reset();
  });
}

// Run after the DOM mounts (framework exports run snippet JS before render)
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFileInput);
else requestAnimationFrame(initFileInput);`,

  seo: {
    title: 'Custom File Input — Styled Upload Field Snippet',
    description: 'A styled custom file input that shows the chosen file name and size with a clear button, on a real file field. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Custom File Input — Styled Button, File Name + Size & Clear Control',
      description: `A custom file input is one of the most-searched form snippets because the default \`<input type="file">\` is notoriously ugly and unstylable — its button text and appearance are controlled by the browser and OS, and look different everywhere. For a drag-and-drop area instead, see the [file dropzone](/ui-snippets/file-dropzone/); for upload feedback, the [upload progress](/ui-snippets/upload-progress/) card. This snippet replaces it with a clean, branded control that shows a **"Choose file" button**, the **selected file's name and size**, and a **clear button to remove it** — while keeping a real, accessible \`<input type="file">\` underneath so uploads and keyboard support keep working.

**The accessible hide-and-replace pattern**

The trick to styling a file input without breaking it is to keep the native input and hide it visually rather than replace it. The \`<input type="file">\` is wrapped in a \`<label>\` and hidden with \`position: absolute; width: 1px; height: 1px; opacity: 0\` — not \`display: none\`, which would remove it from the tab order and from assistive tech. Because the whole control is a \`<label>\`, clicking anywhere on it (the styled button, the filename area) opens the OS file picker natively. This is the same reliable pattern used for the accessible [custom checkbox](/ui-snippets/custom-checkbox/), applied to file inputs: the browser handles the file dialog, validation, and form submission; CSS only handles appearance.

**Showing the file name and size**

When the user picks a file, a single \`change\` listener reads \`input.files[0]\` and writes the file's \`name\` and a human-readable \`size\` into the \`.file-name\` element ("report.pdf · 248 KB"). The \`fmtSize\` helper converts the raw byte count into B, KB, or MB so the size is readable. The filename area uses \`text-overflow: ellipsis\` with \`overflow: hidden\` so a very long filename truncates gracefully instead of breaking the layout. A \`.has-file\` class on the wrapper darkens the text and bolds it so a chosen file looks visibly different from the "No file selected" placeholder.

**The clear button**

Once a file is selected, a clear (×) button appears. Clicking it resets the input value (\`input.value = ''\`), restores the placeholder text, removes the \`.has-file\` class, and hides itself again. One important detail: the clear button calls \`e.preventDefault()\` because it lives inside the \`<label>\` — without it, clicking the × would also trigger the label and re-open the file picker. This is exactly the kind of subtlety that breaks naive custom file inputs, and handling it is what makes this control feel solid. Resetting \`input.value\` is the correct way to clear a file input; you cannot set its value to a filename for security reasons, but you can clear it.

**Restricting accepted file types**

The native \`accept\` attribute (\`.pdf,.png,.jpg,.jpeg,.doc,.docx\`) tells the OS file picker to highlight matching file types, which guides users toward valid selections. Note that \`accept\` is a hint, not enforcement — users can still override it — so always validate the file type and size on the client (in the \`change\` handler) and again on the server. The hint line under the control ("PDF, Word, or image · up to 10MB") sets expectations before the user opens the dialog.

**The focus and hover states**

Because the native input is preserved, keyboard focus lands on it, and \`.file:focus-within\` styles the whole control with the brand border and a focus ring — using \`:focus-within\` so the ring appears when the hidden input is focused via keyboard. The control also has a hover state. These make the custom input feel like a first-class form field rather than a static button, and keep it operable for keyboard users who Tab to it and press Enter/Space to open the picker.

**Customizing the control**

Re-theme by changing the "Choose file" button color, the focus ring, and the clear-button hover (red here). Swap the upload and × SVGs for your own icons. Change the \`accept\` attribute to your allowed types and update the hint text to match. To show a thumbnail preview for images, read the file with \`URL.createObjectURL(file)\` in the \`change\` handler and set it as an \`<img>\` src (remember to \`revokeObjectURL\` when clearing). To accept multiple files, add the \`multiple\` attribute and render a small list of names instead of one. The structure — label, hidden input, button, name, clear — stays the same.

**Why keep the native input**

A common but broken approach builds a "file input" from a styled \`<button>\` plus JavaScript, which cannot actually open the OS file dialog without a hidden real input anyway, and risks losing keyboard support and form submission. Keeping the genuine \`<input type="file">\` means the file is included in a normal form submit under its \`name\`, the OS file picker (including drag-from-desktop and recent files) works, screen readers announce it as a file upload, and it is keyboard-operable — all for free. The custom look is purely cosmetic CSS layered on top of a fully functional field.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy the control', text: 'Copy the <label class="file"> with its hidden <input type="file">, the .file-btn, .file-name, and .file-clear button, plus the small script.' },
        { title: 'Keep the native input', text: 'The real <input type="file"> stays (hidden via opacity, not display:none) so uploads, keyboard, and form submission work. The whole label opens the picker.' },
        { title: 'Set accepted types', text: 'Change the accept attribute to your allowed file types and update the hint text. Validate type and size in the change handler and on the server too.' },
        { title: 'Add an image preview (optional)', text: 'In the change handler, use URL.createObjectURL(file) as an <img> src to show a thumbnail; revoke it when clearing.' },
        { title: 'Re-theme it', text: 'Change the Choose-file button color, the focus ring, and the clear-button hover to match your form.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Styled "Choose file" button replacing the unstylable native control',
      'Shows the selected file name and a human-readable size (B/KB/MB)',
      'Clear (×) button resets the field; calls preventDefault so it won\'t re-open the picker',
      'Real <input type="file"> kept (hidden via opacity) — uploads and keyboard work',
      'Whole control is a <label>, so clicking anywhere opens the OS file picker',
      'accept attribute guides the picker; focus-within ring for keyboard users',
      'Long filenames truncate with an ellipsis instead of breaking layout',
      'Submits natively with the form under its name attribute',
      'Ready to extend for image previews or multiple files',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'FORM',   title: 'Upload fields in forms',            desc: 'Resume, document, and attachment uploads where the default file input clashes with the rest of the form design.' },
      { icon: 'APP',    title: 'Profile and settings uploads',      desc: 'Avatar, logo, or document uploads in account settings with a clear filename readout and a one-click remove.' },
      { icon: 'IMG',    title: 'Image upload with preview',         desc: 'Extend the change handler with URL.createObjectURL to show a thumbnail of the chosen image before submitting.' },
      { icon: 'LEARN',  title: 'Learn the styled-file-input trick', desc: 'See how hiding the native input (not display:none) and wrapping it in a label gives a fully custom look without losing function.' },
      { icon: 'CODE',   title: 'Reusable upload component',         desc: 'Drop the label/input/name/clear structure into your design system as the standard file field across the app.' },
      { icon: 'ACCESS', title: 'Accessible file upload',           desc: 'Keeps the native file input so the OS picker, keyboard activation, screen-reader announcement, and form submission all work.' },
      { icon: 'CODE', title: 'Related: Loan EMI Calculator', desc: 'See the [Loan EMI Calculator](/ui-snippets/loan-emi-calculator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do you style a file input without breaking it?', a: 'Keep the real <input type="file"> and hide it with position: absolute; width/height: 1px; opacity: 0 (never display: none, which removes it from the tab order). Wrap everything in a <label> so clicking the styled button opens the OS picker, and use a change listener to show the file name. The native input still handles uploads, keyboard, and submission.' },
      { q: 'How do I show the selected file name and size?', a: 'In a change event listener, read input.files[0] and write its name and a formatted size into your label element. A small helper converts the byte count into KB or MB. A class on the wrapper styles the chosen-file state differently from the placeholder.' },
      { q: 'Why does the clear button call preventDefault?', a: 'The clear button is inside the <label>, so a normal click would also activate the label and re-open the file picker. Calling e.preventDefault() stops that, so clicking × only clears the field. Clearing is done by setting input.value = "".' },
      { q: 'Can I restrict which file types can be chosen?', a: 'Set the accept attribute (e.g. accept=".pdf,.png,.jpg") to guide the OS picker toward matching types. It is a hint, not enforcement, so also validate the type and size in the change handler and again on the server.' },
      { q: 'How do I add an image thumbnail preview?', a: 'In the change handler, call URL.createObjectURL(file) and set it as the src of an <img>. Revoke the object URL with URL.revokeObjectURL when the file is cleared or replaced to free memory.' },
      { q: 'Can I use this custom file input in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, keep a ref or controlled state for the chosen file, render the name/size from it, and clear by resetting the input via a ref; the label/hidden-input structure is unchanged.' },
    ],
    aiPrompt: {
      paragraph: `You don't need to reverse-engineer the accessibility trick here on your own. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the native input is hidden with position absolute plus opacity 0 instead of display none, and why the clear button's click handler needs e.preventDefault() when it lives inside the label. The same assistant can help optimize it — for instance checking whether fmtSize should memoize or whether the DOMContentLoaded versus requestAnimationFrame init fallback is actually needed for your framework export. It's also a fast way to extend the control: ask it to add an image thumbnail preview via URL.createObjectURL, support the multiple attribute with a scrollable file list, or add drag-and-drop onto the same label. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a custom-styled file input in plain HTML, CSS, and JavaScript that keeps the real native file input fully functional — no fake button-only implementations, no libraries.

Requirements:
- Wrap a real input type="file" inside a label element, so clicking anywhere in the styled control (button, filename text) opens the OS file picker natively without any JS click-forwarding.
- Hide the native input visually using position absolute, width and height of 1px, and opacity 0 — explicitly not display none — so it stays in the tab order and reachable by screen readers and keyboard.
- On the input's change event, read input.files[0] and, if present, write the file name plus a human-readable size (formatted as B, KB, or MB depending on magnitude) into a text element, and add a has-file class to the wrapper to restyle the filename text; if no file, reset to a placeholder state.
- Show a clear button only when a file is selected. Its click handler must call e.preventDefault() before resetting input.value to an empty string and restoring the placeholder state, specifically to stop the click from also bubbling to the label and reopening the file picker.
- Add a :focus-within style on the wrapper so keyboard focus on the hidden input still produces a visible focus ring around the whole control.
- Set the accept attribute to a realistic list of file types (e.g. .pdf,.png,.jpg,.jpeg,.doc,.docx) and display a hint line describing accepted types and a max size, understanding that accept is only a hint and real validation must also happen in the change handler.`,
    },
  },
};

export default fileInput;
