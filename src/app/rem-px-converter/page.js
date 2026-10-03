import RemPxConverterTool from '@/components/RemPxConverterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'REM to PX Converter — Convert REM to Pixels Online Free | webdevpuneet.com',
  description: 'Free REM to PX converter. Instantly convert REM to pixels and PX to REM with custom base font size, live text preview & reference table. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/rem-px-converter/' },
  icons: { icon: '/icons/rem-px-converter.svg', shortcut: '/icons/rem-px-converter.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/rem-px-converter/', siteName: 'webdevpuneet.com', title: 'REM to PX Converter — Live CSS Unit Calculator Online', description: 'Convert REM to PX and PX to REM instantly. Adjust base font size, preview text size live, and use the reference table. Free.', images: [{ url: 'https://webdevpuneet.com/images/rem-to-pixel-converter.png', width: 1200, height: 630, alt: 'REM to PX Converter' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'REM to PX Converter — Live CSS Unit Calculator', description: 'Convert REM to PX and PX to REM instantly. Adjust base font size, preview text live. Free, no sign-up.', images: ['https://webdevpuneet.com/images/rem-to-pixel-converter.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I convert REM to pixels?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply the REM value by the base font size. With the browser default of 16px: 1rem = 16px, 1.5rem = 24px, 2rem = 32px, 0.875rem = 14px. This tool converts in both directions instantly as you type — enter a REM value to see pixels, or enter pixels to see the REM equivalent. Set the base font size input to match your project\'s root font size if it differs from 16px.' } },
    { '@type': 'Question', name: 'How do I convert pixels to REM?', acceptedAnswer: { '@type': 'Answer', text: 'Divide the pixel value by the base font size. With a 16px base: 24px ÷ 16 = 1.5rem, 14px ÷ 16 = 0.875rem, 32px ÷ 16 = 2rem. Type any pixel value in the PX field and the REM equivalent appears instantly. If your project uses a custom root font size (like 10px with the 62.5% trick), update the base font size input first.' } },
    { '@type': 'Question', name: 'What is 1rem in pixels?', acceptedAnswer: { '@type': 'Answer', text: '1rem = 16px in all major browsers by default, because the default root HTML element font-size is 16px. If your project sets a different root font size (like html { font-size: 62.5% } which makes the root 10px, so 1rem = 10px), then 1rem equals that custom base size instead. This tool defaults to 16px but lets you set any base.' } },
    { '@type': 'Question', name: 'Why should I use REM instead of PX for CSS?', acceptedAnswer: { '@type': 'Answer', text: 'REM font sizes respect the user\'s browser font-size preference — a critical accessibility feature for low-vision users who increase their default text size. WCAG 2.1 SC 1.4.4 (Resize Text) requires that text can be resized to 200% without breaking the layout. REM satisfies this automatically because all REM values scale proportionally when the root size changes. PX values stay fixed regardless of any browser or system setting, creating accessibility barriers.' } },
    { '@type': 'Question', name: 'What is the difference between REM and EM in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'REM is always relative to the root HTML element font-size (a single stable reference point). EM is relative to the nearest parent element\'s font-size, which compounds in nested components: a parent at 1.2em and a child also at 1.2em renders at 1.44× the root size. REM avoids this compounding entirely. For font sizes, REM is almost always the better choice. EM is useful for component-relative spacing where you want an element to scale with its container\'s font size.' } },
    { '@type': 'Question', name: 'What is the 62.5% base font size trick?', acceptedAnswer: { '@type': 'Answer', text: 'Setting html { font-size: 62.5% } makes the root font size 10px (62.5% of 16px). This makes REM mental math trivial: 1.6rem = 16px, 2.4rem = 24px, 3.2rem = 32px. Set this tool\'s base to 10px to convert accurately for this setup. Remember to reset body font-size to 1.6rem explicitly in your stylesheet to restore the correct default reading size.' } },
    { '@type': 'Question', name: 'Can I use REM for padding, margin, and spacing — not just font sizes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. REM works for any CSS length property — padding, margin, gap, width, height, border-radius, line-height, and more. Using REM for spacing means your entire layout scales proportionally when users increase their browser font size, preventing text from overflowing fixed-size PX containers. Tailwind CSS uses a 4px (0.25rem) base unit for its entire default spacing scale.' } },
    { '@type': 'Question', name: 'What REM values correspond to Tailwind CSS spacing?', acceptedAnswer: { '@type': 'Answer', text: 'Tailwind\'s spacing scale uses 4px increments at a 16px base. Common mappings: space-1 = 0.25rem (4px), space-2 = 0.5rem (8px), space-4 = 1rem (16px), space-6 = 1.5rem (24px), space-8 = 2rem (32px), space-12 = 3rem (48px), space-16 = 4rem (64px). Keep the base at 16px in this tool and use the reference table to see the full Tailwind spacing scale in both units.' } },
    { '@type': 'Question', name: 'What is 16px in rem and why is that the default?', acceptedAnswer: { '@type': 'Answer', text: '16px equals 1rem at the standard browser default root font size of 16px. This is the default because most major browsers (Chrome, Firefox, Safari, Edge) ship with a 16px user agent stylesheet for the html element. Common conversions at 16px base: 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem, 18px = 1.125rem, 20px = 1.25rem, 24px = 1.5rem, 32px = 2rem, 48px = 3rem. This is also why Tailwind\'s text-base is 1rem (16px) and text-lg is 1.125rem (18px).' } },
    { '@type': 'Question', name: 'Should I use REM or pixels for media query breakpoints?', acceptedAnswer: { '@type': 'Answer', text: 'Use rem (or em) for media queries rather than pixels. Major browser zoom applies to PX-based media queries inconsistently — a user who zooms the browser may not trigger a pixel-based breakpoint at the expected visual size. Rem-based breakpoints respect both browser zoom and default font-size preferences, ensuring the layout switches at the right visual breakpoint for every user. For example, instead of @media (max-width: 768px), use @media (max-width: 48rem) — they are equivalent at the default 16px base but behave correctly under zoom. Note that EM (not REM) is technically preferred for media queries because they inherit from the browser user preference rather than a CSS root value, but in practice the difference is negligible in most projects.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'REM to PX Converter',
  url: 'https://webdevpuneet.com/rem-px-converter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Bidirectional REM to PX and PX to REM CSS unit converter with adjustable base font size, live text preview, and reference table.',
  featureList: ['Bidirectional REM/PX conversion', 'Adjustable base font size', 'Live text preview', 'Reference table', 'Common value presets', 'Click-to-load row values'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'REM to PX Converter', item: 'https://webdevpuneet.com/rem-px-converter/' },
  ],
};

const SEO = {
  slug: 'rem-px-converter',
  title: 'REM to PX Converter — Live CSS Unit Calculator Online',

  about: {
    title: 'Convert REM to PX (and PX to REM) Instantly — With Custom Base Font Size',
    description: `Your design spec says 24px but your CSS uses REM, or you need to convert a Figma pixel value to its REM equivalent so it scales with the user's browser font size. Type the value and the other unit appears immediately — no formula required.\n\n**REM (root em)** is a CSS length unit relative to the root HTML element's \`font-size\` — 16px by default in all major browsers. That's why 1rem = 16px, 1.5rem = 24px, and 0.875rem = 14px. Unlike PX, which is fixed regardless of user preferences, REM scales proportionally when a user increases their browser's default font size. This matters for accessibility: **WCAG 2.1 SC 1.4.4 requires that text can be resized to 200% without breaking the layout**. REM satisfies this automatically; PX font sizes do not, creating accessibility barriers for low-vision users who rely on larger browser defaults.\n\nThe **base font size input** defaults to 16px but accepts any value from 8px to 50px. If your project uses the common \`html { font-size: 62.5% }\` trick (making 1rem = 10px for easier mental math — so 1.6rem = 16px, 2.4rem = 24px), set the base to 10px and all conversions and the reference table update simultaneously. The **reference table** shows the full REM scale with pixel equivalents at your current base size — click any row to load it into the converter. The **live text preview** renders a sample line at exactly the computed pixel size so you can visually judge the value before adding it to your stylesheet. This converter works for any CSS length property — not just font-size, but padding, margin, gap, border-radius, and width too. Tailwind CSS uses 4px (0.25rem) as its base spacing unit, so this table doubles as a Tailwind spacing cheat sheet at the 16px default.\n\nThe converter remembers which field you typed into last, so dragging the base font size slider afterward always recomputes from that field rather than silently overwriting it — if you last typed a PX value, changing the base updates the REM side to match it, and vice versa, instead of the more common implementation mistake where one field is always treated as the source of truth and the other quietly drifts. Every result is rounded to four decimal places and stripped of trailing zeros before display, which exists specifically to avoid the floating-point artifacts that raw multiplication and division produce in JavaScript — dividing 14 by 16 without that cleanup step would otherwise print as 0.8750000000000001. The live preview and the ruler beneath it use two independent scales for two different jobs: the sample text itself is clamped between 6px and 96px so an extreme value never breaks the layout, while the ruler bar's width is scaled against a fixed 160px visual maximum so it stays a useful comparative reference even once the rendered text size has been clamped.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Set your project\'s base font size',
        text: 'The base font size defaults to **16px**, which matches all major browsers\' default root `font-size`. If your project uses `html { font-size: 62.5% }` (making 1rem = 10px), click the **10px** preset button. If your project uses 18px or another value, drag the slider or type the value directly. All converter results and the reference table update immediately to reflect the new base.',
      },
      {
        title: 'Enter a REM value to get pixels',
        text: 'Type any REM value into the **REM** input field. The equivalent pixel value appears instantly in the **PX** field — no button press needed. The formula shown below the inputs confirms the calculation: `rem × base = px`. For example, at 16px base: `1.5rem × 16px = 24px`.',
      },
      {
        title: 'Or enter a pixel value to get REM',
        text: 'Type any pixel value into the **PX** input field and the REM equivalent appears instantly in the **REM** field. For example, a 14px design spec at 16px base gives `14 ÷ 16 = 0.875rem`. Both inputs convert in real time — whichever field you type in, the other updates.',
      },
      {
        title: 'Use the live text preview to judge the size visually',
        text: 'The **Preview** panel on the right renders a sample line of text at exactly the computed pixel size. This lets you visually confirm how large or small the value is before adding it to your CSS — much faster than switching between your code editor and browser. The ruler below the preview text shows the pixel width proportionally.',
      },
      {
        title: 'Browse the reference table and click any row',
        text: 'The **Reference Table** lists common REM values with their pixel equivalents and typical CSS use — body text, h4, h2, display sizes, and spacing units. Toggle **Common / Full** to switch between 12 common values and the full 27-value scale. All table values update when you change the base size. Click any row to instantly load that REM value into the converter. Use this table as a cheat sheet while writing CSS.',
      },
    ],
  },

  features: [
    'Bidirectional conversion — type REM to get PX, or type PX to get REM instantly',
    'Adjustable base font size from 8px to 50px — matches any project configuration',
    'Quick base size presets — 16px browser default, 10px (62.5% trick), 18px large-text',
    'Live text preview rendering the exact computed pixel size for visual judgment',
    'Reference table listing 12 common or 50 full REM values with pixel equivalents',
    'Reference table updates all rows instantly when the base font size changes',
    'Click any reference table row to load that value into the converter',
    'Common / Full table toggle — compact focused reference or complete scale',
    'Works for any CSS length property — font-size, padding, margin, gap, width; generate fluid clamp() sizes with our [CSS Clamp Generator](/css-clamp-generator)',
    '100% client-side — no sign-up, no data sent to any server, completely free; apply converted sizes in a responsive layout with our [Flexbox Builder](/flexbox-builder)',
  ],

  useCases: [
    {
      icon: 'Rp',
      title: 'Convert Figma pixel sizes to REM before writing CSS',
      desc: 'Figma and other design tools output pixel values. Use this to translate each size to its REM equivalent before adding it to your stylesheet. REM font sizes scale with the user\'s browser preference; PX values don\'t — which matters for accessibility compliance. Then use our [CSS to Tailwind](/css-to-tailwind) converter to turn those sizes into Tailwind classes.',
    },
    {
      icon: '⬡',
      title: 'Build a type scale or spacing system in REM',
      desc: 'Use the reference table to pick a consistent REM scale — 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem — and see the pixel equivalents at your project\'s base size. These map exactly to Tailwind\'s default spacing scale at 16px. Preview your fonts at each scale with our [Font Pairing Tool](/font-pairing-tool).',
    },
    {
      icon: '✓',
      title: 'Check if your font sizes pass WCAG resize text requirements',
      desc: 'WCAG 2.1 SC 1.4.4 requires that text can be resized to 200% without breaking the layout. Converting your pixel font sizes to REM ensures they scale with browser font size settings — satisfying this requirement without any media queries.',
    },
    {
      icon: '⚙',
      title: 'Work with a 10px base (62.5% trick) project',
      desc: 'If your project sets `html { font-size: 62.5% }` to make 1rem = 10px, set the base to 10px here. All conversions and the reference table update to reflect that base — 1.6rem = 16px, 2.4rem = 24px, 3.2rem = 32px.',
    },
    {
      icon: '◎',
      title: 'Understand what a REM value looks like at actual size',
      desc: 'The live text preview renders a sample line at exactly the computed pixel size. Useful when a design spec says "1.125rem" and you want to see what that looks like before adding it to your stylesheet.',
    },
    {
      icon: '≡',
      title: 'Quickly look up common REM-to-PX equivalents',
      desc: 'Keep the reference table open as a cheat sheet while writing CSS. All values update if you change the base font size — so if your project uses 18px as the root size, the table reflects accurate conversions for your specific configuration.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function RemPxConverterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><RemPxConverterTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
