/* SEO page content for the ecommerce mega menu sections added on 2026-11-14 (merged into SECTION_SEO
   in seo-content.js). Same shape as every other entry: keywords, about, features, why, 4 use cases
   (18-42 words), 4-5 FAQs and an AI prompt. */

export const MEGA_MENU_SEO = {
  'mega-menu-columns': {
    keywords: ['ecommerce mega menu html css', 'mega menu template', 'online store header', 'dropdown mega menu javascript', 'store navigation with search and cart'],
    about: {
      title: 'Ecommerce Mega Menu — Free Store Header With Link Columns',
      description: `**Ecommerce Mega Menu — Link Columns** is a free, responsive store header with a full-width dropdown for every shop category. A thin top bar carries a delivery message and small links, the main row holds the logo, a search field and account, wishlist and cart icons with a count badge, and the category bar below opens panels of up to three link columns and a featured card with a photo, a tag, a title and a button.

**A menu that opens the way shoppers expect**

Hover a category and its panel opens after a short delay, so a pointer crossing the bar does not make the menu flicker. Click it and the panel stays open until you click again, press Esc or move to another category. Only one panel is open at a time, and a panel that is not needed simply is not there: leave the first column empty and the item becomes a plain link such as Sale or New in.

**Keyboard and screen-reader friendly**

Each category is a real button with aria-expanded and aria-controls. Arrow Down opens a panel and moves focus to its first link, Esc closes it and returns focus to the button, and tabbing out of the panel closes it. Without JavaScript the panels still open on hover and focus, so the links are never locked away.

**Made for phones**

On narrow screens the header collapses into a burger button, the search field drops to its own row, and every category becomes a tap-to-open accordion inside the menu. Link columns stack so nothing needs sideways scrolling.

**Edit it in the browser**

Change the logo, top bar, search placeholder, icon links and cart count, add up to six menu items, write each panel's columns as "Label | URL" lines, and upload a photo for the featured card. Colours, fonts and corner radius come from the shared theme, so the header matches every other section. The menu is also written as SiteNavigationElement data for search engines.

**Export it**

Copy one HTML file with the CSS included, download a ZIP with your images, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). Pair it with the [Product Grid](/website-section-templates/product-grid/) for the shop front and the [Multi-Column Footer](/website-section-templates/footer-columns/) at the bottom of the page.`,
    },
    features: [
      'Store header with a top bar, logo, search form, account, wishlist and cart icons and a cart count badge',
      'Full-width mega menu panels with up to three link columns and a featured image card',
      'Up to six menu items; an item with no links becomes a plain link such as Sale',
      'Hover with an intent delay, click to pin open, one panel open at a time',
      'Arrow Down, Esc and Tab support with aria-expanded and aria-controls kept in sync',
      'Phone layout with a burger menu, a full-width search row and tap-to-open accordions',
      'Sticky header with an optional hide-on-scroll-down',
      'Links written as "Label | URL" lines; unsafe URLs are replaced automatically',
      'Search form that sends visitors to your search page with ?q=',
      'SiteNavigationElement structured data for the main menu',
      'Panels still open on hover and focus without JavaScript',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🛒', title: 'Built like a real store header', desc: 'Search, account, wishlist and cart sit where shoppers look for them, with a badge for the cart count.' },
      { icon: '⌨', title: 'Works without a mouse', desc: 'Buttons, aria attributes and keyboard shortcuts make the menu usable with a keyboard or a screen reader.' },
      { icon: '📱', title: 'Phone-ready panels', desc: 'Every dropdown turns into an accordion on small screens, so large catalogues stay easy to browse.' },
    ],
    useCases: [
      { icon: '🏬', title: 'Stores with many categories', desc: 'Group furniture, kitchenware, electronics and gifts into clear columns so shoppers reach a product in two clicks instead of searching through long lists.' },
      { icon: '🎁', title: 'Seasonal campaigns', desc: 'Use the featured card to promote a sale, a gift guide or a new collection right where shoppers are already browsing categories.' },
      { icon: '🧩', title: 'Marketplace and catalogue sites', desc: 'Give a directory or marketplace a familiar header with search first and categories underneath, with room for a promoted listing in every panel.' },
      { icon: '🧪', title: 'Prototyping a shop redesign', desc: 'Test a new menu structure with real labels and links before building it into your platform, then export the HTML or React component.' },
    ],
    faqs: [
      { q: 'What is a mega menu?', a: 'A mega menu is a large dropdown that shows many links at once, grouped into columns, often with an image. Online stores use it so shoppers can see every sub-category without opening several small menus.' },
      { q: 'How do I make a menu item a plain link?', a: 'Leave the first link column of that item empty. The item then renders as an ordinary link to its own URL, with no dropdown arrow, which suits pages such as Sale or New in.' },
      { q: 'Does the mega menu work on mobile?', a: 'Yes. Below a certain width the header shows a burger button, and each category opens as an accordion inside the menu. The search field moves to its own full-width row.' },
      { q: 'Is the mega menu accessible?', a: 'Each category is a button with aria-expanded and aria-controls. Arrow Down opens a panel, Esc closes it and returns focus, and tabbing out closes it. Without JavaScript the panels open on hover and focus.' },
      { q: 'How does the search form work?', a: 'It is a normal GET form. Set the search page address in the editor and the form sends visitors to that page with their words in the q parameter, which most store platforms understand.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the mega menu: add a live product search with suggestions, show the cart contents in a drawer, or highlight the current category.',
      prompt: `Create a responsive ecommerce header with a mega menu in plain HTML, CSS and JavaScript.

- A thin dark top bar with a message on the left and small links on the right.
- A main row with the logo, a centred pill search form (GET, field name q) and account, wishlist and cart icon links with a small count badge on the cart.
- A category bar below with five items. Two have a full-width dropdown panel with three link columns (small uppercase titles) and a featured image card with a tag, title and button. The others are plain links.
- Hover opens a panel after about 90 ms and closes it 170 ms after the pointer leaves; a click pins it; only one panel is open at a time.
- Each trigger is a button with aria-expanded and aria-controls. Arrow Down opens the panel and focuses its first link, Esc closes it and returns focus, tabbing out closes it, and a click elsewhere closes it.
- On screens under 860 px show a burger button, move the search to its own row and turn the categories into tap-to-open accordions inside a dropdown menu.
- A sticky header with a soft shadow after scrolling. Without JavaScript the panels open on :hover and :focus-within.`,
    },
  },

  'mega-menu-visual': {
    keywords: ['image mega menu', 'visual mega menu template', 'fashion store navigation', 'category tiles dropdown', 'ecommerce header with image menu'],
    about: {
      title: 'Image Mega Menu — Free Visual Store Navigation Template',
      description: `**Ecommerce Mega Menu — Image Tiles** is a free, editorial store header for shops that sell with pictures. The logo sits on the left, the categories in the centre and the search, account, wishlist and cart icons on the right. Open a category and a panel drops down with a heading, a view-all link and up to four large photo tiles, each with its own label and link.

**Let the photos do the navigating**

Fashion, home and lifestyle shoppers choose by looking, not by reading link lists. Each tile is a tall 4:5 photo with a soft gradient and a bold label, and it zooms gently when you point at it. Leave a tile's label empty and it disappears; leave the first tile empty and the item becomes a plain link such as Gifts or Sale.

**Quiet, editorial header**

The header uses upper-case category names with a brand-colour underline that slides in on hover, a warm paper-like background and a thin top bar for delivery news. All of it comes from the shared theme, so switching to a dark or colourful preset restyles the header, the panels and the tiles at once.

**Accessible and responsive**

Categories are buttons with aria-expanded and aria-controls. Arrow Down opens a panel and moves focus to its first tile, Esc closes it and returns focus, and only one panel is open at a time. On phones the header collapses into a burger menu, and each category opens as an accordion with a two-column tile grid.

**Edit and export**

Upload photos for every tile (resized in your browser) or paste image links, rewrite the headings and links, and export one HTML file, a ZIP with your images, a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). For the shop below it, try the [Product Grid](/website-section-templates/product-grid/), and for a search-first header see the [Link Columns Mega Menu](/website-section-templates/mega-menu-columns/).`,
    },
    features: [
      'Centred editorial header: logo left, categories in the middle, icons on the right',
      'Mega menu panels with a heading, a view-all link and up to four 4:5 photo tiles',
      'Search icon, account, wishlist and cart icons with a cart count badge',
      'Plain-link items for pages without a panel, such as Gifts or Sale',
      'Upload tile photos in the browser or paste image links',
      'Hover with intent delay, click to pin, one panel open at a time',
      'Arrow Down, Esc and Tab support with aria-expanded and aria-controls',
      'Phone layout with a burger menu and tap-to-open accordions with two-column tiles',
      'Thin top bar for delivery or sale messages, switchable off',
      'Sticky header with optional hide-on-scroll-down',
      'SiteNavigationElement structured data for the main menu',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🖼', title: 'Navigation that sells', desc: 'Big photo tiles show the range at a glance and invite shoppers into a category before they read a word.' },
      { icon: '🎨', title: 'Matches your brand', desc: 'Colours, fonts and corners come from one theme, so the menu looks like part of your shop, not a plugin.' },
      { icon: '♿', title: 'Keyboard friendly', desc: 'Real buttons, aria attributes and Esc and arrow keys keep the picture-led menu usable for everyone.' },
    ],
    useCases: [
      { icon: '👗', title: 'Fashion and lifestyle stores', desc: 'Show women, men and accessories as large photo tiles, so shoppers pick a department by look and feel rather than by scanning a text list.' },
      { icon: '🛋', title: 'Furniture and home shops', desc: 'Let rooms lead the menu: living room, bedroom, kitchen and office tiles with room photography help customers find the right products quickly.' },
      { icon: '🖨', title: 'Print and gift shops', desc: 'Present collections such as prints, cards and gifts with a representative image each, and link the heading to the full range.' },
      { icon: '📸', title: 'Photographers selling work', desc: 'Give a portfolio site with a shop a gallery-style menu where every category tile shows the best image from that collection.' },
    ],
    faqs: [
      { q: 'How many image tiles can a panel have?', a: 'Up to four tiles per menu item. Leave a tile label empty to hide that tile. If the first tile has no label, the menu item becomes a plain link with no dropdown.' },
      { q: 'What size should the tile photos be?', a: 'Tiles use a 4:5 portrait frame, so photos around 640 by 800 pixels work well. Uploads are resized in your browser, and the crop keeps the middle of the picture.' },
      { q: 'Can I add a search field instead of the search icon?', a: 'This header keeps the centre for the categories and uses a search icon that links to your search page. For a full search field under the logo, use the Link Columns or Department Sidebar mega menu.' },
      { q: 'Does it work with a dark theme?', a: 'Yes. Pick a dark preset or set your own colours in the theme panel. The header, panels, icons and badges all read the same colours, so they restyle together.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the image mega menu: add a hover zoom with a second image, show product counts on each tile, or lazy-load the panel photos.',
      prompt: `Create a responsive store header with an image-tile mega menu in plain HTML, CSS and JavaScript.

- A thin top bar with a delivery message, then a three-column header: logo on the left, five upper-case category links centred, and search, account, wishlist and cart icons on the right (cart has a count badge).
- Two categories open a full-width panel with a heading, a "View all" link and four 4:5 photo tiles with a bottom gradient and a bold label that zoom slightly on hover. The other categories are plain links.
- Hover opens a panel after about 90 ms; a click pins it; only one panel is open at a time. Triggers are buttons with aria-expanded and aria-controls; Arrow Down focuses the first tile, Esc closes and returns focus.
- Below 860 px use a burger button and turn the categories into accordions with a two-column tile grid.
- Warm off-white background, a brand-colour underline that slides in under the active category, and a sticky header.`,
    },
  },

  'mega-menu-departments': {
    keywords: ['department mega menu', 'all categories dropdown', 'marketplace navigation menu', 'sidebar mega menu html css', 'big catalogue store navigation'],
    about: {
      title: 'Department Mega Menu — Free All Categories Dropdown Template',
      description: `**Ecommerce Mega Menu — Department Sidebar** is a free navigation template for shops with big catalogues. Under a search header sits an "All categories" button; open it and one large panel appears with a list of departments on the left and, on the right, the sub-category columns and a featured card of the department you are pointing at. Quick links such as Deals, New in and Gift cards sit beside the button.

**The marketplace pattern, done properly**

Department stores and marketplaces have too many categories for a row of tabs. A vertical list of departments, each with an icon, scales to eight categories while the right side shows three link columns, a view-all link and a promotion for the active one. Hover, focus or click a department to switch panes; Arrow Up and Down move between them, and the first department starts active so the panel is never empty.

**Search first**

Most shoppers of large catalogues start with search, so the search form takes the centre of the header, with account, wishlist and cart icons and a cart count on the right. The form is a plain GET form that sends visitors to your search page with their words in the q parameter.

**Responsive and accessible**

The All categories control is a real button with aria-expanded and aria-controls, Esc closes the panel and returns focus, and tabbing out closes it. On phones the button becomes the first row of the burger menu and the departments turn into chips above the active department's links, so the whole catalogue stays reachable with a thumb.

**Edit and export**

Add up to eight departments with an icon, three link columns written as "Label | URL" lines and a featured card with a photo. Edit the quick links, the button text and the top bar, and the theme restyles everything at once. The departments are also written as SiteNavigationElement data. Export one HTML file, a ZIP with images, a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). See also the [Link Columns Mega Menu](/website-section-templates/mega-menu-columns/) for a row of category dropdowns.`,
    },
    features: [
      'All categories button that opens one large panel under the header',
      'Vertical department list with icons; hover, focus or click switches the pane',
      'Each pane has a title, a view-all link, up to three link columns and a featured image card',
      'Up to eight departments, edited as a list with "Label | URL" link lines',
      'Quick links beside the button, such as Deals, New in and Gift cards',
      'Search form, account, wishlist and cart icons with a cart count badge',
      'Arrow Up and Down move between departments; Esc and Tab close the panel',
      'aria-expanded and aria-controls kept in sync on the button and tabs',
      'Phone layout: the button joins the burger menu and departments become chips',
      'Sticky header with optional hide-on-scroll-down and a switchable top bar',
      'SiteNavigationElement structured data for the departments',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🗂', title: 'Scales to a big catalogue', desc: 'Eight departments with three columns each fit in one panel, so even large shops stay browsable.' },
      { icon: '🔎', title: 'Search comes first', desc: 'A prominent search field sits in the header, because shoppers of large catalogues usually start there.' },
      { icon: '⌨', title: 'Fully keyboard operable', desc: 'Buttons, aria attributes and arrow-key navigation between departments make the panel usable without a mouse.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Marketplaces and multi-vendor shops', desc: 'Organise dozens of product categories into departments, with a promoted brand or seller card for the department a shopper is browsing.' },
      { icon: '🔌', title: 'Electronics and hardware stores', desc: 'Let shoppers jump from audio to smart home to accessories in one panel, with the three link columns showing the sub-categories that matter.' },
      { icon: '🥦', title: 'Grocery and household retailers', desc: 'Use icons and short sub-category lists for aisles such as fresh, pantry and cleaning, and promote weekly deals in the featured card.' },
      { icon: '🏢', title: 'Business supply catalogues', desc: 'Give buyers a dependable department list with quick links to quotes, order history and help, beside the all-categories button.' },
    ],
    faqs: [
      { q: 'How many departments can I add?', a: 'Up to eight. Each has an icon, a title, a view-all link, three link columns and an optional featured card. For fewer, bigger categories, the Image Tiles mega menu may suit better.' },
      { q: 'How does the department list switch panes?', a: 'Hovering, focusing or clicking a department activates its pane. Arrow Up and Down move between departments. The first department is active by default, so the panel never opens empty.' },
      { q: 'What happens on a phone?', a: 'The All categories button becomes the first row of the burger menu. Opening it shows the departments as chips with the active department links beneath, followed by the quick links.' },
      { q: 'Can I remove the quick links or the top bar?', a: 'Yes. Empty the quick links field to hide that row, and switch off the top bar group to remove the thin bar above the header.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the department menu: add product counts to each department, a recently viewed row in the panel, or a second level of links that opens on hover.',
      prompt: `Create a department mega menu for a large online store in plain HTML, CSS and JavaScript.

- A header with logo, a pill search form (GET, field q) and account, wishlist and cart icons (cart has a count badge), and under it a bar with a blue "All categories" button with a hamburger icon, then quick links Deals, New in, Gift cards and Help.
- The button opens a full-width panel with a vertical list of five departments (each with an icon and a chevron) on the left and, on the right, the active department's title, a "View all" link, three link columns and a featured image card.
- Hovering, focusing or clicking a department switches the pane; Arrow Up and Down move between departments; the first department is active when the panel opens.
- The button has aria-expanded and aria-controls. Esc closes the panel and returns focus; tabbing out or clicking elsewhere closes it.
- Below 860 px turn the departments into pill chips above the active pane inside a burger menu.`,
    },
  },
};
