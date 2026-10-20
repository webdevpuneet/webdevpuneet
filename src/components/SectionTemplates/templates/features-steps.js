export default {
  id: 'features-steps',
  name: 'How It Works Steps',
  version: '1.0.0',
  category: 'features',
  tags: ['features', 'steps', 'process', 'how-it-works', 'numbered', 'onboarding', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'How It Works Section Template — Free Numbered Steps Block',
  seoDescription: 'Free how-it-works section: numbered steps on a dashed line, each with an icon, title and text, plus a button. Responsive and animated; export HTML, React.',
  description: 'A "how it works" section that explains a process in a few numbered steps. Each step has a number badge, an icon, a title and a short description, joined by a dashed connector line; a button below invites visitors to start. Steps sit in a row on desktop and stack on phones.',
  bestFor: ['Explaining onboarding or sign-up in three steps', 'Service, agency and consulting processes', 'Marketplaces and apps with a simple workflow'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Steps' },
    { id: 'button', label: 'Button', toggle: 'showButton' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'How it works' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Up and running in *three simple steps*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'No setup calls, no migrations to plan. Most teams are working in their new workspace the same afternoon.' },
    { key: 'cta', group: 'button', label: 'Button text', type: 'text', value: 'Get started free' },
    { key: 'ctaUrl', group: 'button', label: 'Button link', type: 'url', value: 'https://yoursite.com/signup' },
    { key: 'note', group: 'button', label: 'Note under the button (optional)', type: 'text', value: 'Free for teams up to 10 people' },
  ],
  lists: [{
    key: 'steps', group: 'items', label: 'Steps', itemLabel: 'Step', titleKey: 'title', min: 2, max: 6,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'circle-check' },
      { key: 'title', label: 'Title', type: 'text', value: 'Next step' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'What happens in this step.' },
    ],
    value: [
      { icon: 'user-round', title: 'Create your account', text: 'Sign up with Google or email in under a minute. No credit card needed.' },
      { icon: 'plug', title: 'Connect your tools', text: 'Import from your old tracker and connect Slack, GitHub and your calendar.' },
      { icon: 'rocket', title: 'Invite the team and ship', text: 'Share a link, assign the first tasks and watch progress fill in automatically.' },
    ],
  }],
  toggles: [{ key: 'showButton', label: 'Button', value: true }],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#fffaf5', surface: '#ffffff', text: '#1c1917', muted: '#57534e', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ol class="fp-steps" data-list="steps">
    <li class="fp-step" data-anim="item">
      <div class="fp-badge"><span class="fp-num" aria-hidden="true"></span><span class="st-icon" data-icon="icon"></span></div>
      <h3 class="fp-title" data-edit="title"></h3>
      <p class="fp-text" data-edit="text"></p>
    </li>
  </ol>
  <div class="fp-cta" data-anim="item" data-show="showButton">
    <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
    <p class="fp-note" data-edit="note"></p>
  </div>
</div>`,
  css: `.st-features-steps{padding:clamp(64px,8cqi,112px) 0}
.fp-steps{list-style:none;counter-reset:fp;display:grid;grid-auto-columns:1fr;grid-auto-flow:column;gap:clamp(20px,3cqi,40px);position:relative}
.fp-step{counter-increment:fp;position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:0 6px}
.fp-step:not(:last-child)::after{content:"";position:absolute;top:36px;left:calc(50% + 52px);right:calc(-50% + 52px - clamp(20px,3cqi,40px));border-top:2px dashed color-mix(in srgb,var(--st-brand) 45%,transparent)}
.fp-badge{position:relative;display:grid;place-items:center;width:72px;height:72px;margin-bottom:8px;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);box-shadow:0 14px 34px -18px color-mix(in srgb,var(--st-brand) 60%,transparent)}
.fp-badge .st-icon{background:none;width:40px;height:40px}
.fp-badge .st-icon svg{width:28px;height:28px}
.fp-num{position:absolute;top:-10px;right:-10px;display:grid;place-items:center;min-width:28px;height:28px;padding:0 6px;border-radius:999px;background:var(--st-brand);color:var(--st-btn-text);font:800 13px/1 var(--st-font-heading);box-shadow:0 0 0 4px var(--st-bg)}
.fp-num::before{content:counter(fp)}
.fp-title{font-size:20px;letter-spacing:-.01em}
.fp-text{color:var(--st-muted);font-size:16px;max-width:22em}
.fp-cta{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:clamp(40px,5cqi,64px);text-align:center}
.fp-note{font-size:14px;color:var(--st-muted)}
@container st (max-width:760px){.fp-steps{grid-auto-flow:row;gap:36px}.fp-step:not(:last-child)::after{top:auto;bottom:-30px;left:50%;right:auto;height:24px;border-top:0;border-left:2px dashed color-mix(in srgb,var(--st-brand) 45%,transparent)}}`,
};
