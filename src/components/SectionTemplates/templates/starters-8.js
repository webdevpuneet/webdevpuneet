/* Website templates, part 8: the Fashion Boutique (a clothing store with a lookbook). Same shape as starters-6.js / starters-7.js:
   home `sections`, hand-written `pages` for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in
   starters.js. SEO text: seo-website-templates-8.js.

   It reuses the ecommerce kit (mega menu header, product listing, product detail, cart drawer, cart, checkout, thank you, orders,
   wishlist) and uses two sections made for it: Collection Tiles (collection-tiles.js) and Shop the Look (shop-the-look.js, hotspots
   that add to the same cart). Photos are fashion-*.jpg in public/images/section-templates (royalty-free Pexels photos, resized and
   compressed). Every internal link is a "#page" token, resolved by fixSiteLinks() like starters-6.js. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);

/* The catalogue: [name, category, price, oldPrice, colours, badge, rating, reviews, date, file, alt] */
const P = (name, category, price, oldPrice, colours, badge, rating, reviews, date, file, alt) => ({
  image: IMG(file), imageAlt: alt, name, category, price, oldPrice, colours, badge, rating, reviews, date, stock: 'in', button: 'Add to bag', url: '#product',
});
const CATALOGUE = [
  P('Ribbed knit midi dress', 'Women', '$89', '', 'Mustard, Black, Ivory', 'Bestseller', '4.9', '842', '2026-09-10', 'fashion-knit-dress.jpg', 'A woman in a mustard ribbed knit midi dress sitting on steps'),
  P('Polka dot tie blouse', 'Women', '$64', '', 'Navy, Ivory', 'New', '4.8', '126', '2026-11-05', 'fashion-polka-blouse.jpg', 'A woman in a navy polka dot blouse with a tie neck'),
  P('Lace puff-sleeve blouse', 'Women', '$72', '', 'Ivory', '', '4.7', '208', '2026-08-22', 'fashion-lace-blouse.jpg', 'A white lace blouse with puffed sleeves against a yellow wall'),
  P('Cream wrap cardigan', 'Women', '$98', '', 'Cream, Oat', '', '4.8', '315', '2026-10-01', 'fashion-cardigan.jpg', 'A woman in a cream wrap cardigan and brown trousers'),
  P('Rose knit sweater', 'Women', '$79', '', 'Rose, Grey', 'New', '4.7', '94', '2026-11-08', 'fashion-rose-sweater.jpg', 'A pink knit sweater with embroidered roses and a plaid skirt'),
  P('Burgundy wool coat', 'Women', '$240', '$300', 'Burgundy, Black', '-20%', '4.9', '421', '2026-09-28', 'fashion-burgundy-coat.jpg', 'A woman in a burgundy wool coat carrying shopping bags'),
  P('Black funnel-neck coat', 'Women', '$210', '', 'Black', '', '4.8', '167', '2026-10-12', 'fashion-black-coat.jpg', 'A woman in a black funnel-neck coat against a dark background'),
  P('Denim trucker jacket', 'Women', '$98', '', 'Light wash', '', '4.6', '233', '2026-07-14', 'fashion-denim-jacket.jpg', 'A woman laughing in a denim jacket and mustard top against a yellow wall'),
  P('Mustard hoodie', 'Men', '$68', '', 'Mustard, Charcoal', 'Bestseller', '4.8', '512', '2026-09-05', 'fashion-hoodie.jpg', 'A man in a mustard hoodie in front of a glass building'),
  P('Graphic cotton tee', 'Men', '$34', '', 'Grey', '', '4.5', '188', '2026-06-20', 'fashion-graphic-tee.jpg', 'A smiling woman in a grey graphic t-shirt and jeans'),
  P('Heavy cotton tee, white', 'Men', '$28', '', 'White, Black', '', '4.7', '640', '2026-05-18', 'fashion-white-tee.jpg', 'A white cotton t-shirt hanging in a bright room with a plant'),
  P('Washed trucker jacket', 'Men', '$110', '', 'Mid wash', '', '4.7', '277', '2026-08-02', 'fashion-trucker.jpg', 'A man in a washed denim jacket over a white t-shirt'),
  P('Merino V-neck jumper', 'Men', '$76', '', 'Blue, Grey', '', '4.8', '143', '2026-10-20', 'fashion-vneck.jpg', 'A man in a blue merino V-neck jumper'),
  P('Leather oxford shoes', 'Shoes', '$145', '', 'Tan', '', '4.8', '198', '2026-04-11', 'fashion-oxford.jpg', 'Tan leather oxford shoes beside folded polka dot shirts'),
  P('Suede driving loafers', 'Shoes', '$120', '', 'Blue, Red', 'New', '4.6', '77', '2026-11-01', 'fashion-loafers.jpg', 'Blue and red suede driving loafers with a metal bar'),
  P('Retro high-top sneakers', 'Shoes', '$110', '', 'Grey', '', '4.7', '356', '2026-07-30', 'fashion-sneakers.jpg', 'A pair of grey and orange retro high-top sneakers'),
  P('Lightweight trainers', 'Shoes', '$98', '$120', 'White, Grey', '-18%', '4.5', '412', '2026-03-09', 'fashion-runners.jpg', 'A pair of light grey trainers with a yellow detail'),
  P('Weekend essentials set', 'Accessories', '$120', '$150', 'Tan', 'Set', '4.9', '88', '2026-10-25', 'fashion-flatlay.jpg', 'A flat lay with a leather bag, belt, scarf, sunglasses and watch'),
];
/* a strip's products, picked by index into the catalogue */
const PICK = idx => idx.map(i => {
  const m = CATALOGUE[i];
  return { image: m.image, imageAlt: m.imageAlt, badge: m.badge, name: m.name, price: m.price, oldPrice: m.oldPrice, rating: m.rating, button: 'Add to bag', url: '#product' };
});
const NEW_IN = PICK([1, 4, 14, 0, 5, 12]);
const COMPLETE = PICK([2, 3, 7, 13, 17]);

const HEADER = ['mega-menu-columns', {
  fields: {
    logoText: 'Ora Studio', logoIcon: 'sparkles', logoUrl: '#',
    topText: 'Free delivery over $100 · Free returns for 30 days', topLinks: 'My orders | #orders\nWishlist | #wishlist\nSize and delivery | #help',
    searchUrl: '#shop', searchPlaceholder: 'Search dresses, coats, sneakers', accountUrl: '#orders', accountLabel: 'My orders',
    wishlistUrl: '#wishlist', cartUrl: '#cart', cartCount: '0', navLabel: 'Shop',
  },
  lists: {
    items: [
      {
        label: 'Women', url: '#shop-women',
        col1Title: 'Clothing', col1Links: 'Dresses | #shop-dresses\nBlouses | #shop-blouses\nCoats | #shop-coats\nJackets | #shop-jackets',
        col2Title: 'Shop by', col2Links: 'New in | #shop-new\nSale | #shop-sale\nAll women | #shop-women',
        col3Title: '', col3Links: '',
        promoImage: IMG('fashion-burgundy-coat.jpg'), promoTag: 'Winter edit', promoTitle: 'The wool coat', promoText: 'Burgundy, 20% off this month.', promoLink: 'Shop coats', promoUrl: '#shop-coats',
      },
      {
        label: 'Men', url: '#shop-men',
        col1Title: 'Clothing', col1Links: 'Hoodies and knits | #shop-hoodies\nT-shirts | #shop-tees\nJackets | #shop-jackets\nAll men | #shop-men',
        col2Title: 'Shop by', col2Links: 'New in | #shop-new\nSale | #shop-sale',
        col3Title: '', col3Links: '',
        promoImage: IMG('fashion-hoodie.jpg'), promoTag: 'Bestseller', promoTitle: 'The mustard hoodie', promoText: 'Heavyweight cotton, made in small runs.', promoLink: 'Shop hoodies', promoUrl: '#shop-hoodies',
      },
      {
        label: 'Shoes', url: '#shop-shoes',
        col1Title: 'Shoes', col1Links: 'Sneakers | #shop-sneakers\nLoafers and oxfords | #shop-shoes\nAll shoes | #shop-shoes',
        col2Title: 'Accessories', col2Links: 'Bags and sets | #shop-accessories',
        col3Title: '', col3Links: '',
        promoImage: IMG('fashion-loafers.jpg'), promoTag: 'New', promoTitle: 'Suede driving loafers', promoText: 'A soft sole and a metal bar detail.', promoLink: 'Shop shoes', promoUrl: '#shop-shoes',
      },
      { label: 'New in', url: '#shop-new', col1Links: '' },
      { label: 'Sale', url: '#shop-sale', col1Links: '' },
    ],
  },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('fashion-hero.jpg'), eyebrow: 'Autumn / Winter 26',
    headline: 'Clothes made *to be lived in*',
    lead: 'Considered pieces in natural fabrics, made in small runs and meant to last. Free returns for 30 days.',
    cta1: 'Shop new in', cta1Url: '#shop-new', cta2: 'Shop the look', cta2Url: '#look',
    s1Value: '4.8 ★', s1Label: 'from 2,100 reviews', s2Value: '30 days', s2Label: 'free returns', s3Value: '$100', s3Label: 'free delivery over',
  },
}];

const COLLECTIONS = ['collection-tiles', {
  anchor: 'collections',
  fields: { eyebrow: 'Collections', heading: 'Shop by *collection*', lead: '' },
  lists: { tiles: [
    { image: IMG('fashion-cardigan.jpg'), imageAlt: 'A woman in a cream wrap cardigan', title: 'Women', text: '8 new pieces', url: '#shop-women' },
    { image: IMG('fashion-hoodie.jpg'), imageAlt: 'A man in a mustard hoodie', title: 'Men', text: '5 new pieces', url: '#shop-men' },
    { image: IMG('fashion-loafers.jpg'), imageAlt: 'Blue and red suede loafers', title: 'Shoes', text: '4 pairs', url: '#shop-shoes' },
    { image: IMG('fashion-flatlay.jpg'), imageAlt: 'A flat lay of a bag, belt, scarf and sunglasses', title: 'Accessories', text: 'Sets and bags', url: '#shop-accessories' },
  ] },
}];

/* A product strip; its own heading each time it is used (the products are always the catalogue) */
const STRIP = (heading, eyebrow = 'New in', products = NEW_IN, anchor) => ['product-strip', {
  ...(anchor && { anchor }),
  fields: { eyebrow, heading, allLink: 'Shop all', allUrl: '#shop' },
  lists: { products },
}];

const LOOK = ['shop-the-look', {
  anchor: 'look',
  fields: {
    eyebrow: 'The lookbook', heading: 'Shop the *weekend look*',
    lead: 'Tap a dot to see the piece, its price and add it to your bag. Everything in the photo is in stock now.',
    image: IMG('fashion-look.jpg'), imageAlt: 'A man in a washed denim jacket and white t-shirt standing by a grey hillside',
    ctaLabel: 'Shop jackets', ctaUrl: '#shop-jackets',
  },
  lists: { spots: [
    { x: '47', y: '33', image: IMG('fashion-trucker.jpg'), imageAlt: 'A washed denim trucker jacket', name: 'Washed trucker jacket', price: '$110', button: 'Add to bag', url: '#product' },
    { x: '52', y: '70', image: IMG('fashion-white-tee.jpg'), imageAlt: 'A white cotton t-shirt on a hanger', name: 'Heavy cotton tee, white', price: '$28', button: 'Add to bag', url: '#product' },
  ] },
}];

const CRAFT = ['features-split-image', {
  fields: {
    eyebrow: 'Slow fashion', heading: 'Fewer pieces, *made properly*',
    lead: 'We make small runs in natural fabrics and stop when a piece sells out. Fewer clothes, better cut, and a repair service for the years after.',
    cta: 'Our story', ctaUrl: '#about',
    image: IMG('fashion-vintage.jpg'), imageAlt: 'A rail of colourful printed shirts in a vintage clothes shop',
  },
  lists: { points: [
    { icon: 'leaf', title: 'Natural fabrics', text: 'Cotton, wool, linen and Tencel, with recycled fibres where it makes sense.' },
    { icon: 'heart', title: 'Made to last', text: 'Reinforced seams and fabrics tested for 50 washes before a piece goes on sale.' },
    { icon: 'refresh-cw', title: 'Free repairs', text: 'Send a piece back within two years and we mend or replace it for free.' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *2,100 customers*', lead: '' },
  lists: { quotes: [
    { quote: 'The knit dress is the softest thing I own and it still looks new after a winter of wear. The fit is spot on.', name: 'Camille D.', role: 'Verified buyer', avatar: av(2) },
    { quote: 'Sizing guide was right, delivery took two days, and the jacket is even better in person. Easy return policy too.', name: 'Jonas P.', role: 'Verified buyer', avatar: av(3) },
    { quote: 'I bought the coat in the sale and get compliments every time I wear it. The quality is far above the price.', name: 'Aisha K.', role: 'Verified buyer', avatar: av(5) },
  ] },
}];

const NEWSLETTER = ['cta-newsletter', { fields: { heading: 'Get *10% off* your first order', lead: 'New drops, restocks and private sales, once or twice a month.', proof: '18,000 subscribers', button: 'Subscribe', note: 'Unsubscribe any time.' } }];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Ora Studio', logoIcon: 'sparkles', tagline: 'Considered clothes in natural fabrics, made in small runs.', copyright: '© 2026 Ora Studio. All rights reserved.', legal: 'Privacy | /privacy/\nReturns | #help\nSize guide | #help' },
  lists: {
    columns: [
      { title: 'Shop', links: 'Women | #shop-women\nMen | #shop-men\nShoes | #shop-shoes\nAccessories | #shop-accessories' },
      { title: 'Account', links: 'My orders | #orders\nWishlist | #wishlist\nCart | #cart\nCheckout | #checkout' },
      { title: 'Help', links: 'Size guide | #help\nDelivery | #help\nReturns | #help\nOur story | #about' },
    ],
    socials: [
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'mail', label: 'Email us', url: 'mailto:hello@webdevpuneet.com' },
    ],
  },
}];

const DRAWER = ['cart-drawer', { fields: {
  title: 'Your bag', emptyTitle: 'Your bag is empty', emptyText: 'Find something you love and it will appear here.', continueText: 'Continue shopping',
  continueUrl: '#shop', checkoutUrl: '#checkout', cartUrl: '#cart', freeOver: '100', shipFlat: '6',
} }];

export const FASHION_WEBSITE_TEMPLATES = [
  {
    id: 'fashion', name: 'Fashion Boutique Website (Online Store)', industry: 'Retail',
    blurb: 'A clothing store with a lookbook: collection tiles, shop the look hotspots, shop filters, product page with sizes, cart and checkout.',
    theme: { brand: '#1a1a1a', brandText: '#ffffff', bg: '#f7f3ec', surface: '#efe9df', text: '#1a1a1a', muted: '#5f5a52', radius: '6', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Fashion Website Template — Free Boutique Store HTML',
    seoDescription: 'Free fashion boutique website template: collection tiles, shop the look hotspots, shop filters, product page with sizes, cart and checkout. Export clean HTML.',
    keywords: ['fashion website template', 'boutique website template', 'clothing store website template', 'fashion ecommerce template html', 'shop the look template', 'lookbook website template'],
    intro: 'A clean, editorial website for a clothing brand or boutique. A store header with search, wishlist, cart and a mega menu leads into a full-width hero, collection tiles, a strip of new arrivals, and a Shop the Look lookbook whose dots open a product card that adds straight to the bag. The shop page filters by category, size, colour, price and rating, the product page has sizes, colours and a sticky buy bar, and the order runs through a bag drawer, checkout and thank you page.',
    bestFor: ['Fashion brands and boutiques', 'Small clothing labels selling online', 'Vintage and made-to-order shops'],
    sections: [HEADER, HERO, COLLECTIONS, STRIP('Fresh *arrivals*', 'New in', NEW_IN, 'shop'), LOOK, CRAFT, REVIEWS, NEWSLETTER, FOOTER, DRAWER],
    multiLinks: {
      '#shop-women': 'shop.html?cat=Women', '#shop-men': 'shop.html?cat=Men', '#shop-shoes': 'shop.html?cat=Shoes', '#shop-accessories': 'shop.html?cat=Accessories',
      '#shop-new': 'shop.html?sort=newest', '#shop-sale': 'shop.html?sale=1',
      '#shop-dresses': 'shop.html?q=dress', '#shop-blouses': 'shop.html?q=blouse', '#shop-coats': 'shop.html?q=coat', '#shop-jackets': 'shop.html?q=jacket',
      '#shop-hoodies': 'shop.html?q=hoodie', '#shop-tees': 'shop.html?q=tee', '#shop-sneakers': 'shop.html?q=sneakers', '#look': 'index.html#look',
    },
    homeTitle: 'Ora Studio: Considered Clothes Made From Natural Fabrics',
    homeDescription: 'Ora Studio makes considered clothes in natural fabrics, in small runs built to last, with free delivery over $100 and free 30-day returns. Shop new arrivals.',
    pages: [
      {
        name: 'Shop', slug: 'shop',
        title: 'Shop All Clothes: Dresses, Coats and Shoes | Ora Studio',
        description: 'Browse every Ora Studio piece and filter by category, colour, price and rating: dresses, blouses, coats, hoodies, shoes and accessories with free returns.',
        sections: [['product-listing', { fields: { eyebrow: 'Shop', heading: 'All *clothing*', lead: 'Considered pieces in natural fabrics. Filter by category, colour and price.' }, lists: { products: CATALOGUE } }]],
      },
      {
        name: 'Product', slug: 'product',
        title: 'Ribbed Knit Midi Dress in Mustard or Black | Ora Studio',
        description: 'A soft ribbed knit midi dress in mustard, black or ivory, sizes XS to XL. Free delivery over $100, free returns for 30 days and free repairs for two years.',
        sections: [
          ['product-detail', {
            fields: {
              eyebrow: 'Women · Dresses', name: 'Ribbed knit midi dress',
              description: 'A close-fitting midi dress in a soft cotton and wool rib that moves with you. Cut with a high neck and a slight flare below the knee, it works with boots in winter and sandals in summer.',
              price: '$89', oldPrice: '', saveText: '', badge: 'Bestseller', rating: '4.9', reviews: '842 reviews', reviewsUrl: '#reviews',
              sizeGuide: 'Size guide', sizeGuideUrl: '#help', addText: 'Add to bag', cartUrl: '#cart', buyText: 'Buy now', buyUrl: '#checkout', addUrl: '#',
              stock: 'In stock, ships today', delivery: 'Free delivery over $100 · free returns for 30 days',
            },
            toggles: { showSizes: true },
            lists: {
              images: [
                { image: IMG('fashion-knit-dress.jpg'), imageAlt: 'A woman in the mustard ribbed knit midi dress sitting on steps', colour: 'Mustard' },
                { image: IMG('fashion-knit-dress-2.jpg'), imageAlt: 'A closer view of the ribbed knit fabric and high neck', colour: '' },
              ],
              colours: [{ name: 'Mustard', swatch: '#c9971a' }, { name: 'Black', swatch: '#1a1a1a' }, { name: 'Ivory', swatch: '#efe6d6' }],
              sizes: [{ label: 'XS', status: '' }, { label: 'S', status: '' }, { label: 'M', status: '' }, { label: 'L', status: '' }, { label: 'XL', status: 'out' }],
              trust: [{ icon: 'refresh-cw', text: '30-day free returns' }, { icon: 'truck', text: 'Free delivery over $100' }, { icon: 'shield-check', text: 'Free repairs for two years' }],
              details: [
                { q: 'Description', a: 'A midi dress knitted in a soft 70% cotton, 30% merino rib. High neck, long sleeves and a gentle flare below the knee. The fabric is brushed on the inside for comfort.' },
                { q: 'Fit and sizing', a: 'True to size and close-fitting through the body. The model is 175 cm tall and wears size S. If you are between sizes, choose the larger one for a relaxed fit.' },
                { q: 'Care', a: 'Machine wash cold on a gentle cycle, or hand wash. Dry flat and do not tumble dry. Cool iron if needed.' },
                { q: 'Delivery and returns', a: 'Orders placed before 3 pm ship the same working day. Free returns within 30 days, and we repair or replace any piece for free for two years.' },
              ],
            },
          }],
          STRIP('Complete *the look*', 'Often paired', COMPLETE),
          ['reviews-summary', { anchor: 'reviews', fields: { eyebrow: 'Reviews', heading: 'What customers *say*', itemName: 'Ribbed knit midi dress', itemType: 'Product', writeLabel: '' } }],
          STRIP('You might also *like*', 'More from Ora', NEW_IN),
        ],
      },
      {
        name: 'Cart', slug: 'cart',
        title: 'Your Bag: Review Items and Apply a Promo Code | Ora Studio',
        description: 'Review the pieces in your Ora Studio bag, change quantities, add a promo code and see your delivery cost before you check out. Free delivery over $100.',
        sections: [['cart-page', { fields: { eyebrow: 'Your bag', heading: 'Your bag', emptyTitle: 'Your bag is empty', emptyText: 'Find something you love and it will appear here.', continueUrl: '#shop', checkoutUrl: '#checkout', freeOver: '100', shipFlat: '6' } }], STRIP('You might also *like*', 'Recommended', NEW_IN)],
      },
      {
        name: 'Checkout', slug: 'checkout',
        title: 'Checkout: Delivery, Payment and Your Order | Ora Studio',
        description: 'Check out at Ora Studio: add your delivery details, pick a shipping method and a payment option, then place your order in one step. Secure and simple.',
        sections: [['checkout-page', {
          fields: { thankYouUrl: '#thank-you', emptyLinkUrl: '#shop', emptyLinkText: 'Back to the shop', orderPrefix: 'OS', freeOver: '100', shipFlat: '6' },
          lists: {
            methods: [
              { label: 'Standard delivery', note: '3–5 working days', cost: '6' },
              { label: 'Express delivery', note: 'Next working day', cost: '14' },
            ],
            payments: [
              { label: 'Pay online', note: 'Card or wallet, on the next page' },
              { label: 'Pay on delivery', note: 'Cash or card to the courier' },
            ],
          },
        }]],
      },
      {
        name: 'Thank you', slug: 'thank-you',
        title: 'Thank You: Your Ora Studio Order Is Confirmed Today',
        description: 'Thank you for your Ora Studio order. See your order number, your items, delivery details and what happens next, then keep shopping or view your orders.',
        sections: [['order-confirmation', { fields: { continueUrl: '#shop', ordersUrl: '#orders' } }], STRIP('While you wait, *you might like*', 'New in', NEW_IN)],
      },
      {
        name: 'Orders', slug: 'orders',
        title: 'My Orders: Order History and Order Again | Ora Studio',
        description: 'See your past Ora Studio orders with dates, items, totals and delivery details, and order the same pieces again in one click. Orders are saved on this device.',
        sections: [['order-history', { fields: { cartUrl: '#cart', shopUrl: '#shop', trackText: '' } }]],
      },
      {
        name: 'Wishlist', slug: 'wishlist',
        title: 'Your Wishlist: Saved Clothes and Shoes | Ora Studio',
        description: 'Your saved Ora Studio pieces in one place. Add them to your bag when you are ready, or keep them for later. The wishlist is saved on this device only.',
        sections: [['wishlist-page', { fields: { cartUrl: '#cart', shopUrl: '#shop' } }], STRIP('You might also *like*', 'Recommended', NEW_IN)],
      },
      {
        name: 'Our story', slug: 'about',
        title: 'Our Story: Slow Fashion in Natural Fabrics | Ora Studio',
        description: 'The story of Ora Studio: why we make fewer, better clothes in natural fabrics, how we test every piece, and the free repair service for the years after.',
        sections: [
          ['about-story', {
            fields: {
              eyebrow: 'Our story', heading: 'Fewer clothes, *made properly*',
              story: 'Ora Studio started in 2019 with one question: why do so many clothes fall apart after a season? We began with a single dress, a small workshop and a promise to use fabrics that last.',
              story2: 'Today we make small runs of every piece, stop when it sells out, and repair anything for free for two years. Fewer clothes, better cut, kept for longer.',
              image: IMG('fashion-shelves.jpg'), imageAlt: 'Shelves of folded black and white clothes in a minimal shop',
              badgeNumber: '7', badgeLabel: 'years of slow fashion',
              founderPhoto: av(6), founderPhotoAlt: 'Lena Marques, founder', founder: 'Lena Marques', founderRole: 'Founder and designer',
              quote: '“Buy less, wear it more, and have someone mend it when it needs it.”',
              primaryLabel: 'Shop new in', primaryUrl: '#shop-new', secondaryLabel: 'Size and delivery', secondaryUrl: '#help',
              orgName: 'Ora Studio', foundedYear: '2019',
            },
            lists: {
              facts: [{ number: '50', label: 'wash tests per fabric' }, { number: '2 yrs', label: 'free repairs' }, { number: '4.8', label: 'average review' }],
              values: [
                { icon: 'leaf', title: 'Natural fabrics', text: 'Cotton, wool, linen and Tencel, with recycled fibres where they perform as well.' },
                { icon: 'award', title: 'Made in small runs', text: 'We make what we can sell, so there are no end-of-season mountains and no discount spirals.' },
                { icon: 'heart', title: 'Repaired, not replaced', text: 'Send a piece back and we mend or replace it for two years, with free postage both ways.' },
              ],
            },
          }],
        ],
      },
      {
        name: 'Help', slug: 'help',
        title: 'Size Guide, Delivery and Returns | Ora Studio Help',
        description: 'Answers about Ora Studio sizing, delivery times, free returns and repairs, with tips for choosing your size and a contact form if you need a real person.',
        sections: [
          ['faq-accordion', { fields: { eyebrow: 'Help centre', heading: 'Sizing, delivery and *returns*', lead: 'The questions we hear most.', contactText: 'Still need help?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'How do I choose my size?', a: 'Measure your bust, waist and hips and compare them with the chart on each product page. Our pieces are true to size; if you are between sizes, choose the larger one for a relaxed fit.' },
            { q: 'How fast is delivery?', a: 'Orders placed before 3 pm ship the same working day. Standard delivery takes 3 to 5 working days, express is next working day, and delivery is free over $100.' },
            { q: 'Can I return something?', a: 'Yes. Send it back within 30 days for a full refund, even if you have tried it on. Returns are free and the label is in the parcel.' },
            { q: 'What does the repair service cover?', a: 'Seams, zips, buttons and fabric faults for two years from purchase. Send the piece back and we mend or replace it and pay for postage both ways.' },
            { q: 'How should I wash my clothes?', a: 'Every product page has care notes. In general, wash cold on a gentle cycle, dry flat and avoid tumble drying, which keeps natural fibres soft and the shape true.' },
          ] } }],
          ['contact-split-form'],
        ],
      },
    ],
  },
];
