import ImageColorPaletteTool from '@/components/ImageColorPaletteTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/image-color-palette.png';

export const metadata = {
  title: "Image Color Palette Extractor \u2014 Get Colors from Any Image | webdevpuneet.com",
  description: "Upload an image and extract the dominant color palette as HEX, RGB, and HSL values. Copy any color instantly. Browser-only, no upload to server.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-color-palette/' },
  icons: { icon: '/icons/image-color-palette.svg', shortcut: '/icons/image-color-palette.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-color-palette/',
    siteName: 'webdevpuneet.com',
    title: "Image Color Palette Extractor \u2014 Get Colors from Any Image | webdevpuneet.com",
    description: "Upload an image and extract the dominant color palette as HEX, RGB, and HSL values. Copy any color instantly. Browser-only, no upload to server.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Image Color Palette \u2014 FWD Tools" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "Image Color Palette Extractor \u2014 Get Colors from Any Image | webdevpuneet.com",
    description: "Upload an image and extract the dominant color palette as HEX, RGB, and HSL values. Copy any color instantly. Browser-only, no upload to server.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How does the color extraction work?", acceptedAnswer: { '@type': 'Answer', text: "The image is drawn to an HTML Canvas element, pixels are sampled, and similar colors are grouped using a median-cut quantization algorithm. The most visually prominent color groups are returned as the palette." } },
    { '@type': 'Question', name: "Is the image uploaded to a server?", acceptedAnswer: { '@type': 'Answer', text: "No. The image is processed entirely in your browser using the Canvas API. It is never sent to any server." } },
    { '@type': 'Question', name: "What image formats are supported?", acceptedAnswer: { '@type': 'Answer', text: "JPG, PNG, WebP, and GIF are supported. SVG files may be supported depending on your browser." } },
    { '@type': 'Question', name: "Why does the palette not include every color in the image?", acceptedAnswer: { '@type': 'Answer', text: "The extractor groups similar colors together and returns the dominant groups. A photo may contain thousands of unique pixel colors \u2014 the palette shows the most visually significant distinct colors, not every shade." } },
    { '@type': 'Question', name: "Can I adjust how many colors are extracted?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Use the color count slider to extract between 6 and 12 dominant colors." } },
    { '@type': 'Question', name: "How do I use the extracted colors in CSS?", acceptedAnswer: { '@type': 'Answer', text: "Click any color swatch to copy its HEX code, then paste it directly into your CSS color property. Switch to RGB or HSL format if your project uses those." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "Image Color Palette",
  url: 'https://webdevpuneet.com/image-color-palette/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: metadata.description,
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: "Image Color Palette", item: 'https://webdevpuneet.com/image-color-palette/' },
  ],
};

const SEO = {
  slug: 'image-color-palette',
  title: "Image Color Palette \u2014 Extract dominant colors from images",
  subtitle: "Extract dominant colors from images. Runs in your browser.",
  about: {
    title: "Extract the Dominant Color Palette From Any Image",
    description: `Matching brand colors from a logo, building a color scheme from a product photo, or checking what colors a competitor uses in their design — all start with extracting the colors that actually appear in an image. This color palette extractor analyzes any image and identifies the dominant colors, grouped by visual prominence, entirely on your device.

Drop or upload an image and the tool samples pixels across it, clusters similar colors together, and returns as many dominant colors as you choose — drag the slider anywhere from 4 up to 150, with 12 as the default starting point. Each color is shown as a swatch with its HEX, RGB, and HSL values, and a format toggle lets you switch every swatch between the three at once. Click any color to copy its current format to the clipboard.

**How color extraction works.** Before sampling, the image is scaled down so its longest edge is at most 300px and drawn onto a hidden canvas via the Canvas 2D drawImage API, keeping extraction fast even for large photos. Rather than reading every pixel, the tool strides through the canvas's pixel buffer so roughly 5,000 samples are taken regardless of image size, skipping pixels whose alpha channel is below 128 so transparent PNG backgrounds aren't counted. Those RGB triplets feed a median-cut quantization algorithm: it finds which channel (red, green, or blue) has the widest range across the current pixel bucket, sorts along that channel, and splits the bucket in half — recursively, to a depth of log2(your chosen count) — before averaging each final bucket into one representative color. The result favors visually significant color groups over a list of every unique pixel value, which is why a photo with thousands of shades still produces a clean set of swatches.

**Runs fully in your browser.** Because the image only ever touches a canvas element in your own browser tab, nothing is uploaded anywhere — you can safely extract colors from private, proprietary, or watermarked images.

**Using extracted colors in your project.** Copy the HEX values into CSS custom properties, Tailwind config files, or brand guideline docs. For building out a full harmony scale from a single extracted swatch, pair this with the [Color Palette Generator](/color-palette-generator/); for fine-grained hue, saturation, or lightness tweaks, use the [Color Picker](/color-picker/).`,
  },
  features: [
    "**Dominant color extraction** using median-cut quantization \u2014 groups similar pixels into the most visually significant color clusters",
    "**6\u201312 colors** with an adjustable count slider to control palette size based on how many distinct shades you need",
    "**HEX, RGB, and HSL** output for each extracted color \u2014 switch format per swatch or copy all at once",
    "**One-click copy** for any color in any format directly to the clipboard",
    "**Drag-and-drop upload** supporting JPG, PNG, WebP, and GIF image formats",
    "**Canvas API processing** \u2014 the image is drawn locally in your browser and never uploaded to any server",
    "**Image preview** displayed alongside the extracted palette for visual comparison",
    "**Private by design** \u2014 works with watermarked, proprietary, or confidential images without any upload",
    "**Pairs with [Color Picker](/color-picker/)** for precise color manipulation and **[Color Palette Generator](/color-palette-generator/)** for harmony schemes",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Upload or drop an image", text: "Click the upload area or drag and drop any image file \u2014 JPG, PNG, WebP, GIF, or SVG. The extraction runs immediately after the image loads." },
      { title: "Wait for palette extraction", text: "The tool samples the image and groups pixels by color similarity. This typically takes under a second for most images." },
      { title: "Copy colors you need", text: "Click any color swatch to copy its HEX code. Use the dropdown on each swatch to switch between HEX, RGB, and HSL format." },
      { title: "Adjust the number of colors", text: "Use the color count slider to extract fewer (6) or more (12) dominant colors depending on how many distinct shades you need." },
      { title: "Use colors in your project", text: "Paste the HEX codes into your CSS, design tool, or brand guidelines. Use with [Color Picker](/color-picker/) to explore variations." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Extract brand colors from a logo", desc: "Upload a logo PNG and get the exact HEX, RGB, and HSL codes for the brand colors to use in CSS variables, design tokens, or style guides." },
    { icon: "\u25a6", title: "Build a color scheme from a product photo", desc: "Extract the dominant palette from a product image to create a matching color scheme for a landing page, campaign, or packaging design." },
    { icon: "\u25b3", title: "Match colors from reference images", desc: "Upload a design reference image and extract its palette to match colors accurately in your own work without manual eyedropper hunting." },
    { icon: "\u25d1", title: "Analyze competitor design color choices", desc: "Extract palettes from competitor screenshots or marketing materials to understand their design language and inform your own color decisions." },
    { icon: "\u26a1", title: "Generate palettes from photography", desc: "Extract color inspiration from landscape, architectural, or portrait photography for creative projects, mood boards, or brand identity work." },
    { icon: "\u2261", title: "Find exact hex codes from mockups", desc: "Upload a design mockup or screenshot and extract precise hex codes for colors you need to reproduce in CSS or a design tool." },
  ],
  faqs: [
    { q: "How does the color extraction work?", a: "The image is drawn to an HTML Canvas element, pixels are sampled, and similar colors are grouped using a median-cut quantization algorithm. The most visually prominent color groups are returned as the palette." },
    { q: "Is the image uploaded to a server?", a: "No. The image is processed entirely in your browser using the Canvas API. It is never sent to any server." },
    { q: "What image formats are supported?", a: "JPG, PNG, WebP, and GIF are supported. SVG files may be supported depending on your browser." },
    { q: "Why does the palette not include every color in the image?", a: "The extractor groups similar colors together and returns the dominant groups. A photo may contain thousands of unique pixel colors \u2014 the palette shows the most visually significant distinct colors, not every shade." },
    { q: "Can I adjust how many colors are extracted?", a: "Yes. Use the color count slider to extract between 6 and 12 dominant colors." },
    { q: "How do I use the extracted colors in CSS?", a: "Click any color swatch to copy its HEX code, then paste it directly into your CSS color property. Switch to RGB or HSL format if your project uses those." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use Image Color Palette",
  description: "Upload an image and extract the dominant color palette as HEX, RGB, and HSL values. Copy any color instantly. Browser-only, no upload to server.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function ImageColorPalettePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageColorPaletteTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
