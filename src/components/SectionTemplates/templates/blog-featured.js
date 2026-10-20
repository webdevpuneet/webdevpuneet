import { postFields, DEMO_POSTS, blogSchema, cover } from './parts.js';

export default {
  id: 'blog-featured',
  name: 'Featured Post With List',
  version: '1.0.0',
  category: 'blog',
  tags: ['blog', 'featured-post', 'magazine', 'news', 'editorial', 'list', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Featured Blog Post Section — Free Magazine Layout Template',
  seoDescription: 'Free magazine-style blog section: one large featured post beside a list of recent posts with thumbnails, categories and dates, plus BlogPosting schema.',
  description: 'A magazine-style blog layout: one featured post takes the left half with a big cover, category, title, excerpt and author, while a list of recent posts with small thumbnails, categories and dates fills the right. Ideal for homepages and blog front pages.',
  bestFor: ['Blog front pages and newsrooms', 'Homepages that highlight one big story', 'Magazines, newsletters and media sites'],
  schema: state => blogSchema('posts')({ lists: { posts: [state.fields && { title: state.fields.fTitle, excerpt: state.fields.fExcerpt, url: state.fields.fUrl, image: state.fields.fImage, author: state.fields.fAuthor }, ...(state.lists?.posts || [])].filter(Boolean) } }),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'featured', label: 'Featured post' },
    { id: 'items', label: 'Recent posts' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Journal' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Stories, guides and *ideas*' },
    { key: 'fImage', group: 'featured', label: 'Cover image', type: 'image', value: cover(3), upload: { name: 'featured', maxW: 1600 } },
    { key: 'fImageAlt', group: 'featured', label: 'Cover alt text', type: 'text', value: '' },
    { key: 'fCategory', group: 'featured', label: 'Category (optional)', type: 'text', value: 'Featured' },
    { key: 'fDate', group: 'featured', label: 'Date (optional)', type: 'text', value: 'Oct 18, 2026' },
    { key: 'fTitle', group: 'featured', label: 'Title', type: 'textarea', value: 'The 2026 State of Remote Work report' },
    { key: 'fExcerpt', group: 'featured', label: 'Excerpt (optional)', type: 'textarea', value: 'We surveyed 4,000 people at 600 companies about how they plan, meet and ship. Here is what the most effective remote teams do differently.' },
    { key: 'fAuthor', group: 'featured', label: 'Author (optional)', type: 'text', value: 'Hana Sato' },
    { key: 'fUrl', group: 'featured', label: 'Post link', type: 'url', value: '/blog/state-of-remote-work/' },
    { key: 'cta', group: 'featured', label: 'Read link text', type: 'text', value: 'Read the report' },
  ],
  lists: [{ key: 'posts', group: 'items', label: 'Recent posts', itemLabel: 'Post', titleKey: 'title', min: 1, max: 6, fields: postFields(), value: DEMO_POSTS }],
  toggles: [],
  theme: { brand: '#db2777', brandText: '#ffffff', bg: '#fffcfa', surface: '#ffffff', text: '#1f1a17', muted: '#6b625c', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head st-head--left">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
  </header>
  <div class="bf">
    <article class="bf-main" data-anim="media">
      <a class="bf-cover" data-href="fUrl" tabindex="-1" aria-hidden="true"><img data-image="fImage" alt="" width="1200" height="750" loading="lazy"></a>
      <p class="bf-meta"><span class="bf-cat" data-show-if="fCategory" data-edit="fCategory"></span><span data-edit="fDate"></span></p>
      <h3 class="bf-title"><a data-href="fUrl"><span data-edit="fTitle"></span></a></h3>
      <p class="bf-excerpt" data-edit="fExcerpt"></p>
      <p class="bf-foot"><span class="bf-author" data-edit="fAuthor"></span><a class="bf-read" data-href="fUrl" data-show-if="cta"><span data-edit="cta"></span> <span aria-hidden="true">→</span></a></p>
    </article>
    <ul class="bf-list" data-list="posts">
      <li class="bf-item" data-anim="item">
        <a class="bf-thumb" data-href="url" tabindex="-1" aria-hidden="true"><img data-image="image" alt="" width="240" height="150" loading="lazy"></a>
        <div>
          <p class="bf-meta"><span class="bf-cat" data-show-if="category" data-edit="category"></span><span data-edit="date"></span></p>
          <h3 class="bf-item-title"><a data-href="url"><span data-edit="title"></span></a></h3>
          <p class="bf-time" data-edit="readTime"></p>
        </div>
      </li>
    </ul>
  </div>
</div>`,
  css: `.st-blog-featured{padding:clamp(64px,8cqi,112px) 0}
.bf{display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(28px,4cqi,56px);align-items:start}
.bf-main{display:flex;flex-direction:column;gap:12px}
.bf-cover{display:block;overflow:hidden;margin-bottom:6px;border-radius:calc(var(--st-radius) * 1.2px);aspect-ratio:16/10;background:var(--st-surface)}
.bf-cover img,.bf-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.bf-main:hover .bf-cover img,.bf-item:hover .bf-thumb img{transform:scale(1.06)}
.bf-meta{display:flex;align-items:center;flex-wrap:wrap;gap:10px;color:var(--st-muted);font-size:13.5px}
.bf-cat{color:var(--st-brand);font-weight:800;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase}
.bf-title{font-size:clamp(24px,1.6cqi + 14px,34px);line-height:1.2}
.bf-title a,.bf-item-title a{color:inherit;text-decoration:none}
.bf-title a:hover,.bf-item-title a:hover{color:var(--st-brand)}
.bf-excerpt{color:var(--st-muted);font-size:16.5px}
.bf-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:4px}
.bf-author{font-weight:700;font-size:15px}
.bf-read{color:var(--st-brand);font-weight:700;text-decoration:none}
.bf-read:hover{text-decoration:underline}
.bf-list{list-style:none;display:flex;flex-direction:column}
.bf-item{display:grid;grid-template-columns:120px 1fr;gap:18px;align-items:center;padding:16px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.bf-item:first-child{padding-top:0}
.bf-thumb{display:block;overflow:hidden;border-radius:calc(var(--st-radius) * .8px);aspect-ratio:16/10;background:var(--st-surface)}
.bf-item-title{font-size:17px;line-height:1.35;margin-top:4px}
.bf-time{color:var(--st-muted);font-size:13px;margin-top:4px}
.bf-time:empty{display:none}
@container st (max-width:860px){.bf{grid-template-columns:1fr}}
@container st (max-width:420px){.bf-item{grid-template-columns:96px 1fr;gap:14px}}`,
};
