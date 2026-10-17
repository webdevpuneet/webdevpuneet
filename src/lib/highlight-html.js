/* Tiny syntax highlighter for HTML with embedded <style> CSS (email HTML views).
   Returns escaped HTML with <span class="hl-…"> tokens; style them with:
     hl-c comment · hl-d doctype · hl-p punctuation · hl-t tag · hl-n attribute name
     hl-v attribute value / CSS value · hl-s CSS selector · hl-k CSS property · hl-a at-rule / !important
   Small and synchronous on purpose: it re-runs on every edit, so no Shiki/WASM. */

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sp = (cls, s) => (s ? `<span class="hl-${cls}">${esc(s)}</span>` : '');

const TOKEN = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-zA-Z][\w:-]*(?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/gi;
const ATTR = /([^\s=/>]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g;

function tag(tok) {
  const m = /^(<\/?)([\w:-]+)([\s\S]*?)(\/?>)$/.exec(tok);
  if (!m) return esc(tok);
  let attrs = '';
  let last = 0;
  m[3].replace(ATTR, (all, name, eq, val, at) => {
    attrs += esc(m[3].slice(last, at)) + sp('n', name) + (eq ? sp('p', eq) + sp('v', val || '') : '');
    last = at + all.length;
    return all;
  });
  attrs += esc(m[3].slice(last));
  return sp('p', m[1]) + sp('t', m[2]) + attrs + sp('p', m[4]);
}

function css(src) {
  let out = '';
  let i = 0;
  let mode = 'sel'; // sel: selectors / at-rules · prop: property names · val: values
  const n = src.length;
  const stops = { sel: '{}', prop: ':;{}', val: ';}' };
  while (i < n) {
    if (src.startsWith('/*', i)) {
      const e = src.indexOf('*/', i + 2);
      const j = e < 0 ? n : e + 2;
      out += sp('c', src.slice(i, j));
      i = j;
      continue;
    }
    const ch = src[i];
    if (ch === '{') { out += sp('p', ch); mode = 'prop'; i++; continue; }
    if (ch === '}') { out += sp('p', ch); mode = 'sel'; i++; continue; }
    if (ch === ';') { out += sp('p', ch); if (mode === 'val') mode = 'prop'; i++; continue; }
    if (ch === ':' && mode === 'prop') { out += sp('p', ch); mode = 'val'; i++; continue; }
    let j = i;
    while (j < n && !stops[mode].includes(src[j]) && !src.startsWith('/*', j)) j++;
    if (j === i) j = i + 1;
    const run = src.slice(i, j);
    // In a block, text followed by "{" is a nested selector (rules inside @media)
    const isSel = mode === 'sel' || (mode === 'prop' && src[j] === '{');
    if (isSel) {
      const at = /^(\s*)(@[\w-]+)([\s\S]*)$/.exec(run);
      out += at ? esc(at[1]) + sp('a', at[2]) + sp('s', at[3]) : sp('s', run);
    } else if (mode === 'prop') {
      out += sp('k', run);
    } else {
      const imp = run.indexOf('!important');
      out += imp < 0 ? sp('v', run) : sp('v', run.slice(0, imp)) + sp('a', '!important') + sp('v', run.slice(imp + 10));
    }
    i = j;
  }
  return out;
}

export function highlightHtml(src) {
  let out = '';
  let last = 0;
  TOKEN.lastIndex = 0;
  let m;
  while ((m = TOKEN.exec(src))) {
    out += esc(src.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('<!--')) out += sp('c', tok);
    else if (/^<!doctype/i.test(tok)) out += sp('d', tok);
    else {
      out += tag(tok);
      // Highlight the CSS inside <style>…</style>
      if (/^<style[\s>]/i.test(tok)) {
        const end = src.toLowerCase().indexOf('</style', TOKEN.lastIndex);
        const stop = end < 0 ? src.length : end;
        out += css(src.slice(TOKEN.lastIndex, stop));
        TOKEN.lastIndex = stop;
      }
    }
    last = TOKEN.lastIndex;
  }
  return out + esc(src.slice(last));
}
