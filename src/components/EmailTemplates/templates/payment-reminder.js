import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'payment-reminder',
  name: 'Payment Reminder Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['payment-reminder', 'invoice', 'overdue', 'freelancer', 'billing', 'accounts-receivable', 'transactional'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Payment Reminder Email Template — Free Invoice Reminder HTML',
  seoDescription: 'Free payment reminder email template for invoices: amount due, due date, invoice number, a Pay now button and bank details. Polite, Outlook-safe HTML to copy.',
  description: 'A polite invoice payment reminder for freelancers, agencies and SaaS billing: a status pill (due soon or overdue), the amount due in large type, invoice number, issue and due dates, a "Pay invoice" button, a link to the PDF, optional bank-transfer details and an "already paid?" note.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'invoice', label: 'Invoice details' },
    { id: 'bank', label: 'Bank transfer details', toggle: 'showBank' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Reminder: invoice INV-1042 is due on October 23', 'A friendly reminder that $1,850.00 is due in 3 days. Pay online in a minute.', 'Acme Studio Billing'),
    ...brandFields(),
    { key: 'status', group: 'main', label: 'Status pill', type: 'text', value: 'Due in 3 days', hint: 'For a late invoice, try "Overdue by 7 days".' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Friendly reminder: your invoice is due soon' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, this is a quick reminder that invoice INV-1042 for the website redesign project is due on Friday, October 23. You can pay online by card or bank transfer.' },
    { key: 'amount', group: 'invoice', label: 'Amount due', type: 'text', value: '$1,850.00' },
    { key: 'invoiceNo', group: 'invoice', label: 'Invoice number', type: 'text', value: 'INV-1042' },
    { key: 'issued', group: 'invoice', label: 'Issued', type: 'text', value: 'October 9, 2026' },
    { key: 'due', group: 'invoice', label: 'Due date', type: 'text', value: 'October 23, 2026' },
    { key: 'project', group: 'invoice', label: 'For (optional)', type: 'text', value: 'Website redesign, phase 2' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Pay invoice' },
    { key: 'ctaUrl', group: 'main', label: 'Payment link', type: 'url', value: 'https://webdevpuneet.com/pay/INV-1042' },
    { key: 'pdfText', group: 'main', label: 'PDF link text (optional)', type: 'text', value: 'Download the invoice (PDF)' },
    { key: 'pdfUrl', group: 'main', label: 'PDF link', type: 'url', value: 'https://webdevpuneet.com/invoices/INV-1042.pdf' },
    { key: 'bank', group: 'bank', label: 'Bank details', type: 'textarea', value: 'Account name: Acme Studio LLC\nBank: First National Bank\nAccount: 0123 4567 89 · Routing: 021000021\nReference: INV-1042' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Already paid? Thank you, please ignore this email; payments can take a day or two to show. If anything about the invoice looks wrong, just reply and I\'ll sort it out.' },
    { key: 'signName', group: 'main', label: 'Signed by', type: 'text', value: 'Priya Raman, Acme Studio' },
    ...footerFields({ reason: 'You’re receiving this because you have an open invoice with Acme Studio.' }),
  ],
  toggles: [{ key: 'showBank', label: 'Bank transfer details', value: true }],
  vars: DEFAULT_VARS('#4338ca'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${f.status ? `<p style="margin:0 0 14px;"><span${A('status')} style="display:inline-block;padding:5px 12px;border-radius:99px;background:#fef3c7;color:#92400e;font-family:${H};font-size:12px;line-height:16px;font-weight:700;letter-spacing:.3px;">&#9200; ${rich(f.status)}</span></p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;">
                    <tr><td align="center" style="padding:22px 20px 6px;font-family:${B};text-align:center;">
                      <p class="m" style="margin:0 0 4px;font-size:13px;line-height:18px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:${v.muted};">Amount due</p>
                      <p class="t"${A('amount')} style="margin:0;font-family:${H};font-size:38px;line-height:44px;font-weight:800;letter-spacing:-.8px;color:${v.text};">${rich(f.amount)}</p>
                    </td></tr>
                    <tr><td style="padding:0 20px 8px;">
                      ${detailsBoxHtml({ ...c, v: { ...v } }, [['Invoice', f.invoiceNo, 'invoiceNo'], ['For', f.project, 'project'], ['Issued', f.issued, 'issued'], ['Due date', f.due, 'due']]).replace('class="soft" style="background:#f8fafc;', 'style="background:transparent;')}
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px' })}
                  ${f.pdfText ? `<p style="margin:0 0 24px;font-size:14px;line-height:20px;"><a${A('pdfText')} href="${safeUrl(f.pdfUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.pdfText)}</a></p>` : ''}
                </td>
              </tr>
              ${on.showBank && f.bank ? `<tr>
                <td class="px" style="padding:0 48px 24px;font-family:${B};">
                  <p class="t" style="margin:0 0 8px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Prefer bank transfer?</p>
                  <p class="m"${A('bank')} style="margin:0;font-family:'Courier New',Courier,monospace;font-size:13px;line-height:21px;color:${v.muted};">${escBr(f.bank)}</p>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0 0 12px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                    ${f.signName ? `<p class="t"${A('signName')} style="margin:0;font-size:14px;line-height:22px;font-weight:700;color:${v.text};">${rich(f.signName)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.status ? `[${f.status}]` : '', f.headline, '', wrapText(f.intro), '', `Amount due: ${f.amount}`];
    for (const [l, x] of [['Invoice', f.invoiceNo], ['For', f.project], ['Issued', f.issued], ['Due date', f.due]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.pdfText) out.push(`${f.pdfText}: ${safeUrl(f.pdfUrl)}`);
    out.push('');
    if (on.showBank && f.bank) out.push('Prefer bank transfer?', f.bank, '');
    if (f.note) out.push(wrapText(f.note), '');
    if (f.signName) out.push(f.signName, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
