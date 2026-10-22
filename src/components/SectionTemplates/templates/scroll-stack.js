import { IMG } from './meta.js';

export default {
  id: 'scroll-stack',
  name: 'Stacking Cards',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'highlights',
  tags: ['scroll', 'stacking cards', 'sticky cards', 'pinned', 'features', 'gsap', 'light'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Stacking Cards on Scroll Section — Free GSAP HTML Template',
  seoDescription: 'Free stacking cards section: each card pins as you scroll and the next slides over it while earlier cards shrink and dim. GSAP ScrollTrigger; export HTML.',
  description: 'Feature or service cards that stack up as you scroll. On larger screens each card pins a little below the one before, the next card slides over it, and the covered cards shrink and dim, so the section reads like a deck being dealt. Each card has an icon, label, title, text and an optional image. Without JavaScript and on phones the cards form a normal column.',
  bestFor: ['Feature highlights for a product or app', 'Services or packages, one per card', 'Values, principles or a short process'],
  behaviors: ['stack'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Why teams switch' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Everything your team needs, *card by card*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Scroll down and each card settles on top of the last.' },
  ],
  lists: [{
    key: 'cards', group: 'items', label: 'Cards', itemLabel: 'Card', titleKey: 'title', min: 2, max: 6,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'sparkles' },
      { key: 'label', label: 'Label (optional)', type: 'text', value: 'Feature' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new card' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'A sentence about this card.' },
      { key: 'image', label: 'Image (optional)', type: 'image', value: '', upload: { name: 'card', maxW: 1200 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
    ],
    value: [
      { icon: 'layout-dashboard', label: 'Plan', title: 'Boards that keep everyone aligned', text: 'Roadmaps, sprints and backlogs in one place, with owners and dates that never go stale.', image: IMG('hero-dashboard.png'), imageAlt: 'Project board' },
      { icon: 'users', label: 'Collaborate', title: 'Feedback where the work lives', text: 'Comment on tasks, mention teammates and decide in the thread instead of another meeting.', image: IMG('feature-collab.png'), imageAlt: 'Comments on a task' },
      { icon: 'zap', label: 'Automate', title: 'Rules that do the busywork', text: 'Move tasks, assign reviewers and post updates automatically when work changes.', image: IMG('feature-automation.png'), imageAlt: 'Automation rules' },
      { icon: 'trending-up', label: 'Report', title: 'Progress you can share in a click', text: 'Live charts and a weekly summary replace the status spreadsheet for good.', image: IMG('feature-analytics.png'), imageAlt: 'Progress charts' },
    ],
  }],
  theme: { brand: '#0d9488', brandText: '#ffffff', bg: '#f6faf9', surface: '#ffffff', text: '#0f1f1c', muted: '#4b5f5a', radius: '22' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="sk-list" data-stack data-list="cards">
    <article class="sk-card">
      <div class="sk-inner">
        <div class="sk-copy">
          <span class="st-icon" data-icon="icon"></span>
          <span class="sk-label" data-edit="label"></span>
          <h3 class="sk-title" data-edit="title"></h3>
          <p class="sk-text" data-edit="text"></p>
        </div>
        <img class="sk-img" data-image="image" data-optional alt="" width="1200" height="900" loading="lazy">
      </div>
    </article>
  </div>
</div>`,
  css: `.st-scroll-stack{padding:clamp(64px,8cqi,112px) 0}
.sk-list{display:flex;flex-direction:column;gap:clamp(20px,3cqi,32px);max-width:1040px;margin:0 auto}
.sk-inner{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(20px,3cqi,44px);align-items:center;min-height:min(62vh,500px);padding:clamp(24px,3.5cqi,52px);border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);box-shadow:0 40px 70px -48px rgba(0,0,0,.45);transform-origin:50% 0}
.sk-card:nth-child(3n+2) .sk-inner{background:color-mix(in srgb,var(--st-brand) 9%,var(--st-surface))}
.sk-card:nth-child(3n) .sk-inner{background:color-mix(in srgb,var(--st-text) 92%,var(--st-brand));color:var(--st-bg)}
.sk-card:nth-child(3n) .sk-title{color:var(--st-bg)}
.sk-card:nth-child(3n) .sk-text{color:color-mix(in srgb,var(--st-bg) 72%,transparent)}
.sk-copy{display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.sk-label{font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--st-brand)}
.sk-title{font-size:clamp(24px,1.6cqi + 14px,36px);line-height:1.1}
.sk-text{color:var(--st-muted);font-size:17px;max-width:30em}
.sk-img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:calc(var(--st-radius) * .8px);background:color-mix(in srgb,var(--st-text) 6%,transparent)}
.sk-inner:not(:has(.sk-img)){grid-template-columns:1fr;min-height:0}
@container st (max-width:760px){.sk-inner{grid-template-columns:1fr;min-height:0}}`,
};
