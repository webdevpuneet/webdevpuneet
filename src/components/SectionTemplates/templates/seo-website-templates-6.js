/* Hand-written SEO content for the website templates (part 6: Online Store). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_6 = {
  'online-store': {
    about: `An online store needs more than a nice home page: shoppers must be able to find a product, look closely at it, add it to a cart, pay and see that the order worked. This template gives you the whole journey as editable pages. The home page opens with a store header (a top bar, a search field, account, wishlist and cart icons, and a mega menu with link columns and a featured card), a hero, reasons to shop with you, a best-sellers strip, a gift banner, reviews and a newsletter sign-up.

The Shop page lists every product with a search box, sorting and filters for category, price, colour, rating, stock and sale items, and the menu links point straight into filtered views. The Product page has a zoomable gallery, colour switching, a quantity stepper, Add to cart, Buy now and a wishlist heart, trust badges, details accordions, a sticky buy bar on phones, reviews and two recommendation strips.

Adding to the cart opens a slide-in cart drawer with a free-shipping progress bar. The Cart page adds quantity changes, a promo code and a clear order summary, and the Checkout page collects delivery details and a payment choice, then sends the order to your form service or WhatsApp, or on to a payment link. A Thank you page shows the order, My orders lists past purchases with an Order again button, and the Wishlist page keeps saved products. A Help page answers delivery, returns and payment questions.

The cart, wishlist and orders live in the visitor's browser, so the shop works on any static host with no server and no account. That also sets honest limits: there is no stock control, tax engine or order management, and orders reach you through the form, WhatsApp or payment link you choose. For a bigger catalogue, move to a hosted shop platform and keep this design as the front end.

Every exported page has one main heading, descriptive image text, clean internal links and Product structured data, and all of it is plain HTML, CSS and a little JavaScript that you can edit or move to another host.`,
    checklist: [
      'A search field, account, wishlist and cart icons in the header, and a menu that shows every category at once',
      'A shop page with filters and sorting, so shoppers can narrow a catalogue in a few taps',
      'A product page with several photos, colour and size choices, a clear price and trust signals near the button',
      'A cart that opens without leaving the page, shows free-shipping progress and keeps its contents between pages',
      'A checkout that never asks for card numbers on your own page and a confirmation that shows the order',
      'Delivery, returns and payment answers one click from every page',
    ],
    faqs: [
      { q: 'Can this template take payments?', a: 'It does not handle card numbers. The checkout sends the order to a form service or WhatsApp, or sends the shopper to a payment link from Stripe, PayPal or Razorpay, which take the payment securely. For card payments on your own site use a hosted shop platform.' },
      { q: 'Where is the cart stored?', a: 'In the visitor\'s browser (localStorage), shared by every page of the site. It needs no account and no server, but it is not shared between devices.' },
      { q: 'How do I add my own products?', a: 'Edit the product lists on the Shop page, the Product page and the recommendation strips: photo, name, category, price, colours and links. Categories, colour chips and price limits for the filters are built from the products you enter.' },
      { q: 'Does it work as a multi-page site?', a: 'Yes. Open the multi-page version for Home, Shop, Product, Cart, Checkout, Thank you, Orders, Wishlist and Help pages that share one header and footer. Links between them are set up for you, including filtered shop links such as shop.html?cat=Audio.' },
      { q: 'Can I use it for a one-product store or a bakery?', a: 'Yes. Keep a single product on the Product page, or list pastries on the Shop page and switch the checkout to WhatsApp so orders arrive as a message. Rename the sections, colours and the free-shipping rule to fit.' },
    ],
  },
};
