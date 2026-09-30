const bootstrapMaintenanceBanner = {
  id: 'bootstrap-maintenance-banner',
  title: 'Bootstrap Maintenance Mode Banner',
  lastmod: '2026-09-11',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="bsmaint-page">
    <div class="alert alert-warning d-flex justify-content-between align-items-center mb-0 rounded-0" id="bsmaintBanner">
      <span class="small">&#9888; Scheduled maintenance begins in <strong id="bsmaintCountdown">--:--:--</strong>. The app may be briefly unavailable.</span>
      <button type="button" class="btn-close" id="bsmaintDismiss" aria-label="Dismiss"></button>
    </div>
    <div class="bsmaint-body p-4 text-center">
      <h6 class="fw-bold mb-1">Dashboard</h6>
      <p class="small text-muted mb-3">The rest of the app underneath the banner.</p>
      <button type="button" class="btn btn-sm btn-outline-secondary" id="bsmaintReload">Reload page (demo)</button>
    </div>
  </div>
</div>`,
  css: `.bsmaint-page { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; overflow: hidden; }
.bsmaint-body { background: #fff; }`,
  js: `const KEY = 'bsmaint-dismissed-demo';
const banner = document.getElementById('bsmaintBanner');
const countdown = document.getElementById('bsmaintCountdown');

// A fixed target a couple hours out, so the countdown has something real to
// count down to for this preview.
const target = Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000;

function pad(n) { return String(n).padStart(2, '0'); }

function renderCountdown() {
  const diff = Math.max(0, target - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdown.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
}

function applyDismissedState() {
  let dismissed = false;
  try { dismissed = sessionStorage.getItem(KEY) === '1'; } catch (e) { /* storage unavailable — banner just always shows */ }
  banner.classList.toggle('d-none', dismissed);
}

document.getElementById('bsmaintDismiss').addEventListener('click', () => {
  banner.classList.add('d-none');
  try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* nothing to persist, banner reappears each load */ }
});

// There's no real page reload to demo inside this preview, so this button
// re-runs exactly the same check a real reload's initial page load would —
// proving the dismissal genuinely persisted rather than just hiding the DOM.
document.getElementById('bsmaintReload').addEventListener('click', applyDismissedState);

applyDismissedState();
renderCountdown();
setInterval(renderCountdown, 1000);`,

  seo: {
    title: 'Bootstrap Maintenance Mode Banner — Free HTML CSS JS Snippet',
    description: 'A real, dismissible Bootstrap 5.3 maintenance-window banner with a live countdown, non-blocking so the app stays fully usable underneath — dismissal persists via sessionStorage across a reload.',
    about: {
      title: 'Bootstrap Maintenance Mode Banner — HTML, CSS & JavaScript',
      description: `This is deliberately not the same thing as a full maintenance takeover page like [bootstrap-maintenance-page](/ui-snippets/bootstrap-maintenance-page/) — that pattern replaces the entire app because it's actually down; this banner announces an *upcoming* window while the app underneath is still completely usable, which is why it's a plain dismissible Bootstrap \`alert\` sitting above normal page content rather than a takeover.\n\nThe countdown is computed fresh every second from a fixed \`target\` timestamp via \`renderCountdown()\`, converting the millisecond difference into hours/minutes/seconds with plain division and modulo — no date library needed for a straightforward countdown like this one.\n\nDismissal is real, persisted state, not just a hidden DOM node — clicking the close button writes to \`sessionStorage\`, guarded in try/catch the same way this collection's other storage-backed snippets are, so a blocked or unavailable storage API just means the banner reappears every load rather than breaking. Because this preview can't trigger an actual page reload, the "Reload page (demo)" button re-runs \`applyDismissedState()\` — the exact same check a fresh page load would perform — which is what proves the dismissal is genuinely being read back from storage rather than merely toggling a CSS class that a real reload would immediately undo.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A warning banner shows above the app content with a live countdown ticking down every second.' },
        { title: 'Interact with the app below the banner', text: 'It\'s fully usable — the banner is informational, not a blocking overlay.' },
        { title: 'Click the \\u00d7 to dismiss the banner', text: 'It disappears immediately, and the dismissal is saved.' },
        { title: 'Click "Reload page (demo)"', text: 'The banner stays hidden, proving the dismissal genuinely persisted rather than just being a one-time CSS toggle.' },
      ],
    },
    features: [
      'A non-blocking banner — the app underneath stays fully interactive, unlike a full maintenance takeover page',
      'A live countdown recomputed every second from one fixed target timestamp, no date library required',
      'Dismissal is saved to sessionStorage, guarded against a blocked or unavailable storage API',
      'The demo "Reload" action re-runs the real dismissed-state check rather than faking persistence',
      'Uses Bootstrap\'s genuine dismissible alert component as the banner\'s foundation',
    ],
    useCases: [
      { icon: 'APP', title: 'Announcing a scheduled maintenance window in advance', desc: 'Distinct from [bootstrap-maintenance-page](/ui-snippets/bootstrap-maintenance-page/), which is for the actual downtime itself rather than the advance warning.' },
      { icon: 'APP', title: 'Layering a second connectivity-related banner on the same page', desc: 'See [bootstrap-offline-online-status-banner](/ui-snippets/bootstrap-offline-online-status-banner/) for the same non-blocking top-banner pattern applied to real-time connectivity instead of a scheduled window.' },
      { icon: 'DASH', title: 'SaaS dashboards and admin tools', desc: 'Give users advance notice of a deploy or migration window without forcing them out of what they\'re currently doing.' },
      { icon: 'FORM', title: 'Any product-wide announcement that shouldn\'t reappear once dismissed', desc: 'The sessionStorage dismissal pattern generalizes to any "seen it, don\'t show again this session" banner.' },
    ],
    faqs: [
      { q: 'Why sessionStorage instead of localStorage?', a: 'sessionStorage means the dismissal only lasts for the current browser tab/session — a maintenance window is a temporary, time-bound notice, so it\'s reasonable for the banner to reappear in a brand new session rather than being permanently dismissed forever, the way localStorage would make it.' },
      { q: 'Does the banner block any part of the page?', a: 'No — it\'s a normal in-flow element above the rest of the content, not an overlay or modal, so every other part of the app remains fully clickable and usable while it\'s showing.' },
      { q: 'What happens once the countdown reaches zero?', a: 'This snippet stops at 00:00:00; a real implementation would typically swap the banner\'s message (e.g. "Maintenance in progress") or trigger the actual maintenance takeover page at that point.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the target timestamp as a constant, recompute the countdown in a setInterval-driven state update (cleared on unmount), and read/write the dismissed flag from sessionStorage in the same places this snippet does.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to fetch the actual maintenance target time from a real API endpoint instead of a hardcoded constant, or to automatically re-show the banner (ignoring a stale dismissal) if the maintenance window itself changes to a new date after the user already dismissed the old one.`,
      prompt: `Build a Bootstrap 5.3 dismissible maintenance-mode banner, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A dismissible Bootstrap alert banner (using the real alert + btn-close markup) positioned above normal page content, which must remain fully usable and interactive underneath it.
- The banner text includes a live HH:MM:SS countdown to a fixed target timestamp a couple of hours in the future, updating every second.
- Clicking the banner's close button hides it and persists that dismissal in sessionStorage, guarded with try/catch in case storage is unavailable.
- On page load, check sessionStorage for a prior dismissal and keep the banner hidden if one exists, rather than always showing it — since this can't be demonstrated with a real page reload in a live preview, include a "Reload page (demo)" button that re-runs the same dismissed-state check a real reload's initial load would perform.`,
    },
  },
};

export default bootstrapMaintenanceBanner;
