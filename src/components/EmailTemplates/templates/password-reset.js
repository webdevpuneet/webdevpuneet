import { esc, escBr, safeUrl, buttonHtml, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

export default {
  id: 'password-reset',
  name: 'Password Reset Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['password-reset', 'security', 'account', 'transactional', 'saas', 'dark-mode'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Password Reset Email Template — Free Responsive HTML',
  seoDescription: 'Free password reset email template with an Outlook-safe button, link expiry, fallback link, request details and dark mode. Edit it online, then copy the HTML.',
  description: 'A clear, secure password reset email: lock badge, headline, the account it is for, an Outlook-safe reset button, link expiry, a copyable fallback link, optional request details (device, location, time) and a reassuring "didn’t request this?" note.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'details', label: 'Request details', toggle: 'showDetails' },
    { id: 'security', label: 'Security note' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Reset your Acme password', 'Use the link inside to choose a new password. It expires in 60 minutes.'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Password reset' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Reset your password' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'We received a request to reset the password for your Acme account:' },
    { key: 'account', group: 'main', label: 'Account email', type: 'text', value: 'jordan@example.com' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Reset password' },
    { key: 'ctaUrl', group: 'main', label: 'Reset link', type: 'url', value: 'https://webdevpuneet.com/reset?token=abc123', hint: 'Your app generates a one-time token link for each request.' },
    { key: 'expiry', group: 'main', label: 'Expiry note', type: 'text', value: 'This link expires in 60 minutes and can be used once.' },
    { key: 'fallbackLabel', group: 'main', label: 'Fallback link label', type: 'text', value: 'Button not working? Paste this link into your browser:' },
    { key: 'device', group: 'details', label: 'Device', type: 'text', value: 'Chrome on Windows' },
    { key: 'location', group: 'details', label: 'Location', type: 'text', value: 'San Francisco, CA, USA' },
    { key: 'time', group: 'details', label: 'Time', type: 'text', value: 'Oct 17, 2026 at 9:41 AM PT' },
    { key: 'ignore', group: 'security', label: 'Didn’t request it?', type: 'textarea', value: 'Didn’t request this? You can safely ignore this email. Your password won’t change until you open the link above and create a new one.' },
    { key: 'supportText', group: 'security', label: 'Support line', type: 'text', value: 'Worried someone else is trying to get in? Contact our security team.' },
    { key: 'supportUrl', group: 'security', label: 'Support link', type: 'url', value: 'https://webdevpuneet.com/support' },
    ...footerFields({ reason: 'You’re receiving this because a password reset was requested for your Acme account.' }),
  ],
  toggles: [{ key: 'showDetails', label: 'Request details', value: true }],
  vars: DEFAULT_VARS('#6366f1'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const details = [['Device', f.device, 'device'], ['Location', f.location, 'location'], ['Time', f.time, 'time']].filter(([, x]) => x);
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td align="center" valign="middle" width="56" height="56" class="soft" style="width:56px;height:56px;border-radius:16px;background:#eef2ff;font-size:26px;line-height:56px;mso-line-height-rule:exactly;">&#128274;</td>
                  </tr></table>
                  <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 6px;')}
                  <p class="t"${A('account')} style="margin:0 0 28px;font-family:${B};font-size:16px;line-height:24px;font-weight:700;color:${v.text};">${rich(f.account)}</p>
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 18px;">${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H, attrs: A('ctaText') })}</td></tr></table>` : ''}
                  ${f.expiry ? `<p class="m"${A('expiry')} style="margin:0 0 24px;font-size:14px;line-height:21px;color:${v.muted};">&#9201; ${rich(f.expiry)}</p>` : ''}
                  ${f.fallbackLabel ? `<p class="m"${A('fallbackLabel')} style="margin:0 0 6px;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.fallbackLabel)}</p>
                  <p style="margin:0 0 28px;font-size:13px;line-height:19px;word-break:break-all;"><a href="${safeUrl(f.ctaUrl)}" target="_blank" style="color:${v.brand};text-decoration:underline;">${rich(f.ctaUrl)}</a></p>` : ''}
                </td>
              </tr>
              ${on.showDetails && details.length ? `<tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;">
                    <tr><td style="padding:16px 20px 6px;font-family:${H};font-size:13px;font-weight:700;color:${v.text};" class="t">Request details</td></tr>
                    ${details.map(([label, val, key]) => `<tr><td style="padding:2px 20px;font-family:${B};font-size:14px;line-height:22px;"><span class="m" style="color:${v.muted};display:inline-block;width:80px;">${label}</span><span class="t"${A(key)} style="color:${v.text};">${rich(val)}</span></td></tr>`).join('\n                    ')}
                    <tr><td style="height:14px;font-size:0;line-height:0;">&nbsp;</td></tr>
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:4px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:24px 0 0;">
                    ${f.ignore ? `<p class="m"${A('ignore')} style="margin:0 0 12px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.ignore)}</p>` : ''}
                    ${f.supportText ? `<p class="m" style="margin:0;font-size:14px;line-height:22px;color:${v.muted};"><span${A('supportText')}>${rich(f.supportText)}</span> <a${A('supportUrl')} href="${safeUrl(f.supportUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">Get help &rarr;</a></p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const lines = [f.brandName, '', f.headline, '', wrapText(f.intro), f.account, '', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, f.expiry || '', ''];
    if (on.showDetails) {
      const d = [['Device', f.device], ['Location', f.location], ['Time', f.time]].filter(([, x]) => x);
      if (d.length) lines.push('Request details', ...d.map(([l, x]) => `${l}: ${x}`), '');
    }
    if (f.ignore) lines.push(wrapText(f.ignore), '');
    if (f.supportText) lines.push(`${f.supportText} ${safeUrl(f.supportUrl)}`, '');
    lines.push(textFooter(f));
    return cleanText(lines);
  },
};
