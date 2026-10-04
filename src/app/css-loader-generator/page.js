import CssLoaderGeneratorTool from '@/components/CssLoaderGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Loader Generator — Free, 36 Pure CSS Loading Spinners | webdevpuneet.com',
  description: 'Free CSS loading spinner generator — 36 pure CSS loaders with custom color, size, and speed. Export CSS, HTML, or React. No JavaScript, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-loader-generator/' },
  icons: { icon: '/icons/css-loader-generator.svg', shortcut: '/icons/css-loader-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/css-loader-generator/', siteName: 'webdevpuneet.com', title: 'CSS Loader Generator — Pure CSS Loading Spinner & Animation', description: '10 pure CSS loading spinners — customize color, size, speed. Copy CSS and HTML instantly. No JavaScript required, free.', images: [{ url: 'https://webdevpuneet.com/images/css-loader-generator.png', width: 1200, height: 630, alt: 'CSS Loading Spinner Generator' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Loader Generator — Pure CSS Loading Spinners', description: '10 pure CSS loading spinners — customize color, size, speed. Copy CSS and HTML instantly. No JavaScript, free.', images: ['https://webdevpuneet.com/images/css-loader-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I add a loading spinner to my website without a library?', acceptedAnswer: { '@type': 'Answer', text: 'Use a pure CSS spinner built with @keyframes — no JavaScript library or image file needed. Pick a style here, set your color and size, then copy the HTML and CSS. Paste the CSS into your stylesheet and the HTML wherever you want the loader to appear. Show or hide it by toggling display: none / display: flex via JavaScript or a CSS class.' } },
    { '@type': 'Question', name: 'Do these CSS spinners work without JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the animation itself is entirely CSS-driven using @keyframes. No JavaScript is needed to animate the loader. You may use JavaScript to show or hide it (toggle a class or display value), but the spinning, pulsing, or bouncing runs purely in CSS. The animations stay smooth at 60fps even when the JavaScript thread is busy.' } },
    { '@type': 'Question', name: 'How do I add a small inline spinner to a button during form submission?', acceptedAnswer: { '@type': 'Answer', text: 'Scale the Ring or Dots loader to 16–20px using the Size slider. Paste the HTML inside the button element alongside the label text. Set display: inline-flex; align-items: center; gap: 8px on the button. Disable the button when the spinner appears to prevent double-submit. Restore the original label on success or error.' } },
    { '@type': 'Question', name: 'Can I change the spinner color, size, and speed?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the Primary Color picker to set the main loader color (the spinning arc, dots, or bars). Some styles also have a Secondary Color for the background track. The Size slider scales from ~16px inline to ~80px full-page. The Speed control adjusts animation-duration — lower values for urgency, higher for calm ambient indicators. All settings update the preview and exported code in real time.' } },
    { '@type': 'Question', name: 'How do I make CSS spinners accessible for screen readers?', acceptedAnswer: { '@type': 'Answer', text: 'Add role="status" and aria-label="Loading" to the outer loader element. This tells assistive technology the region is a live status indicator. Optionally add a visually hidden text element with aria-live="polite" that updates to "Loading..." when the spinner appears — this announces the state change to screen reader users without requiring them to navigate to the element.' } },
    { '@type': 'Question', name: 'How do I use a CSS loader in React?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the HTML as JSX into your component (replace class with className). Paste the CSS into your stylesheet or CSS module. To conditionally show it: {isLoading && <div className="loader-ring"><div></div>...}. For styled-components or Tailwind, copy the keyframe values and recreate the animation using the appropriate syntax.' } },
    { '@type': 'Question', name: 'What CSS loading spinner styles are available?', acceptedAnswer: { '@type': 'Answer', text: '36 styles across multiple categories: Spinners (Ring, Arc, Comet, Neon), Multi-element (Dots, Bars, Wave, Equalizer, Wifi), Expanding (Pulse, Ripple, Sonar, Target), Orbital (Orbit, Chase, Spiral, Propeller, Windmill, Atom), Morphing (Morph, Flip, Diamond, Hourglass), Organic (Jellyfish, Bounce, Pendulum, DNA), Grids (Grid, Dot Ring, Square Chase), Specialty (Glitch, Typing, Clock, Heartbeat, Shimmer). All are pure CSS with @keyframes — no JavaScript or image files.' } },
    { '@type': 'Question', name: 'Is this CSS loader generator free with no sign-up?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free, no account required. All processing runs in your browser. No code is sent to any server.' } },
    { '@type': 'Question', name: 'How do I center a loading spinner over the full page?', acceptedAnswer: { '@type': 'Answer', text: 'Wrap the loader in a full-screen overlay: position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 9999; background: rgba(255,255,255,0.8). The fixed positioning ensures it covers the entire viewport regardless of scroll position. The semi-transparent background darkens the page underneath to indicate it\'s not interactive while loading. Set a high z-index to ensure it renders above modals and dialogs. Remove the overlay from the DOM (or set display: none) once loading is complete.' } },
    { '@type': 'Question', name: 'Which CSS loader style is best for a button loading state?', acceptedAnswer: { '@type': 'Answer', text: 'The Ring loader at 16–18px is the standard choice for inline button spinners — it\'s compact, universally recognizable, and renders cleanly at small sizes because its border-based construction stays sharp. Set the ring border color to match the button text color (usually white for primary buttons) and the track color to a semi-transparent variant of the same color. For text buttons, Dots at 14px works well because it reads as a status indicator without taking up much horizontal space. Avoid Grid and Roller styles at small sizes — they lose definition below 20px.' } },
    { '@type': 'Question', name: 'How do I add a CSS skeleton loading screen instead of a spinner?', acceptedAnswer: { '@type': 'Answer', text: 'A skeleton loader uses the Pulse or Shimmer pattern — a gradient that sweeps across placeholder shapes. Use the Pulse style from this generator as a base, then apply it to div elements shaped like your content: a rectangle for a text line, a circle for an avatar, a wide rectangle for a header. Animate a linear-gradient overlay from left to right using @keyframes to create the shimmer effect: background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); and animate background-position. The result looks like a low-fidelity outline of the actual content layout that will load.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Loading Spinner Generator',
  url: 'https://webdevpuneet.com/css-loader-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free CSS loading spinner generator with 10 pure CSS animation styles, color pickers, size and speed controls, and instant CSS/HTML copy.',
  featureList: ['10 CSS loader styles', 'Color pickers for primary/secondary colors', 'Size slider', 'Animation speed control', 'Copy CSS and HTML separately', 'No JavaScript required'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Loader Generator', item: 'https://webdevpuneet.com/css-loader-generator/' },
  ],
};

const SEO = {
  slug: 'css-loader-generator',
  title: 'CSS Loading Spinner Generator — 36 Pure CSS Loaders',

  about: {
    title: 'Generate Any CSS Loading Animation in Seconds — 36 Pure CSS Loaders, No JavaScript, Copy HTML and CSS',
    description: `You need a loading spinner for a form submission, an API fetch, or a full-page loader — and you don't want to pull in a library or write @keyframes from scratch. Pick one of the 36 styles, set your color and size, and copy the CSS and HTML in one click.\n\n**36 pure CSS loader styles** covering every use case: classic spinners (Ring, Arc, Comet), multi-element animations (Dots, Bars, Wave, Equalizer), expanding patterns (Pulse, Ripple, Sonar, Target), orbital mechanics (Orbit, Chase, Spiral, Propeller, Windmill, Atom), shape-morphing (Morph, Flip, Diamond, Hourglass), organic motion (Jellyfish, Bounce, Pendulum, DNA), progress indicators (Shimmer), clock-inspired (Clock), grid patterns (Grid, Dot Ring, Square Chase), specialty styles (Neon, Glitch, Typing), and notification badges (Wifi). All built with CSS @keyframes on plain div elements — no JavaScript, no image files, no library dependencies.\n\nEvery loader is generated rather than pre-baked, which is why one Size slider and one Speed slider work identically across all 36 styles: the underlying function derives border thickness, dot diameter, gap spacing, and border-radius as fractions of your chosen size, and rewrites every keyframe's duration by dividing a base timing constant by your speed multiplier — so a Ring at 20px keeps proportionally the same visual weight as a Ring at 120px, and doubling speed halves every animation-duration in the block instead of only the top-level one. Most of these loaders animate transform, opacity, or border-color rather than dimensions like width or top, which keeps them GPU-composited: the browser can run them smoothly on their own layer at 60fps even while the main thread is busy fetching data or parsing a response, which is precisely the moment a spinner needs to keep moving. A few styles — Bars and the shimmer-based Shimmer loader — do animate height or background-position directly since that's what their visual effect requires, so they're marginally more expensive on very large sizes, though still cheap at typical spinner dimensions.\n\nGPU-composited animations stay smooth at 60fps even when the main JavaScript thread is busy processing data. Set the **primary** and **secondary** colors independently, adjust **size** from 20px inline button spinners to 120px full-page overlays, and tune the **speed** multiplier from 0.5× to 3×. The tool exports HTML, CSS, or both combined — plus a React format that wraps the loader in a functional component with scoped styles. Every loader adapts its dimensions and timing automatically to whatever size you set.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Select a loader style', text: 'Click any loader chip in the left sidebar — each chip shows a live miniature preview of that loader style animating with your current colors. The chips are grouped in a grid covering all 36 styles. Clicking a chip switches the large center preview to that style immediately.' },
      { title: 'Set the primary and secondary colors', text: 'In the controls bar above the preview, click the Primary color swatch and pick a color from the browser color picker, or type a hex value into the text input. The Secondary color controls the track ring, second arc, or alternate elements where applicable. Both colors update all 36 mini-previews in real time.' },
      { title: 'Adjust size and speed', text: 'Drag the Size slider from 20px (compact inline button spinner) to 120px (large full-page loader). Drag the Speed slider from 0.5× (slow and calm) to 3× (fast and urgent). The Size and Speed values scale all animation timings proportionally so the loader always looks correct at any size.' },
      { title: 'Preview on light or dark background', text: 'Click the Dark or White background preset buttons to test the loader on dark and light surfaces. Click the color picker swatch next to the background buttons to choose a fully custom background color. This helps verify contrast between the loader color and the background it will sit on.' },
      { title: 'Copy the code', text: 'In the code panel below the preview, switch between the CSS tab (just the @keyframes and layout styles), HTML tab (just the DOM markup), Both tab (complete self-contained snippet), or React tab (a functional component that inlines the styles). Click Copy to copy the selected output to your clipboard.' },
    ],
  },

  features: [
    '36 pure CSS loader styles — Ring, Dots, Bars, Pulse, Ripple, Arc, Comet, Orbit, Chase, Spiral, Flip, Morph, Wave, Bounce, Glitch, Neon, Typing, Clock, Grid, Dot Ring, Pendulum, DNA, Windmill, Jellyfish, Sonar, Propeller, Diamond, Wifi, Target, Square Chase, Shimmer, Heartbeat, Equalizer, Hourglass, and more',
    'Primary and secondary color pickers — independent control over the main and accent elements; choose your palette with our [Color Picker](/color-picker)',
    'Size slider from 20px inline spinners to 120px full-page loaders — all timings scale proportionally',
    'Speed multiplier (0.5×–3×) — faster for urgent states, slower for calm ambient indicators',
    'Live miniature previews for all 36 loaders — update in real time as you change colors',
    'Export as CSS only, HTML only, combined HTML+CSS snippet, or React functional component',
    'Pure CSS @keyframes — no JavaScript, no library, no image files; build full keyframe sequences with our [CSS Animation Generator](/css-animation-generator)',
    'GPU-composited transform and opacity animations that stay smooth at 60fps',
    'Dark and light background presets for contrast testing',
    '100% free — runs entirely in your browser, no sign-up required',
  ],

  useCases: [
    {
      icon: '⟳',
      title: 'Show a full-page loading overlay while the app initializes',
      desc: 'Set the loader to 60–80px, center it over a full-screen semi-transparent backdrop, and hide it once the first meaningful paint is complete. The Ring and Ripple styles work well at large sizes. Style the backdrop with our [Glassmorphism Generator](/glassmorphism-generator) for a frosted-glass overlay effect.',
    },
    {
      icon: '◎',
      title: 'Prevent double-submit on a form by replacing the button text with a spinner',
      desc: 'Scale the Ring or Dots loader to 16–20px and embed it inside the button while the form submits. Disable the button simultaneously. Restore the label on success or failure.',
    },
    {
      icon: '▦',
      title: 'Show a spinner inside a data table or card grid while fetching from an API',
      desc: 'Place the loader in the content area before data loads to avoid a blank-to-content flash. Remove it once the fetch resolves. Gives users an immediate signal that content is on the way.',
    },
    {
      icon: '✦',
      title: 'Create a placeholder while an image or video loads',
      desc: 'Overlay the Pulse or Ripple loader on an image container and remove it via JavaScript\'s onload event. A smooth reveal from spinner to image feels more polished than a blank box.',
    },
    {
      icon: '⚙',
      title: 'Add an inline spinner to a button during an async operation',
      desc: 'Scale the Ring loader to 16px, place it alongside the button label with display: inline-flex; gap: 8px. Use for file uploads, payment processing, save actions — shows the operation is in progress without changing button dimensions.',
    },
    {
      icon: '≡',
      title: 'Display a loader inside a modal while its content is being fetched',
      desc: 'Show the loader in the modal body before the async data loads — instead of opening an empty dialog. The Dual Ring and Grid styles look clean in constrained modal contexts. Apply CSS clip-path shapes to the modal container with our [CSS Clip-Path Generator](/css-clip-path-generator).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssLoaderGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssLoaderGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
