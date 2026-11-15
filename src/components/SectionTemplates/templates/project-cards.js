/* Project Cards: a grid of project cards for a portfolio. Each card has a screenshot, a year badge, the title and a short
   description, a row of technology tags and two links (live demo and source code). The screenshot zooms gently on hover. */
import { IMG } from './meta.js';

export default {
  id: 'project-cards',
  name: 'Project Cards',
  version: '1.0.0',
  category: 'listings',
  tags: ['projects', 'portfolio', 'developer', 'case studies', 'work', 'tech stack', 'github', 'demo', 'cards', 'dark'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Project Cards Section — Free Developer Portfolio Grid HTML',
  seoDescription: 'Free project cards section for portfolios: screenshot, year, description, tech tags and live demo and source links on every card. Edit online and export HTML.',
  description: 'The projects grid every developer portfolio needs. Each card shows a screenshot with a year badge, the project name and a one-sentence description, a row of technology tags and two links: a live demo and the source code. The screenshot zooms gently on hover, the grid adapts from three columns to one, and every card is easy to scan. Use it for client work, side projects, open-source libraries or case studies. Tags are typed one per line, so there is nothing to configure.',
  bestFor: ['Developer, designer and data portfolios', 'Open-source maintainers listing projects', 'Agencies and freelancers showing selected work'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Projects' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Selected work' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Projects I am *proud of*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'A mix of client work and side projects. Each one has a live demo, and most have the code on GitHub.' },
  ],
  lists: [
    {
      key: 'projects', group: 'items', label: 'Projects', itemLabel: 'Project', titleKey: 'title', min: 1, max: 12,
      fields: [
        { key: 'image', label: 'Screenshot', type: 'image', value: '', hint: 'About 1200×750 px (16:10). It is cropped to fit the card.', upload: { name: 'project', maxW: 1200 } },
        { key: 'imageAlt', label: 'Screenshot description (alt text)', type: 'text', value: '' },
        { key: 'year', label: 'Year (optional)', type: 'text', value: '2026' },
        { key: 'title', label: 'Project name', type: 'text', value: 'Project' },
        { key: 'text', label: 'Short description', type: 'textarea', value: 'What it is and what you built, in one or two sentences.' },
        { key: 'tags', label: 'Technology tags (one per line)', type: 'lines', value: 'React\nNode.js' },
        { key: 'demoLabel', label: 'Demo link text (optional)', type: 'text', value: 'Live demo' },
        { key: 'demoUrl', label: 'Demo link', type: 'url', value: '#' },
        { key: 'codeLabel', label: 'Code link text (optional)', type: 'text', value: 'Source' },
        { key: 'codeUrl', label: 'Code link', type: 'url', value: 'https://github.com/' },
      ],
      value: [
        { image: IMG('hero-dashboard.png'), imageAlt: 'A dashboard with charts and a sidebar', year: '2026', title: 'Orbit Analytics', text: 'A real-time analytics dashboard for product teams, with shareable reports and CSV export.', tags: 'React\nTypeScript\nPostgreSQL\nAWS', demoLabel: 'Live demo', demoUrl: '#', codeLabel: 'Source', codeUrl: 'https://github.com/' },
        { image: IMG('hero-phone.png'), imageAlt: 'A mobile app shown on a phone', year: '2025', title: 'Fieldnotes App', text: 'A offline-first notes app for field researchers that syncs when a connection returns.', tags: 'React Native\nSQLite\nNode.js', demoLabel: 'Live demo', demoUrl: '#', codeLabel: 'Source', codeUrl: 'https://github.com/' },
        { image: IMG('feature-automation.png'), imageAlt: 'An automation workflow diagram', year: '2025', title: 'Flowkit', text: 'An open-source library for building typed workflows, used by 400 projects.', tags: 'TypeScript\nOpen source\nVitest', demoLabel: 'Docs', demoUrl: '#', codeLabel: 'Source', codeUrl: 'https://github.com/' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#5eead4', brandText: '#06201c', bg: '#0a0f1c', surface: '#131b2e', text: '#e8edf7', muted: '#97a6c0', radius: '14' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap pc">
  <header class="st-head pc-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <ul class="pc-grid" data-list="projects">
    <li class="pc-card" data-anim="item">
      <a class="pc-media" data-href="demoUrl" tabindex="-1" aria-hidden="true">
        <img class="pc-img" data-image="image" alt="" width="1200" height="750" loading="lazy">
        <span class="pc-year" data-show-if="year" data-edit="year"></span>
      </a>
      <div class="pc-body">
        <h3 class="pc-title" data-edit="title"></h3>
        <p class="pc-text" data-edit="text"></p>
        <ul class="pc-tags" data-show-if="tags" data-lines="tags"></ul>
        <div class="pc-links">
          <a class="pc-link" data-show-if="demoLabel" data-href="demoUrl"><span data-edit="demoLabel"></span> <span aria-hidden="true">&rarr;</span></a>
          <a class="pc-link pc-link--ghost" data-show-if="codeLabel" data-href="codeUrl"><span data-edit="codeLabel"></span></a>
        </div>
      </div>
    </li>
  </ul>
</div>`,
  css: `.st-project-cards{padding:clamp(64px,8cqi,112px) 0}
.pc-head{margin-bottom:clamp(24px,3.4cqi,44px)}
.pc-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(16px,2cqi,28px)}
.pc-card{display:flex;flex-direction:column;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s}
.pc-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--st-brand) 55%,transparent);box-shadow:0 24px 50px -28px color-mix(in srgb,var(--st-brand) 55%,#000)}
.pc-media{position:relative;display:block;aspect-ratio:16 / 10;overflow:hidden;background:color-mix(in srgb,var(--st-text) 8%,transparent)}
.pc-img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.pc-card:hover .pc-img{transform:scale(1.05)}
.pc-year{position:absolute;left:12px;top:12px;padding:4px 10px;border-radius:99px;background:rgba(7,11,20,.78);color:#e8edf7;font:600 12px/1 var(--st-font-body);backdrop-filter:blur(4px)}
.pc-body{display:flex;flex-direction:column;gap:10px;padding:clamp(16px,2cqi,24px);flex:1}
.pc-title{font-size:20px}
.pc-text{color:var(--st-muted);font-size:15.5px;line-height:1.6}
.pc-tags{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 4px;padding:0}
.pc-tags li{padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--st-brand) 13%,transparent);color:var(--st-brand);font:600 12.5px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.pc-links{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:auto;padding-top:6px}
.pc-link{font-weight:700;font-size:14.5px;color:var(--st-text);text-decoration:none;border-bottom:2px solid var(--st-brand)}
.pc-link--ghost{border-bottom-color:transparent;color:var(--st-muted)}
.pc-link:hover{color:var(--st-brand)}
.pc-link:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px;border-radius:4px}
@media (prefers-reduced-motion:reduce){.pc-card,.pc-img{transition:none}.pc-card:hover{transform:none}.pc-card:hover .pc-img{transform:none}}`,
};
