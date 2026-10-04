import AngularPlaygroundTool from '@/components/AngularPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Angular Playground — Learn Angular Visually, 45 Lessons Free | webdevpuneet.com',
  description: 'Learn Angular online with 45 guided lessons — components, services, routing, signals, RxJS, and forms. Live preview, free, no Angular CLI required.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/angular-playground/' },
  icons: { icon: '/icons/angular-playground.svg', shortcut: '/icons/angular-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/angular-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Angular Playground — Learn Angular Online with 45 Interactive Lessons',
    description: 'Learn Angular in your browser with 45 guided lessons — templates, directives, services, routing, signals, RxJS, reactive forms, and architecture. No Angular CLI needed.',
    images: [{
      url: 'https://webdevpuneet.com/images/angular-playground.png',
      width: 1200,
      height: 630,
      alt: 'Angular Playground — 45 Interactive Lessons',
      type: 'image/png',
    }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Angular Playground — Learn Angular with 45 Interactive Lessons',
    description: 'From Hello Angular to signals, RxJS, lazy loading, and testing — 45 guided lessons with live preview, no CLI, no install. Free.',
    images: [{ url: 'https://webdevpuneet.com/images/angular-playground.png', alt: 'Angular Playground — 45 Interactive Lessons' }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need Angular CLI or Node.js to use this Angular Playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. The playground runs entirely in your browser. There is nothing to install — no Angular CLI, no Node.js, no npm, no terminal. Open the page and start editing Angular-style templates immediately.' } },
    { '@type': 'Question', name: 'Is this Angular Playground good for beginners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The first chapters start with components, interpolation, state, property binding, structural directives, events, and forms — the patterns every Angular developer uses daily. Later chapters build toward services, routing, signals, RxJS, reactive forms, testing, and feature architecture.' } },
    { '@type': 'Question', name: 'What Angular topics are covered?', acceptedAnswer: { '@type': 'Answer', text: '45 lessons across 13 chapters: Getting Started (Hello Angular), Templates (interpolation, state, property/attribute/class/style binding), Directives (*ngIf, conditional empty states, *ngFor, nested lists), Events & Forms (event binding, input events, two-way binding, simple validation), Components (inputs, composition), Services & Data (dependency injection, shared state, HTTP client pattern, loading/error states), Routing (router outlet, route state, route params, route guards), Pipes & Styling (pipes, display formatting, mini project: Task Board, custom pipe and directive), Modern Angular (standalone components, lifecycle hooks, signals, new control flow), Advanced Forms (reactive forms model, dynamic form arrays, cross-field validation), RxJS & State (observable streams, RxJS operators, lightweight state store), Architecture & Performance (lazy loading, change detection strategy, trackBy), and Testing & Production (component testing, service testing, production error handling, feature architecture).' } },
    { '@type': 'Question', name: 'Is this a full Angular compiler?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is an Angular-style learning playground that simulates the most important template, component, routing, and data flow patterns in the browser. It is designed to make Angular concepts concrete before you move to a real Angular CLI project with TypeScript, HttpClient, ReactiveFormsModule, and official Angular APIs.' } },
    { '@type': 'Question', name: 'What are Angular signals and why do they matter?', acceptedAnswer: { '@type': 'Answer', text: 'Signals are Angular\'s modern reactivity primitive — a wrapper around a value that notifies Angular exactly which components need to re-render when the value changes. Unlike Zone.js-based change detection, signals are explicit: you read a signal by calling it as a function, and computed() derives values from signals without side effects. The Signals Mental Model lesson demonstrates signal(), computed(), and effect() side by side.' } },
    { '@type': 'Question', name: 'What is the difference between template-driven and reactive forms in Angular?', acceptedAnswer: { '@type': 'Answer', text: 'Template-driven forms use [(ngModel)] for two-way binding — easy to set up but harder to test and validate dynamically. Reactive forms define the form model in the component class with FormGroup, FormControl, and Validators — better for complex validation, dynamic fields, and unit testing. The playground covers both: template-driven validation in the Events & Forms chapter, and reactive forms including dynamic FormArray and cross-field validation in the Advanced Forms chapter.' } },
    { '@type': 'Question', name: 'Can I learn Angular without knowing TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'You can start here without deep TypeScript knowledge — the lessons focus on Angular template behavior and component concepts. For production Angular work, TypeScript basics (types, interfaces, classes, generics) are important. If you know JavaScript well, TypeScript is a short incremental step.' } },
    { '@type': 'Question', name: 'What should I do after completing all 45 lessons?', acceptedAnswer: { '@type': 'Answer', text: 'Create a real Angular project with Angular CLI and rebuild a few lessons using official APIs: standalone components, Router, HttpClient, ReactiveFormsModule, signals, RxJS, and Angular testing utilities. The playground gives you the mental model; the real project teaches production workflow — TypeScript, imports, dependency injection config, build tooling, and deployment.' } },
    { '@type': 'Question', name: 'Is my progress saved between sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your current position are saved to localStorage automatically. No account or login is required. Progress does not sync across devices.' } },
    { '@type': 'Question', name: 'How is this different from StackBlitz or CodeSandbox?', acceptedAnswer: { '@type': 'Answer', text: 'StackBlitz and CodeSandbox are full project environments for building real Angular applications. This playground is a guided Angular tutorial with 45 focused lessons, concept explanations, Quick Check questions, and progress tracking — designed for learning Angular concepts, not for project scaffolding or production development.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Angular Playground',
  url: 'https://webdevpuneet.com/angular-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive Angular learning playground with 45 guided lessons across 13 chapters — templates, directives, components, services, routing, pipes, standalone components, signals, reactive forms, RxJS, lazy loading, change detection, testing, and feature architecture. Live preview, progress tracking, Quick Check challenges. No Angular CLI, no Node.js, no install required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '45 Angular-style lessons across 13 chapters',
    'Beginner-to-pro learning path from Hello Angular to feature architecture',
    'Live template preview — edit and see results without Angular CLI',
    'All core directives — *ngIf, conditional empty states, *ngFor, nested lists',
    'Events & Forms — event binding, input events, ngModel, simple validation',
    'Services & Dependency Injection — shared service state, HTTP client pattern, loading/error states',
    'Routing — router outlet, route state, route params, route guards',
    'Modern Angular — standalone components, lifecycle hooks, signals, new control flow',
    'Advanced Forms — reactive forms model, dynamic FormArray, cross-field validation',
    'RxJS & State — observable streams, operators, lightweight state store',
    'Architecture & Performance — lazy loading, change detection strategy, trackBy',
    'Testing & Production — component testing, service testing, error handling, feature architecture',
    'Mini Project: Task Board (Pipes & Styling chapter)',
    'Quick Check challenges on key lessons',
    'Progress tracking via localStorage',
    'Resizable editor and preview panes',
    '100% browser-based — no install required',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Angular Playground', item: 'https://webdevpuneet.com/angular-playground/' },
  ],
};

const seoData = {
  slug: 'angular-playground',
  title: 'Angular Playground — Learn Angular Online with Live Preview, Free',
  subtitle: 'A free interactive Angular tutorial with 45 lessons — templates, directives, components, services, routing, signals, RxJS, reactive forms, lazy loading, testing, and feature architecture. No Angular CLI. No install.',

  about: {
    title: 'Learn Angular Online Without Installing Angular CLI — 45 Lessons, Live Preview',
    description: `Angular has a reputation for being heavy to get started with. Before writing your first template, a typical setup involves installing Node.js, the Angular CLI, running \`ng new\`, waiting for dozens of packages to install, and understanding the project structure before a single component renders. This Angular Playground removes every setup barrier. Open the page and a working Angular-style template is already running in the preview pane — ready to edit, no terminal needed.

The 45 lessons span 13 chapters that take you from your first component through signals, RxJS, reactive forms, lazy loading, change detection strategy, component testing, service testing, and feature architecture. Each lesson is small and focused — one concept demonstrated with a real editable example.

**Getting Started and Templates — the foundation Angular builds on**

The first six lessons establish the mental model that makes every later Angular concept easier. \`Hello Angular\` registers a component and renders it. Interpolation shows \`{{ expression }}\` rendering reactive state — change the component's data property and the template updates automatically. Property binding passes real JavaScript values to element properties with \`[property]="expression"\`. Attribute binding sets ARIA and HTML attributes that have no DOM property equivalent. Class and style binding dynamically add or remove CSS classes and inline styles from the component's state.

These five binding patterns — interpolation, property, attribute, class, style — are the grammar of every Angular template. Understanding them before moving to directives makes \`*ngIf\` and \`*ngFor\` instantly readable.

**Directives — *ngIf and *ngFor**

Four directive lessons with interactive previews. \`*ngIf\` toggles UI sections based on a boolean condition — toggle the flag and watch Angular add and remove the DOM block. A Conditional Empty States lesson shows the real pattern: \`*ngIf="items.length; else emptyBlock"\` with a named \`<ng-template>\` for the empty case. \`*ngFor\` renders an array as a list — edit the array, add an item, remove one, and watch the list update. Nested Lists shows \`*ngFor\` inside \`*ngFor\` for a curriculum outline with chapters and topic arrays.

**Events & Forms — binding actions and inputs**

Four lessons on user interaction. Event binding with \`(click)\`, \`(keydown)\`, and \`$event\` to handle clicks and keyboard shortcuts. Input events — live character count, auto-format, and debounced search as the user types. Two-way binding with \`[(ngModel)]\` on text, checkbox, radio, and select inputs simultaneously. Simple Validation with required and minlength directives, error message display tied to \`touched && invalid\`, and submit state management.

**Components — inputs and composition**

Two lessons on Angular's component model. Component Inputs passes a product object from a parent to a \`ProductCardComponent\` using \`@Input()\` decorator. Component Composition nests a child component inside a parent container and shows how a layout component wraps a data component — the pattern behind every real Angular page.

**Services & Data — dependency injection, shared state, HTTP, and loading patterns**

Four lessons on the layer that separates Angular from frameworks without dependency injection. Services and DI introduces \`@Injectable({ providedIn: 'root' })\` and constructor injection — how the same service instance is shared across multiple components. Shared Service State shows a cart service with reactive state shared between a product list and a cart summary. HTTP Client Pattern demonstrates the standard \`HttpClient.get()\` pattern with typed responses and a service layer. Loading and Error States builds the full async loading pattern: loading spinner → HTTP request → render data → catch errors and show a message — the template you copy into every real API call.

**Routing — outlets, route state, params, and guards**

Four routing lessons. Router Outlet shows a top-level outlet with navigation links. Route State reads \`ActivatedRoute\` to display the current route information. Route Params reads dynamic \`:id\` parameters and uses them to look up data — the pattern behind every detail page. Route Guards implements a \`canActivate\` guard that blocks navigation to protected routes — shown as an auth check with a redirect to login.

**Pipes & Styling — built-in pipes, display formatting, mini project, custom pipe**

Four lessons plus a mini project. Built-in pipes: \`date\`, \`currency\`, \`uppercase\`, \`lowercase\`, \`percent\`, \`slice\`, and \`async\`. Display Formatting chains pipes and uses pure pipes for a freelance invoice summary. The **Mini Project: Task Board** combines everything from the chapter — pipe-filtered status columns, dynamic class binding, and a shared service for task data. Custom Pipe and Directive builds a \`truncatePipe\` and a \`highlightDirective\` from scratch.

**Modern Angular — standalone components, lifecycle hooks, signals, new control flow**

Four lessons on where Angular is heading. Standalone Components removes \`NgModule\` and uses \`imports: []\` directly in the component decorator — the recommended pattern for new Angular code. Lifecycle Hooks visualises the full sequence: \`ngOnInit\`, \`ngOnChanges\`, \`ngAfterViewInit\`, \`ngOnDestroy\` — logged as a live timeline as you interact with the component. Signals Mental Model demonstrates \`signal()\`, \`computed()\`, and \`effect()\` side by side — showing how signals replace Zone.js change detection for granular updates. New Control Flow introduces \`@if\`, \`@else\`, and \`@for\` — Angular 17+ template syntax that replaces \`*ngIf\` and \`*ngFor\`.

**Advanced Forms — reactive forms, FormArray, cross-field validation**

Three lessons on production form patterns. Reactive Forms Model builds a \`FormGroup\` with \`FormControl\` instances, validators, and a submit handler — showing how the form model lives in the class, not the template. Dynamic Form Arrays uses \`FormArray\` to add and remove phone number inputs programmatically. Cross-Field Validation writes a custom \`ValidatorFn\` that checks two controls against each other — the pattern for password/confirm-password and date-range validators.

**RxJS & State — observables, operators, lightweight store**

Three lessons on reactive data. Observable Streams wraps a countdown timer and a search input in \`fromEvent\` and \`interval\` observables. RxJS Operators chains \`debounceTime\`, \`distinctUntilChanged\`, \`switchMap\`, and \`map\` for a typeahead search — the exact chain used in real Angular search inputs. Lightweight State Store builds a \`BehaviorSubject\`-based store with \`select()\` and \`dispatch()\` methods — a minimal NgRx-style pattern without the boilerplate.

**Architecture & Performance — lazy loading, change detection, trackBy**

Three lessons on optimising Angular applications. Lazy Loading configures a route with \`loadComponent\` and shows the network waterfall — the bundle is only fetched when the user navigates to that route. Change Detection Strategy sets \`ChangeDetectionStrategy.OnPush\` on a component and demonstrates how Angular skips re-rendering when inputs are the same reference. trackBy shows the performance difference between re-rendering a list without \`trackBy\` (all DOM nodes replaced) and with \`trackBy\` (only changed nodes updated).

**Testing & Production — component testing, service testing, error handling, feature architecture**

Four lessons on production-readiness. Component Testing writes Jasmine/Jest-style specs: arrange a component, interact with it, and assert on the DOM output — the pattern every Angular unit test follows. Service Testing writes isolated tests for a \`CartService\` with mock dependencies. Production Error Handling implements a global \`ErrorHandler\` and an HTTP interceptor for 4xx/5xx responses. Feature Architecture shows the recommended folder structure for a real Angular feature module — components, services, models, and routing in one self-contained folder.

Progress and your current lesson are saved to localStorage automatically. Quick Check questions appear on key lessons to test recall. All code runs fully in your browser — no data is uploaded to any server.`,
  },

  features: [
    '45 guided lessons across 13 chapters from Hello Angular to feature architecture — a natural next step after the [JavaScript playground](/js-playground) and [TypeScript playground](/typescript-playground)',
    'Live Angular-style template preview — edit and see results without Angular CLI or Node.js, just like the [Vue playground](/vue-playground)',
    'All five template binding types — interpolation, property, attribute, class, and style binding',
    'Directives — *ngIf with empty states, *ngFor with nested lists, and Angular 17+ @if/@for control flow',
    'Events & Forms — event binding, input events, two-way ngModel, simple validation with error messages',
    'Services & Dependency Injection — shared service state, HTTP client pattern, loading/error states',
    'Routing — router outlet, route state, dynamic route params, and route guards',
    'Pipes & Styling — built-in pipes, custom pipe and directive, mini project Task Board',
    'Modern Angular — standalone components, lifecycle hooks, signals, computed(), effect()',
    'Advanced Forms — reactive forms model, dynamic FormArray, cross-field custom validators',
    'RxJS & State — observable streams, debounceTime/switchMap/map chain, BehaviorSubject store',
    'Architecture & Performance — lazy loading, OnPush change detection, trackBy for lists',
    'Testing & Production — component testing, service testing, global error handler, feature architecture',
    'Quick Check challenges on key lessons — collapsible multiple-choice with correct/wrong feedback',
    'Progress tracking saved to localStorage — resume exactly where you left off',
    'Resizable editor and preview panes',
    '100% browser-based — no Angular CLI, no Node.js, no npm, no setup required',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Open the playground — no install required',
        text: 'Navigate to the Angular Playground. An Angular-style template is already running in the preview pane — no Angular CLI, no Node.js, no npm install, no terminal. Start learning immediately.',
      },
      {
        title: 'Start with Getting Started and Templates if you are new to Angular',
        text: 'Work through Hello Angular, Interpolation, State and Methods, Property Binding, Attribute Binding, and Class & Style Binding. These six lessons teach the five binding patterns that appear in every Angular template. Understanding them makes *ngIf, *ngFor, and event binding instantly readable.',
      },
      {
        title: 'Practice directives until *ngIf and *ngFor feel obvious',
        text: '*ngIf and *ngFor appear in almost every Angular component. Toggle conditions, edit arrays, add empty-state templates with ng-template. Spend time on these four lessons — they are the structural layer that controls what Angular renders on screen.',
      },
      {
        title: 'Work through Events & Forms before moving to components',
        text: 'Event binding, two-way ngModel, and simple validation are the patterns you will reach for on every user interaction. Once these feel natural, the Services and Components chapters become much easier — they build on the same data-flow model.',
      },
      {
        title: 'Move from templates into app structure',
        text: 'After forms, work through Components, Services & Data, and Routing. These chapters teach how a real Angular application is structured: components pass data via @Input(), services share state via dependency injection, and the router connects pages via outlets and route params.',
      },
      {
        title: 'Explore Modern Angular — signals and standalone components',
        text: 'The Modern Angular chapter covers standalone components (no NgModule), lifecycle hooks, signals (signal(), computed(), effect()), and Angular 17+ template control flow (@if, @for). These are the patterns you will see in new Angular projects starting from Angular 14–17+.',
      },
      {
        title: 'Use Advanced Forms and RxJS & State for production patterns',
        text: 'Reactive forms with FormGroup and FormArray, cross-field validators, observable streams with debounceTime and switchMap, and a BehaviorSubject-based store are all covered. These lessons prepare you for the patterns used in real production Angular codebases.',
      },
      {
        title: 'Finish with Architecture & Performance and Testing & Production',
        text: 'The final two chapters cover lazy loading, OnPush change detection, trackBy optimisation, component and service testing, a global error handler, and recommended feature architecture. After these lessons, create a real Angular CLI project and rebuild the same patterns with official Angular APIs.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Learn Angular from scratch without the CLI setup',
      desc: 'If you want to learn Angular but do not want to spend time installing Node.js, Angular CLI, and packages before writing your first template, start here. The 45 lessons are ready in your browser the moment the page loads. The path takes you from createApp equivalents through signals, RxJS, reactive forms, lazy loading, and testing in a logical sequence.',
    },
    {
      icon: '⇄',
      title: 'Understand Angular template syntax and directives',
      desc: 'The most common question from Angular beginners is "what is the difference between [property], (event), [(ngModel)], and *ngFor?" The playground gives each a dedicated interactive lesson. Change a property binding value and see the DOM update. Toggle a condition and watch *ngIf remove or add a block. Type in an input and see the two-way binding synchronise both directions.',
    },
    {
      icon: '{}',
      title: 'React or Vue developers learning Angular',
      desc: "If you know React or Vue, the Angular mental model maps cleanly: property binding [prop] is like React's prop={value}, event binding (click) is like onClick, *ngFor is like Array.map() in JSX, services with DI are like React Context providers, and signals are Angular's answer to useState. The template syntax looks different but the data-flow concepts are familiar.",
    },
    {
      icon: '⊞',
      title: 'Prepare for reactive forms, RxJS, and signals in production',
      desc: 'Template-driven forms with ngModel are covered first, but the Advanced Forms chapter goes further: reactive FormGroup with typed controls and Validators, dynamic FormArray for adding and removing rows, and a custom cross-field ValidatorFn. The RxJS chapter builds the debounceTime + switchMap typeahead chain. The Modern Angular chapter demonstrates signals as a replacement for Zone.js change detection.',
    },
    {
      icon: '◉',
      title: 'Review Angular concepts for interviews or team onboarding',
      desc: 'The most common Angular interview topics — component inputs/outputs, dependency injection, routing with guards, reactive forms, RxJS operators, change detection, and testing — each have a dedicated lesson with an editable example. Step through a specific lesson to refresh a concept before an interview or to demonstrate it during code review or a mentoring session.',
    },
    {
      icon: '✦',
      title: 'Bridge the gap before opening Angular CLI',
      desc: 'Angular CLI projects involve TypeScript files, module imports, dependency injection configuration, build tooling, and a folder structure to understand before the code makes sense. This playground lets you learn the concepts — what a component does, how a service is injected, how a route guard works — before the file structure obscures them.',
    },
  ],

  faqs: [
    { q: 'Do I need Angular CLI or Node.js to use this Angular Playground?', a: 'No. The playground runs entirely in your browser. There is nothing to install — no Angular CLI, no Node.js, no npm, no terminal. Open the page and start editing Angular-style templates immediately.' },
    { q: 'Is this Angular Playground good for beginners?', a: 'Yes. The first chapters start with components, interpolation, state, property binding, structural directives, events, and forms — the patterns every Angular developer uses daily. Later chapters build toward services, routing, signals, RxJS, reactive forms, lazy loading, testing, and feature architecture.' },
    { q: 'What Angular topics are covered in 45 lessons?', a: '13 chapters: Getting Started, Templates (5 binding types), Directives (*ngIf/*ngFor), Events & Forms, Components (inputs/composition), Services & Data (DI/HTTP/loading states), Routing (outlet/params/guards), Pipes & Styling (built-in + custom + Task Board mini project), Modern Angular (standalone/lifecycle/signals/new control flow), Advanced Forms (reactive forms/FormArray/cross-field validation), RxJS & State (streams/operators/store), Architecture & Performance (lazy loading/OnPush/trackBy), Testing & Production (component/service testing/error handling/feature architecture).' },
    { q: 'Is this a full Angular compiler?', a: 'No. It is an Angular-style learning playground that simulates the most important template and component patterns in the browser. It is designed to make Angular concepts concrete before you move to a real Angular CLI project with TypeScript, HttpClient, ReactiveFormsModule, and official Angular APIs.' },
    { q: 'What are Angular signals and why do they matter?', a: "Signals are Angular's modern reactivity primitive — a wrapper around a value that notifies Angular exactly which components need to re-render when the value changes. Unlike Zone.js-based change detection, signals are explicit: you read a signal by calling it as a function, and computed() derives values without side effects. The Signals Mental Model lesson demonstrates signal(), computed(), and effect() side by side." },
    { q: 'What is the difference between template-driven and reactive forms in Angular?', a: 'Template-driven forms use [(ngModel)] for two-way binding — easy to set up but harder to test and validate dynamically. Reactive forms define the form model in the component class with FormGroup, FormControl, and Validators — better for complex validation, dynamic fields, and unit testing. The playground covers both: simple ngModel validation in Events & Forms, and reactive FormGroup, FormArray, and cross-field validators in Advanced Forms.' },
    { q: 'Can I learn Angular without knowing TypeScript first?', a: 'You can start here without deep TypeScript knowledge — the lessons focus on Angular template behavior and component concepts. For production Angular work, TypeScript basics (types, interfaces, classes, generics) are important. If you know JavaScript well, TypeScript is a short incremental step.' },
    { q: 'What should I do after completing all 45 lessons?', a: 'Create a real Angular project with Angular CLI and rebuild a few lessons using official APIs: standalone components, Router, HttpClient, ReactiveFormsModule, signals, RxJS, and Angular testing utilities (TestBed, HttpClientTestingModule). The playground gives you the mental model; the real project teaches production workflow.' },
    { q: 'Is my progress saved between sessions?', a: 'Yes. Completed lessons and your current position are saved to localStorage automatically. No account or login is required. Progress does not sync across devices or browsers.' },
    { q: 'How is this different from StackBlitz or CodeSandbox?', a: 'StackBlitz and CodeSandbox are full project environments for building real Angular applications. This playground is a guided Angular tutorial with 45 focused lessons, concept explanations, Quick Check questions, and progress tracking — designed for learning Angular patterns, not for project scaffolding or production development.' },
  ],

  links: [
    { label: 'JavaScript Playground', href: '/js-playground/', desc: 'Build the JS foundation Angular assumes — 60 interactive lessons.' },
    { label: 'TypeScript Playground', href: '/typescript-playground/', desc: 'Learn TypeScript before using Angular — 10 chapters from types to generics.' },
    { label: 'React Playground', href: '/react-playground/', desc: 'Compare Angular with React — hooks, JSX, state, and component patterns.' },
    { label: 'Vue.js Playground', href: '/vue-playground/', desc: 'Learn Vue 3 — a lighter alternative framework with 40 interactive lessons.' },
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Master the styling layer that powers every Angular template.' },
  ],
};

export default function AngularPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <AngularPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
