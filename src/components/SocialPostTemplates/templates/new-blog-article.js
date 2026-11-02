export default {
  id: 'new-blog-article',
  name: 'New Blog Article',
  version: '1.0.0',
  category: 'announcements',
  tags: ['blog', 'article', 'new-post', 'content', 'editorial', 'cover-image', 'light'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'New Blog Post Announcement Template — Free Social Post',
  seoDescription: 'Free new blog article post template: a cover image, an editorial serif headline, a short excerpt, read time and a "link in bio" button. Edit online and export.',
  description: 'An editorial post for announcing a new article: a "new on the blog" tag, a cover image, a serif headline, a short excerpt, a read-time line, a read-now button and your handle.',
  bestFor: ['Announcing every new blog post or newsletter issue', 'Sharing long reads on LinkedIn and X', 'Driving traffic from Instagram with a link-in-bio prompt'],
  fonts: { heading: 'playfair', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f6f1e7' },
    { key: 'text', label: 'Text', value: '#171717' },
    { key: 'accent', label: 'Accent', value: '#c2410c' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'New on the blog' },
    { key: 'cover', label: 'Cover image', type: 'image' },
    { key: 'title', label: 'Article title', type: 'textarea', value: 'Why your *first screen* decides everything' },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', value: 'What visitors see before they scroll, and the three changes that doubled our sign-ups.' },
    { key: 'meta', label: 'Read time / date', type: 'text', value: '7 min read · 2 Nov' },
    { key: 'cta', label: 'Button', type: 'text', value: 'Read it · link in bio' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="nb">
  <span class="nb-label" data-edit="label"></span>
  <div class="nb-cover" data-image="cover" data-ph="cover" data-anim="wipe-u" data-at="0.5"></div>
  <div class="nb-body" data-fit-box>
    <h2 class="nb-title" data-edit="title" data-fit></h2>
    <p class="nb-excerpt" data-edit="excerpt" data-fit></p>
    <span class="nb-meta" data-edit="meta" data-anim="count"></span>
  </div>
  <div class="nb-foot"><span class="nb-cta" data-edit="cta"></span><span class="nb-handle" data-edit="handle"></span></div>
</div>`,
  css: `.nb{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.6);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.nb-label{align-self:flex-start;display:inline-flex;align-items:center;gap:calc(var(--u)*1.6);font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.18em;color:var(--accent)}
.nb-label::before{content:'';width:calc(var(--u)*2);height:calc(var(--u)*2);border-radius:50%;background:var(--accent)}
.nb-cover{flex:none;height:34%;border-radius:calc(var(--u)*3);box-shadow:0 calc(var(--u)*1.6) calc(var(--u)*6) rgba(23,23,23,.18)}
.nb-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*3)}
.nb-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.08;font-weight:700;letter-spacing:-.02em}
.nb-excerpt{font-size:calc(var(--u)*3.6);line-height:1.45;opacity:.78}
.nb-meta{font-size:calc(var(--u)*2.9);font-weight:700;letter-spacing:.04em;opacity:.6}
.nb-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3)}
.nb-cta{font-size:calc(var(--u)*3.2);font-weight:800;color:#fff;background:var(--text);padding:calc(var(--u)*2.2) calc(var(--u)*4);border-radius:99px}
.nb-handle{flex:none;font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-story .nb-cover{height:30%}
.is-landscape .nb{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .nb-label{grid-column:1;grid-row:1}
.is-landscape .nb-cover{grid-column:2;grid-row:1/4;height:auto}
.is-landscape .nb-body{grid-column:1;grid-row:2}
.is-landscape .nb-foot{grid-column:1;grid-row:3}
.is-landscape .nb-title{font-size:calc(var(--u)*6.6)}`,
};
