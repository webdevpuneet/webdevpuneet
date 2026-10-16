export default {
  id: 'code-tip',
  name: 'Code Tip',
  version: '1.0.0',
  category: 'quotes',
  tags: ['code', 'developer', 'dark', 'tip'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Code Tip Social Post Template — Free Developer Post Design',
  seoDescription: 'Free code tip post template with an editor-style code window, title and handle for developer accounts. Download Instagram, LinkedIn and X sizes or copy HTML.',
  description: 'A dark developer card with a title and a code-editor window (traffic-light dots, file name, monospace code) plus your handle.',
  bestFor: ['Developer tips and snippets', 'Programming tutorials and carousels', 'Release notes with a code example'],
  fonts: { heading: 'space', body: 'inter' },
  extraFonts: ['jetbrains'],
  vars: [
    { key: 'bg', label: 'Background', value: '#0b1020' },
    { key: 'card', label: 'Editor window', value: '#151b2e' },
    { key: 'text', label: 'Text', value: '#e5e7eb' },
    { key: 'accent', label: 'Accent', value: '#22d3ee' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'textarea', value: 'Copy to clipboard in *one line*' },
    { key: 'file', label: 'File name', type: 'text', value: 'copy.js' },
    { key: 'code', label: 'Code', type: 'textarea', value: "await navigator.clipboard\n  .writeText('Hello!');\n\n// Works in every modern\n// browser on HTTPS" },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="c">
  <h2 class="c-title" data-edit="title"></h2>
  <div class="c-win" data-fit-box>
    <div class="c-bar"><i></i><i></i><i></i><span data-edit="file"></span></div>
    <pre class="c-code" data-edit="code" data-fit></pre>
  </div>
  <span class="c-handle" data-edit="handle"></span>
</div>`,
  css: `.c{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*5);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 0% 0%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 50%),var(--bg)}
.c-title{font-family:var(--font-heading);font-size:calc(var(--u)*7);line-height:1.12;font-weight:700;letter-spacing:-.02em}
.c-win{flex:1;display:flex;flex-direction:column;background:var(--card);border:calc(var(--u)*.25) solid color-mix(in srgb,var(--text) 14%,transparent);border-radius:calc(var(--u)*2.4);box-shadow:0 calc(var(--u)*3) calc(var(--u)*8) rgba(0,0,0,.45)}
.c-bar{display:flex;align-items:center;gap:calc(var(--u)*1.4);padding:calc(var(--u)*2.4) calc(var(--u)*3);border-bottom:calc(var(--u)*.25) solid color-mix(in srgb,var(--text) 10%,transparent)}
.c-bar i{width:calc(var(--u)*2);height:calc(var(--u)*2);border-radius:50%;background:#ff5f57}
.c-bar i:nth-child(2){background:#febc2e}.c-bar i:nth-child(3){background:#28c840}
.c-bar span{margin-left:calc(var(--u)*2);font-family:"JetBrains Mono",monospace;font-size:calc(var(--u)*2.6);opacity:.6}
.c-code{flex:1;padding:calc(var(--u)*4);font-family:"JetBrains Mono",monospace;font-size:calc(var(--u)*4.2);line-height:1.6;white-space:pre-wrap;color:var(--accent)}
.c-handle{font-size:calc(var(--u)*3);font-weight:700;opacity:.85}`,
};
