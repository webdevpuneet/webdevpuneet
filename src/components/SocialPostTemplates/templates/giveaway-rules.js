export default {
  id: 'giveaway-rules',
  name: 'Giveaway Rules',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'rules', 'how to enter', 'contest', 'steps', 'checklist', 'light'],
  created: '2026-11-13',
  updated: '2026-11-13',
  seoTitle: 'Giveaway Rules & How to Enter Post Template — Free',
  seoDescription: 'Free giveaway rules post template: how to enter in four ticked steps, a prize photo, the deadline and a fine-print box. Edit online, download PNG or HTML.',
  description: 'A clean "How to enter" card for contests: a prize line and headline, an optional prize photo, four ticked entry steps, the deadline and a dashed fine-print box for eligibility and the winner draw, on warm cream with teal ticks.',
  bestFor: ['Explaining how to enter a giveaway', 'Contests that need eligibility and draw rules', 'Follow-up posts that fix entry confusion'],
  fonts: { heading: 'playfair', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fdf3e7' },
    { key: 'text', label: 'Text', value: '#1f2a2e' },
    { key: 'accent', label: 'Tick colour', value: '#0f9d8a' },
    { key: 'pop', label: 'Accent 2', value: '#ff8a5b' },
  ],
  fields: [
    { key: 'kicker', label: 'Prize line', type: 'text', value: 'Win a $200 gift card' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'How to *enter*' },
    { key: 'photo', label: 'Prize photo (optional)', type: 'image' },
    { key: 'step1', label: 'Step 1', type: 'text', value: 'Follow @yourbrand' },
    { key: 'step2', label: 'Step 2', type: 'text', value: 'Like this post' },
    { key: 'step3', label: 'Step 3', type: 'text', value: 'Tag 2 friends in the comments' },
    { key: 'step4', label: 'Step 4', type: 'text', value: 'Share to your Story for a bonus entry' },
    { key: 'fine', label: 'Fine print', type: 'textarea', value: 'Open to residents 18+. One winner picked at random and messaged on Nov 7. Not sponsored by or affiliated with Instagram.' },
    { key: 'deadline', label: 'Deadline', type: 'text', value: 'Open until Fri, Nov 6 · 9 PM EST' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="gr">
  <div class="gr-dots" aria-hidden="true"></div>
  <div class="gr-head">
    <div class="gr-title-col">
      <span class="gr-kicker" data-edit="kicker" data-anim="pulse"></span>
      <div class="gr-title-box" data-fit-box><h2 class="gr-title" data-edit="title" data-fit></h2></div>
    </div>
    <div class="gr-polaroid" data-anim="sway"><div class="gr-photo" data-image="photo" data-optional data-ph="product"></div></div>
  </div>
  <div class="gr-steps">
    <div class="gr-step"><i class="gr-tick" aria-hidden="true" data-anim="tick" data-at="0.9"></i><span data-edit="step1"></span></div>
    <div class="gr-step"><i class="gr-tick" aria-hidden="true" data-anim="tick" data-at="1.3"></i><span data-edit="step2"></span></div>
    <div class="gr-step"><i class="gr-tick" aria-hidden="true" data-anim="tick" data-at="1.7"></i><span data-edit="step3"></span></div>
    <div class="gr-step gr-bonus"><i class="gr-tick" aria-hidden="true" data-anim="tick" data-at="2.1"></i><span data-edit="step4"></span></div>
  </div>
  <p class="gr-fine" data-edit="fine"></p>
  <div class="gr-foot">
    <span class="gr-deadline" data-edit="deadline"></span>
    <span class="spt-brand gr-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="gr-handle" data-edit="handle"></span></span>
  </div>
</div>`,
  css: `.gr{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 90% 4%,color-mix(in srgb,var(--pop) 22%,transparent),transparent 40%),var(--bg);color:var(--text);overflow:hidden}
.gr-dots{position:absolute;inset:0;pointer-events:none;opacity:.5;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 28%,transparent) 0 calc(var(--u)*.5),transparent calc(var(--u)*.6)) 0 0/calc(var(--u)*4) calc(var(--u)*4);-webkit-mask:linear-gradient(180deg,#000,transparent 38%);mask:linear-gradient(180deg,#000,transparent 38%)}
.gr-head{position:relative;display:flex;align-items:center;gap:calc(var(--u)*4)}
.gr-title-col{flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*2.4);min-width:0}
.gr-kicker{padding:calc(var(--u)*1.4) calc(var(--u)*3.6);border-radius:99px;background:var(--pop);color:#fff;font-size:calc(var(--u)*3.4);font-weight:800;letter-spacing:.02em}
.gr-title-box{display:flex;align-items:center;max-height:calc(var(--u)*30)}
.gr-title{font-family:var(--font-heading);font-size:calc(var(--u)*11.5);line-height:1.38;font-weight:800;letter-spacing:-.01em}
.gr-polaroid{flex:none;rotate:4deg;padding:calc(var(--u)*1.4) calc(var(--u)*1.4) calc(var(--u)*4.4);background:#fff;border-radius:calc(var(--u)*1);box-shadow:0 calc(var(--u)*1.4) calc(var(--u)*5) rgba(31,42,46,.25)}
.gr-polaroid:not(:has(.has-img)){display:none}
.gr-photo{width:calc(var(--u)*22);height:calc(var(--u)*22);border-radius:calc(var(--u)*.6)}
.gr-steps{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*2)}
.gr-step{display:flex;align-items:center;gap:calc(var(--u)*3.2);padding:calc(var(--u)*2) calc(var(--u)*3.2);border-radius:calc(var(--u)*3);background:#fff;border:1px solid color-mix(in srgb,var(--text) 12%,transparent);box-shadow:0 calc(var(--u)*.5) calc(var(--u)*1.6) rgba(31,42,46,.08);font-size:calc(var(--u)*3.5);font-weight:700;line-height:1.25}
.gr-step span{min-width:0}
.gr-bonus{border-style:dashed;border-color:var(--pop);background:color-mix(in srgb,var(--pop) 8%,#fff)}
.gr-tick{flex:none;position:relative;width:calc(var(--u)*6);height:calc(var(--u)*6);border-radius:calc(var(--u)*1.6);background:var(--accent)}
.gr-tick::after{content:'';position:absolute;left:33%;top:12%;width:32%;height:56%;border:solid #fff;border-width:0 calc(var(--u)*.9) calc(var(--u)*.9) 0;rotate:45deg}
.gr-bonus .gr-tick{background:var(--pop)}
.gr-fine{position:relative;padding:calc(var(--u)*2.4) calc(var(--u)*3.4);border:calc(var(--u)*.4) dashed color-mix(in srgb,var(--text) 38%,transparent);border-radius:calc(var(--u)*2.4);font-size:calc(var(--u)*2.5);line-height:1.4;color:color-mix(in srgb,var(--text) 78%,transparent)}
.gr-foot{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3);margin-top:auto}
.gr-deadline{flex:1;min-width:0;font-size:calc(var(--u)*3.3);font-weight:800;color:var(--accent)}
.gr-brand{flex:none}
.spt .gr-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.2);font-weight:800}
.is-square .gr{gap:calc(var(--u)*2.2)}
.is-square .gr-title{font-size:calc(var(--u)*9.5)}
.is-square .gr-photo{width:calc(var(--u)*17);height:calc(var(--u)*17)}
.is-square .gr-step{padding:calc(var(--u)*1.5) calc(var(--u)*3);font-size:calc(var(--u)*3.2)}
.is-square .gr-tick{width:calc(var(--u)*5);height:calc(var(--u)*5)}
.is-square .gr-fine{font-size:calc(var(--u)*2.4);padding:calc(var(--u)*1.8) calc(var(--u)*3)}
.is-landscape .gr{display:grid;grid-template-columns:.9fr 1.1fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.4)}
.is-landscape .gr-head{grid-column:1;grid-row:1/3;flex-direction:column;align-items:flex-start;justify-content:center}
.is-landscape .gr-title{font-size:calc(var(--u)*10)}
.is-landscape .gr-photo{width:calc(var(--u)*24);height:calc(var(--u)*24)}
.is-landscape .gr-steps{grid-column:2;grid-row:1;align-self:end}
.is-landscape .gr-fine{grid-column:2;grid-row:2;align-self:start}
.is-landscape .gr-foot{grid-column:1/3;grid-row:3;margin-top:0}
.is-landscape .gr-step{padding:calc(var(--u)*1.8) calc(var(--u)*3);font-size:calc(var(--u)*3.4)}
.is-landscape .gr-tick{width:calc(var(--u)*5.6);height:calc(var(--u)*5.6)}
.is-landscape .gr-fine{font-size:calc(var(--u)*2.5)}`,
};
