export default {
  id: 'thanksgiving',
  name: 'Thanksgiving Thank You',
  version: '1.0.0',
  category: 'holidays',
  tags: ['thanksgiving', 'gratitude', 'november', 'autumn', 'light'],
  created: '2026-10-18',
  updated: '2026-10-18',
  seoTitle: 'Thanksgiving Post Template — Free Thank You Social Post',
  seoDescription: 'Free Thanksgiving post template with autumn leaves, a warm thank-you headline, a short message and your handle. Edit online, download every size or copy HTML.',
  description: 'A warm Thanksgiving thank-you card: falling autumn leaves, a serif "Grateful for you" headline, a short message to customers or followers and your handle on a cream background.',
  bestFor: ['Thanksgiving thank-you posts (Nov 26, 2026)', 'Customer and community appreciation', 'Friendsgiving and gratitude campaigns'],
  fonts: { heading: 'playfair', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fdf6ec' },
    { key: 'text', label: 'Text', value: '#3b2414' },
    { key: 'accent', label: 'Accent', value: '#c2410c' },
    { key: 'accent2', label: 'Leaves', value: '#d97706' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Happy Thanksgiving' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Grateful for *you*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'Thank you for being part of our story this year. Wishing you a table full of good food and good people.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="tg">
  <i class="tg-leaf l1"></i><i class="tg-leaf l2"></i><i class="tg-leaf l3"></i><i class="tg-leaf l4"></i><i class="tg-leaf l5"></i><i class="tg-leaf l6"></i>
  <div class="tg-card">
    <span class="tg-kicker" data-edit="kicker"></span>
    <div class="tg-body" data-fit-box>
      <h2 class="tg-title" data-edit="title" data-fit></h2>
      <p class="tg-msg" data-edit="message" data-fit></p>
    </div>
    <span class="tg-rule"></span>
    <span class="tg-handle" data-edit="handle"></span>
  </div>
</div>`,
  css: `.tg{position:absolute;inset:0;display:flex;padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 120%,color-mix(in srgb,var(--accent2) 22%,transparent),transparent 60%),var(--bg);overflow:hidden}
.tg-leaf{position:absolute;width:calc(var(--u)*9);height:calc(var(--u)*9);border-radius:0 70% 0 70%;background:linear-gradient(135deg,var(--accent2),var(--accent));opacity:.9}
.tg-leaf::after{content:'';position:absolute;left:50%;top:6%;bottom:6%;width:calc(var(--u)*.4);background:color-mix(in srgb,var(--bg) 60%,transparent);transform:translateX(-50%) rotate(45deg)}
.l1{top:5%;left:6%;transform:rotate(-20deg)}
.l2{top:9%;right:9%;width:calc(var(--u)*6);height:calc(var(--u)*6);transform:rotate(35deg);background:var(--accent)}
.l3{bottom:7%;left:9%;width:calc(var(--u)*7);height:calc(var(--u)*7);transform:rotate(70deg)}
.l4{bottom:5%;right:6%;transform:rotate(-55deg)}
.l5{top:44%;left:2%;width:calc(var(--u)*5);height:calc(var(--u)*5);transform:rotate(10deg);opacity:.6}
.l6{top:38%;right:3%;width:calc(var(--u)*5.5);height:calc(var(--u)*5.5);transform:rotate(-80deg);background:var(--accent);opacity:.6}
.tg-card{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*3);text-align:center;padding:calc(var(--u)*6);border:calc(var(--u)*.4) solid color-mix(in srgb,var(--accent) 35%,transparent);border-radius:calc(var(--u)*3);margin:calc(var(--u)*5)}
.tg-kicker{font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;letter-spacing:.22em;color:var(--accent)}
.tg-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*3.4);width:100%}
.tg-title{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1.05;font-weight:700}
.tg-title .hl{font-style:italic}
.tg-msg{font-size:calc(var(--u)*3.8);line-height:1.55;opacity:.82;max-width:88%}
.tg-rule{width:calc(var(--u)*12);height:calc(var(--u)*.5);border-radius:99px;background:var(--accent2)}
.tg-handle{font-size:calc(var(--u)*3.1);font-weight:700;color:var(--accent)}
.is-landscape .tg-card{margin:calc(var(--u)*2) calc(var(--u)*8)}
.is-landscape .tg-title{font-size:calc(var(--u)*10)}`,
};
