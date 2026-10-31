/* Opening Hours & Location: a weekly hours table with a live "Open now" badge (in the business's own
   time zone), the address, a map and contact buttons. The hours, address and phone are also written as
   schema.org LocalBusiness data (OpeningHoursSpecification), so search engines can show them.
   Behaviour: `opennow` (behaviors.js). */

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
/** "09:00", "9:30" or "5 pm" → "HH:MM" (24 hours), or null */
const hhmm = v => {
  const m = String(v || '').trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = +m[1];
  const min = +(m[2] || 0);
  if (m[3] === 'pm' && h < 12) h += 12;
  if (m[3] === 'am' && h === 12) h = 0;
  if (h > 24 || min > 59) return null;
  return `${String(h % 24).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
};
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TYPES = [
  ['LocalBusiness', 'Local business (general)'], ['CafeOrCoffeeShop', 'Cafe or coffee shop'], ['Restaurant', 'Restaurant'], ['Bakery', 'Bakery'],
  ['BarOrPub', 'Bar or pub'], ['Store', 'Shop'], ['HairSalon', 'Hair salon'], ['BeautySalon', 'Beauty salon'], ['DaySpa', 'Spa'],
  ['Dentist', 'Dentist'], ['Physician', 'Doctor'], ['MedicalClinic', 'Medical clinic'], ['VeterinaryCare', 'Vet'], ['HealthClub', 'Gym or health club'],
  ['AutoRepair', 'Garage or auto repair'], ['LegalService', 'Law firm'], ['AccountingService', 'Accountant'], ['RealEstateAgent', 'Estate agent'],
  ['Hotel', 'Hotel'], ['ProfessionalService', 'Professional service'],
];

export default {
  id: 'opening-hours',
  name: 'Opening Hours & Location',
  version: '1.0.0',
  category: 'contact',
  tags: ['opening hours', 'business hours', 'location', 'address', 'map', 'open now', 'local business', 'cafe', 'clinic', 'shop', 'light'],
  created: '2026-10-31',
  updated: '2026-10-31',
  seoTitle: 'Opening Hours Section — Free Open Now Hours & Map HTML',
  seoDescription: 'Free opening hours section with a live Open now badge, weekly hours, address, map and call buttons, plus LocalBusiness data for Google. Edit and export HTML.',
  description: 'A section every local business needs: a weekly opening hours table with today highlighted, a live “Open now” or “Closed, opens Tuesday 09:00” badge that follows the business’s own time zone, the address and an embedded map, and buttons to get directions or call. Closed days, split shifts and notes such as “Brunch until 2 pm” are supported. The hours, address and phone are also written as schema.org LocalBusiness data with OpeningHoursSpecification, so search engines can show them. Works with OpenStreetMap or a Google Maps embed.',
  behaviors: ['opennow'],
  bestFor: ['Restaurants, cafes and bakeries', 'Clinics, dentists, vets and salons', 'Shops, garages and any business with a street address'],
  schema: state => {
    const f = state.fields || {};
    const name = plain(f.businessName);
    if (!name) return null;
    const spec = (state.lists?.hours || [])
      .filter(r => r.closed !== 'closed' && DAYS.includes(r.day) && hhmm(r.opens) && hhmm(r.closes))
      .map(r => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: r.day, opens: hhmm(r.opens), closes: hhmm(r.closes) }));
    const address = { '@type': 'PostalAddress', streetAddress: plain(f.street), addressLocality: plain(f.city), postalCode: plain(f.postcode), addressCountry: plain(f.country) };
    for (const k of Object.keys(address)) if (!address[k]) delete address[k];
    return {
      '@context': 'https://schema.org',
      '@type': TYPES.some(([v]) => v === f.businessType) ? f.businessType : 'LocalBusiness',
      name,
      ...(Object.keys(address).length > 1 && { address }),
      ...(plain(f.phone) && { telephone: plain(f.phone) }),
      ...(/^https?:/.test(f.directionsUrl || '') && { hasMap: f.directionsUrl }),
      ...(spec.length && { openingHoursSpecification: spec }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'business', label: 'Business (for search engines)' },
    { id: 'items', label: 'Opening hours' },
    { id: 'badge', label: 'Live “Open now” badge', toggle: 'showBadge' },
    { id: 'location', label: 'Address and map' },
    { id: 'contact', label: 'Contact and buttons' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Visit us' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Come and *say hello*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Fresh coffee, warm bread and a table by the window. Here is when we are open and how to find us.' },

    { key: 'businessName', group: 'business', label: 'Business name', type: 'text', value: 'Juniper & Oak Café', hint: 'Written into the page as LocalBusiness data. Leave empty to leave the data out.' },
    { key: 'businessType', group: 'business', label: 'Type of business', type: 'choice', options: TYPES, value: 'CafeOrCoffeeShop', hint: 'The closest schema.org type, so search engines know what kind of place this is.' },
    { key: 'timezone', group: 'business', label: 'Time zone', type: 'text', value: 'Europe/London', hint: 'The place’s time zone name, such as Europe/London, America/New_York or Asia/Kolkata. The Open now badge uses it, so visitors in other countries still see the right answer.' },

    { key: 'hoursTitle', group: 'items', label: 'Table title', type: 'text', value: 'Opening hours' },
    { key: 'special', group: 'items', label: 'Note under the table (optional)', type: 'textarea', value: 'Bank holidays: 10:00 – 15:00. We close early on Christmas Eve.' },
    { key: 'closedLabel', group: 'items', label: 'Word for a closed day', type: 'text', value: 'Closed' },

    { key: 'openLabel', group: 'badge', label: 'Open text', type: 'text', value: 'Open now' },
    { key: 'closesLabel', group: 'badge', label: 'Closing time text', type: 'text', value: 'closes at' },
    { key: 'shutLabel', group: 'badge', label: 'Closed text', type: 'text', value: 'Closed now' },
    { key: 'opensLabel', group: 'badge', label: 'Next opening text', type: 'text', value: 'opens' },

    { key: 'street', group: 'location', label: 'Street address', type: 'text', value: '14 Mill Lane' },
    { key: 'city', group: 'location', label: 'Town or city', type: 'text', value: 'Bath' },
    { key: 'postcode', group: 'location', label: 'Postcode', type: 'text', value: 'BA1 1AA' },
    { key: 'country', group: 'location', label: 'Country (optional)', type: 'text', value: 'United Kingdom' },
    { key: 'addrIcon', group: 'location', label: 'Address icon', type: 'icon', value: 'map-pin' },
    { key: 'mapUrl', group: 'location', label: 'Map embed URL', type: 'url', value: 'https://www.openstreetmap.org/export/embed.html?bbox=-2.3640%2C51.3790%2C-2.3540%2C51.3830&layer=mapnik&marker=51.3811%2C-2.3590', hint: 'On openstreetmap.org use Share → HTML and copy the iframe’s src. For Google Maps use Share → Embed a map and copy the src. Leave empty to hide the map.' },
    { key: 'mapTitle', group: 'location', label: 'Map title (screen readers)', type: 'text', value: 'Map showing Juniper & Oak Café on Mill Lane' },

    { key: 'phone', group: 'contact', label: 'Phone (optional)', type: 'text', value: '+44 1225 000 000' },
    { key: 'phoneUrl', group: 'contact', label: 'Phone link', type: 'url', value: 'tel:+441225000000', hint: 'Starts with tel: followed by the number without spaces.' },
    { key: 'phoneIcon', group: 'contact', label: 'Phone icon', type: 'icon', value: 'phone' },
    { key: 'email', group: 'contact', label: 'Email (optional)', type: 'text', value: 'hello@webdevpuneet.com' },
    { key: 'emailUrl', group: 'contact', label: 'Email link', type: 'url', value: 'mailto:hello@webdevpuneet.com' },
    { key: 'emailIcon', group: 'contact', label: 'Email icon', type: 'icon', value: 'mail' },
    { key: 'directionsLabel', group: 'contact', label: 'Directions button text', type: 'text', value: 'Get directions' },
    { key: 'directionsUrl', group: 'contact', label: 'Directions link', type: 'url', value: 'https://www.google.com/maps/search/?api=1&query=14+Mill+Lane+Bath+BA1+1AA', hint: 'A Google Maps or Apple Maps link to your address. It is also written as the place’s map link for search engines.' },
    { key: 'callLabel', group: 'contact', label: 'Call button text (optional)', type: 'text', value: 'Call us' },
  ],
  lists: [{
    key: 'hours', group: 'items', label: 'Days', itemLabel: 'Day', titleKey: 'day', min: 1, max: 14,
    fields: [
      { key: 'day', label: 'Day', type: 'choice', options: DAYS.map(d => [d, d]), value: 'Monday' },
      { key: 'closed', label: 'Open or closed', type: 'choice', options: [['', 'Open'], ['closed', 'Closed all day']], value: '' },
      { key: 'opens', label: 'Opens', type: 'text', value: '09:00', hint: 'Like 09:00, 17:30 or 9:00 AM. The Open now badge and search engines read this.' },
      { key: 'closes', label: 'Closes', type: 'text', value: '17:00', hint: 'A time earlier than the opening time means it closes after midnight.' },
      { key: 'note', label: 'Note (optional)', type: 'text', value: '', hint: 'For example: Brunch until 2 pm. For a lunch break, add the same day twice (morning, then afternoon).' },
    ],
    value: [
      { day: 'Monday', closed: 'closed', opens: '08:00', closes: '17:00', note: '' },
      { day: 'Tuesday', closed: '', opens: '08:00', closes: '17:00', note: '' },
      { day: 'Wednesday', closed: '', opens: '08:00', closes: '17:00', note: '' },
      { day: 'Thursday', closed: '', opens: '08:00', closes: '17:00', note: '' },
      { day: 'Friday', closed: '', opens: '08:00', closes: '20:00', note: 'Open late, with live music' },
      { day: 'Saturday', closed: '', opens: '09:00', closes: '18:00', note: 'Brunch until 2 pm' },
      { day: 'Sunday', closed: '', opens: '09:00', closes: '15:00', note: '' },
    ],
  }],
  toggles: [{ key: 'showBadge', label: 'Live “Open now” badge', value: true }],
  theme: { brand: '#b4532a', brandText: '#ffffff', bg: '#fbf7f2', surface: '#ffffff', text: '#2a1d14', muted: '#6f5f52', radius: '16' },
  fonts: { heading: 'playfair', body: 'dmsans' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="oh" data-opennow data-set="data-tz:timezone;data-open-label:openLabel;data-closes-label:closesLabel;data-shut-label:shutLabel;data-opens-label:opensLabel">
    <div class="oh-card oh-hours" data-anim="item">
      <div class="oh-top">
        <h3 class="oh-title" data-edit="hoursTitle"></h3>
        <p class="oh-badge" data-open-badge data-show="showBadge" role="status" hidden><span class="oh-dot" aria-hidden="true"></span><span class="oh-badge-text"></span></p>
      </div>
      <ol class="oh-list" data-list="hours">
        <li class="oh-row" data-hours-row data-set="data-day:day;data-open:opens;data-close:closes;data-closed:closed">
          <span class="oh-day" data-edit="day"></span>
          <span class="oh-time" data-hide-if="closed"><time data-edit="opens"></time> <span aria-hidden="true">–</span> <time data-edit="closes"></time></span>
          <span class="oh-shut" data-show-if="closed" data-edit="closedLabel"></span>
          <span class="oh-note" data-show-if="note" data-edit="note"></span>
        </li>
      </ol>
      <p class="oh-special" data-show-if="special" data-edit="special"></p>
    </div>
    <div class="oh-side">
      <div class="oh-map" data-anim="media" data-show-if="mapUrl">
        <iframe class="oh-frame" data-set="src:mapUrl;title:mapTitle" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="oh-card oh-contact" data-anim="item">
        <ul class="oh-info">
          <li class="oh-item"><span class="st-icon" data-icon="addrIcon"></span>
            <address class="oh-addr">
              <span class="oh-line oh-name" data-show-if="businessName" data-edit="businessName"></span>
              <span class="oh-line" data-show-if="street" data-edit="street"></span>
              <span class="oh-line"><span data-edit="postcode"></span> <span data-edit="city"></span></span>
              <span class="oh-line" data-show-if="country" data-edit="country"></span>
            </address>
          </li>
          <li class="oh-item" data-show-if="phone"><span class="st-icon" data-icon="phoneIcon"></span><a class="oh-link" data-href="phoneUrl" data-edit="phone"></a></li>
          <li class="oh-item" data-show-if="email"><span class="st-icon" data-icon="emailIcon"></span><a class="oh-link" data-href="emailUrl" data-edit="email"></a></li>
        </ul>
        <div class="st-btns">
          <a class="st-btn" data-show-if="directionsLabel" data-href="directionsUrl"><span data-edit="directionsLabel"></span></a>
          <a class="st-btn st-btn--ghost" data-show-if="callLabel" data-href="phoneUrl"><span data-edit="callLabel"></span></a>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.st-opening-hours{padding:clamp(64px,8cqi,112px) 0}
.oh{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:clamp(18px,2.6cqi,32px);align-items:stretch}
.oh-card{padding:clamp(22px,2.8cqi,34px);border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);box-shadow:0 24px 60px -44px color-mix(in srgb,var(--st-text) 55%,transparent)}
.oh-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;margin-bottom:6px}
.oh-title{font-size:clamp(21px,2.3cqi,26px)}
.oh-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:999px;background:color-mix(in srgb,var(--st-text) 7%,transparent);color:var(--st-text);font-size:13.5px;font-weight:700}
.oh-badge[hidden]{display:none}
.oh-dot{width:9px;height:9px;border-radius:50%;background:#94a3b8}
.oh-badge.is-open{background:rgba(34,197,94,.15);color:color-mix(in srgb,#16a34a 78%,var(--st-text))}
.oh-badge.is-open .oh-dot{background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.25)}
.oh-badge.is-shut{background:rgba(239,68,68,.12);color:color-mix(in srgb,#dc2626 78%,var(--st-text))}
.oh-badge.is-shut .oh-dot{background:#ef4444}
.oh-list{list-style:none;margin:0;padding:0}
.oh-row{display:grid;grid-template-columns:minmax(96px,auto) 1fr;gap:3px 16px;align-items:baseline;padding:13px 12px;margin:0 -12px;border-bottom:1px dashed color-mix(in srgb,var(--st-text) 14%,transparent);font-size:16px}
.oh-row:last-child{border-bottom:0}
.oh-day{font-weight:700}
.oh-time,.oh-shut{justify-self:end;font-variant-numeric:tabular-nums}
.oh-shut{color:var(--st-muted)}
.oh-note{grid-column:1 / -1;justify-self:end;color:var(--st-muted);font-size:13.5px}
.oh-row.is-today{background:color-mix(in srgb,var(--st-brand) 10%,transparent);border-radius:10px;border-bottom-color:transparent}
.oh-row.is-today .oh-day{color:var(--st-brand)}
.oh-row.is-today .oh-day::before{content:"";display:inline-block;width:8px;height:8px;margin-right:9px;border-radius:50%;background:var(--st-brand)}
.oh-special{margin-top:14px;padding-top:14px;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);color:var(--st-muted);font-size:14.5px}
.oh-side{display:flex;flex-direction:column;gap:clamp(14px,2cqi,20px);min-width:0}
.oh-map{flex:1;min-height:280px;overflow:hidden;border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.oh-frame{display:block;width:100%;height:100%;min-height:280px;border:0}
.oh-info{list-style:none;margin:0 0 18px;padding:0;display:grid;gap:14px}
.oh-item{display:flex;align-items:flex-start;gap:14px}
.oh-item .st-icon{width:42px;height:42px;background:color-mix(in srgb,var(--st-brand) 14%,transparent)}
.oh-item .st-icon svg{width:20px;height:20px}
.oh-addr{display:flex;flex-direction:column;font-style:normal;font-size:16px;line-height:1.5;padding-top:2px}
.oh-name{font-weight:700}
.oh-link{align-self:center;color:var(--st-text);font-size:16.5px;font-weight:600;text-decoration:none;word-break:break-word}
.oh-link:hover{color:var(--st-brand);text-decoration:underline}
.oh-contact .st-btns{display:flex;flex-wrap:wrap;gap:12px}
@container st (max-width:860px){.oh{grid-template-columns:1fr}.oh-map,.oh-frame{min-height:260px}}
@media (prefers-reduced-motion:reduce){.oh-dot{box-shadow:none!important}}`,
};
