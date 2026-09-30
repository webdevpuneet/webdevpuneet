const twoFactorSetupFlow = {
  id: 'two-factor-setup-flow',
  title: 'Two-Factor Authentication Setup Flow',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="tfa-card">
  <div class="tfa-steps" aria-hidden="true">
    <span class="tfa-dot tfa-active" id="tfaDot1"></span>
    <span class="tfa-line"></span>
    <span class="tfa-dot" id="tfaDot2"></span>
    <span class="tfa-line"></span>
    <span class="tfa-dot" id="tfaDot3"></span>
  </div>

  <section class="tfa-panel tfa-active" id="tfaPanel1">
    <h2>Set up two-factor authentication</h2>
    <p class="tfa-sub">Scan this pattern with your authenticator app, or enter the setup key manually.</p>
    <div class="tfa-qr" aria-label="Layout placeholder representing a QR code — not a real scannable code">
      <div class="tfa-qr-grid"></div>
      <span class="tfa-qr-label">Layout demo — not scannable</span>
    </div>
    <div class="tfa-key">
      <span class="tfa-key-label">Manual setup key</span>
      <code class="tfa-key-value" id="tfaKeyValue">JBSW Y3DP EHPK 3PXP</code>
    </div>
    <button type="button" class="tfa-btn" id="tfaToStep2">I've added the account</button>
  </section>

  <section class="tfa-panel" id="tfaPanel2">
    <h2>Enter the 6-digit code</h2>
    <p class="tfa-sub">Type the code currently shown in your authenticator app.</p>
    <div class="tfa-otp" id="tfaOtp">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 1">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 2">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 3">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 4">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 5">
      <input class="tfa-digit" inputmode="numeric" maxlength="1" aria-label="Digit 6">
    </div>
    <p class="tfa-error" id="tfaError">Enter all 6 digits to continue.</p>
    <button type="button" class="tfa-btn" id="tfaVerify">Verify and enable</button>
  </section>

  <section class="tfa-panel" id="tfaPanel3">
    <div class="tfa-success">
      <div class="tfa-check">&#10003;</div>
      <h2>Two-factor authentication enabled</h2>
      <p class="tfa-sub">Save these backup codes somewhere safe — each can be used once if you lose access to your authenticator.</p>
    </div>
    <div class="tfa-codes" id="tfaCodes"></div>
    <button type="button" class="tfa-btn tfa-btn-secondary" id="tfaCopyCodes">Copy backup codes</button>
  </section>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.tfa-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:28px;max-width:420px;margin:0 auto}
.tfa-steps{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:24px}
.tfa-dot{width:9px;height:9px;border-radius:50%;background:#262a3b;transition:background .2s ease}
.tfa-dot.tfa-active{background:#6366f1}
.tfa-line{width:34px;height:2px;background:#262a3b}
.tfa-panel{display:none}
.tfa-panel.tfa-active{display:block}
.tfa-panel h2{font-size:19px;margin:0 0 8px;text-align:center}
.tfa-sub{font-size:13px;color:#8b90a8;text-align:center;margin:0 0 20px;line-height:1.5}
.tfa-qr{background:#161927;border:1px solid #262a3b;border-radius:14px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:16px}
.tfa-qr-grid{width:140px;height:140px;border-radius:8px;background-color:#fff;background-image:
  repeating-linear-gradient(90deg,#0f1117 0 8px,transparent 8px 16px),
  repeating-linear-gradient(0deg,#0f1117 0 8px,transparent 8px 16px);
  background-blend-mode:multiply;position:relative}
.tfa-qr-grid::before,.tfa-qr-grid::after{content:'';position:absolute;width:28px;height:28px;border:6px solid #0f1117;top:8px;left:8px}
.tfa-qr-grid::after{left:auto;right:8px}
.tfa-qr-label{font-size:10px;color:#8b90a8;text-align:center}
.tfa-key{background:#161927;border:1px solid #262a3b;border-radius:12px;padding:12px 14px;margin-bottom:20px}
.tfa-key-label{display:block;font-size:11px;color:#8b90a8;margin-bottom:4px}
.tfa-key-value{font-family:ui-monospace,Menlo,monospace;font-size:14px;letter-spacing:.05em;color:#c4b5fd}
.tfa-otp{display:flex;gap:8px;justify-content:center;margin-bottom:10px}
.tfa-digit{width:42px;height:52px;text-align:center;font-size:20px;font-weight:700;border-radius:10px;border:1px solid #262a3b;background:#161927;color:#f2f3fa}
.tfa-digit:focus{outline:none;border-color:#6366f1}
.tfa-digit.tfa-digit-error{border-color:#f87171}
.tfa-error{font-size:12px;color:#f87171;text-align:center;min-height:16px;margin:0 0 16px;opacity:0;transition:opacity .15s ease}
.tfa-error.tfa-show{opacity:1}
.tfa-btn{width:100%;padding:12px;border-radius:10px;border:none;background:#6366f1;color:#fff;font-size:14px;font-weight:700;cursor:pointer}
.tfa-btn:hover{background:#585cf0}
.tfa-btn-secondary{background:#20243a;color:#c7cae0}
.tfa-btn-secondary:hover{background:#262b45}
.tfa-success{text-align:center;margin-bottom:18px}
.tfa-check{width:52px;height:52px;border-radius:50%;background:rgba(74,222,128,.15);color:#4ade80;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.tfa-codes{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#161927;border:1px solid #262a3b;border-radius:12px;padding:14px;margin-bottom:16px;font-family:ui-monospace,Menlo,monospace;font-size:13px;color:#c7cae0}
.tfa-codes span{text-align:center;padding:4px 0}`,

  js: `var panels = [document.getElementById('tfaPanel1'), document.getElementById('tfaPanel2'), document.getElementById('tfaPanel3')];
var dots = [document.getElementById('tfaDot1'), document.getElementById('tfaDot2'), document.getElementById('tfaDot3')];

function goToStep(index) {
  panels.forEach(function (p, i) { p.classList.toggle('tfa-active', i === index); });
  dots.forEach(function (d, i) { d.classList.toggle('tfa-active', i <= index); });
}

document.getElementById('tfaToStep2').addEventListener('click', function () {
  goToStep(1);
  var first = document.querySelector('.tfa-digit');
  if (first) first.focus();
});

// OTP digit inputs: auto-advance forward, backspace moves back, only digits allowed.
var digits = Array.prototype.slice.call(document.querySelectorAll('.tfa-digit'));
digits.forEach(function (input, i) {
  input.addEventListener('input', function () {
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
    input.classList.remove('tfa-digit-error');
    if (input.value && i < digits.length - 1) {
      digits[i + 1].focus();
    }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && !input.value && i > 0) {
      digits[i - 1].focus();
    }
  });
  input.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
    if (!text) return;
    e.preventDefault();
    text.slice(0, digits.length).split('').forEach(function (ch, idx) {
      if (digits[idx]) digits[idx].value = ch;
    });
    var next = Math.min(text.length, digits.length - 1);
    digits[next].focus();
  });
});

var errorEl = document.getElementById('tfaError');

function currentCode() {
  return digits.map(function (d) { return d.value; }).join('');
}

document.getElementById('tfaVerify').addEventListener('click', function () {
  var code = currentCode();
  if (!/^[0-9]{6}$/.test(code)) {
    errorEl.classList.add('tfa-show');
    digits.forEach(function (d) {
      if (!/^[0-9]$/.test(d.value)) d.classList.add('tfa-digit-error');
    });
    return;
  }
  errorEl.classList.remove('tfa-show');
  digits.forEach(function (d) { d.classList.remove('tfa-digit-error'); });
  renderBackupCodes();
  goToStep(2);
});

// Generate 8 backup codes in the familiar "xxxx-xxxx" format.
function generateBackupCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var part = function () {
    var s = '';
    for (var i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  };
  return part() + '-' + part();
}

function renderBackupCodes() {
  var wrap = document.getElementById('tfaCodes');
  wrap.innerHTML = '';
  var codes = [];
  for (var i = 0; i < 8; i++) {
    var code = generateBackupCode();
    codes.push(code);
    var span = document.createElement('span');
    span.textContent = code;
    wrap.appendChild(span);
  }
  wrap.dataset.codes = codes.join(' ');
}

document.getElementById('tfaCopyCodes').addEventListener('click', function () {
  var wrap = document.getElementById('tfaCodes');
  var text = wrap.dataset.codes || '';
  var btn = document.getElementById('tfaCopyCodes');
  var done = function () {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = original; }, 1400);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    done();
  }
});`,

  seo: {
    title: 'Two-Factor Authentication Setup Flow — Free 2FA Onboarding Snippet',
    description: `A 3-step 2FA setup flow: QR/manual key step, validated 6-digit code entry, and a success state with backup codes. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Two-Factor Authentication Setup Flow — QR Step, Code Verification, Backup Codes',
      description: `The two-factor authentication setup flow is the security-onboarding sequence every account-settings page needs: link an authenticator app, confirm it works with a live code, and hand over backup codes for recovery. This snippet builds the full 3-step flow in plain HTML, CSS, and JavaScript.

**Step 1 — link the authenticator app**

The first panel shows a CSS-grid pattern standing in for a QR code, clearly labeled "Layout demo — not scannable" so nobody mistakes it for a real generated code — this snippet focuses on the flow and interaction, not on QR encoding. Beside it, a manual setup key is shown in monospace for apps that support typed entry instead of scanning, which is exactly how real authenticator apps like Google Authenticator or Authy present this step.

**Step 2 — verify with a live code**

Six individual digit inputs auto-advance as you type, support backspace-to-go-back, and accept a full 6-digit paste (splitting it across all six boxes) — the same interaction pattern as [OTP input](/ui-snippets/otp-input/). Clicking "Verify and enable" validates the code is exactly six digits with a regex (\`/^[0-9]{6}$/\`); an invalid or incomplete code shows an inline error and highlights the offending boxes instead of silently failing.

**Step 3 — backup codes**

On successful verification, \`generateBackupCode()\` produces 8 codes in the familiar \`XXXX-XXXX\` format using a restricted character set (no ambiguous 0/O/1/I) — the standard pattern security tools use for backup/recovery codes. A "Copy backup codes" button copies all 8 to the clipboard at once with a brief "Copied!" confirmation.

**Progress indicator**

Three dots at the top track which step is active and which are completed, giving users a clear sense of how much of the setup remains — the same lightweight indicator pattern used in [stepper](/ui-snippets/stepper/) flows.

**Customizing it**

Wire step 1's QR area to a real QR-generation library or backend-rendered image, connect step 2's verification to your actual TOTP backend instead of a format check, and persist the backup codes server-side rather than only showing them once. Pair it with a [passkey login](/ui-snippets/passkey-login/) flow or an [OTP verification](/ui-snippets/otp-verification/) card for a complete auth-security suite.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Step 1 (QR/key) renders first with a progress indicator.` },
      { title: 'Click "I\'ve added the account"', text: `Advances to the 6-digit code entry step.` },
      { title: 'Type or paste a code', text: `Digits auto-advance; backspace moves back; paste fills all boxes.` },
      { title: 'Click "Verify and enable"', text: `A non-6-digit code shows an inline error; a valid one advances.` },
      { title: 'View backup codes', text: `8 codes render on the success step; copy them with one click.` },
    ] },
    features: [
      { title: '3-step guided flow', text: `QR/key, code verification, and backup codes.` },
      { title: 'Labeled QR placeholder', text: `Clearly marked as a layout demo, not scannable.` },
      { title: 'Auto-advancing OTP inputs', text: `Type or paste a full 6-digit code smoothly.` },
      { title: 'Format validation', text: `Regex-checked 6-digit code with inline error state.` },
      { title: 'Generated backup codes', text: `8 codes in standard XXXX-XXXX format.` },
      { title: 'Copy-all button', text: `One click copies every backup code to clipboard.` },
      { title: 'Step progress dots', text: `Visual indicator of setup progress.` },
      { title: 'Zero dependencies', text: `No QR or crypto library required for the demo.` },
    ],
    useCases: [
      { title: 'Account security settings', text: `Onboard users into 2FA from a settings page.` },
      { title: 'SaaS admin panels', text: `Enforce 2FA setup for team or admin accounts.` },
      { title: 'Fintech onboarding', text: `Pair with [passkey login](/ui-snippets/passkey-login/) for layered auth.` },
      { title: 'Compliance flows', text: `Require verified 2FA before granting sensitive access.` },
      { title: 'Developer platforms', text: `Secure API and [API key manager](/ui-snippets/api-key-manager/) access.` },
      { title: 'Recovery UX design', text: `Prototype backup-code presentation and copy flows.` },
    ],
    faqs: [
      { q: 'Is the QR code in step 1 a real scannable code?', a: `No — it's a CSS-grid pattern explicitly labeled "Layout demo — not scannable" so it's never mistaken for a functional QR code. This snippet demonstrates the setup flow's structure and interactions; wire a real QR-generation library or backend-rendered image into that slot for production use.` },
      { q: 'How is the 6-digit code validated?', a: `On clicking "Verify and enable", the six digit inputs are joined and checked against /^[0-9]{6}$/. If it doesn't match (incomplete or non-numeric), an inline error message appears and the invalid boxes get a red outline; a fully valid 6-digit string advances to the backup-codes step. In production, this check would happen against a real TOTP verification on your backend.` },
      { q: 'Are the backup codes cryptographically secure?', a: `The demo uses Math.random() for simplicity, which is fine for a UI prototype but not for production secrets. A real implementation should generate backup codes server-side with a cryptographically secure random source and store only hashed versions, showing the plaintext codes to the user exactly once.` },
      { q: 'Can users paste a 6-digit code instead of typing it?', a: `Yes — pasting into any digit box splits the pasted text across all six inputs starting from that box, matching how authenticator codes are typically copied and pasted from another app.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Track the current step and each digit's value in component state, derive the joined code and validity from that state, and conditionally render each panel based on the step instead of toggling tfa-active classes directly. The backup-code generation and clipboard logic port over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Multi-step security flows have a lot of small correctness details — auto-advancing focus, paste handling, format validation, one-time-visible secrets — so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to walk through how the OTP digit inputs handle paste versus individual keystrokes, why the verify button checks a strict 6-digit regex before advancing, and where the backup-code generation would need to change (server-side generation, hashed storage, cryptographically secure randomness) to be production-safe rather than a UI demo. It's also useful for extending the flow: ask it to add a "resend/regenerate codes" action, a warning state if a user tries to leave the backup-codes step without acknowledging they've saved them, or how to wire step 1's placeholder into a real QR code library like qrcode.js while keeping the rest of the flow's state machine intact.`,
      prompt: `Build a "two-factor authentication setup flow" in plain HTML, CSS, and JavaScript — no dependencies, no CDN — with 3 steps and a progress indicator.

Requirements:
- Step 1: show a CSS-only pattern standing in for a QR code, clearly labeled as a layout placeholder (not a real scannable code), plus a manual setup key shown in a monospace font as an alternative to scanning. A button advances to step 2.
- Step 2: six individual digit input boxes for a 6-digit verification code. Typing a digit auto-advances focus to the next box; backspace on an empty box moves focus back; pasting a full 6-digit string splits it across all six boxes. A "Verify and enable" button validates the joined value is exactly 6 numeric digits with a regex — show an inline error and highlight invalid boxes if not, and only advance to step 3 on a valid code.
- Step 3: a success state (checkmark, confirmation heading) showing 8 generated backup codes in "XXXX-XXXX" format using a character set that excludes ambiguous characters like 0/O/1/I, laid out in a grid. Include a "copy backup codes" button that copies all 8 codes to the clipboard with a brief confirmation.
- Show a 3-dot progress indicator at the top that highlights the current and completed steps.
- Dark-theme friendly, keyboard-accessible, framework-agnostic.`,
    },
  },
};

export default twoFactorSetupFlow;
