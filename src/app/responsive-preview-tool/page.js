import ResponsivePreviewTool from '@/components/ResponsivePreviewTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Responsive Design Tester — Any Screen Size Free | webdevpuneet.com',
  description: 'Free responsive design tester. Preview any website at 10+ screen sizes — mobile, tablet, desktop. Shareable URLs, zoom controls, orientation flip. No sign-up needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/responsive-preview-tool/' },
  icons: { icon: '/icons/responsive-preview-tool.svg', shortcut: '/icons/responsive-preview-tool.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/responsive-preview-tool/', siteName: 'webdevpuneet.com', title: 'Responsive Design Tester — Preview Any Website on Any Device', description: 'Preview any website at 10+ device sizes with shareable ?link= URLs, orientation flip, and zoom. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/responsive-preview.png', width: 1200, height: 630, alt: 'Responsive Design Tester' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Responsive Design Tester — Preview Any Website', description: 'Preview any website at 10+ device sizes with shareable links, orientation flip, and zoom. Free, no sign-up.', images: ['https://webdevpuneet.com/images/responsive-preview.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does this Responsive Preview Tool do?', acceptedAnswer: { '@type': 'Answer', text: 'Responsive Preview Tool loads any publicly accessible website inside an iframe at exact device viewport pixel dimensions, letting you see how the site responds at different screen sizes without resizing your browser window. You can switch between 10 device presets covering mobile, tablet, and desktop widths, flip orientation between portrait and landscape, use a custom size input for non-standard viewports, and zoom the preview to fit your screen. When you preview a URL the page URL updates to include a ?link= parameter, so you can share the exact preview configuration with teammates or clients.' } },
    { '@type': 'Question', name: 'How do shareable preview links work?', acceptedAnswer: { '@type': 'Answer', text: 'When you enter a URL and click Preview, the tool appends a ?link= query parameter to its own page URL encoding your target site\'s address. Anyone who opens that URL will see the target site immediately loaded in the preview at the default device size. You can also manually construct shareable URLs in the format /responsive-preview-tool?link=https://yoursite.com to create permanent bookmarks or share links in Slack, email, or design review documents for your team.' } },
    { '@type': 'Question', name: 'What device sizes are included?', acceptedAnswer: { '@type': 'Answer', text: 'The tool includes 10 device presets: Mobile S (320×568), Mobile M (375×667), Mobile L (428×926), Tablet Portrait (768×1024), Tablet Landscape (1024×768), iPad Pro Portrait (1024×1366), iPad Pro Landscape (1366×1024), Laptop (1280×800), Desktop (1440×900), and Wide 2K (1920×1080). A Custom option lets you enter any arbitrary width and height values for non-standard viewport sizes that fall outside the preset list.' } },
    { '@type': 'Question', name: 'Why might a website not load in the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Many websites set the X-Frame-Options: DENY or SAMEORIGIN HTTP header, or use Content-Security-Policy: frame-ancestors \'none\' to block being embedded in iframes as a protection against clickjacking attacks. If the tool detects this block, it shows an error message with a direct link to open the page in a new tab for manual inspection. Major sites like Google, Facebook, and most banking sites use this iframe protection by design.' } },
    { '@type': 'Question', name: 'Can I flip between portrait and landscape orientation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the Portrait/Landscape toggle button in the controls bar to swap the width and height dimensions of the currently selected device preset. For example, iPad Pro Portrait (1024×1366) becomes 1366×1024 in landscape mode. This lets you quickly test how your responsive layout responds to device rotation on tablet and large-phone viewports, which is important for apps that support both orientations.' } },
    { '@type': 'Question', name: 'How do I use the zoom controls?', acceptedAnswer: { '@type': 'Answer', text: 'Use the 25/50/75/100% quick preset buttons to scale the preview to a fraction of its actual size — useful when the target device (e.g. 1920px wide) is wider than your browser window. The Fit button auto-calculates the exact zoom percentage needed to fill your available screen area with the full device preview at the current viewport dimensions. Use + and − buttons for fine-grained zoom adjustment between the standard presets.' } },
    { '@type': 'Question', name: 'Does the preview simulate mobile touch events or device pixel ratio?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool only controls the CSS viewport width — it does not simulate touch events, devicePixelRatio, media features like hover: none, or pointer: coarse. For full hardware simulation including touch events, high-DPI rendering, and mobile-specific CSS media features, use Chrome DevTools\' Device Emulation mode or test on actual hardware. This tool is best for quickly checking layout and content reflow across a range of viewport widths.' } },
    { '@type': 'Question', name: 'Can I test a local development server?', acceptedAnswer: { '@type': 'Answer', text: 'To preview localhost URLs, open this tool in the same browser where your local server is running and type your localhost URL (e.g. http://localhost:3000) into the address bar. The browser can load local addresses in iframes if both origins are localhost. However, since this tool is served from a different origin, some browsers may block the cross-origin iframe for security reasons. If blocked, use Chrome DevTools\' built-in Responsive Design Mode for localhost development testing.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Responsive Design Tester',
  url: 'https://webdevpuneet.com/responsive-preview-tool/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free responsive design preview tool that loads any website at 10+ device viewport sizes with shareable links, orientation flip, and zoom controls.',
  featureList: ['10+ device presets', 'Shareable ?link= URLs', 'Orientation flip', 'Custom W×H input', 'Fit-to-window zoom', 'Breakpoint ruler', 'Works with any public URL'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Responsive Preview Tool', item: 'https://webdevpuneet.com/responsive-preview-tool/' },
  ],
};

const SEO = {
  slug: 'responsive-preview-tool',
  title: 'Responsive Design Tester — Preview Any Website on Any Device',

  about: {
    title: 'Preview Any Website at Any Device Width Instantly — Share the Preview URL with Your Team',
    description: `You need to verify that your site still looks right at 320px mobile and 1440px desktop — but resizing the browser window manually is slow, imprecise, and doesn't test real device widths. Paste the URL here, select a device, and see the exact viewport instantly without installing a browser extension or setting up any configuration. Works for any publicly accessible URL — staging environments, production sites, client websites, or competitor pages.\n\nThe tool loads any public URL inside an iframe sandboxed with \`allow-scripts\`, \`allow-same-origin\`, \`allow-forms\`, and \`allow-popups\`, then constrains it to the exact pixel dimensions of the selected preset. **Mobile S** (320×568) covers the smallest common smartphones. **Mobile** (390×844) targets iPhone 12/13/14. **Mobile L** (428×926) covers the iPhone Pro Max class. **Tablet Portrait** (768×1024) and **Tablet Landscape** (1024×768) test the standard iPad viewport. **iPad Pro** (1024×1366 portrait, 1366×1024 landscape) targets the large tablet class. **Laptop** (1280×800), **Desktop** (1440×900), and **Wide 2K** (1920×1080) cover common monitor sizes. A **Custom** W×H input accepts any arbitrary dimensions, and the orientation toggle swaps width and height for landscape testing without re-entering numbers.\n\nRather than resizing the actual iframe element to preview large desktop layouts on a small laptop screen, the tool keeps the iframe at its true device width and height and scales it down with a CSS \`transform\`, with \`transform-origin\` pinned to the top-left corner. That means the page inside genuinely renders at 1920px or whatever width you picked — its media queries fire exactly as they would on a real device — while what you see on screen is a shrunk, pixel-accurate snapshot. The zoom control (25/50/75/100% presets, fine +/- 5% buttons, or **Fit to window**, which measures the canvas and computes the largest scale that keeps the frame fully visible) only ever changes that transform scale, never the underlying rendered width.\n\nA standout feature is shareable **\`?link=\`** URLs — clicking Preview updates the page address with the target site encoded as a query parameter, so sharing that link auto-loads the same site into the same tool state. If a site refuses to be embedded via X-Frame-Options or Content-Security-Policy, the error handler catches the failed load and shows an overlay with a direct "open in new tab" link instead of a blank iframe. Four **canvas backgrounds** (Dots, Grid, Dark, Light) add contrast against different review contexts, and a reload button remounts the iframe to re-run animations or clear form state.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter the URL to preview', text: 'Type or paste any publicly accessible website URL into the address bar at the top — include the full URL with the https:// prefix. Press Enter or click the Go button to load the site inside the preview frame.' },
      { title: 'Select a device preset', text: 'Choose a device from the presets to instantly resize the viewport — select Mobile S (320px) for the smallest mobile, Tablet Portrait (768×1024) for standard tablet, Desktop (1440×900) for laptop, or any other preset. Use Custom to enter arbitrary width and height values.' },
      { title: 'Flip orientation if needed', text: 'Click the Orientation toggle button to flip between portrait and landscape mode — the width and height swap so you can test how a tablet or large-phone layout responds when the device is rotated.' },
      { title: 'Adjust zoom to fit your screen', text: 'Use the zoom controls to scale the preview if the device viewport is wider than your browser window. Click 50% to see the full preview at half scale, or click Fit to automatically scale the preview to fill your available screen area.' },
      { title: 'Share a pre-configured preview URL', text: 'The page URL updates to include ?link= with the encoded target URL whenever you preview. Copy that URL to share a pre-configured preview with any team member or client for instant feedback without any setup on their end.' },
    ],
  },

  features: [
    '10 device presets — Mobile S 320px through Wide 2K 1920×1080 covering the full common viewport range',
    'Shareable ?link= URLs — share a URL that auto-loads the preview with your target site pre-encoded',
    'Portrait / Landscape orientation toggle — swaps width and height for any device preset instantly',
    'Custom W×H input — enter any arbitrary viewport dimensions for non-standard screen sizes; define fluid sizes with our [CSS Clamp Generator](/css-clamp-generator)',
    'Zoom controls — 25/50/75/100% quick presets, Fit-to-window auto-scale, and + / − fine controls',
    'Breakpoint ruler — highlights 375/768/1024/1280/1440px breakpoint markers along the frame edge; build the responsive grid behind your layout with our [CSS Grid Builder](/css-grid-builder)',
    'Canvas background options — Dots, Grid, Dark, Light for different review contexts',
    'Viewport dimensions displayed below the preview frame for precise reference',
    'X-Frame-Options block detection with clear error message and "Open in new tab" fallback link',
    '100% free — no sign-up, no extension needed, works in any modern browser; sort Tailwind responsive classes with our [Tailwind Formatter](https://fwdtools.com/tailwind-formatter/)',
  ],

  useCases: [
    {
      icon: '⬡',
      title: 'Jump between breakpoints instantly while building a responsive layout',
      desc: 'Instead of manually dragging the browser window to approximate device widths, click a preset and see the exact layout at 320px, 375px, 768px, or 1440px. The breakpoint ruler marks the standard CSS breakpoints so you can verify that your media queries fire at the right dimensions. Build the underlying flex layout with our [Flexbox Builder](/flexbox-builder).',
    },
    {
      icon: '▦',
      title: 'Run a pre-launch QA pass across all device sizes before deploying',
      desc: 'Systematically click through every device preset and verify that nothing overflows, wraps, or breaks at any viewport. The orientation flip checks tablet portrait and landscape. Share a ?link= URL with your QA team so everyone tests the same URL at the same device config without any setup.',
    },
    {
      icon: '◎',
      title: 'Show a client their site on mobile and desktop without them installing anything',
      desc: 'Switch between mobile, tablet, and desktop presets in seconds during a screen-share or presentation. Share a ?link= URL so the client can explore device sizes independently in their own browser after the call — no browser extension, no additional tools.',
    },
    {
      icon: '⚙',
      title: 'Reproduce a layout bug at the exact viewport size a user reported',
      desc: 'When a user reports "broken on my phone," load the URL and use the Custom W×H input to enter the exact reported dimensions. Screenshot the issue at the precise viewport and include the dimensions in the bug report for development to reproduce exactly.',
    },
    {
      icon: '≡',
      title: 'Verify a staging site matches the design spec at each breakpoint during handoff',
      desc: 'Paste the staging URL, switch between the device sizes in your design file, and compare the rendered layout to the mockups. The zoom-to-fit option shows the full page layout at once for any device size without horizontal scrolling. Use our [CSS Animation Generator](/css-animation-generator) to fine-tune any transition animations that differ from the mockup.',
    },
    {
      icon: '✦',
      title: 'Check a competitor site or client site across device sizes without installing anything',
      desc: 'Preview any public URL at any device width — no extension, no devtools, no account. Bookmark ?link= URLs for competitor or client sites you check regularly to create a lightweight cross-device monitoring workflow.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function ResponsivePreviewToolPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ResponsivePreviewTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
