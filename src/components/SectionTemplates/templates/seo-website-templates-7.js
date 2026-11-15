/* Hand-written SEO content for the website templates (part 7: Cafe & Coffee Shop). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_7 = {
  cafe: {
    about: `A café website has two jobs: make people hungry, and make it easy to act. This template does both. The home page opens with a store-style header (a top bar, a search field, a cart and a mega menu with a featured deal), a full-width photo hero with an "Order online" button, a strip of customer favourites you can add straight to an order, four reasons to choose you, a loyalty stamp card, the story of your roastery, reviews, live opening hours with a map and a newsletter sign-up.

The Menu page lists every drink, bake and bag of beans with a search box and filters for category and price, and the header links go straight to filtered views such as coffee only or pastries only. Adding an item opens a slide-in cart drawer, the Cart page changes quantities and shows the total, and the Checkout page collects pickup or delivery details and sends the order to your form service or WhatsApp, or on to a payment link. A Thank you page confirms the order and My orders lets regulars order the same drinks again in one click.

The Loyalty Stamp Card is a section made for this template: visitors press a button to add a stamp, the card remembers its progress in their browser and the last stamp turns into a free drink. The Our story page has the founders, your values and the team, and the Visit page repeats the opening hours with a live "Open now" badge, directions, and answers about dogs, wifi, allergens and group bookings.

The cart, orders and stamps live in the visitor's browser, so the site works on any static host with no server or account. That sets honest limits: there is no stock control, no card processing on your page and no staff tablet, and orders reach you through the form, WhatsApp or payment link you choose. It suits a café with an ordering flow you can manage by hand; if you need a kitchen display and live payments, use a hosted ordering platform and keep this design for the website.

Every exported page has one main heading, descriptive image text, clean internal links, local business data for the opening hours and Product data for the menu, in plain HTML, CSS and a little JavaScript that you can edit or move to another host.`,
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
      { q: 'Does it work as a multi-page site?', a: 'Yes. The multi-page version has Home, Menu, Our story, Visit, Cart, Checkout, Thank you and Orders pages sharing one header, footer and cart drawer, with filtered menu links such as menu.html?cat=Coffee already set up.' },
      { q: 'Can I use it for a bakery or a juice bar?', a: 'Yes. Replace the menu items and photos, change the stamp symbol and reward, and rename the sections. The ordering flow, opening hours and stamp card work for any food and drink business.' },
    ],
  },
};
