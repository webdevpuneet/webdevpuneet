import { STARS_HTML, PERSON_HTML, PERSON_CSS, quoteFields, avatar } from './parts.js';

export default {
  id: 'testimonials-grid',
  name: 'Testimonial Wall',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['testimonials', 'reviews', 'masonry', 'grid', 'social-proof', 'saas', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Testimonials Section Template — Free Masonry Review Wall',
  seoDescription: 'Free testimonials section: a masonry wall of customer quotes with star ratings, photos, names and roles under a rating summary. Edit online; export the code.',
  description: 'A "wall of love" testimonials section: a heading with an overall rating summary, then customer quotes in a masonry layout where cards of different lengths fit together neatly. Each card has optional stars, the quote, and the person’s photo, name and role.',
  bestFor: ['SaaS and product social proof', 'Agencies and freelancers showing client feedback', 'Course, coaching and community reviews'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Testimonials' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Wall of love' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Loved by *teams everywhere*' },
    { key: 'lead', group: 'header', label: 'Rating summary (optional)', type: 'text', value: '★ 4.9 out of 5 from 2,300+ reviews' },
  ],
  lists: [{
    key: 'quotes', group: 'items', label: 'Testimonials', itemLabel: 'Testimonial', titleKey: 'name', min: 1, max: 12,
    fields: quoteFields(),
    value: [
      { quote: 'We moved four tools into one and our weekly status meeting went from an hour to fifteen minutes. The reports alone paid for it.', name: 'Maya Chen', role: 'Head of Product, Northwind', avatar: avatar(1) },
      { quote: 'Setup took one afternoon.', name: 'Daniel Okafor', role: 'CTO, Brightpath', avatar: avatar(2) },
      { quote: 'The automations are the real magic. New requests get triaged, assigned and announced in Slack without anyone touching them. I honestly don’t know how we worked before.', name: 'Sofia Martins', role: 'Engineering Manager, Lumen', avatar: avatar(3) },
      { quote: 'Clean, fast and our designers actually enjoy using it. That has never happened with a project tool.', name: 'James Patel', role: 'Design Lead, Fieldnote', avatar: avatar(4) },
      { quote: 'Support answered in under an hour, on a Sunday.', name: 'Emma Larsen', role: 'Founder, Tidewater', avatar: avatar(5) },
      { quote: 'We onboarded 80 people in a week. The templates meant every team started with a sensible setup instead of a blank page.', name: 'Aisha Bello', role: 'Operations Director, Kestrel', avatar: avatar(6) },
    ],
  }],
  toggles: [{ key: 'showStars', label: 'Star ratings', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#f8f9fc', surface: '#ffffff', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="tg-summary" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="tg-wall" data-list="quotes">
    <figure class="tg-card" data-anim="item">
      ${STARS_HTML}
      <blockquote class="tg-quote"><p data-edit="quote"></p></blockquote>
      <figcaption>${PERSON_HTML}</figcaption>
    </figure>
  </div>
</div>`,
  css: `.st-testimonials-grid{padding:clamp(64px,8cqi,112px) 0}
${PERSON_CSS}
.tg-summary{padding:6px 14px;border-radius:999px;background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);color:var(--st-muted);font-size:14.5px;font-weight:600}
.tg-summary:empty{display:none}
.tg-wall{columns:3 300px;column-gap:clamp(16px,2cqi,22px)}
.tg-card{break-inside:avoid;display:flex;flex-direction:column;gap:16px;margin:0 0 clamp(16px,2cqi,22px);padding:clamp(22px,2.4cqi,28px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);box-shadow:0 10px 30px -22px color-mix(in srgb,var(--st-text) 40%,transparent)}
.tg-quote{font-size:16.5px;line-height:1.65}
.tg-card:nth-child(3n+2){background:color-mix(in srgb,var(--st-brand) 6%,var(--st-surface))}`,
};
