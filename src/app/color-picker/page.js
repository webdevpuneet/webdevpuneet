import ColorPickerTool from '@/components/ColorPickerTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Color Picker & Converter — Free HEX, RGB, HSL, HSV, OKLCH, CMYK | webdevpuneet.com',
  description: 'Free color picker and converter — convert between HEX, RGB, HSL, HSV, OKLCH, and CMYK instantly with WCAG contrast checking. Browser-only, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/color-picker/' },
  icons: { icon: '/icons/color-picker.svg', shortcut: '/icons/color-picker.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/color-picker/',
    siteName: 'webdevpuneet.com',
    title: 'Color Picker & Converter — HEX, RGB, HSL, HSV, OKLCH, CMYK Online Free',
    description: 'Free — Pick a color and convert instantly between HEX, RGB, HSL, HSV, OKLCH, and CMYK. Paste any format, check WCAG contrast, copy any output. Free and browser-only.',
    images: [{ url: 'https://webdevpuneet.com/images/color-picker.png', width: 1200, height: 630, alt: 'Color Picker and Converter — HEX RGB HSL OKLCH Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Color Picker & Converter — HEX, RGB, HSL, OKLCH, CMYK Online Free',
    description: 'Convert colors between HEX, RGB, HSL, HSV, OKLCH, and CMYK. WCAG contrast, smart paste any format, copy any format. Free and browser-only.',
    images: ['https://webdevpuneet.com/images/color-picker.png'],
  },
};

const seoData = {
  slug: 'color-picker',
  title: 'Color Picker & Converter Online — HEX, RGB, HSL, HSV, OKLCH, CMYK',

  about: {
    title: 'Convert Any Color Between HEX, RGB, HSL, OKLCH, and CMYK — Paste Any Format',
    description: `You have a color in HEX from a design mockup and you need it in HSL for a CSS variable, or OKLCH for a modern design token, or CMYK for a print vendor. Paste it here and get all six formats at once — HEX, RGB, HSL, HSV, OKLCH, and CMYK — with one-click copy for each. Or just pick a color using the OS color picker and all six outputs update instantly.\n\nThe smart paste field accepts any color format and figures out which one it is automatically: six-digit HEX (#3b82f6), three-digit shorthand (#fff), RGB, RGBA, HSL, HSLA, OKLCH, and all 140 CSS named colors including "royalblue", "coral", and "rebeccapurple". Paste from a stylesheet, a design tool export, a documentation page, or an API response — no need to manually select the input type.

Each format serves a different purpose. **HEX** (#3b82f6) is the default in browser DevTools, Figma, and most design tools. **RGB** maps to the native screen color model (0–255 per channel). **HSL** is the most designer-friendly CSS format — you can adjust lightness without changing hue by just changing the L value. **HSV** is used in Photoshop-style color wheels. **OKLCH** is the new CSS Color Level 4 perceptually uniform space — two colors at the same L value look equally bright regardless of hue, making it ideal for consistent design token palettes. **CMYK** is for print — it tells ink printers the exact ink percentages to use.\n\nThe WCAG contrast panel at the bottom shows whether your color passes accessibility thresholds against white and black backgrounds. WCAG Level AA (4.5:1 for normal text) is the minimum standard required by accessibility laws in most jurisdictions. Checking contrast while picking colors catches failures at the design stage — before they require a costly redesign. If a combination fails AA, adjust the L value in HSL or OKLCH to find a passing value while keeping the same hue.`,
  },

  features: [
    'Native OS color picker — click the swatch to open the system color picker on any desktop or mobile device',
    'Six simultaneous color formats — HEX, RGB, HSL, HSV, OKLCH, CMYK — all shown at once, always in sync',
    'Smart paste field — auto-detects and converts any color format including CSS named colors and RGBA',
    'Direct HEX edit — type a hex value directly in the field below the swatch for precise entry',
    'Dynamic UI chrome — the tool header and accent elements tint to the currently selected color',
    'WCAG AA and AAA contrast ratio checker — on white, on black, and white text on your color',
    'Uppercase toggle — switch HEX output between #3b82f6 and #3B82F6',
    'One-click copy for any format — click any output row to copy instantly with a checkmark confirmation',
    'Preset color swatches — one-click access to common design and brand colors; generate a full scale from any swatch with our [Color Palette Generator](/color-palette-generator)',
    '100% client-side math — full OKLCH, HSV, and CMYK precision, nothing uploaded to any server; build a gradient from your chosen color with our [Gradient Generator](/gradient-generator)',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a color using the native color picker or swatches', text: 'Click the large color swatch on the left side of the tool to open the native OS color picker. Drag or click to any color and all six format outputs on the right update instantly. Or click any preset swatch to load a common design color, or hit Random for inspiration.' },
      { title: 'Enter a precise color value', text: 'Click directly in the HEX field below the swatch and type or paste a hex value. The tool accepts both 6-digit (#3b82f6) and 3-digit shorthand (#fff) hex codes. All six format outputs update as soon as you finish typing.' },
      { title: 'Paste from any color format', text: 'Use the "Paste any format" field to convert from any starting point. It accepts HEX (with or without #), RGB, RGBA, HSL, HSLA, OKLCH, and all 140 CSS named colors like "royalblue", "coral", or "rebeccapurple". The format is detected automatically.' },
      { title: 'Copy any output format', text: 'Each of the six output format rows on the right shows the color value in that format. Click any row to copy that format\'s value to your clipboard — a green checkmark confirms the copy. Toggle Uppercase to switch HEX output between lowercase and uppercase.' },
      { title: 'Check WCAG contrast accessibility', text: 'The WCAG Contrast section at the bottom shows three contrast ratios: your color on white, your color on black, and white text on your color as a background. Each ratio shows AA and AAA pass/fail badges for normal and large text. If a color fails AA, adjust the L value in HSL or OKLCH to find a passing value.' },
    ],
  },

  useCases: [
    {
      icon: '⇄',
      title: 'Convert a HEX from Figma to HSL or OKLCH for CSS',
      desc: 'Paste a HEX color from your design mockup and instantly get the RGB, HSL, or OKLCH value ready to paste into a CSS variable, Tailwind config, or design token. All six formats update at once.',
    },
    {
      icon: '◑',
      title: 'Check if a text color passes WCAG contrast before shipping',
      desc: 'Enter your foreground and background colors and see whether they pass WCAG AA (4.5:1) or AAA (7:1) contrast thresholds. Catching low-contrast failures while picking colors costs far less than fixing them after a design is finalized. Then apply the accessible color with our [CSS Filter Generator](/css-filter-generator) to adjust images to match.',
    },
    {
      icon: '◉',
      title: 'Convert a web color to CMYK for a print vendor',
      desc: 'Convert HEX or RGB colors to CMYK percentages for Adobe InDesign, Illustrator, or print vendor specifications. Screen RGB colors have a wider gamut than CMYK inks — seeing the CMYK values shows how the color will shift in print before you commit.',
    },
    {
      icon: '▦',
      title: 'Get OKLCH values for a consistent design token palette',
      desc: 'Generate OKLCH values for CSS design systems where perceptual uniformity matters. OKLCH ensures all colors at the same L value appear equally bright across hues — creating palettes where neutral, accent, and semantic colors are visually balanced. Then build your full brand palette with our [Color Palette Generator](/color-palette-generator).',
    },
    {
      icon: '⚡',
      title: 'Paste any color format and convert it to all others',
      desc: 'Paste from a legacy stylesheet (RGB), a design system (HSL), an API response (HEX), or CSS source (OKLCH). Smart paste auto-detects the format — no need to specify which type it is or find the right converter.',
    },
    {
      icon: '▤',
      title: 'Verify brand primary colors pass accessibility before finalizing',
      desc: 'A brand color that looks vibrant on a marketing slide may fail WCAG AA when used as button text or link color. Check both white-on-color and color-on-white scenarios simultaneously before locking in the color spec.',
    },
  ],

  faqs: [
    {
      q: 'How do I convert a HEX color to RGB or HSL online?',
      a: 'Paste your HEX value (with or without the # symbol) into the smart paste field or type it directly in the HEX input below the color swatch. All six formats — HEX, RGB, HSL, HSV, OKLCH, and CMYK — update instantly. Click any format row to copy that value. A 6-digit HEX like #3b82f6 maps to rgb(59, 130, 246) — the first two digits are the red channel (3b hex = 59 decimal), the middle two are green (82 = 130), and the last two are blue (f6 = 246).',
    },
    {
      q: 'What is OKLCH and why is everyone using it for CSS now?',
      a: 'OKLCH is a perceptually uniform color space in the CSS Color Level 4 specification. It represents colors as Lightness (0–1), Chroma (colorfulness), and Hue (0–360°). Unlike HSL, OKLCH is perceptually uniform — two colors with the same L value look equally bright to human vision regardless of hue. This makes it ideal for design tokens (all "level 500" colors look equally prominent), smooth gradients (no muddy midpoints), and accessible color palettes. Native browser support landed in Chrome 111, Firefox 113, and Safari 15.4.',
    },
    {
      q: 'What is the difference between HSL and HSV?',
      a: 'Both are cylindrical ways to represent RGB colors, but they define brightness differently. In HSL, pure white is L=100% and pure black is L=0% — making it easy to lighten or darken a color by changing just the L value. In HSV, white is V=100% S=0% and black is V=0%. HSV is used in Photoshop, Illustrator, and graphic application color pickers because it maps more directly to how artists think about paint mixing. HSL is the standard for CSS and is more intuitive for making programmatic adjustments in stylesheets.',
    },
    {
      q: 'How do I check if my color passes WCAG contrast for accessibility?',
      a: 'Pick or paste your color and scroll to the WCAG Contrast panel at the bottom. It shows three ratios: your color on white, your color on black, and white text on your color as a background — with AA and AAA pass/fail badges for normal text (4.5:1 and 7:1) and large text (3:1 and 4.5:1). If a combination fails AA, try adjusting the L value in the HSL or OKLCH output to a darker or lighter shade until it passes — the other format values update in sync.',
    },
    {
      q: 'When do I need CMYK instead of RGB or HEX?',
      a: 'CMYK (Cyan, Magenta, Yellow, Black) is the subtractive ink model used in color printing. You need it when preparing files for business cards, brochures, packaging, or offset printing. Screen colors in RGB have a wider gamut than CMYK inks can reproduce — colors that look vivid on screen may appear duller in print. Getting the CMYK values before sending to a print vendor lets you verify the ink percentages and anticipate how the color will look on paper.',
    },
    {
      q: 'What formats can I paste into the color converter?',
      a: 'The smart paste field auto-detects: 6-digit HEX (#3b82f6), 3-digit shorthand (#fff), rgb(59, 130, 246), rgba(59, 130, 246, 0.8), hsl(217deg 91% 60%), hsla values, oklch(0.630 0.205 262.1), and any of the 140 CSS named colors including "royalblue", "coral", "rebeccapurple", and "hotpink". No need to select the input type — just paste whatever you have.',
    },
    {
      q: 'Is this color picker free and does it upload my color values anywhere?',
      a: 'Free, no sign-up required. All color math runs entirely in your browser — nothing is sent to any server. Safe for proprietary brand colors, client palette specifications, or any color values you wouldn\'t want shared with a third-party service. Works offline once the page has loaded.',
    },
    {
      q: 'How accurate is the OKLCH conversion?',
      a: 'The conversion follows Björn Ottosson\'s original OKLCH specification using standard ICC matrix transforms: sRGB → Linear sRGB → XYZ D65 → OKLab → OKLCH. Accurate to 3 decimal places for L and C, and 1 decimal place for H. Minor rounding of ±1 in RGB values may occur when converting back from OKLCH due to floating-point limits — this is within the precision range of CSS color handling in browsers.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Picker & Converter',
  url: 'https://webdevpuneet.com/color-picker/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online color picker and converter. Convert between HEX, RGB, HSL, HSV, OKLCH, and CMYK. Smart paste any color format, WCAG AA/AAA contrast ratios, dynamic UI chrome, one-click copy. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Color Picker & Converter', item: 'https://webdevpuneet.com/color-picker/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seoData.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function ColorPickerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ColorPickerTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
