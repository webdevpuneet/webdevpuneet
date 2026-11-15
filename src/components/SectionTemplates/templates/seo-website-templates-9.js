/* Hand-written SEO content for the website templates (part 9: Veterinary & Pet Clinic). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_9 = {
  vet: {
    about: `Pet owners visit a vet website for three things: to check the practice is trustworthy, to find out what care costs, and to book a visit. This template answers all three. The home page opens with a photo hero and a "Book a visit" button, a 24/7 emergency strip with a tap-to-call number, a services and prices list, reasons to choose you, a look inside the clinic, wellness plans, the team, reviews, an appointment request form and live opening hours with a map.

The Services and Prices list is the section made for this template. Each service is a row with a name, a short description, how long it takes, a price such as "from $65" and a Book button, and filter chips (check-ups, vaccines, dental, surgery, sick pets) are built from the categories you type. The same list is written as structured data with prices, and the Book buttons send visitors to the appointment request form.

The multi-page version adds a Services page with wellness plans and a question list about costs and first visits, an Our team page with the story of the clinic and a gallery of patients, a Book page with the appointment form, and a Visit page with opening hours, a map, directions and the emergency number. The opening hours show a live "Open now" badge and are written as VeterinaryCare data, which helps local search.

The booking form sends the request to a form service you choose, so the clinic receives it by email and confirms by phone. That sets honest limits: it is an appointment request, not a calendar, so there is no live availability, no reminders and no payments. For online scheduling, link the Book buttons to your practice software instead and keep this design as the website.

Every exported page has one main heading, descriptive image text, clean internal links and local business data, all as plain HTML, CSS and a little JavaScript that you can edit or move to another host.`,
    checklist: [
      'A visible emergency number on every page, with a tap-to-call button on phones',
      'Services with durations and starting prices, so owners know what to expect before they call',
      'Photos of real staff handling real animals gently, with names and roles for the team',
      'Opening hours with a live open-now badge, the address and a map one tap from any page',
      'An easy appointment request that confirms within hours and says what to bring',
      'Answers about costs, payment plans, exotic pets and first visits',
    ],
    faqs: [
      { q: 'How does online booking work in this template?', a: 'Visitors fill in an appointment request with the reason for the visit, a day and a time. The request is sent to a form service you choose, such as Formspree, so you receive it by email and confirm by phone. It is not a live calendar.' },
      { q: 'What is the Services and Prices section?', a: 'A list of services with a name, description, duration, price and Book button. Filter chips are created from the categories you type, and the prices are also written as schema.org Service data for search engines.' },
      { q: 'Can I use it for a groomer, kennel or pet shop?', a: 'Yes. Replace the services with grooming packages, boarding stays or training sessions, change the photos and keep the booking form, opening hours and emergency strip if they suit you.' },
      { q: 'Does it work as a multi-page site?', a: 'Yes. The multi-page version has Home, Services, Our team, Book and Visit pages sharing one navigation and footer, with links between them already set up.' },
      { q: 'Are the prices and clinic details real?', a: 'No. Willow & Paw, the address, phone number and prices are examples. Replace them with your own details, and only publish prices that you really charge.' },
    ],
  },
};
