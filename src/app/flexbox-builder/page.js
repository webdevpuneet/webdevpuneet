import FlexboxBuilderTool from '@/components/FlexboxBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Flexbox Generator — Free Visual Flexbox Layout Builder Online | webdevpuneet.com',
  description: 'Free visual CSS Flexbox builder. Control every flex property with live preview. Export production-ready CSS, SCSS, Tailwind, or React code instantly. No sign-up needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/flexbox-builder/' },
  icons: { icon: '/icons/flexbox-builder.svg', shortcut: '/icons/flexbox-builder.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/flexbox-builder/', siteName: 'webdevpuneet.com', title: 'CSS Flexbox Generator — Visual Flexbox Layout Builder', description: 'Visual CSS Flexbox editor — control every flex property with live preview, export CSS, SCSS, Tailwind, or React. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/flexbox-builder-preview.png', width: 1200, height: 630, alt: 'CSS Flexbox Generator' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Flexbox Generator — Visual Layout Builder', description: 'Visual CSS Flexbox editor with live preview. Export CSS, SCSS, Tailwind, or React code. Free, no sign-up.', images: ['https://webdevpuneet.com/images/flexbox-builder-preview.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between justify-content and align-items?', acceptedAnswer: { '@type': 'Answer', text: 'justify-content aligns flex items along the main axis — horizontally for flex-direction: row, vertically for flex-direction: column. align-items aligns items along the cross axis (perpendicular to the main axis) — vertically for a row container, horizontally for a column container. A common mistake: adding justify-content: center to try to vertically center items in a row container. That\'s what align-items: center does.' } },
    { '@type': 'Question', name: 'What does flex-grow do and when should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'flex-grow controls how much a flex item expands into available space relative to its siblings. flex-grow: 1 on one item and flex-grow: 2 on another means the second takes twice as much of the remaining space. flex-grow: 0 (default) means the item does not grow beyond its natural size. The most common use case: a navigation bar where one item has flex-grow: 1 to push everything else to the edges.' } },
    { '@type': 'Question', name: 'Why are my flex items not wrapping to the next line?', acceptedAnswer: { '@type': 'Answer', text: 'By default, flex-wrap is "nowrap" — items stay on one line and shrink or overflow rather than wrapping. Set flex-wrap: wrap to allow items to move to a new line when the container is too narrow. You usually also need a flex-basis on each item (e.g. 280px) to define the target size before wrapping kicks in. Without flex-basis, items won\'t have a reference size to trigger wrapping.' } },
    { '@type': 'Question', name: 'How do I center content both horizontally and vertically with Flexbox?', acceptedAnswer: { '@type': 'Answer', text: 'Set display: flex, justify-content: center, and align-items: center on the container, and make sure the container has an explicit height (or min-height). This is the standard CSS centering pattern — it works for a single item or multiple items.' } },
    { '@type': 'Question', name: 'When should I use Flexbox vs CSS Grid?', acceptedAnswer: { '@type': 'Answer', text: 'Flexbox is for one-dimensional layouts — navbars, button groups, card rows, centering content. Grid is for two-dimensional layouts where you control rows and columns simultaneously. Most UIs use both: Grid for the overall page structure and Flexbox inside individual components.' } },
    { '@type': 'Question', name: 'How do I get Tailwind flexbox classes from this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Configure the layout using the visual controls, then click the Tailwind tab in the export panel. It generates the equivalent utility classes — for example flex flex-row justify-between items-center gap-4 — and per-item classes like grow, shrink-0, or self-end. Copy and paste directly into a className attribute.' } },
    { '@type': 'Question', name: 'What does flex-shrink: 0 do?', acceptedAnswer: { '@type': 'Answer', text: 'flex-shrink: 0 prevents a flex item from shrinking below its natural size when the container is too small. The default is 1, meaning all items shrink equally. Setting flex-shrink: 0 is useful for fixed-size elements like logos, avatars, or icons that should never compress regardless of how narrow the container gets.' } },
    { '@type': 'Question', name: 'What does align-self do and how is it different from align-items?', acceptedAnswer: { '@type': 'Answer', text: 'align-items is set on the flex container and applies to all flex children simultaneously. align-self is set on an individual flex item and overrides the container\'s align-items value for that specific item only. For example, a container might have align-items: center to center most items vertically, while one item has align-self: flex-end to sit at the bottom of the row. This is useful for hero sections where the text content is centered but a decorative image needs to align to the bottom edge.' } },
    { '@type': 'Question', name: 'How does the gap property work in Flexbox?', acceptedAnswer: { '@type': 'Answer', text: 'gap (formerly grid-gap) adds space between flex items — it applies to the space between items only, not the outer edges of the container. gap: 16px sets equal spacing in both directions. gap: 12px 24px sets row gap (cross-axis) and column gap (main-axis) separately. Gap is now universally supported in all modern browsers and is preferred over using margin on each child because it doesn\'t require negative margin hacks for the first or last item. Combine with flex-wrap: wrap for responsive card grids where the spacing stays consistent as cards wrap to new rows.' } },
    { '@type': 'Question', name: 'How do I make a Flexbox navbar with the logo on the left and links on the right?', acceptedAnswer: { '@type': 'Answer', text: 'Set the navbar container to display: flex; justify-content: space-between; align-items: center. The logo on the left and the link group on the right will sit at opposite ends of the row automatically. For a nav with a logo in the center, use a three-part structure with CSS grid (1fr auto 1fr) instead of Flexbox. If you want one item to push all others to the right side, give that item margin-right: auto — this causes it to consume all remaining space and push subsequent items to the far right edge.' } },
    { '@type': 'Question', name: 'Can I use Flexbox inside a CSS Grid cell?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, and this is a common and recommended pattern. Use CSS Grid for the outer page structure — the header, sidebar, main content, and footer positions. Inside each grid cell, use Flexbox for the component-level layout — centering the content inside a card, distributing links in a navbar, or stacking form fields vertically. The two systems are fully composable: a grid item can be a flex container, and a flex item can be a grid container. Grid controls the large-scale layout; Flexbox handles the small-scale arrangement within each component.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Flexbox Generator',
  url: 'https://webdevpuneet.com/flexbox-builder/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free — Visual CSS Flexbox layout builder with live preview and CSS, SCSS, Tailwind, React export.',
  featureList: ['Visual flex container controls', 'Per-item flex properties', 'Live preview', 'Export CSS/SCSS/Tailwind/React', 'Add/remove flex items', 'Reset to defaults'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Flexbox Builder', item: 'https://webdevpuneet.com/flexbox-builder/' },
  ],
};

const SEO = {
  slug: 'flexbox-builder',
  title: 'CSS Flexbox Generator — Visual Flexbox Layout Builder',

  about: {
    title: 'Visualize Every Flexbox Property — Then Export CSS, Tailwind, or React Code',
    description: `You know you need \`justify-content: space-between\` for the navbar, but you can't remember if \`align-items\` or \`align-content\` controls the vertical position, or what \`flex-grow: 1\` actually does when one sibling has \`flex-grow: 2\`. Stop guessing — adjust each property with the visual chip controls and see the result in the live canvas immediately. The mental model builds itself from watching the items move rather than reading abstract property descriptions.\n\nThe tool covers the **full flex model in two layers**. Container properties — \`flex-direction\` (row or column), \`flex-wrap\` (nowrap, wrap, wrap-reverse), \`justify-content\` (six options from flex-start to space-evenly), \`align-items\` (five options from stretch to baseline), \`align-content\` (six options for multi-line containers), \`gap\`, \`padding\`, and \`min-height\` — control the overall layout. Add up to as many items as you need using the + button in the toolbar, then click any item to select it and adjust its **per-item properties**: \`flex-grow\` (0–6), \`flex-shrink\` (0–6), \`flex-basis\` (auto, 0, or fixed sizes), \`align-self\` (overrides the container for just this item), and \`order\` (visual reordering without touching HTML). Each property has a live label showing the current value, and each item is color-coded from a fixed seven-color palette so you can track it visually as you change its order or basis.\n\nThe code generator is not a static template — it walks your current state and writes a property line only when the value differs from the CSS default, so a fresh three-item row with no customization exports as a bare four-line \`display: flex\` rule, while a heavily customized layout with mixed grow, shrink, and basis values per item produces a rule only for the items that actually need one. This mirrors how you'd hand-write the CSS yourself instead of dumping every property with its default value. When the layout looks right, switch to the export panel and copy the code in your preferred format: plain **CSS** with a \`.container\` rule and per-item rules only for items with non-default properties, **SCSS** with nested \`& > .item-N\` selectors instead of flat class rules, **Tailwind** HTML with utility classes like \`flex flex-row justify-between items-center gap-4\` translated from your pixel values through a lookup table (falling back to arbitrary-value brackets like \`gap-[18px]\` for sizes outside Tailwind's default scale), or a **React** inline style object with camelCased property names. Drag the resize handle above the code panel to expand it vertically and read longer outputs without scrolling. Everything runs 100% in your browser with no data uploaded — nothing is computed or rendered on a server.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Set container direction and wrapping',
        text: 'In the Container section of the left panel, click the `flex-direction` chip buttons to choose row (horizontal — the default) or column (vertical). If you want items to wrap onto a second line when the container is too narrow, click `flex-wrap: wrap`. The live canvas reflects both settings immediately.',
      },
      {
        title: 'Configure main-axis and cross-axis alignment',
        text: 'Click a `justify-content` chip to control how items are distributed along the main axis — `flex-start` packs items to the left in a row, `center` centers them, `space-between` spreads them to both edges, `space-around` adds equal space around each. Then click an `align-items` chip to control cross-axis alignment — `center` vertically centers items in a row container, `stretch` (default) makes items fill the container height.',
      },
      {
        title: 'Adjust gap, padding, and container height',
        text: 'Drag the `gap` slider to set spacing between items (0–64px). Drag `padding` to add internal padding to the container. Drag `min-height` to control how tall the container is — this matters for testing vertical alignment. All three sliders update the live preview in real time.',
      },
      {
        title: 'Add or remove flex items',
        text: 'Use the − and + buttons in the toolbar above the preview to remove or add flex items. The canvas reflows immediately with each addition. Items are color-coded so you can distinguish them at a glance. Click any item to select it — a selection ring highlights the chosen item and the left panel switches to show that item\'s individual properties.',
      },
      {
        title: 'Configure per-item flex properties',
        text: 'With an item selected, the Item Properties panel shows `flex-grow` (how much the item expands), `flex-shrink` (how much it compresses), `flex-basis` (its starting size — choose from auto, 0, 60px, 100px, 150px, 200px), `align-self` (overrides the container\'s align-items for this item only), and `order` (visual position without changing HTML order). All changes apply to the selected item only.',
      },
      {
        title: 'Export in your preferred format',
        text: 'Click the CSS, SCSS, HTML, Tailwind, or React tab in the code panel at the bottom of the page. CSS outputs a clean `.container { display: flex; ... }` rule and per-item rules only for items with non-default properties. Tailwind outputs an HTML snippet with utility classes like `flex flex-row justify-between items-center gap-4`. React outputs inline style props. Click Copy to copy the output to clipboard.',
      },
      {
        title: 'Reset and repeat',
        text: 'Click the ↺ Reset button in the toolbar to restore all container and item properties to their defaults. This is useful when you want to start fresh after exploring a layout. The canvas, code panel, and all controls return to the initial state with three default items and a row direction.',
      },
    ],
  },

  features: [
    'Container controls — flex-direction, flex-wrap, justify-content, align-items, align-content, gap',
    'Per-item controls — flex-grow, flex-shrink, flex-basis, order, align-self',
    'Add and remove flex items dynamically in the live preview',
    'Live preview updates in real time with every property change',
    'Export as CSS rule block, SCSS nesting, Tailwind utility classes, or React style object; convert to Tailwind with our [CSS to Tailwind](/css-to-tailwind/) converter',
    'Tooltip on every property label explaining what the property does',
    'Reset to defaults in one click',
    '100% browser-based — no data sent to a server; for two-dimensional layouts use our [CSS Grid Builder](/css-grid-builder)',
  ],

  useCases: [
    {
      icon: '▦',
      title: 'Understand what justify-content vs align-items actually does',
      desc: 'The interaction between main-axis and cross-axis properties is hard to reason about in code. Toggle justify-content from "center" to "space-between" and align-items from "stretch" to "center" and see the live preview change immediately — building the mental model you can\'t get from reading MDN.',
    },
    {
      icon: '⊞',
      title: 'Build a navbar with logo left and links right',
      desc: 'Set flex-direction: row, justify-content: space-between, align-items: center, and gap. The classic navigation bar pattern is ready to export as CSS or Tailwind classes in seconds — no trial and error in DevTools.',
    },
    {
      icon: '⇄',
      title: 'Create a responsive card row that wraps without media queries',
      desc: 'Set flex-wrap: wrap, flex-basis: 280px on each item, and flex-grow: 1. Cards fill available width and wrap to the next line automatically at narrow viewports — no breakpoints required. Use our [CSS Clamp Generator](/css-clamp-generator) for fluid spacing between the cards.',
    },
    {
      icon: '✦',
      title: 'Center content both horizontally and vertically',
      desc: 'Add justify-content: center and align-items: center to a flex container. This builder generates that pattern instantly and shows how it responds when you add items or change the container height.',
    },
    {
      icon: '≡',
      title: 'Get Tailwind flexbox classes without looking them up',
      desc: 'Configure the layout visually, switch to the Tailwind export tab, and copy classes like `flex flex-row justify-between items-center gap-4`. Paste directly into a className prop — no Tailwind docs search needed.',
    },
    {
      icon: '◎',
      title: 'Debug a flex layout that isn\'t behaving as expected',
      desc: 'Reproduce your container and item structure here — add the same number of items, same flex-basis, same wrap settings — and adjust properties until the preview matches what you want. Then compare the generated CSS to what your stylesheet actually has. Preview the result across screen sizes with our [Responsive Preview Tool](/responsive-preview-tool/).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function FlexboxBuilderPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><FlexboxBuilderTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
