export default {
  id: 'raffle-ticket',
  name: 'Raffle Ticket Giveaway',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'raffle', 'ticket', 'draw', 'prize', 'photo', 'dark'],
  created: '2026-11-13',
  updated: '2026-11-13',
  seoTitle: 'Raffle Ticket Giveaway Post Template — Free Draw Graphic',
  seoDescription: 'Free raffle ticket giveaway post template: admit-one ticket, prize photo, draw date, how to enter and a barcode stub. Edit online, download PNG or HTML.',
  description: 'A giveaway styled as a cream admit-one ticket on deep navy: a prize headline, an optional prize photo, three detail cells for the draw date, how to enter and prize value, then a perforated stub with a ticket number and barcode.',
  bestFor: ['Raffles and prize draws', 'Event and fundraiser ticket giveaways', 'Comment-to-enter contests'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0b1f3a' },
    { key: 'text', label: 'Ticket ink', value: '#14213d' },
    { key: 'accent', label: 'Ticket red', value: '#e63946' },
    { key: 'pop', label: 'Ticket paper', value: '#fff1d0' },
  ],
  fields: [
    { key: 'kicker', label: 'Ticket label', type: 'text', value: 'Admit one winner' },
    { key: 'title', label: 'Prize headline', type: 'textarea', value: 'Win a weekend *getaway*' },
    { key: 'photo', label: 'Prize photo', type: 'image', ph: 'product' },
    { key: 'tag', label: 'Photo tag', type: 'text', value: 'Grand prize' },
    { key: 'c1l', label: 'Detail 1 label', type: 'text', value: 'Draw' },
    { key: 'c1v', label: 'Detail 1 value', type: 'text', value: 'Fri, Nov 20' },
    { key: 'c2l', label: 'Detail 2 label', type: 'text', value: 'Enter' },
    { key: 'c2v', label: 'Detail 2 value', type: 'text', value: 'Comment TICKET' },
    { key: 'c3l', label: 'Detail 3 label', type: 'text', value: 'Value' },
    { key: 'c3v', label: 'Detail 3 value', type: 'text', value: '$1,200' },
    { key: 'stub', label: 'Stub line', type: 'text', value: 'Raffle giveaway · one entry per person' },
    { key: 'number', label: 'Ticket number', type: 'text', value: 'No. 427' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="rt">
  <div class="rt-glow" aria-hidden="true"></div>
  <div class="rt-ticket" data-anim="float">
    <div class="rt-main">
      <div class="rt-top">
        <span class="rt-kicker" data-edit="kicker" data-anim="stamp" data-at="0.4"></span>
        <i class="rt-star" aria-hidden="true" data-anim="spin"></i>
      </div>
      <div class="rt-title-box" data-fit-box><h2 class="rt-title" data-edit="title" data-fit></h2></div>
      <div class="rt-photo-wrap">
        <div class="rt-photo" data-image="photo" data-ph="product"></div>
        <span class="rt-tag" data-edit="tag" data-anim="wobble"></span>
      </div>
      <div class="rt-info">
        <div class="rt-cell"><span class="rt-lab" data-edit="c1l"></span><span class="rt-val" data-edit="c1v"></span></div>
        <div class="rt-cell"><span class="rt-lab" data-edit="c2l"></span><span class="rt-val" data-edit="c2v"></span></div>
        <div class="rt-cell"><span class="rt-lab" data-edit="c3l"></span><span class="rt-val" data-edit="c3v"></span></div>
      </div>
    </div>
    <div class="rt-perf" aria-hidden="true"></div>
    <div class="rt-stub">
      <div class="rt-stub-text">
        <span class="rt-stubline" data-edit="stub"></span>
        <span class="spt-brand rt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="rt-handle" data-edit="handle"></span></span>
      </div>
      <div class="rt-code"><i class="rt-bar" aria-hidden="true"></i><span class="rt-num" data-edit="number" data-anim="count"></span></div>
    </div>
  </div>
</div>`,
  css: `.rt{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg);overflow:hidden}
.rt-glow{position:absolute;left:50%;top:40%;width:calc(var(--u)*110);height:calc(var(--u)*110);translate:-50% -50%;border-radius:50%;pointer-events:none;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 34%,transparent),transparent 62%)}
.rt-ticket{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;background:var(--pop);color:var(--text);border-radius:calc(var(--u)*4);box-shadow:0 calc(var(--u)*2.4) calc(var(--u)*8) rgba(0,0,0,.5)}
.rt-main{flex:1;min-height:0;display:flex;flex-direction:column;gap:calc(var(--u)*2.6);padding:calc(var(--u)*5) calc(var(--u)*5.4) calc(var(--u)*3.4)}
.rt-top{display:flex;align-items:center;justify-content:space-between}
.rt-kicker{padding:calc(var(--u)*1) calc(var(--u)*3);border:calc(var(--u)*.5) solid var(--accent);border-radius:calc(var(--u)*1.2);color:var(--accent);font-family:var(--font-heading);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase;letter-spacing:.2em;rotate:-2deg}
.rt-star{width:calc(var(--u)*6);height:calc(var(--u)*6);background:var(--accent);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.rt-title-box{display:flex;align-items:center;max-height:calc(var(--u)*30)}
.rt-title{font-family:var(--font-heading);font-size:calc(var(--u)*9.4);line-height:1.2;font-weight:800;letter-spacing:-.025em}
.rt-title .hl{color:var(--accent)}
.rt-photo-wrap{position:relative;flex:1;min-height:0;display:flex}
.rt-photo{flex:1;border-radius:calc(var(--u)*2.4);border:calc(var(--u)*.6) dashed color-mix(in srgb,var(--text) 55%,transparent);padding:calc(var(--u)*1)}
.rt-tag{position:absolute;right:calc(var(--u)*2.4);top:calc(var(--u)*2.4);padding:calc(var(--u)*1) calc(var(--u)*2.8);background:var(--accent);color:#fff;border-radius:99px;font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.08em;rotate:5deg}
.rt-info{display:grid;grid-template-columns:repeat(3,auto);justify-content:space-between;gap:calc(var(--u)*3)}
.rt-cell{display:flex;flex-direction:column;gap:calc(var(--u)*.6);min-width:0}
.rt-lab{font-size:calc(var(--u)*2.4);font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:var(--accent)}
.rt-val{font-family:var(--font-heading);font-size:calc(var(--u)*4);font-weight:800;line-height:1.2}
.rt-perf{position:relative;height:0;border-top:calc(var(--u)*.55) dashed color-mix(in srgb,var(--text) 45%,transparent)}
.rt-perf::before,.rt-perf::after{content:'';position:absolute;top:calc(var(--u)*-3.5);width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;background:var(--bg)}
.rt-perf::before{left:calc(var(--u)*-3.5)}
.rt-perf::after{right:calc(var(--u)*-3.5)}
.rt-stub{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3);padding:calc(var(--u)*4) calc(var(--u)*5.4)}
.rt-stub-text{display:flex;flex-direction:column;gap:calc(var(--u)*1.2);min-width:0}
.rt-stubline{font-size:calc(var(--u)*3);font-weight:700}
.rt-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.spt .rt-handle{white-space:nowrap;overflow-wrap:normal}
.rt-code{flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:calc(var(--u)*.8)}
.rt-bar{display:block;width:calc(var(--u)*30);height:calc(var(--u)*8);background:repeating-linear-gradient(90deg,var(--text) 0 calc(var(--u)*.45),transparent calc(var(--u)*.45) calc(var(--u)*1),var(--text) calc(var(--u)*1) calc(var(--u)*1.9),transparent calc(var(--u)*1.9) calc(var(--u)*2.4),var(--text) calc(var(--u)*2.4) calc(var(--u)*2.8),transparent calc(var(--u)*2.8) calc(var(--u)*3.6))}
.rt-num{font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:800;letter-spacing:.14em}
.is-square .rt-main{gap:calc(var(--u)*2);padding:calc(var(--u)*4) calc(var(--u)*5) calc(var(--u)*2.6)}
.is-square .rt-title{font-size:calc(var(--u)*8)}
.is-square .rt-val{font-size:calc(var(--u)*3.4)}
.is-square .rt-stub{padding:calc(var(--u)*3) calc(var(--u)*5)}
.is-square .rt-bar{height:calc(var(--u)*6.4);width:calc(var(--u)*26)}
.is-landscape .rt-ticket{flex-direction:row}
.is-landscape .rt-main{flex:1.6;padding:calc(var(--u)*4.4) calc(var(--u)*5)}
.is-landscape .rt-title{font-size:calc(var(--u)*7.6)}
.is-landscape .rt-val{font-size:calc(var(--u)*3.4)}
.is-landscape .rt-perf{height:auto;width:0;border-top:0;border-left:calc(var(--u)*.55) dashed color-mix(in srgb,var(--text) 45%,transparent)}
.is-landscape .rt-perf::before{left:calc(var(--u)*-3.5);top:calc(var(--u)*-3.5)}
.is-landscape .rt-perf::after{left:calc(var(--u)*-3.5);right:auto;top:auto;bottom:calc(var(--u)*-3.5)}
.is-landscape .rt-stub{flex:.7;flex-direction:column;align-items:flex-start;justify-content:space-between;padding:calc(var(--u)*5) calc(var(--u)*4)}
.is-landscape .rt-code{align-items:flex-start}
.is-landscape .rt-bar{width:calc(var(--u)*24);height:calc(var(--u)*10)}`,
};
