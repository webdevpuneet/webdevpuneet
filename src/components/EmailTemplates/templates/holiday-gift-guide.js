import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, ctx, emailShell, h1Html, textFooter, cleanText, IMG, buttonRow, socialFields, socialRowHtml, socialText, footerHtml, socialStyleToggle } from './shell.js';

const GIFTS = [1, 2, 3, 4];
const giftFields = (n, name, price, tag, img) => [
  { key: `g${n}Img`, group: 'gifts', label: `Gift ${n} image URL`, type: 'url', value: img, hint: n === 1 ? 'Square photos work best (shown at 240×240 px). Paste a hosted URL or upload.' : undefined, upload: { name: `gift${n}`, maxW: 480, mime: 'image/jpeg' } },
  { key: `g${n}Name`, group: 'gifts', label: `Gift ${n} name`, type: 'text', value: name },
  { key: `g${n}Price`, group: 'gifts', label: `Gift ${n} price`, type: 'text', value: price },
  { key: `g${n}Tag`, group: 'gifts', label: `Gift ${n} tag (optional)`, type: 'text', value: tag },
  { key: `g${n}Url`, group: 'gifts', label: `Gift ${n} link`, type: 'url', value: `https://webdevpuneet.com/products/gift-${n}` },
];
const gifts = f => GIFTS.map(n => ({ n, img: f[`g${n}Img`], name: f[`g${n}Name`], price: f[`g${n}Price`], tag: f[`g${n}Tag`], url: f[`g${n}Url`] })).filter(g => String(g.name || '').trim());

export default {
  id: 'holiday-gift-guide',
  name: 'Holiday Gift Guide Email',
  version: '1.0.0',
  category: 'holidays',
  tags: ['gift-guide', 'holiday', 'christmas', 'product-grid', 'ecommerce', 'store', 'seasonal'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Holiday Gift Guide Email Template — Free HTML Product Grid',
  seoDescription: 'Free holiday gift guide email template: festive hero, a 2×2 product grid with photos, prices and tags, a shipping cut-off banner and a shop button. Copy HTML.',
  description: 'A festive gift guide email for Christmas and the holiday season: a hero image, a warm headline, a 2×2 grid of gifts with photos, prices and "under $50" style tags, an order-by shipping cut-off banner, a shop-all button and social links.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Hero image', toggle: 'showHero' },
    { id: 'main', label: 'Message & button' },
    { id: 'gifts', label: 'Gifts (leave a name empty to hide it)' },
    { id: 'cutoff', label: 'Shipping cut-off', toggle: 'showCutoff' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('🎁 The 2026 Gift Guide: presents they’ll actually love', 'Hand-picked gifts for everyone on your list, from cosy stocking stuffers to show-stoppers.', 'Acme Store'),
    ...brandFields(),
    { key: 'heroUrl', group: 'hero', label: 'Hero image URL', type: 'url', value: IMG('gift-guide-hero.png'), hint: 'Paste a hosted URL or upload an image. 1200×520 px works best.', upload: { name: 'hero', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'heroAlt', group: 'hero', label: 'Hero alt text', type: 'text', value: 'Wrapped holiday gifts' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'The 2026 Gift Guide' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Gifts they’ll actually love' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Stuck on what to get? We picked our favourite gifts for the people on your list, all wrapped for free and ready to ship.' },
    ...giftFields(1, 'Everyday Canvas Tote', '$48', 'Bestseller', IMG('product-tote.png')),
    ...giftFields(2, 'Ceramic Pour-Over Set', '$42', 'For coffee lovers', IMG('product-pourover.png')),
    ...giftFields(3, 'Amber Glow Candle', '$24', 'Under $25', IMG('product-candle.png')),
    ...giftFields(4, 'Studio Wireless Headphones', '$129', 'Big gift', IMG('product-headphones.png')),
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Shop all gifts' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/gift-guide' },
    { key: 'cutoff', group: 'cutoff', label: 'Cut-off text', type: 'text', value: 'Order by December 18 for delivery before Christmas' },
    { key: 'cutoffNote', group: 'cutoff', label: 'Cut-off note', type: 'text', value: 'Free gift wrapping on every order' },
    ...socialFields({ youtube: '' }),
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you signed up for emails from Acme Store.' }),
  ],
  toggles: [
    { key: 'showHero', label: 'Hero image', value: true },
    { key: 'showCutoff', label: 'Shipping cut-off', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
    socialStyleToggle('text'),
  ],
  vars: [
    { key: 'brand', label: 'Brand / button', value: '#b91c1c', group: 'light' },
    { key: 'btnText', label: 'Button text', value: '#ffffff', group: 'light' },
    { key: 'bg', label: 'Page background', value: '#f5efe6', group: 'light' },
    { key: 'card', label: 'Card', value: '#ffffff', group: 'light' },
    { key: 'text', label: 'Text', value: '#1c1917', group: 'light' },
    { key: 'muted', label: 'Muted text', value: '#6b625b', group: 'light' },
    { key: 'darkBg', label: 'Page background', value: '#140d0b', group: 'dark' },
    { key: 'darkCard', label: 'Card', value: '#1f1714', group: 'dark' },
    { key: 'darkText', label: 'Text', value: '#faf5f0', group: 'dark' },
    { key: 'darkMuted', label: 'Muted text', value: '#b8aca3', group: 'dark' },
  ],
  fonts: { heading: 'playfair', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = gifts(f);
    const cell = g => `<td class="stack stack-pad" width="50%" valign="top" style="padding:0 ${g.i % 2 === 0 ? 8 : 0}px 18px ${g.i % 2 === 1 ? 8 : 0}px;font-family:${B};">
                      ${g.img ? `<a href="${safeUrl(g.url)}" target="_blank"><img${A(`g${g.n}Img`)} src="${safeUrl(g.img)}" width="244" alt="${esc(g.name)}" style="display:block;width:100%;max-width:244px;height:auto;border:0;border-radius:12px;"></a>` : ''}
                      ${g.tag ? `<p${A(`g${g.n}Tag`)} style="margin:12px 0 4px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.brand};">${rich(g.tag)}</p>` : '<div style="height:12px;line-height:12px;font-size:0;">&nbsp;</div>'}
                      <p style="margin:0 0 2px;font-family:${H};font-size:17px;line-height:23px;font-weight:700;"><a${A(`g${g.n}Name`)} href="${safeUrl(g.url)}" target="_blank" class="t" style="color:${v.text};text-decoration:none;">${rich(g.name)}</a></p>
                      <p class="m"${A(`g${g.n}Price`)} style="margin:0;font-size:15px;line-height:22px;font-weight:600;color:${v.muted};">${rich(g.price)}</p>
                    </td>`;
    const rows = [];
    list.forEach((g, i) => { if (i % 2 === 0) rows.push([]); rows[rows.length - 1].push({ ...g, i }); });
    const card = `
              ${on.showHero && f.heroUrl ? `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A('heroUrl')} src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></a></td></tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:${on.showHero && f.heroUrl ? 36 : 44}px 48px 8px;font-family:${B};text-align:center;">
                  ${f.eyebrow ? `<p${A('eyebrow')} style="margin:0 0 10px;font-family:${B};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${v.brand};">${rich(f.eyebrow)}</p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 28px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              ${rows.length ? `<tr>
                <td class="px" style="padding:0 48px 6px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${rows.map(r => `<tr>
                    ${r.map(cell).join('\n                    ')}${r.length === 1 ? '\n                    <td class="stack" width="50%" style="padding:0;">&nbsp;</td>' : ''}
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              ${on.showCutoff && f.cutoff ? `<tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fef2f2;border-radius:12px;"><tr>
                    <td align="center" style="padding:16px 18px;font-family:${B};text-align:center;">
                      <p class="t"${A('cutoff')} style="margin:0;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">&#128666; ${rich(f.cutoff)}</p>
                      ${f.cutoffNote ? `<p class="m"${A('cutoffNote')} style="margin:4px 0 0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.cutoffNote)}</p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 40px;text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0' })}
                </td>
              </tr>`;
    return emailShell(c, { card, footer: footerHtml(c, { socials: socialRowHtml(c) }) });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.eyebrow, f.headline, '', wrapText(f.intro), ''];
    for (const g of gifts(f)) out.push(`${g.name} - ${g.price}${g.tag ? ` (${g.tag})` : ''}`, safeUrl(g.url), '');
    if (on.showCutoff && f.cutoff) out.push(f.cutoff, f.cutoffNote || '', '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    const so = socialText(f, on);
    if (so) out.push(so, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
