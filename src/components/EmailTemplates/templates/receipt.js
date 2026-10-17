import { esc, escBr, safeUrl, buttonHtml, wrapText } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, textFooter, cleanText } from './shell.js';

const LINES = [1, 2, 3];
const lineFields = (n, desc, amount) => [
  { key: `line${n}Desc`, group: 'lines', label: `Line ${n} description`, type: 'text', value: desc },
  { key: `line${n}Amount`, group: 'lines', label: `Line ${n} amount`, type: 'text', value: amount },
];
const lines = f => LINES.map(n => ({ n, desc: f[`line${n}Desc`], amount: f[`line${n}Amount`] })).filter(l => String(l.desc || '').trim());

export default {
  id: 'receipt',
  name: 'Payment Receipt Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['receipt', 'invoice', 'billing', 'subscription', 'saas'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Receipt Email Template — Free HTML Invoice & Payment Email',
  seoDescription: 'Free receipt and invoice email template for SaaS: amount paid, invoice number, line items, card used, billing details and a Download invoice button. Copy HTML.',
  description: 'A payment receipt for subscriptions and one-off charges: a large amount-paid header, date and invoice number, the card used, itemised lines with tax and total, billing details, a "Download invoice" button and a billing-support line.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Amount & summary' },
    { id: 'lines', label: 'Line items (leave a description empty to hide it)' },
    { id: 'billing', label: 'Billed to', toggle: 'showBilling' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your Acme receipt [#INV-2026-0418]', 'Payment received, thank you. Your receipt and invoice are inside.'),
    ...brandFields(),
    { key: 'label', group: 'main', label: 'Label', type: 'text', value: 'Receipt from Acme' },
    { key: 'amount', group: 'main', label: 'Amount paid', type: 'text', value: '$58.00' },
    { key: 'paidOn', group: 'main', label: 'Paid on', type: 'text', value: 'October 17, 2026' },
    { key: 'invoiceNo', group: 'main', label: 'Invoice number', type: 'text', value: 'INV-2026-0418' },
    { key: 'card', group: 'main', label: 'Payment method', type: 'text', value: 'Visa •••• 4242' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Download invoice (PDF)' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/billing/invoices/INV-2026-0418.pdf' },
    ...lineFields(1, 'Acme Pro plan · monthly (Oct 17 – Nov 16, 2026)', '$49.00'),
    ...lineFields(2, 'Extra seats × 1', '$5.00'),
    ...lineFields(3, '', ''),
    { key: 'tax', group: 'lines', label: 'Tax line', type: 'text', value: '$4.00' },
    { key: 'total', group: 'lines', label: 'Total', type: 'text', value: '$58.00' },
    { key: 'billName', group: 'billing', label: 'Name / company', type: 'text', value: 'Jordan Lee · Northwind LLC' },
    { key: 'billEmail', group: 'billing', label: 'Billing email', type: 'text', value: 'billing@northwind.example' },
    { key: 'billAddress', group: 'billing', label: 'Billing address', type: 'textarea', value: '1200 Pine Street, Seattle, WA 98101, USA' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Your next payment of $58.00 is scheduled for November 17, 2026. Manage your plan or update your card anytime in Billing settings.' },
    { key: 'supportLine', group: 'main', label: 'Support line', type: 'text', value: 'Questions about this charge? Reply to this email or contact billing@acme.example.' },
    ...footerFields({ reason: 'You’re receiving this receipt because a payment was made on your Acme account.' }),
  ],
  toggles: [{ key: 'showBilling', label: 'Billed to', value: true }],
  vars: DEFAULT_VARS('#4f46e5'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const ls = lines(f);
    const meta = [['Paid on', f.paidOn, 'paidOn'], ['Invoice', f.invoiceNo, 'invoiceNo'], ['Payment method', f.card, 'card']].filter(([, x]) => String(x || '').trim());
    const card = `
              <tr>
                <td class="px" align="center" style="padding:40px 48px 28px;font-family:${B};text-align:center;">
                  ${f.label ? `<p class="m"${A('label')} style="margin:0 0 8px;font-size:14px;line-height:20px;color:${v.muted};">${esc(f.label)}</p>` : ''}
                  <p class="t"${A('amount')} style="margin:0 0 4px;font-family:${H};font-size:44px;line-height:52px;font-weight:800;letter-spacing:-1px;color:${v.text};">${esc(f.amount)}</p>
                  <p style="margin:0;"><span style="display:inline-block;padding:4px 12px;border-radius:99px;background:#dcfce7;color:#15803d;font-family:${H};font-size:12px;line-height:18px;font-weight:700;">&#10003; Paid</span></p>
                </td>
              </tr>
              ${meta.length ? `<tr>
                <td class="px" style="padding:0 48px 8px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;">
                    <tr>
                      ${meta.map(([l, x, k]) => `<td class="stack stack-pad" valign="top" style="padding:16px 18px;font-family:${B};font-size:12px;line-height:18px;">
                        <span class="m" style="color:${v.muted};text-transform:uppercase;letter-spacing:1px;font-weight:700;">${l}</span><br>
                        <span class="t"${A(k)} style="font-size:14px;line-height:22px;font-weight:600;color:${v.text};">${esc(x)}</span>
                      </td>`).join('\n                      ')}
                    </tr>
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:20px 48px 0;">
                  <p class="t" style="margin:0 0 4px;font-family:${H};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Summary</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${ls.map(l => `<tr>
                      <td class="line m"${A(`line${l.n}Desc`)} style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:14px;line-height:21px;color:${v.muted};">${esc(l.desc)}</td>
                      <td class="line t" align="right" valign="top"${A(`line${l.n}Amount`)} style="padding:12px 0 12px 12px;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:14px;line-height:21px;font-weight:600;color:${v.text};white-space:nowrap;">${esc(l.amount)}</td>
                    </tr>`).join('\n                    ')}
                    ${f.tax ? `<tr>
                      <td class="line m" style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:14px;line-height:21px;color:${v.muted};">Tax</td>
                      <td class="line t" align="right"${A('tax')} style="padding:12px 0 12px 12px;border-bottom:1px solid #e2e8f0;font-family:${B};font-size:14px;line-height:21px;font-weight:600;color:${v.text};">${esc(f.tax)}</td>
                    </tr>` : ''}
                    ${f.total ? `<tr>
                      <td class="t" style="padding:14px 0 0;font-family:${H};font-size:17px;line-height:22px;font-weight:800;color:${v.text};">Amount paid</td>
                      <td class="t" align="right"${A('total')} style="padding:14px 0 0 12px;font-family:${H};font-size:17px;line-height:22px;font-weight:800;color:${v.text};">${esc(f.total)}</td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
              ${on.showBilling ? `<tr>
                <td class="px" style="padding:28px 48px 0;font-family:${B};font-size:14px;line-height:22px;">
                  <p class="t" style="margin:0 0 6px;font-family:${H};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Billed to</p>
                  <p class="m" style="margin:0;color:${v.muted};"><span class="t"${A('billName')} style="color:${v.text};font-weight:600;">${esc(f.billName)}</span><br><span${A('billEmail')}>${esc(f.billEmail)}</span><br><span${A('billAddress')}>${escBr(f.billAddress)}</span></p>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:30px 48px 40px;font-family:${B};">
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 24px;">${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H, width: 260, attrs: A('ctaText') })}</td></tr></table>` : ''}
                  ${f.note ? `<p class="m"${A('note')} style="margin:0 0 12px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                  ${f.supportLine ? `<p class="m"${A('supportLine')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${esc(f.supportLine)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.label, `${f.amount} — Paid`, ''];
    for (const [l, x] of [['Paid on', f.paidOn], ['Invoice', f.invoiceNo], ['Payment method', f.card]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', 'Summary');
    for (const l of lines(f)) out.push(`${l.desc}  ${l.amount}`);
    if (f.tax) out.push(`Tax  ${f.tax}`);
    if (f.total) out.push(`Amount paid  ${f.total}`);
    out.push('');
    if (on.showBilling) out.push('Billed to:', f.billName, f.billEmail, f.billAddress, '');
    if (f.ctaText) out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) out.push(wrapText(f.note), '');
    if (f.supportLine) out.push(wrapText(f.supportLine), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
