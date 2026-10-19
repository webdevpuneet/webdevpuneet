import { esc, escBr, safeUrl, buttonHtml, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

const ITEMS = [1, 2, 3];
const itemFields = (n, name, meta, qty, price) => [
  { key: `item${n}Name`, group: 'items', label: `Item ${n} name`, type: 'text', value: name },
  { key: `item${n}Meta`, group: 'items', label: `Item ${n} details`, type: 'text', value: meta },
  { key: `item${n}Qty`, group: 'items', label: `Item ${n} quantity`, type: 'text', value: qty },
  { key: `item${n}Price`, group: 'items', label: `Item ${n} price`, type: 'text', value: price },
];
const items = f => ITEMS.map(n => ({ n, name: f[`item${n}Name`], meta: f[`item${n}Meta`], qty: f[`item${n}Qty`], price: f[`item${n}Price`] })).filter(i => String(i.name || '').trim());

export default {
  id: 'order-confirmation',
  name: 'Order Confirmation Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['order-confirmation', 'ecommerce', 'shopify', 'store', 'payment', 'transactional', 'dark-mode'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Order Confirmation Email Template — Free HTML for Stores',
  seoDescription: 'Free order confirmation email template for online stores: order number, line items, totals, shipping address, delivery date and a button. Copy the HTML.',
  description: 'An ecommerce order confirmation email: a thank-you headline, order number and date, up to three line items with quantity and price, subtotal, shipping, tax and total, the shipping address, an estimated delivery date and an Outlook-safe "View order" button.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'items', label: 'Items (leave a name empty to hide it)' },
    { id: 'totals', label: 'Totals' },
    { id: 'shipping', label: 'Shipping', toggle: 'showShipping' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Order #10482 confirmed', 'Thanks for your order! Here’s your receipt and what happens next.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Order confirmed' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Thanks for your order, {{first_name}}!' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'We’ve received your order and we’re getting it ready. We’ll email you again with tracking details as soon as it ships.' },
    { key: 'orderNumber', group: 'main', label: 'Order number', type: 'text', value: '#10482' },
    { key: 'orderDate', group: 'main', label: 'Order date', type: 'text', value: 'October 17, 2026' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'View your order' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/account/orders/10482' },
    ...itemFields(1, 'Everyday Canvas Tote', 'Color: Sand · One size', '1', '$48.00'),
    ...itemFields(2, 'Merino Crew Socks (3-pack)', 'Size: M', '2', '$36.00'),
    ...itemFields(3, 'Ceramic Pour-Over Set', 'Color: Matte white', '1', '$42.00'),
    { key: 'subtotal', group: 'totals', label: 'Subtotal', type: 'text', value: '$126.00' },
    { key: 'discount', group: 'totals', label: 'Discount (optional)', type: 'text', value: '−$12.60' },
    { key: 'shippingCost', group: 'totals', label: 'Shipping', type: 'text', value: 'Free' },
    { key: 'tax', group: 'totals', label: 'Tax', type: 'text', value: '$9.36' },
    { key: 'total', group: 'totals', label: 'Total', type: 'text', value: '$122.76' },
    { key: 'payment', group: 'totals', label: 'Paid with', type: 'text', value: 'Visa ending in 4242' },
    { key: 'shipName', group: 'shipping', label: 'Ship to', type: 'text', value: '{{first_name}} {{last_name}}' },
    { key: 'shipAddress', group: 'shipping', label: 'Shipping address', type: 'textarea', value: '1200 Pine Street, Apt 4B\nSeattle, WA 98101\nUnited States' },
    { key: 'shipMethod', group: 'shipping', label: 'Shipping method', type: 'text', value: 'Standard (3–5 business days)' },
    { key: 'delivery', group: 'shipping', label: 'Estimated delivery', type: 'text', value: 'Fri, Oct 23 – Tue, Oct 27' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Questions about your order? Just reply to this email, we’re happy to help. You can return unused items within 30 days.' },
    ...footerFields({ reason: 'You’re receiving this email because you placed an order at Acme Store.' }),
  ],
  toggles: [{ key: 'showShipping', label: 'Shipping', value: true }],
  vars: DEFAULT_VARS('#059669'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = items(f);
    const totals = [['Subtotal', f.subtotal, 'subtotal'], ['Discount', f.discount, 'discount'], ['Shipping', f.shippingCost, 'shippingCost'], ['Tax', f.tax, 'tax']].filter(([, x]) => String(x || '').trim());
    const row = (label, val, key, strong) => `<tr>
                      <td class="${strong ? 't' : 'm'}" style="padding:${strong ? '12px 0 0' : '3px 0'};font-family:${strong ? H : B};font-size:${strong ? 17 : 14}px;line-height:22px;font-weight:${strong ? 800 : 400};color:${strong ? v.text : v.muted};">${label}</td>
                      <td align="right" class="t"${A(key)} style="padding:${strong ? '12px 0 0' : '3px 0'};font-family:${strong ? H : B};font-size:${strong ? 17 : 14}px;line-height:22px;font-weight:${strong ? 800 : 600};color:${v.text};">${rich(val)}</td>
                    </tr>`;
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 4px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;">
                    <tr>
                      <td class="stack stack-pad" width="50%" style="padding:16px 20px;font-family:${B};font-size:13px;line-height:20px;">
                        <span class="m" style="color:${v.muted};">Order number</span><br>
                        <span class="t"${A('orderNumber')} style="font-family:${H};font-size:16px;font-weight:700;color:${v.text};">${rich(f.orderNumber)}</span>
                      </td>
                      <td class="stack stack-pad" width="50%" style="padding:16px 20px;font-family:${B};font-size:13px;line-height:20px;">
                        <span class="m" style="color:${v.muted};">Order date</span><br>
                        <span class="t"${A('orderDate')} style="font-family:${H};font-size:16px;font-weight:700;color:${v.text};">${rich(f.orderDate)}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:24px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(i => `<tr>
                      <td class="line" style="padding:14px 0;border-bottom:1px solid #e2e8f0;font-family:${B};">
                        <span class="t"${A(`item${i.n}Name`)} style="display:block;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(i.name)}</span>
                        <span class="m" style="display:block;font-size:13px;line-height:20px;color:${v.muted};">${i.meta ? `<span${A(`item${i.n}Meta`)}>${rich(i.meta)}</span> &middot; ` : ''}Qty <span${A(`item${i.n}Qty`)}>${rich(i.qty || '1')}</span></span>
                      </td>
                      <td class="line t" align="right" valign="top"${A(`item${i.n}Price`)} style="padding:14px 0 14px 12px;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:15px;line-height:22px;font-weight:700;color:${v.text};white-space:nowrap;">${rich(i.price)}</td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:14px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${totals.map(([l, x, k]) => row(l, x, k)).join('\n                    ')}
                    ${f.total ? row('Total', f.total, 'total', true) : ''}
                    ${f.payment ? `<tr><td colspan="2" class="m"${A('payment')} style="padding:6px 0 0;font-family:${B};font-size:13px;line-height:20px;color:${v.muted};">Paid with ${rich(f.payment)}</td></tr>` : ''}
                  </table>
                </td>
              </tr>
              ${on.showShipping ? `<tr>
                <td class="px" style="padding:28px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="stack stack-pad" width="50%" valign="top" style="padding:0 12px 0 0;font-family:${B};font-size:14px;line-height:22px;">
                        <p class="t" style="margin:0 0 6px;font-family:${H};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Shipping to</p>
                        <p class="m" style="margin:0;color:${v.muted};"><span class="t"${A('shipName')} style="color:${v.text};font-weight:600;">${rich(f.shipName)}</span><br><span${A('shipAddress')}>${escBr(f.shipAddress)}</span></p>
                      </td>
                      <td class="stack stack-pad" width="50%" valign="top" style="padding:0 0 0 12px;font-family:${B};font-size:14px;line-height:22px;">
                        <p class="t" style="margin:0 0 6px;font-family:${H};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Delivery</p>
                        <p class="m" style="margin:0;color:${v.muted};"><span${A('shipMethod')}>${rich(f.shipMethod)}</span><br>Estimated: <span class="t"${A('delivery')} style="color:${v.text};font-weight:600;">${rich(f.delivery)}</span></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:30px 48px 40px;font-family:${B};">
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 24px;">${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H, attrs: A('ctaText') })}</td></tr></table>` : ''}
                  ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const lines = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `Order number: ${f.orderNumber}`, `Order date: ${f.orderDate}`, ''];
    for (const i of items(f)) lines.push(`${i.name}${i.meta ? ` (${i.meta})` : ''} x${i.qty || 1}  ${i.price}`);
    lines.push('');
    for (const [l, x] of [['Subtotal', f.subtotal], ['Discount', f.discount], ['Shipping', f.shippingCost], ['Tax', f.tax], ['Total', f.total]]) if (String(x || '').trim()) lines.push(`${l}: ${x}`);
    if (f.payment) lines.push(`Paid with ${f.payment}`);
    lines.push('');
    if (on.showShipping) lines.push('Shipping to:', f.shipName, f.shipAddress, '', `${f.shipMethod}`, `Estimated delivery: ${f.delivery}`, '');
    if (f.ctaText) lines.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) lines.push(wrapText(f.note), '');
    lines.push(textFooter(f));
    return cleanText(lines);
  },
};
