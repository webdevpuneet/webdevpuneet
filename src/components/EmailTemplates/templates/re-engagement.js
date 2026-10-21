import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, buttonRow } from './shell.js';

const NEWS = [1, 2, 3];
const news = f => NEWS.map(n => ({ n, icon: f[`n${n}Icon`], title: f[`n${n}Title`], text: f[`n${n}Text`] })).filter(x => String(x.title || '').trim());

export default {
  id: 're-engagement',
  name: 'Re-engagement Email (We Miss You)',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['re-engagement', 'win-back', 'we-miss-you', 'inactive-users', 'retention', 'list-cleaning', 'lifecycle'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Re-engagement Email Template — Free "We Miss You" Win-Back',
  seoDescription: 'Free re-engagement email template: "we miss you" headline, what is new since their last visit, a comeback offer, one button and an easy opt-out. Copy the HTML.',
  description: 'A win-back email for inactive customers and subscribers: a "We miss you" headline, three things that are new since their last visit, an optional comeback discount, one clear button, and an honest "stay or go" choice that keeps your list healthy.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Message & button' },
    { id: 'news', label: 'What’s new (leave a title empty to hide it)' },
    { id: 'offer', label: 'Comeback offer', toggle: 'showOffer' },
    { id: 'optout', label: 'Stay or go', toggle: 'showOptout' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('We miss you, {{first_name}} (here’s 20% off to come back)', 'A lot has changed since your last visit. Come take a look, with 20% off on us.', 'Acme'),
    ...brandFields(),
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'It’s been a while' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'We miss you, {{first_name}}' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'It’s been a few months since we last saw you, and we’ve been busy. Here’s what’s new since your last visit.' },
    { key: 'n1Icon', group: 'news', label: 'Item 1 icon', type: 'text', value: '✨' },
    { key: 'n1Title', group: 'news', label: 'Item 1 title', type: 'text', value: 'A faster, simpler dashboard' },
    { key: 'n1Text', group: 'news', label: 'Item 1 text', type: 'text', value: 'Everything you use most is now one click away.' },
    { key: 'n2Icon', group: 'news', label: 'Item 2 icon', type: 'text', value: '📱' },
    { key: 'n2Title', group: 'news', label: 'Item 2 title', type: 'text', value: 'New mobile apps' },
    { key: 'n2Text', group: 'news', label: 'Item 2 text', type: 'text', value: 'Pick up where you left off on iPhone and Android.' },
    { key: 'n3Icon', group: 'news', label: 'Item 3 icon', type: 'text', value: '🤝' },
    { key: 'n3Title', group: 'news', label: 'Item 3 title', type: 'text', value: '30+ new integrations' },
    { key: 'n3Text', group: 'news', label: 'Item 3 text', type: 'text', value: 'Connect Slack, Notion, Google Drive and more.' },
    { key: 'offerTitle', group: 'offer', label: 'Offer headline', type: 'text', value: 'Come back with 20% off' },
    { key: 'code', group: 'offer', label: 'Code', type: 'text', value: 'WELCOMEBACK20' },
    { key: 'offerNote', group: 'offer', label: 'Offer note', type: 'text', value: 'Valid for 14 days on any plan or order.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'See what’s new' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/whats-new' },
    { key: 'optoutText', group: 'optout', label: 'Text', type: 'textarea', value: 'Not interested anymore? No hard feelings. If we don’t hear from you, we’ll stop sending emails in 30 days to keep your inbox tidy.' },
    { key: 'stayText', group: 'optout', label: '"Stay" link text', type: 'text', value: 'Yes, keep me subscribed' },
    { key: 'stayUrl', group: 'optout', label: '"Stay" link', type: 'url', value: 'https://webdevpuneet.com/subscriptions/stay' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you have an Acme account or subscribed to our emails.' }),
  ],
  toggles: [
    { key: 'showOffer', label: 'Comeback offer', value: true },
    { key: 'showOptout', label: 'Stay or go', value: true },
  ],
  vars: DEFAULT_VARS('#db2777'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = news(f);
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  <p style="margin:0 0 16px;font-size:44px;line-height:48px;">&#128140;</p>
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              ${list.length ? `<tr>
                <td class="px" style="padding:0 48px 12px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${list.map(x => `<tr>
                      <td width="52" valign="top" style="width:52px;padding:0 14px 16px 0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="40" height="40" class="soft"${A(`n${x.n}Icon`)} style="width:40px;height:40px;border-radius:12px;background:#fdf2f8;font-size:20px;line-height:40px;mso-line-height-rule:exactly;">${rich(x.icon)}</td></tr></table>
                      </td>
                      <td valign="top" style="padding:0 0 16px;font-family:${B};">
                        <p class="t"${A(`n${x.n}Title`)} style="margin:0 0 2px;font-family:${H};font-size:16px;line-height:23px;font-weight:700;color:${v.text};">${rich(x.title)}</p>
                        ${x.text ? `<p class="m"${A(`n${x.n}Text`)} style="margin:0;font-size:15px;line-height:23px;color:${v.muted};">${rich(x.text)}</p>` : ''}
                      </td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              ${on.showOffer && f.code ? `<tr>
                <td class="px" style="padding:4px 48px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px dashed ${v.brand};border-radius:14px;"><tr>
                    <td align="center" style="padding:20px;font-family:${B};text-align:center;">
                      ${f.offerTitle ? `<p class="t"${A('offerTitle')} style="margin:0 0 10px;font-family:${H};font-size:18px;line-height:25px;font-weight:700;color:${v.text};">${rich(f.offerTitle)}</p>` : ''}
                      <p${A('code')} style="margin:0;font-family:'Courier New',Courier,monospace;font-size:24px;line-height:30px;font-weight:700;letter-spacing:3px;color:${v.brand};">${rich(f.code)}</p>
                      ${f.offerNote ? `<p class="m"${A('offerNote')} style="margin:10px 0 0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.offerNote)}</p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 30px;text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0' })}
                </td>
              </tr>
              ${on.showOptout && f.optoutText ? `<tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" align="center" style="border-top:1px solid #e2e8f0;padding:22px 0 0;text-align:center;">
                    <p class="m"${A('optoutText')} style="margin:0 0 10px;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.optoutText)}</p>
                    ${f.stayText ? `<p style="margin:0;font-size:14px;line-height:20px;"><a${A('stayText')} href="${safeUrl(f.stayUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:underline;">${rich(f.stayText)}</a></p>` : ''}
                  </td></tr></table>
                </td>
              </tr>` : '<tr><td style="padding:0 0 12px;font-size:0;line-height:0;">&nbsp;</td></tr>'}`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.intro), ''];
    for (const x of news(f)) out.push(`${x.icon ? `${x.icon} ` : ''}${x.title}`, wrapText(x.text || ''), '');
    if (on.showOffer && f.code) out.push(f.offerTitle, `Code: ${f.code}`, f.offerNote || '', '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showOptout && f.optoutText) out.push(wrapText(f.optoutText), f.stayText ? `${f.stayText}: ${safeUrl(f.stayUrl)}` : '', '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
