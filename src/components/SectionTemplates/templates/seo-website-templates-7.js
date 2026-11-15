/* Hand-written SEO content for the website templates (part 7: Cafe & Coffee Shop). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_7 = {
  cafe: {
    about: `A café website has two jobs: make people hungry, and make it easy to act. This template does both. The home page opens with a store-style header (a top bar, a search field, a cart and a mega menu with a featured deal), a full-width photo hero with an "Order online" button, a strip of customer favourites you can add straight to an order, four reasons to choose you, a loyalty stamp card, the story of your roastery, reviews, live opening hours with a map and a newsletter sign-up.

The Menu page lists every drink, bake and bag of beans with a search box and filters for category and price, and the header links go straight to filtered views such as coffee only or pastries only. Adding an item opens a slide-in cart drawer, the Cart page changes quantities and shows the total, and the Checkout page collects pickup or delivery details and sends the order to your form service or WhatsApp, or on to a payment link. A Thank you page confirms the order and My orders lets regulars order the same drinks again in one click.

The Loyalty Stamp Card is a section made for this template: visitors press a button to add a stamp, the card remembers its progress in their browser and the last stamp turns into a free drink. The Our story page has the founders, your values and the team, and the Visit page repeats the opening hours with a live "Open now" badge, directions, and answers about dogs, wifi, allergens and group bookings.

Bean & Bloom keeps the cart, past orders and loyalty stamps in each visitor's own browser, which is why the site runs on cheap static hosting with nothing to log into. The trade-off is plain: there is no stock count, no card terminal on the page and no kitchen screen, and orders arrive through whichever form service, WhatsApp number or payment link you set. That suits a café taking a few dozen orders a day by hand; a busy counter with live payments is better served by a hosted ordering system, with this design kept as the shop window.

Behind the photos, the menu page carries Product data for every drink and bake, the opening hours are written as CafeOrCoffeeShop data, and each page has a single main heading and described images, so search engines read the café as clearly as customers do.`,
    checklist: [
      'Opening hours with a live "Open now" badge, the address and a map on the first screen visitors can reach',
      'A menu people can scan quickly, with photos, prices and filters for coffee, pastries, lunch and beans',
      'An order-ahead flow that shows the cart without leaving the page and ends with a clear confirmation',
      'A reason to come back, such as a loyalty card or a free pastry for newsletter sign-ups',
      'Honest answers about allergens, plant milks, dogs and wifi before people visit',
      'Real photos of your drinks, bakes and counter, with descriptive image text',
    ],
    faqs: [
      { q: 'Can customers order and pay online with this template?', a: 'They can build an order with a cart and checkout, but the template does not handle card numbers. The checkout sends the order to a form service or WhatsApp, or sends the customer to a payment link from Stripe, PayPal or Square. For on-site card payments use a hosted ordering platform.' },
      { q: 'How does the loyalty stamp card work?', a: 'Visitors press "Add a stamp" and the card fills, remembering its progress in their own browser. It is a friendly demonstration of your scheme, not a customer account system, so back it with real stamp cards or a loyalty tool in the shop.' },
      { q: 'How do I put my own menu in?', a: 'Edit the product list on the Menu page: photo, name, category, price, badge and rating. Categories and price limits in the filters are built from what you enter, and the favourites strip on the home page uses its own short list.' },
      { q: 'Which pages come with the multi-page café site?', a: 'Eight: Home, Menu, Our story, Visit, Cart, Checkout, Thank you and Orders. They share the header, footer and order drawer, and the menu links already open filtered views such as menu.html?cat=Coffee.' },
      { q: 'Can I use it for a bakery or a juice bar?', a: 'Yes. Replace the menu items and photos, change the stamp symbol and reward, and rename the sections. The ordering flow, opening hours and stamp card work for any food and drink business.' },
    ],
  },
};
