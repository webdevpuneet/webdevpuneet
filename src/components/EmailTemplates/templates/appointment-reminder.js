import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

const PREP = [1, 2, 3];
const prep = f => PREP.map(n => [f[`prep${n}`], `prep${n}`]).filter(([x]) => String(x || '').trim());

export default {
  id: 'appointment-reminder',
  name: 'Appointment Reminder Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['appointment-reminder', 'booking', 'confirmation', 'clinic', 'salon', 'consultation', 'no-show', 'transactional'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Appointment Reminder Email Template — Free Booking Reminder',
  seoDescription: 'Free appointment reminder email template: date, time, location and provider, Confirm / Reschedule / Cancel links, add-to-calendar and prep checklist. Copy HTML.',
  description: 'An appointment reminder that cuts no-shows for clinics, salons, consultants and service businesses: the service, provider, date, time, length and address in a details box, a "Confirm appointment" button with reschedule and cancel links, an add-to-calendar link, a short "before your visit" checklist and the cancellation policy.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & buttons' },
    { id: 'details', label: 'Appointment details' },
    { id: 'prep', label: 'Before your visit', toggle: 'showPrep' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Reminder: your appointment tomorrow at 10:30 AM', 'Thursday, October 22 with Dr. Lee at Acme Dental. Confirm, reschedule or add it to your calendar.', 'Acme Dental'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Appointment reminder' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'See you tomorrow, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'This is a friendly reminder of your upcoming appointment. Please confirm you can make it, or reschedule if your plans have changed.' },
    { key: 'service', group: 'details', label: 'Service', type: 'text', value: 'Dental check-up and cleaning' },
    { key: 'provider', group: 'details', label: 'With', type: 'text', value: 'Dr. Alex Lee' },
    { key: 'date', group: 'details', label: 'Date', type: 'text', value: 'Thursday, October 22, 2026' },
    { key: 'time', group: 'details', label: 'Time', type: 'text', value: '10:30 AM (45 minutes)' },
    { key: 'location', group: 'details', label: 'Location', type: 'textarea', value: 'Acme Dental, 220 Main Street, Suite 4\nAustin, TX 78701' },
    { key: 'mapText', group: 'details', label: 'Map link text (optional)', type: 'text', value: 'Get directions' },
    { key: 'mapUrl', group: 'details', label: 'Map link', type: 'url', value: 'https://maps.google.com/?q=220+Main+Street+Austin+TX' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Confirm appointment' },
    { key: 'ctaUrl', group: 'main', label: 'Confirm link', type: 'url', value: 'https://yoursite.com/appointments/8812/confirm' },
    { key: 'rescheduleUrl', group: 'main', label: 'Reschedule link', type: 'url', value: 'https://yoursite.com/appointments/8812/reschedule' },
    { key: 'cancelUrl', group: 'main', label: 'Cancel link', type: 'url', value: 'https://yoursite.com/appointments/8812/cancel' },
    { key: 'calUrl', group: 'main', label: 'Add-to-calendar link (optional)', type: 'url', value: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dental+check-up&dates=20261022T153000Z/20261022T161500Z', hint: 'A Google Calendar "TEMPLATE" link or a hosted .ics file both work.' },
    { key: 'prepTitle', group: 'prep', label: 'Section title', type: 'text', value: 'Before your visit' },
    { key: 'prep1', group: 'prep', label: 'Item 1', type: 'text', value: 'Arrive 10 minutes early to check in' },
    { key: 'prep2', group: 'prep', label: 'Item 2', type: 'text', value: 'Bring your insurance card and a photo ID' },
    { key: 'prep3', group: 'prep', label: 'Item 3', type: 'text', value: 'Let us know about any new medications' },
    { key: 'policy', group: 'main', label: 'Cancellation policy', type: 'textarea', value: 'Need to cancel? Please let us know at least 24 hours before your appointment so we can offer the time to another patient. Questions? Call us at (512) 555-0142.' },
    ...footerFields({ reason: 'You’re receiving this because you booked an appointment with Acme Dental.' }),
  ],
  toggles: [{ key: 'showPrep', label: 'Before your visit', value: true }],
  vars: DEFAULT_VARS('#0369a1'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const items = prep(f);
    const link = (key, label, url) => (String(url || '').trim() ? `<a${A(key)} href="${safeUrl(url)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${label}</a>` : '');
    const links = [link('rescheduleUrl', 'Reschedule', f.rescheduleUrl), link('cancelUrl', 'Cancel', f.cancelUrl), link('calUrl', 'Add to calendar', f.calUrl)].filter(Boolean);
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  ${detailsBoxHtml(c, [['&#128203; Service', f.service, 'service'], ['&#129489; With', f.provider, 'provider'], ['&#128197; Date', f.date, 'date'], ['&#128336; Time', f.time, 'time'], ['&#128205; Where', String(f.location || '').replace(/\r?\n/g, '<br>'), 'location']])}
                  ${f.mapText ? `<p style="margin:10px 0 0;font-size:14px;line-height:20px;"><a${A('mapText')} href="${safeUrl(f.mapUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">&#8599; ${rich(f.mapText)}</a></p>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:22px 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px', width: 260 })}
                  ${links.length ? `<p style="margin:0 0 26px;font-size:14px;line-height:22px;">${links.join(' <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> ')}</p>` : ''}
                </td>
              </tr>
              ${on.showPrep && items.length ? `<tr>
                <td class="px" style="padding:0 48px 20px;font-family:${B};">
                  ${f.prepTitle ? `<p class="t"${A('prepTitle')} style="margin:0 0 10px;font-family:${H};font-size:17px;line-height:24px;font-weight:700;color:${v.text};">${rich(f.prepTitle)}</p>` : ''}
                  ${items.map(([x, key]) => `<p class="m" style="margin:0 0 8px;font-size:15px;line-height:23px;color:${v.muted};"><span style="color:${v.brand};font-weight:800;">&#10003;</span>&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                  ')}
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:4px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.policy ? `<p class="m"${A('policy')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.policy)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    for (const [l, x] of [['Service', f.service], ['With', f.provider], ['Date', f.date], ['Time', f.time], ['Where', f.location]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    if (f.mapText) out.push(`${f.mapText}: ${safeUrl(f.mapUrl)}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.rescheduleUrl) out.push(`Reschedule: ${safeUrl(f.rescheduleUrl)}`);
    if (f.cancelUrl) out.push(`Cancel: ${safeUrl(f.cancelUrl)}`);
    if (f.calUrl) out.push(`Add to calendar: ${safeUrl(f.calUrl)}`);
    out.push('');
    if (on.showPrep) {
      const items = prep(f);
      if (items.length) out.push(f.prepTitle, ...items.map(([x]) => `- ${x}`), '');
    }
    if (f.policy) out.push(wrapText(f.policy), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
