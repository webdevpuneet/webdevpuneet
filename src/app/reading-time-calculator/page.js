import ReadingTimeCalculatorTool from '@/components/ReadingTimeCalculatorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/reading-time-calculator.png';

export const metadata = {
  title: "Reading Time Calculator: Read Time and Readability",
  description: "Paste any text to see its estimated reading and speaking time, word count, Flesch readability score, grade level and sentence stats. Free tool, no sign-up.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/reading-time-calculator/' },
  icons: { icon: '/icons/reading-time-calculator.svg', shortcut: '/icons/reading-time-calculator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/reading-time-calculator/',
    siteName: 'webdevpuneet.com',
    title: "Reading Time Calculator \u2014 Estimate Read Time & Readability Score",
    description: "Paste any text to calculate estimated reading time, word count, Flesch readability score, grade level, and sentence stats. Free online tool.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Reading Time Calculator \u2014 webdevpuneet.com" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "Reading Time Calculator \u2014 Estimate Read Time & Readability Score",
    description: "Paste any text to calculate estimated reading time, word count, Flesch readability score, grade level, and sentence stats. Free online tool.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How is reading time calculated?", acceptedAnswer: { '@type': 'Answer', text: "Reading time is estimated by dividing word count by reading speed in words per minute. The average adult reads 200\u2013250 words per minute for non-fiction. This tool shows estimates for slow (150 wpm), average (238 wpm), and fast (350 wpm) reading speeds." } },
    { '@type': 'Question', name: "What is the Flesch Reading Ease score?", acceptedAnswer: { '@type': 'Answer', text: "The Flesch Reading Ease score ranges from 0 to 100. Higher scores mean easier reading. Scores above 70 are easy for most adults, 60\u201370 is standard, 50\u201360 is fairly difficult, and below 50 requires college-level reading. The formula uses sentence length and syllables per word." } },
    { '@type': 'Question', name: "What is the Flesch-Kincaid Grade Level?", acceptedAnswer: { '@type': 'Answer', text: "The Flesch-Kincaid Grade Level estimates the US school grade needed to easily understand the text. A score of 8 means an 8th grader can read it easily. Most general-audience web content targets grades 7\u20139." } },
    { '@type': 'Question', name: "How can I improve my readability score?", acceptedAnswer: { '@type': 'Answer', text: "Use shorter sentences, choose common words over technical jargon, prefer active voice, and write shorter paragraphs. These changes reduce average syllables per word and average sentence length, which drives the Flesch scores." } },
    { '@type': 'Question', name: "Is my text uploaded anywhere?", acceptedAnswer: { '@type': 'Answer', text: "No. All analysis runs in your browser. Your text is never sent to a server. You can use the tool with private, confidential, or unpublished content safely." } },
    { '@type': 'Question', name: "What reading speed should I use for a blog reading time badge?", acceptedAnswer: { '@type': 'Answer', text: "Most blogs use 200\u2013250 wpm. Medium uses 275 wpm. The average estimate in this tool uses 238 wpm, which is a commonly cited adult reading speed for online content." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "Reading Time Calculator",
  url: 'https://webdevpuneet.com/reading-time-calculator/',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: "Reading Time Calculator", item: 'https://webdevpuneet.com/reading-time-calculator/' },
  ],
};

const SEO = {
  slug: 'reading-time-calculator',
  title: "Reading Time Calculator \u2014 WPM, Flesch score & read time",
  subtitle: "WPM, Flesch score & read time. Runs in your browser.",
  about: {
    title: "Estimate Reading Time and Readability Score for Any Text",
    description: `Blog posts, articles, and documentation all benefit from a reading time estimate — readers decide whether to engage based on how long something will take. The "5 min read" badge on a blog post comes from a simple calculation: word count divided by average reading speed (around 200-250 words per minute for adult readers). This calculator gives you that number along with readability scores that tell you whether the text is accessible to your target audience.

Paste any text and the calculator shows estimated reading time at three speeds (slow: 150 wpm, average: 238 wpm, fast: 350 wpm), word count, sentence count, paragraph count, average sentence length, average word length, and syllable count. The Flesch Reading Ease score (0-100) and Flesch-Kincaid Grade Level estimate how easy the text is to read — scores above 70 are considered easy for most adults, below 50 requires a college reading level.

**Writing feedback loop.** After drafting content, paste it here to check whether the grade level matches your audience. A technical blog post for developers can tolerate a higher grade level than a marketing landing page aimed at general consumers. Short sentences, common words, and active voice all improve the score.

**Calibrate reading time badges.** "5 min read" estimates vary by publication. Medium uses 275 wpm. This tool lets you choose your own speed benchmark and see the exact minutes and seconds.

Runs fully in your browser — text is never uploaded.\n\n**Improving your readability score.** The most effective ways to raise your Flesch Reading Ease score are to shorten your average sentence length and choose common words over technical jargon. Long compound sentences can usually be split into two simpler sentences. Passive voice adds words and syllables without adding meaning — prefer active constructions. After editing, paste the revised text back to see the numerical improvement instantly.\n\n**Use cases beyond blogging.** Technical writers use grade level to verify documentation is accessible to the intended skill level. Email marketers check reading difficulty to match their subscriber audience. SEO content teams verify minimum word counts and readability thresholds before publishing. Product teams check help article clarity before shipping to users. The tool handles any text length, from a short email to a 5,000-word article, and the statistics update instantly without any submission step.`,
  },
  features: [
    "**Reading time at three speeds** \u2014 slow (150 wpm), average (238 wpm), and fast (350 wpm) shown simultaneously",
    "**Word count, sentence count, and paragraph count** updated in real time as you type or paste",
    "**Flesch Reading Ease score** (0\u2013100) with interpretation label showing difficulty level",
    "**Flesch-Kincaid Grade Level** showing the approximate US school grade equivalent for the text",
    "**Average sentence length and average word length** for targeted writing improvement feedback",
    "**Syllable count** used in the readability formula calculation, displayed alongside other stats",
    "**Runs entirely in the browser** \u2014 text is never sent to any server, safe for private or unpublished content",
    "**Works for any language written in Latin script** \u2014 optimized for English readability scoring",
    "**Instant results** \u2014 no submit button, statistics update as you type or paste content",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Paste your text", text: "Paste the full text of an article, blog post, documentation page, or any content you want to analyze. The calculator updates as you type." },
      { title: "Check reading time", text: "The three reading time estimates show how long the text takes at slow (150 wpm), average (238 wpm), and fast (350 wpm) reading speeds. Use the average for a blog post badge." },
      { title: "Review word and sentence counts", text: "Check word count, sentence count, paragraph count, and average sentence length. Shorter sentences generally improve readability scores." },
      { title: "Interpret the Flesch scores", text: "Flesch Reading Ease above 70 is easy to read for most adults. Below 50 requires college-level reading. The Flesch-Kincaid Grade Level gives an approximate US school grade equivalent." },
      { title: "Use feedback to edit", text: "If the grade level is higher than your target audience needs, simplify long sentences, replace uncommon words with common ones, and use shorter paragraphs." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Add a reading time badge to blog posts", desc: "Calculate the reading time for an article and add the \"X min read\" badge to the post header or preview card. Use the average 238 wpm benchmark for standard blog content." },
    { icon: "\u25a6", title: "Check if content matches your audience reading level", desc: "Verify that a landing page, help article, or email is written at the right Flesch-Kincaid grade level for your target readers before publishing. Get full word and character stats in the [word counter](/word-counter)." },
    { icon: "\u25b3", title: "Improve readability of technical writing", desc: "Paste documentation or technical content and use the grade level and sentence length stats to identify areas where shorter sentences or simpler words would help. Draft and restructure in the [Markdown editor](/markdown-editor)." },
    { icon: "\u25d1", title: "Optimize email length and complexity", desc: "Check whether a marketing email or newsletter is the right length and reading difficulty for your subscriber list before sending." },
    { icon: "\u2261", title: "Evaluate content for SEO writing standards", desc: "Many SEO guidelines recommend Flesch Reading Ease above 60. Use this tool to check word count and readability score before publishing — then audit the page itself with the [SEO checker](https://webdevpuneet.com/seo-checker/)." },
    { icon: "\u2726", title: "Check educational content difficulty", desc: "Verify that learning materials, instructions, or guides are written at the appropriate grade level for the intended audience." },
  ],
  faqs: [
    { q: "How is reading time calculated?", a: "Reading time is estimated by dividing word count by reading speed in words per minute. The average adult reads 200\u2013250 words per minute for non-fiction. This tool shows estimates for slow (150 wpm), average (238 wpm), and fast (350 wpm) reading speeds." },
    { q: "What is the Flesch Reading Ease score?", a: "The Flesch Reading Ease score ranges from 0 to 100. Higher scores mean easier reading. Scores above 70 are easy for most adults, 60\u201370 is standard, 50\u201360 is fairly difficult, and below 50 requires college-level reading. The formula uses sentence length and syllables per word." },
    { q: "What is the Flesch-Kincaid Grade Level?", a: "The Flesch-Kincaid Grade Level estimates the US school grade needed to easily understand the text. A score of 8 means an 8th grader can read it easily. Most general-audience web content targets grades 7\u20139." },
    { q: "How can I improve my readability score?", a: "Use shorter sentences, choose common words over technical jargon, prefer active voice, and write shorter paragraphs. These changes reduce average syllables per word and average sentence length, which drives the Flesch scores." },
    { q: "Is my text uploaded anywhere?", a: "No. All analysis runs in your browser. Your text is never sent to a server. You can use the tool with private, confidential, or unpublished content safely." },
    { q: "What reading speed should I use for a blog reading time badge?", a: "Most blogs use 200\u2013250 wpm. Medium uses 275 wpm. The average estimate in this tool uses 238 wpm, which is a commonly cited adult reading speed for online content." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use Reading Time Calculator",
  description: "Paste any text to calculate estimated reading time, word count, Flesch readability score, grade level, and sentence stats. Free online tool.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function ReadingTimeCalculatorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ReadingTimeCalculatorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
