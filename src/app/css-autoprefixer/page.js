import CssAutoprefixerTool from '@/components/CssAutoprefixerTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/css-autoprefixer.png';

export const metadata = {
  title: 'CSS Autoprefixer Online Free — Add Vendor Prefixes | webdevpuneet.com',
  description: 'Add CSS vendor prefixes online with PostCSS Autoprefixer — set Browserslist targets and control grid/flexbox prefixes. Copy or download CSS. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-autoprefixer/' },
  icons: { icon: '/icons/css-autoprefixer.svg', shortcut: '/icons/css-autoprefixer.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-autoprefixer/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Autoprefixer Online - Browserslist Vendor Prefixes',
    description: 'Paste CSS, choose target browsers, reject unsupported browsers, and generate prefixed CSS with PostCSS Autoprefixer.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'CSS Autoprefixer Online Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Autoprefixer Online - Add Vendor Prefixes',
    description: 'Use real PostCSS Autoprefixer with Browserslist targets, reject rules, grid/flexbox settings, copy and download.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I add vendor prefixes to CSS online?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste your CSS into the input editor, choose a Browserslist preset or custom browser query, optionally reject specific browsers, and click Autoprefix CSS. The tool runs PostCSS Autoprefixer in your browser and outputs CSS with the vendor prefixes required by your selected browser support target.' },
    },
    {
      '@type': 'Question',
      name: 'What is Browserslist in Autoprefixer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Browserslist is the query format used by Autoprefixer, Babel, Stylelint, and many build tools to describe browser support. Queries such as defaults, last 2 versions, > 0.5%, not dead, or not ie <= 11 are resolved into a concrete browser list. Autoprefixer uses that resolved list to decide which CSS vendor prefixes are still needed.' },
    },
    {
      '@type': 'Question',
      name: 'Can I exclude or reject browsers from CSS prefixing?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the Reject browsers box to enter one browser query per line, such as ie <= 11 or op_mini all. The tool converts those entries to not rules and combines them with your selected preset or custom Browserslist query before running Autoprefixer.' },
    },
    {
      '@type': 'Question',
      name: 'Which Browserslist target should I choose for Autoprefixer?',
      acceptedAnswer: { '@type': 'Answer', text: 'For most modern websites, start with defaults or the Modern evergreen preset. If your audience includes older corporate desktops, older Safari versions, or long-tail browser usage, use Broad support or Enterprise support. If you already have project requirements, switch to Custom query and paste the same Browserslist rules you use in package.json or .browserslistrc.' },
    },
    {
      '@type': 'Question',
      name: 'What does the CSS Grid prefix setting do?',
      acceptedAnswer: { '@type': 'Answer', text: 'The grid setting controls Autoprefixer support for older Microsoft grid syntax. Disable grid prefixes if you only support modern browsers. Enable grid autoplace when you want Autoprefixer to add prefixed grid output for layouts that can be translated safely. The no-autoplace mode is more conservative when automatic placement would be risky.' },
    },
    {
      '@type': 'Question',
      name: 'Will Autoprefixer remove old prefixes from my CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, if Remove outdated prefixes is enabled. Autoprefixer removes prefixes that are unnecessary for your selected browser targets and keeps the ones that are still needed. Turn this option off if you want to preserve legacy prefixes exactly as they appear in the input.' },
    },
    {
      '@type': 'Question',
      name: 'Is this the same as the npm autoprefixer package?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool uses PostCSS with the Autoprefixer package and Browserslist queries. It is meant for quick browser-based work, code snippets, CMS styles, prototypes, and debugging. For production projects, you can copy the same Browserslist query into your package.json or .browserslistrc file.' },
    },
    {
      '@type': 'Question',
      name: 'Is my CSS uploaded to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. CSS processing runs in your browser. Your stylesheet, browser targets, and generated output are not uploaded to a server. You can safely use the tool for client CSS, private component styles, design-system snippets, and proprietary code.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Autoprefixer Online',
  url: 'https://webdevpuneet.com/css-autoprefixer/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Browser-based CSS Autoprefixer using PostCSS, Autoprefixer, and Browserslist. Add vendor prefixes, choose or reject browsers, and control grid/flexbox settings.',
  featureList: [
    'Add CSS vendor prefixes online with PostCSS Autoprefixer',
    'Choose Browserslist presets or custom browser targets',
    'Reject specific browsers with not rules',
    'Preview resolved browser targets',
    'Control CSS Grid prefixing mode',
    'Control Flexbox prefixing mode',
    'Remove outdated prefixes or preserve existing ones',
    'Copy or download autoprefixed CSS',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Autoprefixer', item: 'https://webdevpuneet.com/css-autoprefixer/' },
  ],
};

const about = [
  'This CSS Autoprefixer tool adds vendor prefixes to CSS using the same PostCSS Autoprefixer engine developers use in production build pipelines. Paste CSS, choose a browser support target, reject browsers you no longer support, and generate prefixed CSS that matches your compatibility requirements. It is built for searches like **CSS autoprefixer online**, **add vendor prefixes to CSS**, **PostCSS Autoprefixer browser targets**, and **Browserslist CSS prefixes**.',
  'Vendor prefixes exist because browser engines sometimes shipped CSS features behind engine-specific names before the final standard stabilized. A property like `user-select`, `appearance`, `backdrop-filter`, `mask-image`, Flexbox, or older Grid support may need `-webkit-`, `-moz-`, or `-ms-` forms depending on which browsers you support. Writing those rules by hand is tedious and error-prone. Autoprefixer solves the problem by reading your CSS, checking Can I Use data through Browserslist, and adding only the prefixes required by the target browsers.',
  'The important part is browser targeting. A website that only supports current Chrome, Safari, Firefox, and Edge needs fewer prefixes than an enterprise dashboard that still supports older Safari or corporate-managed Edge versions. This tool exposes that targeting directly. Pick Defaults, Modern evergreen, Broad support, Enterprise support, Mobile browsers, or Custom query. Then use the Reject browsers box to exclude targets such as IE 11, Opera Mini, or any browser family your project has officially dropped.',
  'Advanced settings match real Autoprefixer options. **Remove outdated prefixes** cleans up prefixes no longer needed for your selected targets. **Cascade aligned prefixes** formats prefixed declarations in the old aligned style. **CSS Grid** controls whether older Microsoft grid prefixes are generated, including an autoplace mode. **Flexbox** controls whether older Flexbox syntax is generated. After processing, copy the output, download it as CSS, or run it through [CSS Minifier & Beautifier](/css-minifier-beautifier) before deploying. If you are converting a snippet into utility classes, use [CSS to Tailwind](/css-to-tailwind/) after prefixing or cleanup.',
].join('\n\n');

const features = [
  'Run real PostCSS Autoprefixer in the browser without installing Node.js or configuring a build step.',
  'Choose browser support from practical presets: Defaults, Modern evergreen, Broad support, Enterprise support, Mobile, or Custom.',
  'Reject browsers with line-by-line exclusion queries such as IE <= 11, Opera Mini, or old Android Browser.',
  'Preview the resolved Browserslist output so you can see exactly which browsers drive prefix decisions.',
  'Generate `-webkit-`, `-moz-`, and `-ms-` CSS prefixes only when your selected browser targets require them.',
  'Control CSS Grid prefixing with disabled, autoplace, or no-autoplace modes for older Microsoft grid syntax.',
  'Control Flexbox prefixing, including no-2009 mode for avoiding very old Flexbox syntax.',
  'Remove outdated prefixes automatically or preserve existing prefixes when auditing legacy CSS.',
  'Copy output to the clipboard or download `autoprefixed.css` for use in a project.',
  'Process CSS locally in your browser with no upload, no account, and no server-side storage.',
];

const howToUse = {
  items: [
    { title: 'Paste your CSS', text: 'Paste a stylesheet, component CSS, CMS snippet, or design-system rule set into the input editor. The sample includes Flexbox, Grid, user-select, appearance, mask-image, and backdrop-filter so you can see how the output changes with different browser targets.' },
    { title: 'Choose target browsers', text: 'Select a preset or switch to Custom query. Autoprefixer uses Browserslist syntax, so queries like `defaults`, `last 2 versions`, `> 0.5%`, `Firefox ESR`, and `not dead` work as expected. The resolved browser preview updates immediately.' },
    { title: 'Reject browsers you do not support', text: 'Enter excluded browser queries in the Reject browsers field. For example, use `ie <= 11` or `op_mini all` when your project has dropped those targets. The tool converts each line into a `not ...` Browserslist rule before prefixing.' },
    { title: 'Adjust prefix behavior', text: 'Choose the CSS Grid mode, Flexbox mode, whether outdated prefixes should be removed, and whether prefixed declarations should be cascade-aligned. These settings mirror common Autoprefixer configuration options from build tools.' },
    { title: 'Generate and export', text: 'Click Autoprefix CSS, review warnings if Autoprefixer reports any, then copy or download the output. For production delivery, minify the result with [CSS Minifier & Beautifier](/css-minifier-beautifier).' },
  ],
};

const useCases = [
  { icon: 'CSS', title: 'Add vendor prefixes to CSS from a tutorial or code snippet', desc: 'Code examples often show modern CSS without prefixes. Paste the snippet, choose your project browser support, and generate the prefixed CSS before dropping it into a production page or CMS field.' },
  { icon: 'WEB', title: 'Target Safari and mobile browsers accurately', desc: 'Safari and mobile browser support often drives prefixes for appearance, masks, filters, and newer CSS features. Use the Mobile preset or custom iOS/Safari queries to generate prefixes for mobile-heavy audiences.' },
  { icon: 'SAFE', title: 'Drop unsupported browsers deliberately', desc: 'When a project officially stops supporting IE 11, old Android Browser, or Opera Mini, add those lines to Reject browsers. The resolved list makes the decision visible instead of hiding it in a build config.' },
  { icon: 'FLOW', title: 'Prototype without configuring PostCSS', desc: 'When you need prefixed CSS quickly but do not want to set up Vite, webpack, PostCSS, or package scripts, this browser tool gives you Autoprefixer output immediately. Later you can move the same Browserslist query into your project.' },
  { icon: 'DOC', title: 'Clean up legacy prefixed CSS', desc: 'Enable Remove outdated prefixes and target modern browsers to remove old prefixes that no longer matter. Then send the cleaned output to [CSS Minifier & Beautifier](/css-minifier-beautifier) for formatting or compression.' },
  { icon: 'CODE', title: 'Audit browser support before a CSS migration', desc: 'Paste old component CSS, test several Browserslist presets, and compare how many prefixes remain. This helps teams decide whether they can simplify stylesheets before migrating to a new design system or Tailwind workflow.' },
];

const faqs = faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text }));

export default function CssAutoprefixerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssAutoprefixerTool /></div>
      <AdSlot slot="css-autoprefixer-below-tool" />
      <IndexOnly><SeoSection
        slug="css-autoprefixer"
        title="CSS Autoprefixer Online - Add Vendor Prefixes"
        subtitle="Use PostCSS Autoprefixer with Browserslist targets, rejected browsers, grid/flexbox settings, copy, and download."
        sections={[
          { type: '2col', left: { type: 'text', label: 'About this tool', text: about }, right: { type: 'features', heading: 'Features', items: features } },
          { type: 'steps', heading: 'How to Use', items: howToUse.items },
          { type: 'cards', heading: 'Common Use Cases', columns: 3, items: useCases },
          { type: 'faq', heading: 'Frequently Asked Questions', items: faqs },
        ]}
      /></IndexOnly>
    </div>
  );
}
