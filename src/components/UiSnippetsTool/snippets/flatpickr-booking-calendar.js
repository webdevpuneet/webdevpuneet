const flatpickrBookingCalendar = {
  id: 'flatpickr-booking-calendar',
  title: 'Flatpickr Booking Calendar with Disabled Dates',
  lastmod: '2026-09-20',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css',
    'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js',
  ],
  html: `<div class="bc-wrap">
  <div class="bc-card">
    <div class="bc-title">Mountain Cabin — Check Availability</div>
    <div id="bcCalendar"></div>
    <div class="bc-legend">
      <span><i class="bc-dot bc-dot-booked"></i>Booked</span>
      <span><i class="bc-dot bc-dot-selected"></i>Selected</span>
    </div>
    <div class="bc-summary" id="bcSummary">Pick your check-in date</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.bc-wrap{width:100%;max-width:340px}
.bc-card{background:#fff;border-radius:16px;padding:20px;box-shadow:0 1px 8px rgba(0,0,0,.07);border:1px solid #e2e8f0}
.bc-title{font-size:13.5px;font-weight:800;color:#0f172a;margin-bottom:12px}
.bc-legend{display:flex;gap:16px;justify-content:center;margin-top:10px;font-size:11px;font-weight:700;color:#64748b}
.bc-legend span{display:flex;align-items:center;gap:5px}
.bc-dot{width:9px;height:9px;border-radius:3px;display:inline-block}
.bc-dot-booked{background:#fecaca}
.bc-dot-selected{background:#6366f1}
.bc-summary{margin-top:10px;padding:9px;border-radius:9px;background:#eef2ff;color:#4338ca;font:700 12px system-ui;text-align:center}

.flatpickr-calendar{width:100%!important;box-shadow:none!important}
.flatpickr-current-month{font-size:13px!important;font-weight:800;color:#0f172a}
.flatpickr-weekday{font-size:10.5px!important;font-weight:800;color:#94a3b8!important}
.flatpickr-day{border-radius:8px!important;font-size:12.5px!important;font-weight:600}
.flatpickr-day.booked-date{background:#fef2f2!important;color:#dc2626!important;text-decoration:line-through;cursor:not-allowed}
.flatpickr-day.selected{background:#6366f1!important;border-color:#6366f1!important;color:#fff!important}
.flatpickr-day:hover:not(.flatpickr-disabled){background:#eef2ff}`,

  js: `// Simulated already-booked nights for the current and next month --
  // a real integration would fetch this from a reservations API.
  var today = new Date();
  function isoOffset(days) {
    var d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  var BOOKED = [isoOffset(3), isoOffset(4), isoOffset(5), isoOffset(11), isoOffset(18), isoOffset(19), isoOffset(25)];

  var summary = document.getElementById('bcSummary');

  flatpickr('#bcCalendar', {
    inline: true,
    minDate: 'today',
    disable: BOOKED,
    // onDayCreate runs once per rendered day cell -- it's the hook for
    // adding a class based on data (like "is this date booked") rather
    // than a visual state Flatpickr already tracks itself (like selected).
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      var iso = dayElem.dateObj.getFullYear() + '-' + String(dayElem.dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dayElem.dateObj.getDate()).padStart(2, '0');
      if (BOOKED.indexOf(iso) !== -1) {
        dayElem.classList.add('booked-date');
        dayElem.setAttribute('title', 'Already booked');
      }
    },
    onChange: function (selectedDates) {
      if (!selectedDates.length) { summary.textContent = 'Pick your check-in date'; return; }
      var d = selectedDates[0];
      var checkout = new Date(d);
      checkout.setDate(checkout.getDate() + 1);
      summary.textContent = 'Check-in ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
        ' \\u2192 Check-out ' + checkout.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
  });`,

  seo: {
    title: 'Flatpickr Booking Calendar with Disabled Dates — Free Snippet',
    description: `A cabin-rental availability calendar built on Flatpickr — already-booked nights are both unselectable and visually struck through, driven by one shared data array. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Flatpickr Booking Calendar with Disabled Dates — Blocking and Labeling from One Array',
      description: `A real booking calendar needs booked dates to be both functionally unselectable and visually obvious — a date that's merely disabled with no visual distinction looks like a bug, and a date that's styled as "booked" without actually being blocked is worse. This snippet drives both behaviors from one shared \`BOOKED\` array of ISO date strings, so they can never disagree about which dates are taken.

**disable makes dates functionally unselectable**

Passing the \`BOOKED\` array directly to Flatpickr's \`disable\` option is what actually prevents a click on those dates from registering a selection — Flatpickr checks this list internally before accepting any date as selected, regardless of any additional styling applied elsewhere.

**onDayCreate is the hook for data-driven styling per cell**

Flatpickr doesn't automatically add a distinct class for "this specific date happens to be in a disable list" beyond its generic \`flatpickr-disabled\` class — for a custom look (strikethrough, red tint, a "booked" tooltip) tied to *this dataset specifically*, \`onDayCreate\` fires once for every calendar day cell as it's rendered, receiving the real day element to inspect and modify. This snippet's handler checks each cell's date against the same \`BOOKED\` array and adds a \`booked-date\` class only when it matches.

**One array, two consumers, no possible disagreement**

Both \`disable: BOOKED\` and the \`onDayCreate\` lookup read from the identical array — there's no second, separately maintained list of "dates that look booked" that could drift out of sync with "dates that are actually blocked." Adding or removing a booked date only ever requires editing \`BOOKED\` once.

**The checkout date is derived, not separately selected**

Rather than asking for a second date pick, the summary computes a checkout date one day after the selected check-in by cloning the \`Date\` object and calling \`setDate(getDate() + 1)\` — appropriate for a single-night booking flow; a multi-night version would pair this same disabled-dates technique with Flatpickr's \`range\` mode instead.

**Reusing it**

Swap the simulated \`BOOKED\` array for real reserved dates fetched from a booking API before initializing Flatpickr, and both the disabling and the visual styling keep working unchanged, since neither depends on how the array was populated.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Flatpickr CDN', text: `Load flatpickr.min.css and flatpickr.min.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `A calendar renders with several dates already struck through.` },
      { title: 'Try clicking a booked date', text: `It cannot be selected — the click has no effect.` },
      { title: 'Click an available date', text: `It highlights and the check-in/check-out summary updates.` },
      { title: 'Navigate to the next month', text: `More simulated booked dates appear, struck through the same way.` },
      { title: 'Read the legend', text: `It explains what the red and indigo indicators mean.` },
    ] },
    features: [
      { title: 'Single source of truth for bookings', text: `One array drives both blocking and visual styling.` },
      { title: 'Functionally unselectable dates', text: `disable prevents the click, not just the appearance.` },
      { title: 'Per-cell data-driven styling', text: `onDayCreate applies a custom class based on real booking data.` },
      { title: 'Derived checkout date', text: `Computed from the selected check-in, no second pick needed.` },
      { title: 'Clear visual legend', text: `Booked versus selected states are explained, not just colored.` },
      { title: 'Tooltip on booked dates', text: `A title attribute explains why a date cannot be clicked.` },
    ],
    useCases: [
      { title: 'Vacation rental and hotel booking', text: `Exactly this pattern for showing real availability.` },
      { title: 'Equipment or venue reservation systems', text: `Any resource with date-based availability windows.` },
      { title: 'Appointment scheduling with blocked days', text: `Pair with the [time picker](/ui-snippets/flatpickr-time-picker-intervals/) elsewhere in this collection for a full date-plus-time flow.` },
      { title: 'Class or workshop session sign-ups', text: `Show which session dates are already full.` },
      { title: 'Delivery date selection with blackout days', text: `Holidays or capacity-limited days marked unavailable.` },
      { title: 'Learning Flatpickr hooks', text: `A clear reference for onDayCreate and data-driven disabling.` },
    ],
    faqs: [
      { q: 'How are booked dates both unselectable and visually distinct from one data source?', a: `The same BOOKED array of ISO date strings is used two ways: passed directly to Flatpickr's disable option (which makes those dates functionally unclickable) and checked inside an onDayCreate handler that adds a custom booked-date CSS class to matching day cells (which makes them visually struck through and red). Because both behaviors read from the identical array, there's no way for a date to be blocked without also looking blocked, or vice versa.` },
      { q: 'What does onDayCreate actually do, and when does it run?', a: `Flatpickr calls the onDayCreate hook once for every individual day cell as it builds the calendar\'s DOM, passing the real day element along with its associated date. This is the correct place to add custom, data-driven styling or attributes to specific dates — like this snippet\'s booked-date class and "Already booked" tooltip — since it runs at the point where each day\'s actual DOM element exists and can be inspected against your own data.` },
      { q: 'Why doesn\'t Flatpickr\'s default disabled styling already look "booked"?', a: `Flatpickr\'s built-in flatpickr-disabled class provides a generic muted appearance for any disabled date, regardless of why it\'s disabled (could be a past date, a day-of-week rule, or a specific blocked date). This snippet wants disabled dates specifically caused by existing bookings to look distinctly different (red, strikethrough, with an explanatory tooltip) from other kinds of disabled dates, which requires the additional onDayCreate-driven class rather than relying on the generic disabled style alone.` },
      { q: 'How is the checkout date calculated?', a: `Once a check-in date is selected, the code clones that Date object and calls setDate(getDate() + 1) on the clone to advance it by exactly one day, then formats both dates for the summary. This assumes a single-night booking; a multi-night version would instead use Flatpickr's range mode to let the user select both a check-in and check-out date directly, combined with the same disabled-dates technique.` },
      { q: 'How do I connect this to real booking data from an API?', a: `Replace the simulated BOOKED array (currently generated with isoOffset for demo purposes) with an array of ISO date strings fetched from your reservations backend before calling flatpickr(...) — both the disable option and the onDayCreate styling check read from that same array and require no other changes once it contains real data.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to figure out how to keep "blocked" and "looks blocked" in sync yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the same BOOKED array drives both Flatpickr's disable option (which prevents selection) and the onDayCreate hook (which adds custom visual styling), and why keeping both behaviors reading from one array matters. The same assistant can help optimize it — ask whether comparing ISO date strings inside onDayCreate for every rendered day cell is efficient enough for a calendar spanning many months, or whether a Set would be a faster lookup structure than an array's indexOf. It's also useful for extending the effect: ask it to switch to range mode for multi-night bookings while keeping the same disabled-dates approach, fetch real booking data from an API before initializing the calendar, or add a price-per-night tooltip on hover for available dates. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a booking availability calendar using the Flatpickr library, where already-booked dates are both unselectable and visually distinct (load Flatpickr's CSS and JS from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Maintain a single array of already-booked dates (as ISO date strings), and use that same array both to disable those dates from being selected at all in the calendar, and to apply distinct visual styling (such as a strikethrough and a different background/text color) to those specific day cells, so the two behaviors can never disagree about which dates are booked.
- Render the calendar inline, disallow selecting any date before today, and use the calendar library's own per-day-cell creation hook (not manual DOM querying after render) to apply the custom booked-date styling and an explanatory tooltip to matching cells as they are built.
- Show a legend below the calendar explaining what the booked-date color and the selected-date color each mean.
- When an available date is selected, display a summary showing that date as a check-in date and a computed check-out date exactly one day later.
- Clicking a booked date must have no effect — it should not be selectable, and the calendar's selected-date summary should not change if a booked date is clicked.`,
    },
  },
};

export default flatpickrBookingCalendar;
