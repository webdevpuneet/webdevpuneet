const resumeUploadDropzone = {
  id: 'resume-upload-dropzone',
  title: 'Resume Upload Dropzone',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="rud-card">
  <h2>Upload your resume</h2>
  <p class="rud-sub">PDF or DOCX, up to 5MB.</p>

  <div class="rud-zone" id="rudZone">
    <input type="file" id="rudInput" accept=".pdf,.doc,.docx" hidden />
    <div class="rud-idle" id="rudIdle">
      <div class="rud-icon">&#8593;</div>
      <p><strong>Drag &amp; drop your resume here</strong></p>
      <p class="rud-or">or</p>
      <button type="button" class="rud-browse" id="rudBrowse">Browse files</button>
    </div>

    <div class="rud-progress-state" id="rudProgressState" hidden>
      <div class="rud-file-row">
        <span class="rud-file-icon">&#128196;</span>
        <div class="rud-file-info">
          <strong id="rudFileName">resume.pdf</strong>
          <span id="rudFileSize">—</span>
        </div>
      </div>
      <div class="rud-bar-track"><div class="rud-bar-fill" id="rudBarFill"></div></div>
      <span class="rud-pct" id="rudPct">0%</span>
    </div>

    <div class="rud-done-state" id="rudDoneState" hidden>
      <div class="rud-check">&#10003;</div>
      <p><strong id="rudDoneName">resume.pdf</strong> uploaded &amp; parsed</p>
      <button type="button" class="rud-remove" id="rudRemove">Remove &amp; upload another</button>
    </div>
  </div>

  <p class="rud-error" id="rudError"></p>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:40px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.rud-card{width:100%;max-width:440px;background:#12141f;border:1px solid #23273a;border-radius:18px;padding:26px}
.rud-card h2{margin:0 0 4px;font-size:19px}
.rud-sub{margin:0 0 18px;color:#9aa0b8;font-size:13.5px}
.rud-zone{border:2px dashed #2c3046;border-radius:14px;padding:28px 20px;text-align:center;transition:border-color .15s ease,background .15s ease;background:#0f1119}
.rud-zone.rud-dragover{border-color:#6d5efc;background:#161a2c}
.rud-icon{width:44px;height:44px;border-radius:50%;background:#181b27;color:#a5b4fc;display:flex;align-items:center;justify-content:center;font-size:18px;margin:0 auto 12px}
.rud-idle p{margin:0 0 4px;font-size:13.5px;color:#c7cade}
.rud-or{color:#6d7290 !important;font-size:12px;margin:8px 0 !important}
.rud-browse{padding:9px 18px;border-radius:9px;border:1px solid #2c3046;background:#181b27;color:#e7e9f2;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.rud-browse:hover{border-color:#6d5efc}
.rud-file-row{display:flex;align-items:center;gap:10px;text-align:left;margin-bottom:14px}
.rud-file-icon{font-size:22px}
.rud-file-info{display:flex;flex-direction:column}
.rud-file-info strong{font-size:13.5px}
.rud-file-info span{font-size:11.5px;color:#8a8fa8}
.rud-bar-track{height:8px;border-radius:99px;background:#20232f;overflow:hidden}
.rud-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#6d5efc,#22d3ee);border-radius:99px;transition:width .15s linear}
.rud-pct{display:block;text-align:right;margin-top:6px;font-size:11.5px;color:#8a8fa8}
.rud-done-state .rud-check{width:44px;height:44px;border-radius:50%;background:#0f2e22;color:#34d399;display:flex;align-items:center;justify-content:center;font-size:18px;margin:0 auto 12px}
.rud-done-state p{margin:0 0 14px;font-size:13.5px;color:#c7cade}
.rud-remove{padding:8px 16px;border-radius:9px;border:1px solid #2c3046;background:transparent;color:#c7cade;font:inherit;font-size:12.5px;font-weight:600;cursor:pointer}
.rud-remove:hover{background:#181b27}
.rud-error{min-height:18px;margin:10px 2px 0;color:#f87171;font-size:12.5px}`,

  js: `const zone = document.getElementById('rudZone');
const input = document.getElementById('rudInput');
const idleState = document.getElementById('rudIdle');
const progressState = document.getElementById('rudProgressState');
const doneState = document.getElementById('rudDoneState');
const errorMsg = document.getElementById('rudError');

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['pdf', 'doc', 'docx'];

document.getElementById('rudBrowse').addEventListener('click', () => input.click());
input.addEventListener('change', () => {
  if (input.files[0]) handleFile(input.files[0]);
});

// Real HTML5 drag events: dragover highlights the zone, dragleave clears it,
// and drop reads the actual dropped File from the DataTransfer object.
['dragenter', 'dragover'].forEach((evt) => {
  zone.addEventListener(evt, (e) => {
    e.preventDefault();
    zone.classList.add('rud-dragover');
  });
});
['dragleave', 'dragend'].forEach((evt) => {
  zone.addEventListener(evt, (e) => {
    if (evt === 'dragleave' && zone.contains(e.relatedTarget)) return;
    zone.classList.remove('rud-dragover');
  });
});
zone.addEventListener('drop', (e) => {
  e.preventDefault();
  zone.classList.remove('rud-dragover');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

function handleFile(file) {
  errorMsg.textContent = '';
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED.includes(ext)) {
    errorMsg.textContent = 'Unsupported file type. Please upload a PDF or DOCX.';
    return;
  }
  if (file.size > MAX_BYTES) {
    errorMsg.textContent = 'File is too large. Maximum size is 5MB.';
    return;
  }
  startUpload(file);
}

function startUpload(file) {
  idleState.hidden = true;
  doneState.hidden = true;
  progressState.hidden = false;
  document.getElementById('rudFileName').textContent = file.name;
  document.getElementById('rudFileSize').textContent = formatBytes(file.size);

  const fill = document.getElementById('rudBarFill');
  const pctLabel = document.getElementById('rudPct');
  let pct = 0;
  const timer = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 22 + 8);
    fill.style.width = pct + '%';
    pctLabel.textContent = Math.round(pct) + '%';
    if (pct >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        progressState.hidden = true;
        doneState.hidden = false;
        document.getElementById('rudDoneName').textContent = file.name;
      }, 350);
    }
  }, 180);
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

document.getElementById('rudRemove').addEventListener('click', () => {
  input.value = '';
  doneState.hidden = true;
  progressState.hidden = true;
  idleState.hidden = false;
  errorMsg.textContent = '';
});`,

  seo: {
    title: 'Resume Upload Dropzone — Free Drag & Drop File Upload UI',
    description: `A resume upload dropzone with real HTML5 drag-and-drop, click-to-browse fallback, file type/size validation, a simulated upload progress bar, and a parsed-filename confirmation state.`,
    about: {
      title: 'Resume Upload Dropzone — Drag, Validate, Upload, Confirm',
      description: `The resume upload dropzone is the file-upload pattern behind every job application: drag a file in (or click to browse), see it validated, watch it upload, and get confirmation it was received. This snippet builds the full state machine in plain HTML, CSS, and JavaScript using real HTML5 drag events.

**Genuine drag-and-drop, not a decorative border**

The zone listens for \`dragenter\`/\`dragover\` to add a highlighted \`rud-dragover\` state, and \`dragleave\`/\`dragend\` to remove it — checking \`zone.contains(e.relatedTarget)\` on \`dragleave\` so the highlight doesn't flicker as the pointer moves between child elements inside the zone. The \`drop\` handler reads \`e.dataTransfer.files[0]\`, the actual \`File\` object the browser handed over from the OS-level drag, not a name typed into a text field.

**Click-to-browse as a real fallback**

A hidden native \`<input type="file">\` is triggered by the visible "Browse files" button, and its \`change\` event runs through the exact same \`handleFile\` function as a drop — so both paths validate and upload identically, with no duplicated logic.

**Validation before anything uploads**

\`handleFile\` checks the file extension against an allow-list and the size against a 5MB cap before calling \`startUpload\`. Failing either shows an inline error and the zone stays in its idle state — nothing is "uploaded" and then rejected after the fact.

**A progress bar with real state transitions**

\`startUpload\` swaps the idle view for a progress view showing the filename and formatted size, then increments a simulated percentage on an interval until it reaches 100, at which point it swaps again to a done view with a checkmark and the confirmed filename — three distinct visual states, not just a spinner.

**Remove and restart**

The done state's "Remove & upload another" button resets the file input's value (necessary, since browsers won't fire \`change\` again for the same file otherwise) and returns to idle, so the whole flow can repeat.

**Customizing it**

Swap the simulated progress interval for real \`XMLHttpRequest\`/\`fetch\` upload-progress events, add a file preview thumbnail, or extend validation to check the file's actual MIME type. Pair it with an [avatar upload](/ui-snippets/avatar-upload/) for profile photos, or a [file dropzone](/ui-snippets/file-dropzone/) for general-purpose uploads.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `An idle dropzone with a browse button renders.` },
      { title: 'Drag a file over the zone', text: `It highlights with a solid accent border.` },
      { title: 'Drop the file (or click Browse)', text: `Both paths validate type and size identically.` },
      { title: 'Try an oversized or wrong-type file', text: `An inline error appears and nothing uploads.` },
      { title: 'Drop a valid resume', text: `A progress bar animates from 0% to 100%.` },
      { title: 'See the confirmation', text: `A checkmark and filename confirm the upload; remove to retry.` },
    ] },
    features: [
      { title: 'Real HTML5 drag events', text: `dragenter/dragover/dragleave/drop, not decoration.` },
      { title: 'Shared validation path', text: `Drop and browse both call the same handleFile.` },
      { title: 'Type & size validation', text: `Extension allow-list and a 5MB cap, checked before upload.` },
      { title: 'Flicker-free highlight', text: `relatedTarget check avoids dragleave flicker on children.` },
      { title: 'Simulated progress bar', text: `Animates realistically toward 100%.` },
      { title: 'Three-state flow', text: `Idle, uploading, and done are visually distinct.` },
      { title: 'Formatted file size', text: `Bytes shown as B/KB/MB automatically.` },
      { title: 'Remove & retry', text: `Resets the input so the same file can be re-selected.` },
    ],
    useCases: [
      { title: 'Job application forms', text: 'Collect a CV next to an [interview scheduler form](/ui-snippets/interview-scheduler-form/), with true HTML5 drag events and a click-to-browse fallback.' },
      { title: 'Applicant portal intake', text: 'Gather resumes ahead of a [candidate pipeline kanban](/ui-snippets/candidate-pipeline-kanban/), validating extension and a 5 MB cap before upload begins.' },
      { title: 'Profile photo variants', text: 'See [avatar upload](/ui-snippets/avatar-upload/) for a cropped image version, using the same shared `handleFile` path for drops and browsing.' },
      { title: 'General document uploads', text: 'Compare with a plain [file dropzone](/ui-snippets/file-dropzone/), noting how a `relatedTarget` check avoids dragleave flicker over child elements.' },
      { title: 'Grant and portfolio applications', text: 'Reuse for scholarship supporting documents or a freelancer\'s CV and work-sample PDFs, with a parsed filename shown on success.' },
    ],
    faqs: [
      { q: 'Is the drag-and-drop real, or just a styled border with a click fallback?', a: `It's real HTML5 drag-and-drop. The zone listens for the actual dragenter, dragover, dragleave, and drop events the browser fires during an OS-level file drag, and the drop handler reads e.dataTransfer.files[0] to get the genuine File object the user dragged in — not a value typed or selected some other way. The click-to-browse path exists alongside it as an accessible fallback, using the same validation function.` },
      { q: 'Why check e.relatedTarget on dragleave instead of just removing the highlight immediately?', a: `Because the dropzone contains child elements (icon, text, button), moving the pointer from the zone onto one of its own children also fires dragleave on the outer zone — without the relatedTarget check, the highlight would flicker on and off as the pointer crosses internal element boundaries. Checking zone.contains(e.relatedTarget) confirms the pointer actually left the zone entirely before clearing the highlight.` },
      { q: 'How is the file validated before uploading?', a: `handleFile extracts the file extension from file.name and checks it against an allow-list (pdf, doc, docx), and separately checks file.size against a 5MB byte threshold. Either failure sets an inline error message and returns immediately, before startUpload is ever called — so an invalid file never enters the upload/progress state at all.` },
      { q: 'How would I connect the progress bar to a real upload instead of a simulated one?', a: `Replace the setInterval loop in startUpload with an XMLHttpRequest (which supports upload.onprogress with loaded/total byte counts) or a fetch call using a ReadableStream reader, and set the bar's width and percentage label from the real progress event instead of random increments. The state-swapping logic (idle to progress to done) stays the same either way.` },
      { q: 'How do I use this dropzone in React, Vue, or Angular?', a: `Bind the same dragenter/dragover/dragleave/drop handlers to a container ref using your framework's event syntax, store upload state (idle/uploading/done, filename, progress percent, error) in component state, and conditionally render the three views from that state instead of toggling hidden attributes directly. The file validation function is plain JavaScript and needs no changes.` },
    ],
    aiPrompt: {
      paragraph: `File upload zones have a few non-obvious correctness details, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to explain why dragleave needs the e.relatedTarget/contains check to avoid flicker when the dropzone has child elements, and how e.dataTransfer.files differs from the file input's own .files property despite both ending up in the same handleFile function. The same assistant can help you take this to production — ask it to swap the simulated setInterval progress bar for real upload progress using XMLHttpRequest's upload.onprogress event, add drag-and-drop support for multiple files with a per-file progress row, or validate the file's actual content type via its magic bytes rather than trusting the extension alone (since a renamed file can have any extension).`,
      prompt: `Build a "resume upload dropzone" in plain HTML, CSS, and JavaScript — no frameworks, no dependencies.

Requirements:
- A dropzone that responds to real HTML5 drag events: dragenter and dragover add a highlighted visual state and call preventDefault; dragleave and dragend remove it, with dragleave specifically checking e.relatedTarget against the zone (via .contains) so the highlight doesn't flicker when the pointer moves across child elements inside the zone rather than truly leaving it.
- A drop handler that calls preventDefault and reads the dropped file from e.dataTransfer.files[0] (a real File object).
- A hidden native file input triggered by a visible "Browse files" button, whose change event routes through the exact same file-handling function as the drop handler — no duplicated validation logic between the two paths.
- Validation of both file extension (allow only pdf/doc/docx) and file size (reject anything over 5MB) before any upload begins; a failure shows an inline error message and leaves the zone in its idle state.
- A simulated upload: on a valid file, swap to a progress view showing the filename and a human-readable formatted size (B/KB/MB), animate a progress bar from 0% to 100% using a timer with randomized increments, then swap to a done/confirmation view showing a checkmark and the filename.
- A "remove and upload another" action in the done state that resets the file input's value (so selecting the same filename again still fires a change event) and returns to the idle view.
- Keep it in a dark theme, and make sure the JavaScript only references classnames/ids that exist in the HTML you write.`,
    },
  },
};

export default resumeUploadDropzone;
