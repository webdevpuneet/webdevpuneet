import { IMG } from './meta.js';

export default {
  id: 'audio-player',
  name: 'Audio Player & Track List',
  version: '1.0.0',
  category: 'music',
  anchor: 'listen',
  tags: ['music', 'audio player', 'playlist', 'tracks', 'mp3', 'preview', 'songs', 'html audio', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'Audio Player & Track List Section — Free HTML Music Player',
  seoDescription: 'Free audio player section: a track list with play and pause, progress bar, previous and next, cover art and stream links. Plays MP3 or WAV with plain HTML.',
  description: 'A music player that works on any website with no plugin. A now-playing panel shows the cover, title, a progress bar you can click or drag, the time and previous, play and next buttons; beside it is the track list with numbers, covers and durations, and a small equalizer on the playing row. Each track takes the link to an MP3 or WAV file and an optional stream or buy link. When a track ends the next one starts, and only one player on a page plays at a time.',
  bestFor: ['Artist and band websites with song previews', 'Producers, composers and sound designers', 'Podcasts, audiobooks and sample libraries'],
  behaviors: ['player'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Tracks' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Listen' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Press play on *the new songs*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Short previews of the new album. Tap a track to play it, or stream the full song with the link beside it.' },
  ],
  lists: [{
    key: 'tracks', group: 'items', label: 'Tracks', itemLabel: 'Track', titleKey: 'title', min: 1, max: 20,
    fields: [
      { key: 'cover', label: 'Cover art (optional)', type: 'image', value: '', hint: 'A square image (about 600×600 px).', upload: { name: 'track', maxW: 800 } },
      { key: 'coverAlt', label: 'Cover alt text', type: 'text', value: '', hint: 'Describe the cover for search engines, for example “Cover art for Slow Fire”.' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new track' },
      { key: 'meta', label: 'Artist or note (optional)', type: 'text', value: 'Velvet Static' },
      { key: 'audio', label: 'Audio file link (MP3 or WAV)', type: 'url', value: '', hint: 'A direct link to the audio file. Without one the track is listed with its stream link only.' },
      { key: 'duration', label: 'Length shown in the list', type: 'text', value: '', hint: 'For example 3:42. Replaced by the real length once the audio loads.' },
      { key: 'linkLabel', label: 'Link text', type: 'text', value: 'Stream' },
      { key: 'link', label: 'Stream or buy link (optional)', type: 'url', value: '' },
    ],
    value: [
      { cover: IMG('mus-cover-1.jpg'), coverAlt: 'Cover art for Lights Out in Lisbon, a pink sun over dark water', title: 'Lights Out in Lisbon', meta: 'Velvet Static · Static Hearts', audio: 'https://webdevpuneet.com/audio/demo-1.wav', duration: '0:08', linkLabel: 'Stream', link: '#' },
      { cover: IMG('mus-cover-2.jpg'), coverAlt: 'Cover art for Slow Fire, a glowing cyan circle on black', title: 'Slow Fire', meta: 'Velvet Static · Single', audio: 'https://webdevpuneet.com/audio/demo-2.wav', duration: '0:08', linkLabel: 'Stream', link: '#' },
      { cover: IMG('mus-cover-3.jpg'), coverAlt: 'Cover art for Night Tram, violet and orange waves', title: 'Night Tram', meta: 'Velvet Static · Night Tram EP', audio: 'https://webdevpuneet.com/audio/demo-3.wav', duration: '0:08', linkLabel: 'Stream', link: '#' },
      { cover: IMG('mus-cover-4.jpg'), coverAlt: 'Cover art for Paper Skies, golden dots on deep blue', title: 'Paper Skies', meta: 'Velvet Static · Paper Skies', audio: '', duration: '3:51', linkLabel: 'Stream', link: '#' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '18' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="ap" data-player data-anim="media">
    <div class="ap-now">
      <div class="ap-art"><img class="ap-cover" data-ap-cover alt="" width="600" height="600"></div>
      <div class="ap-info"><span class="ap-tag">Now playing</span><strong class="ap-title" data-ap-title></strong><span class="ap-meta" data-ap-meta></span></div>
      <div class="ap-bar"><span class="ap-t" data-ap-cur>0:00</span><input class="ap-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek" data-ap-seek><span class="ap-t" data-ap-dur>0:00</span></div>
      <div class="ap-ctl">
        <button class="ap-btn" type="button" aria-label="Previous track" data-ap-prev><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
        <button class="ap-btn ap-play" type="button" aria-label="Play" data-ap-play><svg class="ap-i-play" viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="ap-i-pause" viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>
        <button class="ap-btn" type="button" aria-label="Next track" data-ap-next><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5l11 7-11 7z"/></svg></button>
      </div>
      <p class="ap-msg" data-ap-msg role="status"></p>
    </div>
    <ol class="ap-list" data-list="tracks">
      <li class="ap-track" data-set="data-src:audio">
        <button class="ap-row" type="button" data-ap-row>
          <span class="ap-n" aria-hidden="true"></span>
          <img class="ap-thumb" data-image="cover" data-optional alt="" width="120" height="120" loading="lazy">
          <span class="ap-names"><b class="ap-name" data-edit="title"></b><small class="ap-by" data-edit="meta"></small></span>
          <span class="ap-eq" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="ap-len" data-edit="duration"></span>
        </button>
        <a class="ap-link" data-href="link" data-show-if="link"><span data-edit="linkLabel"></span></a>
      </li>
    </ol>
  </div>
</div>`,
  css: `.st-audio-player{padding:clamp(56px,7cqi,104px) 0}
.ap{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(18px,2.6cqi,36px);align-items:start}
.ap-now{position:relative;display:flex;flex-direction:column;gap:16px;padding:clamp(18px,2.2cqi,28px);border-radius:calc(var(--st-radius) * 1.2px);background:linear-gradient(160deg,color-mix(in srgb,var(--st-brand) 14%,var(--st-surface)),var(--st-surface));border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.ap-art{aspect-ratio:1;max-width:340px;margin:0 auto;width:100%}
.ap-cover{width:100%;height:100%;object-fit:cover;border-radius:calc(var(--st-radius) * .7px);background:color-mix(in srgb,var(--st-text) 8%,transparent);box-shadow:0 24px 50px -24px rgba(0,0,0,.8)}
.ap-info{display:flex;flex-direction:column;gap:3px}
.ap-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.ap-title{font:700 clamp(20px,1cqi + 15px,28px)/1.2 var(--st-font-heading)}
.ap-meta{color:var(--st-muted);font-size:15px}
.ap-bar{display:flex;align-items:center;gap:12px}
.ap-t{font-size:13px;font-variant-numeric:tabular-nums;color:var(--st-muted);min-width:2.6em}
.ap-seek{--p:0%;flex:1;height:22px;margin:0;background:transparent;-webkit-appearance:none;appearance:none;cursor:pointer}
.ap-seek::-webkit-slider-runnable-track{height:5px;border-radius:5px;background:linear-gradient(90deg,var(--st-brand) var(--p),color-mix(in srgb,var(--st-text) 18%,transparent) var(--p))}
.ap-seek::-moz-range-track{height:5px;border-radius:5px;background:color-mix(in srgb,var(--st-text) 18%,transparent)}
.ap-seek::-moz-range-progress{height:5px;border-radius:5px;background:var(--st-brand)}
.ap-seek::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;margin-top:-5px;border-radius:50%;border:0;background:var(--st-text);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 30%,transparent)}
.ap-seek::-moz-range-thumb{width:15px;height:15px;border-radius:50%;border:0;background:var(--st-text)}
.ap-seek:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:3px;border-radius:6px}
.ap-ctl{display:flex;align-items:center;justify-content:center;gap:18px}
.ap-btn{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-text) 18%,transparent);background:transparent;color:var(--st-text);cursor:pointer;transition:background .2s,color .2s,transform .2s}
.ap-btn:hover{background:color-mix(in srgb,var(--st-text) 10%,transparent)}
.ap-btn:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.ap-play{width:62px;height:62px;border:0;background:var(--st-brand);color:var(--st-btn-text)}
.ap-play:hover{background:var(--st-brand);transform:scale(1.06)}
.ap-i-pause{display:none}
.ap.is-playing .ap-i-play{display:none}.ap.is-playing .ap-i-pause{display:block}
.ap-msg{min-height:1.4em;text-align:center;font-size:13.5px;color:var(--st-muted)}
.ap-list{list-style:none;display:flex;flex-direction:column;gap:6px;counter-reset:n}
.ap-track{display:flex;align-items:center;gap:8px;border-radius:calc(var(--st-radius) * .7px);border:1px solid transparent;transition:background .2s,border-color .2s}
.ap-track:hover{background:color-mix(in srgb,var(--st-text) 5%,transparent)}
.ap-track.is-current{background:color-mix(in srgb,var(--st-brand) 12%,transparent);border-color:color-mix(in srgb,var(--st-brand) 45%,transparent)}
.ap-row{flex:1;min-width:0;display:flex;align-items:center;gap:14px;padding:10px 12px;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:inherit}
.ap-row:focus-visible{outline:3px solid var(--st-brand);outline-offset:-3px}
.ap-n{counter-increment:n;width:1.6em;text-align:center;font-size:14px;font-weight:700;color:var(--st-muted)}
.ap-n::before{content:counter(n)}
.ap-thumb{width:52px;height:52px;border-radius:calc(var(--st-radius) * .35px);object-fit:cover;flex:none;background:color-mix(in srgb,var(--st-text) 8%,transparent)}
.ap-names{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.ap-name{font-size:16.5px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ap-by{color:var(--st-muted);font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ap-len{font-size:13.5px;font-variant-numeric:tabular-nums;color:var(--st-muted)}
.ap-eq{display:none;align-items:flex-end;gap:2px;height:16px}
.ap-eq i{width:3px;height:100%;background:var(--st-brand);border-radius:2px;transform-origin:50% 100%;animation:ap-eq 1s ease-in-out infinite}
.ap-eq i:nth-child(2){animation-delay:-.3s}.ap-eq i:nth-child(3){animation-delay:-.6s}
@keyframes ap-eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
.ap-track.is-current.is-playing .ap-eq{display:flex}
.ap-track.is-current.is-playing .ap-n{visibility:hidden}
.ap-link{flex:none;margin-right:12px;font-size:13.5px;font-weight:700;color:var(--st-brand);text-decoration:none;border-bottom:2px solid transparent}
.ap-link:hover,.ap-link:focus-visible{border-color:var(--st-brand);outline:none}
@media (prefers-reduced-motion:reduce){.ap-eq i{animation:none;transform:scaleY(.6)}}
@container st (max-width:820px){.ap{grid-template-columns:1fr}.ap-art{max-width:260px}}
@container st (max-width:480px){.ap-thumb{display:none}}`,
};
