import UuidGeneratorTool from '@/components/UuidGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'UUID Generator Online Free — UUID v4, v7, v1, ULID & NanoID | webdevpuneet.com',
  description: 'Generate UUID v4, v7, v1, ULID, and NanoID online free. Bulk generation up to 1000 IDs. Uppercase, no-hyphens, custom alphabet. No install, no sign-up, 100% browser.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/uuid-generator/' },
  icons: { icon: '/icons/uuid-generator.svg', shortcut: '/icons/uuid-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/uuid-generator/',
    siteName: 'webdevpuneet.com',
    title: 'UUID Generator — UUID v4, v7, v1, ULID & NanoID Online Free',
    description: 'Generate UUID v4, v7, v1, ULID, and NanoID instantly. Bulk up to 1000, uppercase, no-hyphens, custom NanoID alphabet. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/uuid-generator.png', width: 1200, height: 800, alt: 'UUID Generator Online Free' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'UUID Generator — v4, v7, v1, ULID, NanoID — Free Online',
    description: 'Bulk-generate UUIDs, ULIDs, and NanoIDs in the browser. Up to 1000 at once. Copy, download. No install.',
    images: ['https://webdevpuneet.com/images/uuid-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a UUID?',
      acceptedAnswer: { '@type': 'Answer', text: 'UUID (Universally Unique Identifier) is a 128-bit identifier standardized as RFC 4122 and now RFC 9562. It is represented as 32 hexadecimal characters in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. UUIDs are designed to be globally unique — you can generate them independently on any machine without a central registry and the chance of two UUIDs colliding is astronomically small (about 1 in 5.3×10³⁶ for UUID v4). They are widely used as primary keys in databases, session tokens, correlation IDs in logs, and identifiers in distributed systems.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between UUID v4 and UUID v7?',
      acceptedAnswer: { '@type': 'Answer', text: 'UUID v4 is entirely random — 122 bits of random data with 6 bits reserved for version and variant. It is the most widely used UUID type and the default recommended for most use cases. UUID v7 is time-ordered — the first 48 bits contain the Unix millisecond timestamp, followed by 74 bits of randomness. Because v7 UUIDs sort chronologically by default, they perform significantly better as database primary keys: they create less index fragmentation than v4 UUIDs because new records are always inserted at the end of the B-tree index. Use v7 when you need chronological ordering and want better database write performance.' },
    },
    {
      '@type': 'Question',
      name: 'What is UUID v1?',
      acceptedAnswer: { '@type': 'Answer', text: 'UUID v1 is a time-based UUID defined in the original RFC 4122. It encodes a 60-bit timestamp (in 100-nanosecond intervals since October 15, 1582), a 14-bit clock sequence, and a 48-bit node identifier (originally the MAC address of the machine). Because it embeds the MAC address, v1 UUIDs can expose the generating machine\'s identity — this is a privacy concern that led to the adoption of v4 (random). Modern v1 implementations, including this tool, replace the MAC address with random bytes. UUID v7 supersedes v1 for most time-based use cases because v7 is sortable in standard byte order.' },
    },
    {
      '@type': 'Question',
      name: 'What is a ULID and how is it different from UUID?',
      acceptedAnswer: { '@type': 'Answer', text: 'ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier designed as an alternative to UUID with two key advantages: it is lexicographically sortable and it is encoded in Crockford\'s Base32, producing 26 compact characters instead of the 36-character UUID with hyphens. A ULID consists of a 48-bit millisecond timestamp (10 Base32 characters) followed by 80 bits of randomness (16 Base32 characters). Because ULIDs sort by creation time, they are excellent as database primary keys. They also have no hyphens, making them URL-safe and shorter to display.' },
    },
    {
      '@type': 'Question',
      name: 'What is NanoID and when should I use it?',
      acceptedAnswer: { '@type': 'Answer', text: 'NanoID is a small, URL-safe, unique string ID generator. The default produces 21-character IDs from an alphabet of 64 URL-safe characters (A-Z, a-z, 0-9, -, _), giving 126 bits of randomness — comparable to UUID v4. NanoID\'s advantages are: shorter output (21 vs 36 characters), no hyphens (URL-safe by default), customizable alphabet and length, and a smaller library footprint. Use NanoID when you need short, URL-embeddable IDs in public-facing contexts (URL slugs, share tokens, public API keys), where UUID\'s fixed 36-character format is too long or contains characters you want to avoid.' },
    },
    {
      '@type': 'Question',
      name: 'Is UUID v4 truly unique? Can two UUIDs ever collide?',
      acceptedAnswer: { '@type': 'Answer', text: 'UUID v4 uses 122 bits of cryptographically random data, giving 2¹²² possible values (about 5.3 × 10³⁶). To have a 50% chance of a single collision, you would need to generate approximately 2.7 × 10¹⁸ UUIDs — far more than any practical system generates in its lifetime. In practice, UUID v4 collisions are so improbable that they are treated as impossible for all real-world applications. All generation in this tool uses the browser\'s cryptographic random number generator (crypto.getRandomValues), which produces high-quality entropy.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use UUID as a database primary key?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, but the choice of version matters for performance. UUID v4 as a primary key works correctly but causes index fragmentation in B-tree indexes (like those used by PostgreSQL, MySQL, and SQL Server) because random UUIDs insert at random positions in the index rather than always at the end. This causes page splits and write amplification at scale. UUID v7 or ULID solve this: because they are time-ordered, new records always insert at the "right end" of the index, behaving like auto-increment integers while still being globally unique and generatable without a database sequence.' },
    },
    {
      '@type': 'Question',
      name: 'What does "no hyphens" do for UUIDs?',
      acceptedAnswer: { '@type': 'Answer', text: 'The standard UUID format includes four hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 characters). The "no hyphens" option removes them, producing a 32-character hexadecimal string. This compact form is often used in URLs, filenames, and database columns where the hyphens add length without adding information. Both representations encode the same 128-bit value — they are interchangeable and can be parsed back to full UUID format by inserting hyphens at positions 8, 12, 16, and 20.' },
    },
    {
      '@type': 'Question',
      name: 'How many UUIDs can I generate at once?',
      acceptedAnswer: { '@type': 'Answer', text: 'This tool supports generating up to 1000 IDs in one click. Use the quick-count buttons (1, 5, 10, 50, 100) or type a custom number. All IDs are generated entirely in your browser using the Web Crypto API — no server requests are made, so generation is instant even for large batches. Click "Copy All" to copy the entire list to your clipboard as newline-separated values, or "Download" to save them as a .txt file.' },
    },
    {
      '@type': 'Question',
      name: 'Are generated IDs sent to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. All generation happens entirely in your browser using the Web Crypto API (crypto.randomUUID and crypto.getRandomValues). No IDs are sent to any server, logged, or stored anywhere. The tool works offline once the page has loaded. This is important for security tokens and sensitive identifiers — your generated IDs are never exposed to a third party.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID / ULID / NanoID Generator',
  url: 'https://webdevpuneet.com/uuid-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online generator for UUID v4, v7, v1, ULID, and NanoID. Bulk generation up to 1000 IDs, uppercase and no-hyphens options, custom NanoID alphabet. 100% browser-based.',
  featureList: [
    'UUID v4 — 122-bit random using Web Crypto API',
    'UUID v7 — time-ordered, sortable, RFC 9562 compliant',
    'UUID v1 — timestamp-based with random node ID',
    'ULID — 26-char Crockford Base32, lexicographically sortable',
    'NanoID — configurable alphabet and length, URL-safe by default',
    'Bulk generation: 1 to 1000 IDs per click',
    'Quick count buttons: 1, 5, 10, 50, 100',
    'Uppercase / lowercase toggle for UUIDs and ULIDs',
    'No-hyphens mode for compact UUID strings',
    'NanoID alphabet presets: URL-safe, alphanumeric, hex, numbers, custom',
    'Click any ID to copy individually',
    'Copy All to clipboard as newline-separated list',
    'Download as .txt file',
    '100% client-side — no server, no sign-up, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'UUID / ULID / NanoID Generator', item: 'https://webdevpuneet.com/uuid-generator/' },
  ],
};

const SEO = {
  slug: 'uuid-generator',
  title: 'UUID Generator Online Free — UUID v4, v7, v1, ULID & NanoID',

  about: {
    title: 'Generate UUIDs, ULIDs, and NanoIDs Instantly — No Install, No Sign-Up',
    description: `You need a unique ID. Maybe it's a primary key for a new database record, a correlation ID to thread through distributed service logs, a session token, or a share link slug. The format you choose matters — UUID v4 is the universal default, UUID v7 sorts cleanly in indexes, ULID packs the same uniqueness in a more readable format, and NanoID gives you short, URL-embeddable strings you can tune to any alphabet.\n\nThis tool covers all four. Pick the format from the tab bar, set a count, and click Generate. Each type uses the browser's **Web Crypto API** — specifically \`crypto.randomUUID()\` for UUID v4 and \`crypto.getRandomValues()\` for everything else. No server is involved and nothing is ever logged or stored.\n\n**UUID v4** is random — 122 bits of cryptographic entropy. The probability of two v4 UUIDs ever colliding is so small (1 in 5.3 × 10³⁶) that for any real-world system it is treated as zero. It is the right default for session tokens, file identifiers, and any context where you just need something globally unique.\n\n**UUID v7** trades some randomness for time-ordering. The first 48 bits are the Unix millisecond timestamp, making v7 UUIDs sort chronologically in standard byte order. This makes them significantly better as database primary keys than v4 — new records always insert at the end of the B-tree index rather than at a random position, eliminating the write amplification and page splits that UUID v4 causes at scale.\n\n**ULID** goes a step further: it's 128 bits encoded in 26 Crockford Base32 characters (vs 36 for UUID with hyphens), lexicographically sortable, and has no hyphens — making it URL-safe out of the box. The 26-char format is easier to read, easier to copy, and still embeds a full millisecond timestamp in the first 10 characters.\n\n**NanoID** is for when you need short IDs in public-facing contexts. The default 21-character output from a 64-character alphabet gives 126 bits of randomness — comparable to UUID v4 — but the string is shorter, URL-safe, and the alphabet is fully customizable. Use hex for log trace IDs, numbers-only for customer-facing order codes, or the default URL-safe alphabet for share links.`,
  },

  features: [
    '**UUID v4** — 122-bit random UUID using `crypto.randomUUID()`, the most widely supported and used format; generates at full cryptographic quality',
    '**UUID v7** — time-ordered UUID (RFC 9562); first 48 bits are Unix ms timestamp, remaining 74 bits random; sorts chronologically and avoids B-tree index fragmentation as a [SQL](/sql-formatter)-friendly primary key',
    '**UUID v1** — timestamp-based UUID with random node ID (MAC address replaced with random bytes for privacy); 60-bit timestamp in 100-ns intervals since 1582',
    '**ULID** — 26-char Crockford Base32; 48-bit timestamp prefix + 80-bit random; lexicographically sortable, URL-safe, no hyphens; pairs well with [hash-based auth tokens](https://fwdtools.com/hash-generator/)',
    '**NanoID** — configurable alphabet and length; 6 built-in presets (URL-safe, alphanumeric, lowercase+digits, uppercase+digits, hex, numbers); custom alphabet input for fully bespoke IDs',
    'Bulk generation: 1 to 1000 IDs in one click with quick-count buttons (1 / 5 / 10 / 50 / 100) and a free-entry count input',
    'Uppercase / lowercase toggle for UUIDs and ULIDs — some databases and logging systems normalise to uppercase; match your system\'s convention',
    'No-hyphens mode for UUIDs — strips the 4 hyphens from the standard format, producing a compact 32-character hex string for use in URLs, filenames, or columns with character limits',
    'Click any ID to copy it individually — copy button appears on hover; confirmation tick fades after 1.5 s',
    'Copy All — copies the full list to clipboard as newline-separated values; paste directly into a spreadsheet, migration script, or seed file',
    'Download as `.txt` — saves the list to disk; use with the [Diff Checker](/diff-checker) to compare two batches or verify deduplication',
    '100% client-side via Web Crypto API — no server, no logging, no network requests; safe for sensitive tokens and private identifiers',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Select the ID format',
        text: 'Click the type tab at the top of the tool: **UUID v4** (fully random, most widely used), **UUID v7** (time-ordered, great for database primary keys), **UUID v1** (timestamp-based with random node), **ULID** (26-char Crockford Base32, lexicographically sortable), or **NanoID** (short, URL-safe, configurable alphabet and length). Each format is explained in the badge under its label.',
      },
      {
        title: 'Set the count and format options',
        text: 'Use the quick-count buttons (1, 5, 10, 50, 100) or type any custom number up to 1000 in the count input. For UUID v4/v7/v1, toggle **Uppercase** to get hex chars in uppercase, or **No hyphens** to produce a compact 32-character string. For ULID, toggle **Lowercase** if your system normalises identifiers. For NanoID, set the **Length** (1–255) and choose an **Alphabet** preset or type a custom alphabet.',
      },
      {
        title: 'Click Generate',
        text: 'Click the **Generate** button and the full list of IDs appears instantly. All generation happens in your browser using `crypto.randomUUID()` and `crypto.getRandomValues()` — no server requests are made and nothing is logged or stored. Regenerate as many times as needed.',
      },
      {
        title: 'Copy individual IDs or the full list',
        text: 'Click any ID row in the list and a **Copy** button appears — click it to copy that single ID. Click **Copy All** in the footer to copy the entire list as newline-separated text, ready to paste into a SQL `INSERT` statement, a seed file, a spreadsheet, or a fixture JSON file.',
      },
      {
        title: 'Download as a text file',
        text: 'Click **Download** in the footer to save the generated list as a `.txt` file named after the ID type (`v4-ids.txt`, `ulid-ids.txt`, etc.). The file contains one ID per line, ready to load into migration scripts, database seed tools, or test data generators. Click **Clear** to discard the current list and start fresh.',
      },
    ],
  },

  useCases: [
    {
      icon: '🗄️',
      title: 'Generate primary keys for database records',
      desc: 'Generate UUID v7 or ULID primary keys before inserting records — no database sequence needed. Time-ordered IDs avoid B-tree index fragmentation and perform like auto-increment integers while remaining globally unique across shards. Format them with the [JSON Formatter](/json-formatter) if building seed data.',
    },
    {
      icon: '🔗',
      title: 'Create short, URL-safe share tokens and slugs',
      desc: 'Use NanoID with the default URL-safe alphabet and a length of 10–14 characters for shareable links, invite codes, and download tokens. Short enough to include in a URL, random enough for security. For longer tokens or API keys, UUID v4 with no-hyphens gives a compact 32-character hex string.',
    },
    {
      icon: '📡',
      title: 'Add correlation IDs to distributed service logs',
      desc: 'Generate a UUID v4 or v7 correlation ID at the entry point of each request and thread it through all downstream service calls via headers. UUID v7\'s time prefix lets you sort log lines by generation time without parsing timestamps. Use the [API Request Generator & Tester](/api-request-generator-tester) to test endpoints with correlation IDs in headers.',
    },
    {
      icon: '🧪',
      title: 'Seed test databases and fixtures',
      desc: 'Generate 50 or 100 UUIDs and paste them into database seed scripts, factory definitions, or JSON fixture files. Stable, predictable test IDs make fixtures reproducible. Use the [JSON to TypeScript](/json-to-typescript) tool to type fixture objects that reference the IDs.',
    },
    {
      icon: '🔐',
      title: 'Generate session tokens and one-time codes',
      desc: 'UUID v4 IDs generated with `crypto.randomUUID()` are cryptographically random and suitable for session identifiers, CSRF tokens, email verification links, and password reset codes. For shorter codes, NanoID with a numbers-only alphabet of length 8–10 produces human-readable one-time codes.',
    },
    {
      icon: '📦',
      title: 'Name unique files, objects, and assets',
      desc: 'Use UUID v4 with no-hyphens or NanoID to generate unique filenames for uploaded assets in S3, Cloudflare R2, or a local store. The no-hyphens option keeps filenames clean; lowercase mode avoids filesystem case-sensitivity issues on Windows and macOS.',
    },
  ],

  faqs: [
    {
      q: 'What is the difference between UUID v4 and UUID v7?',
      a: 'UUID v4 is fully random — 122 bits of crypto entropy. UUID v7 embeds a 48-bit millisecond timestamp in the first bytes, making v7 UUIDs sort chronologically. For database primary keys, v7 is better: it prevents B-tree index fragmentation because new records always insert at the "right end" of the index, not at random positions.',
    },
    {
      q: 'What is a ULID and why is it better than UUID for databases?',
      a: 'ULID is a 26-char Crockford Base32 identifier with a 48-bit timestamp prefix and 80-bit random suffix. It sorts lexicographically by creation time (like UUID v7), but the encoded string is shorter (26 vs 36 chars), has no hyphens, and is URL-safe by default.',
    },
    {
      q: 'When should I use NanoID instead of UUID?',
      a: 'Use NanoID when you need short, URL-embeddable IDs — share links, invite codes, public slugs. The default 21-char NanoID has 126 bits of randomness (comparable to UUID v4) but is shorter and fully configurable. Use UUID when you need a standard format that other systems (databases, SDKs) recognise.',
    },
    {
      q: 'Is UUID v4 unique enough? Can two ever collide?',
      a: 'In practice, UUID v4 collisions are impossible. With 122 bits of randomness (2¹²² ≈ 5.3 × 10³⁶ possibilities), you would need to generate 2.7 × 10¹⁸ UUIDs for even a 50% chance of a single collision — far beyond any real-world system.',
    },
    {
      q: 'What does "no hyphens" mode do?',
      a: 'It removes the four hyphens from the standard UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx), producing a compact 32-character hex string. Both forms encode the same value — you can add hyphens back at positions 8, 12, 16, and 20.',
    },
    {
      q: 'What is UUID v1 and why was it deprecated?',
      a: 'UUID v1 embeds a 60-bit timestamp and a 48-bit node ID (originally the MAC address). The MAC address exposure was a privacy concern. UUID v7 supersedes v1 for time-based use cases — v7 is sortable in standard byte order and uses random bytes instead of the MAC address.',
    },
    {
      q: 'Can I use UUIDs as database primary keys?',
      a: 'Yes, but choose v7 or ULID over v4 for performance. UUID v4 causes B-tree index fragmentation at scale because random IDs insert at random positions. UUID v7 and ULID are time-ordered, so new rows always append to the end of the index — similar to auto-increment IDs.',
    },
    {
      q: 'What alphabet should I use for NanoID?',
      a: 'The default URL-safe alphabet (A–Z, a–z, 0–9, -, _) is the best general-purpose choice — 64 chars, 6 bits per character, URL-safe. Use hex (0–9, a–f) for trace IDs in logs. Use numbers-only for human-readable codes. Use alphanumeric if you want to avoid hyphens and underscores.',
    },
    {
      q: 'Are generated IDs sent to a server?',
      a: 'No. All generation uses the browser\'s Web Crypto API (`crypto.randomUUID` and `crypto.getRandomValues`). Nothing leaves your browser — no IDs are logged, stored, or transmitted. Safe to use for session tokens and private identifiers.',
    },
    {
      q: 'What is the difference between UUID and GUID?',
      a: 'GUID (Globally Unique Identifier) is Microsoft\'s name for UUID. They are the same 128-bit identifier format defined in RFC 4122. GUIDs generated by Windows and .NET are typically UUID v4. The terms are interchangeable — the standard is UUID, but GUID is widely used in Windows, .NET, SQL Server, and COM contexts.',
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><UuidGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
