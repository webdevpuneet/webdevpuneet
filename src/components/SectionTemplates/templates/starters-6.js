/* Website templates, part 6: the Online Store (a complete shop). Same shape as starters.js: home `sections`, hand-written
   `pages` for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js.
   SEO text: seo-website-templates-6.js.

   Every internal link is a "#page" token ('#shop', '#cart', '#checkout' …). In the multi-page site fixSiteLinks() turns a
   token into that page's file when a page with the slug exists, and `multiLinks` handles the filtered shop links
   ('#shop-audio' -> shop.html?cat=Audio). The header is the Link Columns mega menu and the cart drawer sits last, so both are
   shared by every page. The cart, wishlist and orders live in the visitor's browser (see BEHAVIORS.cartcore). */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);

const HEADER = ['mega-menu-columns', {
  fields: {
    logoText: 'Sona', logoIcon: 'headphones', logoUrl: '#',
    topText: 'Free delivery on orders over $150 · 30-day returns', topLinks: 'My orders | #orders\nWishlist | #wishlist\nHelp | #help',
    searchUrl: '#shop', searchPlaceholder: 'Search headphones, lamps, rugs', accountUrl: '#orders', accountLabel: 'My orders',
    wishlistUrl: '#wishlist', cartUrl: '#cart', cartCount: '0', navLabel: 'Shop',
  },
  lists: {
    items: [
      {
        label: 'Shop', url: '#shop',
        col1Title: 'Audio', col1Links: 'Headphones | #shop-headphones\nEarbuds | #shop-earbuds\nSpeakers | #shop-speakers\nAll audio | #shop-audio',
        col2Title: 'Home', col2Links: 'Living | #shop-living\nLighting | #shop-lighting\nStorage | #shop-storage',
        col3Title: 'Collections', col3Links: 'New in | #shop-new\nOn sale | #shop-sale\nBest rated | #shop-rated\nIn stock | #shop-instock',
        promoImage: IMG('product-headphones.png'), promoTag: 'New in', promoTitle: 'The Quiet Collection', promoText: 'Noise-cancelling headphones in three finishes.', promoLink: 'Shop headphones', promoUrl: '#product',
      },
      {
        label: 'Gifts', url: '#shop',
        col1Title: 'Gifts for listeners', col1Links: 'Earbuds | #shop-earbuds\nPocket speakers | #shop-speakers\nUnder $100 | #shop-under100',
        col2Title: 'Gifts for the home', col2Links: 'Lamps | #shop-lighting\nThrows and rugs | #shop-living\nShelves | #shop-storage',
        col3Title: '', col3Links: '',
        promoImage: IMG('room-2.jpg'), promoTag: 'Gift guide', promoTitle: 'Gifts they will keep', promoText: 'Hand-picked ideas for every budget.', promoLink: 'See the guide', promoUrl: '#shop-under100',
      },
      { label: 'New in', url: '#shop-new', col1Links: '' },
      { label: 'Sale', url: '#shop-sale', col1Links: '' },
      { label: 'Help', url: '#help', col1Links: '' },
    ],
  },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('tpl-product.jpg'), eyebrow: 'New season · Sona Home',
    headline: 'Sound and home pieces, *made to last*',
    lead: 'Headphones, speakers and calm home essentials, designed in small batches and shipped free over $150.',
    cta1: 'Shop all', cta1Url: '#shop', cta2: 'New in', cta2Url: '#shop-new',
    s1Value: '4.8 ★', s1Label: 'from 3,200 reviews', s2Value: '30 days', s2Label: 'free returns', s3Value: '$150', s3Label: 'free delivery over',
  },
}];

const WHY = ['features-icon-grid', {
  fields: { eyebrow: 'Why Sona', heading: 'Shopping that feels *easy*', lead: 'The things that matter when you buy online, done properly.' },
  lists: { features: [
    { icon: 'truck', title: 'Free delivery over $150', text: 'Orders ship within one working day and arrive in 2 to 5 days.', link: '', url: '#' },
    { icon: 'refresh-cw', title: '30-day free returns', text: 'Not right for you? Send it back for a full refund, no questions.', link: '', url: '#' },
    { icon: 'shield-check', title: 'Two-year warranty', text: 'Every audio product is covered against defects for two years.', link: '', url: '#' },
    { icon: 'credit-card', title: 'Pay your way', text: 'Pay online, on delivery or by message, whichever suits you.', link: '', url: '#' },
  ] },
}];

/* A product strip: its own heading each time it is used */
const STRIP = (heading, eyebrow = 'Recommended') => ['product-strip', { fields: { eyebrow, heading, allLink: 'Shop all', allUrl: '#shop' } }];
const strip = STRIP('Best *sellers*', 'Popular right now');

const BANNER = ['cta-gradient-banner', {
  fields: { heading: 'Give the gift of *good sound*', lead: 'Digital gift cards from $10, delivered by email in seconds.', cta1: 'Shop gifts', cta1Url: '#shop', cta2: 'Delivery and returns', cta2Url: '#help', note: 'Free returns on every order for 30 days.' },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *3,200 listeners*', lead: '' },
  lists: { quotes: [
    { quote: 'I wore them on a 14-hour flight and only took them off to eat. The noise cancelling is unreal.', name: 'Hannah L.', role: 'Verified buyer', avatar: av(2) },
    { quote: 'Delivery took two days and the lamp is even nicer in person. Checkout took a minute.', name: 'Marcus T.', role: 'Verified buyer', avatar: av(3) },
    { quote: 'Returned the wrong size with no fuss and had my refund within a week.', name: 'Ines R.', role: 'Verified buyer', avatar: av(5) },
  ] },
}];

const NEWSLETTER = ['cta-newsletter', { fields: { heading: 'Get *10% off* your first order', lead: 'New arrivals, restocks and the odd sale, once or twice a month.', proof: '12,000 subscribers', button: 'Subscribe', note: 'Unsubscribe any time.' } }];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Sona', logoIcon: 'headphones', tagline: 'Headphones, speakers and calm home pieces, designed to last.', copyright: '© 2026 Sona Home. All rights reserved.', legal: 'Privacy | /privacy/\nReturns | #help\nDelivery | #help' },
  lists: { columns: [
    { title: 'Shop', links: 'Headphones | #shop-headphones\nEarbuds | #shop-earbuds\nSpeakers | #shop-speakers\nHome | #shop-living' },
    { title: 'Account', links: 'My orders | #orders\nWishlist | #wishlist\nCart | #cart\nCheckout | #checkout' },
    { title: 'Help', links: 'Delivery | #help\nReturns | #help\nPayment | #help\nContact | #help' },
  ] },
}];

const DRAWER = ['cart-drawer', { fields: { continueUrl: '#shop', checkoutUrl: '#checkout', cartUrl: '#cart', freeOver: '150', shipFlat: '9' } }];

export const ONLINE_STORE_WEBSITE_TEMPLATES = [
  {
    id: 'online-store', name: 'Online Store Website (Full Shop)', industry: 'Retail',
    blurb: 'A complete working shop: mega menu, shop page with filters, product page, cart, checkout, order confirmation, order history and wishlist.',
    theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Online Store Website Template — Free Ecommerce Shop HTML',
    seoDescription: 'Free ecommerce website template: mega menu, shop page with filters, product page, cart drawer, checkout, order history and wishlist. Export clean HTML.',
    keywords: ['online store website template', 'ecommerce website template', 'free shop html template', 'ecommerce template with cart and checkout', 'mega menu store template', 'online shop template html css'],
    intro: 'A complete small online shop in one template. A store header with search and a mega menu leads into a shop page with filters and sorting, a product page with a zoomable gallery, colour and size options and a sticky buy bar, a slide-in cart drawer and a cart page with a promo code, a checkout that sends the order to your form, WhatsApp or payment link, a thank-you page, an order history and a wishlist. The cart works in the browser with no server.',
    bestFor: ['Small shops without a payment backend', 'Merchandise, prints and handmade products', 'Shops that take orders by message or payment link'],
    sections: [HEADER, HERO, WHY, strip, BANNER, REVIEWS, NEWSLETTER, FOOTER, DRAWER],
    multiLinks: {
      '#shop-audio': 'shop.html?cat=Audio', '#shop-living': 'shop.html?cat=Living', '#shop-lighting': 'shop.html?cat=Lighting', '#shop-storage': 'shop.html?cat=Storage',
      '#shop-headphones': 'shop.html?q=headphones', '#shop-earbuds': 'shop.html?q=buds', '#shop-speakers': 'shop.html?q=speaker',
      '#shop-new': 'shop.html?sort=newest', '#shop-sale': 'shop.html?sale=1', '#shop-rated': 'shop.html?sort=rating', '#shop-instock': 'shop.html?instock=1', '#shop-under100': 'shop.html?max=100',
    },
    homeTitle: 'Sona Home: Headphones, Speakers and Calm Home Pieces',
    homeDescription: 'Sona Home sells headphones, speakers and calm home pieces designed to last, with free delivery over $150 and 30-day free returns. Shop the new collection.',
    pages: [
      {
        name: 'Shop', slug: 'shop',
        title: 'Shop All Products: Headphones, Speakers and Home | Sona',
        description: 'Browse every Sona product and filter by category, price, colour and rating. Headphones, earbuds, speakers, lamps, rugs and shelves with free returns.',
        sections: [['product-listing', { fields: { eyebrow: 'Shop', heading: 'All *products*' } }]],
      },
      {
        name: 'Product', slug: 'product',
        title: 'Sona One Wireless Headphones: Noise Cancelling | Sona',
        description: 'Sona One wireless headphones with adaptive noise cancelling, a 40-hour battery and three colours. Free returns for 30 days and a two-year warranty.',
        sections: [
          ['product-detail', { fields: { cartUrl: '#cart', buyUrl: '#checkout', addUrl: '#', reviewsUrl: '#reviews' } }],
          STRIP('Customers also *bought*', 'Often paired'),
          ['reviews-summary', { anchor: 'reviews', fields: { eyebrow: 'Reviews', heading: 'What listeners *say*', itemName: 'Sona One wireless headphones', itemType: 'Product', writeLabel: '' } }],
          STRIP('You might also *like*'),
        ],
      },
      {
        name: 'Cart', slug: 'cart',
        title: 'Your Cart: Review Your Order and Apply a Promo Code | Sona',
        description: 'Review the items in your Sona cart, change quantities, add a promo code and see your shipping before you check out. Free delivery over $150.',
        sections: [['cart-page', { fields: { continueUrl: '#shop', checkoutUrl: '#checkout' } }], STRIP('You might also *like*')],
      },
      {
        name: 'Checkout', slug: 'checkout',
        title: 'Checkout: Delivery, Payment and Your Order Summary | Sona',
        description: 'Check out at Sona: add your delivery details, pick a shipping method and payment option, and place your order in one step. Secure and simple.',
        sections: [['checkout-page', { fields: { thankYouUrl: '#thank-you', emptyLinkUrl: '#shop' } }]],
      },
      {
        name: 'Thank you', slug: 'thank-you',
        title: 'Thank You: Your Sona Order Is Confirmed | Sona',
        description: 'Thank you for your Sona order. See your order number, items, delivery details and what happens next, then keep shopping or view your orders.',
        sections: [['order-confirmation', { fields: { continueUrl: '#shop', ordersUrl: '#orders' } }], STRIP('While you wait, *you might like*')],
      },
      {
        name: 'Orders', slug: 'orders',
        title: 'My Orders: Order History and Order Again | Sona',
        description: 'See your past Sona orders with dates, items, totals and delivery details, and order the same items again in one click. Orders are saved on this device.',
        sections: [['order-history', { fields: { cartUrl: '#cart', shopUrl: '#shop', trackText: '' } }]],
      },
      {
        name: 'Wishlist', slug: 'wishlist',
        title: 'Your Wishlist: Saved Products | Sona',
        description: 'Your saved Sona products in one place. Add them to your cart when you are ready, or keep them for later. The wishlist is saved on this device.',
        sections: [['wishlist-page', { fields: { cartUrl: '#cart', shopUrl: '#shop' } }], STRIP('You might also *like*')],
      },
      {
        name: 'Help', slug: 'help',
        title: 'Help: Delivery, Returns and Payment Questions | Sona',
        description: 'Answers about Sona delivery times, free returns, warranty and payment options, with a contact form if you need to reach a real person.',
        sections: [
          ['faq-accordion', { fields: { eyebrow: 'Help centre', heading: 'Delivery, returns and *payment*', lead: 'The questions we hear most.', contactText: 'Still need help?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'How fast is delivery?', a: 'Orders placed before 3 pm ship the same working day. Delivery takes 2 to 5 working days, and it is free over $150.' },
            { q: 'Can I return something?', a: 'Yes. Send it back within 30 days for a full refund, even if you have used it. Returns are free.' },
            { q: 'How can I pay?', a: 'Pay online by card or wallet, pay on delivery, or place the order by message and pay when we confirm it.' },
            { q: 'Where can I see my orders?', a: 'Open My orders from the header. Orders placed on this device are listed there, and you can order the same items again in one click.' },
            { q: 'What does the warranty cover?', a: 'Two years against defects on every audio product. We repair or replace it and pay for shipping both ways.' },
          ] } }],
          ['contact-split-form'],
        ],
      },
    ],
  },
];
