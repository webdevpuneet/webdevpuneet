import { STARS_HTML, PERSON_HTML, PERSON_CSS, quoteFields, avatar } from './parts.js';

const card = `<figure class="tm-card">
        ${STARS_HTML}
        <blockquote class="tm-quote"><p data-edit="quote"></p></blockquote>
        <figcaption>${PERSON_HTML}</figcaption>
      </figure>`;

export default {
  id: 'testimonials-marquee',
  name: 'Testimonial Marquee',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['testimonials', 'marquee', 'infinite-scroll', 'reviews', 'animated', 'social-proof', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Testimonial Marquee — Free Infinite Scrolling Reviews',
  seoDescription: 'Free testimonial marquee: two rows of review cards scrolling endlessly in opposite directions and pausing on hover, animated with GSAP. Export HTML or React.',
  description: 'Two rows of testimonial cards that scroll endlessly in opposite directions under a centred heading, with soft fades at both edges. Hovering a row eases it to a stop so visitors can read; it loops seamlessly with GSAP and becomes a hand-scrollable row for people who prefer reduced motion.',
  bestFor: ['Homepages that need lots of social proof in little space', 'Product launches with many early reviews', 'Communities, courses and creator products'],
  behaviors: ['marquee'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'row1', label: 'Top row' },
    { id: 'row2', label: 'Bottom row', toggle: 'showRow2' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Reviews' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'People are *talking*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Over 10,000 creators use it to plan, publish and grow.' },
  ],
  lists: [
    {
      key: 'row1', group: 'row1', label: 'Top row testimonials', itemLabel: 'Testimonial', titleKey: 'name', min: 2, max: 10,
      fields: quoteFields(),
      value: [
        { quote: 'Finally a tool that gets out of my way. I plan a month of content in an hour.', name: 'Nora Quinn', role: 'Creator, 120k followers', avatar: avatar(5) },
        { quote: 'The scheduling alone saves me a full day every week.', name: 'Leo Martins', role: 'Podcaster', avatar: avatar(1) },
        { quote: 'Gorgeous, fast and the support team is incredible.', name: 'Zara Ahmed', role: 'Designer & educator', avatar: avatar(2) },
        { quote: 'My newsletter grew 3× after I started using the templates.', name: 'Ben Carter', role: 'Writer, The Weekly Brief', avatar: avatar(7) },
      ],
    },
    {
      key: 'row2', group: 'row2', label: 'Bottom row testimonials', itemLabel: 'Testimonial', titleKey: 'name', min: 2, max: 10,
      fields: quoteFields(),
      value: [
        { quote: 'I recommended it to my whole community. Nobody has asked for a refund.', name: 'Hana Sato', role: 'Course creator', avatar: avatar(8) },
        { quote: 'It replaced three subscriptions for me. Cheaper and better.', name: 'Omar Haddad', role: 'YouTuber', avatar: avatar(6) },
        { quote: 'The analytics finally make sense. I know what to post next.', name: 'Chloe Dubois', role: 'Brand strategist', avatar: avatar(3) },
        { quote: 'Simple enough for my team of one, powerful enough for my agency clients.', name: 'Ravi Shah', role: 'Freelance marketer', avatar: avatar(4) },
      ],
    },
  ],
  toggles: [
    { key: 'showRow2', label: 'Bottom row', value: true },
    { key: 'showStars', label: 'Star ratings', value: true },
  ],
  theme: { brand: '#f472b6', brandText: '#18181b', bg: '#111018', surface: '#1b1a24', text: '#f6f5fa', muted: '#a4a2b5', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
</div>
<div class="tm-rows" data-anim="media">
  <div class="tm-row" role="region" aria-label="Testimonials" tabindex="0">
    <div class="tm-track" data-marquee data-speed="38" data-list="row1">
      ${card}
    </div>
  </div>
  <div class="tm-row" data-show="showRow2" role="region" aria-label="More testimonials" tabindex="0">
    <div class="tm-track" data-marquee="reverse" data-speed="32" data-list="row2">
      ${card}
    </div>
  </div>
</div>`,
  css: `.st-testimonials-marquee{padding:clamp(64px,8cqi,112px) 0}
${PERSON_CSS}
.tm-rows{display:flex;flex-direction:column;gap:18px}
.tm-row{overflow-x:auto;scrollbar-width:none;-webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.tm-row::-webkit-scrollbar{display:none}
.tm-row.is-looping{overflow:hidden}
.tm-row:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:-3px}
.tm-track{display:flex;gap:18px;padding:0 18px 0 0;width:max-content}
.tm-row:not(.is-looping) .tm-track{padding-left:var(--st-pad)}
.tm-card{flex:none;width:340px;display:flex;flex-direction:column;gap:14px;margin:0;padding:22px 24px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.tm-quote{flex:1;font-size:16px;line-height:1.6}
.tm-card .st-stars{color:var(--st-brand)}
@container st (max-width:600px){.tm-card{width:280px}}`,
};
