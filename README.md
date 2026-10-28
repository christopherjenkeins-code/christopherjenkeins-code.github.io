
# 🍷 The Sopranos Restaurant & Lounge

Welcome to the repository for The Sopranos Restaurant & Lounge web platform. This responsive multi-page website showcases the venue's dining, craft cocktails, VIP nightlife events, operating details, a table reservation form, and a global header search system.

---

## 📋 Student & Project Information
* **Student Name:** Lumkikhaya Luzuko Nonyongo
* **Student Number:** ST 10512732
* **Module Code:** WEDE5020 (Web Development Introduction)[cite: 21]
* **Repository:** `christopherjenkeins-code.github.io`[cite: 34]
* **Live Deployment:** Hosted via GitHub Pages[cite: 15, 34]

---

## 📌 Project Overview

Located in Northern Roodepoort, Gauteng, South Africa, The Sopranos Restaurant & Lounge offers a premium culinary and nightlife experience. This project fulfills the three-part summative requirements for WEDE5020, delivering a fully functional, responsive, and SEO-optimized web portal[cite: 1, 2, 9, 10].

### Key Pages & Features
* **🔍 Global Search Bar:** Persistent search input integrated across all page headers for quick site navigation.
* **🏠 Home (`index.html`):** Hero section, featured special, live "Open now / Closed" badge[cite: 9].
* **📖 About Us (`about.html`):** Background, culinary vision, design approach and references[cite: 9].
* **🍽️ Menu (`menu.html`):** Burgers, wings, cocktails and event specials with a category filter[cite: 9, 16].
* **🍸 Services (`services.html`):** Fine dining, cocktail bar and VIP lounge event hosting[cite: 9, 16].
* **📅 Reservations (`enquiry.html`):** Booking form with date, time, phone and party-size validation[cite: 9, 18, 24].
* **📞 Contact Us (`contact.html`):** Opening hours, address, validated contact form and Google Map[cite: 9, 18].

### JavaScript Features (`js/main.js`)
* Reservation and contact form validation with on-page confirmation messages[cite: 18]
* Menu category filter[cite: 16]
* Open now / Closed badge in South African time
* Header search interaction functionality[cite: 16]
* Back-to-top button, auto-updating footer year, mobile menu auto-close

---

## 🗺️ Sitemap & File Architecture

Explore the rest of our digital portal:
* ➔ Homepage & Highlights (`index.html`)[cite: 9]
* ➔ Food & Drinks Menu (`menu.html`)[cite: 9, 16]
* ➔ Lounge Services & Events (`services.html`)[cite: 9, 16]
* ➔ Table Reservations & Enquiries (`enquiry.html`)[cite: 9, 18]
* ➔ Contact Info & Location Directions (`contact.html`)[cite: 9, 18]

A full page hierarchy and navigation map is documented in `SITEMAP.md` in the project repository.

### 🛠️Built With & Technical RequirementsHTML5: Semantic structure (<header>, <nav>, <main>, <footer>) for accessibility and SEO.   CSS3: Responsive layout with Flexbox/Grid, custom properties, and multi-device media queries (css/style.css).   JavaScript (vanilla): DOM manipulation, event handling, and client-side form validation without external heavy frameworks (js/main.js)[cite: 15, 18].

### Timeline & MilestonesPart 1: Project Proposal, Sitemaps, Asset Sourcing, Folder Organization, and Basic HTML Structure setup.   Part 2: Implementation of external CSS stylesheets, typography scaling, Flexbox/Grid structuring, and responsive media query breakpoints for cross-device support.   Part 3: Integration of advanced JavaScript functionality, interactive forms with client-side validation, on-page SEO best practices, and live deployment on GitHub Pages.  

### 🔄 Changelogv1.0 (Part 1 Submission): Initial repository setup, base folder layout (/css, /js, /images), foundational HTML documents created, and project proposal documentation completed.   v2.0 (Part 2 Submission): Added external stylesheets, established base CSS resets, configured typography scales, and implemented responsive media queries across mobile and tablet viewports.   v3.0 (Part 3 Submission): Integrated interactive JavaScript modules, established form validation handling on enquiry/contact interfaces, optimized alt text/metadata for SEO, and finalized live production deployment via GitHub Pages. 

###📚 References & Design Inspiration
ChowNow (2026) Restaurant Website Best Practices With Examples, ChowNow Blog, viewed 14 September 2026, https://get.chownow.com/blog/restaurant-website-best-practices-and-examples/.

MenuTiger (2026) Web Design for Restaurants: A How-to Guide, MenuTiger Blog, viewed 14 September 2026, https://www.menutiger.com/blog/web-design-for-restaurants.

RichMenu (2026) Top Restaurant Website Design in 2026: What Great Looks Like (And What Makes It Convert), RichMenu, viewed 14 September 2026, https://richmenu.io/top-restaurant-website-design/.

Sauce (2025) Restaurant Website Design Best Practices for 2025 and Beyond, Sauce Blog, viewed 14 September 2026, https://home.getsauce.com/post/restaurant-website-design-best-practices.

W3C (2023) WCAG 2 Overview, Web Accessibility Initiative (WAI), viewed 14 September 2026, https://www.w3.org/WAI/standards-guidelines/wcag/.

The Independent Institute of Education (IIE). WEDE5020 Module Manual and Project Rubric (2026).

### Repository Structure
```text
.
├── index.html               # Home page[cite: 9]
├── about.html               # About page[cite: 9]
├── menu.html                # Food, drinks & specials[cite: 9, 16]
├── services.html            # Services & VIP events[cite: 9, 16]
├── enquiry.html             # Reservation form[cite: 9, 18]
├── contact.html             # Contact details, form & map[cite: 9, 18]
├── CHANGELOG.md             # Version history[cite: 10]
├── SITEMAP.md               # Page hierarchy[cite: 8]
├── css/
│   └── style.css            # Main stylesheet[cite: 12]
├── js/
│   └── main.js              # Interactivity & form validation
└── images/                  # burger.jpg.jpg, cocktail.jpg.jpeg,
                             # developer.jpg.jpeg, event&specials.jpg,
                             # gourmet dish.jpg, Signature cocktails.jpg,
                             # vipevents.jpg, wings.jpg, wings2.jpg, ...
