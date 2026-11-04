import { escBr, safeUrl, wrapText, rich, stripRich, buttonHtml } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText } from './shell.js';

const STEPS = [1, 2, 3, 4, 5];
const stepFields = (n, title, desc, time, url) => [
  { key: `step${n}Title`, group: 'steps', label: `Step ${n} title`, type: 'text', value: title },
  { key: `step${n}Desc`, group: 'steps', label: `Step ${n} description`, type: 'text', value: desc },
  { key: `step${n}Time`, group: 'steps', label: `Step ${n} time (optional)`, type: 'text', value: time },
  { key: `step${n}Url`, group: 'steps', label: `Step ${n} link`, type: 'url', value: url },
];
const steps = f => STEPS.map(n => ({ n, title: f[`step${n}Title`], desc: f[`step${n}Desc`], time: f[`step${n}Time`], url: f[`step${n}Url`] })).filter(x => String(x.title || '').trim());
const doneCount = (f, total) => Math.max(0, Math.min(total, parseInt(f.doneCount, 10) || 0));

export default {
  id: 'getting-started-checklist',
  name: 'Getting Started Checklist Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['onboarding-checklist', 'getting-started', 'activation', 'progress-bar', 'saas', 'onboarding', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Onboarding Checklist Email Template — Free Getting Started',
  seoDescription: 'Free onboarding checklist email template with a progress bar, done steps ticked off, the next step highlighted with its own button, time per step and a tip.',
  description: 'The onboarding email that sits between the welcome and the trial-ending reminder: a "2 of 5 done" progress bar, finished steps ticked and greyed out, the next step highlighted in a card with its own button, the remaining steps with how long each takes, and a short tip from a real person on the team.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message' },
    { id: 'progress', label: 'Progress' },
    { id: 'steps', label: 'Steps (leave a title empty to hide it)' },
    { id: 'tip', label: 'Tip from the team', toggle: 'showTip' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('You’re 2 steps in. Here’s the next one (3 minutes)', 'Connect your calendar and Acme starts booking meetings for you. Three steps left.'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Your setup checklist' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Nice start, {{first_name}}. Three steps to go.' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Teams who finish these five steps in their first week book twice as many meetings. The next one takes about three minutes.' },
    { key: 'doneCount', group: 'progress', label: 'Steps already done (number)', type: 'number', value: '2', hint: 'The first N steps show as done. Fill it from your app for each person.' },
    { key: 'progressLabel', group: 'progress', label: 'Progress label', type: 'text', value: 'Setup progress' },
    ...stepFields(1, 'Create your account', 'Done. Welcome aboard.', '', 'https://webdevpuneet.com/app'),
    ...stepFields(2, 'Set your working hours', 'So nobody books you at 7 AM.', '', 'https://webdevpuneet.com/app/settings/hours'),
    ...stepFields(3, 'Connect your calendar', 'Google or Outlook. Acme only reads free/busy times, never event details.', '3 min', 'https://webdevpuneet.com/app/connect/calendar'),
    ...stepFields(4, 'Share your booking link', 'Add it to your email signature or website.', '1 min', 'https://webdevpuneet.com/app/share'),
    ...stepFields(5, 'Invite a teammate', 'Round-robin bookings across your team.', '2 min', 'https://webdevpuneet.com/app/team'),
    { key: 'nextLabel', group: 'steps', label: 'Next step label', type: 'text', value: 'Up next' },
    { key: 'nextBtn', group: 'steps', label: 'Next step button text', type: 'text', value: 'Connect my calendar' },
    { key: 'tipName', group: 'tip', label: 'From (name and role)', type: 'text', value: 'Sam from Customer Success' },
    { key: 'tip', group: 'tip', label: 'Tip', type: 'textarea', value: 'Stuck on a step? Reply to this email and a real person (usually me) will answer within a few hours, or book a free 15-minute setup call.' },
    { key: 'tipLinkText', group: 'tip', label: 'Tip link text (optional)', type: 'text', value: 'Book a setup call' },
    { key: 'tipLinkUrl', group: 'tip', label: 'Tip link', type: 'url', value: 'https://webdevpuneet.com/setup-call' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you signed up for Acme and haven’t finished setting up.' }),
  ],
  toggles: [{ key: 'showTip', label: 'Tip from the team', value: true }],
  vars: DEFAULT_VARS('#ea580c').map(x => (x.key === 'bg' ? { ...x, value: '#f6f1ec' } : x)),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = steps(f);
    const done = doneCount(f, list.length);
    const pct = list.length ? Math.round((done / list.length) * 100) : 0;
    const next = list[done];
    const dot = (state, n) => {
      if (state === 'done') return `<td align="center" valign="middle" width="26" height="26" style="width:26px;height:26px;border-radius:13px;background:#16a34a;color:#ffffff;font-family:${B};font-size:14px;line-height:26px;font-weight:800;mso-line-height-rule:exactly;">&#10003;</td>`;
      return `<td align="center" valign="middle" width="26" height="26" class="line" style="width:22px;height:22px;border-radius:13px;border:2px solid ${state === 'next' ? v.brand : '#cbd5e1'};color:${state === 'next' ? v.brand : v.muted};font-family:${B};font-size:12px;line-height:22px;font-weight:800;mso-line-height-rule:exactly;">${n}</td>`;
    };
    const row = (st, i) => {
      const state = i < done ? 'done' : i === done ? 'next' : 'todo';
      const title = `<span${A(`step${st.n}Title`)}>${rich(st.title)}</span>`;
      if (state === 'next') {
        return `<tr><td style="padding:6px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:2px solid ${v.brand};border-radius:14px;"><tr><td style="padding:18px 20px;font-family:${B};">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>${dot('next', i + 1)}<td style="padding:0 0 0 12px;font-family:${B};font-size:11px;line-height:16px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:${v.brand};"${A('nextLabel')}>${rich(f.nextLabel || 'Up next')}${st.time ? ` &middot; <span${A(`step${st.n}Time`)}>${rich(st.time)}</span>` : ''}</td></tr></table>
                        <p class="t" style="margin:12px 0 4px;font-family:${H};font-size:19px;line-height:26px;font-weight:800;color:${v.text};">${title}</p>
                        ${st.desc ? `<p class="m"${A(`step${st.n}Desc`)} style="margin:0 0 16px;font-size:15px;line-height:23px;color:${v.muted};">${rich(st.desc)}</p>` : ''}
                        ${buttonHtml({ text: f.nextBtn || st.title, url: st.url, bg: v.brand, color: v.btnText, font: H, width: 220, height: 44, radius: 8, fontSize: 15, attrs: A('nextBtn') })}
                      </td></tr></table>
                    </td></tr>`;
      }
      return `<tr><td class="line" style="padding:12px 4px;border-bottom:1px solid #eee7df;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                        <td width="38" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>${dot(state, i + 1)}</tr></table></td>
                        <td valign="top" style="font-family:${B};font-size:15px;line-height:22px;">
                          ${state === 'done'
                            ? `<span class="m" style="color:${v.muted};text-decoration:line-through;">${title}</span>`
                            : `<a href="${safeUrl(st.url)}" target="_blank" class="t" style="color:${v.text};font-weight:700;text-decoration:none;">${title}</a>${st.desc ? `<br><span class="m"${A(`step${st.n}Desc`)} style="font-size:14px;color:${v.muted};">${rich(st.desc)}</span>` : ''}`}
                        </td>
                        <td align="right" valign="top" class="m" style="padding:0 0 0 10px;font-family:${B};font-size:13px;line-height:22px;color:${v.muted};white-space:nowrap;">${state === 'done' ? 'Done' : st.time ? `<span${A(`step${st.n}Time`)}>${rich(st.time)}</span>` : ''}</td>
                      </tr></table>
                    </td></tr>`;
    };
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 6px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td class="t"${A('progressLabel')} style="font-family:${B};font-size:13px;line-height:18px;font-weight:700;color:${v.text};">${rich(f.progressLabel)}</td>
                    <td align="right"${A('doneCount')} style="font-family:${B};font-size:13px;line-height:18px;font-weight:800;color:${v.brand};">${done} of ${list.length} done &middot; ${pct}%</td>
                  </tr></table>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0;"><tr>
                    ${pct > 0 ? `<td width="${pct}%" height="10" style="height:10px;font-size:0;line-height:0;background:${v.brand};border-radius:${pct === 100 ? '5px' : '5px 0 0 5px'};">&nbsp;</td>` : ''}
                    ${pct < 100 ? `<td class="line" height="10" style="height:10px;font-size:0;line-height:0;background:#eee7df;border-radius:${pct === 0 ? '5px' : '0 5px 5px 0'};">&nbsp;</td>` : ''}
                  </tr></table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:18px 48px 8px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(row).join('\n                    ')}
                  </table>
                  ${!next && list.length ? `<p class="t" style="margin:16px 0 0;font-family:${B};font-size:15px;line-height:22px;font-weight:700;color:${v.text};">&#127881; All done. You’re fully set up.</p>` : ''}
                </td>
              </tr>
              ${on.showTip && f.tip ? `<tr>
                <td class="px" style="padding:18px 48px 0;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fbf7f2;border-radius:12px;"><tr><td style="padding:18px 20px;font-family:${B};">
                    <p class="m"${A('tip')} style="margin:0 0 8px;font-size:15px;line-height:23px;color:${v.muted};">${escBr(f.tip)}</p>
                    <p style="margin:0;font-size:14px;line-height:20px;"><span class="t"${A('tipName')} style="font-weight:700;color:${v.text};">&mdash; ${rich(f.tipName)}</span>${f.tipLinkText ? ` <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> <a${A('tipLinkText')} href="${safeUrl(f.tipLinkUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.tipLinkText)}</a>` : ''}</p>
                  </td></tr></table>
                </td>
              </tr>` : ''}
              <tr><td style="padding:0 0 40px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const list = steps(f);
    const done = doneCount(f, list.length);
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `${f.progressLabel || 'Progress'}: ${done} of ${list.length} done`, ''];
    list.forEach((st, i) => {
      const mark = i < done ? '[x]' : '[ ]';
      out.push(`${mark} ${i + 1}. ${st.title}${i === done && f.nextLabel ? ` (${f.nextLabel})` : ''}${st.time && i >= done ? ` - ${st.time}` : ''}`);
      if (i >= done) {
        if (st.desc) out.push(`    ${st.desc}`);
        out.push(`    ${safeUrl(st.url)}`);
      }
    });
    out.push('');
    if (on.showTip && f.tip) {
      out.push(wrapText(stripRich(f.tip)), `- ${f.tipName}`);
      if (f.tipLinkText) out.push(`${f.tipLinkText}: ${safeUrl(f.tipLinkUrl)}`);
      out.push('');
    }
    out.push(textFooter(f));
    return cleanText(out);
  },
};
