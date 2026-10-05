import NavbarBuilderTool from '@/components/NavbarBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Responsive Navbar Builder — HTML, React, Vue & Angular',
  description: 'Build a responsive navbar with dropdowns, sticky or hide-on-scroll effects and a hamburger menu. Export HTML, React, Tailwind, Vue or Angular — all free.',
  keywords: [
    'navbar builder', 'responsive navbar generator', 'navigation bar generator', 'html css navbar',
    'dropdown menu navbar', 'hamburger menu generator', 'sticky navbar', 'hide navbar on scroll',
    'mobile menu drawer', 'react navbar component', 'tailwind navbar', 'vue navbar component', 'angular navbar component',
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
    images: [{ url: 'https://webdevpuneet.com/images/css-tools.png', width: 1200, height: 630, alt: 'Responsive Navbar Builder — live preview and code export' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Responsive Navbar Builder — Dropdowns, Mobile Menu & Code',
    description: 'Design a responsive navbar visually: dropdown menus, 5 scroll effects, drawer or full-screen mobile menu, 6 presets. Export 5 formats or fork it to edit.',
    images: ['https://webdevpuneet.com/images/css-tools.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the generated navbar responsive with a mobile hamburger menu?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every export includes a mobile menu. At or below the breakpoint you choose (480–1024px, 768px by default) the links collapse behind a hamburger button, and tapping it opens the menu. Pick one of three mobile menu styles in the Behavior tab: a dropdown panel under the bar, a slide-in drawer from the left or right over a dimmed page, or a full-screen overlay with large links. The hamburger animates while the menu is open — choose a cross (×), an arrow (←) or a spinning cross. The menu closes when a link is picked, when the backdrop is clicked, or when Escape is pressed, and the drawer and full-screen styles stop the page scrolling behind them.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add a dropdown menu to a navbar link?',
      acceptedAnswer: { '@type': 'Answer', text: 'In the Links tab, click "+ Dropdown item" under any link to give it a submenu, then fill in each item\'s label and URL. A link with dropdown items becomes a button that opens the submenu. On desktop the dropdown floats under the link and opens on hover or click, with a short fade and slide. On mobile it becomes an expandable section inside the menu. Dropdowns close on Escape or on a click outside the navbar, and the button reports its open state to screen readers with aria-expanded. CTA links never get a dropdown.' },
    },
    {
      '@type': 'Question',
      name: 'What scroll effects can the navbar have?',
      acceptedAnswer: { '@type': 'Answer', text: 'Five, set in the Behavior tab. Static scrolls away with the page. Sticky stays pinned to the top using position: sticky. Shrink is sticky and slims its padding down with a stronger shadow once the page scrolls. Hide on scroll slides the bar out of view while you scroll down and brings it straight back on any scroll up, which saves space on small screens. Transparent sits fixed and clear over a hero section, then fades to a solid background as soon as the page scrolls. The live preview is a real scrollable page, so you can feel each effect before you export it.' },
    },
    {
      '@type': 'Question',
      name: 'What code formats does the navbar builder export?',
      acceptedAnswer: { '@type': 'Answer', text: 'Five. HTML exports the markup with a <style> block and a small vanilla JavaScript <script> — no libraries. React exports a Navbar.jsx component using useState and useEffect plus a matching Navbar.css. Tailwind exports a React component styled entirely with Tailwind utility classes (v3.2 or later, using a min-[…px]: breakpoint variant so your chosen breakpoint is respected). Vue exports a Vue 3 single-file component with <script setup> and <style scoped>. Angular exports a standalone Angular 17+ component that uses signals and the @for / @if control flow, with the template and styles inline.' },
    },
    {
      '@type': 'Question',
      name: 'What are the navbar presets?',
      acceptedAnswer: { '@type': 'Answer', text: 'Presets are complete starting points you can apply with one click: SaaS (product dropdown, shrinks on scroll), Portfolio (centered, hides on scroll, full-screen menu), E-commerce (shop dropdown, sticky, side drawer), Docs (dark bar with a guides dropdown and bottom border), Midnight (transparent over the hero with a left drawer) and Agency (split layout, services dropdown, full-screen menu). Each one sets the layout, logo, links, colors and behavior together, and everything stays editable afterwards.' },
    },
    {
      '@type': 'Question',
      name: 'Is the generated navbar accessible?',
      acceptedAnswer: { '@type': 'Answer', text: 'Accessibility is built into every export. The navbar is a <nav aria-label="Main"> landmark. The hamburger is a real <button> with aria-controls, aria-expanded and an aria-label that switches between "Open menu" and "Close menu". The link marked active gets aria-current="page" so screen readers announce the current page. Dropdown parents are buttons with aria-expanded, Escape closes any open menu, and every link and button shows a clear :focus-visible outline in your accent color for keyboard users.' },
    },
    {
      '@type': 'Question',
      name: 'What does Fork & Edit do?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fork & Edit opens your navbar in My Code, the free in-browser editor on webdevpuneet.com, as a new snippet with its HTML, CSS and JavaScript in separate panes plus the demo page from the preview. From there you can keep editing it with a live preview, add your own page content, and save it to your browser. Nothing is uploaded to a server: the snippet is handed over through your browser\'s local storage.' },
    },
    {
      '@type': 'Question',
      name: 'What navbar layouts does the builder support?',
      acceptedAnswer: { '@type': 'Answer', text: 'Four. Default puts the logo on the left and links on the right — the most common pattern for marketing sites and apps. Centered groups the logo and links in the middle, popular for portfolios. Split uses a three-column CSS grid with links on both sides of a centered logo, common for e-commerce and agencies; the first half of your links go left and the rest go right. Minimal shows only the links, for documentation and apps where the logo appears elsewhere. Every layout collapses to the same hamburger menu on mobile.' },
    },
    {
      '@type': 'Question',
      name: 'Can I change the mobile breakpoint?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Breakpoint slider in the Behavior tab sets the width (480–1024px) at which the hamburger menu takes over. The value is written into the exported CSS media queries, the vanilla JavaScript, and the Tailwind min-[…px]: variant, so every format switches at exactly the same width. Pick a wider breakpoint when you have many links or long labels, and a narrower one when the navbar is short.' },
    },
    {
      '@type': 'Question',
      name: 'Which style controls are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Style tab has three color pickers — background, text and accent (used for the active link, hover state and CTA button) — each with a native picker and hex input. Sliders set the padding, font size, link gap and CTA corner radius, and four buttons pick the font weight. Toggles add a drop shadow or a bottom border. The Logo tab sets the brand name and an optional icon, with an emoji picker of logo-friendly symbols. The live preview updates with every change.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Responsive Navbar Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual responsive navbar builder with dropdown menus, five scroll effects, three mobile menu styles, six presets, and code export in HTML, React, Tailwind, Vue 3 and Angular.',
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

const seoData = {
  slug: 'navbar-builder',
  title: 'Responsive Navbar Builder — Dropdowns, Mobile Menu & Code Export',
  about: {
    title: 'Build a Responsive Navbar Visually and Export Production-Ready Code',
    description: `Every site needs a navbar, and a good one is more work than it looks: a layout that holds up as links are added, dropdown menus that open on hover and click, a hamburger menu that works on phones, sensible scroll behaviour, keyboard support and screen-reader labels — and then the same component again in whichever framework the next project uses. This builder handles all of it visually and gives you clean code to paste.\n\nStart from one of six **presets** — SaaS, Portfolio, E-commerce, Docs, Midnight or Agency — or from a blank bar, then pick a **layout**: Default (logo left, links right), Centered, Split (links on both sides of a centered logo) or Minimal. In the Links tab, reorder links, mark the current page as active, turn any link into a CTA button, and add **dropdown items** to give a link a submenu.\n\nThe Behavior tab is what makes the navbar feel finished. Choose how it reacts **on scroll** — static, sticky, shrink, hide on scroll down, or transparent over a hero until the page scrolls. Choose the **mobile menu** — a dropdown panel, a slide-in drawer from either side, or a full-screen overlay — the hamburger animation (cross, arrow or spin), and the **breakpoint** where the mobile menu takes over.\n\nThe preview is a real, scrollable page running the exact code you will export, so the scroll effects, dropdowns and mobile menu behave just as they will on your site; switch to Mobile to see it at phone width. When it looks right, copy it as **HTML** (with vanilla JavaScript), **React**, **Tailwind**, **Vue 3** or **Angular** — or click **Fork & Edit** to keep working on it in My Code.`,
  },
  features: [
    '**Dropdown menus** — give any link a submenu that opens on hover or click on desktop and expands inline on mobile',
    '**Responsive hamburger menu** — dropdown panel, left or right slide-in drawer, or full-screen overlay',
    '**Animated menu icon** — the hamburger morphs into a cross, folds into an arrow, or spins',
    '**5 scroll effects** — static, sticky, shrink on scroll, hide on scroll down, and transparent-to-solid over a hero',
    '**Custom breakpoint** — choose where the mobile menu takes over (480–1024px); every export uses the same value',
    '**6 one-click presets** — SaaS, Portfolio, E-commerce, Docs, Midnight and Agency, all fully editable',
    '**4 layouts** — Default, Centered, Split (CSS grid, logo in the middle) and Minimal (links only)',
    '**5 export formats** — HTML + CSS + vanilla JS, React, Tailwind, Vue 3 SFC and Angular standalone component',
    '**Accessible by default** — nav landmark, aria-expanded and aria-controls, aria-current="page", Escape to close, visible keyboard focus',
    '**Real live preview** — a scrollable demo page running the exported code, with a 375px mobile view',
    '**Fork & Edit** — open the navbar in [My Code](/ui-snippets/mycode/) to keep editing with your own content',
    '**Full style control** — colors, padding, font size and weight, link gap, CTA radius, shadow and border; build a scheme with the [color palette generator](/color-palette-generator)',
    '**Logo with emoji picker** — brand name plus an optional icon from a grid of logo-friendly emoji',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a preset or a layout', text: 'Open the Presets tab and click one of the six ready-made navbars, or choose a layout — Default, Centered, Split or Minimal — with the buttons at the top of the left panel to start from a plain bar.' },
      { title: 'Set your logo and links', text: 'In the Logo tab, enter your brand name and optionally pick an icon. In the Links tab, add, rename and reorder links, mark the current page with the green dot, and toggle CTA to turn a link into a button.' },
      { title: 'Add dropdown menus', text: 'Under any link, click "+ Dropdown item" and fill in a label and URL for each submenu item. That link becomes a dropdown button in the preview and in every export.' },
      { title: 'Choose scroll and mobile behaviour', text: 'In the Behavior tab, pick what happens on scroll, the mobile menu style (dropdown, drawer or full screen), the hamburger animation, and the breakpoint. Scroll inside the preview and switch to Mobile to try it.' },
      { title: 'Style it', text: 'In the Style tab, set the background, text and accent colors, adjust padding, font size, link gap and CTA radius, choose a font weight, and toggle the shadow and bottom border.' },
      { title: 'Export or fork', text: 'Choose HTML, React, Tailwind, Vue or Angular above the code and click Copy, or click Fork & Edit to open the navbar in My Code and keep working on it.' },
    ],
  },
  useCases: [
    { icon: '⚡', title: 'Ship a complete navbar on a new project in minutes', desc: 'Start from a preset, swap in your brand and links, and paste production-ready code — including the mobile menu and dropdowns — instead of rebuilding the same component from scratch. Browse more navigation patterns in the [UI snippets library](/ui-snippets/navigation/).' },
    { icon: '📱', title: 'Get the mobile menu right without the fiddly CSS', desc: 'Pick a dropdown, drawer or full-screen menu and an animated hamburger; the export already handles the breakpoint, open state, backdrop clicks, Escape, and stopping the page scrolling behind the menu.' },
    { icon: '🧭', title: 'Build navigation with dropdown menus', desc: 'Group product pages, categories or docs sections under a dropdown that opens on hover or click on desktop and expands inline on phones — with the keyboard and screen-reader support already wired up.' },
    { icon: '🎞️', title: 'Add a sticky, shrinking or hide-on-scroll header', desc: 'Try each scroll effect on a real scrollable preview, including a transparent bar over a hero image that turns solid as the page scrolls, and export the exact behaviour you tested.' },
    { icon: '⇄', title: 'Use the same navbar across frameworks', desc: 'Export the same design as plain HTML for a CMS or landing page, React or Tailwind for a Next.js app, a Vue 3 component, or an Angular standalone component — with matching behaviour in every version.' },
    { icon: '🎓', title: 'Learn how a modern navbar is built', desc: 'Compare the vanilla JavaScript version with the React, Vue and Angular components to see how state, effects and accessibility attributes map across frameworks, then fork it into My Code and experiment.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

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
        <IndexOnly><SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
