import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'refund-confirmation',
  name: 'Refund Confirmation Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['refund', 'return', 'refund-confirmation', 'money-back', 'ecommerce', 'customer-service', 'transactional'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Refund Confirmation Email Template — Free Refund Processed',
  seoDescription: 'Free refund confirmation email template: refund amount, original order, payment method, arrival time and items returned, plus a details button. Copy HTML.',
  description: 'A clear refund confirmation for stores and subscriptions: a green "refund processed" check badge, the amount refunded in large type, the order and refund reference, the card it is going back to, how long it takes to arrive, the items returned and a support line.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'refund', label: 'Refund details' },
    { id: 'items', label: 'Items returned', toggle: 'showItems' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your refund of $84.00 has been processed', 'Your money is on its way back to your Visa ending in 4242. It usually arrives in 5–10 business days.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Refund processed' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your refund is on its way, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'We’ve received your return and processed your refund. Here are the details for your records.' },
    { key: 'amount', group: 'refund', label: 'Amount refunded', type: 'text', value: '$84.00' },
    { key: 'order', group: 'refund', label: 'Original order', type: 'text', value: '#10482' },
    { key: 'refundRef', group: 'refund', label: 'Refund reference', type: 'text', value: 'RF-55102' },
    { key: 'method', group: 'refund', label: 'Refunded to', type: 'text', value: 'Visa ending in 4242' },
    { key: 'date', group: 'refund', label: 'Processed on', type: 'text', value: 'October 20, 2026' },
    { key: 'arrival', group: 'refund', label: 'Arrival note', type: 'text', value: 'Refunds usually appear in 5–10 business days, depending on your bank.' },
    { key: 'item1', group: 'items', label: 'Item 1', type: 'text', value: 'Merino Crew Socks (3-pack) · M · $36.00' },
    { key: 'item2', group: 'items', label: 'Item 2', type: 'text', value: 'Ceramic Pour-Over Set · Matte white · $48.00' },
    { key: 'item3', group: 'items', label: 'Item 3', type: 'text', value: '' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'View refund details' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/account/orders/10482' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Don’t see it after 10 business days? Check with your bank first, then reply to this email with your refund reference and we’ll look into it.' },
    ...footerFields({ reason: 'You’re receiving this because you requested a refund from Acme Store.' }),
  ],
  toggles: [{ key: 'showItems', label: 'Items returned', value: true }],
  vars: DEFAULT_VARS('#15803d'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const items = [1, 2, 3].map(n => [f[`item${n}`], `item${n}`]).filter(([x]) => String(x || '').trim());
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td align="center" valign="middle" width="60" height="60" style="width:60px;height:60px;border-radius:30px;background:${v.brand};color:${v.btnText};font-size:28px;font-weight:700;line-height:60px;mso-line-height-rule:exactly;">&#10003;</td>
                  </tr></table>
                  <div style="height:20px;line-height:20px;font-size:0;">&nbsp;</div>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  <p class="m" style="margin:0 0 2px;font-size:13px;line-height:18px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:${v.muted};">Amount refunded</p>
                  <p class="t"${A('amount')} style="margin:0 0 24px;font-family:${H};font-size:40px;line-height:46px;font-weight:800;letter-spacing:-.8px;color:${v.text};">${rich(f.amount)}</p>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 20px;font-family:${B};">
                  ${detailsBoxHtml(c, [['Original order', f.order, 'order'], ['Refund reference', f.refundRef, 'refundRef'], ['Refunded to', f.method, 'method'], ['Processed on', f.date, 'date']])}
                  ${f.arrival ? `<p class="m"${A('arrival')} style="margin:12px 0 0;font-size:14px;line-height:21px;color:${v.muted};">&#128337; ${rich(f.arrival)}</p>` : ''}
                </td>
              </tr>
              ${on.showItems && items.length ? `<tr>
                <td class="px" style="padding:4px 48px 20px;font-family:${B};">
                  <p class="t" style="margin:0 0 4px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Items returned</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${items.map(([x, key]) => `<tr><td class="line t"${A(key)} style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;line-height:22px;color:${v.text};">${rich(x)}</td></tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:10px 48px 40px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 24px' })}
                  ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `Amount refunded: ${f.amount}`];
    for (const [l, x] of [['Original order', f.order], ['Refund reference', f.refundRef], ['Refunded to', f.method], ['Processed on', f.date]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    if (f.arrival) out.push(f.arrival);
    out.push('');
    if (on.showItems) {
      const items = [f.item1, f.item2, f.item3].filter(x => String(x || '').trim());
      if (items.length) out.push('Items returned:', ...items.map(x => `- ${x}`), '');
    }
    if (f.ctaText) out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
