export default {
  id: 'did-you-know',
  name: 'Did You Know?',
  version: '1.0.0',
  category: 'quotes',
  tags: ['fact', 'education', 'bright', 'question'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Did You Know Post Template — Free Fact Post for Instagram',
  seoDescription: 'Free "Did you know?" fact post template with a giant question mark, headline fact and source line. Edit it online, download PNG for each platform or copy HTML.',
  description: 'A warm fact card with a giant question mark, a "Did you know?" heading, the fact itself and a small source line.',
  bestFor: ['Industry facts and statistics', 'Fun facts for engagement', 'History or "on this day" posts'],
  fonts: { heading: 'poppins', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fef3c7' },
    { key: 'text', label: 'Text', value: '#451a03' },
    { key: 'accent', label: 'Accent', value: '#d97706' },
  ],
  fields: [
    { key: 'heading', label: 'Heading', type: 'text', value: 'Did you know?' },
    { key: 'fact', label: 'Fact', type: 'textarea', value: 'The first website ever made is *still online* at info.cern.ch.' },
    { key: 'source', label: 'Source', type: 'text', value: 'Source: CERN, 1991' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="d">
  <div class="d-q" aria-hidden="true">?</div>
  <h3 class="d-head" data-edit="heading"></h3>
  <div class="d-body" data-fit-box><p class="d-fact" data-edit="fact" data-fit></p></div>
  <div class="d-foot"><span data-edit="source"></span><span class="d-handle" data-edit="handle"></span></div>
</div>`,
  css: `.d{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.d-q{position:absolute;right:calc(var(--u)*-6);bottom:calc(var(--u)*-14 + var(--safe-bottom,0px));font-family:var(--font-heading);font-weight:900;font-size:calc(var(--u)*95);line-height:1;color:color-mix(in srgb,var(--accent) 22%,transparent)}
.d-head{position:relative;font-family:var(--font-heading);font-size:calc(var(--u)*5);font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.06em}
.d-body{position:relative;flex:1;display:flex;align-items:center}
.d-fact{font-family:var(--font-heading);font-size:calc(var(--u)*8.4);line-height:1.14;font-weight:700;letter-spacing:-.015em;max-width:92%}
.d-foot{position:relative;display:flex;justify-content:space-between;gap:calc(var(--u)*3);font-size:calc(var(--u)*2.9);opacity:.85}
.d-handle{font-weight:700}
.is-landscape .d-fact{font-size:calc(var(--u)*7.6);max-width:80%}`,
};
