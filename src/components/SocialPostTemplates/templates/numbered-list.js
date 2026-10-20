export default {
  id: 'numbered-list',
  name: 'Numbered List Post',
  version: '1.0.0',
  category: 'quotes',
  tags: ['list', 'tips', 'listicle', 'how-to', 'education', 'save-worthy', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'List Post Template — Free "5 Tips" Listicle for Instagram',
  seoDescription: 'Free numbered list post template for Instagram and LinkedIn: a "5 tips" headline and up to five numbered points with a save prompt. Edit online, export PNG.',
  description: 'A save-worthy listicle post: a small label, a bold "5 ways to…" headline, up to five numbered points in large accent numerals (empty points hide themselves), a "save this for later" prompt and your handle.',
  bestFor: ['"5 tips" and "3 mistakes" educational posts', 'Checklists and quick how-tos', 'Resource and tool round-ups'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fefce8' },
    { key: 'text', label: 'Text', value: '#1c1917' },
    { key: 'accent', label: 'Accent', value: '#ca8a04' },
  ],
  fields: [
    { key: 'label', label: 'Small label', type: 'text', value: 'Email marketing' },
    { key: 'title', label: 'Headline', type: 'textarea', value: '5 ways to get your emails *opened*' },
    { key: 'item1', label: 'Point 1', type: 'text', value: 'Write the subject line last' },
    { key: 'item2', label: 'Point 2', type: 'text', value: 'Use the preview text as a second hook' },
    { key: 'item3', label: 'Point 3', type: 'text', value: 'Send from a real person’s name' },
    { key: 'item4', label: 'Point 4', type: 'text', value: 'Keep one clear call to action' },
    { key: 'item5', label: 'Point 5 (optional)', type: 'text', value: 'Clean inactive contacts every quarter' },
    { key: 'save', label: 'Save prompt', type: 'text', value: '🔖 Save this for your next send' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="nl">
  <span class="nl-label" data-edit="label"></span>
  <h2 class="nl-title" data-edit="title"></h2>
  <ol class="nl-list" data-fit-box>
    <li><b>01</b><span data-edit="item1" data-fit></span></li>
    <li><b>02</b><span data-edit="item2" data-fit></span></li>
    <li><b>03</b><span data-edit="item3" data-fit></span></li>
    <li><b>04</b><span data-edit="item4" data-fit></span></li>
    <li><b>05</b><span data-edit="item5" data-fit></span></li>
  </ol>
  <div class="nl-foot"><span class="nl-save" data-edit="save"></span><span class="nl-handle" data-edit="handle"></span></div>
</div>`,
  css: `.nl{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 0%,color-mix(in srgb,var(--accent) 20%,transparent),transparent 45%),var(--bg)}
.nl-label{align-self:flex-start;padding:calc(var(--u)*1) calc(var(--u)*2.8);border-radius:99px;background:var(--accent);color:var(--bg);font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.12em}
.nl-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.04;font-weight:800;letter-spacing:-.025em}
.nl-list{flex:1;list-style:none;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*1.6)}
.nl-list li{display:flex;align-items:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*2.4) 0;border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.nl-list li:last-child{border-bottom:0}
.nl-list li:has(> span:empty){display:none}
.nl-list b{flex:none;width:calc(var(--u)*11);font-family:var(--font-heading);font-size:calc(var(--u)*7);line-height:1;font-weight:800;color:var(--accent)}
.nl-list span{font-family:var(--font-heading);font-size:calc(var(--u)*4.6);line-height:1.22;font-weight:700}
.nl-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3);font-weight:700}
.nl-save{opacity:.8}
.nl-handle{color:var(--accent)}
.is-landscape .nl{display:grid;grid-template-columns:.9fr 1.3fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .nl-label{grid-column:1}
.is-landscape .nl-title{grid-column:1;grid-row:2;align-self:center}
.is-landscape .nl-list{grid-column:2;grid-row:1/3}
.is-landscape .nl-foot{grid-column:1/3}
.is-landscape .nl-list span{font-size:calc(var(--u)*4)}`,
};
