import { IMG } from './meta.js';

export default {
  id: 'release-spotlight',
  name: 'New Release Spotlight',
  version: '1.0.0',
  category: 'music',
  anchor: 'new-release',
  tags: ['music', 'release', 'album', 'countdown', 'pre-save', 'single', 'launch', 'vinyl', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'New Release Spotlight Section — Free Album Countdown HTML',
  seoDescription: 'Free new release section: cover art with a spinning vinyl, a live countdown to release day, a tracklist and pre-save buttons. Becomes "Out now". Export HTML.',
  description: 'Put your newest album or single in the spotlight. A large cover sits in front of a slowly spinning vinyl, with the title, a short blurb, an optional tracklist and two buttons (pre-save and listen or watch). A live countdown runs to your release date and time; when the moment passes it switches to an "Out now" message by itself, and the primary button can change to “Listen now”.',
  bestFor: ['Album, EP and single launches', 'Pre-save and pre-order campaigns', 'Music videos and live-session premieres'],
  behaviors: ['countdown'],

  groups: [
    { id: 'main', label: 'Release' },
    { id: 'media', label: 'Cover' },
    { id: 'when', label: 'Release date & countdown', toggle: 'showCountdown' },
    { id: 'buttons', label: 'Buttons' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Eyebrow (optional)', type: 'text', value: 'New album' },
    { key: 'heading', group: 'main', label: 'Title', type: 'textarea', value: 'Static *Hearts*' },
    { key: 'text', group: 'main', label: 'Blurb', type: 'textarea', value: 'Eleven songs about leaving, arriving and everything in between, recorded live to tape in a converted church in Porto.' },
    { key: 'tracks', group: 'main', label: 'Tracklist (one track per line, optional)', type: 'textarea', value: 'Lights Out in Lisbon\nSlow Fire\nNight Tram\nPaper Skies\nStatic Hearts\nThe Last Train Home' },
    { key: 'cover', group: 'media', label: 'Cover art', type: 'image', value: IMG('mus-cover-1.jpg'), hint: 'A square image (about 1200×1200 px).', upload: { name: 'cover', maxW: 1200 } },
    { key: 'coverAlt', group: 'media', label: 'Cover alt text', type: 'text', value: 'Album cover with a pink sun rising over dark water' },
    { key: 'releaseAt', group: 'when', label: 'Release date and time', type: 'text', value: '2026-11-14T00:00', hint: 'Year-month-day and time, for example 2026-11-14T18:00 (visitor’s local time). After it passes the countdown turns into the “out now” message.' },
    { key: 'lDays', group: 'when', label: 'Label: days', type: 'text', value: 'Days' },
    { key: 'lHours', group: 'when', label: 'Label: hours', type: 'text', value: 'Hours' },
    { key: 'lMins', group: 'when', label: 'Label: minutes', type: 'text', value: 'Minutes' },
    { key: 'lSecs', group: 'when', label: 'Label: seconds', type: 'text', value: 'Seconds' },
    { key: 'outText', group: 'when', label: 'Message when it is out', type: 'text', value: 'Out now. Listen everywhere.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Pre-save the album' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: '#' },
    { key: 'cta1Out', group: 'buttons', label: 'Primary button text once it is out (optional)', type: 'text', value: 'Listen now' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Watch the teaser' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: '#' },
  ],
  toggles: [{ key: 'showCountdown', label: 'Countdown', value: true }],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '999' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap rs">
  <div class="rs-art" data-anim="media">
    <span class="rs-disc" aria-hidden="true"></span>
    <img class="rs-cover" data-image="cover" alt="" width="1200" height="1200" loading="lazy">
  </div>
  <div class="rs-copy">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="rs-title" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead rs-text" data-anim="item" data-edit="text"></p>
    <div class="rs-count" data-anim="item" data-show="showCountdown" data-countdown data-set="data-at:releaseAt;data-out:outText;data-cta-out:cta1Out" role="timer">
      <div class="rs-cell"><b data-u="d">--</b><span data-edit="lDays"></span></div>
      <div class="rs-cell"><b data-u="h">--</b><span data-edit="lHours"></span></div>
      <div class="rs-cell"><b data-u="m">--</b><span data-edit="lMins"></span></div>
      <div class="rs-cell"><b data-u="s">--</b><span data-edit="lSecs"></span></div>
    </div>
    <p class="rs-out" data-out hidden></p>
    <ol class="rs-tracks" data-anim="item" data-lines="tracks"></ol>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-cta-main data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost rs-ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
  </div>
</div>`,
  css: `.st-release-spotlight{padding:clamp(64px,8cqi,120px) 0;background:radial-gradient(ellipse 60% 70% at 25% 50%,color-mix(in srgb,var(--st-brand) 16%,var(--st-bg)),var(--st-bg) 70%)}
.rs{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);align-items:center;gap:clamp(32px,6cqi,96px)}
.rs-art{position:relative;aspect-ratio:1;margin-right:26%}
.rs-cover{position:relative;z-index:2;width:100%;height:100%;object-fit:cover;border-radius:6px;background:var(--st-surface);box-shadow:0 40px 80px -30px rgba(0,0,0,.8),0 0 0 1px color-mix(in srgb,var(--st-text) 8%,transparent)}
.rs-disc{position:absolute;z-index:1;top:3%;left:32%;width:94%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,var(--st-brand) 0 10%,#0b0b10 10.5% 18%,transparent 18.5%),repeating-radial-gradient(circle,#232634 0 2px,#10121a 2px 4px);box-shadow:0 20px 50px -20px rgba(0,0,0,.9),0 0 0 2px color-mix(in srgb,var(--st-brand) 28%,transparent);animation:rs-spin 9s linear infinite}
@keyframes rs-spin{to{transform:rotate(360deg)}}
.rs-copy{display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.rs-title{font-size:clamp(44px,5.4cqi + 10px,88px);line-height:.95;letter-spacing:-.02em;text-transform:uppercase}
.rs-text{color:var(--st-muted);max-width:32em}
.rs-count{display:flex;gap:clamp(8px,1.4cqi,16px)}
.rs-cell{min-width:clamp(62px,7cqi,88px);display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 8px;border-radius:14px;background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.rs-cell b{font:700 clamp(26px,2.6cqi + 10px,40px)/1 var(--st-font-heading);font-variant-numeric:tabular-nums;color:var(--st-brand)}
.rs-cell span{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-muted)}
.rs-out{font:700 clamp(20px,1cqi + 14px,28px)/1.2 var(--st-font-heading);color:var(--st-brand)}
.rs-tracks{list-style:none;counter-reset:t;columns:2;column-gap:32px;color:var(--st-muted);font-size:15.5px;max-width:34em}
.rs-tracks:empty{display:none}
.rs-tracks li{counter-increment:t;break-inside:avoid;padding:3px 0}
.rs-tracks li::before{content:counter(t,decimal-leading-zero);margin-right:12px;font-weight:700;font-size:12.5px;letter-spacing:.06em;color:var(--st-brand)}
.rs-ghost{color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 40%,transparent)}
@media (prefers-reduced-motion:reduce){.rs-disc{animation:none}}
@container st (max-width:820px){.rs{grid-template-columns:1fr}.rs-art{max-width:360px;width:100%;margin:0 auto 14%}.rs-copy{align-items:center;text-align:center}.rs-tracks{text-align:left}}
@container st (max-width:520px){.rs-tracks{columns:1}}`,
};
