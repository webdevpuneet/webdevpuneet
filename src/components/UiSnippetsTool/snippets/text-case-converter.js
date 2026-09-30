const textCaseConverter = {
  id: 'text-case-converter',
  title: 'Text Case Converter',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Text Case Converter</h2>

  <textarea id="input-text" spellcheck="false" placeholder="Type or paste text here...">The Quick Brown Fox jumps_over-the LAZY dog</textarea>

  <div class="case-grid" id="case-grid"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 680px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

textarea { width: 100%; min-height: 76px; resize: vertical; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; color: #1e293b; line-height: 1.6; margin-bottom: 18px; }
textarea:focus { outline: none; border-color: #6366f1; }

.case-grid { display: flex; flex-direction: column; gap: 8px; }
.case-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; }
.case-row .label { flex-shrink: 0; width: 110px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.03em; }
.case-row .value { flex: 1; font-family: "SF Mono", Consolas, monospace; font-size: 13px; color: #1e293b; overflow-x: auto; white-space: nowrap; }
.case-row .copy-btn { flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 6px 11px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #fff; color: #6366f1; cursor: pointer; }
.case-row .copy-btn:hover { background: #6366f1; color: #fff; border-color: #6366f1; }
.case-row .copy-btn.copied { background: #16a34a; border-color: #16a34a; color: #fff; }`,
  js: `const cases = [
  { key: 'upper', label: 'UPPERCASE' },
  { key: 'lower', label: 'lowercase' },
  { key: 'title', label: 'Title Case' },
  { key: 'sentence', label: 'Sentence case' },
  { key: 'camel', label: 'camelCase' },
  { key: 'pascal', label: 'PascalCase' },
  { key: 'snake', label: 'snake_case' },
  { key: 'kebab', label: 'kebab-case' },
  { key: 'constant', label: 'CONSTANT_CASE' },
  { key: 'dot', label: 'dot.case' },
];

function tokenize(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\\-.]+/g, ' ')
    .trim()
    .split(/\\s+/)
    .filter(Boolean)
    .map(w => w.toLowerCase());
}

function toUpper(str) { return str.toUpperCase(); }
function toLower(str) { return str.toLowerCase(); }

function toTitle(str) {
  return tokenize(str).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function toSentence(str) {
  const words = tokenize(str).join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function toCamel(str) {
  const words = tokenize(str);
  return words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toPascal(str) {
  return tokenize(str).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toSnake(str) { return tokenize(str).join('_'); }
function toKebab(str) { return tokenize(str).join('-'); }
function toConstant(str) { return tokenize(str).join('_').toUpperCase(); }
function toDot(str) { return tokenize(str).join('.'); }

const converters = {
  upper: toUpper, lower: toLower, title: toTitle, sentence: toSentence,
  camel: toCamel, pascal: toPascal, snake: toSnake, kebab: toKebab,
  constant: toConstant, dot: toDot,
};

const inputText = document.getElementById('input-text');
const caseGrid = document.getElementById('case-grid');

function render() {
  caseGrid.innerHTML = cases.map(c =>
    '<div class="case-row" data-key="' + c.key + '">' +
      '<span class="label">' + c.label + '</span>' +
      '<span class="value" id="val-' + c.key + '"></span>' +
      '<button class="copy-btn" data-key="' + c.key + '">Copy</button>' +
    '</div>'
  ).join('');

  caseGrid.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const text = document.getElementById('val-' + key).textContent;
      navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1200);
    });
  });

  update();
}

function update() {
  const raw = inputText.value;
  cases.forEach(c => {
    const el = document.getElementById('val-' + c.key);
    if (el) el.textContent = raw ? converters[c.key](raw) : '';
  });
}

inputText.addEventListener('input', update);
render();`,

  seo: {
    title: 'Text Case Converter — Free HTML CSS JS Snippet',
    description: 'Convert text between UPPERCASE, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and more simultaneously, with per-row copy buttons. Exports to React & Vue.',
    about: {
      title: 'Text Case Converter — Ten Simultaneous Casing Conventions from a Single Tokenizer',
      description: `Naming conventions across programming languages and writing contexts vary wildly — a database column might use \`snake_case\`, a JavaScript variable \`camelCase\`, a React component \`PascalCase\`, and a URL slug \`kebab-case\`, all describing conceptually the same identifier. This snippet converts one input into all ten common conventions at once, so you never have to guess or manually retype an identifier when moving between contexts that expect different casing.

**One tokenizer, ten output formats**

The core of this tool is a single \`tokenize()\` function that all ten conversions share. Rather than writing ten separate parsing functions, \`tokenize()\` normalizes *any* input format — whether it's already \`camelCase\`, \`snake_case\`, space-separated Title Text, or a messy mix like \`jumps_over-the LAZY dog\` — down to a plain array of lowercase words, and every casing function just re-joins that same word array differently.

**Splitting camelCase boundaries with a lookbehind-style regex**

The trickiest part of tokenizing is correctly splitting \`camelCase\` or \`PascalCase\` input into separate words, since there's no delimiter character to split on — only a case change. \`tokenize()\` handles this with \`str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')\`, which finds every position where a lowercase letter or digit is immediately followed by an uppercase letter and inserts a space between them. This correctly splits \`quickBrownFox\` into \`quick Brown Fox\` before the rest of the pipeline lowercases everything, but deliberately does *not* split consecutive uppercase letters (like an acronym) apart from each other — a hyphen and underscore and dot separator pass, \`str.replace(/[_\\-.]+/g, ' ')\`, before the final \`trim()\` and \`split(/\\s+/)\` normalize everything down to single space-separated lowercase words.

**Building each case style from the same word array**

Once \`tokenize()\` produces a clean array of lowercase words, every conversion is a short, purely mechanical join: \`toCamel()\` lowercases the first word and capitalizes every word after it with no separator; \`toPascal()\` capitalizes every word including the first with no separator; \`toSnake()\`, \`toKebab()\`, \`toConstant()\`, and \`toDot()\` join with \`_\`, \`-\`, \`_\` (then uppercase), and \`.\` respectively; \`toTitle()\` capitalizes every word and joins with spaces; \`toSentence()\` capitalizes only the very first letter of the joined phrase. Because every function operates on the same pre-tokenized word list, the mapping between formats stays perfectly consistent — there's no risk of one conversion function handling an edge case (like a leading number or a run of capital letters) differently from another.

**Live, simultaneous conversion of every format**

Rather than requiring you to pick a target format from a dropdown, \`update()\` recomputes and displays all ten conversions on every keystroke by iterating the shared \`cases\` list and calling each format's converter function against the same raw input. Each row gets its own copy button that grabs exactly that row's rendered value — useful when you need to paste the same identifier into several different files or contexts (a database migration, a component file, a CSS class name) in quick succession without re-running the tool for each one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type or paste any text', text: 'The input accepts text in any casing style — spaces, underscores, hyphens, camelCase, or a mix — and updates all ten conversions live.' },
        { title: 'Scan the ten converted formats', text: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case are all shown simultaneously.' },
        { title: 'Click Copy on any row', text: 'Copies that specific row\'s converted value to your clipboard; the button briefly confirms with "Copied!"' },
        { title: 'Paste an already-cased identifier to re-tokenize it', text: 'Input like myVariableName or my-component-name is correctly split back into words before being re-cased into every other format.' },
        { title: 'Use it for renaming across contexts', text: 'Convert one identifier into a database column name, a JS variable, a CSS class, and a URL slug in one pass instead of manually retyping each casing style.' },
      ],
    },
    features: [
      'Ten simultaneous casing conventions computed live from a single shared tokenizer function',
      'Correctly splits camelCase/PascalCase boundaries using a lowercase-then-uppercase regex transition detector',
      'Also normalizes underscore, hyphen, and dot-separated input into the same clean word list before re-casing',
      'Per-row copy-to-clipboard buttons with a temporary "Copied!" confirmation state',
      'Accepts messy mixed-format input (spaces, separators, and case changes combined) and still tokenizes correctly',
      'Single source-of-truth word array guarantees every output format stays mutually consistent',
      'Updates instantly on every keystroke, no submit button or format-selection dropdown required',
      'Entirely client-side text transformation, nothing sent to a server',
    ],
    useCases: [
      { icon: 'CODE', title: 'Renaming identifiers across a codebase\'s different layers', desc: 'Convert one concept name into the exact casing convention expected by a database column, a JS/TS variable, a React component, and a CSS class in a single pass.' },
      { icon: 'FLOW', title: 'Generating consistent API field or config key names', desc: 'Take a human-readable label and instantly get its snake_case (common in JSON APIs and Python) and camelCase (common in JavaScript) equivalents side by side.' },
      { icon: 'DESIGN', title: 'Building URL slugs from titles', desc: 'Convert an article or product title into kebab-case for a clean, readable URL slug without manually stripping spaces and punctuation.' },
      { icon: 'LEARN', title: 'Teaching naming convention differences across languages', desc: 'Show how the same identifier concept is written differently in Python (snake_case), JavaScript (camelCase), and constants (CONSTANT_CASE) side by side from one input.' },
      { icon: 'APP', title: 'Environment variable and constant naming', desc: 'Convert a config key into CONSTANT_CASE for an environment variable name while simultaneously seeing its camelCase equivalent for the corresponding code reference.' },
    ],
    faqs: [
      { q: 'How does the tool split camelCase input into separate words without a delimiter character?', a: 'It uses a regex that finds every position where a lowercase letter or digit is immediately followed by an uppercase letter — a case-transition boundary — and inserts a space there before any further processing. This correctly identifies word boundaries in input like quickBrownFox even though there\'s no space, underscore, or hyphen to split on directly.' },
      { q: 'What happens if I paste input that already contains mixed separators, like my_component-Name?', a: 'The tokenizer handles underscores, hyphens, and dots as word separators in addition to camelCase boundary detection, all in the same normalization pass, so mixed or messy input is broken into the same clean lowercase word list as cleanly-formatted input would be.' },
      { q: 'Why do all ten formats update simultaneously instead of picking one target format?', a: 'Every casing function operates on the same shared tokenized word array, so computing all ten is essentially free once tokenization happens once — showing them all at once means you never have to guess which format you\'ll need next, and can copy several different casings of the same identifier in quick succession.' },
      { q: 'What is the difference between snake_case and CONSTANT_CASE in this tool?', a: 'Both join words with underscores, but CONSTANT_CASE additionally uppercases the entire result — snake_case is conventional for variables and database columns in languages like Python and SQL, while CONSTANT_CASE (sometimes called SCREAMING_SNAKE_CASE) is the convention for constants and environment variable names.' },
      { q: 'Does this tool handle acronyms or consecutive capital letters correctly?', a: 'The camelCase-boundary regex only splits at a lowercase-to-uppercase transition, so a run of consecutive capital letters (like an acronym in the middle of an identifier) is not split apart from itself — it\'s treated as one word segment along with whichever letters immediately follow it until the next real boundary.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JavaScript to an AI assistant like Claude and ask it to walk through exactly how the tokenize() function's regex chain turns a messy mixed-format string into a clean word array — understanding that shared normalization step is the key to how all ten output formats stay consistent with each other. It's also easy to extend: ask for additional formats like Train-Case or path/case, an acronym-aware tokenizer that keeps runs of capital letters together as a single word, or a "detect input format" label that identifies which casing convention the pasted text already uses.`,
      prompt: `Build a text case converter in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A single text input, and a results area listing at least ten simultaneous case conversions: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case — all updating live on every keystroke.
- Implement one shared tokenizer function that normalizes any input format down to a plain array of lowercase words, and have every casing function build its output purely by re-joining that same word array differently — do not write ten independent, potentially inconsistent parsing implementations.
- The tokenizer must correctly split camelCase and PascalCase input into separate words using a regex that detects the transition from a lowercase letter (or digit) to an uppercase letter, in addition to splitting on underscores, hyphens, dots, and existing spaces.
- Handle messy mixed-format input (e.g. combining spaces, underscores, hyphens, and case changes in one string) and still produce a clean, correctly tokenized word list.
- Add a copy-to-clipboard button next to each individual output format, with a brief visual confirmation (like a "Copied!" label change) after clicking.`,
    },
  },
};

export default textCaseConverter;
