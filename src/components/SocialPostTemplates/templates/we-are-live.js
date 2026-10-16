export default {
  id: 'we-are-live',
  name: 'We’re Live',
  version: '1.0.0',
  category: 'announcements',
  tags: ['launch', 'product-hunt', 'bold', 'stripes'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'We’re Live Post Template — Free Launch Day Social Post',
  seoDescription: 'Free "We’re live" launch day social post template with bold condensed type, platform name, date and a support ask. Download all post sizes or copy the HTML.',
  description: 'A loud launch-day post with huge condensed "We’re live on" type, the platform name, the date and an ask for support, on diagonal stripes.',
  bestFor: ['Product Hunt and launch day', 'Kickstarter or app store go-live', 'Livestream starts'],
  fonts: { heading: 'bebas', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#111111' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#ff6154' },
  ],
  fields: [
    { key: 'line1', label: 'Line 1', type: 'text', value: 'We’re live on' },
    { key: 'platform', label: 'Platform', type: 'text', value: 'Product Hunt' },
    { key: 'date', label: 'Date', type: 'text', value: 'Today · Nov 18' },
    { key: 'ask', label: 'Ask', type: 'textarea', value: 'Your upvote helps us reach more makers ↑' },
  ],
  html: `<div class="l">
  <div class="l-stripes"></div>
  <div class="l-body" data-fit-box>
    <span class="l-line1" data-edit="line1"></span>
    <span class="l-plat" data-edit="platform" data-fit></span>
  </div>
  <div class="l-foot"><span class="l-date" data-edit="date"></span><p class="l-ask" data-edit="ask"></p></div>
</div>`,
  css: `.l{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.l-stripes{position:absolute;inset:0;background:repeating-linear-gradient(-45deg,color-mix(in srgb,var(--accent) 16%,transparent) 0 calc(var(--u)*2),transparent calc(var(--u)*2) calc(var(--u)*6))}
.l-body{position:relative;flex:1;display:flex;flex-direction:column;justify-content:center}
.l-line1{font-family:var(--font-heading);font-size:calc(var(--u)*11);line-height:.95;letter-spacing:.01em}
.l-plat{font-family:var(--font-heading);font-size:calc(var(--u)*25);line-height:.9;color:var(--accent);letter-spacing:.005em}
.l-foot{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*1.6);padding-top:calc(var(--u)*4);border-top:calc(var(--u)*.6) solid var(--accent)}
.l-date{font-size:calc(var(--u)*3.4);font-weight:800;text-transform:uppercase;letter-spacing:.12em}
.l-ask{font-size:calc(var(--u)*3.6);line-height:1.4;opacity:.85}`,
};
