import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

const AGENDA = [1, 2, 3];
const SPEAKERS = [1, 2];
const agenda = f => AGENDA.map(n => [f[`agenda${n}`], `agenda${n}`]).filter(([x]) => String(x || '').trim());
const speakers = f => SPEAKERS.map(n => ({ n, name: f[`sp${n}Name`], role: f[`sp${n}Role`] })).filter(x => String(x.name || '').trim());
const initials = name => String(name || '').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

export default {
  id: 'webinar-invitation',
  name: 'Webinar Invitation Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['webinar', 'event-invitation', 'live-event', 'registration', 'saas', 'b2b', 'add-to-calendar'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Webinar Invitation Email Template — Free HTML Event Invite',
  seoDescription: 'Free webinar invitation email template: date, time and format box, a Save my seat button, Add to calendar link, agenda and speakers. Responsive, with dark mode.',
  description: 'A webinar and online event invitation: a "free live webinar" label, the session title and promise, a details box with date, time, length and platform, a "Save my seat" button, an "Add to calendar" link, a three-point agenda, two speakers with initials avatars and a recording note for people who can’t attend live.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Invitation & button' },
    { id: 'details', label: 'Event details' },
    { id: 'agenda', label: 'Agenda', toggle: 'showAgenda' },
    { id: 'speakers', label: 'Speakers', toggle: 'showSpeakers' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('You’re invited: How to cut your release cycle in half (live, Nov 12)', 'A free 45-minute live session with Q&A. Save your seat, and get the recording if you can’t make it.', 'Acme Events'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Free live webinar' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'How to cut your release cycle in half' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, join us for a practical, no-slides-of-fluff session on shipping faster. You’ll leave with a checklist your team can start using the next morning.' },
    { key: 'date', group: 'details', label: 'Date', type: 'text', value: 'Thursday, November 12, 2026' },
    { key: 'time', group: 'details', label: 'Time', type: 'text', value: '11:00 AM ET · 4:00 PM GMT' },
    { key: 'duration', group: 'details', label: 'Length', type: 'text', value: '45 minutes + live Q&A' },
    { key: 'where', group: 'details', label: 'Where', type: 'text', value: 'Online, on Zoom (link after you register)' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Save my seat' },
    { key: 'ctaUrl', group: 'main', label: 'Registration link', type: 'url', value: 'https://webdevpuneet.com/webinars/release-cycle' },
    { key: 'calText', group: 'details', label: 'Calendar link text (optional)', type: 'text', value: 'Add to Google Calendar' },
    { key: 'calUrl', group: 'details', label: 'Calendar link', type: 'url', value: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=How+to+cut+your+release+cycle+in+half&dates=20261112T160000Z/20261112T164500Z', hint: 'A Google Calendar "TEMPLATE" link or a hosted .ics file both work.' },
    { key: 'agendaTitle', group: 'agenda', label: 'Section title', type: 'text', value: 'What you’ll learn' },
    { key: 'agenda1', group: 'agenda', label: 'Point 1', type: 'text', value: 'The three bottlenecks that slow most release cycles' },
    { key: 'agenda2', group: 'agenda', label: 'Point 2', type: 'text', value: 'How small pull requests and feature flags work together' },
    { key: 'agenda3', group: 'agenda', label: 'Point 3', type: 'text', value: 'A live walkthrough of a 2-day release, start to finish' },
    { key: 'sp1Name', group: 'speakers', label: 'Speaker 1 name', type: 'text', value: 'Priya Raman' },
    { key: 'sp1Role', group: 'speakers', label: 'Speaker 1 role', type: 'text', value: 'VP Engineering, Acme' },
    { key: 'sp2Name', group: 'speakers', label: 'Speaker 2 name', type: 'text', value: 'Daniel Okafor' },
    { key: 'sp2Role', group: 'speakers', label: 'Speaker 2 role', type: 'text', value: 'Staff Engineer, Northwind' },
    { key: 'note', group: 'main', label: 'Recording note', type: 'textarea', value: 'Can’t make it live? Register anyway and we’ll email you the recording and the checklist the next day.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you subscribed to updates from Acme.' }),
  ],
  toggles: [
    { key: 'showAgenda', label: 'Agenda', value: true },
    { key: 'showSpeakers', label: 'Speakers', value: true },
  ],
  vars: DEFAULT_VARS('#0e7490'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const ag = agenda(f);
    const sp = speakers(f);
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  ${detailsBoxHtml(c, [['&#128197; Date', f.date, 'date'], ['&#128336; Time', f.time, 'time'], ['&#9201; Length', f.duration, 'duration'], ['&#128187; Where', f.where, 'where']])}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:22px 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px', width: 240 })}
                  ${f.calText ? `<p style="margin:0 0 26px;font-size:14px;line-height:20px;"><a${A('calText')} href="${safeUrl(f.calUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">+ ${rich(f.calText)}</a></p>` : ''}
                </td>
              </tr>
              ${on.showAgenda && ag.length ? `<tr>
                <td class="px" style="padding:0 48px 18px;font-family:${B};">
                  ${f.agendaTitle ? `<p class="t"${A('agendaTitle')} style="margin:0 0 12px;font-family:${H};font-size:18px;line-height:25px;font-weight:700;color:${v.text};">${rich(f.agendaTitle)}</p>` : ''}
                  ${ag.map(([x, key], i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td width="36" valign="top" style="width:36px;padding:0 12px 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="26" height="26" style="width:26px;height:26px;border-radius:13px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:13px;font-weight:700;line-height:26px;mso-line-height-rule:exactly;">${i + 1}</td></tr></table>
                    </td>
                    <td class="m"${A(key)} valign="top" style="padding:2px 0 12px;font-size:15px;line-height:23px;color:${v.muted};">${rich(x)}</td>
                  </tr></table>`).join('\n                  ')}
                </td>
              </tr>` : ''}
              ${on.showSpeakers && sp.length ? `<tr>
                <td class="px" style="padding:0 48px 22px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    <p class="t" style="margin:0 0 14px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.text};">Your hosts</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                      ${sp.map((x, i) => `<td class="stack${i < sp.length - 1 ? ' stack-pad' : ''}" width="${Math.floor(100 / sp.length)}%" valign="top" style="padding:0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                          <td width="48" valign="middle" style="width:48px;padding:0 12px 0 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="44" height="44" class="soft" style="width:44px;height:44px;border-radius:22px;background:#ecfeff;color:${v.brand};font-family:${H};font-size:16px;font-weight:800;line-height:44px;mso-line-height-rule:exactly;">${initials(x.name)}</td></tr></table>
                          </td>
                          <td valign="middle" style="font-family:${B};">
                            <span class="t"${A(`sp${x.n}Name`)} style="display:block;font-size:15px;line-height:21px;font-weight:700;color:${v.text};">${rich(x.name)}</span>
                            <span class="m"${A(`sp${x.n}Role`)} style="display:block;font-size:13px;line-height:19px;color:${v.muted};">${rich(x.role)}</span>
                          </td>
                        </tr></table>
                      </td>`).join('\n                      ')}
                    </tr></table>
                  </td></tr></table>
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
    const out = [f.brandName, '', f.eyebrow ? f.eyebrow.toUpperCase() : '', f.headline, '', wrapText(f.intro), ''];
    for (const [l, x] of [['Date', f.date], ['Time', f.time], ['Length', f.duration], ['Where', f.where]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.calText) out.push(`${f.calText}: ${safeUrl(f.calUrl)}`);
    out.push('');
    if (on.showAgenda) {
      const ag = agenda(f);
      if (ag.length) out.push(f.agendaTitle, ...ag.map(([x], i) => `${i + 1}. ${x}`), '');
    }
    if (on.showSpeakers) {
      const sp = speakers(f);
      if (sp.length) out.push('Your hosts:', ...sp.map(x => `- ${x.name}, ${x.role}`), '');
    }
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
