export const CHAPTERS = [
  'Getting Started',
  'Template Directives',
  'Computed & Watch',
  'Class & Style',
  'Components',
  'Lifecycle Hooks',
  'Composition API',
  'Component Patterns',
  'Forms',
  'Advanced Vue',
  'Setup Function',
  'Advanced Patterns',
  'Mini-Projects',
];

export const LESSONS = [

  /* ── Getting Started ──────────────────────────────────────────── */
  {
    id: 'hello-vue',
    chapter: 'Getting Started',
    title: 'Hello Vue',
    concept: `**Vue 3** is a progressive JavaScript framework for building UIs. \`createApp\` creates a Vue application instance. \`.mount('#app')\` attaches it to a DOM element.

The \`template\` option defines the component's HTML. Vue renders it inside the element you mount to.`,
    code: `const app = createApp({
  template: \`
    <div>
      <h1>Hello, Vue 3!</h1>
      <p>A progressive JavaScript framework.</p>
    </div>
  \`
});
app.mount('#app');`,
    challenge: {
      question: 'What does .mount(\'#app\') do in Vue?',
      options: ['Attaches the Vue app to a DOM element', 'Creates a new component', 'Registers a plugin', 'Starts the dev server'],
      correct: 0,
    },
  },

  {
    id: 'interpolation',
    chapter: 'Getting Started',
    title: 'Template interpolation',
    concept: `**Double curly braces** \`{{ }}\` are Vue's template syntax for displaying data. They evaluate a JavaScript expression and render the result as text.

Data returned from the \`data()\` method is reactive — when it changes, the template updates automatically.`,
    code: `createApp({
  data() {
    return {
      name: 'Vue',
      version: 3,
      year: new Date().getFullYear(),
    };
  },
  template: \`
    <div>
      <h2>Hello, {{ name }} {{ version }}!</h2>
      <p>Current year: {{ year }}</p>
      <p>Uppercase: {{ name.toUpperCase() }}</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What syntax does Vue use to display reactive data in templates?',
      options: ['{{ expression }}', '{ expression }', '<% expression %>', '${expression}'],
      correct: 0,
    },
  },

  {
    id: 'data-reactivity',
    chapter: 'Getting Started',
    title: 'Data & reactivity',
    concept: `The \`data()\` method returns an object whose properties become **reactive**. Vue tracks which properties the template uses and re-renders only the parts that change.

Click the button — notice the template updates automatically without any manual DOM manipulation.`,
    code: `createApp({
  data() {
    return { count: 0, message: 'Click the button!' };
  },
  methods: {
    increment() {
      this.count++;
      this.message = \`Clicked \${this.count} times\`;
    },
  },
  template: \`
    <div>
      <p>{{ message }}</p>
      <button @click="increment">+1</button>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What makes Vue\'s data() properties reactive?',
      options: ['Vue wraps them in a Proxy that tracks access and changes', 'You must call setState() to update them', 'They use JavaScript getters/setters only', 'They are read-only until explicitly unlocked'],
      correct: 0,
    },
  },

  {
    id: 'methods',
    chapter: 'Getting Started',
    title: 'Methods',
    concept: `The **methods** option defines functions available in the template and accessible via \`this\` inside other options. Methods are called on events or used in expressions.

Inside methods, \`this\` refers to the component instance — you access reactive data via \`this.propertyName\`.`,
    code: `createApp({
  data() {
    return { a: 0, b: 0, result: '' };
  },
  methods: {
    add()      { this.result = \`\${this.a} + \${this.b} = \${this.a + this.b}\`; },
    multiply() { this.result = \`\${this.a} × \${this.b} = \${this.a * this.b}\`; },
    reset()    { this.a = 0; this.b = 0; this.result = ''; },
  },
  template: \`
    <div>
      <input type="number" v-model.number="a" style="width:60px" />
      <input type="number" v-model.number="b" style="width:60px;margin:0 8px" />
      <button @click="add">Add</button>
      <button @click="multiply" style="margin-left:6px">Multiply</button>
      <button @click="reset" style="margin-left:6px">Reset</button>
      <p><strong>{{ result }}</strong></p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Inside a Vue method, how do you access a data property called "count"?',
      options: ['this.count', 'data.count', 'state.count', 'self.count'],
      correct: 0,
    },
  },

  /* ── Template Directives ──────────────────────────────────────── */
  {
    id: 'v-bind',
    chapter: 'Template Directives',
    title: 'v-bind — dynamic attributes',
    concept: `**v-bind** dynamically binds an attribute to a JavaScript expression. The shorthand is just a colon: \`:attr="value"\`.

Use it to bind \`src\`, \`href\`, \`class\`, \`style\`, \`disabled\`, or any HTML attribute to reactive data.`,
    code: `createApp({
  data() {
    return {
      url:      'https://vuejs.org',
      label:    'Vue Official Site',
      imgSrc:   'https://vuejs.org/logo.svg',
      isActive: true,
    };
  },
  template: \`
    <div>
      <a :href="url" target="_blank">{{ label }}</a>
      <br><br>
      <img :src="imgSrc" width="48" alt="Vue logo" />
      <br><br>
      <button :disabled="!isActive" @click="isActive = !isActive">
        {{ isActive ? 'Enabled' : 'Disabled' }}
      </button>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the shorthand for v-bind:href="url"?',
      options: [':href="url"', '@href="url"', '#href="url"', '~href="url"'],
      correct: 0,
    },
  },

  {
    id: 'v-if',
    chapter: 'Template Directives',
    title: 'v-if / v-else / v-else-if',
    concept: `**v-if** conditionally renders an element — when the condition is false, the element is **removed from the DOM entirely**.

**v-else** and **v-else-if** must immediately follow a \`v-if\` or \`v-else-if\` element.`,
    code: `createApp({
  data() {
    return { score: 72 };
  },
  template: \`
    <div>
      <input type="range" v-model.number="score" min="0" max="100" />
      <p>Score: {{ score }}</p>
      <p v-if="score >= 90">🏆 Excellent!</p>
      <p v-else-if="score >= 70">👍 Good</p>
      <p v-else-if="score >= 50">📚 Keep studying</p>
      <p v-else>❌ Needs improvement</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What happens to a DOM element when v-if is false?',
      options: ['It is removed from the DOM entirely', 'It is hidden with display:none', 'It is hidden with visibility:hidden', 'It is moved off-screen'],
      correct: 0,
    },
  },

  {
    id: 'v-show',
    chapter: 'Template Directives',
    title: 'v-show — toggle visibility',
    concept: `**v-show** toggles an element's **CSS display** property. Unlike \`v-if\`, the element always stays in the DOM — it just becomes invisible.

Use \`v-show\` for things that toggle frequently. Use \`v-if\` when the condition rarely changes or when you want to avoid rendering the subtree at all.`,
    code: `createApp({
  data() {
    return { visible: true, tooltip: false };
  },
  template: \`
    <div>
      <button @click="visible = !visible">
        {{ visible ? 'Hide' : 'Show' }} panel
      </button>
      <div v-show="visible" style="margin-top:10px;padding:12px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px">
        <p>This panel uses v-show — it stays in the DOM.</p>
        <button @mouseenter="tooltip=true" @mouseleave="tooltip=false">Hover me</button>
        <span v-show="tooltip" style="margin-left:8px;color:green">Tooltip!</span>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the key difference between v-if and v-show?',
      options: ['v-show uses CSS display:none; v-if removes the element from DOM', 'v-if uses CSS display:none; v-show removes the element from DOM', 'They are identical', 'v-show only works on div elements'],
      correct: 0,
    },
  },

  {
    id: 'v-for',
    chapter: 'Template Directives',
    title: 'v-for — render lists',
    concept: `**v-for** renders a list of elements by iterating over an array or object. Always provide a unique \`:key\` so Vue can efficiently update the list when items change.

Syntax: \`v-for="item in items"\` or \`v-for="(item, index) in items"\`.`,
    code: `createApp({
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry', 'Mango'],
      newFruit: '',
    };
  },
  methods: {
    addFruit() {
      if (this.newFruit.trim()) {
        this.fruits.push(this.newFruit.trim());
        this.newFruit = '';
      }
    },
    remove(i) { this.fruits.splice(i, 1); },
  },
  template: \`
    <div>
      <ul>
        <li v-for="(fruit, i) in fruits" :key="fruit">
          {{ i + 1 }}. {{ fruit }}
          <button @click="remove(i)" style="margin-left:8px;font-size:11px">✕</button>
        </li>
      </ul>
      <input v-model="newFruit" @keyup.enter="addFruit" placeholder="Add fruit…" />
      <button @click="addFruit">Add</button>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Why is :key required in v-for?',
      options: ['So Vue can track and efficiently update individual list items', 'To give each element a CSS class', 'To bind the item to a database key', 'It is not required — just a suggestion'],
      correct: 0,
    },
  },

  {
    id: 'v-on',
    chapter: 'Template Directives',
    title: 'v-on — handle events',
    concept: `**v-on** listens to DOM events. The shorthand is \`@\`. You can listen to any DOM event: \`@click\`, \`@input\`, \`@keyup\`, \`@submit\`, \`@mouseover\`, etc.

Pass the event object with \`$event\`, or use inline expressions directly.`,
    code: `createApp({
  data() {
    return { x: 0, y: 0, key: '', clicks: 0 };
  },
  methods: {
    trackMouse(e) { this.x = e.offsetX; this.y = e.offsetY; },
    trackKey(e)   { this.key = e.key; },
  },
  template: \`
    <div>
      <div
        @mousemove="trackMouse"
        @click="clicks++"
        style="width:240px;height:120px;background:#f0f9ff;border:1px dashed #38bdf8;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:crosshair"
      >
        Move / click here
      </div>
      <p>Mouse: {{ x }}, {{ y }} | Clicks: {{ clicks }}</p>
      <input @keyup="trackKey" placeholder="Press any key…" />
      <p>Last key: <strong>{{ key || '—' }}</strong></p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the shorthand for v-on:click="handler"?',
      options: ['@click="handler"', ':click="handler"', '#click="handler"', '~click="handler"'],
      correct: 0,
    },
  },

  {
    id: 'v-model',
    chapter: 'Template Directives',
    title: 'v-model — two-way binding',
    concept: `**v-model** creates two-way data binding between a form input and reactive data. It is shorthand for binding the value and listening to the input event simultaneously.

Works with \`<input>\`, \`<textarea>\`, \`<select>\`, \`<input type="checkbox">\`, and \`<input type="radio">\`.`,
    code: `createApp({
  data() {
    return {
      text:    '',
      checked: false,
      picked:  'one',
      selected: 'b',
    };
  },
  template: \`
    <div style="display:flex;flex-direction:column;gap:10px">
      <label>Text: <input v-model="text" placeholder="type…" /></label>
      <p>Value: <strong>{{ text }}</strong></p>

      <label><input type="checkbox" v-model="checked" /> Checked: {{ checked }}</label>

      <div>
        <label><input type="radio" v-model="picked" value="one" /> One</label>
        <label style="margin-left:10px"><input type="radio" v-model="picked" value="two" /> Two</label>
        <p>Picked: {{ picked }}</p>
      </div>

      <label>Select:
        <select v-model="selected">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </label>
      <p>Selected: {{ selected }}</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What does v-model do on an input element?',
      options: ['Binds the value and syncs changes back to data automatically', 'Only reads the value once on mount', 'Only updates the DOM, not the data', 'Validates the input before updating'],
      correct: 0,
    },
  },

  /* ── Computed & Watch ─────────────────────────────────────────── */
  {
    id: 'computed',
    chapter: 'Computed & Watch',
    title: 'Computed properties',
    concept: `**Computed properties** are derived values that update automatically when their dependencies change. They are cached — if the dependencies haven't changed, Vue returns the cached value without re-running the function.

Use computed for values derived from data. Use methods for operations with side effects.`,
    code: `createApp({
  data() {
    return { firstName: 'Ada', lastName: 'Lovelace', items: [10, 20, 30, 40] };
  },
  computed: {
    fullName()  { return \`\${this.firstName} \${this.lastName}\`; },
    initials()  { return \`\${this.firstName[0]}.\${this.lastName[0]}.\`; },
    total()     { return this.items.reduce((sum, n) => sum + n, 0); },
    average()   { return (this.total / this.items.length).toFixed(2); },
  },
  template: \`
    <div>
      <input v-model="firstName" placeholder="First" />
      <input v-model="lastName"  placeholder="Last" style="margin-left:6px"/>
      <p>Full name: <strong>{{ fullName }}</strong></p>
      <p>Initials: {{ initials }}</p>
      <hr/>
      <p>Items: {{ items.join(', ') }}</p>
      <p>Total: {{ total }} | Average: {{ average }}</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the main benefit of computed properties over methods?',
      options: ['They are cached and only re-run when dependencies change', 'They run faster because they use native browser APIs', 'They can receive arguments', 'They can modify other data properties directly'],
      correct: 0,
    },
  },

  {
    id: 'watch',
    chapter: 'Computed & Watch',
    title: 'Watchers',
    concept: `**watch** lets you react to data changes with side effects — API calls, logging, animations, or updating external state. It runs the callback whenever the watched value changes.

Use \`immediate: true\` to run the watcher immediately on mount. Use \`deep: true\` to watch nested object changes.`,
    code: `createApp({
  data() {
    return { query: '', result: '', loading: false, history: [] };
  },
  watch: {
    query(newVal, oldVal) {
      if (!newVal.trim()) { this.result = ''; return; }
      this.loading = true;
      // Simulate async search
      setTimeout(() => {
        this.result = \`Results for "\${newVal}": \${newVal.length * 3} items found\`;
        this.history.unshift(newVal);
        if (this.history.length > 5) this.history.pop();
        this.loading = false;
      }, 500);
    },
  },
  template: \`
    <div>
      <input v-model="query" placeholder="Search…" />
      <p v-if="loading">Searching…</p>
      <p v-else>{{ result || 'Type to search' }}</p>
      <div v-if="history.length">
        <small>Recent: {{ history.join(', ') }}</small>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'When should you use watch instead of computed?',
      options: ['When you need side effects like API calls or logging in response to data changes', 'When you need to derive a value from other data', 'When you want faster performance', 'When you need to access the DOM'],
      correct: 0,
    },
  },

  {
    id: 'watcheffect',
    chapter: 'Computed & Watch',
    title: 'watchEffect',
    concept: `**watchEffect** runs a function immediately and automatically tracks which reactive values it reads, re-running whenever any of them change. You don't declare what to watch — Vue figures it out.

It's simpler than \`watch\` when you don't need the old value or fine-grained control.`,
    code: `createApp({
  setup() {
    const { ref, watchEffect } = Vue;
    const width  = ref(200);
    const height = ref(100);
    const color  = ref('#4ade80');
    const area   = ref(0);
    const log    = ref([]);

    watchEffect(() => {
      area.value = width.value * height.value;
      log.value = [width.value + '×' + height.value + ' = ' + area.value + 'px²', ...log.value].slice(0, 5);
    });

    return { width, height, color, area, log };
  },
  template: \`
    <div>
      <label>Width: <input type="range" v-model.number="width" min="50" max="400" /> {{ width }}px</label><br>
      <label>Height: <input type="range" v-model.number="height" min="20" max="300" /> {{ height }}px</label><br>
      <label>Color: <input type="color" v-model="color" /></label>
      <div :style="{ width: width + 'px', height: height + 'px', background: color, marginTop: '10px', borderRadius: '6px' }"></div>
      <p>Area: <strong>{{ area }}px²</strong></p>
      <small v-for="entry in log" :key="entry" style="display:block;color:#6b7280">{{ entry }}</small>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How does watchEffect know which values to watch?',
      options: ['It automatically tracks reactive values accessed during its execution', 'You declare the dependencies in an array', 'It watches all data properties', 'You use a separate Vue.track() call'],
      correct: 0,
    },
  },

  /* ── Class & Style ────────────────────────────────────────────── */
  {
    id: 'class-binding',
    chapter: 'Class & Style',
    title: 'Dynamic class binding',
    concept: `**:class** can take an object (class applied when value is truthy), an array of classes, or a combination. This is much cleaner than building class strings manually.

You can mix static and dynamic classes: \`class="base" :class="{ active: isActive }"\`.`,
    code: `createApp({
  data() {
    return { isActive: false, hasError: false, size: 'medium' };
  },
  template: \`
    <div>
      <style>
        .box { padding:16px; border-radius:8px; border:2px solid #d1d5db; transition: all 0.2s }
        .active { border-color:#4ade80; background:#f0fdf4 }
        .error  { border-color:#f87171; background:#fef2f2 }
        .small  { font-size:12px }
        .large  { font-size:20px; font-weight:bold }
      </style>
      <div class="box" :class="[{ active: isActive, error: hasError }, size]">
        Dynamic class demo
      </div>
      <br>
      <label><input type="checkbox" v-model="isActive" /> Active</label>
      <label style="margin-left:12px"><input type="checkbox" v-model="hasError" /> Error</label>
      <div style="margin-top:8px">
        <button @click="size='small'"  :style="size==='small'?'font-weight:bold':''">Small</button>
        <button @click="size='medium'" :style="size==='medium'?'font-weight:bold':''">Medium</button>
        <button @click="size='large'"  :style="size==='large'?'font-weight:bold':''">Large</button>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How do you apply a CSS class conditionally in Vue?',
      options: [':class="{ className: condition }"', 'v-class="condition ? className : \'\'"', ':style="{ class: condition }"', 'class="{{ condition ? className : \'\' }}"'],
      correct: 0,
    },
  },

  {
    id: 'style-binding',
    chapter: 'Class & Style',
    title: 'Dynamic style binding',
    concept: `**:style** binds inline styles as a JavaScript object. CSS properties use camelCase (\`backgroundColor\`) or kebab-case in quotes (\`'background-color'\`).

You can also pass an array of style objects, which Vue merges together.`,
    code: `createApp({
  data() {
    return { bg: '#6366f1', fg: '#ffffff', size: 18, radius: 8, text: 'Style me!' };
  },
  computed: {
    boxStyle() {
      return {
        background:   this.bg,
        color:        this.fg,
        fontSize:     this.size + 'px',
        borderRadius: this.radius + 'px',
        padding:      '16px 24px',
        display:      'inline-block',
        transition:   'all 0.2s',
        fontWeight:   'bold',
      };
    },
  },
  template: \`
    <div>
      <div :style="boxStyle">{{ text }}</div>
      <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
        <label>Background: <input type="color" v-model="bg" /></label>
        <label>Text color: <input type="color" v-model="fg" /></label>
        <label>Font size: <input type="range" v-model.number="size" min="10" max="36" /> {{ size }}px</label>
        <label>Radius: <input type="range" v-model.number="radius" min="0" max="50" /> {{ radius }}px</label>
        <label>Text: <input v-model="text" /></label>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How do you write "background-color" as a property in Vue\'s :style object?',
      options: ['backgroundColor (camelCase)', 'background-color (kebab-case without quotes)', 'BackgroundColor (PascalCase)', 'background_color (snake_case)'],
      correct: 0,
    },
  },

  /* ── Components ───────────────────────────────────────────────── */
  {
    id: 'child-components',
    chapter: 'Components',
    title: 'Child components',
    concept: `Vue apps are built from **components** — reusable, self-contained pieces of UI. Register a child component in the \`components\` option of the parent, then use it in the template.

Component names are PascalCase in the object but can be used in templates as PascalCase or kebab-case.`,
    code: `const AlertBox = {
  template: \`
    <div style="padding:10px 14px;background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;margin:6px 0">
      ⚠️ <slot>Default alert message</slot>
    </div>
  \`,
};

const SuccessBox = {
  template: \`
    <div style="padding:10px 14px;background:#f0fdf4;border:1px solid #22c55e;border-radius:6px;margin:6px 0">
      ✅ <slot>Success!</slot>
    </div>
  \`,
};

createApp({
  components: { AlertBox, SuccessBox },
  template: \`
    <div>
      <AlertBox>Watch out — something needs attention.</AlertBox>
      <SuccessBox>Everything looks great!</SuccessBox>
      <AlertBox /> <!-- uses default slot content -->
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How do you make a component available in a parent\'s template?',
      options: ['Register it in the parent\'s components option', 'Import it with a script tag', 'Declare it with v-register', 'Use window.component() globally'],
      correct: 0,
    },
  },

  {
    id: 'props',
    chapter: 'Components',
    title: 'Props — passing data down',
    concept: `**Props** are custom attributes you pass to a child component. The child declares which props it accepts. Data flows **one way**: parent → child.

Never mutate a prop directly — if you need to change it, emit an event to the parent.`,
    code: `const UserCard = {
  props: ['name', 'role', 'avatar'],
  template: \`
    <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;margin:6px 0;background:#fff">
      <div style="width:40px;height:40px;border-radius:50%;background:#6366f1;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18px">
        {{ name[0] }}
      </div>
      <div>
        <strong>{{ name }}</strong>
        <div style="font-size:12px;color:#6b7280">{{ role }}</div>
      </div>
    </div>
  \`,
};

createApp({
  components: { UserCard },
  data() {
    return {
      users: [
        { name: 'Alice Johnson', role: 'Engineer' },
        { name: 'Bob Smith',     role: 'Designer' },
        { name: 'Carol White',   role: 'Manager' },
      ],
    };
  },
  template: \`
    <div>
      <UserCard
        v-for="user in users"
        :key="user.name"
        :name="user.name"
        :role="user.role"
      />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'In which direction do props flow in Vue?',
      options: ['Parent → Child (one-way, downward)', 'Child → Parent (one-way, upward)', 'Both directions simultaneously', 'It depends on v-model usage'],
      correct: 0,
    },
  },

  {
    id: 'emits',
    chapter: 'Components',
    title: 'Emits — passing data up',
    concept: `Children communicate back to parents by **emitting events** with \`$emit('eventName', payload)\`. The parent listens with \`@eventName="handler"\`.

Always declare emitted events in the \`emits\` option — it documents the component's interface and helps Vue optimize.`,
    code: `const Counter = {
  props: ['count', 'label'],
  emits: ['increment', 'decrement', 'reset'],
  template: \`
    <div style="border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin:6px 0">
      <div style="font-size:13px;color:#6b7280;margin-bottom:6px">{{ label }}</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button @click="$emit('decrement')">-</button>
        <span style="font-size:24px;font-weight:bold;min-width:40px;text-align:center">{{ count }}</span>
        <button @click="$emit('increment')">+</button>
        <button @click="$emit('reset')" style="margin-left:6px;font-size:11px">Reset</button>
      </div>
    </div>
  \`,
};

createApp({
  components: { Counter },
  data() { return { apples: 0, oranges: 0 }; },
  template: \`
    <div>
      <Counter label="Apples 🍎" :count="apples"
        @increment="apples++"
        @decrement="apples = Math.max(0, apples - 1)"
        @reset="apples = 0"
      />
      <Counter label="Oranges 🍊" :count="oranges"
        @increment="oranges++"
        @decrement="oranges = Math.max(0, oranges - 1)"
        @reset="oranges = 0"
      />
      <p>Total: {{ apples + oranges }}</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How does a child component send data to its parent?',
      options: ['By emitting a custom event with $emit("event", data)', 'By directly modifying the parent\'s data', 'By calling parent.update()', 'By using a shared global variable'],
      correct: 0,
    },
  },

  /* ── Lifecycle Hooks ──────────────────────────────────────────── */
  {
    id: 'onmounted',
    chapter: 'Lifecycle Hooks',
    title: 'onMounted — after render',
    concept: `Vue components go through a lifecycle: **create → mount → update → unmount**. Hooks let you run code at each stage.

**onMounted** (Composition API) or **mounted** (Options API) runs after the component is added to the DOM. Use it for API fetches, DOM measurements, or third-party library setup.`,
    code: `createApp({
  data() {
    return { posts: [], loading: true, error: '' };
  },
  async mounted() {
    try {
      // Simulate an API call
      await new Promise(r => setTimeout(r, 800));
      this.posts = [
        { id: 1, title: 'Getting started with Vue 3', views: 1240 },
        { id: 2, title: 'Composition API deep dive',  views: 986  },
        { id: 3, title: 'Vue vs React in 2025',       views: 3400 },
      ];
    } catch (e) {
      this.error = 'Failed to load posts';
    } finally {
      this.loading = false;
    }
  },
  template: \`
    <div>
      <p v-if="loading">⏳ Loading posts…</p>
      <p v-else-if="error" style="color:red">{{ error }}</p>
      <div v-else>
        <div v-for="post in posts" :key="post.id"
          style="padding:10px;border-bottom:1px solid #e5e7eb">
          <strong>{{ post.title }}</strong>
          <span style="float:right;color:#6b7280;font-size:12px">{{ post.views }} views</span>
        </div>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'When does the mounted() lifecycle hook run?',
      options: ['After the component is inserted into the DOM', 'Before the component template is compiled', 'When data() is called', 'When the component is destroyed'],
      correct: 0,
    },
  },

  {
    id: 'lifecycle-full',
    chapter: 'Lifecycle Hooks',
    title: 'Lifecycle sequence',
    concept: `The full Vue lifecycle: **beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted**.

In the Composition API these map to: \`onBeforeMount\`, \`onMounted\`, \`onBeforeUpdate\`, \`onUpdated\`, \`onBeforeUnmount\`, \`onUnmounted\`.

**Important:** never mutate reactive data inside \`beforeUpdate\` or \`updated\` — it re-triggers the hook, creating an infinite loop. Use \`console.log\` there instead (open the Console panel to see them).`,
    code: `createApp({
  data() {
    return { count: 0, mountLog: [], clicks: 0 };
  },
  created()     { this.mountLog.push('1. created — data is reactive'); },
  beforeMount() { this.mountLog.push('2. beforeMount — before first render'); },
  mounted()     { this.mountLog.push('3. mounted — DOM is ready'); },
  // beforeUpdate / updated must NOT mutate reactive data — doing so causes an infinite loop.
  // Use console.log to observe them safely (see the Console panel below).
  beforeUpdate() { console.log('4. beforeUpdate — count is now ' + this.count); },
  updated()      { console.log('5. updated — DOM synced, count = ' + this.count); },
  template: \`
    <div>
      <button @click="count++; clicks++">Count: {{ count }}</button>
      <p style="font-size:12px;color:#6b7280;margin:4px 0">
        Click button → open Console panel to see beforeUpdate + updated firing.
      </p>
      <div style="margin-top:10px;font-family:monospace;font-size:11px">
        <strong style="font-size:12px">Mount sequence:</strong>
        <div v-for="(entry, i) in mountLog" :key="i"
          style="padding:3px 0;border-bottom:1px solid #f3f4f6;color:#6366f1">
          {{ entry }}
        </div>
        <div v-if="clicks > 0" style="margin-top:6px;padding:3px 0;color:#16a34a;border-bottom:1px solid #f3f4f6">
          (check Console — beforeUpdate + updated ran {{ clicks }} time{{ clicks === 1 ? '' : 's' }})
        </div>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Which hook runs after every DOM update?',
      options: ['updated', 'mounted', 'beforeUpdate', 'created'],
      correct: 0,
    },
  },

  /* ── Composition API ──────────────────────────────────────────── */
  {
    id: 'ref',
    chapter: 'Composition API',
    title: 'ref() — reactive values',
    concept: `The **Composition API** organises logic by feature rather than by option type. The \`setup()\` function runs before the component mounts and returns what the template can use.

**ref()** wraps a primitive value in a reactive container. Access the value with \`.value\` in JavaScript — the template unwraps it automatically.`,
    code: `createApp({
  setup() {
    const { ref } = Vue;
    const count   = ref(0);
    const name    = ref('World');
    const doubled = Vue.computed(() => count.value * 2);

    function increment() { count.value++; }
    function reset()     { count.value = 0; }

    return { count, name, doubled, increment, reset };
  },
  template: \`
    <div>
      <input v-model="name" placeholder="Your name" />
      <p>Hello, {{ name }}!</p>
      <hr />
      <p>Count: {{ count }} | Doubled: {{ doubled }}</p>
      <button @click="increment">+1</button>
      <button @click="reset" style="margin-left:6px">Reset</button>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'How do you read or write a ref\'s value in JavaScript (not template)?',
      options: ['myRef.value', 'myRef.get()', 'myRef.data', 'Vue.unref(myRef, value)'],
      correct: 0,
    },
  },

  {
    id: 'reactive',
    chapter: 'Composition API',
    title: 'reactive() — reactive objects',
    concept: `**reactive()** makes an entire object reactive. Unlike \`ref\`, you access properties directly without \`.value\`.

Use \`reactive()\` for objects with multiple related properties. Use \`ref()\` for single values or when you need to reassign the whole container.`,
    code: `createApp({
  setup() {
    const { reactive, computed } = Vue;

    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
    });

    const fullName = computed(() => \`\${form.firstName} \${form.lastName}\`.trim());
    const isValid  = computed(() => form.firstName && form.lastName && form.email.includes('@'));

    function submit() {
      alert(\`Submitted: \${fullName.value} (\${form.email})\`);
    }

    return { form, fullName, isValid, submit };
  },
  template: \`
    <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:8px">
      <input v-model="form.firstName" placeholder="First name" />
      <input v-model="form.lastName"  placeholder="Last name" />
      <input v-model="form.email"     placeholder="Email" type="email" />
      <p v-if="fullName">Hello, {{ fullName }}!</p>
      <button type="submit" :disabled="!isValid">Submit</button>
    </form>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the key difference between reactive() and ref()?',
      options: ['reactive() is for objects (no .value needed); ref() wraps any value (requires .value in JS)', 'reactive() is faster than ref()', 'ref() is for objects; reactive() is for primitives', 'They are identical — just different naming conventions'],
      correct: 0,
    },
  },

  {
    id: 'composables',
    chapter: 'Composition API',
    title: 'Composables — reusable logic',
    concept: `A **composable** is a function that uses the Composition API to encapsulate and reuse stateful logic. By convention, composable names start with \`use\`.

This is Vue's answer to React hooks — extract logic into plain functions that can be shared across components.`,
    code: `// Composable: useCounter
function useCounter(initial = 0) {
  const { ref, computed } = Vue;
  const count = ref(initial);
  const isEven = computed(() => count.value % 2 === 0);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset     = () => count.value = initial;
  return { count, isEven, increment, decrement, reset };
}

// Composable: useLocalStorage
function useLocalStorage(key, defaultVal) {
  const { ref, watch } = Vue;
  const stored = localStorage.getItem(key);
  const value  = ref(stored !== null ? JSON.parse(stored) : defaultVal);
  watch(value, v => localStorage.setItem(key, JSON.stringify(v)), { deep: true });
  return value;
}

createApp({
  setup() {
    const c1 = useCounter(0);
    const c2 = useCounter(10);
    const savedName = useLocalStorage('vue-demo-name', 'Friend');
    return { c1, c2, savedName };
  },
  template: \`
    <div>
      <p>Counter A: {{ c1.count }} ({{ c1.isEven ? 'even' : 'odd' }})</p>
      <button @click="c1.increment">+</button>
      <button @click="c1.decrement">-</button>
      <button @click="c1.reset" style="margin-left:6px">Reset</button>
      <hr/>
      <p>Counter B (starts at 10): {{ c2.count }}</p>
      <button @click="c2.increment">+</button>
      <button @click="c2.decrement">-</button>
      <hr/>
      <p>Saved name (persists on reload):</p>
      <input v-model="savedName" />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What naming convention do Vue composables follow?',
      options: ['Names start with "use" (e.g. useCounter, useFetch)', 'Names start with "make" (e.g. makeCounter)', 'Names start with "create" (e.g. createCounter)', 'No convention — any name works'],
      correct: 0,
    },
  },

  /* ── Component Patterns ───────────────────────────────────────── */
  {
    id: 'slots',
    chapter: 'Component Patterns',
    title: 'Slots — content distribution',
    concept: `**Slots** let parent components inject content into a child component's template. The child defines where the content goes with \`<slot>\`. This is how you build truly reusable layout components.

A slot can have fallback content that renders when no content is provided.`,
    code: `const Card = {
  props: ['title'],
  template: \`
    <div style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin:8px 0;box-shadow:0 1px 4px rgba(0,0,0,0.06)">
      <div style="background:#6366f1;color:#fff;padding:10px 16px;font-weight:bold">{{ title }}</div>
      <div style="padding:14px">
        <slot>No content provided.</slot>
      </div>
      <div v-if="$slots.footer" style="padding:8px 16px;background:#f9fafb;border-top:1px solid #e5e7eb">
        <slot name="footer" />
      </div>
    </div>
  \`,
};

createApp({
  components: { Card },
  template: \`
    <div>
      <Card title="Weather">
        🌤 It's 22°C and sunny today.
        <template #footer>Updated 2 min ago</template>
      </Card>
      <Card title="Empty card" />
      <Card title="Rich content">
        <ul>
          <li>Item one</li>
          <li>Item two</li>
          <li>Item three</li>
        </ul>
      </Card>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What does <slot> do inside a child component\'s template?',
      options: ['It marks where the parent\'s injected content will be rendered', 'It creates a new component', 'It renders a list of items', 'It defines a data property'],
      correct: 0,
    },
  },

  {
    id: 'provide-inject',
    chapter: 'Component Patterns',
    title: 'Provide & Inject',
    concept: `**provide** and **inject** let a parent pass data to any descendant — no matter how deeply nested — without prop drilling through every intermediate component.

The ancestor \`provide\`s data; any descendant \`inject\`s it by name.`,
    code: `const DeepChild = {
  inject: ['theme', 'username'],
  template: \`
    <div style="padding:10px;background:#f0fdf4;border-radius:6px;border:1px solid #86efac">
      <strong>Deep Child</strong>
      <p>Theme: {{ theme }} | User: {{ username }}</p>
    </div>
  \`,
};

const Middle = {
  components: { DeepChild },
  template: \`
    <div style="padding:10px;border:1px dashed #d1d5db;border-radius:6px;margin:6px 0">
      Middle (doesn't know about theme/user)
      <DeepChild />
    </div>
  \`,
};

createApp({
  components: { Middle },
  data() { return { theme: 'light', user: 'Alice' }; },
  provide() {
    return { theme: this.theme, username: this.user };
  },
  template: \`
    <div>
      <label>Theme:
        <select v-model="theme">
          <option>light</option><option>dark</option><option>blue</option>
        </select>
      </label>
      <label style="margin-left:10px">User: <input v-model="user" style="width:100px" /></label>
      <p style="font-size:12px;color:#6b7280">Note: provide() snapshots values at creation; use reactive() for live updates.</p>
      <Middle />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What problem does provide/inject solve?',
      options: ['Passing data to deeply nested components without prop drilling', 'Replacing the Vuex store', 'Making components reactive', 'Sharing methods between sibling components'],
      correct: 0,
    },
  },

  /* ── Forms ────────────────────────────────────────────────────── */
  {
    id: 'form-handling',
    chapter: 'Forms',
    title: 'Form handling',
    concept: `Vue makes form handling clean with \`v-model\` modifiers. **\`.number\`** auto-casts to Number. **\`.trim\`** removes whitespace. **\`.lazy\`** syncs on \`change\` instead of \`input\`.

Use \`@submit.prevent\` to handle form submission without a page reload.`,
    code: `createApp({
  data() {
    return {
      form: { name: '', email: '', age: '', bio: '', agree: false },
      submitted: null,
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.form.name.trim()) this.errors.name = 'Required';
      if (!this.form.email.includes('@')) this.errors.email = 'Invalid email';
      if (this.form.age < 18) this.errors.age = 'Must be 18+';
      if (!this.form.agree) this.errors.agree = 'Must accept terms';
      return Object.keys(this.errors).length === 0;
    },
    submit() {
      if (this.validate()) this.submitted = { ...this.form };
    },
    reset() { this.form = { name:'',email:'',age:'',bio:'',agree:false }; this.submitted=null; this.errors={}; },
  },
  template: \`
    <div>
      <form v-if="!submitted" @submit.prevent="submit" style="display:flex;flex-direction:column;gap:8px">
        <div>
          <input v-model.trim="form.name" placeholder="Full name" />
          <span v-if="errors.name" style="color:red;font-size:11px;margin-left:6px">{{ errors.name }}</span>
        </div>
        <div>
          <input v-model.trim="form.email" type="email" placeholder="Email" />
          <span v-if="errors.email" style="color:red;font-size:11px;margin-left:6px">{{ errors.email }}</span>
        </div>
        <div>
          <input v-model.number="form.age" type="number" placeholder="Age" style="width:80px" />
          <span v-if="errors.age" style="color:red;font-size:11px;margin-left:6px">{{ errors.age }}</span>
        </div>
        <textarea v-model.trim="form.bio" placeholder="Short bio (lazy sync)" rows="2"></textarea>
        <div>
          <label><input type="checkbox" v-model="form.agree" /> I accept the terms</label>
          <span v-if="errors.agree" style="color:red;font-size:11px;margin-left:6px">{{ errors.agree }}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div v-else style="background:#f0fdf4;padding:14px;border-radius:8px">
        <p>✅ Submitted!</p>
        <pre style="font-size:12px">{{ JSON.stringify(submitted, null, 2) }}</pre>
        <button @click="reset">Reset</button>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What does the .number modifier do on v-model?',
      options: ['Automatically converts the input string to a JavaScript number', 'Limits the input to numbers only', 'Formats the number with commas', 'Rounds the number to 2 decimal places'],
      correct: 0,
    },
  },

  /* ── Advanced Vue ─────────────────────────────────────────────── */
  {
    id: 'dynamic-components',
    chapter: 'Advanced Vue',
    title: 'Dynamic components',
    concept: `**Dynamic components** let you switch between components at the same mount point using the special \`<component :is="..."\` element. Vue caches the component when you wrap it in \`<KeepAlive>\`.`,
    code: `const TabHome = {
  data: () => ({ count: 0 }),
  template: \`<div><p>🏠 Home tab</p><button @click="count++">Clicked {{ count }} times</button></div>\`,
};
const TabProfile = {
  template: \`<div><p>👤 Profile tab</p><p>Name: Alice Johnson</p></div>\`,
};
const TabSettings = {
  data: () => ({ dark: false }),
  template: \`<div><p>⚙️ Settings</p><label><input type="checkbox" v-model="dark"/> Dark mode: {{ dark }}</label></div>\`,
};

createApp({
  components: { TabHome, TabProfile, TabSettings },
  data() {
    return {
      current: 'TabHome',
      tabs: [
        { name: 'TabHome',     label: 'Home'     },
        { name: 'TabProfile',  label: 'Profile'  },
        { name: 'TabSettings', label: 'Settings' },
      ],
    };
  },
  template: \`
    <div>
      <div style="display:flex;gap:4px;margin-bottom:12px">
        <button v-for="tab in tabs" :key="tab.name"
          @click="current = tab.name"
          :style="current===tab.name ? 'font-weight:bold;border-color:#6366f1' : ''">
          {{ tab.label }}
        </button>
      </div>
      <div style="padding:14px;border:1px solid #e5e7eb;border-radius:8px">
        <KeepAlive>
          <component :is="current" />
        </KeepAlive>
      </div>
      <p style="font-size:11px;color:#6b7280">KeepAlive preserves state — try clicking "Home" button, switching tabs, and returning.</p>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What does <KeepAlive> do when wrapping a dynamic component?',
      options: ['Caches the component instance so its state is preserved when switching away', 'Prevents the component from unmounting on errors', 'Makes the component load faster', 'Keeps the component visible even when hidden'],
      correct: 0,
    },
  },

  {
    id: 'transition',
    chapter: 'Advanced Vue',
    title: 'Transition animations',
    concept: `Vue's **\`<Transition>\`** component adds enter/leave animations to elements. It adds CSS classes at the right moments: \`-enter-from\`, \`-enter-active\`, \`-enter-to\`, \`-leave-from\`, \`-leave-active\`, \`-leave-to\`.

Define the transitions in CSS and Vue handles the class application timing automatically.`,
    code: `createApp({
  data() {
    return { show: true, items: ['Apple', 'Banana', 'Cherry'] };
  },
  methods: {
    addItem() {
      const options = ['Mango', 'Grape', 'Kiwi', 'Peach', 'Plum', 'Lemon'];
      this.items.push(options[Math.floor(Math.random() * options.length)]);
    },
    removeItem(i) { this.items.splice(i, 1); },
  },
  template: \`
    <div>
      <style>
        .fade-enter-active, .fade-leave-active { transition: all 0.35s ease; }
        .fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-8px); }

        .list-enter-active, .list-leave-active { transition: all 0.3s ease; }
        .list-enter-from { opacity: 0; transform: translateX(-20px); }
        .list-leave-to   { opacity: 0; transform: translateX(20px); }
        .list-move { transition: transform 0.3s ease; }
      </style>

      <button @click="show = !show">Toggle box</button>
      <Transition name="fade">
        <div v-if="show" style="margin:10px 0;padding:12px;background:#ede9fe;border-radius:8px">
          Fading panel ✨
        </div>
      </Transition>

      <hr />
      <button @click="addItem">Add fruit</button>
      <TransitionGroup name="list" tag="ul" style="list-style:none;padding:0;margin-top:8px">
        <li v-for="(item, i) in items" :key="item"
          style="padding:6px 10px;margin:4px 0;background:#f0fdf4;border-radius:6px;display:flex;justify-content:space-between">
          {{ item }}
          <button @click="removeItem(i)" style="font-size:11px;background:none;border:none;cursor:pointer">✕</button>
        </li>
      </TransitionGroup>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What CSS class does Vue add to an element when it starts entering?',
      options: ['v-enter-from (or name-enter-from with a named transition)', 'v-enter-start', 'v-animate-in', 'v-transition-enter'],
      correct: 0,
    },
  },

  /* ── Composition API — picker ─────────────────────────────────── */
  {
    id: 'options-vs-composition',
    type: 'picker',
    chapter: 'Composition API',
    title: 'Options API vs Composition API',
    concept: `Both styles build the same apps — the difference is **organisation**. Options API groups code by type (data, methods, computed). Composition API groups by feature using \`setup()\`, enabling better reuse through composables.

Vue 3 fully supports both. Toggle between the variants to see the same todo list written two ways.`,
    options: [
      {
        label: 'Options API',
        code: `createApp({
  data() {
    return { newItem: '', items: ['Buy milk', 'Read docs'] };
  },
  computed: {
    count() { return this.items.length; },
  },
  methods: {
    add() {
      if (this.newItem.trim()) {
        this.items.push(this.newItem.trim());
        this.newItem = '';
      }
    },
    remove(i) { this.items.splice(i, 1); },
  },
  template: \`
    <div>
      <h3>Todo ({{ count }} items)</h3>
      <div style="display:flex;gap:6px;margin-bottom:10px">
        <input v-model="newItem" @keyup.enter="add" placeholder="Add item…" />
        <button @click="add">Add</button>
      </div>
      <ul style="padding-left:20px">
        <li v-for="(item, i) in items" :key="i" style="margin:4px 0">
          {{ item }}
          <button @click="remove(i)" style="margin-left:8px;font-size:11px">✕</button>
        </li>
      </ul>
    </div>
  \`,
}).mount('#app');`,
      },
      {
        label: 'Composition API',
        code: `createApp({
  setup() {
    const { ref, computed } = Vue;
    const newItem = ref('');
    const items   = ref(['Buy milk', 'Read docs']);
    const count   = computed(() => items.value.length);

    function add() {
      if (newItem.value.trim()) {
        items.value.push(newItem.value.trim());
        newItem.value = '';
      }
    }
    function remove(i) { items.value.splice(i, 1); }

    return { newItem, items, count, add, remove };
  },
  template: \`
    <div>
      <h3>Todo ({{ count }} items)</h3>
      <div style="display:flex;gap:6px;margin-bottom:10px">
        <input v-model="newItem" @keyup.enter="add" placeholder="Add item…" />
        <button @click="add">Add</button>
      </div>
      <ul style="padding-left:20px">
        <li v-for="(item, i) in items" :key="i" style="margin:4px 0">
          {{ item }}
          <button @click="remove(i)" style="margin-left:8px;font-size:11px">✕</button>
        </li>
      </ul>
    </div>
  \`,
}).mount('#app');`,
      },
    ],
    challenge: {
      question: 'Which Vue 3 style organises logic by feature and enables composables for code reuse?',
      options: ['Composition API', 'Options API', 'Class-based components', 'Template-only components'],
      correct: 0,
    },
  },

  /* ── Setup Function ───────────────────────────────────────────── */
  {
    id: 'setup-props-validation',
    chapter: 'Setup Function',
    title: 'Prop validation in setup()',
    concept: `In SFCs with \`<script setup>\` you'd write \`defineProps<{ label: string }>()\`. Here we use the **props option with validation rules** — identical runtime behaviour.

Vue checks types, required fields, and custom validators at runtime, warning in the console when rules are violated.`,
    code: `const Badge = {
  props: {
    text:    { type: String,  required: true },
    variant: { type: String,  default: 'info',
               validator: v => ['info','success','warning','danger'].includes(v) },
    count:   { type: Number,  default: 0 },
  },
  setup(props) {
    const colors = {
      info:    { bg:'#eff6ff', color:'#1d4ed8', border:'#93c5fd' },
      success: { bg:'#f0fdf4', color:'#15803d', border:'#86efac' },
      warning: { bg:'#fffbeb', color:'#b45309', border:'#fcd34d' },
      danger:  { bg:'#fef2f2', color:'#dc2626', border:'#fca5a5' },
    };
    const style = Vue.computed(() => {
      const c = colors[props.variant] || colors.info;
      return 'padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;border:1px solid ' +
             c.border + ';background:' + c.bg + ';color:' + c.color;
    });
    return { style };
  },
  template: \`
    <span :style="style">
      {{ text }}<span v-if="count > 0" style="margin-left:4px;opacity:0.7">({{ count }})</span>
    </span>
  \`,
};

createApp({
  components: { Badge },
  template: \`
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <Badge text="Info" variant="info" :count="3" />
      <Badge text="Success" variant="success" />
      <Badge text="Warning" variant="warning" :count="12" />
      <Badge text="Danger" variant="danger" :count="1" />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What happens when a Vue prop fails its validator function?',
      options: ['Vue logs a console warning in development mode', 'The component throws a runtime error', 'The prop is set to undefined automatically', 'Vue silently falls back to the default value'],
      correct: 0,
    },
  },

  {
    id: 'setup-emits-pattern',
    chapter: 'Setup Function',
    title: 'Emits with setup()',
    concept: `In \`<script setup>\` you'd write \`const emit = defineEmits(['change'])\`. In \`setup()\` you receive \`emit\` as the **second argument** via \`{ emit }\` destructuring.

Declaring emits documents the component's API and prevents Vue from forwarding them as native DOM events.`,
    code: `const RatingPicker = {
  props: { modelValue: { type: Number, default: 0 }, label: String },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const hovered = Vue.ref(0);
    function select(n) { emit('update:modelValue', n); }
    return { hovered, select };
  },
  template: \`
    <div>
      <div style="font-size:13px;margin-bottom:4px">{{ label }}</div>
      <div style="display:flex;gap:4px">
        <span
          v-for="n in 5" :key="n"
          @click="select(n)"
          @mouseenter="hovered = n"
          @mouseleave="hovered = 0"
          style="cursor:pointer;font-size:28px;line-height:1;transition:transform 0.1s"
          :style="{ transform: (hovered >= n || modelValue >= n) ? 'scale(1.2)' : 'scale(1)' }"
        >{{ (hovered >= n || modelValue >= n) ? '★' : '☆' }}</span>
      </div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px">
        {{ modelValue ? modelValue + ' / 5 stars' : 'No rating yet' }}
      </div>
    </div>
  \`,
};

createApp({
  components: { RatingPicker },
  setup() {
    const rating1 = Vue.ref(0);
    const rating2 = Vue.ref(3);
    return { rating1, rating2 };
  },
  template: \`
    <div style="display:flex;flex-direction:column;gap:16px">
      <RatingPicker label="Rate this tutorial:" v-model="rating1" />
      <RatingPicker label="Rate the docs:" v-model="rating2" />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'In setup(), how do you access the emit function?',
      options: ['As the second argument: setup(props, { emit })', 'Via this.$emit() inside setup', 'By importing emit from Vue', 'It is available as a global Vue.emit()'],
      correct: 0,
    },
  },

  {
    id: 'setup-template-refs',
    chapter: 'Setup Function',
    title: 'Template refs & onMounted',
    concept: `**Template refs** give you direct access to DOM elements from \`setup()\`. Create a \`ref(null)\`, bind it with \`ref="name"\` in the template, then read \`.value\` after mount.

The ref is \`null\` until \`onMounted\` — Vue fills it after the component's DOM is ready.`,
    code: `const FocusInput = {
  setup() {
    const { ref, onMounted } = Vue;
    const inputEl = ref(null);
    const value   = ref('');
    const charCount = Vue.computed(() => value.value.length);

    onMounted(() => { inputEl.value?.focus(); });

    function clear()  { value.value = ''; inputEl.value?.focus(); }
    function selectAll() { inputEl.value?.select(); }

    return { inputEl, value, charCount, clear, selectAll };
  },
  template: \`
    <div>
      <p style="font-size:13px;margin-bottom:8px;color:#6b7280">
        Auto-focuses on mount via template ref:
      </p>
      <div style="display:flex;gap:6px;margin-bottom:6px">
        <input ref="inputEl" v-model="value" placeholder="I'm focused automatically!" style="flex:1" />
        <button @click="selectAll">Select all</button>
        <button @click="clear">Clear</button>
      </div>
      <small style="color:#6b7280">{{ charCount }} characters</small>
    </div>
  \`,
};

createApp({ components: { FocusInput }, template: '<FocusInput />' }).mount('#app');`,
    challenge: {
      question: 'When is a template ref populated with the DOM element?',
      options: ['After onMounted — the DOM is not available during setup() itself', 'Immediately in setup() before the template renders', 'Only after the user interacts with the element', 'When you call Vue.nextTick() manually'],
      correct: 0,
    },
  },

  /* ── Advanced Patterns ────────────────────────────────────────── */
  {
    id: 'teleport',
    chapter: 'Advanced Patterns',
    title: 'Teleport — render anywhere',
    concept: `**\`<Teleport>\`** renders its content in a different part of the DOM — even outside your Vue app root. This is essential for **modals, tooltips, and dropdowns** that need to escape \`overflow:hidden\` or z-index stacking contexts.

The \`to\` prop accepts any CSS selector. The content still belongs logically to its parent (props, events, and state all work normally).`,
    code: `createApp({
  data() {
    return {
      showModal: false,
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed? This cannot be undone.',
    };
  },
  template: \`
    <div style="padding:20px;background:#f0f9ff;border-radius:8px;position:relative;overflow:hidden;height:130px;display:flex;align-items:center;justify-content:center">
      <p style="margin:0;font-size:11px;color:#94a3b8;position:absolute;top:8px;left:12px">
        ↑ This container has overflow:hidden — modal still renders above it via Teleport
      </p>
      <button @click="showModal = true" style="background:#6366f1;color:#fff;border:none;padding:8px 18px;border-radius:6px">
        Open Modal
      </button>

      <Teleport to="body">
        <div v-if="showModal"
          style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999"
          @click.self="showModal = false">
          <div style="background:#fff;border-radius:12px;padding:24px;min-width:280px;max-width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
            <h3 style="margin:0 0 8px">{{ title }}</h3>
            <p style="color:#6b7280;margin:0 0 20px;font-size:14px">{{ message }}</p>
            <div style="display:flex;gap:8px;justify-content:flex-end">
              <button @click="showModal = false"
                style="background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;border-radius:6px;padding:7px 16px">
                Cancel
              </button>
              <button @click="showModal = false"
                style="background:#6366f1;color:#fff;border:none;border-radius:6px;padding:7px 16px">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the main use case for Vue\'s <Teleport> component?',
      options: ['Rendering content outside the current DOM hierarchy (e.g. modals, tooltips)', 'Lazy-loading child components on demand', 'Animating components between route changes', 'Sharing reactive state between sibling components'],
      correct: 0,
    },
  },

  {
    id: 'custom-directives',
    chapter: 'Advanced Patterns',
    title: 'Custom directives',
    concept: `**Custom directives** add reusable DOM behaviour with hooks: \`mounted\`, \`updated\`, \`unmounted\`. Register globally with \`app.directive('name', def)\` or locally in the \`directives\` option.

Each hook receives the element, the binding object (with \`.value\`), and the vnode.`,
    code: `const app = createApp({
  data() {
    return { color: '#6366f1', text: 'Highlighted text', tooltipMsg: 'I am a custom tooltip!' };
  },
  template: \`
    <div style="display:flex;flex-direction:column;gap:16px">

      <div>
        <p style="margin:0 0 6px;font-size:13px;font-weight:600">v-focus — auto-focuses on mount:</p>
        <input v-focus placeholder="I'm focused automatically!" />
      </div>

      <div>
        <p style="margin:0 0 6px;font-size:13px;font-weight:600">v-highlight — background color binding:</p>
        <label style="font-size:13px">Color: <input type="color" v-model="color" /></label>
        <p v-highlight="color" style="margin-top:6px;padding:8px 12px;border-radius:4px;display:inline-block">{{ text }}</p>
      </div>

      <div>
        <p style="margin:0 0 6px;font-size:13px;font-weight:600">v-tooltip — hover tooltip:</p>
        <button v-tooltip="tooltipMsg"
          style="background:#6366f1;color:#fff;border:none;padding:8px 16px;border-radius:6px">
          Hover me
        </button>
      </div>

    </div>
  \`,
});

app.directive('focus', {
  mounted(el) { el.focus(); },
});

app.directive('highlight', {
  mounted(el, binding)  { el.style.background = binding.value; },
  updated(el, binding)  { el.style.background = binding.value; },
});

app.directive('tooltip', {
  mounted(el, binding) {
    const tip = document.createElement('div');
    tip.textContent = binding.value;
    Object.assign(tip.style, {
      display:'none', position:'absolute', background:'#1f2937', color:'#fff',
      padding:'4px 10px', borderRadius:'4px', fontSize:'12px', zIndex:'1000',
      whiteSpace:'nowrap', pointerEvents:'none', top:'-32px', left:'0',
    });
    el.style.position = 'relative';
    el.appendChild(tip);
    el._tip = tip;
    el.addEventListener('mouseenter', () => { tip.style.display = 'block'; });
    el.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
  },
  unmounted(el) { if (el._tip) el.removeChild(el._tip); },
});

app.mount('#app');`,
    challenge: {
      question: 'Which lifecycle hook in a custom directive runs after the element is inserted into the DOM?',
      options: ['mounted', 'created', 'beforeMount', 'updated'],
      correct: 0,
    },
  },

  {
    id: 'v-memo',
    chapter: 'Advanced Patterns',
    title: 'v-memo — skip re-renders',
    concept: `**\`v-memo\`** memoizes a subtree — it skips re-rendering the element and its children unless the specified array of values changes. This is a targeted performance tool for large lists.

\`v-memo="[dep1, dep2]"\` — the subtree only re-renders when dep1 or dep2 changes.`,
    code: `createApp({
  data() {
    return {
      selected: null,
      renderCount: 0,
      items: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: 'Item ' + (i + 1),
        value: Math.floor(Math.random() * 100),
      })),
    };
  },
  methods: {
    selectItem(id) {
      this.selected = this.selected === id ? null : id;
      this.renderCount++;
    },
  },
  template: \`
    <div>
      <p style="font-size:12px;color:#6b7280;margin-bottom:4px">
        With v-memo, only the newly selected/deselected row re-renders on each click.
      </p>
      <p style="font-size:12px;margin-bottom:8px">
        Selection changes: <strong>{{ renderCount }}</strong>
      </p>
      <div style="max-height:220px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:6px">
        <div
          v-for="item in items"
          :key="item.id"
          v-memo="[selected === item.id]"
          @click="selectItem(item.id)"
          :style="{
            padding:'8px 12px',
            borderBottom:'1px solid #f3f4f6',
            cursor:'pointer',
            background: selected === item.id ? '#ede9fe' : '#fff',
            fontWeight: selected === item.id ? '600' : '400',
            transition:'background 0.15s',
          }"
        >
          {{ item.name }} — score: {{ item.value }}
          <span v-if="selected === item.id" style="float:right;color:#6366f1">✓ selected</span>
        </div>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'When does a v-memo subtree skip re-rendering?',
      options: ['When all values in its dependency array are unchanged from last render', 'On every render — it always skips', 'When the component has no watchers', 'When the parent component uses KeepAlive'],
      correct: 0,
    },
  },

  {
    id: 'async-component',
    chapter: 'Advanced Patterns',
    title: 'Async components',
    concept: `**\`defineAsyncComponent\`** loads a component lazily — only when it is first needed. In real apps you'd pass \`() => import('./HeavyComponent.vue')\`. Combined with **\`<Suspense>\`**, you get declarative loading and error states.`,
    code: `const HeavyChart = Vue.defineAsyncComponent({
  loader: () => new Promise(resolve =>
    setTimeout(() => resolve({
      props: ['data'],
      template: \`
        <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px">
          <div style="display:flex;align-items:flex-end;gap:4px;height:80px;margin-bottom:8px">
            <div v-for="(v, i) in data" :key="i"
              :style="{ height: v+'%', width:'24px', background:'#6366f1',
                        borderRadius:'3px 3px 0 0', opacity: 0.5 + i*0.07 }">
            </div>
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0">
            Chart loaded async! Values: {{ data.join(', ') }}
          </p>
        </div>
      \`,
    }), 1800)
  ),
  loadingComponent: {
    template: '<p style="color:#6b7280;padding:16px">⏳ Loading chart component…</p>',
  },
  errorComponent: {
    template: '<p style="color:red;padding:16px">Failed to load chart.</p>',
  },
  delay: 200,
  timeout: 8000,
});

createApp({
  components: { HeavyChart },
  data() {
    return {
      show: false,
      chartData: [40, 70, 55, 90, 30, 75, 60, 45],
    };
  },
  template: \`
    <div>
      <button @click="show = !show">{{ show ? 'Hide' : 'Load' }} Chart</button>
      <p style="font-size:12px;color:#6b7280;margin:6px 0">
        The component code loads only when you click Load — simulating code splitting.
      </p>
      <div v-if="show" style="margin-top:12px">
        <Suspense>
          <HeavyChart :data="chartData" />
        </Suspense>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What is the main benefit of defineAsyncComponent?',
      options: ['The component code loads only when needed, reducing the initial bundle size', 'It makes components render faster by caching them', 'It allows components to manage their own data fetching lifecycle', 'It enables components to run in a web worker'],
      correct: 0,
    },
  },

  /* ── Mini-Projects ────────────────────────────────────────────── */
  {
    id: 'mini-todo',
    chapter: 'Mini-Projects',
    title: 'Todo App',
    concept: `A complete **Todo application** bringing together: \`v-model\`, \`v-for\`, \`v-if\`, computed filtering, a deep watcher for persistence, and localStorage.

This is the "Hello World" of reactive frameworks — everything in one self-contained component.`,
    code: `createApp({
  data() {
    const saved = localStorage.getItem('vue-todos');
    return {
      newTodo: '',
      filter: 'all',
      nextId: 4,
      todos: saved ? JSON.parse(saved) : [
        { id: 1, text: 'Learn Vue 3 basics', done: true },
        { id: 2, text: 'Build a component', done: false },
        { id: 3, text: 'Master Composition API', done: false },
      ],
    };
  },
  computed: {
    filtered() {
      if (this.filter === 'active') return this.todos.filter(t => !t.done);
      if (this.filter === 'done')   return this.todos.filter(t =>  t.done);
      return this.todos;
    },
    remaining() { return this.todos.filter(t => !t.done).length; },
  },
  watch: {
    todos: {
      deep: true,
      handler(v) { localStorage.setItem('vue-todos', JSON.stringify(v)); },
    },
  },
  methods: {
    add() {
      if (!this.newTodo.trim()) return;
      this.todos.push({ id: this.nextId++, text: this.newTodo.trim(), done: false });
      this.newTodo = '';
    },
    remove(id) { this.todos = this.todos.filter(t => t.id !== id); },
    clearDone() { this.todos = this.todos.filter(t => !t.done); },
  },
  template: \`
    <div style="max-width:360px">
      <h3 style="margin:0 0 12px">
        My Todos
        <span style="font-size:13px;color:#6b7280;font-weight:400">({{ remaining }} left)</span>
      </h3>

      <div style="display:flex;gap:6px;margin-bottom:12px">
        <input v-model="newTodo" @keyup.enter="add" placeholder="What needs doing?" style="flex:1" />
        <button @click="add">Add</button>
      </div>

      <div style="display:flex;gap:4px;margin-bottom:10px">
        <button v-for="f in ['all','active','done']" :key="f" @click="filter = f"
          :style="filter===f ? 'font-weight:700;border-color:#6366f1;color:#6366f1' : ''"
          style="background:transparent;border:1px solid #d1d5db;border-radius:16px;padding:2px 12px;font-size:12px">
          {{ f.charAt(0).toUpperCase() + f.slice(1) }}
        </button>
      </div>

      <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div v-if="filtered.length === 0"
          style="padding:16px;text-align:center;color:#9ca3af;font-size:13px">
          No todos here!
        </div>
        <label v-for="todo in filtered" :key="todo.id"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #f3f4f6;cursor:pointer">
          <input type="checkbox" v-model="todo.done" />
          <span :style="todo.done ? 'text-decoration:line-through;color:#9ca3af' : ''">{{ todo.text }}</span>
          <button @click.stop="remove(todo.id)"
            style="margin-left:auto;background:none;border:none;color:#d1d5db;font-size:16px;padding:0;cursor:pointer;line-height:1">✕</button>
        </label>
      </div>

      <div v-if="todos.some(t => t.done)" style="margin-top:8px;text-align:right">
        <button @click="clearDone"
          style="font-size:12px;background:none;border:none;color:#9ca3af;cursor:pointer;text-decoration:underline">
          Clear completed
        </button>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Why use a deep watcher (deep: true) to persist todos to localStorage?',
      options: ['Because checkbox changes mutate nested object properties — a shallow watch misses them', 'Because localStorage requires deep cloning', 'Because v-model on checkboxes needs deep watching to work', 'There is no need — a shallow watch is sufficient'],
      correct: 0,
    },
  },

  {
    id: 'mini-search',
    chapter: 'Mini-Projects',
    title: 'Searchable & Sortable Table',
    concept: `A **searchable, sortable data table** using a single computed property for both filtering and sorting. The original array never mutates — the computed property returns a new derived array on every dependency change.`,
    code: `createApp({
  data() {
    return {
      search: '',
      sortBy: 'name',
      sortDir: 1,
      people: [
        { name: 'Alice Johnson',  role: 'Engineer',  dept: 'Frontend', salary: 95000 },
        { name: 'Bob Martinez',   role: 'Designer',  dept: 'UX',       salary: 82000 },
        { name: 'Carol White',    role: 'Manager',   dept: 'Frontend', salary: 110000 },
        { name: 'David Kim',      role: 'Engineer',  dept: 'Backend',  salary: 98000 },
        { name: 'Eva Chen',       role: 'Analyst',   dept: 'Data',     salary: 88000 },
        { name: 'Frank Nguyen',   role: 'Engineer',  dept: 'Backend',  salary: 93000 },
        { name: 'Grace Lee',      role: 'Designer',  dept: 'UX',       salary: 79000 },
      ],
    };
  },
  computed: {
    filtered() {
      const q = this.search.toLowerCase();
      let rows = q
        ? this.people.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.role.toLowerCase().includes(q) ||
            p.dept.toLowerCase().includes(q))
        : [...this.people];
      rows.sort((a, b) => {
        const av = a[this.sortBy], bv = b[this.sortBy];
        return (av < bv ? -1 : av > bv ? 1 : 0) * this.sortDir;
      });
      return rows;
    },
  },
  methods: {
    sort(field) {
      if (this.sortBy === field) this.sortDir *= -1;
      else { this.sortBy = field; this.sortDir = 1; }
    },
    fmt(n) { return '$' + n.toLocaleString(); },
  },
  template: \`
    <div>
      <input v-model="search" placeholder="Search name, role, department…"
        style="width:100%;margin-bottom:10px" />
      <p style="font-size:12px;color:#6b7280;margin-bottom:6px">
        {{ filtered.length }} of {{ people.length }} results
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#f9fafb">
            <th v-for="col in [
              {key:'name',label:'Name'},
              {key:'role',label:'Role'},
              {key:'dept',label:'Dept'},
              {key:'salary',label:'Salary'}]"
              :key="col.key" @click="sort(col.key)"
              style="padding:8px 10px;text-align:left;border-bottom:2px solid #e5e7eb;cursor:pointer;user-select:none;white-space:nowrap">
              {{ col.label }}
              <span v-if="sortBy===col.key" style="font-size:10px;margin-left:2px">
                {{ sortDir === 1 ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.name"
            style="border-bottom:1px solid #f3f4f6"
            @mouseenter="$event.currentTarget.style.background='#f9fafb'"
            @mouseleave="$event.currentTarget.style.background=''">
            <td style="padding:8px 10px;font-weight:500">{{ p.name }}</td>
            <td style="padding:8px 10px;color:#6b7280">{{ p.role }}</td>
            <td style="padding:8px 10px">
              <span style="padding:2px 8px;background:#eff6ff;color:#1d4ed8;border-radius:10px;font-size:11px">
                {{ p.dept }}
              </span>
            </td>
            <td style="padding:8px 10px;font-family:monospace">{{ fmt(p.salary) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Why is filtering + sorting handled in a computed property rather than a watcher?',
      options: ['Computed properties return derived data with no side effects; watchers are for reactions like API calls', 'Watchers have better performance for large arrays', 'Computed properties can directly mutate the source array', 'Watchers support chaining multiple operations'],
      correct: 0,
    },
  },

  {
    id: 'mini-theme',
    chapter: 'Mini-Projects',
    title: 'Theme Switcher',
    concept: `A **design-token theme system** using CSS custom properties and Vue's \`provide/inject\`. The root component provides the active theme object; any descendant can inject it without prop drilling.

This pattern scales to full design systems — one reactive object controls every colour, font, and spacing token.`,
    code: `const themes = {
  light:  { name:'Light',  bg:'#ffffff', surface:'#f8fafc', text:'#0f172a', accent:'#6366f1', border:'#e2e8f0' },
  dark:   { name:'Dark',   bg:'#0f172a', surface:'#1e293b', text:'#f1f5f9', accent:'#818cf8', border:'#334155' },
  forest: { name:'Forest', bg:'#f0fdf4', surface:'#dcfce7', text:'#14532d', accent:'#16a34a', border:'#86efac' },
  amber:  { name:'Amber',  bg:'#fffbeb', surface:'#fef3c7', text:'#78350f', accent:'#d97706', border:'#fcd34d' },
};

// Provide a reactive object (not a ref) so Options API inject gets plain access
const activeTheme = Vue.reactive({ ...themes.light });

const ThemeCard = {
  inject: ['theme'],
  props: ['title', 'body'],
  template: \`
    <div :style="{
      background: theme.surface, border: '1px solid ' + theme.border,
      borderRadius:'10px', padding:'16px', marginBottom:'10px',
      transition:'all 0.3s',
    }">
      <h4 :style="{ color: theme.text, margin:'0 0 6px', fontSize:'15px' }">{{ title }}</h4>
      <p :style="{ color: theme.text, opacity:0.7, margin:'0 0 12px', fontSize:'13px' }">{{ body }}</p>
      <button :style="{
        background: theme.accent, color:'#fff', border:'none',
        borderRadius:'6px', padding:'6px 14px', cursor:'pointer', fontWeight:'600',
      }">Themed Button</button>
    </div>
  \`,
};

createApp({
  components: { ThemeCard },
  setup() {
    const current = Vue.ref('light');
    provide('theme', activeTheme);

    function setTheme(key) {
      current.value = key;
      Object.assign(activeTheme, themes[key]);
    }

    return { current, themes, activeTheme, setTheme };
  },
  template: \`
    <div :style="{ background: activeTheme.bg, minHeight:'100%', padding:'16px', transition:'all 0.3s', borderRadius:'8px' }">
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
        <button
          v-for="(t, key) in themes" :key="key"
          @click="setTheme(key)"
          :style="{
            padding:'5px 14px', borderRadius:'16px', fontSize:'12px', fontWeight:'600',
            background: current === key ? activeTheme.accent : 'transparent',
            color: current === key ? '#fff' : activeTheme.text,
            border: '1px solid ' + (current === key ? activeTheme.accent : activeTheme.border),
            cursor:'pointer', transition:'all 0.2s',
          }">
          {{ t.name }}
        </button>
      </div>
      <ThemeCard title="Primary Card" body="This card reads the theme from provide/inject — no props needed." />
      <ThemeCard title="Secondary Card" body="Both cards respond instantly to theme changes via reactivity." />
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'Why use provide/inject for the theme instead of passing it as a prop?',
      options: ['Provide/inject makes data available to any descendant without threading props through every layer', 'Provide/inject is faster than props for primitive values', 'Props cannot pass reactive objects in Vue 3', 'Provide/inject is the only way to share computed properties'],
      correct: 0,
    },
  },

  {
    id: 'mini-form-wizard',
    chapter: 'Mini-Projects',
    title: 'Multi-step Form Wizard',
    concept: `A **multi-step form** with per-step validation, progress indicator, and animated step transitions. Each step validates before advancing — a common pattern for onboarding flows and checkout forms.

One \`step\` index controls which panel is visible; \`v-if\` on each panel keeps the logic clean.`,
    code: `createApp({
  data() {
    return {
      step: 0,
      errors: {},
      submitted: false,
      form: {
        firstName:'', lastName:'', email:'',
        plan:'free',
        card:'', expiry:'', cvv:'',
      },
    };
  },
  computed: {
    steps() {
      return [
        { title:'Account', icon:'👤' },
        { title:'Plan',    icon:'📦' },
        { title:'Payment', icon:'💳' },
        { title:'Review',  icon:'✅' },
      ];
    },
    isLastStep() { return this.step === this.steps.length - 1; },
  },
  methods: {
    validate() {
      this.errors = {};
      if (this.step === 0) {
        if (!this.form.firstName.trim()) this.errors.firstName = 'Required';
        if (!this.form.lastName.trim())  this.errors.lastName  = 'Required';
        if (!this.form.email.includes('@')) this.errors.email = 'Invalid email';
      }
      if (this.step === 2 && this.form.plan === 'pro') {
        if (this.form.card.length < 4)  this.errors.card   = 'Enter card number';
        if (!this.form.expiry)          this.errors.expiry = 'Required';
        if (this.form.cvv.length < 3)   this.errors.cvv    = 'Enter CVV';
      }
      return Object.keys(this.errors).length === 0;
    },
    next()   { if (this.validate()) this.step = Math.min(this.step + 1, this.steps.length - 1); },
    back()   { this.step = Math.max(this.step - 1, 0); this.errors = {}; },
    submit() { if (this.validate()) this.submitted = true; },
    restart() {
      this.submitted = false; this.step = 0; this.errors = {};
      this.form = { firstName:'',lastName:'',email:'',plan:'free',card:'',expiry:'',cvv:'' };
    },
  },
  template: \`
    <div style="max-width:380px">
      <div v-if="!submitted">

        <!-- Step indicator -->
        <div style="display:flex;margin-bottom:20px">
          <div v-for="(s, i) in steps" :key="i" style="flex:1;text-align:center">
            <div :style="{
              width:'28px',height:'28px',borderRadius:'50%',margin:'0 auto 4px',
              display:'flex',alignItems:'center',justifyContent:'center',
              background: i < step ? '#22c55e' : i === step ? '#6366f1' : '#e5e7eb',
              color: i <= step ? '#fff' : '#9ca3af',
              fontSize:'12px',fontWeight:'700',transition:'background 0.3s',
            }">{{ i < step ? '✓' : i + 1 }}</div>
            <div style="font-size:10px"
              :style="{ color: i === step ? '#6366f1' : '#9ca3af', fontWeight: i === step ? '600' : '400' }">
              {{ s.title }}
            </div>
          </div>
        </div>

        <!-- Step 0: Account -->
        <div v-if="step === 0" style="display:flex;flex-direction:column;gap:8px">
          <div>
            <input v-model="form.firstName" placeholder="First name" style="width:100%" />
            <span v-if="errors.firstName" style="color:red;font-size:11px">{{ errors.firstName }}</span>
          </div>
          <div>
            <input v-model="form.lastName" placeholder="Last name" style="width:100%" />
            <span v-if="errors.lastName" style="color:red;font-size:11px">{{ errors.lastName }}</span>
          </div>
          <div>
            <input v-model="form.email" type="email" placeholder="Email" style="width:100%" />
            <span v-if="errors.email" style="color:red;font-size:11px">{{ errors.email }}</span>
          </div>
        </div>

        <!-- Step 1: Plan -->
        <div v-if="step === 1" style="display:flex;flex-direction:column;gap:8px">
          <label v-for="p in [
            {id:'free', label:'Free',  price:'$0/mo',  desc:'Up to 3 projects'},
            {id:'pro',  label:'Pro',   price:'$9/mo',  desc:'Unlimited + priority support'}
          ]" :key="p.id"
            :style="{
              display:'flex', alignItems:'center', gap:10, padding:'12px',
              border:'1px solid', borderColor: form.plan===p.id ? '#6366f1' : '#e5e7eb',
              borderRadius:'8px', cursor:'pointer',
              background: form.plan===p.id ? '#ede9fe' : '#fff',
            }">
            <input type="radio" v-model="form.plan" :value="p.id" />
            <div>
              <strong :style="{ color: form.plan===p.id ? '#6366f1' : 'inherit' }">
                {{ p.label }}
              </strong> — {{ p.price }}
              <div style="font-size:12px;color:#6b7280">{{ p.desc }}</div>
            </div>
          </label>
        </div>

        <!-- Step 2: Payment -->
        <div v-if="step === 2">
          <div v-if="form.plan === 'free'"
            style="padding:16px;background:#f0fdf4;border-radius:8px;text-align:center;color:#16a34a">
            ✓ No payment needed for the Free plan!
          </div>
          <div v-else style="display:flex;flex-direction:column;gap:8px">
            <div>
              <input v-model="form.card" placeholder="Card number (test: 4242…)" style="width:100%" />
              <span v-if="errors.card" style="color:red;font-size:11px">{{ errors.card }}</span>
            </div>
            <div style="display:flex;gap:8px">
              <div style="flex:1">
                <input v-model="form.expiry" placeholder="MM/YY" style="width:100%" />
                <span v-if="errors.expiry" style="color:red;font-size:11px">{{ errors.expiry }}</span>
              </div>
              <div style="flex:1">
                <input v-model="form.cvv" placeholder="CVV" style="width:100%" maxlength="4" />
                <span v-if="errors.cvv" style="color:red;font-size:11px">{{ errors.cvv }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Review -->
        <div v-if="step === 3"
          style="padding:12px 16px;background:#f8fafc;border-radius:8px;font-size:13px;line-height:1.8">
          <p><strong>Name:</strong> {{ form.firstName }} {{ form.lastName }}</p>
          <p><strong>Email:</strong> {{ form.email }}</p>
          <p><strong>Plan:</strong> {{ form.plan === 'pro' ? 'Pro — $9/mo' : 'Free — $0/mo' }}</p>
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:16px">
          <button @click="back" :disabled="step === 0"
            style="background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;border-radius:6px;padding:8px 16px">
            Back
          </button>
          <button v-if="!isLastStep" @click="next"
            style="background:#6366f1;color:#fff;border:none;border-radius:6px;padding:8px 16px">
            Next →
          </button>
          <button v-else @click="submit"
            style="background:#22c55e;color:#fff;border:none;border-radius:6px;padding:8px 16px">
            Submit ✓
          </button>
        </div>
      </div>

      <!-- Success screen -->
      <div v-else style="text-align:center;padding:24px">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h3 style="margin:0 0 8px">You're all set, {{ form.firstName }}!</h3>
        <p style="color:#6b7280;margin:0 0 16px">
          Welcome to the {{ form.plan === 'pro' ? 'Pro' : 'Free' }} plan.
        </p>
        <button @click="restart"
          style="background:#6366f1;color:#fff;border:none;border-radius:6px;padding:8px 18px">
          Start Over
        </button>
      </div>
    </div>
  \`,
}).mount('#app');`,
    challenge: {
      question: 'What controls which step panel is visible in the wizard?',
      options: ['A single step index with v-if on each panel', 'Dynamic components with <component :is>', 'Vue Router with nested routes', 'CSS visibility toggled by a class binding'],
      correct: 0,
    },
  },
];
