import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, h1Html, pHtml, textFooter, cleanText, buttonRow } from './shell.js';

const ITEMS = [1, 2, 3];
const itemFields = (n, name, meta, price) => [
  { key: `item${n}Name`, group: 'items', label: `Item ${n} name`, type: 'text', value: name },
  { key: `item${n}Meta`, group: 'items', label: `Item ${n} details`, type: 'text', value: meta },
  { key: `item${n}Price`, group: 'items', label: `Item ${n} price`, type: 'text', value: price },
];
const items = f => ITEMS.map(n => ({ n, name: f[`item${n}Name`], meta: f[`item${n}Meta`], price: f[`item${n}Price`] })).filter(i => String(i.name || '').trim());

export default {
  id: 'order-cancelled',
  name: 'Order Cancellation Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['order-cancelled', 'order-cancellation', 'refund', 'out-of-stock', 'ecommerce', 'shopify', 'store', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Order Cancellation Email Template — Free Cancelled Order',
  seoDescription: 'Free order cancellation email template: who cancelled and why, the cancelled items, the refund amount, card and timing, and a Shop again button. Copy HTML.',
  description: 'A clear "your order has been cancelled" email for stores: a cancelled stamp with the order number, who cancelled it and why (customer request, out of stock, payment or address problem), the cancelled items with prices struck through, a refund summary with the amount, card and how long it takes, a "Shop again" button and a support line.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'items', label: 'Cancelled items (leave a name empty to hide it)' },
    { id: 'refund', label: 'Refund', toggle: 'showRefund' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Order #10482 has been cancelled', 'As requested, your order is cancelled. $122.76 is on its way back to your Visa ending 4242.', 'Acme Store'),
    ...brandFields(),
    { key: 'stamp', group: 'main', label: 'Stamp text', type: 'text', value: 'Cancelled' },
    { key: 'orderNumber', group: 'main', label: 'Order number', type: 'text', value: '#10482' },
    { key: 'orderDate', group: 'main', label: 'Order date', type: 'text', value: 'Placed October 17, 2026' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your order has been cancelled' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, as you asked, we’ve cancelled your order before it left the warehouse. You won’t be charged for anything below.' },
    { key: 'cancelledBy', group: 'main', label: 'Who cancelled it and why', type: 'text', value: 'Cancelled at your request on October 18 at 9:05 AM' },
    ...itemFields(1, 'Everyday Canvas Tote', 'Sand · Qty 1', '$48.00'),
    ...itemFields(2, 'Merino Crew Socks (3-pack)', 'Size M · Qty 2', '$36.00'),
    ...itemFields(3, 'Ceramic Pour-Over Set', 'Matte white · Qty 1', '$42.00'),
    { key: 'refundAmount', group: 'refund', label: 'Refund amount', type: 'text', value: '$122.76' },
    { key: 'refundTo', group: 'refund', label: 'Refunded to', type: 'text', value: 'Visa ending in 4242' },
    { key: 'refundTiming', group: 'refund', label: 'When it arrives', type: 'text', value: '5–10 business days, depending on your bank' },
    { key: 'refundRef', group: 'refund', label: 'Refund reference (optional)', type: 'text', value: 'RF-55120' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Shop again' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/shop' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Didn’t mean to cancel? Reply within 24 hours and we’ll try to restore the order at the same prices.' },
    ...footerFields({ reason: 'You’re receiving this email because you placed an order at Acme Store.' }),
  ],
  toggles: [{ key: 'showRefund', label: 'Refund', value: true }],
  vars: DEFAULT_VARS('#be123c').map(x => (x.key === 'bg' ? { ...x, value: '#f5eef0' } : x)),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = items(f);
    const card = `
              <tr>
                <td class="px" style="padding:40px 48px 6px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td valign="middle" style="font-family:${B};">
                      ${f.stamp ? `<span${A('stamp')} style="display:inline-block;padding:6px 14px;border:2px solid ${v.brand};border-radius:8px;color:${v.brand};font-family:${H};font-size:14px;line-height:18px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;">${rich(f.stamp)}</span>` : ''}
                    </td>
                    <td align="right" valign="middle" style="font-family:${B};font-size:13px;line-height:19px;">
                      <span class="t"${A('orderNumber')} style="font-weight:800;color:${v.text};">${rich(f.orderNumber)}</span><br>
                      <span class="m"${A('orderDate')} style="color:${v.muted};">${rich(f.orderDate)}</span>
                    </td>
                  </tr></table>
                  <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 14px;')}
                  ${f.cancelledBy ? `<p class="m"${A('cancelledBy')} style="margin:0;font-size:14px;line-height:21px;color:${v.muted};">&#9432;&nbsp; ${rich(f.cancelledBy)}</p>` : ''}
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:22px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(i => `<tr>
                      <td class="line" style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${B};">
                        <span class="t"${A(`item${i.n}Name`)} style="display:block;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(i.name)}</span>
                        ${i.meta ? `<span class="m"${A(`item${i.n}Meta`)} style="display:block;font-size:13px;line-height:19px;color:${v.muted};">${rich(i.meta)}</span>` : ''}
                      </td>
                      <td class="line m" align="right" valign="top"${A(`item${i.n}Price`)} style="padding:12px 0 12px 12px;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:15px;line-height:22px;color:${v.muted};text-decoration:line-through;white-space:nowrap;">${rich(i.price)}</td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              ${on.showRefund && f.refundAmount ? `<tr>
                <td class="px" style="padding:22px 48px 0;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="border-collapse:separate;background:#f0fdf4;border-radius:14px;border:1px solid #bbf7d0;"><tr>
                    <td class="stack stack-pad" width="42%" valign="top" style="padding:18px 20px;font-family:${B};">
                      <p style="margin:0;font-size:12px;line-height:17px;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:#15803d;">Refund</p>
                      <p class="t"${A('refundAmount')} style="margin:4px 0 0;font-family:${H};font-size:28px;line-height:34px;font-weight:800;color:${v.text};">${rich(f.refundAmount)}</p>
                    </td>
                    <td class="stack stack-end" valign="top" style="padding:18px 20px;font-family:${B};font-size:14px;line-height:21px;">
                      ${f.refundTo ? `<p class="m" style="margin:0 0 4px;color:${v.muted};">To <span class="t"${A('refundTo')} style="font-weight:700;color:${v.text};">${rich(f.refundTo)}</span></p>` : ''}
                      ${f.refundTiming ? `<p class="m"${A('refundTiming')} style="margin:0 0 4px;color:${v.muted};">${rich(f.refundTiming)}</p>` : ''}
                      ${f.refundRef ? `<p class="m" style="margin:0;font-size:13px;color:${v.muted};">Ref <span${A('refundRef')} style="font-family:'Courier New',Courier,monospace;">${rich(f.refundRef)}</span></p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:26px 48px 40px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 22px', width: 200 })}
                  ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', `${(f.stamp || 'Cancelled').toUpperCase()}: ${f.orderNumber}`, f.orderDate || '', '', f.headline, '', wrapText(stripRich(f.intro)), ''];
    if (f.cancelledBy) out.push(f.cancelledBy, '');
    const list = items(f);
    if (list.length) out.push('Cancelled items:', ...list.map(i => `- ${i.name}${i.meta ? ` (${i.meta})` : ''}  ${i.price || ''}`.trimEnd()), '');
    if (on.showRefund && f.refundAmount) {
      out.push(`Refund: ${f.refundAmount}${f.refundTo ? ` to ${f.refundTo}` : ''}`);
      if (f.refundTiming) out.push(f.refundTiming);
      if (f.refundRef) out.push(`Refund reference: ${f.refundRef}`);
      out.push('');
    }
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
