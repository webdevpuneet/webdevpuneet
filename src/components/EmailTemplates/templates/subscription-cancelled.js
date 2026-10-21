import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow, detailsBoxHtml } from './shell.js';

export default {
  id: 'subscription-cancelled',
  name: 'Subscription Cancellation Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['cancellation', 'subscription-cancelled', 'churn', 'offboarding', 'exit-survey', 'saas', 'lifecycle'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Cancellation Email Template — Free Subscription Cancelled',
  seoDescription: 'Free subscription cancellation email template: confirms the cancellation and end date, offers a pause or comeback deal, and asks one exit question. Copy HTML.',
  description: 'A graceful "sorry to see you go" email that confirms a cancellation: the plan, the date access ends and what happens to their data, a "Reactivate" button, an optional pause or comeback offer, a one-click "why did you leave?" exit question and a warm sign-off.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'details', label: 'Cancellation details' },
    { id: 'offer', label: 'Pause or comeback offer', toggle: 'showOffer' },
    { id: 'survey', label: 'Exit question', toggle: 'showSurvey' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Your Acme subscription has been cancelled', 'You’ll keep access until November 19. Changed your mind? You can reactivate any time.', 'Maya at Acme'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Cancellation confirmed' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'We’re sorry to see you go, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your subscription has been cancelled and you won’t be charged again. Here’s what happens next.' },
    { key: 'plan', group: 'details', label: 'Plan', type: 'text', value: 'Acme Pro (monthly)' },
    { key: 'accessUntil', group: 'details', label: 'Access until', type: 'text', value: 'November 19, 2026' },
    { key: 'data', group: 'details', label: 'Your data', type: 'text', value: 'Kept for 90 days, then deleted' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Reactivate my subscription' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/billing/reactivate' },
    { key: 'offerTitle', group: 'offer', label: 'Offer headline', type: 'text', value: 'Need a break instead?' },
    { key: 'offerText', group: 'offer', label: 'Offer text', type: 'textarea', value: 'Pause your account for up to 3 months for free and keep all your projects, or come back within 30 days and get 50% off your next 2 months.' },
    { key: 'offerLinkText', group: 'offer', label: 'Offer link text', type: 'text', value: 'Pause instead' },
    { key: 'offerUrl', group: 'offer', label: 'Offer link', type: 'url', value: 'https://webdevpuneet.com/billing/pause' },
    { key: 'surveyQuestion', group: 'survey', label: 'Question', type: 'text', value: 'Mind telling us why you left? One click helps us improve.' },
    { key: 'surveyUrl', group: 'survey', label: 'Answer link (the reason is added at the end)', type: 'url', value: 'https://webdevpuneet.com/exit-survey?reason=', hint: 'Each answer links to this address plus a short reason code, e.g. …reason=price.' },
    { key: 'r1', group: 'survey', label: 'Answer 1', type: 'text', value: 'Too expensive' },
    { key: 'r2', group: 'survey', label: 'Answer 2', type: 'text', value: 'Missing a feature' },
    { key: 'r3', group: 'survey', label: 'Answer 3', type: 'text', value: 'Switched to another tool' },
    { key: 'r4', group: 'survey', label: 'Answer 4', type: 'text', value: 'Just don’t need it now' },
    { key: 'signoff', group: 'main', label: 'Sign-off', type: 'textarea', value: 'Thank you for being a customer. If there’s anything we could have done better, just reply. I read every email.\n\nMaya Chen, Founder of Acme' },
    ...footerFields({ reason: 'You’re receiving this because you cancelled your Acme subscription.' }),
  ],
  toggles: [
    { key: 'showOffer', label: 'Pause or comeback offer', value: true },
    { key: 'showSurvey', label: 'Exit question', value: true },
  ],
  vars: DEFAULT_VARS('#475569'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const slug = x => String(x || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const reasons = [1, 2, 3, 4].map(n => [f[`r${n}`], `r${n}`]).filter(([x]) => String(x || '').trim());
    const answerUrl = x => (String(f.surveyUrl || '').trim() ? `${String(f.surveyUrl).trim()}${slug(x)}` : '#');
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 22px;')}
                  ${detailsBoxHtml(c, [['Plan', f.plan, 'plan'], ['Access until', f.accessUntil, 'accessUntil'], ['Your data', f.data, 'data']])}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:22px 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 24px', width: 280 })}
                </td>
              </tr>
              ${on.showOffer && (f.offerTitle || f.offerText) ? `<tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:14px;"><tr>
                    <td style="padding:20px 22px;font-family:${B};">
                      ${f.offerTitle ? `<p class="t"${A('offerTitle')} style="margin:0 0 6px;font-family:${H};font-size:17px;line-height:24px;font-weight:700;color:${v.text};">&#9208; ${rich(f.offerTitle)}</p>` : ''}
                      ${f.offerText ? `<p class="m"${A('offerText')} style="margin:0 0 10px;font-size:15px;line-height:23px;color:${v.muted};">${escBr(f.offerText)}</p>` : ''}
                      ${f.offerLinkText ? `<a${A('offerLinkText')} href="${safeUrl(f.offerUrl)}" target="_blank" style="font-size:14px;line-height:20px;font-weight:700;color:${v.brand};text-decoration:underline;">${rich(f.offerLinkText)} &rarr;</a>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              ${on.showSurvey && reasons.length ? `<tr>
                <td class="px" style="padding:0 48px 24px;font-family:${B};">
                  ${f.surveyQuestion ? `<p class="t"${A('surveyQuestion')} style="margin:0 0 12px;font-family:${H};font-size:16px;line-height:23px;font-weight:700;color:${v.text};">${rich(f.surveyQuestion)}</p>` : ''}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${reasons.map(([x, key]) => `<tr><td style="padding:0 0 8px;"><a${A(key)} href="${safeUrl(answerUrl(x))}" target="_blank" class="t" style="display:block;padding:11px 16px;border:1px solid #cbd5e1;border-radius:10px;font-size:15px;line-height:20px;font-weight:600;color:${v.text};text-decoration:none;">${rich(x)}</a></td></tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.signoff ? `<p class="m"${A('signoff')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.signoff)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const slug = x => String(x || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    for (const [l, x] of [['Plan', f.plan], ['Access until', f.accessUntil], ['Your data', f.data]]) if (String(x || '').trim()) out.push(`${l}: ${x}`);
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showOffer && (f.offerTitle || f.offerText)) out.push(f.offerTitle, wrapText(f.offerText || ''), f.offerLinkText ? `${f.offerLinkText}: ${safeUrl(f.offerUrl)}` : '', '');
    if (on.showSurvey) {
      const reasons = [f.r1, f.r2, f.r3, f.r4].filter(x => String(x || '').trim());
      if (reasons.length) out.push(f.surveyQuestion, ...reasons.map(x => `- ${x}: ${safeUrl(`${String(f.surveyUrl || '').trim()}${slug(x)}`)}`), '');
    }
    if (f.signoff) out.push(f.signoff, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
