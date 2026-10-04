import TypeScriptPlaygroundTool from '@/components/TypeScriptPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/learn-to-code.png';

export const metadata = {
  title: 'TypeScript Playground — Learn TypeScript Visually, 41 Lessons Free | webdevpuneet.com',
  description: 'Free TypeScript playground with 41 lessons — types, interfaces, generics, utility types, and template literals. Beginner to pro, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/typescript-playground/' },
  icons: { icon: '/icons/typescript-playground.svg', shortcut: '/icons/typescript-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/typescript-playground/',
    siteName: 'webdevpuneet.com',
    title: 'TypeScript Playground — Learn TypeScript Visually, 41 Lessons Free',
    description: 'Learn TypeScript with 41 guided lessons: types, interfaces, generics, utility types, discriminated unions, infer, template literals, error handling. Live editor, instant preview. Beginner to pro.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'TypeScript Playground — Interactive Lessons with Live Preview' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'TypeScript Playground — Learn TypeScript Visually, 41 Lessons Free',
    description: 'Learn TypeScript step by step with 41 guided lessons. Types, generics, utility types, discriminated unions, infer, template literals. Free, no install, no signup.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install TypeScript to use this playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. The playground runs entirely in your browser. Type annotations are stripped client-side before execution so TypeScript-style examples run without any local install, npm, Node.js, tsconfig, or build step. Open the page and start writing typed code immediately.' } },
    { '@type': 'Question', name: 'What is the difference between interface and type in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Both describe object shapes, but they differ in extension and flexibility. Interfaces can be extended with extends and merged by declaring them twice (declaration merging). Type aliases are more flexible — they can describe unions, intersections, tuples, primitives, and mapped types that interfaces cannot. In practice: use interface for public object contracts (component props, API shapes, class contracts) and type for unions, intersections, and utility-type derivations.' } },
    { '@type': 'Question', name: 'How do TypeScript generics work?', acceptedAnswer: { '@type': 'Answer', text: 'A generic is a type parameter written in angle brackets: function first<T>(items: T[]): T. The T captures whatever type the caller passes in and flows through the function. Without generics you would use any — which loses type information. With generics, TypeScript knows that first(["a","b"]) returns string and first([1,2]) returns number. The playground covers basic generics and constrained generics with extends.' } },
    { '@type': 'Question', name: 'What are discriminated unions in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'A discriminated union is a union type where every member has a shared literal field called the discriminant. For example: type State = { status: "loading" } | { status: "success"; data: string } | { status: "error"; message: string }. Inside a switch on state.status, TypeScript narrows each branch to the exact member — so you get autocomplete and type safety without any casting. This pattern replaces boolean flags and is the foundation of most typed state machines.' } },
    { '@type': 'Question', name: 'What does as const do in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'as const turns a value into a deeply readonly literal type. Without it, TypeScript infers ["north","south"] as string[] — wide and mutable. With as const it infers readonly ["north","south"] — narrow literal types that can be used as union members with typeof ARRAY[number]. It is essential for config objects, status maps, and route tables where you want exact types rather than broad primitives.' } },
    { '@type': 'Question', name: 'What is the infer keyword in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'infer appears inside conditional types and lets you extract and name a type from within a generic structure. For example: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never extracts the return type of any function. The built-in TypeScript utilities Awaited<T>, ReturnType<T>, and Parameters<T> are all implemented with infer. It is an advanced pattern used in library and framework types.' } },
    { '@type': 'Question', name: 'What are template literal types in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Template literal types build new string types by combining literal types inside backtick syntax. type Handler = `on${Capitalize<"click"|"focus">}` produces "onClick" | "onFocus" at the type level — TypeScript expands all combinations. They are used for typed event names, CSS class patterns, API route strings, and any domain where string format matters. The playground covers template literal types with live editable examples.' } },
    { '@type': 'Question', name: 'How do I handle errors in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'TypeScript does not type thrown values — catch (e) gives unknown, not Error. Two common patterns: (1) narrow e with instanceof Error before accessing message; (2) use the Result pattern: type Result<T,E=string> = { ok: true; value: T } | { ok: false; error: E }. The Result pattern makes errors explicit in function signatures and prevents callers from accidentally ignoring them. The playground covers typed error handling with a working Result implementation.' } },
    { '@type': 'Question', name: 'What is the difference between unknown and any in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Both accept any value, but they behave differently when you try to use the value. any disables all type checking — you can call methods, access properties, and pass it anywhere. unknown forces you to narrow the type first with typeof, instanceof, or a custom type guard before using it. Always prefer unknown for external data (API responses, JSON.parse, catch blocks) because it makes unsafe assumptions explicit.' } },
    { '@type': 'Question', name: 'How does TypeScript type narrowing work?', acceptedAnswer: { '@type': 'Answer', text: 'Narrowing reduces a wide type to a specific one inside a conditional block. typeof checks narrow primitives (typeof x === "string"). instanceof checks narrow class instances. in checks narrow objects with specific properties. Discriminated unions narrow on a shared literal field. TypeScript tracks which branches have been taken and updates the type accordingly — a value typed as string | number becomes string inside if (typeof x === "string").' } },
    { '@type': 'Question', name: 'How do I use TypeScript with React?', acceptedAnswer: { '@type': 'Answer', text: 'Type component props with an interface or type alias, type event handlers with React.ChangeEvent<HTMLInputElement> and React.FormEvent, type useState with the generic form useState<User | null>(null), and type useRef with useRef<HTMLDivElement>(null). For generic components use function Card<T>({ item }: { item: T }). The React Playground on webdevpuneet.com covers TypeScript with React props, state, and hooks in dedicated lessons.' } },
    { '@type': 'Question', name: 'What are TypeScript utility types?', acceptedAnswer: { '@type': 'Answer', text: 'Utility types are built-in generic helpers that transform existing types: Partial<T> makes all fields optional, Required<T> makes all fields required, Readonly<T> prevents mutation, Pick<T,K> keeps only named fields, Omit<T,K> removes named fields, Record<K,V> builds an object type with specific key and value types, Exclude<T,U> removes union members, Extract<T,U> keeps only matching union members, NonNullable<T> removes null and undefined, ReturnType<T> extracts a function\'s return type, and Awaited<T> unwraps a Promise type.' } },
    { '@type': 'Question', name: 'Should I learn JavaScript before TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TypeScript is a superset of JavaScript — it adds types on top of JavaScript, so the underlying runtime behavior is identical. This playground works best after you are comfortable with JavaScript variables, functions, arrays, objects, classes, and async/await. The webdevpuneet.com JavaScript Playground covers those fundamentals in 60 lessons if you need them first.' } },
    { '@type': 'Question', name: 'What is TypeScript strict mode?', acceptedAnswer: { '@type': 'Answer', text: 'Strict mode is a tsconfig flag that enables a group of strictness checks: noImplicitAny (variables must have explicit or inferred types), strictNullChecks (null and undefined are not assignable to other types), strictFunctionTypes (contravariant function parameter checking), and more. New projects should always use strict: true. Migrating an existing codebase to strict is done incrementally — the Real Projects chapter of the playground covers a step-by-step migration approach.' } },
    { '@type': 'Question', name: 'What is your progress saved between sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your last open lesson are saved to localStorage in your browser. When you return, the playground reopens at the lesson you were on and shows which lessons you have already completed. No account or sign-up is required — all data stays in your browser.' } },
    { '@type': 'Question', name: 'How many lessons are in the TypeScript Playground?', acceptedAnswer: { '@type': 'Answer', text: 'There are 41 lessons across 10 chapters: Getting Started (3), Core Types (3), Object Types (3), Aliases & Interfaces (4), Functions (3), Classes (5), Generics (2), Advanced Types (6), Pro Types (6), and Real Projects (6). The curriculum goes from simple type annotations all the way to template literal types, infer, discriminated unions, the Result error pattern, and migration strategies.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TypeScript Playground',
  url: 'https://webdevpuneet.com/typescript-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based TypeScript learning playground with 41 guided lessons across 10 chapters — types, interfaces, generics, utility types, discriminated unions, template literal types, infer, error handling, and real-project patterns. No install required.',
  featureList: [
    '41 lessons across 10 chapters — complete TypeScript curriculum from simple types to pro patterns',
    'Browser-based type stripping runs TypeScript-style examples without any compiler or setup',
    'Live preview updates automatically as you edit — no manual run step',
    'Console panel captures console.log, warn, and error output from the preview iframe',
    'Syntax highlighting for type annotations, generics, keywords, and interfaces',
    'Progress tracking saved to localStorage — persists across browser sessions',
    'Quick-check multiple-choice challenges on key TypeScript concepts',
    'Download lesson code as a standalone .ts file',
    'Share link via URL parameter — encode your code and send it to anyone',
    'Runs entirely in the browser — no install, no account, no Node.js required',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'TypeScript Playground', item: 'https://webdevpuneet.com/typescript-playground/' },
  ],
};

const SEO = {
  slug: 'typescript-playground',
  title: 'Learn TypeScript Online — 41 Interactive Lessons, Beginner to Pro',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with Getting Started and Core Types', text: 'The first six lessons cover type annotations for strings, numbers, and booleans; type inference (when TypeScript figures out the type for you); and the three special types — `any`, `unknown`, and `never`. Grasping these before moving forward prevents most early TypeScript confusion.' },
      { title: 'Shape your data with object types, aliases, and interfaces', text: 'Lessons on Object Types and Aliases & Interfaces teach you to describe any data structure: required and optional fields with `?`, immutable fields with `readonly`, type aliases versus interfaces, union types, and intersection types with `&`. These are the foundation of every real TypeScript pattern.' },
      { title: 'Type your functions and master class patterns', text: 'The Functions chapter annotates parameters, return values, and default parameters. The Classes chapter adds field types, access modifiers (`public`, `private`, `protected`), class inheritance with `extends`, interface contracts with `implements`, and abstract classes — covering the full class hierarchy TypeScript supports.' },
      { title: 'Unlock code reuse with generics', text: 'The Generics chapter teaches generic functions and constrained generics with `extends`. Generics let one function or class work correctly with many types rather than duplicating logic or falling back to `any`. Understanding generics unlocks every advanced TypeScript pattern.' },
      { title: 'Use utility types and master narrowing', text: 'Advanced Types covers `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, and `Record` — the six core utility types. Also: `keyof`, null safety with optional chaining, `as const` for literal types, type guards with `typeof`/`instanceof`, and discriminated unions for exhaustive state handling.' },
      { title: 'Study pro-level type system features', text: 'Pro Types covers conditional types (`T extends U ? X : Y`), mapped types, template literal types for typed string patterns, index signatures, and the `infer` keyword for extracting types from generic structures. These power framework types and shared type utilities.' },
      { title: 'Apply patterns to real projects', text: 'Real Projects covers async function return types with `Promise<T>`, tsconfig `strict` mode flags, the Result pattern for typed error handling, step-by-step JavaScript-to-TypeScript migration, and naming conventions. These are the skills that come up in every team codebase.' },
      { title: 'Track your progress and save your work', text: 'Click "Mark Done →" to record completed lessons. Progress is saved to localStorage automatically — no login required. Download any lesson as a `.ts` file or share your modified version via URL so colleagues see exactly what you wrote.' },
    ],
  },
  about: {
    title: 'Learn TypeScript Online — 41 Lessons from Simple Types to Pro Patterns',
    description: `TypeScript is now the default language for serious JavaScript projects. Next.js, Angular, NestJS, Vite, and nearly every major framework ships with first-class TypeScript support, and most teams hiring for frontend or full-stack roles expect TypeScript fluency. The problem: TypeScript has a learning curve that JavaScript alone does not prepare you for. Type annotations, interfaces, generics, utility types, discriminated unions, conditional types, infer — these concepts are not obvious from documentation alone, and most tutorials skip the "why" entirely.

This TypeScript Playground gives you **41 structured, interactive lessons** that teach each concept with a live editable example, a plain-English explanation, and a note on when you would use it in a real project. The playground strips type-only syntax before execution so every lesson runs in the browser without any local setup — no \`tsc\`, no \`tsconfig.json\`, no terminal, no npm.

**41 lessons across 10 chapters — complete curriculum at a glance:**

<table><thead><tr><th>Chapter</th><th>Level</th><th>Lessons</th></tr></thead><tbody><tr><td>Getting Started</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Core Types</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Object Types</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Aliases &amp; Interfaces</td><td>🟢 Beginner</td><td>4</td></tr><tr><td>Functions</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Classes</td><td>🟡 Intermediate</td><td>5</td></tr><tr><td>Generics</td><td>🟡 Intermediate</td><td>2</td></tr><tr><td>Advanced Types</td><td>🟡 Intermediate</td><td>6</td></tr><tr><td>Pro Types</td><td>🔴 Pro</td><td>6</td></tr><tr><td>Real Projects</td><td>🔴 Pro</td><td>6</td></tr></tbody></table>

### The Main Purpose of TypeScript — Why It's Used

The main purpose of TypeScript is to provide **static type checking** for JavaScript programs — to catch bugs early and make large codebases easier to scale and maintain. JavaScript is a dynamically typed language, which means data type mismatches or missing object properties are often only discovered when the program crashes at runtime. TypeScript acts as a strict superset that checks your code before it runs, allowing you to explicitly outline the expected shape of every value, function, and API boundary.

**Early Bug Detection** — TypeScript identifies syntax errors, structural mismatches, and data type problems at compile time instead of at runtime. A typo in a property name, a function called with the wrong argument type, or a null reference that would crash in production gets flagged in your editor before you ever run the code.

**Enhanced Developer Tooling** — Type information drives code editors to provide instant autocomplete, rich error feedback, go-to-definition, and rename-symbol refactoring that works across the entire codebase. VS Code's TypeScript integration is why it became the most popular editor for JavaScript development. Every autocomplete suggestion and inline error you see in VS Code is powered by the TypeScript language server reading type information.

**Safer Refactoring** — When you rename a function, change a parameter type, or restructure a data object, TypeScript flags every call site that needs to be updated. In a plain JavaScript project, renaming a property silently breaks every consumer that used the old name. In TypeScript, every break is a compile error — you cannot ship code that references a property that no longer exists.

**Self-Documenting Code** — Explicit type annotations serve as living, built-in documentation. A function signature like \`function createInvoice(client: Client, items: LineItem[]): Invoice\` tells the next developer exactly what data the function needs and what it returns — without reading the implementation. This is especially valuable in teams and open-source projects where readers are not the original authors.

**Downlevel Compilation** — TypeScript's compiler (\`tsc\`) translates modern ECMAScript features down to older JavaScript versions so your application remains fully compatible with legacy browsers and environments. You can write ES2022+ code and target ES5 output — the same tool that checks your types also handles the transpilation.

### TypeScript Types You Need to Know

Every TypeScript journey starts with the same three primitive types — \`string\`, \`number\`, and \`boolean\` — and the concept of **type inference**. TypeScript can figure out the type of a variable from its initial value, so \`const name = "Puneet"\` is already typed as \`string\` without you writing anything. Explicit annotations are for function parameters, return values, and anywhere TypeScript cannot infer the type on its own.

Beyond the primitives, three special types show up constantly. \`any\` disables type checking entirely — it is an escape hatch that TypeScript developers use reluctantly. \`unknown\` is the type-safe alternative: it accepts any value but forces you to narrow the type before using it, which makes unsafe assumptions visible in the code. \`never\` represents values that can never exist — a function that always throws has return type \`never\`, and an exhaustive switch over a discriminated union produces \`never\` in the default branch as a compile-time signal that all cases are covered.

Typed arrays use \`string[]\` or \`Array<number>\` syntax. Tuples fix the length and type of each position: \`[number, string, boolean]\` is a three-element array where position 0 must be a number, position 1 a string, and position 2 a boolean. Tuples are useful for coordinate pairs, key-value results, and any fixed-shape sequence.

### Interface vs Type — Which Should You Use?

This is the most-searched TypeScript question for a reason. Both \`interface\` and \`type\` can describe object shapes:

\`\`\`
interface User { id: number; name: string; }
type User = { id: number; name: string; };
\`\`\`

The differences matter in specific situations. **Interfaces** support declaration merging — if you declare the same interface twice, TypeScript merges the two declarations into one. This is how library authors extend built-in types. Interfaces also have a slightly cleaner error message when something goes wrong. **Type aliases** are more flexible — they can describe unions (\`string | number\`), intersections (\`A & B\`), tuples, primitives, and mapped types. You cannot write \`type = string | number\` as an interface.

The practical rule most teams use: **interface for public object shapes** (component props, API response shapes, class contracts), **type for everything else** (unions, intersections, utility derivations, function types). Both work. The playground covers both with identical examples so you can see the difference side by side.

**Intersection types** combine two or more types into one with \`&\`. The result must satisfy every member type simultaneously. A \`TechLead = Developer & Manager\` must have all fields from both. Intersections are the TypeScript equivalent of a mixin — they compose capabilities without inheritance.

### TypeScript Generics — TypeScript's Most Powerful Feature

Generics are where most TypeScript learners get stuck, and where the biggest productivity gains come from once you understand them. A generic function accepts a **type parameter** in angle brackets:

\`\`\`
function first<T>(items: T[]): T {
  return items[0];
}
\`\`\`

The \`T\` captures whatever type the caller provides. \`first(["a", "b"])\` returns \`string\`. \`first([1, 2])\` returns \`number\`. Without generics you would use \`any\` and lose the return type information entirely.

**Constrained generics** use \`extends\` to narrow what type parameter is allowed: \`function labelOf<T extends { label: string }>(item: T)\` — T must have a \`label\` property, but it can have any other properties too. This gives you flexibility without losing the type information the constraint guarantees.

Every utility type in TypeScript is implemented with generics. \`Partial<T>\`, \`Record<K, V>\`, \`ReturnType<T>\` — once you understand generic functions, these become readable rather than magical. The playground teaches generics with editable examples so you can change the type parameter and see exactly how TypeScript tracks it through the function.

### Utility Types — Stop Rewriting Interfaces

TypeScript ships with built-in generic utility types that transform existing types into new ones. Understanding all of them eliminates a large category of copy-paste interface duplication:

**\`Partial<T>\`** — makes every field optional. Use it for update payloads where you only send changed fields.

**\`Required<T>\`** — makes every field required. The opposite of Partial. Use it to enforce complete objects after optional construction.

**\`Readonly<T>\`** — marks every field as readonly. Use it for config objects and immutable data structures.

**\`Pick<T, K>\`** — keeps only the named fields. \`Pick<User, "id" | "name">\` creates a type with just those two fields. Use it for public-facing types that expose a subset of an internal model.

**\`Omit<T, K>\`** — removes the named fields. \`Omit<User, "password">\` creates a safe public user type. Use it when it is easier to list what to remove than what to keep.

**\`Record<K, V>\`** — builds an object type with specific key and value types. \`Record<string, number>\` is a lookup table of numbers. \`Record<"admin" | "user", Permission[]>\` is a role-permission map.

Beyond these six, TypeScript also ships \`Exclude\`, \`Extract\`, \`NonNullable\`, \`ReturnType\`, \`Parameters\`, \`ConstructorParameters\`, and \`Awaited\` — all implemented with conditional types and infer internally.

### Discriminated Unions and Type Guards

**Discriminated unions** are one of the most practically useful TypeScript patterns and one of the most under-taught. The idea: every member of a union has a shared literal field — the discriminant — that uniquely identifies it:

\`\`\`
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error";   message: string };
\`\`\`

Inside a switch on \`state.status\`, TypeScript narrows each branch to the exact member. In the \`"success"\` branch, \`state.data\` is available. In the \`"error"\` branch, \`state.message\` is available. TypeScript also warns you if you add a new union member without handling it in the switch — that is exhaustiveness checking for free.

**Type guards** are how TypeScript narrows union types in general. \`typeof x === "string"\` narrows \`string | number\` to \`string\`. \`x instanceof Error\` narrows \`unknown\` to \`Error\`. The \`in\` operator — \`"message" in x\` — narrows objects that have a specific property. Custom type guard functions use the \`is\` keyword: \`function isUser(x: unknown): x is User { ... }\`.

The combination of discriminated unions and type guards eliminates most of the \`as\` casting that beginners reach for when TypeScript "gets in the way" — the safer patterns remove the need to override the type checker.

### Pro TypeScript — Template Literals, Mapped Types, and infer

**Template literal types** build new string types by combining literals: \`\` type Handler = \`on\${Capitalize<"click"|"focus">}\` \`\` produces \`"onClick" | "onFocus"\` at the type level. TypeScript expands all combinations, so a union of two EventNames combined with a union of two prefixes produces four handler names. This is how typed event systems, CSS-in-JS libraries, and API route builders get their type safety.

**Mapped types** iterate over the keys of an existing type and produce a new type. \`{ [K in keyof T]: string }\` replaces every field's type with \`string\`. This is how \`Partial<T>\` and \`Readonly<T>\` are implemented — they are mapped types with a modifier added to each key. Writing your own mapped type lets you derive new shapes from existing ones without copy-pasting.

**Conditional types** choose one type or another based on whether a type extends another: \`T extends Promise<infer U> ? U : T\`. The \`infer\` keyword appears here — it extracts and names a type from inside the condition. \`infer\` is what powers \`ReturnType<T>\` (extracts a function's return type), \`Awaited<T>\` (unwraps a Promise), and \`Parameters<T>\` (extracts the argument types). Once you can read infer, advanced library types become understandable rather than mysterious.

### TypeScript Classes — Full Object-Oriented Patterns

The Classes chapter covers the full TypeScript class system. **Field annotations** give each property a type. **Constructor parameter shorthand** lets you write \`constructor(private name: string)\` instead of declaring the field separately. **Access modifiers** — \`public\`, \`private\`, \`protected\` — control what code outside the class can reach. \`private\` fields stay inside the class. \`protected\` fields are accessible in subclasses.

**Class inheritance** with \`extends\` lets a child class inherit a parent's fields and methods, override them, and add new ones. \`super()\` calls the parent constructor. **\`implements\`** enforces that a class satisfies an interface contract — one class can implement multiple interfaces, which is TypeScript's answer to multiple inheritance for capabilities. **Abstract classes** define a template: shared concrete methods plus abstract methods that every subclass must implement. An abstract class cannot be instantiated directly.

### TypeScript Error Handling — The Result Pattern

TypeScript does not type thrown values. \`catch (e)\` gives \`unknown\` — not \`Error\`, not a custom exception type. The cleanest solution is the **Result pattern**: wrap success and failure in a typed union so errors become part of the function signature:

\`\`\`
type Result<T, E = string> =
  | { ok: true;  value: T }
  | { ok: false; error: E };
\`\`\`

Callers must check \`result.ok\` before accessing \`result.value\` — TypeScript enforces this because the union narrows inside the if. Results cannot be accidentally ignored the way thrown exceptions can. This pattern is common in Rust and Go and increasingly adopted in TypeScript codebases that handle many failure modes.

### Using TypeScript in Real Projects

The Real Projects chapter covers the patterns that separate hobby TypeScript from production TypeScript. **\`Promise<T>\` return types** on async functions document what the promise resolves to. **tsconfig \`strict\` mode** enables \`noImplicitAny\`, \`strictNullChecks\`, and \`strictFunctionTypes\` — the flags that catch the most real bugs. Turning on strict in an existing project is done incrementally by fixing errors file by file.

**Migrating JavaScript to TypeScript** works best in layers: rename one file at a time to \`.ts\`, type the public API boundaries first (function parameters and return values), replace \`any\` with real types progressively, and enable strictness after the core types are in place. The playground's migration lesson walks through this process with a concrete example.

Progress saves automatically to your browser's localStorage. Close the tab, come back tomorrow — your completed lessons and current position are exactly where you left them. No account, no login, no email required. Every lesson is free and always will be.

Once you are comfortable with TypeScript, the [React Playground](/react-playground/) applies TypeScript to component props, hooks, and event handlers in 68 lessons. The [JavaScript Playground](/js-playground/) covers the underlying language fundamentals in 60 lessons if you need them first. If you are a freelance developer, the [Freelance Rate Calculator](https://fwdtools.com/freelance-rate-calculator/) helps you price TypeScript projects correctly.`,
  },
  features: [
    '41 lessons across 10 chapters — complete TypeScript curriculum from simple types to pro patterns',
    'Browser-based type stripping runs TypeScript-style examples without any local compiler or setup',
    'Live preview updates automatically — edit the code and see results without clicking Run',
    'Console panel captures console.log, warn, and error output directly from the preview iframe',
    'Syntax highlighting for type annotations, generics, keywords, and interface definitions',
    'Progress tracking saved to localStorage — completed lessons persist across browser sessions',
    'Multiple-choice Quick Check challenges on key TypeScript concepts',
    'Download code as a standalone .ts file — ready to open in VS Code or paste into a project',
    'Share link via URL parameter — encode your modified code and send it to anyone',
    'Runs entirely in the browser — no install, no account, no Node.js or npm required',
  ],
  useCases: [
    { icon: 'LEARN', title: 'Learn TypeScript from scratch', desc: 'Work through all 41 lessons in order — from simple type annotations and inference to interfaces, generics, utility types, and real-project patterns. Every lesson builds on the previous one with a live editable example.' },
    { icon: 'CODE', title: 'Understand interface vs type', desc: 'The Aliases & Interfaces chapter covers type aliases, interfaces, union types, and intersection types side by side — with identical examples showing when each form is appropriate and why most teams use both.' },
    { icon: 'OOP', title: 'Master generics with editable examples', desc: 'The Generics chapter teaches generic functions and constrained generics with extends. Modify the type parameter and watch TypeScript track it through the function — the fastest way to build a mental model of how generics work.' },
    { icon: 'TABS', title: 'Replace repetitive interfaces with utility types', desc: 'The Advanced Types chapter covers all six core utility types — Partial, Required, Readonly, Pick, Omit, and Record — with working examples that show how each transforms an existing type into a new one without copy-pasting.' },
    { icon: 'FLOW', title: 'Build type-safe state with discriminated unions', desc: 'The Advanced Types chapter covers discriminated unions and all four type guard patterns. Learn how to model loading/success/error states, eliminate casting, and get exhaustiveness checking for free in switch statements.' },
    { icon: 'PRO', title: 'Go pro with template literals, infer, and mapped types', desc: 'The Pro Types chapter covers template literal types, mapped types, conditional types, and the infer keyword — the patterns behind React, Next.js, and TypeScript utility library types.' },
    { icon: 'SAFE', title: 'Handle errors safely with the Result pattern', desc: 'The Real Projects chapter covers the Result type — a discriminated union that makes errors part of the function signature, preventing callers from accidentally ignoring failure cases.' },
    { icon: 'SYNC', title: 'Migrate a JavaScript project to TypeScript', desc: 'The Real Projects chapter walks through incremental migration: renaming files, typing public API boundaries, replacing any, and enabling strict mode — a realistic approach that works on large existing codebases.' },
    { icon: 'APP', title: 'Apply TypeScript to React components', desc: 'Learn how TypeScript types component props, useState, useRef, event handlers, and generic components — then continue to the React Playground for 68 dedicated React lessons with TypeScript integration.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
};

export default function TypeScriptPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <TypeScriptPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
