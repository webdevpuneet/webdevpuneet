const apexchartsThemeToggleExport = {
  id: 'apexcharts-theme-toggle-export',
  title: 'ApexCharts Dark/Light Theme Toggle with PNG, SVG and CSV Export',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="ath-page" id="athPage" data-theme="light">
  <div class="ath-card">
    <div class="ath-head">
      <div>
        <div class="ath-title">Signups by Channel</div>
        <div class="ath-sub">Stacked area · last 14 weeks</div>
      </div>
      <div class="ath-actions">
        <button type="button" class="ath-btn" id="athTheme" aria-pressed="false">🌙 Dark</button>
        <button type="button" class="ath-btn" id="athPng">PNG</button>
        <button type="button" class="ath-btn" id="athSvg">SVG</button>
        <button type="button" class="ath-btn" id="athCsv">CSV</button>
      </div>
    </div>
    <div id="athChart"></div>
    <div class="ath-status" id="athStatus" role="status" aria-live="polite"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{margin:0;font-family:system-ui,-apple-system,sans-serif}
.ath-page{--bg:#f8fafc;--card:#fff;--line:#e2e8f0;--text:#0f172a;--muted:#64748b;--btn:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--bg);transition:background .25s}
.ath-page[data-theme="dark"]{--bg:#0b1020;--card:#131a2e;--line:#243049;--text:#e2e8f0;--muted:#8b98b8;--btn:#1c2540}
.ath-card{width:100%;max-width:820px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 18px 10px;transition:background .25s,border-color .25s}
.ath-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.ath-title{font-size:15px;font-weight:700;color:var(--text)}
.ath-sub{font-size:12px;color:var(--muted);margin-top:3px}
.ath-actions{display:flex;gap:6px;flex-wrap:wrap}
.ath-btn{border:1px solid var(--line);background:var(--btn);color:var(--text);border-radius:8px;padding:6px 11px;font:600 12px system-ui;cursor:pointer}
.ath-btn:hover{border-color:#6366f1}
.ath-btn:focus-visible{outline:2px solid #818cf8;outline-offset:2px}
.ath-status{min-height:18px;font-size:12px;color:var(--muted);padding:2px 6px}`,

  js: `var WEEKS = [];
for (var w = 1; w <= 14; w++) WEEKS.push('W' + w);
var SERIES = [
  { name: 'Organic',  data: [120, 132, 128, 141, 150, 162, 158, 171, 180, 176, 190, 204, 211, 226] },
  { name: 'Paid',     data: [80, 86, 95, 90, 102, 99, 110, 121, 118, 126, 131, 140, 138, 149] },
  { name: 'Referral', data: [30, 34, 33, 41, 38, 45, 52, 49, 58, 61, 66, 64, 72, 79] },
];

// Only the options that differ between themes. theme.mode switches
// ApexCharts' own text, tooltip and grid defaults; the rest is our palette.
function themeOptions(dark) {
  return {
    theme: { mode: dark ? 'dark' : 'light' },
    chart: { background: 'transparent', foreColor: dark ? '#9aa6c4' : '#475569' },
    grid: { borderColor: dark ? '#243049' : '#eef2f7' },
    colors: dark ? ['#818cf8', '#f472b6', '#34d399'] : ['#4f46e5', '#db2777', '#059669'],
    tooltip: { theme: dark ? 'dark' : 'light' },
  };
}

var base = {
  chart: {
    type: 'area',
    height: 330,
    stacked: true,
    fontFamily: 'system-ui, sans-serif',
    // The built-in toolbar has its own export menu; hidden here in favour
    // of explicit buttons, but the same methods power both.
    toolbar: { show: false },
  },
  series: SERIES,
  xaxis: { categories: WEEKS },
  stroke: { width: 2, curve: 'smooth' },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.08 } },
  dataLabels: { enabled: false },
  legend: { position: 'top', horizontalAlign: 'left' },
};

function merge(a, b) {
  var out = JSON.parse(JSON.stringify(a));
  Object.keys(b).forEach(function (k) {
    out[k] = typeof b[k] === 'object' && !Array.isArray(b[k]) ? Object.assign({}, out[k], b[k]) : b[k];
  });
  return out;
}

var page = document.getElementById('athPage');
var status = document.getElementById('athStatus');
var dark = false;
var chart = new ApexCharts(document.getElementById('athChart'), merge(base, themeOptions(false)));
chart.render();

document.getElementById('athTheme').addEventListener('click', function (e) {
  dark = !dark;
  page.dataset.theme = dark ? 'dark' : 'light';
  e.currentTarget.textContent = dark ? '☀️ Light' : '🌙 Dark';
  e.currentTarget.setAttribute('aria-pressed', String(dark));
  // updateOptions merges into the existing config and re-renders once.
  chart.updateOptions(themeOptions(dark));
});

function download(href, name) {
  var a = document.createElement('a');
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  status.textContent = 'Downloaded ' + name;
}

// dataURI() rasterises the chart to a PNG data URL (a promise). scale
// renders at 2x so the image stays sharp on high-DPI screens and in slides.
document.getElementById('athPng').addEventListener('click', function () {
  chart.dataURI({ scale: 2 }).then(function (r) { download(r.imgURI, 'signups-by-channel.png'); });
});

// The chart is already SVG, so the vector export is the chart's own markup.
document.getElementById('athSvg').addEventListener('click', function () {
  var svg = document.querySelector('#athChart svg').cloneNode(true);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  var blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
  var url = URL.createObjectURL(blob);
  download(url, 'signups-by-channel.svg');
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
});

// CSV is built from our own data, not scraped from the chart: the numbers
// in the file are exactly the numbers that were plotted.
document.getElementById('athCsv').addEventListener('click', function () {
  var rows = [['Week'].concat(SERIES.map(function (s) { return s.name; }))];
  WEEKS.forEach(function (wk, i) {
    rows.push([wk].concat(SERIES.map(function (s) { return s.data[i]; })));
  });
  var csv = rows.map(function (r) { return r.join(','); }).join(String.fromCharCode(10));
  var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  download(url, 'signups-by-channel.csv');
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
});`,

  seo: {
    title: 'ApexCharts Dark/Light Theme Toggle with PNG, SVG and CSV Export — Free Snippet',
    description: `A stacked area chart in ApexCharts that switches between light and dark themes in place, and exports a 2x PNG, the chart's own SVG, or a CSV built from the plotted data. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Theming and Export — One Chart, Two Themes, Three Downloads',
      description: `Charts are rarely looked at only in the dashboard. They get pasted into slides, dropped into reports and viewed in dark mode. This snippet covers both needs in one place: a theme switch that restyles the chart without recreating it, and three export buttons for the formats people actually ask for.

**Theme switching with updateOptions**

\`themeOptions(dark)\` returns only the settings that differ between themes: \`theme.mode\`, \`chart.foreColor\` (axis and legend text), grid colour, series colours and tooltip theme. The page uses CSS custom properties for its own colours; the chart receives the matching values through \`chart.updateOptions()\`, which merges into the existing config and redraws once. \`chart.background: 'transparent'\` lets the card's background show through in both themes.

**Brighter series colours in dark mode**

The same indigo that works on white looks muddy on navy. The dark palette uses lighter tints of the same hues, so each series keeps its identity across themes.

**PNG through dataURI**

\`chart.dataURI({ scale: 2 })\` returns a promise with a PNG data URL rendered at twice the size, so the image stays crisp in presentations. A temporary link with the \`download\` attribute saves it.

**SVG straight from the DOM**

ApexCharts draws SVG, so the vector export is the chart's own markup, cloned, given an \`xmlns\`, serialised and saved as a Blob.

**CSV from the source data**

The CSV is built from the arrays that were plotted, not scraped from the chart. That keeps the file exact and independent of formatting.

**Feedback for every action**

A polite live region announces each download for screen reader users.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `A stacked area chart renders in a light card.` },
      { title: 'Switch theme', text: `Click Dark; page and chart restyle without re-creating the chart.` },
      { title: 'Export', text: `Download a PNG, the SVG, or the data as CSV.` },
      { title: 'Reuse the pattern', text: `Put your theme differences in themeOptions() and call updateOptions.` },
    ] },
    features: [
      { title: 'In-place theme switch', text: `updateOptions merges only the theme differences.` },
      { title: 'Theme-aware palette', text: `Lighter series colours in dark mode.` },
      { title: 'Transparent chart background', text: `Card colours come from CSS variables.` },
      { title: 'High-DPI PNG', text: `dataURI with scale: 2.` },
      { title: 'Native SVG export', text: `The chart's own vector markup.` },
      { title: 'Exact CSV export', text: `Built from the plotted arrays.` },
      { title: 'Blob URL cleanup', text: `Object URLs revoked after download.` },
      { title: 'Announced actions', text: `A polite live region reports downloads.` },
    ],
    useCases: [
      { title: 'Dashboards with dark mode', text: `Keep charts consistent with the app theme.` },
      { title: 'Reporting tools', text: `Let users take charts into slides and docs.` },
      { title: 'Analytics products', text: `Offer raw data next to the visual.` },
      { title: 'Internal tools', text: `Quick exports without a reporting backend.` },
      { title: 'Learning ApexCharts', text: `A reference for theme.mode and dataURI.` },
      { icon: 'CODE', title: 'Related: Color Mode Toggle', desc: 'Pair it with a site-wide [Color Mode Toggle](/ui-snippets/color-mode-toggle/).' },
      { icon: 'CODE', title: 'Related: SheetJS Excel export', desc: 'For spreadsheet downloads see [SheetJS Table to Excel Export and Import](/ui-snippets/sheetjs-table-excel-export-import/).' },
    ],
    faqs: [
      { q: 'How do I switch an ApexCharts chart to dark mode?', a: `Call chart.updateOptions({ theme: { mode: 'dark' } }). theme.mode adjusts text, grid and tooltip defaults. For full control also update chart.foreColor, grid.borderColor and colors, and set chart.background to 'transparent' so your page background shows through.` },
      { q: 'How do I export an ApexCharts chart as PNG?', a: `Call chart.dataURI(), which returns a promise resolving to an object with imgURI, a PNG data URL. Pass { scale: 2 } for a higher-resolution image, then trigger a download with a temporary link element.` },
      { q: 'How do I get an SVG of the chart?', a: `The chart is rendered as an inline SVG element. Clone it, set the xmlns attribute, serialise it with XMLSerializer and save it as a Blob with type image/svg+xml.` },
      { q: 'Why build the CSV myself instead of using the toolbar?', a: `The toolbar menu can export CSV too. Building it from your own data gives you control over column names, number formatting and extra columns, and guarantees the file matches the source data exactly.` },
      { q: 'Does the theme switch recreate the chart?', a: `No. updateOptions merges the new options into the existing configuration and redraws once, keeping the instance, its event handlers and its state.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain what theme.mode changes by itself and what the snippet still sets manually. Ask it to follow the operating-system preference with matchMedia('(prefers-color-scheme: dark)'), to add an XLSX export, or to include a title and date in exported images. It can also check whether the dark palette keeps enough contrast between the three series.`,
      prompt: `Build a themeable, exportable stacked area chart with ApexCharts (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Show three signup channels over 14 weeks as a stacked area chart with a gradient fill.
- Style the page with CSS custom properties for light and dark themes and a toggle button with aria-pressed.
- On toggle, update the chart in place with only the theme-dependent options: theme mode, foreground text colour, grid colour, a lighter series palette for dark mode and tooltip theme, keeping the chart background transparent.
- Add a PNG export at 2x scale using the chart's dataURI method.
- Add an SVG export that serialises the chart's own SVG element.
- Add a CSV export built from the source data arrays with a header row.
- Announce each download in a polite live region and revoke object URLs after use.`,
    },
  },
};

export default apexchartsThemeToggleExport;
