export default {
  id: 'checklist',
  name: 'Checklist Post',
  version: '1.0.0',
  category: 'how-to',
  tags: ['checklist', 'to-do', 'tips', 'education', 'saveable', 'paper', 'light'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Checklist Post Template — Free Instagram & LinkedIn Maker',
  seoDescription: 'Free checklist post template on ruled notebook paper: a title, up to six tick-marked items and a save-for-later note. Edit online and download every post size.',
  description: 'A ruled-paper checklist card with a red margin line, a headline, up to six tick-marked items (empty rows disappear), a "save this" note and your handle.',
  bestFor: ['Launch, packing and audit checklists', 'Saveable how-to posts for Instagram and LinkedIn', 'Onboarding and routine reminders'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Paper', value: '#fbf6e9' },
    { key: 'text', label: 'Text', value: '#1f2937' },
    { key: 'accent', label: 'Tick colour', value: '#0f766e' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Pre-launch checklist' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Before you hit *publish*' },
    { key: 'item1', label: 'Item 1', type: 'text', value: 'Title and meta description written' },
    { key: 'item2', label: 'Item 2', type: 'text', value: 'Every image has alt text' },
    { key: 'item3', label: 'Item 3', type: 'text', value: 'Links checked on mobile' },
    { key: 'item4', label: 'Item 4', type: 'text', value: 'Page loads in under 2 seconds' },
    { key: 'item5', label: 'Item 5', type: 'text', value: 'Share image previewed' },
    { key: 'item6', label: 'Item 6 (optional)', type: 'text', value: 'Analytics event firing' },
    { key: 'note', label: 'Note', type: 'text', value: 'Save this for launch day' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="cl">
  <div class="cl-head">
    <span class="cl-label" data-edit="label"></span>
    <h2 class="cl-title" data-edit="title" data-fit></h2>
  </div>
  <div class="cl-list" data-fit-box>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item1"></span></p>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item2"></span></p>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item3"></span></p>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item4"></span></p>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item5"></span></p>
    <p><i aria-hidden="true" data-anim="stamp">&#10003;</i><span data-edit="item6"></span></p>
  </div>
  <div class="cl-foot"><span class="cl-note" data-edit="note"></span><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="cl-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.cl{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb) calc(var(--pad) + var(--u)*7);background-color:var(--bg);background-image:linear-gradient(90deg,transparent calc(var(--u)*9.4),color-mix(in srgb,#e11d48 55%,transparent) calc(var(--u)*9.4),color-mix(in srgb,#e11d48 55%,transparent) calc(var(--u)*9.8),transparent calc(var(--u)*9.8)),repeating-linear-gradient(180deg,transparent 0,transparent calc(var(--u)*6.9),color-mix(in srgb,#2563eb 22%,transparent) calc(var(--u)*6.9),color-mix(in srgb,#2563eb 22%,transparent) calc(var(--u)*7.1))}
.cl-head{display:flex;flex-direction:column;gap:calc(var(--u)*2)}
.cl-label{align-self:flex-start;font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.16em;color:var(--accent);border-bottom:calc(var(--u)*.5) solid var(--accent);padding-bottom:calc(var(--u)*.8)}
.cl-title{font-family:var(--font-heading);font-size:calc(var(--u)*9.6);line-height:1.04;font-weight:800;letter-spacing:-.025em}
.cl-list{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*3.6)}
.cl-list p{display:flex;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*4);line-height:1.2;font-weight:700}
.cl-list p:has(> span:empty){display:none}
.cl-list i{flex:none;width:calc(var(--u)*6.4);height:calc(var(--u)*6.4);border-radius:calc(var(--u)*1.4);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:calc(var(--u)*4);font-weight:800;color:#fff;background:var(--accent);transform:rotate(-4deg);box-shadow:calc(var(--u)*.5) calc(var(--u)*.5) 0 color-mix(in srgb,var(--accent) 30%,transparent)}
.cl-list p:nth-child(even) i{transform:rotate(3deg)}
.cl-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.2);font-weight:700}
.cl-note{opacity:.8}
.cl-handle{flex:none;color:var(--accent);font-weight:800}
.is-landscape .cl{padding-left:calc(var(--pad) + var(--u)*5)}
.is-landscape .cl-title{font-size:calc(var(--u)*7.4)}
.is-landscape .cl-list{display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:calc(var(--u)*3.4) calc(var(--u)*4)}
.is-landscape .cl-list p{font-size:calc(var(--u)*3.4)}
.is-square .cl{gap:calc(var(--u)*3)}
.is-square .cl-title{font-size:calc(var(--u)*7)}
.is-square .cl-list{gap:calc(var(--u)*2.4)}
.is-square .cl-list p{font-size:calc(var(--u)*3.5)}
.is-square .cl-list i{width:calc(var(--u)*5.2);height:calc(var(--u)*5.2);font-size:calc(var(--u)*3.4)}`,
};
