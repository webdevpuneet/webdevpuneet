const bootstrapOfflineOnlineStatusBanner = {
  id: 'bootstrap-offline-online-status-banner',
  title: 'Bootstrap Offline/Online Status Banner',
  lastmod: '2026-09-11',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="bsonline-page">
    <div class="alert alert-danger mb-0 rounded-0 text-center d-none" id="bsonlineOfflineBanner">
      <span class="small fw-semibold">&#128268; You're offline — changes will sync once you're back online.</span>
    </div>
    <div class="alert alert-success mb-0 rounded-0 text-center d-none" id="bsonlineBackBanner">
      <span class="small fw-semibold">&#9989; Back online.</span>
    </div>

    <div class="p-4 text-center">
      <h6 class="fw-bold mb-1">Notes</h6>
      <p class="small text-muted mb-3">This demo can't unplug your real network, so use the buttons below to simulate it.</p>
      <div class="d-flex justify-content-center gap-2">
        <button type="button" class="btn btn-sm btn-outline-danger" id="bsonlineGoOffline">Simulate going offline</button>
        <button type="button" class="btn btn-sm btn-outline-success" id="bsonlineGoOnline">Simulate back online</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsonline-page { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; overflow: hidden; background: #fff; }`,
  js: `const offlineBanner = document.getElementById('bsonlineOfflineBanner');
const backBanner = document.getElementById('bsonlineBackBanner');
let backTimer = null;

function showOffline() {
  clearTimeout(backTimer);
  backBanner.classList.add('d-none');
  offlineBanner.classList.remove('d-none');
}

function showBackOnline() {
  offlineBanner.classList.add('d-none');
  backBanner.classList.remove('d-none');
  clearTimeout(backTimer);
  backTimer = setTimeout(() => backBanner.classList.add('d-none'), 2500);
}

// The real, production listeners — these fire on an actual browser
// connectivity change, exactly the way the two demo buttons simulate below.
window.addEventListener('offline', showOffline);
window.addEventListener('online', showBackOnline);

document.getElementById('bsonlineGoOffline').addEventListener('click', () => {
  window.dispatchEvent(new Event('offline'));
});
document.getElementById('bsonlineGoOnline').addEventListener('click', () => {
  window.dispatchEvent(new Event('online'));
});`,

  seo: {
    title: 'Bootstrap Offline/Online Status Banner — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 connectivity banner driven by the genuine window online/offline events — a persistent warning while offline, and a brief self-dismissing "Back online" confirmation on reconnect.',
    about: {
      title: 'Bootstrap Offline/Online Status Banner — HTML, CSS & JavaScript',
      description: `The actual production logic here is exactly two lines — \`window.addEventListener('offline', showOffline)\` and \`window.addEventListener('online', showBackOnline)\` — since the browser itself already fires these events on a genuine connectivity change; nothing needs to be polled or guessed at. Everything else in this snippet exists to make that logic demonstrable inside a preview that can't actually unplug a real network connection: the two demo buttons call \`window.dispatchEvent(new Event('offline'))\` and \`new Event('online')\` to fire the exact same events a real disconnect and reconnect would, exercising the real \`showOffline\`/\`showBackOnline\` handlers rather than separate fake demo-only functions.\n\nThe offline banner stays visible indefinitely for as long as the connection is actually down, while the "Back online" confirmation is deliberately brief — \`showBackOnline()\` sets a \`setTimeout\` to hide itself after 2.5 seconds, since a reconnect is good news that doesn't need to stay pinned to the screen the way an ongoing problem does. Both handlers clear any pending timer from the other state first, so rapidly toggling offline and online in quick succession never leaves a stale banner hanging around past its actual relevance.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'No banner shows — the page assumes you\'re online, which you are.' },
        { title: 'Click "Simulate going offline"', text: 'A real offline event fires, and the red offline banner appears and stays visible.' },
        { title: 'Click "Simulate back online"', text: 'A real online event fires — the offline banner disappears and a green "Back online" confirmation shows briefly before auto-hiding.' },
        { title: 'Toggle between the two buttons quickly', text: 'Each new state correctly cancels any pending auto-hide timer from the previous one.' },
      ],
    },
    features: [
      'Driven by the browser\'s genuine online/offline events, not a polling loop checking connectivity',
      'The demo buttons dispatch the real events rather than faking the visual state through separate logic',
      'The offline warning persists indefinitely; the reconnect confirmation is brief and self-dismissing',
      'Rapidly toggling connectivity correctly cancels any stale pending auto-hide timer from the prior state',
      'Zero network requests are made just to check connectivity — the browser already tracks this natively',
    ],
    useCases: [
      { icon: 'APP', title: 'Notes, docs, and form apps that need to work offline-first', desc: 'Pairs naturally with [bootstrap-form-autosave-status](/ui-snippets/bootstrap-form-autosave-status/), letting a user know why their autosave suddenly stopped succeeding.' },
      { icon: 'APP', title: 'Stacking a second, unrelated banner above the same app', desc: 'See [bootstrap-maintenance-banner](/ui-snippets/bootstrap-maintenance-banner/) for the same non-blocking top-banner pattern applied to a scheduled maintenance window instead of connectivity.' },
      { icon: 'MOBILE', title: 'PWAs and mobile web apps', desc: 'Mobile connections drop far more often than desktop ones, making this kind of feedback more consistently relevant.' },
      { icon: 'DASH', title: 'Dashboards showing live or frequently-refreshed data', desc: 'Explains why data has stopped updating instead of leaving a user to wonder if the app itself is broken.' },
    ],
    faqs: [
      { q: 'Is navigator.onLine reliable on its own?', a: 'It reflects whether the device has any network interface active, which isn\'t the same as having a genuinely working internet connection — it\'s still useful as an initial check, but the online/offline events (used here) are the standard way to react to connectivity changing over time.' },
      { q: 'Why can\'t I really go offline to test this preview?', a: 'This snippet runs inside a sandboxed iframe preview where actually toggling your device\'s real network state isn\'t something the page itself can control or safely simulate through browser dev tools inside a preview — dispatching a synthetic offline/online Event exercises the exact same handlers a real change would.' },
      { q: 'Why does "Back online" disappear on its own but the offline warning doesn\'t?', a: 'An ongoing offline state is a problem the user needs to keep in mind for as long as it\'s true; a successful reconnect is a resolved, positive confirmation that doesn\'t need to occupy screen space once it\'s been seen.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Attach the online/offline listeners in a mount lifecycle hook with cleanup on unmount, and drive both banners\' visibility from component state updated by those same listeners.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to queue actions attempted while offline and automatically retry them once the online event fires, or to add a small persistent status dot (not just a banner) that stays visible in a corner of the UI reflecting connectivity at all times.`,
      prompt: `Build a Bootstrap 5.3 offline/online connectivity status banner, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- Listen for the browser's real window 'offline' and 'online' events (not a polling loop) to show or hide two separate banners.
- The offline banner must show a persistent warning message and remain visible for as long as the offline state lasts.
- The online/reconnect banner must show a brief success confirmation that automatically hides itself after a couple of seconds.
- Since a live preview can't trigger real connectivity changes, add two demo buttons that dispatch genuine synthetic 'offline' and 'online' Events via window.dispatchEvent, exercising the exact same event handlers real connectivity changes would use — not separate fake demo-only functions.
- Rapidly switching between offline and online must correctly cancel any pending auto-hide timer left over from the previous state.`,
    },
  },
};

export default bootstrapOfflineOnlineStatusBanner;
