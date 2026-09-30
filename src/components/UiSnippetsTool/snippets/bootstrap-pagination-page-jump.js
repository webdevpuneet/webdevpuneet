const bootstrapPaginationPageJump = {
  id: 'bootstrap-pagination-page-jump',
  title: 'Bootstrap Pagination with Page Jump Input',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <p class="text-muted small mb-3" id="bspageInfo">Page 1 of 24</p>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center bspage-list" id="bspageList"></ul>
  </nav>
  <div class="d-inline-flex align-items-center gap-2 mt-3">
    <span class="small text-muted">Jump to page</span>
    <input type="number" class="form-control form-control-sm" id="bspageInput" style="width:70px" min="1" max="24">
    <button class="btn btn-sm btn-dark" id="bspageGo">Go</button>
  </div>
</div>`,
  css: `.bspage-list .page-link { cursor: pointer; }
.bspage-list .page-item.disabled .page-link { cursor: default; }`,
  js: `const TOTAL = 24;
let current = 1;
const list = document.getElementById('bspageList');
const info = document.getElementById('bspageInfo');
const jumpInput = document.getElementById('bspageInput');

// A windowed page list: first, last, current, and one neighbour on each
// side, with "…" gaps — the same windowing shape a search-results pager
// needs once there are more pages than can reasonably fit on one row.
function pageWindow(cur, total) {
  const pages = new Set([1, total, cur, cur - 1, cur + 1]);
  const sorted = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  let prev = null;
  for (const p of sorted) {
    if (prev !== null && p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}

function render() {
  list.innerHTML = '';

  const prevLi = document.createElement('li');
  prevLi.className = 'page-item' + (current === 1 ? ' disabled' : '');
  prevLi.innerHTML = '<a class="page-link">‹ Prev</a>';
  prevLi.addEventListener('click', () => goTo(current - 1));
  list.appendChild(prevLi);

  pageWindow(current, TOTAL).forEach(p => {
    const li = document.createElement('li');
    if (p === '…') {
      li.className = 'page-item disabled';
      li.innerHTML = '<span class="page-link">…</span>';
    } else {
      li.className = 'page-item' + (p === current ? ' active' : '');
      li.innerHTML = '<a class="page-link">' + p + '</a>';
      li.addEventListener('click', () => goTo(p));
    }
    list.appendChild(li);
  });

  const nextLi = document.createElement('li');
  nextLi.className = 'page-item' + (current === TOTAL ? ' disabled' : '');
  nextLi.innerHTML = '<a class="page-link">Next ›</a>';
  nextLi.addEventListener('click', () => goTo(current + 1));
  list.appendChild(nextLi);

  info.textContent = 'Page ' + current + ' of ' + TOTAL;
  jumpInput.value = '';
}

function goTo(p) {
  if (p < 1 || p > TOTAL || p === current) return;
  current = p;
  render();
}

document.getElementById('bspageGo').addEventListener('click', () => {
  const val = parseInt(jumpInput.value, 10);
  if (!Number.isNaN(val)) goTo(Math.min(TOTAL, Math.max(1, val)));
});
jumpInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('bspageGo').click(); });

render();`,

  seo: {
    title: 'Bootstrap Pagination with Page Jump Input — Free Snippet',
    description: 'A real Bootstrap 5.3 pagination component with windowed page numbers, ellipsis gaps for long ranges, and a "jump to page" input for skipping straight to any page.',
    about: {
      title: 'Bootstrap Pagination with Page Jump Input — HTML, CSS & JavaScript',
      description: `Listing all 24 pages of a real result set would make Bootstrap's \`.pagination\` component unusably wide. This snippet builds a **windowed** pager on top of **real Bootstrap 5.3** pagination markup: it always shows the first page, the last page, the current page, and one neighbor on each side, with "…" filling any gap — the same windowing shape used by most real-world paginated interfaces, generated fresh from a \`pageWindow()\` function on every navigation rather than a fixed set of links.\n\nAlongside the pager, a small "Jump to page" number input lets a visitor skip straight to any page by number — clamped to the valid 1–24 range and submittable with either the Go button or Enter — for the common case where the page you want is many pages away from your current position and clicking Next repeatedly isn't reasonable.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads on page 1 of 24.' },
        { title: 'Click through pages', text: 'Click a page number, or Prev/Next — the windowed page list recalculates around your new position.' },
        { title: 'Jump to a distant page', text: 'Type "18" into the jump input and click Go (or press Enter) — it navigates straight there.' },
        { title: 'Try an out-of-range value', text: 'Type "99" and click Go — it clamps to the last real page (24) instead of breaking.' },
        { title: 'Adjust the total', text: 'Change the TOTAL constant in the JS panel to match your real result count.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 pagination component, loaded from the actual CDN',
      'Windowed page numbers with "…" gaps instead of listing every page',
      'Page-jump input clamped to the valid range, submittable via button or Enter key',
      'Prev/Next automatically disable at the first and last page',
      'Regenerates the whole page-number window from scratch on every navigation',
      'Scales to any total page count by changing one constant',
    ],
    useCases: [
      { icon: 'TABLE', title: 'Search results and data table pagination', desc: 'Any result set with more than a handful of pages benefits from windowed pagination plus a direct jump for large result sets.' },
      { icon: 'LEARN', title: 'Learning the windowed-pagination pattern', desc: 'A clean, from-scratch implementation of the ellipsis-windowing technique used by most production pagers.' },
      { icon: 'DASH',  title: 'Admin panels listing many records', desc: 'Pair with the Bootstrap Admin Dashboard snippet\'s orders table for a fully paginated records view.' },
      { icon: 'CODE',  title: 'Any long, page-based content archive', desc: 'Blog archives, product catalogs, or documentation indexes that span dozens of pages.' },
    ],
    faqs: [
      { q: 'Is this real Bootstrap pagination?', a: 'Yes — it uses Bootstrap 5.3\'s actual .pagination, .page-item, and .page-link classes loaded from the CDN; only the page-number generation logic and the jump input are custom.' },
      { q: 'How does the windowed page list work?', a: 'pageWindow() always includes page 1, the last page, the current page, and one page on either side of it, sorts them, and inserts a "…" wherever there\'s a gap larger than 1 between consecutive included pages.' },
      { q: 'What happens if I jump to an invalid page number?', a: 'The jump handler clamps the typed value to between 1 and the total page count with Math.min/Math.max, so an out-of-range or negative number always lands on a valid page instead of breaking.' },
      { q: 'Can I connect this to real data instead of a fake 24-page total?', a: 'Yes — replace the TOTAL constant with your real page count (e.g. from an API response), and wire goTo() to actually fetch/render that page\'s data instead of just updating the display.' },
      { q: 'Does pressing Enter in the jump input work, not just clicking Go?', a: 'Yes — a keydown listener on the input triggers the same Go logic when the Enter key is pressed, so keyboard-only use works identically to clicking.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to sync the current page to a ?page= URL query parameter so back/forward navigation and direct links work, or to add a "results per page" selector that recalculates TOTAL from a fixed result count. It's also a good exercise to ask the assistant to add keyboard shortcuts (left/right arrow keys) for Prev/Next.`,
      prompt: `Build a Bootstrap 5.3 pagination component with a page-jump input, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Use Bootstrap's real pagination component (ul.pagination, li.page-item, a.page-link) for a result set of at least 20 pages.
- Implement windowed pagination: always show the first page, the last page, the current page, and one page on either side of the current page, with "…" filling any gaps — regenerate this window from scratch on every page change, not as a fixed static list.
- Prev/Next controls that disable (via Bootstrap's disabled class) at the first and last page respectively.
- A separate numeric input with a "Go" button (and Enter-key support) that jumps directly to any typed page number, clamped to the valid range so an out-of-bounds value doesn't break anything.`,
    },
  },
};

export default bootstrapPaginationPageJump;
