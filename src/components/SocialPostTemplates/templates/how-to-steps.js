export default {
  id: 'how-to-steps',
  name: 'How-To Steps',
  version: '1.0.0',
  category: 'how-to',
  tags: ['how-to', 'steps', 'tutorial', 'guide', 'timeline', 'education', 'dark'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'How-To Steps Post Template — Free Tutorial Post Maker',
  seoDescription: 'Free how-to post template: a headline and up to four numbered steps on a glowing timeline. Edit the text online and download every Instagram and LinkedIn size.',
  description: 'A dark step-by-step guide: a headline, up to four numbered steps on a glowing vertical timeline (each with a title and a one-line detail), a "step-by-step" tag and your handle.',
  bestFor: ['Quick tutorials and process explainers', 'Recipe, setup and onboarding steps', 'Educational posts people save'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0b1020' },
    { key: 'text', label: 'Text', value: '#f1f5f9' },
    { key: 'accent', label: 'Accent', value: '#22d3ee' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Step by step' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Deploy a site in *4 steps*' },
    { key: 's1t', label: 'Step 1 title', type: 'text', value: 'Build it' },
    { key: 's1d', label: 'Step 1 detail', type: 'text', value: 'Run the production build locally.' },
    { key: 's2t', label: 'Step 2 title', type: 'text', value: 'Zip the output' },
    { key: 's2d', label: 'Step 2 detail', type: 'text', value: 'One folder, one file to upload.' },
    { key: 's3t', label: 'Step 3 title', type: 'text', value: 'Upload and extract' },
    { key: 's3d', label: 'Step 3 detail', type: 'text', value: 'Overwrite the old files on the server.' },
    { key: 's4t', label: 'Step 4 title (optional)', type: 'text', value: 'Check the live site' },
    { key: 's4d', label: 'Step 4 detail', type: 'text', value: 'Open it in a private window.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="hs">
  <div class="hs-head">
    <span class="hs-label" data-edit="label"></span>
    <h2 class="hs-title" data-edit="title" data-fit></h2>
  </div>
  <div class="hs-steps" data-fit-box>
    <div class="hs-step"><b aria-hidden="true" data-anim="pop">1</b><div><h3 data-edit="s1t"></h3><p data-edit="s1d"></p></div></div>
    <div class="hs-step"><b aria-hidden="true" data-anim="pop">2</b><div><h3 data-edit="s2t"></h3><p data-edit="s2d"></p></div></div>
    <div class="hs-step"><b aria-hidden="true" data-anim="pop">3</b><div><h3 data-edit="s3t"></h3><p data-edit="s3d"></p></div></div>
    <div class="hs-step"><b aria-hidden="true" data-anim="pop">4</b><div><h3 data-edit="s4t"></h3><p data-edit="s4d"></p></div></div>
  </div>
  <div class="hs-foot"><span class="hs-handle" data-edit="handle"></span></div>
</div>`,
  css: `.hs{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 0% 100%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),var(--bg)}
.hs-head{display:flex;flex-direction:column;gap:calc(var(--u)*2)}
.hs-label{align-self:flex-start;font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.2em;color:var(--accent);border:calc(var(--u)*.35) solid color-mix(in srgb,var(--accent) 60%,transparent);border-radius:99px;padding:calc(var(--u)*1) calc(var(--u)*2.8)}
.hs-title{font-family:var(--font-heading);font-size:calc(var(--u)*9.6);line-height:1.02;font-weight:700;letter-spacing:-.03em}
.hs-steps{flex:1;position:relative;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*4.6);margin:calc(var(--u)*-3) calc(var(--u)*-4);padding:calc(var(--u)*3) calc(var(--u)*4)}/* room for the glow of the circles: the box clips (overflow hidden) */
.hs-step:has(+ .hs-step:not(:has(h3:empty)))::after{content:'';position:absolute;left:calc(var(--u)*4.2);top:calc(50% + var(--u)*4.5);bottom:calc(var(--u)*-4.6);width:calc(var(--u)*.6);background:linear-gradient(180deg,var(--accent),color-mix(in srgb,var(--accent) 35%,transparent));box-shadow:0 0 calc(var(--u)*2.4) color-mix(in srgb,var(--accent) 60%,transparent)}
.hs-step{position:relative;display:flex;align-items:center;gap:calc(var(--u)*4.6)}
.hs-step:has(h3:empty){display:none}
.hs-step b{position:relative;z-index:1;flex:none;width:calc(var(--u)*9);height:calc(var(--u)*9);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg);border:calc(var(--u)*.6) solid var(--accent);color:var(--accent);font-family:var(--font-heading);font-size:calc(var(--u)*4.6);font-weight:700;box-shadow:0 0 calc(var(--u)*3) color-mix(in srgb,var(--accent) 45%,transparent)}
.hs-step h3{font-family:var(--font-heading);font-size:calc(var(--u)*4.8);line-height:1.1;font-weight:700}
.hs-step p{margin-top:calc(var(--u)*.8);font-size:calc(var(--u)*3.3);line-height:1.35;opacity:.78}
.hs-foot{display:flex;justify-content:flex-end}
.hs-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-landscape .hs{display:grid;grid-template-columns:1fr 1.25fr;grid-template-rows:1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .hs-head{align-self:center}
.is-landscape .hs-title{font-size:calc(var(--u)*7.6)}
.is-landscape .hs-steps{grid-column:2;grid-row:1/3;gap:calc(var(--u)*3.4)}
.is-landscape .hs-foot{grid-column:1;justify-content:flex-start}
.is-landscape .hs-step h3{font-size:calc(var(--u)*4)}
.is-landscape .hs-step p{font-size:calc(var(--u)*2.8)}
.is-square .hs{gap:calc(var(--u)*3.2)}
.is-square .hs-title{font-size:calc(var(--u)*6.6)}
.is-square .hs-steps{gap:calc(var(--u)*3)}
.is-square .hs-step{gap:calc(var(--u)*3.6)}
.is-square .hs-step b{width:calc(var(--u)*7.4);height:calc(var(--u)*7.4);font-size:calc(var(--u)*3.8)}
.is-square .hs-step h3{font-size:calc(var(--u)*4)}
.is-square .hs-step p{font-size:calc(var(--u)*2.9)}
.is-square .hs-step:has(+ .hs-step:not(:has(h3:empty)))::after{left:calc(var(--u)*3.4);top:calc(50% + var(--u)*3.7);bottom:calc(var(--u)*-3)}`,
};
