import { esc, safeUrl, buttonHtml, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

export default {
  id: 'verify-email',
  name: 'Verify Email Address',
  version: '1.0.0',
  category: 'transactional',
  tags: ['email-verification', 'otp-code', 'sign-up', 'account', 'saas', 'transactional', 'dark-mode'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Email Verification Template — Free HTML Confirm Email',
  seoDescription: 'Free email verification template with a verify button, an optional 6-digit code, expiry note, fallback link and dark mode. Outlook-safe HTML, ready to copy.',
  description: 'A sign-up confirmation email with an envelope badge, a "Confirm your email" headline, an Outlook-safe verify button, an optional one-time code in a large monospace box, an expiry note and a fallback link.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'code', label: 'One-time code', toggle: 'showCode' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Confirm your email for Acme', 'One click to verify your address and finish setting up your account.'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Almost there' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Confirm your email address' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi Jordan, thanks for signing up. Please confirm that jordan@example.com is your email address so we can finish setting up your account.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Verify email address' },
    { key: 'ctaUrl', group: 'main', label: 'Verification link', type: 'url', value: 'https://yoursite.com/verify?token=abc123' },
    { key: 'expiry', group: 'main', label: 'Expiry note', type: 'text', value: 'This link expires in 24 hours.' },
    { key: 'codeLabel', group: 'code', label: 'Code label', type: 'text', value: 'Or enter this code in the app:' },
    { key: 'code', group: 'code', label: 'Code', type: 'text', value: '482 913' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'If you didn’t create an Acme account, you can ignore this email. Nobody can use your address without confirming it.' },
    ...footerFields({ reason: 'You’re receiving this because this address was used to sign up for Acme.' }),
  ],
  toggles: [{ key: 'showCode', label: 'One-time code', value: true }],
  vars: DEFAULT_VARS('#0ea5e9'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td align="center" valign="middle" width="64" height="64" style="width:64px;height:64px;border-radius:32px;background:${v.brand};color:${v.btnText};font-size:28px;line-height:64px;mso-line-height-rule:exactly;">&#9993;</td>
                  </tr></table>
                  <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 28px;')}
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="padding:0 0 16px;">${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H, width: 260, attrs: A('ctaText') })}</td></tr></table>` : ''}
                  ${f.expiry ? `<p class="m"${A('expiry')} style="margin:0 0 28px;font-size:14px;line-height:21px;color:${v.muted};">${rich(f.expiry)}</p>` : ''}
                </td>
              </tr>
              ${on.showCode && f.code ? `<tr>
                <td class="px" align="center" style="padding:0 48px 28px;font-family:${B};text-align:center;">
                  ${f.codeLabel ? `<p class="m"${A('codeLabel')} style="margin:0 0 10px;font-size:14px;line-height:20px;color:${v.muted};">${rich(f.codeLabel)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td class="soft t"${A('code')} style="padding:14px 28px;border-radius:12px;background:#f1f5f9;border:1px dashed #cbd5e1;font-family:'Courier New',Courier,monospace;font-size:30px;line-height:36px;font-weight:700;letter-spacing:6px;color:${v.text};">${rich(f.code)}</td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    <p class="m" style="margin:0 0 8px;font-size:13px;line-height:19px;color:${v.muted};">Button not working? Paste this link into your browser:</p>
                    <p style="margin:0 0 16px;font-size:13px;line-height:19px;word-break:break-all;"><a href="${safeUrl(f.ctaUrl)}" target="_blank" style="color:${v.brand};text-decoration:underline;">${rich(f.ctaUrl)}</a></p>
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${rich(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const lines = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, f.expiry || '', ''];
    if (on.showCode && f.code) lines.push(f.codeLabel || 'Your code:', f.code, '');
    if (f.note) lines.push(wrapText(f.note), '');
    lines.push(textFooter(f));
    return cleanText(lines);
  },
};
