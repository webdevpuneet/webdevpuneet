const fileSystemSaveDialog = {
  id: 'file-system-save-dialog',
  title: 'File System Access Save Dialog',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="fsd-wrap">
  <span class="fsd-tag">showSaveFilePicker · file system access api</span>
  <h1>Export notes.txt</h1>
  <p id="fsdStatus">Click save to write the file to disk.</p>

  <div class="fsd-card">
    <label class="fsd-label" for="fsdText">File contents</label>
    <textarea class="fsd-textarea" id="fsdText" rows="5">Meeting notes — 22 Aug 2026

- Ship the save-dialog snippet
- Review fallback copy for accuracy
- Demo on Friday</textarea>
    <button class="fsd-btn primary" id="fsdSaveBtn">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>
      <span id="fsdSaveLabel">Save file</span>
    </button>
  </div>

  <p class="fsd-note">showSaveFilePicker is only implemented in Chromium browsers and needs a real user gesture on a top-level page — most browsers, and this demo when embedded in a sandboxed preview iframe, will use the download-link fallback instead, which is honestly what most visitors will actually see.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0e1f16,#050b08 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.fsd-wrap{width:100%;max-width:460px;text-align:center}
.fsd-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.fsd-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.fsd-wrap p{font-size:13.5px;color:#9cc2ab;margin-top:8px;line-height:1.6}
.fsd-card{margin-top:22px;border-radius:16px;border:1px solid rgba(110,231,183,.18);background:#0a1710;padding:18px;text-align:left}
.fsd-label{display:block;font-size:11.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#7fae90;margin-bottom:8px}
.fsd-textarea{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e3f5ea;font:13px/1.6 ui-monospace,Menlo,monospace;resize:vertical;outline:none;transition:border-color .15s}
.fsd-textarea:focus{border-color:#6ee7b7}
.fsd-btn{width:100%;margin-top:14px;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e3f5ea;font:700 13px system-ui;cursor:pointer;transition:background .15s,transform .1s}
.fsd-btn:hover{background:rgba(255,255,255,.09)}
.fsd-btn:active{transform:scale(.98)}
.fsd-btn.primary{background:linear-gradient(135deg,#34d399,#10b981);border-color:transparent;color:#052e1c}
.fsd-btn.saved{background:rgba(74,222,128,.16);border-color:rgba(74,222,128,.4);color:#86efac}
.fsd-note{font-size:11.5px;color:#557364;max-width:420px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("fsdStatus");
var textArea = document.getElementById("fsdText");
var saveBtn = document.getElementById("fsdSaveBtn");
var saveLabel = document.getElementById("fsdSaveLabel");

function flashSaved(message) {
  saveBtn.classList.add("saved");
  var original = saveLabel.textContent;
  saveLabel.textContent = "Saved!";
  statusEl.textContent = message;
  setTimeout(function () {
    saveBtn.classList.remove("saved");
    saveLabel.textContent = original;
  }, 1800);
}

// --- Fallback: the classic <a download> blob-URL technique. This is what
// most browsers actually use, since showSaveFilePicker is Chromium-only.
function downloadFallback(filename, contents) {
  var blob = new Blob([contents], { type: "text/plain" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  flashSaved("Downloaded via the browser's normal download flow (no native save dialog available).");
}

async function saveFile() {
  var contents = textArea.value;
  var filename = "notes.txt";

  if (!("showSaveFilePicker" in window)) {
    // Firefox, Safari, and any non-Chromium browser simply do not implement
    // this API at all — this is the expected, common path.
    statusEl.textContent = "The File System Access API isn't available in this browser — using a regular download instead.";
    downloadFallback(filename, contents);
    return;
  }

  try {
    var handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{ description: "Text file", accept: { "text/plain": [".txt"] } }],
    });
    var writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
    flashSaved("Saved to disk via the native save dialog.");
  } catch (err) {
    if (err && err.name === "AbortError") {
      // The user closed the native picker without choosing a location.
      statusEl.textContent = "Save cancelled.";
      return;
    }
    // showSaveFilePicker exists but failed — commonly a SecurityError
    // because the call happened outside a real top-level user gesture, or
    // because it's disallowed inside a sandboxed preview iframe entirely.
    statusEl.textContent = "Native save dialog unavailable here (" + (err && err.name ? err.name : "blocked") + ") — using a regular download instead.";
    downloadFallback(filename, contents);
  }
}

saveBtn.addEventListener("click", saveFile);`,

  seo: {
    title: 'File System Access Save Dialog — Free showSaveFilePicker + Download Fallback',
    description: `A save-file button that uses the real File System Access API's showSaveFilePicker() where supported, falling back honestly to the classic <a download> blob technique everywhere else. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'File System Access Save Dialog — Native Picker With a Universal Download Fallback',
      description: `This snippet calls \`window.showSaveFilePicker()\`, part of the File System Access API, to open a genuine native "Save As" dialog and write a generated text file directly to the chosen location on disk. It's a striking capability — real filesystem writes from a web page — but it's also one of the narrowest in browser support: Chromium-based browsers only, and even there it needs a direct, top-level user gesture, so it's routinely unavailable inside a sandboxed preview iframe. The snippet is built around the assumption that most visitors will hit the fallback, not the native path.

**The real save path**

When \`'showSaveFilePicker' in window\` is true, \`saveFile()\` calls it with a suggested filename and an accepted MIME type, gets back a file handle, opens a writable stream with \`handle.createWritable()\`, writes the textarea's contents, and closes the stream. The result is a real file written wherever the user chose in a native OS dialog — no download folder, no blob URL.

**The fallback everyone else gets**

Everywhere else — Firefox, Safari, and any context where the API throws (a \`SecurityError\` from a missing user-activation, or the whole feature being disallowed inside a sandboxed iframe) — \`downloadFallback()\` builds a \`Blob\`, wraps it in \`URL.createObjectURL\`, and clicks a temporary \`<a download>\` link. This is the technique behind this library's [download button](/ui-snippets/download-button/) snippet, and it's honestly the one that matters most here: it's what the overwhelming majority of real-world visitors to this exact demo will experience.

**Naming the mode, not hiding it**

Every path updates the status line with a specific sentence — "saved via the native dialog" versus "downloaded via the browser's normal download flow" — rather than a generic "Done." A visitor on Firefox should never wonder if the demo secretly failed; the status text says plainly which mechanism actually ran, matching the honesty pattern set by [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) elsewhere in this library.

**Handling cancellation separately**

Closing the native picker without choosing a location throws an \`AbortError\`, which is treated as a normal cancellation — the status simply says "Save cancelled," and the code does not fall through to a download the user never asked for. Only genuine failures (missing support, blocked permission, security errors) trigger the fallback.

**Customizing it**

Change the accepted file type and extension, generate the contents dynamically (CSV export, JSON config, a report), or add a second button that always forces the download-link path for a consistent one-click export regardless of browser.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A textarea with sample contents and a Save file button render.` },
      { title: 'Click "Save file" in Chrome/Edge', text: `A native OS save dialog opens; choose a location and it writes.` },
      { title: 'Click it in Firefox or Safari', text: `It falls back automatically to a normal file download.` },
      { title: 'Cancel the native picker', text: `The status reads "Save cancelled" — no fallback download fires.` },
      { title: 'Edit the textarea', text: `Whatever you type is what gets saved or downloaded.` },
      { title: 'Read the status line', text: `It always names which mechanism actually saved the file.` },
    ] },
    features: [
      { title: 'Real showSaveFilePicker call', text: `Opens a genuine native "Save As" dialog where supported.` },
      { title: 'Writable file stream', text: `createWritable() writes contents directly to disk.` },
      { title: 'Universal download fallback', text: `Blob + <a download> works in every modern browser.` },
      { title: 'AbortError handled cleanly', text: `A cancelled picker doesn't trigger a surprise download.` },
      { title: 'Capability check first', text: `Feature-detects showSaveFilePicker before calling it.` },
      { title: 'Named status per path', text: `States plainly whether native or fallback save ran.` },
      { title: 'Editable source content', text: `The textarea's live value is what gets exported.` },
      { title: 'Blob URL cleanup', text: `Object URLs are revoked after the download starts.` },
    ],
    useCases: [
      { title: 'Note or draft export tools', text: `Save editor contents as a real local file.` },
      { title: 'Data export buttons', text: `Pair with a [download button](/ui-snippets/download-button/) for CSV/JSON.` },
      { title: 'Report generation', text: `Let users choose exactly where a generated report lands.` },
      { title: 'Code playgrounds', text: `Save a snippet's source to disk without a backend.` },
      { title: 'Config/settings backups', text: `Export a dashboard's current [status](/ui-snippets/status-dashboard/) config.` },
      { title: 'Offline-first apps', text: `Persist user work to disk without any server round-trip.` },
      { icon: 'CODE', title: 'Related: Media Session API Controls', desc: 'See the [Media Session API Controls](/ui-snippets/media-session-controls/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "Why does clicking Save open my browser's normal download instead of a save dialog?", a: `showSaveFilePicker() is part of the File System Access API, which only Chromium-based browsers (Chrome, Edge, Opera) implement — Firefox and Safari don't support it at all. This snippet checks for that support before attempting the call, and falls back to the classic Blob + <a download> technique everywhere else, which is what triggers your browser's normal download flow instead of a native dialog.` },
      { q: "Why might the native save dialog fail even in Chrome?", a: `showSaveFilePicker() requires a direct, top-level user gesture — a click handler chain that hasn't been delayed by an async gap — and it's disallowed inside many sandboxed iframe contexts (including, likely, wherever this demo preview is rendered) regardless of browser. When the call throws for any reason other than a user cancelling the dialog, the code catches it and falls back to the download-link technique automatically.` },
      { q: "What happens if I cancel the native save dialog?", a: `Closing the picker without choosing a location or filename throws an AbortError. This snippet treats that specifically as a cancellation, not a failure — it updates the status text to "Save cancelled" and does not fall through to the download fallback, since the native picker itself worked, the user just backed out.` },
      { q: "Is the fallback download actually a good experience?", a: `Yes — the <a download> blob technique is the same mechanism behind virtually every "export" or "download" button on the web, and it's supported in every modern browser without any permission prompt at all. The only difference from the native picker is that the file lands in the browser's configured downloads folder rather than a location you choose interactively.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Keep the file contents in component state bound to the textarea, and call the same saveFile() logic — the showSaveFilePicker check, try/catch, and downloadFallback — from a click handler. There's nothing framework-specific about either the File System Access API or the Blob/URL.createObjectURL fallback; both are plain browser APIs that work identically regardless of framework.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain the two save paths side by side: how showSaveFilePicker's returned file handle and createWritable() stream differ from the Blob + URL.createObjectURL + <a download> technique, and why the code checks 'showSaveFilePicker' in window before ever attempting the call rather than just wrapping everything in one try/catch. It's a good prompt for reasoning about narrow-support browser APIs generally — ask which browsers implement the File System Access API today, why it requires a direct user gesture, and why sandboxed iframes commonly disallow it even in Chrome. For extensions, ask it to add support for opening and re-saving an existing file with showOpenFilePicker, exporting multiple file types (CSV, JSON) with different MIME/extension pairs, or a progress indicator for larger generated files. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "File System Access Save Dialog" button in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A textarea with some default sample text content and a "Save file" button.
- The Save button should check 'showSaveFilePicker' in window before calling it (do not assume it exists), and when available, call window.showSaveFilePicker with a suggestedName and an accept type of text/plain, then get a writable stream via handle.createWritable(), write the textarea's current value, and close the stream — all wrapped in a try/catch.
- Handle the AbortError case specially: if the user cancels the native save dialog, show a "Save cancelled" status and do not fall back to a download.
- CRITICAL: implement a full fallback for every other case — the API missing entirely (Firefox, Safari, and most non-Chromium browsers, which is the expected common case) or the call throwing for any reason other than cancellation (e.g. a SecurityError because the call happened outside a genuine user gesture, or because the feature is disallowed inside a sandboxed iframe, a likely scenario for wherever this demo renders). The fallback should build a Blob from the textarea's contents, create an object URL with URL.createObjectURL, click a temporary anchor element with a download attribute set to the filename, then revoke the object URL after a short delay.
- A status text element that clearly states, after each attempt, whether the file was saved via the native picker or downloaded via the fallback technique, so a viewer understands which mechanism actually ran rather than assuming the button is broken if no native dialog appears.`,
    },
  },
};

export default fileSystemSaveDialog;
