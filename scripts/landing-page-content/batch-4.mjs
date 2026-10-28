// Hand-written SEO content for the landing-page snippets (batch 4: the Music template).
// `roles` is one phrase per section, in the same order as the template's `sections` list.
export const BATCH_4 = {
  music: {
    title: 'Band Website HTML Template — Free Music Artist Page',
    description: `A complete band website in plain HTML, CSS and JS: stage hero, release countdown, audio player, tour dates, discography and merch. Edit it live, then export it.`,
    headline: 'Anatomy of a Band Website: Why Each Section Sits Where It Does',
    about: `A band website has three jobs: get people to press play, get them to a show and get them on your list. This page is ordered around those jobs. The stage hero names the band and offers the music and the tour in two buttons, the [New Release Spotlight](/website-section-templates/release-spotlight/) counts down to the album, and the [Audio Player](/website-section-templates/audio-player/) lets a visitor hear the new songs without leaving the page, because a song heard is worth ten described.

Tour dates come next because that is the second thing a fan looks for, and they are a list with a clear status (Tickets, Few left, Sold out) rather than a poster image, so search engines can read them. The [Discography Grid](/website-section-templates/discography/) follows for the visitor who wants the back catalogue, then a live video and a photo gallery for atmosphere, press quotes for proof, merch for the fans who want something physical, and a booking and press form for promoters and journalists. A newsletter closes the page so the people who do not buy today can still hear about the next release.

To make it yours, keep the order and replace the content: use a stage photo with space on the left for the hero, write the release date and time into the countdown, paste links to your own MP3 previews into the player and add the date of every show so the tour list can describe itself to search engines. This is the same page as the [Music Artist & Band website template](/website-builder/templates/music/), which also opens as a six-page site with Music, Tour, Videos, Merch, About and Contact pages.`,
    roles: [
      'a floating bar that keeps "Listen now" one click away while the visitor scrolls the whole page',
      'a stage photo, the band name in huge type and two buttons, one for the music and one for the tour',
      'a countdown to the new album that turns into "Out now" by itself on release day',
      'the fastest way to convince a visitor: press play on the new songs right on the page',
      'a calendar-style list of shows with colour-coded status and ticket buttons, readable by search engines',
      'the back catalogue as cover art with filter chips, for visitors who want older records',
      'a live session poster frame that adds atmosphere and shows the band at work',
      'photos from stage, studio and crowd, filterable by category',
      'press quotes that carry proof from outside the band',
      'vinyl, cassettes and posters for the fans who want something physical',
      'a booking and press form so promoters, journalists and licensing enquiries have a clear route',
      'a newsletter sign-up so visitors who do not buy today still hear about the next release',
      'a minimal footer with links to every section and the social profiles',
    ],
    steps: [
      { title: 'Set the release and the shows', text: 'Type your release date and time into the New Release Spotlight, then add every show to the tour list with its city, venue, status and ticket link. Add each show\'s date in year-month-day form so the list can describe itself to search engines.' },
      { title: 'Add your own songs', text: 'Paste a link to an MP3 or WAV preview for each track in the Audio Player, add the cover art, and put your Spotify or Bandcamp link in the stream field so a good preview leads straight to the full song.' },
      { title: 'Swap in your photos and links', text: 'Replace the stage photo, covers, gallery pictures and press quotes with your own, and point the booking form at your own email or form service. Check that every image has a short description for screen readers.' },
    ],
    useCases: [
      { icon: 'WEB', title: 'Give a band a home that is yours', desc: 'Host a website you control, with your music, shows and merch in one place, instead of depending on a social profile that can change its rules overnight.' },
      { icon: 'DESIGN', title: 'Launch an album or single', desc: 'Use the countdown, the audio player and the pre-save button as a launch page, then let the same page switch to "Out now" on release day without any edits.' },
      { icon: 'LEARN', title: 'Study a media-rich page built in plain code', desc: 'Read how a custom audio player uses the browser\'s own audio element, how filter chips are built from the data, and how a countdown switches states with a few lines of JavaScript.' },
    ],
    faqs: [
      { q: 'How do I add my own songs to the audio player?', a: 'Paste a direct link to an MP3 or WAV file into each track. Short previews of 30 to 60 seconds load fastest, and each track can carry a stream or buy link so the full song is one click away.' },
      { q: 'Does the countdown change on release day without me editing the page?', a: 'Yes. When the release time passes, the countdown hides, an "Out now" message appears and the main button changes to "Listen now", in each visitor\'s browser, with no reload.' },
      { q: 'Can I use this page for a DJ, producer or label?', a: 'Yes. Change the names, photos and links: a DJ can use the tour list as a booking calendar, and a label can use the discography grid as a roster, with the artist name as the type for the filter chips.' },
    ],
  },
};
