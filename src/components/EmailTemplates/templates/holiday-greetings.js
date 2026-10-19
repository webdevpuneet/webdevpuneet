import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, ctx, emailShell, textFooter, cleanText, IMG, buttonRow, socialFields, socialRowHtml, socialText, footerHtml } from './shell.js';

export default {
  id: 'holiday-greetings',
  name: 'Holiday Greetings Email',
  version: '1.0.0',
  category: 'holidays',
  tags: ['holiday-greetings', 'christmas', 'new-year', 'seasons-greetings', 'thank-you', 'seasonal', 'brand'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Holiday Greetings Email Template — Free Christmas HTML Email',
  seoDescription: 'Free holiday greetings email template for Christmas and New Year: festive hero, a warm message, team sign-off, optional thank-you offer and holiday hours.',
  description: 'A warm season’s greetings email for Christmas, the holidays and the New Year: a festive hero image, a heartfelt message to customers, a signed note from the team, an optional thank-you discount with a button, holiday opening hours and social links.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Hero image', toggle: 'showHero' },
    { id: 'main', label: 'Message' },
    { id: 'offer', label: 'Thank-you offer', toggle: 'showOffer' },
    { id: 'hours', label: 'Holiday hours', toggle: 'showHours' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('Happy holidays from all of us at Acme 🎄', 'A thank-you for an amazing year, a small gift for you and our holiday hours.', 'The Acme Team'),
    ...brandFields(),
    { key: 'heroUrl', group: 'hero', label: 'Hero image URL', type: 'url', value: IMG('holiday-hero.png'), hint: 'Paste a hosted URL or upload an image, such as a team photo. 1200×520 px works best.', upload: { name: 'hero', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'heroAlt', group: 'hero', label: 'Hero alt text', type: 'text', value: 'A decorated holiday tree with gifts' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Season’s greetings' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Happy holidays, {{first_name}}!' },
    { key: 'message', group: 'main', label: 'Message', type: 'textarea', value: 'As the year winds down, we wanted to say a simple thank you. Every order, every message and every bit of feedback you sent this year helped us build something we’re proud of.\n\nWe hope your holidays are full of rest, good food and the people you love. Here’s to an even better 2027.' },
    { key: 'signoff', group: 'main', label: 'Sign-off', type: 'text', value: 'With warm wishes,' },
    { key: 'signName', group: 'main', label: 'Signed by', type: 'text', value: 'Maya, Sam and the whole Acme team' },
    { key: 'offerTitle', group: 'offer', label: 'Offer headline', type: 'text', value: 'A little gift from us' },
    { key: 'offerText', group: 'offer', label: 'Offer text', type: 'textarea', value: 'Enjoy 20% off anything with code THANKYOU20, valid until January 5.' },
    { key: 'ctaText', group: 'offer', label: 'Button text', type: 'text', value: 'Treat yourself' },
    { key: 'ctaUrl', group: 'offer', label: 'Button link', type: 'url', value: 'https://yoursite.com/shop' },
    { key: 'hoursTitle', group: 'hours', label: 'Section title', type: 'text', value: 'Holiday hours' },
    { key: 'hours', group: 'hours', label: 'Hours (one per line)', type: 'textarea', value: 'Dec 24–26: closed\nDec 31: open until 2 PM\nJan 1: closed\nOrders placed while we’re away ship on January 2.' },
    ...socialFields({ youtube: '' }),
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you’re a customer of Acme or signed up for our emails.' }),
  ],
  toggles: [
    { key: 'showHero', label: 'Hero image', value: true },
    { key: 'showOffer', label: 'Thank-you offer', value: true },
    { key: 'showHours', label: 'Holiday hours', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
  ],
  vars: [
    { key: 'brand', label: 'Brand / button', value: '#15803d', group: 'light' },
    { key: 'btnText', label: 'Button text', value: '#ffffff', group: 'light' },
    { key: 'bg', label: 'Page background', value: '#ecf3ee', group: 'light' },
    { key: 'card', label: 'Card', value: '#ffffff', group: 'light' },
    { key: 'text', label: 'Text', value: '#14261a', group: 'light' },
    { key: 'muted', label: 'Muted text', value: '#5b6b60', group: 'light' },
    { key: 'darkBg', label: 'Page background', value: '#08120c', group: 'dark' },
    { key: 'darkCard', label: 'Card', value: '#102018', group: 'dark' },
    { key: 'darkText', label: 'Text', value: '#eef7f0', group: 'dark' },
    { key: 'darkMuted', label: 'Muted text', value: '#a3b8aa', group: 'dark' },
  ],
  fonts: { heading: 'playfair', body: 'georgia' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const hasHero = on.showHero && f.heroUrl;
    const card = `
              ${hasHero ? `<tr><td style="padding:0;font-size:0;line-height:0;"><img${A('heroUrl')} src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></td></tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:${hasHero ? 38 : 48}px 48px 8px;font-family:${B};text-align:center;">
                  ${f.eyebrow ? `<p${A('eyebrow')} style="margin:0 0 12px;font-family:${B};font-size:14px;line-height:20px;font-style:italic;letter-spacing:.5px;color:${v.brand};">&#10052; ${rich(f.eyebrow)} &#10052;</p>` : ''}
                  <h1 class="h1 t"${A('headline')} style="margin:0 0 20px;font-family:${H};font-size:36px;line-height:44px;font-weight:700;color:${v.text};">${rich(f.headline)}</h1>
                  ${f.message ? `<p class="m"${A('message')} style="margin:0 0 24px;font-size:17px;line-height:28px;color:${v.muted};">${escBr(f.message)}</p>` : ''}
                  ${f.signoff ? `<p class="m"${A('signoff')} style="margin:0;font-size:16px;line-height:24px;font-style:italic;color:${v.muted};">${rich(f.signoff)}</p>` : ''}
                  ${f.signName ? `<p class="t"${A('signName')} style="margin:2px 0 30px;font-family:${H};font-size:18px;line-height:26px;font-weight:700;color:${v.text};">${rich(f.signName)}</p>` : ''}
                </td>
              </tr>
              ${on.showOffer && (f.offerTitle || f.offerText) ? `<tr>
                <td class="px" style="padding:0 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px dashed ${v.brand};border-radius:14px;"><tr>
                    <td align="center" style="padding:24px 22px;font-family:${B};text-align:center;">
                      ${f.offerTitle ? `<p class="t"${A('offerTitle')} style="margin:0 0 6px;font-family:${H};font-size:21px;line-height:28px;font-weight:700;color:${v.text};">&#127873; ${rich(f.offerTitle)}</p>` : ''}
                      ${f.offerText ? `<p class="m"${A('offerText')} style="margin:0 0 18px;font-size:15px;line-height:24px;color:${v.muted};">${escBr(f.offerText)}</p>` : ''}
                      ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0', width: 220, height: 46 })}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              ${on.showHours && f.hours ? `<tr>
                <td class="px" align="center" style="padding:0 48px 36px;font-family:${B};text-align:center;">
                  ${f.hoursTitle ? `<p class="t"${A('hoursTitle')} style="margin:0 0 8px;font-family:${B};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.text};">${rich(f.hoursTitle)}</p>` : ''}
                  <p class="m"${A('hours')} style="margin:0;font-size:14px;line-height:23px;color:${v.muted};">${escBr(f.hours)}</p>
                </td>
              </tr>` : '<tr><td style="padding:0 0 12px;font-size:0;line-height:0;">&nbsp;</td></tr>'}`;
    return emailShell(c, { card, footer: footerHtml(c, { socials: socialRowHtml(c) }) });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.message), '', f.signoff, f.signName, ''];
    if (on.showOffer) out.push(f.offerTitle, wrapText(f.offerText || ''), f.ctaText ? `${f.ctaText}: ${safeUrl(f.ctaUrl)}` : '', '');
    if (on.showHours && f.hours) out.push(f.hoursTitle, f.hours, '');
    const so = socialText(f, on);
    if (so) out.push(so, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
