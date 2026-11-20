import TokenCounterTool from '@/components/TokenCounterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/token-counter.png';
const URL = 'https://webdevpuneet.com/token-counter/';

const howToSteps = [
  { title: 'Paste your prompt or text', text: 'Paste the system prompt, the question and any documents or code you plan to send, or use Open file to load a text, Markdown, JSON or code file. The counter updates as you type and nothing leaves your browser.' },
  { title: 'Read the token estimate', text: 'The pills under the box show characters, words, lines and an estimated token count in two styles: GPT-style and Claude-style. Claude-style runs a little higher for the same English text, so the two numbers are not identical.' },
  { title: 'Set the reply length', text: 'Output tokens usually cost several times more than input tokens, so enter how long you expect the answer to be. A short answer is around 200 tokens, a page of writing around 700, and a long code file can pass 3,000.' },
  { title: 'Choose how many calls', text: 'Set the number of times the same prompt will run, or tap 100, 1k, 10k or 100k. The table shows the cost of one call and the total for all of them, with the cheapest listed model marked.' },
  { title: 'Check the context window', text: 'Each row shows how much of that model\'s context window the input uses and whether input plus reply fits. If a row says too long, trim the text or pick a model with a larger window.' },
  { title: 'Edit the prices if they have changed', text: 'Every rate and context size in the table is an editable field, and the last row is a model you can name yourself. Prices change often, so check the provider\'s pricing page and type in the current numbers.' },
  { title: 'Copy the summary', text: 'Copy summary puts the estimate and the per-call cost for every model on your clipboard, ready to paste into a ticket, a budget note or a chat with your team.' },
];

export const metadata = {
  title: 'Token Counter and AI Cost Calculator for Claude and GPT',
  description: 'Paste a prompt to estimate its tokens and API cost for Claude, GPT and your own model, and see how much of the context window it uses. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  icons: { icon: '/icons/token-counter.svg', shortcut: '/icons/token-counter.svg' },
  openGraph: {
    type: 'website', url: URL, siteName: 'webdevpuneet.com',
    title: 'Token Counter and AI Cost Calculator',
    description: 'Estimate tokens and API cost for Claude, GPT and your own model, and check the context window. Free, in your browser.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Token Counter and AI Cost Calculator by webdevpuneet.com' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image', site: '@webdevpuneet',
    title: 'Token Counter and AI Cost Calculator',
    description: 'Estimate tokens and API cost for Claude, GPT and your own model. Free, in your browser.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  { q: 'How many tokens is my text?', a: 'Paste it into the box and the estimate appears straight away. As a rough guide, one token is about four characters or three quarters of a word in English, so 1,000 words is close to 1,300 tokens. Code, numbers and non-English text usually use more tokens per character, which is why pasting the real text beats guessing from the word count.' },
  { q: 'Is the token count exact?', a: 'No, it is an estimate. The counter walks through your text the way a byte-pair tokenizer tends to split it, but it does not download or run the providers\' own tokenizers, so expect it to land within roughly 10 to 15 percent for ordinary English. Before a large or expensive job, use the provider\'s own token-count endpoint to get the exact figure.' },
  { q: 'Why do Claude and GPT show different numbers?', a: 'Each model family uses its own tokenizer, so the same sentence is cut into different numbers of pieces. The Claude-style estimate here is scaled up a little from the GPT-style one because Claude tokenizers tend to produce somewhat more tokens for the same English text. The gap varies with the content, so treat the difference as a guide, not a rule.' },
  { q: 'How is the cost worked out?', a: 'Cost per call is input tokens times the input price plus output tokens times the output price, with both prices given per one million tokens. The total is that figure multiplied by your number of calls. Output tokens are priced higher than input tokens on most models, which is why the reply length setting matters.' },
  { q: 'Are the prices on this page up to date?', a: 'The defaults were reviewed on 2026-11-20 against the providers\' pricing pages and press coverage, but API prices change often and some models charge more above a long-prompt threshold. Every rate in the table is editable, so check the provider\'s pricing page and type in the numbers that apply to you. The Reset rates button restores the defaults.' },
  { q: 'What is a context window?', a: 'It is the most text a model can take in and answer in a single request, counted in tokens. Your input and the reply have to fit together. The table shows how much of each model\'s window your input uses and flags rows where input plus the expected reply would not fit.' },
  { q: 'Does it include cached input, batch pricing or images?', a: 'No. The table uses the plain standard rate for text input and output. Cached input, batch jobs, images, audio and tool calls are priced differently, and usually lower for cached and batch work. If you use them, change the rate fields to your effective price.' },
  { q: 'Is my text sent anywhere?', a: 'No. The counting runs entirely in your browser, and the text is not uploaded or stored. You can paste private prompts or internal documents without them leaving your computer.' },
  { q: 'How can I cut my token count and cost?', a: 'Remove repeated instructions, drop boilerplate such as long signatures and legal footers, send only the relevant part of a document, and ask for a shorter reply format such as a list or JSON with fixed fields. Prompt caching helps when the same long prefix is reused, and a smaller model is often enough for simple tasks.' },
  { q: 'Can I add a model that is not listed?', a: 'Yes. The last row is your own model: rename it, then set its input price, output price and context window. It uses the GPT-style estimate, which is a reasonable default for most other model families.' },
];

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const softwareSchema = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'Token Counter and AI Cost Calculator', applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)', browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Estimate the tokens in a prompt and the API cost for Claude, GPT and a custom model, and check how much of the context window it uses.',
  url: URL,
  featureList: ['Estimate tokens for GPT-style and Claude-style tokenizers', 'Cost per call and total cost for any number of calls', 'Context window check for every model', 'Editable prices and context sizes', 'Add your own model', 'Open a text or code file', 'Copy a summary', 'Runs in the browser, nothing uploaded'],
};

function stripInlineMarkdown(text) { return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, ''); }

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to estimate the tokens and cost of an AI prompt',
  description: 'Paste a prompt, set the reply length and number of calls, and read the estimated tokens, cost and context window use for each model.',
  totalTime: 'PT2M',
  step: howToSteps.map((step, i) => ({ '@type': 'HowToStep', position: i + 1, name: step.title, text: stripInlineMarkdown(step.text) })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Token Counter and AI Cost Calculator', item: URL },
  ],
};

const SEO = {
  slug: 'token-counter',
  title: 'Token Counter and AI Cost Calculator',
  about: {
    title: 'Know What a Prompt Will Cost Before You Send It',
    description: `AI APIs charge by the token, and the context window is counted in tokens too, but a prompt is written in words. That gap is where surprise bills and "input too long" errors come from. This counter turns your text into an estimated token count, then shows what the call would cost on Claude, GPT and a model of your own, and how much of each context window it fills.\n\nPaste a system prompt, a document or a chunk of code, set the reply length you expect and the number of times you will run it, and the table does the arithmetic: cost per call, total cost, the cheapest listed model, and whether input plus reply fits. It is useful for budgeting an app that calls a model thousands of times, for deciding whether a long document needs to be split, and for comparing a small model against a large one before you commit.\n\nThe counts are estimates. The tool splits your text the way a byte-pair tokenizer tends to, with short words as one token, longer words split into pieces, digits grouped in threes, one token per punctuation mark, and heavier counts for code-like symbols, emoji and non-Latin scripts. It lands within roughly 10 to 15 percent for ordinary English, which is close enough to plan with. Use the provider's own token-count endpoint when you need the exact number.\n\nPrices move quickly, so every rate and context size is a field you can edit, and the defaults were reviewed on 2026-11-20. Everything runs in your browser and your text is never uploaded. If you are writing the prompt itself, [AI Prompt Studio](/ai-prompt-studio/) helps you structure it, and [Word Counter](/word-counter/), [Markdown Editor](/markdown-editor/) and [Diff Checker](/diff-checker/) are handy for tidying and comparing the text first.`,
  },
  features: [
    '**Token estimate as you type** - GPT-style and Claude-style counts side by side',
    '**Cost per call and in total** - input and output priced separately, for any number of calls',
    '**Context window check** - see the share of each window used and whether input plus reply fits',
    '**Cheapest model marked** - spot the lowest-cost listed model for your prompt at a glance',
    '**Editable prices and sizes** - type in the current rates from the provider\'s pricing page',
    '**Your own model row** - name a model and set its rates and window',
    '**Open a file** - load a text, Markdown, JSON, CSV, HTML or code file up to 4 MB',
    '**Quick call presets** - 1, 100, 1k, 10k and 100k calls in one tap',
    '**Copy summary** - paste the estimate into a ticket, budget note or chat',
    '**Private** - runs in your browser and nothing is uploaded or stored',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'MONEY', title: 'Budget an app before you build it', desc: 'Paste a typical request, set the expected reply, and enter a month of traffic as the number of calls. The total shows roughly what the model will cost, and the per-call figure shows how much a longer prompt would add.' },
    { icon: 'CHART', title: 'Compare a small and a large model', desc: 'The same prompt can cost ten or twenty times more on a flagship model than on a small one. See both numbers side by side and decide whether the quality gain is worth it for the task.' },
    { icon: 'DOC', title: 'Check whether a document fits', desc: 'Paste a contract, transcript or log and see how much of each context window it takes. If it does not fit with room for the reply, you know to split it or summarise it first.' },
    { icon: 'CODE', title: 'Trim a bloated system prompt', desc: 'Long instruction blocks are paid for on every call. Edit the prompt in the box and watch the token count and the per-call cost fall as you cut repeated or unnecessary lines.' },
    { icon: 'WRITE', title: 'Plan a batch job', desc: 'Summarising 5,000 support tickets or classifying a spreadsheet of products multiplies a small cost by a large number. Enter the call count first and you will not be surprised by the invoice.' },
    { icon: 'COPY', title: 'Share a cost estimate with your team', desc: 'Copy summary writes the token estimate and the cost on each model as plain text, so a manager or client can see the numbers without opening the tool.' },
  ],
  faqs,
};

export default function TokenCounterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><TokenCounterTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
