/* Website templates, part 13: the Plumber & Heating engineer (a trades business). Same shape as starters-6 to 12.js: home `sections`,
   hand-written `pages` for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js. SEO text:
   seo-website-templates-13.js.

   It uses the Service Area Checker (service-area.js, new with this template), the Services & Booking List and the Price Estimator
   (here the second choice is the size of the home), with an emergency strip, reasons to choose the firm, a bathroom story,
   numbers, the team, reviews, the booking form and Opening Hours & Location. Photos are plumb-*.jpg in
   public/images/section-templates (royalty-free Pexels photos, resized and compressed). Every internal link is a "#page" token,
   resolved by fixSiteLinks() like the other starters. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));

/* services: [category, icon, name, text, duration, priceNote, price] */
const S = (category, icon, name, text, duration, priceNote, price) => ({ category, icon, name, text, duration, priceNote, price, button: 'Book', url: '#book' });
const SERVICES = [
  S('Emergency', 'clock', 'Emergency call-out', 'A plumber at your door day or night to stop the water, make things safe and give you a clear price to fix it.', 'Within 60 min', 'from', '£95'),
  S('Emergency', 'zap', 'Leak or burst pipe repair', 'We trace the leak, repair or replace the pipe and dry-check the area, with the repair guaranteed for 12 months.', '1–2 hours', 'from', '£120'),
  S('Emergency', 'shield-check', 'Blocked drain or toilet', 'Clearing with electric rods and a camera check if needed, so the blockage does not come straight back.', '1 hour', 'from', '£85'),
  S('Boilers and heating', 'gauge', 'Boiler service', 'A full Gas Safe service with efficiency check, safety certificate and a reminder for next year.', '1 hour', '', '£85'),
  S('Boilers and heating', 'sparkles', 'Power flush', 'A deep clean of your radiators and pipework to remove sludge, restore heat and protect your boiler.', '1 day', 'from', '£450'),
  S('Boilers and heating', 'award', 'New boiler fitted', 'A new A-rated boiler supplied and fitted by a Gas Safe engineer, with a 10-year manufacturer guarantee.', '1 day', 'from', '£1,850'),
  S('Bathrooms', 'layers', 'Bathroom suite fitted', 'A full bathroom installation: removal, plumbing, tiling and fitting, project-managed by one named plumber.', '3–5 days', 'from', '£2,400'),
  S('Repairs', 'heart', 'Tap, toilet and shower repair', 'Dripping taps, running toilets and weak showers fixed on the first visit, with common parts on the van.', '1 hour', 'from', '£65'),
];

const NAV = ['navbar-simple', {
  fields: { logoText: 'BlueFlow', logoIcon: 'cloud', cta: 'Book a visit', ctaUrl: '#book', login: '' },
  lists: { links: links(['Services', '#services'], ['Price check', '#quote'], ['Areas', '#areas'], ['About', '#about'], ['Contact', '#contact']) },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('plumb-hero.jpg'), eyebrow: 'Plumbing and heating · Manchester',
    headline: 'Fixed fast. *Fixed right.*',
    lead: 'Gas Safe plumbers and heating engineers who arrive on time, explain the problem in plain English and give you a fixed price before they start.',
    cta1: 'Book a visit', cta1Url: '#book', cta2: 'Check your area', cta2Url: '#areas',
    s1Value: '4.9 ★', s1Label: 'from 960 reviews', s2Value: '60 min', s2Label: 'average emergency response', s3Value: '12 months', s3Label: 'guarantee on all work',
  },
}];

const EMERGENCY = ['cta-strip', { fields: {
  icon: 'phone', heading: 'Burst pipe or no heating?', lead: 'Our 24/7 emergency plumbers are on call tonight. Call now and we will talk you through stopping the water.',
  cta1: 'Call 0161 496 0142', cta1Url: 'tel:+441614960142', cta2: '', cta2Url: '',
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
    lead: 'Choose the job and the size of your home for an instant estimate. No sign-up and no pushy phone calls.',
    serviceLabel: '1. What do you need?', vehicleLabel: '2. How big is your home?', resultTitle: 'Your estimate', fromText: 'From', timePrefix: 'Takes about',
    note: 'This is an estimate. We confirm the exact price at a free survey, and never start work without your say-so.',
    cta: 'Book this job', ctaUrl: '#book',
  },
  lists: {
    services: [
      { name: 'Boiler service', priceS: '£85', priceM: '£85', priceL: '£95', duration: '1 hour' },
      { name: 'Power flush', priceS: '£380', priceM: '£450', priceL: '£560', duration: '1 day' },
      { name: 'New boiler fitted', priceS: '£1,650', priceM: '£1,850', priceL: '£2,250', duration: '1 day' },
      { name: 'Bathroom suite fitted', priceS: '£2,100', priceM: '£2,400', priceL: '£3,200', duration: '3 to 5 days' },
      { name: 'Leak or burst pipe repair', priceS: '£95', priceM: '£120', priceL: '£150', duration: '1 to 2 hours' },
    ],
    vehicles: [
      { name: 'Flat or small home', note: '1 to 2 bedrooms', size: 's' },
      { name: 'Family house', note: '3 bedrooms', size: 'm' },
      { name: 'Large house', note: '4 or more bedrooms', size: 'l' },
    ],
  },
}];

const AREAS = (anchor) => ['service-area', {
  ...(anchor && { anchor }),
  fields: {
    eyebrow: 'Where we work', heading: 'Do we cover *your area?*',
    lead: 'Type your postcode to find out if we cover you, and how soon we can usually be with you.',
    inputLabel: 'Your postcode', placeholder: 'For example M20 4BT', button: 'Check my area', matchMode: 'uk',
    yesText: 'Good news: we cover {p} ({area}). We can usually be with you within {eta}.',
    noText: 'Sorry, {p} is outside our usual area. Call us anyway, as we may still be able to help.',
    badText: 'Please enter your full postcode, for example M20 4BT.',
    ctaLabel: 'Book a visit', ctaUrl: '#book', listTitle: 'Areas we cover', note: 'Emergency call-outs outside these areas may take longer.',
  },
  lists: { areas: [
    { code: 'M1', name: 'City centre', eta: '30 minutes' }, { code: 'M2', name: 'Spinningfields', eta: '30 minutes' }, { code: 'M3', name: 'Salford Quays', eta: '35 minutes' },
    { code: 'M4', name: 'Northern Quarter', eta: '30 minutes' }, { code: 'M14', name: 'Fallowfield', eta: '45 minutes' }, { code: 'M16', name: 'Old Trafford', eta: '45 minutes' },
    { code: 'M19', name: 'Levenshulme', eta: '45 minutes' }, { code: 'M20', name: 'Didsbury', eta: '45 minutes' }, { code: 'M21', name: 'Chorlton', eta: '45 minutes' },
    { code: 'M33', name: 'Sale', eta: '60 minutes' },
  ] },
}];

const WHY = ['features-icon-grid', {
  anchor: 'why',
  fields: { eyebrow: 'Why BlueFlow', heading: 'Tradespeople you can *trust*', lead: 'What makes the difference when someone is working in your home.' },
  lists: { features: [
    { icon: 'shield-check', title: 'Gas Safe registered', text: 'Every gas engineer is on the Gas Safe Register, and we show you the ID card before we start.', link: '', url: '#' },
    { icon: 'award', title: 'Fixed prices up front', text: 'You get a written price before any work, and we phone you first if anything changes.', link: '', url: '#' },
    { icon: 'clock', title: '12-month guarantee', text: 'Every repair and every part we fit is guaranteed for a year, with a free return visit if anything is not right.', link: '', url: '#' },
  ] },
}];

const BATHROOMS = ['features-split-image', {
  fields: {
    eyebrow: 'Bathrooms', heading: 'A new bathroom, *one point of contact*',
    lead: 'We remove the old suite, do the plumbing, tiling and fitting, and finish in days, with one named plumber looking after your project from start to finish.',
    cta: 'Book a free survey', ctaUrl: '#book',
    image: IMG('plumb-bathroom.jpg'), imageAlt: 'A bright modern bathroom with a freestanding bath and a glass shower',
  },
  lists: { points: [
    { icon: 'layers', title: 'Design and supply', text: 'Choose from our showroom range or bring your own, and we order everything for you.' },
    { icon: 'users', title: 'One plumber, start to finish', text: 'The same person who surveys the job fits the bathroom, so nothing gets lost.' },
    { icon: 'award', title: 'Tidy and on time', text: 'Dust sheets, daily tidy-ups and a fixed finish date written into your quote.' },
  ] },
}];

const STATS = ['stats-counters', { fields: { eyebrow: 'In numbers', heading: 'Fifteen years *across Manchester*' }, lists: { stats: [
  { value: '15', label: 'Years trading', note: 'since 2010' },
  { value: '28,000', label: 'Jobs completed', note: 'and counting' },
  { value: '4.9★', label: 'Google rating', note: '960+ reviews' },
  { value: '12', label: 'Months guarantee', note: 'on all work' },
] } }];

const TEAM = (anchor) => ['team-grid', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Our team', heading: 'The people who *come to your home*', lead: 'Gas Safe engineers and plumbers who have been vetted, trained and are known by name.' },
  lists: { members: [
    { photo: av(7), name: 'Sam Whitaker', role: 'Owner and Gas Safe engineer', bio: 'Started BlueFlow in 2010 with one van.' },
    { photo: av(6), name: 'Jo Barrett', role: 'Heating engineer', bio: 'Boilers, radiators and underfloor heating.' },
    { photo: av(3), name: 'Amir Hussain', role: 'Bathroom fitter', bio: 'Fits around 60 bathrooms a year.' },
    { photo: av(2), name: 'Claire Dunn', role: 'Office and dispatch', bio: 'Keeps the vans on the road and you informed.' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *Manchester homeowners*', lead: '★ 4.9 from 960+ Google reviews' },
  lists: { quotes: [
    { quote: 'A pipe burst on a Sunday night. Jo was at our door in 40 minutes, stopped the leak and fixed it for a fair price the next morning.', name: 'Hannah W.', role: 'Customer in Didsbury', avatar: av(2) },
    { quote: 'They fitted our new boiler in a day, left the house spotless and explained how to use the controls. I would use them again without a thought.', name: 'Marcus B.', role: 'Customer in Chorlton', avatar: av(3) },
    { quote: 'The bathroom was finished two days early and looks incredible. One plumber the whole way through, and the price never changed.', name: 'Priya N.', role: 'Customer in Sale', avatar: av(5) },
  ] },
}];

const BOOKING = ['booking-form', {
  anchor: 'book',
  fields: {
    eyebrow: 'Book online', heading: 'Request *a visit*',
    lead: 'Tell us what needs doing and when suits you. We confirm every request by phone or text within the hour during opening times.',
    hoursHeading: 'Office hours', expectHeading: 'What to expect',
    expect: 'A named plumber and a call when they are on their way\nA fixed written price before any work starts\nA tidy finish and a 12-month guarantee',
    serviceLabel: 'What do you need?', dateLabel: 'Preferred day', timeLabel: 'Preferred time', notesLabel: 'Tell us about the problem and your postcode',
    submit: 'Request visit', note: 'This is a request, not a confirmed booking. For an emergency, please call us.',
    successTitle: 'Request received', successText: 'Thank you. We will confirm your visit by phone or text shortly.',
  },
  lists: {
    hours: [{ day: 'Monday – Friday', time: '7:30 am – 6:30 pm' }, { day: 'Saturday', time: '8:00 am – 2:00 pm' }, { day: 'Out of hours', time: 'Emergency line, 24/7' }],
    services: [...SERVICES.map(s => s.name), 'Something else'].map(name => ({ name })),
    times: ['Morning (8–12)', 'Afternoon (12–5)', 'Early evening (5–7)', 'As soon as possible'].map(name => ({ name })),
  },
}];

const HOURS = (fields = {}) => ['opening-hours', {
  anchor: 'contact',
  fields: {
    eyebrow: 'Contact us', heading: 'Get in *touch*', lead: 'Our office is open on weekdays and Saturday mornings, and our emergency line answers day and night.',
    businessName: 'BlueFlow Plumbing and Heating', businessType: 'LocalBusiness', timezone: 'Europe/London', hoursTitle: 'Office hours',
    special: 'Emergency line open 24/7, every day of the year.',
    street: '22 Canal Street', city: 'Manchester', postcode: 'M1 3EZ', country: 'United Kingdom',
    mapUrl: OSM(-2.2358, 53.4775), mapTitle: 'Map showing BlueFlow Plumbing and Heating on Canal Street, Manchester',
    phone: '+44 161 496 0142', phoneUrl: 'tel:+441614960142', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
    directionsLabel: 'Get directions', directionsUrl: 'https://www.google.com/maps/search/?api=1&query=22%20Canal%20Street%2C%20Manchester%20M1', callLabel: 'Call us now',
    ...fields,
  },
  lists: { hours: [
    ['Monday', '07:30', '18:30'], ['Tuesday', '07:30', '18:30'], ['Wednesday', '07:30', '18:30'], ['Thursday', '07:30', '18:30'],
    ['Friday', '07:30', '18:30'], ['Saturday', '08:00', '14:00', 'Emergency line open all day'], ['Sunday', '', '', 'Emergency line only', 'closed'],
  ].map(([day, opens, closes, note = '', closed = '']) => ({ day, opens, closes, note, closed })) },
}];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'BlueFlow', logoIcon: 'cloud', tagline: 'Plumbing and heating in Manchester since 2010. Gas Safe registered.', copyright: '© 2026 BlueFlow Plumbing and Heating Ltd. All rights reserved.', legal: 'Privacy | /privacy/\nGuarantee | #why' },
  lists: {
    columns: [
      { title: 'Services', links: 'Emergency plumber | #services\nBoilers and heating | #services\nBathrooms | #services\nPrice check | #quote' },
      { title: 'Company', links: 'Book a visit | #book\nAreas we cover | #areas\nOur team | #team\nOur story | #story' },
      { title: 'Contact', links: 'Call 0161 496 0142 | tel:+441614960142\n22 Canal Street | #contact\nEmail us | mailto:hello@webdevpuneet.com' },
    ],
    socials: [
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'phone', label: 'Call us', url: 'tel:+441614960142' },
    ],
  },
}];

export const PLUMBER_WEBSITE_TEMPLATES = [
  {
    id: 'plumber', name: 'Plumber & Heating Engineer Website', industry: 'Local business',
    blurb: 'A plumbing and heating business: emergency strip, services and prices with filters, price estimator, service area checker, team, booking request and opening hours.',
    theme: { brand: '#0b6bcb', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f6fb', text: '#0f1d2e', muted: '#52657d', radius: '14', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Plumber Website Template — Free Plumbing HTML Template',
    seoDescription: 'Free plumber website template: emergency call strip, services and prices, price estimator, postcode area checker, team and online booking request. Export HTML.',
    keywords: ['plumber website template', 'plumbing website template', 'heating engineer website template', 'plumber landing page html', 'trades website template with booking', 'emergency plumber website'],
    intro: 'A trustworthy website for a plumber, heating engineer or other trades business. The emergency number sits right under the hero, and visitors can check prices by job, get an estimate for the size of their home and type a postcode to see whether you cover them. Guarantees, a bathroom story, the engineers, reviews, a visit request and office hours with a map round off the page.',
    bestFor: ['Plumbers and heating engineers', 'Electricians, locksmiths and handymen', 'Cleaners, gardeners and other mobile services'],
    sections: [NAV, HERO, EMERGENCY, SERVICES_SECTION('services'), ESTIMATOR('quote'), AREAS('areas'), WHY, BATHROOMS, STATS, TEAM('team'), REVIEWS, BOOKING, HOURS(), FOOTER],
    multiLinks: { '#book': 'book.html', '#quote': 'services.html#quote', '#areas': 'services.html#areas', '#why': 'index.html#why', '#team': 'about.html#team', '#contact': 'book.html#contact', '#story': 'about.html#story' },
    homeTitle: 'BlueFlow: Emergency Plumbing and Heating in Manchester',
    homeDescription: 'BlueFlow is a Gas Safe plumbing and heating firm in Manchester with 24/7 emergency call-outs, fixed prices and a 12-month guarantee. Check your area and book.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Plumbing and Heating Services and Prices | BlueFlow',
        description: 'See every BlueFlow plumbing and heating service with its price and time in Manchester, get an instant estimate for your home and check we cover your postcode.',
        sections: [
          SERVICES_SECTION(),
          ESTIMATOR('quote'),
          AREAS('areas'),
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Questions about *prices and visits*', lead: 'What homeowners ask before they book.', contactText: 'Still unsure?', contactLink: 'Call us', contactUrl: 'tel:+441614960142' }, toggles: {}, lists: { faqs: [
            { q: 'Do you give a price before starting work?', a: 'Always. You get a fixed written price before any work starts, and if we find anything else we phone you first and wait for your say-so.' },
            { q: 'Are your engineers Gas Safe registered?', a: 'Yes. Every engineer who works on gas appliances is on the Gas Safe Register, and they show you their ID card when they arrive.' },
            { q: 'How quickly can you come in an emergency?', a: 'Most emergency call-outs in our core areas arrive within an hour, day or night. Use the area checker for the usual time in your postcode.' },
            { q: 'Do you charge a call-out fee?', a: 'Emergency call-outs start from £95, which includes the first hour of work. For planned jobs, the survey is free and the quote is fixed.' },
            { q: 'What does your guarantee cover?', a: 'Every repair and every part we fit is guaranteed for 12 months, with a free return visit if anything is not right.' },
          ] } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About BlueFlow: Family-Run Manchester Plumbers Since 2010',
        description: 'Meet the BlueFlow plumbers and heating engineers in Manchester and read the story of a family-run firm that has completed over 28,000 jobs since 2010.',
        sections: [
          TEAM(),
          ['about-story', {
            anchor: 'story',
            fields: {
              eyebrow: 'Our story', heading: 'One van, *fifteen years later*',
              story: 'Sam Whitaker started BlueFlow in 2010 with one van, a toolbox and a rule: turn up when you say you will, and tell people the truth about what their home needs.',
              story2: 'Today there are nine of us, with a showroom, a 24/7 emergency line and a waiting list of customers who ask for us by name. Sam still takes emergency calls on Sunday nights.',
              image: IMG('plumb-about.jpg'), imageAlt: 'A smiling tradesman with grey hair holding a spanner and a toolbox',
              badgeNumber: '15', badgeLabel: 'years in Manchester',
              founderPhoto: av(7), founderPhotoAlt: 'Sam Whitaker, owner', founder: 'Sam Whitaker', founderRole: 'Owner and Gas Safe engineer',
              quote: '“We treat every home as if it were our own mum’s.”',
              primaryLabel: 'Book a visit', primaryUrl: '#book', secondaryLabel: 'See prices', secondaryUrl: '#services',
              orgName: 'BlueFlow Plumbing and Heating', foundedYear: '2010',
            },
            lists: {
              facts: [{ number: '28k', label: 'jobs completed' }, { number: '9', label: 'people on the team' }, { number: '4.9', label: 'average review' }],
              values: [
                { icon: 'shield-check', title: 'Safe and certified', text: 'Gas Safe registered, fully insured and checked before they join us.' },
                { icon: 'award', title: 'Work that lasts', text: 'Good parts, careful fitting and a 12-month guarantee on every job.' },
                { icon: 'heart', title: 'Respect for your home', text: 'Shoe covers, dust sheets and a tidy-up, so you would never know we had been there.' },
              ],
            },
          }],
          ['gallery-grid', {
            fields: { eyebrow: 'Our work', heading: 'A look *at what we do*', lead: 'Heating, pipework and bathrooms from recent jobs across Manchester.', allLabel: 'All' },
            lists: { images: [
              { image: IMG('plumb-heating.jpg'), imageAlt: 'A hand turning a radiator thermostat valve', tag: 'Heating', title: 'Radiator controls', text: 'Smart valves fitted' },
              { image: IMG('plumb-boiler.jpg'), imageAlt: 'An engineer in gloves servicing a boiler', tag: 'Heating', title: 'Boiler service', text: 'Gas Safe certificate included' },
              { image: IMG('plumb-pipe.jpg'), imageAlt: 'A plumber fitting a radiator pipe with a wrench', tag: 'Pipework', title: 'New pipework', text: 'Neat and labelled' },
              { image: IMG('plumb-fittings.jpg'), imageAlt: 'Hands tightening a pipe fitting', tag: 'Pipework', title: 'Fittings', text: 'Leak-free every time' },
              { image: IMG('plumb-bath.jpg'), imageAlt: 'A modern bathroom with a shower and a heated towel rail', tag: 'Bathrooms', title: 'Bathroom fit', text: 'Finished in five days' },
              { image: IMG('plumb-engineer.jpg'), imageAlt: 'An engineer in a hard hat holding a pipe wrench', tag: 'Team', title: 'On site', text: 'Qualified and insured' },
            ] },
          }],
        ],
      },
      {
        name: 'Book', slug: 'book',
        title: 'Book a Plumber or Heating Engineer in Manchester | BlueFlow',
        description: 'Request a plumber or heating engineer in Manchester: say what needs doing and when, and we confirm by phone or text within the hour. Emergency line open 24/7.',
        sections: [BOOKING, HOURS({ heading: 'Find *our office*' }), EMERGENCY],
      },
    ],
  },
];
