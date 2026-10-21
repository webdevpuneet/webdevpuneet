/* Readable code for exports and the code view: the way the email templates' HTML reads.

   formatHtml(html)  re-indents the document by nesting (2 spaces). It only re-indents whitespace
                     that is already there (line breaks between tags) and never adds whitespace
                     between elements, so the page renders exactly as before. <style> contents go
                     through formatCss; <script>, <pre> and <textarea> are left as they are.
   formatCss(css)    one declaration per line, "prop: value;", nested @media / @container blocks
                     indented. Strings and url(...) values (data URIs contain ; and :) are kept
                     intact.

   Plain string code (no DOM), so it runs in the editor, in route pages and in scripts. */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'pre', 'textarea']);
const pad = n => '  '.repeat(Math.max(0, n));

/* Splits CSS into top-level pieces, respecting quotes, parentheses and comments */
function scanCss(css, onChar) {
  let quote = '', paren = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (quote) { if (c === '\\') { i++; continue; } if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '/' && css[i + 1] === '*') { const end = css.indexOf('*/', i + 2); i = end < 0 ? css.length : end + 1; continue; }
    if (c === '(') { paren++; continue; }
    if (c === ')') { paren = Math.max(0, paren - 1); continue; }
    if (!paren && onChar(c, i) === false) return;
  }
}

/* "prop:value" -> "prop: value" (first colon outside strings and parentheses) */
function declaration(d) {
  let at = -1;
  scanCss(d, (c, i) => { if (c === ':') { at = i; return false; } return true; });
  return at < 0 ? d.trim() : `${d.slice(0, at).trim()}: ${d.slice(at + 1).trim()}`;
}

export function formatCss(css, base = 0) {
  const src = String(css || '').trim();
  if (!src) return '';
  const out = [];
  let depth = base, from = 0, gap = false;
  // A blank line before each top-level rule that follows another
  const line = text => { if (gap && depth === base) out.push(''); gap = false; out.push(`${pad(depth)}${text}`); };
  const flush = (end, kind) => {
    const text = src.slice(from, end).trim();
    from = end + 1;
    if (kind === 'open') { line(`${text.replace(/\s+/g, ' ')} {`); depth++; return; }
    if (text) line(`${text.startsWith('@') ? text.replace(/\s+/g, ' ') : declaration(text)};`);
    if (kind === 'close') { depth = Math.max(base, depth - 1); out.push(`${pad(depth)}}`); if (depth === base) gap = true; }
  };
  scanCss(src, (c, i) => {
    if (c === '{') flush(i, 'open');
    else if (c === '}') flush(i, 'close');
    else if (c === ';') flush(i, 'decl');
  });
  const tail = src.slice(from).trim();
  if (tail) line(tail);
  return out.join('\n');
}

export function formatHtml(html) {
  const src = String(html || '');
  const tokens = [];
  const re = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?([a-zA-Z][\w:-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*>/g;
  let last = 0, m;
  while ((m = re.exec(src))) {
    if (m.index > last) tokens.push({ type: 'text', v: src.slice(last, m.index) });
    const tag = (m[1] || '').toLowerCase();
    const t = m[0];
    if (tag && RAW.has(tag) && !t.startsWith('</')) {
      const close = src.toLowerCase().indexOf(`</${tag}`, re.lastIndex);
      const end = close < 0 ? src.length : close;
      tokens.push({ type: 'open', tag, v: t });
      tokens.push({ type: 'raw', tag, v: src.slice(re.lastIndex, end) });
      re.lastIndex = end;
      last = end;
      continue;
    }
    tokens.push({ type: t.startsWith('</') ? 'close' : (!tag || VOID.has(tag) || t.endsWith('/>')) ? 'single' : 'open', tag, v: t });
    last = re.lastIndex;
  }
  if (last < src.length) tokens.push({ type: 'text', v: src.slice(last) });

  let depth = 0, out = '';
  tokens.forEach((tk, i) => {
    if (tk.type === 'text') {
      // Whitespace that already breaks a line between tags: re-indent it to the nesting depth
      if (/^\s+$/.test(tk.v) && tk.v.includes('\n')) {
        const next = tokens[i + 1];
        out += `\n${pad(next?.type === 'close' ? depth - 1 : depth)}`;
      } else out += tk.v;
      return;
    }
    if (tk.type === 'raw') {
      if (tk.tag === 'style') { const css = formatCss(tk.v, depth); out += css ? `\n${css}\n${pad(depth - 1)}` : ''; }
      else if (tk.tag === 'script' && tk.v.trim()) {
        // Keep the script's own nesting: remove only the indent its lines share
        const lines = tk.v.replace(/^\s*\n|\s+$/g, '').split('\n');
        const common = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
        out += `\n${lines.map(l => (l.trim() ? pad(depth) + l.slice(common) : '')).join('\n')}\n${pad(depth - 1)}`;
      }
      else out += tk.v;
      return;
    }
    if (tk.type === 'close') depth = Math.max(0, depth - 1);
    out += tk.v;
    if (tk.type === 'open') depth++;
  });
  return out;
}
