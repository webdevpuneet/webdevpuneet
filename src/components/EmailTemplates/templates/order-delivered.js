import { esc, escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, IMG } from './shell.js';

const ITEMS = [1, 2, 3];
const itemFields = (n, name, meta, img) => [
  { key: `item${n}Name`, group: 'items', label: `Item ${n} name`, type: 'text', value: name },
  { key: `item${n}Meta`, group: 'items', label: `Item ${n} details`, type: 'text', value: meta },
  { key: `item${n}Img`, group: 'items', label: `Item ${n} image URL`, type: 'url', value: img, hint: n === 1 ? 'Square product photos work best (shown at 64×64 px). Paste a hosted URL or upload.' : undefined, upload: { name: `item${n}`, maxW: 192, mime: 'image/jpeg' } },
  { key: `item${n}Url`, group: 'items', label: `Item ${n} review link`, type: 'url', value: `https://webdevpuneet.com/reviews/new?order=10482&item=${n}` },
];
const items = f => ITEMS.map(n => ({ n, name: f[`item${n}Name`], meta: f[`item${n}Meta`], img: f[`item${n}Img`], url: f[`item${n}Url`] })).filter(i => String(i.name || '').trim());

export default {
  id: 'order-delivered',
  name: 'Order Delivered Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['order-delivered', 'delivery-confirmation', 'post-purchase', 'review', 'ecommerce', 'shopify', 'store', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Order Delivered Email Template — Free Delivery Confirmation',
  seoDescription: 'Free order delivered email template: a completed tracking bar, where the parcel was left, product photos with a review link each, and a report-a-problem box.',
  description: 'The email that closes the delivery loop: a completed four-step tracking bar, when and where the parcel was left ("front porch, by the bench"), each item with its photo and a "Write a review" link, a report-a-problem box for missing or damaged parcels, and short care or getting-started tips.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'delivery', label: 'Delivery details' },
    { id: 'items', label: 'Items (leave a name empty to hide it)' },
    { id: 'problem', label: 'Report a problem', toggle: 'showProblem' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Delivered: your Acme Store order #10482', 'Left on the front porch at 2:14 PM. Enjoy, and tell us how it all looks.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Delivered' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'It’s arrived, {{first_name}}!' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your order made it to your door. We hope everything is exactly what you pictured.' },
    { key: 'deliveredAt', group: 'delivery', label: 'Delivered on', type: 'text', value: 'Thursday, Oct 22 at 2:14 PM' },
    { key: 'leftAt', group: 'delivery', label: 'Left at', type: 'text', value: 'Front porch, by the bench' },
    { key: 'orderNumber', group: 'delivery', label: 'Order number', type: 'text', value: '#10482' },
    { key: 'carrier', group: 'delivery', label: 'Carrier', type: 'text', value: 'UPS Ground' },
    ...itemFields(1, 'Everyday Canvas Tote', 'Sand · One size', IMG('product-tote.png')),
    ...itemFields(2, 'Merino Crew Socks (3-pack)', 'Size M · Qty 2', IMG('product-socks.png')),
    ...itemFields(3, 'Ceramic Pour-Over Set', 'Matte white', IMG('product-pourover.png')),
    { key: 'reviewText', group: 'items', label: 'Review link text', type: 'text', value: 'Write a review' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'View your order' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/account/orders/10482' },
    { key: 'problemTitle', group: 'problem', label: 'Title', type: 'text', value: 'Can’t find it, or something’s not right?' },
    { key: 'problemText', group: 'problem', label: 'Text', type: 'textarea', value: 'Check around the door and with neighbours first. If it’s missing or arrived damaged, tell us within 7 days and we’ll send a replacement or refund.' },
    { key: 'problemLinkText', group: 'problem', label: 'Link text', type: 'text', value: 'Report a problem' },
    { key: 'problemUrl', group: 'problem', label: 'Link', type: 'url', value: 'https://webdevpuneet.com/help/order-issue?order=10482' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Care tip: wash the merino socks cool and dry them flat, they’ll last for years.' },
    ...footerFields({ reason: 'You’re receiving this email because you placed an order at Acme Store.' }),
  ],
  toggles: [{ key: 'showProblem', label: 'Report a problem', value: true }],
  vars: DEFAULT_VARS('#0e7490').map(x => (x.key === 'bg' ? { ...x, value: '#ecf3f5' } : x)),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = items(f);
    const STAGES = ['Ordered', 'Shipped', 'Out for delivery', 'Delivered'];
    const bar = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${STAGES.map((label, i) => `<td width="25%" valign="top" style="padding:0 ${i < 3 ? 3 : 0}px 0 ${i ? 3 : 0}px;font-family:${B};">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="8" style="height:8px;font-size:0;line-height:0;border-radius:4px;background:${v.brand};">&nbsp;</td></tr></table>
                      <p class="${i === 3 ? 't' : 'm'}" style="margin:8px 0 0;font-size:12px;line-height:16px;font-weight:${i === 3 ? 800 : 600};color:${i === 3 ? v.text : v.muted};">&#10003; ${label}</p>
                    </td>`).join('\n                    ')}
                  </tr></table>`;
    const fact = (label, key, val) => (String(val || '').trim() ? `<td class="stack stack-pad" width="50%" valign="top" style="padding:0 10px 0 0;font-family:${B};">
                        <p class="m" style="margin:0;font-size:12px;line-height:17px;letter-spacing:0.8px;text-transform:uppercase;color:${v.muted};">${label}</p>
                        <p class="t"${A(key)} style="margin:3px 0 0;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(val)}</p>
                      </td>` : '');
    const card = `
              <tr>
                <td class="px" style="padding:40px 48px 6px;font-family:${B};">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="56" height="56" style="width:56px;height:56px;border-radius:28px;background:${v.brand};color:${v.btnText};font-size:26px;line-height:56px;font-weight:800;mso-line-height-rule:exactly;">&#10003;</td></tr></table>
                  <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  ${bar}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:22px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f2f7f8;border-radius:12px;"><tr><td style="padding:16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                      ${fact('Delivered', 'deliveredAt', f.deliveredAt)}
                      ${fact('Left at', 'leftAt', f.leftAt)}
                    </tr></table>
                    ${f.orderNumber || f.carrier ? `<p class="m" style="margin:12px 0 0;font-family:${B};font-size:13px;line-height:19px;color:${v.muted};">${f.orderNumber ? `Order <span${A('orderNumber')}>${rich(f.orderNumber)}</span>` : ''}${f.orderNumber && f.carrier ? ' &middot; ' : ''}${f.carrier ? `<span${A('carrier')}>${rich(f.carrier)}</span>` : ''}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:24px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(i => `<tr>
                      <td width="80" valign="middle" class="line" style="padding:12px 14px 12px 0;border-bottom:1px solid #e2e8f0;">${String(i.img || '').trim() ? `<img${A(`item${i.n}Img`)} src="${safeUrl(i.img)}" width="64" height="64" alt="${esc(stripRich(i.name))}" style="display:block;width:64px;height:64px;border:0;border-radius:10px;object-fit:cover;background:#f1f5f9;">` : `<div style="width:64px;height:64px;border-radius:10px;background:#e2e8f0;"></div>`}</td>
                      <td valign="middle" class="line" style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${B};">
                        <span class="t"${A(`item${i.n}Name`)} style="display:block;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(i.name)}</span>
                        ${i.meta ? `<span class="m"${A(`item${i.n}Meta`)} style="display:block;font-size:13px;line-height:19px;color:${v.muted};">${rich(i.meta)}</span>` : ''}
                        ${f.reviewText ? `<a href="${safeUrl(i.url)}" target="_blank" style="display:inline-block;margin-top:4px;font-size:13px;line-height:19px;font-weight:700;color:${v.brand};text-decoration:none;"><span style="color:#f59e0b;letter-spacing:1px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>&nbsp; <span${A('reviewText')}>${rich(f.reviewText)}</span></a>` : ''}
                      </td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:24px 48px 4px;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 20px', width: 220 })}
                </td>
              </tr>
              ${on.showProblem ? `<tr>
                <td class="px" style="padding:0 48px 0;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="line" style="border-collapse:separate;border:1px dashed #cbd5e1;border-radius:12px;"><tr><td style="padding:16px 20px;font-family:${B};">
                    ${f.problemTitle ? `<p class="t"${A('problemTitle')} style="margin:0 0 6px;font-family:${H};font-size:16px;line-height:22px;font-weight:800;color:${v.text};">${rich(f.problemTitle)}</p>` : ''}
                    ${f.problemText ? `<p class="m"${A('problemText')} style="margin:0 0 10px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.problemText)}</p>` : ''}
                    ${f.problemLinkText ? `<a${A('problemLinkText')} href="${safeUrl(f.problemUrl)}" target="_blank" style="font-size:14px;line-height:20px;font-weight:700;color:${v.brand};text-decoration:underline;">${rich(f.problemLinkText)}</a>` : ''}
                  </td></tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:22px 48px 40px;font-family:${B};">
                  ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', 'Status: Ordered > Shipped > Out for delivery > Delivered', ''];
    for (const [l, x] of [['Delivered', f.deliveredAt], ['Left at', f.leftAt], ['Order', f.orderNumber], ['Carrier', f.carrier]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('');
    for (const i of items(f)) {
      out.push(`- ${i.name}${i.meta ? ` (${i.meta})` : ''}`);
      if (f.reviewText) out.push(`  ${f.reviewText}: ${safeUrl(i.url)}`);
    }
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showProblem) {
      out.push(f.problemTitle || '', wrapText(f.problemText || ''));
      if (f.problemLinkText) out.push(`${f.problemLinkText}: ${safeUrl(f.problemUrl)}`);
      out.push('');
    }
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
