import { esc, richText, safeUrl, IMG } from './meta.js';

/* Custom Section: a section people lay out themselves. Instead of fixed fields it keeps a
   layout in state.custom (cleaned by cleanCustom):

     { id, width, align, pt, pb, rowGap, css, js, rows: [row] }
     row   { id, layout '1' | '1-1' | '1-2' …, gap, valign, stack, reverse, pt, pb, cols: [col] }
     col   { id, align 'inherit' | 'left' | 'center' | 'right', style 'plain' | 'card', blocks: [block] }
     block { id, type, align, mt, mb, …the type's own props (BLOCKS below) }

   `finalize` (called by render.js fillHtml) writes the markup. Uploaded images live in
   state.uploads under `cs.<blockId>` and resolve through imageSrc like any other image.
   Custom CSS may start selectors with `.this` (this section only); custom JavaScript gets
   `section` (this section's element). Text blocks carry data-anim="item" (headings also data-anim-text) and
   images / HTML embeds data-anim="media", so the page's animation style (Theme tab) applies like any section. Neither JavaScript nor the scripts and event handlers
   of HTML blocks run in the editor previews (they are same-origin with your saved designs);
   they run in exported pages. */

export const CUSTOM_LAYOUTS = [
  ['1', 'One column'], ['1-1', 'Two equal'], ['1-2', 'Narrow + wide'], ['2-1', 'Wide + narrow'],
  ['1-1-1', 'Three equal'], ['1-2-1', 'Wide middle'], ['1-1-1-1', 'Four equal'], ['1-3', 'Sidebar left'], ['3-1', 'Sidebar right'],
];
const LAYOUT_IDS = CUSTOM_LAYOUTS.map(([id]) => id);
export const colsOf = layout => String(layout).split('-').length;

export const ALIGNS = [['left', 'Left'], ['center', 'Centre'], ['right', 'Right']];
export const WIDTHS = [['narrow', 'Narrow (760 px)'], ['default', 'Theme width'], ['wide', 'Wide (1440 px)'], ['full', 'Full width']];
export const VALIGNS = [['top', 'Top'], ['center', 'Middle'], ['bottom', 'Bottom'], ['stretch', 'Stretch']];
export const STACKS = [['tablet', 'Tablets and phones'], ['phone', 'Phones only'], ['never', 'Never']];
export const HEADING_SIZES = [['s', 'S'], ['m', 'M'], ['l', 'L'], ['xl', 'XL']];
export const TEXT_SIZES = [['s', 'Small'], ['m', 'Normal'], ['l', 'Large']];

/* Block types: label, default props and the props cleanCustom keeps (with their kind) */
export const BLOCKS = {
  eyebrow: { label: 'Eyebrow', icon: '◦', props: { text: ['text', 'Small label'] } },
  heading: { label: 'Heading', icon: 'H', props: { text: ['text', 'Your *heading* here'], level: [['h1', 'h2', 'h3', 'h4'], 'h2'], size: [['s', 'm', 'l', 'xl'], 'l'] } },
  text:    { label: 'Paragraph', icon: '¶', props: { text: ['text', 'Write a short paragraph. Wrap words in *asterisks* to colour them, or use <b>bold</b> and <i>italic</i>.'], size: [['s', 'm', 'l'], 'm'] } },
  image:   { label: 'Image', icon: '▣', props: { src: ['text', IMG('hero-landscape.jpg')], alt: ['text', 'Describe the image'], width: ['num', 100, 10, 100], radius: [['yes', 'no'], 'yes'], link: ['text', ''] } },
  button:  { label: 'Button', icon: '▭', props: { label: ['text', 'Get started'], url: ['text', '#'], style: [['primary', 'ghost', 'link'], 'primary'], newTab: [['no', 'yes'], 'no'] } },
  list:    { label: 'List', icon: '☰', props: { text: ['text', 'First point\nSecond point\nThird point'], style: [['checks', 'bullets', 'numbers'], 'checks'] } },
  spacer:  { label: 'Spacer', icon: '↕', props: { h: ['num', 32, 0, 400] } },
  divider: { label: 'Divider', icon: '—', props: { width: ['num', 100, 10, 100] } },
  html:    { label: 'HTML embed', icon: '</>', props: { code: ['text', '<p>Paste any HTML here: an embed code, an iframe, a form…</p>'] } },
};
export const BLOCK_TYPES = Object.keys(BLOCKS);

export const newCustomId = () => `c${Date.now().toString(36).slice(-5)}${Math.random().toString(36).slice(2, 6)}`;
const clampNum = (v, min, max, d) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };
const oneOf = (v, list, d) => (list.includes(v) ? v : d);
const str = (v, max = 20000) => String(v ?? '').slice(0, max);
const idOk = v => (/^[\w-]{1,24}$/.test(String(v || '')) ? String(v) : newCustomId());

/** A new block of a type with its default props */
export function newBlock(type, props = {}) {
  const def = BLOCKS[type] || BLOCKS.text;
  const b = { id: newCustomId(), type: BLOCKS[type] ? type : 'text', align: 'inherit', mt: 0, mb: type === 'spacer' || type === 'divider' ? 0 : 16 };
  for (const [k, spec] of Object.entries(def.props)) b[k] = props[k] ?? spec[1];
  return b;
}
export const newCol = (blocks = []) => ({ id: newCustomId(), align: 'inherit', style: 'plain', blocks });
export const newRow = (layout = '1-1', cols) => ({
  id: newCustomId(), layout, gap: 32, valign: 'top', stack: 'tablet', reverse: false, pt: 0, pb: 0,
  cols: cols || Array.from({ length: colsOf(layout) }, () => newCol([newBlock('text')])),
});

/** The starting layout: a centred intro row, then text + image in two columns */
export function defaultCustom() {
  return {
    id: newCustomId(), width: 'default', align: 'left', pt: 88, pb: 88, rowGap: 48, css: '', js: '',
    rows: [
      { ...newRow('1', [{ ...newCol([
        newBlock('eyebrow', { text: 'Custom section' }),
        newBlock('heading', { text: 'Build *any layout* you need', size: 'xl' }),
        newBlock('text', { text: 'Add rows and columns, then fill them with headings, text, images, buttons, lists or your own HTML. Everything follows your theme.', size: 'l' }),
      ]), align: 'center' }]) },
      { ...newRow('1-1', [
        newCol([
          newBlock('heading', { text: 'Two columns, side by side', level: 'h3', size: 'm' }),
          newBlock('text', { text: 'Columns stack on phones and tablets. Choose how each row lines up, how much space it has and whether the image comes first on small screens.' }),
          newBlock('list', { text: 'Rows with 1 to 4 columns\nLeft, centre or right alignment\nMargins and padding in pixels' }),
          newBlock('button', { label: 'Get started', url: '#' }),
          newBlock('button', { label: 'Learn more', url: '#', style: 'ghost' }),
        ]),
        newCol([newBlock('image', { alt: 'Mountains at sunset' })]),
      ]), valign: 'center', reverse: true },
    ],
  };
}

/** A saved layout made safe and complete (unknown values fall back to defaults) */
export function cleanCustom(c) {
  if (!c || typeof c !== 'object' || !Array.isArray(c.rows)) return defaultCustom();
  const cleanBlock = b => {
    if (!b || !BLOCKS[b.type]) return null;
    const out = { id: idOk(b.id), type: b.type, align: oneOf(b.align, ['inherit', 'left', 'center', 'right'], 'inherit'), mt: clampNum(b.mt, -200, 400, 0), mb: clampNum(b.mb, -200, 400, 16) };
    for (const [k, [kind, d, min, max]] of Object.entries(BLOCKS[b.type].props)) {
      out[k] = Array.isArray(kind) ? oneOf(b[k], kind, d) : kind === 'num' ? clampNum(b[k], min, max, d) : str(b[k] ?? d);
    }
    return out;
  };
  const cleanCol = col => ({
    id: idOk(col?.id), align: oneOf(col?.align, ['inherit', 'left', 'center', 'right'], 'inherit'), style: oneOf(col?.style, ['plain', 'card'], 'plain'),
    blocks: (Array.isArray(col?.blocks) ? col.blocks : []).slice(0, 60).map(cleanBlock).filter(Boolean),
  });
  const rows = c.rows.slice(0, 40).map(r => {
    const layout = oneOf(r?.layout, LAYOUT_IDS, '1');
    const n = colsOf(layout);
    const cols = (Array.isArray(r?.cols) ? r.cols : []).slice(0, n).map(cleanCol);
    while (cols.length < n) cols.push(newCol());
    return {
      id: idOk(r?.id), layout, cols, gap: clampNum(r?.gap, 0, 200, 32), valign: oneOf(r?.valign, VALIGNS.map(v => v[0]), 'top'),
      stack: oneOf(r?.stack, STACKS.map(v => v[0]), 'tablet'), reverse: r?.reverse === true, pt: clampNum(r?.pt, 0, 400, 0), pb: clampNum(r?.pb, 0, 400, 0),
    };
  });
  return {
    id: idOk(c.id), width: oneOf(c.width, WIDTHS.map(v => v[0]), 'default'), align: oneOf(c.align, ['left', 'center', 'right'], 'left'),
    pt: clampNum(c.pt, 0, 400, 88), pb: clampNum(c.pb, 0, 400, 88), rowGap: clampNum(c.rowGap, 0, 400, 48), css: str(c.css, 50000), js: str(c.js, 50000), rows,
  };
}

/** Change a row's layout, keeping every block (extra columns' blocks move into the last one) */
export function relayoutRow(row, layout) {
  const n = colsOf(layout);
  const cols = row.cols.slice(0, n).map(c => ({ ...c, blocks: [...c.blocks] }));
  for (const extra of row.cols.slice(n)) cols[cols.length - 1].blocks.push(...extra.blocks);
  while (cols.length < n) cols.push(newCol());
  return { ...row, layout, cols };
}

/** Every upload key the layout uses (image blocks), for restoreSectionState */
export const customImageKeys = c => (c?.rows || []).flatMap(r => r.cols.flatMap(col => col.blocks.filter(b => b.type === 'image').map(b => `cs.${b.id}`)));

/* A short stable hash: the section's scope class follows its content, so two different custom
   sections on one page never share CSS or JavaScript (two identical ones may, harmlessly) */
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };

/* Editor previews: no scripts, inline event handlers or javascript: links from HTML blocks */
const tame = html => String(html)
  .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '').replace(/<script\b[^>]*>/gi, '')
  .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src|action|formaction)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');

const alignOf = (...a) => a.find(v => v && v !== 'inherit') || 'left';
const px = n => `${n}px`;

function blockHtml(b, align, { imageSrc, clean }) {
  const mark = clean ? '' : ` data-cs-block="${esc(b.id)}"`;
  // Click-to-edit in the editor previews: text is edited right in the preview (data-cs-edit = the block property)
  const ed = (k, multi = false) => (clean ? '' : ` data-cs-edit="${k}"${multi ? ' data-cs-multi' : ''}`);
  const style = [b.mt ? `margin-top:${px(b.mt)}` : '', b.mb !== 16 ? `margin-bottom:${px(b.mb)}` : ''].filter(Boolean).join(';');
  const st = style ? ` style="${style}"` : '';
  const cls = (...c) => ['cs-b', ...c, `cs-a-${align}`].join(' ');
  switch (b.type) {
    case 'eyebrow': return `<p class="${cls('cs-eyebrow', 'st-eyebrow')}" data-anim="item"${mark}${ed('text')}${st}>${richText(b.text)}</p>`;
    case 'heading': return `<${b.level} class="${cls('cs-h', `cs-h-${b.size}`)}" data-anim="item" data-anim-text${mark}${ed('text', true)}${st}>${richText(b.text)}</${b.level}>`;
    case 'text': return `<p class="${cls('cs-p', `cs-p-${b.size}`)}" data-anim="item"${mark}${ed('text', true)}${st}>${richText(b.text)}</p>`;
    case 'image': {
      const up = imageSrc ? imageSrc(`cs.${b.id}`) : '';
      const src = safeUrl(up || b.src);
      const img = `<img src="${esc(src)}" alt="${esc(b.alt)}" loading="lazy" style="width:${b.width}%"${b.radius === 'yes' ? ' class="cs-round"' : ''}>`;
      return `<figure class="${cls('cs-img')}" data-anim="media"${mark}${st}>${b.link ? `<a href="${esc(safeUrl(b.link))}">${img}</a>` : img}</figure>`;
    }
    case 'button': {
      const c = b.style === 'ghost' ? 'st-btn st-btn--ghost' : b.style === 'link' ? 'cs-link' : 'st-btn';
      const tab = b.newTab === 'yes' ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a class="${c}" href="${esc(safeUrl(b.url))}"${tab}${mark}${st}>${clean ? richText(b.label) : `<span${ed('label')}>${richText(b.label)}</span>`}</a>`;
    }
    case 'list': {
      const tag = b.style === 'numbers' ? 'ol' : 'ul';
      const items = String(b.text).split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => `<li>${richText(l)}</li>`).join('');
      return `<${tag} class="${cls('cs-list', b.style === 'checks' ? 'st-checks' : `cs-list-${b.style}`)}" data-anim="item"${mark}${st}>${items}</${tag}>`;
    }
    case 'spacer': return `<div class="cs-b cs-spacer" aria-hidden="true"${mark} style="height:${px(b.h)}${style ? `;${style}` : ''}"></div>`;
    case 'divider': return `<hr class="${cls('cs-hr')}"${mark} style="width:${b.width}%${style ? `;${style}` : ''}">`;
    case 'html': return `<div class="${cls('cs-html')}" data-anim="media"${mark}${st}>${clean ? b.code : tame(b.code)}</div>`;
    default: return '';
  }
}

/* Buttons next to each other in a column sit in one row */
function columnHtml(col, align, opts) {
  const out = [];
  let btns = [];
  const flush = () => {
    if (!btns.length) return;
    out.push(`<div class="cs-b cs-btns cs-a-${btns[0].a}" data-anim="item">${btns.map(x => x.html).join('')}</div>`);
    btns = [];
  };
  for (const b of col.blocks) {
    const a = alignOf(b.align, col.align, align);
    if (b.type === 'button') { if (btns.length && btns[0].a !== a) flush(); btns.push({ a, html: blockHtml(b, a, opts) }); continue; }
    flush();
    out.push(blockHtml(b, a, opts));
  }
  flush();
  return out.join('\n');
}

/** A state with one block property changed (text typed in the preview) */
const EDITABLE_PROPS = new Set(['text', 'label']);
export function setBlockProp(state, blockId, key, value) {
  const c = state.custom;
  if (!c || !EDITABLE_PROPS.has(key)) return state;
  return { ...state, custom: { ...c, rows: c.rows.map(r => ({ ...r, cols: r.cols.map(col => ({ ...col, blocks: col.blocks.map(b => (b.id === blockId && key in b ? { ...b, [key]: value } : b)) })) })) } };
}

/** The section's markup from its layout */
export function customMarkup(c, opts = {}) {
  const scope = `cs-${hash(JSON.stringify(c))}`;
  const rows = c.rows.map((r, i) => {
    const fr = r.layout.split('-').map(n => `${n}fr`).join(' ');
    const rs = [`--cs-cols:${fr}`, `--cs-gap:${px(r.gap)}`, r.pt ? `padding-top:${px(r.pt)}` : '', r.pb ? `padding-bottom:${px(r.pb)}` : '', i ? `margin-top:${px(c.rowGap)}` : ''].filter(Boolean).join(';');
    const cols = r.cols.map(col => `<div class="cs-col cs-v-${r.valign}${col.style === 'card' ? ' cs-card' : ''}"${opts.clean ? '' : ` data-cs-col="${esc(col.id)}"`}>\n${columnHtml(col, c.align, opts)}\n</div>`).join('\n');
    return `<div class="cs-row cs-v-${r.valign}" data-stack="${r.stack}"${r.reverse ? ' data-reverse' : ''} style="${rs}"${opts.clean ? '' : ` data-cs-row="${esc(r.id)}"`}>\n${cols}\n</div>`;
  }).join('\n');
  const css = c.css.trim() ? `<style>\n${c.css.replace(/\.this\b/g, `.${scope}`).replace(/<\/style/gi, '<\\/style')}\n</style>\n` : '';
  const js = opts.clean && c.js.trim()
    ? `\n<script>\n(function () {\n  var section = document.querySelector('.${scope}');\n  if (!section) return;\n${c.js.replace(/<\/script/gi, '<\\/script')}\n})();\n</script>`
    : '';
  return `${css}<div class="cs ${scope} cs-w-${c.width}" style="padding-top:${px(c.pt)};padding-bottom:${px(c.pb)}">\n<div class="cs-inner">\n${rows}\n</div>\n</div>${js}`;
}

export default {
  id: 'custom-section',
  name: 'Custom Section',
  version: '1.0.0',
  custom: true,
  tags: ['custom', 'layout', 'columns', 'rows', 'builder', 'html', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Custom Section Builder — Free Multi-Column Layout Editor',
  seoDescription: 'Build a custom website section free: rows, one to four columns, headings, text, images, buttons, HTML embeds, custom CSS and JS. Export HTML, React or Vue.',
  description: 'Build your own section: rows of one to four columns filled with headings, paragraphs, images, buttons, lists, spacers, dividers and HTML embeds, with alignment, spacing, custom CSS and JavaScript.',
  bestFor: ['Layouts the ready-made sections do not cover', 'Embedding forms, widgets and third-party code', 'Simple content pages built from blocks'],
  groups: [],
  fields: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },
  finalize: (html, state, opts) => html.replace('<div class="cs" data-cs-root></div>', () => customMarkup(cleanCustom(state.custom), opts)),

  html: '<div class="cs" data-cs-root></div>',
  css: `.cs-inner{width:100%;max-width:calc(var(--st-max) * 1px);margin:0 auto;padding-left:var(--st-pad);padding-right:var(--st-pad)}
.cs-w-narrow .cs-inner{max-width:760px}
.cs-w-wide .cs-inner{max-width:1440px}
.cs-w-full .cs-inner{max-width:none}
.cs-row{display:grid;grid-template-columns:var(--cs-cols);gap:var(--cs-gap)}
.cs-row.cs-v-top{align-items:start}
.cs-row.cs-v-center{align-items:center}
.cs-row.cs-v-bottom{align-items:end}
.cs-row.cs-v-stretch{align-items:stretch}
.cs-col{display:flex;flex-direction:column;min-width:0}
.cs-card{padding:clamp(20px,3cqi,36px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface)}
.cs-b{margin-bottom:16px}
.cs-col > .cs-b:last-child{margin-bottom:0}
.cs-a-left{text-align:left}
.cs-a-center{text-align:center}
.cs-a-right{text-align:right}
.cs-eyebrow{display:block}
.cs-h{color:var(--st-text)}
.cs-h-s{font-size:clamp(20px,1cqi + 14px,24px)}
.cs-h-m{font-size:clamp(24px,1.6cqi + 14px,32px)}
.cs-h-l{font-size:clamp(30px,2.6cqi + 16px,48px)}
.cs-h-xl{font-size:clamp(36px,4cqi + 16px,68px)}
.cs-p{color:var(--st-muted)}
.cs-p-s{font-size:15px}
.cs-p-m{font-size:17px}
.cs-p-l{font-size:clamp(17px,1.2cqi + 12px,20px);line-height:1.65}
.cs-img img{display:block;max-width:100%;height:auto}
.cs-img.cs-a-center img{margin-left:auto;margin-right:auto}
.cs-img.cs-a-right img{margin-left:auto}
.cs-round{border-radius:calc(var(--st-radius) * 1px)}
.cs-btns{display:flex;flex-wrap:wrap;gap:12px}
.cs-btns.cs-a-center{justify-content:center}
.cs-btns.cs-a-right{justify-content:flex-end}
.cs-link{color:var(--st-brand);font-weight:700;text-decoration:underline;text-underline-offset:3px}
.cs-list{display:flex;flex-direction:column;gap:8px;padding-left:1.25em}
.cs-list.st-checks{padding-left:0}
.cs-list.cs-a-center,.cs-list.cs-a-right{align-items:center}
.cs-list.cs-a-right{align-items:flex-end}
.cs-list-bullets{list-style:disc}
.cs-list-numbers{list-style:decimal}
.cs-spacer{margin:0}
.cs-hr{height:1px;border:0;background:color-mix(in srgb,var(--st-text) 14%,transparent)}
.cs-hr.cs-a-center{margin-left:auto;margin-right:auto}
.cs-hr.cs-a-right{margin-left:auto}
.cs-html{min-width:0}
.cs-html iframe{max-width:100%}
@container st (max-width:900px){
.cs-row[data-stack=tablet]{grid-template-columns:1fr}
.cs-row[data-stack=tablet][data-reverse]{display:flex;flex-direction:column-reverse}
}
@container st (max-width:600px){
.cs-row[data-stack=phone]{grid-template-columns:1fr}
.cs-row[data-stack=phone][data-reverse]{display:flex;flex-direction:column-reverse}
}`,
};
