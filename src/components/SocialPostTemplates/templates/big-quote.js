export default {
  id: 'big-quote',
  name: 'Big Quote',
  version: '1.0.0',
  category: 'quotes',
  tags: ['quote', 'typography', 'dark', 'author'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Big Quote Social Post Template — Free Instagram & X',
  seoDescription: 'Free quote post template with a bold serif quote, author photo and handle. Edit the text, then download Instagram, Facebook and X sizes or copy the HTML.',
  description: 'A bold serif pull-quote on a deep background with an oversized quote mark, author name, role, optional photo and your handle.',
  bestFor: ['Founder and customer quotes', 'Motivational or industry quotes', 'Pull-quotes from blog posts and podcasts'],
  fonts: { heading: 'playfair', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0f172a' },
    { key: 'text', label: 'Text', value: '#f8fafc' },
    { key: 'accent', label: 'Accent', value: '#f59e0b' },
  ],
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', value: 'Simplicity is the soul of *efficiency*.' },
    { key: 'author', label: 'Author', type: 'text', value: 'Austin Freeman' },
    { key: 'role', label: 'Role / source', type: 'text', value: 'Novelist' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'photo', label: 'Author photo (optional)', type: 'image' },
  ],
  html: `<div class="q">
  <div class="q-mark">“</div>
  <div class="q-body" data-fit-box><p class="q-text" data-edit="quote" data-fit></p></div>
  <div class="q-foot">
    <div class="q-photo" data-image="photo" data-optional></div>
    <div class="q-who"><span class="q-author" data-edit="author"></span><span class="q-role" data-edit="role"></span></div>
    <span class="q-handle" data-edit="handle"></span>
  </div>
</div>`,
  css: `.q{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) calc(var(--u)*9) var(--pb);background:radial-gradient(circle at 88% 0%,color-mix(in srgb,var(--accent) 24%,transparent),transparent 55%),var(--bg)}
.q-mark{font-family:var(--font-heading);font-size:calc(var(--u)*34);line-height:1;height:calc(var(--u)*17);color:var(--accent)}
.q-body{flex:1;display:flex;align-items:center}
.q-text{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.16;font-weight:700;letter-spacing:-.01em}
.q-foot{display:flex;align-items:center;gap:calc(var(--u)*3);margin-top:calc(var(--u)*5);padding-top:calc(var(--u)*4);border-top:calc(var(--u)*.3) solid color-mix(in srgb,var(--text) 18%,transparent)}
.q-photo{width:calc(var(--u)*11);height:calc(var(--u)*11);border-radius:50%;flex:none;border:calc(var(--u)*.5) solid var(--accent)}
.q-who{display:flex;flex-direction:column;gap:calc(var(--u)*.6);min-width:0}
.q-author{font-weight:700;font-size:calc(var(--u)*3.6)}
.q-role{font-size:calc(var(--u)*2.8);opacity:.7}
.q-handle{margin-left:auto;font-size:calc(var(--u)*3);font-weight:600;color:var(--accent)}
.is-landscape .q-text{font-size:calc(var(--u)*7.6)}
.is-landscape .q-mark{height:calc(var(--u)*13)}`,
};
