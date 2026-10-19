import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow } from './shell.js';

const STATS = [1, 2, 3];
const FEATS = [1, 2, 3, 4];
const stats = f => STATS.map(n => ({ n, value: f[`stat${n}Value`], label: f[`stat${n}Label`] })).filter(x => String(x.value || '').trim());
const feats = f => FEATS.map(n => [f[`feat${n}`], `feat${n}`]).filter(([x]) => String(x || '').trim());

export default {
  id: 'trial-ending',
  name: 'Trial Ending Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['trial-ending', 'trial-expiring', 'upgrade', 'saas', 'conversion', 'pricing', 'lifecycle'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Trial Ending Email Template — Free SaaS Upgrade Email HTML',
  seoDescription: 'Free trial ending email template for SaaS: days-left headline, usage stats, a plan card with price and features, an Upgrade button and a compare-plans link.',
  description: 'A SaaS trial-expiry reminder that converts: a "your trial ends in 3 days" label, a headline about keeping what they built, three usage stats from the trial, a plan card with price, period and four key features, an upgrade button, a compare-plans link and a reassuring note about what happens to their data.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'stats', label: 'Usage stats', toggle: 'showStats' },
    { id: 'plan', label: 'Plan card', toggle: 'showPlan' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('Your Acme trial ends in 3 days', 'Keep your projects, your team and everything you’ve set up. Upgrade in one click.', 'Maya at Acme'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Your trial ends in 3 days' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Keep everything you’ve built, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your free trial of Acme Pro ends on Thursday, October 22. Here’s what your team has done in the last two weeks, and how to keep it going.' },
    { key: 'stat1Value', group: 'stats', label: 'Stat 1 value', type: 'text', value: '12' },
    { key: 'stat1Label', group: 'stats', label: 'Stat 1 label', type: 'text', value: 'Projects created' },
    { key: 'stat2Value', group: 'stats', label: 'Stat 2 value', type: 'text', value: '4' },
    { key: 'stat2Label', group: 'stats', label: 'Stat 2 label', type: 'text', value: 'Teammates invited' },
    { key: 'stat3Value', group: 'stats', label: 'Stat 3 value', type: 'text', value: '38 h' },
    { key: 'stat3Label', group: 'stats', label: 'Stat 3 label', type: 'text', value: 'Saved on reporting' },
    { key: 'planName', group: 'plan', label: 'Plan name', type: 'text', value: 'Acme Pro' },
    { key: 'planPrice', group: 'plan', label: 'Price', type: 'text', value: '$12' },
    { key: 'planPeriod', group: 'plan', label: 'Billing period', type: 'text', value: 'per user / month, billed yearly' },
    { key: 'feat1', group: 'plan', label: 'Feature 1', type: 'text', value: 'Unlimited projects and automations' },
    { key: 'feat2', group: 'plan', label: 'Feature 2', type: 'text', value: 'Advanced reports and dashboards' },
    { key: 'feat3', group: 'plan', label: 'Feature 3', type: 'text', value: 'Integrations with Slack, GitHub and Google' },
    { key: 'feat4', group: 'plan', label: 'Feature 4', type: 'text', value: 'Priority support from real humans' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Upgrade to Pro' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/billing/upgrade' },
    { key: 'linkText', group: 'main', label: 'Secondary link text', type: 'text', value: 'Compare all plans' },
    { key: 'linkUrl', group: 'main', label: 'Secondary link', type: 'url', value: 'https://yoursite.com/pricing' },
    { key: 'note', group: 'main', label: 'Reassurance note', type: 'textarea', value: 'Not ready yet? No problem. When the trial ends your account moves to the Free plan, and your projects stay safe for 30 days so you can upgrade any time. Questions about pricing? Just reply, I read every email.' },
    { key: 'signName', group: 'main', label: 'Signed by', type: 'text', value: 'Maya Chen, Founder of Acme' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you started a free trial of Acme.' }),
  ],
  toggles: [
    { key: 'showStats', label: 'Usage stats', value: true },
    { key: 'showPlan', label: 'Plan card', value: true },
  ],
  vars: DEFAULT_VARS('#0f766e'),
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const st = stats(f);
    const fs = feats(f);
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 8px;font-family:${B};">
                  ${f.eyebrow ? `<p style="margin:0 0 14px;"><span${A('eyebrow')} style="display:inline-block;padding:5px 12px;border-radius:99px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:12px;line-height:16px;font-weight:700;letter-spacing:.5px;">&#9203; ${rich(f.eyebrow)}</span></p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              ${on.showStats && st.length ? `<tr>
                <td class="px" style="padding:0 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${st.map((x, i) => `<td width="${Math.floor(100 / st.length)}%" valign="top" style="padding:0 ${i < st.length - 1 ? 5 : 0}px 0 ${i > 0 ? 5 : 0}px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f0fdfa;border-radius:12px;"><tr>
                        <td style="padding:16px 14px;font-family:${B};">
                          <span${A(`stat${x.n}Value`)} style="display:block;font-family:${H};font-size:26px;line-height:32px;font-weight:800;color:${v.brand};">${rich(x.value)}</span>
                          <span class="m"${A(`stat${x.n}Label`)} style="display:block;font-size:12px;line-height:17px;font-weight:600;color:${v.muted};">${rich(x.label)}</span>
                        </td>
                      </tr></table>
                    </td>`).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : ''}
              ${on.showPlan ? `<tr>
                <td class="px" style="padding:0 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid ${v.brand};border-radius:14px;"><tr>
                    <td style="padding:24px 26px;font-family:${B};">
                      ${f.planName ? `<p class="t"${A('planName')} style="margin:0 0 4px;font-family:${H};font-size:18px;line-height:24px;font-weight:800;color:${v.text};">${rich(f.planName)}</p>` : ''}
                      <p style="margin:0 0 16px;font-size:14px;line-height:20px;">${f.planPrice ? `<span class="t"${A('planPrice')} style="font-family:${H};font-size:34px;line-height:40px;font-weight:800;color:${v.text};">${rich(f.planPrice)}</span> ` : ''}<span class="m"${A('planPeriod')} style="color:${v.muted};">${rich(f.planPeriod)}</span></p>
                      ${fs.map(([x, key]) => `<p class="m" style="margin:0 0 8px;font-size:15px;line-height:22px;color:${v.muted};"><span style="color:${v.brand};font-weight:800;">&#10003;</span>&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                      ')}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px' })}
                  ${f.linkText ? `<p style="margin:0 0 26px;font-size:14px;line-height:20px;"><a${A('linkText')} href="${safeUrl(f.linkUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.linkText)} &rarr;</a></p>` : ''}
                </td>
              </tr>
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
    const out = [f.brandName, '', f.eyebrow.toUpperCase(), f.headline, '', wrapText(f.intro), ''];
    if (on.showStats) {
      const st = stats(f);
      if (st.length) out.push(...st.map(x => `${x.value}  ${x.label}`), '');
    }
    if (on.showPlan) out.push(`${f.planName}: ${f.planPrice} ${f.planPeriod}`, ...feats(f).map(([x]) => `- ${x}`), '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.linkText) out.push(`${f.linkText}: ${safeUrl(f.linkUrl)}`);
    out.push('');
    if (f.note) out.push(wrapText(f.note), '');
    if (f.signName) out.push(f.signName, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
