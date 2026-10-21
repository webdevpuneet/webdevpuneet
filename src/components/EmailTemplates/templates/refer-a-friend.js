import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow } from './shell.js';

const STEPS = [1, 2, 3];

export default {
  id: 'refer-a-friend',
  name: 'Refer a Friend Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['referral', 'refer-a-friend', 'give-get', 'word-of-mouth', 'growth', 'saas', 'ecommerce'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Referral Email Template — Free Refer a Friend HTML Email',
  seoDescription: 'Free refer a friend email template: "give $20, get $20" reward cards, a personal referral link, three simple steps and a Share your link button. Copy the HTML.',
  description: 'A referral programme email built around a "give and get" offer: two reward cards (what your friend gets, what you get), the customer\'s personal referral link in a copy-friendly box, three numbered steps, a "Share your link" button, a referral tracker line and the programme terms.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'steps', label: 'How it works', toggle: 'showSteps' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('Give $20, get $20: share Acme with a friend', 'Your friends get $20 off their first order, and you get $20 for every friend who buys.', 'Acme'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Refer a friend' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Give $20, get $20' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, know someone who would love Acme? Share your link and you’ll both be rewarded.' },
    { key: 'giveLabel', group: 'rewards', label: 'Friend gets: label', type: 'text', value: 'Your friend gets' },
    { key: 'giveValue', group: 'rewards', label: 'Friend gets: reward', type: 'text', value: '$20 off' },
    { key: 'giveNote', group: 'rewards', label: 'Friend gets: note', type: 'text', value: 'their first order' },
    { key: 'getLabel', group: 'rewards', label: 'You get: label', type: 'text', value: 'You get' },
    { key: 'getValue', group: 'rewards', label: 'You get: reward', type: 'text', value: '$20 credit' },
    { key: 'getNote', group: 'rewards', label: 'You get: note', type: 'text', value: 'for every friend who buys' },
    { key: 'linkLabel', group: 'main', label: 'Link label', type: 'text', value: 'Your personal referral link' },
    { key: 'link', group: 'main', label: 'Referral link (shown)', type: 'text', value: 'acme.com/r/jordan-lee' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Share your link' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/account/referrals' },
    { key: 's1', group: 'steps', label: 'Step 1', type: 'text', value: 'Share your link with friends by email, text or social' },
    { key: 's2', group: 'steps', label: 'Step 2', type: 'text', value: 'They get $20 off their first order' },
    { key: 's3', group: 'steps', label: 'Step 3', type: 'text', value: 'You get $20 credit when their order ships' },
    { key: 'tracker', group: 'main', label: 'Tracker line (optional)', type: 'text', value: 'You’ve referred 2 friends and earned $40 so far.' },
    { key: 'terms', group: 'main', label: 'Terms', type: 'textarea', value: 'Credit is added when your friend’s first order of $50 or more ships. No limit on referrals. Credit can’t be exchanged for cash. Full terms at webdevpuneet.com/referral-terms.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you’re an Acme customer.' }),
  ],
  toggles: [{ key: 'showSteps', label: 'How it works', value: true }],
  vars: DEFAULT_VARS('#0f766e'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const reward = (k) => `<td class="stack stack-pad" width="50%" valign="top" style="padding:${k === 'give' ? '0 6px 0 0' : '0 0 0 6px'};">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f0fdfa;border-radius:14px;"><tr>
                        <td align="center" style="padding:20px 14px;font-family:${B};text-align:center;">
                          <p class="m"${A(`${k}Label`)} style="margin:0 0 4px;font-size:12px;line-height:17px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.muted};">${rich(f[`${k}Label`])}</p>
                          <p${A(`${k}Value`)} style="margin:0 0 2px;font-family:${H};font-size:28px;line-height:34px;font-weight:800;color:${v.brand};">${rich(f[`${k}Value`])}</p>
                          <p class="m"${A(`${k}Note`)} style="margin:0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f[`${k}Note`])}</p>
                        </td>
                      </tr></table>
                    </td>`;
    const steps = STEPS.map(n => [f[`s${n}`], `s${n}`]).filter(([x]) => String(x || '').trim());
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  <p style="margin:0 0 14px;font-size:44px;line-height:48px;">&#127873;</p>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  <h1 class="h1 t"${A('headline')} style="margin:0 0 14px;font-family:${H};font-size:36px;line-height:42px;font-weight:800;letter-spacing:-.7px;color:${v.text};">${rich(f.headline)}</h1>
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${reward('give')}
                    ${reward('get')}
                  </tr></table>
                </td>
              </tr>
              <tr>
                <td class="px" align="center" style="padding:0 48px 8px;font-family:${B};text-align:center;">
                  ${f.linkLabel ? `<p class="m"${A('linkLabel')} style="margin:0 0 8px;font-size:13px;line-height:18px;font-weight:600;color:${v.muted};">${rich(f.linkLabel)}</p>` : ''}
                  ${f.link ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="soft t"${A('link')} style="padding:12px 20px;border:1px dashed #94a3b8;border-radius:10px;background:#f8fafc;font-family:'Courier New',Courier,monospace;font-size:17px;line-height:22px;font-weight:700;color:${v.text};word-break:break-all;">${rich(f.link)}</td></tr></table>` : ''}
                  <div style="height:20px;line-height:20px;font-size:0;">&nbsp;</div>
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0 0 14px' })}
                  ${f.tracker ? `<p class="t"${A('tracker')} style="margin:0 0 24px;font-size:14px;line-height:20px;font-weight:600;color:${v.text};">&#11088; ${rich(f.tracker)}</p>` : ''}
                </td>
              </tr>
              ${on.showSteps && steps.length ? `<tr>
                <td class="px" style="padding:0 48px 12px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    <p class="t" style="margin:0 0 12px;font-family:${H};font-size:17px;line-height:24px;font-weight:700;color:${v.text};">How it works</p>
                    ${steps.map(([x, key], i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td width="36" valign="top" style="width:36px;padding:0 12px 12px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="26" height="26" style="width:26px;height:26px;border-radius:13px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:13px;font-weight:700;line-height:26px;mso-line-height-rule:exactly;">${i + 1}</td></tr></table></td>
                      <td class="m"${A(key)} valign="top" style="padding:2px 0 12px;font-size:15px;line-height:23px;color:${v.muted};">${rich(x)}</td>
                    </tr></table>`).join('\n                    ')}
                  </td></tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:6px 48px 36px;font-family:${B};">
                  ${f.terms ? `<p class="m"${A('terms')} style="margin:0;font-size:12px;line-height:18px;color:${v.muted};">${escBr(f.terms)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), '', `${f.giveLabel}: ${f.giveValue} ${f.giveNote}`, `${f.getLabel}: ${f.getValue} ${f.getNote}`, ''];
    if (f.link) out.push(`${f.linkLabel}: ${f.link}`);
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (f.tracker) out.push(f.tracker, '');
    if (on.showSteps) {
      const steps = [f.s1, f.s2, f.s3].filter(x => String(x || '').trim());
      if (steps.length) out.push('How it works:', ...steps.map((x, i) => `${i + 1}. ${x}`), '');
    }
    if (f.terms) out.push(wrapText(f.terms), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
