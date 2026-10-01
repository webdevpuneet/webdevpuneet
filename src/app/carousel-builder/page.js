import CarouselBuilderTool from '@/components/CarouselBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = {
  url: 'https://webdevpuneet.com/images/carousel-builder.png',
  secureUrl: 'https://webdevpuneet.com/images/carousel-builder.png',
  width: 1200,
  height: 800,
  alt: 'Free Online Carousel Builder — Generate HTML, CSS, JavaScript & React Slider Code',
  type: 'image/png',
};

export const metadata = {
  title: 'Carousel Builder — Free HTML CSS JS & React Slider Code Generator | webdevpuneet.com',
  description: 'Free online carousel builder — generate clean HTML, CSS, JS, and React slider code with autoplay and multi-item view. No libraries, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/carousel-builder/' },
  icons: {
    icon: '/icons/carousel-builder.svg',
    shortcut: '/icons/carousel-builder.svg',
    apple: '/icons/carousel-builder.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/carousel-builder/',
    siteName: 'webdevpuneet.com',
    title: 'Carousel Builder Online — HTML CSS JS & React Slider Code Generator',
    description: 'Free — Build a carousel visually and export production-ready HTML, CSS, JavaScript, or React code in seconds. No libraries required. Horizontal & vertical, multi-item, autoplay.',
    images: [OG_IMAGE],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: 'Carousel Builder Online — HTML CSS JS & React Slider Generator',
    description: 'Generate clean carousel/slider code instantly — HTML, CSS, JS, or React. Horizontal or vertical, 1–6 items, autoplay. No libraries, no sign-up.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I create a carousel in HTML, CSS, and JavaScript for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use this free Carousel Builder tool. Configure your slides, choose transition type, direction, and styles in the left panel, then select the HTML, CSS, or JS tab below the preview and click Copy or Download. The generated HTML uses semantic <ul>/<li> elements with BEM class names, the CSS uses custom properties for easy theming, and the JavaScript is a dependency-free ES6 Carousel class — no jQuery, no npm packages needed.' },
    },
    {
      '@type': 'Question',
      name: 'Can I generate a React carousel component without installing a library?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select the React tab in the export bar and copy the generated code. Save it as Carousel.jsx and download the CSS export as carousel.css in the same folder — the component imports it automatically. The component is a self-contained React functional component using useState, useEffect, and useRef hooks, compatible with React 18+. No external carousel library is required.' },
    },
    {
      '@type': 'Question',
      name: 'How do I make a vertical carousel slider with CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'In the Transition section, set Direction to Vertical. The carousel track switches to flex-direction: column and translates on the Y axis. Navigation arrows reposition to the top and bottom center with up/down chevron icons, and dots stack vertically on the right side. Export the CSS and JS to get a fully working vertical carousel — no additional code changes needed.' },
    },
    {
      '@type': 'Question',
      name: 'How do I show multiple slides at once in a carousel?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use the Per View slider in the Transition section (available when Slide transition is selected). Set it to 2 to show two slides side by side, 3 for three, and so on up to 6. The generated CSS uses a --c-per-view custom property so you can also override it at runtime. In vertical mode, Per View stacks multiple slides within the fixed viewport height.' },
    },
    {
      '@type': 'Question',
      name: 'Is the generated carousel code production-ready and accessible?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The HTML output uses semantic <ul>/<li> list elements, aria-label on navigation buttons, role="tab" and aria-selected on dot indicators, and aria-hidden on non-visible slides. The CSS uses custom properties (--c-accent, --c-duration, --c-radius, --c-height, --c-per-view) so the carousel is easy to theme. The JavaScript is a clean ES6 class with zero dependencies. The React component uses hooks and follows React 18+ best practices.' },
    },
    {
      '@type': 'Question',
      name: 'How many slides can I add to the carousel?',
      acceptedAnswer: { '@type': 'Answer', text: 'There is no slide limit. Add as many slides as you need. Each slide has an optional emoji icon, a title, a description, and a custom background color you can pick with the native color picker — any hex, RGB, or HSL value is supported. Slides can be reordered with the up/down arrows or deleted individually.' },
    },
    {
      '@type': 'Question',
      name: 'What export formats does the Carousel Builder support?',
      acceptedAnswer: { '@type': 'Answer', text: 'Five export formats are available: HTML (semantic BEM markup with ARIA), CSS (standalone stylesheet with custom properties), JavaScript (ES6 Carousel class, zero dependencies), React (hooks-based functional component), and All-in-one (a complete standalone HTML file with embedded CSS and JS you can open directly in a browser). All formats reflect your current direction, per-view, transition, and style settings.' },
    },
    {
      '@type': 'Question',
      name: 'Does the carousel support autoplay and pause on hover?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enable Autoplay in the Behavior section and set a speed from 1 to 8 seconds. The live preview pauses when you hover over it if Pause on hover is enabled. In the exported HTML, data-autoplay and data-speed attributes are added to the carousel element, and the JavaScript class reads them to start a setInterval timer and attach mouseover/mouseout listeners for pause-on-hover behavior.' },
    },
    {
      '@type': 'Question',
      name: 'Can I customize arrow and dot navigation styles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Arrows come in three styles: Circle (round semi-transparent buttons), Square (rounded-corner buttons), and Ghost (minimal borderless buttons). Dots come in three styles: Circle (round indicators), Dash (elongated pill that widens on active), and Square. In vertical mode, arrow icons automatically switch to up/down chevrons and reposition to the top and bottom, while dots stack on the right side. All styles update in the live preview instantly.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add spacing between carousel slides?',
      acceptedAnswer: { '@type': 'Answer', text: 'Open the Transition section and drag the Gap slider (0–32 px) when the Slide transition is selected. The live preview updates immediately. In the exported CSS the gap is set via the --c-gap custom property and applied as gap: var(--c-gap) on the flex track. The exported JavaScript uses offsetWidth + gap (or offsetHeight + gap for vertical) so the transform step stays exact. The React export includes a ResizeObserver that recomputes the step whenever the carousel resizes.' },
    },
    {
      '@type': 'Question',
      name: 'How do I darken a background image in a carousel slide?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use the Overlay slider in the Appearance section (0–80%). This adds a semi-transparent dark layer over each slide\'s background image so text remains legible. In the exported code, the overlay is a <div class="carousel__overlay"> with position: absolute; inset: 0; background: rgba(0,0,0,var(--c-overlay)) placed inside each slide, and the slide content sits above it at z-index: 2. Adjust --c-overlay at runtime to change the intensity without touching the HTML.' },
    },
    {
      '@type': 'Question',
      name: 'Can I preview the carousel at mobile or tablet width before exporting?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Preview pane header has three size buttons: 📱 (375 px mobile), ⊡ (768 px tablet), and ▢ (full width). Clicking one constrains the live preview to that max width so you can see exactly how the carousel looks on smaller screens before you copy or download the code.' },
    },
    {
      '@type': 'Question',
      name: 'Is my data sent to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Everything — the live preview, code generation, and file downloads — runs entirely in your browser. No data is sent to any server and no account or sign-up is required.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Free Carousel Builder — HTML CSS JS React Code Generator',
  url: 'https://webdevpuneet.com/carousel-builder/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online carousel builder that generates production-ready, dependency-free HTML, CSS, JavaScript, and React slider code. Features horizontal and vertical scroll direction, 1–6 slides per view, gap control (0–32px), image overlay/tint (0–80%), responsive preview toggle (mobile/tablet/full), unlimited slides with custom color picker, slide and fade transitions, arrow and dot navigation styles, autoplay with pause on hover, and CSS custom properties for easy theming.',
  featureList: [
    'Free — no sign-up, no account required',
    'Fully client-side — no data sent to server',
    'Live interactive carousel preview in browser',
    'Responsive preview toggle — test at mobile (375px), tablet (768px), or full width',
    'Horizontal and vertical scroll direction',
    'Per View 1–6: show multiple slides simultaneously',
    'Gap control 0–32px: set spacing between slides',
    'Slide transition with CSS translateX / translateY',
    'Fade transition with CSS opacity cross-fade',
    'Configurable transition duration (100ms–800ms)',
    'Arrow styles: circle, square, ghost (transparent)',
    'Dot styles: circle, dash (elongated), square',
    'Vertical mode: arrows top/bottom, dots on right',
    'Autoplay with speed control (1s–8s) and pause on hover',
    'Loop and non-loop modes',
    'Unlimited slides — no maximum cap',
    'Per-slide emoji, title, description, image URL, and free color picker',
    'Image overlay/tint 0–80%: darken background images for readable text',
    'Accent color, border radius, and height controls',
    'Export as HTML, CSS, JS, React component, or All-in-one HTML',
    'CSS custom properties: --c-accent, --c-duration, --c-radius, --c-height, --c-per-view, --c-gap, --c-overlay',
    'Semantic HTML with ARIA labels for accessibility',
    'Dependency-free — no jQuery, no npm packages',
    'Syntax-highlighted code output',
    'One-click copy to clipboard and file download',
  ],
  image: 'https://webdevpuneet.com/images/carousel-builder.png',
  screenshot: 'https://webdevpuneet.com/images/carousel-builder.png',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Carousel Builder', item: 'https://webdevpuneet.com/carousel-builder/' },
  ],
};

const SEO = {
  slug: 'carousel-builder',
  title: 'Carousel Builder — Free Generate HTML, CSS, JavaScript & React Slider Code',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Add and configure slides', text: 'In the left panel, click "Add Slide" to create a new slide. Click the color swatch on any slide card to open the color picker and choose any background color. Fill in an optional emoji, a title, and a description. Reorder slides with the ↑↓ buttons or delete with ✕. There is no slide limit.' },
      { title: 'Set direction and layout', text: 'Open the Transition section. Choose Direction: Horizontal (slides left and right) or Vertical (slides up and down). Choose Type: Slide (supports multi-item layout) or Fade (cross-fade, one slide at a time). With Slide selected, drag the Per View slider to show 2, 3, or more slides simultaneously, and drag the Gap slider (0–32 px) to add spacing between slides.' },
      { title: 'Configure navigation and behavior', text: 'In the Navigation section, toggle Arrows and Dots on or off and pick their visual style (circle, square, or ghost for arrows; circle, dash, or square for dots). In the Behavior section, enable Autoplay, set the speed (1s–8s), toggle Loop, and enable Pause on Hover.' },
      { title: 'Adjust appearance', text: 'In the Appearance section, pick an Accent color (used for the active dot), set Border Radius, adjust the carousel Height, and drag the Overlay slider (0–80%) to add a dark tint over background images so text stays readable.' },
      { title: 'Test responsively and export', text: 'Use the 📱 / ⊡ / ▢ buttons in the Preview header to constrain the live preview to mobile (375 px), tablet (768 px), or full width. Then choose an export format below the preview — HTML, CSS, JS, React, or All-in-one. Click Copy to copy to clipboard or Download to save the file.' },
    ],
  },
  about: {
    title: 'Build a Carousel Visually and Export HTML, CSS, JS, or React — No Library Required',
    description: `You need a product slider that shows three cards at once, a full-width hero carousel, or a vertical story-scroll — but setting up Swiper.js or writing the translateX math from scratch takes too long for a feature you need today. Configure the carousel here and copy the production-ready code in the language you need.\n\nHorizontal or vertical scroll direction, slide or fade transitions, 1–6 slides per view for multi-item layouts, gap control (0–32px), image overlay for text legibility, autoplay with pause-on-hover, arrow and dot navigation styles. No slide limit — each slide has its own color, image URL, title, and description. A responsive preview toggle lets you check the carousel at 375px mobile, 768px tablet, or full width before exporting.\n\nUnder the hood, the slide transition doesn't animate with CSS scroll-snap — it measures the real pixel width (or height, in vertical mode) of a rendered slide with a ResizeObserver, adds your configured gap, and translates the flex track by that step multiplied by the current index, which is why the multi-item Per View layout stays pixel-accurate even when the container is resized. Enabling Loop with the slide transition triggers an infinite-scroll technique: the exported code clones enough copies of your slides onto both ends of the track to always fill the viewport, silently jumps back to the real set once a boundary is crossed, and disables the CSS transition for that one jump so the reset is invisible. Fade, zoom, flip, and blur transitions instead stack every slide absolutely and cross-fade opacity (plus a scale, rotateY, or blur filter) between the outgoing and incoming slide.\n\nFive export formats: **HTML** (semantic \`<ul>/<li>\` with BEM class names and ARIA), **CSS** (custom properties for theming: \`--c-accent\`, \`--c-gap\`, \`--c-per-view\`, \`--c-overlay\`), **JavaScript** (a dependency-free ES6 \`Carousel\` class that reads \`data-autoplay\`/\`data-speed\`/\`data-direction\` attributes off the markup and wires up swipe, click, and hover-pause listeners itself), **React** (hooks-based functional component with its own ResizeObserver-driven step calculation, React 18+), and **All-in-one** (a complete standalone HTML file with the CSS and JS inlined so it opens directly in a browser with no build step). Everything runs client-side — nothing is uploaded to a server.`,
  },
  features: [
    'Free, fully in-browser — no sign-up, no data sent to any server',
    'Responsive preview toggle — instantly test your carousel at 375 px (mobile), 768 px (tablet), or full width; verify in our [Responsive Preview Tool](https://fwdtools.com/responsive-preview-tool/) as well',
    'Horizontal and vertical scroll direction with one-click toggle',
    'Per View 1–6: display multiple slides side by side or stacked at once',
    'Gap control 0–32 px — set spacing between slides in the exported CSS and live preview',
    'Image overlay/tint 0–80% — add a dark layer over background images so text stays legible',
    'Unlimited slides — add as many as your project needs',
    'Per-slide background image URL with Cover / Contain toggle',
    'Free background color picker per slide — any hex, RGB, or HSL value',
    'Slide transition (CSS transform, supports per-view + gap) and Fade transition (CSS opacity)',
    'Configurable transition duration from 100ms to 800ms',
    'Arrow navigation: circle, square, and ghost styles — auto-orient in vertical mode',
    'Dot navigation: circle, dash, and square styles — stack vertically in vertical mode',
    'Autoplay with 1s–8s speed control, loop toggle, and pause on hover',
    'Accent color, border radius, and carousel height controls',
    'Export as HTML, CSS, JS, React component, or All-in-one standalone HTML; format the HTML output with our [HTML Formatter](https://fwdtools.com/html-formatter/)',
    'Generated CSS uses custom properties (--c-gap, --c-overlay, --c-per-view, and more) for runtime theming; beautify the CSS with our [CSS Minifier & Beautifier](/css-minifier-beautifier)',
    'Semantic HTML5 with ARIA labels — accessible out of the box',
    'Zero dependencies — no jQuery, no Swiper, no external packages',
    'Syntax-highlighted code with one-click copy and file download',
  ],
  useCases: [
    { icon: '▦', title: 'Build a full-width hero slider for a landing page without Swiper.js', desc: 'Configure slides with background images and an overlay for text legibility, then copy the HTML/CSS/JS and drop it into any project. No npm install, no Swiper setup. Design the background gradient with our [Gradient Generator](/gradient-generator).' },
    { icon: '⊞', title: 'Create a product card slider that shows three or four items at once', desc: 'Set Per View to 3 or 4 and add a gap between cards for an e-commerce product carousel or feature card grid. The exported CSS uses a custom property so you can change the column count at different breakpoints.' },
    { icon: '⇅', title: 'Build a vertical scroll carousel for testimonials, onboarding steps, or timelines', desc: 'Switch to vertical direction — slides translate on the Y axis, arrows reposition to top and bottom, and dots stack on the right. Download the code and integrate it directly.' },
    { icon: '⇄', title: 'Generate a React carousel component without installing a library', desc: 'Select the React tab to get a hooks-based functional component compatible with React 18+. Save as Carousel.jsx and import — no Swiper React, no react-slick, no external packages.' },
    { icon: '◑', title: 'Send a working carousel prototype as a single HTML file', desc: 'Use the All-in-one export to get a complete standalone HTML file with embedded CSS and JS. Open it in any browser, share as an email attachment, or drop it in a CodeSandbox — no server or build step.' },
    { icon: '⚡', title: 'Learn how slide transitions, autoplay, and dot sync work from clean source code', desc: 'The generated JavaScript ES6 class is clean and documented — read it to understand how translateX offset is calculated, how autoplay setInterval integrates with pause-on-hover, and how dots stay in sync with the active slide.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <CarouselBuilderTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
