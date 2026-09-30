export const LESSONS = [
  {
    id: 'ts-hello',
    chapter: 'Getting Started',
    title: 'Hello TypeScript',
    concept: 'TypeScript is JavaScript with added syntax for types. The browser still runs JavaScript, but TypeScript helps you catch mistakes before code runs.',
    challenge: {
      question: 'What does TypeScript add to JavaScript?',
      options: ['HTML tags', 'Type syntax and checking', 'A database', 'CSS animations'],
      correct: 1,
    },
    code: `const message: string = 'Hello, TypeScript!';
const year: number = 2026;

write(message);
write('Learning year: ' + year);`,
  },
  {
    id: 'ts-simple-types',
    chapter: 'Getting Started',
    title: 'Simple Types',
    concept: 'The most common TypeScript primitives are `string`, `number`, and `boolean`. Add them when you want a variable to accept only one kind of value.',
    code: `const username: string = 'Puneet';
const lessonsDone: number = 4;
const isLearning: boolean = true;

write(username + ' completed ' + lessonsDone + ' lessons.');
write('Learning active: ' + isLearning);`,
  },
  {
    id: 'ts-inference',
    chapter: 'Getting Started',
    title: 'Type Inference',
    concept: 'TypeScript can often infer types from initial values. You do not need to annotate every variable. Use explicit types when they clarify intent or document an API boundary.',
    code: `const framework = 'Angular';
const score = 95;
const passed = score >= 80;

write(framework + ' score: ' + score);
write('Passed: ' + passed);`,
  },
  {
    id: 'ts-special-types',
    chapter: 'Core Types',
    title: 'any, unknown, never',
    concept: '`any` disables checking, `unknown` forces you to narrow before using a value, and `never` represents impossible values. Prefer `unknown` over `any` for external data.',
    challenge: {
      question: 'Which special type is safer for untrusted external data?',
      options: ['any', 'unknown', 'never', 'boolean'],
      correct: 1,
    },
    code: `let apiValue: unknown = '42';

if (typeof apiValue === 'string') {
  write('String length: ' + apiValue.length);
}

let looseValue: any = { total: 99 };
write('any skips checks: ' + looseValue.total);`,
  },
  {
    id: 'ts-arrays',
    chapter: 'Core Types',
    title: 'Typed Arrays',
    concept: 'Arrays can be typed with `string[]`, `number[]`, or `Array<T>`. Typed arrays prevent accidental mixed values in lists.',
    code: `const skills: string[] = ['HTML', 'CSS', 'TypeScript'];
const scores: Array<number> = [80, 92, 100];

write('Skills: ' + skills.join(', '));
write('Average: ' + (scores.reduce((sum, score) => sum + score, 0) / scores.length));`,
  },
  {
    id: 'ts-tuples',
    chapter: 'Core Types',
    title: 'Tuples',
    concept: 'A tuple is an array with a fixed order of types. Use tuples for small structured pairs like coordinates, status tuples, or key/value results.',
    code: `const point: [number, number] = [12, 8];
const userRow: [number, string, boolean] = [101, 'Asha', true];

write('Point x=' + point[0] + ', y=' + point[1]);
write('User: #' + userRow[0] + ' ' + userRow[1] + ' active=' + userRow[2]);`,
  },
  {
    id: 'ts-objects',
    chapter: 'Object Types',
    title: 'Object Types',
    concept: 'Object types describe the shape of an object: which properties exist and what type each property should hold.',
    code: `const user: { name: string; role: string; active: boolean } = {
  name: 'Mira',
  role: 'Frontend Developer',
  active: true
};

write(user.name + ' - ' + user.role);
write('Active: ' + user.active);`,
  },
  {
    id: 'ts-optional-readonly',
    chapter: 'Object Types',
    title: 'Optional and Readonly',
    concept: 'Optional properties use `?`. Readonly properties cannot be reassigned after creation. These tools help model real data more accurately.',
    code: `type Project = {
  readonly id: number;
  title: string;
  client?: string;
};

const project: Project = {
  id: 1,
  title: 'TypeScript Playground'
};

write('Project #' + project.id);
write('Client: ' + (project.client ?? 'Internal'));`,
  },
  {
    id: 'ts-enums',
    chapter: 'Object Types',
    title: 'Enums',
    concept: 'Enums define a named set of values. Many teams now prefer string literal unions, but enums are still common in TypeScript codebases.',
    code: `enum Status {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived'
}

const current: Status = Status.Published;
write('Current status: ' + current);`,
  },
  {
    id: 'ts-aliases',
    chapter: 'Aliases & Interfaces',
    title: 'Type Aliases',
    concept: 'A type alias gives a name to a type. Use aliases for object shapes, unions, tuples, function signatures, and reusable domain types.',
    code: `type Invoice = {
  number: string;
  total: number;
  paid: boolean;
};

const invoice: Invoice = {
  number: 'INV-001',
  total: 250,
  paid: false
};

write(invoice.number + ' total: $' + invoice.total);`,
  },
  {
    id: 'ts-interfaces',
    chapter: 'Aliases & Interfaces',
    title: 'Interfaces',
    concept: 'Interfaces describe object contracts. They are especially common for public object shapes, component props, service responses, and class contracts.',
    challenge: {
      question: 'What does an interface usually describe?',
      options: ['A CSS color', 'An object contract', 'A database table only', 'A loop'],
      correct: 1,
    },
    code: `interface User {
  id: number;
  name: string;
  role: string;
}

const user: User = {
  id: 42,
  name: 'Dev',
  role: 'Admin'
};

write(user.name + ' is an ' + user.role);`,
  },
  {
    id: 'ts-unions',
    chapter: 'Aliases & Interfaces',
    title: 'Union Types',
    concept: 'A union type allows a value to be one of several types. Literal unions are a clean way to restrict strings to known values.',
    code: `type Theme = 'light' | 'dark' | 'system';

let theme: Theme = 'dark';

function setTheme(next: Theme): void {
  theme = next;
  write('Theme set to ' + theme);
}

setTheme('system');`,
  },
  {
    id: 'ts-intersection',
    chapter: 'Aliases & Interfaces',
    title: 'Intersection Types',
    concept: 'An intersection type combines multiple types into one using `&`. The result must satisfy all member types at once — useful for mixins, role combinations, and extending third-party types.',
    challenge: {
      question: 'What does `A & B` mean in TypeScript?',
      options: ['Either A or B', 'A and B combined', 'A minus B', 'Only shared properties'],
      correct: 1,
    },
    code: `type Developer = {
  name: string;
  skill: string;
};

type Manager = {
  team: string;
  budget: number;
};

type TechLead = Developer & Manager;

const lead: TechLead = {
  name: 'Priya',
  skill: 'TypeScript',
  team: 'Frontend',
  budget: 50000
};

write(lead.name + ' leads the ' + lead.team + ' team');
write('Skill: ' + lead.skill + '  Budget: $' + lead.budget);`,
  },
  {
    id: 'ts-functions',
    chapter: 'Functions',
    title: 'Typed Functions',
    concept: 'Function parameters and return values can be typed. This catches wrong arguments and documents what a function produces.',
    code: `function formatPrice(amount: number, currency: string): string {
  return currency + amount.toFixed(2);
}

function add(a: number, b: number): number {
  return a + b;
}

write(formatPrice(add(19, 6), '$'));`,
  },
  {
    id: 'ts-optional-default',
    chapter: 'Functions',
    title: 'Optional and Default Parameters',
    concept: 'Optional parameters use `?`, while default parameters provide a fallback. Defaults are often better when the function can choose a sensible value.',
    code: `function greet(name: string, title?: string): string {
  return title ? 'Hello, ' + title + ' ' + name : 'Hello, ' + name;
}

function discount(price: number, percent: number = 10): number {
  return price - price * (percent / 100);
}

write(greet('Puneet'));
write(greet('Riya', 'Dr.'));
write('Discounted: $' + discount(100));`,
  },
  {
    id: 'ts-casting',
    chapter: 'Functions',
    title: 'Casting',
    concept: 'Casting tells TypeScript to treat a value as a more specific type. Use it only when you know more than the compiler, such as when selecting DOM elements.',
    code: `app.innerHTML = '<input id="email" value="hello@example.com">';

const input = document.getElementById('email') as HTMLInputElement;
write('Input value: ' + input.value);

const raw: unknown = '42';
const value = raw as string;
write('String value: ' + value);`,
  },
  {
    id: 'ts-classes',
    chapter: 'Classes',
    title: 'Classes',
    concept: 'TypeScript adds typed fields, constructor parameters, access modifiers, and interface contracts to JavaScript classes.',
    code: `class UserCard {
  name: string;
  role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  label(): string {
    return this.name + ' - ' + this.role;
  }
}

const card = new UserCard('Aarav', 'TypeScript Learner');
write(card.label());`,
  },
  {
    id: 'ts-access-modifiers',
    chapter: 'Classes',
    title: 'Access Modifiers',
    concept: '`public`, `private`, and `protected` communicate how class members should be used. Private fields keep implementation details inside the class.',
    code: `class Counter {
  private count: number = 0;

  public increment(): number {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
write(counter.increment());
write(counter.increment());`,
  },
  {
    id: 'ts-extends',
    chapter: 'Classes',
    title: 'Class Inheritance',
    concept: 'A class can `extend` another to inherit its fields and methods. The child class calls `super()` to run the parent constructor, then adds or overrides its own behaviour.',
    code: `class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return this.name + ' makes a sound';
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  speak(): string {
    return this.name + ' barks!';
  }
}

const dog = new Dog('Rex', 'Labrador');
write(dog.speak());
write('Breed: ' + dog.breed);`,
  },
  {
    id: 'ts-implements',
    chapter: 'Classes',
    title: 'Implements',
    concept: 'A class `implements` an interface to guarantee it provides specific methods. One class can implement multiple interfaces — useful for modular capability contracts.',
    challenge: {
      question: 'What does `implements` enforce on a class?',
      options: ['It copies method bodies', 'It guarantees the class satisfies the interface shape', 'It creates a new interface', 'It disables type checks'],
      correct: 1,
    },
    code: `interface Printable {
  print(): string;
}

interface Exportable {
  export(format: string): string;
}

class Report implements Printable, Exportable {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  print(): string {
    return 'Printing: ' + this.title;
  }

  export(format: string): string {
    return 'Exporting ' + this.title + ' as ' + format;
  }
}

const report = new Report('Q1 Summary');
write(report.print());
write(report.export('PDF'));`,
  },
  {
    id: 'ts-abstract',
    chapter: 'Classes',
    title: 'Abstract Classes',
    concept: 'An abstract class cannot be instantiated directly. It defines a template: shared concrete methods plus abstract methods that each subclass must implement.',
    code: `abstract class Shape {
  abstract area(): number;

  describe(): string {
    return 'Area is ' + this.area().toFixed(2);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

write('Circle: ' + new Circle(5).describe());
write('Rectangle: ' + new Rectangle(4, 6).describe());`,
  },
  {
    id: 'ts-generics',
    chapter: 'Generics',
    title: 'Basic Generics',
    concept: 'Generics let a function, type, or class work with many types while preserving the exact type passed in.',
    challenge: {
      question: 'Why use a generic instead of any?',
      options: ['It preserves the input type', 'It disables checking', 'It only works for strings', 'It creates CSS'],
      correct: 0,
    },
    code: `function first<T>(items: T[]): T {
  return items[0];
}

const firstName = first<string>(['Ada', 'Lin']);
const firstScore = first<number>([98, 87]);

write(firstName.toUpperCase());
write(firstScore + 2);`,
  },
  {
    id: 'ts-generic-constraints',
    chapter: 'Generics',
    title: 'Generic Constraints',
    concept: 'Constraints limit what a generic type can be. They let you keep flexibility while still requiring properties or methods.',
    code: `function labelOf<T extends { label: string }>(item: T): string {
  return item.label;
}

const task = { label: 'Ship playground', done: false };
const product = { label: 'Keyboard', price: 49 };

write(labelOf(task));
write(labelOf(product));`,
  },
  {
    id: 'ts-utility-types',
    chapter: 'Advanced Types',
    title: 'Utility Types',
    concept: 'Utility types transform existing types. `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`, and `Readonly<T>` help reuse shapes without repeating definitions.',
    code: `type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const update: Partial<User> = { name: 'Updated Name' };
const publicUser: Pick<User, 'id' | 'name'> = { id: 1, name: 'Maya' };

write('Update payload: ' + JSON.stringify(update));
write('Public user: ' + JSON.stringify(publicUser));`,
  },
  {
    id: 'ts-keyof',
    chapter: 'Advanced Types',
    title: 'keyof',
    concept: '`keyof` creates a union of an object type\'s keys. It is useful for safe property access helpers.',
    code: `type Product = {
  name: string;
  price: number;
  stock: number;
};

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

const product: Product = { name: 'Mouse', price: 24, stock: 8 };

write('Name: ' + getValue(product, 'name'));
write('Stock: ' + getValue(product, 'stock'));`,
  },
  {
    id: 'ts-null',
    chapter: 'Advanced Types',
    title: 'Null Safety',
    concept: 'TypeScript helps you handle missing values with `null`, `undefined`, optional chaining, nullish coalescing, and strict null checks.',
    code: `interface Address {
  city?: string;
}

interface Profile {
  name: string;
  address?: Address;
}

const profile: Profile = { name: 'Sam' };

write('Name: ' + profile.name);
write('City: ' + (profile.address?.city ?? 'Unknown'));`,
  },
  {
    id: 'ts-type-guards',
    chapter: 'Advanced Types',
    title: 'Type Guards',
    concept: 'Type guards narrow a union type. Common guards include `typeof`, `in`, `instanceof`, and custom predicate functions.',
    code: `type ApiResult = string | { message: string };

function render(result: ApiResult): void {
  if (typeof result === 'string') {
    write('Text: ' + result);
  } else {
    write('Message: ' + result.message);
  }
}

render('Loaded');
render({ message: 'Saved successfully' });`,
  },
  {
    id: 'ts-discriminated-unions',
    chapter: 'Advanced Types',
    title: 'Discriminated Unions',
    concept: 'A discriminated union is a union where each member has a shared literal field (the discriminant). TypeScript narrows to the correct branch inside a switch or if — with exhaustiveness checking at no extra cost.',
    challenge: {
      question: 'What is the "discriminant" in a discriminated union?',
      options: ['Any shared property', 'A shared literal property that uniquely identifies each variant', 'The first property always', 'A generic type parameter'],
      correct: 1,
    },
    code: `type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string };
type ErrorState   = { status: 'error';   message: string };

type State = LoadingState | SuccessState | ErrorState;

function render(state: State): string {
  switch (state.status) {
    case 'loading': return 'Loading…';
    case 'success': return 'Data: ' + state.data;
    case 'error':   return 'Error: ' + state.message;
  }
}

write(render({ status: 'loading' }));
write(render({ status: 'success', data: 'Hello TypeScript' }));
write(render({ status: 'error', message: '404 Not Found' }));`,
  },
  {
    id: 'ts-as-const',
    chapter: 'Advanced Types',
    title: 'as const',
    concept: '`as const` makes every value in an object or array a narrow literal type and marks them readonly. Use it for config objects, route maps, and allowed-value lists so TypeScript infers exact types instead of broad ones.',
    code: `const DIRECTIONS = ['north', 'south', 'east', 'west'] as const;
type Direction = typeof DIRECTIONS[number];

const CONFIG = {
  theme: 'dark',
  version: 3,
  env: 'production',
} as const;

function move(dir: Direction): void {
  write('Moving: ' + dir);
}

move('north');
move('west');
write('Theme: ' + CONFIG.theme + '  v' + CONFIG.version);`,
  },
  {
    id: 'ts-conditional-types',
    chapter: 'Pro Types',
    title: 'Conditional Types',
    concept: 'Conditional types choose one type or another with `T extends U ? X : Y`. They power many advanced utility types.',
    code: `type IsString<T> = T extends string ? 'yes' : 'no';

const checkString: IsString<string> = 'yes';
const checkNumber: IsString<number> = 'no';

write('string extends string: ' + checkString);
write('number extends string: ' + checkNumber);`,
  },
  {
    id: 'ts-mapped-types',
    chapter: 'Pro Types',
    title: 'Mapped Types',
    concept: 'Mapped types loop over keys in a type and create a new type. They are the idea behind utilities like `Readonly<T>` and `Partial<T>`.',
    code: `type FeatureFlags = {
  darkMode: boolean;
  exports: boolean;
  comments: boolean;
};

type FlagLabels = {
  [K in keyof FeatureFlags]: string;
};

const labels: FlagLabels = {
  darkMode: 'Dark mode',
  exports: 'Export files',
  comments: 'User comments'
};

write(JSON.stringify(labels, null, 2));`,
  },
  {
    id: 'ts-literal-types',
    chapter: 'Pro Types',
    title: 'Literal Types',
    concept: 'Literal types restrict values to exact strings, numbers, or booleans. They are great for modes, statuses, sizes, and command names.',
    code: `type ButtonSize = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary';

function buttonClass(size: ButtonSize, variant: Variant): string {
  return 'btn-' + size + ' btn-' + variant;
}

write(buttonClass('md', 'primary'));`,
  },
  {
    id: 'ts-index-signatures',
    chapter: 'Pro Types',
    title: 'Index Signatures',
    concept: 'Index signatures describe objects with dynamic keys. Use them for dictionaries, grouped results, caches, and lookup tables.',
    code: `type Scores = {
  [username: string]: number;
};

const scores: Scores = {
  ada: 98,
  lin: 91,
  mira: 87
};

Object.entries(scores).forEach(([name, score]) => {
  write(name + ': ' + score);
});`,
  },
  {
    id: 'ts-template-literal',
    chapter: 'Pro Types',
    title: 'Template Literal Types',
    concept: 'Template literal types build new string types by combining literals with `${}`. TypeScript expands all combinations at compile time — powerful for event names, CSS classes, API routes, and typed string patterns.',
    code: `type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize<EventName>}\`;

type HttpMethod = 'get' | 'post' | 'delete';
type ApiRoute  = \`/api/\${string}\`;

function createHandler(event: EventName): Handler {
  const cap = (event[0].toUpperCase() + event.slice(1)) as Capitalize<EventName>;
  return \`on\${cap}\`;
}

const handler: Handler = createHandler('click');
const route: ApiRoute  = '/api/users';

write('Handler: ' + handler);
write('Route: '   + route);`,
  },
  {
    id: 'ts-infer',
    chapter: 'Pro Types',
    title: 'infer Keyword',
    concept: '`infer` extracts a type from within a conditional type — letting you "capture" a type variable from inside a generic structure. It powers built-in utilities like `ReturnType`, `Parameters`, and `Awaited`.',
    challenge: {
      question: 'What does `infer` do inside a conditional type?',
      options: ['Disables type checking', 'Captures and names a type from within the matched structure', 'Converts any to unknown', 'Creates a new interface'],
      correct: 1,
    },
    code: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type FirstArg<T>      = T extends (first: infer A, ...rest: any[]) => any ? A : never;

type UserId   = UnwrapPromise<Promise<number>>;   // number
type PlainStr = UnwrapPromise<string>;             // string

function greet(name: string, age: number): string {
  return 'Hello ' + name;
}

type NameType = FirstArg<typeof greet>;            // string

const id: UserId   = 42;
const name: NameType = 'Dev';

write('UserId: '    + id);
write('FirstArg: '  + name);`,
  },
  {
    id: 'ts-async',
    chapter: 'Real Projects',
    title: 'Async TypeScript',
    concept: 'Async functions can declare `Promise<T>` return types. This documents what the promise resolves to after `await`.',
    code: `type Todo = {
  id: number;
  title: string;
};

async function loadTodo(): Promise<Todo> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: 1, title: 'Learn TypeScript async types' };
}

loadTodo().then(todo => {
  write('#' + todo.id + ': ' + todo.title);
});`,
  },
  {
    id: 'ts-config',
    chapter: 'Real Projects',
    title: 'tsconfig Mental Model',
    concept: '`tsconfig.json` controls how TypeScript checks and emits code. Important options include `strict`, `target`, `module`, and `noUncheckedIndexedAccess`.',
    code: `const tsconfig = {
  compilerOptions: {
    strict: true,
    target: 'ES2022',
    module: 'ESNext',
    noUncheckedIndexedAccess: true
  }
};

write(JSON.stringify(tsconfig, null, 2));`,
  },
  {
    id: 'ts-node-react',
    chapter: 'Real Projects',
    title: 'TypeScript with Node and React',
    concept: 'In real projects, TypeScript types appear at API boundaries: request bodies, responses, React props, component state, server config, and database results.',
    code: `type UserDto = {
  id: number;
  name: string;
};

type UserCardProps = {
  user: UserDto;
};

function renderUserCard(props: UserCardProps): string {
  return '<article><strong>' + props.user.name + '</strong></article>';
}

app.innerHTML = renderUserCard({ user: { id: 1, name: 'Type-safe user' } });`,
  },
  {
    id: 'ts-migration',
    chapter: 'Real Projects',
    title: 'Migrating JavaScript to TypeScript',
    concept: 'Migration works best in layers: rename files gradually, type public data shapes first, turn on strictness later, and replace `any` with safer types over time.',
    code: `const migrationSteps: string[] = [
  'Rename one file to .ts',
  'Add types to function parameters',
  'Type API responses',
  'Replace any with unknown or real types',
  'Enable strict checks'
];

migrationSteps.forEach((step, index) => {
  write((index + 1) + '. ' + step);
});`,
  },
  {
    id: 'ts-error-handling',
    chapter: 'Real Projects',
    title: 'Typed Error Handling',
    concept: 'TypeScript does not type thrown errors — `catch (e)` gives `unknown`. The Result pattern wraps success and failure in a typed union, making errors explicit in function signatures and impossible to accidentally ignore.',
    code: `// Result pattern — wrap success and failure in a typed union
// type Result = { ok: true; value: number } | { ok: false; error: string }

function divide(a: number, b: number) {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, value: a / b };
}

function parseAge(raw: string) {
  const n = Number(raw);
  if (isNaN(n) || n < 0) return { ok: false, error: 'Invalid age: ' + raw };
  return { ok: true, value: n };
}

const r1 = divide(10, 2);
const r2 = divide(5, 0);
const r3 = parseAge('abc');

if (r1.ok) write('10 / 2 = ' + r1.value);
if (!r2.ok) write('Error: ' + r2.error);
if (!r3.ok) write('Parse error: ' + r3.error);`,
  },
  {
    id: 'ts-best-practices',
    chapter: 'Real Projects',
    title: 'Best Practices',
    concept: 'Good TypeScript models real data clearly. Prefer precise domain types, avoid broad `any`, type API boundaries, keep generics readable, and let inference work inside functions.',
    challenge: {
      question: 'Which TypeScript habit is usually safest?',
      options: ['Use any everywhere', 'Type external data boundaries', 'Disable strict checks forever', 'Avoid interfaces always'],
      correct: 1,
    },
    code: `type ApiUser = {
  id: number;
  name: string;
  plan: 'free' | 'pro';
};

function canExport(user: ApiUser): boolean {
  return user.plan === 'pro';
}

const user: ApiUser = { id: 1, name: 'Maya', plan: 'pro' };

write(user.name + ' can export: ' + canExport(user));`,
  },
];

export const CHAPTERS = [...new Set(LESSONS.map(lesson => lesson.chapter))];
