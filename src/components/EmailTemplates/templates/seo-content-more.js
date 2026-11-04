/* Hand-written SEO content for the templates added on 2026-11-03, merged into EMAIL_SEO by
   seo-content.js. Same rules as the rest: written for that one template, use cases 4 x 18-42
   words, FAQ answers 25-70 words, no filler. */

export const EMAIL_SEO_MORE = {
  'booking-confirmation': {
    keywords: ['booking confirmation email template', 'reservation confirmation email', 'appointment confirmation email template', 'add to calendar email', 'spa booking email template'],
    about: {
      title: 'Booking Confirmation Email — Free Reservation Confirmation Template',
      description: `**Booking Confirmation Email** is the message a customer gets in the minute after they press "Book". At that moment they want three things: proof that the slot is really theirs, the details in one glance, and a way to get it into their calendar before they forget. This template is built around exactly that, for spas, salons, fitness studios, classes, tours, restaurants and any business that takes bookings online.

**A date tile people recognise**

The booking sits in a ticket-style card. On the left is a calendar tile with the month in your brand colour, the day in large type and the weekday underneath; on the right are the service, time, who it is with or how many guests, the address and a directions link. Below a dashed tear line sit the booking reference in monospace (easy to read out over the phone) and what was paid: a deposit, the full amount or what is still due on the day. On phones the tile sits above the details.

**Add to calendar, three ways**

Most no-shows start with a booking that never made it into a calendar. The template has three small outlined buttons, Google, Outlook and Apple (.ics), and you can leave any of them empty to hide it. A Google "TEMPLATE" link and an Outlook "compose" link open a pre-filled event; a hosted .ics file covers Apple Calendar and most desktop apps.

**What to bring, and the cancellation deadline**

An optional "Before you arrive" list covers the questions people would otherwise phone about: when to arrive, what is provided, what to tell you. The footer line states the free-cancellation deadline as a date and time, not "24 hours before", so nobody has to do the maths.

**Send it from your booking tool**

Paste the HTML into Postmark, SendGrid, Resend or Amazon SES, or into the custom-email field of a booking platform, and replace the sample values with its variables. It is transactional, so it carries no unsubscribe link. Pair it with the [Appointment Reminder](/email-templates/appointment-reminder/) a day before the visit, and use [Booking Rescheduled](/email-templates/booking-rescheduled/) when the time changes.`,
    },
    features: [
      'Ticket-style card with a month / day / weekday date tile',
      'Service, time, guests or provider and address beside the tile',
      'Directions link for Google Maps or Apple Maps',
      'Booking reference in monospace and a deposit / amount-due line',
      'Google, Outlook and Apple (.ics) add-to-calendar buttons, each optional',
      'Bulletproof "Manage booking" button for Outlook and every other client',
      'Optional "Before you arrive" checklist',
      'Free-cancellation deadline written as an exact date and time',
      'Date tile stacks above the details on phones',
      'Light and dark palettes and a plain-text version with every link',
    ],
    why: [
      { icon: '📅', title: 'Into the calendar, not the inbox', desc: 'Three one-tap calendar buttons get the booking into the place people actually check, which is where no-shows are prevented.' },
      { icon: '🎟', title: 'Reads like a ticket', desc: 'The date tile and tear-line card are recognisable at a glance, so customers find the time and reference again in seconds.' },
      { icon: '💬', title: 'Fewer "just checking" calls', desc: 'Arrival tips, the deposit line and an exact cancellation deadline answer the questions people would otherwise ring about.' },
    ],
    useCases: [
      { icon: '💆', title: 'Spa, salon and wellness bookings', desc: 'Confirm a massage or haircut with the therapist’s name, the deposit taken, what is provided on arrival and the exact time free cancellation ends.' },
      { icon: '🧘', title: 'Classes and workshops', desc: 'Confirm a yoga class, pottery workshop or cooking lesson with the studio address, how many places were booked and what to wear or bring.' },
      { icon: '🍽', title: 'Restaurant and table reservations', desc: 'Show the party size, table time and booking reference, with a directions link and a note about the deposit for larger groups.' },
      { icon: '🗺', title: 'Tours, rentals and activities', desc: 'Confirm a walking tour, kayak rental or escape room with the meeting point, start time, add-to-calendar links and what to bring on the day.' },
    ],
    faqs: [
      { q: 'What should a booking confirmation email include?', a: 'The service, date, time, location and who it is with, a booking reference, what was paid or is still due, a way to manage or cancel, add-to-calendar links and the cancellation policy. Send it within a minute of the booking so the customer knows it worked.' },
      { q: 'How do the add-to-calendar buttons work?', a: 'Each is a plain link. Google uses a calendar.google.com "action=TEMPLATE" link with the title and times, Outlook uses an outlook.live.com compose link, and Apple uses a hosted .ics file. Generate the links per booking in your booking tool or code, or leave a field empty to hide that button.' },
      { q: 'How is this different from the appointment reminder?', a: 'This one is sent straight after booking and confirms the reservation, payment and reference. The Appointment Reminder goes out a day or two before the visit and asks the customer to confirm, reschedule or cancel. Most businesses send both.' },
      { q: 'Can I hide the deposit line or the checklist?', a: 'Yes. Leave the "Paid / deposit" field empty to remove that line, and switch off "What to bring" to drop the checklist. The booking card, button and cancellation note adjust on their own.' },
      { q: 'Does a booking confirmation need an unsubscribe link?', a: 'No. It confirms a transaction the customer started, so under US CAN-SPAM it is transactional. Keep promotions out of it so it stays that way, and include your business name and address, which the footer already has.' },
    ],
  },

  'booking-rescheduled': {
    keywords: ['reschedule email template', 'appointment rescheduled email', 'booking change email template', 'appointment time change email', 'reschedule notification email'],
    about: {
      title: 'Booking Rescheduled Email — Free Appointment Change Notice Template',
      description: `**Booking Rescheduled Email** tells someone their appointment has moved, and makes it impossible to turn up at the old time. Change notices fail when the new time is buried in a paragraph, or when the old and new times look the same. This template puts the two side by side, with the old one crossed out, and lets the customer accept or change the new slot in one tap.

**Was and now, one above the other**

The heart of the email is a two-part card. The top half is grey with a "Was" pill and the old date and time struck through; the bottom half is filled with your brand colour, with a "Now" pill, the new date and time in large type and the length of the appointment. Even someone who only glances at a phone notification sees the right time.

**Say who changed it, and why**

A short line under the card explains the change: who made it (your team, the provider or the customer) and the reason. An honest reason, such as a practitioner on a training course, does more for trust than a vague "due to unforeseen circumstances".

**One button, two quiet links**

"Keep the new time" is the main button, so confirming takes one tap and you know the slot is safe. Next to it sit "Pick another time" for anyone the new slot does not suit, and "Update my calendar", which should point to an .ics file with the same event UID so most calendars replace the old entry instead of adding a second one.

**Everything else stays the same**

An optional details box repeats the service, provider, location and booking reference under the heading "Everything else stays the same", which answers the follow-up question before it is asked. Copy the HTML into your booking system or transactional sender; it needs no unsubscribe link. Send the original with the [Booking Confirmation](/email-templates/booking-confirmation/) template and the day-before nudge with the [Appointment Reminder](/email-templates/appointment-reminder/).`,
    },
    features: [
      'Was / Now card: old time struck through, new time on your brand colour',
      'Appointment length shown under the new time',
      'Who changed the booking and why, in one line',
      'Bulletproof "Keep the new time" button',
      '"Pick another time" and "Update my calendar" links, each optional',
      'Optional "Everything else stays the same" details box',
      'Booking reference repeated for phone and desk look-ups',
      'Closing note for fees and how to reach a person',
      'Light and dark palettes, both editable',
      'Plain-text version that marks the old time as cancelled',
    ],
    why: [
      { icon: '🔁', title: 'Nobody turns up at the old time', desc: 'The crossed-out old slot and the filled new one make the change obvious even in a two-second glance at a notification.' },
      { icon: '✅', title: 'You know the slot is safe', desc: 'A single "Keep the new time" tap confirms the change, so you are not left guessing whether the customer saw it.' },
      { icon: '🤝', title: 'A change that keeps trust', desc: 'Saying who moved it and why, and repeating what stays the same, turns an annoying change into a well-handled one.' },
    ],
    useCases: [
      { icon: '🩺', title: 'Clinics and therapists moving appointments', desc: 'When a physio, dentist or counsellor is unavailable, show the old and new times, the reason and an easy way to pick a different slot.' },
      { icon: '📞', title: 'Sales calls and consultations', desc: 'Let prospects know a demo or discovery call has moved, with a one-tap confirm and a link back to your scheduling page if it no longer suits.' },
      { icon: '🔧', title: 'Home services and installations', desc: 'Tell customers a plumber, cleaner or installer will come on a different day, with the arrival window and an option to choose another date.' },
      { icon: '🙋', title: 'Confirming a customer’s own change', desc: 'When the customer reschedules online, send the same email with "Changed by you" so they have a clean record of the new time.' },
    ],
    faqs: [
      { q: 'What should a reschedule email say?', a: 'The old time and the new time, clearly distinguished, who made the change and why, what stays the same (service, provider, location), a way to confirm the new slot and a way to choose another. Apologise briefly if you made the change.' },
      { q: 'How do I stop the old event staying in their calendar?', a: 'Link "Update my calendar" to an .ics file that uses the same UID as the original booking with a higher SEQUENCE number. Most calendar apps then update the existing event rather than adding a duplicate.' },
      { q: 'Can I use it for a cancellation instead?', a: 'It is designed for a new time. For a cancellation, rewrite the headline, clear the new-time fields so only the struck-through old time remains, and change the button to "Book a new time". A dedicated cancellation template is on our list.' },
      { q: 'Should the customer have to confirm the new time?', a: 'It helps. A confirm button tells you the customer has seen the change and still plans to come, which reduces no-shows. If no one confirms within a day, follow up with a call or a reminder.' },
      { q: 'Is a reschedule email transactional?', a: 'Yes. It updates a booking the customer already made, so it does not need an unsubscribe link under US CAN-SPAM. Keep it free of promotions and send it from the same address as your booking confirmations.' },
    ],
  },

  'team-invitation': {
    keywords: ['team invitation email template', 'workspace invite email', 'invite user email template', 'saas invite email', 'join team email template'],
    about: {
      title: 'Team Invitation Email — Free Workspace Invite Template for SaaS',
      description: `**Team Invitation Email** is sent when someone adds a colleague to a workspace in your product. It is often the very first email that person has ever had from you, and it arrives with an obvious question attached: who sent this, and is it safe to click? A good invite answers that before the button, and it is one of the cheapest growth loops a B2B product has.

**The person comes first, then the product**

The email opens with the inviter: an initials avatar in your brand colour, their name and their email address. People accept invitations from colleagues, not from software, so the headline is written the same way: "Maya invited you to join Northwind Studio". An optional personal message is shown as a quote with a brand-coloured rule, so a short "jump in when you can" from Maya does more than any marketing copy.

**A workspace card that shows what they are joining**

Below the message, a card shows the workspace's initials tile, its name and address, the role they are being given as a pill (Editor, Viewer, Admin) and one line on what that role can do. A row of teammate initials, with "+9 more already here", proves the space is real and active. Initials are drawn as coloured table cells rather than images, so they show even when images are blocked.

**Accept, expiry and a safety net**

"Accept invitation" is a bulletproof button, followed by when the link expires and a fallback link to paste into a browser. The last paragraph tells anyone who was not expecting the email that nothing happens unless they accept, and where to forward it if it looks suspicious.

**Built for transactional senders**

Send it from your app through Postmark, Resend, SendGrid or Amazon SES with the inviter, workspace and token filled in. It is a transactional message, so it needs no unsubscribe link. Once they join, follow up with the [Welcome Email](/email-templates/welcome/) and the [Getting Started Checklist](/email-templates/getting-started-checklist/).`,
    },
    features: [
      'Inviter shown first: initials avatar, name and email address',
      'Headline written as a person, not a product',
      'Optional personal message shown as a quote',
      'Workspace card with initials tile, name, address and role pill',
      'One-line description of what the role can do',
      'Up to four teammate initials and a "+N more" count',
      'Bulletproof "Accept invitation" button with expiry note',
      'Fallback link and a "not expecting this?" safety note',
      'Avatars built from table cells, so they show with images off',
      'Light and dark palettes and a plain-text version',
    ],
    why: [
      { icon: '🙋', title: 'Trust before the click', desc: 'Leading with a real colleague’s name and email answers "is this safe?" and lifts acceptance compared with a generic product invite.' },
      { icon: '👥', title: 'Shows a living team', desc: 'Teammate avatars and a "+9 more" line make the workspace feel active, which is a strong reason to join today.' },
      { icon: '🔒', title: 'Safe to ignore', desc: 'The expiry and the "nothing happens unless you accept" note protect people who received an invite by mistake.' },
    ],
    useCases: [
      { icon: '🗂', title: 'Project and design tools', desc: 'Invite a designer or freelancer to a project space with their role, a short note from the project lead and the people already working there.' },
      { icon: '💼', title: 'B2B SaaS seats', desc: 'When an admin adds a colleague to a paid plan, show the company workspace, the seat’s permission level and who set it up.' },
      { icon: '📚', title: 'Shared documents and knowledge bases', desc: 'Invite someone to a wiki, notebook or shared drive with a personal message pointing them to the page they should read first.' },
      { icon: '🏫', title: 'Classrooms and communities', desc: 'Invite students to a class or members to a community space, with the teacher or host shown first and the invite expiry clearly stated.' },
    ],
    faqs: [
      { q: 'What makes a good team invitation email?', a: 'The inviter’s name in the subject line and at the top, the workspace and role, a short personal note if there is one, one clear accept button, when the link expires and a reassurance for anyone who was not expecting it.' },
      { q: 'Should the subject line use the inviter’s name?', a: 'Yes. "Maya Chen invited you to join Northwind Studio on Acme" is opened and trusted far more than "You have been invited to Acme". Many products also set the sender name to "Maya Chen via Acme".' },
      { q: 'How long should an invite link last?', a: 'Seven days is common for workspace invites. Long enough for someone on holiday, short enough that an old forwarded email cannot be used months later. Let admins resend an expired invite from the members page.' },
      { q: 'Why are the avatars initials instead of photos?', a: 'Initials in coloured cells always render, even when images are blocked, and never show a broken image or a stranger’s old photo. If you have profile photos, add them through an extra Image section or replace the cells in the HTML.' },
      { q: 'Is an invitation email transactional?', a: 'Generally yes: it is triggered by a user action and gives access to an account. Avoid adding promotions. Some teams still add a short line for recipients to block future invites, which is good practice.' },
    ],
  },

  'getting-started-checklist': {
    keywords: ['onboarding checklist email', 'getting started email template', 'onboarding email template', 'user activation email', 'saas onboarding email sequence'],
    about: {
      title: 'Getting Started Checklist Email — Free Onboarding Progress Template',
      description: `**Getting Started Checklist Email** is the onboarding email that sits between the welcome and the trial-ending reminder, when a new user has started setting up but stopped halfway. Instead of another generic "here are some tips", it shows them exactly where they are, how little is left and what to do next, which is the most reliable way to move people from signed-up to activated.

**A progress bar that does the motivating**

The top of the email states the goal in a line ("Teams who finish these five steps book twice as many meetings"), then shows a progress bar with the count and percentage: "2 of 5 done · 40%". People are far more likely to finish something they have already started, and the bar makes that visible.

**Done, next and later, each looking different**

Up to five steps sit below. Finished steps get a green tick and are struck through. The next step is lifted into its own bordered card with an "Up next · 3 min" label, a one-line explanation and its own button, so the email has exactly one obvious action. The remaining steps are listed with the time each takes and a link, for people who prefer to jump ahead. When every step is done, the list shows an "All done" line instead.

**Driven by one number**

Set "Steps already done" from your product data for each person, and the bar, ticks and highlighted card all follow. That makes it easy to send from an automation in Customer.io, Loops, Intercom, Braze or your own code, with the step count as a property.

**A real person at the end**

An optional tip box signs off from a named person on the team and offers a reply or a setup call, the safety net for anyone who is stuck rather than busy. Because it encourages product use, treat it as marketing and keep the unsubscribe link in the footer. Send it after the [Welcome Email](/email-templates/welcome/) and before the [Trial Ending](/email-templates/trial-ending/) reminder.`,
    },
    features: [
      'Progress bar with "X of Y done" and a percentage',
      'Up to five steps with title, description, time and link',
      'Finished steps ticked in green and struck through',
      'Next step highlighted in its own card with its own button',
      'Remaining steps listed with how long each takes',
      'One "steps done" number drives the whole layout',
      '"All done" message when every step is finished',
      'Optional tip from a named teammate with a setup-call link',
      'Unsubscribe and preferences links for lifecycle sends',
      'Light and dark palettes and a plain-text [x] / [ ] checklist',
    ],
    why: [
      { icon: '📈', title: 'Progress pulls people forward', desc: 'Seeing "2 of 5 done" makes finishing feel close, which gets more users to the moment your product proves its value.' },
      { icon: '👉', title: 'One clear next action', desc: 'Only the next step gets a button, so the email asks for one small, specific thing instead of offering five choices.' },
      { icon: '🧑‍💻', title: 'Personal at any scale', desc: 'A single number from your product data personalises the whole email, so every user sees their own checklist.' },
    ],
    useCases: [
      { icon: '📅', title: 'Scheduling and productivity apps', desc: 'Show which setup steps a new user has finished, such as hours and calendar connection, and highlight the next one with how long it takes.' },
      { icon: '🛒', title: 'Store and website builders', desc: 'Walk a new merchant from adding a product to choosing a theme, connecting payments and publishing, with the next task one click away.' },
      { icon: '📊', title: 'Analytics and developer tools', desc: 'Nudge users to install the snippet, verify the domain and invite a teammate, ticking off each step as your product records it.' },
      { icon: '🎓', title: 'Courses and learning platforms', desc: 'Show a learner’s progress through the first module with the next lesson highlighted and a tutor’s note offering help if they are stuck.' },
    ],
    faqs: [
      { q: 'When should I send an onboarding checklist email?', a: 'A day or two after sign-up for users who have started but not finished setup, and again a few days later if they are still stuck. Stop sending it as soon as all steps are done, and skip it for users who finished on day one.' },
      { q: 'How do I show each user’s own progress?', a: 'Set the "Steps already done" field to a merge variable from your platform, such as a completed-steps count on the user profile. The progress bar, ticks and the highlighted next step all follow that one number.' },
      { q: 'What if users complete steps in a different order?', a: 'The template assumes steps are done in order, which suits most setup flows. If yours are independent, order the steps by importance and count only the leading completed ones, or build a version per stage in your email tool.' },
      { q: 'Is an onboarding email marketing or transactional?', a: 'Because it encourages people to use your product rather than confirming a transaction, it is usually treated as marketing. Keep the unsubscribe and preferences links in the footer, which this template includes.' },
      { q: 'How many steps should the checklist have?', a: 'Three to five. Fewer feels trivial, more feels like work. Pick the actions that best predict long-term use, write each as a short verb phrase and give an honest time estimate.' },
    ],
  },

  'one-time-code': {
    keywords: ['otp email template', '2fa email template', 'verification code email template', 'one time password email', 'login code email template'],
    about: {
      title: 'One-Time Passcode (OTP) Email — Free 2FA Verification Code Template',
      description: `**One-Time Passcode (2FA) Email** delivers a short code for two-factor sign-in, approving a payment, confirming a withdrawal or changing an email address. It has one job: get the right digits in front of the right person quickly, and make it as hard as possible for anyone to talk them out of it.

**Each digit in its own box**

The code is shown character by character in separate boxes, set in a monospace font so a zero never looks like an O, with a small gap in the middle of six- and eight-digit codes, the way people read them aloud ("739 204"). On phones the boxes shrink so up to eight characters still fit on one line. If you put a merge variable such as \`{{ code }}\` in the field, it is kept whole in one box instead.

**Purpose first, and in the subject**

A pill above the headline says what the code is for, such as "Sign-in verification" or "Approve payment". The sample subject starts with the code itself ("739 204 is your Ledgerly verification code"), which lets people read it straight from the notification and lets iOS and Android suggest it as a one-tap autofill.

**Short expiry and a clear warning**

A line under the code states how long it lasts and that it works once. An amber box then says, in bold, that your company will never ask for the code by phone, chat or email, which targets the most common way 2FA codes are stolen: a scammer pretending to be support.

**Where the request came from**

An optional details box lists the device, approximate location, IP address and time, so a person who did not ask for a code knows something is wrong. A "Wasn't you? Secure your account" link sits below. There is no button to click for the code itself, deliberately.

Send it from your auth provider or code (Auth0, Clerk, Supabase, Firebase, Cognito or a custom flow) through a fast transactional sender. For link-based sign-in use [Magic Link](/email-templates/magic-link/), and for account confirmation after sign-up use [Verify Email](/email-templates/verify-email/).`,
    },
    features: [
      'Each character of the code in its own large, monospace box',
      'Gap in the middle of 6- and 8-digit codes for easy reading',
      'Boxes shrink on phones so eight characters fit on one line',
      'Merge variables such as {{ code }} kept whole in one box',
      'Purpose pill: sign-in, payment approval, account change',
      'Expiry and single-use note under the code',
      'Never-share warning in a highlighted box',
      'Optional request details: device, location, IP address, time',
      '"Wasn’t you?" link to secure the account, and no code button',
      'Light and dark palettes and a plain-text version with the code spaced out',
    ],
    why: [
      { icon: '🔢', title: 'Readable at a glance', desc: 'Separate monospace boxes stop people mistyping 0 and O or losing their place, so codes go in right the first time.' },
      { icon: '🛡', title: 'Harder to phish', desc: 'The never-share warning and request details help people spot a scammer asking for the code, the most common 2FA attack.' },
      { icon: '⚡', title: 'Code from the notification', desc: 'Leading the subject with the code lets people copy it from the notification or use phone autofill without opening the email.' },
    ],
    useCases: [
      { icon: '🔐', title: 'Two-factor sign-in', desc: 'Send a six-digit code when someone signs in from a new device, with the browser, location and time so they can tell if it was really them.' },
      { icon: '💳', title: 'Approving payments and transfers', desc: 'Ask a fintech or banking customer to confirm a payment or payout with a short code, labelled with the amount and payee in the purpose line.' },
      { icon: '✉️', title: 'Changing an email or password', desc: 'Confirm sensitive account changes with a code sent to the existing address, and point to the secure-account page if they did not request it.' },
      { icon: '📱', title: 'Passwordless sign-in for apps', desc: 'Let mobile app users sign in with an email code instead of a password, with a short expiry and a clear single-use note.' },
    ],
    faqs: [
      { q: 'What should a 2FA or OTP email contain?', a: 'The code in large, easy-to-read type, what it is for, how long it lasts, a warning never to share it, details of the request (device, location, time) and a link to secure the account if it was not them. Keep marketing out.' },
      { q: 'Should the code be in the subject line?', a: 'Many services do this so people can read the code from the notification and phones can autofill it. If your security policy prefers otherwise, keep the purpose in the subject and the code only in the body.' },
      { q: 'How long should a one-time code be valid?', a: 'Five to fifteen minutes is typical for sign-in codes, and the code should work only once. Shorter is safer but frustrates people with slow email. State the exact expiry in the email so nobody tries an old code.' },
      { q: 'How do I insert the real code?', a: 'Put your sending tool’s variable in the Code field, for example {{ code }} in Postmark or Resend, or build the HTML in your backend with the digits filled in. A variable is shown whole in one box; real digits get one box each.' },
      { q: 'How is this different from the Verify Email template?', a: 'Verify Email confirms that an address belongs to a new user, with a button and an optional code. This template is for repeated security codes, such as 2FA and payment approval, with the code as the hero and no button to click.' },
    ],
  },

  'contact-form-auto-reply': {
    keywords: ['contact form auto reply email template', 'autoresponder email template', 'thank you for contacting us email', 'enquiry received email template', 'small business auto reply email'],
    about: {
      title: 'Contact Form Auto-Reply Email — Free "We Got Your Message" Template',
      description: `**Contact Form Auto-Reply Email** goes out the second someone submits the contact form on your website. Without it, a visitor who just described their project is left wondering whether the form worked, whether anyone will read it and when. Many send the message twice, ring you anyway or give up and try a competitor. One well-made automatic reply fixes all of that, and every small business website needs one.

**A promise, not a "do not reply"**

The email opens with a warm thank-you and a sentence that confirms a real person will read the message. A brand-coloured badge then makes a concrete promise, "We reply within 1 working day", next to a short reference number they can quote if they follow up.

**A copy of what they sent**

The most reassuring part is a quoted box with exactly what the visitor wrote: the topic, the message and their name and email. It proves the message arrived intact and gives them a record, which matters when they have just typed out a budget or a long description. Fill it from your form tool's field variables.

**Hours, links and an urgent line**

Two columns follow: your opening hours (up to three rows, such as weekdays, Saturday and Sunday) and "While you wait", three links to the pages people usually want next, like recent work, pricing or the areas you cover. Below a divider, an urgent line gives a phone number for anything that cannot wait, and the email signs off with a real name.

**Works with any form tool**

Paste the HTML into the autoresponder setting of WPForms, Gravity Forms, Contact Form 7, Formspree, Basin, Tally, Typeform, HubSpot forms or Jotform, or send it from your own code. It answers a request the visitor made, so it is transactional. The sample is a Bristol interior designer, but the layout works for trades, agencies, clinics and consultants. Want a landing page to put the form on? Try the [Website Builder](/website-builder/), and match the look of your other emails with the [Welcome Email](/email-templates/welcome/).`,
    },
    features: [
      'Reply-time promise in a brand-coloured badge',
      'Reference number for follow-ups, in monospace',
      'Quoted copy of the visitor’s topic, message, name and email',
      'Opening hours table with up to three rows',
      '"While you wait" column with three helpful links',
      'Hours and links side by side, stacked on phones',
      'Urgent line with a tap-to-call phone link',
      'Personal sign-off from a named person',
      'Show or hide the message copy, hours and links',
      'Light and dark palettes and a plain-text version',
    ],
    why: [
      { icon: '📨', title: 'Proof the form worked', desc: 'An instant reply with a copy of their message stops visitors re-sending it, phoning to check or assuming nobody is there.' },
      { icon: '⏱', title: 'Sets a clear expectation', desc: 'A specific reply time and opening hours turn "will anyone answer?" into a promise you can keep, which builds trust before the first call.' },
      { icon: '🧭', title: 'Useful while they wait', desc: 'Links to your work, pricing and service areas keep warm leads on your site and answer simple questions before you even reply.' },
    ],
    useCases: [
      { icon: '🛋', title: 'Designers, architects and trades', desc: 'Reply to a project enquiry with a copy of the brief, your studio hours, links to past projects and a number to call for anything urgent.' },
      { icon: '🏥', title: 'Clinics and local services', desc: 'Confirm a message to a clinic, vet or salon with reception hours and a clear note that urgent matters should be phoned through instead.' },
      { icon: '💼', title: 'Agencies and consultants', desc: 'Acknowledge a new-business enquiry with a one-working-day reply promise and links to case studies and how your pricing works.' },
      { icon: '🎟', title: 'Venues and event organisers', desc: 'Confirm booking or hire enquiries with the reference number, office hours and links to capacity, menus or a downloadable brochure.' },
    ],
    faqs: [
      { q: 'What should a contact form auto-reply say?', a: 'Thank the person, confirm the message arrived, say when they will hear back and from whom, include a copy of what they sent and a reference, and give a phone number or link for anything urgent. Keep it short and human.' },
      { q: 'How do I add the visitor’s message to the email?', a: 'Use your form plugin’s field tags in the message and topic fields, for example {field_id="3"} in WPForms, [your-message] in Contact Form 7 or {{ message }} in many form services. The template keeps the line breaks they typed.' },
      { q: 'Which form tools support a custom HTML auto-reply?', a: 'Most do: WPForms, Gravity Forms, Contact Form 7 (with an HTML mail setting), Formspree, Basin, Jotform and HubSpot forms all allow a custom confirmation email. If yours only allows plain text, use the plain-text version.' },
      { q: 'Should the auto-reply come from a no-reply address?', a: 'No. Send it from an address people can reply to, ideally the inbox that handles enquiries. Visitors often reply with extra details or attachments, and a no-reply address throws those away.' },
      { q: 'Is an auto-reply transactional or marketing?', a: 'Transactional: it responds to a message the visitor sent. It does not need an unsubscribe link, but do not add newsletter sign-ups or offers, and never add someone to a marketing list without their consent.' },
    ],
  },

  'failed-payment': {
    keywords: ['failed payment email template', 'dunning email template', 'payment declined email', 'card declined email template', 'subscription payment failed email'],
    about: {
      title: 'Failed Payment Email — Free Dunning Email Template for Subscriptions',
      description: `**Failed Payment Email** is the first message in a dunning sequence: the email you send when a subscription charge is declined. A large share of subscription churn is involuntary, customers who never meant to leave but whose card expired or was replaced. The difference between keeping and losing them is often just how clear and calm this one email is.

**Calm, specific and blame-free**

A red "Payment failed" pill sets the status without shouting. The headline is plain ("We couldn't charge your card") and the intro does three jobs in two sentences: it says what happened, explains that it usually means an expired or replaced card, and confirms that nothing has changed on the account yet. People act faster when they are not alarmed or embarrassed.

**Exactly what failed**

A red-outlined panel shows the amount due in large type, then a details box with the plan, the card that was tried, the reason in plain English (for example "The card has expired (10/26)" rather than a decline code), the date of the attempt and the invoice number. Most payment processors, including Stripe, give you a decline reason you can map to a friendly sentence.

**Update the card, or just pay now**

"Update payment method" is the main button, because a new card fixes this charge and every future one. A quieter "Pay this invoice now" link serves people who would rather pay once with a different card.

**A timeline instead of a threat**

"What happens next" lays out the automatic retry dates and the day the account would be paused, with the final date in red and a promise that projects and files are kept. Clear dates create urgency honestly, without "your account will be deleted" language. Copy it into Stripe, Chargebee, Recurly, Paddle or your own billing emails. It is transactional. For invoices that are simply due, use the [Payment Reminder](/email-templates/payment-reminder/), and after a successful charge send the [Payment Receipt](/email-templates/receipt/).`,
    },
    features: [
      'Red "Payment failed" status pill above a calm headline',
      'Amount due in large type inside a red-outlined panel',
      'Plan, card, plain-English decline reason, date and invoice number',
      'Bulletproof "Update payment method" button',
      'Optional "Pay this invoice now" link for a one-off payment',
      'Three-point "What happens next" timeline with retry and pause dates',
      'Final pause date highlighted in red',
      'Reassurance that data is kept and nothing has changed yet',
      '"Already updated?" closing note and a billing contact',
      'Light and dark palettes and a plain-text version',
    ],
    why: [
      { icon: '💳', title: 'Wins back involuntary churn', desc: 'Most failed charges are expired or replaced cards, and a clear update button recovers revenue from customers who never meant to leave.' },
      { icon: '🗓', title: 'Urgency without threats', desc: 'Real retry and pause dates give people a deadline they understand, without the alarming tone that makes billing emails feel like scams.' },
      { icon: '🧾', title: 'Fewer billing tickets', desc: 'Showing the card, reason and invoice up front answers "which card?" and "why?" before the customer has to write to support.' },
    ],
    useCases: [
      { icon: '☁️', title: 'SaaS subscription renewals', desc: 'Send it on the first declined renewal, with the plan, card and decline reason, and a timeline of retries before the workspace moves to read-only.' },
      { icon: '📦', title: 'Subscription boxes and memberships', desc: 'Explain that the next box will not ship until payment succeeds, show the retry date and link straight to updating the saved card.' },
      { icon: '⏳', title: 'Card expiring soon', desc: 'Rewrite the pill and headline as "Your card expires this month" and send it before renewal, so the payment never fails at all.' },
      { icon: '🎓', title: 'Course and coaching instalments', desc: 'When an instalment plan payment fails, show which payment it was, the amount and the date access to lessons would pause.' },
    ],
    faqs: [
      { q: 'What is a dunning email?', a: 'An email sent to recover a failed payment. A typical sequence has three or four emails: one when the charge fails, one before each retry and a final notice before the account is paused or cancelled. This template is the first and can be adapted for the rest.' },
      { q: 'What should a failed payment email include?', a: 'The amount, the plan, the card that was tried, a plain-English reason, a button to update the payment method, when you will retry and what happens if payment does not succeed. Keep the tone calm and avoid blaming the customer.' },
      { q: 'Can I use it with Stripe?', a: 'Yes. Trigger it from the invoice.payment_failed webhook, map the decline_code to a friendly sentence for the reason field, and link the button to the Stripe customer portal or your own billing page. Turn off Stripe’s own email if you send this one.' },
      { q: 'How often should I retry a failed payment?', a: 'Many businesses retry three or four times over one to three weeks, often with smart retries timed by the processor. Tell the customer the dates in the email so they know how long they have.' },
      { q: 'Is a failed payment email transactional?', a: 'Yes. It is about an existing subscription and a specific charge, so it does not need an unsubscribe link under US CAN-SPAM. Keep it free of promotions and send it from your billing address.' },
    ],
  },

  'order-delivered': {
    keywords: ['order delivered email template', 'delivery confirmation email template', 'package delivered email', 'post purchase email template', 'shopify delivered email'],
    about: {
      title: 'Order Delivered Email — Free Delivery Confirmation Template for Stores',
      description: `**Order Delivered Email** closes the loop that the order and shipping confirmations open. Most store emails stop at "your order has shipped", but the moment the parcel arrives is when customers are happiest, when a missing parcel needs reporting quickly, and the best time to ask how the products feel in real life.

**Proof it arrived, and where**

A check badge, a "Delivered" label and a friendly headline sit above a tracking bar with all four steps complete, so it matches the look of the [Shipping Confirmation](/email-templates/shipping-confirmation/) that came before. Below it, a soft panel shows when it was delivered and exactly where it was left ("Front porch, by the bench"), with the order number and carrier. That one "left at" line saves a lot of "I can't find my parcel" emails.

**Every item, with a review link**

Each item gets a row with its product photo, name and variant, and five gold stars beside a "Write a review" link of its own. Asking per product, with the photo in front of the customer, gets more specific and more useful reviews than one generic "rate your order" request. Photos are 64 px squares; paste hosted URLs or upload your own.

**Room for something going wrong**

A dashed "Can't find it, or something's not right?" box explains what to check first, how long they have to report a missing or damaged parcel and links to your issue form. Handling problems gracefully in the same email is better than hoping they don't happen.

**A care tip to finish**

The closing line is space for a short care or getting-started tip, such as washing instructions or how to brew with the new pour-over, which makes the product better and the email feel personal.

Trigger it from your carrier's delivered event via Shopify Flow, Klaviyo, AfterShip, Route or your own webhook. It is mostly transactional; if you add promotions, include an unsubscribe link. Follow up later with a [Review Request](/email-templates/review-request/) for anyone who hasn't reviewed.`,
    },
    features: [
      'Check badge, "Delivered" label and a four-step tracking bar, all complete',
      'Delivered date and time, plus exactly where the parcel was left',
      'Order number and carrier line',
      'Up to three items with a 64 px product photo, name and variant',
      'A "Write a review" link with gold stars on every item',
      'Bulletproof "View your order" button',
      'Report-a-problem box for missing or damaged parcels',
      'Closing care or getting-started tip',
      'Upload product photos or paste hosted image URLs',
      'Light and dark palettes and a plain-text version with each review link',
    ],
    why: [
      { icon: '📦', title: 'Fewer "where is it?" tickets', desc: 'Saying exactly where the parcel was left answers the most common post-delivery question before anyone contacts support.' },
      { icon: '⭐', title: 'More, better reviews', desc: 'A review link beside each product photo, sent while the box is still open, gets more specific reviews than a single general request.' },
      { icon: '🛟', title: 'Problems handled fast', desc: 'A clear report-a-problem route and deadline catch missing and damaged parcels early, when they are cheapest to fix.' },
    ],
    useCases: [
      { icon: '👕', title: 'Fashion and apparel stores', desc: 'Confirm delivery with each item’s photo and size, a review link per product and a care tip for the fabric, sent the day the parcel arrives.' },
      { icon: '☕', title: 'Food, coffee and kitchenware', desc: 'Tell customers their beans or kitchen tools have arrived, link a quick brewing guide in the closing tip and ask for a review of each product.' },
      { icon: '🔌', title: 'Electronics and gadgets', desc: 'Confirm delivery with the serial-sensitive items listed, point to setup instructions in the tip and give a seven-day window to report damage.' },
      { icon: '🎁', title: 'Gifts delivered to someone else', desc: 'Let the buyer know their gift arrived and where it was left, without review links, so they can tell the recipient to look for it.' },
    ],
    faqs: [
      { q: 'Why send an order delivered email?', a: 'It confirms the parcel arrived and where it was left, gives a quick route to report problems and catches customers at their most satisfied moment, which is the best time to ask for a review or share a care tip.' },
      { q: 'How do I trigger it when the carrier marks a parcel delivered?', a: 'Use your tracking provider’s delivered event: Shopify Flow’s fulfilment status, Klaviyo or Omnisend with a tracking integration, AfterShip, Route, or your carrier’s webhook. Send it within a few hours of the delivery scan.' },
      { q: 'Can I remove the review links?', a: 'Yes. Clear the review link text and the stars and links disappear from every item. That is useful for gifts, or if you send a separate review request a week later instead.' },
      { q: 'What size should the product images be?', a: 'They display as 64 × 64 px squares, so upload square images at least 128 px wide for sharp results on high-resolution screens. Upload them in the editor, or paste URLs from your store’s product images.' },
      { q: 'Is an order delivered email transactional?', a: 'Mostly. Delivery status is transactional, and a review request about the purchase is usually acceptable too. If you add discounts or product recommendations, treat it as marketing and add an unsubscribe link.' },
    ],
  },

  'shipping-delay': {
    keywords: ['shipping delay email template', 'order delay email', 'delayed order apology email', 'backorder email template', 'delivery delay notification email'],
    about: {
      title: 'Shipping Delay Email — Free Order Delay Apology Template',
      description: `**Shipping Delay Email** tells a customer their order will arrive later than promised, before they have to ask. Late parcels are a top cause of support tickets, chargebacks and one-star reviews, and the damage comes less from the delay itself than from silence. A short, honest email with real options keeps most of those customers, and some come away more loyal than before.

**Old date out, new date in**

After a direct headline ("Sorry, Jordan: your order is running late") and an intro that admits the problem without excuses, a soft panel shows "We said" with the original estimate struck through, an arrow, and "New estimate" with the new date in large type. On phones the two stack and the arrow is hidden. The customer gets the new date in one look.

**An honest reason**

A sentence underneath says why, in plain words. "The pour-over set sold out faster than expected and a new batch arrives Monday" is believable and specific; "due to unforeseen circumstances" is not. When people understand a delay, they wait.

**Three real choices**

"Your options" lists up to three numbered cards. The default is "Keep waiting" with nothing to do. The others offer action links: ship the items that are ready now, or cancel for a full refund with the timing spelled out. Offering cancellation openly sounds risky, but it prevents chargebacks and angry reviews, and most people choose to wait once they feel in control.

**An apology that costs little**

An optional dashed coupon box offers a discount for next time, with its small print. Finish with the name of a real person who reads the replies, not a bot.

Paste the HTML into Shopify notifications, Klaviyo, Gorgias macros or your helpdesk, and send it as soon as you know a promised date will be missed. It is about an existing order, so it is transactional; the coupon line is small, but check your sender's rules. If the customer cancels, follow up with the [Order Cancellation](/email-templates/order-cancelled/) email; when it arrives, the [Order Delivered](/email-templates/order-delivered/) one.`,
    },
    features: [
      'Original delivery date struck through beside the new estimate',
      'Arrow between the dates, hidden when they stack on phones',
      'Order number above the dates',
      'Plain-English reason for the delay',
      'Up to three numbered option cards with optional action links',
      'Keep waiting, split the order and cancel-for-refund defaults',
      'Optional apology coupon in a dashed box with small print',
      'Closing note naming the person who reads replies',
      'Light and dark palettes, both editable',
      'Plain-text version with every option and link',
    ],
    why: [
      { icon: '📣', title: 'You tell them first', desc: 'Writing before the customer notices turns a broken promise into a courtesy, and heads off "where is my order?" tickets.' },
      { icon: '🎛', title: 'They stay in control', desc: 'Clear choices to wait, split or cancel stop frustration turning into chargebacks and public complaints.' },
      { icon: '💬', title: 'Honest beats vague', desc: 'A specific reason and a named person make the delay believable, which is what keeps people willing to wait.' },
    ],
    useCases: [
      { icon: '📦', title: 'Backorders and sold-out items', desc: 'When one item in an order sells out, show the new ship date, offer to send the in-stock items now and give a clear refund option.' },
      { icon: '🌧', title: 'Carrier and weather delays', desc: 'Warn customers that storms, strikes or carrier backlogs will push delivery back a few days, with the new estimate and tracking still valid.' },
      { icon: '🎄', title: 'Holiday peak season', desc: 'During peak weeks, tell customers early that a parcel will miss the promised date, and offer a gift card or code as an apology.' },
      { icon: '🛠', title: 'Made-to-order and custom products', desc: 'Let customers know a handmade or personalised item needs more time in the workshop, with the honest reason and a new finish date.' },
    ],
    faqs: [
      { q: 'What should a shipping delay email say?', a: 'Apologise, give the original and new delivery dates, explain the reason honestly, list the customer’s options (wait, change or cancel for a refund) and say how to reach a real person. Send it as soon as you know the date will be missed.' },
      { q: 'Should I offer a discount for a delay?', a: 'For short delays a sincere apology and a clear new date are often enough. For longer delays or holiday gifts, a small code for the next order is a cheap way to keep goodwill. Switch the code box off when you do not need it.' },
      { q: 'Should I offer cancellation in a delay email?', a: 'Yes. Customers can usually cancel anyway, and offering it openly with the refund timing prevents chargebacks and angry reviews. In practice most people choose to wait once they feel they have the choice.' },
      { q: 'Can I send this from Shopify or my helpdesk?', a: 'Yes. Paste the HTML into a Shopify Email or Klaviyo flow triggered by a delayed tag, or save it as a Gorgias, Zendesk or Help Scout macro, replacing the dates and order number with that tool’s variables.' },
      { q: 'Is a delay notification transactional?', a: 'Yes. It updates an order the customer placed. A small apology code is generally fine, but heavy promotion would make it commercial; keep the main purpose the order update.' },
    ],
  },

  'order-cancelled': {
    keywords: ['order cancellation email template', 'order cancelled email', 'cancelled order email template', 'order cancellation confirmation email', 'out of stock cancellation email'],
    about: {
      title: 'Order Cancellation Email — Free Cancelled Order Template for Stores',
      description: `**Order Cancellation Email** confirms that an order will not be shipped and explains what happens to the money. Whether the customer asked, an item went out of stock, a payment failed or an address could not be verified, the questions are the same: is it definitely cancelled, which items, and when do I get my refund? This template answers each one in that order.

**A stamp you cannot miss**

The top of the card has a bordered "Cancelled" stamp on the left and the order number and order date on the right, so the status and which order it is are both clear before the headline. The headline and intro then confirm the cancellation in plain words and promise there is nothing to pay.

**Who cancelled it, and why**

A single information line says who cancelled the order and when, such as "Cancelled at your request on October 18 at 9:05 AM", or "Cancelled because the Ceramic Pour-Over Set is out of stock". Being specific is what stops a customer contacting support to ask why.

**Items with their prices crossed out**

Up to three items are listed with their variant and quantity, and the prices are struck through, a small visual cue that none of it will be charged. It mirrors the layout of the [Order Confirmation](/email-templates/order-confirmation/) so customers recognise the same order.

**The refund in one box**

A green refund panel shows the amount in large type, the card or account it is going back to, how long it usually takes, and an optional refund reference for bank enquiries. If nothing was charged, switch the refund box off.

**A way back**

"Shop again" brings the customer back to the store, and the closing note offers to restore an accidental cancellation within 24 hours. Paste it into Shopify's order cancelled notification (replacing the sample values with Liquid variables), WooCommerce, Klaviyo or your own code. It is transactional. When the money lands, the [Refund Confirmation](/email-templates/refund-confirmation/) template can confirm it.`,
    },
    features: [
      'Bordered "Cancelled" stamp with the order number and date',
      'Headline and intro that confirm there is nothing to pay',
      'Who cancelled the order and when, in one line',
      'Up to three items with variant, quantity and struck-through price',
      'Green refund panel: amount, card, timing and reference',
      'Switch the refund panel off when nothing was charged',
      'Bulletproof "Shop again" button',
      'Closing note for restoring an accidental cancellation',
      'Light and dark palettes, both editable',
      'Plain-text version with the items and refund details',
    ],
    why: [
      { icon: '🧾', title: 'No doubt about the status', desc: 'A stamp, the order number and crossed-out prices make it clear at a glance which order was cancelled and that nothing will be charged.' },
      { icon: '💸', title: 'Refund questions answered', desc: 'The amount, card and timing in one box head off the most common follow-up question after a cancellation.' },
      { icon: '🔁', title: 'Keeps the customer', desc: 'A specific reason, a "Shop again" button and an offer to restore mistakes leave the door open instead of ending the relationship.' },
    ],
    useCases: [
      { icon: '🙋', title: 'Customer-requested cancellations', desc: 'Confirm that an order cancelled from the account page or by support will not ship, with the refund amount and when it should appear.' },
      { icon: '📉', title: 'Out-of-stock cancellations', desc: 'Explain that an item sold out after the order was placed, list what was cancelled and link back to similar products in the store.' },
      { icon: '⚠️', title: 'Fraud or verification checks', desc: 'When an order is cancelled after a payment or address check, state that clearly and neutrally and tell the customer how to order again.' },
      { icon: '🍱', title: 'Restaurants and food delivery', desc: 'Let a customer know their order was cancelled by the restaurant, why, and that the charge has been reversed to their card.' },
    ],
    faqs: [
      { q: 'What should an order cancellation email include?', a: 'The order number, a clear statement that it is cancelled, who cancelled it and why, the items affected, the refund amount, where it is going and how long it takes, plus a way to order again or get help.' },
      { q: 'How do I use it in Shopify?', a: 'In Shopify admin go to Settings, then Notifications, then Order cancelled. Replace the code with this HTML and swap the sample values for Liquid variables such as {{ order.name }}, the line items loop and the refund total.' },
      { q: 'What if the customer was never charged?', a: 'Switch off the Refund section and change the intro to say no payment was taken. The rest of the email (stamp, items and Shop again button) works the same way.' },
      { q: 'How should I explain an out-of-stock cancellation?', a: 'Name the item, apologise, confirm the refund and, if you can, link to a similar product or a back-in-stock alert. Customers are much more forgiving when they know exactly what happened.' },
      { q: 'Is an order cancellation email transactional?', a: 'Yes. It confirms a change to an order and a refund, so it does not need an unsubscribe link under US CAN-SPAM. Keep product promotions out of it; the Shop again button is fine.' },
    ],
  },
};
