export const LESSONS = [
  {
    id: 'hello-javascript',
    chapter: 'Foundations',
    title: 'Hello JavaScript',
    type: 'live',
    concept: 'JavaScript runs instructions one by one. In this playground, `write()` prints to the output panel and `console.log()` writes to the console panel. Edit the strings, numbers, or order of the lines and the preview updates instantly.',
    code: `write('Hello, JavaScript!');
write('This line came from your code.');

console.log('The console is useful for debugging.');`,
  },
  {
    id: 'variables',
    chapter: 'Foundations',
    title: 'Variables',
    type: 'picker',
    concept: 'Variables store values so you can reuse them. Use `const` when the variable should not be reassigned, and `let` when you plan to change it later.',
    challenge: {
      question: 'Which keyword should you choose for a value that will be reassigned?',
      options: ['const', 'let', 'fixed', 'static'],
      correct: 1,
    },
    options: [
      {
        label: 'const',
        code: `const name = 'Maya';
const language = 'JavaScript';

write(name + ' is learning ' + language + '.');`,
      },
      {
        label: 'let',
        code: `let score = 0;
write('Starting score: ' + score);

score = score + 10;
write('After bonus: ' + score);`,
      },
      {
        label: 'template',
        code: `const product = 'Notebook';
const price = 8;
const quantity = 3;

write(\`\${quantity} x \${product}\`);
write(\`Total: $\${price * quantity}\`);`,
      },
    ],
  },
  {
    id: 'types',
    chapter: 'Foundations',
    title: 'Types',
    type: 'live',
    concept: '`typeof` tells you the kind of value JavaScript is working with. Strings, numbers, booleans, objects, arrays, and functions behave differently, so checking a type is a common debugging move.',
    code: `const values = [
  'JavaScript',
  42,
  true,
  ['HTML', 'CSS', 'JS'],
  { level: 'beginner' },
  function greet() {}
];

values.forEach(value => {
  write(JSON.stringify(value) + ' -> ' + typeof value);
});`,
  },
  {
    id: 'operators',
    chapter: 'Values & Logic',
    title: 'Operators',
    type: 'picker',
    concept: 'Operators combine or compare values. Arithmetic operators calculate numbers. Comparison operators return booleans. Logical operators combine booleans into larger decisions.',
    options: [
      {
        label: 'math',
        code: `const subtotal = 45;
const tax = subtotal * 0.08;
const total = subtotal + tax;

write('Subtotal: $' + subtotal);
write('Tax: $' + tax.toFixed(2));
write('Total: $' + total.toFixed(2));`,
      },
      {
        label: 'compare',
        code: `const age = 19;
const hasTicket = true;

write('Age check: ' + (age >= 18));
write('Ticket check: ' + hasTicket);
write('Can enter: ' + (age >= 18 && hasTicket));`,
      },
      {
        label: 'fallback',
        code: `const savedName = '';
const displayName = savedName || 'Guest';

write('Welcome, ' + displayName + '!');
write('Empty strings are falsy, so the fallback was used.');`,
      },
    ],
  },
  {
    id: 'string-number-methods',
    chapter: 'Values & Logic',
    title: 'String & Number Methods',
    type: 'picker',
    concept: 'Real apps spend a lot of time cleaning text and formatting numbers. String methods like `trim()`, `toLowerCase()`, and `includes()` help normalize user input. Number methods like `toFixed()` help display calculated values.',
    challenge: {
      question: 'Which string method removes extra whitespace from both ends?',
      options: ['clean()', 'trim()', 'slice()', 'format()'],
      correct: 1,
    },
    options: [
      {
        label: 'clean text',
        code: `const email = '  Puneet@Example.COM  ';
const cleaned = email.trim().toLowerCase();

write('Raw: "' + email + '"');
write('Cleaned: ' + cleaned);
write('Looks like an email: ' + cleaned.includes('@'));`,
      },
      {
        label: 'slice text',
        code: `const orderId = 'INV-2026-0042';
const prefix = orderId.slice(0, 3);
const year = orderId.slice(4, 8);
const number = orderId.slice(-4);

write('Prefix: ' + prefix);
write('Year: ' + year);
write('Number: ' + number);`,
      },
      {
        label: 'format number',
        code: `const price = 19.99;
const quantity = 3;
const taxRate = 0.08;

const subtotal = price * quantity;
const tax = subtotal * taxRate;
const total = subtotal + tax;

write('Subtotal: $' + subtotal.toFixed(2));
write('Tax: $' + tax.toFixed(2));
write('Total: $' + total.toFixed(2));`,
      },
    ],
  },
  {
    id: 'if-else',
    chapter: 'Control Flow',
    title: 'If / Else',
    type: 'picker',
    concept: '`if` statements let code choose a path. Change the values in each example and watch which branch runs.',
    challenge: {
      question: 'What does an if statement test?',
      options: ['A file name', 'A condition that becomes true or false', 'Only numbers', 'Only strings'],
      correct: 1,
    },
    options: [
      {
        label: 'simple',
        code: `const temperature = 31;

if (temperature > 30) {
  write('It is hot today.');
} else {
  write('The weather is mild.');
}`,
      },
      {
        label: 'else if',
        code: `const score = 84;

if (score >= 90) {
  write('Grade: A');
} else if (score >= 80) {
  write('Grade: B');
} else if (score >= 70) {
  write('Grade: C');
} else {
  write('Keep practicing.');
}`,
      },
      {
        label: 'guard',
        code: `const username = 'puneet';

if (!username) {
  write('Please enter a username.');
} else {
  write('Profile loaded for @' + username);
}`,
      },
    ],
  },
  {
    id: 'loops',
    chapter: 'Control Flow',
    title: 'Loops',
    type: 'picker',
    concept: 'Loops repeat work. Use a `for` loop when you know the count, and array methods like `forEach` when you already have a collection.',
    options: [
      {
        label: 'for',
        code: `for (let i = 1; i <= 5; i++) {
  write('Step ' + i);
}`,
      },
      {
        label: 'forEach',
        code: `const tasks = ['Plan', 'Build', 'Test', 'Ship'];

tasks.forEach((task, index) => {
  write((index + 1) + '. ' + task);
});`,
      },
      {
        label: 'break',
        code: `const numbers = [3, 7, 12, 18, 24];

for (const number of numbers) {
  if (number > 15) {
    write('First number over 15: ' + number);
    break;
  }
}`,
      },
    ],
  },
  {
    id: 'functions',
    chapter: 'Functions',
    title: 'Functions',
    type: 'picker',
    concept: 'Functions package code behind a name. They can receive inputs called parameters and return a result. Good functions do one clear job.',
    challenge: {
      question: 'What does `return` do inside a function?',
      options: ['Prints text automatically', 'Stops the page from loading', 'Sends a value back to the caller', 'Creates a variable'],
      correct: 2,
    },
    options: [
      {
        label: 'declaration',
        code: `function greet(name) {
  return 'Hello, ' + name + '!';
}

write(greet('Ava'));
write(greet('Noah'));`,
      },
      {
        label: 'arrow',
        code: `const double = number => number * 2;
const addTax = price => price * 1.08;

write('Double 12: ' + double(12));
write('Price with tax: $' + addTax(30).toFixed(2));`,
      },
      {
        label: 'callback',
        code: `function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

repeat(3, step => write('Callback run #' + step));`,
      },
    ],
  },
  {
    id: 'scope',
    chapter: 'Functions',
    title: 'Scope',
    type: 'live',
    concept: 'Scope decides where a variable can be used. Variables created inside a block or function stay inside it. This prevents names from accidentally overwriting each other.',
    code: `const pageTitle = 'Dashboard';

function renderHeader() {
  const pageTitle = 'Settings';
  write('Inside function: ' + pageTitle);
}

renderHeader();
write('Outside function: ' + pageTitle);`,
  },
  {
    id: 'arrays',
    chapter: 'Arrays',
    title: 'Arrays',
    type: 'picker',
    concept: 'Arrays hold ordered lists. Indexes start at `0`, so the first item is `items[0]`. Methods like `push`, `map`, and `filter` help transform lists.',
    options: [
      {
        label: 'read',
        code: `const languages = ['HTML', 'CSS', 'JavaScript'];

write('First: ' + languages[0]);
write('Last: ' + languages[languages.length - 1]);
write('Count: ' + languages.length);`,
      },
      {
        label: 'map',
        code: `const prices = [12, 24, 36];
const salePrices = prices.map(price => price * 0.8);

write('Original: ' + prices.join(', '));
write('Sale: ' + salePrices.join(', '));`,
      },
      {
        label: 'filter',
        code: `const tasks = [
  { title: 'Write copy', done: true },
  { title: 'Build layout', done: false },
  { title: 'Test mobile', done: false }
];

const openTasks = tasks.filter(task => !task.done);
write('Open tasks: ' + openTasks.map(task => task.title).join(', '));`,
      },
    ],
  },
  {
    id: 'array-reduce',
    chapter: 'Arrays',
    title: 'Reduce & Totals',
    type: 'picker',
    concept: '`reduce()` turns an array into one value: a total, an object, a grouped result, or a string. It is useful when `map()` still leaves you with a list but your UI needs one summary value.',
    challenge: {
      question: 'What does reduce usually produce?',
      options: ['One combined result', 'Only a copied array', 'A DOM element', 'A random item'],
      correct: 0,
    },
    options: [
      {
        label: 'total',
        code: `const cart = [
  { item: 'Keyboard', price: 49 },
  { item: 'Mouse', price: 24 },
  { item: 'Cable', price: 9 }
];

const total = cart.reduce((sum, product) => {
  return sum + product.price;
}, 0);

write('Cart total: $' + total);`,
      },
      {
        label: 'count',
        code: `const votes = ['yes', 'no', 'yes', 'yes', 'no'];

const counts = votes.reduce((result, vote) => {
  result[vote] = (result[vote] || 0) + 1;
  return result;
}, {});

write(JSON.stringify(counts, null, 2));`,
      },
      {
        label: 'group',
        code: `const tasks = [
  { title: 'Wireframe', status: 'todo' },
  { title: 'Build UI', status: 'doing' },
  { title: 'Review copy', status: 'todo' }
];

const grouped = tasks.reduce((result, task) => {
  result[task.status] = result[task.status] || [];
  result[task.status].push(task.title);
  return result;
}, {});

write(JSON.stringify(grouped, null, 2));`,
      },
    ],
  },
  {
    id: 'objects',
    chapter: 'Objects',
    title: 'Objects',
    type: 'picker',
    concept: 'Objects group related values under property names. Use dot notation for known property names and bracket notation when the property name is stored in a variable.',
    challenge: {
      question: 'Which expression reads the `name` property from `user`?',
      options: ['user-name', 'user.name', 'name.user', 'user(name)'],
      correct: 1,
    },
    options: [
      {
        label: 'read',
        code: `const user = {
  name: 'Isha',
  role: 'Frontend Developer',
  active: true
};

write(user.name + ' is a ' + user.role + '.');
write('Active: ' + user.active);`,
      },
      {
        label: 'update',
        code: `const cart = {
  items: 2,
  total: 48
};

cart.items += 1;
cart.total += 19;

write(JSON.stringify(cart, null, 2));`,
      },
      {
        label: 'destructure',
        code: `const project = {
  title: 'Landing page',
  status: 'In review',
  owner: 'Sam'
};

const { title, status } = project;
write(title + ' -> ' + status);`,
      },
    ],
  },
  {
    id: 'object-methods',
    chapter: 'Objects',
    title: 'Object Methods',
    type: 'picker',
    concept: 'Objects can store functions as methods. A method can use `this` to read other properties on the same object. Built-in helpers like `Object.keys()` and `Object.entries()` make objects easier to inspect and render.',
    options: [
      {
        label: 'method',
        code: `const invoice = {
  number: 'INV-0042',
  subtotal: 120,
  taxRate: 0.08,
  total() {
    return this.subtotal + this.subtotal * this.taxRate;
  }
};

write(invoice.number);
write('Total: $' + invoice.total().toFixed(2));`,
      },
      {
        label: 'keys',
        code: `const profile = {
  name: 'Dev',
  role: 'Frontend',
  city: 'Pune'
};

Object.keys(profile).forEach(key => {
  write(key + ': ' + profile[key]);
});`,
      },
      {
        label: 'entries',
        code: `const settings = {
  darkMode: true,
  compactView: false,
  autosave: true
};

const enabled = Object.entries(settings)
  .filter(([key, value]) => value)
  .map(([key]) => key);

write('Enabled settings: ' + enabled.join(', '));`,
      },
    ],
  },
  {
    id: 'console-debugging',
    chapter: 'Debugging',
    title: 'Debugging with Console',
    type: 'live',
    concept: 'Debugging means observing what the code is doing. Use `console.log()` for values, `console.warn()` for suspicious states, and `console.error()` for failures. Open the Console panel in the preview to inspect these messages.',
    code: `const user = {
  name: 'Riya',
  plan: 'free',
  projects: 0
};

console.log('Loaded user:', user);

if (user.projects === 0) {
  console.warn('User has not created a project yet.');
}

if (user.plan !== 'pro') {
  console.error('Upgrade required for exports.');
}

write('Open the Console panel to inspect the debug messages.');`,
  },
  {
    id: 'try-catch',
    chapter: 'Debugging',
    title: 'Try / Catch',
    type: 'picker',
    concept: '`try` / `catch` lets your program handle a risky operation instead of crashing. It is common when parsing JSON, reading optional data, or validating user input.',
    challenge: {
      question: 'When does the catch block run?',
      options: ['Every time', 'Only when code in try throws an error', 'Before try runs', 'Only on button clicks'],
      correct: 1,
    },
    options: [
      {
        label: 'parse JSON',
        code: `const text = '{ "name": "Asha", "points": 42 }';

try {
  const data = JSON.parse(text);
  write('User: ' + data.name);
  write('Points: ' + data.points);
} catch (error) {
  write('Could not parse JSON.');
  console.error(error.message);
}`,
      },
      {
        label: 'bad JSON',
        code: `const text = '{ name: "Asha", points: 42 }';

try {
  const data = JSON.parse(text);
  write(data.name);
} catch (error) {
  write('Invalid JSON format.');
  console.error(error.message);
}`,
      },
      {
        label: 'validate',
        code: `function getDiscount(code) {
  if (!code) {
    throw new Error('Missing coupon code');
  }
  return code === 'SAVE10' ? 10 : 0;
}

try {
  const discount = getDiscount('');
  write('Discount: ' + discount + '%');
} catch (error) {
  write(error.message);
}`,
      },
    ],
  },
  {
    id: 'dom-select',
    chapter: 'DOM',
    title: 'Select Elements',
    type: 'live',
    concept: 'The DOM is the browser representation of the page. In this playground, `app` is a blank preview element you can fill with HTML, and `$()` selects one element from inside the preview.',
    code: `app.innerHTML = \`
  <h2>Profile</h2>
  <p class="name">Aarav Sharma</p>
  <p class="role">JavaScript learner</p>
\`;

const name = $('.name');
name.style.color = '#2563eb';
name.style.fontWeight = '700';

write('Selected text: ' + name.textContent);`,
  },
  {
    id: 'dom-create',
    chapter: 'DOM',
    title: 'Create Elements',
    type: 'live',
    concept: '`document.createElement()` creates real DOM nodes. `append()` adds them to the page. This is how JavaScript can build UI from data.',
    code: `const skills = ['Variables', 'Functions', 'DOM', 'Events'];

const list = document.createElement('ul');
list.style.paddingLeft = '20px';

skills.forEach(skill => {
  const item = document.createElement('li');
  item.textContent = skill;
  list.append(item);
});

app.append(list);`,
  },
  {
    id: 'dom-render-list',
    chapter: 'DOM',
    title: 'Render Data to DOM',
    type: 'live',
    concept: 'A common JavaScript pattern is data in, HTML out. Keep data in an array, map it into markup, then render it into the page. This is the same mental model used by modern UI libraries.',
    code: `const products = [
  { name: 'Keyboard', price: 49, stock: 3 },
  { name: 'Mouse', price: 24, stock: 0 },
  { name: 'USB-C Cable', price: 9, stock: 12 }
];

app.innerHTML = products.map(product => \`
  <article style="padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 8px;">
    <strong>\${product.name}</strong>
    <div>$\${product.price}</div>
    <small>\${product.stock > 0 ? product.stock + ' in stock' : 'Sold out'}</small>
  </article>
\`).join('');

write('Rendered ' + products.length + ' products.');`,
  },
  {
    id: 'events',
    chapter: 'Events',
    title: 'Click Events',
    type: 'live',
    concept: 'Events let code respond to user actions. Click the button in the preview, then edit the increment amount or button text.',
    challenge: {
      question: 'Which method listens for a click?',
      options: ['onClickNow()', 'addEventListener()', 'listenClick()', 'watch()'],
      correct: 1,
    },
    code: `app.innerHTML = \`
  <button id="counter">Clicked 0 times</button>
\`;

const button = $('#counter');
let count = 0;

button.style.padding = '10px 14px';
button.style.border = '1px solid #2563eb';
button.style.borderRadius = '6px';
button.style.background = '#eff6ff';
button.style.color = '#1d4ed8';

button.addEventListener('click', () => {
  count += 1;
  button.textContent = 'Clicked ' + count + ' times';
  console.log('Current count:', count);
});`,
  },
  {
    id: 'forms',
    chapter: 'Events',
    title: 'Form Input',
    type: 'live',
    concept: '`input` events run as the user types. Use them to validate forms, update previews, or calculate totals without refreshing the page.',
    code: `app.innerHTML = \`
  <label>
    Your name
    <input id="nameInput" placeholder="Type here" />
  </label>
  <p id="preview">Hello, stranger.</p>
\`;

const input = $('#nameInput');
const preview = $('#preview');

input.style.margin = '8px 0';
input.style.padding = '8px 10px';
input.style.border = '1px solid #d1d5db';
input.style.borderRadius = '6px';
input.style.display = 'block';

input.addEventListener('input', () => {
  const name = input.value.trim() || 'stranger';
  preview.textContent = 'Hello, ' + name + '.';
});`,
  },
  {
    id: 'event-delegation',
    chapter: 'Events',
    title: 'Event Delegation',
    type: 'live',
    concept: 'Event delegation puts one listener on a parent element instead of many listeners on many children. It works because events bubble upward through the DOM. This is useful for lists that can grow or change.',
    code: `const filters = ['All', 'Open', 'Done'];

app.innerHTML = \`
  <div id="filters">
    \${filters.map(filter => \`
      <button data-filter="\${filter}" style="margin-right: 6px; padding: 7px 10px;">
        \${filter}
      </button>
    \`).join('')}
  </div>
  <p id="status">No filter selected.</p>
\`;

$('#filters').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  $('#status').textContent = 'Selected filter: ' + button.dataset.filter;
  console.log('Filter changed:', button.dataset.filter);
});`,
  },
  {
    id: 'oop-classes',
    chapter: 'DOM',
    title: 'Classes & Styles',
    type: 'picker',
    concept: 'JavaScript can change styles directly or toggle CSS classes. Classes are usually easier to maintain because the styling stays in CSS and JavaScript only changes state.',
    options: [
      {
        label: 'style',
        code: `app.innerHTML = '<p id="note">This note was styled by JavaScript.</p>';

const note = $('#note');
note.style.padding = '12px';
note.style.border = '1px solid #f59e0b';
note.style.background = '#fffbeb';
note.style.borderRadius = '6px';`,
      },
      {
        label: 'classList',
        code: `const style = document.createElement('style');
style.textContent = \`
  .card { padding: 14px; border: 1px solid #d1d5db; border-radius: 6px; }
  .active { border-color: #16a34a; background: #f0fdf4; color: #166534; }
\`;
document.head.append(style);

app.innerHTML = '<div id="card" class="card">Click to toggle active state</div>';
const card = $('#card');

card.addEventListener('click', () => {
  card.classList.toggle('active');
});`,
      },
    ],
  },
  {
    id: 'json',
    chapter: 'Data',
    title: 'JSON',
    type: 'live',
    concept: 'JSON is a text format for data. APIs often send JSON strings. `JSON.parse()` turns a string into JavaScript data, and `JSON.stringify()` turns data back into text.',
    code: `const responseText = \`{
  "title": "JavaScript Playground",
  "lessons": 42,
  "free": true
}\`;

const data = JSON.parse(responseText);

write(data.title);
write('Lessons: ' + data.lessons);
write('Back to JSON:');
write(JSON.stringify(data, null, 2));`,
  },
  {
    id: 'data-transform',
    chapter: 'Data',
    title: 'Transform API Data',
    type: 'live',
    concept: 'API data is rarely in the exact shape your UI needs. A useful habit is to filter, map, and sort raw data before rendering or calculating from it.',
    code: `const users = [
  { name: 'Mira', active: true, points: 80 },
  { name: 'Kabir', active: false, points: 120 },
  { name: 'Sara', active: true, points: 95 }
];

const leaderboard = users
  .filter(user => user.active)
  .map(user => ({
    label: user.name.toUpperCase(),
    score: user.points
  }))
  .sort((a, b) => b.score - a.score);

write(JSON.stringify(leaderboard, null, 2));`,
  },
  {
    id: 'async-timeout',
    chapter: 'Async',
    title: 'setTimeout',
    type: 'live',
    concept: 'Asynchronous code runs later. `setTimeout()` schedules a function after a delay, so the rest of your code keeps moving while it waits.',
    code: `write('1. Start');

setTimeout(() => {
  write('3. This ran after 800ms');
}, 800);

write('2. Scheduled the timeout');`,
  },
  {
    id: 'promises',
    chapter: 'Async',
    title: 'Promises',
    type: 'picker',
    concept: 'A Promise represents work that will finish later. Use `.then()` or `async` / `await` to handle the result when it arrives.',
    challenge: {
      question: 'What does `await` do?',
      options: ['Repeats a loop', 'Waits for a Promise result inside an async function', 'Creates HTML', 'Stops all browser tabs'],
      correct: 1,
    },
    options: [
      {
        label: 'then',
        code: `const loadUser = new Promise(resolve => {
  setTimeout(() => resolve({ name: 'Dev', points: 120 }), 600);
});

write('Loading user...');

loadUser.then(user => {
  write(user.name + ' has ' + user.points + ' points.');
});`,
      },
      {
        label: 'await',
        code: `function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  write('Preparing...');
  await wait(600);
  write('Done.');
}

run();`,
      },
    ],
  },
  {
    id: 'async-data-pattern',
    chapter: 'Async',
    title: 'Async Data Pattern',
    type: 'live',
    concept: 'Real interfaces show loading, then data, or an error. This lesson uses a fake request so you can practice the pattern without depending on a network call.',
    code: `function fakeFetchProducts() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { name: 'Starter Plan', price: 0 },
        { name: 'Pro Plan', price: 19 }
      ]);
    }, 800);
  });
}

function renderLoading() {
  app.innerHTML = '<p>Loading plans...</p>';
}

function renderPlans(plans) {
  app.innerHTML = plans.map(plan => \`
    <button style="display:block;margin-bottom:8px;padding:10px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;">
      \${plan.name} - $\${plan.price}/mo
    </button>
  \`).join('');
}

async function load() {
  renderLoading();
  const plans = await fakeFetchProducts();
  renderPlans(plans);
  console.log('Plans loaded:', plans.length);
}

load();`,
  },
  {
    id: 'closures',
    chapter: 'Advanced Functions',
    title: 'Closures',
    type: 'picker',
    concept: 'A closure happens when an inner function remembers variables from the outer function after the outer function has finished. Closures power counters, factories, private state, and many event handlers.',
    challenge: {
      question: 'What does a closure remember?',
      options: ['Only HTML', 'Variables from its outer scope', 'Only global variables', 'CSS styles'],
      correct: 1,
    },
    options: [
      {
        label: 'counter',
        code: `function createCounter(start = 0) {
  let count = start;

  return function increment() {
    count += 1;
    return count;
  };
}

const next = createCounter(10);

write(next());
write(next());
write(next());`,
      },
      {
        label: 'private state',
        code: `function createWallet(balance) {
  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}

const wallet = createWallet(50);
wallet.deposit(25);

write('Balance: $' + wallet.getBalance());
write('Raw balance is private: ' + wallet.balance);`,
      },
    ],
  },
  {
    id: 'this-bind-call-apply',
    chapter: 'Advanced Functions',
    title: 'this, bind, call, apply',
    type: 'picker',
    concept: '`this` is decided by how a function is called. `bind()` locks a function to a specific object. `call()` and `apply()` run a function immediately with a chosen `this` value.',
    options: [
      {
        label: 'method',
        code: `const user = {
  name: 'Anaya',
  greet() {
    return 'Hello, ' + this.name;
  }
};

write(user.greet());`,
      },
      {
        label: 'bind',
        code: `const user = { name: 'Rohan' };

function greet(prefix) {
  return prefix + ', ' + this.name;
}

const greetRohan = greet.bind(user);

write(greetRohan('Welcome'));`,
      },
      {
        label: 'call/apply',
        code: `function total(label, taxRate) {
  const total = this.subtotal + this.subtotal * taxRate;
  return label + ': $' + total.toFixed(2);
}

const invoice = { subtotal: 100 };

write(total.call(invoice, 'Call total', 0.08));
write(total.apply(invoice, ['Apply total', 0.18]));`,
      },
    ],
  },
  {
    id: 'classes',
    chapter: 'OOP',
    title: 'Classes',
    type: 'live',
    concept: 'Classes are syntax for creating objects that share methods. Use a constructor for setup, instance methods for behavior, and subclasses when you need a specialized version.',
    code: `class Task {
  constructor(title, done = false) {
    this.title = title;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }

  label() {
    return this.done ? '[x] ' + this.title : '[ ] ' + this.title;
  }
}

const task = new Task('Learn classes');
write(task.label());

task.toggle();
write(task.label());`,
  },
  {
    id: 'prototypes',
    chapter: 'OOP',
    title: 'Prototypes',
    type: 'live',
    concept: 'JavaScript objects can inherit from other objects through prototypes. Classes use prototypes under the hood, so understanding the prototype chain helps debug shared methods and inheritance.',
    code: `function User(name) {
  this.name = name;
}

User.prototype.greet = function() {
  return 'Hi, I am ' + this.name;
};

const user = new User('Meera');

write(user.greet());
write('Has own name: ' + user.hasOwnProperty('name'));
write('Has own greet: ' + user.hasOwnProperty('greet'));
write('greet comes from prototype: ' + (user.greet === User.prototype.greet));`,
  },
  {
    id: 'modules',
    chapter: 'Architecture',
    title: 'Modules',
    type: 'live',
    concept: 'Modules split code into files. In real projects, `export` exposes values from one file and `import` reads them in another. The playground strips `export` so this single-editor example can still run.',
    code: `// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// app.js
// import { add, multiply } from './math.js';

write('2 + 3 = ' + add(2, 3));
write('4 x 5 = ' + multiply(4, 5));`,
  },
  {
    id: 'fetch-api',
    chapter: 'Browser APIs',
    title: 'Fetch API',
    type: 'live',
    concept: '`fetch()` makes HTTP requests. Real code should check `response.ok`, parse JSON, and handle errors. This lesson uses a data URL so it works without a network request.',
    code: `async function loadProfile() {
  const payload = encodeURIComponent(JSON.stringify({
    name: 'Nikhil',
    role: 'JavaScript Developer'
  }));

  const response = await fetch('data:application/json,' + payload);

  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }

  return response.json();
}

async function run() {
  try {
    write('Loading profile...');
    const profile = await loadProfile();
    write(profile.name + ' - ' + profile.role);
  } catch (error) {
    write(error.message);
  }
}

run();`,
  },
  {
    id: 'browser-storage',
    chapter: 'Browser APIs',
    title: 'localStorage Pattern',
    type: 'live',
    concept: '`localStorage` stores strings in the browser between visits. Sandboxed previews may block storage, so production code should handle failures and parse stored JSON carefully.',
    code: `function createStorage() {
  try {
    localStorage.setItem('__test', 'ok');
    localStorage.removeItem('__test');
    return localStorage;
  } catch {
    const memory = {};
    return {
      getItem(key) { return memory[key] ?? null; },
      setItem(key, value) { memory[key] = String(value); },
      removeItem(key) { delete memory[key]; }
    };
  }
}

const storage = createStorage();
const settings = { theme: 'dark', compact: true };

storage.setItem('settings', JSON.stringify(settings));

const saved = JSON.parse(storage.getItem('settings'));
write('Theme: ' + saved.theme);
write('Compact: ' + saved.compact);`,
  },
  {
    id: 'url-formdata-clipboard',
    chapter: 'Browser APIs',
    title: 'URLSearchParams & FormData',
    type: 'live',
    concept: '`URLSearchParams` reads query strings. `FormData` reads form fields. Clipboard APIs usually require permission, so this lesson focuses on safe parsing and form extraction patterns.',
    code: `const params = new URLSearchParams('?q=javascript&page=2');

write('Search: ' + params.get('q'));
write('Page: ' + params.get('page'));

app.innerHTML = \`
  <form id="signup">
    <input name="email" value="dev@example.com" />
    <input name="plan" value="pro" />
  </form>
\`;

const form = $('#signup');
const data = new FormData(form);

write('Email: ' + data.get('email'));
write('Plan: ' + data.get('plan'));`,
  },
  {
    id: 'event-loop',
    chapter: 'Performance',
    title: 'Event Loop & Microtasks',
    type: 'live',
    concept: 'JavaScript runs synchronous code first. Promise callbacks run as microtasks before timer callbacks. This ordering explains many async bugs.',
    challenge: {
      question: 'Which usually runs first after synchronous code: Promise microtask or setTimeout callback?',
      options: ['setTimeout', 'Promise microtask', 'They are random', 'Neither can run'],
      correct: 1,
    },
    code: `write('1. Sync start');

setTimeout(() => {
  write('4. Timer callback');
}, 0);

Promise.resolve().then(() => {
  write('3. Promise microtask');
});

write('2. Sync end');`,
  },
  {
    id: 'debounce-throttle',
    chapter: 'Performance',
    title: 'Debounce & Throttle',
    type: 'picker',
    concept: 'Debounce waits until activity pauses. Throttle limits how often a function can run. They protect expensive work during typing, scrolling, resizing, and pointer movement.',
    options: [
      {
        label: 'debounce',
        code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

app.innerHTML = '<input id="search" placeholder="Type quickly" /><p id="result"></p>';

const search = debounce(value => {
  $('#result').textContent = 'Searching for: ' + value;
  console.log('Search fired:', value);
}, 500);

$('#search').addEventListener('input', event => {
  search(event.target.value);
});`,
      },
      {
        label: 'throttle',
        code: `function throttle(fn, delay) {
  let waiting = false;
  return (...args) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    setTimeout(() => waiting = false, delay);
  };
}

let moves = 0;
const track = throttle(() => {
  moves += 1;
  write('Tracked move #' + moves);
}, 500);

app.innerHTML = '<button id="move">Click rapidly</button>';
$('#move').addEventListener('click', track);`,
      },
    ],
  },
  {
    id: 'performance-measure',
    chapter: 'Performance',
    title: 'Measure Performance',
    type: 'live',
    concept: 'Measure before optimizing. `performance.now()` gives precise timing so you can compare approaches and spot slow work.',
    code: `const numbers = Array.from({ length: 50000 }, (_, index) => index + 1);

const start = performance.now();

const total = numbers
  .filter(number => number % 2 === 0)
  .map(number => number * 2)
  .reduce((sum, number) => sum + number, 0);

const end = performance.now();

write('Total: ' + total);
write('Time: ' + (end - start).toFixed(2) + 'ms');`,
  },
  {
    id: 'safe-rendering',
    chapter: 'Security',
    title: 'Safe Rendering',
    type: 'picker',
    concept: 'Never put untrusted user input into `innerHTML`. Use `textContent` when rendering user-provided text so HTML is displayed as text instead of executed as markup.',
    challenge: {
      question: 'Which property is safer for untrusted user text?',
      options: ['innerHTML', 'textContent', 'eval', 'document.write'],
      correct: 1,
    },
    options: [
      {
        label: 'safe',
        code: `const userInput = '<img src=x onerror="alert(1)"> Hello';

const message = document.createElement('p');
message.textContent = userInput;
app.append(message);

write('The input was rendered as text, not HTML.');`,
      },
      {
        label: 'template',
        code: `function renderComment(text) {
  const article = document.createElement('article');
  const title = document.createElement('strong');
  const body = document.createElement('p');

  title.textContent = 'User comment';
  body.textContent = text;

  article.append(title, body);
  return article;
}

app.append(renderComment('<script>bad()</script> Nice post!'));`,
      },
    ],
  },
  {
    id: 'tiny-tests',
    chapter: 'Testing',
    title: 'Tiny Tests',
    type: 'live',
    concept: 'Tests protect behavior while you edit. A tiny assertion helper is enough to learn the habit: arrange input, run the function, compare the actual result to the expected result.',
    code: `function assertEqual(actual, expected, label) {
  if (actual === expected) {
    write('PASS: ' + label);
  } else {
    write('FAIL: ' + label + ' - expected ' + expected + ', got ' + actual);
  }
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

assertEqual(slugify('Hello World'), 'hello-world', 'spaces become dashes');
assertEqual(slugify(' JS & DOM! '), 'js-dom', 'symbols are removed');`,
  },
  {
    id: 'mini-project-filterable-list',
    chapter: 'Mini Projects',
    title: 'Filterable List',
    type: 'live',
    concept: 'Mini projects combine fundamentals: data, rendering, events, filtering, and safe DOM updates. This pattern appears in dashboards, admin tools, stores, and search interfaces.',
    code: `const tasks = [
  { title: 'Write proposal', status: 'open' },
  { title: 'Send invoice', status: 'done' },
  { title: 'Review contract', status: 'open' }
];

app.innerHTML = \`
  <input id="query" placeholder="Search tasks" style="padding:8px 10px;margin-bottom:10px;width:220px;" />
  <div id="list"></div>
\`;

function render(query = '') {
  const matches = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  $('#list').innerHTML = matches.map(task => \`
    <label style="display:block;margin-bottom:8px;">
      <input type="checkbox" \${task.status === 'done' ? 'checked' : ''} />
      \${task.title}
    </label>
  \`).join('') || '<p>No tasks found.</p>';
}

$('#query').addEventListener('input', event => {
  render(event.target.value);
});

render();`,
  },
  {
    id: 'mini-project-expense-summary',
    chapter: 'Mini Projects',
    title: 'Expense Summary',
    type: 'live',
    concept: 'This mini project combines form reading, arrays, rendering, and reduce. It is close to the kind of small tool you might build before moving to a framework.',
    code: `const expenses = [
  { label: 'Hosting', amount: 12 },
  { label: 'Domain', amount: 15 }
];

app.innerHTML = \`
  <form id="expenseForm">
    <input name="label" placeholder="Label" value="Coffee" />
    <input name="amount" type="number" value="4" />
    <button>Add</button>
  </form>
  <ul id="items"></ul>
  <strong id="total"></strong>
\`;

function render() {
  $('#items').innerHTML = expenses
    .map(item => \`<li>\${item.label}: $\${item.amount}</li>\`)
    .join('');

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  $('#total').textContent = 'Total: $' + total;
}

$('#expenseForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  expenses.push({
    label: data.get('label'),
    amount: Number(data.get('amount'))
  });

  render();
});

render();`,
  },

  // ── Generators & Iterators ──────────────────────────────────────────────
  {
    id: 'generators-basics',
    chapter: 'Generators',
    title: 'Generator Functions',
    type: 'live',
    concept: '`function*` creates a generator — a function that can pause and resume with `yield`. Each call to `.next()` runs until the next `yield`, returning `{ value, done }`. Generators are lazy: they produce values only when asked.',
    code: `function* countdown(from) {
  while (from > 0) {
    yield from;
    from--;
  }
  yield 'Blast off!';
}

const counter = countdown(5);

write(counter.next().value); // 5
write(counter.next().value); // 4
write(counter.next().value); // 3

// Iterate the rest with for...of
for (const val of counter) {
  write(val);
}`,
  },
  {
    id: 'generators-infinite',
    chapter: 'Generators',
    title: 'Infinite Sequences',
    type: 'live',
    concept: 'Generators can produce infinite sequences because they are lazy — nothing is computed until `.next()` is called. This is useful for IDs, pagination, or any sequence with no natural end.',
    code: `function* idGenerator(prefix = 'item') {
  let id = 1;
  while (true) {
    yield \`\${prefix}-\${id++}\`;
  }
}

const ids = idGenerator('user');

write(ids.next().value); // user-1
write(ids.next().value); // user-2
write(ids.next().value); // user-3

function take(gen, n) {
  const result = [];
  for (const val of gen) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}

const productIds = idGenerator('product');
write(take(productIds, 4).join(', '));`,
  },
  {
    id: 'custom-iterators',
    chapter: 'Generators',
    title: 'Custom Iterators',
    type: 'picker',
    concept: 'Any object with a `[Symbol.iterator]()` method is iterable — it works with `for...of`, spread `[...]`, and destructuring. You can add iteration to your own classes using a generator method.',
    challenge: {
      question: 'Which symbol makes an object iterable with for...of?',
      options: ['Symbol.iterator', 'Symbol.async', 'Symbol.iterable', 'Symbol.next'],
      correct: 0,
    },
    options: [
      {
        label: 'Range object',
        code: `const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const num of range) {
  write(num);
}

write([...range].join(', '));`,
      },
      {
        label: 'Generator method',
        code: `class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const nums = new NumberRange(2, 10);
const evens = [...nums].filter(n => n % 2 === 0);
write(evens.join(', '));`,
      },
    ],
  },

  // ── Modern Methods ──────────────────────────────────────────────────────
  {
    id: 'array-at',
    chapter: 'Modern Methods',
    title: 'Array.at() & Object.hasOwn()',
    type: 'live',
    concept: '`Array.at(index)` accepts negative indices — `at(-1)` is the last element, no more `arr[arr.length - 1]`. `Object.hasOwn(obj, key)` is the modern replacement for `obj.hasOwnProperty(key)`, works on null-prototype objects too.',
    code: `const scores = [88, 92, 74, 99, 61];

write('First: ' + scores.at(0));
write('Last:  ' + scores.at(-1));
write('Second-to-last: ' + scores.at(-2));

const settings = { theme: 'dark', lang: 'en' };

write('Has theme: ' + Object.hasOwn(settings, 'theme'));
write('Has admin: ' + Object.hasOwn(settings, 'admin'));

// Works on null-prototype objects (hasOwnProperty would throw here)
const lookup = Object.create(null);
lookup.key = 'value';
write('Null-proto hasOwn: ' + Object.hasOwn(lookup, 'key'));`,
  },
  {
    id: 'object-groupby',
    chapter: 'Modern Methods',
    title: 'Object.groupBy()',
    type: 'live',
    concept: '`Object.groupBy(iterable, keyFn)` groups items into an object of arrays keyed by whatever your function returns. It replaces a common `reduce()` pattern for bucketing data.',
    code: `const products = [
  { name: 'Notebook', category: 'stationery', price: 4 },
  { name: 'Pen Set', category: 'stationery', price: 12 },
  { name: 'Laptop Stand', category: 'tech', price: 35 },
  { name: 'Mouse Pad', category: 'tech', price: 18 },
  { name: 'Desk Lamp', category: 'furniture', price: 45 },
];

const byCategory = Object.groupBy(products, p => p.category);

for (const [category, items] of Object.entries(byCategory)) {
  write(category.toUpperCase() + ':');
  items.forEach(item => write('  ' + item.name + ' — $' + item.price));
}

const byTier = Object.groupBy(products, p =>
  p.price < 20 ? 'budget' : p.price < 40 ? 'mid' : 'premium'
);
write('Budget items: ' + byTier.budget.map(p => p.name).join(', '));`,
  },
  {
    id: 'structured-clone',
    chapter: 'Modern Methods',
    title: 'structuredClone()',
    type: 'picker',
    concept: '`structuredClone(value)` creates a deep clone of any structured-cloneable value — nested objects, arrays, Maps, Sets, Dates, even circular references. It replaces the fragile `JSON.parse(JSON.stringify(x))` hack.',
    challenge: {
      question: 'What does JSON.parse(JSON.stringify(obj)) break that structuredClone handles?',
      options: ['Arrays inside objects', 'Dates become strings', 'Primitive values', 'String keys'],
      correct: 1,
    },
    options: [
      {
        label: 'Deep clone',
        code: `const original = {
  name: 'Alice',
  scores: [10, 20, 30],
  address: { city: 'Paris' }
};

const clone = structuredClone(original);

clone.scores.push(40);
clone.address.city = 'London';

write('Original scores: ' + original.scores.join(', '));
write('Clone scores:    ' + clone.scores.join(', '));
write('Original city: ' + original.address.city);
write('Clone city:    ' + clone.address.city);`,
      },
      {
        label: 'Dates preserved',
        code: `const event = {
  title: 'Launch',
  date: new Date('2025-01-15'),
  tags: new Set(['marketing', 'product'])
};

const jsonClone = JSON.parse(JSON.stringify(event));
write('JSON date type: ' + typeof jsonClone.date);  // string
write('JSON tags type: ' + typeof jsonClone.tags);  // object (plain)

const deepClone = structuredClone(event);
write('Deep date is Date: ' + (deepClone.date instanceof Date));  // true
write('Deep tags is Set:  ' + (deepClone.tags instanceof Set));   // true`,
      },
    ],
  },

  // ── Regex ───────────────────────────────────────────────────────────────
  {
    id: 'regex-basics',
    chapter: 'Regex',
    title: 'Patterns & Flags',
    type: 'live',
    concept: 'A regular expression (`/pattern/flags`) matches text by pattern. Common flags: `g` (global — find all matches), `i` (case-insensitive). Use `.test()` to check existence, `.match()` to extract results, named groups `(?<name>...)` to label captures.',
    code: `const text = 'Contact us at hello@example.com or support@fwd.dev';

const hasEmail = /\\w+@\\w+\\.\\w+/.test(text);
write('Has email: ' + hasEmail);

const emails = text.match(/[\\w.-]+@[\\w.-]+\\.[a-z]{2,}/g);
write('Emails: ' + emails.join(', '));

const phrase = 'JavaScript is great. javascript rocks.';
const count = phrase.match(/javascript/gi)?.length ?? 0;
write('Occurrences: ' + count);

const dateStr = '2025-06-15';
const { groups } = dateStr.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);
write('Year: ' + groups.year + ', Month: ' + groups.month + ', Day: ' + groups.day);`,
  },
  {
    id: 'regex-replace',
    chapter: 'Regex',
    title: 'replace & transform',
    type: 'live',
    concept: '`String.replace(regex, fn)` with a function as the second argument lets you transform each match dynamically. This pattern powers slug generators, card masking, template engines, and text normalisation.',
    code: `function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

write(slugify('Hello, World!'));
write(slugify('  CSS & HTML Tips  '));

// Mask card — keep last 4 digits
const card = '4111 1111 1111 9876';
const masked = card.replace(/\\d(?=\\d{4})/g, '*');
write(masked);

// Title case
const title = 'the quick brown fox';
const titleCase = title.replace(/(^|\\s)\\w/g, c => c.toUpperCase());
write(titleCase);

// Simple template engine
const template = 'Hello, {name}! You have {count} messages.';
const data = { name: 'Sam', count: 5 };
const result = template.replace(/\\{(\\w+)\\}/g, (_, key) => data[key] ?? _);
write(result);`,
  },

  // ── AbortController ─────────────────────────────────────────────────────
  {
    id: 'abort-controller',
    chapter: 'AbortController',
    title: 'Cancelling Fetch',
    type: 'live',
    concept: '`AbortController` lets you cancel in-flight fetch requests. Pass `signal` to fetch; calling `controller.abort()` immediately rejects the promise with `AbortError`. This prevents stale responses from updating UI after the user navigates away or makes a new request.',
    code: `let controller = null;

async function startFetch(path) {
  if (controller) {
    controller.abort();
    write('Cancelled previous request');
  }

  controller = new AbortController();

  try {
    write('Fetching ' + path + '...');
    const res = await fetch('https://jsonplaceholder.typicode.com' + path, {
      signal: controller.signal
    });
    const data = await res.json();
    write('Got: ' + data.title);
  } catch (err) {
    if (err.name === 'AbortError') {
      write('Fetch aborted');
    } else {
      write('Error: ' + err.message);
    }
  }
}

// Second request cancels the first
startFetch('/posts/1');
startFetch('/posts/2');`,
  },
  {
    id: 'abort-timeout',
    chapter: 'AbortController',
    title: 'AbortSignal.timeout()',
    type: 'live',
    concept: '`AbortSignal.timeout(ms)` creates a signal that automatically aborts after the given milliseconds — no manual `setTimeout` needed. The rejection name is `TimeoutError` (not `AbortError`), so you can distinguish the two.',
    code: `async function fetchWithTimeout(path, ms) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com' + path, {
      signal: AbortSignal.timeout(ms)
    });
    const data = await res.json();
    write('OK: ' + data.title);
  } catch (err) {
    if (err.name === 'TimeoutError') {
      write('Timed out after ' + ms + 'ms');
    } else if (err.name === 'AbortError') {
      write('Aborted');
    } else {
      write('Error: ' + err.message);
    }
  }
}

fetchWithTimeout('/todos/1', 5000); // should succeed
fetchWithTimeout('/todos/2', 1);    // will time out`,
  },

  // ── Observers ───────────────────────────────────────────────────────────
  {
    id: 'intersection-observer',
    chapter: 'Observers',
    title: 'IntersectionObserver',
    type: 'live',
    concept: '`IntersectionObserver` fires a callback when an element enters or leaves the viewport. It is the performant replacement for scroll event listeners — no layout thrashing, runs off the main thread.',
    code: `app.innerHTML =
  '<p style="color:#888;margin-bottom:180px;">Scroll down to reveal cards</p>' +
  [1, 2, 3, 4].map(i =>
    '<div class="card" style="opacity:0;transform:translateY(40px);' +
    'transition:opacity .5s,transform .5s;background:#f3f4f6;' +
    'border-radius:12px;padding:24px;margin-bottom:16px;">' +
    'Card ' + i + '</div>'
  ).join('');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.card').forEach(el => observer.observe(el));`,
  },
  {
    id: 'resize-observer',
    chapter: 'Observers',
    title: 'ResizeObserver',
    type: 'live',
    concept: '`ResizeObserver` fires whenever an element\'s size changes — not just the window. Use it to build truly responsive components that react to their container width, powering container-aware layouts without media queries.',
    code: `app.style.cssText = 'resize:horizontal;overflow:auto;min-width:200px;';

const label = document.createElement('div');
label.style.cssText = 'font-family:monospace;padding:12px;background:#f9fafb;border-radius:8px;';
app.appendChild(label);

const box = document.createElement('div');
box.style.cssText = 'margin-top:12px;border-radius:8px;transition:background .3s;padding:20px;color:#fff;text-align:center;font-weight:bold;';
app.appendChild(box);

const ro = new ResizeObserver(entries => {
  const { width } = entries[0].contentRect;
  label.textContent = 'Width: ' + Math.round(width) + 'px';

  if (width < 300) {
    box.style.background = '#ef4444';
    box.textContent = 'Narrow';
  } else if (width < 500) {
    box.style.background = '#f59e0b';
    box.textContent = 'Medium';
  } else {
    box.style.background = '#22c55e';
    box.textContent = 'Wide';
  }
});

ro.observe(app);`,
  },

  // ── Proxy & Reflect ──────────────────────────────────────────────────────
  {
    id: 'proxy-basics',
    chapter: 'Proxy & Reflect',
    title: 'Proxy Traps',
    type: 'live',
    concept: 'A `Proxy` wraps an object and intercepts operations via "traps". The `get` trap fires on property reads, `set` on writes. Use `Reflect.get/set` inside traps to forward the operation to the target after your custom logic.',
    code: `const handler = {
  get(target, key, receiver) {
    write('GET: ' + String(key));
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    if (typeof target[key] !== 'undefined' && typeof value !== typeof target[key]) {
      write('REJECTED: ' + key + ' must be ' + typeof target[key]);
      return false;
    }
    write('SET: ' + String(key) + ' = ' + value);
    return Reflect.set(target, key, value, receiver);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

write('--- Read ---');
const n = user.name;

write('--- Write ---');
user.name = 'Bob';     // ok
user.age = 'thirty';  // blocked
user.age = 31;         // ok

write('Result: ' + user.name + ', age ' + user.age);`,
  },
  {
    id: 'proxy-reactive',
    chapter: 'Proxy & Reflect',
    title: 'Reactive State with Proxy',
    type: 'live',
    concept: 'Proxy `set` traps power reactive state systems — every write automatically triggers a re-render. This is the core idea behind Vue 3\'s reactivity. The pattern keeps state and UI in sync without any manual update calls.',
    code: `function reactive(data, onUpdate) {
  return new Proxy(data, {
    set(target, key, value) {
      target[key] = value;
      onUpdate(target);
      return true;
    }
  });
}

const counter = reactive({ count: 0 }, render);

function render(state) {
  app.innerHTML =
    '<div style="text-align:center;padding:20px;">' +
    '<p style="font-size:48px;font-weight:800;margin:0">' + state.count + '</p>' +
    '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">' +
    '<button onclick="counter.count--" style="padding:8px 20px;background:#ef4444;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:20px;">−</button>' +
    '<button onclick="counter.count=0" style="padding:8px 16px;background:#6b7280;color:#fff;border:none;border-radius:8px;cursor:pointer;">Reset</button>' +
    '<button onclick="counter.count++" style="padding:8px 20px;background:#22c55e;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:20px;">+</button>' +
    '</div></div>';
}

render(counter);`,
  },

  // ── Browser APIs ─────────────────────────────────────────────────────────
  {
    id: 'canvas-api',
    chapter: 'Browser APIs',
    title: 'Canvas API',
    type: 'live',
    concept: 'The Canvas API lets you draw 2D graphics with JavaScript. Get a `CanvasRenderingContext2D` via `canvas.getContext("2d")`, then call drawing methods. Pair with `requestAnimationFrame` for smooth animation loops.',
    code: `app.innerHTML = '<canvas id="c" width="320" height="180" style="border-radius:10px;display:block"></canvas>';
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

let angle = 0;

function draw() {
  ctx.clearRect(0, 0, 320, 180);

  // Background
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(0, 0, 320, 180);

  // Orbiting circle
  const cx = 160 + Math.cos(angle) * 70;
  const cy = 90  + Math.sin(angle) * 50;

  // Trail
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(99,102,241,0.3)';
  ctx.fill();

  // Ball
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#6366f1';
  ctx.fill();

  // Centre dot
  ctx.beginPath();
  ctx.arc(160, 90, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#a5b4fc';
  ctx.fill();

  angle += 0.04;
  requestAnimationFrame(draw);
}

draw();`,
  },
  {
    id: 'web-workers',
    chapter: 'Browser APIs',
    title: 'Web Workers',
    type: 'live',
    concept: 'Web Workers run JavaScript on a background thread — keeping the main thread responsive while heavy computation runs. Create a worker from a Blob URL (no separate file needed). Workers communicate with the main thread via `postMessage` and `onmessage`.',
    code: `// Create an inline worker from a Blob — no separate file needed
const workerCode = \`
  self.onmessage = function(e) {
    const n = e.data;
    // Fibonacci — intentionally slow for large n
    function fib(x) { return x <= 1 ? x : fib(x-1) + fib(x-2); }
    const result = fib(n);
    self.postMessage({ n, result });
  };
\`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

app.innerHTML = \`
  <p>Computing fib(38) on a background thread…</p>
  <p style="color:#6b7280;font-size:13px">Main thread stays responsive while worker computes</p>
  <div id="out" style="margin-top:10px;font-weight:700;color:#6366f1"></div>
\`;

const start = performance.now();

worker.onmessage = function(e) {
  const ms = (performance.now() - start).toFixed(0);
  document.getElementById('out').textContent =
    'fib(' + e.data.n + ') = ' + e.data.result + '  (' + ms + 'ms off-thread)';
  worker.terminate();
};

worker.postMessage(38);`,
  },
  {
    id: 'drag-drop',
    chapter: 'Browser APIs',
    title: 'Drag & Drop API',
    type: 'live',
    concept: 'The native Drag & Drop API lets users drag elements and drop them on targets. Key events: `dragstart` (set data), `dragover` (must `preventDefault` to allow drop), `drop` (read data and act). Use `dataTransfer` to pass information between drag source and drop target.',
    code: `app.innerHTML = \`
  <div style="display:flex;gap:16px;align-items:flex-start">
    <div>
      <p style="font-size:12px;color:#6b7280;font-weight:600;margin-bottom:8px">DRAG FROM</p>
      <div id="source" style="display:flex;flex-direction:column;gap:6px">
        <div class="draggable" draggable="true" data-id="1"
          style="padding:8px 14px;background:#6366f1;color:white;border-radius:8px;font-size:13px;font-weight:600;cursor:grab">
          Item A
        </div>
        <div class="draggable" draggable="true" data-id="2"
          style="padding:8px 14px;background:#8b5cf6;color:white;border-radius:8px;font-size:13px;font-weight:600;cursor:grab">
          Item B
        </div>
        <div class="draggable" draggable="true" data-id="3"
          style="padding:8px 14px;background:#06b6d4;color:white;border-radius:8px;font-size:13px;font-weight:600;cursor:grab">
          Item C
        </div>
      </div>
    </div>
    <div id="dropzone"
      style="flex:1;min-height:100px;border:2px dashed #d1d5db;border-radius:10px;padding:12px;font-size:12px;color:#9ca3af;transition:all .2s">
      Drop here
    </div>
  </div>
\`;

document.querySelectorAll('.draggable').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', el.dataset.id);
    el.style.opacity = '0.4';
  });
  el.addEventListener('dragend', () => el.style.opacity = '1');
});

const zone = document.getElementById('dropzone');

zone.addEventListener('dragover', e => {
  e.preventDefault();
  zone.style.borderColor = '#6366f1';
  zone.style.background = '#eef2ff';
});

zone.addEventListener('dragleave', () => {
  zone.style.borderColor = '#d1d5db';
  zone.style.background = '';
});

zone.addEventListener('drop', e => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const src = document.querySelector('[data-id="' + id + '"]');
  zone.appendChild(src.cloneNode(true));
  zone.style.borderColor = '#d1d5db';
  zone.style.background = '';
  zone.style.color = '#374151';
});`,
  },
  {
    id: 'clipboard-api',
    chapter: 'Browser APIs',
    title: 'Clipboard API',
    type: 'live',
    concept: 'The Clipboard API provides `navigator.clipboard.writeText()` and `readText()` for programmatic copy/paste. Both return Promises. Reading clipboard requires user permission and a user gesture. Writing clipboard also requires a secure context (HTTPS or localhost).',
    code: `app.innerHTML = \`
  <div style="display:flex;flex-direction:column;gap:10px">
    <textarea id="source" rows="3" style="width:100%;padding:8px;border-radius:8px;border:1px solid #d1d5db;font-family:inherit;font-size:13px;resize:none">
Copy this text to the clipboard!</textarea>

    <div style="display:flex;gap:8px">
      <button id="copyBtn" style="padding:7px 16px;background:#6366f1;color:white;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">
        Copy
      </button>
      <button id="pasteBtn" style="padding:7px 16px;background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">
        Paste
      </button>
    </div>

    <textarea id="target" rows="3" placeholder="Pasted content will appear here…"
      style="width:100%;padding:8px;border-radius:8px;border:1px solid #d1d5db;font-family:inherit;font-size:13px;resize:none;background:#f9fafb"></textarea>

    <div id="status" style="font-size:12px;color:#6b7280"></div>
  </div>
\`;

document.getElementById('copyBtn').addEventListener('click', async () => {
  const text = document.getElementById('source').value;
  await navigator.clipboard.writeText(text);
  document.getElementById('status').textContent = '✓ Copied to clipboard';
});

document.getElementById('pasteBtn').addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('target').value = text;
    document.getElementById('status').textContent = '✓ Pasted from clipboard';
  } catch {
    document.getElementById('status').textContent = 'Permission denied or no clipboard data';
  }
});`,
  },
];

export const CHAPTERS = [...new Set(LESSONS.map(lesson => lesson.chapter))];
