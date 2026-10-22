/* More website templates (wedding, hotel, salon, law firm), built around the Scroll effects
   and Menus & listings sections. Same shape as starters.js: home `sections`, hand-written
   `pages` for the multi-page version, `multiLinks` and home SEO. Appended to
   WEBSITE_TEMPLATES in starters.js. Art: scripts/make-template-art-2.cjs. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));
const nav = (logoText, logoIcon, cta, list, extra = {}) => ({ fields: { logoText, logoIcon, cta, ctaUrl: '#contact', ...extra }, lists: { links: list } });

export const MORE_WEBSITE_TEMPLATES = [
  /* ── Wedding ─────────────────────────────────────────────────────────────── */
  {
    id: 'wedding', name: 'Wedding Website', industry: 'Events',
    blurb: 'Floral hero with the date, your story told on scroll, a day schedule that draws itself, travel tips and an RSVP form.',
    theme: { brand: '#b76e79', brandText: '#ffffff', bg: '#fffaf7', surface: '#f6ece6', text: '#3a2a2a', muted: '#7a6262', radius: '20', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Wedding Website Template — Free RSVP & Story HTML Template',
    seoDescription: 'Free wedding website template: floral hero with your date, your love story told on scroll, a day schedule that draws itself, travel tips and an RSVP form.',
    keywords: ['wedding website template', 'wedding rsvp website', 'free wedding website html', 'wedding invitation website', 'save the date website'],
    intro: 'Everything your guests need in one beautiful place: a floral hero with the date and venue, your story told step by step as they scroll, a schedule for the day that draws itself down the page, answers about travel and where to stay, and an RSVP form that comes straight to your inbox.',
    bestFor: ['Couples sharing their wedding details', 'Engagement parties and vow renewals', 'Wedding planners making sites for clients'],
    sections: [
      ['navbar-floating', nav('Maya & Daniel', 'heart', 'RSVP', links(['Our story', '#story'], ['The day', '#journey'], ['Travel', '#faq'], ['RSVP', '#contact']))],
      ['image-background-hero', { fields: { image: IMG('tpl-wedding.jpg'), eyebrow: '14 June 2027 · Sintra, Portugal', headline: 'Maya & Daniel are *getting married*', lead: 'We would love you to celebrate with us in the hills above Lisbon, with good food, long speeches and dancing until late.', cta1: 'RSVP', cta1Url: '#contact', cta2: 'Our story', cta2Url: '#story', s1Value: '14.06.27', s1Label: 'save the date', s2Value: 'Sintra', s2Label: 'Quinta da Serra', s3Value: '3 pm', s3Label: 'ceremony' } }],
      ['scroll-story', { fields: { eyebrow: 'Our story', heading: 'How we *found each other*', lead: 'Eight years, two cities and one very nervous question.' }, lists: { steps: [
        { image: IMG('wed-dinner.jpg'), imageAlt: 'A long dinner table with candles', label: '2019 · London', title: 'A seat at the same table', text: 'A friend’s birthday dinner, two empty chairs side by side, and a conversation that lasted until the restaurant closed.' },
        { image: IMG('tpl-nature.jpg'), imageAlt: 'Mountains at sunrise', label: '2021 · The Alps', title: 'Our first big adventure', text: 'A week of hiking, one wrong turn and a sunrise we still talk about. We knew we made a good team.' },
        { image: IMG('tpl-wedding.jpg'), imageAlt: 'A floral arch on a hill at sunset', label: '2025 · Sintra', title: 'The question', text: 'Daniel planned a picnic on the hill where we will get married. Maya said yes before he finished asking.' },
        { image: IMG('wed-party.jpg'), imageAlt: 'String lights over a dance floor', label: '2027 · With you', title: 'Now, the party', text: 'All that is missing is the people we love. We cannot wait to celebrate with you.' },
      ] } }],
      ['scroll-path', { fields: { eyebrow: 'The day', heading: 'Wedding day *schedule*', lead: 'Saturday 14 June 2027 at Quinta da Serra. Comfortable shoes recommended.' }, lists: { milestones: [
        { date: '3:00 pm', icon: 'heart', title: 'Ceremony', text: 'Under the flower arch in the garden. Please arrive by 2:30 pm.' },
        { date: '4:00 pm', icon: 'sparkles', title: 'Drinks in the garden', text: 'Port tonic, local wines and snacks on the terrace while we take photos.' },
        { date: '6:30 pm', icon: 'coffee', title: 'Dinner', text: 'A long-table dinner in the courtyard, followed by speeches (we promise they will be short).' },
        { date: '9:30 pm', icon: 'star', title: 'Dancing', text: 'The band plays until midnight, then the DJ takes over until 2 am.' },
      ] } }],
      ['faq-split', { fields: { eyebrow: 'Travel & stay', heading: 'Good to *know*', cardTitle: 'Still have a question?', cardText: 'Write to us any time; we reply within a day.', cardCta: 'Email us', cardUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
        { q: 'How do I get to the venue?', a: 'Quinta da Serra is 30 minutes from Lisbon. A shuttle leaves the Sintra train station at 2:00 pm and returns at midnight and 2 am.' },
        { q: 'Where should I stay?', a: 'We have partner rates at three hotels in Sintra. Mention our names when you book to get the discount.' },
        { q: 'What should I wear?', a: 'Summer formal. The ceremony is on grass, so block heels or flats are a good idea.' },
        { q: 'Can I bring a plus one?', a: 'If your invitation includes a guest, their name is on it. Please list everyone attending in your RSVP.' },
      ] } }],
      ['contact-split-form', { fields: { eyebrow: 'RSVP', heading: 'Will you *join us?*', lead: 'Please reply by 1 May 2027 so we can plan the dinner and the dancing.', nameLabel: 'Your names', messageLabel: 'Who is coming, dietary needs and a song request', submit: 'Send RSVP', successTitle: 'Thank you!', successText: 'Your RSVP is on its way to us. We can’t wait to see you.' }, lists: { methods: [
        { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
        { icon: 'map-pin', label: 'Venue', value: 'Quinta da Serra, Sintra', url: 'https://www.openstreetmap.org/' },
      ] } }],
      ['footer-minimal', { fields: { logoText: 'Maya & Daniel', logoIcon: 'heart', links: 'Our story | #story\nThe day | #journey\nTravel | #faq\nRSVP | #contact', copyright: '14 June 2027 · Sintra, Portugal' }, toggles: { showSocials: false } }],
    ],
    multiLinks: { '#story': 'story.html', '#faq': 'travel.html', '#contact': 'rsvp.html' },
    homeTitle: 'Maya & Daniel: Our Wedding in Sintra, 14 June 2027',
    homeDescription: 'Maya and Daniel are getting married in Sintra, Portugal, on 14 June 2027. Read our story, see the schedule for the day, plan your travel and send your RSVP.',
    pages: [
      {
        name: 'Our story', slug: 'story',
        title: 'Our Story: How Maya & Daniel Found Each Other in London',
        description: 'From a shared birthday dinner in London to a proposal on the hill in Sintra: the story of Maya and Daniel, told step by step, before our wedding in June 2027.',
        sections: [
          ['scroll-story', { fields: { eyebrow: 'Our story', heading: 'How we *found each other*', lead: 'Eight years, two cities and one very nervous question.' }, lists: { steps: [
            { image: IMG('wed-dinner.jpg'), imageAlt: 'A long dinner table with candles', label: '2019 · London', title: 'A seat at the same table', text: 'A friend’s birthday dinner, two empty chairs side by side, and a conversation that lasted until the restaurant closed.' },
            { image: IMG('tpl-nature.jpg'), imageAlt: 'Mountains at sunrise', label: '2021 · The Alps', title: 'Our first big adventure', text: 'A week of hiking, one wrong turn and a sunrise we still talk about. We knew we made a good team.' },
            { image: IMG('tpl-wedding.jpg'), imageAlt: 'A floral arch on a hill at sunset', label: '2025 · Sintra', title: 'The question', text: 'Daniel planned a picnic on the hill where we will get married. Maya said yes before he finished asking.' },
          ] } }],
          ['cta-strip', { fields: { icon: 'heart', heading: 'We hope you can come', lead: 'Please RSVP by 1 May 2027.', cta1: 'RSVP', cta1Url: 'rsvp.html', cta2: 'The schedule', cta2Url: 'index.html#journey' } }],
        ],
      },
      {
        name: 'Travel & stay', slug: 'travel',
        title: 'Travel & Stay: Getting to Our Wedding in Sintra, Portugal',
        description: 'How to reach Quinta da Serra in Sintra for our wedding: shuttle times from the station, partner hotels with guest discounts and answers to common questions.',
        sections: [
          ['property-listings', { fields: { eyebrow: 'Where to stay', heading: 'Partner hotels *in Sintra*', allLink: '', allUrl: '#' }, lists: { homes: [
            { status: 'Partner rate', price: '€140 / night', title: 'Hotel Monte Verde', address: 'Old town, 10 min to the shuttle', beds: 'Code MAYADAN', baths: 'Breakfast included', area: '', url: 'https://www.openstreetmap.org/' },
            { status: 'Partner rate', price: '€110 / night', title: 'Casa das Flores', address: 'Next to the train station', beds: 'Code MAYADAN', baths: 'Free parking', area: '', url: 'https://www.openstreetmap.org/' },
            { status: 'Budget', price: '€75 / night', title: 'Sintra Garden Rooms', address: '15 min walk to the shuttle', beds: 'Book by 1 April', baths: 'Garden view', area: '', url: 'https://www.openstreetmap.org/' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'Travel', heading: 'Getting *there*', lead: 'Flights, the shuttle, parking and the weather.', contactText: 'Anything else?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'Which airport should I fly into?', a: 'Lisbon airport is 40 minutes from Sintra by taxi or about an hour by metro and train.' },
            { q: 'When does the shuttle run?', a: 'From Sintra station at 2:00 pm, and back to the station at midnight and 2 am.' },
            { q: 'Is there parking at the venue?', a: 'Yes, there is free parking for 40 cars at Quinta da Serra.' },
            { q: 'What will the weather be like?', a: 'Warm days around 26°C and cooler evenings, so bring a light layer for the night.' },
          ] } }],
        ],
      },
      {
        name: 'RSVP', slug: 'rsvp',
        title: 'RSVP: Join Maya & Daniel in Sintra on 14 June 2027',
        description: 'Send your RSVP for the wedding of Maya and Daniel in Sintra on 14 June 2027. Tell us who is coming, any dietary needs and the song that gets you dancing.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'RSVP', heading: 'Will you *join us?*', lead: 'Please reply by 1 May 2027 so we can plan the dinner and the dancing.', nameLabel: 'Your names', messageLabel: 'Who is coming, dietary needs and a song request', submit: 'Send RSVP', successTitle: 'Thank you!', successText: 'Your RSVP is on its way to us. We can’t wait to see you.' }, lists: { methods: [
            { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
            { icon: 'calendar', label: 'Reply by', value: '1 May 2027', url: '' },
          ] } }],
        ],
      },
    ],
  },

  /* ── Hotel ───────────────────────────────────────────────────────────────── */
  {
    id: 'hotel', name: 'Boutique Hotel Website', industry: 'Travel & hospitality',
    blurb: 'Dusk hero, a horizontal scroll gallery of rooms, stacking cards for the experience, guest reviews, FAQ and location.',
    theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#fbf8f3', surface: '#f1ebe1', text: '#1f2a24', muted: '#5c665f', radius: '14', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Hotel Website Template — Free Boutique Hotel HTML Template',
    seoDescription: 'Free boutique hotel website template: dusk hero, rooms in a horizontal scroll gallery, stacking cards for the experience, guest reviews, FAQ and a location map.',
    keywords: ['hotel website template', 'boutique hotel website html', 'bed and breakfast website template', 'guest house website', 'resort landing page template'],
    intro: 'A calm, sunlit site for a boutique hotel, B&B or guest house: a dusk hero with the essentials, rooms that slide sideways as guests scroll, the experience told in stacking cards, reviews from past guests, answers to practical questions and where to find you.',
    bestFor: ['Boutique hotels and guest houses', 'Bed and breakfasts and villas', 'Glamping sites and retreats'],
    sections: [
      ['navbar-simple', nav('Casa Mar', 'house', 'Book a stay', links(['Rooms', '#work'], ['Experience', '#highlights'], ['Reviews', '#customers'], ['Location', '#contact']), { login: '' })],
      ['image-background-hero', { fields: { image: IMG('tpl-hotel.jpg'), eyebrow: 'Boutique hotel · Algarve coast', headline: 'Slow mornings, *salt-water days*', lead: 'Twenty-four rooms, a pool among the palms and the beach two minutes away. Breakfast is served until noon.', cta1: 'Book a stay', cta1Url: '#contact', cta2: 'See the rooms', cta2Url: '#work', s1Value: '24', s1Label: 'rooms and suites', s2Value: '2 min', s2Label: 'to the beach', s3Value: '9.4', s3Label: 'guest rating' } }],
      ['scroll-gallery', { fields: { eyebrow: 'Rooms & suites', heading: 'Find *your room*', lead: 'Every room has linen sheets, a rain shower and a balcony or garden terrace. Keep scrolling to see them all.' }, lists: { cards: [
        { image: IMG('room-1.jpg'), imageAlt: 'Garden room with a double bed', tag: 'From €160 / night', title: 'Garden Room', text: 'A quiet double opening onto the orange grove.', url: '#contact' },
        { image: IMG('room-2.jpg'), imageAlt: 'Green-toned room with a large window', tag: 'From €190 / night', title: 'Palm Room', text: 'Big windows over the palms and the pool.', url: '#contact' },
        { image: IMG('room-3.jpg'), imageAlt: 'Dark suite with a sunset window', tag: 'From €260 / night', title: 'Sea View Suite', text: 'Sunsets over the bay from a private balcony.', url: '#contact' },
        { image: IMG('room-4.jpg'), imageAlt: 'Pink-toned loft room', tag: 'From €240 / night', title: 'Rose Loft', text: 'A split-level loft with a reading nook.', url: '#contact' },
      ] } }],
      ['scroll-stack', { fields: { eyebrow: 'The experience', heading: 'Everything for *a slow stay*', lead: 'Scroll on for the little things guests remember.' }, lists: { cards: [
        { icon: 'coffee', label: 'Mornings', title: 'Breakfast until noon', text: 'Fresh bread, fruit from the garden and eggs any way you like, served on the terrace.', image: '' },
        { icon: 'sparkles', label: 'Afternoons', title: 'Pool, spa and shade', text: 'A heated salt-water pool among the palms, a small spa and plenty of loungers.', image: '' },
        { icon: 'map-pin', label: 'Days out', title: 'Coves, vineyards and boats', text: 'We book boat trips, wine tastings and the best hidden beaches for you.', image: '' },
        { icon: 'star', label: 'Evenings', title: 'Dinner under the stars', text: 'Grilled fish and local wine in the courtyard, three nights a week.', image: '' },
      ] } }],
      ['testimonials-carousel', { fields: { eyebrow: 'Guest reviews', heading: 'Guests *come back*', lead: '9.4 from 820 verified reviews' }, lists: { quotes: [
        { quote: 'The calmest week we have had in years. Breakfast on the terrace was the highlight of every day.', name: 'Hannah & Tom', role: 'Stayed in the Garden Room', avatar: av(3) },
        { quote: 'Thoughtful, warm staff who booked us the perfect boat trip. The Sea View Suite is worth every euro.', name: 'Rafael M.', role: 'Stayed in the Sea View Suite', avatar: av(4) },
        { quote: 'Small enough to feel personal, beautiful enough to never want to leave. Already planning our return.', name: 'Elena K.', role: 'Stayed in the Rose Loft', avatar: av(2) },
      ] } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Before you *arrive*', lead: 'Check-in, breakfast, children and getting here from the airport.' }, toggles: { showContact: false }, lists: { faqs: [
        { q: 'What time is check-in?', a: 'From 3 pm, and check-out is until 11 am. We store luggage before and after your stay.' },
        { q: 'Is breakfast included?', a: 'Yes, breakfast is included in every rate and served until noon.' },
        { q: 'Do you allow children?', a: 'Children over 12 are welcome; the hotel is designed as a quiet retreat.' },
        { q: 'Can you arrange airport transfers?', a: 'Yes. Faro airport is 45 minutes away and we can book a private transfer for you.' },
      ] } }],
      ['contact-map', { fields: { eyebrow: 'Find us', heading: 'Two minutes *from the sea*', lead: 'On a quiet lane above Praia da Luz, 45 minutes from Faro airport.', mapTitle: 'Map showing Casa Mar' }, lists: { offices: [{ city: 'Casa Mar', address: 'Rua da Praia 12\n8600-160 Luz, Algarve', hours: 'Reception 8am – 10pm', phone: '+351 282 000 123', phoneUrl: 'tel:+351282000123', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' }] } }],
      ['footer-minimal', { fields: { logoText: 'Casa Mar', logoIcon: 'house', links: 'Rooms | #work\nExperience | #highlights\nReviews | #customers\nLocation | #contact', copyright: '© 2026 Casa Mar Boutique Hotel' } }],
    ],
    multiLinks: { '#work': 'rooms.html', '#highlights': 'experience.html', '#contact': 'book.html' },
    homeTitle: 'Casa Mar: Boutique Hotel Two Minutes From the Algarve Sea',
    homeDescription: 'Casa Mar is a 24-room boutique hotel in Luz on the Algarve coast, with a palm-shaded pool, breakfast until noon and the beach two minutes away. Book your stay.',
    pages: [
      {
        name: 'Rooms', slug: 'rooms',
        title: 'Rooms & Suites: Garden, Palm and Sea View | Casa Mar',
        description: 'Rooms and suites at Casa Mar in the Algarve: the Garden Room, Palm Room, Sea View Suite and Rose Loft, with nightly rates and what every room includes.',
        sections: [
          ['scroll-gallery', { fields: { eyebrow: 'Rooms & suites', heading: 'Find *your room*', lead: 'Every room has linen sheets, a rain shower and a balcony or garden terrace.' }, lists: { cards: [
            { image: IMG('room-1.jpg'), imageAlt: 'Garden room with a double bed', tag: 'From €160 / night', title: 'Garden Room', text: 'A quiet double opening onto the orange grove.', url: 'book.html' },
            { image: IMG('room-2.jpg'), imageAlt: 'Green-toned room with a large window', tag: 'From €190 / night', title: 'Palm Room', text: 'Big windows over the palms and the pool.', url: 'book.html' },
            { image: IMG('room-3.jpg'), imageAlt: 'Dark suite with a sunset window', tag: 'From €260 / night', title: 'Sea View Suite', text: 'Sunsets over the bay from a private balcony.', url: 'book.html' },
            { image: IMG('room-4.jpg'), imageAlt: 'Pink-toned loft room', tag: 'From €240 / night', title: 'Rose Loft', text: 'A split-level loft with a reading nook.', url: 'book.html' },
          ] } }],
          ['pricing-rows', { fields: { eyebrow: 'Rates', heading: 'Simple, *honest rates*', lead: 'Breakfast, Wi-Fi and pool towels are included. Rates per room per night.' }, toggles: { showBilling: false }, lists: { plans: [
            { name: 'Garden & Palm Rooms', desc: 'Doubles with a garden terrace or pool view.', chips: '2 guests\nBreakfast\nTerrace', monthly: '€160–190', priceNote: 'per night', cta: 'Book', ctaUrl: 'book.html' },
            { badge: 'Most booked', name: 'Sea View Suite', desc: 'A suite with a private balcony over the bay.', chips: '2 guests\nBalcony\nBath with a view', monthly: '€260', priceNote: 'per night', cta: 'Book', ctaUrl: 'book.html' },
            { name: 'Rose Loft', desc: 'A split-level loft for up to three guests.', chips: '3 guests\nReading nook\nKitchenette', monthly: '€240', priceNote: 'per night', cta: 'Book', ctaUrl: 'book.html' },
          ] } }],
        ],
      },
      {
        name: 'Experience', slug: 'experience',
        title: 'The Casa Mar Experience: Pool, Spa, Days Out & Dinners',
        description: 'Breakfast until noon, a salt-water pool, boat trips and vineyard visits, and dinners under the stars: the slow-stay experience at Casa Mar in the Algarve.',
        sections: [
          ['scroll-stack', { fields: { eyebrow: 'The experience', heading: 'Everything for *a slow stay*', lead: 'Scroll on for the little things guests remember.' }, lists: { cards: [
            { icon: 'coffee', label: 'Mornings', title: 'Breakfast until noon', text: 'Fresh bread, fruit from the garden and eggs any way you like, served on the terrace.', image: '' },
            { icon: 'sparkles', label: 'Afternoons', title: 'Pool, spa and shade', text: 'A heated salt-water pool among the palms, a small spa and plenty of loungers.', image: '' },
            { icon: 'map-pin', label: 'Days out', title: 'Coves, vineyards and boats', text: 'We book boat trips, wine tastings and the best hidden beaches for you.', image: '' },
            { icon: 'star', label: 'Evenings', title: 'Dinner under the stars', text: 'Grilled fish and local wine in the courtyard, three nights a week.', image: '' },
          ] } }],
          ['testimonials-carousel', { fields: { eyebrow: 'Guest reviews', heading: 'Guests *come back*', lead: '9.4 from 820 verified reviews' }, lists: { quotes: [
            { quote: 'The calmest week we have had in years. Breakfast on the terrace was the highlight of every day.', name: 'Hannah & Tom', role: 'Stayed in the Garden Room', avatar: av(3) },
            { quote: 'Thoughtful, warm staff who booked us the perfect boat trip. The Sea View Suite is worth every euro.', name: 'Rafael M.', role: 'Stayed in the Sea View Suite', avatar: av(4) },
            { quote: 'Small enough to feel personal, beautiful enough to never want to leave. Already planning our return.', name: 'Elena K.', role: 'Stayed in the Rose Loft', avatar: av(2) },
          ] } }],
        ],
      },
      {
        name: 'Book', slug: 'book',
        title: 'Book Your Stay at Casa Mar Boutique Hotel, Algarve',
        description: 'Book a room at Casa Mar in Luz on the Algarve coast. Send your dates and number of guests and we confirm within a few hours, with directions and a map.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Book a stay', heading: 'Plan your *slow escape*', lead: 'Send your dates and number of guests; we reply within a few hours with availability.', messageLabel: 'Dates, guests and the room you would like', submit: 'Check availability', successTitle: 'Request received', successText: 'We will reply with availability within a few hours.' }, lists: { methods: [
            { icon: 'phone', label: 'Reception', value: '+351 282 000 123', url: 'tel:+351282000123' },
            { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
          ] } }],
          ['contact-map', { fields: { eyebrow: 'Find us', heading: 'Two minutes *from the sea*', lead: 'On a quiet lane above Praia da Luz, 45 minutes from Faro airport.', mapTitle: 'Map showing Casa Mar' }, lists: { offices: [{ city: 'Casa Mar', address: 'Rua da Praia 12\n8600-160 Luz, Algarve', hours: 'Reception 8am – 10pm', phone: '+351 282 000 123', phoneUrl: 'tel:+351282000123', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' }] } }],
        ],
      },
    ],
  },

  /* ── Salon ───────────────────────────────────────────────────────────────── */
  {
    id: 'salon', name: 'Hair & Beauty Salon Website', industry: 'Health & beauty',
    blurb: 'Salon hero, a menu-style price list, stylists, reviews, online booking and a map.',
    theme: { brand: '#be185d', brandText: '#ffffff', bg: '#fff8f7', surface: '#f8e9e6', text: '#3b1d24', muted: '#7b5960', radius: '18', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Hair Salon Website Template — Free Beauty Salon HTML',
    seoDescription: 'Free hair and beauty salon website template: elegant hero, a menu-style service price list, stylists, client reviews, an online booking form and your location.',
    keywords: ['hair salon website template', 'beauty salon website html', 'barber shop website template', 'nail salon website', 'salon price list template'],
    intro: 'An elegant site for a hair salon, barber or beauty studio: a soft hero with your best reviews, services and prices laid out like a menu, the stylists clients ask for by name, kind words from regulars, a booking request form and how to find you.',
    bestFor: ['Hair salons and barbers', 'Beauty, nail and brow studios', 'Spas and wellness studios'],
    sections: [
      ['navbar-simple', nav('Bloom Studio', 'sparkles', 'Book now', links(['Services', '#menu'], ['Stylists', '#team'], ['Reviews', '#customers'], ['Visit', '#contact']), { login: '' })],
      ['image-background-hero', { fields: { image: IMG('tpl-salon.jpg'), eyebrow: 'Hair · Colour · Beauty · Hackney', headline: 'Leave feeling *like yourself, only better*', lead: 'Cuts, colour and care from a friendly team who listen first. Open late on Thursdays and Fridays.', cta1: 'Book an appointment', cta1Url: '#contact', cta2: 'Services & prices', cta2Url: '#menu', s1Value: '4.9★', s1Label: 'Google rating', s2Value: '12', s2Label: 'stylists', s3Value: 'Since 2012', s3Label: 'in Hackney' } }],
      ['restaurant-menu', { fields: { eyebrow: 'Services & prices', heading: 'Cut, colour *and care*', lead: 'Every appointment starts with a consultation. Prices vary with hair length and stylist level.', note: 'Free colour consultation and patch test 48 hours before any colour service.', cta: 'Book online', ctaUrl: '#contact' }, lists: { dishes: [
        { name: 'Cut & finish', price: 'from £55', desc: 'Wash, cut, blow-dry and styling advice.' },
        { name: 'Men’s cut', price: 'from £32', desc: 'Scissor or clipper cut with a hot towel finish.' },
        { name: 'Full colour', price: 'from £85', desc: 'Root-to-tip colour with a gloss and finish.' },
        { name: 'Balayage', price: 'from £140', desc: 'Hand-painted, sun-kissed highlights.', tag: 'Most booked' },
        { name: 'Blow-dry', price: '£35', desc: 'Smooth, bouncy or curly: your choice.' },
        { name: 'Gloss treatment', price: '£40', desc: 'Shine and tone refresh between colours.', tag: 'New' },
      ] } }],
      ['team-grid', { fields: { eyebrow: 'Our stylists', heading: 'The people *behind the chair*', lead: 'Experienced, friendly and always learning.' }, lists: { members: [
        { photo: av(2), name: 'Amara Osei', role: 'Founder & Creative Director', bio: 'Colour specialist with 18 years of experience.' },
        { photo: av(4), name: 'Theo Grant', role: 'Senior Stylist', bio: 'Precision cuts and men’s grooming.' },
        { photo: av(5), name: 'Lucia Romano', role: 'Colourist', bio: 'Balayage and lived-in blondes.' },
        { photo: av(8), name: 'Mei Tanaka', role: 'Beauty Therapist', bio: 'Brows, lashes and skin.' },
      ] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Client love', heading: 'Kind words *from regulars*', lead: '★ 4.9 from 640+ Google reviews' }, lists: { quotes: [
        { quote: 'Amara finally got my colour right after years of trying elsewhere. I leave smiling every time.', name: 'Jess P.', role: 'Client since 2019', avatar: av(3) },
        { quote: 'Best fade in East London, and they always remember how I like it.', name: 'Kwame A.', role: 'Monthly regular', avatar: av(7) },
        { quote: 'Warm, relaxed and so talented. The balayage is exactly what I asked for.', name: 'Sofia L.', role: 'First visit', avatar: av(6) },
      ] } }],
      ['contact-split-form', { fields: { eyebrow: 'Book', heading: 'Book your *appointment*', lead: 'Tell us the service, your preferred stylist and a few times that suit you. We confirm by text within the hour.', messageLabel: 'Service, stylist and times that suit you', submit: 'Request appointment', successTitle: 'Thank you!', successText: 'We will text you shortly to confirm your appointment.' }, lists: { methods: [
        { icon: 'phone', label: 'Call the salon', value: '020 7946 0456', url: 'tel:+442079460456' },
        { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
      ] } }],
      ['contact-map', { fields: { eyebrow: 'Visit', heading: 'Find *the studio*', lead: 'On Broadway Market, two minutes from London Fields.', mapTitle: 'Map showing Bloom Studio' }, lists: { offices: [{ city: 'Bloom Studio', address: '41 Broadway Market\nLondon E8 4PH', hours: 'Tue–Sat 9am–7pm · Thu–Fri until 9pm', phone: '020 7946 0456', phoneUrl: 'tel:+442079460456', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' }] } }],
      ['footer-minimal', { fields: { logoText: 'Bloom Studio', logoIcon: 'sparkles', links: 'Services | #menu\nStylists | #team\nReviews | #customers\nBook | #contact', copyright: '© 2026 Bloom Studio' } }],
    ],
    multiLinks: { '#menu': 'services.html', '#team': 'team.html', '#contact': 'book.html' },
    homeTitle: 'Bloom Studio: Hair, Colour and Beauty Salon in Hackney',
    homeDescription: 'Bloom Studio is a friendly hair and beauty salon on Broadway Market, Hackney: cuts, colour, balayage, brows and lashes, open late on Thursdays and Fridays.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Services & Prices: Cuts, Colour and Beauty | Bloom Studio',
        description: 'Prices for cuts, colour, balayage, blow-dries, brows, lashes and treatments at Bloom Studio in Hackney, with a free colour consultation before every colour.',
        sections: [
          ['restaurant-menu', { fields: { eyebrow: 'Hair', heading: 'Cut, colour *and care*', lead: 'Prices vary with hair length and stylist level; your stylist confirms the price before starting.', note: '', cta: '' }, lists: { dishes: [
            { name: 'Cut & finish', price: 'from £55', desc: 'Wash, cut, blow-dry and styling advice.' },
            { name: 'Men’s cut', price: 'from £32', desc: 'Scissor or clipper cut with a hot towel finish.' },
            { name: 'Full colour', price: 'from £85', desc: 'Root-to-tip colour with a gloss and finish.' },
            { name: 'Balayage', price: 'from £140', desc: 'Hand-painted, sun-kissed highlights.', tag: 'Most booked' },
            { name: 'Blow-dry', price: '£35', desc: 'Smooth, bouncy or curly: your choice.' },
            { name: 'Gloss treatment', price: '£40', desc: 'Shine and tone refresh between colours.' },
          ] } }],
          ['restaurant-menu', { fields: { eyebrow: 'Beauty', heading: 'Brows, lashes *and skin*', lead: 'Treatments with Mei, our beauty therapist.', note: 'Patch tests are free and needed 48 hours before tints and lash lifts.', cta: 'Book online', ctaUrl: 'book.html' }, lists: { dishes: [
            { name: 'Brow shape & tint', price: '£28', desc: 'Wax or thread, shape and tint.' },
            { name: 'Lash lift & tint', price: '£55', desc: 'Lifted, curled lashes for six weeks.', tag: 'Popular' },
            { name: 'Express facial', price: '£45', desc: '30 minutes of cleanse, mask and glow.' },
            { name: 'Gel manicure', price: '£35', desc: 'Long-lasting colour and cuticle care.' },
          ] } }],
        ],
      },
      {
        name: 'Stylists', slug: 'team',
        title: 'Meet Our Stylists and Beauty Team | Bloom Studio Hackney',
        description: 'Meet the stylists, colourists and beauty therapist at Bloom Studio in Hackney, and read what our regular clients say about their cuts, colour and treatments.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'Our stylists', heading: 'The people *behind the chair*', lead: 'Experienced, friendly and always learning.' }, lists: { members: [
            { photo: av(2), name: 'Amara Osei', role: 'Founder & Creative Director', bio: 'Colour specialist with 18 years of experience.' },
            { photo: av(4), name: 'Theo Grant', role: 'Senior Stylist', bio: 'Precision cuts and men’s grooming.' },
            { photo: av(5), name: 'Lucia Romano', role: 'Colourist', bio: 'Balayage and lived-in blondes.' },
            { photo: av(8), name: 'Mei Tanaka', role: 'Beauty Therapist', bio: 'Brows, lashes and skin.' },
          ] } }],
          ['testimonials-grid', { fields: { eyebrow: 'Client love', heading: 'Kind words *from regulars*', lead: '★ 4.9 from 640+ Google reviews' }, lists: { quotes: [
            { quote: 'Amara finally got my colour right after years of trying elsewhere. I leave smiling every time.', name: 'Jess P.', role: 'Client since 2019', avatar: av(3) },
            { quote: 'Best fade in East London, and they always remember how I like it.', name: 'Kwame A.', role: 'Monthly regular', avatar: av(7) },
            { quote: 'Warm, relaxed and so talented. The balayage is exactly what I asked for.', name: 'Sofia L.', role: 'First visit', avatar: av(6) },
          ] } }],
        ],
      },
      {
        name: 'Book', slug: 'book',
        title: 'Book an Appointment at Bloom Studio Hair Salon, Hackney',
        description: 'Book a cut, colour or beauty treatment at Bloom Studio on Broadway Market. Choose your service and stylist and we confirm your appointment by text in an hour.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Book', heading: 'Book your *appointment*', lead: 'Tell us the service, your preferred stylist and a few times that suit you. We confirm by text within the hour.', messageLabel: 'Service, stylist and times that suit you', submit: 'Request appointment', successTitle: 'Thank you!', successText: 'We will text you shortly to confirm your appointment.' }, lists: { methods: [
            { icon: 'phone', label: 'Call the salon', value: '020 7946 0456', url: 'tel:+442079460456' },
            { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
          ] } }],
          ['contact-map', { fields: { eyebrow: 'Visit', heading: 'Find *the studio*', lead: 'On Broadway Market, two minutes from London Fields.', mapTitle: 'Map showing Bloom Studio' }, lists: { offices: [{ city: 'Bloom Studio', address: '41 Broadway Market\nLondon E8 4PH', hours: 'Tue–Sat 9am–7pm · Thu–Fri until 9pm', phone: '020 7946 0456', phoneUrl: 'tel:+442079460456', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' }] } }],
        ],
      },
    ],
  },

  /* ── Law firm ────────────────────────────────────────────────────────────── */
  {
    id: 'law-firm', name: 'Law Firm Website', industry: 'Professional services',
    blurb: 'Dark, trustworthy hero, practice areas as stacking cards, how a case works on a drawn timeline, partners, reviews, FAQ and a consultation form.',
    theme: { brand: '#c9a96e', brandText: '#141b2d', bg: '#0f1626', surface: '#172036', text: '#f1f5f9', muted: '#a3adc2', radius: '6', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'inter' },
    seoTitle: 'Law Firm Website Template — Free Attorney & Solicitor HTML',
    seoDescription: 'Free law firm website template: trustworthy dark hero, practice areas as stacking cards, how a case works on a drawn timeline, partners, reviews and a form.',
    keywords: ['law firm website template', 'attorney website template html', 'solicitor website template', 'lawyer landing page', 'legal services website'],
    intro: 'A calm, authoritative site for a law firm or solicitor: a dark hero that states who you help, practice areas presented one by one as stacking cards, a timeline that draws itself to explain how a case works, the partners behind it, client reviews, honest answers about fees and a free consultation form.',
    bestFor: ['Law firms, solicitors and attorneys', 'Accountants and financial advisers', 'Consultants and other professional services'],
    sections: [
      ['navbar-simple', nav('Whitmore & Hale', 'shield-check', 'Free consultation', links(['Practice areas', '#highlights'], ['How we work', '#journey'], ['Our team', '#team'], ['Contact', '#contact']), { login: '' })],
      ['image-background-hero', { fields: { image: IMG('tpl-law.jpg'), eyebrow: 'Solicitors in Manchester since 1998', headline: 'Clear advice when *it matters most*', lead: 'Family, property, employment and probate law, explained in plain English with fixed fees agreed up front.', cta1: 'Book a free consultation', cta1Url: '#contact', cta2: 'Practice areas', cta2Url: '#highlights', s1Value: '25+', s1Label: 'years in practice', s2Value: '2,800', s2Label: 'cases resolved', s3Value: '4.9★', s3Label: 'client rating' } }],
      ['scroll-stack', { fields: { eyebrow: 'Practice areas', heading: 'How we *can help*', lead: 'Specialist teams for the moments that matter.' }, lists: { cards: [
        { icon: 'users', label: 'Family law', title: 'Divorce, separation and children', text: 'Calm, practical advice to reach fair agreements, with court representation when it is needed.', image: '' },
        { icon: 'house', label: 'Property', title: 'Buying, selling and leases', text: 'Residential and commercial conveyancing with fixed fees and updates at every stage.', image: '' },
        { icon: 'briefcase', label: 'Employment', title: 'Contracts, disputes and settlements', text: 'Advice for employees and employers, from settlement agreements to tribunal claims.', image: '' },
        { icon: 'file-text', label: 'Wills & probate', title: 'Plan ahead and settle estates', text: 'Wills, lasting powers of attorney and probate handled with care and clear costs.', image: '' },
      ] } }],
      ['scroll-path', { fields: { eyebrow: 'How we work', heading: 'Your case, *step by step*', lead: 'No surprises: you always know what happens next and what it costs.' }, lists: { milestones: [
        { date: 'Step 1', icon: 'phone', title: 'Free first call', text: 'A 30-minute call to understand your situation and tell you honestly if we can help.' },
        { date: 'Step 2', icon: 'file-text', title: 'A clear, fixed quote', text: 'A written plan with the steps, the timeline and a fixed fee wherever possible.' },
        { date: 'Step 3', icon: 'shield-check', title: 'We handle the detail', text: 'Your solicitor manages the paperwork and negotiations, with updates every week.' },
        { date: 'Step 4', icon: 'circle-check', title: 'Resolution', text: 'An agreement, a completed sale or a decision, and advice on what to do next.' },
      ] } }],
      ['team-grid', { fields: { eyebrow: 'Our team', heading: 'Partners you can *talk to*', lead: 'Experienced solicitors who explain things plainly.' }, lists: { members: [
        { photo: av(6), name: 'Eleanor Whitmore', role: 'Senior Partner · Family law', bio: '30 years resolving family matters.' },
        { photo: av(1), name: 'James Hale', role: 'Partner · Property', bio: 'Residential and commercial conveyancing.' },
        { photo: av(5), name: 'Priya Nair', role: 'Partner · Employment', bio: 'Tribunal and settlement specialist.' },
        { photo: av(4), name: 'David Okoro', role: 'Associate · Wills & probate', bio: 'Estates handled with care.' },
      ] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Client reviews', heading: 'Trusted by *families and businesses*', lead: '★ 4.9 from 380+ reviews' }, lists: { quotes: [
        { quote: 'Eleanor made the hardest year of my life manageable. Clear, kind and always one step ahead.', name: 'Rachel S.', role: 'Family law client', avatar: av(3) },
        { quote: 'Fixed fee, no surprises and our purchase completed a week early.', name: 'Tom & Aisha', role: 'Property clients', avatar: av(7) },
        { quote: 'Priya negotiated a settlement I did not think was possible.', name: 'Marcus L.', role: 'Employment client', avatar: av(8) },
      ] } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Questions about *working with us*', lead: 'Consultations, fees, appointments and how quickly we reply.' }, toggles: { showContact: false }, lists: { faqs: [
        { q: 'Is the first consultation really free?', a: 'Yes. The first 30-minute call is free and there is no obligation to instruct us afterwards.' },
        { q: 'How much will my case cost?', a: 'We give you a written quote before any work starts, with fixed fees for most property, wills and probate work.' },
        { q: 'Do you offer video appointments?', a: 'Yes. Most meetings can be held by video or phone, and our office is open for in-person meetings too.' },
        { q: 'How quickly will you reply?', a: 'We reply to every enquiry within one working day, and urgent family matters the same day.' },
      ] } }],
      ['contact-split-form', { fields: { eyebrow: 'Free consultation', heading: 'Tell us *what happened*', lead: 'Everything you share is confidential. A solicitor will call you within one working day.', messageLabel: 'A short summary of your situation', submit: 'Request a call back', successTitle: 'Thank you', successText: 'A solicitor will call you within one working day.' }, lists: { methods: [
        { icon: 'phone', label: 'Call us', value: '0161 496 0789', url: 'tel:+441614960789' },
        { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
        { icon: 'map-pin', label: 'Office', value: '12 King Street, Manchester M2 4WU', url: 'https://www.openstreetmap.org/' },
      ] } }],
      ['footer-minimal', { fields: { logoText: 'Whitmore & Hale', logoIcon: 'shield-check', links: 'Practice areas | #highlights\nHow we work | #journey\nOur team | #team\nContact | #contact', copyright: '© 2026 Whitmore & Hale Solicitors LLP' }, toggles: { showSocials: false } }],
    ],
    multiLinks: { '#highlights': 'practice-areas.html', '#team': 'team.html', '#contact': 'contact.html' },
    homeTitle: 'Whitmore & Hale: Solicitors in Manchester Since 1998',
    homeDescription: 'Whitmore & Hale are Manchester solicitors for family, property, employment and probate law: plain-English advice, fixed fees and a free first consultation.',
    pages: [
      {
        name: 'Practice areas', slug: 'practice-areas',
        title: 'Practice Areas: Family, Property, Employment and Probate',
        description: 'Family law, property and conveyancing, employment law, and wills and probate at Whitmore & Hale in Manchester, with fixed fees and a free first consultation.',
        sections: [
          ['scroll-stack', { fields: { eyebrow: 'Practice areas', heading: 'How we *can help*', lead: 'Specialist teams for the moments that matter.' }, lists: { cards: [
            { icon: 'users', label: 'Family law', title: 'Divorce, separation and children', text: 'Calm, practical advice to reach fair agreements, with court representation when it is needed.', image: '' },
            { icon: 'house', label: 'Property', title: 'Buying, selling and leases', text: 'Residential and commercial conveyancing with fixed fees and updates at every stage.', image: '' },
            { icon: 'briefcase', label: 'Employment', title: 'Contracts, disputes and settlements', text: 'Advice for employees and employers, from settlement agreements to tribunal claims.', image: '' },
            { icon: 'file-text', label: 'Wills & probate', title: 'Plan ahead and settle estates', text: 'Wills, lasting powers of attorney and probate handled with care and clear costs.', image: '' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Questions about *working with us*', lead: 'Consultations, fees, appointments and how quickly we reply.' }, toggles: { showContact: false }, lists: { faqs: [
            { q: 'Is the first consultation really free?', a: 'Yes. The first 30-minute call is free and there is no obligation to instruct us afterwards.' },
            { q: 'How much will my case cost?', a: 'We give you a written quote before any work starts, with fixed fees for most property, wills and probate work.' },
            { q: 'Do you offer video appointments?', a: 'Yes. Most meetings can be held by video or phone, and our office is open for in-person meetings too.' },
          ] } }],
        ],
      },
      {
        name: 'Our team', slug: 'team',
        title: 'Our Team: Solicitors and Partners at Whitmore & Hale',
        description: 'Meet the partners and solicitors at Whitmore & Hale in Manchester, specialists in family, property, employment and probate law, and read what clients say.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'Our team', heading: 'Partners you can *talk to*', lead: 'Experienced solicitors who explain things plainly.' }, lists: { members: [
            { photo: av(6), name: 'Eleanor Whitmore', role: 'Senior Partner · Family law', bio: '30 years resolving family matters.' },
            { photo: av(1), name: 'James Hale', role: 'Partner · Property', bio: 'Residential and commercial conveyancing.' },
            { photo: av(5), name: 'Priya Nair', role: 'Partner · Employment', bio: 'Tribunal and settlement specialist.' },
            { photo: av(4), name: 'David Okoro', role: 'Associate · Wills & probate', bio: 'Estates handled with care.' },
          ] } }],
          ['testimonials-grid', { fields: { eyebrow: 'Client reviews', heading: 'Trusted by *families and businesses*', lead: '★ 4.9 from 380+ reviews' }, lists: { quotes: [
            { quote: 'Eleanor made the hardest year of my life manageable. Clear, kind and always one step ahead.', name: 'Rachel S.', role: 'Family law client', avatar: av(3) },
            { quote: 'Fixed fee, no surprises and our purchase completed a week early.', name: 'Tom & Aisha', role: 'Property clients', avatar: av(7) },
            { quote: 'Priya negotiated a settlement I did not think was possible.', name: 'Marcus L.', role: 'Employment client', avatar: av(8) },
          ] } }],
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Contact Whitmore & Hale for a Free Legal Consultation',
        description: 'Book a free, confidential 30-minute consultation with Whitmore & Hale solicitors in Manchester. A solicitor will call you back within one working day.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Free consultation', heading: 'Tell us *what happened*', lead: 'Everything you share is confidential. A solicitor will call you within one working day.', messageLabel: 'A short summary of your situation', submit: 'Request a call back', successTitle: 'Thank you', successText: 'A solicitor will call you within one working day.' }, lists: { methods: [
            { icon: 'phone', label: 'Call us', value: '0161 496 0789', url: 'tel:+441614960789' },
            { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
          ] } }],
          ['contact-map', { fields: { eyebrow: 'Visit', heading: 'Our *Manchester office*', lead: 'Two minutes from St Ann’s Square, with meeting rooms on the ground floor.', mapTitle: 'Map showing Whitmore & Hale' }, lists: { offices: [{ city: 'Whitmore & Hale', address: '12 King Street\nManchester M2 4WU', hours: 'Mon–Fri 9am–5:30pm', phone: '0161 496 0789', phoneUrl: 'tel:+441614960789', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' }] } }],
        ],
      },
    ],
  },
];
