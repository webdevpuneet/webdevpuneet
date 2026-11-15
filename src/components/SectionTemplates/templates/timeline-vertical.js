/* Vertical Timeline: a top-to-bottom timeline for experience, education or company history. A thin line runs down the left with a dot
   for each entry; every entry has a period, a title, an organisation, a short description and optional tags. It reads well on a
   phone, which a horizontal timeline does not. */

export default {
  id: 'timeline-vertical',
  name: 'Vertical Timeline',
  version: '1.0.0',
  category: 'timeline',
  tags: ['timeline', 'vertical', 'experience', 'resume', 'cv', 'history', 'career', 'education', 'milestones', 'dark'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Vertical Timeline Section — Free Experience & CV HTML',
  seoDescription: 'Free vertical timeline section for experience, education and history: a line with dots, period, title, company, text and tags per entry. Edit online and export HTML.',
  description: 'A timeline that reads from top to bottom, so it works for a CV, a company history or the steps of a project as well on a phone as on a desktop. A thin line runs down the left with a glowing dot for each entry, and every entry carries a period, a title, an organisation, a short description and optional tags such as the technologies used. Add up to twelve entries, in any order you like. Made for the experience section of a portfolio, an about page or a roadmap.',
  bestFor: ['Developer and designer experience sections', 'Company history and milestone pages', 'Education, certifications and roadmaps'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Entries' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Experience' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Where I have *worked*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Eight years of building products, from early-stage startups to teams of hundreds.' },
  ],
  lists: [
    {
      key: 'entries', group: 'items', label: 'Entries', itemLabel: 'Entry', titleKey: 'title', min: 1, max: 12,
      fields: [
        { key: 'period', label: 'Period', type: 'text', value: '2022 – now' },
        { key: 'title', label: 'Title', type: 'text', value: 'Senior developer' },
        { key: 'org', label: 'Company or school (optional)', type: 'text', value: 'Company' },
        { key: 'text', label: 'Description', type: 'textarea', value: 'What you did and what changed because of it.' },
        { key: 'tags', label: 'Tags (one per line, optional)', type: 'lines', value: '' },
      ],
      value: [
        { period: '2023 – now', title: 'Senior full-stack developer', org: 'Northwind Labs', text: 'Lead the checkout team. Rebuilt the payment flow in React and Node, cutting drop-off by 18% and API latency by 40%.', tags: 'React\nNode.js\nAWS' },
        { period: '2020 – 2023', title: 'Full-stack developer', org: 'Brightside', text: 'Built the customer dashboard and the public API for a SaaS used by 30,000 teams. Introduced end-to-end testing.', tags: 'TypeScript\nPostgreSQL\nCypress' },
        { period: '2017 – 2020', title: 'Front-end developer', org: 'Studio Kite', text: 'Delivered 40+ websites and web apps for clients, with a focus on performance and accessibility.', tags: 'JavaScript\nSass\nWordPress' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#5eead4', brandText: '#06201c', bg: '#0a0f1c', surface: '#131b2e', text: '#e8edf7', muted: '#97a6c0', radius: '14' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap tv">
  <header class="st-head tv-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <ol class="tv-list" data-list="entries">
    <li class="tv-item" data-anim="item">
      <span class="tv-dot" aria-hidden="true"></span>
      <p class="tv-period" data-edit="period"></p>
      <h3 class="tv-title"><span data-edit="title"></span><span class="tv-org" data-show-if="org"> &middot; <span data-edit="org"></span></span></h3>
      <p class="tv-text" data-edit="text"></p>
      <ul class="tv-tags" data-show-if="tags" data-lines="tags"></ul>
    </li>
  </ol>
</div>`,
  css: `.st-timeline-vertical{padding:clamp(64px,8cqi,112px) 0}
.tv-head{margin-bottom:clamp(24px,3.4cqi,44px)}
.tv-list{list-style:none;margin:0 auto;padding:0 0 0 clamp(26px,3.4cqi,38px);max-width:780px;position:relative}
.tv-list::before{content:"";position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,var(--st-brand),color-mix(in srgb,var(--st-brand) 8%,transparent))}
.tv-item{position:relative;display:flex;flex-direction:column;gap:6px;padding-bottom:clamp(26px,3.4cqi,40px)}
.tv-item:last-child{padding-bottom:0}
.tv-dot{position:absolute;left:calc(-1 * clamp(26px,3.4cqi,38px) + 0px);top:6px;width:14px;height:14px;border-radius:50%;background:var(--st-bg);border:3px solid var(--st-brand);box-shadow:0 0 0 5px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.tv-period{font:700 13px/1.3 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--st-brand);letter-spacing:.02em}
.tv-title{font-size:clamp(18px,1.8cqi,22px)}
.tv-org{color:var(--st-muted);font-weight:500}
.tv-text{color:var(--st-muted);font-size:16px;line-height:1.65;max-width:64ch}
.tv-tags{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 0;padding:0}
.tv-tags li{padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 8%,transparent);color:var(--st-muted);font:600 12.5px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}`,
};
