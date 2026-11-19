/* SEO text for the batch of 2026-11-19 (New Podcast Episode, New Video Is Live, Flash Sale Countdown,
   Now Booking, Refer a Friend). One hand-written entry per template, merged into TEMPLATE_SEO and TEMPLATE_WHY. */

export const TEMPLATE_SEO_MEDIA = {
  'podcast-episode': {
    keywords: ['podcast episode post template', 'new podcast episode instagram post', 'podcast announcement template', 'audiogram template', 'podcast promo graphic'],
    about: {
      title: 'New Podcast Episode Template — An Audiogram-Style Post That Moves',
      description: `A podcast is sound, but the feed is silent and visual, so most episode announcements end up as a cover image with the title typed over it. **New Podcast Episode** is a free template that makes a release look like something you can hear: the cover art slides out of a vinyl record, a waveform bounces, and a mini player shows the episode playing.

**Cover art on a record**

Upload your square show or episode artwork and it sits in front of a black record with grooves and a coloured label. In the video export the record spins behind the cover, the way a sleeve is pulled from a turntable. The episode number is a tilted orange tag that is stamped on, so "EP 42" is the second thing people read.

**A player that plays**

Under the title and guest line sits a small player: a round play button that sends out rings, thirty waveform bars that rise and fall like a live audiogram, and a progress bar whose knob travels along while the video runs. Type the episode length and it appears at the end of the bar, so the post says how much time you are asking for.

**Where to listen, who you are**

The footer names the apps (Spotify, Apple Podcasts, YouTube or your own site) and shows your handle with an optional logo. Short labels, a strong headline and one guest line keep the post readable at phone size.

**Sizes**

Portrait suits the Instagram feed, Story and Reel cover keep everything clear of the app overlays, square works on LinkedIn and Facebook, and the wide sizes put the cover on the left with the player on the right. Export the animated MP4 as a Reel or audiogram teaser and pair it with a clip of the episode audio. For a video podcast, the [New Video Is Live](/social-post-templates/new-video/) template shows your YouTube thumbnail instead.`,
    },
    features: [
      'Cover art that slides out of a spinning vinyl record in the video export',
      'Stamped episode-number tag and a blinking "New episode" label',
      'Mini player with a rippling play button, a bouncing 30-bar waveform and a progress knob that travels',
      'Editable episode title with highlighted words, guest line and episode length',
      '"Where to listen" footer line with handle and optional logo',
      'Layouts for portrait, square, Story, landscape, LinkedIn and Pinterest',
      'Four colours (background, text, accent, glow) to match your show artwork',
    ],
    useCases: [
      { icon: '🎙', title: 'Weekly episode drops', desc: 'Swap the cover, number and title each week and the same design becomes your release-day post on every network.' },
      { icon: '🤝', title: 'Guest episodes', desc: 'Put the guest’s name and role in the guest line and tag them, so they can share a post that already looks finished.' },
      { icon: '🎬', title: 'Audiogram Reels', desc: 'Export the animated video, add a 20-second audio clip in Instagram or TikTok, and the waveform looks like it is playing the clip.' },
      { icon: '📅', title: 'Season premieres and trailers', desc: 'Change the label to "Season 2" or "Trailer" and the number tag to "S2", and it announces a new season instead of an episode.' },
    ],
    faqs: [
      { q: 'Does the waveform match my audio?', a: 'No. It is a decorative waveform that moves in the video export, so it suits any episode. If you add sound in Instagram, TikTok or a video editor, the bars read as if they are playing it.' },
      { q: 'What size should my cover art be?', a: 'Square, the same artwork you upload to Spotify and Apple Podcasts. A 1400 to 3000 pixel square image looks sharp at every post size. It stays in your browser and is not uploaded anywhere.' },
      { q: 'Can I use it for a video podcast?', a: 'Yes, though if your episode lives on YouTube, the New Video Is Live template shows a 16:9 thumbnail with a play button, which matches a video better than a square cover.' },
      { q: 'Can I export it as a Reel?', a: 'Yes. Choose the Story / Reel size and export the animated MP4 or WebM. The record spins, the waveform bounces and the progress bar plays across the six seconds.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the podcast HTML and CSS: write a hook-style episode title from your show notes, restyle it for a light show palette, or turn it into a three-post series (trailer, episode, best moment).',
      prompt: `Create a 1080×1350 new podcast episode post in plain HTML and CSS.

- Dark night-studio background (#15111f) with a soft violet glow top right and a warm orange glow bottom left, plus very faint vertical lines.
- Top row: a pill label "NEW EPISODE" with a small glowing orange dot, and on the right a tilted (-4deg) orange tag "EP 42" in bold Plus Jakarta Sans.
- A square cover image (rounded corners, deep shadow) with a black vinyl record peeking out from behind it on the right: repeating radial grooves, a soft conic sheen and an orange centre label.
- An episode title in Plus Jakarta Sans 800, about 80px, with "10K listeners" highlighted in orange, then a muted guest line "with Maya Chen, founder of Loop Studio".
- A rounded translucent player card: an orange circular play button with a white triangle and two thin rings, 30 thin rounded waveform bars of varied heights in an orange-to-violet gradient, a thin progress bar with an orange fill to 38% and a white knob, and "00:00" and "42:18" below.
- Footer: "Spotify · Apple Podcasts · YouTube" on the left, the handle on the right.
- Optional: animate the bars with scaleY, spin the record and move the knob along the bar.`,
    },
  },

  'new-video': {
    keywords: ['new video post template', 'new youtube video announcement', 'youtube video promo post', 'new video instagram post', 'video announcement template'],
    about: {
      title: 'New Video Post Template — Announce Your Upload With Its Thumbnail',
      description: `Your thumbnail is the best image you made for a video, so the post announcing it should be built around it. **New Video Is Live** is a free template that turns the thumbnail into a player people want to press: a big play button, a duration chip, a progress bar and a pointer that taps play.

**The thumbnail is the hero**

Upload the same 16:9 image you used on YouTube, Vimeo or your course platform and it fills a rounded player with a white rim and a deep shadow. An optional sticker of thumbnail text ("30 DAYS LATER") sits in the corner in your colours, so the post works even if the thumbnail itself has no words on it.

**A play button that gets pressed**

In the video export a pointer glides in and taps the red play button, rings spread out from it, and the progress bar starts filling along the bottom edge. The duration chip in the corner tells people how long the video is before they click. It reads like a real player, which is why people stop on it.

**Title, channel and a clear next step**

Below the player sit the video title (highlight a phrase with *asterisks*), an optional round channel photo, a channel line such as "New videos every Tuesday", and a Watch now button with an arrow that nudges. The top bar has a blinking live dot, your handle and an optional logo.

**Sizes**

Portrait and Pinterest stack the player above the text, Story keeps everything inside the safe area for a Story link sticker, and landscape and LinkedIn put the player on the left with the title beside it. For audio-first shows use [New Podcast Episode](/social-post-templates/podcast-episode/); for a written post use [New Blog Article](/social-post-templates/new-blog-article/).`,
    },
    features: [
      'Your 16:9 thumbnail in a rounded player frame with a white rim and shadow',
      'Pointer that taps the play button, with rings spreading out, in the video export',
      'Progress bar that fills while the video plays, plus a duration chip',
      'Optional thumbnail-text sticker in your colours',
      'Video title with highlighted words, optional channel photo and channel line',
      'Watch now button with a nudging arrow and a blinking live dot',
      'Six post sizes with the player placed for each shape',
    ],
    useCases: [
      { icon: '▶', title: 'YouTube upload day', desc: 'Post the thumbnail to Instagram, X and LinkedIn the moment a video goes live, with the title and a link-in-bio prompt.' },
      { icon: '🎓', title: 'New course lessons', desc: 'Announce a new module or lesson with its cover frame and the lesson length on the duration chip.' },
      { icon: '📢', title: 'Webinar replays', desc: 'Share the recording after a live session: the thumbnail, "Replay is up" as the label and the full length on the chip.' },
      { icon: '🔁', title: 'Resurfacing older videos', desc: 'Change the label to "From the archive" and give a popular older video a second life on the feed.' },
    ],
    faqs: [
      { q: 'What thumbnail size should I upload?', a: 'Use your 16:9 video thumbnail, ideally 1280×720 or larger. You can drag it inside the preview to choose which part is centred. The image stays in your browser.' },
      { q: 'Is this a YouTube template?', a: 'It suits YouTube, but it is not tied to any platform. The play button is a plain rounded shape in your accent colour, so it also works for Vimeo, Loom, course videos and your own site.' },
      { q: 'Can I hide the thumbnail text sticker?', a: 'Yes. Clear the Thumbnail text field and the sticker disappears. Many thumbnails already have their own text, so leave it empty when yours does.' },
      { q: 'How does the animated version look?', a: 'Over six seconds the player settles in, the sticker pops, a pointer taps play, rings spread from the button and the progress bar fills, while the Watch now arrow nudges. Export it as MP4 or WebM.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to change the New Video HTML and CSS: write three title options from your video script, restyle the player for a dark channel brand, or add a second smaller thumbnail for a two-part series.',
      prompt: `Create a 1080×1350 "new video is live" social post in plain HTML and CSS.

- Warm off-white background (#f4f1ec) with a faint red glow top right and three large, very pale red play-triangle shapes in the background.
- Top row: a black pill "NEW VIDEO IS LIVE" with a red dot that has a soft ring, and the handle on the right.
- A 16:9 rounded player (thumbnail as a background image, white 8px rim, deep shadow, a dark gradient at the bottom). Inside it: a tilted black sticker with yellow text "30 DAYS LATER" and a red offset shadow at the top left; a red rounded-rectangle play button with a white triangle in the centre; a white arrow pointer just below and right of the button; a dark "12:48" chip at the bottom right; a thin progress bar along the bottom edge, red to 30% with a red knob.
- Below: a round channel photo with a red ring, the title in Poppins 800 about 74px with "30 days" in red, and a muted channel line.
- A red pill button "Watch now · link in bio →" at the bottom.
- Optional: animate a pointer tapping the button, rings spreading out and the progress bar filling.`,
    },
  },

  'flash-sale': {
    keywords: ['flash sale post template', 'flash sale instagram post', 'flash sale countdown template', 'limited time offer post', 'flash sale banner'],
    about: {
      title: 'Flash Sale Post Template — A Countdown Timer With Real Urgency',
      description: `A flash sale only works if people believe it ends soon, and most sale graphics say "limited time" without showing any time at all. **Flash Sale Countdown** is a free template that puts the clock in the post: hours, minutes and seconds tiles, a ticking stopwatch and a lightning bolt, all around one big discount.

**Speed in every part**

Diagonal speed lines race behind a slanted Flash Sale headline in tall condensed type, and a glowing yellow bolt flashes twice every couple of seconds in the video export. The top label ("Today only", "48 hours", "Lunch deal") gives a little shake now and then, the way a notification asks for attention.

**The discount, then the deadline**

The discount is the largest thing on the post and counts up from zero in the animated version. Next to it a short line says what it applies to. Below, a dark timer panel holds a stopwatch whose hand ticks one step a second, an "Ends in" label and three tiles. In the video the minutes and seconds count down to the values you typed, and the colons blink.

**Code and the small print**

A dashed code box pulses gently, and a note line beside it carries the end time, free shipping or anything else that removes doubt. Your handle and optional logo sit in the top bar.

**Sizes**

Use portrait for the feed and Story for a same-day reminder, then the wide sizes for X and Facebook. Set the timer to the time left when you post, and post again with fresh numbers as the deadline gets close. For a whole-weekend event use [Black Friday Sale](/social-post-templates/black-friday/) or [Discount Badge](/social-post-templates/discount-badge/).`,
    },
    features: [
      'Slanted Flash Sale headline over diagonal speed lines',
      'Lightning bolt that double-flashes in the video export',
      'Giant discount that counts up, with a two-line "off everything" label',
      'Hours, minutes and seconds tiles that count down, with blinking colons',
      'Stopwatch whose hand ticks once a second',
      'Pulsing dashed promo-code box, a note line for the end time, handle and optional logo',
      'Six post sizes; the wide layouts put the timer beside the offer',
    ],
    useCases: [
      { icon: '⚡', title: 'Same-day online sales', desc: 'Run a 6, 12 or 24-hour discount and post the timer at the start, the middle and the last hour.' },
      { icon: '🍔', title: 'Lunch and happy-hour deals', desc: 'Restaurants and cafés can post a 2-hour deal with "Today 12–2 PM" in the note line.' },
      { icon: '🎟', title: 'Early-bird tickets and launches', desc: 'Count down the last hours of early-bird pricing for an event, course or software launch.' },
      { icon: '📦', title: 'Stock clearance', desc: 'Change the label to "Last stock" and the line to "off clearance items" to move old inventory quickly.' },
    ],
    faqs: [
      { q: 'Does the timer count down live on Instagram?', a: 'A post image cannot count down on its own. The still image shows the time you type, and the animated video counts the minutes and seconds down to it. Update the numbers each time you repost.' },
      { q: 'What should I put in the timer?', a: 'The time left when you publish, such as 05 hours 17 minutes 42 seconds. If you post a still image only, round it, for example 06 : 00 : 00 with "Ends tonight 11:59 PM" in the note line.' },
      { q: 'Can I change "50%" to a price?', a: 'Yes. The discount field takes any short text such as "$10", "2 FOR 1" or "-30%". Numbers in it count up in the video.' },
      { q: 'How is this different from the Countdown template?', a: 'Countdown is an event countdown with a date and a ring. Flash Sale Countdown is a sales post: it leads with the discount and adds a promo code, a bolt and hours-minutes-seconds tiles.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Flash Sale HTML and CSS: write short urgency lines for each repost, change the palette to your brand, or add a product photo beside the discount.',
      prompt: `Create a 1080×1350 flash sale post in plain HTML and CSS.

- Deep indigo background (#140c33) with a magenta glow behind the middle right and diagonal speed lines (a repeating linear gradient at -62deg, thin white and yellow stripes at low opacity).
- A large glowing yellow lightning bolt (clip-path polygon, yellow gradient, yellow drop-shadow) on the right, behind the text.
- Top row: a skewed magenta label "TODAY ONLY" in white uppercase and the handle on the right.
- "FLASH SALE" in Bebas Neue about 216px, skewed -9deg, white with "SALE" in yellow and a magenta offset text shadow.
- "50%" in yellow Bebas Neue about 330px with a soft glow, and "OFF / EVERYTHING" stacked beside it.
- A dark timer panel with a yellow border: a stopwatch (yellow ring, crown on top, magenta hand), an "ENDS IN" label and three white tiles "05 HRS", "17 MIN", "42 SEC" with yellow colons.
- Footer: a dashed yellow code box "CODE FLASH50" and a note "Free shipping on every order · Tonight 11:59 PM".
- Optional: flash the bolt, tick the hand once per second and count the seconds down.`,
    },
  },

  'now-booking': {
    keywords: ['now booking post template', 'now booking instagram post', 'booking availability post', 'spots left template', 'appointments available post'],
    about: {
      title: 'Now Booking Post Template — Show Your Calendar and the Spots Left',
      description: `"DM me to book" is easy to scroll past. A calendar that is nearly full is not, because it shows that other people already booked and that only a few days are left. **Now Booking** is a free availability post for freelancers, salons, studios, tutors and coaches, built around a month calendar.

**A calendar that fills up**

The card shows a real month, Monday to Sunday, built from three simple fields: type the month ("January 2027"), list your open dates ("8, 17, 22") and your days off ("Sat, Sun"). The grid starts on the right weekday, your open dates glow in your accent colour, days off are greyed, and every other day is crossed out as booked. In the video export the crosses are stamped on one day after another, then the open days pop in, so viewers watch the month fill up and see what is still free.

**Spots left, services and how to book**

An "Only 3 spots left" badge pulses next to the month name, and the number counts your open dates for you, so the badge and the calendar always agree. Above the calendar a calm serif headline ("December is open for bookings") sits over up to three service chips, such as photo sessions, website builds or strategy calls. A dark button at the bottom says exactly how to book, for example "DM BOOK or tap the link in bio", with an arrow that nudges.

**Calm colours for service businesses**

Sage, cream and terracotta suit beauty, wellness, photography and creative services. All four colours can be changed, and your handle and optional logo sit in the top row.

**Sizes**

Portrait and Pinterest stack the headline above the calendar. Square, landscape and LinkedIn place them side by side, and Story keeps the button clear of the reply bar. Post it when you open a new month, then again when spots run low. For a single event date use [Save the Date](/social-post-templates/save-the-date/); for closures use [Holiday Hours](/social-post-templates/holiday-hours/).`,
    },
    features: [
      'Month calendar card with booked days crossed out, rest days greyed and three open days highlighted',
      'Crosses stamped one by one in the video export, then the open days pop in',
      'Pulsing "spots left" badge beside an editable month title',
      'Serif headline with italic highlight and up to three service chips',
      'How-to-book button with a nudging arrow, handle and optional logo',
      'Side-by-side layout for square, landscape and LinkedIn; stacked for portrait, Story and Pinterest',
      'Four editable colours, set to calm sage and terracotta by default',
    ],
    useCases: [
      { icon: '📸', title: 'Photographers and creatives', desc: 'Open next month’s session dates and show how few are left, so followers book before the calendar closes.' },
      { icon: '💇', title: 'Salons, studios and therapists', desc: 'Post your open appointment days with your services as chips and the booking link in the button.' },
      { icon: '💻', title: 'Freelancers and agencies', desc: 'Show project capacity for the next month, such as "2 project slots left", to pull in clients who were waiting.' },
      { icon: '🧑‍🏫', title: 'Tutors and coaches', desc: 'Share available 1:1 call days before exam season or the new year, with the sign-up step in the button.' },
    ],
    faqs: [
      { q: 'Do the calendar days match a real month?', a: 'Yes. Type the month and year in the Calendar month field, for example "March 2027", and the grid starts on the right weekday with the right number of days. Weeks run Monday to Sunday.' },
      { q: 'Can I change which days are open?', a: 'Yes. List your free dates in the Open days field, such as "8, 17, 22" or a range like "8-10", and your days off in Days off, such as "Sat, Sun" or "Sun, 24, 25". Every other day is shown as booked, and {spots} in the badge counts the open dates for you.' },
      { q: 'Does it work for a business that is fully booked?', a: 'Yes. Change the badge to "Fully booked" and the headline to "January is full, February opens soon". The crossed-out calendar makes the point for you.' },
      { q: 'Which size is best for this post?', a: 'Portrait for the Instagram feed, Story for a quick reminder with a link sticker, and square for Facebook and LinkedIn, where the calendar sits beside the headline.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to change the Now Booking HTML and CSS: start weeks on Sunday instead of Monday, write a friendly booking caption, or restyle it for a bold brand.',
      prompt: `Create a 1080×1350 "now booking" availability post in plain HTML and CSS.

- Soft sage background (#e7ede3) with a faint terracotta glow at the bottom right and a large pale leaf shape in the top right corner.
- Top row: a dark green pill "NOW BOOKING" with a small mint dot, and the handle on the right.
- A Playfair Display headline about 97px: "December is open for bookings" with "December" in italic terracotta (#d4683f).
- Three outlined pill chips: "Brand photo sessions", "Website builds", "1:1 strategy calls".
- A cream calendar card (rounded, soft shadow): "December 2026" in Playfair on the left, a terracotta pill "Only 3 spots left" on the right, weekday letters M T W T F S S, then a Monday-first grid of December 2026 (starts on a Tuesday, 31 days, empty cells before day 1). Weekends faded; days 8, 17 and 22 filled terracotta with white numbers and a soft glow; every other weekday in a pale tile with a dark X drawn from two rotated bars.
- A dark green pill button "DM “BOOK” or tap the link in bio →" at the bottom.
- Optional: stamp the X marks one after another, then pop the open days.`,
    },
  },

  'referral': {
    keywords: ['refer a friend post template', 'referral program social media post', 'give get referral template', 'referral instagram post', 'invite a friend reward post'],
    about: {
      title: 'Refer a Friend Post Template — Give $20, Get $20 in One Glance',
      description: `A referral programme only spreads if people understand both sides of it in a second: what they get, what their friend gets, and what they have to do. **Refer a Friend** is a free post template that shows exactly that, with two reward cards side by side and three numbered steps underneath.

**Two cards, two rewards**

A coral card says what you get and a mint card says what your friend gets, each tilted slightly towards the other with a white gift box on top. In the video export the cards slide in from opposite sides, the amounts count up, the gift boxes take turns hopping, and two arrows between the cards move in opposite directions, showing the exchange.

**A headline that says the deal**

"Give $20, get $20" is the default, with each amount coloured like its card, so the headline and the cards read as one idea. Change it to "Give 15%, get 15%", "Invite 3 friends, get a month free" or anything your programme offers.

**Three steps and where to find the link**

Numbered step cards ("Share your link", "Your friend orders", "You both get rewarded") pop in one after another, and a line under them says where the code or link lives. Your handle and optional logo sit in the top row.

**Sizes**

Portrait and Pinterest stack everything in the centre, Story keeps the steps above the reply bar, and the wide sizes put the headline and steps on the left with the cards on the right. Pin it to your profile, or post it after a purchase wave when happy customers are most likely to share. For a one-off prize use [Giveaway Contest](/social-post-templates/giveaway/).`,
    },
    features: [
      'Two reward cards for "you get" and "your friend gets", each with an amount, label and note',
      'Gift boxes that take turns hopping, cards that slide in, and amounts that count up in the video',
      'Swap arrows between the cards moving in opposite directions',
      'Headline with each amount coloured like its card',
      'Three numbered step cards that pop in order, plus a code or link line',
      'Handle and optional logo in the top row',
      'Six post sizes with stacked and side-by-side layouts',
    ],
    useCases: [
      { icon: '🛒', title: 'Online shops', desc: 'Promote store credit for both customers, such as "$20 for you, $20 off their first order".' },
      { icon: '📱', title: 'Apps and SaaS', desc: 'Announce "Invite a friend, both get a month free" with the steps matching your in-app flow.' },
      { icon: '💅', title: 'Local services', desc: 'Salons, gyms and cleaners can offer "Bring a friend, both get 20% off" with "Show this post at the desk" as the last line.' },
      { icon: '🎉', title: 'Programme relaunch', desc: 'Doubling the reward for a week? Change the amounts and label it "Double rewards this week".' },
    ],
    faqs: [
      { q: 'Can the two rewards be different?', a: 'Yes. Each card has its own label, amount and note, so "You get 1 free month" and "Your friend gets 50% off" work just as well as matching amounts.' },
      { q: 'Do the amounts have to be numbers?', a: 'No, but numbers count up in the animated video. Text such as "FREE" or "1 month" is shown as it is.' },
      { q: 'Where do I put the referral link?', a: 'Instagram posts cannot hold links, so use the last line to say where the link lives, such as "Find your link in your account" or "Link in bio". On a Story, add a link sticker over the empty area under the steps.' },
      { q: 'Can I match it to my brand colours?', a: 'Yes. Background, text and both card colours are editable. Keep the two card colours different so the two sides of the deal stay easy to tell apart.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the referral HTML and CSS: write the three steps for your actual programme, create a "double rewards week" version, or change the gift boxes to icons that match your product.',
      prompt: `Create a 1080×1350 refer-a-friend post in plain HTML and CSS.

- Pale lilac background (#f3eeff) with a soft coral glow on the left, a soft mint glow on the right and a few small coral and mint dots and rings.
- Top row: a dark pill "REFER A FRIEND" and the handle on the right.
- A centred Plus Jakarta Sans 800 headline about 130px: "Give $20, get $20" with the first $20 in coral (#ff6152) and the second in mint (#14b892).
- Two reward cards side by side, the coral one tilted -3deg and the mint one 3deg, with rounded corners and white text: a small uppercase label ("YOU GET" / "YOUR FRIEND GETS"), "$20" very large, and a note ("store credit" / "off their first order"). On top of each card, half outside it, a white gift box drawn with CSS: a lid, a box with a dark ribbon and a two-loop bow.
- Between the cards, two arrows, one pointing right and a fainter one pointing left.
- A row of three white step cards with dark numbered circles: "Share your link", "Your friend orders", "You both get rewarded".
- A muted centred line at the bottom: "Find your link in your account · no limit on invites".
- Optional: slide the cards in from opposite sides, hop the gift boxes in turn and count the amounts up.`,
    },
  },
};

export const TEMPLATE_WHY_MEDIA = {
  'podcast-episode': [
    { icon: '🎧', title: 'Looks like sound', desc: 'A record, a waveform and a player turn a silent image into something people recognise as audio before they read a word.' },
    { icon: '🔢', title: 'Episode number up front', desc: 'The stamped EP tag helps regular listeners spot new episodes and makes a back catalogue feel substantial.' },
    { icon: '🎬', title: 'Ready-made audiogram', desc: 'The animated export moves like an audiogram, so adding a short audio clip in the app gives you a Reel in minutes.' },
  ],
  'new-video': [
    { icon: '🖼', title: 'Reuses your best image', desc: 'You already designed the thumbnail to earn clicks; this post puts it to work on every other network.' },
    { icon: '👆', title: 'Asks to be pressed', desc: 'A play button, a pointer and a progress bar make the post feel interactive, which earns more taps through to the video.' },
    { icon: '⏱', title: 'Sets expectations', desc: 'The duration chip and channel line tell people how long it is and when the next one comes, which builds a viewing habit.' },
  ],
  'flash-sale': [
    { icon: '⏳', title: 'Shows the deadline', desc: 'Hours, minutes and seconds turn "limited time" into a real number, which is what makes people act now.' },
    { icon: '⚡', title: 'Feels fast', desc: 'Speed lines, a flashing bolt and a ticking stopwatch match the message, so the post itself feels urgent.' },
    { icon: '🔁', title: 'Made for reposting', desc: 'Change the timer numbers and post again as the end gets close; the design stays familiar while the clock moves.' },
  ],
  'now-booking': [
    { icon: '📆', title: 'Scarcity people can see', desc: 'A calendar of crossed-out days proves demand far better than saying "limited spots", and it makes the open days stand out.' },
    { icon: '🧭', title: 'Everything needed to book', desc: 'What you offer, when you are free and how to book are all on the post, so followers don’t have to message to ask.' },
    { icon: '🌿', title: 'Calm, trustworthy look', desc: 'Soft colours and a serif headline suit service businesses where trust matters more than hype.' },
  ],
  'referral': [
    { icon: '🤝', title: 'Both sides in one glance', desc: 'Two matching cards show what the sharer and the friend each get, so nobody has to read the terms to understand it.' },
    { icon: '🪜', title: 'Three steps, no confusion', desc: 'Numbered steps answer "how does it work?" before it is asked, which removes the main reason people don’t share.' },
    { icon: '🎁', title: 'Feels like a gift', desc: 'Hopping gift boxes and warm colours make the offer feel generous rather than salesy, which is what friends pass on.' },
  ],
};
