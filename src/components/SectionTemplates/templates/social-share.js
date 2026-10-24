import { esc } from './meta.js';

/* Floating Social Share Bar.
   The section itself takes no space in the page (height 0): its buttons are position:fixed
   against the screen. The list of buttons, their links and the root's settings are written by
   `finalize` (called from render.js fillHtml), because every button's link and icon depends
   on its network. The share links are completed in the browser by the `share` behaviour
   (behaviors.js), which reads the real page address; `data-share` holds each link template. */

/* Brand colours are the darker official shades so white icons keep 3:1 contrast. s = stroked
   outline icon, f = filled icon. {url} {title} {text} (title + address) {image} {via} {tags}. */
const NETS = {
  facebook:   { label: 'Facebook',    color: '#1877F2', url: 'https://www.facebook.com/sharer/sharer.php?u={url}', icon: ['f', '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'] },
  x:          { label: 'X',           color: '#111111', url: 'https://x.com/intent/post?url={url}&text={title}&via={via}&hashtags={tags}', icon: ['f', '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'] },
  linkedin:   { label: 'LinkedIn',    color: '#0A66C2', url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}', icon: ['s', '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'] },
  whatsapp:   { label: 'WhatsApp',    color: '#128C7E', url: 'https://wa.me/?text={text}', icon: ['s', '<path d="M3 21l1.7-5.1A9 9 0 1 1 8.1 19.3z"/><path d="M9 8.5c0 3.300 2.700 6 6 6l1.300-1.500-2.200-1.100-.9.900c-.9-.4-1.700-1.200-2.100-2.100l.9-.9-1.100-2.200z"/>'] },
  telegram:   { label: 'Telegram',    color: '#1F8DC8', url: 'https://t.me/share/url?url={url}&text={title}', icon: ['s', '<path d="M21.500 2.500 10.500 13.500"/><path d="M21.500 2.500 14.500 21.500l-4-8-8-4z"/>'] },
  pinterest:  { label: 'Pinterest',   color: '#E60023', url: 'https://www.pinterest.com/pin/create/button/?url={url}&media={image}&description={title}', icon: ['s', '<circle cx="12" cy="12" r="10"/><path d="M10.600 18l1.400-6"/><path d="M9.600 12.800C8.700 10 10.300 7.500 12.800 7.500c2.200 0 3.500 1.500 3.500 3.300 0 2.400-1.400 4-3.200 4-.8 0-1.500-.4-1.700-1.100"/>'] },
  reddit:     { label: 'Reddit',      color: '#E03D00', url: 'https://www.reddit.com/submit?url={url}&title={title}', icon: ['s', '<ellipse cx="12" cy="14" rx="8" ry="5.500"/><circle cx="4.500" cy="11.200" r="1.600"/><circle cx="19.500" cy="11.200" r="1.600"/><circle cx="9" cy="13.500" r="1" fill="currentColor"/><circle cx="15" cy="13.500" r="1" fill="currentColor"/><path d="M9.500 16.500c1.500 1 3.500 1 5 0"/><path d="M12 8.500 13.200 3l4.300 1"/><circle cx="18.500" cy="4.500" r="1.500"/>'] },
  threads:    { label: 'Threads',     color: '#111111', url: 'https://www.threads.net/intent/post?text={text}', icon: ['s', '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>'] },
  bluesky:    { label: 'Bluesky',     color: '#0B76E0', url: 'https://bsky.app/intent/compose?text={text}', icon: ['f', '<path d="M6.500 4.800C8.800 6.500 11.300 10 12 11.700c.7-1.700 3.200-5.200 5.500-6.900 1.700-1.300 4.500-2.200 4.500.9 0 .6-.4 5.200-.6 6-.7 2.500-3.300 3.100-5.600 2.700 4 .7 5.100 2.900 2.900 5.100-4.200 4.300-6-1-6.500-2.300-.1-.3-.1-.3-.2 0-.5 1.300-2.300 6.600-6.500 2.300-2.200-2.200-1.100-4.400 2.900-5.100-2.300.4-4.900-.2-5.600-2.700C2.400 11.200 2 6.600 2 6c0-3.100 2.800-2.200 4.500-.9z"/>'] },
  tumblr:     { label: 'Tumblr',      color: '#36465D', url: 'https://www.tumblr.com/widgets/share/tool?canonicalUrl={url}&title={title}', icon: ['f', '<path d="M14.500 21.500c-3.300 0-5-1.800-5-4.800V10.500H7V7.300c2.600-.7 3.600-2.800 3.800-5.300H14v5h3.500v3.500H14v5.800c0 1.200.6 1.800 1.700 1.800h1.800v3.400z"/>'] },
  hackernews: { label: 'Hacker News', color: '#D95100', url: 'https://news.ycombinator.com/submitlink?u={url}&t={title}', icon: ['s', '<path d="M5 4l7 10 7-10"/><path d="M12 14v7"/>'] },
  line:       { label: 'LINE',        color: '#03963F', url: 'https://social-plugins.line.me/lineit/share?url={url}', icon: ['s', '<path d="M12 3C6.800 3 3 6.300 3 10.300c0 3.500 3 6.400 7.100 7 .3.100.7.200.8.500.1.300 0 .700 0 1l-.1.800c0 .3-.2 1 .9.5s5.900-3.500 8-6c1.500-1.600 2.200-3.200 2.200-4.800C22 6.300 17.200 3 12 3z"/>'] },
  email:      { label: 'Email',       color: '#6B7280', url: 'mailto:?subject={title}&body={text}', icon: ['s', '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.970 5.700a1.940 1.940 0 0 1-2.060 0L2 7"/>'] },
  copy:       { label: 'Copy link',   color: '#0F7B3F', action: 'copy', icon: ['s', '<rect width="13" height="13" x="8" y="8" rx="2.500"/><path d="M16 8V6.500A2.500 2.500 0 0 0 13.500 4h-7A2.500 2.500 0 0 0 4 6.500v7A2.500 2.500 0 0 0 6.500 16H8"/>'] },
};
export const SHARE_NETWORKS = Object.keys(NETS);

const svg = ([mode, inner], cls = 'ss-ic') => `<svg class="${cls}" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" ${mode === 'f' ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${inner}</svg>`;
const CHECK = ['s', '<path d="M20 6 9 17l-5-5"/>'];
const CHEVRON = ['s', '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>'];
const SHARE = ['s', '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.600 13.500 6.800 4M15.400 6.500l-6.800 4"/>'];

const pick = (v, allowed, dflt) => (allowed.includes(String(v)) ? String(v) : dflt);
const cssLength = (v, dflt) => {
  const s = String(v ?? '').trim();
  if (/^\d+(\.\d+)?$/.test(s)) return `${s}px`;
  return /^\d+(\.\d+)?(px|%|vh|rem|em)$/.test(s) ? s : dflt;
};

const FIELD_DEFAULTS = {
  shareUrl: '', shareTitle: '', shareVia: '', shareTags: '', shareImage: '',
  side: 'right', align: 'center', top: '50%', mobile: 'bar', look: 'network', shape: 'attached', size: 'default',
  groupLabel: 'Share this page', tabLabel: 'Share', collapseLabel: 'Hide share buttons', expandLabel: 'Show share buttons', copiedText: 'Link copied',
};

export default {
  id: 'floating-social-share',
  name: 'Floating Social Share Bar',
  version: '1.0.0',
  category: 'social',
  tags: ['social-share', 'share-buttons', 'sticky', 'floating', 'sidebar', 'facebook', 'whatsapp', 'linkedin', 'collapsible', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Social Share Buttons Template — Free Floating Sidebar',
  seoDescription: 'Free floating social share bar: stacked Facebook, X, WhatsApp, LinkedIn and more share buttons that stick to the left or right and collapse. Export the code.',
  description: 'A floating social share bar that takes no space in your layout. Share buttons stack in a column on the left or right edge of the screen, centred or at any height you choose, and each one opens the network’s share window in a new tab with your page address and title filled in. Visitors can collapse the bar into a small tab and bring it back with one click. On phones it becomes a bottom bar.',
  bestFor: ['Blog posts, news and long articles', 'Landing pages and product pages people share', 'Any site that wants share buttons without adding a section to the layout'],
  behaviors: ['share'],
  previewMinHeight: 640,
  /* Called by fillHtml with the section's markup: writes the root settings and the buttons */
  finalize: (html, state, { clean = false } = {}) => {
    const f = { ...FIELD_DEFAULTS, ...(state.fields || {}) };
    const toggles = state.toggles || {};
    const side = pick(f.side, ['left', 'right'], 'left');
    const align = pick(f.align, ['center', 'custom'], 'center');
    const top = align === 'center' ? '50%' : cssLength(f.top, '50%');
    const attrs = [
      ['data-side', side], ['data-align', align], ['style', `--ss-top:${top}`],
      ['data-mobile', pick(f.mobile, ['bar', 'side'], 'bar')],
      ['data-look', pick(f.look, ['network', 'theme', 'subtle'], 'network')],
      ['data-shape', pick(f.shape, ['attached', 'rounded', 'circle'], 'attached')],
      ['data-size', pick(f.size, ['compact', 'default', 'large'], 'default')],
      ['data-tips', toggles.showTips === false ? 'off' : 'on'],
      ['data-start', toggles.startCollapsed === true && toggles.collapsible !== false ? 'collapsed' : 'open'],
      ['data-url', String(f.shareUrl || '').trim()], ['data-title', String(f.shareTitle || '').trim()],
      ['data-via', String(f.shareVia || '').trim().replace(/^@/, '')], ['data-tags', String(f.shareTags || '').replace(/#/g, '').replace(/\s+/g, '').trim()],
      ['data-pin-image', String(f.shareImage || '').trim()], ['data-copied', String(f.copiedText || '')],
    ].filter(([, v]) => v !== '').map(([k, v]) => ` ${k}="${esc(v)}"`).join('');

    const fillUrl = tpl => {
      const v = { url: String(f.shareUrl || '').trim(), title: String(f.shareTitle || '').trim(), via: String(f.shareVia || '').trim().replace(/^@/, ''), tags: String(f.shareTags || '').replace(/#/g, '').replace(/\s+/g, ''), image: String(f.shareImage || '').trim() };
      v.text = [v.title, v.url].filter(Boolean).join(' ');
      return tpl.replace(/\{(\w+)\}/g, (m, k) => encodeURIComponent(v[k] || '')).replace(/([?&])\w+=(?=&|$)/g, '$1').replace(/[?&]+$/, '').replace(/([?])&+/, '$1');
    };

    const items = (Array.isArray(state.lists?.networks) ? state.lists.networks : []).filter(it => it.show !== 'no').map(it => {
      const n = NETS[it.network];
      if (!n) return '';
      const label = String(it.label || '').trim() || n.label;
      const aria = n.action === 'copy' ? label : `Share on ${label}`;
      const style = ` style="--c:${n.color}"`;
      const mark = clean ? '' : ` data-item="networks.${esc(it._id)}"`;
      const tip = `<span class="ss-tip" aria-hidden="true">${esc(label)}</span>`;
      if (n.action) {
        const extra = n.action === 'copy' ? svg(CHECK, 'ss-ic ss-ic--done') : '';
        return `<li class="ss-item"${mark}><button type="button" class="ss-btn" data-net="${it.network}"${style} aria-label="${esc(aria)}">${svg(n.icon)}${extra}${tip}</button></li>`;
      }
      const mail = it.network === 'email';
      return `<li class="ss-item"${mark}><a class="ss-btn" data-net="${it.network}" data-share="${esc(n.url)}" href="${esc(fillUrl(n.url))}"${mail ? '' : ' target="_blank" rel="noopener noreferrer"'}${style} aria-label="${esc(mail ? aria : `${aria} (opens in a new tab)`)}">${svg(n.icon)}${tip}</a></li>`;
    }).join('');
    const hide = toggles.collapsible === false ? '' : `<li class="ss-item ss-item--hide"><button type="button" class="ss-hide" data-ss-hide aria-expanded="true" aria-label="${esc(f.collapseLabel)}">${svg(CHEVRON, 'ss-ic ss-ic--hide')}</button></li>`;

    return html
      .replace('<div class="ss" data-ss>', () => `<div class="ss" data-ss${attrs}>`)
      .replace('<ul class="ss-list" data-ss-list></ul>', () => `<ul class="ss-list">${items}${hide}</ul>`)
      .replace('<span class="ss-ic-share"></span>', () => svg(SHARE));
  },

  groups: [
    { id: 'target', label: 'What gets shared' },
    { id: 'place', label: 'Position' },
    { id: 'look', label: 'Look' },
    { id: 'collapse', label: 'Collapse', toggle: 'collapsible' },
    { id: 'networks', label: 'Share buttons' },
  ],
  fields: [
    { key: 'shareUrl', group: 'target', label: 'Page address to share (optional)', type: 'url', value: '', hint: 'Leave empty to share the page the visitor is on. Enter an address to always share that one.' },
    { key: 'shareTitle', group: 'target', label: 'Share text (optional)', type: 'text', value: '', hint: 'Leave empty to use the page title.' },
    { key: 'shareVia', group: 'target', label: 'Your X username (optional)', type: 'text', value: '', hint: 'Adds “via @username” to posts on X.' },
    { key: 'shareTags', group: 'target', label: 'Hashtags for X (optional)', type: 'text', value: '', hint: 'Comma separated, without #. Example: webdesign,html' },
    { key: 'shareImage', group: 'target', label: 'Image for Pinterest (optional)', type: 'url', value: '', hint: 'A full image address. Leave empty to use the page’s social image (og:image).' },
    { key: 'groupLabel', group: 'target', label: 'Group label (screen readers)', type: 'text', value: 'Share this page' },
    { key: 'copiedText', group: 'target', label: 'Message after copying', type: 'text', value: 'Link copied' },

    { key: 'side', group: 'place', label: 'Side of the screen', type: 'choice', options: [['left', 'Left'], ['right', 'Right']], value: 'right' },
    { key: 'align', group: 'place', label: 'Vertical position', type: 'choice', options: [['center', 'Centred'], ['custom', 'Custom distance from the top']], value: 'center' },
    { key: 'top', group: 'place', label: 'Distance from the top', type: 'text', value: '50%', hint: 'Used when the position is Custom. A % or px value, for example 30% or 120px.' },
    { key: 'mobile', group: 'place', label: 'On phones', type: 'choice', options: [['bar', 'Bar along the bottom'], ['side', 'Small stack on the side']], value: 'bar' },

    { key: 'look', group: 'look', label: 'Colours', type: 'choice', options: [['network', 'Each network’s colour'], ['theme', 'Theme brand colour'], ['subtle', 'Subtle (colour on hover)']], value: 'network' },
    { key: 'shape', group: 'look', label: 'Shape', type: 'choice', options: [['attached', 'Attached stack'], ['rounded', 'Separate rounded buttons'], ['circle', 'Separate round buttons']], value: 'attached' },
    { key: 'size', group: 'look', label: 'Size', type: 'choice', options: [['compact', 'Compact'], ['default', 'Default'], ['large', 'Large']], value: 'default' },
    { key: 'showTips', group: 'look', label: 'Show names on hover', type: 'switch', toggle: 'showTips' },

    { key: 'startCollapsed', group: 'collapse', label: 'Start collapsed', type: 'switch', toggle: 'startCollapsed' },
    { key: 'tabLabel', group: 'collapse', label: 'Tab text', type: 'text', value: 'Share' },
    { key: 'collapseLabel', group: 'collapse', label: 'Hide button label (screen readers)', type: 'text', value: 'Hide share buttons' },
    { key: 'expandLabel', group: 'collapse', label: 'Tab label (screen readers)', type: 'text', value: 'Show share buttons' },
  ],
  lists: [{
    key: 'networks', group: 'networks', label: 'Share buttons', itemLabel: 'Button', titleKey: 'network', min: 1, max: 14,
    fields: [
      { key: 'show', label: 'Show in the stack', type: 'check', value: 'yes' },
      { key: 'network', label: 'Network', type: 'choice', options: SHARE_NETWORKS.map(id => [id, NETS[id].label]), value: 'facebook' },
      { key: 'label', label: 'Name (optional)', type: 'text', value: '', hint: 'Replaces the network’s name in the hover label and for screen readers.' },
    ],
    value: [
      { network: 'copy' }, { network: 'x' }, { network: 'linkedin' }, { network: 'whatsapp' }, { network: 'facebook' }, { network: 'email' }, { network: 'reddit' },
    ],
  }],
  toggles: [
    { key: 'collapsible', label: 'Collapse', value: true },
    { key: 'startCollapsed', label: 'Start collapsed', value: false },
    { key: 'showTips', label: 'Names on hover', value: true },
  ],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#475569', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="ss" data-ss>
  <div class="ss-panel" role="group" data-set="aria-label:groupLabel">
    <ul class="ss-list" data-ss-list></ul>
  </div>
  <button type="button" class="ss-tab" data-ss-show data-show="collapsible" aria-expanded="true" data-set="aria-label:expandLabel"><span class="ss-ic-share"></span><span class="ss-tab-text" aria-hidden="true" data-edit="tabLabel"></span></button>
  <span class="ss-live" role="status" aria-live="polite"></span>
</div>`,
  css: `.st-floating-social-share{overflow:visible;container-type:normal;height:0;min-height:0;background:transparent}
.ss{--ss-base:44px;--ss-size:var(--ss-base);--ss-r:min(calc(var(--st-radius) * 1px),14px);--ss-nudge:12px;position:fixed;z-index:900;top:var(--ss-top,50%);display:grid;pointer-events:none;font-family:var(--st-font-body)}
.ss[data-size=compact]{--ss-base:38px}
.ss[data-size=large]{--ss-base:52px}
.ss[data-side=left]{left:0}
.ss[data-side=right]{right:0;--ss-nudge:-12px}
.ss[data-align=center]{top:0;bottom:0;height:max-content;margin:auto 0}
.ss-panel,.ss-tab{grid-area:1/1;pointer-events:auto}
.ss-panel{transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .3s ease,visibility 0s}
.ss-list{list-style:none;display:flex;flex-direction:column;flex-wrap:wrap;align-items:stretch;align-content:flex-start;max-height:calc(100vh - 24px);max-height:calc(100dvh - 24px);filter:drop-shadow(0 10px 18px rgba(15,23,42,.22))}
.ss[data-align=custom] .ss-list{max-height:calc(100vh - var(--ss-top) - 12px);max-height:calc(100dvh - var(--ss-top) - 12px)}
.ss-item[hidden]{display:none}
.ss-btn{position:relative;flex:none;display:grid;place-items:center;width:var(--ss-size);height:var(--ss-size);border:0;background:var(--c,var(--st-brand));color:#fff;cursor:pointer;text-decoration:none;font:inherit;transition:width .25s cubic-bezier(.2,.8,.2,1),padding .25s cubic-bezier(.2,.8,.2,1),transform .25s cubic-bezier(.2,.8,.2,1),filter .25s ease,background .25s ease,color .25s ease,border-radius .25s ease}
.ss-item{display:flex;width:var(--ss-size)}
.ss-btn:hover,.ss-btn:focus-visible{filter:brightness(1.1)}
.ss:not([data-shape=attached]) .ss-btn:hover,.ss:not([data-shape=attached]) .ss-btn:focus-visible{transform:translateX(var(--ss-nudge))}
.ss[data-shape=attached] .ss-btn:hover,.ss[data-shape=attached] .ss-btn:focus-visible{width:calc(var(--ss-size) + 12px)}
.ss[data-side=left] .ss-item{justify-content:flex-start}
.ss[data-side=right] .ss-item{justify-content:flex-end}
.ss[data-side=left] .ss-btn:hover,.ss[data-side=left] .ss-btn:focus-visible{border-top-right-radius:var(--ss-r);border-bottom-right-radius:var(--ss-r)}
.ss[data-side=right] .ss-btn:hover,.ss[data-side=right] .ss-btn:focus-visible{border-top-left-radius:var(--ss-r);border-bottom-left-radius:var(--ss-r)}
.ss[data-shape=attached] .ss-list{gap:0}
.ss-btn:focus-visible,.ss-hide:focus-visible,.ss-tab:focus-visible{outline:3px solid var(--st-text);outline-offset:2px;z-index:2}
.ss-ic{display:block;width:calc(var(--ss-size) * .5);height:calc(var(--ss-size) * .5)}
.ss-ic--done{position:absolute;opacity:0;transform:scale(.6);transition:opacity .2s ease,transform .2s ease}
.ss-btn.is-done .ss-ic:not(.ss-ic--done){opacity:0}
.ss-btn.is-done .ss-ic--done{opacity:1;transform:none}
.ss[data-look=theme] .ss-btn{background:var(--st-brand);color:var(--st-btn-text)}
.ss[data-look=subtle] .ss-btn{background:var(--st-bg);color:var(--st-text)}
.ss[data-look=subtle] .ss-btn:hover,.ss[data-look=subtle] .ss-btn:focus-visible{background:var(--c,var(--st-brand));color:#fff;filter:none}
.ss[data-shape=attached][data-side=left] .ss-item:first-child .ss-btn{border-top-right-radius:var(--ss-r)}
.ss[data-shape=attached][data-side=left] .ss-item:last-child .ss-btn{border-bottom-right-radius:var(--ss-r)}
.ss[data-shape=attached][data-side=right] .ss-item:first-child .ss-btn{border-top-left-radius:var(--ss-r)}
.ss[data-shape=attached][data-side=right] .ss-item:last-child .ss-btn{border-bottom-left-radius:var(--ss-r)}
.ss:not([data-shape=attached]) .ss-list{gap:8px;margin:0 8px}
.ss[data-shape=rounded] .ss-btn{border-radius:var(--ss-r)}
.ss[data-shape=circle] .ss-btn{border-radius:50%}
.ss[data-shape=circle] .ss-btn,.ss[data-shape=rounded] .ss-btn{box-shadow:none}
.ss-item--hide{display:block}
.ss-hide{display:grid;place-items:center;width:100%;height:calc(var(--ss-size) - 12px);border:0;background:#d4d7dd;color:#475569;cursor:pointer;transition:filter .2s ease}
.ss-hide:hover{filter:brightness(.94)}
.ss-hide .ss-ic{width:20px;height:20px}
.ss[data-side=right] .ss-ic--hide{transform:scaleX(-1)}
.ss[data-shape=rounded] .ss-hide{border-radius:var(--ss-r)}
.ss[data-shape=circle] .ss-hide{border-radius:999px}
.ss-tip{position:absolute;top:50%;display:block;padding:7px 11px;border-radius:8px;background:var(--st-text);color:var(--st-bg);font:600 13px/1 var(--st-font-body);white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-50%);transition:opacity .15s ease,visibility 0s .15s}
.ss[data-side=left] .ss-tip{left:calc(100% + 10px)}
.ss[data-side=right] .ss-tip{right:calc(100% + 10px)}
.ss-btn.is-done .ss-tip{opacity:1;visibility:visible;transition:opacity .15s ease}
@media (hover:hover){.ss[data-tips=on] .ss-btn:hover .ss-tip,.ss[data-tips=on] .ss-btn:focus-visible .ss-tip{opacity:1;visibility:visible;transition:opacity .15s ease}}
.ss-tab{display:flex;flex-direction:column;align-items:center;gap:8px;align-self:center;width:var(--ss-size);padding:14px 0;border:0;background:var(--st-brand);color:var(--st-btn-text);cursor:pointer;font:700 12.5px/1 var(--st-font-body);letter-spacing:.08em;text-transform:uppercase;filter:drop-shadow(0 10px 18px rgba(15,23,42,.22));opacity:0;visibility:hidden;pointer-events:none;transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .3s ease,visibility 0s .4s}
.ss-tab .ss-ic{width:calc(var(--ss-size) * .46);height:calc(var(--ss-size) * .46)}
.ss-tab-text{writing-mode:vertical-rl}
.ss-tab-text:empty{display:none}
.ss[data-side=left] .ss-tab{justify-self:start;border-radius:0 var(--ss-r) var(--ss-r) 0;transform:translateX(-100%)}
.ss[data-side=right] .ss-tab{justify-self:end;border-radius:var(--ss-r) 0 0 var(--ss-r);transform:translateX(100%)}
.ss.is-collapsed .ss-tab{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition-delay:.12s,.12s,0s}
.ss.is-collapsed .ss-panel{opacity:0;visibility:hidden;pointer-events:none;transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .3s ease,visibility 0s .4s}
.ss[data-side=left].is-collapsed .ss-panel{transform:translateX(-110%)}
.ss[data-side=right].is-collapsed .ss-panel{transform:translateX(110%)}
.ss-live{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (max-width:1024px){.ss{--ss-size:min(var(--ss-base),42px)}}
@media (max-width:640px){
.ss[data-mobile=side]{--ss-size:min(var(--ss-base),40px)}
.ss[data-mobile=side] .ss-tip{display:none}
.ss[data-mobile=bar]{top:auto!important;bottom:0;left:0;right:0;display:block;height:0;margin:0;transform:none!important}
.ss[data-mobile=bar] .ss-panel{position:absolute;left:0;right:0;bottom:0;background:var(--st-bg);box-shadow:0 -6px 20px rgba(15,23,42,.18);padding-bottom:env(safe-area-inset-bottom)}
.ss[data-mobile=bar] .ss-list{flex-direction:row;margin:0;gap:0;filter:none}
.ss[data-mobile=bar] .ss-item{flex:1 1 0;min-width:0;width:auto}
.ss[data-mobile=bar] .ss-btn,.ss[data-mobile=bar] .ss-btn:hover,.ss[data-mobile=bar] .ss-btn:focus-visible{width:100%;height:48px;border-radius:0!important;transform:none}
.ss[data-mobile=bar] .ss-item--hide{flex:0 0 48px}
.ss[data-mobile=bar] .ss-hide{height:48px;border-radius:0}
.ss[data-mobile=bar] .ss-ic--hide{transform:rotate(-90deg)!important}
.ss[data-mobile=bar] .ss-tip{display:none}
.ss[data-mobile=bar] .ss-tab{position:absolute;align-self:auto;bottom:calc(16px + env(safe-area-inset-bottom));flex-direction:row;width:auto;height:44px;padding:0 16px;gap:8px;border-radius:999px;transform:translateY(24px)}
.ss[data-mobile=bar][data-side=left] .ss-tab{left:12px;border-radius:999px}
.ss[data-mobile=bar][data-side=right] .ss-tab{right:12px;border-radius:999px}
.ss[data-mobile=bar] .ss-tab-text{writing-mode:horizontal-tb}
.ss[data-mobile=bar].is-collapsed .ss-tab{transform:none}
.ss[data-mobile=bar][data-side=left].is-collapsed .ss-panel,.ss[data-mobile=bar][data-side=right].is-collapsed .ss-panel{transform:translateY(110%)}
}
@media print{.ss{display:none}}`,
};
