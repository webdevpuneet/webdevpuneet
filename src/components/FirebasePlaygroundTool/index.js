'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_LESSON = 'fwd-firebase-playground-lesson';

/* ── Firestore simulator ────────────────────────────────────────────────── */
class FirestoreDB {
  constructor() { this._store = {}; }

  _getDocs(colPath) {
    const prefix = colPath + '/';
    return Object.entries(this._store)
      .filter(([p]) => p.startsWith(prefix) && p.slice(prefix.length).indexOf('/') === -1)
      .map(([p, d]) => ({ path: p, id: p.split('/').pop(), data: { ...d } }));
  }

  _applyServerValues(data) {
    const out = {};
    for (const [k, v] of Object.entries(data)) {
      if (v && typeof v === 'object' && v._type === 'serverTimestamp') {
        out[k] = new Date().toISOString();
      } else if (Array.isArray(v)) {
        out[k] = v;
      } else if (v && typeof v === 'object' && !v._type) {
        out[k] = this._applyServerValues(v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  _applyUpdates(existing, updates) {
    const out = { ...existing };
    for (const [k, v] of Object.entries(updates)) {
      if (v && typeof v === 'object' && v._type === 'serverTimestamp') {
        out[k] = new Date().toISOString();
      } else if (v && typeof v === 'object' && v._type === 'increment') {
        out[k] = (typeof out[k] === 'number' ? out[k] : 0) + v.n;
      } else if (v && typeof v === 'object' && v._type === 'arrayUnion') {
        const arr = Array.isArray(out[k]) ? [...out[k]] : [];
        for (const item of v.items) {
          if (!arr.includes(item)) arr.push(item);
        }
        out[k] = arr;
      } else if (v && typeof v === 'object' && v._type === 'arrayRemove') {
        const arr = Array.isArray(out[k]) ? out[k] : [];
        out[k] = arr.filter(x => !v.items.includes(x));
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  toTree() {
    const tree = {};
    for (const [path, data] of Object.entries(this._store)) {
      const segs = path.split('/');
      let node = tree;
      for (let i = 0; i < segs.length - 1; i += 2) {
        const col = segs[i];
        const docId = segs[i + 1];
        if (!node[col]) node[col] = { _isCol: true, _docs: {} };
        if (!node[col]._docs[docId]) node[col]._docs[docId] = { _subcols: {} };
        if (i + 2 < segs.length - 1) {
          node = node[col]._docs[docId]._subcols;
        } else {
          node[col]._docs[docId]._data = data;
        }
      }
    }
    return tree;
  }
}

/* ── Firebase-like API factory ──────────────────────────────────────────── */
function makeAPI(db) {
  function collection(dbOrRef, path) {
    if (dbOrRef && dbOrRef._type === 'docRef') {
      return { _type: 'colRef', path: dbOrRef._path + '/' + path };
    }
    return { _type: 'colRef', path };
  }

  function doc(dbOrRef, ...segs) {
    if (dbOrRef && dbOrRef._type === 'colRef') {
      const joined = segs.join('/');
      return { _type: 'docRef', _path: dbOrRef.path + '/' + joined, id: joined.split('/').pop() };
    }
    if (dbOrRef && dbOrRef._type === 'docRef') {
      return { _type: 'docRef', _path: dbOrRef._path + '/' + segs.join('/'), id: segs[segs.length - 1] };
    }
    const full = segs.join('/');
    return { _type: 'docRef', _path: full, id: full.split('/').pop() };
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  }

  async function addDoc(colRef, data) {
    const id = uid();
    const path = colRef.path + '/' + id;
    db._store[path] = db._applyServerValues(data);
    return { _type: 'docRef', _path: path, id };
  }

  async function setDoc(docRef, data, options) {
    const resolved = db._applyServerValues(data);
    if (options && options.merge) {
      db._store[docRef._path] = { ...(db._store[docRef._path] || {}), ...resolved };
    } else {
      db._store[docRef._path] = resolved;
    }
  }

  async function getDoc(docRef) {
    const data = db._store[docRef._path];
    return {
      ref: docRef,
      id: docRef.id,
      exists: () => data !== undefined,
      data: () => data ? { ...data } : undefined,
    };
  }

  async function getDocs(colRefOrQuery) {
    let docs;
    if (colRefOrQuery._type === 'queryRef') {
      const { colRef, constraints } = colRefOrQuery;
      docs = db._getDocs(colRef.path);
      let _orderField = null, _orderDir = 1;
      for (const c of constraints) {
        if (c._t === 'startAfter') {
          const cursor = (c.val && c.val._type === 'docSnap') ? c.val._data[_orderField] : c.val;
          docs = docs.filter(d => _orderDir === 1 ? d.data[_orderField] > cursor : d.data[_orderField] < cursor);
        } else if (c._t === 'where') {
          docs = docs.filter(d => {
            const val = d.data[c.field];
            const cv = c.val;
            switch (c.op) {
              case '==': return val === cv;
              case '!=': return val !== cv;
              case '<':  return val < cv;
              case '<=': return val <= cv;
              case '>':  return val > cv;
              case '>=': return val >= cv;
              case 'in': return Array.isArray(cv) && cv.includes(val);
              case 'not-in': return Array.isArray(cv) && !cv.includes(val);
              case 'array-contains': return Array.isArray(val) && val.includes(cv);
              default: return true;
            }
          });
        } else if (c._t === 'orderBy') {
          const dir = c.dir === 'desc' ? -1 : 1;
          _orderField = c.field; _orderDir = dir;
          docs = [...docs].sort((a, b) => {
            const av = a.data[c.field], bv = b.data[c.field];
            return av < bv ? -dir : av > bv ? dir : 0;
          });
        } else if (c._t === 'limit') {
          docs = docs.slice(0, c.n);
        }
      }
    } else {
      docs = db._getDocs(colRefOrQuery.path);
    }
    const snapshots = docs.map(d => ({
      ref: { _type: 'docRef', _path: colRefOrQuery._type === 'queryRef' ? colRefOrQuery.colRef.path + '/' + d.id : colRefOrQuery.path + '/' + d.id, id: d.id },
      id: d.id,
      exists: () => true,
      data: () => ({ ...d.data }),
    }));
    return {
      docs: snapshots,
      size: snapshots.length,
      empty: snapshots.length === 0,
      forEach: (cb) => snapshots.forEach(cb),
    };
  }

  async function updateDoc(docRef, updates) {
    db._store[docRef._path] = db._applyUpdates(db._store[docRef._path] || {}, updates);
  }

  async function deleteDoc(docRef) {
    delete db._store[docRef._path];
  }

  function query(colRef, ...constraints) {
    return { _type: 'queryRef', colRef, constraints };
  }

  function where(field, op, val) { return { _t: 'where', field, op, val }; }
  function orderBy(field, dir = 'asc') { return { _t: 'orderBy', field, dir }; }
  function limit(n) { return { _t: 'limit', n }; }

  function onSnapshot(ref, callback) {
    const snap = (() => {
      if (ref._type === 'docRef') {
        const data = db._store[ref._path];
        return { id: ref.id, exists: () => data !== undefined, data: () => data ? { ...data } : undefined };
      }
      const docs = db._getDocs(ref.path).map(d => ({
        id: d.id, exists: () => true, data: () => ({ ...d.data }),
      }));
      return { docs, size: docs.length, empty: docs.length === 0, forEach: (cb) => docs.forEach(cb) };
    })();
    callback(snap);
    return () => {};
  }

  function serverTimestamp() { return { _type: 'serverTimestamp' }; }
  function arrayUnion(...items) { return { _type: 'arrayUnion', items }; }
  function arrayRemove(...items) { return { _type: 'arrayRemove', items }; }
  function increment(n) { return { _type: 'increment', n }; }
  function startAfter(val) { return { _t: 'startAfter', val }; }

  // ── Batched writes ──
  function writeBatch() {
    const ops = [];
    const batch = {
      set(ref, data, options) { ops.push(() => setDoc(ref, data, options)); return batch; },
      update(ref, updates) { ops.push(() => updateDoc(ref, updates)); return batch; },
      delete(ref) { ops.push(() => deleteDoc(ref)); return batch; },
      async commit() { for (const op of ops) await op(); return ops.length; },
    };
    return batch;
  }

  // ── Transactions (atomic read-then-write, modeled) ──
  async function runTransaction(_db, updateFn) {
    const tx = {
      async get(ref) { return getDoc(ref); },
      set(ref, data, options) { setDoc(ref, data, options); return tx; },
      update(ref, updates) { updateDoc(ref, updates); return tx; },
      delete(ref) { deleteDoc(ref); return tx; },
    };
    return await updateFn(tx);
  }

  // ── Aggregation count ──
  async function getCountFromServer(queryOrCol) {
    const snap = await getDocs(queryOrCol);
    return { data: () => ({ count: snap.size }) };
  }

  // ── Minimal Firebase Auth model ──
  const _auth = { currentUser: null, _users: {}, _listeners: [] };
  function getAuth() { return _auth; }
  function _emitAuth() { _auth._listeners.forEach(cb => cb(_auth.currentUser)); }
  async function createUserWithEmailAndPassword(auth, email, password) {
    if (!email || !/.+@.+/.test(email)) throw new Error('auth/invalid-email');
    if (!password || password.length < 6) throw new Error('auth/weak-password (min 6 chars)');
    if (auth._users[email]) throw new Error('auth/email-already-in-use');
    const user = { uid: 'uid_' + Math.random().toString(36).slice(2, 8), email };
    auth._users[email] = { password, user };
    auth.currentUser = user;
    _emitAuth();
    return { user };
  }
  async function signInWithEmailAndPassword(auth, email, password) {
    const rec = auth._users[email];
    if (!rec || rec.password !== password) throw new Error('auth/invalid-credential');
    auth.currentUser = rec.user;
    _emitAuth();
    return { user: rec.user };
  }
  async function signOut(auth) { auth.currentUser = null; _emitAuth(); }
  function onAuthStateChanged(auth, cb) { auth._listeners.push(cb); cb(auth.currentUser); return () => {}; }

  return {
    collection, doc, addDoc, setDoc, getDoc, getDocs,
    updateDoc, deleteDoc, query, where, orderBy, limit, startAfter,
    onSnapshot, serverTimestamp, arrayUnion, arrayRemove, increment,
    writeBatch, runTransaction, getCountFromServer,
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
  };
}

/* ── Lessons ────────────────────────────────────────────────────────────── */
const CHAPTERS = [
  'Getting Started',
  'Reading Data',
  'Updating & Deleting',
  'Querying',
  'Special Values',
  'Advanced',
  'Pagination & Aggregation',
  'Transactions & Batches',
  'Data Modeling',
  'Authentication',
  'Security Rules',
];

const LESSONS = [
  {
    id: 'add-document',
    chapter: 'Getting Started',
    title: 'Add your first document',
    concept: '`addDoc()` adds a new document to a collection with an auto-generated ID. You pass a CollectionRef (from `collection(db, "name")`) and a plain JavaScript object — Firestore stores it as a document.\n\nEach document lives at a path like `users/{autoId}`. The returned reference contains the generated `id` so you can refer to the document later.',
    code: `const usersCol = collection(db, 'users');

const ref = await addDoc(usersCol, {
  name: 'Alice',
  age: 28,
  role: 'engineer',
});

console.log('Added doc with id:', ref.id);
console.log('Path:', 'users/' + ref.id);`,
    takeaways: [
      '`addDoc()` auto-generates a unique document ID',
      'The first argument is a CollectionRef, not a string path',
      'The returned ref gives you the generated ID immediately',
    ],
  },
  {
    id: 'set-document',
    chapter: 'Getting Started',
    title: 'Set a document with a custom ID',
    concept: '`setDoc()` writes a document at a specific path you choose. Use `doc(db, "collection", "id")` to create a DocRef with a custom ID.\n\nUnlike `addDoc()`, `setDoc()` completely overwrites the document if it already exists — unless you pass `{ merge: true }` as the third argument.',
    code: `const laptopRef = doc(db, 'products', 'laptop-pro');

await setDoc(laptopRef, {
  name: 'Laptop Pro',
  price: 1299,
  inStock: true,
  tags: ['electronics', 'computers'],
});

console.log('Set document at products/laptop-pro');
console.log('Doc ID:', laptopRef.id);`,
    takeaways: [
      '`setDoc()` writes to a DocRef you specify — you control the ID',
      'Completely replaces any existing document at that path',
      'Pass `{ merge: true }` to only update supplied fields',
    ],
  },
  {
    id: 'get-document',
    chapter: 'Reading Data',
    title: 'Get a single document',
    concept: '`getDoc()` fetches a single document by its DocRef. It returns a `DocumentSnapshot` — check `.exists()` before calling `.data()` to avoid errors on missing documents.\n\nThis is a one-time read. For real-time updates use `onSnapshot()` instead.',
    code: `const ref = doc(db, 'users', 'user-1');

await setDoc(ref, {
  name: 'Bob',
  email: 'bob@example.com',
  plan: 'pro',
});

const snap = await getDoc(ref);

if (snap.exists()) {
  console.log('Document found:', snap.id);
  console.log('Data:', snap.data());
} else {
  console.log('No such document');
}`,
    takeaways: [
      '`getDoc()` returns a DocumentSnapshot, not the raw data',
      'Always call `.exists()` before `.data()` to handle missing docs',
      'Use `.id` on the snapshot to get the document ID',
    ],
  },
  {
    id: 'get-collection',
    chapter: 'Reading Data',
    title: 'Get all documents',
    concept: '`getDocs()` fetches all documents in a collection and returns a `QuerySnapshot`. Use `.docs` to get an array, `.forEach()` to iterate, and `.size` for the count.\n\nEach element in `.docs` is a DocumentSnapshot with `.id` and `.data()`.',
    code: `const tasksCol = collection(db, 'tasks');

await addDoc(tasksCol, { title: 'Buy groceries', done: false });
await addDoc(tasksCol, { title: 'Write report', done: true });
await addDoc(tasksCol, { title: 'Fix bug #42', done: false });

const snapshot = await getDocs(tasksCol);

console.log('Total tasks:', snapshot.size);

snapshot.forEach(doc => {
  console.log(doc.id, ':', doc.data().title, '|', doc.data().done ? 'done' : 'pending');
});`,
    takeaways: [
      '`getDocs()` reads all documents in a collection at once',
      '`.forEach()` iterates each DocumentSnapshot',
      'Each doc has `.id` (string) and `.data()` (plain object)',
    ],
  },
  {
    id: 'update-fields',
    chapter: 'Updating & Deleting',
    title: 'Update specific fields',
    concept: '`updateDoc()` merges new values into an existing document without touching other fields. Unlike `setDoc()`, it never replaces the whole document — only the keys you supply are changed.\n\nIf the document does not exist, `updateDoc()` throws an error in real Firestore (the simulator skips silently).',
    code: `const userRef = doc(db, 'users', 'alice');

await setDoc(userRef, {
  name: 'Alice',
  age: 28,
  plan: 'free',
  country: 'UK',
});

await updateDoc(userRef, {
  plan: 'pro',
  age: 29,
});

const snap = await getDoc(userRef);
const data = snap.data();

console.log('name:', data.name);   // unchanged
console.log('plan:', data.plan);   // updated to pro
console.log('age:', data.age);     // updated to 29
console.log('country:', data.country); // still UK`,
    takeaways: [
      '`updateDoc()` only changes the fields you pass — others are untouched',
      'Use it for partial updates; use `setDoc()` to replace everything',
      'Fields not mentioned in the update call remain exactly as they were',
    ],
  },
  {
    id: 'delete-document',
    chapter: 'Updating & Deleting',
    title: 'Delete a document',
    concept: '`deleteDoc()` removes a document from Firestore permanently. Pass the DocRef and the document is gone — subcollections under it are NOT automatically deleted in real Firestore (this simulator mirrors that behaviour).\n\nAfter deletion, `getDoc()` returns a snapshot where `.exists()` is false.',
    code: `const sessionsCol = collection(db, 'sessions');

const s1 = await addDoc(sessionsCol, { user: 'alice', active: true });
const s2 = await addDoc(sessionsCol, { user: 'bob', active: false });

console.log('Before delete — sessions:',
  (await getDocs(sessionsCol)).size
);

await deleteDoc(s1);

const after = await getDocs(sessionsCol);
console.log('After delete — sessions:', after.size);
after.forEach(d => console.log(' -', d.data().user));`,
    takeaways: [
      '`deleteDoc()` permanently removes the document at that path',
      'Subcollections under a deleted document are NOT removed automatically',
      'Post-deletion, `getDoc()` returns a snapshot where `.exists()` is false',
    ],
  },
  {
    id: 'query-where',
    chapter: 'Querying',
    title: 'Filter with where()',
    concept: '`query()` builds a query from a CollectionRef and one or more constraints. `where(field, op, value)` filters documents — the op can be `==`, `!=`, `<`, `<=`, `>`, `>=`, `in`, `not-in`, or `array-contains`.\n\nPass the query to `getDocs()` to execute it and receive a filtered QuerySnapshot.',
    code: `const productsCol = collection(db, 'products');

await addDoc(productsCol, { name: 'Laptop',   category: 'electronics', price: 999 });
await addDoc(productsCol, { name: 'Phone',    category: 'electronics', price: 699 });
await addDoc(productsCol, { name: 'T-Shirt',  category: 'clothing',    price: 29  });
await addDoc(productsCol, { name: 'Jeans',    category: 'clothing',    price: 59  });

const q = query(
  productsCol,
  where('category', '==', 'electronics')
);

const snap = await getDocs(q);

console.log('Electronics found:', snap.size);
snap.forEach(d => {
  console.log(' -', d.data().name, '| $' + d.data().price);
});`,
    takeaways: [
      '`query()` does not execute — it builds a query descriptor',
      '`where()` filters documents whose field matches the op and value',
      'Pass the query to `getDocs()` to get the filtered results',
    ],
  },
  {
    id: 'query-order-limit',
    chapter: 'Querying',
    title: 'Sort and limit results',
    concept: '`orderBy(field, direction)` sorts results by a field — direction is `"asc"` (default) or `"desc"`. `limit(n)` caps the number of results returned.\n\nCombine constraints in `query()`: filters are applied first, then ordering, then the limit.',
    code: `const scoresCol = collection(db, 'scores');

await addDoc(scoresCol, { player: 'Alice', score: 8200 });
await addDoc(scoresCol, { player: 'Bob',   score: 9500 });
await addDoc(scoresCol, { player: 'Carol', score: 7100 });
await addDoc(scoresCol, { player: 'Dave',  score: 8800 });
await addDoc(scoresCol, { player: 'Eve',   score: 9100 });

const q = query(
  scoresCol,
  orderBy('score', 'desc'),
  limit(3)
);

const snap = await getDocs(q);

console.log('Top 3 scores:');
snap.forEach(d => {
  const { player, score } = d.data();
  console.log(' ', player, ':', score);
});`,
    takeaways: [
      '`orderBy("field", "desc")` sorts highest-first',
      '`limit(n)` keeps only the first n documents after sorting',
      'Multiple constraints can be combined in a single `query()` call',
    ],
  },
  {
    id: 'server-timestamp',
    chapter: 'Special Values',
    title: 'serverTimestamp and increment',
    concept: '`serverTimestamp()` is replaced by the server\'s current time when the write lands — not the client\'s clock. Use it for `createdAt` and `updatedAt` fields.\n\n`increment(n)` atomically adds `n` to an existing number field, making it safe for counters without read-modify-write race conditions.',
    code: `const postRef = doc(db, 'posts', 'post-1');

await setDoc(postRef, {
  title: 'Hello Firestore',
  views: 0,
  createdAt: serverTimestamp(),
});

await updateDoc(postRef, { views: increment(1) });
await updateDoc(postRef, { views: increment(1) });

const snap = await getDoc(postRef);
const data = snap.data();

console.log('title:', data.title);
console.log('views:', data.views);       // 2
console.log('createdAt:', data.createdAt);`,
    takeaways: [
      '`serverTimestamp()` resolves to the server time on write — not `Date.now()`',
      '`increment(n)` atomically adjusts a number — safe for concurrent updates',
      'Both work inside `setDoc()` and `updateDoc()`',
    ],
  },
  {
    id: 'array-union-remove',
    chapter: 'Special Values',
    title: 'arrayUnion and arrayRemove',
    concept: '`arrayUnion(...items)` adds items to an array field only if they are not already present — preventing duplicates. `arrayRemove(...items)` removes specific values from an array.\n\nBoth are atomic operations: safe to call from multiple clients simultaneously without read-modify-write cycles.',
    code: `const tagRef = doc(db, 'articles', 'article-1');

await setDoc(tagRef, {
  title: 'Firestore Tips',
  tags: ['firebase', 'nosql'],
});

// Add 'realtime' and try to add 'firebase' again (no duplicate)
await updateDoc(tagRef, {
  tags: arrayUnion('realtime', 'firebase'),
});

const after1 = (await getDoc(tagRef)).data();
console.log('After union:', after1.tags);

// Remove 'nosql'
await updateDoc(tagRef, {
  tags: arrayRemove('nosql'),
});

const after2 = (await getDoc(tagRef)).data();
console.log('After remove:', after2.tags);`,
    takeaways: [
      '`arrayUnion()` prevents duplicates — adding an existing item is a no-op',
      '`arrayRemove()` removes every occurrence of the value from the array',
      'Both are atomic — no race conditions compared to a manual read-then-write',
    ],
  },
  {
    id: 'on-snapshot',
    chapter: 'Advanced',
    title: 'Listen with onSnapshot()',
    concept: '`onSnapshot()` subscribes to real-time updates. It fires the callback immediately with the current state, then again whenever the document or collection changes.\n\nIt returns an unsubscribe function — call it to stop listening and avoid memory leaks. In this simulator, the callback fires once with the current state.',
    code: `const configRef = doc(db, 'config', 'app');

await setDoc(configRef, {
  theme: 'light',
  version: '1.0.0',
  maintenance: false,
});

const unsubscribe = onSnapshot(configRef, (snap) => {
  if (snap.exists()) {
    console.log('Config snapshot:', snap.data());
  } else {
    console.log('Config document does not exist');
  }
});

// In real Firestore this callback fires again on every change.
// The unsubscribe function stops the listener.
unsubscribe();
console.log('Listener unsubscribed');`,
    takeaways: [
      '`onSnapshot()` fires immediately with the current state, then on every change',
      'Always call the returned unsubscribe function when done to avoid memory leaks',
      'Use it for live dashboards, chat messages, and real-time counters',
    ],
  },
  {
    id: 'subcollections',
    chapter: 'Advanced',
    title: 'Work with subcollections',
    concept: 'Subcollections are collections nested inside a document. Use `collection(docRef, "name")` to get a subcollection reference, then `addDoc()` or `setDoc()` as usual.\n\nSubcollections keep related data together (e.g. posts and their comments) while keeping top-level collections clean and query-efficient.',
    code: `const postRef = doc(db, 'posts', 'post-1');

await setDoc(postRef, {
  title: 'Learning Firestore',
  author: 'Alice',
});

const commentsCol = collection(postRef, 'comments');

await addDoc(commentsCol, { author: 'Bob',   text: 'Great post!' });
await addDoc(commentsCol, { author: 'Carol', text: 'Very helpful.' });

const snap = await getDocs(commentsCol);

console.log('Post:', (await getDoc(postRef)).data().title);
console.log('Comments (' + snap.size + '):');
snap.forEach(d => {
  const { author, text } = d.data();
  console.log(' -', author + ':', text);
});`,
    takeaways: [
      'Pass a DocRef as the first argument to `collection()` to create a subcollection ref',
      'Subcollections do not affect the parent document\'s read size or billing',
      'Use subcollections for one-to-many relationships like posts → comments',
    ],
  },

  /* ── Pagination & Aggregation ── */
  {
    id: 'cursor-pagination',
    chapter: 'Pagination & Aggregation',
    title: 'Paginate with orderBy, startAfter & limit',
    concept: 'Firestore paginates with cursors, not offsets. Order the collection, take a page with `limit(n)`, then fetch the next page with `startAfter(lastValue)`.\n\nCursor pagination is stable and efficient even on huge collections — you pass the last document (or its sort value) as the cursor for the next page.',
    code: `// Seed five ordered posts
for (let i = 1; i <= 5; i++) {
  await setDoc(doc(db, 'posts', 'p' + i), { title: 'Post ' + i, order: i });
}

// Page 1 — first two by 'order'
const page1 = await getDocs(
  query(collection(db, 'posts'), orderBy('order'), limit(2))
);
console.log('Page 1:', page1.docs.map(d => d.data().title));

// Page 2 — start after the last doc of page 1
const lastOrder = page1.docs[page1.docs.length - 1].data().order;
const page2 = await getDocs(
  query(collection(db, 'posts'), orderBy('order'), startAfter(lastOrder), limit(2))
);
console.log('Page 2:', page2.docs.map(d => d.data().title));`,
    takeaways: [
      'Firestore paginates with cursors (`startAfter`), not numeric offsets',
      'Always `orderBy` a field before using `startAfter`',
      'Cursors stay correct even as documents are added or removed',
    ],
  },
  {
    id: 'aggregation-count',
    chapter: 'Pagination & Aggregation',
    title: 'Count documents with getCountFromServer',
    concept: 'Reading every document just to count them is slow and expensive. `getCountFromServer()` returns the count of a collection or query without downloading the documents.\n\nPass a collection or a `query(...)` with `where` filters to count a subset. The result is read with `snap.data().count`.',
    code: `for (let i = 1; i <= 4; i++) {
  await setDoc(doc(db, 'tasks', 't' + i), { title: 'Task ' + i, done: i % 2 === 0 });
}

const total = await getCountFromServer(collection(db, 'tasks'));
console.log('Total tasks:', total.data().count);

const done = await getCountFromServer(
  query(collection(db, 'tasks'), where('done', '==', true))
);
console.log('Done tasks:', done.data().count);`,
    takeaways: [
      '`getCountFromServer()` counts without downloading documents',
      'Pass a `query(...)` to count a filtered subset',
      'Read the result with `snap.data().count`',
    ],
  },

  /* ── Transactions & Batches ── */
  {
    id: 'batched-writes',
    chapter: 'Transactions & Batches',
    title: 'Batched writes — all or nothing',
    concept: 'A batch groups up to 500 writes that commit atomically: either every write succeeds, or none do. Use it to keep related documents consistent (e.g. moving money between accounts).\n\nQueue `set`, `update`, and `delete` on the batch, then call `commit()`. Nothing is written until commit runs.',
    code: `const batch = writeBatch(db);

batch.set(doc(db, 'accounts', 'a'), { balance: 100 });
batch.set(doc(db, 'accounts', 'b'), { balance: 50 });

// Transfer 30 from A to B — both updates in one atomic commit
batch.update(doc(db, 'accounts', 'a'), { balance: increment(-30) });
batch.update(doc(db, 'accounts', 'b'), { balance: increment(30) });

const count = await batch.commit();
console.log('Committed', count, 'writes');

const a = await getDoc(doc(db, 'accounts', 'a'));
const b = await getDoc(doc(db, 'accounts', 'b'));
console.log('A:', a.data().balance, 'B:', b.data().balance);`,
    takeaways: [
      'A batch commits every write atomically — all or nothing',
      'Queue `set`/`update`/`delete`, then call `commit()`',
      'Use it to keep related documents consistent',
    ],
  },
  {
    id: 'transactions',
    chapter: 'Transactions & Batches',
    title: 'Transactions — safe read-then-write',
    concept: 'A transaction reads documents and writes based on what it read, atomically. If another client changes the data first, Firestore retries the transaction. Use it for counters, inventory, and any "read the current value, then update it" logic.\n\nInside `runTransaction`, always `tx.get()` before `tx.update()` — never read outside the transaction.',
    code: `await setDoc(doc(db, 'counters', 'visits'), { count: 0 });

await runTransaction(db, async (tx) => {
  const snap = await tx.get(doc(db, 'counters', 'visits'));
  const current = snap.data().count;
  tx.update(doc(db, 'counters', 'visits'), { count: current + 1 });
});

const after = await getDoc(doc(db, 'counters', 'visits'));
console.log('Count after transaction:', after.data().count);`,
    takeaways: [
      'Transactions read, then write atomically based on the read',
      'Firestore retries automatically if the data changed mid-transaction',
      'Always `tx.get()` inside the transaction before writing',
    ],
  },

  /* ── Data Modeling ── */
  {
    id: 'denormalization',
    chapter: 'Data Modeling',
    title: 'Denormalize to avoid extra reads',
    concept: 'Firestore has no JOINs, so you model data for the reads you make. Denormalization copies a small piece of related data (like an author name) onto a document, so rendering it needs no second read.\n\nThe tradeoff: when the source changes you update the copies (often with a batch). For read-heavy apps this is usually the right call.',
    code: `await setDoc(doc(db, 'users', 'u1'), { name: 'Alice' });

// Store authorName ON the post — no second read needed to display it
await setDoc(doc(db, 'posts', 'p1'), {
  title: 'GraphQL vs REST',
  authorId: 'u1',
  authorName: 'Alice',
});

const post = await getDoc(doc(db, 'posts', 'p1'));
console.log(post.data().title, '—', post.data().authorName);
console.log('Rendered with ONE read, no JOIN needed.');`,
    takeaways: [
      'Firestore has no JOINs — model data for your read patterns',
      'Denormalize hot fields to avoid extra reads',
      'Update the copies (via a batch) when the source changes',
    ],
  },
  {
    id: 'one-to-many',
    chapter: 'Data Modeling',
    title: 'One-to-many: subcollection vs array',
    concept: 'For one-to-many relationships you choose between an array field and a subcollection. Use an **array** for small, bounded lists (a post\'s tags). Use a **subcollection** for large or unbounded lists you need to query or paginate (a post\'s comments).\n\nArrays load with the parent document; subcollections are read separately and can be queried independently.',
    code: `// Small bounded list → array field
await setDoc(doc(db, 'posts', 'p1'), {
  title: 'Modeling in Firestore',
  tags: ['firestore', 'nosql', 'modeling'],
});

// Large/unbounded list → subcollection (queryable, paginatable)
const post = doc(db, 'posts', 'p1');
await addDoc(collection(post, 'comments'), { text: 'First!' });
await addDoc(collection(post, 'comments'), { text: 'Great write-up' });

const p = await getDoc(post);
console.log('Tags (array):', p.data().tags);
const comments = await getDocs(collection(post, 'comments'));
console.log('Comments (subcollection):', comments.size);`,
    takeaways: [
      'Arrays suit small, bounded lists that load with the parent',
      'Subcollections suit large lists you query or paginate',
      'Match the structure to how you read the data',
    ],
  },

  /* ── Authentication ── */
  {
    id: 'auth-signup',
    chapter: 'Authentication',
    title: 'Sign users up with email & password',
    concept: 'Firebase Authentication manages users for you. `createUserWithEmailAndPassword(auth, email, password)` registers a new user and signs them in — the returned `user` has a unique `uid` you use as the key for their data.\n\nFirebase enforces a minimum password length and rejects duplicate emails. (This playground models the same rules.)',
    code: `const auth = getAuth();

const cred = await createUserWithEmailAndPassword(
  auth, 'alice@example.com', 'secret123'
);

console.log('Created user:', cred.user.email);
console.log('uid:', cred.user.uid);
console.log('Current user:', auth.currentUser.email);`,
    takeaways: [
      '`createUserWithEmailAndPassword` registers and signs in a user',
      'Each user gets a unique `uid` — use it to key their data',
      'Firebase rejects weak passwords and duplicate emails',
    ],
  },
  {
    id: 'auth-signin',
    chapter: 'Authentication',
    title: 'Sign in, sign out & handle errors',
    concept: 'Returning users sign in with `signInWithEmailAndPassword`. Wrong credentials reject with an error code like `auth/invalid-credential` — always wrap sign-in in try/catch and show a friendly message.\n\n`signOut(auth)` clears the current user.',
    code: `const auth = getAuth();
await createUserWithEmailAndPassword(auth, 'bob@example.com', 'hunter2!');
await signOut(auth);
console.log('After sign out, currentUser =', auth.currentUser);

const cred = await signInWithEmailAndPassword(auth, 'bob@example.com', 'hunter2!');
console.log('Signed in as:', cred.user.email);

try {
  await signInWithEmailAndPassword(auth, 'bob@example.com', 'wrongpass');
} catch (e) {
  console.log('Rejected:', e.message);
}`,
    takeaways: [
      'Sign in with `signInWithEmailAndPassword`',
      'Wrong credentials throw an `auth/...` error — catch it',
      '`signOut(auth)` clears the current user',
    ],
  },
  {
    id: 'auth-state',
    chapter: 'Authentication',
    title: 'React to auth state changes',
    concept: '`onAuthStateChanged(auth, callback)` fires whenever a user signs in or out — and immediately with the current state. This is how apps show the right UI (login screen vs dashboard) and guard protected pages.\n\nIt returns an unsubscribe function; call it when the listener is no longer needed.',
    code: `const auth = getAuth();

const unsub = onAuthStateChanged(auth, (user) => {
  console.log('Auth state:', user ? 'signed in as ' + user.email : 'signed out');
});

await createUserWithEmailAndPassword(auth, 'carol@example.com', 'pass1234');
await signOut(auth);

unsub();`,
    takeaways: [
      '`onAuthStateChanged` fires on every sign-in and sign-out',
      'It fires immediately with the current state on registration',
      'Use it to switch UI and guard protected routes',
    ],
  },

  /* ── Security Rules ── */
  {
    id: 'rules-basics',
    chapter: 'Security Rules',
    title: 'Security rules: ownership checks',
    concept: 'Client SDK calls are only as safe as your **Security Rules** — they run on Google\'s servers and decide who can read or write each document. Rules live in `firestore.rules`, not in JS, so this lesson shows the real rule and models its logic in JavaScript you can run.\n\nThe golden rule: never trust the client. Enforce ownership on the server with `request.auth`.',
    code: `// firestore.rules (runs on Firebase servers, not in JS):
//
//   match /posts/{postId} {
//     allow read: if true;                          // public read
//     allow create: if request.auth != null;        // must be signed in
//     allow update, delete:
//       if request.auth.uid == resource.data.ownerId; // owner only
//   }
//
// The same logic, modeled in JS so you can run it:
function canModify(auth, doc) {
  return auth !== null && auth.uid === doc.ownerId;
}

const post = { ownerId: 'u1', title: 'Hello' };
console.log('owner can edit:   ', canModify({ uid: 'u1' }, post));
console.log('stranger can edit:', canModify({ uid: 'u2' }, post));
console.log('guest can edit:   ', canModify(null, post));`,
    takeaways: [
      'Security Rules run on Firebase servers — the client is never trusted',
      'Use `request.auth` to enforce sign-in and ownership',
      'Owner-only writes: `request.auth.uid == resource.data.ownerId`',
    ],
  },
  {
    id: 'rules-validation',
    chapter: 'Security Rules',
    title: 'Security rules: validating data',
    concept: 'Rules also validate the shape of incoming data so clients can\'t write garbage or tamper with fields like `likes`. You assert types, lengths, and exact values on `request.resource.data`.\n\nBelow is a realistic validation rule and the equivalent JS check you can run.',
    code: `// firestore.rules:
//
//   allow create: if request.resource.data.title is string
//      && request.resource.data.title.size() > 0
//      && request.resource.data.title.size() <= 100
//      && request.resource.data.likes == 0;
//
// Modeled in JS:
function validNewPost(data) {
  return typeof data.title === 'string'
    && data.title.length > 0
    && data.title.length <= 100
    && data.likes === 0;
}

console.log('valid post:    ', validNewPost({ title: 'Hello', likes: 0 }));
console.log('title too long:', validNewPost({ title: 'x'.repeat(101), likes: 0 }));
console.log('forged likes:  ', validNewPost({ title: 'Hi', likes: 999 }));`,
    takeaways: [
      'Rules validate types, lengths, and exact values on writes',
      'Lock fields like `likes` to a starting value so clients can\'t forge them',
      'Validation lives on `request.resource.data`',
    ],
  },
];

/* ── FirestoreTree component ────────────────────────────────────────────── */
function formatValue(v) {
  if (v === null) return { text: 'null', cls: s.valNull };
  if (typeof v === 'boolean') return { text: String(v), cls: s.valBool };
  if (typeof v === 'number') return { text: String(v), cls: s.valNum };
  if (typeof v === 'string') {
    const display = v.length > 60 ? '"' + v.slice(0, 57) + '..."' : '"' + v + '"';
    return { text: display, cls: s.valStr };
  }
  if (Array.isArray(v)) return { text: '[' + v.map(x => typeof x === 'string' ? '"' + x + '"' : String(x)).join(', ') + ']', cls: s.valArr };
  return { text: JSON.stringify(v), cls: s.valStr };
}

function DocNode({ id, data, subcols }) {
  const [open, setOpen] = useState(true);
  const fields = data ? Object.entries(data) : [];
  const subcolNames = subcols ? Object.keys(subcols) : [];
  return (
    <div className={s.docNode}>
      <div className={s.docHeader} onClick={() => setOpen(v => !v)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={s.docIcon}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        </svg>
        <span className={s.docId}>{id}</span>
        <svg className={s.chevron + (open ? ' ' + s.chevronOpen : '')} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className={s.docBody}>
          {fields.map(([k, v]) => {
            const { text, cls } = formatValue(v);
            return (
              <div key={k} className={s.fieldRow}>
                <span className={s.fieldKey}>{k}</span>
                <span className={s.fieldSep}>:</span>
                <span className={cls}>{text}</span>
              </div>
            );
          })}
          {fields.length === 0 && <div className={s.emptyDoc}>(empty)</div>}
          {subcolNames.map(col => (
            <ColNode key={col} name={col} colData={subcols[col]} indent />
          ))}
        </div>
      )}
    </div>
  );
}

function ColNode({ name, colData, indent }) {
  const [open, setOpen] = useState(true);
  const docs = colData._docs ? Object.entries(colData._docs) : [];
  return (
    <div className={indent ? s.subColNode : s.colNode}>
      <div className={s.colHeader} onClick={() => setOpen(v => !v)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={s.colIcon}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <span className={s.colName}>{name}</span>
        <span className={s.colCount}>{docs.length}</span>
        <svg className={s.chevron + (open ? ' ' + s.chevronOpen : '')} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className={s.colBody}>
          {docs.length === 0 && <div className={s.emptyDoc}>(no documents)</div>}
          {docs.map(([docId, docNode]) => (
            <DocNode key={docId} id={docId} data={docNode._data} subcols={docNode._subcols} />
          ))}
        </div>
      )}
    </div>
  );
}

function FirestoreTree({ tree }) {
  const cols = Object.entries(tree || {});
  if (cols.length === 0) {
    return <div className={s.treeEmpty}>Run the code to see the Firestore state</div>;
  }
  return (
    <div className={s.tree}>
      {cols.map(([name, colData]) => (
        <ColNode key={name} name={name} colData={colData} />
      ))}
    </div>
  );
}

/* ── ConceptText ────────────────────────────────────────────────────────── */
function ConceptText({ text }) {
  return (
    <>
      {text.split('\n\n').map((para, pi) => {
        const parts = para.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return (
          <p key={pi}>
            {parts.map((part, i) => {
              if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
              return part;
            })}
          </p>
        );
      })}
    </>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function FirebasePlaygroundTool() {
  const [lessonId, setLessonId] = useState(LESSONS[0].id);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [dbTree, setDbTree] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [code, setCode] = useState(LESSONS[0].code);

  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const activeIdx = LESSONS.findIndex(l => l.id === lessonId);

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m) setSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_LESSON);
      if (saved && LESSONS.find(l => l.id === saved)) setLessonId(saved);
    } catch {}
  }, []);

  const selectLesson = useCallback((id) => {
    const l = LESSONS.find(x => x.id === id);
    setLessonId(id);
    setCode(l ? l.code : '');
    setLogs([]);
    setError('');
    setDbTree({});
    try { localStorage.setItem(LS_LESSON, id); } catch {}
  }, []);

  const runCode = useCallback(async () => {
    setRunning(true);
    setLogs([]);
    setError('');
    setDbTree({});

    const db = new FirestoreDB();
    const api = makeAPI(db);
    const captured = [];

    const fakeConsole = {
      log: (...args) => {
        captured.push(args.map(a => {
          if (typeof a === 'object' && a !== null) {
            try { return JSON.stringify(a, null, 2); } catch { return String(a); }
          }
          return String(a);
        }).join(' '));
      },
      error: (...args) => captured.push('[error] ' + args.join(' ')),
      warn: (...args) => captured.push('[warn] ' + args.join(' ')),
    };

    try {
      const keys = Object.keys(api);
      const vals = Object.values(api);
      // eslint-disable-next-line no-new-func
      const fn = new Function('db', ...keys, 'console', `return (async () => {\n${code}\n})()`);
      await fn(db, ...vals, fakeConsole);
      setLogs(captured);
      setDbTree(db.toTree());
    } catch (err) {
      setLogs(captured);
      setError(err.message || 'Execution error');
    } finally {
      setRunning(false);
    }
  }, [code]);

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  }, [runCode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="firebase-playground" />
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/firebase-playground.svg" width={22} height={22} alt="" />
          <span className={s.headerTitle}>Firebase <span className={s.accent}>Playground</span></span>
          <span className={s.headerSub}>Firestore simulator · {LESSONS.length} lessons · No account needed</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.lessonBadge}>{activeIdx + 1} / {LESSONS.length}</span>
        </div>
      </header>

      {/* Body */}
      <div className={s.body}>
        {/* Sidebar */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarDot} />
              Firestore
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
          <div className={s.lessonList}>
            {CHAPTERS.map(ch => (
              <div key={ch}>
                <div className={s.chapterLabel}>{ch}</div>
                {LESSONS.filter(l => l.chapter === ch).map(l => (
                  <button
                    key={l.id}
                    className={s.lessonBtn + (l.id === lessonId ? ' ' + s.lessonBtnActive : '')}
                    onClick={() => selectLesson(l.id)}
                  >
                    <span className={s.lessonDot} />
                    {l.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        {/* Center */}
        <div className={s.main}>
          <PlaygroundTopAd />
          {/* Concept */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(v => !v)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg className={s.conceptChevron + (conceptOpen ? ' ' + s.conceptChevronOpen : '')} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
              </div>
            )}
          </div>

          {/* Code + Console */}
          <div className={s.codeSection}>
            <div className={s.codePaneHeader}>
              <span className={s.paneLabel}>Lesson Code</span>
              <div className={s.paneActions}>
                <button
                  className={s.resetBtn}
                  onClick={() => setCode(lesson.code)}
                  title="Reset to original"
                >Reset</button>
                <button
                  className={s.runBtn}
                  onClick={runCode}
                  disabled={running}
                  title="Run (Ctrl+Enter)"
                >
                  {running ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={s.spin}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="8" />
                    </svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                  {running ? 'Running…' : 'Run'}
                </button>
                <span className={s.hintKey}>Ctrl+Enter</span>
              </div>
            </div>
            <textarea
              className={s.codeEditor}
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
            />

            {/* Console */}
            <div className={s.consolePanel}>
              <div className={s.consoleHeader}>
                <span className={s.paneLabel}>Console Output</span>
                {(logs.length > 0 || error) && (
                  <button className={s.clearBtn} onClick={() => { setLogs([]); setError(''); setDbTree({}); }}>Clear</button>
                )}
              </div>
              <div className={s.consoleBody}>
                {logs.length === 0 && !error && (
                  <div className={s.consolePlaceholder}>Click Run to execute the code</div>
                )}
                {logs.map((line, i) => (
                  <div key={i} className={s.consoleLine}>
                    <span className={s.lineNum}>{i + 1}</span>
                    <span className={s.lineText}>{line}</span>
                  </div>
                ))}
                {error && (
                  <div className={s.consoleError}>
                    <span className={s.lineNum}>!</span>
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Takeaways */}
          <div className={s.takeaways}>
            <div className={s.takeawaysLabel}>Key takeaways</div>
            <ul className={s.takeawaysList}>
              {lesson.takeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          {/* Nav footer */}
          <div className={s.navFooter}>
            <button
              className={s.navBtn}
              disabled={activeIdx === 0}
              onClick={() => selectLesson(LESSONS[activeIdx - 1].id)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <span className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</span>
            <button
              className={s.navBtn}
              disabled={activeIdx === LESSONS.length - 1}
              onClick={() => selectLesson(LESSONS[activeIdx + 1].id)}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right panel — Firestore tree */}
        {!isMobile && (
          <aside className={s.treePanel}>
            <div className={s.treePanelHeader}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
              <span>Firestore State</span>
            </div>
            <div className={s.treeBody}>
              <FirestoreTree tree={dbTree} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
