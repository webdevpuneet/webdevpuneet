const fileDropzone = {
    id: 'file-dropzone',
    title: 'File Dropzone',
    category: 'forms',
    html: `<div class="demo">
  <div class="dropzone" id="zone">
    <div class="zone-inner" id="inner">
      <div class="zone-icon">📂</div>
      <p class="zone-title">Drop files here</p>
      <p class="zone-sub">or <label class="browse" for="file-input">browse files</label></p>
      <p class="zone-types">PNG, JPG, PDF, ZIP — up to 10 MB</p>
      <input type="file" id="file-input" multiple hidden onchange="handleFiles(this.files)" />
    </div>
  </div>
  <ul class="file-list" id="file-list"></ul>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { width: 400px; display: flex; flex-direction: column; gap: 14px; }

.dropzone {
  border: 2px dashed #e2e8f0;
  border-radius: 16px; padding: 2px;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}
.dropzone.over { border-color: #6366f1; background: rgba(99,102,241,0.04); }
.dropzone.over .zone-icon { transform: scale(1.1); }

.zone-inner {
  display: flex; flex-direction: column; align-items: center;
  padding: 40px 24px; gap: 6px; text-align: center;
  border-radius: 14px;
  transition: background 0.15s;
}
.zone-inner:hover { background: #f8fafc; }

.zone-icon { font-size: 40px; transition: transform 0.2s; margin-bottom: 6px; }
.zone-title { font-size: 15px; font-weight: 600; color: #1e293b; }
.zone-sub { font-size: 13px; color: #64748b; }
.browse { color: #6366f1; font-weight: 600; cursor: pointer; text-decoration: underline; }
.zone-types { font-size: 11px; color: #94a3b8; margin-top: 4px; }

.file-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }

.file-item {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 10px; padding: 10px 12px;
  animation: slideUp 0.2s ease;
}
@keyframes slideUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

.file-ext {
  width: 36px; height: 36px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; flex-shrink: 0;
}
.file-details { flex: 1; min-width: 0; }
.file-name { font-size: 13px; font-weight: 500; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-size { font-size: 11px; color: #94a3b8; }
.file-remove { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: background 0.1s, color 0.1s; }
.file-remove:hover { background: #fef2f2; color: #dc2626; }`,
    js: `const zone = document.getElementById('zone');
const list = document.getElementById('file-list');

const extColors = { pdf:'#ef4444', png:'#10b981', jpg:'#10b981', jpeg:'#10b981', zip:'#f59e0b', mp4:'#6366f1', mp3:'#8b5cf6', doc:'#2563eb', docx:'#2563eb' };

zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
zone.addEventListener('dragleave', () => zone.classList.remove('over'));
zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('over'); handleFiles(e.dataTransfer.files); });
zone.addEventListener('click', () => document.getElementById('file-input').click());

function handleFiles(files) {
  [...files].forEach(f => {
    const ext = f.name.split('.').pop().toLowerCase();
    const color = extColors[ext] || '#64748b';
    const size = f.size < 1024 ? f.size + ' B' : f.size < 1048576 ? (f.size/1024).toFixed(1) + ' KB' : (f.size/1048576).toFixed(1) + ' MB';
    const li = document.createElement('li');
    li.className = 'file-item';
    li.innerHTML = \`<div class="file-ext" style="background:\${color}22;color:\${color}">\${ext.toUpperCase()}</div>
      <div class="file-details"><div class="file-name">\${f.name}</div><div class="file-size">\${size}</div></div>
      <button class="file-remove" onclick="this.closest('li').remove()" title="Remove">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>\`;
    list.prepend(li);
  });
}`,

  seo: {
    title: 'File Dropzone — Free HTML CSS JS Drag & Drop Snippet',
    description: 'Drag-and-drop upload zone with file list, type colour badges, size formatting and click-to-browse. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'File Dropzone — dragover/drop Events, extColors Map & Click-to-Browse',
      description: `A file dropzone is a drag-and-drop upload area that also supports click-to-browse. Users drag files from their desktop onto the zone or click it to open the file picker. This is the standard upload UI for image editors, document processors, email attachments, and any file-based workflow — pair it with [upload progress](/ui-snippets/upload-progress/) bars, the styled [file input](/ui-snippets/file-input/), or a [media upload grid](/ui-snippets/media-upload-grid/).

**The drag events**

\`dragover\` calls \`e.preventDefault()\` (required to allow drop) and adds \`.over\` to the zone — this triggers the dashed border colour change and the zone icon scale animation. \`dragleave\` removes \`.over\`. \`drop\` calls \`e.preventDefault()\` and reads \`e.dataTransfer.files\` — a FileList of dropped files.

**Click-to-browse fallback**

The zone has an \`onclick\` that calls \`input.click()\` on a hidden \`<input type="file" multiple>\`. This opens the OS file picker. The input's \`onchange\` handler passes \`this.files\` to the same \`addFiles()\` function — identical behaviour for both drag-and-drop and click paths.

**The extColors map**

\`extColors\` maps file extensions to colours: pdf → red, png/jpg → green, zip → yellow, mp4 → indigo, mp3 → violet, doc → blue. \`ext.toLowerCase()\` extracts the extension from the filename. If the extension is not in the map, a default slate colour is used. This colour is applied as an inline badge next to the filename.

**File size formatting**

\`(file.size / 1024).toFixed(1) + ' KB'\` formats the byte count to one decimal place.

**Removing files**

Each file item has a remove button. Its \`onclick\` calls \`item.remove()\` to delete the list item from the DOM.

**The dragover/drop event pair**

Without e.preventDefault() in the dragover handler, the browser's default action (opening the file) fires and no drop event is triggered. Always call e.preventDefault() in dragover to signal to the browser that this element accepts drops. The drop handler also calls e.preventDefault() to prevent the browser from navigating to the dropped file. e.dataTransfer.files provides the FileList of dropped files.

**The visual drag-over state**

The .drag-over class adds a coloured border and light background to communicate to the user that the zone is ready to accept the dropped file. This class is added in ondragover and removed in ondragleave. Adding a CSS transition: border-color 0.15s, background 0.15s to the dropzone makes the state change feel responsive.

**File size and type validation**

After receiving files (from drop or input change), validate before processing: const MAX_SIZE = 25 * 1024 * 1024; const ALLOWED = ['png','jpg','pdf','zip']; const valid = file.size <= MAX_SIZE && ALLOWED.includes(ext(file.name)). Show an error state for invalid files: an error badge with the reason ("File too large" or "Invalid type") instead of a progress bar. This prevents users from uploading incompatible files before the upload starts.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag a file onto the zone', text: 'Drag any file from your desktop onto the dropzone in the preview. The border highlights on hover and the file appears in the list below.' },
        { title: 'Click to browse', text: 'Click the dropzone without dragging to open the OS file picker. Selected files appear in the same list.' },
        { title: 'Add or remove file type colours', text: 'In the JS panel, update the extColors map with your file types and brand colours.' },
        { title: 'Restrict accepted file types', text: 'Add accept="image/*,.pdf" to the hidden <input type="file"> element to filter the file picker.' },
        { title: 'Wire to a real upload', text: 'In addFiles(), create a FormData object, append each file, and call fetch("/upload", { method: "POST", body: formData }) to send files to your backend.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'dragover + e.preventDefault() to allow drop, .over class for visual feedback',
      'dragleave removes .over; drop reads e.dataTransfer.files',
      'click-to-browse: zone onclick triggers hidden input.click()',
      'Both drag and click paths call the same addFiles(files) function',
      'extColors map assigns semantic colour badges per file extension',
      'File size formatted as KB to one decimal place',
      'Per-item remove button calls item.remove() from the DOM',
      '.over .zone-icon { transform: scale(1.1) } on drag-over hover',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'DOC',    title: 'Document and image upload forms',   desc: 'Drop the dropzone into any form requiring file upload. Wire addFiles() to a FormData fetch for instant file submission without a library.' },
      { icon: 'APP',    title: 'Email attachment selection',        desc: 'Use in a compose email interface to let users attach files. The extColors map visually distinguishes attachment types.' },
      { icon: 'LEARN',  title: 'Learn drag-and-drop and DataTransfer API', desc: 'Edit the dragover, dragleave, and drop handlers in the JS panel to understand how drag events and e.dataTransfer.files work.' },
      { icon: 'FLOW',   title: 'Prototype file upload UX',         desc: 'Use the snippet to prototype how users will interact with file uploads before wiring a real backend. Test drag and click paths.' },
      { icon: 'DESIGN', title: 'Custom file type badge colours',    desc: 'Update the extColors map with your own extension-to-colour mapping to match your design system.' },
      { icon: 'CODE',   title: 'Multi-file upload with preview',   desc: 'Extend the file list items to show image previews using FileReader.readAsDataURL for image files.' },
      { icon: 'CODE', title: 'Related: Interest Selector', desc: 'See the [Interest Selector](/ui-snippets/interest-selector/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does drag and drop work with the browser API?', a: 'The dragover handler calls e.preventDefault() — without this the browser blocks the drop. The drop handler reads e.dataTransfer.files which is a FileList of all dragged files. addFiles() iterates over it to build the file list UI.' },
      { q: 'How does click-to-browse work?', a: 'A hidden <input type="file" multiple> is in the HTML. The zone div has onclick="document.getElementById(\'file-input\').click()" which programmatically opens the OS file picker. The input\'s onchange fires with this.files when the user selects files.' },
      { q: 'How do I restrict accepted file types?', a: 'Add an accept attribute to the hidden input: accept=".pdf,image/*". This filters the file picker. For drag-and-drop, check file types in addFiles(): if (!allowedTypes.includes(file.type)) return; — the accept attribute does not prevent drag drops.' },
      { q: 'How do I send files to a backend?', a: 'In addFiles(), create a FormData: const fd = new FormData(); files.forEach(f => fd.append("files", f)); await fetch("/upload", { method: "POST", body: fd });. No Content-Type header needed — the browser sets it automatically with the boundary.' },
      { q: 'How do I add image preview thumbnails?', a: 'For image files (file.type.startsWith("image/")), use FileReader: const reader = new FileReader(); reader.onload = e => { const img = document.createElement("img"); img.src = e.target.result; item.prepend(img); }; reader.readAsDataURL(file);' },
      { q: 'Can I use this dropzone in React?', a: 'Yes. Click "JSX" for a React component. In React, manage the files array in useState. Wire onDragOver, onDragLeave, onDrop props to the div and onChange to the input. Call setFiles(prev => [...prev, ...newFiles]) in each handler.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every drag event by hand to know what this zone is really doing. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why dragover needs e.preventDefault() before drop will ever fire, and why the hidden input's onchange calls the same handleFiles function as the drop path. The same assistant is useful for optimizing it — ask whether the extColors lookup and size formatting should be memoized if the list grows into the hundreds, or whether prepend-ing new list items on every drop could be batched. It's just as good for extending the effect: have it add real upload progress per file, size and type validation against the extColors keys before the file is accepted, or drag-to-reorder on the file list. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drag-and-drop file upload dropzone in plain HTML, CSS, and JavaScript — no libraries, no frameworks.

Requirements:
- A dropzone container that listens for dragover, dragleave, and drop events. The dragover handler must call e.preventDefault() and add a visual "over" class (dashed border color change plus a subtle icon scale); dragleave must remove that class; drop must call e.preventDefault(), remove the class, and read the files from e.dataTransfer.files.
- A hidden native input type="file" with multiple set, triggered by clicking the dropzone itself (input.click()), whose change event passes this.files into the exact same file-handling function used by the drop path, so both entry points behave identically.
- A function that, for every File object, extracts its extension from the filename, looks up a color from a small extension-to-color map (with a sensible default for unmapped extensions), formats the byte size into B/KB/MB with one decimal place, and prepends a new list item showing a colored extension badge, the file name, the formatted size, and a remove button that deletes just that item from the DOM on click.
- No actual network upload is required, but structure the file-handling function so a FormData-based fetch POST could be added in one place without restructuring the rest of the code.`,
    },
  },
};

export default fileDropzone;
