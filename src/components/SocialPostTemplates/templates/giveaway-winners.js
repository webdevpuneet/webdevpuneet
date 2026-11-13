export default {
  id: 'giveaway-winners',
  name: 'Giveaway Winners',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'winners', 'announcement', 'contest', 'congratulations', 'dark'],
  created: '2026-11-13',
  updated: '2026-11-13',
  seoTitle: 'Giveaway Winners Announcement Post Template — Free',
  seoDescription: 'Free giveaway winners post template: a congratulations headline, three winners with prizes and optional photos, a claim line. Edit online, download PNG or HTML.',
  description: 'A "Congratulations" post that announces up to three giveaway winners, each in a glowing numbered pill with their prize, over a shimmering iridescent glow with twinkling stars, plus a claim line and a thank-you.',
  bestFor: ['Announcing contest winners on Instagram and Facebook', 'Raffle and sweepstakes results', 'Follower milestone giveaway wrap-ups'],
  fonts: { heading: 'g:Fraunces|79|e', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#160f33' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#fde047' },
    { key: 'pop', label: 'Glow', value: '#c084fc' },
  ],
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', value: 'Congratulations' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Giveaway *winners*' },
    { key: 'intro', label: 'Intro line', type: 'text', value: 'Picked at random from 4,812 entries.' },
    { key: 'place1', label: 'Winner 1 prize', type: 'text', value: '1st · $250 gift card' },
    { key: 'winner1', label: 'Winner 1 name', type: 'text', value: '@maya.makes' },
    { key: 'photo1', label: 'Winner 1 photo (optional)', type: 'image' },
    { key: 'place2', label: 'Winner 2 prize', type: 'text', value: '2nd · Product bundle' },
    { key: 'winner2', label: 'Winner 2 name', type: 'text', value: '@jordan_eats' },
    { key: 'photo2', label: 'Winner 2 photo (optional)', type: 'image' },
    { key: 'place3', label: 'Winner 3 prize', type: 'text', value: '3rd · $50 voucher' },
    { key: 'winner3', label: 'Winner 3 name', type: 'text', value: '@sofia.in.bloom' },
    { key: 'photo3', label: 'Winner 3 photo (optional)', type: 'image' },
    { key: 'claim', label: 'Claim line', type: 'text', value: 'Winners: check your DMs and reply within 48 hours to claim.' },
    { key: 'thanks', label: 'Thank-you line', type: 'text', value: 'Thank you to everyone who entered. More giveaways soon!' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="gwn">
  <div class="gwn-glow" aria-hidden="true" data-anim="breathe"></div>
  <div class="gwn-confetti" aria-hidden="true" data-anim="drift"></div>
  <i class="gwn-star gwn-s1" aria-hidden="true" data-anim="twinkle" data-at="0.2"></i>
  <i class="gwn-star gwn-s2" aria-hidden="true" data-anim="twinkle" data-at="0.9"></i>
  <i class="gwn-star gwn-s3" aria-hidden="true" data-anim="twinkle" data-at="1.6"></i>
  <div class="gwn-head">
    <span class="gwn-badge" data-edit="badge" data-anim="wobble"></span>
    <div class="gwn-title-box" data-fit-box><h2 class="gwn-title" data-edit="title" data-fit></h2></div>
    <p class="gwn-intro" data-edit="intro"></p>
  </div>
  <div class="gwn-list">
    <div class="gwn-win gwn-win-1"><b data-anim="pop" data-at="1.0">1</b><span class="gwn-pic" data-image="photo1" data-optional data-ph="portrait"></span><div class="gwn-who"><span class="gwn-place" data-edit="place1"></span><span class="gwn-name" data-edit="winner1"></span></div></div>
    <div class="gwn-win"><b data-anim="pop" data-at="1.4">2</b><span class="gwn-pic" data-image="photo2" data-optional data-ph="portrait"></span><div class="gwn-who"><span class="gwn-place" data-edit="place2"></span><span class="gwn-name" data-edit="winner2"></span></div></div>
    <div class="gwn-win"><b data-anim="pop" data-at="1.8">3</b><span class="gwn-pic" data-image="photo3" data-optional data-ph="portrait"></span><div class="gwn-who"><span class="gwn-place" data-edit="place3"></span><span class="gwn-name" data-edit="winner3"></span></div></div>
  </div>
  <div class="gwn-foot">
    <span class="gwn-claim" data-edit="claim"></span>
    <span class="gwn-thanks" data-edit="thanks"></span>
  </div>
  <span class="spt-brand gwn-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="gwn-handle" data-edit="handle"></span></span>
</div>`,
  css: `.gwn{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*2.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 12% 6%,color-mix(in srgb,var(--pop) 34%,transparent),transparent 46%),radial-gradient(circle at 92% 94%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 48%),var(--bg);overflow:hidden}
.gwn-glow{position:absolute;left:50%;top:50%;width:calc(var(--u)*130);height:calc(var(--u)*130);translate:-50% -50%;border-radius:50%;pointer-events:none;opacity:.34;background:conic-gradient(from 20deg,var(--accent),var(--pop),#67e8f9,#f0abfc,var(--accent));-webkit-mask:radial-gradient(circle,#000 0,transparent 66%);mask:radial-gradient(circle,#000 0,transparent 66%)}
.gwn-confetti{position:absolute;inset:0;pointer-events:none;opacity:.5;background:
radial-gradient(circle,var(--accent) 0 calc(var(--u)*.8),transparent calc(var(--u)*.9)) 8% 14%/calc(var(--u)*28) calc(var(--u)*24),
radial-gradient(circle,#67e8f9 0 calc(var(--u)*.6),transparent calc(var(--u)*.7)) 64% 30%/calc(var(--u)*22) calc(var(--u)*30),
radial-gradient(circle,#f0abfc 0 calc(var(--u)*.7),transparent calc(var(--u)*.8)) 36% 74%/calc(var(--u)*20) calc(var(--u)*26)}
.gwn-star{position:absolute;pointer-events:none;width:calc(var(--u)*5);height:calc(var(--u)*5);background:var(--accent);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%)}
.gwn-s1{right:calc(var(--u)*9);top:calc(var(--pt) + var(--u)*3)}
.gwn-s2{left:calc(var(--u)*5);top:46%;width:calc(var(--u)*3.4);height:calc(var(--u)*3.4);background:#67e8f9}
.gwn-s3{right:calc(var(--u)*6);top:60%;width:calc(var(--u)*4);height:calc(var(--u)*4);background:#f0abfc}
.gwn-head{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*2.4)}
.gwn-badge{padding:calc(var(--u)*1.2) calc(var(--u)*3.6);border-radius:99px;border:calc(var(--u)*.5) solid var(--accent);color:var(--accent);font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.2em;background:color-mix(in srgb,var(--accent) 10%,transparent)}
.gwn-title-box{display:flex;align-items:center;max-height:calc(var(--u)*32)}
.gwn-title{font-family:var(--font-heading);font-size:calc(var(--u)*10.5);line-height:1.2;font-weight:800;font-style:italic;letter-spacing:-.02em;padding-right:.14em}
.gwn-intro{font-size:calc(var(--u)*3.4);font-weight:600;opacity:.78}
.gwn-list{position:relative;flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*1.8);min-height:0}
.gwn-win{display:flex;align-items:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*2) calc(var(--u)*3.6);border-radius:calc(var(--u)*6);background:linear-gradient(110deg,color-mix(in srgb,var(--text) 14%,transparent),color-mix(in srgb,var(--text) 5%,transparent));border:1px solid color-mix(in srgb,var(--text) 26%,transparent);backdrop-filter:blur(2px)}
.gwn-win:has([data-edit="winner2"]:empty),.gwn-win:has([data-edit="winner3"]:empty){display:none}
.gwn-win-1{padding:calc(var(--u)*3) calc(var(--u)*3.8);border-color:var(--accent);background:linear-gradient(110deg,color-mix(in srgb,var(--accent) 26%,transparent),color-mix(in srgb,var(--pop) 14%,transparent));box-shadow:0 calc(var(--u)*2) calc(var(--u)*7) color-mix(in srgb,var(--accent) 28%,transparent)}
.gwn-win b{flex:none;width:calc(var(--u)*7.6);height:calc(var(--u)*7.6);border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--accent),color-mix(in srgb,var(--pop) 60%,#fff));color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*4.4);font-weight:800}
.gwn-win-1 b{width:calc(var(--u)*9.4);height:calc(var(--u)*9.4);font-size:calc(var(--u)*5)}
.gwn-pic{flex:none;width:calc(var(--u)*7.6);height:calc(var(--u)*7.6);border-radius:50%;border:calc(var(--u)*.5) solid color-mix(in srgb,var(--text) 70%,transparent)}
.gwn-win-1 .gwn-pic{width:calc(var(--u)*9.4);height:calc(var(--u)*9.4);border-color:var(--accent)}
.gwn-who{display:flex;flex-direction:column;gap:calc(var(--u)*.6);min-width:0}
.gwn-place{font-size:calc(var(--u)*2.7);font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--accent)}
.gwn-name{font-family:var(--font-heading);font-size:calc(var(--u)*4.8);font-weight:700;line-height:1.1}
.gwn-win-1 .gwn-name{font-size:calc(var(--u)*6)}
.gwn-foot{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*1);padding-right:calc(var(--u)*24)}
.gwn-claim{font-size:calc(var(--u)*3.2);font-weight:700}
.gwn-thanks{font-size:calc(var(--u)*2.6);opacity:.68}
.gwn-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.spt .gwn-brand{position:absolute;right:var(--pad);bottom:var(--pb)}
.gwn:has(.spt-logo.has-img) .gwn-foot{padding-right:calc(var(--u)*33)}
.is-landscape .gwn{display:grid;grid-template-columns:1fr 1.05fr;grid-template-rows:1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .gwn-head{grid-row:1;grid-column:1;justify-content:center}
.is-landscape .gwn-list{grid-row:1/3;grid-column:2;justify-content:center}
.is-landscape .gwn-foot{grid-row:2;grid-column:1;padding-right:0}
.is-landscape .gwn-title{font-size:calc(var(--u)*11)}
.is-landscape .gwn-win{padding:calc(var(--u)*2.2) calc(var(--u)*3.4)}
.is-landscape .gwn-win-1{padding:calc(var(--u)*3) calc(var(--u)*3.6)}
.is-landscape .gwn-win b{width:calc(var(--u)*7.4);height:calc(var(--u)*7.4);font-size:calc(var(--u)*4)}
.is-landscape .gwn-pic{width:calc(var(--u)*7.4);height:calc(var(--u)*7.4)}
.is-landscape .gwn-win-1 .gwn-pic{width:calc(var(--u)*9);height:calc(var(--u)*9)}
.is-landscape .gwn-win-1 b{width:calc(var(--u)*9);height:calc(var(--u)*9);font-size:calc(var(--u)*5)}
.is-landscape .gwn-name{font-size:calc(var(--u)*4.4)}
.is-landscape .gwn-win-1 .gwn-name{font-size:calc(var(--u)*5.4)}
.is-landscape .gwn-s3{top:70%}
.is-story .gwn{gap:calc(var(--u)*2)}
.is-story .gwn-title{font-size:calc(var(--u)*9.6)}
.is-square .gwn{gap:calc(var(--u)*2.6)}
.is-square .gwn-title{font-size:calc(var(--u)*9)}
.is-square .gwn-intro,.is-square .gwn-thanks{display:none}
.is-square .gwn-win{padding:calc(var(--u)*1.8) calc(var(--u)*3.4)}
.is-square .gwn-win-1{padding:calc(var(--u)*2.6) calc(var(--u)*3.6)}
.is-square .gwn-win b{width:calc(var(--u)*7);height:calc(var(--u)*7);font-size:calc(var(--u)*3.8)}
.is-square .gwn-pic{width:calc(var(--u)*7);height:calc(var(--u)*7)}
.is-square .gwn-win-1 .gwn-pic{width:calc(var(--u)*8.6);height:calc(var(--u)*8.6)}
.is-square .gwn-win-1 b{width:calc(var(--u)*8.6);height:calc(var(--u)*8.6);font-size:calc(var(--u)*4.6)}
.is-square .gwn-name{font-size:calc(var(--u)*4.2)}
.is-square .gwn-win-1 .gwn-name{font-size:calc(var(--u)*5.2)}
`,
};
