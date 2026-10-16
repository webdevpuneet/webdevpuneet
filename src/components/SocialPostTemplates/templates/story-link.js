export default {
  id: 'story-link',
  name: 'New Post Link in Bio',
  version: '1.0.0',
  category: 'stories',
  tags: ['story', 'link-in-bio', 'new-post', 'photo', 'editorial'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Link in Bio Story Template — Free "New Post" Story Design',
  seoDescription: 'Free "new post, link in bio" Story template with an editorial headline, photo card and an arrow to your link. Works in the feed too. Download or copy HTML.',
  description: 'An editorial Story that promotes a new blog post, video or product: a "New post" label, serif headline, photo card and a "Link in bio" call to action.',
  bestFor: ['Promoting a new blog post or YouTube video', 'Instagram "link in bio" and Story link stickers', 'Newsletter and podcast episode drops'],
  defaultSize: 'story',
  fonts: { heading: 'playfair', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fdf4ff' },
    { key: 'text', label: 'Text', value: '#3b0764' },
    { key: 'accent', label: 'Accent', value: '#a21caf' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'New on the blog' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'How I plan a whole month of content in *one afternoon*' },
    { key: 'photo', label: 'Cover photo', type: 'image' },
    { key: 'cta', label: 'Call to action', type: 'text', value: 'Read it — link in bio ↑' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="sl">
  <span class="sl-label" data-edit="label"></span>
  <div class="sl-head" data-fit-box><h2 class="sl-title" data-edit="title" data-fit></h2></div>
  <div class="sl-photo" data-image="photo"></div>
  <div class="sl-foot"><span class="sl-cta" data-edit="cta"></span><span class="sl-handle" data-edit="handle"></span></div>
</div>`,
  css: `.sl{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.sl-label{align-self:flex-start;font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:var(--accent);border-bottom:calc(var(--u)*.5) solid var(--accent);padding-bottom:calc(var(--u)*1)}
.sl-head{flex:0 1 auto;max-height:40%}
.sl-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.1;font-weight:700;letter-spacing:-.01em}
.sl-photo{flex:1;min-height:calc(var(--u)*20);border-radius:calc(var(--u)*3);box-shadow:0 calc(var(--u)*2) calc(var(--u)*6) rgba(59,7,100,.18)}
.sl-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3)}
.sl-cta{font-size:calc(var(--u)*3.6);font-weight:800;color:#fff;background:var(--accent);padding:calc(var(--u)*2.2) calc(var(--u)*4);border-radius:99px}
.sl-handle{font-size:calc(var(--u)*3);font-weight:700}
.is-landscape .sl{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;column-gap:var(--pad)}
.is-landscape .sl-label{grid-column:1}
.is-landscape .sl-head{grid-column:1;grid-row:2;max-height:none;display:flex;align-items:center}
.is-landscape .sl-photo{grid-column:2;grid-row:1/4}
.is-landscape .sl-foot{grid-column:1;grid-row:3}`,
};
