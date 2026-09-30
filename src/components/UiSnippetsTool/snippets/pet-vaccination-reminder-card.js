const petVaccinationReminderCard = {
  id: 'pet-vaccination-reminder-card',
  title: 'Pet Vaccination Reminder Card',
  category: 'cards',
  html: `<div class="wrap">
  <div class="vax-card">
    <div class="vax-head">
      <div class="vax-avatar">M</div>
      <div>
        <h3>Milo</h3>
        <p>Golden Retriever &middot; 3 yrs old</p>
      </div>
    </div>

    <ul class="vax-list" id="vaxList">
      <li class="vax-item overdue" data-name="Bordetella" data-due="2026-08-20">
        <label class="vax-check"><input type="checkbox" /><span></span></label>
        <div class="vax-info">
          <span class="vax-name">Bordetella (Kennel Cough)</span>
          <span class="vax-due">Overdue since Aug 20</span>
        </div>
        <span class="vax-status-pill">Overdue</span>
      </li>
      <li class="vax-item soon" data-name="Rabies" data-due="2026-09-05">
        <label class="vax-check"><input type="checkbox" /><span></span></label>
        <div class="vax-info">
          <span class="vax-name">Rabies</span>
          <span class="vax-due">Due in 5 days</span>
        </div>
        <span class="vax-status-pill">Due soon</span>
      </li>
      <li class="vax-item upcoming" data-name="DHPP" data-due="2027-01-15">
        <label class="vax-check"><input type="checkbox" /><span></span></label>
        <div class="vax-info">
          <span class="vax-name">DHPP Booster</span>
          <span class="vax-due">Due Jan 15, 2027</span>
        </div>
        <span class="vax-status-pill">Upcoming</span>
      </li>
      <li class="vax-item upcoming" data-name="Lyme" data-due="2027-02-02">
        <label class="vax-check"><input type="checkbox" /><span></span></label>
        <div class="vax-info">
          <span class="vax-name">Lyme Disease</span>
          <span class="vax-due">Due Feb 2, 2027</span>
        </div>
        <span class="vax-status-pill">Upcoming</span>
      </li>
    </ul>

    <button class="vax-book-btn" id="vaxBookBtn">Book vet appointment</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 360px; }
.vax-card { background: #fff; border-radius: 20px; padding: 22px; box-shadow: 0 18px 44px rgba(15,23,42,0.1); border: 1px solid #f1f5f9; }

.vax-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.vax-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #ea580c); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; flex-shrink: 0; }
.vax-head h3 { font-size: 15.5px; font-weight: 800; color: #0f172a; }
.vax-head p { font-size: 12px; color: #94a3b8; margin-top: 2px; }

.vax-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.vax-item { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 12px; background: #f8fafc; border-left: 3px solid #cbd5e1; transition: opacity 0.35s ease, background 0.2s; }
.vax-item.overdue { border-left-color: #dc2626; background: #fef2f2; }
.vax-item.soon { border-left-color: #f59e0b; background: #fffbeb; }
.vax-item.upcoming { border-left-color: #6366f1; background: #eef2ff; }
.vax-item.completed { opacity: 0.5; border-left-color: #16a34a; background: #f0fdf4; }

.vax-check { position: relative; display: flex; flex-shrink: 0; cursor: pointer; }
.vax-check input { position: absolute; opacity: 0; width: 20px; height: 20px; margin: 0; cursor: pointer; }
.vax-check span { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #cbd5e1; background: #fff; display: flex; align-items: center; justify-content: center; transition: background 0.15s, border-color 0.15s; }
.vax-check input:checked + span { background: #16a34a; border-color: #16a34a; }
.vax-check span::after { content: ''; width: 5px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg) scale(0); transition: transform 0.15s; margin-bottom: 2px; }
.vax-check input:checked + span::after { transform: rotate(45deg) scale(1); }

.vax-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.vax-name { font-size: 13px; font-weight: 700; color: #0f172a; }
.vax-item.completed .vax-name { text-decoration: line-through; }
.vax-due { font-size: 11.5px; color: #64748b; }

.vax-status-pill { font-size: 9.5px; font-weight: 800; padding: 3px 8px; border-radius: 6px; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.03em; flex-shrink: 0; }
.vax-item.overdue .vax-status-pill { background: #dc2626; color: #fff; }
.vax-item.soon .vax-status-pill { background: #f59e0b; color: #fff; }
.vax-item.upcoming .vax-status-pill { background: #6366f1; color: #fff; }
.vax-item.completed .vax-status-pill { background: #16a34a; color: #fff; }

.vax-book-btn { width: 100%; border: none; background: #0f172a; color: #fff; font-size: 13px; font-weight: 700; padding: 12px; border-radius: 12px; cursor: pointer; transition: background 0.15s; }
.vax-book-btn:hover { background: #1e293b; }`,
  js: `var items = document.querySelectorAll('.vax-item');

function reorderList() {
  var list = document.getElementById('vaxList');
  var order = { overdue: 0, soon: 1, upcoming: 2, completed: 3 };
  var sorted = Array.prototype.slice.call(list.children).sort(function (a, b) {
    var aKey = a.classList.contains('completed') ? 'completed' : (a.classList.contains('overdue') ? 'overdue' : (a.classList.contains('soon') ? 'soon' : 'upcoming'));
    var bKey = b.classList.contains('completed') ? 'completed' : (b.classList.contains('overdue') ? 'overdue' : (b.classList.contains('soon') ? 'soon' : 'upcoming'));
    return order[aKey] - order[bKey];
  });
  sorted.forEach(function (li) { list.appendChild(li); });
}

items.forEach(function (item) {
  var checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      item.classList.remove('overdue', 'soon', 'upcoming');
      item.classList.add('completed');
      var pill = item.querySelector('.vax-status-pill');
      pill.textContent = 'Done';
      item.querySelector('.vax-due').textContent = 'Marked complete just now';
      setTimeout(reorderList, 350);
    } else {
      // Re-checking is not supported once marked complete in this demo —
      // real usage should re-fetch the true due-date-derived status instead.
      item.classList.add('overdue');
      item.classList.remove('completed');
    }
  });
});

document.getElementById('vaxBookBtn').addEventListener('click', function (e) {
  var btn = e.currentTarget;
  var due = document.querySelectorAll('.vax-item.overdue, .vax-item.soon').length;
  var original = btn.textContent;
  btn.textContent = due > 0 ? 'Requesting appointment for ' + due + ' vaccine' + (due === 1 ? '' : 's') + '…' : 'Requesting checkup appointment…';
  btn.disabled = true;
  setTimeout(function () {
    btn.textContent = 'Appointment requested \\u2713';
    setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 2000);
  }, 900);
});`,
  seo: {
    title: 'Pet Vaccination Reminder Card — Free HTML CSS JS Snippet',
    description: 'A pet health card listing vaccines by urgency with checkbox completion, auto-reordering, and a book-appointment button that reflects how many shots are due. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Pet Vaccination Reminder Card — Urgency-Sorted Vaccine List with Live Completion',
      description: `A pet owner checking a vaccination card cares about one thing above the rest: which shots are overdue right now, and which can wait. This card sorts entirely around that priority — vaccines are grouped and color-coded by urgency (overdue, due soon, upcoming), checking one off re-sorts it out of the way immediately, and the appointment-booking button dynamically reports exactly how many vaccines the request would cover.

**Three urgency tiers, not just a due date**

Each \`.vax-item\` carries an \`overdue\`, \`soon\`, or \`upcoming\` class that drives a distinct left-border color, background tint, and status pill — the same redundant color-plus-text-plus-position encoding used in the incident-status widget, applied to a very different domain where the reader (a pet owner glancing at a phone) is just as likely to be scanning quickly rather than reading each due-date string carefully.

**Checking an item off triggers reflow, not just a strikethrough**

The checkbox's \`change\` handler swaps the item's urgency class to \`completed\`, updates its pill text to "Done" and its due-date text to a completion confirmation, then calls \`reorderList()\` after a 350ms delay. \`reorderList()\` re-sorts the list's DOM children by an explicit priority order (\`overdue\` → \`soon\` → \`upcoming\` → \`completed\`) using \`Array.prototype.slice.call\` plus \`.sort()\`, so a completed vaccine visibly moves toward the bottom of the list rather than just sitting struck-through in its original position among items still needing attention. The delay before reordering lets the viewer register the checkbox animation and pill change before the list reflows underneath them — an instant reorder the same frame as the click would be disorienting.

**The book-appointment button counts what it's actually booking**

\`vaxBookBtn\`'s click handler counts \`.vax-item.overdue, .vax-item.soon\` elements at click time and writes that count directly into the button's own loading label ("Requesting appointment for 2 vaccines…") rather than a generic "Booking…" message. This turns the button itself into a live summary — a pet owner sees, in the moment they commit to booking, confirmation of exactly what the appointment is for, which matters because the list above it can change (as items get checked off) between when the owner opens the card and when they tap the button.

**Checkbox styling built from a hidden native input, not a custom widget**

The checkmark is a real \`<input type="checkbox">\`, visually hidden via \`opacity: 0\` but kept in the layout and layered under a styled \`<span>\` sibling using the label-wrapping pattern (\`<label class="vax-check"><input/><span></span></label>\`). This keeps native checkbox behavior — keyboard toggling with Space, screen reader semantics, click target sizing — fully intact while allowing full custom visual styling via the adjacent-sibling \`:checked + span\` selector, rather than reimplementing checkbox behavior in JavaScript from a plain \`<div>\`.

**A demo limitation flagged directly in the code**

Un-checking a completed item reverts it straight to \`overdue\` rather than recomputing a real status from its actual due date, with a code comment explaining why — a deliberate simplification for a self-contained demo that a real integration should replace with a proper status recalculation from the stored due-date value.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Check off a completed vaccine', text: 'Clicking a checkbox marks the vaccine as done, updates its pill and due-date text, and moves it toward the bottom of the sorted list after a brief pause.' },
        { title: 'Click "Book vet appointment"', text: 'The button counts how many vaccines are currently overdue or due soon and reflects that count in its own loading label before confirming.' },
        { title: 'Replace the pet and vaccine data', text: 'Update the pet name, avatar initial, breed/age text, and each .vax-item\'s data-name, data-due, urgency class, and displayed due-date text.' },
        { title: 'Compute urgency from real dates', text: 'Replace the hardcoded overdue/soon/upcoming classes with a function that compares each vaccine\'s real due date against today\'s date at render time.' },
        { title: 'Wire the booking button to a real scheduling flow', text: 'Replace the setTimeout in the click handler with a real API call or a redirect to your clinic\'s booking system, passing along which vaccines are due.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Three-tier urgency color coding (overdue, due soon, upcoming) with redundant border, background, and pill text cues',
      'Checking a vaccine complete re-sorts the list by urgency priority after a brief delay, not instantly',
      'Custom checkbox styling built on a real hidden native input for full keyboard and screen-reader support',
      'Book-appointment button dynamically counts and displays exactly how many vaccines the request covers',
      'Completed items get a strikethrough name, muted opacity, and green completion styling',
      'Button moves through idle, loading (with live count), and confirmed states rather than an instant label swap',
      'Sortable list logic is class-driven and reusable for any urgency-tiered checklist, not vaccine-specific',
      'Compact card suited to a vet clinic app, pet health portal, or pet-parent mobile dashboard',
    ],
    useCases: [
      { icon: 'APP', title: 'Veterinary clinic patient portals', desc: 'The core use case — let pet owners see and manage their pet\'s vaccination schedule without calling the clinic to ask what is due.' },
      { icon: 'ALERT', title: 'Pet care and health-tracking apps', desc: 'Combine with feeding, medication, and grooming reminders inside a broader pet-care app dashboard for a full pet-health picture.' },
      { icon: 'FLOW', title: 'Boarding and daycare intake requirements', desc: 'Boarding facilities and daycares that require proof of current vaccinations can surface exactly which shots are missing before a stay using the same overdue/soon styling.' },
      { icon: 'FORM', title: 'Pet insurance and wellness plan dashboards', desc: 'Pet insurance apps tracking wellness-plan-covered vaccines can reuse the urgency-sorted list alongside claim or reimbursement status.' },
      { icon: 'CODE', title: 'Learn urgency-sorted checklist patterns', desc: 'A clean example of a list that both color-codes by urgency and physically reorders itself as items are completed — the same pattern applies to any prioritized task or reminder list.' },
      { icon: 'LEARN', title: 'Multi-pet household management', desc: 'Households with multiple pets can render one card per pet, each independently tracking its own vaccination schedule and appointment-booking state.' },
    ],
    faqs: [
      { q: 'How does the list know which items are more urgent?', a: 'Each vaccine item carries an overdue, soon, or upcoming class in the HTML. reorderList() maps those classes to an explicit numeric priority (overdue = 0, soon = 1, upcoming = 2, completed = 3) and sorts the list\'s DOM children by that priority whenever it runs, so more urgent items always sort above less urgent ones.' },
      { q: 'Why does checking a vaccine off wait before reordering the list?', a: 'The change handler updates the checked item\'s pill text and due-date label immediately, but calls reorderList() inside a 350ms setTimeout rather than synchronously. This gives the viewer a moment to see the checkbox animate and the item\'s own text update before the surrounding list visually reflows, which is less disorienting than an instant reorder in the same frame as the click.' },
      { q: 'What does the "Book vet appointment" button actually count?', a: 'At the moment it is clicked, the handler runs document.querySelectorAll(\'.vax-item.overdue, .vax-item.soon\').length to count vaccines that are currently overdue or due soon, and writes that count directly into its own loading label — so the number reflects the list\'s live state at click time, including any items already checked off.' },
      { q: 'Is the checkbox accessible to keyboard and screen reader users?', a: 'Yes — the visible checkmark is a real native input[type="checkbox"], only visually hidden with opacity: 0 while remaining in the tab order and layout. It is wrapped in a label alongside a styled span, so it keeps native keyboard toggling (Space key) and screen reader checkbox semantics while allowing the checked state to drive custom span styling via the :checked + span CSS selector.' },
      { q: 'What happens if I uncheck a vaccine after marking it complete?', a: 'In this demo, unchecking reverts the item directly to the overdue class rather than recomputing its true status from a real due date — a deliberate simplification flagged in a code comment. A production version should instead recalculate the correct urgency tier from the vaccine\'s actual stored due date when a checkbox is unchecked.' },
      { q: 'How do I compute urgency automatically instead of hardcoding the classes?', a: 'Read each item\'s data-due attribute (an ISO date string), compare it against the current date, and apply overdue if the due date has passed, soon if it falls within a configurable window (for example the next 7 days), and upcoming otherwise — then apply the same class-swap logic the checkbox handler already uses.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how reorderList() decides the sort order of vaccine items and why it waits before running after a checkbox is checked, rather than reordering the list the instant the checkbox state changes. The same assistant can help optimize it — for instance asking whether the data-due attributes already present on each list item could drive automatic overdue/soon/upcoming classification instead of the currently hardcoded classes. It's also useful for extending the card: ask it to compute real urgency from actual due dates, support multiple pets in a tabbed or accordion view, or add a "remind me later" snooze action per vaccine. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "pet vaccination reminder" card in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- List several vaccines as checklist items, each showing a vaccine name and a due-date description, tagged with one of three urgency levels (overdue, due soon, upcoming) that each drive a distinct left-border color, background tint, and small status pill with matching color and text.
- Each item must have a real, accessible checkbox (a native input[type="checkbox"], visually restyled rather than replaced with a plain clickable div) that, when checked, changes that item's styling to a distinct "completed" state — strikethrough name, muted opacity, green accent, and updated pill and due-date text — and then, after a brief delay rather than instantly, re-sorts the entire list so completed items move toward the bottom and remaining items stay ordered by urgency (overdue first, then due soon, then upcoming).
- Include a "Book vet appointment" button whose click handler counts, at the moment of the click, how many items currently have the overdue or due-soon urgency level, and displays that exact count inside the button's own loading-state label (for example "Requesting appointment for 2 vaccines…") before showing a brief confirmed state and reverting to its original label.
- Use plain vanilla JavaScript with classList and array sorting for the reordering logic — no external animation or list-sorting library.`,
    },
  },
};

export default petVaccinationReminderCard;
