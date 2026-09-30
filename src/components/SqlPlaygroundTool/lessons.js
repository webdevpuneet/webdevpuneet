export const CHAPTERS = [
  'Basics',
  'Filtering',
  'Sorting & Limiting',
  'Aggregations',
  'Joins',
  'Subqueries',
  'CTEs',
  'Window Functions',
  'PostgreSQL Extras',
  'Indexes, Transactions & Performance',
];

export const INIT_SQL = `
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id     SERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  location TEXT,
  budget NUMERIC(12,2)
);

CREATE TABLE employees (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary        NUMERIC(10,2),
  hire_date     DATE,
  manager_id    INTEGER REFERENCES employees(id),
  metadata      JSONB
);

CREATE TABLE projects (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  status        TEXT,
  start_date    DATE,
  department_id INTEGER REFERENCES departments(id)
);

CREATE TABLE assignments (
  employee_id INTEGER REFERENCES employees(id),
  project_id  INTEGER REFERENCES projects(id),
  role        TEXT,
  hours_worked INTEGER,
  PRIMARY KEY (employee_id, project_id)
);

INSERT INTO departments (name, location, budget) VALUES
  ('Engineering', 'San Francisco', 1200000),
  ('Marketing',   'New York',      500000),
  ('Design',      'Austin',        400000),
  ('Sales',       'Chicago',       750000),
  ('HR',          'Seattle',       300000);

INSERT INTO employees (name, department_id, salary, hire_date, manager_id, metadata) VALUES
  ('Alice Johnson',  1, 120000, '2019-03-15', NULL, '{"skills":"Go, Kubernetes","level":"L6"}'::jsonb),
  ('Bob Smith',      1,  95000, '2020-07-01', 1,    '{"skills":"Python, Docker","level":"L5"}'::jsonb),
  ('Carol Williams', 2,  75000, '2021-01-10', NULL, '{"skills":"SEO, Analytics","level":"L4"}'::jsonb),
  ('David Brown',    1,  85000, '2020-11-20', 1,    '{"skills":"React, TypeScript","level":"L4"}'::jsonb),
  ('Eva Martinez',   3,  90000, '2019-09-05', NULL, '{"skills":"Figma, Illustrator","level":"L5"}'::jsonb),
  ('Frank Lee',      4,  68000, '2022-02-14', NULL, NULL),
  ('Grace Kim',      1, 110000, '2018-06-30', 1,    '{"skills":"Java, Spring","level":"L6"}'::jsonb),
  ('Henry Chen',     2,  72000, '2021-05-18', 3,    NULL),
  ('Isla Davis',     3,  82000, '2020-03-22', 5,    '{"skills":"UX Research","level":"L4"}'::jsonb),
  ('James Wilson',   4,  65000, '2022-08-09', 6,    NULL),
  ('Kate Anderson',  5,  58000, '2023-01-15', NULL, NULL),
  ('Liam Thomas',    1, 105000, '2019-12-01', 1,    '{"skills":"ML, Python","level":"L5"}'::jsonb);

INSERT INTO projects (name, status, start_date, department_id) VALUES
  ('Platform Rewrite',     'active',    '2024-01-10', 1),
  ('Brand Refresh',        'active',    '2024-03-01', 3),
  ('CRM Migration',        'completed', '2023-06-01', 4),
  ('ML Pipeline',          'active',    '2024-02-15', 1),
  ('Marketing Automation', 'planning',  '2024-07-01', 2);

INSERT INTO assignments (employee_id, project_id, role, hours_worked) VALUES
  (1,  1, 'Tech Lead',      320),
  (2,  1, 'Backend Dev',    280),
  (4,  1, 'Frontend Dev',   240),
  (7,  4, 'ML Engineer',    300),
  (12, 4, 'ML Engineer',    260),
  (5,  2, 'Lead Designer',  180),
  (9,  2, 'UX Designer',    160),
  (6,  3, 'Sales Lead',     120),
  (10, 3, 'Sales Rep',      100),
  (3,  5, 'Campaign Lead',   90),
  (8,  5, 'Content Writer',  75);
`;

export const LESSONS = [
  /* ── Basics ─────────────────────────────────────────────────── */
  {
    id: 'select-all',
    chapter: 'Basics',
    title: 'SELECT all columns',
    concept: `The **SELECT** statement is how you read data from a table. Use \`SELECT *\` to retrieve every column from a row.

The \`FROM\` clause specifies which table to read. Every query needs at least a SELECT and a FROM. Try changing \`employees\` to \`departments\` to see a different table.`,
    sql: `SELECT *\nFROM employees;`,
    challenge: {
      question: 'What does SELECT * retrieve from a table?',
      options: ['All columns from every row', 'Only the first row', 'All table names in the database', 'Only columns with numeric values'],
      correct: 0,
    },
    task: {
      prompt: 'Write a query that selects all columns from the departments table.',
      check: ({ fields, rows }) => rows.length === 5 && fields.some(f => f.name === 'budget'),
      hint: 'SELECT * FROM departments',
    },
  },
  {
    id: 'select-columns',
    chapter: 'Basics',
    title: 'SELECT specific columns',
    concept: `Instead of \`*\`, list only the columns you need. This is best practice — it makes queries faster, the intent clearer, and results easier to read.

You can select columns in any order, and they don't have to match the table's column order.`,
    sql: `SELECT name, salary, hire_date\nFROM employees;`,
    challenge: {
      question: 'Why is listing specific columns better than SELECT *?',
      options: ['Faster, clearer intent, and easier to read', 'It fetches more rows', 'It enables the WHERE clause', 'It is required by PostgreSQL'],
      correct: 0,
    },
    task: {
      prompt: 'Select only name and location from the departments table.',
      check: ({ fields, rows }) => rows.length === 5 && fields.some(f => f.name === 'name') && fields.some(f => f.name === 'location') && fields.length === 2,
      hint: 'SELECT name, location FROM departments',
    },
  },
  {
    id: 'column-aliases',
    chapter: 'Basics',
    title: 'Column aliases',
    concept: `Use \`AS\` to rename a column in the result. Aliases are essential when using expressions or computed values. They don't change the actual table — just the output label.

Aliases with spaces or special characters need double quotes: \`AS "my column"\`.`,
    sql: `SELECT\n  name       AS employee_name,\n  salary     AS annual_salary,\n  hire_date  AS started_on\nFROM employees;`,
    challenge: {
      question: 'Does an alias defined with AS change the actual table column name?',
      options: ['No — it only changes the output label', 'Yes — it renames the column permanently', 'Yes — until the database restarts', 'Only for the current session'],
      correct: 0,
    },
    task: {
      prompt: 'Select name aliased as "employee" and salary aliased as "pay" from employees.',
      check: ({ fields }) => fields.some(f => f.name === 'employee') && fields.some(f => f.name === 'pay'),
      hint: 'SELECT name AS employee, salary AS pay FROM employees',
    },
  },

  /* ── Filtering ───────────────────────────────────────────────── */
  {
    id: 'where-numbers',
    chapter: 'Filtering',
    title: 'WHERE with numbers',
    concept: `The **WHERE** clause filters rows before they're returned. Only rows where the condition is true are included.

Standard comparison operators: \`=\`, \`<>\` or \`!=\` (not equal), \`<\`, \`>\`, \`<=\`, \`>=\`.`,
    sql: `SELECT name, salary\nFROM employees\nWHERE salary > 70000\nORDER BY salary DESC;`,
    challenge: {
      question: 'Which operator means "not equal to" in PostgreSQL?',
      options: ['<> or !=', 'NOT =', '=/=', '!'],
      correct: 0,
    },
    task: {
      prompt: 'Find all employees with a salary of exactly 95000.',
      check: ({ rows }) => rows.length === 1 && Number(rows[0].salary) === 95000,
      hint: 'SELECT * FROM employees WHERE salary = 95000',
    },
  },
  {
    id: 'where-text',
    chapter: 'Filtering',
    title: 'WHERE with text',
    concept: `Text values use single quotes. The \`=\` operator is case-sensitive in PostgreSQL — \`'alice'\` and \`'Alice'\` are different values.

Try changing the name to see what happens when there's no match — you'll get zero rows back.`,
    sql: `SELECT name, department_id, salary\nFROM employees\nWHERE name = 'Alice Johnson';`,
    challenge: {
      question: 'Is text comparison with = case-sensitive in PostgreSQL?',
      options: ["Yes — 'Alice' and 'alice' are different values", 'No — PostgreSQL ignores case by default', 'Only for VARCHAR columns', 'Only when using the BINARY flag'],
      correct: 0,
    },
    task: {
      prompt: "Find the employee named 'Grace Kim'.",
      check: ({ rows }) => rows.length === 1 && rows[0].name === 'Grace Kim',
      hint: "SELECT * FROM employees WHERE name = 'Grace Kim'",
    },
  },
  {
    id: 'and-or-not',
    chapter: 'Filtering',
    title: 'AND / OR / NOT',
    concept: `Combine conditions with **AND** (both must be true), **OR** (either must be true), or negate with **NOT**.

AND has higher precedence than OR — use parentheses when mixing them to make the logic explicit and correct.`,
    sql: `SELECT name, salary, department_id\nFROM employees\nWHERE salary > 70000\n  AND (department_id = 1 OR department_id = 3)\nORDER BY salary DESC;`,
    challenge: {
      question: 'Which operator has higher precedence: AND or OR?',
      options: ['AND has higher precedence than OR', 'OR has higher precedence than AND', 'They have equal precedence', 'It depends on the database'],
      correct: 0,
    },
    task: {
      prompt: 'Find employees in department 1 who earn more than 100000.',
      check: ({ rows }) => rows.length > 0 && rows.every(r => Number(r.salary) > 100000 || r.department_id == 1),
      hint: 'WHERE salary > 100000 AND department_id = 1',
    },
  },
  {
    id: 'in-between',
    chapter: 'Filtering',
    title: 'IN and BETWEEN',
    concept: `**IN** matches any value from a list — much cleaner than writing multiple OR conditions. Works with numbers, text, and dates.

**BETWEEN** matches an inclusive range — both the lower and upper bounds are included.`,
    sql: `-- IN: match any of these department IDs\nSELECT name, department_id\nFROM employees\nWHERE department_id IN (1, 3);\n\n-- BETWEEN: inclusive salary range\nSELECT name, salary\nFROM employees\nWHERE salary BETWEEN 70000 AND 100000;`,
    challenge: {
      question: 'Is BETWEEN inclusive or exclusive of its bounds?',
      options: ['Inclusive — both lower and upper bounds are included', 'Exclusive — both bounds are excluded', 'Inclusive on the lower bound only', 'Exclusive on the upper bound only'],
      correct: 0,
    },
    task: {
      prompt: 'Find employees whose salary is between 65000 and 75000 (inclusive).',
      check: ({ rows }) => rows.length > 0 && rows.every(r => Number(r.salary) >= 65000 && Number(r.salary) <= 75000),
      hint: 'WHERE salary BETWEEN 65000 AND 75000',
    },
  },
  {
    id: 'like-ilike',
    chapter: 'Filtering',
    title: 'LIKE and ILIKE',
    concept: `**LIKE** matches text patterns. \`%\` matches any sequence of characters. \`_\` matches exactly one character.

**ILIKE** is PostgreSQL's case-insensitive version of LIKE — a feature not found in most other databases.`,
    sql: `-- Names starting with 'A' (case-sensitive)\nSELECT name FROM employees WHERE name LIKE 'A%';\n\n-- Case-insensitive search (PostgreSQL only)\nSELECT name FROM employees WHERE name ILIKE '%son';`,
    challenge: {
      question: 'What does % match in a LIKE pattern?',
      options: ['Any sequence of characters (including none)', 'Exactly one character', 'Only letters', 'A literal percent sign'],
      correct: 0,
    },
    task: {
      prompt: "Find all employees whose name ends with 'son' (case-insensitive).",
      check: ({ rows }) => rows.length > 0 && rows.every(r => r.name.toLowerCase().endsWith('son')),
      hint: "WHERE name ILIKE '%son'",
    },
  },

  /* ── Sorting & Limiting ──────────────────────────────────────── */
  {
    id: 'order-by',
    chapter: 'Sorting & Limiting',
    title: 'ORDER BY',
    concept: `**ORDER BY** sorts the result. **ASC** (ascending, A→Z or 0→9) is the default. **DESC** (descending, Z→A or 9→0) reverses it.

You can sort by multiple columns — the second column is used to break ties in the first.`,
    sql: `SELECT name, department_id, salary\nFROM employees\nORDER BY department_id ASC, salary DESC;`,
    challenge: {
      question: 'What is the default sort direction when no direction is specified in ORDER BY?',
      options: ['ASC (ascending, smallest to largest)', 'DESC (descending, largest to smallest)', 'Random order', 'Order of insertion into the table'],
      correct: 0,
    },
    task: {
      prompt: 'Select name and salary from employees, sorted from lowest salary to highest.',
      check: ({ rows }) => rows.length === 12 && Number(rows[0].salary) <= Number(rows[rows.length - 1].salary),
      hint: 'ORDER BY salary ASC',
    },
  },
  {
    id: 'limit-offset',
    chapter: 'Sorting & Limiting',
    title: 'LIMIT & OFFSET',
    concept: `**LIMIT** caps how many rows are returned. **OFFSET** skips the first N rows before applying the limit.

Together they implement pagination. Always use ORDER BY with LIMIT — without it, the database can return rows in any order and your pages will be inconsistent.`,
    sql: `-- Top 3 highest earners\nSELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;\n\n-- Next 3 (page 2)\nSELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3 OFFSET 3;`,
    challenge: {
      question: 'Why should LIMIT always be paired with ORDER BY?',
      options: ['Without ORDER BY rows can return in any order, making pages inconsistent', 'LIMIT does not work without ORDER BY in PostgreSQL', 'ORDER BY activates the OFFSET clause', 'It significantly improves performance'],
      correct: 0,
    },
    task: {
      prompt: 'Write a query to return only the single highest-paid employee.',
      check: ({ rows }) => rows.length === 1 && Number(rows[0].salary) === 120000,
      hint: 'ORDER BY salary DESC LIMIT 1',
    },
  },
  {
    id: 'null-handling',
    chapter: 'Sorting & Limiting',
    title: 'NULL handling',
    concept: `NULL means "no value" or "unknown". You can't use \`= NULL\` — it always evaluates to NULL (not true/false). Use **IS NULL** or **IS NOT NULL** instead.

**COALESCE(a, b, c)** returns the first non-NULL argument. By default, NULLs sort last with ASC order.`,
    sql: `-- Employees with no manager (top of the hierarchy)\nSELECT name, manager_id\nFROM employees\nWHERE manager_id IS NULL;\n\n-- Replace NULL with a fallback label\nSELECT name, COALESCE(manager_id::text, 'No manager') AS reports_to\nFROM employees;`,
    challenge: {
      question: 'Why does `= NULL` never work as a NULL check in SQL?',
      options: ['Because NULL = NULL evaluates to NULL, not TRUE', 'Because NULL is not a valid keyword', 'Because = only works with numbers', 'Because NULL values are stored separately'],
      correct: 0,
    },
    task: {
      prompt: 'Count how many employees have a NULL manager_id (use COUNT).',
      check: ({ rows }) => rows.length === 1 && Number(Object.values(rows[0])[0]) === 3,
      hint: 'SELECT COUNT(*) FROM employees WHERE manager_id IS NULL',
    },
  },

  /* ── Aggregations ────────────────────────────────────────────── */
  {
    id: 'count-sum-avg',
    chapter: 'Aggregations',
    title: 'COUNT, SUM, AVG',
    concept: `**Aggregate functions** reduce many rows to a single computed value. **COUNT(*)** counts all rows including NULLs. **SUM** and **AVG** ignore NULL values. **MIN** and **MAX** find the extremes.

\`ROUND(value, decimal_places)\` controls precision in the output.`,
    sql: `SELECT\n  COUNT(*)             AS total_employees,\n  SUM(salary)          AS total_payroll,\n  ROUND(AVG(salary),2) AS avg_salary,\n  MIN(salary)          AS min_salary,\n  MAX(salary)          AS max_salary\nFROM employees;`,
    challenge: {
      question: 'Does AVG() include NULL values in its calculation?',
      options: ['No — AVG ignores NULLs entirely', 'Yes — NULLs are treated as 0', 'Yes — NULLs are treated as 1', 'It depends on the column data type'],
      correct: 0,
    },
    task: {
      prompt: 'Find the total sum of all salaries in the company.',
      check: ({ rows }) => rows.length === 1 && Number(Object.values(rows[0])[0]) === 1030000,
      hint: 'SELECT SUM(salary) FROM employees',
    },
  },
  {
    id: 'group-by',
    chapter: 'Aggregations',
    title: 'GROUP BY',
    concept: `**GROUP BY** divides rows into groups and runs aggregate functions on each group separately. Every column in SELECT must either appear in GROUP BY or be wrapped in an aggregate function — otherwise PostgreSQL throws an error.`,
    sql: `SELECT\n  department_id,\n  COUNT(*)              AS headcount,\n  ROUND(AVG(salary), 0) AS avg_salary,\n  SUM(salary)           AS total_salary\nFROM employees\nGROUP BY department_id\nORDER BY avg_salary DESC;`,
    challenge: {
      question: 'In a GROUP BY query, what must every column in SELECT be?',
      options: ['Either in GROUP BY or inside an aggregate function', 'Only aggregate functions are allowed in SELECT', 'Only columns from GROUP BY are allowed in SELECT', 'There is no restriction on SELECT columns'],
      correct: 0,
    },
    task: {
      prompt: 'Show the count of employees in each department_id.',
      check: ({ fields, rows }) => rows.length === 5 && (fields.some(f => f.name === 'count') || fields.some(f => f.name === 'headcount')),
      hint: 'SELECT department_id, COUNT(*) FROM employees GROUP BY department_id',
    },
  },
  {
    id: 'having',
    chapter: 'Aggregations',
    title: 'HAVING',
    concept: `**HAVING** filters groups after aggregation — like WHERE but for aggregated values.

The rule: **WHERE** filters individual rows (before grouping). **HAVING** filters groups (after aggregating). You can use both in one query.`,
    sql: `SELECT\n  department_id,\n  COUNT(*)              AS headcount,\n  ROUND(AVG(salary), 0) AS avg_salary\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) >= 3\nORDER BY headcount DESC;`,
    challenge: {
      question: 'What is the key difference between WHERE and HAVING?',
      options: ['WHERE filters rows before grouping; HAVING filters groups after aggregating', 'HAVING is faster than WHERE for large datasets', 'WHERE only works with numbers; HAVING works with text', 'They are identical — HAVING is just an alias for WHERE'],
      correct: 0,
    },
    task: {
      prompt: 'Find departments where the average salary exceeds 85000.',
      check: ({ rows }) => rows.length > 0 && rows.every(r => {
        const avg = Number(r.avg_salary || r['round'] || Object.values(r).find(v => Number(v) > 85000));
        return true; // just need rows to exist
      }),
      hint: 'HAVING AVG(salary) > 85000',
    },
  },
  {
    id: 'distinct',
    chapter: 'Aggregations',
    title: 'DISTINCT',
    concept: `**DISTINCT** removes duplicate rows from results. You can apply it to one or more columns.

\`COUNT(DISTINCT col)\` counts unique non-NULL values — useful for "how many different X" questions.`,
    sql: `-- Unique department IDs used by employees\nSELECT DISTINCT department_id\nFROM employees\nORDER BY department_id;\n\n-- Count distinct project statuses\nSELECT status, COUNT(*) AS count\nFROM projects\nGROUP BY status;`,
    challenge: {
      question: 'What does COUNT(DISTINCT col) compute?',
      options: ['The number of unique non-NULL values in that column', 'The total number of rows in the table', 'The number of NULL values in that column', 'The first unique value in that column'],
      correct: 0,
    },
    task: {
      prompt: 'Get a list of all unique department_id values used in the employees table.',
      check: ({ rows }) => rows.length === 5,
      hint: 'SELECT DISTINCT department_id FROM employees ORDER BY department_id',
    },
  },

  /* ── Joins ───────────────────────────────────────────────────── */
  {
    id: 'inner-join',
    chapter: 'Joins',
    title: 'INNER JOIN',
    concept: `**INNER JOIN** returns only rows where the join condition matches in both tables. Rows from either table with no matching row on the other side are excluded.

Use short table aliases (like \`e\` for employees) to keep queries readable.`,
    sql: `SELECT\n  e.name,\n  d.name     AS department,\n  d.location,\n  e.salary\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id\nORDER BY e.salary DESC;`,
    challenge: {
      question: 'What happens to rows with no match in an INNER JOIN?',
      options: ['They are excluded from both sides of the join', 'They appear with NULL on the right side', 'They appear with NULL on the left side', 'They cause a query error'],
      correct: 0,
    },
    task: {
      prompt: 'Join employees and departments showing employee name and department name.',
      check: ({ fields, rows }) => rows.length === 12 && fields.some(f => f.name === 'department' || f.name === 'name'),
      hint: 'JOIN departments d ON e.department_id = d.id',
    },
  },
  {
    id: 'left-join',
    chapter: 'Joins',
    title: 'LEFT JOIN',
    concept: `**LEFT JOIN** returns every row from the left table, even if there's no matching row on the right. Non-matching right-side columns are filled with NULL.

Useful when "no match" is meaningful — e.g. departments with no projects.`,
    sql: `-- All departments, even those with no projects\nSELECT\n  d.name   AS department,\n  p.name   AS project,\n  p.status\nFROM departments d\nLEFT JOIN projects p ON d.id = p.department_id\nORDER BY d.name, p.name;`,
    challenge: {
      question: 'In a LEFT JOIN, what fills unmatched right-side columns?',
      options: ['NULL', '0 (zero)', 'An empty string', 'Those rows are excluded'],
      correct: 0,
    },
    task: {
      prompt: 'Show all employees and their department name, including any without a department.',
      check: ({ rows }) => rows.length === 12,
      hint: 'FROM employees e LEFT JOIN departments d ON e.department_id = d.id',
    },
  },
  {
    id: 'multi-join',
    chapter: 'Joins',
    title: 'Multiple JOINs',
    concept: `Chain multiple JOINs to pull in data from several tables at once. Each JOIN adds one more table. Aliases and clear ON conditions keep multi-join queries readable.`,
    sql: `SELECT\n  e.name   AS employee,\n  d.name   AS department,\n  p.name   AS project,\n  a.role,\n  a.hours_worked\nFROM assignments a\nJOIN employees   e ON a.employee_id = e.id\nJOIN projects    p ON a.project_id  = p.id\nJOIN departments d ON e.department_id = d.id\nORDER BY a.hours_worked DESC;`,
    challenge: {
      question: 'When you chain multiple JOINs, each JOIN adds:',
      options: ['One more table to the result', 'One more column filter', 'One more row to the result', 'One more sort condition'],
      correct: 0,
    },
    task: {
      prompt: 'Write a query joining employees and projects through assignments to show employee name and project name.',
      check: ({ fields, rows }) => rows.length > 0 && fields.length >= 2,
      hint: 'FROM assignments a JOIN employees e ON a.employee_id = e.id JOIN projects p ON a.project_id = p.id',
    },
  },
  {
    id: 'self-join',
    chapter: 'Joins',
    title: 'Self JOIN',
    concept: `A **self join** joins a table to itself using two different aliases. The classic use case: the employees table has a \`manager_id\` that references another row in the same table.

Use LEFT JOIN so employees with no manager (NULL manager_id) still appear.`,
    sql: `SELECT\n  e.name AS employee,\n  m.name AS manager,\n  e.salary\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id\nORDER BY m.name NULLS LAST, e.name;`,
    challenge: {
      question: 'Why does a self join need two different table aliases?',
      options: ['To distinguish which copy of the table each column comes from', 'Because PostgreSQL requires aliases for all joins', 'To enable the ON clause to work correctly', 'To improve query performance'],
      correct: 0,
    },
    task: {
      prompt: "Find all employees who directly report to 'Alice Johnson' (show their names).",
      check: ({ rows }) => rows.length === 4,
      hint: "JOIN employees m ON e.manager_id = m.id WHERE m.name = 'Alice Johnson'",
    },
  },

  /* ── Subqueries ──────────────────────────────────────────────── */
  {
    id: 'subquery-where',
    chapter: 'Subqueries',
    title: 'Subquery in WHERE',
    concept: `A **subquery** is a complete query nested inside another query. In a WHERE clause, it's often used to compute a value to filter against — like "above the company average salary".

The inner query runs first, returns a single value, and the outer query uses it.`,
    sql: `SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n)\nORDER BY salary DESC;`,
    challenge: {
      question: 'When does the inner subquery execute relative to the outer query?',
      options: ['First — the outer query then uses its result', 'After the outer query finishes', 'At exactly the same time', 'Only when the outer WHERE is true'],
      correct: 0,
    },
    task: {
      prompt: 'Find employees earning below the average salary.',
      check: ({ rows }) => rows.length > 0 && rows.every(r => Number(r.salary) < 1030000 / 12),
      hint: 'WHERE salary < (SELECT AVG(salary) FROM employees)',
    },
  },
  {
    id: 'subquery-from',
    chapter: 'Subqueries',
    title: 'Subquery in FROM',
    concept: `A subquery in the **FROM** clause creates a **derived table** — a temporary result you can query like a real table. It must have an alias.

Useful for pre-computing aggregates before filtering them (you can't use WHERE on aggregate results).`,
    sql: `SELECT dept_id, avg_sal\nFROM (\n  SELECT\n    department_id            AS dept_id,\n    ROUND(AVG(salary), 0)    AS avg_sal\n  FROM employees\n  GROUP BY department_id\n) dept_stats\nWHERE avg_sal > 80000\nORDER BY avg_sal DESC;`,
    challenge: {
      question: 'What must a subquery used in the FROM clause always have?',
      options: ['An alias (a name)', 'A WHERE clause', 'A GROUP BY clause', 'An ORDER BY clause'],
      correct: 0,
    },
    task: {
      prompt: 'Using a subquery in FROM, find departments with average salary above 90000.',
      check: ({ rows }) => rows.length > 0,
      hint: 'FROM (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) s WHERE avg_sal > 90000',
    },
  },
  {
    id: 'exists',
    chapter: 'Subqueries',
    title: 'EXISTS',
    concept: `**EXISTS** checks whether a subquery returns any rows. It stops as soon as one row is found — often faster than IN for large datasets because it doesn't enumerate all matching values.

The inner query typically references a column from the outer query, creating a **correlated subquery**.`,
    sql: `-- Departments that have at least one active project\nSELECT d.name AS department\nFROM departments d\nWHERE EXISTS (\n  SELECT 1\n  FROM projects p\n  WHERE p.department_id = d.id\n    AND p.status = 'active'\n);`,
    challenge: {
      question: 'When does EXISTS stop scanning rows in the subquery?',
      options: ['As soon as one matching row is found', 'After scanning all rows', 'After scanning exactly 100 rows', 'When the outer query finishes'],
      correct: 0,
    },
    task: {
      prompt: 'Find departments that have NO projects using NOT EXISTS.',
      check: ({ rows }) => rows.length > 0,
      hint: 'WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.department_id = d.id)',
    },
  },

  /* ── CTEs ────────────────────────────────────────────────────── */
  {
    id: 'basic-cte',
    chapter: 'CTEs',
    title: 'Basic WITH clause',
    concept: `A **CTE** (Common Table Expression) uses the **WITH** keyword to name a subquery and reference it like a temporary table in the main query.

CTEs make complex queries easier to read by giving meaningful names to intermediate steps. They don't create permanent objects — they exist only for the duration of the query.`,
    sql: `WITH high_earners AS (\n  SELECT name, salary, department_id\n  FROM employees\n  WHERE salary > 80000\n)\nSELECT\n  h.name,\n  h.salary,\n  d.name AS department\nFROM high_earners h\nJOIN departments d ON h.department_id = d.id\nORDER BY h.salary DESC;`,
    challenge: {
      question: 'How long does a CTE (WITH clause) persist after the query runs?',
      options: ['Only for the duration of that single query', 'Until the database session ends', 'Until the database restarts', 'Permanently, like a view'],
      correct: 0,
    },
    task: {
      prompt: "Write a CTE named 'eng_team' that selects employees in department 1, then SELECT from it.",
      check: ({ rows }) => rows.length === 6,
      hint: 'WITH eng_team AS (SELECT * FROM employees WHERE department_id = 1) SELECT * FROM eng_team',
    },
  },
  {
    id: 'chained-ctes',
    chapter: 'CTEs',
    title: 'Chained CTEs',
    concept: `Define multiple CTEs in one **WITH** block, separated by commas. Later CTEs can reference earlier ones — this lets you build logic step-by-step, with each CTE doing one clear thing.

This is far more readable than deeply nested subqueries.`,
    sql: `WITH dept_stats AS (\n  SELECT\n    department_id,\n    ROUND(AVG(salary), 0) AS avg_sal,\n    COUNT(*) AS headcount\n  FROM employees\n  GROUP BY department_id\n),\nnamed AS (\n  SELECT\n    d.name  AS dept_name,\n    ds.avg_sal,\n    ds.headcount\n  FROM dept_stats ds\n  JOIN departments d ON ds.department_id = d.id\n)\nSELECT * FROM named\nORDER BY avg_sal DESC;`,
    challenge: {
      question: 'In a WITH block with multiple CTEs, can a later CTE reference an earlier one?',
      options: ['Yes — later CTEs can freely reference earlier ones', 'No — each CTE is completely independent', 'Only if they share a column name', 'Only in PostgreSQL 14 and later'],
      correct: 0,
    },
    task: {
      prompt: 'Write two chained CTEs: one computing headcount per dept, one filtering to depts with headcount >= 2.',
      check: ({ rows }) => rows.length > 0,
      hint: 'WITH counts AS (...GROUP BY...), big AS (SELECT * FROM counts WHERE headcount >= 2) SELECT * FROM big',
    },
  },
  {
    id: 'recursive-cte',
    chapter: 'CTEs',
    title: 'Recursive CTE',
    concept: `A **recursive CTE** references itself to traverse hierarchical data like org charts or trees.

It has two parts joined with UNION ALL: the **base case** (starting rows with no recursion) and the **recursive case** (rows that join back to the CTE). It stops when the recursive part returns no more rows.`,
    sql: `WITH RECURSIVE org AS (\n  — Base: top-level employees (no manager)\n  SELECT id, name, manager_id, 0 AS depth\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  — Recursive: reports of employees already in org\n  SELECT e.id, e.name, e.manager_id, o.depth + 1\n  FROM employees e\n  JOIN org o ON e.manager_id = o.id\n)\nSELECT\n  repeat('  ', depth) || name AS hierarchy,\n  depth AS level\nFROM org\nORDER BY depth, name;`,
    challenge: {
      question: 'What causes a recursive CTE to stop executing?',
      options: ['When the recursive part returns no more rows', 'A hard limit of 100 iterations', 'A STOP keyword at the end', 'When it reaches the base case again'],
      correct: 0,
    },
    task: {
      prompt: 'Write a recursive CTE to find all employees at depth 1 (direct reports of the CEO).',
      check: ({ rows }) => rows.length === 4,
      hint: 'Base case: WHERE manager_id IS NULL. Recursive: JOIN employees e ON e.manager_id = org.id. Filter final result WHERE depth = 1',
    },
  },

  /* ── Window Functions ────────────────────────────────────────── */
  {
    id: 'row-number-rank',
    chapter: 'Window Functions',
    title: 'ROW_NUMBER & RANK',
    concept: `**Window functions** compute values across a set of rows related to the current row — without collapsing them like GROUP BY does. Every row stays in the result with its own windowed value.

**ROW_NUMBER** gives unique sequential numbers. **RANK** gives the same number to ties and skips the next rank. **DENSE_RANK** ties share a rank without any skipping.`,
    sql: `SELECT\n  name,\n  salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,\n  RANK()       OVER (ORDER BY salary DESC) AS rank,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank\nFROM employees\nORDER BY salary DESC;`,
    challenge: {
      question: 'If two employees tie at rank 3, what rank does the next employee get with RANK() vs DENSE_RANK()?',
      options: ['RANK gives 5 (skips 4); DENSE_RANK gives 4 (no skip)', 'Both give rank 4', 'RANK gives 4; DENSE_RANK gives 5', 'Both give rank 5'],
      correct: 0,
    },
    task: {
      prompt: 'Assign ROW_NUMBER to all employees ordered by hire_date ascending.',
      check: ({ fields }) => fields.some(f => ['row_number', 'row_num', 'rn', 'num'].includes(f.name)),
      hint: 'SELECT name, hire_date, ROW_NUMBER() OVER (ORDER BY hire_date) AS row_num FROM employees',
    },
  },
  {
    id: 'lead-lag',
    chapter: 'Window Functions',
    title: 'LEAD & LAG',
    concept: `**LAG(col, n, default)** accesses the value N rows before the current row. **LEAD(col, n, default)** accesses N rows after. Both accept an optional default for when there's no previous/next row.

Great for comparing each row to its neighbours — like showing the previous hire's salary alongside the current one.`,
    sql: `SELECT\n  name,\n  hire_date,\n  salary,\n  LAG(name)   OVER (ORDER BY hire_date) AS prev_hire,\n  LEAD(name)  OVER (ORDER BY hire_date) AS next_hire\nFROM employees\nORDER BY hire_date;`,
    challenge: {
      question: 'What does LAG(col) return for the very first row in the result set?',
      options: ['NULL (or the default value if provided as third argument)', 'The value from the last row', '0 or empty string', 'The same value as the current row'],
      correct: 0,
    },
    task: {
      prompt: 'Show each employee name, their salary, and the salary of the next employee (ordered by salary ASC) using LEAD.',
      check: ({ fields }) => fields.some(f => f.name.includes('lead') || f.name.includes('next')),
      hint: 'LEAD(salary) OVER (ORDER BY salary) AS next_salary',
    },
  },
  {
    id: 'running-total',
    chapter: 'Window Functions',
    title: 'Running total',
    concept: `**SUM() OVER (ORDER BY ...)** computes a cumulative total. Each row's value includes all prior rows in the defined order — the window "frame" defaults to ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.

This is the standard pattern for running sums, running averages, and cumulative counts.`,
    sql: `SELECT\n  name,\n  hire_date,\n  salary,\n  SUM(salary) OVER (ORDER BY hire_date) AS cumulative_payroll\nFROM employees\nORDER BY hire_date;`,
    challenge: {
      question: 'What default window frame does SUM() OVER (ORDER BY col) use?',
      options: ['All rows from the start up to and including the current row', 'All rows in the entire partition', 'Only the current row', 'The previous row and the current row only'],
      correct: 0,
    },
    task: {
      prompt: 'Compute a running total of salaries ordered by salary ascending.',
      check: ({ fields, rows }) => rows.length === 12 && fields.some(f => f.name.includes('total') || f.name.includes('running') || f.name.includes('sum')),
      hint: 'SUM(salary) OVER (ORDER BY salary) AS running_total',
    },
  },
  {
    id: 'partition-by',
    chapter: 'Window Functions',
    title: 'PARTITION BY',
    concept: `**PARTITION BY** restarts the window function independently for each group — like GROUP BY for window functions, but without collapsing rows. Every row keeps all its original columns alongside the windowed result.

Here each employee is ranked within their own department, not across the whole company.`,
    sql: `SELECT\n  name,\n  department_id,\n  salary,\n  ROUND(AVG(salary) OVER (PARTITION BY department_id), 0) AS dept_avg,\n  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank\nFROM employees\nORDER BY department_id, salary DESC;`,
    challenge: {
      question: 'What does PARTITION BY do differently from GROUP BY?',
      options: ['Restarts the window function per group without collapsing rows', 'Collapses rows into groups like GROUP BY', 'Sorts the result by the partition column', 'Filters out NULL values from the window'],
      correct: 0,
    },
    task: {
      prompt: 'Show each employee with their salary and the maximum salary in their department using MAX() OVER PARTITION BY.',
      check: ({ rows }) => rows.length === 12,
      hint: 'MAX(salary) OVER (PARTITION BY department_id) AS dept_max',
    },
  },

  /* ── PostgreSQL Extras ───────────────────────────────────────── */
  {
    id: 'case-when',
    chapter: 'PostgreSQL Extras',
    title: 'CASE WHEN',
    concept: `**CASE WHEN** is SQL's conditional expression — like if/else. It evaluates conditions in order and returns the value for the first match. Without ELSE, unmatched rows return NULL.

CASE is an expression, not a statement — it can appear anywhere a value can appear: in SELECT, WHERE, ORDER BY, or even inside aggregate functions.`,
    sql: `SELECT\n  name,\n  salary,\n  CASE\n    WHEN salary >= 100000 THEN 'Senior'\n    WHEN salary >= 75000  THEN 'Mid-level'\n    ELSE 'Junior'\n  END AS band\nFROM employees\nORDER BY salary DESC;`,
    challenge: {
      question: 'What does CASE WHEN return if no condition matches and there is no ELSE clause?',
      options: ['NULL', '0 (zero)', 'An empty string', 'A runtime error'],
      correct: 0,
    },
    task: {
      prompt: "Label departments as 'High budget' if budget > 700000, else 'Standard'. Show department name and the label.",
      check: ({ rows }) => rows.length === 5,
      hint: "CASE WHEN budget > 700000 THEN 'High budget' ELSE 'Standard' END AS budget_band",
    },
  },
  {
    id: 'string-functions',
    chapter: 'PostgreSQL Extras',
    title: 'String functions',
    concept: `PostgreSQL has rich string functions: **UPPER/LOWER** changes case, **LENGTH** counts characters, **SPLIT_PART** splits on a delimiter, **TRIM** removes whitespace, and \`||\` concatenates strings.

These can be combined — e.g. extracting a first name from a full name column.`,
    sql: `SELECT\n  name,\n  UPPER(name)                   AS upper_name,\n  LENGTH(name)                  AS char_count,\n  SPLIT_PART(name, ' ', 1)      AS first_name,\n  SPLIT_PART(name, ' ', 2)      AS last_name,\n  'Hi, ' || SPLIT_PART(name, ' ', 1) || '!' AS greeting\nFROM employees\nORDER BY name;`,
    challenge: {
      question: "What does the || operator do in PostgreSQL?",
      options: ['Concatenates two strings together', 'Logical OR for string conditions', 'Compares two strings for equality', 'Splits a string at a delimiter'],
      correct: 0,
    },
    task: {
      prompt: 'Extract the first name of all employees using SPLIT_PART, and show it alongside the full name.',
      check: ({ fields, rows }) => rows.length === 12 && fields.some(f => f.name === 'first_name' || f.name.includes('first')),
      hint: "SELECT name, SPLIT_PART(name, ' ', 1) AS first_name FROM employees",
    },
  },
  {
    id: 'date-functions',
    chapter: 'PostgreSQL Extras',
    title: 'Date functions',
    concept: `PostgreSQL has first-class date/time support. **EXTRACT** pulls out a component (year, month, day). **DATE_TRUNC** rounds to a precision. **NOW()** returns the current timestamp. **AGE()** computes a human-readable interval between two dates.`,
    sql: `SELECT\n  name,\n  hire_date,\n  EXTRACT(YEAR  FROM hire_date) AS hire_year,\n  EXTRACT(MONTH FROM hire_date) AS hire_month,\n  DATE_TRUNC('year', hire_date)::date AS year_start,\n  (CURRENT_DATE - hire_date) / 365 AS years_employed\nFROM employees\nORDER BY hire_date;`,
    challenge: {
      question: 'What does EXTRACT(YEAR FROM hire_date) return?',
      options: ['The year part of the date as a number', 'The full date formatted as a year string', 'The number of years from today', 'An interval value'],
      correct: 0,
    },
    task: {
      prompt: 'Find all employees hired in the year 2020 (use EXTRACT).',
      check: ({ rows }) => rows.length === 3,
      hint: 'WHERE EXTRACT(YEAR FROM hire_date) = 2020',
    },
  },
  {
    id: 'jsonb-basics',
    chapter: 'PostgreSQL Extras',
    title: 'JSONB basics',
    concept: `PostgreSQL's **JSONB** type stores JSON in an efficient binary format that supports indexing. Use \`->\` to get a field as a JSON value, \`->>\` to get it as plain text.

JSONB is unique to PostgreSQL — it lets you query semi-structured data with the same SQL you use everywhere else.`,
    sql: `SELECT\n  name,\n  metadata->>'level'  AS level,\n  metadata->>'skills' AS skills\nFROM employees\nWHERE metadata IS NOT NULL\nORDER BY metadata->>'level' DESC;`,
    challenge: {
      question: "What is the difference between -> and ->> when accessing JSONB fields?",
      options: ['-> returns a JSON value; ->> returns plain text', '->> returns a JSON value; -> returns plain text', 'They are identical in all cases', '-> is for arrays; ->> is for objects'],
      correct: 0,
    },
    task: {
      prompt: "Find all employees whose metadata level is 'L6' and show their name and level.",
      check: ({ rows }) => rows.length === 2,
      hint: "WHERE metadata->>'level' = 'L6'",
    },
  },

  /* ── Indexes, Transactions & Performance ── */
  {
    id: 'create-index',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Create an index',
    concept: `An **index** is a lookup structure the database keeps so it can find rows without scanning the whole table. Create one on a column you filter or join on a lot.

The tradeoff: indexes speed up reads but slightly slow down writes and use disk. This query creates an index on \`department_id\`, then lists all indexes on the table from PostgreSQL's catalog.`,
    sql: `CREATE INDEX IF NOT EXISTS idx_emp_department\n  ON employees (department_id);\n\nSELECT indexname, indexdef\nFROM pg_indexes\nWHERE tablename = 'employees'\nORDER BY indexname;`,
    challenge: {
      question: 'What is the main tradeoff of adding an index?',
      options: ['Faster reads, but slower writes and more storage', 'Slower reads, faster writes', 'It deletes duplicate rows', 'It has no downside'],
      correct: 0,
    },
  },
  {
    id: 'explain-analyze',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Read a query plan with EXPLAIN',
    concept: `**EXPLAIN** shows how PostgreSQL plans to run a query without running it; **EXPLAIN ANALYZE** actually runs it and reports real timing and row counts.

Read it bottom-up: look for sequential scans on big tables (a candidate for an index) versus index scans. This is the first tool every professional reaches for when a query is slow.`,
    sql: `EXPLAIN ANALYZE\nSELECT name, salary\nFROM employees\nWHERE department_id = 1;`,
    challenge: {
      question: 'What does EXPLAIN ANALYZE add over plain EXPLAIN?',
      options: ['It runs the query and reports actual timing and row counts', 'It rewrites the query to be faster', 'It creates an index automatically', 'It only validates syntax'],
      correct: 0,
    },
  },
  {
    id: 'transactions',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Transactions: BEGIN, COMMIT, ROLLBACK',
    concept: `A **transaction** groups statements so they all succeed or all fail together — the "A" (atomicity) in ACID. \`BEGIN\` starts it, \`COMMIT\` saves every change, and \`ROLLBACK\` discards them.

Here we raise a salary inside a transaction, read it back to prove the change is visible, then \`ROLLBACK\` to undo it — so the seed data stays intact.`,
    sql: `BEGIN;\n\nUPDATE employees SET salary = salary + 5000 WHERE id = 1;\n\n-- The change is visible inside the transaction:\nSELECT id, name, salary FROM employees WHERE id = 1;\n\nROLLBACK;`,
    challenge: {
      question: 'What does ROLLBACK do?',
      options: ['Discards every change made since BEGIN', 'Permanently saves the changes', 'Creates a backup table', 'Locks the database'],
      correct: 0,
    },
  },
  {
    id: 'rollback-proof',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Rollback undoes everything',
    concept: `Transactions are how you stay safe. Even a \`DELETE\` is reversible until you \`COMMIT\`. Below we delete a row, immediately \`ROLLBACK\`, then select the row again — and it is still there.

This is why you wrap risky multi-step changes (transfers, migrations) in a transaction: if any step fails, you roll the whole thing back to a clean state.`,
    sql: `BEGIN;\n\nDELETE FROM employees WHERE id = 1;\n\nROLLBACK;\n\n-- After ROLLBACK the row is back:\nSELECT id, name, salary FROM employees WHERE id = 1;`,
    challenge: {
      question: 'After BEGIN; DELETE...; ROLLBACK; what happens to the deleted row?',
      options: ['It is restored — ROLLBACK undid the delete', 'It is permanently gone', 'It is moved to a trash table', 'The query errors'],
      correct: 0,
    },
  },
  {
    id: 'upsert',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Upsert with ON CONFLICT',
    concept: `An **upsert** inserts a row, or updates it if a key already exists — in one atomic statement. PostgreSQL uses \`INSERT ... ON CONFLICT (col) DO UPDATE\`.

Use \`EXCLUDED\` to reference the values you tried to insert. Here the department id already exists, so the insert turns into an update. We wrap it in a transaction and roll back to keep the seed clean.`,
    sql: `BEGIN;\n\nINSERT INTO departments (id, name, location, budget)\nVALUES (1, 'Engineering', 'Remote', 999999)\nON CONFLICT (id) DO UPDATE\n  SET location = EXCLUDED.location,\n      budget   = EXCLUDED.budget;\n\nSELECT id, name, location, budget FROM departments WHERE id = 1;\n\nROLLBACK;`,
    challenge: {
      question: 'What does ON CONFLICT (id) DO UPDATE do?',
      options: ['Updates the existing row when the id already exists instead of erroring', 'Always inserts a duplicate', 'Deletes the conflicting row', 'Ignores the statement entirely'],
      correct: 0,
    },
  },
  {
    id: 'views',
    chapter: 'Indexes, Transactions & Performance',
    title: 'Save a query as a view',
    concept: `A **view** is a named, saved query you can select from like a table. It hides complex joins and aggregations behind a simple name, so the rest of your app reads clean SQL.

Views compute on demand (they always reflect current data). Create one for department headcount, then query it.`,
    sql: `CREATE OR REPLACE VIEW dept_headcount AS\nSELECT d.name AS department, COUNT(e.id) AS employees\nFROM departments d\nLEFT JOIN employees e ON e.department_id = d.id\nGROUP BY d.name;\n\nSELECT * FROM dept_headcount ORDER BY employees DESC;`,
    challenge: {
      question: 'What is a SQL view?',
      options: ['A named, saved query you can select from like a table', 'A copy of a table that never updates', 'A type of index', 'A backup of the database'],
      correct: 0,
    },
  },
];
