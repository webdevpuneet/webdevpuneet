import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, IMG, buttonRow } from './shell.js';

export default {
  id: 'back-in-stock',
  name: 'Back in Stock Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['back-in-stock', 'restock', 'waitlist', 'low-stock', 'ecommerce', 'shopify', 'store'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Back in Stock Email Template — Free Restock Alert HTML Email',
  seoDescription: 'Free back in stock email template: product photo, price, a "back in stock" badge, a low-stock line and a Shop now button for waitlist shoppers. Copy the HTML.',
  description: 'A restock alert for shoppers who joined a waitlist: a "Back in stock" badge, the product photo, name, variant and price, an honest low-stock line, a big "Shop now" button and a note that the alert was sent because they asked for it.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'product', label: 'Product' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('It’s back! Studio Wireless Headphones are in stock', 'You asked us to let you know. They sold out fast last time, so grab yours while they last.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'You asked, it’s back' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Good news, {{first_name}}: it’s back in stock' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'The item on your wishlist just landed back in our warehouse. Last time it sold out in under a week, so we wanted you to hear first.' },
    { key: 'productImg', group: 'product', label: 'Product image URL', type: 'url', value: IMG('product-headphones.png'), hint: 'Square photos work best (shown at up to 260×260 px). Paste a hosted URL or upload.', upload: { name: 'product', maxW: 520, mime: 'image/jpeg' } },
    { key: 'badge', group: 'product', label: 'Badge', type: 'text', value: 'Back in stock' },
    { key: 'productName', group: 'product', label: 'Product name', type: 'text', value: 'Studio Wireless Headphones' },
    { key: 'variant', group: 'product', label: 'Variant (optional)', type: 'text', value: 'Color: Violet' },
    { key: 'price', group: 'product', label: 'Price', type: 'text', value: '$129.00' },
    { key: 'stockNote', group: 'product', label: 'Stock note (optional)', type: 'text', value: 'Limited stock: only a few left in this color' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Shop now' },
    { key: 'ctaUrl', group: 'main', label: 'Product link', type: 'url', value: 'https://yoursite.com/products/studio-wireless-headphones' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'We don’t hold items in carts, so stock goes to whoever checks out first. Questions about this product? Just reply to this email.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you asked to be notified when this item was back in stock.' }),
  ],
  toggles: [],
  vars: DEFAULT_VARS('#6d28d9'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, H, B, A } = c;
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f5f3ff;border-radius:16px;"><tr>
                    <td align="center" style="padding:26px 22px;font-family:${B};text-align:center;">
                      ${f.badge ? `<p style="margin:0 0 14px;"><span${A('badge')} style="display:inline-block;padding:5px 14px;border-radius:99px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:12px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">&#10003; ${rich(f.badge)}</span></p>` : ''}
                      ${f.productImg ? `<a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A('productImg')} src="${safeUrl(f.productImg)}" width="260" alt="${esc(f.productName)}" style="display:block;margin:0 auto 16px;width:100%;max-width:260px;height:auto;border:0;border-radius:14px;"></a>` : ''}
                      <p class="t"${A('productName')} style="margin:0 0 2px;font-family:${H};font-size:20px;line-height:27px;font-weight:700;color:${v.text};">${rich(f.productName)}</p>
                      ${f.variant ? `<p class="m"${A('variant')} style="margin:0 0 6px;font-size:14px;line-height:20px;color:${v.muted};">${rich(f.variant)}</p>` : ''}
                      ${f.price ? `<p class="t"${A('price')} style="margin:0;font-family:${H};font-size:22px;line-height:28px;font-weight:800;color:${v.text};">${rich(f.price)}</p>` : ''}
                      ${f.stockNote ? `<p${A('stockNote')} style="margin:12px 0 0;font-size:13px;line-height:19px;font-weight:700;color:#b45309;">&#9888; ${rich(f.stockNote)}</p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>
              <tr>
                <td class="px" align="center" style="padding:0 48px 28px;text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0', width: 260, height: 54 })}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};text-align:center;">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `${f.badge ? `[${f.badge}] ` : ''}${f.productName}${f.variant ? ` (${f.variant})` : ''}`, f.price || ''];
    if (f.stockNote) out.push(f.stockNote);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
