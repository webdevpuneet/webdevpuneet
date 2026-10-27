import { IMG } from './meta.js';

export default {
  id: 'discography',
  name: 'Discography Grid',
  version: '1.0.0',
  category: 'music',
  anchor: 'music',
  tags: ['music', 'discography', 'albums', 'releases', 'cover art', 'singles', 'filter', 'vinyl', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'Discography Grid Section — Free Album Releases HTML Template',
  seoDescription: 'Free discography section: a grid of album, EP and single covers with year and link, filter chips by type and a vinyl that slides out on hover. Export HTML.',
  description: 'Your catalogue as a grid of cover art. Each release shows its cover, title, type, year and a listen link, and a vinyl record slides out from behind the cover on hover. Filter chips are built from the release types you write (Album, EP, Single, Live), so visitors can narrow the catalogue in one tap. Without JavaScript every release is simply shown.',
  bestFor: ['Bands, solo artists and producers', 'Record labels with a catalogue', 'Soundtracks, remixes and compilations'],
  behaviors: ['chips'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Releases' },
    { id: 'filters', label: 'Filters', toggle: 'showFilters' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Discography' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Albums, EPs *and singles*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Everything we have released so far, newest first. Pick a type or tap any cover to listen.' },
    { key: 'allLabel', group: 'filters', label: 'Label of the “show all” button', type: 'text', value: 'All' },
  ],
  lists: [{
    key: 'releases', group: 'items', label: 'Releases', itemLabel: 'Release', titleKey: 'title', min: 2, max: 24,
    fields: [
      { key: 'cover', label: 'Cover art', type: 'image', value: '', hint: 'A square image (about 1000×1000 px).', upload: { name: 'cover', maxW: 1000 } },
      { key: 'coverAlt', label: 'Alt text', type: 'text', value: '', hint: 'Describe the cover for screen readers and search engines.' },
      { key: 'tag', label: 'Type (used by the filters)', type: 'text', value: 'Album' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new release' },
      { key: 'year', label: 'Year', type: 'text', value: '2026' },
      { key: 'info', label: 'Extra info (optional)', type: 'text', value: '' },
      { key: 'button', label: 'Link text', type: 'text', value: 'Listen' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { cover: IMG('mus-cover-1.jpg'), coverAlt: 'Album cover with a pink sun rising over dark water', tag: 'Album', title: 'Static Hearts', year: '2026', info: '11 tracks', button: 'Listen', url: '#' },
      { cover: IMG('mus-cover-2.jpg'), coverAlt: 'Single cover with a glowing cyan circle on black', tag: 'Single', title: 'Lights Out in Lisbon', year: '2026', info: '3:42', button: 'Listen', url: '#' },
      { cover: IMG('mus-cover-3.jpg'), coverAlt: 'EP cover with overlapping violet and orange waves', tag: 'EP', title: 'Night Tram', year: '2025', info: '5 tracks', button: 'Listen', url: '#' },
      { cover: IMG('mus-cover-4.jpg'), coverAlt: 'Album cover with a grid of golden dots on deep blue', tag: 'Album', title: 'Paper Skies', year: '2024', info: '10 tracks', button: 'Listen', url: '#' },
      { cover: IMG('mus-cover-5.jpg'), coverAlt: 'Live album cover with stage lights in a crowd silhouette', tag: 'Live', title: 'Live at Coliseu', year: '2023', info: '14 tracks', button: 'Listen', url: '#' },
      { cover: IMG('mus-cover-3.jpg'), coverAlt: 'Single cover with overlapping violet and orange waves', tag: 'Single', title: 'Slow Fire', year: '2023', info: '3:18', button: 'Listen', url: '#' },
    ],
  }],
  toggles: [
    { key: 'showHeader', label: 'Heading', value: true },
    { key: 'showFilters', label: 'Filter chips', value: true },
    { key: 'showVinyl', label: 'Vinyl slides out on hover', value: true },
  ],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '12' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="dg-chips" data-chips-bar data-show="showFilters" data-set="data-all:allLabel" role="group" aria-label="Filter releases" hidden></div>
  <ul class="dg-grid" data-chips data-list="releases">
    <li class="dg-item" data-anim="item" data-set="data-tag:tag">
      <a class="dg-link" data-href="url">
        <span class="dg-art"><span class="dg-disc" data-show="showVinyl" aria-hidden="true"></span><img class="dg-cover" data-image="cover" alt="" width="1000" height="1000" loading="lazy"></span>
        <span class="dg-meta"><span class="dg-type" data-edit="tag"></span><strong class="dg-title" data-edit="title"></strong><span class="dg-sub"><span data-edit="year"></span><span class="dg-info" data-show-if="info" data-edit="info"></span></span><span class="dg-go" data-edit="button"></span></span>
      </a>
    </li>
  </ul>
</div>`,
  css: `.st-discography{padding:clamp(56px,7cqi,104px) 0}
.dg-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:clamp(24px,3cqi,40px)}
.dg-chips:empty{display:none}
.dg-chip{min-height:40px;padding:0 18px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:999px;background:transparent;color:var(--st-text);font:600 14.5px/1 var(--st-font-body);cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.dg-chip:hover{border-color:var(--st-brand);color:var(--st-brand)}
.dg-chip[aria-pressed="true"]{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.dg-chip:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px}
.dg-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:clamp(22px,3cqi,40px) clamp(16px,2cqi,28px)}
.dg-item[hidden]{display:none}
.dg-link{display:flex;flex-direction:column;gap:16px;color:inherit;text-decoration:none}
.dg-art{position:relative;display:block;aspect-ratio:1;margin-right:14%}
.dg-cover{position:relative;z-index:2;width:100%;height:100%;object-fit:cover;border-radius:calc(var(--st-radius) * .5px);background:var(--st-surface);box-shadow:0 18px 40px -18px rgba(0,0,0,.7);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.dg-disc{position:absolute;z-index:1;top:3%;left:6%;width:94%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,var(--st-brand) 0 9%,#0b0b10 9.5% 17%,transparent 17.5%),repeating-radial-gradient(circle,#232634 0 2px,#10121a 2px 4px);box-shadow:0 12px 28px -12px rgba(0,0,0,.8),0 0 0 2px color-mix(in srgb,var(--st-brand) 25%,transparent);transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.dg-item:hover .dg-disc,.dg-link:focus-visible .dg-disc{transform:translateX(24%) rotate(160deg)}
.dg-item:hover .dg-cover,.dg-link:focus-visible .dg-cover{transform:translateX(-4%)}
.dg-link:focus-visible{outline:3px solid var(--st-brand);outline-offset:6px;border-radius:calc(var(--st-radius) * 1px)}
.dg-meta{display:flex;flex-direction:column;gap:4px}
.dg-type{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.dg-title{font:700 clamp(18px,.8cqi + 14px,22px)/1.25 var(--st-font-heading)}
.dg-sub{display:flex;gap:10px;color:var(--st-muted);font-size:14.5px}
.dg-info::before{content:"\\00b7";margin-right:10px}
.dg-go{margin-top:6px;font-weight:700;font-size:14.5px;color:var(--st-text);border-bottom:2px solid var(--st-brand);align-self:flex-start;padding-bottom:2px}
@media (hover:none){.dg-disc{transform:translateX(18%)}.dg-cover{transform:translateX(-3%)}}
@media (prefers-reduced-motion:reduce){.dg-disc,.dg-cover{transition:none}}`,
};
