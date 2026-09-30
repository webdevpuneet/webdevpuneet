// Snippet categories. Kept in their own tiny module so browser-side code
// (sidebar, header strip, galleries) can import them WITHOUT pulling in snippets.js
// — which bundles every snippet's html/css/js source.
export const CATEGORIES = [
  { id: 'all',        label: 'All categories' },
  { id: 'buttons',    label: 'Buttons' },
  { id: 'forms',      label: 'Forms' },
  { id: 'cards',      label: 'Cards' },
  { id: 'carousels',  label: 'Carousels & Sliders' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'footers',    label: 'Footers' },
  { id: 'modals',     label: 'Modals' },
  { id: 'tables',     label: 'Tables' },
  { id: 'charts',     label: 'Charts' },
  { id: 'loaders',    label: 'Loaders' },
  { id: 'animations', label: 'Animations' },
  { id: 'scroll',     label: 'Scroll Effects' },
  { id: 'layouts',    label: 'Layouts' },
  { id: 'media',      label: 'Media & Galleries' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'pricing',    label: 'Pricing' },
  { id: 'heroes',     label: 'Heroes' },
  { id: 'mobile',     label: 'Mobile Screens' },
  { id: 'games',      label: 'Games' },
  { id: 'tools',      label: 'Tools & Calculators' },
  { id: 'visualizers', label: 'Visualizers' },
  { id: 'misc',       label: 'Misc' },
  { id: 'dev',        label: '🛠 Dev', devOnly: true },
];
