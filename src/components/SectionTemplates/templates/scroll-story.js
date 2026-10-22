import { IMG } from './meta.js';

export default {
  id: 'scroll-story',
  name: 'Pinned Scroll Story',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'story',
  tags: ['scroll', 'pinned', 'sticky', 'scrollytelling', 'product tour', 'gsap', 'light'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Pinned Scroll Story Section — Free Scrollytelling Template',
  seoDescription: 'Free scrollytelling section: steps scroll past while a pinned image beside them changes to match each step. GSAP ScrollTrigger, stacks on phones; export HTML.',
  description: 'A scrollytelling section for product tours and stories. On larger screens the steps scroll up one by one while an image stage beside them stays pinned and crossfades to the image of the step in view; the active step is highlighted. On phones and without JavaScript every step simply shows its own image above its text.',
  bestFor: ['Product tours that walk through features in order', 'Brand or company stories told step by step', 'Case studies with before, during and after'],
  behaviors: ['story'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Steps' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Product tour' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'From first idea *to shipped*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Follow a project through Acme. Scroll on and the picture changes with every step.' },
  ],
  lists: [{
    key: 'steps', group: 'items', label: 'Steps', itemLabel: 'Step', titleKey: 'title', min: 2, max: 6,
    fields: [
      { key: 'image', label: 'Image', type: 'image', value: '', hint: 'About 1200×900 px; screenshots work well.', upload: { name: 'story', maxW: 1400 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'label', label: 'Label (optional)', type: 'text', value: 'Step' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new step' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'What happens in this step.' },
    ],
    value: [
      { image: IMG('hero-dashboard.png'), imageAlt: 'Project board with tasks in columns', label: '01 · Plan', title: 'Capture every idea in one place', text: 'Turn requests, notes and feedback into a clear backlog, and agree on what matters this quarter.' },
      { image: IMG('feature-collab.png'), imageAlt: 'Comments and assignees on a task', label: '02 · Collaborate', title: 'Work together without the meetings', text: 'Owners, comments and due dates live on the work itself, so everyone knows what is next.' },
      { image: IMG('feature-automation.png'), imageAlt: 'Automation rules for a workflow', label: '03 · Automate', title: 'Let the busywork run itself', text: 'Rules move tasks, nudge reviewers and update status, so the team keeps its focus.' },
      { image: IMG('feature-analytics.png'), imageAlt: 'Charts showing project progress', label: '04 · Report', title: 'See progress as it happens', text: 'Live charts replace the Friday status update and show leaders exactly where things stand.' },
    ],
  }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head st-head--left">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="ps" data-story>
    <ol class="ps-steps" data-list="steps">
      <li class="ps-step" data-story-step>
        <img class="ps-img" data-story-img data-image="image" alt="" width="1200" height="900" loading="lazy">
        <span class="ps-label" data-edit="label"></span>
        <h3 class="ps-title" data-edit="title"></h3>
        <p class="ps-text" data-edit="text"></p>
      </li>
    </ol>
  </div>
</div>`,
  css: `.st-scroll-story{padding:clamp(64px,8cqi,112px) 0}
.ps-steps{list-style:none;display:flex;flex-direction:column;gap:clamp(40px,6cqi,72px)}
.ps-step{display:flex;flex-direction:column;gap:8px}
.ps-img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:12px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.ps-label{font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--st-brand)}
.ps-title{font-size:clamp(22px,1.4cqi + 14px,32px);line-height:1.15}
.ps-text{color:var(--st-muted);font-size:17px;max-width:32em}
.ps.is-story{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(32px,5cqi,80px);align-items:start}
.ps.is-story .ps-steps{gap:0}
.ps.is-story .ps-step{min-height:72vh;justify-content:center;opacity:.3;transition:opacity .45s ease}
.ps.is-story .ps-step.is-active{opacity:1}
.ps.is-story .ps-step .ps-img{display:none}
.ps-stage{position:relative;grid-column:2;grid-row:1;aspect-ratio:4/3;border-radius:calc(var(--st-radius) * 1px);overflow:hidden;background:var(--st-surface);box-shadow:0 40px 80px -48px color-mix(in srgb,var(--st-brand) 55%,transparent)}
.ps-stage .ps-img{position:absolute;inset:0;width:100%;height:100%;margin:0;border:0;border-radius:0}`,
};
