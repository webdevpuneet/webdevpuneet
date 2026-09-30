const fileDropzoneUploader = {
  id: 'file-dropzone-uploader',
  title: 'File Dropzone Uploader',
  lastmod: '2026-09-05',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="fd-wrap">
  <div class="fd-zone" id="fdZone">
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5"/><path d="M7 9l5-5 5 5"/><path d="M12 4v13"/></svg>
    <div class="fd-text">Drag files here or <span>click to browse</span></div>
    <input type="file" id="fdInput" multiple hidden />
  </div>
  <div class="fd-list" id="fdList"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.fd-wrap { width: 100%; max-width: 440px; }

.fd-zone {
  border: 2px dashed #cbd5e1; border-radius: 14px; padding: 36px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  color: #94a3b8; cursor: pointer; background: #fff; transition: border-color 0.15s, background 0.15s, color 0.15s;
  text-align: center;
}
.fd-zone.drag-active { border-color: #6366f1; background: #eef2ff; color: #6366f1; }
.fd-text { font-size: 13.5px; font-weight: 600; }
.fd-text span { color: #6366f1; font-weight: 700; text-decoration: underline; }

.fd-list { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }

.fd-file {
  display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #e2e8f0;
  border-radius: 10px; padding: 10px 12px;
}
.fd-badge {
  font-size: 10px; font-weight: 800; color: #fff; width: 34px; height: 34px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; text-transform: uppercase;
}
.fd-file-body { flex: 1; min-width: 0; }
.fd-file-name { font-size: 12.5px; font-weight: 700; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fd-file-size { font-size: 11px; color: #94a3b8; margin-top: 1px; }
.fd-remove {
  background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; line-height: 1;
  padding: 4px 6px; border-radius: 6px; flex-shrink: 0;
}
.fd-remove:hover { background: #fef2f2; color: #ef4444; }`,
  js: `const zone = document.getElementById('fdZone');
const input = document.getElementById('fdInput');
const list = document.getElementById('fdList');

const BADGE_COLORS = {
  pdf: '#ef4444', doc: '#3b82f6', docx: '#3b82f6', png: '#22c55e', jpg: '#22c55e',
  jpeg: '#22c55e', gif: '#22c55e', csv: '#f59e0b', xls: '#f59e0b', xlsx: '#f59e0b',
  zip: '#a855f7', txt: '#64748b', default: '#6366f1',
};

let files = [];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function extOf(name) {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function renderList() {
  list.innerHTML = '';
  files.forEach((file, index) => {
    const ext = extOf(file.name);
    const color = BADGE_COLORS[ext] || BADGE_COLORS.default;
    const row = document.createElement('div');
    row.className = 'fd-file';
    row.innerHTML = \`
      <div class="fd-badge" style="background:\${color}">\${ext || 'file'}</div>
      <div class="fd-file-body">
        <div class="fd-file-name">\${file.name}</div>
        <div class="fd-file-size">\${formatSize(file.size)}</div>
      </div>
      <button class="fd-remove" aria-label="Remove file">\\u00D7</button>\`;
    row.querySelector('.fd-remove').addEventListener('click', () => {
      files.splice(index, 1);
      renderList();
    });
    list.appendChild(row);
  });
}

function addFiles(fileList) {
  Array.from(fileList).forEach((f) => files.push(f));
  renderList();
}

zone.addEventListener('click', () => input.click());

input.addEventListener('change', (e) => {
  addFiles(e.target.files);
  input.value = '';
});

zone.addEventListener('dragover', (e) => {
  e.preventDefault();
  zone.classList.add('drag-active');
});

zone.addEventListener('dragleave', () => {
  zone.classList.remove('drag-active');
});

zone.addEventListener('drop', (e) => {
  e.preventDefault();
  zone.classList.remove('drag-active');
  addFiles(e.dataTransfer.files);
});`,
  seo: {
    title: 'File Dropzone Uploader — Free HTML CSS JS Snippet',
    description: 'A drag-and-drop file upload zone that accepts dropped or browsed files and lists each with its size, extension badge, and a remove button. Exports to React, Vue & Tailwind.',
    about: {
      title: 'File Dropzone Uploader — Drag-and-Drop File Upload With Live File List',
      description: `This snippet is a file upload dropzone: a dashed-border drop area that accepts files either by clicking to browse or by dragging them straight from the desktop, backed by the native HTML5 drag-and-drop API and the File API.

**Two ways in, one code path**

Clicking the zone programmatically triggers a hidden \`<input type="file" multiple>\` via \`input.click()\`; its \`change\` event hands back a \`FileList\`. Dropping files fires the zone's \`drop\` handler, which reads \`event.dataTransfer.files\` — also a \`FileList\`. Both paths converge on a single \`addFiles()\` function so browsed and dropped files are handled identically.

**Visual drag feedback**

\`dragover\` calls \`preventDefault()\` (required for the drop to be allowed) and adds a \`.drag-active\` class that recolors the border, background, and icon; \`dragleave\` and \`drop\` both remove it, so the highlight only shows while a file is actually being dragged over the zone.

**Per-file metadata rendering**

Each accepted \`File\` object is pushed into a local \`files\` array. \`formatSize()\` converts the raw byte count into a human-readable KB/MB string, and \`extOf()\` pulls the extension off the filename to look up a color in the \`BADGE_COLORS\` map (falling back to a default indigo for unrecognized types) — giving each row a colored badge at a glance. A remove button on each row splices that file out of the array and re-renders the list.`,
    },
    features: [
      'Native HTML5 drag-and-drop with dragover, dragleave, and drop handlers plus a drag-active highlight state',
      'Clicking the dropzone also opens a native file browser via a hidden multiple file input',
      'Human-readable file size formatting (bytes converted to KB or MB)',
      'Color-coded extension badges keyed off a lookup map, with a sensible default for unknown types',
      'Per-file remove button that updates the in-memory file list and re-renders instantly',
      'Both drag-drop and click-to-browse paths converge on one shared addFiles function',
      'Fully self-contained vanilla JS with no external dependencies',
    ],
    useCases: [
      { icon: 'FORM', title: 'File upload forms', desc: 'A ready-made dropzone for attachments, documents, or media uploads.' },
      { icon: 'APP', title: 'Admin panels and dashboards', desc: 'Bulk file intake for CMS media libraries or document management tools.' },
      { icon: 'CODE', title: 'Reference for the File and DataTransfer APIs', desc: 'Shows how to read files identically whether dropped or selected via input.' },
      { icon: 'DESIGN', title: 'Onboarding and import flows', desc: 'A friendly first step for CSV imports, resume uploads, or asset intake.' },
    ],
    faqs: [
      { q: 'Does this actually upload files to a server?', a: 'No, this snippet only handles client-side file selection and lists the chosen files with their metadata. Wire the addFiles function or the files array to an actual upload request (e.g. fetch with FormData) to send them somewhere.' },
      { q: 'Why does clicking the dropzone open a file browser?', a: 'The visible dropzone wraps a hidden <input type="file" multiple>. A click listener on the zone calls input.click() to programmatically open the native file picker, keeping the styled zone as the only visible control.' },
      { q: 'How are file sizes converted to KB or MB?', a: 'formatSize() checks the raw byte count: under 1024 bytes it shows bytes, under 1024*1024 it divides by 1024 for KB, and above that it divides by 1024*1024 for MB, each rounded to one decimal place.' },
      { q: 'How does the colored badge know what color to use?', a: 'extOf() extracts the lowercase extension from the filename, and that extension is looked up in the BADGE_COLORS map. Unmapped extensions fall back to a default indigo color so every file still gets a badge.' },
    ],
  },
};

export default fileDropzoneUploader;
