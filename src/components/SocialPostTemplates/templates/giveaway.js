export default {
  id: 'giveaway',
  name: 'Giveaway Contest',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'contest', 'win', 'engagement', 'confetti', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Instagram Giveaway Post Template — Free Contest Post Maker',
  seoDescription: 'Free Instagram giveaway post template: prize headline, prize photo, 3 numbered entry steps, deadline and rules line. Edit online, download PNG or copy the HTML.',
  description: 'A bold contest post with a "Giveaway" badge, the prize as a big headline, an optional prize photo, three numbered "how to enter" steps, the deadline and a short rules line, on a confetti background.',
  bestFor: ['Instagram and Facebook giveaways', 'Follower milestone celebrations', 'Product launch and collab contests'],
  fonts: { heading: 'poppins', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#2e1065' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#facc15' },
    { key: 'pop', label: 'Confetti', value: '#f472b6' },
  ],
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', value: 'Giveaway' },
    { key: 'prize', label: 'Prize headline', type: 'textarea', value: 'Win a *$250* gift card' },
    { key: 'photo', label: 'Prize photo (optional)', type: 'image' },
    { key: 'stepsTitle', label: 'Steps heading', type: 'text', value: 'How to enter' },
    { key: 'step1', label: 'Step 1', type: 'text', value: 'Follow @yourbrand' },
    { key: 'step2', label: 'Step 2', type: 'text', value: 'Like and save this post' },
    { key: 'step3', label: 'Step 3', type: 'text', value: 'Tag 2 friends in the comments' },
    { key: 'deadline', label: 'Deadline', type: 'text', value: 'Ends Friday, Nov 6 · Winner announced Monday' },
    { key: 'rules', label: 'Rules line', type: 'text', value: 'US residents 18+. Not sponsored by or affiliated with Instagram.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="gw">
  <div class="gw-confetti" aria-hidden="true"></div>
  <div class="gw-top">
    <div class="gw-head">
      <span class="gw-badge" data-edit="badge"></span>
      <div class="gw-body" data-fit-box><h2 class="gw-prize" data-edit="prize" data-fit></h2></div>
    </div>
    <div class="gw-photo" data-image="photo" data-optional></div>
  </div>
  <div class="gw-steps">
    <span class="gw-steps-title" data-edit="stepsTitle"></span>
    <div class="gw-step"><b>1</b><span data-edit="step1"></span></div>
    <div class="gw-step"><b>2</b><span data-edit="step2"></span></div>
    <div class="gw-step"><b>3</b><span data-edit="step3"></span></div>
  </div>
  <div class="gw-foot">
    <span class="gw-deadline" data-edit="deadline"></span>
    <span class="gw-rules" data-edit="rules"></span>
  </div>
  <span class="gw-handle" data-edit="handle"></span>
</div>`,
  css: `.gw{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 85% 10%,color-mix(in srgb,var(--pop) 35%,transparent),transparent 45%),radial-gradient(circle at 0% 100%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 50%),var(--bg)}
.gw-confetti{position:absolute;inset:0;pointer-events:none;opacity:.42;background:
radial-gradient(circle,var(--accent) 0 calc(var(--u)*.9),transparent calc(var(--u)*1)) 12% 9%/calc(var(--u)*30) calc(var(--u)*26),
radial-gradient(circle,var(--pop) 0 calc(var(--u)*.7),transparent calc(var(--u)*.8)) 70% 22%/calc(var(--u)*24) calc(var(--u)*32),
radial-gradient(circle,#fff 0 calc(var(--u)*.45),transparent calc(var(--u)*.55)) 40% 60%/calc(var(--u)*18) calc(var(--u)*22)}
.gw-top{position:relative;flex:1;display:flex;gap:calc(var(--u)*5);min-height:0}
.gw-head{flex:1;display:flex;flex-direction:column;gap:calc(var(--u)*3);min-width:0}
.gw-badge{align-self:flex-start;padding:calc(var(--u)*1.2) calc(var(--u)*3.4);border-radius:99px;background:var(--accent);color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:800;text-transform:uppercase;letter-spacing:.14em;transform:rotate(-3deg)}
.gw-body{flex:1;display:flex;align-items:center}
.gw-prize{font-family:var(--font-heading);font-size:calc(var(--u)*10);line-height:1.02;font-weight:800;letter-spacing:-.02em}
.gw-photo{flex:none;align-self:center;width:calc(var(--u)*34);height:calc(var(--u)*34);border-radius:calc(var(--u)*5);border:calc(var(--u)*1) solid var(--accent);transform:rotate(4deg);box-shadow:0 calc(var(--u)*2) calc(var(--u)*8) rgba(0,0,0,.35)}
.gw-steps{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*2);padding:calc(var(--u)*4.4);border-radius:calc(var(--u)*4);background:color-mix(in srgb,var(--text) 9%,transparent);border:1px solid color-mix(in srgb,var(--text) 16%,transparent)}
.gw-steps-title{font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--accent)}
.gw-step{display:flex;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*4.2);font-weight:600}
.gw-step b{flex:none;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*3.6)}
.gw-foot{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*1)}
.gw-deadline{font-size:calc(var(--u)*3.6);font-weight:700}
.gw-rules{font-size:calc(var(--u)*2.5);opacity:.6}
.gw-handle{position:absolute;right:var(--pad);bottom:var(--pb);font-size:calc(var(--u)*3.2);font-weight:700;color:var(--accent)}
.gw-foot{padding-right:calc(var(--u)*24)}
.is-landscape .gw{display:grid;grid-template-columns:1.15fr 1fr;grid-template-rows:1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .gw-top{grid-row:1/3}
.is-landscape .gw-steps{align-self:center}
.is-landscape .gw-prize{font-size:calc(var(--u)*9)}
.is-landscape .gw-photo{width:calc(var(--u)*26);height:calc(var(--u)*26)}
.is-story .gw-top{flex-direction:column;align-items:flex-start}
.is-story .gw-photo{align-self:center;width:calc(var(--u)*52);height:calc(var(--u)*52)}`,
};
