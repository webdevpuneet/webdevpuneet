/* SEO page content for the cart, checkout and shop-browsing sections added on 2026-11-14 (merged into SECTION_SEO in
   seo-content.js). Same shape as every other entry: keywords, about, features, why, 4 use cases (18-42 words),
   4-5 FAQs and an AI prompt. */

const CART_NOTE = 'The cart is saved in the visitor\'s browser (localStorage), so it works on a static site with no server and no account.';

export const CART_SEO = {
  'product-listing': {
    keywords: ['product listing page template', 'shop page with filters html', 'ecommerce category page template', 'product filter and sort javascript', 'collection page template'],
    about: {
      title: 'Product Listing With Filters — Free Shop Page Template',
      description: `**Product Listing with Filters** is a free shop or collection page for online stores. A search box, a sort menu and a filter panel narrow a grid of product cards instantly: category, price range, colour, rating, in stock only and on sale. The result count updates as you filter, a friendly message appears when nothing matches, and a Load more button reveals the rest.

**Filters built from your own products**

You add products once. The script reads each card and builds the category list with counts, the colour chips with swatches and the price placeholders itself, so adding a product or a new category needs no extra setup. Every product is real HTML on the page, so search engines see all of them even though the filters work in the browser.

**Sort, search and share**

Sort by featured, price low to high, price high to low, newest or best rated. The current filters are written to the page address (for example ?cat=Audio&sort=price-asc&instock=1), so a filtered view can be bookmarked, shared or linked from a menu, and a search form in your header can send visitors to the shop with ?q=their words.

**Made for phones**

On a phone the filters slide up as a panel with a Filters button that shows how many are active, a backdrop, a close button and Esc. The result count is announced politely to screen readers, and Load more moves focus to the first new product.

**Works with the cart**

Each card has a wishlist heart and an Add to cart button for the built-in cart, which opens the [Cart Drawer](/website-section-templates/cart-drawer/). Sold-out products are greyed out and cannot be added. The section writes ItemList and Product structured data. Pair it with the [Product Detail Page](/website-section-templates/product-detail/) and the [Online Store website template](/website-builder/templates/online-store/).`,
    },
    features: [
      'Search box, sort menu and a filter panel in one section',
      'Category filter with counts, built from your products',
      'Price range, colour chips with swatches and a rating filter',
      'In stock only and On sale toggles',
      'Sort by featured, price, newest and best rated',
      'Live result count, a no-results state and a Clear filters button',
      'Load more with a configurable page size and keyboard focus handling',
      'Filters stored in the page address, so a filtered view can be shared',
      'Filter panel as a bottom sheet on phones, with an active-filter count',
      'Wishlist heart and Add to cart on every card, linked to the built-in cart',
      'Sold-out products greyed out and not purchasable',
      'ItemList and Product structured data for every product',
    ],
    why: [
      { icon: '🔎', title: 'Shoppers find things fast', desc: 'Search, filters and sorting let visitors narrow a catalogue to what they want in a few taps.' },
      { icon: '🔗', title: 'Filtered views you can link to', desc: 'Because filters live in the page address, menus, emails and ads can link straight to a filtered shop.' },
      { icon: '🧩', title: 'No setup beyond the products', desc: 'Categories, colours and price limits are worked out from the products you enter.' },
    ],
    useCases: [
      { icon: '🏬', title: 'Shop and collection pages', desc: 'Give a small store a proper catalogue page with filters and sorting, without a platform subscription, then link every product to its own page.' },
      { icon: '🎧', title: 'Merchandise for creators', desc: 'List shirts, prints and accessories by type and colour, mark what is sold out and send fans to checkout from the same page.' },
      { icon: '🛋', title: 'Home and furniture stores', desc: 'Let shoppers filter by room, colour and price range, and sort by newest or best rated before opening a product page.' },
      { icon: '🧪', title: 'Prototyping a shop', desc: 'Test how a catalogue should filter and sort with your real products, then export the HTML or React component and keep editing.' },
    ],
    faqs: [
      { q: 'How do I add a category or a colour?', a: 'Type it in the product. Products with the same category text are grouped under one Category option, and comma-separated colours become colour chips. Nothing else needs to change.' },
      { q: 'Can search engines see all the products?', a: 'Yes. Every product is a normal card in the page HTML, and the section also writes ItemList and Product data. The filters only hide and show cards in the browser.' },
      { q: 'How do shareable filters work?', a: 'The current filters are written to the page address, such as ?cat=Audio&sort=newest. Opening that address starts the page with the same filters, so links from menus and emails can point to a filtered shop.' },
      { q: 'How many products can it hold?', a: 'Up to 48 in the editor. The page size is configurable, so the first view stays short and Load more reveals the rest.' },
      { q: 'Does it work with a real shop platform?', a: 'It lists and filters products and links each card to its page. With the built-in cart on, Add to cart fills the browser cart; with it off the button links wherever you point it, such as a Shopify or Stripe link.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the listing: add a price slider, a size filter, infinite scroll instead of Load more, or filters that come from a JSON product feed.',
      prompt: `Create a responsive product listing page in plain HTML, CSS and JavaScript.

- A heading, then a bar with a search input, a "Filters" button (phones only, with an active-filter count), a live result count ("Showing 8 of 12 products") and a sort select (featured, price low to high, price high to low, newest, best rated).
- A left filter panel with a category radio list (with counts), min and max price inputs, colour chips with swatches (toggle buttons with aria-pressed), a rating select, "In stock only" and "On sale" checkboxes and a Clear all button. Build the category and colour options from the product cards.
- A 3-column grid of product cards (4:5 image, badge, category, name, rating, price with an optional old price, heart button and Add to cart). Sold-out cards are greyed out. Each card carries data attributes for category, colours, rating, date and stock.
- Filter, sort and page the cards in JavaScript by toggling [hidden] and re-ordering; show 8 first and a Load more button; show a no-results message with a Clear button.
- Write the filters to the URL (?q= &cat= &min= &max= &colour= &rating= &instock=1 &sale=1 &sort=) with history.replaceState and read them on load.
- Below 860 px show the filters as a bottom sheet with a backdrop, a close button and Esc to close.`,
    },
  },

  'product-strip': {
    keywords: ['you might also like section', 'related products carousel html', 'customers also bought strip', 'product recommendations slider', 'cross sell products section'],
    about: {
      title: 'You Might Also Like — Free Related Products Strip',
      description: `**You Might Also Like** is a free, swipeable strip of recommended products for the bottom of a product page, the cart or an order confirmation. Change the heading and it becomes "Customers also bought", "Complete the look" or "Recently viewed". Cards show a photo, name, price with a crossed-out old price, a star rating and an Add to cart button, with an optional wishlist heart.

**A row that scrolls the way people expect**

The strip is native scroll-snap, so touch swipe and trackpad scrolling feel natural, and the previous and next buttons scroll by about one screen of cards and switch off at the ends. The row itself can take keyboard focus and scrolls with the Left and Right arrow keys, and the buttons hide when every card already fits.

**More sales from the same visit**

Recommendation rows are the easiest way to raise the order value: a shopper who just added headphones sees earbuds and a stand. Put one under the [Product Detail Page](/website-section-templates/product-detail/), another on the cart page and a third on the order confirmation.

**Connected to the cart**

With the built-in cart on, Add to cart puts the product in the browser cart and opens the [Cart Drawer](/website-section-templates/cart-drawer/), and the heart saves it to the wishlist. Turn the cart off and the buttons link to each product page instead.

**Edit and export**

Add up to 16 products with photos, badges, prices and links, rename the heading and labels, and export HTML, a ZIP with images, React or Vue.`,
    },
    features: [
      'Swipeable scroll-snap row of product cards',
      'Previous and next buttons that disable at the ends and hide when everything fits',
      'Keyboard scrolling with Left and Right on the focused row',
      'Heading you can change to "Customers also bought", "Complete the look" and more',
      'Photo, badge, name, price, crossed-out old price and star rating on each card',
      'Wishlist heart and Add to cart connected to the built-in cart',
      'Up to 16 products, 4 cards per view on desktop and fewer on phones',
      'Optional "Shop all" link beside the arrows',
      'Reduced-motion support and accessible labels',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '📈', title: 'Raises order value', desc: 'Recommendations show shoppers the products that go with what they are already buying.' },
      { icon: '👆', title: 'Natural on every device', desc: 'Native scroll-snap means swipe, trackpad and keyboard scrolling work without extra weight.' },
      { icon: '🛒', title: 'Adds to the cart in one tap', desc: 'Each card has an Add to cart button and a wishlist heart, linked to the built-in cart.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Under a product', desc: 'Show accessories and similar products below the buy box so shoppers can add a matching item before they check out.' },
      { icon: '🛒', title: 'On the cart page', desc: 'Suggest low-cost add-ons next to the order summary, such as cables, cases or care kits, to raise the order total.' },
      { icon: '🏠', title: 'Best sellers on the home page', desc: 'Use the strip as a "Best sellers" or "New arrivals" row under the hero, with a Shop all link to the full catalogue.' },
      { icon: '🎁', title: 'After the order', desc: 'Offer related products on the thank-you page while the shopper is happy, with a link back to the shop.' },
    ],
    faqs: [
      { q: 'How do I change it to "Customers also bought"?', a: 'Edit the heading text. The strip does not care what the products are called, so the same section works for you might also like, customers also bought, complete the look and recently viewed.' },
      { q: 'Can the recommendations be chosen automatically?', a: 'Not in the plain version. You choose the products for each strip. For automatic recommendations, generate the product list from your shop platform and paste it into the strip.' },
      { q: 'Does it work with the cart and wishlist?', a: 'Yes. With the built-in cart switched on, Add to cart adds the product and opens the cart drawer, and the heart saves it to the wishlist page.' },
      { q: 'How many products can I show?', a: 'Between 2 and 16. Four fit across a desktop row, with the rest reached by scrolling or the arrow buttons.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the strip: add auto-scroll on hover, dots for position, or a loader that fills it from a recommendations API.',
      prompt: `Create a "You might also like" product strip in plain HTML, CSS and JavaScript.

- A heading row with an eyebrow, a heading, a "Shop all" link and previous / next circular buttons.
- A horizontally scrolling row (CSS grid with grid-auto-flow: column, overflow-x: auto, scroll-snap-type: x mandatory, hidden scrollbar) of product cards: a 4:5 image with an optional badge, a heart button, the name, a star rating, the price with an optional crossed-out old price and an Add to cart button. Four cards per view on desktop, three on tablets, about two and a quarter on phones.
- The buttons scroll by 85% of the row width (smooth unless prefers-reduced-motion), are disabled at the ends and hidden when all cards fit. The row is focusable and Left / Right scroll it.
- Add to cart calls a small cart object and shows a toast; the heart toggles aria-pressed.`,
    },
  },

  'cart-drawer': {
    keywords: ['cart drawer html css', 'mini cart slide in', 'shopping cart sidebar', 'free shipping progress bar', 'ajax cart drawer javascript'],
    about: {
      title: 'Cart Drawer — Free Slide-In Mini Cart Template',
      description: `**Cart Drawer** is a free slide-in mini cart for online stores. It opens from the side when a shopper adds a product or taps the cart icon, lists the items with photos and options, lets them change quantities or remove things, and shows a free-shipping progress bar, the subtotal and a Checkout button, with View cart and Continue shopping links. It takes no space in the page.

**The shared cart behind it**

All the shop sections read one small cart, kept in the visitor's browser. ${CART_NOTE} Add to cart on the [Product Detail Page](/website-section-templates/product-detail/), the [Product Grid](/website-section-templates/product-grid/), the [Product Listing](/website-section-templates/product-listing/) and the [recommendation strip](/website-section-templates/product-strip/) all fill it, and the cart icon and badge in the [ecommerce mega menus](/website-section-templates/mega-menu-columns/) open the drawer and show the real count.

**Free shipping that nudges**

Set a threshold such as 150 and the drawer shows "You are $42 away from free shipping" with a bar that fills as items are added, then "You have free shipping!". The same rule is used on the cart and checkout pages.

**Accessible by design**

The drawer is a dialog: focus moves to the close button when it opens, Tab stays inside, Esc and the backdrop close it, focus returns to the button that opened it, and the page behind does not scroll. Reduced-motion users get no slide animation.

**Edit and export**

Edit every label, the free-shipping amount and message, and which side it slides from. Export HTML, a ZIP, React or Vue.`,
    },
    features: [
      'Slide-in drawer from the right or the left that takes no space in the page',
      'Line items with photo, options, price, quantity stepper and Remove',
      'Free-shipping progress bar with editable messages',
      'Subtotal, a note, a Checkout button and a View cart link',
      'Friendly empty state with a Continue shopping button',
      'Opens when something is added or the cart icon is pressed',
      'Cart saved in the browser, shared with the cart page and checkout',
      'Focus trap, Esc, backdrop click, focus return and page scroll lock',
      'Demo items in the editors so it can be styled while empty',
      'Works with the ecommerce mega menus: real cart count on the badge',
    ],
    why: [
      { icon: '⚡', title: 'Keeps shoppers on the page', desc: 'Adding to the cart opens the drawer instead of loading another page, so shoppers keep browsing.' },
      { icon: '🚚', title: 'Free-shipping nudge', desc: 'A progress bar shows how close the order is to free shipping and encourages one more item.' },
      { icon: '♿', title: 'A proper dialog', desc: 'Focus handling, Esc and a scroll lock make the drawer usable with a keyboard or a screen reader.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Small online stores', desc: 'Give a shop built from these sections a fast cart that opens on every Add to cart and shows the running subtotal.' },
      { icon: '📦', title: 'Order-by-message shops', desc: 'Let customers collect items in the drawer, then send the order by form or WhatsApp from the checkout page.' },
      { icon: '🚚', title: 'Raising order value', desc: 'Use the free-shipping bar to push shoppers a little past the threshold, since people like to avoid paying for delivery.' },
      { icon: '🧪', title: 'Prototyping a cart', desc: 'Try out a cart experience and its wording before building it in your platform, then export the HTML.' },
    ],
    faqs: [
      { q: 'Where is the cart stored?', a: 'In the visitor\'s browser, in localStorage. It survives page loads and closing the tab, works across the pages of your site and needs no account or server. It is not shared between devices.' },
      { q: 'How does the drawer open?', a: 'Adding to the cart from a section with the built-in cart switched on opens it, and so does any element marked data-cart-open, such as the cart icon in the mega menus.' },
      { q: 'How do I set the free-shipping amount?', a: 'Type a number in "Free shipping over", such as 150. Leave it empty to hide the progress bar. The cart and checkout pages use the same number.' },
      { q: 'Does it take payments?', a: 'No. The Checkout button goes to your checkout page, which sends the order by form, WhatsApp or a payment link. See the Checkout Page section.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the drawer: add upsell suggestions, a gift-note field, saved carts across devices, or a coupon box.',
      prompt: `Create a slide-in cart drawer in plain HTML, CSS and JavaScript.

- A fixed panel (420 px wide, full height) that slides in from the right with a dimmed backdrop. Header with "Your cart" and a close button; a free-shipping bar ("You are $42 away from free shipping" with a progress bar); a list of items (photo, name, options, unit price, quantity stepper, Remove, line total); a footer with Subtotal, a note, a Checkout button and a View cart link; an empty state with a Continue shopping button.
- A cart object saved to localStorage with add, remove, set quantity, count and subtotal, and a custom event or subscriber so the drawer, a cart badge and other pages stay in sync. Build rows with createElement and textContent only.
- Accessibility: role="dialog" aria-modal, focus moves to the close button on open, Tab is trapped, Esc and the backdrop close it, focus returns to the opener and the page does not scroll behind it.`,
    },
  },

  'cart-page': {
    keywords: ['shopping cart page template', 'cart page html css', 'cart with promo code', 'order summary template', 'ecommerce cart page design'],
    about: {
      title: 'Shopping Cart Page — Free Cart Template With Promo Code',
      description: `**Cart Page** is a free shopping cart page for online stores. The shopper's items sit on the left with photos, options, quantity steppers and Remove links, above a free-shipping progress bar. On the right a sticky order summary shows the subtotal, a promo code box, the shipping cost and the total, with a Go to checkout button and a small note. It reads the shared cart, saved in the visitor's browser.

**Promo codes you define**

Write the valid codes as lines such as WELCOME10 | 10 (ten percent off). The page applies the discount, shows it in the summary with a Remove link and carries it into the checkout and the saved order. A wrong code shows a clear message. Remember that anyone can read the codes in the page source, so your shop must check them again when it takes the order.

**Shipping that makes sense**

Set a flat shipping cost and a free-shipping threshold. The summary shows the shipping line, "Free" once the threshold is reached, and the total. The same rule is used in the [Cart Drawer](/website-section-templates/cart-drawer/) and the [Checkout Page](/website-section-templates/checkout-page/).

**Empty and demo states**

An empty cart shows a friendly message and a Continue shopping button, and the checkout button is disabled. In the editors the page shows demo items so you can design it.

**Edit and export**

Edit every label and message, switch the promo box and the shipping bar on or off, and export HTML, a ZIP, React or Vue. Add a [recommendation strip](/website-section-templates/product-strip/) under it to raise the order value.`,
    },
    features: [
      'Cart rows with photo, options, price, quantity stepper, line total and Remove',
      'Sticky order summary with subtotal, discount, shipping and total',
      'Promo code box with codes written as "CODE | percent"',
      'Remove-code link and clear messages for valid and invalid codes',
      'Flat shipping with a free-shipping threshold and progress bar',
      'Go to checkout button that is disabled for an empty cart',
      'Empty-cart state with a Continue shopping button',
      'Cart saved in the browser and shared with the drawer and checkout',
      'Demo items in the editors',
      'Responsive layout that stacks the summary under the items on phones',
    ],
    why: [
      { icon: '🧾', title: 'A familiar cart layout', desc: 'Items on the left and a sticky summary on the right is the pattern shoppers already know.' },
      { icon: '🏷', title: 'Promo codes without a backend', desc: 'Define simple percentage codes on the page and show the discount straight away.' },
      { icon: '🚚', title: 'Clear shipping', desc: 'A free-shipping bar and a plain shipping line remove the surprise before checkout.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Small shops', desc: 'Give a store built from these sections a full cart page with quantity changes, a promo code and a clear total.' },
      { icon: '🎁', title: 'Launch discounts', desc: 'Offer a welcome or newsletter code and show the saving in the summary, so subscribers see the reward immediately.' },
      { icon: '📦', title: 'Order-by-message businesses', desc: 'Let customers review and adjust their order before sending it to you by form or WhatsApp, so the message you receive is already correct and complete.' },
      { icon: '🧪', title: 'Testing cart wording', desc: 'Try different labels, notes and shipping rules on your own cart before committing to a platform, and see how each change reads to a real shopper.' },
    ],
    faqs: [
      { q: 'How do promo codes work?', a: 'You list valid codes in the editor, one per line as CODE | percent. The page checks the typed code against the list and applies the percentage. Because the codes are in the page, your shop should verify them again when the order arrives.' },
      { q: 'Where is the cart kept?', a: 'In the browser\'s localStorage, shared by every shop section on your site. It is not shared between devices and needs no account.' },
      { q: 'How is shipping calculated?', a: 'A flat rate, free once the order reaches your threshold after any discount. The checkout page can add other shipping methods with their own costs.' },
      { q: 'Can I change the currency?', a: 'The currency symbol is taken from the product prices, so write them with a symbol such as $, £, € or ₹.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the cart page: add a gift-wrap option, estimated delivery dates, cross-sell products or a shipping calculator by postcode.',
      prompt: `Create a shopping cart page in plain HTML, CSS and JavaScript with a cart saved to localStorage.

- Two columns: a list of items on the left (photo, name, options, unit price, quantity stepper, Remove, line total) above a free-shipping progress bar, and a sticky "Order summary" card on the right.
- The summary has a promo code form (valid codes defined in a list such as WELCOME10 = 10% off; show "Code applied" or "Not valid"; a Remove link), subtotal, discount, shipping (flat rate, free over a threshold) and total, then a Go to checkout button disabled when the cart is empty.
- An empty state with a Continue shopping button. Build rows with createElement and textContent only.
- Stack the columns under 900 px.`,
    },
  },

  'checkout-page': {
    keywords: ['checkout page template', 'ecommerce checkout html css', 'order form with shipping and payment', 'whatsapp order checkout', 'payment link checkout page'],
    about: {
      title: 'Checkout Page — Free Order Form & Payment Link Template',
      description: `**Checkout Page** is a free one-page checkout for small shops. The shopper gives contact details and a shipping address, chooses a shipping method and a payment option, and sees the order summary beside the form. When they press Place order the page sends the order to your form service (Formspree and similar), opens WhatsApp with the order text or goes to your payment link (Stripe, PayPal, Razorpay), then shows the confirmation page. There are no card fields: payment is handled by the service you choose.

**Three ways to take the order**

Choose how orders reach you. A **form service** receives the order as JSON with the items, totals, contact details and notes. **WhatsApp** opens a chat with a ready-written order message, ideal for bakeries, local shops and markets where orders are agreed by message. A **payment link** saves the order and sends the shopper to your hosted payment page.

**Honest and safe**

The page never handles card numbers. A hidden honeypot field catches simple bots, required fields use the browser's own validation, and a clear error appears if sending fails, with the cart left untouched so nothing is lost. A confirmation page then shows the saved order.

**Shipping and summary**

Add up to four shipping methods with costs, and the first can be free over a threshold. The summary updates as the method changes and includes any promo code from the [Cart Page](/website-section-templates/cart-page/).

**Edit and export**

Edit every label and message, the shipping and payment options, the order-number prefix and where the shopper lands next. Nothing is sent from the editors. Export HTML, a ZIP, React or Vue.`,
    },
    features: [
      'Contact, shipping address and an optional order note, with browser validation',
      'Shipping methods with costs (up to four) and a free-shipping rule for the first',
      'Payment options list (pay online, on delivery and more)',
      'Order summary that updates with the shipping method and promo code',
      'Send the order to a form service as JSON, open WhatsApp, or go to a payment link',
      'Order saved in the browser and the cart emptied after a successful order',
      'Honeypot field, required-terms checkbox and a clear error message',
      'No card fields, so no card data touches your page',
      'Empty-cart message instead of a broken form',
      'Order number with your own prefix and a redirect to the confirmation page',
    ],
    why: [
      { icon: '🔒', title: 'No card data on your site', desc: 'Payment is handled by the service you choose, so the page never sees card numbers.' },
      { icon: '💬', title: 'Fits how small shops sell', desc: 'Form, WhatsApp and payment-link modes cover bakeries, markets, makers and local stores.' },
      { icon: '🧾', title: 'A confirmation shoppers trust', desc: 'The saved order appears on the thank-you page and in the order history.' },
    ],
    useCases: [
      { icon: '🍞', title: 'Bakeries and local food', desc: 'Take pre-orders as a WhatsApp message with items, delivery slot and address, and confirm and collect payment yourself.' },
      { icon: '🎨', title: 'Makers and artists', desc: 'Sell prints and handmade goods by sending the order to a form, then invoice or share a payment link.' },
      { icon: '💳', title: 'Stripe or PayPal link shops', desc: 'Collect the shipping details first, then send the shopper to your hosted payment page to pay, with the saved order waiting on the confirmation page afterwards.' },
      { icon: '🧪', title: 'Testing a checkout flow', desc: 'Prototype checkout wording, steps and shipping options with your own products before choosing a shop platform, then export the HTML and keep improving it.' },
    ],
    faqs: [
      { q: 'Does the Checkout Page take card payments?', a: 'No, and it has no card fields. It collects the order and then sends it to a form service, opens WhatsApp or goes to a payment link such as Stripe, PayPal or Razorpay, which take the payment securely.' },
      { q: 'How is the order sent to me?', a: 'In form mode the order is posted as JSON to the form URL you set, for example a Formspree endpoint. In WhatsApp mode a chat opens with the order text. In payment-link mode the shopper is sent to your payment URL after the order is saved.' },
      { q: 'What happens if sending fails?', a: 'An error message appears and the cart is kept, so the shopper can try again without losing anything.' },
      { q: 'Does it validate addresses or calculate tax?', a: 'No. It checks that required fields are filled and the email looks right. Tax and address checks belong to your shop platform or accountant.' },
      { q: 'Can I see the orders I received?', a: 'Orders arrive wherever you send them (your form inbox, WhatsApp or payment provider). The order history page only lists orders placed in the same browser.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the checkout: add address autocomplete, a delivery date picker, gift messages or a postcode-based shipping calculator.',
      prompt: `Create a one-page checkout in plain HTML, CSS and JavaScript that reads a cart from localStorage.

- Left column: cards for Contact (email, phone), Shipping address (name, address, city, postcode, country), Shipping method (radio cards with name, note and cost; the first is free over a threshold), Payment (radio cards) with an order note, a hidden honeypot field, a required terms checkbox and a Place order button. Right column: a sticky order summary with items, subtotal, discount, shipping and total.
- On submit: build an order object (id, date, items, totals, contact, address, shipping method, payment, note). Mode "form": POST it as JSON to a form endpoint; on failure show an error and keep the cart. Mode "whatsapp": open wa.me/NUMBER?text= with a readable order message. Mode "link": save the order and redirect to a payment link.
- On success save the order, empty the cart and go to a confirmation page. No card fields.`,
    },
  },

  'order-confirmation': {
    keywords: ['order confirmation page template', 'thank you page ecommerce', 'order complete page html', 'post purchase page', 'order summary thank you'],
    about: {
      title: 'Order Confirmation — Free Thank You Page Template',
      description: `**Order Confirmation** is a free thank-you page for the moment after checkout. A big check mark and a message greet the shopper by name, then the page shows the order number, the items they bought with photos, the totals, the shipping address, delivery method and payment choice, and a "what happens next" list with up to five steps. Buttons lead back to the shop and to the order history.

**Reads the order from checkout**

The [Checkout Page](/website-section-templates/checkout-page/) saves each order in the browser, and this page shows the latest one, so every shopper sees their own order. The title and message accept tokens: {name} becomes the first name, {order} the order number and {email} the address.

**Cuts "did it work?" emails**

Shoppers who see an order number, their items and a clear next step stop worrying and stop emailing you. Use the steps to say when you will confirm, ship and deliver, and add a link to your help page.

**Safe when there is no order**

If someone opens the page with no saved order, it shows a polite "no recent order found" message with a button to the shop instead of an empty summary. In the editors it shows a demo order so you can style it.

**Edit and export**

Edit every label, the steps and the buttons, and export HTML, a ZIP, React or Vue. Add a [recommendation strip](/website-section-templates/product-strip/) below for one more chance to sell.`,
    },
    features: [
      'Thank-you message with {name}, {order} and {email} filled in on the live page',
      'Order number, date, email, shipping address, delivery method and payment',
      'Items with photos and options, with subtotal, discount, shipping and total',
      '"What happens next" steps, up to five, switchable',
      'Continue shopping and View my orders buttons',
      'A polite fallback when no recent order is found',
      'Demo order in the editors',
      'Reads the order saved by the Checkout Page',
      'Responsive two-column layout that stacks on phones',
    ],
    why: [
      { icon: '✅', title: 'Reassures the shopper', desc: 'A clear summary with an order number answers "did my order go through?" straight away.' },
      { icon: '🗺', title: 'Explains what comes next', desc: 'The steps set expectations for confirmation, shipping and delivery.' },
      { icon: '🔁', title: 'Keeps them shopping', desc: 'Links to the shop and the order history, and room for a recommendations strip, keep the visit going.' },
    ],
    useCases: [
      { icon: '🛍', title: 'After a checkout', desc: 'Show a complete, personal confirmation page after the Checkout Page sends the order, with the items, the totals and a clear next step for the shopper.' },
      { icon: '💳', title: 'After a payment link', desc: 'Set your payment provider to return the shopper to this page, so they see the saved order with its items and delivery details right after paying.' },
      { icon: '🍞', title: 'Order-by-message shops', desc: 'Explain the next steps, such as "we will confirm on WhatsApp within the hour", right under the order summary.' },
      { icon: '🧪', title: 'Designing the post-purchase journey', desc: 'Prototype the page shoppers see after a purchase, including its wording and next steps, before connecting a platform or sending any real orders.' },
    ],
    faqs: [
      { q: 'Where does the order come from?', a: 'From the browser. The Checkout Page saves the order when it is placed, and this page reads the latest one. If the shopper opens the page on another device there will be no saved order.' },
      { q: 'What do {name}, {order} and {email} do?', a: 'They are replaced on the live page with the shopper\'s first name, the order number and their email. In the editors the tokens stay visible so you can edit the text.' },
      { q: 'Can I use it with a payment provider\'s redirect?', a: 'Yes. Set your payment link\'s success page to this page. The order was saved before the shopper left, so it appears when they return.' },
      { q: 'Does it send a confirmation email?', a: 'No. It is a page. Send emails from your form service or shop platform; the Email Templates library has order confirmation designs you can adapt.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the page: add a print receipt button, a delivery tracker, a referral offer or an upsell block.',
      prompt: `Create an order confirmation (thank you) page in plain HTML, CSS and JavaScript that reads the last order from localStorage.

- A centred hero with a green check icon, "Thank you, {name}!" and a message with the order number and email. Replace the tokens from the saved order.
- Two columns: a card with the order items (photo, name, options, quantity, line total) and subtotal, discount, shipping and total; and a details card (order number, date, email, shipping address, delivery method, payment).
- A "What happens next" row of three numbered steps and two buttons (Continue shopping, View my orders).
- If there is no saved order show a polite message and a button to the shop.`,
    },
  },

  'order-history': {
    keywords: ['order history page template', 'my orders page html', 'past purchases page', 'reorder button ecommerce', 'order list template'],
    about: {
      title: 'Order History — Free My Orders Page Template',
      description: `**Order History** is a free "My orders" page for past purchases. Each order is a card with the order number, date, status and total, a row of product photos, and a details view with every item, the totals, the delivery address and the payment choice. An Order again button puts the same items back in the cart, and an optional Track order link points to your tracking page. Orders come from the [Checkout Page](/website-section-templates/checkout-page/) and are saved in the shopper's browser, so no account is needed.

**Reorder in one click**

Repeat purchases are the cheapest sales you will ever make. Order again adds every item of a past order to the cart and opens the [Cart Drawer](/website-section-templates/cart-drawer/), or goes to the cart page, ready for checkout.

**Honest about what it knows**

The plain version knows only what the browser saved, so a new order carries the status you set in the editor (for example "Order received") and orders from other devices do not appear. For real statuses and tracking, link the Track order button to your own tracking page or your shop platform, and see the optional accounts idea on the roadmap.

**Details when needed**

The details view is a native details element, so it works with the keyboard and screen readers, and prints well. In the editors the page shows two demo orders.

**Edit and export**

Edit every label, the status text, the buttons and the empty state, and export HTML, a ZIP, React or Vue.`,
    },
    features: [
      'One card per saved order, newest first, up to 25',
      'Order number, date, status badge and total at a glance',
      'Product thumbnails and an item count',
      'Details view with items, totals, address, delivery method and payment',
      'Order again button that refills the cart and opens the drawer',
      'Optional Track order link that adds ?order= to your tracking page',
      'Friendly empty state with a Start shopping button',
      'Orders saved in the browser by the Checkout Page, no account needed',
      'Demo orders in the editors',
      'Accessible disclosure for details, responsive layout',
    ],
    why: [
      { icon: '🔁', title: 'Makes reordering easy', desc: 'One button puts a past order back in the cart, which is the quickest route to a repeat sale.' },
      { icon: '📋', title: 'No account needed', desc: 'Orders placed on this device are listed from the browser, so a small shop can offer order history without logins.' },
      { icon: '🔍', title: 'Details on demand', desc: 'A compact card for scanning and an expandable view for the full order.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Small shops without accounts', desc: 'Offer a basic "my orders" page without building logins, showing the purchases made on the shopper\'s own device.' },
      { icon: '☕', title: 'Repeat-purchase products', desc: 'For coffee, supplements, pet food or other consumables, let customers repeat their last order with a single click instead of searching for each product again.' },
      { icon: '📞', title: 'Fewer support questions', desc: 'Let customers look up their own order number, items and delivery address on the page instead of emailing you to ask what they bought and when.' },
      { icon: '🧪', title: 'Designing account pages', desc: 'Prototype an order history layout and its wording before connecting a real customer account system, so you know what the page needs to show.' },
    ],
    faqs: [
      { q: 'Why does it only show orders from this device?', a: 'Without accounts or a server, the only place an order can be saved is the visitor\'s browser. Orders placed on another device or browser will not appear. Accounts are on the roadmap as an optional upgrade.' },
      { q: 'How can the status change?', a: 'New orders show the status text you set, such as Order received. For real statuses link the Track order button to your own tracking page or shop platform, which knows where the parcel is.' },
      { q: 'What does Order again do?', a: 'It adds every item of that order to the cart with the same options and quantities, then opens the cart drawer or the cart page.' },
      { q: 'How many orders are kept?', a: 'The 25 most recent orders placed in this browser.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the page: add invoice download, return requests, a status timeline or orders from your own API.',
      prompt: `Create a "My orders" page in plain HTML, CSS and JavaScript that lists orders saved in localStorage (newest first).

- Each order is a card with a row of facts (order number, date, total), a status badge, product thumbnails with an item count, a <details> element ("View details") containing the items, delivery address, shipping method, payment and totals, and buttons: "Order again" (add all items back to the cart and open the cart) and an optional "Track order" link that adds ?order=ID to a tracking URL.
- An empty state with a Start shopping button.
- Build the DOM with createElement and textContent only.`,
    },
  },

  'wishlist-page': {
    keywords: ['wishlist page template', 'saved items page html', 'favourites page ecommerce', 'wishlist heart button javascript', 'save for later page'],
    about: {
      title: 'Wishlist Page — Free Saved Items Template for Shops',
      description: `**Wishlist Page** is a free page for the products a shopper saved with the heart button. Each saved product is a card with its photo, name and price, an Add to cart button and a Remove link, with an Add all to cart action at the top. The wishlist is kept in the visitor's browser, so no account is needed, and the hearts on the [Product Detail Page](/website-section-templates/product-detail/), the [Product Listing](/website-section-templates/product-listing/), the [Product Grid](/website-section-templates/product-grid/) and the [mega menu](/website-section-templates/mega-menu-columns/) stay in sync with it.

**Hearts that remember**

Press a heart anywhere and the product is saved; reload the page and the heart is still filled. The heart in the header shows how many items are saved, and removing an item from the wishlist page un-fills its heart everywhere.

**From saved to bought**

Add to cart opens the cart drawer or shows a short message, and Add all to cart moves the whole list into the cart in one go, which suits gift lists and "buy later" shoppers.

**Friendly when empty**

An empty wishlist shows a heart icon, a short explanation of how to save things and a button to the shop. In the editors the page shows demo products.

**Edit and export**

Edit every label and message, and export HTML, a ZIP, React or Vue.`,
    },
    features: [
      'Saved products as cards with photo, name, price, Add to cart and Remove',
      'Add all to cart action',
      'Hearts on product pages, listings, grids and strips stay in sync',
      'Heart count badge in the mega menu header',
      'Wishlist saved in the browser, no account needed',
      'Friendly empty state with a link to the shop',
      'Demo products in the editors',
      'Add to cart opens the cart drawer or shows a short message',
      'Responsive grid from four columns down to one',
    ],
    why: [
      { icon: '❤', title: 'Save for later', desc: 'Shoppers who are not ready to buy can keep products and come back, which brings them back to your shop.' },
      { icon: '🔄', title: 'In sync everywhere', desc: 'Every heart reads the same saved list, so what is saved on one page shows on all of them.' },
      { icon: '🎁', title: 'Great for gift lists', desc: 'Add all to cart turns a list of ideas into an order in one click.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Online stores', desc: 'Give shoppers a place to keep products they like while they compare, with an easy path from saved to cart.' },
      { icon: '🎁', title: 'Gift shopping', desc: 'Let customers collect ideas for a birthday or holiday and add the whole list to the cart when they decide.' },
      { icon: '🏠', title: 'Furniture and decor', desc: 'Shoppers save pieces for different rooms and come back to buy over days or weeks, with their favourites waiting in one tidy list.' },
      { icon: '🧪', title: 'Prototyping favourites', desc: 'Try a favourites feature and design its page before building it into a larger shop, using your own products and the same heart buttons.' },
    ],
    faqs: [
      { q: 'Where is the wishlist saved?', a: 'In the visitor\'s browser (localStorage), so it works without an account and survives reloads. It is not shared between devices.' },
      { q: 'How do hearts know what is saved?', a: 'Every heart reads the same saved list and shows a filled state when its product is on it, so the product page, listing, grid and wishlist page always agree.' },
      { q: 'Can shoppers share their wishlist?', a: 'Not in the plain version, because the list lives in one browser. Sharing needs accounts or a server, which are on the roadmap.' },
      { q: 'What does Add all to cart do?', a: 'It adds every saved product to the cart once and opens the cart drawer, leaving the wishlist as it is.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the wishlist: add share links, price-drop alerts, moving items between lists or syncing with a user account.',
      prompt: `Create a wishlist page in plain HTML, CSS and JavaScript that reads saved products from localStorage.

- A heading with an "Add all to cart" button, then a responsive grid (4, 3, 2, 1 columns) of cards: a 4:5 image, the name linked to the product, the price, an Add to cart button and a Remove link.
- An empty state with a heart icon, a short message and a button to the shop.
- Heart buttons elsewhere on the site toggle products in the same list (aria-pressed) and a header badge shows the count. Build the DOM with createElement and textContent only.`,
    },
  },
};
