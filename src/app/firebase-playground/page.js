import FirebasePlaygroundTool from '@/components/FirebasePlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Firebase Playground — 23 Free Firestore Lessons & Simulator | webdevpuneet.com',
  description: 'Learn Firebase Firestore in your browser with 23 interactive lessons — CRUD, queries, real-time listeners, transactions, and security rules. Free, no account.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/firebase-playground/' },
  icons: { icon: '/icons/firebase-playground.svg', shortcut: '/icons/firebase-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/firebase-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Firebase Playground Online — 23 Firestore Lessons, Beginner to Pro | webdevpuneet.com',
    description: 'Learn Firebase in your browser. 23 lessons — Firestore CRUD, queries, real-time listeners, cursor pagination, transactions, batched writes, Auth, and security rules. No account needed.',
    images: [{ url: 'https://webdevpuneet.com/images/firebase-playground.png', width: 1200, height: 630, alt: 'Firebase Playground — Firestore Simulator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Firebase Playground — 23 Firestore Lessons, Beginner to Pro',
    description: 'Learn Firestore with 23 structured lessons. CRUD, queries, listeners, cursor pagination, transactions, batched writes, Auth, security rules — no Firebase account needed.',
    images: ['https://webdevpuneet.com/images/firebase-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does this connect to real Firebase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Firebase Playground is a completely self-contained in-browser Firestore simulator. All operations — addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, queries, and onSnapshot — run against an in-memory JavaScript store. No data is ever sent to Firebase servers, Google, or any external service. You do not need a Firebase account, an API key, or any configuration. Open the page and start learning immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Firestore operations can I learn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The playground takes you from beginner to pro across 23 lessons and 11 chapters. Fundamentals: addDoc(), setDoc() with merge, getDoc(), getDocs(), updateDoc(), deleteDoc(), query() with where()/orderBy()/limit(), onSnapshot() real-time listeners, serverTimestamp(), increment(), arrayUnion()/arrayRemove(), and subcollections. Pro topics: cursor pagination with startAfter(), aggregation with getCountFromServer(), atomic batched writes with writeBatch(), transactions with runTransaction(), data modeling (denormalization, array vs subcollection), Firebase Authentication (sign up, sign in, onAuthStateChanged), and security rules (ownership and data validation, modeled in runnable JS).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should I use Firebase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firebase is a backend-as-a-service that lets you ship full apps without running servers. Firestore gives you a real-time NoSQL database that syncs across clients automatically; Authentication handles sign-up, sign-in, and sessions out of the box; Security Rules enforce access control on Google\'s servers; and it scales automatically with a generous free tier. Combined with hosting and cloud functions, a small team can build and launch a production app fast. This playground teaches both the everyday Firestore API and the production concerns — transactions, pagination, auth, and rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do batched writes and transactions differ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A batch (writeBatch) groups up to 500 writes that commit atomically — all succeed or none do — but it does not read data. A transaction (runTransaction) reads documents first and then writes based on what it read, retrying automatically if another client changed the data in between. Use a batch to keep related writes consistent (like a money transfer between two accounts) and a transaction when the new value depends on the current one (like incrementing a counter or decrementing inventory). Both are runnable lessons in the Transactions & Batches chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Firebase security rules covered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Security Rules run on Google\'s servers, not in the browser, so the playground shows the real firestore.rules syntax for ownership checks (request.auth.uid == resource.data.ownerId) and data validation (type, length, and exact-value assertions on request.resource.data), then models the same logic in runnable JavaScript so you can test the decisions. The lessons are honest that real enforcement requires deploying rules to Firebase — but the patterns you learn are exactly what you write in production.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. There is no sign-up, no account, no credit card, and no usage limit. The Firestore simulator runs entirely in your browser using JavaScript — there are no Firebase API calls, no billing, and no rate limits. All 12 lessons across 6 chapters are available immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the document tree work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Firestore State panel on the right side of the playground shows a live visual tree of all documents in the in-memory store after you click Run. Collections are shown as orange folder nodes with a document count badge. Each document shows its auto-generated or custom ID and all field values colour-coded by type — strings in green, numbers in amber, booleans in purple, arrays in light orange, and null in grey. Subcollections appear nested under their parent document. The tree collapses and expands with a click.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between addDoc and setDoc?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'addDoc() generates a unique random ID automatically and adds a new document to a collection. You pass a CollectionRef and data object. setDoc() writes a document at a path you specify — you choose the ID using doc(db, "collection", "your-id"). setDoc() overwrites the entire document by default; pass { merge: true } as the third argument to only update the supplied fields without touching others. Use addDoc() when you do not care about the ID, and setDoc() when the ID is meaningful (like a user UID or product SKU).',
      },
    },
    {
      '@type': 'Question',
      name: 'What are special values like serverTimestamp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firestore provides sentinel values that perform special operations during writes. serverTimestamp() is replaced by the server\'s actual timestamp when the write commits — more reliable than sending Date.now() from the client. increment(n) atomically adds n to a numeric field without a read-modify-write cycle, making it safe for counters even with concurrent updates. arrayUnion(...items) adds items to an array only if not already present. arrayRemove(...items) removes specific values from an array. All are atomic and safe for concurrent writes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do queries work in Firestore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firestore queries use a functional composition pattern: call query(collectionRef, ...constraints) to build a query descriptor, then pass it to getDocs() to execute it. Constraints include where(field, op, value) for filtering (ops: ==, !=, <, <=, >, >=, in, not-in, array-contains), orderBy(field, "asc"|"desc") for sorting, and limit(n) to cap results. The playground supports all these constraints. Real Firestore also requires indexes for compound queries — the simulator skips that requirement.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference from real Firestore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The simulator covers the core Firestore API surface accurately. Differences from the real SDK: all operations complete synchronously in-memory (no network latency), onSnapshot fires once with the current state instead of subscribing to ongoing changes, compound queries do not require composite indexes, there are no security rules enforcement, no offline persistence, no Firestore bundles, and no collection group queries. The simulator is ideal for learning the API and understanding data modelling patterns before integrating the real Firebase SDK into a project.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Firebase Playground',
  url: 'https://webdevpuneet.com/firebase-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'In-browser Firebase simulator with 23 structured lessons across 11 chapters, beginner to pro. Learn Firestore CRUD, queries with where/orderBy/limit, real-time listeners, special values, cursor pagination, aggregation count, batched writes, transactions, data modeling, Firebase Authentication, and security rules. No Firebase account required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Firebase Playground', item: 'https://webdevpuneet.com/firebase-playground/' },
  ],
};

const seoData = {
  slug: 'firebase-playground',
  title: 'Firebase Playground — Learn Firestore in Your Browser with a Full Simulator',

  about: {
    title: 'Learn Firebase Firestore Without a Firebase Account — Run Real Firestore Operations Instantly in Your Browser',
    description: `Firebase Firestore is the most widely-used NoSQL document database for web and mobile apps. It powers real-time features in millions of applications — yet learning it traditionally requires creating a Firebase project, enabling Firestore in the console, configuring security rules, and wiring up SDK credentials before writing a single document. This playground removes every barrier so you can focus entirely on understanding how Firestore works.

All Firestore operations run entirely in your browser — no data is sent to Firebase servers. Open any lesson and the code is already there. Click Run and the simulator executes against an in-memory Firestore engine built in JavaScript. Every \`addDoc()\`, \`setDoc()\`, \`getDoc()\`, \`query()\`, and \`onSnapshot()\` call works exactly as it does in the real Firebase SDK — and the live document tree on the right shows the resulting Firestore state after every run.

**How the document tree works:** After clicking Run, the Firestore State panel on the right renders a collapsible tree of all collections, documents, and fields in the in-memory store. Collection nodes show in Firebase orange with a document count badge. Each document expands to show its fields with values colour-coded by type — strings in green, numbers in amber, booleans in purple, arrays as comma-separated lists. Subcollections appear nested under their parent document. This visual makes the Firestore data model immediately clear: collections contain documents, documents contain fields, and subcollections live inside documents.

**The 23-lesson curriculum** spans 11 chapters and takes you from your first document to production patterns. **Getting Started** introduces \`addDoc()\` — which auto-generates a unique document ID — and \`setDoc()\`, which writes to a path you specify. Understanding the difference between these two is the first fundamental Firestore concept.

**Reading Data** covers \`getDoc()\` for single document reads with the DocumentSnapshot pattern (always call \`.exists()\` before \`.data()\`) and \`getDocs()\` for fetching all documents in a collection as a QuerySnapshot with \`.docs\`, \`.size\`, \`.empty\`, and \`.forEach()\`.

**Updating & Deleting** teaches \`updateDoc()\` for partial field updates without touching other fields — critical for safe multi-client writes — and \`deleteDoc()\` for document removal, including the important caveat that subcollections are not automatically deleted.

**Querying** introduces the functional query composition pattern: \`query(collectionRef, ...constraints)\` builds a query descriptor, then \`getDocs()\` executes it. The \`where(field, op, value)\` constraint supports all Firestore operators — ==, !=, <, <=, >, >=, in, not-in, and array-contains. \`orderBy(field, direction)\` sorts results, and \`limit(n)\` caps the number returned. Constraints combine in a single \`query()\` call.

**Special Values** covers the three atomic sentinel values that make Firestore safe for concurrent updates: \`serverTimestamp()\` writes the server's actual time instead of the client clock; \`increment(n)\` atomically adjusts a numeric field without a read-modify-write race; \`arrayUnion()\` and \`arrayRemove()\` add or remove array items without duplicates and without reading the full array first.

**Advanced** lessons cover \`onSnapshot()\` for real-time listeners — which fire immediately with the current state and then on every subsequent change — and subcollections using \`collection(docRef, "name")\` for one-to-many relationships like posts and their comments.

Then the curriculum moves into production territory. **Pagination & Aggregation** teaches cursor pagination with \`orderBy()\` + \`startAfter()\` + \`limit()\` (Firestore paginates with cursors, never offsets) and counting documents efficiently with \`getCountFromServer()\`. **Transactions & Batches** covers atomic \`writeBatch()\` (all-or-nothing writes for things like money transfers) and \`runTransaction()\` (safe read-then-write for counters and inventory, with automatic retries). **Data Modeling** teaches the NoSQL mindset — denormalizing hot fields to avoid extra reads since Firestore has no JOINs, and choosing between an array field and a subcollection for one-to-many data.

**Authentication** covers the full email/password flow with \`createUserWithEmailAndPassword()\`, \`signInWithEmailAndPassword()\`, \`signOut()\`, and reacting to \`onAuthStateChanged()\` to guard protected pages. Finally, **Security Rules** shows the real \`firestore.rules\` syntax for ownership checks and data validation, modeled in runnable JavaScript so you can test the access decisions — because client SDK calls are only as safe as the rules running on Google's servers.

### Why Use Firebase?

Firebase is a backend-as-a-service that lets you ship a complete app without managing servers. Firestore gives you a real-time NoSQL database that syncs across every connected client automatically; Authentication handles sign-up, sign-in, and sessions out of the box; Security Rules enforce access control server-side; and the whole platform scales automatically with a generous free tier, plus hosting and cloud functions when you need them. That combination lets a solo developer or small team launch a production-grade app remarkably fast — which is why Firebase powers millions of web and mobile apps. This playground teaches both the everyday Firestore API and the professional concerns (transactions, pagination, auth, rules) that separate a prototype from a production app. It pairs naturally with the [MongoDB Playground](/mongo-playground) for comparing NoSQL models and the [JavaScript Playground](/js-playground) for the async/await fundamentals every Firebase call relies on.`,
  },

  features: [
    'Complete in-browser Firestore simulator — all operations run locally, no Firebase account or API key needed — the NoSQL counterpart to the [MongoDB playground](/mongo-playground)',
    '23 structured lessons across 11 chapters, beginner to pro — from first document to transactions, auth, and security rules; pair with the [JavaScript playground](/js-playground) for async/await fundamentals',
    'Cursor pagination (orderBy + startAfter + limit) and document counting with getCountFromServer()',
    'Atomic batched writes (writeBatch) and read-then-write transactions (runTransaction) with worked examples',
    'Data modeling lessons — denormalization and array-vs-subcollection — for the NoSQL, JOIN-free mindset',
    'Firebase Authentication flow — sign up, sign in, sign out, and onAuthStateChanged guarding',
    'Security rules taught with real firestore.rules syntax (ownership and validation) modeled in runnable JS',
    'Live Firestore State panel — visual collapsible tree of all collections, documents, and fields after each run; sketch your collections first in the [database schema designer](/database-schema-designer)',
    'Full document write API — addDoc() with auto ID, setDoc() with custom ID, setDoc() with merge option',
    'Document read API — getDoc() with DocumentSnapshot pattern, getDocs() with QuerySnapshot and forEach()',
    'Partial update and delete — updateDoc() for field-level changes, deleteDoc() with subcollection caveat',
    'Query support — query() with where(), orderBy("asc"|"desc"), and limit() constraints',
    'All Firestore operators — ==, !=, <, <=, >, >=, in, not-in, array-contains in where() clauses',
    'Atomic special values — serverTimestamp(), increment(n), arrayUnion(), arrayRemove()',
    'Real-time listener pattern — onSnapshot() fires callback immediately with current snapshot',
    'Subcollection support — collection(docRef, "name") for nested document hierarchies',
    'Console output panel — captured console.log lines shown with line numbers and Firebase orange colour',
    'Chapter and lesson sidebar — 6 chapters, 12 lessons with active highlighting and collapsible sidebar',
    'Takeaways section — 2–3 bullet key points for each lesson to reinforce learning',
    'Lesson position saved to localStorage — resumes on the last active lesson across sessions',
    'Keyboard shortcut — Ctrl+Enter to run lesson code without clicking the Run button',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Choose a lesson from the sidebar',
        text: 'The left sidebar lists all 23 lessons organised into 11 chapters. Start at "Add your first document" if you are new to Firestore, or jump to a pro chapter — Transactions & Batches, Authentication, or Security Rules — that matches your level. Your last active lesson is remembered when you return.',
      },
      {
        title: 'Read the concept explanation',
        text: 'A collapsible panel above the code explains the Firestore concept for that lesson. It describes what the API does, when to use it, and how it relates to real Firestore behaviour. Inline `code` markers highlight method names, and bold text flags key distinctions like the difference between addDoc and setDoc.',
      },
      {
        title: 'Click Run to execute the code',
        text: 'The lesson code is shown in a read-only panel so you can focus on understanding each example. Click the orange Run button or press Ctrl+Enter to execute it against the in-memory Firestore simulator. The code runs asynchronously — all await calls resolve as they would in a real Firestore app.',
      },
      {
        title: 'Read the console output',
        text: 'The Console Output panel below the code shows each console.log line numbered in sequence. Values are stringified — objects display as formatted JSON, arrays as comma-separated, primitives as plain text. If the code throws an error, it appears in red with the error message.',
      },
      {
        title: 'Inspect the Firestore State tree',
        text: 'The Firestore State panel on the right renders a live visual tree of all documents created during the run. Collections appear in orange with a document count. Click any collection or document to expand or collapse it. Fields show their values colour-coded by type — this tree makes the Firestore data model tangible and is one of the most effective ways to understand how data is organised.',
      },
    ],
  },

  useCases: [
    {
      icon: '🔥',
      title: 'React and Next.js developers adding Firestore to a project',
      desc: 'Most web developers discover Firestore when they need a real-time data layer for a React or Next.js app. This playground lets you learn the SDK API without setting up a Firebase project first — understand addDoc, setDoc, queries, and listeners, then apply that knowledge directly to your real project with the actual Firebase SDK.',
    },
    {
      icon: '{}',
      title: 'Developers learning NoSQL document modelling',
      desc: 'Firestore\'s document-collection model differs from SQL tables and MongoDB in important ways — especially around subcollections, denormalisation, and query limitations. The playground\'s live document tree makes these differences visible: you can see exactly how your data structure choices affect the resulting document hierarchy.',
    },
    {
      icon: '◉',
      title: 'Students following Firebase courses and tutorials',
      desc: 'Firebase courses on Udemy, YouTube, or Coursera move quickly through the SDK. This playground provides a zero-setup environment to follow along, test examples from the course, and experiment with variations — all without needing to pause the video to configure a Firebase project.',
    },
    {
      icon: '⊞',
      title: 'Developers debugging Firestore data model designs',
      desc: 'When designing the Firestore data model for a new feature, sketch it out in the playground first. Try different approaches — top-level collection vs subcollection, flat document vs nested map — and see how queries behave against each structure. Catch data modelling mistakes before writing production code.',
    },
    {
      icon: '∑',
      title: 'Teams onboarding engineers to Firebase',
      desc: 'When a backend or mobile engineer joins a team that uses Firebase, the playground provides a structured path through the API. Work through all 23 lessons to understand the complete surface — writes, reads, queries, listeners, pagination, transactions, batched writes, auth, and security rules — before touching the production database.',
    },
    {
      icon: '⚡',
      title: 'Quick reference for Firestore API patterns',
      desc: 'Forget the exact syntax for arrayUnion? Not sure whether to use updateDoc or setDoc with merge? Jump to the relevant lesson for a working code example. The playground doubles as a fast interactive reference — more memorable than documentation and faster than searching Stack Overflow.',
    },
  ],

  faqs: [
    { q: 'Does this connect to real Firebase?', a: 'No. Everything runs in your browser against an in-memory JavaScript simulator. No Firebase account, API key, or project is needed. All Firestore operations run entirely in your browser — no data is sent to Firebase servers.' },
    { q: 'What Firestore operations can I learn?', a: 'Beginner to pro across 23 lessons: addDoc, setDoc (with merge), getDoc, getDocs, updateDoc, deleteDoc, query with where/orderBy/limit, onSnapshot listeners, serverTimestamp, increment, arrayUnion/arrayRemove, subcollections, cursor pagination with startAfter, getCountFromServer aggregation, batched writes (writeBatch), transactions (runTransaction), data modeling, Firebase Authentication, and security rules.' },
    { q: 'Why should I use Firebase?', a: 'Firebase is a backend-as-a-service: a real-time Firestore database that syncs across clients, Authentication out of the box, server-side Security Rules, and automatic scaling on a generous free tier — so small teams ship production apps without managing servers. The playground teaches both the everyday API and production concerns like transactions, pagination, auth, and rules.' },
    { q: 'How do batched writes and transactions differ?', a: 'A batch (writeBatch) groups up to 500 writes that commit atomically but does not read. A transaction (runTransaction) reads first, then writes based on the read, retrying if the data changed. Use a batch for consistent related writes (a money transfer); use a transaction when the new value depends on the current one (a counter or inventory). Both are runnable lessons.' },
    { q: 'Is this free to use?', a: 'Yes — completely free, no account, no sign-up, no limits. All 23 lessons are available immediately.' },
    { q: 'How does the document tree work?', a: 'After you click Run, the Firestore State panel on the right renders all collections, documents, and fields in the in-memory store. Collections show as orange folder nodes with a count badge, documents show their ID and fields colour-coded by type, and subcollections appear nested under their parent document.' },
    { q: 'What is the difference between addDoc and setDoc?', a: 'addDoc() auto-generates a unique random ID. setDoc() writes to a path you specify using doc(db, "col", "your-id"). setDoc() overwrites the document by default; pass { merge: true } to only update supplied fields. Use addDoc() when the ID does not matter, setDoc() when it does.' },
    { q: 'What are special values like serverTimestamp?', a: 'serverTimestamp() is replaced by the server\'s actual time on write. increment(n) atomically adjusts a number field — safe for counters with concurrent clients. arrayUnion() adds items without duplicates. arrayRemove() removes items. All are atomic and safe for concurrent writes.' },
    { q: 'How do queries work in Firestore?', a: 'Build a query with query(colRef, ...constraints) — constraints are where(), orderBy(), and limit(). Then pass the query to getDocs() to execute it. The simulator supports all Firestore where operators: ==, !=, <, <=, >, >=, in, not-in, and array-contains.' },
    { q: 'What is different from real Firestore?', a: 'The simulator covers the core API accurately. Differences: operations complete synchronously in memory (no network), onSnapshot fires once rather than subscribing to ongoing changes, compound queries need no composite indexes, transactions do not truly retry under contention, and security rules are taught as runnable JS models rather than enforced on a server. Ideal for learning the API and patterns before connecting to a real Firebase project.' },
  ],
};

export default function FirebasePlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><FirebasePlaygroundTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
