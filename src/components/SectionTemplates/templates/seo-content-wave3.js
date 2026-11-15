/* SEO page content for the sections added on 2026-11-15: Loyalty Stamp Card, Shop the Look, Collection Tiles (merged into SECTION_SEO in seo-content.js).
   Same shape as every other entry: keywords, about, 8+ features, 3 reasons, 4 use cases (18-42 words), 4-5 FAQs and an AI prompt. */

export const WAVE3_SEO = {
  'loyalty-card': {
    keywords: ['loyalty card html', 'stamp card template', 'coffee shop loyalty card', 'rewards card section', 'punch card website'],
    about: {
      title: 'Loyalty Stamp Card — Free Rewards Card Section',
      description: `**Loyalty Stamp Card** is a "collect eight stamps, get one free" card that visitors can actually play with. A grid of round stamps fills one by one as they press the button, a progress line says how many are left, and the last stamp turns into the reward. Beside it sit a heading, a short explanation and three "how it works" steps, so the scheme is understood in a few seconds.

**A card that remembers**

The card keeps its progress in the visitor's own browser, so the stamps are still there on the next visit. Nothing is sent to a server and there is no sign-up. If the browser blocks storage, for example in a private window, the card simply starts again from the number you chose. When every stamp is filled the message changes, the button is disabled and a "Start a new card" button appears.

**Make it yours**

Choose 6, 8, 10 or 12 stamps, set how many are already collected on a new visitor's card, and pick the symbol: a coffee cup, a scissors emoji, a letter. The last stamp carries its own label such as FREE. Every message uses plain text fields, including the progress line, where {n} and {t} are replaced by the numbers, so the card works in any language.

**Demo or display**

Keep the "Add a stamp" button on for a website where visitors try the card, or turn the demo buttons off to show a fixed card that only illustrates your scheme. The stamps are real list items with screen reader labels, the progress message is announced politely, and the pop animation is skipped for visitors who prefer reduced motion.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). It sits well after a [menu or product grid](/website-section-templates/product-grid/) and before a [newsletter sign-up](/website-section-templates/cta-newsletter/), and it is used in the Cafe & Coffee Shop website template.

**Getting the most from it**

Keep the goal reachable: eight stamps for a free drink is easier to finish than twenty. Say what counts as a stamp, put the card near the menu, and train staff to mention it when someone orders. A real stamp card at the counter or a loyalty tool should back the page up, because this section is a demonstration and not a customer account system.`,
    },
    features: [
      'Interactive stamp card: press the button to add a stamp',
      '6, 8, 10 or 12 stamps with a reward stamp at the end',
      'Progress saved in the visitor’s browser',
      'Progress message with {n} and {t} placeholders',
      'Card complete message and a "Start a new card" button',
      'Any emoji or letter as the stamp symbol',
      'Three "how it works" steps with icons',
      'Demo buttons can be switched off for a fixed card',
      'Screen reader labels, polite progress announcements and reduced-motion support',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '☕', title: 'Rewards in seconds', desc: 'Visitors see how the scheme works by trying the card, which is clearer than a paragraph of rules.' },
      { icon: '🔁', title: 'A reason to return', desc: 'A card that is already part-full makes people want to finish it, and it remembers where they got to.' },
      { icon: '🛠️', title: 'No backend needed', desc: 'It runs in the browser with no account system, so a small café can add a rewards page the same day.' },
    ],
    useCases: [
      { icon: '☕', title: 'Café or coffee shop', desc: 'Show the "eighth drink is free" scheme on your homepage or menu page, with a card that fills as visitors try it and a clear reward at the end.' },
      { icon: '🥐', title: 'Bakery or juice bar', desc: 'Offer a free pastry or smoothie after ten visits, using a pastry or fruit symbol, and explain in three steps how stamps are earned at the counter.' },
      { icon: '💈', title: 'Salon or barber', desc: 'Reward regulars with a free trim after six visits, and place the card beside your booking section so loyalty is part of the first impression.' },
      { icon: '🛍️', title: 'Small shop', desc: 'Describe a simple points-free scheme for your shop, such as every tenth purchase earning a gift, with the card as a friendly illustration.' },
    ],
    faqs: [
      { q: 'Is this a real loyalty system?', a: 'No. It is a front-end demonstration that remembers progress in the visitor’s own browser. Use it to explain your scheme, and back it with real stamp cards or a loyalty tool in your shop.' },
      { q: 'Where is the progress saved?', a: 'In the browser’s local storage, per card name and stamp count. Clearing site data or using a private window starts the card again from the starting number you set.' },
      { q: 'Can I change the number of stamps and the reward?', a: 'Yes. Pick 6, 8, 10 or 12 stamps, change the stamp symbol, the label on the last stamp, the reward line and every message, including the progress text.' },
      { q: 'Can I show the card without the add button?', a: 'Yes. Turn off the demo buttons and the card becomes a fixed illustration showing the number of collected stamps you set, which suits a simple explanation.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to connect the card to real data: load a customer’s stamp count from your own API, add a QR code the staff scan to add a stamp, or send an email when the card is full.',
      prompt: `Create a loyalty stamp card section in HTML, CSS and JavaScript.

- Two columns: on the left a heading, a short paragraph and three "how it works" steps with icons; on the right a brown gradient card titled "Daily Grind Rewards" with a grid of 8 round stamps (4 per row).
- Empty stamps are dashed circles with a number; collected stamps are solid white circles with a coffee cup; the last stamp is gold and says FREE.
- A progress line "3 of 8 stamps collected" (aria-live polite) and a button "Add a stamp". Each press fills the next stamp with a short pop animation (skip it when prefers-reduced-motion is set).
- When all stamps are full show "Card complete! Show it at the counter for your free drink.", disable the add button and show a "Start a new card" button.
- Save the count in localStorage inside try/catch. Stack into one column on narrow screens.`,
    },
  },
  'shop-the-look': {
    keywords: ['shop the look html', 'lookbook hotspots', 'shoppable image', 'fashion lookbook section', 'product hotspots on photo'],
    about: {
      title: 'Shop the Look — Free Lookbook With Product Hotspots',
      description: `**Shop the Look** turns one styled photograph into a small shop. Dots sit on the garments in the picture; tap or hover one and a card opens with the product photo, name, price and an Add to cart button that fills the same cart as the rest of your store. It is the pattern fashion and interiors brands use on campaign pages, in a section you can edit and export.

**Place the dots with two numbers**

Each hotspot has a "from the left" and a "from the top" value, written as a percentage of the photo, so a dot stays on the jacket however large the picture is shown. The cards open to the left for dots on the right side of the photo and upwards for dots near the bottom, so they never run off the picture.

**Works with the built-in cart**

When the page also has the cart drawer, the Add to bag button adds the item and opens the drawer. Without it, the button is an ordinary link to your product page or payment link. On a phone a tap opens a card and a second tap, a tap elsewhere or Escape closes it; with a mouse the card also opens on hover.

**Accessible by design**

Every dot is a real button with a text label and an expanded state, the cards can be reached with the keyboard, and the pulsing ring around each dot stops for visitors who prefer reduced motion. Add a clear description of the photo as alt text.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). It pairs well with the [Product Strip](/website-section-templates/product-strip/) and the [Collection Tiles](/website-section-templates/collection-tiles/).

**Getting the most from it**

Choose a photo where every product is clearly visible, tag no more than four or five items, and only tag things that are in stock. Link each card to the real product page, and keep the heading about the occasion ("the weekend look") rather than the products.`,
    },
    features: [
      'Lookbook photo with up to six tappable hotspots',
      'Dots placed by percent from the left and the top',
      'Product card with photo, name, price and Add to bag',
      'Fills the same cart as the rest of the shop',
      'Cards flip left and upwards near the photo edges',
      'Opens on tap, click or hover; closes with Escape or an outside click',
      'Heading, text and button beside the photo',
      'Pulsing dots stop for reduced motion',
      'Button labels and screen reader text editable',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '👗', title: 'Inspire, then sell', desc: 'Shoppers see the whole outfit first and buy the pieces they like without leaving the photo.' },
      { icon: '🛍️', title: 'Cart included', desc: 'Add to bag fills the same cart as your other product sections, so there is no second checkout to build.' },
      { icon: '📱', title: 'Made for touch', desc: 'Tap to open, tap again to close. The cards stay inside the picture on small screens.' },
    ],
    useCases: [
      { icon: '👗', title: 'Fashion lookbook', desc: 'Tag the jacket, top and shoes in a campaign photo so shoppers can add the full outfit to their bag from one image on your home page.' },
      { icon: '🛋️', title: 'Styled room', desc: 'Tag the sofa, lamp and rug in a photographed living room, with prices on each card, to help shoppers buy a complete look in one visit.' },
      { icon: '💍', title: 'Gift guide', desc: 'Show a set table or a gift flat lay with tags on each item, and link every card to its product page for a quick seasonal gift guide.' },
      { icon: '🏋️', title: 'Sports kit', desc: 'Photograph an athlete in full kit and tag the shoes, top and bag, so visitors can buy the pieces they need for the same sport.' },
    ],
    faqs: [
      { q: 'How do I place the dots on the photo?', a: 'Each hotspot has two numbers: how far it is from the left and from the top, as a percentage of the picture. Start at 50 and 50 for the centre and adjust until the dot sits on the item.' },
      { q: 'Does Add to bag work without the cart drawer?', a: 'With the built-in cart switched on, the item is added to the shared cart. Without it, the button is a normal link, so point it at your product page or payment link.' },
      { q: 'How many products can I tag?', a: 'Up to six. More than four or five makes a photo crowded, so choose the pieces that matter most and send the rest to your shop.' },
      { q: 'Does it work on phones?', a: 'Yes. A tap opens a product card, and a tap elsewhere or on the dot again closes it. With a mouse, the card also opens on hover.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the section: load the looks from your own API, add a "Shop the full look" button that adds every tagged item at once, or add a second look with a tab switcher.',
      prompt: `Create a "shop the look" section in HTML, CSS and JavaScript.

- Two columns: a portrait lookbook photo (4:5) on the left and a heading, short paragraph and button on the right.
- On the photo, add 2 to 6 round white hotspot buttons positioned with data-x and data-y percentages (left and top), each with a "+" icon that rotates to "x" when open and a soft pulsing ring (disabled for prefers-reduced-motion).
- Clicking or tapping a hotspot opens a small card next to it with a product thumbnail, name, price and an "Add to bag" button. Hovering also opens it with a mouse. Clicking elsewhere or pressing Escape closes it. Hotspots in the right half open the card to the left; hotspots in the lower half open upwards.
- Use aria-expanded on the buttons, and stack into one column on narrow screens.`,
    },
  },
  'collection-tiles': {
    keywords: ['shop by category section', 'collection tiles html', 'category cards ecommerce', 'fashion category tiles', 'image tiles with hover zoom'],
    about: {
      title: 'Collection Tiles — Free Shop by Category Section',
      description: `**Collection Tiles** is the row of tall photo tiles that sends shoppers into the right part of your shop: Women, Men, Shoes, Accessories. Each tile is a photograph with the collection name over a soft gradient, a short line such as "44 pairs" and an arrow, and the whole tile is a single link, which makes it easy to hit on a phone.

**Two to six tiles, any layout**

Add between two and six tiles. On a wide screen they sit side by side at a 4 by 5 ratio, and as the screen narrows they wrap, ending as two across on a phone. The photos are cropped to fit, so you can use any portrait picture; use the focus point if a face or product is cut off.

**Calm motion**

On hover or keyboard focus the photograph zooms slowly and the arrow slides a few pixels. Visitors who prefer reduced motion see no movement at all, and every tile has a visible focus outline.

**Links that work with the shop**

Point each tile at a filtered shop view, for example the Shop page with a category in the address, or at a collection page. In the Fashion Boutique website template the tiles link to filtered shop pages in the multi-page version.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with the [Product Strip](/website-section-templates/product-strip/) for best sellers and the [Shop the Look](/website-section-templates/shop-the-look/) section for outfits.

**Getting the most from it**

Use photographs with the same lighting and background so the row feels like a set, keep names to one or two words, and show real item counts that you update. Lead with the collection most visitors want.`,
    },
    features: [
      'Two to six tall photo tiles, 4 by 5',
      'Collection name, short line and arrow over a gradient',
      'The whole tile is one link',
      'Slow photo zoom on hover and keyboard focus',
      'Responsive: wraps down to two across on phones',
      'Visible focus outline for keyboard users',
      'Reduced-motion friendly',
      'Optional heading and intro text',
      'Image focus point for cropped photos',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🧭', title: 'Fast navigation', desc: 'Big, clear photographs let shoppers pick a category in one glance, before they use search or the menu.' },
      { icon: '🖼️', title: 'Looks like a campaign', desc: 'Tall photo tiles give a plain category list the feel of a magazine page.' },
      { icon: '📱', title: 'Easy to tap', desc: 'Every tile is one large link, so phone users never have to aim at a tiny word.' },
    ],
    useCases: [
      { icon: '👗', title: 'Fashion store', desc: 'Lead your home page with Women, Men, Shoes and Accessories tiles, each linking to a filtered shop view, so shoppers reach the right range in one tap.' },
      { icon: '🛋️', title: 'Homeware shop', desc: 'Show Living, Bedroom, Kitchen and Garden tiles with room photographs and item counts, so visitors can browse by room instead of product type.' },
      { icon: '🎁', title: 'Gift shop', desc: 'Offer tiles for Birthdays, Weddings, New baby and Thank you, with a warm photograph each, so gift buyers can start from the occasion.' },
      { icon: '🌿', title: 'Plant nursery', desc: 'Split a catalogue into Indoor, Outdoor, Pots and Care with pictures of each, and update the item counts as the season changes.' },
    ],
    faqs: [
      { q: 'How many tiles can I have?', a: 'Between two and six. Four tiles look best on a desktop in a single row, and the grid wraps neatly to two across on phones.' },
      { q: 'What size should the photos be?', a: 'Portrait photos around 800 by 1000 pixels (4 by 5) work best. They are cropped to fit, and you can set a focus point if something important is cut off.' },
      { q: 'Can I link the tiles to filtered shop pages?', a: 'Yes. Each tile has its own link, so point it at a collection page or a shop page that filters by category in the address.' },
      { q: 'Does the zoom effect respect reduced motion?', a: 'Yes. Visitors who ask their device for reduced motion see no zoom or arrow movement. The tiles still show a clear outline when focused by keyboard.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to build on the tiles: load collections from your own API, show the live item count for each, or highlight a "new" collection with a badge.',
      prompt: `Create a "shop by collection" section in HTML and CSS.

- A heading, then a responsive grid of 4 tall tiles (aspect-ratio 4/5, auto-fit with a 220px minimum, two across on phones).
- Each tile is one link containing a cover photo, a dark gradient from the bottom, the collection name in a serif font, a small count line ("120 pieces") and a white round arrow button at the bottom right.
- On hover or keyboard focus the photo scales to 1.07 over 0.7s and the arrow moves 4px right; disable both under prefers-reduced-motion.
- Show a 3px focus outline on keyboard focus.`,
    },
  },
};
