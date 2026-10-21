import { safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'magic-link',
  name: 'Magic Link Sign-in Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['magic-link', 'passwordless', 'login-code', 'otp-code', 'sign-in', 'account', 'saas', 'security'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Magic Link Email Template — Free Passwordless Login Email',
  seoDescription: 'Free magic link email template for passwordless login: a one-click sign-in button, optional 6-digit login code, expiry, request details and a fallback link.',
  description: 'A passwordless sign-in email: a key badge, a "Sign in to Acme" button that logs the user in with one click, an optional one-time login code for signing in on another device, a short expiry, optional request details (device, location, time), a fallback link and a security note.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'code', label: 'Login code', toggle: 'showCode' },
    { id: 'details', label: 'Request details', toggle: 'showDetails' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your Acme sign-in link', 'Click to sign in, no password needed. This link expires in 15 minutes.'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Sign in' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your sign-in link is here' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, click the button below to sign in to Acme as {{email}}. No password needed.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Sign in to Acme' },
    { key: 'ctaUrl', group: 'main', label: 'Sign-in link', type: 'url', value: 'https://webdevpuneet.com/auth/magic?token=abc123' },
    { key: 'expiry', group: 'main', label: 'Expiry note', type: 'text', value: 'This link expires in 15 minutes and can only be used once.' },
    { key: 'codeLabel', group: 'code', label: 'Code label', type: 'text', value: 'Signing in on another device? Enter this code:' },
    { key: 'code', group: 'code', label: 'Code', type: 'text', value: '739 204' },
    { key: 'device', group: 'details', label: 'Device', type: 'text', value: 'Chrome on macOS' },
    { key: 'location', group: 'details', label: 'Location', type: 'text', value: 'Austin, TX, USA' },
    { key: 'time', group: 'details', label: 'Time', type: 'text', value: 'Oct 19, 2026 at 9:41 AM CDT' },
    { key: 'note', group: 'main', label: 'Security note', type: 'textarea', value: 'Didn’t try to sign in? You can safely ignore this email: nobody can sign in without this link or code. Never share it with anyone, including people claiming to be from Acme.' },
    ...footerFields({ reason: 'You’re receiving this because someone asked to sign in to the Acme account for this address.' }),
  ],
  toggles: [
    { key: 'showCode', label: 'Login code', value: true },
    { key: 'showDetails', label: 'Request details', value: true },
  ],
  vars: DEFAULT_VARS('#7c3aed'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td align="center" valign="middle" width="64" height="64" style="width:64px;height:64px;border-radius:32px;background:${v.brand};color:${v.btnText};font-size:28px;line-height:64px;mso-line-height-rule:exactly;">&#128273;</td>
                  </tr></table>
                  <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 28px;')}
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0 0 16px', width: 260 })}
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
              ${on.showDetails ? `<tr>
                <td class="px" style="padding:0 48px 24px;font-family:${B};">
                  <p class="t" style="margin:0 0 8px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Sign-in request</p>
                  ${detailsBoxHtml(c, [['Device', f.device, 'device'], ['Location', f.location, 'location'], ['Time', f.time, 'time']])}
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
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, f.expiry || '', ''];
    if (on.showCode && f.code) out.push(f.codeLabel || 'Your code:', f.code, '');
    if (on.showDetails) {
      const d = [['Device', f.device], ['Location', f.location], ['Time', f.time]].filter(([, x]) => String(x || '').trim());
      if (d.length) out.push('Sign-in request:', ...d.map(([l, x]) => `${l}: ${x}`), '');
    }
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
