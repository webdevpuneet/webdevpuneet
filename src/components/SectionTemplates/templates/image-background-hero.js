import { IMG } from './meta.js';

export default {
  id: 'image-background-hero',
  name: 'Image Background Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'background-image', 'photo', 'full-width', 'travel', 'agency', 'stats'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Hero Section With Background Image — Free HTML CSS Template',
  seoDescription: 'Free hero section with a full-width background image, dark overlay, headline, two buttons and a stats row. Upload a photo, edit online, export HTML, React, Vue.',
  description: 'A full-width hero with your photo as the background, a dark gradient overlay that keeps text readable, a small label, a large white headline, supporting text, two buttons and an optional row of three stats along the bottom.',
  bestFor: ['Travel, hospitality and real estate sites', 'Agencies, studios and photographers', 'Events, non-profits and local businesses'],

  groups: [
    { id: 'media', label: 'Background photo' },
    { id: 'main', label: 'Headline & text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'stats', label: 'Stats row', toggle: 'showStats' },
  ],
  fields: [
    { key: 'image', group: 'media', label: 'Background photo', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'A wide, high-resolution photo works best (at least 1920×1080 px). The overlay keeps text readable.', upload: { name: 'background', maxW: 2400, mime: 'image/jpeg' } },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Guided adventures since 2009' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'Find the trail\n*nobody else knows*' },
    { key: 'lead', group: 'main', label: 'Supporting text', type: 'textarea', value: 'Small-group hiking trips through the world’s quietest mountains, led by local guides who grew up there.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Explore trips' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://webdevpuneet.com/trips' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Watch the film' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://webdevpuneet.com/film' },
    { key: 's1Value', group: 'stats', label: 'Stat 1 value', type: 'text', value: '120+' },
    { key: 's1Label', group: 'stats', label: 'Stat 1 label', type: 'text', value: 'Routes in 14 countries' },
    { key: 's2Value', group: 'stats', label: 'Stat 2 value', type: 'text', value: '4.9★' },
    { key: 's2Label', group: 'stats', label: 'Stat 2 label', type: 'text', value: 'From 3,800 reviews' },
    { key: 's3Value', group: 'stats', label: 'Stat 3 value', type: 'text', value: '8 max' },
    { key: 's3Label', group: 'stats', label: 'Stat 3 label', type: 'text', value: 'Hikers per group' },
  ],
  toggles: [{ key: 'showStats', label: 'Stats row', value: true }],
  theme: { brand: '#f97316', brandText: '#ffffff', bg: '#1c0a03', surface: '#2a140a', text: '#ffffff', muted: '#f3e8df', radius: '999' },
  fonts: { heading: 'playfair', body: 'inter' },

  html: `<div class="ib-bg" data-bg="image" role="img" aria-label="Background photo"></div>
<div class="ib-shade" aria-hidden="true"></div>
<div class="ib st-wrap">
  <div class="ib-copy">
    <span class="st-eyebrow ib-eyebrow" data-anim="item" data-edit="eyebrow"></span>
    <h1 class="ib-title" data-anim="item" data-anim-text data-edit="headline"></h1>
    <p class="st-lead ib-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost ib-ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
  </div>
  <div class="ib-stats" data-anim="media" data-show="showStats">
    <div><strong data-edit="s1Value"></strong><span data-edit="s1Label"></span></div>
    <div><strong data-edit="s2Value"></strong><span data-edit="s2Label"></span></div>
    <div><strong data-edit="s3Value"></strong><span data-edit="s3Label"></span></div>
  </div>
</div>`,
  css: `.st-image-background-hero{min-height:min(88vh,760px);display:flex;align-items:stretch;background:var(--st-bg)}
.ib-bg{position:absolute;inset:0;background-size:cover;background-position:center}
.ib-shade{position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb,var(--st-bg) 88%,transparent) 0%,color-mix(in srgb,var(--st-bg) 55%,transparent) 55%,color-mix(in srgb,var(--st-bg) 15%,transparent) 100%),linear-gradient(0deg,color-mix(in srgb,var(--st-bg) 70%,transparent),transparent 45%)}
.ib{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:48px;padding-top:clamp(72px,10cqi,140px);padding-bottom:clamp(32px,4cqi,48px)}
.ib-copy{display:flex;flex-direction:column;align-items:flex-start;gap:22px;max-width:640px}
.ib-eyebrow{color:var(--st-brand)}
.ib-title{font-size:clamp(42px,5.6cqi + 10px,80px);line-height:1.02}
.ib-lead{color:var(--st-muted);max-width:32em}
.ib-ghost{color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 55%,transparent);backdrop-filter:blur(6px)}
.ib-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding-top:24px;border-top:1px solid color-mix(in srgb,var(--st-text) 22%,transparent)}
.ib-stats div{display:flex;flex-direction:column;gap:2px}
.ib-stats strong{font-family:var(--st-font-heading);font-size:clamp(26px,2.6cqi + 8px,38px);line-height:1.1;color:var(--st-text)}
.ib-stats span{font-size:14px;color:var(--st-muted)}
@container st (max-width:640px){.ib-stats{grid-template-columns:1fr}.ib-shade{background:color-mix(in srgb,var(--st-bg) 72%,transparent)}}`,
};
