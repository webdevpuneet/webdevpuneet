export const CHAPTERS = [
  'Getting Started',
  'Templates',
  'Directives',
  'Events & Forms',
  'Components',
  'Services & Data',
  'Routing',
  'Pipes & Styling',
  'Modern Angular',
  'Advanced Forms',
  'RxJS & State',
  'Architecture & Performance',
  'Testing & Production',
];

export const LESSONS = [
  {
    id: 'ng-hello',
    chapter: 'Getting Started',
    title: 'Hello Angular',
    concept: 'Angular apps are built from components. A component combines a **template** with a small piece of state and behavior. This playground uses an Angular-style component object so you can focus on templates, bindings, events, directives, and data flow without setting up Angular CLI.',
    challenge: {
      question: 'What does an Angular component combine?',
      options: ['Only CSS files', 'A template with state and behavior', 'A database table', 'Only HTML comments'],
      correct: 1,
    },
    code: `<h2>{{ title }}</h2>
<p>{{ message }}</p>
<button (click)="celebrate()">Update message</button>

<script>
component = {
  title: 'Hello, Angular!',
  message: 'Edit the component state and watch the template update.',
  celebrate() {
    this.message = 'Angular-style binding is working.';
  }
};
</script>`,
  },
  {
    id: 'ng-interpolation',
    chapter: 'Templates',
    title: 'Interpolation',
    concept: 'Interpolation uses `{{ expression }}` to print a value from the component into the template. The expression can read properties, call methods, and do simple calculations. Use it for text content, labels, totals, and small derived values.',
    challenge: {
      question: 'Which syntax prints a component value in an Angular template?',
      options: ['[[ value ]]', '{{ value }}', '${value}', '<%= value %>'],
      correct: 1,
    },
    code: `<h2>{{ product }}</h2>
<p>Price: {{ price }}</p>
<p>Quantity: {{ quantity }}</p>
<strong>Total: {{ total() }}</strong>

<script>
component = {
  product: 'Angular Course',
  price: 29,
  quantity: 3,
  total() {
    return '$' + (this.price * this.quantity).toFixed(2);
  }
};
</script>`,
  },
  {
    id: 'ng-state-methods',
    chapter: 'Templates',
    title: 'State and Methods',
    concept: 'Component state stores values the template can read. Component methods contain behavior that can update that state. When a method changes state, Angular updates the view so the template stays in sync with the component.',
    code: `<h2>{{ heading }}</h2>
<p>{{ description() }}</p>
<button (click)="promote()">Promote</button>
<button (click)="reset()">Reset</button>

<script>
component = {
  heading: 'Junior Developer',
  level: 1,
  description() {
    return 'Current level: ' + this.level;
  },
  promote() {
    this.level += 1;
    this.heading = this.level >= 3 ? 'Angular Developer' : 'Junior Developer';
  },
  reset() {
    this.level = 1;
    this.heading = 'Junior Developer';
  }
};
</script>`,
  },
  {
    id: 'ng-property-binding',
    chapter: 'Templates',
    title: 'Property Binding',
    concept: 'Property binding uses `[property]="expression"` to set a DOM property from component state. Unlike interpolation, it passes the real value, so booleans like `disabled` and strings like `src` work naturally.',
    code: `<h2>{{ title }}</h2>
<input [value]="title">
<button [disabled]="isSaving" (click)="save()">Save</button>
<p>{{ status }}</p>

<script>
component = {
  title: 'Angular Binding',
  isSaving: false,
  status: 'Ready',
  save() {
    this.isSaving = true;
    this.status = 'Saved locally';
  }
};
</script>`,
  },
  {
    id: 'ng-attribute-binding',
    chapter: 'Templates',
    title: 'Attribute Binding',
    concept: 'Attribute binding uses `[attr.name]="expression"` when you need to set real HTML attributes. It is useful for accessibility attributes, table spans, ARIA labels, and values that are attributes rather than DOM properties.',
    challenge: {
      question: 'When should you use [attr.name] binding?',
      options: ['For real HTML attributes like aria-label', 'Only for click events', 'Only for arrays', 'To create a service'],
      correct: 0,
    },
    code: `<h2>{{ title }}</h2>
<button [attr.aria-label]="label()" (click)="toggle()">
  {{ expanded ? 'Collapse details' : 'Expand details' }}
</button>

<p *ngIf="expanded">This button also updates its accessible label.</p>

<script>
component = {
  title: 'Accessible details',
  expanded: false,
  toggle() {
    this.expanded = !this.expanded;
  },
  label() {
    return this.expanded ? 'Hide project details' : 'Show project details';
  }
};
</script>`,
  },
  {
    id: 'ng-class-style',
    chapter: 'Templates',
    title: 'Class and Style Binding',
    concept: 'Angular can bind individual classes and styles: `[class.active]="isActive"` and `[style.color]="color"`. Use these bindings for selected rows, validation states, dynamic badges, and user-driven styling.',
    code: `<div class="card" [class.active]="active" [style.borderColor]="color">
  <h2>{{ title }}</h2>
  <p [style.color]="color">Current color: {{ color }}</p>
  <button (click)="toggle()">Toggle active</button>
  <button (click)="nextColor()">Next color</button>
</div>

<script>
component = {
  title: 'Dynamic styling',
  active: true,
  color: '#dd0031',
  colors: ['#dd0031', '#2563eb', '#059669'],
  toggle() {
    this.active = !this.active;
  },
  nextColor() {
    const index = this.colors.indexOf(this.color);
    this.color = this.colors[(index + 1) % this.colors.length];
  }
};
</script>`,
  },
  {
    id: 'ng-if',
    chapter: 'Directives',
    title: '*ngIf',
    concept: '`*ngIf` conditionally includes or removes a block from the DOM. Use it for empty states, loading states, permissions, feature flags, and UI sections that should only exist when a condition is true.',
    challenge: {
      question: 'What does *ngIf do when its expression is false?',
      options: ['Hides with opacity only', 'Removes the block from the DOM', 'Changes text color', 'Reloads the page'],
      correct: 1,
    },
    code: `<button (click)="toggleLogin()">
  {{ loggedIn ? 'Log out' : 'Log in' }}
</button>

<section *ngIf="loggedIn">
  <h2>Welcome back, {{ user }}</h2>
  <p>Your dashboard is ready.</p>
</section>

<p *ngIf="!loggedIn">Please log in to see your dashboard.</p>

<script>
component = {
  user: 'Puneet',
  loggedIn: false,
  toggleLogin() {
    this.loggedIn = !this.loggedIn;
  }
};
</script>`,
  },
  {
    id: 'ng-conditional-empty-state',
    chapter: 'Directives',
    title: 'Conditional Empty States',
    concept: 'Apps often show different blocks for loaded, empty, and useful states. Combining `*ngIf` with arrays lets you guide the user instead of leaving a blank panel.',
    code: `<h2>Inbox</h2>
<button (click)="addMessage()">Add message</button>
<button (click)="clear()">Clear</button>

<p *ngIf="messages.length === 0">No messages yet.</p>
<ul *ngIf="messages.length > 0">
  <li *ngFor="let message of messages">{{ message }}</li>
</ul>

<script>
component = {
  messages: [],
  addMessage() {
    this.messages.push('Message #' + (this.messages.length + 1));
  },
  clear() {
    this.messages = [];
  }
};
</script>`,
  },
  {
    id: 'ng-for',
    chapter: 'Directives',
    title: '*ngFor',
    concept: '`*ngFor` repeats a template for every item in an array. The common pattern is `*ngFor="let item of items"`. You can combine it with events and bindings to create lists, menus, tables, and cards.',
    challenge: {
      question: 'Which pattern repeats items in Angular templates?',
      options: ['*repeat="item in items"', '*ngFor="let item of items"', '@for item items', '#each items'],
      correct: 1,
    },
    code: `<h2>Lessons</h2>
<ul>
  <li *ngFor="let lesson of lessons" [class.active]="lesson.done">
    <button (click)="toggle(lesson)">{{ lesson.done ? 'Done' : 'Mark done' }}</button>
    {{ lesson.title }}
  </li>
</ul>
<p>{{ completed() }} / {{ lessons.length }} completed</p>

<script>
component = {
  lessons: [
    { title: 'Templates', done: true },
    { title: 'Directives', done: false },
    { title: 'Forms', done: false }
  ],
  toggle(lesson) {
    lesson.done = !lesson.done;
  },
  completed() {
    return this.lessons.filter(lesson => lesson.done).length;
  }
};
</script>`,
  },
  {
    id: 'ng-nested-for',
    chapter: 'Directives',
    title: 'Nested Lists',
    concept: '`*ngFor` can be used inside another repeated block. This is common for menus, grouped settings, dashboards, and category-based lists.',
    code: `<h2>Course Map</h2>
<section *ngFor="let section of sections" class="card">
  <strong>{{ section.title }}</strong>
  <ul>
    <li *ngFor="let topic of section.topics">{{ topic }}</li>
  </ul>
</section>

<script>
component = {
  sections: [
    { title: 'Templates', topics: ['Interpolation', 'Property binding', 'Class binding'] },
    { title: 'Directives', topics: ['ngIf', 'ngFor'] },
    { title: 'Forms', topics: ['ngModel', 'Validation'] }
  ]
};
</script>`,
  },
  {
    id: 'ng-events',
    chapter: 'Events & Forms',
    title: 'Event Binding',
    concept: 'Event binding uses `(event)="handler()"` to react to browser events. The handler runs in the component context, so `this` points to component state. Common events include click, input, submit, keyup, and change.',
    code: `<h2>Counter</h2>
<button (click)="decrement()">-</button>
<strong>{{ count }}</strong>
<button (click)="increment()">+</button>
<p>{{ message() }}</p>

<script>
component = {
  count: 0,
  increment() {
    this.count += 1;
  },
  decrement() {
    this.count -= 1;
  },
  message() {
    return this.count === 0 ? 'Start counting' : 'Current value: ' + this.count;
  }
};
</script>`,
  },
  {
    id: 'ng-input-events',
    chapter: 'Events & Forms',
    title: 'Input Events',
    concept: 'Event handlers can read `$event` data through the browser event object. Use input events when you need custom control over how text is parsed, cleaned, or transformed.',
    code: `<label>
  Project name
  <input [value]="name" (input)="rename($event)">
</label>

<h2>{{ name || 'Untitled project' }}</h2>
<p>Slug: {{ slug }}</p>

<script>
component = {
  name: 'Angular Playground',
  slug: 'angular-playground',
  rename(event) {
    this.name = event.target.value;
    this.slug = this.name.toLowerCase().trim().replaceAll(' ', '-');
  }
};
</script>`,
  },
  {
    id: 'ng-model',
    chapter: 'Events & Forms',
    title: 'Two-Way Binding',
    concept: 'Angular forms often use two-way binding with `[(ngModel)]="property"`. It reads the value from component state and writes changes back as the user types. This playground supports the same mental model for text inputs and checkboxes.',
    challenge: {
      question: 'What does [(ngModel)] combine?',
      options: ['A class and a style', 'Property binding and event binding', 'A pipe and a directive', 'A route and a service'],
      correct: 1,
    },
    code: `<label>
  Your name
  <input [(ngModel)]="name">
</label>

<label>
  <input type="checkbox" [(ngModel)]="excited">
  Excited?
</label>

<h2>Hello, {{ name || 'Angular learner' }}{{ excited ? '!' : '.' }}</h2>

<script>
component = {
  name: 'Puneet',
  excited: true
};
</script>`,
  },
  {
    id: 'ng-form-validation',
    chapter: 'Events & Forms',
    title: 'Simple Validation',
    concept: 'Form state usually includes values plus validation feedback. A template can bind classes, disabled states, and messages from the same component state.',
    code: `<label>
  Email
  <input [(ngModel)]="email" [class.active]="isValid()">
</label>

<p *ngIf="!isValid()">Enter an email with @ and a domain.</p>
<button [disabled]="!isValid()" (click)="submit()">Submit</button>
<p>{{ status }}</p>

<script>
component = {
  email: '',
  status: 'Waiting for a valid email',
  isValid() {
    return this.email.includes('@') && this.email.includes('.');
  },
  submit() {
    this.status = 'Submitted ' + this.email;
  }
};
</script>`,
  },
  {
    id: 'ng-components',
    chapter: 'Components',
    title: 'Component Inputs',
    concept: 'Real Angular apps split UI into components and pass data down through inputs. This lesson models that idea with a reusable `user-card` element and `[user]="person"` bindings.',
    code: `<h2>Team</h2>
<user-card *ngFor="let person of people" [user]="person"></user-card>

<script>
component = {
  components: {
    'user-card': '<article class="card"><strong>{{ user.name }}</strong><span>{{ user.role }}</span></article>'
  },
  people: [
    { name: 'Ada', role: 'Frontend' },
    { name: 'Lin', role: 'Angular' },
    { name: 'Mira', role: 'Design' }
  ]
};
</script>`,
  },
  {
    id: 'ng-component-composition',
    chapter: 'Components',
    title: 'Component Composition',
    concept: 'Larger interfaces are built by composing smaller components. Passing different input objects into the same child component keeps repeated UI consistent.',
    code: `<h2>Metrics</h2>
<metric-card *ngFor="let metric of metrics" [metric]="metric"></metric-card>

<script>
component = {
  components: {
    'metric-card': '<article class="card"><strong>{{ metric.label }}</strong><span>{{ metric.value }}</span><small>{{ metric.note }}</small></article>'
  },
  metrics: [
    { label: 'Lessons', value: 45, note: 'Angular path' },
    { label: 'Progress', value: 'Local', note: 'Saved in browser' },
    { label: 'Preview', value: 'Live', note: 'Updates as you type' }
  ]
};
</script>`,
  },
  {
    id: 'ng-services',
    chapter: 'Services & Data',
    title: 'Services and Dependency Injection',
    concept: 'Angular services hold shared logic and data access. Components ask Angular for a service through dependency injection, then call methods on that service. This playground models the pattern with a `todoService` object injected into component methods.',
    code: `<h2>Todos from a service</h2>
<button (click)="load()">Load todos</button>
<ul>
  <li *ngFor="let todo of todos">{{ todo }}</li>
</ul>

<script>
const todoService = {
  list() {
    return ['Plan component', 'Build template', 'Test bindings'];
  }
};

component = {
  todos: [],
  load() {
    this.todos = todoService.list();
  }
};
</script>`,
  },
  {
    id: 'ng-shared-service-state',
    chapter: 'Services & Data',
    title: 'Shared Service State',
    concept: 'A service can act as a shared store for more than one component. Components call service methods instead of duplicating data logic in every template.',
    code: `<h2>Cart</h2>
<button (click)="add('Template guide')">Add guide</button>
<button (click)="add('Forms checklist')">Add checklist</button>

<ul>
  <li *ngFor="let item of cart.items">{{ item }}</li>
</ul>
<strong>Total items: {{ cart.count() }}</strong>

<script>
const cartService = {
  items: [],
  add(item) {
    this.items.push(item);
  },
  count() {
    return this.items.length;
  }
};

component = {
  cart: cartService,
  add(item) {
    this.cart.add(item);
  }
};
</script>`,
  },
  {
    id: 'ng-http',
    chapter: 'Services & Data',
    title: 'HTTP Client Pattern',
    concept: 'Angular apps usually wrap HTTP calls in services. The component triggers loading, the service fetches data, and the template renders loading, success, or empty states. This lesson simulates an async HTTP call in the browser.',
    code: `<button (click)="loadPosts()">Load posts</button>
<p *ngIf="loading">Loading...</p>
<ul *ngIf="!loading">
  <li *ngFor="let post of posts">{{ post.title }}</li>
</ul>

<script>
component = {
  loading: false,
  posts: [],
  async loadPosts() {
    this.loading = true;
    await delay(500);
    this.posts = [
      { title: 'Angular templates' },
      { title: 'Services keep logic reusable' },
      { title: 'HTTP belongs behind a service' }
    ];
    this.loading = false;
  }
};
</script>`,
  },
  {
    id: 'ng-error-state',
    chapter: 'Services & Data',
    title: 'Loading and Error States',
    concept: 'Production data flows need loading and error states. Angular templates usually render each state from clear component properties like `loading`, `error`, and `items`.',
    code: `<button (click)="load(true)">Load success</button>
<button (click)="load(false)">Load error</button>

<p *ngIf="loading">Loading users...</p>
<p *ngIf="error">{{ error }}</p>
<ul *ngIf="!loading && !error">
  <li *ngFor="let user of users">{{ user }}</li>
</ul>

<script>
component = {
  loading: false,
  error: '',
  users: [],
  async load(success) {
    this.loading = true;
    this.error = '';
    this.users = [];
    await delay(400);
    if (!success) this.error = 'Could not load users.';
    else this.users = ['Ada', 'Lin', 'Mira'];
    this.loading = false;
  }
};
</script>`,
  },
  {
    id: 'ng-routing',
    chapter: 'Routing',
    title: 'Router Outlet',
    concept: 'Angular Router maps URLs to components and renders the active route inside `<router-outlet>`. This browser lesson models the idea with a small route table and buttons that change the active page.',
    code: `<nav>
  <button (click)="go('home')">Home</button>
  <button (click)="go('about')">About</button>
  <button (click)="go('contact')">Contact</button>
</nav>

<router-outlet></router-outlet>

<script>
component = {
  route: 'home',
  routes: {
    home: '<h2>Home</h2><p>Welcome to the Angular playground.</p>',
    about: '<h2>About</h2><p>Routes swap views without a full page reload.</p>',
    contact: '<h2>Contact</h2><p>Use router links in real Angular apps.</p>'
  },
  go(route) {
    this.route = route;
  }
};
</script>`,
  },
  {
    id: 'ng-route-state',
    chapter: 'Routing',
    title: 'Route State',
    concept: 'Routes often carry state such as the current section, selected item, or active tab. Keeping route state in one property makes navigation predictable.',
    code: `<nav>
  <button *ngFor="let tab of tabs" [class.active]="tab === route" (click)="go(tab)">
    {{ tab | uppercase }}
  </button>
</nav>

<h2>{{ route | uppercase }}</h2>
<p>{{ copy[route] }}</p>

<script>
component = {
  route: 'overview',
  tabs: ['overview', 'lessons', 'settings'],
  copy: {
    overview: 'Summary of the Angular app.',
    lessons: 'Lesson list for learners.',
    settings: 'Project preferences and controls.'
  },
  go(route) {
    this.route = route;
  }
};
</script>`,
  },
  {
    id: 'ng-pipes',
    chapter: 'Pipes & Styling',
    title: 'Pipes',
    concept: 'Pipes transform values for display: uppercase text, currency, dates, JSON, and custom formatting. They keep templates readable when you only need display-level formatting.',
    challenge: {
      question: 'What are Angular pipes mainly used for?',
      options: ['Routing to pages', 'Formatting values for display', 'Creating databases', 'Installing packages'],
      correct: 1,
    },
    code: `<h2>{{ title | uppercase }}</h2>
<p>Owner: {{ owner | lowercase }}</p>
<p>Budget: {{ budget | currency }}</p>
<pre>{{ stats | json }}</pre>

<script>
component = {
  title: 'Angular Pipes',
  owner: 'PUNEET',
  budget: 3000,
  stats: { lessons: 45, chapters: 13, complete: false }
};
</script>`,
  },
  {
    id: 'ng-display-formatting',
    chapter: 'Pipes & Styling',
    title: 'Display Formatting',
    concept: 'Use pipes for generic formatting and component methods for formatting that belongs to your domain. Both keep display logic out of raw data.',
    code: `<h2>{{ title | uppercase }}</h2>
<p>Rate: {{ rate | currency }}</p>
<p>Duration: {{ hours }} hours</p>
<strong>{{ estimate() }}</strong>

<script>
component = {
  title: 'Freelance Angular Task',
  rate: 35,
  hours: 6,
  estimate() {
    return 'Estimate: $' + (this.rate * this.hours).toLocaleString();
  }
};
</script>`,
  },
  {
    id: 'ng-mini-project',
    chapter: 'Pipes & Styling',
    title: 'Mini Project: Task Board',
    concept: 'A small Angular-style feature combines interpolation, property binding, events, two-way binding, `*ngFor`, `*ngIf`, class binding, and component methods. This is the pattern behind real dashboards and productivity tools.',
    code: `<h2>{{ title }}</h2>
<label>
  New task
  <input [(ngModel)]="draft" (keyup.enter)="addTask()">
</label>
<button [disabled]="!draft" (click)="addTask()">Add</button>

<ul>
  <li *ngFor="let task of tasks" [class.active]="task.done">
    <input type="checkbox" [(ngModel)]="task.done">
    {{ task.text }}
    <button (click)="remove(task)">Remove</button>
  </li>
</ul>

<p *ngIf="tasks.length === 0">No tasks yet.</p>
<p>{{ doneCount() }} / {{ tasks.length }} done</p>

<script>
component = {
  title: 'Angular Task Board',
  draft: '',
  tasks: [
    { text: 'Learn interpolation', done: true },
    { text: 'Practice directives', done: false }
  ],
  addTask() {
    if (!this.draft.trim()) return;
    this.tasks.push({ text: this.draft.trim(), done: false });
    this.draft = '';
  },
  remove(task) {
    this.tasks = this.tasks.filter(item => item !== task);
  },
  doneCount() {
    return this.tasks.filter(task => task.done).length;
  }
};
</script>`,
  },
  {
    id: 'ng-standalone-components',
    chapter: 'Modern Angular',
    title: 'Standalone Components',
    concept: 'Modern Angular favors standalone components. Instead of declaring every component inside an NgModule, a standalone component imports only the features it needs. This makes feature boundaries clearer and lazy loading easier.',
    challenge: {
      question: 'What is the main benefit of standalone components?',
      options: ['They remove templates', 'They make component dependencies explicit', 'They only work with jQuery', 'They disable routing'],
      correct: 1,
    },
    code: `<h2>{{ componentName }}</h2>
<p>{{ summary }}</p>
<ul>
  <li *ngFor="let item of imports">{{ item }}</li>
</ul>

<script>
component = {
  componentName: 'Standalone DashboardComponent',
  summary: 'A standalone component imports what its template needs.',
  imports: ['CommonModule', 'RouterLink', 'UserCardComponent']
};
</script>`,
  },
  {
    id: 'ng-lifecycle-hooks',
    chapter: 'Modern Angular',
    title: 'Lifecycle Hooks',
    concept: 'Lifecycle hooks are checkpoints in a component lifetime. `ngOnInit` loads initial data, `ngOnChanges` reacts to input changes, and `ngOnDestroy` cleans up subscriptions, timers, and external listeners.',
    code: `<h2>{{ title }}</h2>
<button (click)="init()">ngOnInit</button>
<button (click)="changeInput()">ngOnChanges</button>
<button (click)="destroy()">ngOnDestroy</button>
<ul>
  <li *ngFor="let entry of log">{{ entry }}</li>
</ul>

<script>
component = {
  title: 'Lifecycle timeline',
  inputValue: 'first',
  log: [],
  init() {
    this.log.push('ngOnInit: load component data');
  },
  changeInput() {
    this.inputValue = this.inputValue === 'first' ? 'second' : 'first';
    this.log.push('ngOnChanges: input changed to ' + this.inputValue);
  },
  destroy() {
    this.log.push('ngOnDestroy: clean up resources');
  }
};
</script>`,
  },
  {
    id: 'ng-signals',
    chapter: 'Modern Angular',
    title: 'Signals Mental Model',
    concept: 'Signals are Angular values that notify the framework when they change. A computed value derives from signals, and effects react to changes. This lesson models the same idea with small functions.',
    challenge: {
      question: 'What is a computed signal for?',
      options: ['Formatting CSS only', 'Deriving a value from other reactive values', 'Creating routes', 'Deleting services'],
      correct: 1,
    },
    code: `<h2>Signals-style cart</h2>
<button (click)="add()">Add item</button>
<button (click)="remove()">Remove item</button>
<p>Items: {{ count }}</p>
<strong>Total: {{ total() | currency }}</strong>

<script>
component = {
  count: 1,
  price: 12,
  add() {
    this.count += 1;
  },
  remove() {
    this.count = Math.max(0, this.count - 1);
  },
  total() {
    return this.count * this.price;
  }
};
</script>`,
  },
  {
    id: 'ng-control-flow',
    chapter: 'Modern Angular',
    title: 'New Control Flow',
    concept: 'New Angular templates use `@if`, `@for`, and `@switch` in real projects. This playground keeps using `*ngIf` and `*ngFor`, but the mental model is the same: render branches and lists directly from state.',
    code: `<h2>{{ title }}</h2>
<button (click)="setRole('guest')">Guest</button>
<button (click)="setRole('admin')">Admin</button>

<p *ngIf="role === 'guest'">Read-only dashboard.</p>
<p *ngIf="role === 'admin'">Admin tools enabled.</p>
<ul>
  <li *ngFor="let action of actions()">{{ action }}</li>
</ul>

<script>
component = {
  title: 'Control flow from state',
  role: 'guest',
  setRole(role) {
    this.role = role;
  },
  actions() {
    return this.role === 'admin' ? ['Create', 'Edit', 'Archive'] : ['View'];
  }
};
</script>`,
  },
  {
    id: 'ng-reactive-forms',
    chapter: 'Advanced Forms',
    title: 'Reactive Forms Model',
    concept: 'Reactive forms keep form values and validation rules in a structured model. Instead of scattering validation through the template, the component owns form state, errors, and submit behavior.',
    code: `<h2>Reactive form model</h2>
<label>Name <input [(ngModel)]="form.name"></label>
<label>Budget <input [(ngModel)]="form.budget"></label>

<p *ngIf="errors().length > 0">{{ errors()[0] }}</p>
<button [disabled]="!valid()" (click)="submit()">Create project</button>
<p>{{ status }}</p>

<script>
component = {
  form: { name: '', budget: '' },
  status: 'Fill the form',
  errors() {
    if (!this.form.name.trim()) return ['Name is required'];
    if (Number(this.form.budget) <= 0) return ['Budget must be above 0'];
    return [];
  },
  valid() {
    return this.errors().length === 0;
  },
  submit() {
    this.status = 'Created ' + this.form.name + ' with budget $' + this.form.budget;
  }
};
</script>`,
  },
  {
    id: 'ng-dynamic-form-array',
    chapter: 'Advanced Forms',
    title: 'Dynamic Form Arrays',
    concept: 'FormArray is used when the number of controls is dynamic: invoice lines, checklist items, skills, addresses, or product variants. The key idea is to store each row as structured state.',
    code: `<h2>Invoice lines</h2>
<button (click)="addLine()">Add line</button>
<ul>
  <li *ngFor="let line of lines">
    <input [(ngModel)]="line.name">
    <input [(ngModel)]="line.amount">
    {{ lineTotal(line) | currency }}
  </li>
</ul>
<strong>Total: {{ total() | currency }}</strong>

<script>
component = {
  lines: [
    { name: 'Design', amount: 200 },
    { name: 'Angular build', amount: 500 }
  ],
  addLine() {
    this.lines.push({ name: 'New item', amount: 0 });
  },
  lineTotal(line) {
    return Number(line.amount || 0);
  },
  total() {
    return this.lines.reduce((sum, line) => sum + this.lineTotal(line), 0);
  }
};
</script>`,
  },
  {
    id: 'ng-cross-field-validation',
    chapter: 'Advanced Forms',
    title: 'Cross-Field Validation',
    concept: 'Some validation depends on multiple fields. Date ranges, password confirmation, min/max budgets, and booking rules usually need a validator that reads the whole form group.',
    code: `<h2>Date range</h2>
<label>Start <input [(ngModel)]="range.start"></label>
<label>End <input [(ngModel)]="range.end"></label>

<p *ngIf="!validRange()">End date must be after start date.</p>
<button [disabled]="!validRange()">Save range</button>

<script>
component = {
  range: { start: '2026-05-01', end: '2026-05-10' },
  validRange() {
    return this.range.end >= this.range.start;
  }
};
</script>`,
  },
  {
    id: 'ng-observable-streams',
    chapter: 'RxJS & State',
    title: 'Observable Streams',
    concept: 'Angular uses Observables for streams of values over time: HTTP responses, router events, form value changes, and WebSocket updates. Think of a stream as values arriving one after another.',
    challenge: {
      question: 'What does an Observable represent?',
      options: ['Only one static string', 'A stream of values over time', 'A CSS selector', 'A template file'],
      correct: 1,
    },
    code: `<h2>Activity stream</h2>
<button (click)="emit('login')">Login event</button>
<button (click)="emit('purchase')">Purchase event</button>
<ul>
  <li *ngFor="let event of events">{{ event }}</li>
</ul>

<script>
component = {
  events: [],
  emit(type) {
    const time = new Date().toLocaleTimeString();
    this.events.push(type + ' at ' + time);
  }
};
</script>`,
  },
  {
    id: 'ng-rxjs-operators',
    chapter: 'RxJS & State',
    title: 'RxJS Operators',
    concept: 'Operators transform streams. In real Angular code, `map`, `filter`, `debounceTime`, and `switchMap` help turn noisy UI events into clean app data.',
    code: `<h2>Search pipeline</h2>
<input [(ngModel)]="query" (input)="search()">
<p>Raw query: {{ query }}</p>
<ul>
  <li *ngFor="let result of results">{{ result }}</li>
</ul>

<script>
component = {
  query: '',
  all: ['Angular forms', 'Angular router', 'Signals guide', 'RxJS streams'],
  results: [],
  search() {
    const q = this.query.toLowerCase().trim();
    this.results = q.length < 2 ? [] : this.all.filter(item => item.toLowerCase().includes(q));
  }
};
</script>`,
  },
  {
    id: 'ng-state-store',
    chapter: 'RxJS & State',
    title: 'Lightweight State Store',
    concept: 'As an app grows, shared state should have one owner. A small store centralizes reads, writes, derived values, and reset behavior instead of letting many components mutate data directly.',
    code: `<h2>Project store</h2>
<button (click)="store.add('Build UI')">Add UI</button>
<button (click)="store.add('Write tests')">Add tests</button>
<button (click)="store.reset()">Reset</button>

<ul>
  <li *ngFor="let task of store.tasks">{{ task }}</li>
</ul>
<strong>{{ store.count() }} tasks</strong>

<script>
const projectStore = {
  tasks: [],
  add(task) {
    this.tasks.push(task);
  },
  reset() {
    this.tasks = [];
  },
  count() {
    return this.tasks.length;
  }
};

component = { store: projectStore };
</script>`,
  },
  {
    id: 'ng-route-params',
    chapter: 'Routing',
    title: 'Route Params',
    concept: 'Route params identify which record a page should show, such as `/users/:id` or `/projects/:slug`. Components read the param, then load the matching data.',
    code: `<h2>Users</h2>
<button *ngFor="let user of users" [class.active]="user.id === routeId" (click)="open(user.id)">
  {{ user.name }}
</button>

<section class="card">
  <strong>{{ selected().name }}</strong>
  <span>{{ selected().role }}</span>
</section>

<script>
component = {
  routeId: 1,
  users: [
    { id: 1, name: 'Ada', role: 'Admin' },
    { id: 2, name: 'Lin', role: 'Editor' },
    { id: 3, name: 'Mira', role: 'Viewer' }
  ],
  open(id) {
    this.routeId = id;
  },
  selected() {
    return this.users.find(user => user.id === this.routeId) || this.users[0];
  }
};
</script>`,
  },
  {
    id: 'ng-route-guards',
    chapter: 'Routing',
    title: 'Route Guards',
    concept: 'Route guards protect pages before navigation happens. Use guards for authentication, authorization, unsaved changes, and feature access.',
    code: `<h2>Admin route</h2>
<button (click)="login()">Log in</button>
<button (click)="logout()">Log out</button>
<button (click)="goAdmin()">Open admin</button>

<p>{{ message }}</p>
<section *ngIf="route === 'admin'" class="card">Admin panel loaded.</section>

<script>
component = {
  loggedIn: false,
  route: 'home',
  message: 'Home page',
  login() {
    this.loggedIn = true;
    this.message = 'Logged in';
  },
  logout() {
    this.loggedIn = false;
    this.route = 'home';
    this.message = 'Logged out';
  },
  goAdmin() {
    if (!this.loggedIn) {
      this.message = 'Guard blocked admin route';
      return;
    }
    this.route = 'admin';
    this.message = 'Navigation allowed';
  }
};
</script>`,
  },
  {
    id: 'ng-lazy-loading',
    chapter: 'Architecture & Performance',
    title: 'Lazy Loading',
    concept: 'Lazy loading delays feature code until the user needs it. This keeps the first page lighter and lets large Angular apps scale without loading every screen upfront.',
    code: `<h2>Feature loader</h2>
<button (click)="loadFeature('reports')">Load reports</button>
<button (click)="loadFeature('billing')">Load billing</button>

<p>{{ status }}</p>
<ul>
  <li *ngFor="let feature of loaded">{{ feature }}</li>
</ul>

<script>
component = {
  status: 'No feature loaded yet',
  loaded: [],
  loadFeature(name) {
    if (!this.loaded.includes(name)) this.loaded.push(name);
    this.status = 'Lazy feature loaded: ' + name;
  }
};
</script>`,
  },
  {
    id: 'ng-change-detection',
    chapter: 'Architecture & Performance',
    title: 'Change Detection Strategy',
    concept: 'Angular change detection decides when templates update. Pro apps reduce unnecessary work with immutable updates, OnPush components, signals, and smaller component boundaries.',
    code: `<h2>Immutable updates</h2>
<button (click)="addMutable()">Mutable push</button>
<button (click)="addImmutable()">Immutable add</button>
<p>{{ note }}</p>
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>

<script>
component = {
  items: ['Initial'],
  note: 'Use immutable updates with OnPush-style thinking.',
  addMutable() {
    this.items.push('Mutable item');
    this.note = 'Works here, but can be harder to track in complex apps.';
  },
  addImmutable() {
    this.items = [...this.items, 'Immutable item'];
    this.note = 'New array reference: easier for optimized components.';
  }
};
</script>`,
  },
  {
    id: 'ng-trackby',
    chapter: 'Architecture & Performance',
    title: 'trackBy for Lists',
    concept: '`trackBy` helps Angular keep list DOM stable when arrays change. In production lists, always track by a durable id instead of relying on array position.',
    code: `<h2>Stable list ids</h2>
<button (click)="shuffle()">Reorder</button>
<ul>
  <li *ngFor="let item of items">#{{ item.id }} - {{ item.name }}</li>
</ul>
<p>Real Angular: trackBy returns item.id.</p>

<script>
component = {
  items: [
    { id: 101, name: 'Template' },
    { id: 102, name: 'Service' },
    { id: 103, name: 'Route' }
  ],
  shuffle() {
    this.items = [this.items[2], this.items[0], this.items[1]];
  }
};
</script>`,
  },
  {
    id: 'ng-custom-pipe-directive',
    chapter: 'Pipes & Styling',
    title: 'Custom Pipe and Directive',
    concept: 'Custom pipes format domain values, while custom directives package reusable DOM behavior. They keep templates expressive without repeating formatting and interaction logic everywhere.',
    code: `<h2>Custom formatting pattern</h2>
<button (click)="toggle()">Toggle highlight directive</button>
<p [class.active]="highlight">{{ formatStatus(status) }}</p>
<button (click)="next()">Next status</button>

<script>
component = {
  statuses: ['draft', 'in_review', 'approved'],
  index: 0,
  highlight: true,
  get status() {
    return this.statuses[this.index];
  },
  formatStatus(value) {
    return value.replaceAll('_', ' ').toUpperCase();
  },
  next() {
    this.index = (this.index + 1) % this.statuses.length;
  },
  toggle() {
    this.highlight = !this.highlight;
  }
};
</script>`,
  },
  {
    id: 'ng-testing-components',
    chapter: 'Testing & Production',
    title: 'Component Testing',
    concept: 'Component tests verify rendered state and user behavior. A good test checks what the user sees, performs an action, then checks the updated result.',
    code: `<h2>{{ title }}</h2>
<button (click)="increment()">Increment</button>
<p>Count: {{ count }}</p>
<pre>{{ testPlan() }}</pre>

<script>
component = {
  title: 'Counter component',
  count: 0,
  increment() {
    this.count += 1;
  },
  testPlan() {
    return [
      'render counter',
      'click Increment',
      'expect Count: ' + this.count
    ].join('\\n');
  }
};
</script>`,
  },
  {
    id: 'ng-testing-services',
    chapter: 'Testing & Production',
    title: 'Service Testing',
    concept: 'Service tests are usually simpler than component tests: pass inputs to methods, mock external dependencies, and assert returned data or state changes.',
    code: `<h2>Pricing service test</h2>
<button (click)="runTests()">Run tests</button>
<ul>
  <li *ngFor="let result of results">{{ result }}</li>
</ul>

<script>
const pricingService = {
  total(rate, hours) {
    return rate * hours;
  }
};

component = {
  results: [],
  runTests() {
    this.results = [
      pricingService.total(50, 2) === 100 ? 'PASS basic total' : 'FAIL basic total',
      pricingService.total(0, 4) === 0 ? 'PASS zero rate' : 'FAIL zero rate'
    ];
  }
};
</script>`,
  },
  {
    id: 'ng-error-handling',
    chapter: 'Testing & Production',
    title: 'Production Error Handling',
    concept: 'Production Angular apps should handle expected errors near the feature and unexpected errors through shared logging. Users need useful recovery, not raw stack traces.',
    code: `<h2>Save profile</h2>
<button (click)="save(true)">Save success</button>
<button (click)="save(false)">Save failure</button>
<p>{{ status }}</p>
<ul>
  <li *ngFor="let entry of errorLog">{{ entry }}</li>
</ul>

<script>
component = {
  status: 'Ready',
  errorLog: [],
  save(success) {
    if (success) {
      this.status = 'Profile saved';
      return;
    }
    this.status = 'Could not save. Please try again.';
    this.errorLog.push('Logged save failure for monitoring');
  }
};
</script>`,
  },
  {
    id: 'ng-app-architecture',
    chapter: 'Testing & Production',
    title: 'Feature Architecture',
    concept: 'Pro Angular apps organize code by feature. A feature owns its route, components, service, state, tests, and models. Shared code stays genuinely reusable instead of becoming a dumping ground.',
    code: `<h2>Feature folder checklist</h2>
<ul>
  <li *ngFor="let item of checklist" [class.active]="item.done">
    <button (click)="toggle(item)">{{ item.done ? 'Done' : 'Mark' }}</button>
    {{ item.name }}
  </li>
</ul>
<p>{{ complete() }} / {{ checklist.length }} ready</p>

<script>
component = {
  checklist: [
    { name: 'route', done: true },
    { name: 'smart component', done: true },
    { name: 'presentational components', done: false },
    { name: 'feature service/store', done: false },
    { name: 'tests', done: false }
  ],
  toggle(item) {
    item.done = !item.done;
  },
  complete() {
    return this.checklist.filter(item => item.done).length;
  }
};
</script>`,
  },
];
