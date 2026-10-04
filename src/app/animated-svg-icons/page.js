import AnimatedSvgIconsTool from '@/components/AnimatedSvgIconsTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Animated SVG Icons Library — 105+ Free CSS Animated Icons | webdevpuneet.com',
  description: 'Free animated SVG icons — 105+ pure CSS icons including checkmarks, arrows, and loaders. Customize color and speed. Export SVG, JSX, or HTML.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/animated-svg-icons/' },
  icons: { icon: '/icons/animated-svg-icons.svg', shortcut: '/icons/animated-svg-icons.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/animated-svg-icons/', siteName: 'webdevpuneet.com', title: 'Animated SVG Icons Library — 105+ Free CSS Animated Icons', description: 'Browse 105+ free animated SVG icons. Customize color, stroke, speed. Export SVG, React JSX, or HTML instantly. No libraries, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/animated-svg-icons.png', width: 1200, height: 630, alt: 'Animated SVG Icons Library' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Animated SVG Icons Library — 105+ Free CSS Icons', description: 'Browse 105+ free animated SVG icons. Customize and export SVG, React JSX, or HTML. Pure CSS, no libraries, no sign-up.', images: ['https://webdevpuneet.com/images/animated-svg-icons.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Are these animated SVG icons free for commercial use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All exported SVG icon code is free to use in personal and commercial projects with no attribution required. The code you export is yours to use, modify, and redistribute as part of your product. There are no license fees, no restrictions on project type, and no requirement to link back to this tool.' } },
    { '@type': 'Question', name: 'Do these icons depend on JavaScript or external libraries?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every icon uses only CSS @keyframes animations inside the SVG\'s <style> block — no JavaScript, no GSAP, no Lottie, no npm packages required. The SVG file is entirely self-contained. Paste the markup inline, link it as an img src, or use it as a CSS background-image and the animation works in any modern browser with zero configuration.' } },
    { '@type': 'Question', name: 'How do I use these icons in React?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the React JSX export tab and click Copy. You get a complete named functional component with all SVG props in camelCase JSX syntax (className instead of class, strokeWidth instead of stroke-width). Paste the file into your components folder, import it like any other component, and render it anywhere in your app. You can customize color and size by modifying the inline style or passing props.' } },
    { '@type': 'Question', name: 'Can I change the animation speed?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Speed slider multiplies all animation durations in the exported code — values below 1× slow the animation, values above 1× speed it up. The CSS inside the SVG is updated live as you drag. You can also edit the exported code manually: find the animation-duration property in the embedded <style> block and adjust the seconds value. All duration values update proportionally based on the speed multiplier you chose.' } },
    { '@type': 'Question', name: 'Should I use animated SVG icons or Lottie animations?', acceptedAnswer: { '@type': 'Answer', text: 'For simple UI icons — checkmarks, loaders, arrows, notification bells — animated SVGs are better: zero runtime JavaScript, no library (Lottie is 60+ KB), one portable SVG file that works as an <img> src, inline SVG, or CSS background. Use Lottie when you need After Effects animations with masks, mattes, and complex layer blending that CSS @keyframes cannot replicate. For most app UI micro-animations, a CSS-animated SVG icon is the lighter and simpler choice.' } },
    { '@type': 'Question', name: 'How do I stop the animation after it plays once?', acceptedAnswer: { '@type': 'Answer', text: 'Icons with draw or pop animations already use animation-fill-mode: forwards and animation-iteration-count: 1, so they play once and hold the final frame. For looping icons, find animation-iteration-count: infinite in the exported <style> block and change it to 1. You can also control playback via JavaScript by toggling animation-play-state: paused or by adding and removing a CSS class.' } },
    { '@type': 'Question', name: 'What animation types are available?', acceptedAnswer: { '@type': 'Answer', text: 'Available animations include path drawing (stroke-dashoffset draw-on), fade-in, bounce, swing, heartbeat, pop, shake, spin, flash, and fly-in effects. Different icons use different animation styles suited to their shape and context. The speed and color customization works across all animation types.' } },
    { '@type': 'Question', name: 'Can I download the SVG file?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the Download button in the export panel to save an SVG file with your chosen color, size, stroke, and speed settings already baked in. The file is fully portable and can be opened in Figma, Adobe Illustrator, Inkscape, or any vector editor. Animations will play automatically when the file is opened in any modern browser.' } },
    { '@type': 'Question', name: 'Why use SVG animations over CSS div animations?', acceptedAnswer: { '@type': 'Answer', text: 'SVG icons are resolution-independent — they render crisply on 4K displays and small mobile screens without multiple asset sizes. They carry semantic meaning through <title> and aria-label attributes that CSS divs cannot provide natively. A single SVG file is typically smaller than a raster icon sprite sheet. SVG stroke draw-on animations are only achievable with vector paths, making them exclusive to SVG icons.' } },
    { '@type': 'Question', name: 'Are the icons accessible?', acceptedAnswer: { '@type': 'Answer', text: 'The exported SVG markup is ready for accessibility additions. For screen reader support, add a <title> as the first child of the SVG element and reference it with aria-labelledby. For purely decorative icons, add aria-hidden="true" to tell screen readers to skip it. The React JSX export also accepts any standard aria props that you can pass to the root element.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Animated SVG Icons Generator',
  url: 'https://webdevpuneet.com/animated-svg-icons/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free animated SVG icon library with 105+ pure CSS animated icons, color/size/stroke/speed customization, and SVG/React JSX/HTML export.',
  featureList: ['105+ animated SVG icons', 'Pure CSS — no JS required', 'Color/size/stroke/speed customization', 'Export SVG/React JSX/HTML', 'One-click copy and download', 'Category filter', 'Commercial use free'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Animated SVG Icons', item: 'https://webdevpuneet.com/animated-svg-icons/' },
  ],
};

const SEO = {
  slug: 'animated-svg-icons',
  title: 'Animated SVG Icons — 105+ Free CSS Animated Icon Generator',

  about: {
    title: 'Browse 105+ Animated SVG Icons, Customize Color and Speed, Export SVG or React JSX',
    description: `You want an animated checkmark for a success state, a draw-on loader that matches your brand color, or a pulsing bell for notifications — but pulling in Lottie for a 60+ KB runtime just for a few icons is overkill. Browse the library here, pick a color, and copy the self-contained SVG or React JSX with one click.\n\nAll 105+ icons use CSS \`@keyframes\` embedded directly inside a \`<style>\` block within the SVG markup — no JavaScript, no GSAP, no npm packages. A handful of animation techniques cover the whole set: outline icons like the checkmark, lock, and home use the classic \`stroke-dasharray\`/\`stroke-dashoffset\` draw-on trick, where the dash array is set to the path's approximate length so the dash offset can animate from that length down to zero, making the line appear to draw itself; filled icons like the heart and star instead animate \`transform: scale()\` keyframes for a heartbeat or pop-in bounce; looping icons like the loader and gear spin or pulse via \`animation: ... infinite\`; and multi-part icons like Close/X or Menu stagger two or three elements with different \`animation-delay\` values so the strokes draw in sequence rather than all at once. Each icon is a portable, dependency-free file: embed it as inline SVG, use it as an \`<img>\` src, or set it as a CSS \`background-image\`, and the animation plays in all three contexts in any modern browser. Icons span seven categories: **Actions** (checkmarks, crosses, trash), **Navigation** (arrows, chevrons, hamburger), **Social** (heart, share, thumbs), **Media** (play, pause, volume), **UI** (bell, lock, settings), **Dev** (code, terminal, bug), and **Notification** (alert, info, badge).\n\nFor each icon you can set the fill or stroke color, adjust stroke width, scale from 16px to 128px, and multiply animation speed from 0.25× (gentle) to 3× (urgent) — the speed multiplier works by dividing every base duration in the icon's keyframes by your chosen factor, so a 0.5s draw becomes 0.25s at 2× without needing separate keyframe rules. Export as raw SVG with settings baked in, a React JSX functional component with camelCase attributes (\`className\`, \`strokeWidth\`) and a named export, an HTML embed snippet, or CSS-only animation rules if you want to apply the motion to an SVG already in your codebase. Free for personal and commercial use, no attribution required.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Browse the library and select an icon', text: 'Use the category filter bar at the top to narrow the library to a specific group — Actions (checkmarks, close, edit, trash, copy, save, send), Navigation (arrows, home, menu, map pin), Social (heart, star, share, bookmark), Media (play, pause, volume, camera), UI (gear, lock, eye, loader, sun, moon, clock), Dev (code, terminal, database, bug, git-branch), or Notification (bell, alert, mail, wifi, zap). Select All to browse all 105+ icons at once. Click any icon tile to select it — the animated preview plays automatically in the enlarged panel on the right. Click Replay at any time to restart the animation from the beginning.' },
      { title: 'Set the color', text: 'Click the color picker swatch below the preview to open a full color picker and choose any hex or HSL color. Or click any of the six preset swatches for a quick one-click choice — useful when you want to test a few brand colors quickly. The preview updates immediately as you change the color. The selected color is applied to both the fill and stroke of the icon in the exported code, so it matches the preview exactly.' },
      { title: 'Adjust size, stroke, and speed', text: 'Drag the Size slider to scale the icon from 16px (small inline icon) to 128px (large hero or loading indicator). SVG icons stay perfectly sharp at any size — no blurry upscaling. Use the Stroke slider to change line thickness for stroke-style icons: lower values (1–1.5px) suit minimal or small-size use, higher values (2.5–4px) suit bold or large-format designs. The Speed slider multiplies all animation durations: 0.25× for a very slow, calm effect, 1× for the default, 2× for snappy urgency, 3× for fast attention-grabbing motion. All sliders update the preview live.' },
      { title: 'Switch the export format', text: 'In the export panel below the preview, select the format that matches your use case. The SVG tab gives raw animated SVG markup — a self-contained file with CSS @keyframes embedded inside a <style> block. The React tab gives a complete named functional component with all SVG attributes in camelCase JSX syntax (className, strokeWidth) — ready to paste into your components folder and import. The HTML tab gives a ready-to-paste embed snippet. The CSS tab gives only the @keyframes animation rules if you want to manually apply them to an existing SVG in your codebase.' },
      { title: 'Copy or download', text: 'Click Copy to copy the selected export format to your clipboard — paste it directly into your code editor, a React component file, or an HTML document. Click Download to save the SVG file to your computer with your current color, size, stroke, and speed settings baked in. The downloaded file plays its animation when opened in any modern browser, and can be imported into Figma, Inkscape, or Adobe Illustrator. All icons are free for personal and commercial use with no attribution required.' },
    ],
  },

  features: [
    '105+ animated SVG icons across 7 categories — Actions, Navigation, Social, Media, UI, Dev, Notification',
    'Pure SVG + CSS @keyframes — no JavaScript, no Lottie, no GSAP, no npm packages; build custom animations in our [SVG Animation Generator](/svg-animation-generator)',
    'Color picker + 6 preset swatches for quick color customization; explore full palettes with our [Color Palette Generator](/color-palette-generator)',
    'Size slider from 16px to 128px — renders crisply at any resolution',
    'Stroke width slider for line-based icons',
    'Speed multiplier from 0.25× (very slow) to 3× (fast) — all durations update proportionally',
    'Replay button to restart animation on demand',
    'Export as raw SVG, React JSX functional component, HTML embed, or CSS-only rules',
    'One-click Copy and SVG file Download with your settings baked in',
    'Free for personal and commercial use — no attribution required; for more CSS-driven loaders see our [CSS Loader Generator](/css-loader-generator)',
  ],

  useCases: [
    {
      icon: '✓',
      title: 'Show a draw-on checkmark or X for form success and error states',
      desc: 'An animated checkmark that draws itself on completion communicates success far more clearly than a static icon appearing instantly. Requires no JavaScript beyond what is embedded in the SVG — works inline or as an <img> src.',
    },
    {
      icon: '⟳',
      title: 'Replace the default browser spinner with a branded loading icon',
      desc: 'Pick a loader, ring, or dots icon from the library, set it to your brand color, and export the SVG. Pure CSS animation — GPU-composited and smooth even when the main JavaScript thread is busy processing data.',
    },
    {
      icon: '◉',
      title: 'Add a pop or bounce animation to a like button or rating icon',
      desc: 'Heart, star, and thumbs-up icons with pop or bounce animations make social interactions feel delightful. Adjust speed for the right energy — quick and bouncy for consumer apps, gentle for professional dashboards.',
    },
    {
      icon: '⚡',
      title: 'Draw attention to a notification bell or alert badge without JavaScript',
      desc: 'Bell, zap, and alert icons with shake, blink, or pulse animations signal notification states visually. Set speed to 0.5× for a calm ambient pulse or 2× for urgency — all controlled by the animation-duration in the embedded CSS.',
    },
    {
      icon: '⇄',
      title: 'Export an animated icon as a React JSX component without installing a library',
      desc: 'The React export gives you a named functional component with all SVG attributes in camelCase — className, strokeWidth, etc. Paste it into your components folder and render it anywhere in your app with no npm packages required. Convert surrounding HTML to JSX with our [HTML to JSX Converter](/html-to-jsx-converter).',
    },
    {
      icon: '△',
      title: 'Drop animated icons into a prototype or demo to communicate motion intent',
      desc: 'Paste animated SVGs into Figma HTML previews, CodeSandbox demos, or static mockups. Adjust color and speed in seconds to test variants before writing production animation code.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function AnimatedSvgIconsPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><AnimatedSvgIconsTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
