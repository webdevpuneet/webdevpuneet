import DatabaseSchemaDesignerTool from '@/components/DatabaseSchemaDesignerTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/database-schema-designer.png';

export const metadata = {
  title: 'Database Schema Designer — SQL, Prisma & Mongoose | webdevpuneet.com',
  description: 'Design database tables and relationships visually. Export PostgreSQL, MySQL, SQLite DDL, Prisma schema, Mongoose models, and Firestore code. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/database-schema-designer/' },
  icons: { icon: '/icons/database-schema-designer.svg', shortcut: '/icons/database-schema-designer.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/database-schema-designer/',
    siteName: 'webdevpuneet.com',
    title: 'Database Schema Designer — Visual SQL, Prisma, Mongoose & Firestore Schema Generator',
    description: 'Design tables, fields, relationships, and indexes visually. Export PostgreSQL, MySQL, SQLite DDL, Prisma schema.prisma, Mongoose models, and Firestore starter code — free, no login.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Database Schema Designer — Free Online ERD and Schema Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Online Database Schema Designer — Free SQL, Prisma, Mongoose & Firestore Export',
    description: 'Visual database schema tool. Design tables, relationships, and indexes. Export to PostgreSQL, MySQL, SQLite, Prisma, Mongoose, and Firestore. Free, browser-only.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this database schema designer free to use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account, no login, and no subscription required. The entire tool runs in your browser — your schema data is saved locally in your browser and is never sent to any server.' },
    },
    {
      '@type': 'Question',
      name: 'What export formats does the database schema designer support?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool exports four formats from the same visual schema: (1) SQL DDL with CREATE TABLE, PRIMARY KEY, UNIQUE, INDEX, and FOREIGN KEY statements for PostgreSQL, MySQL, and SQLite dialects; (2) a Prisma schema.prisma file with model blocks, field attributes (@id, @unique, @default), and @@index declarations ready for TypeScript and Node.js projects; (3) Mongoose schema definitions with type, required, unique, ref, and index options for MongoDB-backed apps; and (4) Firestore addDoc starter code that maps your schema fields to JavaScript objects for Cloud Firestore.' },
    },
    {
      '@type': 'Question',
      name: 'How do I design database relationships between tables?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select any field in the field editor and use the Relation selector to point it to another table and field — for example, set user_id to reference users.id. The tool automatically generates the correct foreign key syntax in SQL (REFERENCES users(id)), a @relation decorator in Prisma, a ref: "User" hint in Mongoose, and a comment in Firestore starter code. The ERD preview updates to draw a line between the linked tables.' },
    },
    {
      '@type': 'Question',
      name: 'Which SQL dialects are supported?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three dialects are supported: PostgreSQL (uses UUID, JSONB, TIMESTAMP, and gen_random_uuid() for auto-generated UUID primary keys), MySQL (uses CHAR(36) for UUID, JSON, and DATETIME), and SQLite (uses TEXT for UUID and JSON fields). Switch dialects from the export panel dropdown and the generated SQL updates immediately for all tables.' },
    },
    {
      '@type': 'Question',
      name: 'Can I add database indexes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each table has a dedicated Index section. Name your index, choose which fields to include, and mark it as unique or non-unique. Normal indexes are useful for foreign key fields, filter columns, and sort columns. Unique indexes enforce uniqueness on email addresses, slugs, SKUs, and other natural keys. SQL export generates CREATE INDEX or CREATE UNIQUE INDEX statements, Prisma export generates @@index and @@unique blocks, and Mongoose export adds index: true or unique: true to the field definition.' },
    },
    {
      '@type': 'Question',
      name: 'Is there an ERD diagram view?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The ERD preview panel shows a compact entity relationship diagram of your schema — each table is a box listing its fields and types, with lines drawn between related tables. It updates live as you add tables, fields, and relationships. It is designed for a quick structural overview and for explaining the data model to teammates, rather than a full-featured draggable canvas.' },
    },
    {
      '@type': 'Question',
      name: 'What templates are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three starter templates are built in: SaaS (users and posts tables with UUID primary keys, email unique index, and user_id foreign key), Ecommerce (customers, products, and orders tables with SKU unique index and customer_id foreign key), and CRM (companies and contacts tables with domain unique index and company_id foreign key). Load any template with one click, then rename tables, add fields, and adjust the shape for your project. You can also start from a blank schema.' },
    },
    {
      '@type': 'Question',
      name: 'What field types can I use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Supported field types are: string (VARCHAR), text (TEXT/CLOB for long content), integer (INT), decimal (NUMERIC/DECIMAL for prices and quantities), boolean (BOOLEAN/TINYINT), uuid (UUID/CHAR(36)/TEXT depending on dialect), datetime (TIMESTAMP/DATETIME/TEXT), and json (JSONB/JSON/TEXT). The SQL export maps each type to the correct dialect keyword automatically.' },
    },
    {
      '@type': 'Question',
      name: 'Can I save my database schema and come back to it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The schema auto-saves to your browser\'s localStorage as you work, so it is still there when you return to the page. You can also export the schema as a JSON file for a portable backup, to share with a teammate, or to restore it in another browser. Use the Import JSON button to load a previously exported schema file.' },
    },
    {
      '@type': 'Question',
      name: 'Does this tool check my schema for errors?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The schema validation panel warns about common modelling issues including tables missing a primary key, duplicate table or field names, fields with relation references that point to non-existent tables or fields, and indexes referencing fields that do not exist. Fix the warnings before exporting to avoid generating broken SQL or invalid Prisma schemas.' },
    },
    {
      '@type': 'Question',
      name: 'How is this different from dbdiagram.io or Lucidchart?',
      acceptedAnswer: { '@type': 'Answer', text: 'This tool focuses on fast schema modelling and multi-format code export rather than a polished diagramming canvas. Unlike dbdiagram.io, it generates not just SQL but also Prisma, Mongoose, and Firestore starter code from the same schema. Unlike Lucidchart or draw.io database shapes, it generates actual working code you can paste into your project. It is free with no account, no seats, and no diagram limits — and everything stays in your browser.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use this to plan a MongoDB or Firestore database?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Even though Mongoose and Firestore are document databases with no strict schema enforcement, planning the document shape in advance helps avoid structural inconsistencies as the app grows. The Mongoose export generates a Schema definition with field types, required flags, unique constraints, and ref hints for populated relationships. The Firestore export generates an addDoc call with all your fields as a JavaScript object — a useful starting point for collection writes.' },
    },
    {
      '@type': 'Question',
      name: 'What is the Prisma schema export good for?',
      acceptedAnswer: { '@type': 'Answer', text: 'If you are building a Node.js or TypeScript backend with Prisma ORM, the export gives you a ready-to-edit schema.prisma model block for each table. It includes field names, types mapped to Prisma scalar types (String, Int, Boolean, DateTime, Json), @id and @default annotations, @unique field-level constraints, and @@index and @@unique table-level index declarations. Paste it into your schema.prisma file, add the datasource and generator blocks, and run npx prisma migrate dev to create your first migration.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Database Schema Designer',
  url: 'https://webdevpuneet.com/database-schema-designer/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online visual database schema designer. Design tables, fields, primary keys, foreign key relationships, and indexes. Export PostgreSQL, MySQL, SQLite DDL, Prisma schema.prisma, Mongoose schema definitions, and Firestore starter code — all from one visual interface, no login required.',
  featureList: [
    'Visual table and field editor — create, rename, and delete tables; add fields with name, type, and constraints',
    'Field types: string, text, integer, decimal, boolean, uuid, datetime, json — mapped to correct dialect keywords on export',
    'Primary key, required, and unique constraint flags per field',
    'Foreign key relationship designer — point any field to another table.field; generates REFERENCES, @relation, ref, and comment in respective exports',
    'ERD entity relationship diagram preview — live box-and-line diagram of all tables and relations',
    'Per-table index designer — name, fields, and unique flag; generates CREATE INDEX, @@index, index: true across SQL/Prisma/Mongoose',
    'SQL DDL export for PostgreSQL, MySQL, and SQLite with dialect-correct type mapping',
    'Prisma schema.prisma export with @id, @unique, @default, @@index, @@unique annotations',
    'Mongoose schema export with type, required, unique, ref, and index options',
    'Firestore addDoc starter code export with all schema fields mapped to a JavaScript object',
    'Template gallery: SaaS (users/posts), Ecommerce (customers/products/orders), CRM (companies/contacts)',
    'Schema validation warnings — missing primary keys, duplicate names, broken relation references, missing index fields',
    'Auto-save to localStorage; JSON export and import for portable backup and sharing',
    '100% browser-based — schema data never leaves your device, no login required',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Database Schema Designer', item: 'https://webdevpuneet.com/database-schema-designer/' },
  ],
};

const SEO = {
  slug: 'database-schema-designer',
  title: 'Database Schema Designer — Free Online SQL, Prisma, Mongoose & Firestore Schema Tool',
  about: {
    title: 'Design Your Database Schema Visually — Export SQL, Prisma, Mongoose, or Firestore Code Instantly',
    description: `Most development teams reach for migrations, ORM model files, or Firestore collection writes before anyone has drawn out what the data actually looks like. The result is mid-build schema changes, missed indexes on the columns that get queried most, and awkward foreign key structures that are expensive to refactor after the first deploy. The Database Schema Designer gives you a fast, visual workspace to plan the shape of your data first — then generates working starter code for whatever database stack you are using.

**Visual table and field editor** lets you model every entity in your application — users, posts, products, orders, invoices, teams, or anything else your app needs. Add fields, choose the right type (string, integer, decimal, boolean, uuid, datetime, json, or text), mark each field as a primary key, required, or unique, and wire relationships by pointing any field to another table. The relationship designer handles the plumbing: SQL export writes a \`REFERENCES\` clause, Prisma export adds a \`@relation\` decorator, and Mongoose export adds a \`ref\` hint — all from the same visual click.

**Foreign key relationships and indexes** are the two most frequently missed design steps when developers jump straight to code. The index designer lets you add normal or unique indexes per table — name the index, pick the fields, and mark it unique for email addresses, slugs, SKUs, and other natural lookup keys. SQL, Prisma, and Mongoose exports all include the correct index syntax so you do not have to add it later.

**Four export formats** cover the full modern web stack. The **SQL** tab generates \`CREATE TABLE\` statements with \`PRIMARY KEY\`, \`UNIQUE\`, \`NOT NULL\`, and \`FOREIGN KEY REFERENCES\` for PostgreSQL, MySQL, or SQLite — switch the dialect dropdown and every type mapping updates instantly (UUID becomes \`CHAR(36)\` in MySQL, \`TEXT\` in SQLite, and \`UUID\` with \`gen_random_uuid()\` in PostgreSQL). The **Prisma** tab generates a \`schema.prisma\` model block with \`@id\`, \`@unique\`, \`@default\`, \`@@index\`, and \`@@unique\` annotations — paste it straight into your Prisma project and run \`npx prisma migrate dev\`. The **Mongoose** tab generates a \`new Schema({})\` definition with types, required flags, unique constraints, and ref links for MongoDB-backed Node.js apps. The **Firestore** tab outputs an \`addDoc\` call pre-filled with all your schema fields as a JavaScript object — a useful starting point for collection writes in Firebase projects.

**Starter templates** cut the blank-screen problem. The SaaS template gives you \`users\` and \`posts\` with UUID primary keys, a unique email index, and a \`user_id\` foreign key wired up. The Ecommerce template adds \`customers\`, \`products\` (with unique \`sku\`), and \`orders\` with a \`customer_id\` relation. The CRM template covers \`companies\` and \`contacts\` with a \`domain\` unique constraint. Load any template with one click and adjust it — rename tables, add fields, change types, and add your own relationships.

**Schema validation** warns about the mistakes that cause migrations to fail: tables with no primary key, duplicate table or field names, relation references pointing to tables or fields that do not exist, and index definitions referencing missing fields. The ERD preview updates live as you work, drawing a box-and-line entity relationship diagram that is useful for reviewing structure at a glance or explaining the data model to teammates.

Everything runs in the browser. Your schema auto-saves to localStorage between sessions. Export a JSON backup file to share the schema with a colleague or restore it on another machine — no account, no upload, no data leaving your device.`,
  },

  features: [
    'Visual table editor — create, rename, and reorder tables; each table has its own field list, index list, and ERD preview box',
    'Nine field types mapped to dialect-correct SQL keywords: string (VARCHAR), text (TEXT), integer (INT), decimal (NUMERIC), boolean (BOOLEAN), uuid (UUID/CHAR(36)/TEXT), datetime (TIMESTAMP/DATETIME/TEXT), json (JSONB/JSON/TEXT)',
    'Primary key, required (NOT NULL), and unique constraint toggles per field — reflected in all four export formats',
    'Foreign key relationship designer — point any field to another table.field; generates REFERENCES in SQL, @relation in Prisma, ref hint in Mongoose, and a comment in Firestore — concepts covered hands-on in the [MongoDB playground](/mongo-playground) and [Firebase playground](/firebase-playground)',
    'Per-table index designer — name, fields, and unique/normal flag; generates CREATE INDEX, @@index / @@unique in Prisma, index: true / unique: true in Mongoose',
    'SQL DDL export for PostgreSQL, MySQL, and SQLite — dialect switcher updates all type mappings instantly; run the output in the [SQL playground](/sql-playground) or tidy it with the [SQL formatter](https://fwdtools.com/sql-formatter)',
    'Prisma schema.prisma export — model blocks with @id, @unique, @default(uuid()), @@index, and @@unique ready for npx prisma migrate dev',
    'Mongoose schema export — Schema({}) definition with type, required, unique, ref, and index options for MongoDB apps',
    'Firestore addDoc starter code — JavaScript object pre-filled with all schema fields for Cloud Firestore collection writes',
    'Three starter templates: SaaS (users, posts), Ecommerce (customers, products, orders), CRM (companies, contacts)',
    'Live ERD entity relationship diagram — box-and-line preview of all tables and foreign key relations, updates as you design',
    'Schema validation warnings — missing primary keys, duplicate names, broken relation references, index fields that do not exist',
    'Auto-save to localStorage between sessions; JSON export and import for portable backups and team sharing',
    '100% browser-based — schema data never leaves your device; no account, login, or file upload required',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Start from a template or blank schema',
        text: 'Load the SaaS template for a users/posts starting point, the Ecommerce template for customers/products/orders, or the CRM template for companies/contacts. Each template comes with fields, primary keys, unique indexes, and a foreign key relationship already wired up. Or start from a blank schema if you are modelling a domain-specific app from scratch. Templates are editable — rename every table and field to match your project.',
      },
      {
        title: 'Create and name your tables',
        text: 'Click Add Table to create a new entity. Name it after the thing it represents — users, orders, products, invoices, sessions, subscriptions, tags, or any other noun your app manages. Each table becomes a separate CREATE TABLE block in SQL, a model block in Prisma, and a Schema definition in Mongoose. You can rename, duplicate, or delete any table at any time.',
      },
      {
        title: 'Add fields and choose types',
        text: 'Add fields to each table one at a time. Give each field a name matching your intended column name, choose the type (string, integer, decimal, boolean, uuid, datetime, json, or text), and mark the primary key, required, and unique flags. The uuid type generates UUID PRIMARY KEY with gen_random_uuid() in PostgreSQL, CHAR(36) in MySQL, and TEXT in SQLite — so primary key fields work correctly across dialects without manual adjustment.',
      },
      {
        title: 'Define foreign key relationships',
        text: 'Select any field that should reference another table — for example, user_id in a posts table — and use the Relation dropdown to point it to users.id. The ERD preview immediately draws a connecting line between the two tables. SQL export generates a FOREIGN KEY REFERENCES clause, Prisma export adds a @relation decorator, Mongoose export adds a ref: "User" hint, and Firestore export adds a comment marking the reference. One configuration, four formats.',
      },
      {
        title: 'Add indexes for lookup fields',
        text: 'Scroll to the Indexes section of each table. Add an index for every field you will query by — foreign key columns (user_id, order_id), filter columns (status, role, published), and sort columns (created_at). Mark email, slug, and SKU fields as unique indexes to enforce uniqueness at the database level rather than in application code. SQL, Prisma, and Mongoose exports all include the index definitions.',
      },
      {
        title: 'Choose a SQL dialect and review the ERD',
        text: 'Switch the SQL dialect between PostgreSQL, MySQL, and SQLite using the dialect selector. The type mapping updates immediately — UUID becomes UUID in Postgres, CHAR(36) in MySQL, and TEXT in SQLite; JSON becomes JSONB in Postgres, JSON in MySQL, and TEXT in SQLite. Review the ERD preview to confirm all relationships are drawn correctly and the table structure makes sense before exporting.',
      },
      {
        title: 'Export and copy the generated code',
        text: 'Switch between SQL, Prisma, Mongoose, and Firestore tabs in the export panel. Copy the output and paste it into your project. For SQL: run the DDL against your database or drop it into a migration file. For Prisma: paste it into schema.prisma, add your datasource and generator blocks, and run npx prisma migrate dev. For Mongoose: paste the Schema definition into your model file and wire it to mongoose.model(). For Firestore: use the addDoc starter as the base for your first collection write. Export the schema as JSON to back it up or share it with a teammate.',
      },
    ],
  },

  useCases: [
    {
      icon: '{}',
      title: 'Plan full-stack app data models before writing code',
      desc: 'Sketch out every entity — users, teams, subscriptions, posts, comments, files — before writing a single migration or model file. Catching a missing foreign key or a table without a primary key at the design stage takes seconds. Finding it after your first deploy takes a migration, a data backfill, and a deployment window. Use the SaaS template as a starting point and extend it to match your domain.',
    },
    {
      icon: 'SQL',
      title: 'Generate PostgreSQL, MySQL, or SQLite CREATE TABLE statements',
      desc: 'Stop writing boilerplate DDL by hand. Design the table in the visual editor, pick your dialect, and copy the generated CREATE TABLE block complete with PRIMARY KEY, NOT NULL, UNIQUE, and FOREIGN KEY REFERENCES clauses. Paste it into your migration file or run it directly against a development database. Switch the dialect dropdown to get MySQL or SQLite syntax from the same schema without any extra work.',
    },
    {
      icon: 'Pr',
      title: 'Bootstrap a Prisma schema.prisma file',
      desc: 'Design your data model visually and export a Prisma model block for every table, complete with @id, @default(uuid()), @unique, @relation, @@index, and @@unique declarations. Paste it into your schema.prisma, add the datasource and generator blocks, and run npx prisma migrate dev. This removes the hardest part of starting a new Prisma project — getting the initial schema.prisma right before Prisma Client generation.',
    },
    {
      icon: 'DB',
      title: 'Design Mongoose schemas for MongoDB-backed Node.js apps',
      desc: 'Plan your document structure in the visual editor — even MongoDB apps benefit from thinking through field types, required constraints, unique indexes, and references between collections before writing application code. The Mongoose export generates a Schema({}) definition with type, required, unique, ref, and index options for every field. Use it as the starting point for your Mongoose model files.',
    },
    {
      icon: '⊞',
      title: 'Map a Firestore data model before building',
      desc: 'Firestore collections are schema-free, but that does not mean planning is unnecessary — it means inconsistencies are invisible until they break a query. Use the designer to draw out collections and their fields, then export the Firestore addDoc starter code as a JavaScript object pre-filled with all your fields. It is a useful reference for keeping writes consistent across different parts of the app.',
    },
    {
      icon: 'IDX',
      title: 'Plan query access patterns and indexes upfront',
      desc: 'Slow queries usually come from missing indexes on the columns that production traffic actually queries against. Use the index designer to add indexes for every foreign key column, filter column, and sort column while the schema is still on paper. The exported SQL includes CREATE INDEX statements, Prisma exports @@index blocks, and Mongoose exports index: true field options — so the indexes ship with the schema, not as an afterthought.',
    },
    {
      icon: '↔',
      title: 'Compare SQL and document database shapes for the same domain',
      desc: 'Unsure whether to use PostgreSQL with Prisma or MongoDB with Mongoose for your next project? Design the schema once in the visual editor and compare the SQL, Prisma, and Mongoose export tabs side by side. Seeing how the same relationships translate between a relational JOIN via FOREIGN KEY, a Prisma @relation(), and a Mongoose ref: makes the database choice more concrete than reading docs alone.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function DatabaseSchemaDesignerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><DatabaseSchemaDesignerTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
