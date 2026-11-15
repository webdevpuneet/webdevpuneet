/* Hand-written SEO content for the website templates (part 8: Fashion Boutique). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_8 = {
  fashion: {
    about: `A fashion website has to do two things at once: look like a brand and work like a shop. This template gives you both. The home page opens with a store header (a top bar, a search field, wishlist and bag icons and a mega menu with a featured product), a full-width hero, four collection tiles, a strip of new arrivals, a Shop the Look lookbook, a short "slow fashion" story, customer reviews and a newsletter sign-up.

Shop the Look is the section that sets it apart. One styled photograph carries tappable dots on the garments; a tap opens a small card with the product photo, name, price and an Add to bag button that fills the same bag as the rest of the site. The collection tiles above it link into filtered views of the shop, so shoppers reach women's, men's, shoes or accessories in one tap.

The Shop page lists every piece with a search box, sorting and filters for category, colour, price, rating and sale items. The Product page has a gallery, colour swatches that switch the photo, size buttons with sold-out sizes, a quantity stepper, Add to bag and Buy now, a wishlist heart, trust badges, care and fit accordions, a sticky buy bar on phones and reviews. A slide-in bag drawer, a Cart page with a promo code, a Checkout page, a Thank you page, My orders and a Wishlist page complete the journey, and a Help page covers sizing, delivery and returns.

Ora Studio stores the bag, wishlist and order history in the shopper's browser, so the whole store is static files with no accounts and no database. What it does not do matters as much: no stock levels, no tax calculation and no order dashboard, and each order reaches you through a form service, a WhatsApp message or a payment link. For a few hundred products sold in one country that is enough; a big catalogue or cross-border tax rules call for a hosted shop platform behind this front end.

Product cards and the product page carry Product data with price and availability, every page has one clear heading, and the lookbook photo and collection tiles have written descriptions, which helps fashion photos turn up in image search.`,
    checklist: [
      'Photography that shows the clothes on real people, with a strong first image on the home page',
      'Collections that are one tap away, so shoppers reach the right range without searching',
      'Product pages with sizes, colours, fit notes and a clear returns promise next to the buy button',
      'A bag that opens without leaving the page and keeps its contents between pages',
      'A size guide and delivery answers that are one click from every page',
      'A reason to subscribe, such as a first-order discount or early access to drops',
    ],
    faqs: [
      { q: 'What is the Shop the Look section?', a: 'A lookbook photograph with tappable dots. Each dot opens a card with the product photo, name, price and an Add to bag button that adds the item to the shop bag, so a styled outfit can sell its pieces directly.' },
      { q: 'Can this template take payments?', a: 'Not on the page itself: card details are never collected here. An order can go to your inbox through a form service, open a WhatsApp chat with the order typed out, or move the shopper to a Stripe, PayPal or Razorpay payment link. Shops that want card checkout inside the site should use a hosted platform.' },
      { q: 'How do I add my own clothes?', a: 'Edit the product list on the Shop page, the Product page and the strips: photo, name, category, price, colours and links. The Shop filters build themselves from that list, so a new colour or category appears as a filter the moment a product uses it.' },
      { q: 'What pages does the multi-page store include?', a: 'Ten: Home, Shop, Product, Cart, Checkout, Thank you, Orders, Wishlist, Our story and Help. One header, footer and bag drawer are shared, and menu links such as shop.html?cat=Women open the shop already filtered.' },
      { q: 'Can I use it for shoes, jewellery or homeware?', a: 'Yes. Replace the products and photographs, rename the collections, and move the Shop the Look dots onto your own items. The filters, bag and checkout work for any physical product.' },
    ],
  },
};
