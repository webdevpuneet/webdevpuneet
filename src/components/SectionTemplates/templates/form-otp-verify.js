import { FK_CSS, formTop, HONEYPOT, formClose, lbl, tailFields, headFields, HEAD_GROUP } from './forms-shared.js';

const BOXES = [1, 2, 3, 4, 5, 6].map(n => `<input type="text" inputmode="numeric" maxlength="1" autocomplete="${n === 1 ? 'one-time-code' : 'off'}" placeholder=" " aria-label="Digit ${n}" data-fk-digit${n === 1 ? ' required' : ''}>`).join('');

export default {
  id: 'form-otp-verify',
  name: 'Verification Code Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['otp', 'verification', 'code', 'two-factor', '2fa', 'form', 'security', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Verification Code Form Section — Free 6-Digit OTP Input HTML',
  seoDescription: 'Free verification code section: six digit boxes with auto-advance, paste and one-tap autofill, plus a resend button with a countdown. HTML, CSS and JavaScript.',
  description: 'A “check your email” code screen: six digit boxes that move forward as you type, go back on Backspace, accept a pasted code and fill from the browser’s one-time-code suggestion on phones, a verify button, and a resend link with a countdown timer. The whole code is also sent as one hidden field named “code” to your form endpoint. It does not send codes itself: your server does, this is the front end.',
  bestFor: ['Email and phone verification screens', 'Two-factor sign-in steps', 'Password reset and checkout confirmation'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'form', label: 'Form' }],
  fields: [
    { key: 'icon', group: 'header', label: 'Icon', type: 'icon', value: 'mail' },
    ...headFields({ eyebrow: '', heading: 'Check your *email*', lead: 'We sent a 6-digit code to you@company.com. Enter it below to continue.' }),
    lbl('resend', 'Resend button text', 'Resend code', 'form'),
    lbl('help', 'Help text (empty to remove)', 'Didn’t get it? Check your spam folder.', 'form'),
    ...tailFields({ sends: 'code', submit: 'Verify', note: '', successTitle: 'Verified!', successText: 'Thank you. Your email address is confirmed.', errorText: 'That code did not work. Please check it and try again.' }),
  ],
  lists: [],
  toggles: [],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#f3f8f7', surface: '#ffffff', text: '#0f2a27', muted: '#587a76', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ov">
  <div class="fk-card ov-card" data-anim="media">
    <span class="st-icon ov-icon" data-icon="icon"></span>
    <header class="ov-head">
      <h2 class="st-h2 ov-h2" data-anim-text data-edit="heading"></h2>
      <p class="st-lead ov-lead" data-show-if="lead" data-edit="lead"></p>
    </header>
    ${formTop()}
        <div class="fk-otp" data-fk-otp role="group" aria-label="Verification code">${BOXES}<input type="hidden" name="code"></div>
        ${HONEYPOT}
        <button class="st-btn st-form-btn ov-btn" type="submit"><span data-edit="submit"></span></button>
        <p class="st-form-note ov-resend"><button class="ov-link" type="button" data-fk-resend data-fk-seconds="30"><span data-edit="resend"></span> <span data-fk-timer></span></button></p>
        <p class="st-form-note" data-show-if="help" data-edit="help"></p>
${formClose()}
  </div>
</div>`,
  css: `.st-form-otp-verify{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.ov{max-width:520px;margin:0 auto}
.ov-card{display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center}
.ov-icon{width:56px;height:56px}
.ov-head{display:flex;flex-direction:column;gap:10px}
.ov-h2{font-size:clamp(26px,4cqi,34px)}
.ov-lead{font-size:16px}
.ov-card .st-form{width:100%}
.ov-card .st-form-fields{gap:18px;align-items:center}
.ov-btn{align-self:stretch;width:100%}
.ov-resend{text-align:center}
.ov-link{border:0;background:none;padding:0;color:var(--st-brand);font:600 13.5px var(--st-font-body);cursor:pointer;text-decoration:underline}
.ov-link:disabled{color:var(--st-muted);cursor:not-allowed;text-decoration:none}
.ov .st-form-note{text-align:center}`,
};
