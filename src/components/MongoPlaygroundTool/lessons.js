/* ── MongoDB Playground — Lessons & Chapters ────────────────────────────────
   32 lessons across 10 chapters.
   Every lesson code string is plain JS — no template literal interpolation.
   ──────────────────────────────────────────────────────────────────────────── */

export const CHAPTERS = [
  'Getting Started',
  'Comparison Operators',
  'Logical Operators',
  'Projection',
  'Sort, Limit & Skip',
  'Array Queries',
  'Update Operations',
  'Delete & Insert',
  'Aggregation Basics',
  'Advanced Aggregation',
  'Modeling & Production',
];

export const LESSONS = [

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 1: Getting Started
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'intro-collections',
    chapter: 'Getting Started',
    title: 'Collections and Documents',
    concept: 'MongoDB stores data in **collections** — similar to tables in a relational database. Each item in a collection is a **document**, which is a JSON object with flexible fields. Unlike SQL rows, two documents in the same collection can have completely different shapes.\n\nIn this playground, `db` is your database object with four collections: `employees`, `products`, `orders`, and `reviews`. Call `db.employees.find()` with no arguments to return every document in the collection — the equivalent of `SELECT * FROM employees` in SQL.\n\nDocuments always have an `_id` field that uniquely identifies them. The playground auto-assigns numeric IDs, but in real MongoDB `_id` is usually a 12-byte `ObjectId`.',
    code: 'return db.employees.find()',
    challenge: {
      question: 'What is the MongoDB equivalent of a SQL table?',
      options: ['Document', 'Collection', 'Schema', 'Record'],
      correct: 1,
    },
  },

  {
    id: 'find-filter',
    chapter: 'Getting Started',
    title: 'Filtering with find()',
    concept: '`find(filter)` returns all documents that match the filter object. Each key in the filter is a field name and each value is the exact value that field must equal — this is an **implicit $eq** match.\n\nYou can filter on any field including nested ones using dot notation. MongoDB checks each document in the collection and returns only those where all filter conditions are satisfied.\n\nThe result is a **cursor** — a lazy iterator over the matched documents. Call `.toArray()` to get all results as an array, or chain `.sort()`, `.limit()`, and `.skip()` before materialising.',
    code: 'return db.employees.find({ dept: "Engineering" })',
    challenge: {
      question: 'What does db.employees.find({ dept: "Sales" }) return?',
      options: [
        'Only the first Sales employee',
        'All employees in the Sales department',
        'A count of Sales employees',
        'An error — find() needs an operator',
      ],
      correct: 1,
    },
  },

  {
    id: 'findone',
    chapter: 'Getting Started',
    title: 'findOne — Single Document',
    concept: '`findOne(filter)` returns the first document that matches the filter, or `null` if no document matches. Unlike `find()`, it returns the document directly — not a cursor.\n\nUse `findOne` when you know there will be exactly one result, such as looking up a document by its unique `_id` or by a unique field like name. It is more efficient than `find().limit(1).toArray()[0]` because it stops scanning as soon as it finds the first match.\n\nAlways check for `null` in production code — `findOne` returning null is the normal case when a document does not exist.',
    code: 'return db.employees.findOne({ name: "Alice Chen" })',
    challenge: {
      question: 'What does findOne() return when no document matches the filter?',
      options: ['An empty array []', 'An empty object {}', 'null', 'undefined'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 2: Comparison Operators
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'gt-lt',
    chapter: 'Comparison Operators',
    title: '$gt, $lt, $gte, $lte',
    concept: 'MongoDB comparison operators use a **nested object syntax**: `{ field: { $operator: value } }`. The four range operators are `$gt` (greater than), `$gte` (greater than or equal), `$lt` (less than), and `$lte` (less than or equal).\n\nThese operators work on numbers, strings (lexicographic), and dates. You can combine them on the same field in a single object — `{ salary: { $gt: 80000, $lt: 120000 } }` means salary between 80,000 and 120,000 exclusive.\n\nRange queries are one of the most common patterns in MongoDB — use them to filter products by price, users by age, orders by date, and much more.',
    code: 'return db.employees.find({ salary: { $gt: 90000 } })',
    challenge: {
      question: 'Which query finds employees with salary between 70,000 and 100,000 (inclusive)?',
      options: [
        '{ salary: { $gt: 70000, $lt: 100000 } }',
        '{ salary: { $gte: 70000, $lte: 100000 } }',
        '{ salary: { $between: [70000, 100000] } }',
        '{ salary: 70000..100000 }',
      ],
      correct: 1,
    },
  },

  {
    id: 'eq-ne',
    chapter: 'Comparison Operators',
    title: '$eq and $ne',
    concept: '`$eq` explicitly tests for equality — `{ field: { $eq: value } }` is exactly the same as the implicit `{ field: value }`. You rarely need to write `$eq` explicitly, but it is useful inside `$not` expressions or when building queries programmatically.\n\n`$ne` (not equal) finds documents where the field does NOT equal the specified value. It also matches documents where the field does not exist at all — combine with `$exists: true` if you only want documents that have the field but with a different value.\n\nFor boolean fields, `{ inStock: true }` is cleaner than `{ inStock: { $eq: true } }`, but both are identical.',
    code: 'return db.products.find({ inStock: { $ne: false } })',
    challenge: {
      question: 'What does { verified: { $ne: true } } match in the reviews collection?',
      options: [
        'Only reviews where verified is false',
        'Reviews where verified is false OR verified field does not exist',
        'Nothing — $ne requires a number',
        'Reviews where verified is null',
      ],
      correct: 1,
    },
  },

  {
    id: 'in-nin',
    chapter: 'Comparison Operators',
    title: '$in and $nin',
    concept: '`$in` matches documents where the field equals any value in a provided array — like SQL\'s `IN (...)` clause. `{ dept: { $in: ["Engineering", "Design"] } }` returns employees in either department.\n\n`$nin` (not in) is the complement — it returns documents where the field matches none of the values in the array.\n\nWhen used against array fields, `$in` checks if any element of the document\'s array matches any value in the operator\'s array — making it very useful for tag-based filtering. `{ skills: { $in: ["Python", "Go"] } }` returns employees who know Python OR Go.',
    code: 'return db.employees.find({ dept: { $in: ["Engineering", "Design"] } })',
    challenge: {
      question: 'What does { status: { $nin: ["cancelled", "pending"] } } return?',
      options: [
        'Orders with status cancelled or pending',
        'Orders where status is not cancelled and not pending',
        'Orders with no status field',
        'An error — $nin takes an object, not an array',
      ],
      correct: 1,
    },
  },

  {
    id: 'comparison-combine',
    chapter: 'Comparison Operators',
    title: 'Combining Operators',
    concept: 'You can place multiple comparison operators on the same field in a single filter object. `{ salary: { $gte: 70000, $lte: 100000 } }` creates an implicit AND — both conditions must be true.\n\nYou can also combine conditions across multiple fields in the same filter object: `{ dept: "Engineering", salary: { $gt: 90000 } }` finds engineers earning over 90,000. All conditions in a filter object must match for a document to be returned.\n\nThis flat multi-field syntax is an implicit `$and`. For more complex logic involving OR conditions across fields, use the explicit `$or` and `$and` logical operators.',
    code: 'return db.employees.find({ salary: { $gte: 70000, $lte: 100000 } })',
    challenge: {
      question: 'What does find({ age: { $gte: 30 }, remote: true }) return?',
      options: [
        'Employees aged 30 or more, OR who work remotely',
        'Employees aged 30 or more AND who work remotely',
        'Only remote employees regardless of age',
        'An error — cannot combine field conditions',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 3: Logical Operators
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'and-operator',
    chapter: 'Logical Operators',
    title: '$and — Explicit AND',
    concept: '`$and` takes an array of filter conditions and matches documents that satisfy ALL of them. The syntax is `{ $and: [ condition1, condition2, ... ] }`.\n\nThe explicit `$and` is useful when you need multiple conditions on the same field that cannot be expressed in a single object (e.g., two `$regex` checks on the same field), or when building query objects programmatically by pushing conditions into an array.\n\nFor most simple cases the implicit AND — placing all conditions in the same filter object — is shorter and equivalent. Prefer implicit AND unless the explicit form is needed.',
    code: 'return db.employees.find({ $and: [{ dept: "Engineering" }, { remote: true }] })',
    challenge: {
      question: 'When is explicit $and required instead of implicit AND?',
      options: [
        'Always — implicit AND is not valid MongoDB',
        'When combining conditions on two different fields',
        'When applying two conditions to the same field that would conflict as a single object key',
        '$and and implicit AND are completely interchangeable in all cases',
      ],
      correct: 2,
    },
  },

  {
    id: 'or-operator',
    chapter: 'Logical Operators',
    title: '$or — Either Condition',
    concept: '`$or` takes an array of filter conditions and matches documents that satisfy AT LEAST ONE of them. The syntax is `{ $or: [ condition1, condition2, ... ] }`. Unlike implicit AND, `$or` cannot be expressed with a flat object.\n\nYou can combine `$or` with other conditions in the same filter: `{ dept: "Engineering", $or: [{ remote: true }, { salary: { $gt: 100000 } }] }` finds engineers who are remote OR earn over 100,000.\n\n`$or` conditions can be as complex as full nested filter objects — each element of the `$or` array is a complete query filter in its own right.',
    code: 'return db.employees.find({ $or: [{ dept: "Sales" }, { salary: { $lt: 70000 } }] })',
    challenge: {
      question: 'How many conditions can a $or array contain?',
      options: [
        'Exactly 2',
        'Up to 5',
        'Up to 10',
        'Any number — $or accepts an array of any length',
      ],
      correct: 3,
    },
  },

  {
    id: 'nor-not',
    chapter: 'Logical Operators',
    title: '$nor and $not',
    concept: '`$nor` matches documents that fail ALL conditions in its array — the inverse of `$or`. `{ $nor: [{ dept: "Sales" }, { remote: false }] }` finds employees who are NOT in Sales AND NOT non-remote (i.e., non-Sales remote workers).\n\n`$not` negates a single condition on a field: `{ salary: { $not: { $gt: 100000 } } }` is equivalent to `{ salary: { $lte: 100000 } }`. It must wrap an operator expression — `$not: { $eq: ... }` works but `$not: value` does not.\n\nFor boolean-like negation on a full filter, `$nor` is usually cleaner. Use `$not` when you want to invert a specific operator on a single field.',
    code: 'return db.employees.find({ $nor: [{ dept: "Sales" }, { dept: "Marketing" }] })',
    challenge: {
      question: 'What does $nor: [{ x: 1 }, { y: 2 }] match?',
      options: [
        'Documents where x is 1 or y is 2',
        'Documents where x is not 1 and y is not 2',
        'Documents where x is 1 and y is 2',
        'Documents where neither x nor y exists',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 4: Projection
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'include-fields',
    chapter: 'Projection',
    title: 'Inclusion Projection',
    concept: 'A **projection** is the second argument to `find()`. It controls which fields appear in the returned documents — similar to naming columns in a SQL `SELECT`.\n\n**Inclusion mode**: set fields you want to `1`. Only those fields (plus `_id` by default) are returned. `{ name: 1, dept: 1, salary: 1 }` returns only those three fields.\n\nYou cannot mix inclusion and exclusion in the same projection (except for `_id`). To hide `_id` from an inclusion projection, explicitly set `_id: 0`.',
    code: 'return db.employees.find({}, { name: 1, dept: 1, salary: 1 })',
    challenge: {
      question: 'In an inclusion projection { name: 1, salary: 1 }, is _id included?',
      options: [
        'No — only name and salary are returned',
        'Yes — _id is always included unless explicitly set to 0',
        'Yes — but only if the document has an _id field',
        'It depends on the MongoDB version',
      ],
      correct: 1,
    },
  },

  {
    id: 'exclude-fields',
    chapter: 'Projection',
    title: 'Exclusion Projection',
    concept: '**Exclusion mode**: set fields you want to hide to `0`. All other fields are returned. `{ skills: 0, hiredYear: 0 }` returns every field except those two.\n\nExclusion is useful when documents have many fields and you only want to hide a few large or sensitive ones — it is less brittle than listing every included field. A common pattern is `{ password: 0, secretToken: 0 }` to strip sensitive fields before returning user documents.\n\nRemember: you cannot mix `1` and `0` in the same projection. The only exception is `_id: 0` which can appear in an inclusion projection.',
    code: 'return db.employees.find({}, { skills: 0, hiredYear: 0 })',
    challenge: {
      question: 'What is wrong with the projection { name: 1, skills: 0 }?',
      options: [
        'Nothing — it returns name and hides skills',
        'You cannot mix inclusion (1) and exclusion (0) in the same projection (except _id: 0)',
        'You cannot exclude array fields',
        'Projections only work with findOne, not find',
      ],
      correct: 1,
    },
  },

  {
    id: 'nested-projection',
    chapter: 'Projection',
    title: 'Dot Notation in Projection',
    concept: '**Dot notation** lets you project nested fields. If you have a document with a nested object `{ address: { city: "NY", zip: "10001" } }`, you can include just the city with `{ "address.city": 1 }`.\n\nIn this dataset, the employees collection does not use deep nesting, but the pattern applies to any depth. Dot notation works in both inclusion and exclusion mode — `{ "address.zip": 0 }` hides just the zip.\n\nYou can also use `$exists` in filters with dot notation to match documents that have (or lack) a specific nested field: `{ "address.city": { $exists: true } }`.',
    code: 'return db.employees.find({ dept: "Engineering" }, { name: 1, role: 1, city: 1, _id: 0 })',
    challenge: {
      question: 'How do you include only the city field from a nested address object?',
      options: [
        '{ address: { city: 1 } }',
        '{ "address.city": 1 }',
        '{ address.city: 1 }',
        '{ address: 1, city: 1 }',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 5: Sort, Limit & Skip
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'sort',
    chapter: 'Sort, Limit & Skip',
    title: 'Sorting Results',
    concept: '`.sort(spec)` is a cursor method that orders results. Pass an object where each key is a field name and the value is `1` for ascending or `-1` for descending. `{ salary: -1 }` sorts from highest to lowest salary.\n\nYou can sort on multiple fields: `{ dept: 1, salary: -1 }` sorts alphabetically by department, then by salary descending within each department.\n\nSort always runs before limit and skip, so `.find().sort({ salary: -1 }).limit(5)` reliably gives you the top 5 salaries.',
    code: 'return db.employees.find().sort({ salary: -1 })',
    challenge: {
      question: 'What does .sort({ name: 1 }) do?',
      options: [
        'Sorts documents by name descending (Z to A)',
        'Sorts documents by name ascending (A to Z)',
        'Returns only the first document alphabetically',
        'Limits results to 1 document',
      ],
      correct: 1,
    },
  },

  {
    id: 'limit-skip',
    chapter: 'Sort, Limit & Skip',
    title: 'Pagination with limit() and skip()',
    concept: '`.limit(n)` caps the number of returned documents. `.skip(n)` skips the first n documents in the result set. Combining them enables **pagination**.\n\nFor page 2 with 3 results per page: `.skip(3).limit(3)`. Page 1 is `.skip(0).limit(3)`, page 3 is `.skip(6).limit(3)`, and so on. The formula is `skip = (pageNumber - 1) * pageSize`.\n\nIn MongoDB, `skip` on large datasets can be slow because the engine must scan through skipped documents. For high-performance pagination on large collections, prefer cursor-based pagination using `_id > lastSeenId`.',
    code: 'return db.employees.find({}, { name: 1, dept: 1, salary: 1 }).skip(2).limit(3)',
    challenge: {
      question: 'To get page 3 with 5 results per page, which cursor chain is correct?',
      options: [
        '.skip(3).limit(5)',
        '.skip(10).limit(5)',
        '.skip(15).limit(5)',
        '.limit(5).skip(3)',
      ],
      correct: 1,
    },
  },

  {
    id: 'sort-limit',
    chapter: 'Sort, Limit & Skip',
    title: 'Top-N Queries',
    concept: 'A **top-N query** combines `sort` and `limit` to efficiently retrieve the highest or lowest N values. This is one of the most common query patterns: top products by rating, most recent orders, highest-paid employees.\n\n`.sort({ field: -1 }).limit(n)` gives the top N. `.sort({ field: 1 }).limit(n)` gives the bottom N.\n\nFor ties, MongoDB returns documents in their internal storage order unless a tiebreaker field is added to the sort spec. Add a secondary sort on `_id` for deterministic results when ties are possible.',
    code: 'return db.products.find({}, { name: 1, rating: 1, price: 1, _id: 0 }).sort({ rating: -1 }).limit(3)',
    challenge: {
      question: 'Which query returns the 3 cheapest products?',
      options: [
        '.sort({ price: -1 }).limit(3)',
        '.sort({ price: 1 }).limit(3)',
        '.limit(3).sort({ price: 1 })',
        '.sort({ price: 0 }).limit(3)',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 6: Array Queries
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'array-contains',
    chapter: 'Array Queries',
    title: 'Querying Array Fields',
    concept: 'When you filter on an array field with a scalar value, MongoDB checks whether the array **contains** that value. `{ skills: "Python" }` returns employees whose `skills` array includes the string "Python" — you do not need any special operator.\n\nThis is one of MongoDB\'s most convenient features compared to SQL. In a relational database you would need a join table. In MongoDB, array fields are first-class citizens and you can query them as if filtering a single-value field.\n\nYou can also filter on multiple array conditions by chaining implicit AND: `{ skills: "Python", dept: "Engineering" }` finds Python engineers.',
    code: 'return db.employees.find({ skills: "Python" }, { name: 1, dept: 1, skills: 1 })',
    challenge: {
      question: 'How do you find all products whose tags array contains "ergonomic"?',
      options: [
        '{ tags: { $contains: "ergonomic" } }',
        '{ tags: "ergonomic" }',
        '{ tags: { $eq: "ergonomic" } }',
        '{ "tags[]": "ergonomic" }',
      ],
      correct: 1,
    },
  },

  {
    id: 'all-operator',
    chapter: 'Array Queries',
    title: '$all — Match Multiple Array Values',
    concept: '`$all` matches documents where the array field contains ALL of the specified values — regardless of order or whether there are additional elements.\n\n`{ tags: { $all: ["ergonomic", "office"] } }` matches products whose tags include both "ergonomic" AND "office". A plain equality match `{ tags: ["ergonomic", "office"] }` would only match arrays with exactly those two elements in that exact order.\n\n`$all` is essentially an AND applied across array elements. Contrast with `$in` which is an OR — `$in` matches if any of the values is present, `$all` requires every value to be present.',
    code: 'return db.products.find({ tags: { $all: ["ergonomic", "office"] } }, { name: 1, tags: 1, _id: 0 })',
    challenge: {
      question: 'What is the difference between $all and $in for array fields?',
      options: [
        '$all requires ALL values to be present; $in requires ANY value to be present',
        '$in requires ALL values to be present; $all requires ANY value to be present',
        'They are identical — both require all values',
        '$all and $in only work with numeric arrays',
      ],
      correct: 0,
    },
  },

  {
    id: 'elemmatch',
    chapter: 'Array Queries',
    title: '$elemMatch — Complex Array Conditions',
    concept: '`$elemMatch` matches documents where at least one array element satisfies ALL conditions in the given expression. This is essential when you need multiple conditions to match the SAME element.\n\nWithout `$elemMatch`, `{ ratings: { $gt: 3, $lt: 5 } }` could match a document where one element is > 3 and a different element is < 5. With `{ ratings: { $elemMatch: { $gt: 3, $lt: 5 } } }`, both conditions must apply to the same element.\n\n`$elemMatch` also works with embedded objects in arrays: `{ items: { $elemMatch: { qty: { $gt: 2 }, status: "active" } } }` finds orders where a single item has qty > 2 and status "active".',
    code: 'return db.reviews.find({ $and: [{ rating: { $gte: 4 } }, { helpful: { $gt: 10 } }] }, { productId: 1, rating: 1, helpful: 1, comment: 1, _id: 0 })',
    challenge: {
      question: 'When is $elemMatch required instead of a plain multi-condition object?',
      options: [
        'Always — $elemMatch is required for all array queries',
        'When multiple conditions must apply to the SAME array element',
        'When the array contains objects rather than primitives',
        '$elemMatch is never required — regular conditions work the same way',
      ],
      correct: 1,
    },
  },

  {
    id: 'array-size',
    chapter: 'Array Queries',
    title: '$size — Array Length',
    concept: '`$size` matches documents where an array field has exactly the specified number of elements. `{ skills: { $size: 3 } }` finds employees with exactly 3 skills.\n\nNote that `$size` only supports exact equality — you cannot combine it with `$gt` or `$lt` directly. To find arrays with more than N elements, a common workaround is to use `$exists` with the dot-notation index: `{ "skills.3": { $exists: true } }` matches documents where `skills[3]` exists, meaning the array has at least 4 elements.\n\n`$size` only works on array fields. Calling it on a non-array field will not match any documents.',
    code: 'return db.employees.find({ skills: { $size: 4 } }, { name: 1, skills: 1, _id: 0 })',
    challenge: {
      question: 'How do you find employees with exactly 2 skills using $size?',
      options: [
        '{ skills: { $size: { $eq: 2 } } }',
        '{ skills: { $size: 2 } }',
        '{ skills: { $length: 2 } }',
        '{ skills: { $count: 2 } }',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 7: Update Operations
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'update-set',
    chapter: 'Update Operations',
    title: '$set — Update Fields',
    concept: '`updateOne(filter, update)` updates the first document that matches the filter. The update argument uses **update operators** starting with `$`. The `$set` operator sets field values — it creates the field if it does not exist, or overwrites its current value.\n\nAlways use `$set` to update specific fields. Modern MongoDB requires update operators for `updateOne`; use `replaceOne()` when you intentionally want to replace the entire document.\n\nThe return value is `{ acknowledged, matchedCount, modifiedCount }`. If `matchedCount` is 1 but `modifiedCount` is 0, the document was found but the new value was identical to the existing value.',
    code: 'return db.employees.updateOne({ name: "Eva Patel" }, { $set: { salary: 78000 } })',
    challenge: {
      question: 'What happens if you use updateOne with a plain object { salary: 78000 } instead of { $set: { salary: 78000 } }?',
      options: [
        'Only salary is updated, other fields are unchanged',
        'The entire document is replaced with { salary: 78000 }, losing all other fields',
        'MongoDB throws an error because update operators are required',
        'The salary is incremented by 78000',
      ],
      correct: 2,
    },
  },

  {
    id: 'update-inc',
    chapter: 'Update Operations',
    title: '$inc — Increment Fields',
    concept: '`$inc` increments a numeric field by the given amount. A positive value increases it; a negative value decreases it. `{ $inc: { stock: -1 } }` decrements stock by 1 — ideal for inventory management.\n\n`$inc` is an **atomic operation** — on a real MongoDB server, concurrent `$inc` calls will each apply their increment safely without race conditions. This makes `$inc` the right tool for counters, like counts, votes, stock levels, and view counters.\n\nIf the field does not exist, `$inc` creates it with the increment value as the initial value.',
    code: 'return db.products.updateOne({ _id: 1 }, { $inc: { stock: -1 } })',
    challenge: {
      question: 'What does { $inc: { views: 1 } } do if the views field does not exist?',
      options: [
        'Returns an error — field must exist before incrementing',
        'Creates the views field with value 1',
        'Sets views to 1 only if the document has no views field',
        'Creates views with value 0',
      ],
      correct: 1,
    },
  },

  {
    id: 'update-array',
    chapter: 'Update Operations',
    title: '$push, $pull, $addToSet',
    concept: '`$push` appends a value to an array field (creating the array if it does not exist). `$pull` removes all elements from an array that match a condition. `$addToSet` appends a value only if it is not already present — preventing duplicates.\n\nThese operators work on the document in place — no need to read the document, modify the array in application code, and write it back. This reduces round trips and avoids race conditions when multiple clients update the same document.\n\nFor removing a single value: `{ $pull: { skills: "SEO" } }`. For removing objects matching a condition: `{ $pull: { items: { status: "cancelled" } } }`.',
    code: 'return db.employees.updateOne({ name: "Jake Wilson" }, { $addToSet: { skills: "Content Marketing" } })',
    challenge: {
      question: 'What is the difference between $push and $addToSet?',
      options: [
        '$push replaces the array; $addToSet appends to it',
        '$push always appends; $addToSet only appends if the value is not already in the array',
        '$push only works with numbers; $addToSet works with any type',
        'They are identical',
      ],
      correct: 1,
    },
  },

  {
    id: 'update-many',
    chapter: 'Update Operations',
    title: 'updateMany — Bulk Updates',
    concept: '`updateMany(filter, update)` applies the update to ALL documents that match the filter. It is the MongoDB equivalent of `UPDATE ... WHERE ...` in SQL with multiple matching rows.\n\nThe return value reports `matchedCount` (documents found) and `modifiedCount` (documents actually changed — may be less if some documents already had the target value).\n\nUse `updateMany` for bulk changes like marking all pending orders from a specific date as expired, giving all employees in a department a raise, or adding a new field to all existing documents when you change your schema.',
    code: 'return db.employees.updateMany({ dept: "Marketing" }, { $inc: { salary: 2000 } })',
    challenge: {
      question: 'What does modifiedCount tell you in an updateMany result?',
      options: [
        'The number of documents that matched the filter',
        'The number of documents that were actually changed (may be less than matchedCount)',
        'The number of fields updated per document',
        'The number of indexes that were updated',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 8: Delete & Insert
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'insert-one',
    chapter: 'Delete & Insert',
    title: 'insertOne — Add a Document',
    concept: '`insertOne(doc)` inserts a single document into the collection. If the document does not have an `_id` field, MongoDB generates one automatically (an ObjectId in real MongoDB, a number in this playground).\n\nThe return value is `{ acknowledged: true, insertedId }`. You can use the `insertedId` to immediately query or reference the newly created document.\n\nDocuments do not need to match a predefined schema — MongoDB collections are **schema-flexible** by default. Two documents in the same collection can have completely different fields. Schema validation is optional and added separately.',
    code: 'return db.employees.insertOne({ name: "Sam Torres", dept: "Engineering", salary: 85000, age: 29, city: "Portland", skills: ["Vue", "TypeScript", "Python"], remote: true, hiredYear: 2026 })',
    challenge: {
      question: 'What happens if you insertOne() a document without an _id field?',
      options: [
        'MongoDB throws an error — _id is required',
        'MongoDB generates an _id automatically',
        'The document is inserted with _id: null',
        'The document is inserted with _id: 0',
      ],
      correct: 1,
    },
  },

  {
    id: 'insert-many',
    chapter: 'Delete & Insert',
    title: 'insertMany — Bulk Insert',
    concept: '`insertMany(docs)` inserts an array of documents in a single operation. It is more efficient than calling `insertOne` in a loop because the documents are sent to the server as one batch.\n\nThe return value includes `insertedCount` and an `insertedIds` object mapping array index to the generated `_id` for each document.\n\nBy default, `insertMany` stops on the first error (ordered mode). Pass `{ ordered: false }` as a third argument to insert as many documents as possible, collecting errors at the end — useful for bulk imports where some documents may be invalid.',
    code: 'return db.products.insertMany([{ name: "Laptop Stand", category: "Accessories", price: 45.00, stock: 75, rating: 4.4, tags: ["ergonomic", "portable"], brand: "RiseUp", inStock: true }, { name: "Blue Light Glasses", category: "Accessories", price: 25.99, stock: 200, rating: 4.0, tags: ["health", "screen", "office"], brand: "ClearSight", inStock: true }])',
    challenge: {
      question: 'What does insertMany return?',
      options: [
        'An array of inserted document _ids',
        '{ acknowledged, insertedCount, insertedIds } — a map of index to inserted _id',
        'The first inserted document',
        'A boolean indicating success',
      ],
      correct: 1,
    },
  },

  {
    id: 'delete-ops',
    chapter: 'Delete & Insert',
    title: 'deleteOne and deleteMany',
    concept: '`deleteOne(filter)` removes the first document matching the filter. `deleteMany(filter)` removes ALL matching documents. Both return `{ acknowledged: true, deletedCount }`.\n\nPassing an empty filter `{}` to `deleteMany` deletes every document in the collection — equivalent to `TRUNCATE TABLE` in SQL. This is a destructive operation with no undo, so always double-check your filter.\n\nIn this playground, each lesson creates a fresh database, so mutations do not persist. On a real MongoDB server, always test your filter with `find()` before running a `deleteMany` to confirm you are targeting the right documents.',
    code: 'return db.orders.deleteOne({ status: "cancelled" })',
    challenge: {
      question: 'What does deleteMany({}) do?',
      options: [
        'Deletes nothing — empty filter is invalid',
        'Deletes all documents in the collection',
        'Deletes only the first document',
        'Drops the entire collection including indexes',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 9: Aggregation Basics
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'match-group',
    chapter: 'Aggregation Basics',
    title: '$match and $group',
    concept: 'The **aggregation pipeline** is a sequence of stages, each transforming the documents passing through it. `aggregate([ stage1, stage2, ... ])` processes documents through each stage in order.\n\n`$match` filters documents — put it early to reduce the number of documents processed by later stages. `$group` groups documents by a key (`_id`) and computes accumulators like `$sum`, `$avg`, `$min`, `$max`, `$count`, `$push`, and `$addToSet`.\n\n`{ _id: "$dept" }` groups by the `dept` field. Field references in aggregation expressions use the `$` prefix — `"$salary"` refers to each document\'s salary value.',
    code: 'return db.employees.aggregate([{ $match: { dept: "Engineering" } }, { $group: { _id: "$dept", count: { $sum: 1 }, avgSalary: { $avg: "$salary" }, maxSalary: { $max: "$salary" } } }])',
    challenge: {
      question: 'In $group, what does { _id: null } do?',
      options: [
        'Causes an error — _id cannot be null',
        'Groups all documents into a single group regardless of any field value',
        'Groups documents that have no _id field',
        'Returns only documents where _id is null',
      ],
      correct: 1,
    },
  },

  {
    id: 'sort-limit-agg',
    chapter: 'Aggregation Basics',
    title: '$sort and $limit in Pipeline',
    concept: '`$sort` and `$limit` work in aggregation pipelines just like cursor methods, but they are applied as pipeline stages rather than method calls on a cursor.\n\nUsing them in a pipeline lets you chain them after `$group` or `$project` results — something impossible with cursor-level sort/limit because those only work before aggregation. For example: group by department, sort groups by average salary, then limit to top 3 departments.\n\nPlace `$sort` and `$limit` as early as possible in the pipeline to reduce the data flowing into later stages — a key performance optimisation called **pipeline pushdown**.',
    code: 'return db.employees.aggregate([{ $group: { _id: "$dept", avgSalary: { $avg: "$salary" }, headcount: { $sum: 1 } } }, { $sort: { avgSalary: -1 } }, { $limit: 3 }])',
    challenge: {
      question: 'Why place $match early in an aggregation pipeline?',
      options: [
        '$match must always be the first stage by rule',
        'To reduce the number of documents flowing into later stages, improving performance',
        'Because $group only works after $match',
        '$match at the end causes a syntax error',
      ],
      correct: 1,
    },
  },

  {
    id: 'project-agg',
    chapter: 'Aggregation Basics',
    title: '$project — Reshape Documents',
    concept: '`$project` in a pipeline reshapes documents — include, exclude, or compute new fields. Unlike `find()` projection, pipeline `$project` can create computed fields using aggregation expressions.\n\n`{ $project: { name: 1, annualSalary: "$salary", monthlySalary: { $divide: ["$salary", 12] } } }` includes name, keeps salary as annualSalary, and adds a new computed monthlySalary field.\n\nField names starting with `$` in expressions are field references — `"$salary"` reads the salary value from the current document. Arithmetic operators like `$divide`, `$multiply`, `$add`, and `$subtract` accept arrays of expressions.',
    code: 'return db.employees.aggregate([{ $project: { _id: 0, name: 1, dept: 1, salary: 1, monthlySalary: { $round: [{ $divide: ["$salary", 12] }, 2] } } }])',
    challenge: {
      question: 'In a $project stage, what does { $divide: ["$salary", 12] } do?',
      options: [
        'Divides the value 12 by salary',
        'Divides the salary field value by 12',
        'Creates a field named "salary/12"',
        'Filters documents where salary divided by 12 is truthy',
      ],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 10: Advanced Aggregation
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'unwind',
    chapter: 'Advanced Aggregation',
    title: '$unwind — Explode Arrays',
    concept: '`$unwind` deconstructs an array field: it creates one output document per array element, each with the same fields as the original document but with the array field replaced by a single element.\n\nA document with `skills: ["Python", "Go", "Rust"]` produces three documents after `$unwind: "$skills"` — each identical except `skills` is a single string. This enables grouping by individual array elements.\n\nCombined with `$group` and `$sort`, `$unwind` is the standard way to count skill frequency, tag popularity, or word occurrence across documents.',
    code: 'return db.employees.aggregate([{ $unwind: "$skills" }, { $group: { _id: "$skills", count: { $sum: 1 }, employees: { $push: "$name" } } }, { $sort: { count: -1 } }, { $limit: 8 }])',
    challenge: {
      question: 'An employee document has skills: ["A", "B", "C"]. After $unwind: "$skills", how many documents are produced for this employee?',
      options: ['1 — the original document unchanged', '2 — first and last element', '3 — one per skill', '0 — $unwind requires a filter first'],
      correct: 2,
    },
  },

  {
    id: 'lookup-style',
    chapter: 'Advanced Aggregation',
    title: 'Cross-Collection Aggregation',
    concept: '`$lookup` performs a left outer join from one collection to another inside an aggregation pipeline. It adds an array field containing matching documents from the foreign collection.\n\nThe common form is `{ $lookup: { from, localField, foreignField, as } }`. `localField` is read from each input document; MongoDB finds documents in `from` where `foreignField` has the same value and stores those matches in `as`.\n\nThis lesson joins products with reviews by matching `products._id` to `reviews.productId`, then projects each product name, category, rating, review count, and matching review documents.',
    code: 'return db.products.aggregate([{ $lookup: { from: "reviews", localField: "_id", foreignField: "productId", as: "reviews" } }, { $project: { _id: 0, name: 1, category: 1, rating: 1, reviewCount: { $size: "$reviews" }, reviews: 1 } }, { $sort: { reviewCount: -1, rating: -1 } }])',
    challenge: {
      question: 'Which MongoDB stage performs a left outer join between two collections?',
      options: ['$join', '$merge', '$lookup', '$connect'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 11: Modeling & Production
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'report-pipeline',
    chapter: 'Modeling & Production',
    title: 'A Real Reporting Pipeline',
    concept: 'Production aggregations chain several stages into one report. The pattern is almost always: `$match` to narrow the data early (cheapest place to filter), `$group` to aggregate, `$sort` to rank, and `$project` to shape the final output.\n\nThis pipeline builds a revenue-by-city report from fulfilled orders. Filtering first with `$match` is a real performance habit — it shrinks the working set before the expensive grouping runs.',
    code: 'return db.orders.aggregate([\n  { $match: { status: { $in: ["delivered", "shipped"] } } },\n  { $group: { _id: "$city", revenue: { $sum: "$total" }, orders: { $sum: 1 } } },\n  { $sort: { revenue: -1 } },\n  { $project: { _id: 0, city: "$_id", revenue: { $round: ["$revenue", 2] }, orders: 1 } }\n])',
    challenge: {
      question: 'Why put $match at the start of a pipeline?',
      options: ['It filters early so later stages process fewer documents', 'It is required syntax', 'It sorts the results', 'It joins collections'],
      correct: 0,
    },
  },
  {
    id: 'lookup-flatten',
    chapter: 'Modeling & Production',
    title: 'Join and Flatten with $unwind',
    concept: 'A `$lookup` returns matches as an *array*. When each document has exactly one match (a foreign-key style join), follow it with `$unwind` to flatten that one-element array into a plain object, then `$project` to pull out the fields you want.\n\nHere each review is joined to its product, flattened, and reshaped into a clean `{ product, rating, comment }` row — the join-and-denormalize pattern you use to build read-friendly views.',
    code: 'return db.reviews.aggregate([\n  { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },\n  { $unwind: "$product" },\n  { $project: { _id: 0, product: "$product.name", rating: 1, comment: 1 } },\n  { $sort: { rating: -1 } }\n])',
    challenge: {
      question: 'Why follow a one-to-one $lookup with $unwind?',
      options: ['To flatten the single-element result array into an object', 'To delete the joined documents', 'To sort the array', 'To create an index'],
      correct: 0,
    },
  },
  {
    id: 'data-modeling',
    chapter: 'Modeling & Production',
    title: 'Embedding vs Referencing',
    concept: 'The biggest modeling decision in MongoDB is **embed or reference**. Embed related data inside a document when it is read together and bounded (an order and its line items) — one read, no join. Reference by storing an id when the data is large, shared, or unbounded (reviews of a product), then join with `$lookup` when needed.\n\nOur sample data uses referencing: `reviews.productId` points at `products._id`. The query reconstructs a product with its embedded reviews on the fly — showing how a referenced model can be presented as an embedded one for reading.',
    code: 'return db.products.aggregate([\n  { $match: { category: "Electronics" } },\n  { $lookup: { from: "reviews", localField: "_id", foreignField: "productId", as: "reviews" } },\n  { $project: { _id: 0, name: 1, price: 1, reviewCount: { $size: "$reviews" }, avgRating: { $avg: "$reviews.rating" } } },\n  { $sort: { avgRating: -1 } }\n])',
    challenge: {
      question: 'When should you embed related data instead of referencing it?',
      options: ['When it is read together and bounded in size', 'Always — embedding is always faster', 'Never — referencing is always correct', 'Only for numbers'],
      correct: 0,
    },
  },
  {
    id: 'indexes-explain',
    chapter: 'Modeling & Production',
    title: 'Indexes & explain() (overview)',
    concept: 'Indexes are what make MongoDB fast at scale. Without one, a query scans every document (a COLLSCAN); with an index on the queried field, MongoDB jumps straight to the matches (an IXSCAN). In a real server you create one with `db.employees.createIndex({ dept: 1 })` and inspect a query with `db.employees.find({ dept: "Engineering" }).explain("executionStats")`.\n\nThis browser engine does not build real indexes, so the query below simply runs — but it is exactly the kind of equality-and-sort query a compound index `{ dept: 1, salary: -1 }` would accelerate. Rule of thumb: index the fields you filter and sort on.',
    code: '// In real MongoDB you would first run:\n//   db.employees.createIndex({ dept: 1, salary: -1 })\n// then this query would use an IXSCAN instead of a COLLSCAN:\nreturn db.employees.find({ dept: "Engineering" }).sort({ salary: -1 })',
    challenge: {
      question: 'What does an index prevent the database from doing?',
      options: ['Scanning every document (a full collection scan)', 'Returning any results', 'Using RAM', 'Sorting data'],
      correct: 0,
    },
  },
  {
    id: 'transactions-production',
    chapter: 'Modeling & Production',
    title: 'Transactions & Production Concerns (overview)',
    concept: 'Two production topics that need a real server. **Transactions** let you update multiple documents atomically — start a session, run writes inside `session.withTransaction(...)`, and either everything commits or everything rolls back (the same all-or-nothing guarantee SQL gives you). **Schema validation** ($jsonSchema rules), **replication** (copies for failover), and **sharding** (horizontal scaling) keep a deployment durable and fast.\n\nThe browser engine has no sessions or cluster, so transactions cannot run here — but the query below shows the collections you would coordinate across in a real transaction (for example, inserting an order and decrementing product stock together).',
    code: '// A real transaction (needs a MongoDB server with a replica set):\n//   const session = client.startSession();\n//   await session.withTransaction(async () => {\n//     await orders.insertOne({ ... }, { session });\n//     await products.updateOne({ _id }, { $inc: { stock: -1 } }, { session });\n//   });\n// Here we just read the collections such a transaction would touch:\nreturn db.getCollectionNames()',
    challenge: {
      question: 'What guarantee does a multi-document transaction provide?',
      options: ['All writes commit together or all roll back (atomicity)', 'Queries run faster', 'Data is automatically indexed', 'Documents are deleted after reading'],
      correct: 0,
    },
  },
];
