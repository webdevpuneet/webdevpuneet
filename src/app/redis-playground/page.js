import RedisPlaygroundTool from '@/components/RedisPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/redis-playground.svg';

export const metadata = {
  title: 'Redis Playground — Learn Redis Visually, 8 Lessons Free | webdevpuneet.com',
  description: 'Learn Redis online with 8 interactive lessons — key-value, TTL, caching patterns, Pub/Sub, and locks. Visual key-space, free, no Redis server required.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/redis-playground/' },
  icons: { icon: '/icons/redis-playground.svg', shortcut: '/icons/redis-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/redis-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Redis Playground — Learn Redis Commands Visually, No Server Needed',
    description: 'Interactive Redis simulator with 8 lessons: key-value, TTL, caching, Pub/Sub, data types, atomic counters, SETNX locks, and key inspection. Visual key-space, TTL countdown, command history.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Redis Playground — Visual Redis Command Simulator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Redis Playground — Learn Redis Commands Visually',
    description: 'Practice Redis commands, TTL expiration, caching, Pub/Sub, counters, and locks in a visual browser simulator. No Redis server required.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the Redis Playground connected to a real Redis server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The playground is a browser-based simulator that models Redis key-value behavior, TTL countdowns, Pub/Sub message flow, and command responses without connecting to any server. It is intentionally designed for learning — safe, predictable, and requires no Redis installation, account, Docker setup, or network connection.' },
    },
    {
      '@type': 'Question',
      name: 'Which Redis commands does the playground support?',
      acceptedAnswer: { '@type': 'Answer', text: 'The simulator supports the commands used across all 8 lessons: SET (with EX), GET, DEL, TTL, EXPIRE, PERSIST, INCR, INCRBY, DECR, DECRBY, SETNX, EXISTS, RENAME, KEYS (with glob patterns), TYPE, MSET, MGET, LPUSH, RPUSH, LPOP, LRANGE, SADD, SREM, SMEMBERS, SCARD, SISMEMBER, HSET, HGET, HGETALL, HDEL, HKEYS, HVALS, ZADD, ZRANGE, ZSCORE, ZRANK, SUBSCRIBE, UNSUBSCRIBE, and PUBLISH.' },
    },
    {
      '@type': 'Question',
      name: 'How does the TTL countdown work?',
      acceptedAnswer: { '@type': 'Answer', text: 'When you run SET key value EX 30, the key is created with a 30-second expiration. The playground\'s key-space table shows the remaining TTL in seconds and counts it down every second in real time. When the TTL reaches zero the key disappears from the table, exactly as it would in a real Redis instance. Run TTL key to query the remaining time at any point.' },
    },
    {
      '@type': 'Question',
      name: 'What is the caching pattern lesson?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Caching Pattern lesson demonstrates the cache-aside pattern: the application checks Redis for a key first (cache hit returns immediately), and on a miss it fetches from the origin, stores the result in Redis with an expiration time, and serves the response. This pattern is used for API response caching, database query caching, rendered HTML caching, and rate-limited data fetching.' },
    },
    {
      '@type': 'Question',
      name: 'What is SETNX and why is it used for distributed locks?',
      acceptedAnswer: { '@type': 'Answer', text: 'SETNX (SET if Not eXists) writes a key only when it does not already exist and returns 1 on success or 0 if the key was already present. This atomic behavior makes it the foundation for distributed locks: the first worker to SETNX lock:job wins the lock and all others get 0, meaning they know another worker is already processing. Combine with EX to auto-release the lock if the worker crashes. The Conditional Writes lesson demonstrates this pattern.' },
    },
    {
      '@type': 'Question',
      name: 'What are INCR and INCRBY used for?',
      acceptedAnswer: { '@type': 'Answer', text: 'INCR atomically increments an integer key by 1. INCRBY adds any specified amount. Because Redis processes commands sequentially on a single thread, INCR is guaranteed to be race-condition-free — two clients calling INCR simultaneously always get different values. Common uses: page view counters, vote tallies, like counts, API rate limit windows (INCR + EXPIRE), inventory tracking, and distributed sequence number generation.' },
    },
    {
      '@type': 'Question',
      name: 'What Redis data types are covered?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Data Types lesson covers all four compound Redis types: Lists (LPUSH, RPUSH, LPOP, LRANGE — ordered sequences used for queues, feeds, and history), Sets (SADD, SMEMBERS, SCARD, SISMEMBER, SREM — unique unordered members used for tags, friend lists, and unique visitor tracking), Hashes (HSET, HGET, HGETALL, HDEL, HKEYS, HVALS — field-value maps on one key used for user profiles and structured objects), and Sorted Sets (ZADD, ZRANGE, ZSCORE, ZRANK — members ranked by numeric score, used for leaderboards and priority queues).' },
    },
    {
      '@type': 'Question',
      name: 'Does data persist after refreshing the page?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The key space resets when the page is refreshed. This is intentional — it keeps every session predictable and removes the need to clean up state between practice runs. The playground is designed for learning concepts, not for persisting data.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Redis Playground',
  url: 'https://webdevpuneet.com/redis-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based Redis learning simulator with 8 guided lessons covering key-value operations, TTL expiration, caching patterns, Pub/Sub, data types (List, Set, Hash, Sorted Set), atomic counters (INCR/INCRBY), conditional writes (SETNX), and key inspection (KEYS, TYPE, RENAME, MSET, MGET). Features a live key-space table with TTL countdown, command history with state diffs, and guided challenges. No Redis server or installation required.',
  featureList: [
    '8 guided lessons: key-value, expiration, caching, Pub/Sub, data types, atomic counters, conditional writes, key inspection',
    'Live key-space table — keys, values, types, and TTL visible after every command',
    'Real-time TTL countdown — expiring keys count down to zero and disappear',
    'Command history with output, timestamp, and key-space diff (added/changed/deleted)',
    'Guided challenges that validate commands needed for each lesson',
    'Cache simulator — demonstrates cache hit, miss, origin fetch, and write-with-TTL flow',
    'Pub/Sub panel — subscribe to channels, publish messages, view message timeline',
    '35+ supported commands: SET, GET, DEL, TTL, EXPIRE, PERSIST, INCR, INCRBY, DECR, DECRBY, SETNX, EXISTS, RENAME, KEYS, TYPE, MSET, MGET, LPUSH, LPOP, LRANGE, SADD, SMEMBERS, SCARD, SISMEMBER, HSET, HGETALL, HDEL, HKEYS, HVALS, ZADD, ZRANGE, ZSCORE, ZRANK, SUBSCRIBE, PUBLISH',
    'Browser-only simulator — no Redis server, no Docker, no account required',
    'Resets on refresh — predictable clean state for every learning session',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Redis Playground', item: 'https://webdevpuneet.com/redis-playground/' },
  ],
};

const SEO = {
  slug: 'redis-playground',
  title: 'Learn Redis Online — 8 Interactive Lessons with a Visual Key-Space Simulator',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with Key-Value Basics', text: 'The first lesson covers SET, GET, and DEL — the three commands every Redis user types first. Try the pre-loaded example commands, then write your own keys using the user:id or feature:flag:name naming conventions shown in the lesson.' },
      { title: 'Learn TTL expiration in the Expiration lesson', text: 'Run SET otp:login 839201 EX 30 and watch the key appear in the table with a 30-second countdown. Run TTL otp:login at different times to see the remaining seconds. When the timer hits zero the key disappears — this is how Redis automatically cleans up sessions, OTP codes, and temporary locks.' },
      { title: 'Understand cache hit and miss in the Caching lesson', text: 'The Caching lesson simulates the cache-aside pattern. Run GET on a key that is not in Redis — the simulator returns a miss and shows a fetch from origin. Then SET the key with an expiration and run GET again — this time it returns immediately as a hit. This is the exact flow used in production caching for API responses, database queries, and rendered pages.' },
      { title: 'Try all four data types', text: 'The Data Types lesson shows how Lists (LPUSH, LRANGE, LPOP), Sets (SADD, SMEMBERS, SCARD), Hashes (HSET, HGETALL, HKEYS), and Sorted Sets (ZADD, ZRANGE, ZSCORE) each store data differently. Run the pre-loaded command chips one at a time and watch the key-space table show the structure after each write.' },
      { title: 'Build counters with INCR and INCRBY', text: 'The Atomic Counters lesson shows why INCR is special. Start with SET views:homepage 0, then call INCR multiple times. Each call atomically adds 1 — no race conditions possible. Try INCRBY views:homepage 10 to add a larger amount, and DECR / DECRBY to subtract. This pattern powers page view counters, vote tallies, and rate limit windows.' },
      { title: 'Try distributed locks with SETNX', text: 'Run SETNX lock:deploy worker-1 — it returns 1 (success). Run it again with a different value — it returns 0 (key already exists, write skipped). This is the foundation of distributed locking: only the first caller wins. Use EXISTS to check whether a lock is held. Use PERSIST to remove expiration from a key that should outlive its original TTL.' },
      { title: 'Explore the key space with KEYS and TYPE', text: 'The Key Inspection lesson covers KEYS * (list all keys), KEYS user:* (glob pattern matching), TYPE key (returns string, list, set, hash, or zset), RENAME key newname, MSET key1 val1 key2 val2 (write multiple keys), and MGET key1 key2 (read multiple values). These commands are used for operational debugging and Redis introspection.' },
      { title: 'Subscribe and publish messages', text: 'The Pub/Sub lesson shows Redis as a lightweight message broker. Run SUBSCRIBE alerts to register interest in a channel. Run PUBLISH alerts "server deployed" to send a message. The message timeline updates immediately. This pattern is used for cache invalidation events, live notification feeds, and inter-service signaling without a full message queue.' },
    ],
  },
  about: {
    title: 'Learn Redis Visually — 8 Lessons Covering Every Core Pattern, No Server Required',
    description: `Redis is one of the most widely deployed pieces of backend infrastructure in the world — used as a cache, a session store, a message broker, a rate limiter, a leaderboard engine, and a job queue. Its command set is small and fast to learn, but the mental models behind the patterns — why TTL matters, how INCR avoids race conditions, when to use a Hash versus a String, why SETNX is the foundation of distributed locking — take longer to absorb from documentation alone. The Redis Playground gives you a visual, interactive environment to practice every core Redis pattern without installing Redis, Docker, or any backend tooling.

The playground simulates Redis key-value behavior entirely in the browser. Every command you run updates the live key-space table — you can see key names, stored values, data types, and TTL countdowns all at once. Command history logs every operation with its output and a state diff showing which keys were added, changed, or deleted. Expiring keys count down to zero in real time and disappear from the table, exactly as they would in a production Redis instance.

**Key-Value Basics** covers the three commands you will use on every Redis project: \`SET\` writes a value, \`GET\` reads it, and \`DEL\` removes it. The lesson introduces the key naming conventions used in production systems — \`user:42\`, \`session:abc123\`, \`feature:new-dashboard\`, \`page:/pricing\` — and explains why colons are used as namespace separators.

**Expiration** covers \`SET key value EX seconds\` (write with TTL), \`TTL key\` (read remaining seconds), \`EXPIRE key seconds\` (add or update expiration on an existing key), and \`PERSIST key\` (remove expiration). The TTL countdown in the key table makes expiration concrete — you can see session tokens, OTP codes, and temporary locks automatically clean up without any application code.

**Caching Pattern** simulates the cache-aside pattern that powers most Redis deployments: check Redis first (\`GET\`), return immediately on a hit, fetch from origin on a miss, write the result to Redis with a TTL (\`SET key value EX 60\`), and serve. The lesson shows cache hit, cache miss, and expiration as three distinct states so the lifecycle is clear before you implement it in an application.

**Data Types** covers all four compound Redis structures. **Lists** (LPUSH, RPUSH, LPOP, LRANGE) are ordered sequences used for queues, activity feeds, and browser history. **Sets** (SADD, SMEMBERS, SCARD, SISMEMBER, SREM) store unique unordered members — perfect for tags, follower lists, and unique visitor tracking. **Hashes** (HSET, HGET, HGETALL, HDEL, HKEYS, HVALS) map field names to values on a single key, making them ideal for user profiles, product data, and structured objects stored efficiently without JSON serialization. **Sorted Sets** (ZADD, ZRANGE, ZSCORE, ZRANK) store members with a numeric score for automatic ranking — the standard approach for leaderboards, priority queues, and time-series indexing.

**Atomic Counters** covers \`INCR\`, \`INCRBY\`, \`DECR\`, and \`DECRBY\`. Redis processes commands on a single thread, which means INCR is guaranteed atomic — two workers calling it simultaneously always receive different integers with no application-level locking required. This makes Redis the standard choice for page view counters, vote tallies, like counts, inventory deductions, and rate limit windows (INCR + EXPIRE on a per-user-per-minute key).

**Conditional Writes** covers \`SETNX\` (SET if Not eXists), \`EXISTS\`, and \`PERSIST\`. SETNX returns 1 if it wrote the key (key was absent) and 0 if it did not (key already existed). This atomic behavior is the foundation of distributed locks: only the first caller in a race wins the write. Combine with EX to auto-release the lock if the worker holding it crashes. EXISTS checks presence without fetching the value — useful for checking lock state or cache warmth without the overhead of reading the full value.

**Key Inspection** covers the introspection commands used for debugging and operations: \`KEYS *\` and \`KEYS pattern\` (glob matching with \`*\` and \`?\`), \`TYPE key\` (returns string, list, set, hash, or zset), \`RENAME key newkey\` (atomic rename), \`MSET\` (write multiple key-value pairs in one roundtrip), and \`MGET\` (read multiple values in one roundtrip). MSET and MGET are important for performance — reading six keys with MGET takes one network roundtrip instead of six.

**Pub/Sub** covers \`SUBSCRIBE channel\`, \`PUBLISH channel message\`, and \`UNSUBSCRIBE\`. Redis Pub/Sub delivers messages to all current subscribers of a channel instantly. It is used for cache invalidation signals (publish "invalidate page:/pricing" when the product changes), live notification delivery, inter-service events in microservices architectures, and lightweight realtime data without a full message queue like Kafka or RabbitMQ.`,
  },
  features: [
    '8 guided lessons: key-value basics, TTL expiration, caching pattern, data types, atomic counters, conditional writes, key inspection, Pub/Sub — complements the [SQL playground](/sql-playground) and [MongoDB playground](/mongo-playground) for full backend coverage',
    'Live key-space table showing key names, values, types, and TTL after every command',
    'Real-time TTL countdown — expiring keys tick down to zero and disappear from the table',
    'Command history with output, timestamp, and key-space diff (added / changed / deleted)',
    'Guided challenges that validate commands needed to complete each lesson',
    'Cache simulator — hit, miss, origin fetch, and write-with-TTL flow in one panel',
    'Pub/Sub panel — subscribe to channels, publish messages, view the message timeline',
    '35+ supported commands including INCR, SETNX, EXISTS, PERSIST, KEYS, TYPE, RENAME, MSET, MGET, LRANGE, SCARD, SISMEMBER, HDEL, HKEYS, HVALS, ZSCORE, ZRANK',
    'Browser-only simulator — no Redis server, no Docker, no account, no install required',
    'Key space resets on refresh — clean predictable state for every practice session',
  ],
  useCases: [
    { icon: '⚡', title: 'Learn Redis before backend interviews', desc: 'Work through all 8 lessons to cover every topic that comes up in backend engineering interviews: key-value patterns, TTL, caching, data type choice, INCR for counters, SETNX for locks, and Pub/Sub for events. Round out interview prep with the [Express playground](/express-playground).' },
    { icon: '⬚', title: 'Understand TTL and expiration', desc: 'Watch session tokens, OTP codes, and temporary keys count down and disappear in real time. The TTL countdown makes expiration concrete in a way that documentation cannot.' },
    { icon: '⇄', title: 'See the cache-aside pattern in action', desc: 'The Caching lesson shows cache hit, miss, origin fetch, and Redis write as distinct visual states — the exact lifecycle every caching implementation follows.' },
    { icon: '▹', title: 'Learn all four Redis data types', desc: 'Practice Lists (queues), Sets (unique members), Hashes (field maps), and Sorted Sets (ranked members) with the commands that read and modify each structure.' },
    { icon: '◈', title: 'Understand distributed locks and counters', desc: 'The Atomic Counters and Conditional Writes lessons explain the two most important Redis patterns for concurrent backend systems — INCR for race-free counting and SETNX for exclusive locks.' },
    { icon: '◇', title: 'Explain Redis to a team or in a workshop', desc: 'Load any lesson, run commands live, and show the key-space table updating. The TTL countdown and Pub/Sub timeline are especially effective for visual explanations without needing a terminal.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: '/sql-playground', label: 'SQL Playground — learn SQL queries with an interactive editor' },
    { href: '/nodejs-playground', label: 'Node.js Playground — learn server-side JavaScript with guided lessons' },
    { href: '/rest-api-builder-playground', label: 'REST API Builder — design and test REST API endpoints interactively' },
    { href: '/js-playground', label: 'JavaScript Playground — learn JavaScript fundamentals with live examples' },
    { href: '/typescript-playground', label: 'TypeScript Playground — learn TypeScript with 32 interactive lessons' },
  ],
};

export default function RedisPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><RedisPlaygroundTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
