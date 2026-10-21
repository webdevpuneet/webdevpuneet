export default {
  id: 'contact-cards',
  name: 'Contact Options Cards',
  version: '1.0.0',
  category: 'contact',
  tags: ['contact', 'support', 'sales', 'cards', 'help', 'options', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Contact Options Section — Free Sales and Support Cards HTML',
  seoDescription: 'Free contact options section: cards that route visitors to sales, support, partnerships or press, each with an icon, text, response time and link. Export HTML.',
  description: 'A “How can we help?” section that sends each visitor to the right place: cards for sales, support, partnerships and press, each with an icon, a short description, a response-time note and its own button or email link. Clean on a dark theme, and it stacks neatly on phones.',
  bestFor: ['SaaS and product companies', 'Contact and help pages with several teams', 'Agencies separating new business from support'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Options' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Get in touch' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'How can we *help you*?' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Pick the team that fits and a real person will reply, usually the same day.' },
  ],
  lists: [{
    key: 'options', group: 'items', label: 'Options', itemLabel: 'Option', titleKey: 'title', min: 1, max: 6,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'message-circle' },
      { key: 'title', label: 'Title', type: 'text', value: 'Team' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'What this team helps with.' },
      { key: 'meta', label: 'Note (optional)', type: 'text', value: '' },
      { key: 'cta', label: 'Link text', type: 'text', value: 'Contact' },
      { key: 'url', label: 'Link', type: 'url', value: 'mailto:hello@webdevpuneet.com' },
    ],
    value: [
      { icon: 'briefcase', title: 'Talk to sales', text: 'Plans, pricing, security reviews and custom contracts for larger teams.', meta: 'Replies within 2 hours', cta: 'Book a demo', url: 'https://webdevpuneet.com/demo' },
      { icon: 'headphones', title: 'Get support', text: 'Questions about your account, billing or how a feature works.', meta: '24/7 for paid plans', cta: 'Open help centre', url: 'https://webdevpuneet.com/help' },
      { icon: 'plug', title: 'Partnerships', text: 'Integrations, agencies and resellers who want to build with us.', meta: 'Replies within 2 days', cta: 'partners@webdevpuneet.com', url: 'mailto:partners@webdevpuneet.com' },
      { icon: 'file-text', title: 'Press', text: 'Media enquiries, interviews and our brand assets.', meta: '', cta: 'Press kit', url: 'https://webdevpuneet.com/press' },
    ],
  }],
  toggles: [],
  theme: { brand: '#2dd4bf', brandText: '#042f2e', bg: '#0b1215', surface: '#121c20', text: '#ecfdf5', muted: '#94a3b8', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="cc-grid" data-list="options">
    <li class="cc-card" data-anim="item">
      <span class="st-icon" data-icon="icon"></span>
      <h3 class="cc-title" data-edit="title"></h3>
      <p class="cc-text" data-edit="text"></p>
      <p class="cc-meta" data-show-if="meta"><span class="cc-dot" aria-hidden="true"></span><span data-edit="meta"></span></p>
      <a class="cc-link" data-href="url"><span data-edit="cta"></span> <span aria-hidden="true">→</span></a>
    </li>
  </ul>
</div>`,
  css: `.st-contact-cards{padding:clamp(64px,8cqi,112px) 0}
.cc-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:clamp(14px,1.8cqi,20px)}
.cc-card{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:clamp(24px,2.6cqi,30px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);transition:border-color .25s ease,transform .25s ease}
.cc-card:hover{border-color:color-mix(in srgb,var(--st-brand) 55%,transparent);transform:translateY(-3px)}
.cc-card .st-icon{background:color-mix(in srgb,var(--st-brand) 16%,transparent);margin-bottom:6px}
.cc-title{font-size:19px}
.cc-text{color:var(--st-muted);font-size:15.5px;flex:1}
.cc-meta{display:flex;align-items:center;gap:8px;color:var(--st-text);font-size:13.5px;font-weight:600}
.cc-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.2)}
.cc-link{margin-top:6px;padding:10px 0 2px;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);width:100%;color:var(--st-brand);font-weight:700;font-size:15px;text-decoration:none;word-break:break-word}
.cc-link:hover{text-decoration:underline}`,
};
