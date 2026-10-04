import JsonToTypeScriptTool from '@/components/JsonToTypeScriptTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'JSON to TypeScript Interface Generator Free | webdevpuneet.com',
  description: 'Convert JSON to TypeScript interfaces or type aliases instantly — handles nested objects, arrays, optional fields, and null safety. Free, browser-only.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/json-to-typescript/' },
  icons: { icon: '/icons/json-to-typescript.svg', shortcut: '/icons/json-to-typescript.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/json-to-typescript/',
    siteName: 'webdevpuneet.com',
    title: 'JSON to TypeScript Interface Generator — Free Online Converter',
    description: 'Paste JSON and get TypeScript interfaces instantly. Nested objects, arrays, null handling, export keyword, optional fields, interface vs type alias. No install, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/json-to-typescript.png', width: 1200, height: 800, alt: 'JSON to TypeScript Interface Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'JSON to TypeScript Interface Generator — Free, Instant, Browser-Based',
    description: 'Paste JSON, get TypeScript interfaces. Nested objects, arrays, nulls, optional fields, export toggle. No install.',
    images: ['https://webdevpuneet.com/images/json-to-typescript.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert JSON to TypeScript interfaces?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON into the input panel on the left. The tool instantly generates TypeScript interface declarations in the right panel. Each nested object in the JSON becomes its own interface, and the property types (string, number, boolean, null) are inferred automatically from the JSON values. Click Copy to copy the output or Download .ts to save the file.' },
    },
    {
      '@type': 'Question',
      name: 'What TypeScript types does this tool infer from JSON?',
      acceptedAnswer: { '@type': 'Answer', text: 'JSON strings map to string, numbers map to number (TypeScript does not distinguish integers from floats), booleans map to boolean, null maps to null (or unknown or any, depending on the "null as" setting), arrays of a single type map to T[] or Array<T>, arrays of mixed types produce union types like (string | number)[], and nested objects produce separate named interfaces.' },
    },
    {
      '@type': 'Question',
      name: 'How does the tool handle arrays of objects?',
      acceptedAnswer: { '@type': 'Answer', text: 'When an array contains objects (like a list of users or posts), the tool merges all object items together to create one interface covering every key that appears across all items in the array. The interface name is derived from the array key — for example, a "users" array produces a User interface, and "categories" produces a Category interface. The property type for the array then becomes User[] or Category[].' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between interface and type alias in TypeScript?',
      acceptedAnswer: { '@type': 'Answer', text: 'Both interface and type can describe the shape of an object in TypeScript and are largely interchangeable for this purpose. Interfaces are open (can be extended with declaration merging) and are preferred when describing class contracts or library types. Type aliases are closed by default but more flexible — they can describe union types, intersection types, mapped types, and conditional types, which interfaces cannot. For plain object shapes generated from JSON, both work identically. Choose interface for extensibility or type for a more explicit closed contract.' },
    },
    {
      '@type': 'Question',
      name: 'What does the "optional" toggle do?',
      acceptedAnswer: { '@type': 'Answer', text: 'When optional is enabled, every property gets a ? suffix, making all fields optional (key?: type instead of key: type). This is useful when you are describing an API response where some fields might be absent or when you want to use the interface for a partial update type. When disabled (the default), all fields are required — which accurately represents what your JSON actually contains.' },
    },
    {
      '@type': 'Question',
      name: 'How does "null as" affect the generated types?',
      acceptedAnswer: { '@type': 'Answer', text: 'When a JSON value is null, TypeScript needs a type for it. The "null as" control gives you three options: null generates the literal null type (most precise, requires strictNullChecks in tsconfig); unknown generates unknown which requires a type guard before use (safest for external data); any generates any which disables type checking for that property (least safe). The null setting is the TypeScript default when strictNullChecks is enabled.' },
    },
    {
      '@type': 'Question',
      name: 'What does the Root name field do?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Root name field sets the name for the top-level interface generated from your JSON object. The default is Root — so the outermost object becomes interface Root {}. Change it to a more meaningful name like ApiResponse, UserProfile, or OrderPayload to get semantically named interfaces. Nested object keys automatically derive their own interface names from the JSON key (e.g., a "user" key produces a User interface).' },
    },
    {
      '@type': 'Question',
      name: 'How are nested objects handled?',
      acceptedAnswer: { '@type': 'Answer', text: 'Each nested object generates a separate interface. The interface name is derived from the JSON key using PascalCase conversion — so a "userAddress" key produces a UserAddress interface, and "meta" produces a Meta interface. The parent interface then references the child interface by name. All generated interfaces are output together in the TypeScript panel, with dependency interfaces appearing before the interfaces that reference them.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use the output directly in my TypeScript project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click Download .ts to save the generated code as a .ts file you can drop directly into your project. With the export toggle on (the default), all interfaces have the export keyword and can be imported anywhere. For large API integrations, generate the interfaces, place them in a types/ folder, and import them wherever you need type-safe access to the API response data.' },
    },
    {
      '@type': 'Question',
      name: 'Does this tool send my JSON to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. All conversion happens entirely in your browser using JavaScript — no data is sent to any server. The tool works offline once the page has loaded. You can safely paste sensitive API responses, authentication payloads, or private data structures without any privacy concerns.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON to TypeScript Interface Generator',
  url: 'https://webdevpuneet.com/json-to-typescript/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online tool to convert JSON to TypeScript interfaces or type aliases. Handles nested objects, arrays, null values, optional fields, export keyword, and custom root names. 100% browser-based.',
  featureList: [
    'Instant JSON to TypeScript interface conversion as you type',
    'interface or type alias output mode',
    'Nested object support — each object generates a named interface',
    'Array of objects — merges all items into a single unified interface',
    'Optional fields toggle — add ? to all properties',
    'Null handling: null | unknown | any',
    'Export keyword toggle',
    'T[] and Array<T> array syntax modes',
    'Customizable root interface name',
    'Syntax-highlighted TypeScript output',
    'Copy to clipboard with one click',
    'Download as .ts file',
    '100% client-side — no server, no sign-up, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'JSON to TypeScript Interface Generator', item: 'https://webdevpuneet.com/json-to-typescript/' },
  ],
};

const SEO = {
  slug: 'json-to-typescript',
  title: 'JSON to TypeScript Interface Generator — Convert JSON to TS Types Online Free',

  about: {
    title: 'Generate TypeScript Interfaces from JSON Instantly — No Install, No Sign-Up',
    description: `You just got an API response back and now you need to write TypeScript interfaces for it. If it has five nested objects and three arrays, that is twenty minutes of tedious typing — and you have to get every field name exactly right or your code won't compile. Paste the JSON here and get the interfaces in two seconds.\n\nThe generator walks your entire JSON tree recursively. Every nested object becomes its own named interface. Arrays of objects get a unified interface covering all keys that appear across every element. Property types are inferred directly from the values: \`string\`, \`number\`, \`boolean\`, \`null\`, and arrays — with union types for mixed arrays.\n\nTwo output modes give you control over TypeScript style. **interface** is the traditional choice for describing object shapes and is open for extension through declaration merging. **type** (type alias) is stricter by default and works better for mapped and conditional types. For plain API response shapes both are functionally identical — pick the style your codebase uses.\n\nThe **null as** setting matters for correctness. When a JSON value is \`null\`, TypeScript needs a type. Setting it to \`null\` (the default) is the most accurate representation and works with \`strictNullChecks\`. Setting it to \`unknown\` is the safest choice for untrusted API data — TypeScript will force you to check the value before using it. Setting it to \`any\` skips type checking entirely, which is the least safe but most permissive option.\n\nAll conversion runs entirely in your browser — no server, no sign-up, works offline. Paste your JSON, adjust the options to match your codebase conventions, and download the \`.ts\` file.\n\nA few implementation details matter for correctness. When an array contains objects, the generator runs \`Object.assign\` across every element to build one merged shape, so a field that only appears on the third item still ends up in the interface instead of being silently dropped. Array interface names come from a small singularization heuristic (\`categories\` → \`Category\`, \`posts\` → \`Post\`, with words ending in \`ss\`/\`us\` left alone and suffixed \`Item\` instead of guessing wrong), and a numeric suffix (\`Address2\`) is appended automatically if two branches would otherwise collide. Interfaces are emitted in reverse discovery order so a child interface always appears above the parent that references it — valid, forward-reference-free TypeScript.`,
  },

  features: [
    'Instant live conversion — TypeScript interfaces update as you type JSON',
    '**interface** vs **type alias** output — choose your codebase\'s preferred style; both produce identical runtime behavior for object shapes',
    'Recursive nested object support — each object at any depth generates its own PascalCase-named interface with the parent referencing it by name',
    'Smart array handling — arrays of objects merge all elements into one unified interface, catching optional fields that appear in some elements but not others; use the [JSON Formatter](/json-formatter/) to pretty-print API responses before pasting here',
    'Optional fields toggle — adds `?` to every property for partial types, partial update payloads, or APIs that may omit fields',
    'Null safety control — choose between `null`, `unknown`, and `any` for null JSON values to match your `tsconfig` and safety requirements',
    'Export keyword toggle — turn off for module-internal types, turn on (default) for shareable types that can be imported across your project',
    'Array syntax: `T[]` (concise, idiomatic) or `Array<T>` (explicit, readable in complex generics)',
    'Customizable root interface name — rename from the default `Root` to `ApiResponse`, `UserProfile`, or whatever matches your domain model',
    'Syntax-highlighted TypeScript output — keywords, type names, primitives, and punctuation in distinct colors for easy scanning',
    'Copy to clipboard + Download as `.ts` file — drop directly into your `types/` folder; pair with the [JSON Table Viewer](/json-table-viewer/) to inspect the actual data while typing against your new interfaces',
    '100% client-side — no server, no account, works offline; your API responses never leave the browser',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your JSON into the left panel',
        text: 'Paste any JSON object or array into the left input panel. TypeScript interfaces appear instantly in the right panel as you type — no button press required. Click **Sample** to load a realistic example with nested objects, arrays, and null values to see all the generated interfaces.',
      },
      {
        title: 'Set the root interface name',
        text: 'Change the **Root** name field in the header to whatever your top-level type should be called — `ApiResponse`, `UserPayload`, `OrderData`. Nested object keys derive their own names automatically: a `"user"` key becomes `User`, `"shippingAddress"` becomes `ShippingAddress`, `"posts"` array items become `Post`.',
      },
      {
        title: 'Choose interface or type alias output',
        text: 'Click **interface** to generate `interface Root {}` declarations (open for extension via declaration merging). Click **type** to generate `type Root = {}` aliases (closed by default, more flexible for unions and mapped types). For plain API response shapes both are functionally identical — pick your codebase\'s preferred style.',
      },
      {
        title: 'Control array syntax and null handling',
        text: 'Toggle between `T[]` (concise, idiomatic) and `Array<T>` (explicit, useful in complex generics) for array types. Use the **null as** control for null JSON values: `null` (most precise, requires `strictNullChecks`), `unknown` (safest for untrusted external data), or `any` (disables type checking for that property).',
      },
      {
        title: 'Enable optional fields or export keyword',
        text: 'Toggle **optional** to add `?` to every property (`name?: string`) — use for partial update types or APIs that may omit fields. Toggle **export** to add the `export` keyword to every interface (on by default) so they can be imported anywhere in your project.',
      },
      {
        title: 'Copy to clipboard or download the .ts file',
        text: 'Click **Copy** in the output panel header to copy all generated interfaces to your clipboard. Click **Download .ts** to save the file directly to disk. Drop it into your project\'s `types/` folder and import the interfaces wherever you need type-safe access to the API data.',
      },
    ],
  },

  useCases: [
    {
      icon: '🔌',
      title: 'Type an API response in seconds instead of minutes',
      desc: 'You called a REST API and got back 200 lines of nested JSON. Instead of writing interfaces by hand — getting field names wrong, missing nested types, forgetting nullables — paste the response here and get complete TypeScript interfaces in under two seconds. Pair with the [API Request Generator & Tester](/api-request-generator-tester/) to make and capture the API call in the same browser tab.',
    },
    {
      icon: '🗂️',
      title: 'Generate types for a JSON config file or schema',
      desc: 'Application configs, feature flag payloads, Stripe webhook events, and Slack API objects are all JSON. Paste any of them here to generate TypeScript interfaces for type-safe config access and event handling. Use the optional toggle if the config has fields that vary by environment.',
    },
    {
      icon: '⚡',
      title: 'Bootstrap a new TypeScript project\'s type layer',
      desc: 'Starting a new TypeScript project that consumes an existing API? Hit every API endpoint once, paste each response here, and collect all the generated interfaces into a `types/` folder. You\'ll have a complete, accurate type layer in minutes rather than hours.',
    },
    {
      icon: '🧪',
      title: 'Write typed test fixtures and mock data',
      desc: 'Paste a JSON fixture or mock response that you use in tests. Generate the TypeScript interface for it and annotate your fixture with the type — TypeScript will catch the moment a test fixture drifts from the real API shape. Use the [Diff Checker](/diff-checker/) to compare old and new API response shapes when the API changes.',
    },
    {
      icon: '📋',
      title: 'Convert JSON Schema or OpenAPI example objects to TS types',
      desc: 'OpenAPI specs and JSON Schema documents include example objects in JSON. Paste example response bodies here to quickly scaffold TypeScript types for each schema component. Faster than reading through the spec and writing interfaces manually.',
    },
    {
      icon: '🛠️',
      title: 'Validate third-party data structures before using them',
      desc: 'When integrating with a third-party SDK or webhook that sends JSON, paste a real payload here to understand and type its structure. Use `unknown` as the null-as setting for untrusted external data, which forces explicit type checks in your code before accessing nullable fields.',
    },
  ],

  faqs: [
    {
      q: 'How do I convert JSON to TypeScript interfaces?',
      a: 'Paste your JSON into the left input panel — TypeScript interfaces appear instantly in the right panel. Click Copy or Download .ts to use the output.',
    },
    {
      q: 'What TypeScript types does this tool generate from JSON?',
      a: 'JSON strings → `string`, numbers → `number`, booleans → `boolean`, null → `null` / `unknown` / `any` (your choice), arrays → `T[]` or union types, nested objects → separate named interfaces.',
    },
    {
      q: 'How are nested objects handled?',
      a: 'Each nested object generates its own interface. The name is derived from the JSON key in PascalCase — `"userAddress"` becomes `UserAddress`. Parent interfaces reference child interfaces by name.',
    },
    {
      q: 'How does the tool handle arrays of objects?',
      a: 'Arrays of objects are merged — all items are combined into one interface covering every key across all elements. The interface name is singularized from the array key (`users` → `User`, `posts` → `Post`).',
    },
    {
      q: 'What is the difference between interface and type alias output?',
      a: '`interface` supports declaration merging (useful for library types). `type` is closed by default and more flexible for unions and mapped types. For plain object shapes from JSON, both are functionally identical — pick whichever your codebase uses.',
    },
    {
      q: 'What does the optional toggle do?',
      a: 'It adds `?` to every property (`key?: type`), making all fields optional. Use it for partial update types or APIs where fields may be absent.',
    },
    {
      q: 'When should I use "null as unknown" vs "null as null"?',
      a: '`null` is the most precise type and works with `strictNullChecks` in tsconfig. `unknown` is the safest choice for untrusted external data — TypeScript forces you to check the value before using it. `any` skips type checking entirely.',
    },
    {
      q: 'Does this work with root-level JSON arrays?',
      a: 'Yes. If your JSON is an array like `[{...}, {...}]`, the tool generates an interface for the element type using the singularized root name. The root type is `Root[]` (or whatever you named it).',
    },
    {
      q: 'Can I use the output directly in my TypeScript project?',
      a: 'Yes. Download the `.ts` file and drop it into your `types/` folder. With the export toggle on (default), all interfaces are exported and can be imported anywhere in your project.',
    },
    {
      q: 'Is this tool free and does it send data to a server?',
      a: 'Completely free, no sign-up. All conversion runs in your browser — no data is sent to any server. You can safely paste sensitive API responses or private data structures.',
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JsonToTypeScriptTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
