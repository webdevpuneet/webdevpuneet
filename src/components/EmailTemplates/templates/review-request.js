import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, eyebrowHtml, h1Html, pHtml, textFooter, cleanText, IMG, buttonRow } from './shell.js';

const STARS = [1, 2, 3, 4, 5];
/* One link per star: the rating is appended to the link, e.g. …&rating=4 */
const starUrl = (base, n) => {
  const u = String(base || '').trim();
  return u ? `${u}${n}` : '#';
};

export default {
  id: 'review-request',
  name: 'Review Request Email',
  version: '1.0.0',
  category: 'ecommerce',
  tags: ['review-request', 'product-review', 'feedback', 'star-rating', 'ecommerce', 'shopify', 'store'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Review Request Email Template — Free HTML Star Rating Email',
  seoDescription: 'Free review request email template: product photo, clickable 1–5 star rating links, a Write a review button and an optional thank-you reward. Copy the HTML.',
  description: 'A post-purchase review request: the product photo and name, a friendly "how are you liking it?" headline, a row of five clickable stars that each open your review page with that rating, a "Write a review" button, an optional thank-you discount and a note on how reviews help.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'product', label: 'Product' },
    { id: 'main', label: 'Message & button' },
    { id: 'stars', label: 'Star rating', toggle: 'showStars' },
    { id: 'reward', label: 'Thank-you reward', toggle: 'showReward' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('How are you liking your Everyday Canvas Tote?', 'Tap a star to rate it. It takes 10 seconds and helps other shoppers choose.', 'Acme Store'),
    ...brandFields(),
    { key: 'productImg', group: 'product', label: 'Product image URL', type: 'url', value: IMG('product-tote.png'), hint: 'Square photos work best (shown at 160×160 px). Paste a hosted URL or upload.', upload: { name: 'product', maxW: 320, mime: 'image/jpeg' } },
    { key: 'productName', group: 'product', label: 'Product name', type: 'text', value: 'Everyday Canvas Tote' },
    { key: 'productMeta', group: 'product', label: 'Product details', type: 'text', value: 'Color: Sand · Delivered October 23' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'How did we do?' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'How are you liking it, {{first_name}}?' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Your order arrived a few days ago, and we’d love to know what you think. Your review helps other shoppers decide and helps us make better products.' },
    { key: 'starsLabel', group: 'stars', label: 'Prompt', type: 'text', value: 'Tap a star to rate it' },
    { key: 'ratingUrl', group: 'stars', label: 'Rating link (the star number is added at the end)', type: 'url', value: 'https://webdevpuneet.com/review?order=10482&rating=', hint: 'Each star links to this address plus its number, e.g. …&rating=5. Use your review platform’s link if it supports a rating parameter.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Write a review' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/review?order=10482' },
    { key: 'rewardText', group: 'reward', label: 'Reward text', type: 'text', value: 'As a thank-you, you’ll get 15% off your next order once your review is posted.' },
    { key: 'note', group: 'main', label: 'Closing note', type: 'textarea', value: 'Something not right with your order? Reply to this email and we’ll make it right before anything else.' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you bought from Acme Store.' }),
  ],
  toggles: [
    { key: 'showStars', label: 'Star rating', value: true },
    { key: 'showReward', label: 'Thank-you reward', value: true },
  ],
  vars: [
    ...DEFAULT_VARS('#b45309').slice(0, 2),
    { key: 'star', label: 'Stars', value: '#f59e0b', group: 'light' },
    ...DEFAULT_VARS('#b45309').slice(2),
  ],
  fonts: { heading: 'dmsans', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const starColor = v.star || '#f59e0b';
    const card = `
              <tr>
                <td class="px" align="center" style="padding:44px 48px 8px;font-family:${B};text-align:center;">
                  ${f.productImg ? `<img${A('productImg')} src="${safeUrl(f.productImg)}" width="160" height="160" alt="${esc(f.productName)}" style="display:block;margin:0 auto 14px;width:160px;height:160px;border:0;border-radius:16px;">` : ''}
                  ${f.productName ? `<p class="t"${A('productName')} style="margin:0;font-family:${H};font-size:16px;line-height:22px;font-weight:700;color:${v.text};">${rich(f.productName)}</p>` : ''}
                  ${f.productMeta ? `<p class="m"${A('productMeta')} style="margin:2px 0 26px;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.productMeta)}</p>` : '<div style="height:20px;line-height:20px;font-size:0;">&nbsp;</div>'}
                  ${eyebrowHtml(c, 'eyebrow', f.eyebrow)}
                  ${h1Html(c, 'headline', f.headline)}
                  ${pHtml(c, 'intro', f.intro, 'margin:0 0 24px;')}
                </td>
              </tr>
              ${on.showStars ? `<tr>
                <td class="px" align="center" style="padding:0 48px 24px;font-family:${B};text-align:center;">
                  ${f.starsLabel ? `<p class="m"${A('starsLabel')} style="margin:0 0 8px;font-size:13px;line-height:18px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:${v.muted};">${rich(f.starsLabel)}</p>` : ''}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                    ${STARS.map(n => `<td align="center" style="padding:0 3px;"><a${n === 1 ? A('ratingUrl') : ''} href="${safeUrl(starUrl(f.ratingUrl, n))}" target="_blank" title="${n} star${n > 1 ? 's' : ''}" style="display:block;font-size:40px;line-height:44px;color:${starColor};text-decoration:none;">&#9733;</a><span class="m" style="display:block;font-size:11px;line-height:14px;color:${v.muted};">${n}</span></td>`).join('')}
                  </tr></table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" align="center" style="padding:0 48px 8px;text-align:center;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { align: 'center', pad: '0 0 22px' })}
                  ${on.showReward && f.rewardText ? `<p class="t"${A('rewardText')} style="margin:0 0 26px;font-family:${B};font-size:14px;line-height:21px;font-weight:600;color:${v.text};">&#127873; ${rich(f.rewardText)}</p>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:22px 0 0;">
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};text-align:center;">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', `${f.productName}${f.productMeta ? ` (${f.productMeta})` : ''}`, '', f.headline, '', wrapText(f.intro), ''];
    if (on.showStars) out.push(f.starsLabel || 'Rate it:', ...STARS.map(n => `${n} star${n > 1 ? 's' : ''}: ${safeUrl(starUrl(f.ratingUrl, n))}`), '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showReward && f.rewardText) out.push(wrapText(f.rewardText), '');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
