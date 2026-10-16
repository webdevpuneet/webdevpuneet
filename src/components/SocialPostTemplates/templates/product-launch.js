export default {
  id: 'product-launch',
  name: 'Product Launch',
  version: '1.0.0',
  category: 'announcements',
  tags: ['launch', 'saas', 'screenshot', 'dark', 'gradient'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Product Launch Post Template — Free Instagram & X Design',
  seoDescription: 'Free product launch social post template with a NEW badge, headline, tagline, glowing screenshot frame and CTA. Download all post sizes or copy the HTML.',
  description: 'A dark violet launch post with a "New" badge, product headline, tagline, a glowing screenshot frame and a call to action.',
  bestFor: ['SaaS and app launches', 'New feature announcements', 'Product Hunt launch day'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0f0a1f' },
    { key: 'bg2', label: 'Glow', value: '#6d28d9' },
    { key: 'text', label: 'Text', value: '#faf5ff' },
    { key: 'accent', label: 'Accent', value: '#c084fc' },
  ],
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', value: 'New' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Meet *Flowboard 2.0*' },
    { key: 'tagline', label: 'Tagline', type: 'textarea', value: 'Plan, ship and report in one calm workspace.' },
    { key: 'cta', label: 'Call to action', type: 'text', value: 'Try it free →' },
    { key: 'shot', label: 'Product screenshot', type: 'image' },
  ],
  html: `<div class="pl">
  <div class="pl-copy" data-fit-box>
    <span class="pl-badge" data-edit="badge"></span>
    <h2 class="pl-title" data-edit="title" data-fit></h2>
    <p class="pl-tag" data-edit="tagline" data-fit></p>
    <span class="pl-cta" data-edit="cta"></span>
  </div>
  <div class="pl-shot"><div class="pl-frame" data-image="shot"></div></div>
</div>`,
  css: `.pl{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*6);padding:var(--pt) var(--pad) 0;background:radial-gradient(ellipse at 50% 110%,var(--bg2) 0%,transparent 60%),var(--bg);overflow:hidden}
.pl-copy{display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*3);flex:0 1 auto}
.pl-badge{font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.16em;padding:calc(var(--u)*1.2) calc(var(--u)*2.8);border-radius:99px;background:var(--accent);color:var(--bg)}
.pl-title{font-family:var(--font-heading);font-size:calc(var(--u)*9.4);line-height:1.04;font-weight:800;letter-spacing:-.03em}
.pl-tag{font-size:calc(var(--u)*4);line-height:1.45;opacity:.8;max-width:90%}
.pl-cta{margin-top:calc(var(--u)*1);font-size:calc(var(--u)*3.4);font-weight:700;color:var(--accent)}
.pl-shot{flex:1;min-height:calc(var(--u)*30);display:flex;align-items:flex-end;justify-content:center;padding-bottom:var(--safe-bottom,0px)}
.pl-frame{width:100%;height:100%;border-radius:calc(var(--u)*2.5) calc(var(--u)*2.5) 0 0;border:calc(var(--u)*.6) solid color-mix(in srgb,var(--text) 20%,transparent);border-bottom:0;box-shadow:0 0 calc(var(--u)*12) color-mix(in srgb,var(--accent) 55%,transparent);background-position:top center}
.is-story .pl-frame{border-radius:calc(var(--u)*2.5);border-bottom:calc(var(--u)*.6) solid color-mix(in srgb,var(--text) 20%,transparent)}
.is-landscape .pl{flex-direction:row;align-items:center;padding:var(--pad) 0 0 var(--pad)}
.is-landscape .pl-copy{flex:0 0 46%;align-self:center;padding-bottom:var(--pad)}
.is-landscape .pl-shot{align-self:stretch;padding-top:var(--pad)}
.is-landscape .pl-frame{border-radius:calc(var(--u)*2.5) 0 0 0;border-right:0}`,
};
