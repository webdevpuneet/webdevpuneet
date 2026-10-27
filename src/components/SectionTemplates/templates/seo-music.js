/* SEO page content for the Music category (merged into SECTION_SEO in seo-content.js and into the
   category pages in seo-categories.js). Same shape as every other entry: keywords, about (with every
   setting and option), 8 features, 3 reasons, 4 use cases (18-42 words), 4 FAQs and an AI prompt. */

export const MUSIC_SEO = {
  'music-hero': {
    keywords: ['music artist website template', 'band website hero section', 'musician website html', 'album release landing page', 'dj website header', 'band website template free'],
    about: {
      title: 'Music Artist Hero — Free Band Website Section',
      description: `**Music Artist Hero** is the top of a band or artist website. Your photo fills the screen under a dark gradient, the artist name is set huge in capitals, a small pill announces the new release, two buttons lead to the music and the tour, and a row of streaming links sits underneath. A quiet equalizer along the bottom edge moves gently, and it stops for visitors who prefer reduced motion.

**Built to introduce an artist in seconds**

Visitors should know who you are, what you sound like and where to listen before they scroll. The name carries the identity, the one-line tagline carries the sound, and the buttons carry the next step. Because the name is real text in an h1 heading, search engines read your artist name as the page's main topic.

**Every setting and option**

**Background photo:** upload any wide photo of the artist, the band or a stage. The gradient keeps text readable on light and dark images. **Release pill (optional):** a short announcement such as "New album · Out 14 November", with a softly pulsing dot. **Artist or band name:** two lines work well, and words wrapped in asterisks take your brand colour. **Tagline:** one or two sentences about the sound. **Buttons:** a primary button and an optional secondary one, each with its own link. **Streaming links:** 1 to 6 text links such as Spotify, Apple Music, YouTube and Bandcamp, which you can switch off. **Theme:** colours, fonts, corner radius, content width and text, spacing and gap scales, any preset or brand kit. **Motion:** entrance animations and headline effects from the Website Builder, plus the built-in equalizer.

**Works everywhere**

The hero is plain HTML and CSS with no scripts, so it loads fast, and it reflows into a stacked layout on phones. Export HTML, a ZIP, React, Vue or a Next.js site, or fork it into [My Code](/ui-snippets/mycode/). It is the first section of the [Music Artist & Band Website](/website-builder/templates/music/) template.

**Part of a complete music website**

Pair it with the [New Release Spotlight](/website-section-templates/release-spotlight/) for a countdown, the [Audio Player & Track List](/website-section-templates/audio-player/) for song previews and the [Tour Dates & Tickets](/website-section-templates/tour-dates/) section for shows. The complete [Music Artist & Band Website](/website-builder/templates/music/) template uses all of them.

**Getting the most from it**

Choose a photo with empty space on the left, because the text sits there. Keep the release pill under six words, and point the primary button at your newest song or the audio player. Link each streaming name to the exact release page rather than your profile, so listeners land on the song.`,
    },
    features: [
      'Full-width photo under a readable dark gradient',
      'Huge uppercase artist name with colour accent words',
      'Release pill with a softly pulsing dot',
      'Primary and secondary buttons with their own links',
      '1 to 6 streaming links under the buttons',
      'Equalizer bars along the bottom edge',
      'Reduced-motion friendly; plain HTML with no scripts',
      'Export HTML, a ZIP, React, Vue or Next.js',
    ],
    why: [
      { icon: '🎤', title: 'Identity first', desc: 'The name, the tagline and one clear button tell visitors who you are and what to do next within a single screen.' },
      { icon: '⚡', title: 'Light and fast', desc: 'No scripts and one background image, so the first thing fans see loads quickly, even on mobile data.' },
      { icon: '✓', title: 'Readable on any photo', desc: 'The gradient and text colours come from your theme, so contrast stays strong whether the photo is bright or dark.' },
    ],
    useCases: [
      { icon: '🎸', title: 'Band homepage', desc: 'Open a band website with a stage photo, the band name in huge type, the new album announcement and buttons that lead straight to the music and the tour.' },
      { icon: '🎧', title: 'DJ and producer pages', desc: 'Give a DJ or producer a bold intro with a club photo, a "New mix" pill and links to SoundCloud, Spotify and booking, all above the fold.' },
      { icon: '💿', title: 'Album launch page', desc: 'Run a single-purpose launch page: the cover artwork as the background, the release date in the pill and a pre-save button as the primary action.' },
      { icon: '🎻', title: 'Orchestras and choirs', desc: 'Introduce an ensemble or choir with a concert photo, the season name in the heading and buttons for tickets and the programme.' },
    ],
    faqs: [
      { q: 'What image works best for the background?', a: 'A wide photo at least 1920 by 1080 pixels with calm space on the left, where the text sits. Stage shots, band portraits and album artwork all work because the gradient keeps the text readable.' },
      { q: 'Can I change the colours and fonts?', a: 'Yes. The hero uses your theme colours, so the pill, the accent words in the name and the buttons follow your brand colour. Pick a heading and body font pair, the corner radius and the scale of text, spacing and gaps.' },
      { q: 'Does the equalizer slow the page down?', a: 'No. It is pure CSS, animates only transforms, and is switched off for visitors who set reduced motion in their system. The bars sit behind the text and never block clicks, so the section stays almost as light as a static image.' },
      { q: 'Is it good for SEO?', a: 'The artist name is a real h1, the tagline and links are real text, and the photo has a label, so search engines and AI assistants understand who the page is about and where to listen.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the hero: add a looping muted video background, a "now playing" mini player in the corner or a countdown inside the pill.',
      prompt: `Create a music artist hero section in HTML and CSS.

- Full-width background photo with a dark gradient from the left and the bottom so text stays readable.
- A small pill with a pulsing dot and a release announcement, an h1 artist name in huge uppercase type (clamp between 64px and 168px) with the last word in the accent colour, and a short tagline.
- A primary button and a ghost button, then a row of text links for Spotify, Apple Music, YouTube and Bandcamp.
- A row of 24 equalizer bars along the bottom edge, animated with scaleY and staggered delays, switched off with prefers-reduced-motion.
- Theme colours as CSS custom properties; a stacked layout on small screens.`,
    },
  },

  'audio-player': {
    keywords: ['html audio player', 'music player for website', 'audio playlist html css javascript', 'mp3 player section', 'song preview player', 'track list player template'],
    about: {
      title: 'Audio Player & Track List — Free HTML Music Player',
      description: `**Audio Player & Track List** is a music player that works on any website with no plugin and no library. A now-playing panel shows the cover, the title, a progress bar you can click or drag, the elapsed and total time and previous, play and next buttons; beside it is the track list with numbers, covers and lengths, and a small equalizer on the row that is playing.

**Plain HTML audio, nothing to install**

The player uses the browser's own audio element, so it needs no third-party script, no account and no tracking. Give each track the link to an MP3 or WAV file and it plays. When a track ends, the next one starts. Only one player on a page plays at a time, so two players never talk over each other.

**Every setting and option**

**Heading group:** an optional eyebrow, a heading with words in asterisks coloured by your brand, and intro text, which you can switch off. **Tracks (1 to 20):** each track has cover art (optional), a title, an artist or note line, the audio file link (MP3 or WAV), the length shown in the list, a link label such as Stream or Buy, and an optional stream or buy link. **Playback:** click a row to play it, click the playing row to pause, use previous (restarts the track if it has played for more than three seconds), play or pause, and next; drag or click the progress bar to seek. **Real lengths:** the length you type is replaced by the real one once the file loads. **Tracks without audio:** they stay in the list with their stream link, and the panel explains that no file is attached yet. **Theme:** colours, fonts, corner radius, content width and the text, spacing and gap scales.

**Accessible and keyboard friendly**

Every control is a real button with a label, the progress bar is a native range input, the playing row is marked, and a status message tells people when a file cannot be loaded. Visitors who prefer reduced motion see a still equalizer.

**Part of a complete music website**

Place it after the [New Release Spotlight](/website-section-templates/release-spotlight/) so the countdown and the previews sit together, or above the [Discography Grid](/website-section-templates/discography/) so fans can hear a song before browsing the catalogue. Both are part of the [Music Artist & Band Website](/website-builder/templates/music/) template.

**Getting the most from it**

Use 30 to 60 second previews at 128 to 192 kbps MP3 so they start instantly, and put the full-song link in the stream field, because the player is for tasting, not for giving the song away. Keep titles unique and descriptive: the track names and artist line are real text that search engines read.`,
    },
    features: [
      'Plain HTML audio: no plugin, library or tracking',
      'Now-playing panel with cover, title and time',
      'Click or drag the progress bar to seek',
      'Previous, play or pause and next buttons',
      'Track list with numbers, covers, lengths and equalizer',
      'Next track starts automatically; one player plays at a time',
      '1 to 20 tracks with MP3 or WAV links and stream links',
      'Keyboard accessible with labelled controls',
    ],
    why: [
      { icon: '▶', title: 'Press play, right on your site', desc: 'Visitors hear the music without leaving the page, which keeps them longer and turns listeners into fans.' },
      { icon: '🔒', title: 'No third party', desc: 'The player sends no data to anyone and needs no embed code, so it stays fast and private.' },
      { icon: '↗', title: 'Previews that sell', desc: 'Every track can carry a stream or buy link, so a good preview leads straight to the full song.' },
    ],
    useCases: [
      { icon: '🎵', title: 'Song previews for a new album', desc: 'Let fans hear 30 seconds of each new song and tap the stream link beside the one they like, right on the album page.' },
      { icon: '🎹', title: 'Producer and composer portfolios', desc: 'Show clients a playlist of tracks for film, games or advertising, with a licensing link on each track so enquiries start from the song they just heard.' },
      { icon: '🎙️', title: 'Podcast and audiobook samples', desc: 'Offer a sample chapter or a trailer episode as a playlist, with a link to the full episode or the audiobook store on each row.' },
      { icon: '📻', title: 'Sound libraries and samples', desc: 'List sample packs or sound effects as tracks with short loops that play instantly, plus a buy link beside each one.' },
    ],
    faqs: [
      { q: 'Which audio formats can I use?', a: 'MP3 works everywhere and is the best choice for previews. WAV, AAC (m4a) and OGG also play in most browsers. Paste a direct link to the file, hosted on your own site or a file host that allows direct links.' },
      { q: 'Can I list a track without an audio file?', a: 'Yes. A track without a file stays in the list with its cover, title and stream link, and the panel tells visitors there is no preview for it. This suits songs you only want to link to.' },
      { q: 'Does it work on phones and with the keyboard?', a: 'Yes. Controls are large buttons, the progress bar is a native slider that works by touch, and every control has a label for screen readers and keyboard users.' },
      { q: 'Will two players play at once?', a: 'No. When one audio player starts, any other player on the page pauses, so visitors never hear two songs together. Within one player, picking another track stops the current one and starts the new one, so playback always follows the last thing the visitor chose.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the player: add a volume slider, a shuffle and repeat button, a waveform progress bar or a keyboard shortcut for space to play and pause.',
      prompt: `Create a music player section in HTML, CSS and vanilla JavaScript using the HTML audio element.

- A now-playing panel (cover, title, artist line, a range input for seeking, elapsed and total time, previous, play or pause and next buttons) beside an ordered track list (number, thumbnail, title, artist, length, optional stream link).
- Clicking a row plays it; clicking the playing row pauses; previous restarts a track after 3 seconds; when a track ends the next one starts; only one player on the page plays at a time.
- Update the progress bar on timeupdate and set the real duration on loadedmetadata; tracks without a source show a message and keep their link.
- A small three-bar equalizer on the playing row, disabled with prefers-reduced-motion.
- Buttons need aria-labels; theme colours as CSS custom properties; a one-column layout on small screens.`,
    },
  },

  'tour-dates': {
    keywords: ['tour dates section', 'concert dates html template', 'band tour page', 'gig list website', 'musicevent structured data', 'tickets section template'],
    about: {
      title: 'Tour Dates & Tickets — Free Concert List Section',
      description: `**Tour Dates & Tickets** is a tour page in one section. Every show is a row with a big date, the city and venue, a status pill (Tickets, Few left, Sold out or Free) and a ticket button. Sold-out shows are dimmed, rows lift on hover, and on phones each row stacks neatly so nothing is cut off.

**Structured data for search engines**

Add the date of a show in year-month-day form and the section also writes Event structured data (a list of MusicEvent items with the artist, venue, city, start date and ticket link), so search engines can understand and show your concerts. The artist name field is used only for this data and does not appear on the page.

**Every setting and option**

**Heading group:** eyebrow, heading with brand-coloured words and intro text. **Artist name:** used in the structured data. **Shows (1 to 30):** month, day, city, venue, status text, button text, ticket link and the date for search engines. **Status:** write Tickets, Few left, Sold out or Free and the pill is coloured to match (amber, red or green), while any other text uses the neutral style. **Sold out:** the row dims and the button becomes an inactive outline. **Note and button (optional):** small print about doors and age limits, and a button such as "Request a show in your city". **Theme:** colours, fonts, corner radius, content width and the text, spacing and gap scales.

**A page people actually use**

The date block is the first thing the eye finds, so the list reads like a calendar. Buttons are large and have visible focus, and every row is plain text that screen readers read in order: date, place, status, then the action.

**Part of a complete music website**

Follow it with the [Streaming Links Bar](/website-section-templates/streaming-links/) so fans who cannot make a show can still listen, and open the page with the [Music Artist Hero](/website-section-templates/music-hero/). The full [Music Artist & Band Website](/website-builder/templates/music/) template includes a dedicated Tour page with a gig FAQ.

**Getting the most from it**

List shows in date order and remove past dates so the page never looks stale. Link each button to the exact ticket page, not the venue's home page. Put the time in the date for search engines (for example 2026-11-14T21:00) and mention doors and age limits in the note, because those are the questions fans ask most.`,
    },
    features: [
      'Calendar-style rows: date, city, venue, status and button',
      'Colour-coded status: Tickets, Few left, Sold out, Free',
      'Sold-out rows dim and the button switches off',
      'MusicEvent structured data from each show date',
      '1 to 30 shows; optional note and request button',
      'Hover lift and clear keyboard focus',
      'Stacks neatly on phones',
      'Export HTML, a ZIP, React, Vue or Next.js',
    ],
    why: [
      { icon: '📅', title: 'Scannable at a glance', desc: 'A big date block and a clear status let fans find their city and the right ticket button in seconds.' },
      { icon: '🔎', title: 'Found in search', desc: 'Event structured data helps search engines understand each show, so your concerts can appear for your name and city.' },
      { icon: '🎟', title: 'Straight to tickets', desc: 'Each row links to its own ticket page, which cuts steps between wanting to go and buying.' },
    ],
    useCases: [
      { icon: '🎤', title: 'Band tours', desc: 'List a full tour with dates, venues and status so fans see at a glance where tickets are left and where they should join the waiting list.' },
      { icon: '🎛️', title: 'DJ and club nights', desc: 'Publish residencies and festival slots with the venue, the set time in the note and a free-entry badge for the nights without a ticket.' },
      { icon: '🎻', title: 'Orchestras and theatre', desc: 'Show a concert season with a row per performance, the programme in the venue line and a booking button that opens the box office.' },
      { icon: '🎪', title: 'Festivals and series', desc: 'Present a festival line-up by day or a monthly event series, with the ticket status updated as each date sells out.' },
    ],
    faqs: [
      { q: 'How do I mark a show as sold out?', a: 'Type Sold out in the status field. The status pill turns red, the row dims and the button becomes an inactive outline. You can also change the button text to Sold out or Join the waitlist.' },
      { q: 'What is the date for search engines field?', a: 'It is an optional year-month-day date, such as 2026-11-14 or 2026-11-14T21:00, used to write Event structured data. It does not appear on the page, so the month and day boxes can stay in your own style.' },
      { q: 'Can I show past dates?', a: 'You can, but remove them or move them to an archive page. A tour list that only shows upcoming shows looks current and gives search engines clean, relevant events.' },
      { q: 'Does it work on mobile?', a: 'Yes. Below a narrow width each row becomes a two-column card with the date and place on top and the status and button underneath. Tap targets stay at least 44 pixels high, so the ticket buttons are easy to press on a phone.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the section: add a filter by country, a "add to calendar" link on each row or a map with a pin for the next show.',
      prompt: `Create a tour dates section in HTML and CSS.

- A list where each row is a grid: a date block (month in small caps, day in large type), the city and venue, a status pill and a ticket button.
- Status values: Tickets (neutral), Few left (amber), Free (green) and Sold out (red, row dimmed, button outlined and non-clickable).
- Rows get a faint highlight on hover; the buttons have visible focus.
- Below 720px each row becomes two columns: date and place on top, status and button underneath.
- Add JSON-LD with an ItemList of MusicEvent items (name, startDate in ISO format, location with Place name and address, url and performer).
- Theme colours as CSS custom properties.`,
    },
  },

  discography: {
    keywords: ['discography grid template', 'album grid html css', 'band discography section', 'cover art grid with filter', 'vinyl hover effect css', 'music releases list template'],
    about: {
      title: 'Discography Grid — Free Album & Releases Section',
      description: `**Discography Grid** shows your catalogue as a grid of cover art. Each release has its cover, title, type, year and a listen link, and a vinyl record slides out from behind the cover on hover. Filter chips are built from the release types you write (Album, EP, Single, Live), so visitors can narrow the catalogue in one tap.

**A catalogue that is easy to browse**

Square covers sit in a responsive grid that fits two columns on a phone and four or more on a wide screen. Hover or keyboard focus on a card makes the vinyl slide out and spin a little, which signals that the card is clickable. On touch screens the record is shown half out all the time, because there is no hover.

**Every setting and option**

**Heading group:** eyebrow, heading with brand-coloured words and intro text, which you can switch off. **Filter chips:** on or off, with the label of the "show all" chip. The other chips come from the types you enter, in order of first use. **Vinyl on hover:** on or off. **Releases (2 to 24):** each has cover art, alt text, a type, a title, a year, extra info (such as "11 tracks" or "3:42"), link text and a link. **Theme:** colours, fonts, corner radius, content width and the text, spacing and gap scales.

**Good for fans and for search**

Every release is a real link with a real title, year and type in the HTML, whether or not the visitor uses the chips. Without JavaScript every release is simply shown, and with reduced motion the vinyl stays still.

**Part of a complete music website**

Show it after the [Audio Player & Track List](/website-section-templates/audio-player/) and the [New Release Spotlight](/website-section-templates/release-spotlight/), or put the covers in the [3D Scroll Carousel](/website-section-templates/scroll-ring/) for a showcase. The [Music Artist & Band Website](/website-builder/templates/music/) template uses both.

**Getting the most from it**

Use square covers of the same size, about 1000 by 1000 pixels, and write alt text that describes the cover. List the newest release first, keep types consistent (always "Single", not "single" and "Singles") so the chips stay tidy, and link each card to the release's own page or streaming link rather than to your profile.`,
    },
    features: [
      'Responsive grid of square cover art',
      'Filter chips built from your release types',
      'Vinyl record slides out and spins on hover',
      'Year, type and extra info under every cover',
      '2 to 24 releases with link text and links',
      'Shows everything without JavaScript',
      'Respects reduced motion; touch-friendly vinyl',
      'Export HTML, a ZIP, React, Vue or Next.js',
    ],
    why: [
      { icon: '💿', title: 'Browse by type', desc: 'Chips for Album, EP, Single and Live let fans jump to what they want in one tap, even in a long catalogue.' },
      { icon: '✨', title: 'A little magic on hover', desc: 'The vinyl that slides out makes the grid feel like a record shelf and invites a click.' },
      { icon: '🔗', title: 'Every card is a link', desc: 'Each release links straight to where it plays, so the grid doubles as a menu of every way to listen.' },
    ],
    useCases: [
      { icon: '🎸', title: 'Band and artist catalogues', desc: 'Show every album, EP and single in order with the year and track count, so new fans can explore your whole history from one page.' },
      { icon: '🏷️', title: 'Record label rosters', desc: 'List a label catalogue with the type as the artist name, so the chips let visitors filter releases by artist at a glance.' },
      { icon: '🎬', title: 'Soundtracks and remixes', desc: 'Group film scores, remixes and collaborations with their own chips and a link to each release on the right store.' },
      { icon: '📚', title: 'Compilations and series', desc: 'Present a long-running compilation series or mix series as a tidy grid, with the volume number in the title and the year beneath.' },
    ],
    faqs: [
      { q: 'How are the filter chips created?', a: 'They are built automatically from the type you enter for each release. If you use Album, EP, Single and Live you get those four chips plus the All chip, whose label you can change.' },
      { q: 'Can I turn off the vinyl effect?', a: 'Yes. There is a switch for the vinyl in the settings. With it off, the covers still lift slightly on hover. Visitors who prefer reduced motion do not see the sliding animation.' },
      { q: 'What size should cover art be?', a: 'Square images around 1000 by 1000 pixels. They are shown in a square frame, so non-square images are cropped. Add alt text that describes the cover for screen readers.' },
      { q: 'What happens without JavaScript?', a: 'Every release is shown and every card is a normal link. JavaScript only adds the filter chips on top, which keeps the page fast on slow connections and makes the whole catalogue readable by search engines and AI assistants.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the grid: add a sort control by year, a lightbox with the tracklist or a "now playing" badge on the release that is currently streaming.',
      prompt: `Create a discography grid section in HTML, CSS and vanilla JavaScript.

- A responsive grid (auto-fill, minimum 230px) of release cards: a square cover, a type label in small caps, the title, the year and extra info, and a "Listen" link.
- Behind each cover place a vinyl disc made with radial and repeating-radial gradients; on hover or focus translate the disc out to the right and rotate it, and nudge the cover left. On hover-less devices show it half out. Disable transitions with prefers-reduced-motion.
- Build filter chips from the unique data-tag values of the cards (plus an All chip); clicking a chip hides cards with other tags and sets aria-pressed on the chips. Without JavaScript show all cards.
- Theme colours as CSS custom properties.`,
    },
  },

  'release-spotlight': {
    keywords: ['album release countdown', 'new release landing page', 'pre-save page template', 'countdown to album release html', 'single launch section', 'spinning vinyl css'],
    about: {
      title: 'New Release Spotlight — Free Album Countdown Section',
      description: `**New Release Spotlight** puts your newest album or single in the spotlight. A large cover sits in front of a slowly spinning vinyl, with the title, a short blurb, an optional tracklist and two buttons. A live countdown runs to your release date and time, and when the moment passes the section switches to an "Out now" message by itself and the primary button can change from "Pre-save" to "Listen now".

**A launch page that runs itself**

Set the date once and the countdown ticks down in days, hours, minutes and seconds in the visitor's own time. You do not have to remember to update the page at midnight: the countdown hides, the out-now message appears and the button text changes as soon as the release time arrives.

**Every setting and option**

**Release group:** eyebrow, title with brand-coloured words, a blurb, and an optional tracklist written one track per line and numbered automatically. **Cover:** the cover art and its alt text; the vinyl behind it spins slowly. **Release date and time:** written as year-month-day and time, for example 2026-11-14T18:00; there is a switch to hide the countdown entirely. **Countdown labels:** the words for days, hours, minutes and seconds, for translating or restyling. **Message when it is out:** shown after the release time. **Buttons:** a primary button with its link, optional different text once the release is out, and an optional secondary button such as "Watch the teaser". **Theme:** colours, fonts, corner radius, content width and the text, spacing and gap scales.

**Accessible by default**

The countdown is a labelled timer, the cover has alt text, the buttons are real links and the vinyl is decorative. Visitors who prefer reduced motion see a still record, and without JavaScript the section shows the cover, text, tracklist and buttons with placeholder dashes in the countdown.

**Part of a complete music website**

Put it right under the [Music Artist Hero](/website-section-templates/music-hero/) and follow it with the [Audio Player & Track List](/website-section-templates/audio-player/) so fans can pre-save and listen in one scroll. It is part of the [Music Artist & Band Website](/website-builder/templates/music/) template.

**Getting the most from it**

Use a square cover of at least 1200 by 1200 pixels, set the release time to the hour the song is actually available in your time zone, and write the primary button for each stage: "Pre-save the album" before and "Listen now" after. Add the tracklist as soon as it is public, because the song titles are real text that fans search for.`,
    },
    features: [
      'Large cover art in front of a slowly spinning vinyl',
      'Live countdown in days, hours, minutes and seconds',
      'Switches to "Out now" automatically at release time',
      'Primary button text can change after release',
      'Optional numbered tracklist, one track per line',
      'Primary and secondary buttons with links',
      'Editable countdown labels and messages',
      'Reduced motion supported; export HTML, React or Vue',
    ],
    why: [
      { icon: '⏳', title: 'Builds anticipation', desc: 'A ticking countdown gives fans a reason to come back and a reason to pre-save today.' },
      { icon: '🤖', title: 'Runs by itself', desc: 'At the release time the section changes its message and button, so launch day needs no page edit.' },
      { icon: '🎶', title: 'Songs as real text', desc: 'The tracklist and blurb are text on the page, so search engines can find the album and its song titles.' },
    ],
    useCases: [
      { icon: '💿', title: 'Album launches', desc: 'Count down to an album, with the cover, the tracklist and a pre-save button, then turn the same section into a listen-now page on release day.' },
      { icon: '🎬', title: 'Music video premieres', desc: 'Announce a video premiere with a countdown, a teaser button and the release time, and switch to a watch-now message when it goes live.' },
      { icon: '🎟', title: 'Presales and drops', desc: 'Use the countdown for a ticket presale, a merch drop or a limited vinyl run, with the primary button set to the shop link.' },
      { icon: '📻', title: 'Podcast and show premieres', desc: 'Count down to the first episode of a new show with the cover art, an episode list and subscribe buttons ready for the day.' },
    ],
    faqs: [
      { q: 'What happens when the countdown reaches zero?', a: 'The countdown hides, your out-now message appears and the primary button changes to the text you set for after release, such as Listen now. This happens in the visitor’s browser without reloading the page.' },
      { q: 'Which time zone does the date use?', a: 'The date and time are read in each visitor’s own time zone, so 18:00 means 18:00 for them. If your release is at a fixed moment worldwide, convert it to a local time that matches, or use a time that is the same for your main audience.' },
      { q: 'Can I show the album without a countdown?', a: 'Yes. Switch the countdown off and the section becomes a plain feature of the cover, text, tracklist and buttons, which is perfect for albums that are already out.' },
      { q: 'Does the vinyl spin forever?', a: 'It spins slowly while the section is on the page. Visitors who set reduced motion in their system see a still record instead, while the countdown itself keeps running.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the section: add an email capture for pre-save reminders, a share button or a teaser audio snippet that plays when you click the cover.',
      prompt: `Create a new release spotlight section in HTML, CSS and vanilla JavaScript.

- A two-column layout: on the left a square album cover with a vinyl disc behind it that peeks out to the right and spins slowly (radial and repeating-radial gradients, rotate animation, disabled with prefers-reduced-motion); on the right an eyebrow, a large uppercase title, a blurb, a countdown, a two-column numbered tracklist and two buttons.
- The countdown reads a data-at date (local time) and shows days, hours, minutes and seconds with tabular numbers, updating every second.
- When the time passes, hide the countdown, show an "Out now" message and change the primary button text.
- Stack to one column on small screens; theme colours as CSS custom properties.`,
    },
  },

  'streaming-links': {
    keywords: ['streaming links section', 'spotify apple music buttons html', 'listen on buttons', 'music link in bio template', 'bandcamp youtube links section', 'platform buttons for musicians'],
    about: {
      title: 'Streaming Links Bar — Free Listen-On Buttons Section',
      description: `**Streaming Links Bar** is a clear row of "Listen on" buttons for the places your music lives: Spotify, Apple Music, YouTube, Bandcamp, SoundCloud or anywhere else. Each button has a small label, the platform name and an arrow that turns when you hover, and the buttons wrap neatly on phones.

**One job, done clearly**

Fans arrive wanting one thing: to hear the music on their own service. Big, evenly sized buttons with the platform name spelled out make that choice effortless, and because each button is a plain link, it works everywhere, even where scripts are blocked.

**Every setting and option**

**Heading group:** eyebrow, heading with brand-coloured words and intro text, which you can switch off if you want only the buttons. **Platforms (1 to 8):** each has a small label (Listen on, Watch on, Buy on, Follow on), the platform name and its link. **Layout:** the buttons share the width equally, lift on hover and show a visible focus ring for keyboard users. **Theme:** colours, fonts, corner radius, content width and the text, spacing and gap scales.

**Use it anywhere**

Place it under a hero, between sections, above a footer or alone on a "links" page for your social profiles. It is plain HTML and CSS with no scripts, so it adds almost nothing to the page weight.

**Part of a complete music website**

Use it under the [Music Artist Hero](/website-section-templates/music-hero/), after the [Discography Grid](/website-section-templates/discography/), or on a page of its own. It is part of the [Music Artist & Band Website](/website-builder/templates/music/) template, and every button is a plain link, so search engines can follow each one and see which platforms carry your music.

**Getting the most from it**

Link to the exact release or profile page, not to the platform home page, and keep the same order everywhere on your site so fans know where to look. Use the small label to say what the platform is for: "Watch on YouTube", "Buy on Bandcamp". If you have many platforms, show the three most used here and link the rest from the footer.`,
    },
    features: [
      'Big "Listen on" buttons with the platform name',
      'Small label per button: Listen, Watch, Buy or Follow',
      '1 to 8 platforms with their own links',
      'Arrow that turns and a lift on hover',
      'Visible keyboard focus on every button',
      'Equal-width responsive layout that wraps on phones',
      'Optional heading with brand-coloured words',
      'Plain HTML and CSS; export HTML, React or Vue',
    ],
    why: [
      { icon: '🎯', title: 'One clear next step', desc: 'Fans pick their own service in one tap, which is the action you want from a music page.' },
      { icon: '🧩', title: 'Reusable anywhere', desc: 'It works under a hero, in the middle of a page, or alone on a links page for social profiles.' },
      { icon: '⚡', title: 'No scripts', desc: 'Pure HTML and CSS, so it loads instantly and works even where JavaScript is blocked.' },
    ],
    useCases: [
      { icon: '🎧', title: 'Under the hero', desc: 'Place a row of Spotify, Apple Music and YouTube buttons right below your hero, so fans can start listening before they scroll any further.' },
      { icon: '🔗', title: 'A links page for social profiles', desc: 'Build a simple "link in bio" page with your platforms as large, tappable buttons that are easy to hit on a phone.' },
      { icon: '🎙️', title: 'Podcast and radio shows', desc: 'List the apps where your show is available, with Watch on YouTube, Listen on Apple Podcasts and a button for the RSS feed.' },
      { icon: '🏷️', title: 'Labels and releases', desc: 'Give each release its own page with a strip of platform buttons, so every campaign link goes to one clear, branded place.' },
    ],
    faqs: [
      { q: 'Can I add platforms that are not listed?', a: 'Yes. Every button has its own name, small label and link, so you can add Tidal, Deezer, Amazon Music, Beatport, Patreon or any other service.' },
      { q: 'Does it include the platform logos?', a: 'The buttons use the platform name in text with an arrow, which is faster and avoids trademark artwork. If you want logos, you can add images in the My Code editor after export.' },
      { q: 'How many buttons can I add?', a: 'Up to eight. Four or five fit nicely in one row on a laptop and wrap to two columns on a phone. If you have more services, show the most popular ones here and link the rest from your footer or a links page.' },
      { q: 'Is it accessible?', a: 'Yes. Each button is a real link with readable text, a visible focus ring and enough size for touch, and the arrow is decorative. Screen readers read the small label and the platform name together, such as Listen on Spotify.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the bar: add brand-coloured icons for each platform, remember the visitor’s preferred service or open the app directly on mobile.',
      prompt: `Create a streaming links section in HTML and CSS.

- An optional heading (eyebrow, h2, intro) and a grid of links with grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)).
- Each link is a card with a small uppercase label ("Listen on"), the platform name in the heading font and a circular arrow on the right.
- On hover or focus: lift the card 4px, highlight the border in the accent colour and rotate the arrow 45 degrees.
- Visible focus ring; theme colours as CSS custom properties; no JavaScript.`,
    },
  },
};

export const MUSIC_CATEGORY_SEO = {
  music: {
    title: 'Music Website Section Templates — Free Band & Artist HTML',
    description: 'Free music sections for band and artist websites: hero, audio player, tour dates, discography grid, release countdown and streaming links. Export HTML.',
    h1: 'Music Website Section Templates',
    keywords: ['music website sections', 'band website template sections', 'audio player section html', 'tour dates section template', 'discography grid template', 'album release countdown'],
    intro: `A band website needs a few sections that general landing-page kits do not have. These templates cover them: a place to hear the music, somewhere to buy tickets, your whole catalogue and a countdown to what comes next.

The **[Music Artist Hero](/website-section-templates/music-hero/)** opens with a stage photo, a huge name and listen buttons. The **[Audio Player & Track List](/website-section-templates/audio-player/)** plays MP3 or WAV previews with plain HTML audio. **[Tour Dates & Tickets](/website-section-templates/tour-dates/)** lists shows with status and ticket buttons and adds Event structured data. The **[Discography Grid](/website-section-templates/discography/)** shows cover art with filter chips and a vinyl that slides out. The **[New Release Spotlight](/website-section-templates/release-spotlight/)** counts down to release day and switches to "Out now" by itself, and the **[Streaming Links Bar](/website-section-templates/streaming-links/)** gives fans big buttons for every platform.

Every section is editable in the browser, shares one theme with the rest of the library and exports as HTML, a ZIP, React, Vue or Next.js. Combine them with the [3D Scroll Carousel](/website-section-templates/scroll-ring/) for an album showcase, or start from the complete [Music Artist & Band Website](/website-builder/templates/music/) template.`,
    faqs: [
      { q: 'Can I play audio on my band website without a plugin?', a: 'Yes. The Audio Player section uses the browser’s built-in audio element, so you only paste links to MP3 or WAV files. There is no plugin, account or tracking.' },
      { q: 'Will search engines understand my tour dates?', a: 'Yes. Add the date of each show in the Tour Dates section and it writes Event structured data with the venue, city, date and ticket link, which helps your concerts appear in search.' },
      { q: 'Can I use these for DJs, producers and labels too?', a: 'Yes. Every label is editable, so the sections work for DJs, producers, orchestras, labels and podcasts as well as bands. Rename the types, status words and button text to match your own scene.' },
    ],
  },
};
