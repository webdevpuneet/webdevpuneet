/* Hand-written SEO content for the ten social post templates added on 2026-11-02 (checklist, how-to-steps,
   mistakes-to-avoid, this-or-that, hot-take, pricing-card, new-blog-article, save-the-date, thank-you,
   valentines-day). Merged into TEMPLATE_SEO and TEMPLATE_WHY by seo-content.js and seo-why.js, same shape:
   keywords, about, 8 features, 4 use cases (18-42 words), 4 FAQs (answers 25-70 words), aiPrompt. */

export const TEMPLATE_SEO_NEW = {
  checklist: {
    keywords: ['checklist post template', 'instagram checklist template', 'to-do list social media post', 'saveable checklist graphic', 'linkedin checklist post'],
    about: {
      title: 'Checklist Post — Free Notebook-Paper Checklist Template for Instagram',
      description: `**Checklist Post** is a free social media template that dresses a to-do list as a page torn from a notebook: cream paper, faint blue ruled lines, a red margin line down the left and up to six tick-marked items. It is made for the posts people screenshot and save, such as a pre-launch routine, a packing list or a monthly audit.

**Why a checklist gets saved**

A paragraph of advice is read once. A checklist is something you come back to while you do the work, which is why these posts collect saves on Instagram and bookmarks on LinkedIn. The template ends with a note line you can reword, such as "Save this for launch day", so the ask is part of the design. Items are short on purpose: one bold line each, with a tick box tilted a few degrees so the page feels handled rather than printed.

**Six rows, no gaps**

Fill in anywhere from one to six items. A row you leave empty disappears and the rest re-centre, so a four-item list never leaves a blank band at the bottom. Long items shrink to fit instead of running into the margin. Wrap a word in *asterisks* in the headline to colour it in the tick colour, as in "Before you hit *publish*".

**Every size from one design**

On the 4:5 portrait feed size the items stack in one column. On the 16:9 and LinkedIn sizes they switch to two columns so six items still fit, and the Story size keeps text clear of Instagram's top and bottom bars. Paper, ink and tick colours are editable, and you can export PNG, JPEG, PDF, an animated video where the items appear one after another, or the HTML.

Need more room? Continue a long list in a carousel with [Carousel Step](/social-post-templates/carousel-step/) slides, or show an ordered process with [How-To Steps](/social-post-templates/how-to-steps/).`,
    },
    features: [
      'Notebook-paper background with ruled lines and a red margin line',
      'Up to six tick-marked items; empty rows disappear',
      'Tilted tick boxes at alternating angles for a hand-stamped look',
      'Headline with *asterisk* highlights in the tick colour',
      'Label chip and an editable "save this" note line',
      'Two-column layout on the 16:9 and LinkedIn sizes',
      'Editable paper, ink and tick colours',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🚀', title: 'Launch and release routines', desc: 'Turn your pre-launch routine into a post: titles, alt text, links, speed and share image. Readers save it, and your team can pin the same card in their chat.' },
      { icon: '🧳', title: 'Packing, travel and event prep', desc: 'Share what to pack, bring or book before a trip, a trade show or a workshop. A tick-box list is exactly the format people expect for this.' },
      { icon: '🧾', title: 'Audits and monthly routines', desc: 'Post a monthly SEO, security or bookkeeping check as six ticks. It positions you as someone with a system, and invites replies about what people would add.' },
      { icon: '🌱', title: 'Customer onboarding and care', desc: 'Give new customers a first-week list, or plant owners a seasonal care list. It answers their questions before they have to ask them.' },
    ],
    faqs: [
      { q: 'How do I make a checklist post for Instagram?', a: 'Open the Checklist Post template, type your headline and up to six items, reword the note at the bottom, then download the 4:5 PNG (1080×1350). Upload it as a single image, or as the first slide of a carousel that adds more detail.' },
      { q: 'How many items should a checklist post have?', a: 'Between four and six. Fewer than four feels thin, and more than six makes the text too small to read on a phone. If you have more, split the list into two posts or continue it in a carousel.' },
      { q: 'Can I change the paper and tick colours?', a: 'Yes. Paper, text and tick colours are all editable, and your choices are saved in your browser for this template. A dark paper with a bright tick colour suits technical topics.' },
      { q: 'Does the checklist work on LinkedIn?', a: 'Yes. The 1200×627 LinkedIn image size switches the list into two columns so all six items stay readable in the feed. For a document-style post, export a carousel PDF with extra slides.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Checklist Post HTML and CSS: write six items for your own routine, turn the card into a component that renders any array of tasks, or produce a matching carousel with one detail slide per item.',
      prompt: `Create a 1080×1350 checklist social post in plain HTML and CSS.

- Cream notebook paper (#fbf6e9) with faint blue horizontal ruled lines every 7% of the width and a thin red vertical margin line near the left edge.
- A small uppercase teal label with an underline, then a bold headline "Before you hit publish" with the last word in teal.
- Six checklist rows: a rounded teal square with a white tick, tilted a few degrees alternately left and right, followed by one bold line of text.
- A footer with a "Save this for launch day" note on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'how-to-steps': {
    keywords: ['how to post template', 'step by step post template', 'instagram tutorial template', 'numbered steps graphic', 'process steps social media post'],
    about: {
      title: 'How-To Steps — Free Step-by-Step Tutorial Post Template',
      description: `**How-To Steps** is a free social media template for explaining a process in four moves or fewer. It is a dark card with a glowing vertical timeline: numbered circles linked by a neon line, each step carrying a short title and a one-line detail. It suits any "how to" where the order matters, such as a setup, a deployment, a recipe or an onboarding flow.

**A timeline that makes the order obvious**

The numbers sit inside outlined circles that glow against the navy background, and the line between them fades from bright to dim, so the eye travels downwards without being told to. Because the order is built into the shape, you can keep each step to a handful of words. A title of two or three words and a detail of one sentence is the sweet spot.

**Up to four steps, tidy when you use fewer**

Fill in as many steps as you need. Leave the fourth step empty and it disappears, and the remaining steps re-centre on the line, so a three-step guide looks intentional. The headline shrinks step by step if it is long, and wrapping part of it in *asterisks* colours that part in the glow colour, for example "Deploy a site in *4 steps*".

**Built for every feed**

On the 4:5 portrait size the steps run down the card. On the 16:9 and LinkedIn sizes the headline sits on the left and the timeline on the right, so a guide still reads well in a wide feed. Story size keeps the steps clear of the top and bottom bars. Colours are editable, and the animated video export reveals the headline first, then each step in order, which suits a Reel.

For a list where the order does not matter, use [Checklist Post](/social-post-templates/checklist/). For a longer guide, start with a [Carousel Cover](/social-post-templates/carousel-cover/) and use this card as the single-image summary.`,
    },
    features: [
      'Glowing vertical timeline with numbered circles',
      'Up to four steps, each with a title and a one-line detail',
      'Empty steps disappear and the rest re-centre',
      'Headline with *asterisk* highlights in the glow colour',
      '"Step by step" label chip and handle',
      'Headline-left, timeline-right layout on 16:9 and LinkedIn',
      'Editable background, text and glow colours',
      'Animated video export reveals each step in order',
    ],
    useCases: [
      { icon: '🛠', title: 'Setup and deployment guides', desc: 'Show the four moves to install, configure or deploy something. Short titles and one-line details keep a technical process readable on a phone.' },
      { icon: '🍳', title: 'Recipes and routines', desc: 'Break a recipe, a morning routine or a skincare routine into numbered steps that people can follow while their hands are busy.' },
      { icon: '🎓', title: 'Course and workshop previews', desc: 'Tease a lesson with the first four steps and invite people to join for the rest. It shows teaching quality without giving the whole lesson away.' },
      { icon: '🤝', title: 'Customer onboarding', desc: 'Explain how to get started with your product in four steps: sign up, connect, customise, launch. It doubles as a help-centre image.' },
    ],
    faqs: [
      { q: 'How do I make a step-by-step post?', a: 'Open How-To Steps, write a headline, then add up to four step titles with one-line details. Download the 4:5 PNG for the feed, or choose animated video in the Export menu to reveal each step in order for a Reel.' },
      { q: 'What if I have more than four steps?', a: 'Group related actions into one step, or turn the guide into a carousel with one step per slide. This card then works as a one-image summary that points people to the full carousel.' },
      { q: 'Can I change the glow colour?', a: 'Yes. The background, text and accent colours are editable. The accent drives the numbers, the timeline and its glow, so one colour change recolours the whole card to match your brand.' },
      { q: 'Does it work for non-technical topics?', a: 'Yes. The dark, glowing look suits software, but changing the colours to warm tones makes it work for cooking, fitness or crafts. The structure of numbered steps is the same for any process.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the How-To Steps HTML and CSS: rewrite the steps for your own process, generate a numbered-steps component that accepts any array, or animate the line so it draws downward as the steps appear.',
      prompt: `Create a 1080×1350 "how to" social post in plain HTML and CSS.

- Very dark navy background (#0b1020) with a cyan glow in the bottom-left corner.
- A small outlined cyan pill label "Step by step", then a bold headline "Deploy a site in 4 steps" with "4 steps" in cyan.
- A vertical timeline: a glowing cyan line fading downward, with four numbered circles (outlined cyan, number inside) connected by it.
- Next to each circle, a bold step title and a one-line grey detail.
- Handle at the bottom right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'mistakes-to-avoid': {
    keywords: ['mistakes to avoid post template', 'do and dont post template', 'common mistakes instagram post', 'warning post template', 'dos and donts graphic'],
    about: {
      title: 'Mistakes to Avoid — Free "Do This Instead" Post Template',
      description: `**Mistakes to Avoid** is a free social media template for the post format that experts reach for when they want to teach by warning: here is what people get wrong, and here is what to do instead. A hazard-tape stripe runs across the top, a yellow "Stop doing this" sticker sits at a slight angle, and each mistake gets its own card.

**Wrong way, right way, in one glance**

Every card pairs two lines. The mistake is struck through with a red line next to a red cross, and underneath it the fix appears in green after an arrow. A reader sees the problem and the answer together, which is more useful than a list of things not to do. The red edge on each card and the warm-black background make the page read as a warning without shouting.

**Three to four mistakes, never a gap**

Write up to four pairs. Leave the fourth empty and the card disappears, and the rest centre themselves. If a mistake or fix is long, the type shrinks to fit rather than overflowing. Put part of the headline in *asterisks* to colour it yellow, for example "3 mistakes that *quietly* kill your landing page".

**Credible, saveable advice**

This format works because it is specific. "Five different buttons" with the fix "One clear action per page" teaches something; "bad design" does not. Use the post to share a lesson from your own work, name the cost of the mistake if you know it, and invite readers to add their own mistakes in the comments.

The layout switches to two columns on the 16:9 and LinkedIn sizes and keeps text clear of the Story bars. Colours are editable, and you can export PNG, JPEG, PDF, animated video or HTML. For the positive version, try [How-To Steps](/social-post-templates/how-to-steps/), and for a myth-busting angle try [Myth vs Fact](/social-post-templates/myth-vs-fact/).`,
    },
    features: [
      'Yellow-and-black hazard-tape stripe along the top edge',
      'Tilted "Stop doing this" warning sticker',
      'Up to four cards, each with a struck-through mistake and a green fix',
      'Red cross badge and red edge on every card',
      'Empty cards disappear and the rest re-centre',
      'Headline with *asterisk* highlights in the warning colour',
      'Two-column layout on the 16:9 and LinkedIn sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🎯', title: 'Expert advice for beginners', desc: 'Share the three mistakes you see most often in your field, each with the fix. It shows experience and gives newcomers a shortcut they will want to save.' },
      { icon: '🏗', title: 'Client and project lessons', desc: 'Turn a lesson from a past project into a post: what went wrong, what you do now. Honest, specific posts build more trust than general tips.' },
      { icon: '📉', title: 'Conversion and marketing audits', desc: 'Point out common landing page, email or ad mistakes with a one-line fix each. This is a natural lead-in to an audit or consulting offer.' },
      { icon: '🧯', title: 'Safety and best-practice reminders', desc: 'Remind a team or audience of what not to do, such as weak passwords, unchecked backups or skipped stretches, with a clear safer alternative.' },
    ],
    faqs: [
      { q: 'How many mistakes should I list?', a: 'Three is the sweet spot for a single post, four at most. The headline can promise the number ("3 mistakes that..."), and fewer, better examples are more convincing than a long list of generic problems.' },
      { q: 'Why include a fix with every mistake?', a: 'A post that only criticises feels negative and is rarely saved. Pairing each mistake with a fix gives the reader something to act on, which is what makes the post worth bookmarking and sharing.' },
      { q: 'Can I remove the red and yellow warning style?', a: 'Yes. The background, card, text, warning and fix colours are all editable. Soft colours turn the same layout into a gentle "common slip-ups" post, and the hazard stripe uses the warning colour so it changes with it.' },
      { q: 'Is this a good LinkedIn format?', a: 'Yes. Mistakes-and-fixes posts do well on LinkedIn because they show professional experience. Use the 1200×627 size, where the cards switch to two columns, or the 4:5 portrait for the feed.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Mistakes to Avoid HTML and CSS: write mistake-and-fix pairs for your own field, turn the cards into a reusable component, or make a "myth, mistake, fix" carousel from the same wording.',
      prompt: `Create a 1080×1350 "mistakes to avoid" social post in plain HTML and CSS.

- Near-black warm background (#15110b) with a yellow-and-black diagonal hazard-tape stripe across the top edge, made with repeating-linear-gradient.
- A small tilted yellow sticker "Stop doing this" in uppercase, then a bold headline "3 mistakes that quietly kill your landing page" with "quietly" in yellow.
- Three dark cards, each with a red left border and a red circular cross badge. In each card a struck-through mistake line, and under it a green line starting with an arrow and the fix.
- Handle at the bottom right in yellow.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'this-or-that': {
    keywords: ['this or that post template', 'this or that instagram template', 'vote post template', 'would you rather post template', 'poll post graphic'],
    about: {
      title: 'This or That — Free Instagram Vote Post Template With Diagonal Split',
      description: `**This or That** is a free social media template that turns a simple choice into a loud, colourful post. The canvas is cut on a diagonal: indigo above, rose below, with a yellow "OR" badge sitting right on the dividing line. Each side holds one big option with a white A or B circle, and the footer tells people how to vote.

**Designed to be answered in one word**

The best this-or-that posts have options that can be typed in a second: "Dark mode" or "Light mode", "Tabs" or "Spaces", "Coffee" or "Tea". The template makes each option huge, with a short question chip at the top, so there is no doubt what is being asked. The prompt line at the bottom, "Comment A or B", gives people the exact reply to type, which is why this format reliably fills a comment section.

**Fits a feed, not just a Story**

Instagram's poll sticker lives in Stories. This template is for the feed, where votes happen in the comments, so the result stays visible and you can reply to people and keep the thread going. Use it for audience polls, fun team debates, or a quick way to ask followers which product colour, logo or feature to ship.

**Colours and sizes**

The two sides take their own colours, so swap them to your brand pair or to the two sides of the debate, such as red against blue. The diagonal split runs across the portrait, square and Story sizes, and the layout switches to a left-and-right split on the 16:9 and LinkedIn sizes. Long options shrink to fit, and you can export PNG, JPEG, PDF, an animated video where the options appear one after another, or the HTML.

For a Story that uses Instagram's own sticker, use [Story Poll](/social-post-templates/story-poll/). To ask for an opinion rather than a choice, try [Hot Take](/social-post-templates/hot-take/).`,
    },
    features: [
      'Bold diagonal split in two editable colours',
      'Large A and B options with circular letter badges',
      'Round yellow OR badge on the dividing line',
      'Question chip at the top and a "Comment A or B" prompt',
      'Long options shrink to fit',
      'Left-and-right split on the 16:9 and LinkedIn sizes',
      'Editable colours for each side and the OR badge',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '☕', title: 'Fun audience polls', desc: 'Ask a light question your followers have strong feelings about, such as coffee or tea, to start a comment thread that keeps your account active.' },
      { icon: '💻', title: 'Developer and designer debates', desc: 'Tabs or spaces, light or dark, Figma or Sketch. Niche this-or-that questions get high engagement because people enjoy picking a side in their own field.' },
      { icon: '🛍', title: 'Product and design feedback', desc: 'Show two colours, two names or two features and let followers choose before you decide. It is cheap market research that also makes people feel heard.' },
      { icon: '🏢', title: 'Team and culture posts', desc: 'Post a light choice about office life, such as remote or office or pizza or tacos, to show the people behind a brand.' },
    ],
    faqs: [
      { q: 'How do I make a this-or-that post?', a: 'Open This or That, type your question and the two options, choose a colour for each side, and keep the prompt "Comment A or B". Download the 4:5 PNG and post it to the feed.' },
      { q: 'Is this different from an Instagram poll?', a: 'Yes. A poll sticker is added in Stories and counts votes inside the app. This template is an image for the feed, where people vote in the comments, so the debate stays public and you can reply to answers.' },
      { q: 'What makes a good this-or-that question?', a: 'Two options that are easy to type in one word, with no clearly correct answer. Choices linked to your field or your audience\'s habits work best because people have opinions and enjoy defending them.' },
      { q: 'Can I use it as a Story?', a: 'Yes. Choose the Story size and the diagonal split fills the 9:16 canvas with text clear of the top and bottom bars. Add the poll sticker in Instagram on top if you want votes counted.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the This or That HTML and CSS: write ten this-or-that pairs for your niche, build an interactive version that counts clicks on each side, or generate a series with a new pair each day of the week.',
      prompt: `Create a 1080×1350 "this or that" social post in plain HTML and CSS.

- The whole canvas is rose (#e11d48). Over it, an indigo (#4f46e5) layer clipped with clip-path polygon(0 0,100% 0,100% 40%,0 60%) to make a diagonal split.
- A small uppercase pill at the top with a translucent dark background: "Your coding setup?".
- In the indigo half: a white circle with the letter A and the huge white word "Dark mode". In the rose half: a white circle with B and "Light mode".
- A round yellow badge reading "OR", tilted slightly, centred on the diagonal with a soft shadow.
- A footer with a "Comment A or B" pill on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'hot-take': {
    keywords: ['hot take post template', 'opinion post template instagram', 'unpopular opinion post template', 'agree or disagree post', 'debate post graphic'],
    about: {
      title: 'Hot Take — Free Opinion Post Template for Instagram & LinkedIn',
      description: `**Hot Take** is a free social media template for the post where you put one strong opinion on the table and let people argue. A tilted black sticker with a flame announces the take, a huge condensed uppercase statement fills the card on a red-to-orange gradient, and two chips underneath, Agree and Disagree, make picking a side feel effortless.

**One opinion, as loud as it can be**

The statement is set in a tall condensed display face at a very large size, so even a twelve-word opinion reads from across a feed. Wrap the word that carries the argument in *asterisks* to turn it yellow, as in "Most landing pages need *fewer* sections, not more". The glow at the bottom edge is the same yellow, and together they give the card the heat that the sticker promises.

**Built to start a conversation**

A hot take works when it is specific and defensible. "Marketing is important" is not a take; "Most landing pages need fewer sections, not more" is one that a reasonable person could contest. The question line under the statement, "Agree or disagree?", tells people what to do, and the chips give them the words. Put your reasoning in the caption and answer the first replies quickly.

**Sizes and export**

The statement shrinks step by step when it is long, so you can write a full sentence without it overflowing. On the 16:9 and LinkedIn sizes the text size adjusts so the card still fills the frame, and the Story size keeps the sticker and the chips clear of Instagram's bars. Colours are editable, so the gradient can become black and white for a serious opinion, and you can export PNG, JPEG, PDF, animated video or HTML.

Prefer a choice to an opinion? Use [This or That](/social-post-templates/this-or-that/). To correct a common belief rather than provoke one, try [Myth vs Fact](/social-post-templates/myth-vs-fact/).`,
    },
    features: [
      'Tilted black "hot take" sticker with a flame',
      'Huge condensed uppercase statement with *asterisk* highlights',
      'Red-to-orange gradient with a warm glow along the bottom edge',
      'Agree and Disagree chips under a follow-up question',
      'Statement shrinks to fit longer opinions',
      'Editable gradient, text and highlight colours',
      'Layout adjusts for 16:9, LinkedIn and Story sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🔥', title: 'Unpopular opinions in your field', desc: 'Share a view you hold that most of your industry would push back on. A clear, reasoned disagreement earns far more replies than agreeing with everyone.' },
      { icon: '🔮', title: 'Predictions and trend takes', desc: 'Post a bold prediction for next year, such as which tool or habit will fade. Readers return later to see if you were right.' },
      { icon: '🚀', title: 'Founder and personal-brand content', desc: 'Founders and creators use hot takes to show a point of view. One strong opinion a week makes an account memorable among similar ones.' },
      { icon: '🎙', title: 'Podcast and newsletter teasers', desc: 'Pull the most provocative line from an episode or issue and set it on a hot take card, then point to the full argument in the caption.' },
    ],
    faqs: [
      { q: 'How do I write a good hot take?', a: 'State one specific claim that a reasonable person in your field could disagree with, in one short line. Avoid empty slogans. Then explain your reasoning in the caption and answer the first comments quickly to keep the thread alive.' },
      { q: 'Are hot take posts good for LinkedIn?', a: 'Yes, when the opinion is professional and defensible. Use the LinkedIn image size or the 4:5 portrait. Keep the tone confident rather than combative, and put your experience behind the claim in the post text.' },
      { q: 'Can I remove the flame emoji?', a: 'The flame comes from the sticker text, so you can edit the label to anything you like, for example "Unpopular opinion" or "Prediction". Change the colours too if you want a serious look instead of a fiery one.' },
      { q: 'Does it work as an Instagram Story?', a: 'Yes. Pick the Story size and the statement fills the 9:16 canvas, with the sticker and chips clear of the top and bottom bars. Add Instagram\'s emoji slider sticker on top for a quick reaction.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Hot Take HTML and CSS: brainstorm ten defensible opinions in your industry, turn the chips into clickable vote buttons for a web version, or write the caption that argues your side.',
      prompt: `Create a 1080×1350 "hot take" social post in plain HTML and CSS.

- A red-to-orange diagonal gradient background (#ff5a1f to #be123c) with a soft yellow radial glow rising from the bottom edge.
- A small black tilted sticker at the top left with yellow uppercase text "🔥 Hot take" in a condensed display font (Bebas Neue) and a hard offset shadow.
- A huge uppercase white statement in Bebas Neue, "Most landing pages need fewer sections, not more", with "fewer" in yellow.
- At the bottom: the question "Agree or disagree?" with two outlined translucent pill chips "Agree" and "Disagree", and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'pricing-card': {
    keywords: ['pricing card post template', 'pricing post template instagram', 'subscription plan social post', 'saas pricing graphic', 'price announcement post template'],
    about: {
      title: 'Pricing Card — Free Plan & Price Social Post Template',
      description: `**Pricing Card** is a free social media template that lays a single plan out like the card on a pricing page: a "most popular" ribbon on the top edge, the plan name in your accent colour, a very large price with its billing period, up to four tick-marked features and a full-width button. It is made for the moment you announce a new tier, a price change or an offer.

**The card does the selling**

A pricing page works because every element has a fixed place, and this template keeps that order: who the plan is for, what it costs, what is included, what to do next. The price is the biggest thing on the card, set in heavy type with tight spacing, and a dashed rule separates it from the features so the eye reads cost first and value second. The ribbon, a gradient pill in your accent colour, gives the plan a reason to stand out.

**Features without the clutter**

Add up to four features, one short line each. Leave the fourth blank and it disappears, so a three-feature plan stays balanced. The tagline under the plan name, such as "For teams shipping every week", tells the right buyer that this card is for them. The button text, for example "Start free for 14 days", is a plain call to action, since links are added in the caption or bio.

**Sizes and style**

The card sits centred on a soft lavender background with a glow in the corner. On the 16:9 and LinkedIn sizes it opens into two columns: plan and price on the left, features on the right. Change the accent to your brand colour and everything, including the ribbon, ticks and button, follows. Export PNG, JPEG, PDF, an animated video or the HTML.

Pair it with a [Discount Badge](/social-post-templates/discount-badge/) for a launch offer, or compare yourself with alternatives in [Us vs Them](/social-post-templates/us-vs-them/).`,
    },
    features: [
      '"Most popular" ribbon in a gradient pill on the card edge',
      'Plan name and a short tagline for the right buyer',
      'Very large price with its billing period',
      'Up to four tick-marked features; empty rows disappear, and the ticks pop in one by one in Play and the video',
      'Full-width call-to-action button',
      'Soft background with an accent glow',
      'Two-column card on the 16:9 and LinkedIn sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🆕', title: 'New plan or tier announcements', desc: 'Announce a new tier with its name, price and what it includes. The card format is instantly recognisable as a plan, so people grasp it in a second.' },
      { icon: '📣', title: 'Launch offers and trials', desc: 'Pair a plan with a trial or a launch price in the button text, such as "Start free for 14 days", and post it on launch day.' },
      { icon: '🧑‍🏫', title: 'Courses and memberships', desc: 'Show what a course or membership costs and includes without sending people to a long sales page first. Four features are usually enough.' },
      { icon: '🧰', title: 'Agency and freelance packages', desc: 'Present service packages as cards, such as starter, standard and premium, one per post or one per carousel slide, with clear scope on each.' },
    ],
    faqs: [
      { q: 'How do I make a pricing post for social media?', a: 'Open Pricing Card, type the plan name, tagline, price, billing period and up to four features, then write the button text. Download the 4:5 PNG, and put the link in the caption or your bio, since images cannot hold links.' },
      { q: 'Can I show several plans at once?', a: 'Make one card per plan and post them as a carousel, or one per day. A single card is easier to read on a phone than three squeezed side by side, and each can use its own accent colour.' },
      { q: 'What goes in the "most popular" ribbon?', a: 'Anything short that gives the card a reason to stand out, such as "Most popular", "Best value" or "New". Clear the field and the ribbon disappears completely if you do not need one.' },
      { q: 'Does this work for non-software pricing?', a: 'Yes. Change the plan name, price and features for a gym membership, a photography package, a course or a monthly service. The layout only assumes a name, a price and a short list.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Pricing Card HTML and CSS: turn it into a three-plan pricing section with a monthly and yearly switch, write the features for your own product, or generate matching cards for each tier.',
      prompt: `Create a 1080×1350 pricing card social post in plain HTML and CSS.

- A soft lavender background (#eef0ff) with a purple radial glow in the top-right corner.
- A white rounded card with a purple outline and a soft purple shadow, centred. On its top edge, a gradient purple-to-pink pill ribbon reading "Most popular".
- Inside: the plan name "Pro" in purple, a grey tagline, then a huge price "$29" with "per month" beside it, and a dashed rule underneath.
- Four feature rows, each a purple circle with a white tick and a bold line of text, then a full-width purple button "Start free for 14 days".
- The handle in purple under the card.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'new-blog-article': {
    keywords: ['new blog post announcement template', 'blog post social media template', 'new article post template', 'blog promotion instagram post', 'newsletter issue announcement graphic'],
    about: {
      title: 'New Blog Article — Free Blog Post Announcement Template',
      description: `**New Blog Article** is a free social media template for the post you will make more often than any other: telling people that something new is live. It is laid out like the opening of a magazine feature: a small "new on the blog" tag with a dot, a cover image, a serif headline, a two-line excerpt, a reading-time line and a dark button that points to your bio link.

**An editorial look that says "worth reading"**

Most blog announcements are a screenshot of the page. This card is built more carefully: warm paper-white background, a Playfair serif headline that suggests long-form writing, and generous spacing so the title does the work. Wrap the most interesting words in *asterisks* to colour them in the accent, like "Why your *first screen* decides everything".

**Your cover image, handled for you**

Upload the article's cover or a crop of its best chart, and drag to choose the crop. Until you add one, the cover shows an accent-coloured gradient, so the post looks finished in the editor. The excerpt is one or two lines that make a promise, for example the result a reader will get, and the read-time line, such as "7 min read · 2 Nov", sets expectations.

**Send people to the right place**

Instagram posts cannot hold links, so the button says "Read it · link in bio", and you update the bio link or add a link sticker in Stories. On LinkedIn and X, put the URL in the post text. The template switches to a two-column layout on the 16:9 and LinkedIn sizes, with the cover on the right, and the Story size keeps the button clear of the bottom bar.

Make a series by keeping the same colours and changing only the title, cover and excerpt. Pair it with [Product Launch](/social-post-templates/product-launch/) for bigger announcements or [Carousel Cover](/social-post-templates/carousel-cover/) to turn the article into a swipeable summary.`,
    },
    features: [
      '"New on the blog" tag with an accent dot',
      'Cover image slot with drag-to-reposition crop and a gradient fallback',
      'Serif headline with *asterisk* highlights in the accent colour',
      'Excerpt and read-time and date line',
      'Dark "Read it · link in bio" button and handle',
      'Cover moves to the right on the 16:9 and LinkedIn sizes',
      'Editable paper, ink and accent colours',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '📝', title: 'Every new blog post', desc: 'Give each article the same recognisable announcement card so followers learn to spot new posts. Only the title, cover and excerpt change between them.' },
      { icon: '📨', title: 'Newsletter issues', desc: 'Announce a new issue of your newsletter with its main story, a cover image and the number of minutes it takes to read.' },
      { icon: '🔁', title: 'Resharing older articles', desc: 'Bring back a post that still ranks or helps. A fresh card with the same link gives evergreen content a second life on every channel.' },
      { icon: '📚', title: 'Guest posts and press features', desc: 'Share where you were published or featured with the headline and the publication in the label, linking to the piece in the caption.' },
    ],
    faqs: [
      { q: 'How do I announce a blog post on Instagram?', a: 'Use New Blog Article: add the cover, headline and excerpt, keep the "link in bio" button, and update your bio link to the article. In Stories, add a link sticker on top. In the caption, tell people what they will learn.' },
      { q: 'What should the excerpt say?', a: 'One or two lines that promise a specific result or answer, not a summary of the introduction. "The three changes that doubled our sign-ups" gives a reason to click that a general description does not.' },
      { q: 'Can I use it for LinkedIn and X posts?', a: 'Yes. The 1200×627 LinkedIn size puts the cover on the right and the text on the left. Replace "link in bio" with "Read it below" and put the URL in the post text.' },
      { q: 'What if the article has no good cover image?', a: 'Leave the cover empty and it shows a gradient in your accent colour. You can also crop a chart or a screenshot from the article, which often works better than a stock photo.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the New Blog Article HTML and CSS: write an excerpt that makes a specific promise, turn the card into a component fed by your RSS feed, or generate a matching Story with a link sticker space.',
      prompt: `Create a 1080×1350 "new blog article" social post in plain HTML and CSS.

- Warm paper-white background (#f6f1e7), dark text, burnt-orange (#c2410c) accent.
- A small uppercase tag "New on the blog" with a filled orange dot before it.
- A rounded cover image (a gradient placeholder) about one third of the height, with a soft shadow.
- A bold serif headline in Playfair Display, "Why your first screen decides everything", with "first screen" in orange.
- A grey two-line excerpt and a small line "7 min read · 2 Nov".
- A footer with a dark pill button "Read it · link in bio" and the handle in orange on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'save-the-date': {
    keywords: ['save the date post template', 'save the date instagram template', 'event date announcement template', 'save the date social media graphic', 'elegant event announcement post'],
    about: {
      title: 'Save the Date — Free Elegant Event Announcement Post Template',
      description: `**Save the Date** is a free social media template for the quiet announcement that comes before the invitation: the date is fixed, the details are coming. It is drawn like printed stationery, with a cream card inside a double gold frame, a widely spaced "Save the date" label, an italic event name and a very large serif date between two thin rules.

**The date is the design**

On a save-the-date, the one thing the reader must remember is when. So the date is set in the largest type on the card, with the year in spaced gold capitals beneath it, and everything else is quiet. The event name sits above it in italic, and the time and place sit below in a smaller line. Wrap part of the name in *asterisks* to colour it gold, for example "The *Autumn* Design Gala".

**Stationery that suits more than weddings**

The gold frame and serif type suit weddings and anniversaries, and they work just as well for a conference gala, a charity dinner or a product launch evening. Change the gold to a deep green or navy and the same layout becomes a corporate announcement. The footer line, "Formal invitation to follow", sets expectations and can be reworded, such as "Tickets on sale 1 February".

**Sizes and export**

The frame follows the edge of the post at every size, from the 4:5 portrait feed post to the Story size, where the text stays clear of Instagram's bars, and to the wide 16:9 and LinkedIn images. Long details wrap rather than overflow. You can export PNG, JPEG, PDF, an animated video where the label, name and date appear in turn, or the HTML.

Build momentum afterwards with [Countdown](/social-post-templates/countdown/) as the date approaches, [Webinar Event](/social-post-templates/webinar-event/) when you share programme details, and [Event Recap](/social-post-templates/event-recap/) when it is over.`,
    },
    features: [
      'Cream card with a double gold frame',
      'Widely spaced "Save the date" label',
      'Italic event name with *asterisk* highlights in gold',
      'Very large serif date with a spaced year between thin rules',
      'Time and place line and an "invitation to follow" note',
      'Frame follows the edge at every post size',
      'Editable paper, ink and gold colours',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '💍', title: 'Weddings and celebrations', desc: 'Send the date to friends and family before the formal invitation is ready. Gold on cream is the stationery look couples expect.' },
      { icon: '🎤', title: 'Conferences and galas', desc: 'Announce the date of next year\'s event months early so people can plan travel and budgets, and follow up with a countdown and a programme.' },
      { icon: '🚀', title: 'Launch evenings and open days', desc: 'Give a product launch party, studio open day or shop opening a dated, elegant announcement that stands out from sale-style posts.' },
      { icon: '❤', title: 'Charity and community events', desc: 'Announce a fundraising dinner, concert or fair with its date and venue, and use the note line to say when tickets go on sale.' },
    ],
    faqs: [
      { q: 'What should a save-the-date post include?', a: 'The event name, the date, the year, and the city or venue, with a line about what comes next such as "Formal invitation to follow". Keep it short; details like the schedule belong in later posts.' },
      { q: 'How early should I post a save the date?', a: 'For weddings, six to twelve months ahead; for conferences, three to six months; for smaller events, four to six weeks. Follow with a countdown post as the date nears, and an invitation with tickets or RSVP details.' },
      { q: 'Can I change the gold to match my brand?', a: 'Yes. The paper, text and gold colours are editable, and the frame, label, year and highlights all use the gold. A navy or deep green gives the same layout a corporate look.' },
      { q: 'Does it work as an Instagram Story?', a: 'Yes. Select the Story size and the card fills 9:16 with the date and text kept clear of the top and bottom bars. Add an "Add to calendar" or link sticker in Instagram on top of the design.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Save the Date HTML and CSS: write the time and place line for your event, add a live countdown to the date, or generate an "Add to calendar" link for the caption.',
      prompt: `Create a 1080×1350 "save the date" social post in plain HTML and CSS.

- A cream background (#f8f2e6) with a double gold (#a9772b) frame inset from the edges: a thin outer line and a fainter inner line.
- Centred, from top to bottom: a small uppercase label "Save the date" with very wide letter-spacing in gold; an italic Playfair Display event name "The Autumn Design Gala" with "Autumn" in gold; a short gold rule; the huge date "14 March" in Playfair Display bold; the year "2027" in spaced gold capitals; another rule.
- Under it, "7 pm · The Glasshouse, Lisbon" in a smaller sans-serif.
- At the bottom: an italic note "Formal invitation to follow" and the handle in gold.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'thank-you': {
    keywords: ['thank you post template', 'customer appreciation post template', 'thank you instagram post', 'milestone thank you graphic', 'thanks for your support post'],
    about: {
      title: 'Thank You — Free Customer Appreciation Post Template',
      description: `**Thank You** is a free social media template for saying it properly: a warm peach-to-apricot background scattered with confetti dots, a pill label that reads "From all of us", a huge headline, a heartfelt paragraph and a sign-off. It is meant for the moments when a brand wants to thank its customers and followers without selling anything.

**Warm, not corporate**

The type is heavy and friendly, set tight so the headline can be very large, and the number or word you highlight in *asterisks* turns the accent orange: "Thank you, *10,000* times over". The confetti is drawn in CSS, using three warm colours in fixed positions, so the card feels like a celebration even before you add a photo. The sign-off is set in italic, like a handwritten note at the bottom of a card.

**What to say**

The strongest thank-you posts are specific. Instead of "Thanks for your support", name what happened: "A year ago this was a one-person project. Today it is a community." Use the message area for two or three sentences that mention real things, such as orders, reviews or kind messages, and let the sign-off carry a name or a team. The text shrinks to fit if you write more.

**Where it fits**

Use it after a milestone such as a follower count or a first year, at the end of a busy sale, at the end of the calendar year, or after an event. It also works inside a business: thank a team, a set of volunteers or a group of beta testers. The 4:5 portrait is best for the feed, the Story size keeps text clear of Instagram's bars, and the 16:9 and LinkedIn sizes tighten the headline. Colours are editable, and you can export PNG, JPEG, PDF, an animated video or HTML.

Celebrate the number itself with [Milestone](/social-post-templates/milestone/), or share a customer's own words with [Testimonial](/social-post-templates/testimonial/).`,
    },
    features: [
      'Warm gradient background with CSS confetti dots in three colours that float in Play and the video',
      '"From all of us" label chip',
      'Huge headline with *asterisk* highlights in the accent colour',
      'Heartfelt message area that shrinks to fit',
      'Italic sign-off and handle in the footer',
      'Tighter headline on the 16:9 and LinkedIn sizes',
      'Editable gradient, text and accent colours',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🎉', title: 'Milestones and anniversaries', desc: 'Thank your audience when you reach a follower count, a customer number or a first year. Name the milestone in the headline and what it meant in the message.' },
      { icon: '🛒', title: 'After a sale or launch', desc: 'Close a busy launch or sale with a thank-you before you go quiet. It rewards the people who bought and reminds the rest that real people run the shop.' },
      { icon: '🎄', title: 'End-of-year gratitude', desc: 'Look back on the year with a few specific thanks to customers, partners and your team, a calm post that fits between holiday promotions.' },
      { icon: '🙌', title: 'Teams, volunteers and testers', desc: 'Thank a team after a project, volunteers after an event or beta testers after a release. Public thanks cost nothing and are remembered.' },
    ],
    faqs: [
      { q: 'What should a thank-you post say?', a: 'Be specific. Name what happened, such as a number of orders or reviews, say what it meant to you in a sentence or two, and sign it with a real name or team. Avoid asking for anything in the same post.' },
      { q: 'When is the best time to post a thank you?', a: 'After a milestone, at the end of a launch or sale, around the end of the year, or after an event. Posting it soon after the moment keeps it genuine, while the people involved are still paying attention.' },
      { q: 'Can I add a photo of my team?', a: 'The template is drawn without photos so it stays fast and recolours easily. To add a team photo, use Meet the Team for a photo-led post, or place your own picture behind the card using the HTML export.' },
      { q: 'Is it suitable for a personal account?', a: 'Yes. Change the label to something like "From me" and the sign-off to your name. The warm colours and heartfelt tone suit a creator thanking followers as well as a brand thanking customers.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Thank You HTML and CSS: write a message that names specific moments from your year, generate a matching Story, or animate the confetti dots falling slowly behind the headline.',
      prompt: `Create a 1080×1350 "thank you" social post in plain HTML and CSS.

- A warm gradient background from #fff4e6 to #ffd9b3, with small confetti dots in orange, amber and pink scattered around the edges, drawn with radial-gradient backgrounds.
- A small uppercase orange label in a soft pill, "From all of us".
- A huge bold headline, "Thank you, 10,000 times over", with "10,000" in orange.
- A warm paragraph: "A year ago this was a one-person project. Today it is a community, and every order, review and kind message got us here."
- A footer with an italic sign-off "With love, the Acme team" and the handle in orange on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'valentines-day': {
    keywords: ['valentines day post template', 'valentines day instagram post', 'valentines day offer post template', 'love social media post', 'february 14 greeting template'],
    about: {
      title: 'Valentine\'s Day — Free Romantic Post Template With Offer Chip',
      description: `**Valentine's Day** is a free social media template for 14 February, built around one idea: make the greeting feel hand-written. A deep rose gradient fades from near-black burgundy into raspberry, soft hearts float at different sizes in the corners, and the headline is set in a flowing script face, large enough to be the whole design.

**A greeting first, an offer second**

The card has room for a short label ("With love"), the script headline, a warm paragraph and, if you want it, a pink chip for an offer such as "Dinner for two · 20% off on 14 Feb". Leave the chip empty and it disappears, so the same card works as a pure greeting for a brand that does not sell anything on the day. Wrap a word in *asterisks* to colour it in the pale rose accent, as in "Happy *Valentine's* Day".

**Colour and type that match the mood**

The script headline has long, looping strokes that need space, so the text size is large and the line is kept short. The paragraph below is in a clean sans-serif so it stays readable on a phone. The hearts are text characters at low opacity, so they add atmosphere without competing with the words. For a lighter look, switch the gradient to pale pink and the text to dark rose.

**Who uses it**

Florists, restaurants, jewellers, salons, bakeries and gift shops use Valentine's Day for their biggest promotion of the winter, and a card like this announces a date-night offer or last-order dates. Personal brands and creators use it as a thank-you to their audience. The layout adapts to the Story and 16:9 sizes, and you can export PNG, JPEG, PDF, animated video or HTML.

Post it a few days early for an offer and on the day for a greeting. See also [Christmas Greeting](/social-post-templates/christmas-greeting/) and [Thank You](/social-post-templates/thank-you/) for the same warm, handmade feel.`,
    },
    features: [
      'Deep rose gradient with a soft glow at the top',
      'Floating hearts at five sizes and angles that drift and beat in Play and the video',
      'Flowing script headline with *asterisk* highlights in pale rose',
      '"With love" label and a warm message paragraph',
      'Optional offer chip that disappears when empty',
      'Layout adapts to Story and 16:9 sizes',
      'Editable gradient, text and accent colours',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '💐', title: 'Florists and gift shops', desc: 'Announce Valentine\'s bouquets and the last day for delivery orders on the card, with the offer chip carrying the order deadline.' },
      { icon: '🍽', title: 'Restaurants and cafes', desc: 'Promote a set dinner for two or a special menu with the price or discount in the offer chip, and a booking line in the caption.' },
      { icon: '💎', title: 'Jewellery, salons and spas', desc: 'Post a gift idea or a couples treatment offer a week before 14 February, then repost the greeting version on the day.' },
      { icon: '💌', title: 'Creators and personal brands', desc: 'Thank your audience with a warm greeting and no offer. Clear the chip and the card becomes a simple, affectionate message.' },
    ],
    faqs: [
      { q: 'When should I post a Valentine\'s Day offer?', a: 'Start a week to ten days before 14 February, with the order deadline in the offer chip. Post the greeting version on the day itself. Retailers that need delivery time should post even earlier.' },
      { q: 'Can I use it without an offer?', a: 'Yes. Leave the offer field empty and the chip disappears, so the card becomes a pure greeting. Change the label and the message to speak to customers, friends or followers.' },
      { q: 'Can I change the colours from rose to pink?', a: 'Yes. Both gradient colours, the text and the accent are editable. A light pink gradient with dark rose text gives a softer, daytime look, and the hearts follow the accent colour.' },
      { q: 'Does the script font work on small screens?', a: 'The headline is set very large so the script stays legible on a phone, and the paragraph beneath is in plain sans-serif. Keep the headline short, around three words, so the loops stay clear.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Valentine\'s Day HTML and CSS: write a gift-guide caption, turn the offer chip into a countdown to the order deadline, or animate the hearts drifting upward behind the headline.',
      prompt: `Create a 1080×1350 Valentine's Day social post in plain HTML and CSS.

- A deep rose gradient background from #4c0519 to #be123c with a soft pink radial glow at the top centre.
- Five heart characters (♥) at different sizes and rotations in the corners, pale pink at low opacity.
- A small uppercase pale-pink label "With love" with wide letter-spacing, then a large script headline in Great Vibes, "Happy Valentine's Day", with "Valentine's" in pale pink.
- A short centred paragraph in a clean sans-serif, then a pale-pink pill with dark burgundy text: "Dinner for two · 20% off on 14 Feb".
- The handle at the bottom in pale pink.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  diwali: {
    keywords: ['diwali post template', 'diwali wishes instagram post', 'happy diwali social media post', 'diwali offer post template', 'deepavali greeting template'],
    about: {
      title: 'Diwali — Free Festival of Lights Greeting & Offer Post Template',
      description: `**Diwali** is a free social media template for the festival of lights: a night-sky gradient from deep indigo to plum, a glowing row of five diyas along the bottom, and a ring of gold rangoli-style rays behind the headline. It is drawn entirely in CSS, so it recolours to your brand and stays sharp at every size.

**English and Hindi in one greeting**

Above the headline sits an editable Hindi line, "शुभ दीपावली", set in the Hind typeface, which carries both Devanagari and Latin letters. Keep it, replace it with a greeting in Marathi, Gujarati, Tamil or any language your customers read, or clear the field and it disappears. The English headline, "Happy *Diwali*", is set in a large serif with the festival name in gold, and the message below it is two lines you can reword for customers, staff or family.

**A greeting first, an offer second**

Diwali is one of the biggest buying seasons in India, around Dhanteras and Lakshmi Puja, so the card has an optional gold chip for a festive offer such as "Festive offer · Up to 30% off". Leave it empty for a pure greeting from an office, a school or a creator. Keep the tone warm: thank customers first, and let the chip carry the offer.

**For feed, Story and WhatsApp Status**

The Story size (1080×1920) fits WhatsApp Status and Instagram Stories, with the text kept clear of the top and bottom bars. The 4:5 portrait suits the Instagram and Facebook feed, and the 16:9 and LinkedIn sizes work for corporate greetings. Colours are editable: swap the gold for saffron or the sky for a deep maroon. Export PNG, JPEG, PDF, an animated video where the Hindi line, headline and message appear in turn, or the HTML.

Pair it with [Discount Badge](/social-post-templates/discount-badge/) for a sale, [Thank You](/social-post-templates/thank-you/) after the festival, or [Christmas Greeting](/social-post-templates/christmas-greeting/) for the next season.`,
    },
    features: [
      'Night-sky gradient with a warm glow rising from the bottom',
      'Row of five glowing diyas drawn in CSS',
      'Gold rangoli-style ring of rays behind the headline',
      'Editable Hindi greeting set in Hind, which carries Devanagari and Latin',
      'Headline with *asterisk* highlights in gold',
      'Optional festive offer chip that disappears when empty',
      'Story size for WhatsApp Status and Instagram Stories',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🛍', title: 'Shops and brands in the festive season', desc: 'Post a Diwali greeting with a festive offer chip around Dhanteras and Lakshmi Puja, and follow with a sale post. A warm greeting first builds goodwill before the offer.' },
      { icon: '🏢', title: 'Offices and corporate greetings', desc: 'Send clients and staff a Diwali message from the company page on LinkedIn or WhatsApp, with the offer field cleared and the sign-off in your own words.' },
      { icon: '📱', title: 'WhatsApp Status and Stories', desc: 'Use the 9:16 Story size to share a greeting on WhatsApp Status or Instagram Stories, with text clear of the top and bottom bars.' },
      { icon: '🏫', title: 'Schools, clinics and local services', desc: 'Share a Diwali greeting along with holiday timings: change the message to say when you close and reopen, and leave the offer field empty.' },
    ],
    faqs: [
      { q: 'How do I make a Diwali post for Instagram or WhatsApp?', a: 'Open the Diwali template, edit the greeting and message, add or clear the offer chip, then download the 4:5 PNG for the feed or choose the Story size (1080×1920) for WhatsApp Status and Instagram Stories.' },
      { q: 'Can I write the greeting in Hindi or another language?', a: 'Yes. The Hindi line is an ordinary text field, so type any greeting in Devanagari or another script. It is set in Hind, which supports Devanagari and Latin; other scripts use your device font.' },
      { q: 'When should I post a Diwali greeting or offer?', a: 'Offers usually start a week before Dhanteras and continue through Lakshmi Puja and Bhai Dooj. Post the greeting on the day itself, and keep the festive offer post a separate earlier one.' },
      { q: 'Can I change the gold and purple colours?', a: 'Yes. The sky gradient, text and gold are all editable. The diya flames, rangoli ring, hindi line and offer chip follow the gold, so a saffron or deep maroon palette recolours the whole design.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Diwali HTML and CSS: write a greeting in your own language, animate the diya flames to flicker, or turn the offer chip into a countdown to the end of the festive sale.',
      prompt: `Create a 1080×1350 Diwali greeting social post in plain HTML and CSS.

- A night-sky gradient from deep indigo (#1a0b3b) at the top to plum (#6d1b43) at the bottom, with a warm gold glow rising from the bottom edge.
- A large faint gold ring of radial rays (repeating-conic-gradient, masked into rings) behind the centre, like a rangoli.
- A small uppercase gold label "Festival of lights", the Hindi greeting "शुभ दीपावली" in gold, and a large serif headline "Happy Diwali" with "Diwali" in gold.
- A two-line warm message, then a gold pill reading "Festive offer · Up to 30% off" with a soft glow.
- Along the bottom, a row of five diyas: each a copper half-ellipse bowl with a glowing teardrop flame, the middle one slightly larger.
- The handle in gold at the very bottom.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },
};

export const TEMPLATE_WHY_NEW = {
  checklist: [
    { icon: '✓', title: 'The format people save', desc: 'A tick-box list is something readers return to while they work, so it collects saves and bookmarks that opinion posts do not.' },
    { icon: '📓', title: 'A look you remember', desc: 'Ruled paper, a red margin and tilted ticks make the card feel handled, which sets it apart from flat grey list graphics.' },
    { icon: '▦', title: 'Rows that rearrange themselves', desc: 'Fill one to six items. Empty rows vanish and the rest re-centre, with two columns on wide sizes.' },
  ],
  'how-to-steps': [
    { icon: '↓', title: 'The order is built in', desc: 'A glowing timeline makes the sequence obvious, so each step needs only a short title and a single line of detail.' },
    { icon: '4', title: 'Four steps, no padding', desc: 'Use as many as you need. A three-step guide re-centres on the line instead of leaving a gap.' },
    { icon: '🎬', title: 'Reveals step by step', desc: 'The animated video export brings in the headline and then each step in order, which suits a Reel.' },
  ],
  'mistakes-to-avoid': [
    { icon: '✕', title: 'The problem and the answer together', desc: 'Each card strikes out the mistake and shows the fix beneath it, so readers get something to act on, not just a warning.' },
    { icon: '⚠', title: 'A warning look without shouting', desc: 'Hazard tape, a tilted sticker and red-edged cards signal caution at a glance on a warm-black background.' },
    { icon: '▤', title: 'Three or four, never a gap', desc: 'Leave the last pair empty and the card disappears, so a three-mistake post stays balanced.' },
  ],
  'this-or-that': [
    { icon: '⇄', title: 'A choice answered in one word', desc: 'Two huge options and a "Comment A or B" prompt make replying easier than scrolling past.' },
    { icon: '◩', title: 'Made for the feed', desc: 'Votes happen in the comments, so the debate stays public, unlike a Story poll that disappears in 24 hours.' },
    { icon: '🎨', title: 'Your colours on each side', desc: 'Give each option its own colour, from your brand pair to red against blue for a real rivalry.' },
  ],
  'hot-take': [
    { icon: '🔥', title: 'One opinion, as loud as it gets', desc: 'A huge condensed statement on a fiery gradient reads from across a feed, even at twelve words.' },
    { icon: '💬', title: 'A reply made easy', desc: 'Agree and Disagree chips under the question show people exactly how to join in.' },
    { icon: 'Aa', title: 'Long takes still fit', desc: 'The statement shrinks step by step, so you can write a full sentence without it overflowing.' },
  ],
  'pricing-card': [
    { icon: '$', title: 'Reads like a real pricing page', desc: 'Plan, price, features and button sit in the order buyers expect, with the price as the biggest thing on the card.' },
    { icon: '✓', title: 'Four features, balanced', desc: 'Leave a row empty and it disappears, so a three-feature plan stays tidy.' },
    { icon: '▥', title: 'Two columns on wide sizes', desc: 'On 16:9 and LinkedIn the card opens up, with the plan and price on the left and the features on the right.' },
  ],
  'new-blog-article': [
    { icon: '📰', title: 'Looks like a feature, not a screenshot', desc: 'A serif headline, a cover and an excerpt give each article a magazine-style announcement.' },
    { icon: '🖼', title: 'Cover crop in your browser', desc: 'Drop in the article image and drag to crop. A gradient fills the slot until you add one.' },
    { icon: '🔁', title: 'One card for the whole series', desc: 'Keep the colours and change only title, cover and excerpt so followers learn to spot each new post.' },
  ],
  'save-the-date': [
    { icon: '📅', title: 'The date is the design', desc: 'The largest type on the card is the date and year, so the one thing readers must remember is the first thing they see.' },
    { icon: '✦', title: 'Stationery that fits more than weddings', desc: 'A double gold frame and serif type suit galas, conferences and launch evenings once you change the gold.' },
    { icon: '→', title: 'Sets up the next post', desc: 'An editable note line, such as "Tickets on sale 1 February", tells people what is coming and when.' },
  ],
  'thank-you': [
    { icon: '♥', title: 'Warm, not corporate', desc: 'Heavy friendly type, confetti and a handwritten-style sign-off make gratitude feel personal.' },
    { icon: '✍', title: 'Room for something specific', desc: 'A message area for two or three real sentences, which beats a generic "thanks for your support".' },
    { icon: '🎨', title: 'Recolours to your brand', desc: 'The confetti and gradient are drawn in CSS, so changing the accent recolours everything with no images to replace.' },
  ],
  'valentines-day': [
    { icon: '♥', title: 'A greeting that feels handwritten', desc: 'A flowing script headline on a deep rose gradient with floating hearts sets the mood immediately.' },
    { icon: '🏷', title: 'An optional offer chip', desc: 'Add a date-night deal or an order deadline, or clear it for a pure greeting. The chip disappears when empty.' },
    { icon: '🔁', title: 'Ready every February', desc: 'Dates and offers are plain text, so next year\'s card takes a minute to update.' },
  ],
  diwali: [
    { icon: '🪔', title: 'Diyas and rangoli, drawn in CSS', desc: 'A row of glowing lamps and a gold ring of rays set the mood with no stock photos, and they recolour to your brand.' },
    { icon: 'अ', title: 'English and Hindi together', desc: 'An editable Hindi line in Hind, which supports Devanagari and Latin, so the greeting reads naturally to your customers.' },
    { icon: '🏷', title: 'Greeting with an optional offer', desc: 'Add a festive offer chip for the Dhanteras to Bhai Dooj season, or clear it for a pure greeting.' },
  ],
};
