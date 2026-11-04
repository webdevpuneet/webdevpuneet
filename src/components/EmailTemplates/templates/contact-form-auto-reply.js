import { escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

const HOURS = [1, 2, 3];
const LINKS = [1, 2, 3];
const hours = f => HOURS.map(n => [f[`hours${n}Days`], f[`hours${n}Time`], n]).filter(([d]) => String(d || '').trim());
const links = f => LINKS.map(n => [f[`link${n}Text`], f[`link${n}Url`], n]).filter(([t]) => String(t || '').trim());

export default {
  id: 'contact-form-auto-reply',
  name: 'Contact Form Auto-Reply Email',
  version: '1.0.0',
  category: 'transactional',
  tags: ['auto-reply', 'contact-form', 'enquiry-received', 'small-business', 'autoresponder', 'thank-you', 'transactional', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Contact Form Auto Reply Email Template — Free Autoresponder',
  seoDescription: 'Free contact form auto-reply email template: a reply-time promise, a copy of their message, a reference number, opening hours and links to read while they wait.',
  description: 'The automatic "we got your message" reply every small business website needs: a reply-time promise in a badge, a copy of what the visitor sent (name, topic and message) so they know it arrived intact, a reference number, opening hours, three links to answers they may need while they wait, and a phone line for anything urgent.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message' },
    { id: 'copy', label: 'Copy of their message', toggle: 'showCopy' },
    { id: 'hours', label: 'Opening hours', toggle: 'showHours' },
    { id: 'links', label: 'While you wait', toggle: 'showLinks' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('We’ve got your message (ref #2291)', 'Thanks for getting in touch with Oak & Ivy Interiors. We reply within one working day, here’s a copy of what you sent.', 'Oak & Ivy Interiors'),
    ...brandFields().map(x => (x.key === 'brandName' ? { ...x, value: 'Oak & Ivy Interiors' } : x)),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Message received' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Thanks for getting in touch, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your message has reached our studio and one of our designers will read it personally. You don’t need to send it again.' },
    { key: 'replyTime', group: 'main', label: 'Reply-time promise', type: 'text', value: 'We reply within 1 working day' },
    { key: 'reference', group: 'main', label: 'Reference number', type: 'text', value: '#2291' },
    { key: 'copyTitle', group: 'copy', label: 'Section title', type: 'text', value: 'What you sent us' },
    { key: 'copyTopic', group: 'copy', label: 'Topic', type: 'text', value: 'Kitchen redesign consultation' },
    { key: 'copyMessage', group: 'copy', label: 'Their message', type: 'textarea', value: 'Hi, we’re renovating a 1930s semi and would love help with the kitchen and dining room. Budget around £18k, hoping to start in February. Do you do home visits in Bristol?', hint: 'Use your form tool’s field variable here, e.g. {{ message }}.' },
    { key: 'copyFrom', group: 'copy', label: 'Sent by', type: 'text', value: '{{first_name}} {{last_name}} · {{email}}' },
    { key: 'hoursTitle', group: 'hours', label: 'Section title', type: 'text', value: 'Studio hours' },
    { key: 'hours1Days', group: 'hours', label: 'Row 1 days', type: 'text', value: 'Mon – Fri' },
    { key: 'hours1Time', group: 'hours', label: 'Row 1 hours', type: 'text', value: '9:00 – 17:30' },
    { key: 'hours2Days', group: 'hours', label: 'Row 2 days', type: 'text', value: 'Saturday (showroom)' },
    { key: 'hours2Time', group: 'hours', label: 'Row 2 hours', type: 'text', value: '10:00 – 14:00' },
    { key: 'hours3Days', group: 'hours', label: 'Row 3 days', type: 'text', value: 'Sunday' },
    { key: 'hours3Time', group: 'hours', label: 'Row 3 hours', type: 'text', value: 'Closed' },
    { key: 'linksTitle', group: 'links', label: 'Section title', type: 'text', value: 'While you wait' },
    { key: 'link1Text', group: 'links', label: 'Link 1 text', type: 'text', value: 'See recent kitchen projects' },
    { key: 'link1Url', group: 'links', label: 'Link 1', type: 'url', value: 'https://webdevpuneet.com/projects/kitchens' },
    { key: 'link2Text', group: 'links', label: 'Link 2 text', type: 'text', value: 'How our design fees work' },
    { key: 'link2Url', group: 'links', label: 'Link 2', type: 'url', value: 'https://webdevpuneet.com/fees' },
    { key: 'link3Text', group: 'links', label: 'Link 3 text', type: 'text', value: 'Areas we cover' },
    { key: 'link3Url', group: 'links', label: 'Link 3', type: 'url', value: 'https://webdevpuneet.com/areas' },
    { key: 'urgent', group: 'main', label: 'Urgent line', type: 'textarea', value: 'Something urgent, like a booked install? Call the studio on <a href="tel:+441175550123">0117 555 0123</a>.' },
    { key: 'signoff', group: 'main', label: 'Sign-off', type: 'text', value: 'Warmly, Ellie & the Oak & Ivy team' },
    ...footerFields({ reason: 'You’re receiving this automatic reply because you sent a message through the contact form at oakandivy.co.uk.' }).map(x => (x.key === 'address' ? { ...x, value: 'Oak & Ivy Interiors Ltd., 22 Gloucester Road, Bristol BS7 8AE, United Kingdom' } : x)),
  ],
  toggles: [
    { key: 'showCopy', label: 'Copy of their message', value: true },
    { key: 'showHours', label: 'Opening hours', value: true },
    { key: 'showLinks', label: 'While you wait', value: true },
  ],
  vars: DEFAULT_VARS('#4d7c0f').map(x => (x.key === 'bg' ? { ...x, value: '#f3f1ea' } : x)),
  fonts: { heading: 'georgia', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const hrs = hours(f), lnk = links(f);
    const title = (key, text) => (text ? `<p class="t"${A(key)} style="margin:0 0 10px;font-family:${H};font-size:18px;line-height:24px;font-weight:700;color:${v.text};">${rich(text)}</p>` : '');
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 6px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 20px;')}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${f.replyTime ? `<td style="padding:0 10px 8px 0;"><span${A('replyTime')} style="display:inline-block;padding:7px 14px;border-radius:99px;background:${v.brand};color:${v.btnText};font-family:${B};font-size:14px;line-height:18px;font-weight:700;">&#9201;&nbsp; ${rich(f.replyTime)}</span></td>` : ''}
                    ${f.reference ? `<td class="m" style="padding:0 0 8px;font-family:${B};font-size:14px;line-height:18px;color:${v.muted};">Reference <span class="t"${A('reference')} style="font-family:'Courier New',Courier,monospace;font-weight:700;color:${v.text};">${rich(f.reference)}</span></td>` : ''}
                  </tr></table>
                </td>
              </tr>
              ${on.showCopy && f.copyMessage ? `<tr>
                <td class="px" style="padding:22px 48px 0;font-family:${B};">
                  ${title('copyTitle', f.copyTitle)}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="border-collapse:separate;background:#f8f7f2;border-radius:12px;border-left:4px solid ${v.brand};"><tr><td style="padding:16px 20px;font-family:${B};">
                    ${f.copyTopic ? `<p class="t"${A('copyTopic')} style="margin:0 0 6px;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${rich(f.copyTopic)}</p>` : ''}
                    <p class="m"${A('copyMessage')} style="margin:0 0 10px;font-size:15px;line-height:24px;color:${v.muted};">${escBr(f.copyMessage)}</p>
                    ${f.copyFrom ? `<p class="m"${A('copyFrom')} style="margin:0;font-size:13px;line-height:19px;color:${v.muted};">&mdash; ${rich(f.copyFrom)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>` : ''}
              ${(on.showHours && hrs.length) || (on.showLinks && lnk.length) ? `<tr>
                <td class="px" style="padding:26px 48px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${on.showHours && hrs.length ? `<td class="stack stack-pad" width="50%" valign="top" style="padding:0 14px 0 0;font-family:${B};">
                      ${title('hoursTitle', f.hoursTitle)}
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${hrs.map(([d, t, n]) => `<tr><td class="m"${A(`hours${n}Days`)} style="padding:3px 8px 3px 0;font-family:${B};font-size:14px;line-height:21px;color:${v.muted};">${rich(d)}</td><td class="t"${A(`hours${n}Time`)} align="right" style="padding:3px 0;font-family:${B};font-size:14px;line-height:21px;font-weight:600;color:${v.text};white-space:nowrap;">${rich(t)}</td></tr>`).join('\n                        ')}
                      </table>
                    </td>` : ''}
                    ${on.showLinks && lnk.length ? `<td class="stack stack-end" width="50%" valign="top" style="padding:0 0 0 14px;font-family:${B};">
                      ${title('linksTitle', f.linksTitle)}
                      ${lnk.map(([t, u, n]) => `<p style="margin:0 0 8px;font-size:14px;line-height:21px;"><a${A(`link${n}Text`)} href="${safeUrl(u)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">${rich(t)} &rarr;</a></p>`).join('\n                      ')}
                    </td>` : ''}
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:24px 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:20px 0 0;">
                    ${f.urgent ? `<p class="m"${A('urgent')} style="margin:0 0 14px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.urgent)}</p>` : ''}
                    ${f.signoff ? `<p class="t"${A('signoff')} style="margin:0;font-family:${H};font-size:16px;line-height:24px;font-style:italic;color:${v.text};">${rich(f.signoff)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    if (f.replyTime) out.push(f.replyTime);
    if (f.reference) out.push(`Reference: ${f.reference}`);
    out.push('');
    if (on.showCopy && f.copyMessage) out.push(`${f.copyTitle || 'What you sent us'}:`, f.copyTopic || '', wrapText(f.copyMessage), f.copyFrom ? `- ${f.copyFrom}` : '', '');
    if (on.showHours) {
      const hrs = hours(f);
      if (hrs.length) out.push(`${f.hoursTitle || 'Hours'}:`, ...hrs.map(([d, t]) => `${d}: ${t}`), '');
    }
    if (on.showLinks) {
      const lnk = links(f);
      if (lnk.length) out.push(`${f.linksTitle || 'While you wait'}:`, ...lnk.map(([t, u]) => `${t}: ${safeUrl(u)}`), '');
    }
    if (f.urgent) out.push(wrapText(stripRich(f.urgent)), '');
    if (f.signoff) out.push(f.signoff, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
