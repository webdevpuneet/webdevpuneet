export default {
  id: 'winner-reveal',
  name: 'Giveaway Winner Reveal',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'winner', 'reveal', 'spotlight', 'announcement', 'photo'],
  created: '2026-11-13',
  updated: '2026-11-13',
  seoTitle: 'Giveaway Winner Reveal Template — "And the Winner Is"',
  seoDescription: 'Giveaway winner reveal template with an "And the winner is…" opener, big spotlight photo, Winner ribbon, name and prize. Edit free online, download PNG or HTML.',
  description: 'A spotlight reveal for one giveaway winner: an "And the winner is…" opener, a large round winner photo ringed in gold with rotating light rays and sparkles, a "Winner" ribbon, the name in big type and the prize.',
  bestFor: ['Announcing a single giveaway winner', 'Prize draw and raffle reveals', 'Customer of the month and contest results'],
  fonts: { heading: 'montserrat', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#33082a' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Gold', value: '#ffd166' },
    { key: 'pop', label: 'Pink', value: '#ff5ca8' },
  ],
  fields: [
    { key: 'kicker', label: 'Opener', type: 'text', value: 'And the winner is…' },
    { key: 'photo', label: 'Winner photo', type: 'image', ph: 'portrait' },
    { key: 'ribbon', label: 'Ribbon', type: 'text', value: 'Winner' },
    { key: 'winner', label: 'Winner name', type: 'text', value: 'Maya Rivera' },
    { key: 'prize', label: 'Prize line', type: 'text', value: 'Wins a *$250* gift card' },
    { key: 'claim', label: 'Claim line', type: 'text', value: 'Congratulations! Check your DMs to claim your prize.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="wr">
  <div class="wr-rays" aria-hidden="true" data-anim="spin"></div>
  <div class="wr-confetti" aria-hidden="true" data-anim="drift"></div>
  <i class="wr-star wr-s1" aria-hidden="true" data-anim="twinkle" data-at="0.3"></i>
  <i class="wr-star wr-s2" aria-hidden="true" data-anim="twinkle" data-at="1.0"></i>
  <i class="wr-star wr-s3" aria-hidden="true" data-anim="twinkle" data-at="1.7"></i>
  <i class="wr-star wr-s4" aria-hidden="true" data-anim="twinkle" data-at="0.7"></i>
  <p class="wr-kicker" data-edit="kicker"></p>
  <div class="wr-stage">
    <i class="wr-halo" aria-hidden="true" data-anim="pulse"></i>
    <div class="wr-photo" data-image="photo" data-ph="portrait"></div>
    <span class="wr-ribbon" data-edit="ribbon" data-anim="stamp" data-at="1.2"></span>
  </div>
  <div class="wr-name-box" data-fit-box><h2 class="wr-name" data-edit="winner" data-fit></h2></div>
  <p class="wr-prize" data-edit="prize" data-anim="pulse" data-at="1.8"></p>
  <p class="wr-claim" data-edit="claim"></p>
  <span class="spt-brand wr-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="wr-handle" data-edit="handle"></span></span>
</div>`,
  css: `.wr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*2.6);padding:var(--pt) var(--pad) var(--pb);text-align:center;background:radial-gradient(circle at 50% 36%,color-mix(in srgb,var(--pop) 30%,transparent),transparent 56%),radial-gradient(circle at 50% 110%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 50%),var(--bg);overflow:hidden}
.wr-rays{position:absolute;left:50%;top:36%;width:calc(var(--u)*170);height:calc(var(--u)*170);translate:-50% -50%;pointer-events:none;opacity:.55;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--accent) 30%,transparent) 0 5deg,transparent 5deg 15deg);-webkit-mask:radial-gradient(circle,#000 0,transparent 60%);mask:radial-gradient(circle,#000 0,transparent 60%)}
.wr-confetti{position:absolute;inset:0;pointer-events:none;opacity:.55;background:
radial-gradient(circle,var(--accent) 0 calc(var(--u)*.8),transparent calc(var(--u)*.9)) 6% 10%/calc(var(--u)*26) calc(var(--u)*22),
radial-gradient(circle,var(--pop) 0 calc(var(--u)*.7),transparent calc(var(--u)*.8)) 58% 24%/calc(var(--u)*22) calc(var(--u)*28),
radial-gradient(circle,#fff 0 calc(var(--u)*.5),transparent calc(var(--u)*.6)) 30% 70%/calc(var(--u)*18) calc(var(--u)*24)}
.wr-star{position:absolute;pointer-events:none;background:var(--accent);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%)}
.wr-s1{left:calc(var(--u)*10);top:30%;width:calc(var(--u)*6);height:calc(var(--u)*6)}
.wr-s2{right:calc(var(--u)*9);top:24%;width:calc(var(--u)*4.4);height:calc(var(--u)*4.4);background:#fff}
.wr-s3{right:calc(var(--u)*12);top:46%;width:calc(var(--u)*5.4);height:calc(var(--u)*5.4);background:var(--pop)}
.wr-s4{left:calc(var(--u)*7);top:50%;width:calc(var(--u)*3.6);height:calc(var(--u)*3.6);background:#fff}
.wr-kicker{position:relative;font-family:var(--font-heading);font-size:calc(var(--u)*5);font-weight:600;font-style:italic;color:var(--accent);letter-spacing:.01em}
.wr-stage{position:relative;flex:none;width:calc(var(--u)*46);height:calc(var(--u)*46);margin:calc(var(--u)*1.6) 0 calc(var(--u)*4.6)}
.wr-halo{position:absolute;inset:calc(var(--u)*-3);border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 55%,transparent) 55%,transparent 72%)}
.wr-photo{position:absolute;inset:0;border-radius:50%;border:calc(var(--u)*1.2) solid var(--accent);box-shadow:0 0 0 calc(var(--u)*1.2) color-mix(in srgb,var(--bg) 70%,transparent),0 calc(var(--u)*2) calc(var(--u)*8) rgba(0,0,0,.45)}
.wr-ribbon{position:absolute;left:50%;bottom:calc(var(--u)*-3.4);translate:-50% 0;padding:calc(var(--u)*1.2) calc(var(--u)*6);background:linear-gradient(135deg,var(--accent),color-mix(in srgb,var(--accent) 60%,var(--pop)));color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:800;text-transform:uppercase;letter-spacing:.22em;border-radius:calc(var(--u)*1.4);box-shadow:0 calc(var(--u)*1) calc(var(--u)*3) rgba(0,0,0,.35)}
.spt .wr-ribbon{white-space:nowrap;overflow-wrap:normal;width:max-content}
.wr-name-box{position:relative;width:100%;display:flex;align-items:center;justify-content:center;max-height:calc(var(--u)*16)}
.wr-name{font-family:var(--font-heading);font-size:calc(var(--u)*9.4);font-weight:800;line-height:1.2;text-transform:uppercase;letter-spacing:.02em}
.wr-prize{position:relative;padding:calc(var(--u)*1.8) calc(var(--u)*5);border-radius:99px;background:color-mix(in srgb,var(--text) 12%,transparent);border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);font-size:calc(var(--u)*4.2);font-weight:700}
.wr-prize:empty{display:none}
.wr-claim{position:relative;max-width:calc(var(--u)*70);font-size:calc(var(--u)*3.3);font-weight:600;opacity:.82}
.wr-claim:empty{display:none}
.wr-brand{margin-top:auto}
.wr-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-square .wr{gap:calc(var(--u)*2)}
.is-square .wr-kicker{font-size:calc(var(--u)*4.4)}
.is-square .wr-stage{width:calc(var(--u)*34);height:calc(var(--u)*34);margin:calc(var(--u)*1) 0 calc(var(--u)*4.4)}
.is-square .wr-name{font-size:calc(var(--u)*8)}
.is-square .wr-prize{font-size:calc(var(--u)*3.8)}
.is-square .wr-claim{font-size:calc(var(--u)*3)}
.is-landscape .wr{display:grid;grid-template-columns:.85fr 1.15fr;grid-template-rows:1fr auto auto auto auto 1fr auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2);align-items:center;justify-items:start;text-align:left}
.is-landscape .wr-rays{left:27%;top:50%}
.is-landscape .wr-kicker{grid-column:2;grid-row:2;font-size:calc(var(--u)*4.4)}
.is-landscape .wr-stage{grid-column:1;grid-row:1/8;justify-self:center;align-self:center;width:calc(var(--u)*50);height:calc(var(--u)*50);margin:0}
.is-landscape .wr-name-box{grid-column:2;grid-row:3;justify-content:flex-start}
.is-landscape .wr-name{font-size:calc(var(--u)*8.4)}
.is-landscape .wr-prize{grid-column:2;grid-row:4;font-size:calc(var(--u)*3.8)}
.is-landscape .wr-claim{grid-column:2;grid-row:5;font-size:calc(var(--u)*3)}
.is-landscape .wr-brand{grid-column:2;grid-row:7;margin-top:0;align-self:end}
.is-landscape .wr-s1{left:47%;top:10%}
.is-landscape .wr-s4{left:4%;top:72%}`,
};
