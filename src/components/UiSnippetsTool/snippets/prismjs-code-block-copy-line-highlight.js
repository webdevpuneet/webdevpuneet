const prismjsCodeBlockCopyLineHighlight = {
  id: 'prismjs-code-block-copy-line-highlight',
  title: 'Prism.js Code Block with Copy Button and Line Highlight',
  lastmod: '2026-09-24',
  category: 'layouts',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-highlight/prism-line-highlight.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-highlight/prism-line-highlight.min.js',
  ],
  html: `<figure class="pc-block">
  <header class="pc-head">
    <span class="pc-file"><i></i><i></i><i></i> useDebounce.js</span>
    <span class="pc-hint" id="pcHint">Click a line number to highlight it</span>
    <button type="button" class="pc-copy" id="pcCopy" aria-live="polite">Copy</button>
  </header>
  <pre class="line-numbers" id="pcPre" data-line="4-6"><code class="language-javascript" id="pcCode">import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cancel on change or unmount
  }, [value, delay]);

  return debounced;
}</code></pre>
</figure>`,
  css: `body { background: #eef0f6; padding: 22px; font-family: system-ui, sans-serif; }
.pc-block { max-width: 640px; margin: 0 auto; border-radius: 14px; overflow: hidden; background: #2d2d2d; box-shadow: 0 16px 36px rgba(20,20,50,.25); }
.pc-head { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: #232323; border-bottom: 1px solid #3a3a3a; }
.pc-file { display: inline-flex; align-items: center; gap: 6px; font: 600 12.5px/1 ui-monospace, Menlo, monospace; color: #c9c9c9; }
.pc-file i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
.pc-file i:nth-child(2) { background: #febc2e; } .pc-file i:nth-child(3) { background: #28c840; margin-right: 6px; }
.pc-hint { margin-left: auto; font: 500 11.5px/1 system-ui, sans-serif; color: #8a8a8a; }
.pc-copy { font: 700 12px/1 system-ui, sans-serif; color: #e6e6e6; background: #3d3d3d; border: 0; border-radius: 7px; padding: 7px 12px; cursor: pointer; min-width: 64px; transition: background .15s; }
.pc-copy:hover { background: #4a4a4a; }
.pc-copy.done { background: #166534; color: #bbf7d0; }
.pc-block pre[class*="language-"], .pc-block pre { margin: 0; border-radius: 0; background: #2d2d2d; font-size: 13.5px; line-height: 1.65; padding: 14px 16px 14px 3.8em; }
/* the theme sets its own line-height on <code>; match it to the <pre> so the number gutter and highlight bars stay aligned */
.pc-block pre code[class*="language-"] { font-size: 13.5px; line-height: 1.65; }
.pc-block pre.line-numbers .line-numbers-rows { border-right-color: #444; }
.pc-block .line-numbers-rows > span { cursor: pointer; pointer-events: auto; }
.pc-block .line-numbers-rows > span::before { color: #7f7f7f; }
.pc-block .line-numbers-rows > span:hover::before { color: #fff; }
.pc-block .line-highlight { background: linear-gradient(to right, rgba(99,102,241,.32) 70%, rgba(99,102,241,0)); }`,
  js: `const pre = document.getElementById('pcPre');
const code = document.getElementById('pcCode');
let lines = new Set([4, 5, 6]);

// Prism draws highlights as absolutely positioned bars that it measures once. To change the
// highlighted lines, update data-line, remove the old bars, and ask the plugin to redraw them.
function paintLines() {
  const spec = Array.from(lines).sort(function (a, b) { return a - b; }).join(',');
  pre.setAttribute('data-line', spec);
  pre.querySelectorAll('.line-highlight').forEach(function (n) { n.remove(); });
  if (spec && Prism.plugins.lineHighlight) Prism.plugins.lineHighlight.highlightLines(pre)();
  document.getElementById('pcHint').textContent = lines.size
    ? 'Highlighted: ' + (lines.size === 1 ? 'line ' : 'lines ') + Array.from(lines).sort(function (a, b) { return a - b; }).join(', ')
    : 'Click a line number to highlight it';
}

// The number gutter is generated after highlighting, so delegate the click to the <pre>.
pre.addEventListener('click', function (e) {
  const row = e.target.closest('.line-numbers-rows > span');
  if (!row) return;
  const n = Array.prototype.indexOf.call(row.parentNode.children, row) + 1;
  if (lines.has(n)) lines.delete(n); else lines.add(n);
  paintLines();
});

// Copy the ORIGINAL text, not the highlighted markup: textContent strips the token <span>s.
const copyBtn = document.getElementById('pcCopy');
function flash(ok) {
  copyBtn.textContent = ok ? 'Copied!' : 'Press Ctrl+C';
  copyBtn.classList.toggle('done', ok);
  setTimeout(function () { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('done'); }, 1600);
}
copyBtn.addEventListener('click', function () {
  const text = code.textContent;
  // The async clipboard API needs a secure context and permission; fall back to a hidden textarea.
  const fallback = function () {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    flash(ok);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { flash(true); }, fallback);
  } else fallback();
});

Prism.highlightElement(code);
paintLines();`,

  seo: {
    title: 'Prism.js Code Block with Copy Button — Free JS Snippet',
    description: `A polished code block using Prism.js: syntax highlighting, line numbers, clickable line highlighting, and a copy button that copies clean source with a clipboard fallback.`,
    about: {
      title: 'Prism.js Code Block with Copy and Line Highlight — HTML, CSS & JavaScript',
      description: `Code blocks are the most-read component on a developer blog and the one most often left half-finished. Highlighting is the easy part; readers also want line numbers to refer to, a way to point at the lines that matter, and a copy button that works. Prism.js is a lightweight syntax highlighter built for exactly this kind of documentation: it tokenises code into spans you can style with a theme, and its plug-in system adds line numbers and line highlighting without touching the core.

Prism's plug-ins are opt-in and mostly declarative. Adding the class line-numbers to the pre element turns on the number gutter, and a data-line attribute such as "4-6" or "1,3,8-10" turns on highlighted bars. Both plug-ins need their own stylesheet as well as their script, and highlighting runs when Prism.highlightElement(code) is called — here explicitly, because the demo loads scripts dynamically after the page is built, so Prism's automatic run on window load may already have passed.

Interactive highlighting is where the snippet goes beyond the documentation. Prism draws its line-highlight bars as absolutely positioned elements measured once when the plug-in runs, so changing data-line later does nothing on its own. The paintLines() function updates the attribute, removes the existing .line-highlight nodes and re-invokes Prism.plugins.lineHighlight.highlightLines(pre)(), which rebuilds them. Clicking a line number toggles that line in a Set. The gutter is generated after highlighting, so the click handler is delegated to the pre element and finds the row number from the child's index — a delegation pattern that avoids attaching handlers to elements that do not exist yet.

The copy button has its own subtlety: it copies code.textContent, not innerHTML. After highlighting, the code element is full of token spans, but textContent returns only the original characters, so the clipboard gets clean source. The async navigator.clipboard.writeText needs a secure context and permission and can reject inside embedded frames, so the handler falls back to a hidden textarea and document.execCommand('copy'), and if both fail the button asks the user to press Ctrl+C rather than pretending success. The header mimics an editor window chrome and shows the file name, which gives code samples context at a glance.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the highlighted code', text: 'Lines 4 to 6 are highlighted by default with a soft bar to draw attention to the cleanup logic.' },
        { title: 'Toggle a line', text: 'Click any line number to add or remove its highlight. The hint text lists the highlighted lines.' },
        { title: 'Copy the code', text: 'Press Copy. The button confirms with "Copied!" and the clipboard contains clean source, without markup.' },
        { title: 'Check the fallback', text: 'If the async clipboard is blocked, the button falls back to a hidden-textarea copy automatically.' },
        { title: 'Reuse it', text: 'Change the language class and code to reuse the block for CSS, HTML or any Prism-supported language.' },
      ],
    },
    features: [
      'Syntax highlighting with the Tomorrow theme',
      'Line-numbers plug-in enabled by a class on the pre element',
      'Clickable line numbers that toggle highlighted lines',
      'Highlight bars rebuilt through the line-highlight plug-in API',
      'Copy button that copies textContent so no markup leaks in',
      'Async clipboard with an execCommand fallback and honest failure message',
      'Editor-style header with file name and traffic-light dots',
      'Event delegation on the pre element for dynamically generated line numbers',
    ],
    useCases: [
      { icon: 'CODE', title: 'Developer blogs and tutorials', desc: `Give every code sample line numbers and a copy button. For an editable version see the [CodeMirror editor](/ui-snippets/codemirror-editor-line-numbers-themes/).` },
      { icon: 'DOC', title: 'API and product documentation', desc: `Highlight the exact lines a paragraph is talking about.` },
      { icon: 'LEARN', title: 'Course material', desc: `Point students at specific lines in a longer listing by number.` },
      { icon: 'ADMIN', title: 'Changelog and diff-style displays', desc: `Emphasise changed lines in configuration and release-note snippets.` },
    ],
    faqs: [
      { q: 'Why do I need both a script and a stylesheet per plug-in?', a: 'Prism plug-ins split behaviour and styling. The script adds the feature, and the CSS supplies the gutter and highlight bar appearance.' },
      { q: 'Why doesn\'t changing data-line update the highlight?', a: 'The bars are drawn once. Remove the old .line-highlight elements and call Prism.plugins.lineHighlight.highlightLines(pre)() again after changing the attribute.' },
      { q: 'Why copy textContent instead of innerHTML?', a: 'After highlighting, the code element contains many token spans. textContent returns only the original text, so the clipboard is clean.' },
      { q: 'What if navigator.clipboard is unavailable?', a: 'It requires a secure context and permission. Fall back to a hidden textarea with document.execCommand("copy"), and tell the user if that fails too.' },
      { q: 'How do I add another language?', a: 'Load that language\'s component script, then use class="language-python" (or similar) on the code element and call Prism.highlightElement.' },
      { q: 'How do I highlight ranges like lines 2 to 5?', a: 'Set data-line="2-5" on the pre element. Ranges and comma-separated numbers can be combined, such as "1,3,8-10".' },
      { q: 'Can I use this code block in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Prism.js, so in a framework project install it with npm install prismjs instead of the CDN tag, call Prism.highlightElement in useEffect / onMounted / ngAfterViewInit after the code renders, and release it with nothing (it does not attach listeners) when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add language tabs, a diff mode that shades added and removed lines, or a collapse toggle for long listings.`,
      prompt: `Build a code block with Prism.js 1.29 loaded from cdnjs (core script, the Tomorrow theme, and the line-numbers and line-highlight plug-ins with their CSS).

Requirements:
- Render a <pre class="line-numbers" data-line="4-6"><code class="language-javascript"> with a header showing a file name and a Copy button.
- Call Prism.highlightElement(code) explicitly.
- Make line numbers clickable: keep the highlighted lines in a Set, update data-line, remove existing .line-highlight nodes and call Prism.plugins.lineHighlight.highlightLines(pre)() to redraw; delegate the click to the pre element.
- Implement Copy with navigator.clipboard.writeText(code.textContent) and a hidden-textarea execCommand fallback, showing a "Copied!" state.`,
    },
  },
};

export default prismjsCodeBlockCopyLineHighlight;
