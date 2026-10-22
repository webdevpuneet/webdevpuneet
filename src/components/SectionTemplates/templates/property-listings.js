/* Property cards. Each card shows an uploaded photo or, until one is added, an inline SVG
   house drawn in the theme's colours (three variations by position: day, sunset, night),
   so the default looks right with any preset and every part can be animated by GSAP. */
const HOUSE_SVG = `<svg class="pl-art" data-hide-if="image" viewBox="0 0 400 260" aria-hidden="true" focusable="false">
          <rect class="pa-sky" width="400" height="260"/>
          <circle class="pa-sun" cx="318" cy="64" r="26"/>
          <path class="pa-hill" d="M0 196 C90 166 180 188 270 172 S372 166 400 178 V260 H0Z"/>
          <g class="pa-tree"><rect class="pa-trunk" x="56" y="158" width="9" height="48" rx="3"/><circle class="pa-leaf" cx="60" cy="146" r="25"/></g>
          <g class="pa-house">
            <rect class="pa-wall" x="112" y="118" width="176" height="92"/>
            <path class="pa-roof" d="M98 122 L200 62 L302 122 Z"/>
            <rect class="pa-chim" x="248" y="74" width="16" height="30"/>
            <rect class="pa-win" x="132" y="138" width="38" height="30" rx="3"/>
            <rect class="pa-win" x="230" y="138" width="38" height="30" rx="3"/>
            <rect class="pa-door" x="185" y="160" width="30" height="50" rx="3"/>
          </g>
          <g class="pa-tree"><rect class="pa-trunk" x="333" y="168" width="8" height="40" rx="3"/><circle class="pa-leaf" cx="337" cy="158" r="20"/></g>
          <rect class="pa-ground" y="208" width="400" height="52"/>
        </svg>`;

export default {
  id: 'property-listings',
  name: 'Property Listings',
  version: '1.0.0',
  category: 'listings',
  anchor: 'listings',
  tags: ['real estate', 'property', 'listings', 'homes', 'cards', 'svg', 'light'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Property Listings Section Template — Free Real Estate Cards',
  seoDescription: 'Free property listings section: home cards with photo, status badge, price, address, beds, baths and area, plus themed SVG house art. Edit online, export HTML.',
  description: 'Real estate listing cards in a responsive grid. Each card shows a photo with a status badge (For sale, To rent, Sold), the price, a title, the address and key facts such as bedrooms, bathrooms and floor area, and links to the full listing. Until you upload photos, every card shows a themed SVG house illustration, so the section looks finished with any colour preset.',
  bestFor: ['Estate agents and realtors', 'Holiday rentals and property managers', 'Developers showcasing new homes'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Homes' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Featured homes' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Homes you’ll *love coming back to*' },
    { key: 'allLink', group: 'header', label: '"See all" link text (optional)', type: 'text', value: 'See all listings' },
    { key: 'allUrl', group: 'header', label: '"See all" link', type: 'url', value: '/listings/' },
  ],
  lists: [{
    key: 'homes', group: 'items', label: 'Homes', itemLabel: 'Home', titleKey: 'title', min: 1, max: 12,
    fields: [
      { key: 'image', label: 'Photo (optional)', type: 'image', value: '', hint: 'About 1200×800 px. Without a photo the card shows a house illustration in your theme colours.', upload: { name: 'home', maxW: 1400 } },
      { key: 'imageAlt', label: 'Photo alt text', type: 'text', value: '' },
      { key: 'status', label: 'Status badge (optional)', type: 'text', value: 'For sale' },
      { key: 'price', label: 'Price', type: 'text', value: '£450,000' },
      { key: 'title', label: 'Title', type: 'text', value: 'A family home' },
      { key: 'address', label: 'Address', type: 'text', value: 'Harbour View, Bristol' },
      { key: 'beds', label: 'Bedrooms (optional)', type: 'text', value: '3 beds' },
      { key: 'baths', label: 'Bathrooms (optional)', type: 'text', value: '2 baths' },
      { key: 'area', label: 'Area (optional)', type: 'text', value: '120 m²' },
      { key: 'url', label: 'Listing link', type: 'url', value: '#' },
    ],
    value: [
      { status: 'For sale', price: '£485,000', title: 'Bright family home with garden', address: 'Harbour View, Bristol', beds: '4 beds', baths: '2 baths', area: '148 m²', url: '#' },
      { status: 'New', price: '£325,000', title: 'Modern townhouse near the park', address: 'Old Town, Bath', beds: '3 beds', baths: '2 baths', area: '112 m²', url: '#' },
      { status: 'To rent', price: '£1,650 / month', title: 'Cosy cottage with a log burner', address: 'Clifton Village, Bristol', beds: '2 beds', baths: '1 bath', area: '78 m²', url: '#' },
    ],
  }],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f7f5', text: '#0f1f1c', muted: '#4b5f5a', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="pl-head">
    <div class="pl-titles">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    </div>
    <a class="pl-all" data-anim="item" data-href="allUrl" data-show-if="allLink"><span data-edit="allLink"></span> <span aria-hidden="true">→</span></a>
  </div>
  <div class="pl-grid" data-list="homes">
    <a class="pl-card" data-href="url" data-anim="item">
      <span class="pl-media">
        <img class="pl-photo" data-image="image" data-optional alt="" width="1200" height="800" loading="lazy">
        ${HOUSE_SVG}
        <span class="pl-status" data-show-if="status" data-edit="status"></span>
      </span>
      <span class="pl-body">
        <span class="pl-price" data-edit="price"></span>
        <span class="pl-title" data-edit="title"></span>
        <span class="pl-addr" data-edit="address"></span>
        <span class="pl-facts">
          <span data-show-if="beds" data-edit="beds"></span>
          <span data-show-if="baths" data-edit="baths"></span>
          <span data-show-if="area" data-edit="area"></span>
        </span>
      </span>
    </a>
  </div>
</div>`,
  css: `.st-property-listings{padding:clamp(64px,8cqi,112px) 0}
.pl-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px 40px;flex-wrap:wrap;margin-bottom:clamp(28px,4cqi,48px)}
.pl-titles{display:flex;flex-direction:column;gap:12px;max-width:36em}
.pl-all{font-weight:700;color:var(--st-brand);text-decoration:none;white-space:nowrap}
.pl-all:hover{text-decoration:underline}
.pl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:clamp(18px,2.5cqi,28px)}
.pl-card{display:flex;flex-direction:column;overflow:hidden;border-radius:calc(var(--st-radius) * 1px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);color:inherit;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease}
.pl-card:hover{transform:translateY(-4px);box-shadow:0 26px 50px -30px color-mix(in srgb,var(--st-text) 45%,transparent)}
.pl-card:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:3px}
.pl-media{position:relative;display:block;aspect-ratio:3/2;background:var(--st-surface)}
.pl-photo,.pl-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.pl-status{position:absolute;top:12px;left:12px;padding:5px 11px;border-radius:999px;background:var(--st-brand);color:var(--st-btn-text);font-size:12px;font-weight:700;letter-spacing:.03em}
.pl-body{display:flex;flex-direction:column;gap:5px;padding:18px 20px 20px}
.pl-price{font:800 22px/1.2 var(--st-font-heading);color:var(--st-text)}
.pl-title{font-weight:600}
.pl-addr{color:var(--st-muted);font-size:14.5px}
.pl-facts{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:10px;padding-top:12px;border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);color:var(--st-muted);font-size:14px}
.pl-facts>span{display:inline-flex;align-items:center;gap:6px}
.pl-facts>span::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--st-brand)}
.pa-sky{fill:color-mix(in srgb,var(--st-brand) 16%,var(--st-surface))}
.pa-sun{fill:color-mix(in srgb,#fbbf24 72%,var(--st-surface))}
.pa-hill{fill:color-mix(in srgb,var(--st-brand) 30%,var(--st-surface))}
.pa-wall{fill:var(--st-bg)}
.pa-roof,.pa-chim{fill:var(--st-text)}
.pa-win{fill:color-mix(in srgb,var(--st-brand) 22%,var(--st-bg))}
.pa-door{fill:var(--st-brand)}
.pa-trunk{fill:color-mix(in srgb,var(--st-text) 55%,var(--st-surface))}
.pa-leaf{fill:color-mix(in srgb,var(--st-brand) 60%,var(--st-text))}
.pa-ground{fill:color-mix(in srgb,var(--st-brand) 45%,var(--st-text))}
.pl-card:nth-child(3n+2) .pa-sky{fill:color-mix(in srgb,#fb923c 26%,var(--st-surface))}
.pl-card:nth-child(3n+2) .pa-roof,.pl-card:nth-child(3n+2) .pa-chim{fill:var(--st-brand)}
.pl-card:nth-child(3n+2) .pa-door{fill:var(--st-text)}
.pl-card:nth-child(3n) .pa-sky{fill:color-mix(in srgb,var(--st-text) 82%,var(--st-brand))}
.pl-card:nth-child(3n) .pa-sun{fill:color-mix(in srgb,#f8fafc 85%,transparent)}
.pl-card:nth-child(3n) .pa-win{fill:#fcd34d}
.pl-card:nth-child(3n) .pa-hill{fill:color-mix(in srgb,var(--st-text) 70%,var(--st-brand))}`,
};
