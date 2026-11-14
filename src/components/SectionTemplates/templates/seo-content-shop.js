/* SEO page content for the shop sections added on 2026-11-14 (merged into SECTION_SEO in seo-content.js).
   Same shape as every other entry: keywords, about, features, why, 4 use cases (18-42 words), 4-5 FAQs
   and an AI prompt. */

export const SHOP_SEO = {
  'product-detail': {
    keywords: ['product page template', 'product detail page html css', 'ecommerce product page design', 'product gallery with zoom', 'add to cart section'],
    about: {
      title: 'Product Detail Page — Free Ecommerce Product Page Template',
      description: `**Product Detail Page** is a free, responsive product page section for online stores, launch pages and one-product shops. A photo gallery sits on the left and the buy box on the right: the name, a star rating, the price with a crossed-out old price and a savings badge, colour swatches, size buttons, a quantity stepper, Add to cart, Buy now and a wishlist heart. Below the buttons come stock and delivery notes, trust badges and details in accordions.

**A gallery that shows the product**

Shoppers cannot touch a product, so the photos do the selling. The gallery has a thumbnail strip, previous and next arrows, a photo counter, swipe on touch screens and Left and Right keys, and on a computer the photo zooms around the pointer. Choose a colour and the gallery jumps to the photo you tagged with that colour; show that photo and the matching swatch is selected.

**Options that behave properly**

Colours and sizes are real radio buttons with labels for screen readers. A sold-out size is struck through and cannot be chosen. If your product has sizes and the visitor presses Add to cart without picking one, a clear message appears and the sizes scroll into view instead of sending an incomplete order.

**Works with the checkout you already have**

The section displays the product and links out, so it does not take payments itself. Point Add to cart and Buy now at your Shopify, Stripe, Gumroad or WooCommerce link, and the chosen colour, size and quantity are added to the link as ?colour=...&size=...&qty=.... With a plain "#" link it shows a confirmation so you can preview the flow.

**Built for phones and for search**

On a phone the photos come first with thumbnails beneath them, and a sticky Add to cart bar slides up whenever the main button is out of view, so buying is always one tap away. For search engines the section writes Product structured data with the name, description, photos, price, currency, availability and, when you enter them, an aggregate rating.

**Edit and export**

Upload photos in the browser or paste links, edit every label and list, and switch colours, sizes, wishlist, trust badges and the sticky bar on or off. Export one HTML file with the CSS included, a ZIP with your images, a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). Show the rest of your range with the [Product Grid](/website-section-templates/product-grid/), and add navigation with an [Ecommerce Mega Menu](/website-section-templates/mega-menu-columns/).`,
    },
    features: [
      'Gallery with a thumbnail strip, arrows, counter, swipe on touch and Left / Right keys',
      'Hover zoom that follows the pointer on computers',
      'Colour swatches that switch to the photo tagged with that colour, and the reverse',
      'Size buttons as radio buttons, with sold-out sizes struck through and disabled',
      'A message and scroll-to-sizes when Add to cart is pressed without a size',
      'Quantity stepper from 1 to 10',
      'Add to cart and Buy now links that receive ?colour=&size=&qty= from the chosen options',
      'Price with a crossed-out old price, a savings label and a badge on the photo',
      'Star rating with a partly filled star and a review count that links to your reviews',
      'Stock and delivery notes, and up to four trust badges with icons',
      'Details in accessible accordions, with the first one open',
      'Sticky Add to cart bar on phones when the main button scrolls out of view',
      'Wishlist heart with a pressed state',
      'Product structured data with price, currency, availability, photos and ratings',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🛍', title: 'A whole product page in one section', desc: 'Gallery, options, buttons, trust and details are already laid out and styled, so you only add your product.' },
      { icon: '🔗', title: 'Works with your existing checkout', desc: 'Links carry the chosen colour, size and quantity, so any store platform that accepts them can use the section.' },
      { icon: '📱', title: 'Made for buying on a phone', desc: 'A sticky Add to cart bar and swipeable photos keep the main action one tap away on small screens.' },
    ],
    useCases: [
      { icon: '🏬', title: 'Online store product pages', desc: 'Give each product in a small shop a proper page with photos, options, price and trust badges, linked to your payment provider or store platform.' },
      { icon: '🚀', title: 'One-product launch pages', desc: 'Sell a single new product on a dedicated page where the gallery, colours and sticky buy bar do the work of a full store.' },
      { icon: '👕', title: 'Fashion and merchandise', desc: 'Show colours and sizes with sold-out sizes marked, so fans of a band, brand or creator can pick the right item without leaving the page.' },
      { icon: '🧪', title: 'Prototyping a shop design', desc: 'Test how a product page should look and behave before building it in your platform, then export the HTML or the React component.' },
    ],
    faqs: [
      { q: 'Can the Product Detail Page take payments?', a: 'No. It displays the product and links out. Point Add to cart and Buy now at a checkout or payment link from a store platform such as Shopify, Stripe or Gumroad, which handles payment securely.' },
      { q: 'How do colours and the gallery work together?', a: 'Give a gallery photo a colour name that matches a swatch. Choosing the swatch shows that photo, and showing that photo selects the swatch. Photos without a colour name simply do not change the selection.' },
      { q: 'What happens when someone picks a sold-out size?', a: 'Sold-out sizes are marked in the editor, drawn struck through and disabled, so they cannot be chosen. Screen readers hear the size followed by your sold-out wording.' },
      { q: 'Does it add Product structured data?', a: 'Yes. It writes Product data with the name, description, photos, price, currency and availability, plus an aggregate rating when you enter a rating and a review count.' },
      { q: 'How do I connect it to a real cart?', a: 'Put your cart or checkout address in the Add to cart link. The section adds the chosen colour, size and quantity as ?colour=...&size=...&qty=... so a cart script or a store that accepts those parameters can read them.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the product page: add a lightbox for the photos, a size-guide modal, a delivery estimate that depends on the postcode, or a cart drawer that opens when Add to cart is pressed.',
      prompt: `Create a responsive product detail page section in plain HTML, CSS and JavaScript.

- Two columns: a gallery on the left (a vertical thumbnail strip, a 4:5 main photo with previous / next arrows, a counter, swipe on touch and Left / Right keys, and a hover zoom around the pointer) and the buy box on the right. The gallery is sticky while the buy box scrolls.
- Buy box: category, product name, star rating with a partly filled star and review link, price with a crossed-out old price and a "Save $50" label, a short description, colour swatches (radio buttons) and size buttons (radio buttons, sold-out sizes struck through and disabled), a quantity stepper 1-10, an Add to cart link, a ghost Buy now link and a wishlist heart with aria-pressed.
- Choosing a colour shows the photo tagged with that colour, and showing a photo selects its swatch.
- If sizes exist and none is chosen, Add to cart shows an error and scrolls the sizes into view. Otherwise it adds ?colour=...&size=...&qty=... to the link.
- Below: stock and delivery notes, trust badges with icons and details in accordions (the first open).
- On screens under 620 px stack the layout, put thumbnails under the photo and show a sticky Add to cart bar whenever the main button is off screen (IntersectionObserver).
- Add Product JSON-LD with name, image, description, offers (price, priceCurrency, availability) and aggregateRating.`,
    },
  },
};
