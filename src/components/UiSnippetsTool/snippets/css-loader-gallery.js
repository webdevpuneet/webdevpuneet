const cssLoaderGallery = {
  id: 'css-loader-gallery',
  title: 'CSS Loader Gallery',
  category: 'loaders',
  lastmod: '2026-11-04',
  html: `<div class="wrap">
  <h2 class="title">CSS Loaders</h2>
  <p class="sub">36 pure CSS loaders, no JavaScript needed to animate them. Click one to copy its HTML and CSS together.</p>
  <div class="bar">
    <div class="chips" id="chips"></div>
    <div class="themes" id="themes"><span>Preview on</span><button type="button" data-theme="dark" class="on">Dark</button><button type="button" data-theme="light">Light</button></div>
  </div>
  <div class="gallery" id="gallery"></div>
  <div class="toast" id="toast" role="status"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0a0e1a; min-height: 100vh; padding: 40px 20px; }
.wrap { max-width: 980px; margin: 0 auto; }
.title { font-size: 24px; font-weight: 900; color: #f1f5f9; margin-bottom: 6px; }
.sub { font-size: 14px; color: #64748b; margin-bottom: 22px; }
.bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { font: 600 12.5px system-ui, sans-serif; color: #94a3b8; background: #0f1629; border: 1px solid #1e2744; border-radius: 99px; padding: 6px 12px; cursor: pointer; transition: all 0.15s; }
.chip span { margin-left: 4px; font-size: 11px; opacity: 0.6; }
.chip:hover { border-color: #6366f1; color: #e2e8f0; }
.chip.on { background: #6366f1; border-color: #6366f1; color: #fff; }
.themes { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
.themes button { font: 600 12px system-ui, sans-serif; color: #94a3b8; background: transparent; border: 1px solid #1e2744; border-radius: 8px; padding: 5px 10px; cursor: pointer; }
.themes button.on { background: #1e2744; color: #f1f5f9; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
.loader-card { position: relative; font: inherit; color: inherit; background: #0f1629; border: 1px solid #1e2744; border-radius: 16px; padding: 24px 12px 14px; display: flex; flex-direction: column; align-items: center; gap: 16px; cursor: pointer; transition: all 0.15s; }
.loader-card:hover { border-color: #6366f1; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.18); transform: translateY(-2px); }
.loader-card:focus-visible { outline: 2px solid #a5b4fc; outline-offset: 2px; }
.loader-stage { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 64px; }
.loader-name { font-size: 12px; font-weight: 700; color: #94a3b8; text-align: center; }
.loader-copy { position: absolute; top: 8px; right: 8px; font-size: 10px; font-weight: 700; color: #a5b4fc; background: rgba(99, 102, 241, 0.16); border-radius: 99px; padding: 2px 8px; opacity: 0; transition: opacity 0.15s; }
.loader-card:hover .loader-copy, .loader-card:focus-visible .loader-copy { opacity: 1; }

/* preview backgrounds: the copied CSS is always the light-neutral version, the dark card only swaps the pale track colour */
.theme-light .loader-card { background: #fff; border-color: #e2e8f0; }
.theme-light .loader-name { color: #64748b; }
.theme-dark .loader-stage [class] { --track: #27324f; }

.toast { position: fixed; bottom: 24px; right: 24px; background: #0f172a; color: #a5b4fc; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 10px; border: 1px solid #1e2744; opacity: 0; pointer-events: none; transform: translateY(8px); transition: all 0.2s; }
.toast.show { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { .loader-card { transition: none; } }`,
  js: `/* Every loader is one object: its HTML and its own CSS. The CSS needs nothing else (no gallery styles, no JavaScript),
   and recolours with two variables: --c (the accent) and --track (the pale background of the loader). */
var SPIN = '@keyframes ld-spin{to{transform:rotate(360deg)}}';
var SHIM = '@keyframes ld-shim{to{background-position:-200% 0}}';
var SK = 'linear-gradient(90deg,var(--track) 25%,color-mix(in srgb,var(--track) 55%,#fff) 50%,var(--track) 75%)';
var V = '--c:#6366f1;--track:#e2e8f0;';
var dots = function (n, tag, extra) { var s = ''; for (var i = 0; i < n; i++) s += '<' + tag + ' style="--i:' + i + '"' + (extra || '') + '></' + tag + '>'; return s; };

var loaders = [
  /* ── Spinners ── */
  { t: 'spinner', name: 'Spinner', html: '<div class="ld-spin"></div>',
    css: '.ld-spin{' + V + 'width:40px;height:40px;border:3px solid var(--track);border-top-color:var(--c);border-radius:50%;animation:ld-spin .8s linear infinite}' + SPIN },
  { t: 'spinner', name: 'Dual Ring', html: '<div class="ld-dual"></div>',
    css: '.ld-dual{--c:#6366f1;--c2:#ec4899;width:42px;height:42px;border:4px solid transparent;border-top-color:var(--c);border-bottom-color:var(--c2);border-radius:50%;animation:ld-spin .9s linear infinite}' + SPIN },
  { t: 'spinner', name: 'Orbit', html: '<div class="ld-orbit"></div>',
    css: '.ld-orbit{' + V + 'position:relative;width:44px;height:44px;border-radius:50%}.ld-orbit::before{content:"";position:absolute;inset:-4px;border:2px solid transparent;border-top-color:var(--c);border-right-color:var(--track);border-radius:50%;animation:ld-spin 1s linear infinite}.ld-orbit::after{content:"";position:absolute;inset:9px;border-radius:50%;background:var(--c)}' + SPIN },
  { t: 'spinner', name: 'Gradient Ring', html: '<div class="ld-grad"></div>',
    css: '.ld-grad{--c:#6366f1;width:44px;height:44px;border-radius:50%;background:conic-gradient(from 0deg,transparent 8%,var(--c));-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px));mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px));animation:ld-spin 1s linear infinite}' + SPIN },
  { t: 'spinner', name: 'Dashed Ring', html: '<div class="ld-dash"></div>',
    css: '.ld-dash{--c:#6366f1;width:42px;height:42px;border:3px dashed var(--c);border-radius:50%;animation:ld-spin 3s linear infinite}' + SPIN },
  { t: 'spinner', name: 'Double Bounce', html: '<div class="ld-db"><span></span><span></span></div>',
    css: '.ld-db{--c:#6366f1;position:relative;width:40px;height:40px}.ld-db span{position:absolute;inset:0;border-radius:50%;background:var(--c);opacity:.6;animation:ld-db 2s ease-in-out infinite}.ld-db span:last-child{animation-delay:-1s}@keyframes ld-db{0%,100%{transform:scale(0)}50%{transform:scale(1)}}' },
  { t: 'spinner', name: 'Radar', html: '<div class="ld-radar"></div>',
    css: '.ld-radar{--c:#6366f1;width:44px;height:44px;border:2px solid var(--c);border-radius:50%;background:conic-gradient(from 0deg,color-mix(in srgb,var(--c) 60%,transparent),transparent 30%);animation:ld-spin 1.4s linear infinite}' + SPIN },
  { t: 'spinner', name: 'Pulse Ring', html: '<div class="ld-pulse"></div>',
    css: '.ld-pulse{--c:#6366f1;width:44px;height:44px;border:3px solid var(--c);border-radius:50%;animation:ld-pulse 1.4s ease-out infinite}@keyframes ld-pulse{0%{transform:scale(.6);opacity:1}100%{transform:scale(1.4);opacity:0}}' },
  { t: 'spinner', name: 'Ripple', html: '<div class="ld-ripple"><span></span><span></span></div>',
    css: '.ld-ripple{--c:#6366f1;position:relative;width:48px;height:48px}.ld-ripple span{position:absolute;inset:0;border:3px solid var(--c);border-radius:50%;opacity:0;animation:ld-ripple 1.6s ease-out infinite}.ld-ripple span:nth-child(2){animation-delay:.8s}@keyframes ld-ripple{0%{transform:scale(.1);opacity:1}100%{transform:scale(1);opacity:0}}' },
  { t: 'spinner', name: 'Clock', html: '<div class="ld-clock"></div>',
    css: '.ld-clock{--c:#6366f1;position:relative;width:40px;height:40px;border:3px solid var(--c);border-radius:50%}.ld-clock::before,.ld-clock::after{content:"";position:absolute;left:50%;bottom:50%;width:3px;margin-left:-1.5px;border-radius:2px;background:var(--c);transform-origin:50% 100%}.ld-clock::before{height:14px;animation:ld-spin 1s linear infinite}.ld-clock::after{height:9px;animation:ld-spin 12s linear infinite}' + SPIN },

  /* ── Dots ── */
  { t: 'dots', name: 'Bouncing Dots', html: '<div class="ld-dots"><span></span><span></span><span></span></div>',
    css: '.ld-dots{--c:#6366f1;display:flex;gap:6px}.ld-dots span{width:10px;height:10px;border-radius:50%;background:var(--c);animation:ld-dots 1.2s ease infinite}.ld-dots span:nth-child(2){animation-delay:.2s}.ld-dots span:nth-child(3){animation-delay:.4s}@keyframes ld-dots{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}' },
  { t: 'dots', name: 'Typing Dots', html: '<div class="ld-typing"><span></span><span></span><span></span></div>',
    css: '.ld-typing{--c:#6366f1;display:flex;gap:5px}.ld-typing span{width:8px;height:8px;border-radius:50%;background:var(--c);animation:ld-typing 1.4s ease infinite}.ld-typing span:nth-child(2){animation-delay:.2s}.ld-typing span:nth-child(3){animation-delay:.4s}@keyframes ld-typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}' },
  { t: 'dots', name: 'Wave Dots', html: '<div class="ld-wave">' + dots(5, 'span') + '</div>',
    css: '.ld-wave{--c:#6366f1;display:flex;align-items:center;gap:5px;height:34px}.ld-wave span{width:8px;height:8px;border-radius:50%;background:var(--c);animation:ld-wave 1.1s ease-in-out infinite;animation-delay:calc(var(--i)*.12s)}@keyframes ld-wave{0%,100%{transform:translateY(-9px)}50%{transform:translateY(9px)}}' },
  { t: 'dots', name: 'Dot Circle', html: '<div class="ld-circle">' + dots(8, 'i') + '</div>',
    css: '.ld-circle{--c:#6366f1;position:relative;width:44px;height:44px}.ld-circle i{position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;background:var(--c);transform:rotate(calc(var(--i)*45deg)) translateY(-18px);animation:ld-fade 1s linear infinite;animation-delay:calc(var(--i)*-.125s)}@keyframes ld-fade{0%{opacity:1}100%{opacity:.15}}' },
  { t: 'dots', name: 'Jumping Ball', html: '<div class="ld-ball"></div>',
    css: '.ld-ball{--c:#6366f1;position:relative;width:40px;height:56px}.ld-ball::before{content:"";position:absolute;left:10px;top:0;width:20px;height:20px;border-radius:50%;background:var(--c);animation:ld-jump .7s cubic-bezier(.3,0,.7,1) infinite alternate}.ld-ball::after{content:"";position:absolute;left:8px;bottom:0;width:24px;height:5px;border-radius:50%;background:rgba(100,116,139,.35);animation:ld-shadow .7s ease-in infinite alternate}@keyframes ld-jump{to{transform:translateY(30px)}}@keyframes ld-shadow{from{transform:scaleX(.45);opacity:.4}to{transform:scaleX(1);opacity:1}}' },
  { t: 'dots', name: 'Ping Pong', html: '<div class="ld-pp"><span></span><span></span></div>',
    css: '.ld-pp{--c:#6366f1;--c2:#ec4899;position:relative;width:48px;height:16px}.ld-pp span{position:absolute;top:0;width:16px;height:16px;border-radius:50%;background:var(--c);animation:ld-pp 1s ease-in-out infinite alternate}.ld-pp span:last-child{background:var(--c2);animation-direction:alternate-reverse}@keyframes ld-pp{from{left:0}to{left:32px}}' },

  /* ── Bars ── */
  { t: 'bars', name: 'Equalizer', html: '<div class="ld-eq"><span></span><span></span><span></span><span></span><span></span></div>',
    css: '.ld-eq{--c:#6366f1;display:flex;align-items:flex-end;gap:4px;height:36px}.ld-eq span{width:6px;height:100%;border-radius:3px;background:var(--c);transform-origin:50% 100%;animation:ld-eq 1s ease-in-out infinite}.ld-eq span:nth-child(2){animation-delay:-.8s}.ld-eq span:nth-child(3){animation-delay:-.6s}.ld-eq span:nth-child(4){animation-delay:-.4s}.ld-eq span:nth-child(5){animation-delay:-.2s}@keyframes ld-eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}' },
  { t: 'bars', name: 'Progress Bar', html: '<div class="ld-prog"><div></div></div>',
    css: '.ld-prog{' + V + 'width:120px;height:5px;border-radius:3px;background:var(--track);overflow:hidden}.ld-prog div{width:40%;height:100%;border-radius:3px;background:linear-gradient(90deg,var(--c),#a5b4fc);animation:ld-prog 2s ease-in-out infinite}@keyframes ld-prog{0%{transform:translateX(-100%)}100%{transform:translateX(350%)}}' },
  { t: 'bars', name: 'Striped Bar', html: '<div class="ld-stripe"></div>',
    css: '.ld-stripe{--c:#6366f1;width:120px;height:10px;border-radius:5px;background:repeating-linear-gradient(45deg,var(--c) 0 10px,color-mix(in srgb,var(--c) 70%,#fff) 10px 20px);background-size:28px 28px;animation:ld-stripe .6s linear infinite}@keyframes ld-stripe{to{background-position:28px 0}}' },
  { t: 'bars', name: 'Signal Bars', html: '<div class="ld-signal"><span></span><span></span><span></span><span></span></div>',
    css: '.ld-signal{--c:#6366f1;display:flex;align-items:flex-end;gap:4px;height:34px}.ld-signal span{width:7px;border-radius:2px;background:var(--c);animation:ld-signal 1.2s ease-in-out infinite}.ld-signal span:nth-child(1){height:25%}.ld-signal span:nth-child(2){height:50%;animation-delay:.15s}.ld-signal span:nth-child(3){height:75%;animation-delay:.3s}.ld-signal span:nth-child(4){height:100%;animation-delay:.45s}@keyframes ld-signal{0%,100%{opacity:.2}40%{opacity:1}}' },
  { t: 'bars', name: 'Fill Bar', html: '<div class="ld-fill"></div>',
    css: '.ld-fill{' + V + 'width:120px;height:10px;border-radius:5px;background:var(--track);overflow:hidden}.ld-fill::after{content:"";display:block;height:100%;border-radius:5px;background:var(--c);animation:ld-fill 2s ease-in-out infinite}@keyframes ld-fill{0%{width:0}80%,100%{width:100%}}' },
  { t: 'bars', name: 'Bar Sweep', html: '<div class="ld-sweep"></div>',
    css: '.ld-sweep{' + V + 'position:relative;width:120px;height:5px;border-radius:3px;background:var(--track);overflow:hidden}.ld-sweep::after{content:"";position:absolute;inset:0;border-radius:3px;background:var(--c);animation:ld-sweep 1.6s ease-in-out infinite}@keyframes ld-sweep{0%{transform:scaleX(0);transform-origin:0 50%}50%{transform:scaleX(1);transform-origin:0 50%}50.01%{transform:scaleX(1);transform-origin:100% 50%}100%{transform:scaleX(0);transform-origin:100% 50%}}' },

  /* ── Shapes ── */
  { t: 'shapes', name: 'Grid Fade', html: '<div class="ld-grid">' + dots(9, 'span') + '</div>',
    css: '.ld-grid{--c:#6366f1;display:grid;grid-template-columns:repeat(3,12px);gap:4px}.ld-grid span{width:12px;height:12px;border-radius:2px;background:var(--c);animation:ld-grid 1.5s ease infinite;animation-delay:calc(var(--i)*.1s)}@keyframes ld-grid{0%,100%{opacity:.15}50%{opacity:1}}' },
  { t: 'shapes', name: 'Flip Square', html: '<div class="ld-flip"></div>',
    css: '.ld-flip{--c:#6366f1;width:36px;height:36px;border-radius:4px;background:var(--c);animation:ld-flip 1.4s ease-in-out infinite}@keyframes ld-flip{0%{transform:perspective(120px) rotateX(0) rotateY(0)}50%{transform:perspective(120px) rotateX(-180deg) rotateY(0)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-180deg)}}' },
  { t: 'shapes', name: 'Morphing Blob', html: '<div class="ld-blob"></div>',
    css: '.ld-blob{--c:#6366f1;width:44px;height:44px;background:var(--c);animation:ld-blob 3s ease-in-out infinite}@keyframes ld-blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:rotate(90deg)}}' },
  { t: 'shapes', name: 'Heartbeat', html: '<div class="ld-heart"></div>',
    css: '.ld-heart{--c:#ef4444;position:relative;width:24px;height:24px;background:var(--c);transform:rotate(-45deg);animation:ld-beat 1.1s ease-in-out infinite}.ld-heart::before,.ld-heart::after{content:"";position:absolute;width:24px;height:24px;border-radius:50%;background:var(--c)}.ld-heart::before{top:0;left:12px}.ld-heart::after{top:-12px;left:0}@keyframes ld-beat{0%,40%,80%,100%{transform:rotate(-45deg) scale(1)}20%,60%{transform:rotate(-45deg) scale(1.2)}}' },
  { t: 'shapes', name: 'Square to Circle', html: '<div class="ld-morph"></div>',
    css: '.ld-morph{--c:#6366f1;width:34px;height:34px;border:4px solid var(--c);animation:ld-morph 1.6s ease-in-out infinite}@keyframes ld-morph{0%{transform:rotate(0) scale(1);border-radius:0}50%{transform:rotate(180deg) scale(.6);border-radius:50%}100%{transform:rotate(360deg) scale(1);border-radius:0}}' },
  { t: 'shapes', name: 'Diamond Spin', html: '<div class="ld-dia"></div>',
    css: '.ld-dia{--c:#6366f1;width:28px;height:28px;background:var(--c);animation:ld-dia 1.6s ease-in-out infinite}@keyframes ld-dia{0%{transform:rotate(45deg) scale(1)}50%{transform:rotate(225deg) scale(.55)}100%{transform:rotate(405deg) scale(1)}}' },
  { t: 'shapes', name: 'Chomper', html: '<div class="ld-pac"></div>',
    css: '.ld-pac{--c:#f59e0b;position:relative;width:40px;height:40px}.ld-pac::before,.ld-pac::after{content:"";position:absolute;left:0;width:40px;height:20px;background:var(--c)}.ld-pac::before{top:0;border-radius:20px 20px 0 0;transform-origin:50% 100%;animation:ld-chomp-t .5s ease-in-out infinite alternate}.ld-pac::after{bottom:0;border-radius:0 0 20px 20px;transform-origin:50% 0;animation:ld-chomp-b .5s ease-in-out infinite alternate}@keyframes ld-chomp-t{to{transform:rotate(-32deg)}}@keyframes ld-chomp-b{to{transform:rotate(32deg)}}' },

  /* ── Skeletons ── */
  { t: 'skeleton', name: 'Skeleton Lines', html: '<div class="ld-skel"><i></i><i></i><i></i></div>',
    css: '.ld-skel{' + V + 'display:flex;flex-direction:column;gap:7px;width:120px}.ld-skel i{height:8px;border-radius:4px;background:' + SK + ';background-size:200% 100%;animation:ld-shim 1.6s linear infinite}.ld-skel i:nth-child(2){width:75%}.ld-skel i:nth-child(3){width:55%}' + SHIM },
  { t: 'skeleton', name: 'Skeleton Card', html: '<div class="ld-scard"><i></i><div><b></b><b></b></div></div>',
    css: '.ld-scard{' + V + 'display:flex;align-items:center;gap:10px;width:130px}.ld-scard i{flex:none;width:34px;height:34px;border-radius:50%}.ld-scard div{flex:1;display:flex;flex-direction:column;gap:7px}.ld-scard b{height:8px;border-radius:4px}.ld-scard b:last-child{width:60%}.ld-scard i,.ld-scard b{background:' + SK + ';background-size:200% 100%;animation:ld-shim 1.6s linear infinite}' + SHIM },
  { t: 'skeleton', name: 'Shimmer Block', html: '<div class="ld-block"></div>',
    css: '.ld-block{' + V + 'width:104px;height:62px;border-radius:10px;background:' + SK + ';background-size:200% 100%;animation:ld-shim 1.6s linear infinite}' + SHIM },

  /* ── Text ── */
  { t: 'text', name: 'Typing Cursor', html: '<span class="ld-type">Loading</span>',
    css: '.ld-type{--c:#6366f1;font:600 15px/1 ui-monospace,Menlo,monospace;color:var(--c)}.ld-type::after{content:"";display:inline-block;width:2px;height:1em;margin-left:3px;vertical-align:-2px;background:var(--c);animation:ld-blink 1s step-end infinite}@keyframes ld-blink{50%{opacity:0}}' },
  { t: 'text', name: 'Loading Dots', html: '<span class="ld-text">Loading</span>',
    css: '.ld-text{--c:#6366f1;font:600 15px/1 system-ui,sans-serif;color:var(--c)}.ld-text::after{content:"";animation:ld-text 1.2s steps(1) infinite}@keyframes ld-text{0%{content:""}25%{content:"."}50%{content:".."}75%,100%{content:"..."}}' },
  { t: 'text', name: 'Text Shimmer', html: '<span class="ld-shine">Loading</span>',
    css: '.ld-shine{--c:#6366f1;--base:#94a3b8;font:700 17px/1 system-ui,sans-serif;background:linear-gradient(90deg,var(--base) 30%,var(--c) 50%,var(--base) 70%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ld-shine 1.8s linear infinite}@keyframes ld-shine{to{background-position:-200% 0}}' },
  { t: 'text', name: 'Hopping Letters', html: '<div class="ld-letters">' + 'Loading'.split('').map(function (ch, i) { return '<span style="--i:' + i + '">' + ch + '</span>'; }).join('') + '</div>',
    css: '.ld-letters{--c:#6366f1;font:700 15px/1 system-ui,sans-serif;color:var(--c)}.ld-letters span{display:inline-block;animation:ld-hop 1.2s ease-in-out infinite;animation-delay:calc(var(--i)*.1s)}@keyframes ld-hop{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}' }
];

var TYPES = [['all', 'All'], ['spinner', 'Spinners'], ['dots', 'Dots'], ['bars', 'Bars'], ['shapes', 'Shapes'], ['skeleton', 'Skeletons'], ['text', 'Text']];
var state = { type: 'all', theme: 'dark' };

/* A readable copy: one declaration per line, nested rules (keyframes) indented */
function pretty(css) {
  var out = '', depth = 0, decl = false, pad = function (n) { return new Array(n + 1).join('  '); };
  for (var i = 0; i < css.length; i++) {
    var ch = css[i];
    if (ch === '{') { depth++; decl = true; out += ' {\\n' + pad(depth); }
    else if (ch === ';') { decl = true; out += ';\\n' + pad(depth); }
    else if (ch === ':' && decl) { decl = false; out += ': '; }
    else if (ch === '}') {
      depth--; decl = false;
      out = out.replace(/\\s+$/, '');
      if (!/[;{}]$/.test(out)) out += ';'; // the last declaration gets its semicolon too
      out += '\\n' + pad(depth) + '}\\n' + (depth ? pad(depth) : '');
    } else out += ch;
  }
  return out.replace(/\\s+$/, '') + '\\n';
}

/* HTML first, then its CSS in a <style> tag: paste the whole block into any page */
function snippetOf(l) {
  return l.html + '\\n\\n<style>\\n' + pretty(l.css) + '</style>';
}

function injectCss() {
  var seen = {}, css = '';
  loaders.forEach(function (l) { if (!seen[l.css]) { seen[l.css] = 1; css += l.css + '\\n'; } });
  var el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
}

function renderChips() {
  var counts = {};
  loaders.forEach(function (l) { counts[l.t] = (counts[l.t] || 0) + 1; });
  document.getElementById('chips').innerHTML = TYPES.map(function (t) {
    var n = t[0] === 'all' ? loaders.length : counts[t[0]];
    return '<button type="button" class="chip' + (state.type === t[0] ? ' on' : '') + '" data-type="' + t[0] + '">' + t[1] + ' <span>' + n + '</span></button>';
  }).join('');
}

function render() {
  var gallery = document.getElementById('gallery');
  gallery.className = 'gallery theme-' + state.theme;
  gallery.innerHTML = loaders.map(function (l, i) {
    if (state.type !== 'all' && l.t !== state.type) return '';
    return '<button type="button" class="loader-card" data-i="' + i + '" title="Copy the HTML and CSS of ' + l.name + '">' +
      '<span class="loader-stage">' + l.html + '</span>' +
      '<span class="loader-name">' + l.name + '</span>' +
      '<span class="loader-copy">Copy HTML + CSS</span>' +
      '</button>';
  }).join('');
}

function toast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.id);
  toast.id = setTimeout(function () { t.classList.remove('show'); }, 2000);
}

function copyLoader(idx) {
  var l = loaders[idx], text = snippetOf(l);
  function done() { toast(l.name + ': HTML + CSS copied'); }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
  } else { fallbackCopy(text, done); }
}

function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch (e) {}
  document.body.removeChild(ta);
}

document.getElementById('chips').addEventListener('click', function (e) {
  var b = e.target.closest('[data-type]');
  if (!b) return;
  state.type = b.getAttribute('data-type');
  renderChips();
  render();
});
document.getElementById('themes').addEventListener('click', function (e) {
  var b = e.target.closest('[data-theme]');
  if (!b) return;
  state.theme = b.getAttribute('data-theme');
  [].forEach.call(document.querySelectorAll('#themes [data-theme]'), function (x) { x.classList.toggle('on', x === b); });
  document.getElementById('gallery').className = 'gallery theme-' + state.theme;
});
document.getElementById('gallery').addEventListener('click', function (e) {
  var c = e.target.closest('.loader-card');
  if (c) copyLoader(+c.getAttribute('data-i'));
});

injectCss();
renderChips();
render();`,
  seo: {
    title: 'CSS Loader Gallery: 36 Pure CSS Spinners, Free HTML+CSS',
    description: '36 pure CSS loaders to copy: spinners, dots, bars, shapes, skeletons and text. One click copies the HTML and CSS together; recolour with two variables.',
    about: {
      title: 'CSS Loader Gallery: Spinners, Dots, Bars, Skeletons and Text Loaders',
      description: `Every app needs a loading state, and most developers end up searching for the same thing: a small piece of CSS that spins, bounces or shimmers without a library. This gallery collects thirty-six of them in one place. There are ten spinners, six dot loaders, six progress and level bars, seven shapes, three skeleton placeholders and four text loaders, all animated with CSS @keyframes alone. Click any card and the clipboard receives the loader's HTML and its CSS together, as one block you can paste into a page and see working straight away.\n\n**What you get when you click**\n\nThe copied block is the loader's markup followed by a <style> tag with its CSS, formatted one declaration per line so it is easy to read and edit. Nothing else from the gallery comes with it: no reset, no card styles, no script. A loader is usually one or two elements, so the paste is short. The markup comes along with the CSS, including the --i index variables that the staggered loaders use, so you never have to guess the structure.\n\n**Two variables recolour everything**\n\nEach loader declares its own custom properties on its root element: --c is the accent colour and --track is the pale colour behind it (the ring of a spinner, the rail of a progress bar, the base of a skeleton). Change --c to your brand colour and the loader follows, including the gradients that are mixed from it with color-mix(). The dual ring and ping pong loaders have a second accent, --c2. The Dark and Light switch above the grid previews the same CSS on both backgrounds, so you can see how a loader behaves on your own page before you copy it.\n\n**Six families, six techniques**\n\nSpinners rotate a bordered or conic-gradient element: the plain border-top spinner, a conic ring cut out with a mask, a dashed ring, a radar sweep and a clock with two hands on different durations. Dot loaders stagger one keyframe across several children with animation-delay, and the dot circle and wave loaders compute each delay from an --i index with calc(), so adding a ninth dot is one more element and no new rule. Bars scale or translate one fill inside a rail, and the striped bar slides a repeating-linear-gradient by exactly one stripe so it loops without a jump. Shapes use transforms and border-radius: a card flip with perspective, a morphing blob, a heart that beats, a square that becomes a circle. Skeletons sweep a highlight across an oversized gradient with background-position, which is the standard placeholder for cards, lists and images while data loads (see also the dedicated [skeleton loader](/ui-snippets/skeleton-loader/)). Text loaders animate a caret, cycle the dots after a word with a content keyframe, shine a gradient through the letters, or hop each letter in turn.\n\n**Every loader and how it animates**\n\nThe table lists all thirty-six, with the family each belongs to and what actually moves. Names match the cards above, and every row is a loader you can copy with one click.\n\n<table style="width:100%;border-collapse:collapse;font-size:13px;line-height:1.5;display:block;overflow-x:auto"><thead><tr><th style="text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);font-weight:700;color:var(--text)">Loader</th><th style="text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);font-weight:700;color:var(--text)">Family</th><th style="text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);font-weight:700;color:var(--text)">How it animates</th></tr></thead><tbody><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Spinner</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A 3px border with a coloured top edge on a circle, rotated 360° every 0.8 s with linear timing.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Dual Ring</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Different border colours on the top and bottom of one circle, spinning at 0.9 s, so it reads as two arcs chasing each other.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Orbit</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">An outer ring with two coloured edges (a ::before) spins around a fixed filled centre dot (an ::after).</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Gradient Ring</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A conic-gradient that fades to transparent, cut into a ring with a radial mask and rotated once a second, so a tail trails the head.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Dashed Ring</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A dashed border on a circle turning slowly (3 s), so the dashes seem to march around it.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Double Bounce</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Two translucent circles scale from 0 to 1 and back half a cycle apart over 2 s, so one grows as the other shrinks.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Radar</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A circle holding a conic-gradient wedge that fades behind its leading edge, rotated every 1.4 s like a radar sweep.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Pulse Ring</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A ring scales from 0.6 to 1.4 while its opacity falls from 1 to 0, then restarts, like a ripple leaving a point.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Ripple</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Two rings expand from a point and fade, the second delayed by half the cycle so a new wave starts as the last one ends.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Clock</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Spinner</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A circle with two pseudo-element hands rotating about their base: the minute hand once a second, the hour hand once every 12 s.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Bouncing Dots</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Three dots scale between 0.6 and 1 and fade, each 0.2 s after the one before, from one shared keyframe.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Typing Dots</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Three small dots hop up 8 px in turn, 0.2 s apart: the familiar "someone is typing" bubble.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Wave Dots</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Five dots swing between -9 px and +9 px, each delayed by 0.12 s times its --i index, so a wave travels along the row.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Dot Circle</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Eight dots set round a circle with rotate() and translateY(); each fades from full to faint, offset by one eighth of the cycle, so a bright dot appears to orbit.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Jumping Ball</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A ball drops 30 px and returns on a cubic-bezier ease while its shadow narrows and widens in step.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Ping Pong</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Dots</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Two dots of different colours slide the same 32 px in opposite directions (alternate and alternate-reverse) and cross in the middle.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Equalizer</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Five bars scaleY between 25% and 100% from their base, each starting 0.2 s later in the cycle, like an audio level meter.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Progress Bar</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A 40%-wide gradient block slides across a rail with translateX, then wraps, for a task with no known percentage.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Striped Bar</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Diagonal stripes from a repeating-linear-gradient; background-position moves by exactly one stripe period every 0.6 s, so the loop has no jump.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Signal Bars</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Four bars of rising height fade up one after another, 0.15 s apart, like a signal-strength or connecting indicator.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Fill Bar</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A coloured fill grows from 0 to 100% of an overflow-hidden rail over 2 s, holds, then restarts.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Bar Sweep</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Bar</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A bar scales in from the left, then (by switching transform-origin halfway through the keyframes) scales out towards the right.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Grid Fade</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Nine squares fade in and out, each delayed by 0.1 s times its --i, so brightness travels across the grid.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Flip Square</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A square turns 180° about the X axis, then 180° about the Y axis, with perspective, for a card-flip rhythm.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Morphing Blob</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">border-radius moves between two organic shapes while the element turns 90°, so the outline keeps changing.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Heartbeat</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A heart built from a rotated square and two circles scales to 120% twice, then rests, like a pulse.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Square to Circle</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A bordered square rotates 360° while shrinking to 60% and rounding its corners into a circle, then reverses.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Diamond Spin</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A diamond turns through 360° while shrinking to about half size at the midpoint and growing back.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Chomper</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Shape</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Two half-discs (a ::before and an ::after) rotate -32° and +32° about the centre line and back, so a mouth opens and closes.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Skeleton Lines</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Skeleton</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Three grey lines of different widths with a light highlight sweeping across an oversized gradient through background-position.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Skeleton Card</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Skeleton</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">An avatar circle and two text lines share one shimmer, so the placeholder reads as a profile row.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Shimmer Block</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Skeleton</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A rounded rectangle with the same moving highlight, sized for an image or thumbnail placeholder.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Typing Cursor</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Text</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A word followed by a 2px caret that blinks with step-end timing, as in a terminal.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Loading Dots</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Text</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">The ::after content cycles through nothing, ".", ".." and "..." with steps(1), so the dots appear one at a time.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Text Shimmer</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Text</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">A gradient with a bright band is clipped to the letters (background-clip: text) and slid across them.</td></tr><tr><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)"><strong style="color:var(--text)">Hopping Letters</strong></td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Text</td><td style="padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--text2)">Each letter jumps 8 px in turn, delayed by 0.1 s times its --i, so a hop runs along the word.</td></tr></tbody></table>\n\n**Pure CSS, and light on the page**\n\nNone of the loaders runs JavaScript to animate. The only script in this page builds the gallery from one array, filters it by family and handles the copy button, so the loaders keep running in a page with scripts blocked, and they animate on the compositor wherever they use transform and opacity. Where a loader has to change layout, such as the fill bar that grows from zero to full width, the element is small and sits inside an overflow-hidden rail.\n\n**Using it**\n\nPick a family with the chips, click a loader, paste the block, and change --c. For a button, scale the loader down with its own width and height or put it inside the button next to a label. For a page or panel, centre it in the container that is waiting for data and remove it when the request settles. Related patterns on this site include the [dots loader](/ui-snippets/dots-loader/), the [progress bar](/ui-snippets/progress-bar/) and the [loading overlay](/ui-snippets/loading-overlay/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Pick a family', text: 'Use the chips above the grid to show only spinners, dots, bars, shapes, skeletons or text loaders. The number on each chip is how many loaders it holds.' },
      { title: 'Check it on your background', text: 'Switch Preview on between Dark and Light. The loader\'s CSS does not change; only the pale track colour is swapped on the dark cards so you see how it will read on your page.' },
      { title: 'Click to copy HTML and CSS', text: 'Click a card. The clipboard receives the loader\'s markup followed by a <style> block with its CSS, and a toast names the loader that was copied.' },
      { title: 'Paste it into your page', text: 'Paste the block where the loader should appear. It needs no other file: the markup is one to three elements and the CSS is self-contained, keyframes included.' },
      { title: 'Recolour with --c and --track', text: 'Change --c on the loader\'s root element to your brand colour. Change --track if the loader sits on a dark surface. Dual Ring and Ping Pong also have --c2.' },
      { title: 'Resize it', text: 'Change the width and height on the root element. Loaders drawn with borders, gaps or pixel offsets may need those values adjusted in proportion at very different sizes.' },
    ]},
    features: [
      '36 loaders in six families: spinners, dots, bars, shapes, skeletons and text',
      'One click copies the HTML and the CSS together, as a block you can paste and run',
      'Readable output: one declaration per line, keyframes indented, no minified strings',
      'Recolour with --c and --track; a second accent, --c2, on the two-colour loaders',
      'Dark and Light preview switch; the copied CSS is the same either way',
      'Filter chips with live counts for each family',
      'Staggered loaders drive their delays from an --i index with calc(), so a new dot is one new element',
      'Skeleton loaders use an oversized gradient and a background-position sweep',
      'No JavaScript animates any loader; the script only builds the grid, filters it and copies',
      'Clipboard API with an execCommand fallback and a toast confirmation',
    ],
    useCases: [
      { icon: 'CODE', title: 'Add a loading state to a button or form', desc: 'Put a small spinner or the typing dots inside a submit button while the request runs, then restore the label. Scale the loader to the button\'s line height and set --c to the button\'s text colour.' },
      { icon: 'APP', title: 'Show a placeholder while a feed or card list loads', desc: 'The skeleton lines, card and block mirror the shape of the content that is coming, which keeps the layout steady. Repeat one three or four times, then replace them with the real items.' },
      { icon: 'FLOW', title: 'Indicate progress of an upload or a long task', desc: 'The fill bar and striped bar look busy, and the progress bar and bar sweep move back and forth when there is no percentage. If you know the percentage, keep the rail and set the width from it.' },
      { icon: 'CHAT', title: 'Show that someone is typing or an assistant is thinking', desc: 'Typing dots, the loading dots text and the typing cursor are the usual patterns for a pending chat reply. Place one in the message list and remove it when the first characters arrive.' },
    ],
    faqs: [
      { q: 'What exactly is copied when I click a loader?', a: 'The loader\'s HTML followed by a <style> block with its CSS, formatted one declaration per line. Paste the whole block into a page and the loader runs. It does not include the gallery\'s own styles or script, so there is nothing to clean up afterwards.' },
      { q: 'How do I change the colour of a loader?', a: 'Edit the --c custom property on the loader\'s root element, for example .ld-spin{--c:#16a34a}. Where the loader has a pale background, such as the ring of a spinner or the rail of a bar, that is --track. Dual Ring and Ping Pong take a second colour in --c2. The pale defaults suit a light page; set --track to a darker tone on a dark one.' },
      { q: 'Why does the Dark preview not change the copied CSS?', a: 'The copied CSS always carries the light-page defaults, so it is the same whichever preview you used. On the dark cards the gallery only overrides --track so the pale rings and rails do not glare against the card. If your page is dark, set --track yourself after pasting.' },
      { q: 'How do the dot circle and wave loaders stagger their animation?', a: 'Each element carries an inline --i index (0, 1, 2 and so on) and the CSS computes animation-delay: calc(var(--i)*.12s). One keyframe is shared by every dot and the delay places each one on the cycle. To add a dot, add one more element with the next --i; to change the speed, change the multiplier.' },
      { q: 'How do I add my own loader to this gallery?', a: 'Add one object to the loaders array with a type, a name, an html string and a css string that declares --c and --track on its root class. Give its classes and keyframes a unique ld- prefix so they cannot clash with the others. The grid, the chips and the copy output pick it up without any other change.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out by hand why every loader carries its own custom properties on its root element, or why the Dark preview changes only one variable, to understand the design. Paste this snippet's HTML, CSS and JS into an AI coding assistant such as Claude and ask it to explain how the copied block stays identical whichever preview is selected, how the pretty-printer indents nested @keyframes rules, and how calc() with an --i index replaces a separate delay rule per dot. The same assistant can help you extend it: ask it to turn --c and --track into controls so people can pick a colour and see the copied CSS update, to add a size slider that scales a loader with one custom property, to add a reduced-motion version of each loader, or to add a fourth family of loaders built on clip-path or the CSS Houdini paint API. Treat the code as a starting point for a conversation rather than a finished artefact.`,
      prompt: `Build a gallery of at least thirty pure-CSS loading animations in plain HTML, CSS and JavaScript, where clicking a loader copies both its HTML and its CSS to the clipboard.

Requirements:
- Represent every loader as one data object with a family (spinner, dots, bars, shapes, skeleton or text), a name, an HTML string and a self-contained CSS string. The CSS must include its own @keyframes and must work when pasted into any page with no other stylesheet.
- Every loader declares its own custom properties on its root element: --c for the accent colour and --track for the pale background colour (the track of a ring, the rail of a bar, the base of a skeleton). Use them everywhere a colour appears, and mix lighter tints with color-mix() instead of hard-coding a second colour. Two-colour loaders add --c2.
- Prefix every class and keyframe name with ld- so loaders cannot clash when injected into one stylesheet for the preview.
- Stagger multi-element loaders with a single shared keyframe and an inline --i index per element, using animation-delay: calc(var(--i) * <step>), never a separate rule per element.
- Include these techniques across the set: a bordered spinner; a conic-gradient ring cut out with a mask; a dashed rotating ring; a clock with two hands on different durations; expanding ripple rings; staggered scaling and bouncing dots; a circle of dots with a fading trail; a squash-and-shadow bouncing ball; an equalizer of scaleY bars; an indeterminate progress bar; a striped bar whose background-position moves by exactly one stripe period; a fill bar that grows inside an overflow-hidden rail; a bar that sweeps in from one end and out of the other by switching transform-origin mid-keyframe; a perspective card flip; a morphing blob animating border-radius; a heart built from pseudo-elements; skeleton lines, a skeleton card and an image block that share one shimmer gradient animated with background-position; a typing caret; text whose trailing dots cycle with an animated content property; text lit by a gradient clipped to the letters; and letters that hop one after another.
- Render the gallery from the array. Provide filter chips for each family with live counts, and a Dark / Light preview switch that changes only the card background and overrides --track on the dark cards, so the copied CSS is the same either way.
- Clicking a card copies the HTML, a blank line, then the CSS inside a <style> block, formatted one declaration per line with nested @keyframes indented, using a small pretty-printer that tracks brace depth. Use the async Clipboard API with a synchronous execCommand fallback, and show a toast naming the copied loader that hides itself after two seconds.
- JavaScript may build the gallery, filter it and copy; it must never drive a loader's animation.`,
    },
  },
};
export default cssLoaderGallery;
