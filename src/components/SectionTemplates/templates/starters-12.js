/* Website templates, part 12: the Auto Repair Garage. Same shape as starters-6 to 11.js: home `sections`, hand-written `pages` for
   the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js. SEO text:
   seo-website-templates-12.js.

   It uses the Price Estimator (quote-estimator.js, new with this template) and the Services & Booking List (services-booking.js)
   with an emergency strip, reasons to choose the garage, a workshop story, numbers, the team, reviews, the booking form and
   Opening Hours & Location. Photos are auto-*.jpg in public/images/section-templates (royalty-free Pexels photos, resized and
   compressed). Every internal link is a "#page" token, resolved by fixSiteLinks() like the other starters. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));

/* services: [category, icon, name, text, duration, priceNote, price] */
const S = (category, icon, name, text, duration, priceNote, price) => ({ category, icon, name, text, duration, priceNote, price, button: 'Book', url: '#book' });
const SERVICES = [
  S('MOT', 'shield-check', 'MOT test', 'The full annual test for cars up to 3.5 tonnes. If it fails, repairs within ten days get a free partial retest.', '45 min', '', '£54.85'),
  S('Servicing', 'clock', 'Interim service', 'Oil and filter change, fluid top-ups and a 30-point safety check, for high-mileage drivers every six months.', '1.5 hours', 'from', '£109'),
  S('Servicing', 'award', 'Full service', 'A 60-point inspection, new oil, oil, air and pollen filters and spark plugs where needed, with a printed report.', '3 hours', 'from', '£179'),
  S('Brakes and tyres', 'gauge', 'Brake pads and discs', 'New pads and discs on one axle, with the fluid checked and a test drive to finish.', '2 hours', 'from', '£189'),
  S('Brakes and tyres', 'layers', 'Tyres fitted and balanced', 'Premium and budget tyres in stock, fitted, balanced and with the pressure and alignment checked.', '45 min', 'from', '£55'),
  S('Repairs', 'cpu', 'Diagnostics check', 'A full computer scan and visual check to find the cause of a warning light, with a written estimate before any repair.', '1 hour', '', '£45'),
  S('Repairs', 'zap', 'Clutch replacement', 'A new clutch kit and flywheel check, fitted by our master technician, with a 12-month warranty.', 'Day visit', 'from', '£520'),
  S('Repairs', 'sparkles', 'Air-con regas', 'A leak check, a full regas and a performance test, so the air-conditioning blows cold again.', '1 hour', 'from', '£69'),
];

const NAV = ['navbar-simple', {
  fields: { logoText: 'Redline Garage', logoIcon: 'gauge', cta: 'Book a service', ctaUrl: '#book', login: '' },
  lists: { links: links(['Services', '#services'], ['Price check', '#quote'], ['Why us', '#why'], ['Team', '#team'], ['Contact', '#contact']) },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('auto-hero.jpg'), eyebrow: 'MOT, servicing and repairs · Leeds',
    headline: 'Honest repairs. *Fair prices.*',
    lead: 'A family-run garage that tells you what your car needs, what it costs and what can wait, before any work starts. Book an MOT or a service online in a minute.',
    cta1: 'Book a service', cta1Url: '#book', cta2: 'Check your price', cta2Url: '#quote',
    s1Value: '4.9 ★', s1Label: 'from 1,100 reviews', s2Value: 'Same day', s2Label: 'MOTs and repairs', s3Value: '12 months', s3Label: 'warranty on all work',
  },
}];

const EMERGENCY = ['cta-strip', { fields: {
  icon: 'phone', heading: 'Broken down?', lead: 'Our recovery partner reaches most of Leeds within 45 minutes, day or night.',
  cta1: 'Call 0113 496 0188', cta1Url: 'tel:+441134960188', cta2: '', cta2Url: '',
} }];

const SERVICES_SECTION = (anchor, extra = {}) => ['services-booking', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Services and prices', heading: 'Clear prices, *no surprises*', lead: 'What we do, how long it takes and what it costs. Pick a category to narrow the list.', allLabel: 'All services', filterLabel: 'Service categories', ...extra },
  lists: { services: SERVICES },
}];

const ESTIMATOR = (anchor) => ['quote-estimator', {
  ...(anchor && { anchor }),
  fields: {
    eyebrow: 'Price check', heading: 'Know the price *before you book*',
    lead: 'Choose the job and your vehicle for an instant estimate. No sign-up and no pushy phone calls.',
    serviceLabel: '1. What do you need?', vehicleLabel: '2. What do you drive?', resultTitle: 'Your estimate', fromText: 'From', timePrefix: 'Takes about',
    note: 'This is an estimate. We confirm the exact price after a free inspection, and never start work without your say-so.',
    cta: 'Book this service', ctaUrl: '#book',
  },
  lists: {
    services: [
      { name: 'MOT test', priceS: '£54.85', priceM: '£54.85', priceL: '£54.85', duration: '45 minutes' },
      { name: 'Interim service', priceS: '£109', priceM: '£129', priceL: '£149', duration: '1.5 hours' },
      { name: 'Full service', priceS: '£179', priceM: '£209', priceL: '£249', duration: '3 hours' },
      { name: 'Brake pads and discs', priceS: '£189', priceM: '£239', priceL: '£299', duration: '2 hours' },
      { name: 'Diagnostics check', priceS: '£45', priceM: '£45', priceL: '£55', duration: '1 hour' },
    ],
    vehicles: [
      { name: 'Small car', note: 'Fiesta, Polo, Corsa', size: 's' },
      { name: 'Family car', note: 'Golf, Focus, Qashqai', size: 'm' },
      { name: 'Large car or van', note: 'Transit, X5, Sprinter', size: 'l' },
    ],
  },
}];

const WHY = ['features-icon-grid', {
  anchor: 'why',
  fields: { eyebrow: 'Why Redline', heading: 'A garage you can *trust*', lead: 'The things that make the difference when someone else is looking after your car.' },
  lists: { features: [
    { icon: 'shield-check', title: 'Fixed prices up front', text: 'You get a written estimate before any work, and we phone you first if anything changes.', link: '', url: '#' },
    { icon: 'award', title: '12-month warranty', text: 'Every repair and every part we fit is covered for a year and 12,000 miles.', link: '', url: '#' },
    { icon: 'clock', title: 'Same-day MOTs and repairs', text: 'Book before 10 am and most cars are ready by the end of the day, with a lift to town if you need one.', link: '', url: '#' },
  ] },
}];

const WORKSHOP = ['features-split-image', {
  fields: {
    eyebrow: 'The workshop', heading: 'Modern kit, *old-fashioned care*',
    lead: 'Four ramps, up-to-date diagnostic equipment and technicians who keep training, all under one roof, so most jobs are done in a day.',
    cta: 'Book a visit', ctaUrl: '#book',
    image: IMG('auto-lift.jpg'), imageAlt: 'A grey 4x4 on a lift in a tidy, well-lit garage workshop',
  },
  lists: { points: [
    { icon: 'cpu', title: 'Latest diagnostics', text: 'We read the codes on almost every make, so we find the real fault, not just the symptom.' },
    { icon: 'users', title: 'Trained technicians', text: 'Every technician is fully qualified and trained on hybrid and electric vehicles.' },
    { icon: 'heart', title: 'Free health check', text: 'Every visit includes a free 20-point check, with photos of anything we find.' },
  ] },
}];

const STATS = ['stats-counters', { fields: { eyebrow: 'In numbers', heading: 'Twenty years *on the Foundry Road*' }, lists: { stats: [
  { value: '20', label: 'Years in Leeds', note: 'since 2005' },
  { value: '40,000', label: 'Cars serviced', note: 'and counting' },
  { value: '4.9★', label: 'Google rating', note: '1,100+ reviews' },
  { value: '12', label: 'Months warranty', note: 'on all work' },
] } }];

const TEAM = (anchor) => ['team-grid', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Our team', heading: 'The people who *look after your car*', lead: 'A small team with over sixty years of experience between them.' },
  lists: { members: [
    { photo: av(7), name: 'Dave Marsh', role: 'Owner and MOT tester', bio: 'Opened Redline in 2005 and still tests cars every day.' },
    { photo: av(6), name: 'Priya Shah', role: 'Service manager', bio: 'Your first call, and the person who explains every estimate.' },
    { photo: av(3), name: 'Tomasz Kowal', role: 'Master technician', bio: 'Specialist in clutches, gearboxes and tricky electrical faults.' },
    { photo: av(2), name: 'Leah Ford', role: 'Front desk and bookings', bio: 'Keeps the diary running and the kettle on.' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *Leeds drivers*', lead: '★ 4.9 from 1,100+ Google reviews' },
  lists: { quotes: [
    { quote: 'They found a worn brake hose another garage had missed, showed me photos and fixed it for half what I expected. Honest and quick.', name: 'Hannah W.', role: 'Customer for six years', avatar: av(2) },
    { quote: 'I booked an MOT online at 9 am and had the car back by lunch. Clear prices, no upselling and a proper explanation of what was done.', name: 'Marcus B.', role: 'Van driver', avatar: av(3) },
    { quote: 'As a woman who knows very little about cars, I have never felt so respected in a garage. Priya explains everything in plain English.', name: 'Priya N.', role: 'Family car owner', avatar: av(5) },
  ] },
}];

const BOOKING = ['booking-form', {
  anchor: 'book',
  fields: {
    eyebrow: 'Book online', heading: 'Request *a booking*',
    lead: 'Tell us what your car needs and when suits you. We confirm every booking by phone or text within the hour during opening times.',
    hoursHeading: 'Garage hours', expectHeading: 'What to expect',
    expect: 'A free 20-point health check with every visit\nA written estimate before any work starts\nA lift into town or a courtesy car for longer jobs',
    serviceLabel: 'What do you need?', dateLabel: 'Preferred day', timeLabel: 'Drop-off time', notesLabel: 'Car make, model, registration and anything we should know',
    submit: 'Request booking', note: 'This is a request, not a confirmed booking. For a breakdown, please call us.',
    successTitle: 'Request received', successText: 'Thank you. We will confirm your booking by phone or text shortly.',
  },
  lists: {
    hours: [{ day: 'Monday – Friday', time: '8:00 am – 6:00 pm' }, { day: 'Saturday', time: '8:30 am – 2:00 pm' }, { day: 'Sunday', time: 'Closed' }],
    services: [...SERVICES.map(s => s.name), 'Something else'].map(name => ({ name })),
    times: ['8:00 am', '9:00 am', '10:00 am', '12:00 pm', '2:00 pm', '4:00 pm'].map(name => ({ name })),
  },
}];

const HOURS = (fields = {}) => ['opening-hours', {
  anchor: 'contact',
  fields: {
    eyebrow: 'Visit us', heading: 'Come and *see us*', lead: 'Free parking outside, and a waiting area with tea, coffee and wifi. Drop-offs from 8 am.',
    businessName: 'Redline Garage', businessType: 'AutoRepair', timezone: 'Europe/London', hoursTitle: 'Garage hours',
    special: 'Closed on bank holidays. Out of hours, call our recovery line.',
    street: '14 Foundry Road', city: 'Leeds', postcode: 'LS1 4AB', country: 'United Kingdom',
    mapUrl: OSM(-1.5491, 53.7997), mapTitle: 'Map showing Redline Garage on Foundry Road, Leeds',
    phone: '+44 113 496 0188', phoneUrl: 'tel:+441134960188', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
    directionsLabel: 'Get directions', directionsUrl: 'https://www.google.com/maps/search/?api=1&query=14%20Foundry%20Road%2C%20Leeds%20LS1', callLabel: 'Call the garage',
    ...fields,
  },
  lists: { hours: [
    ['Monday', '08:00', '18:00'], ['Tuesday', '08:00', '18:00'], ['Wednesday', '08:00', '18:00'], ['Thursday', '08:00', '18:00'],
    ['Friday', '08:00', '18:00'], ['Saturday', '08:30', '14:00', 'MOTs and tyres'], ['Sunday', '', '', '', 'closed'],
  ].map(([day, opens, closes, note = '', closed = '']) => ({ day, opens, closes, note, closed })) },
}];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Redline Garage', logoIcon: 'gauge', tagline: 'Honest MOTs, servicing and repairs in Leeds since 2005.', copyright: '© 2026 Redline Garage Ltd. All rights reserved.', legal: 'Privacy | /privacy/\nWarranty | #why' },
  lists: {
    columns: [
      { title: 'Services', links: 'MOT test | #services\nServicing | #services\nBrakes and tyres | #services\nPrice check | #quote' },
      { title: 'Garage', links: 'Book online | #book\nOur team | #team\nOpening hours | #contact\nOur story | #story' },
      { title: 'Contact', links: 'Call 0113 496 0188 | tel:+441134960188\n14 Foundry Road | #contact\nEmail us | mailto:hello@webdevpuneet.com' },
    ],
    socials: [
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'phone', label: 'Call the garage', url: 'tel:+441134960188' },
    ],
  },
}];

export const GARAGE_WEBSITE_TEMPLATES = [
  {
    id: 'garage', name: 'Auto Repair Garage Website', industry: 'Cars & transport',
    blurb: 'A garage and MOT centre: services and prices with filters, instant price estimator, breakdown number, team, online booking request and opening hours with a map.',
    theme: { brand: '#d9261c', brandText: '#ffffff', bg: '#fafafa', surface: '#f0f1f3', text: '#15181d', muted: '#5a6472', radius: '10', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Garage Website Template — Free Auto Repair HTML Template',
    seoDescription: 'Free auto repair garage website template: services and prices, instant price estimator, breakdown call strip, team and online booking request. Export HTML.',
    keywords: ['garage website template', 'auto repair website template', 'car mechanic website template', 'mot centre website template html', 'car garage landing page', 'auto repair shop website with booking'],
    intro: 'A trustworthy website for a garage, MOT centre or auto repair shop. A photo hero with a "Book a service" button leads into a breakdown call strip, a services and prices list that filters by MOT, servicing, brakes and tyres and repairs, and a price estimator where drivers pick a job and their vehicle size for an instant estimate. Reasons to choose you, the workshop, your numbers, the team, reviews, an online booking request and live opening hours with a map complete the page.',
    bestFor: ['Garages and MOT centres', 'Tyre, brake and exhaust specialists', 'Car valeting, bodywork and detailing shops'],
    sections: [NAV, HERO, EMERGENCY, SERVICES_SECTION('services'), ESTIMATOR('quote'), WHY, WORKSHOP, STATS, TEAM('team'), REVIEWS, BOOKING, HOURS(), FOOTER],
    multiLinks: { '#book': 'book.html', '#quote': 'services.html#quote', '#why': 'index.html#why', '#team': 'about.html#team', '#contact': 'book.html#contact', '#story': 'about.html#story' },
    homeTitle: 'Redline Garage: MOT, Servicing and Repairs in Leeds',
    homeDescription: 'Redline Garage is a family-run Leeds garage offering MOTs, servicing and repairs with fixed prices, a 12-month warranty and same-day bookings. Get a price.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Services and Prices: MOT, Servicing and Repairs | Redline',
        description: 'See every Redline Garage service with its price and time in Leeds: MOT, servicing, brakes, tyres and repairs, plus an instant price estimator for your vehicle.',
        sections: [
          SERVICES_SECTION(),
          ESTIMATOR('quote'),
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Questions about *prices and repairs*', lead: 'What drivers ask before they book.', contactText: 'Still unsure?', contactLink: 'Call the garage', contactUrl: 'tel:+441134960188' }, toggles: {}, lists: { faqs: [
            { q: 'Do you give a price before starting work?', a: 'Always. You get a written estimate before any work starts, and if we find anything else we phone you first and wait for your say-so.' },
            { q: 'What happens if my car fails its MOT?', a: 'We explain exactly what failed and quote the repair. If you leave the car with us and the repairs are done within ten working days, the partial retest is free.' },
            { q: 'Will servicing here affect my manufacturer warranty?', a: 'No. We use parts of manufacturer quality and record the service in your book, so your new-car warranty stays valid.' },
            { q: 'Do you offer a courtesy car or a lift?', a: 'We give a free lift into Leeds centre for jobs that take over two hours, and courtesy cars are available for longer repairs when booked ahead.' },
            { q: 'How long is your warranty?', a: 'Twelve months or 12,000 miles on every repair and every part we fit, whichever comes first.' },
          ] } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Redline Garage: Family-Run in Leeds Since 2005',
        description: 'Meet the Redline Garage team in Leeds and read the story of a family-run workshop that has serviced over 40,000 cars with honest, plain advice since 2005.',
        sections: [
          TEAM(),
          ['about-story', {
            anchor: 'story',
            fields: {
              eyebrow: 'Our story', heading: 'A garage built on *plain speaking*',
              story: 'Dave Marsh opened Redline in 2005 after years in a dealership, where he felt customers were never told what their cars really needed. He wanted to run a garage where the advice is honest and the prices are clear.',
              story2: 'Twenty years later the team has grown to eleven, with four ramps and a customer waiting area, and Dave still tests cars every morning before the phone starts ringing.',
              image: IMG('auto-about.jpg'), imageAlt: 'A mechanic in a grey work shirt holding a wheel wrench in the garage',
              badgeNumber: '20', badgeLabel: 'years on Foundry Road',
              founderPhoto: av(7), founderPhotoAlt: 'Dave Marsh, owner', founder: 'Dave Marsh', founderRole: 'Owner and MOT tester',
              quote: '“If you would not do it to your own car, we do not do it to yours.”',
              primaryLabel: 'Book a service', primaryUrl: '#book', secondaryLabel: 'See prices', secondaryUrl: '#services',
              orgName: 'Redline Garage', foundedYear: '2005',
            },
            lists: {
              facts: [{ number: '40k', label: 'cars serviced' }, { number: '11', label: 'people on the team' }, { number: '4.9', label: 'average review' }],
              values: [
                { icon: 'shield-check', title: 'Honest advice', text: 'We tell you what needs doing now, what can wait and what you do not need at all.' },
                { icon: 'award', title: 'Work that lasts', text: 'Good parts, careful fitting and a 12-month warranty on everything we do.' },
                { icon: 'users', title: 'Treated like family', text: 'Drop in, ask a question, or just have a cup of tea. No appointment needed for advice.' },
              ],
            },
          }],
          ['gallery-grid', {
            fields: { eyebrow: 'In the garage', heading: 'A look *around the workshop*', lead: 'Our team at work, and the equipment that helps them find faults quickly.', allLabel: 'All' },
            lists: { images: [
              { image: IMG('auto-bay.jpg'), imageAlt: 'A mechanic checking an engine with a tablet', tag: 'Workshop', title: 'Engine checks', text: 'Every car gets a free health check' },
              { image: IMG('auto-clipboard.jpg'), imageAlt: 'A mechanic writing an estimate on a clipboard beside an orange car', tag: 'Customers', title: 'Written estimates', text: 'Before any work starts' },
              { image: IMG('auto-handshake.jpg'), imageAlt: 'A mechanic shaking hands with a customer', tag: 'Customers', title: 'Face to face', text: 'We explain everything' },
              { image: IMG('auto-lift.jpg'), imageAlt: 'A 4x4 on a lift in the workshop', tag: 'Workshop', title: 'Four ramps', text: 'Most jobs done in a day' },
            ] },
          }],
        ],
      },
      {
        name: 'Book', slug: 'book',
        title: 'Book an MOT or Service Online in Leeds | Redline Garage',
        description: 'Request an MOT, a service or a repair at Redline Garage in Leeds: choose the job, a day and a drop-off time, and we confirm by phone or text within the hour.',
        sections: [BOOKING, HOURS({ heading: 'Find *the garage*' }), EMERGENCY],
      },
    ],
  },
];
