import { esc, escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, textFooter, cleanText, detailsBoxHtml } from './shell.js';

// The code as separate characters, one box each (spaces and dashes typed for readability are dropped).
// A merge variable from the sending tool ({{ code }}, *|CODE|*, {% … %}) stays whole in a single box.
const isTag = code => /\{\{|\{%|\*\|/.test(String(code || ''));
const chars = code => (isTag(code) ? [String(code).trim()] : [...String(stripRich(code) || '').replace(/[\s-]/g, '')].slice(0, 10));

export default {
  id: 'one-time-code',
  name: 'One-Time Passcode (2FA) Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['otp-code', '2fa', 'two-factor', 'verification-code', 'login-code', 'security', 'saas', 'fintech', 'transactional', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'OTP Email Template — Free 2FA Verification Code Email HTML',
  seoDescription: 'Free OTP email template for 2FA and login codes: each digit in its own box, what the code is for, a short expiry, request details and a wasn’t-you link.',
  description: 'A one-time passcode email for two-factor sign-in, payment approval or account changes: the purpose in the subject and first line, each digit of the code in its own large box so it is easy to read and type, a 10-minute expiry, a never-share warning, the device, location and time of the request, and a "wasn’t you?" link to secure the account. No button and no links to click for the code itself.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Code & message' },
    { id: 'request', label: 'Request details', toggle: 'showRequest' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('739 204 is your Ledgerly verification code', 'Use it to finish signing in. It expires in 10 minutes. Never share it with anyone.', 'Ledgerly'),
    ...brandFields().map(x => (x.key === 'brandName' ? { ...x, value: 'Ledgerly' } : x)),
    { key: 'purpose', group: 'main', label: 'What the code is for (label)', type: 'text', value: 'Sign-in verification' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your verification code' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Enter this code on the sign-in screen to confirm it’s you, {{first_name}}.' },
    { key: 'code', group: 'main', label: 'Code', type: 'text', value: '739204', hint: 'Up to 10 characters, each in its own box. A sending-tool variable such as {{ code }} is shown whole in one box.' },
    { key: 'expiry', group: 'main', label: 'Expiry note', type: 'text', value: 'Expires in 10 minutes · can be used once' },
    { key: 'warning', group: 'main', label: 'Never-share warning', type: 'textarea', value: '<b>Ledgerly will never ask for this code</b> by phone, chat or email. If someone asks you for it, they are trying to get into your account.' },
    { key: 'device', group: 'request', label: 'Device', type: 'text', value: 'Chrome on Windows' },
    { key: 'location', group: 'request', label: 'Approximate location', type: 'text', value: 'Pune, India' },
    { key: 'ip', group: 'request', label: 'IP address (optional)', type: 'text', value: '103.21.58.14' },
    { key: 'time', group: 'request', label: 'Time', type: 'text', value: 'Nov 3, 2026 at 9:42 AM IST' },
    { key: 'notYouText', group: 'main', label: '"Wasn’t you?" link text', type: 'text', value: 'Wasn’t you? Secure your account' },
    { key: 'notYouUrl', group: 'main', label: '"Wasn’t you?" link', type: 'url', value: 'https://webdevpuneet.com/account/security' },
    ...footerFields({ reason: 'You’re receiving this because someone asked for a verification code for the Ledgerly account {{email}}.' }).map(x => (x.key === 'address' ? { ...x, value: 'Ledgerly Technologies Pvt. Ltd., 4th Floor, Baner Road, Pune 411045, India' } : x)),
  ],
  toggles: [{ key: 'showRequest', label: 'Request details', value: true }],
  vars: DEFAULT_VARS('#1d4ed8').map(x => (x.key === 'bg' ? { ...x, value: '#edf1f8' } : x)),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const cs = chars(f.code);
    const half = cs.length >= 6 && cs.length % 2 === 0 ? cs.length / 2 : -1; // a small gap in the middle of 6 or 8 digits
    const wide = isTag(f.code);
    const box = (ch, i) => `<td style="padding:0 ${i === half - 1 ? 10 : 4}px 0 ${i === half ? 10 : 4}px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" valign="middle"${wide ? '' : ' width="46"'} height="58" class="soft t${wide ? '' : ' otp'}" style="${wide ? 'padding:0 22px;' : 'width:46px;'}height:58px;border-radius:10px;background:#f1f5ff;border:1px solid #c7d4f5;font-family:'Courier New',Courier,monospace;font-size:30px;line-height:58px;font-weight:700;color:${v.text};mso-line-height-rule:exactly;">${esc(ch)}</td></tr></table></td>`;
    const card = `
              <tr>
                <td class="px" align="center" style="padding:42px 40px 6px;font-family:${B};text-align:center;">
                  ${f.purpose ? `<p${A('purpose')} style="margin:0 0 14px;"><span style="display:inline-block;padding:5px 12px;border-radius:99px;background:${v.brand};color:${v.btnText};font-family:${B};font-size:12px;line-height:16px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">&#128274;&nbsp; ${rich(f.purpose)}</span></p>` : ''}
                  <h1 class="h1 t"${A('headline')} style="margin:0 0 10px;font-family:${H};font-size:28px;line-height:36px;font-weight:800;letter-spacing:-0.5px;color:${v.text};">${rich(f.headline)}</h1>
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 26px;font-size:16px;line-height:25px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"${A('code')}><tr>
                    ${cs.map(box).join('')}
                  </tr></table>
                  ${f.expiry ? `<p class="m"${A('expiry')} style="margin:16px 0 0;font-size:14px;line-height:20px;color:${v.muted};">&#9201;&nbsp; ${rich(f.expiry)}</p>` : ''}
                </td>
              </tr>
              ${f.warning ? `<tr>
                <td class="px" style="padding:26px 48px 0;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="border-collapse:separate;background:#fff7ed;border-radius:12px;border:1px solid #fed7aa;"><tr><td class="t"${A('warning')} style="padding:14px 18px;font-family:${B};font-size:14px;line-height:21px;color:#7c2d12;">&#9888;&#65039;&nbsp; ${escBr(f.warning)}</td></tr></table>
                </td>
              </tr>` : ''}
              ${on.showRequest ? `<tr>
                <td class="px" style="padding:22px 48px 0;font-family:${B};">
                  <p class="t" style="margin:0 0 8px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Requested from</p>
                  ${detailsBoxHtml(c, [['Device', f.device, 'device'], ['Location', f.location, 'location'], ['IP address', f.ip, 'ip'], ['Time', f.time, 'time']])}
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:20px 48px 40px;font-family:${B};">
                  ${f.notYouText ? `<p style="margin:0;font-size:14px;line-height:22px;"><a${A('notYouText')} href="${safeUrl(f.notYouUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.notYouText)}</a></p>` : ''}
                </td>
              </tr>`;
    // Phones: smaller boxes so eight characters still fit on one line
    return emailShell(c, { card, extraCss: '    .otp{width:34px !important;height:46px !important;font-size:24px !important;line-height:46px !important;}' });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.purpose ? f.purpose.toUpperCase() : '', f.headline, '', wrapText(stripRich(f.intro)), '', `    ${chars(f.code).join(' ')}`, ''];
    if (f.expiry) out.push(f.expiry, '');
    if (f.warning) out.push(wrapText(stripRich(f.warning)), '');
    if (on.showRequest) {
      out.push('Requested from:');
      for (const [l, x] of [['Device', f.device], ['Location', f.location], ['IP address', f.ip], ['Time', f.time]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
      out.push('');
    }
    if (f.notYouText) out.push(`${f.notYouText}: ${safeUrl(f.notYouUrl)}`, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
