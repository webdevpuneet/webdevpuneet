import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'security-alert',
  name: 'New Sign-in Security Alert',
  version: '1.0.0',
  category: 'transactional',
  tags: ['security-alert', 'new-sign-in', 'login-alert', 'new-device', 'account-security', 'saas', 'transactional'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'New Sign-in Alert Email Template — Free Security Alert HTML',
  seoDescription: 'Free new sign-in security alert email template: device, browser, location, IP and time, a "This was me" note and a Secure my account button. Copy the HTML.',
  description: 'A login alert for apps and SaaS: a shield badge, "New sign-in to your account", the device, browser, approximate location, IP address and time in a details box, a calm "if this was you, no action needed" line, a "Secure my account" button and short security tips.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'details', label: 'Sign-in details' },
    { id: 'tips', label: 'Security tips', toggle: 'showTips' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('New sign-in to your Acme account', 'We noticed a sign-in from a new device: Chrome on Windows in Denver, CO. Was this you?'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Security alert' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'New sign-in to your account' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, your Acme account ({{email}}) was just used to sign in on a device we haven’t seen before.' },
    { key: 'device', group: 'details', label: 'Device', type: 'text', value: 'Windows PC' },
    { key: 'browser', group: 'details', label: 'Browser or app', type: 'text', value: 'Chrome 141' },
    { key: 'location', group: 'details', label: 'Approximate location', type: 'text', value: 'Denver, CO, United States' },
    { key: 'ip', group: 'details', label: 'IP address (optional)', type: 'text', value: '203.0.113.42' },
    { key: 'time', group: 'details', label: 'Time', type: 'text', value: 'October 20, 2026 at 8:14 AM MDT' },
    { key: 'okText', group: 'main', label: '"This was me" text', type: 'textarea', value: 'If this was you, you can ignore this email. There’s nothing else you need to do.' },
    { key: 'warnText', group: 'main', label: '"Not me" text', type: 'textarea', value: 'If this wasn’t you, secure your account now: we’ll sign out every device and help you set a new password.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Secure my account' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/account/security' },
    { key: 'tipsTitle', group: 'tips', label: 'Section title', type: 'text', value: 'Keep your account safe' },
    { key: 'tip1', group: 'tips', label: 'Tip 1', type: 'text', value: 'Turn on two-factor authentication' },
    { key: 'tip2', group: 'tips', label: 'Tip 2', type: 'text', value: 'Use a unique password you don’t use anywhere else' },
    { key: 'tip3', group: 'tips', label: 'Tip 3', type: 'text', value: 'We will never ask for your password by email or phone' },
    ...footerFields({ reason: 'You’re receiving this security notice because of activity on your Acme account.' }),
  ],
  toggles: [{ key: 'showTips', label: 'Security tips', value: true }],
  vars: DEFAULT_VARS('#b91c1c'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const tips = [1, 2, 3].map(n => [f[`tip${n}`], `tip${n}`]).filter(([x]) => String(x || '').trim());
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td align="center" valign="middle" width="52" height="52" style="width:52px;height:52px;border-radius:14px;background:#fef2f2;font-size:26px;line-height:52px;mso-line-height-rule:exactly;">&#128737;</td>
                  </tr></table>
                  <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  ${detailsBoxHtml(c, [['Device', f.device, 'device'], ['Browser', f.browser, 'browser'], ['Location', f.location, 'location'], ['IP address', f.ip, 'ip'], ['Time', f.time, 'time']])}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:20px 48px 8px;font-family:${B};">
                  ${f.okText ? `<p class="m"${A('okText')} style="margin:0 0 12px;font-size:15px;line-height:24px;color:${v.muted};"><span style="color:#15803d;font-weight:800;">&#10003;</span>&nbsp; ${escBr(f.okText)}</p>` : ''}
                  ${f.warnText ? `<p class="t"${A('warnText')} style="margin:0 0 22px;font-size:15px;line-height:24px;font-weight:600;color:${v.text};"><span style="color:${v.brand};font-weight:800;">!</span>&nbsp; ${escBr(f.warnText)}</p>` : ''}
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 26px', width: 240 })}
                </td>
              </tr>
              ${on.showTips && tips.length ? `<tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.tipsTitle ? `<p class="t"${A('tipsTitle')} style="margin:0 0 10px;font-family:${H};font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(f.tipsTitle)}</p>` : ''}
                    ${tips.map(([x, key]) => `<p class="m" style="margin:0 0 6px;font-size:14px;line-height:22px;color:${v.muted};">&bull;&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                    ')}
                  </td></tr></table>
                </td>
              </tr>` : '<tr><td style="padding:0 0 18px;font-size:0;line-height:0;">&nbsp;</td></tr>'}`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    for (const [l, x] of [['Device', f.device], ['Browser', f.browser], ['Location', f.location], ['IP address', f.ip], ['Time', f.time]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('');
    if (f.okText) out.push(wrapText(f.okText), '');
    if (f.warnText) out.push(wrapText(f.warnText), '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showTips) {
      const tips = [f.tip1, f.tip2, f.tip3].filter(x => String(x || '').trim());
      if (tips.length) out.push(f.tipsTitle, ...tips.map(x => `- ${x}`), '');
    }
    out.push(textFooter(f));
    return cleanText(out);
  },
};
