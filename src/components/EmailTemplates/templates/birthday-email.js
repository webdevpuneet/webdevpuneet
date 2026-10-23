import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, ctx, emailShell, h1Html, textFooter, cleanText, IMG, buttonRow, socialFields, socialRowHtml, socialText, footerHtml, socialStyleToggle } from './shell.js';

export default {
  id: 'birthday-email',
  name: 'Birthday Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['birthday', 'birthday-coupon', 'customer-loyalty', 'celebration', 'ecommerce', 'automation', 'lifecycle'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Birthday Email Template — Free HTML Birthday Coupon Email',
  seoDescription: 'Free birthday email template for customers: festive hero, a personal birthday wish, a gift code with expiry and a Claim your gift button. Responsive HTML.',
  description: 'A festive birthday email for customers and members: a confetti-and-cake hero, a personal "Happy birthday" headline with their first name, a short warm message, a gift box with a discount code and expiry, a "Claim your gift" button, a signed note and social links.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Hero image', toggle: 'showHero' },
    { id: 'main', label: 'Message' },
    { id: 'gift', label: 'Birthday gift', toggle: 'showGift' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('Happy birthday, {{first_name}}! 🎂 A gift inside', 'To celebrate your day, here’s 20% off anything. Our treat, valid for 14 days.', 'Acme'),
    ...brandFields(),
    { key: 'heroUrl', group: 'hero', label: 'Hero image URL', type: 'url', value: IMG('birthday-hero.png'), hint: 'Paste a hosted URL or upload an image. 1200×520 px works best.', upload: { name: 'hero', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'heroAlt', group: 'hero', label: 'Hero alt text', type: 'text', value: 'A birthday cake with candles, balloons and confetti' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'It’s your day' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Happy birthday, {{first_name}}!' },
    { key: 'message', group: 'main', label: 'Message', type: 'textarea', value: 'Everyone at Acme wishes you a wonderful birthday. Thank you for being part of our story. We hope this year brings you plenty of good things, starting with a little gift from us.' },
    { key: 'giftLabel', group: 'gift', label: 'Gift label', type: 'text', value: 'Your birthday gift' },
    { key: 'giftTitle', group: 'gift', label: 'Gift headline', type: 'text', value: '20% off anything' },
    { key: 'code', group: 'gift', label: 'Code', type: 'text', value: 'BDAY20' },
    { key: 'expiry', group: 'gift', label: 'Expiry note', type: 'text', value: 'Valid for 14 days. One use per customer.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Claim your gift' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/birthday' },
    { key: 'signoff', group: 'main', label: 'Sign-off', type: 'text', value: 'Have a great day,' },
    { key: 'signName', group: 'main', label: 'Signed by', type: 'text', value: 'The Acme team' },
    ...socialFields({ linkedin: '' }),
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you shared your birthday with Acme.' }),
  ],
  toggles: [
    { key: 'showHero', label: 'Hero image', value: true },
    { key: 'showGift', label: 'Birthday gift', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
    socialStyleToggle('brand'),
  ],
  vars: [
    { key: 'brand', label: 'Brand / button', value: '#be185d', group: 'light' },
    { key: 'btnText', label: 'Button text', value: '#ffffff', group: 'light' },
    { key: 'bg', label: 'Page background', value: '#fdf2f8', group: 'light' },
    { key: 'card', label: 'Card', value: '#ffffff', group: 'light' },
    { key: 'text', label: 'Text', value: '#1f1530', group: 'light' },
    { key: 'muted', label: 'Muted text', value: '#6b5b73', group: 'light' },
    { key: 'darkBg', label: 'Page background', value: '#140a12', group: 'dark' },
    { key: 'darkCard', label: 'Card', value: '#21121d', group: 'dark' },
    { key: 'darkText', label: 'Text', value: '#fdf2f8', group: 'dark' },
    { key: 'darkMuted', label: 'Muted text', value: '#d1b8c8', group: 'dark' },
  ],
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const hasHero = on.showHero && f.heroUrl;
    const card = `
              ${hasHero ? `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A('heroUrl')} src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></a></td></tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:${hasHero ? 36 : 48}px 48px 8px;font-family:${B};text-align:center;">
                  ${f.eyebrow ? `<p${A('eyebrow')} style="margin:0 0 10px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${v.brand};">&#127881; ${rich(f.eyebrow)}</p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${f.message ? `<p class="m"${A('message')} style="margin:0 0 26px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.message)}</p>` : ''}
                </td>
              </tr>
              ${on.showGift && (f.giftTitle || f.code) ? `<tr>
                <td class="px" style="padding:0 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fdf2f8;border-radius:16px;border:2px solid ${v.brand};"><tr>
                    <td align="center" style="padding:24px 20px;font-family:${B};text-align:center;">
                      ${f.giftLabel ? `<p${A('giftLabel')} style="margin:0 0 4px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.brand};">&#127873; ${rich(f.giftLabel)}</p>` : ''}
                      ${f.giftTitle ? `<p class="t"${A('giftTitle')} style="margin:0 0 14px;font-family:${H};font-size:28px;line-height:34px;font-weight:800;color:${v.text};">${rich(f.giftTitle)}</p>` : ''}
                      ${f.code ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td${A('code')} style="padding:10px 24px;border:2px dashed ${v.brand};border-radius:10px;background:#ffffff;font-family:'Courier New',Courier,monospace;font-size:24px;line-height:30px;font-weight:700;letter-spacing:4px;color:${v.brand};">${rich(f.code)}</td></tr></table>` : ''}
                      ${f.expiry ? `<p class="m"${A('expiry')} style="margin:12px 0 0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.expiry)}</p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 40px;font-family:${B};text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0 0 26px' })}
                  ${f.signoff ? `<p class="m"${A('signoff')} style="margin:0;font-size:15px;line-height:23px;color:${v.muted};">${rich(f.signoff)}</p>` : ''}
                  ${f.signName ? `<p class="t"${A('signName')} style="margin:0;font-family:${H};font-size:16px;line-height:24px;font-weight:700;color:${v.text};">${rich(f.signName)}</p>` : ''}
                </td>
              </tr>`;
    return emailShell(c, { card, footer: footerHtml(c, { socials: socialRowHtml(c) }) });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, '', wrapText(f.message), ''];
    if (on.showGift) out.push(`${f.giftLabel}: ${f.giftTitle}`, f.code ? `Code: ${f.code}` : '', f.expiry || '', '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '', f.signoff, f.signName, '');
    const so = socialText(f, on);
    if (so) out.push(so, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
