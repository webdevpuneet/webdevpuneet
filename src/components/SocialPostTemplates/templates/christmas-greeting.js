export default {
  id: 'christmas-greeting',
  name: 'Christmas Greeting',
  version: '1.0.0',
  category: 'holidays',
  tags: ['christmas', 'holiday', 'december', 'greeting', 'dark'],
  created: '2026-10-18',
  updated: '2026-10-18',
  seoTitle: 'Christmas Post Template — Free Merry Christmas Social Post',
  seoDescription: 'Free Christmas post template with falling snow, ornaments, a script Merry Christmas headline, message and optional offer. Edit online and download every size.',
  description: 'A festive Christmas card post: falling snow, hanging gold ornaments, a script "Merry Christmas" headline, a short holiday message, an optional offer line and your handle on deep evergreen.',
  bestFor: ['Christmas and holiday greetings (Dec 25, 2026)', 'Holiday opening hours and shipping cut-off notices', 'End-of-year thank-you posts and gift offers'],
  fonts: { heading: 'g:Great Vibes|4|h', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0f3d2e' },
    { key: 'text', label: 'Text', value: '#fffbeb' },
    { key: 'accent', label: 'Gold', value: '#fbbf24' },
    { key: 'accent2', label: 'Ornament', value: '#dc2626' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Season’s greetings' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Merry *Christmas*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'Thank you for an amazing 2026. Wishing you warmth, joy and a little magic this holiday season.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: 'Free shipping until Dec 20' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="xm">
  <i class="xm-snow"></i>
  <i class="xm-orn o1"></i><i class="xm-orn o2"></i><i class="xm-orn o3"></i>
  <div class="xm-body" data-fit-box>
    <span class="xm-kicker" data-edit="kicker"></span>
    <h2 class="xm-title" data-edit="title" data-fit></h2>
    <p class="xm-msg" data-edit="message" data-fit></p>
    <span class="xm-offer" data-edit="offer"></span>
  </div>
  <span class="xm-handle" data-edit="handle"></span>
</div>`,
  css: `.xm{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 35%,color-mix(in srgb,var(--bg) 70%,#fff 8%),var(--bg) 70%);text-align:center;overflow:hidden}
.xm-snow{position:absolute;inset:0;opacity:.55;background-image:radial-gradient(circle,#fff 0 calc(var(--u)*.45),transparent calc(var(--u)*.55)),radial-gradient(circle,#fff 0 calc(var(--u)*.3),transparent calc(var(--u)*.4)),radial-gradient(circle,#fff 0 calc(var(--u)*.6),transparent calc(var(--u)*.7));background-size:calc(var(--u)*13) calc(var(--u)*11),calc(var(--u)*9) calc(var(--u)*8),calc(var(--u)*21) calc(var(--u)*19);background-position:0 0,calc(var(--u)*4) calc(var(--u)*3),calc(var(--u)*8) calc(var(--u)*6)}
.xm-orn{position:absolute;top:0;width:calc(var(--u)*.3);background:color-mix(in srgb,var(--accent) 70%,transparent)}
.xm-orn::after{content:'';position:absolute;left:50%;bottom:calc(var(--u)*-8);width:calc(var(--u)*8);height:calc(var(--u)*8);border-radius:50%;transform:translateX(-50%);background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--accent2) 30%,#fff),var(--accent2) 55%,color-mix(in srgb,var(--accent2) 60%,#000));box-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent2) 45%,transparent)}
.xm-orn::before{content:'';position:absolute;left:50%;bottom:calc(var(--u)*-.6);width:calc(var(--u)*2.4);height:calc(var(--u)*1.4);border-radius:calc(var(--u)*.4);transform:translateX(-50%);background:var(--accent);z-index:1}
.o1{left:14%;height:12%}
.o2{right:16%;height:20%}.o2::after{background:radial-gradient(circle at 35% 30%,#fff7d6,var(--accent) 55%,color-mix(in srgb,var(--accent) 60%,#000))}
.o3{left:32%;height:6%}.o3::after{width:calc(var(--u)*5.5);height:calc(var(--u)*5.5);bottom:calc(var(--u)*-5.5)}
.xm-body{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6);width:100%;padding-top:calc(var(--u)*10)}
.xm-kicker{font-size:calc(var(--u)*3.3);font-weight:700;text-transform:uppercase;letter-spacing:.26em;color:var(--accent)}
.xm-title{font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:1;font-weight:400}
.xm-title .hl{display:block}
.xm-msg{font-size:calc(var(--u)*3.8);line-height:1.55;opacity:.88;max-width:84%}
.xm-offer{margin-top:calc(var(--u)*1.4);font-size:calc(var(--u)*3.2);font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--bg);background:var(--accent);padding:calc(var(--u)*1.6) calc(var(--u)*3.4);border-radius:99px}
.xm-handle{position:relative;font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.is-landscape .xm-body{padding-top:calc(var(--u)*4)}
.is-landscape .xm-title{font-size:calc(var(--u)*14)}
.is-story .xm-body{padding-top:calc(var(--u)*16)}`,
};
