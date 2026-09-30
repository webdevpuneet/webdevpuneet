export const LESSONS = [

  // ── JSX Basics ──────────────────────────────────────────────────
  {
    id: 'jsx-hello',
    chapter: 'JSX Basics',
    title: 'Hello JSX',
    type: 'live',
    concept: 'JSX lets you write HTML-like markup inside JavaScript. React transforms it into function calls that create DOM elements. Every component must return a single root element, and HTML attributes use camelCase names like `className` instead of `class`.',
    code: `function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is JSX — JavaScript + XML syntax.</p>
      <p>It compiles to <code>React.createElement()</code> calls.</p>
    </div>
  );
}`,
  },
  {
    id: 'jsx-expressions',
    chapter: 'JSX Basics',
    title: 'Expressions in JSX',
    type: 'picker',
    concept: 'Curly braces `{}` let you embed any JavaScript expression inside JSX — variables, calculations, function calls, ternary operators. Anything that evaluates to a value can go inside `{}`.',
    challenge: {
      question: 'Which of these can be placed inside JSX { }?',
      options: ['A for loop', 'An if statement', 'A ternary expression', 'A variable declaration'],
      correct: 2,
    },
    options: [
      {
        label: 'Variable',
        code: `function App() {
  const name = 'React';
  const version = 18;
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Version: {version}</p>
      <p>Year: {new Date().getFullYear()}</p>
    </div>
  );
}`,
      },
      {
        label: 'Calculation',
        code: `function App() {
  const price = 9.99;
  const qty = 3;
  const discount = 0.1;
  const total = price * qty * (1 - discount);
  return (
    <div>
      <p>Price: $\{price}</p>
      <p>Quantity: {qty}</p>
      <p>Discount: {discount * 100}%</p>
      <p><strong>Total: $\{total.toFixed(2)}</strong></p>
    </div>
  );
}`,
      },
      {
        label: 'Ternary',
        code: `function App() {
  const isLoggedIn = true;
  const score = 87;
  const items = ['apple', 'banana'];
  return (
    <div>
      <p>{isLoggedIn ? '✅ Logged in' : '❌ Logged out'}</p>
      <p>Grade: {score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'}</p>
      <p>{items.length} item{items.length !== 1 ? 's' : ''} in cart</p>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: 'jsx-attributes',
    chapter: 'JSX Basics',
    title: 'JSX Attributes',
    type: 'picker',
    concept: 'JSX attributes look like HTML but use camelCase. Use `className` instead of `class`, `htmlFor` instead of `for`. The `style` prop takes a JavaScript object with camelCase property names.',
    options: [
      {
        label: 'className',
        code: `function App() {
  return (
    <div>
      <p
        className="highlight"
        style={{ background: '#fef9c3', padding: '8px 12px', borderRadius: 6 }}
      >
        Use <code>className</code> — not <code>class</code> — in JSX.
      </p>
      <p style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
        HTML: class="x" → JSX: className="x"
      </p>
    </div>
  );
}`,
      },
      {
        label: 'inline style',
        code: `function App() {
  const card = {
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    maxWidth: 280,
  };
  return (
    <div style={card}>
      <h3 style={{ margin: '0 0 8px', color: '#1d4ed8' }}>
        Inline Styles
      </h3>
      <p style={{ margin: 0, color: '#4b5563', fontSize: 14 }}>
        Pass an object with camelCase properties.
        No hyphens — use <code>borderRadius</code> not <code>border-radius</code>.
      </p>
    </div>
  );
}`,
      },
      {
        label: 'htmlFor',
        code: `function App() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 220 }}>
      <div>
        <label
          htmlFor="email"
          style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 4 }}
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          style={{ padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 5, width: '100%' }}
        />
      </div>
    </form>
  );
}`,
      },
    ],
  },
  {
    id: 'jsx-fragments',
    chapter: 'JSX Basics',
    title: 'Fragments',
    type: 'picker',
    concept: 'React components must return a single root element. Wrapping in an extra `<div>` adds unnecessary DOM nodes. Use a Fragment `<>...</>` to group elements without any wrapper in the DOM.',
    options: [
      {
        label: 'Extra <div>',
        code: `function App() {
  // Extra <div> wrapper added to DOM
  return (
    <div>
      <h2>Title</h2>
      <p>Paragraph one.</p>
      <p>Paragraph two.</p>
    </div>
  );
}`,
        note: 'Adds an unnecessary <div> to the DOM',
      },
      {
        label: 'Fragment <>',
        code: `function App() {
  // No wrapper element — clean DOM
  return (
    <>
      <h2>Title</h2>
      <p>Paragraph one.</p>
      <p>Paragraph two.</p>
    </>
  );
}`,
        note: 'No wrapper node — keeps the DOM clean',
      },
    ],
  },

  // ── Components ──────────────────────────────────────────────────
  {
    id: 'components-function',
    chapter: 'Components',
    title: 'Function Components',
    type: 'live',
    concept: 'A React component is a JavaScript function that returns JSX. Component names must start with a capital letter — React uses this to distinguish components from plain HTML tags. Compose UIs by nesting components inside each other.',
    code: `function Greeting() {
  return <h2 style={{ color: '#1d4ed8' }}>Hello from Greeting!</h2>;
}

function Description() {
  return (
    <p style={{ color: '#4b5563' }}>
      Each component manages its own piece of UI.
      Small, focused components are easier to test and reuse.
    </p>
  );
}

function App() {
  return (
    <div>
      <Greeting />
      <Description />
    </div>
  );
}`,
  },
  {
    id: 'components-composing',
    chapter: 'Components',
    title: 'Composing Components',
    type: 'live',
    concept: 'Build complex UIs by combining small, focused components. Each one does one thing well — the parent assembles them into the final layout. This is the core mental model of React.',
    code: `function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: '#6366f1', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 14, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function UserCard({ name, role }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', border: '1px solid #e5e7eb',
      borderRadius: 8, marginBottom: 8,
    }}>
      <Avatar name={name} />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ color: '#6b7280', fontSize: 13 }}>{role}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard name="Alice Johnson" role="Frontend Engineer" />
      <UserCard name="Bob Smith" role="Product Designer" />
      <UserCard name="Carol White" role="Backend Engineer" />
    </div>
  );
}`,
  },

  // ── Props ───────────────────────────────────────────────────────
  {
    id: 'props-basic',
    chapter: 'Props',
    title: 'Passing Props',
    type: 'live',
    concept: 'Props (properties) are how you pass data from a parent component to a child. The child receives them as a single `props` object. Props are read-only — the child should never modify them.',
    code: `function Badge({ text, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      background: color + '22',
      color: color,
      border: '1px solid ' + color + '55',
    }}>
      {text}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge text="React" color="#61dafb" />
      <Badge text="JavaScript" color="#ca8a04" />
      <Badge text="TypeScript" color="#3178c6" />
      <Badge text="CSS" color="#7c3aed" />
    </div>
  );
}`,
  },
  {
    id: 'props-children',
    chapter: 'Props',
    title: 'Children Prop',
    type: 'live',
    concept: 'Whatever you put between a component\'s opening and closing tags becomes `props.children`. This lets you build layout components (cards, modals, panels) that don\'t need to know what they\'ll contain.',
    code: `function Card({ title, children }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: 8,
      padding: 16, marginBottom: 12, maxWidth: 300,
    }}>
      {title && (
        <h3 style={{ margin: '0 0 10px', fontSize: 15 }}>{title}</h3>
      )}
      {children}
    </div>
  );
}

function App() {
  return (
    <div>
      <Card title="Getting Started">
        <p style={{ margin: 0, color: '#4b5563', fontSize: 14 }}>
          This content is passed as <code>children</code>.
        </p>
      </Card>

      <Card title="Features">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#4b5563' }}>
          <li>Component reuse</li>
          <li>Flexible content slots</li>
          <li>Clean composition</li>
        </ul>
      </Card>

      <Card>
        <em style={{ color: '#9ca3af', fontSize: 14 }}>
          No title prop — just children.
        </em>
      </Card>
    </div>
  );
}`,
  },
  {
    id: 'props-destructuring',
    chapter: 'Props',
    title: 'Destructuring & Defaults',
    type: 'picker',
    concept: 'Destructure props directly in the function parameter instead of writing `props.name` everywhere. You can set default values inline with `=`. Boolean props can be written as just the name (which equals `true`).',
    options: [
      {
        label: 'props object',
        code: `function Button(props) {
  return (
    <button
      onClick={props.onClick}
      style={{
        padding: '8px 18px',
        background: props.primary ? '#6366f1' : '#f3f4f6',
        color: props.primary ? '#fff' : '#111',
        border: 'none', borderRadius: 6, cursor: 'pointer',
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      {props.label}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button label="Cancel" onClick={() => alert('Cancel')} />
      <Button label="Confirm" primary={true} onClick={() => alert('Confirm')} />
    </div>
  );
}`,
        note: 'Verbose — repeating props. every time',
      },
      {
        label: 'destructured',
        code: `function Button({ label, primary = false, disabled = false, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 18px',
        background: primary ? '#6366f1' : '#f3f4f6',
        color: primary ? '#fff' : '#111',
        border: 'none', borderRadius: 6, cursor: 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button label="Cancel" onClick={() => alert('Cancel')} />
      <Button label="Confirm" primary onClick={() => alert('Confirm')} />
      <Button label="Disabled" primary disabled />
    </div>
  );
}`,
        note: 'Cleaner — defaults in the parameter, boolean shorthand',
      },
    ],
  },

  // ── State ───────────────────────────────────────────────────────
  {
    id: 'state-usestate',
    chapter: 'State',
    title: 'useState Hook',
    type: 'live',
    challenge: {
      question: 'Why write setCount(c => c + 1) instead of setCount(count + 1)?',
      options: ['It is faster', 'It guarantees the latest value when updates are batched', 'It creates a new state variable', 'There is no difference'],
      correct: 1,
    },
    concept: '`useState` adds state to a function component. It returns an array: the current value and a setter function. Calling the setter with a new value triggers a re-render. Use the function form `setCount(c => c + 1)` when the new value depends on the previous one.',
    code: `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <div style={{ fontSize: 72, fontWeight: 700, color: '#6366f1', lineHeight: 1 }}>
        {count}
      </div>
      <p style={{ color: '#6b7280', margin: '8px 0 24px' }}>clicks</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button
          onClick={() => setCount(c => c - 1)}
          style={{ padding: '8px 22px', fontSize: 22, border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer', background: '#fff' }}
        >−</button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: '8px 14px', fontSize: 13, border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer', background: '#fff', color: '#6b7280' }}
        >Reset</button>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '8px 22px', fontSize: 22, border: 'none', borderRadius: 8, cursor: 'pointer', background: '#6366f1', color: '#fff' }}
        >+</button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'state-text',
    chapter: 'State',
    title: 'State with Strings',
    type: 'live',
    concept: 'State can hold any value — strings, numbers, booleans, arrays, objects. Tying an input\'s value to state (and updating state on every keystroke) is called a controlled input. React owns the value at all times.',
    code: `function App() {
  const [name, setName] = useState('');

  const words = name.trim() ? name.trim().split(/\s+/).length : 0;
  const chars = name.length;

  return (
    <div style={{ maxWidth: 320 }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
        Your name
      </label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type something…"
        style={{
          width: '100%', padding: '9px 12px',
          border: '1px solid #d1d5db', borderRadius: 6,
          fontSize: 14,
        }}
      />
      <div style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 16px', textAlign: 'right' }}>
        {chars} chars · {words} word{words !== 1 ? 's' : ''}
      </div>
      <div style={{ padding: 14, background: '#f9fafb', borderRadius: 8, fontSize: 14 }}>
        {name
          ? <><strong>Hello, {name}!</strong> 👋</>
          : <span style={{ color: '#9ca3af' }}>Start typing above…</span>
        }
      </div>
    </div>
  );
}`,
  },
  {
    id: 'state-objects',
    chapter: 'State',
    title: 'Object State',
    type: 'live',
    concept: 'When state is an object, always spread the previous state when updating one field — React needs a new object reference to detect the change. Never mutate state directly.',
    code: `function App() {
  const [user, setUser] = useState({ name: '', email: '', role: 'viewer' });

  const update = (field, value) =>
    setUser(prev => ({ ...prev, [field]: value }));

  const inp = {
    width: '100%', padding: '7px 10px',
    border: '1px solid #d1d5db', borderRadius: 5, fontSize: 13,
  };

  return (
    <div style={{ maxWidth: 280 }}>
      <h3 style={{ margin: '0 0 14px' }}>Edit Profile</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 3 }}>Name</label>
          <input value={user.name} onChange={e => update('name', e.target.value)} placeholder="Your name" style={inp} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 3 }}>Email</label>
          <input value={user.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" style={inp} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 3 }}>Role</label>
          <select value={user.role} onChange={e => update('role', e.target.value)} style={inp}>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <pre style={{ background: '#f9fafb', padding: 10, borderRadius: 6, fontSize: 12, margin: 0 }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}`,
  },

  // ── Events ──────────────────────────────────────────────────────
  {
    id: 'events-click',
    chapter: 'Events',
    title: 'Click Events',
    type: 'live',
    concept: 'React uses camelCase event names: `onClick`, `onMouseEnter`, `onFocus`, `onDoubleClick`. You pass a function reference — not a string. Arrow functions let you pass arguments to the handler.',
    code: `function App() {
  const [log, setLog] = useState([]);

  const addLog = msg =>
    setLog(prev => [
      { id: Date.now(), msg, time: new Date().toLocaleTimeString() },
      ...prev,
    ].slice(0, 6));

  const btn = (bg, text, props) => (
    <button
      style={{ padding: '8px 14px', background: bg, color: text, border: '1px solid #e5e7eb', borderRadius: 6, cursor: 'pointer' }}
      {...props}
    />
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {btn('#6366f1', '#fff', { onClick: () => addLog('Click'), children: 'Click' })}
        {btn('#fff', '#111', { onDoubleClick: () => addLog('Double-click!'), children: 'Double-click' })}
        {btn('#fef9c3', '#111', { onMouseEnter: () => addLog('Mouse entered'), children: 'Hover' })}
      </div>
      <div style={{ fontSize: 13 }}>
        {log.length === 0
          ? <span style={{ color: '#9ca3af' }}>Interact with buttons above…</span>
          : log.map(e => (
              <div key={e.id} style={{ padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#9ca3af', marginRight: 8 }}>{e.time}</span>{e.msg}
              </div>
            ))
        }
      </div>
    </div>
  );
}`,
  },
  {
    id: 'events-form',
    chapter: 'Events',
    title: 'Form Handling',
    type: 'live',
    concept: 'Handle forms with `onSubmit` on the `<form>` element. Always call `e.preventDefault()` to stop the page from reloading. Read submitted values from state, not the DOM.',
    code: `function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(form);
    setForm({ name: '', email: '' });
  };

  const inp = {
    padding: '8px 12px', border: '1px solid #d1d5db',
    borderRadius: 6, fontSize: 14, width: '100%',
  };

  return (
    <div style={{ maxWidth: 300 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Name</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" required style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Email</label>
          <input value={form.email} onChange={e => set('email', e.target.value)} type="email" placeholder="you@example.com" required style={inp} />
        </div>
        <button type="submit" style={{ padding: 9, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
          Submit →
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: 14, padding: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 13 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>✅ Submitted!</div>
          <div>Name: {submitted.name}</div>
          <div>Email: {submitted.email}</div>
        </div>
      )}
    </div>
  );
}`,
  },

  // ── Forms ───────────────────────────────────────────────────────
  {
    id: 'forms-controlled',
    chapter: 'Forms',
    title: 'Controlled inputs',
    type: 'live',
    concept: 'A **controlled input** is one where React state is the single source of truth. The `value` prop is bound to state and `onChange` updates it. This gives you full control — you can validate, transform, or block characters on every keystroke.',
    challenge: {
      question: 'What makes an input "controlled" in React?',
      options: ['Using a ref instead of state', 'Binding value to state and updating it via onChange', 'Adding the controlled attribute', 'Wrapping it in a form tag'],
      correct: 1,
    },
    code: `function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(null);

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  const fieldStyle = {
    display: 'block', width: '100%', padding: '7px 10px',
    border: '1px solid #d1d5db', borderRadius: 6,
    fontSize: 13, marginBottom: 10, boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: 300 }}>
      {submitted ? (
        <div style={{ padding: 14, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 4 }}>Submitted!</div>
          <div>Name: {submitted.name}</div>
          <div>Email: {submitted.email}</div>
          <button onClick={() => setSubmitted(null)}
            style={{ marginTop: 10, fontSize: 12, cursor: 'pointer', border: 'none', background: 'none', color: '#6366f1', textDecoration: 'underline' }}>
            Reset
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input style={fieldStyle} placeholder="Name" value={form.name} onChange={set('name')} />
          <input style={fieldStyle} placeholder="Email" type="email" value={form.email} onChange={set('email')} />
          <button type="submit"
            disabled={!form.name || !form.email}
            style={{ padding: '7px 18px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: (!form.name || !form.email) ? 0.5 : 1 }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

function App() { return <SignupForm />; }`,
  },
  {
    id: 'forms-uncontrolled',
    chapter: 'Forms',
    title: 'Uncontrolled inputs & useRef',
    type: 'live',
    concept: 'An **uncontrolled input** stores its own value in the DOM. You read the value with a `ref` only when you need it — at submit time. Useful for file inputs, large forms where re-rendering on every keystroke is expensive, or integrating with non-React libraries.',
    code: `function SearchForm() {
  const inputRef = useRef(null);
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read value from DOM directly via ref
    setResult(inputRef.current.value);
  };

  return (
    <div style={{ maxWidth: 300 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 6 }}>
        <input
          ref={inputRef}
          placeholder="Search..."
          defaultValue=""
          style={{ flex: 1, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
        />
        <button type="submit"
          style={{ padding: '7px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Go
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 12, padding: 10, background: '#f9fafb', borderRadius: 6, fontSize: 13 }}>
          Searching for: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

function App() { return <SearchForm />; }`,
  },

  // ── Lists & Conditionals ────────────────────────────────────────
  {
    id: 'lists-map',
    chapter: 'Lists & Conditionals',
    title: 'Rendering Lists',
    type: 'live',
    challenge: {
      question: 'What should the key prop be?',
      options: ['The array index — always fine', 'Math.random() for uniqueness', 'A stable, unique ID from your data', 'The item\'s array position'],
      correct: 2,
    },
    concept: 'Use `.map()` to render arrays of elements. Each item needs a unique `key` prop so React can track which items changed, added, or removed. Keys should be stable IDs — not array indices.',
    code: `const tasks = [
  { id: 1, text: 'Design the component', done: true },
  { id: 2, text: 'Write the tests', done: true },
  { id: 3, text: 'Review pull request', done: false },
  { id: 4, text: 'Deploy to production', done: false },
];

function Task({ text, done }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 0', borderBottom: '1px solid #f3f4f6',
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        background: done ? '#10b981' : '#e5e7eb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: '#fff',
      }}>{done ? '✓' : ''}</span>
      <span style={{ textDecoration: done ? 'line-through' : 'none', color: done ? '#9ca3af' : '#111' }}>
        {text}
      </span>
    </li>
  );
}

function App() {
  const done = tasks.filter(t => t.done).length;
  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <strong>Tasks</strong>
        <span style={{ fontSize: 13, color: '#6b7280' }}>{done}/{tasks.length} done</span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {tasks.map(task => <Task key={task.id} {...task} />)}
      </ul>
    </div>
  );
}`,
  },
  {
    id: 'lists-conditional',
    chapter: 'Lists & Conditionals',
    title: 'Conditional Rendering',
    type: 'picker',
    concept: 'Three patterns for showing elements conditionally: an `if` statement before the return, the `&&` short-circuit for show/hide, and the ternary `? :` for choosing between two options.',
    options: [
      {
        label: 'if / return',
        code: `function StatusBanner({ status }) {
  if (status === 'loading') {
    return <div style={{ padding: 12, background: '#f3f4f6', borderRadius: 6, color: '#6b7280' }}>⏳ Loading…</div>;
  }
  if (status === 'error') {
    return <div style={{ padding: 12, background: '#fef2f2', borderRadius: 6, color: '#dc2626' }}>❌ Something went wrong</div>;
  }
  return <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 6, color: '#16a34a' }}>✅ Data loaded!</div>;
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatusBanner status="loading" />
      <StatusBanner status="error" />
      <StatusBanner status="success" />
    </div>
  );
}`,
        note: 'Best for multiple conditions',
      },
      {
        label: '&& operator',
        code: `function App() {
  const [showTip, setShowTip] = useState(true);
  const errors = ['Email is required', 'Password too short'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {showTip && (
        <div style={{ padding: '10px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
          💡 Use && to show or hide a block.
          <button onClick={() => setShowTip(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60a5fa' }}>✕</button>
        </div>
      )}
      {errors.length > 0 && (
        <ul style={{ margin: 0, padding: '10px 10px 10px 24px', background: '#fef2f2', borderRadius: 6, color: '#dc2626', fontSize: 13 }}>
          {errors.map(e => <li key={e}>{e}</li>)}
        </ul>
      )}
    </div>
  );
}`,
        note: 'Best for show/hide one block',
      },
      {
        label: 'ternary ? :',
        code: `function App() {
  const [isOn, setIsOn] = useState(false);
  const [tab, setTab] = useState('preview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button
        onClick={() => setIsOn(o => !o)}
        style={{ padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', background: isOn ? '#10b981' : '#e5e7eb', color: isOn ? '#fff' : '#6b7280', fontWeight: 600, width: 80 }}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>

      <div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {['preview', 'code'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '4px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', background: tab === t ? '#6366f1' : '#f3f4f6', color: tab === t ? '#fff' : '#374151', fontSize: 13 }}>
              {t}
            </button>
          ))}
        </div>
        {tab === 'preview'
          ? <div style={{ padding: 12, background: '#f9fafb', borderRadius: 6, fontSize: 13 }}>👁 Preview mode</div>
          : <div style={{ padding: 12, background: '#1e1e2e', borderRadius: 6, fontSize: 13, color: '#cdd6f4', fontFamily: 'monospace' }}>{'<App />'}</div>
        }
      </div>
    </div>
  );
}`,
        note: 'Best for choosing between two options',
      },
    ],
  },
  {
    id: 'lists-dynamic',
    chapter: 'Lists & Conditionals',
    title: 'Dynamic Lists',
    type: 'live',
    concept: 'Real lists are usually dynamic — items added, removed, toggled. State holds the array. Use `.filter()` to remove, spread `[...prev, item]` to add. Never push to state arrays directly.',
    code: `function App() {
  const [items, setItems] = useState(['Buy groceries', 'Walk the dog', 'Read for 30 mins']);
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    setItems(prev => [...prev, input.trim()]);
    setInput('');
  };

  const remove = idx =>
    setItems(prev => prev.filter((_, i) => i !== idx));

  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add item… (Enter to add)"
          style={{ flex: 1, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }}
        />
        <button onClick={add}
          style={{ padding: '7px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Add
        </button>
      </div>

      {items.length === 0
        ? <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No items yet. Add one above!</p>
        : <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: 14 }}>{item}</span>
                <button onClick={() => remove(idx)}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 18, padding: '0 4px', lineHeight: 1 }}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
      }
      {items.length > 0 && (
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, textAlign: 'right' }}>
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}`,
  },
  {
    id: 'keys-deep-dive',
    chapter: 'Lists & Conditionals',
    title: 'Keys & reconciliation',
    type: 'picker',
    concept: '`key` tells React which items in a list correspond between renders. A **stable unique key** lets React reuse DOM nodes efficiently. An **unstable key** (like array index) causes React to remount components on every reorder, resetting all their state. Keys must be unique among siblings — not globally.',
    challenge: {
      question: 'What happens when you use array index as a key and the list is reordered?',
      options: ['Nothing — index is always the best key', 'React remounts components at those indices, resetting their state', 'React throws an error', 'Performance improves'],
      correct: 1,
    },
    options: [
      {
        label: 'Stable key (ID)',
        note: 'Input state is preserved when items reorder',
        code: `function App() {
  const [items, setItems] = useState([
    { id: 'a', label: 'Item A' },
    { id: 'b', label: 'Item B' },
    { id: 'c', label: 'Item C' },
  ]);

  const shuffle = () =>
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));

  return (
    <div style={{ maxWidth: 280 }}>
      <button onClick={shuffle}
        style={{ marginBottom: 12, padding: '6px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
        Shuffle — type in a box first!
      </button>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 13, width: 60 }}>{item.label}</span>
          <input placeholder="type here" style={{ flex: 1, padding: '5px 8px', border: '1px solid #d1d5db', borderRadius: 5, fontSize: 13 }} />
        </div>
      ))}
      <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
        ✓ Stable key: input text stays with its item after shuffle
      </p>
    </div>
  );
}`,
      },
      {
        label: 'Index key (bad)',
        note: 'Input state resets on shuffle — text moves to wrong item',
        code: `function App() {
  const [items, setItems] = useState([
    { id: 'a', label: 'Item A' },
    { id: 'b', label: 'Item B' },
    { id: 'c', label: 'Item C' },
  ]);

  const shuffle = () =>
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));

  return (
    <div style={{ maxWidth: 280 }}>
      <button onClick={shuffle}
        style={{ marginBottom: 12, padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
        Shuffle — type in a box first!
      </button>
      {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 13, width: 60 }}>{item.label}</span>
          <input placeholder="type here" style={{ flex: 1, padding: '5px 8px', border: '1px solid #fca5a5', borderRadius: 5, fontSize: 13 }} />
        </div>
      ))}
      <p style={{ fontSize: 11, color: '#ef4444', marginTop: 8 }}>
        ✗ Index key: input resets and text appears in wrong slot after shuffle
      </p>
    </div>
  );
}`,
      },
    ],
  },

  // ── Hooks ───────────────────────────────────────────────────────
  {
    id: 'hooks-useeffect',
    chapter: 'Hooks',
    title: 'useEffect',
    type: 'live',
    challenge: {
      question: 'A useEffect with [] dependency array runs...',
      options: ['On every render', 'Never', 'Once after the first render only', 'Only when props change'],
      correct: 2,
    },
    concept: '`useEffect` runs side effects after render. The dependency array controls when it runs: `[]` = once on mount; `[val]` = when val changes; omitted = every render. Return a cleanup function to cancel subscriptions or timers on unmount.',
    code: `function App() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // Update document title when count changes
  useEffect(() => {
    document.title = count > 0 ? \`Count: \${count}\` : 'React Playground';
  }, [count]);

  // Start/stop a timer — demonstrates cleanup
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // cleanup on unmount or when running changes
  }, [running]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ padding: 12, background: '#f9fafb', borderRadius: 6, fontSize: 13 }}>
        <div style={{ color: '#6b7280', marginBottom: 6 }}>Count (watch the browser tab title)</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <strong style={{ fontSize: 22, minWidth: 32 }}>{count}</strong>
          <button onClick={() => setCount(c => c + 1)}
            style={{ padding: '6px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            +1
          </button>
          <button onClick={() => setCount(0)}
            style={{ padding: '6px 10px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, cursor: 'pointer', fontSize: 12, color: '#6b7280' }}>
            reset
          </button>
        </div>
      </div>

      <div style={{ padding: 12, background: '#f9fafb', borderRadius: 6, fontSize: 13 }}>
        <div style={{ color: '#6b7280', marginBottom: 6 }}>Timer with cleanup</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <strong style={{ fontSize: 22, minWidth: 32 }}>{seconds}s</strong>
          <button onClick={() => setRunning(r => !r)}
            style={{ padding: '6px 14px', background: running ? '#ef4444' : '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            {running ? 'Stop' : 'Start'}
          </button>
          <button onClick={() => { setRunning(false); setSeconds(0); }}
            style={{ padding: '6px 10px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, cursor: 'pointer', fontSize: 12, color: '#6b7280' }}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'hooks-useref',
    chapter: 'Hooks',
    title: 'useRef',
    type: 'live',
    concept: '`useRef` returns a mutable object whose `.current` persists across renders without causing re-renders. Primary uses: accessing a DOM node directly (focus, measure, scroll) or storing a value that shouldn\'t trigger updates.',
    code: `function App() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [, forceRender] = useState(0);

  // This increments on every render, not just when we call forceRender
  renderCount.current += 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
          DOM ref — direct focus control
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            ref={inputRef}
            placeholder="Click the button to focus me"
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }}
          />
          <button
            onClick={() => inputRef.current?.focus()}
            style={{ padding: '8px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Focus
          </button>
        </div>
      </div>

      <div style={{ padding: 12, background: '#f9fafb', borderRadius: 6, fontSize: 13 }}>
        <div style={{ color: '#6b7280', marginBottom: 8 }}>
          Value ref — stores data without triggering re-renders
        </div>
        <p style={{ margin: '0 0 10px' }}>
          Render count: <strong>{renderCount.current}</strong>
          <span style={{ color: '#9ca3af', fontSize: 12, marginLeft: 8 }}>
            (useRef, not state — no extra render)
          </span>
        </p>
        <button
          onClick={() => forceRender(n => n + 1)}
          style={{ padding: '6px 14px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
        >
          Force re-render
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'hooks-custom',
    chapter: 'Hooks',
    title: 'Custom Hooks',
    type: 'live',
    challenge: {
      question: 'A custom hook must...',
      options: ['Return an array', 'Start its name with "use"', 'Call at least one built-in hook', 'Both B and C'],
      correct: 3,
    },
    concept: 'Custom hooks are functions starting with `use` that call other hooks. They let you extract and share stateful logic between components without changing the component tree — no HOCs, no render props.',
    code: `// Custom hook — reusable counter with step
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  return {
    count,
    increment: () => setCount(c => c + step),
    decrement: () => setCount(c => c - step),
    reset: () => setCount(initial),
  };
}

// Custom hook — localStorage persistence
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? defaultValue; }
    catch { return defaultValue; }
  });
  const set = v => {
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  };
  return [value, set];
}

function App() {
  const a = useCounter(0, 1);
  const b = useCounter(100, 10);
  const [name, setName] = useLocalStorage('rp-name', '');

  const row = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 };
  const mkBtn = bg => ({ padding: '5px 14px', background: bg, color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' });

  return (
    <div>
      <div style={row}>
        <button onClick={a.decrement} style={mkBtn('#6b7280')}>−</button>
        <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 700, fontSize: 18 }}>{a.count}</span>
        <button onClick={a.increment} style={mkBtn('#6366f1')}>+</button>
        <button onClick={a.reset} style={{ ...mkBtn('#e5e7eb'), color: '#374151' }}>reset</button>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>step 1</span>
      </div>
      <div style={row}>
        <button onClick={b.decrement} style={mkBtn('#6b7280')}>−</button>
        <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 700, fontSize: 18 }}>{b.count}</span>
        <button onClick={b.increment} style={mkBtn('#10b981')}>+</button>
        <button onClick={b.reset} style={{ ...mkBtn('#e5e7eb'), color: '#374151' }}>reset</button>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>step 10</span>
      </div>
      <div style={{ marginTop: 6 }}>
        <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
          Persisted name (survives page refresh)
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type — it persists on refresh"
          style={{ padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 5, fontSize: 13, width: '100%' }}
        />
      </div>
    </div>
  );
}`,
  },

  // ── Patterns ────────────────────────────────────────────────────
  {
    id: 'patterns-lifting-state',
    chapter: 'Patterns',
    title: 'Lifting State Up',
    type: 'live',
    concept: 'When two sibling components need to share state, move it up to their nearest common parent. The parent owns the state and passes it down as props. Data always flows down; events flow up.',
    code: `function TemperatureInput({ scale, value, onChange }) {
  const label = scale === 'C' ? '°C Celsius' : '°F Fahrenheit';
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 16, width: 160 }}
      />
    </div>
  );
}

function App() {
  // State lifted to the common parent — single source of truth
  const [celsius, setCelsius] = useState('');

  const toF = c => c === '' ? '' : ((+c * 9 / 5) + 32).toFixed(1);
  const toC = f => f === '' ? '' : (((+f - 32) * 5) / 9).toFixed(1);

  const fahrenheit = toF(celsius);
  const temp = +celsius;

  return (
    <div>
      <TemperatureInput scale="C" value={celsius} onChange={setCelsius} />
      <TemperatureInput scale="F" value={fahrenheit} onChange={f => setCelsius(toC(f))} />

      {celsius !== '' && (
        <div style={{
          marginTop: 4, padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600,
          background: temp > 30 ? '#fef2f2' : temp < 10 ? '#eff6ff' : '#f0fdf4',
          color: temp > 30 ? '#dc2626' : temp < 10 ? '#2563eb' : '#16a34a',
        }}>
          {temp > 30 ? '🥵 Hot' : temp < 10 ? '🥶 Cold' : '😊 Comfortable'}
          {' '}— {celsius}°C / {fahrenheit}°F
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: 'patterns-composition',
    chapter: 'Patterns',
    title: 'Component Composition',
    type: 'live',
    concept: 'Build flexible components using `children` and named prop slots instead of trying to pass everything as individual props. Composition keeps components reusable and avoids deeply nested prop trees.',
    code: `function Modal({ title, footer, onClose, children }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', maxWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
        <strong style={{ fontSize: 15 }}>{title}</strong>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af', lineHeight: 1 }}>
          ✕
        </button>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
      {footer && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(true);

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ padding: '9px 18px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
      Open Modal
    </button>
  );

  return (
    <Modal
      title="Confirm Delete"
      onClose={() => setOpen(false)}
      footer={
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setOpen(false)} style={{ padding: '7px 14px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Cancel
          </button>
          <button style={{ padding: '7px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Delete
          </button>
        </div>
      }
    >
      <p style={{ margin: 0, color: '#4b5563', fontSize: 14, lineHeight: 1.6 }}>
        Are you sure? This action <strong>cannot be undone</strong> and will permanently remove the item from your account.
      </p>
    </Modal>
  );
}`,
  },

  // ── Data & Async ────────────────────────────────────────────────
  {
    id: 'async-data-fetching',
    chapter: 'Data & Async',
    title: 'Data Fetching',
    type: 'live',
    challenge: {
      question: 'Why must you handle the case where the component unmounts during a fetch?',
      options: ['Fetches always fail on unmount', 'Setting state on an unmounted component causes a memory leak warning', 'The browser cancels the request automatically', 'useEffect prevents this automatically'],
      correct: 1,
    },
    concept: 'The standard pattern for data fetching in React: `useEffect` triggers the fetch, state holds `loading`, `data`, and `error`. Always handle the unmount case to avoid setting state on an unmounted component.',
    code: `function Post({ id }) {
  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, data: null, error: null });

    fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setState({ loading: false, data, error: null }); })
      .catch(err => { if (!cancelled) setState({ loading: false, data: null, error: err.message }); });

    return () => { cancelled = true; }; // cleanup prevents stale setState
  }, [id]);

  if (state.loading) return <div style={{ color: '#9ca3af', fontSize: 14 }}>⏳ Loading post {id}…</div>;
  if (state.error)   return <div style={{ color: '#dc2626', fontSize: 14 }}>❌ {state.error}</div>;

  return (
    <div style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{state.data.title}</div>
      <div style={{ color: '#6b7280', lineHeight: 1.6 }}>{state.data.body}</div>
    </div>
  );
}

function App() {
  const [postId, setPostId] = useState(1);
  return (
    <div style={{ maxWidth: 340 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: '#6b7280' }}>Post ID:</span>
        {[1, 2, 3, 5].map(id => (
          <button key={id} onClick={() => setPostId(id)}
            style={{ padding: '4px 10px', border: '1px solid #d1d5db', borderRadius: 99, background: postId === id ? '#6366f1' : '#fff', color: postId === id ? '#fff' : '#374151', cursor: 'pointer', fontSize: 13 }}>
            {id}
          </button>
        ))}
      </div>
      <Post id={postId} />
    </div>
  );
}`,
  },

  // ── Performance ─────────────────────────────────────────────────
  {
    id: 'perf-usememo',
    chapter: 'Performance',
    title: 'useMemo',
    type: 'live',
    challenge: {
      question: 'useMemo re-runs its function when...',
      options: ['Every render', 'Its dependency array values change', 'State anywhere in the app changes', 'The component unmounts'],
      correct: 1,
    },
    concept: '`useMemo` memoizes the result of an expensive calculation so it only recomputes when its dependencies change — not on every render. Use it when a computation is genuinely slow, not as a default.',
    code: `function ExpensiveList({ items, filter }) {
  // Only recomputes when items or filter changes — not on every parent render
  const filtered = useMemo(() => {
    console.log('Filtering...');
    return items.filter(i => i.toLowerCase().includes(filter.toLowerCase()));
  }, [items, filter]);

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {filtered.length === 0
        ? <li style={{ color: '#9ca3af', padding: '8px 0' }}>No results</li>
        : filtered.map(i => (
            <li key={i} style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 14 }}>{i}</li>
          ))
      }
    </ul>
  );
}

function App() {
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);
  const items = ['React', 'Redux', 'Router', 'Remix', 'Next.js', 'Vite', 'Vitest', 'TypeScript'];

  return (
    <div style={{ maxWidth: 280 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter list…"
          style={{ flex: 1, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
        />
        <button onClick={() => setCount(c => c + 1)}
          style={{ padding: '7px 12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Re-render ({count})
        </button>
      </div>
      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
        Check the console — filtering only re-runs when filter changes, not on button clicks.
      </p>
      <ExpensiveList items={items} filter={filter} />
    </div>
  );
}`,
  },
  {
    id: 'perf-usecallback',
    chapter: 'Performance',
    title: 'useCallback',
    type: 'live',
    concept: '`useCallback` returns a memoized version of a function so it has a stable reference across renders. Use it when passing callbacks to memoized child components — otherwise the child re-renders every time because it receives a new function object.',
    code: `const Button = memo(function Button({ label, onClick }) {
  console.log('Button rendered:', label);
  return (
    <button onClick={onClick}
      style={{ padding: '7px 14px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', background: '#fff', fontSize: 13 }}>
      {label}
    </button>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Stable reference — Button won't re-render when 'other' changes
  const increment = useCallback(() => setCount(c => c + 1), []);

  // New function every render — Button always re-renders
  const unstable = () => setOther(c => c + 1);

  return (
    <div>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
        Watch the console when clicking each button.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Button label={\`useCallback (\${count})\`} onClick={increment} />
        <Button label={\`Unstable (\${other})\`} onClick={unstable} />
      </div>
      <button onClick={() => setCount(c => c + 1)}
        style={{ padding: '7px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
        Force re-render
      </button>
    </div>
  );
}`,
  },
  {
    id: 'perf-memo',
    chapter: 'Performance',
    title: 'React.memo',
    type: 'live',
    challenge: {
      question: 'React.memo prevents re-renders when...',
      options: ['State inside the component changes', 'The parent re-renders with the same props', 'useEffect runs', 'The component first mounts'],
      correct: 1,
    },
    concept: '`memo()` wraps a component so it only re-renders when its props actually change. Without it, a child re-renders every time its parent does — even if nothing it uses changed.',
    code: `// Without memo — re-renders every time parent re-renders
function ExpensiveChild({ value }) {
  console.log('ExpensiveChild rendered, value:', value);
  return <div style={{ padding: 10, background: '#f0fdf4', borderRadius: 6, fontSize: 14 }}>Value: <strong>{value}</strong></div>;
}

// With memo — only re-renders when value prop changes
const MemoizedChild = memo(function MemoizedChild({ value }) {
  console.log('MemoizedChild rendered, value:', value);
  return <div style={{ padding: 10, background: '#eff6ff', borderRadius: 6, fontSize: 14 }}>Value: <strong>{value}</strong></div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('hello');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCount(c => c + 1)}
          style={{ padding: '7px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Re-render parent ({count})
        </button>
        <button onClick={() => setValue(v => v === 'hello' ? 'world' : 'hello')}
          style={{ padding: '7px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Change value
        </button>
      </div>
      <p style={{ fontSize: 12, color: '#9ca3af' }}>Watch console — green re-renders every time; blue only when value changes.</p>
      <ExpensiveChild value={value} />
      <MemoizedChild value={value} />
    </div>
  );
}`,
  },

  // ── Advanced Hooks ──────────────────────────────────────────────
  {
    id: 'advanced-usecontext',
    chapter: 'Advanced Hooks',
    title: 'useContext',
    type: 'live',
    challenge: {
      question: 'What problem does useContext solve?',
      options: ['Slow re-renders', 'Prop drilling — passing data through many component layers', 'Async state updates', 'Memory leaks'],
      correct: 1,
    },
    concept: '`createContext` + `useContext` lets any descendant component read shared data without passing props through every level. The Provider wraps the tree and any component inside can consume the value directly.',
    code: `const ThemeContext = createContext('light');

function ThemedCard({ title, children }) {
  const theme = useContext(ThemeContext);
  const dark = theme === 'dark';
  return (
    <div style={{
      padding: 14, borderRadius: 8, marginBottom: 10,
      background: dark ? '#1e1e2e' : '#f9fafb',
      color: dark ? '#cdd6f4' : '#111',
      border: \`1px solid \${dark ? '#313244' : '#e5e7eb'}\`,
    }}>
      <strong style={{ fontSize: 14 }}>{title}</strong>
      <div style={{ fontSize: 13, marginTop: 6 }}>{children}</div>
    </div>
  );
}

function Page() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <ThemedCard title="Current theme">
        Active: <code>{theme}</code> — no prop drilling needed!
      </ThemedCard>
      <ThemedCard title="Another component">
        Both cards read from the same context.
      </ThemedCard>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <strong style={{ fontSize: 14 }}>Theme:</strong>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          style={{ padding: '6px 14px', background: theme === 'dark' ? '#6366f1' : '#e5e7eb', color: theme === 'dark' ? '#fff' : '#111', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Toggle ({theme})
        </button>
      </div>
      <Page />
    </ThemeContext.Provider>
  );
}`,
  },
  {
    id: 'advanced-usereducer',
    chapter: 'Advanced Hooks',
    title: 'useReducer',
    type: 'live',
    challenge: {
      question: 'When should you prefer useReducer over useState?',
      options: ['When you have a single boolean value', 'When state logic involves multiple sub-values or complex transitions', 'When you need async state', 'Always — it is always better'],
      correct: 1,
    },
    concept: '`useReducer` is an alternative to `useState` for complex state logic. You define a pure reducer function that takes the current state and an action, and returns the next state. All state transitions live in one place.',
    code: `function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'reset':     return { count: 0, step: state.step, history: [] };
    case 'setStep':   return { ...state, step: action.payload };
    case 'log':       return { ...state, history: [...state.history, action.payload].slice(-5) };
    default: return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1, history: [] });

  const change = (type) => {
    dispatch({ type });
    dispatch({ type: 'log', payload: \`\${type}: \${state.count} → \${type === 'increment' ? state.count + state.step : state.count - state.step}\` });
  };

  const btn = (bg) => ({ padding: '8px 18px', background: bg, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 16 });

  return (
    <div>
      <div style={{ fontSize: 64, fontWeight: 700, color: '#6366f1', textAlign: 'center', margin: '0 0 16px' }}>
        {state.count}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => change('decrement')} style={btn('#6b7280')}>−</button>
        <button onClick={() => dispatch({ type: 'reset' })} style={{ ...btn('#e5e7eb'), color: '#374151' }}>Reset</button>
        <button onClick={() => change('increment')} style={btn('#6366f1')}>+</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
        <span style={{ color: '#6b7280' }}>Step:</span>
        {[1, 5, 10].map(s => (
          <button key={s} onClick={() => dispatch({ type: 'setStep', payload: s })}
            style={{ padding: '3px 10px', border: '1px solid #d1d5db', borderRadius: 99, background: state.step === s ? '#6366f1' : '#fff', color: state.step === s ? '#fff' : '#374151', cursor: 'pointer' }}>
            {s}
          </button>
        ))}
      </div>
      {state.history.length > 0 && (
        <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>
          {state.history.map((h, i) => <div key={i}>{h}</div>)}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: 'use-id',
    chapter: 'Advanced Hooks',
    title: 'useId',
    type: 'live',
    concept: '`useId` generates a stable, unique ID that is consistent between server and client renders. Use it to link form labels to inputs via `htmlFor` / `id` — never generate IDs with `Math.random()` (they differ between SSR and hydration, causing mismatches). `useId` is safe for accessibility attributes.',
    code: `// Each component instance gets its own unique ID prefix
function FormField({ label, type = 'text', hint }) {
  const id = React.useId();
  const hintId = hint ? id + '-hint' : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label htmlFor={id}
        style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-describedby={hintId}
        style={{ padding: '7px 10px', border: '1px solid #d1d5db',
          borderRadius: 8, fontSize: 13, outline: 'none' }}
      />
      {hint && (
        <p id={hintId} style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 300 }}
      onSubmit={e => e.preventDefault()}>
      <FormField label="Email" type="email"
        hint="We'll never share your email." />
      <FormField label="Username"
        hint="3–20 characters, letters and numbers only." />
      <FormField label="Password" type="password" />
      <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
        Each field gets a unique, stable id via useId() — inspect the DOM to see them.
      </p>
    </form>
  );
}`,
  },
  {
    id: 'use-deferred-value',
    chapter: 'Advanced Hooks',
    title: 'useDeferredValue',
    type: 'live',
    concept: '`useDeferredValue` lets you defer updating a non-urgent part of the UI. The input updates immediately (feels instant) while the expensive filtered list updates after React has processed higher-priority work. The deferred value lags one render behind during rapid typing, keeping the input responsive.',
    code: `// Simulate a large dataset
const ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: 'Item ' + String(i).padStart(4, '0'),
  tag: ['alpha', 'beta', 'gamma', 'delta'][ i % 4],
}));

function HeavyList({ query }) {
  // This is the "expensive" computation — filters 5000 items
  const filtered = ITEMS.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.includes(query.toLowerCase())
  ).slice(0, 30);

  return (
    <div style={{ fontSize: 12, color: '#374151' }}>
      <div style={{ color: '#6b7280', marginBottom: 6, fontSize: 11 }}>
        Showing {filtered.length} results (capped at 30)
      </div>
      {filtered.map(item => (
        <div key={item.id}
          style={{ padding: '4px 8px', borderBottom: '1px solid #f3f4f6',
            display: 'flex', justifyContent: 'space-between' }}>
          <span>{item.name}</span>
          <span style={{ color: '#9ca3af' }}>{item.tag}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = React.useState('');

  // Input updates immediately; deferred value used for the expensive list
  const deferred = React.useDeferredValue(query);
  const isStale = deferred !== query;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to filter 5000 items…"
        style={{ padding: '8px 10px', border: '1px solid #d1d5db',
          borderRadius: 8, fontSize: 13 }}
      />
      <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity .15s' }}>
        <HeavyList query={deferred} />
      </div>
    </div>
  );
}`,
  },
  {
    id: 'optimistic-updates',
    chapter: 'Advanced Hooks',
    title: 'Optimistic updates',
    type: 'live',
    concept: 'Optimistic updates show the expected result immediately while the async operation is still in flight — making UIs feel instant on slow networks. The pattern: update state before the request, then commit the real result on success or revert on failure. React 19 has `useOptimistic` for this; in React 18 implement it with `useState`.',
    code: `async function fakeSave(id, liked) {
  await new Promise(r => setTimeout(r, 900));
  // Simulate occasional failure
  if (Math.random() < 0.2) throw new Error('Network error');
  return { id, liked };
}

function LikeButton({ postId, label }) {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(Math.floor(Math.random() * 80) + 5);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function handleClick() {
    if (pending) return;
    setError(null);
    const next = !liked;

    // 1. Optimistic update — instant feedback
    setLiked(next);
    setCount(c => next ? c + 1 : c - 1);
    setPending(true);

    try {
      await fakeSave(postId, next);
      // 2. Server confirmed — nothing to do, state already correct
    } catch {
      // 3. Rollback on failure
      setLiked(!next);
      setCount(c => next ? c - 1 : c + 1);
      setError('Failed — try again');
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 10 }}>
        <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{label}</span>
        <button onClick={handleClick}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 14px', borderRadius: 999, border: '1px solid',
            borderColor: liked ? '#6366f1' : '#e5e7eb',
            background:  liked ? '#eef2ff' : 'white',
            color:       liked ? '#4338ca' : '#6b7280',
            opacity: pending ? 0.7 : 1,
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            transition: 'all .15s'
          }}>
          <span>{liked ? '♥' : '♡'}</span>
          <span>{count}</span>
        </button>
      </div>
      {error && <p style={{ fontSize: 11, color: '#dc2626', margin: '0 0 0 14px' }}>⚠ {error} (20% failure rate)</p>}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
        Clicks update instantly. 20% chance of server failure — watch the rollback.
      </p>
      <LikeButton postId={1} label="Building a portfolio in 2025" />
      <LikeButton postId={2} label="Why I switched to TypeScript" />
      <LikeButton postId={3} label="CSS Grid vs Flexbox" />
    </div>
  );
}`,
  },
  {
    id: 'use-layout-effect',
    chapter: 'Advanced Hooks',
    title: 'useLayoutEffect',
    type: 'live',
    concept: '`useLayoutEffect` fires synchronously after React updates the DOM but **before the browser paints**. Use it when you need to measure or mutate the DOM before the user sees anything — tooltips positioning, animation starting values, scroll restoration. For everything else, prefer `useEffect`.',
    challenge: {
      question: 'When does useLayoutEffect run relative to the browser paint?',
      options: ['After paint', 'Before paint', 'During render', 'Never'],
      correct: 1,
    },
    code: `function Tooltip({ text, children }) {
  const ref = React.useRef(null);
  const [style, setStyle] = React.useState({});

  // useLayoutEffect: read DOM measurement before paint to avoid flicker
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // If tooltip overflows right edge, flip it left
    setStyle(rect.right > window.innerWidth - 20
      ? { right: 0, left: 'auto' }
      : { left: 0 });
  }, []);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <span ref={ref} style={{
        position: 'absolute', top: '100%', whiteSpace: 'nowrap',
        background: '#1e293b', color: '#f1f5f9', fontSize: 11,
        padding: '4px 8px', borderRadius: 4, marginTop: 4, zIndex: 10,
        ...style
      }}>{text}</span>
    </span>
  );
}

function App() {
  return (
    <div style={{ padding: 24 }}>
      <p>Hover reveals a tooltip positioned <em>after</em> measuring the DOM:</p>
      <br />
      <Tooltip text="Positioned without flicker using useLayoutEffect">
        <button style={{ padding: '6px 14px', cursor: 'pointer' }}>
          Hover for tooltip
        </button>
      </Tooltip>
    </div>
  );
}`,
  },
  {
    id: 'forward-ref',
    chapter: 'Advanced Hooks',
    title: 'forwardRef',
    type: 'live',
    concept: '`React.forwardRef` lets a parent pass a `ref` down through a component to a DOM element inside it. Without it, refs stop at the component boundary. Useful for building reusable input components, modals, and any UI library element that needs to expose its DOM node.',
    challenge: {
      question: 'What does forwardRef allow a parent component to do?',
      options: [
        'Pass state down to children',
        'Access a DOM node inside a child component',
        'Skip re-rendering child components',
        'Share context between siblings',
      ],
      correct: 1,
    },
    code: `// Without forwardRef a ref on <FancyInput /> would be null.
// With forwardRef it reaches the real <input> inside.
const FancyInput = React.forwardRef(function FancyInput({ label, ...props }, ref) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{label}</label>}
      <input
        ref={ref}
        style={{
          padding: '7px 12px', borderRadius: 6,
          border: '1.5px solid #e2e8f0', outline: 'none', fontSize: 14,
        }}
        {...props}
      />
    </div>
  );
});

function App() {
  const inputRef = React.useRef(null);

  function focusInput() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
      <FancyInput ref={inputRef} label="Name" placeholder="Click the button below…" />
      <button onClick={focusInput} style={{ padding: '7px 16px', borderRadius: 6,
        background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Focus & select input
      </button>
    </div>
  );
}`,
  },
  {
    id: 'use-imperative-handle',
    chapter: 'Advanced Hooks',
    title: 'useImperativeHandle',
    type: 'live',
    concept: '`useImperativeHandle` (used with `forwardRef`) lets a child component expose a **custom API** to its parent via a ref, instead of the raw DOM node. This gives you fine-grained control over what the parent can do — expose `focus()` and `clear()` but hide everything else.',
    challenge: {
      question: 'What does useImperativeHandle customise?',
      options: [
        'Which props the parent can pass',
        'What the parent sees when it uses a ref on the component',
        'How the component renders internally',
        'The component display name',
      ],
      correct: 1,
    },
    code: `const SearchBox = React.forwardRef(function SearchBox(props, ref) {
  const inputRef = React.useRef(null);

  // Expose only focus() and clear() — not the raw DOM node
  React.useImperativeHandle(ref, () => ({
    focus() { inputRef.current?.focus(); },
    clear() {
      if (inputRef.current) inputRef.current.value = '';
      inputRef.current?.focus();
    },
  }));

  return (
    <input
      ref={inputRef}
      placeholder="Search…"
      style={{ padding: '8px 12px', borderRadius: 6,
        border: '1.5px solid #e2e8f0', width: '100%', fontSize: 14 }}
    />
  );
});

function App() {
  const boxRef = React.useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
      <SearchBox ref={boxRef} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => boxRef.current.focus()}
          style={{ flex: 1, padding: '7px', borderRadius: 6, border: '1px solid #e2e8f0',
            background: '#f8fafc', cursor: 'pointer', fontSize: 13 }}>
          Focus
        </button>
        <button onClick={() => boxRef.current.clear()}
          style={{ flex: 1, padding: '7px', borderRadius: 6, border: 'none',
            background: '#4f46e5', color: '#fff', cursor: 'pointer', fontSize: 13 }}>
          Clear
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'stale-closure',
    chapter: 'Advanced Hooks',
    title: 'Dependency Array Gotchas',
    type: 'picker',
    concept: 'The #1 `useEffect` bug: **stale closures**. When a function inside `useEffect` references a state variable but that variable is missing from the dependency array, the effect captures the old value and never updates. The fix: either add the variable to deps, or use the **functional update** form of the setter.',
    challenge: {
      question: 'If count is missing from a useEffect dependency array that uses count, what happens?',
      options: [
        'React throws an error',
        'The effect always sees the initial value of count',
        'The effect re-runs on every render',
        'count updates normally',
      ],
      correct: 1,
    },
    options: [
      {
        label: '❌ Bug: stale closure',
        code: `function App() {
  const [count, setCount] = React.useState(0);

  // BUG: count is missing from deps — the interval always logs 0
  React.useEffect(() => {
    const id = setInterval(() => {
      console.log('count is:', count); // always 0!
      document.title = 'Count: ' + count;
    }, 1000);
    return () => clearInterval(id);
  }, []); // ← missing count

  return (
    <div style={{ padding: 20 }}>
      <p>Count: {count}</p>
      <p style={{ fontSize: 12, color: '#dc2626' }}>
        ⚠ Page title is stuck at "Count: 0" even as count increases
      </p>
      <button onClick={() => setCount(c => c + 1)}
        style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
        Increment
      </button>
    </div>
  );
}`,
      },
      {
        label: '✅ Fix: add to deps',
        code: `function App() {
  const [count, setCount] = React.useState(0);

  // FIX 1: add count to deps array
  React.useEffect(() => {
    document.title = 'Count: ' + count;
  }, [count]); // ← effect re-runs each time count changes

  return (
    <div style={{ padding: 20 }}>
      <p>Count: {count}</p>
      <p style={{ fontSize: 12, color: '#059669' }}>
        ✅ Page title stays in sync with count
      </p>
      <button onClick={() => setCount(c => c + 1)}
        style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
        Increment
      </button>
    </div>
  );
}`,
      },
      {
        label: '✅ Fix: functional update',
        code: `function App() {
  const [count, setCount] = React.useState(0);

  // FIX 2: use functional update — no need to read count at all
  React.useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // reads latest value internally
    }, 1000);
    return () => clearInterval(id);
  }, []); // ← empty array is safe here because we don't read count

  return (
    <div style={{ padding: 20 }}>
      <p>Auto-incrementing: {count}</p>
      <p style={{ fontSize: 12, color: '#059669' }}>
        ✅ Functional update avoids the stale closure entirely
      </p>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: 'event-listener-cleanup',
    chapter: 'Advanced Hooks',
    title: 'Event Listener Cleanup',
    type: 'live',
    concept: 'Adding `window` or `document` event listeners inside `useEffect` is a common React pattern — but they **must be removed in the cleanup function** or you get memory leaks and bugs (the old handler still fires after the component unmounts or re-mounts). Always return a cleanup that calls `removeEventListener` with the same function reference.',
    challenge: {
      question: 'What happens if you forget the cleanup in useEffect when adding a window event listener?',
      options: [
        'React removes it automatically on unmount',
        'The handler keeps firing even after the component unmounts',
        'The listener never attaches',
        'It causes a compile-time error',
      ],
      correct: 1,
    },
    code: `function App() {
  const [size, setSize] = React.useState({
    w: window.innerWidth, h: window.innerHeight,
  });
  const [keys, setKeys] = React.useState([]);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    function onResize() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    function onKey(e) {
      setKeys(prev => [...prev.slice(-4), e.key]);
    }
    function onMove(e) {
      setMouse({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousemove', onMove);

    // Cleanup — without this, handlers stack up on re-mount
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousemove', onMove);
    };
  }, []); // run once — cleanup fires on unmount

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      <div>📐 Window: {size.w} × {size.h}px</div>
      <div>🖱 Mouse: {mouse.x}, {mouse.y}</div>
      <div>⌨ Last keys: {keys.join(' → ') || '(press any key)'}</div>
      <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
        Resize the window, move the mouse, or press keys. All three listeners
        are properly cleaned up on unmount.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'batching',
    chapter: 'Advanced Hooks',
    title: 'Batching in React 18',
    type: 'picker',
    concept: 'React 18 introduced **automatic batching**: multiple `setState` calls inside **any** async context (setTimeout, fetch, promises) are now batched into a single re-render. Before React 18, only event handlers were batched — async code caused one re-render per `setState`. This means fewer renders and better performance with no code changes.',
    challenge: {
      question: 'In React 18, how many re-renders does calling setA(), setB(), setC() inside a setTimeout trigger?',
      options: ['3 re-renders', '2 re-renders', '1 re-render', '0 re-renders'],
      correct: 2,
    },
    options: [
      {
        label: 'React 18 — batched',
        code: `function App() {
  const [count, setCount] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const renders = React.useRef(0);
  renders.current++;

  function handleAsync() {
    // In React 18: both setters are batched → 1 re-render
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // React 18 batches these → single re-render
    }, 10);
  }

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}>
      <p>count: {count} | flag: {String(flag)}</p>
      <p style={{ color: '#059669' }}>✅ Renders: {renders.current} (batched)</p>
      <button onClick={handleAsync}
        style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer', marginTop: 8 }}>
        Update (async)
      </button>
      <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
        Both states update in 1 render — React 18 automatic batching.
      </p>
    </div>
  );
}`,
      },
      {
        label: 'flushSync — force sync',
        code: `// flushSync forces an immediate re-render, opting out of batching.
// Rarely needed — only when you must read the DOM between two updates.
const { flushSync } = ReactDOM;

function App() {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const renders = React.useRef(0);
  renders.current++;

  function handleClick() {
    flushSync(() => { setA(x => x + 1); }); // re-render 1
    flushSync(() => { setB(x => x + 1); }); // re-render 2
  }

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}>
      <p>a: {a} | b: {b}</p>
      <p style={{ color: '#f59e0b' }}>⚡ Renders: {renders.current} (forced sync)</p>
      <button onClick={handleClick}
        style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer', marginTop: 8 }}>
        flushSync update
      </button>
      <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
        flushSync opts out of batching — causes 2 separate renders.
        Only use when you truly need the DOM between updates.
      </p>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: 'use-debug-value',
    chapter: 'Advanced Hooks',
    title: 'useDebugValue',
    type: 'live',
    concept: '`useDebugValue` adds a label to custom hooks in **React DevTools**. When you inspect a component using your custom hook, DevTools shows the label next to the hook name — making it easy to see its current value at a glance. It has no effect in production.',
    code: `function useOnlineStatus() {
  const [online, setOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    function update() { setOnline(navigator.onLine); }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  // In React DevTools this hook shows:
  // useOnlineStatus: "Online ✅" or "Offline ❌"
  React.useDebugValue(online ? 'Online ✅' : 'Offline ❌');

  return online;
}

function useWindowSize() {
  const [size, setSize] = React.useState({ w: window.innerWidth, h: window.innerHeight });

  React.useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // DevTools shows: useWindowSize: "1440 × 900"
  React.useDebugValue(\`\${size.w} × \${size.h}\`);

  return size;
}

function App() {
  const online = useOnlineStatus();
  const size = useWindowSize();

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p>Status: {online ? '🟢 Online' : '🔴 Offline'}</p>
      <p>Window: {size.w} × {size.h}</p>
      <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>
        Open React DevTools → Components to see useDebugValue labels on each hook.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'use-sync-external-store',
    chapter: 'Advanced Hooks',
    title: 'useSyncExternalStore',
    type: 'live',
    concept: '`useSyncExternalStore` safely subscribes React components to **external state stores** (Redux, Zustand, browser APIs) without tearing. It takes a `subscribe` function and a `getSnapshot` function. React uses the snapshot to render and re-renders when the store changes. Essential for building state libraries.',
    challenge: {
      question: 'What problem does useSyncExternalStore solve that regular useState does not?',
      options: [
        'Making state persistent across page reloads',
        'Subscribing to external stores without tearing in concurrent mode',
        'Sharing state between unrelated components',
        'Reducing bundle size',
      ],
      correct: 1,
    },
    code: `// A minimal external store — works like a tiny Redux
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (update) => {
      state = typeof update === 'function' ? update(state) : update;
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const cartStore = createStore({ items: [], total: 0 });

function useCart() {
  return React.useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getState,
  );
}

function CartSummary() {
  const { items, total } = useCart();
  return (
    <div style={{ padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, fontSize: 13 }}>
      <strong>Cart: {items.length} item{items.length !== 1 ? 's' : ''}</strong>
      <p style={{ margin: '4px 0 0', color: '#059669' }}>Total: \${total.toFixed(2)}</p>
    </div>
  );
}

function App() {
  function addItem() {
    const price = +(Math.random() * 20 + 5).toFixed(2);
    cartStore.setState(s => ({
      items: [...s.items, { id: Date.now(), price }],
      total: +(s.total + price).toFixed(2),
    }));
  }
  function clear() { cartStore.setState({ items: [], total: 0 }); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16 }}>
      <CartSummary />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={addItem}
          style={{ flex: 1, padding: '7px', borderRadius: 6, background: '#4f46e5',
            color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13 }}>
          Add item
        </button>
        <button onClick={clear}
          style={{ padding: '7px 14px', borderRadius: 6, border: '1px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: 13 }}>
          Clear
        </button>
      </div>
    </div>
  );
}`,
  },

  // ── Advanced Patterns ───────────────────────────────────────────
  {
    id: 'compound-components',
    chapter: 'Advanced Patterns',
    title: 'Compound components',
    type: 'live',
    concept: 'The **compound components** pattern lets a parent component share implicit state with its children through React Context — without prop drilling. The children are co-designed with the parent and know how to read the shared context. This is how `<select>/<option>`, `<Tabs>/<Tab>`, and `<Accordion>/<AccordionItem>` are typically built.',
    code: `const TabsContext = React.createContext(null);

function Tabs({ defaultTab, children }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div style={{ display: 'flex', gap: 2, borderBottom: '2px solid #e5e7eb', marginBottom: 16 }}>{children}</div>;
}

function Tab({ id, children }) {
  const { active, setActive } = React.useContext(TabsContext);
  const isActive = active === id;
  return (
    <button onClick={() => setActive(id)}
      style={{ padding: '6px 14px', border: 'none', borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent', marginBottom: -2, background: 'none', color: isActive ? '#6366f1' : '#6b7280', fontWeight: isActive ? 700 : 400, cursor: 'pointer', fontSize: 13 }}>
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { active } = React.useContext(TabsContext);
  if (active !== id) return null;
  return <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{children}</div>;
}

function App() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Tabs defaultTab="jsx">
        <TabList>
          <Tab id="jsx">JSX</Tab>
          <Tab id="state">State</Tab>
          <Tab id="hooks">Hooks</Tab>
        </TabList>
        <TabPanel id="jsx">JSX is JavaScript with HTML-like syntax. Babel transforms it to React.createElement() calls.</TabPanel>
        <TabPanel id="state">State is local mutable data. When state changes, React re-renders the component.</TabPanel>
        <TabPanel id="hooks">Hooks let function components use state, effects, context, and refs without classes.</TabPanel>
      </Tabs>
    </div>
  );
}`,
  },
  {
    id: 'render-props',
    chapter: 'Advanced Patterns',
    title: 'Render props',
    type: 'live',
    concept: 'The **render props** pattern passes a function as a prop. The parent component calls it with data it owns, and the child decides how to render that data. This was the main sharing pattern before hooks — you still encounter it in third-party libraries.',
    code: `function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
      }}
      style={{ height: 160, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
      {render(pos)}
    </div>
  );
}

function App() {
  return (
    <div style={{ maxWidth: 320 }}>
      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Move your mouse over the box</p>
      <MouseTracker render={({ x, y }) => (
        <>
          <div style={{ position: 'absolute', left: x - 6, top: y - 6, width: 12, height: 12, borderRadius: '50%', background: '#6366f1', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, fontSize: 12, fontFamily: 'monospace', color: '#6b7280' }}>
            x: {x}, y: {y}
          </div>
        </>
      )} />
    </div>
  );
}`,
  },

  // ── Patterns & Architecture ─────────────────────────────────────
  {
    id: 'hoc',
    chapter: 'Patterns & Architecture',
    title: 'Higher-Order Components',
    type: 'live',
    concept: 'A **Higher-Order Component (HOC)** is a function that takes a component and returns a new component with added behaviour. HOCs were the dominant React pattern before hooks. Today hooks solve most of the same problems more cleanly, but HOCs are still common in older codebases and some libraries (Redux `connect`, React Router `withRouter`).',
    challenge: {
      question: 'What does a Higher-Order Component return?',
      options: ['A DOM element', 'A new component wrapping the original', 'A hook', 'A context value'],
      correct: 1,
    },
    code: `// HOC: adds loading state to any component
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
          padding: 16, color: '#6b7280', fontSize: 14 }}>
          <span style={{ animation: 'spin 1s linear infinite',
            display: 'inline-block' }}>⟳</span>
          Loading…
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
}

// HOC: adds error boundary behaviour
function withErrorBoundary(WrappedComponent, fallback) {
  return class extends React.Component {
    state = { error: null };
    static getDerivedStateFromError(err) { return { error: err }; }
    render() {
      if (this.state.error) return fallback || <p>Something went wrong.</p>;
      return <WrappedComponent {...this.props} />;
    }
  };
}

function UserList({ users }) {
  return (
    <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
      {users.map(u => <li key={u.id} style={{ padding: '3px 0', fontSize: 14 }}>{u.name}</li>)}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

function App() {
  const [loading, setLoading] = React.useState(true);
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Carol' }];

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>User list</h3>
      <UserListWithLoading isLoading={loading} users={users} />
      <p style={{ marginTop: 12, fontSize: 11, color: '#6b7280' }}>
        withLoading() wraps UserList — no changes to UserList itself.
      </p>
    </div>
  );
}`,
  },
  {
    id: 'state-machine',
    chapter: 'Patterns & Architecture',
    title: 'State Machines with useReducer',
    type: 'live',
    concept: 'A **state machine** makes impossible states impossible by defining explicit states and the transitions between them. Instead of `isLoading`, `isError`, `data` booleans that can conflict, you have a single `status` field: `"idle" | "loading" | "success" | "error"`. Combined with `useReducer`, this is a robust pattern for async UI flows.',
    challenge: {
      question: 'What problem does a state machine solve compared to multiple boolean flags?',
      options: [
        'It reduces the number of re-renders',
        'It eliminates impossible states like isLoading=true and isError=true simultaneously',
        'It makes components faster',
        'It removes the need for useEffect',
      ],
      correct: 1,
    },
    code: `const initialState = { status: 'idle', data: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH':   return { status: 'loading', data: null, error: null };
    case 'SUCCESS': return { status: 'success', data: action.data, error: null };
    case 'ERROR':   return { status: 'error',   data: null, error: action.error };
    case 'RESET':   return initialState;
    default: return state;
  }
}

const USERS = [
  { id: 1, name: 'Alice Chen',   role: 'Engineer' },
  { id: 2, name: 'Bob Martinez', role: 'Designer' },
  { id: 3, name: 'Carol Smith',  role: 'Manager' },
];

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  async function fetchData() {
    dispatch({ type: 'FETCH' });
    await new Promise(r => setTimeout(r, 1000));
    if (Math.random() < 0.3) {
      dispatch({ type: 'ERROR', error: 'Server timeout — try again' });
    } else {
      dispatch({ type: 'SUCCESS', data: USERS });
    }
  }

  const statusColor = { idle: '#6b7280', loading: '#f59e0b', success: '#059669', error: '#dc2626' };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          color: statusColor[state.status], fontFamily: 'monospace' }}>
          ● {state.status}
        </span>
        <button onClick={state.status === 'loading' ? undefined : fetchData}
          disabled={state.status === 'loading'}
          style={{ padding: '6px 16px', borderRadius: 6, border: 'none',
            background: state.status === 'loading' ? '#e2e8f0' : '#4f46e5',
            color: state.status === 'loading' ? '#94a3b8' : '#fff',
            cursor: state.status === 'loading' ? 'default' : 'pointer', fontSize: 13 }}>
          {state.status === 'loading' ? 'Loading…' : 'Fetch users'}
        </button>
        {state.status !== 'idle' && (
          <button onClick={() => dispatch({ type: 'RESET' })}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
              background: '#f8fafc', cursor: 'pointer', fontSize: 12 }}>
            Reset
          </button>
        )}
      </div>

      {state.status === 'error' && (
        <p style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>⚠ {state.error}</p>
      )}
      {state.status === 'success' && (
        <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
          {state.data.map(u => (
            <li key={u.id} style={{ fontSize: 14, padding: '2px 0' }}>
              <strong>{u.name}</strong> — {u.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
  },

  // ── Error Handling & Testing ────────────────────────────────────
  {
    id: 'error-boundaries',
    chapter: 'Error Handling & Testing',
    title: 'Error Boundaries',
    type: 'live',
    concept: '**Error boundaries** catch JavaScript errors anywhere in a child component tree and display a fallback UI instead of crashing the page. They must be **class components** — they use `componentDidCatch` and `getDerivedStateFromError`. Wrap them around any part of the tree that might fail.',
    challenge: {
      question: 'Why must Error Boundaries be class components?',
      options: ['Hooks cannot catch errors', 'getDerivedStateFromError and componentDidCatch have no hook equivalents yet', 'Function components are too slow', 'React requires it for performance'],
      correct: 1,
    },
    code: `class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In production: log to error reporting service
    console.error('Caught:', error.message);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 14, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>Something went wrong</div>
          <div style={{ color: '#6b7280', marginBottom: 8 }}>{this.state.error.message}</div>
          <button onClick={() => this.setState({ error: null })}
            style={{ fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function BrokenWidget() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error('Widget crashed during render');
  return (
    <div style={{ padding: 12, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, fontSize: 13 }}>
      <div style={{ marginBottom: 8 }}>Widget is healthy ✓</div>
      <button onClick={() => setCrash(true)}
        style={{ padding: '5px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
        Crash widget
      </button>
    </div>
  );
}

function App() {
  return (
    <div style={{ maxWidth: 300 }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
        The ErrorBoundary catches the crash and shows a fallback.
      </p>
      <ErrorBoundary>
        <BrokenWidget />
      </ErrorBoundary>
    </div>
  );
}`,
  },
  {
    id: 'testing-mindset',
    chapter: 'Error Handling & Testing',
    title: 'Testing mindset',
    type: 'live',
    concept: 'React components are functions — you can test them by rendering them, firing events, and asserting on the output. The core principle: **test behaviour, not implementation**. Test what the user sees and does, not which state variables change. This makes tests resilient to refactoring.',
    code: `// A tiny test runner — no libraries needed in this playground
function describe(name, fn) {
  const results = [];
  const it = (label, test) => {
    try { test(); results.push({ label, pass: true }); }
    catch(e) { results.push({ label, pass: false, err: e.message }); }
  };
  fn(it);
  return { name, results };
}

function expect(val) {
  return {
    toBe: (expected) => { if (val !== expected) throw new Error(\`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(val)}\`); },
    toContain: (str) => { if (!String(val).includes(str)) throw new Error(\`Expected "\${val}" to contain "\${str}"\`); },
    toBeTruthy: () => { if (!val) throw new Error(\`Expected truthy, got \${val}\`); },
  };
}

// The function we're testing
function formatPrice(cents, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}

// Tests
const suite = describe('formatPrice', (it) => {
  it('formats dollars correctly', () => expect(formatPrice(1999)).toBe('$19.99'));
  it('formats zero', () => expect(formatPrice(0)).toBe('$0.00'));
  it('formats large amounts', () => expect(formatPrice(100000)).toBe('$1,000.00'));
  it('supports GBP', () => expect(formatPrice(500, 'GBP')).toContain('5.00'));
  it('handles negative values', () => expect(formatPrice(-500)).toContain('-'));
});

function App() {
  const total = suite.results.filter(r => r.pass).length;
  return (
    <div style={{ maxWidth: 320 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
        {suite.name} — {total}/{suite.results.length} passing
      </div>
      {suite.results.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5, fontSize: 12 }}>
          <span style={{ color: r.pass ? '#16a34a' : '#dc2626', flexShrink: 0 }}>{r.pass ? '✓' : '✗'}</span>
          <span style={{ color: r.pass ? '#374151' : '#dc2626' }}>
            {r.label}{r.err ? ': ' + r.err : ''}
          </span>
        </div>
      ))}
    </div>
  );
}`,
  },

  // ── Portals ─────────────────────────────────────────────────────
  {
    id: 'portals',
    chapter: 'Portals',
    title: 'Portals & Modals',
    type: 'live',
    concept: '**Portals** let you render a child component into a different DOM node than its parent. This solves the `z-index` / `overflow: hidden` problem for modals, tooltips, and dropdowns — the modal renders at the `body` level even though it lives in your component tree.',
    code: `// ReactDOM.createPortal renders children into a different DOM node
// In this preview, we render the modal into a portal container at the body level

function Modal({ onClose, children }) {
  // Ensure portal container exists
  let container = document.getElementById('portal-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'portal-root';
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}
      onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 10, padding: 24,
        maxWidth: 280, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
        onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}
          style={{ marginTop: 14, padding: '6px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          Close
        </button>
      </div>
    </div>,
    container
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 16, background: '#f9fafb', borderRadius: 8 }}>
      <p style={{ fontSize: 13, color: '#374151', marginBottom: 12 }}>
        This div has overflow: hidden but the modal still escapes it.
      </p>
      <button onClick={() => setOpen(true)}
        style={{ padding: '7px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
        Open Modal
      </button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Portal Modal</h3>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
            Rendered at the body level via ReactDOM.createPortal — outside any overflow or stacking context.
          </p>
        </Modal>
      )}
    </div>
  );
}`,
  },

  // ── Suspense & Concurrent ───────────────────────────────────────
  {
    id: 'suspense-lazy',
    chapter: 'Suspense & Concurrent',
    title: 'Suspense & lazy loading',
    type: 'live',
    concept: '`React.lazy()` lets you code-split a component so it only loads when first rendered. `Suspense` displays a fallback while the lazy component is loading. This reduces the initial bundle size — users only download code they actually use.',
    challenge: {
      question: 'What does React.lazy() require the import to return?',
      options: ['A named export', 'A default export wrapped in a Promise', 'An object with a render method', 'A class component'],
      correct: 1,
    },
    code: `// Simulate a lazily-loaded heavy component
// React.lazy() takes a function returning a dynamic import()
// Here we simulate with a delayed Promise

const HeavyChart = React.lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve({
      default: function Chart() {
        return (
          <div style={{ padding: 20, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 10, color: '#fff' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>📊 Sales Chart</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
              {[40,65,45,80,55,90,70].map((h,i) => (
                <div key={i} style={{ flex: 1, height: h+'%', background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
              ))}
            </div>
          </div>
        );
      }
    }), 1500)
  )
);

function App() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ maxWidth: 300 }}>
      <button onClick={() => setShow(true)} disabled={show}
        style={{ marginBottom: 14, padding: '7px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: show ? 'default' : 'pointer', opacity: show ? 0.6 : 1, fontSize: 13 }}>
        Load Chart Component
      </button>
      {show && (
        <React.Suspense fallback={
          <div style={{ padding: 20, background: '#f9fafb', borderRadius: 10, fontSize: 13, color: '#9ca3af', textAlign: 'center' }}>
            ⏳ Loading chart...
          </div>
        }>
          <HeavyChart />
        </React.Suspense>
      )}
    </div>
  );
}`,
  },
  {
    id: 'use-transition',
    chapter: 'Suspense & Concurrent',
    title: 'useTransition',
    type: 'live',
    concept: '`useTransition` marks a state update as non-urgent. React defers it and keeps the UI responsive while the transition is pending. Useful for filtering large lists, navigating between tabs, or any update that might cause a noticeable delay. `isPending` tells you when a transition is in progress.',
    code: `const ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: \`Item \${i + 1}\`,
  tag: ['react', 'css', 'js', 'html', 'gsap'][i % 5],
}));

function App() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(ITEMS);
  const [isPending, startTransition] = React.useTransition();

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val); // urgent — input updates immediately
    startTransition(() => {
      // non-urgent — filter is deferred
      setFiltered(ITEMS.filter(item =>
        item.name.toLowerCase().includes(val.toLowerCase()) ||
        item.tag.includes(val.toLowerCase())
      ));
    });
  };

  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <input value={query} onChange={handleChange} placeholder="Filter 5000 items..."
          style={{ width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
        {isPending && <span style={{ position: 'absolute', right: 8, top: 8, fontSize: 11, color: '#9ca3af' }}>updating...</span>}
      </div>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{filtered.length} results</div>
      <div style={{ maxHeight: 160, overflowY: 'auto', opacity: isPending ? 0.6 : 1, transition: 'opacity 0.15s' }}>
        {filtered.slice(0, 20).map(item => (
          <div key={item.id} style={{ padding: '4px 8px', fontSize: 12, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.name}</span>
            <span style={{ color: '#9ca3af' }}>{item.tag}</span>
          </div>
        ))}
        {filtered.length > 20 && <div style={{ padding: '4px 8px', fontSize: 11, color: '#9ca3af' }}>+{filtered.length - 20} more</div>}
      </div>
    </div>
  );
}`,
  },

  // ── Accessibility & Patterns ────────────────────────────────────
  {
    id: 'accessibility',
    chapter: 'Accessibility & Patterns',
    title: 'Accessibility Basics',
    type: 'picker',
    concept: 'Accessible React apps use semantic HTML, ARIA attributes, and proper keyboard navigation. Key rules: use the right HTML element (`<button>` not `<div>`), add `aria-label` for icon buttons, manage focus after dynamic updates, and use `aria-live` regions for screen reader announcements.',
    challenge: {
      question: 'Why should you use a <button> element instead of a <div> for a clickable action?',
      options: [
        'Buttons are styled differently by default',
        'Buttons are focusable, keyboard-operable, and announced as buttons to screen readers',
        'Divs cannot have onClick handlers',
        'Buttons prevent default form submission',
      ],
      correct: 1,
    },
    options: [
      {
        label: 'Semantic HTML',
        code: `function App() {
  const [count, setCount] = React.useState(0);
  const [msg, setMsg] = React.useState('');

  function increment() {
    setCount(c => c + 1);
    setMsg('Count increased to ' + (count + 1));
  }

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* aria-live: screen readers announce changes without focus */}
      <div aria-live="polite" aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {msg}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* aria-label describes icon buttons */}
        <button aria-label="Decrease count"
          onClick={() => setCount(c => Math.max(0, c - 1))}
          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0',
            cursor: 'pointer', fontSize: 18, background: '#f8fafc' }}>
          −
        </button>

        {/* aria-live value announced to screen readers */}
        <span aria-label={\`Count: \${count}\`}
          style={{ fontSize: 24, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
          {count}
        </span>

        <button aria-label="Increase count" onClick={increment}
          style={{ width: 32, height: 32, borderRadius: '50%', border: 'none',
            background: '#4f46e5', color: '#fff', cursor: 'pointer', fontSize: 18 }}>
          +
        </button>
      </div>

      <p style={{ fontSize: 12, color: '#6b7280' }}>
        Try navigating with Tab + Space/Enter. Screen readers announce changes via aria-live.
      </p>
    </div>
  );
}`,
      },
      {
        label: 'Focus management',
        code: `function Dialog({ open, onClose, children }) {
  const closeRef = React.useRef(null);

  // Move focus to close button when dialog opens
  React.useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Alert dialog"
      style={{ position: 'fixed', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)', zIndex: 100 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24,
        maxWidth: 360, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        {children}
        <button ref={closeRef} onClick={onClose}
          style={{ marginTop: 16, padding: '8px 20px', borderRadius: 6,
            background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Close (Esc)
        </button>
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus(); // return focus to trigger
  }

  React.useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') handleClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div style={{ padding: 24 }}>
      <button ref={triggerRef} onClick={() => setOpen(true)}
        style={{ padding: '8px 20px', borderRadius: 6,
          background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Open dialog
      </button>
      <Dialog open={open} onClose={handleClose}>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Accessible Dialog</h2>
        <p style={{ margin: 0, fontSize: 14, color: '#475569' }}>
          Focus moves here on open. Escape key closes. Focus returns to trigger on close.
        </p>
      </Dialog>
    </div>
  );
}`,
      },
    ],
  },

  // ── Performance & Debugging ─────────────────────────────────────
  {
    id: 'devtools-profiling',
    chapter: 'Performance & Debugging',
    title: 'React DevTools Profiling',
    type: 'live',
    concept: 'React DevTools Profiler records renders and shows **why** each component re-rendered, how long it took, and which render was most expensive. Key signals: grey components did not render; coloured bars show render time. Look for components re-rendering when their props did not change — a sign `React.memo` or `useCallback` could help.',
    code: `// This example deliberately has an unnecessary re-render to profile.
// Open React DevTools → Profiler → Record → click buttons → Stop.

function ExpensiveList({ items }) {
  // Simulate slow rendering
  const start = performance.now();
  while (performance.now() - start < 3) { /* artificial delay */ }

  return (
    <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
      {items.map(item => (
        <li key={item.id} style={{ fontSize: 13, padding: '2px 0' }}>{item.text}</li>
      ))}
    </ul>
  );
}

// Memoized version — only re-renders when items actually changes
const MemoList = React.memo(ExpensiveList);

function App() {
  const [count, setCount] = React.useState(0);
  const [items] = React.useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build something' },
    { id: 3, text: 'Ship it' },
  ]);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setCount(c => c + 1)}
          style={{ padding: '7px 16px', borderRadius: 6, background: '#4f46e5',
            color: '#fff', border: 'none', cursor: 'pointer' }}>
          Click me (count: {count})
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#dc2626', margin: '0 0 6px' }}>
            ❌ No memo — re-renders every click
          </p>
          <ExpensiveList items={items} />
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#059669', margin: '0 0 6px' }}>
            ✅ React.memo — skips re-render
          </p>
          <MemoList items={items} />
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>
        Open React DevTools → Profiler → Record → click the button → Stop.
        The left list shows yellow bars (slow renders). The right skips re-renders entirely.
      </p>
    </div>
  );
}`,
  },

  // ── TypeScript with React ───────────────────────────────────────
  {
    id: 'typescript-props',
    chapter: 'TypeScript with React',
    title: 'Typing Props',
    type: 'picker',
    concept: 'TypeScript adds static types to React props, state, events, and hooks — catching bugs at compile time. Define props with an `interface` or `type`, use `React.FC<Props>` or inline the type in the function signature. TypeScript knows the shape of DOM events (`React.ChangeEvent<HTMLInputElement>`) so you get autocomplete on `e.target.value`.',
    challenge: {
      question: 'What is the TypeScript type for an onChange event on an <input> element?',
      options: [
        'React.InputEvent',
        'React.ChangeEvent<HTMLInputElement>',
        'Event<HTMLInputElement>',
        'React.SyntheticEvent',
      ],
      correct: 1,
    },
    options: [
      {
        label: 'Basic prop types',
        code: `// Note: This playground runs plain JavaScript/JSX.
// TypeScript syntax shown here is for learning purposes —
// the types are stripped so the code still runs.

// In a real .tsx file you would write:
// interface ButtonProps {
//   label: string;
//   onClick: () => void;
//   variant?: 'primary' | 'secondary';
//   disabled?: boolean;
// }

function Button({ label, onClick, variant = 'primary', disabled = false }) {
  const bg = variant === 'primary' ? '#4f46e5' : '#f8fafc';
  const color = variant === 'primary' ? '#fff' : '#1e293b';
  const border = variant === 'secondary' ? '1px solid #e2e8f0' : 'none';
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: '8px 18px', borderRadius: 6, cursor: disabled ? 'default' : 'pointer',
        background: disabled ? '#e2e8f0' : bg, color: disabled ? '#94a3b8' : color,
        border, fontSize: 14, fontWeight: 600 }}>
      {label}
    </button>
  );
}

function App() {
  const [clicked, setClicked] = React.useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button label="Primary" onClick={() => setClicked(c => c + 1)} />
        <Button label="Secondary" variant="secondary" onClick={() => setClicked(c => c + 1)} />
        <Button label="Disabled" disabled onClick={() => {}} />
      </div>
      <p style={{ fontSize: 13, color: '#6b7280' }}>Clicked: {clicked} times</p>
      <pre style={{ fontSize: 11, background: '#f8fafc', padding: 12, borderRadius: 8,
        border: '1px solid #e2e8f0', overflow: 'auto', margin: 0 }}>{
\`// TypeScript interface for Button props:
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  // TypeScript ensures correct prop types at compile time
}\`}</pre>
    </div>
  );
}`,
      },
      {
        label: 'Typing events & state',
        code: `// TypeScript event types for common inputs
// React.ChangeEvent<HTMLInputElement> — input onChange
// React.FormEvent<HTMLFormElement>   — form onSubmit
// React.MouseEvent<HTMLButtonElement>— button onClick
// React.KeyboardEvent<HTMLInputElement>— input onKeyDown

function SearchForm() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [submitted, setSubmitted] = React.useState('');

  const DATA = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'GraphQL'];

  // In TypeScript: (e: React.ChangeEvent<HTMLInputElement>) => void
  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    setResults(val ? DATA.filter(d => d.toLowerCase().includes(val.toLowerCase())) : []);
  }

  // In TypeScript: (e: React.FormEvent<HTMLFormElement>) => void
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(query);
  }

  return (
    <form onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 20, maxWidth: 300 }}>
      <input value={query} onChange={handleChange} placeholder="Search technologies…"
        style={{ padding: '8px 12px', borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 14 }} />
      <button type="submit"
        style={{ padding: '8px', borderRadius: 6, background: '#4f46e5',
          color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}>
        Search
      </button>
      {results.length > 0 && (
        <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
          {results.map(r => <li key={r} style={{ fontSize: 13 }}>{r}</li>)}
        </ul>
      )}
      {submitted && <p style={{ fontSize: 12, color: '#6b7280' }}>Searched: "{submitted}"</p>}
    </form>
  );
}

function App() { return <SearchForm />; }`,
      },
    ],
  },

  // ── GSAP in React ───────────────────────────────────────────────
  {
    id: 'gsap-basics-react',
    chapter: 'GSAP in React',
    title: 'GSAP with useRef',
    type: 'live',
    concept: 'GSAP works in React by targeting DOM elements via `useRef`. Use `gsap.context()` inside `useEffect` — it scopes all animations to a container and calling `ctx.revert()` in the cleanup kills them cleanly. This is the correct pattern for React 18 because `gsap.context().revert()` handles StrictMode\'s double-mount without running the animation twice.',
    code: `// GSAP is loaded via CDN in this preview
// In a real project: import { gsap } from "gsap"

function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    // gsap.context() scopes animations and reverts cleanly on unmount
    // This prevents the double-animation in React 18 StrictMode dev mode
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 180,
        rotation: 360,
        duration: 1.2,
        ease: "power2.out",
      });
    });
    return () => ctx.revert(); // reverts all animations in this context
  }, []);

  return (
    <div ref={boxRef}
      style={{ width: 52, height: 52, background: "#88ce02",
               borderRadius: 8, marginTop: 16 }} />
  );
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(v => !v)}
        style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #e5e7eb",
                 cursor: "pointer", marginBottom: 8, fontSize: 13 }}>
        {show ? "Unmount" : "Mount"} box
      </button>
      {show && <AnimatedBox />}
    </div>
  );
}`,
  },
  {
    id: 'gsap-timeline-react',
    chapter: 'GSAP in React',
    title: 'Timeline on mount',
    type: 'live',
    concept: 'Create a `gsap.timeline()` inside `useEffect` and return `tl.kill()` from the cleanup. Use `useRef` for every DOM element you want to animate. **Note:** In React 18 development mode, StrictMode intentionally mounts → unmounts → remounts components to detect side effects, so you may see the animation run twice in dev. In production it runs once. A `useRef` guard prevents the double-fire during development.',
    challenge: {
      question: 'Why must you return a cleanup function from useEffect when using GSAP?',
      options: ['To pause the animation', 'To kill the tween and avoid memory leaks on unmount', 'To reset state', 'GSAP requires it for React 18'],
      correct: 1,
    },
    code: `function HeroSection() {
  const headingRef = useRef(null);
  const textRef    = useRef(null);
  const btnRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headingRef.current, { y: -28, opacity: 0, duration: 0.7 })
        .from(textRef.current,    { y:  20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(btnRef.current,     { scale: 0.85, opacity: 0, duration: 0.5 }, "-=0.2");
    });
    return () => ctx.revert(); // ctx.revert() replaces tl.kill() — handles StrictMode
  }, []);

  return (
    <div style={{ maxWidth: 320 }}>
      <h2 ref={headingRef}
        style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        GSAP + React
      </h2>
      <p ref={textRef}
        style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 }}>
        Smooth entrance animations using a timeline and multiple refs.
      </p>
      <button ref={btnRef}
        style={{ padding: "8px 20px", background: "#88ce02", border: "none",
                 borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <button onClick={() => setKey(k => k + 1)}
        style={{ marginBottom: 16, padding: "5px 14px", borderRadius: 6,
                 border: "1px solid #e5e7eb", cursor: "pointer", fontSize: 12 }}>
        ↺ Replay
      </button>
      <HeroSection key={key} />
    </div>
  );
}`,
  },
  {
    id: 'gsap-scroll-react',
    chapter: 'GSAP in React',
    title: 'ScrollTrigger in React',
    type: 'live',
    concept: 'Register `ScrollTrigger` once at the top level. Inside `useEffect`, create a tween with a `scrollTrigger` config pointing to your ref. Return `ScrollTrigger.getAll().forEach(t => t.kill())` from cleanup to prevent stale triggers accumulating between renders.',
    code: `// Register ScrollTrigger (done once in a real app at entry point)
// gsap.registerPlugin(ScrollTrigger); // already registered in this preview

function ScrollCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const tween = gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={cardRef}
      style={{ padding: "16px 20px", background: "#f9fafb", border: "1px solid #e5e7eb",
               borderRadius: 10, marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
      Scroll into view to animate ↓
    </div>
  );
}

function App() {
  return (
    <div style={{ paddingTop: 8 }}>
      <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 200 }}>
        ↓ Scroll down to see the cards animate in
      </p>
      {["Card One", "Card Two", "Card Three"].map(label => (
        <ScrollCard key={label} />
      ))}
    </div>
  );
}`,
  },


  // ── Chapter 22: Styling in React ─────────────────────────────────────────────
  {
    id: 'styling-approaches',
    chapter: 'Styling in React',
    title: 'Styling Approaches',
    type: 'picker',
    concept: 'React supports multiple styling strategies. **Inline styles** use JavaScript objects with camelCase properties — great for dynamic values. **className** works with any CSS file or framework. **Tailwind CSS** uses utility classes directly in JSX. Each approach has tradeoffs around performance, maintainability, and tooling.',
    challenge: { question: 'Why do inline styles in React use camelCase property names?', options: ['It\'s a React convention', 'Because they are JavaScript objects, not CSS strings', 'To avoid conflicts with HTML attributes', 'For better performance'], correct: 1 },
    options: [
      { label: 'Inline styles',
        code: `function App() {
  const [theme, setTheme] = React.useState('blue');
  const themes = {
    blue:   { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
    green:  { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
    purple: { bg: '#faf5ff', border: '#a855f7', text: '#7e22ce' },
  };
  const t = themes[theme];
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ padding: '16px 20px', background: t.bg, border: \`2px solid \${t.border}\`,
        borderRadius: 10, color: t.text, fontWeight: 600 }}>
        Dynamic theme: {theme}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.keys(themes).map(name => (
          <button key={name} onClick={() => setTheme(name)} style={{
            padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
            border: '2px solid ' + themes[name].border,
            background: theme === name ? themes[name].bg : '#fff',
            color: themes[name].text, fontWeight: 600, fontSize: 13,
          }}>{name}</button>
        ))}
      </div>
    </div>
  );
}` },
      { label: 'className + CSS',
        code: `function App() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = \`.card{padding:14px;border-radius:10px;border:2px solid #e2e8f0;background:#fff;transition:all .2s;cursor:pointer}
.card:hover{border-color:#6366f1;box-shadow:0 4px 12px rgba(99,102,241,.15)}
.card.active{border-color:#6366f1;background:#eef2ff}
.card-title{font-weight:700;font-size:15px;margin:0 0 4px}
.card-sub{font-size:12px;color:#6b7280;margin:0}\`;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  const items = ['Dashboard', 'Analytics', 'Settings'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {items.map((item, i) => (
        <div key={item} className={\`card \${active === i ? 'active' : ''}\`} onClick={() => setActive(i)}>
          <p className="card-title">{item}</p>
          <p className="card-sub">Click to select</p>
        </div>
      ))}
    </div>
  );
}` },
    ],
  },

  // ── Chapter 23: Beginner Patterns ─────────────────────────────────────────────
  {
    id: 'loading-states-basics',
    chapter: 'Beginner Patterns',
    title: 'Loading States Basics',
    type: 'picker',
    concept: 'Almost every real React app fetches data. The standard pattern is a **3-state UI**: loading (spinner), success (data), error (message). Use a single `status` string — `"idle" | "loading" | "success" | "error"` — rather than multiple booleans like `isLoading` and `isError` which can conflict.',
    challenge: { question: 'Why use a single status string instead of isLoading + isError booleans?', options: ['Strings are faster', 'Multiple booleans can create impossible states like isLoading=true AND isError=true simultaneously', 'React only supports string state', 'It uses less memory'], correct: 1 },
    options: [
      { label: 'Simple loading',
        code: `function App() {
  const [status, setStatus] = React.useState('idle');
  const [data, setData] = React.useState(null);
  async function load() {
    setStatus('loading'); setData(null);
    await new Promise(r => setTimeout(r, 1500));
    setData({ name: 'Puneet', role: 'Developer', tools: 181 });
    setStatus('success');
  }
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button onClick={load} disabled={status === 'loading'}
        style={{ padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: status === 'loading' ? '#e2e8f0' : '#4f46e5', color: '#fff' }}>
        {status === 'loading' ? '⏳ Loading…' : 'Load data'}
      </button>
      {status === 'loading' && <p style={{ color: '#6b7280' }}>Fetching…</p>}
      {status === 'success' && data && (
        <div style={{ padding: 14, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>✅ {data.name}</p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#4b5563' }}>{data.role} · {data.tools} tools</p>
        </div>
      )}
    </div>
  );
}` },
      { label: 'With error handling',
        code: `function App() {
  const [status, setStatus] = React.useState('idle');
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');
  async function load() {
    setStatus('loading'); setData(null); setError('');
    await new Promise(r => setTimeout(r, 1000));
    if (Math.random() < 0.4) { setError('Server returned 500'); setStatus('error'); return; }
    setData([{ id:1,name:'Alice',score:94 },{ id:2,name:'Bob',score:87 },{ id:3,name:'Carol',score:91 }]);
    setStatus('success');
  }
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button onClick={load} disabled={status === 'loading'}
        style={{ padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: '#4f46e5', color: '#fff', opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Loading…' : status === 'error' ? 'Retry' : 'Fetch scores'}
      </button>
      {status === 'error' && <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8, color: '#dc2626' }}>❌ {error}</div>}
      {status === 'success' && data && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.map(u => (
            <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between',
              padding: '8px 14px', background: '#f8fafc', borderRadius: 6, fontSize: 14 }}>
              <span>{u.name}</span>
              <strong style={{ color: u.score >= 90 ? '#059669' : '#f59e0b' }}>{u.score}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}` },
    ],
  },

  {
    id: 'debugging-react',
    chapter: 'Beginner Patterns',
    title: 'Debugging React Apps',
    type: 'picker',
    concept: 'Three main debugging tools: **console.log()** for quick inspection (place it in the component body before the return), **React DevTools** to inspect state and props, and **reading error messages** carefully — React includes the component name and a link to the docs. Common fixes: optional chaining for null, `?? []` for undefined arrays.',
    challenge: { question: 'Where should you place console.log() to see what renders each time?', options: ['Inside useEffect with []', 'Directly in the function body before return', 'Inside an event handler only', 'In setTimeout'], correct: 1 },
    options: [
      { label: 'console.log debugging',
        code: `function UserCard({ user }) {
  console.log('UserCard rendered:', user);
  if (!user) return <p style={{ color: '#dc2626' }}>No user provided</p>;
  return (
    <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
      <strong>{user.name}</strong>
      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7280' }}>{user.email}</p>
    </div>
  );
}
function App() {
  const [userId, setUserId] = React.useState(1);
  const users = {
    1: { name: 'Alice Chen', email: 'alice@example.com' },
    2: { name: 'Bob Park',   email: 'bob@example.com' },
    3: null,
  };
  console.log('App rendered, userId:', userId);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Open DevTools Console (F12) to see logs.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2,3].map(id => (
          <button key={id} onClick={() => setUserId(id)}
            style={{ padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
              background: userId === id ? '#4f46e5' : '#f8fafc',
              color: userId === id ? '#fff' : '#1e293b',
              border: '1px solid ' + (userId === id ? '#4f46e5' : '#e2e8f0') }}>
            User {id}{id===3?' (null)':''}
          </button>
        ))}
      </div>
      <UserCard user={users[userId]} />
    </div>
  );
}` },
      { label: 'Common error fixes',
        code: `// Common React bugs and their fixes shown side by side.
function App() {
  const [view, setView] = React.useState('null-obj');
  const demos = {
    'null-obj': {
      label: 'null object access',
      broken: () => { const user = null; return user.name; },  // TypeError
      fixed: () => { const user = null; return user?.name ?? '(no user)'; },
      tip: "user?.name ?? '(default)'",
    },
    'undef-arr': {
      label: 'undefined array',
      broken: () => { const items = undefined; return items.map(x=>x).join(','); },
      fixed: () => { const items = undefined; return (items ?? []).map(x=>x).join(',') || '(empty)'; },
      tip: "(items ?? []).map(...)",
    },
    'missing-key': {
      label: 'key={index} warning',
      broken: () => ['a','b','c'].map((x,i) => <li key={i}>{x}</li>),
      fixed: () => ['a','b','c'].map(x => <li key={x}>{x}</li>),
      tip: "key={item.id} not key={index}",
    },
  };
  const demo = demos[view];
  let fixedResult;
  try { fixedResult = demo.fixed(); } catch(e) { fixedResult = '(error)'; }
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {Object.entries(demos).map(([k,d]) => (
          <button key={k} onClick={() => setView(k)}
            style={{ padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
              background: view===k?'#4f46e5':'#f8fafc', color: view===k?'#fff':'#1e293b',
              border: '1px solid '+(view===k?'#4f46e5':'#e2e8f0') }}>{d.label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8, fontSize: 12, color: '#dc2626' }}>
          <strong>❌ Bug</strong>
          <p style={{ margin: '6px 0 0', fontFamily: 'monospace' }}>{demo.broken.toString().match(/return (.+);/)?.[1]}</p>
        </div>
        <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 8, fontSize: 12, color: '#15803d' }}>
          <strong>✅ Fix: {demo.tip}</strong>
          <p style={{ margin: '6px 0 0', fontFamily: 'monospace' }}>Result: {String(fixedResult)}</p>
        </div>
      </div>
    </div>
  );
}` },
    ],
  },

  {
    id: 'common-beginner-bugs',
    chapter: 'Beginner Patterns',
    title: 'Common Beginner Bugs',
    type: 'picker',
    concept: 'Every React beginner hits the same bugs: **mutating state directly** (causes no re-render), **infinite loops** in useEffect, and **stale state** in async code. Recognising these patterns saves hours of debugging.',
    challenge: { question: 'Why does directly mutating state (e.g. arr.push(x)) not trigger a re-render?', options: ['push() is not allowed in React', 'React compares state by reference — mutating the same object doesn\'t change the reference', 'You need to call setState twice', 'Only works in class components'], correct: 1 },
    options: [
      { label: '❌ Direct mutation vs ✅ spread',
        code: `function App() {
  const [items, setItems] = React.useState(['Apple', 'Banana']);
  const [input, setInput] = React.useState('');
  const renders = React.useRef(0);
  renders.current++;
  function addBroken() {
    items.push(input || 'New item'); // ❌ same reference
    setItems(items);
    setInput('');
  }
  function addFixed() {
    setItems([...items, input || 'New item']); // ✅ new array
    setInput('');
  }
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Renders: {renders.current}</p>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Item name…"
        style={{ padding: '7px 12px', borderRadius: 6, border: '1.5px solid #e2e8f0' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={addBroken}
          style={{ flex:1, padding:'7px', borderRadius:6, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', cursor:'pointer' }}>
          ❌ Mutate (broken)
        </button>
        <button onClick={addFixed}
          style={{ flex:1, padding:'7px', borderRadius:6, background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#15803d', cursor:'pointer' }}>
          ✅ Spread (fixed)
        </button>
      </div>
      <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
        {items.map((item, i) => <li key={i} style={{ fontSize: 14 }}>{item}</li>)}
      </ul>
    </div>
  );
}` },
      { label: 'Infinite useEffect loop',
        code: `function App() {
  const [safeCount, setSafeCount] = React.useState(0);
  const [log, setLog] = React.useState([]);

  // ✅ SAFE: empty deps — runs once
  React.useEffect(() => {
    setLog(l => [...l, '✅ Mount effect ran once']);
  }, []);

  // ✅ SAFE: safeCount in deps but we don't set safeCount inside
  React.useEffect(() => {
    document.title = 'Count: ' + safeCount;
  }, [safeCount]);

  // ⚠️ DANGEROUS (commented out — would freeze the app):
  // React.useEffect(() => {
  //   setSafeCount(c => c + 1); // triggers re-render → runs effect → triggers re-render…
  // }, [safeCount]);

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button onClick={() => setSafeCount(c => c + 1)}
        style={{ padding: '7px 16px', borderRadius: 6, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Click ({safeCount}) — check page title
      </button>
      <div style={{ fontSize: 12, fontFamily: 'monospace', background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <pre style={{ fontSize: 11, background: '#1e293b', color: '#e2e8f0', padding: 12, borderRadius: 8, margin: 0 }}>{
\`// INFINITE LOOP (don't do this):
useEffect(() => {
  setCount(c => c + 1); // ← triggers re-render
}, [count]);            // ← count changed → effect runs again

// FIX: functional update, empty deps:
useEffect(() => {
  setCount(c => c + 1);
}, []); // runs once\`
      }</pre>
    </div>
  );
}` },
    ],
  },

  // ── Chapter 24: Real-World Patterns ───────────────────────────────────────────
  {
    id: 'skeleton-loading',
    chapter: 'Real-World Patterns',
    title: 'Skeleton Loading',
    type: 'live',
    concept: '**Skeleton screens** show the layout shape while data loads — better UX than a spinner because users understand what\'s coming. Build skeletons with a shimmer CSS animation on a gradient background. Match the skeleton shape exactly to your real content layout.',
    code: `function Skeleton({ width = '100%', height = 16, radius = 6, style = {} }) {
  return (
    <div style={{ width, height, borderRadius: radius,
      background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)',
      backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', ...style }} />
  );
}
function UserCardSkeleton() {
  return (
    <div style={{ display:'flex', gap:12, padding:14, border:'1px solid #e2e8f0', borderRadius:10 }}>
      <Skeleton width={44} height={44} radius="50%" />
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8, justifyContent:'center' }}>
        <Skeleton width="55%" height={13} />
        <Skeleton width="35%" height={11} />
      </div>
    </div>
  );
}
function UserCard({ user }) {
  return (
    <div style={{ display:'flex', gap:12, padding:14, border:'1px solid #e2e8f0', borderRadius:10, alignItems:'center' }}>
      <div style={{ width:44,height:44,borderRadius:'50%',background:'#4f46e5',display:'flex',
        alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:16,flexShrink:0 }}>
        {user.name[0]}
      </div>
      <div>
        <p style={{ margin:0,fontWeight:700,fontSize:14 }}>{user.name}</p>
        <p style={{ margin:'3px 0 0',fontSize:12,color:'#6b7280' }}>{user.role}</p>
      </div>
    </div>
  );
}
const USERS = [
  { id:1, name:'Alice Chen',   role:'Frontend Engineer' },
  { id:2, name:'Bob Martinez', role:'Product Designer' },
  { id:3, name:'Carol Smith',  role:'Engineering Manager' },
];
function App() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}';
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  function load() {
    setLoading(true); setUsers([]);
    setTimeout(() => { setUsers(USERS); setLoading(false); }, 2000);
  }
  React.useEffect(() => { load(); }, []);
  return (
    <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <strong style={{ fontSize:14 }}>Team</strong>
        <button onClick={load} style={{ fontSize:12, padding:'4px 12px', borderRadius:6,
          border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer' }}>Reload</button>
      </div>
      {loading ? [1,2,3].map(i=><UserCardSkeleton key={i}/>) : users.map(u=><UserCard key={u.id} user={u}/>)}
    </div>
  );
}`,
  },

  {
    id: 'responsive-patterns',
    chapter: 'Real-World Patterns',
    title: 'Responsive Patterns',
    type: 'live',
    concept: 'A `useWindowSize` hook re-renders on resize. A `useBreakpoint` hook returns a named breakpoint (`"sm" | "md" | "lg"`). Use these to conditionally render different layouts or components — going beyond CSS when JavaScript behaviour also needs to change.',
    code: `function useWindowSize() {
  const [size, setSize] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return size;
}
function useBreakpoint() {
  const { w } = useWindowSize();
  if (w < 640) return 'sm';
  if (w < 1024) return 'md';
  return 'lg';
}
function MobileNav() {
  return (
    <nav style={{ display:'flex', gap:4, padding:'8px 12px', background:'#1e293b', borderRadius:8, justifyContent:'space-around' }}>
      {['🏠','🔍','❤️','👤'].map(icon=>(
        <button key={icon} style={{ background:'none',border:'none',fontSize:20,cursor:'pointer' }}>{icon}</button>
      ))}
    </nav>
  );
}
function DesktopNav() {
  return (
    <nav style={{ display:'flex', gap:8, padding:'8px 16px', background:'#1e293b', borderRadius:8 }}>
      {['Home','Search','Favourites','Profile'].map(label=>(
        <button key={label} style={{ background:'none',border:'none',color:'#e2e8f0',
          fontSize:13,fontWeight:600,cursor:'pointer',padding:'4px 10px',borderRadius:4 }}>{label}</button>
      ))}
    </nav>
  );
}
function App() {
  const { w } = useWindowSize();
  const bp = useBreakpoint();
  return (
    <div style={{ padding:16, display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'flex', gap:8 }}>
        {['sm','md','lg'].map(b=>(
          <span key={b} style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700,
            background: bp===b?'#4f46e5':'#f1f5f9', color: bp===b?'#fff':'#64748b' }}>{b}</span>
        ))}
      </div>
      <p style={{ fontSize:12,color:'#6b7280',margin:0 }}>Window: {w}px · Breakpoint: <strong>{bp}</strong></p>
      {bp === 'sm' ? <MobileNav /> : <DesktopNav />}
      <p style={{ fontSize:11,color:'#94a3b8',margin:0 }}>Resize the preview panel to switch breakpoints.</p>
    </div>
  );
}`,
  },

  {
    id: 'real-api-patterns',
    chapter: 'Real-World Patterns',
    title: 'Real-World API Patterns',
    type: 'picker',
    concept: 'Production API calls need: **AbortController** to cancel stale requests on unmount, **retry logic** for transient failures, and **pagination** to load data in pages. These patterns are foundational for any data-driven React app.',
    challenge: { question: 'What does AbortController do in a fetch request?', options: ['Speeds up the request', 'Cancels an in-flight request when the component unmounts or a new request starts', 'Adds authentication headers', 'Retries on failure'], correct: 1 },
    options: [
      { label: 'AbortController',
        code: `function App() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [status, setStatus] = React.useState('idle');
  const DATA = ['React','Redux','Router','Remix','Relay','Recoil','Radix','Recharts'];

  React.useEffect(() => {
    if (!query.trim()) { setResults([]); setStatus('idle'); return; }
    const controller = new AbortController();
    setStatus('loading');
    const t = setTimeout(async () => {
      try {
        await new Promise((res, rej) => {
          const timer = setTimeout(res, 500);
          controller.signal.addEventListener('abort', () => { clearTimeout(timer); rej(new DOMException('Aborted')); });
        });
        if (controller.signal.aborted) return;
        setResults(DATA.filter(r => r.toLowerCase().includes(query.toLowerCase())));
        setStatus('success');
      } catch(e) { if (e.name !== 'AbortError') setStatus('error'); }
    }, 300);
    return () => { clearTimeout(t); controller.abort(); };
  }, [query]);

  return (
    <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10, maxWidth:300 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search React libs…"
        style={{ padding:'8px 12px', borderRadius:6, border:'1.5px solid #e2e8f0', fontSize:14 }} />
      <p style={{ margin:0, fontSize:11, color:'#6b7280' }}>
        {status==='loading'?'⏳ Searching…':status==='success'?results.length+' results':'Type to search'}
      </p>
      <ul style={{ margin:0, padding:'0 0 0 20px' }}>
        {results.map(r=><li key={r} style={{ fontSize:14, padding:'2px 0' }}>{r}</li>)}
      </ul>
    </div>
  );
}` },
      { label: 'Pagination',
        code: `const ALL = Array.from({length:23},(_,i)=>({id:i+1,name:['useEffect','useState','useRef','useMemo','useCallback','useContext','useReducer','useId','useTransition','useDeferredValue','useLayoutEffect','useImperativeHandle','useDebugValue','useSyncExternalStore','forwardRef','React.memo','React.lazy','Suspense','createContext','createPortal','StrictMode','Fragment','Children'][i],type:i<14?'Hook':'API'}));
const PAGE = 5;
function App() {
  const [page,setPage]=React.useState(1);
  const [loading,setLoading]=React.useState(false);
  const [items,setItems]=React.useState([]);
  const total=Math.ceil(ALL.length/PAGE);
  async function loadPage(p){
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));
    setItems(ALL.slice((p-1)*PAGE,p*PAGE));
    setPage(p); setLoading(false);
  }
  React.useEffect(()=>{loadPage(1);},[]);
  return(
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <strong style={{fontSize:14}}>React APIs ({ALL.length})</strong>
        <span style={{fontSize:12,color:'#6b7280'}}>Page {page}/{total}</span>
      </div>
      <div style={{minHeight:150}}>
        {loading?<p style={{color:'#6b7280',fontSize:14}}>⏳ Loading…</p>:
          items.map(item=>(
            <div key={item.id} style={{display:'flex',justifyContent:'space-between',
              padding:'6px 10px',background:'#f8fafc',borderRadius:6,marginBottom:5,fontSize:13}}>
              <span style={{fontFamily:'monospace'}}>{item.name}</span>
              <span style={{fontSize:11,color:item.type==='Hook'?'#4f46e5':'#059669',fontWeight:700}}>{item.type}</span>
            </div>
          ))}
      </div>
      <div style={{display:'flex',gap:5,justifyContent:'center'}}>
        <button onClick={()=>loadPage(page-1)} disabled={page===1||loading}
          style={{padding:'5px 10px',borderRadius:6,border:'1px solid #e2e8f0',cursor:'pointer',opacity:page===1?.4:1}}>←</button>
        {Array.from({length:total},(_,i)=>i+1).map(p=>(
          <button key={p} onClick={()=>loadPage(p)} disabled={loading}
            style={{padding:'5px 9px',borderRadius:6,border:'none',cursor:'pointer',
              background:p===page?'#4f46e5':'#f1f5f9',color:p===page?'#fff':'#1e293b',fontWeight:p===page?700:400}}>{p}</button>
        ))}
        <button onClick={()=>loadPage(page+1)} disabled={page===total||loading}
          style={{padding:'5px 10px',borderRadius:6,border:'1px solid #e2e8f0',cursor:'pointer',opacity:page===total?.4:1}}>→</button>
      </div>
    </div>
  );
}` },
    ],
  },

  {
    id: 'state-at-scale',
    chapter: 'Real-World Patterns',
    title: 'State Management at Scale',
    type: 'live',
    concept: 'When `useContext` causes too many re-renders, external state libraries help. **Zustand** (shown here) is lightweight — one `create()` call defines a store that any component can read with a selector. Components only re-render when their selected slice changes.',
    challenge: { question: 'What problem does Zustand solve that useContext doesn\'t handle well?', options: ['Cross-tab state sync', 'Any consumer re-renders when any part of the context changes even parts it doesn\'t use', 'Async state updates', 'TypeScript typing'], correct: 1 },
    code: `// Minimal Zustand-like store — same API pattern, no external library needed.
function createStore(init) {
  let state; const listeners = new Set();
  function set(partial) {
    state = {...state,...(typeof partial==='function'?partial(state):partial)};
    listeners.forEach(l=>l());
  }
  function get() { return state; }
  state = init(set,get);
  function useStore(selector) {
    const [val,setVal] = React.useState(()=>selector(state));
    React.useEffect(()=>{
      const update=()=>setVal(selector(state));
      listeners.add(update);
      return ()=>listeners.delete(update);
    },[]);
    return val;
  }
  return useStore;
}

const useCart = createStore((set)=>({
  items:[],total:0,
  add:(name,price)=>set(s=>({items:[...s.items,{id:Date.now(),name,price}],total:+(s.total+price).toFixed(2)})),
  remove:(id)=>set(s=>{const item=s.items.find(i=>i.id===id);return{items:s.items.filter(i=>i.id!==id),total:+(s.total-(item?.price||0)).toFixed(2)};},),
  clear:()=>set({items:[],total:0}),
}));

function CartBadge() {
  const count = useCart(s=>s.items.length);
  return <span style={{background:'#4f46e5',color:'#fff',borderRadius:20,padding:'1px 8px',fontSize:11,fontWeight:700}}>{count}</span>;
}
function CartTotal() {
  const total = useCart(s=>s.total);
  return <strong>\${total.toFixed(2)}</strong>;
}
function CartItems() {
  const {items,remove} = useCart(s=>({items:s.items,remove:s.remove}));
  return (
    <ul style={{margin:0,padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:4}}>
      {items.map(item=>(
        <li key={item.id} style={{display:'flex',justifyContent:'space-between',
          padding:'5px 10px',background:'#f8fafc',borderRadius:6,fontSize:13}}>
          <span>{item.name} — \${item.price}</span>
          <button onClick={()=>remove(item.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#dc2626',fontSize:16}}>×</button>
        </li>
      ))}
    </ul>
  );
}
const PRODUCTS=[['Coffee',3.50],['Book',12.99],['Pen',1.99],['Notebook',6.49]];
function App() {
  const {add,clear} = useCart(s=>({add:s.add,clear:s.clear}));
  return (
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{display:'flex',alignItems:'center',gap:8}}>🛒 Cart <CartBadge/></span>
        <CartTotal/>
      </div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {PRODUCTS.map(([name,price])=>(
          <button key={name} onClick={()=>add(name,price)}
            style={{padding:'5px 12px',borderRadius:6,border:'1px solid #e2e8f0',background:'#f8fafc',cursor:'pointer',fontSize:12}}>
            + {name} \${price}
          </button>
        ))}
        <button onClick={clear} style={{padding:'5px 12px',borderRadius:6,border:'none',background:'#fee2e2',color:'#dc2626',cursor:'pointer',fontSize:12}}>Clear</button>
      </div>
      <CartItems/>
    </div>
  );
}`,
  },

  // ── Chapter 25: Advanced TypeScript (extra) ────────────────────────────────────
  {
    id: 'typescript-advanced',
    chapter: 'TypeScript with React',
    title: 'Advanced TypeScript Patterns',
    type: 'picker',
    concept: '**Discriminated unions** make impossible states impossible at the type level. **Generic components** work with any data while staying type-safe. These patterns eliminate entire categories of runtime bugs at compile time.',
    options: [
      { label: 'Discriminated unions',
        code: `// Discriminated union: 'status' field narrows the type.
// TypeScript knows data only exists when status==='success'.
function useAsync(fn) {
  const [state,setState]=React.useState({status:'idle'});
  async function run(...args){
    setState({status:'loading'});
    try{const data=await fn(...args);setState({status:'success',data});}
    catch(err){setState({status:'error',error:err.message});}
  }
  return [state,run];
}
async function fetchUser(id){
  await new Promise(r=>setTimeout(r,800));
  if(id===3) throw new Error('User 3 not found');
  return {id,name:['','Alice','Bob',''][id],role:['','Engineer','Designer',''][id]};
}
function App(){
  const [state,run]=useAsync(fetchUser);
  return(
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',gap:8}}>
        {[1,2,3].map(id=>(
          <button key={id} onClick={()=>run(id)}
            style={{padding:'6px 14px',borderRadius:6,border:'1px solid #e2e8f0',background:'#f8fafc',cursor:'pointer',fontSize:13}}>
            User {id}{id===3?' (error)':''}
          </button>
        ))}
      </div>
      {state.status==='idle'    &&<p style={{color:'#6b7280',fontSize:14}}>Select a user</p>}
      {state.status==='loading' &&<p style={{color:'#6b7280',fontSize:14}}>⏳ Loading…</p>}
      {state.status==='success' &&<div style={{padding:12,background:'#f0fdf4',borderRadius:8,fontSize:14}}><strong>{state.data.name}</strong> — {state.data.role}</div>}
      {state.status==='error'   &&<div style={{padding:12,background:'#fef2f2',borderRadius:8,color:'#dc2626',fontSize:14}}>❌ {state.error}</div>}
      <pre style={{fontSize:10,background:'#1e293b',color:'#e2e8f0',padding:10,borderRadius:8,margin:0}}>{
\`type State<T> =
  | {status:'idle'}
  | {status:'loading'}
  | {status:'success'; data:T}   // data only here
  | {status:'error'; error:string}; // error only here\`}</pre>
    </div>
  );
}` },
      { label: 'Generic components',
        code: `// Generic <List<T>> works with any data type.
function List({items,renderItem,keyFn,emptyText='No items'}){
  if(!items.length) return <p style={{color:'#6b7280',fontSize:13}}>{emptyText}</p>;
  return(
    <ul style={{margin:0,padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:6}}>
      {items.map((item,i)=><li key={keyFn?keyFn(item):i}>{renderItem(item)}</li>)}
    </ul>
  );
}
const users=[{id:1,name:'Alice',score:94},{id:2,name:'Bob',score:87}];
const tags=['React','TypeScript','Next.js','Tailwind'];
const prices=[9.99,19.99,4.99];
function App(){
  const [view,setView]=React.useState('users');
  return(
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',gap:8}}>
        {['users','tags','prices'].map(v=>(
          <button key={v} onClick={()=>setView(v)}
            style={{padding:'5px 12px',borderRadius:6,cursor:'pointer',border:'1px solid #e2e8f0',fontSize:12,
              background:view===v?'#4f46e5':'#f8fafc',color:view===v?'#fff':'#1e293b'}}>{v}</button>
        ))}
      </div>
      {view==='users'&&<List items={users} keyFn={u=>u.id} renderItem={u=>(
        <div style={{display:'flex',justifyContent:'space-between',padding:'6px 12px',background:'#f8fafc',borderRadius:6,fontSize:13}}>
          <span>{u.name}</span><strong style={{color:u.score>=90?'#059669':'#f59e0b'}}>{u.score}</strong>
        </div>)}/>}
      {view==='tags'&&<List items={tags} renderItem={t=>(
        <span style={{display:'inline-block',padding:'3px 10px',borderRadius:20,background:'#eef2ff',color:'#4f46e5',fontSize:12,fontWeight:600}}>{t}</span>)}/>}
      {view==='prices'&&<List items={prices} renderItem={p=>(
        <span style={{fontFamily:'monospace',fontSize:14,fontWeight:700}}>\${p.toFixed(2)}</span>)}/>}
    </div>
  );
}` },
    ],
  },

  // ── Chapter 26: Testing (extended) ────────────────────────────────────────────
  {
    id: 'testing-strategy',
    chapter: 'Testing',
    title: 'Testing Strategy',
    type: 'picker',
    concept: '**Unit tests** test one pure function. **Integration tests** test components together through user interactions. **E2E tests** (Cypress, Playwright) run in a real browser. The Testing Trophy says integration tests give the most value. Key rule: **test behaviour, not implementation** — test what the user sees, not internal state.',
    challenge: { question: 'What does "test behaviour, not implementation" mean?', options: ['Test the component\'s internal state variables directly', 'Test what the user sees and does, not internal method names or state', 'Only write E2E tests', 'Never mock anything'], correct: 1 },
    options: [
      { label: 'Unit tests (pure functions)',
        code: `function formatPrice(cents){return '$'+(cents/100).toFixed(2);}
function validateEmail(email){return /^[^@]+@[^@]+\.[^@]+$/.test(email.trim());}
function capitalize(str){return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();}
function clamp(value,min,max){return Math.min(Math.max(value,min),max);}

function expect(actual){
  return {
    toBe:expected=>{if(actual!==expected)throw new Error(\`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`);},
    toBeTruthy:()=>{if(!actual)throw new Error(\`Expected truthy\`);},
    toBeFalsy:()=>{if(actual)throw new Error(\`Expected falsy\`);},
  };
}
function it(name,fn){try{fn();return{name,pass:true};}catch(e){return{name,pass:false,error:e.message};}}

const results=[
  it('formatPrice 999→$9.99',()=>expect(formatPrice(999)).toBe('$9.99')),
  it('formatPrice 0→$0.00',()=>expect(formatPrice(0)).toBe('$0.00')),
  it('email valid passes',()=>expect(validateEmail('a@b.com')).toBeTruthy()),
  it('email no-@ fails',()=>expect(validateEmail('notanemail')).toBeFalsy()),
  it('capitalize hello→Hello',()=>expect(capitalize('hello')).toBe('Hello')),
  it('clamp 5 in [0,10]→5',()=>expect(clamp(5,0,10)).toBe(5)),
  it('clamp -1 in [0,10]→0',()=>expect(clamp(-1,0,10)).toBe(0)),
  it('clamp 15 in [0,10]→10',()=>expect(clamp(15,0,10)).toBe(10)),
];
function App(){
  const pass=results.filter(r=>r.pass).length;
  return(
    <div style={{padding:16,fontFamily:'monospace',fontSize:12}}>
      <p style={{fontWeight:700,fontSize:14,margin:'0 0 10px'}}>
        {pass===results.length?'✅':'⚠️'} {pass}/{results.length} tests passed
      </p>
      {results.map((r,i)=>(
        <div key={i} style={{padding:'4px 8px',borderRadius:4,marginBottom:3,
          background:r.pass?'#f0fdf4':'#fef2f2',color:r.pass?'#15803d':'#dc2626'}}>
          {r.pass?'✓':'✗'} {r.name}
          {!r.pass&&<span style={{display:'block',fontSize:10,opacity:.8}}>{r.error}</span>}
        </div>
      ))}
    </div>
  );
}` },
      { label: 'Component tests (behaviour)',
        code: `function Counter({min=0,max=10,initial=0}){
  const [count,setCount]=React.useState(initial);
  return(
    <div data-testid="counter" style={{display:'flex',alignItems:'center',gap:10}}>
      <button aria-label="decrement" onClick={()=>setCount(c=>Math.max(min,c-1))} disabled={count<=min}
        style={{width:32,height:32,borderRadius:'50%',border:'1px solid #e2e8f0',
          background:'#f8fafc',cursor:count<=min?'default':'pointer',fontSize:18}}>−</button>
      <span aria-label="count" style={{fontSize:20,fontWeight:700,minWidth:30,textAlign:'center'}}>{count}</span>
      <button aria-label="increment" onClick={()=>setCount(c=>Math.min(max,c+1))} disabled={count>=max}
        style={{width:32,height:32,borderRadius:'50%',border:'none',
          background:count>=max?'#e2e8f0':'#4f46e5',color:count>=max?'#94a3b8':'#fff',
          cursor:count>=max?'default':'pointer',fontSize:18}}>+</button>
      <button onClick={()=>setCount(initial)}
        style={{fontSize:11,padding:'4px 10px',borderRadius:6,border:'1px solid #e2e8f0',background:'#f8fafc',cursor:'pointer'}}>Reset</button>
    </div>
  );
}
function App(){
  const ref=React.useRef(null);
  const [results,setResults]=React.useState([]);
  function run(){
    const c=ref.current;
    const byLabel=label=>[...c.querySelectorAll('[aria-label]')].find(el=>el.getAttribute('aria-label')===label);
    const text=label=>byLabel(label)?.textContent?.trim();
    const click=el=>el?.click();
    const res=[];
    function test(name,fn){try{fn();res.push({name,pass:true});}catch(e){res.push({name,pass:false,error:e.message});}}
    function assert(cond,msg){if(!cond)throw new Error(msg);}
    [...c.querySelectorAll('button')].find(b=>b.textContent==='Reset')?.click();
    test('starts at 0',()=>assert(text('count')==='0','Should be 0'));
    test('increment → 1',()=>{click(byLabel('increment'));assert(text('count')==='1','Should be 1');});
    test('decrement → 0',()=>{click(byLabel('decrement'));assert(text('count')==='0','Should be 0');});
    test('cannot go below min',()=>{click(byLabel('decrement'));assert(text('count')==='0','Should stay 0');});
    test('reset returns to 0',()=>{click(byLabel('increment'));click(byLabel('increment'));[...c.querySelectorAll('button')].find(b=>b.textContent==='Reset')?.click();assert(text('count')==='0','Should reset');});
    setResults(res);
  }
  const pass=results.filter(r=>r.pass).length;
  return(
    <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
      <div ref={ref}><Counter/></div>
      <button onClick={run} style={{padding:'7px 20px',borderRadius:6,background:'#1e293b',color:'#fff',border:'none',cursor:'pointer',fontSize:13}}>▶ Run tests</button>
      {results.length>0&&(
        <div style={{fontFamily:'monospace',fontSize:12}}>
          <p style={{margin:'0 0 6px',fontWeight:700}}>{pass===results.length?'✅':'⚠️'} {pass}/{results.length} passed</p>
          {results.map((r,i)=>(
            <div key={i} style={{padding:'3px 8px',borderRadius:4,marginBottom:3,
              background:r.pass?'#f0fdf4':'#fef2f2',color:r.pass?'#15803d':'#dc2626'}}>
              {r.pass?'✓':'✗'} {r.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}` },
    ],
  },

  // ── Chapter 27: Internationalisation ─────────────────────────────────────────
  {
    id: 'i18n-basics',
    chapter: 'Internationalisation',
    title: 'i18n Basics',
    type: 'live',
    concept: 'Internationalisation (i18n) makes your app work in multiple languages. The pattern: store strings in translation objects keyed by locale, create a `useTranslation` hook returning a `t(key)` function, and use `Intl.NumberFormat` / `Intl.DateTimeFormat` for locale-aware formatting. Libraries like `react-i18next` follow this same pattern at scale.',
    code: `const translations={
  en:{greeting:'Hello, {name}!',balance:'Your balance',lastLogin:'Last login',items:'{count} item|{count} items',save:'Save changes'},
  es:{greeting:'¡Hola, {name}!',balance:'Tu saldo',lastLogin:'Último acceso',items:'{count} artículo|{count} artículos',save:'Guardar cambios'},
  fr:{greeting:'Bonjour, {name} !',balance:'Votre solde',lastLogin:'Dernière connexion',items:'{count} article|{count} articles',save:'Enregistrer'},
  ja:{greeting:'こんにちは、{name}さん！',balance:'残高',lastLogin:'最終ログイン',items:'{count}件',save:'変更を保存'},
};
const I18nCtx=React.createContext({locale:'en',t:k=>k});
function I18nProvider({locale,children}){
  const dict=translations[locale]||translations.en;
  function t(key,vars={}){
    let str=dict[key]||key;
    if(str.includes('|')&&vars.count!==undefined){
      const[s,p]=str.split('|').map(x=>x.trim());
      str=vars.count===1?s:p;
    }
    return str.replace(/\{(\w+)\}/g,(_,k)=>vars[k]??'');
  }
  return <I18nCtx.Provider value={{locale,t}}>{children}</I18nCtx.Provider>;
}
function useTranslation(){return React.useContext(I18nCtx);}
function Dashboard(){
  const{locale,t}=useTranslation();
  const balance=12450.75,date=new Date('2026-05-15T14:32:00'),count=3;
  const fmtCur=new Intl.NumberFormat(locale,{style:'currency',currency:'USD'}).format(balance);
  const fmtDate=new Intl.DateTimeFormat(locale,{dateStyle:'long',timeStyle:'short'}).format(date);
  return(
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <p style={{margin:0,fontSize:15,fontWeight:700}}>{t('greeting',{name:'Puneet'})}</p>
      <div style={{padding:12,background:'#f8fafc',borderRadius:8,border:'1px solid #e2e8f0'}}>
        <p style={{margin:0,fontSize:11,color:'#6b7280',textTransform:'uppercase',letterSpacing:'.05em'}}>{t('balance')}</p>
        <p style={{margin:'4px 0 0',fontWeight:800,fontSize:20}}>{fmtCur}</p>
      </div>
      <p style={{margin:0,fontSize:12,color:'#6b7280'}}>{t('lastLogin')}: {fmtDate}</p>
      <p style={{margin:0,fontSize:13}}>{t('items',{count})}</p>
      <button style={{padding:'7px 16px',borderRadius:6,background:'#4f46e5',color:'#fff',border:'none',cursor:'pointer',fontSize:13}}>{t('save')}</button>
    </div>
  );
}
function App(){
  const[locale,setLocale]=React.useState('en');
  const langs=[['en','🇺🇸 EN'],['es','🇪🇸 ES'],['fr','🇫🇷 FR'],['ja','🇯🇵 JA']];
  return(
    <I18nProvider locale={locale}>
      <div style={{padding:16,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{display:'flex',gap:6}}>
          {langs.map(([code,label])=>(
            <button key={code} onClick={()=>setLocale(code)}
              style={{padding:'5px 10px',borderRadius:6,cursor:'pointer',fontSize:12,
                background:locale===code?'#4f46e5':'#f8fafc',
                color:locale===code?'#fff':'#1e293b',
                border:'1px solid '+(locale===code?'#4f46e5':'#e2e8f0')}}>
              {label}
            </button>
          ))}
        </div>
        <Dashboard/>
      </div>
    </I18nProvider>
  );
}`,
  },

];

export const CHAPTERS = [...new Set(LESSONS.map(l => l.chapter))];
