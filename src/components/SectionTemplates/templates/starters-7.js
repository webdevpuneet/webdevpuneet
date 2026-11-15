/* Website templates, part 7: the Cafe & Coffee Shop (online ordering for pickup). Same shape as starters-6.js: home
   `sections`, hand-written `pages` for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in
   starters.js. SEO text: seo-website-templates-7.js.

   It reuses the ecommerce kit (mega menu header, product listing, cart drawer, cart, checkout, thank you, orders) with a
   cafe menu as the catalogue, and uses the Loyalty Stamp Card section (loyalty-card.js, new with this template) and
   Opening Hours & Location. Every internal link is a "#page" token, resolved by fixSiteLinks() like starters-6.js. Photos
   are cafe-*.jpg in public/images/section-templates (royalty-free Pexels photos, resized and compressed). */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;

/* The cafe menu: [name, category, price, oldPrice, badge, rating, reviews, date, stock, image file, alt text] */
const P = (name, category, price, oldPrice, badge, rating, reviews, date, stock, file, alt) => ({
  image: IMG(file), imageAlt: alt, name, category, price, oldPrice, colours: '', badge, rating, reviews, date, stock, button: 'Add to order', url: '#',
});
const MENU = [
  P('Flat white', 'Coffee', '$4.50', '', 'Bestseller', '4.9', '1,120', '2026-03-01', 'in', 'cafe-flatwhite.jpg', 'A barista pouring milk into a flat white'),
  P('Latte', 'Coffee', '$4.80', '', '', '4.8', '860', '2026-03-01', 'in', 'cafe-latte.jpg', 'A latte with a leaf pattern in a black cup'),
  P('Cappuccino', 'Coffee', '$4.60', '', '', '4.8', '740', '2026-03-01', 'in', 'cafe-cappuccino.jpg', 'A cappuccino with latte art on a saucer'),
  P('Cortado', 'Coffee', '$4.20', '', '', '4.7', '310', '2026-03-01', 'in', 'cafe-cortado.jpg', 'A cortado in a glass with a spoon on the saucer'),
  P('Pour-over, single origin', 'Coffee', '$5.50', '', 'Single origin', '4.9', '205', '2026-09-12', 'in', 'cafe-pourover.jpg', 'Coffee poured from a glass carafe over fresh beans'),
  P('Matcha latte', 'Tea', '$5.50', '', 'New', '4.7', '96', '2026-11-02', 'in', 'cafe-matcha.jpg', 'A green matcha latte in a glass'),
  P('Butter croissant', 'Pastries', '$3.80', '', 'Baked daily', '4.9', '980', '2026-03-01', 'in', 'cafe-croissant.jpg', 'A golden butter croissant on a wooden board'),
  P('Fudge brownie', 'Pastries', '$3.90', '', '', '4.8', '430', '2026-03-01', 'in', 'cafe-brownie.jpg', 'A stack of almond fudge brownies'),
  P('Chocolate layer cake', 'Pastries', '$6.20', '', '', '4.8', '215', '2026-06-18', 'in', 'cafe-chocolate-cake.jpg', 'A slice of chocolate layer cake'),
  P('Berry cheesecake', 'Pastries', '$6.50', '', '', '4.7', '188', '2026-06-18', 'in', 'cafe-cheesecake.jpg', 'A slice of cheesecake with fresh berries'),
  P('Glazed donut', 'Pastries', '$3.50', '', '', '4.6', '152', '2026-09-30', 'in', 'cafe-donuts.jpg', 'Colourful glazed donuts in a box'),
  P('Sourdough baguette', 'Pastries', '$4.20', '', 'Fresh at 8am', '4.8', '121', '2026-08-04', 'in', 'cafe-baguette.jpg', 'Two crusty sourdough baguettes'),
  P('Chicken and rocket sandwich', 'Food', '$9.50', '', '', '4.8', '342', '2026-03-01', 'in', 'cafe-sandwich.jpg', 'A toasted chicken and rocket sandwich on a board'),
  P('Berry smoothie bowl', 'Food', '$9.00', '', 'Vegan', '4.7', '167', '2026-07-22', 'in', 'cafe-bowl.jpg', 'A smoothie bowl topped with berries, almonds and mango'),
  P('Coffee and cake for two', 'Food', '$9.90', '$11.30', 'Deal', '4.9', '264', '2026-10-15', 'in', 'cafe-lattes-cake.jpg', 'Two lattes and a slice of cake on a wooden tray'),
  P('House blend beans, 250g', 'Beans', '$13', '', 'Take home', '4.9', '510', '2026-03-01', 'in', 'cafe-beans.jpg', 'A close view of roasted coffee beans'),
];
/* the products a strip shows: [menu index, …] */
const PICK = idx => idx.map(i => {
  const m = MENU[i];
  return { image: m.image, imageAlt: m.imageAlt, badge: m.badge, name: m.name, price: m.price, oldPrice: m.oldPrice, rating: m.rating, button: 'Add to order', url: '#' };
});
const FAVOURITES = PICK([0, 6, 5, 7, 12, 15]);

const HEADER = ['mega-menu-columns', {
  fields: {
    logoText: 'Bean & Bloom', logoIcon: 'coffee', logoUrl: '#',
    topText: 'Order online for pickup in 10 minutes · Free delivery over $25', topLinks: 'My orders | #orders\nOpening hours | #visit\nOur story | #about',
    searchUrl: '#menu', searchPlaceholder: 'Search flat white, croissant, beans', accountUrl: '#orders', accountLabel: 'My orders',
    wishlistUrl: '', cartUrl: '#cart', cartCount: '0', navLabel: 'Menu',
  },
  toggles: { showWishlist: false },
  lists: {
    items: [
      {
        label: 'Menu', url: '#menu',
        col1Title: 'Drinks', col1Links: 'Coffee | #menu-coffee\nTea and matcha | #menu-tea',
        col2Title: 'Eat', col2Links: 'Pastries | #menu-pastries\nLunch | #menu-food',
        col3Title: 'Take home', col3Links: 'Coffee beans | #menu-beans\nNew this month | #menu-new',
        promoImage: IMG('cafe-lattes-cake.jpg'), promoTag: 'Deal', promoTitle: 'Coffee and cake for two', promoText: 'Two drinks and a slice for $9.90.', promoLink: 'Order now', promoUrl: '#menu-food',
      },
      { label: 'Rewards', url: '#rewards', col1Links: '' },
      { label: 'Our story', url: '#about', col1Links: '' },
      { label: 'Visit', url: '#visit', col1Links: '' },
    ],
  },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('cafe-hero.jpg'), eyebrow: 'Specialty coffee · Portland, Oregon',
    headline: 'Good coffee, *slow mornings*',
    lead: 'Small-batch espresso, pastries baked before sunrise and a table by the window. Order ahead and skip the queue.',
    cta1: 'Order online', cta1Url: '#menu', cta2: 'See opening hours', cta2Url: '#visit',
    s1Value: '4.9 ★', s1Label: 'from 1,800 reviews', s2Value: '10 min', s2Label: 'average pickup', s3Value: '7am', s3Label: 'open daily from',
  },
}];

/* A product strip; its own heading each time it is used (the products are always the cafe menu) */
const STRIP = (heading, eyebrow = 'Popular right now', products = FAVOURITES, anchor) => ['product-strip', {
  ...(anchor && { anchor }),
  fields: { eyebrow, heading, allLink: 'See the full menu', allUrl: '#menu' },
  toggles: { showWishlist: false },
  lists: { products },
}];

const WHY = ['features-icon-grid', {
  fields: { eyebrow: 'Why Bean & Bloom', heading: 'A café that *takes its time*', lead: 'The small things that make a morning stop worth the detour.' },
  lists: { features: [
    { icon: 'coffee', title: 'Roasted in-house', text: 'We roast every Tuesday in small batches from four farms we have visited, so your beans are never more than a week old.', link: '', url: '#' },
    { icon: 'heart', title: 'Baked before sunrise', text: 'Croissants, brownies and sourdough come out of our oven by 6.30 am, seven days a week.', link: '', url: '#' },
    { icon: 'clock', title: 'Order ahead', text: 'Order online, pick up in about ten minutes and walk straight past the queue.', link: '', url: '#' },
  ] },
}];

const LOYALTY = ['loyalty-card', {
  anchor: 'rewards',
  fields: {
    eyebrow: 'Rewards', heading: 'Every eighth drink is *on us*',
    lead: 'Collect a stamp with every drink and your next one is free. No app and no sign-up: just show your card at the counter or tell us your phone number.',
    cardTitle: 'Bean & Bloom Rewards', cardSub: 'One stamp per drink', stamps: '8', startFilled: '3', stampGlyph: '☕', rewardShort: 'FREE',
    rewardText: 'Reward: any drink, any size, free', note: 'Demo card: press the button to add a stamp. Progress is saved in this browser.',
    joinLabel: 'Order a drink', joinUrl: '#menu-coffee',
  },
}];

const BEANS = ['features-split-image', {
  fields: {
    eyebrow: 'Our beans', heading: 'Roasted *in the café*, every Tuesday',
    lead: 'The roaster sits behind the counter, so you can watch your beans being made. Take a bag home and we will grind it for your machine.',
    cta: 'Shop coffee beans', ctaUrl: '#menu-beans',
    image: IMG('cafe-bar.jpg'), imageAlt: 'A barista working at the espresso machine behind a wooden counter',
  },
  lists: { points: [
    { icon: 'coffee', title: 'Ground to order', text: 'Tell us espresso, filter or cafetière and we grind it for you.' },
    { icon: 'leaf', title: 'Single origins too', text: 'A new guest bean every month, brewed as a pour-over in the café.' },
    { icon: 'truck', title: 'Delivered fresh', text: 'Order beans online and they arrive within two days of roasting.' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *the neighbourhood*', lead: '★ 4.9 from 1,800+ Google reviews' },
  lists: { quotes: [
    { quote: 'The best flat white in the city, and the croissants are gone by nine for a reason. Ordering ahead means no queue.', name: 'Maya R.', role: 'Regular since 2019', avatar: av(2) },
    { quote: 'Friendly staff, great music and a window table that is perfect for working. The loyalty card is a lovely touch.', name: 'Daniel K.', role: 'Remote worker', avatar: av(3) },
    { quote: 'We bought the house blend after our first visit and now drink it at home every day. It smells incredible.', name: 'Priya S.', role: 'Bean subscriber', avatar: av(5) },
  ] },
}];

const NEWSLETTER = ['cta-newsletter', { fields: { heading: 'Get *a free pastry* with your first order', lead: 'New seasonal drinks, bean launches and the occasional free coffee, once or twice a month.', proof: '3,400 coffee lovers', button: 'Subscribe', note: 'Unsubscribe any time.' } }];

const HOURS = (fields = {}) => ['opening-hours', {
  anchor: 'visit',
  fields: {
    eyebrow: 'Visit us', heading: 'Come in, *stay a while*', lead: 'Walk in any time we are open, or order online and collect at the counter. Dogs and laptops are welcome.',
    businessName: 'Bean & Bloom', businessType: 'CafeOrCoffeeShop', timezone: 'America/Los_Angeles', hoursTitle: 'Opening hours',
    special: 'Last orders 15 minutes before closing. Kitchen closes at 3 pm.',
    street: '218 Alder Street', city: 'Portland', postcode: 'OR 97205', country: 'United States',
    mapUrl: OSM(-122.6784, 45.5189), mapTitle: 'Map showing Bean & Bloom on Alder Street, Portland',
    phone: '+1 503 555 0142', phoneUrl: 'tel:+15035550142', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
    directionsLabel: 'Get directions', directionsUrl: 'https://www.google.com/maps/search/?api=1&query=218%20Alder%20Street%2C%20Portland%20OR', callLabel: 'Call to order',
    ...fields,
  },
  lists: { hours: [
    ['Monday', '07:00', '17:00'], ['Tuesday', '07:00', '17:00'], ['Wednesday', '07:00', '17:00'], ['Thursday', '07:00', '17:00'],
    ['Friday', '07:00', '18:00', 'Late close'], ['Saturday', '08:00', '18:00', 'Weekend brunch'], ['Sunday', '08:00', '15:00'],
  ].map(([day, opens, closes, note = '']) => ({ day, opens, closes, note, closed: '' })) },
}];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Bean & Bloom', logoIcon: 'coffee', tagline: 'Specialty coffee, fresh bakes and slow mornings in Portland.', copyright: '© 2026 Bean & Bloom. All rights reserved.', legal: 'Privacy | /privacy/\nAllergens | #visit' },
  lists: {
    columns: [
      { title: 'Menu', links: 'Coffee | #menu-coffee\nPastries | #menu-pastries\nLunch | #menu-food\nCoffee beans | #menu-beans' },
      { title: 'Order', links: 'My orders | #orders\nCart | #cart\nCheckout | #checkout\nRewards | #rewards' },
      { title: 'Visit', links: 'Opening hours | #visit\n218 Alder Street | #visit\nOur story | #about\nContact | #visit' },
    ],
    socials: [
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'map-pin', label: 'Find us on Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=218%20Alder%20Street%2C%20Portland%20OR' },
    ],
  },
}];

const DRAWER = ['cart-drawer', { fields: {
  title: 'Your order', emptyTitle: 'Your order is empty', emptyText: 'Add a coffee or something sweet from the menu.', continueText: 'Back to the menu',
  note: 'Pickup or delivery is chosen at checkout.', freeMore: 'You are {amount} away from free delivery', freeDone: 'You have free delivery!',
  continueUrl: '#menu', checkoutUrl: '#checkout', cartUrl: '#cart', freeOver: '25', shipFlat: '3',
} }];

export const CAFE_WEBSITE_TEMPLATES = [
  {
    id: 'cafe', name: 'Cafe & Coffee Shop Website (Order Online)', industry: 'Food & drink',
    blurb: 'A café with online ordering: menu with filters, cart and checkout, loyalty stamp card, opening hours with map, reviews and a story page.',
    theme: { brand: '#8a4b24', brandText: '#ffffff', bg: '#fbf6ee', surface: '#f2e8d9', text: '#2b1d14', muted: '#6b5444', radius: '14', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Cafe Website Template — Free Coffee Shop HTML Template',
    seoDescription: 'Free cafe website template with online ordering: menu with filters, cart and checkout, loyalty stamp card, opening hours with a map and reviews. Export HTML.',
    keywords: ['cafe website template', 'coffee shop website template', 'cafe template with online ordering', 'bakery website template', 'coffee shop html template free', 'cafe landing page html'],
    intro: 'A warm website for a café, coffee shop or bakery that also takes orders. A header with search, a mega menu and a cart leads into a photo hero, customer favourites you can add to an order, a loyalty stamp card visitors can try, a story about your roastery, reviews and today\'s opening hours beside a map of the café. The menu page filters coffee, tea, pastries, lunch and beans, and the order flows through a cart drawer, checkout and thank you page.',
    bestFor: ['Cafés and coffee shops', 'Bakeries and juice bars', 'Roasters selling beans online'],
    sections: [HEADER, HERO, STRIP('Customer *favourites*', 'Popular right now', FAVOURITES, 'menu'), WHY, LOYALTY, BEANS, REVIEWS, HOURS(), NEWSLETTER, FOOTER, DRAWER],
    multiLinks: {
      '#menu-coffee': 'menu.html?cat=Coffee', '#menu-tea': 'menu.html?cat=Tea', '#menu-pastries': 'menu.html?cat=Pastries', '#menu-food': 'menu.html?cat=Food',
      '#menu-beans': 'menu.html?cat=Beans', '#menu-new': 'menu.html?sort=newest', '#rewards': 'index.html#rewards',
    },
    homeTitle: 'Bean & Bloom: Specialty Coffee and Fresh Bakes in Portland',
    homeDescription: 'Bean & Bloom is a Portland coffee shop with small-batch espresso, pastries baked before sunrise and online ordering for fast pickup. See the menu and our hours.',
    pages: [
      {
        name: 'Menu', slug: 'menu',
        title: 'Menu: Order Coffee, Pastries and Lunch Online | Bean & Bloom',
        description: 'Order coffee, tea, pastries, lunch and roasted beans online from Bean & Bloom in Portland. Filter the menu, add to your order and collect in about ten minutes.',
        sections: [['product-listing', { fields: { eyebrow: 'Menu', heading: 'Order *for pickup*', lead: 'Coffee, pastries, lunch and beans, made fresh every morning. Pick what you like and collect it at the counter.' }, toggles: { showWishlist: false }, lists: { products: MENU } }], STRIP('Do not forget *a treat*', 'Add to your order', PICK([6, 7, 9, 10]))],
      },
      {
        name: 'Our story', slug: 'about',
        title: 'Our Story: A Local Roastery Since 2016 | Bean & Bloom',
        description: 'The story of Bean & Bloom: a Portland roastery and café since 2016, the four farms we buy from, the team behind the counter and the things we care about most.',
        sections: [
          ['about-story', {
            fields: {
              eyebrow: 'Our story', heading: 'Started with a *second-hand roaster*',
              story: 'Ana and Leo opened Bean & Bloom in 2016 with a 5 kg roaster bought second-hand and a counter made from a fallen oak. They wanted a neighbourhood place where the coffee is properly good and nobody rushes you.',
              story2: 'Today the roaster still sits behind the counter. We buy from four farms we have visited, bake every morning and keep the team small, so the person who greets you knows your order.',
              image: IMG('cafe-wall.jpg'), imageAlt: 'The café counter with a wooden wall, an espresso machine and shelves of cups',
              badgeNumber: '10', badgeLabel: 'years of coffee',
              founderPhoto: av(4), founderPhotoAlt: 'Ana Moreno, co-founder', founder: 'Ana Moreno', founderRole: 'Co-founder and head roaster',
              quote: '“Good coffee is a small thing that should never feel rushed.”',
              primaryLabel: 'Order online', primaryUrl: '#menu', secondaryLabel: 'Visit us', secondaryUrl: '#visit',
              orgName: 'Bean & Bloom', foundedYear: '2016',
            },
            lists: {
              facts: [{ number: '4', label: 'partner farms' }, { number: '9', label: 'people on the team' }, { number: '4.9', label: 'average review' }],
              values: [
                { icon: 'leaf', title: 'Sourced with care', text: 'We know the farmers by name and pay above Fair Trade prices for the beans we roast.' },
                { icon: 'heart', title: 'Baked fresh', text: 'Everything in the cabinet is made in our kitchen that morning and sold the same day.' },
                { icon: 'users', title: 'A place for everyone', text: 'Dogs, laptops, prams and long conversations are all welcome at our tables.' },
              ],
            },
          }],
          ['team-grid', { fields: { eyebrow: 'The team', heading: 'The people *behind the counter*', lead: 'A small team that roasts, bakes and pours every day.' }, lists: { members: [
            { photo: av(4), name: 'Ana Moreno', role: 'Co-founder, head roaster', bio: 'Roasts every Tuesday and tastes every batch.' },
            { photo: av(7), name: 'Leo Fischer', role: 'Co-founder, front of house', bio: 'Runs the floor and the weekend brunch.' },
            { photo: av(2), name: 'Nora Bell', role: 'Head baker', bio: 'In at 4 am for the croissants.' },
            { photo: av(8), name: 'Sam Ortiz', role: 'Lead barista', bio: 'Three-time regional latte art champion.' },
          ] } }],
        ],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Opening Hours, Address and Map | Bean & Bloom Portland',
        description: 'Find Bean & Bloom at 218 Alder Street, Portland: opening hours with a live open-now badge, a map, directions and answers about dogs, wifi and allergens.',
        sections: [
          HOURS({ heading: 'Find *the café*' }),
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Dogs, wifi and *allergens*', lead: 'A few things people ask before they visit.', contactText: 'Still have a question?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, toggles: {}, lists: { faqs: [
            { q: 'Are dogs welcome?', a: 'Yes. Well-behaved dogs are welcome inside and on the patio, and there is a water bowl by the door.' },
            { q: 'Is there wifi, and can I work here?', a: 'Free wifi and plenty of sockets. Laptops are welcome all day, with a request to share the big table at busy times.' },
            { q: 'Do you have plant milks and gluten-free options?', a: 'Oat, soy and almond milk are free of charge. Several pastries are gluten free or vegan, marked on the menu, and the team can answer allergen questions.' },
            { q: 'How does ordering ahead work?', a: 'Add items to your order, check out and tell us a pickup time. Your drink is made when you arrive, and the order waits on the counter.' },
            { q: 'Can I book for a group?', a: 'For groups of eight or more email us a week ahead and we will reserve tables and prepare a pastry platter.' },
          ] } }],
        ],
      },
      {
        name: 'Cart', slug: 'cart',
        title: 'Your Order: Review Items and Choose Pickup | Bean & Bloom',
        description: 'Review the drinks and bakes in your Bean & Bloom order, change quantities, add a promo code and see your total before you check out. Free delivery over $25.',
        sections: [['cart-page', { fields: {
          eyebrow: 'Your order', heading: 'Your order', emptyTitle: 'Your order is empty', emptyText: 'Browse the menu and add a coffee or something sweet.', continueText: 'Back to the menu',
          note: 'Taxes included. Pay at pickup or online.', promoCodes: 'COFFEE10 | 10\nWELCOME | 15', freeMore: 'You are {amount} away from free delivery', freeDone: 'You have free delivery!',
          shippingLabel: 'Delivery (optional)', continueUrl: '#menu', checkoutUrl: '#checkout', freeOver: '25', shipFlat: '3',
        } }], STRIP('You might also *like*', 'Add a treat', PICK([6, 7, 9, 10]))],
      },
      {
        name: 'Checkout', slug: 'checkout',
        title: 'Checkout: Pickup or Delivery, Your Order | Bean & Bloom',
        description: 'Check out at Bean & Bloom: add your details, choose pickup or delivery and a payment option, then place your order in one step. Fast, secure and simple to use.',
        sections: [['checkout-page', {
          fields: {
            eyebrow: 'Order ahead', heading: 'Checkout', addressTitle: 'Your details', shippingTitle: 'Pickup or delivery', shippingLabel: 'Delivery',
            noteLabel: 'Pickup time or order note (optional)', submitMode: 'whatsapp', whatsapp: '15035550142', orderPrefix: 'BB',
            termsText: 'I agree to the order terms and have checked the allergen information.', emptyText: 'Your order is empty, so there is nothing to check out yet.',
            emptyLinkText: 'Back to the menu', thankYouUrl: '#thank-you', emptyLinkUrl: '#menu', freeOver: '25', shipFlat: '3',
          },
          lists: {
            methods: [
              { label: 'Pick up at the counter', note: 'Ready in about 10 minutes', cost: '0' },
              { label: 'Local delivery', note: 'Within 3 km, about 30 minutes', cost: '3' },
            ],
            payments: [
              { label: 'Pay at pickup', note: 'Cash or card when you collect' },
              { label: 'Pay online', note: 'Card or wallet, on the next page' },
            ],
          },
        }]],
      },
      {
        name: 'Thank you', slug: 'thank-you',
        title: 'Thank You: Your Bean & Bloom Order Is Confirmed Today',
        description: 'Thank you for your Bean & Bloom order. See your order number, your items and what happens next, then order again, treat yourself or view your past orders.',
        sections: [['order-confirmation', { fields: {
          subtitle: 'We have received your order {order}. We will confirm your pickup or delivery time at {email}.', addressLabel: 'Delivering to', methodLabel: 'Pickup or delivery',
          continueText: 'Back to the menu', noneText: 'If you just placed an order, check your email. Otherwise browse the menu below.', continueUrl: '#menu', ordersUrl: '#orders',
        } }], STRIP('While you wait, *treat yourself*', 'Add to your next order')],
      },
      {
        name: 'Orders', slug: 'orders',
        title: 'My Orders: Order History and Order Again | Bean & Bloom',
        description: 'See your past Bean & Bloom orders with dates, items and totals, and order the same drinks again in one click. Your orders are saved on this device, not online.',
        sections: [['order-history', { fields: { cartUrl: '#cart', shopText: 'Start an order', shopUrl: '#menu', trackText: '' } }]],
      },
    ],
  },
];
