import { postFields, DEMO_POSTS, blogSchema } from './parts.js';

export default {
  id: 'blog-list',
  name: 'Editorial Post List',
  version: '1.0.0',
  category: 'blog',
  tags: ['blog', 'list', 'editorial', 'minimal', 'hover-preview', 'cursor', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Blog List Section — Free Editorial List With Hover Image',
  seoDescription: 'Free editorial blog list: posts as large rows with date, category and title, and a cover image that follows the cursor on hover (GSAP quickTo). Export HTML.',
  description: 'An editorial post list for studios, writers and design-led brands: each post is a wide row with the date, category, a large title and an arrow. On desktop, hovering a row shows its cover image in a tilted card that follows the cursor, animated with GSAP. On phones it’s a clean, fast list.',
  bestFor: ['Agency, studio and portfolio journals', 'Writers and personal blogs', 'Changelogs and press lists'],
  behaviors: ['hoverpreview'],
  schema: blogSchema('posts'),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Posts' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Journal' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Notes from the *studio*' },
    { key: 'allLink', group: 'header', label: 'View-all link text (optional)', type: 'text', value: 'All articles' },
    { key: 'allUrl', group: 'header', label: 'View-all link', type: 'url', value: '/journal/' },
  ],
  lists: [{ key: 'posts', group: 'items', label: 'Posts', itemLabel: 'Post', titleKey: 'title', min: 1, max: 12, fields: postFields(), value: DEMO_POSTS }],
  toggles: [],
  theme: { brand: '#a3e635', brandText: '#1a2e05', bg: '#0c0c0e', surface: '#17171b', text: '#f4f4f5', muted: '#a1a1aa', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="bl-top">
    <header class="st-head st-head--left bl-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    </header>
    <a class="bl-all" data-anim="item" data-href="allUrl" data-show-if="allLink"><span data-edit="allLink"></span> <span aria-hidden="true">→</span></a>
  </div>
  <ul class="bl-list" data-list="posts">
    <li class="bl-row" data-anim="item" data-preview>
      <a class="bl-link" data-href="url">
        <span class="bl-date" data-edit="date"></span>
        <span class="bl-cat" data-edit="category"></span>
        <span class="bl-title" data-edit="title"></span>
        <span class="bl-arrow" aria-hidden="true">↗</span>
      </a>
      <img class="bl-img" data-preview-img data-image="image" data-optional alt="" width="1200" height="750" loading="lazy">
    </li>
  </ul>
</div>`,
  css: `.st-blog-list{padding:clamp(64px,8cqi,112px) 0}
.bl-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(24px,3cqi,40px)}
.bl-head{margin:0}
.bl-all{color:var(--st-brand);font-weight:700;text-decoration:none}
.bl-all:hover{text-decoration:underline}
.bl-list{list-style:none;border-top:1px solid color-mix(in srgb,var(--st-text) 14%,transparent)}
.bl-row{position:relative;border-bottom:1px solid color-mix(in srgb,var(--st-text) 14%,transparent)}
.bl-link{display:grid;grid-template-columns:140px 140px 1fr auto;align-items:center;gap:20px;padding:clamp(22px,2.6cqi,32px) 4px;color:var(--st-text);text-decoration:none;transition:padding .35s cubic-bezier(.2,.8,.2,1),color .25s ease}
.bl-link:hover{padding-left:18px;color:var(--st-brand)}
.bl-date{color:var(--st-muted);font-size:14px;font-variant-numeric:tabular-nums}
.bl-cat{color:var(--st-muted);font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.bl-title{font:700 clamp(20px,1.6cqi + 12px,30px)/1.25 var(--st-font-heading);letter-spacing:-.02em}
.bl-arrow{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-text) 20%,transparent);font-size:18px;transition:transform .3s ease,background .3s ease,color .3s ease}
.bl-link:hover .bl-arrow{transform:rotate(45deg);background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.bl-img{display:none}
.st-hover-card{position:absolute;left:0;top:0;z-index:5;width:300px;aspect-ratio:16/10;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface) center/cover no-repeat;box-shadow:0 30px 60px -20px rgba(0,0,0,.6);pointer-events:none}
@container st (max-width:760px){.bl-link{grid-template-columns:1fr auto;gap:6px 14px}.bl-date,.bl-cat{grid-column:1;font-size:13px}.bl-date{order:-2}.bl-cat{order:-1}.bl-title{grid-column:1}.bl-arrow{grid-column:2;grid-row:1/span 3;width:38px;height:38px}}`,
};
