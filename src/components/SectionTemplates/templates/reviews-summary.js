/* Reviews summary: the average rating and a five-bar breakdown (worked out from the review counts
   typed in), review cards, and a filter: clicking a bar shows only those reviews. The rating and
   the reviews are also written as schema.org data (AggregateRating and Review). Behaviour: `revfilter`. */
import { IMG } from './meta.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const num = v => parseInt(String(v ?? '').replace(/[^\d]/g, ''), 10) || 0;
/** { total, avg } from the five breakdown rows (stars + number of reviews) */
const totals = bars => {
  let total = 0, sum = 0;
  for (const b of bars || []) { const n = num(b.count), s = Math.min(5, Math.max(1, num(b.stars) || 1)); total += n; sum += n * s; }
  return { total, avg: total ? sum / total : 0 };
};
const group = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const STAR = '★★★★★';
const TYPES = [['Product', 'Product'], ['LocalBusiness', 'Local business'], ['Organization', 'Organization'], ['Service', 'Service'], ['SoftwareApplication', 'App or software'], ['Course', 'Course'], ['Book', 'Book']];

export default {
  id: 'reviews-summary',
  name: 'Reviews Summary & Rating',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['reviews', 'ratings', 'stars', 'trust', 'ecommerce', 'product', 'local business', 'filter', 'aggregate rating', 'light'],
  created: '2026-10-31',
  updated: '2026-10-31',
  seoTitle: 'Reviews Summary Section — Free Star Rating & Reviews HTML',
  seoDescription: 'Free reviews section: the average star rating, a breakdown by stars that filters the review cards, plus AggregateRating and Review data for search engines.',
  description: 'The trust block shops and local businesses need: a big average rating with stars, “based on 1,284 reviews”, and a five-bar breakdown by stars worked out from the counts you type in. Click a bar and only the reviews with that rating stay on screen. Each review card has stars, a title, the text, the reviewer and a “Verified purchase” label. The rating and the reviews are also written as schema.org AggregateRating and Review data, so search engines can read them. Texts, labels and the filter wording are all editable, so it works in any language.',
  bestFor: ['Online stores, product pages and product landing pages', 'Clinics, restaurants, salons and other local businesses', 'Apps, courses and books showing their ratings'],
  behaviors: ['revfilter'],
  /* Fills in what is worked out from the counts: the average, the total, the star widths and every
     review's stars, and gives each rating its accessible name. */
  finalize: (html, state) => {
    const { total, avg } = totals(state.lists?.bars);
    const rated = String(state.fields?.ratedLabel || 'Rated {n} out of 5').replace(/"/g, '&quot;');
    const shown = v => String(Math.round(Math.min(5, Math.max(0, parseFloat(v) || 0)) * 10) / 10);
    return html
      .replace(' data-avg></span>', `>${avg.toFixed(1)}</span>`)
      .replace(' data-total></span>', `>${group(total)}</span>`)
      .replace(' data-avg-stars', ` data-r="${avg.toFixed(1)}"`)
      .replace(/ data-n="([^"]*)"/g, (m, v) => ` style="--w:${total ? Math.round((num(v) / total) * 100) : 0}%"`)
      .replace(/ data-r="([^"]*)"/g, (m, v) => ` style="--r:${shown(v)}" role="img" aria-label="${rated.replace('{n}', shown(v))}"`);
  },
  schema: state => {
    const f = state.fields || {};
    const name = plain(f.itemName);
    const { total, avg } = totals(state.lists?.bars);
    if (!name || !total) return null;
    const reviews = (state.lists?.reviews || []).filter(r => plain(r.text) && plain(r.name) && parseFloat(r.rating) > 0);
    return {
      '@context': 'https://schema.org',
      '@type': TYPES.some(([v]) => v === f.itemType) ? f.itemType : 'Product',
      name,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: avg.toFixed(1), reviewCount: String(total), bestRating: '5', worstRating: '1' },
      ...(reviews.length && {
        review: reviews.map(r => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: plain(r.name) },
          reviewRating: { '@type': 'Rating', ratingValue: String(parseFloat(r.rating)), bestRating: '5', worstRating: '1' },
          ...(plain(r.title) && { name: plain(r.title) }),
          reviewBody: plain(r.text),
        })),
      }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'what', label: 'What is being rated (for search engines)' },
    { id: 'bars', label: 'Rating breakdown' },
    { id: 'items', label: 'Review cards' },
    { id: 'labels', label: 'Words and filter' },
    { id: 'cta', label: 'Write a review button' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Reviews' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Customers rate us *4.7 out of 5*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Every review below comes from a verified purchase. Tap a bar to read only the reviews with that rating.' },

    { key: 'itemName', group: 'what', label: 'Name of the thing rated', type: 'text', value: 'Sona One headphones', hint: 'Written into the page as AggregateRating and Review data. Leave empty to leave it out.' },
    { key: 'itemType', group: 'what', label: 'Type', type: 'choice', options: TYPES, value: 'Product', hint: 'Google shows star ratings for products, apps, books and courses. For a business rating your own reviews it usually ignores them, so use this mainly for products.' },

    { key: 'countLabel', group: 'labels', label: 'Text after the total', type: 'text', value: 'verified reviews' },
    { key: 'ratedLabel', group: 'labels', label: 'Star rating description (screen readers)', type: 'text', value: 'Rated {n} out of 5', hint: 'Use {n} where the rating goes.' },
    { key: 'barLabel', group: 'labels', label: 'Bar button description (screen readers)', type: 'text', value: 'Show only {s}-star reviews', hint: 'Use {s} where the number of stars goes.' },
    { key: 'filterText', group: 'labels', label: 'Filter message', type: 'text', value: 'Showing {n} of {t} reviews rated {s} stars', hint: 'Use {n} for the shown reviews, {t} for all of them and {s} for the stars.' },
    { key: 'clearLabel', group: 'labels', label: 'Clear filter button', type: 'text', value: 'Show all reviews' },

    { key: 'writeLabel', group: 'cta', label: 'Button text (optional)', type: 'text', value: 'Write a review' },
    { key: 'writeUrl', group: 'cta', label: 'Button link', type: 'url', value: '#review' },
  ],
  lists: [
    {
      key: 'bars', group: 'bars', label: 'Stars', itemLabel: 'Row', titleKey: 'stars', min: 5, max: 5,
      fields: [
        { key: 'stars', label: 'Stars', type: 'text', value: '5' },
        { key: 'count', label: 'Number of reviews', type: 'text', value: '0', hint: 'The average, the total and the bar lengths are worked out from these five numbers.' },
      ],
      value: [
        { stars: '5', count: '986' },
        { stars: '4', count: '214' },
        { stars: '3', count: '52' },
        { stars: '2', count: '18' },
        { stars: '1', count: '14' },
      ],
    },
    {
      key: 'reviews', group: 'items', label: 'Reviews', itemLabel: 'Review', titleKey: 'name', min: 1, max: 12,
      fields: [
        { key: 'avatar', label: 'Photo (optional)', type: 'image', value: '', upload: { name: 'reviewer', maxW: 200 } },
        { key: 'name', label: 'Name', type: 'text', value: 'Reviewer' },
        { key: 'rating', label: 'Rating (1 to 5)', type: 'text', value: '5', hint: 'Whole numbers, or halves such as 4.5.' },
        { key: 'date', label: 'Date', type: 'text', value: 'October 2026' },
        { key: 'title', label: 'Title (optional)', type: 'text', value: '' },
        { key: 'text', label: 'Review', type: 'textarea', value: 'What the customer said.' },
        { key: 'badge', label: 'Label (optional)', type: 'text', value: 'Verified purchase' },
      ],
      value: [
        { avatar: IMG('avatar-1.jpg'), name: 'Priya S.', rating: '5', date: 'October 2026', title: 'Worth every penny', text: 'The noise cancelling is the best I have tried, and the battery really does last the whole week. I wear them on my commute every day.', badge: 'Verified purchase' },
        { avatar: IMG('avatar-4.jpg'), name: 'Daniel M.', rating: '5', date: 'September 2026', title: 'Comfortable for hours', text: 'Light, soft on the ears and the call quality is clear. I forget I am wearing them during long meetings.', badge: 'Verified purchase' },
        { avatar: IMG('avatar-2.jpg'), name: 'Amara O.', rating: '4', date: 'September 2026', title: 'Great sound, small niggle', text: 'Sound and fit are excellent. I would love a hard case in the box, but support sent me one when I asked.', badge: 'Verified purchase' },
        { avatar: IMG('avatar-6.jpg'), name: 'Lucas R.', rating: '5', date: 'August 2026', title: '', text: 'Paired in seconds with my phone and laptop and switches between them without fuss.', badge: 'Verified purchase' },
        { avatar: IMG('avatar-5.jpg'), name: 'Hannah K.', rating: '3', date: 'August 2026', title: 'Good, not perfect', text: 'Lovely build and sound, but the controls took me a while to learn. Fine once I got used to them.', badge: 'Verified purchase' },
        { avatar: IMG('avatar-8.jpg'), name: 'Tomás V.', rating: '5', date: 'July 2026', title: 'A gift she loved', text: 'Bought these for my partner and she has not taken them off since. Arrived two days early, nicely packed.', badge: 'Verified purchase' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#d97706', brandText: '#ffffff', bg: '#ffffff', surface: '#faf7f2', text: '#1f2430', muted: '#5b6272', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="rs" data-revfilter data-set="data-filter-text:filterText;data-clear-label:clearLabel">
    <aside class="rs-sum" data-anim="item">
      <p class="rs-score"><span class="rs-avg" data-avg></span><span class="rs-of">/5</span></p>
      <span class="rs-stars rs-stars--big" data-avg-stars>${STAR}</span>
      <p class="rs-count"><span data-total></span> <span data-edit="countLabel"></span></p>
      <ul class="rs-bars" data-list="bars">
        <li class="rs-bar">
          <button type="button" class="rs-barbtn" data-filter-star aria-pressed="false" data-set="data-star:stars;aria-label:barLabel">
            <span class="rs-lab"><span data-edit="stars"></span>★</span>
            <span class="rs-track"><span class="rs-fill" data-set="data-n:count"></span></span>
            <span class="rs-n" data-edit="count"></span>
          </button>
        </li>
      </ul>
      <a class="st-btn" data-show-if="writeLabel" data-href="writeUrl"><span data-edit="writeLabel"></span></a>
    </aside>
    <div class="rs-main">
      <p class="rs-status" data-filter-status role="status" hidden><span data-filter-message></span> <button type="button" class="rs-clear" data-filter-clear></button></p>
      <ul class="rs-list" data-list="reviews">
        <li class="rs-card" data-anim="item" data-set="data-rating:rating">
          <div class="rs-top"><span class="rs-stars" data-set="data-r:rating">${STAR}</span><span class="rs-date" data-edit="date"></span></div>
          <h3 class="rs-title" data-show-if="title" data-edit="title"></h3>
          <p class="rs-text" data-edit="text"></p>
          <div class="rs-by">
            <img class="rs-av" data-image="avatar" data-optional alt="">
            <span class="rs-name" data-edit="name"></span>
            <span class="rs-badge" data-show-if="badge"><span aria-hidden="true">✓</span> <span data-edit="badge"></span></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>`,
  css: `.st-reviews-summary{padding:clamp(64px,8cqi,112px) 0}
.rs{display:grid;grid-template-columns:minmax(260px,.42fr) minmax(0,1fr);gap:clamp(22px,3.4cqi,48px);align-items:start}
.rs-sum{position:sticky;top:24px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:clamp(22px,2.6cqi,32px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.rs-score{display:flex;align-items:baseline;gap:6px}
.rs-avg{font:800 clamp(52px,6cqi,72px)/1 var(--st-font-heading);letter-spacing:-.03em}
.rs-of{color:var(--st-muted);font-size:20px;font-weight:600}
.rs-stars{--star:#f59e0b;--empty:color-mix(in srgb,var(--st-text) 18%,transparent);display:inline-block;font-size:18px;line-height:1;letter-spacing:1px;white-space:nowrap;background:linear-gradient(90deg,var(--star) calc(var(--r,0) / 5 * 100%),var(--empty) 0);-webkit-background-clip:text;background-clip:text;color:transparent}
.rs-stars--big{font-size:26px}
.rs-count{color:var(--st-muted);font-size:15px;margin-bottom:8px}
.rs-count span:first-child{color:var(--st-text);font-weight:700}
.rs-bars{list-style:none;display:grid;gap:4px;width:100%;margin-bottom:12px}
.rs-barbtn{display:grid;grid-template-columns:34px 1fr 44px;align-items:center;gap:10px;width:100%;padding:7px 8px;border:1px solid transparent;border-radius:10px;background:transparent;color:inherit;font:inherit;font-size:14px;text-align:left;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.rs-barbtn:hover{background:color-mix(in srgb,var(--st-text) 6%,transparent)}
.rs-barbtn:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 55%,transparent);outline-offset:1px}
.rs-barbtn[aria-pressed=true]{background:color-mix(in srgb,var(--st-brand) 12%,transparent);border-color:color-mix(in srgb,var(--st-brand) 50%,transparent)}
.rs-lab{font-weight:700;white-space:nowrap}
.rs-lab::after{content:""}
.rs-track{position:relative;height:9px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 11%,transparent);overflow:hidden}
.rs-fill{position:absolute;inset:0 auto 0 0;width:var(--w,0%);border-radius:99px;background:#f59e0b}
.rs-n{color:var(--st-muted);text-align:right;font-variant-numeric:tabular-nums}
.rs-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-bottom:14px;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--st-brand) 10%,transparent);font-size:14.5px;font-weight:600}
.rs-status[hidden]{display:none}
.rs-clear{padding:0;border:0;background:none;color:var(--st-brand);font:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.rs-list{list-style:none;display:grid;gap:clamp(12px,1.6cqi,18px)}
.rs-card[hidden]{display:none}
.rs-card{display:flex;flex-direction:column;gap:8px;padding:clamp(18px,2.2cqi,26px);border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.rs-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.rs-date{color:var(--st-muted);font-size:13.5px}
.rs-title{font-size:17.5px}
.rs-text{color:var(--st-muted);font-size:15.5px;line-height:1.65}
.rs-by{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:4px}
.rs-av{width:38px;height:38px;border-radius:50%;object-fit:cover;background:var(--st-surface)}
.rs-name{font-weight:700;font-size:15px}
.rs-badge{color:#15803d;font-size:13px;font-weight:600}
@container st (max-width:860px){.rs{grid-template-columns:1fr}.rs-sum{position:static}}`,
};
