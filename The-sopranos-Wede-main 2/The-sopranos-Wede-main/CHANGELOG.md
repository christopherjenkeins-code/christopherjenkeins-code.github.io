# Changelog

All notable changes to The Sopranos Restaurant & Lounge website are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) principles, and entries are grouped by version and date.

## [1.4.0] - 2026-10-24

### Added
- **Global header search bar**: Integrated a persistent search input and button across all six page headers (`index.html`, `about.html`, `menu.html`, `services.html`, `enquiry.html`, and `contact.html`) to improve site accessibility and navigation.
- **Search bar styling**: Added responsive layout rules (`.search-bar-container`, `.search-input`, and `.search-btn`) with smooth transition effects for focus and hover states in `css/style.css`.

### Changed
- Cleaned up the project file structure by removing redundant duplicate stylesheet copies (`style (2).css`).
- Updated `README.md` to include the global search feature in the project overview and feature breakdown.

## [1.3.3] - 2026-10-11

### Removed
- "Back to Home" button on the Menu page (unnecessary because the header navigation is always visible), and its `.back-link` styles.
- The row of category buttons (All, Burgers, Wings, Cocktails, Specials) on the Menu page, together with the `.filter-bar` / `.filter-btn` styles and the menu-filter code in `js/main.js`.

## [1.3.2] - 2026-10-11

### Fixed
- Menu page was still using the old `menu-header` (title only, no navigation); replaced with the shared site header and navbar.

### Added
- "Back to Home" button on the Menu page, with matching `.back-link` styles.

## [1.3.1] - 2026-10-11

### Changed
- **`css/style.css` rebuilt as a single clean stylesheet** from the original design: the project's colour palette (`#BF1E2E` red, `#FFB81C` gold, `#08080C` background), glow effects and card styling are preserved and now defined once as CSS variables.
- Removed duplicated and conflicting rules from the old stylesheet (two `body`, `.container`, `.menu-header` and `.btn` blocks, and the clashing orange `#ff9800` and red `#e52e2e` menu palettes), so every page now uses one consistent theme.
- Service cards restyled to display the service photos as a full-width image above the text.
- Stylesheet organised into 14 numbered, commented sections.

### Removed
- Unused `.menu-header` styles, replaced by the shared site header.

## [1.3.0] - 2026-10-11

### Added
- **`js/main.js`**: first JavaScript file for the site, linked on every page with `<script src="js/main.js" defer></script>`.
- **Reservation form validation** (`enquiry.html`): checks name, email format, South African phone format (`082 123 4567` or `+27 82 123 4567`), blocks past dates (the date picker also greys them out), requires time and party size, and rejects times outside booking hours (12:00 to 23:00, Sundays until 21:00).
- **Reservation confirmation message**: a styled success message replaces the silent page reload and the form resets after a valid submit.
- **Contact form validation and confirmation** (`contact.html`): same approach for name, email and a minimum message length.
- **Menu category filter** (`menu.html`): All, Burgers, Wings, Cocktails and Specials buttons show or hide sections using `data-category` attributes, with `aria-pressed` states for screen readers.
- **"Open now / Closed" badge** on the Home hero and Contact page, calculated in South African time (Africa/Johannesburg) from the published opening hours, including the 02:00 close on Friday and Saturday nights. It refreshes every minute.
- **Back-to-top button** that appears after scrolling 400px.
- **Mobile nav improvements**: the hamburger menu now closes when a link is tapped or Escape is pressed.
- **Dynamic footer year** via `<span id="year">` on every page.
- New CSS section "JavaScript features" covering filter buttons, status badges, form messages, invalid-field highlighting and the back-to-top button, plus a global `[hidden]` rule.
- **Deployment section in `README.md`** covering GitHub Pages hosting and custom domain setup, and `js/main.js` added to the repository structure.

### Changed
- `enquiry.html` and `contact.html` forms now have ids (`reservation-form`, `contact-form`) and a status area for messages.
- `README.md` repository structure now lists the `css`, `js` and `images` folders accurately, including the real image file names.

### Notes
- Forms currently validate and confirm in the browser only; they do not email the submissions. A free form service such as Formspree can be added later (see the TODO comment in `js/main.js`).

## [1.2.0] - 2026-10-11

### Added
- **Unified site header** (`<header class="site-header">`) used identically on all six pages: clickable `THE SOPRANOS` logo linking to `index.html`, plus a five-link navbar (Home, About Us, Menu, Services, Contact Us).
- **Active-page highlighting**: the link for the page being viewed now carries `class="active"` and `aria-current="page"`, so visitors always see where they are.
- **Mobile hamburger menu** built with a pure-CSS checkbox toggle (no JavaScript), collapsing the navbar into a dropdown on screens 768px wide and below.
- **Sticky header** that stays visible while scrolling, with a crimson bottom border.
- **Page header banner** (`.page-header`) added to the Menu page so it matches About, Services and Contact.
- Menu page now includes the shared **footer with developer credit**, which was previously missing.
- `title` attribute on the Google Maps iframe and `rel="noopener"` on the external Directions link (accessibility and security).
- Sectioned, commented `css/style.css` (13 labelled sections) with CSS custom properties for the colour palette.

### Changed
- **Home (`index.html`)**: header replaced with the unified header; "View Full Menu" card link now points to `menu.html` (it previously pointed to `services.html`).
- **Menu (`menu.html`)**: the old `menu-header` (title + subtitle with no navigation) replaced by the unified header and nav; Events & Specials image moved inside its section.
- **Contact (`contact.html`)**: header now includes the logo (it was missing) and the unified nav; the "Find Us" map section moved inside `<main>`; footer credit cleaned up to the developer name only.
- **Services (`services.html`)** and **About (`about.html`)**, **Enquiry (`enquiry.html`)**: header swapped for the unified header so navigation looks and behaves the same everywhere. Enquiry previously had no logo.
- Contact opening hours: "00:00 AM" corrected to "12:00 AM" (Mon - Thu).
- Image paths with spaces or `&` are now URL-encoded (`gourmet%20dish.jpg`, `Signature%20cocktails.jpg`, `event%26specials.jpg`) for reliable loading on hosted servers.
- All `&` characters in visible text written as `&amp;` for valid HTML.
- `css/style.css` fully rewritten so header, nav, menu, services, forms, contact, map and footer styles all live in one consistent, responsive stylesheet.

### Fixed
- **menu.html**: removed stray `</body></html>` that appeared above the `<!DOCTYPE html>` declaration.
- **menu.html**: fixed broken image attribute `width="350 height="345"` (missing closing quote swallowed the height attribute).
- **menu.html**: fixed unclosed `<section class="events section menu grid"` tag (missing `>`), which broke the rest of the page layout.
- **menu.html**: replaced the invalid multi-word class string with the valid `class="events"`.
- **contact.html**: map section was placed after `</html>`; it is now inside the document body.
- **services.html**: removed duplicated, unclosed `<div class="service-info">` wrappers that left each service card without proper closing tags.
- **services.html**: third service image had the wrong alt text ("Signature Cocktails"); replaced with a description of the VIP lounge.
- Added missing `alt` descriptions consistently so every meaningful image is screen-reader friendly.
- All six HTML files checked for balanced tags with no unclosed or mismatched elements.

### Housekeeping (manual steps in VS Code)
- Delete the stray, empty `css/CHANGELOG.md` (untracked, created in the wrong folder).
- Make sure `CHANGELOG.md` sits in the project root as a file (not a folder).

## [1.1.0] - 2026-09-14

### Added
- Created `SITEMAP.md` documenting full page hierarchy and navigation structure.
- Added "Our Design Approach" section to About page, explaining and citing the research behind key design decisions (mobile-first layout, food photography, review visibility, accessibility).
- Added "References" section to About page with full source list for all research cited on the site.

### Fixed
- Corrected `CHANGELOG.md`, which had previously been created as a folder instead of a file and was not being recognised by GitHub.
- Updated the in-page sitemap on the About page to include all five site pages with accurate labels (previously missing the Menu page and mislabelling the Services page).

## [1.0.0] - 2026-08-12

### Added
- Created the Sopranos website.
- Added Home page.
- Added About Us page.
- Added Menu page.
- Added Services page.
- Added Contact Us page.
- Added CSS styling.
- Added website images.