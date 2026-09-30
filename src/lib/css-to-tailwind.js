
// Tailwind spacing scale: number → px (1 unit = 4px)
export const PX_TO_TW = {
  '0':'0','1':'px','2':'0.5','4':'1','6':'1.5',
  '8':'2','10':'2.5','12':'3','14':'3.5','16':'4',
  '20':'5','24':'6','28':'7','32':'8','36':'9',
  '40':'10','44':'11','48':'12','56':'14','64':'16',
  '72':'18','80':'20','96':'24','112':'28','128':'32',
  '144':'36','160':'40','176':'44','192':'48','208':'52',
  '224':'56','240':'60','256':'64','288':'72','320':'80','384':'96',
};

export const PCT_TO_TW = {
  '50%':'1/2','33.333333%':'1/3','33.3333%':'1/3','33.33%':'1/3','33%':'1/3',
  '66.666667%':'2/3','66.6667%':'2/3','66.67%':'2/3','67%':'2/3',
  '25%':'1/4','75%':'3/4','20%':'1/5','40%':'2/5','60%':'3/5','80%':'4/5',
  '16.666667%':'1/6','83.333333%':'5/6','100%':'full',
  '100vw':'screen','100vh':'screen',
};

export function toSpace(raw) {
  const v = raw.trim();
  if (!v || v === '0' || v === '0px' || v === '0rem' || v === '0%') return '0';
  if (v === 'auto') return 'auto';
  if (PCT_TO_TW[v]) return PCT_TO_TW[v];

  // Handle negative prefix
  const neg = v.startsWith('-');
  const abs = neg ? v.slice(1) : v;

  const pxM = abs.match(/^(\d*\.?\d+)px$/);
  if (pxM) {
    const tw = PX_TO_TW[String(Math.round(parseFloat(pxM[1])))];
    if (tw != null) return neg && tw !== '0' ? `-${tw}` : tw;
    return `[${v}]`;
  }

  const remM = abs.match(/^(\d*\.?\d+)rem$/);
  if (remM) {
    const px = Math.round(parseFloat(remM[1]) * 16);
    const tw = PX_TO_TW[String(px)];
    if (tw != null) return neg && tw !== '0' ? `-${tw}` : tw;
    return `[${v}]`;
  }

  return `[${v}]`;
}

// Emit "prefix-N" but handle negatives as "-prefix-N"
export function sp(prefix, value) {
  const s = toSpace(value);
  if (s.startsWith('-')) return `-${prefix}-${s.slice(1)}`;
  return `${prefix}-${s}`;
}

/* ════════════════════════════════════════════════════════════════
   Color helpers
════════════════════════════════════════════════════════════════ */

export const CSS_COLOR_MAP = {
  white:'white', black:'black', transparent:'transparent',
  currentcolor:'current', inherit:'inherit',
  // Reds
  red:'red-500', darkred:'red-800', firebrick:'red-700', crimson:'red-600',
  tomato:'red-500', coral:'red-400', salmon:'red-400', indianred:'red-500',
  // Oranges
  orange:'orange-500', darkorange:'orange-600', orangered:'orange-600',
  // Yellows
  yellow:'yellow-300', gold:'yellow-400', lightyellow:'yellow-50',
  // Greens
  green:'green-700', darkgreen:'green-900', lime:'green-400',
  limegreen:'green-500', forestgreen:'green-700', springgreen:'green-400',
  palegreen:'green-200', lightgreen:'green-300', yellowgreen:'lime-500',
  chartreuse:'lime-400', olivedrab:'lime-700', olive:'yellow-700',
  // Blues
  blue:'blue-600', darkblue:'blue-900', mediumblue:'blue-700',
  royalblue:'blue-600', cornflowerblue:'blue-400', steelblue:'blue-500',
  dodgerblue:'blue-500', deepskyblue:'sky-400', lightskyblue:'sky-300',
  skyblue:'sky-300', lightblue:'sky-200', navy:'blue-900',
  midnightblue:'blue-950', indigo:'indigo-700', slateblue:'indigo-500',
  blueviolet:'violet-600', darkviolet:'violet-700',
  // Purples
  purple:'purple-600', darkmagenta:'purple-800', orchid:'purple-400',
  plum:'purple-300', violet:'violet-400', darkorchid:'purple-600',
  deeppink:'pink-500', hotpink:'pink-400', lightpink:'pink-200',
  pink:'pink-300', fuchsia:'fuchsia-500', magenta:'fuchsia-500',
  mediumvioletred:'pink-700',
  // Cyans / Teals
  cyan:'cyan-400', aqua:'cyan-400', darkcyan:'cyan-700', teal:'teal-600',
  turquoise:'teal-400', lightcyan:'cyan-100', paleturquoise:'teal-200',
  // Grays
  gray:'gray-500', grey:'gray-500', darkgray:'gray-600', darkgrey:'gray-600',
  lightgray:'gray-300', lightgrey:'gray-300', silver:'gray-400',
  gainsboro:'gray-200', whitesmoke:'gray-100', dimgray:'gray-600',
  slategray:'slate-500', slategrey:'slate-500', darkslategray:'slate-700',
};

export function colorClass(prefix, value) {
  const v = value.trim();
  const vl = v.toLowerCase();
  if (CSS_COLOR_MAP[vl]) return `${prefix}-${CSS_COLOR_MAP[vl]}`;
  // Hex / rgb / hsl → arbitrary
  if (vl.startsWith('#') || vl.startsWith('rgb') || vl.startsWith('hsl')) {
    return `${prefix}-[${v.replace(/ /g, '_')}]`;
  }
  return `${prefix}-[${v}]`;
}

// Shared border-shorthand parser for `border` and the four directional
// variants (border-top/-right/-bottom/-left). The previous per-property
// regexes required an *integer* pixel width (`\d+px`), so any decimal width —
// `1.5px`, used throughout this codebase's own snippets — failed to match
// and fell through to a bare `border`/`border-t` with width AND color both
// silently dropped. They also never extracted color at all for the
// directional variants, so `border-top: 3px solid var(--c)` lost its color
// even with an integer width. This parser fixes both: decimal widths match,
// and width/style/color are always extracted together.
function parseBorderShorthand(raw) {
  const v = raw.trim();
  return v.match(/^(\d+(?:\.\d+)?px)\s+(solid|dashed|dotted|double)?\s*(.+)?$/);
}
const BORDER_WIDTH_TW = { '0px': '0', '1px': '', '2px': '2', '4px': '4', '8px': '8' };
function borderSide(abbr, raw) {
  const v = raw.trim();
  if (v === 'none' || v === '0' || v === '0px') return `border-${abbr}-0`;
  const m = parseBorderShorthand(v);
  if (!m) return `border-${abbr}`;
  const [, wpx, styleWord, colorVal] = m;
  const wTw = BORDER_WIDTH_TW[wpx];
  const wCls = wTw !== undefined ? (wTw ? `border-${abbr}-${wTw}` : `border-${abbr}`) : `border-${abbr}-[${wpx}]`;
  const styleCls = styleWord === 'dashed' ? ' border-dashed' : styleWord === 'dotted' ? ' border-dotted' : '';
  const colorCls = colorVal ? ` ${colorClass(`border-${abbr}`, colorVal.trim())}` : '';
  return `${wCls}${styleCls}${colorCls}`;
}

/* ════════════════════════════════════════════════════════════════
   Property converters  (prop → tailwind class string)
════════════════════════════════════════════════════════════════ */

export const CONV = {
  // ── Display ──────────────────────────────────────────────────
  display: v => ({
    none:'hidden', flex:'flex', 'inline-flex':'inline-flex',
    grid:'grid', 'inline-grid':'inline-grid', block:'block',
    inline:'inline', 'inline-block':'inline-block', contents:'contents',
    'flow-root':'flow-root', 'list-item':'list-item',
    table:'table', 'table-row':'table-row', 'table-cell':'table-cell',
  }[v] || `[display:${v}]`),

  // ── Position ──────────────────────────────────────────────────
  position: v => ({ static:'static', relative:'relative', absolute:'absolute', fixed:'fixed', sticky:'sticky' }[v] || `[position:${v}]`),
  top:    v => sp('top', v),
  right:  v => sp('right', v),
  bottom: v => sp('bottom', v),
  left:   v => sp('left', v),
  inset:  v => {
    const parts = v.trim().split(/\s+/);
    if (parts.length === 2) return `inset-y-${toSpace(parts[0])} inset-x-${toSpace(parts[1])}`;
    return sp('inset', v);
  },
  'inset-x': v => sp('inset-x', v),
  'inset-y': v => sp('inset-y', v),

  // ── Z-index ───────────────────────────────────────────────────
  'z-index': v => (['0','10','20','30','40','50'].includes(v) ? `z-${v}` : v === 'auto' ? 'z-auto' : `z-[${v}]`),

  // ── Flexbox ───────────────────────────────────────────────────
  'flex-direction': v => ({
    row:'flex-row', 'row-reverse':'flex-row-reverse',
    column:'flex-col', 'column-reverse':'flex-col-reverse',
  }[v] || `[flex-direction:${v}]`),
  'flex-wrap': v => ({ nowrap:'flex-nowrap', wrap:'flex-wrap', 'wrap-reverse':'flex-wrap-reverse' }[v] || `[flex-wrap:${v}]`),
  'justify-content': v => ({
    'flex-start':'justify-start', 'flex-end':'justify-end', center:'justify-center',
    'space-between':'justify-between', 'space-around':'justify-around',
    'space-evenly':'justify-evenly', stretch:'justify-stretch',
    start:'justify-start', end:'justify-end', normal:'justify-normal',
  }[v] || `justify-[${v}]`),
  'justify-items': v => ({ start:'justify-items-start', end:'justify-items-end', center:'justify-items-center', stretch:'justify-items-stretch' }[v] || `justify-items-[${v}]`),
  'align-items': v => ({
    'flex-start':'items-start', 'flex-end':'items-end', center:'items-center',
    baseline:'items-baseline', stretch:'items-stretch', start:'items-start', end:'items-end',
  }[v] || `items-[${v}]`),
  'align-content': v => ({
    'flex-start':'content-start', 'flex-end':'content-end', center:'content-center',
    'space-between':'content-between', 'space-around':'content-around',
    'space-evenly':'content-evenly', stretch:'content-stretch', baseline:'content-baseline',
  }[v] || `content-[${v}]`),
  'align-self': v => ({
    auto:'self-auto', 'flex-start':'self-start', 'flex-end':'self-end',
    center:'self-center', baseline:'self-baseline', stretch:'self-stretch',
  }[v] || `self-[${v}]`),
  flex: v => ({ '1':'flex-1', auto:'flex-auto', initial:'flex-initial', none:'flex-none' }[v] || `flex-[${v}]`),
  'flex-grow':   v => (v === '1' ? 'grow'   : v === '0' ? 'grow-0'   : `[flex-grow:${v}]`),
  'flex-shrink': v => (v === '1' ? 'shrink' : v === '0' ? 'shrink-0' : `[flex-shrink:${v}]`),
  'flex-basis':  v => { const s = toSpace(v); return s.startsWith('[') ? `basis-${s}` : `basis-${s}`; },
  order: v => (['first','last','none'].includes(v) ? `order-${v}` : /^\d+$/.test(v) && +v <= 12 ? `order-${v}` : `order-[${v}]`),

  // ── Grid ──────────────────────────────────────────────────────
  'grid-template-columns': v => {
    if (v === 'none') return 'grid-cols-none';
    const m = v.match(/^repeat\((\d+),\s*(?:minmax\(0,\s*)?1fr\)?\s*\)$/);
    if (m) return `grid-cols-${m[1]}`;
    // The fr-count heuristic ("1fr 1fr 1fr" → grid-cols-3) only applies to a plain
    // track list. A responsive value like repeat(auto-fill, minmax(190px, 1fr))
    // also contains "1fr" but must NOT collapse to grid-cols-1 — emit it verbatim
    // as an arbitrary value so auto-fill/auto-fit grids keep working.
    if (!/repeat\(|auto-fill|auto-fit|minmax\(/.test(v)) {
      const frCount = (v.match(/\b1fr\b/g) || []).length;
      if (frCount >= 1 && frCount <= 12) return `grid-cols-${frCount}`;
    }
    return `grid-cols-[${v.replace(/ /g,'_')}]`;
  },
  'grid-template-rows': v => {
    if (v === 'none') return 'grid-rows-none';
    const m = v.match(/^repeat\((\d+),\s*1fr\)$/);
    if (m) return `grid-rows-${m[1]}`;
    return `grid-rows-[${v.replace(/ /g,'_')}]`;
  },
  'grid-column': v => {
    if (v === 'auto') return 'col-auto';
    if (v === '1 / -1') return 'col-span-full';
    const m = v.match(/^span\s+(\d+)/);
    if (m) return `col-span-${m[1]}`;
    return `col-[${v.replace(/ /g,'_')}]`;
  },
  'grid-row': v => {
    if (v === 'auto') return 'row-auto';
    const m = v.match(/^span\s+(\d+)/);
    if (m) return `row-span-${m[1]}`;
    return `row-[${v.replace(/ /g,'_')}]`;
  },
  gap: v => {
    const parts = v.trim().split(/\s+/);
    if (parts.length === 2) return `gap-y-${toSpace(parts[0])} gap-x-${toSpace(parts[1])}`;
    return `gap-${toSpace(v)}`;
  },
  'column-gap': v => `gap-x-${toSpace(v)}`,
  'row-gap':    v => `gap-y-${toSpace(v)}`,
  'grid-gap':   v => `gap-${toSpace(v)}`,

  // ── Margin ────────────────────────────────────────────────────
  margin: v => {
    const parts = v.trim().split(/\s+/);
    if (parts.length === 1) return sp('m', v);
    if (parts.length === 2) return `${sp('my', parts[0])} ${sp('mx', parts[1])}`;
    if (parts.length === 3) return `${sp('mt', parts[0])} ${sp('mx', parts[1])} ${sp('mb', parts[2])}`;
    if (parts.length === 4) return `${sp('mt', parts[0])} ${sp('mr', parts[1])} ${sp('mb', parts[2])} ${sp('ml', parts[3])}`;
    return `m-[${v}]`;
  },
  'margin-top':    v => sp('mt', v),
  'margin-right':  v => sp('mr', v),
  'margin-bottom': v => sp('mb', v),
  'margin-left':   v => sp('ml', v),
  'margin-inline': v => { const p = v.trim().split(/\s+/); return p.length === 2 ? `${sp('ms', p[0])} ${sp('me', p[1])}` : sp('mx', v); },
  'margin-block':  v => sp('my', v),

  // ── Padding ───────────────────────────────────────────────────
  padding: v => {
    const parts = v.trim().split(/\s+/);
    if (parts.length === 1) return `p-${toSpace(v)}`;
    if (parts.length === 2) return `py-${toSpace(parts[0])} px-${toSpace(parts[1])}`;
    if (parts.length === 3) return `pt-${toSpace(parts[0])} px-${toSpace(parts[1])} pb-${toSpace(parts[2])}`;
    if (parts.length === 4) return `pt-${toSpace(parts[0])} pr-${toSpace(parts[1])} pb-${toSpace(parts[2])} pl-${toSpace(parts[3])}`;
    return `p-[${v}]`;
  },
  'padding-top':    v => `pt-${toSpace(v)}`,
  'padding-right':  v => `pr-${toSpace(v)}`,
  'padding-bottom': v => `pb-${toSpace(v)}`,
  'padding-left':   v => `pl-${toSpace(v)}`,
  'padding-inline': v => { const p = v.trim().split(/\s+/); return p.length === 2 ? `ps-${toSpace(p[0])} pe-${toSpace(p[1])}` : `px-${toSpace(v)}`; },
  'padding-block':  v => `py-${toSpace(v)}`,

  // ── Width / Height ────────────────────────────────────────────
  width: v => {
    if (v === 'fit-content') return 'w-fit';
    if (v === 'max-content') return 'w-max';
    if (v === 'min-content') return 'w-min';
    if (v === '100vw') return 'w-screen';
    return `w-${toSpace(v)}`;
  },
  height: v => {
    if (v === 'fit-content') return 'h-fit';
    if (v === 'max-content') return 'h-max';
    if (v === 'min-content') return 'h-min';
    if (v === '100vh') return 'h-screen';
    return `h-${toSpace(v)}`;
  },
  'min-width': v => {
    const M = { '0':'min-w-0','0px':'min-w-0', 'fit-content':'min-w-fit', 'max-content':'min-w-max', 'min-content':'min-w-min', '100%':'min-w-full' };
    return M[v] || `min-w-[${v}]`;
  },
  'max-width': v => {
    const M = { none:'max-w-none','0':'max-w-0','0px':'max-w-0','320px':'max-w-xs','384px':'max-w-sm','448px':'max-w-md','512px':'max-w-lg','576px':'max-w-xl','672px':'max-w-2xl','768px':'max-w-3xl','896px':'max-w-4xl','1024px':'max-w-5xl','1152px':'max-w-6xl','1280px':'max-w-7xl','100%':'max-w-full','100vw':'max-w-screen','fit-content':'max-w-fit','max-content':'max-w-max','min-content':'max-w-min','65ch':'max-w-prose' };
    return M[v] || `max-w-[${v}]`;
  },
  'min-height': v => {
    const M = { '0':'min-h-0','0px':'min-h-0','100vh':'min-h-screen','100%':'min-h-full','fit-content':'min-h-fit','max-content':'min-h-max','min-content':'min-h-min' };
    return M[v] || `min-h-[${v}]`;
  },
  'max-height': v => {
    const M = { none:'max-h-none','100vh':'max-h-screen','100%':'max-h-full','fit-content':'max-h-fit','max-content':'max-h-max','min-content':'max-h-min' };
    if (M[v]) return M[v];
    return `max-h-${toSpace(v)}`;
  },

  // ── Typography ────────────────────────────────────────────────
  'font-size': v => {
    const M = {
      '10px':'text-xs','0.625rem':'text-xs',
      '12px':'text-xs','0.75rem':'text-xs',
      '14px':'text-sm','0.875rem':'text-sm',
      '16px':'text-base','1rem':'text-base',
      '18px':'text-lg','1.125rem':'text-lg',
      '20px':'text-xl','1.25rem':'text-xl',
      '24px':'text-2xl','1.5rem':'text-2xl',
      '30px':'text-3xl','1.875rem':'text-3xl',
      '36px':'text-4xl','2.25rem':'text-4xl',
      '48px':'text-5xl','3rem':'text-5xl',
      '60px':'text-6xl','3.75rem':'text-6xl',
      '72px':'text-7xl','4.5rem':'text-7xl',
      '96px':'text-8xl','6rem':'text-8xl',
      '128px':'text-9xl','8rem':'text-9xl',
    };
    return M[v] || `text-[${v}]`;
  },
  'font-weight': v => ({
    '100':'font-thin','200':'font-extralight','300':'font-light',
    '400':'font-normal','500':'font-medium','600':'font-semibold',
    '700':'font-bold','800':'font-extrabold','900':'font-black',
    thin:'font-thin',extralight:'font-extralight',light:'font-light',
    normal:'font-normal',medium:'font-medium',semibold:'font-semibold',
    bold:'font-bold',extrabold:'font-extrabold',black:'font-black',
  }[v] || `font-[${v}]`),
  'font-style': v => ({ italic:'italic', normal:'not-italic', oblique:'italic' }[v] || `[font-style:${v}]`),
  'font-family': v => {
    const vl = v.toLowerCase();
    if (/\bmono\b|monospace|courier|consolas|'fira|cascadia|jetbrains/.test(vl)) return 'font-mono';
    if (/\bserif\b/.test(vl) && !/sans/.test(vl)) return 'font-serif';
    if (/sans/.test(vl)) return 'font-sans';
    return `font-[${v.replace(/ /g,'_')}]`;
  },
  'text-align': v => ({ left:'text-left', center:'text-center', right:'text-right', justify:'text-justify', start:'text-start', end:'text-end' }[v] || `[text-align:${v}]`),
  'line-height': v => ({
    none:'leading-none','1':'leading-none',
    tight:'leading-tight','1.25':'leading-tight',
    snug:'leading-snug','1.375':'leading-snug',
    normal:'leading-normal','1.5':'leading-normal',
    relaxed:'leading-relaxed','1.625':'leading-relaxed',
    loose:'leading-loose','2':'leading-loose',
    '3':'leading-3','4':'leading-4','5':'leading-5','6':'leading-6',
    '7':'leading-7','8':'leading-8','9':'leading-9','10':'leading-10',
  }[v] || `leading-[${v}]`),
  'letter-spacing': v => ({
    '-0.05em':'tracking-tighter','tighter':'tracking-tighter',
    '-0.025em':'tracking-tight','tight':'tracking-tight',
    '0':'tracking-normal','0em':'tracking-normal','normal':'tracking-normal',
    '0.025em':'tracking-wide','wide':'tracking-wide',
    '0.05em':'tracking-wider','wider':'tracking-wider',
    '0.1em':'tracking-widest','widest':'tracking-widest',
  }[v] || `tracking-[${v}]`),
  'text-decoration': v => ({
    underline:'underline', overline:'overline',
    'line-through':'line-through', none:'no-underline',
  }[v] || `[text-decoration:${v}]`),
  'text-transform': v => ({ uppercase:'uppercase', lowercase:'lowercase', capitalize:'capitalize', none:'normal-case' }[v] || `[text-transform:${v}]`),
  'vertical-align': v => ({
    top:'align-top', middle:'align-middle', bottom:'align-bottom',
    baseline:'align-baseline', 'text-top':'align-text-top', 'text-bottom':'align-text-bottom',
    sub:'align-sub', super:'align-super',
  }[v] || `align-[${v}]`),
  'white-space': v => ({
    normal:'whitespace-normal', nowrap:'whitespace-nowrap', pre:'whitespace-pre',
    'pre-line':'whitespace-pre-line', 'pre-wrap':'whitespace-pre-wrap',
    'break-spaces':'whitespace-break-spaces',
  }[v] || `whitespace-[${v}]`),
  'word-break': v => ({ normal:'break-normal', 'break-all':'break-all', 'keep-all':'break-keep' }[v] || `[word-break:${v}]`),
  'overflow-wrap': v => ({ normal:'break-normal', 'break-word':'break-words', anywhere:'break-anywhere' }[v] || `[overflow-wrap:${v}]`),
  'word-wrap': v => ({ normal:'break-normal', 'break-word':'break-words' }[v] || `[word-wrap:${v}]`),
  'text-overflow': v => ({ ellipsis:'text-ellipsis', clip:'text-clip' }[v] || `[text-overflow:${v}]`),
  'text-indent': v => `indent-${toSpace(v)}`,

  // ── Colors ────────────────────────────────────────────────────
  color:             v => colorClass('text', v),
  'background-color':v => colorClass('bg', v),
  background: v => {
    const vt = v.trim();
    if (vt === 'none' || vt === 'transparent') return 'bg-transparent';
    if (/^(#|rgb|rgba|hsl|hsla)/.test(vt) || CSS_COLOR_MAP[vt.toLowerCase()]) return colorClass('bg', vt);
    // Gradients, images, and var() (which may hold a gradient) go through the
    // arbitrary *property* so the full `background` shorthand is emitted exactly.
    // A bare bg-[var(--x)] compiles to background-COLOR, which silently drops a
    // gradient value — leaving the element transparent.
    return `[background:${vt.replace(/ /g,'_')}]`;
  },
  'border-color': v => colorClass('border', v),
  'outline-color': v => colorClass('outline', v),
  'caret-color':  v => colorClass('caret', v),
  'accent-color': v => colorClass('accent', v),
  fill:   v => (v === 'none' ? 'fill-none' : v === 'currentColor' || v === 'currentcolor' ? 'fill-current' : colorClass('fill', v)),
  stroke: v => (v === 'none' ? 'stroke-none' : v === 'currentColor' || v === 'currentcolor' ? 'stroke-current' : colorClass('stroke', v)),

  // ── Border ────────────────────────────────────────────────────
  border: v => {
    if (v === 'none' || v === '0') return 'border-0';
    // "1px solid #color" pattern
    const solidM = v.match(/^(\d+px)\s+solid(?:\s+(.+))?$/);
    if (solidM) {
      const w = {'1px':'border','2px':'border-2','4px':'border-4','8px':'border-8'}[solidM[1]] || `border-[${solidM[1]}]`;
      const col = solidM[2] ? ` ${colorClass('border', solidM[2].trim())}` : '';
      return `${w}${col}`.trim();
    }
    if (v.includes('solid')) return 'border';
    if (v.includes('dashed')) return 'border border-dashed';
    if (v.includes('dotted')) return 'border border-dotted';
    return `border-[${v.replace(/ /g,'_')}]`;
  },
  'border-top':    v => borderSide('t', v),
  'border-right':  v => borderSide('r', v),
  'border-bottom': v => borderSide('b', v),
  'border-left':   v => borderSide('l', v),
  'border-width': v => ({ '0':'border-0','0px':'border-0','1px':'border','2px':'border-2','4px':'border-4','8px':'border-8' }[v] || `border-[${v}]`),
  'border-top-width':    v => ({ '0':'border-t-0','0px':'border-t-0','1px':'border-t','2px':'border-t-2','4px':'border-t-4','8px':'border-t-8' }[v] || `border-t-[${v}]`),
  'border-right-width':  v => ({ '0':'border-r-0','0px':'border-r-0','1px':'border-r','2px':'border-r-2','4px':'border-r-4','8px':'border-r-8' }[v] || `border-r-[${v}]`),
  'border-bottom-width': v => ({ '0':'border-b-0','0px':'border-b-0','1px':'border-b','2px':'border-b-2','4px':'border-b-4','8px':'border-b-8' }[v] || `border-b-[${v}]`),
  'border-left-width':   v => ({ '0':'border-l-0','0px':'border-l-0','1px':'border-l','2px':'border-l-2','4px':'border-l-4','8px':'border-l-8' }[v] || `border-l-[${v}]`),
  'border-style': v => ({ solid:'border-solid', dashed:'border-dashed', dotted:'border-dotted', double:'border-double', none:'border-none', hidden:'border-hidden' }[v] || `[border-style:${v}]`),
  'border-radius': v => {
    const M = { '0':'rounded-none','0px':'rounded-none','2px':'rounded-sm','0.125rem':'rounded-sm','4px':'rounded','0.25rem':'rounded','6px':'rounded-md','0.375rem':'rounded-md','8px':'rounded-lg','0.5rem':'rounded-lg','12px':'rounded-xl','0.75rem':'rounded-xl','16px':'rounded-2xl','1rem':'rounded-2xl','24px':'rounded-3xl','1.5rem':'rounded-3xl','9999px':'rounded-full','50%':'rounded-full','100%':'rounded-full' };
    return M[v] || `rounded-[${v}]`;
  },
  'border-top-left-radius':     v => { const M = {'0':'rounded-tl-none','2px':'rounded-tl-sm','4px':'rounded-tl','6px':'rounded-tl-md','8px':'rounded-tl-lg','12px':'rounded-tl-xl','16px':'rounded-tl-2xl','24px':'rounded-tl-3xl','9999px':'rounded-tl-full','50%':'rounded-tl-full'}; return M[v]||`rounded-tl-[${v}]`; },
  'border-top-right-radius':    v => { const M = {'0':'rounded-tr-none','2px':'rounded-tr-sm','4px':'rounded-tr','6px':'rounded-tr-md','8px':'rounded-tr-lg','12px':'rounded-tr-xl','16px':'rounded-tr-2xl','24px':'rounded-tr-3xl','9999px':'rounded-tr-full','50%':'rounded-tr-full'}; return M[v]||`rounded-tr-[${v}]`; },
  'border-bottom-left-radius':  v => { const M = {'0':'rounded-bl-none','2px':'rounded-bl-sm','4px':'rounded-bl','6px':'rounded-bl-md','8px':'rounded-bl-lg','12px':'rounded-bl-xl','16px':'rounded-bl-2xl','24px':'rounded-bl-3xl','9999px':'rounded-bl-full','50%':'rounded-bl-full'}; return M[v]||`rounded-bl-[${v}]`; },
  'border-bottom-right-radius': v => { const M = {'0':'rounded-br-none','2px':'rounded-br-sm','4px':'rounded-br','6px':'rounded-br-md','8px':'rounded-br-lg','12px':'rounded-br-xl','16px':'rounded-br-2xl','24px':'rounded-br-3xl','9999px':'rounded-br-full','50%':'rounded-br-full'}; return M[v]||`rounded-br-[${v}]`; },

  // ── Overflow ──────────────────────────────────────────────────
  overflow:   v => ({ hidden:'overflow-hidden', auto:'overflow-auto', scroll:'overflow-scroll', visible:'overflow-visible', clip:'overflow-clip' }[v] || `overflow-[${v}]`),
  'overflow-x': v => ({ hidden:'overflow-x-hidden', auto:'overflow-x-auto', scroll:'overflow-x-scroll', visible:'overflow-x-visible', clip:'overflow-x-clip' }[v] || `overflow-x-[${v}]`),
  'overflow-y': v => ({ hidden:'overflow-y-hidden', auto:'overflow-y-auto', scroll:'overflow-y-scroll', visible:'overflow-y-visible', clip:'overflow-y-clip' }[v] || `overflow-y-[${v}]`),

  // ── Opacity ───────────────────────────────────────────────────
  opacity: v => {
    const n = parseFloat(v);
    if (!isNaN(n)) {
      const pct = Math.round(n <= 1 ? n * 100 : n);
      const valid = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
      if (valid.includes(pct)) return `opacity-${pct}`;
      return `opacity-[${v}]`;
    }
    return `opacity-[${v}]`;
  },

  // ── Cursor ────────────────────────────────────────────────────
  cursor: v => {
    const M = {
      auto:'cursor-auto', default:'cursor-default', pointer:'cursor-pointer',
      wait:'cursor-wait', text:'cursor-text', move:'cursor-move', help:'cursor-help',
      none:'cursor-none', 'not-allowed':'cursor-not-allowed', progress:'cursor-progress',
      crosshair:'cursor-crosshair', cell:'cursor-cell', grab:'cursor-grab',
      grabbing:'cursor-grabbing', 'zoom-in':'cursor-zoom-in', 'zoom-out':'cursor-zoom-out',
      copy:'cursor-copy', alias:'cursor-alias', 'no-drop':'cursor-no-drop',
      'col-resize':'cursor-col-resize', 'row-resize':'cursor-row-resize',
      'ew-resize':'cursor-ew-resize', 'ns-resize':'cursor-ns-resize',
      'context-menu':'cursor-context-menu', 'vertical-text':'cursor-vertical-text',
    };
    return M[v] || `cursor-[${v}]`;
  },

  // ── Misc ──────────────────────────────────────────────────────
  visibility:      v => ({ visible:'visible', hidden:'invisible', collapse:'collapse' }[v] || `[visibility:${v}]`),
  'user-select':   v => ({ none:'select-none', text:'select-text', all:'select-all', auto:'select-auto' }[v] || `[user-select:${v}]`),
  'pointer-events':v => ({ none:'pointer-events-none', auto:'pointer-events-auto' }[v] || `[pointer-events:${v}]`),
  resize:          v => ({ none:'resize-none', both:'resize', x:'resize-x', y:'resize-y', horizontal:'resize-x', vertical:'resize-y' }[v] || `[resize:${v}]`),
  appearance:      v => ({ none:'appearance-none', auto:'appearance-auto' }[v] || `[appearance:${v}]`),
  'list-style-type': v => ({ none:'list-none', disc:'list-disc', decimal:'list-decimal' }[v] || `list-[${v}]`),
  'list-style-position': v => ({ inside:'list-inside', outside:'list-outside' }[v] || `[list-style-position:${v}]`),
  float: v => ({ left:'float-left', right:'float-right', none:'float-none' }[v] || `float-[${v}]`),
  clear: v => ({ left:'clear-left', right:'clear-right', both:'clear-both', none:'clear-none' }[v] || `clear-[${v}]`),
  'object-fit': v => ({ contain:'object-contain', cover:'object-cover', fill:'object-fill', none:'object-none', 'scale-down':'object-scale-down' }[v] || `object-[${v}]`),
  'object-position': v => {
    const M = { center:'object-center', top:'object-top', bottom:'object-bottom', left:'object-left', right:'object-right', 'left top':'object-left-top', 'left bottom':'object-left-bottom', 'right top':'object-right-top', 'right bottom':'object-right-bottom' };
    return M[v] || `object-[${v.replace(/ /g,'_')}]`;
  },
  'aspect-ratio': v => {
    if (v === 'auto') return 'aspect-auto';
    if (v === '1 / 1' || v === '1/1') return 'aspect-square';
    if (v === '16 / 9' || v === '16/9') return 'aspect-video';
    return `aspect-[${v.replace(/ /g,'/')}]`;
  },

  // ── Shadow ────────────────────────────────────────────────────
  'box-shadow': v => {
    if (v === 'none') return 'shadow-none';
    if (/^0\s+1px\s+2px/.test(v)) return 'shadow-sm';
    if (/^0\s+1px\s+3px/.test(v)) return 'shadow';
    if (/^0\s+4px\s+6px/.test(v)) return 'shadow-md';
    if (/^0\s+10px\s+15px/.test(v)) return 'shadow-lg';
    if (/^0\s+20px\s+25px/.test(v)) return 'shadow-xl';
    if (/^0\s+25px\s+50px/.test(v)) return 'shadow-2xl';
    if (v.includes('inset')) return `shadow-[${v.replace(/ /g,'_')}]`;
    return `shadow-[${v.replace(/ /g,'_')}]`;
  },

  // ── Outline ───────────────────────────────────────────────────
  outline: v => {
    if (v === 'none' || v === '0') return 'outline-none';
    if (v.includes('solid')) return 'outline';
    if (v.includes('dashed')) return 'outline-dashed';
    if (v.includes('dotted')) return 'outline-dotted';
    return `outline-[${v.replace(/ /g,'_')}]`;
  },
  'outline-width':  v => ({ '0':'outline-0','1px':'outline-1','2px':'outline-2','4px':'outline-4','8px':'outline-8' }[v] || `outline-[${v}]`),
  'outline-offset': v => ({ '0':'outline-offset-0','1px':'outline-offset-1','2px':'outline-offset-2','4px':'outline-offset-4','8px':'outline-offset-8' }[v] || `outline-offset-[${v}]`),

  // ── Transition / Animation ────────────────────────────────────
  transition: v => {
    if (v === 'none') return 'transition-none';
    // A multi-property transition (commas) or one with an explicit duration/easing
    // (any digit) is preserved VERBATIM as an arbitrary value. Tailwind's named
    // utilities (transition-opacity, etc.) only carry ONE property and force the
    // default 150ms — so e.g. "opacity .26s, transform .26s" would silently lose
    // the transform transition and the custom timing, making the animation snap
    // instead of glide. The arbitrary value keeps the original exactly.
    if (v.includes(',') || /\d/.test(v)) return `[transition:${v.replace(/\s+/g, '_')}]`;
    if (v.includes('all')) return 'transition-all';
    if (v.includes('opacity')) return 'transition-opacity';
    if (v.includes('transform')) return 'transition-transform';
    if (v.includes('color') || v.includes('background')) return 'transition-colors';
    if (v.includes('shadow')) return 'transition-shadow';
    return 'transition';
  },
  'transition-duration': v => {
    const M = {'0ms':'duration-0','75ms':'duration-75','100ms':'duration-100','150ms':'duration-150','200ms':'duration-200','300ms':'duration-300','500ms':'duration-500','700ms':'duration-700','1000ms':'duration-1000','0s':'duration-0','1s':'duration-1000'};
    return M[v] || `duration-[${v}]`;
  },
  'transition-timing-function': v => ({
    linear:'ease-linear', ease:'ease', 'ease-in':'ease-in',
    'ease-out':'ease-out', 'ease-in-out':'ease-in-out',
  }[v] || `[transition-timing-function:${v}]`),
  'transition-delay': v => {
    const M = {'0ms':'delay-0','75ms':'delay-75','100ms':'delay-100','150ms':'delay-150','200ms':'delay-200','300ms':'delay-300','500ms':'delay-500','700ms':'delay-700','1000ms':'delay-1000'};
    return M[v] || `delay-[${v}]`;
  },
  'animation-duration': v => {
    const M = {'75ms':'duration-75','100ms':'duration-100','150ms':'duration-150','200ms':'duration-200','300ms':'duration-300','500ms':'duration-500','700ms':'duration-700','1000ms':'duration-1000','1s':'duration-1000'};
    return M[v] || `duration-[${v}]`;
  },

  // ── Transform ────────────────────────────────────────────────
  transform: v => (v === 'none' ? 'transform-none' : `[transform:${v.replace(/ /g,'_')}]`),

  // ── Background extras ─────────────────────────────────────────
  'background-size': v => ({ cover:'bg-cover', contain:'bg-contain', auto:'bg-auto' }[v] || `bg-[size:${v.replace(/ /g,'_')}]`),
  'background-position': v => {
    const M = { center:'bg-center', top:'bg-top', bottom:'bg-bottom', left:'bg-left', right:'bg-right', 'left top':'bg-left-top', 'left bottom':'bg-left-bottom', 'right top':'bg-right-top', 'right bottom':'bg-right-bottom' };
    return M[v] || `bg-[position:${v.replace(/ /g,'_')}]`;
  },
  'background-repeat': v => ({ 'no-repeat':'bg-no-repeat', repeat:'bg-repeat', 'repeat-x':'bg-repeat-x', 'repeat-y':'bg-repeat-y', 'round':'bg-repeat-round', space:'bg-repeat-space' }[v] || `[background-repeat:${v}]`),
  'background-attachment': v => ({ fixed:'bg-fixed', local:'bg-local', scroll:'bg-scroll' }[v] || `[background-attachment:${v}]`),
  'background-clip': v => ({ 'border-box':'bg-clip-border','padding-box':'bg-clip-padding','content-box':'bg-clip-content', text:'bg-clip-text' }[v] || `[background-clip:${v}]`),
};

/* ════════════════════════════════════════════════════════════════
   CSS Parser
════════════════════════════════════════════════════════════════ */

export function parseDeclarations(block) {
  const decls = [];
  let cur = '';
  let inStr = false;
  let strCh = '';
  let depth = 0;

  for (const ch of block) {
    if ((ch === '"' || ch === "'") && !inStr) { inStr = true; strCh = ch; cur += ch; }
    else if (ch === strCh && inStr) { inStr = false; cur += ch; }
    else if (ch === '(' && !inStr) { depth++; cur += ch; }
    else if (ch === ')' && !inStr) { depth--; cur += ch; }
    else if (ch === ';' && !inStr && depth === 0) {
      const t = cur.trim();
      const ci = t.indexOf(':');
      if (ci > 0) {
        const prop = t.slice(0, ci).trim().toLowerCase();
        const val  = t.slice(ci + 1).trim();
        if (prop && val) decls.push({ prop, val });
      }
      cur = '';
    } else cur += ch;
  }
  // trailing declaration without semicolon
  const t = cur.trim();
  const ci = t.indexOf(':');
  if (ci > 0) {
    const prop = t.slice(0, ci).trim().toLowerCase();
    const val  = t.slice(ci + 1).trim();
    if (prop && val) decls.push({ prop, val });
  }
  return decls;
}

export function parseCss(css) {
  const rules = [];
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  if (!cleaned.includes('{')) {
    const decls = parseDeclarations(cleaned);
    if (decls.length) rules.push({ selector: null, decls });
    return rules;
  }

  let i = 0;
  while (i < cleaned.length) {
    while (i < cleaned.length && /\s/.test(cleaned[i])) i++;
    if (i >= cleaned.length) break;

    const braceIdx = cleaned.indexOf('{', i);
    if (braceIdx === -1) break;

    const selector = cleaned.slice(i, braceIdx).trim();
    let depth = 1;
    let j = braceIdx + 1;
    while (j < cleaned.length && depth > 0) {
      if (cleaned[j] === '{') depth++;
      else if (cleaned[j] === '}') depth--;
      j++;
    }

    const block = cleaned.slice(braceIdx + 1, j - 1);

    if (selector.startsWith('@') && block.includes('{')) {
      const nested = parseCss(block);
      for (const nr of nested) {
        rules.push({ selector: nr.selector ? `${selector} → ${nr.selector}` : selector, decls: nr.decls });
      }
    } else {
      const decls = parseDeclarations(block);
      if (decls.length) rules.push({ selector: selector || null, decls });
    }
    i = j;
  }
  return rules;
}

/* ════════════════════════════════════════════════════════════════
   Main conversion
════════════════════════════════════════════════════════════════ */

export function convert(css) {
  const rules = parseCss(css);
  let totalClasses = 0;
  let unknownCount = 0;

  const converted = rules.map(rule => {
    const classes = [];
    for (const { prop, val } of rule.decls) {
      const fn = CONV[prop];
      let cls;
      if (fn) {
        try { cls = fn(val); } catch { cls = `[${prop}:${val.replace(/ /g,'_')}]`; }
      } else {
        cls = `[${prop}:${val.replace(/ /g,'_')}]`;
        unknownCount++;
      }
      if (cls) {
        const tokens = cls.split(' ').filter(Boolean);
        classes.push(...tokens);
        totalClasses += tokens.length;
      }
    }
    return { selector: rule.selector, classes };
  });

  return { rules: converted, totalClasses, unknownCount };
}