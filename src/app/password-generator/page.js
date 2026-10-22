import PasswordGeneratorTool from '@/components/PasswordGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: "Password Generator: Strong Random Passwords and PINs",
  description: "Generate strong random passwords, passphrases and PINs with the Web Crypto API. See a live entropy score and crack-time estimate. Free and runs in your browser.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  icons: { icon: '/icons/password-generator.svg', shortcut: '/icons/password-generator.svg' },
  alternates: { canonical: 'https://webdevpuneet.com/password-generator/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/password-generator/',
    siteName: 'webdevpuneet.com',
    locale: 'en_US',
    title: 'Password Generator — Secure Passwords, Passphrases & PINs',
    description: 'Cryptographically secure passwords with strength scoring and crack-time estimates.',
    images: [{ url: 'https://webdevpuneet.com/images/password-generator-compressed.png', width: 1200, height: 630, alt: 'Password Generator — Secure Passwords, Passphrases & PINs' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Password Generator — Secure & Random',
    description: 'Passwords, passphrases, PINs, and memorable passwords — all generated client-side with Web Crypto API.',
    images: ['https://webdevpuneet.com/images/password-generator-compressed.png'],
  },
};

const seoData = {
  slug: 'password-generator',
  title: 'Password Generator — Free Strong Random Passwords, Passphrases & PINs',

  about: {
    title: 'Generate a Strong, Random Password Instantly — Free, No Sign-Up',
    description: `You need a strong password right now. Not "Password123!", not your dog's name with an exclamation mark, not the same password you've used on five other sites. A genuinely random, hard-to-crack string that no one can guess. Click the button and you have one in a second.

This generator uses crypto.getRandomValues() — the Web Crypto API built into every modern browser, the same source of randomness used by password managers, TLS handshakes, and OS key generation. Every character is drawn from hardware entropy. Nothing is predictable, nothing is sent to a server, and your passwords never leave your browser tab.

**Four modes for four situations:**

**Password mode** builds a classic random string from your selected character sets — uppercase, lowercase, numbers, and symbols — at any length from 4 to 128 characters. Use at least 16 characters for any real account.

**Passphrase mode** picks random words from a 256-word list and joins them with a separator you choose. Four random words like "loyal-grave-swim-bear" are both high-entropy and human-memorable — the kind of password your brain can actually remember.

**PIN mode** generates a purely numeric code of 4 to 12 digits — for phone unlock codes, door locks, or any system that only accepts numbers.

**Memorable mode** alternates consonants and vowels to produce phonetically natural non-words like "Batoviru12" — easy to read aloud or type from memory, but not a real dictionary word.

Every password is scored live. The entropy meter shows exact Shannon entropy bits — how many guesses a brute-force attacker would need. The crack-time estimate assumes a GPU-class attacker at 10 billion guesses per second, the realistic worst case for an offline cracked hash. Seeing "millions of years" versus "3 seconds" makes the difference real.

No history is stored. No server is involved. Your passwords stay in your browser tab.`,
  },

  features: [
    'Web Crypto API (crypto.getRandomValues()) — true cryptographic randomness, zero Math.random()',
    '4 generation modes: Password (charset), Passphrase (256-word list), PIN (numeric), Memorable (CVCV phonetic)',
    'Live Shannon entropy meter — exact bit count updated on every keystroke',
    'Crack-time estimator — worst-case duration at 10 billion guesses/second (GPU attacker)',
    '5-level strength bar: Very Weak, Weak, Fair, Strong, Very Strong with color coding',
    'Bulk generation — 5, 10, 20, or 50 passwords at once with the same settings',
    'Session copy history — last 10 copied passwords available for instant re-use',
    'Exclude ambiguous characters (0/O, 1/l/I) to prevent hand-transcription errors',
    'Editable symbol set — remove or restrict symbols that specific sites disallow; pair with our [Regex Tester](https://fwdtools.com/regex-tester/) to verify a site\'s password rules',
    'Guaranteed character diversity — at least one char from each enabled type, always shuffled',
    'Passphrase options: word count (3–8), separators, capitalize words, append number or symbol',
    '100% client-side — no server, no network request, no account, no watermark; use our [Hash Generator](https://fwdtools.com/hash-generator/) to hash a password before storing it',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a generation mode', text: 'Select Password for a classic random string, Passphrase for random words, PIN for a numeric code, or Memorable for a pronounceable non-word. The mode appears in the left sidebar.' },
      { title: 'Set the length and character types', text: 'Drag the length slider (we recommend at least 16 for account passwords). Tick uppercase, lowercase, numbers, and symbols as needed. Enable "Exclude ambiguous" if you need to write it by hand to avoid confusion between 0 and O, or 1 and l.' },
      { title: 'Configure passphrase or PIN options (if applicable)', text: 'For Passphrase mode, set the word count (4+ words recommended), choose a separator, and optionally enable Capitalize Words and Append Number. For PIN mode, pick a length between 4 and 12.' },
      { title: 'Read the entropy and strength score', text: 'The entropy bit count and crack-time estimate update instantly. Aim for 80+ bits for standard accounts and 100+ bits for master passwords or encryption keys.' },
      { title: 'Copy the password', text: 'Click "Copy password" or tap the password text itself. The password is saved to the session history panel automatically.' },
      { title: 'Regenerate at any time', text: 'Hit the refresh icon at any time to generate a new password without touching your settings.' },
      { title: 'Bulk generate (optional)', text: 'Open the Bulk Generate section, choose a count (5, 10, 20, or 50), click Generate, then copy individually or use "Copy all" to paste the list into a spreadsheet or provisioning tool.' },
    ],
  },
  howToSteps: [
    { title: 'Choose a generation mode', text: 'Select Password for a classic random string, Passphrase for random words, PIN for a numeric code, or Memorable for a pronounceable non-word.' },
    { title: 'Set the length and character types', text: 'Drag the length slider (we recommend at least 16 for account passwords). Tick uppercase, lowercase, numbers, and symbols as needed. Enable "Exclude ambiguous" if you need to write it by hand.' },
    { title: 'Configure passphrase or PIN options (if applicable)', text: 'For Passphrase mode, set the word count (4+ words recommended), choose a separator, and optionally enable Capitalize Words and Append Number. For PIN mode, pick a length between 4 and 12.' },
    { title: 'Read the entropy and strength score', text: 'The entropy bit count and crack-time estimate update instantly. Aim for 80+ bits for standard accounts and 100+ bits for master passwords or encryption keys.' },
    { title: 'Copy the password', text: 'Click "Copy password" or tap the password text itself. The password is saved to the session history panel automatically.' },
    { title: 'Regenerate or adjust settings', text: 'Hit the refresh icon at any time to generate a new password without touching your settings.' },
    { title: 'Bulk generate (optional)', text: 'Open the Bulk Generate section, choose a count (5, 10, 20, or 50), click Generate, then copy individually or use "Copy all" to paste the list into a spreadsheet or provisioning tool.' },
  ],

  useCases: [
    { icon: '◉', title: 'Generate a strong password for a new account right now', desc: 'Password mode at 16–20 characters with all four character types — the entropy meter shows the exact bit strength so you know when you\'ve crossed the "Strong" threshold before saving to your password manager. Then use our [Base64 Encoder](https://fwdtools.com/base64-encoder-decoder/) if you need to encode credentials for HTTP Basic Auth headers.' },
    { icon: '▦', title: 'Create a passphrase you can actually memorize', desc: 'Passphrase mode with 5–6 capitalized words gives you a master password that is both memorizable and extremely hard to brute-force — "Loyal-Grave-Swim-Bear-Town" is over 160 bits of entropy, far stronger than most random passwords.' },
    { icon: '⬡', title: 'Get a truly random PIN for a phone, door, or safe', desc: 'PIN mode generates cryptographically random numeric codes so you stop using birthdays, anniversaries, or 1234. Pick 6 or 8 digits for extra security against shoulder surfing.' },
    { icon: '⚡', title: 'Generate an API secret, webhook token, or JWT signing key', desc: 'Use 64 characters with all character types for API secrets, database passwords, and signing keys where maximum entropy is non-negotiable. The entropy meter confirms the exact bit strength. Use our [JWT Decoder](https://fwdtools.com/jwt-decoder/) to inspect the token structure once signed.' },
    { icon: '⇄', title: 'Create temporary passwords for new users in bulk', desc: 'Use Bulk Generate to create 10–50 unique temporary passwords for new employees or students in one click. Hit "Copy all" and paste the list straight into your user provisioning tool or spreadsheet. Format your user data first with our [JSON Formatter](/json-formatter) if you\'re working with a JSON-based provisioning system.' },
    { icon: '△', title: 'Generate a readable password for a child or support call', desc: 'Memorable mode produces pronounceable non-words like "Rafitobu12" — easy for a child to type and easy to read aloud over the phone without confusion about O vs 0 or l vs 1.' },
  ],

  comparisonNote: `Built-in password generators in **1Password**, **LastPass**, **Bitwarden**, and **browsers** are all excellent — use them. But there are situations where a standalone tool is more useful: when evaluating password strength independently, when generating credentials for a system you haven't yet added to your password manager, when onboarding users in bulk, or when you simply need to verify that a password meets a site's exact policy before saving it.\n\nThis tool gives you the entropy bit count and crack-time estimate that most password managers don't surface. You can see exactly why a 12-character password is weaker than a 5-word passphrase, and make an informed choice rather than accepting a manager's default. It also generates multiple formats simultaneously — random string, passphrase, PIN, memorable — so you can pick the right format for the right context. After generating, consider using our [URL Encoder/Decoder](https://fwdtools.com/url-encoder-decoder/) if you need to pass the password safely in a URL parameter, or use our [QR Code Generator](/qr-code-generator) to share a temporary password without copy-paste errors.`,

  faqs: [
    {
      q: 'Is it safe to generate a password in a browser? Could someone intercept it?',
      a: 'Yes, safe — and no interception is possible. The generator uses crypto.getRandomValues(), the cryptographically secure random number generator built into every modern browser, using hardware entropy. No password is ever transmitted to any server — everything runs locally in your browser tab. No network request is made at all during generation. When you close the tab, the password is gone.',
    },
    {
      q: 'How long should my password be?',
      a: 'For standard online accounts: 14–20 characters with mixed character types (uppercase, lowercase, numbers, symbols) gives you 90–100+ bits of entropy — extremely strong against any attack. For offline secrets like a password manager master key or disk encryption passphrase: aim for 20+ characters or a 5+ word passphrase (100+ bits). The entropy meter updates live so you see the exact strength before copying.',
    },
    {
      q: 'What is a passphrase and is it more secure than a random password?',
      a: 'A passphrase is several random words joined by a separator — for example "loyal-grave-swim-bear". With 4 words from a 256-word list, you get roughly 32 bits of entropy per word — over 128 bits total — which is stronger than most 12–16 character passwords. The advantage is memorability: random words stick in human memory far better than a string of random characters. Passphrases are the recommended format for master passwords you need to memorize.',
    },
    {
      q: 'My new account requires uppercase, lowercase, a number, and a symbol — will this meet it?',
      a: 'Yes. When you enable multiple character types, the "Guaranteed character diversity" algorithm ensures the final password always contains at least one character from each enabled type before filling the rest randomly. You will never accidentally get a password that has no numbers or no symbols, even for long passwords where a particular type might theoretically not appear by random chance.',
    },
    {
      q: 'What is password entropy and why does the meter show it in bits?',
      a: 'Entropy in bits measures how many guesses an attacker needs to crack the password. Every additional bit doubles the search space — 40 bits means about a trillion guesses; 70 bits means a sextillion. The bit count is the most accurate way to compare password strength because it accounts for both length and character set size. The crack-time estimate converts the bit count to a human-readable duration at 10 billion guesses per second — a realistic GPU-class offline attacker scenario.',
    },
    {
      q: 'How do I generate a password for a site that bans certain symbols?',
      a: 'Edit the symbol set field directly — remove any characters the site bans. Many sites block @, #, %, or other special characters. You can also disable symbols entirely and use a longer password with just letters and numbers to compensate for the smaller character set. The entropy meter updates live as you edit, so you can see the effect on strength immediately.',
    },
    {
      q: 'What does "Exclude ambiguous characters" do?',
      a: 'It removes characters that look visually similar in many fonts: 0 and O (zero and capital O), and 1, l, and I (one, lowercase L, capital I). Enable this when you need to write the password on paper, read it aloud, or type it on a device without copy-paste. The reduction in character set size has negligible effect on entropy at 16+ character lengths.',
    },
    {
      q: 'Is my generated password history stored or logged?',
      a: 'No. Copy history is kept only in browser memory for the current tab session — never written to localStorage, sessionStorage, cookies, IndexedDB, or sent to any server. When you close or refresh the tab, it\'s permanently gone. A password tool should never persist sensitive data.',
    },
    {
      q: 'Can I generate passwords in bulk for new user accounts?',
      a: 'Yes. Open the Bulk Generate section, choose a count (5, 10, 20, or 50 passwords), and click Generate. All passwords use your current settings. Use "Copy all" to paste the entire list into a spreadsheet, user provisioning tool, or CSV for batch account creation.',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Secure Password',
  description: 'Use the free browser-based password generator to create cryptographically secure passwords, passphrases, PINs, and memorable passwords.',
  step: seoData.howToSteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
};

// Build sections using structured data (overrides legacy flat props)
seoData.sections = [
  {
    type: '2col',
    left:  { type: 'text',     label: 'About this tool', heading: seoData.about.title, text: seoData.about.description },
    right: { type: 'features', heading: 'Features', items: seoData.features },
  },
  {
    type: 'steps',
    heading: 'How to Use',
    items: seoData.howToSteps,
  },
  { type: 'cards', heading: 'Common Use Cases', columns: 3, items: seoData.useCases },
  {
    type: 'callout',
    variant: 'info',
    heading: 'vs 1Password / LastPass / Bitwarden Built-in Generators',
    text: seoData.comparisonNote,
  },
  { type: 'faq', heading: 'Frequently Asked Questions', items: seoData.faqs },
];

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Password Generator',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based password generator using Web Crypto API. Supports password, passphrase, PIN, and memorable modes with live entropy scoring and crack-time estimates.',
  featureList: seoData.features,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Password Generator', item: 'https://webdevpuneet.com/password-generator/' },
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

export default function PasswordGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className={styles.toolSection}><PasswordGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
