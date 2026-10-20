import { avatar } from './parts.js';

export default {
  id: 'team-hiring',
  name: 'Team With Hiring CTA',
  version: '1.0.0',
  category: 'team',
  tags: ['team', 'careers', 'hiring', 'jobs', 'avatars', 'culture', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Team and Careers Section — Free We’re Hiring Template HTML',
  seoDescription: 'Free team and careers section: a mosaic of team photos beside a “we’re hiring” card with perks and open roles linking to job pages. Export HTML or React.',
  description: 'A culture-and-careers section: on the left a heading, short text and a mosaic of round team photos with a “+ more” bubble; on the right a “We’re hiring” card listing perks and open roles (each linking to its job page) with a button to the careers page.',
  bestFor: ['Careers and jobs pages', 'About pages for growing companies', 'Startups recruiting early hires'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Team photos' },
    { id: 'jobs', label: 'Hiring card', toggle: 'showJobs' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Life at Acme' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Join a team that *ships with care*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'We’re 40 people across 12 countries, working remotely with four-day sprints and plenty of time to think.' },
    { key: 'more', group: 'header', label: '“More” bubble text (optional)', type: 'text', value: '+32' },
    { key: 'jobsTitle', group: 'jobs', label: 'Card title', type: 'text', value: 'We’re hiring' },
    { key: 'perks', group: 'jobs', label: 'Perks (optional)', type: 'lines', value: 'Fully remote, flexible hours\nLearning budget of $2,000 a year\nCompany retreat twice a year' },
    { key: 'roles', group: 'jobs', label: 'Open roles', type: 'links', value: 'Senior Product Designer · Remote | /careers/product-designer/\nBackend Engineer (Go) · Europe | /careers/backend-engineer/\nCustomer Success Lead · US | /careers/customer-success/' },
    { key: 'cta', group: 'jobs', label: 'Button text', type: 'text', value: 'See all openings' },
    { key: 'ctaUrl', group: 'jobs', label: 'Button link', type: 'url', value: '/careers/' },
  ],
  lists: [{
    key: 'photos', group: 'items', label: 'Team photos', itemLabel: 'Photo', titleKey: 'name', min: 1, max: 12,
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', value: '', upload: { name: 'team', maxW: 300 } },
      { key: 'name', label: 'Name (used as alt text)', type: 'text', value: 'Team member' },
    ],
    value: [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({ photo: avatar(n), name: ['Leo', 'Zara', 'Lena', 'Ravi', 'Nora', 'Aisha', 'Ben', 'Hana'][n - 1] })),
  }],
  toggles: [{ key: 'showJobs', label: 'Hiring card', value: true }],
  theme: { brand: '#16a34a', brandText: '#ffffff', bg: '#ffffff', surface: '#f2f8f4', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap th">
  <div class="th-copy">
    <header class="st-head st-head--left th-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <ul class="th-faces" data-anim="item">
      <li class="th-faces-list" data-list="photos"><img class="th-face" data-image="photo" data-set="alt:name" width="96" height="96" loading="lazy"></li>
      <li class="th-more" data-show-if="more" data-edit="more"></li>
    </ul>
  </div>
  <aside class="th-card" data-anim="media" data-show="showJobs">
    <h3 class="th-card-title"><span class="th-dot" aria-hidden="true"></span><span data-edit="jobsTitle"></span></h3>
    <ul class="st-checks th-perks" data-show-if="perks" data-lines="perks"></ul>
    <ul class="th-roles" data-links="roles"></ul>
    <a class="st-btn th-btn" data-href="ctaUrl"><span data-edit="cta"></span> <span aria-hidden="true">→</span></a>
  </aside>
</div>`,
  css: `.st-team-hiring{padding:clamp(64px,8cqi,112px) 0}
.th{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:clamp(36px,5cqi,80px)}
.th-copy{display:flex;flex-direction:column;gap:32px}
.th-head{margin:0}
.th-faces{list-style:none;display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.th-faces-list{display:contents}
.th-face{width:68px;height:68px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 4px var(--st-bg),0 8px 20px -10px rgba(15,23,42,.4);transition:transform .25s ease}
.th-face:hover{transform:translateY(-4px) rotate(-3deg)}
.th-more{display:grid;place-items:center;width:68px;height:68px;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);font:800 17px/1 var(--st-font-heading);box-shadow:0 0 0 4px var(--st-bg)}
.th-card{display:flex;flex-direction:column;gap:20px;padding:clamp(26px,3cqi,40px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-brand) 18%,transparent)}
.th-card-title{display:flex;align-items:center;gap:10px;font-size:22px}
.th-dot{width:10px;height:10px;border-radius:50%;background:var(--st-brand);box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 55%,transparent);animation:th-pulse 2s infinite}
@keyframes th-pulse{70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}
.th-roles{list-style:none;display:flex;flex-direction:column;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.th-roles li{border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.th-roles a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 2px;color:var(--st-text);font-weight:600;font-size:15.5px;text-decoration:none}
.th-roles a::after{content:"→";color:var(--st-brand);transition:transform .2s ease}
.th-roles a:hover{color:var(--st-brand)}
.th-roles a:hover::after{transform:translateX(4px)}
.th-btn{align-self:flex-start}
@container st (max-width:860px){.th{grid-template-columns:1fr}}
@container st (max-width:480px){.th-face,.th-more{width:56px;height:56px}}`,
};
