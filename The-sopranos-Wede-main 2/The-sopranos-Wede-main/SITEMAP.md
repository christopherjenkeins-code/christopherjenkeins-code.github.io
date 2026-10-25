# Sitemap — The Sopranos Restaurant & Lounge

This document maps the full page hierarchy of the website, the purpose of each page, and how pages link to one another. It matches the navigation implemented in `header`/`nav` on every page.

```
Home (index.html)
│
├── About Us (about.html)
│     └── links to: Home, Menu, Services, Contact Us
│
├── Menu (menu.html)
│     └── links to: Home, About Us, Services, Contact Us
│
├── Services (services.html)
│     └── links to: Home, About Us, Menu, Contact Us
│
├── Contact Us (contact.html)
│     └── links to: Home, About Us, Menu, Services
│
└── Reservations / Enquiry (enquiry.html)
      └── reached via "Book a Table" call-to-action; links back to Home
```

## Page purpose and content summary

| Page | File | Purpose | Key content |
|---|---|---|---|
| Home | `index.html` | First landing point; sells the brand in one screen | Hero banner, tagline, highlights, call-to-action to Menu/Reservations |
| About Us | `about.html` | Builds trust and tells the brand story | "Who We Are", "Our Culinary Vision", sitemap shortcuts, design approach & references, developer credit |
| Menu | `menu.html` | Primary conversion page — what people actually came for | Food and drink categories with descriptions and pricing |
| Services | `services.html` | Explains what the venue offers beyond food | Event hosting, VIP lounge, live entertainment, private bookings |
| Contact Us | `contact.html` | Removes friction to visiting/calling | Address, map/directions, phone, opening hours |
| Reservations | `enquiry.html` | Converts interest into a booking | Reservation form (name, date, party size, seating preference, message) |

## Navigation structure

Every page shares the same global header (`logo` + `navbar`) linking to Home, About Us, Menu, Services, and Contact Us, and the same footer with the copyright notice and developer credit. This gives users a consistent, predictable way to move between all five core pages from anywhere on the site, satisfying flat (one-click) navigation depth.