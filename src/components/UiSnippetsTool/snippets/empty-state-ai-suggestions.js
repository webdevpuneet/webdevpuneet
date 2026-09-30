const emptyStateAiSuggestions = {
  id: 'empty-state-ai-suggestions',
  title: 'Empty State with AI Suggestions',
  lastmod: '2026-08-08',
  category: 'dashboards',
  html: `<div class="demo-wrap">
  <div class="empty-panel">
    <div class="empty-header">
      <div class="empty-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      </div>
      <h3>No tasks yet</h3>
      <p>Your task list is empty. Here are a few suggestions based on your recent activity to help you get started.</p>
    </div>

    <div class="suggestion-list" id="suggestion-list">
      <div class="suggestion-item" data-text="Follow up with client about proposal">
        <div class="suggestion-main">
          <span class="ai-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z"/></svg>
            Suggested
          </span>
          <span class="suggestion-text">Follow up with client about proposal</span>
        </div>
        <button class="add-btn" data-action="add">+ Add</button>
      </div>
      <div class="suggestion-item" data-text="Review Q3 budget before Friday">
        <div class="suggestion-main">
          <span class="ai-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z"/></svg>
            Suggested
          </span>
          <span class="suggestion-text">Review Q3 budget before Friday</span>
        </div>
        <button class="add-btn" data-action="add">+ Add</button>
      </div>
      <div class="suggestion-item" data-text="Plan team offsite for next quarter">
        <div class="suggestion-main">
          <span class="ai-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z"/></svg>
            Suggested
          </span>
          <span class="suggestion-text">Plan team offsite for next quarter</span>
        </div>
        <button class="add-btn" data-action="add">+ Add</button>
      </div>
    </div>

    <div class="divider"><span>or create your own</span></div>

    <form class="create-form" id="create-form">
      <input type="text" id="create-input" placeholder="Type a task and press Enter..." autocomplete="off">
      <button type="submit" class="create-btn">Add</button>
    </form>

    <div class="task-list" id="task-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.empty-panel {
  width: 440px; max-width: 100%;
  background: #fff; border-radius: 18px; border: 1px solid #e2e8f0;
  box-shadow: 0 8px 30px rgba(15,23,42,0.06);
  padding: 28px;
}

.empty-header { text-align: center; margin-bottom: 20px; }
.empty-icon {
  width: 48px; height: 48px; border-radius: 14px;
  background: #ede9fe; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.empty-header h3 { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
.empty-header p { font-size: 13px; color: #64748b; line-height: 1.55; max-width: 340px; margin: 0 auto; }

.suggestion-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }

.suggestion-item {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 14px; border-radius: 12px;
  background: #f8fafc; border: 1px dashed #c7d2fe;
  transition: opacity 0.25s, transform 0.25s;
}
.suggestion-item.added {
  opacity: 0; transform: translateX(8px) scale(0.98);
  pointer-events: none;
}

.suggestion-main { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.ai-tag {
  display: inline-flex; align-items: center; gap: 4px; width: fit-content;
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;
  color: #6366f1; background: #ede9fe; padding: 2px 8px; border-radius: 20px;
}
.suggestion-text { font-size: 13px; font-weight: 600; color: #1e293b; }

.add-btn {
  flex-shrink: 0; background: #fff; color: #6366f1; border: 1.5px solid #c7d2fe;
  font-size: 12px; font-weight: 700; padding: 7px 12px; border-radius: 8px;
  cursor: pointer; font-family: inherit; transition: background 0.15s, color 0.15s;
}
.add-btn:hover { background: #6366f1; color: #fff; }

.divider { display: flex; align-items: center; gap: 10px; margin: 18px 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.divider span { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }

.create-form { display: flex; gap: 8px; }
#create-input {
  flex: 1; padding: 10px 12px; border-radius: 9px; border: 1.5px solid #e2e8f0;
  font-size: 13px; font-family: inherit; outline: none; transition: border-color 0.15s;
}
#create-input:focus { border-color: #6366f1; }
.create-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 9px;
  padding: 10px 16px; font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s;
}
.create-btn:hover { background: #4f46e5; }

.task-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.task-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: 12px; background: #f0fdf4; border: 1px solid #bbf7d0;
  animation: taskIn 0.3s ease;
  font-size: 13px; font-weight: 600; color: #166534;
}
@keyframes taskIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
.task-item svg { flex-shrink: 0; color: #16a34a; }`,
  js: `const suggestionList = document.getElementById('suggestion-list');
const createForm = document.getElementById('create-form');
const createInput = document.getElementById('create-input');
const taskList = document.getElementById('task-list');

function addTask(text) {
  const item = document.createElement('div');
  item.className = 'task-item';
  item.innerHTML =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' +
    '<span></span>';
  item.querySelector('span').textContent = text;
  taskList.prepend(item);
}

suggestionList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="add"]');
  if (!btn) return;
  const row = btn.closest('.suggestion-item');
  const text = row.dataset.text;
  addTask(text);
  row.classList.add('added');
  row.addEventListener('transitionend', () => row.remove(), { once: true });
});

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = createInput.value.trim();
  if (!value) return;
  addTask(value);
  createInput.value = '';
  createInput.focus();
});`,
  seo: {
    title: 'Empty State with AI Suggestions — Free HTML CSS JS Snippet',
    description: 'Empty state panel offering AI-suggested starter items instead of a dead end, plus a manual create input. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Empty State with AI Suggestions — Turning a Dead End into an On-Ramp for New Users',
      description: `The default empty state — a faint illustration, a line of grey text like "No items yet," and a single "Add your first item" button — has been the industry standard for over a decade, and it has a real cost: it hands the user a blank page and asks them to invent their own first move. For a brand-new user who doesn't yet know what belongs in your task list, project board, or inbox, that blank page is often where onboarding quietly fails. This snippet replaces the generic empty state with an **AI-native empty state**: instead of one vague call to action, it shows three concrete, contextually relevant starter items the user can add with a single click, alongside — not instead of — the standard manual input.

**Why generic empty states underperform**

A blank empty state assumes the user already knows what they want to create, which is precisely the assumption that's false for anyone encountering the feature for the first time. Product analytics teams have repeatedly found that empty states with zero suggested content have measurably lower "time to first action" completion than states offering pre-filled or one-click options — the cognitive cost of generating an example from nothing is higher than most designers assume, especially for less experienced or less confident users. The fix isn't a better illustration; it's giving the user something concrete to react to, even if they end up editing or ignoring it entirely.

**Suggestions as a genuine on-ramp, not a gimmick**

Each suggestion in this panel — "Follow up with client about proposal," "Review Q3 budget before Friday," "Plan team offsite for next quarter" — is written as a plausible, specific example of the kind of item that belongs in a task list, not a placeholder like "Example Task 1." This specificity matters: vague suggestions read as filler and get ignored, while concrete, contextual suggestions do double duty as both a fast one-click action *and* an implicit tutorial on what the feature is for. A production version of this pattern would source suggestions from a real signal — recently mentioned action items in connected email or chat threads, patterns from similar users' first sessions, or an LLM prompt fed the user's recent activity — which is why each item carries a small \`.ai-tag\` badge reading "Suggested" with a sparkle icon, honestly signaling that this content was generated or inferred, not manually curated by the product team. That transparency is itself a 2026 UX expectation: as more interface content is AI-assisted, labeling it clearly (rather than presenting it as if a human wrote it) is what keeps AI-native UI trustworthy rather than deceptive.

**Interaction: one-click add with a soft dismissal**

Clicking "+ Add" on a suggestion calls \`addTask()\`, which prepends a new item to \`#task-list\` with a short \`taskIn\` slide-fade entrance, then the source suggestion card animates out via a \`.added\` class that combines \`opacity: 0\` and a subtle \`translateX\` before the node is removed on \`transitionend\` — never an abrupt disappearance. This gives the user clear before/after feedback: the suggestion visibly becomes a real task rather than silently vanishing.

**The manual path is never removed**

Critically, the suggestions sit *above* a labeled divider ("or create your own") and a fully functional text input — the AI suggestions augment the empty state, they don't replace user agency. A user who already knows exactly what they want to add can ignore the suggestions entirely and type their own item via the standard \`#create-form\`, which calls the identical \`addTask()\` function. This is the core design principle behind good AI-assisted UI: AI suggestions should lower the floor for uncertain users without raising the ceiling or removing control for confident ones. An empty state that *only* offered AI suggestions, with no manual escape hatch, would be a regression, not an improvement — this pattern keeps both paths first-class.

**Applicability beyond task lists**

The same shape — a short, honestly-labeled AI-suggested list plus a manual fallback — generalizes cleanly to search-with-no-results ("Did you mean...", trending queries), empty inbox/CRM states (suggested contacts to add), or empty dashboard widgets (suggested metrics to track), making this one of the more broadly reusable empty-state patterns for any AI-assisted 2026 product surface.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Review the suggested items', text: 'The panel renders three .suggestion-item rows, each with an "AI Suggested" tag and a concrete example task relevant to a task-list context — click "+ Add" on any of them to accept it.' },
        { title: 'Watch the add-and-dismiss animation', text: 'Clicking + Add calls addTask() to prepend a new .task-item with a taskIn slide-fade animation, then adds the .added class to the source suggestion, which fades and slides out before being removed on transitionend.' },
        { title: 'Create your own item manually', text: 'Type in the #create-input field below the "or create your own" divider and press Enter (or click Add) — this submits #create-form, which calls the same addTask() function as the suggestions.' },
        { title: 'Replace the mock suggestions with real ones', text: 'Change the data-text attributes and visible suggestion-text in the HTML to pull from an actual signal source — recent emails, calendar events, or an LLM call summarizing the user\'s connected accounts — while keeping the same markup structure.' },
        { title: 'Adjust the empty-state copy for your context', text: 'Update the h3 ("No tasks yet") and intro paragraph in .empty-header to match your feature — the same suggestion-plus-manual-input structure works for empty inboxes, contact lists, or dashboard widgets with different suggestion content.' },
        { title: 'Export and wire to your real data layer', text: 'Click JSX for a React component, then replace addTask()\'s DOM manipulation with a call to your state management or API layer (e.g. a mutation to create a real task record) while keeping the suggestion-dismiss animation logic.' },
      ],
    },
    features: [
      'Three AI-suggested starter items with an honestly-labeled "Suggested" tag (sparkle icon) rather than presenting them as manually curated',
      'One-click "+ Add" per suggestion calling a shared addTask() function also used by the manual form',
      'Soft dismiss animation: suggestion fades and translates out via .added class, removed only after transitionend fires',
      'New task entries animate in with a taskIn keyframe (opacity + translateY) for clear before/after feedback',
      'Manual "or create your own" input always present and fully functional — AI suggestions augment, never replace, user control',
      'Event delegation on #suggestion-list using e.target.closest() so add-button clicks work regardless of future DOM changes',
      'Dashed-border suggestion cards visually distinct from the solid, confirmed .task-item entries once added',
      'Reusable pattern shape applicable to empty inbox, search-no-results, and empty dashboard-widget states beyond task lists',
    ],
    useCases: [
      { icon: 'APP', title: 'New user onboarding for task, project, or CRM tools', desc: 'First-run experiences are where empty states cost the most — a new user has no existing content and no intuition yet for what belongs in your product. Concrete AI-suggested starter items give them an immediate, low-effort first action, directly improving activation and time-to-first-value metrics that onboarding teams track closely.' },
      { icon: 'FLOW', title: 'Search results with zero matches', desc: 'The same suggestion-plus-manual pattern works for a "No results found" search state: instead of a dead end, surface 2-3 AI-suggested alternate queries or popular searches related to what the user typed, alongside a clear option to refine their own search — directly reducing search abandonment.' },
      { icon: 'DESIGN', title: 'AI-native product design systems', desc: 'As more surfaces incorporate LLM-generated content, design systems need a standard, honest way to label AI-suggested content so users can distinguish it from human-authored or user-generated content at a glance. The .ai-tag component here is a reusable building block for that labeling convention across any suggested-content surface, not just empty states.' },
      { icon: 'LEARN', title: 'Teaching progressive disclosure and dual-path UX', desc: 'This snippet is a clear teaching example of offering a fast path (accept a suggestion) alongside a slow, fully-controlled path (type your own) without making either feel like the "wrong" choice — a pattern also visible in the [Command Palette](/ui-snippets/command-palette) snippet\'s suggested-vs-typed command distinction.' },
      { icon: 'APP', title: 'Empty dashboard widgets and report builders', desc: 'A newly created dashboard or report widget with no data yet can suggest 2-3 commonly tracked metrics or chart types relevant to the surrounding dashboard context, letting users populate a blank canvas without needing to understand every available option upfront.' },
      { icon: 'CODE', title: 'Prototyping AI-suggestion UX before the real model integration exists', desc: 'Product teams can use this snippet with hardcoded mock suggestions to test the interaction pattern and gather usability feedback well before the backend LLM suggestion pipeline is built, then swap in real suggestion data once available without changing the interaction code.' },
      { icon: 'CODE', title: 'Related: Habit Tracker Grid', desc: 'See the [Habit Tracker Grid](/ui-snippets/habit-tracker-grid/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why label the suggestions as "Suggested" instead of just showing them as regular items?', a: 'Transparency about AI-generated or AI-inferred content is a core 2026 UX expectation — users should be able to tell at a glance what content a human explicitly created versus what a system suggested on their behalf. The small "Suggested" tag with a sparkle icon keeps this honest without being intrusive, and it also sets the right expectation that these are starting points the user may want to edit rather than finished, deliberate entries.' },
      { q: 'Does adding a suggestion delete it, or can the user get it back?', a: 'In this demo, accepting a suggestion removes its card from the suggestion list (after the fade-out animation) and adds a corresponding real task. In a production implementation, you would typically also remove that suggestion from the source recommendation set so it isn\'t offered again, but you could add an "undo" toast if a user accepts a suggestion by mistake — the addTask() and row-removal logic are separate enough to support that extension.' },
      { q: 'How would I generate real AI suggestions instead of the hardcoded mock ones?', a: 'Replace the three static .suggestion-item entries with server-rendered or client-fetched data from an LLM call or heuristic — for example, summarizing recent emails or calendar events into candidate task titles. Keep the same markup shape (data-text attribute, .suggestion-text content, .ai-tag badge) so the existing click-to-add and dismiss-animation JavaScript works unchanged against the new data.' },
      { q: 'Why keep the manual "create your own" input if AI suggestions are available?', a: 'Removing manual creation would take away user agency and would fail any user whose actual need doesn\'t match the suggestions — which, especially early on, is common. Good AI-assisted UI always keeps a first-class manual path; the suggestions should lower effort for uncertain users, not become the only option. This is why both paths call the same underlying addTask() function and produce identical resulting task items.' },
      { q: 'Can this pattern work for something other than a task list?', a: 'Yes — the suggestion-plus-manual-input shape generalizes to any empty or zero-result state: empty inboxes (suggested contacts), zero-result search (suggested alternate queries), empty dashboards (suggested metrics/widgets), or empty CRM pipelines (suggested deals to log). Change the header copy, icon, and suggestion content to match the context while keeping the same interaction structure.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how addTask() is shared between the suggestion "+ Add" buttons and the manual create form, and why that shared function matters for keeping both paths consistent. It's a good snippet to extend with AI help: ask it to wire the suggestion source to a real API call that returns contextual suggestions (and to design a sensible loading/skeleton state while that call is in flight), to add an "undo" toast after a suggestion is accepted in case the user changes their mind, or to generalize the component so the same suggestion-plus-manual-input shape can be reused for an empty search-results state with different copy and suggestion content. You can also ask it to review whether the "Suggested" labeling is clear enough for accessibility (e.g. whether it needs an aria-label beyond the visual tag) for screen reader users.`,
      prompt: `Build an empty-state panel in plain HTML, CSS, and JavaScript for a task list that offers AI-suggested starter items instead of a generic "add your first item" dead end.

Requirements:
- An empty-state header with a short heading (e.g. "No tasks yet") and one sentence of supporting copy explaining that suggestions below are personalized starting points.
- Three suggested starter items, each clearly and honestly labeled as AI-suggested (e.g. a small "Suggested" badge), with realistic, specific example text (not generic placeholders like "Task 1") and a one-click "+ Add" action per item.
- Clicking "+ Add" on a suggestion must add a new confirmed item to a visible list with an entrance animation, and the source suggestion card must animate out (fade/slide) rather than disappearing abruptly, only being removed from the DOM after its exit transition completes.
- Below the suggestions, include a clearly separated "or create your own" section with a real text input and submit action that adds items through the exact same underlying add-item function as the suggestions use — the manual path must remain fully functional and equally prominent, never hidden or de-emphasized.
- Use event delegation for the suggestion "+ Add" buttons rather than attaching a separate listener per button.
- Keep the component's data structure generic enough that the same pattern (suggestions + manual fallback) could be reused for a different empty-state context (e.g. empty search results) with only copy and suggestion-content changes.`,
    },
  },
};
export default emptyStateAiSuggestions;
