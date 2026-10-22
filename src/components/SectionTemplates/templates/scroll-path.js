export default {
  id: 'scroll-path',
  name: 'Scroll Path Timeline',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'journey',
  tags: ['scroll', 'timeline', 'svg', 'draw on scroll', 'milestones', 'roadmap', 'gsap', 'light'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Timeline That Draws on Scroll — Free SVG & GSAP Section',
  seoDescription: 'Free timeline section with an SVG line that draws itself as you scroll and milestones that light up when it reaches them. GSAP ScrollTrigger; export HTML.',
  description: 'A vertical timeline joined by a hand-drawn SVG line. As visitors scroll, the line draws itself down the page and each milestone lights up when the line reaches it. Milestones have a date, icon, title and text. The line is inline SVG coloured by the theme, so it always matches; without JavaScript it is simply drawn in full.',
  bestFor: ['Company history and milestones', 'Product roadmaps and release timelines', 'Event schedules and step-by-step journeys'],
  behaviors: ['drawpath'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Milestones' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Our journey' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'How we got *here*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'From a two-person side project to a tool used by 12,000 teams. Scroll to follow the line.' },
  ],
  lists: [{
    key: 'milestones', group: 'items', label: 'Milestones', itemLabel: 'Milestone', titleKey: 'title', min: 2, max: 10,
    fields: [
      { key: 'date', label: 'Date or label', type: 'text', value: '2026' },
      { key: 'icon', label: 'Icon', type: 'icon', value: 'flag' },
      { key: 'title', label: 'Title', type: 'text', value: 'A milestone' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'What happened.' },
    ],
    value: [
      { date: '2021', icon: 'lightbulb', title: 'The idea', text: 'Two developers tired of status meetings build a tiny board for their own team.' },
      { date: '2022', icon: 'rocket', title: 'Public launch', text: 'Acme opens to everyone and reaches 1,000 teams in its first month.' },
      { date: '2024', icon: 'users', title: 'A growing team', text: 'We grow to 40 people across five countries and launch automations.' },
      { date: '2026', icon: 'award', title: '12,000 teams', text: 'Today Acme helps teams in 90 countries plan, ship and report calmly.' },
    ],
  }],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#fffaf5', surface: '#ffffff', text: '#1c1917', muted: '#57534e', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="sp" data-drawpath>
    <svg class="sp-line" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path class="sp-track" d="M20 0 C34 125 6 250 20 375 S34 625 20 750 S6 875 20 1000"/>
      <path class="sp-draw" data-draw d="M20 0 C34 125 6 250 20 375 S34 625 20 750 S6 875 20 1000"/>
    </svg>
    <ol class="sp-list" data-list="milestones">
      <li class="sp-item" data-draw-step>
        <span class="sp-dot" data-icon="icon"></span>
        <div class="sp-card">
          <span class="sp-date" data-edit="date"></span>
          <h3 class="sp-title" data-edit="title"></h3>
          <p class="sp-text" data-edit="text"></p>
        </div>
      </li>
    </ol>
  </div>
</div>`,
  css: `.st-scroll-path{padding:clamp(64px,8cqi,112px) 0}
.sp{position:relative;max-width:760px;margin:0 auto}
.sp-line{position:absolute;left:28px;top:0;bottom:0;width:40px;height:100%;margin-left:-20px;overflow:visible}
.sp-track,.sp-draw{fill:none;stroke-width:4;stroke-linecap:round}
.sp-track{stroke:color-mix(in srgb,var(--st-text) 10%,transparent)}
.sp-draw{stroke:var(--st-brand)}
.sp-list{list-style:none;position:relative;display:flex;flex-direction:column;gap:clamp(36px,6cqi,72px)}
.sp-item{display:grid;grid-template-columns:56px 1fr;gap:clamp(16px,2.5cqi,28px);align-items:start}
.sp-dot{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);box-shadow:0 0 0 6px var(--st-bg);transition:background .4s ease,color .4s ease,transform .4s ease}
.sp-dot svg{width:24px;height:24px}
.sp-card{display:flex;flex-direction:column;gap:6px;padding:clamp(18px,2.5cqi,28px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);box-shadow:0 24px 50px -40px rgba(0,0,0,.4);transition:opacity .4s ease,transform .4s ease}
.sp-date{font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--st-brand)}
.sp-title{font-size:clamp(20px,1cqi + 14px,26px)}
.sp-text{color:var(--st-muted);font-size:16px}
.sp.is-drawing .sp-item:not(.is-on) .sp-dot{background:var(--st-surface);color:var(--st-muted);transform:scale(.85)}
.sp.is-drawing .sp-item:not(.is-on) .sp-card{opacity:.35;transform:translateY(12px)}
@container st (min-width:900px){.sp{max-width:900px}.sp-line{left:50%}.sp-item{grid-template-columns:1fr 56px 1fr}.sp-item .sp-dot{grid-column:2;grid-row:1}.sp-item:nth-child(odd) .sp-card{grid-column:1;grid-row:1;text-align:right;align-items:flex-end}.sp-item:nth-child(even) .sp-card{grid-column:3}}`,
};
