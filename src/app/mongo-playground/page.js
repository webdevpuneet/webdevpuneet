import MongoPlaygroundTool from '@/components/MongoPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'MongoDB Playground — Learn MongoDB Visually, 37 Lessons Free | webdevpuneet.com',
  description: 'Learn MongoDB online with 37 interactive lessons — CRUD, query operators, aggregation pipeline, $lookup joins, indexes, and transactions. Live editor, free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/mongo-playground/' },
  icons: { icon: '/icons/mongo-playground.svg', shortcut: '/icons/mongo-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/mongo-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Interactive MongoDB Playground — Learn MongoDB Queries in Your Browser',
    description: 'Write MongoDB queries and see results instantly. 37 lessons across 11 chapters, beginner to pro — CRUD, operators, array queries, aggregation pipeline, $lookup joins, data modeling, indexes, and transactions. No install.',
    images: [{ url: 'https://webdevpuneet.com/images/mongo-playground.png', width: 1200, height: 630, alt: 'Interactive MongoDB Playground' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Interactive MongoDB Playground — Learn MongoDB in Your Browser',
    description: 'Write MongoDB queries and see results instantly. 37 structured lessons, beginner to pro — find, filter, aggregation, $lookup joins, modeling, indexes, transactions. Free, no install.',
    images: ['https://webdevpuneet.com/images/mongo-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need to install MongoDB or Node.js to use this playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The MongoDB Playground runs entirely in your browser using a JavaScript-based in-memory simulation. There is nothing to install — no MongoDB server, no Node.js, no npm, no Docker. Open the page and start writing queries immediately against pre-loaded sample data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics does the MongoDB Playground cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '37 lessons across 11 chapters, beginner to pro: Getting Started (collections, find, findOne), Comparison Operators ($gt, $lt, $eq, $ne, $in, $nin), Logical Operators ($and, $or, $nor, $not), Projection, Sort/Limit/Skip (pagination, top-N), Array Queries ($all, $elemMatch, $size), Update Operations ($set, $inc, $push, $pull, $addToSet, updateMany), Delete and Insert, Aggregation Basics ($match, $group, $sort, $limit, $project), Advanced Aggregation ($unwind, $lookup cross-collection joins), and a pro Modeling & Production chapter (multi-stage reporting pipelines, join-and-flatten, embedding vs referencing, indexes and explain(), and transactions/production concerns).',
      },
    },
    {
      '@type': 'Question',
      name: 'What sample data is available in the playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The playground includes four collections: employees (10 documents with name, department, salary, skills array, remote status, hire year), products (8 documents with name, category, price, stock, rating, tags array), orders (12 documents with customerId, product, quantity, total, status, date, city), and reviews (8 documents with productId, rating, comment, verified, helpful count). The data is realistic enough to demonstrate all query patterns covered in the lessons.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the MongoDB aggregation pipeline work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The aggregation pipeline processes documents through a sequence of stages. Each stage transforms the documents from the previous stage. Common stages include $match (filter documents), $group (group and compute accumulators like $sum, $avg, $min, $max), $sort (order results), $limit (cap results), $project (reshape documents with computed fields), $unwind (explode array fields into individual documents), and $addFields (add or overwrite fields). Lessons 26 through 32 cover the aggregation pipeline in depth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between find() and aggregate() in MongoDB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'find() is for simple queries — filter, project, sort, skip, limit. It returns documents from the collection with optional transformation. aggregate() runs documents through a multi-stage pipeline that can group, reshape, compute new fields, unwind arrays, and perform complex transformations that find() cannot express. For counting grouped results, computing averages per category, or flattening array fields for analysis, use aggregate(). For simple lookups and filtered reads, find() is simpler and sufficient.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is MongoDB different from SQL databases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MongoDB stores data as JSON-like documents in collections rather than rows in tables. Documents in the same collection can have different fields — there is no fixed schema by default. Arrays and nested objects are first-class document fields, eliminating most join tables. Queries use a JSON operator syntax instead of SQL. Joins are replaced by embedding related data in the same document or using the $lookup aggregation stage. MongoDB excels for hierarchical data, flexible schemas, and high-volume document storage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my progress saved between sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completed lessons and your current position are saved to localStorage automatically. When you return, you resume exactly where you left off. No login or account is required. Progress is stored per device and per browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the playground support write operations like insert and update?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The playground supports the full CRUD surface: insertOne, insertMany, updateOne, updateMany, replaceOne, deleteOne, and deleteMany. Update operators including $set, $unset, $inc, $mul, $push, $pull, $addToSet, $pop, $rename, $min, and $max are all supported. Each lesson run creates a fresh in-memory database, so mutations from one run do not affect the next — you can safely experiment without worrying about corrupting the data.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MongoDB Playground',
  url: 'https://webdevpuneet.com/mongo-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive MongoDB query playground with live results. 37 structured lessons across 11 chapters, beginner to pro — CRUD, comparison and logical operators, projection, sort/limit/skip, array queries, update operators, delete and insert, aggregation pipeline, advanced aggregation with $lookup joins, and a Modeling & Production chapter (reporting pipelines, embedding vs referencing, indexes and explain(), transactions). No install, no server, runs entirely in the browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'MongoDB Playground', item: 'https://webdevpuneet.com/mongo-playground/' },
  ],
};

const seoData = {
  slug: 'mongo-playground',
  title: 'Interactive MongoDB Playground — Practice MongoDB Queries in Your Browser, Free',

  about: {
    title: 'Learn MongoDB Without Installing Anything — Write Queries, See Results, Understand NoSQL',
    description: `MongoDB is the world's most popular NoSQL database. Its document model, flexible schema, and powerful aggregation pipeline are used by startups and enterprises alike — yet many developers find MongoDB's query syntax unfamiliar compared to SQL. This playground removes every setup barrier so you can focus entirely on learning MongoDB's query language.

Open any lesson and the query is already loaded in the editor. The playground runs an in-memory JavaScript simulation of MongoDB that supports the full query surface: find, findOne, countDocuments, distinct, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, and aggregate with a complete pipeline stage implementation. Modify any query and click Run — results appear instantly as formatted JSON documents.

The 37 lessons span 11 chapters designed to build understanding progressively, beginner to pro. The first chapter introduces collections and documents — MongoDB's equivalent of SQL tables and rows — and shows how **documents are flexible JSON objects** that can have different fields from one another. The Getting Started chapter covers \`find()\` with filters, implicit $eq matching, and \`findOne()\` for single-document lookups. The final **Modeling & Production** chapter takes you to professional territory: building real multi-stage reporting pipelines (\`$match\` early, then \`$group\`, \`$sort\`, \`$project\`), joining and flattening collections with \`$lookup\` + \`$unwind\`, the embedding-vs-referencing modeling decision, how indexes turn a COLLSCAN into an IXSCAN (with \`explain()\`), and how multi-document transactions and replication keep production data safe.

MongoDB is worth learning because it is the most popular NoSQL database and the default data layer for the MERN/MEAN stack and countless Node.js apps. Its flexible document model maps naturally to JSON and to the objects in your code, it scales horizontally through sharding, and the same query skills apply whether you self-host or use MongoDB Atlas — making it a high-leverage skill for full-stack and backend developers.

**Comparison Operators** teaches the nested operator syntax MongoDB uses for range queries: \`$gt\`, \`$gte\`, \`$lt\`, \`$lte\`, \`$eq\`, \`$ne\`, \`$in\`, and \`$nin\`. Understanding this object-based syntax is foundational — every advanced MongoDB query builds on it.

**Logical Operators** covers \`$and\`, \`$or\`, \`$nor\`, and \`$not\` — the tools for combining multiple conditions into complex filters. The lessons explain when to use explicit \`$and\` versus the implicit AND that comes from placing multiple conditions in the same filter object.

**Projection** teaches how to control which fields appear in results — the MongoDB equivalent of naming columns in a SELECT statement. Inclusion mode (set fields to 1), exclusion mode (set fields to 0), and dot notation for nested fields are all covered with interactive examples.

**Array Queries** is one of the most valuable chapters for developers coming from SQL. MongoDB's array operators eliminate join tables: \`{ skills: 'Python' }\` finds employees whose skills array contains "Python". \`$all\` requires all specified values to be present. \`$elemMatch\` applies multiple conditions to the same array element. \`$size\` matches arrays of a specific length.

**Update Operations** covers \`$set\`, \`$inc\`, \`$mul\`, \`$push\`, \`$pull\`, \`$addToSet\`, \`$pop\`, \`$rename\`, \`$min\`, and \`$max\` — the full set of atomic update operators that modify documents in place without replacing them entirely.

**Aggregation Basics and Advanced Aggregation** cover the pipeline stages that make MongoDB powerful for analytics: \`$match\`, \`$group\` with accumulators (\`$sum\`, \`$avg\`, \`$min\`, \`$max\`, \`$count\`, \`$push\`), \`$project\` with computed fields, \`$sort\`, \`$limit\`, \`$skip\`, \`$unwind\`, \`$addFields\`, \`$replaceRoot\`, and cross-collection aggregation patterns.

Every lesson includes a Quick Check multiple-choice question to test your understanding of the core concept. Progress and your current position are saved automatically in localStorage so you can close the browser and resume exactly where you left off.`,
  },

  features: [
    'Full in-browser MongoDB simulation — no server, no install, works offline after first load — the document-database counterpart to the [SQL playground](/sql-playground)',
    '37 structured lessons across 11 chapters, beginner to pro — from basic find() to $lookup joins, reporting pipelines, data modeling, indexes, and transactions; model your collections first in the [database schema designer](/database-schema-designer)',
    'Four realistic sample collections: employees, products, orders, and reviews — inspect any result with the [JSON formatter](https://fwdtools.com/json-formatter/)',
    'Complete query operator support: $gt, $lt, $eq, $ne, $in, $nin, $and, $or, $nor, $not, $exists, $regex, $size, $all, $elemMatch',
    'Full CRUD operations: insertOne, insertMany, updateOne, updateMany, replaceOne, deleteOne, deleteMany',
    'All update operators: $set, $unset, $inc, $mul, $push, $pull, $addToSet, $pop, $rename, $min, $max',
    'Complete aggregation pipeline: $match, $group, $sort, $limit, $skip, $project, $unwind, $addFields, $replaceRoot, $count',
    'Group accumulators: $sum, $avg, $min, $max, $count, $push, $addToSet, $first, $last',
    'Aggregation expressions: $add, $subtract, $multiply, $divide, $concat, $toLower, $toUpper, $round, $cond, $size',
    'Syntax highlighting — keywords in blue, strings in green, numbers in orange, $ operators in purple, collection names in teal',
    'JSON result display — colorized JSON cards with nested object formatting and array rendering',
    'Collections tab — click any collection name to instantly insert a find() query',
    'Quick Check challenge on every lesson — collapsible multiple-choice question with correct/wrong feedback',
    'Progress tracking — completed lessons and position saved in localStorage between sessions',
    'Drag-to-resize split handle — adjust editor/results ratio from 20% to 80%',
    'Fresh database per run — mutations reset each execution so experiments never corrupt sample data',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Pick a lesson from the sidebar',
        text: 'The left sidebar lists all 37 lessons grouped into 11 chapters. Start at "Collections and Documents" if you are new to MongoDB, or jump to a pro chapter — Modeling & Production — that matches your level. Use the search box to find a specific topic like "aggregation" or "$lookup" instantly.',
      },
      {
        title: 'Read the concept explanation',
        text: 'A collapsible panel above the editor explains the MongoDB concept for that lesson — what the operator does, how it differs from SQL equivalents, and key things to remember. Bold text highlights important terms and backtick formatting highlights code tokens.',
      },
      {
        title: 'Run the lesson query',
        text: 'The starter code is already loaded in the editor. Press Ctrl+Enter or click Run to execute it against the in-memory database. Results appear as formatted JSON document cards below the editor. The execution time in milliseconds is shown in the results panel header.',
      },
      {
        title: 'Modify the query and experiment',
        text: 'Change the filter, add an operator, modify the projection, or try a different collection. Each run creates a fresh database so you can freely experiment with insert, update, and delete operations without breaking anything. Click Reset to restore the lesson\'s original code.',
      },
      {
        title: 'Answer the Quick Check',
        text: 'After reading the concept, open the collapsible Quick Check section and answer the multiple-choice question. Select an option to see whether you were right — correct answers highlight in green and the wrong choice highlights in red. Click "Try again" to reset and pick again.',
      },
      {
        title: 'Mark Done and advance',
        text: 'Click Mark Done to record your progress — a green dot appears next to the lesson in the sidebar and the progress bar advances. The next lesson loads automatically. Use Previous/Next or click any lesson in the sidebar to navigate freely.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'SQL developers learning MongoDB for the first time',
      desc: 'The playground maps MongoDB concepts to SQL equivalents throughout the lessons — collections vs tables, documents vs rows, $and vs WHERE clause, aggregate vs GROUP BY, $lookup vs JOIN. If you already know SQL, the lesson concepts will click quickly because the comparisons are explicit.',
    },
    {
      icon: '◉',
      title: 'Developers preparing for MongoDB certification',
      desc: 'The MongoDB Developer Associate certification requires deep understanding of query operators, update operators, and aggregation pipeline stages. The 37 lessons cover the exact operator set tested in the exam — plus $lookup joins, data modeling, and indexing — so you can practice each in isolation before combining them in complex queries.',
    },
    {
      icon: '{}',
      title: 'Backend developers new to document databases',
      desc: 'Coming from relational databases, the trickiest concepts are the flexible schema, array queries without join tables, and the aggregation pipeline syntax. The playground teaches each by showing a concrete working example — edit the query, see the result, understand the pattern.',
    },
    {
      icon: '⊞',
      title: 'Frontend developers using MongoDB with Node.js or Next.js',
      desc: 'The playground uses the same query syntax as the official MongoDB Node.js driver and Mongoose. Learn find(), aggregate(), insertOne(), and updateOne() here and the same queries transfer directly to your backend code. The driver API is identical to what you practice here.',
    },
    {
      icon: '∑',
      title: 'Data analysts learning MongoDB aggregations',
      desc: 'The aggregation pipeline is MongoDB\'s answer to SQL GROUP BY with window functions. The Advanced Aggregation chapter teaches $group with accumulators, $unwind for array expansion, $project with computed fields, and cross-collection summaries — the patterns used in real analytics workloads.',
    },
    {
      icon: '⚡',
      title: 'Quick operator reference without leaving your browser',
      desc: 'Use the playground as a live reference. Not sure how $elemMatch differs from $all? Jump to that lesson and run the interactive example. Forgot the syntax for $addToSet vs $push? Two clicks and you have a working demo. Faster than reading documentation and more memorable than Stack Overflow.',
    },
  ],

  faqs: [
    { q: 'Do I need to install MongoDB or Node.js to use this playground?', a: 'No. The MongoDB Playground runs entirely in your browser using a JavaScript-based in-memory simulation. There is nothing to install — no MongoDB server, no Node.js, no npm. Open the page and start writing queries immediately.' },
    { q: 'What MongoDB topics does the playground cover?', a: '32 lessons across 10 chapters: Getting Started (collections, find, findOne), Comparison Operators ($gt, $lt, $eq, $ne, $in, $nin), Logical Operators ($and, $or, $nor, $not), Projection (inclusion, exclusion, dot notation), Sort/Limit/Skip, Array Queries ($all, $elemMatch, $size), Update Operations ($set, $inc, $push, $pull, $addToSet, updateMany), Delete and Insert, Aggregation Basics ($match, $group, $sort, $project), and Advanced Aggregation ($unwind, cross-collection queries).' },
    { q: 'What sample data is available?', a: 'Four collections: employees (10 docs with name, department, salary, skills, remote, hiredYear), products (8 docs with name, category, price, stock, rating, tags), orders (12 docs with customerId, product, qty, total, status, date, city), and reviews (8 docs with productId, rating, comment, verified, helpful).' },
    { q: 'How does the aggregation pipeline work?', a: 'The pipeline processes documents through sequential stages. Each stage transforms the output of the previous one. $match filters, $group groups and computes accumulators ($sum, $avg, $min, $max, $push), $project reshapes documents with computed fields, $sort orders results, $limit caps the output, and $unwind explodes arrays. Lessons 26 through 32 cover each stage with working examples.' },
    { q: 'Does the playground support write operations?', a: 'Yes — insertOne, insertMany, updateOne, updateMany, replaceOne, deleteOne, and deleteMany are all supported. Update operators $set, $unset, $inc, $mul, $push, $pull, $addToSet, $pop, $rename, $min, $max are implemented. Each run creates a fresh database so mutations reset between executions.' },
    { q: 'How is MongoDB different from SQL?', a: 'MongoDB stores data as JSON-like documents in schema-flexible collections. Arrays and nested objects are native field types, eliminating most join tables. Queries use a JSON operator syntax. Joins are replaced by embedded documents or the $lookup aggregation stage. MongoDB excels for hierarchical data, variable schemas, and high-volume document storage.' },
    { q: 'Is my progress saved between sessions?', a: 'Yes. Completed lessons and your current position are saved to localStorage automatically. When you return, you resume exactly where you left off. No login or account required.' },
    { q: 'Can I practice array queries without a real MongoDB instance?', a: 'Yes. The in-memory engine fully supports array queries including contains ($eq against array), $all, $elemMatch, $size, $in against arrays, $push, $pull, $addToSet, and $unwind in aggregations — all the array operators you would use in real MongoDB development.' },
  ],
};

export default function MongoPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MongoPlaygroundTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
