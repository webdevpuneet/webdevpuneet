import { escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, h1Html, textFooter, cleanText, buttonRow } from './shell.js';

const BOXES = [1, 2, 3];
const boxes = f => BOXES.map(n => ({ n, value: f[`cd${n}Value`], label: f[`cd${n}Label`] })).filter(b => String(b.value || '').trim());

export default {
  id: 'last-chance-sale',
  name: 'Last Chance Sale Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['last-chance', 'cyber-monday', 'final-hours', 'countdown', 'sale', 'promo-code', 'ecommerce', 'urgency'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Last Chance Sale Email Template — Free Cyber Monday HTML',
  seoDescription: 'Free last chance and Cyber Monday email template: final-hours banner, countdown boxes, promo code, "ends tonight" deadline and a shop button. Responsive HTML.',
  description: 'A final-hours sale reminder for Cyber Monday, the end of a Black Friday sale or any flash sale: an urgent banner, a big "ends tonight" headline, three countdown boxes (hours, minutes, items left or anything else), a promo code, a shop button and short reasons to buy now.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'banner', label: 'Top banner', toggle: 'showBanner' },
    { id: 'main', label: 'Offer & button' },
    { id: 'countdown', label: 'Countdown boxes', toggle: 'showCountdown' },
    { id: 'code', label: 'Promo code', toggle: 'showCode' },
    { id: 'reasons', label: 'Reasons to buy now', toggle: 'showReasons' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('⏰ Last chance: 40% off ends at midnight', 'Cyber Monday is your final chance to save 40% on everything. Code CYBER40 expires tonight.', 'Acme Store'),
    ...brandFields(),
    { key: 'banner', group: 'banner', label: 'Banner text', type: 'text', value: 'Final hours · Sale ends tonight at 11:59 PM ET' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Cyber Monday' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Last chance for 40% off everything' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'This is it, {{first_name}}. Our biggest sale of the year ends at midnight, and it won’t be back until next year. If something has been sitting in your cart, now is the time.' },
    { key: 'cd1Value', group: 'countdown', label: 'Box 1 value', type: 'text', value: '12' },
    { key: 'cd1Label', group: 'countdown', label: 'Box 1 label', type: 'text', value: 'Hours left' },
    { key: 'cd2Value', group: 'countdown', label: 'Box 2 value', type: 'text', value: '40%' },
    { key: 'cd2Label', group: 'countdown', label: 'Box 2 label', type: 'text', value: 'Off everything' },
    { key: 'cd3Value', group: 'countdown', label: 'Box 3 value', type: 'text', value: 'Free' },
    { key: 'cd3Label', group: 'countdown', label: 'Box 3 label', type: 'text', value: 'Shipping over $50' },
    { key: 'codeLabel', group: 'code', label: 'Code label', type: 'text', value: 'Use code at checkout' },
    { key: 'code', group: 'code', label: 'Promo code', type: 'text', value: 'CYBER40' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Shop before it ends' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/sale' },
    { key: 'reasonsTitle', group: 'reasons', label: 'Section title', type: 'text', value: 'Why shop today' },
    { key: 'reason1', group: 'reasons', label: 'Reason 1', type: 'text', value: 'Our lowest prices of the year, on every product' },
    { key: 'reason2', group: 'reasons', label: 'Reason 2', type: 'text', value: 'Order today and it arrives well before the holidays' },
    { key: 'reason3', group: 'reasons', label: 'Reason 3', type: 'text', value: 'Extended returns until January 31' },
    { key: 'fineprint', group: 'main', label: 'Fine print', type: 'textarea', value: 'Offer ends November 30, 2026 at 11:59 PM ET. Valid on full-price items at yoursite.com. Can’t be combined with other offers. Excludes gift cards.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you signed up for emails from Acme Store.' }),
  ],
  toggles: [
    { key: 'showBanner', label: 'Top banner', value: true },
    { key: 'showCountdown', label: 'Countdown boxes', value: true },
    { key: 'showCode', label: 'Promo code', value: true },
    { key: 'showReasons', label: 'Reasons to buy now', value: true },
  ],
  vars: DEFAULT_VARS('#dc2626'),
  fonts: { heading: 'poppins', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const bx = boxes(f);
    const reasons = [1, 2, 3].map(n => [f[`reason${n}`], `reason${n}`]).filter(([x]) => String(x || '').trim());
    const card = `
              ${on.showBanner && f.banner ? `<tr>
                <td align="center" style="padding:12px 24px;border-radius:16px 16px 0 0;background:${v.brand};font-family:${H};font-size:14px;line-height:20px;font-weight:700;letter-spacing:.3px;color:${v.btnText};text-align:center;"${A('banner')}>&#9200; ${rich(f.banner)}</td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:40px 48px 8px;font-family:${B};text-align:center;">
                  ${f.eyebrow ? `<p${A('eyebrow')} style="margin:0 0 10px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${v.brand};">${rich(f.eyebrow)}</p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 26px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              ${on.showCountdown && bx.length ? `<tr>
                <td class="px" style="padding:0 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    ${bx.map((b, i) => `<td width="${Math.floor(100 / bx.length)}%" valign="top" style="padding:0 ${i < bx.length - 1 ? 5 : 0}px 0 ${i > 0 ? 5 : 0}px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fef2f2;border-radius:12px;"><tr>
                        <td align="center" style="padding:16px 6px;font-family:${B};text-align:center;">
                          <span class="t"${A(`cd${b.n}Value`)} style="display:block;font-family:${H};font-size:30px;line-height:36px;font-weight:800;color:${v.text};">${rich(b.value)}</span>
                          <span class="m"${A(`cd${b.n}Label`)} style="display:block;font-size:12px;line-height:17px;font-weight:600;color:${v.muted};">${rich(b.label)}</span>
                        </td>
                      </tr></table>
                    </td>`).join('\n                    ')}
                  </tr></table>
                </td>
              </tr>` : ''}
              ${on.showCode && f.code ? `<tr>
                <td class="px" align="center" style="padding:0 48px 22px;font-family:${B};text-align:center;">
                  ${f.codeLabel ? `<p class="m"${A('codeLabel')} style="margin:0 0 8px;font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:${v.muted};">${rich(f.codeLabel)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    <td${A('code')} style="padding:10px 26px;border:2px dashed ${v.brand};border-radius:12px;font-family:'Courier New',Courier,monospace;font-size:26px;line-height:32px;font-weight:700;letter-spacing:3px;color:${v.brand};">${rich(f.code)}</td>
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 30px;text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0', width: 270, height: 54 })}
                </td>
              </tr>
              ${on.showReasons && reasons.length ? `<tr>
                <td class="px" style="padding:0 48px 26px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:24px 0 0;">
                    ${f.reasonsTitle ? `<p class="t"${A('reasonsTitle')} style="margin:0 0 12px;font-family:${H};font-size:17px;line-height:24px;font-weight:700;color:${v.text};">${rich(f.reasonsTitle)}</p>` : ''}
                    ${reasons.map(([x, key]) => `<p class="m" style="margin:0 0 8px;font-size:15px;line-height:23px;color:${v.muted};"><span style="color:${v.brand};font-weight:800;">&#10003;</span>&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                    ')}
                  </td></tr></table>
                </td>
              </tr>` : ''}
              ${f.fineprint ? `<tr>
                <td class="px" style="padding:0 48px 36px;font-family:${B};">
                  <p class="m"${A('fineprint')} style="margin:0;font-size:12px;line-height:18px;color:${v.muted};">${escBr(f.fineprint)}</p>
                </td>
              </tr>` : '<tr><td style="padding:0 0 12px;font-size:0;line-height:0;">&nbsp;</td></tr>'}`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, ''];
    if (on.showBanner && f.banner) out.push(f.banner.toUpperCase(), '');
    out.push(f.headline, '', wrapText(f.intro), '');
    if (on.showCountdown) out.push(boxes(f).map(b => `${b.value} ${b.label}`).join(' | '), '');
    if (on.showCode && f.code) out.push(`${f.codeLabel}: ${f.code}`, '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showReasons) {
      const r = [f.reason1, f.reason2, f.reason3].filter(Boolean);
      if (r.length) out.push(f.reasonsTitle, ...r.map(x => `- ${x}`), '');
    }
    if (f.fineprint) out.push(wrapText(f.fineprint), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
