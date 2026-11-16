export default {
  id: 'comment-to-get',
  name: 'Comment to Get',
  version: '1.0.0',
  category: 'engagement',
  tags: ['comment-to-get', 'lead-magnet', 'free-guide', 'dm', 'keyword', 'engagement', 'instagram', 'linkedin', 'light'],
  created: '2026-11-16',
  updated: '2026-11-16',
  seoTitle: 'Comment to Get Post Template — Free Lead Magnet Graphic',
  seoDescription: 'Free comment-to-get post template: a mock comment box that types your keyword, an arrow, what people receive and a DM note. Edit online, download all sizes.',
  description: 'A lead-magnet post built around the comment box: a headline, a mock comment field that types your keyword, a bouncing arrow, a card naming exactly what people get, and a "I\'ll DM it to you" note.',
  bestFor: ['Free guides, checklists and templates', 'Instagram and LinkedIn comment-to-DM campaigns', 'Growing reach and followers with a lead magnet'],
  fonts: { heading: 'g:Fraunces|48|m', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f3efff' },
    { key: 'text', label: 'Text', value: '#1e1b3a' },
    { key: 'accent', label: 'Accent', value: '#6d3df5' },
    { key: 'pop', label: 'Highlight', value: '#ffd166' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Free · no catch' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Want my UI *cheat sheet?*' },
    { key: 'lead', label: 'Instruction', type: 'text', value: 'Just comment the word' },
    { key: 'keyword', label: 'Keyword', type: 'text', value: 'GUIDE' },
    { key: 'get', label: 'What they get', type: 'text', value: '2026 UI Cheat Sheet · 12-page PDF' },
    { key: 'note', label: 'Note', type: 'text', value: 'I\'ll send it to your DMs. Follow me so it lands.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="cg">
  <i class="cg-blob" aria-hidden="true" data-anim="breathe"></i>
  <div class="cg-head">
    <span class="cg-label" data-edit="label" data-anim="wobble"></span>
    <h2 class="cg-title" data-edit="title" data-fit></h2>
  </div>
  <div class="cg-mid">
    <p class="cg-lead" data-edit="lead"></p>
    <div class="cg-field"><span class="cg-av" aria-hidden="true"></span><span class="cg-typed"><span class="cg-kw" data-edit="keyword" data-anim="type" data-at="0.6"></span><b class="cg-caret" aria-hidden="true" data-anim="blink"></b></span><i class="cg-send" aria-hidden="true">&#10148;</i></div>
    <i class="cg-arrow" aria-hidden="true" data-anim="nudge-y">&#8593;</i>
  </div>
  <div class="cg-card"><span class="cg-gift" aria-hidden="true">&#127873;</span><span class="cg-get" data-edit="get"></span></div>
  <p class="cg-note" data-edit="note"></p>
  <div class="cg-foot"><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="cg-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.cg{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg);overflow:hidden}
.cg>*:not(.cg-blob){position:relative}
.cg-blob{position:absolute;right:calc(var(--u)*-18);top:calc(var(--u)*-14);width:calc(var(--u)*60);height:calc(var(--u)*60);border-radius:46% 54% 60% 40%;background:color-mix(in srgb,var(--accent) 16%,transparent)}
.cg-head{display:flex;flex-direction:column;gap:calc(var(--u)*2)}
.cg-label{align-self:flex-start;padding:calc(var(--u)*.8) calc(var(--u)*2.6);border-radius:99px;background:var(--pop);font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.12em}
.cg-title{font-family:var(--font-heading);font-size:calc(var(--u)*11);line-height:1.2;padding-bottom:calc(var(--u)*1.4);font-weight:800;letter-spacing:-.02em}
.cg-title .hl{color:var(--accent);font-style:italic}
.cg-mid{flex:none;display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*1.8)}
.cg-lead{font-size:calc(var(--u)*4);font-weight:700}
.cg-field{width:100%;display:flex;align-items:center;gap:calc(var(--u)*2.6);padding:calc(var(--u)*2.2) calc(var(--u)*2.8);background:#fff;border:calc(var(--u)*.7) solid var(--accent);border-radius:99px;box-shadow:0 calc(var(--u)*1.4) 0 var(--accent)}
.cg-av{flex:none;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;background:linear-gradient(135deg,var(--pop),var(--accent))}
.cg-typed{flex:1;display:flex;align-items:center;min-width:0}
.cg-kw{line-height:1.35;font-size:calc(var(--u)*6.4);font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--text)}
.cg-caret{display:block;width:calc(var(--u)*.8);height:calc(var(--u)*6.4);margin-left:calc(var(--u)*.8);background:var(--accent)}
.cg-send{flex:none;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:#fff;font-style:normal;font-size:calc(var(--u)*3.4)}
.cg-arrow{align-self:flex-end;margin-right:calc(var(--u)*2);font-style:normal;font-size:calc(var(--u)*6);font-weight:800;color:var(--accent);line-height:1.4}
.cg-card{display:flex;align-items:center;gap:calc(var(--u)*3);padding:calc(var(--u)*3) calc(var(--u)*3.4);background:var(--text);color:#fff;border-radius:calc(var(--u)*2.4)}
.cg-gift{flex:none;font-size:calc(var(--u)*7)}
.cg-get{font-size:calc(var(--u)*3.8);line-height:1.3;font-weight:800}
.cg-note{font-size:calc(var(--u)*3.2);font-weight:600;opacity:.75;line-height:1.4}
.cg-foot{display:flex;justify-content:flex-end;font-size:calc(var(--u)*3.2);font-weight:700}
.cg-handle{flex:none;white-space:nowrap;color:var(--accent)}
.is-square .cg{gap:calc(var(--u)*2.4)}
.is-square .cg-title{font-size:calc(var(--u)*9)}
.is-square .cg-arrow{display:none}
.is-landscape .cg{gap:calc(var(--u)*2)}
.is-landscape .cg-title{font-size:calc(var(--u)*7)}
.is-landscape .cg-field{padding:calc(var(--u)*1.2) calc(var(--u)*2)}
.is-landscape .cg-kw{line-height:1.35;font-size:calc(var(--u)*4.4)}
.is-landscape .cg-arrow{display:none}
.is-landscape .cg-card{padding:calc(var(--u)*1.8) calc(var(--u)*2.6)}
.is-landscape .cg-get{font-size:calc(var(--u)*3)}
.is-story .cg{gap:calc(var(--u)*5)}
.is-story .cg-title{font-size:calc(var(--u)*14)}
.is-story .cg-lead{font-size:calc(var(--u)*5.2)}
.is-story .cg-field{padding:calc(var(--u)*3) calc(var(--u)*3.4)}
.is-story .cg-kw{font-size:calc(var(--u)*8.6)}
.is-story .cg-get{font-size:calc(var(--u)*4.6)}
.is-story .cg-card{padding:calc(var(--u)*4)}
.is-story .cg-note{font-size:calc(var(--u)*4)}`,
};
