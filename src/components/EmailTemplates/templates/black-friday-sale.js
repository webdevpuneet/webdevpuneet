import { esc, escBr, safeUrl, buttonHtml, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, ctx, emailShell, footerHtml, textFooter, cleanText } from './shell.js';

const HERO = 'https://webdevpuneet.com/images/email-templates/black-friday-hero.png';
const PICKS = [1, 2];
const pickFields = (n, name, was, now) => [
  { key: `p${n}Name`, group: 'picks', label: `Pick ${n} name`, type: 'text', value: name },
  { key: `p${n}Was`, group: 'picks', label: `Pick ${n} regular price`, type: 'text', value: was },
  { key: `p${n}Now`, group: 'picks', label: `Pick ${n} sale price`, type: 'text', value: now },
  { key: `p${n}Url`, group: 'picks', label: `Pick ${n} link`, type: 'url', value: `https://yoursite.com/products/pick-${n}` },
];
const picks = f => PICKS.map(n => ({ n, name: f[`p${n}Name`], was: f[`p${n}Was`], now: f[`p${n}Now`], url: f[`p${n}Url`] })).filter(p => String(p.name || '').trim());

export default {
  id: 'black-friday-sale',
  name: 'Black Friday Sale Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['black-friday', 'cyber-monday', 'sale', 'promo-code', 'ecommerce', 'store'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Black Friday Email Template — Free HTML Sale & Promo Email',
  seoDescription: 'Free Black Friday and Cyber Monday email template: bold hero, promo code box, end date, two product picks and a Shop button. Responsive, with dark mode.',
  description: 'A bold Black Friday / Cyber Monday promo email on a dark card: hero image, big discount headline, a dashed promo-code box, an "ends" deadline line, a shop button, two product picks with was/now prices, the fine print and a CAN-SPAM footer with unsubscribe.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Hero image', toggle: 'showHero' },
    { id: 'main', label: 'Offer & button' },
    { id: 'code', label: 'Promo code', toggle: 'showCode' },
    { id: 'picks', label: 'Product picks', toggle: 'showPicks' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Black Friday: 40% off everything starts now 🖤', 'Our biggest sale of the year. Use code BLACKFRIDAY40 at checkout. Ends Monday at midnight.', 'Acme Store'),
    ...brandFields(),
    { key: 'heroUrl', group: 'hero', label: 'Hero image URL', type: 'url', value: HERO, hint: 'Paste a hosted URL or upload an image. 1200×600 px works best.', upload: { name: 'hero', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'heroAlt', group: 'hero', label: 'Hero alt text', type: 'text', value: 'Black Friday: 40% off everything' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Black Friday · Cyber Monday' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: '40% off everything' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Our biggest sale of the year is here. Stock up on the bestsellers, treat someone on your list, or finally grab the thing you’ve had in your cart since summer.' },
    { key: 'codeLabel', group: 'code', label: 'Code label', type: 'text', value: 'Use code at checkout' },
    { key: 'code', group: 'code', label: 'Promo code', type: 'text', value: 'BLACKFRIDAY40' },
    { key: 'deadline', group: 'main', label: 'Deadline line', type: 'text', value: 'Ends Monday, November 30 at 11:59 PM ET' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Shop the sale' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/sale' },
    { key: 'picksTitle', group: 'picks', label: 'Section title', type: 'text', value: 'Most-loved picks' },
    ...pickFields(1, 'Everyday Canvas Tote', '$48', '$28.80'),
    ...pickFields(2, 'Ceramic Pour-Over Set', '$42', '$25.20'),
    { key: 'fineprint', group: 'main', label: 'Fine print', type: 'textarea', value: 'Offer valid Nov 27–30, 2026 on full-price items at yoursite.com. Can’t be combined with other offers. Excludes gift cards.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you signed up for emails from Acme Store.' }),
  ],
  toggles: [
    { key: 'showHero', label: 'Hero image', value: true },
    { key: 'showCode', label: 'Promo code', value: true },
    { key: 'showPicks', label: 'Product picks', value: true },
  ],
  vars: [
    { key: 'brand', label: 'Accent / button', value: '#facc15', group: 'light' },
    { key: 'btnText', label: 'Button text', value: '#0a0a0a', group: 'light' },
    { key: 'bg', label: 'Page background', value: '#e7e5e4', group: 'light' },
    { key: 'card', label: 'Card', value: '#0a0a0a', group: 'light' },
    { key: 'text', label: 'Text', value: '#fafafa', group: 'light' },
    { key: 'muted', label: 'Muted text', value: '#a3a3a3', group: 'light' },
    { key: 'darkBg', label: 'Page background', value: '#000000', group: 'dark' },
    { key: 'darkCard', label: 'Card', value: '#111111', group: 'dark' },
    { key: 'darkText', label: 'Text', value: '#fafafa', group: 'dark' },
    { key: 'darkMuted', label: 'Muted text', value: '#a3a3a3', group: 'dark' },
  ],
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const ps = picks(f);
    // The header sits on the light page background, so it uses fixed dark text
    const logoW = Math.max(40, Math.min(240, parseInt(f.logoWidth, 10) || 120));
    const header = f.logoUrl
      ? `<a href="${safeUrl(f.headerLink)}" target="_blank" style="text-decoration:none;"><img${A('logoUrl')} src="${safeUrl(f.logoUrl)}" width="${logoW}" alt="${esc(f.brandName)}" style="display:block;width:${logoW}px;max-width:100%;height:auto;border:0;"></a>`
      : `<a href="${safeUrl(f.headerLink)}" target="_blank" class="hd" style="font-family:${H};font-size:22px;font-weight:800;letter-spacing:-0.4px;color:#0a0a0a;text-decoration:none;"><span style="display:inline-block;width:12px;height:12px;border-radius:4px;background:${v.brand};margin-right:8px;vertical-align:middle;"></span><span${A('brandName')}>${rich(f.brandName)}</span></a>`;
    const card = `
              ${on.showHero && f.heroUrl ? `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A('heroUrl')} src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></a></td></tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:40px 48px 8px;font-family:${B};text-align:center;">
                  ${f.eyebrow ? `<p${A('eyebrow')} style="margin:0 0 12px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${v.brand};">${rich(f.eyebrow)}</p>` : ''}
                  <h1 class="h1 t"${A('headline')} style="margin:0 0 16px;font-family:${H};font-size:44px;line-height:50px;font-weight:800;letter-spacing:-1px;color:${v.text};">${rich(f.headline)}</h1>
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 26px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              ${on.showCode && f.code ? `<tr>
                <td class="px" align="center" style="padding:0 48px 22px;font-family:${B};text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td align="center" style="padding:14px 28px;border:2px dashed ${v.brand};border-radius:12px;">
                      ${f.codeLabel ? `<span class="m"${A('codeLabel')} style="display:block;font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:${v.muted};">${rich(f.codeLabel)}</span>` : ''}
                      <span${A('code')} style="display:block;font-family:'Courier New',Courier,monospace;font-size:28px;line-height:36px;font-weight:700;letter-spacing:3px;color:${v.brand};">${rich(f.code)}</span>
                    </td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 34px;font-family:${B};text-align:center;">
                  ${f.deadline ? `<p class="t"${A('deadline')} style="margin:0 0 22px;font-size:14px;line-height:20px;font-weight:700;color:${v.text};">&#9200; ${rich(f.deadline)}</p>` : ''}
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H, width: 260, height: 54, attrs: A('ctaText') })}</td></tr></table>` : ''}
                </td>
              </tr>
              ${on.showPicks && ps.length ? `<tr>
                <td class="px" style="padding:0 48px 30px;font-family:${B};">
                  ${f.picksTitle ? `<p class="t"${A('picksTitle')} style="margin:0 0 14px;font-family:${H};font-size:18px;line-height:24px;font-weight:700;color:${v.text};text-align:center;">${rich(f.picksTitle)}</p>` : ''}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${ps.map((p, i) => `<td class="stack${i < ps.length - 1 ? ' stack-pad' : ''}" width="${Math.floor(100 / ps.length)}%" valign="top" style="padding:${ps.length > 1 ? (i === 0 ? '0 8px 0 0' : '0 0 0 8px') : '0'};">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1c1c1c;border-radius:12px;">
                        <tr><td style="padding:20px;font-family:${B};">
                          <p style="margin:0 0 8px;font-size:15px;line-height:22px;font-weight:700;"><a${A(`p${p.n}Name`)} href="${safeUrl(p.url)}" target="_blank" class="t" style="color:${v.text};text-decoration:none;">${rich(p.name)}</a></p>
                          <p style="margin:0 0 12px;font-size:15px;line-height:22px;">${p.was ? `<span class="m"${A(`p${p.n}Was`)} style="color:${v.muted};text-decoration:line-through;">${rich(p.was)}</span> &nbsp;` : ''}<span${A(`p${p.n}Now`)} style="color:${v.brand};font-weight:800;">${rich(p.now)}</span></p>
                          <a${A(`p${p.n}Url`)} href="${safeUrl(p.url)}" target="_blank" style="font-size:14px;line-height:20px;font-weight:700;color:${v.brand};text-decoration:none;">Shop now &rarr;</a>
                        </td></tr>
                      </table>
                    </td>`).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : ''}
              ${f.fineprint ? `<tr>
                <td class="px" align="center" style="padding:0 48px 36px;font-family:${B};text-align:center;">
                  <p class="m"${A('fineprint')} style="margin:0;font-size:12px;line-height:18px;color:${v.muted};">${escBr(f.fineprint)}</p>
                </td>
              </tr>` : ''}`;
    // Footer and header text sit on the light page, so they use dark grey
    const footerC = { ...c, v: { ...v, muted: '#57534e' } };
    return emailShell(c, {
      card,
      header,
      footer: footerHtml(footerC),
      darkCss: '    .hd{color:#fafafa !important;}',
    });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.eyebrow, f.headline.toUpperCase(), '', wrapText(f.intro), ''];
    if (on.showCode && f.code) out.push(`${f.codeLabel}: ${f.code}`, '');
    if (f.deadline) out.push(f.deadline, '');
    if (f.ctaText) out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showPicks) {
      const ps = picks(f);
      if (ps.length) out.push(f.picksTitle, ...ps.map(p => `${p.name}: ${p.was ? `${p.was} -> ` : ''}${p.now} ${safeUrl(p.url)}`), '');
    }
    if (f.fineprint) out.push(wrapText(f.fineprint), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
