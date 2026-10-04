import ColorContrastChecker from '@/components/ColorContrastChecker';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Color Contrast Checker — Free WCAG AA & AAA Accessibility Tool | webdevpuneet.com',
  description: 'Check color contrast for WCAG 2.1 AA and AAA compliance — live preview for text and UI components, with a suggested fix if you fail. Free, browser-based.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/color-contrast-checker/' },
  icons: { icon: '/icons/color-contrast-checker.svg', shortcut: '/icons/color-contrast-checker.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/color-contrast-checker/',
    siteName: 'webdevpuneet.com',
    title: 'Color Contrast Checker — WCAG AA & AAA Accessibility Tool',
    description: 'Check foreground/background color contrast ratio against WCAG 2.1 AA and AAA standards. Live preview, pass/fail per criterion, luminance values, and a suggested fix.',
    images: [{ url: 'https://webdevpuneet.com/images/color-contrast-checker.png', width: 1200, height: 630, alt: 'Color Contrast Checker — WCAG AA & AAA' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Color Contrast Checker — WCAG AA & AAA Accessibility Tool',
    description: 'Check color contrast ratio for WCAG AA/AAA compliance. Live preview, pass/fail table, luminance values, and suggested fix. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/color-contrast-checker.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is color contrast ratio and how is it calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Color contrast ratio measures the difference in perceived brightness between two colors — typically a foreground (text) color and a background color. It is calculated using the WCAG relative luminance formula: contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color. Relative luminance converts each RGB channel to a linear value using a gamma correction formula, then combines them as 0.2126×R + 0.7152×G + 0.0722×B. The resulting ratio ranges from 1:1 (no contrast — identical colors) to 21:1 (maximum contrast — pure black on pure white).',
      },
    },
    {
      '@type': 'Question',
      name: 'What contrast ratio is required for WCAG AA compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text (smaller than 18pt or 14pt bold) and at least 3:1 for large text (18pt and above, or 14pt bold and above). For UI components such as form input borders, focus indicators, and icons that convey information, WCAG AA also requires at least 3:1 contrast against adjacent colors. These requirements apply to text and interactive elements — purely decorative images and disabled controls are exempt.',
      },
    },
    {
      '@type': 'Question',
      name: 'What contrast ratio is required for WCAG AAA compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WCAG 2.1 Level AAA requires a contrast ratio of at least 7:1 for normal text and at least 4.5:1 for large text (18pt or 14pt bold). AAA is the highest level of WCAG conformance. It is intended for specialized accessibility use cases — most organizations target AA compliance as the standard for production websites. AAA compliance for all text is often impractical because very high contrast can reduce legibility for people with certain cognitive disabilities, and many brand color palettes cannot meet 7:1 throughout.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check color contrast for WCAG compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your foreground (text) color and background color using the hex input fields or color pickers. The contrast ratio is calculated instantly. The WCAG 2.1 Compliance table shows pass or fail for all five key criteria: AA Normal text (4.5:1), AAA Normal text (7:1), AA Large text (3:1), AAA Large text (4.5:1), and AA UI components (3:1). Use the Preview tabs to see how the colors look for normal text, large text, and UI elements like buttons, inputs, and icons. If the colors fail AA, a suggested foreground color adjustment is shown that meets 4.5:1.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between WCAG normal text and large text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WCAG defines "large text" as text that is at least 18 point (approximately 24px at standard screen resolution) or at least 14 point bold (approximately 19px bold). All other text is "normal text." The rationale is that larger text is inherently easier to read at lower contrast, so it qualifies for a relaxed minimum of 3:1 instead of 4.5:1 for AA. In practice: body copy, labels, captions, navigation items, and most UI text are normal text. Page headings (typically H1–H2) are often large text. Always measure the rendered pixel size, not just the CSS font-size, since browser zoom and user settings can affect the actual size.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix a color contrast failure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most reliable approach is to darken the foreground (text) color or lighten the background color. This tool shows a suggested foreground hex value that meets 4.5:1 AA when the current combination fails — click "Use" to apply it. Generally: for light backgrounds, use darker text (lower lightness in HSL). For dark backgrounds, use lighter text (higher lightness). Avoid relying on hue changes alone — yellow on white and red on white both have very low contrast regardless of how saturated they are, because luminance is primarily driven by lightness and green content. Use the luminance values shown in this tool to understand which color has more room to adjust.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do placeholder text and disabled elements need to pass contrast requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Disabled interface components and purely decorative content are explicitly exempted from WCAG contrast requirements (Success Criterion 1.4.3 exception). Placeholder text in form inputs is not formally exempted, but WCAG guidance notes that placeholder text is informational rather than required — however, many accessibility audits flag low-contrast placeholders as best-practice failures. The WCAG 2.1 Understanding document recommends that placeholder text also meets 4.5:1 where possible, as it helps users with low vision identify input purpose. Always verify with your organization\'s accessibility policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is relative luminance in color contrast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relative luminance is a measure of how bright a color appears to the human eye on a linear scale from 0 (absolute black) to 1 (absolute white). It is calculated from the sRGB color values using a linearization formula that corrects for gamma encoding: each channel (R, G, B) is divided by 255, then converted to a linear value using the formula (c + 0.055) / 1.055 raised to the power 2.4 for values above 0.04045, or divided by 12.92 for values at or below 0.04045. The linearized channels are combined as L = 0.2126×R + 0.7152×G + 0.0722×B, reflecting the human eye\'s greater sensitivity to green light. Pure white (#ffffff) has luminance 1.0. Pure black (#000000) has luminance 0. Medium gray (#808080) has luminance approximately 0.216.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Contrast Checker',
  url: 'https://webdevpuneet.com/color-contrast-checker/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online WCAG color contrast checker. Calculate contrast ratio, check AA and AAA compliance for normal text, large text, and UI components. Live preview with suggested fix.',
  featureList: [
    'Contrast ratio calculated using WCAG 2.1 relative luminance formula',
    'Pass/fail for all five WCAG criteria — AA/AAA normal text, AA/AAA large text, AA UI components',
    'Live preview — normal text, large text, and UI components (buttons, inputs, icons)',
    'Luminance values for foreground and background',
    'Suggested foreground color fix when AA fails',
    'Six accessible color presets to get started',
    'Swap foreground/background in one click',
    '100% browser-based — no data sent to any server',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Color Contrast Checker', item: 'https://webdevpuneet.com/color-contrast-checker/' },
  ],
};

const SEO = {
  slug: 'color-contrast-checker',
  title: 'Color Contrast Checker — Free WCAG AA & AAA Accessibility Tool',

  about: {
    title: 'Color Contrast Checker — Free WCAG 2.1 AA & AAA Compliance for Web Accessibility',
    description: 'Pick two colors and instantly see whether they pass WCAG 2.1 accessibility requirements. The contrast ratio is calculated in real time using the official WCAG relative luminance formula — the same algorithm used by every major accessibility testing tool including axe, WAVE, Lighthouse, and Colour Contrast Analyser.\n\nThe results panel shows a pass/fail breakdown across all five WCAG 2.1 criteria: **AA Normal text** (4.5:1), **AAA Normal text** (7:1), **AA Large text** (3:1), **AAA Large text** (4.5:1), and **AA UI components** (3:1 for borders, icons, and interactive elements). Most organizations target Level AA as their minimum standard. Level AAA is required for specialized accessibility contexts.\n\nThe **Preview panel** shows your colors applied to real content in three modes: Normal text (16px body copy and bold), Large text (24px heading and 19px bold heading), and UI components (buttons, outlined buttons, input fields, checkboxes, and icon glyphs). This lets you judge how the combination reads visually — because a passing ratio doesn\'t always mean the design feels comfortable, and a failing ratio might still be acceptable for large decorative headings.\n\nIf your color combination fails AA, the tool suggests an adjusted foreground color that meets the 4.5:1 minimum. **How the suggestion is calculated:** starting from your current foreground, the tool tests offsets from 0 to 255, adding each offset to the red, green, and blue channels together — once toward white, once toward black — recalculating the contrast ratio at every step, and returning the first offset that crosses 4.5:1. Because the same amount shifts all three channels equally, hue tends to stay close to the original rather than jumping to grayscale, though very saturated colors can shift slightly once a channel clips at 0 or 255. Click **Use** to apply it instantly.\n\nBoth fields accept a native color-picker swatch or a typed hex value, including 3-character shorthand (like #333, expanded to #333333) — the two stay in sync as you edit either one. A swap control flips foreground and background in one click, the fastest way to compare a light-mode pairing against its dark-mode inverse.\n\nThe **luminance values** shown for both colors help explain why a pair fails and how to adjust it — luminance is the foundation of the contrast formula, describing how bright each color appears to the human eye on a 0-to-1 scale.\n\nAll calculation runs in your browser using JavaScript. No color data is sent to any server.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter your foreground and background colors', text: 'Enter your foreground (text) color in the top hex field, either by clicking the color swatch to open the native color picker or by typing a hex code directly. Enter your background color in the bottom hex field the same way.' },
      { title: 'Read the contrast ratio and WCAG table', text: 'The contrast ratio badge updates instantly. Scroll the WCAG 2.1 Compliance table to see pass/fail for each individual criterion — AA Normal (4.5:1), AAA Normal (7:1), AA Large (3:1), AAA Large (4.5:1), and AA UI components (3:1) — with the required minimum ratio shown for each.' },
      { title: 'Preview in context', text: 'Use the Preview tabs on the right to see Normal text, Large text, or UI component previews rendered in your exact colors. This lets you judge readability visually — a passing ratio doesn\'t always mean the design feels comfortable, and large headings can look fine below the strict threshold.' },
      { title: 'Apply the suggested fix if it fails', text: 'If the combination fails AA, a suggestion box appears with an adjusted foreground color calculated to meet 4.5:1. Click Use to apply it instantly and see the updated ratio.' },
      { title: 'Swap colors or load a preset', text: 'Use the Swap button (⇅) between the two fields to reverse foreground and background in one click. Click any preset in the Presets grid to load a pre-built color pair and explore passing and failing examples.' },
    ],
  },

  features: [
    'Contrast ratio calculation using the WCAG 2.1 relative luminance formula — the same algorithm used by Lighthouse, axe, and WAVE accessibility auditors',
    'Five WCAG criteria checked simultaneously — AA Normal (4.5:1), AAA Normal (7:1), AA Large (3:1), AAA Large (4.5:1), AA UI components (3:1)',
    'Live preview in three modes — Normal text (body copy, bold), Large text (headings), and UI components (buttons, inputs, checkboxes, icons)',
    'Suggested fix — when AA fails, the tool calculates and displays a nudged foreground color that meets 4.5:1, with a one-click "Use" button',
    'Luminance display — shows the relative luminance of each color (0–1 scale) to help you understand why a color pair passes or fails',
    'Color picker + hex input per color — use the native browser color picker for visual selection or type hex codes directly; both sync in real time',
    'RGB display — shows the rgb() equivalent of each color for reference and CSS use',
    'Swap button — reverses foreground and background with one click to instantly see the inverse combination',
    'Six accessible presets — load curated color pairs to explore passing and failing examples',
    '100% browser-based — all WCAG calculations run client-side using JavaScript; no colors are sent to any server',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Check brand color combinations meet WCAG AA before shipping',
      desc: 'Paste your primary brand color as the foreground and the page background as the background. Check whether it passes 4.5:1 for body copy. If it fails, use the suggested fix to find the closest dark variant that passes — then update your design tokens or CSS variables with the new value. Run this check for every text/background combination in your design system: primary on white, white on primary, gray on white, and any colored card backgrounds. Use our [Color Palette Generator](/color-palette-generator) to build an accessible full palette.',
    },
    {
      icon: '⬡',
      title: 'Audit website text colors for WCAG 2.1 AA compliance',
      desc: 'Pick the text color and background from your website using the browser eyedropper (available in Chrome and Firefox DevTools color picker), or grab exact values with our [color picker](/color-picker). Paste the hex values here to verify each text/background pair passes 4.5:1 AA. Common failure areas: gray body text on white (#6b7280 on #ffffff is only 4.48:1 — barely failing), placeholder text in forms, footer text on dark backgrounds, and link color on colored button backgrounds. For a full site audit, check every unique text-background combination in your stylesheet.',
    },
    {
      icon: '▦',
      title: 'Design accessible UI components — buttons, inputs, and icons',
      desc: 'Switch to the UI preview tab to see how your color pair applies to interactive components. WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast) requires 3:1 for UI component borders and states — this includes the border of a text input, the checked state of a checkbox, the outline of a focused button, and icons that carry meaning. Test your button border color against the page background, and your icon color against its container background.',
    },
    {
      icon: '⊞',
      title: 'Check color contrast for print and document accessibility',
      desc: 'PDF documents and printed materials also need to meet contrast requirements for accessibility compliance under ADA and Section 508 in the US and EN 301 549 in Europe. Use this checker to verify heading and body text colors in document templates against their page backgrounds. Gray on white is a common failure in corporate report templates. For documents that will be printed in grayscale, test your text colors against a white background — what reads as a branded teal on screen may become a near-invisible light gray in print.',
    },
    {
      icon: '◉',
      title: 'Verify dark mode color contrast separately from light mode',
      desc: 'Dark mode designs require separate contrast checks — a text color that passes on white may fail dramatically on a dark background. Check your dark mode palette: white text on dark backgrounds usually passes easily, but secondary text colors (muted grays) on dark surfaces often fail. Use the Swap button to quickly reverse a color pair and compare light vs dark mode contrast ratios side by side. Combine with our [Color Palette Generator](/color-palette-generator) to build dark-mode-ready token sets.',
    },
    {
      icon: '△',
      title: 'Validate data visualization colors for accessibility',
      desc: 'Charts, graphs, and infographics must meet 3:1 non-text contrast for any graphical elements that convey information — bar fills, line colors, legend swatches, and axis labels. Check each data series color against the chart background. Red and green combinations are especially problematic — they may fail contrast AND be indistinguishable for users with red-green color blindness (deuteranopia affects ~8% of men). Use high-contrast alternatives like blue and orange, which both meet contrast requirements and are distinguishable for most types of color vision deficiency.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function ColorContrastCheckerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ColorContrastChecker /></div>
      <AdSlot />
      <IndexOnly><SeoSection heading="Free Color Contrast Checker — WCAG 2.1 AA & AAA Compliance" {...SEO} /></IndexOnly>

    </div>
  );
}
