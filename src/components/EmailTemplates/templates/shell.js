/* Shared building blocks for email templates: the document shell (head, Outlook fixes,
   mobile + dark-mode CSS, preheader, 600px container), header, footer and common fields.
   Templates only write their card content. Plain JS so build scripts can import it. */

import { esc, escBr, safeUrl, preheaderHtml, fontStackById, wrapText } from './meta.js';

/* Fields almost every template shares */
export const inboxFields = (subject, preheader, fromName = 'Acme') => [
  { key: 'fromName', group: 'inbox', label: 'Sender name', type: 'text', value: fromName },
  { key: 'subject', group: 'inbox', label: 'Subject line', type: 'text', value: subject },
  { key: 'preheader', group: 'inbox', label: 'Preheader (inbox preview text)', type: 'text', value: preheader },
];
export const brandFields = () => [
  { key: 'brandName', group: 'brand', label: 'Brand name', type: 'text', value: 'Acme' },
  { key: 'logoUrl', group: 'brand', label: 'Logo image URL (optional)', type: 'url', value: '', hint: 'Paste a hosted URL or upload a logo. Leave both empty to show the brand name as text.', upload: { name: 'logo', maxW: 480, mime: 'image/png' } },
  { key: 'logoWidth', group: 'brand', label: 'Logo width (px)', type: 'number', value: '120' },
  { key: 'headerLink', group: 'brand', label: 'Header link', type: 'url', value: 'https://yoursite.com' },
];
export const footerFields = ({ marketing = false, reason }) => [
  { key: 'address', group: 'footer', label: 'Company postal address', type: 'textarea', value: 'Acme Inc., 548 Market St #12345, San Francisco, CA 94104, USA', hint: marketing ? 'US CAN-SPAM requires a valid postal address in commercial email.' : 'Recommended in every email so recipients can identify the sender.' },
  { key: 'reason', group: 'footer', label: 'Why they got this email', type: 'text', value: reason },
  ...(marketing ? [
    { key: 'unsubscribeUrl', group: 'footer', label: 'Unsubscribe link', type: 'url', value: 'https://yoursite.com/unsubscribe', hint: 'Required in marketing email. Most email services replace it with a merge tag, e.g. *|UNSUB|*.' },
    { key: 'prefsUrl', group: 'footer', label: 'Email preferences link (optional)', type: 'url', value: 'https://yoursite.com/settings/email' },
  ] : [
    { key: 'helpUrl', group: 'footer', label: 'Help centre link (optional)', type: 'url', value: 'https://yoursite.com/help' },
  ]),
];

export const DEFAULT_VARS = (brand = '#6366f1') => [
  { key: 'brand', label: 'Brand / button', value: brand, group: 'light' },
  { key: 'btnText', label: 'Button text', value: '#ffffff', group: 'light' },
  { key: 'bg', label: 'Page background', value: '#eef0f7', group: 'light' },
  { key: 'card', label: 'Card', value: '#ffffff', group: 'light' },
  { key: 'text', label: 'Text', value: '#0f172a', group: 'light' },
  { key: 'muted', label: 'Muted text', value: '#64748b', group: 'light' },
  { key: 'darkBg', label: 'Page background', value: '#0b0f19', group: 'dark' },
  { key: 'darkCard', label: 'Card', value: '#151a28', group: 'dark' },
  { key: 'darkText', label: 'Text', value: '#f1f5f9', group: 'dark' },
  { key: 'darkMuted', label: 'Muted text', value: '#94a3b8', group: 'dark' },
];

/* Context every template's build() starts from */
export function ctx(t, s, opts = {}) {
  const f = s.fields, v = s.vars, on = s.toggles || {};
  const hf = fontStackById(s.fonts.heading), bf = fontStackById(s.fonts.body);
  return {
    t, f, v, on,
    H: hf.stack.replace(/"/g, "'"),
    B: bf.stack.replace(/"/g, "'"),
    googles: [...new Set([hf.google, bf.google].filter(Boolean))],
    // Editor-only marker: which field an element shows (never in exported HTML)
    A: key => (opts.edit ? ` data-field="${key}"` : ''),
  };
}

export function headerHtml({ f, v, H, A }) {
  const logoW = Math.max(40, Math.min(240, parseInt(f.logoWidth, 10) || 120));
  return f.logoUrl
    ? `<a href="${safeUrl(f.headerLink)}" target="_blank" style="text-decoration:none;"><img${A('logoUrl')} src="${safeUrl(f.logoUrl)}" width="${logoW}" alt="${esc(f.brandName)}" style="display:block;width:${logoW}px;max-width:100%;height:auto;border:0;"></a>`
    : `<a href="${safeUrl(f.headerLink)}" target="_blank" class="t" style="font-family:${H};font-size:22px;font-weight:800;letter-spacing:-0.4px;color:${v.text};text-decoration:none;"><span style="display:inline-block;width:12px;height:12px;border-radius:4px;background:${v.brand};margin-right:8px;vertical-align:middle;"></span><span${A('brandName')}>${esc(f.brandName)}</span></a>`;
}

export function footerHtml({ f, v, B, A }, { socials = '' } = {}) {
  const links = [];
  if (f.unsubscribeUrl !== undefined) links.push(`<a${A('unsubscribeUrl')} href="${safeUrl(f.unsubscribeUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Unsubscribe</a>`);
  if (f.prefsUrl) links.push(`<a${A('prefsUrl')} href="${safeUrl(f.prefsUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Email preferences</a>`);
  if (f.helpUrl) links.push(`<a${A('helpUrl')} href="${safeUrl(f.helpUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Help centre</a>`);
  return `${socials}
              <tr>
                <td align="center" class="m" style="font-family:${B};font-size:12px;line-height:19px;color:${v.muted};">
                  ${f.reason ? `<span${A('reason')}>${esc(f.reason)}</span><br>` : ''}<span${A('address')}>${escBr(f.address)}</span>${links.length ? `<br><br>${links.join(' &nbsp;&middot;&nbsp; ')}` : ''}
                </td>
              </tr>`;
}

/* The whole document. `card` is the inner rows of the white card; `afterCard` sits under it. */
export function emailShell(c, { card, header = headerHtml(c), footer = footerHtml(c), extraCss = '', darkCss = '' }) {
  const { t, f, v, googles } = c;
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(f.subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td,th,div,p,a,h1,h2,h3,span{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
${googles.length ? `<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?${googles.map(g => `family=${g}`).join('&')}&display=swap" rel="stylesheet"><!--<![endif]-->\n` : ''}<style>
  /* ${t.name} v${t.version} · https://webdevpuneet.com/email-templates/${t.id}/ */
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  body{margin:0 !important;padding:0 !important;width:100% !important;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
  u + #body a{color:inherit;text-decoration:none;}
  @media screen and (max-width:620px){
    .container{width:100% !important;}
    .px{padding-left:24px !important;padding-right:24px !important;}
    .h1{font-size:28px !important;line-height:34px !important;}
    .btn{width:100% !important;}
    .stack{display:block !important;width:100% !important;}
    .stack-pad{padding:0 0 16px !important;}
${extraCss}
  }
  @media (prefers-color-scheme: dark){
    .bg{background-color:${v.darkBg} !important;}
    .card{background-color:${v.darkCard} !important;}
    .t{color:${v.darkText} !important;}
    .m{color:${v.darkMuted} !important;}
    .line{border-color:#273049 !important;}
    .soft{background-color:#1d2436 !important;}
${darkCss}
  }
  [data-ogsc] .bg{background-color:${v.darkBg} !important;}
  [data-ogsc] .card{background-color:${v.darkCard} !important;}
  [data-ogsc] .t{color:${v.darkText} !important;}
  [data-ogsc] .m{color:${v.darkMuted} !important;}
  [data-ogsc] .soft{background-color:#1d2436 !important;}
</style>
</head>
<body id="body" class="bg" style="margin:0;padding:0;width:100%;background-color:${v.bg};">
${preheaderHtml(f.preheader, v.bg)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background-color:${v.bg};">
  <tr>
    <td align="center" style="padding:32px 12px 40px;">
      <!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr>
          <td style="padding:0 8px 22px;">${header}</td>
        </tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="background-color:${v.card};border-radius:16px;">
${card}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${footer}
            </table>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>
`;
}

/* Small shared pieces */
export const eyebrowHtml = ({ H, v, A }, key, text) => (text ? `<p${A(key)} style="margin:0 0 10px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.brand};">${esc(text)}</p>` : '');
export const h1Html = ({ H, v, A }, key, text) => `<h1 class="h1 t"${A(key)} style="margin:0 0 16px;font-family:${H};font-size:30px;line-height:38px;font-weight:800;letter-spacing:-0.6px;color:${v.text};">${esc(text)}</h1>`;
export const pHtml = ({ B, v, A }, key, text, extra = '') => (text ? `<p class="m"${A(key)} style="margin:0 0 20px;font-family:${B};font-size:16px;line-height:26px;color:${v.muted};${extra}">${escBr(text)}</p>` : '');
export const textFooter = f => {
  const lines = ['---'];
  if (f.reason) lines.push(wrapText(f.reason));
  if (f.address) lines.push(wrapText(f.address));
  if (f.unsubscribeUrl !== undefined) lines.push(`Unsubscribe: ${safeUrl(f.unsubscribeUrl)}`);
  if (f.prefsUrl) lines.push(`Email preferences: ${safeUrl(f.prefsUrl)}`);
  if (f.helpUrl) lines.push(`Help: ${safeUrl(f.helpUrl)}`);
  return lines.join('\n');
};
export const cleanText = lines => `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
