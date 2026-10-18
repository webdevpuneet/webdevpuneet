export default {
  id: 'new-year',
  name: 'Happy New Year',
  version: '1.0.0',
  category: 'holidays',
  tags: ['new-year', '2027', 'celebration', 'january', 'dark'],
  created: '2026-10-18',
  updated: '2026-10-18',
  seoTitle: 'New Year Post Template — Free Happy New Year 2027 Post',
  seoDescription: 'Free Happy New Year 2027 post template with a giant gold year, fireworks, confetti, a short message and your handle. Edit online and download every post size.',
  description: 'A midnight-and-gold New Year post: a giant outlined year with a gold gradient fill, CSS fireworks and confetti, a "Happy New Year" kicker, a short message and your handle.',
  bestFor: ['Happy New Year 2027 greetings', 'Year-in-review and "thank you for 2026" posts', 'New Year sales and January resolutions content'],
  fonts: { heading: 'montserrat', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0b1026' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Gold', value: '#f5c451' },
    { key: 'accent2', label: 'Fireworks', value: '#a78bfa' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Happy New Year' },
    { key: 'year', label: 'Year', type: 'text', value: '2027' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'Thank you for an incredible 2026. Here’s to new ideas, bigger goals and *more good days* together.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="ny">
  <i class="ny-fw f1"></i><i class="ny-fw f2"></i><i class="ny-fw f3"></i>
  <i class="ny-cf c1"></i><i class="ny-cf c2"></i><i class="ny-cf c3"></i><i class="ny-cf c4"></i><i class="ny-cf c5"></i><i class="ny-cf c6"></i>
  <div class="ny-body" data-fit-box>
    <span class="ny-kicker" data-edit="kicker"></span>
    <span class="ny-year" data-edit="year" data-fit></span>
    <p class="ny-msg" data-edit="message" data-fit></p>
  </div>
  <span class="ny-handle" data-edit="handle"></span>
</div>`,
  css: `.ny{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 110%,color-mix(in srgb,var(--accent2) 28%,transparent),transparent 60%),var(--bg);text-align:center;overflow:hidden}
.ny-fw{position:absolute;width:calc(var(--u)*26);height:calc(var(--u)*26);border-radius:50%;background:repeating-conic-gradient(from 0deg,var(--accent2) 0deg 2deg,transparent 2deg 15deg);-webkit-mask:radial-gradient(circle,transparent 18%,#000 20%,#000 46%,transparent 50%);mask:radial-gradient(circle,transparent 18%,#000 20%,#000 46%,transparent 50%);opacity:.85}
.f1{top:4%;left:-4%}
.f2{top:10%;right:-6%;width:calc(var(--u)*34);height:calc(var(--u)*34);background:repeating-conic-gradient(from 7deg,var(--accent) 0deg 2deg,transparent 2deg 12deg)}
.f3{bottom:14%;left:8%;width:calc(var(--u)*16);height:calc(var(--u)*16);opacity:.55}
.ny-cf{position:absolute;width:calc(var(--u)*1.4);height:calc(var(--u)*3.2);border-radius:calc(var(--u)*.4);background:var(--accent);transform:rotate(30deg)}
.c1{top:30%;left:14%}.c2{top:22%;left:54%;background:var(--accent2);transform:rotate(-40deg)}.c3{bottom:26%;right:14%;transform:rotate(70deg)}
.c4{bottom:12%;right:34%;background:var(--accent2);transform:rotate(15deg)}.c5{top:46%;right:7%;width:calc(var(--u)*1.6);height:calc(var(--u)*1.6);border-radius:50%}.c6{top:58%;left:5%;width:calc(var(--u)*1.2);height:calc(var(--u)*1.2);border-radius:50%;background:#fff}
.ny-body{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6);width:100%}
.ny-kicker{font-size:calc(var(--u)*4);font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:var(--accent)}
.ny-year{font-family:var(--font-heading);font-size:calc(var(--u)*32);line-height:.9;font-weight:900;letter-spacing:-.04em;white-space:nowrap;background:linear-gradient(180deg,#fff7d6 0%,var(--accent) 55%,color-mix(in srgb,var(--accent) 60%,#7c4a03) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 calc(var(--u)*3) color-mix(in srgb,var(--accent) 45%,transparent))}
.ny-msg{font-size:calc(var(--u)*4);line-height:1.5;opacity:.9;max-width:84%}
.ny-handle{position:relative;font-size:calc(var(--u)*3.1);font-weight:700;color:var(--accent)}
.is-landscape .ny-year{font-size:calc(var(--u)*26)}`,
};
