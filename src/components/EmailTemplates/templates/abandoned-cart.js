import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, IMG, buttonRow } from './shell.js';

const ITEMS = [1, 2, 3];
const itemFields = (n, name, meta, price, img) => [
  { key: `item${n}Img`, group: 'items', label: `Item ${n} image URL`, type: 'url', value: img, hint: n === 1 ? 'Square product photos work best (shown at 96×96 px). Paste a hosted URL or upload.' : undefined, upload: { name: `item${n}`, maxW: 240, mime: 'image/jpeg' } },
  { key: `item${n}Name`, group: 'items', label: `Item ${n} name`, type: 'text', value: name },
  { key: `item${n}Meta`, group: 'items', label: `Item ${n} details`, type: 'text', value: meta },
  { key: `item${n}Price`, group: 'items', label: `Item ${n} price`, type: 'text', value: price },
];
const items = f => ITEMS.map(n => ({ n, img: f[`item${n}Img`], name: f[`item${n}Name`], meta: f[`item${n}Meta`], price: f[`item${n}Price`] })).filter(i => String(i.name || '').trim());

export default {
  id: 'abandoned-cart',
  name: 'Abandoned Cart Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['abandoned-cart', 'cart-recovery', 'ecommerce', 'shopify', 'store', 'discount-code', 'dark-mode'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Abandoned Cart Email Template — Free HTML Cart Recovery',
  seoDescription: 'Free abandoned cart email template: product photos, prices, a return-to-cart button, optional discount code and trust badges. Responsive HTML with dark mode.',
  description: 'A cart recovery email for online stores: a friendly "you left something behind" headline, up to three cart items with photos and prices, a bold return-to-cart button, an optional discount code, free-shipping and returns reassurance and a help line.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'items', label: 'Cart items (leave a name empty to hide it)' },
    { id: 'offer', label: 'Discount offer', toggle: 'showOffer' },
    { id: 'trust', label: 'Reassurance', toggle: 'showTrust' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('You left something in your cart', 'Your items are still waiting, and they’re selling fast. Here’s 10% off to help you decide.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Still thinking it over?' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'You left something behind, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Good news: we saved your cart. The items below are still available, but popular sizes tend to sell out, so don’t wait too long.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Return to your cart' },
    { key: 'ctaUrl', group: 'main', label: 'Cart link', type: 'url', value: 'https://yoursite.com/cart' },
    ...itemFields(1, 'Everyday Canvas Tote', 'Color: Sand · Qty 1', '$48.00', IMG('product-tote.png')),
    ...itemFields(2, 'Merino Crew Socks (3-pack)', 'Size: M · Qty 1', '$18.00', IMG('product-socks.png')),
    ...itemFields(3, '', '', '', ''),
    { key: 'offerTitle', group: 'offer', label: 'Offer headline', type: 'text', value: 'Here’s 10% off to help you decide' },
    { key: 'code', group: 'offer', label: 'Discount code', type: 'text', value: 'COMEBACK10' },
    { key: 'offerNote', group: 'offer', label: 'Offer note', type: 'text', value: 'Applies automatically at checkout. Valid for 48 hours.' },
    { key: 'trust1', group: 'trust', label: 'Point 1', type: 'text', value: '🚚 Free shipping over $50' },
    { key: 'trust2', group: 'trust', label: 'Point 2', type: 'text', value: '↩ 30-day free returns' },
    { key: 'trust3', group: 'trust', label: 'Point 3', type: 'text', value: '🔒 Secure checkout' },
    { key: 'note', group: 'main', label: 'Help note', type: 'textarea', value: 'Questions about sizing or shipping? Just reply to this email and a real person will get back to you.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you started a checkout at Acme Store.' }),
  ],
  toggles: [
    { key: 'showOffer', label: 'Discount offer', value: true },
    { key: 'showTrust', label: 'Reassurance', value: true },
  ],
  vars: DEFAULT_VARS('#ea580c'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = items(f);
    const trust = [1, 2, 3].map(n => [f[`trust${n}`], `trust${n}`]).filter(([x]) => String(x || '').trim());
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 8px;')}
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:12px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(i => `<tr>
                      ${i.img ? `<td class="line" width="96" valign="top" style="width:96px;padding:16px 16px 16px 0;border-bottom:1px solid #e2e8f0;"><a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A(`item${i.n}Img`)} src="${safeUrl(i.img)}" width="80" height="80" alt="${esc(i.name)}" style="display:block;width:80px;height:80px;border:0;border-radius:10px;object-fit:cover;"></a></td>` : ''}
                      <td class="line" valign="middle" style="padding:16px 0;border-bottom:1px solid #e2e8f0;font-family:${B};">
                        <span class="t"${A(`item${i.n}Name`)} style="display:block;font-size:16px;line-height:23px;font-weight:700;color:${v.text};">${rich(i.name)}</span>
                        ${i.meta ? `<span class="m"${A(`item${i.n}Meta`)} style="display:block;font-size:13px;line-height:20px;color:${v.muted};">${rich(i.meta)}</span>` : ''}
                      </td>
                      <td class="line t" align="right" valign="middle"${A(`item${i.n}Price`)} style="padding:16px 0 16px 12px;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:16px;line-height:23px;font-weight:700;color:${v.text};white-space:nowrap;">${rich(i.price)}</td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:28px 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 20px', width: 260 })}
                </td>
              </tr>
              ${on.showOffer && f.code ? `<tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fff7ed;border-radius:12px;">
                    <tr><td align="center" style="padding:22px 20px;font-family:${B};text-align:center;">
                      ${f.offerTitle ? `<p class="t"${A('offerTitle')} style="margin:0 0 12px;font-family:${H};font-size:18px;line-height:25px;font-weight:700;color:${v.text};">${rich(f.offerTitle)}</p>` : ''}
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                        <td${A('code')} style="padding:10px 22px;border:2px dashed ${v.brand};border-radius:10px;font-family:'Courier New',Courier,monospace;font-size:24px;line-height:30px;font-weight:700;letter-spacing:3px;color:${v.brand};">${rich(f.code)}</td>
                      </tr></table>
                      ${f.offerNote ? `<p class="m"${A('offerNote')} style="margin:12px 0 0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.offerNote)}</p>` : ''}
                    </td></tr>
                  </table>
                </td>
              </tr>` : ''}
              ${on.showTrust && trust.length ? `<tr>
                <td class="px" style="padding:0 48px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${trust.map(([x, key]) => `<td class="stack stack-pad m" align="center" width="${Math.floor(100 / trust.length)}%"${A(key)} style="padding:0 6px;font-family:${B};font-size:13px;line-height:19px;font-weight:600;color:${v.muted};text-align:center;">${rich(x)}</td>`).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:4px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    for (const i of items(f)) out.push(`- ${i.name}${i.meta ? ` (${i.meta})` : ''}  ${i.price}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showOffer && f.code) out.push(f.offerTitle, `Code: ${f.code}`, f.offerNote || '', '');
    if (on.showTrust) out.push([f.trust1, f.trust2, f.trust3].filter(Boolean).join(' | '), '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
