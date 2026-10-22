export default {
  id: 'restaurant-menu',
  name: 'Restaurant Menu',
  version: '1.0.0',
  category: 'listings',
  anchor: 'menu',
  tags: ['menu', 'restaurant', 'cafe', 'prices', 'food', 'dishes', 'light'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Restaurant Menu Section — Free HTML Menu With Prices',
  seoDescription: 'Free restaurant menu section: dishes with descriptions, dotted leaders to the price and tags like vegetarian or chef’s pick. Edit online, export HTML or React.',
  description: 'A printed-menu style section for restaurants, cafés and bars. Dishes sit in two columns, each with its name, a dotted leader to the price, a short description and an optional tag such as "V" or "Chef’s pick". A note below covers allergens or service, and an optional button links to bookings. Add one section per course: starters, mains, desserts or drinks.',
  bestFor: ['Restaurants, bistros and cafés', 'Bars, wine lists and cocktail menus', 'Bakeries, food trucks and catering'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Dishes' },
    { id: 'footer', label: 'Note & button' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Course or eyebrow (optional)', type: 'text', value: 'Mains' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'From the *wood fire*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Cooked over oak embers and served with seasonal sides. Our menu changes with the market.' },
    { key: 'note', group: 'footer', label: 'Note (optional)', type: 'textarea', value: 'V vegetarian · VG vegan · GF gluten free. Please tell us about any allergies when you order.' },
    { key: 'cta', group: 'footer', label: 'Button text (optional)', type: 'text', value: 'Book a table' },
    { key: 'ctaUrl', group: 'footer', label: 'Button link', type: 'url', value: '#contact' },
  ],
  lists: [{
    key: 'dishes', group: 'items', label: 'Dishes', itemLabel: 'Dish', titleKey: 'name', min: 1, max: 24,
    fields: [
      { key: 'name', label: 'Dish', type: 'text', value: 'A new dish' },
      { key: 'price', label: 'Price', type: 'text', value: '€14' },
      { key: 'desc', label: 'Description (optional)', type: 'textarea', value: 'What is on the plate.' },
      { key: 'tag', label: 'Tag (optional)', type: 'text', value: '', hint: 'e.g. V, GF, New, Chef’s pick' },
    ],
    value: [
      { name: 'Slow-cooked octopus', price: '€24', desc: 'Smoked paprika potatoes, salsa verde, lemon.', tag: 'Chef’s pick' },
      { name: 'Ember-roasted chicken', price: '€21', desc: 'Free-range half chicken, garlic confit, house piri-piri.' },
      { name: 'Whole sea bream', price: '€26', desc: 'Grilled over oak, fennel salad, brown butter capers.', tag: 'GF' },
      { name: 'Charred hispi cabbage', price: '€17', desc: 'Whipped feta, chilli butter, toasted almonds.', tag: 'V' },
      { name: 'Aged beef rib for two', price: '€58', desc: '40-day aged rib, bone marrow gravy, crispy potatoes.' },
      { name: 'Wild mushroom rice', price: '€19', desc: 'Carnaroli rice, porcini, aged cheese, herbs.', tag: 'V' },
    ],
  }],
  theme: { brand: '#b45309', brandText: '#ffffff', bg: '#fffaf3', surface: '#f6ecdf', text: '#2a1a10', muted: '#6b5444', radius: '10' },
  fonts: { heading: 'playfair', body: 'dmsans' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="rm-list" data-list="dishes">
    <li class="rm-dish" data-anim="item">
      <div class="rm-line">
        <span class="rm-name" data-edit="name"></span>
        <span class="rm-tag" data-show-if="tag" data-edit="tag"></span>
        <span class="rm-dots" aria-hidden="true"></span>
        <span class="rm-price" data-edit="price"></span>
      </div>
      <p class="rm-desc" data-edit="desc"></p>
    </li>
  </ul>
  <div class="rm-foot" data-anim="item">
    <p class="rm-note" data-edit="note"></p>
    <a class="st-btn" data-href="ctaUrl" data-show-if="cta"><span data-edit="cta"></span></a>
  </div>
</div>`,
  css: `.st-restaurant-menu{padding:clamp(64px,8cqi,112px) 0}
.rm-list{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,3cqi,36px) clamp(32px,6cqi,80px);max-width:1040px;margin:0 auto}
.rm-dish{display:flex;flex-direction:column;gap:6px}
.rm-line{display:flex;align-items:baseline;gap:10px}
.rm-name{font:700 clamp(18px,.6cqi + 14px,21px)/1.3 var(--st-font-heading)}
.rm-tag{flex:none;padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 14%,transparent);color:var(--st-brand);font-size:11.5px;font-weight:700;letter-spacing:.04em}
.rm-dots{flex:1;min-width:24px;border-bottom:2px dotted color-mix(in srgb,var(--st-text) 28%,transparent);transform:translateY(-5px)}
.rm-price{flex:none;font:700 18px/1 var(--st-font-heading);color:var(--st-brand)}
.rm-desc{color:var(--st-muted);font-size:15.5px;line-height:1.55;max-width:34em}
.rm-foot{display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:clamp(40px,5cqi,64px);text-align:center}
.rm-note{color:var(--st-muted);font-size:14px;max-width:44em}
@container st (max-width:720px){.rm-list{grid-template-columns:1fr}}`,
};
