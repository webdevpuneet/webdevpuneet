import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

const STAGES = [1, 2, 3, 4];
const ITEMS = [1, 2, 3];
const items = f => ITEMS.map(n => ({ n, name: f[`item${n}Name`], qty: f[`item${n}Qty`] })).filter(i => String(i.name || '').trim());
const stage = f => Math.max(1, Math.min(4, parseInt(f.currentStage, 10) || 2));

export default {
  id: 'shipping-confirmation',
  name: 'Shipping Confirmation Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['shipping-confirmation', 'order-shipped', 'tracking', 'ecommerce', 'shopify', 'store', 'transactional', 'dark-mode'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Shipping Confirmation Email Template — Free HTML Tracking',
  seoDescription: 'Free shipping confirmation email template: delivery progress bar, carrier and tracking number, a Track your package button, items and address. Copy the HTML.',
  description: 'An "your order has shipped" email for online stores: a four-step delivery progress bar (ordered, shipped, out for delivery, delivered), carrier, tracking number and estimated delivery, a "Track your package" button, the items in the parcel and the shipping address.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'progress', label: 'Delivery progress', toggle: 'showProgress' },
    { id: 'items', label: 'Items in this shipment', toggle: 'showItems' },
    { id: 'address', label: 'Shipping address', toggle: 'showAddress' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your order #10482 is on its way', 'Good news: your package has shipped. Track it any time with the link inside.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'On its way' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your order has shipped, {{first_name}}!' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your package is with the carrier and heading your way. Tracking can take a few hours to update after the label is scanned.' },
    { key: 'orderNumber', group: 'main', label: 'Order number', type: 'text', value: '#10482' },
    { key: 'carrier', group: 'main', label: 'Carrier', type: 'text', value: 'UPS Ground' },
    { key: 'tracking', group: 'main', label: 'Tracking number', type: 'text', value: '1Z 999 AA1 01 2345 6784' },
    { key: 'delivery', group: 'main', label: 'Estimated delivery', type: 'text', value: 'Friday, October 23' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Track your package' },
    { key: 'ctaUrl', group: 'main', label: 'Tracking link', type: 'url', value: 'https://yoursite.com/track/10482' },
    { key: 'currentStage', group: 'progress', label: 'Current step (1 to 4)', type: 'number', value: '2', hint: '1 = ordered, 2 = shipped, 3 = out for delivery, 4 = delivered.' },
    { key: 'stage1', group: 'progress', label: 'Step 1 label', type: 'text', value: 'Ordered' },
    { key: 'stage2', group: 'progress', label: 'Step 2 label', type: 'text', value: 'Shipped' },
    { key: 'stage3', group: 'progress', label: 'Step 3 label', type: 'text', value: 'Out for delivery' },
    { key: 'stage4', group: 'progress', label: 'Step 4 label', type: 'text', value: 'Delivered' },
    { key: 'item1Name', group: 'items', label: 'Item 1 name', type: 'text', value: 'Everyday Canvas Tote · Sand' },
    { key: 'item1Qty', group: 'items', label: 'Item 1 quantity', type: 'text', value: '1' },
    { key: 'item2Name', group: 'items', label: 'Item 2 name', type: 'text', value: 'Merino Crew Socks (3-pack) · M' },
    { key: 'item2Qty', group: 'items', label: 'Item 2 quantity', type: 'text', value: '2' },
    { key: 'item3Name', group: 'items', label: 'Item 3 name', type: 'text', value: 'Ceramic Pour-Over Set · Matte white' },
    { key: 'item3Qty', group: 'items', label: 'Item 3 quantity', type: 'text', value: '1' },
    { key: 'shipName', group: 'address', label: 'Ship to', type: 'text', value: '{{first_name}} {{last_name}}' },
    { key: 'shipAddress', group: 'address', label: 'Address', type: 'textarea', value: '1200 Pine Street, Apt 4B\nSeattle, WA 98101\nUnited States' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Not home? Most carriers let you choose a safe place or pick-up point from the tracking page. Questions? Just reply to this email.' },
    ...footerFields({ reason: 'You’re receiving this email because you placed an order at Acme Store.' }),
  ],
  toggles: [
    { key: 'showProgress', label: 'Delivery progress', value: true },
    { key: 'showItems', label: 'Items in this shipment', value: true },
    { key: 'showAddress', label: 'Shipping address', value: true },
  ],
  vars: DEFAULT_VARS('#2563eb'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const cur = stage(f);
    const list = items(f);
    const progress = on.showProgress ? `<tr>
                <td class="px" style="padding:4px 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${STAGES.map(n => {
                      const done = n <= cur;
                      return `<td width="25%" valign="top" style="padding:0 ${n < 4 ? 4 : 0}px 0 ${n > 1 ? 4 : 0}px;font-family:${B};">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="${done ? '' : 'line'}" height="8" style="height:8px;font-size:0;line-height:0;border-radius:4px;background:${done ? v.brand : '#e2e8f0'};">&nbsp;</td></tr></table>
                      <p class="${done ? 't' : 'm'}"${A(`stage${n}`)} style="margin:8px 0 0;font-size:12px;line-height:16px;font-weight:${n === cur ? 800 : 600};color:${done ? v.text : v.muted};">${done ? '&#10003; ' : ''}${rich(f[`stage${n}`])}</p>
                    </td>`;
                    }).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : '';
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              ${progress}
              <tr>
                <td class="px" style="padding:0 48px 24px;">
                  ${detailsBoxHtml(c, [['Order', f.orderNumber, 'orderNumber'], ['Carrier', f.carrier, 'carrier'], ['Tracking number', f.tracking, 'tracking'], ['Estimated delivery', f.delivery, 'delivery']])}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 8px;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 22px', width: 260 })}
                </td>
              </tr>
              ${on.showItems && list.length ? `<tr>
                <td class="px" style="padding:0 48px 20px;font-family:${B};">
                  <p class="t" style="margin:0 0 4px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">In this package</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(i => `<tr>
                      <td class="line t"${A(`item${i.n}Name`)} style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;line-height:22px;color:${v.text};">${rich(i.name)}</td>
                      <td class="line m" align="right" style="padding:10px 0 10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:22px;color:${v.muted};white-space:nowrap;">Qty <span${A(`item${i.n}Qty`)}>${rich(i.qty || '1')}</span></td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              ${on.showAddress ? `<tr>
                <td class="px" style="padding:4px 48px 8px;font-family:${B};">
                  <p class="t" style="margin:0 0 6px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Shipping to</p>
                  <p class="m" style="margin:0;font-size:14px;line-height:22px;color:${v.muted};"><span class="t"${A('shipName')} style="color:${v.text};font-weight:600;">${rich(f.shipName)}</span><br><span${A('shipAddress')}>${escBr(f.shipAddress)}</span></p>
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
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    if (on.showProgress) out.push(`Status: ${STAGES.slice(0, stage(f)).map(n => f[`stage${n}`]).filter(Boolean).join(' > ')}`, '');
    for (const [l, x] of [['Order', f.orderNumber], ['Carrier', f.carrier], ['Tracking number', f.tracking], ['Estimated delivery', f.delivery]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showItems) {
      const list = items(f);
      if (list.length) out.push('In this package:', ...list.map(i => `- ${i.name} x${i.qty || 1}`), '');
    }
    if (on.showAddress) out.push('Shipping to:', f.shipName, f.shipAddress, '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
