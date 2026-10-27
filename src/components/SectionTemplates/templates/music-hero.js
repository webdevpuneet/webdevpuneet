import { IMG } from './meta.js';

export default {
  id: 'music-hero',
  name: 'Music Artist Hero',
  version: '1.0.0',
  category: 'music',
  anchor: '',
  tags: ['music', 'hero', 'artist', 'band', 'album', 'streaming', 'dj', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'Music Artist Hero Section — Free Band Website HTML Template',
  seoDescription: 'Free music hero section for bands and artists: full-width photo, huge name, new release pill, listen buttons and streaming links. Edit online and export HTML.',
  description: 'The top of a band or artist website: your photo fills the screen under a dark gradient, the artist name is set huge, a small pill announces the new release, two buttons lead to the music and the tour, and a row of streaming links sits underneath. A quiet equalizer along the bottom edge moves gently and stops for visitors who prefer reduced motion.',
  bestFor: ['Bands, solo artists and DJs', 'Album and single launches', 'Producers, labels and music collectives'],

  groups: [
    { id: 'media', label: 'Background photo' },
    { id: 'main', label: 'Name & text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'links', label: 'Streaming links', toggle: 'showLinks' },
  ],
  fields: [
    { key: 'image', group: 'media', label: 'Background photo', type: 'image', value: IMG('tpl-music.jpg'), hint: 'A wide photo of the artist or a stage (at least 1920×1080 px). The gradient keeps the text readable.', upload: { name: 'background', maxW: 2400, mime: 'image/jpeg' } },
    { key: 'imageAlt', group: 'media', label: 'Photo description (alt text)', type: 'text', value: 'The band on stage under cyan and pink spotlights', hint: 'Describe the photo for screen readers and search engines.' },
    { key: 'pill', group: 'main', label: 'Release pill (optional)', type: 'text', value: 'New album · Out 14 November' },
    { key: 'name', group: 'main', label: 'Artist or band name', type: 'textarea', value: 'Velvet\n*Static*' },
    { key: 'tagline', group: 'main', label: 'Tagline', type: 'textarea', value: 'Dream-pop from Lisbon with big drums, late-night synths and songs made to be sung back.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Listen now' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: '#music' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Tour dates' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: '#tour' },
  ],
  lists: [{
    key: 'links', group: 'links', label: 'Streaming links', itemLabel: 'Link', titleKey: 'label', min: 1, max: 6,
    fields: [
      { key: 'label', label: 'Name', type: 'text', value: 'Spotify' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { label: 'Spotify', url: '#' },
      { label: 'Apple Music', url: '#' },
      { label: 'YouTube', url: '#' },
      { label: 'Bandcamp', url: '#' },
    ],
  }],
  toggles: [{ key: 'showLinks', label: 'Streaming links', value: true }],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '999' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="mh-bg" data-bg="image" role="img" aria-label="Artist photo" data-set="aria-label:imageAlt"></div>
<div class="mh-shade" aria-hidden="true"></div>
<div class="mh st-wrap">
  <span class="mh-pill" data-anim="item" data-show-if="pill"><i class="mh-dot" aria-hidden="true"></i><span data-edit="pill"></span></span>
  <h1 class="mh-name" data-anim="item" data-anim-text data-edit="name"></h1>
  <p class="st-lead mh-tag" data-anim="item" data-edit="tagline"></p>
  <div class="st-btns" data-anim="item">
    <a class="st-btn" data-href="cta1Url"><span data-edit="cta1"></span></a>
    <a class="st-btn st-btn--ghost mh-ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
  </div>
  <ul class="mh-links" data-anim="item" data-show="showLinks" data-list="links" aria-label="Listen on">
    <li><a class="mh-link" data-href="url"><span data-edit="label"></span></a></li>
  </ul>
</div>
<div class="mh-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  css: `.st-music-hero{min-height:min(92vh,820px);display:flex;align-items:stretch;background:var(--st-bg);overflow:hidden}
.mh-bg{position:absolute;inset:0;background-size:cover;background-position:center}
.mh-shade{position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb,var(--st-bg) 92%,transparent) 0%,color-mix(in srgb,var(--st-bg) 60%,transparent) 55%,color-mix(in srgb,var(--st-bg) 20%,transparent) 100%),linear-gradient(0deg,var(--st-bg),transparent 55%)}
.mh{position:relative;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:22px;padding-top:clamp(96px,12cqi,160px);padding-bottom:clamp(64px,9cqi,120px)}
.mh-pill{display:inline-flex;align-items:center;gap:10px;padding:7px 16px 7px 12px;border-radius:999px;border:1px solid color-mix(in srgb,var(--st-brand) 55%,transparent);background:color-mix(in srgb,var(--st-bg) 55%,transparent);backdrop-filter:blur(8px);font-size:13.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--st-brand)}
.mh-dot{width:8px;height:8px;border-radius:50%;background:var(--st-brand);box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 70%,transparent);animation:mh-pulse 2s infinite}
@keyframes mh-pulse{70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}
.mh-name{font-size:clamp(64px,11cqi + 8px,168px);line-height:.88;letter-spacing:-.03em;text-transform:uppercase}
.mh-tag{color:var(--st-muted);max-width:30em}
.mh-ghost{color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 50%,transparent);backdrop-filter:blur(6px)}
.mh-links{list-style:none;display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:8px}
.mh-link{font-size:14.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--st-muted);text-decoration:none;border-bottom:2px solid transparent;padding-bottom:2px;transition:color .2s,border-color .2s}
.mh-link:hover,.mh-link:focus-visible{color:var(--st-brand);border-color:var(--st-brand);outline:none}
.mh-eq{position:absolute;left:0;right:0;bottom:0;height:clamp(40px,6cqi,72px);display:flex;align-items:flex-end;gap:clamp(3px,.6cqi,8px);padding:0 clamp(12px,2cqi,28px);opacity:.55;pointer-events:none}
.mh-eq i{flex:1;height:100%;border-radius:3px 3px 0 0;background:linear-gradient(0deg,var(--st-brand),transparent);transform-origin:50% 100%;animation:mh-eq 1.6s ease-in-out infinite}
.mh-eq i:nth-child(3n+1){animation-duration:1.2s;animation-delay:-.3s}
.mh-eq i:nth-child(3n+2){animation-duration:1.9s;animation-delay:-.9s}
.mh-eq i:nth-child(5n){animation-duration:1.4s;animation-delay:-.6s}
@keyframes mh-eq{0%,100%{transform:scaleY(.18)}50%{transform:scaleY(1)}}
@media (prefers-reduced-motion:reduce){.mh-eq i{animation:none;transform:scaleY(.4)}.mh-dot{animation:none}}
@container st (max-width:640px){.mh-shade{background:linear-gradient(0deg,var(--st-bg) 8%,color-mix(in srgb,var(--st-bg) 55%,transparent))}}`,
};
