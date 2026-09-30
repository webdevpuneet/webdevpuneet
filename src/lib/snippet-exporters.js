// ────────────────────────────────────────────────────────────────────────────
// Canonical UI-snippet export converters.
//
// SINGLE SOURCE OF TRUTH for converting a snippet's { html, css, js } into
// React, React + Tailwind, Tailwind HTML, Vue 3 SFC, and Angular component code.
//
// Imported by:
//   • src/components/UiSnippetsTool/index.js   (toolbar download buttons)
//   • src/components/UiSnippetsTool/ExportTester.js (dev "Test Exports" lightbox)
//   • src/app/ui-snippets/[slug]/page.js        (on-page framework code tabs)
//
// Keep ALL export logic here so the three surfaces never drift apart.
// ────────────────────────────────────────────────────────────────────────────

import { convert } from '@/lib/css-to-tailwind';

/** PascalCase component name from a snippet title/id. */
export function componentName(sn) {
  const name = (sn.title || sn.id || 'Component')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  // A component name must be a valid JS identifier — prefix if it starts with a digit.
  return /^[0-9]/.test(name) ? 'Snippet' + name : (name || 'Component');
}

/** kebab-case Angular selector (app-…) from a PascalCase name. */
export function angularSelector(name) {
  return 'app-' + name.replace(/([A-Z])/g, (m, c, i) => (i > 0 ? '-' : '') + c.toLowerCase()).replace(/^-/, '');
}

// In an inline handler, `this` is the element — map it to event.currentTarget for React.
function reactHandlerExpr(expr) {
  return expr.replace(/\bthis\b/g, 'event.currentTarget');
}

// Self-close void elements for JSX. Runs on RAW HTML (before handler conversion)
// so the regex never meets a `>` from a converted arrow handler (`onInput={(e) => …}`),
// which would otherwise truncate the match and emit `= />`. Tolerates already
// self-closed source so we never produce an invalid `/ />`.
function selfCloseVoids(markup) {
  return markup.replace(/<(input|img|br|hr|meta|link|source|area|col|embed|track|wbr)\b([^>]*?)\s*\/?>/g,
    (_, tag, attrs = '') => `<${tag}${attrs} />`);
}

// Fix boolean attributes that React turns into *controlled* props, which breaks
// the imperative escape-hatch model. Runs on RAW HTML (before handler conversion)
// so tag matching never trips over the `>` inside a converted `=>` arrow.
//   • bare `checked`  → `defaultChecked` (uncontrolled — the user/JS can still toggle;
//     a controlled `checked` with no React onChange is read-only).
//   • bare `disabled` → `defaultDisabled` when the snippet's JS imperatively toggles it.
//     This lets JS update the DOM property while React doesn't interfere with controlled props.
function fixReactBooleanAttrs(html, sn) {
  let out = html.replace(
    /<(input|select|option|textarea)\b([^>]*?)\schecked\b(?!\s*=)([^>]*?)>/gi,
    (_, tag, pre, post) => `<${tag}${pre} defaultChecked${post}>`,
  );
  // Convert disabled to defaultDisabled so JS can still imperatively toggle it
  // without React treating it as a controlled prop
  if (sn.js && /\.disabled\s*=/.test(sn.js)) {
    out = out.replace(
      /<([a-zA-Z][\w-]*)\b([^>]*?)\sdisabled\b(?!\s*=)([^>]*?)>/g,
      (_, tag, pre, post) => `<${tag}${pre} defaultDisabled${post}>`,
    );
  }
  return out;
}

// Convert inline on* attributes into React synthetic-event props.
// Every handler receives `event`, so inline code referencing `event`/`this` keeps working.
export function convertInlineHandlers(markup) {
  const map = {
    onclick: 'onClick', ondblclick: 'onDoubleClick',
    onchange: 'onChange', oninput: 'onInput', onsubmit: 'onSubmit',
    onkeydown: 'onKeyDown', onkeyup: 'onKeyUp', onkeypress: 'onKeyPress',
    onmouseover: 'onMouseOver', onmouseout: 'onMouseOut', onmousemove: 'onMouseMove',
    onmousedown: 'onMouseDown', onmouseup: 'onMouseUp', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave',
    onfocus: 'onFocus', onblur: 'onBlur', onscroll: 'onScroll', oninvalid: 'onInvalid',
    ondragover: 'onDragOver', ondragleave: 'onDragLeave', ondrop: 'onDrop',
    ondragenter: 'onDragEnter', ondragend: 'onDragEnd', ondragstart: 'onDragStart', ondrag: 'onDrag',
    ontouchstart: 'onTouchStart', ontouchmove: 'onTouchMove', ontouchend: 'onTouchEnd',
  };
  let out = markup;
  for (const [dom, react] of Object.entries(map)) {
    const re = new RegExp(`\\b${dom}="([^"]+)"`, 'g');
    out = out.replace(re, (_, fn) => {
      const body = react === 'onSubmit'
        ? `event.preventDefault(); ${reactHandlerExpr(fn)}`
        : reactHandlerExpr(fn);
      return `${react}={(event) => { ${body} }}`;
    });
  }
  return out;
}

// JS keywords that can appear as `keyword(` in an inline handler (e.g. `if(...)`)
// but must never be treated as a callable function name to expose.
const JS_KEYWORDS = new Set([
  'if', 'for', 'while', 'switch', 'return', 'function', 'var', 'let', 'const', 'new',
  'typeof', 'void', 'delete', 'in', 'of', 'do', 'else', 'case', 'break', 'continue',
  'this', 'true', 'false', 'null', 'undefined', 'catch', 'try', 'throw', 'class',
  'await', 'async', 'instanceof', 'yield', 'super',
]);

// Collect the function names called from inline handlers so we can expose them to
// the global scope (the converted JSX handlers call them as bare identifiers).
function collectHandlerNames(markup) {
  const names = new Set();
  const re = /\bon\w+="([^"]+)"/g;
  let m;
  while ((m = re.exec(markup)) !== null) {
    const calls = m[1].match(/([A-Za-z_$][\w$]*)\s*\(/g) || [];
    for (const c of calls) {
      const name = c.replace(/\s*\($/, '');
      if (!JS_KEYWORDS.has(name)) names.add(name);
    }
  }
  return [...names];
}

// Build a useEffect hook that runs the snippet's vanilla JS once after mount and
// exposes inline-handler functions so the JSX events resolve them.
function buildEffectHook(sn) {
  if (!sn.js) return '';
  // Scan BOTH the static HTML and the JS: snippets that inject markup at runtime
  // (e.g. innerHTML = '<button onclick="select(this)">…') reference handlers that
  // never appear in the static HTML, so they must also be exposed to window.
  const handlerNames = collectHandlerNames(`${sn.html}\n${sn.js}`);
  const expose = handlerNames.length
    ? `\n\n    // Expose handlers used by inline JSX events to the global scope\n` +
      handlerNames.map(n => `    if (typeof ${n} === 'function') window.${n} = ${n};`).join('\n')
    : '';

  // Wrap the JS to collect all event listeners so they can be cleaned up.
  // This prevents memory leaks and duplicate handlers on re-renders.
  const wrappedJs = `    const _listeners = [];
    const _originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      _listeners.push({ target: this, type, listener, options });
      return _originalAddEventListener.call(this, type, listener, options);
    };
${sn.js.split('\n').map(l => '    ' + l).join('\n')}
    // Cleanup: restore addEventListener and remove all listeners
    return () => {
      EventTarget.prototype.addEventListener = _originalAddEventListener;
      for (const { target, type, listener, options } of _listeners) {
        target.removeEventListener(type, listener, options);
      }
    };`;

  return `  // Auto-generated escape hatch: the original snippet's vanilla JS runs once
  // after mount and queries the rendered DOM. For idiomatic React, lift this
  // into state + handlers.
  useEffect(() => {
${wrappedJs}${expose}
  }, []);\n\n`;
}

// ── Vanilla-JS analysis (for Vue / Angular conversion) ──────────────────────
// These snippets are imperative DOM scripts: top-level `document.getElementById`
// refs + function declarations + inline on* handlers. To turn them into a
// component we must (a) keep functions & plain data at component scope so the
// template/JSX can call them, and (b) defer the DOM queries until after mount
// (the elements don't exist during setup).

// Split source into top-level statements (string/comment/template-literal aware).
function splitTopLevel(src) {
  const out = [];
  let i = 0, depth = 0, start = 0;
  const cut = (end) => { const s = src.slice(start, end).trim(); if (s) out.push(s); start = end; };
  while (i < src.length) {
    const c = src[i], n = src[i + 1];
    if (c === '/' && n === '/') { const e = src.indexOf('\n', i); i = e < 0 ? src.length : e; continue; }
    if (c === '/' && n === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 2; continue; }
    if (c === "'" || c === '"') { i++; while (i < src.length && src[i] !== c) { if (src[i] === '\\') i++; i++; } i++; continue; }
    if (c === '`') {                       // template literal — skip incl. ${…} (one level)
      i++; let td = 0;
      while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue; }
        if (td === 0 && src[i] === '`') { i++; break; }
        if (src[i] === '$' && src[i + 1] === '{') { td++; i += 2; continue; }
        if (td > 0 && src[i] === '}') { td--; i++; continue; }
        i++;
      }
      continue;
    }
    if (c === '{' || c === '(' || c === '[') { depth++; i++; continue; }
    if (c === '}' || c === ')' || c === ']') {
      depth--; i++;
      if (depth === 0 && c === '}') {       // end of a top-level block body (function/class)
        // Strip any leading comments/whitespace a prior `;`-cut left attached.
        const buf = src.slice(start, i).replace(/^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*/, '');
        if (/^(?:export\s+)?(?:async\s+)?function\b/.test(buf) || /^class\b/.test(buf)) cut(i);
      }
      continue;
    }
    if (c === ';' && depth === 0) { cut(i + 1); i++; continue; }
    i++;
  }
  cut(src.length);
  return out;
}

// A top-level `var a = ..., b = ...;` with more than one declarator — crude but
// effective: a comma followed by another `name =` before the statement ends.
// We deliberately leave these alone (hoist verbatim) rather than risk mis-splitting
// one declarator out and silently dropping the rest.
function isMultiDeclarator(core) {
  return /,\s*[A-Za-z_$][\w$]*\s*=/.test(core);
}

// Classify each top-level statement into hoisted declarations vs. mount-time code.
function analyzeVanillaJs(js) {
  const hoist = [];   // functions + data — live at component scope, reachable by template
  const mount = [];   // DOM queries + side-effects — run after the view exists
  const funcNames = [];
  // Names whose value only exists after mount (DOM query results, and anything
  // computed from one) — referencing one of these in an initializer means that
  // initializer must run in onMounted too, not immediately at setup time.
  const deferredVars = new Set();
  let m;
  for (const st of splitTopLevel(js)) {
    // Classify on the statement minus any leading comments, but keep the comment
    // in the emitted output (`st`) so it stays with its declaration.
    const core = st.replace(/^(?:\s*\/\/[^\n]*\n|\s*\/\*[\s\S]*?\*\/)*\s*/, '');
    if ((m = core.match(/^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/))) {
      hoist.push(st); funcNames.push(m[1]); continue;
    }
    // single-declarator DOM query → hoist a bare `let`, assign it after mount
    if ((m = core.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(document\.(?:getElementById|querySelector|querySelectorAll)\([\s\S]*)$/))) {
      hoist.push(`let ${m[1]};`);
      mount.push(`${m[1]} = ${m[2].replace(/;?\s*$/, ';')}`);
      deferredVars.add(m[1]);
      continue;
    }
    // single-declarator whose initializer transitively depends on a deferred
    // var or a locally-defined function (which may itself touch the DOM) —
    // e.g. `var total = tasks.length;` or `var bots = NAMES.map(p => ({ el:
    // makeCursor(p) }))`. Defer the assignment to mount too, in the same
    // relative order, so it runs after whatever it depends on actually exists
    // instead of throwing "Cannot read properties of undefined" at setup time.
    if (!isMultiDeclarator(core) &&
        (m = core.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*([\s\S]*)$/))) {
      const [, name, rhs] = m;
      // ScrollTrigger (and any `scrollTrigger: {...}` config) resolves its `trigger`
      // against the live DOM via a CSS-selector string the variable-name heuristic
      // below can't see — e.g. `gsap.timeline({ scrollTrigger: { trigger: '#stage' } })`
      // doesn't mention any deferred var, so without this check it gets hoisted into
      // setup() and runs before the template is mounted, silently failing to find
      // its trigger element (breaking pin/scrub).
      const usesScrollTrigger = /\bScrollTrigger\b|\bscrollTrigger\s*:/.test(rhs);
      // Same problem for gsap.quickTo/to/from/fromTo/set called directly on a
      // CSS-selector string, e.g. `var dotX = gsap.quickTo('#dot', 'x', {...})` —
      // GSAP resolves '#dot' against the live DOM the instant the call runs, so
      // hoisting it into setup() silently no-ops (the element doesn't exist yet)
      // and the animation never fires. Deferring to mount fixes it the same way.
      const usesSelectorGsapCall = /\bgsap\.(?:quickTo|to|from|fromTo|set)\s*\(\s*['"`]/.test(rhs);
      // gsap.utils.toArray('.selector') is the same DOM-resolves-now problem —
      // e.g. `var cards = gsap.utils.toArray('.skew')` hoisted into setup()
      // resolves against an empty document and captures an empty array forever.
      const usesToArraySelector = /\bgsap\.utils\.toArray\s*\(\s*['"`]/.test(rhs);
      const dependsOnDeferred = usesScrollTrigger
        || usesSelectorGsapCall
        || usesToArraySelector
        || [...deferredVars].some(v => new RegExp(`\\b${v}\\b`).test(rhs))
        || funcNames.some(fn => new RegExp(`\\b${fn}\\b`).test(rhs));
      if (dependsOnDeferred) {
        hoist.push(`let ${name};`);
        mount.push(`${name} = ${rhs.replace(/;?\s*$/, ';')}`);
        deferredVars.add(name);
        continue;
      }
    }
    // any other declaration (state, data arrays, etc.) — keep in scope
    if (/^(?:const|let|var)\s+[A-Za-z_$]/.test(core)) { hoist.push(st); continue; }
    // bare expression / side-effect (addEventListener, init calls…) — defer to mount
    mount.push(st);
  }
  return { hoist, mount, funcNames };
}

// Convert inline on* handler attributes to a framework's event-binding syntax.
// `this` (the element) → $event.currentTarget; `event` → $event.
function convertTemplateHandlers(html, syntax /* 'vue' | 'angular' */) {
  const events = ['click', 'dblclick', 'change', 'input', 'submit', 'keydown', 'keyup', 'keypress',
    'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'focus', 'blur', 'scroll'];
  let out = html;
  for (const ev of events) {
    const re = new RegExp(`\\bon${ev}="([^"]+)"`, 'g');
    out = out.replace(re, (_, expr) => {
      // Single pass so `event` inside the `this`→$event.currentTarget result isn't re-matched.
      const val = expr.replace(/\b(this|event)\b/g, (m) => (m === 'this' ? '$event.currentTarget' : '$event'));
      if (syntax === 'vue') return ev === 'submit' ? `@submit.prevent="${val}"` : `@${ev}="${val}"`;
      // angular
      return ev === 'submit' ? `(submit)="$event.preventDefault(); ${val}"` : `(${ev})="${val}"`;
    });
  }
  return out;
}

// Inline style="a: b; c: d" → style={{ a: 'b', c: 'd' }}
function styleStrToObj(styleStr) {
  const entries = styleStr.split(';').map(s => s.trim()).filter(Boolean);
  const pairs = entries.map(e => {
    const colon = e.indexOf(':');
    const rawProp = e.slice(0, colon).trim();
    // CSS custom properties (--foo) stay literal & quoted; React reads them as-is.
    const prop = rawProp.startsWith('--')
      ? `'${rawProp}'`
      : rawProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const val  = e.slice(colon + 1).trim().replace(/'/g, "\\'");
    return `${prop}: '${val}'`;
  });
  return `{{ ${pairs.join(', ')} }}`;
}

// ── CDN library helpers ─────────────────────────────────────────────────────
// A snippet may load external libraries (GSAP, Alpine, etc.) added through the
// tool's CDN panel — stored on sn.cdnUrls. These must be emitted in every export
// or the snippet's JS throws "X is not defined".

// <link>/<script> tags for a standalone HTML document, indented `indent` spaces.
export function cdnTagsHtml(cdnUrls = [], indent = '  ') {
  return (cdnUrls || [])
    .map(u => (u || '').trim())
    .filter(Boolean)
    .map(u => /\.css(\?.*)?$/.test(u)
      ? `${indent}<link rel="stylesheet" href="${u}" />`
      : `${indent}<script src="${u}"><\/script>`)
    .join('\n');
}

// A header comment listing CDN deps for framework component files (you can't
// inline a CDN <script> into a .jsx/.vue/.ts component — add them to the host
// page or install the npm equivalents).
function cdnComment(cdnUrls = []) {
  const urls = (cdnUrls || []).map(u => (u || '').trim()).filter(Boolean);
  if (!urls.length) return '';
  return `// External libraries loaded via CDN in the original snippet. Add these to your\n` +
    `// host HTML (e.g. public/index.html) or install the npm equivalents:\n` +
    urls.map(u => `//   ${u}`).join('\n') + `\n\n`;
}

// HTML-comment variant for Vue SFCs (a `//` comment before <template> is invalid).
function cdnCommentHtml(cdnUrls = []) {
  const urls = (cdnUrls || []).map(u => (u || '').trim()).filter(Boolean);
  if (!urls.length) return '';
  return `<!-- External libraries loaded via CDN in the original snippet. Add these to\n` +
    `     your host page or install the npm equivalents:\n` +
    urls.map(u => `       ${u}`).join('\n') + ` -->\n\n`;
}

// ── Standalone HTML file (plain HTML/CSS/JS) ────────────────────────────────
export function toHtmlFile(sn) {
  const cssBlock = `  <style>\n${sn.css.split('\n').map(l => '    ' + l).join('\n')}\n  </style>`;
  const jsBlock  = sn.js ? `\n  <script>\n${sn.js.split('\n').map(l => '    ' + l).join('\n')}\n  <\/script>` : '';
  const body     = sn.html.split('\n').map(l => '  ' + l).join('\n');
  const cdn      = cdnTagsHtml(sn.cdnUrls);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${sn.title || sn.id}</title>
${cdn ? cdn + '\n' : ''}${cssBlock}
</head>
<body>
${body}${jsBlock}
</body>
</html>`;
}

// ── React (plain CSS) ───────────────────────────────────────────────────────
export function toReactComponent(sn) {
  const name = componentName(sn);

  const jsx = convertInlineHandlers(selfCloseVoids(fixReactBooleanAttrs(sn.html, sn)))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfor=/g, 'htmlFor=')
    .replace(/\bstyle="([^"]*)"/g, (_, s) => `style=${styleStrToObj(s)}`)
    .replace(/\btext-anchor=/g, 'textAnchor=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
    .replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/\bfill-opacity=/g, 'fillOpacity=')
    .replace(/\bclip-path=/g, 'clipPath=');

  const jsBlock = buildEffectHook(sn);

  return `${cdnComment(sn.cdnUrls)}import React${sn.js ? ', { useEffect }' : ''} from 'react';

// CSS — optionally move to ${name}.module.css
const css = \`
${sn.css}
\`;

export default function ${name}() {
${jsBlock}  return (
    <>
      <style>{css}</style>
${jsx.split('\n').map(l => '      ' + l).join('\n')}
    </>
  );
}`;
}

// Collect class names that JavaScript injects via generated HTML strings
// (e.g. element.innerHTML = '<button class="option">…'). The Tailwind exporters
// only rewrite the static markup the converter parses, so these classes must
// keep their ORIGINAL CSS (emitted as a residual <style> block) — otherwise the
// dynamically-created elements render unstyled.
function collectJsHtmlClasses(js, knownClasses) {
  const set = new Set();
  if (!js) return set;
  // (a) classes inside generated HTML strings:  el.innerHTML = '…class="x y"…'
  // (b) full className (re)assignments — these OVERWRITE the element's class list,
  //     wiping any Tailwind utilities the converter placed on it:  el.className = 'x y'
  // (c) setAttribute('class', '…') — same overwrite hazard.
  // Any class touched this way must keep its ORIGINAL CSS (residual <style>) rather
  // than be converted to utilities, or the styling vanishes at runtime.
  const patterns = [
    /class\s*=\s*["']([^"']+)["']/g,
    /\.className\s*\+?=\s*["']([^"']+)["']/g,
    /setAttribute\(\s*["']class["']\s*,\s*["']([^"']+)["']/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(js)) !== null) {
      m[1].trim().split(/\s+/).forEach(c => { if (c) set.add(c); });
    }
  }
  // (d) a class assigned to a variable, then concatenated into a class string,
  //     e.g. `var cls = up ? 'ck-up' : 'ck-down'; '<rect class="ck-body ' + cls + '"'`.
  // The patterns above can't see through the variable, so any known CSS class
  // name that appears as a standalone quoted string literal anywhere in the JS
  // is treated as JS-generated too — a safe over-approximation, since the worst
  // case is keeping a class's original CSS instead of converting it to a utility.
  if (knownClasses && knownClasses.size) {
    const litRe = /["']([a-zA-Z_-][a-zA-Z0-9_-]*)["']/g;
    let lm;
    while ((lm = litRe.exec(js)) !== null) {
      if (knownClasses.has(lm[1])) set.add(lm[1]);
    }
  }
  return set;
}

// Extract every class name referenced anywhere in a CSS selector list, so JS
// source can be checked for those names appearing as dynamic string literals.
function collectCssClassNames(css) {
  const set = new Set();
  if (!css) return set;
  const re = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
  let m;
  while ((m = re.exec(css)) !== null) set.add(m[1]);
  return set;
}

// ── React + Tailwind ────────────────────────────────────────────────────────
export function toTailwindComponent(sn) {
  const name = componentName(sn);

  const { rules } = convert(sn.css);
  const classMap = {};
  const preservedClasses = new Set();
  const residualSelectors = new Set();
  const jsGeneratedClasses = collectJsHtmlClasses(sn.js, collectCssClassNames(sn.css));

  for (const rule of rules) {
    if (!rule.selector || !rule.classes.length) continue;
    let sel = rule.selector;
    let mediaPrefix = '';
    let cleanSel = sel;

    if (sel.includes('@media')) {
      const inner = sel.match(/→\s*(.+)$/);
      if (inner) cleanSel = inner[1].trim();
      const mxM = sel.match(/max-width:\s*(\d+)px/);
      const mnM = sel.match(/min-width:\s*(\d+)px/);
      if (mxM) { mediaPrefix = `max-[${mxM[1]}px]:`; }
      else if (mnM) { const bp = parseInt(mnM[1]); mediaPrefix = bp < 640 ? '' : bp < 768 ? 'sm:' : bp < 1024 ? 'md:' : 'lg:'; }
    }

    let pseudoPrefix = '';
    if (cleanSel.includes(':hover'))       { pseudoPrefix = 'hover:';  cleanSel = cleanSel.replace(/:hover/g,  ''); }
    else if (cleanSel.includes(':focus'))  { pseudoPrefix = 'focus:';  cleanSel = cleanSel.replace(/:focus/g,  ''); }
    else if (cleanSel.includes(':active')) { pseudoPrefix = 'active:'; cleanSel = cleanSel.replace(/:active/g, ''); }

    const isSingleClass = /^\.[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(cleanSel.trim());
    const singleCn = isSingleClass ? cleanSel.trim().slice(1) : null;
    // A single-class rule whose class is injected by JS-generated HTML can't be
    // Tailwind-converted — the converter only rewrites the static markup, so the
    // dynamically-created element would lose this styling. Keep its original CSS
    // as residual and preserve the literal class name instead.
    if (!isSingleClass || jsGeneratedClasses.has(singleCn)) {
      const dotClasses = cleanSel.match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g) || [];
      for (const dc of dotClasses) preservedClasses.add(dc.slice(1));
      residualSelectors.add(rule.selector);
      continue;
    }

    const vp = mediaPrefix + pseudoPrefix;
    const cn = singleCn;
    if (!classMap[cn]) classMap[cn] = [];
    classMap[cn].push(...rule.classes.map(c => vp ? `${vp}${c}` : c));
  }
  Object.keys(classMap).forEach(k => { classMap[k] = [...new Set(classMap[k])]; });

  if (sn.js) {
    // closest()/matches() also take CSS selectors — classes used there (e.g.
    // e.target.closest('.ftc-add')) must be preserved too, or event delegation
    // breaks after those classes are converted to Tailwind utilities and stripped.
    const qsRe = /(?:querySelector(?:All)?|closest|matches)\(\s*['"`]([^'"`]*)['"`]/g;
    let m;
    while ((m = qsRe.exec(sn.js)) !== null) {
      const classes = m[1].match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g) || [];
      for (const c of classes) preservedClasses.add(c.slice(1));
    }
    const clRe = /classList\.(?:add|remove|toggle|contains|replace)\(\s*['"`]([a-zA-Z_-][a-zA-Z0-9_-]*)['"`]/g;
    while ((m = clRe.exec(sn.js)) !== null) preservedClasses.add(m[1]);
  }

  const jsx = convertInlineHandlers(selfCloseVoids(fixReactBooleanAttrs(sn.html, sn)))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\bclass="([^"]*)"/g, (_, classStr) => {
      const tokens = classStr.trim().split(/\s+/).filter(Boolean);
      const result = [];
      const seen = new Set();
      for (const t of tokens) {
        if (preservedClasses.has(t) && !seen.has(t)) { result.push(t); seen.add(t); }
        const tw = classMap[t];
        if (tw) {
          for (const c of tw) { if (!seen.has(c)) { result.push(c); seen.add(c); } }
        } else if (!preservedClasses.has(t) && !seen.has(t)) {
          result.push(t); seen.add(t);
        }
      }
      return `className="${result.join(' ')}"`;
    })
    .replace(/\bfor=/g, 'htmlFor=')
    .replace(/\bstyle="([^"]*)"/g, (_, s) => `style=${styleStrToObj(s)}`)
    .replace(/\btext-anchor=/g, 'textAnchor=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
    .replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/\bfill-opacity=/g, 'fillOpacity=')
    .replace(/\bclip-path=/g, 'clipPath=');

  // Strip CSS comments first: a comment immediately before a residual rule
  // (e.g. a pseudo-element connector) would otherwise glue onto the selector
  // and fail the residualSelectors match, silently dropping the rule.
  const cssNoComments = sn.css.replace(/\/\*[\s\S]*?\*\//g, '');
  const residualCssBlocks = [];
  const kfRe2 = /@keyframes\s+\S+\s*\{/g;
  let kfM2;
  while ((kfM2 = kfRe2.exec(cssNoComments)) !== null) {
    let depth = 0, i = kfM2.index;
    for (; i < cssNoComments.length; i++) {
      if (cssNoComments[i] === '{') depth++;
      else if (cssNoComments[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    residualCssBlocks.push(cssNoComments.slice(kfM2.index, i).trim());
  }
  if (residualSelectors.size) {
    const ruleRe2 = /([^{}]+)\{([^{}]*)\}/g;
    let rm;
    while ((rm = ruleRe2.exec(cssNoComments)) !== null) {
      const rawSel = rm[1].trim();
      if (residualSelectors.has(rawSel)) residualCssBlocks.push(`${rawSel} {\n  ${rm[2].trim()}\n}`);
    }
  }
  const styleTag = residualCssBlocks.length
    ? `\n      <style>{\`\n${residualCssBlocks.join('\n\n')}\n      \`}</style>`
    : '';

  const jsBlock = buildEffectHook(sn);

  return `${cdnComment(sn.cdnUrls)}import React${sn.js ? ', { useEffect }' : ''} from 'react';
// Requires Tailwind CSS v3+ — https://tailwindcss.com/docs/installation
// Arbitrary value classes (e.g. bg-[#0f172a]) are valid Tailwind v3+

export default function ${name}() {
${jsBlock}  return (
    <>${styleTag}
${jsx.split('\n').map(l => '      ' + l).join('\n')}
    </>
  );
}`;
}

// ── Tailwind standalone HTML ────────────────────────────────────────────────
export function toTailwindHtml(sn) {
  const { rules } = convert(sn.css);
  const classMap = {};
  const residualSelectors = new Set();
  const jsGeneratedClasses = collectJsHtmlClasses(sn.js, collectCssClassNames(sn.css));

  for (const rule of rules) {
    if (!rule.selector || !rule.classes.length) continue;
    let sel = rule.selector;
    let mediaPrefix = '';
    let cleanSel = sel;

    if (sel.includes('@media')) {
      const inner = sel.match(/→\s*(.+)$/);
      if (inner) cleanSel = inner[1].trim();
      const mxM = sel.match(/max-width:\s*(\d+)px/);
      const mnM = sel.match(/min-width:\s*(\d+)px/);
      if (mxM) { mediaPrefix = `max-[${mxM[1]}px]:`; }
      else if (mnM) { const bp = parseInt(mnM[1]); mediaPrefix = bp < 640 ? '' : bp < 768 ? 'sm:' : bp < 1024 ? 'md:' : 'lg:'; }
    }

    let pseudoPrefix = '';
    if (cleanSel.includes(':hover'))       { pseudoPrefix = 'hover:';  cleanSel = cleanSel.replace(/:hover/g,  ''); }
    else if (cleanSel.includes(':focus'))  { pseudoPrefix = 'focus:';  cleanSel = cleanSel.replace(/:focus/g,  ''); }
    else if (cleanSel.includes(':active')) { pseudoPrefix = 'active:'; cleanSel = cleanSel.replace(/:active/g, ''); }

    const isSingleClass = /^\.[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(cleanSel.trim());
    const singleCn = isSingleClass ? cleanSel.trim().slice(1) : null;
    // Keep original CSS for classes that JS injects via generated HTML — Tailwind
    // utilities only reach the static markup, not dynamically-created elements.
    if (!isSingleClass || jsGeneratedClasses.has(singleCn)) {
      residualSelectors.add(rule.selector);
      continue;
    }

    const vp = mediaPrefix + pseudoPrefix;
    const cn = singleCn;
    if (!classMap[cn]) classMap[cn] = [];
    classMap[cn].push(...rule.classes.map(c => vp ? `${vp}${c}` : c));
  }
  Object.keys(classMap).forEach(k => { classMap[k] = [...new Set(classMap[k])]; });

  const preservedClasses = new Set();
  for (const sel of residualSelectors) {
    const dotClasses = sel.match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g) || [];
    for (const dc of dotClasses) preservedClasses.add(dc.slice(1));
  }
  if (sn.js) {
    // closest()/matches() also take CSS selectors — classes used there (e.g.
    // e.target.closest('.ftc-add')) must be preserved too, or event delegation
    // breaks after those classes are converted to Tailwind utilities and stripped.
    const qsRe = /(?:querySelector(?:All)?|closest|matches)\(\s*['"`]([^'"`]*)['"`]/g;
    let m;
    while ((m = qsRe.exec(sn.js)) !== null) {
      const classes = m[1].match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g) || [];
      for (const c of classes) preservedClasses.add(c.slice(1));
    }
    const clRe = /classList\.(?:add|remove|toggle|contains|replace)\(\s*['"`]([a-zA-Z_-][a-zA-Z0-9_-]*)['"`]/g;
    while ((m = clRe.exec(sn.js)) !== null) preservedClasses.add(m[1]);
  }

  const html = sn.html.replace(/\bclass="([^"]*)"/g, (_, classStr) => {
    const tokens = classStr.trim().split(/\s+/).filter(Boolean);
    const result = [];
    const seen = new Set();
    for (const t of tokens) {
      if (preservedClasses.has(t) && !seen.has(t)) { result.push(t); seen.add(t); }
      const tw = classMap[t];
      if (tw) {
        for (const c of tw) { if (!seen.has(c)) { result.push(c); seen.add(c); } }
      } else if (!preservedClasses.has(t)) {
        if (!seen.has(t)) { result.push(t); seen.add(t); }
      }
    }
    return `class="${result.join(' ')}"`;
  });

  // Strip CSS comments first so a comment preceding a residual rule (e.g. a
  // pseudo-element) doesn't glue onto the selector and break the match.
  const cssNoComments = sn.css.replace(/\/\*[\s\S]*?\*\//g, '');
  const residualCssBlocks = [];
  const kfRe = /@keyframes\s+\S+\s*\{/g;
  let kfMatch;
  while ((kfMatch = kfRe.exec(cssNoComments)) !== null) {
    let depth = 0, i = kfMatch.index;
    for (; i < cssNoComments.length; i++) {
      if (cssNoComments[i] === '{') depth++;
      else if (cssNoComments[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    residualCssBlocks.push(cssNoComments.slice(kfMatch.index, i).trim());
  }
  if (residualSelectors.size) {
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(cssNoComments)) !== null) {
      const rawSel = m[1].trim();
      if (residualSelectors.has(rawSel)) residualCssBlocks.push(`${rawSel} {\n  ${m[2].trim()}\n}`);
    }
  }

  const styleBlock = residualCssBlocks.length
    ? `\n  <style>\n${residualCssBlocks.map(b => '    ' + b.replace(/\n/g, '\n    ')).join('\n\n')}\n  </style>`
    : '';

  const scriptBlock = sn.js
    ? `\n  <script>\n${sn.js.split('\n').map(l => '    ' + l).join('\n')}\n  <\/script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${sn.title || sn.id}</title>
  <!-- Tailwind CSS v3+ — arbitrary value classes (e.g. bg-[#0f172a]) are valid -->
  <script src="https://cdn.tailwindcss.com"><\/script>${cdnTagsHtml(sn.cdnUrls) ? '\n' + cdnTagsHtml(sn.cdnUrls) : ''}${styleBlock}
</head>
<body>
${html.split('\n').map(l => '  ' + l).join('\n')}${scriptBlock}
</body>
</html>`;
}

// ── Vue 3 SFC ───────────────────────────────────────────────────────────────
export function toVueSfc(sn) {
  const template = convertTemplateHandlers(sn.html, 'vue');

  let scriptBlock = '';
  if (sn.js) {
    const { hoist, mount } = analyzeVanillaJs(sn.js);
    const parts = [`import { onMounted } from 'vue';`, ''];
    // Functions & data live at <script setup> scope, so the template can call them.
    if (hoist.length) parts.push(hoist.join('\n'), '');
    // Handlers referenced only by runtime-injected markup (element.innerHTML =
    // '…onclick="select(…)"…') resolve against window, not <script setup> scope —
    // expose them so injected inline handlers work.
    const winExpose = collectHandlerNames(sn.js).map(n => `  if (typeof ${n} === 'function') window.${n} = ${n};`);
    // DOM refs + side-effects wait until the element tree exists.
    if (mount.length || winExpose.length) {
      parts.push('onMounted(() => {');
      if (winExpose.length) parts.push(winExpose.join('\n'));
      if (mount.length) parts.push(mount.map(s => s.split('\n').map(l => '  ' + l).join('\n')).join('\n'));
      parts.push('});');
    }
    scriptBlock = '\n' + parts.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
  }

  return `${cdnCommentHtml(sn.cdnUrls)}<template>\n${template.split('\n').map(l => '  ' + l).join('\n')}\n</template>\n\n<script setup>${scriptBlock}</script>\n\n<style scoped>\n${sn.css}\n</style>`;
}

// ── Angular standalone component ────────────────────────────────────────────
export function toAngularComponent(sn) {
  const name = componentName(sn);
  const selector = angularSelector(name);

  const template = convertTemplateHandlers(sn.html, 'angular');

  const safeTemplate = template.replace(/`/g, '\\`');
  const safeCss      = sn.css.replace(/`/g, '\\`');

  // Run the vanilla JS in ngAfterViewInit (ViewEncapsulation.None keeps the DOM
  // identical), then bind the handler functions onto the component instance so
  // template events like (click)="toggleChat()" resolve to this.toggleChat().
  let jsBlock = '';
  if (sn.js) {
    const { funcNames } = analyzeVanillaJs(sn.js);
    const expose = funcNames.length
      ? `\n\n    // Bind inline-handler functions to the component so the template can call them\n    Object.assign(this, { ${funcNames.join(', ')} });`
      : '';
    // Handlers referenced only by runtime-injected markup (innerHTML) resolve
    // against window, not the component instance — expose those too.
    const winNames = collectHandlerNames(sn.js);
    const winExpose = winNames.length
      ? `\n\n    // Expose handlers used by runtime-injected inline markup to window\n` +
        winNames.map(n => `    if (typeof ${n} === 'function') window.${n} = ${n};`).join('\n')
      : '';
    jsBlock = `\n  ngAfterViewInit(): void {\n${sn.js.split('\n').map(l => '    ' + l).join('\n')}${expose}${winExpose}\n  }\n`;
  }
  const lifecycle    = sn.js ? ', AfterViewInit' : '';
  const impl         = sn.js ? ' implements AfterViewInit' : '';

  return `// @ts-nocheck
${cdnComment(sn.cdnUrls)}// Note: vanilla JS DOM manipulation is preserved as-is inside ngAfterViewInit().
// For idiomatic Angular, replace document.getElementById() with @ViewChild() refs
// and move state into component properties with two-way binding.
import { Component${lifecycle}, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '${selector}',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: \`
${safeTemplate.split('\n').map(l => '    ' + l).join('\n')}
  \`,
  styles: [\`
${safeCss.split('\n').map(l => '    ' + l).join('\n')}
  \`]
})
export class ${name}Component${impl} {${jsBlock}}`;
}
