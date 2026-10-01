import GlassmorphismGeneratorTool from '@/components/GlassmorphismGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Glassmorphism Generator — Frosted Glass CSS Free | webdevpuneet.com',
  description: 'Free CSS glassmorphism generator — adjust blur, transparency, saturation, and shadow with live preview. 8 presets, Tailwind export. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/glassmorphism-generator/' },
  icons: { icon: '/icons/glassmorphism-generator.svg', shortcut: '/icons/glassmorphism-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/glassmorphism-generator/', siteName: 'webdevpuneet.com', title: 'CSS Glassmorphism Generator — Frosted Glass Effect Builder Online', description: 'Build CSS glassmorphism effects visually — blur, transparency, saturation, border, shadow. 8 presets, image upload, Tailwind export. Free.', images: [{ url: 'https://webdevpuneet.com/images/css-glassmorphism-generator.png', width: 1200, height: 630, alt: 'CSS Glassmorphism Generator Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Glassmorphism Generator — Frosted Glass Effect Builder', description: 'Visual CSS glassmorphism tool — blur, transparency, saturation, border, shadow with live preview. 8 presets, Tailwind export. Free.', images: ['https://webdevpuneet.com/images/css-glassmorphism-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSS glassmorphism?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS glassmorphism is a UI design trend that creates a frosted glass appearance by combining three key CSS properties: backdrop-filter: blur() to blur the content behind the element, a semi-transparent background using rgba() or background with low opacity, and a translucent border using rgba() border colors. The result is an element that appears to be made of frosted glass — you can see distorted, blurred versions of whatever is behind it. The effect became popularized by Apple\'s macOS Big Sur design language in 2020 and has since become one of the most widely used UI effects in modern web design. The technique works best when placed over colorful, high-contrast backgrounds — gradient images, photography, or abstract color fields — that give the blur something visually interesting to work with.' }
    },
    {
      '@type': 'Question',
      name: 'What CSS properties create the glassmorphism effect?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS glassmorphism requires four properties working together. First, backdrop-filter: blur(Xpx) creates the frosted blur by applying a Gaussian blur to everything rendered behind the element — the higher the value, the more frosted the appearance. Second, background: rgba(R, G, B, A) with a low alpha value (typically 0.1 to 0.3) gives the element a translucent tint over the blurred background. Third, border: 1px solid rgba(255, 255, 255, 0.2) adds a subtle white or light border that catches light and enhances the glass illusion. Fourth, box-shadow with low opacity adds depth and separation from the background. The -webkit-backdrop-filter prefix is required for Safari compatibility. Together these four properties produce the characteristic layered, frosted glass appearance.' }
    },
    {
      '@type': 'Question',
      name: 'Does Firefox support CSS glassmorphism?',
      acceptedAnswer: { '@type': 'Answer', text: 'Firefox does not support the backdrop-filter CSS property by default. Starting with Firefox 70, users can enable it manually by navigating to about:config in the address bar and setting layout.css.backdrop-filter.enabled to true. This means glassmorphism effects appear as plain semi-transparent boxes without blur in Firefox for the majority of users who have not changed this setting. As a fallback, you can use a slightly more opaque background color so the element remains readable without the blur. Firefox has indicated that support may be enabled by default in a future release, but as of current versions it remains opt-in only. Always test your glassmorphism designs in Firefox alongside Chrome and Safari.' }
    },
    {
      '@type': 'Question',
      name: 'What is the saturate() function in glassmorphism?',
      acceptedAnswer: { '@type': 'Answer', text: 'The CSS saturate() function, when combined with backdrop-filter, boosts the color intensity of the blurred background content. Adding backdrop-filter: blur(16px) saturate(180%) makes the colors behind the glass element appear more vivid and vibrant compared to blur alone. This is a technique borrowed from Apple\'s UI design — the "Vibrancy" effect on macOS and iOS uses exactly this combination of blur and saturation boost to create panels that feel deeply connected to the colors behind them rather than just blurry. Typical values range from 130% to 200%. Values below 100% desaturate the background, creating a more muted, foggy glass appearance. Values of 150–200% produce the most visually striking frosted glass effect.' }
    },
    {
      '@type': 'Question',
      name: 'How do I add a glassmorphism border?',
      acceptedAnswer: { '@type': 'Answer', text: 'The glassmorphism border is typically a thin, semi-transparent white or light-colored line that simulates the beveled edge of real glass catching light. Use border: 1px solid rgba(255, 255, 255, 0.25) as a standard starting point. The rgba() color value lets you control both the border color and its transparency — using white at 20–30% opacity creates a subtle shimmer that reinforces the glass illusion without looking like a solid border. For dark glass effects (dark tinted backgrounds), the border might use a lighter shade of the tint color rather than pure white. Border-radius should match your design — values of 12–20px work well for cards and modals, while 0 is appropriate for full-width panels and navbars. Higher border opacity makes the glass look thicker and more defined; lower values create a more subtle, barely-there effect.' }
    },
    {
      '@type': 'Question',
      name: 'How do I create glassmorphism in Tailwind CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tailwind CSS provides built-in utility classes for glassmorphism. Use backdrop-blur-lg or backdrop-blur-xl for the blur effect (corresponding to 16px and 24px respectively). The bg-white/20 utility sets a white background at 20% opacity — the number after the slash is the opacity percentage. For borders, border border-white/25 adds a 1px white border at 25% opacity. Combine rounded-2xl for 16px border radius and shadow-xl for the drop shadow. A typical glassmorphism card class string looks like: backdrop-blur-lg backdrop-saturate-150 bg-white/20 border border-white/25 rounded-2xl shadow-xl. For values not in Tailwind\'s default scale, use arbitrary values: backdrop-blur-[18px] or bg-white/[0.18]. The generator\'s Tailwind tab outputs the exact class string you need.' }
    },
    {
      '@type': 'Question',
      name: 'What makes a good background for glassmorphism?',
      acceptedAnswer: { '@type': 'Answer', text: 'Glassmorphism works best over colorful, vibrant backgrounds that give the blur effect something visually interesting to work with. The classic choice is a multi-color gradient — purple-to-pink, blue-to-teal, or multi-stop gradients work exceptionally well because the blurred gradient colors create beautiful color transitions inside the glass panel. Photography with high color contrast also works well. Backgrounds that are too dark or monochromatic tend to make the glass appear as just a blurry dark panel with no visible frosted effect. If using photography, prefer images with multiple distinct color regions so the blur creates visible color mixing. Abstract art, bokeh photography, and gradient meshes are the ideal glass backgrounds. Avoid using flat single-color backgrounds as they will make the glass element invisible — there is nothing to blur.' }
    },
    {
      '@type': 'Question',
      name: 'Does CSS glassmorphism affect performance?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS backdrop-filter causes the browser to composite the element on its own GPU layer and apply the blur as a post-processing effect on the captured background pixels. This GPU compositing means it can have significant performance implications. Large blur values (above 20px) on large elements are particularly expensive because the GPU must blur a larger pixel area. Applying backdrop-filter to a fixed-position or sticky navbar that spans the full viewport width and scrolls with the page can cause jank on lower-end mobile devices because every scroll frame requires re-blurring the background pixels. For best performance: keep blur values at or below 16px, avoid applying backdrop-filter to full-screen elements, use will-change: backdrop-filter to hint the browser before applying animations, and test on mid-range Android phones where GPU performance is most constrained.' }
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Glassmorphism Generator',
  url: 'https://webdevpuneet.com/glassmorphism-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS glassmorphism generator with live preview, 8 component presets, background upload, browser compatibility warnings, and CSS/Tailwind/React export.',
  featureList: ['backdrop-filter blur slider', 'Saturation control', 'Translucent background color picker', 'Border width, color, opacity and radius', 'Box shadow control', '8 component presets', '4 gradient backgrounds + image upload', 'CSS, Tailwind, and React export', 'Browser compatibility badge'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Glassmorphism Generator', item: 'https://webdevpuneet.com/glassmorphism-generator/' },
  ],
};

const SEO = {
  slug: 'glassmorphism-generator',
  title: 'CSS Glassmorphism Generator — Frosted Glass Effect Builder Online',

  about: {
    title: 'Build a CSS Frosted Glass Effect Visually — backdrop-filter, Opacity, Border — Copy CSS, Tailwind, or React',
    description: `You want the frosted glass card effect from Apple's macOS — blurring whatever's behind the element and tinting it semi-transparent — but getting the four properties to work together without a visual preview means guessing blur values and toggling opacity until something looks right. Adjust the sliders here and watch the glass update live over a colorful gradient.\n\nThe full glassmorphism effect needs four CSS properties working together: **\`backdrop-filter: blur()\`** for the frosted blur, **\`background: rgba()\`** with low alpha for the translucent tint, a translucent **\`border\`** to simulate the light-catching glass edge, and **\`box-shadow\`** for depth. This tool gives you individual controls for every parameter — blur amount (0–30px), saturation boost (100–250% for Apple-style vibrancy), background tint color and opacity, border width and rgba opacity, border radius, and shadow blur and opacity.\n\n\`backdrop-filter\` differs from the regular \`filter\` property in one key way: it blurs whatever is rendered behind the element, sampled fresh on every frame, rather than blurring the element's own content — which is exactly what makes a floating panel look like it's made of glass instead of just looking blurry itself. Pairing the blur with \`saturate()\` recreates Apple's "Vibrancy" technique: a blur alone tends to muddy background colors toward gray, while boosting saturation to 150–200% alongside it keeps those blurred colors punchy, so the glass reads as translucent rather than foggy. This is also why the effect depends entirely on what's behind the element — over a flat, single-color background there is nothing for the blur to do, and the panel will look like a plain semi-transparent box no matter how the sliders are set; glassmorphism needs a busy, multi-color backdrop (a gradient, a photo, an abstract mesh) to have any visible effect. One browser caveat worth planning around: Firefox ships \`backdrop-filter\` behind a disabled flag for most users, so a design that leans on it should still look acceptable — readable, reasonably contrasted — with the blur silently absent.\n\nEight component presets — Card, Navbar, Button, Modal, Badge, Sidebar, Dark Glass, and Frosted — load production-ready starting points for the most common glassmorphism UI patterns. Preview over four gradient backgrounds (Cosmic, Sunset, Ocean, Aurora) or upload your own image. Export as CSS with \`-webkit-backdrop-filter\` for Safari, Tailwind utility classes with \`backdrop-blur-*\` and \`bg-white/20\` syntax, or a React inline style object. A browser compatibility panel flags the Firefox caveat before you ship.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with a preset', text: 'Click one of the eight component presets at the top — Card, Navbar, Button, Modal, Badge, Sidebar, Dark, or Frosted. Each preset loads production-ready values tuned for its use case. Card is the general-purpose starting point for most glassmorphism uses.' },
      { title: 'Adjust backdrop blur and saturation', text: 'In the Backdrop section, use the Blur slider (0–30px) to control how frosted the glass looks — 8–20px produces the most realistic effect. Use the Saturate slider (100–250%) to boost the color vibrancy of blurred background content, matching the Apple Vibrancy style at 150–200%.' },
      { title: 'Set the tint color and opacity', text: 'In the Background section, use the color picker to choose the tint — white (#ffffff) for light glass, black (#000000) for dark glass, or any custom color for amber, blue, or pink tinted glass. Set Opacity to 10–30% for a typical glass transparency; higher values make the panel more opaque.' },
      { title: 'Configure the border', text: 'In the Border section, set Width to 1 for the standard glass edge (0 disables it). Use the Color picker to choose a border tint (white is the standard choice) and set Border Opacity to 20–35% for a subtle light-catching edge. Use the Radius slider for corner rounding — 16px for cards, 0 for navbars, 100px for badge pills.' },
      { title: 'Add depth with a shadow', text: 'In the Shadow section, increase Blur to 20–32px and Opacity to 10–20% for a natural drop shadow that lifts the glass element off the background without overpowering the frosted effect.' },
      { title: 'Test over different backgrounds', text: 'Click the gradient presets in the preview header — Cosmic (purple-blue), Sunset (pink-orange), Ocean (blue-teal), or Aurora (green-blue). Click the Upload button to use your own image. The preview updates live with each change.' },
      { title: 'Export the code', text: 'Switch between the CSS, Tailwind, and React tabs in the output panel. CSS includes -webkit-backdrop-filter for Safari. Tailwind generates backdrop-blur-* and bg-white/20 utility classes. React gives an inline style object. Click Copy to copy the output.' },
    ],
  },

  features: [
    'Blur slider (0–30px) for backdrop-filter blur with real-time preview — includes -webkit-backdrop-filter for Safari',
    'Saturation slider (100–250%) to boost blurred background color vibrancy, matching Apple\'s Vibrancy effect',
    'Background tint color picker with hex input and opacity slider (0–60%) for semi-transparent glass backgrounds; pick tint colors with our [Color Picker](/color-picker)',
    'Border width (0–4px), color picker, opacity slider, and border-radius slider (0–100px) for full glass edge control',
    'Shadow blur (0–60px) and opacity (0–50%) sliders for depth shadow below the glass element; fine-tune with our [Box Shadow Generator](/box-shadow-generator)',
    '8 component presets: Card, Navbar, Button, Modal, Badge, Sidebar, Dark Glass, Frosted — each tuned for its use case',
    '4 vivid gradient backgrounds (Cosmic, Sunset, Ocean, Aurora) plus custom image file upload for preview; build the gradient with our [Gradient Generator](/gradient-generator)',
    'Export CSS with vendor prefixes, Tailwind utility class string, or React inline style object — all three ready to paste',
    'Browser compatibility panel showing Chrome, Firefox, Safari, and Edge support with Firefox caveat note',
    '100% client-side — no images or settings are sent to any server; clip the glass shape with our [CSS Clip-Path Generator](/css-clip-path-generator)',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Create a frosted glass card over a gradient background for a landing page',
      desc: 'The most common glassmorphism pattern is a floating card over a vivid gradient — a pricing card, profile card, or feature highlight. The Card preset (blur 16px, opacity 20%, 16px radius) gives a balanced starting point. Increase blur for a dreamier look or lower opacity to keep more background color visible through the glass.',
    },
    {
      icon: '⬡',
      title: 'Make a sticky navbar that blurs the page content as you scroll through it',
      desc: 'Use the Navbar preset (blur 12px, radius 0) for a full-width frosted header. As content scrolls underneath, the blur creates the depth illusion that the nav floats above the page. Keep background opacity at 12–18% so page colors show through without becoming distracting.',
    },
    {
      icon: '⚡',
      title: 'Style a modal dialog with glass so it appears to float above the page',
      desc: 'The Modal preset (blur 20px, radius 20px, shadow 40px) creates a heavily frosted dialog with strong depth separation. For a dark modal over a dark overlay, try the Dark Glass preset with near-black tint. A 40px shadow blur gives the modal a convincing sense of floating height.',
    },
    {
      icon: '△',
      title: 'Overlay a glass panel on a hero photo to keep text readable without hiding the image',
      desc: 'A glass card containing a headline and CTA over a full-bleed photography hero lets the image show through while keeping text legible — common in travel, real estate, and SaaS landing pages. Upload your actual hero image to test opacity balance. Lower blur (8–12px) works better with photography since high values obscure detail.',
    },
    {
      icon: '▦',
      title: 'Build a glassmorphism dashboard UI where widgets appear layered on a single surface',
      desc: 'Apply consistent blur and opacity values across all widgets so they look like they occupy the same glass layer. Use the Sidebar preset for the navigation panel at low opacity (18%) and the Badge preset for small status chips and KPI counters.',
    },
    {
      icon: '✦',
      title: 'Create a frosted glass toast notification or status badge that sits over any background',
      desc: 'A small glass pill with 6px blur, 30% opacity, and fully rounded corners (100px radius) looks clean over any gradient or image without clashing. The Badge preset is tuned for this. Export the Tailwind classes to drop directly into a toast component library.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function GlassmorphismGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><GlassmorphismGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
