/* Tailwind export for website sections and pages.

   Takes a section's HTML + CSS and returns the HTML with Tailwind utility classes plus the
   CSS that has no utility form. The converter in css-to-tailwind.js was written for UI
   snippets and is not safe on section CSS (container queries, var() / color-mix() values,
   :where() resets), so this module is stricter: a declaration becomes a utility only when it
   is certain to compute to the same value, otherwise it becomes an arbitrary property such
   as [padding:clamp(20px,5cqi,56px)] or stays in the leftover CSS. Nothing is dropped.

   Rules that become utilities: a single class (.cls), optionally with :hover / :focus /
   :active / :focus-visible / :focus-within / :disabled, at the top level or inside @media /
   @container / @supports (written as arbitrary variants such as [@media_(max-width:700px)]:).
   Everything else (descendant and compound selectors, pseudo-elements, @keyframes,
   @font-face, @import, custom-property declarations, classes the page's JavaScript toggles)
   stays in the leftover CSS, in the original order. */
import { convert } from '@/lib/css-to-tailwind';

/* ── CSS parsing ─────────────────────────────────────────────────────────── */
const AT_NESTED = /^@(media|container|supports)\b/i;

function matchBrace(s, open) {
  let depth = 0, q = '';
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = ''; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

export function parseBlocks(css) {
  const blocks = [];
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    let j = i, q = '', depth = 0;
    for (; j < css.length; j++) {
      const c = css[j];
      if (q) { if (c === '\\') j++; else if (c === q) q = ''; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if ((c === '{' || c === ';') && depth <= 0) break;
    }
    if (j >= css.length) break;
    const head = css.slice(i, j).trim();
    if (css[j] === ';') { blocks.push({ type: 'raw', text: `${head};` }); i = j + 1; continue; }
    const end = matchBrace(css, j);
    if (end < 0) break;
    const inner = css.slice(j + 1, end);
    if (head.startsWith('@')) {
      if (AT_NESTED.test(head)) blocks.push({ type: 'at', prelude: head, children: parseBlocks(inner) });
      else blocks.push({ type: 'raw', text: `${head}{${inner}}` });
    } else blocks.push({ type: 'rule', sel: head, decls: parseDecls(inner) });
    i = end + 1;
  }
  return blocks;
}

function parseDecls(body) {
  const out = [];
  let cur = '', depth = 0, q = '';
  const flush = () => {
    const d = cur.trim(); cur = '';
    const k = d.indexOf(':');
    if (k > 0) out.push({ prop: d.slice(0, k).trim(), val: d.slice(k + 1).trim() });
  };
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (q) { cur += c; if (c === '\\') { cur += body[++i] || ''; } else if (c === q) q = ''; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === ';' && depth <= 0) flush(); else cur += c;
  }
  flush();
  return out;
}

function splitTopLevel(str, sep) {
  const parts = []; let cur = '', depth = 0;
  for (const c of str) {
    if (c === '(' || c === '[') depth++;
    if (c === ')' || c === ']') depth--;
    if (c === sep && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += c;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

const classesIn = sel => [...sel.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]);

/* ── Declarations → utilities ────────────────────────────────────────────── */
// Keyword-valued properties where css-to-tailwind.js gives the exact utility (display:flex → flex …).
// Every other declaration is written as an arbitrary property, which always computes the same.
const SAFE_KEYWORD_PROPS = new Set([
  'display', 'position', 'flex-direction', 'flex-wrap', 'text-align', 'text-transform', 'overflow', 'overflow-x',
  'overflow-y', 'cursor', 'white-space', 'pointer-events', 'user-select', 'visibility', 'text-decoration',
  'font-style', 'object-fit', 'isolation', 'list-style',
]);

const SHORTHANDS = {
  margin: /^margin-/, padding: /^padding-/, border: /^border-(top|right|bottom|left|width|style|color|image|inline|block)/,
  'border-top': /^border-top-(width|style|color)$/, 'border-right': /^border-right-(width|style|color)$/,
  'border-bottom': /^border-bottom-(width|style|color)$/, 'border-left': /^border-left-(width|style|color)$/,
  font: /^(font-|line-height$)/, background: /^background-/, flex: /^flex-(grow|shrink|basis)$/, gap: /^(row|column)-gap$/,
  inset: /^(top|right|bottom|left)$/, overflow: /^overflow-[xy]$/, transition: /^transition-/, animation: /^animation-/,
  'list-style': /^list-style-/, outline: /^outline-/, 'border-radius': /^border-.*-radius$/,
  'grid-template': /^grid-template-/, grid: /^grid-(template|auto)-/, 'grid-column': /^grid-column-/, 'grid-row': /^grid-row-/,
  mask: /^mask-/, 'text-decoration': /^text-decoration-/, 'place-items': /^(align|justify)-items$/,
  'place-content': /^(align|justify)-content$/, 'place-self': /^(align|justify)-self$/, columns: /^column-(width|count)$/,
  'border-image': /^border-image-/,
};

const splitSpaces = v => {
  const out = []; let cur = '', d = 0;
  for (const c of v.trim()) {
    if (c === '(') d++;
    if (c === ')') d--;
    if (/\s/.test(c) && d === 0) { if (cur) out.push(cur); cur = ''; } else cur += c;
  }
  if (cur) out.push(cur);
  return out;
};
const box = names => v => {
  const p = splitSpaces(v);
  if (!p.length || p.length > 4) return null;
  const [t, r = t, b = t, l = r] = p;
  return names.map((n, i) => [n, [t, r, b, l][i]]);
};
const BORDER_STYLES = new Set(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']);
const borderSide = side => v => {
  if (/inherit|initial|unset/.test(v)) return null;
  let w = 'medium', st = 'none', c = 'currentcolor';
  for (const t of splitSpaces(v)) {
    if (BORDER_STYLES.has(t)) st = t;
    else if (/^(thin|medium|thick)$|^-?[\d.]+[a-z%]*$/.test(t)) w = t;
    else c = t;
  }
  const n = side ? `border-${side}` : 'border';
  return [[`${n}-width`, w], [`${n}-style`, st], [`${n}-color`, c]];
};
// Shorthands that can be written out as their longhands
const EXPAND = {
  margin: box(['margin-top', 'margin-right', 'margin-bottom', 'margin-left']),
  padding: box(['padding-top', 'padding-right', 'padding-bottom', 'padding-left']),
  inset: box(['top', 'right', 'bottom', 'left']),
  gap: v => { const p = splitSpaces(v); return p.length && p.length <= 2 ? [['row-gap', p[0]], ['column-gap', p[1] ?? p[0]]] : null; },
  overflow: v => { const p = splitSpaces(v); return p.length && p.length <= 2 ? [['overflow-x', p[0]], ['overflow-y', p[1] ?? p[0]]] : null; },
  border: borderSide(''), 'border-top': borderSide('top'), 'border-right': borderSide('right'),
  'border-bottom': borderSide('bottom'), 'border-left': borderSide('left'),
};

const arbitrary = (prop, val) => `[${prop}:${val.trim().replace(/\s+/g, '_')}]`;

/** Tailwind classes for one declaration, or null when it has to stay in the leftover CSS */
function declToTokens(prop, val) {
  if (prop.startsWith('--')) return null;
  if (/!important|["'`;{}\[\]\\]|url\(|_/.test(val)) return null;
  if (/\s/.test(prop) || !val.trim()) return null;
  if (SAFE_KEYWORD_PROPS.has(prop) && /^[a-z-]+$/.test(val)) {
    try {
      const r = convert(`.x{${prop}:${val}}`).rules[0]?.classes || [];
      if (r.length && r.every(c => /^[a-z0-9!:./-]+$/i.test(c))) return r;
    } catch { /* arbitrary property below */ }
  }
  return [arbitrary(prop, val)];
}

/* ── Variants ────────────────────────────────────────────────────────────── */
const STATES = { hover: 'hover', focus: 'focus', active: 'active', 'focus-visible': 'focus-visible', 'focus-within': 'focus-within', disabled: 'disabled' };
const atVariant = prelude => `[${prelude.trim().replace(/\s+/g, '_')}]:`;

function simpleTarget(part) {
  const m = part.trim().match(/^\.(-?[_a-zA-Z][\w-]*)(?::([a-z-]+))?$/);
  if (!m) return null;
  if (m[2] && !STATES[m[2]]) return null;
  return { cls: m[1], state: m[2] ? `${STATES[m[2]]}:` : '' };
}

/* ── Conversion ──────────────────────────────────────────────────────────── */
/**
 * @param {{html:string, css:string}} sn
 * @param {{noConvert?:Set<string>, keepToken?:Set<string>}} opts
 *   noConvert: classes JavaScript adds, removes or generates (their CSS stays as written)
 *   keepToken: classes JavaScript looks up (they stay on the element next to their utilities)
 * @returns {{html:string, css:string, stats:{utilities:number, leftoverRules:number}}}
 */
export function sectionToTailwind(sn, opts = {}) {
  const noConvert = opts.noConvert || new Set();
  const keepToken = new Set(opts.keepToken || []);
  const css = sn.css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = parseBlocks(css);

  // Pass 1: every declaration of every simple rule, with where it sits in the cascade
  let order = 0;
  const entries = []; // { ctx, prop, val, order, tokens|null, rule }
  const rules = [];   // the simple rules
  const residualSelectorClasses = new Set();
  const walk = (list, ctx) => {
    for (const b of list) {
      if (b.type === 'at') { walk(b.children, [...ctx, b.prelude]); continue; }
      if (b.type === 'raw') { classesIn(b.text).forEach(c => residualSelectorClasses.add(c)); continue; }
      const parts = splitTopLevel(b.sel, ',');
      const sims = [], others = [];
      for (const part of parts) {
        const tg = simpleTarget(part);
        if (tg && !noConvert.has(tg.cls)) sims.push(tg); else others.push(part);
      }
      others.forEach(o => classesIn(o).forEach(c => residualSelectorClasses.add(c)));
      if (!sims.length) { b.simple = false; continue; }
      const targets = sims;
      b.otherSel = others.join(',');
      b.simple = true; b.targets = targets; b.ctx = ctx;
      b.entries = []; rules.push(b);
      for (const d of b.decls) {
        const e = { ctx, prop: d.prop, val: d.val, order: order++, tokens: declToTokens(d.prop, d.val), rule: b };
        b.entries.push(e); entries.push(e);
      }
    }
  };
  walk(blocks, []);

  // A property that cannot become a utility in one context stays CSS in all of them, for that
  // class, so a leftover media rule never ends up fighting a utility of the same property
  const stuck = new Set(); // `${cls}|${state}|${prop}`
  for (const e of entries) {
    if (e.tokens) continue;
    for (const t of e.rule.targets) stuck.add(`${t.cls}|${t.state}|${e.prop}`);
  }
  // The same property set under two different @media / @container conditions stays CSS: when both
  // match, Tailwind decides which utility wins, not the order of the original rules
  const conds = new Map();
  for (const e of entries) {
    if (!e.ctx.length) continue;
    for (const t of e.rule.targets) {
      const k = `${t.cls}|${t.state}|${e.prop}`;
      if (!conds.has(k)) conds.set(k, new Set());
      conds.get(k).add(e.ctx.join('>'));
    }
  }
  for (const [k, set] of conds) if (set.size > 1) stuck.add(k);
  // A shorthand and one of its longhands in the same place (margin + margin-bottom, background +
  // background-clip) stay CSS: Tailwind decides the order of utilities itself, and a shorthand
  // that lands after its longhand would reset it
  const groups = new Map();
  for (const e of entries) for (const t of e.rule.targets) {
    const k = `${t.cls}|${t.state}|${e.ctx.join('>')}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push({ e, t });
  }
  for (const list of groups.values()) {
    for (const a of list) {
      const short = SHORTHANDS[a.e.prop];
      if (!short) continue;
      for (const b of list) {
        if (b !== a && short.test(b.e.prop.replace(/^-webkit-/, ''))) {
          stuck.add(`${a.t.cls}|${a.t.state}|${a.e.prop}`); stuck.add(`${b.t.cls}|${b.t.state}|${b.e.prop}`);
        }
      }
    }
  }
  // Duplicate declarations of one property inside a rule (fallback pairs) also stay CSS
  for (const rule of rules) {
    const seen = new Set();
    for (const e of rule.entries) {
      if (seen.has(e.prop)) rule.targets.forEach(t => stuck.add(`${t.cls}|${t.state}|${e.prop}`));
      seen.add(e.prop);
    }
  }

  // Pass 2: split into utilities per class and leftover CSS, in the original order
  const perClass = new Map(); // cls -> [{ prefix, prop, val, tokens, order }]
  let utilities = 0;
  let leftoverRules = 0;
  const emit = (list, ctx) => {
    const out = [];
    for (const b of list) {
      if (b.type === 'raw') { out.push(b.text); leftoverRules++; continue; }
      if (b.type === 'at') {
        const inner = emit(b.children, [...ctx, b.prelude]);
        if (inner.length) out.push(`${b.prelude}{\n${inner.join('\n')}\n}`);
        continue;
      }
      if (!b.simple) {
        out.push(`${b.sel}{${b.decls.map(d => `${d.prop}:${d.val}`).join(';')}}`); leftoverRules++; continue;
      }
      if (b.otherSel) { out.push(`${b.otherSel}{${b.decls.map(d => `${d.prop}:${d.val}`).join(';')}}`); leftoverRules++; }
      const keep = [];
      for (const e of b.entries) {
        const blocked = !e.tokens || b.targets.some(t => stuck.has(`${t.cls}|${t.state}|${e.prop}`));
        if (blocked) { keep.push(`${e.prop}:${e.val}`); continue; }
        const prefix = ctx.map(atVariant).join('');
        for (const t of b.targets) {
          if (!perClass.has(t.cls)) perClass.set(t.cls, []);
          perClass.get(t.cls).push({ prefix: `${prefix}${t.state}`, prop: e.prop, val: e.val, tokens: e.tokens, order: e.order });
          utilities += e.tokens.length;
        }
      }
      if (keep.length) { out.push(`${b.sel}{${keep.join(';')}}`); leftoverRules++; b.targets.forEach(t => residualSelectorClasses.add(t.cls)); }
    }
    return out;
  };
  const leftover = emit(blocks, []);

  // Markup: each class token becomes its utilities. When two classes on one element set the same
  // property in the same place the later rule wins; a shorthand that meets a longhand of itself
  // is written out as longhands, so that stays true whatever order Tailwind emits utilities in
  // (shorthands that cannot be written out make the later longhand important, or drop it).
  // Tokens a leftover rule or the JavaScript still needs stay on the element.
  const html = sn.html.replace(/\bclass="([^"]*)"/g, (_, str) => {
    const tokens = str.trim().split(/\s+/).filter(Boolean);
    const items = [];
    const keep = [];
    for (const t of tokens) {
      const list = perClass.get(t);
      if (list) items.push(...list);
      if (!list || residualSelectorClasses.has(t) || keepToken.has(t) || noConvert.has(t)) keep.push(t);
    }
    const important = new Set(), dropped = new Set();
    const expanded = [];
    for (const sh of items) {
      const re = SHORTHANDS[sh.prop];
      const hits = re ? items.filter(lo => lo !== sh && lo.prefix === sh.prefix && re.test(lo.prop.replace(/^-webkit-/, ''))) : [];
      if (!hits.length) { expanded.push(sh); continue; }
      const parts = EXPAND[sh.prop]?.(sh.val);
      if (parts) {
        for (const [prop, val] of parts) {
          const tk = declToTokens(prop, val);
          if (tk) expanded.push({ prefix: sh.prefix, prop, val, tokens: tk, order: sh.order });
        }
      } else {
        expanded.push(sh);
        for (const lo of hits) { if (lo.order > sh.order) important.add(lo); else dropped.add(lo); }
      }
    }
    const winners = new Map();
    for (const u of expanded) {
      if (dropped.has(u)) continue;
      u.tokens.forEach((tk, k) => {
        const key = `${u.prefix}|${u.prop}|${k}`;
        const w = winners.get(key);
        if (!w || u.order >= w.u.order) winners.set(key, { u, tk });
      });
    }
    const out = [...keep, ...[...winners.values()].sort((x, y) => x.u.order - y.u.order).map(({ u, tk }) => `${u.prefix}${important.has(u) ? '!' : ''}${tk}`)];
    return `class="${[...new Set(out)].join(' ')}"`;
  });

  return { html, css: leftover.join('\n'), stats: { utilities, leftoverRules } };
}
