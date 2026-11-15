/* Hand-written SEO content for the website templates (part 9: Veterinary & Pet Clinic). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_9 = {
  vet: {
    about: `Pet owners visit a vet website for three things: to check the practice is trustworthy, to find out what care costs, and to book a visit. This template answers all three. First comes a photo of a vet at work with a "Book a visit" button, then a 24/7 emergency line anyone can tap to call, the services and prices, why owners choose the clinic, a look inside the consulting room, wellness plans, the vets and nurses, reviews from owners, an appointment request and the clinic hours with a map.

The Services and Prices list is the section made for this template. Each service is a row with a name, a short description, how long it takes, a price such as "from $65" and a Book button, and filter chips (check-ups, vaccines, dental, surgery, sick pets) are built from the categories you type. The same list is written as structured data with prices, and the Book buttons send visitors to the appointment request form.

Split into pages, the site gives each job its own address: Services adds the wellness plans and a question list about costs and first visits, Our team tells the clinic's story with a gallery of patients, Book holds the appointment form, and Visit shows the hours, map, directions and emergency number. The hours carry a live "Open now" badge and VeterinaryCare data for local search.

Appointment requests go to a form service of your choice and land in the clinic's inbox, where the front desk confirms by phone. It is a request, not a diary: nothing shows free slots, sends reminders or takes deposits. Clinics that already book through practice software can point every Book button there and keep this design as the public face of the practice.

For search engines, the price list is written as Service data with prices, the clinic as a VeterinaryCare business with its hours, and every page keeps a single main heading and descriptive image text, so a search for "vet near me" has something clear to read.`,
    checklist: [
      'A visible emergency number on every page, with a tap-to-call button on phones',
      'Services with durations and starting prices, so owners know what to expect before they call',
      'Photos of real staff handling real animals gently, with names and roles for the team',
      'Clinic hours with a live open-or-closed badge, the address and directions one tap from any page',
      'An easy appointment request that confirms within hours and says what to bring',
      'Answers about costs, payment plans, exotic pets and first visits',
    ],
    faqs: [
      { q: 'How does online booking work in this template?', a: 'Visitors fill in an appointment request with the reason for the visit, a day and a time. The request is sent to a form service you choose, such as Formspree, so you receive it by email and confirm by phone. It is not a live calendar.' },
      { q: 'What is the Services and Prices section?', a: 'A list of services with a name, description, duration, price and Book button. Filter chips are created from the categories you type, and the prices are also written as schema.org Service data for search engines.' },
      { q: 'Can I use it for a groomer, kennel or pet shop?', a: 'Yes. Replace the services with grooming packages, boarding stays or training sessions, change the photos and keep the booking form, opening hours and emergency strip if they suit you.' },
      { q: 'Can services, the team and booking each have their own page?', a: 'Yes. The multi-page version gives you Home, Services, Our team, Book and Visit, with shared navigation and footer and the Book buttons already pointing at the Book page.' },
      { q: 'Can I keep Willow & Paw\'s prices?', a: 'Treat them as placeholders. Willow & Paw, its Denver address, phone number and every price are invented, so swap in your own details and publish only the fees your clinic charges.' },
    ],
  },
};
