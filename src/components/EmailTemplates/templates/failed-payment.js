import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

const STEPS = [1, 2, 3];
const steps = f => STEPS.map(n => [f[`when${n}`], f[`what${n}`], n]).filter(([w, x]) => String(w || '').trim() || String(x || '').trim());

export default {
  id: 'failed-payment',
  name: 'Failed Payment Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['failed-payment', 'payment-declined', 'dunning', 'card-expired', 'subscription', 'billing', 'saas', 'transactional', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Failed Payment Email Template — Free Dunning Email HTML',
  seoDescription: 'Free failed payment email template for subscriptions: the amount and card declined, the reason, retry and pause dates on a timeline and an update-card button.',
  description: 'A calm dunning email for a declined subscription charge: a "Payment didn’t go through" status pill, the amount, plan and card that failed, the plain-English reason (expired card, insufficient funds), a three-point timeline of the automatic retry and the date the account would pause, an "Update payment method" button and a reassurance that nothing is lost yet.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'charge', label: 'Charge details' },
    { id: 'timeline', label: 'What happens next', toggle: 'showTimeline' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Action needed: your Acme payment didn’t go through', 'Your card ending 4242 was declined for $29.00. Update it before Nov 10 to keep your projects active.'),
    ...brandFields(),
    { key: 'status', group: 'main', label: 'Status pill', type: 'text', value: 'Payment failed' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'We couldn’t charge your card' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, your monthly payment for Acme was declined. It happens, usually because a card has expired or been replaced. Nothing has changed on your account yet.' },
    { key: 'amount', group: 'charge', label: 'Amount', type: 'text', value: '$29.00' },
    { key: 'plan', group: 'charge', label: 'Plan', type: 'text', value: 'Pro plan · monthly' },
    { key: 'card', group: 'charge', label: 'Payment method', type: 'text', value: 'Visa ending in 4242' },
    { key: 'declineReason', group: 'charge', label: 'Reason', type: 'text', value: 'The card has expired (10/26)' },
    { key: 'attempted', group: 'charge', label: 'Attempted on', type: 'text', value: 'November 3, 2026' },
    { key: 'invoice', group: 'charge', label: 'Invoice (optional)', type: 'text', value: 'INV-2026-1103' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Update payment method' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/billing/payment-method' },
    { key: 'altText', group: 'main', label: 'Second link text (optional)', type: 'text', value: 'Pay this invoice now' },
    { key: 'altUrl', group: 'main', label: 'Second link', type: 'url', value: 'https://webdevpuneet.com/billing/invoices/INV-2026-1103' },
    { key: 'timelineTitle', group: 'timeline', label: 'Section title', type: 'text', value: 'What happens next' },
    { key: 'when1', group: 'timeline', label: 'Point 1 date', type: 'text', value: 'Nov 6' },
    { key: 'what1', group: 'timeline', label: 'Point 1', type: 'text', value: 'We’ll try the card again automatically.' },
    { key: 'when2', group: 'timeline', label: 'Point 2 date', type: 'text', value: 'Nov 9' },
    { key: 'what2', group: 'timeline', label: 'Point 2', type: 'text', value: 'Final retry and one last reminder from us.' },
    { key: 'when3', group: 'timeline', label: 'Point 3 date', type: 'text', value: 'Nov 10' },
    { key: 'what3', group: 'timeline', label: 'Point 3', type: 'text', value: 'Your account moves to read-only. All projects and files are kept.' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Already updated your card? Then you’re all set and can ignore this email. Questions about billing? Reply here and our billing team will help.' },
    ...footerFields({ reason: 'You’re receiving this because a payment for your Acme subscription failed.' }),
  ],
  toggles: [{ key: 'showTimeline', label: 'What happens next', value: true }],
  vars: DEFAULT_VARS('#4338ca'),
  fonts: { heading: 'system', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const tl = steps(f);
    const timeline = on.showTimeline && tl.length ? `<tr>
                <td class="px" style="padding:6px 48px 18px;font-family:${B};">
                  ${f.timelineTitle ? `<p class="t"${A('timelineTitle')} style="margin:0 0 12px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">${rich(f.timelineTitle)}</p>` : ''}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${tl.map(([when, what, n], i) => {
                      const last = i === tl.length - 1;
                      return `<tr>
                      <td width="18" valign="top" style="padding:4px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="12" height="12" style="width:12px;height:12px;border-radius:6px;background:${last ? '#dc2626' : v.brand};font-size:0;line-height:0;">&nbsp;</td></tr></table></td>
                      <td width="70" valign="top" class="t"${A(`when${n}`)} style="padding:0 10px ${last ? 0 : 14}px 8px;font-family:${B};font-size:14px;line-height:20px;font-weight:800;color:${last ? '#dc2626' : v.text};white-space:nowrap;">${rich(when)}</td>
                      <td valign="top" class="m"${A(`what${n}`)} style="padding:0 0 ${last ? 0 : 14}px;font-family:${B};font-size:14px;line-height:20px;color:${v.muted};">${rich(what)}</td>
                    </tr>`;
                    }).join('\n                    ')}
                  </table>
                </td>
              </tr>` : '';
    const card = `
              <tr>
                <td class="px" style="padding:40px 48px 6px;font-family:${B};">
                  ${f.status ? `<p${A('status')} style="margin:0 0 16px;"><span style="display:inline-block;padding:5px 12px;border-radius:99px;background:#fee2e2;color:#b91c1c;font-family:${B};font-size:12px;line-height:16px;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;">&#9888;&nbsp; ${rich(f.status)}</span></p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:1px solid #fecaca;border-radius:14px;" class="line">
                    <tr><td style="padding:18px 20px 4px;font-family:${B};">
                      <p class="m" style="margin:0;font-size:13px;line-height:18px;color:${v.muted};">Amount due</p>
                      <p class="t"${A('amount')} style="margin:2px 0 6px;font-family:${H};font-size:34px;line-height:40px;font-weight:800;letter-spacing:-0.8px;color:${v.text};">${rich(f.amount)}</p>
                    </td></tr>
                    <tr><td style="padding:0 8px 8px;">
                      ${detailsBoxHtml(c, [['Plan', f.plan, 'plan'], ['Card', f.card, 'card'], ['Reason', f.declineReason, 'declineReason'], ['Attempted', f.attempted, 'attempted'], ['Invoice', f.invoice, 'invoice']])}
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:24px 48px 6px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 12px', width: 260 })}
                  ${f.altText && f.altUrl ? `<p style="margin:0 0 22px;font-size:14px;line-height:21px;"><a${A('altText')} href="${safeUrl(f.altUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.altText)}</a></p>` : ''}
                </td>
              </tr>
              ${timeline}
              <tr>
                <td class="px" style="padding:4px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:20px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.status ? f.status.toUpperCase() : '', f.headline, '', wrapText(stripRich(f.intro)), ''];
    for (const [l, x] of [['Amount due', f.amount], ['Plan', f.plan], ['Card', f.card], ['Reason', f.declineReason], ['Attempted', f.attempted], ['Invoice', f.invoice]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.altText && f.altUrl) out.push(`${f.altText}: ${safeUrl(f.altUrl)}`);
    out.push('');
    if (on.showTimeline) {
      const tl = steps(f);
      if (tl.length) out.push(`${f.timelineTitle || 'What happens next'}:`, ...tl.map(([w, x]) => `- ${w}: ${x}`), '');
    }
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
