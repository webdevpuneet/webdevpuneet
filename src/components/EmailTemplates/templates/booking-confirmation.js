import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow } from './shell.js';

const BRING = [1, 2, 3];
const bring = f => BRING.map(n => [f[`bring${n}`], `bring${n}`]).filter(([x]) => String(x || '').trim());
// Add-to-calendar links shown as a row of small outlined buttons (only the ones with a link)
const CALS = [['calGoogle', 'Google'], ['calOutlook', 'Outlook'], ['calIcs', 'Apple']];

export default {
  id: 'booking-confirmation',
  name: 'Booking Confirmation Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['booking-confirmation', 'reservation', 'appointment', 'add-to-calendar', 'spa', 'class', 'restaurant', 'transactional', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Booking Confirmation Email Template — Free Reservation HTML',
  seoDescription: 'Free booking confirmation email template with a date tile, booking reference, deposit paid, Google / Outlook / .ics calendar links and a what-to-bring list.',
  description: 'A booking confirmation sent the moment someone books: a calendar-style date tile beside the service, time, guests and location, the booking reference and deposit paid, add-to-calendar links for Google, Outlook and Apple (.ics), a "Manage booking" button, a what-to-bring list and the free-cancellation deadline.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'booking', label: 'Booking details' },
    { id: 'calendar', label: 'Add to calendar', toggle: 'showCalendar' },
    { id: 'bring', label: 'What to bring', toggle: 'showBring' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('You’re booked: Deep Tissue Massage, Sat Nov 14 at 2:30 PM', 'Booking ref KS-40218. Add it to your calendar, see what to bring, or change it up to 24 hours before.', 'Kinso Spa'),
    ...brandFields().map(x => (x.key === 'brandName' ? { ...x, value: 'Kinso Spa' } : x)),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Booking confirmed' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'You’re all set, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Thanks for booking with us. Your time is reserved and your therapist knows you’re coming. Everything you need is below.' },
    { key: 'month', group: 'booking', label: 'Date tile: month', type: 'text', value: 'NOV' },
    { key: 'day', group: 'booking', label: 'Date tile: day', type: 'text', value: '14' },
    { key: 'weekday', group: 'booking', label: 'Date tile: weekday', type: 'text', value: 'Saturday' },
    { key: 'service', group: 'booking', label: 'Service', type: 'text', value: 'Deep Tissue Massage · 60 min' },
    { key: 'time', group: 'booking', label: 'Time', type: 'text', value: '2:30 PM – 3:30 PM' },
    { key: 'withWho', group: 'booking', label: 'With / party size', type: 'text', value: 'With Hana · 1 guest' },
    { key: 'location', group: 'booking', label: 'Location', type: 'textarea', value: 'Kinso Spa, 81 Harbour Road\nVancouver, BC V6C 1A1' },
    { key: 'mapUrl', group: 'booking', label: 'Directions link (optional)', type: 'url', value: 'https://maps.google.com/?q=81+Harbour+Road+Vancouver' },
    { key: 'reference', group: 'booking', label: 'Booking reference', type: 'text', value: 'KS-40218' },
    { key: 'paid', group: 'booking', label: 'Paid / deposit (optional)', type: 'text', value: '$40.00 deposit paid · $75.00 due at the spa' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Manage booking' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/bookings/KS-40218' },
    { key: 'calTitle', group: 'calendar', label: 'Label', type: 'text', value: 'Add to your calendar' },
    { key: 'calGoogle', group: 'calendar', label: 'Google Calendar link', type: 'url', value: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Deep+Tissue+Massage&dates=20261114T223000Z/20261114T233000Z', hint: 'A Google Calendar "TEMPLATE" link. Leave any of the three empty to hide that button.' },
    { key: 'calOutlook', group: 'calendar', label: 'Outlook link', type: 'url', value: 'https://outlook.live.com/calendar/0/deeplink/compose?subject=Deep+Tissue+Massage&startdt=2026-11-14T14:30:00&enddt=2026-11-14T15:30:00' },
    { key: 'calIcs', group: 'calendar', label: 'Apple Calendar (.ics file) link', type: 'url', value: 'https://webdevpuneet.com/bookings/KS-40218.ics', hint: 'A hosted .ics file opens in Apple Calendar and most desktop calendars.' },
    { key: 'bringTitle', group: 'bring', label: 'Section title', type: 'text', value: 'Before you arrive' },
    { key: 'bring1', group: 'bring', label: 'Item 1', type: 'text', value: 'Arrive 10 minutes early to enjoy the tea lounge' },
    { key: 'bring2', group: 'bring', label: 'Item 2', type: 'text', value: 'Robes, slippers and towels are provided' },
    { key: 'bring3', group: 'bring', label: 'Item 3', type: 'text', value: 'Tell us about injuries or allergies when you check in' },
    { key: 'policy', group: 'main', label: 'Cancellation note', type: 'textarea', value: '<b>Free cancellation until Fri, Nov 13 at 2:30 PM.</b> After that the deposit is kept. Need to talk to someone? Call (604) 555-0187.' },
    ...footerFields({ reason: 'You’re receiving this because you made a booking with Kinso Spa.' }).map(x => (x.key === 'address' ? { ...x, value: 'Kinso Spa Ltd., 81 Harbour Road, Vancouver, BC V6C 1A1, Canada' } : x)),
  ],
  toggles: [
    { key: 'showCalendar', label: 'Add to calendar', value: true },
    { key: 'showBring', label: 'What to bring', value: true },
  ],
  vars: DEFAULT_VARS('#0f766e').map(x => (x.key === 'bg' ? { ...x, value: '#eef4f2' } : x)),
  fonts: { heading: 'playfair', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const items = bring(f);
    const cals = CALS.filter(([k]) => String(f[k] || '').trim());
    const line = (key, val, strong) => (String(val || '').trim()
      ? `<p class="${strong ? 't' : 'm'}"${A(key)} style="margin:0 0 4px;font-family:${strong ? H : B};font-size:${strong ? 19 : 15}px;line-height:${strong ? 26 : 22}px;font-weight:${strong ? 700 : 400};color:${strong ? v.text : v.muted};">${escBr(val)}</p>`
      : '');
    const ticket = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft tk" style="border-collapse:separate;background:#f4f8f7;border-radius:14px;border:1px solid #dbe7e4;">
                    <tr>
                      <td class="stack stack-pad dt" width="112" valign="top" align="left" style="padding:22px 0 22px 22px;">
                        <table role="presentation" width="96" cellpadding="0" cellspacing="0" border="0" style="width:96px;border-radius:12px;background:${v.card};" class="card">
                          <tr><td align="center"${A('month')} style="padding:7px 0;border-radius:12px 12px 0 0;background:${v.brand};color:${v.btnText};font-family:${B};font-size:13px;line-height:16px;font-weight:800;letter-spacing:2px;">${rich(f.month)}</td></tr>
                          <tr><td align="center" class="t"${A('day')} style="padding:8px 0 0;font-family:${H};font-size:40px;line-height:42px;font-weight:700;color:${v.text};">${rich(f.day)}</td></tr>
                          <tr><td align="center" class="m"${A('weekday')} style="padding:2px 0 10px;font-family:${B};font-size:12px;line-height:16px;color:${v.muted};">${rich(f.weekday)}</td></tr>
                        </table>
                      </td>
                      <td class="stack" valign="top" style="padding:22px 22px 22px 18px;font-family:${B};">
                        ${line('service', f.service, true)}
                        ${line('time', f.time)}
                        ${line('withWho', f.withWho)}
                        ${line('location', f.location)}
                        ${String(f.mapUrl || '').trim() ? `<p style="margin:6px 0 0;font-size:14px;line-height:20px;"><a${A('mapUrl')} href="${safeUrl(f.mapUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">&#8599; Get directions</a></p>` : ''}
                      </td>
                    </tr>
                    ${f.reference || f.paid ? `<tr>
                      <td colspan="2" class="line" style="padding:14px 22px;border-top:1px dashed #b7cdc8;font-family:${B};font-size:13px;line-height:20px;">
                        ${f.reference ? `<span class="m" style="color:${v.muted};">Booking ref</span> <span class="t"${A('reference')} style="font-family:'Courier New',Courier,monospace;font-size:15px;font-weight:700;letter-spacing:1px;color:${v.text};">${rich(f.reference)}</span>` : ''}${f.reference && f.paid ? '<br>' : ''}
                        ${f.paid ? `<span class="m"${A('paid')} style="color:${v.muted};">${rich(f.paid)}</span>` : ''}
                      </td>
                    </tr>` : ''}
                  </table>`;
    const calRow = on.showCalendar && cals.length ? `<tr>
                <td class="px" style="padding:0 48px 26px;font-family:${B};">
                  ${f.calTitle ? `<p class="t"${A('calTitle')} style="margin:0 0 10px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">${rich(f.calTitle)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${cals.map(([k, label], i) => `<td style="padding:0 ${i < cals.length - 1 ? 8 : 0}px 8px 0;"><a${A(k)} href="${safeUrl(f[k])}" target="_blank" style="display:inline-block;padding:9px 12px;border:1px solid ${v.brand};border-radius:8px;color:${v.brand};font-family:${B};font-size:14px;line-height:18px;font-weight:700;text-decoration:none;white-space:nowrap;">&#128197; ${label}</a></td>`).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : '';
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 6px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  ${ticket}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:22px 48px 4px;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 22px', width: 240 })}
                </td>
              </tr>
              ${calRow}
              ${on.showBring && items.length ? `<tr>
                <td class="px" style="padding:0 48px 18px;font-family:${B};">
                  ${f.bringTitle ? `<p class="t"${A('bringTitle')} style="margin:0 0 10px;font-family:${H};font-size:18px;line-height:24px;font-weight:700;color:${v.text};">${rich(f.bringTitle)}</p>` : ''}
                  ${items.map(([x, key]) => `<p class="m" style="margin:0 0 8px;font-size:15px;line-height:23px;color:${v.muted};"><span style="color:${v.brand};font-weight:800;">&#8226;</span>&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                  ')}
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:8px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:20px 0 0;">
                    ${f.policy ? `<p class="m"${A('policy')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.policy)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card, extraCss: '    .dt{padding:22px 22px 0 !important;}\n    .tk .stack{box-sizing:border-box !important;}' });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    const when = [f.weekday, `${f.month} ${f.day}`.trim()].filter(x => String(x || '').trim()).join(', ');
    for (const [l, x] of [['Service', f.service], ['Date', when], ['Time', f.time], ['With', f.withWho], ['Where', f.location], ['Booking ref', f.reference], ['Payment', f.paid]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    if (String(f.mapUrl || '').trim()) out.push(`Directions: ${safeUrl(f.mapUrl)}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showCalendar) {
      const cals = CALS.filter(([k]) => String(f[k] || '').trim());
      if (cals.length) out.push(f.calTitle || 'Add to your calendar', ...cals.map(([k, l]) => `${l}: ${safeUrl(f[k])}`), '');
    }
    if (on.showBring) {
      const items = bring(f);
      if (items.length) out.push(f.bringTitle, ...items.map(([x]) => `- ${x}`), '');
    }
    if (f.policy) out.push(wrapText(stripRich(f.policy)), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
