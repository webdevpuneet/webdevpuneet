const bootstrapWebhookEventViewer = {
  id: 'bootstrap-webhook-event-viewer',
  title: 'Bootstrap Webhook Event Viewer',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bswh-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Webhook deliveries</h6>
      <ul class="list-unstyled mb-0" id="bswhList"></ul>
    </div>
  </div>
</div>`,
  css: `.bswh-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bswh-row { border-bottom: 1px solid #f1f2f5; }
.bswh-row:last-child { border-bottom: none; }
.bswh-head { display: flex; justify-content: space-between; align-items: center; padding: 9px 4px; cursor: pointer; }
.bswh-event { font: 700 12.5px ui-monospace, Menlo, Consolas, monospace; }
.bswh-time { font-size: 11px; color: #9ca3af; }
.bswh-body { display: none; padding: 0 4px 10px; }
.bswh-body.bswh-open { display: block; }
.bswh-payload {
  margin: 6px 0 8px; padding: 8px 10px; background: #14151a; color: #e1e4e8;
  border-radius: 8px; font: 11.5px/1.5 ui-monospace, Menlo, Consolas, monospace; overflow-x: auto; white-space: pre;
}`,
  js: `const EVENTS = [
  { event: 'invoice.paid', status: 200, time: '2 min ago', payload: '{ "id": "in_1a2b", "amount": 4900, "currency": "usd" }' },
  { event: 'customer.subscription.updated', status: 500, time: '14 min ago', payload: '{ "id": "sub_9x8y", "status": "past_due" }' },
  { event: 'checkout.session.completed', status: 200, time: '1 hr ago', payload: '{ "id": "cs_7f6e", "customer": "cus_44kd" }' },
  { event: 'invoice.payment_failed', status: 404, time: '3 hr ago', payload: '{ "id": "in_5c4d", "reason": "endpoint not found" }' },
];

const list = document.getElementById('bswhList');
let events = EVENTS.map((e, id) => ({ ...e, id, open: false }));

function toneFor(status) {
  if (status < 300) return 'success';
  if (status < 500) return 'warning';
  return 'danger';
}

function render() {
  list.innerHTML = events.map(ev =>
    '<li class="bswh-row" data-id="' + ev.id + '">' +
      '<div class="bswh-head" data-toggle="' + ev.id + '">' +
        '<div><span class="badge text-bg-' + toneFor(ev.status) + ' me-2">' + ev.status + '</span><span class="bswh-event">' + ev.event + '</span></div>' +
        '<span class="bswh-time">' + ev.time + '</span>' +
      '</div>' +
      '<div class="bswh-body' + (ev.open ? ' bswh-open' : '') + '">' +
        '<pre class="bswh-payload mb-0">' + ev.payload + '</pre>' +
        (ev.status >= 400 ? '<button type="button" class="btn btn-sm btn-outline-danger" data-retry="' + ev.id + '">Retry delivery</button>' : '') +
      '</div>' +
    '</li>'
  ).join('');
}

list.addEventListener('click', e => {
  const head = e.target.closest('.bswh-head');
  const retryBtn = e.target.closest('[data-retry]');

  if (retryBtn) {
    const ev = events.find(x => x.id === Number(retryBtn.dataset.retry));
    retryBtn.textContent = 'Retrying...';
    retryBtn.disabled = true;
    setTimeout(() => {
      ev.status = 200;
      ev.time = 'Just now (retried)';
      render();
    }, 900);
    return;
  }

  if (head) {
    const ev = events.find(x => x.id === Number(head.dataset.toggle));
    ev.open = !ev.open;
    render();
  }
});

render();`,

  seo: {
    title: 'Bootstrap Webhook Event Viewer — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 webhook delivery log — expandable rows reveal the raw payload, status-coded by response family, with a working Retry action on any failed delivery that updates it to succeeded in place.',
    about: {
      title: 'Bootstrap Webhook Event Viewer — HTML, CSS & JavaScript',
      description: `Each delivery tracks its own \`open\` boolean, toggled independently by clicking its row header — expanding one delivery's payload has no effect on any other row's expanded state, since \`render()\` derives every row's visibility purely from that row's own \`open\` value rather than a single "currently expanded id" that would force closing one to open another.\n\n\`toneFor(status)\` reuses the same status-family logic as [bootstrap-http-status-badge](/ui-snippets/bootstrap-http-status-badge/) — a 2xx delivery badges green, 4xx amber, 5xx red — so a user can scan the list and immediately spot which deliveries need attention without reading every status code individually.\n\nRetry only appears on a row whose \`status >= 400\`, since retrying a delivery that already succeeded is a meaningless action. Clicking it disables the button, shows "Retrying...", and after a simulated delay mutates that specific event's \`status\` to \`200\` and updates its timestamp — a real implementation would replace that timeout with an actual re-delivery API call, treating a successful response the same way this demo treats the simulated one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Four webhook deliveries list, each with a status badge, event name, and relative time — none expanded yet.' },
        { title: 'Click the "invoice.paid" row', text: 'It expands to reveal its raw JSON payload; no Retry button shows, since it already succeeded.' },
        { title: 'Click the "customer.subscription.updated" row (500 status)', text: 'It expands showing its payload and a "Retry delivery" button.' },
        { title: 'Click "Retry delivery"', text: 'The button disables and shows "Retrying...", then the row updates to a 200 status with an updated timestamp.' },
        { title: 'Expand a different row while the first stays expanded', text: 'Both rows stay independently expanded — opening one never closes another.' },
      ],
    },
    features: [
      'Each row tracks its own independent expanded state, not a single shared "currently open" row id',
      'Status badges reuse the same 2xx/4xx/5xx family-coloring logic as this collection\'s HTTP status badge',
      'Retry only appears on deliveries that actually failed, never on an already-successful one',
      'A retried delivery updates in place to a real success state and timestamp, not just a static confirmation message',
      'Raw payloads render in a monospace, horizontally scrollable block, safe for long JSON content',
    ],
    useCases: [
      { icon: 'DEV', title: 'Payment and billing integration dashboards', desc: 'The exact kind of delivery log shown by Stripe, GitHub, and most webhook-driven platforms for debugging integrations.' },
      { icon: 'DEV', title: 'Debugging a misconfigured webhook secret or endpoint URL', desc: 'Pair with [bootstrap-environment-variable-viewer](/ui-snippets/bootstrap-environment-variable-viewer/) to check the actual signing secret or URL a failing delivery was sent against.' },
      { icon: 'API', title: 'Internal API and integration monitoring tools', desc: 'Pairs with [bootstrap-api-response-viewer](/ui-snippets/bootstrap-api-response-viewer/) for a fuller request/response debugging panel.' },
      { icon: 'DASH', title: 'Admin panels for a platform sending webhooks to customers', desc: 'Let customers or support staff review and retry failed webhook deliveries directly.' },
    ],
    faqs: [
      { q: 'Can I have multiple rows expanded at the same time?', a: 'Yes — each row\'s open state is tracked independently, so expanding one has no effect on any other row; there\'s no artificial limit to a single expanded row at a time.' },
      { q: 'Why does Retry only show on some rows?', a: 'It only renders when a delivery\'s status is 400 or above — retrying an already-successful (2xx) delivery has no meaningful action to perform, so the button is withheld entirely rather than shown disabled.' },
      { q: 'Does clicking Retry send a real webhook again?', a: 'This demo simulates the outcome with a timeout; a real implementation should call your actual re-delivery API endpoint and update the row\'s status based on that request\'s genuine result, success or failure.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the events array (including each event\'s open boolean) in component state, toggle a specific event\'s open flag immutably on row click, and update its status/time fields the same way on a successful retry.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add response headers alongside the payload in the expanded view, or to add a filter toggle showing only failed deliveries, making it faster to find and retry everything that needs attention.`,
      prompt: `Build a Bootstrap 5.3 webhook delivery event viewer, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 4 sample webhook deliveries, each with an event name, an HTTP status code shown as a colored badge (green for 2xx, amber for 4xx, red for 5xx), and a relative timestamp.
- Clicking a delivery's row expands it in place to reveal its raw JSON payload in a monospace block; each row's expanded state must be tracked independently, so multiple rows can be expanded at once without affecting each other.
- A "Retry delivery" button must appear only inside the expanded view of deliveries with a status of 400 or higher — never on an already-successful delivery.
- Clicking Retry must disable the button, show a "Retrying..." state, and after a short simulated delay update that specific delivery's status to a success code and its timestamp, re-rendering it in place without a Retry button anymore.`,
    },
  },
};

export default bootstrapWebhookEventViewer;
