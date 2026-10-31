/* Opening Hours & Location, About us and Reviews summary added to the website templates (2026-10-31).
   Merged into STARTER_WIDGET_EXTRAS and WIDGET_ROLES by starters-widgets.js, like the other added sections.
   Every text matches the template's own facts (address, hours, ratings, founders); see
   __directions/ideas/ADDING-SECTIONS-TO-WEBSITE-TEMPLATES.txt for the placement options. */
import { IMG } from './meta.js';

const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
const DIRECTIONS = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/* hours rows: [day, opens, closes, note, closed] */
const OPENING = (fields, rows) => ['opening-hours', {
  fields: { businessType: 'LocalBusiness', directionsLabel: 'Get directions', ...fields },
  lists: { hours: rows.map(([day, opens, closes, note = '', closed = '']) => ({ day, opens, closes, note, closed })) },
}];
const SHUT = day => [day, '09:00', '17:00', '', 'closed'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const every = (days, opens, closes, note = '') => days.map(d => [d, opens, closes, note]);

/* facts: [number, label]; values: [icon, title, text]; toggles switch off blocks (founder / facts / values) */
const ABOUT = (fields, facts, values, toggles = {}) => ['about-story', {
  fields,
  lists: { facts: facts.map(([number, label]) => ({ number, label })), values: values.map(([icon, title, text]) => ({ icon, title, text })) },
  toggles,
}];

/* bars: counts for 5, 4, 3, 2, 1 stars; reviews: [avatar file, name, rating, date, title, text] */
const REVIEWS = (fields, counts, badge, reviews) => ['reviews-summary', {
  fields,
  lists: {
    bars: counts.map((count, i) => ({ stars: String(5 - i), count })),
    reviews: reviews.map(([file, name, rating, date, title, text]) => ({ avatar: IMG(file), name, rating, date, title, text, badge })),
  },
}];

export const WAVE2_EXTRAS = {
  /* ── Opening Hours & Location: replaces the contact map, on the home page and on the contact page ── */
  restaurant: [
    { replace: 'contact-map', inPages: true, section: OPENING({
      eyebrow: 'Visit us', heading: 'Find *our table*', lead: 'Walk-ins welcome at the bar. For dinner, booking is recommended.',
      businessName: 'Olive & Ember', businessType: 'Restaurant', timezone: 'Europe/Lisbon', hoursTitle: 'Opening hours',
      special: 'Tell us about allergies when you book and the kitchen will plan around them.',
      street: 'Rua de São Miguel 24', city: 'Lisbon', postcode: '1100-544', country: 'Portugal',
      mapUrl: OSM(-9.1290, 38.7110), mapTitle: 'Map showing Olive & Ember in Lisbon',
      phone: '+351 21 000 1234', phoneUrl: 'tel:+351210001234', email: 'hello@oliveandember.pt', emailUrl: 'mailto:hello@oliveandember.pt',
      directionsUrl: DIRECTIONS('Rua de São Miguel 24, 1100-544 Lisbon'), callLabel: 'Book by phone',
    }, [SHUT('Monday'), ...every(['Tuesday', 'Wednesday', 'Thursday'], '18:00', '23:00', 'Dinner'), ['Friday', '12:30', '15:00', 'Lunch'], ['Friday', '18:00', '23:30', 'Dinner'], ['Saturday', '12:30', '15:00', 'Lunch'], ['Saturday', '18:00', '23:30', 'Dinner'], ['Sunday', '12:30', '16:00', 'Lunch only']]) },
  ],
  salon: [
    { replace: 'contact-map', inPages: true, section: OPENING({
      eyebrow: 'Visit', heading: 'Find *the studio*', lead: 'On Broadway Market, two minutes from London Fields.',
      businessName: 'Bloom Studio', businessType: 'HairSalon', timezone: 'Europe/London', hoursTitle: 'Opening hours',
      special: 'Walk-ins are welcome when there is a free chair. Booking is the best way to get your stylist.',
      street: '41 Broadway Market', city: 'London', postcode: 'E8 4PH', country: 'United Kingdom',
      mapUrl: OSM(-0.0613, 51.5366), mapTitle: 'Map showing Bloom Studio on Broadway Market',
      phone: '020 7946 0456', phoneUrl: 'tel:+442079460456', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
      directionsUrl: DIRECTIONS('41 Broadway Market, London E8 4PH'), callLabel: 'Call to book',
    }, [SHUT('Monday'), ['Tuesday', '09:30', '18:00'], ['Wednesday', '09:30', '18:00'], ['Thursday', '09:30', '20:00', 'Late night'], ['Friday', '09:30', '20:00', 'Late night'], ['Saturday', '09:00', '17:00'], SHUT('Sunday')]) },
  ],
  dental: [
    { replace: 'contact-map', inPages: true, section: OPENING({
      eyebrow: 'Visit us', heading: 'Find *the clinic*', lead: 'Two minutes from the station, with step-free access and parking nearby.',
      businessName: 'Brightsmile Dental', businessType: 'Dentist', timezone: 'Europe/London', hoursTitle: 'Opening hours',
      special: 'Dental emergency? Call us and we will see you the same day where we can.',
      street: '8 Market Street', city: 'London', postcode: 'EC1M 5PQ', country: 'United Kingdom',
      mapUrl: OSM(-0.1017, 51.5198), mapTitle: 'Map showing Brightsmile Dental on Market Street',
      phone: '020 7946 0123', phoneUrl: 'tel:+442079460123', email: 'hello@brightsmile.co.uk', emailUrl: 'mailto:hello@brightsmile.co.uk',
      directionsUrl: DIRECTIONS('8 Market Street, London EC1M 5PQ'), callLabel: 'Call the clinic',
    }, [...every(['Monday', 'Tuesday', 'Wednesday', 'Thursday'], '08:00', '19:00'), ['Friday', '08:00', '17:00'], ['Saturday', '09:00', '14:00', 'Appointments and emergencies'], SHUT('Sunday')]) },
  ],
  hotel: [
    { replace: 'contact-map', inPages: true, section: OPENING({
      eyebrow: 'Find us', heading: 'Two minutes *from the sea*', lead: 'On a quiet lane above Praia da Luz, 45 minutes from Faro airport.',
      businessName: 'Casa Mar', businessType: 'Hotel', timezone: 'Europe/Lisbon', hoursTitle: 'Reception hours',
      special: 'Check-in from 15:00, check-out until 11:00. Arriving late? Tell us and we will leave your key.',
      street: 'Rua da Praia 12', city: 'Luz, Algarve', postcode: '8600-160', country: 'Portugal',
      mapUrl: OSM(-8.7339, 37.0867), mapTitle: 'Map showing Casa Mar in Luz',
      phone: '+351 282 000 123', phoneUrl: 'tel:+351282000123', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
      directionsUrl: DIRECTIONS('Rua da Praia 12, 8600-160 Luz, Portugal'), callLabel: 'Call reception',
    }, every(DAYS, '07:00', '23:00')) },
  ],
  /* A cleaning company has no shop: hours and phone, no street address and no map */
  'local-service': [
    { after: 'contact-split-form', section: OPENING({
      eyebrow: 'When we are here', heading: 'Open when *you need us*', lead: 'Book online at any time. Our team answers calls and messages during these hours.',
      businessName: 'Sparkle & Co', businessType: 'ProfessionalService', timezone: 'Europe/London', hoursTitle: 'Opening hours',
      special: 'We cover the whole city and towns within 15 miles. Online booking is open 24 hours a day.',
      mapUrl: '', phone: '0800 000 1234', phoneUrl: 'tel:+448000001234', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
      directionsLabel: '', callLabel: 'Call us free',
    }, [...every(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], '07:00', '19:00'), ['Saturday', '08:00', '16:00'], SHUT('Sunday')]) },
  ],

  /* ── About us: the story before the team (it moves to the About page with the team in the multi-page version) ── */
  agency: [
    { page: 'About', before: 'stats-counters', section: ABOUT({
      eyebrow: 'About Northstar', heading: 'An independent studio, *by design*',
      story: 'Northstar started in 2015 with two designers, one shared desk and a simple promise: make fewer things, and make them properly. Today we are a small independent studio of designers, developers and strategists who help ambitious companies launch brands, websites and products that stand out.',
      story2: 'We stay small on purpose. The people you meet in the first call are the people who do the work, and every project has a senior designer from the first sketch to launch day.',
      image: IMG('about-studio.jpg'), imageAlt: 'A bright studio with a laptop, coffee mugs and notes on the pinboard',
      badgeNumber: '11', badgeLabel: 'years independent',
      primaryLabel: 'Meet the team', primaryUrl: '#team', secondaryLabel: 'See our work', secondaryUrl: '#results',
      orgName: 'Northstar', foundedYear: '2015',
    }, [['120+', 'teams helped'], ['11', 'years independent'], ['4.9', 'average client rating']], [
      ['award', 'Fewer, better things', 'We take on a small number of projects so each one gets our full attention.'],
      ['users', 'Senior people, always', 'No hand-offs to juniors: the team you meet is the team that builds.'],
      ['shield-check', 'Honest about the work', 'Clear scopes, fixed prices and plain talk when something is not working.'],
    ], { showFounder: false }) },
  ],
  fitness: [
    { before: 'team-grid', section: ABOUT({
      eyebrow: 'Our story', heading: 'Built by *lifters*, for everyone',
      story: 'IRONHOUSE opened in 2016 in a converted warehouse with six racks and one rule: nobody trains alone. Today 900 members share the floor, from first-timers on their first week to athletes training for race day.',
      story2: 'Every class is coached and every programme scales to your level, so you can start where you are and get stronger every single week.',
      image: IMG('tpl-fitness.jpg'), imageAlt: 'Members training together at IRONHOUSE',
      badgeNumber: '900', badgeLabel: 'members and counting',
      founderPhoto: IMG('avatar-4.jpg'), founderPhotoAlt: 'Marcus Webb, head coach', founder: 'Marcus Webb', founderRole: 'Head coach and co-founder',
      quote: '“The best programme is the one you keep showing up for.”',
      primaryLabel: 'Meet the coaches', primaryUrl: '#team', secondaryLabel: 'Start free trial', secondaryUrl: '#pricing',
      orgName: 'IRONHOUSE', foundedYear: '2016',
    }, [['900', 'members'], ['60+', 'classes a week'], ['24/7', 'open gym']], [
      ['users', 'Everyone belongs', 'Beginners are welcome here, and no one is left to figure it out alone.'],
      ['trending-up', 'Progress you can see', 'Workouts and results are tracked every week so you can see how far you have come.'],
      ['heart', 'Community first', 'People come for the training and stay for the people they train with.'],
    ]) },
  ],
  nonprofit: [
    { before: 'team-grid', section: ABOUT({
      eyebrow: 'About GreenRoots', heading: 'Forests grow when *people lead*',
      story: 'GreenRoots began in 2016 with a village nursery and a thousand native seedlings. Today local teams in 38 villages across 4 countries grow, plant and protect trees, and are paid fairly to do it.',
      story2: 'We are a small team in London and Nairobi. We work with local partners, publish our results every year and send 92% of every donation to projects.',
      image: IMG('tpl-nature.jpg'), imageAlt: 'Green hills where GreenRoots trees are growing',
      badgeNumber: '10', badgeLabel: 'years of planting',
      primaryLabel: 'See our impact', primaryUrl: '#results', secondaryLabel: 'Donate', secondaryUrl: '#get-started',
      orgName: 'GreenRoots', foundedYear: '2016',
    }, [['2.4M', 'trees planted'], ['38', 'villages'], ['1,100', 'local jobs']], [
      ['users', 'Led by communities', 'Local teams choose the species, plant the trees and look after them for years.'],
      ['shield-check', 'Open about results', 'We publish survival rates every season, the good news and the bad.'],
      ['leaf', 'Planted to last', 'We pay for care after planting, because a tree only counts once it survives.'],
    ], { showFounder: false }) },
  ],
  'real-estate': [
    { before: 'team-grid', section: ABOUT({
      eyebrow: 'About Harbor Homes', heading: 'Local agents who *know the coast*',
      story: 'Harbor Homes was founded in 2012 by Grace Okafor, who had spent years selling homes on the coast and wanted an agency that treats every sale the way a good neighbour would.',
      story2: 'Every agent specialises in a few neighbourhoods, so you get real local insight, honest advice and a smooth move from first viewing to keys in hand.',
      image: IMG('tpl-realestate.jpg'), imageAlt: 'A modern house with large windows by the coast',
      badgeNumber: '14', badgeLabel: 'years on the coast',
      founderPhoto: IMG('avatar-6.jpg'), founderPhotoAlt: 'Grace Okafor, founder', founder: 'Grace Okafor', founderRole: 'Founder and director',
      quote: '“A good sale starts with an honest valuation.”',
      primaryLabel: 'Meet the agents', primaryUrl: '#team', secondaryLabel: 'Book a valuation', secondaryUrl: '#contact',
      orgName: 'Harbor Homes', foundedYear: '2012',
    }, [['1,200+', 'homes sold'], ['21', 'days to sell on average'], ['98%', 'of asking price']], [
      ['handshake', 'Honest advice', 'We will tell you what your home is worth, and what is not worth doing before you sell.'],
      ['map-pin', 'Local knowledge', 'Agents who live in the area know the streets, the schools and the buyers.'],
      ['heart', 'Looked after to the keys', 'One person guides you from the first viewing to the day you move.'],
    ]) },
  ],

  /* ── Reviews summary: the star breakdown in place of the testimonial section. The business templates leave the
        "what is rated" name empty, so no review markup is written for a business rating itself. ── */
  'product-store': [
    { replace: 'testimonials-grid', section: REVIEWS({
      eyebrow: 'Reviews', heading: 'Rated *4.8 out of 5* by 3,200 listeners', lead: 'Every review comes from a verified purchase. Tap a bar to read only the reviews with that rating.',
      itemName: 'Sona One wireless headphones', itemType: 'Product', countLabel: 'verified reviews', writeLabel: 'Write a review', writeUrl: '#pricing',
    }, ['2,650', '400', '90', '35', '25'], 'Verified purchase', [
      ['avatar-2.jpg', 'Hannah L.', '5', 'October 2026', 'Unreal noise cancelling', 'I wore them on a 14-hour flight and only took them off to eat. The noise cancelling is unreal.'],
      ['avatar-3.jpg', 'Marcus T.', '5', 'September 2026', 'Clear calls', 'Calls sound clear even on a windy street. My team stopped asking me to repeat myself.'],
      ['avatar-5.jpg', 'Ines R.', '5', 'September 2026', 'Fine with glasses', 'Comfortable all day with glasses, which I could never say about my old pair.'],
      ['avatar-7.jpg', 'Tom B.', '4', 'August 2026', 'Great, but I wish for a hard case', 'Sound and battery are excellent. A hard case in the box would make it perfect.'],
      ['avatar-6.jpg', 'Aisha K.', '5', 'August 2026', '', 'Paired in seconds and switches between my phone and laptop without any fuss.'],
      ['avatar-1.jpg', 'Leo F.', '3', 'July 2026', 'Good, took time to learn', 'Lovely sound. The touch controls took me a few days to get used to.'],
    ]) },
  ],
};

/* Dental: the patient reviews summary replaces the testimonial wall on the home page */
WAVE2_EXTRAS.dental.push({ replace: 'testimonials-grid', section: REVIEWS({
      eyebrow: 'Patient reviews', heading: 'Rated *4.9 out of 5* by our patients', lead: 'Real reviews from people we look after. Tap a bar to read only the reviews with that rating.',
      itemName: '', countLabel: 'patient reviews', writeLabel: 'Leave a review', writeUrl: '#contact',
    }, ['1,010', '70', '14', '4', '2'], 'Verified patient', [
      ['avatar-3.jpg', 'Claire W.', '5', 'October 2026', 'I look forward to check-ups', 'I have been nervous of dentists all my life. Dr Bello was so patient that I actually look forward to check-ups now.'],
      ['avatar-7.jpg', 'James P.', '5', 'September 2026', 'Seen the same day', 'Booked online at 9am, seen by lunchtime for an emergency.'],
      ['avatar-4.jpg', 'Omar H.', '5', 'September 2026', 'The kids love it', 'My kids love coming here. The team makes it fun.'],
      ['avatar-2.jpg', 'Sam T.', '5', 'August 2026', 'Clear about every step', 'Dr Martins explained every step of my aligner treatment. Worth every penny.'],
      ['avatar-5.jpg', 'Priya N.', '4', 'August 2026', '', 'Friendly team and a spotless clinic. Appointments sometimes run a little late, but they always apologise.'],
      ['avatar-6.jpg', 'Helen D.', '3', 'July 2026', 'Good care, busy phones', 'Excellent dentist, though it took a few tries to get through on the phone. Booking online was easy.'],
    ]) });

/* The same swap on the salon's home page */
WAVE2_EXTRAS.salon.push({ replace: 'testimonials-grid', section: REVIEWS({
  eyebrow: 'Client love', heading: 'Rated *4.9 out of 5* by our clients', lead: 'Kind words from regulars and first-timers. Tap a bar to read only the reviews with that rating.',
  itemName: '', countLabel: 'Google reviews', writeLabel: 'Leave a review', writeUrl: '#contact',
}, ['590', '38', '8', '3', '1'], 'Verified client', [
  ['avatar-3.jpg', 'Jess P.', '5', 'October 2026', 'Finally the right colour', 'Amara finally got my colour right after years of trying elsewhere. I leave smiling every time.'],
  ['avatar-7.jpg', 'Kwame A.', '5', 'September 2026', 'Best fade in East London', 'Best fade in East London, and they always remember how I like it.'],
  ['avatar-6.jpg', 'Sofia L.', '5', 'September 2026', 'Exactly what I asked for', 'Warm, relaxed and so talented. The balayage is exactly what I asked for.'],
  ['avatar-2.jpg', 'Nadia R.', '4', 'August 2026', '', 'Lovely studio and a great cut. Popular days book up quickly, so plan ahead.'],
  ['avatar-4.jpg', 'Chris M.', '5', 'August 2026', 'A calm place', 'Nobody rushes you here. Tea, a chat and a cut I did not have to fix at home.'],
  ['avatar-5.jpg', 'Beth O.', '3', 'July 2026', 'Great result, long wait', 'Beautiful colour, though my appointment started a little late. Worth it in the end.'],
]) });

/* The local service company: its carousel of quotes becomes the star breakdown */
WAVE2_EXTRAS['local-service'].push({ replace: 'testimonials-carousel', section: REVIEWS({
  eyebrow: 'Reviews', heading: 'Rated *4.9 out of 5* by local families', lead: 'Real reviews from customers across the city. Tap a bar to read only the reviews with that rating.',
  itemName: '', countLabel: 'customer reviews', writeLabel: 'Leave a review', writeUrl: '#contact',
}, ['2,100', '150', '30', '12', '8'], 'Verified customer', [
  ['avatar-3.jpg', 'Rachel S.', '5', 'October 2026', 'Like walking into a new home', 'The house looked like new when I got back from work. The cleaner was friendly and left everything tidy.'],
  ['avatar-4.jpg', 'Imran A.', '5', 'September 2026', 'Fixed price, no surprises', 'The quote was fixed, the booking took a minute and the team arrived on time.'],
  ['avatar-6.jpg', 'Joanne W.', '5', 'September 2026', 'Perfect for our office', 'We use Sparkle & Co for the whole office every week. It is spotless on Monday mornings.'],
  ['avatar-1.jpg', 'Paul G.', '4', 'August 2026', '', 'Great clean and polite staff. I would have liked a reminder message the day before.'],
  ['avatar-5.jpg', 'Maria L.', '5', 'August 2026', 'Eco-friendly and thorough', 'I liked that they bring their own eco-friendly products. Nothing was missed, even behind the sofa.'],
  ['avatar-8.jpg', 'Dev P.', '3', 'July 2026', 'Good, one missed spot', 'A good clean overall, and they came back to fix a missed spot the next day without any fuss.'],
]) });

/* Landing-page snippet and template-page wording for each section added here (see WIDGET_ROLES in starters-widgets.js) */
export const WAVE2_ROLES = {
  'agency:about-story': "an About us section on the About page with the studio's story, headline numbers and values",
  'restaurant:opening-hours': 'an opening hours table with lunch and dinner service, a live Open now badge, the address and a map',
  'salon:opening-hours': 'an opening hours table with a live Open now badge, late-night Thursdays and Fridays and a map of the studio',
  'dental:opening-hours': 'a clinic hours table with a live Open now badge, the address, a map and a call button for emergencies',
  'hotel:opening-hours': 'reception hours with a live Open now badge, the address, a map and a call button',
  'local-service:opening-hours': 'opening hours with a live Open now badge and a free call button, for a business that comes to the customer',
  'product-store:reviews-summary': 'a reviews summary with the 4.8 average, a star breakdown that filters the review cards and Product rating data',
  'dental:reviews-summary': 'a reviews summary with the 4.9 average and a star breakdown that filters the patient reviews',
  'salon:reviews-summary': 'a reviews summary with the 4.9 average and a star breakdown that filters the client reviews',
  'local-service:reviews-summary': 'a reviews summary with the 4.9 average and a star breakdown that filters the customer reviews',
  'fitness:about-story': 'an About us section with the gym\'s story, the head coach, headline numbers and values',
  'nonprofit:about-story': 'an About us section with the charity\'s story, headline numbers and values',
  'real-estate:about-story': 'an About us section with the agency\'s story, its founder, headline numbers and values',
};
