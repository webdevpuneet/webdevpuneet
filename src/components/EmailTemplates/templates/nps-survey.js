import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, textFooter, cleanText, buttonRow } from './shell.js';

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/* One link per score: the number is added to the end of the survey link, e.g. …&score=9 */
const scoreUrl = (base, n) => {
  const u = String(base || '').trim();
  return u ? `${u}${n}` : '#';
};

export default {
  id: 'nps-survey',
  name: 'NPS Survey Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['nps', 'customer-feedback', 'survey', 'net-promoter-score', 'customer-satisfaction', 'saas', 'lifecycle'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'NPS Survey Email Template — Free Customer Feedback Email',
  seoDescription: 'Free NPS survey email template with a one-click 0–10 score row, "not likely" to "very likely" labels and a longer-feedback link. Outlook-safe HTML to copy.',
  description: 'A one-question Net Promoter Score (NPS) survey email: "How likely are you to recommend us to a friend?" with a row of eleven clickable 0–10 scores that each open your survey with the score filled in, "not likely" and "very likely" labels, a time estimate, a link for longer feedback and a thank-you note.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Question & message' },
    { id: 'scale', label: 'Score scale' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('Quick question: would you recommend Acme?', 'One click is all it takes. Your answer helps us decide what to build next.', 'Maya at Acme'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'One quick question' },
    { key: 'question', group: 'main', label: 'Question', type: 'text', value: 'How likely are you to recommend Acme to a friend or colleague?' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, you’ve been using Acme for a few months now. Tap a number below. It takes one click, and every answer is read by our team.' },
    { key: 'surveyUrl', group: 'scale', label: 'Survey link (the score is added at the end)', type: 'url', value: 'https://yoursite.com/survey/nps?user=8812&score=', hint: 'Each number links to this address plus its score, e.g. …&score=9. Use your survey tool’s link if it accepts a score parameter.' },
    { key: 'lowLabel', group: 'scale', label: 'Low end label', type: 'text', value: 'Not at all likely' },
    { key: 'highLabel', group: 'scale', label: 'High end label', type: 'text', value: 'Extremely likely' },
    { key: 'timeNote', group: 'scale', label: 'Time note', type: 'text', value: 'Takes less than a minute' },
    { key: 'ctaText', group: 'main', label: 'Button text (optional)', type: 'text', value: 'Share detailed feedback' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/survey/feedback' },
    { key: 'note', group: 'main', label: 'Thank-you note', type: 'textarea', value: 'Thank you for helping us improve. If something isn’t working for you, reply to this email and it will come straight to me.' },
    { key: 'signName', group: 'main', label: 'Signed by', type: 'text', value: 'Maya Chen, Founder of Acme' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you have an Acme account.' }),
  ],
  toggles: [],
  vars: DEFAULT_VARS('#1d4ed8'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, H, B, A } = c;
    // Detractors (0-6), passives (7-8) and promoters (9-10) get a subtle tint; the
    // numbers keep dark text on those light tints in dark mode too
    const tint = n => (n <= 6 ? '#fef2f2' : n <= 8 ? '#fffbeb' : '#f0fdf4');
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 40px 8px;font-family:${B};text-align:center;">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  <h1 class="h1 t"${A('question')} style="margin:0 0 16px;font-family:${H};font-size:26px;line-height:34px;font-weight:800;letter-spacing:-.4px;color:${v.text};">${rich(f.question)}</h1>
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 24px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 40px 8px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="nps"><tr>
                    ${SCORES.map(n => `<td align="center" width="9%" style="padding:0 2px;"><a${n === 0 ? A('surveyUrl') : ''} href="${safeUrl(scoreUrl(f.surveyUrl, n))}" target="_blank" title="${n}" style="display:block;padding:11px 0;border-radius:8px;border:1px solid #e2e8f0;background:${tint(n)};font-family:${H};font-size:16px;line-height:20px;font-weight:700;color:#0f172a;text-decoration:none;">${n}</a></td>`).join('')}
                  </tr></table>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td class="m"${A('lowLabel')} style="padding:8px 2px 0;font-family:${B};font-size:12px;line-height:16px;color:${v.muted};">${rich(f.lowLabel)}</td>
                    <td class="m" align="right"${A('highLabel')} style="padding:8px 2px 0;font-family:${B};font-size:12px;line-height:16px;color:${v.muted};">${rich(f.highLabel)}</td>
                  </tr></table>
                </td>
              </tr>
              <tr>
                <td class="px" align="center" style="padding:18px 40px 8px;font-family:${B};text-align:center;">
                  ${f.timeNote ? `<p class="m"${A('timeNote')} style="margin:0 0 22px;font-size:13px;line-height:19px;color:${v.muted};">&#9201; ${rich(f.timeNote)}</p>` : ''}
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0 0 26px', width: 260 })}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 40px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0 0 12px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                    ${f.signName ? `<p class="t"${A('signName')} style="margin:0;font-size:14px;line-height:22px;font-weight:700;color:${v.text};">${rich(f.signName)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card, extraCss: '    .nps a{padding:9px 0 !important;font-size:14px !important;}' });
  },

  text(s) {
    const f = s.fields;
    const out = [f.brandName, '', f.question, '', wrapText(f.intro), '', `0 = ${f.lowLabel}, 10 = ${f.highLabel}`];
    for (const n of SCORES) out.push(`${n}: ${safeUrl(scoreUrl(f.surveyUrl, n))}`);
    out.push('');
    if (f.timeNote) out.push(f.timeNote, '');
    if (f.ctaText) out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.note) out.push(wrapText(f.note), '');
    if (f.signName) out.push(f.signName, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
