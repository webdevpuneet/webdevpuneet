import AspectRatioCalculatorTool from '@/components/AspectRatioCalculatorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Aspect Ratio Calculator — Free Width, Height & Social Media Sizes',
  description: 'Free aspect ratio calculator — convert width to height, scale dimensions, detect image ratios, and preview crops for YouTube, Instagram, and TikTok.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/aspect-ratio-calculator/' },
  icons: { icon: '/icons/aspect-ratio-calculator.svg', shortcut: '/icons/aspect-ratio-calculator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/aspect-ratio-calculator/',
    siteName: 'webdevpuneet.com',
    title: 'Aspect Ratio Calculator - Width, Height & Social Media Sizes',
    description: 'Free — Calculate aspect ratios, scale dimensions, upload an image to detect its ratio, preview social media crops, and get image sizes for YouTube, Instagram, TikTok, LinkedIn and more.',
    images: [{ url: 'https://webdevpuneet.com/images/aspect-ratio-calculator.png', width: 1200, height: 630, alt: 'Aspect Ratio Calculator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Aspect Ratio Calculator - Width, Height & Social Media Sizes',
    description: 'Calculate aspect ratios, detect image sizes, preview social media crops, and get pixel dimensions for common platforms. Free online tool.',
    images: ['https://webdevpuneet.com/images/aspect-ratio-calculator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is aspect ratio and how do I calculate it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Aspect ratio is the proportional relationship between an image width and height, expressed as W:H. To calculate it, divide the width and height by their greatest common divisor. For example, 1920x1080 simplifies to 16:9 because both numbers are divisible by 120.' },
    },
    {
      '@type': 'Question',
      name: 'Can I upload an image to find its aspect ratio?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Image Ratio Detection to upload an image from your device. The calculator reads the image width and height locally in your browser, calculates the simplified aspect ratio, and shows the closest standard ratio such as 16:9, 4:5, 9:16, 1:1, or 1.91:1.' },
    },
    {
      '@type': 'Question',
      name: 'Can I preview how an image will crop for social media?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. After uploading an image, the Crop Preview section shows how the same image fills common frames such as YouTube thumbnail, Instagram portrait post, Story or Reel, square post, OG image, and Pinterest pin.' },
    },
    {
      '@type': 'Question',
      name: 'What aspect ratio should I use for YouTube thumbnails?',
      acceptedAnswer: { '@type': 'Answer', text: 'YouTube thumbnails should be 16:9 at 1280x720 pixels minimum. YouTube displays thumbnails at 16:9 in the player and browse view, so images outside that ratio may be cropped or letterboxed.' },
    },
    {
      '@type': 'Question',
      name: 'What size should Instagram posts be in pixels?',
      acceptedAnswer: { '@type': 'Answer', text: 'Instagram supports square 1080x1080 at 1:1, landscape 1080x566 at roughly 1.91:1, and portrait 1080x1350 at 4:5. Stories and Reels use 1080x1920 at 9:16.' },
    },
    {
      '@type': 'Question',
      name: 'What is the OG image aspect ratio for social sharing?',
      acceptedAnswer: { '@type': 'Answer', text: 'The recommended Open Graph image size is 1200x630 pixels, which is approximately 1.91:1. This size works well for Facebook, Twitter/X, LinkedIn, WhatsApp, Slack, and other link previews.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aspect Ratio Calculator',
  url: 'https://webdevpuneet.com/aspect-ratio-calculator/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online aspect ratio calculator — convert width to height, scale dimensions, detect image ratios, and preview crops for YouTube, Instagram, and TikTok. Runs entirely in your browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Aspect Ratio Calculator', item: 'https://webdevpuneet.com/aspect-ratio-calculator/' },
  ],
};

const SEO = {
  slug: 'aspect-ratio-calculator',
  title: 'Aspect Ratio Calculator - Width, Height & Social Media Sizes',
  subtitle: 'Calculate ratios, scale dimensions, detect uploaded image sizes, and preview social media crops.',
  sections: [
    {
      type: '2col',
      left: {
        type: 'text',
        label: 'About this tool',
        heading: 'Aspect Ratio Calculator for Designers, Developers and Social Media Creators',
        text: 'An aspect ratio is the proportional relationship between an image or video width and height, expressed as two numbers separated by a colon, like 16:9 or 4:5. Getting it right matters for every visual medium: a YouTube thumbnail that is not 16:9 may be cropped or letterboxed, a TikTok video that is not 9:16 can show black bars, and an OG image that is not close to 1.91:1 can look wrong when your link is shared on Slack or LinkedIn.\n\nUnder the hood, the calculator simplifies whatever width and height you enter using the same math you would do by hand, just automated and rounding-safe. It scales both numbers by 1000 to preserve up to three decimal places (so a ratio like 1.91:1 is not truncated to a whole number), then finds the greatest common divisor of the two scaled integers with a recursive Euclidean algorithm and divides both sides by it. That is why 1920x1080 reduces to 16:9 and 1080x1350 reduces to 4:5 instantly as you type, without you needing to know the divisor is 120 or 270. A common hand-calculation mistake is assuming two images with the "same" ratio are interchangeable — 1920x1080 and 3840x2160 are both exactly 16:9, but a 1280x719 image is not, even though it looks close, so the tool also computes a decimal ratio (width divided by height, to four places) and matches it against nine standard presets to report the closest one along with how far off it is.\n\nBeyond ratio math, the calculator scales dimensions bidirectionally — change either the new width or new height and the other is recalculated instantly so you never distort an image by typing both values by hand — and lets you upload an image to read its real pixel dimensions directly in the browser via the File and Image APIs, with nothing uploaded to a server. Once an image is loaded you can preview exactly how it will be cropped into six common frames (YouTube, Instagram post, Story/Reel, square, OG image, and Pinterest) using CSS aspect-ratio boxes, so you can see cropping problems before you export from a design tool. A Social Sizes reference tab covers exact pixel dimensions for 14 platforms, from YouTube channel art to LinkedIn covers, so you can jump straight from a platform name to the correct width, height, and simplified ratio.',
      },
      right: {
        type: 'features',
        heading: 'Features',
        items: [
          'Instant aspect ratio calculation, simplified to lowest terms as you type width or height',
          'Bidirectional scaling: enter a new width or height and the other value updates while preserving ratio',
          'Image upload detection that reads the real pixel width and height from a local image — then compress oversized files with the [image compressor](https://fwdtools.com/image-compressor/)',
          'Closest standard ratio matching for 16:9, 9:16, 1:1, 4:5, 2:3, 21:9, 1.91:1, and more',
          'Crop previews for YouTube, Instagram post, Story/Reel, square, OG image, and Pinterest formats — generate the OG image itself with the [OG image generator](https://fwdtools.com/og-image-generator/)',
          'Social media sizes for 14 platforms including YouTube, Instagram, TikTok, LinkedIn, Facebook, Pinterest, and OG images',
          'Common resolutions grid for quickly checking standard widths at the current ratio',
          'Orientation detection for Landscape, Portrait, and Square formats',
        ],
      },
    },
    {
      type: 'steps',
      heading: 'How to Use the Aspect Ratio Calculator',
      items: [
        { title: 'Enter your dimensions', text: 'Type a width and height in pixels. The ratio is calculated and simplified automatically as you type.' },
        { title: 'Or pick a ratio preset', text: 'Click a ratio preset such as 16:9, 9:16, 1:1, 4:3, 4:5, or 1.91:1 to apply it to your current width.' },
        { title: 'Scale to a new size', text: 'Enter a new width or height in the Scale section. The other dimension is calculated instantly while keeping your ratio locked.' },
        { title: 'Upload an image', text: 'Use Image Ratio Detection to load a local image. The tool reads its pixel dimensions, calculates the ratio, and shows the closest standard format.' },
        { title: 'Preview social crops', text: 'After uploading an image, review how it fills YouTube, Instagram portrait, Story/Reel, square, OG image, and Pinterest frames before resizing or cropping in the [image editor](https://fwdtools.com/image-editor/).' },
        { title: 'Check Social Sizes tab', text: 'Switch to the Social Sizes tab for a complete reference of platform-specific dimensions. Click any card to load those exact dimensions into the calculator.' },
      ],
    },
    {
      type: 'cards',
      heading: 'Who Uses an Aspect Ratio Calculator',
      columns: 3,
      items: [
        { icon: 'IMG', title: 'Social media managers', desc: 'Look up exact pixel dimensions and preview crops before exporting from Canva, Figma, Photoshop, or an image editor.' },
        { icon: 'CODE', title: 'Web developers', desc: 'Set correct width and height attributes or CSS aspect-ratio values on images and videos to reduce layout shift.' },
        { icon: 'DOC', title: 'Video editors', desc: 'Scale a 4K source down to 1080p, YouTube thumbnail size, or a vertical short format without distortion.' },
        { icon: 'CSS', title: 'UI/UX designers', desc: 'Design responsive components at the correct ratio so cards, embeds, thumbnails, and previews scale correctly.' },
        { icon: 'WEB', title: 'Content creators', desc: 'Check one source image against Instagram, TikTok, YouTube, Pinterest, LinkedIn, and OG image crops.' },
        { icon: 'PDF', title: 'Presentation designers', desc: 'Convert a 16:9 slide deck concept to 4:3, square, or portrait proportions when another format is required.' },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: [
        { q: 'What aspect ratio should I use for YouTube thumbnails?', a: 'YouTube thumbnails should be 16:9 at 1280x720 pixels minimum. YouTube displays thumbnails at 16:9 in the player and browse view, so images outside that ratio may be cropped or letterboxed.' },
        { q: 'What size should Instagram posts be in pixels?', a: 'Instagram supports square 1080x1080 at 1:1, landscape 1080x566 at roughly 1.91:1, and portrait 1080x1350 at 4:5. Stories and Reels use 1080x1920 at 9:16.' },
        { q: 'Can I upload an image to find its aspect ratio?', a: 'Yes. Use Image Ratio Detection to upload an image from your device. The calculator reads the image width and height locally in your browser, calculates the simplified aspect ratio, and shows the closest standard ratio.' },
        { q: 'Can I preview how an image will crop for social media?', a: 'Yes. After uploading an image, the Crop Preview section shows how the same image fills common frames such as YouTube thumbnail, Instagram portrait post, Story/Reel, square post, OG image, and Pinterest pin.' },
        { q: 'What is the OG image aspect ratio for social sharing?', a: 'The recommended Open Graph image size is 1200x630 pixels, which is approximately 1.91:1. This size works well for Facebook, Twitter/X, LinkedIn, WhatsApp, Slack, and other link previews.' },
        { q: 'How do I resize an image without changing the aspect ratio?', a: 'Use the Scale section. Enter your original width and height, or upload an image to detect them automatically, then type a new width or height. The other dimension is calculated automatically.' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <AspectRatioCalculatorTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
