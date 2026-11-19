const BARS = Array.from({ length: 30 }, () => '<i data-anim="eq" data-origin="50% 50%"></i>').join('');

export default {
  id: 'podcast-episode',
  name: 'New Podcast Episode',
  version: '1.0.0',
  category: 'announcements',
  tags: ['podcast', 'new episode', 'audio', 'guest', 'cover art', 'waveform', 'player', 'dark'],
  created: '2026-11-19',
  updated: '2026-11-19',
  seoTitle: 'New Podcast Episode Post Template — Free Audiogram Style',
  seoDescription: 'Free podcast episode post template: cover art on a spinning record, episode number, guest line and a live waveform player that plays in the video export.',
  description: 'A night-studio podcast announcement: cover art sliding out of a vinyl record, a stamped episode number, the episode title and guest, and a mini player with a moving waveform, rippling play button and a progress bar that plays in the video export.',
  bestFor: ['Announcing a new podcast episode', 'Guest episodes and interview drops', 'Audiogram-style Reels and Stories for each release'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#15111f' },
    { key: 'text', label: 'Text', value: '#f6f1ff' },
    { key: 'accent', label: 'Accent', value: '#ff7a45' },
    { key: 'pop', label: 'Glow', value: '#9d7bff' },
  ],
  fields: [
    { key: 'kicker', label: 'Label', type: 'text', value: 'New episode' },
    { key: 'ep', label: 'Episode number', type: 'text', value: 'EP 42' },
    { key: 'cover', label: 'Cover art', type: 'image' },
    { key: 'title', label: 'Episode title', type: 'textarea', value: 'How we grew to *10K listeners* without ads' },
    { key: 'guest', label: 'Guest line', type: 'text', value: 'with Maya Chen, founder of Loop Studio' },
    { key: 'length', label: 'Length', type: 'text', value: '42:18' },
    { key: 'listen', label: 'Where to listen', type: 'text', value: 'Spotify · Apple Podcasts · YouTube' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourpodcast' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="pe">
  <div class="pe-glow" aria-hidden="true"></div>
  <div class="pe-top">
    <span class="pe-kicker"><i class="pe-live" aria-hidden="true" data-anim="blink"></i><span data-edit="kicker"></span></span>
    <span class="pe-ep" data-anim="stamp" data-at="0.5"><span data-edit="ep"></span></span>
  </div>
  <div class="pe-art">
    <div class="pe-disc" aria-hidden="true" data-anim="spin"><i></i></div>
    <div class="pe-cover" data-image="cover" data-ph="cover"></div>
  </div>
  <div class="pe-text">
    <div class="pe-title-box" data-fit-box><h2 class="pe-title" data-edit="title" data-fit></h2></div>
    <p class="pe-guest" data-edit="guest"></p>
  </div>
  <div class="pe-player">
    <div class="pe-play" aria-hidden="true"><i class="pe-ring" data-anim="ripple"></i><i class="pe-ring" data-anim="ripple"></i><b></b></div>
    <div class="pe-track">
      <div class="pe-wave" aria-hidden="true">${BARS}</div>
      <div class="pe-bar" aria-hidden="true"><i class="pe-fill" data-anim="progress" data-dur="4.8"></i><i class="pe-knob" data-anim="playhead" data-dur="4.8"></i></div>
      <div class="pe-times"><span>00:00</span><span data-edit="length"></span></div>
    </div>
  </div>
  <div class="pe-foot">
    <span class="pe-listen" data-edit="listen"></span>
    <span class="spt-brand pe-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="pe-handle" data-edit="handle"></span></span>
  </div>
</div>`,
  css: `.pe{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 85% 30%,color-mix(in srgb,var(--pop) 30%,transparent),transparent 45%),radial-gradient(circle at 10% 95%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 45%),var(--bg);color:var(--text);overflow:hidden}
.pe-glow{position:absolute;inset:0;pointer-events:none;opacity:.35;background:repeating-linear-gradient(90deg,transparent 0 calc(var(--u)*3),color-mix(in srgb,var(--text) 5%,transparent) calc(var(--u)*3) calc(var(--u)*3.15))}
.pe-top{position:relative;flex:none;padding:calc(var(--u)*1) 0;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.pe-kicker{display:inline-flex;align-items:center;gap:calc(var(--u)*1.6);padding:calc(var(--u)*1.3) calc(var(--u)*3);border-radius:99px;border:calc(var(--u)*.3) solid color-mix(in srgb,var(--text) 30%,transparent);font-size:calc(var(--u)*3);font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.pe-live{flex:none;width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);border-radius:50%;background:var(--accent);box-shadow:0 0 calc(var(--u)*1.6) var(--accent)}
.pe-ep{flex:none;padding:calc(var(--u)*1) calc(var(--u)*2.6);border-radius:calc(var(--u)*1.6);background:var(--accent);color:#fff;font-family:var(--font-heading);font-size:calc(var(--u)*4.4);font-weight:800;letter-spacing:.02em;rotate:-4deg;box-shadow:0 calc(var(--u)*1) calc(var(--u)*3) color-mix(in srgb,var(--accent) 45%,transparent)}
.pe-art{position:relative;flex:none;width:calc(var(--u)*54);height:calc(var(--u)*34);align-self:flex-start}
.pe-cover{position:absolute;left:0;top:0;width:calc(var(--u)*34);height:calc(var(--u)*34);border-radius:calc(var(--u)*2.4);box-shadow:0 calc(var(--u)*2) calc(var(--u)*6) rgba(0,0,0,.55)}
.pe-disc{position:absolute;left:calc(var(--u)*20);top:calc(var(--u)*1.5);width:calc(var(--u)*31);height:calc(var(--u)*31);border-radius:50%;background:conic-gradient(from 20deg,transparent 0 12%,rgba(255,255,255,.16) 15%,transparent 20% 60%,rgba(255,255,255,.1) 64%,transparent 70%),repeating-radial-gradient(circle,#1b1b1f 0 calc(var(--u)*.5),#0b0b0d calc(var(--u)*.5) calc(var(--u)*.9));box-shadow:0 calc(var(--u)*1.4) calc(var(--u)*5) rgba(0,0,0,.5)}
.pe-disc i{position:absolute;inset:34%;border-radius:50%;background:radial-gradient(circle,var(--bg) 0 12%,var(--accent) 13% 100%)}
.pe-text{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;gap:calc(var(--u)*1.6)}
.pe-title-box{flex:1;min-height:0;display:flex;flex-direction:column}
.pe-title-box .pe-title{margin-top:auto}
.pe-title{font-family:var(--font-heading);font-size:calc(var(--u)*7.6);line-height:1.28;font-weight:800;letter-spacing:-.02em}
.pe-guest{font-size:calc(var(--u)*3.4);font-weight:600;color:color-mix(in srgb,var(--text) 72%,transparent)}
.pe-player{position:relative;display:flex;align-items:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*2.6) calc(var(--u)*3.4);border-radius:calc(var(--u)*3.6);background:color-mix(in srgb,var(--text) 8%,transparent);border:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.pe-play{position:relative;flex:none;width:calc(var(--u)*10);height:calc(var(--u)*10);border-radius:50%;background:var(--accent);display:grid;place-items:center}
.pe-ring{position:absolute;inset:0;border-radius:50%;border:calc(var(--u)*.4) solid var(--accent);opacity:0}
.pe-play b{width:0;height:0;margin-left:calc(var(--u)*.8);border-style:solid;border-width:calc(var(--u)*2) 0 calc(var(--u)*2) calc(var(--u)*3.2);border-color:transparent transparent transparent #fff}
.pe-track{flex:1;min-width:0;display:flex;flex-direction:column;gap:calc(var(--u)*1.2)}
.pe-wave{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*.6);height:calc(var(--u)*7)}
.pe-wave i{flex:1;height:60%;border-radius:99px;background:linear-gradient(180deg,var(--accent),var(--pop))}
.pe-wave i:nth-child(5n+1){height:45%}.pe-wave i:nth-child(5n+2){height:85%}.pe-wave i:nth-child(5n+3){height:100%}.pe-wave i:nth-child(5n+4){height:70%}.pe-wave i:nth-child(7n){height:35%}
.pe-bar{position:relative;height:calc(var(--u)*.9);border-radius:99px;background:color-mix(in srgb,var(--text) 18%,transparent)}
.pe-fill{position:absolute;inset:0;border-radius:99px;background:var(--accent);clip-path:inset(0 62% 0 0)}
.pe-knob{position:absolute;top:50%;left:38%;width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);margin:calc(var(--u)*-1.3) 0 0 calc(var(--u)*-1.3);border-radius:50%;background:#fff;box-shadow:0 0 0 calc(var(--u)*.5) color-mix(in srgb,var(--accent) 50%,transparent)}
.pe-times{display:flex;justify-content:space-between;font-size:calc(var(--u)*2.4);font-weight:700;font-variant-numeric:tabular-nums;color:color-mix(in srgb,var(--text) 60%,transparent)}
.pe-foot{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.pe-listen{flex:1;min-width:0;font-size:calc(var(--u)*2.9);font-weight:700;color:color-mix(in srgb,var(--text) 80%,transparent)}
.pe-brand{flex:none}
.spt .pe-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.1);font-weight:800}
.is-story .pe-art{width:calc(var(--u)*50);height:calc(var(--u)*30)}
.is-story .pe-cover{width:calc(var(--u)*30);height:calc(var(--u)*30)}
.is-story .pe-disc{left:calc(var(--u)*18);top:calc(var(--u)*1.5);width:calc(var(--u)*27);height:calc(var(--u)*27)}
.is-story .pe-listen{font-size:calc(var(--u)*2.6)}
.is-story .pe{gap:calc(var(--u)*2.4)}
.is-story .pe-title{font-size:calc(var(--u)*8.4)}
.is-square .pe{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr auto auto;column-gap:calc(var(--u)*4);row-gap:calc(var(--u)*3)}
.is-square .pe-top{grid-column:1/3}
.is-square .pe-art{grid-column:1;grid-row:2;width:calc(var(--u)*36);height:calc(var(--u)*34);align-self:center}
.is-square .pe-cover{width:calc(var(--u)*30);height:calc(var(--u)*30);top:calc(var(--u)*2)}
.is-square .pe-disc{left:calc(var(--u)*8);top:calc(var(--u)*3);width:calc(var(--u)*28);height:calc(var(--u)*28)}
.is-square .pe-text{grid-column:2;grid-row:2}
.is-square .pe-title-box .pe-title{margin-block:auto}
.is-square .pe-title{font-size:calc(var(--u)*6.4)}
.is-square .pe-guest{font-size:calc(var(--u)*3)}
.is-square .pe-player{grid-column:1/3;grid-row:3}
.is-square .pe-foot{grid-column:1/3;grid-row:4}
.is-landscape .pe{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr auto auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.6)}
.is-landscape .pe-top{grid-column:2;grid-row:1}
.is-landscape .pe-art{grid-column:1;grid-row:1/5;align-self:center;width:calc(var(--u)*80);height:calc(var(--u)*62)}
.is-landscape .pe-cover{width:calc(var(--u)*62);height:calc(var(--u)*62)}
.is-landscape .pe-disc{left:calc(var(--u)*24);top:calc(var(--u)*3);width:calc(var(--u)*56);height:calc(var(--u)*56)}
.is-landscape .pe-text{grid-column:2;grid-row:2}
.is-landscape .pe-title{font-size:calc(var(--u)*7.4)}
.is-landscape .pe-guest{font-size:calc(var(--u)*3.2)}
.is-landscape .pe-player{grid-column:2;grid-row:3;padding:calc(var(--u)*2) calc(var(--u)*3)}
.is-landscape .pe-foot{grid-column:2;grid-row:4}
.is-linkedin .pe-art{width:calc(var(--u)*70);height:calc(var(--u)*56)}
.is-linkedin .pe-cover{width:calc(var(--u)*56);height:calc(var(--u)*56)}
.is-linkedin .pe-disc{left:calc(var(--u)*20);width:calc(var(--u)*50);height:calc(var(--u)*50)}
.is-linkedin .pe-title{font-size:calc(var(--u)*6.4)}
.is-linkedin .pe-wave{height:calc(var(--u)*5.4)}
.is-linkedin .pe-play{width:calc(var(--u)*8.4);height:calc(var(--u)*8.4)}`,
};
