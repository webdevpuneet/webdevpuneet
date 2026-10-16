export default {
  id: 'story-poll',
  name: 'This or That Poll',
  version: '1.0.0',
  category: 'stories',
  tags: ['poll', 'question', 'engagement', 'story', 'gradient'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'This or That Poll Template — Free Instagram Story Post',
  seoDescription: 'Free "this or that" poll template for Instagram and Facebook Stories with a question and two answer cards. Works as a feed post too. Download or copy HTML.',
  description: 'A Story-first engagement post: a question, two big answer cards with a "VS" between them and a prompt to vote, sized to stay clear of Story buttons.',
  bestFor: ['Instagram and Facebook Story polls', 'Engagement posts ("Tabs or spaces?")', 'Product preference questions'],
  defaultSize: 'story',
  fonts: { heading: 'poppins', body: 'poppins' },
  vars: [
    { key: 'bg', label: 'Gradient start', value: '#0f172a' },
    { key: 'bg2', label: 'Gradient end', value: '#1d4ed8' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#f472b6' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Settle this' },
    { key: 'question', label: 'Question', type: 'textarea', value: 'Which one do you *actually* use?' },
    { key: 'optA', label: 'Option A', type: 'text', value: 'Tabs' },
    { key: 'optB', label: 'Option B', type: 'text', value: 'Spaces' },
    { key: 'vs', label: 'Divider', type: 'text', value: 'VS' },
    { key: 'prompt', label: 'Prompt', type: 'text', value: 'Vote in the poll ↓' },
  ],
  html: `<div class="sp">
  <span class="sp-kicker" data-edit="kicker"></span>
  <div class="sp-q" data-fit-box><h2 class="sp-question" data-edit="question" data-fit></h2></div>
  <div class="sp-opts"><span class="sp-a" data-edit="optA"></span><b class="sp-vs" data-edit="vs"></b><span class="sp-b" data-edit="optB"></span></div>
  <span class="sp-prompt" data-edit="prompt"></span>
</div>`,
  css: `.sp{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(170deg,var(--bg),var(--bg2));text-align:center}
.sp-kicker{font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:var(--accent)}
.sp-q{flex:1;display:flex;align-items:center;justify-content:center;width:100%}
.sp-question{font-family:var(--font-heading);font-size:calc(var(--u)*10);line-height:1.04;font-weight:800;letter-spacing:-.03em}
.sp-opts{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*3);width:100%}
.sp-a,.sp-b{font-family:var(--font-heading);font-size:calc(var(--u)*7);font-weight:800;padding:calc(var(--u)*7) calc(var(--u)*3);border-radius:calc(var(--u)*3.4);background:rgba(255,255,255,.12);border:calc(var(--u)*.5) solid rgba(255,255,255,.35)}
.sp-b{background:var(--accent);border-color:var(--accent);color:#1e1b4b}
.sp-vs{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:calc(var(--u)*12);height:calc(var(--u)*12);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3.6);font-weight:900}
.sp-prompt{font-size:calc(var(--u)*3.6);font-weight:700;opacity:.9}
.is-story .sp-opts{grid-template-columns:1fr;gap:calc(var(--u)*5)}
.is-story .sp-a,.is-story .sp-b{padding:calc(var(--u)*9) calc(var(--u)*3)}`,
};
