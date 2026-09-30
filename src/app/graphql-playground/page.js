import GraphQLPlaygroundTool from '@/components/GraphQLPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'GraphQL Playground — Learn GraphQL Visually, 28 Lessons Free | webdevpuneet.com',
  description: 'Learn GraphQL in your browser with 28 interactive lessons — queries, mutations, cursor pagination, auth, and the N+1/DataLoader pattern. Free, runs locally.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/graphql-playground/' },
  icons: { icon: '/icons/graphql-playground.svg', shortcut: '/icons/graphql-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/graphql-playground/',
    siteName: 'webdevpuneet.com',
    title: 'GraphQL Playground Online — 28 Lessons, Beginner to Pro | webdevpuneet.com',
    description: 'Learn GraphQL with 28 structured lessons across 12 chapters — queries, mutations, variables, fragments, enums, interfaces, pagination, errors, auth, and the N+1/DataLoader pattern. No server, no account.',
    images: [{ url: 'https://webdevpuneet.com/images/graphql-playground.png', width: 1200, height: 630, alt: 'GraphQL Playground — In-Browser Executor' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'GraphQL Playground — 28 Lessons, Beginner to Pro',
    description: 'Learn GraphQL with 28 structured lessons. Queries, mutations, variables, fragments, enums, interfaces, pagination, auth, N+1/DataLoader — no server needed.',
    images: ['https://webdevpuneet.com/images/graphql-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does the GraphQL Playground connect to a real server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The GraphQL Playground is a completely self-contained in-browser executor. All GraphQL operations — queries, mutations, variables, fragments, directives, and introspection — run against an in-memory JavaScript resolver engine. No data is sent to any external GraphQL server, no API key is required, and no network requests are made during execution. All GraphQL operations run entirely in your browser — no data is uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I learn in the GraphQL Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The playground takes you from beginner to pro across 28 lessons in 12 chapters: Your First Query (field selection, arguments), Nested & Lists, Aliases & Meta Fields (__typename), Filtering/Sorting/Pagination (offset and cursor/Relay connections), Mutations and input types, Variables and defaults, Fragments & Directives (@include/@skip), Enums & Interfaces (with inline fragments and union types), Errors & Nullability, Introspection & Tooling (__schema), Auth & Context (operation- and field-level authorization), and Performance & Production (the N+1 problem, the DataLoader batching pattern, schema design, and an overview of subscriptions and federation). Each lesson has an editable query editor, a variables panel, a schema SDL display, a live response panel, and a schema explorer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should I learn and use GraphQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GraphQL lets clients ask for exactly the data they need in a single request, eliminating the over-fetching and under-fetching common with REST. One strongly-typed schema documents the whole API and powers editor autocomplete; clients fetch deeply related data in one round-trip instead of many; and the API evolves by adding fields and deprecating old ones, so you rarely need versioned endpoints. It powers data layers at GitHub, Shopify, and many others. This playground teaches both the query language and the production concerns — pagination, authorization, and the N+1/DataLoader performance pattern.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the N+1 problem and how does DataLoader fix it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GraphQL resolvers run per field, so a query like posts { author } runs the author resolver once per post — 1 query for the posts plus N queries for the authors (the N+1 problem). DataLoader fixes it by collecting every author key requested during one tick of the event loop, loading them in a single batched call, and caching the result per request — turning 1 + N into 1 + 1. The Performance & Production chapter has runnable lessons that demonstrate both the problem and the batched fix.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between offset and cursor pagination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Offset pagination uses limit and offset (like SQL LIMIT/OFFSET) — simple, but large offsets get slow and rows shifting between requests can skip or duplicate items. Cursor pagination (the Relay connection spec) gives each item an opaque cursor and you request first: N items after: cursor, returning edges (node + cursor) and pageInfo (endCursor, hasNextPage). It is stable as data changes and is the production standard. Both are covered as runnable lessons in the Filtering, Sorting & Pagination chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a query and a mutation in GraphQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A GraphQL query reads data — it uses the query keyword (or just curly braces for the shorthand form) and maps to the root Query type. Queries are intended to be side-effect free and can run in parallel. A mutation modifies data — it uses the mutation keyword and maps to the root Mutation type. Mutations execute sequentially, one at a time. Both return fields: you specify exactly which fields you want back from either operation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do variables work in GraphQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Variables separate the query structure from the dynamic values it uses. Declare them in the operation signature with $name: Type — for example, query GetUser($id: ID!) { user(id: $id) { name } }. Pass the actual values as a separate JSON object alongside the query — for example, {"id": "2"}. This is the correct, safe pattern for dynamic queries: never interpolate values directly into a query string. Variables can have defaults using = value in the declaration, making them optional when not provided.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are fragments in GraphQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fragments are named, reusable field selections for a specific type. Define one with fragment UserFields on User { id name role } and spread it into any compatible selection set with ...UserFields. This prevents duplicating the same field list across multiple queries — especially useful in large applications where many queries need the same fields. The playground includes a full fragments lesson where you define a fragment and use it in multiple aliased queries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is GraphQL introspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GraphQL introspection is the ability to query the schema itself — not the data, but the structure of the API. Every GraphQL server exposes a special __schema field that returns information about available types, their fields, and kinds. Tools like GraphiQL, Apollo Studio, and Insomnia use introspection to power autocomplete and documentation browsers. The playground includes an introspection lesson using the __schema field to explore queryType, mutationType, and all type names and kinds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do @include and @skip directives work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '@include(if: Boolean) includes a field in the response only when the argument is true — if false, the field is omitted entirely. @skip(if: Boolean) is the opposite: it skips the field when true and includes it when false. Both accept a Boolean variable or a literal true/false. They are the standard mechanism for clients to control response shape at query time based on flags, feature switches, or user preferences without changing the query structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from GraphiQL or Apollo Sandbox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GraphiQL and Apollo Sandbox are tools for exploring and testing a real GraphQL API endpoint — you point them at a running server URL and they send actual HTTP requests. This playground has no server at all: the entire GraphQL execution engine runs in JavaScript in your browser. It is a learning tool, not an API client. The 12 structured lessons with concept explanations, editable queries, variables panels, and live responses make it ideal for learning the GraphQL query language from scratch.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GraphQL Playground',
  url: 'https://webdevpuneet.com/graphql-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'In-browser GraphQL executor with 28 structured lessons across 12 chapters, beginner to pro. Learn queries, mutations, variables, fragments, enums, interfaces, filtering, offset and cursor pagination, errors, nullability, introspection, authorization, and the N+1/DataLoader performance pattern. No server, no account required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'GraphQL Playground', item: 'https://webdevpuneet.com/graphql-playground/' },
  ],
};

const seoData = {
  slug: 'graphql-playground',
  title: 'GraphQL Playground — Learn GraphQL In Your Browser with a Full In-Browser Executor',

  about: {
    title: 'Learn GraphQL Without a Server — Run Real GraphQL Operations Instantly in Your Browser',
    description: `GraphQL has become the standard query language for modern APIs — powering data layers at GitHub, Shopify, Twitter, and thousands of other companies. Yet learning GraphQL traditionally requires setting up a server, installing dependencies, configuring a schema, and wiring up resolvers before writing your first query. This playground removes every barrier. Open any lesson and you can write and execute GraphQL immediately.

All GraphQL operations run entirely in your browser — no data is sent to any server. The playground includes a complete custom GraphQL tokenizer, parser, and executor implemented in pure JavaScript. Every query, mutation, fragment, directive, and introspection call executes locally against in-memory resolvers defined alongside each lesson. There is no npm, no Node.js, no backend, and no API key.

**How the executor works:** When you click Run, the query string is tokenized into tokens (field names, braces, arguments, directives), parsed into an AST (Abstract Syntax Tree) representing the operations and selection sets, and then executed by walking the AST and calling resolver functions for each field. Aliases rename response keys, variables replace \`{kind:'variable'}\` nodes, \`@include\` and \`@skip\` directives gate field inclusion, fragment spreads expand into inline selection sets, and inline fragments match on \`__typename\` for union types. The result is the familiar \`{ data: {...} }\` JSON response rendered with syntax highlighting in the response panel.

**The 28-lesson curriculum** spans 12 chapters and takes you from your first query to production concerns. **Your First Query** starts with field selection — the core idea that GraphQL returns only the fields you ask for — and then covers arguments for filtering and finding by ID. You immediately see that requesting \`{ hello }\` returns only hello, not any other field the type might have.

**Nested & Lists** shows how GraphQL traverses relationships. The nested objects lesson demonstrates that resolver functions receive the parent object as their first argument — a User resolver passes the user to a Posts resolver, which filters by \`authorId\`. The aliases lesson shows how \`alice: user(id: "1")\` and \`bob: user(id: "2")\` coexist in one query response without key collisions.

**Mutations** introduces the \`mutation\` keyword and the pattern of returning fields from write operations. The input types lesson shows the standard \`input CreatePostInput { ... }\` pattern for grouping mutation arguments, which is cleaner than many separate top-level arguments and makes mutations reusable.

**Variables** covers the canonical way to parameterise queries — declare \`$id: ID!\` in the operation signature and pass \`{"id": "2"}\` as a separate JSON object. The default variables lesson shows \`= value\` syntax in declarations, so clients can omit optional variables entirely.

**Fragments & Directives** covers two of the most powerful query composition features. Fragments eliminate field duplication with \`fragment UserFields on User { id name role }\` and \`...UserFields\` spreads. Directives use \`@include(if: $showEmail)\` and \`@skip(if: $skipRole)\` to let clients control response shape at query time — change the variables and re-run to see the response change.

**Aliases & Meta Fields** covers renaming response keys to query the same field twice, and the \`__typename\` meta field that client caches use to key entities. **Filtering, Sorting & Pagination** moves into real API design: filter and sort arguments, offset pagination with \`limit\`/\`offset\`, and the production-standard cursor pagination using Relay-style connections with \`edges\`, \`node\`, \`cursor\`, and \`pageInfo\`.

**Enums & Interfaces** constrains inputs with \`enum Role { ADMIN USER GUEST }\` and shares fields across types with interfaces, selected via inline fragments. **Errors & Nullability** shows how a thrown resolver lands in the top-level \`errors\` array (alongside partial \`data\`), and how \`!\` non-null fields differ from nullable ones — including how a null bubbles up to nullify its parent.

**Introspection & Tooling** uses \`__schema\` to explore types at runtime, exactly as GraphiQL and Apollo Studio do. **Auth & Context** models how production servers authorize requests: a protected operation throws \`Unauthorized\` without a valid token, and field-level authorization hides sensitive fields like \`email\` unless an admin is calling.

**Performance & Production** is where the curriculum reaches pro level. The **N+1 problem** lesson shows how nested resolvers fire once per parent — 1 query for posts plus N for authors — and the **DataLoader** lesson demonstrates the batching-and-caching fix that turns 1 + N into 1 + 1. A **schema design** lesson covers naming, input types, nullable-by-default, connections, and evolving without versioning via \`@deprecated\`, and a final lesson gives an honest overview of **subscriptions** (real-time over a long-lived connection) and **federation** (composing many subgraphs into one supergraph), both of which need a live server beyond this sandbox.

### Why Use GraphQL?

GraphQL lets the client ask for exactly the data it needs in one request, ending the over-fetching and under-fetching that plague REST. A single strongly-typed schema documents the entire API and drives editor autocomplete; one request can fetch deeply nested, related data that would take many REST round-trips; and the API evolves by adding fields and deprecating old ones, so versioned endpoints become rare. Those benefits are why GitHub, Shopify, and countless others expose GraphQL APIs — and this playground teaches not just the syntax but the production patterns (pagination, authorization, N+1/DataLoader) that separate a beginner from a professional. Pair it with the [JavaScript Playground](/js-playground) for language fundamentals and the [REST API Builder](/rest-api-builder-playground) to compare the request/response model with REST.`,
  },

  features: [
    'Complete in-browser GraphQL executor — custom tokenizer, parser, and AST-walking executor in pure JavaScript, no npm packages — compare with REST patterns in the [REST API builder](/rest-api-builder-playground)',
    '28 structured lessons across 12 chapters, beginner to pro — from first query to pagination, auth, and performance, building on [JavaScript playground](/js-playground) fundamentals',
    'Filtering, sorting, offset pagination, and cursor pagination with Relay-style connections (edges, node, cursor, pageInfo)',
    'Enums and interfaces with inline fragments, errors and nullability, plus operation- and field-level authorization modeled with context',
    'Performance & Production chapter: runnable N+1 problem and DataLoader batching lessons, schema design best practices, and a subscriptions/federation overview',
    'Full query language support — fields, arguments, aliases, nested selections, operation names',
    'Mutation support — mutation keyword, root Mutation type, resolver-based write operations that return fields; mock equivalent REST endpoints with the [API mock generator](https://fwdtools.com/api-mock-generator)',
    'Input types — object literal arguments parsed and resolved for createPost(input: { ... }) patterns',
    'Variables panel — declare $var: Type in operation, pass JSON values, supports default values with = value syntax',
    'Fragment support — fragment Name on Type { } definitions and ...Name spreads fully expanded before execution',
    'Directives — @include(if: Boolean) and @skip(if: Boolean) applied per-field during execution',
    'Introspection — __schema system field returns queryType, mutationType, and full types list from lesson schema',
    'Inline fragments — ... on TypeName { } syntax for union types, matched via __typename on resolved items',
    'Schema SDL display — collapsible panel showing the type definitions for the current lesson in GraphQL SDL format',
    'Schema Explorer panel — right sidebar with collapsible type/field tree showing all types and their field types',
    'Syntax-highlighted JSON response — keys in pink, strings in green, numbers in amber, booleans in purple',
    'Lesson sidebar with 6 chapter groups and active highlighting with GraphQL pink left border indicator',
    'Keyboard shortcut — Ctrl+Enter runs the current query without clicking the Run button',
    'Last active lesson saved to localStorage and restored on return visits',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Choose a lesson from the left sidebar',
        text: 'The sidebar lists all 28 lessons grouped into 12 chapters. Start with "Select fields with a query" in Your First Query if you are new to GraphQL, or jump to a pro chapter — Pagination, Auth & Context, or Performance & Production — that matches your level. Click any lesson to load its query, variables, and schema. Your last active lesson is restored when you return.',
      },
      {
        title: 'Read the concept explanation',
        text: 'Each lesson opens with a concept panel explaining what the GraphQL feature does and why it exists. Inline \`code\` markers highlight keywords and field names. The explanation connects the syntax to real-world use cases — for example, why variables are safer than string interpolation, or why input types are preferred over many separate arguments.',
      },
      {
        title: 'Optionally expand the Schema SDL and Variables panels',
        text: 'The Schema SDL panel (collapsible, below the concept) shows the type definitions for this lesson in GraphQL Schema Definition Language format. The Variables panel (below the query editor) shows the JSON variables the query will use. You can edit both the query and the variables before running. Try changing a variable value and re-running to see the response change.',
      },
      {
        title: 'Click Run to execute the query',
        text: 'Click the pink Run button or press Ctrl+Enter. The query is tokenized, parsed into an AST, and executed against the lesson\'s in-memory resolver functions. The result appears in the Response panel below — a syntax-highlighted JSON object with a data key (or errors if something went wrong). The entire execution happens locally in your browser in milliseconds.',
      },
      {
        title: 'Explore the Schema Explorer and advance to the next lesson',
        text: 'The Schema Explorer on the right panel shows all types and their fields from the lesson schema. Click any type to expand or collapse its field list. Use the Previous and Next buttons at the bottom to move between lessons. All 28 lessons together take you from basic field selection to production GraphQL — pagination, authorization, and the N+1/DataLoader performance pattern.',
      },
    ],
  },

  useCases: [
    {
      icon: '⚡',
      title: 'Front-end developers learning the GraphQL query language',
      desc: 'Many developers reach for GraphQL when they need to consume a GitHub, Shopify, or Contentful API — but the query language has unique concepts like selection sets, aliases, fragments, and variables that differ from REST. This playground provides hands-on practice with each concept, in a zero-setup environment, before you write queries against a real API.',
    },
    {
      icon: '{}',
      title: 'Back-end developers building their first GraphQL API',
      desc: 'Understanding how resolvers work from the client side — seeing how field selections map to resolver calls, how arguments are passed, how nested types chain resolver calls with the parent object — helps you design schemas and resolvers more effectively. Run the nested objects lesson to see exactly how User.posts receives the user object.',
    },
    {
      icon: '◉',
      title: 'Students following GraphQL courses and tutorials',
      desc: 'GraphQL courses on Udemy, YouTube, or egghead.io often assume you have a server running. This playground provides a zero-configuration environment to follow along, test the query examples from any lesson, and experiment with variations — without pausing to configure a server, install packages, or set up a database.',
    },
    {
      icon: '⊞',
      title: 'Teams onboarding engineers to a GraphQL API',
      desc: 'When a new team member joins a project that uses a GraphQL API, the playground provides a structured path through the query language. Complete all 12 lessons to understand queries, mutations, variables, fragments, directives, and introspection — the complete client-side GraphQL toolkit — before touching the production schema.',
    },
    {
      icon: '∑',
      title: 'Developers reviewing GraphQL fundamentals',
      desc: 'The playground doubles as an interactive reference. Forget the syntax for default variables? Not sure whether to use a fragment or an alias? Jump to the relevant lesson for a working, editable example. The schema explorer on the right shows all types and fields for the current lesson at a glance.',
    },
    {
      icon: '🔍',
      title: 'Anyone curious how GraphQL introspection works',
      desc: 'The introspection lesson shows the real __schema query that tools like GraphiQL send to every GraphQL server to power their documentation and autocomplete. Run the lesson to see queryType, mutationType, and the full type list — the same metadata every GraphQL client discovers at runtime.',
    },
  ],

  faqs: [
    { q: 'Does the GraphQL Playground connect to a real server?', a: 'No. Everything runs in your browser against an in-memory JavaScript executor. No server, no API key, and no network requests. All GraphQL operations run entirely in your browser — no data is sent to any server.' },
    { q: 'What can I learn in the GraphQL Playground?', a: 'Beginner to pro across 28 lessons in 12 chapters: field selection, arguments, nested objects, aliases and __typename, filtering, sorting, offset and cursor pagination, mutations and input types, variables and defaults, fragments, @include/@skip directives, enums, interfaces and union types, errors and nullability, __schema introspection, operation- and field-level authorization, the N+1 problem and the DataLoader fix, schema design, and a subscriptions/federation overview.' },
    { q: 'Why should I learn and use GraphQL?', a: 'GraphQL lets clients request exactly the data they need in one round-trip, ending REST over-fetching and under-fetching. A single typed schema documents the API and powers autocomplete, related data comes back in one request, and the API evolves by adding fields and deprecating old ones instead of versioning endpoints. The playground teaches both the query language and the production patterns — pagination, auth, and N+1/DataLoader.' },
    { q: 'What is the N+1 problem and how does DataLoader fix it?', a: 'Resolvers run per field, so posts { author } calls the author resolver once per post — 1 query plus N. DataLoader batches the author keys requested in one tick into a single load and caches per request, turning 1 + N into 1 + 1. The Performance & Production chapter demonstrates both, runnable.' },
    { q: 'Offset vs cursor pagination — what is the difference?', a: 'Offset uses limit/offset (like SQL LIMIT/OFFSET) — simple but slow at large offsets and unstable when rows shift. Cursor pagination (Relay connections) gives each item an opaque cursor and you request first: N after: cursor, returning edges and pageInfo; it is stable and the production standard. Both are runnable lessons here.' },
    { q: 'What is the difference between a query and a mutation?', a: 'Queries read data using the query keyword (or shorthand {}), mapping to the Query root type. Mutations write data using the mutation keyword, mapping to the Mutation type. Both return fields — you specify what you want back from either operation. Queries can run in parallel; mutations run sequentially.' },
    { q: 'How do variables work in GraphQL?', a: 'Declare variables in the operation signature with $name: Type, then pass JSON values in the Variables panel. The executor replaces $var references with the provided values before resolving fields. Default values use = value in the declaration and are used when the variable is absent from the JSON.' },
    { q: 'What are fragments in GraphQL?', a: 'Fragments define named, reusable field selections for a type: fragment UserFields on User { id name role }. Spread them with ...UserFields inside any matching selection set. The executor expands fragment spreads before resolving, so each field is resolved as if it were written inline.' },
    { q: 'What is GraphQL introspection?', a: 'Introspection lets you query the schema itself — not data, but the API structure. The __schema field returns queryType, mutationType, and all type names and kinds. GraphiQL and Apollo Studio use introspection to power their autocomplete and documentation panels. The playground supports the full __schema introspection query.' },
    { q: 'How do @include and @skip directives work?', a: '@include(if: true) includes the field; false omits it. @skip(if: true) omits the field; false includes it. Both accept a Boolean variable or literal. Try the directives lesson: change showEmail or skipRole in the variables JSON and re-run to see the response change.' },
    { q: 'How is this different from GraphiQL?', a: 'GraphiQL and Apollo Sandbox connect to a real GraphQL server URL and send HTTP requests. This playground has no server — the execution engine runs entirely in JavaScript in your browser. It is a structured learning tool with concept explanations, not an API client. Use it to learn the query language, then apply that knowledge to real APIs with GraphiQL.' },
  ],
};

export default function GraphQLPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><GraphQLPlaygroundTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
