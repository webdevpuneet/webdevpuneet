export default {
  id: 'new-video',
  name: 'New Video Is Live',
  version: '1.0.0',
  category: 'announcements',
  tags: ['video', 'new video', 'youtube', 'thumbnail', 'play button', 'creator', 'channel', 'light'],
  created: '2026-11-19',
  updated: '2026-11-19',
  seoTitle: 'New Video Post Template — Thumbnail and Play Button',
  seoDescription: 'Free new video announcement template: your thumbnail with a tappable play button, duration chip, playing progress bar and a Watch now call to action. Edit it.',
  description: 'A creator announcement built around your video thumbnail: a play button that a pointer taps, rings that spread out, a duration chip, a progress bar that plays in the video export, bold thumbnail text, the title, your channel line and a Watch now button.',
  bestFor: ['Telling followers a new YouTube or course video is out', 'Cross-posting a long video to Instagram, LinkedIn and X', 'Reel and Story teasers that send people to the full video'],
  fonts: { heading: 'poppins', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f4f1ec' },
    { key: 'text', label: 'Text', value: '#16130f' },
    { key: 'accent', label: 'Play colour', value: '#ef2b2d' },
    { key: 'pop', label: 'Thumbnail text', value: '#ffd23f' },
  ],
  fields: [
    { key: 'kicker', label: 'Label', type: 'text', value: 'New video is live' },
    { key: 'thumb', label: 'Thumbnail', type: 'image' },
    { key: 'thumbText', label: 'Thumbnail text (optional)', type: 'text', value: '30 DAYS LATER' },
    { key: 'length', label: 'Duration', type: 'text', value: '12:48' },
    { key: 'title', label: 'Video title', type: 'textarea', value: 'I built a website every day for *30 days*. Here is what I learned' },
    { key: 'avatar', label: 'Channel photo (optional)', type: 'image' },
    { key: 'channel', label: 'Channel line', type: 'text', value: 'Your Channel · New videos every Tuesday' },
    { key: 'cta', label: 'Button', type: 'text', value: 'Watch now · link in bio' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourchannel' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="nv">
  <div class="nv-bgplay" aria-hidden="true"><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i></div>
  <div class="nv-top">
    <span class="nv-kicker"><i class="nv-dot" aria-hidden="true" data-anim="blink"></i><span data-edit="kicker"></span></span>
    <span class="spt-brand nv-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="nv-handle" data-edit="handle"></span></span>
  </div>
  <div class="nv-player" data-anim="settle">
    <div class="nv-thumb" data-image="thumb"></div>
    <div class="nv-shade" aria-hidden="true"></div>
    <span class="nv-ttext-wrap" data-anim="pop" data-at="0.6"><span class="nv-ttext" data-edit="thumbText"></span></span>
    <div class="nv-play" aria-hidden="true"><i class="nv-ring" data-anim="ripple"></i><i class="nv-ring" data-anim="ripple"></i><span class="nv-btn" data-anim="pulse"><b></b></span></div>
    <i class="nv-cursor" aria-hidden="true" data-anim="tap"></i>
    <span class="nv-len" data-edit="length"></span>
    <div class="nv-bar" aria-hidden="true"><i class="nv-fill" data-anim="progress" data-dur="4.8"></i><i class="nv-knob" data-anim="playhead" data-dur="4.8"></i></div>
  </div>
  <div class="nv-info">
    <div class="nv-avatar" data-image="avatar" data-optional data-ph="portrait"></div>
    <div class="nv-meta">
      <div class="nv-title-box" data-fit-box><h2 class="nv-title" data-edit="title" data-fit></h2></div>
      <p class="nv-channel" data-edit="channel"></p>
    </div>
  </div>
  <div class="nv-foot"><span class="nv-cta"><span data-edit="cta"></span><i class="nv-arrow" aria-hidden="true" data-anim="nudge-x">→</i></span></div>
</div>`,
  css: `.nv{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 0,color-mix(in srgb,var(--accent) 14%,transparent),transparent 40%),var(--bg);color:var(--text);overflow:hidden}
.nv-bgplay{position:absolute;inset:0;pointer-events:none}
.nv-bgplay i{position:absolute;width:0;height:0;border-style:solid;border-color:transparent transparent transparent color-mix(in srgb,var(--accent) 12%,transparent);opacity:.9}
.nv-bgplay i:nth-child(1){left:-4%;bottom:12%;border-width:calc(var(--u)*9) 0 calc(var(--u)*9) calc(var(--u)*15);rotate:-14deg}
.nv-bgplay i:nth-child(2){right:4%;top:44%;border-width:calc(var(--u)*5) 0 calc(var(--u)*5) calc(var(--u)*8.4);rotate:12deg}
.nv-bgplay i:nth-child(3){left:52%;bottom:-3%;border-width:calc(var(--u)*7) 0 calc(var(--u)*7) calc(var(--u)*11.5);rotate:-30deg}
.nv-top{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.nv-kicker{display:inline-flex;align-items:center;gap:calc(var(--u)*1.6);padding:calc(var(--u)*1.4) calc(var(--u)*3.2);border-radius:99px;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3.1);font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.nv-dot{flex:none;width:calc(var(--u)*1.9);height:calc(var(--u)*1.9);border-radius:50%;background:var(--accent);box-shadow:0 0 0 calc(var(--u)*.6) color-mix(in srgb,var(--accent) 35%,transparent)}
.nv-brand{flex:none}
.spt .nv-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.1);font-weight:800}
.nv-player{position:relative;flex:none;width:100%;aspect-ratio:16/9;border-radius:calc(var(--u)*3);overflow:hidden;background:#111;box-shadow:0 calc(var(--u)*2.4) calc(var(--u)*6) rgba(22,19,15,.28),0 0 0 calc(var(--u)*.8) #fff}
.nv-thumb{position:absolute;inset:0}
.nv-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.55))}
.nv-ttext-wrap{position:absolute;left:5%;top:7%;max-width:58%;rotate:-3deg}
.nv-ttext{display:block;padding:calc(var(--u)*.6) calc(var(--u)*2);background:var(--text);color:var(--pop);font-family:var(--font-heading);font-size:calc(var(--u)*5);line-height:1.15;font-weight:900;letter-spacing:-.01em;box-shadow:calc(var(--u)*.9) calc(var(--u)*.9) 0 var(--accent)}
.nv-play{position:absolute;left:50%;top:50%;width:calc(var(--u)*16);height:calc(var(--u)*11);margin:calc(var(--u)*-5.5) 0 0 calc(var(--u)*-8)}
.nv-ring{position:absolute;inset:0;border-radius:calc(var(--u)*3.4);border:calc(var(--u)*.5) solid #fff;opacity:0}
.nv-btn{position:absolute;inset:0;display:grid;place-items:center;border-radius:calc(var(--u)*3.4);background:var(--accent);box-shadow:0 calc(var(--u)*1) calc(var(--u)*3) rgba(0,0,0,.35)}
.nv-btn b{width:0;height:0;margin-left:calc(var(--u)*.8);border-style:solid;border-width:calc(var(--u)*2.6) 0 calc(var(--u)*2.6) calc(var(--u)*4.2);border-color:transparent transparent transparent #fff}
.nv-cursor{position:absolute;left:calc(50% + var(--u)*3);top:calc(50% + var(--u)*1.5);width:calc(var(--u)*6);height:calc(var(--u)*7.5);background:#fff;clip-path:polygon(0 0,0 78%,24% 60%,40% 96%,56% 89%,41% 55%,74% 55%);filter:drop-shadow(0 0 calc(var(--u)*.5) rgba(0,0,0,.7))}
.nv-len{position:absolute;right:3%;bottom:calc(var(--u)*3.6);padding:calc(var(--u)*.5) calc(var(--u)*1.4);border-radius:calc(var(--u)*1);background:rgba(0,0,0,.78);color:#fff;font-size:calc(var(--u)*2.7);font-weight:700;font-variant-numeric:tabular-nums}
.nv-bar{position:absolute;left:0;right:0;bottom:0;height:calc(var(--u)*1.1);background:rgba(255,255,255,.3)}
.nv-fill{position:absolute;inset:0;background:var(--accent);clip-path:inset(0 70% 0 0)}
.nv-knob{position:absolute;top:50%;left:30%;width:calc(var(--u)*2.8);height:calc(var(--u)*2.8);margin:calc(var(--u)*-1.4) 0 0 calc(var(--u)*-1.4);border-radius:50%;background:var(--accent);box-shadow:0 0 0 calc(var(--u)*.4) #fff}
.nv-info{position:relative;flex:1;min-height:0;display:flex;gap:calc(var(--u)*3)}
.nv-avatar{flex:none;width:calc(var(--u)*11);height:calc(var(--u)*11);border-radius:50%;box-shadow:0 0 0 calc(var(--u)*.6) var(--accent)}
.nv-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:calc(var(--u)*1.4)}
.nv-title-box{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-start}
.nv-title{font-family:var(--font-heading);font-size:calc(var(--u)*6.8);line-height:1.3;font-weight:800;letter-spacing:-.02em}
.nv-channel{font-size:calc(var(--u)*3.1);font-weight:600;color:color-mix(in srgb,var(--text) 62%,transparent)}
.nv-foot{position:relative;display:flex;margin-top:auto}
.nv-cta{display:inline-flex;align-items:center;gap:calc(var(--u)*2);padding:calc(var(--u)*2.4) calc(var(--u)*4.4);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*3.6);font-weight:800;box-shadow:0 calc(var(--u)*1.2) calc(var(--u)*3) color-mix(in srgb,var(--accent) 40%,transparent)}
.nv-arrow{font-style:normal}
.is-square .nv{gap:calc(var(--u)*2.6)}
.is-square .nv-player{width:86%;align-self:center}
.is-square .nv-title{font-size:calc(var(--u)*5.4)}
.is-square .nv-avatar{width:calc(var(--u)*9);height:calc(var(--u)*9)}
.is-square .nv-cta{padding:calc(var(--u)*1.8) calc(var(--u)*3.8);font-size:calc(var(--u)*3.2)}
.is-story .nv-title{font-size:calc(var(--u)*7.6)}
.is-story .nv-player{margin-top:calc(var(--u)*2)}
.is-landscape .nv{display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*3)}
.is-landscape .nv-top{grid-column:1/3}
.is-landscape .nv-player{grid-column:1;grid-row:2/4;align-self:center}
.is-landscape .nv-info{grid-column:2;grid-row:2;align-items:center}
.is-landscape .nv-foot{grid-column:2;grid-row:3;margin-top:0}
.is-landscape .nv-title{font-size:calc(var(--u)*6.6)}
.is-landscape .nv-avatar{width:calc(var(--u)*10);height:calc(var(--u)*10)}
.is-linkedin .nv-title{font-size:calc(var(--u)*5.8)}
.is-linkedin .nv-ttext{font-size:calc(var(--u)*4.2)}
.is-linkedin .nv-avatar{display:none}`,
};
