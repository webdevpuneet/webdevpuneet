import JsonSchemaGeneratorTool from '@/components/JsonSchemaGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/json-schema-generator.png';

export const metadata = {
  title: "JSON Schema Generator \u2014 Generate JSON Schema from JSON Online | webdevpuneet.com",
  description: "Paste JSON and instantly generate a JSON Schema (Draft 7). Infers types, required fields, nested objects, and arrays. Copy or download free.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/json-schema-generator/' },
  icons: { icon: '/icons/json-schema-generator.svg', shortcut: '/icons/json-schema-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/json-schema-generator/',
    siteName: 'webdevpuneet.com',
    title: "JSON Schema Generator \u2014 Generate JSON Schema from JSON Online | webdevpuneet.com",
    description: "Paste JSON and instantly generate a JSON Schema (Draft 7). Infers types, required fields, nested objects, and arrays. Copy or download free.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "JSON Schema Generator \u2014 FWD Tools" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "JSON Schema Generator \u2014 Generate JSON Schema from JSON Online | webdevpuneet.com",
    description: "Paste JSON and instantly generate a JSON Schema (Draft 7). Infers types, required fields, nested objects, and arrays. Copy or download free.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How do I generate a JSON Schema from JSON?", acceptedAnswer: { '@type': 'Answer', text: "Paste your JSON into the input panel. The tool analyzes every field and produces a JSON Schema with inferred types, properties definitions, and required arrays." } },
    { '@type': 'Question', name: "Which JSON Schema version does this generate?", acceptedAnswer: { '@type': 'Answer', text: "The output is JSON Schema Draft 7. This is compatible with AJV, OpenAPI 3.0 with draft-07 semantics, Pydantic, and most modern JSON validation libraries." } },
    { '@type': 'Question', name: "Are all fields marked as required?", acceptedAnswer: { '@type': 'Answer', text: "Fields present in the top-level object are added to the required array by default. You can edit the schema to remove optional fields from the required list." } },
    { '@type': 'Question', name: "Does it handle nested objects and arrays?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Nested objects produce nested schema definitions with their own properties and required arrays. Arrays produce items schemas based on the element types found in the array." } },
    { '@type': 'Question', name: "Can I use the output directly in OpenAPI?", acceptedAnswer: { '@type': 'Answer', text: "Yes, as a component schema. OpenAPI 3.0 supports JSON Schema Draft 7 for request bodies, response schemas, and component definitions. Minor adjustments may be needed for nullable fields." } },
    { '@type': 'Question', name: "Is my JSON uploaded anywhere?", acceptedAnswer: { '@type': 'Answer', text: "No. All schema inference runs in your browser. Your JSON is never sent to any server." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "JSON Schema Generator",
  url: 'https://webdevpuneet.com/json-schema-generator/',
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
    { '@type': 'ListItem', position: 2, name: "JSON Schema Generator", item: 'https://webdevpuneet.com/json-schema-generator/' },
  ],
};

const SEO = {
  slug: 'json-schema-generator',
  title: "JSON Schema Generator \u2014 Infer schema from any JSON",
  subtitle: "Infer schema from any JSON. Runs in your browser.",
  about: {
    title: "Generate JSON Schema From Any JSON in One Paste",
    description: `Writing JSON Schema by hand is meticulous work. Every field needs a type, every object needs a properties definition, every array needs an items schema, and required fields need to be listed explicitly. For complex API response structures with multiple levels of nesting, writing the schema from scratch takes far longer than the JSON itself.

This JSON Schema generator takes the opposite approach: paste your JSON, and the schema is inferred automatically. Every field is analyzed, its type is determined (string, number, integer, boolean, null, object, array), and the schema structure mirrors the JSON hierarchy. Nested objects produce nested schema definitions with their own properties. Arrays produce items schemas based on the array element types.

**Required fields are inferred by presence.** If a field appears in the top-level object, it is added to the required array. For arrays of objects, fields that appear in all sampled items are marked required. This gives you a useful starting schema that you can then edit to add optional fields, enum values, format constraints, and descriptions.

**JSON Schema Draft 7** is the most widely supported version. The output is compatible with AJV (the most popular Node.js validator), OpenAPI 3.0 with draft-07 semantics, Pydantic, FastAPI, and most JSON validation libraries across all major programming languages.\n\n**Editing the generated schema.** The inferred schema is a starting point — not the final schema. After generating, edit the \`required\` array to remove fields that are truly optional in your API. Add \`format\` constraints (\`”format”: “email”\`, \`”format”: “date-time”\`) to string fields that have semantic meaning. Add \`minimum\` and \`maximum\` to numeric fields. Add \`enum\` arrays to string fields with fixed allowed values. Add \`description\` strings to each property for documentation purposes. These edits turn an inferred schema into a precise, production-ready validation contract.\n\nRuns fully in your browser — JSON is never uploaded or processed by any server.`,
  },
  features: [
    "**Instant schema inference** from any valid JSON \u2014 objects, arrays, nested structures",
    "**Type detection** for string, number, integer, boolean, null, object, and array types",
    "**Nested object schemas** with full properties and required arrays",
    "**Array items schema** inferred from element types",
    "**JSON Schema Draft 7** output compatible with AJV, OpenAPI, and Pydantic",
    "**Required fields array** populated from fields present in the input",
    "**Copy and download** the generated schema as schema.json ready for use in your project",
    "**Runs entirely in the browser** — JSON is never uploaded or sent to any server",
    "**Pairs with [JSON Formatter](/json-formatter/)** for cleaning up and validating the input before generating the schema",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Paste your JSON", text: "Paste a JSON object, array, or any valid JSON value into the input panel. The schema is generated immediately on paste." },
      { title: "Review the inferred schema", text: "Check the generated schema. Every field from your JSON appears with an inferred type. Nested objects and arrays are fully expanded in the schema structure." },
      { title: "Adjust required fields", text: "The generator marks all present fields as required by default. Edit the required array to remove optional fields that may be absent in some responses." },
      { title: "Add constraints and descriptions", text: "Manually add format, pattern, minimum, maximum, enum, or description fields to the generated schema for validation purposes." },
      { title: "Copy or download", text: "Copy the schema to clipboard or download as schema.json for use in your project or API documentation." },
      { title: "Validate JSON against the schema", text: "Use the downloaded schema.json with AJV, Ajv-cli, or your preferred validator to verify that new JSON payloads conform to the inferred structure. Pair with JSON Formatter to inspect and clean up the input before generating." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Generate schemas for API response validation", desc: "Paste an API response and generate a JSON Schema Draft 7 schema to use with AJV, Zod, or your validation library of choice." },
    { icon: "\u25a6", title: "Create OpenAPI component schemas", desc: "Use the generated schema as a starting point for OpenAPI 3.0 component definitions \u2014 paste into your spec and refine as needed. Prototype the endpoints themselves in the [REST API builder playground](/rest-api-builder-playground)." },
    { icon: "\u25b3", title: "Bootstrap Pydantic models from JSON", desc: "Generate a JSON Schema from a Python dict or FastAPI response body and use it to build Pydantic model field definitions." },
    { icon: "\u2726", title: "Document data structures in API specs", desc: "Generate and edit schemas for request bodies and response types to include in API documentation or a developer portal." },
    { icon: "\u26a1", title: "Validate config files with a schema", desc: "Create a schema from an example config JSON and use it to validate future config files against the expected structure." },
    { icon: "\u2261", title: "Skip manual schema writing for prototypes", desc: "Generate an approximate schema quickly during development without writing every property, type, and required definition by hand. Need typed models instead? Convert the same JSON with [JSON to TypeScript](/json-to-typescript), or tidy it first in the [JSON formatter](/json-formatter)." },
  ],
  faqs: [
    { q: "How do I generate a JSON Schema from JSON?", a: "Paste your JSON into the input panel. The tool analyzes every field and produces a JSON Schema with inferred types, properties definitions, and required arrays." },
    { q: "Which JSON Schema version does this generate?", a: "The output is JSON Schema Draft 7. This is compatible with AJV, OpenAPI 3.0 with draft-07 semantics, Pydantic, and most modern JSON validation libraries." },
    { q: "Are all fields marked as required?", a: "Fields present in the top-level object are added to the required array by default. You can edit the schema to remove optional fields from the required list." },
    { q: "Does it handle nested objects and arrays?", a: "Yes. Nested objects produce nested schema definitions with their own properties and required arrays. Arrays produce items schemas based on the element types found in the array." },
    { q: "Can I use the output directly in OpenAPI?", a: "Yes, as a component schema. OpenAPI 3.0 supports JSON Schema Draft 7 for request bodies, response schemas, and component definitions. Minor adjustments may be needed for nullable fields." },
    { q: "Is my JSON uploaded anywhere?", a: "No. All schema inference runs in your browser. Your JSON is never sent to any server." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use JSON Schema Generator",
  description: "Paste JSON and instantly generate a JSON Schema (Draft 7). Infers types, required fields, nested objects, and arrays. Copy or download free.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function JsonSchemaGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JsonSchemaGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
