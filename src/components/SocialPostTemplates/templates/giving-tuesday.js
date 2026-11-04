// Heart shape for the mask (24×24 viewBox), shared by the halo and the filling heart
const HEART = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21.3s-7.6-4.7-10.1-9.5C.2 8.4 2.2 3.8 6.4 3.8c2.4 0 4 1.3 5.6 3.4 1.6-2.1 3.2-3.4 5.6-3.4 4.2 0 6.2 4.6 4.5 8C19.6 16.6 12 21.3 12 21.3z'/></svg>")}")`;

export default {
  id: 'giving-tuesday',
  name: 'Giving Tuesday',
  version: '1.0.0',
  category: 'holidays',
  tags: ['giving-tuesday', 'donation', 'fundraising', 'nonprofit', 'charity', 'goal', 'heart', 'december'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Giving Tuesday Post Template — Free Donation Goal Graphic',
  seoDescription: 'Free Giving Tuesday post template: a heart that fills as the amount raised counts up, the goal, what each gift pays for and a donate call to action. Any size.',
  description: 'A Giving Tuesday fundraising post built around a heart that fills like a jar: the amount raised counting up inside it, the goal underneath, a headline, one line on what a single gift pays for, a donate call to action, the date and your logo.',
  bestFor: ['Nonprofits and charities on Giving Tuesday', 'Brands donating a share of sales', 'Schools, clubs and community fundraisers'],
  fonts: { heading: 'g:Fraunces|79|e', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fff4e8' },
    { key: 'text', label: 'Text', value: '#3b1d12' },
    { key: 'accent', label: 'Heart', value: '#e11d48' },
    { key: 'accent2', label: 'Heart (light)', value: '#fb7185' },
    { key: 'btn', label: 'Button', value: '#3b1d12' },
    { key: 'btnText', label: 'Button text', value: '#fff4e8' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: '#GivingTuesday · 1 December' },
    { key: 'raised', label: 'Amount raised', type: 'text', value: '$7,400' },
    { key: 'goal', label: 'Goal line', type: 'text', value: 'of our $10,000 goal' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Help us *fill* the heart' },
    { key: 'impact', label: 'What a gift does', type: 'textarea', value: '$25 puts a hot meal on the table for a family of four, every night for a week.' },
    { key: 'cta', label: 'Call to action', type: 'text', value: 'Donate today · link in bio' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourcharity' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="gt">
  <div class="gt-dots" aria-hidden="true"><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i></div>
  <span class="gt-label" data-edit="label"></span>
  <div class="gt-main">
    <div class="gt-heart">
      <div class="gt-halo" aria-hidden="true" data-anim="pulse"></div>
      <div class="gt-shape" aria-hidden="true"><div class="gt-fill" data-anim="wipe-u" data-at="0.5" data-dur="2.2"></div></div>
      <div class="gt-sum"><p class="gt-raised" data-edit="raised" data-anim="count" data-at="0.6"></p><p class="gt-goal" data-edit="goal"></p></div>
    </div>
    <div class="gt-text" data-fit-box>
      <h2 class="gt-title" data-edit="title" data-fit></h2>
      <p class="gt-impact" data-edit="impact" data-fit></p>
      <span class="gt-cta" data-edit="cta"></span>
    </div>
  </div>
  <div class="gt-foot"><div class="gt-logo" data-image="logo" data-image-fit="contain"></div><span class="gt-handle" data-edit="handle"></span></div>
</div>`,
  css: `.gt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 38%,color-mix(in srgb,var(--accent2) 22%,transparent),transparent 55%),var(--bg);overflow:hidden}
.gt>*:not(.gt-dots){position:relative}
.gt-dots i{position:absolute;font-style:normal;color:var(--accent2);opacity:.35}
.gt-dots i:nth-child(1){left:8%;top:16%;font-size:calc(var(--u)*7)}
.gt-dots i:nth-child(2){right:9%;top:26%;font-size:calc(var(--u)*5)}
.gt-dots i:nth-child(3){left:12%;top:52%;font-size:calc(var(--u)*4)}
.gt-dots i:nth-child(4){right:7%;top:58%;font-size:calc(var(--u)*8)}
.gt-label{font-size:calc(var(--u)*3);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.gt-main{flex:1;min-height:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*3.6)}
.gt-heart{position:relative;flex:none;width:calc(var(--u)*58);height:calc(var(--u)*52)}
.gt-halo,.gt-shape{position:absolute;inset:0;-webkit-mask:${HEART} center/contain no-repeat;mask:${HEART} center/contain no-repeat}
.gt-halo{inset:calc(var(--u)*-2.6);background:color-mix(in srgb,var(--accent2) 30%,transparent)}
.gt-shape{background:color-mix(in srgb,var(--accent2) 26%,var(--bg))}
.gt-fill{position:absolute;inset:0;background:linear-gradient(180deg,var(--accent2),var(--accent) 60%)}
.gt-sum{position:absolute;left:0;right:0;top:30%;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*.6);color:#fff}
.gt-raised{font-family:var(--font-heading);font-size:calc(var(--u)*11.5);line-height:1;font-weight:900;letter-spacing:-.02em;text-shadow:0 calc(var(--u)*.5) calc(var(--u)*2) rgba(0,0,0,.22)}
.gt-goal{font-size:calc(var(--u)*3);font-weight:600;opacity:.95}
.gt-text{flex:0 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*2.6);max-width:92%}
.gt-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.4);line-height:1.05;font-weight:700;letter-spacing:-.02em}
.gt-title .hl{color:var(--accent);font-style:italic}
.gt-impact{font-size:calc(var(--u)*3.5);line-height:1.45;opacity:.85;max-width:88%}
.gt-cta{font-size:calc(var(--u)*3.3);font-weight:800;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*2) calc(var(--u)*4.6);border-radius:99px}
.gt-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700}
.gt-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .gt-heart{width:calc(var(--u)*40);height:calc(var(--u)*36)}
.is-square .gt-raised{font-size:calc(var(--u)*8.4)}
.is-square .gt-goal{font-size:calc(var(--u)*2.6)}
.is-square .gt-title{font-size:calc(var(--u)*7)}
.is-square .gt-main{gap:calc(var(--u)*2.4)}
.is-square .gt-text{gap:calc(var(--u)*2)}
.is-story .gt-heart{width:calc(var(--u)*52);height:calc(var(--u)*46)}
.is-story .gt-raised{font-size:calc(var(--u)*10.6)}
.is-story .gt-title{font-size:calc(var(--u)*9.4)}
.is-story .gt-impact{font-size:calc(var(--u)*3.8);max-width:100%}
.is-story .gt-text{gap:calc(var(--u)*2.2);max-width:100%}
.is-story .gt-cta{font-size:calc(var(--u)*3.6)}
.is-story .gt-main{gap:calc(var(--u)*3.4)}
.is-landscape .gt-main{flex-direction:row;gap:calc(var(--u)*6)}
.is-landscape .gt-heart{width:calc(var(--u)*62);height:calc(var(--u)*56)}
.is-landscape .gt-text{align-items:flex-start;text-align:left;max-width:52%}
.is-landscape .gt-impact{max-width:100%}
.is-landscape .gt-title{font-size:calc(var(--u)*9)}`,
};
