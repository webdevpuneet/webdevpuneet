import NavbarBuilderTool from '@/components/NavbarBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Navbar Builder — Free HTML, React, Tailwind & Vue Navbars | webdevpuneet.com',
  description: 'Build a custom navbar visually — 4 layouts with logo, links, colors, and fonts. Export HTML+CSS, React, Tailwind, or Vue 3 SFC. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  // Tool is intentionally unregistered (see tools-registry.js) — noindex so the
  // orphan URL (no sitemap entry, no internal links) doesn't get crawled/indexed.
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webdevpuneet.com/navbar-builder/' },
  icons: { icon: '/icons/navbar-builder.svg', shortcut: '/icons/navbar-builder.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/navbar-builder/',
    siteName: 'webdevpuneet.com',
    title: 'Navbar Builder — Design & Export HTML, React, Tailwind, Vue',
    description: 'Design a custom navbar visually and export clean code in 4 formats. 4 layouts, full color/font/spacing controls, live preview, and one-click copy.',
    images: [{ url: 'https://webdevpuneet.com/images/css-tools.png', width: 1200, height: 630, alt: 'Navbar Builder — Live Preview and Code Export' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Navbar Builder — HTML, React, Tailwind, Vue Code Generator',
    description: 'Design your navbar visually with 4 layouts, custom colors, and link editor. Export production code in 4 formats. Free, no signup.',
    images: ['https://webdevpuneet.com/images/css-tools.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What navbar layouts does the builder support?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Navbar Builder supports four distinct layouts. Default places the logo on the left and navigation links on the right — the most common pattern for marketing sites and dashboards. Centered aligns all items (logo and links) horizontally in the center of the navbar, used by portfolio sites and minimal landing pages. Split uses a three-column CSS grid: links on the left, logo in the center, links on the right — a popular pattern for e-commerce and magazine sites. Minimal shows only the navigation links with no logo, useful for documentation sites and apps where the logo appears elsewhere in the UI. You can switch layouts at any time and the live preview updates immediately.' },
    },
    {
      '@type': 'Question',
      name: 'What code formats does the navbar builder export?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool exports four code formats. HTML+CSS generates a complete self-contained snippet with a <nav> element and a matching <style> block using CSS classes — drop it into any HTML file or CMS template. React exports a JSX component using inline styles, with no external dependencies. The component uses standard JavaScript objects for styles, making it compatible with Create React App, Next.js, Vite, and any React setup. Tailwind exports a JSX component using Tailwind CSS arbitrary value classes (bg-[#hex], text-[14px], px-[16px]), which work with Tailwind CSS v3 and v4. Vue exports a complete Vue 3 Single-File Component (SFC) with <template>, <script setup>, and <style scoped> — ready to drop into any Vue 3 or Nuxt 3 project.' },
    },
    {
      '@type': 'Question',
      name: 'How does the CTA button work in the navbar?',
      acceptedAnswer: { '@type': 'Answer', text: 'Any link in the navbar can be marked as a CTA (Call to Action) button. In the Links tab, each link row has a CTA toggle button. When enabled, the link receives a filled background using your accent color, white text, and rounded corners matching your CTA Radius setting from the Style tab. The CTA button automatically sizes its padding proportionally to your Padding setting (at 45% of the main padding value for vertical padding). Multiple links can be CTAs simultaneously. CTA links render correctly in all four export formats — HTML class, React inline style, Tailwind arbitrary value, and Vue scoped class.' },
    },
    {
      '@type': 'Question',
      name: 'How do I mark a link as active (current page)?',
      acceptedAnswer: { '@type': 'Answer', text: 'In the Links tab, each link row has a green dot button on the right side. Click it to toggle the active state. Only one link can be active at a time — setting one link active automatically deactivates all others, matching standard navbar behavior where the current page link is highlighted. Active links are rendered using your accent color in the preview and in all four export formats. In HTML, the active link gets an active CSS class. In React and Vue, the style or class is applied conditionally. In Tailwind, the text color class switches to the accent color.' },
    },
    {
      '@type': 'Question',
      name: 'How does the Split layout divide the links?',
      acceptedAnswer: { '@type': 'Answer', text: 'In Split layout, the links array is split at the midpoint using Math.ceil(links.length / 2). For an even number of links, the split is equal. For an odd number, the extra link goes to the left side. For example, 4 links → 2 left, 2 right. 5 links → 3 left, 2 right. 3 links → 2 left, 1 right. The split indicator in the Links tab shows you exactly how many links go left and right based on your current count. You can control the split by reordering links with the up/down arrows — links at the top of the list appear on the left, links at the bottom appear on the right. The split layout uses CSS grid with three columns: 1fr auto 1fr.' },
    },
    {
      '@type': 'Question',
      name: 'What style controls are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Style tab provides complete control over the visual appearance. Three color pickers — Background, Text, and Accent/Active — let you set the navbar colors using a native color picker or by typing a hex value directly. Four sliders control spacing and typography: Padding (8–24px) sets the vertical padding of the nav container; Font Size (12–18px) sets the link font size; Link Gap (8–56px) controls horizontal spacing between links; CTA Radius (0–24px) rounds the corners of CTA buttons. Font Weight has four buttons: Regular (400), Medium (500), Semibold (600), and Bold (700). Two toggles — Drop Shadow and Bottom Border — add a subtle box-shadow or a 1px bottom border to the navbar. All changes are reflected in the live preview instantly.' },
    },
    {
      '@type': 'Question',
      name: 'Can I reorder the navigation links?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each link row in the Links tab has up (↑) and down (↓) arrow buttons on the left side. Click up to move a link earlier in the list, click down to move it later. The up button is disabled for the first link and the down button is disabled for the last link. Link order in the editor matches the render order in both the live preview and the exported code exactly. For the Split layout, reordering determines which links appear on the left versus the right side of the logo — the top half go left, the bottom half go right.' },
    },
    {
      '@type': 'Question',
      name: 'Does the exported code include responsive mobile behavior?',
      acceptedAnswer: { '@type': 'Answer', text: 'The current version generates clean desktop navbar code without a mobile hamburger menu or responsive breakpoints. This is intentional — mobile navigation patterns vary widely (hamburger menus, bottom nav bars, off-canvas drawers, full-screen overlays), and a one-size-fits-all responsive implementation would not match most real-world needs. The exported code is production-ready as a desktop navbar and is designed to be a clean, minimal starting point. You can add mobile styles on top of the exported code by adding a @media (max-width: 768px) rule to hide the nav links and show a hamburger button. A future version of the tool will include a mobile menu toggle option.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add the logo icon or emoji?',
      acceptedAnswer: { '@type': 'Answer', text: 'In the Logo tab, the Icon / Emoji field accepts any text that will appear before your brand name — typically an emoji (🚀, 🌐, ⚡), a symbol character, or a short text prefix. The icon renders inline before the brand name in the preview and in all exported code formats. Leave the field empty to show only the brand name text. The logo font size is automatically set to 4px larger than your base font size setting to create visual hierarchy. In the Minimal layout, the logo is hidden regardless of the Logo tab settings — only the navigation links are shown.' },
    },
    {
      '@type': 'Question',
      name: 'Is the exported Tailwind code compatible with Tailwind v4?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Tailwind export uses arbitrary value classes throughout: bg-[#hex] for colors, text-[14px] for font sizes, px-[16px] py-[6px] for padding, and rounded-[6px] for border radius. Arbitrary values are a core Tailwind feature supported in v2, v3, and v4. The Tailwind export also uses standard utility classes where appropriate — shadow-sm for drop shadow, border-b for bottom border, items-center, justify-center, and flex. The only Tailwind-specific assumption is that your project has the Tailwind CSS stylesheet loaded. No Tailwind plugins are required. For v4 projects using the new CSS-first configuration, arbitrary values work identically.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Navbar Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual navbar builder with 4 layouts, full style controls, and code export in HTML+CSS, React, Tailwind, and Vue 3 SFC.',
  url: 'https://webdevpuneet.com/navbar-builder/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Navbar Builder', item: 'https://webdevpuneet.com/navbar-builder/' },
  ],
};

const seoData = {
  slug: 'navbar-builder',
  title: 'Navbar Builder — Design & Export HTML, React, Tailwind, Vue',
  about: {
    title: 'Design a Navbar Visually and Export HTML, React, Tailwind, or Vue Code — No Boilerplate',
    description: `Every project needs a navbar, and writing one from scratch is tedious — you decide on a layout, write the HTML structure, figure out the flexbox or grid rules, style the CTA button, and then do it again when a teammate needs the same component in a different framework. Configure the design here and copy the code in the format you need.\n\nFour navbar layouts to start from: **Default** (logo left, links right), **Centered** (all items in the center), **Split** (links on both sides of a centered logo, using CSS grid \`1fr auto 1fr\`), and **Minimal** (links only, no logo). In the Links tab, add, remove, and reorder links with up/down arrows, mark one as active (current page), and toggle any link to a CTA button with a filled accent color background.\n\nThe Style tab controls everything visual: three color pickers for background, text, and accent; sliders for padding, font size, link gap, and CTA border radius; font weight selector; drop shadow and bottom border toggles. The live preview updates as you type. When the design is right, switch between code tabs — **HTML+CSS** (self-contained snippet with a \`<style>\` block), **React** (standalone component with inline styles, no dependencies), **Tailwind** (arbitrary value classes, v3/v4 compatible), **Vue** (complete SFC with \`<script setup>\` and \`<style scoped>\`) — and copy.`,
  },
  features: [
    '**4 navbar layouts** — Default, Centered, Split (3-column grid), and Minimal (links only)',
    '**4 code export formats** — HTML+CSS with classes, React with inline styles, Tailwind arbitrary values, Vue 3 SFC with scoped styles — same formats as the [carousel builder](/carousel-builder)',
    '**Live preview** — full-width navbar preview updates in real-time as you configure every setting',
    '**Full link editor** — add, remove, reorder (up/down), set active state, toggle CTA style per link',
    '**3 color pickers** — Background, Text, and Accent with native color picker + hex input for each; build a full scheme first with the [color palette generator](/color-palette-generator)',
    '**4 spacing/size sliders** — Padding, Font Size, Link Gap, and CTA Radius with instant feedback',
    '**Font weight selector** — Regular (400), Medium (500), Semibold (600), Bold (700)',
    '**Shadow and border toggles** — add a subtle drop shadow or bottom border line with one click',
    '**CTA button support** — any link can be a filled CTA button using your accent color and rounded corners',
    '**Active link state** — single-select active state with automatic deactivation of previously active link',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a layout', text: 'At the top of the tool, four layout buttons let you switch between Default, Centered, Split, and Minimal. The live preview immediately shows how your current navbar looks in the chosen layout. The Split layout uses a three-column CSS grid so the logo stays centered regardless of how many links appear on each side.' },
      { title: 'Configure your logo', text: 'Open the Logo tab in the left panel. Toggle the "Show Logo" button to show or hide it. Enter your brand name in the Brand Name field. Optionally add an emoji or symbol in the Icon field — it will appear before the brand name. In Minimal layout, the logo is always hidden regardless of this setting.' },
      { title: 'Set up your links', text: 'Open the Links tab. Each link row shows up/down arrows to reorder, a label field, a green dot button to mark it as the active link, a CTA toggle to style it as a button, and a delete button. Click "+ Add Link" to add new links. The active state is mutually exclusive — setting one link active deactivates all others.' },
      { title: 'Style your navbar', text: 'Open the Style tab. Use the three color pickers to set Background, Text, and Accent colors. Use the four sliders to adjust Padding, Font Size, Link Gap, and CTA Radius. Select a Font Weight. Toggle Drop Shadow and Bottom Border as needed.' },
      { title: 'Copy the code in your format', text: 'In the right panel, click the language tab for your target stack: HTML, React, Tailwind, or Vue. The full code for your configured navbar appears instantly. Click "⎘ Copy" to copy it to your clipboard and paste directly into your project.' },
    ],
  },
  useCases: [
    { icon: '⚡', title: 'Skip navbar boilerplate when starting a new project', desc: 'Configure brand colors and links, export the code, and move on to features instead of fighting flexbox alignment. The exported HTML+CSS snippet drops directly into any project. Browse ready-made navigation patterns in the [UI snippets library](/ui-snippets) too.' },
    { icon: '◑', title: 'Compare layout options before committing to Default, Centered, or Split', desc: 'Switch between the four layouts instantly to see which fits your design best — no writing and re-writing the flexbox or grid structure for each option.' },
    { icon: '⇄', title: 'Export the same navbar as React, Tailwind, or Vue when migrating frameworks', desc: 'Configure your existing navbar once and export the component version in your target framework without manually rewriting CSS class names to inline styles or utility classes.' },
    { icon: '▦', title: 'Generate a clean HTML+CSS navbar snippet for a CMS or website builder', desc: 'Match the client\'s brand colors with the color pickers, export HTML+CSS, and hand off a self-contained snippet that works in any CMS template, landing page builder, or HTML email tool.' },
    { icon: '△', title: 'See how the same navbar structure is implemented differently across frameworks', desc: 'Compare how CSS classes, React inline styles, Tailwind arbitrary values, and Vue scoped styles all produce the same visual result. Export all four and diff them to understand framework-specific conventions.' },
    { icon: '⬡', title: 'Generate a base navbar component as a starting point for a design system', desc: 'Export with your design system colors and spacing values. The code uses hardcoded hex values and px units that are easy to replace with CSS custom properties or design tokens once you move it into your component library.' },
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
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
