import { IMG } from './meta.js';

export default {
  id: 'case-study-showcase',
  name: 'Case Study Showcase',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['case-study', 'results', 'metrics', 'portfolio', 'testimonial', 'proof', 'agency', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Case Study Section Template — Free Results & Metrics HTML',
  seoDescription: 'Free case study section: a project card with an image, the headline result, key metrics, a client quote and a link. Edit online, export HTML, React or Vue.',
  description: 'A featured project section for agencies, consultants and software companies: each case study is a wide card with a project image beside the client, an industry tag, a headline that states the result, a short summary, up to three key metrics, a client quote with name and role, and a link to the full story. Cards alternate sides as you add more.',
  bestFor: ['Agencies, studios and freelancers showing selected work', 'SaaS and B2B results and customer stories pages', 'Consultants, coaches and training companies proving outcomes'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Case studies' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Case studies' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Results our clients *can measure*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'A closer look at how we helped three teams grow, with the numbers to prove it.' },
  ],
  lists: [{
    key: 'cases', group: 'items', label: 'Case studies', itemLabel: 'Case study', titleKey: 'client', min: 1, max: 4,
    fields: [
      { key: 'image', label: 'Project image', type: 'image', value: '', hint: 'About 1200×900 px: a screenshot, photo or mock-up of the work.', upload: { name: 'case', maxW: 1400 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'client', label: 'Client', type: 'text', value: 'Client name' },
      { key: 'tag', label: 'Industry or service tag (optional)', type: 'text', value: 'Industry' },
      { key: 'headline', label: 'Headline (the result)', type: 'textarea', value: 'How we doubled *sign-ups* in three months' },
      { key: 'summary', label: 'Summary', type: 'textarea', value: 'One or two sentences on the problem, what you did and what changed.' },
      { key: 'stat1', label: 'Metric 1 value', type: 'text', value: '+120%' },
      { key: 'label1', label: 'Metric 1 label', type: 'text', value: 'sign-ups' },
      { key: 'stat2', label: 'Metric 2 value (optional)', type: 'text', value: '' },
      { key: 'label2', label: 'Metric 2 label', type: 'text', value: '' },
      { key: 'stat3', label: 'Metric 3 value (optional)', type: 'text', value: '' },
      { key: 'label3', label: 'Metric 3 label', type: 'text', value: '' },
      { key: 'quote', label: 'Client quote (optional)', type: 'textarea', value: '' },
      { key: 'person', label: 'Quote author (optional)', type: 'text', value: '' },
      { key: 'role', label: 'Author role (optional)', type: 'text', value: '' },
      { key: 'linkText', label: 'Link text (optional)', type: 'text', value: 'Read the full case study' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { image: IMG('hero-dashboard.png'), imageAlt: 'The Lumen analytics dashboard on a laptop', client: 'Lumen Analytics', tag: 'SaaS · Website and onboarding', headline: 'How a new website and onboarding flow *doubled trial sign-ups*', summary: 'Lumen’s product was strong but its site was not. We rebuilt the message, the pricing page and the first-run experience around one clear promise.', stat1: '+118%', label1: 'trial sign-ups', stat2: '2.4×', label2: 'faster first value', stat3: '-31%', label3: 'support tickets', quote: 'We stopped explaining the product and started showing it. The numbers followed almost immediately.', person: 'Priya Raman', role: 'Head of Growth, Lumen', linkText: 'Read the Lumen story', url: '#' },
      { image: IMG('tpl-product.jpg'), imageAlt: 'A pair of headphones on a pale blue background', client: 'Sona Audio', tag: 'E-commerce · Brand and store', headline: 'A product page that *turned browsers into buyers*', summary: 'Sona had traffic but few sales. We reworked the product story, photography and checkout so the benefits were clear within one screen.', stat1: '+64%', label1: 'conversion rate', stat2: '$1.2M', label2: 'extra yearly revenue', stat3: '', label3: '', quote: 'The new page explains the product in seconds. It paid for itself in the first month.', person: 'Daniel Okoye', role: 'Founder, Sona', linkText: 'Read the Sona story', url: '#' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#2563eb', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fc', text: '#0f172a', muted: '#64748b', radius: '20' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="cs-list" data-list="cases">
    <li class="cs-card" data-anim="item">
      <div class="cs-media"><img class="cs-img" data-image="image" alt="" width="1200" height="900" loading="lazy"></div>
      <div class="cs-body">
        <p class="cs-meta"><strong class="cs-client" data-edit="client"></strong><span class="cs-tag" data-show-if="tag" data-edit="tag"></span></p>
        <h3 class="cs-headline" data-edit="headline"></h3>
        <p class="cs-summary" data-edit="summary"></p>
        <dl class="cs-stats">
          <div class="cs-stat" data-show-if="stat1"><dt data-edit="label1"></dt><dd data-edit="stat1"></dd></div>
          <div class="cs-stat" data-show-if="stat2"><dt data-edit="label2"></dt><dd data-edit="stat2"></dd></div>
          <div class="cs-stat" data-show-if="stat3"><dt data-edit="label3"></dt><dd data-edit="stat3"></dd></div>
        </dl>
        <figure class="cs-quote" data-show-if="quote">
          <blockquote data-edit="quote"></blockquote>
          <figcaption><strong data-edit="person"></strong><span data-show-if="role" data-edit="role"></span></figcaption>
        </figure>
        <a class="cs-link" data-href="url" data-show-if="linkText"><span data-edit="linkText"></span> <span aria-hidden="true">→</span></a>
      </div>
    </li>
  </ul>
</div>`,
  css: `.st-case-study-showcase{padding:clamp(56px,7cqi,104px) 0}
.cs-list{list-style:none;display:flex;flex-direction:column;gap:clamp(28px,3.6cqi,48px)}
.cs-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);overflow:hidden;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent)}
.cs-card:nth-child(even) .cs-media{order:2}
.cs-media{position:relative;min-height:320px;background:color-mix(in srgb,var(--st-brand) 10%,var(--st-surface))}
.cs-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cs-body{display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding:clamp(24px,3.6cqi,48px)}
.cs-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:14.5px}
.cs-client{font-weight:800}
.cs-tag{padding:4px 11px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand);font-weight:700;font-size:12.5px}
.cs-headline{font-size:clamp(24px,1.8cqi + 14px,34px);line-height:1.15;letter-spacing:-.025em}
.cs-summary{color:var(--st-muted);font-size:16.5px;line-height:1.6}
.cs-stats{display:flex;flex-wrap:wrap;gap:12px clamp(20px,3cqi,40px);padding:16px 0;border-block:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);width:100%}
.cs-stat{display:flex;flex-direction:column-reverse;gap:2px}
.cs-stat dd{margin:0;font:800 clamp(26px,2cqi + 14px,36px)/1 var(--st-font-heading);letter-spacing:-.03em;color:var(--st-brand)}
.cs-stat dt{color:var(--st-muted);font-size:14px}
.cs-quote{margin:0;padding-left:16px;border-left:3px solid var(--st-brand)}
.cs-quote blockquote{font-size:16.5px;line-height:1.55;font-style:italic}
.cs-quote figcaption{display:flex;flex-wrap:wrap;gap:4px 8px;margin-top:8px;font-size:14px}
.cs-quote figcaption span{color:var(--st-muted)}
.cs-quote figcaption span::before{content:"· "}
.cs-link{color:var(--st-brand);font-weight:700;text-decoration:none}
.cs-link:hover{text-decoration:underline}
@container st (max-width:860px){.cs-card{grid-template-columns:1fr}.cs-card:nth-child(even) .cs-media{order:0}.cs-media{min-height:0;aspect-ratio:16/10}}`,
};
