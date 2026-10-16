export default {
  id: 'milestone',
  name: 'Milestone',
  version: '1.0.0',
  category: 'announcements',
  tags: ['milestone', 'celebration', 'number', 'light'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Milestone Post Template — Free "Thank You" Social Post',
  seoDescription: 'Free milestone social post template with a giant number, confetti and a thank-you line for followers, users or sales. Download every post size or copy HTML.',
  description: 'A celebratory card with a giant milestone number, what it counts, a thank-you message and CSS confetti.',
  bestFor: ['Follower and user milestones', 'Revenue or download goals', 'Company anniversaries'],
  fonts: { heading: 'montserrat', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#ecfdf5' },
    { key: 'text', label: 'Text', value: '#064e3b' },
    { key: 'accent', label: 'Accent', value: '#10b981' },
    { key: 'accent2', label: 'Confetti', value: '#f59e0b' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'We just hit' },
    { key: 'number', label: 'Number', type: 'text', value: '10,000' },
    { key: 'unit', label: 'What it counts', type: 'text', value: 'happy users' },
    { key: 'thanks', label: 'Message', type: 'textarea', value: 'Thank you for building with us. The next 10K starts today.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="m">
  <i class="m-c c1"></i><i class="m-c c2"></i><i class="m-c c3"></i><i class="m-c c4"></i><i class="m-c c5"></i><i class="m-c c6"></i>
  <div class="m-body" data-fit-box>
    <span class="m-kicker" data-edit="kicker"></span>
    <span class="m-num" data-edit="number" data-fit></span>
    <span class="m-unit" data-edit="unit"></span>
    <p class="m-thanks" data-edit="thanks" data-fit></p>
  </div>
  <span class="m-handle" data-edit="handle"></span>
</div>`,
  css: `.m{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:var(--pt) var(--pad) var(--pb);background:var(--bg);text-align:center}
.m-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2);width:100%}
.m-kicker{font-size:calc(var(--u)*4);font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:var(--accent)}
.m-num{font-family:var(--font-heading);font-size:calc(var(--u)*24);line-height:.95;font-weight:900;letter-spacing:-.04em;white-space:nowrap}
.m-unit{font-family:var(--font-heading);font-size:calc(var(--u)*6);font-weight:700}
.m-thanks{margin-top:calc(var(--u)*3);font-size:calc(var(--u)*3.8);line-height:1.5;opacity:.8;max-width:80%}
.m-handle{font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.m-c{position:absolute;width:calc(var(--u)*3);height:calc(var(--u)*6);border-radius:calc(var(--u)*.8);background:var(--accent2);transform:rotate(25deg)}
.c1{top:12%;left:10%}.c2{top:18%;right:14%;background:var(--accent);transform:rotate(-30deg)}.c3{bottom:22%;left:14%;background:var(--accent);transform:rotate(60deg)}
.c4{bottom:16%;right:10%;transform:rotate(-12deg)}.c5{top:42%;left:5%;width:calc(var(--u)*3);height:calc(var(--u)*3);border-radius:50%}.c6{top:36%;right:6%;width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);border-radius:50%;background:var(--accent)}`,
};
