export default {
  id: 'product-spotlight',
  name: 'Product Spotlight',
  version: '1.0.0',
  category: 'promo',
  tags: ['product', 'ecommerce', 'photo', 'price', 'light'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Product Spotlight Post Template — Free Ecommerce Social Post',
  seoDescription: 'Free product spotlight post template with a large product photo, name, price and shop button. Upload your photo, then download every post size or copy the HTML.',
  description: 'A clean ecommerce post with a large product photo, a "featured" label, product name, price and a shop button on a white card.',
  bestFor: ['Shopify and Etsy product posts', 'New arrivals and restocks', 'Featured product of the week'],
  fonts: { heading: 'dmsans', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f5f5f4' },
    { key: 'card', label: 'Card', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#1c1917' },
    { key: 'accent', label: 'Accent', value: '#16a34a' },
  ],
  fields: [
    { key: 'photo', label: 'Product photo', type: 'image' },
    { key: 'label', label: 'Label', type: 'text', value: 'Featured' },
    { key: 'name', label: 'Product name', type: 'textarea', value: 'Everyday Canvas Tote' },
    { key: 'price', label: 'Price', type: 'text', value: '$48' },
    { key: 'cta', label: 'Button', type: 'text', value: 'Shop now →' },
  ],
  html: `<div class="ps">
  <div class="ps-photo" data-image="photo"></div>
  <div class="ps-card" data-fit-box>
    <span class="ps-label" data-edit="label"></span>
    <h2 class="ps-name" data-edit="name" data-fit></h2>
    <div class="ps-row"><span class="ps-price" data-edit="price"></span><span class="ps-cta" data-edit="cta"></span></div>
  </div>
</div>`,
  css: `.ps{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);gap:calc(var(--u)*3);background:var(--bg)}
.ps-photo{flex:1;min-height:0;border-radius:calc(var(--u)*3)}
.ps-card{flex:none;display:flex;flex-direction:column;gap:calc(var(--u)*1.8);padding:calc(var(--u)*5);background:var(--card);border-radius:calc(var(--u)*3);box-shadow:0 calc(var(--u)*1) calc(var(--u)*4) rgba(0,0,0,.06)}
.ps-label{font-size:calc(var(--u)*2.6);font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:var(--accent)}
.ps-name{font-family:var(--font-heading);font-size:calc(var(--u)*6.4);line-height:1.08;font-weight:700;letter-spacing:-.02em}
.ps-row{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3);margin-top:calc(var(--u)*1)}
.ps-price{font-family:var(--font-heading);font-size:calc(var(--u)*7);font-weight:700}
.ps-cta{font-size:calc(var(--u)*3.2);font-weight:700;color:#fff;background:var(--accent);padding:calc(var(--u)*2) calc(var(--u)*4);border-radius:99px}
.is-landscape .ps{flex-direction:row}
.is-landscape .ps-card{flex:0 0 40%;justify-content:center}`,
};
