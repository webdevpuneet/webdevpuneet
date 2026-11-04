import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'booking-rescheduled',
  name: 'Booking Rescheduled Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['booking-rescheduled', 'reschedule', 'appointment-change', 'booking', 'clinic', 'consultation', 'transactional', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Reschedule Email Template — Free Booking Change Notice HTML',
  seoDescription: 'Free booking rescheduled email template: old time struck through beside the new one, who made the change and why, a confirm button and a pick-another-time link.',
  description: 'A booking change notice that is impossible to misread: the old date and time struck through above the new one in a highlighted card, who moved it and why, what stays the same (service, provider, location), a "Keep the new time" button, a "Pick another time" link and an updated calendar link.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & buttons' },
    { id: 'change', label: 'Old and new time' },
    { id: 'same', label: 'What stays the same', toggle: 'showSame' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your consultation has moved to Tue, Nov 17 at 11:00 AM', 'Dr. Okafor had to change your appointment. Keep the new time or pick another in one click.', 'Brightside Physio'),
    ...brandFields().map(x => (x.key === 'brandName' ? { ...x, value: 'Brightside Physio' } : x)),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Booking updated' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Your appointment has a new time' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, we had to move your physiotherapy consultation. Sorry for the change. Here is the new time, and nothing else about your visit is different.' },
    { key: 'oldLabel', group: 'change', label: 'Old time label', type: 'text', value: 'Was' },
    { key: 'oldWhen', group: 'change', label: 'Old date and time', type: 'text', value: 'Mon, Nov 16 · 9:30 AM' },
    { key: 'newLabel', group: 'change', label: 'New time label', type: 'text', value: 'Now' },
    { key: 'newWhen', group: 'change', label: 'New date and time', type: 'text', value: 'Tue, Nov 17 · 11:00 AM' },
    { key: 'newLength', group: 'change', label: 'Length (optional)', type: 'text', value: '45 minutes' },
    { key: 'changedBy', group: 'change', label: 'Who changed it and why', type: 'textarea', value: 'Changed by Brightside Physio because Dr. Okafor is at a training course on Monday morning.' },
    { key: 'service', group: 'same', label: 'Service', type: 'text', value: 'Initial physiotherapy assessment' },
    { key: 'provider', group: 'same', label: 'With', type: 'text', value: 'Dr. Amara Okafor' },
    { key: 'location', group: 'same', label: 'Location', type: 'textarea', value: 'Brightside Physio, 14 Elm Row\nEdinburgh EH7 4AA' },
    { key: 'reference', group: 'same', label: 'Booking reference', type: 'text', value: 'BP-7731' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Keep the new time' },
    { key: 'ctaUrl', group: 'main', label: 'Confirm link', type: 'url', value: 'https://webdevpuneet.com/bookings/BP-7731/confirm' },
    { key: 'altText', group: 'main', label: 'Second link text', type: 'text', value: 'Pick another time' },
    { key: 'altUrl', group: 'main', label: 'Second link', type: 'url', value: 'https://webdevpuneet.com/bookings/BP-7731/reschedule' },
    { key: 'calText', group: 'main', label: 'Calendar link text (optional)', type: 'text', value: 'Update my calendar' },
    { key: 'calUrl', group: 'main', label: 'Calendar link', type: 'url', value: 'https://webdevpuneet.com/bookings/BP-7731.ics', hint: 'An .ics file with the same event UID replaces the old entry in most calendars.' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'If neither time works, reply to this email or call us on 0131 555 0164 and we will find one that does. No fee applies to changes we make.' },
    ...footerFields({ reason: 'You’re receiving this because you have an appointment booked with Brightside Physio.' }).map(x => (x.key === 'address' ? { ...x, value: 'Brightside Physio Ltd., 14 Elm Row, Edinburgh EH7 4AA, United Kingdom' } : x)),
  ],
  toggles: [{ key: 'showSame', label: 'What stays the same', value: true }],
  vars: DEFAULT_VARS('#7c3aed').map(x => (x.key === 'bg' ? { ...x, value: '#f1eff8' } : x)),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const label = (key, text, color) => `<span${A(key)} style="display:inline-block;min-width:44px;padding:3px 10px;border-radius:99px;background:${color};color:#ffffff;font-family:${B};font-size:11px;line-height:16px;font-weight:800;letter-spacing:1px;text-transform:uppercase;text-align:center;">${rich(text)}</span>`;
    const swap = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${f.oldWhen ? `<tr>
                      <td class="soft" style="padding:14px 18px;border-radius:12px 12px 0 0;background:#f8fafc;font-family:${B};">
                        ${label('oldLabel', f.oldLabel || 'Was', '#94a3b8')}
                        <span class="m"${A('oldWhen')} style="margin-left:10px;font-size:16px;line-height:24px;color:${v.muted};text-decoration:line-through;">${rich(f.oldWhen)}</span>
                      </td>
                    </tr>` : ''}
                    <tr>
                      <td style="padding:18px;border-radius:${f.oldWhen ? '0 0 12px 12px' : '12px'};background:${v.brand};font-family:${B};">
                        ${label('newLabel', f.newLabel || 'Now', 'rgba(0,0,0,0.25)')}
                        <span${A('newWhen')} style="margin-left:10px;font-family:${H};font-size:21px;line-height:30px;font-weight:700;color:${v.btnText};">${rich(f.newWhen)}</span>
                        ${f.newLength ? `<br><span${A('newLength')} style="display:inline-block;margin:4px 0 0 64px;font-size:14px;line-height:20px;color:${v.btnText};opacity:0.85;">${rich(f.newLength)}</span>` : ''}
                      </td>
                    </tr>
                  </table>`;
    const links = [[f.altText, f.altUrl, 'altText'], [f.calText, f.calUrl, 'calText']].filter(([t, u]) => String(t || '').trim() && String(u || '').trim());
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 6px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  ${swap}
                  ${f.changedBy ? `<p class="m"${A('changedBy')} style="margin:14px 0 0;font-size:14px;line-height:21px;color:${v.muted};">&#9432;&nbsp; ${escBr(f.changedBy)}</p>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:24px 48px 6px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px', width: 240 })}
                  ${links.length ? `<p style="margin:0 0 22px;font-size:14px;line-height:22px;">${links.map(([t, u, key]) => `<a${A(key)} href="${safeUrl(u)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(t)}</a>`).join(' <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> ')}</p>` : ''}
                </td>
              </tr>
              ${on.showSame ? `<tr>
                <td class="px" style="padding:0 48px 22px;font-family:${B};">
                  <p class="t" style="margin:0 0 10px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Everything else stays the same</p>
                  ${detailsBoxHtml(c, [['Service', f.service, 'service'], ['With', f.provider, 'provider'], ['Where', String(f.location || '').replace(/\r?\n/g, '<br>'), 'location'], ['Reference', f.reference, 'reference']])}
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:4px 48px 40px;font-family:${B};">
                  ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    if (f.oldWhen) out.push(`${f.oldLabel || 'Was'}: ${f.oldWhen} (cancelled)`);
    out.push(`${f.newLabel || 'Now'}: ${f.newWhen}${f.newLength ? ` (${f.newLength})` : ''}`);
    if (f.changedBy) out.push('', wrapText(stripRich(f.changedBy)));
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.altText && f.altUrl) out.push(`${f.altText}: ${safeUrl(f.altUrl)}`);
    if (f.calText && f.calUrl) out.push(`${f.calText}: ${safeUrl(f.calUrl)}`);
    out.push('');
    if (on.showSame) {
      out.push('Everything else stays the same:');
      for (const [l, x] of [['Service', f.service], ['With', f.provider], ['Where', f.location], ['Reference', f.reference]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
      out.push('');
    }
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
