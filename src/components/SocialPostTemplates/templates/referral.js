export default {
  id: 'referral',
  name: 'Refer a Friend',
  version: '1.0.0',
  category: 'promo',
  tags: ['referral', 'refer a friend', 'give get', 'reward', 'invite', 'gift', 'promo code', 'light'],
  created: '2026-11-19',
  updated: '2026-11-19',
  seoTitle: 'Refer a Friend Post Template — Give $20, Get $20 Reward',
  seoDescription: 'Free refer a friend post template: two reward cards with hopping gift boxes, both rewards side by side, three simple steps and your code. Edit and download it.',
  description: 'A two-sided referral post: a bold "Give $20, get $20" headline, a card for what you get and a card for what your friend gets, each topped with a gift box that hops in turn, swap arrows passing between them, three numbered steps and a code or link line.',
  bestFor: ['Launching or reminding people about a referral programme', 'Shops, apps and services with a give-get reward', 'Story and feed posts that turn customers into promoters'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f3eeff' },
    { key: 'text', label: 'Text', value: '#1c1633' },
    { key: 'accent', label: 'Your card', value: '#ff6152' },
    { key: 'pop', label: 'Friend card', value: '#14b892' },
  ],
  fields: [
    { key: 'kicker', label: 'Label', type: 'text', value: 'Refer a friend' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Give *$20*, get *$20*' },
    { key: 'youLabel', label: 'Your card label', type: 'text', value: 'You get' },
    { key: 'youAmt', label: 'Your reward', type: 'text', value: '$20' },
    { key: 'youSub', label: 'Your card note', type: 'text', value: 'store credit' },
    { key: 'themLabel', label: 'Friend card label', type: 'text', value: 'Your friend gets' },
    { key: 'themAmt', label: 'Friend reward', type: 'text', value: '$20' },
    { key: 'themSub', label: 'Friend card note', type: 'text', value: 'off their first order' },
    { key: 'step1', label: 'Step 1', type: 'text', value: 'Share your link' },
    { key: 'step2', label: 'Step 2', type: 'text', value: 'Your friend orders' },
    { key: 'step3', label: 'Step 3', type: 'text', value: 'You both get rewarded' },
    { key: 'cta', label: 'Code or link line', type: 'text', value: 'Find your link in your account · no limit on invites' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="rf">
  <div class="rf-dots" aria-hidden="true"><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i></div>
  <div class="rf-top">
    <span class="rf-kicker" data-edit="kicker"></span>
    <span class="spt-brand rf-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="rf-handle" data-edit="handle"></span></span>
  </div>
  <div class="rf-title-box" data-fit-box><h2 class="rf-title" data-edit="title" data-fit></h2></div>
  <div class="rf-cards">
    <div class="rf-card rf-you" data-anim="slide-l">
      <div class="rf-gift" aria-hidden="true" data-anim="hop"><i></i></div>
      <span class="rf-label" data-edit="youLabel"></span>
      <b class="rf-amt" data-edit="youAmt" data-anim="count"></b>
      <span class="rf-sub" data-edit="youSub"></span>
    </div>
    <div class="rf-swap" aria-hidden="true"><span><i data-anim="nudge-x">→</i></span><span class="rf-back"><i data-anim="nudge-x">→</i></span></div>
    <div class="rf-card rf-them" data-anim="slide-r">
      <div class="rf-gift" aria-hidden="true" data-anim="hop"><i></i></div>
      <span class="rf-label" data-edit="themLabel"></span>
      <b class="rf-amt" data-edit="themAmt" data-anim="count"></b>
      <span class="rf-sub" data-edit="themSub"></span>
    </div>
  </div>
  <ol class="rf-steps">
    <li><i aria-hidden="true" data-anim="pop">1</i><span data-edit="step1"></span></li>
    <li><i aria-hidden="true" data-anim="pop">2</i><span data-edit="step2"></span></li>
    <li><i aria-hidden="true" data-anim="pop">3</i><span data-edit="step3"></span></li>
  </ol>
  <p class="rf-cta" data-edit="cta"></p>
</div>`,
  css: `.rf{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 0 40%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 40%),radial-gradient(circle at 100% 70%,color-mix(in srgb,var(--pop) 18%,transparent),transparent 42%),var(--bg);color:var(--text);overflow:hidden}
.rf-dots{position:absolute;inset:0;pointer-events:none}
.rf-dots i{position:absolute;border-radius:50%}
.rf-dots i:nth-child(1){left:8%;top:30%;width:calc(var(--u)*3);height:calc(var(--u)*3);background:var(--accent)}
.rf-dots i:nth-child(2){right:10%;top:18%;width:calc(var(--u)*2.2);height:calc(var(--u)*2.2);background:var(--pop)}
.rf-dots i:nth-child(3){right:6%;bottom:22%;width:calc(var(--u)*3.4);height:calc(var(--u)*3.4);border:calc(var(--u)*.6) solid var(--accent)}
.rf-dots i:nth-child(4){left:5%;bottom:14%;width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);border:calc(var(--u)*.6) solid var(--pop)}
.rf-top{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.rf-kicker{padding:calc(var(--u)*1.3) calc(var(--u)*3);border-radius:99px;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3);font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.rf-brand{flex:none}
.spt .rf-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.1);font-weight:800}
.rf-title-box{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center}
.rf-title{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1.3;font-weight:800;letter-spacing:-.03em;text-align:center}
.rf-title .hl{color:var(--accent)}
.rf-title .hl ~ .hl{color:var(--pop)}
.rf-cards{position:relative;flex:none;display:flex;align-items:stretch;justify-content:center;gap:calc(var(--u)*2)}
.rf-card{position:relative;flex:1;max-width:calc(var(--u)*38);display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*.6);padding:calc(var(--u)*8.5) calc(var(--u)*2.4) calc(var(--u)*3.4);margin-top:calc(var(--u)*5);border-radius:calc(var(--u)*4);color:#fff;text-align:center;box-shadow:0 calc(var(--u)*1.6) calc(var(--u)*4) rgba(28,22,51,.18)}
.rf-you{background:linear-gradient(160deg,color-mix(in srgb,var(--accent) 80%,#fff),var(--accent));rotate:-3deg}
.rf-them{background:linear-gradient(160deg,color-mix(in srgb,var(--pop) 80%,#fff),var(--pop));rotate:3deg}
.rf-gift{position:absolute;left:50%;top:calc(var(--u)*-5.5);width:calc(var(--u)*12);height:calc(var(--u)*11);margin-left:calc(var(--u)*-6)}
.rf-gift::before{content:'';position:absolute;left:0;right:0;top:calc(var(--u)*1.6);height:calc(var(--u)*3);border-radius:calc(var(--u)*.8);background:#fff;box-shadow:0 calc(var(--u)*.4) 0 rgba(0,0,0,.08)}
.rf-gift::after{content:'';position:absolute;left:calc(var(--u)*.9);right:calc(var(--u)*.9);top:calc(var(--u)*4.4);bottom:0;border-radius:0 0 calc(var(--u)*1) calc(var(--u)*1);background:linear-gradient(90deg,transparent 42%,var(--text) 42% 58%,transparent 58%),#fff}
.rf-gift i{position:absolute;left:50%;top:calc(var(--u)*-1.2);width:calc(var(--u)*9);height:calc(var(--u)*3.4);margin-left:calc(var(--u)*-4.5);z-index:1}
.rf-gift i::before,.rf-gift i::after{content:'';position:absolute;top:0;width:56%;height:100%;border:calc(var(--u)*.8) solid var(--text);border-radius:60% 60% 50% 50% / 80% 80% 40% 40%}
.rf-gift i::before{left:-2%;rotate:-22deg;transform-origin:100% 100%}
.rf-gift i::after{right:-2%;rotate:22deg;transform-origin:0 100%}
.rf-gift{background:linear-gradient(90deg,transparent 43%,var(--text) 43% 57%,transparent 57%) 0 calc(var(--u)*1.6)/100% calc(var(--u)*3) no-repeat}
.rf-gift::before{z-index:0}
.rf-label{font-size:calc(var(--u)*2.8);font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.9}
.rf-amt{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1.15;font-weight:800;letter-spacing:-.03em}
.rf-sub{font-size:calc(var(--u)*2.8);font-weight:600;opacity:.92}
.rf-swap{flex:none;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*.6);padding-top:calc(var(--u)*5);font-size:calc(var(--u)*5);font-weight:900;color:var(--text)}
.rf-swap span{display:block;line-height:1}
.rf-swap i{font-style:normal;line-height:1}
.rf-back{scale:-1 1;color:color-mix(in srgb,var(--text) 55%,transparent)}
.rf-steps{position:relative;list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.rf-steps li{display:flex;align-items:center;gap:calc(var(--u)*1.6);padding:calc(var(--u)*1.8) calc(var(--u)*2);border-radius:calc(var(--u)*2.4);background:#fff;font-size:calc(var(--u)*2.8);font-weight:700;line-height:1.25;box-shadow:0 calc(var(--u)*.6) calc(var(--u)*1.8) rgba(28,22,51,.08)}
.rf-steps i{flex:none;display:grid;place-items:center;width:calc(var(--u)*5.4);height:calc(var(--u)*5.4);border-radius:50%;background:var(--text);color:var(--bg);font-style:normal;font-size:calc(var(--u)*2.8);font-weight:800}
.rf-steps li span{min-width:0}
.rf-cta{position:relative;text-align:center;font-size:calc(var(--u)*3);font-weight:700;color:color-mix(in srgb,var(--text) 70%,transparent)}
.is-square .rf{gap:calc(var(--u)*2.2)}
.is-square .rf-title{font-size:calc(var(--u)*9)}
.is-square .rf-card{padding:calc(var(--u)*7.5) calc(var(--u)*2) calc(var(--u)*2.4);max-width:calc(var(--u)*32)}
.is-square .rf-amt{font-size:calc(var(--u)*9)}
.is-square .rf-steps li{padding:calc(var(--u)*1.4) calc(var(--u)*1.6);font-size:calc(var(--u)*2.5)}
.is-square .rf-steps i{width:calc(var(--u)*4.4);height:calc(var(--u)*4.4)}

.is-story .rf-title{font-size:calc(var(--u)*12.5)}
.is-pin .rf-steps{grid-template-columns:1fr}
.is-landscape .rf{display:grid;grid-template-columns:1fr 1.1fr;grid-template-rows:auto 1fr auto auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.6)}
.is-landscape .rf-top{grid-column:1/3}
.is-landscape .rf-title-box{grid-column:1;grid-row:2}
.is-landscape .rf-title{text-align:left;font-size:calc(var(--u)*11)}
.is-landscape .rf-cards{grid-column:2;grid-row:2/4;align-self:center}
.is-landscape .rf-steps{grid-column:1;grid-row:3;grid-template-columns:1fr;gap:calc(var(--u)*1.2)}
.is-landscape .rf-steps li{padding:calc(var(--u)*1.2) calc(var(--u)*1.8)}
.is-landscape .rf-steps i{width:calc(var(--u)*4.6);height:calc(var(--u)*4.6)}
.is-landscape .rf-cta{grid-column:1/3;grid-row:4;text-align:left}
.is-landscape .rf-amt{font-size:calc(var(--u)*13)}
.is-landscape .rf-card{padding-bottom:calc(var(--u)*4)}
.is-linkedin .rf-title{font-size:calc(var(--u)*9)}
.is-linkedin .rf-amt{font-size:calc(var(--u)*10)}
.is-linkedin .rf-steps li{font-size:calc(var(--u)*2.6)}
.is-linkedin .rf-card{padding:calc(var(--u)*7.5) calc(var(--u)*2) calc(var(--u)*2.6)}`,
};
