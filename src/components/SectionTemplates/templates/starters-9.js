/* Website templates, part 9: the Veterinary & Pet Clinic. Same shape as starters-6/7/8.js: home `sections`, hand-written `pages`
   for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js. SEO text:
   seo-website-templates-9.js.

   It uses the Services & Booking List section (services-booking.js, new with this template), Opening Hours & Location, the
   booking form, an emergency strip, wellness plans (pricing rows), the team and a patients gallery. Photos are vet-*.jpg in
   public/images/section-templates (royalty-free Pexels photos, resized and compressed). Every internal link is a "#page" token,
   resolved by fixSiteLinks() like the other starters. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));

/* services: [category, icon, name, text, duration, priceNote, price] */
const S = (category, icon, name, text, duration, priceNote, price) => ({ category, icon, name, text, duration, priceNote, price, button: 'Book', url: '#book' });
const SERVICES = [
  S('Check-ups', 'heart', 'Wellness exam', 'A full nose-to-tail check, weight and a plan for diet, exercise and parasite control.', '30 min', '', '$65'),
  S('Check-ups', 'sparkles', 'Puppy and kitten first visit', 'Exam, first vaccines, worming advice and a chat about training, feeding and microchipping.', '45 min', 'from', '$79'),
  S('Check-ups', 'users', 'Senior health check', 'A longer exam for pets over seven, with bloodwork and a blood pressure check to catch problems early.', '45 min', 'from', '$129'),
  S('Vaccines', 'shield-check', 'Core vaccines', 'The vaccines your dog or cat needs, with a reminder for the next due date.', '20 min', 'from', '$45'),
  S('Vaccines', 'award', 'Microchip and travel certificate', 'A permanent microchip, registration and the paperwork for travelling with your pet.', '30 min', 'from', '$60'),
  S('Dental', 'sparkles', 'Dental scale and polish', 'A thorough clean under anaesthetic with a full mouth check and before and after photos.', '2 hours', 'from', '$285'),
  S('Surgery', 'heart', 'Spay and neuter', 'Routine surgery with pre-op bloodwork, pain relief and a check-up visit afterwards.', 'Day visit', 'from', '$240'),
  S('Sick pets', 'clock', 'Sick pet visit', 'Same-day appointments for vomiting, limping, itching and anything that worries you.', '30 min', '', '$85'),
];

const NAV = ['navbar-simple', {
  fields: { logoText: 'Willow & Paw', logoIcon: 'heart', cta: 'Book a visit', ctaUrl: '#book', login: '' },
  lists: { links: links(['Services', '#services'], ['Plans', '#plans'], ['Our team', '#team'], ['Visit', '#contact']) },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('vet-hero.jpg'), eyebrow: 'Family-run vet clinic · Denver, Colorado',
    headline: 'Gentle care for *every pet*',
    lead: 'Check-ups, vaccines, dental care and same-day appointments for sick pets, from a small team who treat your pet like their own.',
    cta1: 'Book a visit', cta1Url: '#book', cta2: 'See services and prices', cta2Url: '#services',
    s1Value: '4.9 ★', s1Label: 'from 1,300 reviews', s2Value: 'Same day', s2Label: 'sick pet visits', s3Value: '24/7', s3Label: 'emergency line',
  },
}];

const EMERGENCY = ['cta-strip', { fields: {
  icon: 'phone', heading: 'Is it an emergency?', lead: 'Call our 24/7 line. A vet will talk you through what to do right now.',
  cta1: 'Call +1 303 555 0188', cta1Url: 'tel:+13035550188', cta2: '', cta2Url: '',
} }];

const SERVICES_SECTION = (anchor, extra = {}) => ['services-booking', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Services and prices', heading: 'Clear prices, *no surprises*', lead: 'Everything we offer, with how long it takes and what it costs. Pick a category to narrow the list.', allLabel: 'All services', filterLabel: 'Service categories', ...extra },
  lists: { services: SERVICES },
}];

const WHY = ['features-icon-grid', {
  fields: { eyebrow: 'Why Willow & Paw', heading: 'Care that *puts pets at ease*', lead: 'A calmer visit is a better visit, for your pet and for you.' },
  lists: { features: [
    { icon: 'heart', title: 'Fear-free handling', text: 'Treats, quiet rooms and gentle restraint, so most pets leave happier than they arrived.', link: '', url: '#' },
    { icon: 'clock', title: 'Same-day sick visits', text: 'Call before noon and we will see your pet that day. No weeks of waiting.', link: '', url: '#' },
    { icon: 'shield-check', title: 'Prices up front', text: 'You get a written estimate before any treatment, and we explain every line.', link: '', url: '#' },
  ] },
}];

const CARE = ['features-split-image', {
  fields: {
    eyebrow: 'In the clinic', heading: 'Everything in *one visit*',
    lead: 'Our own lab, X-ray and ultrasound mean most answers arrive while you wait, so treatment can start the same day.',
    cta: 'Book a visit', ctaUrl: '#book',
    image: IMG('vet-exam.jpg'), imageAlt: 'A vet and a nurse examining a golden-brown dog on a clinic table',
  },
  lists: { points: [
    { icon: 'zap', title: 'Results while you wait', text: 'In-house bloodwork and X-ray, with most results in under an hour.' },
    { icon: 'heart', title: 'Pain-free approach', text: 'Every procedure has a pain plan, from gentle sedation to take-home medicine.' },
    { icon: 'calendar', title: 'Reminders that help', text: 'We text you when vaccines and check-ups are due, so nothing gets missed.' },
  ] },
}];

const TEAM = ['team-grid', {
  anchor: 'team',
  fields: { eyebrow: 'Our team', heading: 'The people who *care for your pet*', lead: 'Four vets and nurses who have looked after Denver pets for over a decade.' },
  lists: { members: [
    { photo: av(3), name: 'Dr. Maya Chen', role: 'Lead vet and co-founder', bio: 'Small animal medicine. Fear-free certified.' },
    { photo: av(7), name: 'Dr. Omar Hassan', role: 'Vet, surgery and dental', bio: 'Ten years of soft-tissue surgery.' },
    { photo: av(2), name: 'Nina Alvarez', role: 'Head nurse', bio: 'Runs the gentle handling team.' },
    { photo: av(8), name: 'Jake Turner', role: 'Reception and pet behaviour', bio: 'The friendly voice on the phone.' },
  ] },
}];

const PLANS = ['pricing-rows', {
  anchor: 'plans',
  fields: { eyebrow: 'Wellness plans', heading: 'Spread the cost of *routine care*', lead: 'A small monthly payment covers the visits and vaccines your pet needs each year, with 10% off everything else.' },
  toggles: { showBilling: false },
  lists: { plans: [
    { name: 'Puppy and kitten plan', desc: 'The first year of vaccines, checks and neutering advice.', chips: '3 check-ups\nAll core vaccines\nMicrochip', monthly: '$29', priceNote: 'per month', cta: 'Join', ctaUrl: '#book' },
    { badge: 'Most popular', name: 'Adult plan', desc: 'Yearly exam, vaccines and dental check for healthy adult pets.', chips: '2 check-ups\nVaccines\nDental check', monthly: '$35', priceNote: 'per month', cta: 'Join', ctaUrl: '#book' },
    { name: 'Senior plan', desc: 'Twice-yearly exams and bloodwork for pets over seven.', chips: '2 senior exams\nBloodwork\nBlood pressure', monthly: '$49', priceNote: 'per month', cta: 'Join', ctaUrl: '#book' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *pets and their people*', lead: '★ 4.9 from 1,300+ Google reviews' },
  lists: { quotes: [
    { quote: 'Our rescue dog is terrified of vets, yet he walked in wagging his tail. They took their time and never rushed us.', name: 'Hannah W.', role: 'Dog owner', avatar: av(2) },
    { quote: 'Same-day appointment for our cat, a clear estimate and a call that evening to check how she was. Wonderful.', name: 'Marcus B.', role: 'Cat owner', avatar: av(3) },
    { quote: 'The wellness plan makes yearly care so much easier to budget for, and the reminders mean we never miss a vaccine.', name: 'Priya N.', role: 'Two dogs', avatar: av(5) },
  ] },
}];

const BOOKING = ['booking-form', {
  anchor: 'book',
  fields: {
    eyebrow: 'Book online', heading: 'Request *an appointment*',
    lead: 'Tell us about your pet and when suits you. We confirm every request by phone or email within a few hours, usually the same morning.',
    hoursHeading: 'Clinic hours', expectHeading: 'What to expect',
    expect: 'A friendly welcome and a quiet room\nA written estimate before any treatment\nBring any records or medicine your pet takes',
    serviceLabel: 'Reason for visit', dateLabel: 'Preferred day', timeLabel: 'Preferred time', notesLabel: 'About your pet (name, age, any symptoms)',
    submit: 'Request appointment', note: 'This is a request, not a confirmed booking. For an emergency, please call us.',
    successTitle: 'Request received', successText: 'Thank you. We will confirm your appointment by phone or email shortly.',
  },
  lists: {
    hours: [
      { day: 'Monday – Friday', time: '8:00 am – 7:00 pm' }, { day: 'Saturday', time: '9:00 am – 4:00 pm' }, { day: 'Sunday', time: 'Emergency line only' },
    ],
    services: SERVICES.map(s => ({ name: s.name })),
    times: ['8:30 am', '10:00 am', '11:30 am', '1:00 pm', '2:30 pm', '4:00 pm', '5:30 pm'].map(name => ({ name })),
  },
}];

const HOURS = (fields = {}) => ['opening-hours', {
  anchor: 'contact',
  fields: {
    eyebrow: 'Visit us', heading: 'Come and *say hello*', lead: 'Walk-in sick pet visits are welcome during opening hours, and our emergency line answers day and night.',
    businessName: 'Willow & Paw Veterinary Clinic', businessType: 'VeterinaryCare', timezone: 'America/Denver', hoursTitle: 'Clinic hours',
    special: 'Closed on public holidays. Our emergency line is open 24/7.',
    street: '412 Larch Avenue', city: 'Denver', postcode: 'CO 80203', country: 'United States',
    mapUrl: OSM(-104.9847, 39.7392), mapTitle: 'Map showing Willow & Paw Veterinary Clinic on Larch Avenue, Denver',
    phone: '+1 303 555 0188', phoneUrl: 'tel:+13035550188', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
    directionsLabel: 'Get directions', directionsUrl: 'https://www.google.com/maps/search/?api=1&query=412%20Larch%20Avenue%2C%20Denver%20CO', callLabel: 'Call the clinic',
    ...fields,
  },
  lists: { hours: [
    ['Monday', '08:00', '19:00'], ['Tuesday', '08:00', '19:00'], ['Wednesday', '08:00', '19:00'], ['Thursday', '08:00', '19:00'],
    ['Friday', '08:00', '19:00'], ['Saturday', '09:00', '16:00', 'Appointments only'], ['Sunday', '', '', 'Emergency line only', 'closed'],
  ].map(([day, opens, closes, note = '', closed = '']) => ({ day, opens, closes, note, closed })) },
}];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Willow & Paw', logoIcon: 'heart', tagline: 'Gentle, family-run veterinary care in Denver, Colorado.', copyright: '© 2026 Willow & Paw Veterinary Clinic. All rights reserved.', legal: 'Privacy | /privacy/\nEmergency | tel:+13035550188' },
  lists: {
    columns: [
      { title: 'Care', links: 'Services and prices | #services\nWellness plans | #plans\nBook a visit | #book' },
      { title: 'Clinic', links: 'Our team | #team\nOpening hours | #contact\nOur story | #story' },
      { title: 'Contact', links: 'Call +1 303 555 0188 | tel:+13035550188\n412 Larch Avenue | #contact\nEmail us | mailto:hello@webdevpuneet.com' },
    ],
    socials: [
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'phone', label: 'Call the clinic', url: 'tel:+13035550188' },
    ],
  },
}];

export const VET_WEBSITE_TEMPLATES = [
  {
    id: 'vet', name: 'Veterinary & Pet Clinic Website', industry: 'Health & fitness',
    blurb: 'A friendly vet clinic: services and prices with filters, emergency line, wellness plans, team, online appointment request and clinic hours.',
    theme: { brand: '#1d7a6c', brandText: '#ffffff', bg: '#fbfaf5', surface: '#eef4ef', text: '#16302b', muted: '#53695f', radius: '16', maxWidth: '1200' }, fonts: { heading: 'lora', body: 'dmsans' },
    seoTitle: 'Veterinary Website Template — Free Vet Clinic HTML',
    seoDescription: 'Free vet clinic website template: services and prices with filters, emergency call strip, wellness plans, team, booking request form and opening hours.',
    keywords: ['veterinary website template', 'vet clinic website template', 'pet clinic website template', 'animal hospital website template html', 'veterinarian landing page html', 'vet website with booking form'],
    intro: 'A warm website for a vet clinic, animal hospital or pet care practice. Owners see a "Book a visit" button and the 24/7 emergency number first, then services and prices they can narrow to check-ups, vaccines, dental or surgery, wellness plans, the vets and nurses, reviews and an appointment request next to the clinic hours.',
    bestFor: ['Veterinary clinics and animal hospitals', 'Pet groomers, trainers and boarding kennels', 'Dentists and other appointment-led clinics'],
    sections: [NAV, HERO, EMERGENCY, SERVICES_SECTION('services'), WHY, CARE, PLANS, TEAM, REVIEWS, BOOKING, HOURS(), FOOTER],
    multiLinks: { '#book': 'book.html', '#plans': 'services.html#plans', '#contact': 'visit.html#contact', '#story': 'team.html#story' },
    homeTitle: 'Willow & Paw Vets: Gentle Pet Care in Denver, Colorado',
    homeDescription: 'Willow & Paw is a family-run vet clinic in Denver with same-day sick visits, clear prices, wellness plans and a 24/7 emergency line. Book online today.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Vet Services and Prices: Check-ups to Surgery | Willow & Paw',
        description: 'See every Willow & Paw vet service with its price and duration: wellness exams, vaccines, dental care, surgery and sick pet visits, plus monthly wellness plans.',
        sections: [
          SERVICES_SECTION(),
          PLANS,
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Questions about *costs and care*', lead: 'What most owners ask before their first visit.', contactText: 'Still unsure?', contactLink: 'Call the clinic', contactUrl: 'tel:+13035550188' }, toggles: {}, lists: { faqs: [
            { q: 'Do you give a price before treatment?', a: 'Always. You get a written estimate before anything is done, and we explain each line. If a treatment needs to change, we call you first.' },
            { q: 'Can I pay in instalments?', a: 'Our wellness plans spread the cost of routine care into a monthly payment. For larger bills we can talk about a payment plan before treatment starts.' },
            { q: 'Do you see exotic pets?', a: 'We see dogs, cats, rabbits and guinea pigs. For birds, reptiles and other exotics we will refer you to a specialist we trust.' },
            { q: 'How quickly can my sick pet be seen?', a: 'Call before noon and we will see your pet the same day during opening hours. Out of hours, call our emergency line.' },
            { q: 'What should I bring to the first visit?', a: 'Any vaccination records, medicines your pet takes and, for a sick pet, a note of the symptoms. A stool sample helps for tummy problems.' },
          ] } }],
        ],
      },
      {
        name: 'Our team', slug: 'team',
        title: 'Meet Our Vets and Nurses in Denver, Colorado | Willow & Paw',
        description: 'Meet the vets, nurses and reception team at Willow & Paw in Denver, and see the story of our family-run clinic and some of the pets we have cared for.',
        sections: [
          TEAM,
          ['about-story', {
            anchor: 'story',
            fields: {
              eyebrow: 'Our story', heading: 'A clinic built *around calm visits*',
              story: 'Dr. Maya Chen opened Willow & Paw in 2014 after years in a busy city hospital, with one aim: a clinic where pets are not scared and owners are never rushed.',
              story2: 'Ten years later the team has grown to nine, with its own lab, X-ray and a quiet cat-only waiting room, and Maya still sees patients every day.',
              image: IMG('vet-about.jpg'), imageAlt: 'A vet and a pet owner smiling beside a small dog in a clinic',
              badgeNumber: '10', badgeLabel: 'years of gentle care',
              founderPhoto: av(3), founderPhotoAlt: 'Dr. Maya Chen, lead vet', founder: 'Dr. Maya Chen', founderRole: 'Lead vet and co-founder',
              quote: '“A calm pet is easier to examine, and a calm owner is easier to help.”',
              primaryLabel: 'Book a visit', primaryUrl: '#book', secondaryLabel: 'Services and prices', secondaryUrl: '#services',
              orgName: 'Willow & Paw Veterinary Clinic', foundedYear: '2014',
            },
            lists: {
              facts: [{ number: '14k+', label: 'pets cared for' }, { number: '9', label: 'vets and nurses' }, { number: '4.9', label: 'average review' }],
              values: [
                { icon: 'heart', title: 'Fear-free first', text: 'We use treats, patience and quiet rooms, and we never force a frightened pet.' },
                { icon: 'shield-check', title: 'Honest advice', text: 'We tell you what your pet needs now, what can wait and what it costs.' },
                { icon: 'users', title: 'Familiar faces', text: 'You see the same small team each time, so they know your pet and your family.' },
              ],
            },
          }],
          ['gallery-grid', {
            fields: { eyebrow: 'Our patients', heading: 'Some of *the pets we know*', lead: 'A few of the dogs and cats who visit us (with their owners’ permission).', allLabel: 'All' },
            lists: { images: [
              { image: IMG('vet-dog.jpg'), imageAlt: 'A golden dog looking at the camera', tag: 'Dogs', title: 'Biscuit', text: 'Wellness regular' },
              { image: IMG('vet-puppy.jpg'), imageAlt: 'A cream puppy in the garden', tag: 'Dogs', title: 'Honey', text: 'First-year plan' },
              { image: IMG('vet-pom.jpg'), imageAlt: 'A small Pomeranian with a vet and its owner', tag: 'Dogs', title: 'Pip', text: 'Dental star' },
              { image: IMG('vet-senior.jpg'), imageAlt: 'A senior dog having its head gently checked', tag: 'Dogs', title: 'Bear', text: 'Senior plan' },
              { image: IMG('vet-cat-face.jpg'), imageAlt: 'A tabby cat looking calmly at the camera', tag: 'Cats', title: 'Maple', text: 'Fear-free favourite' },
              { image: IMG('vet-cat.jpg'), imageAlt: 'A fluffy cat sitting calmly on an exam table', tag: 'Cats', title: 'Sunny', text: 'Brave at check-ups' },
            ] },
          }],
        ],
      },
      {
        name: 'Book', slug: 'book',
        title: 'Book a Vet Appointment Online in Denver | Willow & Paw',
        description: 'Request a vet appointment at Willow & Paw in Denver: choose the reason for your visit, a day and a time, and we confirm by phone or email within a few hours.',
        sections: [BOOKING, EMERGENCY],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Clinic Hours, Address and Map | Willow & Paw Denver',
        description: 'Find Willow & Paw Veterinary Clinic at 412 Larch Avenue, Denver: opening hours with a live open-now badge, a map, directions and our 24/7 emergency number.',
        sections: [HOURS({ heading: 'Find *the clinic*' }), EMERGENCY],
      },
    ],
  },
];
