import ResponsivePreviewTool from '@/components/ResponsivePreviewTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Responsive Design Tester — Multi-Device View & Screenshots',
  description: 'Free responsive design tester. Preview any site on 10 devices side by side, drag to any width, check breakpoints and save full-page screenshots. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/responsive-preview-tool/' },
  icons: { icon: '/icons/responsive-preview-tool.svg', shortcut: '/icons/responsive-preview-tool.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/responsive-preview-tool/', siteName: 'webdevpuneet.com', title: 'Responsive Design Tester — Preview Any Website on Any Device', description: 'Preview any website on 10 device sizes or side by side, drag the frame to any width, check breakpoints and save full-page screenshots. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/responsive-preview.png', width: 1200, height: 630, alt: 'Responsive Design Tester' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Responsive Design Tester — Preview Any Website', description: 'Preview any website on 10 devices side by side, drag to any width, check breakpoints and save screenshots. Free, no sign-up.', images: ['https://webdevpuneet.com/images/responsive-preview.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does this Responsive Preview Tool do?', acceptedAnswer: { '@type': 'Answer', text: 'Responsive Preview Tool loads any publicly accessible website inside an iframe at exact device viewport pixel dimensions, so you can see how the site responds at different screen sizes without resizing your browser window. Pick one of 10 device presets covering mobile, tablet, and desktop, type any width and height, or drag the frame edges to resize it live. You can rotate between portrait and landscape, show several devices side by side, zoom to fit your screen, check widths against a breakpoint ruler, go fullscreen, and save a screenshot of the visible preview or the whole page. The page URL keeps your whole setup, so you can share it with teammates or clients.' } },
    { '@type': 'Question', name: 'How do shareable preview links work?', acceptedAnswer: { '@type': 'Answer', text: 'Once you load a site, the tool keeps its own page URL in sync with your setup: the target address (?link=), the device preset or custom width and height, orientation, zoom, canvas background, and the devices chosen in multi-device view. Anyone who opens that URL sees exactly the same preview. The simplest form, /responsive-preview-tool/?link=https://yoursite.com, still works for bookmarks or links shared in Slack, email, or design review documents.' } },
    { '@type': 'Question', name: 'What device sizes are included?', acceptedAnswer: { '@type': 'Answer', text: 'The Device menu includes 10 presets: Mobile S (320×568), Mobile (390×844), Mobile L (428×926), Tablet portrait (768×1024), Tablet landscape (1024×768), iPad Pro portrait (1024×1366), iPad Pro landscape (1366×1024), Laptop (1280×800), Desktop (1440×900), and Wide 2K (1920×1080). For anything else, type a width and height into the size boxes, or drag the right edge, bottom edge, or corner of the frame. Custom sizes run from 200px up to 3840px.' } },
    { '@type': 'Question', name: 'Can I see several devices at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Turn on Multi-device view in the Device menu, or press M, and the site loads in several frames side by side. Mobile, Tablet portrait, and Laptop are shown by default; tick or untick any of the 10 presets in the same menu to change the set. Rotate swaps every frame between portrait and landscape, Fit zooms the whole row to fit your screen, and the selected devices are saved in the shareable URL.' } },
    { '@type': 'Question', name: 'How do I take a screenshot of the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Open the Screenshot menu and choose Visible area or Full page. Visible area uses your browser\'s screen-capture prompt (choose "This tab"), then crops the image to the preview frame, or to the whole row in multi-device view. It is saved at the size shown on screen, so set zoom to 100% for true device pixels. Full page captures the whole page from top to bottom at the current width: the URL is sent to the free Microlink screenshot service, which renders it and returns a PNG. That only works for public URLs and has a daily free limit.' } },
    { '@type': 'Question', name: 'Why might a website not load in the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Many websites send the X-Frame-Options: DENY or SAMEORIGIN header, or Content-Security-Policy: frame-ancestors \'none\', which stops them from being shown inside an iframe. This protects against clickjacking. Browsers do not tell the page when a frame is blocked, so the tool shows a reminder bar with an "Open in new tab" link whenever a site loads. If a page takes more than 12 seconds to load, an error message appears in the frame. Major sites like Google, GitHub, Facebook, and most banks block embedding on purpose.' } },
    { '@type': 'Question', name: 'Can I flip between portrait and landscape orientation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the Rotate button next to the size boxes, or press R, to swap the width and height of the current device or custom size. For example, iPad Pro portrait (1024×1366) becomes 1366×1024. The button turns blue while the frame is in landscape. In multi-device view, Rotate turns every frame at once, so you can check how a layout handles device rotation across phones and tablets together.' } },
    { '@type': 'Question', name: 'How do I use the zoom controls?', acceptedAnswer: { '@type': 'Answer', text: 'The zoom menu sits between the − and + buttons. Choose Fit to window (or press F) to scale the preview so the whole frame fits your screen. Fit adjusts again whenever you resize the window or change device. You can also pick 25%, 50%, 75%, or 100%. The − and + buttons, or the - and + keys, step in 5% increments. Zoom only scales what you see. The page inside still renders at the full device width, so its media queries fire exactly as they would on a real device.' } },
    { '@type': 'Question', name: 'Does the preview simulate mobile touch events or device pixel ratio?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool only controls the CSS viewport width — it does not simulate touch events, devicePixelRatio, media features like hover: none, or pointer: coarse. For full hardware simulation including touch events, high-DPI rendering, and mobile-specific CSS media features, use Chrome DevTools\' Device Emulation mode or test on actual hardware. This tool is best for quickly checking layout and content reflow across a range of viewport widths.' } },
    { '@type': 'Question', name: 'Can I test a local development server?', acceptedAnswer: { '@type': 'Answer', text: 'Often, yes. Type your localhost URL (for example http://localhost:3000) into the address bar in the same browser where your dev server is running, and the iframe can usually load it. Some browsers block a page on a different origin from framing localhost, and dev servers that send X-Frame-Options will refuse. In that case use Chrome DevTools\' Responsive Design Mode. Full-page screenshots never work for localhost, because the Microlink service that renders them cannot reach your machine. Visible-area screenshots do work.' } },
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
  description: 'Free responsive design tester that loads any website at 10 device sizes or side by side, with drag-to-resize, a breakpoint ruler, screenshots, and shareable links.',
  featureList: ['10 device presets', 'Multi-device side-by-side view', 'Drag-to-resize frame', 'Custom W×H input', 'Breakpoint ruler with Tailwind breakpoint name', 'Rotate portrait / landscape', 'Fit-to-window zoom', 'Visible-area and full-page screenshots', 'Fullscreen preview', 'Shareable URLs that keep the full setup', 'Keyboard shortcuts', 'Works with any public URL'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Responsive Preview Tool', item: 'https://webdevpuneet.com/responsive-preview-tool/' },
  ],
};

const SEO = {
  slug: 'responsive-preview-tool',
  title: 'Responsive Design Tester — Preview Any Website on Any Device',

  about: {
    title: 'Preview Any Website at Any Device Width — Side by Side, Resizable, and Shareable',
    description: `You need to check that your site still looks right at 320px mobile and 1440px desktop. Resizing the browser window by hand is slow, imprecise, and doesn't test real device widths. Paste the URL here, pick a device, and see the exact viewport straight away, with no browser extension or setup. It works for any publicly accessible URL: staging environments, production sites, client websites, or competitor pages.\n\nThe tool loads the URL inside an iframe sandboxed with \`allow-scripts\`, \`allow-same-origin\`, \`allow-forms\`, and \`allow-popups\`, then sizes it to the exact pixel dimensions you choose. The **Device** menu groups 10 presets. **Mobile S** (320×568), **Mobile** (390×844), and **Mobile L** (428×926) cover phones. **Tablet** (768×1024 and 1024×768) and **iPad Pro** (1024×1366 and 1366×1024) cover tablets. **Laptop** (1280×800), **Desktop** (1440×900), and **Wide 2K** (1920×1080) cover monitors. For any other size, type a width and height, or **drag the frame's right edge, bottom edge, or corner**, and the size boxes update as you drag. **Rotate** swaps width and height for landscape testing, and **Multi-device view** puts several devices side by side so one change can be checked at mobile, tablet, and laptop widths at the same moment.\n\nThe frame always renders at its true device width and is scaled down with a CSS \`transform\` (\`transform-origin\` pinned top-left). The page inside really is 1920px or 390px wide, so its media queries fire exactly as they would on a real device, while what you see is a shrunk, pixel-accurate copy. **Fit to window** measures the canvas and picks the largest zoom that keeps every frame fully visible, and adjusts again when you resize the window. The **breakpoint ruler** above the frame marks 375, 768, 1024, 1280, and 1440px and shows the current width with its Tailwind breakpoint name (sm, md, lg, xl, 2xl), so you can see which media queries are active.\n\nWhen you're done, open the **Screenshot** menu. **Visible area** captures what's on screen through your browser's tab-capture prompt. **Full page** renders the whole page top to bottom at the current width through the free Microlink service. **Fullscreen** hides everything but the preview for client walkthroughs. The page URL keeps your whole setup (link, device or custom size, orientation, zoom, background, and the multi-device set), so sharing it opens the same view for anyone. If a site refuses to be embedded through X-Frame-Options or Content-Security-Policy, a reminder bar offers an "Open in new tab" link, and a load that never finishes shows an error message instead of a blank frame. Keyboard shortcuts cover the common actions: **R** rotate, **F** fit, **M** multi-device, **+ / −** zoom.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter the URL to preview', text: 'Type or paste any public website URL into the address bar. https:// is added if you leave it out. Press Enter or click Preview to load the site in the frame.' },
      { title: 'Choose a device or size', text: 'Open the Device menu and pick a preset, from Mobile S (320px) to Wide 2K (1920px). For any other size, type a width and height into the size boxes, or drag the frame\'s right edge, bottom edge, or corner to resize it live.' },
      { title: 'Rotate or compare devices', text: 'Click Rotate (or press R) to swap portrait and landscape. To compare layouts, turn on Multi-device view in the Device menu (or press M) and tick the devices you want side by side.' },
      { title: 'Fit, zoom and check breakpoints', text: 'Choose Fit to window in the zoom menu (or press F) to see the whole frame, or pick 25–100%. Turn on the breakpoint ruler from the View menu to see the current width and its Tailwind breakpoint. Change the canvas background there too, and use the fullscreen button for presentations.' },
      { title: 'Save a screenshot and share the link', text: 'Open the Screenshot menu to save the visible area or the full page, top to bottom, as a PNG. Copy the page URL to share the exact setup (site, device or size, orientation, zoom, and background) with your team or client.' },
    ],
  },

  features: [
    '10 device presets in one Device menu — Mobile S 320px through Wide 2K 1920×1080',
    'Multi-device view — show several devices side by side and compare one layout across mobile, tablet and desktop at once',
    'Drag-to-resize — pull the frame\'s edge or corner to any width and height between 200 and 3840px; define fluid sizes with our [CSS Clamp Generator](/css-clamp-generator)',
    'Breakpoint ruler — marks 375/768/1024/1280/1440px and shows the live width with its Tailwind breakpoint name; build the responsive grid behind your layout with our [CSS Grid Builder](/css-grid-builder)',
    'Rotate between portrait and landscape for any preset, custom size, or every frame in multi-device view',
    'Zoom menu — Fit to window (re-fits as you resize the window), 25/50/75/100% presets, and 5% − / + steps',
    'Screenshots — save the visible area, or the full page top to bottom at the current width, as a PNG',
    'Fullscreen preview for client walkthroughs and screen-shares',
    'Shareable URLs that keep the site, device or custom size, orientation, zoom, background and multi-device set',
    'Keyboard shortcuts — R rotate, F fit, M multi-device, + / − zoom',
    'Blocked-site help — "Open in new tab" link for sites that refuse iframe embedding, plus a timeout instead of a blank frame',
    '100% free — no sign-up, no extension needed, works in any modern browser; sort Tailwind responsive classes with our [Tailwind Formatter](/tailwind-formatter/)',
  ],

  useCases: [
    {
      icon: '⬡',
      title: 'Find the exact width where a responsive layout breaks',
      desc: 'Instead of dragging the browser window and guessing, drag the preview frame\'s edge and watch the width update pixel by pixel. The breakpoint ruler marks the standard CSS breakpoints and names the active Tailwind breakpoint, so you can see whether your media queries fire where you expect. Build the underlying flex layout with our [Flexbox Builder](/flexbox-builder).',
    },
    {
      icon: '▦',
      title: 'Run a pre-launch QA pass across all device sizes before deploying',
      desc: 'Turn on multi-device view to check phone, tablet and laptop at the same moment, then step through the rest of the presets. Rotate checks tablet portrait and landscape. Share the page URL with your QA team so everyone tests the same site at the same device setup without any configuration.',
    },
    {
      icon: '◎',
      title: 'Show a client their site on mobile and desktop without them installing anything',
      desc: 'Go fullscreen and switch between mobile, tablet and desktop during a screen-share, or show them side by side in multi-device view. Send the page URL afterwards so the client can explore the same view in their own browser — no extension, no extra tools.',
    },
    {
      icon: '⚙',
      title: 'Reproduce a layout bug at the exact viewport size a user reported',
      desc: 'When a user reports "broken on my phone," load the URL and type the exact reported width and height into the size boxes. Save a screenshot of the issue at that viewport and include the dimensions in the bug report so development can reproduce it exactly.',
    },
    {
      icon: '≡',
      title: 'Verify a staging site matches the design spec at each breakpoint during handoff',
      desc: 'Paste the staging URL, switch between the device sizes in your design file, and compare the rendered layout to the mockups. Save full-page screenshots at each width to put next to the designs. Use our [CSS Animation Generator](/css-animation-generator) to fine-tune any transition animations that differ from the mockup.',
    },
    {
      icon: '✦',
      title: 'Check a competitor site or client site across device sizes without installing anything',
      desc: 'Preview any public URL at any device width — no extension, no devtools, no account. Bookmark the page URLs for competitor or client sites you check regularly, each with its devices already set, for a lightweight cross-device monitoring routine.',
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
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
