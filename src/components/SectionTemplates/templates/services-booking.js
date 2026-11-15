/* Services & Booking: a price list for appointment-based businesses. Each service is a row with an icon, a name and short
   description, a duration chip, a price ("from $65") and a Book button. Filter chips are built from the categories you type, so
   a clinic can show Check-ups, Vaccines, Dental and Surgery separately. The "svcfilter" behaviour filters the rows; without
   JavaScript every service shows. The services are also written as schema.org Service data with their prices. */
const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const CUR = { '$': 'USD', '£': 'GBP', '€': 'EUR', '₹': 'INR' };
const parsePrice = t => {
  const m = String(t || '').match(/([$£€₹])\s*([\d.,]+)/);
  if (!m) return null;
  const n = m[2].replace(/,/g, '');
  return Number.isFinite(parseFloat(n)) ? { price: n, currency: CUR[m[1]] } : null;
};

export default {
  id: 'services-booking',
  name: 'Services & Booking List',
  version: '1.0.0',
  category: 'listings',
  tags: ['services', 'price list', 'booking', 'appointments', 'clinic', 'salon', 'filter', 'prices', 'book now', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Services & Booking List — Free Price List Section HTML',
  seoDescription: 'Free services and prices section: rows with duration, a from-price and a Book button, filter chips from your categories, and Service data for search engines.',
  description: 'The price list appointment businesses need. Every service is a clear row with an icon, a name and a short description, a duration chip, a price such as “from $65” and a Book button that links to your booking form or calendar. Filter chips are built from the categories you type, so visitors can narrow a long list to Check-ups, Vaccines or Dental in one tap. The services are also written as schema.org Service data with their prices, so search engines can read them. Made for veterinary clinics, dentists, salons, physios and any business that sells time.',
  bestFor: ['Vet clinics, dentists and physiotherapists', 'Salons, barbers and spas', 'Studios, coaches and repair shops that sell appointments'],
  schema: state => {
    const items = (state.lists?.services || []).filter(s => plain(s.name));
    if (!items.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((s, i) => {
        const pr = parsePrice(s.price);
        return {
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'Service', name: plain(s.name),
            ...(plain(s.text) && { description: plain(s.text) }),
            ...(plain(s.category) && { serviceType: plain(s.category) }),
            ...(pr && { offers: { '@type': 'Offer', price: pr.price, priceCurrency: pr.currency } }),
          },
        };
      }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Services' },
    { id: 'labels', label: 'Labels' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Services and prices' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Clear prices, *no surprises*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Everything we offer, with how long it takes and what it costs. Pick a category to narrow the list.' },
    { key: 'allLabel', group: 'labels', label: 'Label of the “show all” chip', type: 'text', value: 'All services' },
    { key: 'filterLabel', group: 'labels', label: 'Filter group label (screen readers)', type: 'text', value: 'Service categories' },
  ],
  lists: [
    {
      key: 'services', group: 'items', label: 'Services', itemLabel: 'Service', titleKey: 'name', min: 1, max: 24,
      fields: [
        { key: 'category', label: 'Category (used by the filter chips)', type: 'text', value: 'Care' },
        { key: 'icon', label: 'Icon', type: 'icon', value: 'heart' },
        { key: 'name', label: 'Service name', type: 'text', value: 'Service' },
        { key: 'text', label: 'Short description', type: 'textarea', value: 'What is included, in one or two sentences.' },
        { key: 'duration', label: 'Duration (optional)', type: 'text', value: '30 min' },
        { key: 'priceNote', label: 'Before the price (optional)', type: 'text', value: 'from' },
        { key: 'price', label: 'Price', type: 'text', value: '$50', hint: 'A symbol and a number, such as $65 or £40, so search engines can read it.' },
        { key: 'button', label: 'Button text', type: 'text', value: 'Book' },
        { key: 'url', label: 'Booking link', type: 'url', value: '#book' },
      ],
      value: [
        { category: 'Check-ups', icon: 'heart', name: 'Wellness exam', text: 'A full nose-to-tail check, weight and a plan for diet, exercise and parasites.', duration: '30 min', priceNote: '', price: '$65', button: 'Book', url: '#book' },
        { category: 'Check-ups', icon: 'users', name: 'Senior health check', text: 'A longer exam for pets over seven, with bloodwork to catch problems early.', duration: '45 min', priceNote: 'from', price: '$129', button: 'Book', url: '#book' },
        { category: 'Vaccines', icon: 'shield-check', name: 'Core vaccines', text: 'The vaccines your dog or cat needs, with a reminder for the next due date.', duration: '20 min', priceNote: 'from', price: '$45', button: 'Book', url: '#book' },
        { category: 'Dental', icon: 'sparkles', name: 'Dental cleaning', text: 'A scale and polish under anaesthetic, with a full mouth check and photos.', duration: '2 hours', priceNote: 'from', price: '$285', button: 'Book', url: '#book' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f7f6', text: '#10211f', muted: '#4b6360', radius: '16' },
  fonts: { heading: 'lora', body: 'dmsans' },
  behaviors: ['svcfilter'],

  html: `<div class="st-wrap sb" data-svc data-set="data-all:allLabel;data-group:filterLabel">
  <header class="st-head sb-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <div class="sb-filters" data-svc-filters role="group"></div>
  <ul class="sb-list" data-list="services">
    <li class="sb-item" data-anim="item" data-set="data-cat:category">
      <span class="st-icon" data-icon="icon"></span>
      <div class="sb-main">
        <h3 class="sb-name" data-edit="name"></h3>
        <p class="sb-text" data-edit="text"></p>
        <p class="sb-meta">
          <span class="sb-chip" data-show-if="duration"><span aria-hidden="true">&#9201;</span> <span data-edit="duration"></span></span>
          <span class="sb-chip sb-cat" data-show-if="category" data-edit="category"></span>
        </p>
      </div>
      <div class="sb-side">
        <p class="sb-price"><span class="sb-from" data-show-if="priceNote" data-edit="priceNote"></span> <strong data-edit="price"></strong></p>
        <a class="st-btn sb-book" data-show-if="button" data-href="url"><span data-edit="button"></span></a>
      </div>
    </li>
  </ul>
</div>`,
  css: `.st-services-booking{padding:clamp(64px,8cqi,112px) 0}
.sb-head{margin-bottom:clamp(20px,3cqi,36px)}
.sb-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:clamp(20px,2.6cqi,32px)}
.sb-filters[hidden]{display:none}
.sb-chipbtn{border:1.5px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:transparent;color:var(--st-text);border-radius:99px;padding:8px 16px;font:600 14px/1 var(--st-font-body);cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.sb-chipbtn:hover{border-color:var(--st-brand)}
.sb-chipbtn[aria-pressed="true"]{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.sb-chipbtn:focus-visible{outline:3px solid var(--st-brand);outline-offset:2px}
.sb-list{list-style:none;margin:0 auto;padding:0;display:flex;flex-direction:column;gap:12px;max-width:900px}
.sb-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:6px clamp(14px,2cqi,24px);align-items:center;padding:clamp(16px,2cqi,24px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.sb-item[hidden]{display:none}
.sb-item .st-icon{background:color-mix(in srgb,var(--st-brand) 14%,transparent)}
.sb-main{display:flex;flex-direction:column;gap:4px;min-width:0}
.sb-name{font-size:18px}
.sb-text{color:var(--st-muted);font-size:15px;line-height:1.55}
.sb-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.sb-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 7%,transparent);color:var(--st-muted);font-size:12.5px;font-weight:600}
.sb-side{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.sb-price{white-space:nowrap}
.sb-price strong{font:700 22px/1 var(--st-font-heading)}
.sb-from{font-size:13px;color:var(--st-muted)}
.sb-book{padding:9px 20px;font-size:14px}
@container st (max-width:640px){.sb-item{grid-template-columns:auto minmax(0,1fr)}.sb-side{grid-column:1 / -1;flex-direction:row;align-items:center;justify-content:space-between}}`,
};
