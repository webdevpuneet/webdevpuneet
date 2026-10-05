import NavbarBuilderTool from '@/components/NavbarBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Responsive Navbar Builder — HTML, React, Vue & Angular',
  description: 'Build a responsive navbar with dropdowns, sticky or hide-on-scroll effects and a hamburger menu. Export HTML, React, Tailwind, Vue or Angular — all free.',
  keywords: [
    'navbar builder', 'responsive navbar generator', 'navigation bar generator', 'css navbar generator',
    'html css navbar', 'navbar code generator', 'dropdown menu navbar', 'hamburger menu generator',
    'mobile menu generator', 'sticky navbar', 'hide navbar on scroll', 'transparent navbar on scroll',
    'off-canvas menu', 'react navbar component', 'tailwind navbar', 'vue navbar component', 'angular navbar component',
  ],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/navbar-builder/' },
  icons: { icon: '/icons/navbar-builder.svg', shortcut: '/icons/navbar-builder.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/navbar-builder/',
    siteName: 'webdevpuneet.com',
    title: 'Responsive Navbar Builder — Dropdowns, Mobile Menu & Code',
    description: 'Design a responsive navbar visually: dropdown menus, 5 scroll effects, drawer or full-screen mobile menu, 6 presets. Export 5 formats or fork it to edit.',
    images: [{ url: 'https://webdevpuneet.com/images/navbar-builder.png', width: 1200, height: 630, alt: 'Responsive Navbar Builder — live preview and code export' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Responsive Navbar Builder — Dropdowns, Mobile Menu & Code',
    description: 'Design a responsive navbar visually: dropdown menus, 5 scroll effects, drawer or full-screen mobile menu, 6 presets. Export 5 formats or fork it to edit.',
    images: ['https://webdevpuneet.com/images/navbar-builder.png'],
  },
};

/* ── FAQ: shown on the page and published as FAQPage structured data ── */
const FAQS = [
  {
    q: 'What is a navbar builder?',
    a: 'A navbar builder is a visual tool for designing a website navigation bar without writing the code by hand. You choose the layout, logo, links, colors and behaviour with controls, watch a live preview update, and then copy the finished HTML, CSS and JavaScript — or a React, Tailwind, Vue or Angular component — into your project. This one is free, runs entirely in your browser and needs no account.',
  },
  {
    q: 'How do I make a responsive navbar with a hamburger menu?',
    a: 'Build your navbar, then open the Behavior tab. Pick a mobile menu style — Dropdown, Drawer or Full screen — and set the Breakpoint (768px by default). Below that width the links collapse behind a hamburger button that opens the menu, and the exported code already includes the media query, the toggle button and the JavaScript that opens and closes it. Click Mobile above the preview to test it at phone width.',
  },
  {
    q: 'How do I add a dropdown menu to a navbar link?',
    a: 'In the Links tab, click "+ Dropdown item" under the link and fill in a label and URL for each submenu item. That link becomes a dropdown button. On desktop the submenu floats under the link and opens on hover or click with a short fade; on mobile it expands inline inside the menu. Dropdowns close on Escape or on a click outside the navbar, and screen readers hear whether each one is open through aria-expanded. CTA links never get a dropdown.',
  },
  {
    q: 'What mobile menu styles are available?',
    a: 'Three. Dropdown opens a panel straight under the navbar — the lightest option and a good default. Drawer slides a full-height panel in from the left or right over a dimmed page, the classic off-canvas menu; clicking the dimmed area closes it. Full screen covers the whole screen with large, centered links for a bold, app-like feel. The drawer and full-screen menus also stop the page from scrolling behind them while they are open.',
  },
  {
    q: 'Can the hamburger icon animate into an X?',
    a: 'Yes. Choose the menu icon animation in the Behavior tab: Cross morphs the three lines into an ×, Arrow folds them into a ← back arrow, and Spin rotates the button while it turns into an ×. The animation is pure CSS transitions driven by an is-open class, so it costs nothing extra in JavaScript.',
  },
  {
    q: 'How do I make a sticky navbar, or hide the navbar on scroll?',
    a: 'Open the Behavior tab and choose an On scroll option. Sticky keeps the bar pinned to the top with position: sticky. Shrink keeps it pinned and slims the padding down once the page scrolls. Hide on scroll slides the bar away while scrolling down and brings it back on any scroll up. Transparent places a clear navbar over a hero section and fades it to a solid background as soon as the page scrolls. Scroll inside the preview to feel each one before exporting.',
  },
  {
    q: 'Which code formats can I export?',
    a: 'Five. HTML gives you the markup, a <style> block and a small vanilla JavaScript <script> with no libraries. React gives a Navbar.jsx component using useState and useEffect plus a matching Navbar.css. Tailwind gives a React component styled with Tailwind utility classes (Tailwind v3.2+). Vue gives a Vue 3 single-file component with <script setup> and <style scoped>. Angular gives a standalone Angular 17+ component that uses signals and the @for / @if control flow. Every format has the same dropdowns, mobile menu and scroll behaviour.',
  },
  {
    q: 'What does Fork & Edit do?',
    a: 'Fork & Edit opens your navbar in My Code, the free in-browser code editor on webdevpuneet.com, as a new saved snippet with separate HTML, CSS and JavaScript panes and a live preview. You can keep editing it there — add your own page content, change the markup, restyle it — and it stays saved in your browser. From My Code you can export it as a standalone HTML file, a React JSX component or a React + Tailwind component, and optionally back it up to a private GitHub Gist. Nothing is uploaded: the snippet is handed over through your browser\'s local storage.',
  },
  {
    q: 'What are the presets?',
    a: 'Six complete navbars you can apply with one click: SaaS (product dropdown, shrinks on scroll), Portfolio (centered, hides on scroll, full-screen menu), E-commerce (shop dropdown, sticky, side drawer), Docs (dark bar, guides dropdown, bottom border), Midnight (transparent over the hero, left drawer) and Agency (split layout, services dropdown, full-screen menu). A preset sets the layout, logo, links, colors and behaviour together, and you can change anything afterwards.',
  },
  {
    q: 'Is the generated navbar accessible?',
    a: 'Yes, accessibility is built into every export. The navbar is a <nav aria-label="Main"> landmark. The hamburger is a real <button> with aria-controls, aria-expanded and a label that switches between "Open menu" and "Close menu". The active link gets aria-current="page" so screen readers announce the current page. Dropdown parents are buttons with aria-expanded, Escape closes any open menu, and every link and button shows a clear :focus-visible outline in your accent color for keyboard users.',
  },
  {
    q: 'Can I change the mobile breakpoint?',
    a: 'Yes. The Breakpoint slider in the Behavior tab sets the width (480–1024px) at which the hamburger menu takes over. The value is written into the CSS media queries, the vanilla JavaScript and the Tailwind min-[…px]: variant, so every export switches at exactly the same width. Use a wider breakpoint when you have many links or long labels.',
  },
  {
    q: 'What navbar layouts are there?',
    a: 'Four. Default puts the logo on the left and the links on the right. Centered groups the logo and links in the middle. Split uses a three-column CSS grid with links on both sides of a centered logo — the first half of your links go left, the rest go right, and you control the split by reordering. Minimal shows links only. All four collapse to the same hamburger menu on mobile.',
  },
  {
    q: 'How do I mark the current page or add a call-to-action button?',
    a: 'In the Links tab, click the green dot on a link to mark it as the active (current) page — it is shown in your accent color and gets aria-current="page". Only one link can be active at a time. Click CTA on a link to turn it into a filled button using your accent color and CTA radius; on mobile it becomes a full-width button at the bottom of the menu.',
  },
  {
    q: 'Do I need Bootstrap, jQuery or any library?',
    a: 'No. The HTML export is plain HTML, CSS and a few lines of vanilla JavaScript. The React, Vue and Angular exports only use their own framework, and the Tailwind export only needs Tailwind CSS. There are no icon fonts, plugins or CDN files to add — the hamburger and dropdown arrows are drawn with CSS and inline SVG.',
  },
  {
    q: 'Is the navbar builder free, and is my design private?',
    a: 'It is completely free with no sign-up and no limits, and the code you generate is yours to use in personal and commercial projects. Everything runs in your browser: your settings and code are never sent to a server.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Responsive Navbar Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free visual responsive navbar builder with dropdown menus, five scroll effects, three mobile menu styles, animated hamburger icons, six presets, Fork & Edit into an online code editor, and code export in HTML, React, Tailwind, Vue 3 and Angular.',
  featureList: [
    'Dropdown submenus', 'Responsive hamburger menu', 'Dropdown, drawer and full-screen mobile menus',
    'Sticky, shrink, hide-on-scroll and transparent navbar', 'Custom mobile breakpoint', 'Six presets',
    'Accessible markup', 'Fork & Edit in My Code', 'Export to HTML, React, Tailwind, Vue and Angular',
  ],
  url: 'https://webdevpuneet.com/navbar-builder/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'CSS Tools', item: 'https://webdevpuneet.com/css-tools/' },
    { '@type': 'ListItem', position: 3, name: 'Navbar Builder', item: 'https://webdevpuneet.com/navbar-builder/' },
  ],
};

const ABOUT = `Every website needs a navigation bar, and a good one is more work than it looks. It needs a layout that still holds up when links are added, dropdown menus that open on hover and on click, a hamburger menu that works on phones, sensible scroll behaviour, keyboard support and screen-reader labels — and then the same component again in whichever framework the next project uses. This free **responsive navbar builder** handles all of that visually and hands you clean, production-ready code.

Pick a preset or a layout, set your logo and links, add dropdown menus, choose how the bar behaves on scroll and on mobile, style it, and copy the result as **HTML, CSS and JavaScript**, a **React** component, a **Tailwind** component, a **Vue 3** component or an **Angular** component. Or click **Fork & Edit** to keep working on it in a full code editor. Everything below explains each part of the tool.

### Presets: start from a finished navbar

The **Presets** tab holds six complete navbars you can apply with one click — **SaaS**, **Portfolio**, **E-commerce**, **Docs**, **Midnight** and **Agency**. Each one sets the layout, logo, links, dropdowns, colors, scroll effect and mobile menu together, so you see a realistic result immediately and only have to change what is different for your site. Nothing is locked: every setting stays editable in the other tabs.

### Four navbar layouts

The buttons at the top of the left panel switch between four layouts. **Default** places the logo on the left and the links on the right — the standard pattern for marketing sites and web apps. **Centered** groups everything in the middle, popular for portfolios and personal sites. **Split** uses a three-column CSS grid (\`1fr auto 1fr\`) to put links on both sides of a centered logo, a common look for shops and agencies; the first half of your links go left and the rest go right. **Minimal** shows links only, for documentation and apps where the logo lives elsewhere. Every layout collapses to the same hamburger menu on small screens.

### Logo and brand

In the **Logo** tab, type your brand name and add an optional icon in front of it. The emoji picker offers a grid of logo-friendly symbols — tech, business, creative, nature and simple shapes — or you can paste any emoji or character yourself. The logo is set 4px larger than your link text so it stands out, and it links to your home page.

### Links, the active page and CTA buttons

The **Links** tab is a full link editor: rename links, change their URLs, reorder them with the ↑ ↓ arrows, add new ones and remove old ones. Click the **green dot** to mark the current page — it is shown in your accent color and gets \`aria-current="page"\` so screen readers announce it. Click **CTA** to turn a link into a filled call-to-action button such as "Get Started" or "Sign up"; on mobile it becomes a full-width button at the bottom of the menu.

### Dropdown menus and submenus

Click **"+ Dropdown item"** under any link to give it a submenu, then fill in each item's label and URL. The parent becomes a button with a small arrow. On desktop the **dropdown menu** floats under its link and opens on hover or on click with a short fade-and-slide, and an invisible bridge stops it closing while the pointer moves into it. On phones the same dropdown becomes an expandable section inside the mobile menu. Dropdowns close on **Escape** or on a click anywhere outside the navbar, and each one reports its state to assistive technology with \`aria-expanded\`.

### Navbar scroll effects: sticky, shrink, hide and transparent

The **Behavior** tab controls how the navbar reacts as the page scrolls. **Static** scrolls away with the content. **Sticky** keeps the bar pinned to the top of the screen with \`position: sticky\`. **Shrink** stays pinned and slims its padding down — with a slightly stronger shadow — once you start scrolling, freeing up space for content. **Hide on scroll** slides the bar out of view while you scroll down and brings it straight back on any scroll up, a pattern that works especially well on phones. **Transparent** places a clear navbar over a hero image or banner and fades it to a solid background as soon as the page scrolls.

### Responsive mobile menu and animated hamburger icon

Below the **breakpoint** you choose (480–1024px, 768px by default) the links collapse behind a **hamburger menu**. Pick one of three **mobile menu** styles: a **Dropdown** panel that opens under the bar, a **Drawer** that slides in from the left or right over a dimmed page (an off-canvas menu), or a **Full screen** overlay with large, centered links. Then choose the hamburger animation — a **Cross** that morphs into an ×, an **Arrow** that folds into a ← back arrow, or a **Spin**. The menu closes when a link is chosen, when the dimmed backdrop is tapped, or when Escape is pressed, and the drawer and full-screen menus lock the page scroll behind them.

### Style: colors, spacing and typography

The **Style** tab sets the look. Three color pickers — **Background**, **Text** and **Accent** — each take a native picker or a hex code; the accent is used for the active link, hover states, the CTA button and keyboard focus outlines. Sliders control the bar's **padding**, the **font size**, the **gap between links** and the **CTA corner radius**, four buttons choose the **font weight**, and two toggles add a **drop shadow** or a **bottom border**. Dropdowns and mobile menus automatically use the same colors.

### A live preview that runs the real code

The preview is not a mock-up: it is a real, scrollable page running the exact HTML, CSS and JavaScript you will export, so dropdowns, scroll effects and the mobile menu behave just as they will on your site. Scroll inside it to try the sticky, shrink, hide or transparent effect. Click **Mobile** to view it in a real 375px-wide frame where the media query switches to the hamburger menu, and tap the icon to open it.

### Export: HTML, React, Tailwind, Vue and Angular

Choose a format above the code and click **Copy**. **HTML** gives you the markup, a \`<style>\` block and a few lines of vanilla JavaScript with no libraries. **React** gives a \`Navbar.jsx\` component using \`useState\` and \`useEffect\` with a matching \`Navbar.css\`. **Tailwind** gives a React component styled entirely with utility classes. **Vue** gives a Vue 3 single-file component with \`<script setup>\` and \`<style scoped>\`. **Angular** gives a standalone Angular 17+ component using signals and the \`@for\` / \`@if\` control flow. Every format includes the same dropdowns, mobile menu, scroll behaviour and accessibility attributes.

### Fork & Edit: keep building in My Code

**Fork & Edit** — in the preview bar and next to the Copy button — opens your navbar in **My Code**, the free in-browser code editor on webdevpuneet.com, as a new snippet. The HTML, CSS and JavaScript land in separate editor panes with a live preview, together with the demo page, so you can carry on where the builder stops: add your real page content, rename classes, change the markup or extend the styles. The snippet is saved in your browser, and from My Code you can export it as a standalone HTML file, a React JSX component or a React + Tailwind component, or back it up to a private GitHub Gist. Nothing is uploaded — the hand-off happens through your browser's local storage.

### Accessible, dependency-free and private

The exported navbar follows accessibility best practice: a \`<nav aria-label="Main">\` landmark, a real \`<button>\` for the hamburger with \`aria-controls\`, \`aria-expanded\` and a changing label, \`aria-current\` on the active page, Escape to close menus, and visible \`:focus-visible\` outlines. It needs no Bootstrap, jQuery, icon font or plugin. The builder itself is free, needs no sign-up, and runs entirely in your browser — your design is never sent to a server, and the code is yours to use in personal and commercial projects.`;

const FEATURES = [
  { title: 'Dropdown menus', text: 'Give any link a submenu that opens on hover or click on desktop and expands inline on mobile.' },
  { title: 'Responsive hamburger menu', text: 'Dropdown panel, left or right slide-in drawer, or full-screen overlay below your breakpoint.' },
  { title: 'Animated menu icon', text: 'The hamburger morphs into a cross, folds into an arrow, or spins.' },
  { title: '5 scroll effects', text: 'Static, sticky, shrink on scroll, hide on scroll down, and transparent-to-solid over a hero.' },
  { title: 'Custom breakpoint', text: 'Choose where the mobile menu takes over (480–1024px); every export uses the same value.' },
  { title: '6 one-click presets', text: 'SaaS, Portfolio, E-commerce, Docs, Midnight and Agency — all fully editable.' },
  { title: '4 layouts', text: 'Default, Centered, Split (CSS grid with the logo in the middle) and Minimal.' },
  { title: '5 export formats', text: 'HTML + CSS + vanilla JS, React, Tailwind, Vue 3 and Angular — copy with one click.' },
  { title: 'Fork & Edit', text: 'Open the navbar in [My Code](/ui-snippets/mycode/) to keep editing it with your own content.' },
  { title: 'Real live preview', text: 'A scrollable page running the exported code, with a true 375px mobile view.' },
  { title: 'Accessible by default', text: 'Nav landmark, aria-expanded, aria-current, Escape to close and visible keyboard focus.' },
  { title: 'Full style control', text: 'Colors, padding, font size and weight, link gap, CTA radius, shadow and border.' },
  { title: 'Logo with emoji picker', text: 'Brand name plus an optional icon from a grid of logo-friendly emoji.' },
  { title: 'Active page and CTA', text: 'Highlight the current page and turn any link into a call-to-action button.' },
  { title: 'No libraries, no sign-up', text: 'Dependency-free code, free forever, and nothing leaves your browser.' },
];

const STEPS = [
  { title: 'Pick a preset or a layout', text: 'Open the Presets tab and click one of the six ready-made navbars, or use the layout buttons at the top of the left panel — Default, Centered, Split or Minimal — to start from a plain bar.' },
  { title: 'Set your logo and links', text: 'In the Logo tab, enter your brand name and pick an optional icon. In the Links tab, rename, reorder, add and remove links, mark the current page with the green dot, and toggle CTA to turn a link into a button.' },
  { title: 'Add dropdown menus', text: 'Under any link, click "+ Dropdown item" and fill in a label and URL for each submenu item. That link becomes a dropdown in the preview and in every export.' },
  { title: 'Choose scroll and mobile behaviour', text: 'In the Behavior tab, pick what happens on scroll, the mobile menu style, the hamburger animation and the breakpoint. Scroll inside the preview, and click Mobile to try the menu at phone width.' },
  { title: 'Style it', text: 'In the Style tab, set the background, text and accent colors, adjust padding, font size, link gap and CTA radius, choose a font weight, and toggle the shadow and border.' },
  { title: 'Copy the code or Fork & Edit', text: 'Choose HTML, React, Tailwind, Vue or Angular and click Copy to paste it into your project — or click Fork & Edit to open it in My Code and keep editing it in the browser.' },
];

const USE_CASES = [
  { icon: '⚡', title: 'Ship a complete navbar on a new project in minutes', desc: 'Start from a preset, swap in your brand and links, and paste production-ready code — mobile menu and dropdowns included — instead of rebuilding the same component from scratch. More navigation patterns live in the [UI snippets library](/ui-snippets/navigation/).' },
  { icon: '📱', title: 'Get the mobile menu right without fiddly CSS', desc: 'Pick a dropdown, drawer or full-screen menu and an animated hamburger; the export already handles the breakpoint, open state, backdrop clicks, Escape and scroll locking.' },
  { icon: '🧭', title: 'Build navigation with dropdown menus', desc: 'Group products, categories or docs sections under dropdowns that open on hover or click on desktop and expand inline on phones, with keyboard and screen-reader support wired in.' },
  { icon: '🎞️', title: 'Add a sticky, shrinking or hide-on-scroll header', desc: 'Test each scroll effect on a real scrollable preview — including a transparent bar over a hero that turns solid as the page scrolls — and export exactly what you tested.' },
  { icon: '⇄', title: 'Reuse one design across frameworks', desc: 'Export the same navbar as plain HTML for a CMS or landing page, React or Tailwind for a Next.js app, a Vue 3 component or an Angular standalone component — with matching behaviour in each.' },
  { icon: '🛠️', title: 'Fork it and keep building', desc: 'Send the navbar to My Code with Fork & Edit, add your real page around it, and export the finished page as an HTML file or a React component when it is ready.' },
  { icon: '🎓', title: 'Learn how a modern navbar works', desc: 'Compare the vanilla JavaScript with the React, Vue and Angular versions to see how state, effects and ARIA attributes map across frameworks — then practise in the [HTML](/html-playground/) or [JavaScript](/js-playground/) playground.' },
  { icon: '♿', title: 'Start from accessible markup', desc: 'Get a navbar that already uses a nav landmark, a real toggle button, aria-current and visible focus styles, instead of retrofitting accessibility later.' },
  { icon: '🎨', title: 'Match a brand in seconds', desc: 'Drop in your brand colors with the pickers — or build a scheme first with the [color palette generator](/color-palette-generator/) — and check readability with the [color contrast checker](/color-contrast-checker/).' },
];

const EXPORT_TABLE = {
  columns: ['Format', 'What you get', 'Mobile menu & dropdown state', 'Styling', 'Needs'],
  rows: [
    ['**HTML**', 'Markup + `<style>` + `<script>`', 'Vanilla JavaScript (`is-open` classes)', 'Plain CSS with media queries', 'Nothing — any website or CMS'],
    ['**React**', '`Navbar.jsx` + `Navbar.css`', '`useState` + `useEffect`', 'Plain CSS file', 'React 16.8+'],
    ['**Tailwind**', 'React component', '`useState` + `useEffect`', 'Tailwind utility classes', 'Tailwind CSS v3.2+'],
    ['**Vue**', 'Vue 3 single-file component', '`ref` + `onMounted`', '`<style scoped>`', 'Vue 3'],
    ['**Angular**', 'Standalone component (`.ts`)', 'Signals + `@HostListener`', 'Component styles', 'Angular 17+'],
  ],
};

const BEHAVIOR_TABLE = {
  columns: ['Setting', 'Option', 'What it does'],
  rows: [
    ['On scroll', '**Static**', 'Scrolls away with the page.'],
    ['On scroll', '**Sticky**', 'Stays pinned to the top (`position: sticky`).'],
    ['On scroll', '**Shrink**', 'Pinned, and slims its padding once the page scrolls.'],
    ['On scroll', '**Hide on scroll**', 'Hides while scrolling down, returns on any scroll up.'],
    ['On scroll', '**Transparent**', 'Clear over the hero, turns solid as the page scrolls.'],
    ['Mobile menu', '**Dropdown**', 'A panel that opens under the bar.'],
    ['Mobile menu', '**Drawer**', 'Slides in from the left or right over a dimmed page.'],
    ['Mobile menu', '**Full screen**', 'Covers the screen with large, centered links.'],
    ['Menu icon', '**Cross / Arrow / Spin**', 'How the hamburger animates while the menu is open.'],
    ['Breakpoint', '**480–1024px**', 'The width at and below which the hamburger menu takes over.'],
  ],
};

const SECTIONS = [
  { type: 'features', label: "What's included", heading: 'Navbar Builder Features', items: FEATURES },
  { type: 'text', label: 'About this tool', heading: 'Free Responsive Navbar Builder & Navigation Bar Generator', text: ABOUT },
  { type: 'steps', label: 'Step by step', heading: 'How to Build a Responsive Navbar', items: STEPS },
  { type: 'table', label: 'Behavior tab', heading: 'Scroll Effects and Mobile Menu Options', ...BEHAVIOR_TABLE },
  { type: 'table', label: 'Code export', heading: 'Export Formats Compared', ...EXPORT_TABLE },
  { type: 'callout', variant: 'tip', heading: 'Tip: Fork & Edit to keep going', text: 'Copying is great for dropping a navbar into an existing project. When you want to keep shaping it — add real page content, extra sections or your own scripts — click Fork & Edit. It opens the navbar in My Code with HTML, CSS and JavaScript panes and a live preview, saved in your browser.' },
  { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: USE_CASES },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: FAQS },
  {
    type: 'timeline', label: 'Changelog', heading: 'Recent Features and Improvements',
    items: [
      {
        date: 'October 5, 2026', title: 'Responsive navbars, dropdowns, presets and Angular',
        items: [
          'Dropdown submenus that open on hover or click and expand inline on mobile',
          'Dropdown, drawer and full-screen mobile menus with cross, arrow or spin hamburger animations',
          'Static, sticky, shrink, hide-on-scroll and transparent scroll effects, plus a custom breakpoint',
          'Six one-click presets and an emoji picker for the logo',
          'A live preview that runs the exported code on a scrollable page, with a true mobile view',
          'Angular export, aria-current and focus-visible styles in every format, and Fork & Edit into My Code',
        ],
      },
    ],
  },
];

export default function NavbarBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <NavbarBuilderTool />
        </div>
        <AdSlot />
        <IndexOnly>
          <SeoSection
            slug="navbar-builder"
            title="Responsive Navbar Builder — Free HTML, CSS, React, Tailwind, Vue & Angular Generator"
            subtitle="Design a navigation bar with dropdown menus, a mobile hamburger menu and sticky or hide-on-scroll effects — then copy the code or Fork & Edit it."
            sections={SECTIONS}
          />
        </IndexOnly>
      </div>
    </>
  );
}
