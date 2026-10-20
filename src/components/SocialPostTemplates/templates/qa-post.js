export default {
  id: 'qa-post',
  name: 'Q&A Post',
  version: '1.0.0',
  category: 'quotes',
  tags: ['faq', 'question', 'answer', 'ask-me-anything', 'engagement', 'chat', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Q&A Post Template — Free "You Asked, We Answered" FAQ Post',
  seoDescription: 'Free Q&A post template for Instagram and LinkedIn: a follower question in a chat bubble, your answer and who asked. Great for FAQs. Edit online and export PNG.',
  description: 'A "you asked, we answered" post styled like a chat: a label, the follower\'s question in a bubble with their name, your answer in a larger accent bubble with your logo initial, and your handle. Perfect for FAQs, AMAs and customer questions.',
  bestFor: ['Answering follower and customer questions', 'FAQ series and AMA recaps', 'Turning DMs and comments into content'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#111827' },
    { key: 'text', label: 'Text', value: '#f9fafb' },
    { key: 'accent', label: 'Accent', value: '#818cf8' },
    { key: 'bubble', label: 'Question bubble', value: '#1f2937' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'You asked, we answered' },
    { key: 'asker', label: 'Asked by', type: 'text', value: '@sam.designs asked' },
    { key: 'question', label: 'Question', type: 'textarea', value: 'How often should I post on LinkedIn to actually grow?' },
    { key: 'initial', label: 'Answer avatar (1–2 letters)', type: 'text', value: 'A' },
    { key: 'answer', label: 'Answer', type: 'textarea', value: 'Consistency beats volume. *Two to three thoughtful posts a week*, plus genuine comments on other people\'s posts, will grow you faster than posting every day.' },
    { key: 'cta', label: 'Call to action', type: 'text', value: 'Got a question? Drop it in the comments 👇' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="qa">
  <span class="qa-label" data-edit="label"></span>
  <div class="qa-body" data-fit-box>
    <div class="qa-q">
      <span class="qa-asker" data-edit="asker"></span>
      <p class="qa-qtext" data-edit="question" data-fit></p>
    </div>
    <div class="qa-a">
      <span class="qa-avatar" data-edit="initial"></span>
      <p class="qa-atext" data-edit="answer" data-fit></p>
    </div>
  </div>
  <div class="qa-foot"><span data-edit="cta"></span><span class="qa-handle" data-edit="handle"></span></div>
</div>`,
  css: `.qa{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 0% 100%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 50%),var(--bg)}
.qa-label{font-family:var(--font-heading);font-size:calc(var(--u)*5);font-weight:800;letter-spacing:-.01em;color:var(--accent)}
.qa-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*5)}
.qa-q{align-self:flex-start;max-width:86%;display:flex;flex-direction:column;gap:calc(var(--u)*1.4);padding:calc(var(--u)*4) calc(var(--u)*4.6);border-radius:calc(var(--u)*4) calc(var(--u)*4) calc(var(--u)*4) calc(var(--u)*1);background:var(--bubble)}
.qa-asker{font-size:calc(var(--u)*2.8);font-weight:700;opacity:.65}
.qa-qtext{font-family:var(--font-heading);font-size:calc(var(--u)*5.4);line-height:1.22;font-weight:700}
.qa-a{align-self:flex-end;max-width:92%;display:flex;gap:calc(var(--u)*3);align-items:flex-start;padding:calc(var(--u)*4.6);border-radius:calc(var(--u)*4) calc(var(--u)*4) calc(var(--u)*1) calc(var(--u)*4);background:color-mix(in srgb,var(--accent) 22%,var(--bg));border:1px solid color-mix(in srgb,var(--accent) 45%,transparent)}
.qa-avatar{flex:none;width:calc(var(--u)*9);height:calc(var(--u)*9);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*4);font-weight:800}
.qa-atext{font-size:calc(var(--u)*4.6);line-height:1.38;font-weight:500}
.qa-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3);font-weight:600;opacity:.85}
.qa-handle{font-weight:800;color:var(--accent);flex:none}
.is-landscape .qa-body{gap:calc(var(--u)*3.4)}
.is-landscape .qa-qtext{font-size:calc(var(--u)*4.8)}
.is-landscape .qa-atext{font-size:calc(var(--u)*4)}`,
};
