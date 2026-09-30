const liveCodePlayground = {
  id: 'live-code-playground',
  title: 'Live Code Playground',
  lastmod: '2026-07-23',
  category: 'layouts',
  html: `<div class="pg">
  <!-- Editor pane -->
  <div class="pg-editor">
    <div class="pg-tabs" role="tablist">
      <button class="pg-tab active" data-lang="html" role="tab" aria-selected="true">HTML</button>
      <button class="pg-tab" data-lang="css" role="tab" aria-selected="false">CSS</button>
      <button class="pg-tab" data-lang="js" role="tab" aria-selected="false">JS</button>
      <span class="pg-status" id="pg-status">saved</span>
    </div>
    <div class="pg-editors">
      <textarea class="pg-code active" id="code-html" spellcheck="false" aria-label="HTML editor"></textarea>
      <textarea class="pg-code" id="code-css" spellcheck="false" aria-label="CSS editor"></textarea>
      <textarea class="pg-code" id="code-js" spellcheck="false" aria-label="JS editor"></textarea>
    </div>
  </div>

  <!-- Preview pane -->
  <div class="pg-preview">
    <div class="pg-preview-bar">
      <span class="pg-dots"><i></i><i></i><i></i></span>
      <span class="pg-url">preview</span>
      <button class="pg-run" id="pg-run" title="Run now">▶ Run</button>
    </div>
    <iframe class="pg-frame" id="pg-frame" title="Live preview" sandbox="allow-scripts"></iframe>
    <div class="pg-console" id="pg-console">
      <div class="pg-console-bar">Console <button id="pg-clear">clear</button></div>
      <div class="pg-console-out" id="pg-console-out"></div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; padding: 20px; }

.pg {
  max-width: 760px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  min-height: 480px;
}
@media (max-width: 640px) { .pg { grid-template-columns: 1fr; } }

/* — Editor — */
.pg-editor {
  display: flex; flex-direction: column;
  background: #111a2e; border: 1px solid #283548;
  border-radius: 14px; overflow: hidden;
}
.pg-tabs {
  display: flex; align-items: center;
  background: #16213a; border-bottom: 1px solid #283548;
  padding: 0 6px;
}
.pg-tab {
  background: none; border: none; color: #64748b;
  padding: 11px 14px; font-size: 12px; font-weight: 700;
  font-family: inherit; cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.pg-tab.active { color: #e2e8f0; border-bottom-color: #6366f1; }
.pg-status { margin-left: auto; padding-right: 10px; font-size: 10.5px; color: #4a5a76; }
.pg-status.dirty { color: #f59e0b; }

.pg-editors { flex: 1; position: relative; }
.pg-code {
  position: absolute; inset: 0;
  width: 100%; height: 100%; resize: none; border: none; outline: none;
  background: transparent; color: #cbd5e1;
  font-family: 'SF Mono', Consolas, monospace; font-size: 12.5px; line-height: 1.65;
  padding: 14px; display: none;
  tab-size: 2;
}
.pg-code.active { display: block; }

/* — Preview — */
.pg-preview {
  display: flex; flex-direction: column;
  background: #111a2e; border: 1px solid #283548;
  border-radius: 14px; overflow: hidden;
}
.pg-preview-bar {
  display: flex; align-items: center; gap: 10px;
  background: #16213a; border-bottom: 1px solid #283548;
  padding: 9px 12px;
}
.pg-dots { display: flex; gap: 5px; }
.pg-dots i { width: 9px; height: 9px; border-radius: 50%; }
.pg-dots i:nth-child(1) { background: #f87171; }
.pg-dots i:nth-child(2) { background: #fbbf24; }
.pg-dots i:nth-child(3) { background: #34d399; }
.pg-url { flex: 1; font-size: 11px; color: #4a5a76; text-align: center; }
.pg-run {
  background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4);
  color: #a5b4fc; border-radius: 7px; padding: 4px 10px;
  font-size: 11px; font-weight: 700; font-family: inherit; cursor: pointer;
}
.pg-run:hover { background: rgba(99,102,241,0.3); }

.pg-frame { flex: 1; border: none; background: #fff; width: 100%; }

/* — Console — */
.pg-console { border-top: 1px solid #283548; max-height: 118px; display: flex; flex-direction: column; }
.pg-console-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 5px 12px; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; color: #4a5a76;
}
.pg-console-bar button {
  background: none; border: none; color: #4a5a76; cursor: pointer;
  font-size: 10px; font-family: inherit; text-transform: uppercase;
}
.pg-console-bar button:hover { color: #94a3b8; }
.pg-console-out {
  overflow-y: auto; padding: 0 12px 8px;
  font-family: 'SF Mono', Consolas, monospace; font-size: 11px; line-height: 1.7;
}
.log-line { color: #94a3b8; border-bottom: 1px solid rgba(40,53,72,0.5); padding: 2px 0; }
.log-line.error { color: #f87171; }
.log-line.warn { color: #fbbf24; }
.log-line::before { content: '›'; margin-right: 7px; color: #475569; }`,

  js: `const SAMPLES = {
  html: '<div class="card">\\n  <h1>Hello, playground!</h1>\\n  <p>Edit any tab \\u2014 the preview updates as you type.</p>\\n  <button id="btn">Click me</button>\\n</div>',
  css: 'body { font-family: system-ui; display: grid; place-items: center; min-height: 90vh; background: #f1f5f9; }\\n.card { background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }\\nh1 { font-size: 22px; color: #1e293b; }\\np { color: #64748b; margin: 10px 0 18px; }\\nbutton { background: #6366f1; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; }',
  js: 'let count = 0;\\ndocument.getElementById("btn").addEventListener("click", () => {\\n  count++;\\n  console.log("clicked", count, "time" + (count > 1 ? "s" : ""));\\n});\\nconsole.log("preview ready");',
};

const editors = {
  html: document.getElementById('code-html'),
  css:  document.getElementById('code-css'),
  js:   document.getElementById('code-js'),
};
Object.keys(editors).forEach(k => { editors[k].value = SAMPLES[k]; });

/* — Tabs — */
document.querySelector('.pg-tabs').addEventListener('click', e => {
  const tab = e.target.closest('.pg-tab');
  if (!tab) return;
  document.querySelectorAll('.pg-tab').forEach(t => {
    t.classList.toggle('active', t === tab);
    t.setAttribute('aria-selected', t === tab);
  });
  Object.keys(editors).forEach(k =>
    editors[k].classList.toggle('active', k === tab.dataset.lang));
  editors[tab.dataset.lang].focus();
});

/* — Build the srcdoc document —
   The console bridge is injected FIRST so it catches early errors.
   It forwards console calls and runtime errors to the parent via
   postMessage — the sandboxed iframe can't touch the parent directly. */
function buildDoc() {
  const bridge = '<scr' + 'ipt>(function(){' +
    'function send(kind, args){parent.postMessage({source:"pg",kind:kind,text:args.map(function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ")},"*")}' +
    '["log","warn","error"].forEach(function(m){var o=console[m];console[m]=function(){send(m==="log"?"log":m,[].slice.call(arguments));o.apply(console,arguments)}});' +
    'window.onerror=function(msg,src,line){send("error",[msg+" (line "+line+")"]);return true};' +
    '})()</scr' + 'ipt>';
  return '<!doctype html><html><head>' + bridge +
    '<style>' + editors.css.value + '</style></head><body>' +
    editors.html.value +
    '<scr' + 'ipt>' + editors.js.value + '</scr' + 'ipt>' +
    '</body></html>';
}

/* — Run with debounce — */
const frame = document.getElementById('pg-frame');
const status = document.getElementById('pg-status');
const consoleOut = document.getElementById('pg-console-out');
let timer = null;

function run() {
  consoleOut.innerHTML = '';
  frame.srcdoc = buildDoc();
  status.textContent = 'saved';
  status.classList.remove('dirty');
}

Object.values(editors).forEach(ed => {
  ed.addEventListener('input', () => {
    status.textContent = 'typing…';
    status.classList.add('dirty');
    clearTimeout(timer);
    timer = setTimeout(run, 500);
  });

  // Tab key inserts two spaces instead of leaving the editor
  ed.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ed.selectionStart;
      ed.setRangeText('  ', s, ed.selectionEnd, 'end');
    }
  });
});

document.getElementById('pg-run').addEventListener('click', run);
document.getElementById('pg-clear').addEventListener('click', () => {
  consoleOut.innerHTML = '';
});

/* — Receive console messages from the iframe — */
window.addEventListener('message', e => {
  if (!e.data || e.data.source !== 'pg') return;
  const line = document.createElement('div');
  line.className = 'log-line ' + (e.data.kind === 'log' ? '' : e.data.kind);
  line.textContent = e.data.text;
  consoleOut.appendChild(line);
  consoleOut.scrollTop = consoleOut.scrollHeight;
});

run();`,

  seo: {
    title: 'Live Code Playground — Free HTML CSS JS Snippet',
    description: 'CodePen-style editor: HTML/CSS/JS tabs, sandboxed srcdoc iframe preview, debounced runs and a console capturing logs & errors. React & Tailwind exports.',
    about: {
      title: 'Live Code Playground — Sandboxed srcdoc Preview, postMessage Console Bridge, Debounced Rebuilds & Tab-Key Editing',
      description: `Every docs site, coding course, and component library eventually wants a live editor — type HTML/CSS/JS, see it run. CodePen and JSFiddle made the format universal, but the core machine is small enough to own: this snippet builds a working playground in vanilla JavaScript with tabbed editors, a sandboxed iframe preview rebuilt on a debounce as you type, and — the part most homemade playgrounds skip — a real console panel that captures \`console.log\`, warnings, and runtime errors from inside the preview via a postMessage bridge.

**The preview: srcdoc + sandbox**

Each run assembles a complete HTML document string — user CSS into a \`<style>\` in the head, user HTML as the body, user JS in a closing \`<script>\` — and assigns it to the iframe's \`srcdoc\`. srcdoc beats \`document.write\` and blob URLs for this job: assignment atomically replaces the entire document (no stale state from the previous run — variables, timers, and listeners all die with the old document), needs no URL lifecycle management, and works offline. The iframe carries \`sandbox="allow-scripts"\` — scripts run, but the preview gets a null origin: no access to the parent page, its cookies, storage, or DOM. That single attribute is what makes running arbitrary user code on your page safe, and it's why the console can't just be read directly — which leads to the bridge. One string-level detail worth noticing: the builder writes \`'<scr' + 'ipt>'\` because a literal \`</script>\` inside a JavaScript string would terminate the *hosting* page's script tag — the classic embedded-document gotcha.

**The console bridge**

Sandboxed code can't touch the parent, but \`postMessage\` crosses the boundary by design. The builder injects a tiny bridge script as the *first* thing in the document head — before user CSS and HTML, so it's installed when user JS runs and even catches parse-adjacent early errors. The bridge wraps \`console.log/warn/error\`, serialising arguments (objects through \`JSON.stringify\` with a fallback for circulars) and forwarding \`{ source: 'pg', kind, text }\` to \`parent.postMessage\`; it also installs \`window.onerror\` so uncaught runtime errors arrive as red console lines with their line number rather than vanishing silently. The parent listens for messages, filters by the \`source\` tag (never trust unfiltered message events), and appends colour-coded lines — grey logs, amber warns, red errors — auto-scrolled, with a clear button. The demo JS logs on load and on button clicks so the round trip is visible immediately.

**Editing ergonomics on plain textareas**

The editors are three absolutely stacked \`<textarea>\`s toggled by tabs — deliberately not a syntax-highlighting editor, because that's the honest boundary where CodeMirror/Monaco earn their bundle size (the swap point is one element per tab). Two ergonomic details make textareas livable: the Tab key inserts two spaces via \`setRangeText\` instead of jumping focus out of the editor (with \`preventDefault\`, preserving the selection-replacement behaviour), and \`tab-size: 2\` with a monospace stack keeps pasted code readable. A status chip flips to "typing…" on input and back to "saved" when the debounced run lands — the 500ms debounce being the balance between liveness and not rebuilding the iframe on every keystroke (each rebuild is a full document parse; debouncing is what keeps typing smooth).

**Chrome and structure**

The preview pane wears the browser-window costume — traffic-light dots, a URL-ish label, and a manual ▶ Run button for when you want an immediate rebuild without waiting out the debounce. The two panes are a responsive grid (side-by-side, stacking under 640px), each a rounded card with the editor's tab bar and the preview's console docked at the bottom. Everything is standard DOM — no dependencies — so the whole playground embeds anywhere a component library, tutorial, or docs page needs runnable examples.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Edit and watch it run',
          text: 'Type in any tab — the status chip reads "typing…", and 500ms after you pause the preview rebuilds ("saved"). Click the demo button in the preview and watch "clicked N times" appear in the console panel: that\'s the postMessage bridge at work. Break something deliberately (call a missing function in the JS tab) and the uncaught error arrives as a red console line with its line number. ▶ Run forces an immediate rebuild; clear empties the console.',
        },
        {
          title: 'Load your own starter code',
          text: 'The SAMPLES object holds the initial content of each tab — replace it with your example. For a docs site with many runnable examples, render one playground per example with SAMPLES injected per instance, or add a snippet-picker select that swaps SAMPLES and calls run(). Everything else is instance-local (the editors and frame are queried by id, so scope them per instance with a container query root if you embed several).',
        },
        {
          title: 'Understand the sandbox before extending it',
          text: 'sandbox="allow-scripts" is the security boundary: user code runs with a null origin and cannot touch your page, cookies, or storage. Never add allow-same-origin alongside allow-scripts for arbitrary user code — the combination lets the preview reach into the parent and defeats the sandbox entirely. If examples need network calls, they already work (fetch is allowed); if they need localStorage, give the preview a fake via the bridge rather than weakening the sandbox.',
        },
        {
          title: 'Extend the console',
          text: 'The bridge serialises with JSON.stringify — extend it for richer output: detect arrays/objects and pretty-print with indentation, special-case DOM nodes as their outerHTML opening tag, and pass console.table through as formatted columns. Add console.info/debug by extending the wrapped-methods array. For errors, window.addEventListener("unhandledrejection") in the bridge catches async failures the demo doesn\'t yet surface.',
        },
        {
          title: 'Persist and share',
          text: 'Save state by serialising the three editor values — localStorage for autosave (debounced alongside run()), or encode into a shareable URL: location.hash = btoa(encodeURIComponent(JSON.stringify({ html, css, js }))) and hydrate from the hash on load. That URL-state pattern is how CodePen-style "share this pen" links work, and it needs no backend for snippets under a few KB.',
        },
        {
          title: 'Upgrade the editors when you outgrow textareas',
          text: 'The swap point is clean: replace each textarea with a CodeMirror 6 instance (small, tree-shakeable) keeping the same value-in/value-out contract and input debounce. Then compose with this library: the [Code Block Tabs](/ui-snippets/code-block-tabs) for static display alongside, [Browser Window](/ui-snippets/browser-window) for the preview chrome, [Markdown Live Preview](/ui-snippets/markdown-live-preview) for the same split-pane pattern on markdown, and [Drag Resize Panels](/ui-snippets/drag-resize-panels) to make the pane divider draggable.',
        },
      ],
    },
    features: [
      'Sandboxed preview: sandbox="allow-scripts" iframe with atomic srcdoc replacement — no stale state between runs',
      'postMessage console bridge injected first in the document, wrapping log/warn/error with safe serialisation',
      'window.onerror in the bridge surfaces uncaught runtime errors as red lines with line numbers',
      'Colour-coded auto-scrolling console panel with a clear button, filtered by message source tag',
      '500ms debounced rebuilds with a typing…/saved status chip, plus a manual ▶ Run button',
      'Tab key inserts two spaces via setRangeText instead of escaping the editor',
      'The </script>-in-a-string gotcha handled and commented in the document builder',
      'Responsive split-pane layout with browser-chrome preview bar; editors swap cleanly for CodeMirror later',
    ],
    useCases: [
      {
        icon: 'DOC',
        title: 'Runnable examples in documentation and component libraries',
        desc: 'Static code blocks show; playgrounds teach. Embed one per component with SAMPLES set to a minimal usage example, and readers modify props and styles live instead of imagining the result. Because the preview is fully sandboxed, user experimentation can never break the docs page. This snippet library\'s own "Test Exports" feature is the same architecture — and the [Code Block Tabs](/ui-snippets/code-block-tabs) snippet covers the read-only sibling.',
      },
      {
        icon: 'LEARN',
        title: 'Coding courses, tutorials, and classroom exercises',
        desc: 'Teaching platforms need students to write code with zero setup, and the console is what makes this viable for teaching JavaScript rather than just layouts: console.log output and red error lines with line numbers are the feedback loop of every beginner exercise. Preload each lesson\'s starter into SAMPLES, add a "reset" button restoring it, and compare student output textually. The sandbox means a student\'s infinite loop or broken code stays contained in their iframe.',
      },
      {
        icon: 'CODE',
        title: 'Bug-report and support reproduction sandboxes',
        desc: 'Support teams and OSS maintainers ask "can you reproduce it in a minimal example?" — hosting your own playground with your library pre-injected (add its script tag to buildDoc\'s head) turns that into a one-link workflow. The URL-hash sharing pattern from the how-to means reproductions travel as links with no storage backend, and the console capture is usually where the diagnostic lives.',
      },
      {
        icon: 'APP',
        title: 'In-product theming and template editors',
        desc: 'Products letting users customise email templates, widget embeds, or theme CSS need exactly this: edit code, preview safely, never let user code touch the host app. The sandbox boundary is the whole point — a customer\'s template JS runs with null origin, and the bridge gives them debugging output without any access. Swap the HTML tab\'s label to "Template", inject your merge-variable preview data in buildDoc, and it\'s a template IDE.',
      },
      {
        icon: 'WEB',
        title: 'Interview and assessment environments',
        desc: 'Technical screening tools need candidates coding in-browser with output visible to both sides. This is the front half: the editors, sandboxed execution, and console capture. Serialise editor values plus console output per keystroke-batch to your backend for the review side. The Tab-key handling matters more than it looks here — candidates tabbing out of the editor mid-exercise is a real usability failure in homegrown assessment tools.',
      },
      {
        icon: 'FLOW',
        title: 'Learning the sandboxed-execution architecture itself',
        desc: 'Three transferable security/architecture lessons live in this one file: the sandbox attribute\'s allow-scripts/allow-same-origin interaction (and why combining them for user code is a vulnerability), postMessage as the only correct channel out of a null-origin frame (with source-tag filtering on receipt), and the script-in-string termination gotcha. Anyone building plugin systems, user-script features, or embedded third-party content hits all three — this playground is the minimal complete demonstration.',
      },
      { icon: 'CODE', title: 'Related: Sticky Sidebar', desc: 'See the [Sticky Sidebar](/ui-snippets/sticky-sidebar/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why srcdoc instead of document.write, blob URLs, or updating the iframe DOM in place?',
        a: 'Because runs must be hermetic. Updating the preview DOM in place (or writing into the existing document) leaks state between runs: the previous run\'s intervals keep firing, its event listeners stack up, its global variables collide with redeclarations — the second Run behaves differently from the first, which is fatal in a tool whose whole job is showing what code does. Assigning srcdoc replaces the entire browsing context: old timers, listeners, and globals are destroyed with their document, so every run starts from zero. Against blob URLs (the other hermetic option), srcdoc wins on lifecycle — no URL.createObjectURL/revokeObjectURL bookkeeping, no leaked blobs when users type fast — and on simplicity, since the document is just a string property. Blob URLs remain the right tool when you need the preview openable in a new tab or when documents exceed srcdoc\'s practical size comfort; for an embedded playground, srcdoc is the correct default. document.write is deprecated for good reasons and offers nothing over either.',
      },
      {
        q: 'How does the console bridge work, and why is it injected before everything else?',
        a: 'The sandboxed frame has a null origin, so the parent cannot read its console, and the frame cannot call parent functions — but postMessage is explicitly designed to cross that boundary. The bridge is a self-executing script that (1) wraps console.log/warn/error, serialising each argument — objects via JSON.stringify inside a try/catch because circular structures throw — then posting { source: "pg", kind, text } to the parent while still calling the original method (so the real devtools console works too); and (2) installs window.onerror, converting uncaught runtime errors into red console lines with their line number, returning true to suppress the default reporting. Injection order is load-bearing: scripts execute in document order, so the bridge must be the first head script to have wrapped console before any user code runs — injected last, it would miss every log fired during page setup and any error thrown before it installed. On the parent side, the message listener filters by the source tag: window.message receives traffic from every frame and origin, and processing unfiltered events is both a correctness bug and a security smell.',
      },
      {
        q: 'Is it actually safe to run arbitrary user code in this iframe?',
        a: 'For the threat model of a playground — untrusted code that must not touch your page, your users\' cookies, or your origin\'s storage — yes, with one rule kept sacred. sandbox="allow-scripts" gives the frame a unique opaque origin: same-origin policy then blocks it from the parent DOM, document.cookie, localStorage, and your APIs\' credentialed requests; it also cannot navigate the top page, open popups, or submit forms (each of those needs its own sandbox token you have not granted). The sacred rule: never add allow-same-origin alongside allow-scripts for user code — together they let the frame\'s script reach into the parent and remove its own sandbox attribute, which is a complete escape. What the sandbox does NOT prevent: the code can still burn CPU (an infinite loop freezes the frame, not your page — Run again to recover, since srcdoc replacement kills it), make outbound fetch requests to public endpoints (add a CSP via a meta tag in buildDoc if that matters for your context), and log misleading content into your console panel (it is text, rendered via textContent, so it cannot inject markup). For a docs site or course, this is the industry-standard posture; CodePen\'s additional layer — serving previews from a separate cookieless domain — is the upgrade when you host user content persistently at scale.',
      },
      {
        q: 'How would I build this in React or Angular, and can Tailwind style it?',
        a: 'React: hold the three sources in one useState object; the debounce becomes a useEffect on that state with a setTimeout and clearTimeout cleanup (the idiomatic debounce-in-effect), writing frame.current.srcdoc via a ref — srcdoc can also be passed as a prop (<iframe srcDoc={doc}>), in which case memoise doc with useMemo and debounce the state feeding it instead. Console messages arrive in a useEffect-installed window message listener appending to a logs state array (cap its length — a user loop logging thousands of lines will otherwise grow state unboundedly; the vanilla version has the same footgun in DOM form). Textareas stay uncontrolled-ish for perf (value + onChange is fine at these sizes; switch to refs if you feel input lag). Angular: signals for the sources, an effect() for the debounce, DomSanitizer.bypassSecurityTrustHtml for the srcdoc binding, and the message listener in a service with NgZone.run to re-enter change detection. Tailwind: the shell is grid grid-cols-2 max-[640px]:grid-cols-1 gap-3; panes are flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden; tabs are px-3.5 py-2.5 text-xs font-bold text-slate-500 border-b-2 border-transparent data-[active]:text-slate-200 data-[active]:border-indigo-500; editors are font-mono text-[12.5px] leading-relaxed p-3.5 bg-transparent resize-none outline-none [tab-size:2]; console lines are before:content-[\'›\'] before:mr-1.5 with text-red-400/text-amber-400 kind variants.',
      },
    ],
    aiPrompt: {
      paragraph: `A playground is infrastructure, and the right way to extend infrastructure is to understand its two boundaries first — ask an AI assistant to quiz you on them: paste this snippet into Claude and ask why allow-same-origin would break the security model, why the bridge must be the first script in the document, and why srcdoc replacement is what makes runs hermetic; the three answers are the architecture. Then extend by request: a richer console (pretty-printed objects, console.table, unhandledrejection capture), URL-hash sharing with byte-budget honesty about when it needs a backend, per-instance scoping so five playgrounds coexist on one docs page, and the CodeMirror 6 swap with the value-contract preserved — each is a well-scoped ask the assistant handles in one pass. If you're embedding your own library for users to play with, have it modify buildDoc to inject your script tag and a CSP meta, and ask what the sandbox does and doesn't protect you from in that configuration — writing down the answer is the difference between a playground and a liability.`,
      prompt: `Build a CodePen-style live code playground in plain HTML, CSS, and JavaScript — tabbed HTML/CSS/JS editors, a sandboxed live preview, and a console that captures logs and errors from inside the preview. No libraries.

Requirements:
- A responsive two-pane grid (stacking under 640px): an editor card with an HTML/CSS/JS tab bar over three absolutely-stacked textareas (monospace, tab-size 2, spellcheck off) toggled by the tabs, and a preview card wearing browser chrome — traffic-light dots, a url label, and a manual ▶ Run button.
- On each run, assemble a complete document string — user CSS in a head style tag, user HTML as the body, user JS in a body-end script — and assign it to the iframe's srcdoc so every run atomically replaces the previous document (comment why this hermetic replacement beats mutating the preview in place); the iframe must carry sandbox="allow-scripts" and the builder must split any literal script closing tag in its strings (comment the termination gotcha).
- Inject a console bridge as the FIRST script in the built document (comment why order matters): wrap console.log/warn/error to serialise arguments (JSON.stringify objects inside try/catch) and postMessage { source, kind, text } to the parent while still calling the originals, and install window.onerror forwarding uncaught errors with their line number.
- In the parent, listen for messages filtered by the source tag and append colour-coded lines (grey log, amber warn, red error, each prefixed with ›) to an auto-scrolling console panel docked under the preview, with a clear button.
- Rebuild on a 500ms input debounce with a status chip flipping between "typing…" and "saved"; make the Tab key insert two spaces via setRangeText instead of leaving the textarea.
- Seed the editors with a working sample (a styled card whose button click console.logs an incrementing count, plus a load-time log) so the bridge round-trip is visible immediately, and comment the two security rules: never add allow-same-origin for user code, and never render console text as HTML.`,
    },
  },
};

export default liveCodePlayground;
