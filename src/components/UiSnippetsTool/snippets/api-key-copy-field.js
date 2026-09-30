const apiKeyCopyField = {
  id: 'api-key-copy-field',
  title: 'API Key Copy Field',
  lastmod: '2026-09-05',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="ak-wrap">
  <div class="ak-row">
    <div class="ak-label-block">
      <span class="ak-label">Secret API Key</span>
      <span class="ak-key" id="akKey">sk_live_\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u20223f2a</span>
    </div>
    <div class="ak-actions">
      <button class="ak-icon-btn" id="akToggle" aria-label="Show key" title="Show key">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <button class="ak-copy-btn" id="akCopy">Copy</button>
    </div>
  </div>
  <div class="ak-regen-block">
    <button class="ak-regen-btn" id="akRegenBtn">Regenerate key</button>
    <div class="ak-confirm" id="akConfirm" hidden>
      <span>Are you sure? This will invalidate the current key.</span>
      <div class="ak-confirm-actions">
        <button class="ak-confirm-btn" id="akConfirmYes">Confirm</button>
        <button class="ak-confirm-btn ak-confirm-cancel" id="akConfirmNo">Cancel</button>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.ak-wrap { width: 100%; max-width: 420px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 16px rgba(15,23,42,0.05); }

.ak-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ak-label-block { min-width: 0; }
.ak-label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
.ak-key { font-family: ui-monospace, "SF Mono", monospace; font-size: 13.5px; color: #1e293b; word-break: break-all; }

.ak-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.ak-icon-btn {
  background: #f1f5f9; border: none; border-radius: 8px; width: 32px; height: 32px; display: flex;
  align-items: center; justify-content: center; color: #64748b; cursor: pointer;
}
.ak-icon-btn:hover { background: #e2e8f0; color: #1e293b; }
.ak-copy-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 8px; padding: 8px 14px;
  font-size: 12.5px; font-weight: 700; cursor: pointer; min-width: 66px; transition: background 0.15s;
}
.ak-copy-btn:hover { background: #4f46e5; }
.ak-copy-btn.ak-copied { background: #16a34a; }

.ak-regen-block { margin-top: 16px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.ak-regen-btn { background: none; border: none; color: #ef4444; font-size: 12.5px; font-weight: 700; cursor: pointer; padding: 0; }
.ak-regen-btn:hover { text-decoration: underline; }

.ak-confirm {
  margin-top: 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
  padding: 10px 12px; font-size: 12px; color: #7f1d1d; display: flex; flex-direction: column; gap: 8px;
}
.ak-confirm-actions { display: flex; gap: 8px; }
.ak-confirm-btn {
  border: none; border-radius: 7px; padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;
}
#akConfirmYes { background: #ef4444; color: #fff; }
#akConfirmYes:hover { background: #dc2626; }
.ak-confirm-cancel { background: #fff; color: #64748b; border: 1px solid #e2e8f0; }
.ak-confirm-cancel:hover { background: #f8fafc; }`,
  js: `const keyEl = document.getElementById('akKey');
const toggleBtn = document.getElementById('akToggle');
const copyBtn = document.getElementById('akCopy');
const regenBtn = document.getElementById('akRegenBtn');
const confirmBlock = document.getElementById('akConfirm');
const confirmYes = document.getElementById('akConfirmYes');
const confirmNo = document.getElementById('akConfirmNo');

let fullKey = 'sk_live_49af82d10c7be3f2a';
let revealed = false;
let copyResetTimer = null;

function maskKey(key) {
  const last4 = key.slice(-4);
  return 'sk_live_' + '\\u2022'.repeat(12) + last4;
}

function renderKey() {
  keyEl.textContent = revealed ? fullKey : maskKey(fullKey);
}

toggleBtn.addEventListener('click', () => {
  revealed = !revealed;
  toggleBtn.setAttribute('title', revealed ? 'Hide key' : 'Show key');
  toggleBtn.setAttribute('aria-label', revealed ? 'Hide key' : 'Show key');
  renderKey();
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(fullKey).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('ak-copied');
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('ak-copied');
    }, 1500);
  });
});

regenBtn.addEventListener('click', () => {
  confirmBlock.hidden = false;
});

confirmNo.addEventListener('click', () => {
  confirmBlock.hidden = true;
});

confirmYes.addEventListener('click', () => {
  const randomPart = Array.from({ length: 18 }, () =>
    'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
  ).join('');
  fullKey = 'sk_live_' + randomPart;
  revealed = false;
  renderKey();
  confirmBlock.hidden = true;
});

renderKey();`,
  seo: {
    title: 'API Key Copy Field — Free HTML CSS JS Snippet',
    description: 'A settings-style API key row with a show/hide toggle, a copy-to-clipboard button using navigator.clipboard, and a confirm-gated regenerate action. Exports to React, Vue & Tailwind.',
    about: {
      title: 'API Key Copy Field — Masked Key With Clipboard Copy and Confirm-Gated Regeneration',
      description: `This snippet is a settings-panel row for displaying a secret API key: masked by default, revealable on demand, copyable to the clipboard with visible confirmation, and regenerable behind an explicit confirm step.

**Masking and reveal**

The key is stored in a \`fullKey\` variable. \`maskKey()\` keeps the \`sk_live_\` prefix and the last four characters visible, replacing everything in between with bullet characters — showing just enough of the key for identification without exposing it. The eye-icon toggle button flips a \`revealed\` boolean and calls \`renderKey()\`, which chooses between the masked and full string based on that flag; the button's \`title\`/\`aria-label\` update between "Show key" and "Hide key" to match.

**Copying with navigator.clipboard**

The Copy button calls \`navigator.clipboard.writeText(fullKey)\` — note that it copies the real \`fullKey\` value regardless of whether the key is currently masked on screen, since masking is a display-only concern. On success, the button's label swaps to "Copied!" with a green background via a \`.ak-copied\` class. A \`setTimeout\` reverts it back to "Copy" after 1.5 seconds, and that timer is captured in \`copyResetTimer\` and cleared with \`clearTimeout\` at the start of every click — so clicking Copy again quickly restarts the 1.5-second window instead of the label flickering back early from a stale timer.

**Confirm-gated regeneration**

Clicking "Regenerate key" doesn't regenerate anything immediately — it only reveals a hidden confirmation block (toggled via the \`hidden\` attribute) with "Confirm" and "Cancel" buttons. Only clicking Confirm generates a new random key string, resets \`revealed\` to false so the freshly generated key isn't accidentally left exposed, and re-renders. Cancel simply hides the confirmation block again with no side effects.`,
    },
    features: [
      'navigator.clipboard.writeText() copies the real unmasked key regardless of the current show/hide display state',
      'Copy button reverts from "Copied!" back to "Copy" after 1.5 seconds via a cleared and reset setTimeout',
      'Eye-icon toggle reveals or re-masks the key, keeping only the prefix and last four characters visible when masked',
      'Regenerate action gated behind an explicit inline Confirm/Cancel step rather than an immediate destructive action',
      'Newly regenerated key automatically re-masks so it is not left accidentally exposed on screen',
      'aria-label and title attributes update dynamically to reflect the current show/hide state for accessibility',
      'Fully self-contained vanilla JS with no external dependencies',
    ],
    useCases: [
      { icon: 'FORM', title: 'Developer settings and API dashboards', desc: 'The standard pattern for displaying and managing secret keys or tokens in a settings page.' },
      { icon: 'CODE', title: 'Reference for the Clipboard API', desc: 'A clean, minimal example of navigator.clipboard.writeText with visible copy confirmation and timeout reset handling.' },
      { icon: 'APP', title: 'SaaS admin panels', desc: 'Drop directly into an integrations or API access settings screen.' },
      { icon: 'LEARN', title: 'Teaching confirm-gated destructive actions', desc: 'Demonstrates a lightweight inline confirm pattern without a modal dialog.' },
    ],
    faqs: [
      { q: 'Does the Copy button copy the masked or the real key?', a: 'It always copies the real fullKey value via navigator.clipboard.writeText(fullKey), regardless of whether the key is currently shown masked or revealed on screen — masking only affects what is displayed, not what gets copied.' },
      { q: 'What happens if I click Copy multiple times quickly?', a: 'Each click clears the previous copyResetTimer with clearTimeout before starting a new 1.5-second setTimeout, so the "Copied!" label\'s revert is always measured from the most recent click rather than potentially reverting early from an earlier, still-pending timer.' },
      { q: 'Does clicking Regenerate key immediately create a new key?', a: 'No — it only shows an inline confirmation block with Confirm and Cancel buttons. The new random key string is only generated when Confirm is explicitly clicked; Cancel dismisses the confirmation with no changes.' },
      { q: 'Why does the key re-mask itself after regenerating?', a: 'The confirm handler resets the revealed flag to false before re-rendering, so a freshly generated key is not left visibly exposed on screen by default — the user has to explicitly click Show again to view it.' },
    ],
  },
};

export default apiKeyCopyField;
