const contactPickerButton = {
  id: 'contact-picker-button',
  title: 'Contact Picker Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="cpk-wrap">
  <span class="cpk-tag">navigator.contacts · device contact picker</span>
  <h1>Invite a teammate</h1>
  <p id="cpkStatus">Choose a contact from your device, or type a name below.</p>

  <div class="cpk-card">
    <button class="cpk-btn primary" id="cpkPickBtn">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
      Choose contact
    </button>

    <div class="cpk-divider"><span>or enter manually</span></div>

    <label class="cpk-label" for="cpkNameInput">Contact name</label>
    <input class="cpk-input" id="cpkNameInput" type="text" placeholder="e.g. Priya Shah" />
    <label class="cpk-label" for="cpkEmailInput">Email</label>
    <input class="cpk-input" id="cpkEmailInput" type="email" placeholder="e.g. priya@example.com" />
    <button class="cpk-btn" id="cpkUseManualBtn">Use this contact</button>
  </div>

  <div class="cpk-selected" id="cpkSelected" hidden>
    <div class="cpk-avatar" id="cpkAvatar">?</div>
    <div>
      <strong id="cpkSelectedName"></strong>
      <span id="cpkSelectedEmail"></span>
    </div>
  </div>

  <p class="cpk-note">The Contact Picker API only exists on Chromium for Android — on desktop, and inside a sandboxed preview iframe, "Choose contact" will fall back to the manual name/email fields, which work as a real, standalone way to pick a contact for this demo.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0e1a2e,#040810 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.cpk-wrap{width:100%;max-width:420px;text-align:center}
.cpk-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.cpk-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.cpk-wrap p{font-size:13.5px;color:#94b1c4;margin-top:8px;line-height:1.6}
.cpk-card{margin-top:22px;border-radius:16px;border:1px solid rgba(125,211,252,.18);background:#0a1420;padding:20px;text-align:left}
.cpk-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e2f0f8;font:600 13px system-ui;cursor:pointer;transition:background .15s}
.cpk-btn:hover{background:rgba(255,255,255,.09)}
.cpk-btn.primary{background:linear-gradient(135deg,#38bdf8,#6366f1);border-color:transparent;color:#04101f;font-weight:700}
.cpk-divider{display:flex;align-items:center;gap:10px;margin:16px 0;font-size:11px;color:#5c7891;text-transform:uppercase;letter-spacing:.05em}
.cpk-divider::before,.cpk-divider::after{content:"";flex:1;height:1px;background:rgba(255,255,255,.1)}
.cpk-label{display:block;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#6f93a8;margin-bottom:6px}
.cpk-input{width:100%;padding:10px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:13.5px system-ui;outline:none;margin-bottom:12px;transition:border-color .15s}
.cpk-input:focus{border-color:#7dd3fc}
.cpk-selected{margin-top:18px;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:14px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.25);text-align:left}
.cpk-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#6366f1);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0}
.cpk-selected strong{display:block;font-size:14px}
.cpk-selected span{display:block;font-size:12px;color:#87a7ba;margin-top:2px}
.cpk-note{font-size:11.5px;color:#4d6577;max-width:400px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("cpkStatus");
var pickBtn = document.getElementById("cpkPickBtn");
var nameInput = document.getElementById("cpkNameInput");
var emailInput = document.getElementById("cpkEmailInput");
var useManualBtn = document.getElementById("cpkUseManualBtn");
var selectedBox = document.getElementById("cpkSelected");
var avatarEl = document.getElementById("cpkAvatar");
var selectedNameEl = document.getElementById("cpkSelectedName");
var selectedEmailEl = document.getElementById("cpkSelectedEmail");

var supported = "contacts" in navigator && "ContactsManager" in window;

function showSelected(name, email) {
  selectedNameEl.textContent = name;
  selectedEmailEl.textContent = email || "";
  avatarEl.textContent = (name || "?").trim().charAt(0).toUpperCase() || "?";
  selectedBox.hidden = false;
}

if (!supported) {
  pickBtn.textContent = "Choose contact (device picker unavailable)";
  statusEl.textContent = "The Contact Picker API is only available on Chromium for Android — use the fields below to pick a contact for this demo.";
}

async function pickDeviceContact() {
  if (!supported) {
    statusEl.textContent = "Native contact picking isn't available in this browser or context — enter a name and email below instead.";
    nameInput.focus();
    return;
  }

  try {
    statusEl.textContent = "Opening your device's contact picker\\u2026";
    var props = ["name", "email"];
    var opts = { multiple: false };
    var contacts = await navigator.contacts.select(props, opts);

    if (!contacts || contacts.length === 0) {
      statusEl.textContent = "No contact selected.";
      return;
    }

    var picked = contacts[0];
    var name = (picked.name && picked.name[0]) || "Unnamed contact";
    var email = (picked.email && picked.email[0]) || "";
    showSelected(name, email);
    statusEl.textContent = "Selected " + name + " from your device contacts.";
  } catch (err) {
    // SecurityError (not a real user gesture / insecure context), or the
    // call is disallowed inside a sandboxed preview iframe entirely.
    statusEl.textContent = "Couldn't open the device contact picker (" + (err && err.name ? err.name : "blocked") + ") — enter a name and email below instead.";
    nameInput.focus();
  }
}

function useManualContact() {
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();

  if (!name) {
    statusEl.textContent = "Enter at least a name before using this contact.";
    nameInput.focus();
    return;
  }

  showSelected(name, email);
  statusEl.textContent = "Using " + name + " as the selected contact.";
}

pickBtn.addEventListener("click", pickDeviceContact);
useManualBtn.addEventListener("click", useManualContact);
nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") useManualContact();
});
emailInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") useManualContact();
});`,

  seo: {
    title: 'Contact Picker Button — Free navigator.contacts with Manual Fallback',
    description: `A "Choose contact" button using the real Contact Picker API's navigator.contacts.select() on Chromium Android, with a genuinely useful manual name/email fallback for every other context. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Contact Picker Button — Native Device Picker With a Manual Path That Feels Just as Real',
      description: `The Contact Picker API's \`navigator.contacts.select()\` lets a web page ask the operating system's own address book for a contact — no server, no OAuth, just a native picker UI the browser owns. It's also one of the narrowest browser APIs in existence: it shipped only in Chromium on Android, has no desktop implementation anywhere, and needs a real top-level user gesture in a secure context, so it essentially never fires inside a sandboxed preview iframe. This snippet treats that reality directly by building a manual entry path that stands on its own as a real feature, not a "sorry, this doesn't work" message.

**The real device picker**

\`pickDeviceContact()\` gates the whole attempt behind checking both \`'contacts' in navigator\` and \`'ContactsManager' in window\`, then calls \`navigator.contacts.select(['name', 'email'], { multiple: false })\` inside a \`try/catch\`. On success, the resolved array's first entry's \`name\` and \`email\` fields populate the selected-contact card exactly the way a real invite flow would use them.

**A manual path built to feel complete, not apologetic**

Below the picker button sit two ordinary, always-present inputs for name and email, styled and labeled as a first-class alternative rather than a hidden fallback — "or enter manually" reads as an equal option, not an error state. \`useManualContact()\` validates that a name was entered, then renders the exact same selected-contact card the native picker would produce. Because almost every visitor to this demo — anyone not on Chromium for Android — will use this path by default, it had to be built as if it were the primary feature, which is exactly what makes this snippet worth studying alongside the more permission-flaky APIs in this batch.

**One rendering path for both sources**

\`showSelected(name, email)\` is the single function both the native picker and the manual form call to display a result, the same "shape-matched" discipline used in this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet, where simulated and real audio data feed the identical drawing function. Whichever source provided the contact, the resulting UI — an avatar initial, name, and email — is indistinguishable.

**Handling the empty and denied cases**

An empty picker result (the user backed out without choosing anyone) gets its own clear status message rather than being treated as an error, and any thrown exception — commonly a \`SecurityError\` from a missing user gesture or a blocked iframe permissions policy — routes straight to the manual fields with focus already placed in the name input, so recovering from a failed native attempt takes zero extra clicks. Pair this with a [share modal](/ui-snippets/share-modal/) for an invite flow, or a [team presence list](/ui-snippets/team-presence-list/) to show who's already been added.

**Customizing it**

Request additional properties like \`tel\` or \`icon\`, allow \`multiple: true\` for a bulk invite flow, or validate the manual email field's format before accepting it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Choose contact" button and manual name/email fields render.` },
      { title: 'Click "Choose contact" on Chromium Android', text: `The device's real contact picker opens.` },
      { title: 'Click it anywhere else', text: `It explains the API isn't available and focuses the manual fields.` },
      { title: 'Type a name and email', text: `Click "Use this contact" to select it the same way.` },
      { title: 'See the selected-contact card', text: `Both paths render to the identical avatar/name/email display.` },
      { title: 'Press Enter in either field', text: `Submits the manual contact without needing the mouse.` },
    ] },
    features: [
      { title: 'Real navigator.contacts.select call', text: `Genuinely opens the device's native contact picker.` },
      { title: 'Dual capability check', text: `Confirms both navigator.contacts and ContactsManager exist.` },
      { title: 'Equal-status manual entry', text: `A fully-fledged fallback UI, not an apology message.` },
      { title: 'Shared render path', text: `One function displays results from either source identically.` },
      { title: 'Empty-selection handling', text: `Backing out of the picker gets its own clear message.` },
      { title: 'Auto-focus recovery', text: `A failed native attempt focuses the manual name field.` },
      { title: 'Keyboard submit support', text: `Enter key submits the manual contact form.` },
      { title: 'Initial-letter avatar', text: `A generated avatar badge for the selected contact.` },
    ],
    useCases: [
      { title: 'Team invite flows', text: `Pair with a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Referral programs', text: `Combine with a [Web Share button](/ui-snippets/web-share-button/) to send the invite.` },
      { title: 'Emergency contact forms', text: `Let mobile users pick from their address book quickly.` },
      { title: 'CRM quick-add tools', text: `Speed up manual contact entry with a native shortcut.` },
      { title: 'Collaboration app onboarding', text: `Combine with a [share modal](/ui-snippets/share-modal/) for the invite step.` },
      { title: 'Support ticket assignment', text: `Pick or type a teammate to route a ticket to.` },
      { icon: 'CODE', title: 'Related: File System Access Save Dialog', desc: 'See the [File System Access Save Dialog](/ui-snippets/file-system-save-dialog/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why doesn’t "Choose contact" open my device’s address book?', a: `The Contact Picker API's navigator.contacts.select() is implemented only in Chromium-based browsers on Android — there is no desktop implementation in any browser, and it's routinely disallowed inside sandboxed preview iframes like the one likely rendering this demo, since it requires a genuine top-level user gesture in a secure context. On any of those unsupported platforms, the button automatically explains that and directs you to the manual name/email fields instead.` },
      { q: "Is the manual entry option just a placeholder?", a: `No \— it's built as a fully functional, standalone way to select a contact for this demo, since it's what the overwhelming majority of visitors will actually use (anyone not on Chromium for Android). Typing a name and email and clicking "Use this contact" produces the exact same selected-contact card the native picker would, through the same rendering function.` },
      { q: "What data does the real Contact Picker API expose?", a: `This snippet requests just name and email via navigator.contacts.select(['name', 'email'], { multiple: false }), but the API can also request tel (phone numbers), address, icon, and others, depending on what the browser supports and what the user's contact entry contains. Each requested property comes back as an array on the selected contact object, since a single contact can have multiple emails or phone numbers.` },
      { q: "What happens if I open the picker and back out without choosing anyone?", a: `navigator.contacts.select() resolves with an empty array rather than rejecting when the user dismisses the picker without selecting a contact. This snippet checks for that case explicitly and shows a plain "No contact selected" status, distinct from an actual failure like a permission or security error, which shows a different message and falls back to the manual fields.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Keep the selected contact (name and email) as component state, and call the same pickDeviceContact and useManualContact logic from your button click handlers, setting state instead of touching the DOM directly. The capability checks and the try/catch around navigator.contacts.select() work identically regardless of framework, since they're plain browser API calls.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the manual name/email entry path is written as a fully-featured, equally-weighted alternative to the native picker rather than a disabled-looking fallback message \— and why that design choice matters given the Contact Picker API's extremely narrow support (Chromium on Android only, no desktop browser at all). It's a good prompt for reasoning about API scoping generally: ask what the requested properties array (['name', 'email']) controls, and how the multiple option would change both the returned data shape and the UI needed to display several contacts at once. For extensions, ask it to add multiple-contact selection with a checklist-style result display, validate the manual email field's format before accepting it, or persist recently-used manual contacts in localStorage for quick reselection. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Contact Picker Button" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A "Choose contact" button, and below it, a clearly-labeled manual entry section with name and email input fields plus a "Use this contact" button, presented as an equally valid option rather than a hidden or apologetic fallback.
- A single shared display function that renders a selected contact (an avatar with the first letter of the name, the full name, and the email) so both the native picker and the manual form produce visually identical results.
- The Choose Contact button should check both 'contacts' in navigator and 'ContactsManager' in window before attempting anything, then call navigator.contacts.select(['name', 'email'], { multiple: false }) inside a try/catch. On a successful non-empty result, extract the first contact's name and email arrays and pass them to the shared display function. On an empty result (user backed out of the picker), show a distinct "No contact selected" status rather than treating it as an error.
- CRITICAL: since the Contact Picker API is supported only on Chromium for Android and has zero desktop browser support (meaning most visitors, and definitely anyone viewing this inside a sandboxed preview iframe where the underlying permission is virtually always unavailable, will never see the native picker work), make sure that on any unsupported-browser or thrown-error case, the status text explains what happened and focuses the manual name input so recovering takes no extra clicks — never leave the button in a dead-end state.
- The manual form should validate that a name was entered before accepting the contact, support submitting via the Enter key in either field, and use the exact same shared display function as the native path.`,
    },
  },
};

export default contactPickerButton;
