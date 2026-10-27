export default {
  id: 'streaming-links',
  name: 'Streaming Links Bar',
  version: '1.0.0',
  category: 'music',
  anchor: 'streaming',
  tags: ['music', 'streaming', 'spotify', 'apple music', 'youtube', 'bandcamp', 'links', 'listen', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'Streaming Links Bar Section — Free Spotify & Music Buttons',
  seoDescription: 'Free streaming links section: a row of big "Listen on" buttons for Spotify, Apple Music, YouTube, Bandcamp and more, with a heading. Edit online; export HTML.',
  description: 'A clear row of "Listen on" buttons for the places your music lives: Spotify, Apple Music, YouTube, Bandcamp, SoundCloud or anywhere else. Each button has a small "Listen on" label, the platform name and an arrow, and they wrap neatly on phones. Use it under a hero, in a footer area or on its own on a links page.',
  bestFor: ['Artist and band websites', 'Link-in-bio and press pages', 'Podcasts, labels and radio shows'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Platforms' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Stream everywhere' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Listen *wherever you listen*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Every song, every album and the live sessions, on your favourite platform.' },
  ],
  lists: [{
    key: 'platforms', group: 'items', label: 'Platforms', itemLabel: 'Platform', titleKey: 'name', min: 1, max: 8,
    fields: [
      { key: 'small', label: 'Small label', type: 'text', value: 'Listen on' },
      { key: 'name', label: 'Platform', type: 'text', value: 'Spotify' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { small: 'Listen on', name: 'Spotify', url: '#' },
      { small: 'Listen on', name: 'Apple Music', url: '#' },
      { small: 'Watch on', name: 'YouTube', url: '#' },
      { small: 'Buy on', name: 'Bandcamp', url: '#' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '16' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="sl-list" data-list="platforms">
    <li class="sl-item" data-anim="item"><a class="sl-btn" data-href="url"><span class="sl-text"><small data-edit="small"></small><strong data-edit="name"></strong></span><span class="sl-arrow" aria-hidden="true">&#8599;</span></a></li>
  </ul>
</div>`,
  css: `.st-streaming-links{padding:clamp(56px,7cqi,96px) 0}
.sl-list{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:clamp(10px,1.4cqi,16px)}
.sl-btn{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:76px;padding:14px 20px;color:var(--st-text);text-decoration:none;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);transition:transform .25s ease,border-color .25s ease,background .25s ease}
.sl-btn:hover,.sl-btn:focus-visible{transform:translateY(-4px);border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 10%,var(--st-surface));outline:none}
.sl-text{display:flex;flex-direction:column;gap:2px}
.sl-text small{font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--st-muted)}
.sl-text strong{font:700 clamp(18px,.8cqi + 14px,22px)/1.2 var(--st-font-heading)}
.sl-arrow{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 18%,transparent);color:var(--st-brand);font-size:17px;transition:background .25s,color .25s,transform .25s}
.sl-btn:hover .sl-arrow,.sl-btn:focus-visible .sl-arrow{background:var(--st-brand);color:var(--st-btn-text);transform:rotate(45deg)}`,
};
