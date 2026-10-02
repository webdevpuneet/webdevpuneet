const shareMenu = {
  id: 'share-menu',
  title: 'Share Menu with Copy Link and Social Options',
  lastmod: '2026-08-17',
  category: 'buttons',
  html: `<div class="demo">
  <div class="share-wrap" id="shareWrap">
    <button class="share-trigger" id="shareTrigger" onclick="toggleMenu()" aria-haspopup="true" aria-expanded="false">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>
      Share
    </button>
    <div class="menu" id="shareMenuPanel" role="menu">
      <div class="menu-head">Share this page</div>
      <div class="link-row">
        <input type="text" id="linkInput" value="https://webdevpuneet.com/ui-snippets/share-menu/" readonly>
        <button class="copy-btn" id="copyBtn" onclick="copyLink()">Copy</button>
      </div>
      <div class="social-grid">
        <button class="social-item" onclick="shareTo('X')">
          <span class="social-icon si-x">𝕏</span> X
        </button>
        <button class="social-item" onclick="shareTo('LinkedIn')">
          <span class="social-icon si-li">in</span> LinkedIn
        </button>
        <button class="social-item" onclick="shareTo('Email')">
          <span class="social-icon si-mail">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
          </span> Email
        </button>
        <button class="social-item" onclick="shareTo('WhatsApp')">
          <span class="social-icon si-wa">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm5.7 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg>
          </span> WhatsApp
        </button>
      </div>
    </div>
  </div>
  <p class="log" id="shareLog"></p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 60px 20px; }
.demo { text-align: center; }
.share-wrap { position: relative; display: inline-block; }
.share-trigger { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; border: 1px solid #d1d5db; border-radius: 9px; background: #fff; font-size: 13.5px; font-weight: 600; color: #374151; cursor: pointer; }
.share-trigger:hover { background: #f9fafb; }
.menu { position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(-6px); width: 280px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 16px 40px rgba(0,0,0,0.14); padding: 14px; opacity: 0; visibility: hidden; transition: opacity 0.15s, transform 0.15s, visibility 0.15s; z-index: 30; text-align: left; }
.menu.open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.menu-head { font-size: 12.5px; font-weight: 700; color: #111827; margin-bottom: 10px; }
.link-row { display: flex; gap: 6px; margin-bottom: 14px; }
.link-row input { flex: 1; min-width: 0; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 12px; color: #6b7280; background: #f9fafb; }
.copy-btn { padding: 8px 12px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer; flex-shrink: 0; transition: background 0.15s; }
.copy-btn:hover { background: #1d4ed8; }
.copy-btn.copied { background: #16a34a; }
.social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.social-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid #f0f0f0; border-radius: 9px; background: #fff; font-size: 12.5px; font-weight: 600; color: #374151; cursor: pointer; }
.social-item:hover { background: #f9fafb; }
.social-icon { width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
.si-x { background: #000; }
.si-li { background: #0a66c2; }
.si-mail { background: #6b7280; }
.si-wa { background: #25d366; }
.log { margin-top: 14px; font-size: 12.5px; color: #6b7280; min-height: 16px; }`,
  js: `var menu = document.getElementById('shareMenuPanel');
var trigger = document.getElementById('shareTrigger');
var log = document.getElementById('shareLog');

function toggleMenu() {
  var open = menu.classList.toggle('open');
  trigger.setAttribute('aria-expanded', String(open));
}

function copyLink() {
  var input = document.getElementById('linkInput');
  var btn = document.getElementById('copyBtn');
  navigator.clipboard.writeText(input.value).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    log.textContent = 'Link copied to clipboard';
    setTimeout(function() {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 1800);
  }).catch(function() {
    input.select();
    log.textContent = 'Press Ctrl/Cmd+C to copy';
  });
}

function shareTo(network) {
  log.textContent = 'Opening share dialog for ' + network + '...';
  menu.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('#shareWrap')) {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});`,
  seo: {
    title: 'Share Menu — Copy Link & Social Share Snippet',
    description: 'Share button dropdown with a copy-link field, clipboard fallback, and social share buttons for X, LinkedIn, Email & WhatsApp. Exports to React, Vue & Angular.',
    about: {
      title: 'Share Menu — Copy-Link Field with Clipboard Fallback and Social Options',
      description: `A share menu combines the two most common ways people actually share a link — copying the URL directly, and posting to a specific platform — into one compact dropdown, rather than the older pattern of a full row of always-visible social icons cluttering the page. This snippet builds both halves, plus the details that make each one work reliably.\n\n**The copy-link field**\n\nThe URL sits in a read-only \`<input readonly>\`, not a plain \`<span>\` — using a real input means a user can still manually select and copy the text if the clipboard button fails for any reason, and \`readonly\` (rather than \`disabled\`) keeps it focusable and selectable while preventing edits. The Copy button calls \`navigator.clipboard.writeText()\`, which returns a promise, and on success swaps its own label to "Copied!" with a green background for 1.8 seconds before reverting — direct, in-place feedback rather than a separate toast notification.\n\n**The clipboard fallback**\n\n\`navigator.clipboard\` is only available in secure contexts (HTTPS or localhost) and can be blocked by browser permissions or older browsers entirely. The \`.catch()\` handler covers that case by calling \`input.select()\`, which highlights the URL text so the user can copy it manually with Ctrl/Cmd+C — a small status message explains what to do next. Skipping this fallback is a common reason "Copy" buttons silently do nothing for a subset of users.\n\n**Why the menu, not the whole page, holds the share options**\n\nCollapsing every share destination behind one "Share" trigger keeps the primary UI uncluttered, and it scales — adding a fifth or sixth platform to the grid costs one more \`.social-item\` button, not another permanently visible icon competing for space in the page header.\n\n**Centered dropdown positioning**\n\nUnlike a typical dropdown anchored to one edge, this menu centers itself under its trigger with \`left: 50%; transform: translateX(-50%)\`, which looks more balanced for a compact, icon-led trigger button than a left- or right-anchored panel would.\n\n**Brand-colored social icons**\n\nEach platform's icon sits in a small rounded square using that platform's actual brand color (\`#000\` for X, \`#0a66c2\` for LinkedIn, \`#25d366\` for WhatsApp) — consistent, recognizable brand colors help users find their preferred platform at a glance inside a 2×2 grid faster than uniformly-colored icons would.\n\n**Wiring real share URLs**\n\nThe demo's \`shareTo()\` only logs which platform was clicked; a production version should open each platform's actual share-intent URL in a new tab or popup window. Common patterns: X is \`https://twitter.com/intent/tweet?url=\` + encoded URL + \`&text=\` + encoded message; LinkedIn is \`https://www.linkedin.com/sharing/share-offsite/?url=\` + encoded URL; Email is a plain \`mailto:?subject=...&body=\` link (no popup needed); WhatsApp is \`https://wa.me/?text=\` + encoded message with the URL included in the text.\n\n**Accessibility and dismissal**\n\nThe trigger carries \`aria-haspopup="true"\` and \`aria-expanded\`, flipped by \`toggleMenu()\`. Two independent listeners close the menu — a document click check using \`closest('#shareWrap')\`, and an Escape keydown handler — the same dual dismissal pattern used by every other dropdown-style component in this library.\n\nSee also the [copy button](/ui-snippets/copy-button/) snippet for the standalone clipboard-copy pattern used here, and the [download button](/ui-snippets/download-button/) for another action button with distinct idle/success feedback states.`,
    },
    howToUse: [
      { title: 'Copy the share-wrap structure', text: 'The .share-wrap holds the trigger button and the .menu dropdown containing the link-copy row and the social-icon grid.' },
      { title: 'Set the real URL', text: 'Replace the demo #linkInput value with your page\'s actual URL, generated dynamically from window.location.href if the menu is reused across many pages.' },
      { title: 'Wire real share-intent URLs', text: 'Replace the shareTo() logging with window.open() calls to each platform\'s share-intent URL, or a plain mailto: link for the Email option.' },
      { title: 'Add or remove platforms', text: 'Each platform is one .social-item button in the .social-grid — add a new one with its own brand-colored icon, or remove any that don\'t apply to your audience.' },
      { title: 'Test the clipboard fallback', text: 'Try Copy in a non-HTTPS context or with clipboard permissions denied to confirm the input.select() fallback correctly highlights the URL for manual copying.' },
    ],
    features: [
      'Read-only input field for the URL, keeping it manually selectable even if the clipboard API fails',
      'navigator.clipboard.writeText() with in-place button feedback — label and color change, no separate toast',
      'Clipboard-unavailable fallback selects the URL text automatically for manual Ctrl/Cmd+C copying',
      'Brand-colored social icons in a compact 2x2 grid for X, LinkedIn, Email, and WhatsApp',
      'Centered dropdown positioning balanced under a compact trigger button',
      'aria-haspopup and aria-expanded on the trigger for screen reader support',
      'Closes on outside click and Escape via two independent listeners',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: '📝', title: 'Blog and article pages', desc: 'Let readers share a post from one compact dropdown, with a read-only URL field that stays selectable even if the clipboard fails.' },
      { icon: '🛍️', title: 'Product and landing pages', desc: 'Support referral and word-of-mouth sharing, with brand-coloured icons for X, LinkedIn, Email and WhatsApp in a tidy two-by-two grid.' },
      { icon: '🔗', title: 'Snippet and content libraries', desc: 'Share a specific item\'s permalink in a snippet library, with `navigator.clipboard.writeText()` changing the button label and colour in place.' },
      { icon: '🎟️', title: 'Event and invite pages', desc: 'Share event details or invite links, auto-selecting the URL text for manual copy when the Clipboard API is unavailable.' },
      { icon: '📥', title: 'Download and share pairing', desc: 'Pair with a [download button](/ui-snippets/download-button/) on resource pages so people can both save a file and pass it on.' },
    ],
    faqs: [
      { q: 'How do I make the copy button actually copy the URL?', a: 'It already does, via navigator.clipboard.writeText(input.value) — just replace the demo #linkInput value with your page\'s real URL, ideally set dynamically from window.location.href.' },
      { q: 'Why does the copy button need a fallback?', a: 'navigator.clipboard requires a secure context (HTTPS or localhost) and can be blocked by browser permission settings. The .catch() handler calls input.select() so the user can still copy the text manually, instead of the button silently failing with no feedback.' },
      { q: 'How do I wire the social buttons to actually share?', a: 'Replace the logging in shareTo() with window.open() calls to each platform\'s share-intent URL, built from your page URL and optionally a message — for example X uses https://twitter.com/intent/tweet?url=... and LinkedIn uses https://www.linkedin.com/sharing/share-offsite/?url=... Email can be a plain mailto: link.' },
      { q: 'Should I use the native navigator.share() API instead of a custom menu?', a: 'navigator.share() is a good addition for mobile browsers that support it, since it opens the OS-native share sheet — check for its existence and offer it as an extra option, but keep this custom menu as the fallback for desktop browsers and platforms it does not cover.' },
      { q: 'How do I use this share menu in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component managing open state and clipboard copy as hooks, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component — all preserve the copy-fallback logic and outside-click/Escape dismissal.' },
    ],
    aiPrompt: {
      paragraph: `Paste this share menu's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the copy button has a fallback path using input.select() rather than only relying on navigator.clipboard.writeText(), and in what real situations that fallback actually gets used. It's a strong candidate to hand to an assistant for real wiring — give it your page's actual URL source and a short share message, and have it fill in the real share-intent URLs for each platform button, opened via window.open() with sensible popup dimensions. Beyond that, ask it to add a check for navigator.share() so mobile browsers get the native OS share sheet instead of this custom menu when it's available, falling back to this component everywhere else.`,
      prompt: `Build a share button with a dropdown menu in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- A trigger button showing a share icon and label that toggles a dropdown menu below it, centered horizontally under the trigger rather than anchored to one edge, animated with an opacity and transform-based show/hide (not display:none, so it can transition smoothly) and reflecting its state via an aria-expanded attribute.
- Inside the dropdown, a read-only text input pre-filled with a URL, paired with a Copy button that uses the async clipboard API to copy the URL, gives in-place visual feedback on success (changing its own label and color temporarily before reverting), and falls back to selecting the input's text automatically if the clipboard API is unavailable or rejects, so the user always has a way to copy the value manually.
- Below the copy row, a 2x2 grid of at least four distinct social/share platform buttons, each with a small icon in that platform's real brand color and a text label, that when clicked would trigger sharing to that specific platform (a placeholder status message is sufficient for this demo, but the buttons must be individually distinguishable and clickable).
- The dropdown must close when the user clicks anywhere outside it and also when the Escape key is pressed, using two separate event listeners, and clicking any social share button must also close the dropdown.
- The whole component must be reachable and operable via keyboard alone: the trigger must be a real focusable button, and the copy and share buttons must be real buttons, not clickable divs.`,
    },
  },
};

export default shareMenu;
