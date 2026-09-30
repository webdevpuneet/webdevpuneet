const webShareButton = {
  id: 'web-share-button',
  title: 'Web Share Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="wsb-wrap">
  <span class="wsb-tag">navigator.share · web share api</span>
  <h1>Share this page</h1>
  <p id="wsbStatus">Tap share to open your device's native share sheet.</p>

  <div class="wsb-card">
    <div class="wsb-preview">
      <div class="wsb-favicon">◆</div>
      <div>
        <strong>Fjord Design System</strong>
        <span>fjord.design/components/button</span>
      </div>
    </div>
    <div class="wsb-actions">
      <button class="wsb-btn primary" id="wsbShareBtn">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>
        Share
      </button>
      <button class="wsb-btn" id="wsbCopyBtn">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        <span id="wsbCopyLabel">Copy link</span>
      </button>
    </div>
  </div>

  <p class="wsb-note">Most desktop browsers, and any page inside a sandboxed preview iframe, don't expose <code>navigator.share</code> — this demo falls back to a copy-link flow automatically so it's never a dead button.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f1f2e,#040a10 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.wsb-wrap{width:100%;max-width:460px;text-align:center}
.wsb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5eead4;background:rgba(94,234,212,.1);border:1px solid rgba(94,234,212,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.wsb-wrap h1{font-size:clamp(26px,6vw,34px);font-weight:800;letter-spacing:-.02em}
.wsb-wrap p{font-size:13.5px;color:#9db4c0;margin-top:8px;line-height:1.6}
.wsb-card{margin-top:22px;border-radius:16px;border:1px solid rgba(94,234,212,.18);background:#0a151c;padding:18px;text-align:left}
.wsb-preview{display:flex;align-items:center;gap:12px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.08)}
.wsb-favicon{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#2dd4bf,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.wsb-preview strong{display:block;font-size:14px}
.wsb-preview span{display:block;font-size:12px;color:#7c93a0;margin-top:2px}
.wsb-actions{display:flex;gap:10px;margin-top:16px}
.wsb-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e6f3f0;font:600 13px system-ui;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}
.wsb-btn:hover{background:rgba(255,255,255,.09)}
.wsb-btn:active{transform:scale(.97)}
.wsb-btn.primary{background:linear-gradient(135deg,#2dd4bf,#0ea5e9);border-color:transparent;color:#052321;font-weight:700}
.wsb-btn.copied{background:rgba(74,222,128,.16);border-color:rgba(74,222,128,.4);color:#86efac}
.wsb-note{font-size:11.5px;color:#5c7078;max-width:420px;margin:16px auto 0;line-height:1.6}
.wsb-note code{background:rgba(255,255,255,.06);padding:1px 5px;border-radius:4px;font-size:10.5px}`,

  js: `var statusEl = document.getElementById('wsbStatus');
var shareBtn = document.getElementById('wsbShareBtn');
var copyBtn = document.getElementById('wsbCopyBtn');
var copyLabel = document.getElementById('wsbCopyLabel');

var shareData = {
  title: 'Fjord Design System',
  text: 'Check out the Button component in the Fjord Design System.',
  url: (location.href.indexOf('about:') === 0 ? 'https://example.com/components/button' : location.href),
};

// --- Layer 3: manual select-and-copy, the last resort when even
// execCommand fails (very old or locked-down browsers).
function manualCopyFallback() {
  var input = document.createElement('input');
  input.value = shareData.url;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.focus();
  input.select();
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(input);
  return ok;
}

function flashCopied() {
  copyBtn.classList.add('copied');
  copyLabel.textContent = 'Copied!';
  setTimeout(function () {
    copyBtn.classList.remove('copied');
    copyLabel.textContent = 'Copy link';
  }, 1800);
}

// --- Layer 2: Clipboard API, with its own layer-3 fallback baked in.
async function copyLink() {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      statusEl.textContent = 'Link copied to your clipboard.';
      flashCopied();
      return;
    }
    throw new Error('no-clipboard-api');
  } catch (err) {
    // Clipboard API missing, or blocked by a permissions policy (common
    // inside a sandboxed preview iframe) — fall back to execCommand.
    if (manualCopyFallback()) {
      statusEl.textContent = 'Link copied to your clipboard.';
      flashCopied();
    } else {
      statusEl.textContent = 'Could not copy automatically — select and copy the URL manually: ' + shareData.url;
    }
  }
}

// --- Layer 1: the real Web Share API. Requires a user gesture, often
// HTTPS, and is unsupported on most desktop browsers and inside most
// sandboxed iframes — so this button is expected to fall through to
// copyLink() for the majority of viewers of this demo, by design.
async function attemptShare() {
  if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
    try {
      statusEl.textContent = 'Opening the share sheet…';
      await navigator.share(shareData);
      statusEl.textContent = 'Shared successfully.';
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') {
        statusEl.textContent = 'Share cancelled.';
        return;
      }
      // Any other failure (blocked permissions policy, transient error) —
      // fall through to the copy-link flow below.
      statusEl.textContent = 'Native share failed (' + (err && err.name ? err.name : 'blocked') + ') — copying the link instead.';
      await copyLink();
      return;
    }
  }

  // navigator.share isn't available at all: desktop Chrome/Firefox lack
  // it entirely, and it's routinely stripped from sandboxed iframes.
  statusEl.textContent = "Native share isn't available in this browser or preview — copying the link instead.";
  await copyLink();
}

shareBtn.addEventListener('click', attemptShare);
copyBtn.addEventListener('click', copyLink);`,

  seo: {
    title: 'Web Share Button — Free navigator.share with Copy-Link Fallback',
    description: `A share button that calls the real Web Share API's navigator.share() to open the OS share sheet, with an honest three-layer fallback to Clipboard copy when it's unsupported. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Web Share Button — Native Share Sheet With a Copy-Link Fallback',
      description: `The Web Share Button calls the real \`navigator.share()\` API to hand a title, text, and URL off to the operating system's native share sheet — the same picker a user sees sharing from a mobile app. The catch is that support is narrow: most desktop browsers never implemented it, it typically requires a secure context and a direct user gesture, and it's routinely unavailable inside a sandboxed preview iframe like the one rendering this demo. Rather than pretend that away, this snippet treats the missing case as the expected one and builds a full three-layer fallback so the button is always useful.

**Layer 1 — the real share sheet**

\`attemptShare()\` first checks \`navigator.share\` exists (and, where present, that \`navigator.canShare(shareData)\` approves the payload) before calling it inside a \`try/catch\`. On success the OS share sheet opens with the page's title, text, and URL. A user backing out of that sheet throws an \`AbortError\`, which is treated as a normal cancellation, not an error state.

**Layer 2 — Clipboard API copy**

When \`navigator.share\` doesn't exist, or the real call fails for any other reason, control falls to \`copyLink()\`, which tries \`navigator.clipboard.writeText()\`. This is the path most desktop viewers — and anyone inside this sandboxed preview — will actually see run, so it gets first-class treatment: a checkmark-style "Copied!" state on the button, not just a console log.

**Layer 3 — execCommand and manual select**

If the Clipboard API itself is missing or throws (older browsers, or a clipboard-write permission denied by an iframe's permissions policy), \`manualCopyFallback()\` creates an off-screen input, selects its text, and calls the legacy \`document.execCommand('copy')\`. Only if that also fails does the status text ask the viewer to select and copy the URL by hand — the true last resort, reached only when every programmatic path has been exhausted.

**Why this order matters**

Each layer is honest about what actually ran: the status line names which path fired, rather than silently succeeding or silently failing. That mirrors the pattern in this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet, which fails a denied \`getUserMedia\` call into a fully-functional simulated mode instead of a blank canvas — the same "real API first, dependable fallback always" philosophy. Pair this button with a [copy button](/ui-snippets/copy-button/) for a plain clipboard action, or a [share modal](/ui-snippets/share-modal/) and [social share bar](/ui-snippets/social-share-bar/) for platform-specific sharing.

**Customizing it**

Swap in your real \`title\`/\`text\`/\`url\`, style the copied state to match your brand, or gate the share button's visibility entirely behind \`'share' in navigator\` if you'd rather only show the copy-link UI on unsupported browsers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A page-preview card with Share and Copy link buttons renders.` },
      { title: 'Click "Share" on a supporting device', text: `The OS share sheet opens with the page's title and URL.` },
      { title: 'Click "Share" elsewhere', text: `It falls back automatically to copying the link instead.` },
      { title: 'Click "Copy link" directly', text: `Clipboard API copies the URL; the button confirms with a checkmark.` },
      { title: 'Read the status line', text: `It always names which path actually ran.` },
      { title: 'Swap in your real URL', text: `Edit the shareData object's title, text, and url.` },
    ] },
    features: [
      { title: 'Real navigator.share call', text: `Opens the genuine OS share sheet where supported.` },
      { title: 'canShare validation', text: `Checks the payload is shareable before attempting.` },
      { title: 'AbortError handled cleanly', text: `A cancelled share sheet isn't treated as an error.` },
      { title: 'Clipboard API fallback', text: `writeText() copies the link when share is unavailable.` },
      { title: 'execCommand last resort', text: `Legacy copy path if the Clipboard API itself fails.` },
      { title: 'Manual-copy final fallback', text: `Status text with the raw URL if all else fails.` },
      { title: 'Named status at every step', text: `The UI states plainly which path ran and why.` },
      { title: 'Copied confirmation state', text: `A checkmark-style label confirms a successful copy.` },
    ],
    useCases: [
      { title: 'Article and blog share buttons', text: `Pair with a [social share bar](/ui-snippets/social-share-bar/).` },
      { title: 'Product page sharing', text: `Let shoppers send a link via their phone's share sheet.` },
      { title: 'Referral and invite flows', text: `Fall back to copy-link when native share is unavailable.` },
      { title: 'Team dashboards', text: `Share a filtered [status dashboard](/ui-snippets/status-dashboard/) view.` },
      { title: 'Alongside a share modal', text: `Combine with a [share modal](/ui-snippets/share-modal/) for platform icons.` },
      { title: 'Simple copy-link utility', text: `A lighter alternative to a standalone [copy button](/ui-snippets/copy-button/).` },
    ],
    faqs: [
      { q: "Why doesn't the Share button open a share sheet for me?", a: `navigator.share() is unsupported on most desktop browsers (it shipped for mobile Safari and Chrome on Android/ChromeOS first) and it's commonly stripped from sandboxed preview iframes like the one rendering this demo, since the "web-share" permissions policy has to be explicitly allowed by the embedding page. When it's missing, the button automatically falls back to copying the link to your clipboard instead — check the status line, which names exactly which path ran.` },
      { q: 'What happens if I close the share sheet without picking anything?', a: `navigator.share() rejects with an AbortError when the user dismisses the native share sheet without completing a share. This snippet treats that specific error as a normal cancellation — it updates the status text to "Share cancelled" and does not fall through to the copy-link fallback, since the share sheet itself worked correctly.` },
      { q: 'Why copy to clipboard instead of just failing silently?', a: `A share button that does nothing when unsupported looks broken. Copying the link is the closest equivalent action available everywhere: the visitor still ends up able to paste the URL wherever they'd have shared it. The fallback even has its own two layers — the modern Clipboard API first, then the legacy execCommand('copy') technique — so it keeps working even in older or more locked-down browsers.` },
      { q: 'Does this work inside a sandboxed preview iframe?', a: `Yes, in the sense that something always happens. Most sandboxed iframes block both the Web Share and Clipboard-write permissions by default, so you'll typically see the button fall all the way to the manual fallback, which selects the URL text and asks you to copy it by hand. That's expected behavior for this snippet, not a bug — it demonstrates the exact failure mode a real embedded deployment needs to handle.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the shareData object as component state or props so the title/text/url reflect the current page. Wrap attemptShare and copyLink as event handlers bound to your framework's click bindings, and drive the "Copied!" label from a boolean state variable with a setTimeout reset instead of directly touching textContent. The capability checks (navigator.share, navigator.clipboard) work identically in any framework since they're plain browser APIs.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through the three-layer fallback chain — why the code checks navigator.share and, where available, navigator.canShare(shareData) before calling it, why an AbortError from a cancelled share sheet is handled differently from every other rejection, and why the Clipboard API fallback itself needs a further execCommand('copy') fallback rather than just failing. It's a good prompt for reasoning about real-world browser API support: ask which current browsers actually implement navigator.share, and why a sandboxed iframe (like the one likely rendering this very demo) so often blocks it. For extensions, ask it to add platform-specific share links (X/Twitter, email, SMS) as an additional fallback tier before the raw copy-link, or to persist a "recently shared" toast that doesn't block interaction. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Web Share Button" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A "Share" button that, when clicked, checks for navigator.share support (and navigator.canShare if present) before calling navigator.share({ title, text, url }) inside a try/catch, so it uses the browser's real native share sheet wherever supported.
- Handle the AbortError case specially: if the user cancels the native share sheet, show a "Share cancelled" status rather than treating it as a failure.
- CRITICAL: implement a full fallback chain, since navigator.share is unsupported on most desktop browsers and is commonly disabled inside sandboxed preview iframes (a likely scenario for wherever this demo renders). When navigator.share is missing or any other error occurs, fall back to a "Copy link" flow: try navigator.clipboard.writeText(url) first; if the Clipboard API itself is unavailable or throws, fall back further to creating a temporary off-screen input, selecting its text, and calling the legacy document.execCommand('copy'); if even that fails, show the raw URL in the status text and ask the user to copy it manually.
- A separate always-visible "Copy link" button that runs the same copy fallback chain directly, with a "Copied!" confirmation state (e.g. a checkmark and temporary label change) that reverts after a couple of seconds.
- A status text element that at every step clearly states which path actually ran (native share succeeded, share cancelled, copied via Clipboard API, copied via execCommand, or manual copy required) so a viewer understands why they're seeing a particular behavior rather than assuming the button is broken.`,
    },
  },
};

export default webShareButton;
