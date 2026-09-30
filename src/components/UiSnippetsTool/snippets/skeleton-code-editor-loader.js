const skeletonCodeEditorLoader = {
  id: 'skeleton-code-editor-loader',
  title: 'Code Editor Skeleton Loader',
  category: 'loaders',
  html: `<div class="ce-window">
  <div class="ce-titlebar">
    <span class="ce-dot r"></span><span class="ce-dot y"></span><span class="ce-dot g"></span>
    <span class="ce-filename">app.tsx</span>
  </div>
  <div class="ce-body">
    <div class="ce-gutter" id="ceGutter"></div>
    <div class="ce-lines" id="ceLines"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ce-window{width:100%;max-width:480px;background:#0d1117;border:1px solid #21262d;border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ce-titlebar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:#161b22;border-bottom:1px solid #21262d}
.ce-dot{width:10px;height:10px;border-radius:50%}
.ce-dot.r{background:#f87171}.ce-dot.y{background:#fbbf24}.ce-dot.g{background:#34d399}
.ce-filename{margin-left:6px;font-size:11.5px;color:#7d8590;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

.ce-body{display:flex;padding:14px 0;min-height:260px}
.ce-gutter{display:flex;flex-direction:column;gap:11px;padding:0 12px;border-right:1px solid #1c212c}
.ce-gutter span{font-family:ui-monospace,monospace;font-size:11px;color:#30384a;text-align:right;width:16px}

.ce-lines{flex:1;display:flex;flex-direction:column;gap:11px;padding:0 16px}
.ce-line{display:flex;gap:6px;align-items:center;height:12px}
.ce-tok{height:10px;border-radius:4px;background:linear-gradient(90deg,#1a2030 25%,#262e44 37%,#1a2030 63%);background-size:400% 100%;animation:ceShimmer 1.6s ease-in-out infinite}
@keyframes ceShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* Token color hints, dimmed, to read as syntax highlighting even while placeholder */
.ce-tok.kw{background-image:linear-gradient(90deg,#3a2a4a 25%,#5a3f73 37%,#3a2a4a 63%)}
.ce-tok.fn{background-image:linear-gradient(90deg,#1e3a4a 25%,#2f5a73 37%,#1e3a4a 63%)}
.ce-tok.str{background-image:linear-gradient(90deg,#1e3a2a 25%,#2f5a3f 37%,#1e3a2a 63%)}`,

  js: `// Generates a plausible skeleton "code" layout: varied indentation depths,
// varied token widths per line, and occasional short/blank lines, so it
// reads as real source code rather than a generic list of gray bars.
var LINE_COUNT = 16;
var linesEl = document.getElementById('ceLines');
var gutterEl = document.getElementById('ceGutter');

var TOKEN_CLASSES = ['', 'kw', 'fn', 'str'];

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function buildLine(i) {
  var row = document.createElement('div');
  row.className = 'ce-line';

  // Roughly a third of lines are blank, like real source with breathing room.
  if (Math.random() < 0.15) return row;

  var indentLevel = randomInt(0, 3);
  row.style.marginLeft = (indentLevel * 18) + 'px';

  var tokenCount = randomInt(1, 4);
  for (var t = 0; t < tokenCount; t++) {
    var tok = document.createElement('span');
    var cls = TOKEN_CLASSES[randomInt(0, TOKEN_CLASSES.length - 1)];
    tok.className = 'ce-tok' + (cls ? ' ' + cls : '');
    tok.style.width = randomInt(24, 92) + 'px';
    tok.style.animationDelay = (i * 0.03) + 's';
    row.appendChild(tok);
  }
  return row;
}

for (var i = 0; i < LINE_COUNT; i++) {
  var num = document.createElement('span');
  num.textContent = String(i + 1);
  gutterEl.appendChild(num);
  linesEl.appendChild(buildLine(i));
}`,

  seo: {
    title: 'Code Editor Skeleton Loader — Syntax-Style Shimmer CSS JS',
    description: 'A code-editor-shaped skeleton loader with line numbers, varied indentation, and tinted shimmer tokens that read as syntax highlighting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Code Editor Skeleton Loader — A Placeholder Shaped Like Real Source Code',
      description: `Generic skeleton loaders — flat gray bars of a few fixed widths — work fine for text and cards, but they read as obviously wrong when the real content is source code. Code has line numbers, wildly varied line lengths, indentation that increases and decreases, and color-coded tokens. This snippet builds a skeleton specifically shaped like a code editor: a titlebar with window dots and a filename, a gutter of line numbers, and a body of shimmer "tokens" arranged with randomized indentation and token counts per line.

**Randomized, code-shaped line generation**

\`buildLine(i)\` doesn't just repeat one bar shape. Each line gets a random indent level (0 to 3, multiplied into a \`margin-left\` in steps of 18px) and a random count of 1 to 4 token spans, each with its own randomized width between 24px and 92px. Roughly 15% of lines are left blank, mimicking the breathing room real source files have between logical blocks. The result looks like an actual function body rather than a uniform list.

**Tinted tokens hint at syntax highlighting**

Instead of every shimmer bar sharing one gray gradient, each token is randomly assigned one of a few tinted gradient classes — a muted purple for \`kw\` (keyword-like), blue for \`fn\` (call-like), and green for \`str\` (string-like) — layered under the same moving shimmer animation. The effect reads as a blurred, out-of-focus glimpse of syntax-highlighted code without needing a real syntax highlighter or language grammar.

**A believable gutter**

The \`.ce-gutter\` renders one real line number per generated line, right-aligned in a muted monospace, exactly matching a real code editor's left column — a detail that does a lot of work to sell the illusion, since a gutter is one of the most recognizable features of any code view at a glance.

**Console-style chrome**

The titlebar's red/yellow/green window dots and monospace filename label match the same convention used by [the typewriter status log loader](/ui-snippets/loader-typewriter-status-log/) and countless real editors and terminals, so the component is immediately legible as "code" before a single token has rendered.

**Why this beats a generic skeleton for code contexts**

A generic list-of-bars skeleton over a code preview area creates a visible mismatch the instant real syntax-highlighted code pops in — the shapes don't rhyme. This skeleton's randomized indentation and varied token widths are deliberately irregular in the same way real code is irregular, so the transition into the real editor or code block feels like a continuation rather than a swap.

**Customizing it**

Adjust \`LINE_COUNT\`, the indent step size, or the token width range to match your actual editor's typical line profile. Add more tinted token classes for a richer syntax illusion, or tie \`LINE_COUNT\` to the real file's line count once you know it (from a HEAD request or cached metadata) so the skeleton's height doesn't jump when the real content loads. Pair it with a [suspense fallback card](/ui-snippets/loader-suspense-fallback-card/) for the surrounding page shell.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A code-editor window renders with a titlebar, line-number gutter, and shimmering token lines.' },
        { title: 'Observe the varied shapes', text: 'Indentation, token count, and token width differ per line, with occasional blank lines.' },
        { title: 'Notice the tinted tokens', text: 'Muted purple, blue, and green shimmer tones hint at keywords, calls, and strings.' },
        { title: 'Adjust LINE_COUNT', text: 'Change how many skeleton lines render to match your real editor\\u2019s typical height.' },
        { title: 'Tune indentation and widths', text: 'Edit the randomInt ranges for indent level, token count, and token width.' },
        { title: 'Swap in the real editor', text: 'Replace this component with your real code view (or CodeMirror/Monaco instance) once content loads.' },
      ],
    },
    features: [
      'Randomized per-line indentation for a plausible code shape, not uniform bars',
      'Randomized token count and width per line',
      'Occasional blank lines mimic real source-code breathing room',
      'Tinted token gradients hint at syntax highlighting (keyword, call, string tones)',
      'Real line-number gutter matching the generated line count',
      'Console-style titlebar with window dots and a filename label',
      'Shared shimmer keyframe with per-line animation-delay offsets',
      'Zero dependencies and no syntax-highlighting library required',
      'Easily themeable colors and line count',
      'Drop-in placeholder for any code block, diff view, or IDE panel',
    ],
    useCases: [
      { icon: 'CODE', title: 'Code snippet and playground loading states', desc: 'The primary use case — show this while a real syntax-highlighted editor or embed initializes.' },
      { icon: 'APP', title: 'Developer tool dashboards', desc: 'Placeholder for file viewers, diff panels, or log viewers before real content streams in.' },
      { icon: 'LEARN', title: 'Documentation and tutorial sites', desc: 'A believable placeholder while a live code example loads from a CMS or API.' },
      { icon: 'FORM', title: 'AI code-generation tools', desc: 'Show this while an AI assistant is about to stream generated code into an editor pane.' },
      { icon: 'DESIGN', title: 'Portfolio and project showcase sites', desc: 'A polished loading state for embedded code samples on a slower connection.' },
      { icon: 'CODE', title: 'Related: Typewriter Status Log Loader', desc: 'See the [Typewriter Status Log Loader](/ui-snippets/loader-typewriter-status-log/) for a matching console-styled loading pattern.' },
    ],
    faqs: [
      { q: 'Why not just reuse a generic skeleton-list component for a code preview?', a: 'A generic skeleton\\u2019s uniform bar widths and lack of indentation create a visible mismatch the instant real syntax-highlighted code appears — the shapes don\\u2019t resemble each other. This component randomizes indentation, token count, and token width per line specifically so its irregular shape rhymes with how real code actually looks.' },
      { q: 'How are the tinted "syntax" colors generated without a real highlighter?', a: 'Each token span is randomly assigned one of a few CSS classes (kw, fn, str, or none) that layer a tinted gradient under the same shimmer animation used for the base gray tokens. It is not real syntax analysis — just enough color variation to visually suggest highlighted code at a glance.' },
      { q: 'How do I match the skeleton height to my real content?', a: 'Set LINE_COUNT to the actual line count of the file you\\u2019re about to load, if you know it ahead of time (e.g. from cached file metadata), so the skeleton\\u2019s height doesn\\u2019t change once the real editor mounts and causes a layout shift.' },
      { q: 'Can I add more token color categories?', a: 'Yes. Add another class to the TOKEN_CLASSES array in the JS and a matching .ce-tok.yourclass rule in the CSS with its own tinted linear-gradient — the random selection logic picks up new entries automatically.' },
      { q: 'Does this require a real syntax highlighter like Prism or Shiki?', a: 'No. It has no awareness of any programming language — it is a purely decorative placeholder built from randomized shapes and tinted shimmer gradients meant to be swapped out for your real syntax-highlighted content once it loads.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Move the line-generation logic (indent level, token count, token widths, blank-line chance) into a function that returns an array of line descriptors computed once via useMemo (or your framework\\u2019s equivalent) so the random shapes don\\u2019t change on every re-render, then map that array to markup.' },
    ],
    aiPrompt: {
      paragraph: `Instead of assuming this is a generic skeleton with extra styling, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how buildLine() combines randomized indentation, token count, and token width to produce a shape that reads as real source code rather than a uniform list, and why the tinted token classes are layered under the same shimmer keyframe instead of being separate animations. The same assistant can help optimize it — for instance asking whether the random line shapes should be generated once and memoized so they don't visibly reshuffle on every re-render in a component-based framework. It's also useful for extending it: ask it to bias the random indentation to follow more realistic nesting patterns (increasing gradually rather than fully random), add a blinking cursor on one line, or generate the skeleton's line count from a real file's actual line count fetched ahead of time. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a skeleton loading placeholder shaped specifically like a code editor in plain HTML, CSS, and JavaScript — no libraries and no real syntax highlighter.

Requirements:
- A window shell with a titlebar containing three colored "traffic light" dots and a monospace filename label, matching the classic code-editor/terminal chrome convention.
- A two-column body: a narrow gutter on the left showing sequential line numbers, and a main area on the right containing one generated placeholder "line" per line number.
- Generate each line's shape randomly and independently in JavaScript: a random indentation level (applied as a left margin in fixed steps, simulating nested code blocks), a random count of 1 to 4 short shimmering token spans per line, each with an independently randomized width, and roughly a 1-in-6 chance for a line to render completely blank to mimic real spacing between code blocks.
- Give the shimmering tokens a couple of different tinted gradient variants (not just plain gray) randomly assigned per token, so the placeholder vaguely suggests syntax-highlighted colors (e.g. a muted purple, blue, and green tone) without performing any real language parsing.
- Use one shared CSS shimmer keyframe animating background-position for all tokens, with a small per-line animation-delay offset so the shimmer doesn't move in perfect unison across every line.
- Keep the whole thing dependency-free — no code-highlighting library, just DOM generation and CSS gradients.`,
    },
  },
};

export default skeletonCodeEditorLoader;
