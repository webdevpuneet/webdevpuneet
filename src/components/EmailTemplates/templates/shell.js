/* Shared building blocks for email templates: the document shell (head, Outlook fixes,
   mobile + dark-mode CSS, preheader, 600px container), header, footer and common fields.
   Templates only write their card content. Plain JS so build scripts can import it. */

import { esc, escBr, safeUrl, preheaderHtml, fontStackById, wrapText, rich, stripRich, buttonHtml } from './meta.js';

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
  { key: 'headerLink', group: 'brand', label: 'Header link', type: 'url', value: 'https://webdevpuneet.com' },
];
export const footerFields = ({ marketing = false, reason }) => [
  { key: 'address', group: 'footer', label: 'Company postal address', type: 'textarea', value: 'Acme Inc., 548 Market St #12345, San Francisco, CA 94104, USA', hint: marketing ? 'US CAN-SPAM requires a valid postal address in commercial email.' : 'Recommended in every email so recipients can identify the sender.' },
  { key: 'reason', group: 'footer', label: 'Why they got this email', type: 'text', value: reason },
  ...(marketing ? [
    { key: 'unsubscribeUrl', group: 'footer', label: 'Unsubscribe link', type: 'url', value: 'https://webdevpuneet.com/unsubscribe', hint: 'Required in marketing email. Most email services replace it with a merge tag, e.g. *|UNSUB|*.' },
    { key: 'prefsUrl', group: 'footer', label: 'Email preferences link (optional)', type: 'url', value: 'https://webdevpuneet.com/settings/email' },
  ] : [
    { key: 'helpUrl', group: 'footer', label: 'Help centre link (optional)', type: 'url', value: 'https://webdevpuneet.com/help' },
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
    blocks: Array.isArray(s.blocks) ? s.blocks : [],
    edit: !!opts.edit,
  };
}

export function headerHtml({ f, v, H, A }) {
  const logoW = Math.max(40, Math.min(240, parseInt(f.logoWidth, 10) || 120));
  return f.logoUrl
    ? `<a href="${safeUrl(f.headerLink)}" target="_blank" style="text-decoration:none;"><img${A('logoUrl')} src="${safeUrl(f.logoUrl)}" width="${logoW}" alt="${esc(f.brandName)}" style="display:block;width:${logoW}px;max-width:100%;height:auto;border:0;"></a>`
    : `<a href="${safeUrl(f.headerLink)}" target="_blank" class="t" style="font-family:${H};font-size:22px;font-weight:800;letter-spacing:-0.4px;color:${v.text};text-decoration:none;"><span style="display:inline-block;width:12px;height:12px;border-radius:4px;background:${v.brand};margin-right:8px;vertical-align:middle;"></span><span${A('brandName')}>${rich(f.brandName)}</span></a>`;
}

export function footerHtml({ f, v, B, A }, { socials = '' } = {}) {
  const links = [];
  if (f.unsubscribeUrl !== undefined) links.push(`<a${A('unsubscribeUrl')} href="${safeUrl(f.unsubscribeUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Unsubscribe</a>`);
  if (f.prefsUrl) links.push(`<a${A('prefsUrl')} href="${safeUrl(f.prefsUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Email preferences</a>`);
  if (f.helpUrl) links.push(`<a${A('helpUrl')} href="${safeUrl(f.helpUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Help centre</a>`);
  return `${socials}
              <tr>
                <td align="center" class="m" style="font-family:${B};font-size:12px;line-height:19px;color:${v.muted};">
                  ${f.reason ? `<span${A('reason')}>${rich(f.reason)}</span><br>` : ''}<span${A('address')}>${escBr(f.address)}</span>${links.length ? `<br><br>${links.join(' &nbsp;&middot;&nbsp; ')}` : ''}
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
<title>${esc(stripRich(f.subject))}</title>
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
    .stack-end{padding:0 !important;}
    .stack-img{max-width:100% !important;}
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
${placeBlocks(card, c)}
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
export const eyebrowHtml = ({ H, v, A }, key, text) => (text ? `<p${A(key)} style="margin:0 0 10px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.brand};">${rich(text)}</p>` : '');
export const h1Html = ({ H, v, A }, key, text) => `<h1 class="h1 t"${A(key)} style="margin:0 0 16px;font-family:${H};font-size:30px;line-height:38px;font-weight:800;letter-spacing:-0.6px;color:${v.text};">${rich(text)}</h1>`;
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

/* ── Extra sections ("blocks") the user adds to any template ──────────────────────
   Each block: { id, type, where: 'top' | 'bottom', ...fields }. Rendered as email-safe
   table rows inside the card, at its start (top) or end (bottom). */
export const MAX_COLUMNS = 4;
/* One column's settings, as [suffix, label, type]: stored on the block as c1Image, c1Title … */
export const COLUMN_FIELDS = [
  ['Image', 'Image URL (https://)', 'url'],
  ['Alt', 'Image alt text', 'text'],
  ['Title', 'Title', 'text'],
  ['Text', 'Text', 'textarea'],
  ['Btn', 'Button text (optional)', 'text'],
  ['Url', 'Button link (also links the image)', 'url'],
];
const DEMO_COLS = [['Fast setup', 'Get going in minutes with a guided start.'], ['Smart reports', 'See what changed this week at a glance.'], ['Team spaces', 'Keep every project and file in one place.'], ['Always on', 'Support from real people, every day.']];
function columnDefaults() {
  const d = { count: 3 };
  for (let n = 1; n <= MAX_COLUMNS; n++) Object.assign(d, { [`c${n}Image`]: '', [`c${n}Alt`]: '', [`c${n}Title`]: DEMO_COLS[n - 1][0], [`c${n}Text`]: DEMO_COLS[n - 1][1], [`c${n}Btn`]: '', [`c${n}Url`]: '' });
  return d;
}
/** A columns block's column count (2–4) */
export const columnCount = b => Math.max(2, Math.min(MAX_COLUMNS, parseInt(b.count, 10) || 2));
/** Old "Two columns" blocks ({ left, right } rich text) as a 2-column block */
export function upgradeColumns(b) {
  if (b.type !== 'columns' || !('left' in b || 'right' in b) || 'count' in b) return b;
  const { left, right, ...rest } = b;
  return { ...columnDefaults(), ...rest, count: 2, c1Title: '', c1Text: left || '', c2Title: '', c2Text: right || '' };
}

export const BLOCK_TYPES = {
  heading: { label: 'Heading', fields: [['text', 'Heading', 'text']], defaults: { text: 'A new section' } },
  text: { label: 'Text', fields: [['text', 'Text', 'textarea']], defaults: { text: 'Add a paragraph here. You can use <b>bold</b>, <i>italic</i> and links.' } },
  button: { label: 'Button', fields: [['text', 'Button text', 'text'], ['url', 'Button link', 'url'], ['align', 'Alignment', 'align']], defaults: { text: 'Learn more', url: 'https://webdevpuneet.com', align: 'left' } },
  image: { label: 'Image', fields: [['url', 'Image URL (https://)', 'url'], ['alt', 'Alt text', 'text'], ['link', 'Link (optional)', 'url']], defaults: { url: '', alt: '', link: '' } },
  // Columns: 2–4 side by side (stacked on phones), each with an optional image, title, text and
  // button. Edited with its own panel (see COLUMN_FIELDS); fields c<n><Field> for n = 1..4.
  columns: { label: 'Columns', fields: [], custom: true, defaults: columnDefaults() },
  divider: { label: 'Divider', fields: [], defaults: {} },
  spacer: { label: 'Spacer', fields: [['size', 'Height (px)', 'number']], defaults: { size: '24' } },
};

/* One block as a table row of the card (pad = CSS padding) */
function blockRow({ v, H, B, edit }, b, pad) {
  const attrs = edit ? ` data-block="${esc(b.id)}" draggable="true"` : '';
  const row = inner => `              <tr${attrs}><td class="px" style="padding:${pad};font-family:${B};">${inner}</td></tr>`;
  switch (b.type) {
    case 'heading':
      return row(`<h2 class="t" style="margin:0;font-family:${H};font-size:22px;line-height:30px;font-weight:800;letter-spacing:-0.3px;color:${v.text};">${rich(b.text)}</h2>`);
    case 'text':
      return row(`<p class="m" style="margin:0;font-size:16px;line-height:26px;color:${v.muted};">${escBr(b.text)}</p>`);
    case 'button': {
      const center = b.align === 'center';
      return row(`<table role="presentation" cellpadding="0" cellspacing="0" border="0"${center ? ' align="center"' : ''}><tr><td>${buttonHtml({ text: b.text || 'Learn more', url: b.url, bg: v.brand, color: v.btnText, font: H })}</td></tr></table>`);
    }
    case 'image': {
      const src = String(b.url || '').trim();
      if (!src) return edit ? row(`<div style="padding:28px;border:2px dashed #cbd5e1;border-radius:12px;text-align:center;color:#64748b;font-size:14px;">Image: paste an https:// URL in the panel</div>`) : '';
      const img = `<img src="${safeUrl(src)}" width="504" alt="${esc(b.alt)}" style="display:block;width:100%;max-width:504px;height:auto;border:0;border-radius:12px;">`;
      return row(String(b.link || '').trim() ? `<a href="${safeUrl(b.link)}" target="_blank">${img}</a>` : img);
    }
    case 'columns': {
      // Card content is 504px wide; columns share it with a 16px gutter. On phones every cell
      // stacks to full width (.stack), with space under all but the last (.stack-pad / .stack-end).
      const n = columnCount(b), G = 16;
      const colW = Math.floor((504 - G * (n - 1)) / n);
      const small = n >= 3;
      const gap = h => `<div style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</div>`;
      const cells = Array.from({ length: n }, (_, i) => {
        const c = k => String(b[`c${i + 1}${k}`] ?? '');
        const src = c('Image').trim(), url = c('Url').trim(), btn = c('Btn').trim();
        const parts = [];
        if (src) {
          const img = `<img class="stack-img" src="${safeUrl(src)}" width="${colW}" alt="${esc(c('Alt'))}" style="display:block;width:100%;max-width:${colW}px;height:auto;border:0;border-radius:10px;">`;
          parts.push(url ? `<a href="${safeUrl(url)}" target="_blank">${img}</a>` : img, gap(14));
        }
        if (c('Title').trim()) parts.push(`<h3 class="t" style="margin:0 0 6px;font-family:${H};font-size:${small ? 16 : 18}px;line-height:24px;font-weight:800;color:${v.text};">${rich(c('Title'))}</h3>`);
        if (c('Text').trim()) parts.push(`<p class="m" style="margin:0;font-size:${small ? 14 : 15}px;line-height:22px;color:${v.muted};">${escBr(c('Text'))}</p>`);
        if (btn) parts.push(gap(14), buttonHtml({ text: btn, url, bg: v.brand, color: v.btnText, font: H, width: Math.min(colW, small ? colW : 180), height: small ? 38 : 44, radius: 8, fontSize: small ? 14 : 15, padX: small ? 12 : 20 }));
        const padL = i ? G / 2 : 0, padR = i < n - 1 ? G / 2 : 0;
        return `<td class="stack ${i < n - 1 ? 'stack-pad' : 'stack-end'}" width="${Math.floor(100 / n)}%" valign="top" style="padding:0 ${padR}px 0 ${padL}px;font-family:${B};">${parts.join('')}</td>`;
      });
      return row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                  ${cells.join('\n                  ')}
                </tr></table>`);
    }
    case 'divider':
      return row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;font-size:0;line-height:0;">&nbsp;</td></tr></table>`);
    case 'spacer': {
      const n = Math.max(4, Math.min(160, parseInt(b.size, 10) || 24));
      return row(`<div style="height:${n}px;line-height:${n}px;font-size:0;">&nbsp;</div>`);
    }
    default:
      return '';
  }
}

/* The card's own top-level rows (<tr> not inside a nested table) */
export function splitRows(html) {
  const rows = [];
  const re = /<(\/?)(table|tr)\b[^>]*>/gi;
  let depth = 0, start = -1, m;
  while ((m = re.exec(html))) {
    const close = !!m[1];
    if (m[2].toLowerCase() === 'table') { depth += close ? -1 : 1; continue; }
    if (depth !== 0) continue;
    if (!close && start < 0) start = m.index;
    else if (close && start >= 0) { rows.push(html.slice(start, re.lastIndex)); start = -1; }
  }
  return rows;
}

/* Slot of a block among the card's rows: 'top' = 0, 'bottom' = after the last row, or a
   number (after that many rows) so a section can sit between two template sections */
export function blockSlot(b, rowCount) {
  if (b.where === 'top') return 0;
  if (b.where === 'bottom' || b.where === undefined || b.where === null || b.where === '') return rowCount;
  const n = parseInt(b.where, 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(rowCount, n)) : rowCount;
}

/** The card's rows with the user's blocks placed in their slots. In the editor, rows are
    marked data-row="k" so blocks can be dragged between them in the preview. */
export function placeBlocks(card, c) {
  const blocks = (c.blocks || []).filter(b => BLOCK_TYPES[b.type]);
  if (!blocks.length && !c.edit) return card;
  const rows = splitRows(card);
  if (!rows.length) return card;
  const n = rows.length;
  const bySlot = Array.from({ length: n + 1 }, () => []);
  blocks.forEach(b => bySlot[blockSlot(b, n)].push(b));
  const out = [];
  for (let k = 0; k <= n; k++) {
    bySlot[k].forEach((b, i) => {
      const first = i === 0, last = i === bySlot[k].length - 1;
      const pad = `${k === 0 && first ? 40 : 12}px 48px ${k === n && last ? 40 : 20}px`;
      const html = blockRow(c, b, pad);
      if (html) out.push(html);
    });
    if (k < n) out.push(c.edit ? rows[k].replace(/^<tr\b/i, `<tr data-row="${k}"`) : rows[k]);
  }
  return `\n${out.join('\n')}`;
}

/** Plain-text lines for the blocks placed at `where` */
export function blocksText(blocks = [], where) {
  // Plain text: top blocks first, every other block (between sections or at the end) last
  return blocks.filter(b => BLOCK_TYPES[b.type] && ((b.where === 'top' || String(b.where) === '0') ? 'top' : 'bottom') === where).map(b => {
    switch (b.type) {
      case 'heading': return String(b.text || '').toUpperCase();
      case 'text': return wrapText(b.text || '');
      case 'button': return b.text ? `${b.text}: ${safeUrl(b.url)}` : '';
      case 'image': return b.alt ? `[${b.alt}]${b.link ? ` ${safeUrl(b.link)}` : ''}` : '';
      case 'columns': return Array.from({ length: columnCount(b) }, (_, i) => {
        const c = k => String(b[`c${i + 1}${k}`] ?? '').trim();
        return [c('Title') ? stripRich(c('Title')).toUpperCase() : '', c('Text') ? wrapText(stripRich(c('Text'))) : '', c('Btn') ? `${stripRich(c('Btn'))}: ${safeUrl(c('Url'))}` : ''].filter(Boolean).join('\n');
      }).filter(Boolean).join('\n\n');
      case 'divider': return '---';
      default: return '';
    }
  }).filter(Boolean).join('\n\n');
}

/* ── Pieces several templates share ─────────────────────────────────────────────── */
export const IMG = name => `https://webdevpuneet.com/images/email-templates/${name}`;

export const socialFields = ({ x = 'https://x.com/yourbrand', linkedin = 'https://www.linkedin.com/company/yourbrand', instagram = 'https://www.instagram.com/yourbrand', youtube = '' } = {}) => [
  { key: 'xUrl', group: 'social', label: 'X (Twitter) URL', type: 'url', value: x },
  { key: 'linkedinUrl', group: 'social', label: 'LinkedIn URL', type: 'url', value: linkedin },
  { key: 'instagramUrl', group: 'social', label: 'Instagram URL', type: 'url', value: instagram },
  { key: 'youtubeUrl', group: 'social', label: 'YouTube URL', type: 'url', value: youtube },
];
export const socialList = f => [['X', f.xUrl, 'xUrl'], ['LinkedIn', f.linkedinUrl, 'linkedinUrl'], ['Instagram', f.instagramUrl, 'instagramUrl'], ['YouTube', f.youtubeUrl, 'youtubeUrl']].filter(([, u]) => String(u || '').trim());
/** Social links as a footer row (empty when switched off or no links) */
export function socialRowHtml({ f, v, B, A, on }, toggle = 'showSocial') {
  const list = socialList(f);
  if (!on[toggle] || !list.length) return '';
  return `
              <tr>
                <td align="center" style="padding:0 0 14px;font-family:${B};font-size:13px;line-height:20px;">
                  ${list.map(([label, u, key]) => `<a${A(key)} href="${safeUrl(u)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">${label}</a>`).join(' <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> ')}
                </td>
              </tr>`;
}
export const socialText = (f, on, toggle = 'showSocial') => (on[toggle] ? socialList(f).map(([l, u]) => `${l}: ${safeUrl(u)}`).join('\n') : '');

/** Bulletproof button in its own table (left or centred) */
export const buttonRow = ({ v, H, A }, key, text, url, { align = 'left', pad = '0 0 24px', width, height } = {}) => (text
  ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"${align === 'center' ? ' align="center"' : ''}><tr><td style="padding:${pad};">${buttonHtml({ text, url, bg: v.brand, color: v.btnText, font: H, attrs: A(key), ...(width ? { width } : {}), ...(height ? { height } : {}) })}</td></tr></table>`
  : '');

/** Label / value rows in a soft box (order details, event details, request details) */
export function detailsBoxHtml({ v, B, A }, rows) {
  const list = rows.filter(([, val]) => String(val || '').trim());
  if (!list.length) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;">
                    <tr><td style="padding:10px 20px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${list.map(([label, val, key]) => `<tr>
                          <td class="m" width="38%" valign="top" style="padding:8px 12px 8px 0;font-family:${B};font-size:14px;line-height:21px;color:${v.muted};">${label}</td>
                          <td class="t"${A(key)} valign="top" style="padding:8px 0;font-family:${B};font-size:14px;line-height:21px;font-weight:600;color:${v.text};">${rich(val)}</td>
                        </tr>`).join('\n                        ')}
                      </table>
                    </td></tr>
                  </table>`;
}
