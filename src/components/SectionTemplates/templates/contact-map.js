export default {
  id: 'contact-map',
  name: 'Contact With Map',
  version: '1.0.0',
  category: 'contact',
  tags: ['contact', 'map', 'location', 'offices', 'address', 'openstreetmap', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Contact Section With Map — Free Locations Template HTML',
  seoDescription: 'Free contact section with an embedded map beside office addresses, phone numbers, emails and opening hours. Works with OpenStreetMap or Google Maps embeds.',
  description: 'A location-focused contact section: a large embedded map (OpenStreetMap by default, or paste a Google Maps embed link) beside a heading and a list of offices, each with the city, address, phone and email. Perfect for shops, clinics, restaurants and companies with physical locations.',
  bestFor: ['Shops, restaurants and clinics', 'Companies with one or more offices', 'Event venues and studios'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Locations' },
    { id: 'map', label: 'Map' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Visit us' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Come say *hello*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Our doors are open Monday to Saturday. Drop by for a coffee and a chat about your project.' },
    { key: 'mapUrl', group: 'map', label: 'Map embed URL', type: 'url', value: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.1135%2C51.5185%2C-0.0955%2C51.5265&layer=mapnik&marker=51.5225%2C-0.1045', hint: 'On openstreetmap.org use Share → HTML and copy the src link, or in Google Maps use Share → Embed a map and copy the src link.' },
    { key: 'mapTitle', group: 'map', label: 'Map title (screen readers)', type: 'text', value: 'Map showing our London studio' },
  ],
  lists: [{
    key: 'offices', group: 'items', label: 'Locations', itemLabel: 'Location', titleKey: 'city', min: 1, max: 4,
    fields: [
      { key: 'city', label: 'Name or city', type: 'text', value: 'City' },
      { key: 'address', label: 'Address', type: 'textarea', value: 'Street\nPostcode, City' },
      { key: 'hours', label: 'Opening hours (optional)', type: 'text', value: '' },
      { key: 'phone', label: 'Phone (optional)', type: 'text', value: '' },
      { key: 'phoneUrl', label: 'Phone link', type: 'url', value: '', hint: 'e.g. tel:+442079460958' },
      { key: 'email', label: 'Email (optional)', type: 'text', value: '' },
      { key: 'emailUrl', label: 'Email link', type: 'url', value: '', hint: 'e.g. mailto:hello@webdevpuneet.com' },
    ],
    value: [
      { city: 'London studio', address: '12 Clerkenwell Road\nLondon EC1M 5PQ', hours: 'Mon–Sat, 9am–6pm', phone: '+44 20 7946 0958', phoneUrl: 'tel:+442079460958', email: 'london@northstar.studio', emailUrl: 'mailto:london@northstar.studio' },
      { city: 'Lisbon office', address: 'Rua da Prata 80\n1100-415 Lisbon', hours: 'Mon–Fri, 9am–5pm', phone: '+351 21 000 0000', phoneUrl: 'tel:+351210000000', email: 'lisbon@northstar.studio', emailUrl: 'mailto:lisbon@northstar.studio' },
    ],
  }],
  toggles: [],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#ffffff', surface: '#fff7f0', text: '#1c1917', muted: '#57534e', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap cm">
  <div class="cm-info">
    <header class="st-head st-head--left cm-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <ul class="cm-offices" data-list="offices">
      <li class="cm-office" data-anim="item">
        <h3 class="cm-city" data-edit="city"></h3>
        <address class="cm-address" data-edit="address"></address>
        <p class="cm-hours" data-show-if="hours" data-edit="hours"></p>
        <p class="cm-contact">
          <a data-href="phoneUrl" data-show-if="phone"><span data-edit="phone"></span></a>
          <a data-href="emailUrl" data-show-if="email"><span data-edit="email"></span></a>
        </p>
      </li>
    </ul>
  </div>
  <div class="cm-map" data-anim="media">
    <iframe class="cm-frame" data-set="src:mapUrl;title:mapTitle" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</div>`,
  css: `.st-contact-map{padding:clamp(64px,8cqi,112px) 0}
.cm{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:stretch;gap:clamp(32px,5cqi,72px)}
.cm-info{display:flex;flex-direction:column;gap:32px}
.cm-head{margin:0}
.cm-offices{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px}
.cm-office{display:flex;flex-direction:column;gap:6px;padding:22px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface)}
.cm-city{font-size:18px;margin-bottom:4px}
.cm-address{font-style:normal;color:var(--st-muted);font-size:15.5px;line-height:1.6}
.cm-hours{color:var(--st-text);font-size:14.5px;font-weight:600;margin-top:4px}
.cm-contact{display:flex;flex-direction:column;gap:2px;margin-top:6px}
.cm-contact a{color:var(--st-brand);font-weight:600;font-size:15px;text-decoration:none;word-break:break-word}
.cm-contact a:hover{text-decoration:underline}
.cm-map{min-height:420px;overflow:hidden;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);box-shadow:0 30px 70px -40px rgba(28,25,23,.45)}
.cm-frame{display:block;width:100%;height:100%;min-height:420px;border:0}
@container st (max-width:860px){.cm{grid-template-columns:1fr}.cm-map,.cm-frame{min-height:320px}}`,
};
