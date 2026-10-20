/* Markup and CSS shared by several sections (testimonials now). Item fields they read:
   quote, name, role, avatar (+ avatarAlt); toggle: showStars. */
import { IMG } from './meta.js';

export const STARS_HTML = `<p class="st-stars" data-show="showStars" role="img" aria-label="Rated 5 out of 5"><span aria-hidden="true">★★★★★</span></p>`;

export const PERSON_HTML = `<div class="st-person">
        <img class="st-avatar" data-image="avatar" data-optional alt="" width="96" height="96" loading="lazy">
        <div><p class="st-person-name" data-edit="name"></p><p class="st-person-role" data-edit="role"></p></div>
      </div>`;

export const PERSON_CSS = `.st-stars{color:#f59e0b;font-size:16px;letter-spacing:2px;line-height:1}
.st-person{display:flex;align-items:center;gap:12px}
.st-avatar{width:44px;height:44px;flex:none;border-radius:50%;object-fit:cover;background:var(--st-surface)}
.st-person-name{font-weight:700;font-size:15.5px;line-height:1.3}
.st-person-role{color:var(--st-muted);font-size:14px;line-height:1.4}
.st-person-role:empty{display:none}`;

/** List fields for one testimonial */
export const quoteFields = ({ avatar = true } = {}) => [
  { key: 'quote', label: 'Quote', type: 'textarea', value: 'What this customer said about you.' },
  { key: 'name', label: 'Name', type: 'text', value: 'Customer name' },
  { key: 'role', label: 'Role and company (optional)', type: 'text', value: '' },
  ...(avatar ? [
    { key: 'avatar', label: 'Photo (optional)', type: 'image', value: '', hint: 'A square photo, at least 96×96 px. Leave empty to hide.', upload: { name: 'avatar', maxW: 240 } },
    { key: 'avatarAlt', label: 'Photo alt text', type: 'text', value: '' },
  ] : []),
];

export const avatar = n => IMG(`avatar-${n}.jpg`);

/* ── Logos ─────────────────────────────────────────────────────────────────── */
/* A customer logo: an uploaded logo image, or (when there is none) an icon + name
   wordmark, so the section looks finished before real logos are added. */
export const LOGO_HTML = `<li class="st-logo">
        <img class="st-logo-img" data-image="logo" data-optional alt="" loading="lazy">
        <span class="st-logo-mark" data-hide-if="logo"><span class="st-logo-icon" data-icon="icon"></span><span data-edit="name"></span></span>
      </li>`;

export const LOGO_CSS = `.st-logo{display:flex;align-items:center;justify-content:center;flex:none}
.st-logo-img{height:30px;width:auto;max-width:150px;object-fit:contain;filter:grayscale(1);opacity:.7;transition:filter .3s ease,opacity .3s ease}
.st-logo:hover .st-logo-img{filter:none;opacity:1}
.st-logo-mark{display:inline-flex;align-items:center;gap:8px;color:var(--st-muted);font:800 21px/1 var(--st-font-heading);letter-spacing:-.03em;white-space:nowrap;opacity:.8;transition:color .3s ease,opacity .3s ease}
.st-logo:hover .st-logo-mark{color:var(--st-text);opacity:1}
.st-logo-icon svg{width:24px;height:24px;display:block}`;

export const logoFields = () => [
  { key: 'name', label: 'Company name', type: 'text', value: 'Company' },
  { key: 'icon', label: 'Icon (used without a logo image)', type: 'icon', value: 'sparkles' },
  { key: 'logo', label: 'Logo image (optional)', type: 'image', value: '', hint: 'An SVG or transparent PNG, ideally one colour. Replaces the icon + name.', upload: { name: 'logo', maxW: 400, mime: 'image/png' } },
  { key: 'logoAlt', label: 'Logo alt text', type: 'text', value: '' },
];

export const DEMO_LOGOS = [
  { name: 'Northwind', icon: 'globe' }, { name: 'Lumen', icon: 'lightbulb' }, { name: 'Quill', icon: 'pen-tool' },
  { name: 'Brightpath', icon: 'rocket' }, { name: 'Kestrel', icon: 'zap' }, { name: 'Orbit', icon: 'target' },
  { name: 'Tidewater', icon: 'leaf' }, { name: 'Fernhill', icon: 'layers' },
];

/* ── FAQ ───────────────────────────────────────────────────────────────────── */
/* One question as native details/summary (the accordion behaviour animates it) */
export const ACC_ITEM_HTML = `<details class="st-acc" data-anim="item">
      <summary class="st-acc-q"><span data-edit="q"></span><span class="st-acc-icon" aria-hidden="true"></span></summary>
      <div class="st-acc-a"><p data-edit="a"></p></div>
    </details>`;

export const ACC_CSS = `.st-acc{border-bottom:1px solid color-mix(in srgb,var(--st-text) 11%,transparent)}
.st-acc-q{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 2px;cursor:pointer;list-style:none;font:700 clamp(17px,.6cqi + 14px,19px)/1.4 var(--st-font-heading);letter-spacing:-.01em}
.st-acc-q::-webkit-details-marker{display:none}
.st-acc-q:hover{color:var(--st-brand)}
.st-acc-q:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px;border-radius:6px}
.st-acc-icon{position:relative;flex:none;width:28px;height:28px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 11%,transparent);transition:transform .3s ease,background .3s ease}
.st-acc-icon::before,.st-acc-icon::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;border-radius:2px;background:var(--st-brand);transform:translate(-50%,-50%)}
.st-acc-icon::after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .3s ease}
.st-acc[open]:not(.is-closing) .st-acc-icon{transform:rotate(180deg);background:var(--st-brand)}
.st-acc[open]:not(.is-closing) .st-acc-icon::before,.st-acc[open]:not(.is-closing) .st-acc-icon::after{background:var(--st-btn-text)}
.st-acc[open]:not(.is-closing) .st-acc-icon::after{transform:translate(-50%,-50%) rotate(0deg)}
.st-acc-a{overflow:hidden}
.st-acc-a p{padding:0 48px 24px 2px;color:var(--st-muted);font-size:16.5px;line-height:1.7}`;

/** List fields for one FAQ */
export const faqFields = () => [
  { key: 'q', label: 'Question', type: 'text', value: 'A new question?' },
  { key: 'a', label: 'Answer', type: 'textarea', value: 'The answer, in one to three sentences.' },
];

/* Plain text for structured data: no *highlights*, tags or line breaks */
const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** FAQPage JSON-LD for a section's FAQ list (exported pages get it in <head>) */
export const faqSchema = listKey => state => {
  const items = (state.lists?.[listKey] || []).filter(it => plain(it.q) && plain(it.a));
  return items.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({ '@type': 'Question', name: plain(it.q), acceptedAnswer: { '@type': 'Answer', text: plain(it.a) } })),
  } : null;
};
