/* SEO text for the giveaway template series (one entry per template, merged into TEMPLATE_SEO and TEMPLATE_WHY).
   Written by hand per template: what is specific about the layout, who it is for, the real questions people ask. */

export const TEMPLATE_SEO_GIVE = {
  'giveaway-winners': {
    keywords: ['giveaway winners post template', 'instagram giveaway winner announcement', 'contest winners announcement post', 'congratulations giveaway winners graphic', 'announce giveaway winners instagram'],
    about: {
      title: 'Giveaway Winners Announcement Template — 3 Winners on One Post',
      description: `A **giveaway winners announcement** is the post everyone who entered is waiting for, yet most brands give it a single line of caption. **Giveaway Winners** is a free template that gives the result a post of its own: a podium of up to three winners, each with a prize, a claim instruction and a thank-you for everyone who entered.

**A podium of three glowing rows**

A "Congratulations" badge and a large italic headline, "Giveaway *winners*", sit above three numbered pills. The first-place pill is bigger and rimmed in gold, with a soft glow, so the order is obvious at a glance. Each pill holds a rank number, the winner's handle in large type and a small line for the prize ("1st · $250 gift card"). Only filled-in winners are shown, so a contest with a single winner or two winners simply loses the empty rows and the layout re-centres.

**Winner photos, optional**

Each row has an optional round photo slot. Add a winner's profile picture, a photo of them with the prize or the product itself, and it appears in a ring beside their name. Photos can be dragged to reposition inside the circle, so a face is never cropped awkwardly. Leave the slots empty and the rows stay clean, text only.

**Built to be read in two seconds**

Behind the rows a slow iridescent glow, drifting confetti dots and a few twinkling stars keep the dark background lively without competing with the names. Underneath sit the two lines that matter after a giveaway: how winners claim ("check your DMs and reply within 48 hours") and a thank-you to everyone who entered, which keeps the people who did not win following you for the next one.

**Every size**

The 4:5 portrait is the feed post, the 9:16 version keeps everything inside the Story safe area for a link sticker or a "tag a friend" prompt, and the wide sizes put the headline on the left with the winners on the right. Your handle and an optional logo sit in the corner.

Pick winners with a random method you can show, state the date in your caption, and tag each winner in the post. To run the contest itself, start with [Giveaway Contest](/social-post-templates/giveaway/) and finish with this post. For thanking your community afterwards, use [Thank You](/social-post-templates/thank-you/).`,
    },
    features: [
      'Congratulations badge and a large italic "Giveaway winners" headline',
      'Up to three numbered winner pills, with first place larger and gold-rimmed',
      'Prize line and handle for each winner',
      'Optional round photo per winner, draggable to reposition',
      'Empty winner rows disappear and the list re-centres',
      'Claim instructions and a thank-you line for everyone who entered',
      'Slow iridescent glow, drifting confetti and twinkling stars',
      'Winners animate in one by one in the video export',
    ],
    useCases: [
      { icon: '🏆', title: 'Instagram and Facebook contests', desc: 'Close a giveaway with its own result post: three winners, their prizes and a clear next step, instead of burying the names in a caption.' },
      { icon: '🎟', title: 'Raffles and charity draws', desc: 'Announce raffle winners for a school fair, a club or a fundraiser, with the prize for each and how to collect it.' },
      { icon: '📈', title: 'Follower milestone wrap-ups', desc: 'After a 10K celebration giveaway, show who won and thank the community, which turns the contest into a story you can repeat.' },
      { icon: '🤝', title: 'Collaboration giveaways', desc: 'When two brands ran the contest together, add both handles in the thank-you line and tag the winners from either account.' },
    ],
    faqs: [
      { q: 'How do I announce giveaway winners on Instagram?', a: 'Type each winner\'s handle and prize into the Giveaway Winners template, add a claim line such as "reply to our DM within 48 hours", download the 4:5 PNG for the feed or the 9:16 version for Stories, and tag the winners in the post.' },
      { q: 'How many winners can the template show?', a: 'Three. Fill in only one or two and the empty rows are hidden, so a single-winner contest looks as complete as a three-winner one.' },
      { q: 'Should I name the winners publicly?', a: 'Most contest rules allow it, and it proves the giveaway was real. Use the handle rather than a full name, mention it in your entry terms, and offer to send a private message instead if someone prefers not to be shown.' },
      { q: 'Can I add the winners\' photos?', a: 'Yes. Each row has an optional round photo slot. Upload a picture and drag it inside the circle to position it. Rows without a photo show just the number and name.' },
      { q: 'What is the difference between this and the Giveaway Contest template?', a: 'Giveaway Contest announces the prize and how to enter. Giveaway Winners is the follow-up that announces the result, so the two work as a pair across the life of one contest.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giveaway Winners HTML and CSS: write a caption that announces the winners and thanks entrants, suggest a claim message that avoids scams, or turn it into a weekly "winner of the week" series.',
      prompt: `Create a 1080×1350 Instagram giveaway winners announcement in plain HTML and CSS.

- A deep indigo background (#160f33) with a soft violet glow top-left, a warm yellow glow bottom-right, and a large blurred conic-gradient halo (yellow, violet, cyan, pink) behind the middle at low opacity, masked to a soft circle. Scatter small round confetti dots and three twinkling four-point stars.
- A pill badge "Congratulations" (uppercase, wide letter-spacing, yellow outline) above a very large italic serif headline "Giveaway winners" with "winners" in yellow.
- A line under it: "Picked at random from 4,812 entries."
- Three winner pills stacked with a small gap, each a rounded translucent glass row with a thin border: a round gradient number badge (1, 2, 3), an optional round photo slot, a small uppercase yellow prize line ("1st · $250 gift card") and the winner's handle in bold serif. Make the first pill larger with a yellow border and a faint yellow glow. Hide any row whose name is empty.
- At the bottom: a bold claim line ("Winners: check your DMs and reply within 48 hours to claim."), a smaller thank-you line, and the brand handle in yellow at the bottom right.
- Use a serif display font for the headline and names and a clean sans for small text. Keep all text well inside the margins and make it readable on a phone.`,
    },
  },

  'winner-reveal': {
    keywords: ['giveaway winner reveal template', 'and the winner is instagram post', 'announce giveaway winner post', 'single winner announcement graphic', 'prize draw winner template'],
    about: {
      title: 'Giveaway Winner Reveal Template — "And the Winner Is…" Spotlight Post',
      description: `A **giveaway winner reveal** works best as a drumroll, not a notice. **Giveaway Winner Reveal** is a free Instagram template for contests with one winner: it opens with the line every follower waits for, "And the winner is…", then puts one person in a spotlight with a big photo, a gold ring, turning rays of light and their name in capitals.

**A spotlight on one person**

The winner's photo sits in a large round frame ringed in gold, over a soft halo and slowly turning rays of light, with a few sparkles twinkling around it. A "Winner" ribbon is stamped across the bottom of the photo. Before you add a picture, the frame shows a placeholder portrait, so the post already looks finished while you type.

**The photo is the point**

Upload their profile picture, a photo of them with the prize, or a shot of the prize itself, and drag it inside the circle until the face is centred. A real face makes a giveaway feel honest, which is exactly what people look for when they decide whether to enter the next one.

**Name, prize and next step**

The winner's name is set in large capitals and shrinks automatically if it is long, so "Alexandria Montgomery-Reyes" fits as neatly as "Sam". Below it, a pill states the prize, with words wrapped in asterisks highlighted in gold ("Wins a *$250* gift card"), and a short line tells them what to do next, such as checking their DMs. Your handle and an optional logo close the post.

**Posting it**

Use the 4:5 size in the feed and the 9:16 size for Stories, where there is room above for a "tag the winner" sticker. For a contest with several prizes, use [Giveaway Winners](/social-post-templates/giveaway-winners/) instead, which lists up to three. Run the contest itself with [Giveaway Contest](/social-post-templates/giveaway/).`,
    },
    features: [
      '"And the winner is…" opener in a gold italic',
      'Large round winner photo with gold ring, halo and slowly turning light rays',
      'Photo can be dragged to reposition inside the circle',
      '"Winner" ribbon that stamps onto the photo in the video export',
      'Winner name in large capitals that shrinks automatically for long names',
      'Prize pill with gold highlighting for words in asterisks',
      'Claim line, handle and optional logo',
      'Layout switches to photo on the left, text on the right for wide sizes',
    ],
    useCases: [
      { icon: '🎁', title: 'Single-winner giveaways', desc: 'Announce the one person who won the grand prize, with their photo, the prize and what happens next in a single post.' },
      { icon: '🎰', title: 'Prize draws and raffles', desc: 'Reveal a live-draw result for a club, shop or school event, then tag the winner and pin the post for the week.' },
      { icon: '⭐', title: 'Customer or member of the month', desc: 'The same spotlight works for a monthly winner, a top contributor or a contest of the week, with their photo and a line about why.' },
      { icon: '📣', title: 'Story reveals', desc: 'Post the 9:16 version after a countdown Story so the reveal lands at the moment everyone is watching.' },
    ],
    faqs: [
      { q: 'How do I announce a single giveaway winner?', a: 'Open Giveaway Winner Reveal, type the winner\'s name and prize, add their photo if they agree, write a line telling them how to claim, and download the 4:5 PNG for your feed or the 9:16 version for Stories.' },
      { q: 'Do I need a photo of the winner?', a: 'No. Without an upload the frame shows a placeholder portrait. For privacy you can use the prize photo instead, or the brand logo in the photo slot.' },
      { q: 'What if the winner\'s name is very long?', a: 'The name shrinks to fit its line, so long double-barrelled names stay on one line without breaking the layout.' },
      { q: 'When should I post the winner announcement?', a: 'Soon after the closing time you promised, and ideally at a time your followers are active. Tag the winner, reply to their comment and message them directly, since some people will not see a tag.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giveaway Winner Reveal HTML and CSS: write a suspenseful caption that teases the winner before the post, suggest a safe way to verify the winner is real, or produce a countdown Story to run first.',
      prompt: `Create a 1080×1350 Instagram "giveaway winner reveal" post in plain HTML and CSS.

- A deep magenta background (#33082a) with a pink radial glow behind the middle and a warm gold glow at the bottom. Add a large soft circle of light rays behind the photo (a repeating conic-gradient of gold wedges, masked to fade out, slowly rotating) and a scatter of small round confetti dots and four twinkling four-point stars.
- At the top, the line "And the winner is…" in gold italic Montserrat.
- A large circular winner photo (about 46% of the width) with a thick gold border, a soft glowing halo behind it and a dark drop shadow. Use a placeholder portrait if no photo is set.
- A gold-to-pink gradient ribbon reading "WINNER" in bold uppercase wide letter-spacing, overlapping the bottom of the photo like a stamp, with white-space: nowrap.
- The winner's name below in huge uppercase Montserrat that scales down if long.
- A rounded pill with the prize ("Wins a $250 gift card", with the amount in gold) and a smaller line "Congratulations! Check your DMs to claim your prize."
- A small brand handle in gold at the bottom centre. Keep everything centred and inside the margins.`,
    },
  },

  'giveaway-time': {
    keywords: ['giveaway time post template', 'bold instagram giveaway template', 'playful giveaway post', 'product giveaway instagram post', 'giveaway graphic with prize photo'],
    about: {
      title: 'Giveaway Time Instagram Post Template — Loud Prize Photo Giveaway',
      description: `Most **Instagram giveaway posts** politely explain; this one shouts. **Giveaway Time** is a free giveaway post template for feeds that are already loud: electric lime, a giant two-line headline, a "Join now" sticker and a prize photo that looks slapped onto the page.

**A headline you can read from across the room**

The two-line headline is set in a tall condensed typeface. "Giveaway" is solid black, and "Time!" is hot pink with a hard black shadow and outline, like a sports poster. Next to it a blue "Join now" sticker with a dashed edge sits slightly tilted and wobbles in the animated export. Change either line, for example "Win it" and "Today!", and the text resizes to fit.

**The prize photo, front and centre**

Under the headline a large tilted card holds your prize photo inside a thick black border with a hard offset shadow. Upload the product, the gift box or the bundle, and drag the photo to frame it. The card gently bobs in the video export. Until you add a picture the card shows a placeholder, so the post already looks complete.

**Three entry steps in one line**

Three black pills sit under the photo, ready for "Follow @yourbrand", "Like + save" and "Tag 2 friends", and they pop in one by one in the video. Under them the deadline is set in the same tall type ("Ends Sunday · 8 PM"), with your handle and an optional logo beside it.

**When to choose it**

Use Giveaway Time for quick, high-energy contests: a weekend product drop, a launch week prize or a follower-count push. If you need space for longer rules and a deadline paragraph, use [Giveaway Contest](/social-post-templates/giveaway/) instead, and announce the result afterwards with [Giveaway Winners](/social-post-templates/giveaway-winners/) or [Giveaway Winner Reveal](/social-post-templates/winner-reveal/).`,
    },
    features: [
      'Giant two-line headline: solid black over pink with a hard shadow',
      'Tilted "Join now" sticker with a dashed edge that wobbles in the video',
      'Large prize photo card with thick border and hard offset shadow, draggable framing',
      'Three entry-step pills that pop in one after another',
      'Deadline set in bold condensed type, plus handle and optional logo',
      'Subtle dot-grid background that scrolls slowly in the export',
      'Headline lines shrink to fit when you type longer words',
      'Photo on the right and text on the left for wide sizes',
    ],
    useCases: [
      { icon: '📦', title: 'Product giveaways', desc: 'Show the exact item people could win, in your brand colour accents, and keep the entry steps to a single line they can read in two seconds.' },
      { icon: '🎮', title: 'Gaming, fashion and food brands', desc: 'The loud lime and condensed type fit audiences used to fast, high-contrast feeds, from sneaker drops to snack launches.' },
      { icon: '🚀', title: 'Launch-week prizes', desc: 'Give away the first units of a new release with a "Win it first" headline and a deadline that matches your launch date.' },
      { icon: '📲', title: 'Follower push weekends', desc: 'Run a short weekend contest to lift follows and saves, then follow it with a winners post so the next contest starts with trust.' },
    ],
    faqs: [
      { q: 'How do I make an Instagram giveaway post in this style?', a: 'Open Giveaway Time, edit the two headline lines and the sticker, upload your prize photo, type the three entry steps and the deadline, then download the 4:5 PNG for the feed or the 9:16 version for Stories.' },
      { q: 'Can I change the colours?', a: 'Yes. The background, text, pink and blue accents are all colour options, so you can switch the lime to your brand colour while keeping the black outlines that make the design pop.' },
      { q: 'How many entry steps fit?', a: 'Three short pills. Keep each to a few words, such as "Follow us", "Like + save" and "Tag a friend", so they stay on one or two lines.' },
      { q: 'What if I need to add rules and eligibility?', a: 'Put them in the caption, or use the Giveaway Contest template, which has a dedicated rules line and a deadline paragraph.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giveaway Time HTML and CSS: write a punchy caption and hashtag set for the contest, suggest alternative headline pairs such as "Win it / Now!", or restyle the palette for a specific brand.',
      prompt: `Create a 1080×1350 playful Instagram giveaway post in plain HTML and CSS.

- An electric lime background (#c8ff3a) with a fine dark halftone dot grid at low opacity.
- A giant two-line headline in a tall condensed font (Bebas Neue): "GIVEAWAY" in near-black and "TIME!" in hot pink (#ff3d8b) with a hard black text-shadow and thin black text-stroke. Put a round blue (#3b4bff) "JOIN NOW" sticker with a dashed white edge and a hard black shadow to the right of the second line, rotated about -10 degrees.
- Below it a large prize photo card with a thick black border, rounded corners and a hard offset black shadow, rotated about -2.4 degrees. Use a placeholder image if none is set.
- A row of three black pill chips with lime text: "Follow @yourbrand", "Like + save", "Tag 2 friends".
- At the bottom, the deadline "ENDS SUNDAY · 8 PM" in the condensed font on the left and the brand handle on the right.
- Keep all text inside 8% margins and readable on a phone.`,
    },
  },

  'giveaway-rules': {
    keywords: ['giveaway rules template', 'how to enter giveaway post', 'instagram contest rules post', 'giveaway terms and conditions graphic', 'how to enter instagram giveaway template'],
    about: {
      title: 'Giveaway Rules Template — a "How to Enter" Post with Ticked Steps',
      description: `A **giveaway rules post** answers the question that costs you entries: "how do I enter?" **Giveaway Rules** is a free template that lays the steps out as four ticked rows, marks the bonus entry as optional and puts the fine print in a box people can actually read.

**Four ticked steps**

The headline "How to enter" sits at the top with a coral prize pill above it ("Win a $200 gift card"). Under it, four white rows each start with a teal tick box: follow, like, tag two friends and share to your Story. In the animated export the ticks are stamped one after another, like someone checking off the list. The fourth row has a dashed coral border and its own colour, so a bonus entry reads as optional rather than required.

**A polaroid for the prize**

Add a prize photo and it appears as a slightly tilted polaroid beside the headline that gently sways. Leave it out and the headline simply takes the full width, so contests without a product shot lose nothing.

**Fine print in its own box**

Contest rules often go wrong in tiny, unreadable caption text. Here the eligibility, winner draw and platform disclaimer ("Open to residents 18+. One winner picked at random and messaged on Nov 7. Not sponsored by or affiliated with Instagram.") live in a dashed box with its own line height, so it stays legible on a phone. Under it, the deadline is set in teal with your handle and optional logo beside it.

**A calmer companion to the loud posts**

Warm cream and teal make it a good follow-up to a flashier announcement: post [Giveaway Time](/social-post-templates/giveaway-time/) or [Giveaway Contest](/social-post-templates/giveaway/) first, then this card as a Story or carousel slide for anyone who asks how to join. Close the loop with [Giveaway Winners](/social-post-templates/giveaway-winners/). Check your local rules and each platform's promotion guidelines before you run a contest.`,
    },
    features: [
      'Prize pill and a large "How to enter" headline with a highlighted word',
      'Four white step rows, each with a drawn teal tick that stamps on in the video',
      'Bonus-entry row in a dashed coral style so optional actions read as optional',
      'Optional prize photo as a tilted polaroid that sways gently',
      'Dedicated fine-print box for eligibility, winner draw and disclaimer',
      'Deadline line in teal, plus handle and optional logo',
      'Cream background with a soft dotted fade at the top',
      'Headline left and steps right on wide sizes',
    ],
    useCases: [
      { icon: '📋', title: 'Explain the entry steps clearly', desc: 'Post it alongside the main giveaway so people who ask "how do I enter?" in the comments can be pointed to one card.' },
      { icon: '📲', title: 'Story and highlight cards', desc: 'Save the 9:16 version to a "Giveaway" highlight so the rules stay available after the original post scrolls away.' },
      { icon: '⚖', title: 'Contests that need eligibility rules', desc: 'Put age limits, regions, one-entry-per-person and the "not affiliated with Instagram" disclaimer in the fine-print box instead of a hidden caption.' },
      { icon: '🔁', title: 'Recurring monthly giveaways', desc: 'Keep the same rules card every month and change only the prize line, deadline and winner date.' },
    ],
    faqs: [
      { q: 'What should a giveaway rules post include?', a: 'The prize, how to enter, the closing date and time with a time zone, who is eligible, how and when the winner is chosen and contacted, and a line saying the contest is not sponsored by or associated with the platform.' },
      { q: 'How many entry steps are best?', a: 'Three or four. Every extra step lowers the number of people who complete it. Keep the required ones few and mark extras such as a Story share as a bonus entry.' },
      { q: 'Can I hide the prize photo?', a: 'Yes. The photo is optional. If you do not upload one, the polaroid is not shown and the headline uses the full width.' },
      { q: 'Does this template make my giveaway legal?', a: 'No. It only gives the rules a clear layout. Contest and sweepstakes laws vary by country and region, so check the rules that apply to you and the platform\'s promotion guidelines.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giveaway Rules HTML and CSS: write plain-language eligibility text for your region (then have it checked), turn the steps into a carousel, or draft a short "how to enter" Story caption.',
      prompt: `Create a 1080×1350 Instagram "how to enter" giveaway rules post in plain HTML and CSS.

- A warm cream background (#fdf3e7) with a soft coral glow in the top-right corner and a fine teal dot grid fading out downward.
- A coral pill "Win a $200 gift card" above a large serif (Playfair Display) headline "How to enter" with "enter" in teal. To the right of the headline, an optional prize photo inside a white polaroid frame, rotated about 4 degrees with a soft shadow; hide the frame if there is no photo.
- Four white rounded rows with a thin border and a small shadow: each with a rounded-square teal tick box (draw the check with CSS borders) and a bold line: "Follow @yourbrand", "Like this post", "Tag 2 friends in the comments", "Share to your Story for a bonus entry". Make the fourth row dashed with a coral border and a coral tick.
- A dashed-border fine-print box in small text: "Open to residents 18+. One winner picked at random and messaged on Nov 7. Not sponsored by or affiliated with Instagram."
- At the bottom, a teal deadline "Open until Fri, Nov 6 · 9 PM EST" on the left and the brand handle on the right. Keep text well inside the margins.`,
    },
  },

  'raffle-ticket': {
    keywords: ['raffle ticket giveaway template', 'raffle post template instagram', 'prize draw post template', 'admit one ticket giveaway graphic', 'comment to enter giveaway template'],
    about: {
      title: 'Raffle Ticket Giveaway Template — Admit-One Post for Prize Draws',
      description: `A **raffle ticket giveaway** works because a ticket is something people want to hold. **Raffle Ticket Giveaway** is a free template that styles your prize draw as a cream admit-one ticket on deep navy, with cut-out notches, a perforated stub, a barcode and a ticket number.

**A ticket with a prize on it**

At the top an "Admit one winner" label is stamped in red, tilted slightly, beside a small star that turns in the animated export. Under it the prize headline ("Win a weekend *getaway*") has one word in ticket red. Below that, a photo area with a dashed border holds the prize, with a "Grand prize" tag pinned to its corner that wobbles. Until you add your own picture the area shows a placeholder, so the ticket already looks finished.

**Three details where a ticket prints its seat**

Under the photo, three small cells carry what entrants need most: when the draw is, how to enter and what the prize is worth. Each has a red label and a bold value ("Draw — Fri, Nov 20", "Enter — Comment TICKET", "Value — $1,200"). They are plain fields, so you can relabel them for a charity raffle, an event ticket draw or a "tag a friend" contest.

**The perforated stub**

A dashed perforation line with a round notch on each side separates the stub. It carries a short line ("Raffle giveaway · one entry per person"), your handle and optional logo, a barcode drawn in CSS and a ticket number that counts up in the video export. On the wide sizes the ticket turns sideways and the stub moves to the right.

**Good for**

Fundraiser raffles, event ticket giveaways, comment-to-enter contests and any draw where "one entry per person" is the rule. For the full entry rules, add the [Giveaway Rules](/social-post-templates/giveaway-rules/) card, and announce the result with [Giveaway Winner Reveal](/social-post-templates/winner-reveal/). Raffles and prize draws are regulated in many places, so check the rules that apply to you before you run one.`,
    },
    features: [
      'Cream admit-one ticket on deep navy, with notched edges and a dashed perforation',
      'Red "Admit one winner" label stamped on, and a star that turns in the video',
      'Prize headline with one highlighted word',
      'Large prize photo area with a "Grand prize" tag, draggable framing',
      'Three detail cells for draw date, how to enter and prize value',
      'CSS barcode and a ticket number that counts up in the export',
      'Stub with a short rule line, handle and optional logo',
      'Ticket turns sideways with the stub on the right for wide sizes',
    ],
    useCases: [
      { icon: '🎟', title: 'Fundraiser raffles', desc: 'Promote a school, club or charity raffle with the draw date, the prize and how to take part, in a format that feels like the real thing.' },
      { icon: '💬', title: 'Comment-to-enter contests', desc: 'Make "Comment TICKET to enter" the obvious action, then pick winners from the comments on the draw date.' },
      { icon: '🎤', title: 'Event ticket giveaways', desc: 'Give away tickets to a gig, workshop or conference, with the event as the prize photo and the draw date as the deadline.' },
      { icon: '🏷', title: 'Shop and brand prize draws', desc: 'Add a prize value and a clear entry rule to a store giveaway so the offer reads as concrete and fair.' },
    ],
    faqs: [
      { q: 'How do I make an Instagram raffle post?', a: 'Open Raffle Ticket Giveaway, type the prize headline, upload the prize photo, fill in the draw date, how to enter and prize value, then download the 4:5 PNG for your feed or the 9:16 version for Stories.' },
      { q: 'Is a raffle the same as a giveaway?', a: 'In everyday use people mix the words. Legally they can differ, because a raffle where people pay to enter is treated as gambling in many places while a free prize draw is not. Check your local rules before you run one.' },
      { q: 'What do the three detail cells show?', a: 'By default the draw date, how to enter and the prize value. They are ordinary text fields, so you can relabel them, for example "Where", "When" and "Prize" for an event.' },
      { q: 'Does the barcode scan?', a: 'No. It is decorative, drawn with CSS to make the stub look real. Do not use it for actual tickets or check-in.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Raffle Ticket HTML and CSS: write caption copy that explains the draw rules clearly, create a matching set of "you have a ticket" Story replies, or restyle the ticket for a seasonal event.',
      prompt: `Create a 1080×1350 Instagram raffle-ticket giveaway post in plain HTML and CSS.

- A deep navy background (#0b1f3a) with a soft red radial glow behind the middle.
- One large cream (#fff1d0) ticket filling most of the canvas with rounded corners and a deep shadow. A horizontal dashed perforation line splits it into a main part and a short stub, with a round navy circle cut into each side of the perforation to look like notches.
- In the main part: a red outlined label "ADMIT ONE WINNER" (uppercase, wide letter-spacing, slightly rotated) with a small red star on the right; the headline "Win a weekend getaway" in Space Grotesk with "getaway" in red; a photo area with a dashed border and rounded corners holding the prize image (use a placeholder if none) with a red rounded "GRAND PRIZE" tag pinned to its top-right corner; and a row of three details with small red uppercase labels (Draw, Enter, Value) and bold values (Fri, Nov 20 / Comment TICKET / $1,200).
- In the stub: the line "Raffle giveaway · one entry per person", the brand handle in red, a barcode made with repeating-linear-gradient and the ticket number "No. 427" in letter-spaced type.
- Keep all text dark navy on cream and well inside the margins.`,
    },
  },
};

export const TEMPLATE_WHY_GIVE = {
  'giveaway-winners': [
    { icon: '🏆', title: 'The result gets its own moment', desc: 'Everyone who entered is waiting for this post, so it deserves more than a caption. A podium layout makes the outcome obvious and shareable.' },
    { icon: '①', title: 'Winners shown in order', desc: 'Numbered pills with a larger first place read at a glance, and empty rows vanish so one, two or three winners all look finished.' },
    { icon: '📷', title: 'Faces make it real', desc: 'Optional round photos beside each name prove the giveaway had actual winners, which builds trust for your next contest.' },
  ],
  'winner-reveal': [
    { icon: '🔦', title: 'A drumroll, not a notice', desc: 'Rays of light, a gold-ringed photo and a "Winner" stamp turn a result into an event people react to and share.' },
    { icon: '📸', title: 'Built around the photo', desc: 'The winner\'s picture is the biggest thing on the post and can be dragged into place, so the face is never cropped badly.' },
    { icon: '↔', title: 'Long names still fit', desc: 'The name scales to its line, so hyphenated or full names never overflow or break the layout.' },
  ],
  'giveaway-time': [
    { icon: '📢', title: 'Built to stop the scroll', desc: 'Electric colour, a giant headline and a sticker give the post enough contrast to stand out in a crowded feed.' },
    { icon: '📦', title: 'The prize is the hero', desc: 'A big tilted photo card shows exactly what people could win, which lifts entries for product giveaways.' },
    { icon: '⏱', title: 'Quick to enter, quick to read', desc: 'Three short pills and a bold deadline keep the entry steps readable in two seconds on a phone.' },
  ],
  'giveaway-rules': [
    { icon: '✔', title: 'Fewer confused entries', desc: 'Ticked steps in plain order answer "what do I do?" before people ask in the comments, so fewer entries are lost to doubt.' },
    { icon: '§', title: 'Fine print people can read', desc: 'Eligibility and draw details live in their own box with proper line spacing, not in a squashed caption.' },
    { icon: '➕', title: 'Bonus entries stay optional', desc: 'The dashed coral row separates extras like a Story share from the required steps, which keeps the main entry path short.' },
  ],
  'raffle-ticket': [
    { icon: '🎟', title: 'Looks like what you are entering', desc: 'A ticket with notches, a perforation and a barcode makes "enter the draw" feel tangible instead of abstract.' },
    { icon: '🔑', title: 'The three facts that matter', desc: 'Draw date, how to enter and prize value sit in one row, which are the first things people look for in a contest.' },
    { icon: '🔄', title: 'Easy to reuse for every draw', desc: 'Change the prize, photo, date and ticket number and the same ticket works for each monthly or event raffle.' },
  ],
};
