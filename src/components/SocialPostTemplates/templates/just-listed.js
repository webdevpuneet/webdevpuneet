export default {
  id: 'just-listed',
  name: 'Just Listed (Real Estate)',
  version: '1.0.0',
  category: 'promo',
  tags: ['real-estate', 'just-listed', 'property', 'realtor', 'listing', 'photo', 'house'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Just Listed Post Template — Free Real Estate Instagram Post',
  seoDescription: 'Free "Just listed" real estate post template: property photo, price, address, beds, baths and square feet, plus agent name and contact. Edit online, export PNG.',
  description: 'A real estate listing post for agents and brokerages: a large property photo with a "Just listed" ribbon, the asking price, the address, a beds / baths / square feet row, an open-house line and the agent\'s name, photo and contact details.',
  bestFor: ['New listing announcements for realtors', 'Open house promotions', 'Just sold and price reduced posts'],
  fonts: { heading: 'playfair', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fbfaf7' },
    { key: 'text', label: 'Text', value: '#1c1917' },
    { key: 'accent', label: 'Accent', value: '#b45309' },
  ],
  fields: [
    { key: 'photo', label: 'Property photo', type: 'image' },
    { key: 'ribbon', label: 'Ribbon', type: 'text', value: 'Just listed' },
    { key: 'price', label: 'Price', type: 'text', value: '$849,000' },
    { key: 'address', label: 'Address', type: 'textarea', value: '1428 Willow Creek Drive\nAustin, TX 78704' },
    { key: 'beds', label: 'Beds', type: 'text', value: '4 beds' },
    { key: 'baths', label: 'Baths', type: 'text', value: '3 baths' },
    { key: 'area', label: 'Area', type: 'text', value: '2,450 sq ft' },
    { key: 'openHouse', label: 'Open house (optional)', type: 'text', value: 'Open house · Sat, Oct 24 · 1–4 PM' },
    { key: 'agentPhoto', label: 'Agent photo (optional)', type: 'image' },
    { key: 'agent', label: 'Agent name', type: 'text', value: 'Elena Torres, Realtor®' },
    { key: 'contact', label: 'Agent contact', type: 'text', value: '(512) 555-0188 · elena@youragency.com' },
  ],
  html: `<div class="jl">
  <div class="jl-photo" data-image="photo"><span class="jl-ribbon" data-edit="ribbon"></span></div>
  <div class="jl-info">
    <div class="jl-row">
      <span class="jl-price" data-edit="price"></span>
      <span class="jl-open" data-edit="openHouse"></span>
    </div>
    <p class="jl-address" data-edit="address"></p>
    <div class="jl-specs"><span data-edit="beds"></span><span data-edit="baths"></span><span data-edit="area"></span></div>
    <div class="jl-agent">
      <div class="jl-agent-photo" data-image="agentPhoto" data-optional></div>
      <div class="jl-agent-who"><span class="jl-agent-name" data-edit="agent"></span><span class="jl-contact" data-edit="contact"></span></div>
    </div>
  </div>
</div>`,
  css: `.jl{position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)}
.jl-photo{position:relative;flex:1.35;min-height:0;background-image:linear-gradient(160deg,#a8c5da 0%,#d9c7a7 55%,#8a9a6c 100%)}
.jl-photo:not(.has-img){background-image:linear-gradient(180deg,transparent 58%,#7a8b5a 58%),linear-gradient(160deg,#9fc3dc,#e6d3b3)!important}
.jl-ribbon{position:absolute;left:var(--pad);top:calc(var(--pt) - var(--u)*2);padding:calc(var(--u)*1.6) calc(var(--u)*4);background:var(--accent);color:#fff;font-size:calc(var(--u)*3.4);font-weight:800;letter-spacing:.18em;text-transform:uppercase;box-shadow:0 calc(var(--u)*1) calc(var(--u)*4) rgba(0,0,0,.25)}
.jl-info{flex:none;display:flex;flex-direction:column;gap:calc(var(--u)*2.2);padding:calc(var(--u)*5) var(--pad) var(--pb)}
.jl-row{display:flex;justify-content:space-between;align-items:baseline;gap:calc(var(--u)*3);flex-wrap:wrap}
.jl-price{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1;font-weight:700}
.jl-open{font-size:calc(var(--u)*2.9);font-weight:700;color:var(--accent)}
.jl-address{font-size:calc(var(--u)*3.6);line-height:1.35;opacity:.8}
.jl-specs{display:flex;gap:calc(var(--u)*2)}
.jl-specs span{padding:calc(var(--u)*1.2) calc(var(--u)*2.6);border:1px solid color-mix(in srgb,var(--text) 18%,transparent);border-radius:99px;font-size:calc(var(--u)*3);font-weight:700}
.jl-agent{display:flex;align-items:center;gap:calc(var(--u)*2.6);padding-top:calc(var(--u)*2.6);border-top:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
.jl-agent-photo{flex:none;width:calc(var(--u)*9);height:calc(var(--u)*9);border-radius:50%}
.jl-agent-who{display:flex;flex-direction:column;gap:calc(var(--u)*.4);min-width:0}
.jl-agent-name{font-size:calc(var(--u)*3.4);font-weight:800}
.jl-contact{font-size:calc(var(--u)*2.8);opacity:.7}
.is-landscape .jl{flex-direction:row}
.is-landscape .jl-photo{flex:1.3}
.is-landscape .jl-info{flex:1;justify-content:center;padding:var(--pt) var(--pad) var(--pb)}
.is-landscape .jl-price{font-size:calc(var(--u)*8)}
.is-story .jl-photo{flex:1.6}`,
};
