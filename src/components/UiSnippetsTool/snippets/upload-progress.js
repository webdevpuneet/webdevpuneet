const uploadProgress = {
  id: 'upload-progress',
  title: 'Upload Progress',
  category: 'loaders',
  html: `<div class="wrap">

  <!-- Drop zone -->
  <input type="file" id="file-input" multiple style="display:none" onchange="onFiles(this.files)">
  <div class="dropzone" id="dz" onclick="triggerPick()" ondragover="onDragOver(event)" ondragleave="onDragLeave(event)" ondrop="onDrop(event)">
    <svg class="dz-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
    <div class="dz-text">Drop files here or <span class="dz-link">browse</span></div>
    <div class="dz-sub">PNG, JPG, PDF, ZIP — up to 25 MB</div>
  </div>
  <button class="demo-btn" onclick="runDemo()">▶ Try demo upload</button>

  <!-- File list -->
  <div class="file-list" id="file-list"></div>

  <!-- Overall summary -->
  <div class="summary hidden" id="summary">
    <div class="summary-row">
      <span id="sum-label">Uploading 3 files…</span>
      <span id="sum-pct">0%</span>
    </div>
    <div class="sum-bar"><div class="sum-fill" id="sum-fill"></div></div>
  </div>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 24px; }

.wrap { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 14px; }

.dropzone { border: 2px dashed #cbd5e1; border-radius: 14px; padding: 36px 24px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: border-color 0.2s, background 0.2s; background: #fff; }
.dropzone:hover, .dropzone.drag-over { border-color: #6366f1; background: rgba(99,102,241,0.03); }
.dz-icon { width: 40px; height: 40px; color: #94a3b8; }
.dropzone.drag-over .dz-icon { color: #6366f1; }
.dz-text { font-size: 14px; font-weight: 600; color: #374151; }
.dz-link { color: #6366f1; text-decoration: underline; text-underline-offset: 2px; }
.dz-sub  { font-size: 12px; color: #94a3b8; }

.file-list { display: flex; flex-direction: column; gap: 8px; }

.file-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 11px 14px; display: flex; align-items: center; gap: 12px; }
.fi-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.fi-icon.img  { background: rgba(99,102,241,0.1); }
.fi-icon.pdf  { background: rgba(239,68,68,0.1); }
.fi-icon.zip  { background: rgba(245,158,11,0.1); }
.fi-icon.other{ background: rgba(100,116,139,0.1); }
.fi-body { flex: 1; min-width: 0; }
.fi-name { font-size: 13px; font-weight: 600; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fi-size { font-size: 11px; color: #94a3b8; }
.fi-bar  { height: 3px; background: #e2e8f0; border-radius: 2px; margin-top: 6px; overflow: hidden; }
.fi-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.fi-status { font-size: 11px; font-weight: 700; flex-shrink: 0; white-space: nowrap; }
.fi-status.uploading { color: #6366f1; }
.fi-status.done      { color: #16a34a; }
.fi-status.error     { color: #dc2626; }
.fi-remove { background: none; border: none; cursor: pointer; color: #cbd5e1; font-size: 16px; transition: color 0.12s; flex-shrink: 0; }
.fi-remove:hover { color: #dc2626; }

.summary { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; }
.summary.hidden { display: none; }
.summary-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
.summary-row span:first-child { font-weight: 600; color: #374151; }
.summary-row span:last-child  { font-weight: 700; color: #6366f1; }
.sum-bar  { height: 5px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
.sum-fill { height: 100%; background: linear-gradient(90deg,#6366f1,#10b981); border-radius: 3px; transition: width 0.3s ease; width: 0%; }

.demo-btn { margin-top: 8px; width: 100%; background: transparent; border: 1.5px dashed #6366f1; border-radius: 10px; padding: 9px; font-size: 13px; font-weight: 600; color: #6366f1; cursor: pointer; transition: background 0.12s; font-family: inherit; }
.demo-btn:hover { background: rgba(99,102,241,0.06); }`,
  js: `const EXT_ICON = { png:'🖼️', jpg:'🖼️', jpeg:'🖼️', gif:'🖼️', webp:'🖼️', pdf:'📄', zip:'🗜️', rar:'🗜️' };
const EXT_CLASS = { png:'img',jpg:'img',jpeg:'img',gif:'img',webp:'img',pdf:'pdf',zip:'zip',rar:'zip' };

function fmtSize(b) { return b < 1024*1024 ? (b/1024).toFixed(1)+' KB' : (b/(1024*1024)).toFixed(1)+' MB'; }
function ext(name) { return name.split('.').pop().toLowerCase(); }

// Track intervals so we can cancel on remove
const tickers = {};
let totalFiles = 0;
let doneFiles  = 0;

function onFiles(files) {
  const list = document.getElementById('file-list');
  const items = [...files];
  if (!items.length) return;

  totalFiles += items.length;
  document.getElementById('summary').classList.remove('hidden');
  document.getElementById('sum-label').textContent = 'Uploading ' + totalFiles + ' file' + (totalFiles>1?'s':'') + '…';

  items.forEach((f, i) => {
    const e = ext(f.name);
    const ic = EXT_ICON[e] || '📁';
    const cl = EXT_CLASS[e] || 'other';
    const id = 'fi-' + Date.now() + i;

    const li = document.createElement('div');
    li.className = 'file-item';
    li.id = id;
    li.innerHTML =
      '<div class="fi-icon ' + cl + '">' + ic + '</div>' +
      '<div class="fi-body">' +
        '<div class="fi-name">' + f.name + '</div>' +
        '<div class="fi-size">' + fmtSize(f.size) + '</div>' +
        '<div class="fi-bar"><div class="fi-fill" id="fill-'+id+'" style="width:0%;background:#6366f1"></div></div>' +
      '</div>' +
      '<span class="fi-status uploading" id="status-'+id+'">0%</span>' +
      '<button class="fi-remove" onclick="removeItem(&#39;'+id+'&#39;)">×</button>';
    list.appendChild(li);

    let pct = 0;
    const speed = Math.random() * 10 + 5;
    tickers[id] = setInterval(() => {
      pct += speed * (Math.random() * 0.6 + 0.7);
      if (pct >= 100) {
        pct = 100;
        clearInterval(tickers[id]);
        delete tickers[id];
        const statusEl = document.getElementById('status-'+id);
        if (statusEl) { statusEl.textContent = '✓ Done'; statusEl.className = 'fi-status done'; }
        doneFiles++;
        updateSummary();
      }
      const fill   = document.getElementById('fill-'+id);
      const status = document.getElementById('status-'+id);
      if (fill)   fill.style.width = pct.toFixed(0) + '%';
      if (status && status.textContent !== '✓ Done') status.textContent = pct.toFixed(0) + '%';
      updateOverallPct(list);
    }, 200);
  });
}

function updateOverallPct(list) {
  const fills = list.querySelectorAll('.fi-fill');
  if (!fills.length) return;
  // Average over actual visible fills (not original total — handles removed items)
  const avg = [...fills].reduce((s,f) => s + parseFloat(f.style.width||0), 0) / fills.length;
  document.getElementById('sum-fill').style.width = avg.toFixed(0) + '%';
  document.getElementById('sum-pct').textContent  = avg.toFixed(0) + '%';
}

function updateSummary() {
  const remaining = Object.keys(tickers).length;
  if (remaining === 0 && doneFiles > 0) {
    document.getElementById('sum-label').textContent = '✓ All files uploaded';
    document.getElementById('sum-pct').textContent   = '100%';
  }
}

function removeItem(id) {
  // Cancel running upload simulation before removing
  if (tickers[id]) { clearInterval(tickers[id]); delete tickers[id]; }
  document.getElementById(id)?.remove();
  // Recalculate if something is still uploading
  const list = document.getElementById('file-list');
  if (list.querySelectorAll('.fi-fill').length) updateOverallPct(list);
}

function runDemo() {
  // Simulate uploading 3 fake files without a real file picker
  const fakeFiles = [
    { name: 'design-mockup.png',    size: 2.4*1024*1024 },
    { name: 'project-brief.pdf',    size: 384*1024 },
    { name: 'assets-bundle.zip',    size: 8.1*1024*1024 },
  ];
  onFiles(fakeFiles);
}

function triggerPick() { document.getElementById('file-input').click(); }
function onDragOver(e) { e.preventDefault(); document.getElementById('dz').classList.add('drag-over'); }
function onDragLeave()  { document.getElementById('dz').classList.remove('drag-over'); }
function onDrop(e) { e.preventDefault(); document.getElementById('dz').classList.remove('drag-over'); onFiles(e.dataTransfer.files); }`,
  seo: {
    title: 'Upload Progress — Free HTML CSS JS Snippet',
    description: 'File drop zone with per-file progress bars, type icons, size labels and an overall summary bar. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Upload Progress — Drag-and-Drop Zone, Per-File Progress Bars, Type Icons & Summary Bar',
      description: `A file upload interface with drag-and-drop, per-file progress bars, and a summary progress is one of the most complex UI patterns developers need to build from scratch. This snippet provides everything: a drag-and-drop zone with visual hover feedback (see also the standalone [file dropzone](/ui-snippets/file-dropzone/)), multiple file selection via click or drop, per-file [progress bars](/ui-snippets/progress-bar/) with file type icons and formatted sizes, individual done/error states, a remove button, and an overall summary progress bar with a completion message — all in plain HTML, CSS, and vanilla JavaScript.\n\n**The drag-and-drop zone**\n\nThe dropzone listens for three events: ondragover (calls e.preventDefault() to allow drop and adds .drag-over for visual feedback), ondragleave (removes .drag-over), and ondrop (calls e.preventDefault(), removes .drag-over, and passes e.dataTransfer.files to onFiles()). Clicking the dropzone triggers the hidden file input via triggerPick(), which calls input.click(). The hidden input has the multiple attribute for multi-file selection.\n\n**File type icon detection**\n\nThe EXT_ICON and EXT_CLASS maps assign emoji icons and coloured background classes based on the file extension. Image extensions get a camera emoji and indigo background. PDF gets a document emoji and red background. ZIP/RAR get a compressed emoji and amber background. Unknown extensions get a folder emoji and grey background.\n\n**Per-file progress simulation**\n\nEach file gets its own setInterval that increments the progress at a random speed (5–15% per tick, every 200ms). This simulates variable upload speeds per file. In production, replace the simulation with XHR upload.onprogress events that fire with real loaded/total values. When pct reaches 100, the interval clears, the status text changes to "✓ Done", and the class changes to .done (green).\n\n**Overall summary bar**\n\nThe updateOverallPct() function reads all .fi-fill bar widths in the file list and averages them. The average percentage fills the summary bar and updates the summary percentage text. When all files complete, updateSummary() changes the label to "✓ All files uploaded".\n\n**File size formatting**\n\nfmtSize() formats bytes to KB (if under 1MB) or MB (if 1MB or above) with one decimal place — matching the file size display convention used by operating systems and most upload interfaces. The formatter correctly handles file sizes from bytes through kilobytes to megabytes, with one decimal place for readability without verbosity at smaller file sizes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the drop zone or drag files onto it', text: 'Click the zone to open the system file picker (multiple files allowed). Or drag files from your desktop onto the zone — it highlights with an indigo border and subtle background when a drag enters.' },
      { title: 'Watch per-file progress and the overall summary bar', text: 'Each file shows its own progress bar, percentage, and status. The overall summary bar averages all file progress. When all files complete, the summary label changes to "✓ All files uploaded".' },
      { title: 'Wire to a real upload endpoint', text: 'Replace the setInterval simulation in onFiles() with a real XHR upload: xhr.upload.onprogress = e => { pct = (e.loaded/e.total)*100; fill.style.width = pct+"%" }. Start the XHR with xhr.open("POST","/upload"); xhr.send(formData).' },
      { title: 'Remove files from the list', text: 'Click the × button on any file to remove it from the list. In a real upload, also cancel the in-progress XHR: xhr.abort(). Remove the file from the queued upload list.' },
      { title: 'Add file size and type validation', text: 'In onFiles(), filter files before processing: const valid = [...files].filter(f => f.size <= 25*1024*1024 && allowedTypes.includes(ext(f.name))). Show an error message for rejected files: create a .file-item with .fi-status.error instead of a progress bar.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState for the files array and useRef for XHR instances, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['Drag-and-drop zone: dragover/dragleave/drop events, .drag-over visual feedback class','Click-to-browse: hidden input.click() via triggerPick()','File type icon map: emoji + coloured background per extension (img/pdf/zip/other)','File size formatter: bytes → KB or MB with one decimal place','Per-file progress bar: independent setInterval per file, variable simulated speed','Remove button: removes file item from DOM','Overall summary bar: average of all fi-fill widths, auto-update on each tick','Done state: "✓ Done" text, green .done class when pct reaches 100'],
    useCases: [
      { icon: 'APP', title: 'Multi-file document and image upload interfaces', desc: 'The per-file progress bar pattern is standard for document management systems, image upload flows, and media asset managers. Users can see each file progressing independently and remove specific files before the upload completes.' },
      { icon: 'FLOW', title: 'Form attachment upload for support tickets and applications', desc: 'Add the upload zone to a support ticket form or job application. Show per-file progress bars so users know their attachments are uploading before they submit the form. Disable the submit button until all files reach 100%.' },
      { icon: 'DESIGN', title: 'Cloud storage and file sharing upload interfaces', desc: 'The drag-and-drop zone with type icons, formatted sizes, and individual progress bars matches the interaction pattern of Google Drive, Dropbox, and OneDrive uploads — pair it with the [file manager UI](/ui-snippets/file-manager-ui/) for browsing uploaded files. Users expect this pattern and find it immediately familiar.' },
      { icon: 'CODE', title: 'Wire to S3, Cloudinary, or custom upload APIs', desc: 'For S3: get a pre-signed URL from your backend, then PUT the file directly to S3 via XHR. The XHR upload.onprogress event fires with loaded/total values. For Cloudinary: use their upload API with XMLHttpRequest for progress events. Both require only changing the URL and method in the XHR call.' },
      { icon: 'LEARN', title: 'Study drag-and-drop file API and XHR upload progress events', desc: 'The dropzone demonstrates the three drag event handlers needed for file drop: dragover (must call preventDefault to enable drop), dragleave (visual cleanup), and drop (reads e.dataTransfer.files). The XHR upload.onprogress pattern shows how to get real upload progress from the browser.' },
      { icon: 'STAR', title: 'Batch import and data migration upload tools', desc: 'Use for CSV, Excel, or JSON import interfaces where users upload multiple data files. Show per-file validation status (valid CSV, invalid format) alongside the progress bar. The summary bar communicates overall import progress for large batch operations.' },
    ],
    faqs: [
      { q: 'How do I wire this to a real file upload endpoint?', a: 'Replace the setInterval simulation for each file with a real XHR upload: const xhr = new XMLHttpRequest(); xhr.upload.addEventListener("progress", e => { if (e.lengthComputable) { const pct = Math.round(e.loaded/e.total*100); fill.style.width = pct+"%"; status.textContent = pct+"%"; updateOverallPct(list, total); } }); xhr.addEventListener("load", () => { status.textContent = "✓ Done"; status.className = "fi-status done"; done++; updateSummary(done, total); }); xhr.open("POST", "/api/upload"); const fd = new FormData(); fd.append("file", f); xhr.send(fd).' },
      { q: 'How do I validate file size and type before adding to the list?', a: 'In onFiles(), filter before the forEach: const valid = [...files].filter(f => { const e = ext(f.name); return allowedExts.includes(e) && f.size <= MAX_SIZE; }); const invalid = [...files].filter(f => !valid.includes(f)). For invalid files, create a .file-item with a red error status span instead of a progress bar: status.textContent = "File too large" or "Invalid type". Append these error items to the list alongside valid items.' },
      { q: 'How do I cancel an in-progress upload when the user clicks Remove?', a: 'Store each XHR in a Map keyed by file item ID: const xhrMap = new Map(); xhrMap.set(id, xhr) after creating the XHR. In removeItem(), call xhrMap.get(id)?.abort() before removing the DOM element and deleting from the Map. This stops the upload and prevents the progress callback from firing after the element is removed.' },
      { q: 'How do I use this file upload in React?', a: 'Click "JSX" to download. Manage files as an array in useState: [{id, name, size, pct, status}]. Add files in the drop/pick handler: setFiles(prev => [...prev, ...newFiles.map(toFileObj)]). Update each file\'s pct in the XHR progress handler: setFiles(prev => prev.map(f => f.id === id ? {...f, pct} : f)). Compute overall progress with useMemo: files.reduce((sum,f) => sum+f.pct, 0) / files.length.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing every listener by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why updateOverallPct() reads the actual .fi-fill widths from the DOM to compute the average rather than tracking a separate running total in a variable, and what problem that avoids when a file is removed mid-upload. It's a good optimization target too — ask whether keying each file's interval and DOM lookups by a Date.now()-based id is safe if two files are added in the same millisecond, and what a more robust id scheme would look like. For extending it, have it add real file type and size validation with inline error states, wire the setInterval simulation to a real XHR upload.onprogress handler, or add pause/resume support for individual file uploads. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drag-and-drop file upload interface with per-file and overall progress bars, in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A dropzone that highlights on dragover, un-highlights on dragleave, accepts dropped files via the drop event's dataTransfer.files, and also opens a hidden multi-file input when clicked.
- For every added file, create a list item showing an icon determined by the file's extension (grouped into image/pdf/zip/other categories), the file name, a human-formatted size (KB below 1MB, MB at or above), an individual progress bar, a live percentage/status label, and a remove button.
- Simulate each file's upload independently with its own interval timer that increments that file's percentage at a randomized speed, so different files complete at different times; when a file reaches 100%, its interval must stop and its status must switch to a completed state.
- Compute an overall summary progress bar by reading the current width of every visible per-file progress bar in the DOM and averaging them — not by tracking a separate counter — so that removing a file from the list before it finishes correctly adjusts the overall average.
- Clicking a file's remove button must cancel that file's running interval before removing its DOM element, and must recompute the overall summary immediately after.
- Once every file's interval has finished (no intervals remain running) and at least one file completed, update the summary label to a completed message.`,
    },
  },
};

export default uploadProgress;
