export default {
  id: 'pricing-card',
  name: 'Pricing Card',
  version: '1.0.0',
  category: 'promo',
  tags: ['pricing', 'plan', 'subscription', 'saas', 'offer', 'card', 'light'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Pricing Card Post Template — Free Plan & Price Social Post',
  seoDescription: 'Free pricing card post template: a "most popular" ribbon, plan name, a big price, up to four tick-marked features and a call-to-action button. Edit and export.',
  description: 'A pricing-card post: a "most popular" ribbon, the plan name and tagline, a big price with its billing period, up to four tick-marked features, a call-to-action button and your handle.',
  bestFor: ['Announcing a plan, price or new tier', 'SaaS, course and membership offers', 'Service packages for freelancers and agencies'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#eef0ff' },
    { key: 'card', label: 'Card', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#14122b' },
    { key: 'accent', label: 'Accent', value: '#5b3df5' },
  ],
  fields: [
    { key: 'badge', label: 'Ribbon', type: 'text', value: 'Most popular' },
    { key: 'plan', label: 'Plan name', type: 'text', value: 'Pro' },
    { key: 'tagline', label: 'Tagline', type: 'text', value: 'For teams shipping every week' },
    { key: 'price', label: 'Price', type: 'text', value: '$29' },
    { key: 'period', label: 'Billing period', type: 'text', value: 'per month' },
    { key: 'f1', label: 'Feature 1', type: 'text', value: 'Unlimited projects' },
    { key: 'f2', label: 'Feature 2', type: 'text', value: 'Custom domains' },
    { key: 'f3', label: 'Feature 3', type: 'text', value: 'Priority support' },
    { key: 'f4', label: 'Feature 4 (optional)', type: 'text', value: 'Export to code' },
    { key: 'cta', label: 'Button', type: 'text', value: 'Start free for 14 days' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="pc">
  <div class="pc-card">
    <span class="pc-badge" data-edit="badge"></span>
    <div class="pc-head">
      <h2 class="pc-plan" data-edit="plan"></h2>
      <p class="pc-tag" data-edit="tagline"></p>
    </div>
    <div class="pc-price"><b data-edit="price"></b><span data-edit="period"></span></div>
    <div class="pc-feats" data-fit-box>
      <p><i aria-hidden="true" data-anim="tick">&#10003;</i><span data-edit="f1"></span></p>
      <p><i aria-hidden="true" data-anim="tick">&#10003;</i><span data-edit="f2"></span></p>
      <p><i aria-hidden="true" data-anim="tick">&#10003;</i><span data-edit="f3"></span></p>
      <p><i aria-hidden="true" data-anim="tick">&#10003;</i><span data-edit="f4"></span></p>
    </div>
    <span class="pc-cta" data-edit="cta"></span>
  </div>
  <span class="pc-handle" data-edit="handle"></span>
</div>`,
  css: `.pc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*3.6);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 85% 8%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 50%),var(--bg)}
.pc-card{position:relative;width:100%;max-width:calc(var(--u)*78);flex:1;max-height:100%;display:flex;flex-direction:column;gap:calc(var(--u)*3.2);padding:calc(var(--u)*6.4) calc(var(--u)*6) calc(var(--u)*5.4);border-radius:calc(var(--u)*5);background:var(--card);box-shadow:0 0 0 calc(var(--u)*.6) var(--accent),0 calc(var(--u)*3) calc(var(--u)*10) color-mix(in srgb,var(--accent) 28%,transparent);min-height:0}
.pc-badge{position:absolute;top:calc(var(--u)*-2.8);left:50%;transform:translateX(-50%);white-space:nowrap;background:linear-gradient(90deg,var(--accent),color-mix(in srgb,var(--accent) 60%,#ec4899));color:#fff;font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.14em;padding:calc(var(--u)*1.3) calc(var(--u)*4);border-radius:99px}
.pc-badge:empty{display:none}
.pc-plan{font-family:var(--font-heading);font-size:calc(var(--u)*7.6);line-height:1;font-weight:800;letter-spacing:-.02em;color:var(--accent)}
.pc-tag{margin-top:calc(var(--u)*1);font-size:calc(var(--u)*3.2);opacity:.7}
.pc-price{display:flex;align-items:baseline;gap:calc(var(--u)*2);padding-bottom:calc(var(--u)*3);border-bottom:calc(var(--u)*.35) dashed color-mix(in srgb,var(--text) 22%,transparent)}
.pc-price b{font-family:var(--font-heading);font-size:calc(var(--u)*16);line-height:.9;font-weight:800;letter-spacing:-.04em}
.pc-price span{font-size:calc(var(--u)*3.4);font-weight:600;opacity:.65}
.pc-feats{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2.6);margin:0 calc(var(--u)*-1.6);padding:calc(var(--u)*.8) calc(var(--u)*1.6)}/* room around the rows: the box clips (overflow hidden) and a tick overshoots when it pops */
.pc-feats p{display:flex;align-items:center;gap:calc(var(--u)*2.6);font-size:calc(var(--u)*3.6);font-weight:600;line-height:1.2}
.pc-feats p:has(> span:empty){display:none}
.pc-feats i{flex:none;width:calc(var(--u)*5.4);height:calc(var(--u)*5.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:calc(var(--u)*2.8);font-weight:800;color:#fff;background:var(--accent)}
.pc-cta{display:block;text-align:center;font-size:calc(var(--u)*3.8);font-weight:800;color:#fff;background:var(--accent);padding:calc(var(--u)*3.2) calc(var(--u)*4);border-radius:calc(var(--u)*3)}
.pc-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-landscape .pc-card{max-width:none;display:grid;grid-template-columns:1fr 1.1fr;grid-template-rows:auto auto 1fr;column-gap:calc(var(--u)*6);padding:calc(var(--u)*5) calc(var(--u)*6)}
.is-landscape .pc-head{grid-column:1;grid-row:1}
.is-landscape .pc-price{grid-column:1;grid-row:2;border-bottom:0;padding-bottom:0}
.is-landscape .pc-feats{grid-column:2;grid-row:1/4}
.is-landscape .pc-cta{grid-column:1;grid-row:3;align-self:end}
.is-landscape .pc-price b{font-size:calc(var(--u)*13)}
.is-square .pc{gap:calc(var(--u)*2.6)}
.is-square .pc-card{gap:calc(var(--u)*2.4);padding:calc(var(--u)*4.6) calc(var(--u)*5) calc(var(--u)*4)}
.is-square .pc-plan{font-size:calc(var(--u)*6.4)}
.is-square .pc-tag{font-size:calc(var(--u)*2.9)}
.is-square .pc-price{padding-bottom:calc(var(--u)*2)}
.is-square .pc-price b{font-size:calc(var(--u)*11.5)}
.is-square .pc-feats{gap:calc(var(--u)*2)}
.is-square .pc-feats p{font-size:calc(var(--u)*3.2)}
.is-square .pc-feats i{width:calc(var(--u)*4.6);height:calc(var(--u)*4.6);font-size:calc(var(--u)*2.4)}
.is-square .pc-cta{font-size:calc(var(--u)*3.4);padding:calc(var(--u)*2.4) calc(var(--u)*4)}`,
};
