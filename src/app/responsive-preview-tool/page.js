import ResponsivePreviewTool from '@/components/ResponsivePreviewTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Responsive Design Tester — Multi-Device View & Screenshots',
  description: 'Free responsive design tester. Preview any site on 18 real devices with frames and browser bars, compare two URLs, find overflow and save full-page screenshots.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/responsive-preview-tool/' },
  icons: { icon: '/icons/responsive-preview-tool.svg', shortcut: '/icons/responsive-preview-tool.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/responsive-preview-tool/', siteName: 'webdevpuneet.com', title: 'Responsive Design Tester — Preview Any Website on Any Device', description: 'Preview any website on 18 real devices with device frames and browser bars, compare staging vs live, find overflowing elements and save full-page screenshots. Free.', images: [{ url: 'https://webdevpuneet.com/images/responsive-preview.png', width: 1200, height: 630, alt: 'Responsive Design Tester' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Responsive Design Tester — Preview Any Website', description: 'Preview any website on 18 real devices with frames and browser bars, compare two URLs and save screenshots. Free, no sign-up.', images: ['https://webdevpuneet.com/images/responsive-preview.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does this Responsive Preview Tool do?', acceptedAnswer: { '@type': 'Answer', text: 'Responsive Preview Tool loads any publicly accessible website inside an iframe at exact device viewport pixel dimensions, so you can see how the site responds at different screen sizes without resizing your browser window. Pick one of 18 presets for current phones, tablets, laptops and desktops, type any width and height, or drag the frame edges to resize it live. You can rotate between portrait and landscape, show several devices side by side, compare two URLs, wrap the preview in a realistic device frame with browser bars, sweep the width to find breaking points, zoom to fit your screen, go fullscreen, and save a screenshot of the visible preview or the whole page. You can also paste HTML or drop an .html file to test code that isn\'t online yet, with an overflow finder and light/dark preview. The page URL keeps your whole setup, so you can share it with teammates or clients.' } },
    { '@type': 'Question', name: 'How do shareable preview links work?', acceptedAnswer: { '@type': 'Answer', text: 'Once you load a site, the tool keeps its own page URL in sync with your setup: the target address (?link=), the second address in compare mode, the device preset or custom width and height, orientation, zoom, canvas background, device frame and browser bars, and the devices chosen in multi-device view. Anyone who opens that URL sees exactly the same preview. The link button next to the address bar copies it in one click. Pasted HTML is the exception: it stays in your own browser and is never put in the link. The simplest form, /responsive-preview-tool/?link=https://webdevpuneet.com, still works for bookmarks or links shared in Slack, email, or design review documents.' } },
    { '@type': 'Question', name: 'What device sizes are included?', acceptedAnswer: { '@type': 'Answer', text: 'The Device menu has 18 presets with the CSS viewport sizes of current devices. Phones: Galaxy Z Fold folded (344×882), Galaxy S24 (360×780), iPhone SE (375×667), iPhone 16 (393×852), iPhone 16 Pro (402×874), Pixel 8 (412×915), and iPhone 16 Pro Max (440×956). Tablets: iPad mini (744×1133), Android tablet (800×1280), iPad / iPad Air 11-inch (820×1180), iPad Pro 11-inch (834×1210), and iPad Pro 13-inch (1032×1376). Laptops and desktops: Laptop HD (1366×768), MacBook Air 13-inch (1470×956), the most common laptop size (1536×864), MacBook Pro 16-inch (1728×1117), Full HD (1920×1080), and QHD (2560×1440). Landscape is one click away with Rotate. For anything else, type a width and height into the size boxes, or drag the right edge, bottom edge, or corner of the frame. Custom sizes run from 200px up to 3840px.' } },
    { '@type': 'Question', name: 'Can I see several devices at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Turn on Multi-device view in the Device menu, or press M, and the site loads in several frames side by side. iPhone 16, iPad, and a 1536px laptop are shown by default. Tick or untick any of the 18 presets in the same menu to change the set. Rotate swaps every frame between portrait and landscape, Fit zooms the whole row to fit your screen, and the selected devices are saved in the shareable URL.' } },
    { '@type': 'Question', name: 'How do I take a screenshot of the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Open the Screenshot menu and choose Visible area or Full page. Visible area uses your browser\'s screen-capture prompt (choose "This tab"), then crops the image to the preview frame, or to the whole row in multi-device view. It is saved at the size shown on screen, so set zoom to 100% for true device pixels. Full page captures the whole page from top to bottom at the current width: the URL is sent to the free Microlink screenshot service, which renders it and returns a PNG. That only works for public URLs and has a daily free limit.' } },
    { '@type': 'Question', name: 'Can I show a device frame and the browser bars?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Turn on Device frame in the View menu to wrap the preview in a realistic bezel: a Dynamic Island on current iPhones, a punch-hole camera on Android phones, a home button on iPhone SE, and monitor bezels on laptops and desktops. Turn on Browser bars to add the status bar, address bar, toolbars, home indicator, or taskbar a real visitor sees. The bars take space from the page exactly as they do on the device, so the bottom edge of the frame becomes the real fold. Bar heights are approximate, because they vary with browser version and settings. Screenshots of the visible area include the frame and bars.' } },
    { '@type': 'Question', name: 'Can I compare two URLs side by side?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Choose Compare two URLs in the Device menu. A second address bar appears, and both sites load next to each other at the same device size, labelled A and B. That makes staging against production, before and after a deploy, or your site against a competitor\'s quick to check. Rotate, the size boxes, zoom, device frames, browser bars, and the width sweep apply to both. The swap button exchanges A and B, and both addresses are kept in the shareable link.' } },
    { '@type': 'Question', name: 'Can I test HTML that isn\'t online yet?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Switch the address bar to HTML and paste a full page or a fragment, or drop an .html file anywhere on the preview. The code runs in a sandboxed frame without access to this site, and it stays in your browser. Because the page is local, the Inspect menu can look inside it. Overflow finder outlines in red every element wider than the screen, which is the usual cause of sideways scrolling on mobile. Sync scrolling keeps all multi-device frames at the same scroll position. Colour scheme forces prefers-color-scheme light or dark so you can check both themes. From UI Snippets, the "Test in Responsive Preview" button opens a snippet here directly.' } },
    { '@type': 'Question', name: 'What does the width sweep do?', acceptedAnswer: { '@type': 'Answer', text: 'The sweep button next to Rotate (or the S key) animates the frame from 320px to 1920px wide, keeping the height, so you can watch the layout reflow and spot the exact widths where it jumps, wraps, or breaks. The breakpoint ruler shows the live width as it moves. Click the button again, drag the frame, or pick a device to stop at the current width and inspect it.' } },
    { '@type': 'Question', name: 'Why might a website not load in the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Many websites send the X-Frame-Options: DENY or SAMEORIGIN header, or Content-Security-Policy: frame-ancestors \'none\', which stops them from being shown inside an iframe. This protects against clickjacking. Browsers do not tell the page when a frame is blocked, so the tool shows a reminder bar with an "Open in new tab" link whenever a site loads. If a page takes more than 12 seconds to load, an error message appears in the frame. Major sites like Google, GitHub, Facebook, and most banks block embedding on purpose. For your own pages, pasting the HTML avoids the block completely.' } },
    { '@type': 'Question', name: 'Can I flip between portrait and landscape orientation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the Rotate button next to the size boxes, or press R, to swap the width and height of the current device or custom size. For example, iPad Pro 13-inch (1032×1376) becomes 1376×1032. The button turns blue while the frame is in landscape. In multi-device view, Rotate turns every frame at once, so you can check how a layout handles device rotation across phones and tablets together.' } },
    { '@type': 'Question', name: 'How do I use the zoom controls?', acceptedAnswer: { '@type': 'Answer', text: 'The zoom menu sits between the − and + buttons. Choose Fit to window (or press F) to scale the preview so the whole frame, device frame included, fits your screen. Fit adjusts again whenever you resize the window or change device. You can also pick 25%, 50%, 75%, or 100%. The − and + buttons, or the - and + keys, step in 5% increments. Zoom only scales what you see. The page inside still renders at the full device width, so its media queries fire exactly as they would on a real device.' } },
    { '@type': 'Question', name: 'Does the preview simulate mobile touch events or device pixel ratio?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool only controls the CSS viewport width — it does not simulate touch events, devicePixelRatio, media features like hover: none, or pointer: coarse. For full hardware simulation including touch events, high-DPI rendering, and mobile-specific CSS media features, use Chrome DevTools\' Device Emulation mode or test on actual hardware. This tool is best for quickly checking layout and content reflow across a range of viewport widths.' } },
    { '@type': 'Question', name: 'Can I test a local development server?', acceptedAnswer: { '@type': 'Answer', text: 'Often, yes. Type your localhost URL (for example http://localhost:3000) into the address bar in the same browser where your dev server is running, and the iframe can usually load it. Some browsers block a page on a different origin from framing localhost, and dev servers that send X-Frame-Options will refuse. In that case, open the page, save it (or copy its HTML), and paste it or drop the file into HTML mode, which needs no server at all. Full-page screenshots never work for localhost, because the Microlink service that renders them cannot reach your machine. Visible-area screenshots do work.' } },
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
  description: 'Free responsive design tester that loads any website at 18 real device sizes, with device frames, browser bars, multi-device and compare views, an overflow finder for pasted HTML, screenshots, and shareable links.',
  featureList: ['18 current device presets', 'Multi-device side-by-side view', 'Drag-to-resize frame', 'Custom W×H input', 'Breakpoint ruler with Tailwind breakpoint name', 'Rotate portrait / landscape', 'Fit-to-window zoom', 'Visible-area and full-page screenshots', 'Fullscreen preview', 'Device frames (Dynamic Island, punch-hole, bezels)', 'Browser and OS bars showing the real fold', 'Compare two URLs side by side', 'Width sweep animation', 'Paste HTML or drop an .html file', 'Overflow finder', 'Synced scrolling', 'Light / dark colour-scheme preview', 'Recent URLs and saved custom sizes', 'Shareable URLs that keep the full setup', 'Keyboard shortcuts', 'Works with any public URL'],
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
    description: `You need to check that your site still looks right at 320px mobile and 1440px desktop. Resizing the browser window by hand is slow, imprecise, and doesn't test real device widths. Paste the URL here, pick a device, and see the exact viewport straight away, with no browser extension or setup. It works for any publicly accessible URL: staging environments, production sites, client websites, or competitor pages.\n\nThe tool loads the URL inside an iframe sandboxed with \`allow-scripts\`, \`allow-same-origin\`, \`allow-forms\`, and \`allow-popups\`, then sizes it to the exact pixel dimensions you choose. The **Device** menu groups 18 presets with the real CSS viewport sizes of current devices. **Phones** run from the Galaxy Z Fold folded (344px) and Galaxy S24 (360px) through iPhone SE, iPhone 16, iPhone 16 Pro and Pixel 8 to the iPhone 16 Pro Max (440px). **Tablets** cover iPad mini (744px), Android tablets (800px), iPad and iPad Air (820px), and iPad Pro 11-inch and 13-inch (834px and 1032px). **Laptops and desktops** cover 1366×768, MacBook Air (1470px), the most common laptop size of 1536×864, MacBook Pro 16-inch (1728px), Full HD (1920px), and QHD (2560px). For any other size, type a width and height, or **drag the frame's right edge, bottom edge, or corner**, and the size boxes update as you drag. **Rotate** swaps width and height for landscape testing, and **Multi-device view** puts several devices side by side so one change can be checked at mobile, tablet, and laptop widths at the same moment.\n\nThe frame always renders at its true device width and is scaled down with a CSS \`transform\` (\`transform-origin\` pinned top-left). The page inside really is 1920px or 390px wide, so its media queries fire exactly as they would on a real device, while what you see is a shrunk, pixel-accurate copy. **Fit to window** measures the canvas and picks the largest zoom that keeps every frame fully visible, and adjusts again when you resize the window. The **breakpoint ruler** above the frame marks 375, 768, 1024, 1280, and 1440px and shows the current width with its Tailwind breakpoint name (sm, md, lg, xl, 2xl), so you can see which media queries are active.\n\nWhen you're done, open the **Screenshot** menu. **Visible area** captures what's on screen through your browser's tab-capture prompt. **Full page** renders the whole page top to bottom at the current width through the free Microlink service. **Fullscreen** hides everything but the preview for client walkthroughs. The page URL keeps your whole setup (link, device or custom size, orientation, zoom, background, and the multi-device set), so sharing it opens the same view for anyone. If a site refuses to be embedded through X-Frame-Options or Content-Security-Policy, a reminder bar offers an "Open in new tab" link, and a load that never finishes shows an error message instead of a blank frame. Keyboard shortcuts cover the common actions: **R** rotate, **F** fit, **M** multi-device, **S** width sweep, **+ / −** zoom.\n\nTo see the page the way a visitor does, open the **View** menu. **Device frame** adds a realistic bezel with a Dynamic Island, punch-hole camera, or home button, and **Browser bars** adds the status bar, address bar, toolbars, and taskbar. The bars take their real share of the screen, so the bottom of the frame is the true fold, and you can check whether the main call to action is visible without scrolling. **Compare two URLs** puts staging and production (or any two sites) side by side at the same size, and the **width sweep** animates the frame from 320px to 1920px so breaking points stand out.\n\nFor code that isn't online yet, switch the address bar to **HTML**. Paste a page or drop an .html file and it runs in a sandboxed frame that can't touch anything else on this site. Because the page is local, the **Inspect** menu can look inside it: the **overflow finder** outlines every element wider than the screen, **sync scrolling** keeps multi-device frames at the same position, and the **colour scheme** switch forces prefers-color-scheme light or dark. Recent URLs drop down under the address bar, and custom sizes you use often can be saved as your own presets in the Device menu.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter a URL or paste HTML', text: 'Type or paste any public website URL into the address bar. https:// is added if you leave it out, and recent URLs drop down as you type. Press Enter or click Preview. For code that isn\'t online, switch to HTML and paste it, or drop an .html file on the preview.' },
      { title: 'Choose a device or size', text: 'Open the Device menu and pick a real device, from Galaxy Z Fold (344px) and iPhone 16 (393px) to Full HD (1920px) and QHD (2560px) desktops. For any other size, type a width and height into the size boxes, or drag the frame\'s right edge, bottom edge, or corner to resize it live.' },
      { title: 'Rotate, compare or sweep', text: 'Click Rotate (or press R) to swap portrait and landscape. Turn on Multi-device view in the Device menu (or press M) to see several devices side by side, or Compare two URLs to put staging next to live. The sweep button (S) animates the width from 320px to 1920px to reveal breaking points.' },
      { title: 'Make it look real and inspect it', text: 'In the View menu, turn on Device frame and Browser bars to see the page as a visitor does, with the real fold, and the breakpoint ruler for the live width and Tailwind breakpoint. For pasted HTML, the Inspect menu finds overflowing elements, syncs scrolling across frames, and previews light and dark mode. Use Fit (F) or 25–100% zoom to size it on screen.' },
      { title: 'Save a screenshot and share the link', text: 'Open the Screenshot menu to save the visible area, frame and bars included, or the full page top to bottom as a PNG. Click the link button next to the address bar to copy a URL that reopens the exact setup for your team or client.' },
    ],
  },

  features: [
    '18 current device presets — iPhone 16 series, Pixel 8, Galaxy S24 and Z Fold, iPad mini to iPad Pro 13″, MacBook Air and Pro, and Full HD and QHD desktops',
    'Multi-device view — show several devices side by side and compare one layout across mobile, tablet and desktop at once',
    'Drag-to-resize — pull the frame\'s edge or corner to any width and height between 200 and 3840px; define fluid sizes with our [CSS Clamp Generator](/css-clamp-generator)',
    'Breakpoint ruler — marks 375/768/1024/1280/1440px and shows the live width with its Tailwind breakpoint name; build the responsive grid behind your layout with our [CSS Grid Builder](/css-grid-builder)',
    'Rotate between portrait and landscape for any preset, custom size, or every frame in multi-device view',
    'Zoom menu — Fit to window (re-fits as you resize the window), 25/50/75/100% presets, and 5% − / + steps',
    'Screenshots — save the visible area, or the full page top to bottom at the current width, as a PNG',
    'Fullscreen preview for client walkthroughs and screen-shares',
    'Device frames — Dynamic Island, punch-hole camera, iPhone SE home button, tablet and monitor bezels, drawn to scale',
    'Browser bars — status bar, address bar, toolbars, home indicator and taskbar take their real share of the screen, so the frame\'s bottom edge is the true fold',
    'Compare two URLs — staging vs production, or before vs after, side by side at the same device size',
    'Width sweep — animates the frame from 320px to 1920px so breaking points stand out',
    'Paste HTML or drop an .html file — test code that isn\'t online yet, in a sandboxed frame; or open any snippet from our [UI Snippets](/ui-snippets/) library',
    'Overflow finder, synced scrolling and light / dark colour-scheme preview for pasted HTML',
    'Recent URLs under the address bar and your own saved custom sizes in the Device menu',
    'Shareable URLs that keep the site, device or custom size, orientation, zoom, frame, bars, compare URL and multi-device set — copied with one click',
    'Keyboard shortcuts — R rotate, F fit, M multi-device, S width sweep, + / − zoom',
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
      desc: 'Turn on multi-device view to check phone, tablet and laptop at the same moment, then step through the rest of the presets. Rotate checks tablet portrait and landscape, and the overflow finder flags anything that makes a page scroll sideways. Share the page URL with your QA team so everyone tests the same site at the same device setup without any configuration.',
    },
    {
      icon: '◎',
      title: 'Show a client their site on mobile and desktop without them installing anything',
      desc: 'Turn on the device frame and browser bars, go fullscreen, and switch between mobile, tablet and desktop during a screen-share, or show them side by side in multi-device view. Send the page URL afterwards so the client can explore the same view in their own browser — no extension, no extra tools.',
    },
    {
      icon: '⚙',
      title: 'Reproduce a layout bug at the exact viewport size a user reported',
      desc: 'When a user reports "broken on my phone," load the URL and type the exact reported width and height into the size boxes. Save a screenshot of the issue at that viewport and include the dimensions in the bug report so development can reproduce it exactly.',
    },
    {
      icon: '≡',
      title: 'Verify a staging site matches the design spec at each breakpoint during handoff',
      desc: 'Open Compare two URLs with staging as A and production as B, switch between the device sizes in your design file, and compare the rendered layout to the mockups. Save full-page screenshots at each width to put next to the designs. Use our [CSS Animation Generator](/css-animation-generator) to fine-tune any transition animations that differ from the mockup.',
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
