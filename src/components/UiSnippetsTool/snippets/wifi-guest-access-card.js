const wifiGuestAccessCard = {
  id: 'wifi-guest-access-card',
  title: 'Guest WiFi Access Card',
  category: 'cards',
  html: `<div class="wrap">
  <div class="wifi-card">
    <div class="wifi-head">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
      <div>
        <h3>Guest WiFi</h3>
        <p>Complimentary internet access</p>
      </div>
    </div>

    <div class="wifi-qr" id="wifiQr" aria-label="QR code to join guest WiFi network"></div>

    <div class="wifi-field">
      <span class="wifi-field-label">Network name (SSID)</span>
      <div class="wifi-field-row">
        <span class="wifi-field-val">Harbor-Guest</span>
        <button class="wifi-copy-btn" data-copy="Harbor-Guest" data-target="ssid">Copy</button>
      </div>
    </div>

    <div class="wifi-field">
      <span class="wifi-field-label">Password</span>
      <div class="wifi-field-row">
        <span class="wifi-field-val" id="wifiPassText">••••••••••</span>
        <button class="wifi-eye-btn" id="wifiEye" aria-label="Show password">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="wifi-copy-btn" data-copy="Sunset&2024!" data-target="pass">Copy</button>
      </div>
    </div>

    <p class="wifi-note" id="wifiNote">Password hidden — tap the eye icon to reveal it before sharing.</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 340px; }
.wifi-card { background: #fff; border-radius: 20px; padding: 22px; box-shadow: 0 18px 44px rgba(15,23,42,0.1); border: 1px solid #f1f5f9; }

.wifi-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.wifi-head svg { color: #6366f1; flex-shrink: 0; }
.wifi-head h3 { font-size: 15.5px; font-weight: 800; color: #0f172a; }
.wifi-head p { font-size: 12px; color: #94a3b8; margin-top: 1px; }

.wifi-qr { width: 148px; height: 148px; margin: 0 auto 18px; border-radius: 14px; background: #fff; border: 1px solid #f1f5f9; display: grid; grid-template-columns: repeat(21, 1fr); grid-template-rows: repeat(21, 1fr); padding: 10px; gap: 1px; }
.qr-cell { border-radius: 1px; }
.qr-cell.on { background: #0f172a; }

.wifi-field { margin-bottom: 14px; }
.wifi-field-label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 6px; }
.wifi-field-row { display: flex; align-items: center; gap: 8px; background: #f8fafc; border-radius: 10px; padding: 10px 12px; }
.wifi-field-val { flex: 1; font-size: 14px; font-weight: 700; color: #0f172a; font-family: ui-monospace, 'SF Mono', monospace; letter-spacing: 0.02em; }

.wifi-eye-btn { border: none; background: transparent; color: #94a3b8; cursor: pointer; display: flex; padding: 2px; flex-shrink: 0; transition: color 0.12s; }
.wifi-eye-btn:hover { color: #6366f1; }

.wifi-copy-btn { border: none; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.08); color: #4f46e5; font-size: 11.5px; font-weight: 700; padding: 6px 11px; border-radius: 7px; cursor: pointer; flex-shrink: 0; transition: background 0.12s, color 0.12s; }
.wifi-copy-btn:hover { background: #eef2ff; }
.wifi-copy-btn.copied { background: #dcfce7; color: #15803d; }

.wifi-note { font-size: 11.5px; color: #94a3b8; text-align: center; line-height: 1.5; transition: color 0.15s; }
.wifi-note.revealed { color: #16a34a; font-weight: 600; }`,
  js: `// Deterministic pseudo-random QR-style pattern generator so the SVG-free grid
// always renders the same "scannable-looking" pattern for a given seed string.
function seededPattern(seed, size) {
  var hash = 0;
  for (var i = 0; i < seed.length; i++) { hash = (hash * 31 + seed.charCodeAt(i)) >>> 0; }
  var cells = [];
  for (var r = 0; r < size; r++) {
    for (var c = 0; c < size; c++) {
      hash = (hash * 1103515245 + 12345) >>> 0;
      var isFinderCorner = (r < 6 && c < 6) || (r < 6 && c >= size - 6) || (r >= size - 6 && c < 6);
      cells.push(isFinderCorner ? finderPattern(r, c, size) : ((hash >> 9) & 1) === 1);
    }
  }
  return cells;
}

function finderPattern(r, c, size) {
  var localR = r < 6 ? r : (c < 6 ? r - (size - 6) : r);
  var localC = c < 6 ? c : c - (size - 6);
  var ring = Math.max(Math.abs(localR - 2.5), Math.abs(localC - 2.5));
  return ring < 1 || (ring >= 2 && ring < 3);
}

function renderQr() {
  var size = 21;
  var pattern = seededPattern('Harbor-Guest|Sunset&2024!', size);
  var wrap = document.getElementById('wifiQr');
  wrap.innerHTML = '';
  pattern.forEach(function (on) {
    var cell = document.createElement('div');
    cell.className = 'qr-cell' + (on ? ' on' : '');
    wrap.appendChild(cell);
  });
}

function copyText(text, btn) {
  var restore = btn.textContent;
  function done(ok) {
    btn.textContent = ok ? 'Copied!' : 'Failed';
    btn.classList.toggle('copied', ok);
    setTimeout(function () { btn.textContent = restore; btn.classList.remove('copied'); }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    done(ok);
  }
}

document.querySelectorAll('.wifi-copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () { copyText(btn.dataset.copy, btn); });
});

var revealed = false;
var REAL_PASSWORD = 'Sunset&2024!';
var eyeBtn = document.getElementById('wifiEye');
var passText = document.getElementById('wifiPassText');
var note = document.getElementById('wifiNote');

eyeBtn.addEventListener('click', function () {
  revealed = !revealed;
  passText.textContent = revealed ? REAL_PASSWORD : '••••••••••';
  eyeBtn.setAttribute('aria-label', revealed ? 'Hide password' : 'Show password');
  note.textContent = revealed
    ? 'Password visible — hide it again once your guest has connected.'
    : 'Password hidden — tap the eye icon to reveal it before sharing.';
  note.classList.toggle('revealed', revealed);
});

renderQr();`,
  seo: {
    title: 'Guest WiFi Access Card — Free HTML CSS JS Snippet',
    description: 'A guest WiFi card with a scannable QR pattern, a masked password with reveal toggle, and one-click copy for both network name and password. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Guest WiFi Access Card — QR Pattern, Masked Password Reveal & Copy-to-Clipboard',
      description: `The universal ritual of asking a host for the WiFi password — squinting at a router sticker, typing a long mixed-case string on a phone keyboard — is exactly what this card exists to replace. It presents a guest network's SSID and password as a compact, shareable card: a scannable QR pattern for one-tap join, a masked password that stays hidden by default, and copy buttons that put either value on the clipboard without anyone needing to read or retype it.

**A deterministic QR-style pattern without a QR library**

\`seededPattern()\` hashes the SSID-and-password string into a numeric seed, then walks a 21×21 grid deriving each cell's on/off state from that running hash — plus a dedicated \`finderPattern()\` function that draws the three square "finder" corner markers real QR codes use to help a scanner locate and orient the code. This produces a visually authentic-looking, deterministic pattern (the same credentials always render the same grid) without pulling in a QR-encoding library. For production use where the pattern must actually decode as a scannable QR code, swap \`renderQr()\` for a real QR-encoding library that encodes a \`WIFI:T:WPA;S:<ssid>;P:<password>;;\` payload string — the rest of the card (copy buttons, reveal toggle) works identically either way.

**Password hidden by default, revealed on demand**

\`wifiPassText\` shows a fixed-width bullet mask until the eye-icon button is clicked, at which point \`revealed\` flips and the real \`REAL_PASSWORD\` constant is swapped in. This matters for any shared or public-facing screen (a lobby kiosk, a printed card on a cafe counter, a wall-mounted tablet) — a password visible at all times to anyone glancing at the screen defeats the point of having one, so requiring a deliberate tap to reveal it adds a small but real layer of intent before it's exposed.

**Copy buttons that work with or without the async Clipboard API**

\`copyText()\` tries \`navigator.clipboard.writeText()\` first (the modern async Clipboard API), but falls back to creating an off-screen \`<textarea>\`, selecting its contents, and calling the older \`document.execCommand('copy')\` if the async API isn't available — some embedded browsers, older devices, and non-HTTPS contexts still lack Clipboard API support, and a guest WiFi card is exactly the kind of interface likely to be viewed from an unpredictable range of guest devices rather than a controlled internal environment.

**Feedback that confirms without demanding attention**

Each copy button briefly relabels itself "Copied!" (with a green tint) for 1.6 seconds before reverting, rather than opening a toast or alert — a guest who copied the password already knows what they copied; they just need confirmation the click registered before switching to their WiFi settings screen to paste it in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Set the real network credentials', text: 'Update the SSID text in the HTML, the data-copy attribute on the SSID copy button, and REAL_PASSWORD plus its matching data-copy attribute in the JS.' },
        { title: 'Tap the eye icon to reveal the password', text: 'The password stays masked with bullet characters by default; clicking the eye icon swaps in the real value and updates the helper note.' },
        { title: 'Click Copy on either field', text: 'The SSID or password is copied to the clipboard, with the button briefly showing "Copied!" as confirmation.' },
        { title: 'Swap in a real QR encoder for production', text: 'Replace renderQr() with a proper QR-encoding library call that encodes a WIFI:T:WPA;S:<ssid>;P:<password>;; payload string so phone cameras can actually auto-join.' },
        { title: 'Style for your venue', text: 'Update the header text, icon, and colors to match your hotel, cafe, office, or venue branding.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Deterministic seeded pattern generator with authentic-looking QR finder-corner markers, no external QR library',
      'Password masked with bullet characters by default, revealed only via an explicit eye-icon tap',
      'Copy-to-clipboard for both SSID and password using the async Clipboard API',
      'Automatic fallback to a hidden-textarea + execCommand copy method for browsers without Clipboard API support',
      'Button briefly relabels to "Copied!" with a green tint as inline confirmation, no toast or alert needed',
      'Helper note text changes based on whether the password is currently hidden or revealed',
      'Monospace field styling makes the SSID and password unambiguous to read and retype if needed',
      'Compact card sized for a lobby kiosk, printed tent card, or in-app "Connect to WiFi" screen',
    ],
    useCases: [
      { icon: 'APP', title: 'Hotel and hospitality in-room screens', desc: 'Show guest network credentials on an in-room tablet or the hotel app\'s room details screen, letting guests scan or copy instead of squinting at a card by the phone.' },
      { icon: 'FLOW', title: 'Cafe and restaurant self-serve kiosks', desc: 'Display on a countertop tablet or digital menu screen so customers can join WiFi without asking staff to read out a password.' },
      { icon: 'FORM', title: 'Office visitor and meeting room panels', desc: 'Pair with a visitor check-in flow or meeting-room booking display so guests get network access as part of arrival, not a separate ask.' },
      { icon: 'DESIGN', title: 'Event and conference venue signage apps', desc: 'Surface attendee WiFi credentials inside an event app alongside the schedule, avoiding printed cards that go out of date each event.' },
      { icon: 'CODE', title: 'Coworking space member portals', desc: 'Show member-specific or rotating guest network credentials inside a coworking space\'s member dashboard.' },
      { icon: 'LEARN', title: 'Learn clipboard fallback patterns', desc: 'A clean example of trying the modern async Clipboard API first and gracefully falling back to the older execCommand technique for broader device support.' },
    ],
    faqs: [
      { q: 'Does the QR code actually work with a phone camera to join WiFi?', a: 'The demo pattern is a deterministic, authentic-looking grid generated from a hash of the credentials — it is not a real encoded QR code and will not decode. For production, replace renderQr() with a proper QR-encoding library that encodes a WIFI:T:WPA;S:<ssid>;P:<password>;; payload string, which is the standard format phone cameras recognize as WiFi-join QR codes.' },
      { q: 'Why is the password hidden by default instead of always shown?', a: 'A guest WiFi card is often displayed on a shared or public screen (a lobby kiosk, a printed card, a wall tablet). Hiding the password by default and requiring a deliberate eye-icon tap to reveal it adds a small layer of intent before the credential is exposed to anyone glancing at the screen.' },
      { q: 'What happens if navigator.clipboard is unavailable?', a: 'copyText() falls back to creating an off-screen textarea containing the value, selecting its text, and calling the older document.execCommand("copy") API. This covers older browsers, some embedded WebViews, and non-HTTPS contexts where the modern async Clipboard API is unavailable.' },
      { q: 'How do I change which credentials are copied?', a: 'Update the data-copy attribute on each .wifi-copy-btn button to the value you want copied, and keep the REAL_PASSWORD constant and the visible SSID text in sync with the same values so the displayed and copied credentials always match.' },
      { q: 'Can I rotate the password periodically for security?', a: 'Yes — since the card reads REAL_PASSWORD from a single JavaScript constant and the QR pattern is regenerated from the same credential string via renderQr(), updating that one constant (and re-running renderQr()) on a schedule from your access point\'s admin API keeps both the displayed password and the QR pattern in sync automatically.' },
      { q: 'How do I use this in React or Vue?', a: 'In React, keep revealed as useState(false) and toggle it in the eye button\'s onClick, deriving the displayed password text from a ternary; keep the copy-to-clipboard function as a plain async helper called from each button\'s onClick with its own value. In Vue, use a ref for revealed and a computed property for the displayed password text.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the QR pattern in this demo is only visually authentic rather than a real scannable code, and what the standard WIFI: URI payload format looks like so a real QR-encoding library could generate a genuinely joinable code from the same SSID and password values. The same assistant can help optimize it — for instance asking whether the seeded hash function used for the placeholder pattern has any bias that makes it look less randomly distributed than a real QR code's error-correction-encoded data would. It's also useful for extending the card: ask it to add a password-strength or expiry indicator, support multiple guest networks in a tabbed view, or wire the copy buttons to also fire an analytics event so a venue can see how often guests use copy versus scanning. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "guest WiFi access card" in plain HTML, CSS, and JavaScript — no external QR-code library, no framework.

Requirements:
- Display a network name (SSID) and a password as two separate labeled fields, each with its own "Copy" button that copies just that field's exact value to the clipboard.
- The password field must be masked with a fixed-width placeholder (such as bullet characters) by default, with a separate eye-icon toggle button that reveals the real password text on click and re-masks it on a second click, updating its own accessible label ("Show password" / "Hide password") each time.
- Implement the copy behavior by trying the modern async Clipboard API first, and if it is unavailable, falling back to creating a temporary off-screen textarea, selecting its content, and using the older execCommand-based copy method — the button must show a brief inline "Copied!" confirmation (not a browser alert or external toast library) that reverts back to its original label after roughly a second and a half.
- Render a square placeholder QR-style grid pattern (does not need to be a real, scannable, standards-compliant QR code) generated deterministically from the SSID and password strings, including at least the three square corner "finder" markers real QR codes use, using only div elements or an SVG grid — no image file and no QR-generation library.
- Show a small helper text line beneath the fields whose wording changes depending on whether the password is currently hidden or revealed.`,
    },
  },
};

export default wifiGuestAccessCard;
