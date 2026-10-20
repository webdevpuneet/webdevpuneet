import { faqFields, faqSchema } from './parts.js';

export default {
  id: 'faq-grid',
  name: 'FAQ Grid',
  version: '1.0.0',
  category: 'faq',
  tags: ['faq', 'grid', 'questions', 'two-column', 'open-answers', 'schema', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'FAQ Grid Section Template — Free Two-Column Q&A HTML',
  seoDescription: 'Free FAQ grid section: questions and answers always visible in a two-column grid of cards with icons, plus FAQPage schema for search. Export HTML or React.',
  description: 'Questions and answers laid out openly in a two-column grid, with no clicking needed: each card has a small question icon, the question in bold and the answer below. Ideal when the answers are short and you want every one seen. Shown here on a dark theme.',
  bestFor: ['Short answers everyone should read', 'Pricing and checkout pages', 'Developer and API product pages'],
  schema: faqSchema('faqs'),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Questions' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Good to know' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'The *quick answers*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: '' },
  ],
  lists: [{
    key: 'faqs', group: 'items', label: 'Questions', itemLabel: 'Question', titleKey: 'q', min: 1, max: 12,
    fields: faqFields(),
    value: [
      { q: 'Do I need a credit card to start?', a: 'No. Sign up with an email address and use the free tier for as long as you like.' },
      { q: 'What counts as a request?', a: 'Every API call counts as one request, whether it succeeds or not. Cached responses are free.' },
      { q: 'Are there rate limits?', a: 'Free accounts can make 60 requests a minute; paid plans start at 1,000 and can be raised on request.' },
      { q: 'Which SDKs do you support?', a: 'Official SDKs for JavaScript, Python, Go and Ruby, plus a REST API you can call from any language.' },
      { q: 'Where is my data stored?', a: 'In the region you choose when you create a project: US, EU or Asia-Pacific. Data never leaves that region.' },
      { q: 'Can I self-host?', a: 'Yes, on the Enterprise plan. We provide Docker images, Helm charts and support for your deployment.' },
    ],
  }],
  toggles: [],
  theme: { brand: '#38bdf8', brandText: '#0b1220', bg: '#0b1220', surface: '#121b2e', text: '#e8eef8', muted: '#94a3b8', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <dl class="fg2-grid" data-list="faqs">
    <div class="fg2-item" data-anim="item">
      <dt class="fg2-q"><span class="fg2-icon" aria-hidden="true">?</span><span data-edit="q"></span></dt>
      <dd class="fg2-a" data-edit="a"></dd>
    </div>
  </dl>
</div>`,
  css: `.st-faq-grid{padding:clamp(64px,8cqi,112px) 0}
.fg2-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,1.8cqi,20px)}
.fg2-item{display:flex;flex-direction:column;gap:10px;padding:clamp(22px,2.4cqi,28px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.fg2-q{display:flex;align-items:flex-start;gap:12px;font:700 17.5px/1.4 var(--st-font-heading)}
.fg2-icon{flex:none;display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:color-mix(in srgb,var(--st-brand) 18%,transparent);color:var(--st-brand);font:800 14px/1 var(--st-font-heading)}
.fg2-a{margin:0;padding-left:38px;color:var(--st-muted);font-size:16px;line-height:1.65}
@container st (max-width:720px){.fg2-grid{grid-template-columns:1fr}}`,
};
