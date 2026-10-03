'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

/* ─── Themes ──────────────────────────────────────────────────────────────── */

const THEMES = {
  'One Dark': {
    bg: '#282c34', text: '#abb2bf', lineNum: '#4b5263', winBg: '#21252b',
    keyword: '#c678dd', string: '#98c379', number: '#d19a66',
    comment: '#5c6370', func: '#61afef', type: '#e5c07b', operator: '#56b6c2',
    tag: '#e06c75', attr: '#d19a66', punct: '#abb2bf',
  },
  'Dracula': {
    bg: '#282a36', text: '#f8f8f2', lineNum: '#6272a4', winBg: '#21222c',
    keyword: '#ff79c6', string: '#f1fa8c', number: '#bd93f9',
    comment: '#6272a4', func: '#50fa7b', type: '#ffb86c', operator: '#ff79c6',
    tag: '#ff5555', attr: '#ffb86c', punct: '#f8f8f2',
  },
  'GitHub Dark': {
    bg: '#0d1117', text: '#c9d1d9', lineNum: '#484f58', winBg: '#161b22',
    keyword: '#ff7b72', string: '#a5d6ff', number: '#79c0ff',
    comment: '#8b949e', func: '#d2a8ff', type: '#ffa657', operator: '#ff7b72',
    tag: '#7ee787', attr: '#79c0ff', punct: '#c9d1d9',
  },
  'Monokai': {
    bg: '#272822', text: '#f8f8f2', lineNum: '#75715e', winBg: '#1e1f1c',
    keyword: '#f92672', string: '#e6db74', number: '#ae81ff',
    comment: '#75715e', func: '#a6e22e', type: '#66d9e8', operator: '#f92672',
    tag: '#f92672', attr: '#a6e22e', punct: '#f8f8f2',
  },
  'Nord': {
    bg: '#2e3440', text: '#d8dee9', lineNum: '#4c566a', winBg: '#242932',
    keyword: '#81a1c1', string: '#a3be8c', number: '#b48ead',
    comment: '#4c566a', func: '#88c0d0', type: '#ebcb8b', operator: '#81a1c1',
    tag: '#bf616a', attr: '#d08770', punct: '#d8dee9',
  },
  'Tokyo Night': {
    bg: '#1a1b2e', text: '#a9b1d6', lineNum: '#3d4166', winBg: '#16161e',
    keyword: '#bb9af7', string: '#9ece6a', number: '#ff9e64',
    comment: '#565f89', func: '#7dcfff', type: '#e0af68', operator: '#89ddff',
    tag: '#f7768e', attr: '#ff9e64', punct: '#a9b1d6',
  },
  'GitHub Light': {
    bg: '#ffffff', text: '#24292f', lineNum: '#8c959f', winBg: '#f6f8fa',
    keyword: '#cf222e', string: '#0a3069', number: '#0550ae',
    comment: '#6e7781', func: '#8250df', type: '#953800', operator: '#cf222e',
    tag: '#116329', attr: '#0550ae', punct: '#24292f',
  },
  'Solarized Dark': {
    bg: '#002b36', text: '#839496', lineNum: '#586e75', winBg: '#073642',
    keyword: '#859900', string: '#2aa198', number: '#d33682',
    comment: '#586e75', func: '#268bd2', type: '#b58900', operator: '#859900',
    tag: '#dc322f', attr: '#268bd2', punct: '#839496',
  },
  'Night Owl': {
    bg: '#011627', text: '#d6deeb', lineNum: '#4b6479', winBg: '#010e1a',
    keyword: '#c792ea', string: '#ecc48d', number: '#f78c6c',
    comment: '#637777', func: '#82aaff', type: '#ffcb8b', operator: '#c792ea',
    tag: '#7fdbca', attr: '#addb67', punct: '#d6deeb',
  },
};

/* ─── Languages ───────────────────────────────────────────────────────────── */

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'JSON',
  'JSX', 'TSX', 'Bash', 'SQL', 'Java', 'C', 'C++', 'C#',
  'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'YAML', 'Markdown', 'Plain Text',
];

/* ─── Syntax tokenizer ────────────────────────────────────────────────────── */

function tokenize(code, lang) {
  if (lang === 'Plain Text') return [{ type: 'plain', value: code }];

  const tokens = [];
  let i = 0;

  const jsKeywords = /^(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|of|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|async|await|null|undefined|true|false|NaN|Infinity|type|interface|enum|implements|abstract|readonly|override|as|namespace|module|declare|keyof|infer|never|any|unknown|string|number|boolean|object|symbol|bigint|void)(?=\W)/,
    pyKeywords = /^(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)(?=\W)/,
    goKeywords = /^(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var|nil|true|false|make|new|len|cap|append|copy|close|delete|panic|recover|print|println|error)(?=\W)/,
    rustKeywords = /^(as|async|await|break|const|continue|crate|dyn|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|union|unsafe|use|where|while)(?=\W)/,
    rubyKeywords = /^(BEGIN|END|__ENCODING__|__FILE__|__LINE__|alias|and|begin|break|case|class|def|defined?|do|else|elsif|end|ensure|false|for|if|in|module|next|nil|not|or|redo|rescue|retry|return|self|super|then|true|undef|unless|until|when|while|yield)(?=\W)/,
    phpKeywords = /^(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|null|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|true|try|unset|use|var|while|xor|yield|false)(?=\W)/,
    sqlKeywords = /^(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|DATABASE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|DISTINCT|AS|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|EXISTS|UNION|ALL|WITH|CASE|WHEN|THEN|ELSE|END|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|UNIQUE|CONSTRAINT|AUTO_INCREMENT|IF|TRIGGER|VIEW|PROCEDURE|FUNCTION|RETURNS|BEGIN|DECLARE|CURSOR|COMMIT|ROLLBACK|TRANSACTION)(?=[\W\b])/i,
    bashKeywords = /^(if|then|else|elif|fi|for|do|done|while|until|case|esac|in|function|return|exit|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|sed|awk|export|source|alias|unset|set|read|shift|break|continue|local|declare|readonly|true|false|null)(?=[\W\b])/;

  const langKeywordRe = {
    JavaScript: jsKeywords, TypeScript: jsKeywords, JSX: jsKeywords, TSX: jsKeywords,
    Python: pyKeywords, Go: goKeywords, Rust: rustKeywords, Ruby: rubyKeywords,
    PHP: phpKeywords, SQL: sqlKeywords, Bash: bashKeywords,
    Java: /^(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|try|void|volatile|while|var|record|sealed|permits)(?=\W)/,
    C: /^(auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|NULL|true|false)(?=\W)/,
    'C++': /^(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|NULL)(?=\W)/,
    'C#': /^(abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|type|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|async|await|var|let|yield|get|set|value|add|remove|where|from|select|orderby|group|into|join|on|equals|by|ascending|descending|nameof|when|dynamic|partial|record|init|with|required|scoped|file)(?=\W)/,
    Swift: /^(associatedtype|class|deinit|enum|extension|fileprivate|func|import|init|inout|internal|let|open|operator|precedencegroup|private|protocol|public|rethrows|static|struct|subscript|typealias|var|break|case|continue|default|defer|do|else|fallthrough|for|guard|if|in|repeat|return|throw|switch|where|while|as|Any|catch|false|is|nil|rethrows|self|Self|super|throw|throws|true|try|Type|_|available|discardableResult|objc|nonobjc|NSManaged|dynamic|final|lazy|optional|required|weak|unowned|mutating|nonmutating|convenience|override|indirect|async|await)(?=\W)/,
    Kotlin: /^(abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|delegate|do|dynamic|else|enum|expect|external|false|field|file|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|it|lateinit|noinline|null|object|open|operator|out|override|package|param|private|property|protected|public|receiver|reified|return|sealed|set|setparam|super|suspend|tailrec|this|throw|true|try|typealias|typeof|val|var|vararg|when|where|while)(?=\W)/,
    PHP: phpKeywords,
  };

  const isHTML = ['HTML', 'JSX', 'TSX', 'Markdown'].includes(lang);
  const isCSS = lang === 'CSS';
  const isJSON = lang === 'JSON';
  const isYAML = lang === 'YAML';
  const isBash = lang === 'Bash';
  const isSQL = lang === 'SQL';
  const kwRe = langKeywordRe[lang];

  while (i < code.length) {
    const rest = code.slice(i);

    // Multi-line comment /* ... */
    if (!isHTML && !isYAML && rest.startsWith('/*')) {
      const end = code.indexOf('*/', i + 2);
      const val = end === -1 ? rest : code.slice(i, end + 2);
      tokens.push({ type: 'comment', value: val });
      i += val.length; continue;
    }

    // HTML/JSX tags
    if (isHTML && rest[0] === '<') {
      const end = rest.indexOf('>');
      if (end !== -1) {
        const tag = rest.slice(0, end + 1);
        // Tokenize tag internals: tag name, attrs, values
        const m = tag.match(/^(<\/?)([a-zA-Z][a-zA-Z0-9._-]*)([\s\S]*)?(\/?>)$/);
        if (m) {
          tokens.push({ type: 'punct', value: m[1] });
          tokens.push({ type: 'tag', value: m[2] });
          // attrs
          const attrStr = m[3] || '';
          let ai = 0;
          while (ai < attrStr.length) {
            const ar = attrStr.slice(ai);
            const am = ar.match(/^(\s+)/) || ar.match(/^([a-zA-Z_:][a-zA-Z0-9_.:-]*)/) ||
              ar.match(/^(=)/) || ar.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/) ||
              ar.match(/^(\{[\s\S]*?\})/);
            if (!am) { tokens.push({ type: 'plain', value: ar[0] }); ai++; continue; }
            const v = am[1];
            if (/^[a-zA-Z_:]/.test(v)) tokens.push({ type: 'attr', value: v });
            else if (v === '=') tokens.push({ type: 'punct', value: v });
            else if (/^["']/.test(v)) tokens.push({ type: 'string', value: v });
            else tokens.push({ type: 'plain', value: v });
            ai += v.length;
          }
          tokens.push({ type: 'punct', value: m[4] });
          i += tag.length; continue;
        }
      }
    }

    // Line comments
    const lineCommentPrefixes = isHTML ? ['<!--'] : ['#', '//', '--'];
    let foundComment = false;
    for (const prefix of lineCommentPrefixes) {
      if (rest.startsWith(prefix)) {
        const end = code.indexOf('\n', i);
        const val = end === -1 ? rest : code.slice(i, end);
        tokens.push({ type: 'comment', value: val });
        i += val.length; foundComment = true; break;
      }
    }
    if (foundComment) continue;

    // Strings
    if (['"', "'", '`'].includes(rest[0]) && !isJSON) {
      const q = rest[0];
      let j = 1;
      while (j < rest.length) {
        if (rest[j] === '\\') { j += 2; continue; }
        if (rest[j] === q) { j++; break; }
        j++;
      }
      tokens.push({ type: 'string', value: rest.slice(0, j) });
      i += j; continue;
    }

    // JSON strings
    if (isJSON && rest[0] === '"') {
      let j = 1;
      while (j < rest.length) {
        if (rest[j] === '\\') { j += 2; continue; }
        if (rest[j] === '"') { j++; break; }
        j++;
      }
      // Check if it's a key (followed by :)
      const after = rest.slice(j).trimStart();
      tokens.push({ type: after[0] === ':' ? 'attr' : 'string', value: rest.slice(0, j) });
      i += j; continue;
    }

    // YAML keys
    if (isYAML) {
      const m = rest.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)(\s*:)/);
      if (m) {
        tokens.push({ type: 'attr', value: m[1] });
        tokens.push({ type: 'punct', value: m[2] });
        i += m[1].length + m[2].length; continue;
      }
      const str = rest.match(/^(['"](?:[^'"\\]|\\.)*['"])/);
      if (str) { tokens.push({ type: 'string', value: str[1] }); i += str[1].length; continue; }
    }

    // CSS property: value
    if (isCSS) {
      const prop = rest.match(/^([a-z-]+)(\s*:)/i);
      if (prop) {
        tokens.push({ type: 'attr', value: prop[1] });
        tokens.push({ type: 'punct', value: prop[2] });
        i += prop[1].length + prop[2].length; continue;
      }
      const sel = rest.match(/^([.#@:][a-zA-Z0-9_-]+)/);
      if (sel) { tokens.push({ type: 'tag', value: sel[1] }); i += sel[1].length; continue; }
      const str = rest.match(/^(['"](?:[^'"\\]|\\.)*['"])/);
      if (str) { tokens.push({ type: 'string', value: str[1] }); i += str[1].length; continue; }
    }

    // Numbers
    const numM = rest.match(/^(0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:[eE][+-]?\d+)?)/);
    if (numM && !isYAML) {
      tokens.push({ type: 'number', value: numM[1] });
      i += numM[1].length; continue;
    }

    // Keywords
    if (kwRe) {
      const km = rest.match(kwRe);
      if (km) {
        tokens.push({ type: 'keyword', value: km[1] });
        i += km[1].length; continue;
      }
    }

    // Function calls: name(
    if (!isJSON && !isYAML && !isCSS && !isSQL) {
      const funcM = rest.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/);
      if (funcM) {
        tokens.push({ type: 'func', value: funcM[1] });
        i += funcM[1].length; continue;
      }
    }

    // Operators
    const opM = rest.match(/^([+\-*/%=!<>&|^~?:]+)/);
    if (opM && !isYAML && !isHTML) {
      tokens.push({ type: 'operator', value: opM[1] });
      i += opM[1].length; continue;
    }

    // Plain word / whitespace / punctuation
    const plainM = rest.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*|[\s]+|.)/);
    tokens.push({ type: 'plain', value: plainM ? plainM[1] : rest[0] });
    i += plainM ? plainM[1].length : 1;
  }

  return tokens;
}

/* ─── Highlighted code line ───────────────────────────────────────────────── */

function HighlightedLine({ tokens, theme }) {
  return (
    <span>
      {tokens.map((tok, i) => {
        const color = theme[tok.type] || theme.text;
        return <span key={i} style={{ color }}>{tok.value}</span>;
      })}
    </span>
  );
}

/* ─── Code window ─────────────────────────────────────────────────────────── */

const FONTS = ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Cascadia Code', 'Inconsolata', 'monospace'];

const WINDOW_STYLES = ['macOS', 'Windows', 'Terminal', 'None'];

const GRADIENTS = [
  { label: 'Midnight', value: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { label: 'Ocean', value: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' },
  { label: 'Sunset', value: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { label: 'Aurora', value: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { label: 'Rose', value: 'linear-gradient(135deg, #f4295b, #8b1a4a)' },
  { label: 'Dusk', value: 'linear-gradient(135deg, #4776e6, #8e54e9)' },
  { label: 'Forest', value: 'linear-gradient(135deg, #134e5e, #71b280)' },
  { label: 'Amber', value: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { label: 'Slate', value: 'linear-gradient(135deg, #1e293b, #334155)' },
  { label: 'Transparent', value: 'transparent' },
];

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function extractGradientColors(grad) {
  const hex = grad.match(/#[0-9a-fA-F]{3,6}/g) || [];
  return [hex[0] || '#1a1a2e', hex[hex.length - 1] || '#302b63'];
}

const DEFAULT_CODE = `function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("World");`;

function WindowChrome({ style, theme, title }) {
  if (style === 'None') return null;

  if (style === 'macOS') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: theme.winBg, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
      {title && <span style={{ flex: 1, textAlign: 'center', fontSize: 12, color: theme.lineNum, fontFamily: 'inherit', marginRight: 40 }}>{title}</span>}
    </div>
  );

  if (style === 'Windows') return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: theme.winBg, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ fontSize: 12, color: theme.lineNum, flex: 1, fontFamily: 'inherit' }}>{title || 'Code'}</span>
      <span style={{ fontSize: 13, color: theme.lineNum, marginLeft: 12, cursor: 'default' }}>—</span>
      <span style={{ fontSize: 13, color: theme.lineNum, marginLeft: 12, cursor: 'default' }}>□</span>
      <span style={{ fontSize: 13, color: '#f87171', marginLeft: 12, cursor: 'default' }}>✕</span>
    </div>
  );

  if (style === 'Terminal') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: theme.winBg, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ fontSize: 12, color: theme.lineNum, fontFamily: 'inherit' }}>$ {title || 'bash'}</span>
    </div>
  );

  return null;
}

const STORAGE_KEY = 'wdp-code-screenshot-v1';

const DEFAULTS = {
  code: DEFAULT_CODE, lang: 'JavaScript', themeName: 'One Dark',
  fontSize: 14, font: 'JetBrains Mono', windowStyle: 'macOS',
  showLineNums: true, padding: 32, bgValue: GRADIENTS[0].value,
  bgType: 'gradient', bgColor: '#1a1a2e', title: '', scale: 2, lineWrap: false,
};

/* ─── Main component ──────────────────────────────────────────────────────── */

export default function CodeScreenshotTool() {
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  const [code, setCode] = useState(DEFAULTS.code);
  const [lang, setLang] = useState(DEFAULTS.lang);
  const [themeName, setThemeName] = useState(DEFAULTS.themeName);
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [font, setFont] = useState(DEFAULTS.font);
  const [windowStyle, setWindowStyle] = useState(DEFAULTS.windowStyle);
  const [showLineNums, setShowLineNums] = useState(DEFAULTS.showLineNums);
  const [padding, setPadding] = useState(DEFAULTS.padding);
  const [bgValue, setBgValue] = useState(DEFAULTS.bgValue);
  const [bgType, setBgType] = useState(DEFAULTS.bgType);
  const [bgColor, setBgColor] = useState(DEFAULTS.bgColor);
  const [title, setTitle] = useState(DEFAULTS.title);
  const [scale, setScale] = useState(DEFAULTS.scale);
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [lineWrap, setLineWrap] = useState(DEFAULTS.lineWrap);
  const [saveState, setSaveState] = useState('idle');

  const theme = THEMES[themeName];
  const lines = code.split('\n');
  const bg = bgType === 'gradient' ? bgValue : bgColor;

  /* ── Restore from localStorage ────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.code        != null) setCode(s.code);
        if (s.lang)                setLang(s.lang);
        if (s.themeName)           setThemeName(s.themeName);
        if (s.fontSize)            setFontSize(s.fontSize);
        if (s.font)                setFont(s.font);
        if (s.windowStyle)         setWindowStyle(s.windowStyle);
        if (s.showLineNums != null) setShowLineNums(s.showLineNums);
        if (s.padding      != null) setPadding(s.padding);
        if (s.bgValue)             setBgValue(s.bgValue);
        if (s.bgType)              setBgType(s.bgType);
        if (s.bgColor)             setBgColor(s.bgColor);
        if (s.title        != null) setTitle(s.title);
        if (s.scale)               setScale(s.scale);
        if (s.lineWrap     != null) setLineWrap(s.lineWrap);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ───────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          code, lang, themeName, fontSize, font, windowStyle,
          showLineNums, padding, bgValue, bgType, bgColor, title, scale, lineWrap,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [code, lang, themeName, fontSize, font, windowStyle, showLineNums, padding, bgValue, bgType, bgColor, title, scale, lineWrap]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setCode(DEFAULTS.code);
    setLang(DEFAULTS.lang);
    setThemeName(DEFAULTS.themeName);
    setFontSize(DEFAULTS.fontSize);
    setFont(DEFAULTS.font);
    setWindowStyle(DEFAULTS.windowStyle);
    setShowLineNums(DEFAULTS.showLineNums);
    setPadding(DEFAULTS.padding);
    setBgValue(DEFAULTS.bgValue);
    setBgType(DEFAULTS.bgType);
    setBgColor(DEFAULTS.bgColor);
    setTitle(DEFAULTS.title);
    setScale(DEFAULTS.scale);
    setLineWrap(DEFAULTS.lineWrap);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  const captureCanvas = useCallback(() => {
    const dpr = scale;
    const codeFontSize = fontSize * dpr;
    const lineHeight = fontSize * 1.65 * dpr;
    const codePad = 20 * dpr;
    const outerPad = padding * dpr;
    const cardRadius = 10 * dpr;

    // Measure character width using offscreen canvas
    const measure = document.createElement('canvas').getContext('2d');
    measure.font = `${codeFontSize}px '${font}', monospace`;
    const charW = measure.measureText('M').width;

    // Line number column
    const lineNumDigits = showLineNums ? String(lines.length).length + 1 : 0;
    const lineNumW = showLineNums ? (lineNumDigits * charW + 20 * dpr) : 0;

    // Measure each line width
    const allTokens = lines.map(l => tokenize(l, lang));
    const maxLineW = allTokens.reduce((max, toks) => {
      const w = toks.reduce((s, t) => s + measure.measureText(t.value).width, 0);
      return Math.max(max, w);
    }, 0);

    // Chrome header height
    const chromeH = windowStyle === 'None' ? 0 : (windowStyle === 'macOS' ? 38 * dpr : 32 * dpr);

    // Card dimensions
    const cardW = Math.max(lineNumW + maxLineW + codePad * 2, 280 * dpr);
    const cardH = chromeH + codePad * 2 + lines.length * lineHeight;

    // Total canvas size
    const totalW = cardW + outerPad * 2;
    const totalH = cardH + outerPad * 2;

    const canvas = document.createElement('canvas');
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext('2d');

    // ── Draw outer background ──
    if (bg && bg !== 'transparent') {
      if (bg.startsWith('linear-gradient')) {
        const colors = extractGradientColors(bg);
        const grad = ctx.createLinearGradient(0, 0, totalW, totalH);
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(1, colors[1]);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = bg;
      }
      ctx.fillRect(0, 0, totalW, totalH);
    }

    // ── Draw card with rounded corners ──
    const cx = outerPad, cy = outerPad;
    ctx.save();
    roundRect(ctx, cx, cy, cardW, cardH, cardRadius);
    ctx.fillStyle = theme.bg;
    ctx.fill();
    // Drop shadow
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 30 * dpr;
    ctx.shadowOffsetY = 10 * dpr;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.restore();

    // Clip to card
    ctx.save();
    roundRect(ctx, cx, cy, cardW, cardH, cardRadius);
    ctx.clip();

    // ── Draw window chrome ──
    if (windowStyle !== 'None') {
      ctx.fillStyle = theme.winBg;
      ctx.fillRect(cx, cy, cardW, chromeH);
      // separator line
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(cx, cy + chromeH - dpr, cardW, dpr);

      if (windowStyle === 'macOS') {
        const dotY = cy + chromeH / 2;
        const dotR = 6 * dpr;
        const dotColors = ['#ff5f57', '#febc2e', '#28c840'];
        dotColors.forEach((c, i) => {
          ctx.beginPath();
          ctx.arc(cx + 14 * dpr + i * 20 * dpr, dotY, dotR, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.fill();
        });
        if (title) {
          ctx.fillStyle = theme.lineNum;
          ctx.font = `${12 * dpr}px '${font}', monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(title, cx + cardW / 2, dotY + 4 * dpr);
          ctx.textAlign = 'left';
        }
      } else if (windowStyle === 'Windows') {
        ctx.fillStyle = theme.lineNum;
        ctx.font = `${12 * dpr}px '${font}', monospace`;
        ctx.fillText(title || 'Code', cx + 12 * dpr, cy + chromeH / 2 + 4 * dpr);
        // close/min/max
        const icons = ['—', '□', '✕'];
        const iconColors = [theme.lineNum, theme.lineNum, '#f87171'];
        icons.forEach((ic, i) => {
          ctx.fillStyle = iconColors[i];
          ctx.fillText(ic, cx + cardW - (icons.length - i) * 22 * dpr, cy + chromeH / 2 + 4 * dpr);
        });
      } else if (windowStyle === 'Terminal') {
        ctx.fillStyle = theme.lineNum;
        ctx.font = `${12 * dpr}px '${font}', monospace`;
        ctx.fillText(`$ ${title || 'bash'}`, cx + 14 * dpr, cy + chromeH / 2 + 4 * dpr);
      }
    }

    // ── Draw code lines ──
    ctx.font = `${codeFontSize}px '${font}', monospace`;
    const codeStartY = cy + chromeH + codePad + lineHeight * 0.8;

    allTokens.forEach((tokens, idx) => {
      const y = codeStartY + idx * lineHeight;
      let x = cx + codePad;

      // Line number
      if (showLineNums) {
        ctx.fillStyle = theme.lineNum;
        ctx.textAlign = 'right';
        ctx.fillText(String(idx + 1), cx + codePad + lineNumW - 20 * dpr, y);
        ctx.textAlign = 'left';
        x = cx + codePad + lineNumW;
      }

      // Tokens
      tokens.forEach(tok => {
        ctx.fillStyle = theme[tok.type] || theme.text;
        ctx.fillText(tok.value, x, y);
        x += ctx.measureText(tok.value).width;
      });
    });

    ctx.restore();
    return canvas;
  }, [scale, bg, theme, font, fontSize, lines, lang, padding, windowStyle, title, showLineNums]);

  const downloadPng = useCallback(() => {
    setDownloading(true);
    try {
      const canvas = captureCanvas();
      if (!canvas) return;
      canvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'code-screenshot.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
        setDownloading(false);
      }, 'image/png');
    } catch (e) {
      console.error('Screenshot failed:', e);
      setDownloading(false);
    }
  }, [captureCanvas]);

  const copyImage = useCallback(() => {
    setCopying(true);
    try {
      const canvas = captureCanvas();
      if (!canvas) return;
      canvas.toBlob(async blob => {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        } catch { /* clipboard API not available */ }
        setTimeout(() => setCopying(false), 1500);
      }, 'image/png');
    } catch {
      setTimeout(() => setCopying(false), 1500);
    }
  }, [captureCanvas]);

  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="code-screenshot-generator" />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>📸</span></div>
          <span>Code Screenshot Generator</span>
        </div>
        <div className={styles.headerActions}>
          <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
            <span className={styles.saveDot} />
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
          </span>
          <button className={`${styles.actionBtn} ${styles.resetBtn}`} onClick={handleReset}>Reset</button>
          <button className={`${styles.actionBtn} ${styles.copyImageBtn} ${copying ? styles.ok : ''}`} onClick={copyImage}>
            {copying ? '✓ Copied!' : 'Copy Image'}
          </button>
          <button className={`${styles.actionBtn} ${styles.downloadBtn} ${downloading ? styles.loading : ''}`} onClick={downloadPng}>
            {downloading ? 'Generating…' : '↓ Download PNG'}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {/* ── Left panel: settings ── */}
        <div className={styles.sidebar}>

          {/* Language */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Language</label>
            <select className={styles.select} value={lang} onChange={e => setLang(e.target.value)}>
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          {/* Theme */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Theme</label>
            <div className={styles.themeGrid}>
              {Object.keys(THEMES).map(t => (
                <button
                  key={t}
                  className={`${styles.themeChip} ${themeName === t ? styles.themeActive : ''}`}
                  style={{ background: THEMES[t].bg, color: THEMES[t].text, borderColor: themeName === t ? '#06b6d4' : 'transparent' }}
                  onClick={() => setThemeName(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Window style */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Window Frame</label>
            <div className={styles.btnGroup}>
              {WINDOW_STYLES.map(s => (
                <button key={s} className={`${styles.segBtn} ${windowStyle === s ? styles.segActive : ''}`} onClick={() => setWindowStyle(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Background</label>
            <div className={styles.btnGroup} style={{ marginBottom: 8 }}>
              <button className={`${styles.segBtn} ${bgType === 'gradient' ? styles.segActive : ''}`} onClick={() => setBgType('gradient')}>Gradient</button>
              <button className={`${styles.segBtn} ${bgType === 'solid' ? styles.segActive : ''}`} onClick={() => setBgType('solid')}>Solid</button>
            </div>
            {bgType === 'gradient' ? (
              <div className={styles.gradientGrid}>
                {GRADIENTS.map(g => (
                  <button
                    key={g.label}
                    title={g.label}
                    className={`${styles.gradientChip} ${bgValue === g.value ? styles.gradientActive : ''}`}
                    style={{ background: g.value === 'transparent' ? 'repeating-conic-gradient(#888 0% 25%, #555 0% 50%) 0 0 / 12px 12px' : g.value }}
                    onClick={() => setBgValue(g.value)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.colorRow}>
                <input type="color" className={styles.colorInput} value={bgColor} onChange={e => setBgColor(e.target.value)} />
                <span className={styles.colorVal}>{bgColor}</span>
              </div>
            )}
          </div>

          {/* Font */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Font</label>
            <select className={styles.select} value={font} onChange={e => setFont(e.target.value)}>
              {FONTS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Font size */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Font Size — {fontSize}px</label>
            <input type="range" min={10} max={22} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className={styles.range} />
          </div>

          {/* Padding */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Padding — {padding}px</label>
            <input type="range" min={8} max={80} value={padding} onChange={e => setPadding(Number(e.target.value))} className={styles.range} />
          </div>

          {/* Export scale */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Export Scale</label>
            <div className={styles.btnGroup}>
              {[1, 2, 3].map(s => (
                <button key={s} className={`${styles.segBtn} ${scale === s ? styles.segActive : ''}`} onClick={() => setScale(s)}>{s}×</button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className={styles.toggleRow}>
            <label className={styles.toggle}>
              <input type="checkbox" checked={showLineNums} onChange={e => setShowLineNums(e.target.checked)} />
              <span>Line numbers</span>
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" checked={lineWrap} onChange={e => setLineWrap(e.target.checked)} />
              <span>Line wrap</span>
            </label>
          </div>

          {/* Title */}
          <div className={styles.group}>
            <label className={styles.groupLabel}>Title (optional)</label>
            <input
              className={styles.titleInput}
              placeholder="e.g. index.js"
              value={title}
              onChange={e => setTitle(e.target.value)}
              spellCheck={false}
            />
          </div>

        </div>

        {/* ── Right panel: editor + preview ── */}
        <div className={styles.main}>
          <div className={styles.editorWrap}>
            <div className={styles.editorLabel}>Code Input</div>
            <textarea
              className={styles.codeInput}
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              placeholder="Paste your code here…"
              rows={14}
            />
          </div>

          {/* Preview */}
          <div className={styles.previewLabel}>Preview</div>
          <div className={styles.previewOuter} style={{ background: bgType === 'gradient' ? bgValue : bgColor }}>
            <div style={{ padding, display: 'inline-block', width: '100%', boxSizing: 'border-box' }}>
              <div
                style={{
                  background: theme.bg,
                  borderRadius: 10,
                  overflow: 'hidden',
                  fontFamily: `'${font}', monospace`,
                  fontSize,
                  lineHeight: 1.65,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  minWidth: 300,
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                <WindowChrome style={windowStyle} theme={theme} title={title} />
                <div style={{ padding: '16px 20px', overflowX: lineWrap ? 'visible' : 'auto' }}>
                  {lines.map((line, idx) => {
                    const tokens = tokenize(line, lang);
                    return (
                      <div key={idx} style={{ display: 'flex', whiteSpace: lineWrap ? 'pre-wrap' : 'pre', minHeight: '1.65em' }}>
                        {showLineNums && (
                          <span style={{ color: theme.lineNum, userSelect: 'none', minWidth: `${String(lines.length).length + 1}ch`, marginRight: 20, textAlign: 'right', flexShrink: 0 }}>
                            {idx + 1}
                          </span>
                        )}
                        <HighlightedLine tokens={tokens} theme={theme} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
