import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

const OPTS = [1, 2, 3];
const options = f => OPTS.map(n => ({ n, title: f[`opt${n}Title`], text: f[`opt${n}Text`], link: f[`opt${n}Link`], url: f[`opt${n}Url`] })).filter(o => String(o.title || '').trim());

export default {
  id: 'shipping-delay',
  name: 'Shipping Delay Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['shipping-delay', 'order-delay', 'backorder', 'apology', 'delivery-update', 'ecommerce', 'shopify', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Shipping Delay Email Template — Free Order Delay Apology',
  seoDescription: 'Free shipping delay email template: the old delivery date struck through beside the new one, an honest reason, three choices and an optional apology code.',
  description: 'An honest "your order is running late" email that keeps the customer’s trust: the original delivery estimate struck through beside the new one, a plain reason for the delay, three clear choices (keep waiting, swap the item, or cancel for a full refund), an optional apology discount code and a direct line to a real person.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message' },
    { id: 'dates', label: 'Old and new delivery date' },
    { id: 'options', label: 'Your options (leave a title empty to hide it)' },
    { id: 'apology', label: 'Apology code', toggle: 'showCode' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your order #10482 is running a few days late', 'New estimate: Wed, Oct 28. Here’s why, and your options if that doesn’t work for you.', 'Acme Store'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Delivery update' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Sorry, {{first_name}}: your order is running late' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'We wanted you to hear it from us before you started watching the door. Your order is safe, it is just taking longer than we promised.' },
    { key: 'orderNumber', group: 'dates', label: 'Order number', type: 'text', value: '#10482' },
    { key: 'oldDate', group: 'dates', label: 'Original estimate', type: 'text', value: 'Fri, Oct 23' },
    { key: 'newDate', group: 'dates', label: 'New estimate', type: 'text', value: 'Wed, Oct 28' },
    { key: 'delayReason', group: 'dates', label: 'Reason for the delay', type: 'textarea', value: '<b>Why:</b> the Ceramic Pour-Over Set sold out faster than expected. A fresh batch reaches our warehouse on Monday and your whole order ships together that day.' },
    { key: 'optionsTitle', group: 'options', label: 'Section title', type: 'text', value: 'Your options' },
    { key: 'opt1Title', group: 'options', label: 'Option 1 title', type: 'text', value: 'Keep waiting' },
    { key: 'opt1Text', group: 'options', label: 'Option 1 text', type: 'text', value: 'Nothing to do. We’ll email tracking the moment it ships.' },
    { key: 'opt1Link', group: 'options', label: 'Option 1 link text (optional)', type: 'text', value: '' },
    { key: 'opt1Url', group: 'options', label: 'Option 1 link', type: 'url', value: '' },
    { key: 'opt2Title', group: 'options', label: 'Option 2 title', type: 'text', value: 'Ship what’s ready now' },
    { key: 'opt2Text', group: 'options', label: 'Option 2 text', type: 'text', value: 'Get the tote and socks this week; the pour-over set follows free.' },
    { key: 'opt2Link', group: 'options', label: 'Option 2 link text', type: 'text', value: 'Split my order' },
    { key: 'opt2Url', group: 'options', label: 'Option 2 link', type: 'url', value: 'https://webdevpuneet.com/orders/10482/split' },
    { key: 'opt3Title', group: 'options', label: 'Option 3 title', type: 'text', value: 'Cancel for a full refund' },
    { key: 'opt3Text', group: 'options', label: 'Option 3 text', type: 'text', value: 'Refunded to your card within 5–10 business days.' },
    { key: 'opt3Link', group: 'options', label: 'Option 3 link text', type: 'text', value: 'Cancel my order' },
    { key: 'opt3Url', group: 'options', label: 'Option 3 link', type: 'url', value: 'https://webdevpuneet.com/orders/10482/cancel' },
    { key: 'codeText', group: 'apology', label: 'Text', type: 'text', value: 'For the wait, here’s 15% off your next order:' },
    { key: 'code', group: 'apology', label: 'Code', type: 'text', value: 'THANKYOU15' },
    { key: 'codeNote', group: 'apology', label: 'Small print', type: 'text', value: 'Valid for 60 days, one use.' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Questions? Reply to this email and you’ll reach Jess on our customer team, not a bot.' },
    ...footerFields({ reason: 'You’re receiving this email because you placed an order at Acme Store.' }),
  ],
  toggles: [{ key: 'showCode', label: 'Apology code', value: true }],
  vars: DEFAULT_VARS('#c2410c').map(x => (x.key === 'bg' ? { ...x, value: '#f6f0ea' } : x)),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = options(f);
    const dates = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fbf6f1;border-radius:14px;"><tr>
                    <td class="stack stack-pad" width="44%" valign="top" style="padding:18px 20px;font-family:${B};">
                      <p class="m" style="margin:0;font-size:12px;line-height:17px;letter-spacing:0.8px;text-transform:uppercase;color:${v.muted};">We said</p>
                      <p class="m"${A('oldDate')} style="margin:4px 0 0;font-family:${H};font-size:20px;line-height:28px;font-weight:700;color:${v.muted};text-decoration:line-through;">${rich(f.oldDate)}</p>
                    </td>
                    <td class="stack arrow" width="12%" align="center" valign="middle" style="padding:0;font-family:${B};font-size:24px;line-height:28px;color:${v.brand};">&rarr;</td>
                    <td class="stack stack-end" width="44%" valign="top" style="padding:18px 20px;font-family:${B};">
                      <p style="margin:0;font-size:12px;line-height:17px;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:${v.brand};">New estimate</p>
                      <p class="t"${A('newDate')} style="margin:4px 0 0;font-family:${H};font-size:24px;line-height:30px;font-weight:800;color:${v.text};">${rich(f.newDate)}</p>
                    </td>
                  </tr></table>`;
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 6px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  ${f.orderNumber ? `<p class="m" style="margin:0 0 8px;font-size:13px;line-height:18px;color:${v.muted};">Order <span class="t"${A('orderNumber')} style="font-weight:700;color:${v.text};">${rich(f.orderNumber)}</span></p>` : ''}
                  ${dates}
                  ${f.delayReason ? `<p class="m"${A('delayReason')} style="margin:16px 0 0;font-size:15px;line-height:24px;color:${v.muted};">${escBr(f.delayReason)}</p>` : ''}
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:26px 48px 0;font-family:${B};">
                  ${f.optionsTitle ? `<p class="t"${A('optionsTitle')} style="margin:0 0 12px;font-family:${H};font-size:18px;line-height:24px;font-weight:800;color:${v.text};">${rich(f.optionsTitle)}</p>` : ''}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map((o, i) => `<tr><td style="padding:0 0 10px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="line" style="border-collapse:separate;border:1px solid #eadfd4;border-radius:12px;"><tr>
                        <td width="44" valign="top" style="padding:16px 0 16px 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="28" height="28" style="width:28px;height:28px;border-radius:14px;background:${i === 0 ? v.brand : '#f1e6db'};color:${i === 0 ? v.btnText : v.brand};font-family:${B};font-size:14px;line-height:28px;font-weight:800;mso-line-height-rule:exactly;">${i + 1}</td></tr></table></td>
                        <td valign="top" style="padding:16px 16px 16px 12px;font-family:${B};">
                          <p class="t"${A(`opt${o.n}Title`)} style="margin:0;font-size:16px;line-height:22px;font-weight:800;color:${v.text};">${rich(o.title)}</p>
                          ${o.text ? `<p class="m"${A(`opt${o.n}Text`)} style="margin:3px 0 0;font-size:14px;line-height:21px;color:${v.muted};">${rich(o.text)}</p>` : ''}
                          ${String(o.link || '').trim() ? `<p style="margin:8px 0 0;font-size:14px;line-height:20px;"><a${A(`opt${o.n}Link`)} href="${safeUrl(o.url)}" target="_blank" style="color:${v.brand};font-weight:800;text-decoration:none;">${rich(o.link)} &rarr;</a></p>` : ''}
                        </td>
                      </tr></table>
                    </td></tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              ${on.showCode && f.code ? `<tr>
                <td class="px" align="center" style="padding:16px 48px 0;font-family:${B};text-align:center;">
                  ${f.codeText ? `<p class="m"${A('codeText')} style="margin:0 0 10px;font-size:15px;line-height:22px;color:${v.muted};">${rich(f.codeText)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t"${A('code')} style="padding:12px 26px;border:2px dashed ${v.brand};border-radius:10px;font-family:'Courier New',Courier,monospace;font-size:24px;line-height:30px;font-weight:700;letter-spacing:3px;color:${v.text};">${rich(f.code)}</td></tr></table>
                  ${f.codeNote ? `<p class="m"${A('codeNote')} style="margin:8px 0 0;font-size:12px;line-height:18px;color:${v.muted};">${rich(f.codeNote)}</p>` : ''}
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:26px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:20px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card, extraCss: '    .arrow{display:none !important;}' });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    if (f.orderNumber) out.push(`Order: ${f.orderNumber}`);
    out.push(`Original estimate: ${f.oldDate}`, `New estimate: ${f.newDate}`, '');
    if (f.delayReason) out.push(wrapText(stripRich(f.delayReason)), '');
    const list = options(f);
    if (list.length) {
      out.push(`${f.optionsTitle || 'Your options'}:`);
      list.forEach((o, i) => {
        out.push(`${i + 1}. ${o.title}${o.text ? ` - ${o.text}` : ''}`);
        if (String(o.link || '').trim()) out.push(`   ${o.link}: ${safeUrl(o.url)}`);
      });
      out.push('');
    }
    if (on.showCode && f.code) out.push(`${f.codeText || ''} ${f.code}`.trim(), f.codeNote || '', '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
